import type { Metadata } from 'next'
import HomePageClient from '@/app/components/HomePageClient'

export const metadata: Metadata = {
  title: 'Webサイトに AI SDR を配属する AI SDR Platform｜Meeton ai',
  description:
    '訪問・問い合わせ・資料 DL・再訪問の瞬間に AI SDR が即時対応。会話・ヒアリング・資料提案・日程調整・追客までを自動化し、Web サイト経由のリードを商談につなげます。',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Webサイトに AI SDR を配属する AI SDR Platform｜Meeton ai',
    description:
      'マーケ・IS が獲得したリードを、AI SDR が初動対応から商談予約・追客までつなぎます。Web サイトを商談を生み出す AI 営業チャネルへ。',
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
