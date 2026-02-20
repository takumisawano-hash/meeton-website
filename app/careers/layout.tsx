import type { Metadata } from 'next'
import JsonLd from '../components/JsonLd'

export const metadata: Metadata = {
  title: '採用情報｜DynaMeet - AIで営業のあたりまえを変える',
  description: 'DynaMeetの採用情報です。カスタマーサクセス、営業、エンジニア、デザイナーなど各ポジションで積極採用中。Series A準備中のAIスタートアップで一緒に働きませんか。',
  alternates: {
    canonical: '/careers/',
  },
  openGraph: {
    title: '採用情報｜DynaMeet - AIで営業のあたりまえを変える',
    description: 'DynaMeetの採用情報です。Series A準備中のAIスタートアップで一緒に働きませんか。',
    url: 'https://dynameet.ai/careers/',
  },
}

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbs={[
          { name: 'ホーム', url: 'https://dynameet.ai' },
          { name: '採用情報', url: 'https://dynameet.ai/careers/' },
        ]}
      />
      {children}
    </>
  )
}
