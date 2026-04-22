import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const DATA_SOURCE_ID = 'dcab4223-0d39-47fb-bc3b-a847bb9ba673'

const rt = (t) => [{ type: 'text', text: { content: t } }]
const p = (t) => ({ object: 'block', type: 'paragraph', paragraph: { rich_text: rt(t) } })
const h2 = (t) => ({ object: 'block', type: 'heading_2', heading_2: { rich_text: rt(t) } })
const quote = (t) => ({ object: 'block', type: 'quote', quote: { rich_text: rt(t) } })
const bullet = (t) => ({
  object: 'block',
  type: 'bulleted_list_item',
  bulleted_list_item: { rich_text: rt(t) },
})

const title =
  'Meeton ai 経由の商談化率は40%——研修業界リーダーが実現した"温まったリード"の獲得術'
const company = 'エデュリンクス株式会社'
const slug = 'edulinx-ai-chat-40-percent'
const description =
  '「リアリ Engンシ」等の研修事業を展開するエデュリンクス。Meeton ai 導入後、AI経由で流入したリードの商談化率は業界平均の2倍にあたる40%に到達。"温まった状態"で問い合わせが届く仕組みを詳解。'

const stats = [
  { label: 'Meeton ai 経由の商談化率', value: '40%', context: '従来比 2倍' },
  { label: '関与リード数', value: '49件', context: '2026年1-3月' },
  { label: '有効リード（商談中）', value: '6件', context: '1Q' },
]

const quoteText =
  'ミートAIを経由して来たお客さんの方が、明らかに少しチャリングされてきた状態というか、知識を得た状態、興味を持った状態で問い合わせをしてきてくれている。商談化の部分で非常に有効的だと感じています。'

const properties = {
  Title: { title: rt(title) },
  Slug: { rich_text: rt(slug) },
  Company: { rich_text: rt(company) },
  CompanyNote: { rich_text: rt('Education × DX — 研修業界のパイオニア') },
  Industry: { select: { name: '人材' } },
  UsedProducts: {
    multi_select: [{ name: 'AI Chat' }, { name: 'AI Calendar' }],
  },
  Integrations: {
    multi_select: [{ name: 'Salesforce' }, { name: 'Microsoft Teams' }],
  },
  Description: { rich_text: rt(description) },
  HeroMetric: { rich_text: rt('40%') },
  HeroMetricLabel: { rich_text: rt('Meeton ai 経由の商談化率（業界平均の2倍）') },
  StatsJson: { rich_text: rt(JSON.stringify(stats)) },
  Quote: { rich_text: rt(quoteText) },
  QuotePerson: { rich_text: rt('千羽 正章 氏 / エデュリンクス株式会社') },
  PublishedDate: { date: { start: '2026-04-21' } },
  FocusKeyword: { rich_text: rt('AI SDR 導入事例 研修') },
  Tags: {
    multi_select: [
      { name: 'AI SDR' },
      { name: '商談化率改善' },
      { name: '研修業' },
      { name: 'Education DX' },
    ],
  },
  Published: { checkbox: false }, // draft for review
  NoIndex: { checkbox: false },
  Order: { number: 1 },
}

const children = [
  h2('会社について'),
  p(
    'エデュリンクス株式会社は「Education × DX をリンクする」をミッションに掲げ、研修業界の変革をリードする企業。大学・企業向けの英語研修プラットフォーム「リアリ Engンシ」を中心に、教育機関と法人の双方で支持される研修サービスを展開している。業界の中でいち早くAI活用に踏み込む姿勢が特徴。'
  ),

  h2('導入前の課題'),
  p(
    '研修業界におけるリードから商談への転換率は、業界水準で20%前後。同社も「サイト訪問者の興味度が見えない」「訪問者を商談まで運ぶ導線が弱い」という課題を抱えていた。また、比較サイト経由で獲得したリードは背景情報が薄く温度感が掴みづらいため、営業担当が時間を投下しても商談化に結びつかないケースが多く、営業チームごとにフォロー品質のばらつきも課題となっていた。'
  ),

  h2('Meeton ai を選んだ理由'),
  bullet(
    'リード獲得・商談獲得に特化したAIチャットボットが「当時まだ画期的」で、課題にフィットしていた'
  ),
  bullet(
    '「Education × DX をリンクする」という自社理念と合致——業界のどこよりも先にAIを導入し、先行者になるという意思決定'
  ),
  bullet('顧客対応のAIは既に多いが、「商談を取りに行く」AIは少なく、差別化が強かった'),
  quote(
    'リード獲得だったり、商談獲得という方に課題を感じていた。そこに対してやっていくというのは新しかった。'
  ),

  h2('導入プロセス'),
  p(
    'ウェブサイトと問い合わせフォーム周辺にMeeton aiを組み込み、受講生向けのカスタマーサポート用途と新規リード獲得用途の両軸で運用を開始。当初は営業チーム内に「AIチャットで本当に商談が取れるのか」という懐疑的な声もあったが、運用を進めるうちに「AIの力をどんどん借りていった方がいい」というポジティブな姿勢が広がり、抵抗なく本格導入が進んだ。'
  ),

  h2('導入後の成果'),
  p(
    '最も大きな変化は、Meeton ai を経由したリードの質が顕著に向上したこと。業界平均20%前後の商談化率に対し、Meeton ai 経由リードの商談化率は約40%——実に2倍に到達した。'
  ),
  bullet('Meeton ai 経由の商談化率：約40%（全体平均20-23%の2倍）'),
  bullet('2026年1-3月でMeeton ai が関与したリード：49件'),
  bullet('有効リード（商談中）：6件'),
  bullet('社内評価：「こんなことも回答できるんだ」とスタッフから好評'),
  bullet('受講生向けサイトでの利用率も向上——特に若年層ユーザーが能動的に活用'),
  quote(
    '明らかに少しチャリングされた状態、知識を得た状態、興味を持った状態で問い合わせをしてきてくれる。商談化の部分で非常に有効的だと感じています。'
  ),

  h2('印象的なエピソード'),
  p(
    '医療系の大手顧客が Meeton ai との対話を通じて深い質問を重ね、自ら「すぐに打ち合わせをさせてください」と連絡してきた事例がある。医療系研修の対応可否や担当講師の専門性といった細かい論点までAIが踏み込んで回答したことで、問い合わせが届いた時点ですでに温度感が極めて高い状態になっていた。研修業界特有の「年度をまたぐ長期検討」が多い中、AIが初期の関心喚起を担うことで検討スピードが明らかに早まる——そうした効用を実感する象徴的なケースだった。'
  ),

  h2('今後の展望'),
  p(
    'Salesforce Account Engagement のフォームハンドラー連携、Microsoft Teams 連携によるカレンダー機能の本格稼働、プロンプトの継続チューニングを通じて、運用精度をさらに高めていく計画。加えて、Meeton ai が新たにリリースするフォローアップメール自動生成機能（AIが行動シグナルに応じて最適なタイミングで配信する機能）も活用予定で、これまで営業個人の裁量に依存していたリードフォロー品質の均質化を目指す。'
  ),
  quote(
    '業界をリードする立場になりたい。この業界を含めて色々な業界で、こういうAIをどんどん活用していくようになる中、導入しないわけにはいかないと考えました。'
  ),
]

const page = await notion.pages.create({
  parent: { type: 'data_source_id', data_source_id: DATA_SOURCE_ID },
  properties,
  children,
})

console.log('PAGE_ID=' + page.id)
console.log('URL=' + page.url)
