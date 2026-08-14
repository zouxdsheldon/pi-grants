
const {JSDOM} = require("jsdom");
const fs = require("fs");
const path = process.argv[2];
const html = fs.readFileSync(path, "utf8");

// Offline stub: every network call resolves to a shaped-but-empty payload so we
// exercise the render/compute paths without hitting real APIs. Local data/*.json
// get real empty collections; anything else gets an empty API envelope.
const EMPTY = {
  "data/grants.json": {updated:"2026-08-12", opportunities:[]},
  "data/curated.json": {updated:"2026-08-12", items:[]},
};
function stubBody(u){
  for(const k in EMPTY) if(u.indexOf(k)>=0) return JSON.stringify(EMPTY[k]);
  return JSON.stringify({esearchresult:{idlist:[],count:"0"},resultList:{result:[]},
    hitCount:0,studies:[],totalCount:0,PropertyTable:{Properties:[]},
    InformationList:{Information:[]},result:{uids:[],docs:[]},docs:[]});
}
const errs=[], warns=[];
const dom = new JSDOM(html, {
  runScripts:"dangerously", pretendToBeVisual:true, url:"https://example.invalid/",
  beforeParse(w){
    w.fetch = (u,o)=> Promise.resolve({ok:true,status:200,
      json:()=>Promise.resolve(JSON.parse(stubBody(String(u)))),
      text:()=>Promise.resolve(stubBody(String(u)))});
    w.console.error=(...a)=>errs.push(a.map(String).join(" "));
    w.console.warn =(...a)=>warns.push(a.map(String).join(" "));
    w.onerror=(m)=>errs.push("onerror: "+m);
  }
});
const w = dom.window, d = w.document;

const sleep=ms=>new Promise(r=>setTimeout(r,ms));
setTimeout(async ()=>{
  const report={panels:[],errs:[],warns:[]};
  // 1) every tab button must resolve to an existing panel
  const btns=[...d.querySelectorAll("[data-p],[data-tab],.tab")];
  // 2) walk each tool panel: open help, click every example, record output length
  const PIDS=["tlit","tbib","tcite","tgene","ttrial","tstat","tde","tclone","tbench","texternal",
              "tsite","tseq","tprimer","tlookup",
              "tpat","tzh","tjr","tletter","tguide","tdict","tgap","tprev","tsearch"];
  try{ w.buildHelp(); }catch(e){ report.errs.push("buildHelp: "+e.message); }
  for(const pid of PIDS){
    const panel=d.getElementById(pid);
    const row={pid, exists:!!panel, examples:[], help:!!(w.HELP&&w.HELP[pid])};
    if(panel){
      const exb=[...d.querySelectorAll('[data-ex^="'+pid+'|"]')];
      row.nEx=exb.length;
      for(let i=0;i<exb.length;i++){
        const b=exb[i], before=errs.length;
        let thrown=null;
        try{ b.click(); }catch(e){ thrown=e.message; }
        await sleep(120);                     // let the stubbed fetch promises settle
        const outs=[...panel.querySelectorAll('[id$="Out"]')];
        const txt=outs.map(e=>e.textContent||"").join(" ");
        row.examples.push({t:b.textContent.trim().slice(0,26), outLen:txt.length,
                           head:txt.replace(/\s+/g," ").slice(0,110), thrown,
                           newErrs:errs.slice(before)});
      }
    }
    report.panels.push(row);
  }
  // texternal has no examples by design — render it directly
  try{ w.renderExt(); const e=d.getElementById("exOut");
       report.ext=(e?e.textContent:"").replace(/\s+/g," ").slice(0,160);
  }catch(e){ report.ext="THREW: "+e.message; }
  report.errs=errs.slice(0,40); report.warns=warns.slice(0,40);
  fs.writeFileSync("/tmp/smoke3.json", JSON.stringify(report,null,1));
  console.log("done");
}, 1500);
