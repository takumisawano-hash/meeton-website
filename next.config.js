const blogRedirects = require('./scripts/blog-redirects.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  experimental: {
    // Limit parallel static page generation to avoid Notion API rate limits
    staticGenerationMaxConcurrency: 1,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.notion.so',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'dynameet.ai',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'imgur.com',
      },
    ],
    // Allow local API routes that serve thumbnails / notion image proxy
    // to be used with next/image (Next.js 16 requires explicit allowlist).
    localPatterns: [
      { pathname: '/api/thumbnail/**' },
      { pathname: '/api/notion-image/**' },
      { pathname: '/api/og/**' },
      // Allow public/integrations/* images for next/image
      { pathname: '/integrations/**' },
      // Allow public/clients/* (customer logo wall)
      { pathname: '/clients/**' },
      // Allow public/webinars/* (Gemini-generated webinar thumbnails)
      { pathname: '/webinars/**' },
      // Allow public/team/* (speaker headshots)
      { pathname: '/team/**' },
      // Allow public/event/* (MarkeZine etc. event banners)
      { pathname: '/event/**' },
      // Allow public/certifications/* (SGS ISO/IEC 27001 & 27017 marks)
      { pathname: '/certifications/**' },
    ],
  },
  async redirects() {
    return [
      // High-impact SEO recovery: Google indexed Japanese-slug URLs whose
      // articles have since been re-slugged. Without these, the broad
      // /blog/sales/:slug rule strips the category but the resulting slug
      // doesn't exist, so Google searchers land on /blog/ index.
      {
        source: '/blog/sales/オーガニックリード47減の危機！aiで変革する次世/',
        destination: '/blog/jp-mlutg7bj-fj0o/',
        permanent: true,
        locale: false,
      },
      {
        source: '/blog/sales/オーガニックリード47減の危機！aiで変革する次世',
        destination: '/blog/jp-mlutg7bj-fj0o/',
        permanent: true,
        locale: false,
      },
      {
        source: '/blog/inside-sales/【revops責任者必見】パイプライン・ベロシティを2倍/',
        destination: '/blog/revops-velocity-2/',
        permanent: true,
        locale: false,
      },
      {
        source: '/blog/inside-sales/【revops責任者必見】パイプライン・ベロシティを2倍',
        destination: '/blog/revops-velocity-2/',
        permanent: true,
        locale: false,
      },
      {
        source: '/demo',
        destination: '/',
        permanent: true,
      },
      {
        source: '/demo/',
        destination: '/',
        permanent: true,
      },
      // Old short paths → canonical legal pages (fix 404 from LP footer history)
      {
        source: '/privacy',
        destination: '/privacy-policy/',
        permanent: true,
      },
      {
        source: '/privacy/',
        destination: '/privacy-policy/',
        permanent: true,
      },
      // /terms/ exists directly, no redirect needed but kept for safety
      // Legacy WordPress URL patterns → blog index (fix 404s from old crawl history)
      {
        source: '/category/:slug*',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/tag/:slug*',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/author/:slug*',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/page/:n*',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/attachment/:slug*',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/wp-content/:path*',
        destination: '/',
        permanent: true,
      },
      // Old category-prefixed blog URLs → flat /blog/:slug/
      // NOTE: handled in middleware.ts instead — path-to-regexp here cannot
      // reliably match non-ASCII slugs, so legacy Japanese-slug URLs were
      // intercepting before specific legacy mappings could fire.
      // Note: /blog/category/:slug is now a REAL page (SEO silo), not a redirect.
      // Old nested blog paths that were never migrated (Japanese slugs or old sub-categories)
      {
        source: '/blog/case-studies/:slug*',
        destination: '/cases/',
        permanent: true,
      },
      {
        source: '/blog/events/:slug*',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/blog/news/:slug*',
        destination: '/blog/',
        permanent: true,
      },
      // Legacy Japanese-named blog category paths
      // Note: Next.js matches against DECODED paths, so raw Japanese in source.
      {
        source: '/blog/セールス/:slug*',
        destination: '/blog/',
        permanent: true,
        locale: false,
      },
      {
        source: '/blog/インターン生インタビュー/:slug*',
        destination: '/blog/',
        permanent: true,
        locale: false,
      },
      {
        source: '/blog/未分類-ja/:slug*',
        destination: '/blog/',
        permanent: true,
        locale: false,
      },
      {
        source: '/blog/機能アップデート-news/:slug*',
        destination: '/blog/',
        permanent: true,
        locale: false,
      },
      // Blog pagination / author paths
      {
        source: '/blog/page/:n*',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/blog/author/:slug*',
        destination: '/blog/',
        permanent: true,
      },
      // Remaining specific legacy pages
      {
        source: '/thanks-newsletter',
        destination: '/',
        permanent: true,
      },
      {
        source: '/thanks-newsletter/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/料金プラン',
        destination: '/',
        permanent: true,
        locale: false,
      },
      {
        source: '/料金プラン/',
        destination: '/',
        permanent: true,
        locale: false,
      },
      // WordPress RSS feed paths (never implemented on new site)
      {
        source: '/feed/',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/feed',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/:path*/feed/',
        destination: '/blog/',
        permanent: true,
      },
      // Old top-level category paths (no /blog/ prefix)
      {
        source: '/sales/:slug*',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/inside-sales/:slug*',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/marketing/:slug*',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/intern-student-interviews/:slug*',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/events/:slug*',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/news/:slug*',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/post/',
        destination: '/blog/',
        permanent: true,
      },
      // Old whitepaper / resource pages
      {
        source: '/whitepaper-library/:slug*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/resources/:slug*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/downloadable-materials',
        destination: '/',
        permanent: true,
      },
      {
        source: '/downloadable-materials/',
        destination: '/',
        permanent: true,
      },
      // Old thank-you pages — specific paths found in GSC 404
      {
        source: '/thanks-whitepaper',
        destination: '/',
        permanent: true,
      },
      {
        source: '/thanks-whitepaper/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/demo-confirmation',
        destination: '/',
        permanent: true,
      },
      {
        source: '/demo-confirmation/',
        destination: '/',
        permanent: true,
      },
      // Not-yet-translated /en/* → their JA twin (NOT home), so an English
      // visitor who lands on an untranslated EN URL gets the real JA content
      // instead of being dumped on the homepage. The negative lookahead keeps
      // the LIVE EN pages reachable; everything else maps /en/<x> → /<x>.
      // solutions allowlist is the 2 existing EN solution LPs only — other
      // /en/solutions/* (cmo/cro/sdr/ceo) fall through to the JA twin.
      {
        source: '/en/:slug((?!chat/|calendar/|library/|email/|compare/|alternatives/|glossary/|pricing/|about/|contact/|capture/|enterprise|security|cases|use-cases/|solutions/crm-to-meeting|solutions/lead-to-meeting|solutions/cmo|solutions/cro|solutions/sdr|solutions/ceo|chat$|calendar$|library$|email$|compare$|alternatives$|glossary$|pricing$|about$|contact$|capture$|enterprise$|security$|cases$).+)',
        destination: '/:slug',
        permanent: true,
      },
      // Individual legacy paths
      // /pricing now serves a real page (v2) — redirect removed 2026-05-29.
      {
        source: '/plan',
        destination: '/pricing/',
        permanent: true,
      },
      {
        source: '/plan/',
        destination: '/pricing/',
        permanent: true,
      },
      {
        source: '/recruiting',
        destination: '/careers/',
        permanent: true,
      },
      {
        source: '/recruiting/',
        destination: '/careers/',
        permanent: true,
      },
      {
        source: '/careers/marketing-manager',
        destination: '/careers/',
        permanent: true,
      },
      {
        source: '/careers/marketing-manager/',
        destination: '/careers/',
        permanent: true,
      },
      {
        source: '/privacy-policy-leads-db',
        destination: '/privacy-policy/',
        permanent: true,
      },
      {
        source: '/privacy-policy-leads-db/',
        destination: '/privacy-policy/',
        permanent: true,
      },
      {
        source: '/ai-sdr-sales-automation',
        destination: '/chat/',
        permanent: true,
      },
      {
        source: '/ai-sdr-sales-automation/',
        destination: '/chat/',
        permanent: true,
      },
      {
        source: '/sales-marketing-alliance',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/sales-marketing-alliance/',
        destination: '/blog/',
        permanent: true,
      },
      // 2026-05-22: ads 検証 pivot に伴いチャネル別 LP 撤去。
      // /lp/ (google variant) と /lp/linkedin/ は新 LP (/solutions/*)
      // で置き換える方針。残りの /lp/* は use-case 別なので保留、
      // 順次 content rewrite で再活用。
      {
        source: '/lp',
        destination: '/',
        permanent: true,
      },
      {
        source: '/lp/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/lp/linkedin',
        destination: '/',
        permanent: true,
      },
      {
        source: '/lp/linkedin/',
        destination: '/',
        permanent: true,
      },
      // 2026-05-29: ROI 診断を v2 で /tools/roi として復活。旧 /roi-simulator は
      // 新ツールへ 301（権威継承）。
      {
        source: '/roi-simulator',
        destination: '/tools/roi/',
        permanent: true,
      },
      {
        source: '/roi-simulator/',
        destination: '/tools/roi/',
        permanent: true,
      },
      {
        source: '/roi-simulator/:path*',
        destination: '/tools/roi/',
        permanent: true,
      },
      // 2026-05-11: GSC index diagnostic で「クロール済み未登録」と判定された
      // 2 本を削除。typo slug (objecitons) と SMB 向け汎用 ABM ガイドは
      // dynameet.ai の核心 target (B2B 中堅以上) とズレるため放出。
      {
        source: '/blog/15-common-turn-offs-to-objecitons-in-business-meetings',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/blog/15-common-turn-offs-to-objecitons-in-business-meetings/',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/blog/abm-tool-sme-selection-guide-meeting-conversion',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/blog/abm-tool-sme-selection-guide-meeting-conversion/',
        destination: '/blog/',
        permanent: true,
      },
      ...blogRedirects,
      // ── v2 Phase 6 (2026-05-30): role LPs → /solutions/*, cases → /cases ──
      { source: '/for/cmo', destination: '/solutions/cmo/', permanent: true },
      { source: '/for/cmo/', destination: '/solutions/cmo/', permanent: true },
      { source: '/for/marketing-manager', destination: '/solutions/cmo/', permanent: true },
      { source: '/for/marketing-manager/', destination: '/solutions/cmo/', permanent: true },
      { source: '/for/cro', destination: '/solutions/cro/', permanent: true },
      { source: '/for/cro/', destination: '/solutions/cro/', permanent: true },
      { source: '/for/inside-sales', destination: '/solutions/sdr/', permanent: true },
      { source: '/for/inside-sales/', destination: '/solutions/sdr/', permanent: true },
      { source: '/for', destination: '/solutions/cmo/', permanent: true },
      { source: '/for/', destination: '/solutions/cmo/', permanent: true },
      // case studies → /cases. Slugs were RENAMED in the v2 cases rebuild
      // (short → long descriptive), so the old 1:1 passthrough 308'd legacy
      // URLs to /cases/<oldslug>/ which 404s — killing the inbound equity on
      // the flagship case studies. Map each old slug to its real new slug,
      // and send any other legacy case slug to the /cases/ index (200), never 404.
      { source: '/case-studies', destination: '/cases/', permanent: true },
      { source: '/case-studies/', destination: '/cases/', permanent: true },
      { source: '/case-studies/edulinx', destination: '/cases/edulinx-ai-chat-40-percent/', permanent: true },
      { source: '/case-studies/edulinx/', destination: '/cases/edulinx-ai-chat-40-percent/', permanent: true },
      { source: '/case-studies/biztex', destination: '/cases/biztex-chat-leads-10x/', permanent: true },
      { source: '/case-studies/biztex/', destination: '/cases/biztex-chat-leads-10x/', permanent: true },
      { source: '/case-studies/g-gen', destination: '/cases/g-gen-inside-sales-sql-2x/', permanent: true },
      { source: '/case-studies/g-gen/', destination: '/cases/g-gen-inside-sales-sql-2x/', permanent: true },
      { source: '/case-studies/univis', destination: '/cases/univis-multi-service-3month-2deals/', permanent: true },
      { source: '/case-studies/univis/', destination: '/cases/univis-multi-service-3month-2deals/', permanent: true },
      { source: '/case-studies/:slug', destination: '/cases/', permanent: true },
      { source: '/case-studies/:slug/', destination: '/cases/', permanent: true },
      // ── v2 restructure (2026-05-29): /features/* → root product LPs ──
      // Direct 1:1 301s (no chains) preserve the 2yr authority on moved URLs.
      { source: '/features/meetings', destination: '/calendar/', permanent: true },
      { source: '/features/meetings/', destination: '/calendar/', permanent: true },
      { source: '/features/ai-chat', destination: '/chat/', permanent: true },
      { source: '/features/ai-chat/', destination: '/chat/', permanent: true },
      { source: '/features/ai-library', destination: '/library/', permanent: true },
      { source: '/features/ai-library/', destination: '/library/', permanent: true },
      { source: '/features/ai-email', destination: '/email/', permanent: true },
      { source: '/features/ai-email/', destination: '/email/', permanent: true },
      { source: '/features', destination: '/', permanent: true },
      { source: '/features/', destination: '/', permanent: true },
      // legacy phase/alias paths → point straight at the final new URL
      { source: '/features/detect', destination: '/chat/', permanent: true },
      { source: '/features/detect/', destination: '/chat/', permanent: true },
      { source: '/features/engage', destination: '/chat/', permanent: true },
      { source: '/features/engage/', destination: '/chat/', permanent: true },
      { source: '/features/chatbot', destination: '/chat/', permanent: true },
      { source: '/features/chatbot/', destination: '/chat/', permanent: true },
      { source: '/features/onsite', destination: '/chat/', permanent: true },
      { source: '/features/onsite/', destination: '/chat/', permanent: true },
      { source: '/features/nurture', destination: '/email/', permanent: true },
      { source: '/features/nurture/', destination: '/email/', permanent: true },
      { source: '/features/convert', destination: '/calendar/', permanent: true },
      { source: '/features/convert/', destination: '/calendar/', permanent: true },
      { source: '/features/offsite', destination: '/calendar/', permanent: true },
      { source: '/features/offsite/', destination: '/calendar/', permanent: true },
      { source: '/features/offers', destination: '/', permanent: true },
      { source: '/features/offers/', destination: '/', permanent: true },
    ]
  },
}

module.exports = nextConfig
