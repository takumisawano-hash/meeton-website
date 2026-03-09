import type { Metadata } from 'next'
import HomePageClient from './components/HomePageClient'

export const metadata: Metadata = {
  title: 'Meeton ai｜ウェブサイト訪問者をAIで商談に変えるセールスプラットフォーム',
  description: 'Meeton AIは、ウェブサイト訪問者をAIチャット・インテントスコアリング・自動スケジューリングで商談に変えるB2B SaaSプラットフォームです。導入企業の商談化率3倍を実現。',
  openGraph: {
    title: 'Meeton ai｜ウェブサイト訪問者をAIで商談に変えるセールスプラットフォーム',
    description: 'AIチャット・インテントスコアリング・自動スケジューリングで、ウェブサイト訪問者を24時間365日、商談に変換。',
    url: 'https://dynameet.ai',
    type: 'website',
  },
}

export default function Page() {
  return <HomePageClient />
}
