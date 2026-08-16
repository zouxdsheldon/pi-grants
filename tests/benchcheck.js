const fs=require("fs"), {JSDOM}=require("jsdom");
const html=fs.readFileSync(process.argv[2],"utf8");
const dom=new JSDOM(html,{runScripts:"dangerously",pretendToBeVisual:true,
  beforeParse(w){ w.fetch=()=>Promise.resolve({ok:true,json:()=>Promise.resolve([]),text:()=>Promise.resolve("[]")}); }});
const w=dom.window;
setTimeout(()=>{
  const D=w.document, out={};
  function run(mode,vals){
    D.getElementById("bcMode").value=mode;
    ["A","B","C","D"].forEach((k,i)=>{const e=D.getElementById("bc"+k); if(e) e.value=(vals[i]===null?"":String(vals[i]));});
    w.benchRun();
    return D.getElementById("bcOut").textContent;
  }
  out.dil  = run("dil",  [100, null, 2.5, 40]);
  out.mol  = run("mol",  [12.5, 350.4, null, null]);
  out.buf  = run("buf",  [7.20, 7.60, 50, 250]);
  out.rcf  = run("rcf",  [12000, 8.5, null, null]);
  out.rpm  = run("rcf",  [null, 8.5, 16000, null]);
  out.ddct = run("ddct", [22.41, 18.03, 24.87, 18.11]);
  out.beer = run("beer", [0.842, 43824, 0.5, 27.5]);
  out.dna  = run("dna",  [0.187, 50, 1, 0.098]);
  out.seq  = {gc:w.gcPct("ATGCGGCCGCTTAAGGCATCGATCCGGATC"), tm:w.tmOf("ATGCGGCCGCTTAAGGCATCGATCCGGATC"),
              tmShort:w.tmOf("ATGCGGCCGCTT")};
  fs.writeFileSync("/tmp/js_bench.json", JSON.stringify(out,null,1));
  console.log("wrote", Object.keys(out).join(","));
},2500);
