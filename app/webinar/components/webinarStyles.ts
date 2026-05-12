/**
 * Shared CSS for /webinar/ index + /webinar/[slug]/ detail pages.
 *
 * Pattern: dot-grid + stacked radial-gradient glow (NO filter:blur).
 * Brand palette: --w-green #12a37d, --w-purple #7c5cfc, --w-cyan #0891b2.
 *
 * Class prefix: `wb-` for webinar.
 */
export function webinarCss(): string {
  return `
    .wb-root {
      background: #fafaf7;
      color: #0a0e0c;
      min-height: 100vh;
      --w-green: #12a37d;
      --w-green-deep: #065f46;
      --w-purple: #7c5cfc;
      --w-cyan: #0891b2;
      --w-blue: #3b6ff5;
      --w-border: #e4e3dd;
      --w-border-2: #d8d7d0;
      --w-text: #0a0e0c;
      --w-sub: #3d4541;
      --w-mute: #82897f;
    }

    /* ========== HERO ========== */
    .wb-hero {
      position: relative;
      padding: clamp(120px, 16vw, 180px) clamp(20px, 4vw, 48px) clamp(48px, 7vw, 80px);
      border-bottom: 1px solid var(--w-border);
      overflow: hidden;
      background:
        radial-gradient(circle 360px at calc(100% - 40px) -80px, rgba(18, 163, 125, 0.22), transparent 70%),
        radial-gradient(circle 280px at -40px calc(100% - 40px), rgba(124, 92, 252, 0.16), transparent 70%),
        radial-gradient(ellipse 80% 60% at 20% 0%, rgba(18, 163, 125, 0.06), transparent 60%),
        radial-gradient(ellipse 60% 50% at 90% 30%, rgba(8, 145, 178, 0.06), transparent 60%),
        #fafaf7;
    }
    .wb-hero-grid {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(6, 95, 70, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(6, 95, 70, 0.04) 1px, transparent 1px);
      background-size: 64px 64px;
      mask-image: radial-gradient(ellipse at top, black 30%, transparent 80%);
      pointer-events: none;
    }
    .wb-hero-inner {
      position: relative; z-index: 1;
      max-width: 1200px; margin: 0 auto;
    }

    /* Detail hero variant — 2-column with sticky form on desktop */
    .wb-hero-split {
      display: grid;
      grid-template-columns: 1.05fr 0.95fr;
      gap: clamp(32px, 4vw, 64px);
      align-items: start;
    }
    @media (max-width: 980px) {
      .wb-hero-split { grid-template-columns: 1fr; gap: 32px; }
    }
    .wb-hero-aside { position: sticky; top: 24px; }
    @media (max-width: 980px) {
      .wb-hero-aside { position: static; }
    }

    /* ========== COUNTDOWN ========== */
    .wb-countdown {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 8px 14px; border-radius: 999px;
      background: rgba(255, 255, 255, 0.7);
      border: 1px solid var(--w-border);
      backdrop-filter: saturate(140%);
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 12px; font-weight: 700;
      color: var(--w-green-deep); letter-spacing: 0.02em;
      margin-bottom: 18px;
    }
    .wb-countdown-pulse {
      width: 7px; height: 7px; border-radius: 50%;
      background: var(--w-green);
      box-shadow: 0 0 0 0 rgba(18, 163, 125, 0.45);
      animation: wb-count-pulse 1.8s ease-in-out infinite;
    }
    @keyframes wb-count-pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(18, 163, 125, 0.45); }
      50% { box-shadow: 0 0 0 7px rgba(18, 163, 125, 0); }
    }
    .wb-countdown-units {
      display: inline-flex; gap: 6px; align-items: baseline;
    }
    .wb-countdown-unit { color: var(--w-text); }
    .wb-countdown-label { color: var(--w-mute); font-weight: 600; margin-right: 2px; }

    /* ========== EYEBROW ========== */
    .wb-eyebrow {
      display: inline-flex; align-items: center; gap: 12px;
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 11px; letter-spacing: 0.18em;
      color: var(--w-green-deep); text-transform: uppercase;
      margin-bottom: 24px; font-weight: 700;
    }
    .wb-eyebrow-dash { width: 24px; height: 1px; background: linear-gradient(90deg, transparent, var(--w-green)); }
    .wb-eyebrow-tag {
      color: var(--w-mute); font-weight: 600;
      padding-left: 8px; border-left: 1px solid var(--w-border);
    }

    /* ========== HERO H1 ========== */
    .wb-hero-h1 {
      font-weight: 900;
      font-size: clamp(34px, 5vw, 64px);
      line-height: 1.1; letter-spacing: -0.038em;
      margin: 0 0 24px; word-break: keep-all;
      font-feature-settings: "palt" 1, "ss01" 1;
      text-wrap: balance;
    }
    /* Slightly more compact H1 inside split hero (detail page) */
    .wb-hero-split .wb-hero-h1 {
      font-size: clamp(30px, 4vw, 48px);
      line-height: 1.15;
      margin-bottom: 16px;
    }
    .wb-hero-h1 em {
      font-style: normal;
      background: linear-gradient(135deg, var(--w-green) 0%, var(--w-cyan) 60%, var(--w-purple) 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .wb-hero-sub {
      font-size: clamp(15px, 2vw, 19px);
      line-height: 1.85; color: var(--w-sub);
      max-width: 680px; margin: 0 0 36px;
    }
    .wb-hero-ctas {
      display: flex; gap: 14px; flex-wrap: wrap;
    }

    /* ========== BUTTONS ========== */
    .wb-btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 14px 26px; min-height: 48px;
      border-radius: 999px;
      font-family: inherit; font-size: 15px; font-weight: 700;
      text-decoration: none; cursor: pointer; border: none;
      letter-spacing: 0.01em;
      transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.25s ease, background 0.2s, border-color 0.2s;
    }
    .wb-btn-primary {
      background: linear-gradient(135deg, var(--w-green-deep), var(--w-green));
      color: #fff;
      box-shadow: 0 6px 24px rgba(6, 95, 70, 0.28);
    }
    .wb-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(6, 95, 70, 0.34); }
    .wb-btn-ghost {
      background: #fff; color: var(--w-text);
      border: 1px solid var(--w-border-2);
    }
    .wb-btn-ghost:hover { border-color: var(--w-green-deep); color: var(--w-green-deep); transform: translateY(-1px); }

    /* ========== SECTION ========== */
    .wb-section { padding: clamp(64px, 10vw, 120px) clamp(20px, 4vw, 48px); }
    .wb-section-alt { background: #fff; border-top: 1px solid var(--w-border); border-bottom: 1px solid var(--w-border); }
    .wb-section-inner { max-width: 1200px; margin: 0 auto; }
    .wb-section-head { margin-bottom: clamp(40px, 5vw, 64px); max-width: 760px; }
    .wb-section-eyebrow {
      display: inline-flex; align-items: center; gap: 12px;
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 11px; letter-spacing: 0.18em;
      color: var(--w-green-deep); text-transform: uppercase;
      margin-bottom: 16px; font-weight: 700;
    }
    .wb-h2 {
      font-weight: 900; font-size: clamp(28px, 4vw, 44px);
      line-height: 1.2; letter-spacing: -0.025em;
      margin: 0 0 20px;
    }
    .wb-h2 em {
      font-style: normal;
      background: linear-gradient(135deg, var(--w-green), var(--w-cyan));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .wb-section-sub {
      font-size: clamp(15px, 1.8vw, 17px);
      line-height: 1.85; color: var(--w-sub);
      max-width: 660px;
    }

    /* ========== FEATURED WEBINAR CARD (index) ========== */
    .wb-featured {
      position: relative;
      background: #fff;
      border: 1px solid var(--w-border);
      border-radius: 28px;
      overflow: hidden;
      box-shadow: 0 24px 64px -32px rgba(6, 95, 70, 0.18);
    }
    .wb-featured-glow {
      position: absolute; inset: 0; pointer-events: none;
      background:
        radial-gradient(circle 280px at calc(100% - 40px) -40px, rgba(18, 163, 125, 0.12), transparent 70%),
        radial-gradient(circle 220px at -40px calc(100% - 40px), rgba(124, 92, 252, 0.10), transparent 70%);
    }
    .wb-featured-thumb {
      position: relative; width: 100%; aspect-ratio: 1200 / 630;
      overflow: hidden;
      border-bottom: 1px solid var(--w-border);
      background: var(--w-paper);
    }
    .wb-featured-thumb img {
      width: 100%; height: 100%; object-fit: cover; display: block;
    }
    .wb-featured-inner {
      position: relative; padding: clamp(32px, 4vw, 56px);
      display: grid; grid-template-columns: 1.2fr 1fr; gap: clamp(28px, 4vw, 48px);
      align-items: start;
    }
    .wb-featured-badge {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 8px 14px;
      background: rgba(18, 163, 125, 0.08);
      border-radius: 999px;
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--w-green-deep);
      margin-bottom: 18px;
    }
    .wb-featured-badge-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--w-green);
      box-shadow: 0 0 0 3px rgba(18, 163, 125, 0.2);
      animation: wb-pulse 2.4s ease-in-out infinite;
    }
    @keyframes wb-pulse {
      0%, 100% { box-shadow: 0 0 0 3px rgba(18, 163, 125, 0.2); }
      50% { box-shadow: 0 0 0 6px rgba(18, 163, 125, 0.08); }
    }
    .wb-featured-date {
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: clamp(15px, 1.8vw, 18px);
      font-weight: 700; color: var(--w-green-deep);
      margin-bottom: 16px; letter-spacing: 0.01em;
    }
    .wb-featured-title {
      font-size: clamp(24px, 3.4vw, 36px);
      font-weight: 900; line-height: 1.25;
      letter-spacing: -0.025em; margin: 0 0 12px;
      color: var(--w-text);
    }
    .wb-featured-title em {
      font-style: normal;
      background: linear-gradient(135deg, var(--w-green), var(--w-cyan));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .wb-featured-subtitle {
      font-size: clamp(15px, 1.8vw, 17px);
      line-height: 1.75; color: var(--w-sub);
      margin: 0 0 24px;
    }
    .wb-featured-learnings {
      list-style: none; padding: 0; margin: 0 0 28px;
      display: flex; flex-direction: column; gap: 12px;
    }
    .wb-featured-learnings li {
      display: flex; gap: 12px; align-items: flex-start;
      font-size: 14.5px; line-height: 1.7; color: var(--w-sub);
    }
    .wb-check {
      flex-shrink: 0; width: 20px; height: 20px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--w-green), var(--w-green-deep));
      color: #fff;
      display: inline-flex; align-items: center; justify-content: center;
      margin-top: 2px;
    }
    .wb-featured-cta-row {
      display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
    }
    .wb-featured-meta-col {
      display: flex; flex-direction: column; gap: 16px;
      padding: 24px; background: #fafaf7;
      border: 1px solid var(--w-border); border-radius: 18px;
    }
    .wb-featured-meta-row {
      display: flex; align-items: center; gap: 12px;
      padding-bottom: 14px; border-bottom: 1px solid var(--w-border);
    }
    .wb-featured-meta-row:last-child { padding-bottom: 0; border-bottom: 0; }
    .wb-featured-meta-icon {
      width: 36px; height: 36px; border-radius: 10px;
      background: color-mix(in srgb, var(--w-green) 12%, #fff);
      display: inline-flex; align-items: center; justify-content: center;
      color: var(--w-green-deep); flex-shrink: 0;
    }
    .wb-featured-meta-l {
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 10.5px; letter-spacing: 0.14em;
      text-transform: uppercase; color: var(--w-mute); font-weight: 700;
    }
    .wb-featured-meta-v {
      font-size: 14px; font-weight: 700; color: var(--w-text);
      margin-top: 2px;
    }

    @media (max-width: 900px) {
      .wb-featured-inner { grid-template-columns: 1fr; }
    }

    /* ========== UPCOMING PAIR ========== */
    .wb-upcoming-grid {
      display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: clamp(20px, 2vw, 28px);
    }
    .wb-upcoming-card {
      background: #fff; border: 1px solid var(--w-border); border-radius: 22px;
      text-decoration: none; color: var(--w-text);
      display: flex; flex-direction: column;
      transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s, box-shadow 0.3s;
      overflow: hidden;
    }
    .wb-upcoming-card:hover {
      transform: translateY(-3px);
      border-color: var(--w-green-deep);
      box-shadow: 0 24px 48px -24px rgba(6, 95, 70, 0.2);
    }
    .wb-upcoming-thumb {
      position: relative; aspect-ratio: 1200 / 630;
      background: var(--w-paper); overflow: hidden;
    }
    .wb-upcoming-thumb img {
      width: 100%; height: 100%; object-fit: cover; display: block;
      transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .wb-upcoming-card:hover .wb-upcoming-thumb img { transform: scale(1.03); }
    .wb-upcoming-body {
      padding: clamp(20px, 2.2vw, 28px);
      display: flex; flex-direction: column; gap: 12px; flex: 1;
    }
    .wb-upcoming-date {
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 13px; font-weight: 700;
      color: var(--w-green-deep); letter-spacing: 0.02em;
    }
    .wb-upcoming-title {
      font-size: clamp(18px, 2vw, 22px); font-weight: 800;
      line-height: 1.35; letter-spacing: -0.015em;
      margin: 0; color: var(--w-text);
    }
    .wb-upcoming-subtitle {
      font-size: 14px; line-height: 1.7; color: var(--w-sub); margin: 0;
    }
    .wb-upcoming-cta {
      margin-top: auto;
      display: inline-flex; align-items: center; gap: 6px;
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 12px; color: var(--w-green-deep);
      font-weight: 700; letter-spacing: 0.04em;
    }
    .wb-upcoming-card:hover .wb-upcoming-cta svg { transform: translateX(3px); }
    .wb-upcoming-cta svg { transition: transform 0.25s ease; }

    @media (max-width: 720px) {
      .wb-upcoming-grid { grid-template-columns: 1fr; }
    }

    /* ========== ABOUT (3-col) ========== */
    .wb-about {
      display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: clamp(20px, 2vw, 28px);
    }
    .wb-about-card {
      background: #fff; border: 1px solid var(--w-border);
      border-radius: 22px; padding: clamp(28px, 3vw, 36px);
      display: flex; flex-direction: column; gap: 14px;
    }
    .wb-about-num {
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 13px; font-weight: 700; color: var(--w-green);
      letter-spacing: 0.1em;
    }
    .wb-about-title {
      font-size: clamp(17px, 1.8vw, 20px); font-weight: 800;
      line-height: 1.4; margin: 0; letter-spacing: -0.015em;
    }
    .wb-about-body {
      font-size: 14px; line-height: 1.85; color: var(--w-sub); margin: 0;
    }

    @media (max-width: 900px) {
      .wb-about { grid-template-columns: 1fr; }
    }

    /* ========== ON-DEMAND LIBRARY ========== */
    .wb-past-grid {
      display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: clamp(16px, 2vw, 24px);
    }
    .wb-past-card {
      background: #fafaf7; border: 1px solid var(--w-border);
      border-radius: 18px; padding: 22px;
      display: flex; flex-direction: column; gap: 10px;
      text-decoration: none; color: var(--w-text);
      transition: border-color 0.3s, transform 0.3s;
    }
    .wb-past-card:hover { border-color: var(--w-purple); transform: translateY(-2px); }
    .wb-past-date {
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 11.5px; color: var(--w-mute); letter-spacing: 0.04em;
      font-weight: 600;
    }
    .wb-past-title { font-size: 16px; font-weight: 800; line-height: 1.4; margin: 0; }
    .wb-past-cta {
      margin-top: auto;
      display: inline-flex; align-items: center; gap: 6px;
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 11px; color: var(--w-purple); font-weight: 700;
      letter-spacing: 0.06em;
    }

    @media (max-width: 900px) { .wb-past-grid { grid-template-columns: 1fr; } }

    /* ========== FAQ ========== */
    .wb-faq { max-width: 880px; margin: 0; display: flex; flex-direction: column; gap: 12px; }
    .wb-faq-item {
      background: #fafaf7; border: 1px solid var(--w-border);
      border-radius: 18px; padding: 24px 28px;
    }
    .wb-faq-q {
      display: flex; align-items: flex-start; gap: 14px;
      font-size: 16px; font-weight: 800; color: var(--w-text);
      line-height: 1.55; margin: 0 0 12px;
    }
    .wb-faq-num {
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 11px; font-weight: 700; color: var(--w-green);
      letter-spacing: 0.08em; padding-top: 4px; flex-shrink: 0;
    }
    .wb-faq-a {
      font-size: 14.5px; line-height: 1.9; color: var(--w-sub);
      margin: 0; padding-left: 38px;
    }

    /* ========== DETAIL: HERO META STRIP ========== */
    .wb-meta-strip {
      display: flex; flex-wrap: wrap; gap: 18px 28px;
      margin: 8px 0 28px;
      padding-top: 20px;
      border-top: 1px solid var(--w-border);
    }
    .wb-meta-strip-item {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 13px; color: var(--w-sub);
    }
    .wb-meta-strip-item svg { color: var(--w-green-deep); flex-shrink: 0; }
    .wb-meta-strip-k {
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--w-mute); font-weight: 700; margin-right: 2px;
    }
    .wb-meta-strip-v { font-weight: 700; color: var(--w-text); font-size: 13px; }

    /* ========== HERO-SIDE FORM CARD (above-fold) ========== */
    .wb-hero-form-card {
      background: #fff;
      border: 1px solid var(--w-border);
      border-radius: 24px;
      padding: clamp(24px, 2.4vw, 32px);
      box-shadow:
        0 28px 64px -28px rgba(6, 95, 70, 0.22),
        0 2px 0 rgba(255, 255, 255, 0.6) inset;
    }
    .wb-hero-form-eyebrow {
      display: flex; align-items: center; gap: 10px;
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase;
      color: var(--w-green-deep); font-weight: 700;
      margin-bottom: 10px;
    }
    .wb-hero-form-h {
      font-size: clamp(18px, 1.9vw, 22px); font-weight: 900;
      letter-spacing: -0.02em; margin: 0 0 6px; line-height: 1.3;
    }
    .wb-hero-form-sub {
      font-size: 13px; color: var(--w-sub); line-height: 1.7;
      margin: 0 0 18px;
    }
    .wb-hero-form-trust-chips {
      display: flex; flex-wrap: wrap; gap: 6px; margin: 0 0 18px;
    }
    .wb-trust-chip {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 5px 10px;
      background: rgba(18, 163, 125, 0.07);
      color: var(--w-green-deep);
      border-radius: 999px;
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 10.5px; font-weight: 700; letter-spacing: 0.04em;
    }
    .wb-trust-chip-dot {
      width: 5px; height: 5px; border-radius: 50%;
      background: var(--w-green);
    }

    /* ========== MOBILE STICKY CTA (detail page) ========== */
    .wb-sticky-cta {
      display: none;
      position: fixed; left: 12px; right: 12px; bottom: 12px;
      z-index: 50;
      background: rgba(255, 255, 255, 0.96);
      border: 1px solid var(--w-border);
      border-radius: 16px;
      padding: 10px 12px 10px 16px;
      box-shadow: 0 18px 40px -18px rgba(6, 95, 70, 0.32);
      backdrop-filter: saturate(140%);
      align-items: center; justify-content: space-between;
      gap: 12px;
    }
    .wb-sticky-cta-info {
      display: flex; flex-direction: column; gap: 2px; min-width: 0;
    }
    .wb-sticky-cta-l {
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--w-mute); font-weight: 700;
    }
    .wb-sticky-cta-v {
      font-size: 13px; font-weight: 800; color: var(--w-text);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .wb-sticky-cta .wb-btn {
      padding: 10px 16px; min-height: 40px; font-size: 13px; flex-shrink: 0;
    }
    @media (max-width: 720px) {
      .wb-sticky-cta { display: flex; }
      body { padding-bottom: 80px; }
    }

    /* ========== DETAIL: SPEAKER ========== */
    .wb-speaker-card {
      display: flex; align-items: center; gap: 20px;
      padding: 20px 24px;
      background: #fff; border: 1px solid var(--w-border);
      border-radius: 18px; max-width: 640px;
      margin-top: 12px;
    }
    .wb-speaker-avatar {
      width: 64px; height: 64px; border-radius: 50%;
      flex-shrink: 0;
      background: linear-gradient(135deg, var(--w-green), var(--w-cyan));
      color: #fff;
      display: inline-flex; align-items: center; justify-content: center;
      font-size: 22px; font-weight: 800; letter-spacing: -0.02em;
    }
    .wb-speaker-info { display: flex; flex-direction: column; gap: 4px; }
    .wb-speaker-name { font-size: 16px; font-weight: 800; color: var(--w-text); }
    .wb-speaker-title { font-size: 13px; color: var(--w-mute); font-weight: 600; }
    .wb-speaker-bio { font-size: 13px; line-height: 1.7; color: var(--w-sub); margin-top: 6px; }

    /* ========== DETAIL: LEARNINGS GRID ========== */
    .wb-learnings-grid {
      display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: clamp(16px, 2vw, 20px);
    }
    .wb-learning-card {
      background: #fff; border: 1px solid var(--w-border);
      border-radius: 18px; padding: 24px;
      display: flex; gap: 14px; align-items: flex-start;
    }
    .wb-learning-icon {
      width: 32px; height: 32px; border-radius: 10px;
      background: linear-gradient(135deg, var(--w-green), var(--w-green-deep));
      color: #fff; flex-shrink: 0;
      display: inline-flex; align-items: center; justify-content: center;
    }
    .wb-learning-text {
      font-size: 14.5px; line-height: 1.75; color: var(--w-text); margin: 0;
      font-weight: 500;
    }
    @media (max-width: 720px) {
      .wb-learnings-grid { grid-template-columns: 1fr; }
    }

    /* ========== DETAIL: AGENDA ========== */
    .wb-agenda {
      list-style: none; padding: 0; margin: 0;
      display: flex; flex-direction: column; gap: 0;
      max-width: 880px;
      background: #fff; border: 1px solid var(--w-border);
      border-radius: 22px; overflow: hidden;
    }
    .wb-agenda-row {
      display: grid; grid-template-columns: 80px 1fr;
      gap: 20px; padding: 20px 24px;
      border-bottom: 1px solid var(--w-border);
      align-items: start;
    }
    .wb-agenda-row:last-child { border-bottom: 0; }
    .wb-agenda-mins {
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 12.5px; font-weight: 700;
      color: var(--w-green-deep);
      padding: 4px 10px; background: rgba(18, 163, 125, 0.08);
      border-radius: 999px; text-align: center;
      letter-spacing: 0.04em;
      min-width: 64px; justify-self: start;
    }
    .wb-agenda-topic {
      font-size: 14.5px; line-height: 1.7; color: var(--w-text);
      font-weight: 600;
    }

    /* ========== DETAIL: REGISTRATION ========== */
    .wb-reg {
      padding: clamp(64px, 10vw, 120px) clamp(20px, 4vw, 48px);
      background:
        radial-gradient(circle 280px at 80% -40px, rgba(18, 163, 125, 0.16), transparent 70%),
        radial-gradient(circle 220px at 0% 100%, rgba(124, 92, 252, 0.14), transparent 65%),
        #fafaf7;
      border-top: 1px solid var(--w-border);
      position: relative; overflow: hidden;
    }
    .wb-reg-inner {
      max-width: 1100px; margin: 0 auto;
      display: grid; grid-template-columns: 1fr 1.1fr;
      gap: clamp(32px, 5vw, 64px); align-items: start;
    }
    .wb-reg-card {
      background: #fff; border: 1px solid var(--w-border);
      border-radius: 22px; padding: clamp(28px, 3.2vw, 40px);
      box-shadow: 0 24px 64px -32px rgba(6, 95, 70, 0.2);
    }
    .wb-reg-card-h {
      font-size: clamp(20px, 2.4vw, 26px); font-weight: 900;
      letter-spacing: -0.02em; margin: 0 0 8px;
    }
    .wb-reg-card-sub {
      font-size: 13.5px; color: var(--w-sub); line-height: 1.7;
      margin: 0 0 20px;
    }

    .wb-form-shell { position: relative; min-height: 240px; }

    /* Skeleton fields shown while HubSpot script loads */
    .wb-form-skeleton { display: flex; flex-direction: column; gap: 14px; }
    .wb-form-skel-label {
      width: 38%; height: 12px; border-radius: 4px;
      background: linear-gradient(90deg, #ececea 25%, #f5f5f2 37%, #ececea 63%);
      background-size: 400% 100%;
      animation: wb-shimmer 1.4s ease-in-out infinite;
    }
    .wb-form-skel-field {
      width: 100%; height: 42px; border-radius: 10px;
      background: linear-gradient(90deg, #ececea 25%, #f5f5f2 37%, #ececea 63%);
      background-size: 400% 100%;
      animation: wb-shimmer 1.4s ease-in-out infinite;
    }
    .wb-form-skel-button {
      width: 100%; height: 48px; border-radius: 12px; margin-top: 4px;
      background: linear-gradient(90deg, #d4ebe2 25%, #e5f3ed 37%, #d4ebe2 63%);
      background-size: 400% 100%;
      animation: wb-shimmer 1.4s ease-in-out infinite;
    }
    @keyframes wb-shimmer {
      0% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .wb-form-fallback {
      margin-top: 20px; padding: 16px;
      background: #fff8f0; border: 1px solid #f3d6a3;
      border-radius: 12px; font-size: 13px; line-height: 1.7;
      color: #6b4f1a;
    }
    .wb-form-fallback a {
      color: var(--w-green-deep); font-weight: 700; text-decoration: underline;
    }
    .wb-form-privacy {
      margin-top: 14px; font-size: 11.5px; line-height: 1.7;
      color: var(--w-mute); text-align: center;
    }
    .wb-form-privacy a { color: var(--w-sub); text-decoration: underline; }

    .wb-form-success {
      text-align: center; padding: 24px 0;
    }
    .wb-form-success-icon {
      width: 56px; height: 56px; border-radius: 50%;
      background: linear-gradient(135deg, var(--w-green), var(--w-green-deep));
      display: inline-flex; align-items: center; justify-content: center;
      margin-bottom: 16px;
    }
    .wb-form-success-h {
      font-size: 18px; font-weight: 800; margin: 0 0 8px;
    }
    .wb-form-success-p {
      font-size: 13.5px; color: var(--w-sub); line-height: 1.7; margin: 0;
    }

    /* Style HubSpot form fields to match SaaS aesthetic */
    .wb-form-shell .hs-form-field { margin-bottom: 14px; }
    .wb-form-shell .hs-form-field label {
      font-size: 12.5px; font-weight: 700;
      color: var(--w-text); margin-bottom: 6px; display: block;
      letter-spacing: 0.01em;
    }
    .wb-form-shell input[type="text"],
    .wb-form-shell input[type="email"],
    .wb-form-shell input[type="tel"],
    .wb-form-shell textarea,
    .wb-form-shell select {
      width: 100%; padding: 12px 14px;
      border: 1px solid var(--w-border-2); border-radius: 10px;
      font-size: 14px; font-family: inherit; color: var(--w-text);
      background: #fff; transition: border-color 0.2s, box-shadow 0.2s;
      box-sizing: border-box;
    }
    .wb-form-shell input:focus, .wb-form-shell textarea:focus, .wb-form-shell select:focus {
      outline: none; border-color: var(--w-green);
      box-shadow: 0 0 0 3px rgba(18, 163, 125, 0.12);
    }
    .wb-form-shell .hs-button {
      width: 100%;
      padding: 14px 26px; border-radius: 12px; border: none;
      background: linear-gradient(135deg, var(--w-green-deep), var(--w-green));
      color: #fff; font-size: 15px; font-weight: 700;
      cursor: pointer; transition: transform 0.2s, box-shadow 0.25s;
      box-shadow: 0 6px 24px rgba(6, 95, 70, 0.24);
      margin-top: 8px;
    }
    .wb-form-shell .hs-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 32px rgba(6, 95, 70, 0.32);
    }
    .wb-form-shell .hs-error-msgs { color: #d23a3a; font-size: 12px; margin-top: 4px; }
    .wb-form-shell .legal-consent-container { font-size: 11.5px; color: var(--w-mute); margin-top: 8px; }

    .wb-reg-side {
      display: flex; flex-direction: column; gap: 18px;
    }
    .wb-reg-trust {
      background: #fff; border: 1px solid var(--w-border);
      border-radius: 18px; padding: 24px;
    }
    .wb-reg-trust-l {
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase;
      color: var(--w-mute); font-weight: 700; margin-bottom: 14px;
    }
    .wb-reg-trust-row {
      display: flex; gap: 14px; align-items: center;
      padding: 10px 0; border-top: 1px solid var(--w-border);
    }
    .wb-reg-trust-row:first-of-type { border-top: 0; padding-top: 0; }
    .wb-reg-trust-v {
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 20px; font-weight: 800; color: var(--w-green-deep);
      letter-spacing: -0.02em;
    }
    .wb-reg-trust-k { font-size: 12.5px; color: var(--w-sub); font-weight: 600; }

    @media (max-width: 900px) {
      .wb-reg-inner { grid-template-columns: 1fr; }
    }

    /* ========== THANKS PAGE CROSS-SELL ========== */
    .wb-cross-sell {
      max-width: 760px; margin: 56px auto 0;
      padding: 28px clamp(20px, 4vw, 36px);
      background: #fff;
      border: 1px solid var(--w-border);
      border-radius: 22px;
      text-align: left;
    }
    .wb-cross-sell-l {
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase;
      color: var(--w-mute); font-weight: 700; margin-bottom: 14px;
    }
    .wb-cross-sell-h {
      font-size: 18px; font-weight: 900; letter-spacing: -0.02em;
      margin: 0 0 18px; line-height: 1.35;
    }
    .wb-cross-sell-grid {
      display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
    }
    @media (max-width: 720px) {
      .wb-cross-sell-grid { grid-template-columns: 1fr; }
    }
    .wb-cross-sell-card {
      display: flex; flex-direction: column; gap: 8px;
      padding: 18px;
      background: #fafaf7; border: 1px solid var(--w-border);
      border-radius: 14px;
      text-decoration: none; color: inherit;
      transition: border-color 0.25s, transform 0.25s;
    }
    .wb-cross-sell-card:hover {
      border-color: var(--w-green-deep);
      transform: translateY(-2px);
    }
    .wb-cross-sell-date {
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 11.5px; color: var(--w-green-deep);
      font-weight: 700; letter-spacing: 0.02em;
    }
    .wb-cross-sell-title {
      font-size: 14px; font-weight: 800; line-height: 1.45;
      margin: 0; color: var(--w-text);
    }

    /* ========== FOOTER CTA ========== */
    .wb-footer-cta {
      padding: clamp(64px, 10vw, 120px) clamp(20px, 4vw, 48px);
      background:
        radial-gradient(ellipse 80% 60% at 50% 0%, rgba(18, 163, 125, 0.08), transparent 60%),
        #fafaf7;
      border-top: 1px solid var(--w-border);
      text-align: center;
    }
    .wb-footer-cta-h {
      font-size: clamp(24px, 3.4vw, 36px); font-weight: 900;
      letter-spacing: -0.025em; margin: 0 0 12px;
    }
    .wb-footer-cta-h em {
      font-style: normal;
      background: linear-gradient(135deg, var(--w-green), var(--w-cyan));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .wb-footer-cta-p {
      font-size: 15px; color: var(--w-sub); line-height: 1.7;
      max-width: 520px; margin: 0 auto 28px;
    }
  `
}
