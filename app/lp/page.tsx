import type { Metadata } from 'next'
import HomePageClient from '@/app/components/HomePageClient'

export const metadata: Metadata = {
  title: 'Web と CRM に眠る商談機会を、AI SDR が商談へ変える｜Meeton ai',
  description:
    'Meeton ai は、Web 訪問者・資料 DL リード・再訪問者から、CRM に眠る既存リードまで、AI SDR が会話・ヒアリング・資料提案・日程調整・追客を自動化し、あらゆる接点から商談機会を生み出します。',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Web と CRM に眠る商談機会を、AI SDR が商談へ変える｜Meeton ai',
    description:
      'Web 訪問者から CRM 休眠リードまで、AI SDR が初動対応から商談予約・追客までつなぎます。',
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
