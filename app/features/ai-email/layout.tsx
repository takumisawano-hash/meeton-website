import type { Metadata } from 'next'
import JsonLd from '../../components/JsonLd'
import FAQJsonLd from '../../components/FAQJsonLd'
import SoftwareAppJsonLd from '../../components/SoftwareAppJsonLd'

const faqItems = [
  { question: 'AIメールはどのようなタイミングで送信されますか？', answer: 'フォーム送信・資料ダウンロード・チャット終了などのトリガーイベント直後に自動送信されます。また、Day 1→Day 3→Day 5の自動フォローアップシーケンスにより、未反応リードへの再接触も自動で行います。' },
  { question: 'メール文面は自分で作成する必要がありますか？', answer: 'いいえ。AIがリードの行動履歴やナレッジベースをもとに、パーソナライズされたメール文面を自動生成します。もちろん、テンプレートやトーンの指定も可能です。' },
  { question: '既存のMAツール（Marketo等）と競合しませんか？', answer: '競合ではなく補完関係です。Meeton aiのAIメールはリードの初回フォローと育成に特化しており、MAツールのワークフローと並行して利用できます。Marketo・Eloquaとの連携も可能です。' },
  { question: '送信数に制限はありますか？', answer: 'プランにより月間送信数の上限があります。詳細は資料をご請求いただくか、デモでご確認ください。' },
  { question: '配信停止（オプトアウト）は対応していますか？', answer: 'はい。すべてのメールに配信停止リンクが自動挿入されます。GDPR・特定電子メール法に準拠した運用が可能です。' },
]

export const metadata: Metadata = {
  title: 'AIメール｜自動フォロー&パーソナライズで商談化',
  description: 'Meeton AIのAIメールが、フォーム送信・資料DL直後に即座にフォローアップ。パーソナライズドメールで育成し、未反応リードもDay 1→3→5で自動再接触。',
  alternates: {
    canonical: '/features/ai-email/',
  },
  openGraph: {
    title: 'AIメール｜自動フォロー&パーソナライズで商談化',
    description: 'Meeton AIのAIメールが即座にフォローアップ。パーソナライズドメールで未反応リードも商談化。',
    url: 'https://dynameet.ai/features/ai-email/',
  },
}

export default function AiEmailLayout({
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
          { name: 'AIメール', url: 'https://dynameet.ai/features/ai-email/' },
        ]}
      />
      <FAQJsonLd
        items={faqItems}
        pageUrl="https://dynameet.ai/features/ai-email/"
      />
      <SoftwareAppJsonLd
        name="Meeton AI - AIメール"
        description="フォーム送信・資料DL直後に自動フォローアップし、パーソナライズドメールで見込み客を商談につなげるAIメールエンジン"
        featureList={[
          '即座の自動フォローアップ',
          'パーソナライズドメール生成',
          'Day 1→3→5自動シーケンス',
          '休眠リード掘り起こし',
          'リード返信への自動応答',
          '開封・クリック追跡',
          'カレンダーURL自動挿入',
          'GDPR対応',
        ]}
        url="https://dynameet.ai/features/ai-email/"
      />
      {children}
    </>
  )
}
