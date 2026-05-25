import type { Metadata } from 'next'
import { getAllCaseStudies } from '@/app/lib/case-studies'
import MarkezineDayClient from './MarkezineDayClient'

export const metadata: Metadata = {
  title: 'MarkeZine Day 2026 登壇内容まとめ｜BtoBサイトの商談化ロス診断｜Meeton ai',
  description:
    'MarkeZine Day 2026 Online「AI SDRが変えるBtoB営業の新常識」の登壇内容まとめページ。録画共有がない形式のため、当日の要点・登壇スライド・自社で確認すべき商談化ロスのポイントをまとめました。',
  alternates: { canonical: '/event/markezine-day-2026/' },
  openGraph: {
    title: 'MarkeZine Day 2026 登壇内容まとめ',
    description: '録画なし形式のため、当日の要点・登壇スライド・商談化ロス診断をまとめました',
    url: 'https://dynameet.ai/event/markezine-day-2026/',
    siteName: 'Meeton ai',
    locale: 'ja_JP',
    type: 'website',
  },
  robots: { index: false, follow: false },
}

export const revalidate = 3600

export default async function MarkezineDayPage() {
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

  return <MarkezineDayClient cases={featured} />
}
