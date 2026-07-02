import type { Metadata } from 'next'
import UseCasePageClient from '../UseCasePageClient'

export const revalidate = 3600

const PAGE_URL = 'https://dynameet.ai/use-cases/saas/'

export const metadata: Metadata = {
  title: 'SaaS 向け AI SDR — リード商談化を自動化 | Meeton ai',
  description:
    'SaaS 企業向け AI SDR。長期評価サイクル・複数ステークホルダーのSaaSバイヤーに対し、Meeton ai が継続ナーチャーから関係者全員との商談予約までを自動化します。',
  alternates: { canonical: '/use-cases/saas/' },
  openGraph: {
    title: 'SaaS 向け AI SDR — リード商談化を自動化 | Meeton ai',
    description: 'SaaS 企業のリード商談化を AI SDR が自動化。長期評価サイクル・複数ステークホルダーに対応。',
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

export default function SaaSUseCasePage() {
  return (
    <UseCasePageClient
      industrySlug="saas"
      industryEn="SaaS"
      industryJa="SaaS"
      // SaaS accent: cyan
      accentColor="#0891b2"
      accentDeep="#0e7490"
      accentLight="#e0f4f9"
      accentGlow="rgba(8, 145, 178, 0.22)"
      eyebrow="USE CASE / SAAS"
      heroTitleLead="SaaS のリードを、"
      heroTitleAccent="関係者全員と商談化する AI SDR。"
      heroSub="長期の評価サイクル、複数のステークホルダー、リサーチが深いバイヤー。SaaS の購買行動に対し、Meeton ai は5秒で応答し、関係者全員との商談予約まで自動で運びます。"
      personaStatement="SaaS の評価期間は3〜9ヶ月。1人のリードが資料DLしてから決裁に至るまで、評価グループ全員と接点を持ち続ける必要があります。Meeton ai はその間、AIが関係者ごとに最適な情報を出し続け、関係者全員での商談を組みます。"
      painsLead="資料 DL は増えているのに、デモ予約につながらない。"
      pains={[
        {
          title: 'リサーチ深掘り型バイヤーへの対応',
          description: 'SaaS バイヤーは比較サイト・口コミ・ベンダー資料を横断して数十時間調査します。チャットでも「機能比較」「セキュリティ」「料金根拠」といった深い質問が初手で来ます。シナリオ型チャットボットは即時に脱落します。',
          metric: '3-9ヶ月',
          metricLabel: '平均評価期間',
        },
        {
          title: '複数ステークホルダー商談化の難しさ',
          description: '導入決裁には現場・情シス・経営の3層が関与。1人のリードと話せても、関係者全員の商談を組まなければ案件は進みません。問い合わせ後にナーチャーが切れて消失する案件が多発します。',
          metric: '5-9名',
          metricLabel: '平均バイイングコミッティ規模',
        },
        {
          title: '即時応答 vs 専門深度の両立',
          description: '「料金は」「他社との違いは」「導入実績は」— SaaS 営業はこの3問に5秒で答える必要があります。一方、技術質問は浅い回答だと一気に温度が下がります。両立できる仕組みが必要です。',
          metric: '5秒',
          metricLabel: 'Speed to Lead 基準',
        },
      ]}
      modules={[
        {
          badge: 'Chat',
          name: 'Meeton Chat',
          href: '/chat/',
          description: 'Webサイトを訪れたリードに対して、AIがリアルタイムで会話。資料DLや動画閲覧の文脈を踏まえて、深いプロダクト質問にも具体的に回答します。',
          industryAngle: 'SaaS バイヤーの「機能・料金・セキュリティ」質問に、貴社の公式情報のみを根拠に正確に回答。シナリオ型チャットでは脱落していたバイヤーを、最初の30秒で商談導線に乗せます。',
        },
        {
          badge: 'Email',
          name: 'Meeton Email',
          href: '/email/',
          description: '問い合わせメールに対し、AIがインサイドセールスに代わって返信し、商談を予約します。Slack・HubSpot 通知と連動。',
          industryAngle: '評価期間中、関係者から個別に届くメール質問（請求書フォーマット・契約条項・技術仕様）に、AIが営業時間外でも即返信。バイイングコミッティ全員の温度を保ち続けます。',
        },
        {
          badge: 'Calendar',
          name: 'Meeton Calendar',
          href: '/calendar/',
          description: 'Google Calendar / MS Teams / Zoom と連携した自動スケジューリング。バイヤーが空き枠を選ぶだけで商談が確定。',
          industryAngle: '複数のステークホルダーが参加する商談を、全員のカレンダーから自動で最適枠を提案。1on1だけでなく「3社合同・関係者5名」のような複雑な調整もAIが代行します。',
        },
        {
          badge: 'Library',
          name: 'Meeton Library',
          href: '/library/',
          description: '訪問者の業界・役職・閲覧履歴に基づき、最適な資料・事例・動画をパーソナライズして提示。再訪リードを温め続けます。',
          industryAngle: 'SaaS の長期評価サイクルに対し、リードの関心テーマ（セキュリティ / 料金 / 事例）が変化しても、AIが今読むべき1本を提示。3ヶ月後の再訪でも文脈を覚えています。',
        },
        {
          badge: 'Ads',
          name: 'Meeton Ads',
          href: '/ads/',
          description: 'サイト訪問者一人ひとりに、閲覧ページ・流入元・業種に応じて最適なオファーを AI が出し分けるオンサイト広告。クリック・リード獲得から継続的に学習します。',
          industryAngle: 'SaaS の比較検討中バイヤーに対し、閲覧ページ（機能 / 料金 / セキュリティ）や流入元に合わせた最適オファーを AI が提示。チャットを開かない訪問者もオンサイト広告でリード化します。広告文は AI が下書きし、承認したものだけを配信します。',
        },
      ]}
      integrations={[
        {
          slug: 'slack',
          name: 'Slack',
          logo: '/integrations/03_Slack.png',
          reason: 'SaaS 企業の社内コミュニケーションのデファクト。商談予約・高温度リードを Slack 通知でリアルタイム把握。',
        },
        {
          slug: 'hubspot',
          name: 'HubSpot',
          logo: '/integrations/02_HubSpot.png',
          reason: 'SaaS の主要 CRM/MA。バイイングコミッティ全員の活動履歴を HubSpot Contact / Deal に自動連携。',
        },
        {
          slug: 'salesforce',
          name: 'Salesforce',
          logo: '/integrations/01_Salesforce.png',
          reason: 'エンタープライズ SaaS の標準 CRM。リード・商談・関係者をネイティブ連携で同期。',
        },
        {
          slug: 'zoom',
          name: 'Zoom',
          logo: '/integrations/07_Zoom.png',
          reason: 'SaaS デモのデファクトツール。AIが予約した瞬間にZoomリンク発行・参加者全員に案内送信。',
        },
      ]}
      faqs={[
        {
          question: 'SaaS の長期評価サイクル（3-9ヶ月）でも Meeton ai は効果がありますか？',
          answer: 'はい。Meeton Library が訪問者の閲覧履歴・関心テーマを継続学習し、再訪時にその時点で最適な資料を提示します。問い合わせから受注までの数ヶ月、AIが温度を切らさずナーチャーし続けるため、長期サイクルとの相性は特に高い設計です。',
        },
        {
          question: 'バイイングコミッティ（複数ステークホルダー）全員との商談を組めますか？',
          answer: 'Meeton Calendar は1on1だけでなく、3-5名規模のマルチパーティ商談の調整に対応しています。さらに Meeton Chat で「他にご検討に加わる方はいらっしゃいますか」と AI が自然に拾い上げ、関係者全員の参加意思確認まで自動化できます。',
        },
        {
          question: 'SaaS バイヤーが投げてくる「機能比較」「セキュリティ」「料金根拠」のような深い質問にも答えられますか？',
          answer: 'Meeton Chat は貴社の製品ドキュメント・FAQ・セキュリティホワイトペーパー・料金ページを学習データとし、根拠付きで回答します。回答できない場合は「担当者に確認します」と判断し、即時に商談誘導へ切り替えます。シナリオ型ボットのような「ご質問にお答えできません」で脱落することはありません。',
        },
        {
          question: '既存のセールススタック（HubSpot / Salesforce / Slack）はそのまま使えますか？',
          answer: '置き換え不要です。Meeton ai は HubSpot・Salesforce・Slack とネイティブ連携しており、リード情報・商談・通知が既存ツールに自動で流れます。多くの SaaS 企業がこの構成で運用されています。',
        },
        {
          question: '他のチャットボット（Drift / Intercom / ChatPlus）との違いは？',
          answer: 'シナリオ型チャットボットは決まった分岐しか答えられず、深い質問で即座に脱落します。Meeton Chat は生成AIベースのため、未定義の質問にも文脈を理解して応答可能です。さらに「会話→商談予約→CRM 同期→Slack 通知」までを1つのプロダクトで完結する点が、純粋なチャットツールとの最大の違いです。',
        },
        {
          question: 'SaaS スタートアップでも導入できますか？',
          answer: 'はい。初期設定は最短5分、専任エンジニア不要で導入できます。シード〜シリーズB のSaaS スタートアップで、人手のSDRを採用する前段階の自動化として導入されるケースが増えています。',
        },
      ]}
      caseStudyMatcher={(cs) => {
        const target = (cs.industry || '').toLowerCase()
        return target.includes('saas') || target.includes('sass') || (cs.tags || []).some(t => t.toLowerCase().includes('saas'))
      }}
      pageUrl={PAGE_URL}
      utmCampaign="industry-saas"
    />
  )
}
