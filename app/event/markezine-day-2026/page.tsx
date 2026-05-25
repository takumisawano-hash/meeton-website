import type { Metadata } from 'next'
import { getAllCaseStudies } from '@/app/lib/case-studies'
import MarkezineDayClient from './MarkezineDayClient'

export const metadata: Metadata = {
  title: 'AI SDR が変える BtoB 営業の新常識｜MarkeZine Day 2026 登壇内容まとめ｜Meeton ai',
  description:
    'MarkeZine Day 2026 Online「AI SDR が変える BtoB 営業の新常識 ─ 商談獲得を自動化する実践アプローチ」の登壇内容まとめページ。リードを商談に変える 3 つの壁、AI SDR の定義、Meeton ai の 4 モジュールと事例まで、当日の要点と登壇スライドをまとめています。',
  alternates: { canonical: '/event/markezine-day-2026/' },
  openGraph: {
    title: 'AI SDR が変える BtoB 営業の新常識｜MarkeZine Day 2026 登壇内容まとめ',
    description: '商談獲得を自動化する実践アプローチ ─ 録画なし形式のため、当日の要点と登壇スライドをまとめました',
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
