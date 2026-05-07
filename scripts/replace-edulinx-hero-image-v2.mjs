import { Client } from '@notionhq/client'
import { readFileSync } from 'node:fs'

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const PAGE_ID = '34944e31-fe62-8154-b4d1-d5bc03a6621e'

async function upload(path, filename, contentType) {
  const fu = await notion.fileUploads.create({
    mode: 'single_part',
    filename,
    content_type: contentType,
  })
  const data = readFileSync(path)
  const blob = new Blob([data], { type: contentType })
  const sent = await notion.fileUploads.send({
    file_upload_id: fu.id,
    file: { data: blob, filename },
  })
  if (sent.status !== 'uploaded') throw new Error('upload failed: ' + sent.status)
  return fu.id
}

const heroId = await upload('/tmp/edulinx-hero.jpg', 'edulinx-hero.jpg', 'image/jpeg')
console.log('edulinx hero file_upload_id:', heroId)

await notion.pages.update({
  page_id: PAGE_ID,
  properties: {
    HeroImage: {
      files: [
        {
          type: 'file_upload',
          file_upload: { id: heroId },
          name: 'edulinx-hero.jpg',
        },
      ],
    },
  },
})
console.log('✓ EdulinX HeroImage replaced')
