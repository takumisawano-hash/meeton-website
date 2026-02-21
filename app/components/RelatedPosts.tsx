import Link from 'next/link'
import type { BlogPost } from '@/app/lib/notion'

type RelatedPostsProps = {
  posts: BlogPost[]
  currentSlug: string
}

export default function RelatedPosts({ posts, currentSlug }: RelatedPostsProps) {
  // Filter out current post and limit to 3
  const relatedPosts = posts
    .filter((post) => post.slug !== currentSlug)
    .slice(0, 3)

  if (relatedPosts.length === 0) return null

  return (
    <section
      style={{
        marginTop: 64,
        paddingTop: 48,
        borderTop: '1px solid #e5e7eb',
      }}
    >
      <h2
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: '#0f1128',
          marginBottom: 24,
        }}
      >
        関連記事
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 20,
        }}
      >
        {relatedPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}/`}
            style={{
              display: 'block',
              padding: 20,
              background: '#f8fafc',
              borderRadius: 12,
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
          >
            {post.category && (
              <span
                style={{
                  display: 'inline-block',
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#12a37d',
                  marginBottom: 8,
                }}
              >
                {post.category}
              </span>
            )}
            <h3
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#0f1128',
                lineHeight: 1.5,
                margin: 0,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {post.title}
            </h3>
            {post.publishedDate && (
              <time
                dateTime={post.publishedDate}
                style={{
                  display: 'block',
                  fontSize: 12,
                  color: '#9ca3af',
                  marginTop: 8,
                }}
              >
                {new Date(post.publishedDate).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </time>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
