
PAPERS = T.papers; PAPMETA = T.meta; CITENET = T.citenet;
INTERESTS = T.interests; INTMAP = {}; INTERESTS.forEach(function(x){INTMAP[x.id]=x;});
var names = T.names;
var fails = 0;
function ck(cond,msg){ if(!cond){ print("FAIL: "+msg); fails++; } }

/* 1) 每条记录都能渲染完整抽屉,不抛异常,且必须包含各分区标题 */
for (var k=0;k<PAPERS.length;k++){
  var pa=PAPERS[k], nm=names[k], html;
  try{
    html = rdSections(pa)+rdMethods(pa)+rdPhrases(pa)+rdNovelty(pa)+rdCite(pa)+rdScore(pa);
  }catch(e){ print("FAIL["+nm+"] threw: "+e); fails++; continue; }
  ck(html.indexOf("① 结构化拆解")>=0, nm+": missing section ①");
  ck(html.indexOf("② 方法与实验体系")>=0, nm+": missing section ②");
  ck(html.indexOf("⑤ 引用邻域")>=0, nm+": missing section ⑤");
  ck(html.indexOf("⑥ 相关性怎么算出来的")>=0, nm+": missing section ⑥");
  /* 只在结构位置判定泄漏:原文摘要里合法出现的 "remain undefined" 不算 */
  ck(!/>\s*undefined|undefined\s*(?:<|%|\))|:\s*undefined|=\s*undefined/.test(html),
     nm+": literal 'undefined' leaked into HTML at a structural position");
  ck(!/(?:>|:|\(|=|\|)\s*NaN|NaN\s*(?:<|%|\))/.test(html), nm+": NaN leaked into HTML");
  /* 卡片也要能渲染 */
  try{ var cd=papCard(pa); ck(cd.indexOf('data-act="read2"')>=0, nm+": card missing deep-read button"); }
  catch(e){ print("FAIL["+nm+"] papCard threw: "+e); fails++; }
}

/* 2) 断言:原文标注 vs 推断 必须显示正确的来源标签 */
for (var k=0;k<PAPERS.length;k++){
  var pa=PAPERS[k];
  if(!(pa.sections&&pa.sections.length))continue;
  var h=rdSections(pa);
  if(pa.sections_labeled) ck(h.indexOf("原文标注")>=0, names[k]+": labeled abstract not marked as 原文标注");
  else ck(h.indexOf("规则推断")>=0, names[k]+": unlabeled abstract not marked as 推断");
}

/* 3) 跑题记录必须显示锚点告警 */
for (var k=0;k<PAPERS.length;k++){
  if(PAPERS[k].off_topic) ck(rdScore(PAPERS[k]).indexOf("主题锚点缺失")>=0, names[k]+": off_topic not surfaced");
}

/* 4) 无 PMID / 未查询 的记录必须给出解释而不是空白或 0 */
for (var k=0;k<PAPERS.length;k++){
  var pa=PAPERS[k], h=rdCite(pa);
  if(!pa.pmid) ck(h.indexOf("没有 PMID")>=0, names[k]+": missing no-PMID explanation");
  else if(!(CITENET.net||{})[pa.pmid]) ck(h.indexOf("不在本次引用图抓取范围内")>=0, names[k]+": missing not-queried explanation");
}

/* 5) 新颖度必须把三分量与年份校正说明都摊开 */
for (var k=0;k<PAPERS.length;k++){
  var pa=PAPERS[k]; if(pa.novelty==null)continue;
  var h=rdNovelty(pa);
  ck(h.indexOf("内容距离")>=0 && h.indexOf("罕见术语")>=0 && h.indexOf("首现术语")>=0, names[k]+": novelty parts not all shown");
  ck(h.indexOf("同一发表年份的队列内")>=0, names[k]+": year-cohort correction not documented");
  ck(h.indexOf("不是\"科学上有多重要\"")>=0, names[k]+": novelty caveat missing");
}

/* 6) 句式库必须带抄袭警告 */
for (var k=0;k<PAPERS.length;k++){
  var pa=PAPERS[k];
  if((pa.phrases||[]).length) ck(rdPhrases(pa).indexOf("不要整句照抄")>=0, names[k]+": phrase bank missing plagiarism warning");
}

/* 7) 筛选器:新颖度 / 方法 / 跑题 / 有句式 都必须真的起作用 */
function nPass(){ var n=0; for(var i=0;i<PAPERS.length;i++) if(ppass(PAPERS[i],null)) n++; return n; }
var base = nPass();
VALS.papNov="high"; var hi=nPass(); VALS.papNov="";
ck(hi < base && hi > 0, "novelty filter did not narrow (base="+base+" high="+hi+")");
var mt=null;
for(var i=0;i<PAPERS.length&&!mt;i++) if((PAPERS[i].methods||[]).length) mt=PAPERS[i].methods[0].term;
if(mt){ VALS.papMeth=mt; var mn=nPass(); VALS.papMeth="";
  ck(mn>=1 && mn<base, "method filter wrong (n="+mn+")"); }
CHK.pap_off=true; var on=nPass(); CHK.pap_off=false;
ck(on>=1 && on<base, "off-topic filter wrong (n="+on+")");
CHK.pap_ph=true; var pn=nPass(); CHK.pap_ph=false;
ck(pn>=1 && pn<=base, "phrase filter wrong (n="+pn+")");
ck(nPass()===base, "filters did not reset cleanly");

/* 8) 新颖度徽标只在有分数时出现,且档位文字对应 */
for (var k=0;k<PAPERS.length;k++){
  var pa=PAPERS[k], np=novPill(pa);
  if(pa.novelty==null) ck(np==="", names[k]+": novPill rendered without novelty");
  else ck(np.indexOf("新颖度")>=0, names[k]+": novPill missing label");
}

/* 9) 引用网络概览必须解释稀疏原因,而不是只报一个小数字 */
try{ renderCiteBanner(); var bh=ELS.citeBanner.innerHTML;
  ck(bh.indexOf("为什么边这么少")>=0, "cite banner missing sparsity explanation");
  /* 措辞可改,但「稀疏是预期而非缺陷」这句必须在 —— 只钉住语义词「预期」 */
  ck(bh.indexOf("预期")>=0, "cite banner does not state sparsity is expected");
  /* 抓取失败率必须摊开写:失败 ≠ 该文没有引用关系 */
  if(CITENET.query_failures) ck(bh.indexOf("不代表它没有引用关系")>=0,
     "cite banner hides what query failures mean");
}catch(e){ print("FAIL: renderCiteBanner threw: "+e); fails++; }

print(fails===0 ? ("ALL PASS · records="+PAPERS.length+" base_pass="+base) : ("FAILURES: "+fails));
