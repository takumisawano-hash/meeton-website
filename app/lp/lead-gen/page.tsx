import type { Metadata } from 'next'
import HomePageClient from '@/app/components/HomePageClient'
import { getAllCaseStudies } from '@/app/lib/case-studies'

export const metadata: Metadata = {
  title: 'リード獲得自動化AI｜BtoBリードを24時間獲得',
  description:
    'BtoBリード獲得を完全自動化。Webサイト訪問者からのリード獲得をAIが24時間代行。マーケティングオートメーションの次世代型。14日間無料。',
  robots: { index: false, follow: false },
}

export const revalidate = 3600

export default async function LeadGenLP() {
  const cases = await getAllCaseStudies()
  const featured = cases.slice(0, 3).map((c) => ({
    slug: c.slug,
    name: c.company,
    industry: c.industry,
    quote: c.quote || c.description,
    quotePerson: c.quotePerson,
    heroMetric: c.heroMetric,
    heroMetricLabel: c.heroMetricLabel,
    heroImage: c.heroImage,
    stats: c.stats.slice(0, 3),
  }))
  // Hero copy aligned with homepage so ad → LP → site is consistent.
  // Variant tag is preserved for analytics segmentation.
  return (
    <HomePageClient
      caseStudies={featured}
      mode="lp"
      lpVariant="lead-gen"
    />
  )
}
