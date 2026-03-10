import type { Metadata } from 'next'
import JsonLd from '../../components/JsonLd'
import FAQJsonLd from '../../components/FAQJsonLd'
import SoftwareAppJsonLd from '../../components/SoftwareAppJsonLd'

const faqItems = [
  { question: '資料ページとは何ですか？', answer: 'お客様の資料（ホワイトペーパー、事例集、料金表など）を一覧表示する専用ページです。AIが訪問者のブラウジングをサポートし、興味に合った資料を提案します。資料をダウンロードする際にAIチャットが起動し、自然な流れでリード情報を取得します。' },
  { question: 'サンクスページではどのようにAIが機能しますか？', answer: 'フォーム送信後のサンクスページにAIチャットを配置します。「資料をお送りしました。他にご興味のある情報はありますか？」のように声をかけ、追加の資料提案や商談予約への誘導を行います。コンバージョン直後の高い関心を逃さず、次のアクションにつなげます。' },
  { question: 'ポップアップはどのようなタイミングで表示されますか？', answer: '離脱しようとしたタイミング（Exit Intent）、一定時間の滞在後、ページスクロール到達時など、訪問者の行動に応じて最適なタイミングで表示されます。表示内容も閲覧ページに合わせてAIが自動でカスタマイズします。' },
  { question: 'これらのチャネルはAIチャットボットと連携しますか？', answer: 'はい、すべてのサイト内チャネルはAIチャットボットのコアエンジンと連携しています。資料ページでの興味、サンクスページでの行動、ポップアップへの反応はすべてリードスコアに反映され、最適なフォローアップにつながります。' },
  { question: '既存のWebサイトにどのように導入しますか？', answer: '共通のJavaScriptタグ1つですべてのサイト内チャネルが有効になります。資料ページは専用URLが発行され、サンクスページとポップアップはダッシュボードから表示条件を設定するだけです。開発リソースは不要です。' },
]

export const metadata: Metadata = {
  title: 'サイト内チャネル｜資料ページ・サンクスページ・ポップアップでリードを最大化',
  description: 'Meeton AIのサイト内チャネルは、資料ページ・サンクスページ・ポップアップの3つの接点にAIを配置し、訪問者のあらゆる行動を商談につなげます。',
  alternates: {
    canonical: '/features/onsite/',
  },
  openGraph: {
    title: 'サイト内チャネル｜資料ページ・サンクスページ・ポップアップでリードを最大化',
    description: 'Meeton AIのサイト内チャネルは、資料ページ・サンクスページ・ポップアップの3つの接点にAIを配置し、訪問者のあらゆる行動を商談につなげます。',
    url: 'https://dynameet.ai/features/onsite/',
  },
}

export default function OnsiteLayout({
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
          { name: 'サイト内チャネル', url: 'https://dynameet.ai/features/onsite/' },
        ]}
      />
      <FAQJsonLd
        items={faqItems}
        pageUrl="https://dynameet.ai/features/onsite/"
      />
      <SoftwareAppJsonLd
        name="Meeton AI サイト内チャネル"
        description="資料ページ・サンクスページ・ポップアップの3つの接点にAIを配置し、訪問者のあらゆる行動を商談につなげます。"
        featureList={[
          'AI資料ブラウジング体験',
          'サンクスページAIチャット',
          '行動トリガー型ポップアップ',
          'リードスコア自動加点',
          'Exit Intent検知',
          'ページ文脈対応メッセージ',
        ]}
        url="https://dynameet.ai/features/onsite/"
      />
      {children}
    </>
  )
}
