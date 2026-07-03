import Footer from "@/app/components/Footer";
import Nav from "@/app/components/Nav";
import type { Metadata } from "next";
import Link from "next/link";
import { altLanguages, ogLocale } from "@/app/lib/i18n";

export const metadata: Metadata = {
  title: "Commercial Disclosure",
  description:
    "Disclosure under the Specified Commercial Transactions Act of Japan for services operated by DynaMeet, Inc.",
  alternates: altLanguages("/legal/tokushoho/", "en"),
  openGraph: {
    title: "Commercial Disclosure｜Meeton ai",
    description:
      "Disclosure under the Specified Commercial Transactions Act of Japan for services operated by DynaMeet, Inc.",
    url: "https://dynameet.ai/en/legal/tokushoho/",
    locale: ogLocale("en"),
  },
};

// Mirrors the Japanese disclosure at /legal/tokushoho/.
const ITEMS: { label: string; value: React.ReactNode }[] = [
  {
    label: "Business name",
    value: "DynaMeet, Inc. (legal name: DynaMeet株式会社)",
  },
  {
    label: "Business address",
    value: "Daikanyama Art Village 2C, 17-10 Sarugakucho, Shibuya-ku, Tokyo 150-0033, Japan",
  },
  {
    label: "Responsible person",
    value: "Ray Ayan, Director",
  },
  {
    label: "Contact",
    value:
      "info@dynameet.ai (or our contact form). A phone number is available promptly upon request.",
  },
  {
    label: "Service fees",
    value: (
      <>
        See our <a href="/en/pricing/" style={{ color: "#12a37d" }}>pricing page</a>. Custom quotes are available for enterprise needs.
      </>
    ),
  },
  {
    label: "Payment timing and methods",
    value:
      "Self-serve plans are billed automatically via credit card through Stripe, on a recurring monthly basis from the contract start date. Enterprise contracts are invoiced and payable within 30 days by bank transfer.",
  },
  {
    label: "Service delivery timing",
    value:
      "Free trials are provisioned within 1 business day of your request. Paid self-serve plans activate immediately after completing payment via Stripe. Enterprise plans begin on the schedule set out at contract signing.",
  },
  {
    label: "Cancellation policy",
    value:
      "Monthly self-serve plans can be canceled at any time. Cancellation takes effect at the start of the next billing cycle, with no partial-period refund. Enterprise contract cancellation terms are governed by the individual service agreement.",
  },
  {
    label: "Refund policy",
    value:
      "We do not provide refunds for the elapsed portion of a billing period. The free trial can be canceled at any time at no charge.",
  },
  {
    label: "System requirements",
    value:
      "Verified on the latest versions of Google Chrome, Safari, Firefox, and Microsoft Edge. JavaScript must be enabled.",
  },
];

export default function TokushohoPageEn() {
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
            <span style={{ color: "#0f1128" }}>Commercial Disclosure</span>
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
              Commercial Disclosure
            </h1>
            <p
              style={{
                marginTop: 12,
                marginBottom: 0,
                fontSize: "clamp(13px, 2vw, 15px)",
                color: "#6e7494",
              }}
            >
              Disclosure under the Specified Commercial Transactions Act of
              Japan (特定商取引法に基づく表記)
            </p>
          </header>

          {/* Content */}
          <div
            style={{
              fontSize: "clamp(14px, 2vw, 15px)",
              lineHeight: 1.8,
              color: "#374151",
            }}
          >
            <dl style={{ margin: 0 }}>
              {ITEMS.map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(140px, 220px) 1fr",
                    gap: "8px 24px",
                    padding: "16px 0",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <dt style={{ fontWeight: 700, color: "#0f1128" }}>
                    {item.label}
                  </dt>
                  <dd style={{ margin: 0 }}>{item.value}</dd>
                </div>
              ))}
            </dl>

            <p style={{ marginTop: 48, color: "#6e7494", fontSize: 14 }}>
              Established: July 2, 2026
            </p>
          </div>
        </div>
      </main>
      <Footer lang="en" />
    </>
  );
}
