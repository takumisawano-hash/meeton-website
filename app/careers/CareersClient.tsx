'use client'

import { useState } from "react";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const jobs = [
  { title:"カスタマーサクセス", dept:"CS", desc:"成果が出るまで伴走。顧客の成功を構造化し、継続率と拡大を同時にドライブ。", tags:["オンボーディング","ヘルススコア","課題抽出","継続率"] },
  { title:"マーケティング", dept:"Marketing", desc:"成長をドライブするマーケ施策を企画・実行。データに基づいたリード獲得戦略を推進。", tags:["広告運用","コンテンツ","分析","リード獲得"] },
  { title:"インサイドセールス", dept:"Sales", desc:"SaaS x B2B の最前線で、PLG と仕組み化で商談を量産するセールスマシンを構築。", tags:["SaaS","B2B","PLG","仕組み化"] },
  { title:"AIエンジニア / MLE", dept:"Engineering", desc:"営業xAIのコアに触れる。高速に仮説検証し、モデル運用まで一気通貫で担う。", tags:["Python","LLM","RAG","評価設計"] },
  { title:"フロントエンドエンジニア", dept:"Engineering", desc:"ダッシュボード/ワークフローを触って気持ちいいUIに仕上げるフロントのプロ。", tags:["React","TypeScript","Tailwind","性能最適化"] },
  { title:"プロダクトデザイナー", dept:"Design", desc:"カラフルで楽しい体験を設計。情報設計とビジュアルで差をつけるデザインリード。", tags:["UX","UI","Design System","User Research"] },
];

const values = [
  { emoji:"⚡", title:"Speed Over Perfection", desc:"完璧を待たない。小さく出して、速く学ぶ。1週間で検証、1ヶ月で改善、3ヶ月で進化。" },
  { emoji:"🎯", title:"Customer Obsessed", desc:"すべての意思決定は顧客の成果から逆算する。社内の都合より、顧客の成功が先。" },
  { emoji:"🧠", title:"AI-Native Thinking", desc:"AIを道具としてではなく、チームメイトとして扱う。AIと協働する新しい働き方を自ら実践。" },
  { emoji:"🔥", title:"Ownership Mindset", desc:"誰かがやるではなく自分がやる。担当範囲を超えて、事業全体にコミット。" },
  { emoji:"📊", title:"Data-Driven", desc:"感覚ではなく数字で語る。仮説を立て、検証し、結果から次のアクションを導く。" },
  { emoji:"🚀", title:"10x Ambition", desc:"1.1倍の改善ではなく、10倍のインパクトを狙う。常識を疑い、大胆な打ち手を歓迎する。" },
];

const whyJoin = [
  { icon:"💰", title:"ストックオプション", desc:"Series A前の初期メンバーとして、大きなアップサイドを共有。" },
  { icon:"🏠", title:"グローバルな環境", desc:"社内では日本語と英語が飛び交う環境。多様なバックグラウンドのメンバーと働ける。" },
  { icon:"📈", title:"急成長フェーズ", desc:"ローンチ数ヶ月で導入社数10x。Series A準備中の最もエキサイティングなタイミング。" },
  { icon:"🤝", title:"少数精鋭チーム", desc:"小さなチームだからこそ、一人ひとりの影響力が圧倒的に大きい。" },
  { icon:"🤖", title:"AIツール補助", desc:"ChatGPT、Claude、Cursor etc. 最先端のAIツールを会社負担で惜しみなく使える環境。" },
  { icon:"🌏", title:"グローバル展開", desc:"日本発のAI SaaSを世界へ。海外展開のチャレンジに参加できる。" },
];

const processSteps = [
  { num:"01", title:"カジュアル面談", desc:"まずはお互いを知る30分。カルチャーフィットを確認。" },
  { num:"02", title:"スキル面接", desc:"職種に応じた実践的な課題またはディスカッション。" },
  { num:"03", title:"最終面接", desc:"CEO/CTOとのカルチャー面接。ビジョンの共有。" },
  { num:"04", title:"オファー", desc:"最短1週間でオファー。スピード重視。" },
];

const css = `
:root {
  --bg:#0a0a12;--surface:#12121e;
  --border:#2a2a44;--border2:#3a3a58;
  --text:#a8a8c8;--heading:#eeeef6;--sub:#7878a0;
  --cta:#12a37d;--accent:#7c5cfc;--blue:#3b6ff5;
  --fb:'Noto Sans JP',var(--font-noto),'Plus Jakarta Sans',sans-serif;
  --fm:'JetBrains Mono',var(--font-mono),monospace;
}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--text);font-family:var(--fb);font-size:18px;overflow-x:hidden;-webkit-font-smoothing:antialiased}

@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}
.anim{opacity:0;animation:fadeUp .7s cubic-bezier(.16,1,.3,1) forwards}
.d1{animation-delay:.1s}.d2{animation-delay:.2s}.d3{animation-delay:.35s}.d4{animation-delay:.5s}.d5{animation-delay:.65s}

.slabel{font-family:var(--fm);font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin-bottom:16px;background:linear-gradient(135deg,#12a37d,#2b8ce0,#3b6ff5);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.stitle{font-size:44px;font-weight:900;color:var(--heading);line-height:1.2;letter-spacing:-.5px;margin-bottom:16px}
.ssub{font-size:18px;line-height:1.85;color:var(--sub);max-width:640px}
.section{padding:100px 48px;position:relative}
.inner{max-width:1140px;margin:0 auto;position:relative;z-index:2}

.grad{background:linear-gradient(135deg,#12a37d,#2b8ce0,#3b6ff5)}
.grad-text{background:linear-gradient(135deg,#12a37d,#2b8ce0,#3b6ff5);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

/* RESPONSIVE */
.products-row{display:flex;gap:20px}
.values-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.jobs-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.why-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.process-row{display:flex;gap:0;align-items:stretch}
.hero-stats-row{display:flex;justify-content:center;gap:64px}
.hero-ctas-row{display:flex;gap:14px;justify-content:center}

@media(max-width:1024px){
  .section{padding:80px 32px}
  .values-grid{grid-template-columns:repeat(2,1fr)}
  .process-row{flex-wrap:wrap;gap:16px}
  .process-row>div{flex:1 1 45%}
  .process-row .arrow{display:none}
}
@media(max-width:768px){
  .section{padding:60px 24px}
  .stitle{font-size:32px}
  .ssub{font-size:16px}
  .products-row{flex-direction:column}
  .values-grid{grid-template-columns:1fr}
  .jobs-grid{grid-template-columns:1fr}
  .why-grid{grid-template-columns:1fr}
  .process-row{flex-direction:column}
  .process-row>div{flex:1 1 100%}
  .hero-stats-row{flex-direction:column;gap:32px}
  .hero-ctas-row{flex-direction:column;align-items:center}
}
@media(max-width:480px){
  .section{padding:48px 16px}
}

/* Hero responsive */
.hero-title{font-size:80px;font-weight:900;line-height:1.1;letter-spacing:-3px;margin-bottom:28px;color:#eeeef6}
@media(max-width:1024px){
  .hero-title{font-size:60px;letter-spacing:-2px}
}
@media(max-width:768px){
  .hero-title{font-size:44px;letter-spacing:-1.5px}
}
@media(max-width:480px){
  .hero-title{font-size:36px;letter-spacing:-1px}
}
`;

function JobCard({ job }: { job: typeof jobs[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        background:"#12121e",
        border:`1px solid ${hovered ? 'transparent' : '#2a2a44'}`,
        borderRadius:18,
        padding:32,
        display:"flex",
        flexDirection:"column",
        transition:"all .4s cubic-bezier(.16,1,.3,1)",
        position:"relative",
        overflow:"hidden",
        cursor:"default",
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 16px 56px rgba(18,163,125,.12)' : 'none'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <span style={{
          display:"inline-flex",alignItems:"center",gap:6,fontSize:11,fontWeight:700,
          padding:"5px 12px",borderRadius:6,background:"rgba(18,163,125,.1)",color:"#12a37d",
          border:"1px solid rgba(18,163,125,.15)"
        }}>
          <span style={{width:5,height:5,borderRadius:"50%",background:"#12a37d",display:"inline-block"}} />
          積極採用
        </span>
        <span style={{fontSize:11,fontWeight:600,color:"#7878a0",fontFamily:"var(--fm)"}}>{job.dept}</span>
      </div>
      <div style={{fontSize:22,fontWeight:900,color:"#eeeef6",marginBottom:10,letterSpacing:"-.3px"}}>{job.title}</div>
      <div style={{fontSize:14,lineHeight:1.8,color:"#7878a0",marginBottom:18,flex:1}}>{job.desc}</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:20}}>
        {job.tags.map((t,j) => (
          <span key={j} style={{
            fontSize:11,fontWeight:700,padding:"5px 12px",borderRadius:6,
            background:"#1a1a2e",border:"1px solid #2a2a44",color:"#a8a8c8",
            fontFamily:"var(--fm)"
          }}>{t}</span>
        ))}
      </div>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSe57dBjNsS3pG0QYZAVRFJk4wPKOv6GX7WBF-1tisAslnq5OQ/viewform?usp=dialog"
        target="_blank"
        rel="noopener noreferrer"
        style={{display:"flex",alignItems:"center",gap:8,fontSize:14,fontWeight:700,color:"#eeeef6",paddingTop:10,borderTop:"1px solid #2a2a44",textDecoration:"none",transition:"opacity .2s"}}
      >
        <span style={{
          width:28,height:28,borderRadius:8,
          background:"linear-gradient(135deg,#12a37d,#3b6ff5)",
          display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:14
        }}>→</span>
        応募する
      </a>
    </div>
  );
}

export default function CareersClient() {
  const grad = "linear-gradient(135deg,#12a37d,#2b8ce0,#3b6ff5)";

  return (
    <div style={{background:"#0a0a12",color:"#a8a8c8",fontFamily:"var(--fb)",overflowX:"hidden",WebkitFontSmoothing:"antialiased"}}>
      <style dangerouslySetInnerHTML={{__html:css}}/>

      <Nav variant="dark" />

      {/* HERO */}
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",padding:"clamp(100px,18vw,140px) clamp(16px,5vw,48px) clamp(60px,10vw,100px)"}}>
        <div style={{position:"absolute",inset:0,overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(120,120,160,.06) 1px,transparent 1px)",backgroundSize:"32px 32px",pointerEvents:"none"}} />
          <div style={{position:"absolute",width:800,height:800,top:"50%",left:"50%",transform:"translate(-50%,-50%)",borderRadius:"50%",background:"conic-gradient(from 0deg,rgba(18,163,125,.12),rgba(59,111,245,.12),rgba(124,92,252,.08),rgba(18,163,125,.12))",filter:"blur(80px)"}} />
          <div style={{position:"absolute",width:400,height:400,top:"50%",left:"50%",transform:"translate(-50%,-50%)",borderRadius:"50%",border:"1px solid rgba(59,111,245,.1)"}} />
          <div style={{position:"absolute",width:600,height:600,top:"50%",left:"50%",transform:"translate(-50%,-50%)",borderRadius:"50%",border:"1px solid rgba(18,163,125,.08)"}} />
          <div style={{position:"absolute",borderRadius:"50%",filter:"blur(120px)",background:"rgba(18,163,125,.2)",width:500,height:500,top:-100,right:-80,pointerEvents:"none"}} />
          <div style={{position:"absolute",borderRadius:"50%",filter:"blur(120px)",background:"rgba(59,111,245,.15)",width:400,height:400,bottom:-50,left:-60,pointerEvents:"none"}} />
        </div>
        <div style={{maxWidth:900,textAlign:"center",position:"relative",zIndex:2}}>
          <div className="anim d1" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,fontSize:13,fontWeight:700,color:"#12a37d",background:"rgba(18,163,125,.08)",border:"1px solid rgba(18,163,125,.15)",marginBottom:32}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#12a37d",display:"inline-block"}} />
            We are Hiring  -  6 positions open
          </div>
          <h1 className="anim d2 hero-title">
            AIで営業の<br />
            <span className="grad-text">あたりまえ</span>を変える
          </h1>
          <p className="anim d3" style={{fontSize:20,lineHeight:1.9,color:"#7878a0",maxWidth:620,margin:"0 auto 48px"}}>
            DynaMeet は Meeton ai と Meeton Talent の2つのプロダクトで、BtoB営業のあり方を根本から変えるAIスタートアップです。
          </p>
          <div className="anim d4 hero-ctas-row">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSe57dBjNsS3pG0QYZAVRFJk4wPKOv6GX7WBF-1tisAslnq5OQ/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              style={{border:"none",cursor:"pointer",fontWeight:700,fontSize:18,padding:"18px 44px",borderRadius:14,background:grad,color:"#fff",boxShadow:"0 6px 32px rgba(18,163,125,.3)",textDecoration:"none",display:"inline-block"}}
            >
              応募する
            </a>
          </div>
          <div className="anim d5 hero-stats-row" style={{marginTop:80,paddingTop:48,borderTop:"1px solid #2a2a44"}}>
            {[{v:"10x",l:"導入社数（数ヶ月で）"},{v:"2",l:"プロダクト運営"},{v:"Series A",l:"準備中"}].map((n,i) => (
              <div key={i} style={{textAlign:"center"}}>
                <div className="grad-text" style={{fontFamily:"var(--fm)",fontSize:44,fontWeight:700,letterSpacing:-1}}>{n.v}</div>
                <div style={{fontSize:14,color:"#7878a0",marginTop:6,fontWeight:600}}>{n.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section" id="s0">
        <div className="inner">
          <div className="slabel" style={{textAlign:"center"}}>OUR PRODUCTS</div>
          <div className="stitle" style={{textAlign:"center"}}>2つのプロダクトで営業を革新</div>
          <p className="ssub" style={{textAlign:"center",margin:"0 auto"}}>それぞれが独立した事業として成長しながら、データとAI基盤を共有。両方のプロダクトに関われるのが DynaMeet の魅力です。</p>
          <div className="products-row" style={{marginTop:48}}>
            {[
              {color:"#12a37d",badge:"Revenue Engine",name:"Meeton ai",desc:"Webサイト訪問者をAIチャットで接客し、リード獲得から商談予約まで自動化するAI SDRプラットフォーム。",s1v:"10x",s1l:"導入社数の増加",s2v:"急成長中",s2l:"ローンチ数ヶ月",href:"/"},
              {color:"#3b6ff5",badge:"Talent Intelligence",name:"Meeton Talent",desc:"採用市場にAIの力を。企業と人材のマッチングを根本から変えるプロダクト。（詳細は面談でお話しします）",s1v:"New",s1l:"開発フェーズ",s2v:"巨大",s2l:"市場機会",href:"/talent/"},
            ].map((p,i) => (
              <Link key={i} href={p.href} style={{flex:1,textDecoration:"none"}}>
                <div style={{
                  borderRadius:20,padding:36,position:"relative",overflow:"hidden",
                  border:`1px solid ${p.color}26`,background:`${p.color}0a`,
                  transition:"all .4s cubic-bezier(.16,1,.3,1)",cursor:"pointer",height:"100%"
                }}>
                  <span style={{display:"inline-flex",alignItems:"center",gap:6,padding:"6px 14px",borderRadius:8,fontSize:12,fontWeight:800,background:`${p.color}1a`,color:p.color,marginBottom:18}}>
                    {i===0?"🟢":"🔵"} {p.badge}
                  </span>
                  <div style={{fontSize:28,fontWeight:900,color:"#eeeef6",marginBottom:10}}>{p.name}</div>
                  <div style={{fontSize:15,lineHeight:1.8,color:"#7878a0"}}>{p.desc}</div>
                  <div style={{marginTop:20,display:"flex",gap:28}}>
                    <div>
                      <div style={{fontFamily:"var(--fm)",fontSize:24,fontWeight:700,color:p.color}}>{p.s1v}</div>
                      <div style={{fontSize:11,color:"#7878a0",marginTop:2,fontWeight:500}}>{p.s1l}</div>
                    </div>
                    <div>
                      <div style={{fontFamily:"var(--fm)",fontSize:24,fontWeight:700,color:p.color}}>{p.s2v}</div>
                      <div style={{fontSize:11,color:"#7878a0",marginTop:2,fontWeight:500}}>{p.s2l}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section" style={{background:"#12121e"}} id="s1">
        <div className="inner">
          <div className="slabel" style={{textAlign:"center"}}>CULTURE AND VALUES</div>
          <div className="stitle" style={{textAlign:"center"}}>DynaMeet の行動原則</div>
          <p className="ssub" style={{textAlign:"center",margin:"0 auto"}}>少数精鋭だからこそ、一人ひとりの行動がカルチャーを作る。</p>
          <div className="values-grid" style={{marginTop:48}}>
            {values.map((v,i) => (
              <div key={i} style={{
                background:"#0a0a12",border:"1px solid #2a2a44",borderRadius:18,padding:32,
                transition:"all .35s cubic-bezier(.16,1,.3,1)",cursor:"default",position:"relative",overflow:"hidden"
              }}>
                <div style={{fontSize:36,marginBottom:16}}>{v.emoji}</div>
                <div style={{fontSize:20,fontWeight:800,color:"#eeeef6",marginBottom:10}}>{v.title}</div>
                <div style={{fontSize:15,lineHeight:1.8,color:"#7878a0"}}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POSITIONS */}
      <section className="section" id="s2">
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(120,120,160,.06) 1px,transparent 1px)",backgroundSize:"32px 32px",pointerEvents:"none",opacity:.3}} />
        <div className="inner">
          <div className="slabel" style={{textAlign:"center"}}>OPEN POSITIONS</div>
          <div className="stitle" style={{textAlign:"center"}}>募集職種</div>
          <p className="ssub" style={{textAlign:"center",margin:"0 auto"}}>すべてのポジションでフルリモート勤務可能。少数精鋭のチームで、大きなインパクトを。</p>
          <div className="jobs-grid" style={{marginTop:48}}>
            {jobs.map((j,i) => <JobCard job={j} key={i} />)}
          </div>
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="section" style={{background:"#12121e"}}>
        <div className="inner">
          <div className="slabel" style={{textAlign:"center"}}>WHY DYNAMEET</div>
          <div className="stitle" style={{textAlign:"center"}}>DynaMeet で働く理由</div>
          <p className="ssub" style={{textAlign:"center",margin:"0 auto"}}>Series A前の最もエキサイティングなフェーズ。初期メンバーとしての特権。</p>
          <div className="why-grid" style={{marginTop:48}}>
            {whyJoin.map((w,i) => (
              <div key={i} style={{
                background:"#0a0a12",border:"1px solid #2a2a44",borderRadius:16,padding:28,
                display:"flex",gap:18,transition:"all .3s cubic-bezier(.16,1,.3,1)",cursor:"default"
              }}>
                <div style={{width:48,height:48,borderRadius:14,background:"#1a1a2e",border:"1px solid #2a2a44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{w.icon}</div>
                <div>
                  <div style={{fontSize:17,fontWeight:800,color:"#eeeef6",marginBottom:6}}>{w.title}</div>
                  <div style={{fontSize:14,lineHeight:1.75,color:"#7878a0"}}>{w.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section" id="s3">
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(120,120,160,.06) 1px,transparent 1px)",backgroundSize:"32px 32px",pointerEvents:"none",opacity:.3}} />
        <div className="inner">
          <div className="slabel" style={{textAlign:"center"}}>HIRING PROCESS</div>
          <div className="stitle" style={{textAlign:"center"}}>選考プロセス</div>
          <p className="ssub" style={{textAlign:"center",margin:"0 auto"}}>スピード重視。応募から最短1週間でオファーまで。</p>
          <div className="process-row" style={{marginTop:48}}>
            {processSteps.map((s,i) => (
              <div key={i} style={{display:"flex",alignItems:"stretch",flex:1}}>
                <div style={{
                  flex:1,background:"#12121e",border:"1px solid #2a2a44",borderRadius:16,padding:28,
                  textAlign:"center",transition:"all .3s",cursor:"default"
                }}>
                  <div className="grad-text" style={{fontFamily:"var(--fm)",fontSize:36,fontWeight:700,marginBottom:10}}>{s.num}</div>
                  <div style={{fontSize:16,fontWeight:800,color:"#eeeef6",marginBottom:8}}>{s.title}</div>
                  <div style={{fontSize:13,lineHeight:1.7,color:"#7878a0"}}>{s.desc}</div>
                </div>
                {i < 3 && (
                  <div className="arrow" style={{display:"flex",alignItems:"center",justifyContent:"center",width:36,fontFamily:"var(--fm)",fontSize:18,color:"#3a3a58",flexShrink:0}}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{padding:"clamp(60px,12vw,120px) clamp(16px,5vw,48px)",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(120,120,160,.06) 1px,transparent 1px)",backgroundSize:"32px 32px",pointerEvents:"none",opacity:.3}} />
        <div style={{position:"absolute",width:700,height:700,top:"50%",left:"50%",transform:"translate(-50%,-50%)",borderRadius:"50%",background:"conic-gradient(from 180deg,rgba(18,163,125,.1),rgba(59,111,245,.1),rgba(124,92,252,.06),rgba(18,163,125,.1))",filter:"blur(100px)"}} />
        <div style={{position:"relative",zIndex:2,maxWidth:620,margin:"0 auto"}}>
          <div className="slabel" style={{textAlign:"center"}}>JOIN US</div>
          <div className="stitle" style={{textAlign:"center"}}>一緒に、営業の未来を<br />つくりませんか？</div>
          <p className="ssub" style={{textAlign:"center",margin:"16px auto 40px"}}>少数精鋭のチームで、AIの力で営業のあたりまえを変える。あなたの力が必要です。</p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSe57dBjNsS3pG0QYZAVRFJk4wPKOv6GX7WBF-1tisAslnq5OQ/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            style={{border:"none",cursor:"pointer",fontWeight:700,fontSize:18,padding:"18px 44px",borderRadius:14,background:grad,color:"#fff",boxShadow:"0 6px 32px rgba(18,163,125,.3)",textDecoration:"none"}}
          >応募する</a>
        </div>
      </section>

      <Footer variant="dark" />
    </div>
  );
}
