/* Assertions for the eight research/writing panels added on top of the tool page.
   Unlike the smoke harness (which records only a truncated preview of each
   output), this reads the FULL rendered text of a panel and asserts on it. That
   distinction is load-bearing: the first negative-control run passed four
   injected defects because every piece of evidence they change sits past the
   preview cutoff. Run: node tests/assert_new.js <path-to-index.html> */
const {JSDOM} = require("jsdom");
const fs = require("fs");
const path = process.argv[2];
const html = fs.readFileSync(path, "utf8");

function stubBody(){
  return JSON.stringify({esearchresult:{idlist:[],count:"0"},resultList:{result:[]},
    hitCount:0,studies:[],totalCount:0,message:{items:[],"total-results":0},
    result:{uids:[],docs:[]},docs:[],updated:"2026-08-14",opportunities:[],items:[]});
}
const errs=[];
const dom = new JSDOM(html, {
  runScripts:"dangerously", pretendToBeVisual:true, url:"https://example.invalid/",
  beforeParse(w){
    w.fetch = ()=> Promise.resolve({ok:true,status:200,
      json:()=>Promise.resolve(JSON.parse(stubBody())),
      text:()=>Promise.resolve(stubBody())});
    w.console.error=(...a)=>errs.push(a.map(String).join(" "));
    w.onerror=(m)=>errs.push("onerror: "+m);
  }
});
const w=dom.window, d=w.document;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const fails=[];
function ck(cond, msg){ if(!cond) fails.push(msg); }
function txt(id){ const e=d.getElementById(id); return e?(e.textContent||"").replace(/\s+/g," "):""; }
function set(id,v){ const e=d.getElementById(id); if(!e){fails.push("missing control "+id);return;} e.value=v; }

setTimeout(async ()=>{
  try{ w.buildHelp(); }catch(e){ fails.push("buildHelp threw: "+e.message); }

  /* ---- every new panel must be registered, navigable, documented ---- */
  const NEW=["tpat","tzh","tjr","tletter","tguide","tdict","tgap","tprev"];
  for(const pid of NEW){
    ck(!!d.getElementById(pid), pid+": panel markup missing");
    ck(!!(w.HELP&&w.HELP[pid]), pid+": no HELP entry (help strip stays hidden)");
    ck(!!(w.TOOLDOC&&w.TOOLDOC[pid]), pid+": no TOOLDOC entry (absent from tool search)");
    ck(!!(w.RENDER_OF&&w.RENDER_OF[pid]), pid+": not in RENDER_OF (panel never re-renders)");
    ck(JSON.stringify(w.SIDE_NAV||[]).indexOf('"'+pid+'"')>=0, pid+": absent from SIDE_NAV");
    ck(JSON.stringify((w.HUB_SECTIONS||[]).map(x=>x.tools||[])).indexOf('"'+pid+'"')>=0,
       pid+": absent from HUB_SECTIONS");
    /* A panel with no top-tab button is only reachable via side nav / hub; the
       HTML validator caught all eight missing here while every JS-level check
       passed, because goPanel() works fine when called directly. */
    ck(!!d.querySelector('.tab[data-p="'+pid+'"]'), pid+": no .tab button (unreachable from the tab bar)");
    try{ w.goPanel(pid); ck(d.getElementById(pid).classList.contains("active"),
         pid+": goPanel did not activate the panel"); }
    catch(e){ fails.push(pid+": goPanel threw: "+e.message); }
    if(w.HELP&&w.HELP[pid]){
      ck((w.HELP[pid].ex||[]).length>0, pid+": HELP entry has no examples");
      ck(!!w.HELP[pid].caveat, pid+": HELP entry has no caveat");
    }
  }

  /* ---- pre-submission scaffold: per-pool budgets, none over its own limit ---- */
  for(const fk of ["k99","f32","r01"]){
    set("pvMode","scaffold"); set("pvFund",fk);
    try{ w.prevRun(); }catch(e){ fails.push("prevRun scaffold threw ("+fk+"): "+e.message); continue; }
    const out=txt("pvOut"), F=w.FUNDSPEC[fk];
    ck(!!F.pools, fk+": FUNDSPEC has no page pools");
    ck(out.indexOf("分池")>=0, fk+": scaffold does not state that pages are pooled");
    ck(out.indexOf("合计")<0, fk+": scaffold still sums all sections into one total");
    if(F.pools){
      const sums={}; F.secs.forEach(sc=>{ sums[sc[3]]=(sums[sc[3]]||0)+sc[1]; });
      F.pools.forEach(p=>ck((sums[p[0]]||0)<=p[2],
        fk+": pool "+p[0]+" allocates "+(sums[p[0]]||0)+" > limit "+p[2]));
    }
    ck(out.indexOf("超 ")<0, fk+": scaffold reports a pool over budget");
    ck(out.indexOf("NOFO")>=0||out.indexOf("指南原文")>=0,
       fk+": scaffold omits the confirm-against-official-notice warning");
  }

  /* ---- pre-submission self-check on real body text ---- */
  set("pvMode","check"); set("pvFund","k99");
  try{ w.pvDemoRun(); }catch(e){ fails.push("pvDemoRun threw: "+e.message); }
  await sleep(60);
  const pv=txt("pvOut");
  ck(pv.indexOf("估算页数")>=0, "check: no page estimate");
  const mPg=pv.match(/估算页数\s*([\d.]+)/);
  ck(mPg && parseFloat(mPg[1])>0, "check: page estimate is zero for non-empty text");
  ck(pv.indexOf("总量不超不等于每池都不超")>=0, "check: omits the pooled-limit caveat");
  ck(/✅/.test(pv), "check: no section matched on text containing Aims/pitfalls/power");
  ck(pv.indexOf("查不出")>=0, "check: omits the cannot-judge-quality disclaimer");

  /* ---- letter generator: boilerplate written, science left as placeholders ---- */
  for(const [ty,lang] of [["cover","en"],["revise","en"],["presub","zh"]]){
    set("leType",ty); set("leLang",lang);
    try{ w.leFillExample(); }catch(e){ fails.push("leFillExample threw ("+ty+"): "+e.message); continue; }
    const out=txt("leOut");
    ck(out.length>200, ty+": letter output too short");
    const body=(d.getElementById("lePre")||{}).textContent||"";
    const n=(body.match(/〔/g)||[]).length;
    ck(n>0, ty+": no 〔…〕 placeholders left — the site must not write the science");
    const m=out.match(/还有\s*(\d+)\s*处/);
    ck(m && parseInt(m[1],10)===n,
       ty+": stated placeholder count ("+(m?m[1]:"none")+") != actual ("+n+")");
    ck(out.indexOf("不代写")>=0, ty+": omits the will-not-ghostwrite statement");
  }

  /* ---- guideline checklists: every item names a manuscript section ---- */
  for(const gs of ["arrive","nih","mdar"]){
    set("guSet",gs);
    try{ w.renderGuide(); }catch(e){ fails.push("renderGuide threw ("+gs+"): "+e.message); continue; }
    const rows=[...d.querySelectorAll("#guOut tr")].slice(1);
    ck(rows.length>=4, gs+": too few checklist items ("+rows.length+")");
    let noSec=0;
    rows.forEach(tr=>{ const c=tr.querySelectorAll("td");
      if(c.length<3||!(c[2].textContent||"").trim()) noSec++; });
    ck(noSec===0, gs+": "+noSec+" items do not say which section they belong in");
    const g=txt("guOut");
    ck(g.indexOf("不代表写得清楚")>=0,
       gs+": omits the nothing-missing-is-not-well-written caveat on first view");
  }

  /* ---- gap scanner: must refuse a verdict when the expected count is tiny ---- */
  set("gpA",'TITLE_ABS:"ZSWIM8"'); set("gpB",'TITLE_ABS:"AMPK"'); set("gpY0","");
  try{ w.gapRun(); }catch(e){ fails.push("gapRun threw: "+e.message); }
  await sleep(300);
  const gp=txt("gpOut");
  ck(gp.length>0, "gap: empty output");
  ck(gp.indexOf("期望")>=0, "gap: no expected-under-independence figure");
  ck(gp.indexOf("无法判断")>=0, "gap: no 无法判断 verdict on a tiny denominator");
  ck(gp.indexOf("不能用来说")>=0 && gp.indexOf("不能证明空白")>=0,
     "gap: does not state that 0 hits proves neither gap nor infeasibility");

  /* ---- dictionary: empty MeSH result must explain itself, not look like a typo ---- */
  set("dcQ","lactylation");
  try{ w.dcSearch(); }catch(e){ fails.push("dcSearch threw: "+e.message); }
  await sleep(300);
  const dc=txt("dcOut");
  ck(dc.indexOf("不是拼错")>=0||dc.indexOf("缺词")>=0, "dict: empty result not explained");

  /* ---- external-limits page must still disclose what cannot be built ---- */
  try{ w.renderExt(); }catch(e){ fails.push("renderExt threw: "+e.message); }
  ck(txt("exOut").indexOf("影响因子")>=0, "external: no impact-factor disclosure");

  ck(errs.length===0, "console errors: "+errs.slice(0,3).join(" | "));
  fs.writeFileSync("/tmp/assert_new.json",
    JSON.stringify({nFail:fails.length, fails, errs:errs.slice(0,10)},null,1));
  console.log(fails.length? ("FAIL "+fails.length) : "PASS");
}, 1800);
