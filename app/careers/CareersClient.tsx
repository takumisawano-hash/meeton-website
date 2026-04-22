'use client'

import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ApplyModal, { type ApplyModalJob } from "./ApplyModal";

type Dept = "All" | "Engineering" | "Sales" | "CS" | "Marketing" | "Open";

type Job = {
  id: string;
  dept: Exclude<Dept, "All">;
  title: string;
  subtitle?: string;
  pitch: string;
  tags: string[];
  /** Open/general positions — shown in the apply modal only, not in the
   * public position list. For candidates who don't fit a specific role. */
  hiddenFromList?: boolean;
};

const jobs: Job[] = [
  {
    id: "DM-001",
    dept: "Engineering",
    title: "シニアエンジニア",
    subtitle: "Full-stack / AI",
    pitch:
      "Meeton ai のコアを一緒に育てる。LLM とプロダクトの境界を自ら設計し、機能ではなく体験を世に出す。仕様書を実装する人ではなく、何を作るべきかから決められる人へ。",
    tags: ["TypeScript", "Python", "LLM", "評価設計"],
  },
  {
    id: "DM-002",
    dept: "Sales",
    title: "アカウントエグゼクティブ",
    subtitle: "Enterprise",
    pitch:
      "まだ名前のないカテゴリを、自分の言葉で説明して売る。顧客の課題をプロダクトに翻訳し、プロダクトの価値を顧客に翻訳する。営業を「実行職」ではなく「戦略職」として再定義したい人へ。",
    tags: ["Enterprise", "SaaS", "カテゴリ創造"],
  },
  {
    id: "DM-003",
    dept: "Sales",
    title: "インサイドセールス",
    pitch:
      "自社でも Meeton ai を使い倒しながら、AI と人間の最適分業を設計する。量をこなすセールスではなく、AI に任せられる範囲を広げ続け、判断の質で成果を出すチームを作る。",
    tags: ["IS", "AI 協働", "商談化率"],
  },
  {
    id: "DM-004",
    dept: "CS",
    title: "カスタマーサクセス",
    pitch:
      "導入企業の AI SDR 運用を伴走し、商談化率 40〜80% という成果を再現可能にする。マニュアル通りに支援する人ではなく、顧客と一緒にベストプラクティスを発明できる人を探している。",
    tags: ["Onboarding", "ヘルススコア", "継続率"],
  },
  {
    id: "DM-005",
    dept: "Marketing",
    title: "マーケティング",
    subtitle: "Brand / Demand",
    pitch:
      "新しいカテゴリを市場に定着させる責任を持つ。コンテンツ・ブランド・デマンドジェネレーション・パートナーシップを横断し、Meeton ai を業界の標準語にしていく。",
    tags: ["Brand", "Content", "Demand Gen"],
  },
  // Open positions — shown only in the apply-form dropdown for candidates
  // who don't fit a specific role yet.
  {
    id: "DM-OPEN-BIZ",
    dept: "Open",
    title: "オープンポジション（ビジネス系）",
    pitch: "ビジネス系のオープン応募枠。",
    tags: [],
    hiddenFromList: true,
  },
  {
    id: "DM-OPEN-ENG",
    dept: "Open",
    title: "オープンポジション（エンジニア系）",
    pitch: "エンジニア系のオープン応募枠。",
    tags: [],
    hiddenFromList: true,
  },
];

const proof = [
  {
    label: "OLD",
    title: "電話・メールでの追客",
    metric: "42時間",
    detail: "初動対応までにかかっていた平均時間",
  },
  {
    label: "NEW",
    title: "AI SDR の自律応答",
    metric: "5秒",
    detail: "Meeton ai が同じ仕事を終わらせる時間",
  },
  {
    label: "RESULT",
    title: "商談化率の変化",
    metric: "40–80%",
    detail: "導入企業で再現されている成果レンジ",
  },
];

const bentos = [
  {
    size: "lg",
    eyebrow: "01 / EQUITY",
    title: "Pre-Series A の当事者権",
    body: "会社が 10 倍になる前のメンバーとして、意思決定とストックオプションの双方にアクセスできる。",
  },
  {
    size: "sm",
    eyebrow: "02 / TOOLS",
    title: "AI ツールは全支給",
    body: "Claude / Cursor / ChatGPT Enterprise / Gemini ほか、最先端ツールを会社負担で。",
  },
  {
    size: "sm",
    eyebrow: "03 / IMPACT",
    title: "1 人の影響力",
    body: "小さなチームだからこそ、一人の選択がプロダクトと会社の輪郭を決める。",
  },
  {
    size: "md",
    eyebrow: "04 / SPEED",
    title: "議論は15分、実装は翌日",
    body: "ルールではなくプリンシプル。スピードは文化で、プロセスで守るものではない。",
  },
  {
    size: "md",
    eyebrow: "05 / CUSTOMER",
    title: "毎週、顧客と話す距離感",
    body: "成果が出た瞬間に立ち会える仕事。導入企業のリアルが、意思決定の素材になる。",
  },
  {
    size: "lg",
    eyebrow: "06 / GLOBAL",
    title: "日本語と英語が、同じ会議で飛び交う。",
    body: "社内は日英ハイブリッド。海外メンバーと日本メンバーが同じ Slack で議論し、日本発のカテゴリを最初からアジア・世界の文脈で設計する。「英語環境で働きたい」も「日本語で深く議論したい」も、両方叶う環境。",
  },
];

const processSteps = [
  { num: "01", title: "カジュアル面談", desc: "まずは 30 分、互いの温度を合わせる。" },
  { num: "02", title: "スキル面接", desc: "職種に応じた実践課題 or ディスカッション。" },
  { num: "03", title: "最終面接", desc: "CEO / CTO とビジョンを交換する時間。" },
  { num: "04", title: "オファー", desc: "最短 1 週間。条件は透明に開示。" },
];

const marqueeItems = [
  "G-gen", "Univis", "BizteX", "Salesforce 連携", "HubSpot 連携",
  "Slack 連携", "Microsoft Teams", "Google Calendar", "Zoom",
  "Marketo 連携", "Oracle Eloqua",
];

const css = `
:root {
  --bg: #fafaf7;
  --bg-soft: #f3f2ed;
  --surface: #ffffff;
  --surface-hi: #f7f6f1;
  --line: #e4e3dd;
  --line-hi: #cfcec6;
  --ink: #0a0e0c;
  --ink-soft: #3d4541;
  --ink-mute: #82897f;
  --accent: #0eab6e;
  --accent-hi: #12a37d;
  --accent-deep: #065f46;
  --accent-glow: rgba(14,171,110,0.18);
  --dark-bg: #0a0e0c;
  --dark-ink: #f5f5f2;
  --fb: var(--font-noto), 'Noto Sans JP', system-ui, sans-serif;
  --fm: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
}

.careers-root {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--fb);
  font-weight: 400;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  position: relative;
}
.careers-root a { color: inherit; text-decoration: none; }
.careers-root .mono { font-family: var(--fm); }

/* Noise texture overlay — subtle grain on light bg */
.careers-root::before {
  content: '';
  position: fixed; inset: 0; pointer-events: none; z-index: 1;
  opacity: 0.04;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.section {
  padding: clamp(80px, 10vw, 140px) clamp(20px, 4vw, 56px);
  position: relative;
  z-index: 2;
}
.inner { max-width: 1280px; margin: 0 auto; position: relative; }
.eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--fm);
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 24px;
}
.eyebrow::before {
  content: ''; width: 20px; height: 1px; background: var(--accent);
}

/* ============ HERO ============ */
.hero {
  min-height: 100vh;
  padding: clamp(140px, 18vw, 200px) clamp(20px, 4vw, 56px) clamp(60px, 8vw, 100px);
  position: relative; overflow: hidden;
  display: flex; flex-direction: column; justify-content: space-between;
  z-index: 2;
}
.hero-mesh {
  position: absolute; inset: -20% -10% auto auto;
  width: 70vw; height: 70vw; max-width: 900px; max-height: 900px;
  background:
    radial-gradient(circle at 30% 30%, rgba(14,171,110,0.28), transparent 55%),
    radial-gradient(circle at 70% 60%, rgba(59,111,245,0.10), transparent 55%),
    radial-gradient(circle at 55% 50%, rgba(14,171,110,0.14), transparent 60%);
  filter: blur(80px);
  pointer-events: none;
  animation: heroMesh 14s ease-in-out infinite alternate;
}
.hero-mesh.l {
  inset: auto auto -30% -20%;
  background:
    radial-gradient(circle at 40% 40%, rgba(59,111,245,0.14), transparent 55%),
    radial-gradient(circle at 60% 60%, rgba(14,171,110,0.10), transparent 55%);
}
@keyframes heroMesh {
  0% { transform: translate(0,0) scale(1); }
  100% { transform: translate(-8%, 6%) scale(1.1); }
}
.hero-grid-overlay {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(10,14,12,0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(10,14,12,0.035) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(ellipse at 50% 40%, black 40%, transparent 80%);
}
.hero-inner { max-width: 1280px; margin: 0 auto; width: 100%; position: relative; z-index: 2; }
.hero-eyebrow-pill {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 6px 14px;
  border: 1px solid rgba(14,171,110,0.25);
  background: var(--accent-glow);
  color: var(--accent-deep);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 40px;
  font-family: var(--fm);
}
.hero-eyebrow-pill .dot {
  width: 6px; height: 6px; background: var(--accent);
  border-radius: 50%; animation: pulseDot 2s ease-in-out infinite;
  box-shadow: 0 0 8px var(--accent);
}
@keyframes pulseDot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.35); }
}
.hero h1 {
  font-family: var(--fb);
  font-weight: 900;
  font-size: clamp(52px, 9vw, 148px);
  line-height: 0.95;
  letter-spacing: -0.055em;
  margin-bottom: 36px;
  color: var(--ink);
  word-break: keep-all; overflow-wrap: break-word;
}
.hero h1 .accent { color: var(--accent-deep); }
.hero h1 .outline {
  color: transparent;
  -webkit-text-stroke: 1.5px var(--ink);
}
.hero h1 .hl {
  background: linear-gradient(180deg, transparent 64%, rgba(14,171,110,0.22) 64%);
  padding: 0 4px;
}
.hero-sub {
  font-size: clamp(15px, 1.3vw, 18px);
  line-height: 1.85;
  color: var(--ink-soft);
  max-width: 620px;
  margin-bottom: 48px;
}
.hero-actions { display: flex; flex-wrap: wrap; gap: 16px; align-items: center; }
.careers-root a.btn-primary {
  background: var(--ink);
  color: var(--bg);
  padding: 18px 28px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 700;
  display: inline-flex; align-items: center; gap: 12px;
  transition: all 0.3s;
  border: 1px solid var(--ink);
}
.careers-root a.btn-primary:hover {
  background: var(--accent-deep);
  border-color: var(--accent-deep);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px -8px rgba(6,95,70,0.35);
}
.btn-secondary {
  color: var(--ink);
  font-size: 14px;
  display: inline-flex; align-items: center; gap: 10px;
  padding: 18px 24px;
  border-radius: 999px;
  border: 1px solid var(--line-hi);
  transition: all 0.2s;
  background: var(--surface);
}
.btn-secondary:hover { border-color: var(--ink); background: var(--bg-soft); }

/* Marquee */
.marquee {
  position: relative;
  overflow: hidden;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding: 24px 0;
  margin-top: clamp(80px, 10vw, 120px);
  background: var(--bg-soft);
}
.marquee-track {
  display: flex; gap: 48px; white-space: nowrap;
  animation: marquee 40s linear infinite;
  width: fit-content;
}
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.marquee-item {
  font-family: var(--fm);
  font-size: 14px;
  color: var(--ink-mute);
  letter-spacing: 0.04em;
  display: inline-flex; align-items: center; gap: 12px;
}
.marquee-item::before {
  content: '◆';
  color: var(--accent);
  font-size: 10px;
}

/* ============ STATS ============ */
.stats {
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: var(--surface);
}
.stats-inner {
  max-width: 1280px; margin: 0 auto;
  padding: clamp(40px, 5vw, 56px) clamp(20px, 4vw, 56px);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
}
.stat {
  padding: 0 clamp(16px, 2.5vw, 32px);
  border-right: 1px solid var(--line);
}
.stat:last-child { border-right: none; }
.stat:first-child { padding-left: 0; }
.stat-label {
  font-family: var(--fm);
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--ink-mute);
  text-transform: uppercase;
  margin-bottom: 16px;
}
.stat-num {
  font-family: var(--fb);
  font-weight: 900;
  font-size: clamp(36px, 4vw, 56px);
  line-height: 1;
  letter-spacing: -0.04em;
  margin-bottom: 12px;
  color: var(--ink);
}
.stat-num .unit {
  font-size: 0.45em;
  color: var(--ink-mute);
  margin-left: 4px;
  font-weight: 500;
}
.stat-num .arrow {
  color: var(--accent);
  margin: 0 8px;
  font-weight: 700;
  font-size: 0.55em;
}
.stat-desc { font-size: 13px; color: var(--ink-soft); line-height: 1.6; }

/* ============ SECTION HEAD ============ */
.head-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: clamp(40px, 6vw, 80px);
  margin-bottom: 64px;
  align-items: start;
}
.head-left { padding-top: 8px; }
.head-title {
  font-weight: 900;
  font-size: clamp(32px, 4.6vw, 64px);
  line-height: 1.15;
  letter-spacing: -0.04em;
  word-break: keep-all;
  overflow-wrap: break-word;
}
.head-title .accent { color: var(--accent); }
.head-sub {
  font-size: 16px;
  color: var(--ink-soft);
  line-height: 1.9;
  margin-top: 24px;
  max-width: 620px;
}

/* ============ MISSION ============ */
.mission-block {
  border-top: 1px solid var(--line);
  padding-top: 48px;
}
.mission-statement {
  font-weight: 900;
  font-size: clamp(32px, 4.5vw, 64px);
  line-height: 1.15;
  letter-spacing: -0.035em;
  margin-bottom: 48px;
}
.mission-statement .accent { color: var(--accent); }
.mission-statement .outline {
  color: transparent;
  -webkit-text-stroke: 1.5px var(--ink-soft);
}
.mission-columns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  padding-top: 32px;
  border-top: 1px solid var(--line);
}
.mission-col {
  font-size: 15px;
  line-height: 1.95;
  color: var(--ink-soft);
}
.mission-col strong {
  color: var(--ink);
  font-weight: 700;
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
  font-family: var(--fm);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* ============ PROOF ============ */
.proof-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  background: var(--line);
  border: 1px solid var(--line);
}
.proof-card {
  background: var(--surface);
  padding: clamp(32px, 3.5vw, 48px);
  transition: background 0.3s;
  display: flex; flex-direction: column; gap: 24px;
  min-height: 260px;
}
.proof-card:hover { background: var(--surface-hi); }
.proof-head { display: flex; align-items: baseline; justify-content: space-between; }
.proof-label {
  font-family: var(--fm);
  font-size: 10px;
  color: var(--accent-deep);
  background: var(--accent-glow);
  padding: 4px 10px;
  border-radius: 4px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
}
.proof-title {
  font-weight: 700;
  font-size: 17px;
  color: var(--ink);
  line-height: 1.5;
  letter-spacing: -0.01em;
}
.proof-metric {
  font-weight: 900;
  font-size: clamp(40px, 4.5vw, 64px);
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--accent-deep);
  margin-top: auto;
}
.proof-detail { font-size: 13px; color: var(--ink-soft); line-height: 1.7; margin-top: 8px; }

/* ============ POSITIONS ============ */
.positions-controls {
  display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end;
  gap: 32px;
  margin-bottom: 48px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--line);
}
.filter-pills { display: flex; flex-wrap: wrap; gap: 8px; }
.pill {
  padding: 9px 18px;
  border: 1px solid var(--line-hi);
  border-radius: 999px;
  font-size: 13px;
  color: var(--ink-soft);
  cursor: pointer;
  transition: all 0.2s;
  background: transparent;
  font-family: var(--fb);
}
.pill:hover { border-color: var(--ink); color: var(--ink); }
.pill.active {
  background: var(--accent); color: var(--bg); border-color: var(--accent);
  font-weight: 700;
}

.position-list {
  display: flex; flex-direction: column;
  border-top: 1px solid var(--line);
}
.position-row {
  display: grid;
  grid-template-columns: 80px 1.1fr 2.4fr 0.8fr 50px;
  gap: 24px;
  padding: 28px 0;
  border-bottom: 1px solid var(--line);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  align-items: center;
  position: relative;
  /* Button reset — .position-row is now a <button> for modal trigger */
  background: transparent;
  border-left: none;
  border-right: none;
  border-top: none;
  color: inherit;
  font: inherit;
  text-align: left;
  width: 100%;
}
.position-row::before {
  content: '';
  position: absolute;
  inset: 0 -16px;
  background: transparent;
  transition: background 0.3s;
  z-index: -1;
  border-radius: 6px;
}
.position-row:hover::before { background: var(--surface-hi); }
.position-row:hover .pos-arrow { background: var(--accent); color: var(--bg); transform: translate(4px, -4px) rotate(-45deg); }
.position-row:hover .pos-title { color: var(--accent); }
.pos-id {
  font-family: var(--fm);
  font-size: 12px;
  color: var(--ink-mute);
  letter-spacing: 0.05em;
}
.pos-dept-wrap { display: flex; flex-direction: column; gap: 6px; }
.pos-dept {
  font-family: var(--fm);
  font-size: 11px;
  color: var(--accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.pos-subtitle {
  font-family: var(--fm);
  font-size: 12px;
  color: var(--ink-mute);
}
.pos-title {
  font-weight: 800;
  font-size: clamp(20px, 1.9vw, 26px);
  color: var(--ink);
  letter-spacing: -0.02em;
  transition: color 0.3s;
  line-height: 1.3;
}
.pos-desc-mini {
  font-size: 13px;
  color: var(--ink-soft);
  line-height: 1.7;
  margin-top: 4px;
}
.pos-tags { display: flex; flex-wrap: wrap; gap: 6px; justify-content: flex-start; }
.pos-tag-mini {
  font-family: var(--fm);
  font-size: 10px;
  color: var(--ink-soft);
  padding: 4px 8px;
  border: 1px solid var(--line-hi);
  border-radius: 4px;
  letter-spacing: 0.03em;
}
.pos-arrow {
  width: 42px; height: 42px;
  background: var(--surface);
  border: 1px solid var(--line-hi);
  border-radius: 50%;
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 18px;
  transition: all 0.3s;
  flex-shrink: 0;
  justify-self: end;
  color: var(--ink);
}

/* ============ BENTO (WHY) ============ */
.bento {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: minmax(180px, auto);
  gap: 12px;
}
.bento-cell {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: clamp(24px, 2.5vw, 36px);
  position: relative; overflow: hidden;
  transition: all 0.3s;
  display: flex; flex-direction: column; justify-content: space-between;
}
.bento-cell:hover {
  border-color: var(--line-hi);
  background: var(--surface-hi);
  transform: translateY(-3px);
}
.bento-cell.sz-lg { grid-column: span 3; grid-row: span 2; }
.bento-cell.sz-md { grid-column: span 3; }
.bento-cell.sz-sm { grid-column: span 2; }
.bento-cell.first { background: linear-gradient(155deg, var(--surface) 0%, var(--surface) 60%, var(--accent-glow) 100%); }
.bento-cell.last { background: linear-gradient(215deg, var(--surface) 0%, var(--surface) 65%, rgba(59,111,245,0.10) 100%); }
.bento-meta {
  font-family: var(--fm);
  font-size: 11px;
  color: var(--accent);
  letter-spacing: 0.12em;
  margin-bottom: 24px;
}
.bento-title {
  font-weight: 800;
  font-size: clamp(22px, 2.4vw, 32px);
  line-height: 1.25;
  letter-spacing: -0.02em;
  margin-bottom: 14px;
  color: var(--ink);
}
.bento-body {
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.8;
  max-width: 520px;
}

/* ============ PROCESS ============ */
.process-track {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
.process-step {
  padding: clamp(28px, 3vw, 40px) clamp(20px, 2.5vw, 32px);
  border-right: 1px solid var(--line);
  position: relative;
  transition: background 0.3s;
}
.process-step:last-child { border-right: none; }
.process-step:hover { background: var(--surface); }
.process-num {
  font-family: var(--fm);
  font-size: 12px;
  color: var(--accent);
  letter-spacing: 0.1em;
  margin-bottom: 20px;
}
.process-title {
  font-weight: 800;
  font-size: 18px;
  color: var(--ink);
  margin-bottom: 10px;
  letter-spacing: -0.01em;
}
.process-desc {
  font-size: 13px;
  color: var(--ink-soft);
  line-height: 1.75;
}

/* ============ CLOSING — dark payoff block ============ */
.closing {
  padding: clamp(120px, 14vw, 200px) clamp(20px, 4vw, 56px);
  position: relative;
  overflow: hidden;
  text-align: center;
  z-index: 2;
  background: var(--dark-bg);
  color: var(--dark-ink);
}
.closing-mesh {
  position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(circle at 50% 50%, rgba(14,171,110,0.22) 0%, transparent 55%),
    radial-gradient(circle at 20% 70%, rgba(59,111,245,0.12) 0%, transparent 50%);
  filter: blur(40px);
}
.closing-inner { max-width: 1000px; margin: 0 auto; position: relative; z-index: 2; }
.closing-eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 6px 14px;
  background: rgba(14,171,110,0.14);
  color: #6fe3b2;
  border: 1px solid rgba(14,171,110,0.3);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 40px;
  font-family: var(--fm);
}
.closing h2 {
  font-weight: 900;
  font-size: clamp(42px, 7vw, 104px);
  line-height: 1.02;
  letter-spacing: -0.05em;
  margin-bottom: 40px;
  color: var(--dark-ink);
}
.closing h2 .accent { color: #6fe3b2; }
.closing h2 .outline {
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(245,245,242,0.4);
}
.closing-body {
  font-size: 17px;
  line-height: 1.9;
  color: rgba(245,245,242,0.72);
  max-width: 620px;
  margin: 0 auto 56px;
}
.careers-root a.closing-cta {
  display: inline-flex; align-items: center; gap: 16px;
  background: var(--dark-ink);
  color: var(--dark-bg);
  padding: 22px 44px;
  border-radius: 999px;
  font-size: 17px;
  font-weight: 800;
  transition: all 0.3s;
  border: 1px solid var(--dark-ink);
}
.careers-root a.closing-cta:hover {
  background: #6fe3b2;
  border-color: #6fe3b2;
  color: var(--dark-bg);
  transform: translateY(-3px);
  box-shadow: 0 20px 50px -12px rgba(14,171,110,0.6);
}

/* Reveal */
.careers-root .reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.9s cubic-bezier(0.2, 0.8, 0.2, 1),
              transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.careers-root .reveal.in { opacity: 1; transform: none; }

/* Responsive */
@media (max-width: 1024px) {
  .stats-inner { grid-template-columns: repeat(2, 1fr); }
  .stat { border-right: none; border-bottom: 1px solid var(--line); padding: 24px 0; }
  .stat:nth-child(odd) { border-right: 1px solid var(--line); padding-right: 24px; }
  .stat:nth-child(even) { padding-left: 24px; }
  .head-grid { grid-template-columns: 1fr; gap: 24px; }
  .mission-columns { grid-template-columns: 1fr; gap: 20px; }
  .proof-grid { grid-template-columns: 1fr; }
  .bento { grid-template-columns: repeat(4, 1fr); }
  .bento-cell.sz-lg { grid-column: span 4; grid-row: span 1; }
  .bento-cell.sz-md { grid-column: span 2; }
  .bento-cell.sz-sm { grid-column: span 2; }
  .position-row { grid-template-columns: 60px 1fr 50px; }
  .position-row .pos-dept-wrap,
  .position-row .pos-desc-mini,
  .position-row .pos-tags { display: none; }
  .process-track { grid-template-columns: repeat(2, 1fr); }
  .process-step { border-bottom: 1px solid var(--line); }
  .process-step:nth-child(even) { border-right: none; }
}
@media (max-width: 640px) {
  .bento { grid-template-columns: 1fr; }
  .bento-cell.sz-lg, .bento-cell.sz-md, .bento-cell.sz-sm { grid-column: span 1; }
  .process-track { grid-template-columns: 1fr; }
  .process-step { border-right: none; }
}
`;

export default function CareersClient() {
  const [filter, setFilter] = useState<Dept>("All");
  const [applyOpen, setApplyOpen] = useState(false);
  const [applyJobId, setApplyJobId] = useState<string | undefined>(undefined);
  const applyJobs: ApplyModalJob[] = jobs.map((j) => ({
    id: j.id,
    title: j.title,
    dept: j.dept,
  }));
  function openApply(id?: string) {
    setApplyJobId(id);
    setApplyOpen(true);
  }

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        });
      },
      { threshold: 0.15 }
    );
    document
      .querySelectorAll(
        ".careers-root .bento-cell, .careers-root .proof-card, .careers-root .position-row, .careers-root .mission-statement, .careers-root .stat"
      )
      .forEach((el) => {
        el.classList.add("reveal");
        io.observe(el);
      });
    return () => io.disconnect();
  }, []);

  const visibleJobs = jobs.filter((j) => !j.hiddenFromList);
  const filteredJobs = filter === "All" ? visibleJobs : visibleJobs.filter((j) => j.dept === filter);
  const filters: Dept[] = ["All", "Engineering", "Sales", "CS", "Marketing"];

  return (
    <div className="careers-root">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <Nav variant="light" />

      {/* ============ HERO ============ */}
      <section className="hero">
        <div className="hero-mesh" />
        <div className="hero-grid-overlay" />
        <div className="hero-inner">
          <div className="hero-eyebrow-pill">
            <span className="dot" />
            NOW HIRING · 5 OPEN ROLES · 2026
          </div>
          <h1>
            B2B 営業の
            <br />
            <span className="accent">前提</span>を、
            <br />
            <span className="outline">書き換える。</span>
          </h1>
          <p className="hero-sub">
            DynaMeet は、AI SDR プラットフォーム「Meeton ai」を開発する東京のスタートアップ。
            電話とメールに依存してきた日本の B2B 営業を、ソフトウェアとして再構築しています。
          </p>
          <div className="hero-actions">
            <a href="#positions" className="btn-primary">
              ポジションを見る
              <span>→</span>
            </a>
            <a href="#mission" className="btn-secondary">
              私たちについて
            </a>
          </div>
        </div>

        {/* Marquee */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((t, i) => (
              <span className="marquee-item" key={i}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="stats">
        <div className="stats-inner">
          <div className="stat">
            <div className="stat-label">// COMPANY</div>
            <div className="stat-num">2025</div>
            <div className="stat-desc">設立 / Pre-Series A</div>
          </div>
          <div className="stat">
            <div className="stat-label">// SPEED</div>
            <div className="stat-num">
              42h<span className="arrow">→</span>5<span className="unit">秒</span>
            </div>
            <div className="stat-desc">リード初動対応（人間 SDR 比）</div>
          </div>
          <div className="stat">
            <div className="stat-label">// PRODUCT</div>
            <div className="stat-num">
              40–80<span className="unit">%</span>
            </div>
            <div className="stat-desc">導入企業の商談化率レンジ</div>
          </div>
          <div className="stat">
            <div className="stat-label">// HIRING</div>
            <div className="stat-num">
              5<span className="unit">roles</span>
            </div>
            <div className="stat-desc">募集中のポジション</div>
          </div>
        </div>
      </section>

      {/* ============ MISSION ============ */}
      <section className="section" id="mission">
        <div className="inner">
          <div className="head-grid">
            <div className="head-left">
              <div className="eyebrow">Our Mission</div>
            </div>
            <div>
              <div className="head-title">
                人が走り続ける営業から、<span className="accent">AI</span>が動かす営業へ。
              </div>
            </div>
          </div>

          <div className="mission-block">
            <div className="mission-statement">
              人間 SDR が 42 時間かけていた初動対応を、
              <br />
              AI は <span className="accent">5 秒</span> で終わらせる。
              <br />
              <span className="outline">これは効率化ではなく、</span>
              <br />
              <span className="outline">仕事の前提を書き換える話。</span>
            </div>

            <div className="mission-columns">
              <div className="mission-col">
                <strong>// The Gap</strong>
                買い手は購買プロセスの大半をオンラインで完了しているのに、売り手は今も電話・メール・手作業で追いついていない。このギャップが、私たちの出発点。
              </div>
              <div className="mission-col">
                <strong>// The Build</strong>
                24 時間 365 日、秒単位で動き続ける AI SDR。Webチャット・メール・サンキューページで見込み客をナーチャリングし、商談化する完全自律のエージェント。
              </div>
              <div className="mission-col">
                <strong>// The Bet</strong>
                市場もプロダクトも、まだ途中。ここから先を一緒に設計できる仲間を、本気で探しています。
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROOF ============ */}
      <section className="section">
        <div className="inner">
          <div className="head-grid">
            <div className="head-left">
              <div className="eyebrow">What changes</div>
            </div>
            <div>
              <div className="head-title">
                <span className="accent">前提</span>が変わると、結果も変わる。
              </div>
              <p className="head-sub">
                人間 SDR の 42 時間を、AI SDR は 5 秒で終わらせる。この差が、商談化率を数倍に動かす。
              </p>
            </div>
          </div>

          <div className="proof-grid">
            {proof.map((p) => (
              <div className="proof-card" key={p.label}>
                <div className="proof-head">
                  <span className="proof-label">{p.label}</span>
                </div>
                <div className="proof-title">{p.title}</div>
                <div>
                  <div className="proof-metric">{p.metric}</div>
                  <div className="proof-detail">{p.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ POSITIONS ============ */}
      <section className="section" id="positions">
        <div className="inner">
          <div className="head-grid">
            <div className="head-left">
              <div className="eyebrow">Open Positions · {visibleJobs.length}</div>
            </div>
            <div>
              <div className="head-title">
                いま、<span className="accent">最も影響の出せる</span>ポジション。
              </div>
              <p className="head-sub">
                日本語と英語が半々で飛び交うグローバル環境。少数精鋭で、会社の輪郭を一緒に描く。
              </p>
            </div>
          </div>

          <div className="positions-controls">
            <div className="filter-pills">
              {filters.map((f) => (
                <button
                  key={f}
                  className={`pill ${filter === f ? "active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="mono" style={{ fontSize: 12, color: "var(--ink-mute)" }}>
              {filteredJobs.length} / {visibleJobs.length} positions
            </div>
          </div>

          <div className="position-list">
            {filteredJobs.map((job) => (
              <button
                type="button"
                className="position-row"
                key={job.id}
                onClick={() => openApply(job.id)}
              >
                <div className="pos-id">{job.id}</div>
                <div className="pos-dept-wrap">
                  <span className="pos-dept">{job.dept}</span>
                  {job.subtitle && <span className="pos-subtitle">{job.subtitle}</span>}
                </div>
                <div>
                  <div className="pos-title">{job.title}</div>
                  <div className="pos-desc-mini">{job.pitch}</div>
                </div>
                <div className="pos-tags">
                  {job.tags.slice(0, 3).map((t) => (
                    <span className="pos-tag-mini" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="pos-arrow" aria-hidden="true">
                  →
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BENTO (Why) ============ */}
      <section className="section">
        <div className="inner">
          <div className="head-grid">
            <div className="head-left">
              <div className="eyebrow">Why DynaMeet</div>
            </div>
            <div>
              <div className="head-title">
                ここでしか<span className="accent">得られない</span>経験がある。
              </div>
              <p className="head-sub">
                給与や肩書きでは語れない、スタートアップ初期フェーズの現場の価値。
              </p>
            </div>
          </div>

          <div className="bento">
            {bentos.map((b, i) => (
              <div
                className={`bento-cell sz-${b.size}${i === 0 ? " first" : ""}${i === bentos.length - 1 ? " last" : ""}`}
                key={b.eyebrow}
              >
                <div className="bento-meta">{b.eyebrow}</div>
                <div>
                  <div className="bento-title">{b.title}</div>
                  <div className="bento-body">{b.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="section">
        <div className="inner">
          <div className="head-grid">
            <div className="head-left">
              <div className="eyebrow">Hiring Process</div>
            </div>
            <div>
              <div className="head-title">
                応募から、最短<span className="accent">1週間</span>で。
              </div>
              <p className="head-sub">
                スピードは候補者体験の一部。テンポよく、誠実に。
              </p>
            </div>
          </div>

          <div className="process-track">
            {processSteps.map((s) => (
              <div className="process-step" key={s.num}>
                <div className="process-num">{s.num} / STEP</div>
                <div className="process-title">{s.title}</div>
                <div className="process-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CLOSING ============ */}
      <section className="closing">
        <div className="closing-mesh" />
        <div className="closing-inner">
          <div className="closing-eyebrow">
            <span>◆</span> Build forward with us
          </div>
          <h2>
            AIで営業を変革する
            <br />
            <span className="accent">パイオニアに</span>。
          </h2>
          <p className="closing-body">
            これからスタンダードになるカテゴリを、市場の真ん中で一緒に作る仲間を求む。
          </p>
          <button
            type="button"
            onClick={() => openApply(undefined)}
            className="closing-cta"
          >
            応募する
            <span>→</span>
          </button>
        </div>
      </section>

      <ApplyModal
        open={applyOpen}
        onClose={() => setApplyOpen(false)}
        jobs={applyJobs}
        defaultJobId={applyJobId}
      />

      <Footer variant="light" />
    </div>
  );
}
