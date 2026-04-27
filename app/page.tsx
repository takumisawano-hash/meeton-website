import type { Metadata } from 'next'
import HomePageClient from './components/HomePageClient'
import { getAllCaseStudies } from './lib/case-studies'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Meeton ai｜あらゆる接点から商談を自動創出するAIセールスプラットフォーム',
  description: 'Meeton AIは、見込み客の育成から商談獲得までを自動でこなすAI SDRプラットフォームです。チャット・メール・サンクスページなど複数チャネルで24時間365日、商談を創出し続けます。',
  openGraph: {
    title: 'Meeton ai｜あらゆる接点から商談を自動創出するAIセールスプラットフォーム',
    description: '見込み客の育成から商談獲得までを自動でこなすAI SDRプラットフォーム。24時間365日、商談を創出し続けます。',
    url: 'https://dynameet.ai',
    type: 'website',
  },
  other: { "zoom-domain-verification": "ZOOM_verify_276c56f29d0b4de99f5f218f163582a7" },
}

export default async function Page() {
  const cases = await getAllCaseStudies()
  const featured = cases.slice(0, 3).map((c) => ({
    slug: c.slug,
    name: c.company,
    industry: c.industry,
    quote: c.quote || c.description,
    quotePerson: c.quotePerson,
    heroMetric: c.heroMetric,
    heroMetricLabel: c.heroMetricLabel,
    stats: c.stats.slice(0, 3),
  }))
  return <HomePageClient caseStudies={featured} />
}
