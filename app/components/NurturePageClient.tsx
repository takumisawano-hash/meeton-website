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
  --cta:#7c5cfc;--cta-hover:#9b82fd;--cta-glow:rgba(124,92,252,.25);--cta-light:#f0ecfe;
  --accent:#12a37d;--accent-light:#e5f8f2;--accent-glow:rgba(18,163,125,.2);
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

.dot-grid{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(124,92,252,.08) 1px,transparent 1px);background-size:28px 28px;pointer-events:none}
.glow{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none}

.btn{border:none;cursor:pointer;font-family:var(--fb);transition:all .25s;font-weight:700;border-radius:10px}
.btn-cta{background:linear-gradient(135deg,var(--cta),#9b82fd);color:#fff;padding:12px 26px;font-size:15px;box-shadow:0 4px 16px var(--cta-glow)}
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
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:130px 48px 90px;background:linear-gradient(165deg,#f5f3ff 0%,#fff 30%,#ecfeff 60%,#fff 100%)}
.hero-inner{max-width:1200px;width:100%;display:flex;align-items:center;gap:clamp(32px,5vw,64px);position:relative;z-index:2}
.hero-text{flex:1.2;min-width:0}
.hero-visual{flex:1;min-width:0;display:flex;justify-content:center}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,var(--cta-light),var(--accent-light));border:1px solid rgba(124,92,252,.15);padding:9px 22px;border-radius:24px;margin-bottom:28px;font-size:clamp(13px,3vw,15px);font-weight:700;color:var(--cta);backdrop-filter:blur(8px)}
.hero-badge-dot{width:7px;height:7px;border-radius:50%;background:var(--cta);animation:pulse 2s infinite}
.hero h1{font-size:clamp(32px,5vw,62px);font-weight:900;color:var(--heading);line-height:1.15;letter-spacing:-2px;margin-bottom:22px}
.hero h1 em{font-style:normal;background:linear-gradient(135deg,var(--cta),var(--blue));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-sub{font-size:clamp(15px,2.5vw,19px);line-height:1.8;color:var(--sub);max-width:520px;margin-bottom:36px}
.hero-ctas{display:flex;gap:14px;flex-wrap:wrap}
.hero-stats{display:flex;gap:clamp(24px,4vw,48px);margin-top:clamp(32px,5vw,48px);padding-top:clamp(24px,4vw,36px);border-top:1px solid var(--border);flex-wrap:wrap}
.stat-v{font-family:var(--fm);font-size:clamp(28px,4vw,42px);font-weight:700;color:var(--heading);background:linear-gradient(135deg,var(--heading),var(--cta));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-1px}
.stat-l{font-size:clamp(12px,1.5vw,14px);color:var(--sub);margin-top:6px;font-weight:600}

/* Resource Visual */
@keyframes docFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes chatPop{0%{opacity:0;transform:translateY(16px) scale(.92)}100%{opacity:1;transform:translateY(0) scale(1)}}
@keyframes slideIn{0%{opacity:0;transform:translateX(-20px)}100%{opacity:1;transform:translateX(0)}}
@keyframes scoreUp{0%{width:0}100%{width:var(--sw)}}
@keyframes popupSlide{0%{opacity:0;transform:translateY(30px) scale(.9)}100%{opacity:1;transform:translateY(0) scale(1)}}
.res-panel{width:100%;max-width:420px;background:#fff;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,.08),0 1px 3px rgba(0,0,0,.04);border:1px solid var(--border);overflow:hidden;animation:fadeUp .8s .4s cubic-bezier(.16,1,.3,1) forwards;opacity:0}
.res-hdr{padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#f8f6ff,#f0fffe)}

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
.vis0{background:linear-gradient(160deg,#f5f3ff,#f0fffe)}
.vis1{background:linear-gradient(160deg,#f5f3ff,#f8f6ff)}
.vis2{background:linear-gradient(160deg,#ecfeff,#f5f3ff)}

/* FLOW STEPS */
.flow-section{padding:clamp(60px,10vw,100px) clamp(16px,5vw,48px);background:var(--surface);position:relative;overflow:hidden}
.flow-steps{display:flex;align-items:flex-start;justify-content:center;gap:0;max-width:1140px;margin:0 auto;position:relative}
.flow-step{display:flex;flex-direction:column;align-items:center;text-align:center;flex:1;position:relative;padding:0 8px;min-width:0}
.flow-num{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:20px;font-weight:800;color:#fff;margin-bottom:14px;position:relative;z-index:2;box-shadow:0 4px 16px rgba(0,0,0,.1)}
.flow-title{font-size:clamp(12px,1.5vw,15px);font-weight:800;color:var(--heading);line-height:1.3;margin-bottom:4px}
.flow-sub{font-size:clamp(10px,1.2vw,12px);color:var(--sub);line-height:1.4;font-weight:500}
.flow-arrow{display:flex;align-items:center;padding-top:20px;color:var(--border2);font-size:24px;font-family:var(--fm);flex-shrink:0;width:40px;justify-content:center}
.flow-connector{position:absolute;top:28px;left:calc(50% + 28px);width:calc(100% - 56px);height:2px;background:linear-gradient(90deg,var(--border2),var(--cta),var(--border2));z-index:1}
.flow-step:last-child .flow-connector{display:none}

/* WHY */
.why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
.why-card{background:var(--bg);border:1px solid var(--border);border-radius:16px;padding:28px;transition:all .35s cubic-bezier(.16,1,.3,1);box-shadow:0 2px 8px rgba(0,0,0,.03);position:relative;overflow:hidden}
.why-card:hover{border-color:transparent;transform:translateY(-4px);box-shadow:0 12px 40px rgba(124,92,252,.1)}
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
.final-cta{padding:clamp(60px,10vw,100px) clamp(16px,5vw,48px) clamp(80px,12vw,120px);text-align:center;position:relative;overflow:hidden;background:linear-gradient(165deg,#f5f3ff 0%,#fff 40%,#ecfeff 80%,#eaf0fe 100%)}
.final-cta-inner{max-width:620px;margin:0 auto;position:relative;z-index:2}

/* RESPONSIVE */
@media(max-width:1024px){
  .hero-inner{flex-direction:column;text-align:center}
  .hero-text{text-align:center}
  .hero-sub{margin-left:auto;margin-right:auto}
  .hero-ctas{justify-content:center}
  .hero-stats{justify-content:center}
  .res-panel{max-width:360px}
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
  .res-panel{max-width:320px}
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
  .res-panel{max-width:100%}
  .pvis{aspect-ratio:1/1.4;min-height:400px}
  .pvis>div{transform:scale(0.78);transform-origin:top center}
  .flow-step{flex:0 0 100%}
  .flow-num{width:48px;height:48px;font-size:18px}
}
`;

const faqData = [
  { q: '資料提案はどのように行われますか？', a: '訪問者が閲覧しているページの内容、過去の閲覧履歴、チャットでの会話内容をAIが分析し、最も関連性の高い資料を自動で提案します。料金ページを見ている訪問者には料金比較表を、事例ページを見ている訪問者には導入事例集を提案するなど、文脈に応じた提案を行います。' },
  { q: 'AI付き資料ダウンロードページとは何ですか？', a: 'お客様の資料（ホワイトペーパー、事例集、料金表など）を一覧表示する専用ページです。AIチャットが常駐し、訪問者の興味に合った資料を対話形式で提案。ダウンロード時にメールアドレスを自然に取得し、リード情報をCRMへ自動登録します。' },
  { q: 'ポップアップの表示条件はカスタマイズできますか？', a: '離脱しようとしたタイミング（Exit Intent）、一定時間の滞在後、ページスクロール到達時など、訪問者の行動に応じて表示条件を設定できます。表示内容もAIが閲覧ページに合わせて自動カスタマイズします。' },
  { q: 'Q&A対応のナレッジはどう管理しますか？', a: '資料やWebサイトの内容をAIが自動学習します。管理画面からFAQの追加・編集も可能です。AIが回答できない質問は有人対応にエスカレーションする設定もあります。' },
  { q: '導入にどのくらい時間がかかりますか？', a: 'JavaScriptタグの設置は約5分です。資料の登録とAIの設定を含めても、最短で当日中に稼働開始できます。資料ダウンロードページは専用URLが自動発行されます。' },
];

const whyData = [
  { title: '文脈対応の資料提案', desc: '閲覧ページに合わせてAIが最適な資料を自動提案。訪問者の興味と資料を正確にマッチング。', color: '#7c5cfc', iconPath: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M12 18v-6 M9 15l3 3 3-3' },
  { title: 'AI付きDLページ', desc: '資料一覧ページにAIチャットを常駐。対話形式で最適な資料へ誘導し、DL時に自然にリード獲得。', color: '#0891b2', iconPath: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' },
  { title: 'Q&Aで疑問を即解消', desc: 'チャットで製品の質問に即座に回答。疑問を解消し、検討度を引き上げて次のステップへ。', color: '#12a37d', iconPath: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
  { title: '行動トリガー型ポップアップ', desc: '離脱・滞在・スクロールを検知し、最適なタイミングで資料を提示。見込み客を逃さない。', color: '#3b6ff5', iconPath: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0' },
];

const flowSteps = [
  { num: '1', title: '訪問者 / リード', sub: 'Anonymous & known', color: '#12a37d' },
  { num: '2', title: '資料提案', sub: 'Contextual suggestion', color: '#7c5cfc' },
  { num: '3', title: 'Q&A対応', sub: 'AI answers questions', color: '#0891b2' },
  { num: '4', title: '検討度UP', sub: 'Understanding deepens', color: '#9b82fd' },
  { num: '5', title: '次のフェーズへ', sub: 'Convert', color: '#3b6ff5' },
];

const flowStepIcons = [
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>,
  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6"/>,
  <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2zM9 18h6M10 22h4"/>,
  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>,
  <path d="M5 12h14 M12 5l7 7-7 7"/>,
];

export default function NurturePageClient() {
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
        <div className="glow" style={{ background: 'rgba(124,92,252,.2)', width: 600, height: 600, top: -200, right: -100 }} />
        <div className="glow" style={{ background: 'rgba(8,145,178,.1)', width: 500, height: 500, bottom: -150, left: -80 }} />
        <div className="hero-inner">
          <div className="hero-text">
            <div className="anim d1 hero-badge"><div className="hero-badge-dot" />PHASE 03 — NURTURE</div>
            <h1 className="anim d2">訪問者の理解を深め<br /><em>検討度を引き上げる</em></h1>
            <p className="anim d3 hero-sub">匿名訪問者にもリードにも、閲覧ページに合わせた資料提案・Q&A対応で理解を促進。ポップアップや資料ページも活用し、検討度を引き上げます。</p>
            <div className="anim d4 hero-ctas">
              <button className="btn btn-cta btn-cta-lg" onClick={() => setIsDocModalOpen(true)}>資料請求</button>
              <button className="btn-ghost" onClick={() => setIsMeetingModalOpen(true)}>デモを予約 →</button>
            </div>
            <div className="anim d5 hero-stats">
              {[{ v: '3x', l: '資料DL率向上' }, { v: '65%', l: 'エンゲージメント向上' }, { v: 'AI', l: '自動Q&A対応' }].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}><div className="stat-v">{s.v}</div><div className="stat-l">{s.l}</div></div>
              ))}
            </div>
          </div>
          <div className="hero-visual anim d4">
            <div className="res-panel">
              <div className="res-hdr">
                <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,#7c5cfc,#9b82fd)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#fff', fontWeight: 800 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--heading)' }}>資料ライブラリ</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#7c5cfc' }} />
                    <span style={{ fontSize: 10, color: 'var(--sub)', fontWeight: 600 }}>AI提案有効</span>
                  </div>
                </div>
              </div>
              <div style={{ padding: '14px 16px' }}>
                {/* Resource cards */}
                {[
                  { name: '導入ガイド.pdf', size: '3.2 MB', match: '98%', color: '#e0475b', delay: '.6s' },
                  { name: '料金比較表.pdf', size: '1.8 MB', match: '95%', color: '#3b6ff5', delay: '.9s' },
                  { name: '導入事例集.pdf', size: '2.1 MB', match: '87%', color: '#7c5cfc', delay: '1.2s' },
                ].map((doc, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#fff', border: '1px solid var(--border)', borderRadius: 10, marginBottom: 8, opacity: 0, animation: `chatPop .5s ${doc.delay} cubic-bezier(.16,1,.3,1) forwards` }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg,${doc.color},${doc.color}aa)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 800, flexShrink: 0 }}>PDF</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--heading)' }}>{doc.name}</div>
                      <div style={{ fontSize: 9, color: 'var(--sub)' }}>{doc.size}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: '#7c5cfc' }}>AI推奨度</div>
                      <div style={{ fontSize: 11, fontWeight: 800, color: '#7c5cfc', fontFamily: 'var(--fm)' }}>{doc.match}</div>
                    </div>
                  </div>
                ))}
                {/* AI suggestion */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: 'linear-gradient(135deg,#f0ecfe,#e5f8f2)', border: '1px solid rgba(124,92,252,.15)', borderRadius: 10, opacity: 0, animation: 'chatPop .5s 1.5s cubic-bezier(.16,1,.3,1) forwards' }}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: 'linear-gradient(135deg,#7c5cfc,#12a37d)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: '#fff', fontWeight: 800 }}>AI</div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--heading)' }}>料金ページを閲覧中の訪問者には「料金比較表」がおすすめです</span>
                </div>
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
          <div className="stitle" style={{ textAlign: 'center' }}>エンゲージメントから理解促進へ</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 52px' }}>匿名訪問者にもリードにも、資料・Q&A・ポップアップで理解を深め、商談へ引き上げます。</p>
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
          <div className="stitle" style={{ textAlign: 'center' }}>理解促進を深掘り</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 20px' }}>訪問者・リードの検討度をどのように引き上げるか、ステップごとに解説します。</p>
        </div>
      </section>

      {/* Phase 1: Contextual Resource Suggestion */}
      <section style={{ padding: '0 clamp(16px,5vw,48px)', position: 'relative' }}>
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#7c5cfc10', color: '#7c5cfc' }}>STEP 01</div>
              <div className="phase-h">閲覧ページに合わせて資料を自動提案</div>
              <div className="phase-desc">訪問者が今見ているページの内容を分析し、登録済みの資料の中から最も関連性の高いものをAIが自動で選定・提案します。ポップアップやチャット内で表示され、ワンクリックでダウンロード可能。訪問者の興味を逃さず、理解を深める最適な資料を届けます。</div>
              <div className="phase-features">
                {['閲覧コンテキストに基づく自動提案', 'AI推奨度スコアの表示', 'ポップアップ・チャット内での提示', 'ワンクリックダウンロード'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#7c5cfc' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis0">
                <div style={{ padding: 16 }}>
                  {/* Page context */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, animation: 'chatPop .4s .2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#7c5cfc' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)' }}>料金ページを閲覧中</span>
                  </div>
                  {/* Popup mockup */}
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: 14, boxShadow: '0 8px 32px rgba(0,0,0,.06)', animation: 'popupSlide .6s .5s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--heading)', marginBottom: 8 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c5cfc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: -2, marginRight: 4 }}><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg>
                      AIおすすめ資料
                    </div>
                    {[
                      { name: '料金比較表.pdf', match: '95%', color: '#3b6ff5' },
                      { name: '導入ガイド.pdf', match: '88%', color: '#e0475b' },
                    ].map((doc, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: 'var(--surface)', borderRadius: 8, marginBottom: 6, animation: `slideIn .4s ${.8 + j * .3}s cubic-bezier(.16,1,.3,1) forwards`, opacity: 0 }}>
                        <div style={{ width: 24, height: 24, borderRadius: 6, background: `linear-gradient(135deg,${doc.color},${doc.color}aa)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: '#fff', fontWeight: 800 }}>PDF</div>
                        <span style={{ flex: 1, fontSize: 10, fontWeight: 700, color: 'var(--heading)' }}>{doc.name}</span>
                        <span style={{ fontSize: 9, fontWeight: 700, color: '#7c5cfc' }}>{doc.match}</span>
                        <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', background: '#7c5cfc', padding: '2px 8px', borderRadius: 4 }}>DL</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Phase 2: AI Resource Download Page */}
          <div className="phase-row reverse">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#0891b210', color: '#0891b2' }}>STEP 02</div>
              <div className="phase-h">AI付き資料ダウンロードページ</div>
              <div className="phase-desc">お客様の資料を一覧表示する専用ページを自動生成。AIチャットが常駐し、訪問者の興味に合った資料を対話形式で提案します。ダウンロード時にメールアドレスを自然に取得し、リード情報をCRMへ即時登録。資料ページ自体がリード獲得の強力な導線になります。</div>
              <div className="phase-features">
                {['資料一覧ページの自動生成', 'AIチャット常駐で対話形式の提案', 'DL時のメールアドレス取得', 'CRMへの即時リード登録'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#0891b2' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis1">
                <div style={{ padding: 16 }}>
                  {/* Resource library mockup */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, animation: 'chatPop .4s .2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)' }}>resources.your-company.com</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                    {[
                      { name: '導入ガイド', type: 'ホワイトペーパー', color: '#e0475b', delay: '.4s' },
                      { name: '料金比較表', type: '料金資料', color: '#3b6ff5', delay: '.6s' },
                      { name: '導入事例集', type: 'ケーススタディ', color: '#7c5cfc', delay: '.8s' },
                      { name: '製品概要', type: 'パンフレット', color: '#0891b2', delay: '1.0s' },
                    ].map((doc, j) => (
                      <div key={j} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 10, padding: '10px', animation: `chatPop .5s ${doc.delay} cubic-bezier(.16,1,.3,1) forwards`, opacity: 0, cursor: 'default' }}>
                        <div style={{ width: '100%', height: 36, borderRadius: 6, background: `linear-gradient(135deg,${doc.color}15,${doc.color}08)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 6 }}>
                          <div style={{ width: 20, height: 20, borderRadius: 4, background: `linear-gradient(135deg,${doc.color},${doc.color}aa)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, color: '#fff', fontWeight: 800 }}>PDF</div>
                        </div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--heading)', lineHeight: 1.3 }}>{doc.name}</div>
                        <div style={{ fontSize: 8, color: 'var(--sub)', fontWeight: 600 }}>{doc.type}</div>
                      </div>
                    ))}
                  </div>
                  {/* AI chat prompt */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, padding: '8px 10px', background: 'linear-gradient(135deg,#f0ecfe,#ecfeff)', border: '1px solid rgba(124,92,252,.15)', borderRadius: 10, animation: 'chatPop .5s 1.3s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 5, background: 'linear-gradient(135deg,#7c5cfc,#0891b2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, color: '#fff', fontWeight: 800 }}>AI</div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--heading)' }}>どの資料をお探しですか？お手伝いします</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Phase 3: Q&A Support */}
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#12a37d10', color: '#12a37d' }}>STEP 03</div>
              <div className="phase-h">チャットでQ&A対応、疑問を即解消</div>
              <div className="phase-desc">製品やサービスに関する質問にAIチャットが即座に回答。資料の内容やWebサイトの情報を自動学習し、正確で一貫性のある回答を提供します。疑問を即解消することで、訪問者の検討度を引き上げ、商談への移行を促進します。</div>
              <div className="phase-features">
                {['資料・サイト内容の自動学習', '正確で一貫性のあるAI回答', '回答不能時の有人エスカレーション', '質問傾向の分析レポート'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#12a37d' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis2">
                <div style={{ padding: 16 }}>
                  {/* Q&A conversation */}
                  {[
                    { role: 'user', text: '他社ツールとの違いは何ですか？', delay: '.3s' },
                    { role: 'ai', text: 'Meeton aiは、AIが自ら訪問者に話しかける「能動型」のアプローチが特徴です。シナリオ設計不要で、検知→接触→育成→商談予約まで一貫して自動化します。', delay: '.8s' },
                    { role: 'user', text: '導入事例はありますか？', delay: '1.3s' },
                    { role: 'ai', text: 'はい！こちらの事例集をご覧ください。', delay: '1.8s', hasCard: true },
                  ].map((msg, i) => (
                    <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 8, justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', opacity: 0, animation: `chatPop .5s ${msg.delay} cubic-bezier(.16,1,.3,1) forwards` }}>
                      {msg.role === 'ai' && (
                        <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg,#12a37d,#0fc19a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, color: '#fff', fontWeight: 800, flexShrink: 0 }}>AI</div>
                      )}
                      <div>
                        <div style={{
                          background: msg.role === 'user' ? '#7c5cfc' : 'var(--surface)',
                          color: msg.role === 'user' ? '#fff' : 'var(--heading)',
                          border: msg.role === 'user' ? 'none' : '1px solid var(--border)',
                          borderRadius: 10,
                          borderTopLeftRadius: msg.role === 'ai' ? 3 : 10,
                          borderTopRightRadius: msg.role === 'user' ? 3 : 10,
                          padding: '7px 10px',
                          fontSize: 10,
                          fontWeight: 600,
                          lineHeight: 1.5,
                          maxWidth: 220,
                        }}>{msg.text}</div>
                        {msg.hasCard && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 8px', marginTop: 4, animation: `slideIn .4s 2.2s cubic-bezier(.16,1,.3,1) forwards`, opacity: 0 }}>
                            <div style={{ width: 20, height: 20, borderRadius: 4, background: 'linear-gradient(135deg,#7c5cfc,#9b82fd)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, color: '#fff', fontWeight: 800 }}>PDF</div>
                            <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--heading)' }}>導入事例集.pdf</span>
                            <span style={{ fontSize: 8, fontWeight: 700, color: '#7c5cfc', background: '#f0ecfe', padding: '2px 6px', borderRadius: 4, marginLeft: 'auto' }}>DL</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
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
          <div className="stitle" style={{ textAlign: 'center' }}>なぜ Meeton ai のナーチャリングなのか</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 44px' }}>匿名訪問者にもリードにも。資料とAIを掛け合わせた、検討度引き上げの新しいアプローチ。</p>
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
        <div className="glow" style={{ background: 'rgba(124,92,252,.15)', width: 500, height: 500, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div className="final-cta-inner">
          <div className="slabel">今すぐ始める</div>
          <div className="stitle" style={{ textAlign: 'center' }}>訪問者の検討度を<br />引き上げませんか？</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '16px auto 36px' }}>資料提案・Q&A対応・ポップアップ。匿名訪問者にもリードにも、AIが最適なコンテンツを最適なタイミングで届けます。</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-cta btn-cta-lg" onClick={() => setIsDocModalOpen(true)}>資料請求</button>
            <button className="btn-ghost" onClick={() => setIsMeetingModalOpen(true)}>デモを予約 →</button>
          </div>
        </div>
      </section>

      <Footer variant="light" />

      <HubSpotModal isOpen={isDocModalOpen} onClose={() => setIsDocModalOpen(false)} utmCampaign="features-nurture" />
      <HubSpotMeetingModal isOpen={isMeetingModalOpen} onClose={() => setIsMeetingModalOpen(false)} utmCampaign="features-nurture" />
    </div>
  );
}
