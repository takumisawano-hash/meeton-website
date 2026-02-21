import type { BlogPost } from '@/app/lib/notion'

type BlogListJsonLdProps = {
  posts: BlogPost[]
}

export default function BlogListJsonLd({ posts }: BlogListJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'ブログ｜Meeton AI',
    description: 'Meeton AIの最新情報、AI営業に関するノウハウ、業界トレンドをお届けします。',
    url: 'https://dynameet.ai/blog/',
    inLanguage: 'ja-JP',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Meeton AI',
      url: 'https://dynameet.ai',
    },
    publisher: {
      '@type': 'Organization',
      name: 'DynaMeet Inc.',
      url: 'https://dynameet.ai',
      logo: {
        '@type': 'ImageObject',
        url: 'https://dynameet.ai/logo-dark.svg',
      },
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.slice(0, 10).map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://dynameet.ai/blog/${post.slug}/`,
        name: post.title,
      })),
    },
  }

  // パンくずリストも追加
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ホーム',
        item: 'https://dynameet.ai/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'ブログ',
        item: 'https://dynameet.ai/blog/',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  )
}
