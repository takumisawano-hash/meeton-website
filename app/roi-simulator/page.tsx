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

// FAQPage schema — "AI SDR ROI", "リード 商談化率 改善" 等のクエリで AI 検索引用獲得
const roiFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  url: 'https://dynameet.ai/roi-simulator/',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'ROI 試算ツールでは何を計算しますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '貴社の Web サイト URL から月間訪問者数を推定し、Meeton ai 導入時の自動獲得商談数・売上インパクト・営業工数削減を試算します。リード→商談化率、商談→受注率、平均単価などの貴社固有指標を入力することで、個別のシナリオを 30 秒で算出可能です。',
      },
    },
    {
      '@type': 'Question',
      name: '試算結果の信頼性はどの程度ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '試算は (1) SimilarWeb 等の公開トラフィック推定 (2) B2B 業界一般の商談化率レンジ (3) Meeton ai 導入企業の実績レンジ、の 3 ソースに基づきます。あくまで指標であり、実際の数値は貴社の業種・商材・運用体制により変動します。具体値は弊社デモにて貴社実データで再計算可能です。',
      },
    },
    {
      '@type': 'Question',
      name: 'どのような企業に向いていますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '月間 Web サイト訪問者 5,000 人以上の B2B 企業 (SaaS・製造・専門サービス・フィンテック等) に最も効果が出やすい設計です。訪問者ボリュームが多いほど、AI SDR が捌くリード数も増え、ROI 倍率が大きくなります。',
      },
    },
    {
      '@type': 'Question',
      name: '結果は PDF で持ち帰れますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい。試算結果は PDF として書き出し、社内共有や稟議資料としてご活用いただけます。メールアドレスの入力で PDF が即時送付されます。',
      },
    },
    {
      '@type': 'Question',
      name: '試算後、デモを予約できますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '可能です。試算結果ページから直接デモ予約フォームへ進めます。貴社固有の数値をもとに、デモではより精緻な ROI シミュレーションと導入ステップをご説明します。',
      },
    },
  ],
}

// HowTo schema — "Meeton ai の ROI を計算する 5 ステップ"
const roiHowToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Meeton ai の ROI を試算する方法',
  description: 'Web サイト URL を入力するだけで、Meeton ai 導入時の自動獲得商談数・売上インパクト・営業工数削減を 30 秒で試算',
  url: 'https://dynameet.ai/roi-simulator/',
  totalTime: 'PT30S',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '貴社 URL の入力',
      text: 'シミュレーターに貴社の Web サイト URL を入力します。月間訪問者数が公開推定値から自動取得されます。',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '基本指標の入力',
      text: 'リード→商談化率、商談→受注率、平均単価などの貴社固有指標を入力します。デフォルト値は B2B 業界一般のレンジです。',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'シナリオ別 ROI の確認',
      text: '現状ベースライン、Meeton ai 導入時の自動獲得商談数、売上インパクト、営業工数削減を一覧で確認します。',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'PDF 出力',
      text: 'メールアドレス入力で PDF レポートが即時送付されます。社内共有・稟議資料としてご活用いただけます。',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'デモ予約',
      text: '試算結果ページから直接デモ予約へ。貴社固有の数値で精緻な ROI シミュレーションと導入ステップをご説明します。',
    },
  ],
}

export default function RoiSimulatorPage() {
  return (
    <div style={{ background: '#fafaf7', color: '#0a0e0c', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(roiFaqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(roiHowToSchema) }}
      />
      <Nav variant="light" />
      <RoiSimulatorClient />
      <Footer />
    </div>
  )
}
