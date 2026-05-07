import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Noto_Sans_JP, JetBrains_Mono } from 'next/font/google'
import GoogleAnalytics from './components/GoogleAnalytics'
import JsonLd from './components/JsonLd'
import DocoDocoTracker from './components/DocoDocoTracker'
import HubSpotTracker from './components/HubSpotTracker'
import MeetonScript from './components/MeetonScript'
import DynamicLpController from './components/DynamicLpController'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-noto',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Meeton ai｜AIで営業と採用を革新するDynaMeetのプロダクト',
    template: '%s｜Meeton ai',
  },
  description: 'DynaMeetが提供するAIプラットフォーム。Meeton aiでウェブサイト訪問者を商談に変換、Meeton Talentで採用マッチングを革新。B2B SaaS企業の成長を加速します。',
  metadataBase: new URL('https://dynameet.ai'),
  // No site-wide canonical: setting one in the root layout makes EVERY
  // page render <link rel=canonical href=/> which collapses every URL
  // (including /lp/, /roi-simulator/, /blog/) into a homepage canonical
  // and confuses Google's URL grouping. Each page that needs an explicit
  // canonical sets it in its own metadata. Pages without an explicit
  // canonical fall back to their request URL, which is what we want.
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'Meeton ai',
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
        <DocoDocoTracker />
        <HubSpotTracker />
        <JsonLd type="organization" />
        <JsonLd type="website" />
        {children}
        <MeetonScript />
        <DynamicLpController />
      </body>
    </html>
  )
}
