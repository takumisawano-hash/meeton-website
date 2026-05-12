/**
 * Speed to Lead 可視 stat ブロック
 *
 * AI 検索 ("Speed to Lead 改善", "AI 商談 自動予約") で citation されやすい、
 * 数値とノウンを強調した自己完結型の段落。
 *
 * 数値はディレクショナル（業界一般）と Meeton ai の設計値のみを使用。
 * 顧客数・売上などの未検証数値は含めない。
 */
export default function SpeedToLeadBlock() {
  return (
    <section
      aria-labelledby="speed-to-lead"
      style={{
        maxWidth: 980,
        margin: '0 auto',
        padding: 'clamp(48px,8vw,80px) clamp(16px,5vw,48px)',
        background: '#fff',
        color: '#0f1128',
        fontFamily:
          "'Inter',system-ui,-apple-system,'Hiragino Kaku Gothic ProN','Yu Gothic UI',sans-serif",
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div
          style={{
            fontFamily:
              "'JetBrains Mono','SF Mono',Menlo,monospace",
            fontSize: 11,
            fontWeight: 700,
            color: '#0891b2',
            letterSpacing: 3,
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          Speed to Lead
        </div>
        <h2
          id="speed-to-lead"
          style={{
            fontSize: 'clamp(24px,4vw,36px)',
            fontWeight: 900,
            margin: 0,
            letterSpacing: '-0.02em',
            lineHeight: 1.25,
          }}
        >
          初動速度（Speed to Lead）を 5 秒以内に短縮する
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 20,
          marginBottom: 28,
        }}
      >
        <div
          style={{
            background: '#f8fafc',
            border: '1px solid #e8eaf2',
            borderRadius: 14,
            padding: 24,
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 12,
              fontWeight: 700,
              color: '#5b6080',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            業界一般の初動
          </div>
          <div
            style={{
              fontSize: 'clamp(28px,5vw,44px)',
              fontWeight: 900,
              color: '#0f1128',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            数時間〜数日
          </div>
          <p style={{ fontSize: 14, color: '#5b6080', marginTop: 12, lineHeight: 1.7 }}>
            人手による電話・メールフォロー。リード発生から最初の接触までに競合移行や
            温度感低下が起きやすい時間帯です。
          </p>
        </div>
        <div
          style={{
            background: 'linear-gradient(135deg,#eafff7 0%,#e0f4fc 100%)',
            border: '1px solid rgba(8,145,178,0.18)',
            borderRadius: 14,
            padding: 24,
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 12,
              fontWeight: 700,
              color: '#0891b2',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            Meeton ai の設計値
          </div>
          <div
            style={{
              fontSize: 'clamp(28px,5vw,44px)',
              fontWeight: 900,
              color: '#0891b2',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            5 秒以内
          </div>
          <p style={{ fontSize: 14, color: '#0f1128', marginTop: 12, lineHeight: 1.7 }}>
            AI SDR がリード発生の瞬間に起動し、AI 事前ヒアリングからカレンダー提示までを
            人間の介在なしで実行します。
          </p>
        </div>
      </div>

      <p
        style={{
          fontSize: 'clamp(15px,1.9vw,17px)',
          color: '#0f1128',
          lineHeight: 1.9,
          maxWidth: 760,
          margin: '0 auto',
          textAlign: 'left',
        }}
      >
        Speed to Lead（初動速度）は、リード発生から最初の有効接触までの時間を指す指標です。
        業界一般に初回対応は <strong>数時間〜数日</strong> かかるとされており、
        その間に他社への流出・温度感の低下・購買意思決定の停滞が発生しやすくなります。
        Meeton Calendar はリード発生の瞬間にトリガーを発火し、
        <strong>5 秒以内</strong> に AI が事前ヒアリングを開始。
        Google Calendar / TimeRex を参照して候補枠を提示し、
        その場で商談予約を確定します。初動速度の改善は商談化率に直接影響するため、
        マーケティング起点リードの取りこぼし削減に有効です。
      </p>
    </section>
  )
}
