import type { Metadata } from 'next'
import HomePageClient from '@/app/components/HomePageClient'

export const metadata: Metadata = {
  title: '14日間無料トライアル｜Meeton ai',
  description:
    'Meeton aiを14日間無料でお試しください。AI SDRがウェブサイト訪問者を商談に変換します。クレジットカード不要。',
  robots: { index: true, follow: true },
}

export default function TrialLP() {
  return (
    <HomePageClient
      mode="lp"
      lpVariant="trial"
      lpHeadline="AI SDRの効果を、14日間無料で体感"
      lpSubheadline="クレジットカード不要・5分でセットアップ。Webサイト訪問者を24時間自動で商談に変えます。"
    />
  )
}
