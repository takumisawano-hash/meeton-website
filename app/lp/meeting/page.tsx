import type { Metadata } from 'next'
import LPClient from '../components/LPClient'

export const metadata: Metadata = {
  title: '商談自動化AI｜アポ獲得を完全自動化｜Meeton ai',
  description: 'AIがリード検知からアポ獲得まで完全自動化。商談化率40%以上の実績。アポ獲得AIで商談自動化を14日間無料体験。',
  robots: { index: false, follow: false },
}

export default function MeetingLP() {
  return <LPClient variant="meeting" />
}
