import type { Metadata } from 'next'
import LPClient from '../components/LPClient'

export const metadata: Metadata = {
  title: 'BtoB向けWeb接客ツール｜AIチャットボットで商談獲得｜Meeton ai',
  description: 'BtoB特化のWeb接客ツール。AIチャットボットがサイト訪問者に自動対応し、商談予約まで完結。従来のチャットボットを超えるAI Web接客を14日間無料体験。',
  robots: { index: false, follow: false },
}

export default function WebChatLP() {
  return <LPClient variant="web-chat" />
}
