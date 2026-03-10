import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'On-Site Channels - Meeton AIのサイト内チャネル機能'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 25%, #a7f3d0 50%, #6ee7b7 75%, #34d399 100%)',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle, rgba(5,150,105,0.08) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              background: 'linear-gradient(135deg, #059669, #10b981)',
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 48,
              fontWeight: 900,
            }}
          >
            M
          </div>
          <div style={{ fontSize: 64, fontWeight: 900, color: '#111827' }}>
            Meeton <span style={{ color: '#059669' }}>On-Site</span>
          </div>
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: '#374151',
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          サイト内チャネル
        </div>
        <div
          style={{
            marginTop: 48,
            display: 'flex',
            gap: 24,
          }}
        >
          {['資料ページ', 'サンクスページ', 'ポップアップ'].map((item) => (
            <div
              key={item}
              style={{
                background: 'white',
                border: '2px solid #a7f3d0',
                borderRadius: 12,
                padding: '12px 24px',
                fontSize: 20,
                fontWeight: 700,
                color: '#059669',
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
