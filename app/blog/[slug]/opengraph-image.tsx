import { ImageResponse } from 'next/og'
import { getPostBySlug } from '@/app/lib/notion'

export const runtime = 'edge'
export const alt = 'Meeton AI ブログ'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  const title = post?.title || 'ブログ記事'
  const category = post?.category || ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 60,
          background: 'linear-gradient(135deg, #0f1128 0%, #1a1a3e 50%, #0f1128 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Category badge */}
        {category && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: '#07CB79',
                background: 'rgba(7, 203, 121, 0.15)',
                padding: '12px 24px',
                borderRadius: 12,
              }}
            >
              {category}
            </span>
          </div>
        )}

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <h1
            style={{
              fontSize: title.length > 40 ? 48 : 56,
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.3,
              margin: 0,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {title}
          </h1>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            {/* Logo icon */}
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: '#07CB79',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 132 132" fill="none">
                <circle cx="66" cy="66" r="24" fill="white" />
              </svg>
            </div>
            <span
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: '#ffffff',
              }}
            >
              Meeton AI
            </span>
          </div>
          <span
            style={{
              fontSize: 20,
              color: '#7878a0',
            }}
          >
            dynameet.ai/blog
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
