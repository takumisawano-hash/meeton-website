import type { Metadata } from 'next'
import { altLanguages } from '@/app/lib/i18n'
import UseCasePageClient from '../UseCasePageClient'

export const revalidate = 3600

const PAGE_URL = 'https://dynameet.ai/use-cases/hr-staffing/'

export const metadata: Metadata = {
  title: '人材向け AI SDR — 夜間・週末の問い合わせも商談化 | Meeton ai',
  description:
    '人材紹介・派遣・採用支援・研修向け AI SDR。企業と求職者の両面ファネルに Meeton ai が24時間365日・5秒で応答し、夜間・週末の問い合わせから面談・商談の予約までを自動化します。',
  alternates: altLanguages('/use-cases/hr-staffing/', 'ja'),
  openGraph: {
    title: '人材向け AI SDR — 夜間・週末の問い合わせも商談化 | Meeton ai',
    description: '夜間・週末の問い合わせに5秒で応答。企業と求職者、両面ファネルの商談化を AI SDR が自動化。',
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

export default function HRStaffingUseCasePage() {
  return (
    <UseCasePageClient
      industrySlug="hr-staffing"
      industryEn="HR & Staffing"
      industryJa="人材"
      // HR & Staffing accent: amber
      accentColor="#d97706"
      accentDeep="#b45309"
      accentLight="#fbf0dc"
      accentGlow="rgba(217, 119, 6, 0.22)"
      eyebrow="USE CASE / HR & STAFFING"
      heroTitleLead="人材のリードを、"
      heroTitleAccent="夜間・週末も逃さず商談化する AI SDR。"
      heroSub="人材紹介・派遣・採用支援・研修 — 企業と求職者、両面のファネルを持つ人材ビジネス。問い合わせのピークは夜間・週末、そして他社エージェントとの同時比較。Meeton ai は5秒で応答し、面談・商談の予約まで自動で運びます。"
      personaStatement="求職者は在職中、動けるのは夜と週末。企業人事も日中は面接と業務で埋まっている。翌営業日の折り返しでは、先に返信した他社エージェントに案件も候補者も流れます。Meeton ai はその初動を24時間365日、AIが代行する仕組みです。"
      painsLead="登録も求人依頼も増えているのに、面談・商談につながらない。"
      pains={[
        {
          title: '問い合わせのピークは営業時間外',
          description: '求職者の転職活動は在職中の夜間・週末に集中します。企業側の問い合わせも採用会議の後、夕方以降に届きがち。翌営業日の折り返しでは、その間に他社エージェントが先に接点を持っています。',
          metric: '夜間・週末',
          metricLabel: '問い合わせのピーク帯',
        },
        {
          title: '他社エージェントとの同時比較',
          description: '求職者は複数の転職エージェントに同時登録し、企業も複数社を並行して比較するのが当たり前。最初に有効な返信をした会社が面談・案件を獲得します。初動の数時間の差が、そのまま機会損失になります。',
          metric: '5秒',
          metricLabel: 'Speed to Lead 基準',
        },
        {
          title: '企業と求職者、両面ファネルの仕分け',
          description: '「採用を依頼したい企業」と「転職したい求職者」では、聞くべきことも次のアクションも全く違います。問い合わせは同じ窓口に届き、仕分けと初動が営業・キャリアアドバイザーの手作業に依存しています。',
          metric: '両面',
          metricLabel: '企業×求職者のファネル',
        },
      ]}
      modules={[
        {
          badge: 'Chat',
          name: 'Meeton Chat',
          href: '/chat/',
          description: 'Webサイトを訪れたリードに対して、AIがリアルタイムで会話。資料DLや動画閲覧の文脈を踏まえて、深いプロダクト質問にも具体的に回答します。',
          industryAngle: '企業人事の「料金体系・成功報酬・対応職種」、求職者の「求人内容・面談の流れ」— 両面の質問に AI が即回答。会話の文脈から企業か求職者かを判定し、それぞれ最適な予約導線へ運びます。夜間・週末も止まりません。',
        },
        {
          badge: 'Email',
          name: 'Meeton Email',
          href: '/email/',
          description: '問い合わせメールに対し、AIがインサイドセールスに代わって返信し、商談を予約します。Slack・HubSpot 通知と連動。',
          industryAngle: '求人依頼・登録後の質問メールに、AI が営業時間外でも即返信。「募集要項を送りたい」「面談前に条件を確認したい」といったやり取りを AI が代行し、営業・キャリアアドバイザーが対応する前に温度を保ちます。',
        },
        {
          badge: 'Calendar',
          name: 'Meeton Calendar',
          href: '/calendar/',
          description: 'Google Calendar / MS Teams / Zoom と連携した自動スケジューリング。バイヤーが空き枠を選ぶだけで商談が確定。',
          industryAngle: 'キャリア面談・企業ヒアリングの日程調整を自動化。求職者が動ける夜間・週末の枠も含めて空き枠を提示し、選んだ瞬間に確定。「日程調整の往復で他社に先を越される」を仕組みで解消します。',
        },
        {
          badge: 'Library',
          name: 'Meeton Library',
          href: '/library/',
          description: '訪問者の業界・役職・閲覧履歴に基づき、最適な資料・事例・動画をパーソナライズして提示。再訪リードを温め続けます。',
          industryAngle: '求職者には職種・業界別の転職事例やノウハウを、企業には採用手法・料金体系の資料を出し分け。両面のファネルそれぞれに「今読むべき1本」を AI が提示し、再訪リードを温め続けます。',
        },
        {
          badge: 'Ads',
          name: 'Meeton Ads',
          href: '/ads/',
          description: 'サイト訪問者一人ひとりに、閲覧ページ・流入元・業種に応じて最適なオファーを AI が出し分けるオンサイト広告。クリック・リード獲得から継続的に学習します。',
          industryAngle: '閲覧ページ（求人情報 / 転職ノウハウ / 企業向けサービス）から訪問者の立場を読み取り、求職者には無料キャリア面談、企業には採用相談と、最適なオファーを AI が出し分けます。広告文は AI が下書きし、承認したものだけを配信します。',
        },
      ]}
      integrations={[
        {
          slug: 'hubspot',
          name: 'HubSpot',
          logo: '/integrations/02_HubSpot.png',
          reason: '人材・採用支援企業で導入が広がる CRM/MA。企業リード・求職者の活動履歴を Contact / Deal に自動連携。',
        },
        {
          slug: 'salesforce',
          name: 'Salesforce',
          logo: '/integrations/01_Salesforce.png',
          reason: '大手人材会社の標準 CRM。求人案件・企業・候補者の情報をネイティブ連携で同期。',
        },
        {
          slug: 'slack',
          name: 'Slack',
          logo: '/integrations/03_Slack.png',
          reason: '夜間・週末に入った高温度リードを Slack 通知で即把握。翌朝一番のアクションにつなげる。',
        },
        {
          slug: 'zoom',
          name: 'Zoom',
          logo: '/integrations/07_Zoom.png',
          reason: 'オンラインのキャリア面談・企業ヒアリングの標準。AIが予約した瞬間にZoomリンク発行・案内送信。',
        },
      ]}
      faqs={[
        {
          question: '夜間・週末に集中する問い合わせにも対応できますか？',
          answer: 'はい。Meeton ai は24時間365日稼働し、問い合わせに5秒で初動対応します。求職者の登録が集中する平日夜間や週末でも、AIがヒアリングから面談予約までを完結させるため、翌営業日の折り返しを待たずに接点を確保できます。',
        },
        {
          question: '企業からの求人依頼と求職者の登録、両方を1つの窓口で仕分けられますか？',
          answer: 'はい。Meeton Chat は会話の文脈から「採用を検討する企業」か「転職を考える求職者」かを判定し、それぞれに最適なヒアリングと予約導線へ自動で切り替えます。企業リードは営業へ、求職者はキャリアアドバイザーの面談枠へ、と引き継ぎ先も分けられます。',
        },
        {
          question: '他社エージェントと同時比較される中で、スピードで差をつけられますか？',
          answer: '人材業界では、複数エージェントへの同時登録・並行比較が一般的で、最初に有効な接点を持った会社が選ばれやすくなります。Meeton ai は初動5秒で応答し、そのまま面談・商談の予約まで自動で完了させるため、「翌営業日対応」の競合に対して初動で先行できます。',
        },
        {
          question: 'AI の対応で求職者の体験を損ないませんか？',
          answer: 'Meeton Chat は生成AIベースで、貴社の公式情報（サービス内容・面談の流れ・対応職種など）を根拠に自然な対話で応答します。シナリオ型ボットのような機械的な分岐ではなく、質問の文脈を理解して答え、答えられない内容は無理に回答せず担当者への引き継ぎに切り替えます。',
        },
        {
          question: '既存の CRM/SFA（HubSpot / Salesforce）はそのまま使えますか？',
          answer: '置き換え不要です。Meeton ai は HubSpot・Salesforce・Slack とネイティブ連携しており、企業リード・求職者の情報、面談予約、通知が既存ツールに自動で流れます。',
        },
        {
          question: '人材業界での導入実績はありますか？',
          answer: 'はい。人材・研修事業を展開する EdulinX 社では、Meeton ai 経由のリードの商談化率が60%以上に達しています。検討初期の訪問者をAIがナーチャーした状態で商談に引き渡せる点が、人材・研修領域で特に評価されています。',
        },
      ]}
      caseStudyMatcher={(cs) => {
        const target = (cs.industry || '').toLowerCase()
        return target.includes('人材') || target.includes('研修') || target.includes('hr') || (cs.tags || []).some(t => t.toLowerCase().includes('人材'))
      }}
      pageUrl={PAGE_URL}
      utmCampaign="industry-hr-staffing"
    />
  )
}
