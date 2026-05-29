# Design System: Meeton AI — Complete Reference

> **v2 re-skin — 2026-05-29.** This section supersedes the previous
> white-native + purple palette. Brand hex extracted from the logo:
> navy `#0F1128`, green `#07CB79`. Tokens live in `app/layout.tsx :root`.

## 1. Visual Theme & Atmosphere

Three colors do three jobs (spec §3.8). **Navy is the frame, white is the canvas, green is the only accent. Purple is removed.**

- **Navy (`#0F1128`) = authority / trust.** Used as a *frame*: the global header/nav, hero backgrounds, full-bleed section bands, the footer, and dark CTA surfaces. It says "this is a serious platform."
- **White (`#ffffff`) = where decisions happen.** Every reading/deciding/data surface is white: product-LP body copy, blog/article bodies, cards, pricing tables, comparison tables, forms, the product UI and dashboard. **Never set long-form text on a dark background** — it costs the #1 KPI (SEO/AEO long-form readability, dwell, CVR).
- **Green (`#07CB79`) = action / energy.** The single accent: CTA buttons, links, success states, highlights, and pale-green wash panels. One green token only — no second green.

The color *itself* communicates function: navy = trust, white = the place a decision is made, green = the action to take.

Atmosphere: generous whitespace, data-forward, rounded cards, clear type hierarchy. Depth via subtle shadows + borders, not heavy elevation. The deck's mockups (chat bubbles, calendar, document cards) set the tone — keep deck → site → product consistent.

**Core Characteristics:**
- Navy frame / white canvas / green accent. No purple, no per-product hues.
- Bilingual font stack: system JP (Hiragino/Noto CJK) + Inter / Plus Jakarta Sans display, JetBrains Mono mono
- Green is a *signature* color, not a ground color — accent it on navy/white, don't pave large areas with it (pale-green washes are fine).
- WCAG: small green text on white fails contrast → use `--cta-ink` (#067A48) or underline for thin links; reserve `--cta` for buttons / large emphasis / icons.
- Two logo variants: `logo.svg` (white wordmark, for navy surfaces) / `logo-dark.svg` (navy wordmark, for white surfaces). The mark stays green in both.
- Smooth cubic-bezier(.16,1,.3,1) easing on transitions.

## 2. Color Palette & Roles

### Canvas — white side (reading & deciding)
- **Base White** (#ffffff / `--bg`): default page background, the reading surface
- **Surface** (#F6F8FB / `--surface`): alternating section background (cool neutral)
- **Surface 2** (#EDF1F8 / `--surface2`): elevated / nested containers
- **Heading** (#0F1128 / `--heading`): headlines — brand navy
- **Body** (#3F4763 / `--text`): default body copy, cool gray
- **Subtext** (#6B7390 / `--sub`): subtitles, secondary text
- **Border** (#E4E8F2 / `--border`) · **Border 2** (#D2D8E6 / `--border2`)

### Navy — frame side (authority surfaces)
- **Navy** (#0F1128 / `--navy`): header/nav, hero bg, footer, dark CTA
- **Navy 2** (#171A36 / `--navy-2`): elevated navy band
- **Navy 3** (#22264B / `--navy-3`): card-on-navy / hover
- **Navy Deep** (#0A0B1E / `--navy-deep`): deepest (footer base)
- **On Navy** (#FFFFFF / `--on-navy`): text on navy
- **On Navy Sub** (#AEB4D6 / `--on-navy-sub`): muted text on navy
- **On Navy Border** (rgba(255,255,255,.12) / `--on-navy-border`)
- **On Navy Surface** (rgba(255,255,255,.05) / `--on-navy-surface`)

### Green — the single accent (action)
- **CTA** (#07CB79 / `--cta`): primary buttons, accent, success, links-on-navy
- **CTA Hover** (#0BD986 / `--cta-hover`) · **CTA Press** (#06B86D / `--cta-press`)
- **CTA Ink** (#067A48 / `--cta-ink`): small text/links on white (WCAG-safe)
- **CTA Light** (#E7FBF1 / `--cta-light`) · **CTA Wash** (#F2FCF7 / `--cta-wash`): pale-green highlight panels
- **CTA Glow** (rgba(7,203,121,.28) / `--cta-glow`): button shadow

### Compat / legacy (do not use in v2 work)
- `--accent` / `--accent-light` / `--accent-glow`: repointed from purple to **navy** for back-compat on un-migrated pages.
- `--blue` `--cyan` `--pink`: DEPRECATED legacy product hues, only on pages pending rebuild/301. Differentiate products via navy/green + icon, not hue.
- **Red** (#e0475b / `--red`): retained for hot-lead / urgency indicators only.

## 3. Typography Rules

### Font Families
- **Display** (`--fd`): 'Plus Jakarta Sans', sans-serif — headlines, hero text
- **Body** (`--fb`): 'Noto Sans JP', 'Plus Jakarta Sans', sans-serif — body text, buttons, UI
- **Mono** (`--fm`): 'JetBrains Mono', monospace — labels, badges, stats, numbers

### Hierarchy

| Role | Size | Weight | Line Height | Letter Spacing | Font |
|------|------|--------|-------------|----------------|------|
| Hero H1 | clamp(32px,7vw,72px) | 900 | 1.15 | -2.5px | Display |
| Section Title | clamp(28px,5vw,48px) | 900 | 1.2 | -0.5px | Body |
| Card Title | clamp(20px,3vw,26px) | 900 | 1.3 | -0.3px | Body |
| Phase Heading | clamp(24px,4vw,32px) | 900 | 1.25 | -0.5px | Body |
| Hero Subtitle | clamp(16px,3vw,22px) | 400 | 1.8 | normal | Body |
| Section Subtitle | clamp(15px,2.5vw,19px) | 400 | 1.85 | normal | Body |
| Body | 18px | 400 | 1.8 | normal | Body |
| Card Description | 15px | 400 | 1.8 | normal | Body |
| Feature Item | 14px | 600 | normal | normal | Body |
| Section Label | 12px | 700 | normal | 3px | Mono |
| Badge/Tag | 11px | 700 | normal | 2px | Mono |
| Stat Value | clamp(36px,6vw,52px) | 700 | normal | -1px | Mono |
| Stat Label | clamp(13px,2vw,15px) | 600 | normal | normal | Body |
| Small UI | 13px | 700 | normal | normal | Body |

### Principles
- Weight 900 is reserved for headlines only — it creates impact
- Weight 700 for emphasis (buttons, feature items, stat values)
- Weight 600 for semi-emphasis (stat labels, links)
- JetBrains Mono for anything data-driven: stats, labels, badges, numbers
- Noto Sans JP ensures Japanese text renders crisply with proper metrics
- `clamp()` functions create fluid typography — no hard breakpoint jumps
- Hero text uses gradient text-fill for `<em>` elements (CTA → blue)
- `-webkit-font-smoothing: antialiased` globally for crisp rendering

## 4. Component Stylings

### Buttons

**CTA Button (Primary)**
- Background: linear-gradient(135deg, #12a37d, #0fc19a)
- Text: #ffffff, 15px, weight 700
- Padding: 12px 26px
- Radius: 10px
- Shadow: 0 4px 16px rgba(18,163,125,.25)
- Hover: translateY(-2px), shadow expands to 0 8px 28px

**CTA Button Large**
- Same as CTA but padding: 18px 40px, font-size: 18px
- Shadow: 0 6px 28px rgba(18,163,125,.25)

**Ghost Button**
- Background: transparent
- Text: #0f1128, 18px, weight 700
- Border: 2px solid #c8cedf
- Padding: 16px 38px
- Radius: 10px
- Hover: border-color → #12a37d, color → #12a37d, bg → #e5f8f2

### Cards

**Category Card**
- Background: #ffffff
- Border: 1px solid #dfe3f0
- Radius: 24px
- Padding: 36px 32px
- Shadow: 0 2px 8px rgba(0,0,0,.03)
- Hover: translateY(-6px), shadow 0 16px 48px rgba(18,163,125,.12), border transparent
- Top accent bar: 3px gradient, opacity 0 → 1 on hover

**Why Card**
- Background: #ffffff
- Border: 1px solid #dfe3f0
- Radius: 16px
- Padding: 28px
- Shadow: 0 2px 8px rgba(0,0,0,.03)
- Hover: translateY(-4px), shadow 0 12px 40px rgba(18,163,125,.1)
- Top accent: 3px gradient(CTA → accent), opacity 0 → 1 on hover

**Use Case Card**
- Background: #ffffff
- Border: 1px solid #dfe3f0
- Radius: 20px
- Padding: 28px
- Hover: translateY(-4px), shadow with product color

### Badges & Labels

**Section Label**
- Font: JetBrains Mono, 12px, weight 700
- Color: #7c5cfc (accent)
- Letter-spacing: 3px
- Text-transform: uppercase

**Hero Badge**
- Background: linear-gradient(135deg, #e5f8f2, #f0ecfe)
- Border: 1px solid rgba(18,163,125,.15)
- Padding: 9px 22px
- Radius: 24px
- Text: #12a37d, 15px, weight 700
- Includes pulsing dot (7px, #12a37d)

**Feature Tag (Phase Tag)**
- Background: {product-color}10 (10% opacity)
- Color: {product-color}
- Padding: 5px 14px
- Radius: 20px
- Font: JetBrains Mono, 11px, weight 700, letter-spacing 2px, uppercase

**Tool Chip**
- Font-size: 11px, weight 700
- Padding: 3px 8px
- Radius: 6px
- Background: {color}10
- Color: {color}

### Navigation
- Sticky header with white background + backdrop-filter blur
- Height varies: desktop ~64px
- Links: body font, 15px weight 600
- Features dropdown with product labels + Japanese sub-labels
- CTA buttons in header match global CTA style
- Mobile: hamburger menu

### FAQ Accordion
- Container: 1px solid #dfe3f0, radius 14px
- Question: 18px weight 700, color #0f1128
- Answer: 16px weight 400, line-height 1.8, color #6e7494
- Toggle: 28px circle, surface bg, rotates 45deg on open
- Open state: toggle bg → #e5f8f2, color → #12a37d

### Phase Rows (Feature Detail)
- Alternating left/right layout (`.reverse` flips direction)
- Gap: clamp(32px,6vw,64px)
- Visual panel: max-width 440px, aspect-ratio 4/3, radius 20px, subtle shadow
- Feature dots: 7px circles in product color

## 5. Layout Principles

### Spacing System
- Section padding: clamp(60px,10vw,100px) vertical, clamp(16px,5vw,48px) horizontal
- Max content width: 1140px, centered with auto margins
- Card gap: 24px (grid), 14px (button groups)
- Margin between title and subtitle: 18px
- Margin between subtitle and content: 44-56px

### Grid Patterns
- **Homepage product cards**: 2-column grid (phase-grid)
- **Category overview**: 3-column grid (cat-grid) or 4-column grid
- **Why cards**: 4-column grid
- **Use case cards**: 3-column grid
- **Feature detail rows**: single column, alternating visual side

### Hero Layout
- Center-aligned, max-width 860px
- Badge → H1 → Subtitle → CTAs → Stats (separated by border-top)
- Feature pages: split layout (text left, visual right), max-width 1200px

### Whitespace Philosophy
Generous vertical padding between sections (80-100px on desktop). White background serves as natural section separator. Alternating sections use #f4f6fb surface to create rhythm. Dot-grid backgrounds at very low opacity (0.3) add subtle texture without competing with content.

### Border Radius Scale
- Small UI: 6px (tool chips, score bars)
- Buttons: 10px
- Inputs/FAQ: 14px
- Cards (standard): 16px
- Phase visuals: 20px
- Feature cards: 24px
- Badges/pills: 24px (small) or 9999px (full pill)
- Circle: 50% (dots, avatars, toggles)

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (0) | No shadow | Default surface |
| Subtle (1) | 0 2px 8px rgba(0,0,0,.03) | Cards at rest |
| Hover (2) | 0 12-16px 40-48px rgba(18,163,125,.1-.12) | Cards on hover |
| Visual Panel (3) | 0 8px 40px rgba(0,0,0,.06) | Feature visual mockups |
| Dashboard (4) | 0 20px 60px rgba(0,0,0,.08), 0 1px 3px rgba(0,0,0,.04) | Hero dashboard mockup |
| Glow (decorative) | filter: blur(100px) | Background glow orbs |
| CTA Shadow | 0 4-6px 16-28px rgba(18,163,125,.25) | Primary buttons |

**Shadow Philosophy**: Shadows are always subtle and cool-toned. On hover, shadows expand and shift to brand-colored tints (green glow). Elevation is primarily communicated through translateY lifts combined with shadow expansion. Decorative glow orbs use filter:blur(100px) at 10-20% opacity.

## 7. Do's and Don'ts

### Do
- Use Noto Sans JP as primary body font for Japanese text
- Use Plus Jakarta Sans for display/headline text
- Use JetBrains Mono for all stats, labels, badges, and data
- Apply weight 900 for all headlines and titles
- Use clamp() for fluid typography scaling
- Apply gradient text-fill for emphasized words in hero headlines
- Use product-specific colors consistently across all touchpoints
- Keep card hover effects: translateY(-4 to -6px) + shadow expansion
- Use dot-grid backgrounds at 0.3 opacity for texture
- Use cubic-bezier(.16,1,.3,1) for smooth, snappy animations
- Keep section labels in uppercase JetBrains Mono with letter-spacing 3px
- Maintain 1140px max-width for content containers

### Don't
- Don't use pure black (#000000) for text — always use #0f1128
- Don't use heavy drop shadows — keep shadows subtle and translucent
- Don't mix product colors across unrelated features
- Don't use more than 2 colors per section (product color + neutral)
- Don't apply animation delays beyond 0.68s — content should appear quickly
- Don't use borders heavier than 2px (reserved for ghost button outline)
- Don't use letter-spacing on body text — only on display (negative) and labels (positive)
- Don't create sections without adequate vertical padding (minimum 60px)
- Don't use background colors outside the defined surface palette
- Don't use icons without consistent 24px viewBox and 2px stroke

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <480px | Single column, compact padding, scaled visuals |
| Tablet | 480-768px | 1-2 column grids, stacked hero |
| Desktop Small | 768-1024px | Full grids begin, split hero layout |
| Desktop | >1024px | Standard layout, all features visible |

### Collapsing Strategy
- Hero H1: 72px → 32px via clamp(32px,7vw,72px)
- Section titles: 48px → 28px via clamp(28px,5vw,48px)
- Hero: centered layout throughout; feature pages: split → stacked at 1024px
- Product cards: 2-column → 1-column at 768px (max-width 560px centered)
- Category cards: 3-column → 1-column at 768px
- Why cards: 4-column → 2-column (1024px) → 1-column (768px)
- Use case cards: 3-column → 1-column at 768px
- Phase rows: side-by-side → stacked at 1024px
- Hero CTAs: row → column at 768px (stretch, max-width 300px)
- Stats: row with wrapping, gap shrinks on mobile
- Section padding: 100px → 60px vertical, 48px → 16px horizontal
- Phase visuals: max-width 100%, aspect-ratio adjusts to 1/1.2 (768px) → 1/1.4 (480px)
- Flow steps: row → wrap at 1024px → 2-col (768px) → 1-col (480px)

### Mobile-Specific
- Hero min-height removed (auto) below 768px
- Buttons go full-width below 768px
- FAQ question padding and font-size reduced
- Phase visual content scales to 0.78 at 480px
- Navigation collapses to hamburger menu

## 9. Agent Prompt Guide

### Quick Color Reference
- Page Background: #ffffff
- Surface: #f4f6fb
- Heading Text: #0f1128
- Body Text: #4a506e
- Subtext: #6e7494
- Primary CTA: #12a37d → #0fc19a gradient
- Accent: #7c5cfc
- Blue: #3b6ff5
- Cyan: #0891b2
- Border: #dfe3f0
- Strong Border: #c8cedf
- AI Chat color: #12a37d
- AI Email color: #3b6ff5
- AI Calendar color: #0891b2
- AI Offer color: #7c5cfc

### Component Prompt Examples

"Create a section on #f4f6fb: section label in JetBrains Mono 12px weight 700 color #7c5cfc uppercase letter-spacing 3px. Title in 48px weight 900 color #0f1128 letter-spacing -0.5px. Subtitle 19px weight 400 line-height 1.85 color #6e7494 max-width 660px centered."

"Design a product card: #ffffff background, 1px solid #dfe3f0 border, 24px radius, 36px 32px padding. On hover: translateY(-6px), box-shadow 0 16px 48px rgba(18,163,125,.12), border transparent. Top accent bar: 3px linear-gradient(135deg, #12a37d, #0fc19a) visible on hover."

"Build a CTA button: linear-gradient(135deg, #12a37d, #0fc19a) background, white text, 18px weight 700 Noto Sans JP, 18px 40px padding, 10px radius, box-shadow 0 6px 28px rgba(18,163,125,.25). Hover: translateY(-2px), shadow expands."

"Create a hero badge: linear-gradient(135deg, #e5f8f2, #f0ecfe) background, 1px solid rgba(18,163,125,.15), 24px radius, 9px 22px padding. Text #12a37d 15px weight 700. Include 7px pulsing green dot."

"Build a FAQ accordion: items with 1px solid #dfe3f0 border, 14px radius. Question 18px weight 700 color #0f1128. Toggle is 28px circle with #f4f6fb bg, rotates 45deg when open, bg changes to #e5f8f2 with #12a37d color."

### Animation Reference
- Entry: fadeUp 0.8s cubic-bezier(.16,1,.3,1) with staggered delays (0.1s increments)
- Hover: 0.25-0.35s transitions
- Chat pop: chatPop 0.4s for sequential message appearance
- Slide in: slideIn 0.5s for horizontal entry
- Pulse: 1.5-2s infinite for status dots
- Easing: always cubic-bezier(.16,1,.3,1) — never linear or ease

### Iteration Guide
1. Always set font-family to Noto Sans JP for body, Plus Jakarta Sans for display
2. JetBrains Mono for anything numeric, label-like, or technical
3. Use clamp() for all typography sizing — never hardcode breakpoint-specific sizes
4. Section rhythm: label (mono uppercase) → title (900 weight) → subtitle → content
5. Product color consistency: each feature owns one color across all pages
6. Cards always have: border, radius, subtle rest shadow, hover lift + shadow expand
7. Decorative patterns (dot-grid, glow) stay at <=30% opacity
8. CTA buttons always use gradient, never flat color
9. All transitions use the signature cubic-bezier(.16,1,.3,1) easing
10. Japanese text should look natural — test line-height at 1.8+ for readability
