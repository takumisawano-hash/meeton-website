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
        destination: '/case-studies/',
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
      // Old English subdir (if it no longer exists)
      {
        source: '/en/:slug*',
        destination: '/',
        permanent: true,
      },
      // Individual legacy paths
      {
        source: '/pricing',
        destination: '/',
        permanent: true,
      },
      {
        source: '/pricing/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/plan',
        destination: '/',
        permanent: true,
      },
      {
        source: '/plan/',
        destination: '/',
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
        destination: '/features/ai-chat/',
        permanent: true,
      },
      {
        source: '/ai-sdr-sales-automation/',
        destination: '/features/ai-chat/',
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
      ...blogRedirects,
      // Old phase URLs → new product URLs
      {
        source: '/features/detect',
        destination: '/features/ai-chat/',
        permanent: true,
      },
      {
        source: '/features/detect/',
        destination: '/features/ai-chat/',
        permanent: true,
      },
      {
        source: '/features/engage',
        destination: '/features/ai-chat/',
        permanent: true,
      },
      {
        source: '/features/engage/',
        destination: '/features/ai-chat/',
        permanent: true,
      },
      {
        source: '/features/nurture',
        destination: '/features/offers/',
        permanent: true,
      },
      {
        source: '/features/nurture/',
        destination: '/features/offers/',
        permanent: true,
      },
      {
        source: '/features/convert',
        destination: '/features/meetings/',
        permanent: true,
      },
      {
        source: '/features/convert/',
        destination: '/features/meetings/',
        permanent: true,
      },
      // Legacy URLs → new product URLs
      {
        source: '/features/chatbot',
        destination: '/features/ai-chat/',
        permanent: true,
      },
      {
        source: '/features/chatbot/',
        destination: '/features/ai-chat/',
        permanent: true,
      },
      {
        source: '/features/onsite',
        destination: '/features/offers/',
        permanent: true,
      },
      {
        source: '/features/onsite/',
        destination: '/features/offers/',
        permanent: true,
      },
      {
        source: '/features/offsite',
        destination: '/features/meetings/',
        permanent: true,
      },
      {
        source: '/features/offsite/',
        destination: '/features/meetings/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
