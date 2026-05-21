import type { Metadata } from 'next'
import HomePageClient from '@/app/components/HomePageClient'
import { getAllCaseStudies } from '@/app/lib/case-studies'

export const metadata: Metadata = {
  title: 'インサイドセールス自動化｜AI SDR でリード対応から商談化まで',
  description:
    'インサイドセールスの初動対応・課題ヒアリング・追客を AI SDR が自動化。SDR 業務の工数を削減しつつ、リードあたりの商談化率を構造的に改善します。',
  robots: { index: false, follow: false },
}

export const revalidate = 3600

export default async function InsideSalesLP() {
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
      lpVariant="inside-sales"
    />
  )
}
