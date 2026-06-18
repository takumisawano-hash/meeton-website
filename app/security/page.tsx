import type { Metadata } from 'next'
import SecurityPageClient from '@/app/components/SecurityPageClient'

export const metadata: Metadata = {
  title: '情報セキュリティ対策について',
  description: 'DynaMeet は ISO/IEC 27001（情報セキュリティ）と ISO/IEC 27017（クラウドセキュリティ）の第三者認証のもと、プロダクト対策と組織的・人的対策の両輪で情報セキュリティを徹底しています。',
  alternates: {
    canonical: '/security/',
    languages: {
      'ja-JP': '/security/',
    },
  },
  openGraph: {
    title: '情報セキュリティ対策について｜Meeton AI',
    description: 'ISO/IEC 27001・27017 の第三者認証のもと、プロダクト対策と組織的・人的対策の両輪で情報セキュリティを徹底しています。',
    url: 'https://dynameet.ai/security/',
    type: 'website',
    siteName: 'Meeton AI',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: '情報セキュリティ対策について｜Meeton AI',
    description: 'ISO/IEC 27001・27017 の第三者認証のもと、プロダクト対策と組織的・人的対策の両輪で情報セキュリティを徹底しています。',
  },
}

export default function SecurityPage() {
  return <SecurityPageClient />
}