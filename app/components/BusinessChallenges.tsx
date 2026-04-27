"use client";

/**
 * "BtoB営業の現実" — challenge section that creates urgency before the AI SDR pitch.
 * Mirrors pitch deck p.2.
 */

const CHALLENGES = [
  {
    no: "❶",
    label: "初動の遅さ",
    big: "4倍",
    bigSub: "アポ獲得率の差",
    detail: "問い合わせから5分以内に対応できるかどうかで、アポ獲得率は4倍変わる。多くの企業は翌営業日以降の対応となり、比較検討中のリードを競合に取られている。",
    note: "5分以内 vs 10分以内",
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fecaca",
  },
  {
    no: "❷",
    label: "フォローアップ不足",
    big: "44%",
    bigSub: "が 1 回連絡で諦める",
    detail: "営業の44%は1回フォローして反応がなければ諦める。だが成約の80%は5回以上のフォロー後に発生する。3〜5回の継続フォローを人手で回しきれず、機会の大半を取りこぼしている。",
    note: "成約の 80% は 5 回以上のフォロー後",
    color: "#ea580c",
    bg: "#fff7ed",
    border: "#fed7aa",
  },
  {
    no: "❸",
    label: "優先順位付けの限界",
    big: "39%",
    bigSub: "が「スコアリング困難」",
    detail: "BtoB企業の39%が「リードの優先順位付け」に、50%が「営業リソース不足」に苦戦。SDR はどのリードに動くべきか判断できず、ホットな瞬間を逃している。",
    note: "50% が「リソース不足」",
    color: "#7c2d12",
    bg: "#fefce8",
    border: "#fde68a",
  },
];

export default function BusinessChallenges() {
  return (
    <section
      className="section"
      style={{
        background: "linear-gradient(180deg, #fafaf7 0%, #f3f2ed 100%)",
        position: "relative",
      }}
    >
      <div className="section-inner">
        <div
          className="slabel"
          style={{ textAlign: "center", color: "#dc2626" }}
        >
          Challenge
        </div>
        <div className="stitle" style={{ textAlign: "center" }}>
          BtoB 営業の<span style={{ color: "#dc2626" }}>現実</span>
        </div>
        <p
          className="ssub"
          style={{
            textAlign: "center",
            margin: "0 auto",
            maxWidth: 720,
          }}
        >
          「リードはあるのに、商談にならない」 ── その背景には、3 つの構造的な課題があります。
        </p>

        {/* big headline stat */}
        <div className="bc-headline">
          <div className="bc-headline-stat">
            <span className="bc-headline-num">85%</span>
            <span className="bc-headline-suffix">以上</span>
          </div>
          <div className="bc-headline-text">
            のリードは、商談につながらないまま消えていく
          </div>
          <div className="bc-headline-sub">
            BtoB のインサイドセールスにおける商談化率の平均は{" "}
            <strong>5〜15%</strong>。獲得したリードの大半が、商談にすら届かない。
          </div>
        </div>

        {/* 3 challenges */}
        <div className="bc-grid">
          {CHALLENGES.map((c, i) => (
            <div
              key={i}
              className="bc-card"
              style={
                {
                  background: c.bg,
                  border: `1px solid ${c.border}`,
                } as React.CSSProperties
              }
            >
              <div
                className="bc-no"
                style={{ color: c.color, opacity: 0.9 }}
              >
                {c.no}
              </div>
              <div className="bc-label" style={{ color: c.color }}>
                {c.label}
              </div>
              <div className="bc-big" style={{ color: c.color }}>
                {c.big}
                <span className="bc-big-sub">{c.bigSub}</span>
              </div>
              <p className="bc-detail">{c.detail}</p>
              <div className="bc-note" style={{ color: c.color }}>
                {c.note}
              </div>
            </div>
          ))}
        </div>

        <div className="bc-source">
          出典：SalesGrid (2025) / Lead Response Management Study / Brevet Group / ラクス 2025年9月調査
        </div>
      </div>

      <style jsx>{`
        .bc-headline {
          margin: clamp(36px, 5vw, 56px) auto 0;
          max-width: 760px;
          text-align: center;
          padding: clamp(28px, 4vw, 40px);
          background: #fff;
          border: 1px solid #e4e3dd;
          border-radius: 24px;
          box-shadow: 0 12px 40px -20px rgba(15, 17, 40, 0.08);
        }
        .bc-headline-stat {
          display: inline-flex;
          align-items: baseline;
          gap: 6px;
        }
        .bc-headline-num {
          font-family: var(--fm), ui-monospace, monospace;
          font-size: clamp(72px, 12vw, 120px);
          font-weight: 900;
          color: #dc2626;
          letter-spacing: -0.04em;
          line-height: 1;
          background: linear-gradient(135deg, #dc2626, #ea580c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .bc-headline-suffix {
          font-size: clamp(20px, 3vw, 32px);
          font-weight: 800;
          color: #dc2626;
        }
        .bc-headline-text {
          font-size: clamp(18px, 2.5vw, 24px);
          font-weight: 800;
          color: #0f1128;
          margin-top: 8px;
          line-height: 1.4;
        }
        .bc-headline-sub {
          font-size: 14px;
          color: #6e7494;
          margin-top: 12px;
          line-height: 1.7;
        }
        .bc-grid {
          margin-top: clamp(40px, 6vw, 64px);
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
          gap: 20px;
        }
        .bc-card {
          padding: clamp(24px, 3vw, 32px);
          border-radius: 20px;
          position: relative;
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .bc-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 40px -20px rgba(15, 17, 40, 0.12);
        }
        .bc-no {
          font-size: 26px;
          line-height: 1;
          margin-bottom: 8px;
        }
        .bc-label {
          font-family: var(--fm), ui-monospace, monospace;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .bc-big {
          font-family: var(--fm), ui-monospace, monospace;
          font-size: clamp(48px, 7vw, 64px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 4px;
          display: flex;
          align-items: baseline;
          gap: 10px;
          flex-wrap: wrap;
        }
        .bc-big-sub {
          font-size: 13px;
          font-weight: 700;
          color: #3d4541;
          letter-spacing: 0;
          text-transform: none;
        }
        .bc-detail {
          margin: 16px 0 12px;
          font-size: 13px;
          line-height: 1.75;
          color: #3d4541;
        }
        .bc-note {
          font-family: var(--fm), ui-monospace, monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding-top: 12px;
          border-top: 1px dashed currentColor;
          opacity: 0.8;
        }
        .bc-source {
          margin-top: 32px;
          font-size: 11px;
          color: #82897f;
          text-align: center;
          letter-spacing: 0.02em;
        }
      `}</style>
    </section>
  );
}
