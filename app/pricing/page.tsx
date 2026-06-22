import type { Metadata } from "next";
import { altLanguages } from '@/app/lib/i18n'
import PricingContent, { PRICING_STR, pricingFaqSchema, pricingProductSchema } from "@/app/components/v2/PricingContent";

const s = PRICING_STR.ja;

export const metadata: Metadata = {
  title: { absolute: s.metaTitleAbsolute },
  description: s.metaDescription,
  alternates: altLanguages("/pricing/", 'ja'),
  openGraph: {
    title: s.ogTitle,
    description: s.ogDescription,
    url: "https://dynameet.ai/pricing/",
    type: "website",
  },
};

const faqSchema = pricingFaqSchema("ja", "https://dynameet.ai/pricing/");
const productSchema = pricingProductSchema("ja", "https://dynameet.ai/pricing/");

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PricingContent lang="ja" />
    </>
  );
}
