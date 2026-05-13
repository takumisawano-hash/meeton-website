import type { Metadata } from 'next'
import JsonLd from '../../components/JsonLd'
import FAQJsonLd from '../../components/FAQJsonLd'
import SoftwareAppJsonLd from '../../components/SoftwareAppJsonLd'

const faqItems = [
  { question: 'AIチャットの設定にどのくらい時間がかかりますか？', answer: 'JavaScriptタグの設置は約5分です。AIはナレッジベースを自動学習するため、シナリオ設計は不要。設置直後から自律的に最適な対応を開始します。' },
  { question: '既存のチャットボットとの違いは何ですか？', answer: '従来のチャットボットはルール分岐やシナリオ設計が必要で、想定外の質問に対応できません。Meeton aiのAIチャットは文脈を理解し、自律的に最適な回答を生成。商談予約まで会話内で完結します。' },
  { question: 'AI SDR とチャットボットの違いは何ですか？', answer: 'チャットボットはルール分岐に基づき、想定外の質問に対応できません。AI SDR は LLM（大規模言語モデル）が文脈を理解し、訪問者ごとに最適な会話を自律生成します。ニーズ把握から商談予約まで、人間の SDR と同等の対話を 24 時間自動で実行する点が本質的な違いです。' },
  { question: 'Web接客ツール（KARTE / sinclo 等）と何が違いますか？', answer: 'Web 接客ツールはポップアップ表示やシナリオ誘導が主体で、最終的に人間のフォローが必要なケースが多くあります。Meeton Live は会話の中でニーズを特定し、温度感の高いリードはその場で商談予約まで完結。低温度リードは自動でナーチャリングフローへ移行し、人手介在ゼロで商談化プロセスを完結します。' },
  { question: 'どの言語に対応していますか？', answer: '日本語・英語・中国語・韓国語をはじめ、主要な言語に対応しています。多言語のサイトでもそのままご利用いただけます。' },
  { question: 'CRMとの連携は可能ですか？', answer: 'HubSpot、Salesforceとネイティブ連携しています。チャットで取得したリード情報はリアルタイムでCRMに自動登録されます。Webhookによる他ツールとの連携も可能です。' },
  { question: '無料トライアルはありますか？', answer: '14日間の無料トライアルをご用意しています。クレジットカード不要で、全機能をお試しいただけます。' },
]

// SoftwareApplication schema — Meeton Live モジュール単体
// 2026-05-13: Product → SoftwareApplication 変更。詳細は app/page.tsx 同部参照
// (GSC が Offer の price 必須を強制するため、公開価格のない B2B SaaS は
// Product schema を出すべきでない)。
const meetonLiveProductSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': 'https://dynameet.ai/features/ai-chat/#product',
  name: 'Meeton Live',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'AI SDR / Business Chat Software',
  operatingSystem: 'Web',
  description:
    'ウェブサイト訪問者と即時に対話し、過去の閲覧・ダウンロード・メール履歴を全文脈で引き継いだ AI SDR が商談予約まで完結させる AI チャットモジュール。シナリオ設計不要で設置 5 分から稼働。',
  brand: { '@type': 'Brand', name: 'Meeton ai' },
  publisher: { '@id': 'https://dynameet.ai/#organization' },
  url: 'https://dynameet.ai/features/ai-chat/',
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
      value: 'JavaScript タグ設置 約 5 分、シナリオ設計不要',
    },
  ],
}

export const metadata: Metadata = {
  title: 'Meeton Live｜全文脈を引き継いで商談化する AI SDR 対話',
  description: 'Meeton Live は再訪した識別済みリードに、過去の閲覧・DL・メール履歴を全文脈で引き継いで AI SDR が即時応答。商談予約までその場で完結する、ラストワンマイルの AI SDR プラットフォーム。',
  alternates: {
    canonical: '/features/ai-chat/',
  },
  openGraph: {
    title: 'Meeton Live｜全文脈を引き継いで商談化する AI SDR 対話',
    description: '再訪リードに、過去の全文脈を引き継いだ AI SDR が即時応答。商談予約までその場で完結。',
    url: 'https://dynameet.ai/features/ai-chat/',
  },
}

export default function AiChatLayout({
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
          { name: '機能', url: 'https://dynameet.ai/features/' },
          { name: 'AIチャット', url: 'https://dynameet.ai/features/ai-chat/' },
        ]}
      />
      <FAQJsonLd
        items={faqItems}
        pageUrl="https://dynameet.ai/features/ai-chat/"
      />
      <SoftwareAppJsonLd
        name="Meeton AI - AIチャット"
        description="サイト訪問者と自律的に会話し、ニーズ把握から商談予約まで完結するAIチャットエンジン"
        featureList={[
          'ページ文脈に応じた自動声かけ',
          '会話からニーズ把握',
          '最適な資料を自動提案',
          'チャット内でリード情報獲得',
          '温度感に応じた商談予約',
          'CRMリアルタイム連携',
          'シナリオ設計不要',
          '多言語対応',
        ]}
        url="https://dynameet.ai/features/ai-chat/"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(meetonLiveProductSchema) }}
      />
      {children}
    </>
  )
}
