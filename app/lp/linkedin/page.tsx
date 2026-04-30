import type { Metadata } from 'next'
import HomePageClient from '@/app/components/HomePageClient'

export const metadata: Metadata = {
  title: '営業チームの商談数を3倍にする方法｜Meeton ai',
  description:
    '人材採用なし・ツール乱立なし。Meeton aiが見込み客の検知から商談設定までを自動で完結。導入初週から成果が出るAI SDRプラットフォーム。',
  robots: { index: false, follow: false },
  openGraph: {
    title: '営業チームの商談数を3倍にする方法｜Meeton ai',
    description:
      '導入初週から6件の商談を創出。AIが営業組織の生産性を根本から変えるMeeton aiの実力。',
    url: 'https://dynameet.ai/lp/linkedin/',
  },
}

export default function LinkedInLPPage() {
  return (
    <HomePageClient
      mode="lp"
      lpVariant="linkedin"
      lpHeadline="商談数+40%を達成した、AI SDR 運用の型"
      lpSubheadline="導入初週から商談を創出した実例と、AI SDRを「使いこなす」ためのKPI設計・運用設計を解説。"
    />
  )
}
