type HowToStep = {
  name: string
  text: string
  image?: string
}

type HowToJsonLdProps = {
  name: string
  description: string
  steps: HowToStep[]
  totalTime?: string // ISO 8601 duration format (e.g., "PT30M" for 30 minutes)
  image?: string
}

export default function HowToJsonLd({ name, description, steps, totalTime, image }: HowToJsonLdProps) {
  if (steps.length === 0) return null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && {
        image: {
          '@type': 'ImageObject',
          url: step.image,
        },
      }),
    })),
    ...(totalTime && {
      totalTime,
    }),
    ...(image && {
      image: {
        '@type': 'ImageObject',
        url: image,
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// ブログコンテンツからHowTo形式のステップを抽出するヘルパー
export function extractHowToFromContent(
  blocks: Array<{ type: string; [key: string]: unknown }>,
  title: string
): { steps: HowToStep[]; description: string } | null {
  const steps: HowToStep[] = []
  let description = ''
  let inNumberedList = false
  let stepTexts: string[] = []

  // タイトルにHowTo系のキーワードが含まれているか確認
  const howToKeywords = ['方法', 'やり方', 'ステップ', '手順', 'つの', '選', 'ポイント', 'コツ', 'How to', 'Tips']
  const isHowToArticle = howToKeywords.some((keyword) => title.includes(keyword))

  if (!isHowToArticle) return null

  for (const block of blocks) {
    // 最初の段落を説明文として使用
    if (block.type === 'paragraph' && !description) {
      const paragraph = block.paragraph as { rich_text: Array<{ plain_text: string }> }
      const text = paragraph?.rich_text?.map((t) => t.plain_text).join('') || ''
      if (text.trim()) {
        description = text
      }
    }

    // 番号付きリストをステップとして収集
    if (block.type === 'numbered_list_item') {
      inNumberedList = true
      const listItem = block.numbered_list_item as { rich_text: Array<{ plain_text: string }> }
      const text = listItem?.rich_text?.map((t) => t.plain_text).join('') || ''
      if (text.trim()) {
        stepTexts.push(text)
      }
    } else if (inNumberedList && stepTexts.length > 0) {
      // 番号付きリストが終了したら、ステップを追加
      stepTexts.forEach((text, index) => {
        steps.push({
          name: `ステップ ${index + 1}`,
          text,
        })
      })
      stepTexts = []
      inNumberedList = false
    }

    // H2/H3をステップ名として使用（番号が含まれている場合）
    if (block.type === 'heading_2' || block.type === 'heading_3') {
      const headingKey = block.type as 'heading_2' | 'heading_3'
      const heading = block[headingKey] as { rich_text: Array<{ plain_text: string }> }
      const text = heading?.rich_text?.map((t) => t.plain_text).join('') || ''

      // "1." や "①" などの番号パターンを検出
      if (/^[\d①②③④⑤⑥⑦⑧⑨⑩]/.test(text) || /^(ステップ|Step)\s*\d/i.test(text)) {
        steps.push({
          name: text.replace(/^[\d①②③④⑤⑥⑦⑧⑨⑩.\s:：]+/, '').trim(),
          text: '', // 次の段落で埋める
        })
      }
    }
  }

  // 残りの番号付きリストを処理
  if (stepTexts.length > 0) {
    stepTexts.forEach((text, index) => {
      steps.push({
        name: `ステップ ${steps.length + index + 1}`,
        text,
      })
    })
  }

  if (steps.length < 2) return null

  return { steps, description }
}
