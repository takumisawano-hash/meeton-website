import { NextRequest, NextResponse } from 'next/server'

// Server-side proxy for DocoDoco's IP→company lookup. Keeps key1/key2 out of
// the client bundle — the browser only calls this route, which reads the
// request's own client IP from the edge-injected header instead of asking
// the client to resolve it via a public IP-echo service.
function getClientIp(request: NextRequest): string | null {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip')
}

export async function GET(request: NextRequest) {
  const key1 = process.env.DOCODOCO_KEY1
  const key2 = process.env.DOCODOCO_KEY2
  if (!key1 || !key2) {
    return NextResponse.json({ status: 'skipped' })
  }

  const ip = getClientIp(request)
  if (!ip) {
    return NextResponse.json({ status: 'skipped' })
  }

  try {
    const res = await fetch(
      'https://api.docodoco.jp/v6/search?format=json' +
        '&ipadr=' + encodeURIComponent(ip) +
        '&key1=' + encodeURIComponent(key1) +
        '&key2=' + encodeURIComponent(key2)
    )
    const d = (await res.json()) as {
      OrgName?: string
      DomainName?: string
      OrgUrl?: string
      OrgEmployeesCode?: string
      OrgIndustrialCategoryL?: string
      LineCode?: string
    }

    const org = d.OrgName || ''
    if (!org || !d.DomainName) {
      return NextResponse.json({ status: 'skipped' })
    }
    const lineCode = d.LineCode || ''
    if (lineCode === '1' || lineCode === '2') {
      return NextResponse.json({ status: 'skipped' })
    }

    return NextResponse.json({
      status: 'ok',
      company_name: org,
      domain: d.DomainName,
      org_url: d.OrgUrl || '',
      employees: d.OrgEmployeesCode || '',
      industry: d.OrgIndustrialCategoryL || '',
    })
  } catch {
    return NextResponse.json({ status: 'error' }, { status: 500 })
  }
}
