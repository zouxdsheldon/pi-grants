
/* 企业岗位面板 —— 行为测试
 * 测的是「看着对、实际错」的失效模式:分数被公司样板污染、词界假阳性、
 * 职能族计数在选中后归零(切不动)、非研究族挤占前排、折减标注说谎。 */
const fs=require("fs"), path=require("path");
const {JSDOM}=require("jsdom");
const ROOT=path.join(__dirname,"..");
const html=fs.readFileSync(path.join(ROOT,"index.html"),"utf8");
const D=JSON.parse(fs.readFileSync(path.join(ROOT,"data/industry_jobs.json"),"utf8"));
let pass=0, fail=0;
function ck(id,cond,msg){ if(cond){pass++;console.log("  ok   "+id);} else {fail++;console.log("  FAIL "+id+" — "+msg);} }

/* ---- 数据层断言(不需要 DOM) ---- */
const J=D.jobs;
ck("D1", J.length>50, "岗位数过少:"+J.length);
ck("D2", D.n_companies>=15, "公司数过少:"+D.n_companies);

// D3 词界:纯假阳性词不得出现在 hits
const DECOY=[["liver",/\bdelivering|\bdelivery|\bdeliver\b/i],["rna",/\bexternal|\binternal|\balternative/i],["cell",/\bexcellent/i]];
let wb=0;
for(const j of J){
  const blob=((j.title||"")+" "+(j.desc||"")).toLowerCase();
  for(const h of (j.hits||[])){
    // hits 里的词必须能在正文以词界形式找到
    const rx=new RegExp("(?<![a-z])"+h.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"[a-z]{0,6}(?![a-z])");
    if(!rx.test(blob)) wb++;
  }
}
ck("D3", wb===0, wb+" 个 hits 在正文里找不到词界匹配(裸子串假阳性回归)");

// D4 样板剔除:desc 不得为空(空=正文被吃光,无法打分)
const empty=J.filter(j=>!j.desc||!j.desc.trim()).length;
ck("D4", empty===0, empty+" 条 desc 为空 —— 截断顺序 bug 回归(先截 600 再剔样板)");

// D5 样板剔除确实发生
ck("D5", D.n_boilerplate_sents>0, "未检出任何样板句,剔除逻辑可能失效");

// D6 公司简介句不得留在 desc 里(用最典型的一句作探针)
const blurb=J.filter(j=>/is a (biotechnology|clinical.stage|biopharmaceutical) company/i.test(j.desc||"")).length;
ck("D6", blurb===0, blurb+" 条 desc 仍含公司简介句");

// D7 设施/销售岗不得高分(公司平台词污染的典型受害者)
const bad=J.filter(j=>/Facilities|Treatment Center Quality|Key Account Manager/i.test(j.title)&&j.score>=4);
ck("D7", bad.length===0, "非研究岗高分:"+bad.map(j=>j.score+" "+j.title).join(" | "));

// D8 折减标注不说谎:raw_score 与 score 不等 ⇔ 该族权重<1
const W=D.fam_weight||{};
let lie=0;
for(const j of J){
  const w=W[j.fam]!==undefined?W[j.fam]:1;
  const expect=Math.round((j.raw_score||0)*w);
  if(expect!==j.score) lie++;
}
ck("D8", lie===0, lie+" 条 score 与 raw_score×族权重 不符");
ck("D8b", Object.keys(W).length>0, "meta 缺 fam_weight,前端无法核对折减");

// D9 非研究族不得占据 Top10(排序意图)
const NR={field:1,ops:1,biz:1};
const top=J.slice().sort((a,b)=>b.score-a.score).slice(0,10);
ck("D9", top.filter(j=>NR[j.fam]).length<=2, "Top10 中非研究族过多:"+top.filter(j=>NR[j.fam]).length);

// D10 测试岗已剔除
ck("D10", J.filter(j=>/\bTEST\b|KF Offer Test/i.test(j.title)).length===0, "招聘板测试岗被当真岗收录");

// D11 每条都有可用 URL
ck("D11", J.every(j=>/^https?:\/\//.test(j.url||"")), "存在无效 url");

// D12 职能族标签齐全
ck("D12", J.every(j=>j.fam&&j.famlabel), "存在缺 fam/famlabel 的条目");

// D13 「其它」不得成为主要类别(分类等于没分类)
const oth=J.filter(j=>j.fam==="other").length;
ck("D13", oth/J.length<0.30, "other 占比过高:"+(100*oth/J.length).toFixed(0)+"%");

/* ---- DOM 层断言 ---- */
const dom=new JSDOM(html,{runScripts:"outside-only"});
const doc=dom.window.document;
for(const id of ["ind","indWrap","indFamChips","indRegionChips","indBanner","indStatus",
                 "indq","indCoSel","indCat","indFit","indDays","indSort","ind_onlytrk","ind_hidenr","indRst"])
  ck("H:"+id, !!doc.getElementById(id), "缺元素 #"+id);
ck("H-tab", !!doc.querySelector('.tab[data-p="ind"]'), "缺顶栏标签");

/* ---- 源码层断言:接线是否真的接上 ---- */
ck("W1", /if\(t\.dataset\.p==="ind"\)renderInd\(\)/.test(html), "面板切换未调用 renderInd");
ck("W2", /IJOBS=ijb\.jobs/.test(html), "未从 industry_jobs.json 赋值 IJOBS");
ck("W3", /fetch\("data\/industry_jobs\.json/.test(html), "未加载数据文件");
ck("W4", /getElementById\("indq"\)\.addEventListener\("input",renderInd\)/.test(html), "搜索框未绑定");
ck("W5", /\["indCoSel","indCat","indFit","indDays","indSort","ind_onlytrk","ind_hidenr"\]\.forEach/.test(html), "下拉/勾选未批量绑定");
ck("W6", /getElementById\("indRst"\)\.onclick/.test(html), "重置未绑定");

/* W7 族 chip 计数必须排除自身筛选 —— 否则选中一族后其它族归零,切不动 */
const rd=html.slice(html.indexOf("function renderInd()"));
const famBlock=rd.slice(rd.indexOf("famBox.innerHTML"), rd.indexOf("facetChips(document.getElementById(\"indRegionChips\")"));
ck("W7", /ipass\(j,"fam"\)/.test(famBlock)&&!/ipass\(j,null\)/.test(famBlock),
   "族 chip 计数用了全筛选(选中一族后其它族会变 0,无法切换)");
/* W8 地区 chip 同理 */
ck("W8", /ipass\(j,"rg"\)/.test(rd), "地区 chip 计数未排除自身");
/* W9 公司/类型下拉同理 */
ck("W9", /ipass\(j,"co"\)/.test(rd)&&/ipass\(j,"cat"\)/.test(rd), "公司/类型下拉计数未排除自身");
/* W10 公司类型下拉必须用中文标签,不能显示 rna/degrade 短码 */
/* 判据是「传了标签映射函数」这个性质,不绑具体拼写 —— 否则重构一次就假红。
   catName 已在 W16 断言过会取二元组的 [0]。 */
const catCall=rd.slice(rd.indexOf('facetSel(document.getElementById("indCat")'));
ck("W10", /^facetSel\([\s\S]{0,200}?catName\s*\)/.test(catCall)&&/labelOf/.test(html),
   "类型下拉未传标签映射函数(会显示 rna/degrade 短码)");
/* W11 隐藏非研究职能必须是用户可选,不能默认硬隐藏 */
ck("W11", /hideNR&&NONRES\[j\.fam\]/.test(rd)&&/id="ind_hidenr"(?![^>]*checked)/.test(html),
   "非研究职能被默认隐藏(应折减不隐藏)");
/* W12 折减标注只在真折减时出现 */
ck("W12", /j\.raw_score!=null&&j\.raw_score!==j\.score/.test(rd), "折减标注未做条件判断");
/* W13 侧栏计数会被设置 */
ck("W13", /getElementById\("indN"\)/.test(rd), "侧栏计数 indN 未设置");
/* W14 关注功能进管线 */
ck("W14", /function trackInd/.test(html)&&/tracked\["ind_"\+id\]/.test(rd), "关注功能缺失");
/* W15 XSS:公司/岗位名必须转义 */
/* W15 转义:不点名单个字段,而是**枚举卡片模板里所有外部字段**。
   上一版只查 j.title,所以我把 catName 的 esc2 去掉时它照过(N12 漏报)。
   判据:卡片模板中任何 +j.xxx / +catName(...) 形式的插值都必须被 esc2 包住,
   url 走属性上下文,单独提前转成 U。 */
const cardTpl=rd.slice(rd.indexOf("R.forEach"));
const bare=(cardTpl.match(/\+\s*(?:j\.[A-Za-z_]+|catName\([^)]*\))/g)||[])
  .filter(x=>!/\+\s*j\.(raw_score|score|cnote|desc|url|hits|fam|cat|title|company|location|region|ats|famlabel|date)\b/.test(x)||false);
const unesc=[];
["title","company","location","region","ats","famlabel","cnote","desc"].forEach(f=>{
  const re=new RegExp("esc2\\(\\s*j\\."+f);
  if(cardTpl.indexOf("j."+f)>=0 && !re.test(cardTpl)) unesc.push(f);
});
if(cardTpl.indexOf("catName(j.cat)")>=0 && !/esc2\(catName\(j\.cat\)\)/.test(cardTpl)) unesc.push("cat(标签)");
if(/href="'\+j\.url\+'/.test(cardTpl)) unesc.push("url(href 属性未转义)");
ck("W15", unesc.length===0, "未转义的外部字段:"+unesc.join(","));

/* W16 公司类型必须取二元组的标签项,不能把备注整段插进下拉框 */
ck("W16", /Array\.isArray\(v\)\?v\[0\]/.test(rd), "cat_label 二元组未取 [0](备注会被写进下拉框)");
ck("W17", !/CATL\[j\.cat\]/.test(rd), "仍有直接插值 CATL[j.cat] 的地方");
/* D14 cat_label 契约:值必须是 [标签, 备注] */
ck("D14", Object.values(D.cat_label||{}).every(v=>Array.isArray(v)&&v.length>=1),
   "cat_label 结构变了,前端取值逻辑会失效");

console.log("\n"+pass+" pass / "+fail+" fail");
process.exit(fail?1:0);
