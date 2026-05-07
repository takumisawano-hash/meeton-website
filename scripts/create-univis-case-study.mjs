import { Client } from '@notionhq/client'
import { readFileSync } from 'node:fs'

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const DATA_SOURCE_ID = 'dcab4223-0d39-47fb-bc3b-a847bb9ba673'
const BIZTEX_PAGE_ID = '34b44e31-fe62-81a4-8f76-ea0e14d3d3a1'
const EDULINX_PAGE_ID = '34944e31-fe62-8154-b4d1-d5bc03a6621e'

async function upload(path, filename, contentType) {
  const fu = await notion.fileUploads.create({
    mode: 'single_part',
    filename,
    content_type: contentType,
  })
  const data = readFileSync(path)
  const blob = new Blob([data], { type: contentType })
  const sent = await notion.fileUploads.send({
    file_upload_id: fu.id,
    file: { data: blob, filename },
  })
  if (sent.status !== 'uploaded') throw new Error('upload failed: ' + sent.status)
  return fu.id
}

const heroId = await upload('/tmp/univis-hero.jpg', 'univis-hero.jpg', 'image/jpeg')
console.log('Hero uploaded:', heroId)

const title =
  '会計・M&A・コンサル——多サービス事業の問い合わせを、AIが一画面で仕分け始めた。Univis Group が3ヶ月で受注2件を獲得するまで'

const description =
  'Univis Group は、会計・M&A・経営コンサルティング・税務・法務・人材まで、業界横断で1,000社以上を支援する総合プロフェッショナル・ファーム。「お客様がどのサービスに興味を持っているか、こちら側で適切に判断するのが難しい」という多サービス事業者ならではの構造課題に対し、Meeton ai を導入。3ヶ月で受注2件、月9件規模の安定したチャット起点リード、提案件数の約2倍化、そして"どの企業が自社のコンテンツを見ているか"を瞬時に可視化することで市場分析・競合分析の精度まで底上げした実装の中身。'

const quote =
  '同じサービスを展開している会社は、正直あまりなかった。コスト面と、取りこぼしの機会損失を防ぎたい——そして新しいものを模索しなきゃいけないタイミングが重なって、Meeton ai に決めた。3ヶ月で2件の受注に繋がっているし、提案件数も増えた。アポにならなくても『どの企業が自社のコンテンツを見ているか』が瞬時にわかる。市場分析や競合分析の質まで上がっている。'

const statsJson = JSON.stringify([
  { value: '2件', label: '3ヶ月で受注獲得（M&A・コンサル）' },
  { value: '9件/月', label: 'チャット起点リード（2026年4月）' },
  { value: '約2倍', label: '提案件数（導入前比）' },
  { value: '6+', label: 'AIが自動仕分けする事業領域' },
])

const properties = {
  Title: { title: [{ type: 'text', text: { content: title } }] },
  Slug: {
    rich_text: [{ type: 'text', text: { content: 'univis-multi-service-3month-2deals' } }],
  },
  Company: {
    rich_text: [{ type: 'text', text: { content: 'Univis Group' } }],
  },
  CompanyNote: {
    rich_text: [
      {
        type: 'text',
        text: {
          content:
            '会計・M&A・経営コンサル・税務・法務・人材まで、業界横断で1,000社以上を支援する総合プロフェッショナル・ファーム',
        },
      },
    ],
  },
  Description: { rich_text: [{ type: 'text', text: { content: description } }] },
  Industry: { select: { name: 'コンサルティング' } },
  EmployeeSize: { select: { name: '100~500' } },
  UsedProducts: {
    multi_select: [
      { name: 'AI Chat' },
      { name: 'AI Email' },
      { name: 'AI Calendar' },
    ],
  },
  Integrations: {
    multi_select: [{ name: 'Google Calendar' }, { name: 'メール (SMTP)' }],
  },
  Tags: {
    multi_select: [
      { name: 'プロフェッショナルサービス' },
      { name: 'M&A' },
      { name: 'コンサルティング' },
      { name: 'AI SDR' },
      { name: '多事業' },
    ],
  },
  HeroMetric: { rich_text: [{ type: 'text', text: { content: '2件' } }] },
  HeroMetricLabel: {
    rich_text: [
      {
        type: 'text',
        text: { content: '3ヶ月で受注獲得（M&A・コンサル領域）' },
      },
    ],
  },
  StatsJson: { rich_text: [{ type: 'text', text: { content: statsJson } }] },
  Quote: { rich_text: [{ type: 'text', text: { content: quote } }] },
  QuotePerson: {
    rich_text: [{ type: 'text', text: { content: '上田 翔太 氏 / Univis Group' } }],
  },
  FocusKeyword: {
    rich_text: [
      {
        type: 'text',
        text: { content: 'AIチャットボット コンサル M&A 導入事例 多サービス' },
      },
    ],
  },
  PublishedDate: { date: { start: '2026-04-27' } },
  Published: { checkbox: true },
  NoIndex: { checkbox: false },
  Order: { number: 1 },
  HeroImage: {
    files: [{ type: 'file_upload', file_upload: { id: heroId }, name: 'univis-hero.jpg' }],
  },
}

// ==== Body blocks ====
const p = (text) => ({
  object: 'block',
  type: 'paragraph',
  paragraph: { rich_text: [{ type: 'text', text: { content: text } }] },
})
const h2 = (text) => ({
  object: 'block',
  type: 'heading_2',
  heading_2: { rich_text: [{ type: 'text', text: { content: text } }] },
})
const h3 = (text) => ({
  object: 'block',
  type: 'heading_3',
  heading_3: { rich_text: [{ type: 'text', text: { content: text } }] },
})
const q = (text) => ({
  object: 'block',
  type: 'quote',
  quote: { rich_text: [{ type: 'text', text: { content: text } }] },
})
const bullet = (text) => ({
  object: 'block',
  type: 'bulleted_list_item',
  bulleted_list_item: { rich_text: [{ type: 'text', text: { content: text } }] },
})

const children = [
  h2('会社について'),
  p(
    'Univis Group は、会計、M&A、経営コンサルティング、税務、法務、人材まで、本来は別々のファームに分かれている領域を、1社で一気通貫に提供する総合プロフェッショナル・ファーム。これまでに 1,000社を超える顧問先、500件以上の M&A 実績、上場支援50社以上を積み上げ、東京・大阪・福岡・札幌・名古屋にニューヨーク、マレーシアまで拠点を持つ。'
  ),
  p(
    'M&A コンサルタント、経営コンサルタント、公認会計士、税理士、弁護士、社労士——本来サイロ化しがちな専門人材を、ひとつの案件に対して横断的に配置できることが Univis の強みだ。だからこそ、お客様からの問い合わせも会計から M&A、組織課題まで、入口の温度感も求める専門性も大きく違う。'
  ),

  h2('導入前の課題'),

  h3('「お客様が、どのサービスに興味があるか分からない」'),
  p(
    '多サービス事業者ならではの構造課題があった。サービスのカテゴリーが大きく分かれているため、ウェブサイト経由の問い合わせを受けても、それが会計の話なのか M&A の話なのか、組織コンサル領域なのか——フロントエンドで瞬時に仕分けるのが難しい。'
  ),
  q(
    '弊社が提供しているサービスはどのサービスにもなり得て、サービスのカテゴリーがかなり別れている。それを我々もなかなか適切に判断するのが難しい。'
  ),
  p(
    'チャットや問い合わせフォームを使う訪問者は、まだ自分の課題が定まっていない段階でも入ってくる。M&A の検討段階かもしれないし、組織課題の相談かもしれない。本人さえ整理できていない問いを、人手だけで仕分け続けることは現実的ではなかった。'
  ),

  h3('資料DLしただけの"温度の低い"リードへの初動'),
  p(
    '営業のフロー上は、まずメールでフォローを送り、返信があった顧客にだけ電話などの次アクションでフィルターをかけていた。理由はシンプル。資料ダウンロードだけして「正直あまり興味は持っていないだろう」というお客様も一定数まじっていて、すぐ電話するとリソースの浪費になるからだ。'
  ),
  p(
    'ただしこの運用では、メール返信を待つあいだに、本来は熱量のあるお客様の意欲も冷めていく。「どこまで踏み込んで良いか分からない」状態のまま、初動が遅れるリスクがあった。'
  ),

  h3('「新しいものを模索しなきゃいけないタイミング」'),
  p(
    '営業チャネルとしては、リスト型・フォーム自動送信ツールの併用で一定の数を出せていた。しかし、それだけでは伸び代に天井が見えていた。Univis の事業責任の立場として、新しい獲得チャネルを定期的に試し続けることが求められていたタイミングが、ちょうど Meeton ai 検討と重なる。'
  ),

  h2('Meeton ai を選んだ理由'),

  h3('そもそも比較対象がなかった——「同じサービスを展開している会社は、あまりなかった」'),
  p(
    '通常の購買検討と違い、Meeton ai の導入時には実質的な比較検討が行われなかった。理由は、訪問者の意図を AI で解釈してリアルタイムに対話・予約・フォローまで完結させる "AI SDR" カテゴリのプレイヤーが、当時はほぼ存在しなかったから。AIチャットボットや単独機能ベンダーは複数あったが、Univis のような多サービス事業の問い合わせを横断的に裁ける製品は見当たらなかった。'
  ),
  q(
    '全く同じサービスを展開している会社は、正直あまりなかった。同じカテゴリのものを全く他で検討したかというと、検討はしてなかった。'
  ),

  h3('決め手は3つ——コスト、機会損失防止、模索のタイミング'),
  p('上田氏が挙げた決定要因は重なっていた。'),
  bullet(
    'コスト面：人手で多サービスを仕分けて初動するチームを組むより、AI に処理させる方が圧倒的に安い'
  ),
  bullet(
    '取りこぼしの機会損失防止：チャットや営業時間外の問い合わせを、人を増やさずに拾い上げたかった'
  ),
  bullet('模索のタイミング：新しい獲得チャネルを試し続けることが事業責任として求められていた'),
  q(
    'もちろんコスト的なところもあったが、シンプルに取りこぼしは正直あるんだろうなと思っていて、機会損失を防ぎたかった。立場的にも新しいものをどんどん模索していかなきゃいけないタイミングだったので、決定に踏み切った。'
  ),

  h2('導入後の成果'),

  h3('数字——3ヶ月で受注2件、月9件の安定リード、提案件数 約2倍'),
  p(
    '導入から3ヶ月、Univis のチャット起点リードは月9件規模で安定し、3-4月の累計で13件のリードが記録されるまでになった。受注ベースでは、M&A コンサル領域を中心に3ヶ月で2件のクロージングが成立。提案件数（自社から先方への提案そのもの）も導入前と比べて約2倍へ伸びている。'
  ),
  bullet('受注：3ヶ月で2件（M&A・コンサル領域）'),
  bullet('チャット起点リード：月9件規模、3-4月累計13件'),
  bullet('提案件数：導入前比 約2倍'),
  bullet('リードソース可視化：フォーム経由 / Meeton ai 経由を一画面で識別、効果検証できる体制に'),
  q(
    '数は確実に一定数増えた。M&A コンサル側でも受注になったものがあるし、提案件数みたいなのもこれで増えたっていうのが、実際にある。3ヶ月で受注は2件ぐらい。'
  ),

  h3('数字に出てこない最大のインパクト——「どの企業が見ているかが、瞬時にわかる」'),
  p(
    'Univis にとって Meeton ai の価値は、リード獲得数だけにとどまらない。むしろ、定性面のインパクトが大きい。アポイントにつながらない訪問でさえ、「どの企業が、自社のどのコンテンツを見ているか」が瞬時にわかる。これが市場分析・競合分析の主力データになりつつある。'
  ),
  q(
    'アポには繋がっていなくても、実際にこういう会社が見ているんだ、というのが瞬時にわかる。それを基に、商談の推測や、営業としての業界動向の確認、市場分析や競合分析にも一定役立っている。'
  ),
  p(
    'プロフェッショナル・ファームにとって、業界動向の早期把握は受注確率に直結する。「どの業界のどんな企業が、いま会計の見直し・M&A・組織再編を真剣に考え始めているか」を、ウェブサイトのアクセス段階で察知できることの戦略的価値は、数字以上に大きい。'
  ),

  h3('リードソースの明確化——「フォーム経由 / Meeton ai 経由」を一目で'),
  p(
    'もう一つの定性的な変化は、リードソースの可視化だ。Meeton ai の管理画面では、「フォーム経由（Meeton ai と接触したあとフォームに到達した）」「Meeton ai 経由（チャット内でコンバージョン）」を切り分けて表示できる。さらに Meeton ai と接触していない通常のウェブサイト経由のコンタクトも一画面に統合表示されるため、施策ごとの貢献度を比較できる。'
  ),
  bullet('「Meeton ai 関与」と「直接フォーム」のコントリビューションが分離可視化'),
  bullet('運用変更後の数字（4月：9件）と過去の累計（3月含む13件）が同じ画面で追跡可能'),
  bullet(
    '「ミーティングあり」「相談化」というステータス管理が機能しており、運用ノイズを最小化'
  ),

  h2('印象的なエピソード'),

  h3('「アポには繋がってなくても、武器になる」——インテリジェンスとしてのチャットログ'),
  p(
    'Meeton ai の導入後、上田氏が口にするようになったフレーズがある。「アポには繋がっていなくても」だ。M&A ・経営コンサルというビジネスでは、検討の入口に立っただけのお客様も、半年後・1年後の有効商談に化ける。だからこそ、「いま誰が、どんな関心領域で、自社サイトを訪れているか」というメタ情報そのものが、リスト・提案資料・営業仮説の精度を上げる。'
  ),
  p(
    'Meeton ai は単なる集客ツールでも、SDR代替でもなく、Univis にとっては"市場のレーダー"として機能し始めた。'
  ),

  h3('多サービスをひとつのチャットで仕分ける——AI による文脈推定'),
  p(
    '訪問者が会計のページを見ているなら会計の文脈で、M&A 関連ページを見ていれば M&A の文脈で対応する——これを Meeton ai は、ウェブサイトのコンテンツを AI が読み込むことで自動化している。Univis のような多サービス事業者でも、シナリオを事前に網羅的に書く必要がない。'
  ),
  q(
    '見ている LP 先や資料に合わせて、案内する資料がきちんと整っていれば、今のところ他は大丈夫。AI でコードを読み取りページに合わせて制御する機能を、ちょうどリリースしてもらえそうなところ。'
  ),

  h2('今後の展望'),

  h3('AI メール（Meet Mail）の承認モード運用——フォローアップの完全自動化'),
  p(
    'Univis の既存運用は「まずメール送信 → 返信あり客にだけ電話」のフィルター型だった。これを Meeton ai の AI メール（Meet Mail）が引き継ぐ。リードが見ていたページ、チャットで投げかけた質問の中身を AI が解釈し、リードごとに完全パーソナライズされたメールを自動生成。72時間間隔で最大5通まで、未開封なら次のメールが文脈を更新して送られる。'
  ),
  p(
    '初期運用は、AI が作成したメールを人間が確認してから送る "承認モード" を選択。Univis の SMTP サーバーと連携することで、上田氏のメールアドレスからそのまま自然な形でリードに届く。'
  ),
  bullet('リードごとに完全パーソナライズされた文面を AI が自動生成'),
  bullet('未開封なら、行動データを反映した次のメールへ自動的にエスカレート'),
  bullet('承認モードで運用しながら、徐々に完全自動モードへ移行検討'),
  bullet('CC に営業マネジメント層を入れて、現場とマネジメントの情報共有も同時に解決'),

  h3('「コンスタントに有効リードが取れて、受注に繋がる」——KPIの見方が変わる'),
  p(
    '上田氏が今後の Meeton ai に期待することはシンプルだ。'
  ),
  q(
    '当然、ここから受注に繋がっていく件数が増えていけば1番ありがたい。コンスタントにそういった有効が取れて、受注に繋がるところは期待したい。あとは、抽出されるインテントリストの質がより上がっていくと、営業リストとしての質の向上にも繋がる。'
  ),
  p(
    'Univis にとって Meeton ai は、単発の集客施策ではなく、"インテントを取り続ける常時稼働の営業基盤" としての役割を担い始めている。'
  ),
]

const created = await notion.pages.create({
  parent: { type: 'data_source_id', data_source_id: DATA_SOURCE_ID },
  properties,
  children,
})

console.log('✓ Univis case study page created')
console.log('  Page ID:', created.id)
console.log('  URL:', created.url)

// Re-order existing case studies
await notion.pages.update({
  page_id: BIZTEX_PAGE_ID,
  properties: { Order: { number: 2 } },
})
console.log('✓ BizteX → Order=2')

await notion.pages.update({
  page_id: EDULINX_PAGE_ID,
  properties: { Order: { number: 3 } },
})
console.log('✓ EdulinX → Order=3')
