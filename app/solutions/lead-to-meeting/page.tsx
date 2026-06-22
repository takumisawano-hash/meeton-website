import type { Metadata } from 'next'
import { altLanguages } from '@/app/lib/i18n'
import SolutionLpTemplate, { type SolutionLpConfig } from '../SolutionLpTemplate'

/**
 * /solutions/lead-to-meeting/
 *
 * Phase 1 paid-traffic LP — target「リードは集めているのに商談に
 * つながらない」 broad pain space. Sister LP: /solutions/crm-to-meeting/.
 *
 * Full content rationale in docs/lp-spec-lead-to-meeting.md.
 *
 * Visual identity: sub-accent blue (#3b6ff5 — マーケ系の連想),
 * Primary CTA stays brand green (#04cb78).
 */

export const revalidate = 3600

const PAGE_URL = 'https://dynameet.ai/solutions/lead-to-meeting/'

export const metadata: Metadata = {
  title: 'リードは増えた。でも、商談が増えていない。AI SDR Meeton ai',
  description:
    '広告・SEO・ウェビナーで集めたリードが、CRM の山に積み上がるだけになっていませんか？Meeton ai は問い合わせ・資料 DL・再訪問のタイミングで AI SDR が会話・資料提案・日程調整・追客を行い、リードを商談へ進めます。',
  alternates: altLanguages("/solutions/lead-to-meeting/", 'ja'),
  openGraph: {
    title: 'リードは増えた。でも、商談が増えていない。',
    description:
      '初動 5 秒対応 + 1:1 文脈追客 + 自動商談予約。AI SDR Meeton ai がリード→商談の歩留まりを改善します。',
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
  slug: 'lead-to-meeting',
  eyebrow: 'リードは増えたが、商談は増えていない企業へ',
  heroH1: [
    'リードは増えた。',
    'でも、商談が増えていない。',
  ],
  heroSub:
    'Meeton ai は、問い合わせ・資料 DL・再訪問のタイミングで AI SDR が会話・資料提案・日程調整・追客を行い、リードを商談へ進めます。',
  heroProof: [
    { value: '5', unit: '秒', label: 'リード発生時の初動' },
    { value: '24', unit: '/7', label: 'AI 稼働' },
    { value: '3', unit: 'モジュール', label: 'Live / Calendar / Email' },
  ],
  painsHeading: 'リードが商談に変わらない、3 つの構造',
  proofHeading: 'Meeton ai で生まれた商談創出の成果',
  primaryCtaLabel: 'リード商談化チェックリストを受け取る',
  // 2026-05-23 GPT review: 数字断定 (42時間 / 10-20% / 20-30%) は出典が
  // なければ広告 LP では危険なので、感覚値ベースの表現に softening。
  pains: [
    {
      title: '問い合わせ後のフォローが追いつかない',
      body: 'フォーム送信されてから営業の最初の連絡までに時間がかかると、その間にリードの温度が冷め、競合に流れていきます。',
      signal: '問い合わせ後の初動が遅れるほど、リードの温度は下がりやすくなります',
    },
    {
      title: 'MQL → SQL の歩留まりが悪い',
      body: '資料 DL や問い合わせで MQL は積み上がるのに、Inside Sales のキャパや判定基準が追いつかず SQL に変換されない。',
      signal: 'MQL が積み上がっても、SQL に変換されるのは一部にとどまりがちです',
    },
    {
      title: 'ナーチャリングが「とにかく送る」になっている',
      body: 'MA で開封されないステップメールが流れているだけで、リードの行動文脈に合わせた個別アプローチができない。',
      signal: '一斉配信のメールだけでは、個別の検討文脈に合わせた商談化は難しくなります',
    },
  ],
  solutions: [
    {
      badge: 'AI チャット',
      title: 'Meeton Live',
      body: 'フォーム送信・サンクスページ・サイト再訪の瞬間に AI SDR がリアルタイムで会話。資料 DL 文脈や過去履歴を引き継いだ深い質問にも即応し、温度が高いうちに商談予約まで完結します。',
      href: '/features/ai-chat/',
    },
    {
      badge: 'AI 商談予約',
      title: 'Meeton Calendar',
      body: 'リードがコンバートした瞬間に AI が担当者を割り振り、温度が高い瞬間に商談予約を提示。フォーム送信・サンクスページ・メール経由のどこからでも発動します。',
      href: '/features/meetings/',
    },
    {
      badge: 'AI フォロー',
      title: 'Meeton Email',
      body: '即時予約しなかったリードに対し、AI が 1:1 で文脈に沿った追客を支援 / 自動化。MA テンプレ配信ではなく、リードの行動シグナルに合わせて内容・タイミング・トーンを動的に判断します。',
      href: '/features/ai-email/',
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
      title: 'リードコンバートの瞬間を検知',
      body: 'フォーム送信 / 資料 DL / サンクスページ表示 / サイト再訪 — すべての conversion トリガーを AI が即時検知します。',
    },
    {
      title: 'リアルタイムに初動応答',
      body: 'Meeton Live が即時に会話を開始 (Email 流入の場合は 1:1 AI 返信)。担当者の都合に依存しません。',
    },
    {
      title: '温度に合わせて商談予約 or 追客',
      body: '関心が高ければ Meeton Calendar で商談予約まで完結。まだ早い場合は Meeton Email で 1:1 追客に切り替えます。',
    },
    {
      title: 'CRM へ自動同期',
      body: '会話・流入経路・興味カテゴリ・商談化結果が、コンタクト単位で HubSpot / Salesforce に自動書き戻し。アトリビューションが消えません。',
    },
  ],
  faqs: [
    {
      question: '既存の MA (HubSpot / Marketo / Pardot) との関係は？',
      answer:
        '置き換える必要はありません。Meeton ai は MA / CRM が引き渡した先の「商談化のラストワンマイル」を担います。既存スタックの上に被せて使う設計です。HubSpot / Salesforce はネイティブ連携済み。',
    },
    {
      question: 'どのくらいで商談化率の改善が見えますか？',
      answer:
        '業種・運用設計によりますが、AI チャット経由で商談化率 60%+ を実現している事例があります (EdulinX)。リアルタイム初動 + 文脈に沿った会話が主因。導入直後から会話・資料提案・商談予約のログを確認でき、多くの企業で 1〜2 週間で初期シグナルが見えてきます。',
    },
    {
      question: 'シナリオ設計や FAQ 作り込みは必要ですか？',
      answer:
        '複雑なシナリオ設計は不要です。Meeton Live は生成 AI ベースで、貴社の公式情報 (サイト・資料・FAQ・過去問い合わせ) を学習データとし、未定義の質問にも文脈で応答します。AI が回答できない場合は、担当者への接続や関連資料の提案に自動で切り替えます。',
    },
    {
      question: '問い合わせ後のスピード対応だけで成果が出るのですか？',
      answer:
        'リアルタイム初動は最重要因子の 1 つですが、それだけではありません。Meeton ai は会話の中で温度感を判定し、ヒアリングを進め、適切なタイミングで商談予約 or 追客 or 資料提案を選択します。「対応が早い」ではなく「商談に変える」までを設計しています。',
    },
    {
      question: '小規模なリード数でも導入する意味はありますか？',
      answer:
        '月数百件のリードでも、初動を即時に取れるかどうかは商談化率に直結するので、規模より「取りこぼし許容度」が判断軸です。月 10 件でも 1 件が数百万円の B2B 案件なら、初動の自動化は価値があります。',
    },
    {
      question: 'セキュリティはどうなっていますか？',
      answer:
        'ISMS（ISO/IEC 27001・27017）認証を取得済みです。顧客データは AES-256 で保管、社内アクセスは最小権限。HubSpot / Salesforce との連携も official OAuth scope のみ。セキュリティチェックシート対応、NDA 締結、アクセス権限管理にも個別対応可能。詳細は情報セキュリティポリシーを参照してください。',
    },
  ],
  finalCta: {
    heading: 'リードを商談化できているか、10 分で点検しませんか？',
    sub: '自己診断シート (PDF, A4 3 ページ) に沿って、自社の問い合わせ後フロー / ナーチャー設計 / 商談化率を点検できます。結果次第で、AI SDR がどこに差し込めるかを 30 分の相談でさらに具体的に詰めることもできます。',
  },
  accent: '#3b6ff5',
  utmCampaignBase: '2026q2_lead_to_meeting',
  pageUrl: PAGE_URL,
}

export default function LeadToMeetingPage() {
  return <SolutionLpTemplate config={config} />
}
