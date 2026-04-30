import type { LpComponent, ScoreTier, FunnelStage } from './types'

export const PRODUCT_THEMES = {
  'ai-chat': { color: '#12a37d', label: 'AI Chat', url: '/features/ai-chat/' },
  'ai-email': { color: '#3b6ff5', label: 'AI Email', url: '/features/ai-email/' },
  'ai-calendar': { color: '#0891b2', label: 'AI Calendar', url: '/features/meetings/' },
  'ai-offer': { color: '#7c5cfc', label: 'AI Offer', url: '/features/offers/' },
} as const

export type HeroVariant = {
  id: string
  audience: string
  headlineHints: string[]
  subHints: string[]
}

export const HERO_VARIANTS: HeroVariant[] = [
  {
    id: 'hero-existing-stage-mid',
    audience: 'HubSpotで進行中の商談・MQL',
    headlineHints: [
      '前回ご覧いただいた{{topInterest}}の最新情報をご用意しました',
      '{{firstName}}さま、検討の参考になる事例をお持ちしました',
    ],
    subHints: [
      '{{companyName}}の規模感に合わせた導入の流れと、商談数の変化を3分でご確認いただけます',
    ],
  },
  {
    id: 'hero-comparison-search',
    audience: '比較・指名検索からの流入',
    headlineHints: [
      'Meeton aiが選ばれる4つの理由 — {{companyName}}向け要約',
      '比較検討中の皆さまへ。Meeton aiが選ばれている理由',
    ],
    subHints: [
      '主要ベンダーとの差分を{{industry}}業界の文脈で整理しました',
    ],
  },
  {
    id: 'hero-paid-google',
    audience: 'Google広告流入(高インテント検索KW)',
    headlineHints: [
      '{{searchKeyword}} なら、Meeton aiが商談を3倍に',
      '{{companyName}}の{{department}}が、商談数を2.4倍にした方法',
    ],
    subHints: [
      'AIがウェブサイト訪問者を識別し、商談につながる方だけを自動でフォロー。{{industry}}での実績多数。',
    ],
  },
  {
    id: 'hero-comparison-site',
    audience: '比較メディア(BOXIL/ITreviewなど)経由',
    headlineHints: [
      'Meeton aiの比較表 — {{industry}}業界向けのまとめ',
    ],
    subHints: [
      '主要4社との機能比較・料金・導入事例を1枚で。{{companyName}}に合うかどうかが分かります。',
    ],
  },
  {
    id: 'hero-direct-cold',
    audience: 'ダイレクト・初回訪問・低スコア',
    headlineHints: [
      '商談につながる訪問者だけを、AIが自動で見極める',
      '{{companyName}}のウェブサイト訪問者から、商談につながる方を自動で抽出',
    ],
    subHints: [
      'IPアドレスで企業を識別し、AIチャットで対話、メールでフォロー、カレンダーで予約まで自動化。',
    ],
  },
  {
    id: 'hero-pricing-viewed',
    audience: '料金ページ閲覧済み',
    headlineHints: [
      '{{companyName}}の規模感での想定ROIをご試算しました',
    ],
    subHints: [
      '貴社の従業員規模・流入数から推定した削減工数と商談増加見込みです。30分のデモで詳細をご案内します。',
    ],
  },
  {
    id: 'hero-customer-existing',
    audience: '既存顧客・カスタマーサクセス',
    headlineHints: [
      'いつもご利用ありがとうございます。{{companyName}}向けの新機能のご案内',
    ],
    subHints: [
      'ご利用中のプランで使える追加機能と、アップグレードによる効果見込みです。',
    ],
  },
]

export const CASE_STUDY_RULES = {
  matchByIndustry: true,
  matchByEmployeeBand: true,
  excludeForFinance: ['retail-only'],
  excludeForLogistics: [],
  default: 3,
}

export const ROI_TEMPLATE = {
  id: 'roi-default',
  inputs: ['employees', 'estimatedSdrCount', 'avgDealSize'],
  formulaJa: 'AI Chat: 商談化率2.4倍 × AI Email: 工数50時間/月削減 × AI Calendar: 予約完了率87%',
  defaultMessage: '同規模企業の平均で、月間商談数 +X 件、SDR工数 -Y 時間/月の効果が見込めます。',
}

export const USE_CASE_BANK: Record<string, string[]> = {
  '金融': [
    '富裕層向けセミナー後の個別相談へのリード誘導',
    '法人融資ページからの問い合わせ自動振り分け',
    'コンプラ要件に沿ったメール配信の運用効率化',
  ],
  '物流': [
    '輸出入業務問い合わせの自動仕分けと商談化',
    '荷主向けプラン提案メールの自動パーソナライズ',
    '営業所ごとの個別ニーズに応じたウェブ接客',
  ],
  '製造': [
    '展示会/カタログDL後の温度感別フォロー',
    '海外バイヤー向け英語版LPの動的表示',
    '技術仕様問い合わせを技術営業に自動アサイン',
  ],
  'IT': [
    'プライシング検討中ユーザーの自動商談予約',
    'パートナー候補の自動識別と提案メール',
    '機能比較中ユーザーへの差分訴求',
  ],
  'コンサル': [
    'インバウンド問い合わせの優先度自動判定',
    '業界別レポートの自動配信とフォロー',
    'パートナー導入後のクロスセル案内',
  ],
  default: [
    '商談につながる訪問者をAIが自動で見極め',
    '個別最適化したメールで温度感を上げる',
    '高インテントの方だけにカレンダー予約を提案',
  ],
}

export const COMPARISON_BANK: Record<string, { headers: string[]; rows: Array<Array<string>> }> = {
  default: {
    headers: ['観点', 'Meeton ai', '従来MAツール'],
    rows: [
      ['IP→企業特定', '◯ 自動', '× フォーム入力必須'],
      ['AIチャット対話', '◯ 文脈ごと自動生成', '△ シナリオ手作成'],
      ['メール個別化', '◯ AIで自動生成', '× テンプレ手作成'],
      ['予約完了率', '87%(AI Calendar)', '40-60%'],
      ['導入工数', '◯ 1行スクリプト', '△ 設定2-4週間'],
    ],
  },
  comparison_keyword: {
    headers: ['機能', 'Meeton ai', '比較対象A', '比較対象B'],
    rows: [
      ['AI訪問者識別', '◯', '△', '△'],
      ['AI Email自動生成', '◯', '×', '△'],
      ['AI予約 (Calendar)', '◯', '×', '×'],
      ['AI Offer (動的LP)', '◯', '×', '×'],
      ['日本市場特化', '◯', '△', '×'],
    ],
  },
}

export const URGENCY_BANK: Record<string, string> = {
  high: '今週中にデモをご予約された方限定で、貴社向け導入プラン(初月設定費用50%OFF)をご案内中',
  mid: '今月中に資料DLされた方には、Meeton ai 導入企業の最新ベンチマークレポートをお送りします',
  low: '',
  'super-high': '担当営業からの直接ご連絡で、貴社固有のご要望にあわせたデモをアレンジします',
}

export type CtaSpec = {
  primary: 'demo' | 'document'
  primaryLabel: string
  secondary: 'demo' | 'document'
  secondaryLabel: string
  accentMessage?: string
}

const DEMO_LABEL = 'デモを予約'
const DOCUMENT_LABEL = '資料請求'

export function pickCtaForTier(tier: ScoreTier, stage: FunnelStage): CtaSpec {
  if (stage === 'customer' || tier === 'super-high' || tier === 'high') {
    return {
      primary: 'demo',
      primaryLabel: DEMO_LABEL,
      secondary: 'document',
      secondaryLabel: DOCUMENT_LABEL,
      accentMessage: tier === 'super-high' ? '通常より優先的に日程をお取りします' : undefined,
    }
  }
  return {
    primary: 'document',
    primaryLabel: DOCUMENT_LABEL,
    secondary: 'demo',
    secondaryLabel: DEMO_LABEL,
  }
}

export const SAFE_PERSONALIZATION_RULES = `
- 訪問者が明示的に提供した情報（会社名・メール）と、ビジネス文脈で自然な属性（業種・規模・流入経路）のみ使う
- 「○月○日に××を見た」のような具体的な行動の言及は禁止
- 既存リードへの呼びかけは「先日ご覧いただいた」「お問い合わせいただいた」など、自然な範囲に限定
- 個人名や役職を当て推量で書かない（HubSpotで判明している場合のみ使う）
- 不明な数値や事実を捏造しない。データが無ければその要素を出さない
`

export type RenderedComponents = {
  components: LpComponent[]
}
