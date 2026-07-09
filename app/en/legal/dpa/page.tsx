import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { EN_OG_IMAGE } from "@/app/lib/i18n";

// /en/legal/dpa/ — Data Processing Addendum (click-through). EN-only page.
// Governs DynaMeet's processor role: visitor personal data collected from
// customers' websites through the Service. PDPA/APP/IPP-aligned transfer
// clauses, 72h breach-notify SLA, sub-processor change notice.
//
// DRAFT — pending owner review (counsel is defer-with-triggers, not gating;
// see PR #11). Do not remove the DraftNotice or publish before owner sign-off.
// The DPA is a KEPT artifact under the commitment-lean refinement — SG/AU
// customers need its transfer clauses for their own compliance. Owner decision
// 2026-07-09: the 72h breach-notify figure is a soft TARGET (like the public
// RTO/RPO SLOs), not a warranted deadline — the binding standard is "without
// undue delay". 30-day sub-processor notice + 10-business-day assist remain
// hard commitments. Gap list this draft answers:
// docs/planning/sgaunz-selfserve-implications-2026-07-07.md §1/§7b (saas repo).

export const metadata: Metadata = {
  title: "Data Processing Addendum",
  description:
    "The Data Processing Addendum (DPA) governing DynaMeet's processing of personal data on behalf of Meeton ai customers.",
  alternates: {
    canonical: "/en/legal/dpa/",
  },
  openGraph: {
    images: EN_OG_IMAGE,
    title: "Data Processing Addendum｜Meeton ai",
    description:
      "The Data Processing Addendum (DPA) governing DynaMeet's processing of personal data on behalf of Meeton ai customers.",
    url: "https://dynameet.ai/en/legal/dpa/",
    type: "website",
    siteName: "Meeton ai",
    locale: "en_US",
  },
};

export default function DpaPage() {
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
            <span style={{ color: "#0f1128" }}>Data Processing Addendum</span>
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
              Data Processing Addendum
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
            <p style={{ marginBottom: 32 }}>
              This Data Processing Addendum (&ldquo;DPA&rdquo;) forms part of the
              agreement between the customer (&ldquo;Customer&rdquo;) and DynaMeet,
              Inc. (DynaMeet株式会社; &ldquo;DynaMeet&rdquo;) for the DynaMeet
              Platform (including Meeton ai; the &ldquo;Service&rdquo;) — whether the{" "}
              <a href="/en/legal/terms-self-serve/" style={{ color: "#12a37d" }}>
                Self-Serve Terms of Service
              </a>{" "}
              or a written order form (together, the &ldquo;Agreement&rdquo;). It
              applies whenever DynaMeet processes Customer Personal Data (defined
              below) on the Customer&rsquo;s behalf.
            </p>

            <Section title="1. Definitions">
              <ul style={{ paddingLeft: 24, marginTop: 12 }}>
                <li>
                  <strong>&ldquo;Customer Personal Data&rdquo;</strong> — personal
                  data or personal information collected from visitors to the
                  Customer&rsquo;s websites through the Service and processed by
                  DynaMeet on the Customer&rsquo;s behalf, as described in the Annex
                  (Details of Processing).
                </li>
                <li style={{ marginTop: 8 }}>
                  <strong>&ldquo;Applicable Data Protection Laws&rdquo;</strong> —
                  the privacy and data-protection laws applying to the processing of
                  Customer Personal Data, which may include the Act on the
                  Protection of Personal Information (Japan), the Personal Data
                  Protection Act 2012 (Singapore), the Privacy Act 1988 (Cth)
                  including the Australian Privacy Principles (Australia), and the
                  Privacy Act 2020 (New Zealand).
                </li>
                <li style={{ marginTop: 8 }}>
                  <strong>&ldquo;Sub-processor&rdquo;</strong> — a third party
                  engaged by DynaMeet to process Customer Personal Data.
                </li>
              </ul>
            </Section>

            <Section title="2. Roles and instructions">
              <p>
                2.1 As between the parties, the Customer is the controller (or the
                organisation/agency with primary responsibility under Applicable
                Data Protection Laws) of Customer Personal Data, and DynaMeet
                processes it as the Customer&rsquo;s processor, data intermediary or
                agent.
              </p>
              <p style={{ marginTop: 12 }}>
                2.2 DynaMeet will process Customer Personal Data only: (a) to
                provide, secure and support the Service; (b) as documented in the
                Agreement, this DPA and the Customer&rsquo;s configuration of the
                Service (which together constitute the Customer&rsquo;s documented
                instructions); or (c) as required by law, in which case DynaMeet
                will notify the Customer unless prohibited.
              </p>
              <p style={{ marginTop: 12 }}>
                2.3 The Customer is responsible for the lawfulness of its collection
                of Customer Personal Data — including giving the notices and, where
                required, obtaining the consents that Applicable Data Protection
                Laws require for its use of the Service on its websites.
              </p>
            </Section>

            <Section title="3. Confidentiality and personnel">
              <p>
                DynaMeet ensures that personnel authorised to process Customer
                Personal Data are bound by confidentiality obligations and access
                Customer Personal Data only as needed to provide the Service, in
                line with the human-access restrictions described in our Privacy
                Policy.
              </p>
            </Section>

            <Section title="4. Security">
              <p>
                DynaMeet maintains an information security management system
                certified to ISO/IEC 27001 and ISO/IEC 27017 and implements
                appropriate technical and organisational measures to protect
                Customer Personal Data against accidental or unlawful destruction,
                loss, alteration, unauthorised disclosure or access — including
                encryption in transit, access controls, logging, and network
                separation. Current details are published on the{" "}
                <a href="/en/trust/" style={{ color: "#12a37d" }}>
                  Trust page
                </a>{" "}
                and{" "}
                <a href="/en/security/" style={{ color: "#12a37d" }}>
                  Security page
                </a>
                .
              </p>
            </Section>

            <Section title="5. Sub-processors">
              <p>
                5.1 The Customer authorises DynaMeet to engage the Sub-processors
                listed at{" "}
                <a href="/en/legal/sub-processors/" style={{ color: "#12a37d" }}>
                  dynameet.ai/en/legal/sub-processors/
                </a>
                . DynaMeet imposes data-protection obligations on Sub-processors no
                less protective than this DPA and remains responsible for their
                performance.
              </p>
              <p style={{ marginTop: 12 }}>
                5.2 <strong>Change notice.</strong> Before adding or replacing a
                Sub-processor, DynaMeet will update the sub-processor page and
                notify account administrators by email at least 30 days in advance.
                If the Customer reasonably objects on data-protection grounds and
                the parties cannot resolve the objection, the Customer may terminate
                the affected subscription before the change takes effect and receive
                a pro-rata refund of prepaid fees for the unused portion of its
                term.
              </p>
            </Section>

            <Section title="6. Where data is processed; international transfers">
              <p>
                6.1 Customer Personal Data is hosted in the Amazon Web Services
                Tokyo region (ap-northeast-1) in Japan. The Customer instructs and
                authorises DynaMeet to process Customer Personal Data in Japan and
                in the locations of the Sub-processors listed on the sub-processor
                page.
              </p>
              <p style={{ marginTop: 12 }}>
                6.2 Where the Customer is subject to transfer requirements under
                Applicable Data Protection Laws, this DPA constitutes the
                contractual safeguard through which DynaMeet undertakes to provide
                Customer Personal Data a standard of protection comparable to that
                required by those laws — including for the purposes of the
                cross-border transfer requirements of the PDPA (Singapore), APP 8
                (Australia) and IPP 12 (New Zealand). Japan&rsquo;s data-protection
                framework holds an EU adequacy decision and Japan participates in
                the Global CBPR system.
              </p>
            </Section>

            <Section title="7. Assistance with individuals' requests">
              <p>
                7.1 If DynaMeet receives a request from an individual concerning
                Customer Personal Data (access, correction, deletion, objection or
                similar), it will redirect the individual to the Customer and not
                respond substantively except on the Customer&rsquo;s instruction or
                where legally required.
              </p>
              <p style={{ marginTop: 12 }}>
                7.2 Taking into account the nature of the processing, DynaMeet will
                assist the Customer in responding to such requests — through the
                Service&rsquo;s search, export, correction and deletion features, and
                where those are insufficient, through reasonable direct assistance
                within 10 business days of a request from the Customer.
              </p>
            </Section>

            <Section title="8. Data breach notification">
              <p>
                8.1 If DynaMeet becomes aware of a breach of security leading to the
                accidental or unlawful destruction, loss, alteration, unauthorised
                disclosure of, or access to Customer Personal Data, DynaMeet will
                notify the Customer without undue delay after becoming aware,
                targeting notification within 72 hours, to the account
                administrator&rsquo;s registered email. The 72-hour figure is a
                target the parties acknowledge as an objective, not a warranted
                deadline.
              </p>
              <p style={{ marginTop: 12 }}>
                8.2 The notification will describe, to the extent then known, the
                nature of the breach, the categories and approximate number of
                individuals and records concerned, the likely consequences, and the
                measures taken or proposed. DynaMeet will provide timely updates as
                the investigation progresses and reasonably cooperate with the
                Customer&rsquo;s own notification obligations (including statutory
                regulator and individual notifications under Applicable Data
                Protection Laws). DynaMeet&rsquo;s notification is not an admission
                of fault.
              </p>
            </Section>

            <Section title="9. Deletion and return">
              <p>
                9.1 During the term, the Customer can export Customer Personal Data
                through the Service. On termination of the Agreement, the Customer
                may export Customer Personal Data for 30 days; thereafter DynaMeet
                deletes or de-identifies Customer Personal Data in principle within
                90 days of termination, unless retention is required by law.
              </p>
              <p style={{ marginTop: 12 }}>
                9.2 Data that has been de-identified and aggregated so that it
                cannot identify, and cannot reasonably be re-linked to, any
                individual or the Customer ceases to be Customer Personal Data and
                may be retained for service improvement and analytics.
              </p>
            </Section>

            <Section title="10. Audit and information">
              <p>
                On the Customer&rsquo;s reasonable written request (no more than once
                per 12 months, absent a breach), DynaMeet will make available
                information reasonably necessary to demonstrate compliance with this
                DPA — its current ISO/IEC 27001 and 27017 certificates, summaries of
                its security measures, and written responses to reasonable security
                questionnaires. These constitute the agreed audit mechanism for
                self-serve subscriptions.
              </p>
            </Section>

            <Section title="11. Liability, order of precedence and term">
              <p>
                11.1 Each party&rsquo;s liability under this DPA is subject to the
                limitations and exclusions of liability in the Agreement.
              </p>
              <p style={{ marginTop: 12 }}>
                11.2 If this DPA conflicts with the Agreement regarding the
                processing of Customer Personal Data, this DPA prevails. This DPA
                remains in force while DynaMeet processes Customer Personal Data.
              </p>
              <p style={{ marginTop: 12 }}>
                11.3 <strong>Severability; local mandatory rights unaffected.</strong>{" "}
                If a provision of this DPA is held void or unenforceable, it is
                severed or read down to the minimum extent necessary and the
                remainder continues in full effect. Nothing in this DPA excludes,
                restricts or modifies any right or protection granted to the
                Customer or to any individual by a mandatory applicable law that
                cannot lawfully be excluded, restricted or modified.
              </p>
            </Section>

            <Section title="Annex — Details of processing">
              <ul style={{ paddingLeft: 24, marginTop: 12 }}>
                <li>
                  <strong>Subject matter and duration:</strong> processing of
                  visitor data from the Customer&rsquo;s websites to provide the
                  Service, for the term of the Agreement plus the deletion window in
                  Section 9.
                </li>
                <li style={{ marginTop: 8 }}>
                  <strong>Nature and purposes:</strong> collection via the
                  Service&rsquo;s widget and features (AI chat, forms, calendar
                  booking, content library, email delivery); hosting; AI response
                  generation; analytics and reporting to the Customer;
                  synchronisation to systems the Customer connects (such as its
                  CRM); security.
                </li>
                <li style={{ marginTop: 8 }}>
                  <strong>Categories of individuals:</strong> visitors to the
                  Customer&rsquo;s websites; the Customer&rsquo;s leads and contacts.
                </li>
                <li style={{ marginTop: 8 }}>
                  <strong>Categories of data:</strong> contact details submitted
                  through chat and forms (name, business email, phone, company, job
                  title, department); communication content (chat and email
                  exchanges); behavioural data (pages viewed, time on page, scroll
                  depth, sessions, engagement, document views); IP address, device
                  and browser information, cookie/session identifiers; company-level
                  attributes estimated from IP addresses. The Service is not
                  intended for sensitive/special categories of data, and the
                  Customer agrees not to configure it to collect them.
                </li>
              </ul>
            </Section>

            <p style={{ marginTop: 48, color: "#6e7494", fontSize: 14 }}>
              Version: Draft v0.2 — pending final review; not yet in effect.
              <br />
              Established: [TBD — on self-serve launch]
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
      <strong>DRAFT — not yet in effect.</strong> This Data Processing Addendum
      is a working draft pending final review and creates no rights or
      obligations.
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
