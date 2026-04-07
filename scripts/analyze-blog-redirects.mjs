#!/usr/bin/env node
// Analyze blog-redirects.js: which destinations exist in Notion, which don't
// Tries to find a matching Notion post by title similarity for unmatched ones

import 'dotenv/config'
import fs from 'node:fs'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const databaseId = process.env.NOTION_DATABASE_ID

// Fetch all Notion blog posts
async function getAllPosts() {
  const posts = []
  let cursor
  // Get data source ID
  const db = await notion.databases.retrieve({ database_id: databaseId })
  // eslint-disable-next-line
  const dataSourceId = db.data_sources?.[0]?.id || databaseId

  do {
    // eslint-disable-next-line
    const ds = (notion).dataSources
    const response = await ds.query({
      data_source_id: dataSourceId,
      filter: {
        property: 'Published',
        checkbox: { equals: true },
      },
      start_cursor: cursor,
      page_size: 100,
    })
    for (const page of response.results) {
      const props = page.properties
      const title = props.Title?.title?.map(t => t.plain_text).join('') || ''
      const slug = props.Slug?.rich_text?.map(t => t.plain_text).join('') || ''
      if (slug) posts.push({ slug, title })
    }
    cursor = response.has_more ? response.next_cursor : undefined
  } while (cursor)

  return posts
}

// Load redirects
const redirectsContent = fs.readFileSync('scripts/blog-redirects.js', 'utf-8')
const sourceMatches = [...redirectsContent.matchAll(/"source": "([^"]+)"[\s\S]*?"destination": "([^"]+)"/g)]
const redirects = sourceMatches.map(m => ({ source: m[1], destination: m[2] }))

console.log(`Total redirects: ${redirects.length}`)

const posts = await getAllPosts()
console.log(`Total Notion posts: ${posts.length}`)

const validSlugs = new Set(posts.map(p => p.slug))

// Decode helper
const decode = (s) => {
  try { return decodeURIComponent(s) } catch { return s }
}

const matched = []
const unmatched = []

for (const r of redirects) {
  const destSlug = r.destination.replace(/^\/blog\//, '').replace(/\/$/, '')
  if (validSlugs.has(destSlug)) {
    matched.push(r)
  } else {
    // Try fuzzy match: decode source and look for keywords in titles
    const decodedSrc = decode(r.source.replace(/^\//, ''))
    // Try to find a post whose title shares significant overlap
    const srcKeywords = decodedSrc.match(/[\u4e00-\u9fa5]{2,}|[a-zA-Z0-9]{3,}/g) || []
    let bestMatch = null
    let bestScore = 0
    for (const post of posts) {
      let score = 0
      for (const kw of srcKeywords) {
        if (post.title.includes(kw) || post.slug.includes(kw.toLowerCase())) score++
      }
      if (score > bestScore) {
        bestScore = score
        bestMatch = post
      }
    }
    unmatched.push({
      source: r.source,
      destSlug,
      decodedSrc,
      bestMatch: bestScore >= 2 ? { ...bestMatch, score: bestScore } : null,
    })
  }
}

console.log(`\n=== SUMMARY ===`)
console.log(`Matched (destination exists in Notion): ${matched.length}`)
console.log(`Unmatched: ${unmatched.length}`)
console.log(`  - With fuzzy match (score >= 2): ${unmatched.filter(u => u.bestMatch).length}`)
console.log(`  - No match found: ${unmatched.filter(u => !u.bestMatch).length}`)

// Save detailed report
fs.writeFileSync('scripts/redirect-analysis.json', JSON.stringify({
  totalRedirects: redirects.length,
  totalNotionPosts: posts.length,
  matched: matched.length,
  unmatchedWithFuzzy: unmatched.filter(u => u.bestMatch).length,
  unmatchedNoMatch: unmatched.filter(u => !u.bestMatch).length,
  unmatched,
}, null, 2))

console.log(`\nDetailed report: scripts/redirect-analysis.json`)

// Show 5 examples of fuzzy matches
console.log(`\n=== FUZZY MATCH EXAMPLES (first 5) ===`)
unmatched.filter(u => u.bestMatch).slice(0, 5).forEach(u => {
  console.log(`\nSource: ${u.decodedSrc.slice(0, 60)}...`)
  console.log(`Best match: "${u.bestMatch.title.slice(0, 60)}..." (score: ${u.bestMatch.score})`)
  console.log(`  → /blog/${u.bestMatch.slug}/`)
})
