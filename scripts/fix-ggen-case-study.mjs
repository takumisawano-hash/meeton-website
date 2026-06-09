import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const PAGE_ID = '37544e31-fe62-8170-b75e-cb1c5b7554bd'

const TEXT_TYPES = ['paragraph', 'heading_2', 'heading_3', 'quote', 'bulleted_list_item']

function textOf(b) {
  const rt = b[b.type]?.rich_text
  if (!Array.isArray(rt)) return ''
  return rt.map((r) => r.plain_text).join('')
}

// fetch all children
const blocks = []
let cursor
do {
  const r = await notion.blocks.children.list({ block_id: PAGE_ID, start_cursor: cursor, page_size: 100 })
  blocks.push(...r.results)
  cursor = r.has_more ? r.next_cursor : undefined
} while (cursor)

// 1) Fix 1000件 → 10件
for (const b of blocks) {
  if (!TEXT_TYPES.includes(b.type)) continue
  const full = textOf(b)
  if (full.includes('1000件')) {
    const newText = full.replace(/1000件/g, '10件')
    await notion.blocks.update({
      block_id: b.id,
      [b.type]: { rich_text: [{ type: 'text', text: { content: newText } }] },
    })
    console.log('✓ updated:', newText.slice(0, 40))
  }
}

// 2) Remove 来訪企業の属性可視化 section (heading + following non-heading blocks)
const startIdx = blocks.findIndex(
  (b) => TEXT_TYPES.includes(b.type) && textOf(b).includes('来訪企業の属性可視化')
)
if (startIdx >= 0) {
  const toDelete = [blocks[startIdx].id]
  for (let i = startIdx + 1; i < blocks.length; i++) {
    const t = blocks[i].type
    if (t === 'heading_2' || t === 'heading_3') break
    toDelete.push(blocks[i].id)
  }
  for (const id of toDelete) {
    await notion.blocks.delete({ block_id: id })
  }
  console.log('✓ deleted 来訪企業 section blocks:', toDelete.length)
} else {
  console.log('• 来訪企業 section not found (already removed?)')
}

console.log('done')
