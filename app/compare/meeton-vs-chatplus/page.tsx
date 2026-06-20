import type { Metadata } from 'next'
import ComparePage, { type CompareConfig } from '../components/ComparePage'

/**
 * /compare/meeton-vs-chatplus/ — Comparison LP.
 *
 * Target intent: "Meeton ChatPlus 比較" / "ChatPlus AI" / "チャットボット AI 切替"
 *
 * Positioning: ChatPlus は AI 対応 chatbot、低価格帯、シナリオ + AI 併用。
 * Meeton ai は B2B 営業特化、商談予約まで完結、CRM 連携深い。
 */

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'ChatPlus とAI代替を比較｜チャットボットの乗り換えガイド',
  description:
    'ChatPlus (AI 対応 chatbot、低価格帯) と Meeton ai (B2B 営業特化 AI SDR) を、機能・商談予約・CRM 連携・商談化価値で公正に並べて比較。乗り換え判断に必要な情報を整理しました。',
  alternates: {
    canonical: '/compare/meeton-vs-chatplus/',
  },
  openGraph: {
    title: 'ChatPlus とAI代替を比較｜チャットボットの乗り換えガイド｜Meeton ai',
    description:
      'ChatPlus と Meeton ai を機能ごとに公正比較。シナリオ + AI 併用 vs LLM ネイティブ AI SDR。',
    url: 'https://dynameet.ai/compare/meeton-vs-chatplus/',
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

const config: CompareConfig = {
  slug: 'meeton-vs-chatplus',
  competitor: 'ChatPlus',
  competitorPositioning:
    'AI 対応 chatbot SaaS。シナリオ + AI 併用、低価格帯。日本国内の幅広い導入実績を持つ。',
  eyebrow: 'Compare',
  heroH1: ['ChatPlus か、Meeton ai か。', '汎用 chatbot と B2B AI SDR の選び方'],
  heroSub:
    'ChatPlus は AI 対応 chatbot として、低価格帯と幅広い導入実績で多くの企業に使われています。Meeton ai は B2B 営業に特化した AI SDR として、商談予約まで完結します。両者は機能領域が重なる部分もありますが、最適な用途は異なります。本ページでは公開情報および一般的な業界認識をもとに、買い手目線で並べて整理します。',
  rows: [
    {
      category: 'コア機能',
      categoryNote: 'プラットフォームの中心',
      competitor: { state: 'yes', text: 'AI 対応 chatbot (シナリオ + AI 併用)。汎用チャットボット' },
      meeton: { state: 'yes', text: 'B2B 営業特化 AI SDR。LLM ベース対話で商談予約まで完結' },
    },
    {
      category: 'AI 対話',
      categoryNote: 'チャットの応答エンジン',
      competitor: { state: 'partial', text: '一般的にはシナリオが主軸、AI 応答は補助的または別オプション' },
      meeton: { state: 'yes', text: 'LLM ネイティブ。文脈・意図を理解して動的に応答' },
    },
    {
      category: 'シナリオ設計',
      categoryNote: '導入時の運用負荷',
      competitor: { state: 'partial', text: '基本はシナリオ設計が前提。AI は補完的に動作' },
      meeton: { state: 'yes', text: 'シナリオ設計不要。サイト・資料・FAQ を学習させるだけで稼働開始' },
    },
    {
      category: '商談予約 (Meeting Book)',
      categoryNote: 'チャットから直接 商談確定まで',
      competitor: { state: 'partial', text: '公開情報では、外部カレンダー連携はあるがネイティブ完結ではない場合が多い' },
      meeton: { state: 'yes', text: 'Google Calendar / Teams / Zoom とネイティブ連携。即時予約完了' },
    },
    {
      category: 'CRM 連携',
      categoryNote: '商談記録の自動書き戻し',
      competitor: { state: 'partial', text: '主要 CRM 連携あり。一般的には Webhook / API 寄りの実装' },
      meeton: { state: 'yes', text: 'HubSpot / Salesforce ネイティブ。会話・興味・商談化結果まで自動同期' },
    },
    {
      category: 'インバウンドメール対応',
      categoryNote: '問い合わせメールへの AI 返信',
      competitor: { state: 'no', text: '公開情報では、Web チャット領域に特化' },
      meeton: { state: 'yes', text: 'Meeton Email モジュールが AI で 24/7 返信・商談予約まで' },
    },
    {
      category: '資料レコメンド',
      categoryNote: '訪問履歴に応じた動的提案',
      competitor: { state: 'partial', text: 'シナリオ内での固定提示が中心' },
      meeton: { state: 'yes', text: 'Meeton Library が訪問者の興味文脈に合わせ動的レコメンド' },
    },
    {
      category: '初動対応速度',
      categoryNote: 'リード発生から最初の応答まで',
      competitor: { state: 'yes', text: '応答自体は即時 (シナリオ範囲内)' },
      meeton: { state: 'yes', text: '5 秒で AI が会話開始。24/7 商談化対応' },
    },
    {
      category: '料金帯',
      categoryNote: '導入規模感',
      competitor: { state: 'yes', text: '低〜中価格帯。スモールスタート向き' },
      meeton: { state: 'partial', text: 'B2B 中堅〜エンタープライズ。商談単価 / LTV ベースの商談化価値で評価' },
    },
    {
      category: '想定 ICP',
      categoryNote: '主たる利用ユースケース',
      competitor: { state: 'yes', text: '幅広い業種・規模での FAQ 自動化 / Web 接客' },
      meeton: { state: 'yes', text: 'B2B SaaS / 製造業 / 専門サービスの商談化' },
    },
  ],
  useCases: {
    forCompetitor:
      'コーポレートサイトの FAQ 自動化、簡易な問い合わせ振り分け、低予算でまずチャットボットを導入したい — こういった用途では ChatPlus の価格帯と運用しやすさが活きます。商談化が中心 KPI ではなく、サポート負荷削減や接客の補助が優先課題なら、ChatPlus は実利のある選択肢です。',
    forMeeton:
      'B2B でリードを商談まで運ぶことが KPI、初動 5 秒で温度の高い瞬間を逃したくない、HubSpot / Salesforce 上でアトリビューションを残したい — これらに当てはまる場合は Meeton ai が向きます。価格帯は異なりますが、商談化価値ベースで評価すると合理化されるケースが大半です。',
  },
  differentiators: [
    {
      tag: 'B2B 営業特化',
      title: '汎用 chatbot ではなく、商談化に振り切った AI SDR',
      body: 'ChatPlus は幅広い業種・用途で使える汎用 chatbot として設計されています。Meeton ai は B2B のリード商談化プロセスを起点に設計されており、Inside Sales ハンドオフ、商談予約、CRM 書き戻しが標準機能です。商談化が KPI なら、専用設計の方が結果が早く出ます。',
    },
    {
      tag: '商談予約 完結',
      title: 'チャットから 商談確定まで、AI が完遂',
      body: 'Google Calendar / Microsoft Teams / Zoom と直結し、会話の温度が高まった瞬間にカレンダーを提示して商談を確定します。後追いメールや人手の調整は不要。「初動 5 秒 → 商談確定」まで 1 セッションで実現します。',
    },
    {
      tag: 'CRM NATIVE',
      title: 'HubSpot / Salesforce にネイティブ書き戻し',
      body: '会話・流入経路・興味カテゴリ・商談化結果が、コンタクト単位で CRM に自動同期されます。汎用 chatbot で発生しがちな「リードは取れているがアトリビューションがブラックボックス」を構造的に解消します。',
    },
  ],
  faq: [
    {
      question: 'ChatPlus と Meeton ai の最大の違いは何ですか？',
      answer:
        '設計思想の違いです。ChatPlus は幅広い業種・用途で使える汎用 chatbot として作られています。Meeton ai は B2B のリード商談化プロセスを起点に、商談予約完結 + CRM ネイティブ書き戻し + Inside Sales ハンドオフを標準搭載する AI SDR です。「商談化が中心 KPI かどうか」が選定の分岐点になります。',
    },
    {
      question: '料金は ChatPlus のほうが安いのでは？',
      answer:
        '価格表ベースでは ChatPlus のほうが低価格帯です。一方で評価軸を「商談化価値」に置くと、Meeton ai は商談単価 × 商談数で投資回収を考えるツールとなり、合理化されることが多い構成です。デモ時に想定リード数・商談単価をもとに効果試算込みでご案内します。',
    },
    {
      question: 'ChatPlus から乗り換える場合、シナリオは捨てることになりますか？',
      answer:
        'シナリオそのものは Meeton ai では不要なため、移行する必要はありません。代わりに学習データ (サイト・資料・FAQ・過去問い合わせログ) を取り込むことで、ChatPlus で対応してきた範囲を AI が即座にカバーする状態にします。シナリオを「捨てる」のではなく「不要になる」と理解いただくのが近いです。',
    },
    {
      question: 'AI 応答の精度はどう担保されますか？',
      answer:
        'Meeton ai は与えていない情報を勝手に補完しない安全側設計です。NG ワード・回答禁止トピック・有人エスカレーション条件は管理画面で制御可能。会話ログは全件確認・チューニングに回せます。誤回答リスクをコントロールしながら、シナリオ運用負荷をゼロにできます。',
    },
    {
      question: 'B2B でない用途でも導入できますか？',
      answer:
        'Meeton ai は B2B 営業特化で設計しているため、商談予約 (Meeting Book) の価値が顕著に出るのは B2B / 検討期間が長い toC 商材です。サポート FAQ 中心 / 即決購買 EC のような用途では、ChatPlus のような汎用 chatbot のほうが本来の価値を発揮します。',
    },
    {
      question: '導入から成果が出るまでの期間は？',
      answer:
        '初期設置はタグ 1 行・最短 5 分。AI 事前学習を経て、多くのケースで導入初週から商談創出が始まります。3 ヶ月以内に商談化率の有意な改善を確認している企業が複数あります。',
    },
  ],
  utmCampaign: 'compare-chatplus',
}

export default function MeetonVsChatPlusPage() {
  return <ComparePage config={config} />
}
