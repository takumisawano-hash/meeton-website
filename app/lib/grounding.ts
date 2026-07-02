// RAG grounding source for the content pipeline (spec §4.5 / §4.15).
// THE ONLY place generated articles may pull numbers/claims from. The QA
// fact-check gate verifies every stat in a draft appears here. Keeping this
// curated (approved + sourced) is what prevents "scaled content abuse" — the
// LLM transforms Meeton's own data into articles, it does not invent figures.
//
// When real product telemetry becomes queryable, replace/extend AGGREGATE
// with live values (keep the date + source fields so stats stay citable).

import type { ClusterId } from "@/app/lib/content-clusters";

export type Fact = { claim: string; value?: string; source: string; date?: string; clusters: ClusterId[] };

export const GROUNDING: Fact[] = [
  // ── Aggregate / case-derived outcomes (Takumi-approved) ──
  { claim: "Meeton ai 経由の商談化率", value: "60%+（業界平均約20%の約3倍）", source: "研修業界リーダー（人材, Meeton ai 導入）", date: "2026-05", clusters: ["calendar", "ai-sdr"] },
  { claim: "チャット経由のリード獲得数（対 従来のシナリオ型チャット）", value: "20倍以上（月1〜2件→月20件以上）", source: "BizteX 株式会社（SaaS, Meeton ai 導入）", date: "2026-05", clusters: ["chat", "ai-sdr"] },
  { claim: "多サービス事業での受注", value: "3ヶ月で2件（M&A・コンサル領域）、提案件数も増加", source: "Univis Group（コンサルティング, 上田翔太氏）", date: "2026-05", clusters: ["library", "ai-sdr"] },
  // ── Category truths (external research, cited) ──
  { claim: "B2Bの買い手が営業接触前に独力で進める購買プロセスの割合", value: "約70%", source: "Gartner / 6sense", clusters: ["chat", "ai-sdr", "calendar"] },
  { claim: "Webサイト訪問者のうちフォームに到達する割合", value: "1%未満（大半は匿名のまま離脱）", source: "DynaMeet v8 デッキ（THE NEW FUNNEL）", clusters: ["chat", "ai-sdr"] },
  { claim: "Speed to Lead（初動レスポンス）の業界一般値", value: "数時間〜数日かかることが多い", source: "業界一般（要出典明記での使用）", clusters: ["calendar", "ai-sdr"] },
  // ── Product facts (no fabrication needed) ──
  { claim: "Meeton ai の構成", value: "Chat / Ads / Library / Calendar / Email の5プロダクト（掴む→育てる→商談化→追客の4ステージ、1アカウント統合）", source: "Meeton ai 製品仕様", clusters: ["library", "calendar", "email", "chat", "ads", "ai-sdr"] },
  { claim: "料金プラン", value: "基本プラン『リード獲得』15万円〜/月（Chat + Ads + Library）＋商談化アドオン（Calendar +5万円）・追客アドオン（Email +5万円）。人気の基本＋商談化は20万円〜、フル構成25万円〜。規模は月間トラフィックで変動", source: "Meeton ai 料金", clusters: ["ai-sdr"] },
];

// First-party expertise to inject as an E-E-A-T / Experience signal (§4.13).
export const EXPERTISE =
  "DynaMeet 共同創業者の澤野拓実は、エンタープライズ領域の SDR / AE として商談化の現場知を持つ。記事はその一次的専門性を反映する。";

export function retrieveGrounding(cluster: ClusterId): { facts: Fact[]; expertise: string } {
  const facts = GROUNDING.filter((f) => f.clusters.includes(cluster) || f.clusters.includes("ai-sdr"));
  return { facts, expertise: EXPERTISE };
}

/** Extract numeric/percentage tokens from text (for the fact-check gate). */
export function extractStats(text: string): string[] {
  const m = text.match(/\d[\d,.]*\s*(%|％|倍|件|名|円|万|時間|日|分|秒|x|X)/g) || [];
  return Array.from(new Set(m.map((s) => s.replace(/\s+/g, ""))));
}
