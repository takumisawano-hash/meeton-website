import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CTAButtons from "@/app/components/v2/CTAButtons";
import { Section, SectionHead, Eyebrow, Card, Check } from "@/app/components/v2/ui";
import LogoWall from "@/app/components/v2/LogoWall";
import IntegrationLogos, { pickIntegrations } from "@/app/components/v2/IntegrationLogos";
import { demoUrl } from "@/app/lib/cta-urls";

export const metadata: Metadata = {
  title: { absolute: "料金｜Meeton ai — 3つのプランで、掴む→商談化→追客" },
  description:
    "Meeton ai の料金。リード獲得プラン¥12万〜（掴む・育てる）。商談獲得プラン（+商談化）・オールインワンプラン（+追客）はお問い合わせ。規模は月間トラフィックで決まり、機能で3段階。すべて税抜/月・適格請求書対応。",
  alternates: { canonical: "/pricing/" },
  openGraph: {
    title: "料金｜Meeton ai — 掴む→商談化→追客の3プラン",
    description:
      "リード獲得¥12万〜 / 商談獲得・オールインワンはお問い合わせ。規模は月間トラフィック、機能で3段階。",
    url: "https://dynameet.ai/pricing/",
    type: "website",
  },
};

// Deck p19. Plans map 1:1 to the 3 stages (stages.ts): ① capture → ② convert
// → ③ follow. Price scales by monthly traffic; the plan defines which stages
// (products) are included.
const PLANS = [
  {
    name: "リード獲得プラン",
    stage: "① 掴む・育てる",
    includes: "Live + Library",
    price: "¥12万",
    source: "pricing-lead",
    highlight: false,
    blurb: "潜在層を掴み、育てて、リードにする。Calendar が不要な企業の入口に。",
    items: ["Meeton Chat（会話で訪問者を掴む）", "Meeton Library（資料で検討を育てる）", "CRM 連携", "開封・行動トラッキング"],
  },
  {
    name: "商談獲得プラン",
    stage: "① + ② 商談化まで",
    includes: "+ Calendar",
    price: "お問い合わせ",
    source: "pricing-convert",
    highlight: true,
    badge: "おすすめ",
    blurb: "掴んだリードを、商談（予約）まで運ぶ。最も選ばれる構成。",
    items: ["リード獲得プランの全機能", "Meeton Calendar 連携（無制限）", "AIコンシェルジュ・自動アサイン", "商談予約の自動化"],
  },
  {
    name: "オールインワンプラン",
    stage: "① + ② + ③ 一気通貫",
    includes: "+ Email",
    price: "お問い合わせ",
    source: "pricing-allinone",
    highlight: false,
    blurb: "逃したリードも追客で回収。掴む→商談化→追客まで一気通貫で最大化。",
    items: ["商談獲得プランの全機能", "Meeton Email 機能（無制限）", "行動シグナル起点の1:1自律追客", "再商談化フロー"],
  },
];

const TRAFFIC = [
  { tier: "〜3万セッション/月", add: "基本料金に込み" },
  { tier: "〜10万セッション/月", add: "+¥6万" },
  { tier: "〜30万セッション/月", add: "+¥12万" },
  { tier: "30万超", add: "要相談" },
];

const FAQ = [
  {
    q: "プランはどう選べばいいですか？",
    a: "AI SDR の3つの仕事に対応します。潜在層を掴んでリードにするだけなら『リード獲得プラン（¥12万〜）』、掴んだリードを商談まで運ぶなら『商談獲得プラン（お問い合わせ・最も選ばれる構成）』、逃したリードの追客まで一気通貫なら『オールインワンプラン（お問い合わせ）』です。上位プランは下位の機能をすべて含みます。",
  },
  {
    q: "料金は何で決まりますか？",
    a: "プラン（機能の範囲）と、月間トラフィック（セッション数）の2軸で決まります。基本料金に3万セッション/月まで込み、〜10万で+¥6万、〜30万で+¥12万、30万超は要相談です。Calendar 連携は全プランで無制限です。",
  },
  {
    q: "上位プランへの変更はできますか？",
    a: "できます。リード獲得→商談獲得→オールインワンへ、事業の成長に合わせて段階的にアップグレードできます。商談化（Calendar）や追客（Email）を後から足す形です。",
  },
  {
    q: "複数サイト・高度な要件は？",
    a: "複数サイト運用・高度なCRM連携・SSO・セキュリティ要件などは Enterprise（要相談）で対応します。詳細は エンタープライズ ページをご覧ください。",
  },
  {
    q: "支払い方法と請求書（インボイス）は？",
    a: "クレジットカードまたは請求書（銀行振込）に対応します。いずれもインボイス制度に対応した適格請求書（登録番号入り）を発行します。",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: "https://dynameet.ai/pricing/",
  mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": "https://dynameet.ai/pricing/#product",
  name: "Meeton ai",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://dynameet.ai/pricing/",
  publisher: { "@id": "https://dynameet.ai/#organization" },
  offers: [
    { "@type": "Offer", name: "リード獲得プラン", price: "120000", priceCurrency: "JPY" },
    { "@type": "Offer", name: "商談獲得プラン" },
    { "@type": "Offer", name: "オールインワンプラン" },
  ],
};

// SectionHead owns its <h2>, so balance line breaks (no orphaned 「す。」) via a
// block-level span passed through the title prop.
const balanced = (text: string) => <span style={{ display: "block", textWrap: "balance", wordBreak: "auto-phrase" }}>{text}</span>;

const th: React.CSSProperties = { textAlign: "left", padding: "14px 16px", fontWeight: 800, color: "var(--heading)", borderBottom: "2px solid var(--border)" };
const td: React.CSSProperties = { padding: "14px 16px", color: "var(--text)", borderBottom: "1px solid var(--border)", fontSize: 14, lineHeight: 1.7, fontVariantNumeric: "tabular-nums" };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Nav />

      {/* Hero */}
      <Section tone="navy" py={0} style={{ paddingTop: 124, paddingBottom: 64 }}>
        <div style={{ maxWidth: 760 }}>
          <Eyebrow tone="dark">料金プラン</Eyebrow>
          <h1 style={{ fontFamily: "var(--fd)", fontSize: "clamp(32px,5vw,52px)", lineHeight: 1.18, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--on-navy)", margin: "20px 0 0", textWrap: "balance", wordBreak: "auto-phrase" }}>
            掴む → <span style={{ color: "var(--cta)" }}>商談化</span> → 追客。<br />必要な段階から。
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.85, color: "var(--on-navy-sub)", margin: "20px 0 28px" }}>
            規模は月間トラフィックで決まり、機能で3段階に分かれます。すべて税抜/月。
          </p>
          <CTAButtons source="pricing-hero" tone="onNavy" size="lg" secondaryLabel="導入事例を見る" secondaryHref="/cases/" />
        </div>
      </Section>

      <LogoWall tone="surface" />

      {/* 3 plans (deck p19) */}
      <Section tone="white">
        <SectionHead eyebrow="3つのプラン" title={balanced("AI SDR の3つの仕事に、そのまま対応。")} lede="上位プランは下位の機能をすべて含みます。商談化（Calendar）・追客（Email）を、事業の成長に合わせて足していけます。" align="center" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, alignItems: "stretch" }}>
          {PLANS.map((p) => (
            <Card
              key={p.name}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                border: p.highlight ? "2px solid var(--cta)" : "1px solid var(--border)",
                background: p.highlight ? "var(--navy)" : "#fff",
              }}
            >
              {p.badge && (
                <div style={{ position: "absolute", top: -12, left: 24, background: "var(--cta)", color: "var(--on-cta)", fontSize: 12, fontWeight: 800, padding: "4px 12px", borderRadius: 999 }}>{p.badge}</div>
              )}
              <h3 style={{ fontSize: 18, fontWeight: 800, color: p.highlight ? "var(--on-navy)" : "var(--heading)", margin: 0 }}>{p.name}</h3>
              {/* --cta fails contrast as small text on white; keep it only on the navy card */}
              <div style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 700, color: p.highlight ? "var(--cta)" : "var(--cta-ink)", margin: "6px 0 2px" }}>{p.stage}</div>
              <div style={{ fontSize: 13, color: p.highlight ? "var(--on-navy-sub)" : "var(--sub)" }}>{p.includes}</div>
              {/* minHeight matches the 42px price line (42 * 1.65) so all card tops align */}
              <div style={{ fontFamily: "var(--fd)", fontWeight: 800, color: p.highlight ? "var(--on-navy)" : "var(--heading)", margin: "12px 0 2px", minHeight: 70, fontVariantNumeric: "tabular-nums" }}>
                {p.price.startsWith("¥") ? (
                  <>
                    <span style={{ fontSize: 42 }}>{p.price}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: p.highlight ? "var(--on-navy-sub)" : "var(--sub)" }}> 〜 / 月（税抜）</span>
                  </>
                ) : (
                  <span style={{ fontSize: 34 }}>{p.price}</span>
                )}
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.7, color: p.highlight ? "var(--on-navy-sub)" : "var(--text)", margin: "10px 0 16px" }}>{p.blurb}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "grid", gap: 9 }}>
                {p.items.map((it) => (
                  <li key={it} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 13.5, color: p.highlight ? "var(--on-navy)" : "var(--text)" }}><Check size={16} /> {it}</li>
                ))}
              </ul>
              <a
                href={demoUrl(p.source)}
                className={p.highlight ? "v2-cta-primary" : "v2-cta-ghost"}
                style={{
                  marginTop: "auto", textAlign: "center", padding: "12px 20px", borderRadius: 12, fontSize: 15, fontWeight: 800, textDecoration: "none",
                  background: p.highlight ? "var(--cta)" : "transparent",
                  color: p.highlight ? "var(--on-cta)" : p.highlight ? "var(--on-navy)" : "var(--heading)",
                  border: p.highlight ? "none" : "1.5px solid var(--border2)",
                  boxShadow: p.highlight ? "0 6px 22px var(--cta-glow)" : "none",
                }}
              >
                このプランで相談する
              </a>
            </Card>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: 18, fontSize: 13, color: "var(--sub)" }}>
          ステージの考え方は{" "}
          <Link href="/#stages" className="v2-link" style={{ color: "var(--cta-ink)", textDecoration: "underline" }}>AI SDR の3つの仕事</Link> をご覧ください。
        </p>
      </Section>

      {/* Traffic add-on */}
      <Section tone="surface">
        <SectionHead eyebrow="トラフィック追加（全プラン共通）" title={balanced("規模は、月間トラフィックで。")} align="center" />
        <div style={{ overflowX: "auto", maxWidth: 720, margin: "0 auto", background: "#fff", border: "1px solid var(--border)", borderRadius: 16 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr><th scope="col" style={th}>月間トラフィック</th><th scope="col" style={th}>追加料金</th></tr></thead>
            <tbody>
              {TRAFFIC.map((t) => (
                <tr key={t.tier}><th scope="row" style={{ ...td, textAlign: "left", fontWeight: 700, color: "var(--heading)" }}>{t.tier}</th><td style={td}>{t.add}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "var(--sub)" }}>
          カレンダー連携は全プラン無制限。複数サイト・高度な連携は{" "}
          <Link href="/enterprise/" className="v2-link" style={{ color: "var(--cta-ink)", textDecoration: "underline" }}>Enterprise（要相談）</Link>。年額前払いは2ヶ月無料（約17%オフ）。適格請求書（インボイス制度対応）を発行します。
        </p>
      </Section>

      {/* Integration logos */}
      <Section tone="white" py={56}>
        <SectionHead eyebrow="連携" title={balanced("主要なCRM・MA・通知基盤とつながります。")} align="center" />
        <IntegrationLogos items={pickIntegrations(["Salesforce", "HubSpot", "Marketo", "Google Calendar", "Slack", "Microsoft Teams", "Zoom"])} />
      </Section>

      {/* FAQ */}
      <Section tone="white">
        <SectionHead eyebrow="よくある質問" title={balanced("料金のFAQ")} align="center" />
        <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gap: 14 }}>
          {FAQ.map((f) => (
            <Card key={f.q}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", margin: "0 0 8px" }}>{f.q}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--text)", margin: 0 }}>{f.a}</p>
            </Card>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: 24, fontSize: 14 }}>
          <Link href="/tools/roi/" className="v2-link" style={{ color: "var(--cta-ink)", fontWeight: 700, textDecoration: "underline" }}>
            まず商談化の余地を試算する（ROI診断）→
          </Link>
        </p>
      </Section>

      {/* Final CTA */}
      <Section tone="navyDeep" py={72}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, color: "var(--on-navy)", margin: "0 0 14px", letterSpacing: "-0.02em", textWrap: "balance", wordBreak: "auto-phrase" }}>
            どのプランが合うか、まず相談。
          </h2>
          <p style={{ fontSize: 16, color: "var(--on-navy-sub)", margin: "0 0 28px" }}>30分のデモで、自社の規模と段階に合う構成を具体的に提案します。</p>
          <div style={{ display: "flex", justifyContent: "center" }}><CTAButtons source="pricing-footer" tone="onNavy" size="lg" align="center" secondaryLabel="導入事例を見る" secondaryHref="/cases/" /></div>
        </div>
      </Section>

      <Footer />
    </>
  );
}
