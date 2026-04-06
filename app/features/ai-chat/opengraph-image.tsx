import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'AI Chat - Meeton AIのAIチャット機能'
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
          background: 'linear-gradient(135deg, #edfcf7 0%, #fff 35%, #e5f8f2 65%, #edfcf7 100%)',
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
            backgroundImage: 'radial-gradient(circle, rgba(18,163,125,0.06) 1px, transparent 1px)',
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
              background: 'linear-gradient(135deg, #12a37d, #0fc19a)',
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
            <span style={{ color: '#12a37d' }}>AI Chat</span>
          </div>
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: '#64748b',
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          AIチャットで商談予約まで完結
        </div>
        <div
          style={{
            marginTop: 48,
            display: 'flex',
            gap: 24,
          }}
        >
          {['自動声かけ', 'ニーズ把握', '資料提案', '商談予約'].map((item) => (
            <div
              key={item}
              style={{
                background: 'white',
                border: '2px solid #a7f3d0',
                borderRadius: 12,
                padding: '12px 24px',
                fontSize: 20,
                fontWeight: 700,
                color: '#12a37d',
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
