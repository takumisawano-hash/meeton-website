import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import GoogleAnalytics from './components/GoogleAnalytics'
import JsonLd from './components/JsonLd'
import DocoDocoTracker from './components/DocoDocoTracker'
import HubSpotTracker from './components/HubSpotTracker'
import MeetonScript from './components/MeetonScript'
import DynamicLpController from './components/DynamicLpController'

// Font budget review (2026-05-08):
// - Plus_Jakarta_Sans: only weights actually used (700/800)
// - Noto_Sans_JP REMOVED from next/font — it was generating a 188KB
//   render-blocking CSS file (mostly @font-face unicode-range tables
//   for every Japanese subset). PageSpeed showed this single file
//   accounted for ~3.2s of FCP delay on Slow 4G. Replaced with a
//   system-font stack via the --font-noto CSS variable; on macOS/iOS
//   visitors get Hiragino Kaku Gothic ProN (visually near-identical
//   to Noto Sans JP), on Android they get the bundled Noto CJK JP,
//   on Windows Yu Gothic UI. No glyph differences for our copy.
// - JetBrains_Mono: only 700 (used in eyebrows).
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-mono',
  display: 'swap',
})

// System Japanese font stack — substituted for the removed
// Noto_Sans_JP next/font import. Exposed as --font-noto so all
// existing `var(--font-noto)` references keep working.
const NOTO_SYSTEM_STACK =
  "'Hiragino Kaku Gothic ProN','Hiragino Sans','Noto Sans CJK JP','Yu Gothic UI','Yu Gothic',Meiryo,sans-serif"

export const metadata: Metadata = {
  title: {
    default: 'Meeton ai｜ウェブサイトのリードを商談に変える AI SDR Platform',
    template: '%s｜Meeton ai',
  },
  description: 'ウェブサイトで獲得したリードを、5秒で商談化。即時予約しなかったリードもMeeton Emailが1:1で諦めず追跡。MAやCRMでは届かない「コンバージョン直前の最後の100m」をAI SDRが自動化。',
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
    // Bing Webmaster Tools verification: required so Bing crawls and
    // indexes us — and ChatGPT (which sources from Bing) starts citing
    // dynameet.ai. Set NEXT_PUBLIC_BING_SITE_VERIFICATION in Vercel
    // env vars to the verification code from
    // https://www.bing.com/webmasters > Add Site > Meta tag.
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
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
    <html
      lang="ja"
      className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}
      style={{ ['--font-noto' as string]: NOTO_SYSTEM_STACK }}
    >
      <head>
        {/* HubSpot Forms embed — preconnect & DNS-prefetch shave 100-300ms
            off form first-paint, since the iframe contacts multiple HS
            subdomains during boot. */}
        <link rel="preconnect" href="https://js-na2.hsforms.net" crossOrigin="" />
        <link rel="preconnect" href="https://forms.hsforms.com" crossOrigin="" />
        <link rel="preconnect" href="https://forms-na2.hsforms.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://js-na2.hsforms.net" />
        <link rel="dns-prefetch" href="https://forms.hsforms.com" />
        <link rel="dns-prefetch" href="https://forms-na2.hsforms.com" />
      </head>
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
