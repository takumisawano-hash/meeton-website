import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Meeton Talent - 採用サイト訪問者を面談に変えるAIリクルーター'
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
          background: 'linear-gradient(135deg, #eff6ff 0%, #fff 35%, #f5f3ff 65%, #fffbeb 100%)',
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
            backgroundImage: 'radial-gradient(circle, rgba(37,99,235,0.05) 1px, transparent 1px)',
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
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
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
            Meeton <span style={{ color: '#2563eb' }}>Talent</span>
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
          採用サイト訪問者を面談に変える
          <br />
          AIリクルーター
        </div>
        <div
          style={{
            marginTop: 48,
            display: 'flex',
            gap: 24,
          }}
        >
          {['候補者獲得', '志望度判定', 'AI育成', '面談予約'].map((item) => (
            <div
              key={item}
              style={{
                background: 'white',
                border: '2px solid #e2e6f0',
                borderRadius: 12,
                padding: '12px 24px',
                fontSize: 20,
                fontWeight: 700,
                color: '#2563eb',
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
