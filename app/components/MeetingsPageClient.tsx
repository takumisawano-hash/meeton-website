'use client'

import { useState } from "react";
import dynamic from "next/dynamic";
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
  --cta:#0891b2;--cta-hover:#06b6d4;--cta-glow:rgba(8,145,178,.25);--cta-light:#ecfeff;
  --accent:#7c5cfc;--accent-light:#f0ecfe;--accent-glow:rgba(124,92,252,.2);
  --blue:#3b6ff5;--blue-light:#eaf0fe;
  --cyan:#0891b2;--green:#12a37d;--pink:#d03ea1;--red:#e0475b;
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

.dot-grid{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(8,145,178,.08) 1px,transparent 1px);background-size:28px 28px;pointer-events:none}
.glow{position:absolute;border-radius:50%;filter:blur(40px);pointer-events:none}

.btn{border:none;cursor:pointer;font-family:var(--fb);transition:transform .2s cubic-bezier(.16,1,.3,1),box-shadow .25s,background .2s;font-weight:700;border-radius:10px;min-height:44px;-webkit-tap-highlight-color:transparent;display:inline-flex;align-items:center;justify-content:center;gap:8px}
.btn-cta{background:linear-gradient(135deg,var(--cta),#06b6d4);color:#fff;padding:14px 28px;font-size:15px;box-shadow:0 4px 16px var(--cta-glow),0 1px 0 rgba(255,255,255,.18) inset;letter-spacing:.01em}
.btn-cta:hover{transform:translateY(-2px);box-shadow:0 10px 28px var(--cta-glow),0 1px 0 rgba(255,255,255,.22) inset}
.btn-cta:active{transform:translateY(0)}
.btn-cta-lg{padding:18px 40px;font-size:18px;box-shadow:0 8px 30px var(--cta-glow),0 1px 0 rgba(255,255,255,.18) inset}
.btn-ghost{background:transparent;color:var(--heading);border:2px solid var(--border2);padding:16px 36px;border-radius:10px;font-size:18px;font-weight:700;cursor:pointer;font-family:var(--fb);transition:all .25s;min-height:44px;-webkit-tap-highlight-color:transparent;display:inline-flex;align-items:center;justify-content:center;gap:8px}
.btn-ghost:hover{border-color:var(--cta);color:var(--cta);background:var(--cta-light);transform:translateY(-1px)}
.btn-ghost:active{transform:translateY(0)}
.btn-ghost svg{transition:transform .25s cubic-bezier(.16,1,.3,1)}
.btn-ghost:hover svg{transform:translateX(3px)}

.slabel{font-family:var(--fm);font-size:12px;font-weight:700;color:var(--cta);letter-spacing:3px;text-transform:uppercase;margin-bottom:16px;display:inline-flex;align-items:center;gap:10px}
.slabel::before{content:'';width:24px;height:1px;background:linear-gradient(90deg,transparent,var(--cta))}
.slabel-c{justify-content:center}
.slabel-c::after{content:'';width:24px;height:1px;background:linear-gradient(90deg,var(--cta),transparent)}
.section{padding:clamp(64px,10vw,112px) clamp(16px,5vw,48px)}
.section-inner{max-width:1140px;margin:0 auto}
.stitle{font-size:clamp(28px,5vw,48px);font-weight:900;color:var(--heading);line-height:1.18;letter-spacing:-.02em;margin-bottom:18px}
.stitle em{font-style:normal;background:linear-gradient(135deg,var(--cta),var(--blue));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.ssub{font-size:clamp(15px,2.5vw,19px);line-height:1.8;color:var(--sub);max-width:680px}

/* HERO - Split Layout */
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:130px 48px 90px;background:linear-gradient(165deg,#ecfeff 0%,#fff 30%,#f0f9ff 60%,#fff 100%)}
.hero-inner{max-width:1200px;width:100%;display:flex;align-items:center;gap:clamp(32px,5vw,72px);position:relative;z-index:2}
.hero-text{flex:1.15;min-width:0}
.hero-visual{flex:1;min-width:0;display:flex;justify-content:center}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,var(--cta-light),var(--accent-light));border:1px solid rgba(8,145,178,.18);padding:9px 22px;border-radius:24px;margin-bottom:28px;font-size:clamp(13px,3vw,15px);font-weight:700;color:var(--cta);backdrop-filter:blur(8px);letter-spacing:.04em}
.hero-badge-dot{width:7px;height:7px;border-radius:50%;background:var(--cta);animation:pulse 2s infinite;box-shadow:0 0 0 0 rgba(8,145,178,.4)}
.hero h1{font-size:clamp(34px,6vw,64px);font-weight:900;color:var(--heading);line-height:1.1;letter-spacing:-.025em;margin-bottom:22px}
.hero h1 em{font-style:normal;background:linear-gradient(135deg,var(--cta),var(--blue));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;position:relative;display:inline-block}
.hero-sub{font-size:clamp(15px,2.5vw,19px);line-height:1.8;color:var(--sub);max-width:540px;margin-bottom:36px}
.hero-ctas{display:flex;gap:14px;flex-wrap:wrap}
.hero-stats{display:grid;grid-template-columns:repeat(3,minmax(0,auto));gap:clamp(20px,4vw,48px);margin-top:clamp(32px,5vw,44px);padding-top:clamp(24px,4vw,32px);border-top:1px solid var(--border)}
.hero-stat{position:relative;padding-left:clamp(16px,2vw,20px)}
.hero-stat:first-child{padding-left:0}
.hero-stat:not(:first-child)::before{content:'';position:absolute;left:0;top:8px;bottom:8px;width:1px;background:var(--border)}
.stat-v{font-family:var(--fm);font-size:clamp(26px,4vw,40px);font-weight:700;color:var(--heading);background:linear-gradient(135deg,var(--heading),var(--cta));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-.02em;line-height:1.05}
.stat-l{font-size:clamp(11px,1.5vw,13px);color:var(--sub);margin-top:8px;font-weight:600;letter-spacing:.02em}

/* Dashboard Visual */
@keyframes rowSlide{0%{opacity:0;transform:translateX(-16px)}100%{opacity:1;transform:translateX(0)}}
@keyframes barGrow{0%{width:0}100%{width:var(--bw)}}
@keyframes badgePop{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}
@keyframes dotBlink{0%,100%{opacity:.3}50%{opacity:1}}
.dash{width:100%;max-width:420px;background:#fff;border-radius:22px;box-shadow:0 24px 64px rgba(8,145,178,.1),0 1px 3px rgba(0,0,0,.04);border:1px solid var(--border);overflow:hidden;animation:fadeUp .8s .4s cubic-bezier(.16,1,.3,1) forwards;opacity:0;transition:transform .4s cubic-bezier(.16,1,.3,1),box-shadow .4s}
.dash:hover{transform:translateY(-4px);box-shadow:0 32px 80px rgba(8,145,178,.18),0 1px 3px rgba(0,0,0,.04)}
.dash-hdr{padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#f0fffe,#f5f3ff)}
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
.pvis{width:100%;max-width:440px;aspect-ratio:4/3;border-radius:22px;position:relative;overflow:hidden;box-shadow:0 10px 44px rgba(8,145,178,.08),0 1px 3px rgba(0,0,0,.04);border:1px solid var(--border);transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s}
.pvis:hover{transform:translateY(-3px);box-shadow:0 16px 56px rgba(8,145,178,.14),0 1px 3px rgba(0,0,0,.04)}

@keyframes chatPop{0%{opacity:0;transform:translateY(16px) scale(.92)}100%{opacity:1;transform:translateY(0) scale(1)}}
@keyframes scoreUp{0%{width:0}100%{width:var(--sw)}}
@keyframes slideIn{0%{opacity:0;transform:translateX(-20px)}100%{opacity:1;transform:translateX(0)}}
@keyframes nodeGrow{0%{transform:scale(0);opacity:0}100%{transform:scale(1);opacity:1}}
@keyframes ringPulse{0%{box-shadow:0 0 0 0 rgba(8,145,178,.4)}70%{box-shadow:0 0 0 12px rgba(8,145,178,0)}100%{box-shadow:0 0 0 0 rgba(8,145,178,0)}}

.vis0{background:linear-gradient(160deg,#ecfeff,#f0f9ff)}
.vis1{background:linear-gradient(160deg,#edfcf7,#ecfeff)}
.vis2{background:linear-gradient(160deg,#eaf0fe,#ecfeff)}
.vis3{background:linear-gradient(160deg,#f0ecfe,#ecfeff)}

/* FLOW STEPS */
.flow-section{padding:clamp(64px,10vw,112px) clamp(16px,5vw,48px);background:linear-gradient(180deg,var(--surface) 0%,#eef1f8 100%);position:relative;overflow:hidden;border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.flow-steps{display:flex;align-items:flex-start;justify-content:center;gap:0;max-width:1140px;margin:0 auto;position:relative}
.flow-step{display:flex;flex-direction:column;align-items:center;text-align:center;flex:1;position:relative;padding:0 8px;min-width:0;transition:transform .25s cubic-bezier(.16,1,.3,1)}
.flow-step:hover{transform:translateY(-3px)}
.flow-num{width:60px;height:60px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:22px;font-weight:800;color:#fff;margin-bottom:14px;position:relative;z-index:2;box-shadow:0 6px 20px rgba(0,0,0,.12),0 0 0 6px rgba(255,255,255,.7),0 0 0 7px var(--border)}
.flow-step:hover .flow-num{box-shadow:0 10px 28px rgba(8,145,178,.25),0 0 0 6px rgba(255,255,255,.9),0 0 0 7px var(--cta)}
.flow-icon{font-size:24px;margin-bottom:8px}
.flow-title{font-size:clamp(12px,1.5vw,15px);font-weight:800;color:var(--heading);line-height:1.3;margin-bottom:4px;letter-spacing:-.005em}
.flow-sub{font-size:clamp(10px,1.2vw,12px);color:var(--sub);line-height:1.4;font-weight:500;font-family:var(--fm);letter-spacing:.02em}
.flow-arrow{display:flex;align-items:center;padding-top:24px;color:var(--border2);font-size:24px;font-family:var(--fm);flex-shrink:0;width:40px;justify-content:center}
.flow-connector{position:absolute;top:30px;left:calc(50% + 30px);width:calc(100% - 60px);height:2px;background:linear-gradient(90deg,var(--border2),var(--cta),var(--border2));z-index:1;opacity:.5}
.flow-step:last-child .flow-connector{display:none}

/* USE CASES */
.usecase-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:56px}
.usecase-card{background:var(--bg);border:1px solid var(--border);border-radius:18px;padding:32px 28px;transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s,border-color .25s;position:relative;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 1px 2px rgba(15,17,40,.03)}
.usecase-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--uc-color,#0891b2);opacity:.9;transition:opacity .25s,height .25s}
.usecase-card:hover{transform:translateY(-4px);box-shadow:0 24px 56px -20px rgba(8,145,178,.18);border-color:transparent}
.usecase-card:hover::before{height:4px}
.usecase-num{position:absolute;top:24px;right:28px;font-family:var(--fm);font-size:12px;font-weight:800;color:var(--sub);letter-spacing:.1em;opacity:.6}

/* WHY */
.why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.why-card{background:var(--bg);border:1px solid var(--border);border-radius:18px;padding:28px 26px;transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s,border-color .25s;box-shadow:0 1px 2px rgba(15,17,40,.03);position:relative;overflow:hidden;display:flex;flex-direction:column}
.why-card:hover{border-color:transparent;transform:translateY(-6px);box-shadow:0 24px 56px -20px rgba(8,145,178,.2)}
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
.final-cta{padding:clamp(72px,10vw,112px) clamp(16px,5vw,48px) clamp(88px,12vw,128px);text-align:center;position:relative;overflow:hidden;background:linear-gradient(165deg,#ecfeff 0%,#fff 40%,#f0f9ff 80%,#eaf0fe 100%);border-top:1px solid var(--border)}
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
  { q: 'Speed to Lead 5秒とは何ですか？', a: 'リードがフォーム送信・サンクスページ通過・メールクリックなどでコンバートした瞬間から、商談予約 UI を提示するまでの時間です。業界平均は 42 時間（BizteX 社事例の従来運用）と言われていますが、Meeton Calendar は 5 秒で発動します。最初の意思決定が冷めないうちに商談を確定させる、コンバージョン直前の最後の100mの設計です。' },
  { q: 'どのカレンダーツールと連携できますか？', a: 'Google Calendar、TimeRex とネイティブ連携しています。Outlook カレンダーにも対応予定です。チームメンバーの空き時間をリアルタイムで取得し、最適な候補枠を自動表示します。' },
  { q: '事前ヒアリングの内容はカスタマイズできますか？', a: 'はい。ヒアリング項目（課題、予算、利用ツール、導入時期など）は自由にカスタマイズ可能です。業種や商材に合わせた質問を設定できます。' },
  { q: '商談の通知はどこに届きますか？', a: 'Slack、Microsoft Teams、Google Chat にリアルタイム通知が届きます。メール通知にも対応しています。通知内容にはヒアリング情報のサマリーが含まれるため、営業は即座に準備を開始できます。' },
  { q: 'コンバート瞬間をどうやって検知しますか？', a: 'フォーム送信・サンクスページ到達・メール経由のサイト再訪・Meeton Live 内での予約意思表示など、リードコンバートのトリガーを複数経路で捕捉。CRM 上の担当者ルールに沿って Meeton Calendar が即座に発動します。' },
  { q: 'Web 会議ツールとの連携は？', a: 'Zoom とネイティブ連携しており、商談予約時に Zoom リンクが自動生成されます。Google Meet、Microsoft Teams にも対応しています。' },
];

const whyData = [
  { title: '初動5秒で商談化', desc: 'リードコンバート瞬間に Meeton Calendar が発動。業界42時間 → 5秒の Speed to Lead で意思決定が冷めない。', color: '#0891b2', iconPath: 'M12 6v6l4 2 M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z' },
  { title: '最後の100mを担う', desc: 'MA / CRM が積み上げたリードを商談確定まで導く、コンバージョン直前の意思決定支援レイヤー。', color: '#12a37d', iconPath: 'M9 12l2 2 4-4 M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z' },
  { title: '細かな割り振りルール', desc: 'フォーム入力・業界・規模・関心領域に応じて、表示するカレンダー・担当者を条件分岐で自動制御。', color: '#7c5cfc', iconPath: 'M3 12h7 M10 12l4-6h6 M10 12l4 6h6' },
  { title: 'CRM 連携', desc: '予約情報・ヒアリング内容を自動で CRM に登録。HubSpot / Salesforce ネイティブ連携。', color: '#3b6ff5', iconPath: 'M4 4h16v16H4z M4 9h16 M9 4v16' },
];

const flowSteps = [
  { num: '1', title: 'リードコンバート瞬間', sub: 'Conversion trigger', color: '#6e7494' },
  { num: '2', title: '5秒でカレンダー発動', sub: '5s to calendar', color: '#0891b2' },
  { num: '3', title: '担当者へ自動割り振り', sub: 'Smart routing', color: '#06b6d4' },
  { num: '4', title: '商談確定', sub: 'Meeting confirmed', color: '#12a37d' },
  { num: '5', title: 'CRM 自動連携', sub: 'CRM sync', color: '#3b6ff5' },
];

const flowStepIcons = [
  <path key="f0" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0"/>,
  <><rect key="f1a" x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
  <path key="f2" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>,
  <><circle key="f3a" cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></>,
  <path key="f4" d="M4 4h16v16H4z M4 9h16 M9 4v16"/>,
];

const useCases = [
  {
    title: 'フォーム送信直後の5秒発動',
    color: '#0891b2',
    desc: 'フォーム送信完了の瞬間にサンクスページで Meeton Calendar が発動。最も関心が高い瞬間に、ページ遷移なしで予約まで導きます。',
    example: 'お問い合わせありがとうございます！すぐにでもお話ししたい場合は、下記カレンダーから日程をお選びください。',
  },
  {
    title: 'Meeton Live 内でそのまま予約',
    color: '#12a37d',
    desc: '識別済みリードへの AI SDR 対話で関心が固まった瞬間、Meeton Calendar の予約 UI がそのまま会話内に表示されます。',
    example: '佐藤SDRと15分でお話しできるお時間をお選びください。CRMから自動で担当を割り振っています。',
  },
  {
    title: 'メール経由の再訪リードに即提示',
    color: '#3b6ff5',
    desc: 'Meeton Email 経由で再訪したリードに、Meeton Calendar URL を文脈に応じて自動挿入。メール内から直接商談を予約できます。',
    example: '15分でデモもご案内可能です → [Meeton Calendar URL]',
  },
];

export default function MeetingsPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <Nav variant="light" />

      {/* HERO - Split Layout */}
      <section className="hero">
        <div className="dot-grid" />
        <div className="glow" style={{ background: 'rgba(8,145,178,.2)', width: 600, height: 600, top: -200, right: -100 }} />
        <div className="glow" style={{ background: 'rgba(124,92,252,.1)', width: 500, height: 500, bottom: -150, left: -80 }} />
        <div className="hero-inner">
          <div className="hero-text">
            <div className="anim-y d1 hero-badge"><div className="hero-badge-dot" />MEETON CALENDAR</div>
            <h1 className="anim-y d2">初動5秒で、<br /><em>商談化</em></h1>
            <p className="anim-y d3 hero-sub">業界平均 42 時間の Speed to Lead を、Meeton Calendar は 5 秒に短縮。リードがコンバートした瞬間（フォーム送信・サンクスページ・メール経由）に、商談予約 UI が即座に発動。コンバージョン直前の最後の100mを担います。</p>
            <div className="anim d4 hero-ctas">
              <button className="btn btn-cta btn-cta-lg" onClick={() => setIsDocModalOpen(true)}>資料請求</button>
              <button className="btn-ghost" onClick={() => setIsMeetingModalOpen(true)}>
                デモを予約
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </button>
            </div>
            <div className="anim d5 hero-stats">
              {[{ v: '5秒', l: 'Speed to Lead' }, { v: '42h→5s', l: 'BizteX 事例' }, { v: '自動', l: '担当者割り振り' }].map((s, i) => (
                <div key={i} className="hero-stat"><div className="stat-v">{s.v}</div><div className="stat-l">{s.l}</div></div>
              ))}
            </div>
          </div>
          <div className="hero-visual anim d4">
            <div className="dash">
              <div className="dash-hdr">
                <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,#0891b2,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--heading)' }}>Meeton Calendar</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cta)', animation: 'dotBlink 1.5s infinite' }} />
                    <span style={{ fontSize: 10, color: 'var(--sub)', fontWeight: 600 }}>5秒で発動</span>
                  </div>
                </div>
              </div>
              <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {/* AI message */}
                <div style={{ display: 'flex', gap: 8, opacity: 0, animation: 'chatPop .5s .6s cubic-bezier(.16,1,.3,1) forwards' }}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: 'linear-gradient(135deg,#0891b2,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </div>
                  <div style={{ background: '#ecfeff', border: '1px solid rgba(8,145,178,.15)', borderRadius: '4px 12px 12px 12px', padding: '8px 12px', fontSize: 11, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.5, maxWidth: '80%' }}>
                    フォーム送信ありがとうございます。5秒で商談予約 UI を起動しました。
                  </div>
                </div>
                {/* Visitor message */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', opacity: 0, animation: 'chatPop .5s .9s cubic-bezier(.16,1,.3,1) forwards' }}>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px 4px 12px 12px', padding: '8px 12px', fontSize: 11, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.5, maxWidth: '75%' }}>
                    今週中に商談したいです
                  </div>
                </div>
                {/* AI reply */}
                <div style={{ display: 'flex', gap: 8, opacity: 0, animation: 'chatPop .5s 1.2s cubic-bezier(.16,1,.3,1) forwards' }}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: 'linear-gradient(135deg,#0891b2,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </div>
                  <div style={{ background: '#ecfeff', border: '1px solid rgba(8,145,178,.15)', borderRadius: '4px 12px 12px 12px', padding: '8px 12px', fontSize: 11, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.5, maxWidth: '80%' }}>
                    CRM のルールに基づき担当を自動割り振りしました。お時間をお選びください。
                  </div>
                </div>
                {/* Calendar slots */}
                <div style={{ display: 'flex', gap: 6, marginTop: 4, opacity: 0, animation: 'chatPop .5s 1.5s cubic-bezier(.16,1,.3,1) forwards' }}>
                  {['月曜日 10:00', '水曜日 14:00', '金曜日 11:00'].map((slot, i) => (
                    <div key={i} style={{ flex: 1, background: i === 2 ? '#ecfeff' : '#fff', border: `1px solid ${i === 2 ? '#0891b2' : 'var(--border)'}`, borderRadius: 8, padding: '6px 4px', textAlign: 'center', fontSize: 9, fontWeight: 700, color: i === 2 ? '#0891b2' : 'var(--heading)', cursor: 'pointer', transition: 'all .2s' }}>
                      {slot}
                    </div>
                  ))}
                </div>
                {/* Confirmation */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4, opacity: 0, animation: 'chatPop .5s 1.8s cubic-bezier(.16,1,.3,1) forwards' }}>
                  <div style={{ background: 'linear-gradient(135deg,#ecfeff,#e5f8f2)', border: '1px solid rgba(8,145,178,.2)', borderRadius: 10, padding: '6px 14px', fontSize: 11, fontWeight: 800, color: '#0891b2', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    金曜 11:00 で商談確定
                  </div>
                </div>
              </div>
              {/* Summary bar */}
              <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#0891b2', animation: 'pulse 1.5s infinite' }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)' }}>Speed to Lead: 5秒</span>
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--cta)', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                  詳細
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-STEP FLOW */}
      <section className="flow-section">
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}><div className="slabel slabel-c" style={{ marginBottom: 0 }}>パイプライン</div></div>
          <div className="stitle" style={{ textAlign: 'center' }}>Meeton Calendar の流れ</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 52px' }}>リードコンバート瞬間に Meeton Calendar が 5 秒で発動。最後の100mを担い、商談確定まで導きます。</p>
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
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}><div className="slabel slabel-c" style={{ marginBottom: 0 }}>機能詳細</div></div>
          <div className="stitle" style={{ textAlign: 'center' }}>Meeton Calendar の仕組みを深掘り</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 20px' }}>リードコンバート瞬間の検知から 5 秒発動・割り振り・商談確定まで、Speed to Lead を実装するプロセスを解説します。</p>
        </div>
      </section>

      {/* Feature 1: Chat inline booking */}
      <section style={{ padding: '0 clamp(16px,5vw,48px)', position: 'relative' }}>
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{ color: '#0891b2' }}><span style={{ position: 'relative' }}>FEATURE 01</span></div>
              <div className="phase-h">リードコンバート瞬間に5秒で発動</div>
              <div className="phase-desc">フォーム送信・サンクスページ通過・Meeton Live 内での予約意思表示など、リードコンバートのトリガーを複数経路で捕捉。意思決定が冷めないうちに、Meeton Calendar が 5 秒で起動します。</div>
              <div className="phase-features">
                {['業界平均 42 時間 → Meeton ai 5 秒', 'フォーム送信・サンクスページ・メール経由から発動', 'ページ遷移なしで予約完了', 'コンバージョン直前の最後の100mを担う'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-icon" style={{ background: '#0891b215', color: '#0891b2' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis0">
                <div style={{ padding: 16 }}>
                  {/* Chat with inline calendar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, animation: 'chatPop .4s .2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#0891b2', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)' }}>5秒で発動した Meeton Calendar</span>
                  </div>
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 12, marginBottom: 8, opacity: 0, animation: 'chatPop .5s .4s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--heading)', marginBottom: 8, lineHeight: 1.5 }}>5秒で発動 — お時間をお選びください</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
                      {['月 10:00', '火 14:00', '水 11:00', '木 15:00', '金 10:00', '金 14:00'].map((s, i) => (
                        <div key={i} style={{ background: i === 4 ? '#ecfeff' : 'var(--surface)', border: `1px solid ${i === 4 ? '#0891b2' : 'var(--border)'}`, borderRadius: 6, padding: '5px 2px', textAlign: 'center', fontSize: 9, fontWeight: 700, color: i === 4 ? '#0891b2' : 'var(--heading)' }}>{s}</div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', opacity: 0, animation: 'slideIn .5s .9s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#12a37d', background: '#e5f8f2', padding: '4px 10px', borderRadius: 6, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#12a37d" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      5秒で予約確定 — 業界42時間→5秒
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Feature 2: Thank you page */}
          <div className="phase-row reverse">
            <div className="phase-text">
              <div className="phase-tag" style={{ color: '#12a37d' }}><span style={{ position: 'relative' }}>FEATURE 02</span></div>
              <div className="phase-h">サンクスページで即カレンダー提示</div>
              <div className="phase-desc">フォーム送信直後がリードコンバートの瞬間。Speed to Lead 5 秒の発動ポイントとして、サンクスページに Meeton Calendar を自動表示し、即座に商談予約を獲得します。</div>
              <div className="phase-features">
                {['フォーム送信完了の瞬間に5秒発動', 'リードコンバート直後の意思決定を捕捉', 'サンクスページに自動埋め込み', '追加設定なしで即稼働'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-icon" style={{ background: '#12a37d15', color: '#12a37d' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis1">
                <div style={{ padding: 16 }}>
                  {/* Thank you page mockup */}
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 14, marginBottom: 10, animation: 'chatPop .5s .3s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#12a37d,#0fc19a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--heading)' }}>お問い合わせありがとうございます</div>
                        <div style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600 }}>フォーム送信完了</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--sub)', lineHeight: 1.6, marginBottom: 10, fontWeight: 600 }}>すぐにでもお話ししたい場合は、下記カレンダーから日程をお選びください。</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
                      {['月 10:00', '水 14:00', '金 11:00'].map((s, i) => (
                        <div key={i} style={{ background: i === 2 ? '#e5f8f2' : 'var(--surface)', border: `1px solid ${i === 2 ? '#12a37d' : 'var(--border)'}`, borderRadius: 6, padding: '6px 4px', textAlign: 'center', fontSize: 9, fontWeight: 700, color: i === 2 ? '#12a37d' : 'var(--heading)' }}>{s}</div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, animation: 'slideIn .5s .8s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#12a37d', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#12a37d' }}>コンバート瞬間を5秒で捕捉中...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Feature 3: Email calendar URL */}
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{ color: '#3b6ff5' }}><span style={{ position: 'relative' }}>FEATURE 03</span></div>
              <div className="phase-h">Meeton Email でカレンダー URL を再提示</div>
              <div className="phase-desc">即時予約に至らなかったリードにも、Meeton Email が文脈で動的判断しながら Meeton Calendar URL を再提示。再訪・反応のタイミングで再度 5 秒で発動します。</div>
              <div className="phase-features">
                {['即時予約しなかったリードを Meeton Email が追跡', 'メール内に Meeton Calendar URL を文脈で自動挿入', 'AI が文脈で送信タイミングを動的判断', '再訪検知で再度5秒発動'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-icon" style={{ background: '#3b6ff515', color: '#3b6ff5' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis2">
                <div style={{ padding: 16 }}>
                  {/* Email mockup */}
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 14, animation: 'chatPop .5s .3s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#3b6ff5,#6b8ff8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--heading)' }}>Meeton Email — AI 動的送信</div>
                        <div style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600 }}>再訪検知時に文脈で送信</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--sub)', lineHeight: 1.7, marginBottom: 10, fontWeight: 600 }}>
                      先ほど料金ページに戻ってきていただいたので、<br />15分でデモのご案内可能です。
                    </div>
                    <div style={{ background: '#eaf0fe', border: '1px solid rgba(59,111,245,.2)', borderRadius: 8, padding: '8px 12px', textAlign: 'center', fontSize: 10, fontWeight: 800, color: '#3b6ff5', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5, width: '100%' }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#3b6ff5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      Meeton Calendar で予約
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3b6ff5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 10, opacity: 0, animation: 'slideIn .5s .8s cubic-bezier(.16,1,.3,1) forwards' }}>
                    {[{ label: '再訪検知', active: true }, { label: 'クリック', active: false }, { label: '5秒発動', active: false }].map((d, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: d.active ? '#3b6ff5' : 'var(--border2)' }} />
                        <span style={{ fontSize: 9, fontWeight: 700, color: d.active ? '#3b6ff5' : 'var(--sub)' }}>{d.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Feature 4: Routing rules */}
          <div className="phase-row reverse">
            <div className="phase-text">
              <div className="phase-tag" style={{ color: '#7c5cfc' }}><span style={{ position: 'relative' }}>FEATURE 04</span></div>
              <div className="phase-h">細かな割り振りルールを自由に設定</div>
              <div className="phase-desc">フォーム入力・閲覧履歴・関心領域に応じて、表示するカレンダー・担当者を自動で振り分け。条件分岐でチーム単位から個人単位まで、細部までコントロールできます。</div>
              <div className="phase-features">
                {[
                  'フォーム入力に応じてカレンダーを表示/非表示',
                  '業界・企業規模で担当チームを自動切替',
                  'チーム内のラウンドロビン or 指名割当',
                  '営業時間外・休日のフォールバックも条件設定可能',
                ].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-icon" style={{ background: '#7c5cfc15', color: '#7c5cfc' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis3">
                <div style={{ padding: 16 }}>
                  {/* Routing rules card */}
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 14, animation: 'chatPop .5s .3s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#7c5cfc,#9b7dfd)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3v12"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v3a3 3 0 0 1-3 3H9"/></svg>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--heading)' }}>ルーティングルール</div>
                        <div style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600 }}>4 件 アクティブ</div>
                      </div>
                    </div>
                    {[
                      { cond: '従業員数 ≥ 500', then: 'エンタープライズチーム', color: '#7c5cfc' },
                      { cond: '業界 = SaaS', then: 'SaaS Team / 田中', color: '#3b6ff5' },
                      { cond: '営業時間外', then: '翌営業日 10:00 に再表示', color: '#0891b2' },
                      { cond: 'それ以外', then: 'ラウンドロビン', color: '#12a37d' },
                    ].map((rule, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, padding: '6px 8px', background: '#fafaf7', borderRadius: 6, opacity: 0, animation: `slideIn .5s ${.5 + i * .2}s cubic-bezier(.16,1,.3,1) forwards` }}>
                        <span style={{ fontFamily: 'var(--fm)', fontSize: 8, fontWeight: 800, color: 'var(--sub)', letterSpacing: 0.5 }}>IF</span>
                        <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--heading)' }}>{rule.cond}</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--sub)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14 M12 5l7 7-7 7"/></svg>
                        <span style={{ fontSize: 10, fontWeight: 700, color: rule.color, background: `${rule.color}14`, padding: '2px 8px', borderRadius: 4 }}>{rule.then}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 10, animation: 'slideIn .5s 1.5s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#7c5cfc', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#7c5cfc' }}>適切なカレンダーを自動表示</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="section" style={{ background: 'var(--surface)', position: 'relative' }}>
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}><div className="slabel slabel-c" style={{ marginBottom: 0 }}>USE CASES</div></div>
          <div className="stitle" style={{ textAlign: 'center' }}>Meeton Calendar の活用シーン</div>
          <div className="usecase-grid">
            {useCases.map((uc, i) => (
              <div className="usecase-card" key={i} style={{ ['--uc-color' as string]: uc.color }}>
                <div className="usecase-num">{String(i + 1).padStart(2, '0')}</div>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${uc.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={uc.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {i === 0 && <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>}
                    {i === 1 && <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></>}
                    {i === 2 && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></>}
                  </svg>
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--heading)', marginBottom: 12, letterSpacing: '-.01em', lineHeight: 1.35 }}>{uc.title}</div>
                <div style={{ fontSize: 14.5, lineHeight: 1.75, color: 'var(--sub)', marginBottom: 20, flex: 1 }}>{uc.desc}</div>
                <div style={{ background: `${uc.color}08`, border: `1px solid ${uc.color}25`, borderRadius: 10, padding: '14px 16px', borderLeft: `3px solid ${uc.color}` }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: uc.color, marginBottom: 6, letterSpacing: '.15em', fontFamily: 'var(--fm)' }}>EXAMPLE</div>
                  <div style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text)', lineHeight: 1.65 }}>{uc.example}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — after USE CASES: demo */}
      <MidPageCta
        eyebrow="See it in action"
        heading="リードコンバート瞬間の5秒発動・割り振りルール・Meeton Email 連携を、実機で 15 分で体験"
        ctaLabel="デモを予約する"
        variant="demo"
        onClick={() => setIsMeetingModalOpen(true)}
      />

      {/* WHY */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}><div className="slabel slabel-c" style={{ marginBottom: 0 }}>選ばれる理由</div></div>
          <div className="stitle" style={{ textAlign: 'center' }}>なぜ Meeton Calendar なのか</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 44px' }}>業界42時間の Speed to Lead を 5 秒に。営業組織のための AI SDR プラットフォームの中核。</p>
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

      {/* CTA — after WHY: doc (internal review) */}
      <MidPageCta
        eyebrow="For internal review"
        heading="Meeton Calendar の仕様・5秒発動の仕組み・割り振りルール・連携先一覧をまとめた資料を社内検討用にお送りします"
        ctaLabel="資料を請求する"
        variant="doc"
        onClick={() => setIsDocModalOpen(true)}
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
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div className="glow" style={{ background: 'rgba(8,145,178,.15)', width: 500, height: 500, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div className="final-cta-inner">
          <div style={{ textAlign: 'center', marginBottom: 16 }}><div className="slabel slabel-c" style={{ marginBottom: 0 }}>今すぐ始める</div></div>
          <div className="stitle" style={{ textAlign: 'center' }}>Meeton Calendar で、<br /><em>初動5秒で商談化</em></div>
          <p className="ssub" style={{ textAlign: 'center', margin: '16px auto 36px' }}>業界42時間の Speed to Lead を 5 秒に。リードコンバート瞬間に発動し、コンバージョン直前の最後の100mを担います。</p>
          <div className="final-cta-ctas">
            <button className="btn btn-cta btn-cta-lg" onClick={() => setIsDocModalOpen(true)}>資料請求</button>
            <button className="btn-ghost" onClick={() => setIsMeetingModalOpen(true)}>
              デモを予約
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </section>

      <Footer variant="light" />

      <HubSpotModal isOpen={isDocModalOpen} onClose={() => setIsDocModalOpen(false)} utmCampaign="features-meetings" />
      <HubSpotMeetingModal isOpen={isMeetingModalOpen} onClose={() => setIsMeetingModalOpen(false)} utmCampaign="features-meetings" />
    </div>
  );
}
