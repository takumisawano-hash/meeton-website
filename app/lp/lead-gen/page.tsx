import type { Metadata } from 'next'
import HomePageClient from '@/app/components/HomePageClient'

export const metadata: Metadata = {
  title: 'リード獲得自動化AI｜BtoBリードを24時間獲得｜Meeton ai',
  description:
    'BtoBリード獲得を完全自動化。Webサイト訪問者からのリード獲得をAIが24時間代行。マーケティングオートメーションの次世代型。14日間無料。',
  robots: { index: false, follow: false },
}

export default function LeadGenLP() {
  return (
    <HomePageClient
      mode="lp"
      lpVariant="lead-gen"
      lpHeadline="BtoBリードを、24時間自動獲得"
      lpSubheadline="Webサイト訪問者をAIがリアルタイム検知。チャット・メール・資料提案で休まずリードを生み続けます。"
    />
  )
}
