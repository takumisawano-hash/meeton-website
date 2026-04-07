import fs from 'node:fs'

const result = JSON.parse(fs.readFileSync('scripts/slug-remap-result.json', 'utf-8'))
const content = fs.readFileSync('scripts/blog-redirects.js', 'utf-8')

let updated = content
let count = 0

for (const r of result) {
  // The old slug is URL-encoded. The old blog-redirects.js has destinations like
  // "/blog/{old-encoded-slug}/" that now need to point to "/blog/{new-slug}/"
  const oldDest = `/blog/${r.oldSlug}/`
  const newDest = `/blog/${r.newSlug}/`
  // Escape special regex chars in old dest
  const escaped = oldDest.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const before = updated
  updated = updated.replace(new RegExp(`"destination": "${escaped}"`, 'g'), `"destination": "${newDest}"`)
  if (before !== updated) count++
}

fs.writeFileSync('scripts/blog-redirects.js', updated)
console.log(`Updated ${count} destination mappings in blog-redirects.js`)
