import type { Metadata } from 'next'
import ComparePage, { type CompareConfig } from '../components/ComparePage'

/**
 * /compare/meeton-vs-karte/ — Comparison LP.
 *
 * Target intent: "Meeton KARTE 比較" / "KARTE 代替" / "Web 接客 AI"
 *
 * Positioning: KARTE は Plaid の CX プラットフォーム、行動データ分析中心で
 * Web 接客機能を持つ。Meeton ai は商談予約ネイティブ + Inside Sales 連携。
 */

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'KARTE とAI代替を比較｜Web接客・CX の乗り換えガイド',
  description:
    'KARTE (Plaid の CX プラットフォーム) と Meeton ai (AI SDR) を、Web 接客・商談予約・Inside Sales 連携の観点で公正に並べて比較。乗り換え / 併用の判断に必要な情報を整理しました。',
  alternates: {
    canonical: '/compare/meeton-vs-karte/',
  },
  openGraph: {
    title: 'KARTE とAI代替を比較｜Web接客・CX の乗り換えガイド｜Meeton ai',
    description:
      '行動データ分析 + Web 接客の KARTE と、商談予約完結の AI SDR Meeton ai。買い手目線で機能を並べました。',
    url: 'https://dynameet.ai/compare/meeton-vs-karte/',
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
  slug: 'meeton-vs-karte',
  competitor: 'KARTE',
  competitorPositioning:
    'Plaid の CX プラットフォーム。行動データ解析を起点とした Web 接客で、EC や大規模サイトの CVR 改善に強い。',
  eyebrow: 'Compare',
  heroH1: ['KARTE か、Meeton ai か。', 'CX プラットフォームと AI SDR の使い分け'],
  heroSub:
    'KARTE は Plaid の CX プラットフォームとして、行動データ解析と Web 接客で EC やマーケのコンバージョン改善を支えてきました。Meeton ai は B2B の商談予約に特化した AI SDR です。両者は機能領域が重なる部分もありますが、最適な用途は異なります。本ページでは公開情報および一般的な業界認識をもとに、買い手目線で並べて整理します。',
  rows: [
    {
      category: 'コア機能',
      categoryNote: 'プラットフォームの中心ケイパビリティ',
      competitor: { state: 'yes', text: '行動データ解析 + Web 接客 (ポップアップ / バナー / チャット等)' },
      meeton: { state: 'yes', text: 'AI SDR — LLM ベースの対話で商談予約まで完結' },
    },
    {
      category: 'AI 対話',
      categoryNote: 'チャットの応答エンジン',
      competitor: { state: 'partial', text: '公開情報では、チャット機能はあるが LLM ネイティブの位置づけは限定的' },
      meeton: { state: 'yes', text: 'LLM ネイティブ。文脈・意図を理解して動的に応答' },
    },
    {
      category: '商談予約 (Meeting Book)',
      categoryNote: 'チャットから直接 商談確定まで',
      competitor: { state: 'no', text: '公開情報では、商談予約はネイティブ機能として明示されていない' },
      meeton: { state: 'yes', text: 'Google Calendar / Teams / Zoom とネイティブ連携。チャット内で即予約完了' },
    },
    {
      category: '行動データ分析',
      categoryNote: 'サイト訪問者のセグメント可視化',
      competitor: { state: 'yes', text: 'プラットフォームの中核。詳細な行動データ + セグメント設計' },
      meeton: { state: 'partial', text: '会話 + 訪問経路 + 興味カテゴリを CRM に同期。深い行動解析は MA / CDP に委ねる構成' },
    },
    {
      category: 'CRM 連携',
      categoryNote: 'コンタクト・商談記録の自動書き戻し',
      competitor: { state: 'partial', text: '一般的には Webhook / API 経由のカスタム連携' },
      meeton: { state: 'yes', text: 'HubSpot / Salesforce ネイティブ。会話・興味・商談化結果まで自動同期' },
    },
    {
      category: 'Inside Sales 連携',
      categoryNote: 'IS チームへのリードハンドオフ',
      competitor: { state: 'partial', text: '主にマーケ / EC オペレーター向けの設計' },
      meeton: { state: 'yes', text: 'IS への即時アサイン・ホットリード通知・引き継ぎコンテキスト付与までネイティブ' },
    },
    {
      category: 'インバウンドメール対応',
      categoryNote: '問い合わせメールへの AI 返信',
      competitor: { state: 'no', text: '公開情報では、Web 接客領域に特化' },
      meeton: { state: 'yes', text: 'Meeton Email モジュールが AI で 24/7 返信・商談予約まで' },
    },
    {
      category: '初動対応速度',
      categoryNote: 'リード発生から最初の応答まで',
      competitor: { state: 'partial', text: 'ポップアップ・バナーは即時。チャット応答は運用設計次第' },
      meeton: { state: 'yes', text: '5 秒で AI が会話開始。24/7 商談化対応' },
    },
    {
      category: '想定 ICP',
      categoryNote: '主たる利用ユースケース',
      competitor: { state: 'yes', text: '大規模 EC / マーケ / toC サービスの CVR 最適化' },
      meeton: { state: 'yes', text: 'B2B SaaS / 製造業 / 専門サービスの商談化' },
    },
    {
      category: '料金帯',
      categoryNote: '導入規模感',
      competitor: { state: 'partial', text: '一般的にはエンタープライズ規模の予算が前提' },
      meeton: { state: 'yes', text: 'B2B 中堅〜エンタープライズ。商談単価 / LTV ベースの商談化価値で評価' },
    },
  ],
  useCases: {
    forCompetitor:
      '大規模 EC や toC サブスクで、行動データを起点に「いつ・誰に・どのバナーを出すか」を最適化したい場合は KARTE が向きます。CX プラットフォームとしての行動分析・パーソナライゼーションの深さは、B2B 用途では過剰になることも多く、KARTE 本来の価値が出る領域です。',
    forMeeton:
      'B2B でリードを商談まで運びたい、Inside Sales のキャパを AI で底上げしたい、CRM 上で商談化アトリビューションを残したい — このいずれかが優先課題なら Meeton ai が向きます。両者は補完関係でもあり、CX 分析は KARTE、商談化導線は Meeton ai という構成も有効です。',
  },
  differentiators: [
    {
      tag: '商談予約 NATIVE',
      title: 'チャットから 商談確定まで、人手を介さない',
      body: 'KARTE は CX プラットフォームとして Web 接客の精度を高めますが、商談予約はネイティブ機能ではありません。Meeton ai は Google Calendar / Teams / Zoom と直結し、会話の温度が高まった瞬間にカレンダーを提示して商談を確定します。「初動 5 秒 → 商談確定」まで AI が完遂します。',
    },
    {
      tag: 'IS 連携',
      title: 'Inside Sales のキャパを AI で多重化',
      body: 'Meeton ai は B2B の Inside Sales プロセスを起点に設計されています。AI が一次対応で会話・興味抽出・商談予約まで実行し、IS には「すでに温まった商談」だけが届きます。SDR キャパに依存しないパイプライン生成が可能になります。',
    },
    {
      tag: 'CRM NATIVE',
      title: 'HubSpot / Salesforce にネイティブ書き戻し',
      body: '会話・流入経路・興味カテゴリ・商談化結果が、コンタクト単位で CRM に自動同期されます。OFFLINE / INTEGRATION に潰れがちなアトリビューションが消えずに残り、CMO がチャネル別の商談化貢献を経営に説明できる状態になります。',
    },
  ],
  faq: [
    {
      question: 'KARTE と Meeton ai は併用できますか？',
      answer:
        '可能です。実際、CX 分析・パーソナライゼーションは KARTE、商談化導線は Meeton ai という構成は理にかなっています。KARTE の行動データセグメントを Meeton ai の起動条件として活用するなど、お互いの強みを足す構成が組めます。デモ時にアーキテクチャ案を提示します。',
    },
    {
      question: 'KARTE から Meeton ai に置き換えるべきケースはどんな時ですか？',
      answer:
        '主に B2B でリード商談化が KPI の中心であり、KARTE の CX 分析機能を十分に活用しきれていないケースです。Web 接客は使っているが商談予約まで人手で繋いでいる、CRM への書き戻しがブラックボックス、Inside Sales のキャパが頭打ち — これらが揃う場合は Meeton ai に主導権を移す合理性が高まります。',
    },
    {
      question: '料金は KARTE と比べてどうですか？',
      answer:
        '価格モデルが異なるため単純比較は難しいです。KARTE は CX プラットフォーム全体のサイト規模ベース、Meeton ai は商談化価値ベースで評価されることが多いツールです。商談単価・想定リード数を共有いただければ、デモ時に効果試算込みでご案内します。',
    },
    {
      question: 'B2B 向けには Meeton ai が向いている、と理解して良いですか？',
      answer:
        'はい。Meeton ai は B2B の商談化プロセスを起点に設計されており、HubSpot / Salesforce ネイティブ連携、Inside Sales ハンドオフ、商談予約完結が標準機能です。toC / 大規模 EC のような行動分析中心のユースケースでは、KARTE のほうが本来の強みを発揮します。',
    },
    {
      question: 'AI の精度はどう担保されますか？',
      answer:
        'Meeton ai はサイト・資料・FAQ・既存問い合わせログを学習対象とし、与えていない情報を勝手に補完しない安全側設計です。NG ワード・回答禁止トピック・有人エスカレーション条件は管理画面で制御可能。会話ログを全件確認・チューニングに回せます。',
    },
    {
      question: '導入から成果が出るまでの期間は？',
      answer:
        '初期設置はタグ 1 行・最短 5 分。AI の事前学習後、多くのケースで導入初週から商談創出が始まります。3 ヶ月以内に商談化率の有意な改善を確認している企業が複数あります。',
    },
  ],
  utmCampaign: 'compare-karte',
}

export default function MeetonVsKartePage() {
  return <ComparePage config={config} />
}
