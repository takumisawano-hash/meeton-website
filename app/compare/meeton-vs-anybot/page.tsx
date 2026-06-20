import type { Metadata } from 'next'
import ComparePage, { type CompareConfig } from '../components/ComparePage'

/**
 * /compare/meeton-vs-anybot/ — Comparison LP.
 *
 * Target intent: "Meeton anybot 比較" / "anybot 代替" / "B2B AI チャット"
 *
 * Positioning: anybot は LINE 連携が強み、to C 寄り。
 * Meeton ai は B2B 専用設計、HubSpot/Salesforce ネイティブ、商談予約。
 */

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'anybot とAI代替を比較｜チャットボットの乗り換えガイド',
  description:
    'anybot (LINE 連携が強み、toC 寄り chatbot) と Meeton ai (B2B 専用 AI SDR、HubSpot / Salesforce ネイティブ) を、用途・機能ごとに公正に並べて比較しました。',
  alternates: {
    canonical: '/compare/meeton-vs-anybot/',
  },
  openGraph: {
    title: 'anybot とAI代替を比較｜チャットボットの乗り換えガイド｜Meeton ai',
    description:
      'toC 寄り chatbot anybot と B2B 専用 AI SDR Meeton ai。買い手目線で機能を並べました。',
    url: 'https://dynameet.ai/compare/meeton-vs-anybot/',
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
  slug: 'meeton-vs-anybot',
  competitor: 'anybot',
  competitorPositioning:
    'LINE 連携を強みとする chatbot。toC キャンペーンや LINE 公式アカウント運用の自動化で広く使われる。',
  eyebrow: 'Compare',
  heroH1: ['anybot か、Meeton ai か。', 'LINE 連携と B2B AI SDR、用途の見極め'],
  heroSub:
    'anybot は LINE 連携を強みとした chatbot として、toC キャンペーンや LINE 公式アカウント運用で多く使われています。Meeton ai は B2B 営業に特化した AI SDR として、HubSpot / Salesforce ネイティブ連携と商談予約完結に振り切っています。両者は別の市場のソリューションですが、検討時に比較されることが多いため、公開情報および一般的な業界認識をもとに買い手目線で並べて整理します。',
  rows: [
    {
      category: 'コア機能',
      categoryNote: 'プラットフォームの中心',
      competitor: { state: 'yes', text: 'LINE 連携 chatbot。toC キャンペーン / 公式アカウント運用に強み' },
      meeton: { state: 'yes', text: 'B2B 営業特化 AI SDR。LLM ベース対話で商談予約まで完結' },
    },
    {
      category: '主たるチャネル',
      categoryNote: '会話が発生する場所',
      competitor: { state: 'yes', text: 'LINE が主軸。Web チャットも対応' },
      meeton: { state: 'yes', text: '自社 Web サイト / インバウンドメールが主軸' },
    },
    {
      category: 'AI 対話',
      categoryNote: 'チャットの応答エンジン',
      competitor: { state: 'partial', text: '一般的にはシナリオ + AI 補助。toC キャンペーン用途向け' },
      meeton: { state: 'yes', text: 'LLM ネイティブ。B2B 文脈の意図理解に最適化' },
    },
    {
      category: '商談予約 (Meeting Book)',
      categoryNote: 'チャットから直接 商談確定まで',
      competitor: { state: 'no', text: '公開情報では、ネイティブ機能としては明示されていない' },
      meeton: { state: 'yes', text: 'Google Calendar / Teams / Zoom とネイティブ連携。即時予約完了' },
    },
    {
      category: 'CRM 連携',
      categoryNote: '商談記録の自動書き戻し',
      competitor: { state: 'partial', text: '一般的には API / Webhook 経由のカスタム連携' },
      meeton: { state: 'yes', text: 'HubSpot / Salesforce ネイティブ。会話・興味・商談化結果まで自動同期' },
    },
    {
      category: 'Inside Sales 連携',
      categoryNote: 'IS チームへのリードハンドオフ',
      competitor: { state: 'no', text: '公開情報では、IS プロセス連携は中心スコープ外' },
      meeton: { state: 'yes', text: 'IS への即時アサイン・ホットリード通知・引き継ぎコンテキスト付与までネイティブ' },
    },
    {
      category: 'インバウンドメール対応',
      categoryNote: '問い合わせメールへの AI 返信',
      competitor: { state: 'no', text: '公開情報では、メール領域は中心スコープ外' },
      meeton: { state: 'yes', text: 'Meeton Email モジュールが AI で 24/7 返信・商談予約まで' },
    },
    {
      category: 'LINE 連携',
      categoryNote: 'LINE 公式アカウントとの統合',
      competitor: { state: 'yes', text: 'LINE 連携が中核機能。toC ユースケースで強み' },
      meeton: { state: 'no', text: 'LINE 連携は中心スコープ外。Web + メール + カレンダーに集中' },
    },
    {
      category: '初動対応速度',
      categoryNote: 'リード発生から最初の応答まで',
      competitor: { state: 'yes', text: 'LINE / Web で即時応答 (シナリオ範囲内)' },
      meeton: { state: 'yes', text: '5 秒で AI が会話開始。24/7 商談化対応' },
    },
    {
      category: '想定 ICP',
      categoryNote: '主たる利用ユースケース',
      competitor: { state: 'yes', text: 'toC ブランド / EC / キャンペーン運用' },
      meeton: { state: 'yes', text: 'B2B SaaS / 製造業 / 専門サービスの商談化' },
    },
  ],
  useCases: {
    forCompetitor:
      'LINE 公式アカウント運用が中核施策の toC 企業、LINE 経由でクーポン配布・予約・問い合わせ対応を自動化したい場合は anybot が向きます。toC キャンペーンに特化した運用ノウハウが豊富で、LINE エコシステムの中で完結できる用途では、本来の強みを発揮します。',
    forMeeton:
      'B2B でリードを商談まで運ぶことが KPI、Web サイト / インバウンドメールが主たる流入源、HubSpot / Salesforce での CRM 運用が前提 — これらに当てはまる場合は Meeton ai が向きます。LINE 連携が中心施策の企業は anybot を、B2B 営業導線が中心の企業は Meeton ai を、と棲み分けるのが自然です。',
  },
  differentiators: [
    {
      tag: 'B2B 専用設計',
      title: 'B2B 営業のラストワンマイルに振り切った設計',
      body: 'anybot は LINE エコシステムを起点に toC キャンペーンを得意とします。Meeton ai は B2B のリード商談化プロセスを起点に設計されており、Inside Sales ハンドオフ、商談予約、CRM ネイティブ書き戻しが標準機能です。B2B でリード商談化が KPI なら、専用設計のほうが結果が早く出ます。',
    },
    {
      tag: 'CRM NATIVE',
      title: 'HubSpot / Salesforce にネイティブ書き戻し',
      body: '会話・流入経路・興味カテゴリ・商談化結果が、コンタクト単位で CRM に自動同期されます。B2B のリード価値は「誰が・どこから来て・何を求めたか」が CRM に残るかで決まります。アトリビューションを構造的に消さない設計です。',
    },
    {
      tag: '商談予約 完結',
      title: 'チャットから 商談確定まで、AI が完遂',
      body: 'Google Calendar / Microsoft Teams / Zoom と直結し、会話の温度が高まった瞬間にカレンダーを提示して商談を確定します。後追いメールも、人手の調整も不要。「初動 5 秒 → 商談確定」まで 1 セッションで実現します。',
    },
  ],
  faq: [
    {
      question: 'anybot と Meeton ai は競合関係ですか？',
      answer:
        '厳密には別市場のソリューションです。anybot は LINE 連携を強みとする chatbot で、toC キャンペーン・LINE 公式アカウント運用が中心スコープ。Meeton ai は B2B の Web / メール / カレンダーを起点とする AI SDR です。検討時に比較されることが多いため、本ページで整理しています。',
    },
    {
      question: 'LINE 経由のリード対応はできますか？',
      answer:
        '現時点では LINE 連携は中心スコープ外です。Meeton ai は B2B の Web サイト訪問者 + インバウンドメール + カレンダー連携に集中しています。LINE が主たるチャネルの場合は anybot のほうが向きます。LINE + Web の両方を運用する場合、用途で住み分けるのが現実的な構成です。',
    },
    {
      question: 'toC 商材でも Meeton ai は使えますか？',
      answer:
        'Meeton ai の商談予約 (Meeting Book) 機能は、検討期間が長く 1 件あたり LTV が高い商材で価値が顕著に出ます。たとえば不動産・教育・コンサル・金融などの toC 高関与商材は対象になります。即決購買・低単価大量コンバージョン型の toC では、anybot のような汎用 chatbot のほうがフィットします。',
    },
    {
      question: 'B2B では Meeton ai 一択ということでしょうか？',
      answer:
        '用途次第です。B2B でリード商談化が KPI なら Meeton ai が定石ですが、社内 FAQ 自動化・ヘルプデスク補助のみで十分なケースでは、より汎用的な chatbot のほうがコスト面で合理化されることもあります。本ページの比較表と「Which One Fits You」セクションを意思決定の入口としてお使いください。',
    },
    {
      question: 'AI 応答の精度はどう担保されますか？',
      answer:
        'Meeton ai はサイト・資料・FAQ・既存問い合わせログを学習対象とし、与えていない情報を勝手に補完しない安全側設計です。NG ワード・回答禁止トピック・有人エスカレーション条件は管理画面で制御可能。会話ログは全件確認・チューニングに回せます。',
    },
    {
      question: 'デモではどんなことが確認できますか？',
      answer:
        '自社のリードジャーニーを共有いただければ、anybot / 既存ツールとの役割分担・Meeton ai に置き換えるべき領域を、その場でアーキテクチャ図に落としてお返しします。30 分で意思決定に必要な情報が揃うように設計しています。',
    },
  ],
  utmCampaign: 'compare-anybot',
}

export default function MeetonVsAnybotPage() {
  return <ComparePage config={config} />
}
