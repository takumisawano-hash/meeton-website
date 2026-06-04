import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CTAButtons from "@/app/components/v2/CTAButtons";
import { Section, SectionHead, Eyebrow, Card, ProductIcon } from "@/app/components/v2/ui";
import { CLUSTERS } from "@/app/lib/content-clusters";
import { FEATURED_CASES } from "@/app/lib/featured-cases";
import type { PlaybookEntry } from "@/app/lib/playbook-data";

const PROOF_SLUG: Record<string, string> = {
  edulinx: "edulinx-ai-chat-40-percent",
  biztex: "biztex-chat-leads-10x",
  univis: "univis-multi-service-3month-2deals",
};

export default function PlaybookLP({ data }: { data: PlaybookEntry }) {
  const src = `${data.kind}-${data.slug}`;
  const proof = data.proofRef ? FEATURED_CASES.find((c) => c.slug === PROOF_SLUG[data.proofRef!]) : undefined;
  return (
    <>
      <Nav />

      <Section tone="navy" py={0} style={{ paddingTop: 124, paddingBottom: 60 }}>
        <div style={{ maxWidth: 820 }}>
          <Eyebrow tone="dark">{data.badge}</Eyebrow>
          <p style={{ margin: "22px 0 10px", fontSize: 16, fontWeight: 700, color: "var(--cta)" }}>{data.problemLine}</p>
          <h1 style={{ fontFamily: "var(--fd)", fontSize: "clamp(30px,4.8vw,48px)", lineHeight: 1.2, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--on-navy)", margin: 0 }}>
            {data.h1}
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: "var(--on-navy-sub)", margin: "20px 0 28px", maxWidth: 680 }}>{data.sub}</p>
          <CTAButtons source={`${src}-hero`} tone="onNavy" size="lg" />
        </div>
      </Section>

      {/* 課題 */}
      <Section tone="white">
        <SectionHead eyebrow="課題" title="こんな状態になっていませんか？" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {data.pains.map((p) => (
            <Card key={p.title}>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--heading)", margin: "0 0 8px" }}>{p.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>{p.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 解決 */}
      <Section tone="surface">
        <SectionHead eyebrow="解決" title="Meeton ai は、こう効く。" lede="該当する仕事を、AI SDR が担います。" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {data.plays.map((pl, i) => {
            const c = pl.product ? CLUSTERS[pl.product] : null;
            return (
              <Card key={i} style={{ background: "#fff" }}>
                {c && (
                  <div style={{ color: "var(--cta)", marginBottom: 12 }}>
                    <ProductIcon kind={pl.product as string} size={22} />
                  </div>
                )}
                <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--heading)", margin: "0 0 8px" }}>{pl.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text)", margin: "0 0 12px" }}>{pl.desc}</p>
                {c && (
                  <Link href={c.pillar} style={{ fontSize: 13, fontWeight: 700, color: "var(--cta-ink)", textDecoration: "none" }}>
                    {c.pillarName} →
                  </Link>
                )}
              </Card>
            );
          })}
        </div>
      </Section>

      {/* proof */}
      {proof && (
        <Section tone="navy">
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 40, alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "var(--fd)", fontSize: "clamp(40px,7vw,72px)", fontWeight: 800, color: "var(--cta)", lineHeight: 1 }}>{proof.heroMetric}</div>
              <div style={{ fontSize: 13, color: "var(--on-navy-sub)", marginTop: 8, maxWidth: 220 }}>{proof.heroMetricLabel}</div>
            </div>
            <div>
              <p style={{ fontSize: "clamp(17px,2.2vw,22px)", lineHeight: 1.7, color: "var(--on-navy)", fontWeight: 600, margin: 0 }}>「{proof.quote}」</p>
              <div style={{ fontSize: 13, color: "var(--on-navy-sub)", marginTop: 14 }}>— {proof.name}（{proof.industry}）</div>
              <Link href="/cases/" style={{ display: "inline-block", marginTop: 14, color: "var(--cta)", fontWeight: 700, textDecoration: "none" }}>他の事例を見る →</Link>
            </div>
          </div>
        </Section>
      )}

      {data.faq.length > 0 && (
        <Section tone="white">
          <SectionHead eyebrow="よくある質問" title="FAQ" align="center" />
          <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gap: 14 }}>
            {data.faq.map((f) => (
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
            まずは、デモで確かめる。
          </h2>
          <p style={{ fontSize: 15, color: "var(--on-navy-sub)", margin: "0 0 26px" }}>30分のデモで、自社の商談化の進め方が具体的に見えます。</p>
          <div style={{ display: "flex", justifyContent: "center" }}><CTAButtons source={`${src}-footer`} tone="onNavy" size="lg" align="center" /></div>
        </div>
      </Section>

      <Footer />
    </>
  );
}

export function playbookSchema(data: PlaybookEntry, path: string) {
  const faq = data.faq.length > 0 ? {
    "@context": "https://schema.org", "@type": "FAQPage", url: `https://dynameet.ai${path}`,
    mainEntity: data.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  } : null;
  const breadcrumb = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: "https://dynameet.ai/" },
      { "@type": "ListItem", position: 2, name: data.h1, item: `https://dynameet.ai${path}` },
    ],
  };
  return { faq, breadcrumb };
}
