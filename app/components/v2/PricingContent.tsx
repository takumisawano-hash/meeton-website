import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CTAButtons from "@/app/components/v2/CTAButtons";
import { Section, SectionHead, Eyebrow, Card, Check } from "@/app/components/v2/ui";
import LogoWall from "@/app/components/v2/LogoWall";
import IntegrationLogos, { pickIntegrations } from "@/app/components/v2/IntegrationLogos";
import { demoUrl } from "@/app/lib/cta-urls";
import type { Lang } from "@/app/lib/i18n";

// Lang-aware pricing body. JA is the default → the existing /pricing/ page
// renders byte-identically. The 3-plan structure and amounts (¥120,000〜 /
// Contact us) are founder-fixed; EN only translates labels/copy, never numbers.

type Plan = {
  name: string;
  stage: string;
  includes: string;
  price: string;
  source: string;
  highlight: boolean;
  badge?: string;
  blurb: string;
  items: string[];
};

type PricingStrings = {
  metaTitleAbsolute: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  heroEyebrow: string;
  heroH1a: React.ReactNode;
  heroSub: string;
  heroSecondaryLabel: string;
  plansEyebrow: string;
  plansTitle: string;
  plansLede: string;
  priceUnit: string; // suffix after the ¥ amount
  planCta: string;
  stagesLinkPre: string;
  stagesLinkText: string;
  trafficEyebrow: string;
  trafficTitle: string;
  trafficColTier: string;
  trafficColAdd: string;
  trafficNote: React.ReactNode;
  integEyebrow: string;
  integTitle: string;
  faqEyebrow: string;
  faqTitle: string;
  roiLink: string;
  finalTitle: string;
  finalSub: string;
  casesLabel: string;
  plans: Plan[];
  traffic: { tier: string; add: string }[];
  faq: { q: string; a: string }[];
};

export const PRICING_STR: Record<Lang, PricingStrings> = {
  ja: {
    metaTitleAbsolute: "料金｜Meeton ai — 3つのプランで、掴む→商談化→追客",
    metaDescription:
      "Meeton ai の料金。リード獲得プラン¥12万〜（掴む・育てる）。商談獲得プラン（+商談化）・オールインワンプラン（+追客）はお問い合わせ。規模は月間トラフィックで決まり、機能で3段階。すべて税抜/月・適格請求書対応。",
    ogTitle: "料金｜Meeton ai — 掴む→商談化→追客の3プラン",
    ogDescription:
      "リード獲得¥12万〜 / 商談獲得・オールインワンはお問い合わせ。規模は月間トラフィック、機能で3段階。",
    heroEyebrow: "料金プラン",
    heroH1a: (
      <>
        掴む → <span style={{ color: "var(--cta)" }}>商談化</span> → 追客。<br />必要な段階から。
      </>
    ),
    heroSub: "規模は月間トラフィックで決まり、機能で3段階に分かれます。すべて税抜/月。",
    heroSecondaryLabel: "導入事例を見る",
    plansEyebrow: "3つのプラン",
    plansTitle: "AI SDR の3つの仕事に、そのまま対応。",
    plansLede:
      "上位プランは下位の機能をすべて含みます。商談化（Calendar）・追客（Email）を、事業の成長に合わせて足していけます。",
    priceUnit: " 〜 / 月（税抜）",
    planCta: "このプランで相談する",
    stagesLinkPre: "ステージの考え方は",
    stagesLinkText: "AI SDR の3つの仕事",
    trafficEyebrow: "トラフィック追加（全プラン共通）",
    trafficTitle: "規模は、月間トラフィックで。",
    trafficColTier: "月間トラフィック",
    trafficColAdd: "追加料金",
    trafficNote: (
      <>
        カレンダー連携は全プラン無制限。複数サイト・高度な連携は{" "}
        <Link href="/enterprise/" className="v2-link" style={{ color: "var(--cta-ink)", textDecoration: "underline" }}>Enterprise（要相談）</Link>。年額前払いは2ヶ月無料（約17%オフ）。適格請求書（インボイス制度対応）を発行します。
      </>
    ),
    integEyebrow: "連携",
    integTitle: "主要なCRM・MA・通知基盤とつながります。",
    faqEyebrow: "よくある質問",
    faqTitle: "料金のFAQ",
    roiLink: "まず商談化の余地を試算する（ROI診断）→",
    finalTitle: "どのプランが合うか、まず相談。",
    finalSub: "30分のデモで、自社の規模と段階に合う構成を具体的に提案します。",
    casesLabel: "導入事例を見る",
    plans: [
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
    ],
    traffic: [
      { tier: "〜3万セッション/月", add: "基本料金に込み" },
      { tier: "〜10万セッション/月", add: "+¥6万" },
      { tier: "〜30万セッション/月", add: "+¥12万" },
      { tier: "30万超", add: "要相談" },
    ],
    faq: [
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
    ],
  },
  en: {
    metaTitleAbsolute: "Pricing｜Meeton ai — three plans: capture → convert → win back",
    metaDescription:
      "Meeton ai pricing. Lead Acquisition plan from ¥120,000/mo (capture & nurture). Meeting Acquisition plan (+convert) and All-in-One plan (+win back) are quote-based. Scale is set by monthly traffic, features in three tiers. All prices are tax-exclusive / month, with Japan qualified-invoice support.",
    ogTitle: "Pricing｜Meeton ai — three plans: capture → convert → win back",
    ogDescription:
      "Lead Acquisition from ¥120,000/mo / Meeting Acquisition & All-in-One are quote-based. Scale by monthly traffic, features in three tiers.",
    heroEyebrow: "Pricing plans",
    heroH1a: (
      <>
        Capture → <span style={{ color: "var(--cta)" }}>convert</span> → win back.<br />Start from the stage you need.
      </>
    ),
    heroSub: "Scale is set by monthly traffic, and features split into three tiers. All prices are tax-exclusive / month.",
    heroSecondaryLabel: "See customer stories",
    plansEyebrow: "Three plans",
    plansTitle: "Mapped directly to the three jobs of an AI SDR.",
    plansLede:
      "Higher plans include all the features of the lower ones. Add convert (Calendar) and win back (Email) as your business grows.",
    priceUnit: " 〜 / mo (excl. tax)",
    planCta: "Talk to us about this plan",
    stagesLinkPre: "For how the stages work, see",
    stagesLinkText: "the three jobs of an AI SDR",
    trafficEyebrow: "Traffic add-on (all plans)",
    trafficTitle: "Scale is set by monthly traffic.",
    trafficColTier: "Monthly traffic",
    trafficColAdd: "Add-on fee",
    trafficNote: (
      <>
        Calendar integration is unlimited on every plan. For multiple sites and advanced integrations, see{" "}
        <Link href="/enterprise/" className="v2-link" style={{ color: "var(--cta-ink)", textDecoration: "underline" }}>Enterprise (contact us)</Link>. Annual prepay is 2 months free (about 17% off). We issue Japan qualified invoices (invoice-system compliant).
      </>
    ),
    integEyebrow: "Integrations",
    integTitle: "Connects with major CRM, MA, and notification platforms.",
    faqEyebrow: "FAQ",
    faqTitle: "Pricing FAQ",
    roiLink: "First, estimate your meeting-conversion upside (ROI diagnosis) →",
    finalTitle: "Let's find the plan that fits — start with a talk.",
    finalSub: "In a 30-minute demo, we propose a concrete setup matched to your scale and stage.",
    casesLabel: "See customer stories",
    plans: [
      {
        name: "Lead Acquisition plan",
        stage: "① Capture & nurture",
        includes: "Live + Library",
        price: "¥120,000",
        source: "pricing-lead",
        highlight: false,
        blurb: "Capture latent prospects, nurture them, and turn them into leads. An entry point for companies that don't yet need Calendar.",
        items: ["Meeton Chat (capture visitors in conversation)", "Meeton Library (nurture consideration with content)", "CRM integration", "Open & behavior tracking"],
      },
      {
        name: "Meeting Acquisition plan",
        stage: "① + ② through to convert",
        includes: "+ Calendar",
        price: "Contact us",
        source: "pricing-convert",
        highlight: true,
        badge: "Recommended",
        blurb: "Carry captured leads all the way to a booked meeting. The most-chosen setup.",
        items: ["Everything in the Lead Acquisition plan", "Meeton Calendar integration (unlimited)", "AI concierge & auto-assignment", "Automated meeting booking"],
      },
      {
        name: "All-in-One plan",
        stage: "① + ② + ③ end to end",
        includes: "+ Email",
        price: "Contact us",
        source: "pricing-allinone",
        highlight: false,
        blurb: "Recover missed leads with follow-up too. Maximize capture → convert → win back, end to end.",
        items: ["Everything in the Meeting Acquisition plan", "Meeton Email features (unlimited)", "Behavior-signal-triggered 1:1 autonomous follow-up", "Re-conversion flow"],
      },
    ],
    traffic: [
      { tier: "Up to 30k sessions/mo", add: "Included in the base fee" },
      { tier: "Up to 100k sessions/mo", add: "+¥60,000" },
      { tier: "Up to 300k sessions/mo", add: "+¥120,000" },
      { tier: "Over 300k", add: "Contact us" },
    ],
    faq: [
      {
        q: "How should I choose a plan?",
        a: "The plans map to the three jobs of an AI SDR. If you only need to capture latent prospects and turn them into leads, choose the Lead Acquisition plan (from ¥120,000). To carry captured leads through to a meeting, choose the Meeting Acquisition plan (contact us — the most-chosen setup). For end-to-end follow-up of missed leads as well, choose the All-in-One plan (contact us). Higher plans include all the features of the lower ones.",
      },
      {
        q: "What determines the price?",
        a: "Two axes: the plan (range of features) and monthly traffic (number of sessions). The base fee includes up to 30k sessions/mo; up to 100k is +¥60,000, up to 300k is +¥120,000, and over 300k is quote-based. Calendar integration is unlimited on all plans.",
      },
      {
        q: "Can I upgrade to a higher plan?",
        a: "Yes. You can upgrade step by step as your business grows — Lead Acquisition → Meeting Acquisition → All-in-One — adding convert (Calendar) and win back (Email) later.",
      },
      {
        q: "What about multiple sites or advanced requirements?",
        a: "Multiple-site operation, advanced CRM integration, SSO, and security requirements are handled with Enterprise (contact us). See the Enterprise page for details.",
      },
      {
        q: "What payment methods and invoices do you support?",
        a: "We support credit card or invoice (bank transfer). In either case we issue Japan qualified invoices (with registration number) compliant with the invoice system.",
      },
    ],
  },
};

export const pricingFaqSchema = (lang: Lang, url: string) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url,
  mainEntity: PRICING_STR[lang].faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const pricingProductSchema = (lang: Lang, url: string) => {
  const plans = PRICING_STR[lang].plans;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${url}#product`,
    name: "Meeton ai",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url,
    publisher: { "@id": "https://dynameet.ai/#organization" },
    offers: [
      { "@type": "Offer", name: plans[0].name, price: "120000", priceCurrency: "JPY" },
      { "@type": "Offer", name: plans[1].name },
      { "@type": "Offer", name: plans[2].name },
    ],
  };
};

// SectionHead owns its <h2>, so balance line breaks via a block-level span.
const balanced = (text: string) => <span style={{ display: "block", textWrap: "balance", wordBreak: "auto-phrase" }}>{text}</span>;

const th: React.CSSProperties = { textAlign: "left", padding: "14px 16px", fontWeight: 800, color: "var(--heading)", borderBottom: "2px solid var(--border)" };
const td: React.CSSProperties = { padding: "14px 16px", color: "var(--text)", borderBottom: "1px solid var(--border)", fontSize: 14, lineHeight: 1.7, fontVariantNumeric: "tabular-nums" };

export default function PricingContent({ lang = "ja" }: { lang?: Lang }) {
  const s = PRICING_STR[lang];
  const casesHref = lang === "en" ? "/en/cases/" : "/cases/";
  const stagesHref = lang === "en" ? "/en/#stages" : "/#stages";
  return (
    <>
      <Nav lang={lang} />

      {/* Hero */}
      <Section tone="navy" py={0} style={{ paddingTop: 124, paddingBottom: 64 }}>
        <div style={{ maxWidth: 760 }}>
          <Eyebrow tone="dark">{s.heroEyebrow}</Eyebrow>
          <h1 style={{ fontFamily: "var(--fd)", fontSize: "clamp(32px,5vw,52px)", lineHeight: 1.18, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--on-navy)", margin: "20px 0 0", textWrap: "balance", wordBreak: "auto-phrase" }}>
            {s.heroH1a}
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.85, color: "var(--on-navy-sub)", margin: "20px 0 28px" }}>
            {s.heroSub}
          </p>
          <CTAButtons source="pricing-hero" tone="onNavy" size="lg" lang={lang} secondaryLabel={s.heroSecondaryLabel} secondaryHref={casesHref} />
        </div>
      </Section>

      <LogoWall tone="surface" />

      {/* 3 plans (deck p19) */}
      <Section tone="white">
        <SectionHead eyebrow={s.plansEyebrow} title={balanced(s.plansTitle)} lede={s.plansLede} align="center" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, alignItems: "stretch" }}>
          {s.plans.map((p) => (
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
              <div style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 700, color: p.highlight ? "var(--cta)" : "var(--cta-ink)", margin: "6px 0 2px" }}>{p.stage}</div>
              <div style={{ fontSize: 13, color: p.highlight ? "var(--on-navy-sub)" : "var(--sub)" }}>{p.includes}</div>
              <div style={{ fontFamily: "var(--fd)", fontWeight: 800, color: p.highlight ? "var(--on-navy)" : "var(--heading)", margin: "12px 0 2px", minHeight: 70, fontVariantNumeric: "tabular-nums" }}>
                {p.price.startsWith("¥") ? (
                  <>
                    <span style={{ fontSize: 42 }}>{p.price}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: p.highlight ? "var(--on-navy-sub)" : "var(--sub)" }}>{s.priceUnit}</span>
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
                {s.planCta}
              </a>
            </Card>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: 18, fontSize: 13, color: "var(--sub)" }}>
          {s.stagesLinkPre}{" "}
          <Link href={stagesHref} className="v2-link" style={{ color: "var(--cta-ink)", textDecoration: "underline" }}>{s.stagesLinkText}</Link>
          {lang === "ja" ? " をご覧ください。" : "."}
        </p>
      </Section>

      {/* Traffic add-on */}
      <Section tone="surface">
        <SectionHead eyebrow={s.trafficEyebrow} title={balanced(s.trafficTitle)} align="center" />
        <div style={{ overflowX: "auto", maxWidth: 720, margin: "0 auto", background: "#fff", border: "1px solid var(--border)", borderRadius: 16 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr><th scope="col" style={th}>{s.trafficColTier}</th><th scope="col" style={th}>{s.trafficColAdd}</th></tr></thead>
            <tbody>
              {s.traffic.map((tr) => (
                <tr key={tr.tier}><th scope="row" style={{ ...td, textAlign: "left", fontWeight: 700, color: "var(--heading)" }}>{tr.tier}</th><td style={td}>{tr.add}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "var(--sub)" }}>
          {s.trafficNote}
        </p>
      </Section>

      {/* Integration logos */}
      <Section tone="white" py={56}>
        <SectionHead eyebrow={s.integEyebrow} title={balanced(s.integTitle)} align="center" />
        <IntegrationLogos items={pickIntegrations(["Salesforce", "HubSpot", "Marketo", "Google Calendar", "Slack", "Microsoft Teams", "Zoom"])} />
      </Section>

      {/* FAQ */}
      <Section tone="white">
        <SectionHead eyebrow={s.faqEyebrow} title={balanced(s.faqTitle)} align="center" />
        <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gap: 14 }}>
          {s.faq.map((f) => (
            <Card key={f.q}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", margin: "0 0 8px" }}>{f.q}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--text)", margin: 0 }}>{f.a}</p>
            </Card>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: 24, fontSize: 14 }}>
          <Link href="/tools/roi/" className="v2-link" style={{ color: "var(--cta-ink)", fontWeight: 700, textDecoration: "underline" }}>
            {s.roiLink}
          </Link>
        </p>
      </Section>

      {/* Final CTA */}
      <Section tone="navyDeep" py={72}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, color: "var(--on-navy)", margin: "0 0 14px", letterSpacing: "-0.02em", textWrap: "balance", wordBreak: "auto-phrase" }}>
            {s.finalTitle}
          </h2>
          <p style={{ fontSize: 16, color: "var(--on-navy-sub)", margin: "0 0 28px" }}>{s.finalSub}</p>
          <div style={{ display: "flex", justifyContent: "center" }}><CTAButtons source="pricing-footer" tone="onNavy" size="lg" align="center" lang={lang} secondaryLabel={s.casesLabel} secondaryHref={casesHref} /></div>
        </div>
      </Section>

      <Footer lang={lang} />
    </>
  );
}
