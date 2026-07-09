import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { altLanguages, ogLocale, EN_OG_IMAGE } from "@/app/lib/i18n";

// /en/terms/ — pointer stub, NOT a translation (owner call 2026-07-09).
// The full English translation of the managed-rail ToS was deleted: it had no
// legal force ("Japanese prevails") and every JA change forced a re-translation
// — pure drift risk, since 100% of non-JP customers are self-serve. This page
// only routes: managed plans → /terms/ (Japanese, authoritative); self-serve →
// /en/legal/terms-self-serve/ (English, authoritative). URL kept alive for
// hreflang pairing, the language switcher, and old links. Do not re-add a
// translated body here.

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Which Terms of Service apply to your Meeton ai subscription: self-serve (English) or managed plans (Japanese).",
  alternates: altLanguages("/terms/", "en"),
  openGraph: {
    images: EN_OG_IMAGE,
    title: "Terms of Service｜Meeton ai",
    description:
      "Which Terms of Service apply to your Meeton ai subscription: self-serve (English) or managed plans (Japanese).",
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
            <Link href="/en/" style={{ color: "#6e7494", textDecoration: "none" }}>
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

          <div
            style={{
              fontSize: "clamp(14px, 2vw, 15px)",
              lineHeight: 1.8,
              color: "#374151",
            }}
          >
            <p style={{ marginBottom: 28 }}>
              Meeton ai is offered under two sets of terms, depending on how you
              subscribe.
            </p>

            <RailCard
              title="Self-serve subscriptions"
              body="If you subscribe online through our self-serve signup, your agreement is the Self-Serve Terms of Service (English)."
              href="/en/legal/terms-self-serve/"
              linkLabel="Read the Self-Serve Terms of Service"
            />

            <RailCard
              title="Managed plans (order form)"
              body="If you contract with us through a written order form arranged with our sales team, your agreement is the Terms of Service maintained in Japanese, which is the authoritative text for managed plans. Contact us if you have questions about them in English."
              href="/terms/"
              linkLabel="利用規約を読む（Japanese, authoritative）"
            />

            <p style={{ marginTop: 28, color: "#6e7494", fontSize: 14 }}>
              Related:{" "}
              <a href="/en/privacy-policy/" style={{ color: "#12a37d" }}>
                Privacy Policy
              </a>
              {" · "}
              <a href="/en/legal/dpa/" style={{ color: "#12a37d" }}>
                Data Processing Addendum
              </a>
              {" · "}
              <a href="/en/contact/" style={{ color: "#12a37d" }}>
                Contact us
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer lang="en" />
    </>
  );
}

function RailCard({
  title,
  body,
  href,
  linkLabel,
}: {
  title: string;
  body: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div
      style={{
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        borderRadius: 12,
        padding: "20px 24px",
        marginBottom: 16,
      }}
    >
      <h2
        style={{
          fontSize: "clamp(16px, 2.5vw, 18px)",
          fontWeight: 700,
          color: "#0f1128",
          margin: "0 0 8px",
        }}
      >
        {title}
      </h2>
      <p style={{ margin: "0 0 12px" }}>{body}</p>
      <a href={href} style={{ color: "#12a37d", fontWeight: 700 }}>
        {linkLabel} →
      </a>
    </div>
  );
}
