import { Client, APIErrorCode, isNotionClientError } from '@notionhq/client'
import { cache } from 'react'
import type {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

// Notion API 2025-09-03+ の dataSources エンドポイント（SDK型定義未対応）
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const notionDataSources = (notion as any).dataSources as {
  query: (params: Record<string, unknown>) => Promise<{
    results: Record<string, unknown>[]
    has_more: boolean
    next_cursor: string | null
  }>
}

// Global throttle: max 2 concurrent Notion API calls with 350ms gap
let _lastCallTime = 0
let _activeCalls = 0
const MAX_CONCURRENT = 2
const MIN_GAP_MS = 350

async function throttle(): Promise<void> {
  while (_activeCalls >= MAX_CONCURRENT) {
    await new Promise(r => setTimeout(r, 100))
  }
  const now = Date.now()
  const elapsed = now - _lastCallTime
  if (elapsed < MIN_GAP_MS) {
    await new Promise(r => setTimeout(r, MIN_GAP_MS - elapsed))
  }
  _lastCallTime = Date.now()
  _activeCalls++
}

function releaseThrottle(): void {
  _activeCalls = Math.max(0, _activeCalls - 1)
}

// Retry helper for rate-limited requests with jitter
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 8,
  baseDelay: number = 1500
): Promise<T> {
  let lastError: unknown
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    await throttle()
    try {
      const result = await fn()
      releaseThrottle()
      return result
    } catch (error) {
      releaseThrottle()
      lastError = error
      if (isNotionClientError(error) && error.code === APIErrorCode.RateLimited) {
        const jitter = Math.random() * 1000
        const delay = baseDelay * Math.pow(2, attempt) + jitter
        console.log(`Rate limited, retrying in ${Math.round(delay)}ms (attempt ${attempt + 1}/${maxRetries})`)
        await new Promise(resolve => setTimeout(resolve, delay))
      } else {
        throw error
      }
    }
  }
  throw lastError
}

const databaseId = process.env.NOTION_DATABASE_ID || ''

function isConfigured(): boolean {
  return Boolean(process.env.NOTION_TOKEN && process.env.NOTION_DATABASE_ID)
}

// Resolve data_source_id from database_id (required for Notion API 2025-09-03+)
let resolvedDataSourceId: string | null = null

async function getDataSourceId(): Promise<string> {
  if (resolvedDataSourceId) return resolvedDataSourceId
  const db = await withRetry(() => notion.databases.retrieve({ database_id: databaseId }))
  const dataSources = (db as Record<string, unknown>).data_sources as { id: string; name: string }[] | undefined
  if (dataSources && dataSources.length > 0) {
    // Prefer the "Blog Posts" data source by name so adding/reordering other
    // data sources on the same database doesn't silently switch us to an empty one.
    const preferred = dataSources.find((ds) => ds.name === 'Blog Posts')
    resolvedDataSourceId = (preferred ?? dataSources[0]).id
  } else {
    resolvedDataSourceId = databaseId
  }
  return resolvedDataSourceId
}

export type BlogPost = {
  id: string
  slug: string
  title: string
  description: string
  publishedDate: string
  modifiedDate: string | null  // 更新日（SEO用）
  category: string
  tags: string[]
  featuredImage: string | null
  focusKeyword: string | null  // 主要キーワード（SEO用）
  noIndex: boolean             // 検索除外フラグ
  views: number                // ビュー数（注目記事の選定用）
}

export type NotionBlock = BlockObjectResponse

function getRichTextContent(richText: RichTextItemResponse[]): string {
  return richText.map((item) => item.plain_text).join('')
}

function getPropertyValue(
  properties: PageObjectResponse['properties'],
  name: string
): string | string[] | boolean | number | null {
  const prop = properties[name]
  if (!prop) return null

  switch (prop.type) {
    case 'title':
      return getRichTextContent(prop.title)
    case 'rich_text':
      return getRichTextContent(prop.rich_text)
    case 'checkbox':
      return prop.checkbox
    case 'date':
      return prop.date?.start || null
    case 'select':
      return prop.select?.name || null
    case 'multi_select':
      return prop.multi_select.map((item) => item.name)
    case 'number':
      return prop.number ?? 0
    case 'files':
      if (prop.files.length === 0) return null
      const file = prop.files[0]
      if (file.type === 'external') return file.external.url
      if (file.type === 'file') return file.file.url
      return null
    default:
      return null
  }
}

// サムネイル画像URLを取得する
// - Notion S3画像: プロキシ経由（署名URL失効を回避）
// - Google Drive / 旧WordPress: アクセス不可のため、サムネイル生成APIで代替
// - その他外部URL: プロキシ経由（ホットリンク問題回避）
function getThumbnailUrl(page: PageObjectResponse): string | null {
  const title = (getPropertyValue(page.properties, 'Title') as string) || ''
  if (!title) return null
  const category = (getPropertyValue(page.properties, 'Category') as string) || ''
  return `/api/thumbnail/?title=${encodeURIComponent(title)}&category=${encodeURIComponent(category)}`
}

function getFeaturedImageUrl(page: PageObjectResponse): string | null {
  const prop = page.properties['FeaturedImage']
  if (!prop || prop.type !== 'files' || prop.files.length === 0) {
    // 画像未設定 → サムネイル自動生成
    return getThumbnailUrl(page)
  }

  const file = prop.files[0]
  if (file.type === 'file') {
    // Notion S3ファイル → プロキシ経由
    return `/api/notion-image/?pageId=${page.id}&type=page-property&property=FeaturedImage`
  }

  const url = file.type === 'external' ? file.external.url : ''
  if (!url) return null

  // Google Drive・旧WordPress画像 → サムネイル生成APIで代替
  if (url.includes('drive.google.com') || url.includes('/wp-content/uploads/')) {
    return getThumbnailUrl(page)
  }

  // Imgur等の安定した外部URL → 直接返す（XのOGPクローラーがプロキシだとタイムアウトする）
  if (url.includes('i.imgur.com') || url.includes('imgur.com')) {
    return url
  }

  // その他外部URL → プロキシ経由
  return `/api/notion-image/?pageId=${page.id}&type=page-property&property=FeaturedImage`
}

function pageToPost(page: PageObjectResponse): BlogPost {
  const props = page.properties
  const publishedDate = (getPropertyValue(props, 'PublishedDate') as string) || ''
  // ModifiedDateがなければ、Notionページの最終更新日をフォールバックとして使用
  const modifiedDate = (getPropertyValue(props, 'ModifiedDate') as string) ||
    (page.last_edited_time ? page.last_edited_time.split('T')[0] : null)

  return {
    id: page.id,
    slug: (getPropertyValue(props, 'Slug') as string) || '',
    title: (getPropertyValue(props, 'Title') as string) || '',
    description: (getPropertyValue(props, 'Description') as string) || '',
    publishedDate,
    modifiedDate,
    category: (getPropertyValue(props, 'Category') as string) || '',
    tags: (getPropertyValue(props, 'Tags') as string[]) || [],
    featuredImage: getFeaturedImageUrl(page),
    focusKeyword: (getPropertyValue(props, 'FocusKeyword') as string) || null,
    noIndex: (getPropertyValue(props, 'NoIndex') as boolean) || false,
    views: (getPropertyValue(props, 'Views') as number) || 0,
  }
}

// Cached across the entire build / single request, so category/tag pages that
// depend on the full post list don't hit Notion API repeatedly (rate-limit-safe).
export const getAllPosts = cache(async (): Promise<BlogPost[]> => {
  if (!isConfigured()) return []

  try {
    const dataSourceId = await getDataSourceId()
    const results: PageObjectResponse[] = []
    let cursor: string | undefined

    do {
      const response = await withRetry(() =>
        notionDataSources.query({
          data_source_id: dataSourceId,
          filter: {
            property: 'Published',
            checkbox: {
              equals: true,
            },
          },
          sorts: [
            {
              property: 'PublishedDate',
              direction: 'descending',
            },
          ],
          start_cursor: cursor,
        })
      )

      results.push(
        ...response.results.filter((page): page is PageObjectResponse => 'properties' in page)
      )
      cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined
    } while (cursor)

    return results.map(pageToPost)
  } catch {
    return []
  }
})

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isConfigured()) return null

  try {
    const dataSourceId = await getDataSourceId()
    const response = await withRetry(() =>
      notionDataSources.query({
        data_source_id: dataSourceId,
        filter: {
          and: [
            {
              property: 'Slug',
              rich_text: {
                equals: slug,
              },
            },
            {
              property: 'Published',
              checkbox: {
                equals: true,
              },
            },
          ],
        },
      })
    )

    const page = response.results[0]
    if (!page || !('properties' in page) || page.object !== 'page') return null
    return pageToPost(page as PageObjectResponse)
  } catch {
    return null
  }
}

export async function getPostBlocks(pageId: string): Promise<NotionBlock[]> {
  if (!isConfigured()) return []

  try {
    const blocks: NotionBlock[] = []
    let cursor: string | undefined

    do {
      const response = await withRetry(() =>
        notion.blocks.children.list({
          block_id: pageId,
          start_cursor: cursor,
          page_size: 100,
        })
      )

      blocks.push(
        ...response.results.filter(
          (block): block is NotionBlock => 'type' in block
        )
      )
      cursor = response.has_more ? response.next_cursor ?? undefined : undefined
    } while (cursor)

    return blocks
  } catch {
    return []
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts()
  return posts.map((post) => post.slug)
}

// Map human-readable category/tag names to URL-safe slugs used in routes.
export function categoryToSlug(category: string): string {
  return encodeURIComponent(category.toLowerCase().trim().replace(/\s+/g, '-'))
}

export function slugToCategory(slug: string): string {
  try {
    return decodeURIComponent(slug).replace(/-/g, ' ')
  } catch {
    return slug
  }
}

export function tagToSlug(tag: string): string {
  return encodeURIComponent(tag.toLowerCase().trim().replace(/\s+/g, '-'))
}

export function slugToTag(slug: string): string {
  try {
    return decodeURIComponent(slug).replace(/-/g, ' ')
  } catch {
    return slug
  }
}

// Return unique categories that have at least `minPosts` published posts.
export async function getCategoriesWithCounts(minPosts: number = 3): Promise<{ name: string; slug: string; count: number }[]> {
  const posts = await getAllPosts()
  const counts = new Map<string, number>()
  for (const p of posts) {
    if (!p.category || p.category.toLowerCase() === 'uncategorized') continue
    counts.set(p.category, (counts.get(p.category) ?? 0) + 1)
  }
  return Array.from(counts.entries())
    .filter(([, n]) => n >= minPosts)
    .map(([name, count]) => ({ name, slug: categoryToSlug(name), count }))
    .sort((a, b) => b.count - a.count)
}

// Return unique tags that have at least `minPosts` published posts.
export async function getTagsWithCounts(minPosts: number = 5): Promise<{ name: string; slug: string; count: number }[]> {
  const posts = await getAllPosts()
  const counts = new Map<string, number>()
  for (const p of posts) {
    for (const tag of p.tags) {
      if (!tag) continue
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return Array.from(counts.entries())
    .filter(([, n]) => n >= minPosts)
    .map(([name, count]) => ({ name, slug: tagToSlug(name), count }))
    .sort((a, b) => b.count - a.count)
}

export async function getPostsByCategory(categoryName: string): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  const lower = categoryName.toLowerCase().trim()
  return posts.filter((p) => p.category.toLowerCase().trim() === lower)
}

export async function getPostsByTag(tagName: string): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  const lower = tagName.toLowerCase().trim()
  return posts.filter((p) => p.tags.some((t) => t.toLowerCase().trim() === lower))
}

export async function getRelatedPosts(category: string, currentSlug: string, limit: number = 4): Promise<BlogPost[]> {
  if (!isConfigured() || !category) return []

  try {
    const dataSourceId = await getDataSourceId()
    const response = await withRetry(() =>
      notionDataSources.query({
        data_source_id: dataSourceId,
        filter: {
          and: [
            {
              property: 'Published',
              checkbox: {
                equals: true,
              },
            },
            {
              property: 'Category',
              select: {
                equals: category,
              },
            },
            {
              property: 'Slug',
              rich_text: {
                does_not_equal: currentSlug,
              },
            },
          ],
        },
        sorts: [
          {
            property: 'PublishedDate',
            direction: 'descending',
          },
        ],
        page_size: limit,
      })
    )

    return response.results
      .filter((page): page is PageObjectResponse => 'properties' in page)
      .map(pageToPost)
  } catch {
    return []
  }
}

// 読了時間を計算（日本語は1分400文字として計算）
export function calculateReadingTime(text: string): number {
  const charCount = text.length
  const wordsPerMinute = 400 // 日本語の平均読書速度
  return Math.max(1, Math.ceil(charCount / wordsPerMinute))
}
