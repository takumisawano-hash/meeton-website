import type { Metadata } from 'next'
import { getAllCaseStudies } from '@/app/lib/case-studies'
import MarkezineDayClient from './MarkezineDayClient'

export const metadata: Metadata = {
  title: 'MarkeZine Day 2026 視聴者特典｜AI SDR 30分相談・スライドDL・45日無料トライアル',
  description:
    'MarkeZine Day 2026 Online「AI SDRが変えるBtoB営業の新常識」のご視聴特典ページ。30分 AI SDR 戦略相談・登壇スライドDL・45日間無料トライアル(通常14日)をご用意しています。',
  alternates: { canonical: '/event/markezine-day-2026/' },
  openGraph: {
    title: 'MarkeZine Day 2026 視聴者特典',
    description: 'AI SDR 30分相談・スライドDL・45日間無料トライアル',
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
