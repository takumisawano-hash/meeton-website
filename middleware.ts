import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Legacy URL recovery middleware.
 *
 * Handles legacy WordPress URLs that Next.js redirects in next.config.js cannot
 * match reliably — namely paths containing non-ASCII (Japanese) characters,
 * which arrive URL-encoded but the path-to-regexp matcher is inconsistent.
 *
 * Matches decoded paths and 308-redirects them to sensible destinations so
 * Google can replace the old 404 index entries with current canonical URLs.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const decoded = (() => {
    try {
      return decodeURIComponent(pathname)
    } catch {
      return pathname
    }
  })()

  // Specific legacy URLs that still rank in Google but no longer resolve.
  // These must come before the broader Japanese-slug → /blog/ catch-alls.
  const legacyArticleMap: Record<string, string> = {
    '/blog/sales/オーガニックリード47減の危機！aiで変革する次世/': '/blog/jp-mlutg7bj-fj0o/',
    '/blog/sales/オーガニックリード47減の危機！aiで変革する次世': '/blog/jp-mlutg7bj-fj0o/',
    '/blog/inside-sales/【revops責任者必見】パイプライン・ベロシティを2倍/': '/blog/revops-velocity-2/',
    '/blog/inside-sales/【revops責任者必見】パイプライン・ベロシティを2倍': '/blog/revops-velocity-2/',
  }
  if (legacyArticleMap[decoded]) {
    return NextResponse.redirect(new URL(legacyArticleMap[decoded], req.url), 308)
  }

  // Legacy Japanese-named blog category paths → /blog/ index
  const jpBlogCategories = [
    '/blog/セールス/',
    '/blog/インターン生インタビュー/',
    '/blog/未分類-ja/',
    '/blog/機能アップデート-news/',
    '/blog/マーケティング/',
    '/blog/インサイドセールス/',
  ]
  if (jpBlogCategories.some((p) => decoded.startsWith(p))) {
    return NextResponse.redirect(new URL('/blog/', req.url), 308)
  }

  // Legacy pricing page (Japanese)
  if (decoded === '/料金プラン' || decoded === '/料金プラン/') {
    return NextResponse.redirect(new URL('/', req.url), 308)
  }

  // Fallback: if a /blog/{slug}/ has a Japanese slug that starts with non-ASCII,
  // it's almost certainly a legacy WordPress Japanese-title slug. The dynamic
  // route already handles this by redirecting to /blog/, but handling here
  // avoids an extra hop and makes it deterministic.
  const jpSlugMatch = decoded.match(/^\/blog\/([^/]+)\/?$/)
  if (jpSlugMatch) {
    const slug = jpSlugMatch[1]
    // Pure ASCII + hyphens + digits = current slug convention; leave it for the route handler.
    // Anything containing non-ASCII → legacy URL, redirect to /blog/
    if (/[^\x20-\x7e]/.test(slug)) {
      return NextResponse.redirect(new URL('/blog/', req.url), 308)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/blog/:path*',
    '/料金プラン',
    '/料金プラン/',
  ],
}
