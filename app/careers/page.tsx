import type { Metadata } from 'next'
import CareersClient from './CareersClient'

export const metadata: Metadata = {
  title: '採用情報',
  description: 'DynaMeetでは、AIで営業のあたりまえを変える仲間を募集しています。エンジニア、セールス、マーケティングなど幅広いポジションで積極採用中。',
  alternates: {
    canonical: '/careers/',
  },
  openGraph: {
    title: '採用情報',
    description: 'DynaMeetでは、AIで営業のあたりまえを変える仲間を募集しています。',
    url: 'https://dynameet.ai/careers/',
    siteName: 'Meeton ai',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '採用情報｜Meeton ai',
    description: 'DynaMeetでは、AIで営業のあたりまえを変える仲間を募集しています。',
  },
}

export default function Page() {
  return <CareersClient />
}
