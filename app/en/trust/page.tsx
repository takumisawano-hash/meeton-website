import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { EN_OG_IMAGE } from "@/app/lib/i18n";

// /en/trust/ — English trust page (not a legal document). EN-only page.
// The single anchor foreign buyers (SG/AU/NZ) get for: hosting region,
// ISO 27001/27017 certification, sub-processor transparency, DPA, and the
// breach-notify commitment. Referenced by the Privacy Policy (Art. 8) and
// DPA (Sec. 4) as the APP 8 / PDPA transfer-disclosure anchor.
//
// Cert marks: official SGS+ISMS-AC lockups only, served unoptimized
// (no recolor/stretch/crop), on solid white cards — see the mark-usage rules
// in SecurityPageClient.tsx / project memory before touching.
//
// Commitment-lean rule (2026-07-07): verifiable facts only — hosting region,
// ISO certs, sub-processors, and pointers to the chosen contractual
// commitments in the DPA/ToS. No "complies with APP/PDPA" claims, no support
// SLA until one is published for real.
//
// DRAFT — pending owner review; [TBC] items need ops confirmation.

export const metadata: Metadata = {
  title: "Trust & Security",
  description:
    "Where Meeton ai data is hosted, our ISO/IEC 27001 and 27017 certifications, sub-processors, DPA, and breach-notification commitments.",
  alternates: {
    canonical: "/en/trust/",
  },
  openGraph: {
    images: EN_OG_IMAGE,
    title: "Trust & Security｜Meeton ai",
    description:
      "Where Meeton ai data is hosted, our ISO/IEC 27001 and 27017 certifications, sub-processors, DPA, and breach-notification commitments.",
    url: "https://dynameet.ai/en/trust/",
    type: "website",
    siteName: "Meeton ai",
    locale: "en_US",
  },
};

// Official SGS+ISMS-AC combined lockups (same assets as /security/).
const CERT_MARKS = [
  {
    src: "/certifications/sgs-iso-27001-isms-ac.jpg",
    alt: "SGS ISO/IEC 27001 certification mark (ISMS-AC accredited, ISR021)",
    width: 1261,
    height: 736,
    standard: "ISO/IEC 27001:2022",
    kind: "Information Security Management",
    regNo: "JP26/00000205",
  },
  {
    src: "/certifications/sgs-iso-27017-isms-ac.jpg",
    alt: "SGS ISO/IEC 27017 certification mark (ISMS-AC accredited, ISR021)",
    width: 605,
    height: 369,
    standard: "ISO/IEC 27017:2015",
    kind: "Cloud Security",
    regNo: "JP26/00000206",
  },
];

const LEGAL_DOCS = [
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
  {
    href: "/en/privacy-policy/",
    label: "Privacy Policy",
    note: "How we handle personal information as a controller",
  },
  {
    href: "/en/legal/dpa/",
    label: "Data Processing Addendum",
    note: "Our processor commitments for your visitor data",
  },
  {
    href: "/en/legal/sub-processors/",
    label: "Sub-processor list",
    note: "Who processes customer data, where — with 30-day change notice",
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
              Where your data lives, who touches it, and what we commit to when
              something goes wrong — on one page.
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
                Japan. We state this plainly rather than promising regional hosting
                we don&rsquo;t have. Japan&rsquo;s data-protection framework holds an
                EU adequacy decision and Japan participates in the Global CBPR
                system. The contractual commitments governing overseas processing of
                customer data — sub-processor locations, transfer safeguards, breach
                notification — are set out in our{" "}
                <a href="/en/legal/dpa/" style={{ color: "#12a37d" }}>
                  DPA
                </a>{" "}
                (Section 6) for customers to use in their own compliance
                assessments.
              </p>
            </Section>

            <Section title="Certifications">
              <p style={{ marginBottom: 20 }}>
                DynaMeet operates an information security management system
                certified by SGS Japan under ISMS-AC accreditation (ISR021):
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 16,
                }}
              >
                {CERT_MARKS.map((m) => (
                  <div
                    key={m.src}
                    style={{
                      background: "#ffffff",
                      border: "1px solid #e2efea",
                      borderRadius: 16,
                      padding: 20,
                    }}
                  >
                    <div
                      style={{
                        background: "#ffffff",
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                    >
                      <Image
                        src={m.src}
                        alt={m.alt}
                        width={m.width}
                        height={m.height}
                        unoptimized
                        style={{ height: 84, width: "auto", display: "block" }}
                      />
                    </div>
                    <p
                      style={{
                        margin: "14px 0 0",
                        fontWeight: 700,
                        color: "#0f1128",
                      }}
                    >
                      {m.standard}
                    </p>
                    <p style={{ margin: "4px 0 0", fontSize: 13.5 }}>
                      {m.kind} — Registration {m.regNo}
                    </p>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: 16 }}>
                Details of our product and organisational security measures are on
                the{" "}
                <a href="/en/security/" style={{ color: "#12a37d" }}>
                  Security page
                </a>
                .
              </p>
            </Section>

            <Section title="Data protection commitments">
              <ul style={{ paddingLeft: 24, marginTop: 12 }}>
                <li>
                  <strong>Processor role under a click-through DPA.</strong> Visitor
                  data collected from your website is yours; we process it only on
                  your instructions under the{" "}
                  <a href="/en/legal/dpa/" style={{ color: "#12a37d" }}>
                    Data Processing Addendum
                  </a>
                  .
                </li>
                <li style={{ marginTop: 10 }}>
                  <strong>Breach notification.</strong> If a breach affects your
                  data, we notify your account administrator without undue delay —
                  at the latest within 72 hours of becoming aware, targeting 48
                  hours — with timely updates as investigation proceeds.
                </li>
                <li style={{ marginTop: 10 }}>
                  <strong>Sub-processor transparency.</strong> Every provider that
                  touches customer data is listed on the{" "}
                  <a href="/en/legal/sub-processors/" style={{ color: "#12a37d" }}>
                    sub-processor page
                  </a>
                  , with at least 30 days&rsquo; notice before any addition or
                  replacement.
                </li>
                <li style={{ marginTop: 10 }}>
                  <strong>Data export and deletion.</strong> Export your data any
                  time during the term and for 30 days after termination; deletion
                  or de-identification in principle within 90 days of termination.
                </li>
                <li style={{ marginTop: 10 }}>
                  <strong>AI training opt-out.</strong> AI model improvement uses
                  only de-identified, aggregated data — and you can opt out entirely
                  in the Service&rsquo;s settings.
                </li>
              </ul>
            </Section>

            <Section title="Legal documents">
              <ul style={{ paddingLeft: 24, marginTop: 12 }}>
                {LEGAL_DOCS.map((d) => (
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
      <strong>DRAFT — not yet in effect.</strong> This page describes
      commitments that take effect with the self-serve launch and is pending
      final review. Items marked [TBC] require confirmation before publication.
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
