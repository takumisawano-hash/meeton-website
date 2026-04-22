import { Client, APIErrorCode, isNotionClientError } from '@notionhq/client'
import type {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({ auth: process.env.NOTION_TOKEN })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const notionDataSources = (notion as any).dataSources as {
  query: (params: Record<string, unknown>) => Promise<{
    results: Record<string, unknown>[]
    has_more: boolean
    next_cursor: string | null
  }>
}

// Mirror the throttling / retry approach from notion.ts (blog) so we don't
// trip Notion API limits when the two modules run in parallel.
let _lastCallTime = 0
let _activeCalls = 0
const MAX_CONCURRENT = 2
const MIN_GAP_MS = 350

async function throttle(): Promise<void> {
  while (_activeCalls >= MAX_CONCURRENT) {
    await new Promise((r) => setTimeout(r, 100))
  }
  const now = Date.now()
  const elapsed = now - _lastCallTime
  if (elapsed < MIN_GAP_MS) {
    await new Promise((r) => setTimeout(r, MIN_GAP_MS - elapsed))
  }
  _lastCallTime = Date.now()
  _activeCalls++
}

function releaseThrottle(): void {
  _activeCalls = Math.max(0, _activeCalls - 1)
}

async function withRetry<T>(fn: () => Promise<T>, maxRetries = 6, baseDelay = 1500): Promise<T> {
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
        await new Promise((r) => setTimeout(r, delay))
      } else {
        throw error
      }
    }
  }
  throw lastError
}

const databaseId = process.env.NOTION_CASE_STUDIES_DATABASE_ID || ''

function isConfigured(): boolean {
  return Boolean(process.env.NOTION_TOKEN && databaseId)
}

let resolvedDataSourceId: string | null = null
async function getDataSourceId(): Promise<string> {
  if (resolvedDataSourceId) return resolvedDataSourceId
  const db = await withRetry(() => notion.databases.retrieve({ database_id: databaseId }))
  const dataSources = (db as Record<string, unknown>).data_sources as
    | { id: string; name: string }[]
    | undefined
  if (dataSources && dataSources.length > 0) {
    const preferred = dataSources.find((ds) => ds.name === 'Case Studies')
    resolvedDataSourceId = (preferred ?? dataSources[0]).id
  } else {
    resolvedDataSourceId = databaseId
  }
  return resolvedDataSourceId
}

export type CaseStudyStat = {
  label: string
  value: string
  context?: string
}

export type CaseStudy = {
  id: string
  slug: string
  title: string
  description: string
  company: string
  companyNote: string | null
  industry: string
  employeeSize: string | null
  usedProducts: string[]
  integrations: string[]
  heroMetric: string
  heroMetricLabel: string
  stats: CaseStudyStat[]
  quote: string | null
  quotePerson: string | null
  quoteAvatar: string | null
  companyLogo: string | null
  heroImage: string | null
  publishedDate: string
  modifiedDate: string | null
  focusKeyword: string | null
  tags: string[]
  noIndex: boolean
  order: number
}

export type NotionBlock = BlockObjectResponse

function richToString(r: RichTextItemResponse[]): string {
  return r.map((i) => i.plain_text).join('')
}

function readProp(
  props: PageObjectResponse['properties'],
  name: string
): string | string[] | boolean | number | null {
  const p = props[name]
  if (!p) return null
  switch (p.type) {
    case 'title':
      return richToString(p.title)
    case 'rich_text':
      return richToString(p.rich_text)
    case 'checkbox':
      return p.checkbox
    case 'date':
      return p.date?.start || null
    case 'select':
      return p.select?.name || null
    case 'multi_select':
      return p.multi_select.map((i) => i.name)
    case 'number':
      return p.number ?? 0
    case 'files':
      if (p.files.length === 0) return null
      const file = p.files[0]
      if (file.type === 'external') return file.external.url
      if (file.type === 'file') return file.file.url
      return null
    default:
      return null
  }
}

function fileUrl(page: PageObjectResponse, property: string): string | null {
  const p = page.properties[property]
  if (!p || p.type !== 'files' || p.files.length === 0) return null
  const file = p.files[0]
  if (file.type === 'file') {
    // Include last_edited_time as a version param so the URL changes when the
    // underlying file is replaced in Notion, busting any stale browser/CDN cache.
    const v = Date.parse(page.last_edited_time || '') || 0
    return `/api/notion-image/?pageId=${page.id}&type=page-property&property=${property}&v=${v}`
  }
  if (file.type === 'external') return file.external.url
  return null
}

function parseStats(raw: string | null): CaseStudyStat[] {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((s): s is CaseStudyStat => !!s && typeof s.label === 'string' && typeof s.value === 'string')
      .slice(0, 4)
  } catch {
    return []
  }
}

function pageToCaseStudy(page: PageObjectResponse): CaseStudy {
  const p = page.properties
  const publishedDate = (readProp(p, 'PublishedDate') as string) || ''
  const modifiedDate =
    (readProp(p, 'ModifiedDate') as string) ||
    (page.last_edited_time ? page.last_edited_time.split('T')[0] : null)
  const statsRaw = readProp(p, 'StatsJson') as string | null

  return {
    id: page.id,
    slug: (readProp(p, 'Slug') as string) || '',
    title: (readProp(p, 'Title') as string) || '',
    description: (readProp(p, 'Description') as string) || '',
    company: (readProp(p, 'Company') as string) || '',
    companyNote: (readProp(p, 'CompanyNote') as string) || null,
    industry: (readProp(p, 'Industry') as string) || '',
    employeeSize: (readProp(p, 'EmployeeSize') as string) || null,
    usedProducts: (readProp(p, 'UsedProducts') as string[]) || [],
    integrations: (readProp(p, 'Integrations') as string[]) || [],
    heroMetric: (readProp(p, 'HeroMetric') as string) || '',
    heroMetricLabel: (readProp(p, 'HeroMetricLabel') as string) || '',
    stats: parseStats(statsRaw),
    quote: (readProp(p, 'Quote') as string) || null,
    quotePerson: (readProp(p, 'QuotePerson') as string) || null,
    quoteAvatar: fileUrl(page, 'QuoteAvatar'),
    companyLogo: fileUrl(page, 'CompanyLogo'),
    heroImage: fileUrl(page, 'HeroImage'),
    publishedDate,
    modifiedDate,
    focusKeyword: (readProp(p, 'FocusKeyword') as string) || null,
    tags: (readProp(p, 'Tags') as string[]) || [],
    noIndex: (readProp(p, 'NoIndex') as boolean) || false,
    order: (readProp(p, 'Order') as number) || 0,
  }
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  if (!isConfigured()) return []
  try {
    const dataSourceId = await getDataSourceId()
    const results: PageObjectResponse[] = []
    let cursor: string | undefined
    do {
      const response = await withRetry(() =>
        notionDataSources.query({
          data_source_id: dataSourceId,
          filter: { property: 'Published', checkbox: { equals: true } },
          sorts: [
            { property: 'Order', direction: 'ascending' },
            { property: 'PublishedDate', direction: 'descending' },
          ],
          start_cursor: cursor,
        })
      )
      results.push(
        ...response.results.filter((page): page is PageObjectResponse => 'properties' in page)
      )
      cursor = response.has_more ? response.next_cursor ?? undefined : undefined
    } while (cursor)
    return results.map(pageToCaseStudy)
  } catch {
    return []
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  if (!isConfigured()) return null
  try {
    const dataSourceId = await getDataSourceId()
    const response = await withRetry(() =>
      notionDataSources.query({
        data_source_id: dataSourceId,
        filter: {
          and: [
            { property: 'Slug', rich_text: { equals: slug } },
            { property: 'Published', checkbox: { equals: true } },
          ],
        },
      })
    )
    const page = response.results[0]
    if (!page || !('properties' in page) || page.object !== 'page') return null
    return pageToCaseStudy(page as PageObjectResponse)
  } catch {
    return null
  }
}

export async function getCaseStudyBlocks(pageId: string): Promise<NotionBlock[]> {
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
      blocks.push(...response.results.filter((b): b is NotionBlock => 'type' in b))
      cursor = response.has_more ? response.next_cursor ?? undefined : undefined
    } while (cursor)
    return blocks
  } catch {
    return []
  }
}

export async function getAllCaseStudySlugs(): Promise<string[]> {
  const items = await getAllCaseStudies()
  return items.map((i) => i.slug)
}
