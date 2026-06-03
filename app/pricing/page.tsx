import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CTAButtons from "@/app/components/v2/CTAButtons";
import { Section, SectionHead, Eyebrow, Card, Check } from "@/app/components/v2/ui";
import LogoWall from "@/app/components/v2/LogoWall";
import IntegrationLogos, { pickIntegrations } from "@/app/components/v2/IntegrationLogos";
import FounderNote from "@/app/components/v2/FounderNote";
import { signupUrl, demoUrl } from "@/app/lib/cta-urls";

export const metadata: Metadata = {
  title: { absolute: "料金｜Meeton ai — 無料から始める AI SDR Platform" },
  description:
    "Meeton ai の料金。無料ティア（クレカ不要）→ 単体Pro（Chat¥3万/Library¥3万/Calendar¥4万/Email¥5万）→ 全機能バンドル Growth¥12万/Scale¥20万/Enterprise。4つ別々¥15万よりGrowthが¥3万お得。年額は2ヶ月無料、適格請求書対応。",
  alternates: { canonical: "/pricing/" },
  openGraph: {
    title: "料金｜Meeton ai — 無料から始める AI SDR Platform",
    description:
      "無料ティア → 単体Pro → 全機能バンドル。4つ別々¥15万よりGrowth¥12万が¥3万お得。年額2ヶ月無料・適格請求書対応。",
    url: "https://dynameet.ai/pricing/",
    type: "website",
  },
};

const FREE = [
  { p: "Meeton Chat", q: "200会話/月・1サイト・Meetonブランド表示" },
  { p: "Meeton Calendar", q: "1名・基本予約（AIコンシェルジュは制限）" },
  { p: "Meeton Library", q: "資料3点・基本開封トラッキング・AIチャット制限" },
  { p: "Meeton Email", q: "14日トライアルのみ（CRM連携必須のため常設無料なし）" },
];

const PRO = [
  { p: "Meeton Chat", slug: "chat", price: "¥3万", inc: "会話実質無制限・過去文脈引継ぎ・1サイト" },
  { p: "Meeton Library", slug: "library", price: "¥3万", inc: "資料無制限・AI解説・リアルタイム通知・詳細トラッキング" },
  { p: "Meeton Calendar", slug: "calendar", price: "¥4万", inc: "AIコンシェルジュ・自動アサイン/ルーティング・CRM登録・3名" },
  { p: "Meeton Email", slug: "email", price: "¥5万", inc: "AI生成1:1フォロー・行動シグナル検知・チャット連携・CRM連携" },
];

const BUNDLES = [
  {
    name: "Growth",
    price: "¥12万",
    highlight: true,
    note: "単体合計¥15万より ¥3万お得",
    items: ["全4機能", "3名", "1サイト", "中容量"],
    cta: { label: "Growthで始める", href: signupUrl("pricing-growth") },
  },
  {
    name: "Scale",
    price: "¥20万",
    highlight: false,
    note: "成長フェーズの量に",
    items: ["全4機能", "10名", "複数導線", "高容量"],
    cta: { label: "Scaleで始める", href: signupUrl("pricing-scale") },
  },
  {
    name: "Enterprise",
    price: "要相談",
    highlight: false,
    note: "複数サイト・高度要件に",
    items: ["全4機能", "複数サイト", "高度CRM連携", "SSO・セキュリティ要件"],
    cta: { label: "相談する", href: demoUrl("pricing-enterprise") },
  },
];

const FAQ = [
  {
    q: "無料ティアにクレジットカードは必要ですか？",
    a: "不要です。Chat・Calendar・Library の無料ティアは、Google / Microsoft のワンクリック認証だけで始められます（Email はCRM連携が前提のため14日トライアル）。コア計測機能は無料でも絞りません。",
  },
  {
    q: "単体で買うのとバンドル、どちらが得ですか？",
    a: "1つの仕事だけ欲しいなら単体Pro（¥3〜5万/月）が最適です。2つ以上使うなら全4機能込みのバンドルが有利で、4つ別々に買うと合計¥15万のところ、Growthなら¥12万——¥3万お得です。例えばChat+Library+Calendarの3点（¥10万）なら、あと¥2万でEmailも付いて完全なAI SDR（Growth ¥12万）になります。",
  },
  {
    q: "Email もバンドルに含まれるのはなぜですか？",
    a: "「会話・提案・予約・追客を一気通貫」という価値はEmail込みで初めて成立するため、Growth/Scale/Enterprise の全バンドルに全4機能（Email含む）を同梱しています。Email単体が不要な場合は、必要な製品を単体Proで組み合わせることもできます。",
  },
  {
    q: "支払い方法と請求書（インボイス）は？",
    a: "単体Pro・Growthはクレジットカードでセルフサーブ決済（アップグレード時に課金）。Scale/Enterprise と年額前払いは請求書（銀行振込）に対応します。いずれもインボイス制度に対応した適格請求書（登録番号入り）を発行します。",
  },
  {
    q: "年額割引はありますか？",
    a: "あります。年額前払いは2ヶ月分無料（約17%オフ）です。",
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
    { "@type": "Offer", name: "無料", price: "0", priceCurrency: "JPY" },
    { "@type": "Offer", name: "Meeton Chat Pro", price: "30000", priceCurrency: "JPY" },
    { "@type": "Offer", name: "Meeton Library Pro", price: "30000", priceCurrency: "JPY" },
    { "@type": "Offer", name: "Meeton Calendar Pro", price: "40000", priceCurrency: "JPY" },
    { "@type": "Offer", name: "Meeton Email Pro", price: "50000", priceCurrency: "JPY" },
    { "@type": "Offer", name: "Growth（全4機能）", price: "120000", priceCurrency: "JPY" },
    { "@type": "Offer", name: "Scale（全4機能）", price: "200000", priceCurrency: "JPY" },
  ],
};

const th: React.CSSProperties = { textAlign: "left", padding: "14px 16px", fontWeight: 800, color: "var(--heading)", borderBottom: "2px solid var(--border)" };
const td: React.CSSProperties = { padding: "14px 16px", color: "var(--text)", borderBottom: "1px solid var(--border)", fontSize: 14, lineHeight: 1.7 };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Nav />

      {/* Hero */}
      <Section tone="navy" py={0} style={{ paddingTop: 124, paddingBottom: 64 }}>
        <div style={{ maxWidth: 760 }}>
          <Eyebrow tone="dark">料金</Eyebrow>
          <h1 style={{ fontFamily: "var(--fd)", fontSize: "clamp(32px,5vw,52px)", lineHeight: 1.18, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--on-navy)", margin: "20px 0 0" }}>
            無料から始めて、<span style={{ color: "var(--cta)" }}>必要な分だけ</span>。
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.85, color: "var(--on-navy-sub)", margin: "20px 0 28px" }}>
            まず無料で量とシグナルを生み、1つの仕事だけなら単体Pro、一気通貫にするならバンドルへ。
            すべて税抜/月。年額は2ヶ月無料（約17%オフ）。
          </p>
          <CTAButtons source="pricing-hero" tone="onNavy" size="lg" />
        </div>
      </Section>

      {/* Customer logo wall — social proof before the price decision */}
      <LogoWall tone="surface" />

      {/* 3-layer explanation */}
      <Section tone="white">
        <SectionHead eyebrow="3層構造" title="無料 → 単体Pro → バンドル。" lede="量を生む無料、最初の課金の単体、目的地のバンドル。崖でなく、段階で上がる設計です。" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {[
            { k: "第1層", t: "無料", d: "量とシグナルを生むエンジン。クレカ不要で、ここから始まる。" },
            { k: "第2層", t: "単体Pro", d: "1つの仕事だけ欲しい層へ。カードでセルフサーブ完結。" },
            { k: "第3層", t: "バンドル", d: "完全なAI SDR。全4機能で一気通貫。別々より得。" },
          ].map((x) => (
            <Card key={x.k}>
              <div style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 700, color: "var(--cta-ink)" }}>{x.k}</div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: "var(--heading)", margin: "8px 0 8px" }}>{x.t}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>{x.d}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Free tier */}
      <Section tone="surface">
        <SectionHead eyebrow="第1層 — 無料" title="無料で、コア計測まで使える。" lede="絞るのは量・席数・高度なAI機能だけ。訪問者トラッキング等のコア計測は無料でも絞りません（追客とアップセル判定の燃料だから）。" />
        <div style={{ overflowX: "auto", background: "#fff", border: "1px solid var(--border)", borderRadius: 16 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 520 }}>
            <thead><tr><th style={th}>製品</th><th style={th}>無料枠</th></tr></thead>
            <tbody>
              {FREE.map((r) => (
                <tr key={r.p}><td style={{ ...td, fontWeight: 700, color: "var(--heading)", whiteSpace: "nowrap" }}>{r.p}</td><td style={td}>{r.q}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 20 }}>
          <a href={signupUrl("pricing-free")} className="v2-cta-primary" style={{ background: "var(--cta)", color: "var(--on-cta)", padding: "13px 26px", borderRadius: 12, fontSize: 15, fontWeight: 800, textDecoration: "none", boxShadow: "0 6px 22px var(--cta-glow)" }}>
            無料で始める（クレカ不要）
          </a>
        </div>
      </Section>

      {/* Single Pro */}
      <Section tone="white">
        <SectionHead eyebrow="第2層 — 単体Pro" title="1製品=1価格。シンプルに。" lede="ティアを増やしません。1つの仕事だけ欲しい層へ。" />
        <div style={{ overflowX: "auto", border: "1px solid var(--border)", borderRadius: 16 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
            <thead><tr><th style={th}>製品</th><th style={th}>単体Pro（税抜/月）</th><th style={th}>含む</th><th style={th}></th></tr></thead>
            <tbody>
              {PRO.map((r) => (
                <tr key={r.p}>
                  <td style={{ ...td, fontWeight: 700, color: "var(--heading)", whiteSpace: "nowrap" }}>{r.p}</td>
                  <td style={{ ...td, fontWeight: 800, color: "var(--heading)", whiteSpace: "nowrap" }}>{r.price}</td>
                  <td style={td}>{r.inc}</td>
                  <td style={{ ...td, whiteSpace: "nowrap" }}>
                    <a href={signupUrl(`pricing-pro-${r.slug}`)} className="v2-link" style={{ display: "inline-block", color: "var(--cta-ink)", fontWeight: 700, textDecoration: "underline", padding: "10px 4px" }}>始める →</a>
                  </td>
                </tr>
              ))}
              <tr>
                <td style={{ ...td, fontWeight: 800, color: "var(--heading)" }}>単体合計</td>
                <td style={{ ...td, fontWeight: 800, color: "var(--sub)", textDecoration: "line-through", whiteSpace: "nowrap" }}>¥15万</td>
                <td style={td} colSpan={2}>4つ別々に買うと（→ バンドルなら下記）</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Bundles + savings device */}
      <Section tone="surface">
        <SectionHead eyebrow="第3層 — バンドル（完全なAI SDR）" title="まとめると、別々より安い。" align="center" />
        <div
          style={{
            maxWidth: 720, margin: "0 auto 36px", textAlign: "center",
            background: "var(--cta-light)", border: "1px solid #cdeede", borderRadius: 14, padding: "18px 22px",
            fontSize: 17, fontWeight: 700, color: "var(--heading)",
          }}
        >
          4つ別々に買うと <span style={{ textDecoration: "line-through", color: "var(--sub)" }}>合計¥15万</span> ／
          まとめて Growth なら <span style={{ color: "var(--cta-ink)" }}>¥12万</span> — <span style={{ color: "var(--cta-ink)" }}>¥3万お得</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, alignItems: "stretch" }}>
          {BUNDLES.map((b) => (
            <Card key={b.name} style={{ border: b.highlight ? "2px solid var(--cta)" : "1px solid var(--border)", display: "flex", flexDirection: "column", position: "relative" }}>
              {b.highlight && (
                <div style={{ position: "absolute", top: -12, left: 24, background: "var(--cta)", color: "#04231a", fontSize: 12, fontWeight: 800, padding: "4px 12px", borderRadius: 999 }}>おすすめ</div>
              )}
              <div style={{ fontSize: 18, fontWeight: 800, color: "var(--heading)" }}>{b.name}</div>
              <div style={{ fontFamily: "var(--fd)", fontSize: 40, fontWeight: 800, color: "var(--heading)", margin: "8px 0 4px" }}>
                {b.price}
                {b.price !== "要相談" && <span style={{ fontSize: 14, fontWeight: 600, color: "var(--sub)" }}> / 月（税抜）</span>}
              </div>
              <div style={{ fontSize: 13, color: "var(--cta-ink)", fontWeight: 700, marginBottom: 14 }}>{b.note}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "grid", gap: 8 }}>
                {b.items.map((it) => (
                  <li key={it} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 14, color: "var(--text)" }}><Check size={17} /> {it}</li>
                ))}
              </ul>
              <a
                href={b.cta.href}
                className={b.highlight ? "v2-cta-primary" : "v2-cta-ghost"}
                style={{
                  marginTop: "auto", textAlign: "center", padding: "12px 20px", borderRadius: 12, fontSize: 15, fontWeight: 800, textDecoration: "none",
                  background: b.highlight ? "var(--cta)" : "transparent",
                  color: b.highlight ? "var(--on-cta)" : "var(--heading)",
                  border: b.highlight ? "none" : "1.5px solid var(--border2)",
                  boxShadow: b.highlight ? "0 6px 22px var(--cta-glow)" : "none",
                }}
              >
                {b.cta.label}
              </a>
            </Card>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: 22, fontSize: 14, color: "var(--sub)" }}>
          年額は2ヶ月無料（約17%オフ）。カード決済・銀行振込いずれも適格請求書（インボイス制度対応）を発行します。
        </p>
      </Section>

      {/* Integration logos — show the stack the plans connect to */}
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
        <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
          <FounderNote compact />
        </div>
      </Section>

      {/* Final CTA */}
      <Section tone="navyDeep" py={72}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, color: "var(--on-navy)", margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            まずは無料で、動かしてみる。
          </h2>
          <p style={{ fontSize: 16, color: "var(--on-navy-sub)", margin: "0 0 28px" }}>クレジットカード不要。アップグレードはいつでも、アプリ内で。</p>
          <div style={{ display: "flex", justifyContent: "center" }}><CTAButtons source="pricing-footer" tone="onNavy" size="lg" align="center" /></div>
        </div>
      </Section>

      <Footer />
    </>
  );
}
