import type { Metadata } from 'next'
import UseCasePageClient from '../UseCasePageClient'

export const revalidate = 3600

const PAGE_URL = 'https://dynameet.ai/use-cases/fintech/'

export const metadata: Metadata = {
  title: 'フィンテック向け AI SDR — コンプライアンス対応の商談化 | Meeton ai',
  description:
    'フィンテック・金融 B2B 向け AI SDR。規制・コンプライアンス対応のトーンを保ちながら、技術的バイヤーのリードを商談化。レギュレーション適合性の確認まで AI が代行します。',
  alternates: { canonical: '/use-cases/fintech/' },
  openGraph: {
    title: 'フィンテック向け AI SDR — コンプライアンス対応の商談化 | Meeton ai',
    description: 'コンプライアンス対応のトーンを保ちつつ、技術バイヤーのリードを商談化するフィンテック特化型 AI SDR。',
    url: PAGE_URL,
    siteName: 'Meeton ai',
    locale: 'ja_JP',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}

export default function FintechUseCasePage() {
  return (
    <UseCasePageClient
      industrySlug="fintech"
      industryEn="FinTech"
      industryJa="フィンテック"
      // Fintech accent: deep green
      accentColor="#10b981"
      accentDeep="#065f46"
      accentLight="#e0f6ec"
      accentGlow="rgba(6, 95, 70, 0.22)"
      eyebrow="USE CASE / FINTECH"
      heroTitleLead="規制を守り、"
      heroTitleAccent="商談だけを増やす AI SDR。"
      heroSub="フィンテック・金融 B2B のリード対応は、コンプライアンス・適合性確認・技術的深さの3つを同時に満たす必要があります。Meeton ai はコンプライアントなトーンを維持しつつ、規制適合性まで含めて商談前にAIが確認します。"
      personaStatement="フィンテックの問い合わせは、業務システム・決済基盤・データ連携など、規制と技術両面の質問が混在します。リードを商談化するには、不用意な表現を避けつつ、技術的深さで信頼を勝ち取る必要があります。Meeton ai はそのトーンを設計から維持します。"
      painsLead="金融・フィンテック領域では、不適切な表現1つで信頼を失います。一方で、技術バイヤーは深い質問を投げ、即応性を求めます。"
      pains={[
        {
          title: 'コンプライアンス対応のトーン維持',
          description: '「最高」「絶対」「保証」など金融商品取引法・景品表示法の観点で使えない表現がある中、Web上の問い合わせ対応で表現コンプライアンスを担保するのは容易ではありません。シナリオ型ボットでもオペレーターでもミスが発生します。',
          metric: '15+',
          metricLabel: '注意必要表現カテゴリ',
        },
        {
          title: 'レギュレーション適合性の事前確認',
          description: '金融機関向けプロダクトは、顧客側の規制ステータス（金融機関種別・ライセンス・地域要件）によって提供可否が変わります。営業の現場で初めて「対応できない」と判明する非効率を、事前にスクリーニングする必要があります。',
          metric: '30%+',
          metricLabel: '事前不適合判明案件の割合',
        },
        {
          title: '技術的バイヤーへの深い回答の即応性',
          description: 'フィンテック B2B のバイヤーは技術リード・PdM・CTO 直系。API 仕様・認証フロー・SLA・冗長性・暗号化方式など、技術質問の深度が高く、浅い回答だと即座に評価から外されます。',
          metric: '8-15分',
          metricLabel: 'バイヤーの平均技術評価時間',
        },
      ]}
      modules={[
        {
          badge: 'AI Chat',
          name: 'Meeton Live',
          href: '/features/ai-chat/',
          description: 'AIがリアルタイムに対話。コンプライアンス監査済みの表現プロンプトと貴社の規制関連FAQを学習させ、トーンを統一します。',
          industryAngle: '金融商取法・景表法に基づくNG表現リストを AI のシステムプロンプトに組み込み、不適切表現を未然に防止。さらに金融機関向け技術質問（API・SLA・暗号化）に対しても、貴社の技術仕様書を根拠に深く回答します。',
        },
        {
          badge: 'AI Email',
          name: 'Meeton Email',
          href: '/features/ai-email/',
          description: '問い合わせメールへのAI返信。コンプライアンス監査済みテンプレートをベースに、技術仕様・規制適合性を確認。',
          industryAngle: '顧客側の事業ステータス（銀行・証券・保険・FinTech・事業会社）を確認し、適合性スクリーニングをAIが一次実行。提供不可案件で営業時間を無駄にする事態を、商談前に防止できます。',
        },
        {
          badge: 'AI Calendar',
          name: 'Meeton Calendar',
          href: '/features/meetings/',
          description: 'Google Calendar / MS Teams / Zoom 連携。技術IS・コンプラ担当・客先技術者の3者調整も自動化。',
          industryAngle: 'フィンテック B2B 商談は「営業＋技術＋コンプラ」の3者体制が標準。Meeton Calendar は内部の複数ステークホルダー + 客先の調整を一気通貫で組みます。',
        },
        {
          badge: 'AI Offer',
          name: 'Meeton Library',
          href: '/features/offers/',
          description: '訪問者の業種（銀行・証券・保険）に応じた事例・ホワイトペーパー・規制対応文書を自動レコメンド。',
          industryAngle: '銀行向け事例・保険向けユースケース・規制適合性ホワイトペーパーを訪問者の業種に応じて出し分け。技術バイヤーが評価期間中、深い情報を自分で見つけられる導線を作ります。',
        },
      ]}
      integrations={[
        {
          slug: 'salesforce',
          name: 'Salesforce Financial Services Cloud',
          logo: '/integrations/01_Salesforce.png',
          reason: '金融業界の標準 CRM。リード・商談・コンプラ履歴を一元管理。',
        },
        {
          slug: 'microsoft-teams',
          name: 'Microsoft Teams',
          logo: '/integrations/04_Microsoft_Teams.png',
          reason: '銀行・大手保険のIT基盤として最も普及。社内連携と商談を一元化。',
        },
        {
          slug: 'slack',
          name: 'Slack',
          logo: '/integrations/03_Slack.png',
          reason: 'フィンテックスタートアップの社内コミュニケーション標準。有望リードをリアルタイム通知。',
        },
        {
          slug: 'hubspot',
          name: 'HubSpot',
          logo: '/integrations/02_HubSpot.png',
          reason: 'フィンテック企業のマーケティング自動化基盤として導入が進む。長期ナーチャーに最適。',
        },
      ]}
      faqs={[
        {
          question: 'AI が金融商品取引法・景品表示法に抵触する表現を使ってしまわないか心配です。',
          answer: 'Meeton Live はシステムプロンプトに「使用禁止表現リスト」を組み込み、出力前にコンプライアンスチェックを通します。さらに、貴社のコンプラ担当者が承認した表現テンプレートのみを使用するよう設定可能です。導入時に貴社のコンプライアンス要件をヒアリングし、初期プロンプトを共同設計します。',
        },
        {
          question: '顧客側の規制ステータス（銀行・証券・保険など）に応じた提供可否判定を、AI で実行できますか？',
          answer: 'Meeton Live が問い合わせ過程で「業種・ライセンス区分・地域」を確認し、貴社の対応可能セグメントマトリクスと照合します。対応不可セグメントは丁寧な案内のみとし、対応可能リードのみを商談化に進めます。営業現場で初めて不適合が判明する無駄を排除できます。',
        },
        {
          question: 'API 仕様・SLA・冗長性・暗号化方式など、技術リードからの深い質問に AI で対応できますか？',
          answer: 'はい。Meeton Live は貴社の技術ドキュメント（API リファレンス、セキュリティホワイトペーパー、SOC2 / ISMS 報告書のサマリー）を学習データに含めることができます。技術リードが投げる API 仕様・SLA・冗長性・暗号化アルゴリズムなどの質問に、貴社の公式情報を根拠に深く回答可能です。',
        },
        {
          question: '金融機関側のセキュリティ要件（オンプレ・閉域網・データ持出禁止）への対応は？',
          answer: 'Meeton ai は ISMS / SOC2 準拠の運用です。データ持出制限・暗号化通信・ログ監査要件への対応設計が可能です。閉域網内に AI 推論基盤を配置するオンプレ構成については別途ご相談ください。',
        },
        {
          question: '金融機関営業の商談は「営業＋技術＋コンプラ」の3者体制になります。スケジュール調整は？',
          answer: 'Meeton Calendar は内部複数ステークホルダー（営業・技術IS・コンプラ）と客先複数関係者を一括で調整します。複雑な4-6名スケジュール調整を、AI が全自動で組めます。',
        },
        {
          question: 'PCI DSS / FISC など、金融業界固有の規制への対応状況は？',
          answer: '個別の規制要件（PCI DSS・FISC・PIA など）への対応は、貴社の運用設計に応じて構成します。詳細はセキュリティページおよび、デモ時に技術担当からヒアリングのうえご回答します。',
        },
      ]}
      caseStudyMatcher={(cs) => {
        const target = (cs.industry || '').toLowerCase()
        return target.includes('fintech') || target.includes('フィンテック') || target.includes('金融') || target.includes('finance') || target.includes('銀行')
      }}
      pageUrl={PAGE_URL}
      utmCampaign="industry-fintech"
    />
  )
}
