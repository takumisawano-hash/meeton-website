import { Client } from '@notionhq/client'
const notion = new Client({ auth: process.env.NOTION_TOKEN })
const PAGE_ID = '34f44e31-fe62-817d-9bfd-d1b73cdf37ee'

const blocks = []
let cursor
do {
  const list = await notion.blocks.children.list({ block_id: PAGE_ID, start_cursor: cursor, page_size: 100 })
  blocks.push(...list.results)
  cursor = list.has_more ? list.next_cursor : undefined
} while (cursor)

function plain(b) {
  const t = b.type
  return (b[t]?.rich_text || []).map((r) => r.plain_text).join('')
}

const h = blocks.find((b) => b.type === 'heading_3' && plain(b).includes('月9件の安定リード'))
if (h) {
  await notion.blocks.update({
    block_id: h.id,
    heading_3: { rich_text: [{ type: 'text', text: { content: '数字——3ヶ月で受注2件、提案件数 約2倍' } }] },
  })
  console.log('✓ h3 fixed')
} else {
  console.log('h3 not found')
}
