import type { Metadata } from 'next'
import PersonaPage, { type PersonaConfig } from '../components/PersonaPage'

/**
 * /for/marketing-manager/ — Persona LP for B2B Marketing Managers.
 *
 * Target intent: "B2B マーケ マネージャー AI" / "リード 育成 自動化" /
 *                "ナーチャリング AI"
 *
 * Hypothesis: Marketing managers struggle with nurture sequence decay,
 * declining engagement signals, and lead quality drift. Position
 * Meeton Library + Email as the AI nurture layer that revives returning
 * leads and surfaces real engagement signals.
 */

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'B2B マーケマネージャー向け AI ナーチャリング | Meeton ai',
  description:
    'B2B マーケマネージャーが直面する「ナーチャリングの形骸化」「エンゲージメント信号の不在」「リード品質低下」を、AI SDR Meeton ai で再生。再訪リードを商談へ運ぶ AI ライブラリ + AI メール。',
  alternates: {
    canonical: '/for/marketing-manager/',
    languages: {
      'ja-JP': 'https://dynameet.ai/for/marketing-manager/',
      'en-US': 'https://dynameet.ai/en/for/marketing-manager/',
      'x-default': 'https://dynameet.ai/for/marketing-manager/',
    },
  },
  openGraph: {
    title: 'B2B マーケマネージャー向け AI ナーチャリング',
    description:
      'ナーチャリングを AI が引き継ぐ。再訪リードに最適な資料を自動提案し、商談化までを伴走します。',
    url: 'https://dynameet.ai/for/marketing-manager/',
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
  slug: 'marketing-manager',
  eyebrow: 'For Marketing Managers',
  personaJa: 'B2B マーケマネージャー',
  heroH1: ['ナーチャリングの形骸化を、', 'AI で再生する'],
  heroSub:
    'ステップメールは組んだ。ダウンロード資料も増やした。だが開封率は落ち続け、再訪リードを商談につなぐ手応えが薄い。Meeton ai はサイト訪問・興味・再訪パターンを AI が読み解き、ナーチャリングを「届けて読まれる」ものに戻します。',
  pains: [
    {
      title: 'ステップメールが形骸化し、開封・反応が枯れている',
      body: '一律のシナリオでは、興味の幅も時期も違う読み手に刺さらない。配信を増やすほど解除率が上がり、ナーチャリングが「成果のないルーティン」になっていく。',
      signal: '業界平均で、3 通目以降の MA 配信は初回比で開封率が大幅に低下する傾向',
    },
    {
      title: 'エンゲージメント信号がメール開封のみで、行動を捉えられていない',
      body: 'リード再訪・滞在ページ・閲覧資料といった「熱量を示す行動信号」が、MA レポートに反映されない。スコアリングはメール反応に偏り、ホットなリードを取りこぼす。',
      signal: '多くの場合、再訪リードの 7 割以上は MA のスコア上「コールド」扱いのまま埋もれる',
    },
    {
      title: 'リード品質が落ち、CRO から「リードが弱い」と詰められる',
      body: '広告チャネルの最適化に時間を取られ、コンテンツ施策にリソースが回らない。結果、流入リードは増えても商談に至らず、「マーケ起点パイプライン」の存在感が薄れる。',
      signal: 'CRO とマーケの距離は、ナーチャリングの可視化不足から広がりやすい',
    },
  ],
  moduleMapping: [
    {
      key: 'library',
      reason:
        '再訪リードの興味推移を AI が読み、最適な資料を自動レコメンド。マーケが用意した資産が「誰に・いつ・どう刺さったか」が見えるため、ナーチャリング ROI が出ます。',
    },
    {
      key: 'email',
      reason:
        'インバウンドメール・問い合わせ返信・ステップ配信への返信まで AI が応答。シナリオ型 MA では届かない「文脈に沿った 1to1 ナーチャリング」が実現します。',
    },
    {
      key: 'live',
      reason:
        'サイト訪問者と AI が会話し、興味カテゴリを CRM に書き戻し。スコアリングが行動信号ベースに変わり、ホットリードが埋もれません。',
    },
    {
      key: 'calendar',
      reason:
        '温まったリードに対し、その場でカレンダーを提示。マーケが運んだ熱量を、IS に渡す前に商談まで確定させられます。',
    },
  ],
  faq: [
    {
      question: '既存の MA（HubSpot / Marketo / Account Engagement）と置き換える必要がありますか？',
      answer:
        'いいえ。Meeton ai は MA を置き換えるのではなく、MA のステップ配信では届かない「行動文脈に沿ったナーチャリング」を担います。HubSpot とはネイティブ連携で、スコアリング・リスト管理は既存のままご利用いただけます。',
    },
    {
      question: 'AI ライブラリは、既存の資料をそのまま使えますか？',
      answer:
        'はい。既存の PDF / Web 資料 / 動画をライブラリに登録すれば、AI が訪問者の興味文脈に応じて自動レコメンドします。メタデータ整備のお手伝いも導入時にご相談可能です。',
    },
    {
      question: 'リード品質を改善する仕組みはどうなっていますか？',
      answer:
        '行動信号（再訪・滞在・資料閲覧・会話内容）を AI が統合的に解釈し、購買意向に近いリードを優先的に IS/SDR にハンドオフします。MA のメール開封ベースのスコアリングと併用することで、ホットリードの取りこぼしが減ります。',
    },
    {
      question: 'マーケ起点パイプラインの可視化は、どこまでできますか？',
      answer:
        'UTM / 流入チャネル / 会話内容 / 興味カテゴリ / 閲覧資料 / 商談化結果がコンタクト単位で CRM に書き戻されます。チャネル別・コンテンツ別・キャンペーン別の商談化貢献度レポートが構築可能です。',
    },
    {
      question: 'ABM 戦略との相性はどうですか？',
      answer:
        '相性は高いです。AI が会社ドメインを判定してターゲット ABL から自動分岐させたり、ABM ターゲット社のサイト訪問を即座に営業に通知する運用が可能です。CRM 上でアカウント単位の温度可視化が進みます。',
    },
    {
      question: '導入のリードタイムと運用負荷はどのくらいですか？',
      answer:
        'タグ設置は 5 分、AI 設定込みで最短当日稼働。運用負荷は MA 単体よりむしろ軽くなる傾向です。シナリオ分岐の細かな管理ではなく、AI への指針・ライブラリ整備・KPI モニタリングが中心業務になります。',
    },
  ],
  accent: '#7c5cfc',
  utmCampaign: 'persona-marketing-manager',
}

export default function MarketingManagerPersonaPage() {
  return <PersonaPage config={config} />
}
