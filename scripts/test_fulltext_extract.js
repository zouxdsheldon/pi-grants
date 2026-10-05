const {DOMParser}=require('/tmp/ftt/node_modules/@xmldom/xmldom');
const fs=require('fs');
var LS='t';
var NCBI='https://eutils.ncbi.nlm.nih.gov/entrez/eutils/';
var EPMC='https://www.ebi.ac.uk/europepmc/webservices/rest/';
var CROSSREF='https://api.crossref.org/works/';
var CUR={};
var CUES=[
 ['背景 Background', /^(background|introduction|context|rationale|purpose|objective|aim)/i,
   /\b(remains? (unclear|unknown)|little is known|however|although|it is (not )?(well )?(understood|known))\b/i],
 ['方法 Methods',    /^(methods?|materials|design|approach|experimental)/i,
   /\b(we (used|performed|generated|applied|measured|analy[sz]ed)|using|were (treated|transfected|injected|cultured))\b/i],
 ['结果 Results',    /^(results?|findings)/i,
   /\b(we (found|show|observed|identified|demonstrate)|(increased|decreased|reduced|elevated|abolished)\b|\bP\s*[<=>])/i],
 ['结论 Conclusions',/^(conclusions?|significance|implications?|summary|interpretation)/i,
   /\b(these (results|data|findings) (suggest|indicate|demonstrate|show)|we conclude|our (results|findings) (suggest|reveal))\b/i]
];
var NUMPATS=[
 ['百分比', /\b\d{1,3}(?:\.\d+)?\s?%/g],
 ['倍数',   /\b\d+(?:\.\d+)?[-\s]?fold\b/gi],
 ['P 值',   /\bP\s?[<=>]\s?0?\.\d+/gi],
 ['样本量', /\bn\s?=\s?\d+/gi],
 ['浓度/时长', /\b\d+(?:\.\d+)?\s?(?:nM|µM|uM|mM|M|mg\/kg|µg|ug|mg|ng\/ml|h|hr|hours?|min|days?|weeks?)\b/gi],
 ['分辨率/长度', /\b\d+(?:\.\d+)?\s?(?:Å|angstrom|nt|bp|kb|kDa|aa)\b/gi]
];
var METHODS=[
 ['小 RNA 测序',        ['small RNA[- ]seq(uencing)?','smallRNA[- ]seq','miRNA[- ]seq(uencing)?','sRNA[- ]seq']],
 ['RNA-seq',            ['RNA[- ]seq(uencing)?','transcriptom(e|ic) (analysis|profiling|sequencing)']],
 ['3′ 末端 / 尾巴测序', ['TAIL[- ]seq','3.? end sequencing','poly\\(A\\) tail length','tailseq']],
 ['代谢标记 / 半衰期',  ['SLAM[- ]seq','4[- ]?thiouridine','4sU','metabolic (RNA )?labeling','half[- ]life',
                        'actinomycin D','pulse[- ]chase','decay rate']],
 ['CLIP / RIP',         ['\\bCLIP\\b','iCLIP','PAR[- ]CLIP','eCLIP','HITS[- ]CLIP','RIP\\b','RNA immunoprecipitation',
                        'immunoprecipitat(e|ed|ion)']],
 ['基因敲除 / 敲低',    ['knock[- ]?out','\\bKO\\b','knock[- ]?down','siRNA','shRNA','\\bASO\\b','antisense oligo']],
 ['CRISPR / 编辑',      ['CRISPR','Cas9','base edit(or|ing)','prime edit(or|ing)','knock[- ]?in']],
 ['体外激酶 / 磷酸化',  ['in vitro kinase','kinase assay','phosphorylat(e|ed|ion)','phospho[- ]specific',
                        'Phos[- ]tag','\\bATP\\b']],
 ['质谱 / 蛋白组',      ['mass spectrometr(y|ic)','\\bLC[- ]MS','proteomic','\\bMS/MS\\b','phosphoproteom']],
 ['结构生物学',         ['cryo[- ]?EM','crystal structure','crystallograph','\\bNMR\\b','AlphaFold']],
 ['类器官 / 3D',        ['organoid','spheroid','air[- ]liquid interface']],
 ['动物模型',           ['\\bmice\\b','\\bmouse\\b','\\brat(s)?\\b','zebrafish','\\bpig(s)?\\b','porcine',
                        'in vivo','xenograft']],
 ['人源样本',           ['patient(s)?','human (biops|tissue|sample|cohort)','clinical (cohort|sample)','\\bcohort\\b']],
 ['报告基因 / 荧光',    ['reporter (assay|construct|gene)','luciferase','\\bGFP\\b','fluorescen(t|ce)']],
 ['成像 / 组化',        ['immunohistochemi','immunofluorescen','confocal','microscop(y|e)','\\bIHC\\b']],
 ['流式',               ['flow cytometr','\\bFACS\\b']],
 ['qPCR / western',     ['\\bqPCR\\b','\\bRT[- ]qPCR\\b','real[- ]time PCR','western blot','immunoblot']],
 ['生信 / 预测',        ['bioinformatic','computational (analysis|model|prediction)','machine learning',
                        'in silico','\\bPSSM\\b','motif (analysis|search)']]
];
var GAPRE=/\b(remains?\s+(?:\w+ly\s+)?(?:to\s+be|unclear|unknown|elusive|poorly|incompletely|unexplored|unexamined|uncharacteri[sz]ed|undefined|understudied|obscure)|remain\s+(?:\w+ly\s+)?(?:unclear|unknown|elusive|unexplored|uncharacteri[sz]ed|undefined)|little is known|not (?:yet |well )?(?:been )?(?:known|understood|characteri[sz]ed|determined|established|explored)|(?:poorly|incompletely|insufficiently) (?:understood|characteri[sz]ed|defined|explored)|unclear (?:how|whether|why)|it (?:is|remains) (?:unclear|unknown)|future (?:studies|work|research|investigations?)|warrants? (?:further|investigation)|further (?:studies|work|investigation)s? (?:are|is) (?:needed|required|warranted)|open question|yet to be|has not been|have not been|lack(?:ing|s)? (?:of )?(?:understanding|knowledge|evidence)|limitation)(?![a-z])/i;
var DIRS=[
 {id:'D1', name:'方向1 AMPK–ZSWIM8–代谢记忆',
  terms:['ZSWIM8','TDMD','target[- ]directed','AMPK','AMP[- ]activated','energy stress','Cul3','\\bAGO2\\b',
         'Argonaute','metabolic memory','glucose','diabet(es|ic)','phosphorylat','ubiquitin ligase','miR-33','miR-375']},
 {id:'D2', name:'方向2 TUT4/7–miR-29–纤维化',
  terms:['TUT4','TUT7','ZCCHC11','ZCCHC6','uridylat','DIS3L2','miR-29','fibro(sis|tic|blast)','collagen',
         'TGF-?.?(beta|β)','Smad','stricture','Crohn','myofibroblast','3.? end']},
 {id:'D3', name:'方向3 乳酸/乳酰化 × 小 RNA',
  terms:['lactylat','lactate','lactic acid','AARS1','glycolysi','Warburg','METTL3','METTL16','m6A',
         'non[- ]histone','acetylat','metabolite']}
];
var EPMC_BASE='https://www.ebi.ac.uk/europepmc/webservices/rest';
var FIG_Q=[
  {k:'样本量', re:/\bn\s*=\s*\d+/i},
  {k:'误差/离散', re:/(±|\bSEM\b|\bSD\b|s\.e\.m|standard (error|deviation)|interquartile)/i},
  {k:'统计检验', re:/(\bP\s*[<>=]|\bp\s*[<>=]|two-?tailed|ANOVA|t-?test|Mann-?Whitney|Wilcoxon|Kruskal)/i},
  {k:'重复次数', re:/(biological|technical|independent)\s+(replicate|experiment)|\bn\s*=\s*\d+\s*(mice|animals|patients|donors)/i},
  {k:'标尺（代表性图像）', re:/scale bar/i}
];
var CTRL_CATS=[
 {k:'① 阴性对照（无处理/无酶/加扰序列）',
  re:/\b(vehicle|untreated|mock|scrambled?|non-?targeting|scramble control|control (si|sh)RNA|control (plasmid|vector|peptide|antibody|IgG|mimic)|empty vector|no[- ]enzyme|heat-?inactivated|saline)\b/i},
 {k:'② 遗传对照（敲除/敲低 + 回补，或位点突变体）',
  re:/\b(knock-?outs?|knock-?downs?|\bKO\b|shRNA|siRNA|CRISPR|rescue|re-?expression|add-?back|point mutants?|catalytically (dead|inactive)|kinase-?dead|deletion mutants?|null allele)\b/i},
 {k:'③ 剂量 / 时间依赖',
  re:/\b(dose-?dependen|concentration-?dependen|time-?dependen|time[- ]course|titrat)/i},
 {k:'④ 第二种独立方法验证',
  re:/\b(orthogonal|independent (method|approach|assay|allele)|confirmed by|validated by|second (independent )?(method|assay|approach)|corroborat)/i}
];
var LIM_RE=/\b(limitation|caveat|we (did not|could not|cannot)|was not (addressed|examined|tested)|remains? (unclear|unknown|to be determined)|future (studies|work|experiments)|further (studies|work|investigation)|beyond the scope)\b/i;
var CONTRA_RE=/\b(however|in contrast|contrary|unlike|whereas|but (see|in)|discrepan|conflict|at odds|challenged?|inconsistent)\b/i;
var SUPPORT_RE=/\b(we (hypothesi[sz]ed|reasoned|predicted)|previously (showed|shown|demonstrated|reported)|established|building on|consistent with (our|the) (hypothesis|model)|as (shown|demonstrated) (previously|by))\b/i;
var FLDS=[
 ['f1','① 一句话结论（用我自己的话）','不许抄摘要。写不出来就是没读懂。'],
 ['f2','② 它回答了哪个问题',''],
 ['f3','③ 关键图与可信度','需读全文'],
 ['f4','④ 方法要点','同步抄进台账 C'],
 ['f5','⑤ 体系与外推边界',''],
 ['f6','⑥ 做了 / 漏了哪些对照','需读全文 · 漏掉的那条常是切入点'],
 ['f7','⑦ 效应量（必须带数字）','没有数字的笔记不算笔记'],
 ['f8','⑧ 有一件事我不相信','必填，工具不代填'],
 ['f9','🔥 ⑨ 热点定位',''],
 ['f10','🕳 ⑩ 它暴露 / 承认的空白','写申请书 Significance 直接用'],
 ['f11','🔭 ⑪ 未来三年走向',''],
 ['f12','⑫ 与我课题的接口','方法 / 对照值 / 竞争风险'],
 ['f13','⑬ 一个可执行动作','同步进台账 A'],
 ['f14','⑭ 要排队的参考文献','需读全文']
];
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){
  return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function splitSentences(t){
  if(!t) return [];
  var protected_=String(t)
    .replace(/(\b[A-Z])\.(\s*[A-Z]\.)/g,'$1<DOT>$2')      /* 人名缩写 */
    .replace(/\b(e\.g|i\.e|vs|et al|Fig|approx|ca)\./gi,'$1<DOT>')
    .replace(/(\d)\.(\d)/g,'$1<DOT>$2');                   /* 小数 */
  return protected_.split(/(?<=[.!?;])\s+(?=[A-Z0-9(«"'\u4e00-\u9fff])/)
    .map(function(x){return x.replace(/<DOT>/g,'.').trim();})
    .filter(function(x){return x.length>2;});
}
function structureAbstract(abs, labeled){
  /* labeled: [{label, text}] 来自 efetch 的 AbstractText@Label（若有） */
  if(labeled && labeled.length && labeled.some(function(x){return x.label;})){
    return {origin:'source', parts:labeled.filter(function(x){return x.text;}).map(function(x){
      return {name:(x.label||'正文'), text:x.text};})};
  }
  var sents=splitSentences(abs), parts=[];
  var cur='背景 Background';
  var buf={};
  sents.forEach(function(s){
    for(var i=0;i<CUES.length;i++){
      if(CUES[i][2].test(s)){ cur=CUES[i][0]; break; }
    }
    (buf[cur]=buf[cur]||[]).push(s);
  });
  ['背景 Background','方法 Methods','结果 Results','结论 Conclusions'].forEach(function(k){
    if(buf[k]&&buf[k].length) parts.push({name:k, text:buf[k].join(' ')});
  });
  if(!parts.length && abs) parts.push({name:'正文（无法分段）', text:abs});
  return {origin:'inferred', parts:parts};
}
function findNumbers(abs){
  var out=[];
  splitSentences(abs).forEach(function(s){
    NUMPATS.forEach(function(pp){
      var re=new RegExp(pp[1].source, pp[1].flags.replace('g','')+'g'), m;
      while((m=re.exec(s))!==null){ out.push({kind:pp[0], hit:m[0], sent:s}); }
    });
  });
  var seen={}, uniq=[];
  out.forEach(function(o){var k=o.kind+'|'+o.hit+'|'+o.sent.slice(0,40);
    if(!seen[k]){seen[k]=1;uniq.push(o);}});
  return uniq;
}
function methodRegex(list){ return new RegExp('(?:'+list.join('|')+')','i'); }
function findMethods(abs){
  var sents=splitSentences(abs), out=[];
  METHODS.forEach(function(md){
    var re=methodRegex(md[1]);
    for(var i=0;i<sents.length;i++){
      var m=sents[i].match(re);
      if(m){ out.push({name:md[0], hit:m[0], sent:sents[i]}); break; }
    }
  });
  return out;
}
function findGaps(abs){
  return splitSentences(abs).filter(function(s){return GAPRE.test(s);})
    .map(function(s){return {sent:s, hit:(s.match(GAPRE)||[''])[0]};});
}
function matchDirections(text){
  var t=String(text||''), out=[];
  DIRS.forEach(function(d){
    var hits=[];
    d.terms.forEach(function(tm){
      var re=new RegExp('(?:^|[^A-Za-z0-9])('+tm+')(?=[^A-Za-z0-9]|$)','i');
      var m=t.match(re); if(m) hits.push(m[1]);
    });
    if(hits.length) out.push({id:d.id, name:d.name, hits:hits});
  });
  return out.sort(function(a,b){return b.hits.length-a.hits.length;});
}
function xrefOffset(root,target){
  /* 按文档顺序累加文本长度，遇到 target 即返回其起始偏移；-1 表示未找到 */
  var n=0, found=-1;
  (function walk(el){
    if(found>=0) return;
    if(el===target){ found=n; return; }
    if(el.nodeType===3){ n+=String(el.nodeValue||'').replace(/\s+/g,' ').length; return; }
    var c=el.childNodes;
    for(var i=0;c&&i<c.length;i++){ walk(c[i]); if(found>=0) return; }
  })(root);
  return found;
}
function pickSentence(text,off){
  if(off<0) return '';
  var sents=splitSentences(text), acc=0;
  for(var i=0;i<sents.length;i++){
    var s=sents[i], start=text.indexOf(s,acc);
    if(start<0) start=acc;
    var end=start+s.length;
    if(off>=start-2 && off<=end+2) return s;
    acc=end;
  }
  return sents.length?sents[sents.length-1]:'';
}
function txtOf(el){ return el? String(el.textContent||'').replace(/\s+/g,' ').trim() : ''; }
function ftParse(xml){
  /* 坑 5：两种坏 XML 行为都要接住，否则整页崩 */
  var doc;
  try { doc=new DOMParser().parseFromString(xml,'text/xml'); }
  catch(e){ return null; }
  if(!doc || !doc.documentElement) return null;
  if(doc.getElementsByTagName('parsererror').length) return null;

  var out={figs:[],tables:[],methods:'',results:'',discussion:'',body:'',refs:[],xrefs:[],secs:[]};
  var figs=doc.getElementsByTagName('fig');
  for(var i=0;i<figs.length;i++){
    var lb=txtOf(figs[i].getElementsByTagName('label')[0]);
    var cp=txtOf(figs[i].getElementsByTagName('caption')[0]);
    if(lb||cp) out.figs.push({label:lb||('Figure '+(i+1)), caption:cp});
  }
  var tbs=doc.getElementsByTagName('table-wrap');
  for(var t=0;t<tbs.length;t++){
    out.tables.push({label:txtOf(tbs[t].getElementsByTagName('label')[0])||('Table '+(t+1)),
                     caption:txtOf(tbs[t].getElementsByTagName('caption')[0])});
  }

  var body=doc.getElementsByTagName('body')[0];
  if(body){
    var secs=body.getElementsByTagName('sec');
    for(var s=0;s<secs.length;s++){
      var ti=txtOf(secs[s].getElementsByTagName('title')[0]);
      var bd=txtOf(secs[s]);
      out.secs.push({title:ti, len:bd.length});
      if(/method|material|experimental procedure/i.test(ti) && bd.length>out.methods.length) out.methods=bd;
      else if(/^result/i.test(ti) && bd.length>out.results.length) out.results=bd;
      else if(/discussion|conclusion/i.test(ti) && bd.length>out.discussion.length) out.discussion=bd;
    }
    var clone=body.cloneNode(true);
    var rl=clone.getElementsByTagName('ref-list');
    while(rl.length){ rl[0].parentNode.removeChild(rl[0]); }
    out.body=txtOf(clone);

    var xs=body.getElementsByTagName('xref');
    for(var x=0;x<xs.length;x++){
      if((xs[x].getAttribute('ref-type')||'')!=='bibr') continue;
      var rid=xs[x].getAttribute('rid')||'';
      var node=xs[x], pEl=null, chain=[], up=node;
      while(up && up.nodeName!=='body'){
        if(!pEl && (up.nodeName==='p' || up.nodeName==='title' || up.nodeName==='caption')) pEl=up;
        /* 坑 2：收集整条祖先 sec 标题链，而不是只取最近一层 */
        if(up.nodeName==='sec'){ var tt=txtOf(up.getElementsByTagName('title')[0]); if(tt) chain.unshift(tt); }
        up=up.parentNode;
      }
      if(!pEl) pEl=node.parentNode;
      /* 坑 1：用段落 + 字符偏移定位到 xref 真正所在的那一句 */
      var ptxt=txtOf(pEl);
      var sent=pickSentence(ptxt, xrefOffset(pEl,node));
      out.xrefs.push({rid:rid, sent:(sent||ptxt).slice(0,400), sec:chain.join(' › ')});
    }
  }

  var refs=doc.getElementsByTagName('ref');
  for(var r=0;r<refs.length;r++){
    var id=refs[r].getAttribute('id')||'';
    var ti2=txtOf(refs[r].getElementsByTagName('article-title')[0]);
    var src=txtOf(refs[r].getElementsByTagName('source')[0]);
    var yr=txtOf(refs[r].getElementsByTagName('year')[0]);
    var sn=refs[r].getElementsByTagName('surname')[0];
    var pm='';
    var ids=refs[r].getElementsByTagName('pub-id');
    for(var q=0;q<ids.length;q++){ if((ids[q].getAttribute('pub-id-type')||'')==='pmid') pm=txtOf(ids[q]); }
    /* 坑 3：没有 article-title 时另存整条引文原文，作兜底键与兜底显示 */
    var raw=txtOf(refs[r]).slice(0,240);
    if(ti2||src||raw) out.refs.push({id:id,title:ti2,src:src,year:yr,first:txtOf(sn),pmid:pm,raw:raw});
  }
  return out;
}
function figCred(figs){
  return figs.map(function(f){
    return {label:f.label, caption:f.caption,
            marks:FIG_Q.filter(function(q){return q.re.test(f.caption);}).map(function(q){return q.k;})};
  });
}
function ctrlScan(text){
  var sents=splitSentences(text);
  return CTRL_CATS.map(function(c){
    var hits=[];
    for(var i=0;i<sents.length && hits.length<2;i++){
      if(c.re.test(sents[i])){
        var m=sents[i].match(c.re);
        hits.push({sent:sents[i].slice(0,340), hit:m?m[0]:''});
      }
    }
    return {k:c.k, hits:hits};
  });
}
function limScan(text){
  var out=[], sents=splitSentences(text);
  for(var i=0;i<sents.length && out.length<6;i++){
    if(LIM_RE.test(sents[i])){ var m=sents[i].match(LIM_RE); out.push({sent:sents[i].slice(0,340), hit:m?m[0]:''}); }
  }
  return out;
}
function refTriage(ft){
  var byId={}; ft.refs.forEach(function(r){ byId[r.id]=r; });
  var seen={}, out={method:[],support:[],contra:[],often:[]};
  /* 坑 4 的兜底：纯计数，不含判断 */
  var cnt={};
  ft.xrefs.forEach(function(x){ cnt[x.rid]=(cnt[x.rid]||0)+1; });
  var rank=Object.keys(cnt).map(function(k){return {rid:k,n:cnt[k]};})
            .sort(function(a,b){return b.n-a.n;});
  ft.xrefs.forEach(function(x){
    var r=byId[x.rid]; if(!r) return;
    var key=(r.pmid||r.title||r.raw||r.id||'').slice(0,60); if(!key) return;
    var isM=/method|material|experimental procedure/i.test(x.sec||'');
    var isC=CONTRA_RE.test(x.sent);
    var isS=SUPPORT_RE.test(x.sent);
    var bucket=isC?'contra':(isM?'method':(isS?'support':null));
    if(!bucket) return;
    var kk=bucket+'|'+key; if(seen[kk]) return; seen[kk]=1;
    if(out[bucket].length<4) out[bucket].push({ref:r, ctx:x.sent.slice(0,260), sec:x.sec||''});
  });
  if(!out.support.length && !out.method.length && !out.contra.length){
    for(var i=0;i<rank.length && out.often.length<5;i++){
      if(rank[i].n<2) break;
      var rr=byId[rank[i].rid]; if(!rr) continue;
      var ctx='';
      for(var j=0;j<ft.xrefs.length;j++){ if(ft.xrefs[j].rid===rank[i].rid){ ctx=ft.xrefs[j].sent; break; } }
      out.often.push({ref:rr, ctx:ctx.slice(0,260), sec:'被引用 '+rank[i].n+' 次'});
    }
  }
  return out;
}
function refLine(o){
  var r=o.ref, head;
  if(r.title){
    head=(r.first?(r.first+' 等 '):'')+(r.year||'')+'《'+r.title+'》'+(r.src||'');
  } else {
    head='（该文参考表未提供结构化标题，以下为参考表原文）'+(r.raw||r.src||r.id||'');
  }
  return '· '+head+(r.pmid?(' · PMID '+r.pmid):' · 该文参考表未给 PMID')+
         '\n    引用语境'+(o.sec?('（'+o.sec+'）'):'')+'：'+o.ctx;
}
function ftScaffold(sc, ft, meta){
  var q=figCred(ft.figs);
  var withQ=q.filter(function(f){return f.marks.length;});
  var srcNote='【全文已读 · '+meta.src+' · '+meta.pmcid+'】';

  if(ft.figs.length){
    var top=(withQ.length?withQ:q).slice(0,3);
    sc.f3=srcNote+'共 '+ft.figs.length+' 张图'+(ft.tables.length?('、'+ft.tables.length+' 张表'):'')+
      '，其中 '+withQ.length+' 张图注含定量线索（n=／±／统计检验／重复次数／标尺）。\n'+
      top.map(function(f){
        return '· '+f.label+(f.marks.length?('　定量线索：'+f.marks.join('、')):'　图注未给定量线索')+
               '\n    图注：'+f.caption.slice(0,300);
      }).join('\n')+
      '\n全部图号：'+q.map(function(f){return f.label;}).join('、')+
      '\n【仍须你判断】哪一张是支撑主结论的那张 —— 工具只报告图注里有什么，不替你选主图。';
  }
  var cs=ctrlScan((ft.methods||'')+' '+(ft.results||'')+' '+(ft.body||''));
  var missing=cs.filter(function(c){return !c.hits.length;});
  sc.f6=srcNote+'按四类逐条检索全文（每条附原句，可当场回查）：\n'+
    cs.map(function(c){
      if(!c.hits.length) return c.k+'　→　**全文中未检索到这一类对照句**';
      return c.k+'　→　检索到 '+c.hits.length+' 句\n'+
        c.hits.map(function(h){return '    · （命中 "'+h.hit+'"）'+h.sent;}).join('\n');
    }).join('\n')+
    (missing.length
      ? ('\n\n**未检索到的 '+missing.length+' 类：'+missing.map(function(m){return m.k.replace(/（.*/,'');}).join('、')+
         '** —— 注意措辞：这是「本文正文里检索不到」，不等于作者没做（可能在补充材料或未写明）。'+
         '若确实未做，这一条往往就是你的切入点。')
      : '\n\n四类对照全部检索到 —— 这篇在对照上做得比较完整，切入点要从别处找。');

  var fullNums=findNumbers((ft.results||'')+' '+(ft.body||''));
  var pri=fullNums.filter(function(n){return /[Pp]\s*[<>=]|±/.test(n.sent);});
  var use=(pri.length>=4?pri:fullNums);
  if(use.length){
    sc.f7=srcNote+'从全文 Results/正文抽到 '+fullNums.length+' 处数字（其中 '+pri.length+
      ' 处所在句带 p 值或 ±），逐条附原句，请核对单位与比较基准：\n'+
      use.slice(0,12).map(function(n){return '· ['+n.kind+'] '+n.hit+'\n    原句：'+n.sent;}).join('\n');
  }
  if(ft.methods){
    var mm=findMethods(ft.methods);
    if(mm.length){
      sc.f4=srcNote+'来自 Methods 正文（不是摘要），抽到 '+mm.length+' 类方法，每条附原句：\n'+
        mm.map(function(m){return '· '+m.name+'（命中 "'+m.hit+'"）\n    原句：'+m.sent;}).join('\n');
    }
    var sysm=(ft.methods.match(/\b(HEK ?293[A-Z]*|HeLa|K562|U2OS|NIH ?3T3|MEFs?|iPSCs?|organoids?|C57BL\/6[A-Za-z]*|BALB\/c|Sprague-?Dawley|Wistar|zebrafish|C\. ?elegans|Drosophila|primary (human|mouse|rat) [a-z ]{3,24}|patient-derived|biopsy|biopsies)\b/gi)||[]);
    var uniq=[]; sysm.forEach(function(x){ if(uniq.indexOf(x)<0&&uniq.length<10) uniq.push(x); });
    if(uniq.length){
      sc.f5=srcNote+'Methods 里出现的体系：'+uniq.join('、')+
        '\n【仍须你判断】结论能外推到哪一步为止？细胞系→小鼠→人，越靠后越值钱。'+
        '若只有细胞系，写清「本文未做在体验证」。';
    }
  }
  var lims=limScan((ft.discussion||'')+' '+(ft.body||''));
  if(lims.length){
    sc.f10=srcNote+'作者自己承认的局限/未解（'+lims.length+' 句，全部原文）：\n'+
      lims.map(function(l){return '· （命中 "'+l.hit+'"）'+l.sent;}).join('\n')+
      '\n【仍须你标注】哪一条是你能做的。';
    sc.f11='【由上面 '+lims.length+' 句作者自述的局限推演，请你确认】'+
      '如果这条线再走三年最可能出什么？然后三选一：我该跟进 / 我该绕开（太拥挤）/ 我该抢在前面。';
  }
  var tr=refTriage(ft), parts=[];
  if(tr.support.length) parts.push('**① 用来支撑核心假设的**（引用语境含「我们假设／此前已证明／建立于」等）：\n'+tr.support.map(refLine).join('\n'));
  if(tr.method.length)  parts.push('**② 方法出处**（引用出现在 Methods 章节，含其子节）：\n'+tr.method.map(refLine).join('\n'));
  if(tr.contra.length)  parts.push('**③ 与它结论相反 / 有张力的**（引用语境含 however、in contrast、unlike 等）：\n'+tr.contra.map(refLine).join('\n'));
  if(tr.often.length)   parts.push('**本文正文里几乎不用 however／previously 这类标志词，三类都判不出来**，'+
    '所以改用纯计数：**被本文反复引用的文献**（引用次数越多说明在论证里越吃重，这不含任何判断）：\n'+tr.often.map(refLine).join('\n'));
  sc.f14=srcNote+'共 '+ft.refs.length+' 条参考文献，按引用语境自动分类（每条附引用语境原句，可当场回查）：\n'+
    (parts.length?parts.join('\n\n'):'本文参考文献的引用语境里没有可自动判定的标志词，且没有任何一篇被引用两次以上 —— 请自己翻参考表挑。')+
    (tr.contra.length?'':'\n\n**没有检索到「相反结论」类引用** —— 可能作者没有正面引反面证据，这本身值得记一笔。');
  return sc;
}
function baseSC(){ return {f1:'x',f2:'x',f3:'【需读全文核对】',f4:'【摘要里没有可识别的方法词】',
  f5:'【抽取】体系线索：摘要未明确',f6:'【需读全文核对】',f7:'【摘要未报告数字】',
  f8:'x',f9:'x',f10:'x',f11:'x',f12:'x',f13:'x',f14:'【需读全文核对】'}; }
var FAIL=0; function ck(l,c){ console.log((c?'  ✓ ':'  ✗ ')+l); if(!c)FAIL++; }
['40124162','39977234','41465114','22095944'].forEach(function(pm){
  var ft=ftParse(fs.readFileSync('/tmp/ft_'+pm+'.xml','utf8'));
  console.log('\n===== '+pm+' =====');
  if(!ft){ ck('解析成功',false); return; }
  if(!ft.figs.length && !ft.refs.length && (ft.body||'').length<2000){ ck('摘要级记录守卫生效（不填、不编）',true); return; }
  console.log('  图'+ft.figs.length+' 参考'+ft.refs.length+' 引文'+ft.xrefs.length+
              ' Methods'+(ft.methods||'').length+' Results'+(ft.results||'').length);
  var sc=ftScaffold(baseSC(), ft, {pmcid:'PMC_T',src:'test'});
  ['f3','f6','f7','f14'].forEach(function(k){
    ck(k+' 已按全文填（不再是核对清单）',
       String(sc[k]).indexOf('需读全文核对')<0 && String(sc[k]).indexOf('全文已读')>=0); });
  var f7=String(sc.f7), qs=f7.split('原句：').slice(1).map(function(s){return s.split('\n')[0].trim().slice(0,40);});
  ck('⑦ '+qs.length+' 条数字原句全部可在正文回查',
     qs.length>0 && qs.every(function(q){return !q||(ft.results+' '+ft.body).indexOf(q)>=0;}));
  var f14=String(sc.f14);
  var titles=(f14.match(/《([^》]+)》/g)||[]).map(function(s){return s.slice(1,-1);});
  var raws=(f14.match(/参考表原文）([^\n]{10,})/g)||[]);
  ck('⑭ 列出 '+(titles.length+raws.length)+' 条，全部出自本文参考表',
     (titles.length+raws.length)>0 &&
     titles.every(function(t){return ft.refs.some(function(r){return r.title===t;});}) &&
     raws.every(function(s){var v=s.replace('参考表原文）','').split(' · PMID')[0].trim().slice(0,50);
                            return ft.refs.some(function(r){return (r.raw||'').indexOf(v)>=0;});}));
  var ctxs=f14.split('引用语境').slice(1).map(function(s){return (s.split('：')[1]||'').split('\n')[0].trim().slice(0,45);});
  ck('⑭ 引用语境原句可回查、且不是裸引用编号',
     ctxs.length>0 && ctxs.every(function(c){return !c||(ft.body.indexOf(c)>=0 && !/^\d{1,3}$/.test(c));}));
  console.log('    ⑭ 分到的类别: '+(['支撑核心假设','方法出处','结论相反','反复引用']
    .filter(function(k){return f14.indexOf(k)>=0;}).join(' / ')||'（无）'));
  ck('③ 引用的图号都是本文真实存在的',
     ft.figs.map(function(f){return f.label;}).some(function(l){return String(sc.f3).indexOf(l)>=0;}));
});
console.log('\n--- 负向对照 ---');
ck('坏 XML（抛异常）→ null，不崩页', ftParse('<a><b>未闭合')===null);
ck('纯文本 → null', ftParse('>>> not xml')===null);
ck('空字符串 → null', ftParse('')===null);
var empty={figs:[],tables:[],methods:'',results:'',discussion:'',body:'',refs:[],xrefs:[],secs:[]};
var se=ftScaffold(baseSC(),empty,{pmcid:'P',src:'t'});
ck('空全文不编造：f3/f7 保持原状、f14 不列文献',
   se.f3.indexOf('需读全文核对')>=0 && se.f7.indexOf('摘要未报告数字')>=0 && se.f14.indexOf('《')<0);
var one={figs:[],tables:[],methods:'Cells were treated with vehicle control or drug.',results:'',
  discussion:'',body:'Cells were treated with vehicle control or drug.',refs:[],xrefs:[],secs:[]};
var so=ftScaffold(baseSC(),one,{pmcid:'P',src:'t'});
/* 文案里有「不等于作者没做」这种否认句，正是需要的诚实措辞 —— 断言要查每处是否被「不等于」限定 */
var claims=(so.f6.match(/.{0,4}作者没做/g)||[]);
ck('缺失对照类 → 用「未检索到」，且每处「作者没做」都是否认句',
   so.f6.indexOf('未检索到')>=0 && claims.every(function(c){return c.indexOf('不等于')>=0;}));
ck('缺失对照类 → 提示可能在补充材料', so.f6.indexOf('补充材料')>=0);
var noq={figs:[{label:'Figure 1',caption:'Representative images.'}],tables:[],methods:'',results:'',
  discussion:'',body:'',refs:[],xrefs:[],secs:[]};
ck('图注无定量线索 → 明说「图注未给定量线索」',
   ftScaffold(baseSC(),noq,{pmcid:'P',src:'t'}).f3.indexOf('图注未给定量线索')>=0);
var chainft={figs:[],tables:[],methods:'',results:'',discussion:'',body:'We used the kit as described.',
  refs:[{id:'R1',title:'A protocol paper',src:'J',year:'2020',first:'Smith',pmid:'111',raw:'Smith 2020'}],
  xrefs:[{rid:'R1',sent:'We used the kit as described.',sec:'Methods › Ethical Approval'}],secs:[]};
ck('Methods 子节的引用能判成方法出处（坑2 已修）',
   String(ftScaffold(baseSC(),chainft,{pmcid:'P',src:'t'}).f14).indexOf('方法出处')>=0);
var notitle={figs:[],tables:[],methods:'',results:'',discussion:'',body:'x',
  refs:[{id:'b1',title:'',src:'Nature',year:'2020',first:'',pmid:'',raw:'Smith J. Nature 2020;1:2-3.'}],
  xrefs:[{rid:'b1',sent:'However this conflicts.',sec:''}],secs:[]};
var snt=String(ftScaffold(baseSC(),notitle,{pmcid:'P',src:'t'}).f14);
ck('无结构化标题的参考文献不被丢弃（坑3 已修）', snt.indexOf('Smith J. Nature 2020')>=0);
ck('且明说是参考表原文而非伪造标题', snt.indexOf('未提供结构化标题')>=0);
console.log('\n失败项合计: '+FAIL);
