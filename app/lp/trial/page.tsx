import type { Metadata } from 'next'
import HomePageClient from '@/app/components/HomePageClient'
import { getAllCaseStudies } from '@/app/lib/case-studies'

export const metadata: Metadata = {
  title: '14日間無料トライアル｜Meeton ai',
  description:
    'Meeton aiを14日間無料でお試しください。AI SDRがウェブサイト訪問者を商談に変換します。クレジットカード不要。',
  robots: { index: true, follow: true },
}

export const revalidate = 3600

export default async function TrialLP() {
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
  return (
    <HomePageClient
      caseStudies={featured}
      mode="lp"
      lpVariant="trial"
      lpHeadline="AI SDRの効果を、14日間無料で体感"
      lpSubheadline="クレジットカード不要・5分でセットアップ。Webサイト訪問者を24時間自動で商談に変えます。"
    />
  )
}
