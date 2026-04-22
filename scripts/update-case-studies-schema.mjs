import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const DATA_SOURCE_ID = 'dcab4223-0d39-47fb-bc3b-a847bb9ba673'

const properties = {
  // Rename existing default title "Name" → "Title"
  Name: { name: 'Title' },
  Slug: { rich_text: {} },
  Company: { rich_text: {} },
  CompanyNote: { rich_text: {} },
  Industry: {
    select: {
      options: [
        { name: 'SaaS', color: 'blue' },
        { name: 'IT', color: 'purple' },
        { name: '製造', color: 'orange' },
        { name: '金融', color: 'green' },
        { name: '医療', color: 'red' },
        { name: '小売', color: 'yellow' },
        { name: '人材', color: 'pink' },
        { name: 'その他', color: 'gray' },
      ],
    },
  },
  EmployeeSize: {
    select: {
      options: [
        { name: '~50', color: 'default' },
        { name: '51-200', color: 'blue' },
        { name: '201-1000', color: 'purple' },
        { name: '1001+', color: 'red' },
      ],
    },
  },
  UsedProducts: {
    multi_select: {
      options: [
        { name: 'AI Chat', color: 'green' },
        { name: 'AI Email', color: 'blue' },
        { name: 'AI Calendar', color: 'purple' },
        { name: 'AI Offer', color: 'orange' },
      ],
    },
  },
  Integrations: {
    multi_select: {
      options: [
        { name: 'Salesforce', color: 'blue' },
        { name: 'HubSpot', color: 'orange' },
        { name: 'Slack', color: 'purple' },
        { name: 'Microsoft Teams', color: 'blue' },
        { name: 'Google Calendar', color: 'green' },
        { name: 'Zoom', color: 'blue' },
      ],
    },
  },
  Description: { rich_text: {} },
  HeroMetric: { rich_text: {} },
  HeroMetricLabel: { rich_text: {} },
  StatsJson: { rich_text: {} },
  Quote: { rich_text: {} },
  QuotePerson: { rich_text: {} },
  QuoteAvatar: { files: {} },
  CompanyLogo: { files: {} },
  HeroImage: { files: {} },
  PublishedDate: { date: {} },
  ModifiedDate: { date: {} },
  FocusKeyword: { rich_text: {} },
  Tags: { multi_select: { options: [] } },
  Published: { checkbox: {} },
  NoIndex: { checkbox: {} },
  Order: { number: { format: 'number' } },
  Views: { number: { format: 'number' } },
}

const result = await notion.dataSources.update({
  data_source_id: DATA_SOURCE_ID,
  properties,
})

console.log('Updated. properties:', Object.keys(result.properties).join(', '))
