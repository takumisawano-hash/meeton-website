import type { Metadata } from "next";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CTAButtons from "@/app/components/v2/CTAButtons";
import { Section, Eyebrow } from "@/app/components/v2/ui";
import { getAllCaseStudies } from "@/app/lib/case-studies";
import { FEATURED_CASES } from "@/app/lib/featured-cases";
import LogoWall from "@/app/components/v2/LogoWall";
import CaseCardGrid from "@/app/components/v2/CaseCardGrid";
import { altLanguages, ogLocale } from "@/app/lib/i18n";

// /en/cases/ — English twin of /cases/. The page SHELL is English (hero, CTAs,
// JSON-LD); the case CONTENT (company names, numbers, Notion-sourced quotes)
// stays as-is — cases are not translated yet (acceptable, brief §cases).

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Customer stories｜Meeton ai — Results, in numbers." },
  description: "The results of companies that adopted Meeton ai, by industry and in numbers. 60%+ meeting-conversion rate, 20x+ chat-sourced leads, deals won — the changes an AI SDR produced in the field.",
  alternates: altLanguages("/cases/", "en"),
  openGraph: { title: "Customer stories｜Meeton ai", description: "The results of Meeton ai customers, in numbers.", url: "https://dynameet.ai/en/cases/", type: "website", locale: ogLocale("en") },
};

export default async function CasesPageEn() {
  let cases: { slug: string; name: string; industry?: string; quote?: string; heroMetric?: string; heroMetricLabel?: string; companyLogo?: string | null; heroImage?: string | null }[] = [];
  try {
    const items = await getAllCaseStudies();
    cases = items.filter((c) => !c.noIndex).map((c) => ({ slug: c.slug, name: c.company, industry: c.industry, quote: c.quote || c.description, heroMetric: c.heroMetric, heroMetricLabel: c.heroMetricLabel, companyLogo: c.companyLogo, heroImage: c.heroImage }));
  } catch { cases = []; }
  if (cases.length === 0) cases = FEATURED_CASES;

  const schema = {
    "@context": "https://schema.org", "@type": "ItemList", url: "https://dynameet.ai/en/cases/",
    itemListElement: cases.map((c, i) => ({ "@type": "ListItem", position: i + 1, url: `https://dynameet.ai/cases/${c.slug}/`, name: c.name })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav lang="en" />
      <Section tone="navy" py={0} style={{ paddingTop: 124, paddingBottom: 56 }}>
        <div style={{ maxWidth: 760 }}>
          <Eyebrow tone="dark">Customer stories</Eyebrow>
          <h1 style={{ fontFamily: "var(--fd)", fontSize: "clamp(30px,4.8vw,48px)", lineHeight: 1.2, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--on-navy)", margin: "20px 0 0" }}>
            The results are in — <span style={{ color: "var(--cta)" }}>in numbers</span>.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: "var(--on-navy-sub)", margin: "18px 0 28px" }}>
            Meeting conversion, first response, lead acquisition — the changes that actually happened at companies that adopted Meeton ai, by industry.
          </p>
          <CTAButtons source="cases-hero" tone="onNavy" size="lg" lang="en" />
        </div>
      </Section>
      <LogoWall tone="surface" heading="Chosen on the meeting-conversion front line, across industries" />
      <Section tone="white">
        <CaseCardGrid cases={cases} lang="en" />
      </Section>
      <Section tone="navyDeep" py={68}>
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(24px,3.6vw,34px)", fontWeight: 800, color: "var(--on-navy)", margin: "0 0 14px", letterSpacing: "-0.02em" }}>The next company to post numbers is yours.</h2>
          <p style={{ fontSize: 15, color: "var(--on-navy-sub)", margin: "0 0 26px" }}>In a 30-minute demo, you can concretely confirm how it works for your company.</p>
          <div style={{ display: "flex", justifyContent: "center" }}><CTAButtons source="cases-footer" tone="onNavy" size="lg" align="center" lang="en" /></div>
        </div>
      </Section>
      <Footer lang="en" />
    </>
  );
}
