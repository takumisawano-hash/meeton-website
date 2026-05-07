import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_TOKEN })

// ======================= BIZTEX =======================
const BIZTEX_ID = '34b44e31-fe62-81a4-8f76-ea0e14d3d3a1'

// Property-level replacements (specific rewrites)
const biztexPropUpdates = {
  Quote: {
    rich_text: [
      {
        type: 'text',
        text: {
          content:
            '従来のAI非対応チャットツールを使っていた時代は月1、2件あればいい方だった。Meeton ai にしてから月20件以上——20倍以上のリードがチャットから生まれている。大きなコストをかけずに集客できていないこの1年、ロボップやコネクトの既存サービスがチャットから獲得できていて、本当に助かっている。',
        },
      },
    ],
  },
  HeroMetricLabel: {
    rich_text: [
      {
        type: 'text',
        text: { content: 'チャット経由リード獲得数（対 従来のシナリオ型チャット）' },
      },
    ],
  },
  Description: {
    rich_text: [
      {
        type: 'text',
        text: {
          content:
            'クラウドRPA『BizteX cobit』・iPaaS『BizteX Connect』等を提供する BizteX は、従来のAI非対応チャットツールでは月1〜2件程度のリード獲得しかできず、事実上停止状態だったチャット運用を Meeton ai に切り替え。導入後は月20件以上（20倍以上）のリード獲得を実現。オールインワンのマーケティングツールとしての価値、機能要望の翌日対応レベルの開発スピード、解約意向の早期察知というサブ効果、そして AI メールによる完全自動フォローアップまで。',
        },
      },
    ],
  },
  StatsJson: {
    rich_text: [
      {
        type: 'text',
        text: {
          content: JSON.stringify([
            {
              value: '20x+',
              label: 'チャット経由リード獲得（対 従来のシナリオ型チャット）',
            },
            { value: '手間ゼロ', label: 'AI 自動回答（シナリオ構築不要）' },
          ]),
        },
      },
    ],
  },
}

await notion.pages.update({ page_id: BIZTEX_ID, properties: biztexPropUpdates })
console.log('✓ BizteX properties updated')

// Body block replacements via content matching
const biztexBlockRewrites = [
  {
    match: (t) => t.startsWith('以前使っていたのは、AI 非対応プランの「チャットプラス」'),
    newText:
      '以前使っていたのは、AI 非対応のシナリオ型チャットツールだった。シナリオ型のため、「事前に自分で回答を作って入れておく」ことが必須で、メンテナンスコストが膨らみ続けていた。やがて、昔から受け継がれてきた回答フローがどう組み上がっているのかすら把握しきれなくなり、事実上、稼働が止まっていた。',
  },
  {
    match: (t) => t.includes('チャットプラスとの決定的な違いは'),
    newText:
      '比較検討は実質行わなかった。営業責任者の小川氏が「よさそうなので話を聞いてみたい」と持ち込み、その場で合意に近い形で導入が決まった。従来のシナリオ型チャットとの決定的な違いは、"チャット"という枠を越えたマーケティングツールとしての広さだった。',
  },
  {
    match: (t) => t.startsWith('オールインで色々できたこと——それが最初の決め手'),
    newText:
      'オールインで色々できたこと——それが最初の決め手。従来のシナリオ型チャットと比べた時、もうチャットの領域を超えてマーケティングのツールとしての印象が強くて、しっかり使いこなそうと思えば色々できるかなと思った。',
  },
  {
    match: (t) => t.startsWith('回答がしっかりウェブページを読み込んで'),
    newText:
      '回答がしっかりウェブページを読み込んでくれて、自分の手間が一切ない。多少はあるかもしれないけど、ほぼほぼなかった。従来のシナリオ型チャットと比べたらそこが大きい。',
  },
  {
    match: (t) => t.startsWith('チャットプラス時代、BizteX のチャット経由リード'),
    newText:
      '従来のシナリオ型チャット時代、BizteX のチャット経由リードは月に1〜2件程度だった。Meeton ai 導入後、これが一気に月20件以上にまで跳ね上がった——20倍以上の水準。大きな追加コストをかけずに、既存サービスの集客が前進している。',
  },
]

await applyBlockRewrites(BIZTEX_ID, biztexBlockRewrites, 'BizteX')

// ======================= EDULINX =======================
const EDULINX_ID = '34944e31-fe62-8154-b4d1-d5bc03a6621e'

const edulinxBlockRewrites = [
  {
    match: (t, type) => type === 'heading_3' && t.includes('Immedio との比較検討'),
    newText: '他の候補との比較——Meeton ai がカバーしたうえで更に広い',
  },
  {
    match: (t) => t.startsWith('競合として Immedio も比較検討した'),
    newText:
      '別の候補として、フォーム出し分け型の B2B 営業支援ツールも比較検討した。そのカテゴリのツールは、フォーム表示のセグメンテーション（企業規模・地域・スコア等での細かな出し分け）や、カレンダー誘導による能動的コンバートといった機能を持ち、確かに優れた点もあった。',
  },
  {
    match: (t) => t.startsWith('ただし Immedio が提供する機能の多く'),
    newText:
      'ただしそれらの機能の多くは Meeton ai でも実現可能であり、そこに加えて Meeton ai には AI SDR 特有の機能——訪問者の意図を汲んだ対話型ナーチャリング、行動シグナルに基づくパーソナライズ——が備わっていた。価格も大差なく、"同等のコストで、より広い機能"という整理になり、Meeton ai 一択となった。',
  },
]

await applyBlockRewrites(EDULINX_ID, edulinxBlockRewrites, 'EdulinX')

async function applyBlockRewrites(pageId, rewrites, label) {
  const blocks = []
  let cursor
  do {
    const list = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100,
    })
    blocks.push(...list.results)
    cursor = list.has_more ? list.next_cursor : undefined
  } while (cursor)

  let count = 0
  for (const b of blocks) {
    const type = b.type
    const body = b[type]
    if (!body?.rich_text) continue
    const text = body.rich_text.map((r) => r.plain_text).join('')
    for (const { match, newText } of rewrites) {
      if (match(text, type)) {
        await notion.blocks.update({
          block_id: b.id,
          [type]: { rich_text: [{ type: 'text', text: { content: newText } }] },
        })
        console.log(`  [${label} ${type}] ${newText.slice(0, 60)}...`)
        count++
        break
      }
    }
  }
  console.log(`✓ ${label}: ${count} blocks updated`)
}
