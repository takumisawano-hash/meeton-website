import type { Metadata } from 'next'
import PersonaPage, { type PersonaConfig } from '../components/PersonaPage'

/**
 * /for/cmo/ — Persona LP for CMOs.
 *
 * Target intent: "AI SDR CMO 向け" / "マーケティング 商談化 自動化" /
 *                "リード 商談化率 改善 CMO"
 *
 * Hypothesis: CMOs evaluating AI SDR want to know whether marketing-sourced
 * pipeline becomes measurable AND whether the MQL→SQL drop-off shrinks.
 * Page proves the attribution + nurture story through Meeton's 4 modules,
 * then routes them to ROI simulator + demo.
 */

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'CMO 向け AI SDR | マーケティング起点の商談化を可視化 | Meeton ai',
  description:
    'CMO が直面する「アトリビューション不在」「MQL→SQL の落差」「マーケ起点パイプラインの見えない化」を、AI SDR Meeton ai で解決。マーケが生んだリードを商談まで一気通貫で運びます。',
  alternates: {
    canonical: '/for/cmo/',
    languages: {
      'ja-JP': 'https://dynameet.ai/for/cmo/',
      'en-US': 'https://dynameet.ai/en/for/cmo/',
      'x-default': 'https://dynameet.ai/for/cmo/',
    },
  },
  openGraph: {
    title: 'CMO 向け AI SDR | マーケティング起点の商談化を可視化',
    description:
      'CMO の意思決定に効く 3 つの AI 機能 (Live / Calendar / Email)。マーケ起点パイプラインの可視化と、MQL→SQL 改善を同時に。',
    url: 'https://dynameet.ai/for/cmo/',
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
  slug: 'cmo',
  eyebrow: 'For CMOs',
  personaJa: 'CMO',
  heroH1: ['マーケ起点パイプラインを、', '数字で語れる CMO へ'],
  heroSub:
    'リードは集めている。だが「どのチャネルが本当に商談になっているか」が見えず、MQL→SQL の歩留まりも改善しない。Meeton ai はマーケが生んだリードを商談まで運び、CMO がレベニューに対して責任を負える状態をつくります。',
  pains: [
    {
      title: 'アトリビューションが不在で、施策の良し悪しが判断できない',
      body: '広告・SEO・SNS・ウェビナーと多面的に投資しているのに、どのチャネルが商談に効いているのかが分からない。CRM 上でも「OFFLINE」「INTEGRATION」が大半で、レポートを取締役会に持ち込めない。',
      signal: '多くの場合、Web 経由リードの初回経路は記録されず、商談化まで紐づかない',
    },
    {
      title: 'MQL は積み上がるのに、SQL に変換されない',
      body: 'スコアリングで MQL を吐き出しても、Inside Sales のキャパが追いつかず初動が遅れる。結果、温度が冷め、商談化率が業界平均を大きく下回るレベルで停滞する。',
      signal: '業界平均で、リード初動が 24 時間を超えると商談化率は半分以下になる',
    },
    {
      title: 'マーケ起点パイプラインのストーリーが、社内で共有できない',
      body: 'CRO と CFO に対して「マーケ投資が次四半期のパイプラインに直結する」ことを示せない。結果、予算交渉で常に守勢にまわり、刈り取り型の広告に偏重せざるを得ない。',
      signal: '予算配分の議論で、CMO が「リード数」しか語れない構造は、ほとんどの企業で共通',
    },
  ],
  moduleMapping: [
    {
      key: 'live',
      reason:
        'サイト訪問者を AI が即座に検知・対話し、商談まで誘導。流入チャネル × 会話内容 × 商談化が CRM に紐づくため、アトリビューションが「数字」として残ります。',
    },
    {
      key: 'library',
      reason:
        '再訪リードの興味文脈に応じて資料をレコメンド。マーケが用意したコンテンツが「誰に・いつ・どれだけ刺さったか」が可視化され、ナーチャリング ROI が出せます。',
    },
    {
      key: 'email',
      reason:
        'インバウンドメールに AI が 24/7 即時返信し、ナーチャリング配信にも AI が反応。MQL → SQL 落差の主因「初動遅延」を構造的に消します。 加えて、CRM に眠る過去 MQL・失注リードの再検討シグナルを Meeton Intent が検知し、Meeton Email が文脈に沿って再アプローチ。マーケが過去に集めたリード資産まで商談化に変えます。',
    },
    {
      key: 'calendar',
      reason:
        'AI が温度の高い瞬間にカレンダーを提示し、商談を確定。マーケが運んだ熱量を、人手の都合で冷ます工程をゼロにします。',
    },
  ],
  faq: [
    {
      question: 'CMO 視点で、Meeton ai を導入する最大のメリットは何ですか？',
      answer:
        'マーケ起点で生んだリードが「どのチャネルから来て、どう商談化したか」を CRM 上で一気通貫に追えるようになることです。広告 / SEO / SNS への投資が、四半期パイプラインにどう寄与したかを CFO と CRO に説明できる状態になります。',
    },
    {
      question: '既存の MA ツール（HubSpot / Marketo / Pardot）と置き換える必要がありますか？',
      answer:
        'いいえ。Meeton ai は MA を置き換えるのではなく、MA が引き渡した先の「商談化のラストワンマイル」を担います。HubSpot とはネイティブ連携しており、既存スタックの強化として導入できます。',
    },
    {
      question: 'マーケ起点パイプラインの可視化は、どのくらいの粒度で出せますか？',
      answer:
        'UTM / 流入ページ / 会話内容 / 興味カテゴリ / 商談化結果が、コンタクト単位で CRM に書き戻されます。チャネル別・キャンペーン別・コンテンツ別での商談化率レポートが出せる構成です。',
    },
    {
      question: '商談化率はどのくらい改善しますか？',
      answer:
        '業種・運用設計によりますが、AI チャット経由では商談化率 40% 超を実現している企業があります。共通する改善因は「初動 5 秒対応」と「文脈に沿った会話・資料提案」です。具体の数値は導入事例ページで業種別にご確認いただけます。',
    },
    {
      question: '導入から成果が出るまで、どのくらいかかりますか？',
      answer:
        '初期設置はタグ 1 行・最短 5 分。AI の事前学習も含めて、多くのケースで導入初週から商談創出が始まっています。3 ヶ月以内に商談化率の有意な改善を確認している企業が複数あります。',
    },
    {
      question: '取締役会で説明するための資料は出せますか？',
      answer:
        'ROI シミュレーターで自社リード数・商談化率・LTV を入力すると、導入インパクトを試算できます。出力はそのまま社内説明資料に転用可能です。デモ時にカスタマイズもご相談ください。',
    },
      {
      question: 'CRM に眠る過去 MQL や失注リードからも商談を生み出せますか？',
      answer:
        'はい。Meeton Intent が CRM 上の過去 MQL・失注リード・休眠 contact の再検討シグナル（サイト再訪、料金ページ閲覧、メール再開封など）を検知し、Meeton Email が AI 動的判断で個別に再アプローチします。マーケが過去に獲得したリード資産を、人手をかけずに再商談化できます。詳細は CRM-to-Meeting ページをご覧ください。',
    },
  ],
  accent: '#12a37d',
  utmCampaign: 'persona-cmo',
}

export default function CmoPersonaPage() {
  return <PersonaPage config={config} />
}
