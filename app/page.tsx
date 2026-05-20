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
  description: 'Meeton ai は、Web サイトに AI SDR を配属し、訪問・問い合わせ・資料 DL・再訪問の瞬間に、会話・ヒアリング・資料提案・日程調整・追客までを自動化する AI SDR プラットフォーム。フォームを待つ Web サイトから、商談を生み出す AI 営業チャネルへ。',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Meeton ai｜Web サイトに AI SDR を配属する AI SDR プラットフォーム',
    description: 'フォームを待つ Web サイトから、商談を生み出す AI 営業チャネルへ。訪問・問い合わせ・資料 DL・再訪問の瞬間に、AI SDR が会話・資料提案・日程調整・追客まで自動化します。',
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
      name: 'Meeton ai の 3 つの AI 機能はそれぞれ何をしますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Meeton Live はサイト訪問者と即時に会話して商談予約まで完結する AI チャット (話しかける役割)。Meeton Calendar はコンバート直後の最も関心の高い瞬間に商談予約を提示 (商談を取る役割)。Meeton Email は即時予約しなかったリードに 1:1 の AI が動的に追跡 (追いかける役割)。検討再開時の資料推薦は追加機能 Meeton Library が担います。',
      },
    },
  ],
}

// SoftwareApplication schema — Meeton ai プラットフォーム全体。
//
// 2026-05-13: 以前は `@type: Product` で `offers` に `priceCurrency` のみ
// 設定していたが、GSC が「販売者のリスティング」「商品スニペット」両方で
// 重大エラーを出していた (Product/Offer は `price` 必須)。Meeton ai は
// 公開価格を持たない B2B SaaS なので Product schema は誤適用だった。
// SoftwareApplication なら `price` が任意でも合法、AI 検索向けの
// citation 効果も保たれる。
const homepageProductSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': 'https://dynameet.ai/#product',
  name: 'Meeton ai',
  alternateName: ['Meeton AI', 'ミートンai'],
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'AI SDR / Sales Automation Software',
  operatingSystem: 'Web',
  description:
    '日本のB2B企業向けAI SDRプラットフォーム。ウェブサイト訪問者・メール受信者・既存リードに対しAIが自律的に対話し、商談予約まで完結。Live (AIチャット) / Calendar (AI商談予約) / Email (AIフォロー) の3つのAI機能で構成。検討再開時の資料推薦は追加機能 Meeton Library。',
  brand: {
    '@type': 'Brand',
    name: 'Meeton ai',
  },
  publisher: {
    '@id': 'https://dynameet.ai/#organization',
  },
  url: 'https://dynameet.ai/',
  image: 'https://dynameet.ai/logo-dark.svg',
  additionalProperty: [
    {
      '@type': 'PropertyValue',
      name: '対応言語',
      value: '日本語・英語・中国語・韓国語',
    },
    {
      '@type': 'PropertyValue',
      name: 'CRM連携',
      value: 'HubSpot・Salesforce ネイティブ連携',
    },
    {
      '@type': 'PropertyValue',
      name: '設定時間',
      value: 'JavaScriptタグ設置 約5分、シナリオ設計不要',
    },
    {
      '@type': 'PropertyValue',
      name: '対応市場',
      value: '日本のB2B企業（従業員100〜2000名規模）',
    },
    {
      '@type': 'PropertyValue',
      name: 'モジュール構成',
      value:
        'Meeton Live（AIチャット）/ Meeton Email（AIメール）/ Meeton Calendar（AI商談予約）/ Meeton Library（AIコンテンツ）',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageProductSchema) }}
      />
      <HomePageClient caseStudies={featured} />
    </>
  )
}
