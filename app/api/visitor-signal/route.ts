import { NextRequest, NextResponse } from 'next/server'

// In-memory store for visitor signals (persists across warm invocations)
// For production scale, replace with Vercel KV or external DB
const SIGNALS_KEY = 'visitor_signals'

// Simple file-based storage using Vercel's /tmp (ephemeral but good enough)
async function getSignals(): Promise<VisitorSignal[]> {
  try {
    const { readFile } = await import('fs/promises')
    const data = await readFile('/tmp/visitor-signals.json', 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function saveSignals(signals: VisitorSignal[]): Promise<void> {
  const { writeFile } = await import('fs/promises')
  // Keep last 500 signals max
  const trimmed = signals.slice(-500)
  await writeFile('/tmp/visitor-signals.json', JSON.stringify(trimmed))
}

interface VisitorSignal {
  company_name: string
  domain: string
  org_url: string
  employees: string
  industry: string
  page_url: string
  referrer: string
  timestamp: string
}

const EMPLOYEE_MAP: Record<string, string> = {
  '1': '1-9', '2': '10-29', '3': '30-49', '4': '50-99',
  '5': '100-299', '6': '300-499', '7': '500-999',
  '8': '1000-2999', '9': '3000+',
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { company_name, domain, org_url, employees, industry, page_url, referrer } = body

    if (!company_name || !domain) {
      return NextResponse.json({ status: 'skipped' })
    }

    const signal: VisitorSignal = {
      company_name,
      domain,
      org_url: org_url || '',
      employees: EMPLOYEE_MAP[employees] || employees || 'unknown',
      industry: industry || '',
      page_url: page_url || '',
      referrer: referrer || '',
      timestamp: new Date().toISOString(),
    }

    const signals = await getSignals()

    // Dedup: skip if same domain visited in last 24h
    const oneDayAgo = new Date(Date.now() - 86400000).toISOString()
    const isDuplicate = signals.some(
      s => s.domain === domain && s.timestamp > oneDayAgo
    )
    if (isDuplicate) {
      return NextResponse.json({ status: 'duplicate' })
    }

    signals.push(signal)
    await saveSignals(signals)

    return NextResponse.json({ status: 'recorded', company: company_name })
  } catch {
    return NextResponse.json({ status: 'error' }, { status: 500 })
  }
}

// GET endpoint for Mac Mini to pull signals
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const secret = process.env.VISITOR_SIGNAL_SECRET
  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const signals = await getSignals()

  // Clear after reading (pull model)
  const clear = request.nextUrl.searchParams.get('clear') === 'true'
  if (clear) {
    await saveSignals([])
  }

  return NextResponse.json({ signals, count: signals.length })
}
