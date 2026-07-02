import type { Metadata } from "next";
import CaptureContent, { CAPTURE_STR, captureBreadcrumb, captureFaqSchema } from "@/app/components/v2/CaptureContent";
import { altLanguages, ogLocale, EN_OG_IMAGE } from "@/app/lib/i18n";

const s = CAPTURE_STR.en;

export const metadata: Metadata = {
  title: { absolute: s.metaTitleAbsolute },
  description: s.metaDescription,
  alternates: altLanguages("/capture/", "en"),
  openGraph: {
    images: EN_OG_IMAGE,
    title: s.ogTitle,
    description: s.ogDescription,
    url: "https://dynameet.ai/en/capture/",
    type: "website",
    locale: ogLocale("en"),
  },
};

const breadcrumb = captureBreadcrumb("en");
const faqSchema = captureFaqSchema("en");

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CaptureContent lang="en" />
    </>
  );
}
