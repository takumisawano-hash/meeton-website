import type { Metadata } from 'next'
import HomePageClient from '@/app/components/HomePageClient'

export const metadata: Metadata = {
  title: 'インサイドセールス自動化ツール｜営業効率化AI｜Meeton ai',
  description:
    'インサイドセールスをAIで自動化。SDR業務の工数を大幅削減し営業効率化を実現するセールスイネーブルメントツール。営業DXを14日間無料体験。',
  robots: { index: false, follow: false },
}

export default function InsideSalesLP() {
  return (
    <HomePageClient
      mode="lp"
      lpVariant="inside-sales"
      lpHeadline="インサイドセールスを、AIで自動化"
      lpSubheadline="問い合わせ対応の初動を42時間→5秒に。SDR業務をAIが代行し、営業チームは商談に集中できる。"
    />
  )
}
