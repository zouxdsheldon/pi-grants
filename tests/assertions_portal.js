
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

print(fails===0
  ? ("ALL PASS · checks="+checks+" · journals="+JOURNALS.length+" papers="+PAPERS.length
     +" live="+LIVE.length+" curated="+CURATED.length+" jobs="+JOBS.length)
  : ("FAILURES: "+fails+" / "+checks));
