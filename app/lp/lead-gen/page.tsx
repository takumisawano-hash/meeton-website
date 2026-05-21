import type { Metadata } from 'next'
import HomePageClient from '@/app/components/HomePageClient'
import { getAllCaseStudies } from '@/app/lib/case-studies'

export const metadata: Metadata = {
  title: 'B2B リード獲得から商談化まで自動化｜AI SDR Platform',
  description:
    'BtoB リード獲得を完全自動化。Webサイト訪問者から CRM 休眠リードまで、AI SDR が会話・ヒアリング・資料提案・商談予約・追客を自動化。マーケが集めたリードを商談機会に変えます。',
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
