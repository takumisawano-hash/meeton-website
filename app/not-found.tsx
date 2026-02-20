import Link from 'next/link'

export default function NotFound() {
  return (
    <html lang="ja">
      <body style={{ margin: 0, padding: 0, fontFamily: "'Noto Sans JP', sans-serif" }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(170deg, #eff6ff 0%, #fff 35%, #f5f3ff 65%, #fffbeb 100%)',
            padding: '48px 24px',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: 480 }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 120,
                fontWeight: 800,
                background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1,
                marginBottom: 24,
              }}
            >
              404
            </div>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: '#111827',
                marginBottom: 16,
              }}
            >
              ページが見つかりません
            </h1>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.8,
                color: '#64748b',
                marginBottom: 32,
              }}
            >
              お探しのページは移動または削除された可能性があります。
              <br />
              URLをご確認いただくか、トップページからお探しください。
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                  color: '#fff',
                  padding: '14px 28px',
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(37,99,235,.22)',
                }}
              >
                ← トップページへ
              </Link>
              <Link
                href="/careers/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'transparent',
                  color: '#111827',
                  padding: '14px 28px',
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 700,
                  textDecoration: 'none',
                  border: '2px solid #cdd3e2',
                }}
              >
                採用情報を見る
              </Link>
            </div>
            <div
              style={{
                marginTop: 48,
                paddingTop: 32,
                borderTop: '1px solid #e2e6f0',
              }}
            >
              <p style={{ fontSize: 13, color: '#94a3b8' }}>
                お探しのページについてご不明な点がございましたら、
                <br />
                お気軽にお問い合わせください。
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
