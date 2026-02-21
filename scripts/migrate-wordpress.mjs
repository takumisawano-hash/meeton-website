/**
 * WordPress to Notion Migration Script
 *
 * Usage:
 *   node scripts/migrate-wordpress.mjs
 */

import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// WordPress XML file path
const WP_EXPORT_PATH = '/Users/takumi/Downloads/dynameet.WordPress.2026-02-20.xml'

function parseWordPressXML(xmlContent) {
  const posts = []

  // Match all <item> blocks
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  let match

  while ((match = itemRegex.exec(xmlContent)) !== null) {
    const itemContent = match[1]

    // Check if it's a post (not page, attachment, etc.)
    const postTypeMatch = itemContent.match(/<wp:post_type><!\[CDATA\[(.*?)\]\]><\/wp:post_type>/)
    if (!postTypeMatch || postTypeMatch[1] !== 'post') continue

    // Check if published
    const statusMatch = itemContent.match(/<wp:status><!\[CDATA\[(.*?)\]\]><\/wp:status>/)
    if (!statusMatch || statusMatch[1] !== 'publish') continue

    // Extract title
    const titleMatch = itemContent.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)
    const title = titleMatch ? titleMatch[1] : ''

    // Extract slug (post_name)
    const slugMatch = itemContent.match(/<wp:post_name><!\[CDATA\[(.*?)\]\]><\/wp:post_name>/)
    const slug = slugMatch ? slugMatch[1] : ''

    // Extract content
    const contentMatch = itemContent.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/)
    const content = contentMatch ? contentMatch[1] : ''

    // Extract publish date
    const dateMatch = itemContent.match(/<wp:post_date><!\[CDATA\[(.*?)\]\]><\/wp:post_date>/)
    const publishedDate = dateMatch ? dateMatch[1] : ''

    // Extract category
    const categoryMatch = itemContent.match(/<category domain="category" nicename="([^"]+)"><!\[CDATA\[(.*?)\]\]><\/category>/)
    const categorySlug = categoryMatch ? categoryMatch[1] : ''
    const category = categoryMatch ? categoryMatch[2] : ''

    // Extract meta description (from Yoast)
    const descMatch = itemContent.match(/<wp:meta_key><!\[CDATA\[_yoast_wpseo_metadesc\]\]><\/wp:meta_key>\s*<wp:meta_value><!\[CDATA\[([\s\S]*?)\]\]><\/wp:meta_value>/)
    const description = descMatch ? descMatch[1] : ''

    // Extract old URL
    const linkMatch = itemContent.match(/<link>(.*?)<\/link>/)
    const oldUrl = linkMatch ? linkMatch[1] : ''

    if (title && slug) {
      posts.push({
        title,
        slug,
        content,
        publishedDate,
        category,
        categorySlug,
        description,
        oldUrl
      })
    }
  }

  return posts
}

function generateRedirects(posts) {
  const redirects = []

  for (const post of posts) {
    // Old WordPress URLs from root (dynameet.ai/slug/)
    redirects.push({
      source: `/${post.slug}/`,
      destination: `/blog/${post.slug}/`,
      permanent: true
    })
    redirects.push({
      source: `/${post.slug}`,
      destination: `/blog/${post.slug}/`,
      permanent: true
    })
  }

  return redirects
}

function stripHtml(html) {
  // Remove WordPress block comments
  let text = html.replace(/<!--[\s\S]*?-->/g, '')
  // Remove HTML tags
  text = text.replace(/<[^>]+>/g, '')
  // Decode HTML entities
  text = text.replace(/&nbsp;/g, ' ')
  text = text.replace(/&amp;/g, '&')
  text = text.replace(/&lt;/g, '<')
  text = text.replace(/&gt;/g, '>')
  text = text.replace(/&quot;/g, '"')
  // Trim whitespace
  text = text.replace(/\s+/g, ' ').trim()
  return text
}

async function main() {
  console.log('Reading WordPress export file...')
  const xmlContent = fs.readFileSync(WP_EXPORT_PATH, 'utf-8')

  console.log('Parsing posts...')
  const posts = parseWordPressXML(xmlContent)

  console.log(`Found ${posts.length} published posts\n`)

  // Output summary
  console.log('=== Posts Summary ===\n')

  const categories = new Map()

  for (const post of posts) {
    const cat = post.category || 'Uncategorized'
    categories.set(cat, (categories.get(cat) || 0) + 1)
  }

  console.log('Categories:')
  for (const [cat, count] of categories) {
    console.log(`  ${cat}: ${count} posts`)
  }

  console.log('\n=== Sample Posts ===\n')
  for (let i = 0; i < Math.min(5, posts.length); i++) {
    const post = posts[i]
    console.log(`${i + 1}. ${post.title}`)
    console.log(`   Slug: ${post.slug}`)
    console.log(`   Category: ${post.category}`)
    console.log(`   Date: ${post.publishedDate}`)
    console.log(`   Old URL: ${post.oldUrl}`)
    console.log(`   New URL: /blog/${post.slug}/`)
    console.log('')
  }

  // Generate redirects
  console.log('=== Generating Redirects ===\n')
  const redirects = generateRedirects(posts)
  console.log(`Generated ${redirects.length} redirect rules`)

  // Save posts as JSON for Notion import
  const postsJson = posts.map(p => ({
    title: p.title,
    slug: p.slug,
    publishedDate: p.publishedDate.split(' ')[0], // Just date part
    category: p.category,
    description: p.description || stripHtml(p.content).substring(0, 200),
    content: p.content // Full WordPress content
  }))

  const outputPath = path.join(__dirname, 'wp-posts.json')
  fs.writeFileSync(outputPath, JSON.stringify(postsJson, null, 2))
  console.log(`\nSaved posts data to ${outputPath}`)

  // Save redirects
  const redirectsPath = path.join(__dirname, 'wp-redirects.json')
  fs.writeFileSync(redirectsPath, JSON.stringify(redirects, null, 2))
  console.log(`Saved redirects to ${redirectsPath}`)

  // Output for manual verification
  console.log('\n=== All Post Slugs ===\n')
  posts.forEach((p, i) => {
    console.log(`${(i + 1).toString().padStart(3)}. ${p.slug}`)
  })
}

main().catch(console.error)
