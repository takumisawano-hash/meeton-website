import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost } from '@/app/lib/notion'

type BlogCardProps = {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = post.publishedDate
    ? new Date(post.publishedDate).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return (
    <Link
      href={`/blog/${post.slug}/`}
      style={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <article
        style={{
          background: '#fff',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          border: '1px solid rgba(223,227,240,0.6)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
      >
        {post.featuredImage && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingTop: '56.25%',
              background: '#f5f7fa',
            }}
          >
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div style={{ padding: '24px' }}>
          {post.category && (
            <span
              style={{
                display: 'inline-block',
                fontSize: 12,
                fontWeight: 600,
                color: '#12a37d',
                background: 'rgba(18,163,125,0.1)',
                padding: '4px 10px',
                borderRadius: 6,
                marginBottom: 12,
              }}
            >
              {post.category}
            </span>
          )}
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              lineHeight: 1.5,
              color: '#0f1128',
              margin: 0,
              marginBottom: 10,
            }}
          >
            {post.title}
          </h2>
          {post.description && (
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.7,
                color: '#6e7494',
                margin: 0,
                marginBottom: 16,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {post.description}
            </p>
          )}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <time
              dateTime={post.publishedDate}
              style={{
                fontSize: 13,
                color: '#9ca3af',
              }}
            >
              {formattedDate}
            </time>
            {post.tags.length > 0 && (
              <div style={{ display: 'flex', gap: 6 }}>
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 11,
                      color: '#6e7494',
                      background: '#f5f7fa',
                      padding: '3px 8px',
                      borderRadius: 4,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
