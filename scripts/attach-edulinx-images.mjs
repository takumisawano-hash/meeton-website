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

// 1) Office image → HeroImage property
const officeId = await upload('/tmp/edulinx-office-raw', 'edulinx-office.jpg', 'image/jpeg')
console.log('office file_upload_id:', officeId)

await notion.pages.update({
  page_id: PAGE_ID,
  properties: {
    HeroImage: {
      files: [
        {
          type: 'file_upload',
          file_upload: { id: officeId },
          name: 'edulinx-office.jpg',
        },
      ],
    },
  },
})
console.log('HeroImage attached ✓')

// 2) Meeting image → embed as image block in body
const meetingId = await upload(
  '/tmp/edulinx-meeting-raw',
  'edulinx-meeting.jpg',
  'image/jpeg'
)
console.log('meeting file_upload_id:', meetingId)

// Find boundary: insert the image BEFORE the H2 "導入後の成果" block so it shows
// at the end of 「導入プロセス——営業チームの心境変化」 section (reinforces team alignment visual).
const blocks = []
let cursor
do {
  const list = await notion.blocks.children.list({
    block_id: PAGE_ID,
    start_cursor: cursor,
    page_size: 100,
  })
  blocks.push(...list.results)
  cursor = list.has_more ? list.next_cursor : undefined
} while (cursor)

const targetIdx = blocks.findIndex(
  (b) =>
    b.type === 'heading_2' &&
    b.heading_2.rich_text.map((r) => r.plain_text).join('') === '導入後の成果'
)
if (targetIdx < 0) throw new Error('target H2 not found')
const afterBlock = blocks[targetIdx - 1] // insert after this (so image appears at end of previous section)

const imageBlock = {
  object: 'block',
  type: 'image',
  image: {
    type: 'file_upload',
    file_upload: { id: meetingId },
    caption: [
      {
        type: 'text',
        text: { content: 'AI活用について議論するエデュリンクス社内の様子' },
      },
    ],
  },
}

// Append after a specific block: use children.append with `after` param
await notion.blocks.children.append({
  block_id: PAGE_ID,
  after: afterBlock.id,
  children: [imageBlock],
})
console.log('Meeting image embedded ✓ (after block ' + afterBlock.id + ')')
