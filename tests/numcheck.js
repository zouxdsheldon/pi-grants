/* numcheck.js — runs the site's own JS math on the same inputs as the
   Python reference, then prints raw JS output. Comparison happens in
   Python against scipy/statsmodels; nothing here reads the reference. */
const fs=require("fs"),{JSDOM,VirtualConsole}=require("jsdom");
const html=fs.readFileSync(process.argv[2],"utf8");
const ref=JSON.parse(fs.readFileSync(process.argv[3],"utf8"));
const vc=new VirtualConsole();
const dom=new JSDOM(html,{runScripts:"dangerously",url:"https://x.test/",virtualConsole:vc});
const w=dom.window;
setTimeout(()=>{
  const I=ref._inputs, out={};
  const g=n=>typeof w[n]==="function"?w[n]:null;
  try{ out.ttest2=g("ttest2")(I.A,I.B); }catch(e){ out.ttest2={err:e.message}; }
  try{ out.mannwhitney=g("mannWhitney")(I.A,I.B); }catch(e){ out.mannwhitney={err:e.message}; }
  try{ out.pearson=g("pearson")(I.x,I.y); }catch(e){ out.pearson={err:e.message}; }
  try{ out.spearman=g("spearman")(I.x,I.y); }catch(e){ out.spearman={err:e.message}; }
  try{ out.pca=g("pcaPower")(I.M,3); }catch(e){ out.pca={err:e.message}; }
  try{ out.power={p_d08_n20:g("powerT")(0.8,20,0.05),
                  anova:g("powerAnovaN")(0.4,0.05,60,3)}; }catch(e){ out.power={err:e.message}; }
  try{ out.norm={q975:g("normQ")(0.975),q995:g("normQ")(0.995),cdf196:g("normCdf")(1.96),
                 tq975df10:(g("tQ")?g("tQ")(0.975,10):null)}; }catch(e){ out.norm={err:e.message}; }
  try{ const adj=g("padjust")||g("adjustP")||g("bhAdjust");
       out.multitest=adj?{bh:adj(ref.multitest.raw,"bh"),by:adj(ref.multitest.raw,"by"),bonf:adj(ref.multitest.raw,"bonf"),
                          holm:adj(ref.multitest.raw,"holm")}:{err:"no adjust fn found"};
  }catch(e){ out.multitest={err:e.message}; }
  try{ out.seq={gc:g("gcPct")("ATGCGCGATCGATCGGGCC"),tm:g("tmOf")("ATGCGCGATCGATCGGGCC"),
                tmShort:g("tmOf")("ATGCGCGATC")}; }catch(e){ out.seq={err:e.message}; }
  fs.writeFileSync("/tmp/js_numbers.json",JSON.stringify(out,null,1));
  console.log("wrote", Object.keys(out).join(","));
},2500);
