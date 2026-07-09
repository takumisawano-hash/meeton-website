import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { EN_OG_IMAGE } from "@/app/lib/i18n";

// /en/legal/terms-self-serve/ — Self-Serve Terms of Service (click-through).
// EN-only page (no JA twin): the English master governing subscriptions
// purchased online (the #2110 self-serve rail). Written to the Australian
// unfair-contract-terms bar and reused for every market, with a short
// country-supplements section (AU ACL / NZ CGA / JP Consumer Contract Act).
// Order-form (sales-managed) customers stay on /terms/ — the managed rail.
//
// DRAFT — pending owner review (counsel is defer-with-triggers, not gating;
// see PR #11 for the parked-for-counsel list). Do not remove the DraftNotice
// or publish before owner sign-off + product hooks ship. Gap list this draft
// answers: docs/planning/sgaunz-selfserve-implications-2026-07-07.md §7/§7b
// (saas repo). The ACL s 64A / NZ CGA s 43(2) clauses track the statutory
// formulas — verify wording against the statute (side-by-side in the PR body)
// before changing them.

export const metadata: Metadata = {
  title: "Self-Serve Terms of Service",
  description:
    "The Terms of Service governing self-serve (online) subscriptions to Meeton ai by DynaMeet, Inc.",
  alternates: {
    canonical: "/en/legal/terms-self-serve/",
  },
  openGraph: {
    images: EN_OG_IMAGE,
    title: "Self-Serve Terms of Service｜Meeton ai",
    description:
      "The Terms of Service governing self-serve (online) subscriptions to Meeton ai by DynaMeet, Inc.",
    url: "https://dynameet.ai/en/legal/terms-self-serve/",
    type: "website",
    siteName: "Meeton ai",
    locale: "en_US",
  },
};

export default function SelfServeTermsPage() {
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
            <span style={{ color: "#0f1128" }}>Self-Serve Terms of Service</span>
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
              Self-Serve Terms of Service
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
            <p style={{ marginBottom: 16 }}>
              These Self-Serve Terms of Service (the &ldquo;Terms&rdquo;) govern
              subscriptions to the &ldquo;DynaMeet Platform&rdquo; (including Meeton
              ai; the &ldquo;Service&rdquo;) purchased online through our self-serve
              signup, and form an agreement between the customer (the
              &ldquo;Customer,&rdquo; &ldquo;you&rdquo;) and DynaMeet, Inc.
              (DynaMeet株式会社), a company incorporated in Japan (the
              &ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;). By clicking
              to accept, creating an account, or using the Service, you accept these
              Terms on behalf of the business you represent.
            </p>
            <p style={{ marginBottom: 32 }}>
              Customers who contract with us through a written order form arranged
              with our sales team are governed by our{" "}
              <a href="/en/terms/" style={{ color: "#12a37d" }}>
                Terms of Service (managed plans)
              </a>{" "}
              instead of these Terms.
            </p>

            <Section title="1. Eligibility and business use only">
              <p>
                1.1 The Service is offered solely for business and professional use.
                You represent that you are entering into these Terms in the course of
                a business or profession, not as a consumer for personal, domestic or
                household purposes, and that you have authority to bind the company
                or organisation on whose behalf you accept these Terms.
              </p>
              <p style={{ marginTop: 12 }}>
                1.2 You must be at least 18 years old to create an account.
              </p>
              <p style={{ marginTop: 12 }}>
                1.3 You may not use the Service if you are located in, or are
                ordinarily resident in, a country or territory subject to
                comprehensive trade sanctions or embargoes, or if you are a person
                with whom we are prohibited from dealing under applicable export
                control or sanctions laws (including those of Japan). We may decline
                or close registrations to the extent required to comply with such
                laws.
              </p>
            </Section>

            <Section title="2. Account registration">
              <p>
                2.1 You must provide accurate and current registration information
                (including your business name and country) and keep it up to date.
              </p>
              <p style={{ marginTop: 12 }}>
                2.2 Registration is complete when you finish the online signup flow.
                We may decline or cancel a registration only on objective grounds:
                where the information provided is false or incomplete, where the
                registration violates Section 1 (eligibility), where a previous
                agreement with you was terminated for breach, or where acceptance
                would cause us to breach applicable law.
              </p>
              <p style={{ marginTop: 12 }}>
                2.3 You are responsible for maintaining the confidentiality of your
                account credentials and for activity under your account. You must
                notify us promptly of any suspected unauthorised use. Administrator
                users can manage roles and access for additional users within the
                Service.
              </p>
            </Section>

            <Section title="3. Free trial">
              <p>
                3.1 We may offer a free trial of the Service. The specific trial
                mechanics — its duration or usage limits, whether payment details are
                required, and how the trial transitions to a paid subscription — are
                stated at signup.
              </p>
              <p style={{ marginTop: 12 }}>
                3.2 We will notify you by email before you incur any first charge
                following a trial. If you do not wish to continue, you can cancel
                within the Service before the charge date at no cost.
              </p>
            </Section>

            <Section title="4. Subscription term, renewal and cancellation">
              <p>
                4.1 Subscriptions run for the billing period selected at purchase
                (monthly or annual) and renew automatically for successive periods of
                the same length unless cancelled.
              </p>
              <p style={{ marginTop: 12 }}>
                4.2 <strong>Renewal reminders.</strong> For annual subscriptions, we
                will send a reminder email to your account administrator at least 14
                days before each renewal date, stating the renewal price and how to
                cancel.
              </p>
              <p style={{ marginTop: 12 }}>
                4.3 <strong>Cancellation at any time, in-app.</strong> You may cancel
                your subscription at any time from the billing settings within the
                Service, without needing to contact us. Cancellation takes effect at
                the end of the current billing period; you keep access until then. We
                do not charge cancellation or exit fees.
              </p>
              <p style={{ marginTop: 12 }}>
                4.4 Except as expressly stated in these Terms (including Sections 6.2,
                8.3 and 15.2) or required by law, fees already paid are not refunded
                for partial billing periods.
              </p>
            </Section>

            <Section title="5. Fees, taxes and payment">
              <p>
                5.1 Fees for each plan are as published on our{" "}
                <a href="/en/pricing/" style={{ color: "#12a37d" }}>
                  pricing page
                </a>{" "}
                (or as displayed at checkout) at the time you subscribe or renew, in
                the currency displayed for your market.
              </p>
              <p style={{ marginTop: 12 }}>
                5.2 All fees are exclusive of taxes. GST, consumption tax, or other
                applicable indirect taxes are added where required, or handled under
                a reverse-charge or equivalent mechanism where applicable. You agree
                to provide a valid business tax identifier for your jurisdiction when
                requested at billing (for example an ABN in Australia, a GST number
                or NZBN in New Zealand, or a GST registration number in Singapore),
                and warrant that your details are accurate. If you do not provide a
                valid business tax identifier, we may be required to treat the sale
                as a consumer sale for tax purposes and charge applicable taxes.
              </p>
              <p style={{ marginTop: 12 }}>
                5.3 Payment is collected by the payment method registered at checkout
                through our payment provider. If a payment fails, we will notify you
                and retry; if payment remains outstanding 14 days after notice, we
                may suspend the Service until payment is made.
              </p>
              <p style={{ marginTop: 12 }}>
                5.4 <strong>Price changes.</strong> We may change subscription fees
                by giving you at least 30 days&rsquo; notice by email. A price change
                takes effect from your next renewal after the notice period — never
                mid-term. If you do not accept the new price, you may cancel before
                the renewal date at no cost.
              </p>
            </Section>

            <Section title="6. The Service and changes to it">
              <p>
                6.1 We continuously improve the Service and may add, modify or remove
                features. We will exercise this right reasonably, having regard to
                your interest in continuity of the Service.
              </p>
              <p style={{ marginTop: 12 }}>
                6.2 If a change materially degrades the core functionality of the
                Service you have paid for, or we discontinue the Service, we will
                give you at least 30 days&rsquo; advance notice, and you may terminate
                your subscription and receive a pro-rata refund of prepaid fees for
                the unused portion of your term.
              </p>
              <p style={{ marginTop: 12 }}>
                6.3 We may suspend the Service temporarily for maintenance,
                inspection or updates, or where provision becomes impracticable due
                to events beyond our reasonable control. We will give advance notice
                of planned maintenance where practicable.
              </p>
            </Section>

            <Section title="7. Acceptable use">
              <p>7.1 In using the Service, you must not:</p>
              <ul style={{ paddingLeft: 24, marginTop: 12 }}>
                <li>violate applicable laws or regulations, or use the Service for criminal activity;</li>
                <li>interfere with or disrupt the Service or the servers or networks of the Company or any third party, or attempt unauthorised access;</li>
                <li>impersonate others or misrepresent your affiliation;</li>
                <li>infringe the intellectual property, privacy or other rights of any person;</li>
                <li>upload or distribute malware or other harmful code;</li>
                <li>resell, sublicense or provide the Service to third parties except as expressly permitted;</li>
                <li>use the Service to send unlawful, deceptive or unsolicited communications in breach of Section 7.2.</li>
              </ul>
              <p style={{ marginTop: 12 }}>
                7.2 <strong>Email and messaging compliance.</strong> You are the
                sender of messages sent through or with the assistance of the
                Service. You must ensure that each commercial electronic message you
                send has a lawful basis under the laws applicable to you and your
                recipients — including the Spam Act 2003 (Cth) in Australia, the
                Unsolicited Electronic Messages Act 2007 in New Zealand, the Spam
                Control Act 2007 in Singapore, and the Act on Regulation of
                Transmission of Specified Electronic Mail in Japan — that messages
                accurately identify you as sender, and that unsubscribe requests are
                honoured promptly. The Service provides compliance features
                (including unsubscribe links and suppression of opted-out contacts);
                you must not circumvent them. We may restrict sending features where
                we reasonably believe they are being used unlawfully.
              </p>
            </Section>

            <Section title="8. Customer data, privacy and data processing">
              <p>
                8.1 You retain all rights in the data you upload to the Service and
                in the data collected from your website through the Service
                (&ldquo;Customer Data&rdquo;). We process Customer Data that contains
                personal information on your behalf, as your processor or service
                provider, in accordance with the{" "}
                <a href="/en/legal/dpa/" style={{ color: "#12a37d" }}>
                  Data Processing Addendum
                </a>{" "}
                (&ldquo;DPA&rdquo;), which is incorporated into these Terms.
              </p>
              <p style={{ marginTop: 12 }}>
                8.2 You are responsible for your own compliance with privacy laws
                that apply to your collection of visitor data through the Service —
                including making the privacy disclosures required in your
                jurisdiction on your own website. The Service provides disclosure
                templates and configuration options to assist you; they are not
                legal advice.
              </p>
              <p style={{ marginTop: 12 }}>
                8.3 If we materially change the categories of data the Service
                collects from your website, we will notify you in advance; if you do
                not accept the change, you may terminate under Section 15.2.
              </p>
            </Section>

            <Section title="9. AI features and AI training">
              <p>
                9.1 The Service uses artificial intelligence to generate content
                (such as chat responses and emails). AI output may contain errors.
                You are responsible for reviewing AI-generated content and for how
                you use it; features that send AI-generated communications operate
                under settings you control.
              </p>
              <p style={{ marginTop: 12 }}>
                9.2 We may use Customer Data to improve our AI models only after it
                has been de-identified and aggregated so that it no longer identifies
                you, your visitors, or any individual, and cannot reasonably be
                re-identified. We do not use one customer&rsquo;s confidential
                information to generate output for another customer.
              </p>
              <p style={{ marginTop: 12 }}>
                9.3 You may opt out of the use of your Customer Data for AI model
                improvement at any time via the settings screen within the Service,
                with effect for data processed after the opt-out.
              </p>
            </Section>

            <Section title="10. Intellectual property">
              <p>
                10.1 We (and our licensors) retain all rights in the Service,
                including software, models, and statistical data that does not
                identify you or your visitors. You receive a non-exclusive,
                non-transferable right to use the Service for your internal business
                purposes during your subscription.
              </p>
              <p style={{ marginTop: 12 }}>
                10.2 Output generated for you through the Service from your Customer
                Data belongs to you. If you give us feedback about the Service, we
                may use it without restriction, provided we do not disclose your
                confidential information.
              </p>
            </Section>

            <Section title="11. Confidentiality">
              <p>
                Each party will keep the other party&rsquo;s non-public business,
                technical and commercial information confidential, use it only to
                perform under these Terms, and protect it with at least reasonable
                care. This obligation does not apply to information that is or
                becomes public without breach, was known before disclosure, is
                independently developed, or must be disclosed by law (with notice to
                the other party where lawful). It survives for 3 years after
                termination.
              </p>
            </Section>

            <Section title="12. Suspension and termination by us">
              <p>
                12.1 If you breach these Terms in a way that can be remedied, we will
                notify you and give you at least 14 days to remedy the breach before
                suspending or terminating your account.
              </p>
              <p style={{ marginTop: 12 }}>
                12.2 We may suspend or terminate immediately, with notice to you,
                only where: the breach is serious and cannot be remedied; your use
                poses a security risk to the Service or others; your use is unlawful
                or causes us to breach applicable law; or fees remain unpaid 14 days
                after a payment-failure notice under Section 5.3.
              </p>
              <p style={{ marginTop: 12 }}>
                12.3 Any suspension will be proportionate — limited to the affected
                feature where reasonably possible — and lifted once the ground for it
                is resolved.
              </p>
            </Section>

            <Section title="13. Effect of termination and data export">
              <p>
                13.1 On termination or expiry, your right to use the Service ends.
                For 30 days after termination you may export your Customer Data
                using the Service&rsquo;s export features or by request to support.
              </p>
              <p style={{ marginTop: 12 }}>
                13.2 After the export window, we delete or de-identify Customer Data
                in accordance with the DPA (in principle within 90 days of
                termination). De-identified, aggregated data that no longer
                identifies any person or customer may be retained for service
                improvement and analytics.
              </p>
            </Section>

            <Section title="14. Warranties, disclaimers and liability">
              <p>
                14.1 We warrant that we will provide the Service with reasonable care
                and skill. Except as expressly stated in these Terms and to the
                extent permitted by law, the Service is provided &ldquo;as is&rdquo;
                and we do not warrant that it will be uninterrupted or error-free.
              </p>
              <p style={{ marginTop: 12 }}>
                14.2 To the extent permitted by law, neither party is liable for
                indirect or consequential loss, loss of profits, or loss of data, and
                each party&rsquo;s total aggregate liability arising out of or in
                connection with these Terms is capped at the fees paid by you in the
                12 months preceding the event giving rise to the claim.
              </p>
              <p style={{ marginTop: 12 }}>
                14.3 The exclusions and cap in Section 14.2 do not apply to: a
                party&rsquo;s wilful misconduct or gross negligence; your payment
                obligations; or any liability that cannot be excluded or limited
                under applicable law (including the non-excludable rights described
                in Section 17).
              </p>
              <p style={{ marginTop: 12 }}>
                14.4 Nothing in these Terms excludes, restricts or modifies any
                right or remedy you have under mandatory applicable law that cannot
                lawfully be excluded, restricted or modified.
              </p>
            </Section>

            <Section title="15. Changes to these Terms">
              <p>
                15.1 We may update these Terms from time to time. Changes that do not
                materially reduce your rights (such as clarifications, new-feature
                terms, or changes required by law) take effect when posted, with
                notice within the Service.
              </p>
              <p style={{ marginTop: 12 }}>
                15.2 For changes that materially reduce your rights or increase your
                obligations, we will give you at least 30 days&rsquo; advance notice
                by email and within the Service. If you do not accept such a change,
                you may terminate your subscription before the change takes effect
                and receive a pro-rata refund of prepaid fees for the unused portion
                of your term. Continued use after the effective date, following such
                notice, constitutes acceptance.
              </p>
            </Section>

            <Section title="16. Notices, assignment and general">
              <p>
                16.1 We give notices by email to your account administrator&rsquo;s
                registered address and/or within the Service; you give notices to the
                contact stated on our website. Keep your registered email current.
              </p>
              <p style={{ marginTop: 12 }}>
                16.2 Neither party may assign these Terms without the other&rsquo;s
                consent (not to be unreasonably withheld), except that either party
                may assign to an affiliate or to a successor in a merger,
                reorganisation or sale of substantially all assets, with notice to
                the other party.
              </p>
              <p style={{ marginTop: 12 }}>
                16.3 <strong>Severability.</strong> If a provision of these Terms is
                found void or unenforceable in a jurisdiction, it is severed or read
                down there to the minimum extent necessary, and the remainder of
                these Terms continues in full effect. A failure to enforce a
                provision is not a waiver.
              </p>
              <p style={{ marginTop: 12 }}>
                16.4 <strong>Local mandatory rights unaffected.</strong> Nothing in
                these Terms (including any limitation, exclusion, variation,
                termination, or governing-law provision) excludes, restricts or
                modifies any right, guarantee or protection granted to you by a
                mandatory law of your jurisdiction that cannot lawfully be excluded,
                restricted or modified; every provision of these Terms is to be read
                subject to such laws.
              </p>
            </Section>

            <Section title="17. Country supplements">
              <p>
                The supplements in this Section apply to Customers in the named
                jurisdiction and prevail over the rest of these Terms to the extent
                of any inconsistency.
              </p>
              <SubHeading>17.1 Australia</SubHeading>
              <p>
                Nothing in these Terms excludes, restricts or modifies any consumer
                guarantee, right or remedy under the Australian Consumer Law
                (Schedule 2 to the Competition and Consumer Act 2010 (Cth)) that
                cannot lawfully be excluded, restricted or modified. Where our
                liability for failure to comply with a consumer guarantee can be
                limited under section 64A of the Australian Consumer Law, our
                liability is limited, at our option, to: (a) the supplying of the
                services again; or (b) the payment of the cost of having the
                services supplied again. Prices shown for Australian customers are
                exclusive of GST unless stated otherwise; GST is applied or
                reverse-charged as described in Section 5.2.
              </p>
              <SubHeading>17.2 New Zealand</SubHeading>
              <p>
                This Section records the parties&rsquo; agreement in writing, for
                the purposes of section 43(2) of the Consumer Guarantees Act 1993
                (NZ), that: the Service is supplied and acquired in trade; all
                parties are in trade; the parties agree to contract out of the
                provisions of the Consumer Guarantees Act 1993; and it is fair and
                reasonable that the parties are bound by this provision.
              </p>
              <SubHeading>17.3 Singapore</SubHeading>
              <p>
                Prices shown for Singapore customers do not include Singapore GST
                unless stated otherwise. For questions about personal data, see the
                Singapore annex of our{" "}
                <a href="/en/privacy-policy/" style={{ color: "#12a37d" }}>
                  Privacy Policy
                </a>
                .
              </p>
              <SubHeading>17.4 Japan</SubHeading>
              <p>
                If, notwithstanding Section 1.1, the agreement with you constitutes a
                consumer contract under the Consumer Contract Act of Japan, the
                disclaimers and liability cap in Section 14 apply only to the extent
                permitted by that Act. Japanese consumption tax is applied as
                required by law.
              </p>
            </Section>

            <Section title="18. Governing law, jurisdiction and language">
              <p>
                18.1 These Terms are governed by the laws of Japan. The Tokyo
                District Court has exclusive jurisdiction of the first instance over
                disputes arising in connection with the Service, except where
                mandatory law of your place of business grants you the right to
                bring or defend proceedings elsewhere. Nothing in this Section
                deprives you of the protection of mandatory provisions of the law of
                your jurisdiction (including those referenced in Section 17).
              </p>
              <p style={{ marginTop: 12 }}>
                18.2 These Terms are executed in English. The English text controls
                for self-serve subscriptions; any translation is provided for
                convenience only.
              </p>
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
      <strong>DRAFT — not yet in effect.</strong> This document is a working
      draft pending final review and creates no rights or obligations. The
      currently effective terms are our{" "}
      <a href="/en/terms/" style={{ color: "#7a5b00" }}>
        Terms of Service
      </a>
      .
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
