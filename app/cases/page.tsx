import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CTAButtons from "@/app/components/v2/CTAButtons";
import Image from "next/image";
import { Section, SectionHead, Eyebrow, Card } from "@/app/components/v2/ui";
import { getAllCaseStudies } from "@/app/lib/case-studies";
import { FEATURED_CASES } from "@/app/lib/featured-cases";
import LogoWall from "@/app/components/v2/LogoWall";

// fallback logo by known case slug (when Notion companyLogo missing)
const SLUG_LOGO: Record<string, string> = {
  "biztex-chat-leads-10x": "/clients/biztex.png",
  "edulinx-ai-chat-40-percent": "/clients/edulinx.png",
  "univis-multi-service-3month-2deals": "/clients/univis.png",
};

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "導入事例｜Meeton ai — 商談化の成果を、数字で。" },
  description: "Meeton ai を導入した企業の成果を、業種別・数字で。商談化率60%+、チャット経由リード20倍以上、受注獲得まで——AI SDR が現場で生んだ変化を紹介します。",
  alternates: { canonical: "/cases/" },
  openGraph: { title: "導入事例｜Meeton ai", description: "Meeton ai 導入企業の成果を数字で。", url: "https://dynameet.ai/cases/", type: "website" },
};

export default async function Page() {
  let cases: { slug: string; name: string; industry?: string; quote?: string; heroMetric?: string; heroMetricLabel?: string; companyLogo?: string | null }[] = [];
  try {
    const items = await getAllCaseStudies();
    cases = items.filter((c) => !c.noIndex).map((c) => ({ slug: c.slug, name: c.company, industry: c.industry, quote: c.quote || c.description, heroMetric: c.heroMetric, heroMetricLabel: c.heroMetricLabel, companyLogo: c.companyLogo }));
  } catch { cases = []; }
  if (cases.length === 0) cases = FEATURED_CASES;

  const schema = {
    "@context": "https://schema.org", "@type": "ItemList", url: "https://dynameet.ai/cases/",
    itemListElement: cases.map((c, i) => ({ "@type": "ListItem", position: i + 1, url: `https://dynameet.ai/cases/${c.slug}/`, name: c.name })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav />
      <Section tone="navy" py={0} style={{ paddingTop: 124, paddingBottom: 56 }}>
        <div style={{ maxWidth: 760 }}>
          <Eyebrow tone="dark">導入事例</Eyebrow>
          <h1 style={{ fontFamily: "var(--fd)", fontSize: "clamp(30px,4.8vw,48px)", lineHeight: 1.2, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--on-navy)", margin: "20px 0 0" }}>
            成果は、<span style={{ color: "var(--cta)" }}>数字</span>で出ている。
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: "var(--on-navy-sub)", margin: "18px 0 0" }}>
            商談化率・初動・リード獲得——Meeton ai を導入した企業で実際に起きた変化を、業種別に。
          </p>
        </div>
      </Section>
      <LogoWall tone="surface" />
      <Section tone="white">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {cases.map((c) => {
            const logo = c.companyLogo || SLUG_LOGO[c.slug];
            return (
            <Link key={c.slug} href={`/cases/${c.slug}/`} aria-label={`${c.name} の導入事例を読む`} style={{ textDecoration: "none" }}>
              <Card className="v2-card-link" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                {c.heroMetric && <div style={{ fontFamily: "var(--fd)", fontSize: 40, fontWeight: 800, color: "var(--cta)", lineHeight: 1 }}>{c.heroMetric}</div>}
                {c.heroMetricLabel && <div style={{ fontSize: 13, color: "var(--text)", margin: "6px 0 14px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: 36 }}>{c.heroMetricLabel}</div>}
                {c.quote && <p style={{ fontSize: 14, lineHeight: 1.75, color: "var(--text)", margin: "0 0 14px" }}>「{c.quote}」</p>}
                <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 10 }}>
                  {logo && <Image src={logo} alt={`${c.name} ロゴ`} width={96} height={28} style={{ height: 24, width: "auto", objectFit: "contain" }} />}
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: "var(--heading)", margin: 0 }}>{c.name}</h3>
                    {c.industry && <div style={{ fontSize: 12, color: "var(--sub)" }}>{c.industry}</div>}
                  </div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--cta-ink)", marginTop: 12 }}>この事例を読む →</span>
              </Card>
            </Link>
          );})}
        </div>
      </Section>
      <Section tone="navyDeep" py={68}>
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(24px,3.6vw,34px)", fontWeight: 800, color: "var(--on-navy)", margin: "0 0 14px", letterSpacing: "-0.02em" }}>次に数字を出すのは、あなたの会社。</h2>
          <p style={{ fontSize: 15, color: "var(--on-navy-sub)", margin: "0 0 26px" }}>30分のデモで、自社での効き方を具体的に確認できます。</p>
          <div style={{ display: "flex", justifyContent: "center" }}><CTAButtons source="cases-footer" tone="onNavy" size="lg" align="center" /></div>
        </div>
      </Section>
      <Footer />
    </>
  );
}
