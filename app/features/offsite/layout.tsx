import type { Metadata } from 'next'
import JsonLd from '../../components/JsonLd'
import FAQJsonLd from '../../components/FAQJsonLd'
import SoftwareAppJsonLd from '../../components/SoftwareAppJsonLd'

const faqItems = [
  { question: 'AIメールはどのようにパーソナライズされますか？', answer: 'AIチャットでの会話内容、閲覧したページ、ダウンロードした資料、リードスコアなどを基に、一人ひとりに最適なメール内容を自動生成します。業界に合ったケーススタディやROIデータの選定もAIが行います。' },
  { question: 'カレンダーリンクはどこに埋め込めますか？', answer: 'メール本文、PDF資料、提案書、Webページなど、URLを配置できるあらゆる場所に埋め込めます。リンクをクリックすると、事前認定済みの情報が引き継がれた状態でカレンダー予約画面が表示されます。' },
  { question: 'カレンダーQRはどのような場面で使えますか？', answer: '展示会・セミナーのブース、印刷資料、名刺、ポスター、チラシなど、オフラインのあらゆる接点で活用できます。スマートフォンでQRコードを読み取るだけで、即座に商談予約画面にアクセスできます。' },
  { question: 'サイト外チャネルの効果はどのように測定できますか？', answer: 'ダッシュボードでメール開封率、クリック率、カレンダーリンク経由の予約数、QR経由のアクセス数をリアルタイムで確認できます。各チャネルのROIを可視化し、最適化に活用できます。' },
  { question: 'メールの配信タイミングはどのように決まりますか？', answer: 'リードの行動シグナル（料金ページ再訪、資料の再ダウンロードなど）をトリガーにAIが最適なタイミングを判断します。また、リードステージ（Soft Lead → Hard Lead → Qualified）に応じた段階的なシーケンスも自動で実行されます。' },
]

export const metadata: Metadata = {
  title: 'サイト外チャネル｜AIメール・カレンダーリンク・QRで商談を創出',
  description: 'Meeton AIのサイト外チャネルは、AIメール・カレンダーリンク・カレンダーQRの3つで、Webサイトの外でもリードを育成し商談を獲得します。',
  alternates: {
    canonical: '/features/offsite/',
  },
  openGraph: {
    title: 'サイト外チャネル｜AIメール・カレンダーリンク・QRで商談を創出',
    description: 'Meeton AIのサイト外チャネルは、AIメール・カレンダーリンク・カレンダーQRの3つで、Webサイトの外でもリードを育成し商談を獲得します。',
    url: 'https://dynameet.ai/features/offsite/',
  },
}

export default function OffsiteLayout({
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
          { name: 'サイト外チャネル', url: 'https://dynameet.ai/features/offsite/' },
        ]}
      />
      <FAQJsonLd
        items={faqItems}
        pageUrl="https://dynameet.ai/features/offsite/"
      />
      <SoftwareAppJsonLd
        name="Meeton AI - サイト外チャネル"
        description="AIメール・カレンダーリンク・カレンダーQRの3チャネルで、Webサイトの外でもリードを育成し商談を獲得するアウトリーチエンジン"
        featureList={[
          'AIパーソナライズメール',
          '行動シグナル送信トリガー',
          'リード自動育成シーケンス',
          'カレンダーリンク埋め込み',
          'カレンダーQRコード生成',
          '事前認定情報の引き継ぎ',
          'オフライン接点の商談化',
          'チャネル別ROI計測',
        ]}
        url="https://dynameet.ai/features/offsite/"
      />
      {children}
    </>
  )
}
