import type { Metadata } from "next";
import { EN_OG_IMAGE } from "@/app/lib/i18n";
import TrialPageClient from "@/app/components/TrialPageClient";

// EN-only page (no JA twin): the self-serve funnel destination for every
// "Start 1-month free trial" CTA on the English site. Self-canonical, no
// hreflang pair — middleware/geo must never strip it to /trial/ (see
// EN_ONLY_PREFIXES in app/lib/i18n.ts).

export const metadata: Metadata = {
  title: { absolute: "Start your 1-month free trial｜Meeton ai" },
  description:
    "Try Meeton ai free for 1 month — an AI SDR that captures website visitors, qualifies them, and books meetings automatically. No credit card required, live within 1 business day, no auto-billing.",
  alternates: {
    canonical: "/en/trial/",
  },
  openGraph: {
    images: EN_OG_IMAGE,
    title: "Start your 1-month free trial｜Meeton ai",
    description:
      "An AI SDR that captures website visitors, qualifies them, and books meetings — free for 1 month. No credit card required.",
    url: "https://dynameet.ai/en/trial/",
    type: "website",
    locale: "en_US",
  },
};

export default function Page() {
  return <TrialPageClient />;
}
