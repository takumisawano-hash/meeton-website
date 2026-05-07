import type { Metadata } from 'next'
import ContactPageClient from '@/app/components/ContactPageClient'

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: 'Meeton aiへのお問い合わせはこちらから。製品に関するご質問、デモのご依頼、導入のご相談など、お気軽にお問い合わせください。',
  alternates: {
    canonical: '/contact/',
    languages: {
      'ja-JP': '/contact/',
    },
  },
  openGraph: {
    title: 'お問い合わせ',
    description: '製品に関するご質問、デモのご依頼、導入のご相談など、お気軽にお問い合わせください。',
    url: 'https://dynameet.ai/contact/',
    type: 'website',
    siteName: 'Meeton ai',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'お問い合わせ',
    description: '製品に関するご質問、デモのご依頼、導入のご相談など、お気軽にお問い合わせください。',
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
