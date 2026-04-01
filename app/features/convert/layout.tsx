import type { Metadata } from 'next'
import JsonLd from '../../components/JsonLd'
import FAQJsonLd from '../../components/FAQJsonLd'
import SoftwareAppJsonLd from '../../components/SoftwareAppJsonLd'

const faqItems = [
  { question: 'サンクスページでのカレンダー表示はどう動きますか？', answer: 'フォーム送信後のサンクスページにAIチャットとカレンダーウィジェットを自動表示します。「資料をお送りしました。ぜひデモもご覧になりませんか？」のように自然に商談予約を促し、その場でカレンダーから空き時間を選択できます。コンバージョン直後の高い関心を逃しません。' },
  { question: '予約しなかったリードへの自動メールはどう動きますか？', answer: 'チャットやサンクスページで商談予約に至らなかったリードに対して、AIがカレンダーURL付きのフォローメールを自動送信します。送信タイミングやメール内容はリードの行動履歴に基づいてパーソナライズされます。' },
  { question: '事前ヒアリングとは何ですか？', answer: '商談予約時に、AIが自動で簡単なヒアリングを実施します。「お問い合わせの背景」「現在利用中のツール」「ご予算感」など、営業が商談前に知っておきたい情報を事前に収集。営業担当は準備万端で商談に臨めます。' },
  { question: 'どのCRMツールと連携できますか？', answer: 'HubSpot、Salesforceをはじめとする主要CRM/MAツールとネイティブ連携しています。予約情報、事前ヒアリング内容、リードスコアがすべてCRMに自動登録されます。確認メールやリマインダーも自動送信されます。' },
  { question: '導入にどのくらい時間がかかりますか？', answer: 'JavaScriptタグの設置とカレンダー連携で約10分です。Google Calendar、TimeRexなど主要な日程調整ツールに対応しています。サンクスページへの設置もJSタグ1行で完了します。' },
]

export const metadata: Metadata = {
  title: '商談予約の自動化｜チャット・サンクスページ・AIメールで予約を最大化',
  description: 'Meeton AIのコンバージョン機能が、チャット内・サンクスページでカレンダーを提示。予約しなかったリードにはAIがカレンダーURL付きメールを自動送信し、商談獲得を最大化します。',
  alternates: {
    canonical: '/features/convert/',
  },
  openGraph: {
    title: '商談予約の自動化｜チャット・サンクスページ・AIメールで予約を最大化',
    description: 'Meeton AIのコンバージョン機能が、チャット内・サンクスページでカレンダーを提示。未予約リードにはAIメールで自動追客します。',
    url: 'https://dynameet.ai/features/convert/',
  },
}

export default function ConvertLayout({
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
          { name: '商談予約', url: 'https://dynameet.ai/features/convert/' },
        ]}
      />
      <FAQJsonLd
        items={faqItems}
        pageUrl="https://dynameet.ai/features/convert/"
      />
      <SoftwareAppJsonLd
        name="Meeton AI - 商談予約の自動化"
        description="サンクスページ・メール・チャット内でカレンダーを提示し、事前ヒアリングからCRM登録まで自動化する商談予約エンジン"
        featureList={[
          'チャット内カレンダー自動表示',
          'サンクスページ即カレンダー提示',
          '未予約リードへのAIメール自動追客',
          'カレンダーURL付きフォローメール',
          'AI事前ヒアリング自動化',
          'CRM自動登録',
          '確認メール・リマインダー自動送信',
          'Google Calendar連携',
        ]}
        url="https://dynameet.ai/features/convert/"
      />
      {children}
    </>
  )
}
