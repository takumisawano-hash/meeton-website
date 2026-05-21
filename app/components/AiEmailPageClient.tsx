'use client'

import { useState } from "react";
import { openMeetonCalendar, openMeetonDownloadCenter } from "@/app/lib/meeton-cta";
import dynamic from "next/dynamic";
import Link from "next/link";
import Nav from "./Nav";
import Footer from "./Footer";
const HubSpotModal = dynamic(() => import("./HubSpotModal"), { ssr: false });
const HubSpotMeetingModal = dynamic(() => import("./HubSpotMeetingModal"), { ssr: false });
import MidPageCta from "./MidPageCta";

const css = `
:root {
  --bg:#ffffff;--surface:#f4f6fb;--surface2:#eaedfa;
  --border:#dfe3f0;--border2:#c8cedf;
  --text:#4a506e;--heading:#0f1128;--sub:#6e7494;
  --cta:#7c5cfc;--cta-hover:#9b7dfd;--cta-glow:rgba(124,92,252,.25);--cta-light:#f0ecfe;
  --accent:#3b6ff5;--accent-light:#eaf0fe;--accent-glow:rgba(59,111,245,.2);
  --blue:#3b6ff5;--blue-light:#eaf0fe;
  --cyan:#0891b2;--green:#04cb78;--pink:#d03ea1;--red:#e0475b;
  --fd:'Plus Jakarta Sans',var(--font-jakarta),sans-serif;--fb:'Noto Sans JP',var(--font-noto),'Plus Jakarta Sans',sans-serif;--fm:'JetBrains Mono',var(--font-mono),monospace;
}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--text);font-family:var(--fb);font-size:18px;overflow-x:hidden;-webkit-font-smoothing:antialiased}

@keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideUpOnly{from{transform:translateY(24px)}to{transform:translateY(0)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
.anim{opacity:0;animation:fadeUp .8s cubic-bezier(.16,1,.3,1) forwards}
.anim-y{animation:slideUpOnly .6s cubic-bezier(.16,1,.3,1) forwards}
.d1{animation-delay:.1s}.d2{animation-delay:.22s}.d3{animation-delay:.38s}.d4{animation-delay:.52s}.d5{animation-delay:.68s}

.btn{border:none;cursor:pointer;font-family:var(--fb);transition:transform .2s cubic-bezier(.16,1,.3,1),box-shadow .25s,background .2s;font-weight:700;border-radius:10px;min-height:44px;-webkit-tap-highlight-color:transparent;display:inline-flex;align-items:center;justify-content:center;gap:8px}
.btn-cta{display:inline-flex;align-items:center;justify-content:center;text-align:center;text-decoration:none;background:linear-gradient(135deg,var(--cta),#9b7dfd);color:#fff;padding:14px 28px;font-size:15px;box-shadow:0 4px 16px var(--cta-glow),0 1px 0 rgba(255,255,255,.18) inset;letter-spacing:.01em}
.btn-cta:hover{transform:translateY(-2px);box-shadow:0 10px 28px var(--cta-glow),0 1px 0 rgba(255,255,255,.22) inset}
.btn-cta:active{transform:translateY(0)}
.btn-cta-lg{padding:18px 40px;font-size:18px;box-shadow:0 8px 30px var(--cta-glow),0 1px 0 rgba(255,255,255,.18) inset}
.btn-ghost{background:transparent;color:var(--heading);border:2px solid var(--border2);padding:16px 36px;border-radius:10px;font-size:18px;font-weight:700;cursor:pointer;font-family:var(--fb);transition:all .25s;min-height:44px;-webkit-tap-highlight-color:transparent;display:inline-flex;align-items:center;justify-content:center;gap:8px}
.btn-ghost:hover{border-color:var(--cta);color:var(--cta);background:var(--cta-light);transform:translateY(-1px)}
.btn-ghost:active{transform:translateY(0)}
.btn-ghost svg{transition:transform .25s cubic-bezier(.16,1,.3,1)}
.btn-ghost:hover svg{transform:translateX(3px)}

.slabel{font-family:var(--fm);font-size:12px;font-weight:700;color:var(--cta);letter-spacing:3px;text-transform:uppercase;margin-bottom:16px;display:inline-flex;align-items:center;gap:10px}

.slabel-c{justify-content:center}

.section{padding:clamp(64px,10vw,112px) clamp(16px,5vw,48px)}
.section-inner{max-width:1140px;margin:0 auto}
.stitle{font-size:clamp(28px,5vw,48px);font-weight:900;color:var(--heading);line-height:1.18;letter-spacing:-.02em;margin-bottom:18px}
.stitle em{font-style:normal;background:linear-gradient(135deg,var(--cta),var(--accent))}
.ssub{font-size:clamp(15px,2.5vw,19px);line-height:1.8;color:var(--sub);max-width:680px}

/* HERO - Split Layout */
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:130px 48px 90px;background:#fff;border-bottom:1px solid var(--border)}
.hero-inner{max-width:1200px;width:100%;display:flex;align-items:center;gap:clamp(32px,5vw,72px);position:relative;z-index:2}
.hero-text{flex:1.15;min-width:0}
.hero-visual{flex:1;min-width:0;display:flex;justify-content:center}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:var(--cta-light),var(--accent-light));border:1px solid rgba(124,92,252,.18);padding:9px 22px;border-radius:24px;margin-bottom:28px;font-size:clamp(13px,3vw,15px);font-weight:700;color:var(--cta);backdrop-filter:blur(8px);letter-spacing:.04em}
.hero-badge-dot{width:7px;height:7px;border-radius:50%;background:var(--cta);animation:pulse 2s infinite;box-shadow:0 0 0 0 rgba(124,92,252,.4)}
.hero h1{font-size:clamp(34px,6vw,64px);font-weight:900;color:var(--heading);line-height:1.1;letter-spacing:-.025em;margin-bottom:22px}
.hero h1 em{font-style:normal;background:linear-gradient(135deg,var(--cta),var(--accent));position:relative;display:inline-block}
.hero-sub{font-size:clamp(15px,2.5vw,19px);line-height:1.8;color:var(--sub);max-width:540px;margin-bottom:36px}
.hero-ctas{display:flex;gap:14px;flex-wrap:wrap}
.hero-stats{display:grid;grid-template-columns:repeat(3,minmax(0,auto));gap:clamp(20px,4vw,48px);margin-top:clamp(32px,5vw,44px);padding-top:clamp(24px,4vw,32px);border-top:1px solid var(--border)}
.hero-stat{position:relative;padding-left:clamp(16px,2vw,20px)}
.hero-stat:first-child{padding-left:0}
.hero-stat:not(:first-child)::before{content:'';position:absolute;left:0;top:8px;bottom:8px;width:1px;background:var(--border)}
.stat-v{font-family:var(--fm);font-size:clamp(26px,4vw,40px);font-weight:700;color:var(--heading);background:linear-gradient(135deg,var(--heading),var(--cta));letter-spacing:-.02em;line-height:1.05}
.stat-l{font-size:clamp(11px,1.5vw,13px);color:var(--sub);margin-top:8px;font-weight:600;letter-spacing:.02em}

/* Dashboard Visual */
@keyframes rowSlide{0%{opacity:0;transform:translateX(-16px)}100%{opacity:1;transform:translateX(0)}}
@keyframes barGrow{0%{width:0}100%{width:var(--bw)}}
@keyframes badgePop{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}
@keyframes dotBlink{0%,100%{opacity:.3}50%{opacity:1}}
.dash{width:100%;max-width:420px;background:#fff;border-radius:22px;box-shadow:0 24px 64px rgba(124,92,252,.1),0 1px 3px rgba(0,0,0,.04);border:1px solid var(--border);overflow:hidden;animation:fadeUp .8s .4s cubic-bezier(.16,1,.3,1) forwards;opacity:0;transition:transform .4s cubic-bezier(.16,1,.3,1),box-shadow .4s}
.dash:hover{transform:translateY(-4px);box-shadow:0 32px 80px rgba(124,92,252,.18),0 1px 3px rgba(0,0,0,.04)}
.dash-hdr{padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#f5f3ff,#f0fffe)}
.dash-row{display:flex;align-items:center;gap:10px;padding:10px 16px;border-bottom:1px solid rgba(223,227,240,.5);opacity:0;animation:rowSlide .5s cubic-bezier(.16,1,.3,1) forwards}
.dash-avatar{width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:11px;color:#fff;font-weight:800;flex-shrink:0}

/* PHASE ROWS */
.phase-row{display:flex;align-items:center;gap:clamp(32px,6vw,72px);padding:clamp(40px,8vw,80px) 0;position:relative}
.phase-row.reverse{flex-direction:row-reverse}
.phase-text{flex:1;min-width:0}
.phase-vis{flex:1;min-width:0;display:flex;align-items:center;justify-content:center}
.phase-tag{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:20px;font-family:var(--fm);font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:18px;border:1px solid currentColor;position:relative}
.phase-tag::before{content:'';position:absolute;inset:0;border-radius:inherit;background:currentColor;opacity:.08;pointer-events:none}
.phase-tag-num{font-family:var(--fm);opacity:.6;font-size:10px}
.phase-h{font-size:clamp(24px,4vw,34px);font-weight:900;color:var(--heading);letter-spacing:-.022em;margin-bottom:14px;line-height:1.22}
.phase-desc{font-size:clamp(14px,2vw,16px);line-height:1.85;color:var(--sub);margin-bottom:24px;max-width:480px}
.phase-features{display:flex;flex-direction:column;gap:10px}
.phase-feat{display:flex;align-items:flex-start;gap:10px;font-size:14px;font-weight:600;color:var(--text);line-height:1.55}
.phase-feat-icon{width:18px;height:18px;border-radius:50%;flex-shrink:0;margin-top:1px;display:flex;align-items:center;justify-content:center}
.phase-feat-icon svg{width:11px;height:11px}
.phase-divider{height:1px;background:linear-gradient(90deg,transparent,var(--border) 20%,var(--border) 80%,transparent);max-width:1140px;margin:0 auto}

/* PHASE VISUALS */
.pvis{width:100%;max-width:440px;aspect-ratio:4/3;border-radius:22px;position:relative;overflow:hidden;box-shadow:0 10px 44px rgba(124,92,252,.08),0 1px 3px rgba(0,0,0,.04);border:1px solid var(--border);transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s}
.pvis:hover{transform:translateY(-3px);box-shadow:0 16px 56px rgba(124,92,252,.14),0 1px 3px rgba(0,0,0,.04)}

@keyframes chatPop{0%{opacity:0;transform:translateY(16px) scale(.92)}100%{opacity:1;transform:translateY(0) scale(1)}}
@keyframes scoreUp{0%{width:0}100%{width:var(--sw)}}
@keyframes slideIn{0%{opacity:0;transform:translateX(-20px)}100%{opacity:1;transform:translateX(0)}}
@keyframes nodeGrow{0%{transform:scale(0);opacity:0}100%{transform:scale(1);opacity:1}}
@keyframes ringPulse{0%{box-shadow:0 0 0 0 rgba(124,92,252,.4)}70%{box-shadow:0 0 0 12px rgba(124,92,252,0)}100%{box-shadow:0 0 0 0 rgba(124,92,252,0)}}

.vis0{background:linear-gradient(160deg,#f0ecfe,#eaf0fe)}
.vis1{background:linear-gradient(160deg,#f5f3ff,#f0ecfe)}
.vis2{background:linear-gradient(160deg,#f0ecfe,#edfcf7)}
.vis3{background:linear-gradient(160deg,#f5f3ff,#ecfeff)}

/* FLOW STEPS */
.flow-section{padding:clamp(64px,10vw,112px) clamp(16px,5vw,48px);background:linear-gradient(180deg,var(--surface) 0%,#eef1f8 100%);position:relative;overflow:hidden;border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.flow-steps{display:flex;align-items:flex-start;justify-content:center;gap:0;max-width:1140px;margin:0 auto;position:relative}
.flow-step{display:flex;flex-direction:column;align-items:center;text-align:center;flex:1;position:relative;padding:0 8px;min-width:0;transition:transform .25s cubic-bezier(.16,1,.3,1)}
.flow-step:hover{transform:translateY(-3px)}
.flow-num{width:60px;height:60px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:22px;font-weight:800;color:#fff;margin-bottom:14px;position:relative;z-index:2;box-shadow:0 6px 20px rgba(0,0,0,.12),0 0 0 6px rgba(255,255,255,.7),0 0 0 7px var(--border)}
.flow-step:hover .flow-num{box-shadow:0 10px 28px rgba(124,92,252,.25),0 0 0 6px rgba(255,255,255,.9),0 0 0 7px var(--cta)}
.flow-icon{font-size:24px;margin-bottom:8px}
.flow-title{font-size:clamp(12px,1.5vw,15px);font-weight:800;color:var(--heading);line-height:1.3;margin-bottom:4px;letter-spacing:-.005em}
.flow-sub{font-size:clamp(10px,1.2vw,12px);color:var(--sub);line-height:1.4;font-weight:500;font-family:var(--fm);letter-spacing:.02em}
.flow-arrow{display:flex;align-items:center;padding-top:24px;color:var(--border2);font-size:24px;font-family:var(--fm);flex-shrink:0;width:40px;justify-content:center}
.flow-connector{position:absolute;top:30px;left:calc(50% + 30px);width:calc(100% - 60px);height:2px;background:linear-gradient(90deg,var(--border2),var(--cta),var(--border2));z-index:1;opacity:.5}
.flow-step:last-child .flow-connector{display:none}

/* USE CASES */
.usecase-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:56px}
.usecase-card{background:var(--bg);border:1px solid var(--border);border-radius:18px;padding:32px 28px;transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s,border-color .25s;position:relative;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 1px 2px rgba(15,17,40,.03)}
.usecase-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--uc-color,#7c5cfc);opacity:.9;transition:opacity .25s,height .25s}
.usecase-card:hover{transform:translateY(-4px);box-shadow:0 24px 56px -20px rgba(124,92,252,.18);border-color:transparent}
.usecase-card:hover::before{height:4px}
.usecase-num{position:absolute;top:24px;right:28px;font-family:var(--fm);font-size:12px;font-weight:800;color:var(--sub);letter-spacing:.1em;opacity:.6}

/* WHY */
.why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.why-card{background:var(--bg);border:1px solid var(--border);border-radius:18px;padding:28px 26px;transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s,border-color .25s;box-shadow:0 1px 2px rgba(15,17,40,.03);position:relative;overflow:hidden;display:flex;flex-direction:column}
.why-card:hover{border-color:transparent;transform:translateY(-6px);box-shadow:0 24px 56px -20px rgba(124,92,252,.2)}
.why-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--cta),var(--accent));opacity:0;transition:opacity .3s}
.why-card:hover::before{opacity:1}
.why-icon{margin-bottom:18px;transition:transform .35s cubic-bezier(.16,1,.3,1)}
.why-card:hover .why-icon{transform:scale(1.06)}
.why-num{position:absolute;top:24px;right:24px;font-family:var(--fm);font-size:11px;font-weight:800;color:var(--sub);letter-spacing:.08em;opacity:.55}
.why-title{font-size:17px;font-weight:800;color:var(--heading);margin-bottom:10px;letter-spacing:-.01em;line-height:1.35}
.why-desc{font-size:14.5px;line-height:1.75;color:var(--sub)}

/* FAQ */
.faq-list{max-width:760px;margin:0 auto;display:flex;flex-direction:column;gap:10px}
.faq-item{background:var(--bg);border:1px solid var(--border);border-radius:14px;overflow:hidden;transition:border-color .25s,box-shadow .25s,transform .2s}
.faq-item:hover{border-color:var(--border2);box-shadow:0 6px 20px -10px rgba(15,17,40,.1)}
.faq-item.open{border-color:var(--cta);box-shadow:0 10px 32px -16px var(--cta-glow)}
.faq-q{padding:22px 26px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;font-size:17px;font-weight:700;color:var(--heading);transition:color .2s;gap:16px;line-height:1.5;letter-spacing:-.005em;min-height:64px}
.faq-q:hover{color:var(--cta)}
.faq-toggle{width:32px;height:32px;border-radius:50%;background:var(--surface);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:300;color:var(--sub);transition:transform .3s cubic-bezier(.16,1,.3,1),background .25s,color .2s;flex-shrink:0}
.faq-item.open .faq-toggle{background:var(--cta-light);color:var(--cta);transform:rotate(45deg)}
.faq-a{padding:0 26px 22px;font-size:15px;line-height:1.85;color:var(--sub)}

/* CTA */
.final-cta{padding:clamp(72px,10vw,112px) clamp(16px,5vw,48px) clamp(88px,12vw,128px);text-align:center;position:relative;overflow:hidden;background:linear-gradient(165deg,#f0ecfe 0%,#fff 40%,#eaf0fe 80%,#f0ecfe 100%);border-top:1px solid var(--border)}
.final-cta-inner{max-width:640px;margin:0 auto;position:relative;z-index:2}
.final-cta-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}

/* RESPONSIVE */
@media(max-width:1024px){
  .hero-inner{flex-direction:column;text-align:center}
  .hero-text{text-align:center}
  .hero-sub{margin-left:auto;margin-right:auto}
  .hero-ctas{justify-content:center}
  .hero-stats{justify-content:center;grid-template-columns:repeat(3,minmax(0,auto))}
  .dash{max-width:360px}
  .phase-row{flex-direction:column;gap:40px}
  .phase-row.reverse{flex-direction:column}
  .phase-desc{max-width:none}
  .why-grid{grid-template-columns:repeat(2,1fr)}
  .usecase-grid{grid-template-columns:repeat(2,1fr)}
  .flow-steps{flex-wrap:wrap;gap:24px 0;justify-content:center}
  .flow-step{flex:0 0 calc(33.33% - 14px);min-width:120px}
  .flow-connector{display:none}
  .flow-arrow{display:none}
}
@media(max-width:768px){
  .hero{padding:90px 20px 50px;min-height:auto}
  .hero-badge{padding:7px 16px;margin-bottom:20px}
  .hero-ctas{flex-direction:column;align-items:stretch;width:100%;max-width:320px;margin:0 auto}
  .hero-stats{gap:18px;grid-template-columns:repeat(3,1fr);text-align:center;width:100%}
  .hero-stat{padding-left:0}
  .hero-stat:not(:first-child)::before{display:none}
  .dash{max-width:340px}
  .why-grid{grid-template-columns:1fr;max-width:480px;margin:0 auto}
  .usecase-grid{grid-template-columns:1fr;max-width:480px;margin:44px auto 0}
  .pvis{max-width:100%;aspect-ratio:1/1.2;min-height:380px}
  .btn-cta-lg{padding:14px 24px;font-size:16px;width:100%}
  .btn-ghost{padding:14px 24px;font-size:16px;width:100%}
  .phase-features{gap:8px}
  .phase-feat{font-size:13px}
  .why-card{padding:24px}
  .faq-q{padding:18px 22px;font-size:16px;min-height:60px}
  .faq-a{padding:0 22px 18px;font-size:14px}
  .flow-step{flex:0 0 calc(50% - 10px)}
  .final-cta-ctas{flex-direction:column;align-items:stretch;max-width:320px;margin:0 auto}
}
@media(max-width:480px){
  .hero{padding:80px 16px 40px}
  .dash{max-width:100%}
  .pvis{aspect-ratio:1/1.4;min-height:400px}
  .pvis>div{transform:scale(0.78);transform-origin:top center}
  .flow-step{flex:0 0 100%}
  .flow-num{width:50px;height:50px;font-size:18px}
}
`;

const faqData = [
  { q: 'CRM に眠る休眠リード・過去 MQL・失注リードからも商談を作れますか？', a: 'はい。Meeton Email が CRM 上の過去 MQL・失注リード・休眠 contact の行動シグナル（サイト再訪、メール開封、料金ページ閲覧、ウェビナー参加等）を検知し、再検討タイミングの瞬間を捉えて文脈に沿って再アプローチし、返信や再訪があれば Meeton Live が会話を再開、Meeton Calendar が商談予約まで進めます。新規 Web リードだけでなく、既存 CRM データに眠る商談機会まで掘り起こせるのが Meeton Email の特徴です。' },
  { q: 'Meeton Email は MA のメール配信と何が違いますか？', a: 'MA メールは「事前定義したシナリオ × テンプレート文面」を時間ベースで配信します。Meeton Email は「リードの最新行動 × AI 動的生成」をリアルタイムで判断し、送るタイミング・送る内容・送らない判断まで AI が文脈で都度決めます。リードの反応に応じて、商談につながる次の一手を AI が選び続ける、もう一人の SDR として動きます。' },
  { q: 'Meeton Calendar で予約しなかったリードに、いつ送られますか？', a: '事前定義の「Day 1 / Day 3 / Day 5」のような固定シーケンスではありません。リードの再訪・メール反応・閲覧ページ・MA 上のスコア変化を AI が監視し、送るべきタイミングと内容を文脈で動的判断します。' },
  { q: 'メール文面は自分で作成する必要がありますか？', a: 'いいえ。AIがリードの行動履歴・CRM 上の文脈・ナレッジベースをもとに、メール文面を毎通動的に生成します。トーン・テンプレートのガードレール設定は可能です。' },
  { q: '完全自動と承認モードはどう違いますか？', a: '完全自動モードは AI が生成から送信まですべて自動で行います。承認モードは AI が下書きを作成し、送信前に SDR / 営業担当が確認・編集してから送信できます。リード単位・チーム単位で切替可能です。' },
  { q: '既存の MA ツール（Marketo・HubSpot Marketing 等）と競合しませんか？', a: '競合ではなく、MA の上に乗ります。MA がマーケファネル全体のメール配信を担い、Meeton Email は MA で取りこぼした個別リードへの 1:1 SDR 追跡を担当。Marketo・HubSpot Marketing・Pardot などとの連携・並走を前提に設計されています。' },
  { q: 'リードからの返信には対応していますか？', a: 'Meeton Email は送信専用です。返信が届いた場合は、CRM 上の担当 SDR / 営業に通知され、人による対応となります（CC で営業マネジメント層を含めることも可能）。' },
];

const whyData = [
  { title: 'MA メールではなく、もう一人の SDR', desc: 'テンプレート × 時間トリガーの一斉配信ではない。AI が文脈で判断する 1:1 のフォロー。', color: '#7c5cfc', iconPath: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
  { title: 'AI が文脈で動的判断', desc: '送るタイミング・送る内容・送らない判断まで、リードの最新行動から AI が都度決定。', color: '#3b6ff5', iconPath: 'M21 12a9 9 0 1 1-6.22-8.56 M14 8l4 4-4 4 M3 12h15' },
  { title: '次の有効アクションを選ぶ', desc: '高意向リードには商談予約、情報収集中なら資料・事例提示。文脈で次の一手を判断する。', color: '#04cb78', iconPath: 'M9 12l2 2 4-4 M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.49 0 4.74 1.01 6.36 2.64' },
  { title: 'MA の上に乗る設計', desc: 'Marketo / HubSpot Marketing と並走可能。MA が取りこぼしたリードに 1:1 で追いつく。', color: '#0891b2', iconPath: 'M22 12h-4l-3 9L9 3l-3 9H2' },
];

const flowSteps = [
  { num: '1', title: '即時予約しなかったリードを検知', sub: 'No-book detected', color: '#6e7494' },
  { num: '2', title: 'AIが文脈で送信判断', sub: 'AI decides timing', color: '#7c5cfc' },
  { num: '3', title: '最新行動から動的生成', sub: 'Dynamic generation', color: '#9b7dfd' },
  { num: '4', title: '反応次第で次手を変更', sub: 'Adapt by signal', color: '#3b6ff5' },
  { num: '5', title: '商談予約獲得', sub: 'Meeting booked', color: '#04cb78' },
];

const flowStepIcons = [
  <><circle key="f0a" cx="12" cy="12" r="10"/><path key="f0b" d="M12 6v6l4 2"/></>,
  <><path key="f1a" d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path key="f1b" d="M22 6l-10 7L2 6"/></>,
  <><path key="f2a" d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><path key="f2b" d="M12.5 7a4 4 0 1 0-8 0 4 4 0 0 0 8 0z"/><path key="f2c" d="M20 8v6"/><path key="f2d" d="M23 11h-6"/></>,
  <><path key="f3a" d="M17 1l4 4-4 4"/><path key="f3b" d="M3 11V9a4 4 0 0 1 4-4h14"/><path key="f3c" d="M7 23l-4-4 4-4"/><path key="f3d" d="M21 13v2a4 4 0 0 1-4 4H3"/></>,
  <><circle key="f4a" cx="12" cy="12" r="10"/><path key="f4b" d="M9 12l2 2 4-4"/></>,
];

const useCaseData = [
  {
    title: '即時予約しなかったリードの追跡',
    color: '#7c5cfc',
    desc: 'Meeton Calendar や Meeton Live で即時予約に至らなかった見込み客を、Meeton Email が SDR として 1:1 で追跡。MA の一斉配信では拾えない個別文脈に踏み込みます。',
    example: '先ほど料金ページでお迷いだった点、御社の業界に近い事例を 1 つだけお送りします。30 分でご案内可能です。',
  },
  {
    title: '資料 DL 後の文脈追跡',
    color: '#3b6ff5',
    desc: '資料 DL 後の再訪・閲覧ページ・別資料の DL を AI が監視。次に送るべき情報を行動文脈から動的に判断します。',
    example: '先日 DL いただいたガイドの中で、特にご関心が高そうな「料金最適化」の章について、補足資料をお送りしました。',
  },
  {
    title: '休眠リードの再接触',
    color: '#04cb78',
    desc: '過去に接点があったが冷えてしまった CRM 上のリードへ、最新のサイト再訪をトリガーに AI が再アプローチを判断。',
    example: '以前ご関心をお持ちいただいたテーマについて、最近近い企業様の事例が増えてきました。再検討のタイミングでしたら、要点だけお送りします。',
  },
];

export default function AiEmailPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <Nav variant="light" />

      {/* HERO - Split Layout */}
      <section className="hero">

        <div className="hero-inner">
          <div className="hero-text">
            <div className="anim-y d1 hero-badge"><div className="hero-badge-dot" />MEETON EMAIL</div>
            <h1 className="anim-y d2">未予約リード追客 +<br /><em>CRM に眠るリードの再商談化</em></h1>
            <p className="anim-y d3 hero-sub">Meeton Email は、Meeton Calendar で予約に至らなかったリードを 1:1 で追跡するだけではありません。CRM に眠る過去 MQL・失注リード・休眠 contact の再検討シグナル（サイト再訪、料金閲覧、メール再開封等）を Meeton Email が検知し、AI が文脈に沿って再アプローチ。商談予約をゴールに、Web 接点と CRM データの両方から商談機会を生み出します。</p>
            <div className="anim d4 hero-ctas">
              <button className="btn btn-cta btn-cta-lg" onClick={openMeetonDownloadCenter}>資料請求</button>
              <button className="btn-ghost" onClick={openMeetonCalendar}>
                デモを予約
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </button>
            </div>
            <div className="anim d5 hero-stats">
              {[{ v: '1:1', l: 'AI SDR 追跡' }, { v: '動的判断', l: 'MAテンプレでない' }, { v: '反応で選ぶ', l: '次の一手' }].map((s, i) => (
                <div key={i} className="hero-stat"><div className="stat-v">{s.v}</div><div className="stat-l">{s.l}</div></div>
              ))}
            </div>
          </div>
          <div className="hero-visual anim d4">
            <div className="dash">
              <div className="dash-hdr">
                <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,#7c5cfc,#9b7dfd)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#fff', fontWeight: 800 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--heading)' }}>Meeton Email — AI SDR フロー</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cta)', animation: 'dotBlink 1.5s infinite' }} />
                    <span style={{ fontSize: 10, color: 'var(--sub)', fontWeight: 600 }}>AI が文脈で判断中</span>
                  </div>
                </div>
              </div>
              <div style={{ padding: '6px 0' }}>
                {[
                  { step: 'タッチ #1', subject: 'Meeton Calendar 未予約を検知', status: '即時送信', statusColor: '#6e7494', statusBg: '#f4f6fb', delay: '.6s', behavior: '初動メール: 関心領域に直接触れる' },
                  { step: 'タッチ #2', subject: '別アングルで再アプローチ', status: '開封 ✓', statusColor: '#7c5cfc', statusBg: '#f0ecfe', delay: '.9s', behavior: '料金ページ再訪を AI が検知' },
                  { step: 'タッチ #3', subject: '前回クリックした章を深掘り', status: 'クリック ✓', statusColor: '#3b6ff5', statusBg: '#eaf0fe', delay: '1.2s', behavior: '反応領域に絞って追加資料' },
                  { step: 'タッチ #4', subject: 'Meeton Calendar 提案', status: '送信判断', statusColor: '#04cb78', statusBg: '#e5f8f2', delay: '1.5s', behavior: '商談予約への着地を AI が判断' },
                ].map((v, i) => (
                  <div className="dash-row" key={i} style={{ animationDelay: v.delay }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg,${v.statusColor}cc,${v.statusColor})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 800, flexShrink: 0 }}>{(i + 1).toString()}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--heading)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.subject}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600 }}>{v.step}</span>
                        <span style={{ fontSize: 9, fontWeight: 700, color: v.statusColor, background: v.statusBg, padding: '2px 6px', borderRadius: 4 }}>{v.status}</span>
                        <span style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 500 }}>{v.behavior}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#7c5cfc', animation: 'pulse 1.5s infinite' }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)' }}>AI が文脈で動的判断</span>
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--cta)', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                  承認 / 完全自動 切替可能
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-STEP FLOW */}
      <section className="flow-section">
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}><div className="slabel slabel-c" style={{ marginBottom: 0 }}>パイプライン</div></div>
          <div className="stitle" style={{ textAlign: 'center' }}>Meeton Email の流れ</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 52px' }}>即時予約しなかったリードを、AI が最新行動の文脈で動的判断しながら、商談予約まで 1:1 で追跡します。</p>
          <div className="flow-steps">
            {flowSteps.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', flex: 1 }}>
                <div className="flow-step">
                  <div className="flow-connector" style={{ background: `linear-gradient(90deg, ${step.color}40, ${flowSteps[Math.min(i + 1, 4)].color}40)` }} />
                  <div className="flow-num" style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}cc)` }}>{step.num}</div>
                  <div style={{width:28,height:28,margin:'0 auto 8px'}}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={step.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {flowStepIcons[i]}
                    </svg>
                  </div>
                  <div className="flow-title" style={{ whiteSpace: 'pre-line' }}>{step.title}</div>
                  <div className="flow-sub">{step.sub}</div>
                </div>
                {i < 4 && <div className="flow-arrow"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE DETAILS */}
      <section className="section" style={{ position: 'relative', paddingBottom: 0 }}>
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}><div className="slabel slabel-c" style={{ marginBottom: 0 }}>機能詳細</div></div>
          <div className="stitle" style={{ textAlign: 'center' }}>Meeton Email の仕組みを深掘り</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 20px' }}>MA メールとの違い・AI による動的判断・送信モード切替まで、SDR エージェントの動作を詳しく。</p>
        </div>
      </section>

      {/* Feature 1: Instant Follow-up */}
      <section style={{ padding: '0 clamp(16px,5vw,48px)', position: 'relative' }}>
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{ color: '#7c5cfc' }}><span style={{ position: 'relative' }}>FEATURE 01</span></div>
              <div className="phase-h">MA メールではなく、もう一人の SDR</div>
              <div className="phase-desc">即時の商談予約は Meeton Calendar が担います。Meeton Email はその先 ── 即時予約に至らなかった個別リードを、SDR として 1:1 で諦めず追跡します。MA の一斉配信では拾えない文脈に踏み込み、商談予約までをゴールに動きます。</div>
              <div className="phase-features">
                {[
                  'Meeton Calendar 未予約リードを自動検知',
                  '一斉配信ではなく、個別リードの 1:1 追跡',
                  'MA の上に乗る設計（Marketo / HubSpot Marketing 並走可）',
                  '人間 SDR を増やさずに取りこぼしを回収',
                ].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-icon" style={{ background: '#7c5cfc15', color: '#7c5cfc' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis0">
                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)', marginBottom: 12, animation: 'chatPop .4s .2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>MA メール vs Meeton Email</div>
                  {/* MA email comparison */}
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 14, marginBottom: 10, animation: 'chatPop .5s .4s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18 M6 6l12 12"/></svg>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--heading)' }}>従来の MA メール</div>
                        <div style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600 }}>テンプレ × 時間トリガーの一斉配信</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, height: 8, background: 'var(--surface)', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ width: '8%', height: '100%', background: 'linear-gradient(90deg,#dc2626,#ef4444)', borderRadius: 4 }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 900, color: '#dc2626', fontFamily: 'var(--fm)' }}>固定シーケンス</span>
                    </div>
                  </div>
                  {/* With Meeton Email */}
                  <div style={{ background: '#fff', border: '1px solid #7c5cfc30', borderRadius: 12, padding: 14, animation: 'chatPop .5s .8s cubic-bezier(.16,1,.3,1) forwards', opacity: 0, boxShadow: '0 4px 16px rgba(124,92,252,.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#7c5cfc,#9b7dfd)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--heading)' }}>Meeton Email</div>
                        <div style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600 }}>AI が文脈で動的判断・1:1 追跡</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, height: 8, background: 'var(--surface)', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ width: '78%', height: '100%', background: 'linear-gradient(90deg,#7c5cfc,#9b7dfd)', borderRadius: 4 }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 900, color: '#7c5cfc', fontFamily: 'var(--fm)' }}>動的判断</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12, animation: 'slideIn .5s 1.2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#7c5cfc', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#7c5cfc' }}>SDR として、文脈で 1:1 追跡</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Feature 2: Personalized Nurturing */}
          <div className="phase-row reverse">
            <div className="phase-text">
              <div className="phase-tag" style={{ color: '#3b6ff5' }}><span style={{ position: 'relative' }}>FEATURE 02</span></div>
              <div className="phase-h">AI が文脈で送るタイミング・内容を動的判断</div>
              <div className="phase-desc">「Day 1 / Day 3 / Day 5」のような事前定義シーケンスではありません。リードの再訪・メール開封・クリック・閲覧ページ・MA スコアの変化を AI が監視し、次にいつ・何を送るか（あるいは送らないか）を文脈で都度判断します。</div>
              <div className="phase-features">
                {[
                  '送信タイミングは時間ではなく行動シグナルで判断',
                  'リードの最新文脈から文面を都度動的生成',
                  '反応が悪ければ送らない判断も AI が実施',
                  'リード 1 人 1 人で全く違う追跡パス',
                ].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-icon" style={{ background: '#3b6ff515', color: '#3b6ff5' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis1">
                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)', marginBottom: 10, animation: 'chatPop .4s .2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>AI 動的生成メール プレビュー</div>
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 14, animation: 'chatPop .5s .4s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600, marginBottom: 6 }}>To: tanaka@example.com</div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--heading)', marginBottom: 10 }}>田中様、導入事例をお送りします</div>
                    <div style={{ fontSize: 10, lineHeight: 1.7, color: 'var(--text)' }}>
                      <span>田中様</span><br /><br />
                      <span>先ほどは</span>
                      <span style={{ background: '#7c5cfc18', color: '#7c5cfc', fontWeight: 700, padding: '1px 4px', borderRadius: 3 }}>料金ページ</span>
                      <span>をご覧いただきありがとうございます。</span><br /><br />
                      <span>御社の</span>
                      <span style={{ background: '#7c5cfc18', color: '#7c5cfc', fontWeight: 700, padding: '1px 4px', borderRadius: 3 }}>IT業界</span>
                      <span>での導入事例をまとめました。</span><br /><br />
                      <span style={{ background: '#3b6ff518', color: '#3b6ff5', fontWeight: 700, padding: '1px 4px', borderRadius: 3 }}>30分のデモ</span>
                      <span>で詳しくご説明できます。</span>
                    </div>
                    <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
                      {['最新閲覧', 'CRM文脈', 'AI動的生成'].map((tag, j) => (
                        <span key={j} style={{ fontSize: 8, fontWeight: 700, color: '#7c5cfc', background: '#f0ecfe', padding: '2px 6px', borderRadius: 4 }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 10, animation: 'slideIn .5s 1s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#3b6ff5', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#3b6ff5' }}>AIが文脈で動的生成中...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Feature 3: Auto Sequence */}
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{ color: '#04cb78' }}><span style={{ position: 'relative' }}>FEATURE 03</span></div>
              <div className="phase-h">リードの反応に応じて、次の一手を変える</div>
              <div className="phase-desc">スコアリングや育成のためのメールではありません。Meeton Calendar への着地（商談確定）を一本のゴールに据え、未反応なら別の切り口で、開封・クリックがあれば反応領域を深掘りで、AI が次の一手を都度動的判断します。</div>
              <div className="phase-features">
                {[
                  'すべての判断は、次の有効アクション (商談予約 / 資料 / 事例) に収束',
                  '開封・クリック・再訪で次手の方向性を AI が切替',
                  '最大送信数・最低間隔のガードレール設定可能',
                  'Meeton Calendar URL を文脈に応じて自動挿入',
                ].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-icon" style={{ background: '#04cb7815', color: '#04cb78' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis2">
                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)', marginBottom: 12, animation: 'chatPop .4s .2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>商談予約への AI 動的判断</div>
                  {[
                    { step: 'タッチ #1', label: '初動アプローチ', status: '開封 ✗', statusColor: '#6e7494', subDesc: '未反応 → 別アングルで次手を AI 判断', delay: '.4s' },
                    { step: 'タッチ #2', label: '別アングルで再接触', status: '開封 ✓', statusColor: '#7c5cfc', subDesc: '開封 + リンククリック → 関心領域を特定', delay: '.7s' },
                    { step: 'タッチ #3', label: 'Meeton Calendar 提案', status: 'クリック ✓', statusColor: '#04cb78', subDesc: '商談予約への着地を AI が判断', delay: '1.0s' },
                  ].map((item, i, arr) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'stretch', gap: 12, marginBottom: 0 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 20 }}>
                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: item.statusColor, flexShrink: 0, animation: `nodeGrow .4s ${item.delay} cubic-bezier(.16,1,.3,1) forwards`, transform: 'scale(0)', opacity: 0 }} />
                        {i < arr.length - 1 && <div style={{ width: 2, flex: 1, background: `linear-gradient(180deg,${item.statusColor}40,${arr[i + 1].statusColor}40)`, minHeight: 20 }} />}
                      </div>
                      <div style={{ flex: 1, paddingBottom: 12, opacity: 0, animation: `slideIn .5s ${item.delay} cubic-bezier(.16,1,.3,1) forwards` }}>
                        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                            <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--heading)' }}>{item.step} — {item.label}</span>
                            <span style={{ fontSize: 9, fontWeight: 700, color: item.statusColor, background: `${item.statusColor}15`, padding: '2px 6px', borderRadius: 4 }}>{item.status}</span>
                          </div>
                          <div style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600 }}>{item.subDesc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 4, animation: 'slideIn .5s 1.3s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#04cb78', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#04cb78' }}>すべての判断は商談予約獲得へ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Feature 4: Auto Reply */}
          <div className="phase-row reverse">
            <div className="phase-text">
              <div className="phase-tag" style={{ color: '#0891b2' }}><span style={{ position: 'relative' }}>FEATURE 04</span></div>
              <div className="phase-h">完全自動モード or 承認モードを選択</div>
              <div className="phase-desc">AI に完全に任せて自動送信させるか、AI が下書きを作成してから人間が確認・編集してから送信するか。チームの運用方針や慎重度に応じて選択でき、1 通単位での切り替えも可能です。</div>
              <div className="phase-features">
                {[
                  '完全自動モード: AI が作成・送信まで完結',
                  '承認モード: 送信前に人間が確認・編集',
                  '1 通単位で承認可否を切り替え可能',
                  'チーム単位で初期モードを設定可能',
                ].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-icon" style={{ background: '#0891b215', color: '#0891b2' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis3">
                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)', marginBottom: 10, animation: 'chatPop .4s .2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>送信モード</div>
                  {/* Mode toggle */}
                  <div style={{ display: 'flex', gap: 6, marginBottom: 10, animation: 'chatPop .5s .35s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ flex: 1, padding: '8px 10px', borderRadius: 8, background: '#fff', border: '1px solid var(--border)', textAlign: 'center' }}>
                      <div style={{ fontSize: 9, fontWeight: 800, color: 'var(--sub)', marginBottom: 2 }}>完全自動</div>
                      <div style={{ fontSize: 8, color: 'var(--sub)' }}>AI 任せ</div>
                    </div>
                    <div style={{ flex: 1, padding: '8px 10px', borderRadius: 8, background: 'linear-gradient(135deg, #ecfeff, #fff)', border: '1.5px solid #0891b2', textAlign: 'center', boxShadow: '0 2px 8px rgba(8,145,178,.18)' }}>
                      <div style={{ fontSize: 9, fontWeight: 800, color: '#0891b2', marginBottom: 2, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        承認モード
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <div style={{ fontSize: 8, color: '#0891b2' }}>送信前に確認</div>
                    </div>
                  </div>
                  {/* Pending email card */}
                  <div style={{ background: '#fff', border: '1px solid #0891b230', borderRadius: 12, padding: 12, animation: 'chatPop .5s .8s cubic-bezier(.16,1,.3,1) forwards', opacity: 0, boxShadow: '0 4px 16px rgba(8,145,178,.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg,#f59e0b,#fbbf24)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                      </div>
                      <span style={{ fontSize: 9, fontWeight: 800, color: 'var(--heading)' }}>承認待ち</span>
                      <span style={{ fontSize: 8, color: 'var(--sub)' }}>3 分後に送信予定</span>
                    </div>
                    <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--heading)', marginBottom: 4 }}>To: tanaka@example.com</div>
                    <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--heading)', marginBottom: 6 }}>導入事例の追加情報をお送りします</div>
                    <div style={{ fontSize: 9, color: 'var(--sub)', lineHeight: 1.5, marginBottom: 8 }}>先日ご覧いただいた料金ページの内容について、御社の業界に近い導入事例を 3 つピックアップしました…</div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button style={{ flex: 1, padding: '6px 8px', fontSize: 9, fontWeight: 800, background: '#04cb78', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
                        承認
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                        送信
                      </button>
                      <button style={{ flex: 1, padding: '6px 8px', fontSize: 9, fontWeight: 700, background: '#fff', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 6, cursor: 'pointer' }}>編集</button>
                      <button style={{ padding: '6px 8px', fontSize: 9, fontWeight: 700, background: '#fff', color: 'var(--sub)', border: '1px solid var(--border)', borderRadius: 6, cursor: 'pointer' }}>却下</button>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 10, animation: 'slideIn .5s 1.4s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#0891b2', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#0891b2' }}>運用方針に合わせて切替可能</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="section" style={{ background: 'var(--surface)', position: 'relative' }}>
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}><div className="slabel slabel-c" style={{ marginBottom: 0 }}>USE CASES</div></div>
          <div className="stitle" style={{ textAlign: 'center' }}>Meeton Email の活用シーン</div>
          <div className="usecase-grid">
            {useCaseData.map((uc, i) => (
              <div className="usecase-card" key={i} style={{ ['--uc-color' as string]: uc.color }}>
                <div className="usecase-num">{String(i + 1).padStart(2, '0')}</div>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${uc.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={uc.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {i === 0 && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></>}
                    {i === 1 && <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></>}
                    {i === 2 && <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></>}
                  </svg>
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--heading)', marginBottom: 12, letterSpacing: '-.01em', lineHeight: 1.35 }}>{uc.title}</div>
                <div style={{ fontSize: 14.5, lineHeight: 1.75, color: 'var(--sub)', marginBottom: 20, flex: 1 }}>{uc.desc}</div>
                <div style={{ background: `${uc.color}08`, border: `1px solid ${uc.color}25`, borderRadius: 10, padding: '14px 16px', borderLeft: `3px solid ${uc.color}` }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: uc.color, marginBottom: 6, letterSpacing: '.15em', fontFamily: 'var(--fm)' }}>EXAMPLE</div>
                  <div style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text)', lineHeight: 1.65, fontStyle: 'italic' }}>&ldquo;{uc.example}&rdquo;</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — after USE CASES: demo */}
      <MidPageCta
        eyebrow="See it in action"
        heading="MA メールとの違い・AI が文脈で動的判断する流れ・承認モードの操作感を、実機で 30 分で体験"
        ctaLabel="デモを予約する"
        variant="demo"
        onClick={openMeetonCalendar}
      />

      {/* WHY */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}><div className="slabel slabel-c" style={{ marginBottom: 0 }}>選ばれる理由</div></div>
          <div className="stitle" style={{ textAlign: 'center' }}>なぜ Meeton Email なのか</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 44px' }}>
            MA メールではなく、もう一人の SDR として動く AI エージェント。
            ステップメールの形骸化に悩む方は{' '}
            <Link href="/for/marketing-manager/" style={{ color: 'var(--cta)', fontWeight: 700 }}>マーケマネージャー向けのナーチャリング解説</Link>
            もご参照ください。
          </p>
          <div className="why-grid">
            {whyData.map((w, i) => (
              <div className="why-card" key={i}>
                <div className="why-num">0{i + 1}</div>
                <div className="why-icon" style={{width:48,height:48,borderRadius:12,background:`${w.color}12`,display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={w.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={w.iconPath}/></svg>
                </div>
                <div className="why-title">{w.title}</div>
                <div className="why-desc">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — after WHY: doc */}
      <MidPageCta
        eyebrow="For internal review"
        heading="Meeton Email の仕様・MA メールとの違い・送信モード・連携先をまとめた資料を社内検討用にお送りします"
        ctaLabel="資料を請求する"
        variant="doc"
        onClick={openMeetonDownloadCenter}
      />

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="section-inner">
          <div style={{ textAlign: 'center', marginBottom: 16 }}><div className="slabel slabel-c" style={{ marginBottom: 0 }}>よくある質問</div></div>
          <div className="stitle" style={{ textAlign: 'center' }}>FAQ</div>
          <div style={{ height: 36 }} />
          <div className="faq-list">
            {faqData.map((f, i) => (
              <div className={'faq-item' + (openFaq === i ? ' open' : '')} key={i}>
                <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q}
                  <div className="faq-toggle">+</div>
                </div>
                {openFaq === i && <div className="faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="final-cta-inner">
          <div style={{ textAlign: 'center', marginBottom: 16 }}><div className="slabel slabel-c" style={{ marginBottom: 0 }}>今すぐ始める</div></div>
          <div className="stitle" style={{ textAlign: 'center' }}>Meeton Email で、{" "}<em>Web 接点と CRM の両方から商談を</em></div>
          <p className="ssub" style={{ textAlign: 'center', margin: '16px auto 36px' }}>Meeton Calendar で即時予約しなかったリードを、AI が文脈で動的判断しながら 1:1 で追跡。商談予約獲得を一本のゴールに据えた AI SDR エージェントです。</p>
          <div className="final-cta-ctas">
            <button className="btn btn-cta btn-cta-lg" onClick={openMeetonDownloadCenter}>資料請求</button>
            <button className="btn-ghost" onClick={openMeetonCalendar}>
              デモを予約
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </section>

      <Footer variant="light" />

      <HubSpotModal isOpen={isDocModalOpen} onClose={() => setIsDocModalOpen(false)} utmCampaign="features-ai-email" />
      <HubSpotMeetingModal isOpen={isMeetingModalOpen} onClose={() => setIsMeetingModalOpen(false)} utmCampaign="features-ai-email" />
    </div>
  );
}
