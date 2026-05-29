import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono, Inter } from 'next/font/google'
import GoogleAnalytics from './components/GoogleAnalytics'
import JsonLd from './components/JsonLd'
import DocoDocoTracker from './components/DocoDocoTracker'
import HubSpotTracker from './components/HubSpotTracker'
import MeetonScript from './components/MeetonScript'
import DynamicLpController from './components/DynamicLpController'
import AttributionBootstrap from './components/AttributionBootstrap'
import AdsDebugPanel from './components/AdsDebugPanel'

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

// Inter — premium B2B SaaS body/display font (Linear, Stripe, etc.).
// Variable axis so 400-800 weight all served from one woff2 file.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  axes: ['opsz'],
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
    default: 'Meeton ai｜Webサイトを商談に変える AI SDR Platform',
    template: '%s｜Meeton ai',
  },
  description: 'Meeton ai は、会話・資料提案・予約・追客を自律でこなす AI SDR Platform。Webサイトに配属するだけで、問い合わせを待つサイトが商談を生み出す営業チャネルに変わります。無料で開始（クレカ不要）。',
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
  // Index only on the production deployment. Preview deploys (the v2
  // rebuild branch) and local dev return VERCEL_ENV !== 'production',
  // so they emit <meta robots=noindex,nofollow> — Google never indexes
  // the half-migrated branch, avoiding duplicate-content vs the live
  // site during the URL restructure (§ migration plan).
  robots:
    process.env.VERCEL_ENV === 'production'
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        }
      : { index: false, follow: false, nocache: true },
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
      className={`${plusJakarta.variable} ${inter.variable} ${jetbrainsMono.variable}`}
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
        {/* Global CSS variables — design tokens accessible site-wide
            (not just on home page). Other pages (/ai-sdr/, /compare/*,
            etc.) rely on --fb / --fd / --fm / --cta tokens defined here. */}
        <style dangerouslySetInnerHTML={{ __html: `
:root{
  /* ===== Meeton ai v2 design tokens (2026-05-29 re-skin) =====
     §3.8: navy = frame (header/hero/bands/footer/CTA),
     white = canvas (content/cards/tables/long-form),
     green = the ONLY accent. purple removed.
     Brand hex extracted from logo: navy #0F1128, green #07CB79. */

  /* Canvas — white side, where reading & deciding happens */
  --bg:#ffffff;--surface:#F6F8FB;--surface2:#EDF1F8;
  --border:#E4E8F2;--border2:#D2D8E6;
  --text:#3F4763;--heading:#0F1128;--sub:#6B7390;

  /* Navy — frame side, authority/trust surfaces */
  --navy:#0F1128;--navy-2:#171A36;--navy-3:#22264B;--navy-deep:#0A0B1E;
  --on-navy:#FFFFFF;--on-navy-sub:#AEB4D6;--on-navy-border:rgba(255,255,255,.12);
  --on-navy-surface:rgba(255,255,255,.05);

  /* Green — the single accent: action / links / success / energy */
  --cta:#07CB79;--cta-hover:#0BD986;--cta-press:#06B86D;
  --cta-ink:#067A48;          /* darker green for small text/links on white (WCAG) */
  --cta-light:#E7FBF1;--cta-wash:#F2FCF7;
  --cta-glow:rgba(7,203,121,.28);

  /* accent kept for back-compat, repointed to navy (purple removed) */
  --accent:#0F1128;--accent-light:#EDF1F8;--accent-glow:rgba(15,17,40,.12);

  /* legacy product hues — DEPRECATED, only on pages pending rebuild/301.
     do not use in v2 work; differentiate products via navy/green + icon. */
  --blue:#3b6ff5;--blue-light:#eaf0fe;--cyan:#0891b2;--pink:#d03ea1;
  --red:#e0475b;              /* retained: hot-lead / urgency indicators */
  --fd:'Inter',var(--font-inter),'Plus Jakarta Sans',var(--font-jakarta),${"'" + NOTO_SYSTEM_STACK.split(',')[0].trim() + "'"},${NOTO_SYSTEM_STACK},sans-serif;
  --fb:'Inter',var(--font-inter),${NOTO_SYSTEM_STACK},sans-serif;
  --fm:'JetBrains Mono',var(--font-mono),monospace;
}
html{font-feature-settings:'cv02','cv03','cv04','cv11','calt';font-variant-ligatures:contextual;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}
body{font-family:var(--fb);color:var(--text);background:var(--bg);line-height:1.65}
` }} />
      </head>
      <body>
        <AttributionBootstrap />
        <AdsDebugPanel />
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
