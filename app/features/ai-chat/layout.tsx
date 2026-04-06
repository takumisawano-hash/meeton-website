import type { Metadata } from 'next'
import JsonLd from '../../components/JsonLd'
import FAQJsonLd from '../../components/FAQJsonLd'
import SoftwareAppJsonLd from '../../components/SoftwareAppJsonLd'

const faqItems = [
  { question: 'AIチャットの設定にどのくらい時間がかかりますか？', answer: 'JavaScriptタグの設置は約5分です。AIはナレッジベースを自動学習するため、シナリオ設計は不要。設置直後から自律的に最適な対応を開始します。' },
  { question: '既存のチャットボットとの違いは何ですか？', answer: '従来のチャットボットはルール分岐やシナリオ設計が必要で、想定外の質問に対応できません。Meeton aiのAIチャットは文脈を理解し、自律的に最適な回答を生成。商談予約まで会話内で完結します。' },
  { question: 'どの言語に対応していますか？', answer: '日本語・英語・中国語・韓国語をはじめ、主要な言語に対応しています。多言語のサイトでもそのままご利用いただけます。' },
  { question: 'CRMとの連携は可能ですか？', answer: 'HubSpot、Salesforceとネイティブ連携しています。チャットで取得したリード情報はリアルタイムでCRMに自動登録されます。Webhookによる他ツールとの連携も可能です。' },
  { question: '無料トライアルはありますか？', answer: '14日間の無料トライアルをご用意しています。クレジットカード不要で、全機能をお試しいただけます。' },
]

export const metadata: Metadata = {
  title: 'AIチャット｜訪問者と対話し商談予約まで会話で完結',
  description: 'Meeton AIのAIチャットが、サイト訪問者と自律的に会話。ページ文脈に応じた声かけ、ニーズ把握、資料提案、商談予約までチャット内で完結します。シナリオ設計不要。',
  alternates: {
    canonical: '/features/ai-chat/',
  },
  openGraph: {
    title: 'AIチャット｜訪問者と対話し商談予約まで会話で完結',
    description: 'Meeton AIのAIチャットが、サイト訪問者と自律的に会話。ページ文脈に応じた声かけから商談予約まで完結。',
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
      {children}
    </>
  )
}
