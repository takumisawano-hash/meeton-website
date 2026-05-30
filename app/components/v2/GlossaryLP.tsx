import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CTAButtons from "@/app/components/v2/CTAButtons";
import { Section, SectionHead, Eyebrow, Card } from "@/app/components/v2/ui";
import { CLUSTERS } from "@/app/lib/content-clusters";
import type { GlossaryTerm } from "@/app/lib/glossary-data";
import { getTerm } from "@/app/lib/glossary-data";

// Definition-first glossary page (§4.12). The shortDef is a self-contained
// answer placed first for AEO passage extraction; DefinedTerm + FAQ schema.

export default function GlossaryLP({ data }: { data: GlossaryTerm }) {
  const cluster = CLUSTERS[data.cluster];
  const related = data.related.map(getTerm).filter(Boolean) as GlossaryTerm[];
  return (
    <>
      <Nav />

      <Section tone="navy" py={0} style={{ paddingTop: 122, paddingBottom: 52 }}>
        <div style={{ maxWidth: 800 }}>
          <Eyebrow tone="dark">用語集</Eyebrow>
          <h1 style={{ fontFamily: "var(--fd)", fontSize: "clamp(30px,4.8vw,46px)", lineHeight: 1.2, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--on-navy)", margin: "20px 0 0" }}>
            {data.term} とは？
          </h1>
          {/* 結論先出し — AEO snippable answer */}
          <div style={{ background: "var(--navy-2)", border: "1px solid var(--on-navy-border)", borderRadius: 14, padding: "18px 20px", marginTop: 22 }}>
            <p style={{ fontSize: 17, lineHeight: 1.85, color: "var(--on-navy)", margin: 0 }}>{data.shortDef}</p>
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
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--heading)", margin: "0 0 16px" }}>よくある質問</h2>
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
            <div style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 700, color: "var(--cta-ink)", marginBottom: 6 }}>関連プロダクト</div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--heading)", margin: "0 0 6px" }}>{cluster.pillarName}</h3>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: "var(--text)", margin: "0 0 12px" }}>{cluster.blurb}</p>
            <Link href={cluster.pillar} style={{ fontSize: 14, fontWeight: 700, color: "var(--cta-ink)", textDecoration: "underline" }}>
              {cluster.pillarName} を見る →
            </Link>
          </Card>

          {related.length > 0 && (
            <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--sub)", alignSelf: "center" }}>関連用語:</span>
              {related.map((t) => (
                <Link key={t.slug} href={`/glossary/${t.slug}/`} style={{ fontSize: 13, fontWeight: 700, color: "var(--cta-ink)", textDecoration: "none", background: "var(--cta-light)", border: "1px solid #cdeede", borderRadius: 999, padding: "6px 14px" }}>
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
            {data.term} を、実際に動かす。
          </h2>
          <p style={{ fontSize: 15, color: "var(--on-navy-sub)", margin: "0 0 26px" }}>Meeton ai なら無料・クレジットカード不要で today から。</p>
          <div style={{ display: "flex", justifyContent: "center" }}><CTAButtons source={`glossary-${data.slug}`} tone="onNavy" size="lg" align="center" /></div>
        </div>
      </Section>

      <Footer />
    </>
  );
}

export function glossarySchema(data: GlossaryTerm) {
  const defined = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: data.term,
    description: data.shortDef,
    inDefinedTermSet: "https://dynameet.ai/glossary/",
    url: `https://dynameet.ai/glossary/${data.slug}/`,
  };
  const faq =
    data.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          url: `https://dynameet.ai/glossary/${data.slug}/`,
          mainEntity: data.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }
      : null;
  return { defined, faq };
}
