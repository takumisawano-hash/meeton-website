import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CTAButtons from "@/app/components/v2/CTAButtons";
import { Section, Eyebrow, Card } from "@/app/components/v2/ui";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/app/lib/case-studies";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const items = await getAllCaseStudies();
    return items.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = await getCaseStudyBySlug(slug).catch(() => null);
  if (!c) return {};
  const title = `${c.company} 導入事例｜${c.heroMetric} ${c.heroMetricLabel}｜Meeton ai`;
  return {
    title: { absolute: title.slice(0, 70) },
    description: (c.description || c.quote || "").slice(0, 158),
    alternates: { canonical: `/cases/${slug}/` },
    robots: c.noindex ? { index: false, follow: true } : undefined,
    openGraph: { title, description: (c.description || c.quote || "").slice(0, 158), url: `https://dynameet.ai/cases/${slug}/`, type: "article", images: c.heroImage ? [c.heroImage] : undefined },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await getCaseStudyBySlug(slug).catch(() => null);
  if (!c) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${c.company} 導入事例`,
    about: c.company,
    description: c.description || c.quote,
    publisher: { "@id": "https://dynameet.ai/#organization" },
    url: `https://dynameet.ai/cases/${slug}/`,
    inLanguage: "ja-JP",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav />
      <Section tone="navy" py={0} style={{ paddingTop: 124, paddingBottom: 56 }}>
        <div style={{ maxWidth: 820 }}>
          <Link href="/cases/" style={{ fontSize: 13, color: "var(--on-navy-sub)", textDecoration: "none" }}>← 導入事例</Link>
          <div style={{ marginTop: 16 }}><Eyebrow tone="dark">{c.industry}</Eyebrow></div>
          <h1 style={{ fontFamily: "var(--fd)", fontSize: "clamp(26px,4vw,40px)", lineHeight: 1.3, fontWeight: 800, color: "var(--on-navy)", margin: "18px 0 0" }}>
            {c.company}
          </h1>
          {c.heroMetric && (
            <div style={{ marginTop: 22, display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--fd)", fontSize: "clamp(40px,7vw,64px)", fontWeight: 800, color: "var(--cta)", lineHeight: 1 }}>{c.heroMetric}</span>
              <span style={{ fontSize: 15, color: "var(--on-navy-sub)" }}>{c.heroMetricLabel}</span>
            </div>
          )}
        </div>
      </Section>

      {c.stats && c.stats.length > 0 && (
        <Section tone="surface" py={48}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 16 }}>
            {c.stats.map((s, i) => (
              <Card key={i}>
                <div style={{ fontFamily: "var(--fd)", fontSize: 30, fontWeight: 800, color: "var(--heading)" }}>{s.value}</div>
                <div style={{ fontSize: 13, color: "var(--sub)", marginTop: 6 }}>{s.label}</div>
              </Card>
            ))}
          </div>
        </Section>
      )}

      <Section tone="white">
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {c.quote && (
            <blockquote style={{ margin: "0 0 32px", padding: "20px 24px", borderLeft: "3px solid var(--cta)", background: "var(--cta-wash)", borderRadius: "0 12px 12px 0" }}>
              <p style={{ fontSize: 17, lineHeight: 1.85, color: "var(--heading)", fontWeight: 600, margin: 0 }}>「{c.quote}」</p>
              {c.quotePerson && <div style={{ fontSize: 13, color: "var(--sub)", marginTop: 10 }}>— {c.quotePerson}</div>}
            </blockquote>
          )}
          {c.body?.map((b, i) => (
            <div key={i} style={{ marginBottom: 24 }}>
              {b.heading && <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--heading)", margin: "0 0 10px" }}>{b.heading}</h2>}
              {b.text && <p style={{ fontSize: 16, lineHeight: 1.95, color: "var(--text)", margin: 0 }}>{b.text}</p>}
            </div>
          ))}
        </div>
      </Section>

      <Section tone="navyDeep" py={68}>
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(24px,3.6vw,34px)", fontWeight: 800, color: "var(--on-navy)", margin: "0 0 14px", letterSpacing: "-0.02em" }}>同じ成果を、あなたの会社でも。</h2>
          <p style={{ fontSize: 15, color: "var(--on-navy-sub)", margin: "0 0 26px" }}>無料・クレジットカード不要で、今日から。</p>
          <div style={{ display: "flex", justifyContent: "center" }}><CTAButtons source={`case-${slug}`} tone="onNavy" size="lg" align="center" /></div>
        </div>
      </Section>
      <Footer />
    </>
  );
}
