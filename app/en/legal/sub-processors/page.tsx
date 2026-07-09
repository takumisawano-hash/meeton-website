import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { EN_OG_IMAGE } from "@/app/lib/i18n";

// /en/legal/sub-processors/ — public sub-processor list referenced by the DPA
// (Section 5) and the Privacy Policy (Article 6). EN-only page.
// Lists only providers that process Customer Personal Data in DynaMeet's
// processor role; customer-directed OAuth integrations are explicitly not
// sub-processors. Facts confirmed by owner 2026-07-09: no Azure OpenAI in the
// stack; all processing in Japan.
//
// DRAFT — pending owner review.

export const metadata: Metadata = {
  title: "Sub-processors",
  description:
    "The sub-processors DynaMeet, Inc. engages to process customer personal data in providing Meeton ai, with locations and purposes.",
  alternates: {
    canonical: "/en/legal/sub-processors/",
  },
  openGraph: {
    images: EN_OG_IMAGE,
    title: "Sub-processors｜Meeton ai",
    description:
      "The sub-processors DynaMeet, Inc. engages to process customer personal data in providing Meeton ai, with locations and purposes.",
    url: "https://dynameet.ai/en/legal/sub-processors/",
    type: "website",
    siteName: "Meeton ai",
    locale: "en_US",
  },
};

// Regions + entities confirmed by owner 2026-07-09 (no Azure OpenAI in the
// stack; Supabase and Gemini both process in Tokyo).
const SUB_PROCESSORS: {
  name: string;
  purpose: string;
  location: string;
}[] = [
  {
    name: "Amazon Web Services, Inc.",
    purpose: "Cloud hosting of the Service and Customer Personal Data",
    location: "Japan (Tokyo region, ap-northeast-1)",
  },
  {
    name: "Supabase, Inc.",
    purpose: "Application infrastructure",
    location: "Japan (Tokyo region)",
  },
  {
    name: "Google LLC (Gemini API)",
    purpose: "AI response generation (chat, content and email drafting)",
    location: "Japan (Tokyo region)",
  },
  {
    name: "Geolocation Technology, Inc. (docodoco)",
    purpose:
      "IP-based company-attribute enrichment for visitors from Japanese IP addresses",
    location: "Japan",
  },
];

export default function SubProcessorsPage() {
  return (
    <>
      <Nav lang="en" />
      <main
        style={{
          minHeight: "100vh",
          paddingTop: "clamp(70px, 12vw, 100px)",
          background: "#fff",
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            padding:
              "clamp(24px, 6vw, 48px) clamp(16px, 4vw, 24px) clamp(50px, 10vw, 80px)",
          }}
        >
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            style={{
              marginBottom: "clamp(20px, 4vw, 32px)",
              fontSize: "clamp(12px, 2vw, 14px)",
              color: "#6e7494",
            }}
          >
            <Link href="/en/" style={{ color: "#6e7494", textDecoration: "none" }}>
              Home
            </Link>
            <span style={{ margin: "0 8px" }}>/</span>
            <span style={{ color: "#0f1128" }}>Sub-processors</span>
          </nav>

          {/* Header */}
          <header style={{ marginBottom: "clamp(32px, 6vw, 48px)" }}>
            <h1
              style={{
                fontSize: "clamp(26px, 5vw, 36px)",
                fontWeight: 800,
                color: "#0f1128",
                margin: 0,
              }}
            >
              Sub-processors
            </h1>
          </header>

          <DraftNotice />

          {/* Content */}
          <div
            style={{
              fontSize: "clamp(14px, 2vw, 15px)",
              lineHeight: 1.8,
              color: "#374151",
            }}
          >
            <p style={{ marginBottom: 24 }}>
              DynaMeet, Inc. engages the following sub-processors to process
              Customer Personal Data (as defined in the{" "}
              <a href="/en/legal/dpa/" style={{ color: "#12a37d" }}>
                Data Processing Addendum
              </a>
              ) in providing the Service. Each sub-processor is bound by
              data-protection obligations no less protective than the DPA.{" "}
              <strong>
                All current sub-processors process Customer Personal Data in
                Japan.
              </strong>
            </p>

            <div style={{ overflowX: "auto", marginBottom: 32 }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "clamp(13px, 2vw, 14px)",
                }}
              >
                <thead>
                  <tr>
                    {["Sub-processor", "Purpose", "Location"].map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: "left",
                          padding: "10px 12px",
                          borderBottom: "2px solid #12a37d",
                          color: "#0f1128",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SUB_PROCESSORS.map((s) => (
                    <tr key={s.name}>
                      <td
                        style={{
                          padding: "10px 12px",
                          borderBottom: "1px solid #e2e8f0",
                          fontWeight: 600,
                          color: "#0f1128",
                        }}
                      >
                        {s.name}
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          borderBottom: "1px solid #e2e8f0",
                        }}
                      >
                        {s.purpose}
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          borderBottom: "1px solid #e2e8f0",
                        }}
                      >
                        {s.location}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Section title="Change notice">
              <p>
                Before adding or replacing a sub-processor, we update this page and
                notify customer account administrators by email at least 30 days in
                advance, as described in Section 5.2 of the DPA. Customers who
                object on data-protection grounds have the remedies stated there.
              </p>
            </Section>

            <Section title="What is not a sub-processor">
              <p>
                Integrations that you, the customer, choose to connect — Google
                Workspace, Microsoft 365, Slack, Zoom, Salesforce, HubSpot and
                similar — receive data only at your direction and act as your own
                service providers, not as our sub-processors. Payment providers used
                for our own billing act as our controller-side service providers and
                are covered by our{" "}
                <a href="/en/privacy-policy/" style={{ color: "#12a37d" }}>
                  Privacy Policy
                </a>
                .
              </p>
            </Section>

            <p style={{ marginTop: 48, color: "#6e7494", fontSize: 14 }}>
              Version: Draft v0.2 — pending final review and fact confirmation;
              not yet in effect.
              <br />
              Last updated: [TBD]
            </p>
          </div>
        </div>
      </main>
      <Footer lang="en" />
    </>
  );
}

function DraftNotice() {
  return (
    <div
      style={{
        background: "#fff8e6",
        border: "1px solid #f0c948",
        borderRadius: 12,
        padding: "16px 20px",
        marginBottom: 32,
        fontSize: 14,
        lineHeight: 1.7,
        color: "#7a5b00",
      }}
    >
      <strong>DRAFT — not yet in effect.</strong> This sub-processor list is a
      working draft pending final review. Entity names and processing regions
      were confirmed on 2026-07-09.
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: "clamp(28px, 5vw, 40px)" }}>
      <h2
        style={{
          fontSize: "clamp(16px, 2.5vw, 18px)",
          fontWeight: 700,
          color: "#0f1128",
          marginBottom: "clamp(12px, 2vw, 16px)",
          paddingBottom: 8,
          borderBottom: "2px solid #12a37d",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
