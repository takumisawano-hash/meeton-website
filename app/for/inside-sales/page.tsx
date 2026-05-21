import type { Metadata } from 'next'
import PersonaPage, { type PersonaConfig } from '../components/PersonaPage'

/**
 * /for/inside-sales/ — Persona LP for Inside Sales Managers.
 *
 * Target intent: "Inside Sales マネージャー AI" / "IS 効率化 ツール" /
 *                "初動対応 自動化"
 *
 * Hypothesis: IS managers struggle with low-quality lead glut, manual
 * qualification work, and missed follow-ups. Position Meeton ai as the
 * "AI teammate" that auto-qualifies and replies, freeing IS for high-value
 * calls and complex deals.
 */

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'インサイドセールス向け AI SDR | 初動対応を自動化 | Meeton ai',
  description:
    'インサイドセールスマネージャーが直面する「低品質リードの洪水」「手動クオリフィケーション」「フォロー漏れ」を、AI SDR Meeton ai で解消。IS は本来の高付加価値業務に集中できます。',
  alternates: {
    canonical: '/for/inside-sales/',
    languages: {
      'ja-JP': 'https://dynameet.ai/for/inside-sales/',
      'en-US': 'https://dynameet.ai/en/for/inside-sales/',
      'x-default': 'https://dynameet.ai/for/inside-sales/',
    },
  },
  openGraph: {
    title: 'インサイドセールス向け AI SDR | 初動対応を自動化',
    description:
      '低品質リード対応と日程調整を AI に。IS は商談・複雑案件・既存深耕に集中できる構造へ。',
    url: 'https://dynameet.ai/for/inside-sales/',
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

const config: PersonaConfig = {
  slug: 'inside-sales',
  eyebrow: 'For Inside Sales Managers',
  personaJa: 'インサイドセールスマネージャー',
  heroH1: ['低品質リードと日程調整から、', 'IS チームを解放する'],
  heroSub:
    '届いたリードのほとんどは情報収集段階。だが「全件対応」が建前として残り、IS のリソースは初動・選別・調整に吸い込まれていく。Meeton ai が AI SDR として一次対応を引き受け、IS は本当に動くべき案件にだけ向き合えます。',
  pains: [
    {
      title: '低品質リードの洪水で、IS が本来の業務に向かえない',
      body: 'フォーム経由のリードは情報収集・学生・コンペチェックなど幅広い。だが「全件 24 時間以内対応」の運用ルールに縛られ、IS の時間がクオリフィケーションに溶けていく。',
      signal: '多くの場合、流入リードの 6〜7 割は商談化に至らない情報収集層',
    },
    {
      title: '手動クオリフィケーションで、メンバー間の判断が揺れる',
      body: 'BANT・MEDDIC を運用していても、メンバー間の解釈差で「同じリード」が違う扱いになる。優先度判定の属人化が、月末の商談化率を不安定にする。',
      signal: 'IS チーム規模が 5 名を超えると、判断基準の揺らぎが顕在化しやすい',
    },
    {
      title: 'フォローアップが抜け落ち、商談機会を逃している',
      body: '「Day 3 にフォロー」「再訪したらメール」など、運用ルールはあっても全件実行は現実的でない。リスト管理ツールでアラートを立てても、メンバーが追いつかない。',
      signal: '業界平均で、3 回以上の有効フォロー前に商談化するリードは少数派',
    },
  ],
  moduleMapping: [
    {
      key: 'live',
      reason:
        'サイト訪問の瞬間に AI が会話で温度感を判定。情報収集層は会話とコンテンツで満足してもらい、購買意向の高いリードだけが IS に引き渡されます。',
    },
    {
      key: 'email',
      reason:
        '送信フォーム直後の AI 自動返信、Day 1/3/5 の AI フォロー、返信への AI 応答まで自動化。IS の「あとで返す」を構造的にゼロにします。 未予約リード追客だけでなく、CRM 内の休眠リード・過去 MQL の再アプローチも Meeton Email が AI で自動化。IS の追客対象を「新規」だけでなく「既存資産」まで拡張しつつ、手動工数はゼロです。',
    },
    {
      key: 'library',
      reason:
        '再訪・興味推移を AI が追い、最適な資料を自動提案。情報収集層が自分のペースで意思決定を進められるため、IS が押し売りで疲弊しません。',
    },
    {
      key: 'calendar',
      reason:
        '商談確定までを AI が完結。日程調整メールのラリーから IS を解放し、リードタイム短縮と商談数の両立を実現します。',
    },
  ],
  faq: [
    {
      question: 'IS のメンバー数を減らすツールですか？',
      answer:
        '違います。Meeton ai は IS の「コア業務以外」を引き受ける AI 同僚です。一次対応・温度感判定・日程調整を肩代わりすることで、メンバーは商談・既存深耕・複雑案件に集中できます。',
    },
    {
      question: 'AI クオリフィケーションの精度は信用できますか？',
      answer:
        '会話ログ・興味タグ・サイト行動から温度感を判定し、しきい値に応じて IS にハンドオフされます。会話履歴は全件 CRM に保存されるため、しきい値の検証・調整が可能です。誤判定は運用しながら継続的にチューニングできます。',
    },
    {
      question: '既存の SFA / CRM のワークフローを変える必要がありますか？',
      answer:
        '基本的に既存ワークフローはそのまま使えます。HubSpot / Salesforce にネイティブ連携し、AI が判定した「ホットリード」は通常の SDR/IS タスクとして自動的にキューに入ります。',
    },
    {
      question: 'IS マネージャーが見る KPI は変わりますか？',
      answer:
        'これまでの「対応件数」「商談化率」に加え、「AI 一次対応率」「IS 引き継ぎ後の商談化率」「フォロー漏れ件数」が見やすくなります。マネージャーは品質判断とコーチングに時間を割けるようになります。',
    },
    {
      question: '電話 SDR との併用はできますか？',
      answer:
        'はい。Meeton ai は Web 接点・メール接点の自動化が中心です。電話 SDR はインバウンドのうち「AI が会話で温まったリード」を優先架電する構成が一般的で、コンタクト効率と接続率が改善します。',
    },
    {
      question: 'チャットの会話を IS が確認することはできますか？',
      answer:
        '可能です。すべての会話ログは CRM コンタクトに紐づき、IS は商談前の事前理解に活用できます。AI が事前ヒアリングまで済ませた状態で、IS は本題の提案から開始できます。',
    },
      {
      question: 'CRM に眠るリードの再アプローチも IS で対応すべきですか？人手が足りません。',
      answer:
        'Meeton Email が AI で自動化するため、IS が手動で追う必要はありません。Meeton Email が CRM データから再検討タイミングを検知し、文脈に沿った 1:1 再アプローチを実行。返信や再訪があった「温度の戻ったリード」だけが IS に通知されるため、対応すべきリードに集中できます。',
    },
  ],
  accent: '#0891b2',
  utmCampaign: 'persona-inside-sales',
}

export default function InsideSalesPersonaPage() {
  return <PersonaPage config={config} />
}
