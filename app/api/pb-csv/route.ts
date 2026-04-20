import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const urls = req.nextUrl.searchParams.getAll('u')
  if (urls.length === 0) {
    return new NextResponse('profileUrl\n', {
      headers: { 'Content-Type': 'text/csv; charset=utf-8' },
    })
  }
  const csv = 'profileUrl\n' + urls.join('\n') + '\n'
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}
