import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CTAButtons from "@/app/components/v2/CTAButtons";
import { Section, SectionHead, Eyebrow, Card, Check } from "@/app/components/v2/ui";
import { altLanguages, ogLocale, EN_OG_IMAGE } from "@/app/lib/i18n";

/**
 * /en/compare/ai-sdr-tools/ — EN category comparison hub (AI SDR tools 2026).
 *
 * Vendor set adjusted for the EN market: Meeton ai / Qualified (Piper) /
 * Drift / Warmly / HubSpot Breeze. Facts mirror the verified JA hub
 * (compare-data.ts + competitor dossiers, 2026-07) — no new claims.
 */

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "AI SDR Tools Compared 2026: Qualified, Drift, Warmly & More" },
  description:
    "Compare AI SDR tools in 2026 — Meeton ai, Qualified (Piper), Drift, Warmly, and HubSpot Breeze — by coverage (conversation, booking, follow-up), published pricing, and 2026 ownership changes.",
  alternates: altLanguages("/compare/ai-sdr-tools/", "en"),
  openGraph: {
    title: "AI SDR Tools Compared 2026: Qualified, Drift, Warmly & More",
    description:
      "A cross-vendor comparison of AI SDR tools by coverage matrix (conversation / ads / content / booking / follow-up), published pricing, and 2026 status.",
    url: "https://dynameet.ai/en/compare/ai-sdr-tools/",
    siteName: "Meeton ai",
    locale: ogLocale("en"),
    type: "website",
    images: EN_OG_IMAGE,
  },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
};

// ───────────────────────── table primitives (CompareLP style) ─────────────────────────

const th: React.CSSProperties = { textAlign: "left", padding: "13px 14px", fontWeight: 800, color: "var(--heading)", borderBottom: "2px solid var(--border)", fontSize: 13.5, whiteSpace: "nowrap" };
const td: React.CSSProperties = { padding: "13px 14px", color: "var(--text)", borderBottom: "1px solid var(--border)", fontSize: 13.5, lineHeight: 1.7, verticalAlign: "top" };

type Mark = "yes" | "part" | "no";
const SIGN: Record<Mark, string> = { yes: "Yes", part: "Partial", no: "No" };
const DOT: Record<Mark, string> = { yes: "●", part: "◐", no: "○" };
const MARK_STYLE: Record<Mark, React.CSSProperties> = {
  yes: { color: "var(--cta-ink)", fontWeight: 800 },
  part: { color: "#a16207", fontWeight: 700 },
  no: { color: "var(--sub)", fontWeight: 500 },
};

function MarkCell({ m, t }: { m: Mark; t?: string }) {
  return (
    <>
      <span style={MARK_STYLE[m]}>{SIGN[m]}</span>
      {t ? <span style={{ color: "var(--text)" }}> — {t}</span> : null}
    </>
  );
}

// ───────────────────────── verified vendor data ─────────────────────────

type Cell = { m: Mark; t?: string };
type Vendor = {
  name: string;
  href: string;
  purpose: string;
  ai: Cell;
  booking: Cell;
  price: Cell;
  status: string;
  matrix: [Mark, Mark, Mark, Mark, Mark]; // conversation / on-site ads / content / booking / follow-up
  matrixNote?: string;
  isMeeton?: boolean;
};

const VENDORS: Vendor[] = [
  {
    name: "Meeton ai",
    href: "/en/pricing/",
    purpose: "End-to-end AI SDR platform: conversation → on-site ads → content → booking → follow-up",
    ai: { m: "yes", t: "LLM-native, first response in 5 seconds" },
    booking: { m: "yes", t: "books the meeting inside the chat" },
    price: { m: "yes", t: "published, from ¥150,000/mo" },
    status: "Independent, made in Japan; 1-month free trial",
    matrix: ["yes", "yes", "yes", "yes", "yes"],
    matrixNote: "5 products (Chat / Ads / Library / Calendar / Email)",
    isMeeton: true,
  },
  {
    name: "Qualified (Piper)",
    href: "/en/compare/qualified/",
    purpose: "Inbound visitor conversion for Salesforce-centric enterprises",
    ai: { m: "yes", t: "chat, voice, and video" },
    booking: { m: "yes", t: "auto-schedules against rep availability" },
    price: { m: "no", t: "undisclosed (plan names only)" },
    status: "Acquired by Salesforce (April 2026, $1.2B consideration); integrating into Agentforce",
    matrix: ["yes", "no", "part", "yes", "part"],
    matrixNote: "Content/follow-up = Offers & AI email inside Piper",
  },
  {
    name: "Drift",
    href: "/en/compare/drift/",
    purpose: "Conversational marketing pioneer (chat + ABM routing)",
    ai: { m: "yes", t: "AI chat (investment winding down)" },
    booking: { m: "yes", t: "meeting routing" },
    price: { m: "no", t: "undisclosed" },
    status: "Gradual sunset announced by Salesloft (March 2026); customers pointed to 1mind",
    matrix: ["yes", "no", "no", "yes", "no"],
    matrixNote: "Email sequencing lives in Salesloft, a separate product",
  },
  {
    name: "Warmly",
    href: "/en/compare/warmly/",
    purpose: "Visitor de-anonymization → warm outbound touches (chat, Slack alerts, email, ad retargeting)",
    ai: { m: "yes", t: "AI chat from the $20,000/yr tier" },
    booking: { m: "yes", t: "inside the Inbound Agent module" },
    price: { m: "yes", t: "published, $10,000–30,000/yr (annual/quarterly contracts)" },
    status: "Acquisition by HubSpot announced June 30, 2026; contracts unchanged for now",
    matrix: ["yes", "part", "no", "yes", "yes"],
    matrixNote: "Ads = LinkedIn/Meta retargeting (off-site)",
  },
  {
    name: "HubSpot (Breeze)",
    href: "/en/compare/hubspot-chatbot/",
    purpose: "Chat layer bundled with HubSpot CRM: rules-based Chatflows + support-focused Breeze Customer Agent",
    ai: { m: "part", t: "Chatflows = rules-based; Breeze = support-focused AI" },
    booking: { m: "part", t: "booking-link handoff; redirects when custom form fields exist" },
    price: { m: "yes", t: "free CRM tier + $0.50 per AI-resolved conversation" },
    status: "Public company; announced Warmly acquisition June 30, 2026",
    matrix: ["part", "no", "no", "part", "part"],
    matrixNote: "Follow-up = assembled from generic Workflows/email tools",
  },
];

const MATRIX_HEADS = ["Conversation (AI chat)", "On-site ads", "Content recommendation", "Meeting booking", "Follow-up email"];

// ───────────────────────── vendor paragraphs (fair, sourced) ─────────────────────────

const VENDOR_NOTES: { name: string; href: string; body: string; fit: string; linkLabel: string }[] = [
  {
    name: "Meeton ai",
    href: "/en/pricing/",
    body: "A Japan-built AI SDR platform covering four stages with five products: capture (Chat + on-site Ads), nurture (Library), convert (Calendar), and follow up (Email) — all on one platform. The AI opens the conversation within 5 seconds, works 24/7/365, and installs with a single line of JavaScript in about 5 minutes. Published customer results include a 60%+ meeting-conversion rate (EdulinX), 2x monthly SQLs (G-gen), and 20x chat-sourced leads (BizteX). Pricing is published: base plan from ¥150,000/mo plus add-ons, with a 1-month free trial and no credit card required.",
    fit: "The first pick if you want conversation, ads, content, booking, and follow-up handled end to end by one AI — with pricing you can see before you talk to sales.",
    linkLabel: "See pricing →",
  },
  {
    name: "Qualified (Piper)",
    href: "/en/compare/qualified/",
    body: "A US 'Agentic Marketing Platform' built natively on Salesforce. Its AI SDR agent Piper engages website visitors over chat, voice, and video, auto-books meetings, and sends AI email.¹ Adopted by 500+ enterprises. Salesforce completed its acquisition of Qualified in April 2026 (consideration fair value of $1.2B per Salesforce's SEC 10-Q), and the product is being integrated into Agentforce as 'Qualified from Salesforce'.² Pricing is undisclosed — only plan names (Premier/Enterprise/Ultimate) are public.",
    fit: "The strongest option for global enterprises running Salesforce as their system of record.",
    linkLabel: "See the 1:1 comparison →",
  },
  {
    name: "Drift",
    href: "/en/compare/drift/",
    body: "The pioneer that created the conversational-marketing category. Salesloft acquired Drift in 2024, and in March 2026 Salesloft itself announced Drift's 'gradual sunset,' directing existing customers to AI-agent company 1mind as the successor.³ drift.com now redirects to salesloft.com, which states 'We've transitioned from Drift to 1mind.' Pricing was never published.",
    fit: "Hard to recommend for new evaluations as of July 2026; existing users should be comparing migration paths.",
    linkLabel: "See the 1:1 comparison →",
  },
  {
    name: "Warmly",
    href: "/en/compare/warmly/",
    body: "A US GTM platform that de-anonymizes website visitors at the person and company level in real time, then converts that signal into warm touches: AI chat, Slack alerts to reps, behavior-triggered email sequences, and LinkedIn/Meta ad retargeting. Pricing is published — $10,000/yr (de-anonymization only) to $30,000/yr (AI Inbound Autopilot), on annual or quarterly contracts.⁴ On June 30, 2026, HubSpot announced it is acquiring Warmly; existing contracts and pricing remain unchanged for now, with long-term integration into the HubSpot platform stated as the ambition.⁵",
    fit: "A fit for US-market GTM teams that want to start from visitor identification and warm up outbound.",
    linkLabel: "See the 1:1 comparison →",
  },
  {
    name: "HubSpot (Breeze)",
    href: "/en/compare/hubspot-chatbot/",
    body: "The chat layer bundled with HubSpot CRM: free rules-based Chatflows, plus the Breeze Customer Agent — an AI agent that resolves support inquiries from your knowledge base (Service Hub Professional and above; $0.50 per AI-resolved conversation since April 14, 2026).⁶ Its biggest strength is native CRM integration: every conversation lands on the contact timeline and can trigger workflows. In-bot meeting booking, however, is a booking-link handoff — visitors are redirected to the booking page when custom form fields exist.⁶ HubSpot's June 30, 2026 Warmly acquisition signals it is filling the proactive visitor-engagement gap from outside.⁵",
    fit: "If your company already runs on HubSpot CRM, it is a rational near-zero-cost starting point for a chat presence.",
    linkLabel: "See the 1:1 comparison →",
  },
];

// ───────────────────────── FAQ ─────────────────────────

const FAQ = [
  {
    q: "What is an AI SDR tool?",
    a: "An AI SDR tool automates the front line of inside sales on your website: conversing with visitors, qualifying them, booking meetings, and following up with leads who didn't book. Unlike FAQ chatbots, its primary goal is creating meetings. Coverage varies widely between tools — conversation, on-site ads, content, booking, and follow-up — so mapping the coverage is the first step of any evaluation.",
  },
  {
    q: "Which AI SDR tools publish their pricing?",
    a: "Meeton ai (base plan from ¥150,000/mo plus add-ons), Warmly ($10,000–30,000/yr), and HubSpot (free CRM tier plus $0.50 per AI-resolved conversation) publish pricing. Qualified and Drift do not disclose pricing (as of July 2026).",
  },
  {
    q: "Is Drift still a viable option in 2026?",
    a: "It is hard to recommend for new deployments. In March 2026 Salesloft officially announced Drift's gradual sunset and is directing existing customers to 1mind as the successor. New evaluations are safer among actively developed products.",
  },
  {
    q: "What happened to the AI SDR market in 2026?",
    a: "It consolidated rapidly: Salesforce completed its acquisition of Qualified in April 2026, HubSpot announced its acquisition of Warmly on June 30, 2026, and Drift entered a gradual sunset. When evaluating, factor in roadmap and pricing uncertainty that follows ownership changes.",
  },
  {
    q: "How is an AI SDR different from a chatbot?",
    a: "A chatbot's main job is answering FAQs from anonymous visitors. An AI SDR's main job is creating meetings: it qualifies visitors, recommends content, books the meeting, and follows up with leads who didn't book. The two can be used together, but only the AI SDR is designed around pipeline.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: "https://dynameet.ai/en/compare/ai-sdr-tools/",
  mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://dynameet.ai/en/" },
    { "@type": "ListItem", position: 2, name: "AI SDR Tools Compared 2026", item: "https://dynameet.ai/en/compare/ai-sdr-tools/" },
  ],
};

// ───────────────────────── sources ─────────────────────────

const SOURCES = [
  "1. Qualified (Piper) capabilities (chat/voice/video, auto meeting booking, AI email) and undisclosed pricing: qualified.com/platform, qualified.com/ai-sdr, qualified.com/pricing",
  "2. Salesforce's acquisition of Qualified (April 2026, $1.2B consideration fair value): SEC Form 10-Q (quarter ended April 30, 2026), qualified.com/newsroom",
  "3. Drift gradual sunset (announced March 6, 2026) and transition to 1mind: salesloft.com/company/newsroom/1-mind-partnership, salesloft.com/platform/drift",
  "4. Warmly published pricing ($10,000–30,000/yr, as of July 2026) and product structure: warmly.ai/p/pricing, warmly.ai",
  "5. HubSpot's acquisition of Warmly (announced June 30, 2026; existing contracts unchanged for now): warmly.ai/p/blog/warmly-is-joining-hubspot",
  "6. HubSpot Chatflows / Breeze Customer Agent structure, in-bot booking behavior, and outcome-based pricing ($0.50 per resolution from April 14, 2026): hubspot.com/products/artificial-intelligence/breeze-ai-agents, knowledge.hubspot.com/chatflows, hubspot.com/company-news, hubspot.com/pricing/service",
];

// ───────────────────────── page ─────────────────────────

export default function AiSdrToolsComparePageEn() {
  const src = "compare-ai-sdr-tools";
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Nav lang="en" />

      {/* Hero + definition (AEO) */}
      <Section tone="navy" py={0} style={{ paddingTop: 124, paddingBottom: 60 }}>
        <div style={{ maxWidth: 860 }}>
          <Eyebrow tone="dark">Compare — AI SDR tools 2026</Eyebrow>
          <h1 style={{ fontFamily: "var(--fd)", fontSize: "clamp(28px,4.6vw,46px)", lineHeight: 1.2, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--on-navy)", margin: "20px 0 0" }}>
            AI SDR Tools Compared 2026
          </h1>
          <div style={{ background: "var(--navy-2)", border: "1px solid var(--on-navy-border)", borderRadius: 14, padding: "18px 20px", margin: "24px 0 28px" }}>
            <div style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 700, color: "var(--cta)", marginBottom: 8 }}>In short</div>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--on-navy)", margin: 0 }}>
              An AI SDR tool turns your website into a meeting-booking channel: the AI converses with visitors, qualifies them, books the meeting, and follows up. But coverage varies widely between products. This page compares the leading options — Meeton ai, Qualified (Piper), Drift, Warmly, and HubSpot Breeze — across five coverage areas, published pricing, and their 2026 status.
            </p>
          </div>
          <CTAButtons source={`${src}-hero`} tone="onNavy" size="lg" lang="en" />
          <div style={{ marginTop: 14 }}>
            <Link href="/en/tools/roi/" className="v2-link" style={{ fontSize: 13.5, fontWeight: 700, color: "var(--cta)", textDecoration: "underline" }}>
              Estimate your site&apos;s meeting upside in 60 seconds →
            </Link>
          </div>
        </div>
      </Section>

      {/* Comparison lens */}
      <Section tone="white" py={72}>
        <SectionHead
          eyebrow="How we compare"
          title="&quot;AI SDR&quot; means very different things per vendor"
          lede="Some tools are a single chat feature; others cover the full path to a booked meeting. This comparison maps five coverage areas — (1) conversation, (2) on-site ads, (3) content recommendation, (4) meeting booking, (5) follow-up of unbooked leads — plus whether pricing is published and each vendor's 2026 status."
        />
      </Section>

      {/* Cross-vendor table */}
      <Section tone="surface" py={72} id="table">
        <SectionHead eyebrow="Comparison table" title="Five leading AI SDR tools (as of July 2026)" />
        <div style={{ overflowX: "auto", border: "1px solid var(--border)", borderRadius: 16, background: "#fff" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 960 }}>
            <thead>
              <tr>
                <th style={th}>Tool</th>
                <th style={th}>Primary focus</th>
                <th style={th}>AI conversation</th>
                <th style={th}>Meeting booking</th>
                <th style={th}>Public pricing</th>
                <th style={th}>2026 status</th>
              </tr>
            </thead>
            <tbody>
              {VENDORS.map((v) => (
                <tr key={v.name} style={v.isMeeton ? { background: "var(--cta-wash)" } : undefined}>
                  <td style={{ ...td, fontWeight: 800, color: "var(--heading)", whiteSpace: "nowrap" }}>
                    <Link href={v.href} style={{ color: v.isMeeton ? "var(--cta-ink)" : "var(--heading)", textDecoration: "underline", textUnderlineOffset: 3 }}>
                      {v.name}
                    </Link>
                  </td>
                  <td style={td}>{v.purpose}</td>
                  <td style={td}><MarkCell m={v.ai.m} t={v.ai.t} /></td>
                  <td style={td}><MarkCell m={v.booking.m} t={v.booking.t} /></td>
                  <td style={td}><MarkCell m={v.price.m} t={v.price.t} /></td>
                  <td style={td}>{v.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 12, color: "var(--sub)", marginTop: 12 }}>
          * Competitor information is for reference, based on public sources — check each vendor&apos;s official pages for the latest specs and pricing. Tool names link to 1:1 comparisons.
        </p>
      </Section>

      {/* Coverage matrix */}
      <Section tone="white" py={72}>
        <SectionHead
          eyebrow="Coverage matrix"
          title="Conversation, ads, content, booking, follow-up — how much does one tool carry?"
          lede="Booked meetings don't come from conversation alone. Capturing visitors, nurturing with content, converting to a booking, and chasing unbooked leads each cost you a tool — or come built in."
        />
        <div style={{ overflowX: "auto", border: "1px solid var(--border)", borderRadius: 16 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 860 }}>
            <thead>
              <tr>
                <th style={th}>Tool</th>
                {MATRIX_HEADS.map((h) => (
                  <th key={h} style={{ ...th, whiteSpace: "normal", minWidth: 104 }}>{h}</th>
                ))}
                <th style={{ ...th, whiteSpace: "normal" }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {VENDORS.map((v) => (
                <tr key={v.name} style={v.isMeeton ? { background: "var(--cta-wash)" } : undefined}>
                  <td style={{ ...td, fontWeight: 800, color: "var(--heading)", whiteSpace: "nowrap" }}>{v.name}</td>
                  {v.matrix.map((m, i) => (
                    <td key={i} style={{ ...td, textAlign: "center", fontSize: 15 }}>
                      <span style={MARK_STYLE[m]} title={SIGN[m]}>{DOT[m]}</span>
                    </td>
                  ))}
                  <td style={{ ...td, fontSize: 12.5, color: "var(--sub)" }}>{v.matrixNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 12, color: "var(--sub)", marginTop: 12 }}>
          ● = dedicated capability / ◐ = partial or via generic features / ○ = not found in public documentation (as of July 2026)
        </p>
      </Section>

      {/* Vendor paragraphs */}
      <Section tone="surface" py={72}>
        <SectionHead eyebrow="The vendors" title="A fair read on each tool" lede="All of these are credible products in their lane. Here is what each is genuinely good at — and when it is the right choice." />
        <div style={{ display: "grid", gap: 16, maxWidth: 900 }}>
          {VENDOR_NOTES.map((v) => (
            <Card key={v.name}>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--heading)", margin: "0 0 10px" }}>{v.name}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.9, color: "var(--text)", margin: "0 0 10px" }}>{v.body}</p>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--heading)", fontWeight: 700, margin: "0 0 12px" }}>{v.fit}</p>
              <Link href={v.href} style={{ fontSize: 13.5, fontWeight: 700, color: "var(--cta-ink)", textDecoration: "underline", textUnderlineOffset: 3 }}>
                {v.linkLabel}
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* How to choose */}
      <Section tone="white" py={72}>
        <SectionHead eyebrow="How to choose" title="Work backwards from your situation" />
        <div style={{ maxWidth: 860, display: "grid", gap: 12 }}>
          {[
            ["You want conversation, on-site ads, content, booking, and follow-up in one AI — with published pricing", "Meeton ai (from ¥150,000/mo, 1-month free trial)"],
            ["Salesforce is your system of record and you buy enterprise", "Qualified (Piper)"],
            ["Your company already runs on HubSpot CRM and you want to start free", "HubSpot (Chatflows / Breeze)"],
            ["You are a US-market GTM team building warm outbound from visitor identification", "Warmly"],
            ["You are on Drift today", "Plan a migration — compare the actively developed tools above"],
          ].map(([need, tool]) => (
            <div key={need as string} style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "#fff", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 18px" }}>
              <Check size={18} />
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.8, color: "var(--text)" }}>
                {need} → <strong style={{ color: "var(--heading)" }}>{tool}</strong>
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Mid CTA */}
      <Section tone="navy" py={60}>
        <div style={{ maxWidth: 720 }}>
          <Eyebrow tone="dark">Meeton ai</Eyebrow>
          <p style={{ fontSize: "clamp(20px,3vw,28px)", lineHeight: 1.6, color: "var(--on-navy)", fontWeight: 700, margin: "16px 0 20px" }}>
            See what changes when one AI covers all five areas.
          </p>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center" }}>
            <CTAButtons source={`${src}-mid`} tone="onNavy" size="md" lang="en" />
            <Link href="/en/capture/" style={{ color: "var(--cta)", fontWeight: 700, textDecoration: "none" }}>
              Explore the product →
            </Link>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="white" py={72}>
        <SectionHead eyebrow="FAQ" title="Frequently asked questions" align="center" />
        <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gap: 14 }}>
          {FAQ.map((f) => (
            <Card key={f.q}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", margin: "0 0 8px" }}>{f.q}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--text)", margin: 0 }}>{f.a}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Sources */}
      <Section tone="surface" py={48}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "var(--sub)", marginBottom: 10 }}>References & sources (matching the numbered footnotes)</div>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 6, listStyle: "none" }}>
            {SOURCES.map((s, i) => (
              <li key={i} style={{ fontSize: 12, color: "var(--sub)", lineHeight: 1.6 }}>{s}</li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Final CTA */}
      <Section tone="navyDeep" py={68}>
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(24px,3.6vw,34px)", fontWeight: 800, color: "var(--on-navy)", margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            Try the end-to-end approach on your own site.
          </h2>
          <p style={{ fontSize: 15, color: "var(--on-navy-sub)", margin: "0 0 26px" }}>
            Start a 1-month free trial — no credit card required — or book a 30-minute demo. Pricing is published, from ¥150,000/mo.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CTAButtons source={`${src}-footer`} tone="onNavy" size="lg" align="center" lang="en" />
          </div>
        </div>
      </Section>

      <Footer lang="en" />
    </>
  );
}
