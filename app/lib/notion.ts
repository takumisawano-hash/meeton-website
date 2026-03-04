import { Client, APIErrorCode, isNotionClientError } from '@notionhq/client'
import type {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

// Retry helper for rate-limited requests
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 5,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: unknown
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      if (isNotionClientError(error) && error.code === APIErrorCode.RateLimited) {
        const delay = baseDelay * Math.pow(2, attempt) // Exponential backoff
        console.log(`Rate limited, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries})`)
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
    resolvedDataSourceId = dataSources[0].id
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

// 全てのサムネイル画像をプロキシ経由で配信する
// - Notion S3署名URLの失効問題を回避
// - Google Driveの外部埋め込みブロックを回避
function getFeaturedImageUrl(page: PageObjectResponse): string | null {
  const prop = page.properties['FeaturedImage']
  if (!prop || prop.type !== 'files' || prop.files.length === 0) return null
  return `/api/notion-image?pageId=${page.id}&type=page-property&property=FeaturedImage`
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

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!isConfigured()) return []

  try {
    const dataSourceId = await getDataSourceId()
    const results: PageObjectResponse[] = []
    let cursor: string | undefined

    do {
      const response = await withRetry(() =>
        notion.dataSources.query({
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
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isConfigured()) return null

  try {
    const dataSourceId = await getDataSourceId()
    const response = await withRetry(() =>
      notion.dataSources.query({
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

export async function getRelatedPosts(category: string, currentSlug: string, limit: number = 4): Promise<BlogPost[]> {
  if (!isConfigured() || !category) return []

  try {
    const dataSourceId = await getDataSourceId()
    const response = await withRetry(() =>
      notion.dataSources.query({
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
