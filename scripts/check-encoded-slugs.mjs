import 'dotenv/config'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const db = await notion.databases.retrieve({ database_id: process.env.NOTION_DATABASE_ID })
const dataSourceId = db.data_sources?.[0]?.id || process.env.NOTION_DATABASE_ID

const ds = (notion).dataSources
let cursor
const allSlugs = []
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
    if (slug) allSlugs.push({ slug, title })
  }
  cursor = r.has_more ? r.next_cursor : undefined
} while (cursor)

console.log(`Total: ${allSlugs.length}`)
const encoded = allSlugs.filter(s => s.slug.includes('%'))
const plain = allSlugs.filter(s => !s.slug.includes('%'))
console.log(`URL-encoded slugs: ${encoded.length}`)
console.log(`Plain slugs: ${plain.length}`)

console.log(`\n=== URL-encoded examples ===`)
encoded.slice(0, 5).forEach(s => {
  console.log(`Slug: ${s.slug.slice(0, 80)}`)
  console.log(`Title: ${s.title.slice(0, 80)}`)
  try {
    console.log(`Decoded: ${decodeURIComponent(s.slug).slice(0, 80)}`)
  } catch {}
  console.log()
})
