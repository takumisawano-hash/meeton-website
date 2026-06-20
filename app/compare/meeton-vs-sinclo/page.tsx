import type { Metadata } from 'next'
import ComparePage, { type CompareConfig } from '../components/ComparePage'

/**
 * /compare/meeton-vs-sinclo/ — Comparison LP.
 *
 * Target intent: "Meeton sinclo 比較" / "sinclo 代替" / "AI SDR sinclo 違い"
 *
 * Positioning: sinclo はシナリオ型 chatbot の老舗で Web 接客 / FAQ 自動化に強い。
 * Meeton は LLM ベースの文脈理解 + 商談予約完結 + シナリオ設計不要。
 */

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'sinclo（シンクロ）とAI代替を比較｜Web接客チャットの乗り換えガイド｜Meeton ai',
  description:
    'sinclo (シナリオ型 Web 接客 chatbot) と Meeton ai (AI SDR) を、機能・運用負荷・商談予約完結度で並べて比較。乗り換えに向く企業 / 向かない企業を公正に整理しました。',
  alternates: {
    canonical: '/compare/meeton-vs-sinclo/',
  },
  openGraph: {
    title: 'sinclo（シンクロ）とAI代替を比較｜Web接客チャットの乗り換えガイド｜Meeton ai',
    description:
      'シナリオ型 chatbot から AI SDR へ。sinclo と Meeton ai を機能ごとに公正比較。',
    url: 'https://dynameet.ai/compare/meeton-vs-sinclo/',
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
  slug: 'meeton-vs-sinclo',
  competitor: 'sinclo',
  competitorPositioning:
    'シナリオ型 chatbot / Web 接客の老舗 SaaS。FAQ 自動化や有人チャット連携で広く使われる。',
  eyebrow: 'Compare',
  heroH1: ['sinclo か、Meeton ai か。', 'シナリオ型と AI SDR、最適解の見極め方'],
  heroSub:
    'sinclo はシナリオ型 Web 接客 chatbot の代表格として、多くの企業の FAQ 自動化を支えてきました。一方 Meeton ai は LLM ベースの AI SDR として、シナリオ設計ゼロで商談予約まで完結します。本ページでは公開情報および一般的な業界認識をもとに、買い手目線で機能・運用・商談化までを並べて整理します。',
  rows: [
    {
      category: 'コア機能',
      categoryNote: 'チャットの土台となるエンジン',
      competitor: { state: 'partial', text: '一般的にはシナリオ型 (分岐 + キーワード)。AI 拡張は別オプションの位置づけ' },
      meeton: { state: 'yes', text: 'LLM ネイティブ。文脈・意図を理解して動的に応答' },
    },
    {
      category: 'シナリオ設計',
      categoryNote: '導入時の運用負荷',
      competitor: { state: 'partial', text: '分岐・条件・FAQ 集を設計する運用が前提。育てる工数が継続的に発生' },
      meeton: { state: 'yes', text: 'シナリオ設計不要。サイト・資料・FAQ を学習させるだけで稼働開始' },
    },
    {
      category: '商談予約 (Meeting Book)',
      categoryNote: 'チャットから直接 商談確定まで',
      competitor: { state: 'partial', text: '公開情報では、外部カレンダー連携は限定的またはカスタム実装' },
      meeton: { state: 'yes', text: 'Google Calendar / Teams / Zoom とネイティブ連携。チャット内で即座に予約完了' },
    },
    {
      category: 'CRM 連携',
      categoryNote: 'コンタクト・商談記録の自動書き戻し',
      competitor: { state: 'partial', text: '一般的には API / Webhook 経由のカスタム連携が中心' },
      meeton: { state: 'yes', text: 'HubSpot / Salesforce ネイティブ。会話・流入経路・興味カテゴリを自動同期' },
    },
    {
      category: '初動対応速度',
      categoryNote: 'リード発生から最初の応答まで',
      competitor: { state: 'yes', text: 'チャット応答自体は即時 (シナリオ範囲内)' },
      meeton: { state: 'yes', text: '5 秒で AI が会話開始。営業時間外も 24/7 商談化' },
    },
    {
      category: 'インバウンドメール対応',
      categoryNote: '問い合わせメールへの自動返信・商談化',
      competitor: { state: 'no', text: '一般的には Web チャット領域に特化' },
      meeton: { state: 'yes', text: 'Meeton Email モジュールが AI で 24/7 返信・商談予約まで実行' },
    },
    {
      category: '資料レコメンド',
      categoryNote: '訪問履歴に応じた動的コンテンツ提案',
      competitor: { state: 'partial', text: 'シナリオ内で固定的に提示する形が一般的' },
      meeton: { state: 'yes', text: 'Meeton Library が訪問者の興味文脈に合わせ動的レコメンド' },
    },
    {
      category: 'セットアップ時間',
      categoryNote: 'タグ設置から本格稼働まで',
      competitor: { state: 'partial', text: 'シナリオ設計込みで数日〜数週間。継続的なメンテも必要' },
      meeton: { state: 'yes', text: 'タグ 1 行・最短 5 分で設置。AI 事前学習後 即日商談創出' },
    },
    {
      category: '対応言語',
      categoryNote: '多言語サイトでの運用',
      competitor: { state: 'partial', text: '基本は日本語想定。多言語はシナリオ別途構築' },
      meeton: { state: 'yes', text: 'LLM ベースで日英ほか自動対応。多言語サイトでも単一導入' },
    },
    {
      category: '想定 ICP',
      categoryNote: '主たる利用ユースケース',
      competitor: { state: 'yes', text: 'EC・toC サイトの FAQ 自動化 / 接客' },
      meeton: { state: 'yes', text: 'B2B SaaS / 製造業 / 専門サービスの商談化' },
    },
  ],
  useCases: {
    forCompetitor:
      'すでに FAQ 集が整備されており、シナリオ分岐で 80% の問い合わせがカバーできる EC / toC 寄りの自社サイトを運営している場合、sinclo の運用知見と価格帯が活きます。Web 接客とコンバージョン補助の枠で完結する用途では、いまも合理的な選択肢です。',
    forMeeton:
      'B2B でリードを商談まで運びたい場合、また「シナリオを設計し続ける運用」から脱したい場合は Meeton ai が向きます。Inside Sales のキャパが頭打ち、初動 24 時間を超えると失注、CRM 上で経路がブラックボックス、といった構造課題を抱えるなら、AI SDR への移行が定石です。',
  },
  differentiators: [
    {
      tag: 'AI 文脈理解',
      title: 'シナリオを書かない。AI が文脈で答える',
      body: 'sinclo に代表されるシナリオ型は、想定外の質問が来た瞬間に運用負荷が露呈します。Meeton ai は LLM が会話の意図と背景を理解し、サイト・資料・FAQ を横断して即応します。シナリオ設計工数がゼロになり、コンテンツ更新だけで AI が成長します。',
    },
    {
      tag: '商談予約 NATIVE',
      title: 'チャット内で商談確定まで完結',
      body: 'Google Calendar / Microsoft Teams / Zoom と直接連携し、関心が高まった瞬間にカレンダーを提示して商談を確定します。後追いメールも、人手の調整も不要。「初動 5 秒 → 商談確定」までを 1 セッションで実現します。',
    },
    {
      tag: 'B2B 設計',
      title: 'HubSpot / Salesforce にネイティブ書き戻し',
      body: 'B2B のリード価値は「誰が・どこから来て・何を求めたか」が CRM に残るかで決まります。Meeton ai は会話・流入経路・興味カテゴリ・商談化結果をネイティブ同期。アトリビューションが消えずに残り、CMO がレベニューに対して説明責任を果たせる状態をつくります。',
    },
  ],
  faq: [
    {
      question: 'sinclo から Meeton ai に乗り換えるデータ移行はどうなりますか？',
      answer:
        'シナリオ設計そのものは Meeton ai では不要なため、移行する必要はありません。代わりにサイト・資料・FAQ・既存問い合わせログを学習データとして取り込むことで、過去 sinclo で対応してきた範囲を AI が即座にカバーできる状態にします。導入時のオンボーディングで弊社が設計支援します。',
    },
    {
      question: 'sinclo より価格は高いですか？',
      answer:
        '機能レイヤーが異なるため単純比較は困難ですが、Meeton ai は「商談予約まで完結する AI SDR」として、シナリオ型 chatbot 単体と比べて商談化価値ベースで評価されることが多いツールです。具体的な見積りはデモ時に、想定リード数・商談単価をもとに効果試算込みでご案内します。',
    },
    {
      question: '既存の sinclo を残しながら、Meeton ai を並行運用できますか？',
      answer:
        '可能です。たとえばサポート FAQ は sinclo、営業導線は Meeton ai と用途で住み分けるパターンや、移行期間中の並行稼働も多く運用されています。タグ設置だけで導入できるため、段階的に切り替えやすい設計です。',
    },
    {
      question: 'AI が誤回答をした場合、どう制御できますか？',
      answer:
        'Meeton ai は「答えない / 担当に繋ぐ」ことを安全側のデフォルトとし、与えていない情報を勝手に補完しない設計です。NG ワード、回答禁止トピック、有人エスカレーション条件は管理画面から設定可能。会話ログは全件確認・チューニング対象になります。',
    },
    {
      question: 'B2B ではなく toC のサイトでも使えますか？',
      answer:
        'Meeton ai は B2B 営業特化で設計しているため、商談予約 (Meeting Book) の価値が顕著に出るのは B2B / 検討期間が長い toC 商材です。EC のような即決購買・大量低単価コンバージョン用途では、sinclo のようなシナリオ型のほうがフィットするケースがあります。',
    },
    {
      question: 'デモではどんなことが確認できますか？',
      answer:
        '自社サイトの実際のリードジャーニーを共有いただければ、どこに sinclo を残し、どこを Meeton ai に置き換えるか、その場でアーキテクチャ図を描いてお渡しします。30 分で意思決定に必要な情報が揃うように設計しています。',
    },
  ],
  utmCampaign: 'compare-sinclo',
}

export default function MeetonVsSincloPage() {
  return <ComparePage config={config} />
}
