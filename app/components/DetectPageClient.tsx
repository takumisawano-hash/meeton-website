'use client'

import { useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import HubSpotModal from "./HubSpotModal";
import HubSpotMeetingModal from "./HubSpotMeetingModal";

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
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
.anim{opacity:0;animation:fadeUp .8s cubic-bezier(.16,1,.3,1) forwards}
.d1{animation-delay:.1s}.d2{animation-delay:.22s}.d3{animation-delay:.38s}.d4{animation-delay:.52s}.d5{animation-delay:.68s}

.dot-grid{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(8,145,178,.08) 1px,transparent 1px);background-size:28px 28px;pointer-events:none}
.glow{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none}

.btn{border:none;cursor:pointer;font-family:var(--fb);transition:all .25s;font-weight:700;border-radius:10px}
.btn-cta{background:linear-gradient(135deg,var(--cta),#06b6d4);color:#fff;padding:12px 26px;font-size:15px;box-shadow:0 4px 16px var(--cta-glow)}
.btn-cta:hover{transform:translateY(-2px);box-shadow:0 8px 28px var(--cta-glow)}
.btn-cta-lg{padding:18px 40px;font-size:18px;box-shadow:0 6px 28px var(--cta-glow)}
.btn-ghost{background:transparent;color:var(--heading);border:2px solid var(--border2);padding:16px 38px;border-radius:10px;font-size:18px;font-weight:700;cursor:pointer;font-family:var(--fb);transition:all .25s}
.btn-ghost:hover{border-color:var(--cta);color:var(--cta);background:var(--cta-light)}

.slabel{font-family:var(--fm);font-size:12px;font-weight:700;color:var(--cta);letter-spacing:3px;text-transform:uppercase;margin-bottom:16px}
.section{padding:clamp(60px,10vw,100px) clamp(16px,5vw,48px)}
.section-inner{max-width:1140px;margin:0 auto}
.stitle{font-size:clamp(28px,5vw,48px);font-weight:900;color:var(--heading);line-height:1.2;letter-spacing:-.5px;margin-bottom:18px}
.ssub{font-size:clamp(15px,2.5vw,19px);line-height:1.85;color:var(--sub);max-width:660px}

/* HERO - Split Layout */
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:130px 48px 90px;background:linear-gradient(165deg,#ecfeff 0%,#fff 30%,#f0f9ff 60%,#fff 100%)}
.hero-inner{max-width:1200px;width:100%;display:flex;align-items:center;gap:clamp(32px,5vw,64px);position:relative;z-index:2}
.hero-text{flex:1.2;min-width:0}
.hero-visual{flex:1;min-width:0;display:flex;justify-content:center}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,var(--cta-light),var(--accent-light));border:1px solid rgba(8,145,178,.15);padding:9px 22px;border-radius:24px;margin-bottom:28px;font-size:clamp(13px,3vw,15px);font-weight:700;color:var(--cta);backdrop-filter:blur(8px)}
.hero-badge-dot{width:7px;height:7px;border-radius:50%;background:var(--cta);animation:pulse 2s infinite}
.hero h1{font-size:clamp(32px,5vw,62px);font-weight:900;color:var(--heading);line-height:1.15;letter-spacing:-2px;margin-bottom:22px}
.hero h1 em{font-style:normal;background:linear-gradient(135deg,var(--cta),var(--blue));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-sub{font-size:clamp(15px,2.5vw,19px);line-height:1.8;color:var(--sub);max-width:520px;margin-bottom:36px}
.hero-ctas{display:flex;gap:14px;flex-wrap:wrap}
.hero-stats{display:flex;gap:clamp(24px,4vw,48px);margin-top:clamp(32px,5vw,48px);padding-top:clamp(24px,4vw,36px);border-top:1px solid var(--border);flex-wrap:wrap}
.stat-v{font-family:var(--fm);font-size:clamp(28px,4vw,42px);font-weight:700;color:var(--heading);background:linear-gradient(135deg,var(--heading),var(--cta));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-1px}
.stat-l{font-size:clamp(12px,1.5vw,14px);color:var(--sub);margin-top:6px;font-weight:600}

/* Dashboard Visual */
@keyframes rowSlide{0%{opacity:0;transform:translateX(-16px)}100%{opacity:1;transform:translateX(0)}}
@keyframes barGrow{0%{width:0}100%{width:var(--bw)}}
@keyframes badgePop{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}
@keyframes dotBlink{0%,100%{opacity:.3}50%{opacity:1}}
.dash{width:100%;max-width:420px;background:#fff;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,.08),0 1px 3px rgba(0,0,0,.04);border:1px solid var(--border);overflow:hidden;animation:fadeUp .8s .4s cubic-bezier(.16,1,.3,1) forwards;opacity:0}
.dash-hdr{padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#f0fffe,#f5f3ff)}
.dash-row{display:flex;align-items:center;gap:10px;padding:10px 16px;border-bottom:1px solid rgba(223,227,240,.5);opacity:0;animation:rowSlide .5s cubic-bezier(.16,1,.3,1) forwards}
.dash-avatar{width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:11px;color:#fff;font-weight:800;flex-shrink:0}
.score-bar{height:6px;border-radius:3px;animation:barGrow .8s cubic-bezier(.16,1,.3,1) forwards;width:0}
.score-badge{padding:3px 8px;border-radius:6px;font-size:10px;font-weight:800;animation:badgePop .4s cubic-bezier(.16,1,.3,1) forwards;opacity:0}

/* PHASE ROWS */
.phase-row{display:flex;align-items:center;gap:clamp(32px,6vw,64px);padding:clamp(40px,8vw,80px) 0;position:relative}
.phase-row.reverse{flex-direction:row-reverse}
.phase-text{flex:1;min-width:0}
.phase-vis{flex:1;min-width:0;display:flex;align-items:center;justify-content:center}
.phase-tag{display:inline-flex;align-items:center;gap:8px;padding:5px 14px;border-radius:20px;font-family:var(--fm);font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:16px}
.phase-h{font-size:clamp(24px,4vw,32px);font-weight:900;color:var(--heading);letter-spacing:-.5px;margin-bottom:14px;line-height:1.25}
.phase-desc{font-size:clamp(14px,2vw,16px);line-height:1.85;color:var(--sub);margin-bottom:22px}
.phase-features{display:flex;flex-direction:column;gap:10px}
.phase-feat{display:flex;align-items:flex-start;gap:10px;font-size:14px;font-weight:600;color:var(--text)}
.phase-feat-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;margin-top:8px}
.phase-divider{height:1px;background:var(--border);max-width:1140px;margin:0 auto}

/* PHASE VISUALS */
.pvis{width:100%;max-width:440px;aspect-ratio:4/3;border-radius:20px;position:relative;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,.06);border:1px solid var(--border)}

@keyframes chatPop{0%{opacity:0;transform:translateY(16px) scale(.92)}100%{opacity:1;transform:translateY(0) scale(1)}}
@keyframes scoreUp{0%{width:0}100%{width:var(--sw)}}
@keyframes slideIn{0%{opacity:0;transform:translateX(-20px)}100%{opacity:1;transform:translateX(0)}}
@keyframes nodeGrow{0%{transform:scale(0);opacity:0}100%{transform:scale(1);opacity:1}}
@keyframes ringPulse{0%{box-shadow:0 0 0 0 rgba(8,145,178,.4)}70%{box-shadow:0 0 0 12px rgba(8,145,178,0)}100%{box-shadow:0 0 0 0 rgba(8,145,178,0)}}

.vis0{background:linear-gradient(160deg,#ecfeff,#f0f9ff)}
.vis1{background:linear-gradient(160deg,#ecfeff,#f5f3ff)}
.vis2{background:linear-gradient(160deg,#f0f9ff,#ecfeff)}

/* FLOW STEPS */
.flow-section{padding:clamp(60px,10vw,100px) clamp(16px,5vw,48px);background:var(--surface);position:relative;overflow:hidden}
.flow-steps{display:flex;align-items:flex-start;justify-content:center;gap:0;max-width:1140px;margin:0 auto;position:relative}
.flow-step{display:flex;flex-direction:column;align-items:center;text-align:center;flex:1;position:relative;padding:0 8px;min-width:0}
.flow-num{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:20px;font-weight:800;color:#fff;margin-bottom:14px;position:relative;z-index:2;box-shadow:0 4px 16px rgba(0,0,0,.1)}
.flow-icon{font-size:24px;margin-bottom:8px}
.flow-title{font-size:clamp(12px,1.5vw,15px);font-weight:800;color:var(--heading);line-height:1.3;margin-bottom:4px}
.flow-sub{font-size:clamp(10px,1.2vw,12px);color:var(--sub);line-height:1.4;font-weight:500}
.flow-arrow{display:flex;align-items:center;padding-top:20px;color:var(--border2);font-size:24px;font-family:var(--fm);flex-shrink:0;width:40px;justify-content:center}
.flow-connector{position:absolute;top:28px;left:calc(50% + 28px);width:calc(100% - 56px);height:2px;background:linear-gradient(90deg,var(--border2),var(--cta),var(--border2));z-index:1}
.flow-step:last-child .flow-connector{display:none}

/* WHY */
.why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
.why-card{background:var(--bg);border:1px solid var(--border);border-radius:16px;padding:28px;transition:all .35s cubic-bezier(.16,1,.3,1);box-shadow:0 2px 8px rgba(0,0,0,.03);position:relative;overflow:hidden}
.why-card:hover{border-color:transparent;transform:translateY(-4px);box-shadow:0 12px 40px rgba(8,145,178,.1)}
.why-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--cta),var(--accent));opacity:0;transition:opacity .3s}
.why-card:hover::before{opacity:1}
.why-icon{margin-bottom:16px}
.why-title{font-size:18px;font-weight:800;color:var(--heading);margin-bottom:10px}
.why-desc{font-size:15px;line-height:1.75;color:var(--sub)}

/* FAQ */
.faq-list{max-width:720px;margin:0 auto;display:flex;flex-direction:column;gap:10px}
.faq-item{background:var(--bg);border:1px solid var(--border);border-radius:14px;overflow:hidden;transition:all .25s}
.faq-item:hover{border-color:var(--border2)}
.faq-q{padding:20px 26px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;font-size:18px;font-weight:700;color:var(--heading);transition:color .2s}
.faq-q:hover{color:var(--cta)}
.faq-toggle{width:28px;height:28px;border-radius:50%;background:var(--surface);display:flex;align-items:center;justify-content:center;font-size:16px;color:var(--sub);transition:all .25s;flex-shrink:0}
.faq-item.open .faq-toggle{background:var(--cta-light);color:var(--cta);transform:rotate(45deg)}
.faq-a{padding:0 26px 20px;font-size:16px;line-height:1.8;color:var(--sub)}

/* CTA */
.final-cta{padding:clamp(60px,10vw,100px) clamp(16px,5vw,48px) clamp(80px,12vw,120px);text-align:center;position:relative;overflow:hidden;background:linear-gradient(165deg,#ecfeff 0%,#fff 40%,#f0f9ff 80%,#eaf0fe 100%)}
.final-cta-inner{max-width:620px;margin:0 auto;position:relative;z-index:2}

/* RESPONSIVE */
@media(max-width:1024px){
  .hero-inner{flex-direction:column;text-align:center}
  .hero-text{text-align:center}
  .hero-sub{margin-left:auto;margin-right:auto}
  .hero-ctas{justify-content:center}
  .hero-stats{justify-content:center}
  .dash{max-width:360px}
  .phase-row{flex-direction:column;gap:40px}
  .phase-row.reverse{flex-direction:column}
  .why-grid{grid-template-columns:repeat(2,1fr)}
  .flow-steps{flex-wrap:wrap;gap:20px;justify-content:center}
  .flow-step{flex:0 0 calc(33.33% - 14px);min-width:120px}
  .flow-connector{display:none}
  .flow-arrow{display:none}
}
@media(max-width:768px){
  .hero{padding:90px 20px 50px;min-height:auto}
  .hero-badge{padding:7px 16px;margin-bottom:20px}
  .hero-ctas{flex-direction:column;align-items:stretch;width:100%;max-width:300px;margin:0 auto}
  .hero-stats{flex-direction:row;gap:24px;justify-content:center}
  .dash{max-width:320px}
  .why-grid{grid-template-columns:1fr}
  .pvis{max-width:100%;aspect-ratio:1/1.2;min-height:380px}
  .final-cta{padding:60px 20px 80px}
  .btn-cta-lg{padding:14px 24px;font-size:16px;width:100%}
  .btn-ghost{padding:14px 24px;font-size:16px;width:100%}
  .phase-features{gap:8px}
  .phase-feat{font-size:13px}
  .why-card{padding:22px}
  .faq-q{padding:16px 20px;font-size:16px}
  .faq-a{padding:0 20px 16px;font-size:14px}
  .flow-step{flex:0 0 calc(50% - 10px)}
}
@media(max-width:480px){
  .hero{padding:80px 16px 40px}
  .dash{max-width:100%}
  .pvis{aspect-ratio:1/1.4;min-height:400px}
  .pvis>div{transform:scale(0.78);transform-origin:top center}
  .flow-step{flex:0 0 100%}
  .flow-num{width:48px;height:48px;font-size:18px}
}
`;

const faqData = [
  { q: 'リード検知はどのような行動を対象にしていますか？', a: 'サイト訪問、ページ閲覧（料金ページ・事例ページなど重要ページの特定含む）、フォーム送信、資料ダウンロード、チャット開始、メール開封・クリックなど、あらゆるデジタル接点の行動を検知対象としています。JavaScriptタグを設置するだけで自動的に収集が開始されます。' },
  { q: 'リードスコアリングのロジックはカスタマイズできますか？', a: 'はい。ページ閲覧（料金ページは高得点など）、フォーム送信、資料DL、チャット内容、訪問頻度など、各アクションごとにスコアの重み付けを自由に設定できます。デフォルトでも最適化された設定が用意されていますので、まずはそのまま運用開始し、後から調整することも可能です。' },
  { q: '既存のCRMやMAツールと連携できますか？', a: 'HubSpot、Salesforceをはじめとする主要CRM/MAツールとネイティブ連携しています。検知したリード情報やスコアはリアルタイムでCRMに同期され、既存のワークフローにシームレスに組み込めます。' },
  { q: '匿名訪問者も検知できますか？', a: 'はい。フォーム送信前の匿名訪問者もCookieベースで行動を追跡し、ページ閲覧パターンや滞在時間からスコアリングします。フォーム送信やチャットでメールアドレスが判明した時点で、過去の匿名行動データが自動的にリードプロファイルに統合されます。' },
  { q: '導入にどのくらい時間がかかりますか？', a: 'JavaScriptタグの設置は約5分です。スコアリングルールのカスタマイズを含めても、最短で当日中に検知を開始できます。開発リソースは不要です。' },
];

const whyData = [
  { title: 'リアルタイム検知', desc: 'サイト訪問・フォーム・DLの瞬間をリアルタイムで捕捉。機会損失ゼロのファーストタッチを実現。', color: '#0891b2', iconPath: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0' },
  { title: '自動スコアリング', desc: '行動パターンを元にリードの温度感をAIが自動判定。営業が追うべきリードを即座に特定。', color: '#7c5cfc', iconPath: 'M22 12h-4l-3 9L9 3l-3 9H2' },
  { title: '匿名→実名の自動統合', desc: 'フォーム送信前の匿名行動を記録し、メール取得時点で自動統合。リードの全体像を把握。', color: '#12a37d', iconPath: 'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M12.5 7a4 4 0 1 0-8 0 4 4 0 0 0 8 0z M20 8v6 M23 11h-6' },
  { title: '5分で導入', desc: 'JavaScriptタグ1行で検知開始。コード不要、開発リソース不要。最短当日から稼働。', color: '#3b6ff5', iconPath: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
];

const flowSteps = [
  { num: '1', title: 'サイト訪問', sub: 'Visitor arrives', color: '#6e7494' },
  { num: '2', title: '行動を検知', sub: 'Behavior detected', color: '#0891b2' },
  { num: '3', title: 'スコアリング', sub: 'Auto scoring', color: '#06b6d4' },
  { num: '4', title: 'リード判定', sub: 'Lead qualified', color: '#7c5cfc' },
  { num: '5', title: '次のアクションへ', sub: 'Engage / Nurture', color: '#12a37d' },
];

const flowStepIcons = [
  <><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0"/>,
  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>,
  <><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></>,
  <path d="M5 12h14 M12 5l7 7-7 7"/>,
];

export default function DetectPageClient() {
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
            <div className="anim d1 hero-badge"><div className="hero-badge-dot" />PHASE 01 — DETECT</div>
            <h1 className="anim d2">あらゆる接点で<br /><em>リードを見つける</em></h1>
            <p className="anim d3 hero-sub">サイト訪問・フォーム送信・資料DL——すべての行動をリアルタイムで検知し、AIが温度感を瞬時にスコアリング。見込み客を逃しません。</p>
            <div className="anim d4 hero-ctas">
              <button className="btn btn-cta btn-cta-lg" onClick={() => setIsDocModalOpen(true)}>資料請求</button>
              <button className="btn-ghost" onClick={() => setIsMeetingModalOpen(true)}>デモを予約 →</button>
            </div>
            <div className="anim d5 hero-stats">
              {[{ v: 'Real-time', l: 'リアルタイム検知' }, { v: '360°', l: '行動データ統合' }, { v: '5min', l: '導入時間' }].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}><div className="stat-v">{s.v}</div><div className="stat-l">{s.l}</div></div>
              ))}
            </div>
          </div>
          <div className="hero-visual anim d4">
            <div className="dash">
              <div className="dash-hdr">
                <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,#0891b2,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#fff', fontWeight: 800 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--heading)' }}>リード検知ダッシュボード</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cta)', animation: 'dotBlink 1.5s infinite' }} />
                    <span style={{ fontSize: 10, color: 'var(--sub)', fontWeight: 600 }}>リアルタイム</span>
                  </div>
                </div>
              </div>
              <div style={{ padding: '6px 0' }}>
                {/* Visitor rows */}
                {[
                  { name: '田中', page: '料金ページ閲覧中', score: 85, level: 'Hot', color: '#e0475b', bg: '#fef2f2', delay: '.6s', barW: '85%', barColor: 'linear-gradient(90deg,#e0475b,#ff6b81)' },
                  { name: '佐藤', page: 'フォーム送信', score: 72, level: 'Warm', color: '#f59e0b', bg: '#fffbeb', delay: '.9s', barW: '72%', barColor: 'linear-gradient(90deg,#f59e0b,#fbbf24)' },
                  { name: '鈴木', page: '資料DL完了', score: 68, level: 'Warm', color: '#f59e0b', bg: '#fffbeb', delay: '1.2s', barW: '68%', barColor: 'linear-gradient(90deg,#f59e0b,#fbbf24)' },
                  { name: '山田', page: 'ブログ閲覧中', score: 35, level: 'Cold', color: '#6e7494', bg: '#f4f6fb', delay: '1.5s', barW: '35%', barColor: 'linear-gradient(90deg,#6e7494,#9ca3c4)' },
                ].map((v, i) => (
                  <div className="dash-row" key={i} style={{ animationDelay: v.delay }}>
                    <div className="dash-avatar" style={{ background: `linear-gradient(135deg,${v.color}cc,${v.color})` }}>{v.name[0]}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--heading)' }}>{v.name}</span>
                        <span className="score-badge" style={{ background: v.bg, color: v.color, animationDelay: `calc(${v.delay} + .3s)` }}>{v.level} {v.score}</span>
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--sub)', fontWeight: 600, marginBottom: 4 }}>{v.page}</div>
                      <div style={{ background: 'var(--surface)', borderRadius: 3, height: 6, overflow: 'hidden' }}>
                        <div className="score-bar" style={{ '--bw': v.barW, background: v.barColor, animationDelay: `calc(${v.delay} + .2s)` } as React.CSSProperties} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Summary bar */}
              <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#e0475b', animation: 'pulse 1.5s infinite' }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)' }}>4件のアクティブリード</span>
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--cta)' }}>すべて表示 →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-STEP FLOW */}
      <section className="flow-section">
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1140, margin: '0 auto' }}>
          <div className="slabel" style={{ textAlign: 'center' }}>パイプライン</div>
          <div className="stitle" style={{ textAlign: 'center' }}>検知から次のアクションまで</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 52px' }}>あらゆる接点の行動を検知し、スコアリングで優先度を判定。最適な次のフェーズへ自動で引き渡します。</p>
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
                {i < 4 && <div className="flow-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHASE DETAILS */}
      <section className="section" style={{ position: 'relative', paddingBottom: 0 }}>
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div className="slabel" style={{ textAlign: 'center' }}>機能詳細</div>
          <div className="stitle" style={{ textAlign: 'center' }}>検知の仕組みを深掘り</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 20px' }}>サイト訪問からスコアリングまで、リードを見つけるプロセスをステップごとに解説します。</p>
        </div>
      </section>

      {/* Phase 1: Real-time Visitor Detection */}
      <section style={{ padding: '0 clamp(16px,5vw,48px)', position: 'relative' }}>
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#0891b210', color: '#0891b2' }}>STEP 01</div>
              <div className="phase-h">サイト訪問をリアルタイムで検知</div>
              <div className="phase-desc">訪問者がサイトに到着した瞬間から行動追跡を開始。どのページを、どの順番で、どれだけ滞在したかをリアルタイムで記録します。料金ページや事例ページなど、購買意欲の高い行動を即座に特定し、営業チームに通知します。</div>
              <div className="phase-features">
                {['ページ閲覧パターンの自動記録', '重要ページ（料金・事例）の特定', '滞在時間・スクロール深度の計測', '営業チームへのリアルタイム通知'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#0891b2' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis0">
                {/* Activity feed mockup */}
                <div style={{ padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, animation: 'chatPop .4s .2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#0891b2', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)' }}>リアルタイムフィード</span>
                  </div>
                  {[
                    { time: 'たった今', action: '料金ページを閲覧開始', icon: '👁', bg: '#ecfeff', border: '#0891b2' },
                    { time: '30秒前', action: '事例ページから遷移', icon: '📄', bg: '#f0fdf4', border: '#12a37d' },
                    { time: '2分前', action: 'ブログ記事を閲覧', icon: '📝', bg: '#f5f3ff', border: '#7c5cfc' },
                    { time: '5分前', action: 'トップページに訪問', icon: '🏠', bg: '#f4f6fb', border: '#6e7494' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: item.bg, border: `1px solid ${item.border}20`, borderRadius: 10, marginBottom: 6, opacity: 0, animation: `slideIn .5s ${.4 + i * .3}s cubic-bezier(.16,1,.3,1) forwards` }}>
                      <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--heading)' }}>{item.action}</div>
                        <div style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600 }}>{item.time}</div>
                      </div>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: item.border, flexShrink: 0 }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Phase 2: Form & Download Triggers */}
          <div className="phase-row reverse">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#12a37d10', color: '#12a37d' }}>STEP 02</div>
              <div className="phase-h">フォーム送信・資料DLをトリガーに</div>
              <div className="phase-desc">フォーム送信や資料ダウンロードをトリガーとして、リードの興味関心を自動分類。どの資料をダウンロードしたか、どんな情報をフォームに入力したかを分析し、リードのニーズと温度感を即座に判定します。</div>
              <div className="phase-features">
                {['フォーム送信の即時検知', '資料DLの自動トラッキング', '興味関心の自動分類', 'CRMへのリアルタイム同期'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#12a37d' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis1">
                <div style={{ padding: 16 }}>
                  {/* Trigger event card */}
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 14, marginBottom: 10, animation: 'chatPop .5s .3s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#12a37d,#0fc19a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--heading)' }}>フォーム送信を検知</div>
                        <div style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600 }}>お問い合わせフォーム — たった今</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {['会社名: ABC株式会社', '役職: マーケティング部長'].map((tag, j) => (
                        <span key={j} style={{ fontSize: 9, fontWeight: 700, color: '#12a37d', background: '#e5f8f2', padding: '3px 8px', borderRadius: 6 }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  {/* Download trigger */}
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 14, marginBottom: 10, animation: 'chatPop .5s .8s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#e0475b,#ff6b81)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 800 }}>PDF</div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--heading)' }}>資料DL完了</div>
                        <div style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600 }}>導入ガイド.pdf — 30秒前</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {['興味: リード獲得', '検討段階: 比較中'].map((tag, j) => (
                        <span key={j} style={{ fontSize: 9, fontWeight: 700, color: '#7c5cfc', background: '#f0ecfe', padding: '3px 8px', borderRadius: 6 }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  {/* Auto-sync badge */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, animation: 'slideIn .5s 1.3s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#0891b2', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--cta)' }}>CRMへリアルタイム同期中...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Phase 3: Auto Scoring */}
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#7c5cfc10', color: '#7c5cfc' }}>STEP 03</div>
              <div className="phase-h">リードの温度感を自動スコアリング</div>
              <div className="phase-desc">ページ閲覧・フォーム送信・資料DL・チャット内容・訪問頻度など、複数のシグナルを掛け合わせてAIが温度感を自動判定。Hot / Warm / Cold の3段階で営業が追うべきリードの優先順位を明確にします。</div>
              <div className="phase-features">
                {['複数シグナルの掛け合わせ判定', 'Hot / Warm / Cold 自動分類', 'スコア閾値のカスタマイズ', '次フェーズへの自動引き渡し'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#7c5cfc' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis2">
                <div style={{ padding: 20 }}>
                  {/* Score breakdown */}
                  <div style={{ marginBottom: 14, animation: 'chatPop .4s .2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)', marginBottom: 8 }}>スコア内訳 — 田中様</div>
                    {[
                      { label: 'ページ閲覧', score: 30, max: 40, color: '#0891b2', delay: '.5s' },
                      { label: 'フォーム送信', score: 25, max: 30, color: '#12a37d', delay: '.7s' },
                      { label: '資料DL', score: 20, max: 20, color: '#7c5cfc', delay: '.9s' },
                      { label: '訪問頻度', score: 10, max: 10, color: '#3b6ff5', delay: '1.1s' },
                    ].map((item, i) => (
                      <div key={i} style={{ marginBottom: 8, opacity: 0, animation: `slideIn .5s ${item.delay} cubic-bezier(.16,1,.3,1) forwards` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                          <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--heading)' }}>{item.label}</span>
                          <span style={{ fontSize: 10, fontWeight: 700, color: item.color }}>{item.score}/{item.max}</span>
                        </div>
                        <div style={{ height: 6, background: 'var(--surface)', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${(item.score / item.max) * 100}%`, background: `linear-gradient(90deg,${item.color},${item.color}aa)`, borderRadius: 3, animation: `scoreUp .8s ${item.delay} cubic-bezier(.16,1,.3,1) forwards`, '--sw': `${(item.score / item.max) * 100}%` } as React.CSSProperties} />
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Total score */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 14px', animation: 'chatPop .5s 1.4s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--heading)' }}>総合スコア</div>
                      <div style={{ fontSize: 22, fontWeight: 900, color: '#e0475b', fontFamily: 'var(--fm)', letterSpacing: -1 }}>85<span style={{ fontSize: 12, color: 'var(--sub)', fontWeight: 600 }}>/100</span></div>
                    </div>
                    <div style={{ background: '#fef2f2', color: '#e0475b', padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 800, animation: 'ringPulse 2s infinite' }}>🔥 Hot Lead</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div className="slabel" style={{ textAlign: 'center' }}>選ばれる理由</div>
          <div className="stitle" style={{ textAlign: 'center' }}>なぜ Meeton ai の検知なのか</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 44px' }}>従来のアクセス解析とは根本的に異なるアプローチ。</p>
          <div className="why-grid">
            {whyData.map((w, i) => (
              <div className="why-card" key={i}>
                <div className="why-icon" style={{width:48,height:48,borderRadius:12,background:`${w.color}12`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={w.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={w.iconPath}/></svg>
                </div>
                <div className="why-title">{w.title}</div>
                <div className="why-desc">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="section-inner">
          <div className="slabel" style={{ textAlign: 'center' }}>よくある質問</div>
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
          <div className="slabel">今すぐ始める</div>
          <div className="stitle" style={{ textAlign: 'center' }}>見込み客を<br />逃していませんか？</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '16px auto 36px' }}>リアルタイム検知とAIスコアリングで、あらゆる訪問者の温度感を可視化。最適なタイミングで次のアクションに繋げます。</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-cta btn-cta-lg" onClick={() => setIsDocModalOpen(true)}>資料請求</button>
            <button className="btn-ghost" onClick={() => setIsMeetingModalOpen(true)}>デモを予約 →</button>
          </div>
        </div>
      </section>

      <Footer variant="light" />

      <HubSpotModal isOpen={isDocModalOpen} onClose={() => setIsDocModalOpen(false)} utmCampaign="features-detect" />
      <HubSpotMeetingModal isOpen={isMeetingModalOpen} onClose={() => setIsMeetingModalOpen(false)} utmCampaign="features-detect" />
    </div>
  );
}
