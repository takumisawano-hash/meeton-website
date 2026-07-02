import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CTAButtons from "@/app/components/v2/CTAButtons";
import { Section, SectionHead, Eyebrow, Card, ProductIcon } from "@/app/components/v2/ui";
import { CLUSTERS } from "@/app/lib/content-clusters";
import { FEATURED_CASES } from "@/app/lib/featured-cases";
import type { PlaybookEntry } from "@/app/lib/playbook-data";
import type { Lang } from "@/app/lib/i18n";

const PROOF_SLUG: Record<string, string> = {
  edulinx: "edulinx-ai-chat-40-percent",
  biztex: "biztex-chat-leads-10x",
  univis: "univis-multi-service-3month-2deals",
};

// Fixed section chrome. JA is the default → existing call sites omit `lang`
// and render byte-identically.
const PB_CHROME = {
  ja: {
    skip: "本文へスキップ",
    painEyebrow: "課題",
    painTitle: "こんな状態になっていませんか？",
    solEyebrow: "解決",
    solTitle: "Meeton ai は、こう効く。",
    solLede: "該当する仕事を、AI SDR が担います。",
    proofMore: "他の事例を見る →",
    faqEyebrow: "よくある質問",
    faqTitle: "FAQ",
    ctaTitle: "まずは、デモで確かめる。",
    ctaSub: "30分のデモで、自社の商談化の進め方が具体的に見えます。",
    home: "ホーム",
  },
  en: {
    skip: "Skip to content",
    painEyebrow: "Challenges",
    painTitle: "Does this sound like you?",
    solEyebrow: "Solution",
    solTitle: "Here's how Meeton ai helps.",
    solLede: "The AI SDR takes on the relevant work.",
    proofMore: "See more customer stories →",
    faqEyebrow: "FAQ",
    faqTitle: "FAQ",
    ctaTitle: "Start by seeing it in a demo.",
    ctaSub: "In a 30-minute demo, you'll see concretely how to drive meeting conversion at your company.",
    home: "Home",
  },
} as const;

// EN proof overrides keyed by proofRef. The case CONTENT (Notion JA) is not
// translated yet; on the EN playbook LPs we render an English metric label +
// quote so the proof block reads English. Numbers/company kept exact.
const PB_PROOF_EN: Record<string, { metricLabel: string; quote: string; name: string; industry: string; heroMetric?: string }> = {
  edulinx: {
    metricLabel: "Meeting-conversion rate via Meeton ai (about 3x the ~20% industry average)",
    quote:
      "Customers who came through Meeton ai inquire in a clearly nurtured state. It's highly effective for meeting conversion.",
    name: "Training-industry leader",
    industry: "HR & training",
  },
  biztex: {
    metricLabel: "Chat-sourced leads (vs. legacy chat)",
    quote:
      "It used to be 1–2 a month. Since switching to Meeton ai, 20+ a month — over 20x the leads now come from chat.",
    name: "BizteX, Inc.",
    industry: "SaaS",
  },
  univis: {
    heroMetric: "2 deals won",
    metricLabel: "M&A and consulting wins closed in 3 months",
    quote:
      "Even when it doesn't turn into a meeting, you instantly see which companies are viewing your content. The number of proposals went up, too.",
    name: "Univis Group",
    industry: "Consulting",
  },
};

export default function PlaybookLP({ data, lang = "ja" }: { data: PlaybookEntry; lang?: Lang }) {
  const en = lang === "en";
  const c = PB_CHROME[lang];
  // Use the EN twin copy when present; otherwise fall back to JA fields.
  const t = en && data.en ? data.en : data;
  const src = `${data.kind}-${data.slug}`;
  const proof = data.proofRef ? FEATURED_CASES.find((cs) => cs.slug === PROOF_SLUG[data.proofRef!]) : undefined;
  const proofEn = en && data.proofRef ? PB_PROOF_EN[data.proofRef] : undefined;
  return (
    <>
      <a href="#main" className="v2-skip">{c.skip}</a>
      <Nav lang={lang} />
      <main id="main">

      <Section tone="navy" py={0} style={{ paddingTop: 124, paddingBottom: 60 }}>
        <div style={{ maxWidth: 820 }}>
          <Eyebrow tone="dark">{t.badge}</Eyebrow>
          <p style={{ margin: "22px 0 10px", fontSize: 16, fontWeight: 700, color: "var(--cta)" }}>{t.problemLine}</p>
          <h1 style={{ fontFamily: "var(--fd)", fontSize: "clamp(30px,4.8vw,48px)", lineHeight: 1.2, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--on-navy)", margin: 0 }}>
            {t.h1}
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: "var(--on-navy-sub)", margin: "20px 0 28px", maxWidth: 680 }}>{t.sub}</p>
          <CTAButtons
            source={`${src}-hero`}
            tone="onNavy"
            size="lg"
            lang={lang}
            assurances={
              en
                ? ["1-month free trial — no credit card", "One JS tag, install in 5 minutes", "No scenario design"]
                : ["JSタグ1行・約5分で設置", "シナリオ設計不要", "30分のデモで自社への効き方を確認"]
            }
          />
        </div>
      </Section>

      {/* 課題 / Challenges */}
      <Section tone="white">
        <SectionHead eyebrow={c.painEyebrow} title={c.painTitle} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {t.pains.map((p) => (
            <Card key={p.title}>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--heading)", margin: "0 0 8px" }}>{p.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>{p.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 解決 / Solution */}
      <Section tone="surface">
        <SectionHead eyebrow={c.solEyebrow} title={c.solTitle} lede={c.solLede} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {t.plays.map((pl, i) => {
            // product mapping is language-agnostic → read it from the JA entry
            // by index so the cluster pillar link still resolves on EN.
            const product = data.plays[i]?.product;
            const cl = product ? CLUSTERS[product] : null;
            return (
              <Card key={i} style={{ background: "#fff" }}>
                {cl && (
                  <div style={{ color: "var(--cta)", marginBottom: 12 }}>
                    <ProductIcon kind={product as string} size={22} />
                  </div>
                )}
                <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--heading)", margin: "0 0 8px" }}>{pl.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text)", margin: "0 0 12px" }}>{pl.desc}</p>
                {cl && (
                  <Link href={en ? `/en${cl.pillar}` : cl.pillar} style={{ fontSize: 13, fontWeight: 700, color: "var(--cta-ink)", textDecoration: "none" }}>
                    {cl.pillarName} →
                  </Link>
                )}
              </Card>
            );
          })}
        </div>
      </Section>

      {/* proof — stacks to 1 column on mobile */}
      {proof && (
        <Section tone="navy">
          <div className="pb-proof" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 40, alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "var(--fd)", fontSize: "clamp(40px,7vw,72px)", fontWeight: 800, color: "var(--cta)", lineHeight: 1 }}>{proofEn?.heroMetric ?? proof.heroMetric}</div>
              <div style={{ fontSize: 13, color: "var(--on-navy-sub)", marginTop: 8, maxWidth: 240 }}>{proofEn?.metricLabel ?? proof.heroMetricLabel}</div>
            </div>
            <div>
              <p style={{ fontSize: "clamp(17px,2.2vw,22px)", lineHeight: 1.7, color: "var(--on-navy)", fontWeight: 600, margin: 0 }}>
                {en ? `“${proofEn?.quote ?? proof.quote}”` : `「${proof.quote}」`}
              </p>
              <div style={{ fontSize: 13, color: "var(--on-navy-sub)", marginTop: 14 }}>
                — {proofEn?.name ?? proof.name}{en ? ` (${proofEn?.industry ?? proof.industry})` : `（${proof.industry}）`}
              </div>
              <Link href={en ? "/en/cases/" : "/cases/"} style={{ display: "inline-block", marginTop: 14, color: "var(--cta)", fontWeight: 700, textDecoration: "none" }}>{c.proofMore}</Link>
            </div>
          </div>
          <style>{`@media(max-width:720px){.pb-proof{grid-template-columns:1fr;gap:24px}}`}</style>
        </Section>
      )}

      {t.faq.length > 0 && (
        <Section tone="white">
          <SectionHead eyebrow={c.faqEyebrow} title={c.faqTitle} align="center" />
          <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gap: 14 }}>
            {t.faq.map((f) => (
              <Card key={f.q}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", margin: "0 0 8px" }}>{f.q}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--text)", margin: 0 }}>{f.a}</p>
              </Card>
            ))}
          </div>
        </Section>
      )}

      <Section tone="navyDeep" py={68}>
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(24px,3.6vw,34px)", fontWeight: 800, color: "var(--on-navy)", margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            {c.ctaTitle}
          </h2>
          <p style={{ fontSize: 15, color: "var(--on-navy-sub)", margin: "0 0 26px" }}>{c.ctaSub}</p>
          <div style={{ display: "flex", justifyContent: "center" }}><CTAButtons source={`${src}-footer`} tone="onNavy" size="lg" align="center" lang={lang} /></div>
        </div>
      </Section>
      </main>

      <Footer lang={lang} />
    </>
  );
}

export function playbookSchema(data: PlaybookEntry, path: string, lang: Lang = "ja") {
  const en = lang === "en";
  const t = en && data.en ? data.en : data;
  const faq = t.faq.length > 0 ? {
    "@context": "https://schema.org", "@type": "FAQPage", url: `https://dynameet.ai${path}`,
    mainEntity: t.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  } : null;
  const breadcrumb = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: en ? "Home" : "ホーム", item: "https://dynameet.ai/" },
      { "@type": "ListItem", position: 2, name: t.h1, item: `https://dynameet.ai${path}` },
    ],
  };
  return { faq, breadcrumb };
}
