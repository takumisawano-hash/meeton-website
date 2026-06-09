import { Client } from '@notionhq/client'
import { readFileSync } from 'node:fs'

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const PAGE_ID = '37544e31-fe62-8170-b75e-cb1c5b7554bd'

async function upload(path, filename, contentType) {
  const fu = await notion.fileUploads.create({ mode: 'single_part', filename, content_type: contentType })
  const data = readFileSync(path)
  const blob = new Blob([data], { type: contentType })
  const sent = await notion.fileUploads.send({ file_upload_id: fu.id, file: { data: blob, filename } })
  if (sent.status !== 'uploaded') throw new Error('upload failed: ' + sent.status)
  return fu.id
}

const heroId = await upload('/tmp/ggen-hero2.png', 'ggen-hero2.png', 'image/png')
console.log('Hero uploaded:', heroId)

await notion.pages.update({
  page_id: PAGE_ID,
  properties: {
    HeroImage: { files: [{ type: 'file_upload', file_upload: { id: heroId }, name: 'ggen-hero2.png' }] },
  },
})
console.log('✓ HeroImage replaced')
