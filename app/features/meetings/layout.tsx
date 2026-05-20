import type { Metadata } from 'next'
import JsonLd from '../../components/JsonLd'
import FAQJsonLd from '../../components/FAQJsonLd'
import SoftwareAppJsonLd from '../../components/SoftwareAppJsonLd'

const faqItems = [
  { question: 'Meeton Calendar で AI 商談を自動予約するにはどうすればいいですか？', answer: 'フォーム送信・サンクスページ表示・メール経由でトリガーが発火します。リードが発生した瞬間に Meeton ai が 5 秒以内に起動し、AI 事前ヒアリング → カレンダー候補提示 → 予約確定 → CRM 自動登録までを自動完結。Google Calendar・TimeRex と連携し、Zoom リンクも自動生成します。' },
  { question: 'Speed to Lead（初動速度）を改善する方法はありますか？', answer: 'Meeton Calendar はリード発生から 5 秒以内に商談予約の提示を開始します。電話やメールによる手動フォローは業界一般に数時間〜数日かかりますが、Meeton ai は人間の介在なしに即時応答するため、初動速度の改善が商談化率の向上に直結します。' },
  { question: 'どのカレンダーツールと連携できますか？', answer: 'Google Calendar、TimeRexとネイティブ連携しています。Outlookカレンダーにも対応予定です。チームメンバーの空き時間をリアルタイムで取得し、最適な候補枠を自動表示します。' },
  { question: '事前ヒアリングの内容はカスタマイズできますか？', answer: 'はい。ヒアリング項目（課題、予算、利用ツール、導入時期など）は自由にカスタマイズ可能です。業種や商材に合わせた質問を設定できます。' },
  { question: '商談の通知はどこに届きますか？', answer: 'Slack、Microsoft Teams、Google Chatにリアルタイム通知が届きます。メール通知にも対応しています。通知内容にはヒアリング情報のサマリーが含まれるため、営業は即座に準備を開始できます。' },
  { question: '温度感の低いリードにもカレンダーを表示しますか？', answer: 'いいえ。Meeton aiはリードの温度感を判定し、高関心リードにのみカレンダーを表示します。温度感の低いリードには資料提案や育成メールを優先し、最適なタイミングで商談予約を提案します。' },
  { question: 'Web会議ツールとの連携は？', answer: 'Zoomとネイティブ連携しており、商談予約時にZoomリンクが自動生成されます。Google Meet、Microsoft Teamsにも対応しています。' },
]

// HowTo schema — "Meeton Calendar で商談を自動予約する方法"
// AI 検索 "AI 商談 自動予約" / "Speed to Lead 改善" クエリで citation されるための構造化情報
const meetonCalendarHowToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Meeton Calendar で商談を自動予約する方法',
  description:
    'リードがフォーム送信・チャット・メール経由でコンバートした瞬間に、自動で商談予約を提示するフロー',
  url: 'https://dynameet.ai/features/meetings/',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'リードイベントの検知',
      text:
        'フォーム送信・サンクスページ表示・メール開封などのイベントを Meeton ai がリアルタイム検知します。',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'AI 事前ヒアリング（5 秒以内）',
      text:
        'リード発生から 5 秒以内に AI が起動し、課題・予算・導入時期などを会話形式でヒアリングします。',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'カレンダー提示と予約確定',
      text:
        '担当者の Google Calendar / TimeRex をリアルタイム参照し、最適な候補枠を提示。来訪者がその場で予約を確定します。',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'CRM 自動登録・Slack 通知',
      text:
        'ヒアリング内容が HubSpot / Salesforce に CRM 自動登録され、Slack にサマリー通知が届きます。担当営業は即座に準備を開始できます。',
    },
  ],
}

export const metadata: Metadata = {
  title: 'Meeton Calendar｜AI SDR が温度の高い瞬間に商談予約を提示',
  description: 'Meeton Calendar は、リードがコンバートした瞬間に即時で商談予約を提示。フォーム送信・サンクスページ・メール経由で発動し、AI が事前ヒアリング・CRM 自動登録まで完了。AI SDR の商談予約機能。',
  alternates: {
    canonical: '/features/meetings/',
  },
  openGraph: {
    title: 'Meeton Calendar｜AI SDR の商談予約機能',
    description: 'リードがコンバートした瞬間に即時で商談予約を提示。AI が事前ヒアリング・CRM 登録まで完了。',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(meetonCalendarHowToSchema) }}
      />
      {children}
    </>
  )
}
