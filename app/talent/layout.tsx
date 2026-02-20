import type { Metadata } from 'next'
import JsonLd from '../components/JsonLd'

export const metadata: Metadata = {
  title: 'Meeton Talent｜採用サイト訪問者を面談に変えるAIリクルーター',
  description: '採用サイトの訪問者にAIが自動で話しかけ、候補者情報を獲得・育成・面談予約まで完全自動化します。',
  alternates: {
    canonical: '/talent/',
  },
  openGraph: {
    title: 'Meeton Talent｜採用サイト訪問者を面談に変えるAIリクルーター',
    description: '採用サイトの訪問者にAIが自動で話しかけ、候補者情報を獲得・育成・面談予約まで完全自動化します。',
    url: 'https://dynameet.ai/talent/',
  },
}

export default function TalentLayout({
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
          { name: 'Meeton Talent', url: 'https://dynameet.ai/talent/' },
        ]}
      />
      {children}
    </>
  )
}
