import type { Metadata } from 'next'
import JsonLd from '../../components/JsonLd'
import FAQJsonLd from '../../components/FAQJsonLd'
import SoftwareAppJsonLd from '../../components/SoftwareAppJsonLd'

const faqItems = [
  { question: '資料提案はどのように行われますか？', answer: '訪問者が閲覧しているページの内容、過去の閲覧履歴、チャットでの会話内容をAIが分析し、最も関連性の高い資料を自動で提案します。料金ページを見ている訪問者には料金比較表を、事例ページを見ている訪問者には導入事例集を提案するなど、文脈に応じた提案を行います。' },
  { question: 'AI付き資料ダウンロードページとは何ですか？', answer: 'お客様の資料（ホワイトペーパー、事例集、料金表など）を一覧表示する専用ページです。AIチャットが常駐し、訪問者の興味に合った資料を対話形式で提案。ダウンロード時にメールアドレスを自然に取得し、リード情報をCRMへ自動登録します。' },
  { question: 'ポップアップの表示条件はカスタマイズできますか？', answer: '離脱しようとしたタイミング（Exit Intent）、一定時間の滞在後、ページスクロール到達時など、訪問者の行動に応じて表示条件を設定できます。表示内容もAIが閲覧ページに合わせて自動カスタマイズします。' },
  { question: 'Q&A対応のナレッジはどう管理しますか？', answer: '資料やWebサイトの内容をAIが自動学習します。管理画面からFAQの追加・編集も可能です。AIが回答できない質問は有人対応にエスカレーションする設定もあります。' },
  { question: '導入にどのくらい時間がかかりますか？', answer: 'JavaScriptタグの設置は約5分です。資料の登録とAIの設定を含めても、最短で当日中に稼働開始できます。資料ダウンロードページは専用URLが自動発行されます。' },
]

export const metadata: Metadata = {
  title: 'リードナーチャリング｜資料提案・Q&A対応で検討度を引き上げ',
  description: 'Meeton AIのナーチャリング機能が、匿名訪問者にもリードにも、閲覧ページに合わせた資料提案・AI付き資料ダウンロードページ・チャットQ&A対応で理解を深め、検討度を引き上げます。',
  alternates: {
    canonical: '/features/nurture/',
  },
  openGraph: {
    title: 'リードナーチャリング｜資料提案・Q&A対応で検討度を引き上げ',
    description: 'Meeton AIのナーチャリング機能が、匿名訪問者にもリードにも、資料提案・Q&A対応で理解を深め、検討度を引き上げます。',
    url: 'https://dynameet.ai/features/nurture/',
  },
}

export default function NurtureLayout({
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
          { name: 'リードナーチャリング', url: 'https://dynameet.ai/features/nurture/' },
        ]}
      />
      <FAQJsonLd
        items={faqItems}
        pageUrl="https://dynameet.ai/features/nurture/"
      />
      <SoftwareAppJsonLd
        name="Meeton AI - リードナーチャリング"
        description="資料提案・AI付きDLページ・Q&A対応でリードの理解を深め、検討度を引き上げるナーチャリングエンジン"
        featureList={[
          '閲覧コンテキスト対応の資料提案',
          'AI付き資料ダウンロードページ',
          'チャットQ&A自動対応',
          '行動トリガー型ポップアップ',
          'AI推奨度スコア表示',
          '資料・サイト内容の自動学習',
          '有人エスカレーション',
          'CRM連携',
        ]}
        url="https://dynameet.ai/features/nurture/"
      />
      {children}
    </>
  )
}
