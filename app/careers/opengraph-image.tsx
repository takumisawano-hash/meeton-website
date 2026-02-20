import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = '採用情報 - DynaMeet K.K.'
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
          background: 'linear-gradient(135deg, #0a0a12 0%, #12121e 50%, #0a0a12 100%)',
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
            backgroundImage: 'radial-gradient(circle, rgba(120,120,160,0.06) 1px, transparent 1px)',
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
            D
          </div>
          <div style={{ fontSize: 64, fontWeight: 900, color: '#eeeef6' }}>
            DynaMeet
          </div>
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            background: 'linear-gradient(135deg, #12a37d, #3b6ff5)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 24,
          }}
        >
          We are Hiring
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: '#7878a0',
            textAlign: 'center',
          }}
        >
          AIで営業のあたりまえを変える
        </div>
        <div
          style={{
            marginTop: 48,
            display: 'flex',
            gap: 16,
          }}
        >
          {['CS', 'Sales', 'Engineering', 'Design'].map((item) => (
            <div
              key={item}
              style={{
                background: '#1a1a2e',
                border: '1px solid #2a2a44',
                borderRadius: 10,
                padding: '10px 20px',
                fontSize: 18,
                fontWeight: 700,
                color: '#a8a8c8',
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
