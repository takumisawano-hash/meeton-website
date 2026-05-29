import type { Metadata } from 'next'
import Home from './components/v2/Home'
import { getAllCaseStudies } from './lib/case-studies'
import { FEATURED_CASES } from './lib/featured-cases'

export const revalidate = 3600

export const metadata: Metadata = {
  title: {
    absolute: 'Meeton ai｜Webサイトを商談に変える AI SDR Platform',
  },
  description:
    'Meeton ai は、Webサイトに配属する AI SDR Platform。問い合わせ前の潜在層に会話で踏み込み、資料提案・予約・追客まで自律でこなして、獲得から商談化まであらゆる瞬間を商談に変えます。無料で開始（クレジットカード不要）。',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Meeton ai｜Webサイトを商談に変える AI SDR Platform',
    description:
      '訪問者は去り、リードは商談にならない。「待つ」Webサイトを、商談を生み出すAI営業チャネルへ。潜在層の獲得から追客までを自律でこなす AI SDR。無料で開始。',
    url: 'https://dynameet.ai',
    type: 'website',
  },
  other: { 'zoom-domain-verification': 'ZOOM_verify_276c56f29d0b4de99f5f218f163582a7' },
}

// FAQPage schema — AEO target queries. Self-contained answers so
// ChatGPT/Perplexity/AI Overviews can extract as citations (§4.12).
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
        text: 'AI SDR（AI Sales Development Representative）とは、従来人間のSDRが担っていた初期接触・ヒアリング・資料提案・商談予約・追客をAIが自律的に行うシステムです。Meeton ai は、Webサイトに配属する AI SDR Platform で、会話・資料提案・予約・追客の4つの仕事をこなし、問い合わせ前から追客まであらゆる瞬間を商談に変えます。',
      },
    },
    {
      '@type': 'Question',
      name: 'Meeton ai の4つのモジュールはそれぞれ何をしますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Meeton Calendar はリードが動いた瞬間に商談予約まで運びます。Meeton Chat（Live）は接触前の検討の土台に立ち訪問者と対話して商談化します。Meeton Library は資料を共有しAIが解説して開封をトラッキングします。Meeton Email は予約しなかったリードを行動シグナルに基づき1:1で自律追客します。1製品から無料で始め、つなぐほど一気通貫のAI SDRになります。',
      },
    },
    {
      '@type': 'Question',
      name: 'なぜ「接触前」が重要なのですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'B2Bの買い手は購買プロセスの約70%を営業に接触する前に独力で進めるとされています（Gartner/6sense）。多くの企業はその間「待っている」だけで、初動の遅さ・追客の粘りのなさ・文脈の欠如により商談機会を逃しています。Meeton ai はこの接触前から動き、Speed（初動）・Persistence（粘り）・Context（文脈）で商談化を高めます。',
      },
    },
    {
      '@type': 'Question',
      name: '無料で使えますか？料金体系は？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい。Chat・Calendar・Library には無料ティアがあり、クレジットカード不要で始められます。単体Proは Chat ¥3万 / Library ¥3万 / Calendar ¥4万 / Email ¥5万（月・税抜）。全4機能込みのバンドルは Growth ¥12万 / Scale ¥20万 / Enterprise 要相談。4つ別々（合計¥15万）よりGrowthが¥3万お得です。',
      },
    },
    {
      '@type': 'Question',
      name: '既存のCRM・MAツールと連携できますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HubSpot・Salesforce とネイティブ連携し、会話ログや予約を自動登録します。Google Calendar・Outlook・Zoom とのカレンダー連携、Slack・Microsoft Teams・Google Chat への通知、Webhook による他ツール連携にも対応します。',
      },
    },
    {
      '@type': 'Question',
      name: 'どのような企業に向いていますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SaaS・IT・製造・専門サービス・フィンテック領域の日本のB2B企業を主な対象としています。CMO・CRO・インサイドセールス/SDR責任者が、マーケティング起点の商談化率（Speed to Lead）を改善したい場合に特に有効です。無料ティアからセルフサーブで始められます。',
      },
    },
  ],
}

// SoftwareApplication schema — Meeton ai platform (price allowed optional).
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
    '日本のB2B企業向け AI SDR Platform。Webサイトに配属し、会話・資料提案・予約・追客を自律化。Meeton Calendar / Chat / Library / Email の4モジュールで構成され、無料ティアから導入できる。',
  brand: { '@type': 'Brand', name: 'Meeton ai' },
  publisher: { '@id': 'https://dynameet.ai/#organization' },
  url: 'https://dynameet.ai/',
  image: 'https://dynameet.ai/logo-dark.svg',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'JPY',
    description: '無料ティアあり（クレジットカード不要）。単体Pro ¥3万〜、全機能バンドル Growth ¥12万/月（税抜）。',
  },
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'CRM連携', value: 'HubSpot・Salesforce ネイティブ連携' },
    { '@type': 'PropertyValue', name: '設定時間', value: 'ノーコード（スニペット/アップロード/OAuth）' },
    { '@type': 'PropertyValue', name: 'モジュール構成', value: 'Meeton Calendar / Chat / Library / Email' },
  ],
}

export default async function Page() {
  let featured: Array<{
    slug: string
    name: string
    industry?: string
    quote?: string
    heroMetric?: string
    heroMetricLabel?: string
  }> = []
  try {
    const cases = await getAllCaseStudies()
    featured = cases.slice(0, 3).map((c) => ({
      slug: c.slug,
      name: c.company,
      industry: c.industry,
      quote: c.quote || c.description,
      heroMetric: c.heroMetric,
      heroMetricLabel: c.heroMetricLabel,
    }))
  } catch {
    featured = []
  }
  // Fallback to the static public cases when Notion returns nothing (e.g.
  // preview deploys without the case-studies DB env) so the homepage proof
  // section always renders.
  if (featured.length === 0) featured = FEATURED_CASES
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageProductSchema) }} />
      <Home caseStudies={featured} />
    </>
  )
}
