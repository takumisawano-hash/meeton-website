'use client'

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
const HubSpotModal = dynamic(() => import("../components/HubSpotModal"), { ssr: false });
const HubSpotMeetingModal = dynamic(() => import("../components/HubSpotMeetingModal"), { ssr: false });

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
  --accent: #12a37d;
  --accent-hi: #0eab6e;
  --accent-deep: #065f46;
  --accent-glow: rgba(18,163,125,0.18);
  --violet: #7c5cfc;
  --violet-glow: rgba(124,92,252,0.16);
  --cyan: #0891b2;
  --cyan-glow: rgba(8,145,178,0.14);
  --dark-bg: #0a0e0c;
  --dark-ink: #f5f5f2;
  --fb: var(--font-noto), 'Noto Sans JP', system-ui, sans-serif;
  --fm: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
}

.talent-root {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--fb);
  font-weight: 400;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  position: relative;
}
.talent-root a { color: inherit; text-decoration: none; }
.talent-root *, .talent-root *::before, .talent-root *::after { box-sizing: border-box; }
.talent-root .mono { font-family: var(--fm); }

/* Subtle noise texture */
.talent-root::before {
  content: '';
  position: fixed; inset: 0; pointer-events: none; z-index: 1;
  opacity: 0.035;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pulseDot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.55; transform: scale(1.35); } }
@keyframes pulseRing { 0%, 100% { box-shadow: 0 0 0 0 rgba(18,163,125,.25); } 50% { box-shadow: 0 0 0 10px rgba(18,163,125,0); } }
@keyframes chatPop { 0% { opacity: 0; transform: translateY(14px) scale(.95); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes slideIn { 0% { opacity: 0; transform: translateX(-16px); } 100% { opacity: 1; transform: translateX(0); } }
@keyframes scoreUp { 0% { width: 0; } 100% { width: var(--sw); } }
@keyframes nodeGrow { 0% { opacity: 0; transform: scale(0.85); } 100% { opacity: 1; transform: scale(1); } }
@keyframes heroMesh { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(-8%, 6%) scale(1.1); } }

.anim { opacity: 0; animation: fadeUp .8s cubic-bezier(.16,1,.3,1) forwards; }
.d1 { animation-delay: .05s; }
.d2 { animation-delay: .15s; }
.d3 { animation-delay: .28s; }
.d4 { animation-delay: .42s; }
.d5 { animation-delay: .56s; }

.section {
  padding: clamp(80px, 10vw, 132px) clamp(20px, 4vw, 56px);
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
  color: var(--accent-deep);
  margin-bottom: 24px;
}
.eyebrow::before {
  content: ''; width: 20px; height: 1px; background: var(--accent);
}

.head-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: clamp(40px, 6vw, 80px);
  margin-bottom: 56px;
  align-items: start;
}
.head-left { padding-top: 8px; }
.head-title {
  font-weight: 900;
  font-size: clamp(32px, 4.6vw, 60px);
  line-height: 1.12;
  letter-spacing: -0.04em;
  word-break: keep-all;
  overflow-wrap: break-word;
  color: var(--ink);
}
.head-title em {
  font-style: normal;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-deep) 60%, var(--violet) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.head-sub {
  font-size: 16px;
  color: var(--ink-soft);
  line-height: 1.9;
  margin-top: 22px;
  max-width: 620px;
}

/* ============ HERO ============ */
.hero {
  min-height: 92vh;
  padding: clamp(120px, 16vw, 180px) clamp(20px, 4vw, 56px) clamp(60px, 8vw, 100px);
  position: relative; overflow: hidden;
  display: flex; align-items: center;
  z-index: 2;
}
.hero-mesh {
  position: absolute; inset: -20% -10% auto auto;
  width: 70vw; height: 70vw; max-width: 900px; max-height: 900px;
  background:
    radial-gradient(circle at 30% 30%, rgba(18,163,125,0.28), transparent 55%),
    radial-gradient(circle at 70% 60%, rgba(124,92,252,0.10), transparent 55%),
    radial-gradient(circle at 55% 50%, rgba(18,163,125,0.14), transparent 60%);
  filter: blur(80px);
  pointer-events: none;
  animation: heroMesh 14s ease-in-out infinite alternate;
}
.hero-mesh.l {
  inset: auto auto -30% -20%;
  background:
    radial-gradient(circle at 40% 40%, rgba(8,145,178,0.14), transparent 55%),
    radial-gradient(circle at 60% 60%, rgba(18,163,125,0.10), transparent 55%);
}
.hero-grid-overlay {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    radial-gradient(circle, rgba(10,14,12,0.07) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: radial-gradient(ellipse at 50% 40%, black 35%, transparent 80%);
}
.hero-inner {
  max-width: 1280px; margin: 0 auto; width: 100%; position: relative; z-index: 2;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: clamp(40px, 6vw, 80px);
  align-items: center;
}

.hero-pill {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 6px 14px;
  border: 1px solid rgba(18,163,125,0.25);
  background: var(--accent-glow);
  color: var(--accent-deep);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 32px;
  font-family: var(--fm);
}
.hero-pill .dot {
  width: 6px; height: 6px; background: var(--accent);
  border-radius: 50%;
  animation: pulseDot 2s ease-in-out infinite;
  box-shadow: 0 0 8px var(--accent);
}

.hero h1 {
  font-family: var(--fb);
  font-weight: 900;
  font-size: clamp(40px, 6.4vw, 88px);
  line-height: 1.02;
  letter-spacing: -0.045em;
  margin-bottom: 28px;
  color: var(--ink);
  word-break: keep-all; overflow-wrap: break-word;
}
.hero h1 em {
  font-style: normal;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-deep) 60%, var(--violet) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero h1 .hl {
  background: linear-gradient(180deg, transparent 64%, rgba(18,163,125,0.22) 64%);
  padding: 0 4px;
}
.hero-sub {
  font-size: clamp(15px, 1.3vw, 18px);
  line-height: 1.85;
  color: var(--ink-soft);
  max-width: 560px;
  margin-bottom: 40px;
}
.hero-actions { display: flex; flex-wrap: wrap; gap: 14px; align-items: center; margin-bottom: 44px; }

.btn-primary {
  background: var(--ink);
  color: var(--bg);
  padding: 16px 28px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 700;
  display: inline-flex; align-items: center; gap: 12px;
  transition: all 0.3s;
  border: 1px solid var(--ink);
  cursor: pointer;
  font-family: var(--fb);
  min-height: 48px;
}
.btn-primary:hover {
  background: var(--accent-deep);
  border-color: var(--accent-deep);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px -8px rgba(6,95,70,0.35);
}
.btn-secondary {
  color: var(--ink);
  font-size: 14px;
  font-weight: 600;
  display: inline-flex; align-items: center; gap: 10px;
  padding: 16px 24px;
  border-radius: 999px;
  border: 1px solid var(--line-hi);
  background: var(--surface);
  transition: all 0.2s;
  cursor: pointer;
  font-family: var(--fb);
  min-height: 48px;
}
.btn-secondary:hover { border-color: var(--ink); background: var(--bg-soft); }

.hero-stats {
  display: flex; gap: clamp(24px, 4vw, 48px);
  padding-top: 28px;
  border-top: 1px solid var(--line);
  flex-wrap: wrap;
}
.hstat-v {
  font-family: var(--fb);
  font-weight: 900;
  font-size: clamp(28px, 3vw, 36px);
  letter-spacing: -0.03em;
  color: var(--accent-deep);
}
.hstat-l {
  font-family: var(--fm);
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--ink-mute);
  text-transform: uppercase;
  margin-top: 4px;
}

/* ============ FUNNEL CARD (hero visual) ============ */
.fcard {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 24px 60px -20px rgba(10,14,12,0.12),
              0 2px 6px -2px rgba(10,14,12,0.04);
  position: relative;
  overflow: hidden;
}
.fcard::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(135deg, transparent 60%, rgba(18,163,125,0.06) 100%);
  pointer-events: none;
}
.fcard-hdr {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 22px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--line);
  position: relative;
}
.fcard-ico {
  width: 38px; height: 38px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--accent), var(--accent-deep));
  display: flex; align-items: center; justify-content: center;
  color: #fff;
  flex-shrink: 0;
}
.fcard-title { font-size: 14px; font-weight: 800; color: var(--ink); letter-spacing: -0.01em; }
.fcard-meta { font-family: var(--fm); font-size: 11px; color: var(--ink-mute); margin-top: 2px; }
.fcard-step { display: flex; align-items: center; gap: 12px; padding: 8px 0; position: relative; }
.fcard-num {
  width: 30px; height: 30px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--fm); font-size: 11px; font-weight: 700;
  color: #fff; flex-shrink: 0;
}
.fcard-bar { height: 5px; border-radius: 3px; margin-top: 6px; background: var(--bg-soft); overflow: hidden; }
.fcard-fill { height: 100%; border-radius: 3px; animation: scoreUp 1.5s cubic-bezier(.16,1,.3,1) forwards; }
.fcard-conn { width: 1px; height: 8px; background: var(--line); margin-left: 14px; }
.fcard-result {
  margin-top: 16px; padding: 14px 16px;
  border-radius: 14px;
  background: var(--accent-glow);
  border: 1px solid rgba(18,163,125,0.18);
  display: flex; align-items: center; justify-content: space-between;
  position: relative;
}

/* ============ PAIN CARDS ============ */
.pain-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.pain-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 32px;
  transition: all 0.3s cubic-bezier(.16,1,.3,1);
  position: relative;
  overflow: hidden;
}
.pain-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}
.pain-card:hover {
  border-color: var(--line-hi);
  transform: translateY(-3px);
  box-shadow: 0 18px 40px -16px rgba(10,14,12,0.12);
}
.pain-card:hover::before { opacity: 1; }
.pain-ico {
  width: 44px; height: 44px;
  border-radius: 12px;
  background: var(--bg-soft);
  border: 1px solid var(--line);
  color: var(--accent-deep);
  display: inline-flex; align-items: center; justify-content: center;
  margin-bottom: 20px;
  transition: all 0.3s;
}
.pain-card:hover .pain-ico {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}
.pain-title {
  font-size: 18px; font-weight: 800; color: var(--ink);
  margin-bottom: 10px;
  letter-spacing: -0.015em;
}
.pain-desc {
  font-size: 14px; line-height: 1.8; color: var(--ink-soft);
  margin-bottom: 18px;
}
.pain-stat {
  font-family: var(--fb);
  font-weight: 900;
  font-size: 32px;
  color: var(--accent-deep);
  letter-spacing: -0.03em;
  line-height: 1;
}
.pain-stat-l {
  font-family: var(--fm);
  font-size: 11px;
  font-weight: 600;
  color: var(--ink-mute);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-top: 6px;
}

/* ============ PHASES ============ */
.phase-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: clamp(40px, 6vw, 80px);
  padding: clamp(48px, 7vw, 80px) 0;
}
.phase-row.rev { direction: rtl; }
.phase-row.rev > * { direction: ltr; }

.ptag {
  display: inline-flex;
  padding: 5px 14px;
  border-radius: 999px;
  font-family: var(--fm);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 18px;
  background: var(--accent-glow);
  color: var(--accent-deep);
  border: 1px solid rgba(18,163,125,0.18);
}
.ph {
  font-size: clamp(26px, 3.8vw, 38px);
  font-weight: 900;
  color: var(--ink);
  letter-spacing: -0.03em;
  margin-bottom: 16px;
  line-height: 1.18;
}
.pd {
  font-size: clamp(15px, 1.6vw, 16px);
  line-height: 1.85;
  color: var(--ink-soft);
  margin-bottom: 24px;
  max-width: 520px;
}
.pf {
  display: flex; align-items: flex-start; gap: 12px;
  font-size: 14px; font-weight: 600;
  color: var(--ink);
  margin-bottom: 10px;
  line-height: 1.55;
}
.pf-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
  margin-top: 8px;
}
.pvis {
  width: 100%;
  max-width: 460px;
  aspect-ratio: 4/3;
  border-radius: 24px;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--line);
  box-shadow: 0 24px 60px -20px rgba(10,14,12,0.12);
  margin: 0 auto;
}

.phase-divider {
  height: 1px;
  background: var(--line);
}

/* Candidate card (used in visualizations) */
.cc {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 10px 14px;
  display: flex; align-items: center; gap: 10px;
}
.cc-av {
  width: 32px; height: 32px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 800; color: #fff;
  flex-shrink: 0;
}
.cc-info { flex: 1; min-width: 0; }
.cc-name { font-size: 11px; font-weight: 700; color: var(--ink); }
.cc-role { font-size: 9px; color: var(--ink-mute); }
.cc-badge {
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 9px;
  font-weight: 700;
}

/* ============ COMPARISON TABLE ============ */
.ctbl {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--line);
  background: var(--surface);
}
.ctbl th, .ctbl td {
  padding: 18px 22px;
  text-align: left;
  font-size: 14px;
  vertical-align: top;
}
.ctbl thead th {
  background: var(--ink);
  color: var(--bg);
  font-family: var(--fm);
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.ctbl tbody td {
  border-bottom: 1px solid var(--line);
}
.ctbl tbody tr:last-child td { border-bottom: none; }
.ctbl tbody td.cat {
  font-weight: 800;
  color: var(--ink);
  font-size: 13px;
  background: var(--bg-soft);
  font-family: var(--fm);
  letter-spacing: 0.02em;
  width: 22%;
}
.ctbl tbody td.old {
  color: var(--ink-mute);
  font-size: 14px;
  line-height: 1.7;
}
.ctbl tbody td.new {
  color: var(--accent-deep);
  font-weight: 600;
  font-size: 14px;
  line-height: 1.7;
}
.ctbl td.new::before {
  content: '✓';
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px; height: 18px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  margin-right: 10px;
  vertical-align: middle;
}

/* ============ WHY GRID ============ */
.wg {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.wc {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 32px;
  transition: all 0.35s cubic-bezier(.16,1,.3,1);
  position: relative;
  overflow: hidden;
}
.wc::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent), var(--violet));
  opacity: 0;
  transition: opacity 0.3s;
}
.wc:hover {
  border-color: var(--line-hi);
  transform: translateY(-4px);
  box-shadow: 0 18px 44px -16px rgba(10,14,12,0.14);
}
.wc:hover::before { opacity: 1; }
.wc-ico {
  width: 44px; height: 44px;
  border-radius: 12px;
  display: inline-flex; align-items: center; justify-content: center;
  margin-bottom: 20px;
  background: var(--accent-glow);
  color: var(--accent-deep);
  border: 1px solid rgba(18,163,125,0.18);
  transition: all 0.3s;
}
.wc:hover .wc-ico {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
  transform: rotate(-4deg) scale(1.05);
}
.wc-title {
  font-size: 18px;
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 10px;
  letter-spacing: -0.015em;
}
.wc-desc {
  font-size: 14px;
  line-height: 1.8;
  color: var(--ink-soft);
}

/* ============ STEPS ============ */
.steps-track {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: var(--surface);
  border-radius: 0;
}
.step {
  padding: clamp(28px, 3vw, 40px) clamp(20px, 2.5vw, 32px);
  border-right: 1px solid var(--line);
  position: relative;
  transition: background 0.3s;
}
.step:last-child { border-right: none; }
.step:hover { background: var(--bg-soft); }
.step-num {
  font-family: var(--fm);
  font-size: 12px;
  color: var(--accent);
  letter-spacing: 0.1em;
  margin-bottom: 18px;
  font-weight: 700;
}
.step-title {
  font-weight: 800;
  font-size: 18px;
  color: var(--ink);
  margin-bottom: 10px;
  letter-spacing: -0.015em;
}
.step-desc {
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.8;
}

/* ============ COMING SOON CARD ============ */
.cs-card {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  max-width: 760px;
  margin: 32px auto 0;
  background: linear-gradient(135deg, var(--dark-bg) 0%, #11181a 60%, var(--dark-bg) 100%);
  padding: clamp(48px, 7vw, 80px) clamp(28px, 5vw, 56px);
  text-align: center;
  border: 1px solid rgba(18,163,125,0.18);
  box-shadow: 0 24px 60px -20px rgba(10,14,12,0.32);
}
.cs-card::before {
  content: '';
  position: absolute; inset: 0;
  background-image: radial-gradient(circle, rgba(18,163,125,.08) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
}
.cs-card::after {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 60%; aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(18,163,125,.16) 0%, transparent 70%);
  pointer-events: none;
}
.cs-inner { position: relative; z-index: 2; }
.cs-pill {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(18,163,125,0.14);
  border: 1px solid rgba(18,163,125,0.32);
  border-radius: 999px;
  padding: 6px 16px;
  font-family: var(--fm);
  font-size: 11px;
  font-weight: 700;
  color: #6fe3b2;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 28px;
}
.cs-pill .dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #6fe3b2;
  animation: pulseDot 2s infinite;
}
.cs-label {
  font-family: var(--fm);
  font-weight: 800;
  font-size: clamp(28px, 4vw, 44px);
  letter-spacing: 0.18em;
  background: linear-gradient(135deg, #fff 0%, #6fe3b2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
}
.cs-body {
  font-size: 15px;
  line-height: 1.85;
  color: rgba(245,245,242,0.55);
  max-width: 460px;
  margin: 0 auto 28px;
}

/* ============ FAQ ============ */
.fl { max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; gap: 10px; }
.fi {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
  transition: all 0.25s;
}
.fi:hover { border-color: var(--line-hi); }
.fi.open { border-color: var(--accent); }
.fq {
  padding: 22px 26px;
  cursor: pointer;
  display: flex; align-items: center; justify-content: space-between;
  font-size: 16px;
  font-weight: 700;
  color: var(--ink);
  transition: color 0.2s;
  gap: 16px;
  min-height: 64px;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  font-family: var(--fb);
}
.fq:hover { color: var(--accent-deep); }
.ft {
  width: 30px; height: 30px;
  border-radius: 50%;
  background: var(--bg-soft);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
  color: var(--ink-soft);
  transition: all 0.25s;
  flex-shrink: 0;
}
.fi.open .ft {
  background: var(--accent);
  color: #fff;
  transform: rotate(45deg);
}
.fa {
  padding: 0 26px 22px;
  font-size: 14.5px;
  line-height: 1.85;
  color: var(--ink-soft);
}

/* ============ CLOSING (dark CTA) ============ */
.closing {
  padding: clamp(100px, 13vw, 180px) clamp(20px, 4vw, 56px);
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
    radial-gradient(circle at 50% 50%, rgba(18,163,125,0.22) 0%, transparent 55%),
    radial-gradient(circle at 20% 70%, rgba(124,92,252,0.12) 0%, transparent 50%);
  filter: blur(40px);
}
.closing-inner { max-width: 920px; margin: 0 auto; position: relative; z-index: 2; }
.closing-pill {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 6px 14px;
  background: rgba(18,163,125,0.14);
  color: #6fe3b2;
  border: 1px solid rgba(18,163,125,0.3);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 36px;
  font-family: var(--fm);
}
.closing h2 {
  font-weight: 900;
  font-size: clamp(36px, 6vw, 80px);
  line-height: 1.05;
  letter-spacing: -0.045em;
  margin-bottom: 32px;
  color: var(--dark-ink);
}
.closing h2 em {
  font-style: normal;
  background: linear-gradient(135deg, #6fe3b2 0%, #fff 50%, #6fe3b2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.closing-body {
  font-size: 17px;
  line-height: 1.85;
  color: rgba(245,245,242,0.7);
  max-width: 580px;
  margin: 0 auto 48px;
}
.closing-actions { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; align-items: center; }
.closing-cta {
  display: inline-flex; align-items: center; gap: 12px;
  background: var(--dark-ink);
  color: var(--dark-bg);
  padding: 18px 36px;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 800;
  transition: all 0.3s;
  border: 1px solid var(--dark-ink);
  cursor: pointer;
  font-family: var(--fb);
  min-height: 52px;
}
.closing-cta:hover {
  background: #6fe3b2;
  border-color: #6fe3b2;
  color: var(--dark-bg);
  transform: translateY(-2px);
  box-shadow: 0 16px 40px -10px rgba(18,163,125,0.55);
}
.closing-ghost {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 18px 32px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 700;
  border: 1px solid rgba(245,245,242,0.24);
  background: transparent;
  color: var(--dark-ink);
  transition: all 0.3s;
  cursor: pointer;
  font-family: var(--fb);
  min-height: 52px;
}
.closing-ghost:hover {
  border-color: rgba(245,245,242,0.5);
  background: rgba(245,245,242,0.06);
}

/* Reveal */
.talent-root .reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.85s cubic-bezier(0.2, 0.8, 0.2, 1),
              transform 0.85s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.talent-root .reveal.in { opacity: 1; transform: none; }

/* ============ RESPONSIVE ============ */
@media (max-width: 1024px) {
  .head-grid { grid-template-columns: 1fr; gap: 24px; margin-bottom: 40px; }
  .hero { min-height: auto; }
  .hero-inner { grid-template-columns: 1fr; gap: 56px; }
  .phase-row, .phase-row.rev { grid-template-columns: 1fr; direction: ltr; gap: 40px; }
  .phase-row .pvis { order: 2; }
  .pain-grid { grid-template-columns: repeat(2, 1fr); }
  .wg { grid-template-columns: repeat(2, 1fr); }
  .steps-track { grid-template-columns: 1fr; }
  .step { border-right: none; border-bottom: 1px solid var(--line); }
  .step:last-child { border-bottom: none; }
}

@media (max-width: 640px) {
  .pain-grid { grid-template-columns: 1fr; }
  .wg { grid-template-columns: 1fr; }
  .hero h1 { font-size: clamp(36px, 9vw, 52px); }
  .pvis { max-width: 100%; aspect-ratio: 1/1.05; min-height: 360px; }
  .btn-primary, .btn-secondary, .closing-cta, .closing-ghost { width: 100%; justify-content: center; }
  .hero-actions, .closing-actions { width: 100%; }
  .ctbl thead th:first-child,
  .ctbl tbody td.cat { width: auto; }
  .ctbl th, .ctbl td { padding: 12px 14px; font-size: 13px; }
}
`;

const compData = [
  { cat: "候補者との接点", old: "フォーム送信を待つだけ", nw: "AIが閲覧行動を読み取り、最適なタイミングで声をかける" },
  { cat: "情報の取得方法", old: "長いエントリーフォーム → 離脱率70%超", nw: "チャットの会話中に自然に取得 → 離脱率大幅減" },
  { cat: "志望度の判定", old: "書類選考まで不明", nw: "閲覧・チャット・再訪をリアルタイムでスコア化" },
  { cat: "候補者の育成", old: "人事が手動でメール送信", nw: "AIがリードステージに応じて自動でメール+チャット育成" },
  { cat: "面談の設定", old: "メールで数往復の日程調整", nw: "スコア条件を満たした候補者に即カレンダー表示" },
  { cat: "運用コスト", old: "シナリオ設計・更新に月数十時間", nw: "初期設定のみ。AIが自律的に最適化" },
];

type WhyIcon = "chat" | "brain" | "loop" | "spark" | "target" | "rocket";
const whyData: { icon: WhyIcon; title: string; desc: string }[] = [
  { icon: "chat", title: "チャットだから分かる本音", desc: "エントリーフォームでは取れない「何に興味があるか」「何を不安に思っているか」をAIチャットがリアルタイムで把握。" },
  { icon: "brain", title: "シナリオ設計不要", desc: "初期設定だけ済ませれば、AIが候補者の行動・文脈に応じて最適な対応を自律的に判断。" },
  { icon: "loop", title: "AI ナーチャリング", desc: "Cold → Warm → 面談予約。メール配信・チャット再接触・行動シグナルを自動で組み合わせます。" },
  { icon: "spark", title: "自然な流れで獲得", desc: "チャット内での自然なやりとりで候補者情報を取得。体験を損なわず、取りこぼしを減らします。" },
  { icon: "target", title: "AIから能動的に", desc: "閲覧職種・行動パターン・再訪を読み取り、AIから最適なタイミングで声をかけます。" },
  { icon: "rocket", title: "5分で導入", desc: "採用サイトにJSタグを1行追加するだけ。ATS、カレンダー、チャットツールと即連携。" },
];

const faqData = [
  { q: "導入にどのくらい時間がかかりますか？", a: "JavaScriptタグの設置は5分。AIの設定を含めても最短当日中に稼働開始できます。" },
  { q: "既存のATSと連携できますか？", a: "HRMOS、ジョブカン、リクナビHRTech、HERP Hireとネイティブ連携。Webhook経由で他ATSにも接続可能。" },
  { q: "多言語に対応していますか？", a: "日本語・英語・中国語・韓国語をはじめ主要言語に対応。グローバル採用にもご利用いただけます。" },
  { q: "無料トライアルはありますか？", a: "14日間の無料トライアルをご用意。クレジットカード不要で全機能をお試しいただけます。" },
];

const stepsData = [
  { num: "01", title: "タグを設置", desc: "採用サイトにJavaScriptタグを数行追加するだけ。WordPressプラグインも用意。所要時間: 約5分。" },
  { num: "02", title: "AIを設定", desc: "ダッシュボードからAIの声かけ内容、面談予約ルール、紹介する求人等を設定。テンプレートから簡単スタート。" },
  { num: "03", title: "候補者が入り始める", desc: "設定完了した瞬間からAIが稼働。候補者の獲得、評価、育成、面談予約が自動で回り始めます。" },
];

const phases: { t: string }[][] = [
  [{ t: "職種ページに合わせた自動あいさつ" }, { t: "求人カードで興味を引く" }, { t: "募集要項ライブラリ" }, { t: "「すぐ話したい」への即対応" }],
  [{ t: "チャット内のメール入力欄" }, { t: "ATSへ即時登録" }, { t: "求人情報をその場でお届け" }, { t: "急ぎの候補者には最短ルート" }],
  [{ t: "リアルタイムの志望度スコア" }, { t: "スコアに応じた3段階の振り分け" }, { t: "面談予約の条件設定" }, { t: "温度感に合わせたアプローチ" }],
  [{ t: "Cold Lead → 詳細情報の取得" }, { t: "Warm Lead → 面談予約" }, { t: "面談の準備からフォローアップまで" }, { t: "サイト再訪時のチャット再接触" }],
];

/* ============ INLINE ICONS ============ */
function Icon({ name, size = 22 }: { name: string; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "target": return (
      <svg {...common}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>
    );
    case "form-x": return (
      <svg {...common}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9h6M7 13h4"/><path d="m15 13 4 4M19 13l-4 4"/></svg>
    );
    case "coin": return (
      <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M9 12h6M12 9v6"/></svg>
    );
    case "clock": return (
      <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
    );
    case "chat": return (
      <svg {...common}><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/></svg>
    );
    case "brain": return (
      <svg {...common}><path d="M9 4a3 3 0 0 0-3 3v.5A3 3 0 0 0 4 10v1.5A3 3 0 0 0 5 14a3 3 0 0 0 1 2.5V18a3 3 0 0 0 3 3h.5a3 3 0 0 0 2.5-1.5"/><path d="M15 4a3 3 0 0 1 3 3v.5A3 3 0 0 1 20 10v1.5A3 3 0 0 1 19 14a3 3 0 0 1-1 2.5V18a3 3 0 0 1-3 3h-.5a3 3 0 0 1-2.5-1.5"/><path d="M12 4v16"/></svg>
    );
    case "loop": return (
      <svg {...common}><path d="M3 12a9 9 0 0 1 15.5-6.3L21 3"/><path d="M21 3v6h-6"/><path d="M21 12a9 9 0 0 1-15.5 6.3L3 21"/><path d="M3 21v-6h6"/></svg>
    );
    case "spark": return (
      <svg {...common}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6 8.5 8.5M15.5 15.5l2.9 2.9M5.6 18.4 8.5 15.5M15.5 8.5l2.9-2.9"/></svg>
    );
    case "rocket": return (
      <svg {...common}><path d="M9 11a8 8 0 0 1 8-8 1 1 0 0 1 1 1 8 8 0 0 1-8 8"/><path d="M9 11 6 14l3 3 3-3"/><path d="M7 17c-1 1-1 4-1 4s3 0 4-1"/><circle cx="14" cy="8" r="1.5"/></svg>
    );
    case "arrow": return (
      <svg {...common} strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
    );
    case "play": return (
      <svg {...common}><circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4z" fill="currentColor"/></svg>
    );
    case "doc": return (
      <svg {...common}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>
    );
    default: return null;
  }
}

export default function TalentClient() {
  const [faq, setFaq] = useState<number | null>(null);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);

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
        ".talent-root .pain-card, .talent-root .wc, .talent-root .step, .talent-root .ctbl tbody tr, .talent-root .fi"
      )
      .forEach((el) => {
        el.classList.add("reveal");
        io.observe(el);
      });
    return () => io.disconnect();
  }, []);

  return (
    <div className="talent-root">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <Nav variant="light" />

      {/* ============ HERO ============ */}
      <section className="hero">
        <div className="hero-mesh" />
        <div className="hero-mesh l" />
        <div className="hero-grid-overlay" />
        <div className="hero-inner">
          <div className="hero-text">
            <div className="anim d1 hero-pill">
              <span className="dot" />
              採用サイト特化 AI リクルーター
            </div>
            <h1 className="anim d2">
              採用サイト訪問者を
              <br />
              <em>面談に変える</em> AI。
            </h1>
            <p className="anim d3 hero-sub">
              すべての訪問者にAIが対応。候補者を自然に獲得し、志望度を自動で評価。
              メールとチャットで育成しながら面談予約まで、完全自動化します。
            </p>
            <div className="anim d4 hero-actions">
              <button type="button" className="btn-primary" onClick={() => setIsDocModalOpen(true)}>
                <Icon name="doc" size={18} />
                資料請求
              </button>
              <button type="button" className="btn-secondary" onClick={() => setIsMeetingModalOpen(true)}>
                <Icon name="play" size={16} />
                デモを予約
              </button>
            </div>
            <div className="anim d5 hero-stats">
              <div>
                <div className="hstat-v">3×</div>
                <div className="hstat-l">エントリー数</div>
              </div>
              <div>
                <div className="hstat-v">65%</div>
                <div className="hstat-l">面談化率</div>
              </div>
              <div>
                <div className="hstat-v">24/7</div>
                <div className="hstat-l">AI 常時対応</div>
              </div>
            </div>
          </div>

          <div className="anim d4 hero-visual">
            <div className="fcard">
              <div className="fcard-hdr">
                <div className="fcard-ico"><Icon name="target" size={18} /></div>
                <div>
                  <div className="fcard-title">候補者パイプライン</div>
                  <div className="fcard-meta">リアルタイム · 今日</div>
                </div>
              </div>
              {[
                { l: "サイト訪問", d: "AI が自動で声かけ", n: "1,240", w: "100%", c: "#94a3b8" },
                { l: "AI チャット開始", d: "職種に合わせた会話", n: "428", w: "68%", c: "var(--cyan)" },
                { l: "候補者情報を獲得", d: "メール取得 → ATS登録", n: "186", w: "42%", c: "var(--violet)" },
                { l: "面談予約完了", d: "カレンダー自動連携", n: "72", w: "22%", c: "var(--accent)" },
              ].map((s, i) => (
                <div key={i}>
                  {i > 0 && <div className="fcard-conn" />}
                  <div className="fcard-step">
                    <div className="fcard-num" style={{ background: s.c }}>{i + 1}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>{s.l}</div>
                      <div style={{ fontSize: 10, color: "var(--ink-mute)" }}>{s.d}</div>
                      <div className="fcard-bar">
                        <div
                          className="fcard-fill"
                          style={{ background: s.c, ["--sw" as string]: s.w, animationDelay: `${i * 0.3}s` } as React.CSSProperties}
                        />
                      </div>
                    </div>
                    <div style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 700, color: s.c, minWidth: 40, textAlign: "right" }}>{s.n}</div>
                  </div>
                </div>
              ))}
              <div className="fcard-result">
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--accent-deep)", display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <Icon name="target" size={14} />
                  今日の面談予約
                </span>
                <span style={{ background: "var(--accent)", color: "#fff", padding: "5px 14px", borderRadius: 8, fontSize: 12, fontWeight: 800 }}>72 件</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROBLEM ============ */}
      <section className="section">
        <div className="inner">
          <div className="head-grid">
            <div className="head-left">
              <div className="eyebrow">課題</div>
            </div>
            <div>
              <div className="head-title">
                採用サイト訪問者の<em>99%</em>が、エントリーせず離脱している。
              </div>
              <p className="head-sub">
                採用サイトの平均エントリー率はわずか 0.5〜1%。
                興味を持って訪れた候補者の大半が、接点を持てないまま静かに離脱しています。
              </p>
            </div>
          </div>

          <div className="pain-grid">
            {[
              { icon: "form-x", title: "フォームの壁", desc: "「ちょっと聞きたいだけ」の候補者がエントリーフォームの前で離脱。興味があっても応募に至らない。", stat: "70%", sl: "フォーム離脱率" },
              { icon: "coin", title: "エージェント依存", desc: "1人あたり年収の30〜35%のフィー。採用コストが膨らむ一方、自社サイトからの直接応募は増えない。", stat: "35%", sl: "平均紹介手数料" },
              { icon: "clock", title: "人事の工数不足", desc: "スカウトメール、日程調整、問い合わせ対応。面談・選考に時間が割けない。", stat: "60%", sl: "が事務作業に消える" },
            ].map((p, i) => (
              <div className="pain-card" key={i}>
                <div className="pain-ico"><Icon name={p.icon} /></div>
                <div className="pain-title">{p.title}</div>
                <div className="pain-desc">{p.desc}</div>
                <div className="pain-stat">{p.stat}</div>
                <div className="pain-stat-l">{p.sl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SOLUTION HEADER ============ */}
      <section className="section" id="sol" style={{ paddingBottom: 0 }}>
        <div className="inner">
          <div className="head-grid">
            <div className="head-left">
              <div className="eyebrow">Solution</div>
            </div>
            <div>
              <div className="head-title">
                4つのフェーズで、<em>完全自動化</em>。
              </div>
              <p className="head-sub">
                Meeton Talent が、声かけから面談予約まで、すべてを自動で行います。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PHASES ============ */}
      <section className="section" id="feat" style={{ paddingTop: 0 }}>
        <div className="inner">

          {/* P0 — chat UI */}
          <div className="phase-row">
            <div>
              <div className="ptag">Phase 0 — 接触</div>
              <div className="ph">AIが候補者に、自ら話しかける</div>
              <div className="pd">
                候補者が見ている職種ページに合わせて AI が声をかけ、求人カードで興味を引きます。
              </div>
              {phases[0].map((c, i) => (
                <div className="pf" key={i}>
                  <div className="pf-dot" />
                  {c.t}
                </div>
              ))}
            </div>
            <div>
              <div className="pvis" style={{ background: "linear-gradient(160deg, var(--bg-soft), var(--surface))", padding: 24 }}>
                <div style={{ position: "absolute", top: 24, left: 22, right: 22 }}>
                  <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 14, padding: "12px 16px", marginBottom: 12, animation: "chatPop .5s .2s cubic-bezier(.16,1,.3,1) forwards", opacity: 0, fontSize: 12, fontWeight: 600, color: "var(--ink)", lineHeight: 1.6, borderBottomLeftRadius: 4 }}>
                    こんにちは。<br />エンジニア職に興味がありますか？
                  </div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap", animation: "chatPop .5s .7s cubic-bezier(.16,1,.3,1) forwards", opacity: 0 }}>
                    {["フロントエンド", "SRE", "データ"].map((j, k) => (
                      <div key={k} style={{ background: "var(--accent-glow)", border: "1px solid rgba(18,163,125,0.18)", borderRadius: 999, padding: "6px 12px", fontSize: 11, fontWeight: 700, color: "var(--accent-deep)" }}>{j}</div>
                    ))}
                  </div>
                  <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 14, padding: "12px 16px", marginBottom: 12, animation: "chatPop .5s 1.2s cubic-bezier(.16,1,.3,1) forwards", opacity: 0, fontSize: 11, color: "var(--ink-soft)", lineHeight: 1.6, borderBottomLeftRadius: 4 }}>
                    フロントエンドチームは React + TypeScript。<br />リモートOK・フレックスタイム制です。
                  </div>
                  <div style={{ animation: "chatPop .5s 1.8s cubic-bezier(.16,1,.3,1) forwards", opacity: 0 }}>
                    <div style={{ background: "var(--ink)", color: "var(--bg)", borderRadius: 14, borderBottomRightRadius: 4, padding: "10px 16px", fontSize: 12, fontWeight: 600, marginLeft: "auto", maxWidth: 260, textAlign: "right" }}>
                      開発環境について詳しく知りたいです
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* P1 — candidate card */}
          <div className="phase-row rev">
            <div>
              <div className="ptag">Phase 1 — 獲得</div>
              <div className="ph">チャットで自然に、候補者情報を獲得</div>
              <div className="pd">
                会話の流れの中でメールアドレスを取得。入力された瞬間に ATS へ自動登録されます。
              </div>
              {phases[1].map((c, i) => (
                <div className="pf" key={i}>
                  <div className="pf-dot" />
                  {c.t}
                </div>
              ))}
            </div>
            <div>
              <div className="pvis" style={{ background: "linear-gradient(160deg, var(--surface), var(--bg-soft))", padding: 22 }}>
                <div style={{ position: "absolute", top: 22, left: 22, right: 22 }}>
                  <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 14, padding: "12px 16px", marginBottom: 14, animation: "chatPop .5s .3s cubic-bezier(.16,1,.3,1) forwards", opacity: 0, fontSize: 12, fontWeight: 600, color: "var(--ink)", lineHeight: 1.6, borderBottomLeftRadius: 4 }}>
                    詳しい求人情報をお送りします。<br />メールアドレスを教えてください。
                  </div>
                  <div style={{ padding: "12px 14px", borderRadius: 12, border: "2px solid var(--accent)", background: "var(--surface)", fontSize: 13, color: "var(--ink)", fontWeight: 600, animation: "pulseRing 2s infinite", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <span style={{ fontFamily: "var(--fm)" }}>sato@example.co.jp</span>
                    <span style={{ background: "var(--accent)", color: "#fff", borderRadius: 8, padding: "5px 12px", fontSize: 11, fontWeight: 700 }}>送信</span>
                  </div>
                  <div style={{ animation: "slideIn .6s .8s cubic-bezier(.16,1,.3,1) forwards", opacity: 0, marginBottom: 12 }}>
                    <div className="cc">
                      <div className="cc-av" style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-deep))" }}>S</div>
                      <div className="cc-info">
                        <div className="cc-name">佐藤 太郎</div>
                        <div className="cc-role">sato@example.co.jp · フロントエンド希望</div>
                      </div>
                      <div className="cc-badge" style={{ background: "var(--accent-glow)", color: "var(--accent-deep)" }}>ATS登録済</div>
                    </div>
                  </div>
                  <div style={{ animation: "slideIn .6s 1.3s cubic-bezier(.16,1,.3,1) forwards", opacity: 0 }}>
                    <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, padding: "10px 14px" }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink)", marginBottom: 8, display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <Icon name="doc" size={12} /> 求人情報をお届け
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        {["フロントエンドエンジニア.pdf", "開発チーム紹介.pdf"].map((f, j) => (
                          <div key={j} style={{ flex: 1, background: "var(--bg-soft)", border: "1px solid var(--line)", borderRadius: 8, padding: "6px 8px", display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
                            <div style={{ width: 22, height: 22, borderRadius: 5, background: "linear-gradient(135deg, var(--accent), var(--accent-deep))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "#fff", fontWeight: 800, flexShrink: 0 }}>PDF</div>
                            <div style={{ fontSize: 9, fontWeight: 700, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* P2 — score cards */}
          <div className="phase-row">
            <div>
              <div className="ptag">Phase 2 — 評価</div>
              <div className="ph">志望度を自動判定し、振り分け</div>
              <div className="pd">
                閲覧、チャット内容、訪問パターンをリアルタイムで点数化。
                面談に値する候補者だけが予約へと進みます。
              </div>
              {phases[2].map((c, i) => (
                <div className="pf" key={i}>
                  <div className="pf-dot" />
                  {c.t}
                </div>
              ))}
            </div>
            <div>
              <div className="pvis" style={{ background: "linear-gradient(160deg, var(--bg-soft), var(--surface))", padding: 22 }}>
                <div style={{ position: "absolute", top: 20, left: 20, right: 20 }}>
                  {[
                    { name: "佐藤 太郎", role: "フロントエンド希望", score: 88, level: "Hot", color: "var(--accent)", bg: "var(--accent-glow)", delay: ".3s" },
                    { name: "田中 花子", role: "SRE希望", score: 62, level: "Warm", color: "var(--violet)", bg: "var(--violet-glow)", delay: ".6s" },
                    { name: "山本 健一", role: "データエンジニア希望", score: 35, level: "Cold", color: "var(--ink-mute)", bg: "var(--bg-soft)", delay: ".9s" },
                  ].map((c, i) => (
                    <div key={i} style={{ animation: `chatPop .5s ${c.delay} cubic-bezier(.16,1,.3,1) forwards`, opacity: 0, marginBottom: 10 }}>
                      <div className="cc" style={{ padding: "10px 12px" }}>
                        <div className="cc-av" style={{ background: c.color }}>{c.name[0]}</div>
                        <div className="cc-info">
                          <div className="cc-name">{c.name}</div>
                          <div className="cc-role">{c.role}</div>
                          <div style={{ height: 4, borderRadius: 2, background: "var(--bg-soft)", marginTop: 4, overflow: "hidden" }}>
                            <div
                              style={{ height: "100%", borderRadius: 2, background: c.color, ["--sw" as string]: `${c.score}%`, animation: `scoreUp 1s ${c.delay} cubic-bezier(.16,1,.3,1) forwards` } as React.CSSProperties}
                            />
                          </div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div style={{ fontFamily: "var(--fm)", fontSize: 16, fontWeight: 700, color: c.color }}>{c.score}</div>
                          <div className="cc-badge" style={{ background: c.bg, color: c.color, marginTop: 2 }}>{c.level}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div style={{ animation: "slideIn .6s 1.4s cubic-bezier(.16,1,.3,1) forwards", opacity: 0, marginTop: 12 }}>
                    <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--accent-glow)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-deep)" }}>
                          <Icon name="target" size={14} />
                        </div>
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink)" }}>佐藤 太郎 → カジュアル面談</div>
                          <div style={{ fontSize: 9, color: "var(--ink-mute)" }}>スコア 88 · 条件クリア</div>
                        </div>
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "var(--accent-deep)" }}>→</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* P3 — kanban */}
          <div className="phase-row rev">
            <div>
              <div className="ptag">Phase 3 — 育成</div>
              <div className="ph">AI が候補者を、自動で育成</div>
              <div className="pd">
                候補者の状態に応じて、メール配信・チャット再接触・行動トラッキングを自動で組み合わせます。
              </div>
              {phases[3].map((c, i) => (
                <div className="pf" key={i}>
                  <div className="pf-dot" />
                  {c.t}
                </div>
              ))}
            </div>
            <div>
              <div className="pvis" style={{ background: "linear-gradient(160deg, var(--surface), var(--bg-soft))", padding: 16 }}>
                <div style={{ position: "absolute", top: 16, left: 0, right: 0, textAlign: "center", animation: "nodeGrow .5s .2s cubic-bezier(.16,1,.3,1) forwards", opacity: 0 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--violet-glow)", border: "1px solid rgba(124,92,252,0.2)", borderRadius: 999, padding: "5px 14px", fontSize: 10, fontWeight: 800, color: "var(--violet)", fontFamily: "var(--fm)", letterSpacing: 0.08 }}>
                    <Icon name="brain" size={12} /> AI ナーチャリングエンジン
                  </span>
                </div>
                <div style={{ position: "absolute", top: 56, left: 12, right: 12, display: "flex", gap: 6 }}>
                  {[
                    { t: "Cold Lead", c: "var(--ink-mute)", bg: "var(--bg-soft)", bd: "var(--line)", items: ["社員インタビュー", "開発文化紹介", "エントリー誘導"], g: "エントリー完了", d: ".5s" },
                    { t: "Warm Lead", c: "var(--cyan)", bg: "var(--cyan-glow)", bd: "rgba(8,145,178,0.22)", items: ["ポジション詳細", "待遇・福利厚生", "チャット再接触"], g: "面談予約", d: ".8s" },
                    { t: "Qualified", c: "var(--accent-deep)", bg: "var(--accent-glow)", bd: "rgba(18,163,125,0.24)", items: ["確認メール", "会社紹介資料", "リマインダー"], g: "選考通過", d: "1.1s" },
                  ].map((col, i) => (
                    <div key={i} style={{ flex: 1, animation: `nodeGrow .5s ${col.d} cubic-bezier(.16,1,.3,1) forwards`, opacity: 0 }}>
                      <div style={{ background: col.bg, border: `1px solid ${col.bd}`, borderRadius: 10, padding: "8px 6px" }}>
                        <div style={{ fontSize: 9, fontWeight: 800, color: col.c, marginBottom: 5, textAlign: "center", fontFamily: "var(--fm)", letterSpacing: 0.06 }}>{col.t}</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                          {col.items.map((it, j) => (
                            <div key={j} style={{ background: "var(--surface)", borderRadius: 5, padding: "4px 6px", fontSize: 8, fontWeight: 600, color: "var(--ink)", border: `1px solid ${col.bd}` }}>{it}</div>
                          ))}
                        </div>
                        <div style={{ textAlign: "center", fontSize: 7, fontWeight: 700, color: col.c, marginTop: 6 }}>目標: {col.g}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ position: "absolute", bottom: 12, left: 12, right: 12, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10, padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", animation: "slideIn .6s 1.6s cubic-bezier(.16,1,.3,1) forwards", opacity: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--accent-deep)" }}>
                    <Icon name="spark" size={12} />
                    <span style={{ fontSize: 9, fontWeight: 700, color: "var(--ink)" }}>行動シグナルで自動加速</span>
                  </div>
                  <span style={{ fontSize: 8, fontWeight: 600, color: "var(--ink-mute)" }}>募集要項を再閲覧 → メール前倒し</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ COMPARISON ============ */}
      <section className="section" id="comp">
        <div className="inner">
          <div className="head-grid">
            <div className="head-left">
              <div className="eyebrow">Comparison</div>
            </div>
            <div>
              <div className="head-title">
                従来の採用 vs <em>Meeton Talent</em>
              </div>
              <p className="head-sub">
                フォームとシナリオ型チャットボットの限界を、AI が根本から解決します。
              </p>
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="ctbl">
              <thead>
                <tr>
                  <th style={{ width: "22%" }}>項目</th>
                  <th style={{ width: "39%" }}>従来の採用サイト</th>
                  <th style={{ width: "39%" }}>Meeton Talent</th>
                </tr>
              </thead>
              <tbody>
                {compData.map((r, i) => (
                  <tr key={i}>
                    <td className="cat">{r.cat}</td>
                    <td className="old">{r.old}</td>
                    <td className="new">{r.nw}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============ WHY ============ */}
      <section className="section">
        <div className="inner">
          <div className="head-grid">
            <div className="head-left">
              <div className="eyebrow">Why Meeton Talent</div>
            </div>
            <div>
              <div className="head-title">
                ここでしか<em>得られない</em>採用の体験。
              </div>
              <p className="head-sub">
                従来の採用チャットボットやエントリーフォームとは、根本的に異なるアプローチ。
              </p>
            </div>
          </div>
          <div className="wg">
            {whyData.map((w, i) => (
              <div className="wc" key={i}>
                <div className="wc-ico"><Icon name={w.icon} /></div>
                <div className="wc-title">{w.title}</div>
                <div className="wc-desc">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STEPS ============ */}
      <section className="section">
        <div className="inner">
          <div className="head-grid">
            <div className="head-left">
              <div className="eyebrow">How it works</div>
            </div>
            <div>
              <div className="head-title">
                かんたん<em>3 ステップ</em>で導入。
              </div>
              <p className="head-sub">
                開発リソース不要。最短当日から、AI が動き始めます。
              </p>
            </div>
          </div>
          <div className="steps-track">
            {stepsData.map((s) => (
              <div className="step" key={s.num}>
                <div className="step-num">{s.num} / STEP</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CASES (coming soon) ============ */}
      <section className="section">
        <div className="inner">
          <div className="head-grid">
            <div className="head-left">
              <div className="eyebrow">Case studies</div>
            </div>
            <div>
              <div className="head-title">
                導入企業の<em>成果</em>。
              </div>
              <p className="head-sub">
                先行導入企業様の成果データを準備中です。先行導入にご興味のある企業様はお気軽にお問い合わせください。
              </p>
            </div>
          </div>
          <div className="cs-card">
            <div className="cs-inner">
              <div className="cs-pill"><span className="dot" />準備中</div>
              <div className="cs-label">COMING SOON</div>
              <p className="cs-body">
                現在、導入企業様の成果データを準備中です。
                先行導入にご興味のある企業様はお気軽にお問い合わせください。
              </p>
              <button type="button" className="btn-primary" onClick={() => setIsMeetingModalOpen(true)} style={{ background: "#6fe3b2", borderColor: "#6fe3b2", color: "var(--dark-bg)" }}>
                先行導入について相談する
                <Icon name="arrow" size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ INTEGRATIONS (coming soon) ============ */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="inner">
          <div className="head-grid">
            <div className="head-left">
              <div className="eyebrow">Integrations</div>
            </div>
            <div>
              <div className="head-title">
                主要採用ツールと、<em>シームレス連携</em>。
              </div>
              <p className="head-sub">
                ATS、カレンダー、チャットツールとの連携機能は現在開発中です。
              </p>
            </div>
          </div>
          <div className="cs-card" style={{ maxWidth: 680 }}>
            <div className="cs-inner">
              <div className="cs-pill"><span className="dot" />準備中</div>
              <div className="cs-label" style={{ fontSize: "clamp(22px,3vw,32px)" }}>COMING SOON</div>
              <p className="cs-body">
                ATS、カレンダー、チャットツールとの連携機能は現在開発中です。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="section" id="faq">
        <div className="inner">
          <div className="head-grid">
            <div className="head-left">
              <div className="eyebrow">FAQ</div>
            </div>
            <div>
              <div className="head-title">
                よくある<em>ご質問</em>。
              </div>
            </div>
          </div>
          <div className="fl">
            {faqData.map((f, i) => (
              <div className={"fi" + (faq === i ? " open" : "")} key={i}>
                <button type="button" className="fq" onClick={() => setFaq(faq === i ? null : i)} aria-expanded={faq === i}>
                  <span>{f.q}</span>
                  <span className="ft">+</span>
                </button>
                {faq === i && <div className="fa">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CLOSING ============ */}
      <section className="closing">
        <div className="closing-mesh" />
        <div className="closing-inner">
          <div className="closing-pill">
            <span>◆</span> Get started
          </div>
          <h2>
            採用サイト訪問者の <em>99%</em> を、<br />
            失い続けますか？
          </h2>
          <p className="closing-body">
            Meeton Talent を数分で導入。コード不要。
            興味を持った候補者を、面談に変えましょう。
          </p>
          <div className="closing-actions">
            <button type="button" className="closing-cta" onClick={() => setIsDocModalOpen(true)}>
              資料請求
              <Icon name="arrow" size={16} />
            </button>
            <button type="button" className="closing-ghost" onClick={() => setIsMeetingModalOpen(true)}>
              デモを予約
            </button>
          </div>
        </div>
      </section>

      <Footer variant="light" />

      <HubSpotModal isOpen={isDocModalOpen} onClose={() => setIsDocModalOpen(false)} utmCampaign="meeton-talent" />
      <HubSpotMeetingModal isOpen={isMeetingModalOpen} onClose={() => setIsMeetingModalOpen(false)} utmCampaign="meeton-talent" />
    </div>
  );
}
