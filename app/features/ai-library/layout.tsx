import type { Metadata } from 'next'
import JsonLd from '../../components/JsonLd'
import FAQJsonLd from '../../components/FAQJsonLd'
import SoftwareAppJsonLd from '../../components/SoftwareAppJsonLd'

const faqItems = [
  { question: 'Meeton Library と通常の資料ダウンロードページの違いは何ですか？', answer: '通常の資料DLページは「探す責任」がリード側にあり、検討フェーズに合った資料に到達できないことが多くあります。Meeton Library は AI が CRM 上の行動履歴・興味分野を読み解いて、最適な資料を能動的に推薦・解説します。さらに資料の中身に関する質問にもその場で回答し、検討の壁を取り除きます。' },
  { question: '既存リードに対してのみ動作するのですか？', answer: 'はい。Meeton Library は HubSpot / Salesforce で識別済みの既存リード（過去にコンバートしたリード）の再訪に対して起動する、ナーチャリング専用機能です。新規リード獲得用ではなく、検討フェーズが進んだリードに適切な情報提供を行い、商談機会を再発火させる設計です。' },
  { question: '資料の更新は AI が自動で学習しますか？', answer: 'はい。資料を Meeton Library にアップロードまたは連携すると、AI がコンテンツを自動でインデックス化します。資料の更新・差し替えがあれば、再学習も自動で行われ、常に最新の情報をベースに推薦・解説します。' },
  { question: 'Meeton Calendar との連携はどう動きますか？', answer: 'AI が資料解説対話の中で「検討再開」のシグナル（具体的な料金質問・導入時期の言及・比較検討の発言など）を検知すると、Meeton Calendar の予約 UI を会話内に直接展開します。CRM 上の担当者ルールに従って自動割り振り、ページ遷移なしで商談確定まで導きます。' },
  { question: '導入時に既存資料の整理は必要ですか？', answer: '整理は必須ではありません。既存の PDF・スライド・ホワイトペーパーをそのままアップロードしていただければ、AI が内容を解析してメタデータを自動付与します。ただし、より精度の高い推薦のために、資料のターゲット業界・検討フェーズなどを軽くタグ付けすることを推奨しています。導入支援の中でサポート可能です。' },
]

export const metadata: Metadata = {
  title: 'Meeton Library｜既存リードの検討再開を捉える AI 資料推薦・解説',
  description: '過去にコンバートしたリードが再訪した瞬間、AI が行動履歴・興味分野から最適な資料を推薦・解説。検討再開のタイミングで Meeton Calendar に引き渡し、商談機会を再発火させる、既存リードのナーチャリング専用機能。',
  alternates: {
    canonical: '/features/ai-library/',
  },
  openGraph: {
    title: 'Meeton Library｜既存リードの検討再開を捉える AI 資料推薦・解説',
    description: '再訪した既存リードに、AI が文脈に応じた資料を推薦・解説。検討再開のタイミングを捉えて商談化。',
    url: 'https://dynameet.ai/features/ai-library/',
  },
}

export default function AiLibraryLayout({
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
          { name: 'AIライブラリ', url: 'https://dynameet.ai/features/ai-library/' },
        ]}
      />
      <FAQJsonLd
        items={faqItems}
        pageUrl="https://dynameet.ai/features/ai-library/"
      />
      <SoftwareAppJsonLd
        name="Meeton AI - AIライブラリ"
        description="再訪した既存リードに対し、AI が行動履歴から最適な資料を推薦・解説するナーチャリング専用エンジン"
        featureList={[
          'AI による最適資料の自動推薦',
          '資料内容の AI 解説対話',
          '行動履歴・興味分野の自動分析',
          'CRM 識別済みリードへの起動',
          '検討再開シグナルの自動検知',
          'Meeton Calendar への自動引き渡し',
          '資料の自動インデックス化',
          'HubSpot / Salesforce ネイティブ連携',
        ]}
        url="https://dynameet.ai/features/ai-library/"
      />
      {children}
    </>
  )
}
