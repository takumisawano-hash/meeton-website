import { Client } from '@notionhq/client'
import fs from 'node:fs'

const env = fs.readFileSync('.env.local', 'utf8')
env.split('\n').forEach(line => {
  const [k, ...v] = line.split('=')
  if (k && v.length) process.env[k.trim()] = v.join('=').trim()
})

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const PAGE = '30d44e31-fe62-81d6-b5ce-ddead07a7690'
// Insert AFTER this block (last bullet of CRM連携 section), BEFORE まとめ heading
const AFTER_BLOCK = '30d44e31-fe62-81e6-88bf-dc5cce0bd1c4'

const t = (content, opts = {}) => ({
  type: 'text',
  text: { content, link: opts.link ? { url: opts.link } : null },
  annotations: {
    bold: !!opts.bold,
    italic: false,
    strikethrough: false,
    underline: false,
    code: false,
    color: opts.color || 'default',
  },
})

const row = (cells) => ({
  type: 'table_row',
  table_row: { cells: cells.map(c => Array.isArray(c) ? c : [t(c)]) },
})

const HEADER = ['ツール', '月額料金目安', '主なユースケース', '匿名訪問者の企業識別', 'CRM連携', 'AIタイプ', '日本語対応', '差別化の強み']

const ROWS = [
  [[t('Meeton ai', { bold: true })], '要問合せ', '商談創出', '○', 'HubSpot / Salesforce / Marketo / Eloqua', '生成AI', 'native', 'AIチャット＋メール＋カレンダー＋オファーの4モジュール一体型で商談まで全自動'],
  ['チャネルトーク', '¥0〜 / Growth ¥9,000〜', 'CX接客・サポート', '△', 'Zapier経由（HubSpot/Salesforce）', '生成AI（ALF）', 'native', '問い合わせの80.9%をAIで自動処理'],
  ['KARAKURI chatbot', '要問合せ', 'カスタマーサポート', '✕', 'Salesforce / Zendesk / Intercom', 'ハイブリッド', 'native', '正答率95%保証、大手CS実績'],
  ['sinclo', '¥10,000〜（コスト）/ ¥50,000〜（成果）', 'Web接客・リード獲得', '○', 'Salesforce / Pardot / Marketo / kintone', 'ハイブリッド', 'native', '企業識別＋行動トリガーでBtoB商談獲得、導入800社超'],
  ['チャットプラス', '¥1,500〜 / Premium ¥28,000〜 / Auto AI ¥80,000〜', 'サポート・FAQ', '△', 'Salesforce（有償）/ kintone / API', 'ハイブリッド', 'native', '国内2万件超、スモールスタート可'],
  ['KARTE（RightSupport / QANT Web）', '要問合せ', 'CX接客・Web接客', '○', 'Datahub経由', 'ハイブリッド', 'native', '国内最大級の1stパーティデータ基盤'],
  ['MOBILUS（MOBI BOT）', '要問合せ', 'カスタマーサポート', '✕', 'Salesforce / kintone / Azure OpenAI', 'ハイブリッド', 'native', '国内チャットボット販売シェアNo.1、金融・官公庁実績'],
  ['Fin AI（旧Intercom Fin）', '$0.99/解決＋$29〜/席', 'カスタマーサポート', '△', 'HubSpot / Salesforce / Freshdesk', '生成AI', '標準（UI対応済）', '1件¥149成果報酬型、解決率65%'],
  ['Salesforce Agentforce', '¥15,000/ユーザー or Flex Credits', '商談創出・サポート', '○', 'Salesforce ネイティブ', '生成AI（Einstein）', 'native', 'Salesforceエコシステム全体との深い統合'],
]

const table = {
  object: 'block',
  type: 'table',
  table: {
    table_width: HEADER.length,
    has_column_header: true,
    has_row_header: false,
    children: [row(HEADER), ...ROWS.map(r => row(r))],
  },
}

const children = [
  { object: 'block', type: 'divider', divider: {} },
  {
    object: 'block',
    type: 'heading_2',
    heading_2: { rich_text: [t('主要BtoBチャットボット比較表（2026年版）')] },
  },
  {
    object: 'block',
    type: 'paragraph',
    paragraph: {
      rich_text: [t('BtoBチャットボットは用途によって得意分野が大きく異なります。商談創出特化、CX接客、カスタマーサポート、社内FAQなど、目的に合わないツールを選ぶと投資対効果が出ません。主要9ツールの特徴を一覧にまとめました。')],
    },
  },
  table,
  {
    object: 'block',
    type: 'paragraph',
    paragraph: {
      rich_text: [t('※ 料金は2026年4月時点の公開情報。詳細は各社公式サイトに要問合せ。Drift（Salesloft）は2026年3月6日サービス終了のため除外しています。', { color: 'gray' })],
    },
  },
]

const res = await notion.blocks.children.append({
  block_id: PAGE,
  after: AFTER_BLOCK,
  children,
})

console.log(`Appended ${res.results.length} blocks after ${AFTER_BLOCK}`)
