import type { Metadata } from 'next'
import HomePageClient from '@/app/components/HomePageClient'
import { getAllCaseStudies } from '@/app/lib/case-studies'

export const metadata: Metadata = {
  title: '商談自動化AI｜アポ獲得を完全自動化｜Meeton ai',
  description:
    'AIがリード検知からアポ獲得まで完全自動化。商談化率40%以上の実績。アポ獲得AIで商談自動化を14日間無料体験。',
  robots: { index: false, follow: false },
}

export const revalidate = 3600

export default async function MeetingLP() {
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
      lpVariant="meeting"
      lpHeadline="商談化率40%以上を、AIで実現"
      lpSubheadline="リード検知→対話→温度感判定→カレンダー提示まで自動完結。アポ獲得を完全自動化します。"
    />
  )
}
