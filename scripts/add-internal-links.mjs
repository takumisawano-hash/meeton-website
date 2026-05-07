import { Client } from '@notionhq/client'
import fs from 'node:fs'

const env = fs.readFileSync('.env.local', 'utf8')
env.split('\n').forEach(line => {
  const [k, ...v] = line.split('=')
  if (k && v.length) process.env[k.trim()] = v.join('=').trim()
})

const notion = new Client({ auth: process.env.NOTION_TOKEN })

// Source articles → link to `/blog/cookieless-btobmarketing-ai/`
// Each entry: page id + custom intro that fits the article's theme
const TARGET_URL = 'https://dynameet.ai/blog/cookieless-btobmarketing-ai/'
const TARGET_TITLE = '【2026年版】BtoBチャットボット完全ガイド｜AI接客で匿名訪問者を商談化する7つの戦略'

const SOURCES = [
  {
    id: '30d44e31-fe62-8125-9b57-d5fd9f0d169f',
    slug: 'websitebounce-meeting-ai',
    intro: 'AIチャットボットによる「ゼロフリクション接客」の具体的な実装戦略については、次の完全ガイドも参考になります。',
    anchor: 'BtoBチャットボット完全ガイド｜AI接客で匿名訪問者を商談化する7つの戦略',
  },
  {
    id: '30d44e31-fe62-81ab-b466-f774ecb5b36d',
    slug: 'websitevisitor-99-anonymousvisitor-ai',
    intro: '匿名訪問者を具体的にどうBtoBチャットボットで商談化するか、7つの戦略にまとめた完全ガイドがあります。',
    anchor: 'BtoBチャットボット完全ガイド：AI接客で匿名訪問者を商談化する7つの戦略',
  },
  {
    id: '30d44e31-fe62-818f-9a42-cc43d5581f47',
    slug: '2026-cookieless-meeting',
    intro: 'クッキーレス時代にBtoBチャットボットをどう設計すべきか、第一者データ活用の観点から完全ガイドでも解説しています。',
    anchor: '【2026年版】BtoBチャットボット完全ガイド｜AI接客で匿名訪問者を商談化する7つの戦略',
  },
  {
    id: '30d44e31-fe62-8140-9aec-cfaea05bb577',
    slug: 'ai-meeting-2026-drift-intercom',
    intro: '自律型オーケストレーション型のBtoBチャットボットで、Drift/Intercom依存から脱却する7つの戦略を解説しています。',
    anchor: 'BtoBチャットボット完全ガイド：AI接客で匿名訪問者を商談化する7つの戦略',
  },
  {
    id: '30d44e31-fe62-81d3-ac21-e73f33667531',
    slug: '2026-leadform-ai',
    intro: 'リードフォーム廃止後の受け皿となる、BtoBチャットボットの具体的な設計指針は次のガイドにまとめています。',
    anchor: '【2026年版】BtoBチャットボット完全ガイド｜AI接客で匿名訪問者を商談化する7つの戦略',
  },
  {
    id: '30d44e31-fe62-81b9-b4f4-cc4f9e95be90',
    slug: 'websitebounce',
    intro: '離脱防止の実装手段としてのBtoBチャットボットについては、AI接客7戦略を網羅した完全ガイドがあります。',
    anchor: 'BtoBチャットボット完全ガイド：AI接客で匿名訪問者を商談化する7つの戦略',
  },
  {
    id: '30d44e31-fe62-81c4-9176-fa6da8f06cc3',
    slug: 'speed-to-lead-5min-8x-conversion-b2b',
    intro: 'Speed to Leadを実現する具体的な手段として、BtoBチャットボットによる24/7即時応答の設計指針をまとめたガイドがあります。',
    anchor: 'BtoBチャットボット完全ガイド：AI接客で匿名訪問者を商談化する7つの戦略',
  },
]

async function alreadyLinked(pageId) {
  // Check if target URL already appears in the page's blocks (avoid double-insertion)
  let cursor = undefined
  do {
    const res = await notion.blocks.children.list({ block_id: pageId, start_cursor: cursor, page_size: 100 })
    for (const b of res.results) {
      const rts = b[b.type]?.rich_text || []
      for (const rt of rts) {
        if (rt.type === 'text' && rt.text?.link?.url && rt.text.link.url.includes('cookieless-btobmarketing-ai')) {
          return true
        }
      }
    }
    cursor = res.has_more ? res.next_cursor : undefined
  } while (cursor)
  return false
}

async function appendRelatedBlock(source) {
  const { id, slug, intro, anchor } = source
  if (await alreadyLinked(id)) {
    console.log(`SKIP (already linked): ${slug}`)
    return
  }

  const children = [
    { object: 'block', type: 'divider', divider: {} },
    {
      object: 'block',
      type: 'heading_3',
      heading_3: {
        rich_text: [{ type: 'text', text: { content: '関連記事' } }],
      },
    },
    {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [{ type: 'text', text: { content: intro } }],
      },
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [
          {
            type: 'text',
            text: { content: anchor, link: { url: TARGET_URL } },
            annotations: { color: 'default' },
          },
        ],
      },
    },
  ]

  await notion.blocks.children.append({ block_id: id, children })
  console.log(`ADDED: ${slug}`)
}

for (const src of SOURCES) {
  try {
    await appendRelatedBlock(src)
  } catch (e) {
    console.error(`ERROR ${src.slug}:`, e.message)
  }
}

console.log('\nDone.')
