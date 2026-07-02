import type { Metadata } from "next";
import { altLanguages } from '@/app/lib/i18n'
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CTAButtons from "@/app/components/v2/CTAButtons";
import { Section, Eyebrow, Card } from "@/app/components/v2/ui";
import BlogContent from "@/app/components/BlogContent";
import { getAllCaseStudies, getCaseStudyBySlug, getCaseStudyBlocks } from "@/app/lib/case-studies";

export const revalidate = 3600;

const SLUG_LOGO: Record<string, string> = {
  "biztex-chat-leads-10x": "/clients/biztex.png",
  "edulinx-ai-chat-40-percent": "/clients/edulinx.png",
  "univis-multi-service-3month-2deals": "/clients/univis.png",
};

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
  const c = await getCaseStudyBySlug(slug);
  if (!c) return {};
  const title = `${c.company} 導入事例｜${c.heroMetric} ${c.heroMetricLabel}｜Meeton ai`;
  return {
    title: { absolute: title.slice(0, 70) },
    description: (c.description || c.quote || "").slice(0, 158),
    alternates: altLanguages(`/cases/${slug}/`, "ja"),
    robots: c.noIndex ? { index: false, follow: true } : undefined,
    openGraph: { title, description: (c.description || c.quote || "").slice(0, 158), url: `https://dynameet.ai/cases/${slug}/`, type: "article", images: c.heroImage ? [c.heroImage] : undefined },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await getCaseStudyBySlug(slug);
  if (!c) notFound();
  const blocks = await getCaseStudyBlocks(c.id).catch(() => []);
  const logo = c.companyLogo || SLUG_LOGO[slug];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${c.company} 導入事例`,
    about: c.company,
    description: c.description || c.quote,
    image: c.heroImage || logo || undefined,
    datePublished: c.publishedDate || undefined,
    dateModified: c.modifiedDate || c.publishedDate || undefined,
    publisher: { "@id": "https://dynameet.ai/#organization" },
    url: `https://dynameet.ai/cases/${slug}/`,
    inLanguage: "ja-JP",
  };

  const metaChips = [
    c.industry && { k: "業種", v: c.industry },
    c.employeeSize && { k: "規模", v: c.employeeSize },
    c.usedProducts?.length ? { k: "利用製品", v: c.usedProducts.join(" / ") } : null,
    c.integrations?.length ? { k: "連携", v: c.integrations.join(" / ") } : null,
  ].filter(Boolean) as { k: string; v: string }[];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav />
      <Section tone="navy" py={0} style={{ paddingTop: 124, paddingBottom: 56 }}>
        <div style={{ maxWidth: 820 }}>
          <Link href="/cases/" className="v2-link" style={{ fontSize: 13, color: "var(--on-navy-sub)", textDecoration: "none" }}>← 導入事例</Link>
          <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            {logo && (
              <span style={{ background: "#fff", borderRadius: 10, padding: "8px 14px", display: "inline-flex" }}>
                <Image src={logo} alt={`${c.company} ロゴ`} width={120} height={32} style={{ height: 26, width: "auto", objectFit: "contain" }} />
              </span>
            )}
            <Eyebrow tone="dark">{c.industry}</Eyebrow>
          </div>
          <h1 style={{ fontFamily: "var(--fd)", fontSize: "clamp(24px,3.4vw,36px)", lineHeight: 1.35, fontWeight: 800, color: "var(--on-navy)", margin: "18px 0 0" }}>
            {c.title || c.company}
          </h1>
          {c.heroMetric && (
            <div style={{ marginTop: 22, display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--fd)", fontSize: "clamp(40px,7vw,64px)", fontWeight: 800, color: "var(--cta)", lineHeight: 1 }}>{c.heroMetric}</span>
              <span style={{ fontSize: 15, color: "var(--on-navy-sub)" }}>{c.heroMetricLabel}</span>
            </div>
          )}
          {metaChips.length > 0 && (
            <div style={{ marginTop: 22, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {metaChips.map((m) => (
                <span key={m.k} style={{ fontSize: 12, color: "var(--on-navy-sub)", background: "var(--on-navy-surface)", border: "1px solid var(--on-navy-border)", borderRadius: 999, padding: "5px 12px" }}>
                  <b style={{ color: "var(--on-navy)" }}>{m.k}</b>　{m.v}
                </span>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* hero image */}
      {c.heroImage && (
        <Section tone="white" py={40}>
          <div style={{ maxWidth: 880, margin: "0 auto", borderRadius: 16, overflow: "hidden", border: "1px solid var(--border)" }}>
            <Image src={c.heroImage} alt={`${c.company} 導入事例`} width={1200} height={630} style={{ width: "100%", height: "auto", objectFit: "cover" }} />
          </div>
        </Section>
      )}

      {/* stats */}
      {c.stats && c.stats.length > 0 && (
        <Section tone="surface" py={44}>
          <dl style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 16, margin: 0 }}>
            {c.stats.map((s, i) => (
              <Card key={i}>
                <dd style={{ fontFamily: "var(--fd)", fontSize: 30, fontWeight: 800, color: "var(--heading)", margin: 0 }}>{s.value}</dd>
                <dt style={{ fontSize: 13, color: "var(--text)", marginTop: 6 }}>{s.label}</dt>
                {s.context && <div style={{ fontSize: 11, color: "var(--sub)", marginTop: 4 }}>{s.context}</div>}
              </Card>
            ))}
          </dl>
        </Section>
      )}

      <Section tone="white">
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {c.quote && (
            <blockquote style={{ margin: "0 0 32px", padding: "20px 24px", borderLeft: "3px solid var(--cta)", background: "var(--cta-wash)", borderRadius: "0 12px 12px 0", display: "flex", gap: 16, alignItems: "flex-start" }}>
              {c.quoteAvatar && <Image src={c.quoteAvatar} alt={c.quotePerson || c.company} width={48} height={48} style={{ width: 48, height: 48, borderRadius: 999, objectFit: "cover", flexShrink: 0 }} />}
              <div>
                <p style={{ fontSize: 17, lineHeight: 1.85, color: "var(--heading)", fontWeight: 600, margin: 0 }}>「{c.quote}」</p>
                {c.quotePerson && <div style={{ fontSize: 13, color: "var(--sub)", marginTop: 10 }}>— {c.quotePerson}</div>}
              </div>
            </blockquote>
          )}
          {/* Notion body blocks (was missing in v2 — full story restored) */}
          {blocks.length > 0 ? (
            <BlogContent blocks={blocks} />
          ) : c.description ? (
            <p style={{ fontSize: 16, lineHeight: 1.95, color: "var(--text)", margin: 0 }}>{c.description}</p>
          ) : null}
          <p style={{ marginTop: 28 }}>
            <Link href="/cases/" className="v2-link" style={{ fontSize: 14, fontWeight: 700, color: "var(--cta-ink)", textDecoration: "underline" }}>← 他の導入事例を見る</Link>
          </p>
        </div>
      </Section>

      <Section tone="navyDeep" py={68}>
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(24px,3.6vw,34px)", fontWeight: 800, color: "var(--on-navy)", margin: "0 0 14px", letterSpacing: "-0.02em" }}>同じ成果を、あなたの会社でも。</h2>
          <p style={{ fontSize: 15, color: "var(--on-navy-sub)", margin: "0 0 26px" }}>30分のデモで、自社での効き方を具体的に確認できます。</p>
          <div style={{ display: "flex", justifyContent: "center" }}><CTAButtons source={`case-${slug}`} tone="onNavy" size="lg" align="center" /></div>
        </div>
      </Section>
      <Footer />
    </>
  );
}
