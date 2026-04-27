"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated pipeline of the Meeton ai system.
 *
 * Design principles:
 * - Light background that matches the rest of the site (no jarring dark section).
 * - Five equal-sized stage cards in a clean horizontal pipeline (Visitor → Chat → Calendar → Deal),
 *   plus an Email "rescue lane" tucked beneath Calendar with a clear loop-back arrow.
 * - Self-running particle animation: leads continuously stream left→right; some divert
 *   down to Email and loop back to Calendar.
 * - Mobile: vertical stack with simpler animation.
 */

const C = {
  visitor: "#64748b",
  chat: "#12a37d",
  calendar: "#0891b2",
  email: "#7c5cfc",
  win: "#10b981",
};

type StageProps = {
  no?: string;
  label: string;
  title: string;
  sub: string;
  color: string;
  icon: React.ReactNode;
  primary?: boolean;
};

const ICONS = {
  user: (
    <path d="M12 12a4 4 0 100-8 4 4 0 000 8z M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
  ),
  chat: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />,
  calendar: (
    <path d="M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
  ),
  mail: (
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" />
  ),
  check: <path d="M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3" />,
};

export default function HowItWorksFlow() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className="section"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #f8faff 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(124,92,252,.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
          opacity: 0.6,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          top: "-200px",
          left: "50%",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(circle, rgba(18,163,125,.08) 0%, transparent 60%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      <div
        ref={wrapRef}
        className="section-inner"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div className="slabel" style={{ textAlign: "center" }}>
          How It Works
        </div>
        <div className="stitle" style={{ textAlign: "center" }}>
          AI SDR が営業フロー全体を{" "}
          <span style={{ color: "var(--cta)" }}>自動化</span>する
        </div>
        <p
          className="ssub"
          style={{ textAlign: "center", margin: "0 auto", maxWidth: 720 }}
        >
          3 つの AI 機能（Chat / Calendar / Email）が連動し、リード発見から商談獲得まで 24 時間 365 日、一気通貫で実行します。
        </p>

        <FlowDiagram inView={inView} />
      </div>
    </section>
  );
}

function FlowDiagram({ inView }: { inView: boolean }) {
  return (
    <div className="flow-wrap">
      {/* Desktop: horizontal pipeline + Email rescue lane below */}
      <div className="flow-desktop">
        <FlowSVG inView={inView} />
        <div className="flow-row flow-main">
          <Stage
            label="STEP 0"
            title="Web 訪問者"
            sub="あらゆる入口・あらゆる時間"
            color={C.visitor}
            icon={ICONS.user}
          />
          <Stage
            no="①"
            label="AI CHAT"
            title="対話・関心醸成"
            sub="自動声かけ + 資料提案 内蔵"
            color={C.chat}
            icon={ICONS.chat}
            primary
          />
          <Stage
            no="②"
            label="AI CALENDAR"
            title="商談予約まで完結"
            sub="事前ヒアリング + CRM 自動登録"
            color={C.calendar}
            icon={ICONS.calendar}
            primary
          />
          <Stage
            label="OUTCOME"
            title="商談獲得 ✓"
            sub="サイト内 / メールから復活で完結"
            color={C.win}
            icon={ICONS.check}
          />
        </div>

        <div className="flow-rescue">
          <div className="flow-rescue-stage">
            <Stage
              no="③"
              label="AI EMAIL"
              title="離脱リードを取り戻す"
              sub="行動シグナルから自動再接触"
              color={C.email}
              icon={ICONS.mail}
              primary
            />
          </div>
          <div className="flow-rescue-cap">
            離脱しても自動で復活 → ② に戻り商談獲得
          </div>
        </div>
      </div>

      {/* Mobile: vertical */}
      <div className="flow-mobile">
        {[
          {
            label: "STEP 0",
            title: "Web 訪問者",
            sub: "あらゆる入口・あらゆる時間",
            color: C.visitor,
            icon: ICONS.user,
          },
          {
            no: "①",
            label: "AI CHAT",
            title: "対話・関心醸成",
            sub: "自動声かけ + 資料提案 内蔵",
            color: C.chat,
            icon: ICONS.chat,
            primary: true,
          },
          {
            no: "②",
            label: "AI CALENDAR",
            title: "商談予約まで完結",
            sub: "事前ヒアリング + CRM 自動登録",
            color: C.calendar,
            icon: ICONS.calendar,
            primary: true,
          },
          {
            no: "③",
            label: "AI EMAIL",
            title: "離脱リードを取り戻す",
            sub: "自動再接触 → ② に戻る",
            color: C.email,
            icon: ICONS.mail,
            primary: true,
          },
          {
            label: "OUTCOME",
            title: "商談獲得 ✓",
            sub: "24/7 自動で積み上がる",
            color: C.win,
            icon: ICONS.check,
          },
        ].map((s, i, arr) => (
          <div key={i} className="flow-mobile-row">
            <Stage {...s} />
            {i < arr.length - 1 && (
              <div className="flow-mobile-arrow">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
                  <path
                    d="M12 4v16M5 13l7 7 7-7"
                    stroke="#cbd5e1"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .flow-wrap {
          margin-top: clamp(40px, 6vw, 72px);
          position: relative;
        }
        .flow-desktop {
          position: relative;
          max-width: 1080px;
          margin: 0 auto;
        }
        .flow-mobile {
          display: none;
          max-width: 480px;
          margin: 0 auto;
        }
        .flow-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 22px;
          position: relative;
          z-index: 2;
        }
        .flow-main {
          margin-bottom: 36px;
        }
        .flow-rescue {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 22px;
          align-items: start;
        }
        .flow-rescue-stage {
          grid-column: 3 / 4;
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
        .flow-rescue-cap {
          grid-column: 3 / 4;
          font-family: var(--fm), ui-monospace, monospace;
          font-size: 11px;
          font-weight: 700;
          color: ${C.email};
          letter-spacing: 0.05em;
          padding: 6px 14px;
          background: rgba(124, 92, 252, 0.08);
          border-radius: 999px;
          align-self: start;
          justify-self: center;
          margin-top: 12px;
          white-space: nowrap;
        }

        @media (max-width: 880px) {
          .flow-desktop {
            display: none !important;
          }
          .flow-mobile {
            display: block !important;
          }
        }

        .flow-mobile-row {
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
        .flow-mobile-arrow {
          padding: 6px 0;
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}

function Stage({
  no,
  label,
  title,
  sub,
  color,
  icon,
  primary = false,
}: StageProps) {
  return (
    <div
      className="flow-stage"
      style={
        {
          background: "#fff",
          border: `1px solid ${primary ? color + "40" : "#e4e3dd"}`,
          borderRadius: 18,
          padding: "20px 18px",
          boxShadow: primary
            ? `0 12px 32px -16px ${color}44, 0 0 0 1px ${color}10 inset`
            : "0 4px 16px -8px rgba(15,17,40,0.08)",
          textAlign: "center",
          minHeight: 168,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          position: "relative",
        } as React.CSSProperties
      }
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: primary
            ? `linear-gradient(135deg, ${color}, ${color}cc)`
            : `${color}14`,
          color: primary ? "#fff" : color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 12,
          boxShadow: primary ? `0 8px 20px -8px ${color}80` : "none",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {icon}
        </svg>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 6,
        }}
      >
        {no && (
          <span
            style={{
              fontFamily: "var(--fm), ui-monospace, monospace",
              fontSize: 13,
              fontWeight: 900,
              color: color,
              letterSpacing: "-0.02em",
            }}
          >
            {no}
          </span>
        )}
        <span
          style={{
            fontFamily: "var(--fm), ui-monospace, monospace",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.1em",
            color: color,
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
      </div>
      <div
        style={{
          fontWeight: 800,
          fontSize: 14,
          color: "#0f1128",
          lineHeight: 1.4,
          marginBottom: 4,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 11,
          color: "#6e7494",
          lineHeight: 1.55,
        }}
      >
        {sub}
      </div>
    </div>
  );
}

function FlowSVG({ inView }: { inView: boolean }) {
  // Single SVG over the desktop layout to draw connector lines + particles.
  // viewBox: 1080 wide × 460 tall.
  // 4 columns over 1080 with gap 22: col_w=253.5 → centers ≈ 127, 402, 678, 953.
  // Main row card height 168 → vertical center 84. Bottom 168.
  // Rescue card: column 3 (center 678), top ~204, bottom ~372, center ~288. (offset = main + 36 gap)
  // Caption pill below ≈ y 384–420.

  const dur = inView ? "3.5s" : "999s";
  const dur2 = inView ? "4.2s" : "999s";

  return (
    <svg
      viewBox="0 0 1080 460"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
      aria-hidden
    >
      <defs>
        <linearGradient id="flow-line-1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={C.visitor} stopOpacity="0.4" />
          <stop offset="100%" stopColor={C.chat} stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="flow-line-2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={C.chat} stopOpacity="0.5" />
          <stop offset="100%" stopColor={C.calendar} stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="flow-line-3" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={C.calendar} stopOpacity="0.6" />
          <stop offset="100%" stopColor={C.win} stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="flow-line-down" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.calendar} stopOpacity="0.5" />
          <stop offset="100%" stopColor={C.email} stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="flow-line-up" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={C.email} stopOpacity="0.7" />
          <stop offset="100%" stopColor={C.calendar} stopOpacity="0.5" />
        </linearGradient>

        {/* Main row connectors (right edge → left edge of next) */}
        <path id="fp-1" d="M 252 84 H 277" fill="none" />
        <path id="fp-2" d="M 527 84 H 552" fill="none" />
        <path id="fp-3" d="M 803 84 H 828" fill="none" />
        {/* Calendar (col2, x=402) bottom → Email (col3, x=678) top via diagonal */}
        <path id="fp-down" d="M 478 168 L 658 204" fill="none" />
        {/* Email top-right (x≈740) curved back up to Calendar right (x≈527) */}
        <path
          id="fp-loop"
          d="M 678 204 C 660 130, 580 90, 527 84"
          fill="none"
        />
      </defs>

      {/* Connector strokes (animated dashed) */}
      <g
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        style={{
          strokeDasharray: "6 8",
          animation: inView ? "flowDashHIW 1.4s linear infinite" : "none",
        }}
      >
        <use href="#fp-1" stroke="url(#flow-line-1)" />
        <use href="#fp-2" stroke="url(#flow-line-2)" />
        <use href="#fp-3" stroke="url(#flow-line-3)" />
        <use href="#fp-down" stroke="url(#flow-line-down)" strokeWidth="2" />
        <use
          href="#fp-loop"
          stroke="url(#flow-line-up)"
          strokeWidth="1.8"
          strokeDasharray="4 5"
        />
      </g>

      {/* Arrowheads */}
      <Arrow x={277} y={84} dir="right" color={C.chat} />
      <Arrow x={552} y={84} dir="right" color={C.calendar} />
      <Arrow x={828} y={84} dir="right" color={C.win} />
      <Arrow x={658} y={204} dir="down-right" color={C.email} />
      <Arrow x={527} y={84} dir="left" color={C.calendar} />

      {/* Particles */}
      <Particle path="#fp-1" dur={dur} color={C.chat} />
      <Particle path="#fp-1" dur={dur} delay="1.1s" color={C.chat} />
      <Particle path="#fp-2" dur={dur} delay="0.4s" color={C.calendar} />
      <Particle path="#fp-2" dur={dur} delay="1.6s" color={C.calendar} />
      <Particle path="#fp-3" dur={dur} delay="0.8s" color={C.win} big />
      <Particle path="#fp-3" dur={dur} delay="2.0s" color={C.win} big />
      <Particle path="#fp-down" dur={dur2} delay="1.4s" color={C.email} />
      <Particle path="#fp-loop" dur={dur2} delay="2.6s" color={C.email} />

      <style>{`
        @keyframes flowDashHIW {
          to { stroke-dashoffset: -28; }
        }
      `}</style>
    </svg>
  );
}

function Arrow({
  x,
  y,
  dir,
  color,
}: {
  x: number;
  y: number;
  dir: "right" | "down" | "down-right" | "left";
  color: string;
}) {
  let points: string;
  if (dir === "right") {
    points = `${x - 6},${y - 4} ${x},${y} ${x - 6},${y + 4}`;
  } else if (dir === "down") {
    points = `${x - 4},${y - 6} ${x},${y} ${x + 4},${y - 6}`;
  } else if (dir === "left") {
    points = `${x + 6},${y - 4} ${x},${y} ${x + 6},${y + 4}`;
  } else {
    // down-right diagonal arrow
    points = `${x - 6},${y - 2} ${x},${y} ${x - 2},${y - 6}`;
  }
  return (
    <polyline
      points={points}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.8"
    />
  );
}

function Particle({
  path,
  dur,
  delay = "0s",
  color,
  big = false,
}: {
  path: string;
  dur: string;
  delay?: string;
  color: string;
  big?: boolean;
}) {
  return (
    <circle
      r={big ? 4.5 : 3.2}
      fill={color}
      opacity={0.95}
      style={{
        filter: `drop-shadow(0 0 6px ${color}aa)`,
      }}
    >
      <animateMotion dur={dur} repeatCount="indefinite" begin={delay}>
        <mpath href={path} />
      </animateMotion>
    </circle>
  );
}
