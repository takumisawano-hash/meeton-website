"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Meeton ai セールスフロー — animated funnel diagram.
 *
 * Spec:
 *   訪問者 → 通常閲覧 → ① AI Chat
 *           → フォーム送信 → サンクスページ
 *   AI Chat ⇢ (会話中に送信) サンクスページ
 *   AI Chat / サンクスページ → ② AI Calendar (hub)
 *   AI Calendar → 予約完了 → ✓ サイト内で商談獲得
 *               → 離脱 → ③ AI Email ⇢ (メール内URLから再表示) AI Calendar
 *
 * Animation: scroll-trigger (whileInView, once) → sequenced reveal in 3–4s.
 * After sequence: pacing dots loop (teal on main path, coral on drop-off loop).
 * Respects prefers-reduced-motion.
 */

const COLOR = {
  visitor: "#1A2B4A",
  visitorBg: "#f1f5f9",
  visitorBorder: "#cbd5e1",
  chat: "#1D9E75",
  amber: "#F59E0B",
  calendar: "#3B82F6",
  win: "#10B981",
  email: "#F97316",
  text: "#1A2B4A",
  sub: "#64748b",
  edge: "#cbd5e1",
};

// Desktop SVG viewBox: 1000 × 760
// Card centers and sizes. (cx, cy, w, h)
const N = {
  visitor: { cx: 500, cy: 80, w: 220, h: 86 },
  chat: { cx: 220, cy: 280, w: 280, h: 120 },
  thanks: { cx: 780, cy: 280, w: 280, h: 120 },
  calendar: { cx: 500, cy: 470, w: 380, h: 140 },
  win: { cx: 220, cy: 660, w: 280, h: 120 },
  email: { cx: 780, cy: 660, w: 280, h: 120 },
} as const;

function topY(n: { cy: number; h: number }) {
  return n.cy - n.h / 2;
}
function bottomY(n: { cy: number; h: number }) {
  return n.cy + n.h / 2;
}
function leftX(n: { cx: number; w: number }) {
  return n.cx - n.w / 2;
}
function rightX(n: { cx: number; w: number }) {
  return n.cx + n.w / 2;
}

// Connector paths (SVG d strings) — all start from a card edge and end at another card edge
const PATHS = {
  // Visitor bottom-center → split: visitor → chat (curve down-left)
  visitorToChat: `M ${N.visitor.cx - 30} ${bottomY(N.visitor)} C ${N.visitor.cx - 80} 180, ${N.chat.cx + 60} 200, ${N.chat.cx} ${topY(N.chat)}`,
  // visitor → thanks (curve down-right)
  visitorToThanks: `M ${N.visitor.cx + 30} ${bottomY(N.visitor)} C ${N.visitor.cx + 80} 180, ${N.thanks.cx - 60} 200, ${N.thanks.cx} ${topY(N.thanks)}`,
  // chat right edge ⇢ thanks left edge (dashed, "会話中に送信")
  chatToThanks: `M ${rightX(N.chat)} ${N.chat.cy} L ${leftX(N.thanks)} ${N.thanks.cy}`,
  // chat bottom → calendar top-left
  chatToCalendar: `M ${N.chat.cx + 40} ${bottomY(N.chat)} C ${N.chat.cx + 60} 380, ${N.calendar.cx - 100} 420, ${N.calendar.cx - 60} ${topY(N.calendar)}`,
  // thanks bottom → calendar top-right
  thanksToCalendar: `M ${N.thanks.cx - 40} ${bottomY(N.thanks)} C ${N.thanks.cx - 60} 380, ${N.calendar.cx + 100} 420, ${N.calendar.cx + 60} ${topY(N.calendar)}`,
  // calendar bottom → win (down-left)
  calendarToWin: `M ${N.calendar.cx - 60} ${bottomY(N.calendar)} C ${N.calendar.cx - 80} 580, ${N.win.cx + 40} 600, ${N.win.cx} ${topY(N.win)}`,
  // calendar bottom → email (down-right)
  calendarToEmail: `M ${N.calendar.cx + 60} ${bottomY(N.calendar)} C ${N.calendar.cx + 80} 580, ${N.email.cx - 40} 600, ${N.email.cx} ${topY(N.email)}`,
  // email top-right ⇢ calendar right (curved loop back)
  emailToCalendar: `M ${rightX(N.email)} ${N.email.cy} C 970 ${N.email.cy - 80}, 970 ${N.calendar.cy + 20}, ${rightX(N.calendar)} ${N.calendar.cy + 20}`,
};

export default function MeetingFlowDiagram() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });
  const animActive = inView && !reduce;
  // After the sequence finishes, start the pacing dots
  const [dotsActive, setDotsActive] = useState(false);
  useEffect(() => {
    if (animActive) {
      const t = setTimeout(() => setDotsActive(true), 3600);
      return () => clearTimeout(t);
    }
    if (reduce && inView) setDotsActive(false);
  }, [animActive, reduce, inView]);

  return (
    <section
      ref={sectionRef}
      className="section"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #f8faff 100%)",
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="Meeton ai セールスフロー"
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(124,92,252,.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: 720,
          height: 720,
          top: -180,
          left: "50%",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(circle, rgba(29,158,117,.08) 0%, transparent 60%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div
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

        <div className="mfd-stage">
          {/* Desktop SVG-based diagram */}
          <DesktopFlow active={animActive} dotsActive={dotsActive} reduce={!!reduce} />
          {/* Mobile vertical fallback */}
          <MobileFlow active={animActive} reduce={!!reduce} />
        </div>
      </div>

      <style jsx>{`
        .mfd-stage {
          margin-top: clamp(40px, 6vw, 64px);
          position: relative;
        }
      `}</style>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Desktop layout
 * ────────────────────────────────────────────────────────────────── */

// Sequence delays (seconds)
const D = {
  visitor: 0.0,
  branchArrows: 0.5,
  chatThanks: 0.9,
  chatThanksDashed: 1.4,
  toCalendar: 1.7,
  calendar: 2.1,
  calendarBranches: 2.5,
  outcomes: 2.9,
  loopBack: 3.3,
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function DesktopFlow({
  active,
  dotsActive,
  reduce,
}: {
  active: boolean;
  dotsActive: boolean;
  reduce: boolean;
}) {
  const show = (state: "hidden" | "show") =>
    reduce ? "show" : active ? state : "hidden";

  return (
    <div className="mfd-desk">
      <div className="mfd-svg-wrap">
        <svg
          viewBox="0 0 1000 760"
          preserveAspectRatio="xMidYMid meet"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            position: "relative",
            zIndex: 1,
          }}
          aria-hidden
        >
          <defs>
            <marker
              id="arrow-edge"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 Z" fill={COLOR.edge} />
            </marker>
            <marker
              id="arrow-coral"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 Z" fill={COLOR.email} />
            </marker>
            <marker
              id="arrow-amber"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 Z" fill={COLOR.amber} />
            </marker>
          </defs>

          {/* Connector paths drawn with framer-motion pathLength */}
          <Connector
            d={PATHS.visitorToChat}
            color={COLOR.edge}
            delay={D.branchArrows}
            visible={active || reduce}
            reduce={reduce}
            marker="url(#arrow-edge)"
          />
          <Connector
            d={PATHS.visitorToThanks}
            color={COLOR.edge}
            delay={D.branchArrows + 0.05}
            visible={active || reduce}
            reduce={reduce}
            marker="url(#arrow-edge)"
          />
          <Connector
            d={PATHS.chatToThanks}
            color={COLOR.amber}
            dashed
            delay={D.chatThanksDashed}
            visible={active || reduce}
            reduce={reduce}
            marker="url(#arrow-amber)"
          />
          <Connector
            d={PATHS.chatToCalendar}
            color={COLOR.edge}
            delay={D.toCalendar}
            visible={active || reduce}
            reduce={reduce}
            marker="url(#arrow-edge)"
          />
          <Connector
            d={PATHS.thanksToCalendar}
            color={COLOR.edge}
            delay={D.toCalendar + 0.05}
            visible={active || reduce}
            reduce={reduce}
            marker="url(#arrow-edge)"
          />
          <Connector
            d={PATHS.calendarToWin}
            color={COLOR.edge}
            delay={D.calendarBranches}
            visible={active || reduce}
            reduce={reduce}
            marker="url(#arrow-edge)"
          />
          <Connector
            d={PATHS.calendarToEmail}
            color={COLOR.edge}
            delay={D.calendarBranches + 0.05}
            visible={active || reduce}
            reduce={reduce}
            marker="url(#arrow-edge)"
          />
          <Connector
            d={PATHS.emailToCalendar}
            color={COLOR.email}
            dashed
            delay={D.loopBack}
            visible={active || reduce}
            reduce={reduce}
            marker="url(#arrow-coral)"
          />

          {/* Labels along edges */}
          <PathLabel
            text="通常閲覧"
            x={N.visitor.cx - 100}
            y={170}
            visible={active || reduce}
            delay={D.branchArrows + 0.2}
          />
          <PathLabel
            text="フォーム送信"
            x={N.visitor.cx + 100}
            y={170}
            visible={active || reduce}
            delay={D.branchArrows + 0.2}
          />
          <PathLabel
            text="会話中に送信"
            x={(N.chat.cx + N.thanks.cx) / 2}
            y={N.chat.cy - 16}
            visible={active || reduce}
            delay={D.chatThanksDashed + 0.2}
            color={COLOR.amber}
          />
          <PathLabel
            text="予約完了"
            x={N.calendar.cx - 130}
            y={605}
            visible={active || reduce}
            delay={D.calendarBranches + 0.2}
            color={COLOR.win}
          />
          <PathLabel
            text="離脱"
            x={N.calendar.cx + 130}
            y={605}
            visible={active || reduce}
            delay={D.calendarBranches + 0.2}
            color={COLOR.email}
          />
          <PathLabel
            text="メール内URLから再表示"
            x={930}
            y={(N.email.cy + N.calendar.cy) / 2}
            visible={active || reduce}
            delay={D.loopBack + 0.2}
            color={COLOR.email}
            rotate={-90}
          />

          {/* Pacing dots — start after sequence completes */}
          {(dotsActive || reduce) && (
            <>
              {/* Main path: visitor → chat → calendar → win */}
              <Dot color={COLOR.chat} dur="2.4s" pathRef="mfd-path-1" />
              <Dot
                color={COLOR.calendar}
                dur="2.4s"
                pathRef="mfd-path-2"
                delay="0.3s"
              />
              <Dot
                color={COLOR.win}
                dur="2.4s"
                pathRef="mfd-path-3"
                delay="0.6s"
                big
              />
              {/* Drop-off loop: calendar → email → calendar */}
              <Dot
                color={COLOR.email}
                dur="3.0s"
                pathRef="mfd-path-4"
                delay="0.4s"
              />
              <Dot
                color={COLOR.email}
                dur="3.0s"
                pathRef="mfd-path-5"
                delay="1.6s"
              />
            </>
          )}

          {/* Hidden mpath targets (re-declare paths with id for animateMotion) */}
          <defs>
            <path id="mfd-path-1" d={PATHS.visitorToChat} fill="none" />
            <path id="mfd-path-2" d={PATHS.chatToCalendar} fill="none" />
            <path id="mfd-path-3" d={PATHS.calendarToWin} fill="none" />
            <path id="mfd-path-4" d={PATHS.calendarToEmail} fill="none" />
            <path id="mfd-path-5" d={PATHS.emailToCalendar} fill="none" />
          </defs>
        </svg>

        {/* Cards positioned absolutely over the SVG */}
        <Card
          node={N.visitor}
          variants={fadeUp}
          custom={D.visitor}
          state={show("show")}
          tone="muted"
          label="STEP 0"
          title="Website 訪問者"
          sub="あらゆる入口・あらゆる時間"
          icon="user"
        />
        <Card
          node={N.chat}
          variants={fadeUp}
          custom={D.chatThanks}
          state={show("show")}
          tone="chat"
          label="① AI CHAT"
          title="訪問者と対話・関心醸成"
          sub="資料提案 / AI Offer 内蔵"
          icon="chat"
        />
        <Card
          node={N.thanks}
          variants={fadeUp}
          custom={D.chatThanks + 0.05}
          state={show("show")}
          tone="amber"
          label="THANKS PAGE"
          title="サンクスページ"
          sub="フォーム送信直後の高関心リードを即捕捉"
          icon="thanks"
        />
        <Card
          node={N.calendar}
          variants={fadeUp}
          custom={D.calendar}
          state={show("show")}
          tone="calendar"
          label="② AI CALENDAR"
          title="商談予約まで完結"
          sub="事前ヒアリング・CRM自動登録 / チャット内・サンクスページ・メール経由で発動"
          icon="calendar"
          hub
        />
        <Card
          node={N.win}
          variants={fadeUp}
          custom={D.outcomes}
          state={show("show")}
          tone="win"
          label="OUTCOME"
          title="✓ サイト内で商談獲得"
          sub="リアルタイムで予約完了"
          icon="check"
        />
        <Card
          node={N.email}
          variants={fadeUp}
          custom={D.outcomes + 0.05}
          state={show("show")}
          tone="email"
          label="③ AI EMAIL"
          title="離脱リードを再アプローチ"
          sub="カスタムメールでフォロー＆カレンダーURL自動挿入"
          icon="mail"
        />
      </div>

      <style jsx>{`
        .mfd-desk {
          display: block;
        }
        .mfd-svg-wrap {
          position: relative;
          max-width: 1080px;
          margin: 0 auto;
          aspect-ratio: 1000 / 760;
        }
        @media (max-width: 880px) {
          .mfd-desk {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Card (positioned absolutely on top of the SVG)
 * ────────────────────────────────────────────────────────────────── */

type Tone = "muted" | "chat" | "amber" | "calendar" | "win" | "email";
type IconName = "user" | "chat" | "thanks" | "calendar" | "check" | "mail";

const TONE_COLOR: Record<Tone, string> = {
  muted: COLOR.visitor,
  chat: COLOR.chat,
  amber: COLOR.amber,
  calendar: COLOR.calendar,
  win: COLOR.win,
  email: COLOR.email,
};

function Card({
  node,
  state,
  custom,
  variants,
  tone,
  label,
  title,
  sub,
  icon,
  hub = false,
}: {
  node: { cx: number; cy: number; w: number; h: number };
  state: "hidden" | "show";
  custom: number;
  variants: typeof fadeUp;
  tone: Tone;
  label: string;
  title: string;
  sub: string;
  icon: IconName;
  hub?: boolean;
}) {
  const c = TONE_COLOR[tone];
  // viewBox is 1000 wide. translate node coords into % of svg width/height (760 tall).
  const left = ((node.cx - node.w / 2) / 1000) * 100;
  const top = ((node.cy - node.h / 2) / 760) * 100;
  const widthPct = (node.w / 1000) * 100;
  const heightPct = (node.h / 760) * 100;

  return (
    <motion.div
      initial="hidden"
      animate={state}
      variants={variants}
      custom={custom}
      whileHover={{ scale: 1.03 }}
      transition={{ scale: { type: "spring", stiffness: 320, damping: 22 } }}
      style={{
        position: "absolute",
        left: `${left}%`,
        top: `${top}%`,
        width: `${widthPct}%`,
        height: `${heightPct}%`,
        background: "#fff",
        border: `1.5px solid ${tone === "muted" ? COLOR.visitorBorder : c + "55"}`,
        borderRadius: hub ? 20 : 14,
        boxShadow: hub
          ? `0 16px 40px -16px ${c}66, 0 0 0 1px ${c}22 inset`
          : `0 6px 20px -10px ${c}44, 0 1px 0 #fff inset`,
        padding: hub ? "16px 20px" : "12px 16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: 4,
        zIndex: 3,
        cursor: "default",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 2,
        }}
      >
        <div
          style={{
            width: hub ? 32 : 26,
            height: hub ? 32 : 26,
            borderRadius: 8,
            background:
              tone === "muted"
                ? COLOR.visitorBg
                : `linear-gradient(135deg, ${c}, ${c}cc)`,
            color: tone === "muted" ? COLOR.visitor : "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <CardIcon name={icon} size={hub ? 18 : 15} />
        </div>
        <span
          style={{
            fontFamily: "var(--fm), ui-monospace, monospace",
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: "0.1em",
            color: c,
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
      </div>
      <div
        style={{
          fontWeight: 800,
          fontSize: hub ? 17 : 14,
          color: COLOR.text,
          lineHeight: 1.35,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: hub ? 12 : 11,
          color: COLOR.sub,
          lineHeight: 1.5,
        }}
      >
        {sub}
      </div>
    </motion.div>
  );
}

function CardIcon({ name, size = 16 }: { name: IconName; size?: number }) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "user":
      return (
        <svg {...props}>
          <path d="M12 12a4 4 0 100-8 4 4 0 000 8z M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        </svg>
      );
    case "chat":
      return (
        <svg {...props}>
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      );
    case "thanks":
      return (
        <svg {...props}>
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...props}>
          <path d="M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
        </svg>
      );
    case "check":
      return (
        <svg {...props}>
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3" />
        </svg>
      );
    case "mail":
      return (
        <svg {...props}>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" />
        </svg>
      );
  }
}

/* ──────────────────────────────────────────────────────────────────
 * Connector — animated SVG path with framer-motion pathLength
 * ────────────────────────────────────────────────────────────────── */

function Connector({
  d,
  color,
  delay,
  visible,
  reduce,
  dashed = false,
  marker,
}: {
  d: string;
  color: string;
  delay: number;
  visible: boolean;
  reduce: boolean;
  dashed?: boolean;
  marker?: string;
}) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={dashed ? 1.6 : 1.8}
      strokeLinecap="round"
      strokeDasharray={dashed ? "6 6" : undefined}
      markerEnd={marker}
      initial={reduce ? false : { pathLength: 0, opacity: 0 }}
      animate={
        reduce
          ? { pathLength: 1, opacity: 1 }
          : visible
          ? { pathLength: 1, opacity: 1 }
          : { pathLength: 0, opacity: 0 }
      }
      transition={{
        pathLength: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.2, delay },
      }}
    />
  );
}

function PathLabel({
  text,
  x,
  y,
  visible,
  delay,
  color = COLOR.sub,
  rotate = 0,
}: {
  text: string;
  x: number;
  y: number;
  visible: boolean;
  delay: number;
  color?: string;
  rotate?: number;
}) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <text
        x={x}
        y={y}
        textAnchor="middle"
        fontFamily="var(--fm), ui-monospace, monospace"
        fontSize="11"
        fontWeight="700"
        fill={color}
        style={{
          paintOrder: "stroke",
          stroke: "#fff",
          strokeWidth: 4,
          strokeLinejoin: "round",
        }}
        transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
      >
        {text}
      </text>
    </motion.g>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Pacing dot (animateMotion along an mpath)
 * ────────────────────────────────────────────────────────────────── */

function Dot({
  color,
  dur,
  pathRef,
  delay = "0s",
  big = false,
}: {
  color: string;
  dur: string;
  pathRef: string;
  delay?: string;
  big?: boolean;
}) {
  return (
    <circle
      r={big ? 5 : 4}
      fill={color}
      opacity={0.95}
      style={{ filter: `drop-shadow(0 0 6px ${color}aa)` }}
    >
      <animateMotion dur={dur} repeatCount="indefinite" begin={delay}>
        <mpath href={`#${pathRef}`} />
      </animateMotion>
    </circle>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Mobile fallback — vertical stack
 * ────────────────────────────────────────────────────────────────── */

function MobileFlow({
  active,
  reduce,
}: {
  active: boolean;
  reduce: boolean;
}) {
  const items = [
    { tone: "muted" as const, label: "STEP 0", title: "Website 訪問者", sub: "あらゆる入口・あらゆる時間", icon: "user" as const },
    { tone: "chat" as const, label: "① AI CHAT", title: "訪問者と対話・関心醸成", sub: "資料提案 / AI Offer 内蔵", icon: "chat" as const },
    { tone: "amber" as const, label: "THANKS PAGE", title: "サンクスページ", sub: "フォーム送信直後の高関心を捕捉", icon: "thanks" as const, branchNote: "AI Chat 経由 / フォーム送信直後 どちらからも到達" },
    { tone: "calendar" as const, label: "② AI CALENDAR", title: "商談予約まで完結", sub: "事前ヒアリング + CRM 自動登録", icon: "calendar" as const, hub: true },
    { tone: "win" as const, label: "OUTCOME", title: "✓ サイト内で商談獲得", sub: "予約完了でその場で確定", icon: "check" as const },
    { tone: "email" as const, label: "③ AI EMAIL", title: "離脱リードを再アプローチ", sub: "カスタムメール → AI Calendar に戻す", icon: "mail" as const, branchNote: "離脱した場合のみ。② に戻り商談獲得へ" },
  ];

  return (
    <div className="mfd-mob">
      {items.map((it, i) => (
        <MobileNode
          key={i}
          {...it}
          delay={i * 0.12}
          state={reduce ? "show" : active ? "show" : "hidden"}
          isLast={i === items.length - 1}
          reduce={reduce}
        />
      ))}
      <style jsx>{`
        .mfd-mob {
          display: none;
          max-width: 460px;
          margin: 0 auto;
        }
        @media (max-width: 880px) {
          .mfd-mob {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}

function MobileNode({
  tone,
  label,
  title,
  sub,
  icon,
  hub,
  branchNote,
  delay,
  state,
  isLast,
  reduce,
}: {
  tone: Tone;
  label: string;
  title: string;
  sub: string;
  icon: IconName;
  hub?: boolean;
  branchNote?: string;
  delay: number;
  state: "hidden" | "show";
  isLast: boolean;
  reduce: boolean;
}) {
  const c = TONE_COLOR[tone];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={
          reduce
            ? { opacity: 1, y: 0 }
            : state === "show"
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 14 }
        }
        transition={{ duration: 0.4, delay }}
        whileHover={{ scale: 1.02 }}
        style={{
          background: "#fff",
          border: `1.5px solid ${tone === "muted" ? COLOR.visitorBorder : c + "55"}`,
          borderRadius: hub ? 18 : 14,
          padding: "16px 18px",
          boxShadow: hub
            ? `0 14px 32px -16px ${c}55, 0 0 0 1px ${c}22 inset`
            : `0 6px 18px -10px ${c}44`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              background:
                tone === "muted"
                  ? COLOR.visitorBg
                  : `linear-gradient(135deg, ${c}, ${c}cc)`,
              color: tone === "muted" ? COLOR.visitor : "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardIcon name={icon} size={17} />
          </div>
          <span
            style={{
              fontFamily: "var(--fm), ui-monospace, monospace",
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: "0.1em",
              color: c,
              textTransform: "uppercase",
            }}
          >
            {label}
          </span>
        </div>
        <div
          style={{
            fontWeight: 800,
            fontSize: 15,
            color: COLOR.text,
            lineHeight: 1.4,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 12,
            color: COLOR.sub,
            marginTop: 4,
            lineHeight: 1.55,
          }}
        >
          {sub}
        </div>
        {branchNote && (
          <div
            style={{
              marginTop: 10,
              fontSize: 10,
              color: c,
              padding: "4px 10px",
              background: c + "10",
              borderRadius: 6,
              fontWeight: 700,
              letterSpacing: 0.4,
              alignSelf: "flex-start",
              display: "inline-block",
            }}
          >
            {branchNote}
          </div>
        )}
      </motion.div>
      {!isLast && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px 0",
          }}
        >
          <svg width="16" height="22" viewBox="0 0 16 22" fill="none">
            <path
              d="M8 2v15M2 12l6 6 6-6"
              stroke={COLOR.edge}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

// `AnimatePresence` import is here in case future variants need it; keep export
// minimal — single section component.
export { AnimatePresence };
