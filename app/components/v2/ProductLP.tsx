import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CTAButtons from "@/app/components/v2/CTAButtons";
import { Section, SectionHead, Eyebrow, Card, ProductIcon, Check, MAXW } from "@/app/components/v2/ui";
import type { ProductLPData } from "@/app/lib/product-lp-data";
import { COMPARE } from "@/app/lib/compare-data";
import IntegrationLogos, { pickIntegrations } from "@/app/components/v2/IntegrationLogos";
import ProductMedia from "@/app/components/v2/ProductMedia";
import { stageOf } from "@/app/lib/stages";
import type { Lang } from "@/app/lib/i18n";

// 8-section product-LP template (spec §2.2). Server-rendered so all copy is
// in the HTML for AEO (§4.16). CTAs are client islands for tracking.
// Bilingual: product copy comes from the localized `data` prop; only the
// surrounding chrome strings live here, keyed off `lang` (JA default → the
// Japanese site renders byte-identically when the prop is omitted).

// Chrome / template strings, per locale. English stage labels live here
// (stages.ts is JA-only and must not be restructured). The product copy
// itself is NOT here — it is supplied by the localized `data` prop.
const STR = {
  ja: {
    skip: "本文へスキップ",
    stageBadge: (num: string, title: string, transform: string) => `${num} ${title}ステージ（${transform}）`,
    heroAssurances: ["ノーコード設置・既存スタックに連携", "30分のデモで自社への効き方を確認", "24時間365日、深夜・週末のリードも逃さない"],
    howEyebrow: "30秒で分かる仕組み",
    howTitle: (p: string) => `${p} の動き方`,
    step: "STEP",
    compareLabel: "比較で見る:",
    compareLink: (name: string) => `vs ${name} →`,
    integrationsEyebrow: "スタック連携",
    integrationsTitle: "今のスタックに、そのまま挿さる。",
    proofMore: "導入事例をもっと見る →",
    midCtaLine: (p: string) => `${p} の効き方を、30分のデモで。`,
    pricingEyebrow: "料金",
    pricingTitle: "月額12万円〜。必要な分だけ。",
    pricingLede: "料金は月間トラフィックと機能で変動します。リード獲得 / 商談獲得 / オールインワン の3プラン。",
    pricingLink: "料金の詳細を見る →",
    expansionEyebrow: "これは Meeton ai の一部",
    expansionStages: "AI SDR の4つの仕事を見る →",
    expansionPricing: "料金を見る →",
    faqEyebrow: "よくある質問",
    faqTitle: (p: string) => `${p} のFAQ`,
    finalTitle: (p: string) => `${p} を、デモで体験する。`,
    finalSub: "30分のデモで、自社サイトでの効き方を具体的に確認できます。",
  },
  en: {
    skip: "Skip to content",
    stageBadge: (num: string, _title: string, label: string) => `${num} ${label}`,
    heroAssurances: ["1-month free trial — no credit card required", "No-code install, connects to your existing stack", "Live within 1 business day"],
    howEyebrow: "How it works, in 30 seconds",
    howTitle: (p: string) => `How ${p} works`,
    step: "STEP",
    compareLabel: "Compare:",
    compareLink: (name: string) => `vs ${name} →`,
    integrationsEyebrow: "Stack integrations",
    integrationsTitle: "Slots straight into your current stack.",
    proofMore: "See more customer stories →",
    midCtaLine: (p: string) => `Try ${p} free for 1 month — or see it in a 30-minute demo.`,
    pricingEyebrow: "Pricing",
    pricingTitle: "From ¥120,000/mo. Only what you need.",
    pricingLede: "Pricing varies by monthly traffic and features. Three plans: Lead Acquisition / Meeting Acquisition / All-in-One — every plan starts with a 1-month free trial.",
    pricingLink: "See pricing details →",
    expansionEyebrow: "This is part of Meeton ai",
    expansionStages: "See the 4 jobs of the AI SDR →",
    expansionPricing: "See pricing →",
    faqEyebrow: "FAQ",
    faqTitle: (p: string) => `${p} FAQ`,
    finalTitle: (p: string) => `Try ${p} free for 1 month.`,
    finalSub: "Live within 1 business day — one JS tag, no credit card. Prefer a walkthrough? A 30-minute demo shows exactly how it works on your own site.",
  },
} as const;

// English label for each AI SDR stage (stages.ts stores JA only).
const STAGE_LABEL_EN: Record<"capture" | "nurture" | "convert" | "follow", string> = {
  capture: "Capture stage (Prospects → Leads)",
  nurture: "Nurture stage (Not-yet-ready → warm leads)",
  convert: "Convert stage (Leads → Meetings)",
  follow: "Win-back stage (Recover lost leads)",
};

// Compound Latin terms (product names, KPI phrases) that must never break
// mid-phrase on narrow screens; consumed by nowrapTerms() in the hero.
const NOWRAP_TERMS = /(Meeton (?:ai|Calendar|Chat|Library|Email)|Speed to Lead|AI SDR)/g;

/** Wrap compound terms in nowrap spans so hero copy avoids orphan breaks. */
function nowrapTerms(text: string) {
  // split() with a capturing group alternates plain / captured parts
  return text.split(NOWRAP_TERMS).map((part, i) =>
    i % 2 === 1 ? <span key={i} style={{ whiteSpace: "nowrap" }}>{part}</span> : part,
  );
}

export default function ProductLP({ data, lang = "ja" }: { data: ProductLPData; lang?: Lang }) {
  const src = data.slug;
  const s = STR[lang];
  const en = lang === "en";
  // Cross-cluster compare links: EN compare pages don't exist yet, so we omit
  // the compare row on EN rather than create dead /en links (or link to JA
  // compare pages from an EN page). On JA, unchanged.
  const compares = en ? [] : Object.values(COMPARE).filter((c) => c.product === data.slug);
  const stage = stageOf(data.slug);
  // Internal links: both trees exist now — EN points at the /en twins.
  const stagesHref = en ? "/en/#stages" : "/#stages";
  const pricingHref = en ? "/en/pricing/" : "/pricing/";
  const stageBadge = en
    ? s.stageBadge(stage.num, stage.title, STAGE_LABEL_EN[stage.id])
    : s.stageBadge(stage.num, stage.title, stage.transform);
  return (
    <>
      <a href="#main" className="v2-skip">{s.skip}</a>
      <Nav lang={lang} />
      <main id="main">

      {/* 1. Hero (navy frame) */}
      <Section tone="navy" py={0} style={{ paddingTop: 124, paddingBottom: 76 }}>
        <div style={{ maxWidth: 820 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 4 }}>
            <Eyebrow tone="dark">{data.eyebrow}</Eyebrow>
            <Link href={stagesHref} style={{ fontSize: 12, fontWeight: 700, color: "var(--cta)", textDecoration: "none", background: "var(--on-navy-surface)", border: "1px solid var(--on-navy-border)", borderRadius: 999, padding: "5px 12px" }}>
              {stageBadge}
            </Link>
          </div>
          <p style={{ marginTop: 22, marginBottom: 10, fontSize: 16, color: "var(--cta)", fontWeight: 700 }}>
            {data.problemLine}
          </p>
          <h1
            style={{
              fontFamily: "var(--fd)",
              fontSize: "clamp(32px, 5.2vw, 52px)",
              lineHeight: 1.18,
              fontWeight: 800,
              letterSpacing: "-0.025em",
              color: "var(--on-navy)",
              margin: 0,
              textWrap: "balance",
              wordBreak: "auto-phrase",
            }}
          >
            {nowrapTerms(data.h1)}
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.85, color: "var(--on-navy-sub)", margin: "22px 0 30px", maxWidth: 680, wordBreak: "auto-phrase" }}>
            {nowrapTerms(data.heroSub)}
          </p>
          <CTAButtons source={`${src}-hero`} tone="onNavy" size="lg" lang={lang} />
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 22, fontSize: 13, color: "var(--on-navy-sub)" }}>
            {s.heroAssurances.map((line) => (
              <span key={line}>✓ {line}</span>
            ))}
          </div>
        </div>
      </Section>

      {/* 1.5 Big product media (the demo they came to see) */}
      <Section tone="navy" py={0} style={{ paddingBottom: 72, marginTop: -16 }}>
        <ProductMedia slug={data.slug} icon={data.icon} alt={data.productName} lang={lang} />
      </Section>

      {/* 2. How it works */}
      <Section tone="white">
        <SectionHead eyebrow={s.howEyebrow} title={s.howTitle(data.productName)} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {data.steps.map((step, i) => (
            <Card key={i}>
              <div style={{ fontFamily: "var(--fm)", fontSize: 13, fontWeight: 700, color: "var(--cta-ink)" }}>
                {s.step} {i + 1}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--heading)", margin: "10px 0 8px" }}>{step.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>{step.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 3. Differentiation + AI angle */}
      <Section tone="surface">
        <SectionHead eyebrow={data.competitorsLabel} title={data.diffTitle} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {data.diffPoints.map((d, i) => (
            <Card key={i} style={{ background: "#fff" }}>
              <div style={{ color: "var(--cta)", marginBottom: 12 }}>
                <ProductIcon kind="spark" size={22} />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--heading)", margin: "0 0 8px" }}>{d.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>{d.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 3.5 Compare links (cluster internal linking §4.8) */}
      {compares.length > 0 && (
        <Section tone="white" py={48}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "var(--sub)" }}>{s.compareLabel}</span>
            {compares.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}/`}
                style={{ fontSize: 14, fontWeight: 700, color: "var(--cta-ink)", textDecoration: "none", background: "var(--cta-light)", border: "1px solid #cdeede", borderRadius: 999, padding: "8px 16px" }}
              >
                {s.compareLink(c.competitorName)}
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* 4. Proof (navy band, green metric) — stacks to 1 column on mobile.
          Optional: products without approved customer numbers omit it. */}
      {data.proof && (
        <Section tone="navy">
          <div className="plp-proof" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 40, alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "var(--fd)", fontSize: "clamp(48px,8vw,84px)", fontWeight: 800, color: "var(--cta)", lineHeight: 1 }}>
                {data.proof.metric}
              </div>
              <div style={{ fontSize: 14, color: "var(--on-navy-sub)", marginTop: 8, maxWidth: 220 }}>{data.proof.label}</div>
            </div>
            <div>
              <p style={{ fontSize: "clamp(18px,2.4vw,24px)", lineHeight: 1.7, color: "var(--on-navy)", fontWeight: 600, margin: 0 }}>
                {en ? `“${data.proof.quote}”` : `「${data.proof.quote}」`}
              </p>
              <div style={{ fontSize: 13, color: "var(--on-navy-sub)", marginTop: 14 }}>— {data.proof.source}</div>
              <Link href={en ? "/en/cases/" : "/cases/"} style={{ display: "inline-block", marginTop: 16, fontSize: 14, fontWeight: 800, color: "var(--cta)", textDecoration: "none" }}>
                {s.proofMore}
              </Link>
            </div>
          </div>
          <style>{`@media(max-width:720px){.plp-proof{grid-template-columns:1fr;gap:24px}}`}</style>
        </Section>
      )}

      {/* 5. Stack integrations (real logos) */}
      <Section tone="white" py={64}>
        <SectionHead eyebrow={s.integrationsEyebrow} title={s.integrationsTitle} align="center" />
        <IntegrationLogos items={pickIntegrations(data.integrations)} lang={lang} />
      </Section>

      {/* 5.5 Mid-page CTA strip — the hero CTA is 4+ sections above by now;
          give committed scrollers a conversion point before pricing/FAQ. */}
      <Section tone="navy" py={56}>
        <div className="plp-ctastrip">
          <p className="plp-ctastrip-line">{s.midCtaLine(data.productName)}</p>
          <CTAButtons source={`${src}-mid`} tone="onNavy" size="md" lang={lang} />
        </div>
        <style>{`
          .plp-ctastrip{display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap}
          .plp-ctastrip-line{font-family:var(--fd);font-size:clamp(20px,2.6vw,26px);font-weight:800;letter-spacing:-.02em;color:var(--on-navy);margin:0}
          @media(max-width:720px){.plp-ctastrip{flex-direction:column;align-items:flex-start;gap:18px}}
        `}</style>
      </Section>

      {/* 6. Pricing — single anchor (月額12万円〜, varies by scale/usage) */}
      <Section tone="surface">
        <SectionHead eyebrow={s.pricingEyebrow} title={s.pricingTitle} align="center" lede={s.pricingLede} />
        <div style={{ textAlign: "center" }}>
          <Link href={pricingHref} className="v2-link" style={{ fontSize: 15, fontWeight: 700, color: "var(--cta-ink)", textDecoration: "underline" }}>
            {s.pricingLink}
          </Link>
        </div>
      </Section>

      {/* 7. Expansion teaser (navy) */}
      <Section tone="navy" py={64}>
        <div style={{ maxWidth: 760 }}>
          <Eyebrow tone="dark">{s.expansionEyebrow}</Eyebrow>
          <p style={{ fontSize: "clamp(20px,3vw,28px)", lineHeight: 1.6, color: "var(--on-navy)", fontWeight: 700, margin: "18px 0 0" }}>
            {data.crossSell}
          </p>
          <div style={{ marginTop: 22, display: "flex", gap: 18, flexWrap: "wrap" }}>
            <Link href={stagesHref} style={{ color: "var(--cta)", fontWeight: 700, textDecoration: "none" }}>
              {s.expansionStages}
            </Link>
            <Link href={pricingHref} style={{ color: "var(--on-navy-sub)", fontWeight: 700, textDecoration: "none" }}>
              {s.expansionPricing}
            </Link>
          </div>
        </div>
      </Section>

      {/* FAQ (AEO — answers self-contained; schema emitted in route) */}
      <Section tone="white">
        <SectionHead eyebrow={s.faqEyebrow} title={s.faqTitle(data.productName)} align="center" />
        <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gap: 14 }}>
          {data.faq.map((f, i) => (
            <Card key={i}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", margin: "0 0 8px" }}>{f.q}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--text)", margin: 0 }}>{f.a}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 8. Final CTA (navy deep) */}
      <Section tone="navyDeep" py={72}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, color: "var(--on-navy)", margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            {s.finalTitle(data.productName)}
          </h2>
          <p style={{ fontSize: 16, color: "var(--on-navy-sub)", margin: "0 0 28px" }}>
            {s.finalSub}
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CTAButtons source={`${src}-footer`} tone="onNavy" size="lg" align="center" lang={lang} />
          </div>
        </div>
      </Section>
      </main>

      <Footer lang={lang} />
    </>
  );
}

// Canonical URL for a product LP, locale-aware (JA at root, EN under /en/*).
const lpUrl = (slug: string, lang: Lang) =>
  lang === "en" ? `https://dynameet.ai/en/${slug}/` : `https://dynameet.ai/${slug}`;

/** FAQPage JSON-LD for a product LP — call from the route's server page. */
export function productFaqSchema(data: ProductLPData, lang: Lang = "ja") {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: lpUrl(data.slug, lang),
    mainEntity: data.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** SoftwareApplication JSON-LD for a product LP. */
export function productAppSchema(data: ProductLPData, lang: Lang = "ja") {
  const url = lpUrl(data.slug, lang);
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${url}#product`,
    name: data.productName,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: data.metaDescription,
    url,
    image: "https://dynameet.ai/logo-dark.svg",
    publisher: { "@id": "https://dynameet.ai/#organization" },
    offers: {
      "@type": "Offer",
      price: "120000",
      priceCurrency: "JPY",
      description:
        lang === "en"
          ? "From ¥120,000/mo. Varies by scale, features used, and level of operational support."
          : "月額12万円〜。規模・利用機能・運用支援範囲により変動。",
    },
  };
}

const PRODUCT_PATH = (slug: string) => `https://dynameet.ai/${slug}`;
export { PRODUCT_PATH };
