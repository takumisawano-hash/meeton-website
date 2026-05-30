import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CTAButtons from "@/app/components/v2/CTAButtons";
import { Section, SectionHead, Eyebrow, Card, Check } from "@/app/components/v2/ui";
import { demoUrl } from "@/app/lib/cta-urls";

export const metadata: Metadata = {
  title: { absolute: "エンタープライズ｜Meeton ai — SSO・CRM連携・セキュリティ" },
  description: "Meeton ai のエンタープライズ要件。SSO・API、CRMへの会話ログ自動登録、権限・監査ログ管理、契約終了後のデータ取扱、複数サイト・高度CRM連携まで。営業アシスト帯の導入を支援します。",
  alternates: { canonical: "/enterprise/" },
  openGraph: { title: "エンタープライズ｜Meeton ai", description: "SSO・CRM連携・権限/監査ログ・セキュリティ要件に対応。", url: "https://dynameet.ai/enterprise/", type: "website" },
};

const REQS = [
  { t: "SSO・API", d: "SAML/OIDC によるシングルサインオン。API でのデータ連携・自動化に対応。" },
  { t: "CRMへの会話ログ自動登録", d: "Salesforce・HubSpot に会話・予約・行動ログを自動記録。手入力ゼロ。" },
  { t: "権限・監査ログ管理", d: "ロールベースのアクセス制御と操作監査ログで、統制要件に対応。" },
  { t: "契約終了後のデータ取扱", d: "解約後のデータ削除・エクスポートの取り扱いを明確化。" },
  { t: "複数サイト・複数導線", d: "複数ドメイン・複数事業の導線を1アカウントで横断管理。" },
  { t: "高度なCRM連携", d: "カスタムオブジェクト・項目マッピング等、複雑な連携要件に対応。" },
];

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage", url: "https://dynameet.ai/enterprise/",
  mainEntity: [
    { "@type": "Question", name: "SSOには対応していますか？", acceptedAnswer: { "@type": "Answer", text: "はい。SAML/OIDC によるシングルサインオンに対応します。詳細はエンタープライズプラン（要相談）でご案内します。" } },
    { "@type": "Question", name: "セキュリティ体制は？", acceptedAnswer: { "@type": "Answer", text: "権限・監査ログ管理、CRMへの会話ログ自動登録、契約終了後のデータ取扱の明確化に対応します。詳細は /security をご覧ください。" } },
    { "@type": "Question", name: "支払いは請求書払いできますか？", acceptedAnswer: { "@type": "Answer", text: "Scale/Enterprise・年額前払いは請求書（銀行振込）に対応し、インボイス制度対応の適格請求書を発行します。" } },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Nav />
      <Section tone="navy" py={0} style={{ paddingTop: 124, paddingBottom: 60 }}>
        <div style={{ maxWidth: 760 }}>
          <Eyebrow tone="dark">エンタープライズ</Eyebrow>
          <h1 style={{ fontFamily: "var(--fd)", fontSize: "clamp(30px,4.8vw,48px)", lineHeight: 1.2, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--on-navy)", margin: "20px 0 0" }}>
            要件は、ちゃんと満たす。
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: "var(--on-navy-sub)", margin: "18px 0 28px" }}>
            SSO・CRM連携・権限/監査ログ・複数サイト・データ取扱——エンプラ導入の前提を整え、営業が伴走して導入します。
          </p>
          <a href={demoUrl("enterprise-hero")} style={{ background: "var(--cta)", color: "#04231a", padding: "14px 28px", borderRadius: 12, fontSize: 16, fontWeight: 800, textDecoration: "none", boxShadow: "0 6px 22px var(--cta-glow)" }}>
            要件を相談する
          </a>
        </div>
      </Section>

      <Section tone="white">
        <SectionHead eyebrow="エンタープライズ要件" title="統制・連携・セキュリティに対応。" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {REQS.map((r) => (
            <Card key={r.t}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <Check size={20} />
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", margin: "0 0 6px" }}>{r.t}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>{r.d}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <p style={{ fontSize: 14, color: "var(--sub)", marginTop: 20 }}>
          セキュリティの詳細は <Link href="/security/" style={{ color: "var(--cta-ink)", textDecoration: "underline" }}>セキュリティ</Link>、連携は <Link href="/integrations/" style={{ color: "var(--cta-ink)", textDecoration: "underline" }}>連携一覧</Link>、料金は <Link href="/pricing/" style={{ color: "var(--cta-ink)", textDecoration: "underline" }}>料金</Link> をご覧ください。
        </p>
      </Section>

      <Section tone="navyDeep" py={68}>
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(24px,3.6vw,34px)", fontWeight: 800, color: "var(--on-navy)", margin: "0 0 14px", letterSpacing: "-0.02em" }}>要件に合うか、まず相談。</h2>
          <p style={{ fontSize: 15, color: "var(--on-navy-sub)", margin: "0 0 26px" }}>30分のデモで、自社要件への適合を具体的に確認できます。</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <a href={demoUrl("enterprise-footer")} style={{ background: "var(--cta)", color: "#04231a", padding: "14px 28px", borderRadius: 12, fontSize: 16, fontWeight: 800, textDecoration: "none", boxShadow: "0 6px 22px var(--cta-glow)" }}>デモを予約</a>
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
}
