import Footer from "@/app/components/Footer";
import Nav from "@/app/components/Nav";
import { altLanguages, ogLocale, EN_OG_IMAGE } from "@/app/lib/i18n";
import type { Metadata } from "next";
import Link from "next/link";

// /en/privacy-policy/ — English twin of /privacy-policy/. Faithful, full
// translation of every article; the Japanese version remains authoritative
// (prevailing-language note at top). Legal name kept as "DynaMeet, Inc.
// (DynaMeet株式会社)" on first mention; dates and article numbering preserved.

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "The Privacy Policy of DynaMeet, Inc. Sets out how we handle personal information.",
  alternates: altLanguages("/privacy-policy/", "en"),
  openGraph: {
    images: EN_OG_IMAGE,
    title: "Privacy Policy｜Meeton ai",
    description:
      "The Privacy Policy of DynaMeet, Inc. Sets out how we handle personal information.",
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

          {/* Content */}
          <div
            style={{
              fontSize: "clamp(14px, 2vw, 15px)",
              lineHeight: 1.8,
              color: "#374151",
            }}
          >
            <p
              style={{
                marginBottom: 32,
                fontStyle: "italic",
                color: "#6e7494",
              }}
            >
              This English translation is provided for convenience. In the event
              of any discrepancy, the Japanese version (
              <a
                href="https://dynameet.ai/privacy-policy/"
                style={{ color: "#12a37d" }}
              >
                https://dynameet.ai/privacy-policy/
              </a>
              ) prevails.
            </p>

            <p style={{ marginBottom: 32 }}>
              DynaMeet, Inc. (DynaMeet株式会社; hereinafter the &ldquo;Company&rdquo;)
              regards the protection of our customers&rsquo; personal information as an
              important responsibility in the &ldquo;DynaMeet Platform&rdquo; that the
              Company provides (including Meeton ai and others; hereinafter the
              &ldquo;Service&rdquo;), and handles personal information appropriately in
              accordance with the following Privacy Policy.
            </p>

            <Section title="Article 1 (Definition of Personal Information)">
              <p>
                In this Privacy Policy, &ldquo;personal information&rdquo; means
                information relating to a living individual that can identify a
                specific individual by the name, date of birth, or other
                descriptions contained in such information (including information
                that can be readily collated with other information and thereby
                identify a specific individual).
              </p>
            </Section>

            <Section title="Article 2 (Methods of Collecting Personal Information)">
              <p>The Company may collect personal information by the following methods.</p>
              <ul style={{ paddingLeft: 24, marginTop: 12 }}>
                <li>(1) When information is submitted through the inquiry form on the Company&rsquo;s website;</li>
                <li>(2) When registering to use the Service;</li>
                <li>(3) When subscribing to our newsletter;</li>
                <li>
                  (4) When a visitor to the customer&rsquo;s website enters information
                  (such as name, email address, phone number, company name, job
                  title, or department name) through any of the Service&rsquo;s features
                  (AI chat, calendar booking forms, pop-ups/banners, and other input
                  forms);
                </li>
                <li>
                  (5) When behavioral data of visitors (such as email opens and link
                  clicks) is obtained through the Service&rsquo;s email delivery and
                  outreach features;
                </li>
                <li>
                  (6) When, through the Service&rsquo;s features, behavioral data of
                  visitors on the customer&rsquo;s website (such as URLs of viewed pages,
                  time on page, scroll depth, session information, engagement with
                  each feature, and the pages viewed and viewing time of materials in
                  the Download Center), IP addresses, device information, browser
                  information, and cookie/session information are collected
                  automatically;
                </li>
                <li>
                  (7) When corporate attribute information (company name, industry,
                  location, employee size, etc.) is estimated based on information
                  such as IP addresses;
                </li>
                <li>
                  (8) When data is sent to and received from an external CRM
                  designated by the customer (such as HubSpot or Salesforce) through
                  integration;
                </li>
                <li>(9) Otherwise, in connection with the use of the Company&rsquo;s Service.</li>
              </ul>
            </Section>

            <Section title="Article 3 (Purposes of Use of Personal Information)">
              <p>The Company uses the personal information it collects for the following purposes.</p>
              <ul style={{ paddingLeft: 24, marginTop: 12 }}>
                <li>
                  (1) To provide and operate the Company&rsquo;s Service (including
                  generating automated responses via the AI chatbot, creating sales
                  opportunities, scheduling via calendar integration, and nurturing
                  through email delivery);
                </li>
                <li>(2) To respond to inquiries;</li>
                <li>(3) To provide guidance and notices regarding the Service;</li>
                <li>
                  (4) To improve the Service and develop new services (including
                  improving AI models based on anonymized data);
                </li>
                <li>(5) To provide usage reports to customers;</li>
                <li>
                  (6) To integrate and transfer data to an external CRM or the like
                  designated by the customer;
                </li>
                <li>(7) To maintain the security of the Service and prevent unauthorized use;</li>
                <li>(8) To respond to conduct that violates the Terms of Service;</li>
                <li>(9) For other purposes incidental to the above purposes of use.</li>
              </ul>
            </Section>

            <Section title="Article 4 (Provision of Personal Information to Third Parties)">
              <p>
                Except as permitted by laws and regulations, the Company will not
                provide personal information to third parties without obtaining the
                customer&rsquo;s prior consent. However, this does not apply in the
                following cases.
              </p>
              <ul style={{ paddingLeft: 24, marginTop: 12 }}>
                <li>Where required by laws and regulations;</li>
                <li>
                  Where it is necessary to protect the life, body, or property of a
                  person and it is difficult to obtain the consent of the individual;
                </li>
                <li>
                  Where it is especially necessary to improve public health or to
                  promote the sound development of children and it is difficult to
                  obtain the consent of the individual;
                </li>
                <li>
                  Where it is necessary to cooperate with a national government
                  agency, a local government, or a party entrusted by either of them
                  in carrying out affairs prescribed by laws and regulations.
                </li>
              </ul>
            </Section>

            <Section title="Article 5 (Security Control of Personal Information)">
              <p>
                The Company takes appropriate information security measures to
                prevent the loss, destruction, alteration, leakage, and the like of
                personal information. The Company also provides appropriate
                supervision of employees who handle personal information.
              </p>
            </Section>

            <Section title="Article 5-2 (Data Storage Location and Communication Structure in the Event of an Incident)">
              <SubHeading>1. Data Storage Location</SubHeading>
              <p>
                The Company securely stores personal information and customer data
                obtained through the Service in data centers located within Japan.
              </p>

              <SubHeading>
                2. Reporting to the Personal Information Protection Commission and Others
              </SubHeading>
              <p>
                In accordance with the Act on the Protection of Personal Information,
                if an incident such as a leakage of personal data occurs or is likely
                to occur, a director will take the lead in reporting to the Personal
                Information Protection Commission (PPC). In such reporting, the Company
                will, as a general rule, provide a preliminary report within 3 to 5
                days of becoming aware of the situation and, in principle, a final
                report within 30 days after the completion of the investigation.
              </p>

              <SubHeading>3. Coordination with Relevant Authorities</SubHeading>
              <p>
                In the event of a large-scale cyberattack, the Company will share
                information with and request technical assistance from JPCERT/CC. In
                addition, reports and consultations regarding suspected criminal acts
                such as theft, extortion, or unauthorized access will be made promptly
                to the Cybercrime Countermeasures Division of the police station having
                jurisdiction.
              </p>
            </Section>

            <Section title="Article 6 (Disclosure, Correction, and Deletion of Personal Information)">
              <p>
                1. Customers may request the Company to disclose, correct, add to,
                delete, or suspend the use of their own personal information. Upon
                receiving such a request, the Company will respond within a reasonable
                period after verifying the identity of the person.
              </p>
              <p style={{ marginTop: 12 }}>
                2. When the agreement to use the Service is terminated, the Company
                will, within the period defined by the Company (in principle, within
                90 days of termination), delete or anonymize the identifiable personal
                data registered by the customer (such as name and email address).
              </p>
              <p style={{ marginTop: 12 }}>
                3. Notwithstanding the preceding paragraph, the Company will retain and
                use behavioral history, statistical information, and metadata that have
                been processed so that individuals cannot be identified, for the
                purposes of service improvement and analysis, even after the
                termination of the agreement.
              </p>
              <p style={{ marginTop: 12 }}>
                4. If a customer wishes to export data or have data individually deleted
                upon termination of the agreement, the customer must notify the Company
                at least 30 days prior to the date of termination. The Company will
                respond to such requests to a reasonable extent.
              </p>
            </Section>

            <Section title="Article 7 (Use of Cookies and the Like)">
              <p>
                On the Company&rsquo;s website, we use cookies and similar technologies to
                improve the convenience of the Service and to analyze access. Customers
                can disable cookies through their browser settings, but some services may
                not function properly as a result.
              </p>
            </Section>

            <Section title="Article 8 (Regarding Access Analysis Tools)">
              <p>
                On the Company&rsquo;s website, we use &ldquo;Google Analytics,&rdquo; an
                access analysis tool provided by Google Inc. Google Analytics uses
                cookies to collect traffic data. This traffic data is collected
                anonymously and does not identify individuals.
              </p>
            </Section>

            <Section title="Article 9 (Data Handling in External Services and OAuth Integrations)">
              <SubHeading>1. General Provisions</SubHeading>
              <p>
                To improve customer convenience and provide features, the Company&rsquo;s
                Service may integrate (via OAuth authentication and the like) with
                external services (such as Google, Microsoft, Slack, Zoom, Salesforce,
                and HubSpot). When integrating, the Company collects only the minimum
                information necessary to provide the relevant feature and handles it
                appropriately in accordance with the terms of each external service and
                the provisions of this Article.
              </p>

              <SubHeading>2. Limited Use of Google API User Data</SubHeading>
              <p>
                The use of information the Company&rsquo;s Service receives from Google APIs,
                and any transfer of such information to other apps, will comply with the{" "}
                <a
                  href="https://developers.google.com/terms/api-services-user-data-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#12a37d" }}
                >
                  Google API Services User Data Policy
                </a>
                , including the Limited Use requirements. Data obtained from Google APIs
                (such as calendar information) is used solely for the purpose of providing
                and improving the Service&rsquo;s features, and is never used for ad delivery,
                marketing, or provision to any third party unrelated to the Service&rsquo;s
                features.
              </p>

              <SubHeading>3. Integration with Microsoft (Teams/Outlook)</SubHeading>
              <p>
                Data obtained through the Microsoft Graph API is used solely for the
                purposes of scheduling sales meetings, setting up meetings, and the
                notifications incidental thereto. The obtained data is never used for
                advertising or profiling purposes.
              </p>

              <SubHeading>4. Integration with Slack</SubHeading>
              <p>
                Workspace information, channel information, message data, and the like
                obtained through the integration are used solely for the purposes of
                notifications and log creation within the Service. The obtained data is
                appropriately managed in accordance with Slack&rsquo;s terms.
              </p>

              <SubHeading>5. Integration with Zoom</SubHeading>
              <p>
                Data obtained through the Zoom API (such as meeting information, user
                names, and email addresses) is used solely for the purposes of scheduling
                sales meetings, issuing meeting URLs, and the notifications incidental
                thereto. The Company never accesses, obtains, or stores users&rsquo; audio,
                video, chat content, or other communication content obtained through the
                Zoom API. Nor does the Company use such data to train or improve its own
                AI models or those of third parties. The obtained data is handled in
                accordance with the Zoom Privacy Statement and is never used for ad
                delivery or user profiling purposes. If a customer removes (uninstalls)
                the Service&rsquo;s integration from the Zoom Marketplace, the Company will,
                notwithstanding the provisions of Article 6, promptly delete or anonymize
                the OAuth access tokens already obtained and any Zoom-related data within
                24 hours.
              </p>

              <SubHeading>6. Integration with CRMs (Salesforce/HubSpot)</SubHeading>
              <p>
                The sending and receiving of data with external CRMs is carried out for
                the purposes of synchronizing data designated by the customer and making
                sales opportunity management more efficient.
              </p>

              <SubHeading>7. Restrictions on Human Access</SubHeading>
              <p>
                The Company restricts employees from viewing user data obtained through
                external integrations, except for reasons of security (such as
                investigating unauthorized use), legal obligations, or support responses
                for which the customer&rsquo;s consent has been obtained.
              </p>
            </Section>

            <Section title="Article 10 (Changes to the Privacy Policy)">
              <p>
                The Company may change this Privacy Policy as necessary. The revised
                Privacy Policy shall take effect from the time it is posted on the
                Company&rsquo;s website.
              </p>
            </Section>

            <Section title="Article 11 (Contact)">
              <p>
                For inquiries regarding this Privacy Policy, please contact us at the
                following.
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
                  <strong>DynaMeet, Inc.</strong>
                  <br />
                  Daikanyama Art Village 2C, 17-10 Sarugakucho, Shibuya-ku, Tokyo
                  150-0033, Japan
                  <br />
                  Email: info@dynameet.ai
                </p>
              </div>
            </Section>

            <p style={{ marginTop: 48, color: "#6e7494", fontSize: 14 }}>
              Established: October 3, 2024
              <br />
              Last updated: April 23, 2026
            </p>
          </div>
        </div>
      </main>
      <Footer lang="en" />
    </>
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
