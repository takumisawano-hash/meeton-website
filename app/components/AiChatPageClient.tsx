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
  --cta:#04cb78;--cta-hover:#0fc19a;--cta-glow:rgba(18,163,125,.25);--cta-light:#e5f8f2;
  --accent:#7c5cfc;--accent-light:#f0ecfe;--accent-glow:rgba(124,92,252,.2);
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
.btn-cta{display:inline-flex;align-items:center;justify-content:center;text-align:center;text-decoration:none;background:linear-gradient(135deg,var(--cta),#0fc19a);color:#fff;padding:14px 28px;font-size:15px;box-shadow:0 4px 16px var(--cta-glow),0 1px 0 rgba(255,255,255,.18) inset;letter-spacing:.01em}
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
.stitle em{font-style:normal;color:var(--cta);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.ssub{font-size:clamp(15px,2.5vw,19px);line-height:1.8;color:var(--sub);max-width:680px}

/* HERO - Split Layout */
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:130px 48px 90px;background:#fff;border-bottom:1px solid var(--border)}
.hero-inner{max-width:1200px;width:100%;display:flex;align-items:center;gap:clamp(32px,5vw,72px);position:relative;z-index:2}
.hero-text{flex:1.15;min-width:0}
.hero-visual{flex:1;min-width:0;display:flex;justify-content:center}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:var(--cta-light),var(--accent-light));border:1px solid rgba(18,163,125,.18);padding:9px 22px;border-radius:24px;margin-bottom:28px;font-size:clamp(13px,3vw,15px);font-weight:700;color:var(--cta);backdrop-filter:blur(8px);letter-spacing:.04em}
.hero-badge-dot{width:7px;height:7px;border-radius:50%;background:var(--cta);animation:pulse 2s infinite;box-shadow:0 0 0 0 rgba(18,163,125,.4)}
.hero h1{font-size:clamp(34px,6vw,64px);font-weight:900;color:var(--heading);line-height:1.1;letter-spacing:-.025em;margin-bottom:22px}
.hero h1 em{font-style:normal;color:var(--cta);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;position:relative;display:inline-block}
.hero-sub{font-size:clamp(15px,2.5vw,19px);line-height:1.8;color:var(--sub);max-width:540px;margin-bottom:36px}
.hero-ctas{display:flex;gap:14px;flex-wrap:wrap}
.hero-stats{display:grid;grid-template-columns:repeat(3,minmax(0,auto));gap:clamp(20px,4vw,48px);margin-top:clamp(32px,5vw,44px);padding-top:clamp(24px,4vw,32px);border-top:1px solid var(--border)}
.hero-stat{position:relative;padding-left:clamp(16px,2vw,20px)}
.hero-stat:first-child{padding-left:0}
.hero-stat:not(:first-child)::before{content:'';position:absolute;left:0;top:8px;bottom:8px;width:1px;background:var(--border)}
.stat-v{font-family:var(--fm);font-size:clamp(26px,4vw,40px);font-weight:700;color:var(--heading);background:linear-gradient(135deg,var(--heading),var(--cta));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-.02em;line-height:1.05}
.stat-l{font-size:clamp(11px,1.5vw,13px);color:var(--sub);margin-top:8px;font-weight:600;letter-spacing:.02em}

/* Chat Visual */
@keyframes chatPop{0%{opacity:0;transform:translateY(16px) scale(.92)}100%{opacity:1;transform:translateY(0) scale(1)}}
@keyframes scoreUp{0%{width:0}100%{width:var(--sw)}}
@keyframes slideIn{0%{opacity:0;transform:translateX(-20px)}100%{opacity:1;transform:translateX(0)}}
@keyframes nodeGrow{0%{transform:scale(0);opacity:0}100%{transform:scale(1);opacity:1}}
@keyframes ringPulse{0%{box-shadow:0 0 0 0 rgba(18,163,125,.4)}70%{box-shadow:0 0 0 12px rgba(18,163,125,0)}100%{box-shadow:0 0 0 0 rgba(18,163,125,0)}}
@keyframes dotBlink{0%,100%{opacity:.3}50%{opacity:1}}
@keyframes rowSlide{0%{opacity:0;transform:translateX(-16px)}100%{opacity:1;transform:translateX(0)}}
@keyframes barGrow{0%{width:0}100%{width:var(--bw)}}
@keyframes badgePop{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}

.dash{width:100%;max-width:420px;background:#fff;border-radius:22px;box-shadow:0 24px 64px rgba(18,163,125,.1),0 1px 3px rgba(0,0,0,.04);border:1px solid var(--border);overflow:hidden;animation:fadeUp .8s .4s cubic-bezier(.16,1,.3,1) forwards;opacity:0;transition:transform .4s cubic-bezier(.16,1,.3,1),box-shadow .4s}
.dash:hover{transform:translateY(-4px);box-shadow:0 32px 80px rgba(18,163,125,.18),0 1px 3px rgba(0,0,0,.04)}
.dash-hdr{padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#edfcf7,#f5f3ff)}

/* PHASE ROWS */
.phase-row{display:flex;align-items:center;gap:clamp(32px,6vw,72px);padding:clamp(40px,8vw,80px) 0;position:relative}
.phase-row.reverse{flex-direction:row-reverse}
.phase-text{flex:1;min-width:0}
.phase-vis{flex:1;min-width:0;display:flex;align-items:center;justify-content:center}
.phase-tag{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:20px;font-family:var(--fm);font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:18px;border:1px solid currentColor;position:relative}
.phase-tag::before{content:'';position:absolute;inset:0;border-radius:inherit;background:currentColor;opacity:.08;pointer-events:none}
.phase-h{font-size:clamp(24px,4vw,34px);font-weight:900;color:var(--heading);letter-spacing:-.022em;margin-bottom:14px;line-height:1.22}
.phase-desc{font-size:clamp(14px,2vw,16px);line-height:1.85;color:var(--sub);margin-bottom:24px;max-width:480px}
.phase-features{display:flex;flex-direction:column;gap:10px}
.phase-feat{display:flex;align-items:flex-start;gap:10px;font-size:14px;font-weight:600;color:var(--text);line-height:1.55}
.phase-feat-icon{width:18px;height:18px;border-radius:50%;flex-shrink:0;margin-top:1px;display:flex;align-items:center;justify-content:center}
.phase-feat-icon svg{width:11px;height:11px}
.phase-divider{height:1px;background:linear-gradient(90deg,transparent,var(--border) 20%,var(--border) 80%,transparent);max-width:1140px;margin:0 auto}

/* PHASE VISUALS */
.pvis{width:100%;max-width:440px;aspect-ratio:4/3;border-radius:22px;position:relative;overflow:hidden;box-shadow:0 10px 44px rgba(18,163,125,.08),0 1px 3px rgba(0,0,0,.04);border:1px solid var(--border);transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s}
.pvis:hover{transform:translateY(-3px);box-shadow:0 16px 56px rgba(18,163,125,.14),0 1px 3px rgba(0,0,0,.04)}

.vis0{background:linear-gradient(160deg,#edfcf7,#f0f9ff)}
.vis1{background:linear-gradient(160deg,#edfcf7,#f5f3ff)}
.vis2{background:linear-gradient(160deg,#eaf0fe,#edfcf7)}
.vis3{background:linear-gradient(160deg,#ecfeff,#edfcf7)}

/* FLOW STEPS */
.flow-section{padding:clamp(64px,10vw,112px) clamp(16px,5vw,48px);background:linear-gradient(180deg,var(--surface) 0%,#eef1f8 100%);position:relative;overflow:hidden;border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.flow-steps{display:flex;align-items:flex-start;justify-content:center;gap:0;max-width:1140px;margin:0 auto;position:relative}
.flow-step{display:flex;flex-direction:column;align-items:center;text-align:center;flex:1;position:relative;padding:0 8px;min-width:0;transition:transform .25s cubic-bezier(.16,1,.3,1)}
.flow-step:hover{transform:translateY(-3px)}
.flow-num{width:60px;height:60px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:22px;font-weight:800;color:#fff;margin-bottom:14px;position:relative;z-index:2;box-shadow:0 6px 20px rgba(0,0,0,.12),0 0 0 6px rgba(255,255,255,.7),0 0 0 7px var(--border)}
.flow-step:hover .flow-num{box-shadow:0 10px 28px rgba(18,163,125,.25),0 0 0 6px rgba(255,255,255,.9),0 0 0 7px var(--cta)}
.flow-icon{font-size:24px;margin-bottom:8px}
.flow-title{font-size:clamp(12px,1.5vw,15px);font-weight:800;color:var(--heading);line-height:1.3;margin-bottom:4px;letter-spacing:-.005em}
.flow-sub{font-size:clamp(10px,1.2vw,12px);color:var(--sub);line-height:1.4;font-weight:500;font-family:var(--fm);letter-spacing:.02em}
.flow-arrow{display:flex;align-items:center;padding-top:24px;color:var(--border2);font-size:24px;font-family:var(--fm);flex-shrink:0;width:40px;justify-content:center}
.flow-connector{position:absolute;top:30px;left:calc(50% + 30px);width:calc(100% - 60px);height:2px;background:linear-gradient(90deg,var(--border2),var(--cta),var(--border2));z-index:1;opacity:.5}
.flow-step:last-child .flow-connector{display:none}

/* USE CASES */
.usecase-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:56px}
.usecase-card{background:var(--bg);border:1px solid var(--border);border-radius:18px;padding:32px 28px;transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s,border-color .25s;position:relative;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 1px 2px rgba(15,17,40,.03)}
.usecase-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--uc-color,#04cb78);opacity:.9;transition:opacity .25s,height .25s}
.usecase-card:hover{transform:translateY(-4px);box-shadow:0 24px 56px -20px rgba(18,163,125,.18);border-color:transparent}
.usecase-card:hover::before{height:4px}
.usecase-num{position:absolute;top:24px;right:28px;font-family:var(--fm);font-size:12px;font-weight:800;color:var(--sub);letter-spacing:.1em;opacity:.6}

/* WHY */
.why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.why-card{background:var(--bg);border:1px solid var(--border);border-radius:18px;padding:28px 26px;transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s,border-color .25s;box-shadow:0 1px 2px rgba(15,17,40,.03);position:relative;overflow:hidden;display:flex;flex-direction:column}
.why-card:hover{border-color:transparent;transform:translateY(-6px);box-shadow:0 24px 56px -20px rgba(18,163,125,.2)}
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
.final-cta{padding:clamp(72px,10vw,112px) clamp(16px,5vw,48px) clamp(88px,12vw,128px);text-align:center;position:relative;overflow:hidden;background:linear-gradient(165deg,#edfcf7 0%,#fff 40%,#f0ecfe 80%,#eaf0fe 100%);border-top:1px solid var(--border)}
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
  .final-cta{padding:60px 20px 80px}
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
  { q: 'Meeton Live は匿名訪問者にも起動しますか？', a: 'いいえ。Meeton Live は CRM 連携で識別済みの再訪リードに対してのみ起動します。匿名訪問者への声かけは行わず、フォーム送信・メールクリック・サンクスページ通過などで識別済みになったリードに集中して、AI SDR としてリアルタイム対話を行います。' },
  { q: '既存のチャットボットとの違いは何ですか？', a: '従来のチャットボットはルール分岐やシナリオ設計が必要で、想定外の質問に対応できません。Meeton Live は HubSpot / Salesforce 上のリード情報・閲覧履歴・DL 履歴・メール反応を全文脈として引き継ぎ、AI SDR として自律的に最適な回答を生成。営業担当者が把握しているコンテキストをそのまま会話に持ち込みます。' },
  { q: '導入にどのくらい時間がかかりますか？', a: 'JavaScript タグの設置は約 5 分です。CRM 連携を済ませれば、識別済みリードの再訪検知から AI SDR 対話までシナリオ設計なしで稼働します。' },
  { q: 'どの言語に対応していますか？', a: '日本語・英語・中国語・韓国語をはじめ、主要な言語に対応しています。多言語のサイトでもそのままご利用いただけます。' },
  { q: 'CRM との連携は可能ですか？', a: 'HubSpot、Salesforce とネイティブ連携しています。識別済みリードの過去のやりとり・DL 資料・メール開封状況などを Meeton Live が自動取得し、AI SDR の対話に文脈として反映します。会話で得た情報もリアルタイムで CRM に自動登録されます。' },
];

const whyData = [
  { title: '過去の全文脈を引き継いで対話', desc: '過去の閲覧履歴・DL 履歴・メール反応・CRM 上のメモまで全文脈として把握。営業担当者が把握しているコンテキストをそのまま会話に持ち込みます。', color: '#7c5cfc', iconPath: 'M21 12a9 9 0 1 1-6.22-8.56 M21 12c0 4.97-4.03 9-9 9 M14 8l4 4-4 4 M3 12h15' },
  { title: '再訪リードに AI SDR が即時応答', desc: 'CRM で識別済みの再訪リードに、AI SDR がリアルタイム対話。営業組織が追うべきリードに AI SDR のリソースを集中投下します。', color: '#04cb78', iconPath: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M22 11l-3 3-2-2' },
  { title: '商談予約までその場で完結', desc: 'AI SDR との対話の流れの中で Meeton Calendar の予約 UI が起動。ページ遷移なしで商談確定まで導き、ラストワンマイルの会話を完結します。', color: '#3b6ff5', iconPath: 'M22 12h-4l-3 9L9 3l-3 9H2' },
  { title: 'シナリオ不要・5分で稼働', desc: 'JavaScript タグ 1 行と CRM 連携で AI SDR が稼働。ルール分岐やフロー設計は不要、開発リソース不要。', color: '#0891b2', iconPath: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
];

const flowSteps = [
  { num: '1', title: '識別済みリードが再訪', sub: 'Known lead returns', color: '#6e7494' },
  { num: '2', title: '過去の全文脈を引継ぎ', sub: 'Pull full context', color: '#04cb78' },
  { num: '3', title: 'AI SDR が即時応答', sub: 'AI SDR engages', color: '#0fc19a' },
  { num: '4', title: '関心領域を深掘り', sub: 'Deepen interest', color: '#7c5cfc' },
  { num: '5', title: 'その場で商談予約', sub: 'Meeting booked', color: '#3b6ff5' },
];

const flowStepIcons = [
  <><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>,
  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0"/>,
  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8"/>,
  <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M9 16l2 2 4-4"/></>,
];

const useCases = [
  { title: '資料DL後の再訪リード', color: '#04cb78', desc: '資料DL したリードが料金ページに戻ってきたタイミングで起動。DL した資料の章まで把握した状態で AI SDR が対話を再開します。', msg: '田中様、お帰りなさい。先日ダウンロードいただいた料金最適化ガイドで気になる点はございましたか？' },
  { title: 'ターゲットアカウント', color: '#7c5cfc', desc: 'CRM 上の重点企業ステータスをそのまま把握。企業名・直近のメール反応・営業担当のメモまで踏まえて、AI SDR が会話を開始します。', msg: '{会社名}様、ウェビナー後に料金ページをご覧いただいている件、AI SDR としてご質問にお答えします。' },
  { title: 'メール反応からの再訪', color: '#3b6ff5', desc: 'AI Email や MA からのメールをクリックして再訪したリードを検知。クリックしたリンク先・関心領域を文脈として継続して対話します。', msg: '先ほどのメールでお送りした事例、ご興味の章を中心に詳細をご案内できます。' },
];

export default function AiChatPageClient() {
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
            <div className="anim-y d1 hero-badge"><div className="hero-badge-dot" />MEETON LIVE</div>
            <h1 className="anim-y d2">過去の全文脈を引き継いで、<br /><em>AI SDR がその場で商談化</em></h1>
            <p className="anim-y d3 hero-sub">CRM で識別済みの再訪リードに、AI SDR が即時応答。過去の閲覧・DL・メール反応をすべて引き継いで対話を開始し、商談予約までその場で完結。ラストワンマイルの会話を AI SDR が走り、コンバージョン直前の意思決定を後押しします。</p>
            <div className="anim d4 hero-ctas">
              <button className="btn btn-cta btn-cta-lg" onClick={openMeetonDownloadCenter}>資料請求</button>
              <button className="btn-ghost" onClick={openMeetonCalendar}>
                デモを予約
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </button>
            </div>
            <div className="anim d5 hero-stats">
              {[{ v: '全文脈', l: 'CRM/履歴を引き継ぐ' }, { v: '40%+', l: '商談化率 (EdulinX)' }, { v: 'その場', l: '商談予約まで完結' }].map((s, i) => (
                <div key={i} className="hero-stat"><div className="stat-v">{s.v}</div><div className="stat-l">{s.l}</div></div>
              ))}
            </div>
          </div>
          <div className="hero-visual anim d4">
            <div className="dash">
              <div className="dash-hdr">
                <div style={{ width: 32, height: 32, borderRadius: 10, background: '#04cb78', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#fff', fontWeight: 800 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--heading)' }}>Meeton Live</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#04cb78', animation: 'dotBlink 1.5s infinite' }} />
                    <span style={{ fontSize: 10, color: 'var(--sub)', fontWeight: 600 }}>識別済みリード対話中</span>
                  </div>
                </div>
              </div>
              <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {/* AI message 1 */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', opacity: 0, animation: 'chatPop .5s .6s cubic-bezier(.16,1,.3,1) forwards' }}>
                  <div style={{ width: 24, height: 24, borderRadius: 8, background: '#04cb78', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </div>
                  <div style={{ background: '#e5f8f2', borderRadius: '12px 12px 12px 4px', padding: '10px 14px', maxWidth: '80%', fontSize: 11, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.6 }}>
                    田中様、お帰りなさい。先日DLいただいた料金最適化ガイドの件でご質問はございますか？
                  </div>
                </div>
                {/* Visitor message */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', justifyContent: 'flex-end', opacity: 0, animation: 'chatPop .5s 1.0s cubic-bezier(.16,1,.3,1) forwards' }}>
                  <div style={{ background: 'var(--surface)', borderRadius: '12px 12px 4px 12px', padding: '10px 14px', maxWidth: '75%', fontSize: 11, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.6 }}>
                    料金プランの選び方を聞きたいです
                  </div>
                </div>
                {/* AI message 2 */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', opacity: 0, animation: 'chatPop .5s 1.4s cubic-bezier(.16,1,.3,1) forwards' }}>
                  <div style={{ width: 24, height: 24, borderRadius: 8, background: '#04cb78', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </div>
                  <div style={{ background: '#e5f8f2', borderRadius: '12px 12px 12px 4px', padding: '10px 14px', maxWidth: '80%', fontSize: 11, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.6 }}>
                    CRMの履歴から、御社の規模ですとスタンダードが最適です。30分で詳細ご説明します
                  </div>
                </div>
                {/* Calendar confirmation badge */}
                <div style={{ display: 'flex', justifyContent: 'center', opacity: 0, animation: 'chatPop .5s 1.8s cubic-bezier(.16,1,.3,1) forwards' }}>
                  <div style={{ background: 'linear-gradient(135deg,#e5f8f2,#ecfeff)', border: '1px solid rgba(18,163,125,.2)', borderRadius: 10, padding: '6px 14px', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#04cb78" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#04cb78' }}>14:00 で商談確定</span>
                  </div>
                </div>
              </div>
              {/* Summary bar */}
              <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#04cb78', animation: 'pulse 1.5s infinite' }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)' }}>HubSpot 文脈引継ぎ済み</span>
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--cta)', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                  商談予約完了
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
          <div className="stitle" style={{ textAlign: 'center' }}>Meeton Live の流れ</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 52px' }}>識別済みリードの再訪検知から商談予約まで、AI SDR が CRM 文脈を引き継いで対応します。</p>
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
          <div className="stitle" style={{ textAlign: 'center' }}>Meeton Live の仕組みを深掘り</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 20px' }}>識別済みリードの再訪検知から、CRM 文脈の引き継ぎ・関心領域の深掘り・商談予約まで、AI SDR がどう動くかをステップで解説します。</p>
        </div>
      </section>

      {/* Feature 1: Context-aware greeting */}
      <section style={{ padding: '0 clamp(16px,5vw,48px)', position: 'relative' }}>
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{ color: '#04cb78' }}><span style={{ position: 'relative' }}>FEATURE 01</span></div>
              <div className="phase-h">再訪リードに、AI SDR が即時応答</div>
              <div className="phase-desc">HubSpot / Salesforce で識別済みのリードがサイトに戻ってきた瞬間、AI SDR が即座に対話を開始。営業組織が追っているリードへ、リアルタイムでラストワンマイルの会話を届けます。</div>
              <div className="phase-features">
                {['CRM 連携で識別済みリードを即時判定', '再訪検知から AI SDR 起動まで自動', 'フォーム送信・メールクリック・サンクスページで識別済みに昇格', 'シナリオ設計・ルール分岐不要'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-icon" style={{ background: '#04cb7815', color: '#04cb78' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis0">
                <div style={{ padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, animation: 'chatPop .4s .2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#04cb78', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)' }}>識別済みリードの再訪検知</span>
                  </div>
                  {[
                    { page: 'HubSpot識別済', msg: '田中様の再訪を検知 → AI SDR 起動', icon: (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#04cb78" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>), bg: '#e5f8f2', border: '#04cb78' },
                    { page: 'メールクリック経由', msg: '事例メールから再訪 → 同テーマで深掘り', icon: (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7c5cfc" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>), bg: '#f0ecfe', border: '#7c5cfc' },
                    { page: 'サンクスページ通過', msg: 'フォーム送信直後の再訪 → 即時対話', icon: (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3b6ff5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>), bg: '#eaf0fe', border: '#3b6ff5' },
                  ].map((item, i) => (
                    <div key={i} style={{ background: '#fff', border: `1px solid ${item.border}20`, borderRadius: 12, padding: 12, marginBottom: 8, opacity: 0, animation: `slideIn .5s ${.4 + i * .3}s cubic-bezier(.16,1,.3,1) forwards` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>{item.icon}</span>
                        <span style={{ fontSize: 10, fontWeight: 800, color: item.border }}>{item.page}</span>
                      </div>
                      <div style={{ background: item.bg, borderRadius: 8, padding: '8px 12px', fontSize: 10, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.5 }}>
                        {item.msg}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Feature 2: Needs discovery & resource suggestion */}
          <div className="phase-row reverse">
            <div className="phase-text">
              <div className="phase-tag" style={{ color: '#7c5cfc' }}><span style={{ position: 'relative' }}>FEATURE 02</span></div>
              <div className="phase-h">過去の閲覧・DL・メール反応を全文脈で引き継ぐ</div>
              <div className="phase-desc">営業担当者が把握している「このリードは何に関心があるか」を、AI SDR がそのまま会話に持ち込みます。閲覧履歴・DL 資料・メール開封状況・CRM 上のメモまで、リード一人分の全文脈を会話の前提に。</div>
              <div className="phase-features">
                {['過去の閲覧ページを文脈として把握', 'DL した資料の章まで会話に反映', 'メール開封・クリック履歴を引き継ぎ', 'HubSpot / Salesforce のリード情報を自動取得'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-icon" style={{ background: '#7c5cfc15', color: '#7c5cfc' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis1">
                <div style={{ padding: 16 }}>
                  {/* Chat with resource suggestion */}
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 10, opacity: 0, animation: 'chatPop .5s .3s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 9, fontWeight: 800, color: 'var(--heading)' }}>U</div>
                    <div style={{ background: 'var(--surface)', borderRadius: '10px 10px 10px 4px', padding: '8px 12px', fontSize: 10, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.5 }}>
                      AI SDRの導入事例ありますか？
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 10, opacity: 0, animation: 'chatPop .5s .7s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg,#7c5cfc,#9b7fff)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <div style={{ background: '#f0ecfe', borderRadius: '10px 10px 10px 4px', padding: '8px 12px', fontSize: 10, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.5 }}>
                      過去にDLされた業界に近い事例をご案内します
                    </div>
                  </div>
                  {/* Resource card */}
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 14, marginLeft: 30, opacity: 0, animation: 'chatPop .5s 1.1s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#e0475b,#ff6b81)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 800 }}>PDF</div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--heading)' }}>EdulinX 商談化率 40%+ 事例</div>
                        <div style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600 }}>過去DLとの関連度 98%</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <span style={{ fontSize: 9, fontWeight: 700, color: '#7c5cfc', background: '#f0ecfe', padding: '3px 8px', borderRadius: 6 }}>過去閲覧と関連</span>
                      <span style={{ fontSize: 9, fontWeight: 700, color: '#04cb78', background: '#e5f8f2', padding: '3px 8px', borderRadius: 6 }}>同業界事例</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Feature 3: Lead info capture */}
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{ color: '#3b6ff5' }}><span style={{ position: 'relative' }}>FEATURE 03</span></div>
              <div className="phase-h">CRM 上のリード情報を自動取得して対話に反映</div>
              <div className="phase-desc">HubSpot / Salesforce 上の会社規模・業界・直近のメール反応・営業担当のメモまで、AI SDR が会話の前提として把握。会話で得た新情報もリアルタイムで CRM に書き戻し、営業担当者に引き継ぎます。</div>
              <div className="phase-features">
                {['HubSpot / Salesforce ネイティブ連携', '会社情報・直近の活動を自動取得', '会話内で得た情報を CRM に書き戻し', '営業担当者へリアルタイム通知'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-icon" style={{ background: '#3b6ff515', color: '#3b6ff5' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis2">
                <div style={{ padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, animation: 'chatPop .4s .2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b6ff5', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)' }}>CRM から自動取得した文脈</span>
                  </div>
                  {/* Collected lead info card */}
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 14, opacity: 0, animation: 'chatPop .5s .4s cubic-bezier(.16,1,.3,1) forwards' }}>
                    {[
                      { label: '会社名', value: 'ABC株式会社', color: '#3b6ff5' },
                      { label: 'リード', value: '田中 太郎 (識別済)', color: '#04cb78' },
                      { label: '直近 DL', value: '料金最適化ガイド', color: '#7c5cfc' },
                      { label: 'メール反応', value: '事例リンク クリック', color: '#0891b2' },
                      { label: 'CRM 担当', value: '佐藤 SDR', color: '#3b6ff5' },
                    ].map((field, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 0', borderBottom: i < 4 ? '1px solid var(--border)' : 'none', opacity: 0, animation: `slideIn .5s ${.6 + i * .2}s cubic-bezier(.16,1,.3,1) forwards` }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)' }}>{field.label}</span>
                        <span style={{ fontSize: 10, fontWeight: 700, color: field.color }}>{field.value}</span>
                      </div>
                    ))}
                  </div>
                  {/* CRM sync badge */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12, opacity: 0, animation: 'slideIn .5s 1.6s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#3b6ff5', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#3b6ff5' }}>HubSpot / Salesforce から取得中...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Feature 4: Meeting booking */}
          <div className="phase-row reverse">
            <div className="phase-text">
              <div className="phase-tag" style={{ color: '#0891b2' }}><span style={{ position: 'relative' }}>FEATURE 04</span></div>
              <div className="phase-h">Meeton Calendar に直接つなぎ商談予約</div>
              <div className="phase-desc">識別済みリードとの対話で関心が固まった瞬間、Meeton Calendar の予約 UI がそのまま会話内に表示されます。CRM 上の担当者ルールに従って自動割り振り、ページ遷移なしで商談確定まで導きます。</div>
              <div className="phase-features">
                {['Meeton Calendar とシームレス連動', 'ページ遷移なしで予約完了', 'CRM の担当者ルールで自動割り振り', '低温度リードは Meeton Email に引き継ぎ'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-icon" style={{ background: '#0891b215', color: '#0891b2' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis3">
                <div style={{ padding: 16 }}>
                  {/* Chat with calendar widget */}
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 10, opacity: 0, animation: 'chatPop .5s .3s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg,#0891b2,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <div style={{ background: '#ecfeff', borderRadius: '10px 10px 10px 4px', padding: '8px 12px', fontSize: 10, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.5 }}>
                      佐藤SDRと30分でお話しできるお時間をお選びください
                    </div>
                  </div>
                  {/* Calendar widget */}
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 14, marginLeft: 30, opacity: 0, animation: 'chatPop .5s .7s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--heading)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      日時を選択
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
                      {['10:00', '11:00', '13:00', '14:00', '15:00', '16:00'].map((time, i) => (
                        <div key={i} style={{
                          padding: '6px 0', textAlign: 'center', fontSize: 10, fontWeight: 700, borderRadius: 8,
                          background: time === '14:00' ? '#0891b2' : 'var(--surface)',
                          color: time === '14:00' ? '#fff' : 'var(--heading)',
                          border: time === '14:00' ? 'none' : '1px solid var(--border)',
                          opacity: 0, animation: `badgePop .3s ${.9 + i * .1}s cubic-bezier(.16,1,.3,1) forwards`
                        }}>{time}</div>
                      ))}
                    </div>
                  </div>
                  {/* Confirmation */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10, opacity: 0, animation: 'chatPop .5s 1.6s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ background: 'linear-gradient(135deg,#e5f8f2,#ecfeff)', border: '1px solid rgba(18,163,125,.2)', borderRadius: 8, padding: '6px 14px', display: 'inline-flex', alignItems: 'center', gap: 6, animation: 'ringPulse 2s infinite' }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#04cb78" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <span style={{ fontSize: 10, fontWeight: 800, color: '#04cb78' }}>14:00 で商談確定</span>
                    </div>
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
          <div className="stitle" style={{ textAlign: 'center' }}>Meeton Live の活用シーン</div>
          <div className="usecase-grid">
            {useCases.map((uc, i) => (
              <div className="usecase-card" key={i} style={{ ['--uc-color' as string]: uc.color }}>
                <div className="usecase-num">{String(i + 1).padStart(2, '0')}</div>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${uc.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={uc.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {i === 0 && <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></>}
                    {i === 1 && <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>}
                    {i === 2 && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></>}
                  </svg>
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--heading)', marginBottom: 12, letterSpacing: '-.01em', lineHeight: 1.35 }}>{uc.title}</div>
                <div style={{ fontSize: 14.5, lineHeight: 1.75, color: 'var(--sub)', marginBottom: 20, flex: 1 }}>{uc.desc}</div>
                <div style={{ background: `${uc.color}08`, border: `1px solid ${uc.color}25`, borderRadius: 10, padding: '14px 16px', borderLeft: `3px solid ${uc.color}` }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: uc.color, marginBottom: 6, letterSpacing: '.15em', fontFamily: 'var(--fm)' }}>AI SDR 対話例</div>
                  <div style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text)', lineHeight: 1.65, fontStyle: 'italic' }}>
                    &ldquo;{uc.msg}&rdquo;
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — after USE CASES: demo (visualizing real conversations boosts intent) */}
      <MidPageCta
        eyebrow="See it in action"
        heading="識別済みリードへの AI SDR 対話と CRM 文脈の引き継ぎ精度を、御社の業界に合わせたデモで 30 分で体験"
        ctaLabel="デモを予約する"
        variant="demo"
        onClick={openMeetonCalendar}
      />

      {/* WHY */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}><div className="slabel slabel-c" style={{ marginBottom: 0 }}>選ばれる理由</div></div>
          <div className="stitle" style={{ textAlign: 'center' }}>なぜ Meeton Live なのか</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 44px' }}>マーケ部門のチャットボットではなく、営業組織のための AI SDR プラットフォーム。</p>
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

      {/* CTA — after WHY: doc (internal review framing) */}
      <MidPageCta
        eyebrow="For internal review"
        heading="Meeton Live の仕様・CRM 連携・導入事例・料金プランをまとめた資料を社内検討用にお送りします"
        ctaLabel="資料を請求する"
        variant="doc"
        onClick={openMeetonDownloadCenter}
      />

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="section-inner">
          <div style={{ textAlign: 'center', marginBottom: 16 }}><div className="slabel slabel-c" style={{ marginBottom: 0 }}>よくある質問</div></div>
          <div className="stitle" style={{ textAlign: 'center' }}>FAQ</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '16px auto 0', maxWidth: 720 }}>
            シナリオ型チャットボットとの違いについては、{' '}
            <Link href="/compare/meeton-vs-sinclo/" style={{ color: 'var(--cta)', fontWeight: 700 }}>sinclo との比較</Link>
            ・
            <Link href="/compare/meeton-vs-karte/" style={{ color: 'var(--cta)', fontWeight: 700 }}>KARTE との比較</Link>
            ・
            <Link href="/compare/meeton-vs-chatplus/" style={{ color: 'var(--cta)', fontWeight: 700 }}>ChatPlus との比較</Link>
            ・
            <Link href="/compare/meeton-vs-anybot/" style={{ color: 'var(--cta)', fontWeight: 700 }}>anybot との比較</Link>
            {' '}もあわせてご覧ください。
          </p>
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
          <div className="stitle" style={{ textAlign: 'center' }}>Meeton Live で、<br /><em>識別済みリードを商談へ</em></div>
          <p className="ssub" style={{ textAlign: 'center', margin: '16px auto 36px' }}>CRM 連携で識別済みリードに集中。AI SDR が全文脈を引き継いで対話し、商談予約まで完結します。</p>
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

      <HubSpotModal isOpen={isDocModalOpen} onClose={() => setIsDocModalOpen(false)} utmCampaign="features-ai-chat" />
      <HubSpotMeetingModal isOpen={isMeetingModalOpen} onClose={() => setIsMeetingModalOpen(false)} utmCampaign="features-ai-chat" />
    </div>
  );
}
