import 'dotenv/config'
import { Client } from '@notionhq/client'
import fs from 'node:fs'

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const db = await notion.databases.retrieve({ database_id: process.env.NOTION_DATABASE_ID })
const dataSourceId = db.data_sources?.[0]?.id || process.env.NOTION_DATABASE_ID

const ds = (notion).dataSources
let cursor
const broken = []
do {
  const r = await ds.query({
    data_source_id: dataSourceId,
    filter: { property: 'Published', checkbox: { equals: true } },
    start_cursor: cursor,
    page_size: 100,
  })
  for (const p of r.results) {
    const slug = p.properties.Slug?.rich_text?.map(t => t.plain_text).join('') || ''
    const title = p.properties.Title?.title?.map(t => t.plain_text).join('') || ''
    const category = p.properties.Category?.select?.name || ''
    if (slug.includes('%')) {
      broken.push({ id: p.id, slug, title, category })
    }
  }
  cursor = r.has_more ? r.next_cursor : undefined
} while (cursor)

console.log(`Found ${broken.length} posts with URL-encoded slugs\n`)
broken.forEach((p, i) => {
  console.log(`${i + 1}. ${p.title}`)
  console.log(`   Category: ${p.category}`)
  console.log(`   Current slug (first 60 chars): ${p.slug.slice(0, 60)}...`)
  console.log()
})

fs.writeFileSync('scripts/broken-slugs.json', JSON.stringify(broken, null, 2))
console.log(`Saved to scripts/broken-slugs.json`)
