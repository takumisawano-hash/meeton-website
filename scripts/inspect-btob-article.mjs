import { Client } from '@notionhq/client'
import fs from 'node:fs'

const env = fs.readFileSync('.env.local', 'utf8')
env.split('\n').forEach(line => {
  const [k, ...v] = line.split('=')
  if (k && v.length) process.env[k.trim()] = v.join('=').trim()
})

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const PAGE = '30d44e31-fe62-81d6-b5ce-ddead07a7690'

let cursor = undefined
let idx = 0
do {
  const res = await notion.blocks.children.list({ block_id: PAGE, start_cursor: cursor, page_size: 100 })
  for (const b of res.results) {
    const t = b.type
    const rt = b[t]?.rich_text || []
    const text = rt.map(r => r.plain_text).join('')
    const truncated = text.length > 120 ? text.slice(0, 120) + '...' : text
    console.log(`[${idx}] ${b.id} ${t}: ${truncated}`)
    idx++
  }
  cursor = res.has_more ? res.next_cursor : undefined
} while (cursor)
