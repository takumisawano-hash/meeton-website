/**
 * Meeton ai content pipeline (spec §4.5 / §4.15).
 *
 *   plan(KW) → dedup(KW→URL map) → RAG-ground(Meeton data) → draft(結論先出し/Q&A)
 *            → QA gate 1/2/3 → write MDX draft + report
 *
 * Design rules:
 *  - The LLM TRANSFORMS Meeton's own data into articles; it never invents
 *    figures. Every number is grounded in app/lib/grounding.ts.
 *  - 1記事 = 1 KW = 1 intent. KW→URL map prevents cannibalization.
 *  - BOFU drafts are flagged needsHumanReview=true (human final check, §4.5).
 *  - Drafts land in content/drafts/ for review; publishing (→ Notion + IndexNow
 *    ping) is a separate, deliberate step.
 *
 * Run:  bun scripts/content-pipeline/generate.ts            # generate all planned
 *       bun scripts/content-pipeline/generate.ts ai-sdr     # one cluster
 *       (without ANTHROPIC_API_KEY it does a dry run: plan + dedup only)
 */
import { writeFileSync, mkdirSync, existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { CLUSTERS, type ClusterId } from "@/app/lib/content-clusters";
import { retrieveGrounding, extractStats, type Fact } from "@/app/lib/grounding";

type IntentTier = "BOFU" | "MOFU" | "TOFU";
type PlanEntry = { cluster: ClusterId; keyword: string; slug: string; intent: IntentTier; title: string };

// KW→URL plan (single source of truth for NEW articles). Extend over time.
const PLAN: PlanEntry[] = [
  { cluster: "library", keyword: "営業資料 共有 ツール", slug: "sales-deck-sharing-tools", intent: "BOFU", title: "営業資料 共有ツールの選び方｜開封トラッキングで商談化する" },
  { cluster: "library", keyword: "提案資料 開封率", slug: "proposal-open-rate", intent: "MOFU", title: "提案資料の開封率を上げる方法と、開封後に商談化する設計" },
  { cluster: "calendar", keyword: "商談 取りこぼし", slug: "lost-opportunity-speed-to-lead", intent: "MOFU", title: "商談の取りこぼしはなぜ起きる？初動レスポンスで防ぐ" },
  { cluster: "email", keyword: "追客 自動化", slug: "follow-up-automation", intent: "MOFU", title: "追客の自動化｜未予約リードを商談に戻すAI 1:1フォロー" },
  { cluster: "ai-sdr", keyword: "リードが商談にならない", slug: "leads-not-converting-to-meetings", intent: "MOFU", title: "リードが商談にならない原因と、商談化率を上げる打ち手" },
];

const DRAFTS_DIR = join(process.cwd(), "content", "drafts");
const MODEL = "claude-sonnet-4-6";

// ── dedup: a KW must not already map to an existing URL/draft ──
function existingKeywords(): Set<string> {
  const set = new Set<string>();
  // cluster pillar keywords are reserved (pillar owns them)
  for (const c of Object.values(CLUSTERS)) c.keywords.forEach((k) => set.add(norm(k)));
  // already-generated drafts
  if (existsSync(DRAFTS_DIR)) {
    for (const f of readdirSync(DRAFTS_DIR)) {
      if (!f.endsWith(".mdx")) continue;
      const fm = readFileSync(join(DRAFTS_DIR, f), "utf8").match(/^keyword:\s*(.+)$/m);
      if (fm) set.add(norm(fm[1]));
    }
  }
  return set;
}
const norm = (s: string) => s.toLowerCase().replace(/\s+/g, "");

function buildPrompt(p: PlanEntry, facts: Fact[], expertise: string) {
  const factLines = facts.map((f) => `- ${f.claim}: ${f.value ?? "(定性)"}（出典: ${f.source}${f.date ? ", " + f.date : ""}）`).join("\n");
  const system =
    `あなたは Meeton ai（DynaMeet が提供する AI SDR Platform）のコンテンツ編集者。` +
    `日本のB2B営業・マーケ向けに、検索とAI検索（AEO）の両方で引用される記事を書く。\n\n` +
    `# 厳守ルール\n` +
    `- 数値・統計は下の【接地データ】にあるものだけを使う。無い数値は書かない（捏造禁止）。\n` +
    `- 統計には出典を文中に明記する。\n` +
    `- 結論先出し: 各セクション冒頭に、見出しの問いへ直接答える自己完結の一段落を置く。\n` +
    `- 末尾にFAQを2〜3問（サブクエリに簡潔回答）。\n` +
    `- 1記事=1キーワード=1検索意図。トピックを広げすぎない。\n` +
    `- ブランドボイス: 断定しすぎず、現場の専門知。宣伝過多にしない。\n\n` +
    `# 専門性(E-E-A-T)\n${expertise}\n\n# 接地データ\n${factLines}`;
  const user =
    `次の記事をMarkdownで書け。\n` +
    `- ターゲットKW: ${p.keyword}\n- 想定タイトル: ${p.title}\n- 意図ティア: ${p.intent}\n- クラスター: ${CLUSTERS[p.cluster].label}（pillar: ${CLUSTERS[p.cluster].pillarName}）\n` +
    `- 構成: 導入（結論先出し）→ 本文（H2見出し3〜5・各冒頭に自己完結の答え）→ FAQ → まとめ。\n` +
    `- 本文中で自然に ${CLUSTERS[p.cluster].pillarName} に触れてよい（押し売りしない）。\n` +
    `- 1,500〜2,500字程度。`;
  return { system, user };
}

// ── QA gate 2: every stat in the draft must appear in the grounding values ──
function factCheck(draft: string, facts: Fact[]): { ok: boolean; unverified: string[] } {
  const groundedText = facts.map((f) => f.value ?? "").join(" ");
  const groundedStats = new Set(extractStats(groundedText));
  const draftStats = extractStats(draft);
  // allow trivially-safe tokens (years, generic counts handled loosely)
  const unverified = draftStats.filter((s) => !groundedStats.has(s) && !/^(20\d{2}|1|2|3|4|5)$/.test(s.replace(/[^\d]/g, "")));
  return { ok: unverified.length === 0, unverified };
}

async function draftArticle(system: string, user: string): Promise<string> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error("NO_API_KEY");
  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic({ apiKey: key });
  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 4000,
    system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
    messages: [{ role: "user", content: user }],
  });
  return res.content.filter((b) => b.type === "text").map((b) => (b as { text: string }).text).join("\n");
}

async function main() {
  const onlyCluster = process.argv[2] as ClusterId | undefined;
  const plan = onlyCluster ? PLAN.filter((p) => p.cluster === onlyCluster) : PLAN;
  const reserved = existingKeywords();
  mkdirSync(DRAFTS_DIR, { recursive: true });
  const dryRun = !process.env.ANTHROPIC_API_KEY;
  const report: Record<string, unknown>[] = [];

  for (const p of plan) {
    // Gate 0 — dedup / cannibalization
    if (reserved.has(norm(p.keyword))) {
      report.push({ slug: p.slug, status: "skipped", reason: "KW already mapped (cannibalization guard)" });
      continue;
    }
    const { facts, expertise } = retrieveGrounding(p.cluster);
    // Gate 1 — must have grounding rows to write from
    if (facts.length === 0) {
      report.push({ slug: p.slug, status: "skipped", reason: "no grounding data" });
      continue;
    }
    if (dryRun) {
      report.push({ slug: p.slug, status: "planned", cluster: p.cluster, intent: p.intent, groundingFacts: facts.length });
      continue;
    }
    const { system, user } = buildPrompt(p, facts, expertise);
    let draft: string;
    try {
      draft = await draftArticle(system, user);
    } catch (e) {
      report.push({ slug: p.slug, status: "error", reason: String(e) });
      continue;
    }
    // Gate 2 — fact-check stats against grounding
    const fc = factCheck(draft, facts);
    // Gate 3 — BOFU always needs human review
    const needsHumanReview = p.intent === "BOFU" || !fc.ok;
    const fm =
      `---\n` +
      `title: ${JSON.stringify(p.title)}\n` +
      `slug: ${p.slug}\n` +
      `keyword: ${p.keyword}\n` +
      `cluster: ${p.cluster}\n` +
      `pillar: ${CLUSTERS[p.cluster].pillar}\n` +
      `intent: ${p.intent}\n` +
      `factCheckPassed: ${fc.ok}\n` +
      `unverifiedStats: ${JSON.stringify(fc.unverified)}\n` +
      `needsHumanReview: ${needsHumanReview}\n` +
      `generatedBy: content-pipeline (${MODEL})\n` +
      `---\n\n`;
    writeFileSync(join(DRAFTS_DIR, `${p.slug}.mdx`), fm + draft, "utf8");
    report.push({ slug: p.slug, status: "drafted", factCheckPassed: fc.ok, unverified: fc.unverified, needsHumanReview });
  }

  console.log(JSON.stringify({ dryRun, drafts: report }, null, 2));
  if (dryRun) console.log("\n(dry run — set ANTHROPIC_API_KEY to generate drafts)");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
