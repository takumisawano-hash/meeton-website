/**
 * Sweep recent blog articles in Notion and remove AI-tell patterns:
 *   1. Strip bold annotations from body paragraphs (preserve in headings/code).
 *   2. Detect pipe-table paragraphs (`| ... | ... |`) and report.
 *   3. Detect "- **term**:" definition list pattern and report.
 *
 * Usage:
 *   node scripts/clean-blog-ai-tells.mjs --report             # dry run
 *   node scripts/clean-blog-ai-tells.mjs --apply              # apply bold strip
 *   node scripts/clean-blog-ai-tells.mjs --apply --strip-tables  # also delete pipe-table paragraphs
 *   node scripts/clean-blog-ai-tells.mjs --slug XYZ           # target one slug
 */

import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const DB_ID = process.env.NOTION_DATABASE_ID
const APPLY = process.argv.includes('--apply')
const STRIP_TABLES = process.argv.includes('--strip-tables')
const SLUG_INDEX = process.argv.indexOf('--slug')
const TARGET_SLUG = SLUG_INDEX >= 0 ? process.argv[SLUG_INDEX + 1] : null
const LIMIT = APPLY ? 100 : 50

async function getDataSourceId() {
  const db = await notion.databases.retrieve({ database_id: DB_ID })
  const ds = db.data_sources?.[0]
  return ds?.id || DB_ID
}

function isPipeTableLine(text) {
  // Heuristic: line contains 2+ pipes and is mostly pipe-separated tokens
  if (!text) return false
  const trimmed = text.trim()
  if (!trimmed.startsWith('|') && !trimmed.includes('|')) return false
  const pipeCount = (trimmed.match(/\|/g) || []).length
  if (pipeCount < 2) return false
  // separator row like | --- | --- |
  if (/^\s*\|?(\s*-+\s*\|)+\s*-*\s*$/.test(trimmed)) return true
  // header/data row: starts and ends with pipe and has ≥2 cells
  return /^\|[^|]+\|/.test(trimmed) || (pipeCount >= 3 && trimmed.includes('|'))
}

function getBlockText(block) {
  const t = block.type
  const rt = block[t]?.rich_text
  if (!Array.isArray(rt)) return ''
  return rt.map((r) => r.plain_text || '').join('')
}

async function fetchBlocks(pageId) {
  const blocks = []
  let cursor
  do {
    const list = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100,
    })
    blocks.push(...list.results)
    cursor = list.has_more ? list.next_cursor : undefined
  } while (cursor)
  return blocks
}

async function stripBoldFromBlock(block) {
  const t = block.type
  // Only process body content blocks. Skip headings (we want bold in headings).
  if (!['paragraph', 'bulleted_list_item', 'numbered_list_item', 'quote', 'callout', 'toggle'].includes(t)) {
    return false
  }
  const rt = block[t]?.rich_text
  if (!Array.isArray(rt) || rt.length === 0) return false
  let modified = false
  const newRt = rt.map((r) => {
    if (r.annotations?.bold) {
      modified = true
      return {
        ...r,
        annotations: { ...r.annotations, bold: false },
      }
    }
    return r
  })
  if (!modified) return false
  // Notion API requires the rich_text payload be re-shaped to writable form
  const payload = newRt.map((r) => {
    if (r.type === 'text') {
      return {
        type: 'text',
        text: { content: r.text.content, link: r.text.link || null },
        annotations: r.annotations,
      }
    }
    if (r.type === 'mention') {
      return { type: 'mention', mention: r.mention, annotations: r.annotations }
    }
    if (r.type === 'equation') {
      return { type: 'equation', equation: r.equation, annotations: r.annotations }
    }
    return null
  }).filter(Boolean)
  await notion.blocks.update({
    block_id: block.id,
    [t]: { rich_text: payload },
  })
  return true
}

async function processArticle(page) {
  const props = page.properties || {}
  const title = (props.Title?.title || []).map((r) => r.plain_text).join('')
  const slug = (props.Slug?.rich_text || []).map((r) => r.plain_text).join('')
  const blocks = await fetchBlocks(page.id)

  let boldBlocks = 0
  let pipeTableBlocks = 0
  let defPatternBlocks = 0
  const pipeBlockIds = []

  for (const b of blocks) {
    const text = getBlockText(b)
    const t = b.type
    if (['paragraph', 'bulleted_list_item', 'numbered_list_item', 'quote', 'callout', 'toggle'].includes(t)) {
      const rt = b[t]?.rich_text || []
      if (rt.some((r) => r.annotations?.bold)) boldBlocks += 1
      if (isPipeTableLine(text)) {
        pipeTableBlocks += 1
        pipeBlockIds.push(b.id)
      }
      // "- **term**:" pattern detection (within a single block)
      if (t === 'bulleted_list_item' && rt.length >= 2 && rt[0].annotations?.bold) {
        const second = (rt[1].plain_text || '').trim()
        if (second.startsWith(':') || second.startsWith('：') || second.startsWith('—')) {
          defPatternBlocks += 1
        }
      }
    }
  }

  let stripped = 0
  let tablesRemoved = 0
  if (APPLY) {
    for (const b of blocks) {
      if (await stripBoldFromBlock(b)) stripped += 1
      // light throttle
      await new Promise((r) => setTimeout(r, 60))
    }
    if (STRIP_TABLES) {
      for (const id of pipeBlockIds) {
        try {
          await notion.blocks.delete({ block_id: id })
          tablesRemoved += 1
        } catch (e) {
          // ignore
        }
        await new Promise((r) => setTimeout(r, 60))
      }
    }
  }

  return {
    title,
    slug,
    pageId: page.id,
    counts: { boldBlocks, pipeTableBlocks, defPatternBlocks },
    actions: APPLY ? { stripped, tablesRemoved } : null,
  }
}

async function main() {
  const dsId = await getDataSourceId()
  const filter = TARGET_SLUG
    ? {
        and: [
          { property: 'Published', checkbox: { equals: true } },
          { property: 'Slug', rich_text: { equals: TARGET_SLUG } },
        ],
      }
    : { property: 'Published', checkbox: { equals: true } }
  const res = await notion.dataSources.query({
    data_source_id: dsId,
    filter,
    sorts: [{ property: 'PublishedDate', direction: 'descending' }],
    page_size: LIMIT,
  })
  console.log(`Scanning ${res.results.length} articles${APPLY ? ' (APPLY MODE)' : ' (report only)'}`)
  console.log('')
  const offenders = []
  for (const page of res.results) {
    const r = await processArticle(page)
    const { boldBlocks, pipeTableBlocks, defPatternBlocks } = r.counts
    const flags = [
      boldBlocks > 0 ? `bold:${boldBlocks}` : null,
      pipeTableBlocks > 0 ? `pipe:${pipeTableBlocks}` : null,
      defPatternBlocks > 0 ? `def:${defPatternBlocks}` : null,
    ].filter(Boolean)
    if (flags.length === 0) continue
    const action = r.actions ? ` ▸ stripped:${r.actions.stripped} ${STRIP_TABLES ? `removed:${r.actions.tablesRemoved}` : ''}` : ''
    console.log(`[${flags.join(' ')}] ${r.title}${action}`)
    console.log(`    /blog/${r.slug}/`)
    offenders.push(r)
  }
  console.log('')
  console.log(`${offenders.length}/${res.results.length} articles flagged`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
