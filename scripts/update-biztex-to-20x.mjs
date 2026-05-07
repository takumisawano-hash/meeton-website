import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const PAGE_ID = '34b44e31-fe62-81a4-8f76-ea0e14d3d3a1'

// Replacement rules — ORDER MATTERS (longest patterns first)
const replacements = [
  ['月10〜20件近く', '月20件以上'],
  ['月10〜20件', '月20件以上'],
  ['10〜20件近く', '20件以上'],
  ['10〜20件', '20件以上'],
  ['10倍以上', '20倍以上'],
  ['10x+', '20x+'],
  ['リード獲得10倍', 'リード獲得20倍'],
]

function transform(text) {
  let out = text
  for (const [from, to] of replacements) {
    out = out.split(from).join(to)
  }
  return out
}

// ==== Update properties ====
const page = await notion.pages.retrieve({ page_id: PAGE_ID })
const props = page.properties

function rtExtract(prop) {
  return prop.rich_text.map((r) => r.plain_text).join('')
}

const propUpdates = {}

// Title
const oldTitle = props.Title.title.map((r) => r.plain_text).join('')
const newTitle = transform(oldTitle)
if (newTitle !== oldTitle) {
  propUpdates.Title = { title: [{ type: 'text', text: { content: newTitle } }] }
}

// Description
const newDesc = transform(rtExtract(props.Description))
propUpdates.Description = { rich_text: [{ type: 'text', text: { content: newDesc } }] }

// Quote
const newQuote = transform(rtExtract(props.Quote))
propUpdates.Quote = { rich_text: [{ type: 'text', text: { content: newQuote } }] }

// HeroMetric
const newHM = transform(rtExtract(props.HeroMetric))
propUpdates.HeroMetric = { rich_text: [{ type: 'text', text: { content: newHM } }] }

// HeroMetricLabel
const newHML = transform(rtExtract(props.HeroMetricLabel))
propUpdates.HeroMetricLabel = { rich_text: [{ type: 'text', text: { content: newHML } }] }

// StatsJson
const newStats = transform(rtExtract(props.StatsJson))
propUpdates.StatsJson = { rich_text: [{ type: 'text', text: { content: newStats } }] }

// Tags (multi_select): rename リード獲得10倍 → リード獲得20倍
const newTags = props.Tags.multi_select.map((t) =>
  t.name === 'リード獲得10倍' ? { name: 'リード獲得20倍' } : { name: t.name }
)
propUpdates.Tags = { multi_select: newTags }

await notion.pages.update({ page_id: PAGE_ID, properties: propUpdates })
console.log('✓ Properties updated')
console.log('  Title:', newTitle.slice(0, 80))
console.log('  HeroMetric:', newHM)
console.log('  Stats:', newStats)

// ==== Update body blocks ====
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

let updated = 0
for (const b of blocks) {
  const type = b.type
  const body = b[type]
  if (!body?.rich_text) continue
  const text = body.rich_text.map((r) => r.plain_text).join('')
  const next = transform(text)
  if (next === text) continue
  await notion.blocks.update({
    block_id: b.id,
    [type]: { rich_text: [{ type: 'text', text: { content: next } }] },
  })
  updated++
  console.log(`  [${type}] ${next.slice(0, 70)}...`)
}

console.log(`\n✓ ${updated} body blocks updated`)
