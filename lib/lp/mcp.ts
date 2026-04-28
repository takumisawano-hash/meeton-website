import type { McpProfile } from './types'

const BASE_URL = process.env.MEETON_MCP_BASE_URL || 'https://mcp.dynameet.ai'
const API_KEY = process.env.MEETON_MCP_API_KEY || ''
const TEAM_ID = process.env.MEETON_TEAM_ID || '70801bb6-9b39-4989-8be9-7d93076424c1'

async function callTool<T = unknown>(toolName: string, params: Record<string, unknown>, timeoutMs = 8000): Promise<T | null> {
  if (!API_KEY) return null
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    const res = await fetch(`${BASE_URL}/api/tools/${toolName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(params),
      cache: 'no-store',
      signal: ctrl.signal,
    })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

type SearchContactsResponse = {
  contacts?: Array<{
    contactId?: string
    name?: string
    firstName?: string
    lastName?: string
    email?: string
    company?: string
    title?: string
    department?: string
    formSubmissionCount?: number
    meetingCount?: number
    latestMeetingDate?: string
    latestConversionSource?: string
    originalConversionSource?: string
    latestMeetonAssisted?: number
    meetonAssists?: { calendarClick?: number; calendarConversion?: number; chatClick?: number; chatConversion?: number }
    engagement?: {
      engagementScore?: number
      totalSessions?: number
      totalPageViews?: number
      totalMessages?: number
      totalSessionTime?: number
      lastActiveDate?: string
    }
    persona?: { intentPrediction?: string | null; visitorPersona?: string | null }
    visitors?: Array<{ visitorId?: string; displayName?: string | null; isRealtime?: boolean }>
  }>
}

type TimelineResponse = {
  visitors?: Array<{
    visitorId?: string
    sessions?: Array<{
      startedAt?: string
      durationSeconds?: number
      pages?: Array<{ path?: string; viewedAt?: string }>
      chatExchanges?: number
    }>
  }>
}

function deriveTopInterest(pagesViewed: Record<string, number>): string | undefined {
  const sorted = Object.entries(pagesViewed).sort((a, b) => b[1] - a[1])
  if (!sorted.length) return undefined
  const [path] = sorted[0]
  if (path.includes('/pricing')) return 'pricing'
  if (path.includes('/case-studies')) return 'case-studies'
  if (path.includes('/features/ai-chat')) return 'ai-chat'
  if (path.includes('/features/ai-email')) return 'ai-email'
  if (path.includes('/features/meetings')) return 'ai-calendar'
  if (path.includes('/features/offers')) return 'ai-offer'
  if (path.includes('/security')) return 'security'
  return undefined
}

export async function fetchMcpProfile(opts: {
  email?: string
  companyName?: string
  visitorId?: string
}): Promise<McpProfile | null> {
  if (!API_KEY) return null

  const search = opts.email || opts.companyName || ''
  if (!search && !opts.visitorId) return null

  const result: McpProfile = {}

  if (search) {
    const sc = await callTool<SearchContactsResponse>('search_contacts', {
      teamId: TEAM_ID,
      search,
      pageSize: 5,
      sortBy: 'engagement',
      sortDirection: 'desc',
    })
    const top = sc?.contacts?.[0]
    if (top) {
      result.contactId = top.contactId
      result.visitorId = top.visitors?.[0]?.visitorId
      result.intentScore = top.engagement?.engagementScore
      const messages = top.engagement?.totalMessages || 0
      const sessions = top.engagement?.totalSessions || 0
      if ((top.engagement?.engagementScore ?? 0) >= 50 || messages >= 30 || sessions >= 5) {
        result.engagementLevel = 'high'
      } else if ((top.engagement?.engagementScore ?? 0) >= 25 || messages >= 10 || sessions >= 2) {
        result.engagementLevel = 'medium'
      } else {
        result.engagementLevel = 'low'
      }
      result.hasMeeting = (top.meetingCount || 0) > 0
      result.conversionSource = top.latestConversionSource || top.originalConversionSource
    }
  }

  const targetVisitor = opts.visitorId || result.visitorId
  if (!targetVisitor) {
    return Object.keys(result).length ? result : null
  }
  const today = new Date()
  const startDate = new Date(today.getTime() - 86400000).toISOString().slice(0, 10)
  const endDate = today.toISOString().slice(0, 10)
  const tl = await callTool<TimelineResponse>('export_visitor_timelines', {
    teamId: TEAM_ID,
    startDate,
    endDate,
  })

  if (tl?.visitors) {
    const v = tl.visitors.find(vv => vv.visitorId === targetVisitor)
    if (v?.sessions?.length) {
      const pagesViewed: Record<string, number> = {}
      let chatTotal = 0
      result.recentSessions = v.sessions.map(s => {
        const pages = (s.pages || []).map(p => p.path || '').filter(Boolean)
        pages.forEach(p => {
          pagesViewed[p] = (pagesViewed[p] || 0) + 1
        })
        chatTotal += s.chatExchanges || 0
        return {
          startedAt: s.startedAt,
          pageCount: pages.length,
          duration: s.durationSeconds,
          pages,
          chatExchanges: s.chatExchanges,
        }
      })
      result.pagesViewed = pagesViewed
      result.topInterest = deriveTopInterest(pagesViewed)
    }
  }

  return Object.keys(result).length ? result : null
}
