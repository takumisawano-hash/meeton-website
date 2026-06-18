import type { Metadata } from 'next'
import Security2PageClient from '@/app/components/Security2PageClient'

export const metadata: Metadata = {
  title: '情報セキュリティ対策について',
  description:
    'DynaMeet は ISO/IEC 27001（情報セキュリティ）と ISO/IEC 27017（クラウドセキュリティ）の第三者認証のもと、プロダクト対策と組織的・人的対策の両輪で情報セキュリティを徹底しています。',
  alternates: {
    canonical: '/security2/',
    languages: {
      'ja-JP': '/security2/',
    },
  },
  openGraph: {
    title: '情報セキュリティ対策について｜Meeton AI',
    description:
      'ISO/IEC 27001・27017 認証のもと、プロダクト対策と組織的・人的対策の両輪で情報セキュリティを徹底しています。',
    url: 'https://dynameet.ai/security2/',
    type: 'website',
    siteName: 'Meeton AI',
    locale: 'ja_JP',
  },
}

export default function Security2Page() {
  return <Security2PageClient />
}
