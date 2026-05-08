"use client";

/**
 * Three-way comparison: Human SDR vs MA/SFA vs Meeton ai.
 * 2026-05-08: Repositioned from "vs chatbot" to "vs MA/SFA"
 * to align with new positioning as AI SDR Platform that works
 * on top of MA/CRM (not a chatbot company).
 */

type Score = "yes" | "partial" | "no";

type Row = {
  label: string;
  human: Score;
  ma: Score;
  meeton: Score;
  humanNote?: string;
  maNote?: string;
  meetonNote?: string;
  /** Highlight badge under the Meeton check (feature attribution) */
  meetonBadge?: string;
};

const ROWS: Row[] = [
  {
    label: "Speed to Lead（リード対応速度）",
    human: "partial",
    ma: "partial",
    meeton: "yes",
    humanNote: "平均 42 時間",
    maNote: "数時間〜数日",
    meetonBadge: "5 秒",
  },
  {
    label: "24 時間 365 日 稼働",
    human: "no",
    ma: "partial",
    meeton: "yes",
    humanNote: "営業時間のみ",
    maNote: "配信のみ",
  },
  {
    label: "自律的にリードを判断",
    human: "yes",
    ma: "no",
    meeton: "yes",
    maNote: "ルール / シナリオ",
  },
  {
    label: "1:1 パーソナライズ",
    human: "yes",
    ma: "partial",
    meeton: "yes",
    humanNote: "属人化",
    maNote: "テンプレ + トークン",
    meetonBadge: "AI 動的生成",
  },
  {
    label: "返信対応",
    human: "yes",
    ma: "no",
    meeton: "yes",
    meetonBadge: "AI 自律対話",
  },
  {
    label: "商談予約までの完結",
    human: "yes",
    ma: "no",
    meeton: "yes",
    maNote: "別ツール必要",
  },
  {
    label: "目標達成までの持続性",
    human: "partial",
    ma: "no",
    meeton: "yes",
    humanNote: "限界あり",
    maNote: "ステップ完了で離脱",
    meetonBadge: "終了条件まで実行",
  },
  {
    label: "採用・育成・離職コスト",
    human: "no",
    ma: "yes",
    meeton: "yes",
    humanNote: "12 ヶ月で離職",
  },
  {
    label: "スケーラビリティ",
    human: "no",
    ma: "yes",
    meeton: "yes",
    humanNote: "採用に依存",
  },
];

const ICON: Record<Score, React.ReactNode> = {
  yes: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#10b981" opacity="0.18" />
      <path
        d="M8 12.5L11 15.5L16.5 9"
        stroke="#059669"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  partial: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#f59e0b" opacity="0.18" />
      <path d="M7 12h10" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  no: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#ef4444" opacity="0.14" />
      <path
        d="M8 8L16 16M16 8L8 16"
        stroke="#dc2626"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  ),
};

export default function ComparisonTable() {
  return (
    <section
      className="section"
      style={{
        background: "#ffffff",
      }}
    >
      <div className="section-inner">
        <div className="slabel" style={{ textAlign: "center" }}>
          Comparison
        </div>
        <div
          className="stitle comp-stitle"
          style={{ textAlign: "center", wordBreak: "keep-all", overflowWrap: "anywhere" }}
        >
          人間 SDR の<span style={{ color: "var(--cta)" }}>判断力</span>と
          MA / SFA の<span style={{ color: "var(--accent)" }}>スケール</span>を、両立
        </div>
        <p
          className="ssub"
          style={{
            textAlign: "center",
            margin: "0 auto",
            maxWidth: 720,
            wordBreak: "keep-all",
            overflowWrap: "anywhere",
          }}
        >
          Meeton ai は、人間 SDR の「自律的な判断」と MA / SFA の「24 時間スケール」を兼ね備えた AI SDR プラットフォームです。MA や CRM を置き換えるのではなく、その上で動く補完プロダクトです。
        </p>

        <div className="comp-wrap">
          <div className="comp-table">
            <div className="comp-row comp-head">
              <div className="comp-cell comp-label" />
              <div className="comp-cell">
                <div className="comp-h-label">人間 SDR</div>
                <div className="comp-h-sub">採用 / 育成 / 離職</div>
              </div>
              <div className="comp-cell">
                <div className="comp-h-label">MA / SFA</div>
                <div className="comp-h-sub">Marketo / HubSpot / Salesforce</div>
              </div>
              <div className="comp-cell comp-h-meeton">
                <div className="comp-h-label">
                  <span className="comp-pill">Meeton ai</span>
                </div>
                <div className="comp-h-sub" style={{ color: "var(--cta)" }}>
                  AI SDR
                </div>
              </div>
            </div>

            {ROWS.map((r, i) => (
              <div className="comp-row" key={i}>
                <div className="comp-cell comp-label">{r.label}</div>
                <div className="comp-cell" data-provider="人間 SDR">
                  {ICON[r.human]}
                  {r.humanNote && <div className="comp-note">{r.humanNote}</div>}
                </div>
                <div className="comp-cell" data-provider="MA / SFA">
                  {ICON[r.ma]}
                  {r.maNote && <div className="comp-note">{r.maNote}</div>}
                </div>
                <div className="comp-cell comp-meeton" data-provider="Meeton ai">
                  {ICON[r.meeton]}
                  {r.meetonBadge && (
                    <div className="comp-badge">{r.meetonBadge}</div>
                  )}
                  {r.meetonNote && <div className="comp-note">{r.meetonNote}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .comp-wrap {
          margin-top: clamp(32px, 5vw, 56px);
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .comp-table {
          min-width: 720px;
          background: #fafaf7;
          border: 1px solid #e4e3dd;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 12px 40px -20px rgba(15, 17, 40, 0.12);
        }
        .comp-row {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1fr;
          align-items: center;
        }
        .comp-row + .comp-row {
          border-top: 1px solid #ececec;
        }
        .comp-head {
          background: #ffffff;
          border-bottom: 2px solid #e4e3dd;
        }
        .comp-cell {
          padding: 16px 20px;
          text-align: center;
          font-size: 13px;
          color: #3d4541;
          line-height: 1.5;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .comp-label {
          text-align: left;
          align-items: flex-start !important;
          font-weight: 700;
          color: #0f1128;
          font-size: 14px;
          line-height: 1.5;
        }
        .comp-h-label {
          font-weight: 800;
          font-size: 15px;
          color: #0f1128;
        }
        .comp-h-sub {
          font-size: 11px;
          color: #82897f;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .comp-pill {
          display: inline-block;
          background: linear-gradient(135deg, #12a37d, #0fc19a);
          color: #fff;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 800;
        }
        .comp-meeton {
          background: linear-gradient(180deg, rgba(18, 163, 125, 0.06), rgba(18, 163, 125, 0.02));
        }
        .comp-h-meeton {
          background: linear-gradient(180deg, rgba(18, 163, 125, 0.08), rgba(18, 163, 125, 0));
          position: relative;
        }
        .comp-note {
          font-size: 10px;
          color: #82897f;
          line-height: 1.3;
        }
        .comp-badge {
          margin-top: 6px;
          display: inline-block;
          padding: 4px 10px;
          font-size: 10.5px;
          font-weight: 800;
          color: #065f46;
          background: linear-gradient(135deg, rgba(18, 163, 125, 0.18), rgba(18, 163, 125, 0.08));
          border: 1px solid rgba(18, 163, 125, 0.28);
          border-radius: 999px;
          letter-spacing: 0.02em;
          line-height: 1.2;
          white-space: nowrap;
        }
        /* Mobile: stack each row as a card with per-provider sub-rows */
        @media (max-width: 760px) {
          .comp-wrap {
            overflow-x: visible;
          }
          .comp-table {
            min-width: 0;
            background: transparent;
            border: none;
            box-shadow: none;
            border-radius: 0;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .comp-row {
            display: flex;
            flex-direction: column;
            gap: 5px;
            background: #fafaf7;
            border: 1px solid #e4e3dd;
            border-radius: 12px;
            padding: 12px 11px;
          }
          .comp-row + .comp-row {
            border-top: 1px solid #e4e3dd;
          }
          .comp-head {
            display: none;
          }
          .comp-cell {
            padding: 6px 10px;
            text-align: left;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            gap: 10px;
            background: #ffffff;
            border: 1px solid #ececec;
            border-radius: 8px;
            flex-wrap: wrap;
            min-height: 0;
          }
          .comp-cell::before {
            content: attr(data-provider);
            font-family: var(--fm), ui-monospace, monospace;
            font-size: 10px;
            font-weight: 800;
            color: #82897f;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            min-width: 78px;
            flex-shrink: 0;
          }
          .comp-label {
            background: transparent;
            border: none;
            padding: 0 4px 4px;
            font-size: 14px;
            font-weight: 800;
            color: #0f1128;
            text-align: left;
            align-items: flex-start !important;
            line-height: 1.4;
          }
          .comp-label::before {
            content: none;
          }
          .comp-meeton {
            background: linear-gradient(180deg, rgba(18, 163, 125, 0.06), rgba(18, 163, 125, 0.02));
            border-color: rgba(18, 163, 125, 0.25);
          }
          .comp-meeton::before {
            color: #065f46;
          }
          .comp-note {
            margin-left: auto;
            font-size: 11px;
            text-align: right;
          }
          .comp-badge {
            margin-top: 0;
            margin-left: auto;
            white-space: normal;
          }
        }
      `}</style>
    </section>
  );
}
