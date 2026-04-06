import type { Metadata } from 'next'
import JsonLd from '../../components/JsonLd'
import FAQJsonLd from '../../components/FAQJsonLd'
import SoftwareAppJsonLd from '../../components/SoftwareAppJsonLd'

const faqItems = [
  { question: 'どのカレンダーツールと連携できますか？', answer: 'Google Calendar、TimeRexとネイティブ連携しています。Outlookカレンダーにも対応予定です。チームメンバーの空き時間をリアルタイムで取得し、最適な候補枠を自動表示します。' },
  { question: '事前ヒアリングの内容はカスタマイズできますか？', answer: 'はい。ヒアリング項目（課題、予算、利用ツール、導入時期など）は自由にカスタマイズ可能です。業種や商材に合わせた質問を設定できます。' },
  { question: '商談の通知はどこに届きますか？', answer: 'Slack、Microsoft Teams、Google Chatにリアルタイム通知が届きます。メール通知にも対応しています。通知内容にはヒアリング情報のサマリーが含まれるため、営業は即座に準備を開始できます。' },
  { question: '温度感の低いリードにもカレンダーを表示しますか？', answer: 'いいえ。Meeton aiはリードの温度感を判定し、高関心リードにのみカレンダーを表示します。温度感の低いリードには資料提案や育成メールを優先し、最適なタイミングで商談予約を提案します。' },
  { question: 'Web会議ツールとの連携は？', answer: 'Zoomとネイティブ連携しており、商談予約時にZoomリンクが自動生成されます。Google Meet、Microsoft Teamsにも対応しています。' },
]

export const metadata: Metadata = {
  title: 'AIカレンダー｜関心が高い瞬間にカレンダーを提示し確実に商談獲得',
  description: 'Meeton AIのAIカレンダー機能が、チャット内・サンクスページ・メールであらゆる接点にカレンダーを提示。AIが事前ヒアリングまで完了し、営業チームは準備万全で商談に臨めます。',
  alternates: {
    canonical: '/features/meetings/',
  },
  openGraph: {
    title: 'AIカレンダー｜関心が高い瞬間にカレンダーを提示し確実に商談獲得',
    description: 'チャット内・サンクスページ・メールでカレンダーを提示。AIが事前ヒアリングまで自動完了。',
    url: 'https://dynameet.ai/features/meetings/',
  },
}

export default function MeetingsLayout({
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
          { name: 'AIカレンダー', url: 'https://dynameet.ai/features/meetings/' },
        ]}
      />
      <FAQJsonLd
        items={faqItems}
        pageUrl="https://dynameet.ai/features/meetings/"
      />
      <SoftwareAppJsonLd
        name="Meeton AI - AIカレンダー"
        description="チャット内・サンクスページ・メールであらゆる接点にカレンダーを提示し、AIが事前ヒアリングまで完了するAIカレンダーエンジン"
        featureList={[
          'チャット内商談予約',
          'サンクスページカレンダー表示',
          'AIメール経由の予約獲得',
          'AI事前ヒアリング',
          'CRM自動登録',
          'Google Calendar連携',
          'Zoom自動リンク生成',
          'リアルタイム通知',
        ]}
        url="https://dynameet.ai/features/meetings/"
      />
      {children}
    </>
  )
}
