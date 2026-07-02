import Footer from "@/app/components/Footer";
import Nav from "@/app/components/Nav";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Commercial Disclosure",
  description:
    "Disclosure under the Specified Commercial Transactions Act of Japan for services operated by DynaMeet K.K.",
  // TODO(legal): noindex while draft. Flip to indexable in the same commit that
  // lands the final copy, and restore the app/sitemap.ts entry alongside it.
  robots: { index: false, follow: true },
  alternates: {
    canonical: "/en/legal/mail-order-sales/",
    // Slugs differ per locale, so altLanguages() can't be used — hand-written pair.
    languages: {
      ja: "/legal/tokushoho/",
      en: "/en/legal/mail-order-sales/",
      "x-default": "/legal/tokushoho/",
    },
  },
  openGraph: {
    title: "Commercial Disclosure｜Meeton ai",
    description:
      "Disclosure under the Specified Commercial Transactions Act of Japan for services operated by DynaMeet K.K.",
    url: "https://dynameet.ai/en/legal/mail-order-sales/",
  },
};

// TODO(legal): all values below must be finalized with legal review before
// publishing. This is a scaffold only — content must mirror the Japanese
// disclosure at /legal/tokushoho/.
const ITEMS: { label: string; value: React.ReactNode }[] = [
  {
    label: "Business name",
    value: <Todo hint="legal entity name (e.g. DynaMeet K.K.)" />,
  },
  {
    label: "Business address",
    value: (
      <Todo hint="registered address (confirm: Daikanyama Art Village 2C, 17-10 Sarugakucho, Shibuya-ku, Tokyo 150-0033, Japan)" />
    ),
  },
  {
    label: "Responsible person",
    value: <Todo hint="name of representative or operations manager" />,
  },
  {
    label: "Contact",
    value: <Todo hint="email address (e.g. info@dynameet.ai) and phone-number disclosure policy" />,
  },
  {
    label: "Service fees",
    value: <Todo hint="reference to pricing plans, or note that quotes are individual" />,
  },
  {
    label: "Payment timing and methods",
    value: <Todo hint="billing cycle, accepted payment methods (credit card / bank transfer), due dates" />,
  },
  {
    label: "Service delivery timing",
    value: <Todo hint="when accounts are provisioned after contract" />,
  },
  {
    label: "Cancellation policy",
    value: <Todo hint="cancellation procedure, minimum term, mid-term termination" />,
  },
  {
    label: "Refund policy",
    value: <Todo hint="whether and under what conditions refunds are given" />,
  },
  {
    label: "System requirements",
    value: <Todo hint="supported browsers / system requirements" />,
  },
];

export default function MailOrderSalesPage() {
  return (
    <>
      <Nav lang="en" langSwitchHref="/legal/tokushoho/" />
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

          {/* TODO(legal): remove this draft notice once final copy lands */}
          <p
            style={{
              background: "#fff7ed",
              border: "1px solid #fdba74",
              borderRadius: 12,
              padding: 16,
              fontSize: 14,
              color: "#9a3412",
              marginBottom: 32,
            }}
          >
            [DRAFT] This page is a scaffold. All items are pending final legal
            copy and must be replaced before publication.
          </p>

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
              Established: <Todo hint="official publication date" />
            </p>
          </div>
        </div>
      </main>
      <Footer lang="en" />
    </>
  );
}

function Todo({ hint }: { hint: string }) {
  return (
    <span style={{ color: "#b45309", fontWeight: 600 }}>
      TODO: {hint}
    </span>
  );
}
