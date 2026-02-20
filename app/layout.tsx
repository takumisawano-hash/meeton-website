import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Noto_Sans_JP, JetBrains_Mono } from 'next/font/google'
import GoogleAnalytics from './components/GoogleAnalytics'

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
  title: 'Meeton AI｜ウェブサイトから商談を自動創出するAIセールスプラットフォーム',
  description: 'Meeton AIは、ウェブサイト訪問者をAIチャット・インテントスコアリング・自動スケジューリングで商談に変えるB2B SaaSプラットフォームです。',
  metadataBase: new URL('https://dynameet.ai'),
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'Meeton AI',
  },
  twitter: {
    card: 'summary_large_image',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
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
        {children}
      </body>
    </html>
  )
}
