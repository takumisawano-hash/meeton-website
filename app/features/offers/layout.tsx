import type { Metadata } from 'next'
import JsonLd from '../../components/JsonLd'
import FAQJsonLd from '../../components/FAQJsonLd'
import SoftwareAppJsonLd from '../../components/SoftwareAppJsonLd'

const faqItems = [
  { question: '資料の登録に手間がかかりませんか？', answer: 'ダッシュボードからPDFをアップロードするだけです。タイトルと簡単な説明を入力すれば、AIが内容を自動解析し、適切な訪問者に自動でマッチングします。' },
  { question: 'ポップアップの表示条件をカスタマイズできますか？', answer: 'はい。Exit Intent、スクロール深度、滞在時間、訪問回数など、複数の条件を組み合わせて設定可能です。デフォルトではAIが最適なタイミングを自動判定します。' },
  { question: '匿名訪問者のデータはどのように管理されますか？', answer: 'Cookieベースで匿名の閲覧行動を追跡します。フォーム送信やチャットでメールアドレスが判明した時点で、過去の匿名データが自動的にリードプロファイルに統合されます。GDPR対応のCookie同意バナーも提供しています。' },
  { question: '資料ダウンロードページのデザインはカスタマイズできますか？', answer: 'はい。ブランドカラー、ロゴ、レイアウトを自由にカスタマイズ可能です。自社サイトに溶け込むデザインで資料ページを公開できます。' },
  { question: '1つのページに複数の資料を提案できますか？', answer: 'はい。AIが訪問者の関心に基づいて優先度の高い資料から順にレコメンドします。マッチ度スコアも表示されるため、訪問者は最適な資料をすぐに見つけられます。' },
]

export const metadata: Metadata = {
  title: 'AIオファー｜訪問者の関心に合わせた資料を自動提案',
  description: 'Meeton AIのAIオファー機能が、閲覧ページに応じた資料マッチング、最適タイミングのポップアップ、AI付き資料ダウンロードページで訪問者の関心に合わせた資料を自動提案。',
  alternates: {
    canonical: '/features/offers/',
  },
  openGraph: {
    title: 'AIオファー｜訪問者の関心に合わせた資料を自動提案',
    description: '閲覧ページに応じた資料マッチング、最適タイミングのポップアップでリードを獲得。',
    url: 'https://dynameet.ai/features/offers/',
  },
}

export default function OffersLayout({
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
          { name: 'AIオファー', url: 'https://dynameet.ai/features/offers/' },
        ]}
      />
      <FAQJsonLd
        items={faqItems}
        pageUrl="https://dynameet.ai/features/offers/"
      />
      <SoftwareAppJsonLd
        name="Meeton AI - AIオファー"
        description="訪問者の閲覧行動に基づいて最適な資料を自動マッチングし、最適タイミングで提案するAIオファーエンジン"
        featureList={[
          '閲覧ページベース自動マッチング',
          'Exit Intentポップアップ',
          'AI付き資料ダウンロードページ',
          '匿名訪問者対応',
          'Cookie→実名自動統合',
          '資料閲覧トラッキング',
          'マッチ度スコア表示',
          'カスタムデザイン対応',
        ]}
        url="https://dynameet.ai/features/offers/"
      />
      {children}
    </>
  )
}
