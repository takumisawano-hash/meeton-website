import Footer from "@/app/components/Footer";
import Nav from "@/app/components/Nav";
import { altLanguages, ogLocale, EN_OG_IMAGE } from "@/app/lib/i18n";
import type { Metadata } from "next";
import Link from "next/link";

// /en/privacy-policy/ — English master of the rebuilt Privacy Policy
// (controller role). Structural rebuild for the SG/AU/NZ self-serve launch:
// controller/processor split (processor role → the DPA), infrastructure/AI
// sub-processor disclosure, named hosting region, breach commitments, and a
// language-precedence clause. The JA page (/privacy-policy/) is the Japanese
// translation of this master.
//
// Commitment-lean (2026-07-07 refinement): per-jurisdiction annexes (OAIC
// escalation, 30-day response commitments, APP-posture statements) are
// TRIGGER-DEFERRED — launch version carries one generic local-rights line
// (Section 14). Concrete timeframes live in the DPA only (chosen contractual
// commitments); this unilateral policy says "without undue delay". No
// "complies with APP/PDPA" claims anywhere. Headings are plain English
// numbered sections, not translated-APPI "Article N (…)" style.
//
// DRAFT — pending owner review (counsel is defer-with-triggers; see PR #11).
// Gap list: docs/planning/sgaunz-selfserve-implications-2026-07-07.md §7b.

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "The Privacy Policy of DynaMeet, Inc. How we handle personal information as a controller, and where our processor role is governed by the DPA.",
  alternates: altLanguages("/privacy-policy/", "en"),
  openGraph: {
    images: EN_OG_IMAGE,
    title: "Privacy Policy｜Meeton ai",
    description:
      "The Privacy Policy of DynaMeet, Inc. How we handle personal information as a controller, and where our processor role is governed by the DPA.",
    url: "https://dynameet.ai/en/privacy-policy/",
    type: "website",
    siteName: "Meeton ai",
    locale: ogLocale("en"),
  },
};

export default function PrivacyPolicyPageEn() {
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
            <Link
              href="/en/"
              style={{
                color: "#6e7494",
                textDecoration: "none",
              }}
            >
              Home
            </Link>
            <span style={{ margin: "0 8px" }}>/</span>
            <span style={{ color: "#0f1128" }}>Privacy Policy</span>
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
              Privacy Policy
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
              DynaMeet, Inc. (DynaMeet株式会社; the &ldquo;Company,&rdquo;
              &ldquo;we&rdquo;) provides the &ldquo;DynaMeet Platform&rdquo;
              (including Meeton ai; the &ldquo;Service&rdquo;). This Privacy Policy
              explains how we handle personal information for which we determine the
              purposes and means of processing — that is, where we act as a{" "}
              <strong>controller</strong>.
            </p>

            <Section title="1. Our two roles: controller and processor">
              <p>
                1.1 <strong>As a controller</strong>, we handle: information about
                our customers and their staff (account, billing and support data);
                information about people who contact us, subscribe to our
                newsletter, or visit our own website dynameet.ai; and information we
                use for our own marketing. This Policy governs that processing.
              </p>
              <p style={{ marginTop: 12 }}>
                1.2 <strong>As a processor</strong>, we handle personal information
                collected from visitors to our customers&rsquo; websites through the
                Service (chat entries, form submissions, behavioural data, and the
                like) on behalf of and under the instructions of the customer. That
                processing is governed by our{" "}
                <a href="/en/legal/dpa/" style={{ color: "#12a37d" }}>
                  Data Processing Addendum
                </a>{" "}
                (&ldquo;DPA&rdquo;) with the customer, not by this Policy. If you are
                a visitor to a website that uses the Service, the website
                operator&rsquo;s privacy policy applies to that data; please direct
                requests to the website operator, and we will assist them in
                responding.
              </p>
            </Section>

            <Section title="2. Language versions and precedence">
              <p>
                This Policy is published in English and Japanese. The Japanese
                version is authoritative for customers who contract with us on our
                Japanese (order-form) channel; the English version is authoritative
                for customers who subscribe through our self-serve channel and for
                customers outside Japan.
              </p>
            </Section>

            <Section title="3. Information we collect as a controller">
              <ul style={{ paddingLeft: 24, marginTop: 12 }}>
                <li>
                  (1) <strong>Account and registration data</strong> — name, work
                  email address, company name, country, language and similar details
                  provided when registering for or administering the Service;
                </li>
                <li>
                  (2) <strong>Billing data</strong> — plan, payment status, business
                  tax identifiers, and billing contact details (card details are
                  processed by our payment provider and are not stored by us);
                </li>
                <li>
                  (3) <strong>Inquiries and support</strong> — information submitted
                  through our contact forms, email, or support channels;
                </li>
                <li>
                  (4) <strong>Newsletter and marketing data</strong> — email address
                  and subscription preferences;
                </li>
                <li>
                  (5) <strong>Our own website&rsquo;s visitor data</strong> —
                  dynameet.ai itself uses the Meeton widget and analytics tools, so
                  we collect the same categories of data on our own site that the
                  Service collects for customers: pages viewed, time on page, chat
                  and form entries you choose to submit, IP address, device and
                  browser information, cookie/session information, and
                  company-level attributes (company name, industry, location,
                  employee size) estimated from information such as IP addresses.
                  See Section 12 for details.
                </li>
              </ul>
            </Section>

            <Section title="4. Purposes of use">
              <p>We use the information in Section 3 for the following purposes:</p>
              <ul style={{ paddingLeft: 24, marginTop: 12 }}>
                <li>(1) Providing, operating and billing the Service;</li>
                <li>(2) Responding to inquiries and providing support;</li>
                <li>(3) Sending service notices (renewal reminders, security and maintenance notices, changes to terms);</li>
                <li>
                  (4) Sending marketing communications where permitted by law, with
                  the ability to opt out at any time (Section 11);
                </li>
                <li>(5) Improving the Service and developing new features (including improving AI models using de-identified data only);</li>
                <li>(6) Maintaining security and preventing unauthorised use;</li>
                <li>(7) Responding to conduct that violates our terms;</li>
                <li>(8) Complying with legal obligations;</li>
                <li>(9) Purposes incidental to the above.</li>
              </ul>
            </Section>

            <Section title="5. Provision to third parties">
              <p>
                We do not provide personal information to third parties without
                consent, except: where required or permitted by law; where necessary
                to protect a person&rsquo;s life, body or property and consent is
                difficult to obtain; where especially necessary for public health or
                the sound development of children and consent is difficult to
                obtain; where necessary to cooperate with a government agency or its
                contractor performing statutory duties; or in connection with a
                merger or other business succession, within the scope of the
                original purposes of use. Disclosure to our sub-processors and
                service providers under Section 6 is entrustment, not third-party
                provision.
              </p>
            </Section>

            <Section title="6. Sub-processors and service providers">
              <p>
                6.1 We use the following categories of providers to operate the
                Service, under contracts that require appropriate safeguards:
              </p>
              <ul style={{ paddingLeft: 24, marginTop: 12 }}>
                <li>
                  (1) <strong>Infrastructure</strong> — Amazon Web Services (hosting;
                  Tokyo region) and Supabase (application infrastructure);
                </li>
                <li>
                  (2) <strong>AI model providers</strong> — Google (Gemini API) and
                  Microsoft (Azure OpenAI Service), used to generate AI responses.
                  Chat and content passed to these providers is used to provide the
                  Service, not for the providers&rsquo; own advertising;
                </li>
                <li>
                  (3) <strong>Payment processing</strong> — our payment provider
                  processes card details for self-serve billing;
                </li>
                <li>
                  (4) <strong>IP-based company enrichment</strong> — for Japanese
                  traffic, a Japanese geolocation provider estimates company-level
                  attributes from IP addresses.
                </li>
              </ul>
              <p style={{ marginTop: 12 }}>
                The current list of sub-processors that touch customer personal
                data, including their locations, is published at{" "}
                <a href="/en/legal/sub-processors/" style={{ color: "#12a37d" }}>
                  dynameet.ai/en/legal/sub-processors/
                </a>{" "}
                and is updated with advance notice as described there.
              </p>
              <p style={{ marginTop: 12 }}>
                6.2 <strong>Customer-directed integrations</strong> (Google,
                Microsoft, Slack, Zoom, Salesforce, HubSpot and similar) exchange
                data with the Service only when a customer connects them and only at
                the customer&rsquo;s direction; they are governed by Section 7 and by
                each provider&rsquo;s own terms.
              </p>
            </Section>

            <Section title="7. Data handling in OAuth integrations">
              <SubHeading>7.1 General</SubHeading>
              <p>
                To provide features, the Service may integrate (via OAuth and the
                like) with external services (such as Google, Microsoft, Slack,
                Zoom, Salesforce, and HubSpot). When integrating, we collect only
                the minimum information necessary to provide the relevant feature
                and handle it in accordance with each external service&rsquo;s terms
                and this Section.
              </p>

              <SubHeading>7.2 Limited Use of Google API user data</SubHeading>
              <p>
                The use of information the Service receives from Google APIs, and
                any transfer of such information to other apps, will comply with the{" "}
                <a
                  href="https://developers.google.com/terms/api-services-user-data-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#12a37d" }}
                >
                  Google API Services User Data Policy
                </a>
                , including the Limited Use requirements. Data obtained from Google
                APIs (such as calendar information) is used solely to provide and
                improve the Service&rsquo;s features, and is never used for ad
                delivery, marketing, or provision to any third party unrelated to
                the Service&rsquo;s features.
              </p>

              <SubHeading>7.3 Microsoft (Teams/Outlook)</SubHeading>
              <p>
                Data obtained through the Microsoft Graph API is used solely for
                scheduling sales meetings, setting up meetings, and the
                notifications incidental thereto, and never for advertising or
                profiling purposes.
              </p>

              <SubHeading>7.4 Slack</SubHeading>
              <p>
                Workspace information, channel information, message data, and the
                like obtained through the integration are used solely for
                notifications and log creation within the Service, and are managed
                in accordance with Slack&rsquo;s terms.
              </p>

              <SubHeading>7.5 Zoom</SubHeading>
              <p>
                Data obtained through the Zoom API (such as meeting information,
                user names, and email addresses) is used solely for scheduling sales
                meetings, issuing meeting URLs, and the notifications incidental
                thereto. We never access, obtain, or store users&rsquo; audio, video,
                chat content, or other communication content obtained through the
                Zoom API, nor use such data to train or improve our own AI models or
                those of third parties. The obtained data is handled in accordance
                with the Zoom Privacy Statement and is never used for ad delivery or
                user profiling. If a customer removes (uninstalls) the
                Service&rsquo;s integration from the Zoom Marketplace, we will,
                notwithstanding Section 10, promptly delete or anonymize the OAuth
                access tokens already obtained and any Zoom-related data within 24
                hours.
              </p>

              <SubHeading>7.6 CRMs (Salesforce/HubSpot)</SubHeading>
              <p>
                Data is sent to and received from external CRMs to synchronize data
                designated by the customer and make sales-opportunity management
                more efficient.
              </p>

              <SubHeading>7.7 Restrictions on human access</SubHeading>
              <p>
                We restrict employees from viewing user data obtained through
                external integrations, except for security reasons (such as
                investigating unauthorised use), legal obligations, or support
                responses with the customer&rsquo;s consent.
              </p>
            </Section>

            <Section title="8. Where data is stored; international transfers">
              <p>
                8.1 Personal information and customer data obtained through the
                Service are stored in the Amazon Web Services Tokyo region
                (ap-northeast-1) in Japan. Details of our hosting and security
                posture are published on our{" "}
                <a href="/en/trust/" style={{ color: "#12a37d" }}>
                  Trust page
                </a>
                .
              </p>
              <p style={{ marginTop: 12 }}>
                8.2 If you access the Service from outside Japan, your personal
                information is transferred to and stored in Japan. Japan&rsquo;s
                data-protection framework has been recognised as providing adequate
                protection by the European Commission, and Japan participates in the
                Global CBPR system. For customers, the contractual commitments that
                govern the overseas processing of their visitor data — including
                sub-processor locations and transfer safeguards — are set out in the{" "}
                <a href="/en/legal/dpa/" style={{ color: "#12a37d" }}>
                  DPA
                </a>{" "}
                and on the sub-processor page.
              </p>
            </Section>

            <Section title="9. Security and breach response">
              <p>
                9.1 We maintain an information security management system certified
                to ISO/IEC 27001 and ISO/IEC 27017 and take appropriate technical
                and organisational measures against loss, destruction, alteration
                and leakage of personal information. See{" "}
                <a href="/en/security/" style={{ color: "#12a37d" }}>
                  Security
                </a>{" "}
                for details.
              </p>
              <p style={{ marginTop: 12 }}>
                9.2 If a data breach occurs or is likely to have occurred, we will:
                notify affected customers without undue delay in accordance with the
                notification commitment in the DPA; report to the Personal
                Information Protection Commission of Japan (preliminary report
                within 3–5 days of becoming aware, final report in principle within
                30 days) where required by the APPI; and make any further
                notifications to regulators or individuals that applicable law
                requires. For large-scale cyberattacks we coordinate with JPCERT/CC
                and, where criminal conduct is suspected, with the police.
              </p>
            </Section>

            <Section title="10. Retention and deletion">
              <p>
                10.1 We retain personal information for as long as needed for the
                purposes in Section 4 and to meet legal obligations.
              </p>
              <p style={{ marginTop: 12 }}>
                10.2 When a customer&rsquo;s agreement ends, we delete or de-identify
                the identifiable personal data registered by the customer (such as
                names and email addresses) in principle within 90 days, subject to
                the data-export window described in the applicable terms.
              </p>
              <p style={{ marginTop: 12 }}>
                10.3 Behavioural history, statistical information and metadata that
                have been processed so that no individual can be identified or
                re-identified may be retained after termination for service
                improvement and analytics.
              </p>
            </Section>

            <Section title="11. Your rights and marketing opt-out">
              <p>
                11.1 You may request access to, correction, addition, deletion,
                restriction of use, or (where applicable law provides) portability
                of your personal information held by us. After verifying your
                identity, we will respond without undue delay. If we refuse a
                request, we will give reasons.
              </p>
              <p style={{ marginTop: 12 }}>
                11.2 <strong>Marketing opt-out.</strong> Every marketing email we send
                contains an unsubscribe link. You may also opt out of marketing at
                any time by contacting us (Section 15). Opting out does not affect
                service notices necessary for operating your account.
              </p>
            </Section>

            <Section title="12. Cookies, analytics and our own use of the Meeton widget">
              <p>
                12.1 Our website uses cookies and similar technologies for
                functionality and access analysis. You can disable cookies in your
                browser, though some features may stop working.
              </p>
              <p style={{ marginTop: 12 }}>
                12.2 We use Google Analytics to analyse site traffic. Google
                Analytics uses cookies to collect traffic data.
              </p>
              <p style={{ marginTop: 12 }}>
                12.3 dynameet.ai itself runs the Meeton widget — the same product we
                sell. Through it, information about your visit (pages viewed, time
                on page, chat and form entries you submit, IP address, device and
                browser information) is transmitted to and processed on our
                infrastructure, and company-level attributes (company name,
                industry, location, employee size) may be estimated from your IP
                address. We use this to respond to you, to operate our own sales and
                marketing, and to improve the Service.
              </p>
            </Section>

            <Section title="13. AI model improvement">
              <p>
                We may use data to improve AI models only after it has been
                de-identified and aggregated so that it cannot identify, and cannot
                reasonably be re-linked to, any individual or customer. Customers
                can opt out of the use of their data for AI model improvement via
                the settings screen within the Service.
              </p>
            </Section>

            <Section title="14. Additional rights under your local law">
              <p>
                Depending on where you are located, the law that applies to you may
                grant you additional rights in relation to your personal information
                or additional routes of complaint. Nothing in this Policy limits any
                right you have under a law that applies to you. To exercise such a
                right, contact us using the details in Section 15.
              </p>
            </Section>

            <Section title="15. Contact">
              <p>
                For privacy inquiries, requests under Section 11, or complaints,
                contact:
              </p>
              <div
                style={{
                  background: "#f8fafc",
                  borderRadius: 12,
                  padding: 24,
                  marginTop: 16,
                }}
              >
                <p style={{ margin: 0 }}>
                  <strong>DynaMeet, Inc.</strong> — Privacy Office
                  <br />
                  Daikanyama Art Village 2C, 17-10 Sarugakucho, Shibuya-ku, Tokyo
                  150-0033, Japan
                  <br />
                  Email: info@dynameet.ai
                </p>
              </div>
            </Section>

            <Section title="16. Changes to this Policy">
              <p>
                We may update this Policy from time to time. For material changes,
                we will give customers advance notice by email or within the
                Service before the change takes effect. The updated Policy applies
                from the stated effective date (or, for non-material changes, from
                posting on our website).
              </p>
            </Section>

            <p style={{ marginTop: 48, color: "#6e7494", fontSize: 14 }}>
              Established: October 3, 2024
              <br />
              Last updated: [Draft — pending final review; the version published
              April 23, 2026 remains in effect]
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
      <strong>DRAFT — not yet in effect.</strong> This restructured Privacy
      Policy is a working draft pending final review. The Privacy Policy
      published on April 23, 2026 remains the effective version until this
      draft is approved and published.
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

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontSize: "clamp(14px, 2vw, 16px)",
        fontWeight: 700,
        color: "#0f1128",
        marginTop: 20,
        marginBottom: 8,
      }}
    >
      {children}
    </h3>
  );
}
