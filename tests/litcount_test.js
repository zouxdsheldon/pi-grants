
/* 检索面板取回条数上限 —— 真实网络行为测试
 * 为什么要连真网:分批逻辑的失败模式(414 / 429 / 只取回第一批)全都只在
 * 真实 API 上出现,替身 fetch 一律绿灯,等于没测。 */
const fs=require("fs"), path=require("path");
const {JSDOM}=require("jsdom");
const root=path.resolve(__dirname,"..");
const html=fs.readFileSync(path.join(root,"index.html"),"utf8");
const DATA={};
for(const f of fs.readdirSync(path.join(root,"data")))
  if(f.endsWith(".json")) try{DATA[f]=fs.readFileSync(path.join(root,"data",f),"utf8")}catch(e){}
let pass=0,fail=0;
const ok=(c,m)=>{ if(!c) throw new Error(m||"assert"); };
const dom=new JSDOM(html,{runScripts:"dangerously",url:"https://example.github.io/pi-grants/",
  beforeParse(win){
    /* 沙箱内没有直连 DNS,出网只走 HTTP 代理;Node 内置 fetch 不读 HTTP_PROXY,
 * 必须显式挂 ProxyAgent,否则全部 ENOTFOUND —— 那是环境问题不是被测代码的问题,
 * 但"环境问题"不能当通过,所以这里把代理配好让断言真的打到线上 API。 */
(function(){
  const px=process.env.HTTPS_PROXY||process.env.https_proxy||process.env.HTTP_PROXY||process.env.http_proxy;
  if(px){ try{ const {setGlobalDispatcher,ProxyAgent}=require("undici");
    setGlobalDispatcher(new ProxyAgent(px)); }catch(e){ console.log("  (未挂上代理:"+e.message+")"); } }
})();
const realFetch=globalThis.fetch;   // Node 18+ 自带
    win.fetch=(u,o)=>{
      const name=String(u).split("/").pop().split("?")[0];
      if(DATA[name]) return Promise.resolve({ok:true,status:200,
        json:()=>Promise.resolve(JSON.parse(DATA[name])),text:()=>Promise.resolve(DATA[name])});
      return realFetch(String(u),o);   // 外部 API 走真网
    };
    win.matchMedia=()=>({matches:false,addListener(){},removeListener(){}});
    win.URL.createObjectURL=()=>"blob:stub";
  }});
const win=dom.window, doc=win.document;
const T=async(name,fn)=>{ try{ await fn(); console.log("  ok   "+name); pass++; }
  catch(e){ console.log("  FAIL "+name+" — "+(e&&e.message||e)); fail++; } };
function run(q,src,n){
  doc.getElementById("ltQ").value=q;
  doc.getElementById("ltSrc").value=src;
  doc.getElementById("ltN").value=String(n);
  win.eval("renderLit()");
  return new Promise((res,rej)=>{
    const t0=Date.now();
    const iv=setInterval(()=>{
      const L=win.eval("typeof LIT_LAST!=='undefined'?LIT_LAST:null");
      const txt=doc.getElementById("ltOut").textContent||"";
      if(L&&L.recs&&L.q===q&&L.recs.length&&!/正在/.test(txt)){clearInterval(iv);res({n:L.recs.length,txt,blank:(L.blank||0),recs:L.recs});}
      else if(Date.now()-t0>120000){clearInterval(iv);rej(new Error("timeout: "+txt.slice(0,120)));}
    },300);
  });
}
setTimeout(async()=>{
  console.log("== 检索条数上限(真实网络) ==");
  await T("L1 选项含 200/500/1000",()=>{
    const v=[...doc.getElementById("ltN").options].map(o=>o.value);
    ok(v.includes("1000"),"缺 1000 选项,got="+v.join(","));
  });
  await T("L2 PubMed 取 500 条:分批必须取满,不能只回第一批 200",async()=>{
    const r=await run("hiapp","pubmed",500);
    ok(r.n===500,"应取回 500 条(总命中>500),实得 "+r.n+
       " —— 只回 200 说明分批链断了;0/报错多半是 414 或 429");
    /* 光数条数抓不到丢批次:recs 是拿 esearch 的 id 列表建的,某批 esummary 掉了
       条数照样 500,只是标题期刊全空。必须查实际内容。 */
    ok(r.blank===0,"有 "+r.blank+"/"+r.n+" 条只有 PMID、没有标题 —— 某批 esummary 没取回来");
    const withJ=r.recs.filter(x=>x.journal).length;
    ok(withJ>r.n*0.9,"只有 "+withJ+"/"+r.n+" 条拿到期刊名,元数据合并可能漏批");
  });
  await T("L3 Europe PMC 取 500 条",async()=>{
    const r=await run("hiapp","epmc",500);
    ok(r.n===500,"应取回 500 条,实得 "+r.n);
  });
  await T("L4 提示文案说明真实上限与分批代价",async()=>{
    const r=await run("hiapp","pubmed",100);
    ok(/1000/.test(r.txt),"提示应写明最多 1000 条。got="+r.txt.slice(0,160));
    ok(/200 条一批|批/.test(r.txt),"PubMed 应说明是分批取的");
  });
  console.log("\n"+pass+" passed, "+fail+" failed");
  process.exit(fail?1:0);
},1200);
