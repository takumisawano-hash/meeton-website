import type { BlogPost } from '@/app/lib/notion'

type BlogJsonLdProps = {
  post: BlogPost
  wordCount?: number
  readingTime?: number
  headings?: string[] // 記事内の見出しリスト（AEO用）
}

export default function BlogJsonLd({ post, wordCount, readingTime, headings }: BlogJsonLdProps) {
  const articleUrl = `https://dynameet.ai/blog/${post.slug}/`

  // メインの記事スキーマ
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${articleUrl}#article`,
    headline: post.title,
    name: post.title,
    description: post.description,
    datePublished: post.publishedDate,
    dateModified: post.modifiedDate || post.publishedDate,
    author: {
      '@type': 'Organization',
      '@id': 'https://dynameet.ai/#organization',
      name: 'DynaMeet Inc.',
      url: 'https://dynameet.ai',
      logo: {
        '@type': 'ImageObject',
        url: 'https://dynameet.ai/logo-dark.svg',
      },
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://dynameet.ai/#organization',
      name: 'DynaMeet Inc.',
      url: 'https://dynameet.ai',
      logo: {
        '@type': 'ImageObject',
        url: 'https://dynameet.ai/logo-dark.svg',
        width: 602,
        height: 132,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    url: articleUrl,
    inLanguage: 'ja-JP',
    isAccessibleForFree: true,
    // AEO/GEO: コンテンツの概要構造
    ...(headings && headings.length > 0 && {
      about: headings.slice(0, 5).map((heading) => ({
        '@type': 'Thing',
        name: heading,
      })),
    }),
    // AEO: 記事で扱うトピック
    ...(post.category && {
      articleSection: post.category,
      genre: post.category,
    }),
    ...(post.featuredImage && {
      image: {
        '@type': 'ImageObject',
        url: post.featuredImage,
        width: 1200,
        height: 630,
      },
      thumbnailUrl: post.featuredImage,
    }),
    ...((post.focusKeyword || post.tags.length > 0) && {
      keywords: [post.focusKeyword, ...post.tags].filter(Boolean).join(', '),
    }),
    ...(wordCount && {
      wordCount: wordCount,
    }),
    ...(readingTime && {
      timeRequired: `PT${readingTime}M`,
    }),
    // AEO: コンテンツの信頼性シグナル
    isPartOf: {
      '@type': 'Blog',
      '@id': 'https://dynameet.ai/blog/#blog',
      name: 'Meeton AI ブログ',
      publisher: {
        '@type': 'Organization',
        '@id': 'https://dynameet.ai/#organization',
      },
    },
    // GEO: 潜在的な引用形式
    potentialAction: {
      '@type': 'ReadAction',
      target: articleUrl,
    },
  }

  // Speakable スキーマ（音声アシスタント対応 - AEO）
  const speakableJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': articleUrl,
    name: post.title,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['article h1', 'article h2', 'article > p:first-of-type'],
    },
    url: articleUrl,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }}
      />
    </>
  )
}
