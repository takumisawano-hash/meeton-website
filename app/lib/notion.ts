import { Client } from '@notionhq/client'
import type {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const databaseId = process.env.NOTION_DATABASE_ID || ''

function isConfigured(): boolean {
  return Boolean(process.env.NOTION_TOKEN && process.env.NOTION_DATABASE_ID)
}

export type BlogPost = {
  id: string
  slug: string
  title: string
  description: string
  publishedDate: string
  category: string
  tags: string[]
  featuredImage: string | null
}

export type NotionBlock = BlockObjectResponse

function getRichTextContent(richText: RichTextItemResponse[]): string {
  return richText.map((item) => item.plain_text).join('')
}

function getPropertyValue(
  properties: PageObjectResponse['properties'],
  name: string
): string | string[] | boolean | null {
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

function pageToPost(page: PageObjectResponse): BlogPost {
  const props = page.properties
  return {
    id: page.id,
    slug: (getPropertyValue(props, 'Slug') as string) || '',
    title: (getPropertyValue(props, 'Title') as string) || '',
    description: (getPropertyValue(props, 'Description') as string) || '',
    publishedDate: (getPropertyValue(props, 'PublishedDate') as string) || '',
    category: (getPropertyValue(props, 'Category') as string) || '',
    tags: (getPropertyValue(props, 'Tags') as string[]) || [],
    featuredImage: getPropertyValue(props, 'FeaturedImage') as string | null,
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!isConfigured()) return []

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
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
    })

    return response.results
      .filter((page): page is PageObjectResponse => 'properties' in page)
      .map(pageToPost)
  } catch {
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isConfigured()) return null

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
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
      const response = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
        page_size: 100,
      })

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
