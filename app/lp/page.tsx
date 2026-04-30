import type { Metadata } from 'next'
import HomePageClient from '@/app/components/HomePageClient'

export const metadata: Metadata = {
  title: 'Webサイト訪問者を商談に変えるAI｜Meeton ai',
  description:
    'リードの検知から商談予約まで5秒で対応。Meeton aiはWebサイト訪問者を自動で商談に変えるAIセールスプラットフォームです。14日間無料トライアル。',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Webサイト訪問者を商談に変えるAI｜Meeton ai',
    description:
      'リード対応5秒、商談転換率40%以上。AIが商談を自動で獲得する新時代のセールスプラットフォーム。',
    url: 'https://dynameet.ai/lp/',
  },
}

export default function LPPage() {
  return (
    <HomePageClient
      mode="lp"
      lpVariant="google"
      lpHeadline="Webサイト訪問者を、商談に変えるAI"
      lpSubheadline="リード検知から商談予約まで5秒。AIがあらゆる接点で営業し、商談を自動で生み出します。"
    />
  )
}
