import type { Metadata } from 'next'
import HomePageClient from '@/app/components/HomePageClient'
import { getAllCaseStudies } from '@/app/lib/case-studies'

export const metadata: Metadata = {
  title: '営業チームの商談数を3倍にする方法',
  description:
    '人材採用なし・ツール乱立なし。Meeton aiが見込み客の検知から商談設定までを自動で完結。導入初週から成果が出るAI SDRプラットフォーム。',
  robots: { index: false, follow: false },
  openGraph: {
    title: '営業チームの商談数を3倍にする方法',
    description:
      '導入初週から6件の商談を創出。AIが営業組織の生産性を根本から変えるMeeton aiの実力。',
    url: 'https://dynameet.ai/lp/linkedin/',
  },
}

export const revalidate = 3600

export default async function LinkedInLPPage() {
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
      lpVariant="linkedin"
      lpHeadline="商談数+40%を達成した、AI SDR 運用の型"
      lpSubheadline="導入初週から商談を創出した実例と、AI SDRを「使いこなす」ためのKPI設計・運用設計を解説。"
    />
  )
}
