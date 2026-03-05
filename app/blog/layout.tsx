import type { Metadata } from 'next'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'ブログ',
    template: '%s｜Meeton AI ブログ',
  },
  description: 'Meeton AIの最新情報、AI営業に関するノウハウ、業界トレンドをお届けします。',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'Meeton AI',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Nav />
      <main
        style={{
          minHeight: '100vh',
          paddingTop: 'clamp(70px, 12vw, 100px)',
          background: 'linear-gradient(180deg, #f8fafc 0%, #fff 50%)',
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  )
}
