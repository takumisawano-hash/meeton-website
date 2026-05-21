import type { Metadata } from 'next'
import HomePageClient from '@/app/components/HomePageClient'
import { getAllCaseStudies } from '@/app/lib/case-studies'

export const metadata: Metadata = {
  title: '14日間無料トライアル｜AI SDR で Web + CRM の商談機会を可視化',
  description:
    'Meeton ai を 14 日間無料でお試しください。Web 訪問者・資料 DL リード・再訪問者から CRM に眠る既存リードまで、AI SDR が商談機会を生み出す Platform。クレジットカード不要。',
  robots: { index: false, follow: false },
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
      lpHeadline="AI SDR Platform の効果を、14 日間無料で体感"
      lpSubheadline="Web 訪問者から CRM 休眠リードまで、AI SDR が会話・資料提案・日程調整・追客を自動化。クレジットカード不要・5 分でセットアップ。"
    />
  )
}
