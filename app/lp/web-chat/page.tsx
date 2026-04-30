import type { Metadata } from 'next'
import HomePageClient from '@/app/components/HomePageClient'
import { getAllCaseStudies } from '@/app/lib/case-studies'

export const metadata: Metadata = {
  title: 'BtoB向けWeb接客ツール｜AIチャットボットで商談獲得｜Meeton ai',
  description:
    'BtoB特化のWeb接客ツール。AIチャットボットがサイト訪問者に自動対応し、商談予約まで完結。従来のチャットボットを超えるAI Web接客を14日間無料体験。',
  robots: { index: false, follow: false },
}

export const revalidate = 3600

export default async function WebChatLP() {
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
      lpVariant="web-chat"
      lpHeadline="AIチャットボットで、商談まで完結"
      lpSubheadline="シナリオ型を超える、文脈理解する AI 接客。資料提案・カレンダー提示までを会話で完結します。"
    />
  )
}
