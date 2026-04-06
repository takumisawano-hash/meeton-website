# Design System: Meeton AI — Complete Reference

## 1. Visual Theme & Atmosphere

Meeton AI employs a light-mode-native aesthetic built on pure white (#ffffff), where content is structured through subtle cool-gray surfaces and generous whitespace. The design projects trust, sophistication, and technical precision — befitting an AI SDR platform targeting B2B enterprise buyers.

The visual language combines Japanese typography (Noto Sans JP) for body text with Plus Jakarta Sans for display elements, creating a bilingual design system that feels native in both languages. JetBrains Mono provides a technical, data-driven feel for labels, stats, and badges.

Color usage is deliberately restrained: the primary CTA green (#12a37d) conveys growth and action, while the accent purple (#7c5cfc) adds premium tech character. Each product feature has a dedicated color identity (green, blue, cyan, purple) that persists across homepage cards, navigation, and dedicated feature pages.

Depth is communicated through subtle box-shadows and border treatments rather than heavy elevation. Hover interactions use translateY lifts with expanded shadows. Decorative elements include dot-grid backgrounds and blurred glow orbs — always at low opacity to suggest ambient intelligence without visual noise.

**Core Characteristics:**
- Light-mode-native: #ffffff base, #f4f6fb surfaces, #eaedfa elevated surfaces
- Bilingual font stack: Noto Sans JP + Plus Jakarta Sans body, JetBrains Mono mono
- Weight 900 for headlines, 700 for emphasis, 600 for body
- Negative letter-spacing at display sizes (-2.5px at 72px, -0.5px at 48px)
- Green CTA (#12a37d) as primary action color
- Purple accent (#7c5cfc) as secondary brand element
- 4 product colors: green (#12a37d), blue (#3b6ff5), cyan (#0891b2), purple (#7c5cfc)
- Subtle box-shadows, never heavy drop-shadows
- Dot-grid and glow-orb decorative patterns at low opacity
- Smooth cubic-bezier(.16,1,.3,1) easing on all transitions

## 2. Color Palette & Roles

### Background Surfaces
- **Base White** (#ffffff / `--bg`): Default page background
- **Surface** (#f4f6fb / `--surface`): Section backgrounds, alternating sections
- **Surface 2** (#eaedfa / `--surface2`): Elevated surface, nested containers

### Text & Content
- **Heading** (#0f1128 / `--heading`): All headlines, near-black
- **Body Text** (#4a506e / `--text`): Default body copy, cool dark gray
- **Subtext** (#6e7494 / `--sub`): Subtitles, descriptions, secondary text

### Primary CTA (Green)
- **CTA** (#12a37d / `--cta`): Primary buttons, links, active states
- **CTA Hover** (#0fc19a / `--cta-hover`): Hover state, lighter green
- **CTA Glow** (rgba(18,163,125,.25) / `--cta-glow`): Button shadow
- **CTA Light** (#e5f8f2 / `--cta-light`): Ghost button hover bg, light badges

### Accent (Purple)
- **Accent** (#7c5cfc / `--accent`): Section labels, secondary emphasis
- **Accent Light** (#f0ecfe / `--accent-light`): Light badge backgrounds
- **Accent Glow** (rgba(124,92,252,.2) / `--accent-glow`): Decorative glow

### Product Feature Colors
- **Blue** (#3b6ff5 / `--blue`): AI Email product — trust, communication
- **Blue Light** (#eaf0fe / `--blue-light`): Blue badges, light backgrounds
- **Cyan** (#0891b2 / `--cyan`): AI Calendar product — action, scheduling
- **Pink** (#d03ea1 / `--pink`): Sparingly used for differentiation
- **Red** (#e0475b / `--red`): Hot lead indicators, urgency, alerts

### Border & Divider
- **Border** (#dfe3f0 / `--border`): Default borders, dividers
- **Border 2** (#c8cedf / `--border2`): Stronger borders, ghost button outline

### Product Color Map
| Product | Primary | Gradient | Light BG |
|---------|---------|----------|----------|
| AI Chat | #12a37d | linear-gradient(135deg,#12a37d,#0fc19a) | #edfcf7 |
| AI Email | #3b6ff5 | linear-gradient(135deg,#3b6ff5,#6690fa) | #eaf0fe |
| AI Calendar | #0891b2 | linear-gradient(135deg,#0891b2,#06b6d4) | #ecfeff |
| AI Offer | #7c5cfc | linear-gradient(135deg,#7c5cfc,#a78bfa) | #f0ecfe |

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
