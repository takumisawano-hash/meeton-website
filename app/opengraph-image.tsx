import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Meeton AI - ウェブサイトから商談を自動創出するAIセールスプラットフォーム'
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
          background: 'linear-gradient(135deg, #edfcf7 0%, #fff 30%, #f3f0ff 60%, #eaf0fe 100%)',
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
            backgroundImage: 'radial-gradient(circle, rgba(124,92,252,0.08) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
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
              background: 'linear-gradient(135deg, #12a37d, #3b6ff5)',
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
          <div style={{ fontSize: 64, fontWeight: 900, color: '#0f1128' }}>
            Meeton <span style={{ color: '#12a37d' }}>AI</span>
          </div>
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: '#4a506e',
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          ウェブサイト訪問者を商談に変える
          <br />
          AIセールスプラットフォーム
        </div>
        <div
          style={{
            marginTop: 48,
            display: 'flex',
            gap: 24,
          }}
        >
          {['リード獲得', 'スコアリング', '自動育成', '商談予約'].map((item) => (
            <div
              key={item}
              style={{
                background: 'white',
                border: '2px solid #dfe3f0',
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
