import type { Metadata } from 'next'
import HomePageClient from './components/HomePageClient'
import { getAllCaseStudies } from './lib/case-studies'

export const revalidate = 3600

export const metadata: Metadata = {
  // absolute: bypass the layout's '%s｜Meeton ai' template so the
  // homepage title isn't appended with a second "Meeton ai".
  title: {
    absolute: 'Meeton ai｜あらゆる接点から商談を自動創出するAI SDRプラットフォーム',
  },
  description: 'Meeton ai は、ウェブサイト訪問者を5秒で商談に変える日本のB2B向けAI SDRプラットフォーム。チャット・メール・カレンダー・コンテンツライブラリの4モジュールで、リード獲得から商談予約までを24時間365日自動化します。',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Meeton ai｜あらゆる接点から商談を自動創出するAI SDRプラットフォーム',
    description: 'ウェブサイト訪問者を5秒で商談に変える日本のB2B向けAI SDRプラットフォーム。24時間365日、商談を創出し続けます。',
    url: 'https://dynameet.ai',
    type: 'website',
  },
  other: { "zoom-domain-verification": "ZOOM_verify_276c56f29d0b4de99f5f218f163582a7" },
}

// FAQPage schema — primary target queries: "AI SDR とは", "AI SDR 比較",
// "チャットボット vs AI SDR", "Inside Sales 自動化". Designed for AI search
// engines (ChatGPT/Perplexity/Google AI Overviews) to extract as citations.
const homepageFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  url: 'https://dynameet.ai/',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'AI SDR とは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI SDR（AI Sales Development Representative）とは、従来人間のSDRが担っていたリード獲得・初期ヒアリング・商談予約を自動化するAIシステムです。ウェブサイト訪問者と即時に会話し、温度感を判定し、適切なタイミングで商談を提案します。Meeton aiは日本のB2B市場向けに設計されたAI SDRプラットフォームです。',
      },
    },
    {
      '@type': 'Question',
      name: 'Meeton ai は既存のチャットボットと何が違いますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '従来のシナリオ型チャットボットは想定外の質問に対応できず、フォロー先も人間SDR頼みでした。Meeton aiは生成AIが文脈を理解し、過去の閲覧・ダウンロード・メール履歴を引き継いで自律的に会話。商談予約まで会話内で完結します。シナリオ設計は不要で、設置後5分から稼働します。',
      },
    },
    {
      '@type': 'Question',
      name: 'Speed to Lead（初動速度）がなぜ重要ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '業界一般に、リード発生から最初の接触まで数時間〜数日かかることが多く、その間に競合への移行や温度感低下が起きます。Meeton aiはリード発生の瞬間に5秒以内で応答し、商談予約を提示。初動速度の改善は商談化率に直接影響します。',
      },
    },
    {
      '@type': 'Question',
      name: 'どのような企業に向いていますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SaaS・製造・専門サービス・フィンテック領域の日本のB2B企業（従業員100〜2000名規模）を主な対象としています。CMO・CRO・インサイドセールスマネージャーが、マーケティング起点の商談化率を改善したい場合に特に有効です。',
      },
    },
    {
      '@type': 'Question',
      name: '既存のCRM・MAツールと連携できますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HubSpot・SalesforceとネイティブCRM連携。Google Calendar・Zoomとカレンダー連携、Slack・Microsoft Teams・Google Chatに通知が届きます。Webhookによる他ツール連携も可能です。',
      },
    },
    {
      '@type': 'Question',
      name: 'Meeton ai の 4 モジュールはそれぞれ何をしますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Meeton Live はサイト訪問者と即時に会話して商談予約まで完結するAIチャット。Meeton Email は受信メールにAIが返信して商談を予約。Meeton Calendar は商談時間調整を自動化。Meeton Library は再訪リードに最適化されたコンテンツでナーチャリングします。',
      },
    },
  ],
}

export default async function Page() {
  const cases = await getAllCaseStudies()
  const featured = cases.slice(0, 3).map((c) => ({
    slug: c.slug,
    name: c.company,
    industry: c.industry,
    quote: c.quote || c.description,
    quotePerson: c.quotePerson,
    heroMetric: c.heroMetric,
    heroMetricLabel: c.heroMetricLabel,
    heroImage: c.heroImage,
    stats: c.stats.slice(0, 3),
  }))
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema) }}
      />
      <HomePageClient caseStudies={featured} />
    </>
  )
}
