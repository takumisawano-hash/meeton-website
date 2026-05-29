import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CTAButtons from "@/app/components/v2/CTAButtons";
import { Section, SectionHead, Eyebrow, Card, ProductIcon, Check, MAXW } from "@/app/components/v2/ui";
import { PRODUCTS, PRODUCT_ORDER } from "@/app/lib/product-lp-data";

type CaseCard = {
  slug: string;
  name: string;
  industry?: string;
  quote?: string;
  heroMetric?: string;
  heroMetricLabel?: string;
};

const MOMENTS = ["問い合わせ前", "資料DL後", "再訪問", "追客"] as const;
// coverage: which product works in which moment (● strong / ○ supports)
const COVERAGE: Record<string, ("strong" | "support" | "")[]> = {
  //              calendar    chat        library     email
  問い合わせ前: ["", "strong", "support", ""],
  資料DL後: ["strong", "", "strong", "strong"],
  再訪問: ["support", "strong", "support", "strong"],
  追客: ["", "support", "support", "strong"],
};

const PILLARS = [
  { k: "Speed", t: "初動", d: "リードが動いた瞬間に動く。待たせない。", icon: "spark" },
  { k: "Persistence", t: "粘り", d: "一度で諦めず、シグナルを見て追い続ける。", icon: "spark" },
  { k: "Context", t: "文脈", d: "過去の閲覧・会話・行動を引き継いで対話する。", icon: "spark" },
];

export default function Home({ caseStudies = [] }: { caseStudies?: CaseCard[] }) {
  return (
    <>
      <Nav />

      {/* 1. Hero (navy) */}
      <Section tone="navy" py={0} style={{ paddingTop: 128, paddingBottom: 40 }}>
        <div style={{ maxWidth: 880 }}>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "var(--cta)" }}>
            リードは増えた。でも、商談は増えていない。
          </p>
          <h1
            style={{
              fontFamily: "var(--fd)",
              fontSize: "clamp(34px, 6vw, 60px)",
              lineHeight: 1.16,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--on-navy)",
              margin: "16px 0 0",
            }}
          >
            問い合わせを待つWebサイトから、<br />
            <span style={{ color: "var(--cta)" }}>商談を生み出す</span>AI営業チャネルへ。
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.85, color: "var(--on-navy-sub)", margin: "22px 0 30px", maxWidth: 720 }}>
            Meeton ai は、Webサイトに配属する AI SDR。会話・資料提案・予約・追客を自律でこなし、
            問い合わせ前から追客まで、あらゆる瞬間を商談に変えます。
          </p>
          <CTAButtons source="home-hero" tone="onNavy" size="lg" />
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 20, fontSize: 13, color: "var(--on-navy-sub)" }}>
            <span>✓ 無料で開始・クレジットカード不要</span>
            <span>✓ Google / Microsoft ワンクリック</span>
            <span>✓ ノーコード設置</span>
          </div>
        </div>
      </Section>

      {/* 2. Proof bar (navy, continuous with hero) */}
      <Section tone="navy" py={0} style={{ paddingTop: 8, paddingBottom: 56 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16,
            borderTop: "1px solid var(--on-navy-border)",
            paddingTop: 32,
          }}
        >
          {[
            { m: "60%+", l: "即予約フロー経由の商談化率" },
            { m: "20x", l: "チャット経由の商談機会（導入前比）" },
            { m: "約2倍", l: "提案・資料提示の件数" },
          ].map((s) => (
            <div key={s.l}>
              <div style={{ fontFamily: "var(--fd)", fontSize: 40, fontWeight: 800, color: "var(--cta)", lineHeight: 1 }}>{s.m}</div>
              <div style={{ fontSize: 13, color: "var(--on-navy-sub)", marginTop: 8 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. Why — problem truth */}
      <Section tone="white">
        <SectionHead
          eyebrow="なぜ商談にならないのか"
          title="商談は、接触前から始まっている。"
          lede="B2Bの買い手は、購買プロセスの約70%を営業に接触する前に独力で進めます（Gartner/6sense）。なのに大半の企業は、その間ずっと「待っている」だけ。リードが商談にならないのは、数の問題ではありません。"
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {[
            { t: "初動が遅い", d: "リード発生から接触まで数時間〜数日。最も熱い瞬間を逃している。" },
            { t: "一度で諦める", d: "すぐ予約しなかったリードを、そのまま冷ましている。追う粘りがない。" },
            { t: "文脈がない", d: "過去の閲覧・会話・行動を引き継がず、毎回ゼロから。的を外す。" },
          ].map((p) => (
            <Card key={p.t}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--heading)", margin: "0 0 8px" }}>{p.t}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>{p.d}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 4. The 4 jobs (product cards) */}
      <Section tone="surface">
        <SectionHead eyebrow="AI SDR の4つの仕事" title="会話し、資料を渡し、予約し、追う。" lede="段階で割らず、仕事で捉える。1つから無料で始め、つなぐほど一気通貫の AI SDR になります。" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
          {PRODUCT_ORDER.map((slug) => {
            const p = PRODUCTS[slug];
            return (
              <Link key={slug} href={`/${slug}/`} style={{ textDecoration: "none" }}>
                <Card style={{ height: "100%", transition: "border-color .2s" }}>
                  <div style={{ color: "var(--cta)", marginBottom: 14 }}>
                    <ProductIcon kind={p.icon} size={26} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--heading)", margin: "0 0 6px" }}>{p.productName}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.75, color: "var(--text)", margin: "0 0 14px" }}>{p.h1}</p>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "var(--cta-ink)" }}>詳しく見る →</span>
                </Card>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* 5. Coverage matrix (product × moment) */}
      <Section tone="white">
        <SectionHead
          eyebrow="買い手の旅 × AI SDR"
          title="あらゆる瞬間を、ひとつのAI SDRでカバー。"
          lede="瞬間と機能は1対1ではありません。チャットも資料も、複数の瞬間にまたがって効きます。その広さが Meeton ai の強みです。"
        />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560, fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "12px 14px", color: "var(--sub)", fontWeight: 700, borderBottom: "2px solid var(--border)" }}>
                  瞬間 ＼ 機能
                </th>
                {PRODUCT_ORDER.map((slug) => (
                  <th key={slug} style={{ padding: "12px 10px", color: "var(--heading)", fontWeight: 800, borderBottom: "2px solid var(--border)", whiteSpace: "nowrap" }}>
                    {PRODUCTS[slug].productName.replace("Meeton ", "")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOMENTS.map((m) => (
                <tr key={m}>
                  <td style={{ padding: "12px 14px", fontWeight: 700, color: "var(--heading)", borderBottom: "1px solid var(--border)" }}>{m}</td>
                  {COVERAGE[m].map((c, i) => (
                    <td key={i} style={{ textAlign: "center", padding: "12px 10px", borderBottom: "1px solid var(--border)" }}>
                      {c === "strong" ? (
                        <span style={{ color: "var(--cta)", fontSize: 18, fontWeight: 800 }}>●</span>
                      ) : c === "support" ? (
                        <span style={{ color: "var(--border2)", fontSize: 16 }}>○</span>
                      ) : (
                        <span style={{ color: "var(--border)" }}>·</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 13, color: "var(--sub)", marginTop: 14 }}>
          ● 主に担う ／ ○ 補完する。瞬間ごとの詳細は{" "}
          <Link href="/use-cases/pre-inquiry/" style={{ color: "var(--cta-ink)", textDecoration: "underline" }}>活用シーン</Link> へ。
        </p>
      </Section>

      {/* 6. How — AI SDR answer (navy) */}
      <Section tone="navy">
        <SectionHead
          eyebrow="どう解くか"
          title={<span style={{ color: "var(--on-navy)" }}>WebサイトにAI SDRを配属する。</span>}
          lede={<span style={{ color: "var(--on-navy-sub)" }}>待つのをやめ、あらゆる瞬間で自動で動かす。鍵は3つ。</span>}
          tone="dark"
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {PILLARS.map((p) => (
            <div key={p.k} style={{ background: "var(--navy-2)", border: "1px solid var(--on-navy-border)", borderRadius: 16, padding: 24 }}>
              <div style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 700, color: "var(--cta)", letterSpacing: ".08em" }}>{p.k}</div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: "var(--on-navy)", margin: "8px 0 8px" }}>{p.t}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--on-navy-sub)", margin: 0 }}>{p.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 7. Cases */}
      {caseStudies.length > 0 && (
        <Section tone="white">
          <SectionHead eyebrow="導入事例" title="成果が、データで出ている。" align="center" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {caseStudies.map((c) => (
              <Link key={c.slug} href={`/cases/${c.slug}/`} style={{ textDecoration: "none" }}>
                <Card style={{ height: "100%" }}>
                  {c.heroMetric && (
                    <div style={{ fontFamily: "var(--fd)", fontSize: 36, fontWeight: 800, color: "var(--cta)", lineHeight: 1 }}>
                      {c.heroMetric}
                    </div>
                  )}
                  {c.heroMetricLabel && <div style={{ fontSize: 13, color: "var(--sub)", margin: "6px 0 14px" }}>{c.heroMetricLabel}</div>}
                  {c.quote && <p style={{ fontSize: 14, lineHeight: 1.75, color: "var(--text)", margin: "0 0 14px" }}>「{c.quote}」</p>}
                  <div style={{ fontSize: 14, fontWeight: 800, color: "var(--heading)" }}>{c.name}</div>
                  {c.industry && <div style={{ fontSize: 12, color: "var(--sub)" }}>{c.industry}</div>}
                </Card>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <Link href="/cases/" style={{ fontSize: 15, fontWeight: 700, color: "var(--cta-ink)", textDecoration: "underline" }}>
              すべての事例を見る →
            </Link>
          </div>
        </Section>
      )}

      {/* 8. Soft router */}
      <Section tone="surface" py={64}>
        <SectionHead eyebrow="どの仕事から始める？" title="迷ったら、いちばん効く一手から。" align="center" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, maxWidth: 920, margin: "0 auto" }}>
          {[
            { slug: "calendar", q: "問い合わせの取りこぼしを止めたい" },
            { slug: "chat", q: "訪問者を会話で商談に繋げたい" },
            { slug: "library", q: "送った資料の反応を可視化したい" },
            { slug: "email", q: "既存リードを追客で再商談化したい" },
          ].map((r) => (
            <Link key={r.slug} href={`/${r.slug}/`} style={{ textDecoration: "none" }}>
              <Card style={{ display: "flex", gap: 12, alignItems: "center", height: "100%" }}>
                <span style={{ color: "var(--cta)" }}>
                  <ProductIcon kind={PRODUCTS[r.slug as keyof typeof PRODUCTS].icon} size={22} />
                </span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--heading)" }}>{r.q}</span>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* 9. Final CTA */}
      <Section tone="navyDeep" py={76}>
        <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(28px,4.4vw,42px)", fontWeight: 800, color: "var(--on-navy)", margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            待つWebサイトを、卒業する。
          </h2>
          <p style={{ fontSize: 16, color: "var(--on-navy-sub)", margin: "0 0 28px" }}>
            無料・クレジットカード不要。今日から AI SDR が動き出します。
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CTAButtons source="home-footer" tone="onNavy" size="lg" align="center" />
          </div>
        </div>
      </Section>

      <Footer />
    </>
  );
}
