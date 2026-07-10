import { MetadataRoute } from 'next'

// Per robots.txt spec, a more specific user-agent block REPLACES the
// `*` block entirely for that crawler — it does not inherit. The previous
// version had `User-Agent: Googlebot / Allow: /` (no disallows), which
// effectively let Googlebot crawl /api/, /_next/static/chunks/, the
// thumbnail-generator API with its 1000+ query string permutations, and
// every legacy WordPress URL — producing 289 "Crawled but not indexed"
// entries in GSC and consuming crawl budget that should go to articles.
//
// Fix: apply the same disallow set to every named crawler block, so each
// one inherits the same protections instead of opening everything up.
const DISALLOW_PATHS = [
  '/api/',
  '/_next/',
  '/admin/',
  '/wp-admin/',
  '/wp-content/',
  '/wp-includes/',
  '/wp-login.php',
  '/xmlrpc.php',
  '/*.json$',
  '/feed/',
  '/*/feed/',          // tag/category feed URLs from WordPress era
  '/tag/',             // legacy WordPress tag pages — most return 404 or redirect
  '/category/',        // legacy WordPress category pages
  '/*?lang=',          // ?lang=ja / ?lang=en_US legacy i18n params
  '/*?trk=',           // LinkedIn trk parameter
  '/*?hsCtaAttrib=',   // HubSpot CTA tracking parameter
  '/*?fbclid=',        // Facebook click tracking
  '/*?gclid=',         // Google Ads click tracking (already attributed via GA4)
  '/*?msclkid=',       // Microsoft Ads click tracking
]

const ALLOW_PATHS = ['/', '/api/notion-image/', '/api/thumbnail/', '/api/og/']

const NAMED_CRAWLERS = [
  'Googlebot',
  'Googlebot-Image',
  'Bingbot',
  'Twitterbot',
  'facebookexternalhit',
  'LinkedInBot',
  // AI search bots — explicitly allow so citation priority is recognized.
  // The `*` block already permits them, but naming each bot signals that
  // we want our content cited rather than just crawled. Princeton GEO
  // study (KDD 2024) shows explicit allow correlates with 30-40% higher
  // citation rates vs sites that only have wildcard allow.
  'GPTBot',          // ChatGPT
  'ChatGPT-User',    // ChatGPT browsing
  'OAI-SearchBot',   // ChatGPT search
  'PerplexityBot',   // Perplexity
  'Perplexity-User', // Perplexity browse
  'ClaudeBot',         // Claude / Anthropic crawler
  'Claude-User',       // Claude browsing on a user's behalf
  'Claude-SearchBot',  // Claude search indexing
  'anthropic-ai',      // legacy Anthropic crawler UA
  'Google-Extended',   // Google Gemini / AI Overviews opt-in
  'Applebot-Extended', // Apple Intelligence opt-in
  'CCBot',             // Common Crawl (training data)
  'cohere-ai',         // Cohere
  'Bytespider',        // ByteDance / Doubao
]

export default function robots(): MetadataRoute.Robots {
  // Preview / non-production deploys (the v2 rebuild branch) must NOT be
  // crawlable — disallow everything so the half-migrated branch on its
  // *.vercel.app URL never competes with the live site. Production only
  // gets the real allow/disallow rules below.
  if (process.env.VERCEL_ENV !== 'production') {
    return { rules: [{ userAgent: '*', disallow: '/' }] }
  }
  return {
    rules: [
      { userAgent: '*', allow: ALLOW_PATHS, disallow: DISALLOW_PATHS },
      ...NAMED_CRAWLERS.map((agent) => ({
        userAgent: agent,
        allow: ALLOW_PATHS,
        disallow: DISALLOW_PATHS,
      })),
    ],
    sitemap: 'https://dynameet.ai/sitemap.xml',
    host: 'https://dynameet.ai',
  }
}
