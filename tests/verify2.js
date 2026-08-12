
const {JSDOM}=require("jsdom"); const fs=require("fs");
const dom=new JSDOM(fs.readFileSync(process.argv[2],"utf8"),
  {runScripts:"dangerously",url:"https://example.invalid/",
   beforeParse(w){ w.fetch=()=>Promise.resolve({ok:true,status:200,
     json:()=>Promise.resolve({}),text:()=>Promise.resolve("{}")}); }});
const w=dom.window;
setTimeout(()=>{
  const E=JSON.parse(fs.readFileSync("exp2.json","utf8"));
  const A=[5.1,4.8,6.2,5.5,4.9,5.3], B=[7.2,8.1,6.9,7.7,8.4,7.5];
  const G=[[5.1,4.8,6.2,5.5],[7.2,8.1,6.9,7.7],[6.0,6.4,5.8,6.6]];
  const t=w.ttest2(A,B), a=w.anova1(G);
  let fails=[];
  function eq(nm,got,want,tol){ const ok=Math.abs(got-want)<=tol*Math.max(1,Math.abs(want));
    if(!ok)fails.push(nm+": js="+got+" ref="+want); }
  // sign convention: page reports B−A; scipy's ttest_ind(A,B) is A−B
  eq("tS",t.tS,-E.tS,1e-6); eq("pS",t.pS,E.pS,1e-6);
  eq("tW",t.tW,-E.tW,1e-6); eq("pW",t.pW,E.pW,1e-6); eq("dfW",t.dfW,E.dfw,1e-9);
  eq("d",t.d,E.d,1e-9); eq("g",t.g,E.g,1e-9); eq("diff",t.diff,E.diff,1e-9);
  eq("ciLo",t.ciLo,E.ci[0],1e-6);  eq("ciHi",t.ciHi,E.ci[1],1e-6);
  eq("ciLoW",t.ciLoW,E.ciW[0],1e-6); eq("ciHiW",t.ciHiW,E.ciW[1],1e-6);
  eq("F",a.F,E.F,1e-9); eq("pAnova",a.p,E.pA,1e-6);
  eq("eta2",a.eta2,E.eta2,1e-9); eq("omega2",a.omega2,E.om2,1e-9);
  eq("cohenF",a.f,E.fco,1e-9); eq("ssB",a.ssB,E.ssb,1e-9);
  eq("ssW",a.ssW,E.ssw,1e-9); eq("msW",a.msW,E.msw,1e-9);
  eq("nPerGroupT",Math.ceil(w.nPerGroupT(0.8,0.05,0.8)),E.nreq,0);
  eq("powerT@n",w.powerT(0.8,E.nreq,0.05),E.ach,2e-3);
  eq("nAnovaTotal",Math.ceil(w.nAnovaTotal(0.25,0.05,0.8,3)),E.Nt,0);
  eq("powerAnovaN",w.powerAnovaN(0.25,0.05,E.Nt,3),E.achA,3e-3);
  // unequal n (9 vs 4): pooled and Welch SE are algebraically identical when n is
  // equal, so only an unequal-n case can tell the two intervals apart.
  const A2=[5.1,4.8,6.2,5.5,4.9,5.3,5.0,5.4,4.7], B2=[7.2,8.1,6.9,7.7];
  const t2=w.ttest2(A2,B2), W2=w.mannWhitney(A2,B2);
  eq("u_se",t2.se,E.se2,1e-9);   eq("u_seW",t2.seW,E.seW2,1e-9);
  eq("u_dfW",t2.dfW,E.dfw2,1e-9); eq("u_diff",t2.diff,E.diff2,1e-9);
  eq("u_tS",t2.tS,-E.tS2,1e-6);  eq("u_pS",t2.pS,E.pS2,1e-6);
  eq("u_tW",t2.tW,-E.tW2,1e-6);  eq("u_pW",t2.pW,E.pW2,1e-6);
  eq("u_ciLo",t2.ciLo,E.ci2[0],1e-6);   eq("u_ciHi",t2.ciHi,E.ci2[1],1e-6);
  eq("u_ciLoW",t2.ciLoW,E.ciW2[0],1e-6); eq("u_ciHiW",t2.ciHiW,E.ciW2[1],1e-6);
  eq("u_U",W2.U,E.U2,1e-9);
  console.log(fails.length?("FAILS "+fails.length+"\n"+fails.join("\n")):"ALL 35 MATCH");
},1200);
