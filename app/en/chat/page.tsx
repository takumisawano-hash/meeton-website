import type { Metadata } from "next";
import ProductLP, { productFaqSchema, productAppSchema } from "@/app/components/v2/ProductLP";
import { PRODUCTS_EN } from "@/app/lib/product-lp-data";
import { altLanguages, ogLocale } from "@/app/lib/i18n";

const data = PRODUCTS_EN.chat;
export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: data.metaTitle },
  description: data.metaDescription,
  alternates: altLanguages("/chat/", "en"),
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: "https://dynameet.ai/en/chat/",
    type: "website",
    locale: ogLocale("en"),
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://dynameet.ai/" },
    { "@type": "ListItem", position: 2, name: data.productName, item: "https://dynameet.ai/en/chat/" },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productAppSchema(data, "en")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productFaqSchema(data, "en")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <ProductLP data={data} lang="en" />
    </>
  );
}
