import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get('title') || ''
  const category = request.nextUrl.searchParams.get('category') || ''

  // タイトルの長さに応じてフォントサイズを調整
  const fontSize = title.length > 50 ? 40 : title.length > 30 ? 46 : 52

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(155deg, #0a0e1a 0%, #0f1128 35%, #151a38 65%, #0d1020 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* 装飾: グロー効果 */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -80,
            width: 450,
            height: 450,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(18,163,125,0.15) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -150,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,111,245,0.1) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* 装飾: アクセントライン (上部) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, #12a37d 0%, #3b6ff5 50%, #12a37d 100%)',
            display: 'flex',
          }}
        />

        {/* 装飾: 右側の縦ライン */}
        <div
          style={{
            position: 'absolute',
            top: 60,
            right: 60,
            bottom: 60,
            width: 3,
            background: 'linear-gradient(180deg, rgba(18,163,125,0.4) 0%, rgba(59,111,245,0.2) 50%, transparent 100%)',
            borderRadius: 4,
            display: 'flex',
          }}
        />

        {/* 装飾: ドット */}
        <div
          style={{
            position: 'absolute',
            top: 70,
            right: 80,
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#12a37d',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 180,
            right: 76,
            width: 12,
            height: 12,
            borderRadius: '50%',
            border: '2px solid rgba(59,111,245,0.4)',
            display: 'flex',
          }}
        />

        {/* メインコンテンツ */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '60px 80px 60px 70px',
            gap: 24,
            maxWidth: '90%',
          }}
        >
          {/* カテゴリバッジ */}
          {category && (
            <div style={{ display: 'flex' }}>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#12a37d',
                  background: 'rgba(18,163,125,0.12)',
                  border: '1px solid rgba(18,163,125,0.25)',
                  padding: '8px 20px',
                  borderRadius: 8,
                  letterSpacing: 0.5,
                }}
              >
                {category}
              </span>
            </div>
          )}

          {/* タイトル */}
          <h1
            style={{
              fontSize,
              fontWeight: 800,
              color: '#f0f2f8',
              lineHeight: 1.4,
              margin: 0,
              letterSpacing: -0.5,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}
          >
            {title}
          </h1>

          {/* 下部アクセント */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginTop: 8,
            }}
          >
            <div
              style={{
                width: 40,
                height: 3,
                background: 'linear-gradient(90deg, #12a37d, #0fc19a)',
                borderRadius: 4,
                display: 'flex',
              }}
            />
            <div
              style={{
                width: 20,
                height: 3,
                background: 'rgba(59,111,245,0.5)',
                borderRadius: 4,
                display: 'flex',
              }}
            />
            <div
              style={{
                width: 8,
                height: 3,
                background: 'rgba(59,111,245,0.3)',
                borderRadius: 4,
                display: 'flex',
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control': 'public, max-age=604800, s-maxage=604800, stale-while-revalidate=2592000',
      },
    }
  )
}
