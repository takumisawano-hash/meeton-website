import type { Metadata } from "next";
import { altLanguages } from '@/app/lib/i18n'
import CaptureContent, { CAPTURE_STR, captureBreadcrumb, captureFaqSchema } from "@/app/components/v2/CaptureContent";

// Stage page for ①掴む — Chat (会話で掴む) + Ads (広告で逃さない)
// into ONE job-led page. Product names appear small as the means; the JOB is
// the headline. /chat and /library stay as SEO landing pages, linked from here.

const s = CAPTURE_STR.ja;

export const metadata: Metadata = {
  title: { absolute: s.metaTitleAbsolute },
  description: s.metaDescription,
  alternates: altLanguages("/capture/", 'ja'),
  openGraph: {
    title: s.ogTitle,
    description: s.ogDescription,
    url: "https://dynameet.ai/capture/",
    type: "website",
  },
};

const breadcrumb = captureBreadcrumb("ja");
const faqSchema = captureFaqSchema("ja");

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CaptureContent lang="ja" />
    </>
  );
}
