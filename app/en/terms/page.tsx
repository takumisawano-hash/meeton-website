import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { altLanguages, ogLocale, EN_OG_IMAGE } from "@/app/lib/i18n";

// /en/terms/ — English twin of /terms/. Faithful, full translation of every
// article and clause; the Japanese version remains authoritative
// (prevailing-language note at top). Legal name kept as "DynaMeet, Inc.
// (DynaMeet株式会社)" on first mention; dates and article numbering preserved.

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The Terms of Service for Meeton ai. Please read them carefully before use.",
  alternates: altLanguages("/terms/", "en"),
  openGraph: {
    images: EN_OG_IMAGE,
    title: "Terms of Service｜Meeton ai",
    description:
      "The Terms of Service for Meeton ai. Please read them carefully before use.",
    url: "https://dynameet.ai/en/terms/",
    type: "website",
    siteName: "Meeton ai",
    locale: ogLocale("en"),
  },
};

export default function TermsPageEn() {
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
            <span style={{ color: "#0f1128" }}>Terms of Service</span>
          </nav>

          {/* Header */}
          <header style={{ marginBottom: "clamp(32px, 6vw, 48px)" }}>
            <h1
              style={{
                fontSize: "clamp(28px, 5vw, 36px)",
                fontWeight: 800,
                color: "#0f1128",
                margin: 0,
              }}
            >
              Terms of Service
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
              <a href="https://dynameet.ai/terms/" style={{ color: "#12a37d" }}>
                https://dynameet.ai/terms/
              </a>
              ) prevails.
            </p>

            <p style={{ marginBottom: 32 }}>
              These Terms of Service (hereinafter the &ldquo;Terms&rdquo;) set out
              the conditions for using the &ldquo;DynaMeet Platform&rdquo; (including
              Meeton ai and others; hereinafter the &ldquo;Service&rdquo;) provided by
              DynaMeet, Inc. (DynaMeet株式会社; hereinafter the &ldquo;Company&rdquo;).
              Please be sure to read them before use.
            </p>

            <Section title="Article 1 (Application)">
              <p>
                These Terms shall apply to all relationships between customers and the
                Company relating to the use of the Service. Individual provisions that
                the Company separately establishes regarding the Service shall
                constitute a part of these Terms.
              </p>
            </Section>

            <Section title="Article 2 (User Registration)">
              <p>
                A person who wishes to use the Service shall apply for user registration
                by the method prescribed by the Company, and registration is completed
                when the Company approves it. The Company may decline to approve an
                application for user registration in the following cases.
              </p>
              <ul style={{ paddingLeft: 24, marginTop: 12 }}>
                <li>Where false information was provided in the application;</li>
                <li>Where the application is from a person who has previously violated these Terms;</li>
                <li>Where the Company otherwise judges the user registration to be inappropriate.</li>
              </ul>
            </Section>

            <Section title="Article 3 (Account Management and Identification Features)">
              <p>
                1. In connection with the use of the Service, the Company provides
                features for registering and deleting the user IDs (accounts) that
                customers use to log in.
              </p>
              <p style={{ marginTop: 12 }}>
                2. Customers shall appropriately manage their account information for the
                Service at their own responsibility. Customers may not, under any
                circumstances, transfer or lend their account information to a third
                party. Except where there is willful misconduct or gross negligence on
                the part of the Company, the Company shall bear no liability whatsoever
                for any damage arising from the use of account information by a third
                party.
              </p>
            </Section>

            <Section title="Article 3-2 (Issuance of Accounts, Access Rights, and Authentication Information Features)">
              <p>
                1. Issuance of Initial Accounts and Privilege Management
                <br />
                The initial account for the Service is issued as an administrator
                (power user) to the email address specified at the time of application.
                Using the features within the Service, customers can individually set
                and manage roles such as administrator privileges and view-only
                privileges for each additional user. Added users set their own passwords
                through an invitation email and access the Service.
              </p>
              <p style={{ marginTop: 12 }}>
                2. Management of Authentication Information
                <br />
                To ensure the security and convenience of the Service, the Company
                provides a password-reissue feature for users themselves, a
                password-reset feature by administrators for target users, and, to build
                a more secure login environment, two-factor authentication (2FA) and
                single sign-on (SSO) features.
              </p>
              <p style={{ marginTop: 12 }}>
                3. Special Provisions on Concierge Onboarding During the Trial Period
                <br />
                As implementation support for the product, we adopt a &ldquo;concierge
                onboarding&rdquo; model during the trial period. Based on the customer&rsquo;s
                explicit consent, the Company&rsquo;s customer service representatives may set
                up the customer&rsquo;s environment as administrators and perform setup and
                initial configuration on the customer&rsquo;s behalf. The access privileges
                granted to the Company&rsquo;s representatives for this purpose are promptly
                disabled at the end of the trial period.
              </p>
              <p style={{ marginTop: 12 }}>
                4. Secure Operational Support
                <br />
                So that administrators can manage privileges securely, the Company adopts
                a design that displays, as appropriate, the scope of privileges and the
                definitions of roles (such as Admin, Editor, and Viewer) within the
                settings-screen UI, thereby preventing errors in granting privileges
                without relying on static manuals.
              </p>
            </Section>

            <Section title="Article 4 (Fees and Method of Payment)">
              <p>
                As consideration for the paid portions of the Service, customers shall
                pay the usage fees separately determined by the Company by the method
                designated by the Company. If a customer is late in paying usage fees,
                the customer shall pay late-payment damages at a rate of 14.6% per annum.
              </p>
            </Section>

            <Section title="Article 5 (Prohibited Acts)">
              <p>In using the Service, customers shall not engage in the following acts.</p>
              <ul style={{ paddingLeft: 24, marginTop: 12 }}>
                <li>Acts that violate laws and regulations or public order and morals;</li>
                <li>Acts related to criminal conduct;</li>
                <li>
                  Acts that destroy or interfere with the functions of the servers or
                  networks of the Company, other users of the Service, or third parties;
                </li>
                <li>Acts that may interfere with the operation of the Company&rsquo;s services;</li>
                <li>Acts of collecting or accumulating personal information and the like about other users;</li>
                <li>Acts of gaining, or attempting to gain, unauthorized access;</li>
                <li>Acts of impersonating other users;</li>
                <li>
                  Acts of directly or indirectly providing benefits to antisocial forces
                  in connection with the Company&rsquo;s services;
                </li>
                <li>
                  Acts that infringe the intellectual property rights, portrait rights,
                  privacy, reputation, or other rights or interests of the Company, other
                  users of the Service, or third parties;
                </li>
                <li>Other acts that the Company judges to be inappropriate.</li>
              </ul>
            </Section>

            <Section title="Article 6 (Suspension, etc. of the Provision of the Service)">
              <p>
                The Company may suspend or interrupt the provision of all or part of the
                Service without prior notice to customers if it judges that any of the
                following applies.
              </p>
              <ul style={{ paddingLeft: 24, marginTop: 12 }}>
                <li>When performing maintenance, inspection, or updates of the computer systems related to the Service;</li>
                <li>When the provision of the Service becomes difficult due to force majeure such as earthquake, lightning, fire, power outage, or natural disaster;</li>
                <li>When computers or communication lines stop due to an accident;</li>
                <li>When the Company otherwise judges that the provision of the Service is difficult.</li>
              </ul>
              <p style={{ marginTop: 12 }}>
                The Company shall bear no liability whatsoever for any disadvantage or
                damage suffered by a customer or a third party due to the suspension or
                interruption of the provision of the Service.
              </p>
            </Section>

            <Section title="Article 7 (Usage Restrictions and Deregistration)">
              <p>
                The Company may, without prior notice, restrict a customer&rsquo;s use of all
                or part of the Service, or deregister a customer, if the customer falls
                under any of the following.
              </p>
              <ul style={{ paddingLeft: 24, marginTop: 12 }}>
                <li>Where the customer violates any provision of these Terms;</li>
                <li>Where it becomes clear that there is a false fact in the registered matters;</li>
                <li>Where there is a default in the obligation to pay fees or the like;</li>
                <li>Where there is no response for a certain period to contact from the Company;</li>
                <li>Where the Service has not been used for a certain period since the last use;</li>
                <li>Where the Company otherwise judges the use of the Service to be inappropriate.</li>
              </ul>
            </Section>

            <Section title="Article 8 (Withdrawal)">
              <p>
                Customers may withdraw from the Service by the procedure prescribed by
                the Company.
              </p>
            </Section>

            <Section title="Article 8-2 (Subscription Term and Renewal)">
              <p>
                1. The subscription runs for the billing period selected by the Customer
                at sign-up (for example, monthly or annual), as shown at the time of
                purchase or in the applicable order or Application Form (the
                &quot;Subscription Term&quot;).
              </p>
              <p style={{ marginTop: 12 }}>
                2. Automatic renewal. At the end of each Subscription Term, the
                subscription automatically renews for a further period of the same length
                at the then-current fees, unless the Customer cancels before the end of
                the current Subscription Term or either party gives notice of non-renewal.
              </p>
              <p style={{ marginTop: 12 }}>
                3. Cancellation. The Customer may cancel the subscription at any time
                through the account settings or by the procedure prescribed by the
                Company. Cancellation takes effect at the end of the then-current
                Subscription Term; the Customer retains access to the Service until that
                time, and the subscription will not renew thereafter.
              </p>
              <p style={{ marginTop: 12 }}>
                4. No refunds. Except where required by applicable law, fees already paid
                are non-refundable, and the Company does not provide refunds or credits
                for partial Subscription Terms, unused periods, or downgrades.
              </p>
              <p style={{ marginTop: 12 }}>
                5. Fee changes. The Company may change the fees applicable to renewal
                terms by giving notice before the start of the relevant renewal term. The
                revised fees take effect from the next renewal unless the Customer cancels
                before that renewal.
              </p>
            </Section>

            <Section title="Article 9 (Disclaimer of Warranties and Limitation of Liability)">
              <p>
                1. The Company does not warrant, whether expressly or impliedly, that the
                Service is free from de facto or legal defects (including defects,
                errors, or bugs relating to safety, reliability, accuracy, completeness,
                effectiveness, fitness for a particular purpose, security, and the like,
                as well as infringement of rights).
              </p>
              <p style={{ marginTop: 12 }}>
                2. The Company shall compensate for damage arising to a customer due to
                the Service only where there is willful misconduct or negligence on the
                part of the Company, up to a maximum of the cumulative amount of usage
                fees paid by the customer to the Company during the three months
                retroactive from the time the relevant damage occurred.
              </p>
              <p style={{ marginTop: 12 }}>
                3. Notwithstanding the preceding paragraph, the cap in the preceding
                paragraph shall not apply to damage arising from the Company&rsquo;s willful
                misconduct or gross negligence.
              </p>
              <p style={{ marginTop: 12 }}>
                4. The Company shall bear no liability for damage arising from force
                majeure such as natural disasters, war, terrorism, riots, amendments to
                laws and regulations, acts of government agencies, or failures of
                communication lines.
              </p>
              <p style={{ marginTop: 12 }}>
                5. If the agreement between the Company and a customer regarding the
                Service constitutes a consumer contract as defined in the Consumer
                Contract Act, the disclaimer provisions and the liability cap of this
                Article shall not apply.
              </p>
            </Section>

            <Section title="Article 9-2 (Collection and Use of Data in the Service)">
              <p>
                1. In providing the Service, the Company collects the following data
                (hereinafter the &ldquo;Collected Data&rdquo;) on the customer&rsquo;s website.
              </p>
              <ul style={{ paddingLeft: 24, marginTop: 12 }}>
                <li>(1) Information entered by site visitors through the Service&rsquo;s features (AI chat, calendar booking forms, pop-ups/banners, and other input forms), including name, email address, phone number, company name, job title, department name, website URL, inquiry content, and other custom input items configured by the customer;</li>
                <li>(2) Behavioral data obtained through the Service&rsquo;s email delivery and outreach features (such as email opens and link clicks);</li>
                <li>(3) Behavioral data such as site visitors&rsquo; URLs of viewed pages, time on page, scroll depth, number and duration of sessions, and engagement data with each of the Service&rsquo;s features (chat, calendar, pop-ups, Download Center, etc.), including the pages viewed and viewing time of materials;</li>
                <li>(4) Site visitors&rsquo; IP addresses, device information, and browser information;</li>
                <li>(5) Corporate attribute information estimated based on information such as IP addresses (company name, industry, location, employee size, etc.);</li>
                <li>(6) Cookie and session information.</li>
              </ul>
              <p style={{ marginTop: 12 }}>
                2. The Company shall use the Collected Data only for the following
                purposes.
              </p>
              <ul style={{ paddingLeft: 24, marginTop: 12 }}>
                <li>(1) Providing and operating the Service (including generating responses via the AI chatbot, creating sales opportunities, and nurturing through email delivery);</li>
                <li>(2) Improving the Service and developing new features;</li>
                <li>(3) Providing usage reports to customers;</li>
                <li>(4) Integrating and transferring Collected Data to an external CRM or the like designated by the customer;</li>
                <li>(5) Maintaining the security of the Service and preventing unauthorized use.</li>
              </ul>
              <p style={{ marginTop: 12 }}>
                3. The Company shall not use the Collected Data for any purpose other
                than those set out in the preceding paragraph, and shall not provide it
                to third parties without the customer&rsquo;s prior written consent, except
                where required by laws and regulations.
              </p>
              <p style={{ marginTop: 12 }}>
                4. The Company shall not collect from the customer&rsquo;s website any data
                other than the data set out in Paragraph 1. If the Company changes the
                scope of the Collected Data, it will notify the customer in advance and
                obtain consent.
              </p>
              <p style={{ marginTop: 12 }}>
                5. In using the Service, the customer shall be responsible for
                appropriately disclosing, in the privacy policy of the customer&rsquo;s own
                website, the collection of data by the Service.
              </p>
            </Section>

            <Section title="Article 9-3 (Use for Training AI Models)">
              <p>
                1. For the purpose of improving the quality of the Service, the Company
                may statistically process or anonymize the Collected Data and use it to
                improve AI models.
              </p>
              <p style={{ marginTop: 12 }}>
                2. In the use described in the preceding paragraph, the Company shall take
                the following measures.
              </p>
              <ul style={{ paddingLeft: 24, marginTop: 12 }}>
                <li>(1) Anonymizing the data into a form that cannot identify a specific customer or site visitor;</li>
                <li>(2) Ensuring that the original personal information cannot be restored from the anonymized data;</li>
                <li>(3) Ensuring that a customer&rsquo;s proprietary trade secrets, customer information, and other confidential information are not output in another customer&rsquo;s use of the Service.</li>
              </ul>
              <p style={{ marginTop: 12 }}>
                3. The customer consents to the use of data for AI training after the
                anonymization processing described in the preceding paragraph. However,
                if the customer requests in writing that the Company stop the use of data
                for AI training, the Company will respond within a reasonable period.
              </p>
            </Section>

            <Section title="Article 9-4 (Ownership and Handling of Data)">
              <p>
                1. The intellectual property rights in the data uploaded to the Service
                by the customer, and in the output generated using the Service, belong to
                that customer.
              </p>
              <p style={{ marginTop: 12 }}>
                2. The Company may use the data uploaded by the customer to the extent
                necessary to provide, maintain, and improve the Service. However, use for
                the purpose of improving AI models shall be governed by the provisions of
                Article 9-3.
              </p>
              <p style={{ marginTop: 12 }}>
                3. The intellectual property rights in statistical data, behavioral
                metadata created or obtained by the Company through the Service, and in
                the Service itself, belong to the Company.
              </p>
              <p style={{ marginTop: 12 }}>
                4. Inquiries regarding the handling of intellectual property rights in the
                Service, or reports of rights infringement and the like, are accepted
                through the support desk prescribed by the Company. The Company will
                conduct appropriate legal confirmation and internal escalation regarding
                the matters received and respond promptly.
              </p>
            </Section>

            <Section title="Article 9-5 (Data Processing After Termination of the Agreement)">
              <p>
                1. When the agreement to use the Service is terminated, the Company will,
                within the period defined by the Company (in principle, within 90 days of
                termination), delete or anonymize the identifiable personal data
                registered by the customer (such as name and email address).
              </p>
              <p style={{ marginTop: 12 }}>
                2. Notwithstanding the preceding paragraph, the Company may retain and use
                indefinitely, even after the termination of the agreement, behavioral
                history, statistical information, and metadata that have been processed so
                that individuals cannot be identified, for the purposes of service
                improvement and analysis.
              </p>
              <p style={{ marginTop: 12 }}>
                3. If the customer wishes to export data or have data individually deleted
                upon termination of the agreement, the customer shall notify the Company
                at least 30 days prior to the date of termination. The Company will
                respond to such requests to a reasonable extent.
              </p>
            </Section>

            <Section title="Article 9-6 (Shared Responsibility for Security)">
              <p>
                Security protection in the Service is operated under a shared
                responsibility model among the customer, the Company, and the
                infrastructure provider used by the Company (AWS). The respective scopes
                of responsibility are as follows.
              </p>
              <p style={{ marginTop: 12 }}>
                1. The Customer&rsquo;s Responsibility
                <br />
                Appropriate management of accounts (such as setting strong passwords and
                using multi-factor authentication), granting and managing appropriate
                access privileges within the team (such as Admin, Editor, and Viewer), and
                ensuring the legality of the content of data entered into and registered
                in the Service are the customer&rsquo;s responsibility.
              </p>
              <p style={{ marginTop: 12 }}>
                2. The Company&rsquo;s Responsibility
                <br />
                Secure development of the applications related to the Service, appropriate
                management of the AI and search infrastructure, logical network security,
                and the operation of workflows for the pseudonymization and deletion of
                data are the Company&rsquo;s responsibility.
              </p>
              <p style={{ marginTop: 12 }}>
                3. The Infrastructure Provider&rsquo;s (AWS) Responsibility
                <br />
                The physical security of the data centers that form the foundation of the
                Service, the maintenance of server hardware, and the certified disposal of
                physical storage media belong to the scope of responsibility of the
                infrastructure provider.
              </p>
              <p style={{ marginTop: 12 }}>
                4. Special Provisions on Responsibility During Implementation Support
                <br />
                During the implementation phase of the Service, the Company&rsquo;s
                representatives may, at the customer&rsquo;s request, perform initial
                configuration and account issuance on the customer&rsquo;s behalf. Even in
                such cases, the responsibility for the final confirmation and approval of
                the configuration content rests with the customer, and after onboarding is
                completed, the management structure shall promptly transition to one led by
                the customer.
              </p>
            </Section>

            <Section title="Article 9-7 (Details of Security and Operational Specifications)">
              <p>
                The detailed security measures in the Service (encryption, network
                separation, backup structure, AI protection measures, etc.), the specific
                notification targets in the event of an incident, and the specifications
                regarding system change management and maintenance are set out in the
                &ldquo;Security and Operational Specifications&rdquo; provided on the
                console screen within the Service. In using the Service, the customer shall
                confirm and consent to the content of that document.
              </p>
            </Section>

            <Section title="Article 9-8 (Inquiries Regarding Information Security Incidents)">
              <p>
                Inquiries from customers regarding information security events or incidents
                are handled directly through the Company&rsquo;s representatives and designated
                chat tools, support centers, and the like. If the Company judges an event
                to be serious, the Company will promptly notify the customer and report
                progress as appropriate.
              </p>
            </Section>

            <Section title="Article 9-9 (Investigation of Logs and Disclosure to Public Authorities)">
              <p>
                1. As a general rule, the primary investigation at the time an event or
                incident occurs shall be conducted by the customer themselves, using the
                access log viewing feature provided by the Company. However, if the Company
                judges an event to be serious, the Company will consider providing the
                customer with application error logs and the like.
              </p>
              <p style={{ marginTop: 12 }}>
                2. Where there is a request for disclosure or provision through lawful
                procedures from a public authority with jurisdiction under laws and
                regulations, the Company may disclose information to that authority without
                prior notice to or consent from the customer, in accordance with the
                Company&rsquo;s Privacy Policy.
              </p>
            </Section>

            <Section title="Article 10 (Changes to the Content of the Service)">
              <p>
                The Company may change, add to, or discontinue the content of the Service
                upon prior notice to customers, and customers shall consent to this.
              </p>
            </Section>

            <Section title="Article 11 (Changes to the Terms of Service)">
              <p>
                The Company may change these Terms without the individual consent of
                customers in the following cases.
              </p>
              <ul style={{ paddingLeft: 24, marginTop: 12 }}>
                <li>When the change to these Terms conforms to the general interests of customers;</li>
                <li>When the change to these Terms is not contrary to the purpose of the agreement to use the Service and is reasonable in light of the necessity of the change, the appropriateness of the content after the change, and other circumstances relating to the change.</li>
              </ul>
              <p style={{ marginTop: 12 }}>
                In changing these Terms under the preceding paragraph, the Company will
                notify customers in advance of the fact that these Terms will be changed,
                the content of the changed Terms, and the time when they take effect.
              </p>
            </Section>

            <Section title="Article 12 (Handling of Personal Information)">
              <p>
                The Company shall appropriately handle personal information obtained
                through the use of the Service in accordance with the Company&rsquo;s &ldquo;
                <a
                  href="/en/privacy-policy/"
                  style={{ color: "#12a37d", textDecoration: "underline" }}
                >
                  Privacy Policy
                </a>
                .&rdquo;
              </p>
            </Section>

            <Section title="Article 13 (Notices or Communications)">
              <p>
                Notices or communications between customers and the Company shall be made
                by the method prescribed by the Company. Unless the customer submits a
                change notification in accordance with the method separately prescribed by
                the Company, the Company will treat the currently registered contact
                details as valid and make notices or communications to those contact
                details, which shall be deemed to have reached the customer at the time of
                transmission.
              </p>
            </Section>

            <Section title="Article 14 (Prohibition of Assignment of Rights and Obligations)">
              <p>
                Customers may not, without the prior written consent of the Company,
                assign to a third party or provide as security their status under the
                usage agreement or their rights or obligations under these Terms.
              </p>
            </Section>

            <Section title="Article 15 (Governing Law and Jurisdiction)">
              <p>
                In interpreting these Terms, Japanese law shall be the governing law. In
                the event of a dispute regarding the Service, the Tokyo District Court
                shall be the court of exclusive agreed jurisdiction of the first instance.
              </p>
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
