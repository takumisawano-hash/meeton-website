'use client'

import { useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import HubSpotModal from "./HubSpotModal";
import HubSpotMeetingModal from "./HubSpotMeetingModal";
import MidPageCta from "./MidPageCta";

const css = `
:root {
  --bg:#ffffff;--surface:#f4f6fb;--surface2:#eaedfa;
  --border:#dfe3f0;--border2:#c8cedf;
  --text:#4a506e;--heading:#0f1128;--sub:#6e7494;
  --cta:#d03ea1;--cta-hover:#e555b6;--cta-glow:rgba(208,62,161,.25);--cta-light:#fdeaf5;
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

.dot-grid{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(208,62,161,.08) 1px,transparent 1px);background-size:28px 28px;pointer-events:none}
.glow{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none}

.btn{border:none;cursor:pointer;font-family:var(--fb);transition:all .25s;font-weight:700;border-radius:10px}
.btn-cta{background:linear-gradient(135deg,var(--cta),#e555b6);color:#fff;padding:12px 26px;font-size:15px;box-shadow:0 4px 16px var(--cta-glow)}
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
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:130px 48px 90px;background:linear-gradient(165deg,#fdeaf5 0%,#fff 30%,#f0ecfe 60%,#fff 100%)}
.hero-inner{max-width:1200px;width:100%;display:flex;align-items:center;gap:clamp(32px,5vw,64px);position:relative;z-index:2}
.hero-text{flex:1.2;min-width:0}
.hero-visual{flex:1;min-width:0;display:flex;justify-content:center}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,var(--cta-light),var(--accent-light));border:1px solid rgba(208,62,161,.15);padding:9px 22px;border-radius:24px;margin-bottom:28px;font-size:clamp(13px,3vw,15px);font-weight:700;color:var(--cta);backdrop-filter:blur(8px)}
.hero-badge-dot{width:7px;height:7px;border-radius:50%;background:var(--cta);animation:pulse 2s infinite}
.hero h1{font-size:clamp(32px,5vw,62px);font-weight:900;color:var(--heading);line-height:1.15;letter-spacing:-2px;margin-bottom:22px}
.hero h1 em{font-style:normal;background:linear-gradient(135deg,var(--cta),var(--accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-sub{font-size:clamp(15px,2.5vw,19px);line-height:1.8;color:var(--sub);max-width:520px;margin-bottom:36px}
.hero-ctas{display:flex;gap:14px;flex-wrap:wrap}
.hero-stats{display:flex;gap:clamp(24px,4vw,48px);margin-top:clamp(32px,5vw,48px);padding-top:clamp(24px,4vw,36px);border-top:1px solid var(--border);flex-wrap:wrap}
.stat-v{font-family:var(--fm);font-size:clamp(28px,4vw,42px);font-weight:700;color:var(--heading);background:linear-gradient(135deg,var(--heading),var(--cta));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-1px}
.stat-l{font-size:clamp(12px,1.5vw,14px);color:var(--sub);margin-top:6px;font-weight:600}

/* Library Visual */
@keyframes chatPop{0%{opacity:0;transform:translateY(16px) scale(.92)}100%{opacity:1;transform:translateY(0) scale(1)}}
@keyframes slideIn{0%{opacity:0;transform:translateX(-20px)}100%{opacity:1;transform:translateX(0)}}
@keyframes ringPulse{0%{box-shadow:0 0 0 0 rgba(208,62,161,.4)}70%{box-shadow:0 0 0 12px rgba(208,62,161,0)}100%{box-shadow:0 0 0 0 rgba(208,62,161,0)}}
@keyframes dotBlink{0%,100%{opacity:.3}50%{opacity:1}}
@keyframes badgePop{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}

.dash{width:100%;max-width:420px;background:#fff;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,.08),0 1px 3px rgba(0,0,0,.04);border:1px solid var(--border);overflow:hidden;animation:fadeUp .8s .4s cubic-bezier(.16,1,.3,1) forwards;opacity:0}
.dash-hdr{padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#fdeaf5,#f5f3ff)}

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

.vis0{background:linear-gradient(160deg,#fdeaf5,#f0f9ff)}
.vis1{background:linear-gradient(160deg,#fdeaf5,#f5f3ff)}
.vis2{background:linear-gradient(160deg,#eaf0fe,#fdeaf5)}
.vis3{background:linear-gradient(160deg,#ecfeff,#fdeaf5)}

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
.usecase-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(208,62,161,.1);border-color:transparent}

/* WHY */
.why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
.why-card{background:var(--bg);border:1px solid var(--border);border-radius:16px;padding:28px;transition:all .35s cubic-bezier(.16,1,.3,1);box-shadow:0 2px 8px rgba(0,0,0,.03);position:relative;overflow:hidden}
.why-card:hover{border-color:transparent;transform:translateY(-4px);box-shadow:0 12px 40px rgba(208,62,161,.1)}
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
.final-cta{padding:clamp(60px,10vw,100px) clamp(16px,5vw,48px) clamp(80px,12vw,120px);text-align:center;position:relative;overflow:hidden;background:linear-gradient(165deg,#fdeaf5 0%,#fff 40%,#f0ecfe 80%,#eaf0fe 100%)}
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
  { q: 'Meeton Library と通常の資料 DL ページの違いは何ですか？', a: '通常の資料 DL ページは「探す責任」がリード側にあり、検討フェーズに合った資料に到達できないことが多くあります。Meeton Library は AI が CRM 上の行動履歴・興味分野を読み解いて、最適な資料を能動的に推薦・解説。さらに資料の中身に関する質問にもその場で回答し、検討の壁を取り除きます。' },
  { q: '既存リードに対してのみ動作するのですか？', a: 'はい。Meeton Library は HubSpot / Salesforce で識別済みの既存リード（過去にコンバートしたリード）の再訪に対して起動する、ナーチャリング専用機能です。新規リード獲得用ではなく、検討フェーズが進んだリードに適切な情報提供を行い、商談機会を再発火させる設計です。' },
  { q: '資料の更新は AI が自動で学習しますか？', a: 'はい。資料を Meeton Library にアップロードまたは連携すると、AI がコンテンツを自動でインデックス化します。資料の更新・差し替えがあれば、再学習も自動で行われ、常に最新の情報をベースに推薦・解説します。' },
  { q: 'Meeton Calendar との連携はどう動きますか？', a: 'AI が資料解説対話の中で「検討再開」のシグナル（具体的な料金質問・導入時期の言及・比較検討の発言など）を検知すると、Meeton Calendar の予約 UI を会話内に直接展開します。CRM 上の担当者ルールに従って自動割り振り、ページ遷移なしで商談確定まで導きます。' },
  { q: '導入時に既存資料の整理は必要ですか？', a: '整理は必須ではありません。既存の PDF・スライド・ホワイトペーパーをそのままアップロードしていただければ、AI が内容を解析してメタデータを自動付与します。ただし、より精度の高い推薦のために、資料のターゲット業界・検討フェーズなどを軽くタグ付けすることを推奨しています。導入支援の中でサポート可能です。' },
  { q: 'Meeton Live との違いは何ですか？', a: 'Meeton Live は再訪リードへの AI SDR 対話で商談予約までを担う「会話」のプラットフォーム、Meeton Library は既存リードに対して資料を推薦・解説する「ナーチャリング」のプラットフォームです。Library は検討フェーズが進んだリードへ適切な情報を届けて検討再開を促し、検討再開を検知したタイミングで Meeton Calendar に引き渡します。' },
];

const whyData = [
  { title: '行動履歴から最適資料を AI 推薦', desc: 'CRM 上の閲覧ページ・DL 履歴・興味分野を AI が解析し、検討フェーズに合った最適な資料を能動的に提案。「資料を探す責任」をリードに負わせません。', color: '#d03ea1', iconPath: 'M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' },
  { title: 'AI がその場で資料を解説', desc: '推薦した資料の中身を AI が要約・解説。リードが資料を読まなくても要点を把握でき、章ごとの質問にもリアルタイムで回答します。', color: '#7c5cfc', iconPath: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8' },
  { title: '検討再開を検知して商談化', desc: '解説対話の中で検討再開のシグナル（料金・導入時期・比較検討）を AI が検知。Meeton Calendar の予約 UI を会話内に直接展開し、商談予約までその場で完結します。', color: '#3b6ff5', iconPath: 'M22 12h-4l-3 9L9 3l-3 9H2' },
  { title: 'ナーチャリング専用設計', desc: 'CRM 識別済みの既存リードに限定して起動。新規リードを混入させず、検討フェーズが進んだリードへの「商談機会の再発火」だけに集中します。', color: '#0891b2', iconPath: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
];

const flowSteps = [
  { num: '1', title: '既存リードが再訪', sub: 'Known lead returns', color: '#6e7494' },
  { num: '2', title: '行動履歴を AI 分析', sub: 'AI reads history', color: '#d03ea1' },
  { num: '3', title: '最適資料を推薦', sub: 'Recommend assets', color: '#e555b6' },
  { num: '4', title: 'AI が中身を解説', sub: 'AI explains', color: '#7c5cfc' },
  { num: '5', title: 'Calendar に引渡し', sub: 'Hand off to meeting', color: '#3b6ff5' },
];

const flowStepIcons = [
  <><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
  <path d="M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>,
  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>,
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>,
  <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M9 16l2 2 4-4"/></>,
];

const useCases = [
  { title: '料金ページに戻ってきた既存リード', color: '#d03ea1', desc: '半年前にホワイトペーパーを DL したリードが料金ページに再訪。AI が直近の業界事例・ROI 試算資料を即座に推薦し、料金についての質問に解説で答えます。', msg: '田中様、お帰りなさい。半年前に DL いただいた資料の最新版と、御社規模での ROI 試算事例をご用意しました。' },
  { title: '比較検討中の既存リード', color: '#7c5cfc', desc: '他社製品と比較検討フェーズに入った既存リードに、競合との機能比較資料・差別化ポイントをまとめた事例集を AI が提案。質問にも資料根拠で回答します。', msg: '比較検討の論点に合わせて、競合との機能比較表と同業他社の選定基準事例をご案内します。' },
  { title: '稟議準備フェーズの既存リード', color: '#3b6ff5', desc: '社内稟議の準備に入ったリードに、AI が稟議書テンプレート・ROI 計算ワークシート・導入事例 PDF を推薦。質問にもその場で回答し、稟議の壁を下げます。', msg: '稟議用の資料一式をご案内します。御社業界での導入後 ROI 試算もこちらでご覧いただけます。' },
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
        <div className="dot-grid" />
        <div className="glow" style={{ background: 'rgba(208,62,161,.2)', width: 600, height: 600, top: -200, right: -100 }} />
        <div className="glow" style={{ background: 'rgba(124,92,252,.1)', width: 500, height: 500, bottom: -150, left: -80 }} />
        <div className="hero-inner">
          <div className="hero-text">
            <div className="anim d1 hero-badge"><div className="hero-badge-dot" />RE-ENGAGEMENT MODULE</div>
            <h1 className="anim d2">戻ってきたリードに、<br /><em>最適な資料を AI が提案</em></h1>
            <p className="anim d3 hero-sub">過去にコンバートしたリードが再訪した瞬間、AI が行動履歴・興味分野から最適な資料を推薦・解説。検討再開のタイミングを捉えて Meeton Calendar に引き渡し、商談機会を再発火させる、既存リードのナーチャリング専用機能。</p>
            <div className="anim d4 hero-ctas">
              <button className="btn btn-cta btn-cta-lg" onClick={() => setIsMeetingModalOpen(true)}>デモを予約</button>
              <button className="btn-ghost" onClick={() => setIsDocModalOpen(true)}>資料請求 →</button>
            </div>
            <div className="anim d5 hero-stats">
              {[{ v: 'AI 推薦', l: '行動履歴ベース' }, { v: '解説対話', l: '質問にその場で回答' }, { v: '再発火', l: '商談機会を再点火' }].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}><div className="stat-v">{s.v}</div><div className="stat-l">{s.l}</div></div>
              ))}
            </div>
          </div>
          <div className="hero-visual anim d4">
            <div className="dash">
              <div className="dash-hdr">
                <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,#d03ea1,#e555b6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#fff', fontWeight: 800 }}>
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
                  <div style={{ background: '#fdeaf5', borderRadius: '12px 12px 12px 4px', padding: '10px 14px', maxWidth: '80%', fontSize: 11, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.6 }}>
                    田中様、お帰りなさい。前回 DL された資料の続編と、ご興味の章に近い事例をご用意しました
                  </div>
                </div>
                {/* Resource card 1 */}
                <div style={{ background: '#fff', border: '1px solid #d03ea120', borderRadius: 10, padding: 10, marginLeft: 30, opacity: 0, animation: 'chatPop .5s 1.0s cubic-bezier(.16,1,.3,1) forwards' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(135deg,#d03ea1,#e555b6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: '#fff', fontWeight: 800 }}>PDF</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--heading)' }}>ROI 試算実践ガイド v3</div>
                      <div style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600 }}>関連度 96% · 8 分</div>
                    </div>
                  </div>
                </div>
                {/* Resource card 2 */}
                <div style={{ background: '#fff', border: '1px solid #7c5cfc20', borderRadius: 10, padding: 10, marginLeft: 30, opacity: 0, animation: 'chatPop .5s 1.3s cubic-bezier(.16,1,.3,1) forwards' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(135deg,#7c5cfc,#9b7fff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: '#fff', fontWeight: 800 }}>事例</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--heading)' }}>同業界の導入事例 5 選</div>
                      <div style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600 }}>関連度 92% · 12 分</div>
                    </div>
                  </div>
                </div>
                {/* Visitor message */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', justifyContent: 'flex-end', opacity: 0, animation: 'chatPop .5s 1.6s cubic-bezier(.16,1,.3,1) forwards' }}>
                  <div style={{ background: 'var(--surface)', borderRadius: '12px 12px 4px 12px', padding: '10px 14px', maxWidth: '75%', fontSize: 11, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.6 }}>
                    ROI 試算の章を要約して
                  </div>
                </div>
                {/* AI explanation */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', opacity: 0, animation: 'chatPop .5s 1.9s cubic-bezier(.16,1,.3,1) forwards' }}>
                  <div style={{ width: 24, height: 24, borderRadius: 8, background: 'linear-gradient(135deg,#d03ea1,#e555b6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/></svg>
                  </div>
                  <div style={{ background: '#fdeaf5', borderRadius: '12px 12px 12px 4px', padding: '10px 14px', maxWidth: '80%', fontSize: 11, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.6 }}>
                    第3章のポイントは ROI 計算式と業界平均値です。御社規模ですと年間 2,400 万円の効果試算です
                  </div>
                </div>
              </div>
              {/* Summary bar */}
              <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#d03ea1', animation: 'pulse 1.5s infinite' }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)' }}>行動履歴に基づく推薦</span>
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--cta)' }}>検討再開検知 →</span>
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
          <div className="stitle" style={{ textAlign: 'center' }}>Meeton Library の仕組みを深掘り</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 20px' }}>AI 推薦・AI 解説・CRM 連携・Meeton Calendar 引き渡しまで、4 つのコア機能で既存リードの検討再開を捉えます。</p>
        </div>
      </section>

      {/* Feature 1: AI Recommendation */}
      <section style={{ padding: '0 clamp(16px,5vw,48px)', position: 'relative' }}>
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#d03ea110', color: '#d03ea1' }}>FEATURE 01</div>
              <div className="phase-h">AI 資料推薦 — 行動履歴から最適資料を選定</div>
              <div className="phase-desc">CRM 上の閲覧ページ・DL 履歴・メール反応・直近の興味分野を AI が解析し、検討フェーズに合った資料を能動的に推薦。「リード自身に資料を探させる」体験を、「AI が最適な資料を持ってくる」体験に変えます。</div>
              <div className="phase-features">
                {['行動履歴・閲覧ページから興味領域を AI 推定', '検討フェーズ（情報収集 / 比較 / 稟議）に合わせた推薦', '関連度スコアで複数候補をランキング', '推薦理由を AI が会話内で説明'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#d03ea1' }} />{feat}</div>
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
                    { title: 'ROI 試算実践ガイド v3', score: '96%', tag: '料金検討フェーズ', icon: 'PDF', bg: '#fdeaf5', border: '#d03ea1' },
                    { title: '同業界導入事例 5 選', score: '92%', tag: '比較検討フェーズ', icon: '事例', bg: '#f0ecfe', border: '#7c5cfc' },
                    { title: '稟議書テンプレート', score: '88%', tag: '社内稟議フェーズ', icon: 'DOC', bg: '#eaf0fe', border: '#3b6ff5' },
                  ].map((item, i) => (
                    <div key={i} style={{ background: '#fff', border: `1px solid ${item.border}20`, borderRadius: 10, padding: 10, marginBottom: 8, opacity: 0, animation: `slideIn .5s ${.4 + i * .3}s cubic-bezier(.16,1,.3,1) forwards`, display: 'flex', alignItems: 'center', gap: 10 }}>
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
              <div className="phase-tag" style={{ background: '#7c5cfc10', color: '#7c5cfc' }}>FEATURE 02</div>
              <div className="phase-h">AI 解説対話 — 資料の中身を AI がその場で説明</div>
              <div className="phase-desc">推薦した資料の中身を、AI が要約・解説。リードが資料全文を読まなくても要点を把握でき、「ROI 計算式の章だけ要約して」「他社との違いは？」といった章単位の質問にもリアルタイムで回答します。</div>
              <div className="phase-features">
                {['資料全文を AI が要約・章単位で解説', '質問に資料の根拠を引用して回答', '複数資料を横断した要点抽出', 'リードの理解度に合わせた説明トーン調整'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#7c5cfc' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis1">
                <div style={{ padding: 16 }}>
                  {/* User question */}
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 10, opacity: 0, animation: 'chatPop .5s .3s cubic-bezier(.16,1,.3,1) forwards', justifyContent: 'flex-end' }}>
                    <div style={{ background: 'var(--surface)', borderRadius: '10px 10px 4px 10px', padding: '8px 12px', fontSize: 10, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.5, maxWidth: '75%' }}>
                      ROI 計算の章を要約して
                    </div>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 9, fontWeight: 800, color: 'var(--heading)' }}>U</div>
                  </div>
                  {/* AI explanation */}
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 10, opacity: 0, animation: 'chatPop .5s .7s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg,#7c5cfc,#9b7fff)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/></svg>
                    </div>
                    <div style={{ background: '#f0ecfe', borderRadius: '10px 10px 10px 4px', padding: '8px 12px', fontSize: 10, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.5 }}>
                      第3章のポイントは ROI 計算式と業界平均値です。御社規模ですと年間 2,400 万円の効果試算です
                    </div>
                  </div>
                  {/* Citation card */}
                  <div style={{ background: '#fff', border: '1px solid #7c5cfc20', borderRadius: 10, padding: 10, marginLeft: 30, opacity: 0, animation: 'chatPop .5s 1.1s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <span style={{ fontSize: 9, fontWeight: 700, color: '#7c5cfc' }}>📎 引用元</span>
                    </div>
                    <div style={{ fontSize: 9, fontWeight: 600, color: 'var(--sub)', lineHeight: 1.5 }}>
                      ROI 試算実践ガイド v3 · 第 3 章「業界別 ROI 計算式」(p.12-15)
                    </div>
                  </div>
                  {/* Follow up */}
                  <div style={{ display: 'flex', gap: 6, marginTop: 10, marginLeft: 30, flexWrap: 'wrap', opacity: 0, animation: 'chatPop .5s 1.5s cubic-bezier(.16,1,.3,1) forwards' }}>
                    {['他社事例は？', '導入工数は？', '料金詳細を見る'].map((q, i) => (
                      <span key={i} style={{ fontSize: 9, fontWeight: 700, color: '#7c5cfc', background: '#f0ecfe', border: '1px solid #7c5cfc30', padding: '4px 10px', borderRadius: 12 }}>{q}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Feature 3: CRM Integration */}
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#0891b210', color: '#0891b2' }}>FEATURE 03</div>
              <div className="phase-h">CRM 連携 — 識別済みリードのみに起動</div>
              <div className="phase-desc">HubSpot / Salesforce で識別済みの既存リード（過去にコンバートしたリード）の再訪に対してのみ起動。CRM 上の会社情報・直近の活動・営業担当のメモまで全文脈を引き継ぎ、検討フェーズに合った推薦を行います。</div>
              <div className="phase-features">
                {['HubSpot / Salesforce ネイティブ連携', '識別済み既存リードの再訪を即時検知', 'CRM 上のステータス・直近活動を文脈反映', '対話で得た情報を CRM に自動書き戻し'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#0891b2' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis2">
                <div style={{ padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, animation: 'chatPop .4s .2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#0891b2', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)' }}>CRM 文脈で推薦精度を向上</span>
                  </div>
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 14, opacity: 0, animation: 'chatPop .5s .4s cubic-bezier(.16,1,.3,1) forwards' }}>
                    {[
                      { label: 'リード', value: '田中 太郎 (識別済)', color: '#12a37d' },
                      { label: '会社規模', value: '従業員 500-1000', color: '#3b6ff5' },
                      { label: '初回コンバート', value: '6 ヶ月前', color: '#7c5cfc' },
                      { label: '直近活動', value: '料金ページ 3 回閲覧', color: '#d03ea1' },
                      { label: '検討フェーズ', value: '比較検討中 (推定)', color: '#0891b2' },
                    ].map((field, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 0', borderBottom: i < 4 ? '1px solid var(--border)' : 'none', opacity: 0, animation: `slideIn .5s ${.6 + i * .2}s cubic-bezier(.16,1,.3,1) forwards` }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)' }}>{field.label}</span>
                        <span style={{ fontSize: 10, fontWeight: 700, color: field.color }}>{field.value}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12, opacity: 0, animation: 'slideIn .5s 1.6s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#0891b2', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#0891b2' }}>HubSpot / Salesforce 同期中...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Feature 4: Calendar Handoff */}
          <div className="phase-row reverse">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#3b6ff510', color: '#3b6ff5' }}>FEATURE 04</div>
              <div className="phase-h">Meeton Calendar 連携 — 検討再開を捉えて商談化</div>
              <div className="phase-desc">資料解説対話の中で AI が「検討再開のシグナル」（具体的な料金質問・導入時期の言及・比較検討の発言など）を検知すると、Meeton Calendar の予約 UI を会話内に直接展開。商談機会を逃さず、その場で予約まで完結します。</div>
              <div className="phase-features">
                {['検討再開シグナルを AI が自動検知', 'Meeton Calendar の予約 UI を会話内展開', 'CRM の担当者ルールで自動割り振り', 'ページ遷移なしで商談確定'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#3b6ff5' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis3">
                <div style={{ padding: 16 }}>
                  {/* Signal detected */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, opacity: 0, animation: 'slideIn .5s .2s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <span style={{ fontSize: 12 }}>⚡</span>
                    <span style={{ fontSize: 10, fontWeight: 800, color: '#d03ea1' }}>検討再開シグナル検知: 料金詳細への質問</span>
                  </div>
                  {/* AI message */}
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 10, opacity: 0, animation: 'chatPop .5s .5s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg,#3b6ff5,#5b8aff)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <div style={{ background: '#eaf0fe', borderRadius: '10px 10px 10px 4px', padding: '8px 12px', fontSize: 10, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.5 }}>
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
                    <div style={{ background: '#fdeaf5', border: '1px solid #d03ea130', borderRadius: 8, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6, animation: 'ringPulse 2s infinite' }}>
                      <span style={{ fontSize: 12 }}>✓</span>
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
      <section className="section" style={{ position: 'relative' }}>
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div className="slabel" style={{ textAlign: 'center' }}>USE CASES</div>
          <div className="stitle" style={{ textAlign: 'center' }}>Meeton Library の活用シーン</div>
          <div className="usecase-grid">
            {useCases.map((uc, i) => (
              <div className="usecase-card" key={i}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: uc.color, borderRadius: '20px 20px 0 0' }} />
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${uc.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={uc.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  </svg>
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--heading)', marginBottom: 10 }}>{uc.title}</div>
                <div style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--sub)', marginBottom: 16 }}>{uc.desc}</div>
                <div style={{ background: `${uc.color}08`, border: `1px solid ${uc.color}20`, borderRadius: 10, padding: '10px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: uc.color }} />
                    <span style={{ fontSize: 9, fontWeight: 700, color: uc.color }}>AI 推薦・解説例</span>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.5, fontStyle: 'italic' }}>
                    &ldquo;{uc.msg}&rdquo;
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — after USE CASES */}
      <MidPageCta
        eyebrow="See it in action"
        heading="既存リードへの AI 資料推薦と検討再開検知の精度を、御社の業界に合わせたデモで 15 分で体験"
        ctaLabel="デモを予約する"
        variant="demo"
        onClick={() => setIsMeetingModalOpen(true)}
      />

      {/* WHY */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div className="slabel" style={{ textAlign: 'center' }}>選ばれる理由</div>
          <div className="stitle" style={{ textAlign: 'center' }}>なぜ Meeton Library なのか</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 44px' }}>静的な資料 DL ページではなく、既存リードの検討再開を捉える AI ナーチャリングプラットフォーム。</p>
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

      {/* CTA — after WHY */}
      <MidPageCta
        eyebrow="For internal review"
        heading="Meeton Library の仕様・推薦アルゴリズム・CRM 連携・料金プランをまとめた資料を社内検討用にお送りします"
        ctaLabel="資料を請求する"
        variant="doc"
        onClick={() => setIsDocModalOpen(true)}
      />

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
        <div className="glow" style={{ background: 'rgba(208,62,161,.15)', width: 500, height: 500, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div className="final-cta-inner">
          <div className="slabel">今すぐ始める</div>
          <div className="stitle" style={{ textAlign: 'center' }}>Meeton Library で、<br />既存リードの商談機会を再発火</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '16px auto 36px' }}>AI が行動履歴から最適資料を推薦・解説。検討再開を捉えて Meeton Calendar に引き渡し、商談機会を再点火させます。</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-cta btn-cta-lg" onClick={() => setIsMeetingModalOpen(true)}>デモを予約</button>
            <button className="btn-ghost" onClick={() => setIsDocModalOpen(true)}>資料請求 →</button>
          </div>
        </div>
      </section>

      <Footer variant="light" />

      <HubSpotModal isOpen={isDocModalOpen} onClose={() => setIsDocModalOpen(false)} utmCampaign="features-ai-library" />
      <HubSpotMeetingModal isOpen={isMeetingModalOpen} onClose={() => setIsMeetingModalOpen(false)} utmCampaign="features-ai-library" />
    </div>
  );
}
