import type { BlogPost } from '@/app/lib/notion'

type BlogJsonLdProps = {
  post: BlogPost
}

export default function BlogJsonLd({ post }: BlogJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedDate,
    dateModified: post.publishedDate,
    author: {
      '@type': 'Organization',
      name: 'DynaMeet Inc.',
      url: 'https://dynameet.ai',
    },
    publisher: {
      '@type': 'Organization',
      name: 'DynaMeet Inc.',
      url: 'https://dynameet.ai',
      logo: {
        '@type': 'ImageObject',
        url: 'https://dynameet.ai/icon',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://dynameet.ai/blog/${post.slug}/`,
    },
    ...(post.featuredImage && {
      image: post.featuredImage,
    }),
    ...(post.tags.length > 0 && {
      keywords: post.tags.join(', '),
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
