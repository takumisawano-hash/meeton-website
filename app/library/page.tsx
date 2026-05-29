import type { Metadata } from "next";
import ProductLP, { productFaqSchema, productAppSchema } from "@/app/components/v2/ProductLP";
import { PRODUCTS } from "@/app/lib/product-lp-data";

const data = PRODUCTS.library;
export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: data.metaTitle },
  description: data.metaDescription,
  alternates: { canonical: "/library/" },
  openGraph: { title: data.metaTitle, description: data.metaDescription, url: "https://dynameet.ai/library/", type: "website" },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://dynameet.ai/" },
    { "@type": "ListItem", position: 2, name: data.productName, item: "https://dynameet.ai/library/" },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productAppSchema(data)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productFaqSchema(data)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <ProductLP data={data} />
    </>
  );
}
