import { Client } from '@notionhq/client'
import { readFileSync } from 'node:fs'

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const DATA_SOURCE_ID = 'dcab4223-0d39-47fb-bc3b-a847bb9ba673'

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

// ==== Upload images ====
const logoId = await upload('/tmp/biztex-logo.png', 'biztex-logo.png', 'image/png')
console.log('Logo uploaded:', logoId)
const heroId = await upload('/tmp/biztex-hero.jpg', 'biztex-hero.jpg', 'image/jpeg')
console.log('Hero uploaded:', heroId)

// ==== Build page properties ====
const title =
  '月1〜2件だったチャットリードが、月10〜20件へ——BizteX が Meeton ai で再起動したマーケ接点'

const description =
  'クラウドRPA『BizteX cobit』・iPaaS『BizteX Connect』等を提供する BizteX は、AI 非対応のチャットプラスで月1〜2件まで落ち込み、事実上停止状態だったチャット運用を Meeton ai に切り替え。導入後は月10〜20件近く（10倍以上）のリード獲得を実現。オールインワンのマーケティングツールとしての価値、機能要望の翌日対応レベルの開発スピード、解約意向の早期察知というサブ効果、そして AIメール（Meet Mail）による完全自動フォローアップまで。'

const quote =
  'チャットプラス時代は月1、2件あればいい方だった。Meeton ai にしてから月10〜20件近く——10倍以上のリードがチャットから生まれている。大きなコストをかけずに集客できていないこの1年、ロボップやコネクトの既存サービスがチャットから獲得できていて、本当に助かっている。'

const statsJson = JSON.stringify([
  { value: '10x+', label: 'チャット経由リード獲得（対 チャットプラス時代）' },
  { value: '11.5%', label: 'リード化率（2026 Q1）' },
  { value: '手間ゼロ', label: 'AI 自動回答（シナリオ構築不要）' },
])

const properties = {
  Title: { title: [{ type: 'text', text: { content: title } }] },
  Slug: {
    rich_text: [{ type: 'text', text: { content: 'biztex-chat-leads-10x' } }],
  },
  Company: {
    rich_text: [{ type: 'text', text: { content: 'BizteX株式会社' } }],
  },
  CompanyNote: {
    rich_text: [
      {
        type: 'text',
        text: {
          content:
            'クラウドRPA「BizteX cobit」・iPaaS「BizteX Connect」・デスクトップRPA「BizteX robop」等を提供する業務自動化プラットフォーム企業',
        },
      },
    ],
  },
  Description: { rich_text: [{ type: 'text', text: { content: description } }] },
  Industry: { select: { name: 'SaaS' } },
  EmployeeSize: { select: { name: '~50' } },
  UsedProducts: {
    multi_select: [
      { name: 'AI Chat' },
      { name: 'AI Email' },
      { name: 'AI Calendar' },
    ],
  },
  Integrations: {
    multi_select: [{ name: 'HubSpot' }, { name: 'Slack' }, { name: 'Google Calendar' }],
  },
  Tags: {
    multi_select: [
      { name: 'AI SDR' },
      { name: 'リード獲得10倍' },
      { name: 'SaaS' },
      { name: '業務自動化' },
    ],
  },
  HeroMetric: { rich_text: [{ type: 'text', text: { content: '10x+' } }] },
  HeroMetricLabel: {
    rich_text: [
      {
        type: 'text',
        text: { content: 'チャット経由リード獲得数（対 チャットプラス時代）' },
      },
    ],
  },
  StatsJson: { rich_text: [{ type: 'text', text: { content: statsJson } }] },
  Quote: { rich_text: [{ type: 'text', text: { content: quote } }] },
  QuotePerson: {
    rich_text: [{ type: 'text', text: { content: '森田 千鶴 氏 / BizteX株式会社' } }],
  },
  FocusKeyword: {
    rich_text: [
      {
        type: 'text',
        text: { content: 'AIチャットボット SaaS 導入事例 リード獲得' },
      },
    ],
  },
  PublishedDate: { date: { start: '2026-04-23' } },
  Published: { checkbox: true },
  NoIndex: { checkbox: false },
  Order: { number: 2 },
  CompanyLogo: {
    files: [{ type: 'file_upload', file_upload: { id: logoId }, name: 'biztex-logo.png' }],
  },
  HeroImage: {
    files: [{ type: 'file_upload', file_upload: { id: heroId }, name: 'biztex-hero.jpg' }],
  },
}

// ==== Body blocks ====
const p = (text) => ({
  object: 'block',
  type: 'paragraph',
  paragraph: {
    rich_text: [{ type: 'text', text: { content: text } }],
  },
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
    'BizteX株式会社は、「Technology for Humans」をビジョンに掲げ、業務自動化の領域をリードする SaaS 企業。主力製品はクラウドRPA「BizteX cobit」、iPaaS「BizteX Connect」、デスクトップRPA「BizteX robop」の3本柱。幅広い業種の企業で、バックオフィスから基幹業務まで含めた自動化を支えている。'
  ),

  h2('導入前の課題'),
  p(
    'BizteX のマーケ流入は、主に WEB サイトを入り口としたインバウンド中心。そのなかで WEB チャットは、長年「放置に近い状態」にある手付かずのチャネルだった。'
  ),

  h3('シナリオ型チャットの運用限界——「もう無理だった」'),
  p(
    '以前使っていたのは、AI 非対応プランの「チャットプラス」。シナリオ型のため、「事前に自分で回答を作って入れておく」ことが必須で、メンテナンスコストが膨らみ続けていた。やがて、昔から受け継がれてきた回答フローがどう組み上がっているのかすら把握しきれなくなり、事実上、稼働が止まっていた。'
  ),
  q('もう無理だった。諦めていたというか、ほっといてた。'),

  h3('それでも月に1〜2件だけ残る、消せないチャネル'),
  p(
    '諦めていたとはいえ、それでも月に1〜2件だけコンバージョンが出る。あるにはあるけれど、手間と成果が合わない——このまま解約すべきか、そのまま残すべきか、判断を先延ばしにしてきた状態が続いていた。'
  ),

  h3('インサイドセールス退職——人員減への備えが急務'),
  p(
    '2026年春、インサイドセールス担当者の退職が決定。これまでは「5〜10分以内にフォロー電話」という体制で見込み客を逃さずつかんでいたが、その運用はもう続けられない。『ウェブ上で勝手に商談が生まれる』——そういう自動化の仕組みを、急いで組み直さなければならなかった。'
  ),

  h2('Meeton ai を選んだ理由'),

  h3('オールインワン——「チャットの領域を超えてきてる」'),
  p(
    '比較検討は実質行わなかった。営業担当の小川氏が「よさそうなので話を聞いてみたい」と持ち込み、その場で合意に近い形で導入が決まった。チャットプラスとの決定的な違いは、"チャット"という枠を越えたマーケティングツールとしての広さだった。'
  ),
  q(
    'オールインで色々できたこと——それが最初の決め手。チャットプラスと比べた時、もうチャットの領域を超えてマーケティングのツールとしての印象が強くて、しっかり使いこなそうと思えば色々できるかなと思った。'
  ),

  h3('AI 回答の「手間ゼロ」'),
  p(
    'シナリオ型チャットの最大の負債は、シナリオ自体の運用コストだった。Meeton ai は、ウェブサイトのコンテンツを AI が読み込んで自動で回答するため、"手入れ"の手間が発生しない。セキュリティなど技術的な質問にも、ドキュメントを読み込んだ上での回答が返るため、間違いが起こりにくい。'
  ),
  q(
    '回答がしっかりウェブページを読み込んでくれて、自分の手間が一切ない。多少はあるかもしれないけど、ほぼほぼなかった。チャットプラスと比べたらそこが大きい。'
  ),

  h3('開発スピード——「フットワークがめっちゃ軽い」'),
  p(
    '導入後、機能要望を伝えると、翌日〜数日で反映される運用を体験した。スタートアップフェーズだからこそできるフットワークの軽さは、森田氏自身が「これは事例で絶対に書いた方がいい」と推薦した要素。'
  ),
  q(
    'フットワークがめっちゃ軽い。言った翌日とか、翌々日に『できました』って言うじゃないですか。そんな会社ないので、そこは本当に助かった。'
  ),

  h2('導入後の成果'),

  h3('数字——チャット経由リードが月1〜2件から月10〜20件（10倍以上）へ'),
  p(
    'チャットプラス時代、BizteX のチャット経由リードは月に1〜2件程度だった。Meeton ai 導入後、これが一気に月10〜20件近くにまで跳ね上がった——10倍以上の水準。大きな追加コストをかけずに、既存サービスの集客が前進している。'
  ),
  bullet('Meeton ai 経由のチャットリード：月10〜20件（導入前：月1〜2件、10倍以上）'),
  bullet('2026 Q1 商談獲得：約8件、リード化率 11.5%'),
  bullet(
    'RPA・iPaaS など既存サービスへの集客チャネルとして、実質ゼロ円の追加投資で機能'
  ),
  q(
    'この1年、大きなコストをかけて集客できていないなかで、ロボップやコネクトの既存サービスがチャットから獲得できているので、本当に助かっている。'
  ),

  h3('数字に出てこないインパクト——顧客インサイトとリスク察知'),
  p(
    'Meeton ai の価値は、獲得件数だけではない。チャットに蓄積される顧客の生の質問が、組織の新しい情報資産になりつつある。'
  ),
  p(
    '料金への関心が圧倒的に多い：チャット質問の多くが料金関連。『こんなところが気になるんだね』という気づきが、ランディングやコンテンツ改善の仮説につながる。'
  ),
  p(
    '解約意向の"早期シグナル"：たまに「解約したい」という問い合わせがチャットに届く。本気の解約なら直接営業に連絡するはずで、チャットで聞いてくる段階の顧客はまだ揺らぎがある。CS に即連携すれば、食い止められる余地がある——チャットが"リテンションのレーダー"として機能し始めた。'
  ),
  q(
    '解約を考えている、ぐらいの温度感だったら、連携したら食い止め可能性もある。CS と連携できるので、そういう意味でもいい。'
  ),
  p(
    '技術的質問への AI 精度：BizteX Connect ではセキュリティなど技術的質問も多い。ウェブサイトを読み込んで回答する Meeton ai は、「間違ったことは答えていない」と感じる精度。FAQ を読み込ませておけば、疑問がクリアになった状態で商談に入れる。'
  ),

  h3('定性的な変化'),
  bullet('チャット内容から「顧客が何に興味を持っているか」が可視化されるように'),
  bullet('解約意向・サポート依頼・新規検討など、問い合わせの"温度"をチャットが仕分ける'),
  bullet(
    '手間ゼロで集客が動く——諦めていたチャネルが、1年もたたずに"集客の主力"に転じた'
  ),

  h2('印象的なエピソード'),

  h3('「これは事例で絶対に書いた方がいい」——森田氏自らの推薦'),
  p(
    'インタビューの最後、森田氏が自ら「これは事例で書いた方がいい」と念を押した要素があった。開発スピードだ。「お客さん増えてきたらこんなに早くはできないかもしれないですけど、今は言ったら翌日・翌々日に『できました』って言う。そんな会社ない」——ベンダーに求めるものとして、機能の完成度と同じくらい"向き合い方"が重要であることを示すエピソード。'
  ),

  h3('シナリオ運用から「伝えるだけで反映」の世界へ'),
  p(
    '運用開始から数ヶ月、要望は細かなチューニングが中心だった。「この文言は使わないで」「こういう書き方に変えて」——プロンプト調整を通じて、BizteX のトーンや言い回しが Meeton ai に浸透していった。シナリオ型チャットでは「更新が面倒で放置」になっていた作業が、AI チャットでは「伝えるだけで即時反映」の世界に変わった。'
  ),

  h2('今後の展望'),

  h3('タイムレックスを解約、Meeton ai 内蔵カレンダーへ全面移行'),
  p(
    '併用していた外部カレンダー「タイムレックス」は、近日解約の方針。Meeton ai の内蔵カレンダー機能（Google カレンダー連携、複数営業のラウンドロビン、バッファ設定、QR/リンク/埋め込み対応）の成熟を受けての判断。UI 改善による商談獲得率の底上げも狙う。'
  ),

  h3('AI メール（Meet Mail）導入——完全自動のフォローアップへ'),
  p(
    'インサイドセールス退職を控え、コンバージョン後のフォローアップ自動化が急務だった。Meet Mail は、チャットで取得したリードの行動シグナルと質問履歴をもとに、AI がパーソナライズされたフォローアップメールを自動で生成・送信する機能。承認モードでトライアル運用し、既存ステップメールとの比較検証を行っていく。'
  ),

  h3('究極のゴールは「ウェブ上で接客から商談獲得まで完結」'),
  p('森田氏が描く方向性はシンプルだ。'),
  q(
    '究極、ウェブ上で完結するのが1番だと思ってる。接客が全部そこで完結して、相談獲得までできる。できなかったら追ってメールしてあげる——チャットだけじゃないよっていうところ。どんどんその辺の領域を広げていってほしい。'
  ),
  p(
    'チャットからメールへ、アポイントからカレンダーへ——"接客の温度"を保ったまま、業務の自動化レベルを一段上げる。BizteX の次のフェーズが始まっている。'
  ),
]

// ==== Create page ====
const created = await notion.pages.create({
  parent: { type: 'data_source_id', data_source_id: DATA_SOURCE_ID },
  properties,
  children,
})

console.log('✓ Case study page created')
console.log('  Page ID:', created.id)
console.log('  URL:', created.url)
