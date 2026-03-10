import type { Metadata } from 'next'
import JsonLd from '../../components/JsonLd'
import FAQJsonLd from '../../components/FAQJsonLd'
import SoftwareAppJsonLd from '../../components/SoftwareAppJsonLd'

const faqItems = [
  { question: 'AIチャットボットはどのように訪問者に話しかけますか？', answer: 'Meeton AIのチャットボットは、訪問者が閲覧しているページの内容や行動パターンを分析し、最適なタイミングで自動的に声をかけます。料金ページなら「プランについてご質問ありますか？」、ブログなら「詳しい資料をお送りしましょうか？」のように、文脈に合わせた自然な挨拶を行います。' },
  { question: 'シナリオの設計は必要ですか？', answer: 'いいえ、従来のチャットボットのようなシナリオ分岐の設計は一切不要です。AIが訪問者の質問や行動に応じて自律的に最適な対応を判断します。初期設定（声かけ内容、商談予約ルール、資料の登録）を行うだけで稼働を開始できます。' },
  { question: 'どのようにリード情報を取得しますか？', answer: 'チャットの会話の流れの中で自然にメールアドレスを取得します。チャット画面下部に専用の入力フィールドがあり、リアルタイムバリデーションとオートコンプリートに対応。入力された瞬間にCRMへ自動登録されるため、ブラウザが閉じてもデータは安全です。' },
  { question: '商談予約はどのように行われますか？', answer: '訪問者の行動（ページ閲覧、チャット内容、訪問回数）をリアルタイムでスコアリングし、設定した基準を満たした訪問者にのみカレンダーを表示して商談予約を促します。Google CalendarやTimeRexなど主要な日程調整ツールと連携しています。' },
  { question: '導入にどのくらい時間がかかりますか？', answer: 'JavaScriptタグの設置は約5分です。AIの声かけ内容や商談予約ルールの設定を含めても、最短で当日中に稼働開始できます。開発リソースは不要です。' },
]

export const metadata: Metadata = {
  title: 'AIチャットボット｜Webサイト訪問者と自動で商談を創出',
  description: 'Meeton AIのAIチャットボットが、Webサイト訪問者にプロアクティブに話しかけ、会話の流れでリードを獲得。見込み度をスコアリングし、商談予約まで完全自動化します。シナリオ設計不要、5分で導入。',
  alternates: {
    canonical: '/features/chatbot/',
  },
  openGraph: {
    title: 'AIチャットボット｜Webサイト訪問者と自動で商談を創出',
    description: 'Meeton AIのAIチャットボットが、Webサイト訪問者にプロアクティブに話しかけ、会話の流れでリードを獲得。見込み度をスコアリングし、商談予約まで完全自動化します。',
    url: 'https://dynameet.ai/features/chatbot/',
  },
}

export default function ChatbotLayout({
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
          { name: 'AIチャットボット', url: 'https://dynameet.ai/features/chatbot/' },
        ]}
      />
      <FAQJsonLd
        items={faqItems}
        pageUrl="https://dynameet.ai/features/chatbot/"
      />
      <SoftwareAppJsonLd
        name="Meeton AI - AIチャットボット"
        description="Webサイト訪問者にAIが自ら話しかけ、会話の流れでリード獲得・見込み度スコアリング・商談予約まで自動化するAIチャットボットエンジン"
        featureList={[
          'プロアクティブAI声かけ',
          'ページ文脈対応の自動挨拶',
          'チャット内リード獲得',
          'リアルタイムスコアリング',
          '商談予約の自動化',
          'CRM即時連携',
          '資料カード提案',
          'ダウンロードセンター連携',
        ]}
        url="https://dynameet.ai/features/chatbot/"
      />
      {children}
    </>
  )
}
