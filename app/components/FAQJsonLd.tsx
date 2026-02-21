type FAQItem = {
  question: string
  answer: string
}

type FAQJsonLdProps = {
  items: FAQItem[]
  pageUrl?: string
}

export default function FAQJsonLd({ items, pageUrl }: FAQJsonLdProps) {
  if (items.length === 0) return null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
    ...(pageUrl && {
      url: pageUrl,
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// ブログコンテンツからFAQ形式のQ&Aを抽出するヘルパー
export function extractFAQFromContent(blocks: Array<{ type: string; [key: string]: unknown }>): FAQItem[] {
  const faqs: FAQItem[] = []
  let currentQuestion: string | null = null

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]

    // H2/H3が「？」で終わる場合、それをFAQの質問として扱う
    if (block.type === 'heading_2' || block.type === 'heading_3') {
      const headingKey = block.type as 'heading_2' | 'heading_3'
      const heading = block[headingKey] as { rich_text: Array<{ plain_text: string }> }
      const text = heading?.rich_text?.map((t) => t.plain_text).join('') || ''

      if (text.includes('？') || text.includes('?')) {
        currentQuestion = text
      } else {
        currentQuestion = null
      }
    }

    // 質問の後の段落を回答として収集
    if (currentQuestion && block.type === 'paragraph') {
      const paragraph = block.paragraph as { rich_text: Array<{ plain_text: string }> }
      const text = paragraph?.rich_text?.map((t) => t.plain_text).join('') || ''

      if (text.trim()) {
        faqs.push({
          question: currentQuestion.replace(/[？?]$/, ''),
          answer: text,
        })
        currentQuestion = null
      }
    }
  }

  return faqs
}
