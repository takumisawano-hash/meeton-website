import type { Metadata } from 'next'
import { altLanguages } from '@/app/lib/i18n'
import UseCasePageClient from '../UseCasePageClient'

export const revalidate = 3600

const PAGE_URL = 'https://dynameet.ai/use-cases/it/'

export const metadata: Metadata = {
  title: 'IT・SIer 向け AI SDR — 技術的な問い合わせを商談化 | Meeton ai',
  description:
    'SIer・受託開発・IT サービス企業向け AI SDR。環境・スコープ・見積もり前提の深い技術質問に AI が5秒で応答し、要件ヒアリングからエンジニア同席の商談予約までを自動化します。',
  alternates: altLanguages('/use-cases/it/', 'ja'),
  openGraph: {
    title: 'IT・SIer 向け AI SDR — 技術的な問い合わせを商談化 | Meeton ai',
    description: 'SIer・IT サービス企業のリード商談化を AI SDR が自動化。深い技術質問への即応と要件ヒアリングに対応。',
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

export default function ITUseCasePage() {
  return (
    <UseCasePageClient
      industrySlug="it"
      industryEn="IT Services"
      industryJa="IT・SIer"
      // IT services accent: indigo
      accentColor="#4f46e5"
      accentDeep="#3730a3"
      accentLight="#eceafd"
      accentGlow="rgba(79, 70, 229, 0.22)"
      eyebrow="USE CASE / IT SERVICES"
      heroTitleLead="SIer・IT サービスのリードを、"
      heroTitleAccent="要件ヒアリングから商談化する AI SDR。"
      heroSub="対応環境・スコープ・概算見積もりの前提 — IT サービスへの問い合わせは、初手から技術的に深い。Meeton ai は5秒で応答し、要件・現行環境・時期をヒアリングした上で、有望案件をエンジニア同席の商談まで自動で運びます。"
      personaStatement="「まだ構想段階」の相談から「RFP 直前」の具体案件まで、IT サービスのリードは温度差が大きい。Meeton ai は検討段階を対話で見極め、初期リードはナーチャーで育て、具体案件は営業とエンジニアのカレンダーに直接予約します。"
      painsLead="問い合わせは技術的に深いのに、初動は営業と SE の間で遅れていく。"
      pains={[
        {
          title: '見積もり前提の深い技術質問への初動',
          description: '「どの環境に対応できるか」「既存の基幹システムと連携できるか」「概算の前提条件は」— IT サービスへの問い合わせは初手から技術的に深い。シナリオ型チャットボットでは答えられず、営業から SE への確認を挟むうちに初動が遅れ、温度が下がります。',
          metric: '30-60分',
          metricLabel: '問い合わせ1件の照合・ヒアリング時間',
        },
        {
          title: '要件が曖昧なリードの放置',
          description: '「まだ構想段階」「要件定義前」の問い合わせは優先度が下がり、フォローされないまま放置されがち。要件が固まり RFP が出る頃には、検討期間中に接点を持ち続けた競合が指名され、相見積もりの1社にすら入れません。',
          metric: '3-9ヶ月',
          metricLabel: '構想から RFP までの検討期間',
        },
        {
          title: 'パートナー経由に埋もれる直販リード',
          description: 'クラウドベンダーやメーカーのパートナー経由案件が売上の中心だと、自社サイトからの直販リードの対応体制は後回しに。夜間・週末の問い合わせは翌営業日対応となり、比較検討中のリードは応答の速い競合へ流れます。',
          metric: '夜間・週末',
          metricLabel: '対応が翌営業日に持ち越される時間帯',
        },
      ]}
      modules={[
        {
          badge: 'Chat',
          name: 'Meeton Chat',
          href: '/chat/',
          description: 'Webサイトを訪れたリードに対して、AIがリアルタイムで会話。資料DLや動画閲覧の文脈を踏まえて、深いプロダクト質問にも具体的に回答します。',
          industryAngle: '「対応環境・連携実績・見積もりの前提」— IT サービス特有の深い技術質問に、貴社の公式情報（サービス資料・導入実績・FAQ）のみを根拠に回答。あわせて現行環境・要件・時期をヒアリングし、検討層を早期に特定します。',
        },
        {
          badge: 'Email',
          name: 'Meeton Email',
          href: '/email/',
          description: '問い合わせメールに対し、AIがインサイドセールスに代わって返信し、商談を予約します。Slack・HubSpot 通知と連動。',
          industryAngle: '「環境の詳細を教えてほしい」「概算の前提を確認したい」— 問い合わせ後に届く確認メールへ、AIが営業時間外でも即返信。SE への確認待ちで初動が遅れていた案件の温度を保ち続けます。',
        },
        {
          badge: 'Calendar',
          name: 'Meeton Calendar',
          href: '/calendar/',
          description: 'Google Calendar / MS Teams / Zoom と連携した自動スケジューリング。バイヤーが空き枠を選ぶだけで商談が確定。',
          industryAngle: '「まず営業と、次に技術者同席でもう一度」の二度手間を解消。初回から営業とエンジニア双方のカレンダーを横断して最適枠を提案し、技術者同席の商談をAIが自動で組みます。',
        },
        {
          badge: 'Library',
          name: 'Meeton Library',
          href: '/library/',
          description: '訪問者の業界・役職・閲覧履歴に基づき、最適な資料・事例・動画をパーソナライズして提示。再訪リードを温め続けます。',
          industryAngle: '要件定義前の情報収集リードに、導入実績・サービス資料・技術資料を課題テーマ別に出し分け。構想から RFP までの長い検討期間、再訪のたびに文脈を踏まえて育て続けます。',
        },
        {
          badge: 'Ads',
          name: 'Meeton Ads',
          href: '/ads/',
          description: 'サイト訪問者一人ひとりに、閲覧ページ・流入元・業種に応じて最適なオファーを AI が出し分けるオンサイト広告。クリック・リード獲得から継続的に学習します。',
          industryAngle: '閲覧中のサービスページ（クラウド移行 / 受託開発 / 保守運用）や流入元に合わせ、最適なオファー（事例DL / 無料相談）を AI が提示。チャットを開かない訪問者もオンサイト広告でリード化します。広告文は AI が下書きし、承認したものだけを配信します。',
        },
      ]}
      integrations={[
        {
          slug: 'slack',
          name: 'Slack',
          logo: '/integrations/03_Slack.png',
          reason: 'IT サービス企業の社内コミュニケーション標準。商談予約・高温度リードを営業と SE のチャンネルへリアルタイム通知。',
        },
        {
          slug: 'hubspot',
          name: 'HubSpot',
          logo: '/integrations/02_HubSpot.png',
          reason: 'インバウンド強化を進める IT サービス企業の主要 CRM/MA。リードの要件・検討段階を Contact / Deal に自動連携。',
        },
        {
          slug: 'salesforce',
          name: 'Salesforce',
          logo: '/integrations/01_Salesforce.png',
          reason: '大手 SIer の標準 CRM。パートナー経由と直販のリード・商談を1つのパイプラインで管理。',
        },
        {
          slug: 'microsoft-teams',
          name: 'Microsoft Teams',
          logo: '/integrations/04_Microsoft_Teams.png',
          reason: 'エンタープライズ SIer の標準コミュニケーション基盤。社内連絡と商談ミーティングを一元化。',
        },
      ]}
      faqs={[
        {
          question: '「対応環境」や「他システムとの連携」のような技術的な質問にも AI が答えられますか？',
          answer: 'はい。Meeton Chat は貴社のサービス資料・導入実績・FAQ・技術ドキュメントを学習データとし、公式情報のみを根拠に回答します。回答できない質問は「担当者に確認します」と判断してそのまま商談予約へ誘導するため、誤った技術回答をするリスクを抑えられます。',
        },
        {
          question: '要件が固まっていない「情報収集段階」の問い合わせにも効果がありますか？',
          answer: 'はい。Meeton Chat が検討段階を対話で見極め、構想段階のリードには Meeton Library が導入実績・サービス資料を出し分けて継続ナーチャーします。要件が固まった時点で商談予約へ切り替わるため、RFP が出る前から接点を持ち続けられます。',
        },
        {
          question: 'エンジニア（SE）同席の商談も自動で調整できますか？',
          answer: 'はい。Meeton Calendar は営業とエンジニア双方のカレンダーを横断して最適枠を提案し、技術者同席の商談を初回から組めます。「営業ヒアリングの後にもう一度技術者と」という二度手間をなくし、商談化までのリードタイムを短縮できます。',
        },
        {
          question: 'パートナー経由の案件が中心ですが、直販サイトに導入する意味はありますか？',
          answer: 'あります。自社サイトからの直販リードは、パートナー経由よりも利益率が高く、顧客と直接の関係を築けるチャネルです。Meeton ai は24時間365日、夜間・週末の問い合わせにも初動5秒で応答するため、少人数の直販体制でもリードを取りこぼさない受け皿になります。',
        },
        {
          question: '概算見積もりを求める問い合わせにはどう対応しますか？',
          answer: 'Meeton Chat が見積もりに必要な前提条件（現行環境・規模・スコープ・時期）を対話でヒアリングし、公式情報の範囲で料金体系や類似事例を案内します。個別見積もりが必要な案件は、ヒアリング内容が整理された状態で営業のカレンダーに直接予約されます。',
        },
        {
          question: 'IT・クラウド業界での導入実績はありますか？',
          answer: 'はい。Google Cloud / Google Workspace 支援の株式会社G-genでは、Meeton ai の導入により月間SQLが約20件から41〜48件へと2倍になり、商談化率80%を実現しています。問い合わせ1件あたり30分〜1時間かけていた照合・ヒアリング・アポ調整の置き換えに成功した事例です。',
        },
      ]}
      caseStudyMatcher={(cs) => {
        const target = (cs.industry || '').toLowerCase()
        return target.includes('it') || target.includes('クラウド') || target.includes('cloud') || target.includes('sier')
      }}
      pageUrl={PAGE_URL}
      utmCampaign="industry-it"
    />
  )
}
