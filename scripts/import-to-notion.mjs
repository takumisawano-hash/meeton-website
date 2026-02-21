/**
 * Import WordPress posts to Notion
 *
 * Usage:
 *   node scripts/import-to-notion.mjs
 */

import { Client } from '@notionhq/client'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Notion API setup
const notion = new Client({ auth: process.env.NOTION_TOKEN })
const DATABASE_ID = process.env.NOTION_DATABASE_ID

// Load WordPress posts
const postsPath = path.join(__dirname, 'wp-posts.json')
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'))

// Category mapping (Japanese -> English)
const categoryMap = {
  'インサイドセールス': 'Inside Sales',
  'セールス': 'Sales',
  'マーケティング': 'Marketing',
  'イベント': 'Events',
  'お知らせ': 'News',
  'インターン生インタビュー': 'Interview',
  '未分類': 'Uncategorized'
}

// Japanese slug to English slug mapping
// For URL-encoded Japanese slugs, we need to provide English alternatives
function generateEnglishSlug(japaneseSlug, title) {
  // If already English, return as-is
  if (!/^%[0-9a-f]{2}/i.test(japaneseSlug) && !/[\u3000-\u9fff]/.test(japaneseSlug)) {
    return japaneseSlug
  }

  // Decode and create a simple slug from the title pattern
  const decoded = decodeURIComponent(japaneseSlug)

  // Extract key concepts and map to English
  const slugMappings = {
    '営業効率化': 'sales-efficiency',
    'メールマーケティング': 'email-marketing',
    'セールスチャンピオン': 'sales-champion',
    'セールスリーダーシップ': 'sales-leadership',
    '収益を最大化': 'maximize-revenue',
    'セールスパイプライン': 'sales-pipeline',
    'アポ取り': 'booking-meetings',
    '停滞した商談': 'stalled-deals',
    'ウェビナー': 'webinar',
    'イベントレポート': 'event-report',
    'AI SDR': 'ai-sdr',
    'AIエージェント': 'ai-agent',
    'AIチャットボット': 'ai-chatbot',
    'インテントデータ': 'intent-data',
    'パイプライン予測': 'pipeline-forecast',
    'シナリオ型チャットボット': 'scenario-chatbot',
    'ABM': 'abm',
    'SDR': 'sdr',
    'RevOps': 'revops',
    'CRO': 'cro',
    'B2B': 'b2b',
    'SaaS': 'saas',
    'KPI': 'kpi',
    'リード': 'lead',
    '商談': 'meeting',
    '営業': 'sales',
    'マーケティング': 'marketing',
    'ウェブサイト': 'website',
    '離脱': 'bounce',
    '匿名': 'anonymous',
    '訪問者': 'visitor',
    '見込み客': 'prospect',
    '自動化': 'automation',
    '予約': 'booking',
    '日程調整': 'scheduling',
    'コンテンツ': 'content',
    '戦略': 'strategy',
    '成功': 'success',
    '最適化': 'optimization',
    '統合': 'integration',
    '分析': 'analytics',
    '連携': 'collaboration',
    '成長': 'growth',
    '新機能': 'new-feature',
    '2026年': '2026',
    '2025年': '2025',
    'クッキーレス': 'cookieless',
    'SEO': 'seo',
    'SXO': 'sxo',
    'CAC': 'cac',
    'GTM': 'gtm',
    '購入後悔': 'buyers-remorse',
    'チーム': 'team',
    'グループ': 'group',
    'フォーム': 'form',
    'ダークソーシャル': 'dark-social',
    'パーソナライゼーション': 'personalization',
    'エンゲージメント': 'engagement',
    'ベロシティ': 'velocity',
    'モメンタム': 'momentum',
    '購買委員会': 'buying-committee',
  }

  // Try to find a matching pattern
  let englishSlug = decoded.toLowerCase()

  // Replace Japanese terms with English
  for (const [jp, en] of Object.entries(slugMappings)) {
    if (decoded.includes(jp)) {
      englishSlug = englishSlug.replace(new RegExp(jp, 'gi'), en)
    }
  }

  // Remove remaining Japanese characters and clean up
  englishSlug = englishSlug
    .replace(/[\u3000-\u9fff\uff00-\uffef]+/g, '-')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  // If still too short or weird, generate from title
  if (englishSlug.length < 10) {
    // Create a slug from post title keywords
    englishSlug = `jp-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`
  }

  return englishSlug
}

// Convert WordPress content to Notion blocks (simplified)
function wpContentToNotionBlocks(htmlContent) {
  const blocks = []

  // Remove WordPress block comments
  let content = htmlContent.replace(/<!--[\s\S]*?-->/g, '')

  // Split by paragraph
  const paragraphs = content.split(/<\/p>|<\/h[1-6]>|<\/ul>|<\/ol>|<hr[^>]*>/i)

  for (const para of paragraphs) {
    const trimmed = para.trim()
    if (!trimmed) continue

    // Check for headings
    const h2Match = trimmed.match(/<h2[^>]*>(.*)/i)
    const h3Match = trimmed.match(/<h3[^>]*>(.*)/i)
    const h4Match = trimmed.match(/<h4[^>]*>(.*)/i)

    // Check for list
    const isUnorderedList = trimmed.includes('<ul')
    const isOrderedList = trimmed.includes('<ol')

    if (h2Match) {
      const text = stripHtml(h2Match[1])
      if (text) {
        blocks.push({
          type: 'heading_2',
          heading_2: {
            rich_text: [{ type: 'text', text: { content: text.substring(0, 2000) } }]
          }
        })
      }
    } else if (h3Match) {
      const text = stripHtml(h3Match[1])
      if (text) {
        blocks.push({
          type: 'heading_3',
          heading_3: {
            rich_text: [{ type: 'text', text: { content: text.substring(0, 2000) } }]
          }
        })
      }
    } else if (h4Match) {
      const text = stripHtml(h4Match[1])
      if (text) {
        blocks.push({
          type: 'heading_3',
          heading_3: {
            rich_text: [{ type: 'text', text: { content: text.substring(0, 2000) } }]
          }
        })
      }
    } else if (isUnorderedList || isOrderedList) {
      // Extract list items
      const liMatches = trimmed.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)
      for (const li of liMatches) {
        const text = stripHtml(li[1])
        if (text) {
          blocks.push({
            type: 'bulleted_list_item',
            bulleted_list_item: {
              rich_text: [{ type: 'text', text: { content: text.substring(0, 2000) } }]
            }
          })
        }
      }
    } else if (trimmed.includes('<hr')) {
      blocks.push({ type: 'divider', divider: {} })
    } else {
      // Regular paragraph
      const text = stripHtml(trimmed)
      if (text && text.length > 0) {
        blocks.push({
          type: 'paragraph',
          paragraph: {
            rich_text: [{ type: 'text', text: { content: text.substring(0, 2000) } }]
          }
        })
      }
    }
  }

  // Notion API limits to 100 blocks per request
  return blocks.slice(0, 100)
}

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n))
    .replace(/\s+/g, ' ')
    .trim()
}

async function createNotionPage(post, newSlug) {
  const category = categoryMap[post.category] || 'Uncategorized'

  try {
    const response = await notion.pages.create({
      parent: { database_id: DATABASE_ID },
      properties: {
        Title: {
          title: [{ text: { content: post.title } }]
        },
        Slug: {
          rich_text: [{ text: { content: newSlug } }]
        },
        Published: {
          checkbox: true
        },
        PublishedDate: {
          date: { start: post.publishedDate }
        },
        Category: {
          select: { name: category }
        },
        Description: {
          rich_text: [{ text: { content: (post.description || '').substring(0, 2000) } }]
        }
      },
      children: wpContentToNotionBlocks(post.content)
    })

    return { success: true, id: response.id, slug: newSlug }
  } catch (error) {
    return { success: false, error: error.message, slug: newSlug }
  }
}

async function main() {
  console.log('Starting Notion import...\n')
  console.log(`Total posts to import: ${posts.length}\n`)

  // Generate slug mappings and redirects
  const redirects = []
  const slugMappings = []

  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i]
    const newSlug = generateEnglishSlug(post.slug, post.title)

    console.log(`[${i + 1}/${posts.length}] ${post.title.substring(0, 40)}...`)
    console.log(`  Old slug: ${post.slug}`)
    console.log(`  New slug: ${newSlug}`)

    // Add redirect if slug changed
    if (newSlug !== post.slug) {
      const oldSlugDecoded = decodeURIComponent(post.slug)
      redirects.push({
        source: `/${post.slug}/`,
        destination: `/blog/${newSlug}/`,
        permanent: true
      })
      redirects.push({
        source: `/${post.slug}`,
        destination: `/blog/${newSlug}/`,
        permanent: true
      })
      // Also add decoded version
      if (oldSlugDecoded !== post.slug) {
        redirects.push({
          source: `/${oldSlugDecoded}/`,
          destination: `/blog/${newSlug}/`,
          permanent: true
        })
      }
    }

    // Always add redirect from root to /blog/
    redirects.push({
      source: `/${newSlug}/`,
      destination: `/blog/${newSlug}/`,
      permanent: true
    })
    redirects.push({
      source: `/${newSlug}`,
      destination: `/blog/${newSlug}/`,
      permanent: true
    })

    slugMappings.push({
      title: post.title,
      oldSlug: post.slug,
      newSlug: newSlug,
      publishedDate: post.publishedDate
    })

    // Create Notion page
    const result = await createNotionPage(post, newSlug)

    if (result.success) {
      console.log(`  ✓ Created in Notion`)
      successCount++
    } else {
      console.log(`  ✗ Error: ${result.error}`)
      errorCount++
    }

    // Rate limiting - Notion API allows ~3 requests/second
    await new Promise(resolve => setTimeout(resolve, 350))
  }

  console.log('\n=== Import Complete ===')
  console.log(`Success: ${successCount}`)
  console.log(`Errors: ${errorCount}`)

  // Save redirects
  const redirectsPath = path.join(__dirname, 'notion-redirects.json')
  fs.writeFileSync(redirectsPath, JSON.stringify(redirects, null, 2))
  console.log(`\nSaved ${redirects.length} redirects to ${redirectsPath}`)

  // Save slug mappings for reference
  const mappingsPath = path.join(__dirname, 'slug-mappings.json')
  fs.writeFileSync(mappingsPath, JSON.stringify(slugMappings, null, 2))
  console.log(`Saved slug mappings to ${mappingsPath}`)
}

main().catch(console.error)
