import type { Metadata } from 'next'
import PersonaPage, { type PersonaConfig } from '../components/PersonaPage'

/**
 * /for/cro/ — Persona LP for CRO / VP Sales.
 *
 * Target intent: "AI SDR CRO" / "Inside Sales 自動化 CRO" / "営業効率 AI 改善"
 *
 * Hypothesis: CROs are gated by SDR capacity and speed-to-lead. Position
 * Meeton ai as a capacity multiplier — 24/7 AI SDR, instant booking,
 * scale-out without headcount. Use 42hr→5sec as the headline positioning.
 */

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'CRO 向け AI SDR | 24時間稼働で商談数を底上げ | Meeton ai',
  description:
    'CRO が直面する「SDR キャパシティ天井」「初動 42 時間問題」「パイプライン量不足」を、24/7 稼働の AI SDR Meeton ai で突破。商談予約まで完全自動、即日稼働。',
  alternates: {
    canonical: '/for/cro/',
    languages: {
      'ja-JP': 'https://dynameet.ai/for/cro/',
      'en-US': 'https://dynameet.ai/en/for/cro/',
      'x-default': 'https://dynameet.ai/for/cro/',
    },
  },
  openGraph: {
    title: 'CRO 向け AI SDR | 24時間稼働で商談数を底上げ',
    description:
      'SDR キャパに依存しない、24/7 AI SDR。初動 5 秒、商談予約まで完全自動。CRO のパイプライン責任を AI が支えます。',
    url: 'https://dynameet.ai/for/cro/',
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
  slug: 'cro',
  eyebrow: 'For CROs / VP Sales',
  personaJa: 'CRO',
  heroH1: ['SDR キャパの天井を、', 'AI でスケールアウトする CRO へ'],
  heroSub:
    '人を増やさない限り、商談数は伸びない。だが採用も育成も追いつかない。Meeton ai は 24/7 稼働の AI SDR として、初動 5 秒で接触し、商談予約まで完全自動。CRO のパイプライン責任を、AI で支えます。',
  pains: [
    {
      title: 'SDR を増やさない限り、商談数の上限が動かない',
      body: 'インサイドセールスの一人あたり対応可能件数には物理的な上限がある。採用は数ヶ月、育成にはさらに数ヶ月。市況が変わるたびに「人手」起点で計画が崩れる。',
      signal: 'SDR 1 名あたり年間人件費は 800 万円超、立ち上げに 3〜6 ヶ月を要するのが一般的',
    },
    {
      title: '初動 42 時間問題で、見込み客の購買意欲を冷ましている',
      body: 'リードが入っても、SDR が翌日対応するうちに比較検討の競合が先に動く。「最初に対応した会社から購入する確率が最も高い」セオリーに反して、商談化率が伸びない。',
      signal: '業界平均で、初動が 24 時間を超えると商談化率は半分以下に落ちる',
    },
    {
      title: '深夜・休日・繁忙期、機会損失がブラックボックスになっている',
      body: '営業時間外の問い合わせは翌営業日まで放置。月末・四半期末は SDR が既存案件で手一杯。失っている商談数を、CRO が定量化できない。',
      signal: '多くの企業で、夜間・休日リードの 7 割以上が翌営業日には熱量を失っている',
    },
  ],
  moduleMapping: [
    {
      key: 'live',
      reason:
        'サイト訪問の瞬間に AI が会話を開始。SDR の労働時間に縛られず 24/7 稼働し、商談化率の高い「最初の接触」を AI が担保します。',
    },
    {
      key: 'calendar',
      reason:
        'チャット内・サンクスページ・メールから、AI が即座にカレンダーを提示。商談予約までを人手を介さず確定し、SDR の手戻りをゼロにします。',
    },
    {
      key: 'email',
      reason:
        'フォーム送信直後の自動返信 + Day 1/3/5 のフォローアップを AI が自動化。返信応答まで AI が担うため、SDR は商談に集中できます。 失注・休眠リードを CRM 上で待たせ続けるのではなく、Meeton Email が再検討シグナルを検知し、AI で 1:1 再アプローチ。営業の手間ゼロでパイプラインを再生成できます。',
    },
    {
      key: 'library',
      reason:
        '再訪リードの興味推移を AI が読み取り、最適な資料を自動提案。SDR が「温まったリード」のみを引き継げる構造に変わります。',
    },
  ],
  faq: [
    {
      question: '既存の Inside Sales チームを置き換えるツールですか？',
      answer:
        'いいえ。Meeton ai は SDR を置き換えるのではなく、SDR の初動対応と日程調整を肩代わりする「AI 同僚」です。SDR は商談・クロージング・複雑な顧客対応に集中できる構造になります。',
    },
    {
      question: '商談化率はどのくらい改善しますか？',
      answer:
        '業種により幅がありますが、AI チャット経由で商談化率 40% 超を実現している企業があります。「初動 5 秒」と「文脈に沿った会話」が主因と分析しています。具体数値は導入事例ページをご参照ください。',
    },
    {
      question: 'Salesforce / HubSpot と連携できますか？',
      answer:
        'はい。HubSpot とはネイティブ連携、Salesforce とも標準対応。会話ログ・興味タグ・商談予約情報がコンタクトに自動書き込みされるため、CRO のパイプラインレポートにそのまま反映されます。',
    },
    {
      question: 'CRO が見るべき KPI は変わりますか？',
      answer:
        'これまでの「SDR 一人あたり架電数 / 商談数」に加え、「AI 経由商談数」「初動応答時間」「コンタクト x 興味カテゴリの商談化率」が新しい指標として加わります。SDR の生産性ではなく、AI レイヤーを含む全体スループットで測る考え方になります。',
    },
    {
      question: '導入のリードタイムはどのくらいですか？',
      answer:
        'JavaScript タグ設置は 5 分、AI の事前設定を含めても最短当日で稼働できます。多くの企業で導入初週から商談創出が始まっています。',
    },
    {
      question: '失注リスクや AI の誤対応が心配です',
      answer:
        'Meeton ai はエスカレーション設計が標準。高難度の質問や明確な購買意向は人 SDR にハンドオフされます。会話ログは全件 CRM に記録され、品質モニタリングとファインチューニングが可能です。',
    },
      {
      question: 'CRM に眠る失注リードや過去商談からも商談を再生成できますか？',
      answer:
        'はい。失注リードや過去 MQL の再検討シグナルを Meeton Email が検知し、失注理由を踏まえた文面で 1:1 再アプローチします。再訪・返信があれば Meeton Live が会話を再開、Meeton Calendar が商談予約まで自動化。CRO 視点では、既存パイプラインから新規 ARR を生み出すレバーになります。',
    },
  ],
  accent: '#3b6ff5',
  utmCampaign: 'persona-cro',
}

export default function CroPersonaPage() {
  return <PersonaPage config={config} />
}
