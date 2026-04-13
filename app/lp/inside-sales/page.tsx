import type { Metadata } from 'next'
import LPClient from '../components/LPClient'

export const metadata: Metadata = {
  title: 'インサイドセールス自動化ツール｜営業効率化AI｜Meeton ai',
  description: 'インサイドセールスをAIで自動化。SDR業務の工数を大幅削減し営業効率化を実現するセールスイネーブルメントツール。営業DXを14日間無料体験。',
  robots: { index: false, follow: false },
}

export default function InsideSalesLP() {
  return <LPClient variant="inside-sales" />
}
