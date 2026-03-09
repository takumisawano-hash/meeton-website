import type { Metadata } from 'next'
import TalentClient from './TalentClient'

export const metadata: Metadata = {
  title: 'Meeton Talent｜AI採用マッチングプラットフォーム',
  description: 'Meeton TalentはAIを活用した採用マッチングプラットフォーム。企業と人材の最適なマッチングを実現します。',
  alternates: {
    canonical: '/talent/',
  },
  openGraph: {
    title: 'Meeton Talent｜AI採用マッチングプラットフォーム',
    description: 'Meeton TalentはAIを活用した採用マッチングプラットフォーム。',
    url: 'https://dynameet.ai/talent/',
    siteName: 'Meeton ai',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meeton Talent｜AI採用マッチングプラットフォーム',
    description: 'Meeton TalentはAIを活用した採用マッチングプラットフォーム。',
  },
}

export default function Page() {
  return <TalentClient />
}
