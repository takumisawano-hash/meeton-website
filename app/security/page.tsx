import type { Metadata } from 'next'
import SecurityPageClient from '@/app/components/SecurityPageClient'

export const metadata: Metadata = {
  title: '情報セキュリティ対策について',
  description: 'Meeton AIの情報セキュリティ体制、ISMS（ISO/IEC 27001・27017）認証取得、インフラ設計、暗号化方針をまとめた情報セキュリティページです。',
  alternates: {
    canonical: '/security/',
    languages: {
      'ja-JP': '/security/',
    },
  },
  openGraph: {
    title: '情報セキュリティ対策について｜Meeton AI',
    description: 'Meeton AIの情報セキュリティ体制、ISMS（ISO/IEC 27001・27017）認証取得、インフラ設計、暗号化方針をご紹介します。',
    url: 'https://dynameet.ai/security/',
    type: 'website',
    siteName: 'Meeton AI',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: '情報セキュリティ対策について｜Meeton AI',
    description: 'Meeton AIの情報セキュリティ体制、ISMS（ISO/IEC 27001・27017）認証取得、インフラ設計、暗号化方針をご紹介します。',
  },
}

export default function SecurityPage() {
  return <SecurityPageClient />
}