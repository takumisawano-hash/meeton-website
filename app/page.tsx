import type { Metadata } from 'next'
import HomePageClient from './components/HomePageClient'

export const metadata: Metadata = {
  title: 'Meeton ai｜あらゆる接点から商談を自動創出するAIセールスプラットフォーム',
  description: 'Meeton AIは、見込み客の育成から商談獲得までを自動でこなすAI SDRプラットフォームです。チャット・メール・サンクスページなど複数チャネルで24時間365日、商談を創出し続けます。',
  openGraph: {
    title: 'Meeton ai｜あらゆる接点から商談を自動創出するAIセールスプラットフォーム',
    description: '見込み客の育成から商談獲得までを自動でこなすAI SDRプラットフォーム。24時間365日、商談を創出し続けます。',
    url: 'https://dynameet.ai',
    type: 'website',
  },
  other: { "zoom-domain-verification": "ZOOM_verify_276c56f29d0b4de99f5f218f163582a7" },
}

export default function Page() {
  return <HomePageClient />
}
