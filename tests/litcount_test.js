
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
      if(L&&L.recs&&L.q===q&&L.recs.length&&!/正在/.test(txt)){clearInterval(iv);res({n:L.recs.length,txt});}
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
