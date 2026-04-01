import type { Metadata } from 'next'
import JsonLd from '../../components/JsonLd'
import FAQJsonLd from '../../components/FAQJsonLd'
import SoftwareAppJsonLd from '../../components/SoftwareAppJsonLd'

const faqItems = [
  { question: 'リード検知はどのような行動を対象にしていますか？', answer: 'サイト訪問、ページ閲覧（料金ページ・事例ページなど重要ページの特定含む）、フォーム送信、資料ダウンロード、チャット開始、メール開封・クリックなど、あらゆるデジタル接点の行動を検知対象としています。JavaScriptタグを設置するだけで自動的に収集が開始されます。' },
  { question: 'リードスコアリングのロジックはカスタマイズできますか？', answer: 'はい。ページ閲覧（料金ページは高得点など）、フォーム送信、資料DL、チャット内容、訪問頻度など、各アクションごとにスコアの重み付けを自由に設定できます。デフォルトでも最適化された設定が用意されていますので、まずはそのまま運用開始し、後から調整することも可能です。' },
  { question: '既存のCRMやMAツールと連携できますか？', answer: 'HubSpot、Salesforceをはじめとする主要CRM/MAツールとネイティブ連携しています。検知したリード情報やスコアはリアルタイムでCRMに同期され、既存のワークフローにシームレスに組み込めます。' },
  { question: '匿名訪問者も検知できますか？', answer: 'はい。フォーム送信前の匿名訪問者もCookieベースで行動を追跡し、ページ閲覧パターンや滞在時間からスコアリングします。フォーム送信やチャットでメールアドレスが判明した時点で、過去の匿名行動データが自動的にリードプロファイルに統合されます。' },
  { question: '導入にどのくらい時間がかかりますか？', answer: 'JavaScriptタグの設置は約5分です。スコアリングルールのカスタマイズを含めても、最短で当日中に検知を開始できます。開発リソースは不要です。' },
]

export const metadata: Metadata = {
  title: 'リード検知・スコアリング｜サイト訪問・フォーム・DLをリアルタイムで検知',
  description: 'Meeton AIのリード検知機能が、サイト訪問・フォーム送信・資料DLをリアルタイムで検知し、AIが温度感を自動スコアリング。見込み客を逃さず、最適なタイミングで次のアクションに繋げます。',
  alternates: {
    canonical: '/features/detect/',
  },
  openGraph: {
    title: 'リード検知・スコアリング｜サイト訪問・フォーム・DLをリアルタイムで検知',
    description: 'Meeton AIのリード検知機能が、サイト訪問・フォーム送信・資料DLをリアルタイムで検知し、AIが温度感を自動スコアリング。',
    url: 'https://dynameet.ai/features/detect/',
  },
}

export default function DetectLayout({
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
          { name: 'リード検知', url: 'https://dynameet.ai/features/detect/' },
        ]}
      />
      <FAQJsonLd
        items={faqItems}
        pageUrl="https://dynameet.ai/features/detect/"
      />
      <SoftwareAppJsonLd
        name="Meeton AI - リード検知・スコアリング"
        description="サイト訪問・フォーム送信・資料DLをリアルタイムで検知し、AIが温度感を自動スコアリングするリード検知エンジン"
        featureList={[
          'サイト訪問リアルタイム検知',
          'フォーム送信トリガー',
          '資料DLトラッキング',
          'AIリードスコアリング',
          'Hot/Warm/Cold自動分類',
          '匿名→実名の自動統合',
          'CRMリアルタイム同期',
          '行動パターン分析',
        ]}
        url="https://dynameet.ai/features/detect/"
      />
      {children}
    </>
  )
}
