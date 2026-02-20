import Image from 'next/image'
import type { NotionBlock } from '@/app/lib/notion'
import type { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'

type BlogContentProps = {
  blocks: NotionBlock[]
}

function renderRichText(richText: RichTextItemResponse[]): React.ReactNode {
  return richText.map((item, index) => {
    let content: React.ReactNode = item.plain_text

    if (item.annotations.bold) {
      content = <strong key={`bold-${index}`}>{content}</strong>
    }
    if (item.annotations.italic) {
      content = <em key={`italic-${index}`}>{content}</em>
    }
    if (item.annotations.strikethrough) {
      content = <s key={`strike-${index}`}>{content}</s>
    }
    if (item.annotations.underline) {
      content = <u key={`underline-${index}`}>{content}</u>
    }
    if (item.annotations.code) {
      content = (
        <code
          key={`code-${index}`}
          style={{
            background: '#f5f7fa',
            padding: '2px 6px',
            borderRadius: 4,
            fontSize: '0.9em',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {content}
        </code>
      )
    }
    if (item.href) {
      content = (
        <a
          key={`link-${index}`}
          href={item.href}
          style={{ color: '#12a37d', textDecoration: 'underline' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      )
    }

    return <span key={index}>{content}</span>
  })
}

function renderBlock(block: NotionBlock): React.ReactNode {
  const baseStyle = {
    marginBottom: 16,
    lineHeight: 1.8,
    color: '#374151',
  }

  switch (block.type) {
    case 'paragraph':
      return (
        <p key={block.id} style={baseStyle}>
          {renderRichText(block.paragraph.rich_text)}
        </p>
      )

    case 'heading_1':
      return (
        <h1
          key={block.id}
          style={{
            fontSize: 28,
            fontWeight: 700,
            marginTop: 40,
            marginBottom: 20,
            color: '#0f1128',
          }}
        >
          {renderRichText(block.heading_1.rich_text)}
        </h1>
      )

    case 'heading_2':
      return (
        <h2
          key={block.id}
          style={{
            fontSize: 22,
            fontWeight: 700,
            marginTop: 32,
            marginBottom: 16,
            color: '#0f1128',
          }}
        >
          {renderRichText(block.heading_2.rich_text)}
        </h2>
      )

    case 'heading_3':
      return (
        <h3
          key={block.id}
          style={{
            fontSize: 18,
            fontWeight: 700,
            marginTop: 24,
            marginBottom: 12,
            color: '#0f1128',
          }}
        >
          {renderRichText(block.heading_3.rich_text)}
        </h3>
      )

    case 'bulleted_list_item':
      return (
        <li
          key={block.id}
          style={{
            ...baseStyle,
            marginLeft: 24,
            listStyleType: 'disc',
          }}
        >
          {renderRichText(block.bulleted_list_item.rich_text)}
        </li>
      )

    case 'numbered_list_item':
      return (
        <li
          key={block.id}
          style={{
            ...baseStyle,
            marginLeft: 24,
            listStyleType: 'decimal',
          }}
        >
          {renderRichText(block.numbered_list_item.rich_text)}
        </li>
      )

    case 'quote':
      return (
        <blockquote
          key={block.id}
          style={{
            borderLeft: '4px solid #12a37d',
            paddingLeft: 20,
            margin: '24px 0',
            fontStyle: 'italic',
            color: '#6e7494',
          }}
        >
          {renderRichText(block.quote.rich_text)}
        </blockquote>
      )

    case 'code':
      return (
        <pre
          key={block.id}
          style={{
            background: '#1e1e2e',
            color: '#cdd6f4',
            padding: 20,
            borderRadius: 12,
            overflow: 'auto',
            margin: '24px 0',
            fontFamily: 'var(--font-mono)',
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          <code>{block.code.rich_text.map((t) => t.plain_text).join('')}</code>
        </pre>
      )

    case 'divider':
      return (
        <hr
          key={block.id}
          style={{
            border: 'none',
            borderTop: '1px solid #e5e7eb',
            margin: '32px 0',
          }}
        />
      )

    case 'image': {
      const imageUrl =
        block.image.type === 'external'
          ? block.image.external.url
          : block.image.file.url
      const caption = block.image.caption.map((t) => t.plain_text).join('')
      return (
        <figure key={block.id} style={{ margin: '32px 0' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            <Image
              src={imageUrl}
              alt={caption || ''}
              width={800}
              height={450}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </div>
          {caption && (
            <figcaption
              style={{
                textAlign: 'center',
                fontSize: 14,
                color: '#9ca3af',
                marginTop: 12,
              }}
            >
              {caption}
            </figcaption>
          )}
        </figure>
      )
    }

    case 'callout':
      return (
        <div
          key={block.id}
          style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: 12,
            padding: 20,
            margin: '24px 0',
            display: 'flex',
            gap: 12,
          }}
        >
          {block.callout.icon?.type === 'emoji' && (
            <span style={{ fontSize: 20 }}>{block.callout.icon.emoji}</span>
          )}
          <div>{renderRichText(block.callout.rich_text)}</div>
        </div>
      )

    case 'toggle':
      return (
        <details
          key={block.id}
          style={{
            margin: '16px 0',
            padding: '12px 16px',
            background: '#f9fafb',
            borderRadius: 8,
          }}
        >
          <summary
            style={{
              cursor: 'pointer',
              fontWeight: 600,
              color: '#0f1128',
            }}
          >
            {renderRichText(block.toggle.rich_text)}
          </summary>
        </details>
      )

    case 'bookmark':
      return (
        <a
          key={block.id}
          href={block.bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            padding: 16,
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            textDecoration: 'none',
            color: '#12a37d',
            margin: '16px 0',
            wordBreak: 'break-all',
          }}
        >
          {block.bookmark.url}
        </a>
      )

    default:
      return null
  }
}

type ListGroup = { type: 'bulleted' | 'numbered'; items: React.ReactNode[] }

export default function BlogContent({ blocks }: BlogContentProps) {
  const groupedBlocks: React.ReactNode[] = []
  let currentList: ListGroup | null = null

  function flushList(key: string) {
    if (currentList) {
      const list = currentList
      const ListTag = list.type === 'bulleted' ? 'ul' : 'ol'
      groupedBlocks.push(
        <ListTag key={key} style={{ margin: '16px 0', paddingLeft: 0 }}>
          {list.items}
        </ListTag>
      )
      currentList = null
    }
  }

  blocks.forEach((block, index) => {
    const isBulleted = block.type === 'bulleted_list_item'
    const isNumbered = block.type === 'numbered_list_item'

    if (isBulleted || isNumbered) {
      const listType = isBulleted ? 'bulleted' : 'numbered'
      if (currentList && currentList.type === listType) {
        currentList.items.push(renderBlock(block))
      } else {
        flushList(`list-${index - 1}`)
        currentList = { type: listType, items: [renderBlock(block)] }
      }
    } else {
      flushList(`list-${index - 1}`)
      groupedBlocks.push(renderBlock(block))
    }
  })

  flushList('list-final')

  return (
    <div
      style={{
        fontSize: 16,
        fontFamily: 'var(--font-noto), sans-serif',
      }}
    >
      {groupedBlocks}
    </div>
  )
}
