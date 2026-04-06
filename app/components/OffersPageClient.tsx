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
  --cta:#7c5cfc;--cta-hover:#a78bfa;--cta-glow:rgba(124,92,252,.25);--cta-light:#f0ecfe;
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

.dot-grid{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(124,92,252,.08) 1px,transparent 1px);background-size:28px 28px;pointer-events:none}
.glow{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none}

.btn{border:none;cursor:pointer;font-family:var(--fb);transition:all .25s;font-weight:700;border-radius:10px}
.btn-cta{background:linear-gradient(135deg,var(--cta),#a78bfa);color:#fff;padding:12px 26px;font-size:15px;box-shadow:0 4px 16px var(--cta-glow)}
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
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:130px 48px 90px;background:linear-gradient(165deg,#f0ecfe 0%,#fff 30%,#eaf0fe 60%,#fff 100%)}
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

/* Dashboard Visual */
@keyframes rowSlide{0%{opacity:0;transform:translateX(-16px)}100%{opacity:1;transform:translateX(0)}}
@keyframes barGrow{0%{width:0}100%{width:var(--bw)}}
@keyframes badgePop{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}
@keyframes dotBlink{0%,100%{opacity:.3}50%{opacity:1}}
.dash{width:100%;max-width:420px;background:#fff;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,.08),0 1px 3px rgba(0,0,0,.04);border:1px solid var(--border);overflow:hidden;animation:fadeUp .8s .4s cubic-bezier(.16,1,.3,1) forwards;opacity:0}
.dash-hdr{padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#f0ecfe,#eaf0fe)}
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
@keyframes ringPulse{0%{box-shadow:0 0 0 0 rgba(124,92,252,.4)}70%{box-shadow:0 0 0 12px rgba(124,92,252,0)}100%{box-shadow:0 0 0 0 rgba(124,92,252,0)}}

.vis0{background:linear-gradient(160deg,#f0ecfe,#eaf0fe)}
.vis1{background:linear-gradient(160deg,#f0ecfe,#f0fdf4)}
.vis2{background:linear-gradient(160deg,#eaf0fe,#f0ecfe)}
.vis3{background:linear-gradient(160deg,#ecfeff,#f0ecfe)}

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

/* USE CASES */
.usecase-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
.usecase-card{background:var(--bg);border:1px solid var(--border);border-radius:20px;padding:28px;transition:all .35s;position:relative;overflow:hidden}
.usecase-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(124,92,252,.1);border-color:transparent}

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
.final-cta{padding:clamp(60px,10vw,100px) clamp(16px,5vw,48px) clamp(80px,12vw,120px);text-align:center;position:relative;overflow:hidden;background:linear-gradient(165deg,#f0ecfe 0%,#fff 40%,#eaf0fe 80%,#f0ecfe 100%)}
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
  .usecase-grid{grid-template-columns:repeat(2,1fr)}
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
  .usecase-grid{grid-template-columns:1fr}
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
  { q: '資料の登録に手間がかかりませんか？', a: 'ダッシュボードからPDFをアップロードするだけです。タイトルと簡単な説明を入力すれば、AIが内容を自動解析し、適切な訪問者に自動でマッチングします。' },
  { q: 'ポップアップの表示条件をカスタマイズできますか？', a: 'はい。Exit Intent、スクロール深度、滞在時間、訪問回数など、複数の条件を組み合わせて設定可能です。デフォルトではAIが最適なタイミングを自動判定します。' },
  { q: '匿名訪問者のデータはどのように管理されますか？', a: 'Cookieベースで匿名の閲覧行動を追跡します。フォーム送信やチャットでメールアドレスが判明した時点で、過去の匿名データが自動的にリードプロファイルに統合されます。GDPR対応のCookie同意バナーも提供しています。' },
  { q: '資料ダウンロードページのデザインはカスタマイズできますか？', a: 'はい。ブランドカラー、ロゴ、レイアウトを自由にカスタマイズ可能です。自社サイトに溶け込むデザインで資料ページを公開できます。' },
  { q: '1つのページに複数の資料を提案できますか？', a: 'はい。AIが訪問者の関心に基づいて優先度の高い資料から順にレコメンドします。マッチ度スコアも表示されるため、訪問者は最適な資料をすぐに見つけられます。' },
];

const whyData = [
  { title: '自動マッチング', desc: '閲覧行動に基づくAI推薦。手動設定・ルール設計は一切不要。', color: '#7c5cfc', iconPath: 'M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3' },
  { title: '最適タイミング', desc: 'Exit Intent・スクロール・滞在時間を分析し、最も効果的な瞬間に表示。', color: '#12a37d', iconPath: 'M12 2v10l4.5 4.5 M12 2a10 10 0 1 0 10 10' },
  { title: '匿名リード獲得', desc: 'メール未取得の訪問者からも資料DLでリード情報を獲得。', color: '#3b6ff5', iconPath: 'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M12.5 7a4 4 0 1 0-8 0 4 4 0 0 0 8 0z M20 8v6 M23 11h-6' },
  { title: 'AI常駐', desc: '資料ページにAIチャットが常駐。質問対応と資料レコメンドを同時に。', color: '#0891b2', iconPath: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
];

const flowSteps = [
  { num: '1', title: '行動を分析', sub: 'Behavior analysis', color: '#6e7494' },
  { num: '2', title: '資料をマッチング', sub: 'Match resources', color: '#7c5cfc' },
  { num: '3', title: '最適タイミングで提示', sub: 'Optimal timing', color: '#a78bfa' },
  { num: '4', title: 'リード情報を獲得', sub: 'Lead captured', color: '#12a37d' },
  { num: '5', title: 'フォローへ接続', sub: 'Connect to follow-up', color: '#3b6ff5' },
];

const flowStepIcons = [
  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0"/>,
  <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 15l2 2 4-4"/></>,
  <path d="M12 2v10l4.5 4.5 M12 2a10 10 0 1 0 10 10"/>,
  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M12.5 7a4 4 0 1 0-8 0 4 4 0 0 0 8 0z M20 8v6 M23 11h-6"/>,
  <path d="M5 12h14 M12 5l7 7-7 7"/>,
];

const useCases = [
  {
    title: '料金ページ閲覧者',
    color: '#7c5cfc',
    desc: '料金ページを見ている訪問者に料金比較表をポップアップで提示。「もっと詳しく知りたい」の瞬間を逃さない。',
    example: '料金プランをご検討中ですね！こちらの料金比較表で、各プランの違いが一目でわかります。',
  },
  {
    title: '事例ページ閲覧者',
    color: '#3b6ff5',
    desc: '事例ページを閲覧中の訪問者に、業界が近い導入事例集を自動レコメンド。',
    example: '御社と同じ業界の企業が、Meeton ai でどう成果を出したかをまとめた資料がございます。',
  },
  {
    title: '匿名訪問者',
    color: '#12a37d',
    desc: 'メールアドレス未取得の匿名訪問者にもCookieベースで最適な資料を提示。DL時にリード情報を獲得。',
    example: 'AI SDRの概要がわかる3分資料をご用意しています。お名前とメールアドレスをいただければすぐにお送りします。',
  },
];

export default function OffersPageClient() {
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
        <div className="glow" style={{ background: 'rgba(59,111,245,.1)', width: 500, height: 500, bottom: -150, left: -80 }} />
        <div className="hero-inner">
          <div className="hero-text">
            <div className="anim d1 hero-badge"><div className="hero-badge-dot" />OFFERS</div>
            <h1 className="anim d2">訪問者ごとに、<br /><em>最適な資料を自動提案</em></h1>
            <p className="anim d3 hero-sub">閲覧ページに応じた資料マッチング、最適タイミングのポップアップ、AI付き資料ダウンロードページ——訪問者の関心に合わせて資料を自動提案し、リードを獲得します。</p>
            <div className="anim d4 hero-ctas">
              <button className="btn btn-cta btn-cta-lg" onClick={() => setIsDocModalOpen(true)}>資料請求</button>
              <button className="btn-ghost" onClick={() => setIsMeetingModalOpen(true)}>デモを予約 →</button>
            </div>
            <div className="anim d5 hero-stats">
              {[{ v: '98%', l: 'マッチ精度' }, { v: '自動', l: '資料レコメンド' }, { v: '匿名OK', l: 'リード獲得' }].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}><div className="stat-v">{s.v}</div><div className="stat-l">{s.l}</div></div>
              ))}
            </div>
          </div>
          <div className="hero-visual anim d4">
            <div className="dash">
              <div className="dash-hdr">
                <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,#7c5cfc,#a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#fff', fontWeight: 800 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--heading)' }}>AI 資料ダウンロードセンター</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cta)', animation: 'dotBlink 1.5s infinite' }} />
                    <span style={{ fontSize: 10, color: 'var(--sub)', fontWeight: 600 }}>レコメンド中</span>
                  </div>
                </div>
              </div>
              <div style={{ padding: '6px 0' }}>
                {[
                  { name: 'サービス概要資料', match: 98, level: 'おすすめ', color: '#7c5cfc', bg: '#f0ecfe', delay: '.6s', barW: '98%', barColor: 'linear-gradient(90deg,#7c5cfc,#a78bfa)' },
                  { name: '料金比較表', match: 92, level: '閲覧中', color: '#3b6ff5', bg: '#eaf0fe', delay: '.9s', barW: '92%', barColor: 'linear-gradient(90deg,#3b6ff5,#6b8ff8)' },
                  { name: '導入事例集', match: 85, level: '', color: '#6e7494', bg: '#f4f6fb', delay: '1.2s', barW: '85%', barColor: 'linear-gradient(90deg,#6e7494,#9ca3c4)' },
                ].map((v, i) => (
                  <div className="dash-row" key={i} style={{ animationDelay: v.delay }}>
                    <div className="dash-avatar" style={{ background: `linear-gradient(135deg,${v.color}cc,${v.color})`, fontSize: 9, borderRadius: 6 }}>PDF</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--heading)' }}>{v.name}</span>
                        {v.level && <span className="score-badge" style={{ background: v.bg, color: v.color, animationDelay: `calc(${v.delay} + .3s)` }}>{v.level}</span>}
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--sub)', fontWeight: 600, marginBottom: 4 }}>マッチ度 {v.match}%</div>
                      <div style={{ background: 'var(--surface)', borderRadius: 3, height: 6, overflow: 'hidden' }}>
                        <div className="score-bar" style={{ '--bw': v.barW, background: v.barColor, animationDelay: `calc(${v.delay} + .2s)` } as React.CSSProperties} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'var(--surface)' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7c5cfc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v10l4.5 4.5"/><circle cx="12" cy="12" r="10"/></svg>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)' }}>AIが閲覧行動から最適な資料をレコメンド</span>
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
          <div className="stitle" style={{ textAlign: 'center' }}>資料提案の流れ</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 52px' }}>訪問者の行動を分析し、最適な資料を最適なタイミングで提案します。</p>
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

      {/* FEATURE DETAILS */}
      <section className="section" style={{ position: 'relative', paddingBottom: 0 }}>
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div className="slabel" style={{ textAlign: 'center' }}>機能詳細</div>
          <div className="stitle" style={{ textAlign: 'center' }}>資料提案の仕組みを深掘り</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 20px' }}>閲覧行動の分析からリード獲得まで、資料提案のプロセスをステップごとに解説します。</p>
        </div>
      </section>

      {/* Feature 1: Auto Matching */}
      <section style={{ padding: '0 clamp(16px,5vw,48px)', position: 'relative' }}>
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#7c5cfc10', color: '#7c5cfc' }}>FEATURE 01</div>
              <div className="phase-h">閲覧ページに応じて資料を自動マッチング</div>
              <div className="phase-desc">料金ページを見ていれば料金比較表、事例ページなら導入事例集。訪問者の閲覧行動を分析し、手動設定なしで最適な資料を自動マッチングします。</div>
              <div className="phase-features">
                {['ページ内容に基づく自動マッチング', '手動設定・ルール設計不要', '料金→料金表、事例→事例集', 'マッチ精度98%'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#7c5cfc' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis0">
                <div style={{ padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, animation: 'chatPop .4s .2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#7c5cfc', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)' }}>ページ → 資料マッピング</span>
                  </div>
                  {[
                    { page: '料金ページ', resource: '料金比較表', match: '98%', color: '#7c5cfc', delay: '.4s' },
                    { page: '事例ページ', resource: '導入事例集', match: '95%', color: '#3b6ff5', delay: '.7s' },
                    { page: '機能ページ', resource: 'サービス概要資料', match: '92%', color: '#12a37d', delay: '1.0s' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: '#fff', border: `1px solid ${item.color}20`, borderRadius: 10, marginBottom: 6, opacity: 0, animation: `slideIn .5s ${item.delay} cubic-bezier(.16,1,.3,1) forwards` }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: item.color, background: `${item.color}12`, padding: '4px 8px', borderRadius: 6, flexShrink: 0 }}>{item.page}</div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14 M12 5l7 7-7 7"/></svg>
                      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--heading)', flex: 1 }}>{item.resource}</div>
                      <span style={{ fontSize: 9, fontWeight: 800, color: item.color }}>{item.match}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, animation: 'slideIn .5s 1.3s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7c5cfc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#7c5cfc' }}>AIが自動マッチング中...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Feature 2: Optimal Timing Popup */}
          <div className="phase-row reverse">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#12a37d10', color: '#12a37d' }}>FEATURE 02</div>
              <div className="phase-h">最適タイミングでポップアップ表示</div>
              <div className="phase-desc">Exit Intent・スクロール深度・滞在時間に応じてポップアップを表示。離脱しようとしている訪問者を逃さず、最適なタイミングで資料を提案します。</div>
              <div className="phase-features">
                {['Exit Intent検知で離脱防止', 'スクロール深度に応じた表示', '滞在時間ベースのトリガー', '表示タイミングのAI最適化'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#12a37d' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis1">
                <div style={{ padding: 16 }}>
                  {/* Browser-like header */}
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 10, padding: 10, marginBottom: 10, opacity: 0, animation: 'chatPop .5s .3s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#e0475b' }} />
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b' }} />
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#12a37d' }} />
                    </div>
                    <div style={{ height: 6, background: 'var(--surface)', borderRadius: 3, marginBottom: 6 }} />
                    <div style={{ height: 6, background: 'var(--surface)', borderRadius: 3, width: '70%' }} />
                  </div>
                  {/* Popup overlay */}
                  <div style={{ background: '#fff', border: '2px solid #12a37d40', borderRadius: 14, padding: 14, boxShadow: '0 8px 32px rgba(18,163,125,.15)', opacity: 0, animation: 'chatPop .5s .8s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#12a37d,#0fc19a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--heading)' }}>料金比較表をご用意しています</div>
                        <div style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600 }}>Exit Intent検知 — たった今</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                      {['Exit Intent', 'スクロール 80%'].map((tag, j) => (
                        <span key={j} style={{ fontSize: 9, fontWeight: 700, color: '#12a37d', background: '#e5f8f2', padding: '3px 8px', borderRadius: 6 }}>{tag}</span>
                      ))}
                    </div>
                    <div style={{ background: 'linear-gradient(135deg,#12a37d,#0fc19a)', color: '#fff', padding: '6px 12px', borderRadius: 8, fontSize: 10, fontWeight: 800, textAlign: 'center' }}>無料でダウンロード →</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 10, animation: 'slideIn .5s 1.3s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#12a37d', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#12a37d' }}>最適タイミングで表示中...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Feature 3: AI Download Center */}
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#3b6ff510', color: '#3b6ff5' }}>FEATURE 03</div>
              <div className="phase-h">AI付き資料ダウンロードページ</div>
              <div className="phase-desc">資料一覧にAIチャットが常駐。訪問者の質問に即座に対応しながら、最適な資料をレコメンド。ダウンロード時にリード情報を獲得します。</div>
              <div className="phase-features">
                {['資料一覧+AIチャット常駐', 'DL時にリード情報を自動獲得', 'AIが最適な資料をレコメンド', '資料の閲覧状況をトラッキング'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#3b6ff5' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis2">
                <div style={{ padding: 16 }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {/* Resource list */}
                    <div style={{ flex: 1, opacity: 0, animation: 'chatPop .4s .2s cubic-bezier(.16,1,.3,1) forwards' }}>
                      {[
                        { name: 'サービス概要', color: '#7c5cfc' },
                        { name: '料金比較表', color: '#3b6ff5' },
                        { name: '導入事例集', color: '#12a37d' },
                      ].map((r, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 8px', background: '#fff', border: '1px solid var(--border)', borderRadius: 8, marginBottom: 4, opacity: 0, animation: `slideIn .5s ${.4 + i * .2}s cubic-bezier(.16,1,.3,1) forwards` }}>
                          <div style={{ width: 20, height: 20, borderRadius: 4, background: `linear-gradient(135deg,${r.color}cc,${r.color})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, color: '#fff', fontWeight: 800, flexShrink: 0 }}>PDF</div>
                          <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--heading)' }}>{r.name}</span>
                        </div>
                      ))}
                    </div>
                    {/* Chat sidebar */}
                    <div style={{ width: '45%', background: '#fff', border: '1px solid var(--border)', borderRadius: 10, padding: 8, opacity: 0, animation: 'chatPop .5s .6s cubic-bezier(.16,1,.3,1) forwards' }}>
                      <div style={{ fontSize: 9, fontWeight: 800, color: 'var(--heading)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'linear-gradient(135deg,#3b6ff5,#6b8ff8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        </div>
                        AI アシスタント
                      </div>
                      <div style={{ background: '#eaf0fe', borderRadius: 6, padding: '5px 7px', fontSize: 8, color: '#3b6ff5', fontWeight: 600, lineHeight: 1.5, marginBottom: 4 }}>料金について詳しく知りたい場合は、料金比較表がおすすめです。</div>
                      <div style={{ background: 'var(--surface)', borderRadius: 6, padding: '4px 7px', fontSize: 8, color: 'var(--sub)', fontWeight: 600 }}>ご質問をどうぞ...</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 10, animation: 'slideIn .5s 1.2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#3b6ff5', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#3b6ff5' }}>AIがリアルタイムで対応中...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Feature 4: Anonymous + Identified */}
          <div className="phase-row reverse">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#0891b210', color: '#0891b2' }}>FEATURE 04</div>
              <div className="phase-h">匿名訪問者にもリードにも対応</div>
              <div className="phase-desc">Cookie追跡で匿名訪問者にも適切な資料を表示。メールアドレス取得時に過去の匿名行動データが自動統合され、リードの全体像を把握できます。</div>
              <div className="phase-features">
                {['Cookieベースの匿名追跡', 'メール取得時に行動データ統合', '匿名→実名のシームレス移行', 'リードプロファイルの自動構築'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#0891b2' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis3">
                <div style={{ padding: 16 }}>
                  {/* Anonymous state */}
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 10, padding: 10, marginBottom: 8, opacity: 0, animation: 'chatPop .5s .3s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'var(--sub)' }}>?</div>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)' }}>匿名訪問者</div>
                        <div style={{ fontSize: 8, color: 'var(--sub)' }}>Cookie ID: a3f8...k2d1</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {['料金ページ', '事例ページ', 'ブログ'].map((p, j) => (
                        <span key={j} style={{ fontSize: 8, fontWeight: 600, color: '#6e7494', background: '#f4f6fb', padding: '2px 6px', borderRadius: 4 }}>{p}</span>
                      ))}
                    </div>
                  </div>
                  {/* Arrow */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8, opacity: 0, animation: 'chatPop .5s .7s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14 M5 12l7 7 7-7"/></svg>
                  </div>
                  {/* Identified state */}
                  <div style={{ background: '#fff', border: '2px solid #0891b240', borderRadius: 10, padding: 10, boxShadow: '0 4px 16px rgba(8,145,178,.1)', opacity: 0, animation: 'chatPop .5s 1.0s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg,#0891b2,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff', fontWeight: 800 }}>T</div>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--heading)' }}>田中太郎</div>
                        <div style={{ fontSize: 8, color: '#0891b2', fontWeight: 600 }}>tanaka@example.com</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {['料金ページ', '事例ページ', 'ブログ', '資料DL'].map((p, j) => (
                        <span key={j} style={{ fontSize: 8, fontWeight: 600, color: '#0891b2', background: '#ecfeff', padding: '2px 6px', borderRadius: 4 }}>{p}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 10, animation: 'slideIn .5s 1.4s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#0891b2', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#0891b2' }}>行動データを自動統合...</span>
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
          <div className="slabel" style={{ textAlign: 'center' }}>USE CASES</div>
          <div className="stitle" style={{ textAlign: 'center' }}>資料提案の活用シーン</div>
          <div className="usecase-grid">
            {useCases.map((uc, i) => (
              <div className="usecase-card" key={i}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${uc.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={uc.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {i === 0 && <><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>}
                    {i === 1 && <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8M16 17H8M10 9H8"/></>}
                    {i === 2 && <><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/></>}
                  </svg>
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--heading)', marginBottom: 10 }}>{uc.title}</div>
                <div style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--sub)', marginBottom: 16 }}>{uc.desc}</div>
                <div style={{ background: `${uc.color}08`, border: `1px solid ${uc.color}20`, borderRadius: 12, padding: '12px 16px' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: uc.color, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Example</div>
                  <div style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text)', fontWeight: 500, fontStyle: 'italic' }}>&ldquo;{uc.example}&rdquo;</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div className="slabel" style={{ textAlign: 'center' }}>選ばれる理由</div>
          <div className="stitle" style={{ textAlign: 'center' }}>なぜ Meeton ai の資料提案なのか</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 44px' }}>手動運用の限界を超える、AIドリブンの資料提案。</p>
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
          <div className="stitle" style={{ textAlign: 'center' }}>最適な資料提案で、<br />リードを逃さない</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '16px auto 36px' }}>訪問者の関心に合わせた資料を自動提案。匿名訪問者からもリードを獲得し続けます。</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-cta btn-cta-lg" onClick={() => setIsDocModalOpen(true)}>資料請求</button>
            <button className="btn-ghost" onClick={() => setIsMeetingModalOpen(true)}>デモを予約 →</button>
          </div>
        </div>
      </section>

      <Footer variant="light" />

      <HubSpotModal isOpen={isDocModalOpen} onClose={() => setIsDocModalOpen(false)} utmCampaign="features-offers" />
      <HubSpotMeetingModal isOpen={isMeetingModalOpen} onClose={() => setIsMeetingModalOpen(false)} utmCampaign="features-offers" />
    </div>
  );
}
