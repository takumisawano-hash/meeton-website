import type { Metadata } from "next";
import PricingContent, { PRICING_STR, pricingFaqSchema, pricingProductSchema } from "@/app/components/v2/PricingContent";
import { altLanguages, ogLocale } from "@/app/lib/i18n";

const s = PRICING_STR.en;
const URL = "https://dynameet.ai/en/pricing/";

export const metadata: Metadata = {
  title: { absolute: s.metaTitleAbsolute },
  description: s.metaDescription,
  alternates: altLanguages("/pricing/", "en"),
  openGraph: {
    title: s.ogTitle,
    description: s.ogDescription,
    url: URL,
    type: "website",
    locale: ogLocale("en"),
  },
};

const faqSchema = pricingFaqSchema("en", URL);
const productSchema = pricingProductSchema("en", URL);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PricingContent lang="en" />
    </>
  );
}
