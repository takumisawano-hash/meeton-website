"use client";

/**
 * MidPageCta — single-CTA "speed bump" inserted between sections.
 * Two visual flavors:
 *   variant='demo' : デモ予約 (primary green pill)
 *   variant='doc'  : 資料請求 (subdued purple pill)
 * Mobile: stacks heading on top of CTA; CTA stretches full-width.
 */
export default function MidPageCta({
  eyebrow,
  heading,
  ctaLabel,
  onClick,
  variant = "demo",
  tone = "light",
}: {
  eyebrow: string;
  heading: string;
  ctaLabel: string;
  onClick: () => void;
  variant?: "demo" | "doc";
  tone?: "light" | "surface";
}) {
  const accent = variant === "demo" ? "var(--cta)" : "var(--accent)";
  const accentLight =
    variant === "demo" ? "var(--cta-light)" : "var(--accent-light)";
  const btnGradient =
    variant === "demo"
      ? "linear-gradient(135deg, var(--cta), #0fc19a)"
      : "linear-gradient(135deg, var(--accent), #a78bfa)";
  const btnGlow =
    variant === "demo" ? "var(--cta-glow)" : "var(--accent-glow)";
  const sectionBg = tone === "surface" ? "var(--surface)" : "transparent";
  return (
    <section
      className="mpc-section"
      style={{ background: sectionBg, padding: "clamp(20px,4vw,36px) clamp(16px,5vw,48px)" }}
    >
      <div
        className="mpc-card"
        style={{
          maxWidth: 1140,
          margin: "0 auto",
          background: "#fff",
          border: `1px solid var(--border)`,
          borderLeft: `4px solid ${accent}`,
          borderRadius: 16,
          padding: "clamp(20px, 3vw, 28px) clamp(20px, 4vw, 36px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
          boxShadow: "0 4px 18px rgba(15,17,40,0.05)",
        }}
      >
        <div style={{ flex: "1 1 320px", minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--fm)",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.12em",
              color: accent,
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: "clamp(16px, 2.4vw, 19px)",
              fontWeight: 800,
              color: "var(--heading)",
              lineHeight: 1.55,
              wordBreak: "keep-all",
              overflowWrap: "anywhere",
            }}
          >
            {heading}
          </div>
        </div>
        <button
          onClick={onClick}
          className="mpc-btn"
          style={{
            background: btnGradient,
            color: "#fff",
            border: "none",
            padding: "14px 28px",
            borderRadius: 10,
            fontSize: 15,
            fontWeight: 800,
            cursor: "pointer",
            fontFamily: "var(--fb)",
            boxShadow: `0 4px 16px ${btnGlow}`,
            transition: "transform .2s, box-shadow .2s",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = `0 8px 24px ${btnGlow}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = `0 4px 16px ${btnGlow}`;
          }}
        >
          {ctaLabel} →
        </button>
        <span
          aria-hidden
          style={{ position: "absolute", opacity: 0, background: accentLight }}
        />
      </div>
      <style jsx>{`
        @media (max-width: 640px) {
          .mpc-card {
            flex-direction: column !important;
            align-items: stretch !important;
            text-align: left;
          }
          .mpc-btn {
            width: 100% !important;
            padding: 16px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
