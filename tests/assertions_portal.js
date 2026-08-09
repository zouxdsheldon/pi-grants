
/* ==========================================================
   门户 / 全局搜索 / 期刊查选 —— 诚实性断言
   断言的不是"没报错",而是这些契约:
     · 门户卡片上的数字必须是对现有数据实时数出来的,不能写死
     · 每张卡片都要能真的跳到一个存在的面板(死卡片必须被发现)
     · 全局搜索是 AND 语义:加一个词只能让结果变少或不变
     · 每组标题上的条数必须是真实命中数,不是展示出来的 5 条
     · 没命中时必须解释匹配规则,不能只给一片空白
     · 样本不足的期刊必须显示"样本不足",绝不能给百分比
     · 期刊的发文数必须能从 papers.json 原地复算出来
     · 层级判定必须是精确匹配,子串误命中必须被抓到
   ========================================================== */
LIVE = T.live; CURATED = T.curated; JOBS = T.jobs;
PAPERS = T.papers; PAPMETA = T.papmeta; CITENET = T.citenet;
INTERESTS = T.interests; INTMAP = {}; INTERESTS.forEach(function(x){INTMAP[x.id]=x;});
CHANGES = T.changes;
JOURNALS = T.journals; JMETA = T.jmeta;

var fails = 0, checks = 0;
function ck(cond,msg){ checks++; if(!cond){ print("FAIL: "+msg); fails++; } }

/* ---------- A. 门户首页 ---------- */
renderHub();
var hub = ELS.hubTools.innerHTML;
ck(hub.length > 500, "hub rendered empty");
ck(!/>\s*undefined|undefined\s*(?:<|%|\))/.test(hub), "hub leaked undefined");
ck(!/(?:>|:|\()\s*NaN/.test(hub), "hub leaked NaN");

/* A1. 每个分区都要出现 */
HUB_SECTIONS.forEach(function(s){
  ck(hub.indexOf(s.h.replace(/&/g,"&amp;")) >= 0 || hub.indexOf(s.h) >= 0,
     "hub section missing: "+s.h);
});

/* A2. 活数字必须等于对应数据源的真实长度 —— 写死的数字会在这里被抓住 */
var EXPECT = {};
EXPECT["美国联邦资助"] = LIVE.length;
EXPECT["各国 PI 资助"] = CURATED.length;
EXPECT["学术职位"]     = JOBS.length;
EXPECT["文献追踪"]     = PAPERS.length;
EXPECT["期刊查选"]     = JOURNALS.length;
EXPECT["更新动态"]     = CHANGES.length;
HUB_SECTIONS.forEach(function(s){
  s.tools.forEach(function(t){
    if(EXPECT[t.nm] === undefined) return;
    var got;
    try{ got = t.cnt(); }catch(e){ got = "threw:"+e; }
    ck(got === EXPECT[t.nm],
       "hub count for 「"+t.nm+"」 is "+got+" but data has "+EXPECT[t.nm]+" (hardcoded?)");
  });
});

/* A3. 每个数字都要真的出现在渲染出的 HTML 里(绑错模板会在这里被抓住) */
HUB_SECTIONS.forEach(function(s){
  s.tools.forEach(function(t){
    if(EXPECT[t.nm] === undefined) return;
    ck(hub.indexOf("<span>"+EXPECT[t.nm]+"</span>") >= 0,
       "hub HTML never shows the count for 「"+t.nm+"」 ("+EXPECT[t.nm]+")");
  });
});

/* A4. 没有死卡片:每张内部卡片的目标面板必须是真实存在的面板 id */
var PANEL_IDS = T.panel_ids;
HUB_SECTIONS.forEach(function(s){
  s.tools.forEach(function(t){
    if(t.ext){ ck(/^https?:\/\//.test(t.ext), "external tool 「"+t.nm+"」 has a bad URL"); return; }
    ck(PANEL_IDS.indexOf(t.p) >= 0, "hub tool 「"+t.nm+"」 points at non-existent panel: "+t.p);
  });
});

/* A5. goPanel 真的会去点那个 tab */
CLICKED = [];
goPanel("journals");
ck(CLICKED.length === 1 && CLICKED[0] === "journals", "goPanel did not click the journals tab");

/* ---------- B. 全局搜索 ---------- */
function gsCount(q){
  runGlobalSearch(q);
  var h = ELS.gsres.innerHTML, n = 0, m, re = /<span class="cnt">(\d+)<\/span>/g;
  while((m = re.exec(h))) n += (+m[1]);
  return n;
}

/* B1. 空查询清空结果,不留上一次的残留 */
runGlobalSearch("mir");
ck(ELS.gsres.innerHTML.length > 0, "search for a common term returned nothing at all");
runGlobalSearch("");
ck(ELS.gsres.innerHTML === "", "empty query did not clear previous results");

/* B2. AND 语义:多加一个词,结果只能变少或持平,绝不能变多 */
var PAIRS = [["mirna","degradation"],["cancer","therapy"],["rna","binding"],["cell","stress"]];
PAIRS.forEach(function(pr){
  var a = gsCount(pr[0]), ab = gsCount(pr[0]+" "+pr[1]);
  ck(ab <= a, "AND semantics broken: 「"+pr[0]+"」="+a+" but 「"+pr[0]+" "+pr[1]+"」="+ab);
});

/* B3. 词序无关 */
ck(gsCount("mirna degradation") === gsCount("degradation mirna"),
   "search is order-dependent but the UI says it is not");

/* B4. 大小写无关 */
ck(gsCount("MIRNA") === gsCount("mirna"), "search is case-sensitive but the UI says it is not");

/* B5. 每组标题上的数字必须是真实命中数,而不是被截断后的 5 */
runGlobalSearch("rna");
var h5 = ELS.gsres.innerHTML;
GS_GROUPS.forEach(function(G){
  var rows = G.rows()||[], truth = 0, toks = gsTokens("rna");
  for(var i=0;i<rows.length;i++) if(gsHit(G.txt(rows[i]),toks)) truth++;
  if(!truth) return;
  ck(h5.indexOf('<span class="cnt">'+truth+'</span>') >= 0,
     "group 「"+G.label+"」 header count is not the true hit count ("+truth+")");
});

/* B6. 超过 5 条时必须给"查看全部"入口,而不是悄悄丢掉剩下的 */
GS_GROUPS.forEach(function(G){
  var rows = G.rows()||[], truth = 0, toks = gsTokens("rna");
  for(var i=0;i<rows.length;i++) if(gsHit(G.txt(rows[i]),toks)) truth++;
  if(truth > 5) ck(h5.indexOf('查看全部 '+truth+' 条') >= 0,
     "group 「"+G.label+"」 truncated "+truth+" hits without a see-all link");
});

/* B7. 无结果必须解释匹配规则,不能只是空白 */
runGlobalSearch("zzzqqq_nonexistent_token_xyz");
var h0 = ELS.gsres.innerHTML;
ck(h0.indexOf("无结果") >= 0, "no-result state is silent");
/* 这里必须逐条查,不能用 OR:第一版写成 「AND」||「全部」,而"全部"在别处也出现,
   于是把解释文案整段删掉的负控照样通过了。 */
ck(h0.indexOf("AND") >= 0, "no-result state does not name the AND matching rule");
ck(h0.indexOf("词序无关") >= 0, "no-result state does not say word order is irrelevant");
ck(h0.indexOf("zzzqqq_nonexistent_token_xyz") >= 0, "no-result state does not echo the query");

/* B8. 搜索结果里不能漏 undefined / NaN */
["mirna","cancer","rna","2026"].forEach(function(q){
  runGlobalSearch(q);
  var h = ELS.gsres.innerHTML;
  ck(!/>\s*undefined|undefined\s*(?:<|·)/.test(h), "search 「"+q+"」 leaked undefined");
  ck(!/>\s*NaN|NaN\s*(?:<|·|%)/.test(h), "search 「"+q+"」 leaked NaN");
});

/* B9. 五个库都必须真的被搜到过(少接一个库 = 静默失效) */
var reached = {};
["mirna","rna","university","cell","postdoc","fibrosis","nature","grant"].forEach(function(q){
  var toks = gsTokens(q);
  GS_GROUPS.forEach(function(G){
    var rows = G.rows()||[];
    for(var i=0;i<rows.length;i++) if(gsHit(G.txt(rows[i]),toks)){reached[G.k]=true;break;}
  });
});
GS_GROUPS.forEach(function(G){
  ck(reached[G.k] === true, "source 「"+G.label+"」 never produced a hit — is it wired in?");
});

/* ---------- C. 期刊查选 ---------- */
renderJournals();
var jh = ELS.jtab.innerHTML;
ck(jh.length > 500, "journal table rendered empty");
ck(!/>\s*undefined/.test(jh), "journal table leaked undefined");
ck(!/>\s*NaN|NaN\s*%/.test(jh), "journal table leaked NaN");

/* C1. 样本不足的刊:必须显示"样本不足",且它自己那三格里不能出现百分比 */
var thinRows = JOURNALS.filter(function(r){return r.thin;});
ck(thinRows.length > 0, "fixture has no thin journals — this test proves nothing");
var thinChecked = 0;
for(var i=0;i<JOURNALS.length && thinChecked<40;i++){
  var r = JOURNALS[i];
  if(!r.thin) continue;
  thinChecked++;
  /* 只取这一行的 <tr>,不看邻居 —— 邻居的"样本不足"不算数 */
  var key = 'data-jn="' + r.name.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;") + '"';
  var at = jh.indexOf(key);
  if(at < 0) continue;               /* 只渲染前 300 行,漏掉的跳过 */
  var end = jh.indexOf("</tr>", at);
  var row = jh.slice(at, end);
  var cells = row.split("<td>");
  /* cells: [tr头, 名称, 发文数, 层级, 重合度, OA%, 近两年%, 新颖度] */
  ck(cells.length >= 8, "thin row 「"+r.name+"」 has "+(cells.length-1)+" cells, expected 7");
  [5,6,7].forEach(function(ci){
    var c = cells[ci] || "";
    ck(c.indexOf("样本不足") >= 0,
       "thin journal 「"+r.name+"」 cell#"+ci+" does not say 样本不足: "+c.slice(0,60));
    ck(!/\d+(\.\d+)?%/.test(c),
       "thin journal 「"+r.name+"」 cell#"+ci+" shows a percentage despite too few papers: "+c.slice(0,60));
  });
}
ck(thinChecked > 0, "no thin journal was actually inspected");

/* C2. 非 thin 的刊必须真的给出百分比(反过来也不能一律打成样本不足) */
var fatChecked = 0;
for(var i=0;i<JOURNALS.length && fatChecked<20;i++){
  var r = JOURNALS[i];
  if(r.thin) continue;
  fatChecked++;
  ck(typeof r.oa_pct === "number" && typeof r.recent_pct === "number",
     "non-thin journal 「"+r.name+"」 is missing its percentages");
}
ck(fatChecked > 0, "no non-thin journal in fixture");

/* C3. 发文数必须能从 papers.json 复算出来(离线可验证 = 本站的立身之本) */
var recount = {};
PAPERS.forEach(function(p){
  var nm = T.norm[(p.journal||"")] || "";
  if(nm) recount[nm] = (recount[nm]||0) + 1;
});
var mismatch = 0, mmEx = "";
JOURNALS.forEach(function(r){
  var got = recount[T.norm[r.name] !== undefined ? T.norm[r.name] : r.name.toLowerCase()];
  if(got === undefined) return;
  if(got !== r.n){ mismatch++; if(!mmEx) mmEx = r.name+": table="+r.n+" recount="+got; }
});
ck(mismatch === 0, "journal counts are not reproducible from papers.json ("+mismatch+" off, e.g. "+mmEx+")");

/* C4. 层级徽标只在有层级时出现 */
JOURNALS.slice(0,120).forEach(function(r){
  var key = 'data-jn="' + r.name.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;") + '"';
  var at = jh.indexOf(key); if(at < 0) return;
  var row = jh.slice(at, jh.indexOf("</tr>", at));
  if(r.tier) ck(row.indexOf('class="tierb') >= 0, "journal 「"+r.name+"」 has tier "+r.tier+" but no badge");
});

/* C5. 层级必须精确匹配 —— 子串误命中的经典受害者要保持干净 */
var SUBSTR_TRAPS = [
  ["internal and emergency medicine", "rna"],
  ["international journal of molecular sciences", "science"],
  ["tissue and cell", "cell"],
  ["cells", "cell"],
  ["iscience", "science"]
];
SUBSTR_TRAPS.forEach(function(tr){
  var hit = JOURNALS.filter(function(r){return r.name.toLowerCase() === tr[0];})[0];
  if(!hit) return;
  ck(hit.tier !== "T1",
     "substring match regression: 「"+hit.name+"」 got T1, almost certainly via 「"+tr[1]+"」");
});

/* C6. 语料内 T1 数量必须保持在个位数量级 —— 一夜之间冒出上百本 T1 = 匹配器又坏了 */
var nT1 = JOURNALS.filter(function(r){return r.tier === "T1";}).length;
ck(nT1 <= 12, "implausible T1 count ("+nT1+" journals) — tier matcher likely regressed to substring");

/* C7. 元数据必须写明口径:语料范围 + 不提供影响因子 */
var note = (JMETA.note||"") + " " + JSON.stringify(JMETA);
ck(/语料/.test(note), "journals meta does not state that counts are corpus-scoped");
ck(/影响因子|IF/.test(note), "journals meta does not disclose that no impact factor is provided");
ck(JMETA.corpus_n === PAPERS.length,
   "journals meta corpus_n="+JMETA.corpus_n+" but papers.json has "+PAPERS.length);

/* C8. 方向指纹条:没有指纹时给破折号,不能画一根空条 */
ck(fpBarHTML(null).indexOf("—") >= 0, "empty fingerprint did not degrade to a dash");
ck(fpBarHTML({}).indexOf("—") >= 0, "empty fingerprint object did not degrade to a dash");

/* C9. 排序真的会改变顺序 */
JSORT="n"; JSORTDIR=-1; var byN = jSorted().slice(0,10).map(function(r){return r.name;}).join("|");
JSORT="name"; JSORTDIR=1;  var byName = jSorted().slice(0,10).map(function(r){return r.name;}).join("|");
ck(byN !== byName, "sorting by name produced the same order as sorting by count");

/* C10. 筛选器真的会缩小结果 */
JSORT="n"; JSORTDIR=-1;
var allN = jSorted().length;
VALS.jtier = "T2"; var t2N = jSorted().length; VALS.jtier = "";
ck(t2N > 0 && t2N < allN, "tier filter did not narrow (all="+allN+" T2="+t2N+")");
CHK.jhide = true; var hideN = jSorted().length; CHK.jhide = false;
ck(hideN > 0 && hideN < allN, "hide-thin filter did not narrow (all="+allN+" shown="+hideN+")");
VALS.jq = "nucleic"; var qN = jSorted().length; VALS.jq = "";
ck(qN >= 1 && qN < allN, "journal name search did not narrow (n="+qN+")");
ck(jSorted().length === allN, "journal filters did not reset cleanly");

/* C11. 选了方向之后,renderJournals 必须真的把该方向的百分比画到每一行上。
   jSorted() 自己读 #jdir,所以只测 jSorted 抓不到 renderJournals 里绑错 id ——
   负控证明过这一点。这里断言的是渲染出来的 HTML。 */
var someDir = (JMETA.int_ids||[])[0];
ck(!!someDir, "journals meta has no int_ids — direction filter cannot be tested");
if(someDir){
  VALS.jdir = someDir;
  renderJournals();
  var dh = ELS.jtab.innerHTML;
  var withDir = JOURNALS.filter(function(r){return r.fp && r.fp[someDir];});
  ck(withDir.length > 0, "no journal carries direction "+someDir+" — fixture too thin");
  var shown = (dh.match(/margin-top:2px">\d+%<\/div>/g)||[]).length;
  ck(shown > 0,
     "direction 「"+someDir+"」 selected but renderJournals drew 0 per-row percentages "
     +"(bound to the wrong element id?)");
  ck(shown === Math.min(withDir.length, 300),
     "per-row direction percentages shown="+shown+" but "+withDir.length+" journals carry it");
  VALS.jdir = "";
  renderJournals();
  var ch2 = (ELS.jtab.innerHTML.match(/margin-top:2px">\d+%<\/div>/g)||[]).length;
  ck(ch2 === 0, "clearing the direction filter left "+ch2+" stale percentages on screen");
}

/* C12. 平台导航与深链:每个 data-nav / 每个工具卡的跳转目标都必须是真实存在的面板。
   绑一个不存在的 id 不会报错,只会点了没反应 —— 那是最难发现的一类回归。 */
var PANELS = {};
T.panel_ids.forEach(function(p){ PANELS[p] = 1; });

T.nav_targets.forEach(function(p){
  ck(PANELS[p] === 1, "platform nav points at a non-existent panel: " + p);
});
ck(T.nav_targets.length >= 5,
   "platform nav only has " + T.nav_targets.length + " in-site targets");

HUB_SECTIONS.forEach(function(sec){
  sec.tools.forEach(function(t){
    if (t.ext) return;              // 外链不查
    ck(PANELS[t.p] === 1,
       "hub tool card \"" + t.t + "\" jumps to a non-existent panel: " + t.p);
  });
});

/* goPanel 对未知面板必须什么都不做 —— 不能静默退回首页,那会把拼错的链接藏起来 */
var nClickBefore = CLICKED.length;
goPanel("no_such_panel_xyz");
ck(CLICKED.length === nClickBefore,
   "goPanel activated a panel for an unknown id instead of doing nothing");

/* 反过来:合法 id 必须真的切过去,否则上一条断言用一个坏掉的 goPanel 也能\"通过\" */
goPanel("journals");
ck(CLICKED[CLICKED.length-1] === "journals",
   "goPanel failed to activate a valid panel");

/* ==================================================================
   D. 内联帮助 / 筛选芯片 / 空结果解释 / 金额缺失
   契约:
   D1 每个工作面板都有内联「怎么用」,不能只存在于独立的说明页
   D2 每个示例按钮设的控件必须真实存在,且值必须在该控件的选项里
   D3 示例的命中数是走真实渲染路径量出来的,不是写死的
   D4 芯片栏必须反映**全部**已生效筛选,含侧栏那三个非 DOM 的
   D5 清空筛选后,面板必须回到全量
   D6 零结果时必须解释是哪几个条件叠出来的,不能只显示"无结果"
   D7 金额缺失必须显示"以公告为准",不能把占位符当金额印出去
   ================================================================== */

/* D1 */
var WORK_PANELS = ["live","curated","journals","papers","whatsnew","jobs"];
WORK_PANELS.forEach(function(pid){
  ck(HELP[pid] && HELP[pid].what && HELP[pid].ex && HELP[pid].ex.length>0,
     "panel \"" + pid + "\" has no inline how-to with examples");
});

/* D2 —— 示例设的每个控件都要存在,值要在选项里。
   机构 / 地区这类下拉是渲染时按数据现算的(facetSel),所以得先渲染一轮,
   否则选项是空的,断言会拿空列表去比 —— 那是测试自己的时序问题,不是真缺陷。 */
WORK_PANELS.forEach(function(pid){ rerender(pid); });
/* D2 —— 示例设的每个控件都要存在,值要在选项里 */
Object.keys(HELP).forEach(function(pid){
  (HELP[pid].ex||[]).forEach(function(e,i){
    (e.set||[]).forEach(function(kv){
      var id=kv[0], v=kv[1];
      var virt = VFILT[pid] && VFILT[pid].set && (function(){
        CUR_PID=pid; var r=VFILT[pid].set(id,v); CUR_PID=null; return r!==null;
      })();
      if(virt){
        CUR_PID=pid;
        ck(VFILT[pid].set(id,v)===true,
           pid+" example #"+i+" sets virtual filter "+id+" to a value that is not a real option: "+v);
        VFILT[pid].clear("@"+id.replace(/^l/,""));
        CUR_PID=null;
        return;
      }
      var el=document.getElementById(id);
      ck(!!el, pid+" example #"+i+" targets a control that does not exist: "+id);
      if(el && el.options && el.options.length && v!==""){
        var vals=el.options.map(function(o){return o.value;});
        ck(vals.indexOf(v)>=0,
           pid+" example #"+i+" sets "+id+"=\""+v+"\" which is not among its options ["+vals.join("|")+"]");
      }
    });
  });
});

/* D3 —— 命中数必须真实。做法:量一次,然后手工用同一条件过一遍数据比对。
   这里不复算筛选逻辑(那会变成两套各自自洽的实现),而是验证
   "exCount 报的数" == "把示例应用上去之后面板实际渲染的行数"。 */
Object.keys(HELP).forEach(function(pid){
  (HELP[pid].ex||[]).forEach(function(e,i){
    if(e.run)return;                       /* 搜索型示例不预计数 */
    var n=exCount(pid,i);
    if(n===null)return;                    /* 提前 return 的面板不报数 —— 允许 */
    applyExample(pid,i);
    var shown=LAST_N[pid]&&LAST_N[pid].shown;
    ck(n===shown,
       pid+" example #"+i+" advertises "+n+" hits but rendering it shows "+shown);
    clearAllFilters(pid);
  });
});

/* D4 —— 芯片栏要盖住侧栏的虚拟筛选 */
(function(){
  clearAllFilters("live");
  ck(activeFilters("live").length===0, "live shows active filter chips with nothing filtered");
  CUR_PID="live"; VFILT.live.set("lftype", FTYPES[0]); CUR_PID=null;
  var af=activeFilters("live");
  ck(af.length===1 && af[0].id==="@ftype",
     "checking a sidebar funding-type box produced "+af.length+" chips (expected 1 for @ftype) — "+
     "a chip bar that only reads DOM controls would tell the user nothing is filtered");
  clearAllFilters("live");
  ck(activeFilters("live").length===0, "clearAllFilters left stale chips on live");
})();

/* D5 —— 清空后回到全量 */
(function(){
  var full={};
  WORK_PANELS.forEach(function(pid){ clearAllFilters(pid); full[pid]=LAST_N[pid]&&LAST_N[pid].shown; });
  ck(full.live===LIVE.length,
     "live with no filters shows "+full.live+" of "+LIVE.length+" records");
  ck(full.curated===CURATED.length,
     "curated with no filters shows "+full.curated+" of "+CURATED.length+" records");
  ck(full.journals===JOURNALS.length,
     "journals with no filters shows "+full.journals+" of "+JOURNALS.length+" rows");
})();

/* D6 —— 零结果必须解释清楚 */
(function(){
  clearAllFilters("live");
  document.getElementById("q").value="zzz_no_such_grant_qqq";
  renderLive();
  ck(LAST_N.live.shown===0, "the impossible query still matched "+LAST_N.live.shown+" grants");
  /* 空结果解释写在列表容器本身(noteRender 的 wrapId) */
  var box=document.getElementById("liveList").innerHTML;
  ck(box.indexOf("zzz_no_such_grant_qqq")>=0,
     "zero-result state does not echo the conditions that produced it");
  ck(box.indexOf("清空")>=0 || box.indexOf("重置")>=0,
     "zero-result state offers no one-click way out");
  document.getElementById("q").value="";
  clearAllFilters("live");
  ck(document.getElementById("liveList").innerHTML.indexOf("nores")<0,
     "the zero-result explanation is still on screen after results came back");
})();

/* D6b —— journals 的解释框是**独立容器**(#jempty,因为结果区是 <table>,
   往里塞 <div> 会被浏览器踢出表外)。独立容器不会被下一轮渲染覆盖,
   所以必须显式清掉 —— 否则"没有结果"和一张有内容的表会同时出现在屏幕上。
   这条断言必须查 #jempty 本身;查 liveList 是抓不到的,那边是整块重写。 */
(function(){
  clearAllFilters("journals");
  document.getElementById("jq").value="zzz_no_such_journal_qqq";
  renderJournals();
  ck(LAST_N.journals.shown===0, "the impossible journal query still matched rows");
  ck(document.getElementById("jempty").innerHTML.indexOf("nores")>=0,
     "journals zero-result state shows no explanation box");
  document.getElementById("jq").value="";
  renderJournals();
  ck(LAST_N.journals.shown>0, "journals did not come back after clearing the query");
  ck(document.getElementById("jempty").innerHTML==="",
     "journals still shows the 「no results」 box while the table has "+
     LAST_N.journals.shown+" rows in it");
})();

/* D6c —— 可信度筛选必须真的把未核实的挡住。
   167 条精选里只有个位数是逐条核实过的;这个差别筛不出来,
   未核实条目在屏幕上就和核实过的长得一模一样。 */
(function(){
  clearAllFilters("curated");
  var all=LAST_N.curated.shown;
  var keys={}, n=0;
  CURATED.forEach(function(g){var k=verifyKey(g); keys[k]=(keys[k]||0)+1;});
  ["official","pending","pivot"].forEach(function(k){
    if(!keys[k])return;
    n++;
    document.getElementById("cverify").value=k;
    renderCurated();
    ck(LAST_N.curated.shown===keys[k],
       "trust filter \""+k+"\" shows "+LAST_N.curated.shown+" entries but "+keys[k]+" carry that level");
    ck(LAST_N.curated.shown<all,
       "trust filter \""+k+"\" did not narrow anything — unverified entries still look verified");
  });
  ck(n>=2, "the curated fixture has only "+n+" trust levels — cannot exercise this filter");
  document.getElementById("cverify").value="";
  clearAllFilters("curated");
})();

/* D7 —— 金额缺失 */
(function(){
  var placeholders=0, printed=0;
  LIVE.forEach(function(g){
    if(amtMissing(g.amount)){
      placeholders++;
      /* 缺失时必须给出"去哪儿查"的指引,而不是把 None/0 这类占位符当金额印出来 */
      var t=amtTxt(g);
      if(t.indexOf("NOFO")<0&&t.indexOf("公告")<0)printed++;
    }
  });
  ck(placeholders>0, "no records with a missing amount — the fixture cannot exercise this");
  ck(printed===0,
     printed+" of "+placeholders+" grants with no published amount would print a placeholder as if it were money");
  /* 排序键必须是数字,否则占位符会参与比较 */
  var bad=LIVE.filter(function(g){var n=amtNum(g);return typeof n!=="number"||isNaN(n);});
  ck(bad.length===0, bad.length+" grants yield a non-numeric amount sort key");
})();

/* ================= 实验工具:算得对不对 =================
   期望值全部在 Python 侧独立算好写进 fixture(tool_expected.json),
   与页面代码没有共同来源。若两边都错才会同时通过 —— 这正是独立实现的意义。 */
(function(){
  var X = T.tool;
  if(!X){ ck(false, "tool_expected.json 缺失,工具断言无法执行"); return; }

  /* ---- 序列基元 ---- */
  ck(revComp(X.cds.slice(0,100))===X.rc_gapdh100, "revComp 与独立实现不一致");
  ck(translate(X.cds,0).slice(0,30)===X.tr_gapdh_first30aa, "translate 六框翻译首 30 aa 不一致");
  var pr=translate(X.cds,0).replace(/\*+$/,"");
  ck(pr.length===X.gapdh_prot_len, "GAPDH 翻译长度 "+pr.length+" ≠ "+X.gapdh_prot_len);
  ck(Math.abs(gcPct(X.cds)-X.gapdh_gc)<0.01, "GC% 偏差过大");
  /* 分母只能数 ACGT。含 N 的序列若把 N 也算进分母,GC% 会被系统性低估 */
  ck(Math.abs(gcPct("GGAANN")-50)<1e-9, "GC% 把非 ACGT 字符算进了分母(GGAANN 应为 50%,得到 "+gcPct("GGAANN").toFixed(1)+"%)");
  /* 重叠位点必须各算一次:NotI 位点前后各两位相同,GCGGCCGCGGCCGC 上有两个重叠位点 */
  var novl=reScan("GCGGCCGCGGCCGC").filter(function(e){return e.name==="NotI";})[0];
  ck(novl && novl.n===2 && novl.pos.length===2,
     "重叠的酶切位点被漏数了(GCGGCCGCGGCCGC 上 NotI 应有 2 个位点,得到 "+(novl?novl.n:"无")+")");

  /* ---- 蛋白参数:MW 已对 UniProt 报告质量验证过 ---- */
  ck(Math.abs(mwOf(X.prot).mw-X.prot_mw)<0.05, "分子量 "+mwOf(X.prot).mw.toFixed(2)+" ≠ "+X.prot_mw);
  ck(mwOf(X.prot).unk===0, "示例序列里出现了未知氨基酸 —— 期望值失去意义");
  ck(Math.abs(pIof(X.prot)-X.prot_pI)<0.01, "理论 pI 偏差过大");
  ck(Math.abs(gravyOf(X.prot)-X.prot_gravy)<0.001, "GRAVY 偏差过大");
  ck(extCoef(X.prot).red===X.prot_ext_red, "消光系数(还原态)不一致");

  /* ---- 酶切:单切酶名单必须完全一致(顺序无关) ---- */
  var uniq=reScan(X.cds).filter(function(e){return e.n===1;}).map(function(e){return e.name;}).sort();
  ck(uniq.join(",")===X.re_unique.join(","),
     "单切酶名单 ["+uniq.join(",")+"] ≠ ["+X.re_unique.join(",")+"]");

  /* ---- PSSM:分数、位点数、最高位 ---- */
  var sc=scanSites(X.prot);
  ck(sc.length===X.pssm_nsites, "S/T 位点数 "+sc.length+" ≠ "+X.pssm_nsites);
  ck(Math.abs(scoreSite(X.prot,X.pssm_S608_local_pos-1)-X.pssm_S608_score)<1e-9,
     "S608 打分 "+scoreSite(X.prot,X.pssm_S608_local_pos-1)+" ≠ 归档值 "+X.pssm_S608_score);
  var best=sc.slice().sort(function(p,q){return q.score-p.score||p.pos-q.pos;})[0];
  ck(best.pos===X.pssm_top_pos && Math.abs(best.score-X.pssm_top_score)<1e-9,
     "最高分位点 S"+best.pos+"="+best.score+" ≠ S"+X.pssm_top_pos+"="+X.pssm_top_score);
  /* 六个已知底物必须复现归档分值 —— 这是打分器的验收标准 */
  /* ctx 是以位点为中心的 15-mer,位点在 index 7;窗口 −6..+4 完全落在段内 */
  var vbad=PSSM_VAL.filter(function(v){return Math.abs(scoreSite(v.ctx,7)-v.score)>1e-9;});
  ck(vbad.length===0, vbad.length+" 个已知 AMPK 底物的重算分值与归档不符:"
     +vbad.map(function(v){return v.g+" "+scoreSite(v.ctx,7)+"≠"+v.score;}).join(","));
  ck(PSSM_VAL.every(function(v){return v.ctx.charAt(7)==="S"||v.ctx.charAt(7)==="T";}),
     "验证集里有 ctx 的中心不是 S/T —— 上下文对齐错了");

  /* ---- CAI:同一条序列在本物种表上高、在异源表上低 ---- */
  var ch=caiCompute(X.cds,"human").cai, ce=caiCompute(X.cds,"ecoli").cai;
  ck(Math.abs(ch-X.gapdh_cai_human)<0.001, "人源 CAI "+ch.toFixed(4)+" ≠ "+X.gapdh_cai_human);
  ck(Math.abs(ce-X.gapdh_cai_ecoli)<0.001, "大肠杆菌表 CAI "+ce.toFixed(4)+" ≠ "+X.gapdh_cai_ecoli);
  ck(ch-ce>0.3, "CAI 未能区分同源/异源密码子表(差值仅 "+(ch-ce).toFixed(3)+")");

  /* ---- 密码子优化:必须不改蛋白,且确实提高 CAI ---- */
  var op=optCompute(X.cds,"ecoli",[]);
  ck(op.same && translate(op.seq,0)===translate(X.cds,0), "密码子优化改变了翻译产物 —— 这是致命错误");
  ck(op.after>op.before, "优化后 CAI 未提高("+op.before.toFixed(3)+"→"+op.after.toFixed(3)+")");
  ck(op.after>0.8, "优化后 CAI 仅 "+op.after.toFixed(3)+",最优密码子选择疑似未生效");
  /* 避开酶切位点:要么真的消掉,要么明说消不掉 */
  var op2=optCompute(X.cds,"human",["EcoRI"]);
  var left=(op2.seq.match(/GAATTC/g)||[]).length;
  ck(left===0 || (op2.unavoid&&op2.unavoid.length>0),
     "声称避开 EcoRI 但序列里仍有 "+left+" 个位点,且未报告为不可避免");

  /* ---- 引物:每条都要满足自己声明的 Tm 窗口 ---- */
  var pd=pcrCompute(X.cds.slice(0,600),{tm:60,tol:1.5,lo:18,hi:27});
  ck(!pd.err && pd.pairs.length>0, "600 nt 模板上设计不出任何引物对:"+(pd.err||""));
  var offtm=pd.pairs.filter(function(p){
    return Math.abs(p.f.tm-60)>1.5+0.01 || Math.abs(p.r.tm-60)>1.5+0.01;});
  ck(offtm.length===0, offtm.length+" 对引物的 Tm 超出了自己声明的 ±1.5℃ 窗口");
  var badseq=pd.pairs.filter(function(p){
    return X.cds.indexOf(p.f.seq)<0 || X.cds.indexOf(revComp(p.r.seq))<0;});
  ck(badseq.length===0, badseq.length+" 对引物在模板上找不到 —— 取序列或反向互补有错");

  /* ---- 输入校验:错类型必须给可执行的提示,不能静默出错误结果 ---- */
  ck(isDNAseq(X.cds)===true, "isDNAseq 没把 CDS 认成核酸");
  ck(isDNAseq(X.prot)===false, "isDNAseq 把蛋白序列误认成核酸 —— 会给出无意义的翻译结果");
  var e1=optCompute(X.cds.slice(0,100),"human",[]);
  ck(!!e1.err && e1.err.indexOf("3 的倍数")>=0, "长度非 3 倍数时没有给出可执行的提示");
  var e2=pcrCompute(X.cds.slice(0,50),{tm:60,tol:1.5,lo:18,hi:27});
  ck(!!e2.err && /\d+ nt/.test(e2.err), "模板过短时没有说明至少需要多少 nt");
  var e3=optCompute(X.cds,"human",["NotAnEnzyme"]);
  ck(e3.unknown.length===1 && e3.seq && e3.seq.length===X.cds.length,
     "避开列表里有不认识的名字时,应当单独报告它而不是整个请求失败");
})();

/* ---- 示例按钮 → 面板渲染:端到端 ----
   前面的断言测的是计算函数;这里测的是"点了示例按钮,面板真的出东西"。
   两者会一起失败才说明是算错;只有这一条失败说明是接线错。 */
(function(){
  var panels=["tsite","tseq","tprimer","tlookup"];
  panels.forEach(function(pid){
    var h=HELP[pid];
    ck(!!h, pid+" 没有帮助条目 —— 用户打开面板看不到怎么用");
    if(!h)return;
    ck(h.ex && h.ex.length>0, pid+" 没有可点的示例");
    ck(!!h.caveat && h.caveat.length>20, pid+" 没有写明局限 —— 工具会被当成结论用");
    /* 局限说明必须真的说"做不到什么",不能是一段夸自己的话 */
    ck(!!h.caveat && /[不没无未仅]/.test(h.caveat),
       pid+" 的局限说明里没有任何否定性表述 —— 这不是局限,是宣传");
    (h.ex||[]).forEach(function(e,k){
      e.set.forEach(function(kv){
        var el=document.getElementById(kv[0]);
        ck(!!el, pid+" 示例"+(k+1)+" 指向不存在的控件 id: "+kv[0]);
        if(el)el.value=kv[1];
      });
    });
  });
  /* 逐个跑渲染:输出必须非空,且不能是错误框(lookup 依赖网络,单独放行) */
  [["tsite",renderSiteScan,"siOut"],["tseq",renderSeqTool,"sqOut"],["tprimer",renderPrimerTool,"prOut"]]
  .forEach(function(t){
    var ex=HELP[t[0]].ex;
    ex.forEach(function(e,k){
      e.set.forEach(function(kv){var el=document.getElementById(kv[0]); if(el)el.value=kv[1];});
      var out=document.getElementById(t[2]);
      out.innerHTML="";
      var threw=null; try{ t[1](); }catch(err){ threw=String(err); }
      ck(!threw, t[0]+" 示例"+(k+1)+" 渲染时抛异常:"+threw);
      var html=out.innerHTML||"";
      ck(html.length>50, t[0]+" 示例"+(k+1)+" 渲染出空结果(长度 "+html.length+")");
      ck(html.indexOf('class="terr"')<0,
         t[0]+" 示例"+(k+1)+" 渲染成了错误框 —— 内置示例必须是能跑通的");
    });
  });
  /* 面板重渲染表必须覆盖四个工具面板,否则切换面板时内容不刷新 */
  ["tsite","tseq","tprimer","tlookup"].forEach(function(pid){
    ck(typeof RENDER_OF[pid]==="function", pid+" 不在面板重渲染表里");
  });
})();

print(fails===0
  ? ("ALL PASS · checks="+checks+" · journals="+JOURNALS.length+" papers="+PAPERS.length
     +" live="+LIVE.length+" curated="+CURATED.length+" jobs="+JOBS.length)
  : ("FAILURES: "+fails+" / "+checks));
