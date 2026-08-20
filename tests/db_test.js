
/* 数据库导航面板 —— 行为测试
 * 重点不是"能渲染",而是三件会骗人的事:
 *  1) 每条必须有「怎么用」,否则这一页退化成又一个书签列表
 *  2) 「已实测可达」不能乱标 —— 标了就得是真验证过的
 *  3) 筛选必须真的筛,不能筛完还是全量
 */
const fs=require("fs");
const {JSDOM}=require("jsdom");
const html=fs.readFileSync(__dirname+"/../index.html","utf8");
const dom=new JSDOM(html,{runScripts:"dangerously",url:"https://example.org/",
  virtualConsole:new (require("jsdom").VirtualConsole)()});
const w=dom.window, d=w.document;
let pass=0, fails=[];
function ck(name,cond){ if(cond) pass++; else fails.push(name); }

const CAT = w.DBCAT;
ck("D1 DBCAT 存在且非空", Array.isArray(CAT) && CAT.length>0);

// D2: 每一条都必须有链接/描述/怎么用 —— 缺一条这页就没价值
let missing=[];
CAT.forEach(g=>g.it.forEach(x=>{
  if(!x.n||!x.u||!x.d||!x.h) missing.push(g.g+"/"+(x.n||"?"));
}));
ck("D2 每条都有 名称+链接+说明+怎么用 (缺: "+missing.join(",")+")", missing.length===0);

// D3: 链接必须是 http(s) 绝对地址,不能有相对路径或占位符
let badurl=[];
CAT.forEach(g=>g.it.forEach(x=>{
  if(!/^https?:\/\//.test(x.u)) badurl.push(x.n);
  if(x.q && !/^https?:\/\//.test(x.q)) badurl.push(x.n+"(q)");
}));
ck("D4 全部为绝对 http(s) 链接 (坏: "+badurl.join(",")+")", badurl.length===0);

// D4: 检索模板必须含 {q} 占位符,否则"带词打开"是假的
let badq=[];
CAT.forEach(g=>g.it.forEach(x=>{
  if(x.q && x.q.indexOf("{q}")<0 && x.q!==x.u) badq.push(x.n);
}));
ck("D5 带检索模板的都含 {q} (否则带词打开是假的: "+badq.join(",")+")", badq.length===0);

// D5: 渲染后 DOM 里真的出现了「怎么用」块,数量等于条目数
d.getElementById("dbF").value="";
d.getElementById("dbQ").value="";
w.renderDB();
const total=CAT.reduce((a,g)=>a+g.it.length,0);
const useBlocks=d.querySelectorAll("#dbList .dbuse").length;
ck("D6 渲染出的「怎么用」块数 == 条目数 ("+useBlocks+"/"+total+")", useBlocks===total);

// D6: 筛选真的会缩小结果集
d.getElementById("dbF").value="磷酸化";
w.renderDB();
const afterFilter=d.querySelectorAll("#dbList .dbcard").length;
ck("D7 筛选后条目变少 ("+afterFilter+" < "+total+")", afterFilter>0 && afterFilter<total);

// D7: 筛不到时必须给出可操作的提示,不能白屏
d.getElementById("dbF").value="zzzz不存在的词zzzz";
w.renderDB();
const emptyTxt=d.getElementById("dbList").textContent;
ck("D8 空结果有提示而非白屏", emptyTxt.indexOf("没有匹配")>=0 && emptyTxt.indexOf("清空")>=0);

// D8: 「带词打开」必须真的把词拼进链接
d.getElementById("dbF").value="";
d.getElementById("dbQ").value="ZSWIM8";
w.renderDB();
const links=[...d.querySelectorAll("#dbList a.sq")].map(a=>a.getAttribute("href"));
ck("D9 带词打开的链接确实含检索词", links.length>0 && links.some(h=>h.indexOf("ZSWIM8")>=0));
ck("D10 不再残留未替换的 {q}", !links.some(h=>h.indexOf("{q}")>=0));

// D9: 诚实性 —— 面板必须说明"未逐一实测"和"不代理"
const panel=d.getElementById("tdb").textContent;
ck("D11 声明了未逐一实测", panel.indexOf("未逐一实测")>=0);
ck("D12 声明了不代理/不缓存", panel.indexOf("不代理")>=0 && panel.indexOf("不缓存")>=0);

// D10: 已实测标记的数量必须与数据一致(不能 UI 上多标)
const vData=CAT.reduce((a,g)=>a+g.it.filter(x=>x.v).length,0);
d.getElementById("dbQ").value="";
w.renderDB();
const vDom=d.querySelectorAll("#dbList .dbver").length;
ck("D13 已实测标记数一致 (dom "+vDom+" == data "+vData+")", vDom===vData);
ck("D14 已实测标记不是全部(说明确实做了区分)", vData>0 && vData<total);

console.log("pass="+pass+" fail="+fails.length);
fails.forEach(f=>console.log("  FAIL "+f));
process.exit(fails.length?1:0);
