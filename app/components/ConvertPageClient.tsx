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
  --cta:#3b6ff5;--cta-hover:#6690fa;--cta-glow:rgba(59,111,245,.25);--cta-light:#eaf0fe;
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

.dot-grid{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(59,111,245,.08) 1px,transparent 1px);background-size:28px 28px;pointer-events:none}
.glow{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none}

.btn{border:none;cursor:pointer;font-family:var(--fb);transition:all .25s;font-weight:700;border-radius:10px}
.btn-cta{background:linear-gradient(135deg,var(--cta),#6690fa);color:#fff;padding:12px 26px;font-size:15px;box-shadow:0 4px 16px var(--cta-glow)}
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
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:130px 48px 90px;background:linear-gradient(165deg,#eff6ff 0%,#fff 30%,#f5f3ff 60%,#fff 100%)}
.hero-inner{max-width:1200px;width:100%;display:flex;align-items:center;gap:clamp(32px,5vw,64px);position:relative;z-index:2}
.hero-text{flex:1.2;min-width:0}
.hero-visual{flex:1;min-width:0;display:flex;justify-content:center}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,var(--cta-light),var(--accent-light));border:1px solid rgba(59,111,245,.15);padding:9px 22px;border-radius:24px;margin-bottom:28px;font-size:clamp(13px,3vw,15px);font-weight:700;color:var(--cta);backdrop-filter:blur(8px)}
.hero-badge-dot{width:7px;height:7px;border-radius:50%;background:var(--cta);animation:pulse 2s infinite}
.hero h1{font-size:clamp(32px,5vw,62px);font-weight:900;color:var(--heading);line-height:1.15;letter-spacing:-2px;margin-bottom:22px}
.hero h1 em{font-style:normal;background:linear-gradient(135deg,var(--cta),var(--accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-sub{font-size:clamp(15px,2.5vw,19px);line-height:1.8;color:var(--sub);max-width:520px;margin-bottom:36px}
.hero-ctas{display:flex;gap:14px;flex-wrap:wrap}
.hero-stats{display:flex;gap:clamp(24px,4vw,48px);margin-top:clamp(32px,5vw,48px);padding-top:clamp(24px,4vw,36px);border-top:1px solid var(--border);flex-wrap:wrap}
.stat-v{font-family:var(--fm);font-size:clamp(28px,4vw,42px);font-weight:700;color:var(--heading);background:linear-gradient(135deg,var(--heading),var(--cta));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-1px}
.stat-l{font-size:clamp(12px,1.5vw,14px);color:var(--sub);margin-top:6px;font-weight:600}

/* Calendar Visual */
@keyframes chatPop{0%{opacity:0;transform:translateY(16px) scale(.92)}100%{opacity:1;transform:translateY(0) scale(1)}}
@keyframes slideIn{0%{opacity:0;transform:translateX(-20px)}100%{opacity:1;transform:translateX(0)}}
@keyframes calPulse{0%,100%{box-shadow:0 0 0 0 rgba(59,111,245,.3)}50%{box-shadow:0 0 0 10px rgba(59,111,245,0)}}
@keyframes scoreUp{0%{width:0}100%{width:var(--sw)}}
.cal-panel{width:100%;max-width:420px;background:#fff;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,.08),0 1px 3px rgba(0,0,0,.04);border:1px solid var(--border);overflow:hidden;animation:fadeUp .8s .4s cubic-bezier(.16,1,.3,1) forwards;opacity:0}
.cal-hdr{padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#f0f4ff,#f8f6ff)}

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
.vis0{background:linear-gradient(160deg,#eff6ff,#f5f3ff)}
.vis1{background:linear-gradient(160deg,#eff6ff,#f0fffe)}
.vis2{background:linear-gradient(160deg,#f5f3ff,#eff6ff)}

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
.why-card:hover{border-color:transparent;transform:translateY(-4px);box-shadow:0 12px 40px rgba(59,111,245,.1)}
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
.final-cta{padding:clamp(60px,10vw,100px) clamp(16px,5vw,48px) clamp(80px,12vw,120px);text-align:center;position:relative;overflow:hidden;background:linear-gradient(165deg,#eff6ff 0%,#fff 40%,#f5f3ff 80%,#eaf0fe 100%)}
.final-cta-inner{max-width:620px;margin:0 auto;position:relative;z-index:2}

/* RESPONSIVE */
@media(max-width:1024px){
  .hero-inner{flex-direction:column;text-align:center}
  .hero-text{text-align:center}
  .hero-sub{margin-left:auto;margin-right:auto}
  .hero-ctas{justify-content:center}
  .hero-stats{justify-content:center}
  .cal-panel{max-width:360px}
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
  .cal-panel{max-width:320px}
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
  .cal-panel{max-width:100%}
  .pvis{aspect-ratio:1/1.4;min-height:400px}
  .pvis>div{transform:scale(0.78);transform-origin:top center}
  .flow-step{flex:0 0 100%}
  .flow-num{width:48px;height:48px;font-size:18px}
}
`;

const faqData = [
  { q: 'チャット内でどのようにカレンダーが表示されますか？', a: 'AIが会話の中でリードの温度感を判定し、商談意欲が高いと判断した時点でチャット内にカレンダーウィジェットを自動表示します。訪問者はページ遷移なしで空き時間を選択し、そのまま予約を完了できます。' },
  { q: 'サンクスページでのカレンダー表示はどう動きますか？', a: 'フォーム送信後のサンクスページにAIチャットとカレンダーウィジェットを自動表示します。「資料をお送りしました。ぜひデモもご覧になりませんか？」のように自然に商談予約を促し、その場で空き時間を選択できます。' },
  { q: '予約しなかったリードへの自動メールはどう動きますか？', a: 'チャットやサンクスページで商談予約に至らなかったリードに対して、AIがカレンダーURL付きのフォローメールを自動送信します。送信タイミングやメール内容はリードの行動履歴に基づいてパーソナライズされます。' },
  { q: '事前ヒアリングとは何ですか？', a: '商談予約時に、AIが自動で簡単なヒアリングを実施します。「お問い合わせの背景」「現在利用中のツール」「ご予算感」など、営業が商談前に知っておきたい情報を事前に収集。営業担当は準備万端で商談に臨めます。' },
  { q: '導入にどのくらい時間がかかりますか？', a: 'JavaScriptタグの設置とカレンダー連携で約10分です。Google Calendar、TimeRexなど主要な日程調整ツールに対応しています。サンクスページへの設置もJSタグ1行で完了します。' },
];

const whyData = [
  { title: 'チャットからそのまま予約', desc: '会話の流れでカレンダーを提示。ページ遷移なしで予約完了。温度感が高い瞬間を逃さない。', color: '#3b6ff5', iconPath: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
  { title: '未CVリードを自動追客', desc: 'チャット・サンクスページで予約しなかったリードにAIがカレンダーURL付きメールを自動送信。', color: '#7c5cfc', iconPath: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6' },
  { title: '事前ヒアリング自動化', desc: '商談前にAIが自動でヒアリング。営業は準備万端で商談に臨め、初回から質の高い会話を展開。', color: '#12a37d', iconPath: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z' },
  { title: 'CRM完全自動登録', desc: '予約情報・ヒアリング内容・リードスコアを自動でCRMに登録。確認メール・リマインダーも自動。', color: '#0891b2', iconPath: 'M17 1l4 4-4 4 M3 11V9a4 4 0 0 1 4-4h14 M7 23l-4-4 4-4 M21 13v2a4 4 0 0 1-4 4H3' },
];

const flowSteps = [
  { num: '1', title: '温度感の高いリード', sub: 'Hot lead detected', color: '#7c5cfc' },
  { num: '2', title: 'チャット内予約', sub: 'In-chat calendar', color: '#3b6ff5' },
  { num: '3', title: 'サンクスページ', sub: 'Post-form calendar', color: '#6690fa' },
  { num: '4', title: 'AIメール追客', sub: 'Auto follow-up', color: '#12a37d' },
  { num: '5', title: '商談確定', sub: 'Meeting confirmed', color: '#0891b2' },
];

const flowStepIcons = [
  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>,
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>,
  <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></>,
  <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></>,
  <><path d="M8 2v4 M16 2v4 M3 10h18"/><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/></>,
];

export default function ConvertPageClient() {
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
        <div className="glow" style={{ background: 'rgba(59,111,245,.2)', width: 600, height: 600, top: -200, right: -100 }} />
        <div className="glow" style={{ background: 'rgba(124,92,252,.1)', width: 500, height: 500, bottom: -150, left: -80 }} />
        <div className="hero-inner">
          <div className="hero-text">
            <div className="anim d1 hero-badge"><div className="hero-badge-dot" />PHASE 04 — CONVERT</div>
            <h1 className="anim d2">あらゆる場面で<br /><em>商談を決める</em></h1>
            <p className="anim d3 hero-sub">チャット内・サンクスページでカレンダーを提示。予約しなかったリードにはAIがカレンダーURL付きメールを自動送信。商談獲得を最大化します。</p>
            <div className="anim d4 hero-ctas">
              <button className="btn btn-cta btn-cta-lg" onClick={() => setIsDocModalOpen(true)}>資料請求</button>
              <button className="btn-ghost" onClick={() => setIsMeetingModalOpen(true)}>デモを予約 →</button>
            </div>
            <div className="anim d5 hero-stats">
              {[{ v: '40%', l: '予約率向上' }, { v: 'Auto', l: '事前ヒアリング' }, { v: '0', l: '手動CRM入力' }].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}><div className="stat-v">{s.v}</div><div className="stat-l">{s.l}</div></div>
              ))}
            </div>
          </div>
          <div className="hero-visual anim d4">
            <div className="cal-panel">
              <div className="cal-hdr">
                <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,#3b6ff5,#6690fa)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4 M8 2v4 M3 10h18"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--heading)' }}>商談予約</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b6ff5' }} />
                    <span style={{ fontSize: 10, color: 'var(--sub)', fontWeight: 600 }}>空き時間を表示中</span>
                  </div>
                </div>
              </div>
              <div style={{ padding: '14px 16px' }}>
                {/* Calendar grid */}
                <div style={{ marginBottom: 12, animation: 'chatPop .5s .6s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--heading)', marginBottom: 8 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b6ff5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: -2, marginRight: 4 }}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4 M8 2v4 M3 10h18"/></svg>
                    空き時間を選択
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
                    {['10:00', '11:00', '14:00', '15:00', '16:00', '17:00'].map((time, j) => (
                      <div key={j} style={{
                        padding: '8px 4px', textAlign: 'center', borderRadius: 8, fontSize: 11, fontWeight: 700,
                        background: j === 2 ? '#3b6ff5' : '#fff',
                        color: j === 2 ? '#fff' : 'var(--heading)',
                        border: j === 2 ? 'none' : '1px solid var(--border)',
                        animation: j === 2 ? 'calPulse 2s infinite' : 'none',
                        cursor: 'default',
                      }}>{time}</div>
                    ))}
                  </div>
                </div>
                {/* Pre-hearing preview */}
                <div style={{ background: 'var(--surface)', borderRadius: 10, padding: 12, marginBottom: 10, animation: 'chatPop .5s 1.0s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)', marginBottom: 6 }}>事前ヒアリング（自動）</div>
                  {['お問い合わせの背景', '現在利用中のツール', 'ご予算感'].map((q, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3b6ff5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                      <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--heading)' }}>{q}</span>
                    </div>
                  ))}
                </div>
                {/* CRM sync badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, animation: 'slideIn .5s 1.4s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#12a37d', animation: 'pulse 1.5s infinite' }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#12a37d' }}>CRMへ自動登録</span>
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
          <div className="stitle" style={{ textAlign: 'center' }}>育成から商談確定まで</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 52px' }}>チャット・サンクスページ・メールの3ルートで商談予約を獲得。取りこぼしゼロを実現します。</p>
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
          <div className="stitle" style={{ textAlign: 'center' }}>商談確定を深掘り</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 20px' }}>リードをどのように商談まで導くか、ステップごとに解説します。</p>
        </div>
      </section>

      {/* Phase 1: In-Chat Calendar */}
      <section style={{ padding: '0 clamp(16px,5vw,48px)', position: 'relative' }}>
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#3b6ff510', color: '#3b6ff5' }}>STEP 01</div>
              <div className="phase-h">チャット内でそのまま商談予約</div>
              <div className="phase-desc">AIが会話の中でリードの温度感を判定し、商談意欲が高いと判断した時点でチャット内にカレンダーを自動表示。訪問者はページ遷移なしで空き時間を選び、そのまま予約を完了できます。会話の流れを壊さない、最も自然なコンバージョン体験です。</div>
              <div className="phase-features">
                {['温度感に応じた自動カレンダー表示', 'ページ遷移なしで予約完了', '会話の流れを壊さない自然なUX', '事前ヒアリングもチャット内で完結'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#3b6ff5' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis0" style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Chat header */}
                <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg,#f0f4ff,#f8f6ff)', flexShrink: 0 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 7, background: 'linear-gradient(135deg,#3b6ff5,#6690fa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 800 }}>M</div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--heading)' }}>ミートン</div>
                </div>
                {/* Chat body */}
                <div style={{ flex: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8, overflow: 'hidden' }}>
                  {/* User message */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', opacity: 0, animation: 'chatPop .5s .3s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ background: '#3b6ff5', color: '#fff', borderRadius: 12, borderBottomRightRadius: 3, padding: '7px 12px', fontSize: 10, fontWeight: 600, maxWidth: '75%' }}>デモを見てみたいです</div>
                  </div>
                  {/* AI message with calendar */}
                  <div style={{ display: 'flex', gap: 6, opacity: 0, animation: 'chatPop .5s .8s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg,#3b6ff5,#6690fa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: '#fff', fontWeight: 800, flexShrink: 0 }}>AI</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, borderTopLeftRadius: 3, padding: '7px 10px', fontSize: 10, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.5, marginBottom: 6 }}>ぜひ！空き時間をお選びください</div>
                      {/* Calendar widget */}
                      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 10, padding: 10, opacity: 0, animation: 'chatPop .5s 1.3s cubic-bezier(.16,1,.3,1) forwards' }}>
                        <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--sub)', marginBottom: 6 }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3b6ff5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: -1, marginRight: 3 }}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4 M8 2v4 M3 10h18"/></svg>
                          空き時間を選択
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 4 }}>
                          {['10:00', '14:00', '16:00'].map((t, j) => (
                            <div key={j} style={{ padding: '5px 4px', textAlign: 'center', borderRadius: 6, fontSize: 9, fontWeight: 700, background: j === 1 ? '#3b6ff5' : '#fff', color: j === 1 ? '#fff' : 'var(--heading)', border: j === 1 ? 'none' : '1px solid var(--border)', cursor: 'default', animation: j === 1 ? 'calPulse 2s infinite' : 'none' }}>{t}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Confirmation badge */}
                  <div style={{ textAlign: 'center', opacity: 0, animation: 'chatPop .5s 1.8s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#e5f8f2', border: '1px solid rgba(18,163,125,.2)', borderRadius: 8, padding: '5px 12px', fontSize: 9, fontWeight: 800, color: '#12a37d' }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#12a37d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                      14:00で予約完了
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Phase 2: Thanks Page Calendar */}
          <div className="phase-row reverse">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#7c5cfc10', color: '#7c5cfc' }}>STEP 02</div>
              <div className="phase-h">サンクスページで即カレンダー提示</div>
              <div className="phase-desc">フォーム送信後のサンクスページにAIチャットとカレンダーウィジェットを自動配置。「資料をお送りしました。デモもご覧になりませんか？」とAIが声をかけ、その場で空き時間を選択。コンバージョン直後の高い関心を逃さず、商談予約まで一気に完結します。</div>
              <div className="phase-features">
                {['サンクスページへの自動配置', 'AIによる自然な商談予約誘導', 'その場でカレンダー選択', 'フォーム情報の自動引き継ぎ'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#7c5cfc' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis1">
                <div style={{ padding: 16 }}>
                  {/* Thanks page mockup */}
                  <div style={{ textAlign: 'center', marginBottom: 10, animation: 'chatPop .4s .2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#e5f8f2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#12a37d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--heading)' }}>お問い合わせありがとうございます</div>
                    <div style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600 }}>資料をメールでお送りしました</div>
                  </div>
                  {/* AI suggestion */}
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 12, marginBottom: 8, animation: 'chatPop .5s .6s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                      <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg,#12a37d,#0fc19a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, color: '#fff', fontWeight: 800, flexShrink: 0 }}>AI</div>
                      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, borderTopLeftRadius: 2, padding: '6px 10px', fontSize: 10, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.5 }}>デモもご覧になりませんか？空き時間をお選びください</div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 4 }}>
                      {['10:00', '14:00', '16:00'].map((t, j) => (
                        <div key={j} style={{ padding: '6px 4px', textAlign: 'center', borderRadius: 6, fontSize: 10, fontWeight: 700, background: j === 1 ? '#3b6ff5' : '#fff', color: j === 1 ? '#fff' : 'var(--heading)', border: j === 1 ? 'none' : '1px solid var(--border)', cursor: 'default' }}>{t}</div>
                      ))}
                    </div>
                  </div>
                  {/* Confirmation */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, animation: 'slideIn .5s 1.1s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#12a37d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#12a37d' }}>予約確認メール送信済み</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Phase 3: AI Email Follow-up for Non-Converters */}
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#12a37d10', color: '#12a37d' }}>STEP 03</div>
              <div className="phase-h">未予約リードにAIメールで自動追客</div>
              <div className="phase-desc">チャットやサンクスページで商談予約に至らなかったリードに対して、AIがカレンダーURL付きのフォローメールを自動送信。リードの行動履歴に基づいてメール内容と送信タイミングをパーソナライズし、最適な瞬間に再アプローチします。</div>
              <div className="phase-features">
                {['カレンダーURL付きメール自動送信', '行動履歴に基づくパーソナライズ', '最適タイミングでの再アプローチ', '開封・クリック率のリアルタイム追跡'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#12a37d' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis2">
                <div style={{ padding: 16 }}>
                  {/* Email preview */}
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 14, marginBottom: 10, animation: 'chatPop .5s .3s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#12a37d,#0fc19a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--heading)' }}>AIフォローメール</div>
                        <div style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600 }}>トリガー: チャットで未予約</div>
                      </div>
                      <span style={{ fontSize: 9, fontWeight: 700, color: '#12a37d', background: '#e5f8f2', padding: '3px 8px', borderRadius: 6 }}>自動送信</span>
                    </div>
                    <div style={{ background: 'var(--surface)', borderRadius: 8, padding: 10, fontSize: 10, color: 'var(--text)', lineHeight: 1.6, marginBottom: 8 }}>
                      <div style={{ fontWeight: 700, color: 'var(--heading)', marginBottom: 4 }}>田中様</div>
                      先日はご検討ありがとうございます。デモのご都合がつきましたら、下記からご予約ください。
                    </div>
                    {/* Calendar CTA in email */}
                    <div style={{ background: '#3b6ff5', borderRadius: 8, padding: '8px 12px', textAlign: 'center', animation: 'chatPop .5s .8s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                      <span style={{ fontSize: 10, fontWeight: 800, color: '#fff' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: -1, marginRight: 4 }}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4 M8 2v4 M3 10h18"/></svg>
                        空き時間を選んで予約する
                      </span>
                    </div>
                  </div>
                  {/* Stats */}
                  <div style={{ display: 'flex', gap: 6, animation: 'slideIn .5s 1.2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ flex: 1, background: '#fff', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#12a37d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                      <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--heading)' }}>開封率 <span style={{ color: '#12a37d' }}>72%</span></span>
                    </div>
                    <div style={{ flex: 1, background: '#fff', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3b6ff5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/></svg>
                      <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--heading)' }}>予約率 <span style={{ color: '#3b6ff5' }}>28%</span></span>
                    </div>
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
          <div className="stitle" style={{ textAlign: 'center' }}>なぜ Meeton ai のコンバージョンなのか</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 44px' }}>チャット・サンクスページ・メールの3ルートで取りこぼしゼロ。</p>
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
        <div className="glow" style={{ background: 'rgba(59,111,245,.15)', width: 500, height: 500, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div className="final-cta-inner">
          <div className="slabel">今すぐ始める</div>
          <div className="stitle" style={{ textAlign: 'center' }}>商談予約を<br />自動化しませんか？</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '16px auto 36px' }}>チャット内予約・サンクスページ・AIメール追客。3ルートで商談獲得を最大化します。</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-cta btn-cta-lg" onClick={() => setIsDocModalOpen(true)}>資料請求</button>
            <button className="btn-ghost" onClick={() => setIsMeetingModalOpen(true)}>デモを予約 →</button>
          </div>
        </div>
      </section>

      <Footer variant="light" />

      <HubSpotModal isOpen={isDocModalOpen} onClose={() => setIsDocModalOpen(false)} utmCampaign="features-convert" />
      <HubSpotMeetingModal isOpen={isMeetingModalOpen} onClose={() => setIsMeetingModalOpen(false)} utmCampaign="features-convert" />
    </div>
  );
}
