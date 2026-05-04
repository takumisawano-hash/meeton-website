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
  // Hero copy + badge + CTA inherit from HomePageClient defaults so
  // ad → LP → site message is identical end-to-end (avoids confusing
  // mismatches between Google Ads creative and the homepage that the
  // visitor will navigate to next). Past Google Ads attribution showed
  // 36 clicks → 0 CV with the divergent copy version.
  return <HomePageClient mode="lp" lpVariant="google" />
}
