"use client";

/**
 * Three-way comparison: Human SDR vs traditional chatbot vs Meeton ai.
 * Mirrors the pitch deck "Comparison" page (p.8).
 */

type Score = "yes" | "partial" | "no";

type Row = {
  label: string;
  human: Score;
  chatbot: Score;
  meeton: Score;
  humanNote?: string;
  chatbotNote?: string;
  meetonNote?: string;
  /** Highlight badge under the Meeton check (feature attribution) */
  meetonBadge?: string;
};

const ROWS: Row[] = [
  {
    label: "24 時間 365 日 稼働",
    human: "no",
    chatbot: "yes",
    meeton: "yes",
    humanNote: "営業時間のみ",
  },
  {
    label: "自律的にリードを判断",
    human: "yes",
    chatbot: "no",
    meeton: "yes",
    chatbotNote: "シナリオ通り",
  },
  {
    label: "ホットリードへ即時対応",
    human: "partial",
    chatbot: "yes",
    meeton: "yes",
    humanNote: "5 分以内が困難",
  },
  {
    label: "商談予約まで会話で完結",
    human: "yes",
    chatbot: "no",
    meeton: "yes",
  },
  {
    label: "事前ヒアリングで質を担保",
    human: "yes",
    chatbot: "no",
    meeton: "yes",
  },
  {
    label: "相手の関心に合う資料を自動提案",
    human: "partial",
    chatbot: "no",
    meeton: "yes",
    humanNote: "手動 / 属人的",
    meetonBadge: "AI Chat が閲覧から自動マッチング",
  },
  {
    label: "離脱リードへの自動フォロー",
    human: "no",
    chatbot: "no",
    meeton: "yes",
    humanNote: "44% が 1 回で諦める",
    meetonBadge: "AI Email が自動送信",
  },
  {
    label: "ページ文脈に応じた声かけ",
    human: "no",
    chatbot: "partial",
    meeton: "yes",
    chatbotNote: "URL ルールベース",
  },
  {
    label: "シナリオ設計が不要",
    human: "yes",
    chatbot: "no",
    meeton: "yes",
    chatbotNote: "工数膨大",
  },
  {
    label: "スケール (リード 10 倍でも同コスト)",
    human: "no",
    chatbot: "yes",
    meeton: "yes",
    humanNote: "増員が必須",
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
          チャットボットの<span style={{ color: "var(--accent)" }}>稼働量</span>を、両立
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
          Meeton ai は、人間 SDR の「自律的な判断」と従来チャットボットの「24 時間稼働」を兼ね備えた AI SDR プラットフォームです。
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
                <div className="comp-h-label">従来のチャットボット</div>
                <div className="comp-h-sub">シナリオ型・ルールベース</div>
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
                <div className="comp-cell" data-provider="従来チャットボット">
                  {ICON[r.chatbot]}
                  {r.chatbotNote && <div className="comp-note">{r.chatbotNote}</div>}
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
            gap: 14px;
          }
          .comp-row {
            display: flex;
            flex-direction: column;
            gap: 8px;
            background: #fafaf7;
            border: 1px solid #e4e3dd;
            border-radius: 16px;
            padding: 16px 14px;
          }
          .comp-row + .comp-row {
            border-top: 1px solid #e4e3dd;
          }
          .comp-head {
            display: none;
          }
          .comp-cell {
            padding: 10px 12px;
            text-align: left;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            gap: 12px;
            background: #ffffff;
            border: 1px solid #ececec;
            border-radius: 10px;
            flex-wrap: wrap;
          }
          .comp-cell::before {
            content: attr(data-provider);
            font-family: var(--fm), ui-monospace, monospace;
            font-size: 10px;
            font-weight: 800;
            color: #82897f;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            min-width: 88px;
            flex-shrink: 0;
          }
          .comp-label {
            background: transparent;
            border: none;
            padding: 0 4px 6px;
            font-size: 15px;
            font-weight: 800;
            color: #0f1128;
            text-align: left;
            align-items: flex-start !important;
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
