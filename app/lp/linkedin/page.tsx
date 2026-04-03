import type { Metadata } from 'next'
import LPClient from '../components/LPClient'

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
  return <LPClient variant="linkedin" />
}
