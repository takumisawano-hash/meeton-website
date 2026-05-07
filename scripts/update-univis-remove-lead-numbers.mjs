import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const PAGE_ID = '34f44e31-fe62-817d-9bfd-d1b73cdf37ee'

// ---- 1) Update properties: remove lead count from stats & description ----
const newDescription =
  'Univis Group は、会計・M&A・経営コンサルティング・税務・法務・人材まで、業界横断で1,000社以上を支援する総合プロフェッショナル・ファーム。「お客様がどのサービスに興味を持っているか、こちら側で適切に判断するのが難しい」という多サービス事業者ならではの構造課題に対し、Meeton ai を導入。3ヶ月で受注2件、提案件数の約2倍化、そして"どの企業が自社のコンテンツを見ているか"を瞬時に可視化することで市場分析・競合分析の精度まで底上げした実装の中身。'

const newStatsJson = JSON.stringify([
  { value: '2件', label: '3ヶ月で受注獲得（M&A・コンサル）' },
  { value: '約2倍', label: '提案件数（導入前比）' },
  { value: '6+', label: 'AIが自動仕分けする事業領域' },
])

await notion.pages.update({
  page_id: PAGE_ID,
  properties: {
    Description: { rich_text: [{ type: 'text', text: { content: newDescription } }] },
    StatsJson: { rich_text: [{ type: 'text', text: { content: newStatsJson } }] },
  },
})
console.log('✓ Properties updated (lead count removed)')

// ---- 2) Walk body blocks and rewrite/remove ones with specific lead counts ----
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

async function replaceText(block, newText) {
  const type = block.type
  await notion.blocks.update({
    block_id: block.id,
    [type]: { rich_text: [{ type: 'text', text: { content: newText } }] },
  })
  console.log(`  [${type}] ${newText.slice(0, 60)}...`)
}

// Edit 1: rewrite the lead opener paragraph in 数字 section
const e1 = blocks.find(
  (b) =>
    b.type === 'paragraph' &&
    plain(b).startsWith('導入から3ヶ月、Univis のチャット起点リードは月9件規模で安定し')
)
if (e1) {
  await replaceText(
    e1,
    '導入から3ヶ月、Univis のチャット起点リードは安定的に積み上がり、フォームのみで運用していた頃には拾いきれなかった層を捕まえ続けている。受注ベースでは、M&A コンサル領域を中心に3ヶ月で2件のクロージングが成立。提案件数（自社から先方への提案そのもの）も導入前と比べて約2倍へ伸びている。'
  )
}

// Edit 2: delete the bullet that lists the specific lead numbers
const e2 = blocks.find(
  (b) =>
    b.type === 'bulleted_list_item' &&
    plain(b).includes('チャット起点リード：月9件規模')
)
if (e2) {
  await notion.blocks.delete({ block_id: e2.id })
  console.log('  [deleted] チャット起点リード bullet')
}

// Edit 3: rewrite the bullet that mentions specific lead counts in dashboard tracking
const e3 = blocks.find(
  (b) =>
    b.type === 'bulleted_list_item' &&
    plain(b).includes('運用変更後の数字（4月：9件）')
)
if (e3) {
  await replaceText(
    e3,
    '運用開始後の獲得状況と、それ以前の累計を同じ画面で追跡可能。施策ごとの貢献度をいつでも検証できる体制に'
  )
}

// Edit 4: rewrite the closing quote that contains "ここの方でも 2件" but has "数は確実に一定数増えた"
// Note: the quote already does NOT specify lead count, only "数は確実に一定数増えた" — keeping it.
// But if it contains specific numbers, normalize.
const e4 = blocks.find(
  (b) =>
    b.type === 'quote' &&
    plain(b).startsWith('数は確実に一定数増えた')
)
// Quote currently says "3ヶ月で受注は2件ぐらい" — that's deals, not leads. Keep as is.

console.log('\n✓ Body edits applied')
