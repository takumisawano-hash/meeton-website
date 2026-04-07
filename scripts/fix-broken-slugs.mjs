import 'dotenv/config'
import fs from 'node:fs'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_TOKEN })

const broken = JSON.parse(fs.readFileSync('scripts/broken-slugs.json', 'utf-8'))
const mapping = JSON.parse(fs.readFileSync('scripts/slug-mapping.json', 'utf-8')).mappings

// Normalize: strip full-width and special chars that mess title matching
const normalize = (s) => s.replace(/[：:!?！？、。\s—・]/g, '').toLowerCase()

// Match broken posts to mapping entries by normalized title
const updates = []
const unmatchedTitles = []
for (const post of broken) {
  const match = mapping.find(m => {
    const nPostTitle = normalize(post.title)
    const nMapTitle = normalize(m.title)
    // Match if the first 30 chars are the same
    return nPostTitle.slice(0, 30) === nMapTitle.slice(0, 30)
  })
  if (match) {
    updates.push({
      id: post.id,
      oldSlug: post.slug,
      newSlug: match.newSlug,
      title: post.title,
    })
  } else {
    unmatchedTitles.push(post.title)
  }
}

console.log(`Matched: ${updates.length} / ${broken.length}`)
if (unmatchedTitles.length) {
  console.log(`\nUnmatched titles:`)
  unmatchedTitles.forEach(t => console.log(`  - ${t}`))
  process.exit(1)
}

// Dry run preview
if (process.argv.includes('--dry-run')) {
  console.log('\n=== DRY RUN - Previewing updates ===\n')
  updates.forEach(u => {
    console.log(`${u.title.slice(0, 60)}...`)
    console.log(`  NEW: ${u.newSlug}\n`)
  })
  process.exit(0)
}

// Actually update Notion
console.log('\n=== Updating Notion... ===\n')
for (const u of updates) {
  try {
    await notion.pages.update({
      page_id: u.id,
      properties: {
        Slug: {
          rich_text: [{ type: 'text', text: { content: u.newSlug } }],
        },
      },
    })
    console.log(`✓ ${u.newSlug}`)
  } catch (e) {
    console.error(`✗ ${u.newSlug}: ${e.message}`)
  }
}

// Save mapping for redirects generation
fs.writeFileSync('scripts/slug-remap-result.json', JSON.stringify(updates, null, 2))
console.log(`\nDone. Saved result to scripts/slug-remap-result.json`)
