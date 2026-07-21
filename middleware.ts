import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware: legacy URL recovery + geo/language auto-redirect.
 *
 * 1. Legacy WordPress URL recovery (Japanese-slug paths next.config.js can't
 *    match reliably). Runs for everyone, including bots, so Google can replace
 *    stale 404 index entries.
 * 2. Geo/language auto-redirect: visitors outside Japan (or with a non-Japanese
 *    browser) are sent to the English twin of the page; Japanese visitors who
 *    land on an /en/* URL are sent to the Japanese original.
 *
 * SEO safety of the geo redirect:
 *   - Search-engine crawlers are NEVER redirected (see isBot) so both language
 *     trees stay fully crawlable/indexable. This is the part Google cares about.
 *   - 302 (temporary) so no canonical signal is implied; hreflang remains the
 *     authoritative language-targeting mechanism.
 *   - A `pref_lang` cookie (set when the visitor manually switches language)
 *     overrides geo, so we never fight an explicit choice.
 *   - Only paths with a guaranteed 1:1 English twin are forward-redirected
 *     (JA→EN); individual blog articles (partial EN coverage) are left to the
 *     on-page language banner + hreflang. EN→JA is always safe (every /en/* page
 *     mirrors a JA page).
 */

// JA paths that have a guaranteed English twin. Mirrors the next.config.js /en
// allowlist. Matched as exact or as a prefix followed by "/" so "/chat" and
// "/chat/..." both redirect but "/chatfoo" does not.
// NOTE: 'terms' is deliberately absent. /en/terms/ is a pointer stub whose
// "managed plans" link targets the authoritative Japanese /terms/ — with
// 'terms' in this list, an EN-preference visitor clicking that link gets
// 302'd straight back to the stub (boomerang). The JA contract must stay
// reachable regardless of language preference; the /terms/ language switcher
// still offers /en/terms/ (it sets pref_lang on click).
const EN_TWIN_PREFIXES = [
  'chat', 'calendar', 'library', 'email', 'ads', 'capture', 'tools/roi',
  'privacy-policy', 'integrations',
  'pricing', 'about', 'contact', 'enterprise', 'security', 'glossary',
  'cases', 'alternatives', 'use-cases',
  'solutions/crm-to-meeting', 'solutions/lead-to-meeting',
  'solutions/cmo', 'solutions/cro', 'solutions/sdr', 'solutions/ceo',
]

// /compare/ is a partial twin: only these slugs have a real /en/compare/<slug>
// page (app/en/compare/ai-sdr-tools + the app/en/compare/[slug] dynamic set,
// mirrors COMPARE_EN keys in app/lib/compare-data.ts). The other static
// /compare/* pages (meeton-vs-anybot, ma-vs-ai-sdr, etc.) have NO EN route —
// next.config.js redirects their /en/compare/<slug> back to /compare/<slug>,
// so twinning them here would bounce forever: /compare/X → /en/compare/X →
// (next.config.js) /compare/X → ... (infinite redirect loop).
const COMPARE_EN_SLUGS = [
  'ai-sdr-tools',
  'immedio', 'timerex', 'spir', 'calendly', 'docsend', 'intercom',
  'lemlist', 'smartlead', 'sprocket', 'flipdesk', 'channel-talk',
  'hubspot-chatbot', 'drift', 'qualified', 'warmly', 'fin',
]

function compareHasEnTwin(seg: string): boolean {
  if (seg === 'compare') return true
  const slug = seg.startsWith('compare/') ? seg.slice('compare/'.length) : null
  return slug !== null && COMPARE_EN_SLUGS.includes(slug)
}

// EN-only pages with NO JA twin (self-serve funnel + self-serve legal set,
// e.g. /en/trial/, /en/legal/dpa/). The JA-desired branch must never strip
// these — the JA paths do not exist.
// Mirrors EN_ONLY_PREFIXES in app/lib/i18n.ts.
const EN_ONLY_PREFIXES = [
  'trial',
  'legal/terms-self-serve',
  'legal/dpa',
  'legal/sub-processors',
]

function isEnOnly(pathname: string): boolean {
  const seg = pathname.replace(/^\/en\/?/, '').replace(/\/+$/, '')
  return EN_ONLY_PREFIXES.some((p) => seg === p || seg.startsWith(p + '/'))
}

// Blog: only the hub + category/tag listings are 1:1-safe to redirect. Individual
// /blog/<slug> articles have partial EN coverage, so they stay JA (banner/hreflang).
function jaHasEnTwin(pathname: string): boolean {
  const p = pathname.replace(/\/+$/, '') || '/'
  if (p === '/') return true
  const seg = p.slice(1) // drop leading "/"
  if (seg === 'blog' || seg.startsWith('blog/category/') || seg.startsWith('blog/tag/')) return true
  if (seg === 'compare' || seg.startsWith('compare/')) return compareHasEnTwin(seg)
  return EN_TWIN_PREFIXES.some((pre) => seg === pre || seg.startsWith(pre + '/'))
}

// Crawlers, previewers and link-unfurlers must never be geo-redirected.
const BOT_RE = /bot|crawl|spider|slurp|bingpreview|googlebot|bingbot|duckduck|baiduspider|yandex|sogou|exabot|facebookexternalhit|facebot|ia_archiver|twitterbot|linkedinbot|whatsapp|telegrambot|applebot|petalbot|bytespider|gptbot|ccbot|claudebot|claude-web|anthropic|perplexity|amazonbot|ahrefs|semrush|mj12bot|dotbot|chrome-lighthouse|google-inspectiontool|headlesschrome/i

function isBot(ua: string | null): boolean {
  if (!ua) return true // no UA → treat as bot, never redirect
  return BOT_RE.test(ua)
}

// Primary language tag from Accept-Language (e.g. "ja,en;q=0.8" → "ja").
function primaryLang(accept: string | null): string {
  if (!accept) return ''
  const first = accept.split(',')[0]?.trim().toLowerCase() || ''
  return first.split('-')[0] // "ja-jp" → "ja"
}

function geoRedirect(req: NextRequest): NextResponse | null {
  // Static assets / API are excluded by the matcher, but guard anyway.
  const { pathname } = req.nextUrl
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.') // files (favicon, images, etc.)
  ) {
    return null
  }

  // Never steer crawlers — keeps both language trees indexable.
  if (isBot(req.headers.get('user-agent'))) return null

  const isEnPath = pathname === '/en' || pathname.startsWith('/en/')

  // Desired language: explicit cookie wins; otherwise IP country + browser
  // language combined — Japan IP or a Japanese browser ⇒ Japanese, else English.
  // (When the IP country is unknown, Accept-Language alone decides.)
  let desired = req.cookies.get('pref_lang')?.value
  if (desired !== 'ja' && desired !== 'en') {
    const country = req.headers.get('x-vercel-ip-country') // Vercel-provided
    const browserJa = primaryLang(req.headers.get('accept-language')) === 'ja'
    desired = country === 'JP' || browserJa ? 'ja' : 'en'
  }

  const current = isEnPath ? 'en' : 'ja'
  if (desired === current) return null

  if (desired === 'en' && current === 'ja') {
    // Forward only paths with a guaranteed English twin.
    if (!jaHasEnTwin(pathname)) return null
    const url = req.nextUrl.clone()
    url.pathname = pathname === '/' ? '/en/' : `/en${pathname}`
    return NextResponse.redirect(url, 302)
  }

  if (desired === 'ja' && current === 'en') {
    // EN-only pages (no JA twin) are never stripped.
    if (isEnOnly(pathname)) return null
    // Strip the /en prefix — the JA original always exists.
    const url = req.nextUrl.clone()
    let stripped = pathname.replace(/^\/en(?=\/|$)/, '')
    // EN blog posts use a "-en" slug suffix (en-slug = ja-slug + "-en"); recover
    // the JA slug so /en/blog/foo-en → /blog/foo (not the non-existent /blog/foo-en).
    stripped = stripped.replace(/^(\/blog\/[^/]+?)-en(\/?)$/, '$1$2')
    url.pathname = stripped === '' ? '/' : stripped
    return NextResponse.redirect(url, 302)
  }

  return null
}

// Next's file-convention OG/Twitter image routes (opengraph-image.tsx,
// twitter-image.tsx) are emitted in <meta> tags WITHOUT a trailing slash,
// but site-wide trailingSlash:true then 308-redirects the actual fetch to
// the slashed URL. Slack's unfurl bot follows that redirect fine; LinkedIn's
// doesn't, and silently falls back to a random <img> on the page instead of
// leaving the preview blank (e.g. homepage shows a customer's logo). Rewrite
// (not redirect) these specific paths internally so the very first request
// already 200s — closes the gap for crawlers that won't follow the 308.
const OG_IMAGE_RE = /\/(opengraph-image|twitter-image)$/

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const decoded = (() => {
    try {
      return decodeURIComponent(pathname)
    } catch {
      return pathname
    }
  })()

  if (OG_IMAGE_RE.test(pathname)) {
    const url = req.nextUrl.clone()
    url.pathname = `${pathname}/`
    return NextResponse.rewrite(url)
  }

  // next.config.js sets skipTrailingSlashRedirect so we own trailing-slash
  // enforcement here (the case above needs a rewrite, not a redirect). This
  // reproduces Next's default trailingSlash:true behavior for every other path.
  if (!pathname.endsWith('/')) {
    // Built as a plain string, not via url.pathname= on a cloned NextURL —
    // NextURL re-normalizes trailing slashes on assignment per the
    // trailingSlash/skipTrailingSlashRedirect config and was silently
    // stripping the slash we just added.
    const target = `${req.nextUrl.origin}${pathname}/${req.nextUrl.search}`
    return NextResponse.redirect(target, 308)
  }

  // ── Legacy URL recovery (runs for everyone, incl. bots) ──────────────────

  // Specific legacy URLs that still rank in Google but no longer resolve.
  // These must come before the broader Japanese-slug → /blog/ catch-alls.
  const legacyArticleMap: Record<string, string> = {
    '/blog/sales/オーガニックリード47減の危機！aiで変革する次世/': '/blog/lead-decline-causes-solutions/',
    '/blog/sales/オーガニックリード47減の危機！aiで変革する次世': '/blog/lead-decline-causes-solutions/',
    '/blog/inside-sales/【revops責任者必見】パイプライン・ベロシティを2倍/': '/blog/revops-velocity-2/',
    '/blog/inside-sales/【revops責任者必見】パイプライン・ベロシティを2倍': '/blog/revops-velocity-2/',
  }
  if (legacyArticleMap[decoded]) {
    return NextResponse.redirect(new URL(legacyArticleMap[decoded], req.url), 308)
  }

  // Prefix-based recovery for legacy Japanese-slug articles whose full slug GSC
  // truncates (so an exact key is unreliable). These currently strip to a
  // non-existent slug and fall through to /blog/ — recovering ~500 imp/90d of
  // misdirected equity to the correct live English twin. (2026-06-22 audit.)
  const legacyArticlePrefixes: [string, string][] = [
    ['/blog/sales/クッキーレス時代のbtobマーケティング', '/blog/cookieless-btobmarketing-ai/'],
    ['/blog/aixコンテンツマーケティング', '/blog/ai-content-marketing-sales-alignment-guide/'],
    ['/blog/80のリードをムダにしない', '/blog/ai-chatbot-builder-lead-qualification-automation-2026/'],
  ]
  for (const [prefix, dest] of legacyArticlePrefixes) {
    if (decoded.startsWith(prefix)) {
      return NextResponse.redirect(new URL(dest, req.url), 308)
    }
  }

  // Strip legacy category prefix from blog URLs (replaces broader
  // next.config.js rules that path-to-regexp couldn't reliably match
  // because non-ASCII slugs preceded by category were intercepted
  // before middleware could see them).
  const categoryStripMatch = decoded.match(/^\/blog\/(sales|inside-sales|marketing|intern-student-interviews)\/(.+?)\/?$/)
  if (categoryStripMatch) {
    const slug = categoryStripMatch[2]
    return NextResponse.redirect(new URL(`/blog/${slug}/`, req.url), 308)
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

  // ── Geo/language auto-redirect (skips bots + respects pref_lang cookie) ───
  const geo = geoRedirect(req)
  if (geo) return geo

  return NextResponse.next()
}

export const config = {
  // Run on all page routes; exclude API, Next internals and static files.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
