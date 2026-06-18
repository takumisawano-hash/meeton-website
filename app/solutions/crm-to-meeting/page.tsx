import type { Metadata } from 'next'
import SolutionLpTemplate, { type SolutionLpConfig } from '../SolutionLpTemplate'

/**
 * /solutions/crm-to-meeting/
 *
 * Phase 1 paid-traffic LP — target "CRM 過去資産の再活性化" market.
 * Full content rationale in docs/lp-spec-crm-to-meeting.md.
 *
 * Sister LP: /solutions/lead-to-meeting/.
 *
 * Visual identity: sub-accent cyan (#0891b2 — 業務系の連想),
 * Primary CTA stays brand green (#04cb78) via primaryCtaColor prop.
 */

export const revalidate = 3600

const PAGE_URL = 'https://dynameet.ai/solutions/crm-to-meeting/'

export const metadata: Metadata = {
  title: 'CRM に眠る商談機会を、AI SDR がもう一度動かす｜Meeton ai',
  description:
    '資料 DL 後に放置された MQL、過去の失注 contact、再訪する休眠リード。Meeton ai は CRM データと Web 行動を AI SDR が読み、文脈に沿った再アプローチで商談機会を生み出します。HubSpot / Salesforce ネイティブ連携。',
  alternates: { canonical: '/solutions/crm-to-meeting/' },
  openGraph: {
    title: 'CRM に眠る商談機会を、AI SDR がもう一度動かす',
    description:
      'HubSpot / Salesforce / Marketo に積み上がった過去 MQL・失注 contact・休眠リードから、AI SDR が再商談化を支援。',
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

const config: SolutionLpConfig = {
  slug: 'crm-to-meeting',
  eyebrow: 'CRM・MA にリードが蓄積されている企業へ',
  heroH1: [
    'CRM に眠る商談機会を、',
    'AI SDR がもう一度動かす。',
  ],
  heroSub:
    '資料 DL 後に放置された MQL、過去の失注 contact、再訪する休眠リード。Meeton ai は CRM データと Web 行動を AI SDR が読み、文脈に沿った再アプローチで商談機会を生み出します。',
  // 2026-05-23 GPT review: CRM-to-Meeting で「5秒」は core 訴求じゃない。
  // CRM 文脈で意味のある signal に差し替え。
  heroProof: [
    { value: 'HubSpot', label: 'Salesforce ネイティブ連携済み' },
    { value: '24', unit: '/7', label: '検討再開シグナルを検知' },
    { value: '送信前', unit: '承認 OK', label: 'AI 配信に承認フロー併用可' },
  ],
  painsHeading: 'CRM リードが商談に戻らない、3 つの理由',
  proofHeading: 'Meeton ai による関連成果',
  primaryCtaLabel: 'CRM 商談化チェックリストを受け取る',
  pains: [
    {
      title: '資料 DL 後に温度が冷めた MQL',
      body: '資料を DL したリードに対しナーチャー配信で「とにかく送る」を続け、検討タイミングを逃して結局商談に進まない。',
      signal: '多くの企業で、MQL の検討再開シグナルは可視化されていません',
    },
    {
      title: '「失注 = 永久に動かないリスト」化',
      body: '一度失注した contact は手動でフォローし直されることが少なく、CRM の山に埋もれていきます。',
      signal: '失注後しばらくして再検討が始まるケースは少なくありませんが、検知できないと商談に戻りません',
    },
    {
      title: '休眠リードに最適な再接触ができない',
      body: '「いつ・誰に・どんな内容で再接触するか」を考えるリソースがなく、結果として CRM 上で contact 数だけが増え続けます。',
      signal: 'Inside Sales のキャパは決裁者・新規 MQL に振られるため、休眠側まで手が回りません',
    },
  ],
  solutions: [
    {
      badge: 'AI フォロー',
      title: 'Meeton Email',
      body: 'CRM 内の過去 MQL・失注 contact の検討再開シグナル (Web 再訪、料金ページ閲覧、メール開封) を検知し、AI が 1:1 文脈に沿った再アプローチを支援 / 自動化。送信前承認フロー運用も選べます。',
      href: '/features/ai-email/',
    },
    {
      badge: 'AI チャット',
      title: 'Meeton Live',
      body: '再訪した識別済みリードに、過去の閲覧・DL・メール反応を引き継いだ AI SDR が即時対応。「以前ご検討されていた件、進捗はいかがですか」のような自然な再開を会話で実現します。',
      href: '/features/ai-chat/',
    },
    {
      badge: 'AI 商談予約',
      title: 'Meeton Calendar',
      body: '温度が高まった瞬間に AI が商談予約まで完結。CRM の owner / 業種 / 規模に応じて担当者を自動アサインし、Salesforce / HubSpot へ自動同期します。',
      href: '/features/meetings/',
    },
  ],
  cases: [
    {
      slug: 'biztex-chat-leads-10x',
      company: 'BizteX',
      metric: '月 20 件+',
      metricLabel: 'チャット経由リード (月 1〜2 件 →)',
    },
    {
      slug: 'edulinx-ai-chat-40-percent',
      company: 'EdulinX',
      metric: '60%+',
      metricLabel: 'Meeton ai 経由商談化率',
    },
    {
      slug: 'univis-multi-service-3month-2deals',
      company: 'Univis',
      metric: '3 ヶ月で 2 件',
      metricLabel: '導入後の受注 + 提案件数増加',
    },
  ],
  steps: [
    {
      title: 'CRM / MA を接続',
      body: 'HubSpot / Salesforce / Marketo のネイティブ連携でリード・会話履歴・商談履歴を取り込み。最短 30 分〜、初期設定は DynaMeet 担当者が支援。顧客環境により所要時間は変動します。',
    },
    {
      title: '検討再開シグナルを検知',
      body: 'サイト再訪、料金ページ閲覧、メール開封・クリック、資料 DL を AI が常時監視。',
    },
    {
      title: '文脈に沿った再アプローチ',
      body: 'Meeton Email が 1:1 で再アプローチ、Meeton Live が再訪時に対話。「いつ・誰に・何を」を AI が判断します。',
    },
    {
      title: '商談予約で完結',
      body: '温度が高い瞬間に Meeton Calendar が予約を提示し、担当者は商談に集中できます。',
    },
  ],
  faqs: [
    {
      question: 'CRM 連携の工数はどのくらいですか？',
      answer:
        'HubSpot / Salesforce はネイティブ連携済み、OAuth ベースで最短 30 分〜数時間で接続できます。顧客環境 (カスタム項目数 / 権限構成) によって差は出ますが、初期設定は DynaMeet 担当者が伴走するため技術専任エンジニアは不要です。Marketo / Pardot は API 連携で数日が目安。',
    },
    {
      question: '既存の MA (HubSpot / Marketo / Pardot) を置き換える必要はありますか？',
      answer:
        'いいえ。Meeton ai は MA を置き換えるツールではなく、MA / CRM が引き渡した先の「ラストワンマイル」を担います。既存スタックの上に被せて使う設計です。',
    },
    {
      question: 'どんなデータがあれば成果が出ますか？',
      answer:
        '過去 MQL の Web 行動ログ (サイト訪問履歴) や email インタラクション (開封・クリック) があると、再活性化対象を見つけやすくなります。目安として、CRM contact が 1,000 件以上ある企業では、対象抽出と効果検証の精度が出やすい設計です。',
    },
    {
      question: '休眠リード再商談化の成果はどのくらい？',
      answer:
        '現時点では「CRM-to-Meeting 直接事例」としてご紹介できる数字はまだありません。本ページは Meeton ai のラストワンマイル AI SDR としての関連成果 (BizteX チャットリード 20 倍、EdulinX 商談化率 60%+、Univis 3 ヶ月で 2 件受注) を踏まえてご紹介しています。CRM 文脈での具体の試算は 30 分の相談でお伝えします。',
    },
    {
      question: '既存 contact に勝手にメールが送られて炎上しませんか？',
      answer:
        'いいえ。Meeton Email は事前定義された配信ポリシー (停止条件・送信頻度・配信時間帯) に従って動作し、opt-out 履歴のある contact は除外対象として管理できます。送信前に必ず人間のレビュー段階を入れる承認フロー運用も選べます。具体の除外ルール (期間・条件) は、貴社のコンプライアンス方針に沿って初期設定でカスタマイズします。',
    },
    {
      question: 'セキュリティはどうなっていますか？',
      answer:
        'ISMS（ISO/IEC 27001・27017）認証を取得済みです。顧客データは AES-256 で保管、社内アクセスは最小権限。HubSpot / Salesforce との連携も official OAuth scope のみを要求し、データ書き戻し範囲は管理画面で個別 ON/OFF できます。セキュリティチェックシート対応、NDA 締結、アクセス権限管理にも個別対応可能。詳細は情報セキュリティポリシーを参照してください。',
    },
  ],
  finalCta: {
    heading: 'CRM に眠る商談機会、いくつ動かせるか診断しませんか？',
    sub: '自己診断シート (PDF, A4 3 ページ) に沿って、自社の CRM 状態を 10 分で点検できます。チェックの結果、再商談化余地が見えた場合は 30 分の相談でさらに具体的に詰めることもできます。',
  },
  accent: '#0891b2',
  // primaryCtaColor is omitted → SolutionLpTemplate defaults to the
  // DynaMeet brand green #04cb78.
  utmCampaignBase: '2026q2_crm_to_meeting',
  pageUrl: PAGE_URL,
}

export default function CrmToMeetingPage() {
  return <SolutionLpTemplate config={config} />
}
