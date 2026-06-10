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
  title: { absolute: "料金｜Meeton ai — 月額12万円〜のAI営業エージェント" },
  description:
    "Meeton ai の料金。月額12万円〜。Webサイトのリード対応・商談化・CRM連携を自動化するAI営業エージェント。料金は月間リード数・サイト流入数・連携CRM・利用機能・運用支援範囲により変動。Starter / Growth / Enterprise の3プラン。",
  alternates: { canonical: "/pricing/" },
  openGraph: {
    title: "料金｜Meeton ai — 月額12万円〜",
    description:
      "Webサイトのリード対応・商談化・CRM連携を自動化するAI営業エージェント。月額12万円〜、規模と機能で変動。",
    url: "https://dynameet.ai/pricing/",
    type: "website",
  },
};

const PLANS = [
  {
    name: "Starter",
    price: "月額12万円〜",
    highlight: false,
    target: "まずは問い合わせ・資料DL後の商談化を自動化したい企業",
    items: ["会話で訪問者を掴む（チャット）", "資料で見込み客を育てる", "コンバート直後の商談予約", "基本のCRM連携・通知"],
    cta: { label: "このプランで相談する", href: demoUrl("pricing-starter") },
  },
  {
    name: "Growth",
    price: "お問い合わせ",
    highlight: true,
    badge: "おすすめ",
    target: "CRM連携、ホットリード判定、担当者振り分けまで行いたい企業",
    items: ["Starterの全機能", "高度なCRM連携・会話ログ自動登録", "ホットリード判定（PQLシグナル）", "担当者の自動振り分け・追客自動化"],
    cta: { label: "相談する", href: demoUrl("pricing-growth") },
  },
  {
    name: "Enterprise",
    price: "お問い合わせ",
    highlight: false,
    target: "複数事業部、大規模サイト、Salesforce / HubSpot 高度連携",
    items: ["Growthの全機能", "複数事業部・複数サイト運用", "Salesforce / HubSpot 高度連携", "SSO・セキュリティ要件・専任サポート"],
    cta: { label: "相談する", href: demoUrl("pricing-enterprise") },
  },
];

// What the price varies by (replaces the old fixed traffic table).
const FACTORS = [
  { k: "月間リード数", d: "対応するリード・問い合わせの量" },
  { k: "サイト流入数", d: "月間セッション規模" },
  { k: "連携CRM", d: "Salesforce / HubSpot 等の連携範囲" },
  { k: "利用機能", d: "掴む・育てる・商談化・追客のどこまで使うか" },
  { k: "運用支援範囲", d: "設計・運用にどこまで伴走するか" },
];

const FAQ = [
  {
    q: "料金は何で決まりますか？",
    a: "月間リード数・サイト流入数・連携するCRM・利用する機能（掴む/育てる/商談化/追客）・運用支援の範囲によって変動します。Starter は月額12万円〜で、御社の規模と必要な機能に合わせてお見積りします。",
  },
  {
    q: "Starter ではどこまでできますか？",
    a: "問い合わせ・資料DL後の商談化の自動化が中心です。会話で訪問者を掴み、資料で育て、コンバート直後に商談予約まで運びます。基本的なCRM連携・通知も含みます。",
  },
  {
    q: "Growth と Enterprise の違いは？",
    a: "Growth は CRM連携・ホットリード判定（PQLシグナル）・担当者の自動振り分け・追客自動化まで行いたい企業向けです。Enterprise は複数事業部・大規模サイト・Salesforce/HubSpot の高度連携・SSO・セキュリティ要件・専任サポートが必要な企業向けです。いずれもお問い合わせください。",
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
  offers: {
    "@type": "Offer",
    name: "Starter",
    price: "120000",
    priceCurrency: "JPY",
    description: "月額12万円〜。Growth / Enterprise は要問い合わせ。",
  },
};

const th: React.CSSProperties = { textAlign: "left", padding: "14px 16px", fontWeight: 800, color: "var(--heading)", borderBottom: "2px solid var(--border)", fontSize: 14 };
const td: React.CSSProperties = { padding: "14px 16px", color: "var(--text)", borderBottom: "1px solid var(--border)", fontSize: 14, lineHeight: 1.7, verticalAlign: "top" };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Nav />

      {/* Hero — single price anchor */}
      <Section tone="navy" py={0} style={{ paddingTop: 124, paddingBottom: 56 }}>
        <div style={{ maxWidth: 780 }}>
          <Eyebrow tone="dark">料金</Eyebrow>
          <div style={{ fontFamily: "var(--fd)", fontSize: "clamp(40px,6.5vw,68px)", lineHeight: 1.1, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--on-navy)", margin: "20px 0 0" }}>
            月額<span style={{ color: "var(--cta)" }}>12万円</span>〜
          </div>
          <p style={{ fontSize: 18, lineHeight: 1.85, color: "var(--on-navy-sub)", margin: "20px 0 8px", maxWidth: 640 }}>
            Webサイトのリード対応、商談化、CRM連携を自動化するAI営業エージェントです。
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--on-navy-sub)", margin: "0 0 28px", maxWidth: 640 }}>
            料金は、月間リード数・サイト流入数・連携CRM・利用機能・運用支援範囲により変動します。
          </p>
          <CTAButtons source="pricing-hero" tone="onNavy" size="lg" secondaryLabel="導入事例を見る" secondaryHref="/cases/" />
        </div>
      </Section>

      <LogoWall tone="surface" />

      {/* 3 plans */}
      <Section tone="white">
        <SectionHead eyebrow="プラン" title="規模と、自動化したい範囲で選ぶ。" align="center" />
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
              <div style={{ fontSize: 19, fontWeight: 800, color: p.highlight ? "var(--on-navy)" : "var(--heading)" }}>{p.name}</div>
              <div style={{ fontFamily: "var(--fd)", fontSize: 30, fontWeight: 800, color: p.highlight ? "var(--on-navy)" : "var(--heading)", margin: "10px 0 12px" }}>{p.price}</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.7, color: p.highlight ? "var(--on-navy-sub)" : "var(--text)", margin: "0 0 16px" }}>{p.target}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "grid", gap: 9 }}>
                {p.items.map((it) => (
                  <li key={it} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 13.5, color: p.highlight ? "var(--on-navy)" : "var(--text)" }}><Check size={16} /> {it}</li>
                ))}
              </ul>
              <a
                href={p.cta.href}
                className={p.highlight ? "v2-cta-primary" : "v2-cta-ghost"}
                style={{
                  marginTop: "auto", textAlign: "center", padding: "12px 20px", borderRadius: 12, fontSize: 15, fontWeight: 800, textDecoration: "none",
                  background: p.highlight ? "var(--cta)" : "transparent",
                  color: p.highlight ? "var(--on-cta)" : "var(--heading)",
                  border: p.highlight ? "none" : "1.5px solid var(--border2)",
                  boxShadow: p.highlight ? "0 6px 22px var(--cta-glow)" : "none",
                }}
              >
                {p.cta.label}
              </a>
            </Card>
          ))}
        </div>
      </Section>

      {/* What price varies by */}
      <Section tone="surface">
        <SectionHead eyebrow="料金の決まり方" title="御社の規模と使い方に、合わせて。" lede="一律ではなく、必要な分だけ。以下の要素でお見積りします。" align="center" />
        <div style={{ maxWidth: 760, margin: "0 auto", overflowX: "auto", background: "#fff", border: "1px solid var(--border)", borderRadius: 16 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 420 }}>
            <thead><tr><th style={th}>変動要素</th><th style={th}>内容</th></tr></thead>
            <tbody>
              {FACTORS.map((f) => (
                <tr key={f.k}><td style={{ ...td, fontWeight: 700, color: "var(--heading)", whiteSpace: "nowrap" }}>{f.k}</td><td style={td}>{f.d}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "var(--sub)" }}>
          適格請求書（インボイス制度対応）を発行します。最適な構成は{" "}
          <a href={demoUrl("pricing-factors")} className="v2-link" style={{ color: "var(--cta-ink)", textDecoration: "underline" }}>30分のデモ</a> でご提案します。
        </p>
      </Section>

      {/* Integration logos */}
      <Section tone="white" py={56}>
        <SectionHead eyebrow="連携" title="主要なCRM・MA・通知基盤とつながります。" align="center" />
        <IntegrationLogos items={pickIntegrations(["Salesforce", "HubSpot", "Marketo", "Google Calendar", "Slack", "Microsoft Teams", "Zoom"])} />
      </Section>

      {/* FAQ */}
      <Section tone="white">
        <SectionHead eyebrow="よくある質問" title="料金のFAQ" align="center" />
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
          <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, color: "var(--on-navy)", margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            自社に合う構成を、まず相談。
          </h2>
          <p style={{ fontSize: 16, color: "var(--on-navy-sub)", margin: "0 0 28px" }}>30分のデモで、規模と必要な機能に合わせた料金を具体的にご提案します。</p>
          <div style={{ display: "flex", justifyContent: "center" }}><CTAButtons source="pricing-footer" tone="onNavy" size="lg" align="center" secondaryLabel="導入事例を見る" secondaryHref="/cases/" /></div>
        </div>
      </Section>

      <Footer />
    </>
  );
}
