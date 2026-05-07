import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const PAGE_ID = '34b44e31-fe62-81a4-8f76-ea0e14d3d3a1'

// ---- Property updates ----
const statsJson = JSON.stringify([
  { value: '10x+', label: 'チャット経由リード獲得（対 チャットプラス時代）' },
  { value: '手間ゼロ', label: 'AI 自動回答（シナリオ構築不要）' },
])

await notion.pages.update({
  page_id: PAGE_ID,
  properties: {
    StatsJson: { rich_text: [{ type: 'text', text: { content: statsJson } }] },
  },
})
console.log('✓ StatsJson updated (removed 11.5% リード化率)')

// ---- Fetch all blocks ----
const blocks = []
let cursor
do {
  const list = await notion.blocks.children.list({
    block_id: PAGE_ID,
    start_cursor: cursor,
    page_size: 100,
  })
  blocks.push(...list.results)
  cursor = list.has_more ? list.next_cursor : undefined
} while (cursor)
console.log(`Fetched ${blocks.length} blocks`)

function plain(block) {
  const type = block.type
  const body = block[type]
  if (!body?.rich_text) return ''
  return body.rich_text.map((r) => r.plain_text).join('')
}

function findBlock(predicate) {
  return blocks.find(predicate)
}

async function replaceText(block, newText) {
  const type = block.type
  await notion.blocks.update({
    block_id: block.id,
    [type]: { rich_text: [{ type: 'text', text: { content: newText } }] },
  })
  console.log(`  [${type}] ${newText.slice(0, 50)}...`)
}

// ---- Edit 1: Remove "2026年春、" from インサイドセールス退職 paragraph ----
const edit1 = findBlock(
  (b) =>
    b.type === 'paragraph' &&
    plain(b).startsWith('2026年春、インサイドセールス担当者の退職が決定')
)
if (edit1) {
  await replaceText(
    edit1,
    'インサイドセールス担当者の退職が決定。これまでは「5〜10分以内にフォロー電話」という体制で見込み客を逃さずつかんでいたが、その運用はもう続けられない。『ウェブ上で勝手に商談が生まれる』——そういう自動化の仕組みを、急いで組み直さなければならなかった。'
  )
}

// ---- Edit 2: 営業担当 → 営業責任者 ----
const edit2 = findBlock(
  (b) => b.type === 'paragraph' && plain(b).includes('比較検討は実質行わなかった。営業担当の小川氏')
)
if (edit2) {
  await replaceText(
    edit2,
    '比較検討は実質行わなかった。営業責任者の小川氏が「よさそうなので話を聞いてみたい」と持ち込み、その場で合意に近い形で導入が決まった。チャットプラスとの決定的な違いは、"チャット"という枠を越えたマーケティングツールとしての広さだった。'
  )
}

// ---- Edit 3: 機能要望 → DynaMeetに機能要望 ----
const edit3 = findBlock(
  (b) => b.type === 'paragraph' && plain(b).startsWith('導入後、機能要望を伝えると')
)
if (edit3) {
  await replaceText(
    edit3,
    '導入後、DynaMeet に機能要望を伝えると、翌日〜数日で反映される運用を体験した。スタートアップフェーズだからこそできるフットワークの軽さは、森田氏自身が「これは事例で絶対に書いた方がいい」と推薦した要素。'
  )
}

// ---- Edit 4: Remove "2026 Q1 商談獲得..." bullet ----
const edit4 = findBlock(
  (b) =>
    b.type === 'bulleted_list_item' &&
    plain(b).includes('2026 Q1 商談獲得')
)
if (edit4) {
  await notion.blocks.delete({ block_id: edit4.id })
  console.log(`  [deleted] 2026 Q1 bullet`)
}

// ---- Edit 5: "実質ゼロ円の追加投資" → 言い換え ----
const edit5 = findBlock(
  (b) =>
    b.type === 'bulleted_list_item' &&
    plain(b).includes('実質ゼロ円の追加投資')
)
if (edit5) {
  await replaceText(
    edit5,
    'RPA・iPaaS など既存サービスへの集客チャネルとして、追加のマーケ投資を伴わずに機能'
  )
}

// ---- Edit 6: "インサイドセールス退職を控え" → "インサイドセールスの人員不足により" ----
const edit6 = findBlock(
  (b) =>
    b.type === 'paragraph' &&
    plain(b).startsWith('インサイドセールス退職を控え')
)
if (edit6) {
  await replaceText(
    edit6,
    'インサイドセールスの人員不足により、コンバージョン後のフォローアップ自動化が急務だった。AI メールは、チャットで取得したリードの行動シグナルと質問履歴をもとに、AI がパーソナライズされたフォローアップメールを自動で生成・送信する機能。承認モードでトライアル運用し、既存ステップメールとの比較検証を行っていく。'
  )
}

// ---- Edit 7: h3 "AI メール（Meet Mail）導入" → "AI メール導入" ----
const edit7 = findBlock(
  (b) =>
    b.type === 'heading_3' &&
    plain(b).includes('Meet Mail')
)
if (edit7) {
  await replaceText(edit7, 'AI メール導入——完全自動のフォローアップへ')
}

// ---- Edit 8: "森田氏が描く方向性はシンプルだ。" ----
const edit8 = findBlock(
  (b) =>
    b.type === 'paragraph' &&
    plain(b) === '森田氏が描く方向性はシンプルだ。'
)
if (edit8) {
  await replaceText(edit8, '森田氏が DynaMeet の今後に期待することはシンプルだ。')
}

console.log('\n✓ All edits applied. Triggering ISR revalidation now.')
