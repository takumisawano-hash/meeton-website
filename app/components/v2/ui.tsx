import React from "react";

// v2 server-rendered layout primitives. No "use client" — section copy is
// emitted as static HTML so AI crawlers (which don't run JS, §4.16) read it.

export const MAXW = 1160;

type Tone = "navy" | "navyDeep" | "white" | "surface" | "wash";

const TONE_BG: Record<Tone, string> = {
  navy: "var(--navy)",
  navyDeep: "var(--navy-deep)",
  white: "var(--bg)",
  surface: "var(--surface)",
  wash: "var(--cta-wash)",
};

export function Section({
  tone = "white",
  id,
  children,
  py,
  style,
}: {
  tone?: Tone;
  id?: string;
  children: React.ReactNode;
  py?: number;
  style?: React.CSSProperties;
}) {
  const dark = tone === "navy" || tone === "navyDeep";
  return (
    <section
      id={id}
      style={{
        background: TONE_BG[tone],
        color: dark ? "var(--on-navy)" : "var(--text)",
        padding: `${py ?? 80}px 24px`,
        ...style,
      }}
    >
      <div style={{ maxWidth: MAXW, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

export function Eyebrow({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "var(--fm)",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: ".08em",
        textTransform: "uppercase",
        color: tone === "dark" ? "var(--on-navy-sub)" : "var(--cta-ink)",
        background: tone === "dark" ? "var(--on-navy-surface)" : "var(--cta-light)",
        border:
          tone === "dark"
            ? "1px solid var(--on-navy-border)"
            : "1px solid var(--cta-border)",
        padding: "6px 14px",
        borderRadius: 999,
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: 999,
          background: "var(--cta)",
          display: "inline-block",
        }}
      />
      {children}
    </div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  tone = "light",
  align = "left",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
}) {
  const dark = tone === "dark";
  return (
    <div
      style={{
        textAlign: align,
        maxWidth: align === "center" ? 760 : undefined,
        margin: align === "center" ? "0 auto" : undefined,
        marginBottom: 44,
      }}
    >
      {eyebrow && (
        <div style={{ marginBottom: 18 }}>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2
        style={{
          fontFamily: "var(--fd)",
          fontSize: "clamp(26px, 4vw, 38px)",
          lineHeight: 1.25,
          fontWeight: 800,
          letterSpacing: "-0.02em",
          color: dark ? "var(--on-navy)" : "var(--heading)",
          margin: 0,
        }}
      >
        {title}
      </h2>
      {lede && (
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.8,
            color: dark ? "var(--on-navy-sub)" : "var(--sub)",
            marginTop: 16,
            marginBottom: 0,
          }}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

export function Card({
  children,
  style,
  className,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        background: "#fff",
        border: "1px solid var(--border)",
        borderRadius: 16,
        padding: 24,
        boxShadow: "0 1px 2px rgba(15,17,40,.04)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Compact product glyphs (navy/green, no per-product hue per §3.8).
export function ProductIcon({ kind, size = 22 }: { kind: string; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
  };
  switch (kind) {
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="4.5" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 2.5v4M16 2.5v4" />
          <path d="M9.5 14.5l1.8 1.8 3.5-3.6" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-4.5A8 8 0 1 1 21 12Z" />
          <path d="M8.5 11.5h7M8.5 14.5h4" />
        </svg>
      );
    case "library":
      return (
        <svg {...common}>
          <path d="M6 3h9l4 4v14H6z" />
          <path d="M14 3v5h5" />
          <path d="M9 13h7M9 16.5h7" />
        </svg>
      );
    case "email":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3.5 6.5 12 13l8.5-6.5" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
        </svg>
      );
    default:
      return null;
  }
}

export function Check({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--cta)"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={{ flexShrink: 0 }}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
