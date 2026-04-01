import type { Metadata } from 'next'
import JsonLd from '../../components/JsonLd'
import FAQJsonLd from '../../components/FAQJsonLd'
import SoftwareAppJsonLd from '../../components/SoftwareAppJsonLd'

const faqItems = [
  { question: 'AIはどのように訪問者に話しかけますか？', answer: '訪問者が閲覧しているページの内容や行動パターンを分析し、最適なタイミングで自動的に声をかけます。料金ページなら「プランについてご質問ありますか？」、ブログなら「詳しい資料をお送りしましょうか？」のように、文脈に合わせた自然な挨拶を行います。' },
  { question: 'メールの自動送信はどのように動きますか？', answer: 'リードのスコアや行動履歴に基づいて、AIがパーソナライズされたメールを自動送信します。料金ページを再訪したリードには「プランの比較資料をお送りしますか？」のように、行動シグナルに応じた最適なメッセージを最適なタイミングで送信します。' },
  { question: 'シナリオの設計は必要ですか？', answer: 'いいえ、従来のチャットボットのようなシナリオ分岐の設計は一切不要です。AIが訪問者の質問や行動に応じて自律的に最適な対応を判断します。初期設定（声かけ内容、商談予約ルール、資料の登録）を行うだけで稼働を開始できます。' },
  { question: 'フォローアップの頻度はカスタマイズできますか？', answer: 'はい。フォローアップの間隔、回数上限、トリガー条件（未反応日数、ページ再訪など）を自由に設定できます。デフォルトでは最適化されたシーケンスが用意されていますので、そのまま運用開始し、後から調整することも可能です。' },
  { question: '導入にどのくらい時間がかかりますか？', answer: 'JavaScriptタグの設置は約5分です。AIの声かけ内容やメール設定を含めても、最短で当日中に稼働開始できます。開発リソースは不要です。' },
]

export const metadata: Metadata = {
  title: 'AIエンゲージメント｜チャット・メールでAIが自ら話しかける',
  description: 'Meeton AIのエンゲージメント機能が、チャットやメールでリードに自ら接触。ページの文脈に合わせたパーソナライズされた会話を展開し、未反応リードには自動フォローアップ。シナリオ設計不要、5分で導入。',
  alternates: {
    canonical: '/features/engage/',
  },
  openGraph: {
    title: 'AIエンゲージメント｜チャット・メールでAIが自ら話しかける',
    description: 'Meeton AIのエンゲージメント機能が、チャットやメールでリードに自ら接触。パーソナライズされた会話を展開します。',
    url: 'https://dynameet.ai/features/engage/',
  },
}

export default function EngageLayout({
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
          { name: 'AIエンゲージメント', url: 'https://dynameet.ai/features/engage/' },
        ]}
      />
      <FAQJsonLd
        items={faqItems}
        pageUrl="https://dynameet.ai/features/engage/"
      />
      <SoftwareAppJsonLd
        name="Meeton AI - AIエンゲージメント"
        description="チャットやメールでAIが自ら訪問者に接触し、パーソナライズされた会話でリードを獲得するエンゲージメントエンジン"
        featureList={[
          'プロアクティブAI声かけ',
          'ページ文脈対応の自動挨拶',
          'パーソナライズドメール自動送信',
          '行動シグナル送信トリガー',
          '自動フォローアップシーケンス',
          'チャット内リード獲得',
          'マルチチャネル統合接触',
          'CRM即時連携',
        ]}
        url="https://dynameet.ai/features/engage/"
      />
      {children}
    </>
  )
}
