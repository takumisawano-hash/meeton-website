import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CTAButtons from "@/app/components/v2/CTAButtons";
import { Section, SectionHead, Eyebrow, Card } from "@/app/components/v2/ui";
import { altLanguages, ogLocale, EN_OG_IMAGE } from "@/app/lib/i18n";
import RoiTool from "@/app/tools/roi/RoiTool";

// /en/tools/roi/ — English twin of /tools/roi/. Mirrors the JA page structure;
// the calculator (RoiTool) is bilingual via its `lang` prop.

const URL = "https://dynameet.ai/en/tools/roi/";

export const metadata: Metadata = {
  title: { absolute: "Meeting-upside calculator｜Meeton ai ROI tool" },
  description:
    "Enter your monthly visits, conversion rate and meeting rate to estimate the meeting upside hiding in your website — in 60 seconds. See the leads you're losing at the door plus the meetings you can convert, in two stages. Free, no signup.",
  alternates: altLanguages("/tools/roi/", "en"),
  openGraph: {
    images: EN_OG_IMAGE,
    title: "Meeting-upside calculator｜Meeton ai ROI tool",
    description: "Estimate the meeting upside hiding in your website in 60 seconds. Acquisition upside + conversion upside, in two stages. Free, no signup.",
    url: URL,
    type: "website",
    locale: ogLocale("en"),
  },
};

const FAQ = [
  {
    q: "What is “meeting upside”?",
    a: "It's the estimated number of monthly meeting opportunities you're leaving on the table as things stand today. Meeton ai creates upside in two stages: ① acquisition upside — capturing visitors who leave silently today and turning them into leads; ② conversion upside — lifting the meeting rate of the leads you collect. The tool estimates the sum of the two.",
  },
  {
    q: "How is it calculated?",
    a: "Against the monthly visits, conversion rate and meeting rate you enter, we model converting a share of leaving visitors (about 1.5%) into leads through conversation, and lifting your meeting rate up to the customer benchmark (max 60%; the industry average is around 20%). All figures are for reference and actual results vary with execution.",
  },
  {
    q: "Do I need to sign up or enter an email?",
    a: "No. There's no signup and no email field. Everything is calculated and shown right in your browser — your inputs are never sent to a server or stored.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: URL,
  mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Meeton ai meeting-upside calculator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: URL,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@id": "https://dynameet.ai/#organization" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Nav lang="en" />

      <Section tone="navy" py={0} style={{ paddingTop: 124, paddingBottom: 56 }}>
        <div style={{ maxWidth: 760 }}>
          <Eyebrow tone="dark">ROI calculator — free, no signup</Eyebrow>
          <h1 style={{ fontFamily: "var(--fd)", fontSize: "clamp(30px,4.6vw,46px)", lineHeight: 1.2, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--on-navy)", margin: "20px 0 0" }}>
            See your website's <span style={{ color: "var(--cta)" }}>meeting upside</span> — in 60 seconds.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: "var(--on-navy-sub)", margin: "18px 0 0" }}>
            Just enter your monthly visits, conversion rate and meeting rate. We estimate the upside in two stages: the leads you lose at the door, and the meetings hidden in the leads you already collect.
          </p>
        </div>
      </Section>

      <Section tone="white">
        <RoiTool lang="en" />
      </Section>

      {/* How it's calculated — transparency + AEO */}
      <Section tone="surface">
        <SectionHead eyebrow="How it's calculated" title="Upside comes in two stages: the entrance and the exit." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          <Card>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--heading)", margin: "0 0 8px" }}>① Acquisition upside</h3>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>
              AI chat captures a share (about 1.5%) of the visitors who leave today without ever reaching your form, and turns them into leads.
            </p>
          </Card>
          <Card>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--heading)", margin: "0 0 8px" }}>② Conversion upside</h3>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>
              We estimate lifting your leads' meeting-conversion rate up to the customer benchmark (max 60%; the industry average is around 20%).
            </p>
          </Card>
        </div>
        <p style={{ fontSize: 13, color: "var(--sub)", marginTop: 16 }}>
          All figures are estimates (for reference). Actual numbers vary with your industry, traffic quality and execution. See the{" "}
          <Link href="/en/pricing/" style={{ color: "var(--cta-ink)", textDecoration: "underline" }}>pricing page</Link> for details.
        </p>
      </Section>

      <Section tone="white">
        <SectionHead eyebrow="FAQ" title="ROI calculator FAQ" align="center" />
        <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gap: 14 }}>
          {FAQ.map((f) => (
            <Card key={f.q}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", margin: "0 0 8px" }}>{f.q}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--text)", margin: 0 }}>{f.a}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="navyDeep" py={72}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, color: "var(--on-navy)", margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            Put this upside into motion.
          </h2>
          <p style={{ fontSize: 16, color: "var(--on-navy-sub)", margin: "0 0 28px" }}>Start free today, or book a 30-minute demo to turn the estimate into a real conversion plan.</p>
          <div style={{ display: "flex", justifyContent: "center" }}><CTAButtons source="roi-footer" tone="onNavy" size="lg" align="center" lang="en" /></div>
        </div>
      </Section>

      <Footer lang="en" />
    </>
  );
}
