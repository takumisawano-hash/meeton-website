/**
 * Generate redirect configuration for next.config.js
 */

import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const slugMappings = JSON.parse(fs.readFileSync(path.join(__dirname, 'slug-mappings.json'), 'utf-8'))

const redirects = []

for (const mapping of slugMappings) {
  const { oldSlug, newSlug } = mapping

  // Redirect from root to /blog/
  // Old WordPress URL: dynameet.ai/slug/ → New: dynameet.ai/blog/slug/
  redirects.push({
    source: `/${newSlug}`,
    destination: `/blog/${newSlug}/`,
    permanent: true
  })

  // If slug changed (Japanese → English), also redirect old slug
  if (oldSlug !== newSlug) {
    // URL-encoded Japanese slug
    redirects.push({
      source: `/${oldSlug}`,
      destination: `/blog/${newSlug}/`,
      permanent: true
    })

    // Decoded version (for direct access)
    try {
      const decoded = decodeURIComponent(oldSlug)
      if (decoded !== oldSlug) {
        redirects.push({
          source: `/${decoded}`,
          destination: `/blog/${newSlug}/`,
          permanent: true
        })
      }
    } catch (e) {
      // Skip if decoding fails
    }
  }
}

// Output as JavaScript array for next.config.js
console.log('// Generated redirects - add to next.config.js')
console.log('const blogRedirects = ' + JSON.stringify(redirects, null, 2) + ';')
console.log('')
console.log(`// Total: ${redirects.length} redirects`)

// Save to file
fs.writeFileSync(
  path.join(__dirname, 'blog-redirects.js'),
  `// Auto-generated blog redirects for WordPress migration
// Generated: ${new Date().toISOString()}

const blogRedirects = ${JSON.stringify(redirects, null, 2)};

module.exports = blogRedirects;
`
)

console.log('\nSaved to scripts/blog-redirects.js')
