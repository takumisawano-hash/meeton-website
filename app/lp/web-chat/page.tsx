import type { Metadata } from 'next'
import HomePageClient from '@/app/components/HomePageClient'
import { getAllCaseStudies } from '@/app/lib/case-studies'

export const metadata: Metadata = {
  title: 'BtoB Web 接客 AI｜訪問者を商談機会に変える AI SDR',
  description:
    'BtoB 特化の Web 接客 AI。匿名訪問者対応の単なるチャットボットではなく、識別済みリードを商談予約まで運ぶ AI SDR。会話・ヒアリング・資料提案・日程調整・追客を自動化。',
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
