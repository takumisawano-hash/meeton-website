import { readFile, writeFile, mkdir } from 'fs/promises'
import { dirname } from 'path'

const EVENTS_PATH = process.env.LP_EVENTS_PATH || '/tmp/lp-events.json'
const PROFILES_PATH = process.env.LP_PROFILES_PATH || '/tmp/lp-profiles.json'
const MAX_RECORDS = 5000

async function readJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const data = await readFile(path, 'utf-8')
    return JSON.parse(data) as T
  } catch {
    return fallback
  }
}

async function writeJson(path: string, data: unknown): Promise<void> {
  try {
    await mkdir(dirname(path), { recursive: true })
  } catch {
    // ignore
  }
  await writeFile(path, JSON.stringify(data))
}

export type LpEvent = {
  ts: string
  visitorId: string
  type:
    | 'popup_view'
    | 'popup_dismiss'
    | 'company_submit'
    | 'lp_view'
    | 'lp_section_view'
    | 'cta_click'
    | 'demo_book_success'
    | 'doc_request_success'
    | 'chat_open'
    | 'docodoco_corrected'
  context?: Record<string, unknown>
}

export async function appendEvent(ev: LpEvent): Promise<void> {
  const events = await readJson<LpEvent[]>(EVENTS_PATH, [])
  events.push(ev)
  const trimmed = events.slice(-MAX_RECORDS)
  await writeJson(EVENTS_PATH, trimmed)
}

export async function getRecentEvents(sinceISO?: string): Promise<LpEvent[]> {
  const events = await readJson<LpEvent[]>(EVENTS_PATH, [])
  if (!sinceISO) return events
  return events.filter(e => e.ts >= sinceISO)
}

export async function saveProfile(visitorId: string, profile: unknown, lp: unknown): Promise<void> {
  const profiles = await readJson<Array<{ visitorId: string; ts: string; profile: unknown; lp: unknown }>>(PROFILES_PATH, [])
  profiles.push({ visitorId, ts: new Date().toISOString(), profile, lp })
  const trimmed = profiles.slice(-1000)
  await writeJson(PROFILES_PATH, trimmed)
}

export async function getRecentProfiles(sinceISO?: string): Promise<Array<{ visitorId: string; ts: string; profile: unknown; lp: unknown }>> {
  const profiles = await readJson<Array<{ visitorId: string; ts: string; profile: unknown; lp: unknown }>>(PROFILES_PATH, [])
  if (!sinceISO) return profiles
  return profiles.filter(p => p.ts >= sinceISO)
}
