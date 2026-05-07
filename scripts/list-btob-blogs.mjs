
import { Client } from '@notionhq/client'
import fs from 'node:fs'

// Load .env.local
const env = fs.readFileSync('.env.local', 'utf8')
env.split('\n').forEach(line => {
  const [k, ...v] = line.split('=')
  if (k && v.length) process.env[k.trim()] = v.join('=').trim()
})

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const dbId = process.env.NOTION_DATABASE_ID

const db = await notion.databases.retrieve({ database_id: dbId })
const dsId = db.data_sources[0].id

let cursor = undefined
const all = []
do {
  const res = await notion.dataSources.query({
    data_source_id: dsId,
    start_cursor: cursor,
    page_size: 100,
    filter: { property: 'Published', checkbox: { equals: true } },
  })
  all.push(...res.results)
  cursor = res.has_more ? res.next_cursor : undefined
} while (cursor)

// Title + slug + id
const rows = all.map(p => ({
  id: p.id,
  slug: p.properties.Slug?.rich_text?.[0]?.plain_text || '',
  title: p.properties.Title?.title?.[0]?.plain_text || '',
  tags: (p.properties.Tags?.multi_select || []).map(t => t.name),
}))

// Filter for BtoB/AI/チャット/リード/SDR related
const keywords = ['btob', 'b2b', 'チャット', 'chatbot', 'chat-bot', 'ai', 'リード', 'lead', 'sdr', 'abm', 'インサイドセールス', 'inside', '接客', 'マーケティング', 'marketing', '商談', '匿名', 'cookie', 'ターゲット', 'ファーストパーティ', 'first-party', 'ナーチャリング', 'nurture']
const related = rows.filter(r => {
  const hay = (r.title + ' ' + r.slug + ' ' + r.tags.join(' ')).toLowerCase()
  return keywords.some(k => hay.includes(k.toLowerCase()))
})

console.log('TOTAL PUBLISHED:', rows.length)
console.log('BTOB/AI/CHAT RELATED:', related.length)
related.forEach(r => {
  console.log(`---`)
  console.log(`ID: ${r.id}`)
  console.log(`SLUG: ${r.slug}`)
  console.log(`TITLE: ${r.title}`)
  console.log(`TAGS: ${r.tags.join(', ')}`)
})
