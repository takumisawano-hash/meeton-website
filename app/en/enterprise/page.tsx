import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CTAButtons from "@/app/components/v2/CTAButtons";
import { Section, SectionHead, Eyebrow, Card, Check } from "@/app/components/v2/ui";
import LogoWall from "@/app/components/v2/LogoWall";
import IntegrationLogos, { pickIntegrations } from "@/app/components/v2/IntegrationLogos";
import { altLanguages, ogLocale } from "@/app/lib/i18n";

// /en/enterprise/ — English twin of /enterprise/. Faithful translation of the
// JA enterprise page; registry/billing facts kept verbatim where present.

export const metadata: Metadata = {
  title: { absolute: "Enterprise｜Meeton ai — SSO, CRM integration, security" },
  description: "Meeton ai's enterprise requirements. SSO / API, auto-logging of conversation history to your CRM, permission & audit-log management, post-contract data handling, multi-site and advanced CRM integration. We support deployment in the sales-assist tier.",
  alternates: altLanguages("/enterprise/", "en"),
  openGraph: { title: "Enterprise｜Meeton ai", description: "Supports SSO, CRM integration, permission / audit logs, and security requirements.", url: "https://dynameet.ai/en/enterprise/", type: "website", locale: ogLocale("en") },
};

const REQS = [
  { t: "SSO / API", d: "Single sign-on via SAML / OIDC. Supports data integration and automation through the API." },
  { t: "Auto-logging conversation history to your CRM", d: "Automatically records conversations, bookings, and behavior logs to Salesforce / HubSpot. Zero manual entry." },
  { t: "Permission & audit-log management", d: "Role-based access control and operational audit logs to meet governance requirements." },
  { t: "Post-contract data handling", d: "Clarifies how data is deleted / exported after cancellation." },
  { t: "Multiple sites & funnels", d: "Manage funnels across multiple domains and businesses from one account." },
  { t: "Advanced CRM integration", d: "Supports complex integration requirements such as custom objects and field mapping." },
];

const FAQ = [
  { q: "Do you support SSO?", a: "Yes. We support single sign-on via SAML / OIDC. Details are provided on the Enterprise plan (contact us)." },
  { q: "What is your security posture?", a: "We support permission & audit-log management, auto-logging of conversation history to your CRM, and clarification of post-contract data handling. See /security for details." },
  { q: "Can I pay by invoice?", a: "Scale / Enterprise and annual prepayment support invoice (bank transfer), and we issue qualified invoices compliant with Japan's invoice system." },
];

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage", url: "https://dynameet.ai/en/enterprise/",
  mainEntity: FAQ.map((q) => ({ "@type": "Question", name: q.q, acceptedAnswer: { "@type": "Answer", text: q.a } })),
};

export default function EnterprisePageEn() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Nav lang="en" />
      <Section tone="navy" py={0} style={{ paddingTop: 124, paddingBottom: 60 }}>
        <div style={{ maxWidth: 760 }}>
          <Eyebrow tone="dark">Enterprise</Eyebrow>
          <h1 style={{ fontFamily: "var(--fd)", fontSize: "clamp(30px,4.8vw,48px)", lineHeight: 1.2, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--on-navy)", margin: "20px 0 0" }}>
            We meet the requirements, properly.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: "var(--on-navy-sub)", margin: "18px 0 28px" }}>
            SSO, CRM integration, permission / audit logs, multiple sites, data handling — we set the foundations for enterprise deployment, with sales accompanying you through rollout.
          </p>
          {/* Enterprise stays demo-led (self-serve trial is for the 3 standard plans) */}
          <CTAButtons source="enterprise-hero" tone="onNavy" size="lg" lang="en" primaryLabel="Book a demo" />
        </div>
      </Section>

      {/* Customer logo wall — "other enterprises have adopted us" social proof */}
      <LogoWall tone="surface" lang="en" heading="Companies including enterprises have adopted us" />

      <Section tone="white">
        <SectionHead eyebrow="Enterprise requirements" title="Built for governance, integration, and security." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {REQS.map((r) => (
            <Card key={r.t}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <Check size={20} />
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", margin: "0 0 6px" }}>{r.t}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>{r.d}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <p style={{ fontSize: 14, color: "var(--sub)", marginTop: 20 }}>
          For security details see <Link href="/en/security/" className="v2-link" style={{ color: "var(--cta-ink)", textDecoration: "underline" }}>Security</Link>, for integrations see the <Link href="/integrations/" className="v2-link" style={{ color: "var(--cta-ink)", textDecoration: "underline" }}>integrations list</Link>, and for pricing see <Link href="/en/pricing/" className="v2-link" style={{ color: "var(--cta-ink)", textDecoration: "underline" }}>Pricing</Link>.
        </p>
      </Section>

      {/* Integration logos — make the supported stack visible */}
      <Section tone="surface" py={56}>
        <SectionHead eyebrow="Integrates with your core stack" title="Plugs into your existing CRM, MA, and notification infrastructure." align="center" />
        <IntegrationLogos items={pickIntegrations(["Salesforce", "HubSpot", "Marketo", "Oracle Eloqua", "Microsoft Teams", "Slack"])} lang="en" />
      </Section>

      {/* Visible FAQ (matches faqSchema — JSON-LD must mirror visible content) */}
      <Section tone="white">
        <SectionHead eyebrow="FAQ" title="Enterprise FAQ" align="center" />
        <div style={{ maxWidth: 800, margin: "0 auto 32px", display: "grid", gap: 14 }}>
          {FAQ.map((q) => (
            <Card key={q.q}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", margin: "0 0 8px" }}>{q.q}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--text)", margin: 0 }}>{q.a}</p>
            </Card>
          ))}
        </div>
        <p style={{ textAlign: "center", fontSize: 14, color: "var(--sub)", marginTop: 8 }}>
          For enterprise deployment, a dedicated team accompanies you from requirements review through operational design.
        </p>
      </Section>

      <Section tone="navyDeep" py={68}>
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(24px,3.6vw,34px)", fontWeight: 800, color: "var(--on-navy)", margin: "0 0 14px", letterSpacing: "-0.02em" }}>Let&apos;s check if it fits your requirements.</h2>
          <p style={{ fontSize: 15, color: "var(--on-navy-sub)", margin: "0 0 26px" }}>In a 30-minute demo, you can concretely confirm the fit with your requirements.</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CTAButtons source="enterprise-footer" tone="onNavy" size="lg" align="center" lang="en" primaryLabel="Book a demo" />
          </div>
        </div>
      </Section>
      <Footer lang="en" />
    </>
  );
}
