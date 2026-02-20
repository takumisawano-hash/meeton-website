import { useState } from "react";

const jobs = [
  { title:"カスタマーサクセス", dept:"CS", desc:"成果が出るまで伴走。顧客の成功を構造化し、継続率と拡大を同時にドライブ。", tags:["オンボーディング","ヘルススコア","課題抽出","継続率"] },
  { title:"マーケティング", dept:"Marketing", desc:"成長をドライブするマーケ施策を企画・実行。データに基づいたリード獲得戦略を推進。", tags:["広告運用","コンテンツ","分析","リード獲得"] },
  { title:"インサイドセールス", dept:"Sales", desc:"SaaS x B2B の最前線で、PLG と仕組み化で商談を量産するセールスマシンを構築。", tags:["SaaS","B2B","PLG","仕組み化"] },
  { title:"AIエンジニア / MLE", dept:"Engineering", desc:"営業xAIのコアに触れる。高速に仮説検証し、モデル運用まで一気通貫で担う。", tags:["Python","LLM","RAG","評価設計"] },
  { title:"フロントエンドエンジニア", dept:"Engineering", desc:"ダッシュボード/ワークフローを触って気持ちいいUIに仕上げるフロントのプロ。", tags:["React","TypeScript","Tailwind","性能最適化"] },
  { title:"プロダクトデザイナー", dept:"Design", desc:"カラフルで楽しい体験を設計。情報設計とビジュアルで差をつけるデザインリード。", tags:["UX","UI","Design System","User Research"] },
];

const values = [
  { emoji:"\u26A1", title:"Speed Over Perfection", desc:"完璧を待たない。小さく出して、速く学ぶ。1週間で検証、1ヶ月で改善、3ヶ月で進化。" },
  { emoji:"\uD83C\uDFAF", title:"Customer Obsessed", desc:"すべての意思決定は顧客の成果から逆算する。社内の都合より、顧客の成功が先。" },
  { emoji:"\uD83E\uDDE0", title:"AI-Native Thinking", desc:"AIを道具としてではなく、チームメイトとして扱う。AIと協働する新しい働き方を自ら実践。" },
  { emoji:"\uD83D\uDD25", title:"Ownership Mindset", desc:"誰かがやるではなく自分がやる。担当範囲を超えて、事業全体にコミット。" },
  { emoji:"\uD83D\uDCCA", title:"Data-Driven", desc:"感覚ではなく数字で語る。仮説を立て、検証し、結果から次のアクションを導く。" },
  { emoji:"\uD83D\uDE80", title:"10x Ambition", desc:"1.1倍の改善ではなく、10倍のインパクトを狙う。常識を疑い、大胆な打ち手を歓迎する。" },
];

const whyJoin = [
  { icon:"\uD83D\uDCB0", title:"ストックオプション", desc:"Series A前の初期メンバーとして、大きなアップサイドを共有。" },
  { icon:"\uD83C\uDFE0", title:"グローバルな環境", desc:"社内では日本語と英語が飛び交う環境。多様なバックグラウンドのメンバーと働ける。" },
  { icon:"\uD83D\uDCC8", title:"急成長フェーズ", desc:"ローンチ数ヶ月で導入社数10x。Series A準備中の最もエキサイティングなタイミング。" },
  { icon:"\uD83E\uDD1D", title:"少数精鋭チーム", desc:"小さなチームだからこそ、一人ひとりの影響力が圧倒的に大きい。" },
  { icon:"\uD83E\uDD16", title:"AIツール補助", desc:"ChatGPT、Claude、Cursor etc. 最先端のAIツールを会社負担で惜しみなく使える環境。" },
  { icon:"\uD83C\uDF0F", title:"グローバル展開", desc:"日本発のAI SaaSを世界へ。海外展開のチャレンジに参加できる。" },
];

const processSteps = [
  { num:"01", title:"カジュアル面談", desc:"まずはお互いを知る30分。カルチャーフィットを確認。" },
  { num:"02", title:"スキル面接", desc:"職種に応じた実践的な課題またはディスカッション。" },
  { num:"03", title:"最終面接", desc:"CEO/CTOとのカルチャー面接。ビジョンの共有。" },
  { num:"04", title:"オファー", desc:"最短1週間でオファー。スピード重視。" },
];

function JobCard({ job }) {
  return (
    <div style={{
      background:"#12121e",border:"1px solid #2a2a44",borderRadius:18,padding:32,
      display:"flex",flexDirection:"column",transition:"all .4s cubic-bezier(.16,1,.3,1)",
      position:"relative",overflow:"hidden",cursor:"default"
    }}
    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 16px 56px rgba(18,163,125,.12)";e.currentTarget.style.borderColor="transparent"}}
    onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";e.currentTarget.style.borderColor="#2a2a44"}}
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
        <span style={{fontSize:11,fontWeight:600,color:"#7878a0",fontFamily:"'JetBrains Mono',monospace"}}>{job.dept}</span>
      </div>
      <div style={{fontSize:22,fontWeight:900,color:"#eeeef6",marginBottom:10,letterSpacing:"-.3px"}}>{job.title}</div>
      <div style={{fontSize:14,lineHeight:1.8,color:"#7878a0",marginBottom:18,flex:1}}>{job.desc}</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:20}}>
        {job.tags.map(function(t,j){
          return (
            <span key={j} style={{
              fontSize:11,fontWeight:700,padding:"5px 12px",borderRadius:6,
              background:"#1a1a2e",border:"1px solid #2a2a44",color:"#a8a8c8",
              fontFamily:"'JetBrains Mono',monospace"
            }}>{t}</span>
          );
        })}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8,fontSize:14,fontWeight:700,color:"#eeeef6",paddingTop:10,borderTop:"1px solid #2a2a44"}}>
        <span style={{
          width:28,height:28,borderRadius:8,
          background:"linear-gradient(135deg,#12a37d,#3b6ff5)",
          display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:14
        }}>{"\u2192"}</span>
        応募する
      </div>
    </div>
  );
}

export default function App() {
  const [openFaq] = useState(null);

  const grad = "linear-gradient(135deg,#12a37d,#2b8ce0,#3b6ff5)";
  const grad2 = "linear-gradient(135deg,#12a37d,#3b6ff5)";
  const fm = "'JetBrains Mono',monospace";
  const fb = "'Noto Sans JP','Plus Jakarta Sans',sans-serif";
  const heading = "#eeeef6";
  const sub = "#7878a0";
  const text = "#a8a8c8";
  const surface = "#12121e";
  const border = "#2a2a44";
  const border2 = "#3a3a58";
  const bg = "#0a0a12";

  const slabel = {fontFamily:fm,fontSize:12,fontWeight:700,letterSpacing:3,textTransform:"uppercase",marginBottom:16,background:grad,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"};
  const stitle = {fontSize:44,fontWeight:900,color:heading,lineHeight:1.2,letterSpacing:"-.5px",marginBottom:16};
  const ssub = {fontSize:18,lineHeight:1.85,color:sub,maxWidth:640};
  const sectionStyle = {padding:"100px 48px",position:"relative"};
  const innerStyle = {maxWidth:1140,margin:"0 auto",position:"relative",zIndex:2};

  return (
    <div style={{background:bg,color:text,fontFamily:fb,overflowX:"hidden",WebkitFontSmoothing:"antialiased"}}>

      {/* NAV */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"16px 48px",
        display:"flex",alignItems:"center",justifyContent:"space-between",
        background:"rgba(10,10,18,.8)",backdropFilter:"blur(24px) saturate(1.4)",
        borderBottom:"1px solid rgba(42,42,68,.5)"
      }}>
        <div style={{fontFamily:fb,fontWeight:900,fontSize:20,color:heading,display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:32,height:32,borderRadius:10,background:grad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:900,color:"#fff"}}>D</div>
          DynaMeet
          <span style={{fontSize:11,fontWeight:700,padding:"4px 10px",borderRadius:6,background:"#1a1a2e",border:"1px solid "+border,color:sub}}>Careers</span>
        </div>
        <div style={{display:"flex",gap:28}}>
          {[{l:"会社について",id:"s0"},{l:"カルチャー",id:"s1"},{l:"募集職種",id:"s2"},{l:"選考プロセス",id:"s3"}].map(function(item,i){
            return <a key={i} onClick={function(){document.getElementById(item.id).scrollIntoView({behavior:"smooth"})}} style={{fontSize:14,color:sub,textDecoration:"none",fontWeight:600,cursor:"pointer"}}>{item.l}</a>;
          })}
        </div>
        <button onClick={function(){document.getElementById("s2").scrollIntoView({behavior:"smooth"})}} style={{
          border:"none",cursor:"pointer",fontFamily:fb,fontWeight:700,fontSize:14,
          padding:"10px 24px",borderRadius:10,background:grad,color:"#fff",
          boxShadow:"0 4px 20px rgba(18,163,125,.25)"
        }}>募集職種を見る</button>
      </nav>

      {/* HERO */}
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",padding:"140px 48px 100px"}}>
        <div style={{position:"absolute",inset:0,overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(120,120,160,.06) 1px,transparent 1px)",backgroundSize:"32px 32px",pointerEvents:"none"}} />
          <div style={{position:"absolute",width:800,height:800,top:"50%",left:"50%",transform:"translate(-50%,-50%)",borderRadius:"50%",background:"conic-gradient(from 0deg,rgba(18,163,125,.12),rgba(59,111,245,.12),rgba(124,92,252,.08),rgba(18,163,125,.12))",filter:"blur(80px)"}} />
          <div style={{position:"absolute",width:400,height:400,top:"50%",left:"50%",transform:"translate(-50%,-50%)",borderRadius:"50%",border:"1px solid rgba(59,111,245,.1)"}} />
          <div style={{position:"absolute",width:600,height:600,top:"50%",left:"50%",transform:"translate(-50%,-50%)",borderRadius:"50%",border:"1px solid rgba(18,163,125,.08)"}} />
          <div style={{position:"absolute",borderRadius:"50%",filter:"blur(120px)",background:"rgba(18,163,125,.2)",width:500,height:500,top:-100,right:-80,pointerEvents:"none"}} />
          <div style={{position:"absolute",borderRadius:"50%",filter:"blur(120px)",background:"rgba(59,111,245,.15)",width:400,height:400,bottom:-50,left:-60,pointerEvents:"none"}} />
        </div>
        <div style={{maxWidth:900,textAlign:"center",position:"relative",zIndex:2}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,fontSize:13,fontWeight:700,color:"#12a37d",background:"rgba(18,163,125,.08)",border:"1px solid rgba(18,163,125,.15)",marginBottom:32}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#12a37d",display:"inline-block"}} />
            We are Hiring  -  6 positions open
          </div>
          <h1 style={{fontSize:80,fontWeight:900,lineHeight:1.1,letterSpacing:-3,marginBottom:28,color:heading}}>
            AIで営業の<br />
            <span style={{background:grad,backgroundSize:"200% auto",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>あたりまえ</span>を変える
          </h1>
          <p style={{fontSize:20,lineHeight:1.9,color:sub,maxWidth:620,margin:"0 auto 48px"}}>
            DynaMeet は Meeton ai と Meeton Talent の2つのプロダクトで、BtoB営業のあり方を根本から変えるAIスタートアップです。
          </p>
          <div style={{display:"flex",gap:14,justifyContent:"center"}}>
            <button onClick={function(){document.getElementById("s2").scrollIntoView({behavior:"smooth"})}} style={{border:"none",cursor:"pointer",fontFamily:fb,fontWeight:700,fontSize:18,padding:"18px 44px",borderRadius:14,background:grad,color:"#fff",boxShadow:"0 6px 32px rgba(18,163,125,.3)"}}>
              募集職種を見る
            </button>
            <button style={{background:"transparent",border:"2px solid "+border2,color:heading,padding:"16px 40px",borderRadius:14,fontSize:18,fontWeight:700,cursor:"pointer",fontFamily:fb}}>
              応募する
            </button>
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:64,marginTop:80,paddingTop:48,borderTop:"1px solid "+border}}>
            {[{v:"10x",l:"導入社数（数ヶ月で）"},{v:"2",l:"プロダクト運営"},{v:"Series A",l:"準備中"}].map(function(n,i){
              return (
                <div key={i} style={{textAlign:"center"}}>
                  <div style={{fontFamily:fm,fontSize:44,fontWeight:700,background:grad,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",letterSpacing:-1}}>{n.v}</div>
                  <div style={{fontSize:14,color:sub,marginTop:6,fontWeight:600}}>{n.l}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section style={sectionStyle} id="s0">
        <div style={innerStyle}>
          <div style={{...slabel,textAlign:"center"}}>OUR PRODUCTS</div>
          <div style={{...stitle,textAlign:"center"}}>2つのプロダクトで営業を革新</div>
          <p style={{...ssub,textAlign:"center",margin:"0 auto"}}>それぞれが独立した事業として成長しながら、データとAI基盤を共有。両方のプロダクトに関われるのが DynaMeet の魅力です。</p>
          <div style={{display:"flex",gap:20,marginTop:48}}>
            {[
              {color:"#12a37d",badge:"Revenue Engine",name:"Meeton ai",desc:"Webサイト訪問者をAIチャットで接客し、リード獲得から商談予約まで自動化するAI SDRプラットフォーム。",s1v:"10x",s1l:"導入社数の増加",s2v:"急成長中",s2l:"ローンチ数ヶ月"},
              {color:"#3b6ff5",badge:"Talent Intelligence",name:"Meeton Talent",desc:"採用市場にAIの力を。企業と人材のマッチングを根本から変えるプロダクト。（詳細は面談でお話しします）",s1v:"New",s1l:"開発フェーズ",s2v:"巨大",s2l:"市場機会"},
            ].map(function(p,i){
              return (
                <div key={i} style={{
                  flex:1,borderRadius:20,padding:36,position:"relative",overflow:"hidden",
                  border:"1px solid "+p.color+"26",background:p.color+"0a",
                  transition:"all .4s cubic-bezier(.16,1,.3,1)",cursor:"default"
                }}
                onMouseEnter={function(e){e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 12px 48px "+p.color+"1f"}}
                onMouseLeave={function(e){e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=""}}
                >
                  <span style={{display:"inline-flex",alignItems:"center",gap:6,padding:"6px 14px",borderRadius:8,fontSize:12,fontWeight:800,background:p.color+"1a",color:p.color,marginBottom:18}}>
                    {i===0?"\uD83D\uDFE2":"\uD83D\uDD35"} {p.badge}
                  </span>
                  <div style={{fontSize:28,fontWeight:900,color:heading,marginBottom:10}}>{p.name}</div>
                  <div style={{fontSize:15,lineHeight:1.8,color:sub}}>{p.desc}</div>
                  <div style={{marginTop:20,display:"flex",gap:28}}>
                    <div>
                      <div style={{fontFamily:fm,fontSize:24,fontWeight:700,color:p.color}}>{p.s1v}</div>
                      <div style={{fontSize:11,color:sub,marginTop:2,fontWeight:500}}>{p.s1l}</div>
                    </div>
                    <div>
                      <div style={{fontFamily:fm,fontSize:24,fontWeight:700,color:p.color}}>{p.s2v}</div>
                      <div style={{fontSize:11,color:sub,marginTop:2,fontWeight:500}}>{p.s2l}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{...sectionStyle,background:surface}} id="s1">
        <div style={innerStyle}>
          <div style={{...slabel,textAlign:"center"}}>CULTURE AND VALUES</div>
          <div style={{...stitle,textAlign:"center"}}>DynaMeet の行動原則</div>
          <p style={{...ssub,textAlign:"center",margin:"0 auto"}}>少数精鋭だからこそ、一人ひとりの行動がカルチャーを作る。</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginTop:48}}>
            {values.map(function(v,i){
              return (
                <div key={i} style={{
                  background:bg,border:"1px solid "+border,borderRadius:18,padding:32,
                  transition:"all .35s cubic-bezier(.16,1,.3,1)",cursor:"default",position:"relative",overflow:"hidden"
                }}
                onMouseEnter={function(e){e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 12px 48px rgba(18,163,125,.08)";e.currentTarget.style.borderColor="transparent"}}
                onMouseLeave={function(e){e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";e.currentTarget.style.borderColor=border}}
                >
                  <div style={{fontSize:36,marginBottom:16}}>{v.emoji}</div>
                  <div style={{fontSize:20,fontWeight:800,color:heading,marginBottom:10}}>{v.title}</div>
                  <div style={{fontSize:15,lineHeight:1.8,color:sub}}>{v.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* POSITIONS */}
      <section style={sectionStyle} id="s2">
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(120,120,160,.06) 1px,transparent 1px)",backgroundSize:"32px 32px",pointerEvents:"none",opacity:.3}} />
        <div style={innerStyle}>
          <div style={{...slabel,textAlign:"center"}}>OPEN POSITIONS</div>
          <div style={{...stitle,textAlign:"center"}}>募集職種</div>
          <p style={{...ssub,textAlign:"center",margin:"0 auto"}}>すべてのポジションでフルリモート勤務可能。少数精鋭のチームで、大きなインパクトを。</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:16,marginTop:48}}>
            {jobs.map(function(j,i){ return <JobCard job={j} key={i} />; })}
          </div>
        </div>
      </section>

      {/* WHY JOIN */}
      <section style={{...sectionStyle,background:surface}}>
        <div style={innerStyle}>
          <div style={{...slabel,textAlign:"center"}}>WHY DYNAMEET</div>
          <div style={{...stitle,textAlign:"center"}}>DynaMeet で働く理由</div>
          <p style={{...ssub,textAlign:"center",margin:"0 auto"}}>Series A前の最もエキサイティングなフェーズ。初期メンバーとしての特権。</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:16,marginTop:48}}>
            {whyJoin.map(function(w,i){
              return (
                <div key={i} style={{
                  background:bg,border:"1px solid "+border,borderRadius:16,padding:28,
                  display:"flex",gap:18,transition:"all .3s cubic-bezier(.16,1,.3,1)",cursor:"default"
                }}
                onMouseEnter={function(e){e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.borderColor=border2}}
                onMouseLeave={function(e){e.currentTarget.style.transform="";e.currentTarget.style.borderColor=border}}
                >
                  <div style={{width:48,height:48,borderRadius:14,background:"#1a1a2e",border:"1px solid "+border,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{w.icon}</div>
                  <div>
                    <div style={{fontSize:17,fontWeight:800,color:heading,marginBottom:6}}>{w.title}</div>
                    <div style={{fontSize:14,lineHeight:1.75,color:sub}}>{w.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={sectionStyle} id="s3">
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(120,120,160,.06) 1px,transparent 1px)",backgroundSize:"32px 32px",pointerEvents:"none",opacity:.3}} />
        <div style={innerStyle}>
          <div style={{...slabel,textAlign:"center"}}>HIRING PROCESS</div>
          <div style={{...stitle,textAlign:"center"}}>選考プロセス</div>
          <p style={{...ssub,textAlign:"center",margin:"0 auto"}}>スピード重視。応募から最短1週間でオファーまで。</p>
          <div style={{display:"flex",gap:0,alignItems:"stretch",marginTop:48}}>
            {processSteps.map(function(s,i){
              return (
                <div key={i} style={{display:"flex",alignItems:"stretch",flex:1}}>
                  <div style={{
                    flex:1,background:surface,border:"1px solid "+border,borderRadius:16,padding:28,
                    textAlign:"center",transition:"all .3s",cursor:"default"
                  }}
                  onMouseEnter={function(e){e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.borderColor=border2}}
                  onMouseLeave={function(e){e.currentTarget.style.transform="";e.currentTarget.style.borderColor=border}}
                  >
                    <div style={{fontFamily:fm,fontSize:36,fontWeight:700,background:grad,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",marginBottom:10}}>{s.num}</div>
                    <div style={{fontSize:16,fontWeight:800,color:heading,marginBottom:8}}>{s.title}</div>
                    <div style={{fontSize:13,lineHeight:1.7,color:sub}}>{s.desc}</div>
                  </div>
                  {i < 3 && (
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:36,fontFamily:fm,fontSize:18,color:border2,flexShrink:0}}>{"\u2192"}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{padding:"120px 48px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(120,120,160,.06) 1px,transparent 1px)",backgroundSize:"32px 32px",pointerEvents:"none",opacity:.3}} />
        <div style={{position:"absolute",width:700,height:700,top:"50%",left:"50%",transform:"translate(-50%,-50%)",borderRadius:"50%",background:"conic-gradient(from 180deg,rgba(18,163,125,.1),rgba(59,111,245,.1),rgba(124,92,252,.06),rgba(18,163,125,.1))",filter:"blur(100px)"}} />
        <div style={{position:"relative",zIndex:2,maxWidth:620,margin:"0 auto"}}>
          <div style={{...slabel,textAlign:"center"}}>JOIN US</div>
          <div style={{...stitle,textAlign:"center"}}>一緒に、営業の未来を<br />つくりませんか？</div>
          <p style={{...ssub,textAlign:"center",margin:"16px auto 40px"}}>少数精鋭のチームで、AIの力で営業のあたりまえを変える。あなたの力が必要です。</p>
          <div style={{display:"flex",gap:14,justifyContent:"center"}}>
            <button style={{border:"none",cursor:"pointer",fontFamily:fb,fontWeight:700,fontSize:18,padding:"18px 44px",borderRadius:14,background:grad,color:"#fff",boxShadow:"0 6px 32px rgba(18,163,125,.3)"}}>応募する</button>
            <button style={{background:"transparent",border:"2px solid "+border2,color:heading,padding:"16px 40px",borderRadius:14,fontSize:18,fontWeight:700,cursor:"pointer",fontFamily:fb}}>カジュアル面談を申し込む</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:"1px solid "+border,padding:"32px 48px",display:"flex",alignItems:"center",justifyContent:"space-between",background:surface}}>
        <div style={{fontFamily:fb,fontWeight:900,fontSize:16,color:sub,display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:24,height:24,borderRadius:7,background:grad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:"#fff"}}>D</div>
          DynaMeet K.K.
        </div>
        <div style={{display:"flex",gap:20}}>
          {["Meeton ai","Meeton Talent","会社概要","お問い合わせ"].map(function(l,i){
            return <a key={i} href="#" style={{fontSize:13,color:sub,textDecoration:"none",fontWeight:600}}>{l}</a>;
          })}
        </div>
        <div style={{fontSize:12,color:sub}}>© 2025 DynaMeet K.K.</div>
      </footer>
    </div>
  );
}
