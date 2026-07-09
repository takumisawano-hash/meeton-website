import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { EN_OG_IMAGE } from "@/app/lib/i18n";

// /en/trust/ — thin trust HUB (not a legal document). EN-only page.
// Single-source-of-truth rule (owner steering 2026-07-09, anti-duplication):
// each fact lives in exactly one place and everything else links to it —
//   hosting region + all-processing-in-Japan → THIS page (unique facts here)
//   cert marks + security measures        → /en/security/
//   data-protection commitments (numbers) → the DPA
//   provider list                          → /en/legal/sub-processors/
// Do NOT re-add cert-mark images or commitment bullet lists here; that
// duplication is what this page was slimmed to avoid. Factual tone only —
// no posture editorializing, no "complies with APP/PDPA" claims.
//
// Referenced by Privacy Policy §8.1 and the DPA as the hosting-region anchor.
// DRAFT — pending owner review.

export const metadata: Metadata = {
  title: "Trust & Security",
  description:
    "Where Meeton ai data is hosted, our certifications, sub-processors, and the legal documents that govern customer data.",
  alternates: {
    canonical: "/en/trust/",
  },
  openGraph: {
    images: EN_OG_IMAGE,
    title: "Trust & Security｜Meeton ai",
    description:
      "Where Meeton ai data is hosted, our certifications, sub-processors, and the legal documents that govern customer data.",
    url: "https://dynameet.ai/en/trust/",
    type: "website",
    siteName: "Meeton ai",
    locale: "en_US",
  },
};

const DOCS = [
  {
    href: "/en/security/",
    label: "Security",
    note: "ISO/IEC 27001 and 27017 certification marks, product and organisational security measures",
  },
  {
    href: "/en/legal/dpa/",
    label: "Data Processing Addendum",
    note: "Our processor commitments for your visitor data — instructions, sub-processing, transfers, breach notification, deletion",
  },
  {
    href: "/en/legal/sub-processors/",
    label: "Sub-processor list",
    note: "Every provider that touches customer data, with locations and 30-day change notice",
  },
  {
    href: "/en/privacy-policy/",
    label: "Privacy Policy",
    note: "How we handle personal information as a controller",
  },
  {
    href: "/en/legal/terms-self-serve/",
    label: "Self-Serve Terms of Service",
    note: "Click-through terms for online subscriptions",
  },
  {
    href: "/en/terms/",
    label: "Terms of Service (managed plans)",
    note: "For order-form customers via our sales team",
  },
];

export default function TrustPage() {
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
            <span style={{ color: "#0f1128" }}>Trust &amp; Security</span>
          </nav>

          {/* Header */}
          <header style={{ marginBottom: "clamp(24px, 5vw, 40px)" }}>
            <h1
              style={{
                fontSize: "clamp(26px, 5vw, 36px)",
                fontWeight: 800,
                color: "#0f1128",
                margin: 0,
              }}
            >
              Trust &amp; Security
            </h1>
            <p
              style={{
                marginTop: 16,
                fontSize: "clamp(14px, 2vw, 16px)",
                lineHeight: 1.8,
                color: "#374151",
              }}
            >
              Where customer data lives, who processes it, and the documents that
              govern it.
            </p>
          </header>

          <DraftNotice />

          <div
            style={{
              fontSize: "clamp(14px, 2vw, 15px)",
              lineHeight: 1.8,
              color: "#374151",
            }}
          >
            <Section title="Hosting and data residency">
              <p>
                The Service and customer data are hosted in the{" "}
                <strong>Amazon Web Services Tokyo region (ap-northeast-1)</strong>,
                Japan. All current{" "}
                <a href="/en/legal/sub-processors/" style={{ color: "#12a37d" }}>
                  sub-processors
                </a>{" "}
                also process customer data in Japan. Japan&rsquo;s data-protection
                framework holds an EU adequacy decision, and Japan participates in
                the Global CBPR system. For customers assessing cross-border
                requirements, the contractual transfer commitments are in the{" "}
                <a href="/en/legal/dpa/" style={{ color: "#12a37d" }}>
                  DPA
                </a>{" "}
                (Section 6).
              </p>
            </Section>

            <Section title="Certifications">
              <p>
                DynaMeet operates an information security management system
                certified to <strong>ISO/IEC 27001:2022</strong> and{" "}
                <strong>ISO/IEC 27017:2015</strong> (SGS Japan, ISMS-AC
                accreditation ISR021). Certification marks, registration numbers,
                and our product and organisational security measures are on the{" "}
                <a href="/en/security/" style={{ color: "#12a37d" }}>
                  Security page
                </a>
                .
              </p>
            </Section>

            <Section title="Documents">
              <ul style={{ paddingLeft: 24, marginTop: 12 }}>
                {DOCS.map((d) => (
                  <li key={d.href} style={{ marginBottom: 10 }}>
                    <a href={d.href} style={{ color: "#12a37d", fontWeight: 600 }}>
                      {d.label}
                    </a>{" "}
                    — {d.note}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Questions">
              <p>
                Security questionnaires and data-protection questions:{" "}
                <a href="/en/contact/" style={{ color: "#12a37d" }}>
                  contact us
                </a>{" "}
                or email info@dynameet.ai.
              </p>
            </Section>
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
      <strong>DRAFT — not yet in effect.</strong> This page describes the setup
      that takes effect with the self-serve launch and is pending final review.
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
