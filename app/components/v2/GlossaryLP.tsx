import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CTAButtons from "@/app/components/v2/CTAButtons";
import { Section, SectionHead, Eyebrow, Card } from "@/app/components/v2/ui";
import { CLUSTERS, type ClusterId } from "@/app/lib/content-clusters";
import type { GlossaryTerm } from "@/app/lib/glossary-data";
import { getTerm, getTermEn } from "@/app/lib/glossary-data";
import { AUTHOR, AUTHOR_EN, authorPersonSchema } from "@/app/lib/author";
import type { Lang } from "@/app/lib/i18n";

// Definition-first glossary page (§4.12). The shortDef is a self-contained
// answer placed first for AEO passage extraction; DefinedTerm + FAQ schema.
// Bilingual: `lang` (JA default) switches the template chrome + cluster blurb;
// the term copy itself comes from the localized `data` prop. JA omits the prop
// → byte-identical output.

const STR = {
  ja: {
    eyebrow: "用語集",
    h1: (term: string) => `${term} とは？`,
    supervisor: (name: string, title: string) => `監修: ${name}（${title}）`,
    faqHeading: "よくある質問",
    relatedProductLabel: "関連プロダクト",
    seePillar: (name: string) => `${name} を見る →`,
    relatedTerms: "関連用語:",
    finalTitle: (term: string) => `${term} を、実際に動かす。`,
    finalSub: "30分のデモで、Meeton ai の効き方を具体的に確認できます。",
  },
  en: {
    eyebrow: "Glossary",
    h1: (term: string) => `What is ${term}?`,
    supervisor: (name: string, title: string) => `Reviewed by: ${name} (${title})`,
    faqHeading: "FAQ",
    relatedProductLabel: "Related product",
    seePillar: (name: string) => `See ${name} →`,
    relatedTerms: "Related terms:",
    finalTitle: (term: string) => `Put ${term} into action.`,
    finalSub: "A 30-minute demo shows exactly how Meeton ai works for you.",
  },
} as const;

// English cluster blurbs (content-clusters.ts stores JA only). pillarName is a
// brand/product name, kept as-is. EN pillar hrefs point at /en/<slug>/.
const CLUSTER_EN: Record<ClusterId, { blurb: string; pillar: string }> = {
  library: { blurb: "Turn proposals into meetings with sales-content sharing, open tracking, and AI explanation.", pillar: "/en/library/" },
  calendar: { blurb: "Follow up the moment a lead arises. Carry scheduling all the way to meeting conversion.", pillar: "/en/calendar/" },
  email: { blurb: "AI follows up 1:1 with leads who didn't book, triggered by behavior signals.", pillar: "/en/email/" },
  chat: { blurb: "Stand on the consideration foundation before an inquiry and convert visitors through conversation.", pillar: "/en/chat/" },
  "ai-sdr": { blurb: "What an AI SDR is and how to raise the meeting-conversion rate—the category's definition and practical know-how.", pillar: "/en/" },
};

export default function GlossaryLP({ data, lang = "ja" }: { data: GlossaryTerm; lang?: Lang }) {
  const en = lang === "en";
  const s = STR[lang];
  const cluster = CLUSTERS[data.cluster];
  const pillarName = cluster.pillarName;
  const blurb = en ? CLUSTER_EN[data.cluster].blurb : cluster.blurb;
  const pillarHref = en ? CLUSTER_EN[data.cluster].pillar : cluster.pillar;
  const lookup = en ? getTermEn : getTerm;
  const termBase = en ? "/en/glossary" : "/glossary";
  const related = data.related.map(lookup).filter(Boolean) as GlossaryTerm[];
  return (
    <>
      <Nav lang={lang} />

      <Section tone="navy" py={0} style={{ paddingTop: 122, paddingBottom: 52 }}>
        <div style={{ maxWidth: 800 }}>
          <Eyebrow tone="dark">{s.eyebrow}</Eyebrow>
          <h1 style={{ fontFamily: "var(--fd)", fontSize: "clamp(30px,4.8vw,46px)", lineHeight: 1.2, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--on-navy)", margin: "20px 0 0" }}>
            {s.h1(data.term)}
          </h1>
          {/* 結論先出し — AEO snippable answer */}
          <div style={{ background: "var(--navy-2)", border: "1px solid var(--on-navy-border)", borderRadius: 14, padding: "18px 20px", marginTop: 22 }}>
            <p style={{ fontSize: 17, lineHeight: 1.85, color: "var(--on-navy)", margin: 0 }}>{data.shortDef}</p>
          </div>
          <div style={{ marginTop: 16, fontSize: 13, color: "var(--on-navy-sub)" }}>
            {en ? s.supervisor(AUTHOR_EN.name, AUTHOR_EN.jobTitle) : s.supervisor(AUTHOR.name, AUTHOR.jobTitle)}
          </div>
        </div>
      </Section>

      <Section tone="white">
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {data.body.map((p, i) => (
            <p key={i} style={{ fontSize: 16, lineHeight: 1.95, color: "var(--text)", margin: "0 0 18px" }}>{p}</p>
          ))}

          {data.faq.length > 0 && (
            <div style={{ marginTop: 36 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--heading)", margin: "0 0 16px" }}>{s.faqHeading}</h2>
              <div style={{ display: "grid", gap: 14 }}>
                {data.faq.map((f) => (
                  <Card key={f.q}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", margin: "0 0 8px" }}>{f.q}</h3>
                    <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--text)", margin: 0 }}>{f.a}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* Related pillar + terms (§4.8) */}
      <Section tone="surface" py={56}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Card style={{ background: "#fff" }}>
            <div style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 700, color: "var(--cta-ink)", marginBottom: 6 }}>{s.relatedProductLabel}</div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--heading)", margin: "0 0 6px" }}>{pillarName}</h3>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: "var(--text)", margin: "0 0 12px" }}>{blurb}</p>
            <Link href={pillarHref} style={{ fontSize: 14, fontWeight: 700, color: "var(--cta-ink)", textDecoration: "underline" }}>
              {s.seePillar(pillarName)}
            </Link>
          </Card>

          {related.length > 0 && (
            <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--sub)", alignSelf: "center" }}>{s.relatedTerms}</span>
              {related.map((t) => (
                <Link key={t.slug} href={`${termBase}/${t.slug}/`} style={{ fontSize: 13, fontWeight: 700, color: "var(--cta-ink)", textDecoration: "none", background: "var(--cta-light)", border: "1px solid #cdeede", borderRadius: 999, padding: "6px 14px" }}>
                  {t.term}
                </Link>
              ))}
            </div>
          )}
        </div>
      </Section>

      <Section tone="navyDeep" py={64}>
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(24px,3.6vw,34px)", fontWeight: 800, color: "var(--on-navy)", margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            {s.finalTitle(data.term)}
          </h2>
          <p style={{ fontSize: 15, color: "var(--on-navy-sub)", margin: "0 0 26px" }}>{s.finalSub}</p>
          <div style={{ display: "flex", justifyContent: "center" }}><CTAButtons source={`glossary-${data.slug}`} tone="onNavy" size="lg" align="center" lang={lang} /></div>
        </div>
      </Section>

      <Footer lang={lang} />
    </>
  );
}

export function glossarySchema(data: GlossaryTerm, lang: Lang = "ja") {
  const base = lang === "en" ? "https://dynameet.ai/en/glossary" : "https://dynameet.ai/glossary";
  const defined = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: data.term,
    description: data.shortDef,
    inDefinedTermSet: `${base}/`,
    url: `${base}/${data.slug}/`,
    author: authorPersonSchema(),
  };
  const faq =
    data.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          url: `${base}/${data.slug}/`,
          mainEntity: data.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }
      : null;
  return { defined, faq };
}
