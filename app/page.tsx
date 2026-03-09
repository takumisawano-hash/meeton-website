import type { Metadata } from 'next'
import HomePageClient from './components/HomePageClient'

export const metadata: Metadata = {
  title: 'Meeton ai｜あらゆる接点から商談を自動創出するAIセールスプラットフォーム',
  description: 'Meeton AIは、Webサイト・メール・資料など7つのチャネルにAIを配置し、見込み客の関心が高いうちに商談予約まで自動で完結するB2B SaaSプラットフォームです。',
  openGraph: {
    title: 'Meeton ai｜あらゆる接点から商談を自動創出するAIセールスプラットフォーム',
    description: 'Webサイト・メール・資料など7つのチャネルにAIを配置。見込み客の関心が高いうちに、24時間365日、商談予約まで自動完結。',
    url: 'https://dynameet.ai',
    type: 'website',
  },
}

export default function Page() {
  return <HomePageClient />
}
