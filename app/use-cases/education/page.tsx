import type { Metadata } from 'next'
import { altLanguages } from '@/app/lib/i18n'
import UseCasePageClient from '../UseCasePageClient'

export const revalidate = 3600

const PAGE_URL = 'https://dynameet.ai/use-cases/education/'

export const metadata: Metadata = {
  title: '教育・研修向け AI SDR — 資料DL後のリードを商談化 | Meeton ai',
  description:
    '法人研修・eラーニング・スクール事業者向け AI SDR。資料DL後に追えず消えるリードに Meeton ai が5秒で応答し、人事担当者の長期ナーチャーから商談予約までを自動化。年度予算サイクルの長い検討にも対応します。',
  alternates: altLanguages('/use-cases/education/', 'ja'),
  openGraph: {
    title: '教育・研修向け AI SDR — 資料DL後のリードを商談化 | Meeton ai',
    description: '法人研修・eラーニング・スクール事業者のリード商談化を AI SDR が自動化。資料DL後の追客と年度をまたぐ長期検討に対応。',
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

export default function EducationUseCasePage() {
  return (
    <UseCasePageClient
      industrySlug="education"
      industryEn="Education & Training"
      industryJa="教育・研修"
      // Education accent: purple
      accentColor="#9333ea"
      accentDeep="#7e22ce"
      accentLight="#f5ecfd"
      accentGlow="rgba(147, 51, 234, 0.22)"
      eyebrow="USE CASE / EDUCATION"
      heroTitleLead="教育・研修のリードを、"
      heroTitleAccent="年度をまたいでも商談化する AI SDR。"
      heroSub="法人研修・eラーニング・スクール事業者。資料DLは積み上がるのに営業が追いきれず、検討する人事と受講する現場は別人、しかも年度予算で検討は長期化。Meeton ai は5秒で応答し、決裁のタイミングまで温度を保って商談予約まで自動で運びます。"
      personaStatement="研修の検討は年度予算のサイクルに乗ります。人事担当が資料をDLしてから、翌期の予算編成・稟議を経て発注に至るまで数ヶ月。その間に営業が追い続けるのは現実的ではありません。Meeton ai はその期間、AIが関心テーマに合わせた情報を出し続け、決裁の時期に商談を組みます。"
      painsLead="資料DLは積み上がるのに、商談につながらないまま消えていく。"
      pains={[
        {
          title: '資料DL後のリードを営業が追いきれない',
          description: '研修カリキュラムや料金資料のDLリードは大量に発生する一方、営業・ISのキャパシティを超えて初回連絡が遅れがち。人事担当の情報収集は業務の合間や夜間・週末に集中するため、翌営業日の電話ではすでに他社比較が進んでいます。',
          metric: '夜間・週末',
          metricLabel: '人事担当の情報収集が集中',
        },
        {
          title: '検討者（人事）と受講者（現場）が別人',
          description: '資料をDLするのは人事・教育担当、受講するのは現場社員、決裁するのは部門長・役員。同じ「研修」でも立場ごとに知りたい情報が違います。1つの資料・1本の電話では、関係者全員の合意形成まで運べません。',
          metric: '3層',
          metricLabel: '人事・現場・決裁者の関係者構造',
        },
        {
          title: '年度予算サイクルで検討期間が長い',
          description: '研修予算は年度単位で編成されるため、「今期は予算がない、来期に検討」で止まる案件が多発。数ヶ月〜1年後の予算編成期まで温度を保つナーチャーが必要ですが、人手のフォローでは必ず抜け漏れが出ます。',
          metric: '年1回',
          metricLabel: '研修予算の編成サイクル',
        },
      ]}
      modules={[
        {
          badge: 'Chat',
          name: 'Meeton Chat',
          href: '/chat/',
          description: 'Webサイトを訪れたリードに対して、AIがリアルタイムで会話。資料DLや動画閲覧の文脈を踏まえて、深いプロダクト質問にも具体的に回答します。',
          industryAngle: '「カリキュラム内容」「料金体系」「オンライン対応」「助成金は使えるか」— 研修検討中の人事担当の質問に、貴社の公式情報のみを根拠に即回答。資料DLだけで離脱していた検討者を、その場で商談導線に乗せます。',
        },
        {
          badge: 'Email',
          name: 'Meeton Email',
          href: '/email/',
          description: '問い合わせメールに対し、AIがインサイドセールスに代わって返信し、商談を予約します。Slack・HubSpot 通知と連動。',
          industryAngle: '資料DL後に届く「見積もりが欲しい」「稟議用の資料が欲しい」「日程を相談したい」といったメールに、AIが営業時間外でも即返信。年度末・期初の問い合わせ集中期でも取りこぼしません。',
        },
        {
          badge: 'Calendar',
          name: 'Meeton Calendar',
          href: '/calendar/',
          description: 'Google Calendar / MS Teams / Zoom と連携した自動スケジューリング。バイヤーが空き枠を選ぶだけで商談が確定。',
          industryAngle: '人事担当・現場責任者・決裁者が同席する商談も、全員のカレンダーから最適枠を自動提案。研修説明会やデモ授業の日程調整もAIが代行し、「日程調整の往復で温度が下がる」を解消します。',
        },
        {
          badge: 'Library',
          name: 'Meeton Library',
          href: '/library/',
          description: '訪問者の業界・役職・閲覧履歴に基づき、最適な資料・事例・動画をパーソナライズして提示。再訪リードを温め続けます。',
          industryAngle: '年度をまたぐ長い検討期間中、人事担当の関心テーマ（階層別研修 / DX研修 / 助成金）に合わせて今読むべき1本を提示。翌期の予算編成期に再訪しても、AIが文脈を覚えています。',
        },
        {
          badge: 'Ads',
          name: 'Meeton Ads',
          href: '/ads/',
          description: 'サイト訪問者一人ひとりに、閲覧ページ・流入元・業種に応じて最適なオファーを AI が出し分けるオンサイト広告。クリック・リード獲得から継続的に学習します。',
          industryAngle: '閲覧中の研修テーマ（新人研修 / 管理職研修 / eラーニング）や流入元に合わせた最適オファーを AI が提示。チャットを開かない人事担当も、オンサイト広告でリード化します。広告文は AI が下書きし、承認したものだけを配信します。',
        },
      ]}
      integrations={[
        {
          slug: 'hubspot',
          name: 'HubSpot',
          logo: '/integrations/02_HubSpot.png',
          reason: '研修・教育事業の主要 CRM/MA。資料DLリードの活動履歴と商談を Contact / Deal に自動連携し、年度をまたぐ検討も見失いません。',
        },
        {
          slug: 'slack',
          name: 'Slack',
          logo: '/integrations/03_Slack.png',
          reason: '商談予約・高温度リードを Slack で即時通知。少人数の営業チームでも有望リードへの初動が遅れません。',
        },
        {
          slug: 'zoom',
          name: 'Zoom',
          logo: '/integrations/07_Zoom.png',
          reason: 'オンライン研修・説明会のデファクト。AIが商談を予約した瞬間にZoomリンクを発行し、参加者全員に案内します。',
        },
        {
          slug: 'google-calendar',
          name: 'Google Calendar',
          logo: '/integrations/05_Google_Calendar.png',
          reason: '営業・講師・人事担当のカレンダーを横断して最適枠を自動提案。説明会・デモ授業の複雑な調整も自動化します。',
        },
      ]}
      faqs={[
        {
          question: '資料DL後に営業が追えず消えているリードにも効果がありますか？',
          answer: 'はい。Meeton ai は資料DL・サイト訪問の瞬間から AI が5秒で応答し、営業のキャパシティに関係なく24時間365日対応します。研修業界大手の導入事例では、Meeton ai 経由のリードの商談化率が60%以上に達しています。資料DLで止まっていたリードを、そのまま商談予約まで運ぶ設計です。',
        },
        {
          question: '検討するのは人事担当で、受講者は現場社員です。立場が違う関係者に対応できますか？',
          answer: '対応できます。Meeton Chat は対話の中で訪問者の立場（人事・現場・経営）を自然に確認し、それぞれに合った情報を提示します。Meeton Library は役職・関心テーマに応じて資料を出し分け、Meeton Calendar は人事担当・現場責任者・決裁者が同席する商談の日程調整まで自動化します。',
        },
        {
          question: '年度予算のサイクルで検討期間が長くても、リードの温度を保てますか？',
          answer: 'はい。Meeton Library が訪問者の閲覧履歴・関心テーマを継続学習し、再訪時にその時点で最適な資料を提示します。「今期は予算がない」で止まった案件も、翌期の予算編成期に再訪した際に AI が文脈を引き継いで対応するため、年度をまたぐ長期検討との相性は特に高い設計です。',
        },
        {
          question: '助成金（人材開発支援助成金など）に関する質問にも答えられますか？',
          answer: 'Meeton Chat は貴社の公式情報（助成金の案内ページ・FAQ・料金表・カリキュラム資料）を学習データとし、根拠付きで回答します。回答できない場合は「担当者に確認します」と判断し、即時に商談誘導へ切り替えます。制度に関する不正確な回答を創作することはありません。',
        },
        {
          question: 'eラーニングやスクール事業でも使えますか？',
          answer: 'はい。法人研修だけでなく、eラーニング・スクール事業の資料請求対応や説明会予約にも活用できます。JSタグ1行・約5分で設置でき、シナリオ設計は不要。受講検討者からの「料金」「カリキュラム」「開講日程」といった頻出質問に24時間365日対応します。',
        },
        {
          question: '既存の CRM（HubSpot / Salesforce）や Zoom はそのまま使えますか？',
          answer: '置き換え不要です。Meeton ai は HubSpot・Salesforce・Slack・Zoom・Google Calendar とネイティブ連携しており、リード情報・商談・通知が既存ツールに自動で流れます。商談が予約された瞬間に Zoom リンクの発行と参加者への案内まで自動で完了します。',
        },
      ]}
      caseStudyMatcher={(cs) => {
        const target = (cs.industry || '').toLowerCase()
        return target.includes('研修') || target.includes('教育') || target.includes('人材') || (cs.tags || []).some(t => t.toLowerCase().includes('研修'))
      }}
      pageUrl={PAGE_URL}
      utmCampaign="industry-education"
    />
  )
}
