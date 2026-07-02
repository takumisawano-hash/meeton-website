import type { Metadata } from 'next'
import UseCasePageClient from '../UseCasePageClient'

export const revalidate = 3600

const PAGE_URL = 'https://dynameet.ai/use-cases/professional-services/'

export const metadata: Metadata = {
  title: 'コンサル・士業向け AI SDR — インバウンドを商談化 | Meeton ai',
  description:
    'コンサル・プロフェッショナルサービス向け AI SDR。パートナーや専門家が本業に集中できるよう、インバウンド問い合わせの一次対応と商談予約を AI が代行します。',
  alternates: { canonical: '/use-cases/professional-services/' },
  openGraph: {
    title: 'コンサル・士業向け AI SDR — インバウンドを商談化 | Meeton ai',
    description: 'パートナーが本業（クロージング）に集中できる。一次対応はAIに任せるプロフェッショナルサービス向け AI SDR。',
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

export default function ProfessionalServicesUseCasePage() {
  return (
    <UseCasePageClient
      industrySlug="professional-services"
      industryEn="Professional Services"
      industryJa="プロフェッショナルサービス"
      // Pro services accent: purple
      accentColor="#7c5cfc"
      accentDeep="#5b3fc8"
      accentLight="#f0ecfe"
      accentGlow="rgba(124, 92, 252, 0.22)"
      eyebrow="USE CASE / PRO SERVICES"
      heroTitleLead="パートナーは本業に集中。"
      heroTitleAccent="一次対応は AI が代行する。"
      heroSub="コンサル・法律・会計・税務・人材・PR — リレーション営業が本質のプロフェッショナルサービス。Meeton ai はインバウンド問い合わせの一次対応をAIが担い、有望案件のみをパートナー・専門家へ引き継ぎます。"
      personaStatement="パートナーは本来クロージングと既存顧客のアドバイザリーに集中したい。だが、増えるWeb問い合わせの一次返信を秘書や若手に任せると、有望案件を取り逃したり、逆にコールド案件に時間を取られたりします。Meeton ai はその判断と一次対応を AI に任せる仕組みです。"
      painsLead="問い合わせの内容が多様で、初回対応と仕分けに時間がかかる。"
      pains={[
        {
          title: 'パートナーの時間がインバウンド対応に奪われる',
          description: 'パートナー・専門家の時給単価は数万円。にもかかわらず、初回問い合わせの「どんな案件か」「予算感は」「現状の課題は」というヒアリングに時間を取られると、本業（クロージング・既存顧客対応）の機会損失が大きすぎます。',
          metric: '30-60分',
          metricLabel: '従来の一次ヒアリング時間',
        },
        {
          title: 'コールド/有望案件の選別ができていない',
          description: '「相談だけしたい」「価格感を知りたい」レベルのコールド問い合わせと、「予算1000万、3ヶ月以内に開始したい」レベルの有望案件が、同じパートナーの目に同じ重みで届く。選別がされず、有望案件への初動が遅れます。',
          metric: '20%',
          metricLabel: '一般的な有望案件率',
        },
        {
          title: 'リレーション営業の品質と量を両立できない',
          description: 'パートナー1人のキャパシティに依存するため、Webからのリード増加に対応しきれません。担当者を増やせば品質が落ち、品質を保てば量が捌けない。プロフェッショナルサービス特有のジレンマです。',
          metric: '1人月+',
          metricLabel: 'IS増員時の人件費負担',
        },
      ]}
      modules={[
        {
          badge: 'Chat',
          name: 'Meeton Chat',
          href: '/chat/',
          description: 'WebサイトのチャットでAIがリアルタイム対応。問い合わせの背景・課題・予算感・タイムラインを丁寧にヒアリングし、案件温度を自動判定します。',
          industryAngle: 'コンサル・士業の問い合わせ初動を AI が代行。「相談だけ」のコールドは資料案内に、「3ヶ月以内に開始したい有望案件」はパートナーのカレンダーに直接予約。パートナーの時間を、クロージング価値の高い案件だけに集中させます。',
        },
        {
          badge: 'Email',
          name: 'Meeton Email',
          href: '/email/',
          description: '問い合わせメールへのAI返信。案件背景・予算・タイムラインをメール内で確認し、商談化見込みを判定。',
          industryAngle: '紹介・リファラル経由で届くメール問い合わせも AI が初回返信を代行。「お打ち合わせの前にいくつか伺えますか」と自然にヒアリングし、パートナーが面談に入る時点で論点を整理済みの状態にします。',
        },
        {
          badge: 'Calendar',
          name: 'Meeton Calendar',
          href: '/calendar/',
          description: 'Google Calendar / MS Teams / Zoom 連携の自動スケジューリング。複数パートナー・複数クライアント関係者の調整も自動化。',
          industryAngle: 'クライアント側が複数の意思決定者を連れてくるケースに対応。パートナー側もマネージャー・アソシエイトをアサインする必要があり、4-6名のスケジュール調整を AI が全自動で組みます。',
        },
        {
          badge: 'Library',
          name: 'Meeton Library',
          href: '/library/',
          description: '訪問者の業界・課題テーマに応じて、最適な実績資料・ホワイトペーパー・事例を自動レコメンド。',
          industryAngle: '専門領域ごと・業界ごとの実績ライブラリを訪問者に最適化して提示。「自分のケースに似た事例があるか」をクライアントが自分で発見でき、商談予約までのコンバージョン率が向上します。',
        },
        {
          badge: 'Ads',
          name: 'Meeton Ads',
          href: '/ads/',
          description: 'サイト訪問者一人ひとりに、閲覧ページ・流入元・業種に応じて最適なオファーを AI が出し分けるオンサイト広告。クリック・リード獲得から継続的に学習します。',
          industryAngle: '実績ページや専門領域を閲覧する訪問者に、課題テーマ・業種・流入元に合わせた最適オファー（無料相談 / 事例DL）を AI が提示。チャットを開かない見込み客もオンサイト広告でリード化します。広告文は AI が下書きし、承認したものだけを配信します。',
        },
      ]}
      integrations={[
        {
          slug: 'hubspot',
          name: 'HubSpot',
          logo: '/integrations/02_HubSpot.png',
          reason: 'コンサル・士業の主要 CRM。クライアント・案件・タッチポイントを一元管理。',
        },
        {
          slug: 'slack',
          name: 'Slack',
          logo: '/integrations/03_Slack.png',
          reason: 'パートナー・マネージャー間の即時情報共有。有望案件のリアルタイム通知。',
        },
        {
          slug: 'google-calendar',
          name: 'Google Calendar',
          logo: '/integrations/05_Google_Calendar.png',
          reason: 'パートナー・マネージャー・クライアント側関係者の複数カレンダー横断で最適枠を自動提案。',
        },
        {
          slug: 'microsoft-teams',
          name: 'Microsoft Teams',
          logo: '/integrations/04_Microsoft_Teams.png',
          reason: 'エンタープライズコンサル・大手士業法人で標準。社内連絡＋商談ミーティングを一元化。',
        },
      ]}
      faqs={[
        {
          question: 'パートナーがリレーションを大事にする業種ですが、AI が一次対応すると顧客体験を損なわないですか？',
          answer: '一次ヒアリングを AI に任せる目的は、パートナーが「価値の高い対話」に集中するためです。Meeton Chat は丁寧な言葉遣いで案件背景を確認し、有望案件はパートナーへ即座に引き継ぎます。コールド問い合わせには資料送付＋リソースガイドで対応し、適切な距離感を維持します。むしろ「初動が遅い」「秘書が機械的に対応する」よりも顧客満足度が上がるケースが多くあります。',
        },
        {
          question: '「相談したいだけ」のコールド問い合わせと、有望案件をどう仕分けますか？',
          answer: 'Meeton Chat は問い合わせ過程で「予算感」「導入時期」「現状の課題」「意思決定者」などを自然な対話で確認し、案件スコアを自動算出します。スコアが基準を超えた問い合わせのみパートナーのカレンダーに直接予約され、それ以外は資料案内＋ナーチャー導線に乗せます。',
        },
        {
          question: 'コンサル業界では機密性が高い相談もあります。セキュリティは大丈夫ですか？',
          answer: 'Meeton ai はISMS / SOC2準拠の運用設計で、機密情報の取り扱いに対応しています。設定により「機密案件は AI 対応をスキップして即パートナーへ引き継ぐ」フローも構築可能です。詳細はセキュリティページをご参照ください。',
        },
        {
          question: 'パートナーが複数いる組織で、案件のアサインはどうなりますか？',
          answer: '問い合わせ内容（業界・テーマ・地域）に基づき、最適なパートナーへの自動アサインルールを設定可能です。Slack / HubSpot 通知も担当パートナーに直接届きます。「誰が見るか分からない」状態を解消できます。',
        },
        {
          question: '紹介・リファラル経由のリードにも対応できますか？',
          answer: 'Meeton Email が問い合わせメールに対し AI 返信を行い、商談化に必要な情報をメール内で確認します。紹介経由のリードでも、パートナーが商談に入る時点で「予算・タイムライン・関係者」が整理された状態になります。',
        },
        {
          question: '士業（弁護士・会計士・税理士）の業務にも活用できますか？',
          answer: 'はい。士業の新規問い合わせ（顧問契約・スポット相談・セミナー経由）の一次対応に幅広く活用されています。「相談予約をしたい」「料金を知りたい」「過去の取扱事例を知りたい」といった頻出質問への即時対応と、有望案件の確実な引き継ぎを実現できます。',
        },
      ]}
      caseStudyMatcher={(cs) => {
        const target = (cs.industry || '').toLowerCase()
        return target.includes('コンサル') || target.includes('consult') || target.includes('士業') || target.includes('professional') || target.includes('プロフェッショナル')
      }}
      pageUrl={PAGE_URL}
      utmCampaign="industry-professional-services"
    />
  )
}
