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
  --cta:#d03ea1;--cta-hover:#e555b6;--cta-glow:rgba(208,62,161,.25);--cta-light:#fdeaf5;
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
.btn-cta{display:inline-flex;align-items:center;justify-content:center;text-align:center;text-decoration:none;background:linear-gradient(135deg,var(--cta),#e555b6);color:#fff;padding:14px 28px;font-size:15px;box-shadow:0 4px 16px var(--cta-glow),0 1px 0 rgba(255,255,255,.18) inset;letter-spacing:.01em}
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
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:var(--cta-light),var(--accent-light));border:1px solid rgba(208,62,161,.18);padding:9px 22px;border-radius:24px;margin-bottom:28px;font-size:clamp(13px,3vw,15px);font-weight:700;color:var(--cta);backdrop-filter:blur(8px);letter-spacing:.04em}
.hero-badge-dot{width:7px;height:7px;border-radius:50%;background:var(--cta);animation:pulse 2s infinite;box-shadow:0 0 0 0 rgba(208,62,161,.4)}
.hero h1{font-size:clamp(34px,6vw,64px);font-weight:900;color:var(--heading);line-height:1.1;letter-spacing:-.025em;margin-bottom:22px}
.hero h1 em{font-style:normal;background:linear-gradient(135deg,var(--cta),var(--accent));position:relative;display:inline-block}
.hero-sub{font-size:clamp(15px,2.5vw,19px);line-height:1.8;color:var(--sub);max-width:540px;margin-bottom:36px}
.hero-ctas{display:flex;gap:14px;flex-wrap:wrap}
.hero-stats{display:grid;grid-template-columns:repeat(3,minmax(0,auto));gap:clamp(20px,4vw,48px);margin-top:clamp(32px,5vw,44px);padding-top:clamp(24px,4vw,32px);border-top:1px solid var(--border)}
.hero-stat{position:relative;padding-left:clamp(16px,2vw,20px)}
.hero-stat:first-child{padding-left:0}
.hero-stat:not(:first-child)::before{content:'';position:absolute;left:0;top:8px;bottom:8px;width:1px;background:var(--border)}
.stat-v{font-family:var(--fm);font-size:clamp(22px,3.4vw,32px);font-weight:700;color:var(--heading);letter-spacing:-.02em;line-height:1.05;white-space:nowrap}
.stat-l{font-size:clamp(11px,1.5vw,13px);color:var(--sub);margin-top:8px;font-weight:600;letter-spacing:.02em}

/* Library Visual */
@keyframes chatPop{0%{opacity:0;transform:translateY(16px) scale(.92)}100%{opacity:1;transform:translateY(0) scale(1)}}
@keyframes slideIn{0%{opacity:0;transform:translateX(-20px)}100%{opacity:1;transform:translateX(0)}}
@keyframes ringPulse{0%{box-shadow:0 0 0 0 rgba(208,62,161,.4)}70%{box-shadow:0 0 0 12px rgba(208,62,161,0)}100%{box-shadow:0 0 0 0 rgba(208,62,161,0)}}
@keyframes dotBlink{0%,100%{opacity:.3}50%{opacity:1}}
@keyframes badgePop{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}

.dash{width:100%;max-width:420px;background:#fff;border-radius:22px;box-shadow:0 24px 64px rgba(208,62,161,.1),0 1px 3px rgba(0,0,0,.04);border:1px solid var(--border);overflow:hidden;animation:fadeUp .8s .4s cubic-bezier(.16,1,.3,1) forwards;opacity:0;transition:transform .4s cubic-bezier(.16,1,.3,1),box-shadow .4s}
.dash:hover{transform:translateY(-4px);box-shadow:0 32px 80px rgba(208,62,161,.18),0 1px 3px rgba(0,0,0,.04)}
.dash-hdr{padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#fdeaf5,#f5f3ff)}

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
.pvis{width:100%;max-width:440px;aspect-ratio:4/3;border-radius:22px;position:relative;overflow:hidden;box-shadow:0 10px 44px rgba(208,62,161,.08),0 1px 3px rgba(0,0,0,.04);border:1px solid var(--border);transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s}
.pvis:hover{transform:translateY(-3px);box-shadow:0 16px 56px rgba(208,62,161,.14),0 1px 3px rgba(0,0,0,.04)}

.vis0{background:linear-gradient(160deg,#fdeaf5,#f0f9ff)}
.vis1{background:linear-gradient(160deg,#fdeaf5,#f5f3ff)}
.vis2{background:linear-gradient(160deg,#eaf0fe,#fdeaf5)}
.vis3{background:linear-gradient(160deg,#ecfeff,#fdeaf5)}

/* FLOW STEPS */
.flow-section{padding:clamp(64px,10vw,112px) clamp(16px,5vw,48px);background:linear-gradient(180deg,var(--surface) 0%,#eef1f8 100%);position:relative;overflow:hidden;border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.flow-steps{display:flex;align-items:flex-start;justify-content:center;gap:0;max-width:1140px;margin:0 auto;position:relative}
.flow-step{display:flex;flex-direction:column;align-items:center;text-align:center;flex:1;position:relative;padding:0 8px;min-width:0;transition:transform .25s cubic-bezier(.16,1,.3,1)}
.flow-step:hover{transform:translateY(-3px)}
.flow-num{width:60px;height:60px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:22px;font-weight:800;color:#fff;margin-bottom:14px;position:relative;z-index:2;box-shadow:0 6px 20px rgba(0,0,0,.12),0 0 0 6px rgba(255,255,255,.7),0 0 0 7px var(--border)}
.flow-step:hover .flow-num{box-shadow:0 10px 28px rgba(208,62,161,.25),0 0 0 6px rgba(255,255,255,.9),0 0 0 7px var(--cta)}
.flow-icon{font-size:24px;margin-bottom:8px}
.flow-title{font-size:clamp(12px,1.5vw,15px);font-weight:800;color:var(--heading);line-height:1.3;margin-bottom:4px;letter-spacing:-.005em}
.flow-sub{font-size:clamp(10px,1.2vw,12px);color:var(--sub);line-height:1.4;font-weight:500;font-family:var(--fm);letter-spacing:.02em}
.flow-arrow{display:flex;align-items:center;padding-top:24px;color:var(--border2);font-size:24px;font-family:var(--fm);flex-shrink:0;width:40px;justify-content:center}
.flow-connector{position:absolute;top:30px;left:calc(50% + 30px);width:calc(100% - 60px);height:2px;background:linear-gradient(90deg,var(--border2),var(--cta),var(--border2));z-index:1;opacity:.5}
.flow-step:last-child .flow-connector{display:none}

/* USE CASES */
.usecase-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:56px}
.usecase-card{background:var(--bg);border:1px solid var(--border);border-radius:18px;padding:32px 28px;transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s,border-color .25s;position:relative;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 1px 2px rgba(15,17,40,.03)}
.usecase-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--uc-color,#d03ea1);opacity:.9;transition:opacity .25s,height .25s}
.usecase-card:hover{transform:translateY(-4px);box-shadow:0 24px 56px -20px rgba(208,62,161,.18);border-color:transparent}
.usecase-card:hover::before{height:4px}
.usecase-num{position:absolute;top:24px;right:28px;font-family:var(--fm);font-size:12px;font-weight:800;color:var(--sub);letter-spacing:.1em;opacity:.6}

/* WHY */
.why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.why-card{background:var(--bg);border:1px solid var(--border);border-radius:18px;padding:28px 26px;transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s,border-color .25s;box-shadow:0 1px 2px rgba(15,17,40,.03);position:relative;overflow:hidden;display:flex;flex-direction:column}
.why-card:hover{border-color:transparent;transform:translateY(-6px);box-shadow:0 24px 56px -20px rgba(208,62,161,.2)}
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
.final-cta{padding:clamp(72px,10vw,112px) clamp(16px,5vw,48px) clamp(88px,12vw,128px);text-align:center;position:relative;overflow:hidden;background:linear-gradient(165deg,#fdeaf5 0%,#fff 40%,#f0ecfe 80%,#eaf0fe 100%);border-top:1px solid var(--border)}
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
  .pvis{max-width:100%;aspect-ratio:auto;min-height:auto;height:auto;padding-bottom:24px}
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
  .pvis{aspect-ratio:auto;min-height:auto;height:auto;padding-bottom:20px}
  .pvis>div{transform:scale(0.78);transform-origin:top center}
  .flow-step{flex:0 0 100%}
  .flow-num{width:50px;height:50px;font-size:18px}
}
`;

const faqData = [
  { q: 'CRM 履歴に基づく資料推薦はできますか？', a: 'はい。Meeton Library は会話文脈だけでなく、CRM 上の過去 DL 履歴・関心領域・業種・過去商談ステータスを統合判断し、最適な資料を自動選定します。新規 Web リードには初回向け資料、CRM 上の再訪リードには既読資料を除外して新規コンテンツを優先など、文脈に応じた切り分けが可能です。' },
  { q: 'Meeton Library と通常の資料 DL ページの違いは何ですか？', a: '通常の資料 DL ページは Web 制作工数がかかり、PDF を一覧で並べるだけで「中身を読まないと判断できない」体験になります。Meeton Library は資料をアップロードするだけでポップアップ形式の AI チャット付きライブラリーが自動生成。デザイン・新規ページ追加は不要で、AI チャットが訪問者の質問に応じて該当箇所を引用しながら案内するため、検討に必要な情報を素早く取得できます。' },
  { q: '既存リードに対してのみ動作するのですか？', a: 'はい。Meeton Library は HubSpot / Salesforce で識別済みの既存リード（過去にコンバートしたリード）の再訪に対して起動する、ナーチャリング専用機能です。新規リード獲得用ではなく、検討フェーズが進んだリードに適切な情報提供を行い、商談機会を再発火させる設計です。' },
  { q: '資料の更新は AI が自動で学習しますか？', a: 'はい。資料を Meeton Library にアップロードまたは連携すると、AI がコンテンツを自動でインデックス化します。資料の更新・差し替えがあれば、再学習も自動で行われ、常に最新の情報をベースに推薦・解説します。' },
  { q: 'Meeton Calendar との連携はどう動きますか？', a: 'AI が資料解説対話の中で「検討再開」のシグナル（具体的な料金質問・導入時期の言及・比較検討の発言など）を検知すると、Meeton Calendar の予約 UI を会話内に直接展開します。CRM 上の担当者ルールに従って自動割り振り、ページ遷移なしで商談確定まで導きます。' },
  { q: '導入時に既存資料の整理は必要ですか？', a: '整理は必須ではありません。既存の PDF・スライド・ホワイトペーパーをそのままアップロードしていただければ、AI が内容を解析してメタデータを自動付与します。ただし、より精度の高い推薦のために、資料のターゲット業界・検討フェーズなどを軽くタグ付けすることを推奨しています。導入支援の中でサポート可能です。' },
  { q: 'Meeton Live との違いは何ですか？', a: 'Meeton Live は再訪リードへの AI SDR 対話で商談予約までを担う「会話」のプラットフォーム、Meeton Library は既存リードに対して資料を推薦・解説する「ナーチャリング」のプラットフォームです。Library は検討フェーズが進んだリードへ適切な情報を届けて検討再開を促し、検討再開を検知したタイミングで Meeton Calendar に引き渡します。' },
];

const whyData = [
  { title: '行動履歴から最適資料を AI 推薦', desc: 'CRM 上の閲覧ページ・DL 履歴・興味分野を AI が解析し、検討フェーズに合った最適な資料を能動的に提案。「資料を探す責任」をリードに負わせません。', color: '#d03ea1', iconPath: 'M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' },
  { title: 'AI チャット解説を内蔵', desc: '資料の読むべき箇所を AI が案内。章単位・項目単位の質問にも該当箇所を引用しながらリアルタイムで回答し、検討に必要な情報へ訪問者を導きます。', color: '#7c5cfc', iconPath: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8' },
  { title: 'アップロードだけでライブラリー自動生成', desc: 'PDF・スライドをアップロードするだけで、AI チャット付きの資料ライブラリー（ポップアップ UI）が自動立ち上がり。デザイン作業も新規ページ追加も不要、JS タグ 1 行で既存サイトに即組み込みできます。', color: '#0891b2', iconPath: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12' },
  { title: '検討再開を検知して商談化', desc: 'AI チャット解説の中で検討再開のシグナル（料金・導入時期・比較検討）を AI が検知。Meeton Calendar の予約 UI を会話内に直接展開し、商談予約までその場で完結します。', color: '#3b6ff5', iconPath: 'M22 12h-4l-3 9L9 3l-3 9H2' },
];

const flowSteps = [
  { num: '1', title: '既存リードが再訪', sub: 'Known lead returns', color: '#6e7494' },
  { num: '2', title: '行動履歴を AI 分析', sub: 'AI reads history', color: '#d03ea1' },
  { num: '3', title: '最適資料を推薦', sub: 'Recommend assets', color: '#e555b6' },
  { num: '4', title: 'AI が中身を解説', sub: 'AI explains', color: '#7c5cfc' },
  { num: '5', title: 'Calendar に引渡し', sub: 'Hand off to meeting', color: '#3b6ff5' },
];

const flowStepIcons = [
  <><circle key="f0a" cx="12" cy="12" r="10"/><path key="f0b" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
  <path key="f1" d="M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>,
  <path key="f2" d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>,
  <path key="f3" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>,
  <><rect key="f4a" x="3" y="4" width="18" height="18" rx="2" ry="2"/><line key="f4b" x1="16" y1="2" x2="16" y2="6"/><line key="f4c" x1="8" y1="2" x2="8" y2="6"/><line key="f4d" x1="3" y1="10" x2="21" y2="10"/><path key="f4e" d="M9 16l2 2 4-4"/></>,
];

// 2026-05-19: ROI 系の例文を、Library の真の価値 (再訪リードに最適資料を即提示する)
// に揃えて差替。料金表 / 同業事例 / 比較チェックリスト / 稟議用テンプレートが
// 既存リードの「次の一歩」を促す資料群。
const useCases = [
  { title: '料金ページに戻ってきた既存リード', color: '#d03ea1', desc: '半年前にホワイトペーパーを DL したリードが料金ページに再訪。AI が最新の料金表・同業他社の導入事例を即座に推薦し、料金についての質問に解説で答えます。', msg: '田中様、お帰りなさい。半年前に DL いただいた資料の最新版と、御社業界での導入事例をご用意しました。' },
  { title: '比較検討中の既存リード', color: '#7c5cfc', desc: '他社製品と比較検討フェーズに入った既存リードに、競合との機能比較資料・差別化ポイントをまとめた事例集を AI が提案。質問にも資料根拠で回答します。', msg: '比較検討の論点に合わせて、競合との機能比較表と同業他社の選定基準事例をご案内します。' },
  { title: '稟議準備フェーズの既存リード', color: '#3b6ff5', desc: '社内稟議の準備に入ったリードに、AI が稟議書テンプレート・サービス紹介資料・導入事例 PDF を推薦。質問にもその場で回答し、稟議の壁を下げます。', msg: '稟議用の資料一式をご案内します。御社業界での導入事例・比較チェックリストもこちらでご覧いただけます。' },
];

export default function LibraryPageClient() {
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
            <div className="anim-y d1 hero-badge"><div className="hero-badge-dot" />MEETON LIBRARY</div>
            <h1 className="anim-y d2">資料を、<br /><em>AI が商談につながる会話に変える</em></h1>
            <p className="anim-y d3 hero-sub">Meeton Library は、PDF やスライドをアップロードするだけで、AI チャット付きの資料ライブラリーを自動生成。訪問者の関心や CRM 履歴に応じて最適な資料を提案し、AI が読むべき箇所を案内します。初回訪問者のリード化から、既存リードの検討再開、稟議準備の支援まで対応。</p>
            <div className="anim d4 hero-ctas">
              <button className="btn btn-cta btn-cta-lg" onClick={openMeetonCalendar}>デモを予約</button>
              <button className="btn-ghost" onClick={openMeetonDownloadCenter}>
                資料請求
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </button>
            </div>
            <div className="anim d5 hero-stats">
              {[{ v: '5 分', l: '資料アップで開始' }, { v: 'ノーコード', l: 'ページ追加不要' }, { v: 'AI 解説', l: '中身を AI が説明' }].map((s, i) => (
                <div key={i} className="hero-stat"><div className="stat-v">{s.v}</div><div className="stat-l">{s.l}</div></div>
              ))}
            </div>
          </div>
          <div className="hero-visual anim d4">
            <div className="dash">
              <div className="dash-hdr">
                <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,#d03ea1,#e555b6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--heading)' }}>Meeton Library</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#d03ea1', animation: 'dotBlink 1.5s infinite' }} />
                    <span style={{ fontSize: 10, color: 'var(--sub)', fontWeight: 600 }}>AI が資料を選定中</span>
                  </div>
                </div>
              </div>
              <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {/* AI greeting */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', opacity: 0, animation: 'chatPop .5s .6s cubic-bezier(.16,1,.3,1) forwards' }}>
                  <div style={{ width: 24, height: 24, borderRadius: 8, background: 'linear-gradient(135deg,#d03ea1,#e555b6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                  </div>
                  <div style={{ background: '#fdeaf5', border: '1px solid rgba(208,62,161,.15)', borderRadius: '4px 12px 12px 12px', padding: '10px 14px', maxWidth: '80%', fontSize: 11, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.6 }}>
                    田中様、お帰りなさい。前回 DL された資料の続編と、ご興味の章に近い事例をご用意しました
                  </div>
                </div>
                {/* Resource card 1 */}
                <div style={{ background: '#fff', border: '1px solid rgba(208,62,161,.18)', borderRadius: 10, padding: 10, marginLeft: 30, opacity: 0, animation: 'chatPop .5s 1.0s cubic-bezier(.16,1,.3,1) forwards' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(135deg,#d03ea1,#e555b6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: '#fff', fontWeight: 800 }}>PDF</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--heading)' }}>導入事例集 v3</div>
                      <div style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600 }}>関連度 96% · 8 分</div>
                    </div>
                  </div>
                </div>
                {/* Resource card 2 */}
                <div style={{ background: '#fff', border: '1px solid rgba(124,92,252,.18)', borderRadius: 10, padding: 10, marginLeft: 30, opacity: 0, animation: 'chatPop .5s 1.3s cubic-bezier(.16,1,.3,1) forwards' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(135deg,#7c5cfc,#9b7fff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: '#fff', fontWeight: 800 }}>事例</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--heading)' }}>同業界の導入事例 5 選</div>
                      <div style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600 }}>関連度 92% · 12 分</div>
                    </div>
                  </div>
                </div>
                {/* Visitor message */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', opacity: 0, animation: 'chatPop .5s 1.6s cubic-bezier(.16,1,.3,1) forwards' }}>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px 4px 12px 12px', padding: '10px 14px', maxWidth: '75%', fontSize: 11, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.6 }}>
                    導入事例の章を教えて
                  </div>
                </div>
                {/* AI explanation */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', opacity: 0, animation: 'chatPop .5s 1.9s cubic-bezier(.16,1,.3,1) forwards' }}>
                  <div style={{ width: 24, height: 24, borderRadius: 8, background: 'linear-gradient(135deg,#d03ea1,#e555b6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </div>
                  <div style={{ background: '#fdeaf5', border: '1px solid rgba(208,62,161,.15)', borderRadius: '4px 12px 12px 12px', padding: '10px 14px', maxWidth: '80%', fontSize: 11, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.6 }}>
                    第3章のポイントは導入後オペレーションと業界別実績値です。御社業界での平均商談化率 +28pt の事例があります
                  </div>
                </div>
              </div>
              {/* Summary bar */}
              <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#d03ea1', animation: 'pulse 1.5s infinite' }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)' }}>行動履歴に基づく推薦</span>
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--cta)', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                  検討再開検知
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
          <div className="stitle" style={{ textAlign: 'center' }}>Meeton Library の流れ</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 52px' }}>既存リードの再訪検知から、AI による資料推薦・解説、Meeton Calendar への引き渡しまで。</p>
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
          <div className="stitle" style={{ textAlign: 'center' }}>Meeton Library の仕組みを深掘り</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 20px' }}>AI 推薦・AI チャット解説・自動ライブラリー生成・Meeton Calendar 引き渡しまで、4 つのコア機能で既存リードの検討再開を捉えます。</p>
        </div>
      </section>

      {/* Feature 1: AI Recommendation */}
      <section style={{ padding: '0 clamp(16px,5vw,48px)', position: 'relative' }}>
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{ color: '#d03ea1' }}><span style={{ position: 'relative' }}>FEATURE 01</span></div>
              <div className="phase-h">AI 資料推薦 — 行動履歴から最適資料を選定</div>
              <div className="phase-desc">CRM 上の閲覧ページ・DL 履歴・メール反応・直近の興味分野を AI が解析し、検討フェーズに合った資料を能動的に推薦。「リード自身に資料を探させる」体験を、「AI が最適な資料を持ってくる」体験に変えます。</div>
              <div className="phase-features">
                {['行動履歴・閲覧ページから興味領域を AI 推定', '検討フェーズ（情報収集 / 比較 / 稟議）に合わせた推薦', '関連度スコアで複数候補をランキング', '推薦理由を AI が会話内で説明'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-icon" style={{ background: '#d03ea115', color: '#d03ea1' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis0">
                <div style={{ padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, animation: 'chatPop .4s .2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#d03ea1', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)' }}>AI 推薦資料 (関連度順)</span>
                  </div>
                  {[
                    { title: '導入事例集 v3', score: '96%', tag: '料金検討フェーズ', icon: 'PDF', bg: '#fdeaf5', border: '#d03ea1' },
                    { title: '同業界導入事例 5 選', score: '92%', tag: '比較検討フェーズ', icon: '事例', bg: '#f0ecfe', border: '#7c5cfc' },
                    { title: '稟議書テンプレート', score: '88%', tag: '社内稟議フェーズ', icon: 'DOC', bg: '#eaf0fe', border: '#3b6ff5' },
                  ].map((item, i) => (
                    <div key={i} style={{ background: '#fff', border: `1px solid ${item.border}25`, borderRadius: 10, padding: 10, marginBottom: 8, opacity: 0, animation: `slideIn .5s ${.4 + i * .3}s cubic-bezier(.16,1,.3,1) forwards`, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 6, background: `linear-gradient(135deg, ${item.border}, ${item.border}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: '#fff', fontWeight: 800, flexShrink: 0 }}>
                        {item.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--heading)', marginBottom: 2 }}>{item.title}</div>
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                          <span style={{ fontSize: 9, fontWeight: 700, color: item.border, background: item.bg, padding: '2px 6px', borderRadius: 4 }}>{item.tag}</span>
                          <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--sub)' }}>関連度 {item.score}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Feature 2: AI Explanation */}
          <div className="phase-row reverse">
            <div className="phase-text">
              <div className="phase-tag" style={{ color: '#7c5cfc' }}><span style={{ position: 'relative' }}>FEATURE 02</span></div>
              <div className="phase-h">AI チャット解説 — 資料の中身を AI がその場で説明</div>
              <div className="phase-desc">推薦した資料の中身を、AI が引用しながら案内。「導入実績の章を教えて」「他社との違いは？」といった章単位の質問に該当箇所を引用してリアルタイムで回答し、検討に必要な情報へ導きます。</div>
              <div className="phase-features">
                {['読むべき箇所を AI が引用しながら案内', '質問に資料の根拠を引用して回答', '複数資料を横断した該当箇所抽出', 'リードの理解度に合わせた案内トーン調整'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-icon" style={{ background: '#7c5cfc15', color: '#7c5cfc' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis1">
                <div style={{ padding: 16 }}>
                  {/* User question */}
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 10, opacity: 0, animation: 'chatPop .5s .3s cubic-bezier(.16,1,.3,1) forwards', justifyContent: 'flex-end' }}>
                    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px 4px 10px 10px', padding: '8px 12px', fontSize: 10, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.5, maxWidth: '75%' }}>
                      導入実績の章を要約して
                    </div>
                  </div>
                  {/* AI explanation */}
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 10, opacity: 0, animation: 'chatPop .5s .7s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg,#7c5cfc,#9b7fff)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/></svg>
                    </div>
                    <div style={{ background: '#f0ecfe', border: '1px solid rgba(124,92,252,.18)', borderRadius: '4px 10px 10px 10px', padding: '8px 12px', fontSize: 10, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.5 }}>
                      第3章のポイントは導入後オペレーションと業界別実績値です。御社業界での平均商談化率 +28pt の事例があります
                    </div>
                  </div>
                  {/* Citation card */}
                  <div style={{ background: '#fff', border: '1px solid rgba(124,92,252,.2)', borderRadius: 10, padding: 10, marginLeft: 30, opacity: 0, animation: 'chatPop .5s 1.1s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#7c5cfc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                      <span style={{ fontSize: 9, fontWeight: 800, color: '#7c5cfc', letterSpacing: '.1em', fontFamily: 'var(--fm)' }}>引用元</span>
                    </div>
                    <div style={{ fontSize: 9, fontWeight: 600, color: 'var(--sub)', lineHeight: 1.5 }}>
                      導入事例集 v3 · 第 3 章「業界別 商談化実績」(p.12-15)
                    </div>
                  </div>
                  {/* Follow up */}
                  <div style={{ display: 'flex', gap: 6, marginTop: 10, marginLeft: 30, flexWrap: 'wrap', opacity: 0, animation: 'chatPop .5s 1.5s cubic-bezier(.16,1,.3,1) forwards' }}>
                    {['他社事例は？', '導入工数は？', '料金詳細を見る'].map((q, i) => (
                      <span key={i} style={{ fontSize: 9, fontWeight: 700, color: '#7c5cfc', background: '#f0ecfe', border: '1px solid rgba(124,92,252,.25)', padding: '4px 10px', borderRadius: 12 }}>{q}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Feature 3: Auto Library Generation */}
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{ color: '#0891b2' }}><span style={{ position: 'relative' }}>FEATURE 03</span></div>
              <div className="phase-h">資料アップロードで AI ライブラリー自動生成</div>
              <div className="phase-desc">PDF・スライド・ホワイトペーパーをアップロードするだけで、AI チャット付きの資料ライブラリーがポップアップ形式で自動立ち上がり。Web 制作・デザイン・新規ページ追加といった工数は一切ゼロ。既存サイトに JS タグ 1 行を入れるだけで稼働します。</div>
              <div className="phase-features">
                {['資料をアップロードするだけ、UI は自動生成', 'デザイン作業不要・新規ページ追加不要', 'JS タグ 1 行で既存サイトに即組み込み', '資料の追加・差し替えはアップロードだけで反映'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-icon" style={{ background: '#0891b215', color: '#0891b2' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis2">
                <div style={{ padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, animation: 'chatPop .4s .2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#0891b2', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)' }}>アップロードで自動生成</span>
                  </div>
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 14, opacity: 0, animation: 'chatPop .5s .4s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <div style={{ width: 26, height: 26, borderRadius: 6, background: 'linear-gradient(135deg,#0891b2,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12"/></svg>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--heading)' }}>資料アップロード</div>
                        <div style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600 }}>PDF / PPTX / DOCX 対応</div>
                      </div>
                    </div>
                    {[
                      { name: '料金プラン_v3.pdf', size: '2.4 MB', status: 'インデックス完了', color: '#04cb78', icon: 'PDF' },
                      { name: '導入事例集.pdf', size: '5.1 MB', status: 'インデックス完了', color: '#04cb78', icon: 'PDF' },
                      { name: '稟議書テンプレ.pptx', size: '1.8 MB', status: '解析中 78%', color: '#d03ea1', icon: 'PPT' },
                    ].map((f, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none', opacity: 0, animation: `slideIn .5s ${.6 + i * .2}s cubic-bezier(.16,1,.3,1) forwards` }}>
                        <div style={{ width: 22, height: 22, borderRadius: 4, background: `linear-gradient(135deg, ${f.color}, ${f.color}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, color: '#fff', fontWeight: 800 }}>{f.icon}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--heading)' }}>{f.name}</div>
                          <div style={{ fontSize: 8, color: 'var(--sub)', fontWeight: 600 }}>{f.size}</div>
                        </div>
                        <span style={{ fontSize: 8.5, fontWeight: 800, color: f.color, background: `${f.color}14`, padding: '2px 7px', borderRadius: 4 }}>{f.status}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12, opacity: 0, animation: 'slideIn .5s 1.6s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#0891b2' }}>AI チャット付きライブラリーを自動生成</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Feature 4: Calendar Handoff */}
          <div className="phase-row reverse">
            <div className="phase-text">
              <div className="phase-tag" style={{ color: '#3b6ff5' }}><span style={{ position: 'relative' }}>FEATURE 04</span></div>
              <div className="phase-h">Meeton Calendar 連携 — 検討再開を捉えて商談化</div>
              <div className="phase-desc">AI チャット解説の中で「検討再開のシグナル」（具体的な料金質問・導入時期の言及・比較検討の発言など）を検知すると、Meeton Calendar の予約 UI を会話内に直接展開。商談機会を逃さず、その場で予約まで完結します。</div>
              <div className="phase-features">
                {['検討再開シグナルを AI が自動検知', 'Meeton Calendar の予約 UI を会話内展開', 'CRM の担当者ルールで自動割り振り', 'ページ遷移なしで商談確定'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-icon" style={{ background: '#3b6ff515', color: '#3b6ff5' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis3">
                <div style={{ padding: 16 }}>
                  {/* Signal detected */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, opacity: 0, animation: 'slideIn .5s .2s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d03ea1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    <span style={{ fontSize: 10, fontWeight: 800, color: '#d03ea1' }}>検討再開シグナル検知: 料金詳細への質問</span>
                  </div>
                  {/* AI message */}
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 10, opacity: 0, animation: 'chatPop .5s .5s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg,#3b6ff5,#5b8aff)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <div style={{ background: '#eaf0fe', border: '1px solid rgba(59,111,245,.18)', borderRadius: '4px 10px 10px 10px', padding: '8px 12px', fontSize: 10, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.5 }}>
                      佐藤 SDR と 15 分で詳細料金をご案内します。お時間をお選びください
                    </div>
                  </div>
                  {/* Calendar widget */}
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 14, marginLeft: 30, opacity: 0, animation: 'chatPop .5s .9s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--heading)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b6ff5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      日時を選択
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
                      {['10:00', '11:00', '13:00', '14:00', '15:00', '16:00'].map((time, i) => (
                        <div key={i} style={{
                          padding: '6px 0', textAlign: 'center', fontSize: 10, fontWeight: 700, borderRadius: 8,
                          background: time === '15:00' ? '#3b6ff5' : 'var(--surface)',
                          color: time === '15:00' ? '#fff' : 'var(--heading)',
                          border: time === '15:00' ? 'none' : '1px solid var(--border)',
                          opacity: 0, animation: `badgePop .3s ${1.1 + i * .1}s cubic-bezier(.16,1,.3,1) forwards`
                        }}>{time}</div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10, opacity: 0, animation: 'chatPop .5s 1.8s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ background: 'linear-gradient(135deg,#fdeaf5,#fae5f0)', border: '1px solid rgba(208,62,161,.25)', borderRadius: 10, padding: '6px 14px', display: 'inline-flex', alignItems: 'center', gap: 6, animation: 'ringPulse 2s infinite' }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#d03ea1" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <span style={{ fontSize: 10, fontWeight: 800, color: '#d03ea1' }}>15:00 で商談化完了</span>
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
          <div className="stitle" style={{ textAlign: 'center' }}>Meeton Library の活用シーン</div>
          <div className="usecase-grid">
            {useCases.map((uc, i) => (
              <div className="usecase-card" key={i} style={{ ['--uc-color' as string]: uc.color }}>
                <div className="usecase-num">{String(i + 1).padStart(2, '0')}</div>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${uc.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={uc.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {i === 0 && <path d="M3 3v18h18 M7 14l4-4 4 4 6-6"/>}
                    {i === 1 && <><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>}
                    {i === 2 && <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6 M16 13H8 M16 17H8 M10 9H8"/></>}
                  </svg>
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--heading)', marginBottom: 12, letterSpacing: '-.01em', lineHeight: 1.35 }}>{uc.title}</div>
                <div style={{ fontSize: 14.5, lineHeight: 1.75, color: 'var(--sub)', marginBottom: 20, flex: 1 }}>{uc.desc}</div>
                <div style={{ background: `${uc.color}08`, border: `1px solid ${uc.color}25`, borderRadius: 10, padding: '14px 16px', borderLeft: `3px solid ${uc.color}` }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: uc.color, marginBottom: 6, letterSpacing: '.15em', fontFamily: 'var(--fm)' }}>AI 推薦・解説例</div>
                  <div style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text)', lineHeight: 1.65 }}>{uc.msg}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — after USE CASES */}
      <MidPageCta
        eyebrow="See it in action"
        heading="既存リードへの AI 資料推薦と検討再開検知の精度を、御社の業界に合わせたデモで 30 分で体験"
        ctaLabel="デモを予約する"
        variant="demo"
        onClick={openMeetonCalendar}
      />

      {/* WHY */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}><div className="slabel slabel-c" style={{ marginBottom: 0 }}>選ばれる理由</div></div>
          <div className="stitle" style={{ textAlign: 'center' }}>なぜ Meeton Library なのか</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 44px' }}>
            静的な資料 DL ページではなく、既存リードの検討再開を捉える AI ナーチャリングプラットフォーム。
            長期評価サイクルの{' '}
            <Link href="/use-cases/saas/" style={{ color: 'var(--cta)', fontWeight: 700 }}>SaaS 業界</Link>
            ・
            <Link href="/use-cases/manufacturing/" style={{ color: 'var(--cta)', fontWeight: 700 }}>製造業</Link>
            での活用イメージもご覧ください。
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

      {/* CTA — after WHY */}
      <MidPageCta
        eyebrow="For internal review"
        heading="Meeton Library の仕様・推薦アルゴリズム・自動ライブラリー生成・料金プランをまとめた資料を社内検討用にお送りします"
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
          <div className="stitle" style={{ textAlign: 'center' }}>Meeton Library で、<br /><em>既存リードの商談機会を再発火</em></div>
          <p className="ssub" style={{ textAlign: 'center', margin: '16px auto 36px' }}>AI が行動履歴から最適資料を推薦・解説。検討再開を捉えて Meeton Calendar に引き渡し、商談機会を再点火させます。</p>
          <div className="final-cta-ctas">
            <button className="btn btn-cta btn-cta-lg" onClick={openMeetonCalendar}>デモを予約</button>
            <button className="btn-ghost" onClick={openMeetonDownloadCenter}>
              資料請求
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </section>

      <Footer variant="light" />

      <HubSpotModal isOpen={isDocModalOpen} onClose={() => setIsDocModalOpen(false)} utmCampaign="features-ai-library" />
      <HubSpotMeetingModal isOpen={isMeetingModalOpen} onClose={() => setIsMeetingModalOpen(false)} utmCampaign="features-ai-library" />
    </div>
  );
}
