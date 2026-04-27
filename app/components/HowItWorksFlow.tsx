"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated flow diagram of the Meeton ai pipeline.
 *
 * Visitor → AI Chat (with Offer built-in) / Thanks Page → AI Calendar → ✓ Deal
 *                                                            ↓ drop-off
 *                                                        AI Email → loops back to Calendar
 *
 * Self-running infinite animation. Particles continuously stream through the
 * pipeline; each stage card has a subtle pulse synchronized to particle arrival.
 */

const COLORS = {
  chat: "#12a37d",
  calendar: "#0891b2",
  email: "#7c5cfc",
  visitor: "#64748b",
  win: "#10b981",
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
        position: "relative",
        background: "linear-gradient(180deg,#0a0e0c 0%,#0f1727 100%)",
        color: "#f5f5f2",
        overflow: "hidden",
      }}
    >
      {/* subtle grid bg */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }}
      />
      {/* glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          top: -150,
          left: "50%",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(circle, rgba(18,163,125,.18) 0%, transparent 60%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div
        ref={wrapRef}
        className="section-inner"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div
          className="slabel"
          style={{ textAlign: "center", color: "#6fe3b2" }}
        >
          How It Works
        </div>
        <div
          className="stitle"
          style={{ textAlign: "center", color: "#f5f5f2" }}
        >
          AI SDR が営業フロー全体を{" "}
          <span style={{ color: "#6fe3b2" }}>自動化</span>する
        </div>
        <p
          className="ssub"
          style={{
            textAlign: "center",
            margin: "0 auto",
            color: "rgba(245,245,242,0.72)",
            maxWidth: 720,
          }}
        >
          3 つの AI 機能（Chat / Calendar / Email）が、リード発見から商談獲得までを
          24 時間 365 日、一気通貫で実行します。
        </p>

        <FlowDiagram inView={inView} />
      </div>

      <style jsx>{`
        @keyframes pulseStage {
          0%,
          100% {
            box-shadow: 0 0 0 0 var(--pulse-color);
          }
          50% {
            box-shadow: 0 0 0 12px rgba(0, 0, 0, 0);
          }
        }
        @keyframes flowDash {
          to {
            stroke-dashoffset: -32;
          }
        }
      `}</style>
    </section>
  );
}

function FlowDiagram({ inView }: { inView: boolean }) {
  return (
    <div
      style={{
        marginTop: "clamp(40px,6vw,72px)",
        position: "relative",
      }}
    >
      {/* Desktop layout — uses absolute positioning over an SVG */}
      <div className="how-flow-desktop" style={desktopWrap}>
        <FlowSVG inView={inView} />
        <div style={{ ...stageStyle, ...stageVisitor }}>
          <StageCard
            tone="muted"
            label="STEP 0"
            title="Website 訪問者"
            sub="あらゆる入口"
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 12a4 4 0 100-8 4 4 0 000 8z M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </div>
        <div style={{ ...stageStyle, ...stageThanks }}>
          <StageCard
            tone="muted"
            label="ENTRY"
            title="サンクスページ"
            sub="フォーム送信直後"
            small
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </div>
        <div style={{ ...stageStyle, ...stageChat }}>
          <StageCard
            tone="chat"
            label="① AI CHAT"
            title="対話・関心醸成"
            sub="自動声かけ・資料提案 内蔵・温度感判定"
            icon={
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </div>
        <div style={{ ...stageStyle, ...stageCal }}>
          <StageCard
            tone="calendar"
            label="② AI CALENDAR"
            title="商談予約まで完結"
            sub="事前ヒアリング + CRM 自動登録"
            icon={
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </div>
        <div style={{ ...stageStyle, ...stageEmail }}>
          <StageCard
            tone="email"
            label="③ AI EMAIL"
            title="離脱リードを自動で取り戻す"
            sub="行動シグナルから再アプローチ"
            icon={
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </div>
        <div style={{ ...stageStyle, ...stageWin }}>
          <StageCard
            tone="win"
            label="OUTCOME"
            title="商談獲得 ✓"
            sub="サイト内で完結 / メールから復活"
            icon={
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </div>
      </div>

      {/* Mobile vertical layout */}
      <div className="how-flow-mobile" style={mobileWrap}>
        {[
          {
            label: "STEP 0",
            title: "Website 訪問者",
            sub: "あらゆる入口・あらゆる時間",
            color: COLORS.visitor,
            tone: "muted" as const,
          },
          {
            label: "① AI CHAT",
            title: "対話・関心醸成",
            sub: "自動声かけ・資料提案 内蔵・温度感判定",
            color: COLORS.chat,
            tone: "chat" as const,
          },
          {
            label: "② AI CALENDAR",
            title: "商談予約まで完結",
            sub: "事前ヒアリング + CRM 自動登録",
            color: COLORS.calendar,
            tone: "calendar" as const,
          },
          {
            label: "③ AI EMAIL",
            title: "離脱リードを取り戻す",
            sub: "行動シグナルから再アプローチ → ②へ戻る",
            color: COLORS.email,
            tone: "email" as const,
          },
          {
            label: "OUTCOME",
            title: "商談獲得 ✓",
            sub: "24/7 自動で積み上がる",
            color: COLORS.win,
            tone: "win" as const,
          },
        ].map((s, i) => (
          <div key={i} style={{ position: "relative", marginBottom: 12 }}>
            <StageCard
              label={s.label}
              title={s.title}
              sub={s.sub}
              tone={s.tone}
              icon={null}
            />
            {i < 4 && (
              <div
                aria-hidden
                style={{
                  width: 2,
                  height: 28,
                  background:
                    "linear-gradient(180deg, rgba(111,227,178,.6), rgba(111,227,178,.1))",
                  margin: "0 auto",
                }}
              />
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .how-flow-desktop {
          display: block;
        }
        .how-flow-mobile {
          display: none;
        }
        @media (max-width: 880px) {
          .how-flow-desktop {
            display: none !important;
          }
          .how-flow-mobile {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}

const desktopWrap: React.CSSProperties = {
  position: "relative",
  width: "100%",
  aspectRatio: "1100 / 540",
  maxWidth: 1100,
  margin: "0 auto",
};

const mobileWrap: React.CSSProperties = {
  display: "none",
  maxWidth: 480,
  margin: "0 auto",
};

const stageStyle: React.CSSProperties = {
  position: "absolute",
};

// stage positioning (in % of the 1100x540 box)
const stageVisitor: React.CSSProperties = { left: "0%", top: "32%", width: "16%" };
const stageThanks: React.CSSProperties = { left: "21%", top: "5%", width: "16%" };
const stageChat: React.CSSProperties = { left: "21%", top: "55%", width: "20%" };
const stageCal: React.CSSProperties = { left: "47%", top: "32%", width: "22%" };
const stageEmail: React.CSSProperties = { left: "47%", top: "78%", width: "22%" };
const stageWin: React.CSSProperties = { right: "0%", top: "32%", width: "20%" };

function StageCard({
  tone,
  label,
  title,
  sub,
  icon,
  small = false,
}: {
  tone: "muted" | "chat" | "calendar" | "email" | "win";
  label: string;
  title: string;
  sub: string;
  icon: React.ReactNode;
  small?: boolean;
}) {
  const accent =
    tone === "chat"
      ? COLORS.chat
      : tone === "calendar"
      ? COLORS.calendar
      : tone === "email"
      ? COLORS.email
      : tone === "win"
      ? COLORS.win
      : "#94a3b8";

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${accent}40`,
        borderRadius: 14,
        padding: small ? "10px 12px" : "14px 16px",
        boxShadow: `0 12px 32px rgba(0,0,0,0.3), 0 0 0 1px ${accent}20 inset`,
        textAlign: "left",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 6,
        }}
      >
        {icon && (
          <div
            style={{
              color: accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </div>
        )}
        <div
          style={{
            fontFamily:
              'ui-monospace, "SFMono-Regular", Menlo, Monaco, "Courier New", monospace',
            fontSize: 9,
            letterSpacing: "0.12em",
            color: accent,
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
      </div>
      <div
        style={{
          fontWeight: 800,
          fontSize: small ? 12 : 14,
          color: "#f5f5f2",
          lineHeight: 1.3,
          marginBottom: 4,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: small ? 10 : 11,
          color: "rgba(245,245,242,0.6)",
          lineHeight: 1.5,
        }}
      >
        {sub}
      </div>
    </div>
  );
}

function FlowSVG({ inView }: { inView: boolean }) {
  // Particles only animate when in view — saves CPU when offscreen
  const dur = inView ? "3s" : "999s";
  const dur2 = inView ? "4s" : "999s";

  return (
    <svg
      viewBox="0 0 1100 540"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      aria-hidden
    >
      <defs>
        <linearGradient id="line-chat" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.4" />
          <stop offset="100%" stopColor={COLORS.chat} stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="line-cal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={COLORS.chat} stopOpacity="0.5" />
          <stop offset="100%" stopColor={COLORS.calendar} stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="line-win" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={COLORS.calendar} stopOpacity="0.6" />
          <stop offset="100%" stopColor={COLORS.win} stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="line-email" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={COLORS.calendar} stopOpacity="0.5" />
          <stop offset="100%" stopColor={COLORS.email} stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="line-loop" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={COLORS.email} stopOpacity="0.7" />
          <stop offset="100%" stopColor={COLORS.calendar} stopOpacity="0.5" />
        </linearGradient>
        <radialGradient id="particle-grad" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="40%" stopColor="#6fe3b2" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#6fe3b2" stopOpacity="0" />
        </radialGradient>

        {/* Paths */}
        {/* Visitor (88, 230) → split to Thanks(231,68) and Chat(231,355) */}
        <path
          id="p-thanks"
          d="M 176 220 C 200 110, 200 110, 231 80"
          fill="none"
        />
        <path
          id="p-chat"
          d="M 176 270 C 200 320, 200 320, 231 360"
          fill="none"
        />
        {/* Thanks(287,90) → Calendar(517,200) */}
        <path
          id="p-thanks-cal"
          d="M 309 100 C 420 100, 420 200, 517 230"
          fill="none"
        />
        {/* Chat(331,360) → Calendar(517,260) */}
        <path
          id="p-chat-cal"
          d="M 353 350 C 420 320, 420 280, 517 270"
          fill="none"
        />
        {/* Calendar(605,250) → Win(880, 250) */}
        <path
          id="p-cal-win"
          d="M 605 250 L 880 250"
          fill="none"
        />
        {/* Calendar(605,290) → Email(517, 430) */}
        <path
          id="p-cal-email"
          d="M 561 305 C 540 360, 540 380, 540 425"
          fill="none"
        />
        {/* Email loop back to Calendar */}
        <path
          id="p-email-loop"
          d="M 605 425 C 700 425, 700 280, 605 280"
          fill="none"
        />
      </defs>

      {/* Visible strokes (dashed flow) */}
      <g
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        style={{
          strokeDasharray: "6 6",
          animation: inView ? "flowDash 1.5s linear infinite" : "none",
        }}
      >
        <use href="#p-thanks" stroke="url(#line-chat)" />
        <use href="#p-chat" stroke="url(#line-chat)" />
        <use href="#p-thanks-cal" stroke="url(#line-cal)" />
        <use href="#p-chat-cal" stroke="url(#line-cal)" />
        <use href="#p-cal-win" stroke="url(#line-win)" strokeWidth="2.5" />
        <use href="#p-cal-email" stroke="url(#line-email)" />
        <use href="#p-email-loop" stroke="url(#line-loop)" />
      </g>

      {/* Animated particles */}
      <Particle path="#p-chat" dur={dur} color="#6fe3b2" />
      <Particle path="#p-chat" dur={dur} delay="1s" color="#6fe3b2" />
      <Particle path="#p-thanks" dur={dur} delay="0.5s" color="#fff" />
      <Particle path="#p-chat-cal" dur={dur} delay="0.6s" color="#6fe3b2" />
      <Particle path="#p-thanks-cal" dur={dur} delay="0.2s" color="#fff" />
      <Particle path="#p-cal-win" dur={dur} delay="0.4s" color="#34d399" big />
      <Particle path="#p-cal-win" dur={dur} delay="2s" color="#34d399" big />
      <Particle path="#p-cal-email" dur={dur2} delay="1.5s" color="#a78bfa" />
      <Particle path="#p-email-loop" dur={dur2} delay="2.8s" color="#a78bfa" />
    </svg>
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
      r={big ? 5 : 3.5}
      fill={color}
      opacity={0.95}
      style={{
        filter: `drop-shadow(0 0 6px ${color})`,
      }}
    >
      <animateMotion
        dur={dur}
        repeatCount="indefinite"
        begin={delay}
        rotate="auto"
      >
        <mpath href={path} />
      </animateMotion>
    </circle>
  );
}
