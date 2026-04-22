import { Client } from '@notionhq/client'
import { readFileSync } from 'node:fs'

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const PAGE_ID = '34944e31-fe62-8154-b4d1-d5bc03a6621e'
const LOGO_PATH = '/tmp/edulinx-logo-raw'

// 1) Create file_upload object
const fu = await notion.fileUploads.create({
  mode: 'single_part',
  filename: 'edulinx-logo.png',
  content_type: 'image/png',
})
console.log('file_upload created:', fu.id)

// 2) Send the file data
const fileData = readFileSync(LOGO_PATH)
const blob = new Blob([fileData], { type: 'image/png' })
const sent = await notion.fileUploads.send({
  file_upload_id: fu.id,
  file: { data: blob, filename: 'edulinx-logo.png' },
})
console.log('upload status:', sent.status)

// 3) Attach to CompanyLogo property
const updated = await notion.pages.update({
  page_id: PAGE_ID,
  properties: {
    CompanyLogo: {
      files: [
        {
          type: 'file_upload',
          file_upload: { id: fu.id },
          name: 'edulinx-logo.png',
        },
      ],
    },
  },
})
const logoProp = updated.properties.CompanyLogo
console.log('CompanyLogo files:', JSON.stringify(logoProp.files?.map((f) => ({ type: f.type, name: f.name })), null, 2))
