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
  --cta:#12a37d;--cta-hover:#0fc19a;--cta-glow:rgba(18,163,125,.25);--cta-light:#e5f8f2;
  --accent:#7c5cfc;--accent-light:#f0ecfe;--accent-glow:rgba(124,92,252,.2);
  --blue:#3b6ff5;--blue-light:#eaf0fe;
  --cyan:#0891b2;--pink:#d03ea1;--red:#e0475b;
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
.btn-cta{background:linear-gradient(135deg,var(--cta),#0fc19a);color:#fff;padding:12px 26px;font-size:15px;box-shadow:0 4px 16px var(--cta-glow)}
.btn-cta:hover{transform:translateY(-2px);box-shadow:0 8px 28px var(--cta-glow)}
.btn-cta-lg{padding:18px 40px;font-size:18px;box-shadow:0 6px 28px var(--cta-glow)}
.btn-ghost{background:transparent;color:var(--heading);border:2px solid var(--border2);padding:16px 38px;border-radius:10px;font-size:18px;font-weight:700;cursor:pointer;font-family:var(--fb);transition:all .25s}
.btn-ghost:hover{border-color:var(--cta);color:var(--cta);background:var(--cta-light)}

.slabel{font-family:var(--fm);font-size:12px;font-weight:700;color:var(--accent);letter-spacing:3px;text-transform:uppercase;margin-bottom:16px}
.section{padding:clamp(60px,10vw,100px) clamp(16px,5vw,48px)}
.section-inner{max-width:1140px;margin:0 auto}
.stitle{font-size:clamp(28px,5vw,48px);font-weight:900;color:var(--heading);line-height:1.2;letter-spacing:-.5px;margin-bottom:18px}
.ssub{font-size:clamp(15px,2.5vw,19px);line-height:1.85;color:var(--sub);max-width:660px}

/* HERO */
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:130px 48px 90px;background:linear-gradient(165deg,#edfcf7 0%,#fff 30%,#f3f0ff 60%,#fff 100%)}
.hero-content{max-width:860px;text-align:center;position:relative;z-index:2}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,var(--cta-light),var(--accent-light));border:1px solid rgba(18,163,125,.15);padding:9px 22px;border-radius:24px;margin-bottom:36px;font-size:clamp(13px,3vw,15px);font-weight:700;color:var(--cta);backdrop-filter:blur(8px)}
.hero-badge-dot{width:7px;height:7px;border-radius:50%;background:var(--cta);animation:pulse 2s infinite}
.hero h1{font-size:clamp(32px,7vw,76px);font-weight:900;color:var(--heading);line-height:1.15;letter-spacing:-2.5px;margin-bottom:28px}
.hero h1 em{font-style:normal;background:linear-gradient(135deg,var(--cta),var(--blue));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-sub{font-size:clamp(16px,3vw,22px);line-height:1.8;color:var(--sub);max-width:640px;margin:0 auto 48px}
.hero-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.hero-stats{display:flex;justify-content:center;gap:clamp(32px,8vw,72px);margin-top:clamp(40px,8vw,72px);padding-top:clamp(32px,6vw,48px);border-top:1px solid var(--border);flex-wrap:wrap}
.stat-v{font-family:var(--fm);font-size:clamp(36px,6vw,52px);font-weight:700;color:var(--heading);background:linear-gradient(135deg,var(--heading),var(--accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-1px}
.stat-l{font-size:clamp(13px,2vw,15px);color:var(--sub);margin-top:8px;font-weight:600}

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
@keyframes emailPulse{0%,100%{box-shadow:0 0 0 0 rgba(18,163,125,.3)}50%{box-shadow:0 0 0 10px rgba(18,163,125,0)}}
@keyframes nodeGrow{0%{transform:scale(0);opacity:0}100%{transform:scale(1);opacity:1}}
@keyframes slideDown{0%{opacity:0;transform:translateY(-16px)}100%{opacity:1;transform:translateY(0)}}
@keyframes scanLine{0%{top:20%}50%{top:70%}100%{top:20%}}
@keyframes ripple{0%{box-shadow:0 0 0 0 rgba(18,163,125,.4)}100%{box-shadow:0 0 0 20px rgba(18,163,125,0)}}
@keyframes flowPulse{0%,100%{opacity:.3}50%{opacity:1}}
@keyframes typeWriter{from{width:0}to{width:100%}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes envelopeOpen{0%{transform:rotateX(0deg)}50%{transform:rotateX(-180deg)}100%{transform:rotateX(-180deg)}}
@keyframes statusDot{0%,100%{transform:scale(1)}50%{transform:scale(1.4)}}

/* WHY */
.why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.why-card{background:var(--bg);border:1px solid var(--border);border-radius:16px;padding:28px;transition:all .35s cubic-bezier(.16,1,.3,1);box-shadow:0 2px 8px rgba(0,0,0,.03);position:relative;overflow:hidden}
.why-card:hover{border-color:transparent;transform:translateY(-4px);box-shadow:0 12px 40px rgba(18,163,125,.1)}
.why-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--cta),var(--accent));opacity:0;transition:opacity .3s}
.why-card:hover::before{opacity:1}
.why-icon{font-size:32px;margin-bottom:16px}
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
.final-cta{padding:clamp(60px,10vw,100px) clamp(16px,5vw,48px) clamp(80px,12vw,120px);text-align:center;position:relative;overflow:hidden;background:linear-gradient(165deg,#edfcf7 0%,#fff 40%,#f3f0ff 80%,#eaf0fe 100%)}
.final-cta-inner{max-width:620px;margin:0 auto;position:relative;z-index:2}

/* FLOW */
.flow-container{display:flex;align-items:center;justify-content:center;gap:0;flex-wrap:wrap;padding:20px 0}
.flow-node{background:var(--bg);border:1px solid var(--border);border-radius:14px;padding:18px 22px;text-align:center;transition:all .3s;box-shadow:0 2px 8px rgba(0,0,0,.03);min-width:140px}
.flow-node:hover{transform:translateY(-3px);box-shadow:0 8px 28px rgba(0,0,0,.06)}
.flow-arrow{font-family:var(--fm);font-size:20px;color:var(--border2);padding:0 12px;display:flex;align-items:center}

/* RESPONSIVE */
@media(max-width:1024px){
  .phase-row{flex-direction:column;gap:40px}
  .phase-row.reverse{flex-direction:column}
  .why-grid{grid-template-columns:repeat(2,1fr)}
  .flow-container{gap:12px}
  .flow-arrow{transform:rotate(90deg);padding:8px 0}
}
@media(max-width:768px){
  .hero{padding:90px 20px 50px;min-height:auto}
  .hero-badge{padding:7px 16px;margin-bottom:24px}
  .hero-ctas{flex-direction:column;align-items:stretch;width:100%;max-width:300px;margin:0 auto}
  .hero-stats{flex-direction:column;gap:20px;align-items:center}
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
  .flow-container{flex-direction:column;gap:0}
  .flow-arrow{transform:rotate(90deg);padding:8px 0}
}
@media(max-width:480px){
  .hero{padding:80px 16px 40px}
  .pvis{aspect-ratio:1/1.4;min-height:400px}
  .pvis>div{transform:scale(0.78);transform-origin:top center}
}
`;

const faqData = [
  {q:"AIメールはどのようにパーソナライズされますか？",a:"AIチャットでの会話内容、閲覧したページ、ダウンロードした資料、リードスコアなどを基に、一人ひとりに最適なメール内容を自動生成します。業界に合ったケーススタディやROIデータの選定もAIが行います。"},
  {q:"カレンダーリンクはどこに埋め込めますか？",a:"メール本文、PDF資料、提案書、Webページなど、URLを配置できるあらゆる場所に埋め込めます。リンクをクリックすると、事前認定済みの情報が引き継がれた状態でカレンダー予約画面が表示されます。"},
  {q:"カレンダーQRはどのような場面で使えますか？",a:"展示会・セミナーのブース、印刷資料、名刺、ポスター、チラシなど、オフラインのあらゆる接点で活用できます。スマートフォンでQRコードを読み取るだけで、即座に商談予約画面にアクセスできます。"},
  {q:"サイト外チャネルの効果はどのように測定できますか？",a:"ダッシュボードでメール開封率、クリック率、カレンダーリンク経由の予約数、QR経由のアクセス数をリアルタイムで確認できます。各チャネルのROIを可視化し、最適化に活用できます。"},
  {q:"メールの配信タイミングはどのように決まりますか？",a:"リードの行動シグナル（料金ページ再訪、資料の再ダウンロードなど）をトリガーにAIが最適なタイミングを判断します。また、リードステージ（Soft Lead → Hard Lead → Qualified）に応じた段階的なシーケンスも自動で実行されます。"},
];

export default function OffsitePageClient(){
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  return(
    <div>
      <style dangerouslySetInnerHTML={{__html:css}}/>

      <Nav variant="light" />

      {/* HERO */}
      <section className="hero">
        <div className="dot-grid"/>
        <div className="glow" style={{background:"rgba(18,163,125,.2)",width:600,height:600,top:-200,right:-100}}/>
        <div className="glow" style={{background:"rgba(124,92,252,.15)",width:500,height:500,bottom:-150,left:-80}}/>
        <div className="glow" style={{background:"rgba(59,111,245,.1)",width:400,height:400,top:"40%",left:"50%"}}/>
        <div className="hero-content">
          <div className="anim d1 hero-badge"><div className="hero-badge-dot"/>OUTREACH CHANNELS</div>
          <h1 className="anim d2">サイトの外でも<br/><em>リードを逃さない</em></h1>
          <p className="anim d3 hero-sub">AIメール、カレンダーリンク、カレンダーQRの3チャネルで、Webサイトの外でもリードを育成し、商談予約を獲得します。オンラインもオフラインも、すべてAIが自動でつなぎます。</p>
          <div className="anim d4 hero-ctas">
            <button className="btn btn-cta btn-cta-lg" onClick={() => setIsDocModalOpen(true)}>資料請求</button>
            <button className="btn-ghost" onClick={() => setIsMeetingModalOpen(true)}>デモを予約 →</button>
          </div>
          <div className="anim d5 hero-stats">
            {[{v:"2x",l:"メール開封率"},{v:"40%",l:"予約率向上"},{v:"3",l:"チャネル"}].map((s,i)=>(
              <div key={i} style={{textAlign:"center"}}><div className="stat-v">{s.v}</div><div className="stat-l">{s.l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-CHANNEL OVERVIEW */}
      <section className="section" style={{position:"relative"}}>
        <div className="dot-grid" style={{opacity:.3}}/>
        <div className="section-inner" style={{position:"relative",zIndex:2}}>
          <div className="slabel" style={{textAlign:"center"}}>3つのチャネル</div>
          <div className="stitle" style={{textAlign:"center"}}>サイトの外にも、商談の入り口を</div>
          <p className="ssub" style={{textAlign:"center",margin:"0 auto 44px"}}>メール、リンク、QRコード。3つのチャネルがあらゆる接点から商談を創出します。</p>
          <div className="why-grid">
            {[
              {icon:"✉️",title:"AIメール",sub:"パーソナライズ育成メール",desc:"AIチャットでの会話内容やリードスコアを基に、一人ひとりに最適なメールを自動生成・送信。行動シグナルで最適なタイミングを判断します。"},
              {icon:"🔗",title:"カレンダーリンク",sub:"どこでも商談予約",desc:"メール、PDF、提案書などにカレンダーリンクを埋め込み。事前認定済みの情報を引き継いだまま、ワンクリックで商談予約へ。"},
              {icon:"📱",title:"カレンダーQR",sub:"オフラインから商談へ",desc:"展示会、名刺、印刷資料にQRコードを配置。スマートフォンで読み取るだけで、オフラインの接点を商談予約に変換します。"},
            ].map((w,i)=>(
              <div className="why-card" key={i}>
                <div className="why-icon">{w.icon}</div>
                <div style={{fontSize:11,fontWeight:700,color:"var(--sub)",letterSpacing:1,textTransform:"uppercase",marginBottom:6,fontFamily:"var(--fm)"}}>{w.sub}</div>
                <div className="why-title">{w.title}</div>
                <div className="why-desc">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEEP DIVE SECTIONS */}
      <section style={{padding:"0 clamp(16px,5vw,48px)",position:"relative"}} id="features">
        <div className="dot-grid" style={{opacity:.3}}/>
        <div className="section-inner" style={{position:"relative",zIndex:2}}>

          {/* CHANNEL 01: AIメール */}
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{background:"#3b6ff510",color:"#3b6ff5"}}>CHANNEL 01 — AIメール</div>
              <div className="phase-h">AIが最適なタイミングでパーソナライズメールを送信</div>
              <div className="phase-desc">チャットでの会話内容、閲覧ページ、ダウンロード履歴を基に、一人ひとりに最適なメール内容を自動生成。行動シグナルをトリガーに、最も効果的なタイミングで自動送信します。Soft Lead から Hard Lead への育成を完全自動化。</div>
              <div className="phase-features">
                {["チャット内容に基づくパーソナライズ","行動シグナルによる送信トリガー","Soft Lead→Hard Lead自動育成","料金ページ再訪でメール前倒し"].map((f,i)=>(
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{background:"#3b6ff5"}}/>{f}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              {/* Email Sequence Timeline Visual */}
              <div className="pvis" style={{background:"linear-gradient(160deg,#eef2ff,#f8f9ff)"}}>
                {/* Header */}
                <div style={{position:"absolute",top:16,left:20,right:20,display:"flex",alignItems:"center",justifyContent:"space-between",animation:"nodeGrow .5s .2s cubic-bezier(.16,1,.3,1) forwards",opacity:0,transform:"scale(0)"}}>
                  <span style={{fontSize:10,fontWeight:800,color:"#3b6ff5",fontFamily:"var(--fm)",letterSpacing:1}}>AI EMAIL SEQUENCE</span>
                  <span style={{fontSize:9,fontWeight:700,color:"var(--sub)",background:"var(--surface)",padding:"3px 8px",borderRadius:6}}>自動配信中</span>
                </div>

                {/* Timeline line */}
                <div style={{position:"absolute",top:50,left:34,width:2,bottom:24,background:"linear-gradient(180deg,#3b6ff5,#7c5cfc)",borderRadius:1,opacity:.2}}/>

                {/* Email 1 - Delivered */}
                <div style={{position:"absolute",top:48,left:20,right:20,animation:"slideIn .5s .4s cubic-bezier(.16,1,.3,1) forwards",opacity:0}}>
                  <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                    <div style={{width:28,height:28,borderRadius:8,background:"#12a37d",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"#fff",fontWeight:800,flexShrink:0}}>✓</div>
                    <div style={{flex:1,background:"#fff",border:"1px solid var(--border)",borderRadius:12,padding:"12px 14px",boxShadow:"0 2px 8px rgba(0,0,0,.03)"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                        <span style={{fontSize:11,fontWeight:800,color:"var(--heading)"}}>導入ガイドのご送付</span>
                        <span style={{fontSize:9,fontWeight:600,color:"#12a37d",background:"#e5f8f2",padding:"2px 8px",borderRadius:4}}>開封済み</span>
                      </div>
                      <div style={{fontSize:10,color:"var(--sub)",lineHeight:1.5}}>田中様のご関心に合わせた導入ガイドをお送りします...</div>
                      <div style={{fontSize:9,color:"var(--border2)",marginTop:6,fontFamily:"var(--fm)"}}>Day 1 · 10:00</div>
                    </div>
                  </div>
                </div>

                {/* Email 2 - Opened */}
                <div style={{position:"absolute",top:148,left:20,right:20,animation:"slideIn .5s .8s cubic-bezier(.16,1,.3,1) forwards",opacity:0}}>
                  <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                    <div style={{width:28,height:28,borderRadius:8,background:"#3b6ff5",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"#fff",fontWeight:800,flexShrink:0}}>◎</div>
                    <div style={{flex:1,background:"#fff",border:"1px solid #bcc8f5",borderRadius:12,padding:"12px 14px",boxShadow:"0 2px 12px rgba(59,111,245,.08)"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                        <span style={{fontSize:11,fontWeight:800,color:"var(--heading)"}}>業界別ROIデータ</span>
                        <span style={{fontSize:9,fontWeight:600,color:"#3b6ff5",background:"#eaf0fe",padding:"2px 8px",borderRadius:4}}>クリック済み</span>
                      </div>
                      <div style={{fontSize:10,color:"var(--sub)",lineHeight:1.5}}>SaaS業界での導入効果をまとめました...</div>
                      <div style={{fontSize:9,color:"var(--border2)",marginTop:6,fontFamily:"var(--fm)"}}>Day 3 · 14:30</div>
                    </div>
                  </div>
                </div>

                {/* Email 3 - Scheduled */}
                <div style={{position:"absolute",top:248,left:20,right:20,animation:"slideIn .5s 1.2s cubic-bezier(.16,1,.3,1) forwards",opacity:0}}>
                  <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                    <div style={{width:28,height:28,borderRadius:8,background:"var(--surface)",border:"2px dashed var(--border2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"var(--border2)",fontWeight:800,flexShrink:0,animation:"statusDot 2s infinite"}}>◯</div>
                    <div style={{flex:1,background:"#fff",border:"1px dashed var(--border)",borderRadius:12,padding:"12px 14px",opacity:.7}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                        <span style={{fontSize:11,fontWeight:800,color:"var(--heading)"}}>商談予約のご案内</span>
                        <span style={{fontSize:9,fontWeight:600,color:"var(--sub)",background:"var(--surface)",padding:"2px 8px",borderRadius:4}}>配信予定</span>
                      </div>
                      <div style={{fontSize:10,color:"var(--sub)",lineHeight:1.5}}>カレンダーリンク付きで商談予約を促進...</div>
                      <div style={{fontSize:9,color:"var(--border2)",marginTop:6,fontFamily:"var(--fm)"}}>Day 5 · トリガー待ち</div>
                    </div>
                  </div>
                </div>

                {/* Signal indicator */}
                <div style={{position:"absolute",bottom:14,left:20,right:20,background:"#fff",border:"1px solid var(--border)",borderRadius:10,padding:"8px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",animation:"slideIn .6s 1.6s cubic-bezier(.16,1,.3,1) forwards",opacity:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <span style={{fontSize:12}}>⚡</span>
                    <span style={{fontSize:10,fontWeight:700,color:"var(--heading)"}}>料金ページ再訪を検知</span>
                  </div>
                  <span style={{fontSize:9,fontWeight:600,color:"#3b6ff5"}}>→ メール前倒し</span>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider"/>

          {/* CHANNEL 02: カレンダーリンク */}
          <div className="phase-row reverse">
            <div className="phase-text">
              <div className="phase-tag" style={{background:"#12a37d10",color:"#12a37d"}}>CHANNEL 02 — カレンダーリンク</div>
              <div className="phase-h">メール・PDF・提案書から直接商談予約</div>
              <div className="phase-desc">メール、PDF資料、提案書など、URLを配置できるあらゆる場所にカレンダーリンクを埋め込み。リンクをクリックすると、事前認定済みの情報が引き継がれた状態で商談予約画面が表示されます。摩擦のない商談化を実現。</div>
              <div className="phase-features">
                {["メール内に商談予約リンク","PDF・提案書に埋め込み","事前認定情報の引き継ぎ","主要カレンダーツール連携"].map((f,i)=>(
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{background:"#12a37d"}}/>{f}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              {/* Email with Calendar Link Visual */}
              <div className="pvis" style={{background:"linear-gradient(160deg,#f0fdfa,#f0fdf9)"}}>
                {/* Email template */}
                <div style={{position:"absolute",top:16,left:20,right:20,animation:"nodeGrow .5s .3s cubic-bezier(.16,1,.3,1) forwards",opacity:0,transform:"scale(0)"}}>
                  <div style={{background:"#fff",border:"1px solid var(--border)",borderRadius:14,padding:"16px 18px",boxShadow:"0 4px 16px rgba(0,0,0,.04)"}}>
                    {/* Email header */}
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12,paddingBottom:10,borderBottom:"1px solid var(--border)"}}>
                      <div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,var(--cta),#0fc19a)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"#fff",fontWeight:800}}>M</div>
                      <div>
                        <div style={{fontSize:10,fontWeight:800,color:"var(--heading)"}}>Meeton AI</div>
                        <div style={{fontSize:9,color:"var(--sub)"}}>noreply@dynameet.ai</div>
                      </div>
                    </div>
                    {/* Email body */}
                    <div style={{fontSize:11,fontWeight:700,color:"var(--heading)",marginBottom:8}}>田中様</div>
                    <div style={{fontSize:10,color:"var(--sub)",lineHeight:1.6,marginBottom:14}}>先日はSaaS導入ガイドをご覧いただきありがとうございます。貴社の課題に合わせたデモをご用意しました。</div>
                    {/* CTA Button */}
                    <div style={{textAlign:"center",marginBottom:10}}>
                      <div style={{display:"inline-block",background:"linear-gradient(135deg,#12a37d,#0fc19a)",color:"#fff",padding:"10px 28px",borderRadius:8,fontSize:12,fontWeight:800,boxShadow:"0 4px 16px rgba(18,163,125,.3)",animation:"emailPulse 2s infinite",cursor:"default"}}>
                        📅 30分のデモを予約する
                      </div>
                    </div>
                    <div style={{fontSize:9,color:"var(--border2)",textAlign:"center"}}>ワンクリックでカレンダーに移動</div>
                  </div>
                </div>

                {/* Arrow connection */}
                <div style={{position:"absolute",top:"58%",left:"50%",transform:"translateX(-50%)",animation:"slideIn .4s 1s cubic-bezier(.16,1,.3,1) forwards",opacity:0}}>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                    <div style={{width:2,height:16,background:"var(--cta)",borderRadius:1}}/>
                    <div style={{width:0,height:0,borderLeft:"5px solid transparent",borderRight:"5px solid transparent",borderTop:"6px solid var(--cta)"}}/>
                  </div>
                </div>

                {/* Calendar booking widget */}
                <div style={{position:"absolute",bottom:14,left:20,right:20,animation:"nodeGrow .5s 1.2s cubic-bezier(.16,1,.3,1) forwards",opacity:0,transform:"scale(0)"}}>
                  <div style={{background:"#fff",border:"1px solid #b8e6d8",borderRadius:12,padding:"12px 14px",boxShadow:"0 4px 16px rgba(18,163,125,.08)"}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
                      <span style={{fontSize:10,fontWeight:800,color:"var(--heading)"}}>📅 日程を選択</span>
                      <span style={{fontSize:9,fontWeight:600,color:"var(--cta)",background:"var(--cta-light)",padding:"2px 8px",borderRadius:4}}>認定情報引き継ぎ済み</span>
                    </div>
                    <div style={{display:"flex",gap:6}}>
                      {["10:00","14:00","16:00"].map((t,i)=>(
                        <div key={i} style={{flex:1,background:i===1?"var(--cta)":"var(--surface)",color:i===1?"#fff":"var(--heading)",borderRadius:8,padding:"8px 6px",textAlign:"center",fontSize:10,fontWeight:700,border:i===1?"none":"1px solid var(--border)",transition:"all .2s"}}>{t}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider"/>

          {/* CHANNEL 03: カレンダーQR */}
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{background:"#7c5cfc10",color:"#7c5cfc"}}>CHANNEL 03 — カレンダーQR</div>
              <div className="phase-h">名刺・展示会・印刷物から即座に商談予約</div>
              <div className="phase-desc">名刺、展示会ブース、チラシ、パンフレットなど、オフラインのあらゆる接点にQRコードを配置。スマートフォンで読み取るだけで、即座に商談予約画面にアクセス。オフラインの出会いを確実に商談化します。</div>
              <div className="phase-features">
                {["イベントブースで即予約","名刺からの商談化","印刷資料・チラシ対応","スマホから3タップで完了"].map((f,i)=>(
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{background:"#7c5cfc"}}/>{f}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              {/* QR Code + Smartphone Visual */}
              <div className="pvis" style={{background:"linear-gradient(160deg,#f3f0ff,#f8f0ff)"}}>
                {/* QR Code */}
                <div style={{position:"absolute",top:20,left:"50%",transform:"translateX(-50%)",animation:"nodeGrow .5s .3s cubic-bezier(.16,1,.3,1) forwards",opacity:0}}>
                  <div style={{background:"#fff",borderRadius:16,padding:16,boxShadow:"0 4px 20px rgba(124,92,252,.1)",border:"1px solid #d8d0f5",textAlign:"center"}}>
                    {/* QR Pattern */}
                    <div style={{width:100,height:100,position:"relative",margin:"0 auto"}}>
                      {/* QR grid pattern */}
                      {[...Array(10)].map((_,row)=>(
                        <div key={row} style={{display:"flex",gap:0}}>
                          {[...Array(10)].map((_,col)=>{
                            const isCorner = (row<3&&col<3)||(row<3&&col>6)||(row>6&&col<3);
                            const isRandom = !isCorner && Math.sin(row*7+col*13)>0;
                            return <div key={col} style={{width:10,height:10,background:isCorner||isRandom?"#7c5cfc":"transparent",borderRadius:isCorner?0:1}}/>;
                          })}
                        </div>
                      ))}
                      {/* Corner markers */}
                      <div style={{position:"absolute",top:0,left:0,width:30,height:30,border:"3px solid #7c5cfc",borderRadius:4}}/>
                      <div style={{position:"absolute",top:0,right:0,width:30,height:30,border:"3px solid #7c5cfc",borderRadius:4}}/>
                      <div style={{position:"absolute",bottom:0,left:0,width:30,height:30,border:"3px solid #7c5cfc",borderRadius:4}}/>
                      {/* Center logo */}
                      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:22,height:22,borderRadius:5,background:"linear-gradient(135deg,#7c5cfc,#b49dff)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#fff",fontWeight:900}}>M</div>
                    </div>
                    <div style={{fontSize:9,fontWeight:700,color:"#7c5cfc",marginTop:8,fontFamily:"var(--fm)"}}>SCAN TO BOOK</div>
                  </div>
                </div>

                {/* Scan line animation */}
                <div style={{position:"absolute",top:"20%",left:"calc(50% - 68px)",width:136,height:2,background:"linear-gradient(90deg,transparent,#7c5cfc,transparent)",animation:"scanLine 3s ease-in-out infinite",opacity:.6,borderRadius:1}}/>

                {/* Smartphone */}
                <div style={{position:"absolute",bottom:14,right:24,animation:"nodeGrow .5s .9s cubic-bezier(.16,1,.3,1) forwards",opacity:0,transform:"scale(0)"}}>
                  <div style={{width:120,height:180,background:"#1a1a2e",borderRadius:18,padding:"8px 6px",boxShadow:"0 8px 32px rgba(0,0,0,.15)",position:"relative"}}>
                    {/* Notch */}
                    <div style={{width:40,height:4,background:"#2a2a4e",borderRadius:2,margin:"0 auto 6px"}}/>
                    {/* Screen */}
                    <div style={{background:"#fff",borderRadius:12,height:"calc(100% - 18px)",padding:"10px 8px",overflow:"hidden"}}>
                      <div style={{fontSize:8,fontWeight:800,color:"var(--heading)",marginBottom:4}}>商談予約</div>
                      <div style={{fontSize:7,color:"var(--sub)",marginBottom:8,lineHeight:1.4}}>ご都合の良い日時を選択してください</div>
                      {/* Mini calendar */}
                      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:1,marginBottom:8}}>
                        {["月","火","水","木","金","土","日"].map(d=>(
                          <div key={d} style={{fontSize:5,textAlign:"center",color:"var(--sub)",fontWeight:700}}>{d}</div>
                        ))}
                        {[...Array(14)].map((_,i)=>(
                          <div key={i} style={{fontSize:6,textAlign:"center",padding:2,borderRadius:3,background:i===5?"#7c5cfc":i===8?"var(--surface)":"transparent",color:i===5?"#fff":"var(--heading)",fontWeight:i===5?800:500}}>{i+10}</div>
                        ))}
                      </div>
                      {/* Confirm button */}
                      <div style={{background:"linear-gradient(135deg,#7c5cfc,#b49dff)",color:"#fff",borderRadius:6,padding:"5px 8px",textAlign:"center",fontSize:7,fontWeight:800}}>予約を確定する</div>
                    </div>
                    {/* Home bar */}
                    <div style={{width:32,height:3,background:"#444",borderRadius:2,margin:"4px auto 0"}}/>
                  </div>
                </div>

                {/* Connection line */}
                <div style={{position:"absolute",bottom:100,left:"50%",width:1,height:30,background:"linear-gradient(180deg,#7c5cfc,transparent)",animation:"slideIn .4s 1.2s cubic-bezier(.16,1,.3,1) forwards",opacity:0}}/>

                {/* Confirmation badge */}
                <div style={{position:"absolute",bottom:16,left:20,animation:"nodeGrow .5s 1.5s cubic-bezier(.16,1,.3,1) forwards",opacity:0,transform:"scale(0)"}}>
                  <div style={{background:"#fff",border:"1px solid #d8d0f5",borderRadius:10,padding:"8px 12px",boxShadow:"0 2px 8px rgba(124,92,252,.1)"}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <div style={{width:20,height:20,borderRadius:"50%",background:"#7c5cfc",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#fff"}}>✓</div>
                      <div>
                        <div style={{fontSize:9,fontWeight:800,color:"var(--heading)"}}>予約完了</div>
                        <div style={{fontSize:8,color:"var(--sub)"}}>3タップで完了</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTEGRATION FLOW */}
      <section className="section" style={{background:"var(--surface)",position:"relative"}}>
        <div className="dot-grid" style={{opacity:.3}}/>
        <div className="section-inner" style={{position:"relative",zIndex:2}}>
          <div className="slabel" style={{textAlign:"center"}}>統合フロー</div>
          <div className="stitle" style={{textAlign:"center"}}>オンラインもオフラインも、すべてAIがつなぐ</div>
          <p className="ssub" style={{textAlign:"center",margin:"0 auto 48px"}}>あらゆる接点からの商談機会を、AIが一つのパイプラインに統合します。</p>

          {/* Flow Diagram */}
          <div style={{maxWidth:960,margin:"0 auto"}}>
            {/* Row 1: Sources */}
            <div style={{display:"flex",justifyContent:"center",gap:12,marginBottom:8,flexWrap:"wrap"}}>
              {[
                {icon:"✉️",label:"メール",color:"#3b6ff5",bg:"#eaf0fe",border:"#bcc8f5"},
                {icon:"📄",label:"PDF",color:"#12a37d",bg:"#e5f8f2",border:"#b8e6d8"},
                {icon:"🪪",label:"名刺",color:"#7c5cfc",bg:"#f0ecfe",border:"#c9bef5"},
                {icon:"🎪",label:"展示会",color:"#d03ea1",bg:"#fce7f6",border:"#f0b4da"},
              ].map((s,i)=>(
                <div key={i} style={{background:s.bg,border:`1px solid ${s.border}`,borderRadius:12,padding:"14px 20px",textAlign:"center",animation:`nodeGrow .5s ${i*0.15}s cubic-bezier(.16,1,.3,1) forwards`,opacity:0,transform:"scale(0)",minWidth:100}}>
                  <div style={{fontSize:24,marginBottom:4}}>{s.icon}</div>
                  <div style={{fontSize:11,fontWeight:800,color:s.color}}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Arrows down */}
            <div style={{display:"flex",justifyContent:"center",gap:80,marginBottom:8}}>
              {[0,1].map(i=>(
                <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                  <div style={{width:2,height:20,background:"var(--border2)"}}/>
                  <div style={{width:0,height:0,borderLeft:"5px solid transparent",borderRight:"5px solid transparent",borderTop:"6px solid var(--border2)"}}/>
                </div>
              ))}
            </div>

            {/* Row 2: Channels */}
            <div style={{display:"flex",justifyContent:"center",gap:20,marginBottom:8,flexWrap:"wrap"}}>
              {[
                {icon:"🔗",label:"カレンダーリンク",color:"#12a37d",bg:"#e5f8f2",border:"#b8e6d8"},
                {icon:"📱",label:"カレンダーQR",color:"#7c5cfc",bg:"#f0ecfe",border:"#c9bef5"},
              ].map((s,i)=>(
                <div key={i} style={{background:"#fff",border:`2px solid ${s.border}`,borderRadius:14,padding:"18px 28px",textAlign:"center",boxShadow:"0 4px 16px rgba(0,0,0,.04)",animation:`nodeGrow .5s ${0.6+i*0.15}s cubic-bezier(.16,1,.3,1) forwards`,opacity:0,transform:"scale(0)",minWidth:160}}>
                  <div style={{fontSize:28,marginBottom:6}}>{s.icon}</div>
                  <div style={{fontSize:13,fontWeight:800,color:s.color}}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Arrow down */}
            <div style={{display:"flex",justifyContent:"center",marginBottom:8}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <div style={{width:2,height:24,background:"var(--cta)"}}/>
                <div style={{width:0,height:0,borderLeft:"6px solid transparent",borderRight:"6px solid transparent",borderTop:"7px solid var(--cta)"}}/>
              </div>
            </div>

            {/* Row 3: Booking */}
            <div style={{display:"flex",justifyContent:"center",marginBottom:8}}>
              <div style={{background:"linear-gradient(135deg,var(--cta),#0fc19a)",borderRadius:16,padding:"22px 40px",textAlign:"center",boxShadow:"0 8px 32px rgba(18,163,125,.2)",animation:"nodeGrow .5s 1s cubic-bezier(.16,1,.3,1) forwards",opacity:0,transform:"scale(0)"}}>
                <div style={{fontSize:32,marginBottom:4}}>📅</div>
                <div style={{fontSize:15,fontWeight:900,color:"#fff"}}>商談予約</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.8)",marginTop:4}}>事前認定情報が引き継がれた状態で予約</div>
              </div>
            </div>

            {/* Arrow down */}
            <div style={{display:"flex",justifyContent:"center",marginBottom:8}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <div style={{width:2,height:24,background:"var(--accent)"}}/>
                <div style={{width:0,height:0,borderLeft:"6px solid transparent",borderRight:"6px solid transparent",borderTop:"7px solid var(--accent)"}}/>
              </div>
            </div>

            {/* Row 4: Follow-up */}
            <div style={{display:"flex",justifyContent:"center"}}>
              <div style={{background:"#fff",border:"2px solid #c9bef5",borderRadius:16,padding:"18px 36px",textAlign:"center",boxShadow:"0 4px 20px rgba(124,92,252,.08)",animation:"nodeGrow .5s 1.3s cubic-bezier(.16,1,.3,1) forwards",opacity:0,transform:"scale(0)"}}>
                <div style={{fontSize:28,marginBottom:4}}>💬</div>
                <div style={{fontSize:14,fontWeight:800,color:"#7c5cfc"}}>AI Chat フォローアップ</div>
                <div style={{fontSize:10,color:"var(--sub)",marginTop:4}}>確認メール・リマインダー・事前資料を自動送信</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="section-inner">
          <div className="slabel" style={{textAlign:"center"}}>よくある質問</div>
          <div className="stitle" style={{textAlign:"center"}}>FAQ</div>
          <div style={{height:36}}/>
          <div className="faq-list">{faqData.map((f,i)=>(
            <div className={"faq-item"+(openFaq===i?" open":"")} key={i}>
              <div className="faq-q" onClick={()=>setOpenFaq(openFaq===i?null:i)}>{f.q}<div className="faq-toggle">+</div></div>
              {openFaq===i&&<div className="faq-a">{f.a}</div>}
            </div>
          ))}</div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="dot-grid" style={{opacity:.3}}/>
        <div className="glow" style={{background:"rgba(18,163,125,.15)",width:500,height:500,top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}/>
        <div className="final-cta-inner">
          <div className="slabel">今すぐ始める</div>
          <div className="stitle" style={{textAlign:"center"}}>サイトの外でもリードを逃さない。<br/>今すぐ始める。</div>
          <p className="ssub" style={{textAlign:"center",margin:"16px auto 36px"}}>AIメール・カレンダーリンク・カレンダーQRで、あらゆる接点を商談に変えましょう。</p>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
            <button className="btn btn-cta btn-cta-lg" onClick={() => setIsDocModalOpen(true)}>資料請求</button>
            <button className="btn-ghost" onClick={() => setIsMeetingModalOpen(true)}>デモを予約 →</button>
          </div>
        </div>
      </section>

      <Footer variant="light" />

      <HubSpotModal isOpen={isDocModalOpen} onClose={() => setIsDocModalOpen(false)} utmCampaign="features-offsite" />
      <HubSpotMeetingModal isOpen={isMeetingModalOpen} onClose={() => setIsMeetingModalOpen(false)} utmCampaign="features-offsite" />
    </div>
  );
}
