import type { Metadata } from "next";
import PlaybookLP, { playbookSchema } from "@/app/components/v2/PlaybookLP";
import { getMoment } from "@/app/lib/playbook-data";
import { altLanguages, ogLocale } from "@/app/lib/i18n";

// /en/use-cases/nurture/ — English twin of /use-cases/nurture/.
// Faithful translation of the JA moment LP; renders through PlaybookLP.

export const revalidate = 3600;

const SLUG = "nurture";
const data = getMoment(SLUG)!;
const en = data.en!;

export const metadata: Metadata = {
  title: { absolute: en.metaTitle },
  description: en.metaDescription,
  alternates: altLanguages(`/use-cases/${SLUG}/`, "en"),
  openGraph: { title: en.metaTitle, description: en.metaDescription, url: `https://dynameet.ai/en/use-cases/${SLUG}/`, type: "website", locale: ogLocale("en") },
};

export default function NurtureUseCasePageEn() {
  const { faq, breadcrumb } = playbookSchema(data, `/en/use-cases/${SLUG}/`, "en");
  return (
    <>
      {faq && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <PlaybookLP data={data} lang="en" />
    </>
  );
}
