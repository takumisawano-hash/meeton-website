import type { Metadata } from 'next'
import Home from './components/v2/Home'
import { getAllCaseStudies } from './lib/case-studies'
import { FEATURED_CASES } from './lib/featured-cases'
import { altLanguages } from './lib/i18n'

export const revalidate = 3600

export const metadata: Metadata = {
  title: {
    absolute: 'Meeton ai｜Webサイトを商談に変える AI SDR Platform',
  },
  description:
    'Meeton ai は、Webサイトに配属する AI SDR Platform。問い合わせ前の潜在層を掴み（Chat・Ads）、資料で育て（Library）、商談化し（Calendar）、逃したリードを追客（Email）。掴む→育てる→商談化→追客の4ステージで、あらゆる瞬間を商談に変えます。',
  alternates: altLanguages('/', 'ja'),
  openGraph: {
    title: 'Meeton ai｜Webサイトを商談に変える AI SDR Platform',
    description:
      '訪問者は去り、リードは商談にならない。「待つ」Webサイトを、商談を生み出すAI営業チャネルへ。掴む→育てる→商談化→追客の4ステージを自律でこなす AI SDR。',
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
        text: 'AI SDR（AI Sales Development Representative）とは、従来人間のSDRが担っていた初期接触・ヒアリング・資料提案・商談予約・追客をAIが自律的に行うシステムです。Meeton ai は、Webサイトに配属する AI SDR Platform で、掴む・育てる・商談化・追客の4つの仕事をこなし、問い合わせ前から追客まであらゆる瞬間を商談に変えます。',
      },
    },
    {
      '@type': 'Question',
      name: 'Meeton ai の4つのステージはそれぞれ何をしますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Meeton ai は4つのステージで構成されます。①掴む（Meeton Chat が会話で訪問者を掴み、Meeton Ads がサイト内広告で残りを逃さない）、②育てる（Meeton Library が資料で検討を育ててリードにする）、③商談化する（Meeton Calendar が温度の高まった瞬間に商談予約まで運ぶ）、④追客する（Meeton Email が予約しなかったリードを行動シグナル起点で1:1追客し再商談化へ戻す）。',
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
      name: '料金体系は？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '月額12万円〜です。掴む・育てるの『リード獲得プラン（¥12万〜）』、商談化まで含む『商談獲得プラン』、追客まで一気通貫の『オールインワンプラン』の3プラン。上位2プランはお問い合わせ。料金は月間トラフィックと機能で変動し、適格請求書（インボイス）に対応します。',
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
        text: 'SaaS・IT・製造・専門サービス・フィンテック領域の日本のB2B企業を主な対象としています。CMO・CRO・インサイドセールス/SDR責任者が、マーケティング起点の商談化率（Speed to Lead）を改善したい場合に特に有効です。まず30分のデモで自社サイトでの効き方を確認できます。',
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
    '日本のB2B企業向け AI SDR Platform。Webサイトに配属し、掴む（Chat・Ads）→育てる（Library）→商談化（Calendar）→追客（Email）の4ステージを自律化。月額12万円〜、リード獲得 / 商談獲得 / オールインワン の3プラン。',
  brand: { '@type': 'Brand', name: 'Meeton ai' },
  publisher: { '@id': 'https://dynameet.ai/#organization' },
  url: 'https://dynameet.ai/',
  image: 'https://dynameet.ai/logo-dark.svg',
  offers: {
    '@type': 'Offer',
    price: '120000',
    priceCurrency: 'JPY',
    description: '月額12万円〜。リード獲得 / 商談獲得 / オールインワン の3プラン。規模・機能により変動。',
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
    heroImage?: string | null
    companyLogo?: string | null
  }> = []
  try {
    const cases = await getAllCaseStudies()
    featured = cases.slice(0, 4).map((c) => ({
      slug: c.slug,
      name: c.company,
      industry: c.industry,
      quote: c.quote || c.description,
      heroMetric: c.heroMetric,
      heroMetricLabel: c.heroMetricLabel,
      heroImage: c.heroImage,
      companyLogo: c.companyLogo,
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
