import type { Metadata } from 'next'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import RoiSimulatorClient from './RoiSimulatorClient'

export const metadata: Metadata = {
  title: '貴社向けROI試算',
  description:
    '貴社のWebサイトURLを入力するだけで、 月間訪問数・有能訪問者・自動獲得商談数・営業工数削減を即座に試算。 結果はPDFで持ち帰れます。',
  alternates: { canonical: '/roi-simulator/' },
  openGraph: {
    title: '貴社向けROI試算',
    description: 'WebサイトURLを入れるだけで貴社向けROIを30秒で試算',
    url: 'https://dynameet.ai/roi-simulator/',
    siteName: 'Meeton ai',
    locale: 'ja_JP',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RoiSimulatorPage() {
  return (
    <div style={{ background: '#fafaf7', color: '#0a0e0c', minHeight: '100vh' }}>
      <Nav variant="light" />
      <RoiSimulatorClient />
      <Footer />
    </div>
  )
}
