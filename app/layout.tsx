import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Noto_Sans_JP, JetBrains_Mono } from 'next/font/google'
import GoogleAnalytics from './components/GoogleAnalytics'
import JsonLd from './components/JsonLd'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-noto',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Meeton AI｜ウェブサイトから商談を自動創出するAIセールスプラットフォーム',
    template: '%s｜Meeton AI',
  },
  description: 'Meeton AIは、ウェブサイト訪問者をAIチャット・インテントスコアリング・自動スケジューリングで商談に変えるB2B SaaSプラットフォームです。',
  metadataBase: new URL('https://dynameet.ai'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'Meeton AI',
    url: 'https://dynameet.ai',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@meetonai',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [{ name: 'DynaMeet Inc.' }],
  creator: 'DynaMeet Inc.',
  publisher: 'DynaMeet Inc.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`${plusJakarta.variable} ${notoSansJP.variable} ${jetbrainsMono.variable}`}>
      <body>
        <GoogleAnalytics />
        <JsonLd type="organization" />
        <JsonLd type="website" />
        {children}
      </body>
    </html>
  )
}
