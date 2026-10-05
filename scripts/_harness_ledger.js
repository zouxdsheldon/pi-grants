const {DOMParser}=require('/tmp/ftt/node_modules/@xmldom/xmldom');
const fs=require('fs');
var _LS={};
var localStorage={getItem:function(k){return _LS[k]===undefined?null:_LS[k];},
  setItem:function(k,v){_LS[k]=String(v);}};
function stat(m,c){}
var document={getElementById:function(){return {value:'',innerHTML:'',textContent:''};}};

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
var LS='psearch_';
var NCBI='https://eutils.ncbi.nlm.nih.gov/entrez/eutils/';
var EPMC='https://www.ebi.ac.uk/europepmc/webservices/rest/';
var RES=[];
var LASTQ='';
var LASTN=0;
var LASTLADDER=null;
var SORTK='';
var LS_SCR='pgs_scr_';   /* 筛选/精读/使用三层的人工字段，按 PMID 存，与总表分开 */
var STUDY_TYPES=[
 {k:'系统综述/元分析', re:/\b(systematic review|meta-?analys[ie]s|PRISMA|pooled analysis)\b/i},
 {k:'随机对照试验', re:/\b(randomi[sz]ed (controlled )?trial|\bRCT\b|double-?blind|placebo-?controlled)\b/i},
 {k:'队列研究', re:/\b(cohort (study|analysis)|prospectively followed|longitudinal (study|cohort))\b/i},
 {k:'病例对照', re:/\b(case-?control|matched controls?)\b/i},
 {k:'横断面/调查', re:/\b(cross-?sectional|survey|questionnaire)\b/i},
 {k:'病例报告/系列', re:/\b(case report|case series)\b/i},
 {k:'动物实验', re:/\b(mice|mouse|rats?|murine|porcine|pigs?|zebrafish|in vivo model|knock-?out mice)\b/i},
 {k:'细胞/体外实验', re:/\b(in vitro|cell lines?|cultured cells|transfect|HEK ?293|HeLa|K562|organoids?)\b/i},
 {k:'计算/生信', re:/\b(in silico|computational|bioinformatic|RNA-?seq|transcriptom|proteom|machine learning|deep learning|predict(ion|ive) model)\b/i},
 /* 期刊名本身就是强证据：Methods in Molecular Biology 整本都是实验方案。
    实测坑：原来只匹配摘要里的 protocol 等词，Phos-tag 那篇写的是「is a method that enables」，判不出类型。 */
 {k:'方法学/方案', re:/\b(protocol|Methods in Molecular Biology|Cold Spring Harb Protoc|Nat Protoc|Curr Protoc|STAR Protocols|we (describe|present|provide|report) (a |the )?(method|protocol|procedure|workflow|pipeline)|is a (method|technique|approach|protocol) (that|which|for|to)|step-?by-?step|detailed (protocol|procedure))\b/i},
 {k:'叙述性综述', re:/\b(review|overview|we summari[sz]e|this review)\b/i}
];
var SAMPLE_RE=[
 {k:'样本量', re:/\bn\s*=\s*[\d,]+/gi},
 {k:'受试/患者数', re:/\b([\d,]{1,7})\s+(patients?|participants?|subjects?|donors?|individuals?|volunteers?)\b/gi},
 {k:'动物数', re:/\b([\d,]{1,6})\s+(mice|rats?|pigs?|animals?)\b/gi},
 {k:'细胞/样本数', re:/\b([\d,]{2,9})\s+(cells|nuclei|samples|biopsies|specimens)\b/gi}
];
var ANALYSIS=[
 ['回归/多因素',/\b(linear|logistic|multivariable|multivariate|Poisson|negative binomial) regression\b/i],
 ['生存分析',/\b(Cox (proportional|regression)|Kaplan-?Meier|log-?rank|hazard ratio)\b/i],
 ['组间比较',/\b(t-?test|ANOVA|Mann-?Whitney|Wilcoxon|Kruskal-?Wallis|chi-?squared?|Fisher'?s exact)\b/i],
 ['诊断效能',/\b(ROC|AUC|sensitivity and specificity|receiver operating)\b/i],
 ['降维/聚类',/\b(PCA|principal component|PLS-?DA|t-?SNE|UMAP|hierarchical clustering|k-?means)\b/i],
 ['差异表达/富集',/\b(DESeq2?|edgeR|limma|differentially expressed|GSEA|gene set enrichment|pathway enrichment)\b/i],
 ['机器学习',/\b(random forest|support vector|XGBoost|neural network|cross-?validation|LASSO)\b/i],
 ['效应量/置信区间',/\b(effect size|Cohen'?s d|odds ratio|risk ratio|95% (CI|confidence interval))\b/i],
 ['功效分析',/\b(power (analysis|calculation)|sample size calculation)\b/i],
 ['结构方程/中介',/\b(structural equation|mediation analysis|path analysis)\b/i],
 ['定性分析',/\b(grounded theory|thematic analysis|content analysis|coding scheme)\b/i]
];
var FUTURE_RE=/\b(future (studies|work|research|experiments)|further (studies|work|investigation|research)|should be (investigated|explored|addressed)|warrants? (further|investigation)|next steps?|remains? to be)\b/i;
var SCR_FIELDS=[
 {k:'read',   lab:'阅读状态', opts:['未读','在读','已读','精读'], def:'未读'},
 {k:'prio',   lab:'优先级',   opts:['高','中','低'], def:'中'},
 {k:'relev',  lab:'相关度',   opts:['直接相关','间接相关','背景'], def:'间接相关'},
 {k:'incl',   lab:'纳入/排除',opts:['待定','纳入','排除'], def:'待定'},
 {k:'exreason',lab:'排除原因', opts:['','主题不符','方法不符','非同行评议','无法获取全文','样本/体系不适用','重复报告'], def:''},
 {k:'core',   lab:'是否核心', opts:['否','是'], def:'否'},
 {k:'cited',  lab:'引用状态', opts:['未引用','待引用','已引用'], def:'未引用'},
 {k:'qual',   lab:'我的质量评分', opts:['待定','高','中','低'], def:'待定'},
 {k:'rigor',  lab:'方法严谨性', opts:['待定','强','一般','弱'], def:'待定'},
 {k:'bias',   lab:'偏差风险', opts:['待定','低','中','高'], def:'待定'},
 {k:'part',   lab:'可放论文哪部分', opts:['','引言','文献综述','方法','结果','讨论'], def:''},
 {k:'rel2me', lab:'与我研究的关系', opts:['','理论依据','方法借鉴','对比对象','gap 来源','竞争风险'], def:''}
];
var SCR_TEXT=[
 {k:'tags',  lab:'主题标签（逗号分隔，可多个）', ph:'例：TDMD, miR-29, 纤维化'},
 {k:'hypo',  lab:'支持 / 反驳我的哪条假设', ph:'例：支持 P3（转录层竞争解释）；反驳我关于前体不变的预期'},
 {k:'crit',  lab:'我的批判性评论', ph:'一句话：我不相信它的哪一点，为什么'},
 {k:'excerpt',lab:'写作摘录 / 灵感', ph:'可直接搬进正文的那句话，或它给我的想法'},
 {k:'page',  lab:'页码 / 段落（引用定位）', ph:'例：p.4, Results 第 2 段 / Fig.3B'},
 {k:'pdf',   lab:'PDF 路径 / 文献管理软件位置', ph:'例：Zotero > TDMD > Han2020.pdf'}
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
var FTSTOP=false;
var L1=['queries','srcdb','found','updated'];
var L2=['title','authorsAll','first','year','journal','vol','issue','pages','doi','citation','url','lang','kw','stype','abstract'];
var L4=['ftsrc','question','theoryf','methods','samples','variables','analysis','figq','controls','findings','nums','conclusion','gaps','future'];
var L5=['quotes'];
var MCOLS=[
 ['pmid','文献ID(PMID)'],['read','状态'],['prio','优先级'],['stype','类型'],
 ['title','标题'],['authorsAll','作者'],['first','第一作者'],['year','年份'],
 ['journal','期刊'],['vol','卷'],['issue','期'],['pages','页码'],['doi','DOI'],
 ['citation','标准引用格式'],['url','URL'],
 ['srcdb','来源数据库'],['queries','检索式'],['lang','语言'],['kw','关键词'],['abstract','摘要'],
 ['incl','纳入/排除'],['exreason','排除原因'],['tags','主题标签'],['core','是否核心'],['cited','引用状态'],
 ['relev','相关度'],
 ['question','研究问题/目的'],['theoryf','理论框架/核心命题'],['methods','研究方法（含原句）'],
 ['samples','样本'],['variables','变量/测量指标'],['analysis','分析方法（含原句）'],
 ['figq','关键图与可信度（需全文）'],['controls','做了/漏了哪些对照（需全文）'],
 ['findings','主要发现'],['nums','关键数据（含原句）'],['conclusion','作者结论'],
 ['gaps','作者自述局限（原句）'],['future','未来研究方向（原句）'],['ftsrc','内容来源'],
 ['cites','被引数'],['rigor','方法严谨性'],['bias','偏差风险'],['qual','我的质量评分'],
 ['quotes','可直接引用的原句'],['page','页码/段落'],['hypo','支持/反驳我的哪条假设'],
 ['part','可放论文哪部分'],['rel2me','与我研究的关系'],['crit','我的批判性评论'],
 ['excerpt','写作摘录/灵感'],['pdf','PDF路径'],
 ['dirs','方向重叠'],['secOrigin','摘要分段来源'],['found','首次命中时间'],['updated','更新日期']];
var AUTO_COLS={pmid:1,stype:1,title:1,authorsAll:1,first:1,year:1,journal:1,vol:1,issue:1,pages:1,
 doi:1,citation:1,url:1,srcdb:1,queries:1,lang:1,kw:1,abstract:1,question:1,theoryf:1,methods:1,
 samples:1,analysis:1,findings:1,nums:1,conclusion:1,gaps:1,future:1,cites:1,quotes:1,dirs:1,
 secOrigin:1,found:1,controls:1,figq:1,ftsrc:1};
var LCOLS=[['ts','执行时间'],['query','实际送出的检索式'],['total','全库命中'],['fetched','抓取'],
 ['kept','收进总表'],['merged','合并'],['sort','排序'],['limit','上限'],['verdict','子句阶梯结论'],['ladder','阶梯明细']];
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
function ftEnrich(r, ft, meta){
  var bodyAll=(ft.results||'')+' '+(ft.body||'');
  var o={src:meta.src+' · '+meta.pmcid, figs:ft.figs.length, refs:ft.refs.length};
  o.samples=sampleScan(bodyAll).slice(0,10);
  o.analysis=analysisScan((ft.methods||'')+' '+bodyAll);
  o.nums=findNumbers(bodyAll).slice(0,14);
  o.methods=findMethods(ft.methods||bodyAll);
  o.future=futureScan((ft.discussion||'')+' '+bodyAll);
  o.limits=limScan((ft.discussion||'')+' '+bodyAll);
  o.ctrl=ctrlScan(bodyAll);
  o.figq=figCred(ft.figs).filter(function(f){return f.marks.length;}).slice(0,4);
  o.findings=splitSentences(ft.results||bodyAll).filter(function(s){
    return /\b(we (found|show|observed|identified|demonstrate)|significantly|increased|decreased|reduced|elevated)\b/i.test(s);}).slice(0,4);
  o.conclusion=splitSentences(ft.discussion||'').filter(function(s){
    return /\b(these (results|data|findings)|we conclude|taken together|collectively|in summary|our (results|findings))\b/i.test(s);}).slice(0,3);
  return o;
}
function bibExtra(x){
  return {
    vol:x.volume||'', issue:x.issue||'', pages:x.pages||'',
    lang:((x.lang||[])[0]||''),
    first:((x.authors||[])[0]||{}).name||'',
    last:((x.authors||[])[(x.authors||[]).length-1]||{}).name||'',
    nlmdate:x.pubdate||'', epub:x.epubdate||'',
    issn:x.issn||'', eissn:x.essn||''
  };
}
function vancouver(r){
  /* 标准引用格式（Vancouver 近似）。作者超过 6 位用 et al.，这是 NLM 的惯例。 */
  var au=(r.authorsAll&&r.authorsAll.length)?r.authorsAll:[];
  var head = au.length? (au.length>6? au.slice(0,6).join(', ')+', et al.' : au.join(', ')) : (r.authors||'');
  return head+'. '+(r.title||'')+' '+(r.journal||'')+'. '+(r.year||'')+
         (r.vol?(';'+r.vol):'')+(r.issue?('('+r.issue+')'):'')+(r.pages?(':'+r.pages):'')+'.'+
         (r.doi?(' doi:'+r.doi):'');
}
function pubUrl(r){ return r.pmid?('https://pubmed.ncbi.nlm.nih.gov/'+r.pmid+'/'):(r.doi?('https://doi.org/'+r.doi):''); }
function studyType(text,ptypes){
  var out=[];
  (ptypes||[]).forEach(function(p){
    if(/Review/i.test(p) && out.indexOf('叙述性综述')<0) out.push('叙述性综述');
    if(/Meta-Analysis/i.test(p) && out.indexOf('系统综述/元分析')<0) out.push('系统综述/元分析');
    if(/Randomized Controlled Trial/i.test(p) && out.indexOf('随机对照试验')<0) out.push('随机对照试验');
  });
  STUDY_TYPES.forEach(function(t){
    if(t.re.test(text||'') && out.indexOf(t.k)<0) out.push(t.k);
  });
  return out;
}
function sampleScan(text){
  var out=[];
  SAMPLE_RE.forEach(function(s){
    var m=(text||'').match(s.re)||[];
    m.slice(0,4).forEach(function(h){ if(out.length<8) out.push({kind:s.k, hit:h}); });
  });
  return out;
}
function analysisScan(text){
  var sents=splitSentences(text||''), out=[];
  ANALYSIS.forEach(function(a){
    for(var i=0;i<sents.length;i++){
      if(a[1].test(sents[i])){ var m=sents[i].match(a[1]); out.push({name:a[0],hit:m?m[0]:'',sent:sents[i].slice(0,300)}); break; }
    }
  });
  return out;
}
function futureScan(text){
  var out=[], sents=splitSentences(text||'');
  for(var i=0;i<sents.length && out.length<4;i++){
    if(FUTURE_RE.test(sents[i])){ var m=sents[i].match(FUTURE_RE); out.push({hit:m?m[0]:'',sent:sents[i].slice(0,300)}); }
  }
  return out;
}
function reviewSpecific(text){
  var o={strategy:[],nstudies:[],framework:[]};
  splitSentences(text||'').forEach(function(s){
    if(/\b(searched|search (was|strategy)|PubMed|Embase|Web of Science|Scopus|CNKI|Cochrane|databases? (were|was) searched)\b/i.test(s)
       && o.strategy.length<3) o.strategy.push(s.slice(0,300));
    var m=s.match(/\b([\d,]{1,5})\s+(studies|trials|articles|papers|records|reports)\b/i);
    if(m && o.nstudies.length<3) o.nstudies.push({hit:m[0], sent:s.slice(0,300)});
    if(/\b(we (classif|categori|group)|framework|taxonomy|we divide|three (categories|classes|groups)|four (categories|classes))\b/i.test(s)
       && o.framework.length<3) o.framework.push(s.slice(0,300));
  });
  return o;
}
function picos(text,types){
  var sents=splitSentences(text||'');
  function first(re){ for(var i=0;i<sents.length;i++){ if(re.test(sents[i])) return sents[i].slice(0,300); } return ''; }
  return {
    P:first(/\b(patients?|participants?|subjects?|mice|rats?|pigs?|cell lines?|cohort of|we (enrolled|recruited|included))\b/i),
    I:first(/\b(treated with|administered|intervention|we (applied|induced|overexpressed|knocked (down|out))|transfect|infusion|dose)\b/i),
    C:first(/\b(compared (with|to)|versus|\bvs\.?\b|control group|placebo|vehicle|wild-?type|untreated)\b/i),
    O:first(/\b(primary (outcome|endpoint)|we measured|readout|assessed by|quantified|survival|expression of)\b/i),
    S:(types||[]).join(' / ')
  };
}
function theorySpecific(text){
  var sents=splitSentences(text||'');
  function grab(re,n){ var o=[]; for(var i=0;i<sents.length&&o.length<n;i++){ if(re.test(sents[i])) o.push(sents[i].slice(0,300)); } return o; }
  return {
    prop:grab(/\b(we (propose|argue|posit|hypothesi[sz]e)|this (model|framework) (suggests|predicts)|we put forward)\b/i,3),
    mech:grab(/\b(mechanis|mediated by|via|through (the )?(activation|inhibition|binding)|acts? (on|through))\b/i,3),
    bound:grab(/\b(only (when|if)|depends? on|conditional|in the (absence|presence) of|limited to|context-?dependent|boundary)\b/i,3)
  };
}
function enrich(r){
  /* 期刊名也参与类型判定 —— 见 STUDY_TYPES 里方法学那条的注释 */
  var text=(r.title||'')+' '+(r.journal||'')+' '+(r.abstract||'')+' '+((r.mesh||[]).join(' '));
  var st=structureAbstract(r.abstract,r.labeled);
  var sec=function(re){var f=st.parts.filter(function(x){return re.test(x.name);}); return f.length?f[0].text:'';};
  var types=studyType(text,r.ptypes);
  var isRev=types.indexOf('叙述性综述')>=0||types.indexOf('系统综述/元分析')>=0;
  var e={
    types:types,
    question:sec(/目的|目标/)||sec(/背景/)||'',
    findings:splitSentences(sec(/结果/)||'').slice(0,3),
    conclusion:splitSentences(sec(/结论/)||'').slice(0,2),
    samples:sampleScan(r.abstract||''),
    analysis:analysisScan(r.abstract||''),
    future:futureScan(r.abstract||''),
    kw:(r.mesh||[]).slice(0,12),
    authorKw:(r.authorKw||[]).slice(0,10),
    secOrigin:st.origin
  };
  if(isRev) e.rev=reviewSpecific(r.abstract||'');
  else e.picos=picos(r.abstract||'',types);
  e.theory=theorySpecific(r.abstract||'');
  /* 层 5「可直接引用的原句」：优先带数字的句子，其次方法句与作者自承空白句 */
  var quotes=[];
  (r.nums||[]).slice(0,4).forEach(function(n){ quotes.push({why:'含数字（'+n.kind+' '+n.hit+'）', sent:n.sent}); });
  (r.methods||[]).slice(0,2).forEach(function(m){ quotes.push({why:'方法证据（'+m.name+'）', sent:m.sent}); });
  (r.gaps||[]).slice(0,2).forEach(function(g){ quotes.push({why:'作者自承空白', sent:g.sent}); });
  e.quotes=quotes;
  return e;
}
function getScr(pmid){
  try{ return JSON.parse(localStorage.getItem(LS_SCR+pmid)||'{}'); }catch(e){ return {}; }
}
function putScr(pmid,o){
  try{ localStorage.setItem(LS_SCR+pmid,JSON.stringify(o)); }catch(e){ stat('本机存储已满，先导出再清理。','err'); }
}
function scrOf(pmid){
  var s=getScr(pmid);
  SCR_FIELDS.forEach(function(f){ if(s[f.k]===undefined) s[f.k]=f.def; });
  SCR_TEXT.forEach(function(f){ if(s[f.k]===undefined) s[f.k]=''; });
  return s;
}
function funnel(list){
  var f={total:list.length, screened:0, fulltext:0, included:0, excluded:0, pending:0};
  list.forEach(function(r){
    var s=scrOf(r.pmid);
    if(s.read!=='未读') f.screened++;
    if(s.read==='已读'||s.read==='精读') f.fulltext++;
    if(s.incl==='纳入') f.included++;
    else if(s.incl==='排除') f.excluded++;
    else f.pending++;
  });
  return f;
}
function labOf(k){ for(var i=0;i<MCOLS.length;i++){ if(MCOLS[i][0]===k) return MCOLS[i][1]; } return k; }
function cellOf(r,k){
  var e=r.enr||{}, s=scrOf(r.pmid), F=r.ftEnr||null;
  /* 层 3+5+质量：人工字段直接取本机存的值 */
  if(SCR_FIELDS.concat(SCR_TEXT).some(function(f){return f.k===k;})) return String(s[k]||'');
  /* 层 2 题录 */
  if(k==='authorsAll') return (r.authorsAll||[]).join(', ')||String(r.authors||'');
  if(k==='first') return (r.authorsAll||[])[0]||String(r.authors||'').split(',')[0]||'';
  if(k==='url') return pubUrl(r);
  if(k==='citation') return vancouver(r);
  if(k==='srcdb') return 'PubMed (NCBI E-utilities) + Europe PMC（被引数、开放全文）';
  if(k==='lang') return r.lang||'';
  if(k==='updated') return new Date().toISOString().slice(0,10);
  if(k==='kw'){
    var mk=(r.mesh||[]), ak=(r.authorKw||[]);
    return (mk.length?('MeSH：'+mk.join('、')):'')+(ak.length?((mk.length?'\n':'')+'作者关键词：'+ak.join('、')):'')
           || '该条 PubMed 记录未给 MeSH 与作者关键词';
  }
  if(k==='ftsrc') return F?('全文已读 · '+F.src+'（'+F.figs+' 图 / '+F.refs+' 条参考文献）')
                          :('仅摘要 —— '+(r.ftNote||'尚未尝试取全文，点「取全文补齐内容层」'));
  /* 取到开放全文时内容层改用全文版并标【全文】；取不到就保持摘要版 —— 两者在表里可区分 */
  if(F){
    if(k==='samples'&&F.samples.length) return '【全文】'+F.samples.map(function(x){return '· '+x.kind+'：'+x.hit;}).join('\n');
    if(k==='analysis'&&F.analysis.length) return '【全文】'+F.analysis.map(function(x){return '· '+x.name+'（命中 '+x.hit+'）\n  原句：'+x.sent;}).join('\n');
    if(k==='nums'&&F.nums.length) return '【全文】'+F.nums.map(function(x){return '· ['+x.kind+'] '+x.hit+'\n  原句：'+x.sent;}).join('\n');
    if(k==='methods'&&F.methods.length) return '【全文 Methods】'+F.methods.map(function(x){return '· '+x.name+'（命中 '+x.hit+'）\n  原句：'+x.sent;}).join('\n');
    if(k==='findings'&&F.findings.length) return '【全文 Results】'+F.findings.map(function(x){return '· '+x;}).join('\n');
    if(k==='conclusion'&&F.conclusion.length) return '【全文 Discussion】'+F.conclusion.map(function(x){return '· '+x;}).join('\n');
    if(k==='future'&&F.future.length) return '【全文】'+F.future.map(function(x){return '· （命中 "'+x.hit+'"）'+x.sent;}).join('\n');
    if(k==='gaps'&&F.limits.length) return '【全文 Discussion】'+F.limits.map(function(x){return '· （命中 "'+x.hit+'"）'+x.sent;}).join('\n');
    if(k==='controls') return '【全文】'+F.ctrl.map(function(c){
        return c.hits.length? (c.k+' → 检索到 '+c.hits.length+' 句\n'+c.hits.map(function(h){return '    · '+h.sent;}).join('\n'))
                            : (c.k+' → 全文中未检索到这一类对照句（不等于作者没做，可能在补充材料）');}).join('\n');
    if(k==='figq') return F.figq.length? ('【全文】'+F.figq.map(function(f){return '· '+f.label+'　定量线索：'+f.marks.join('、')+'\n    图注：'+f.caption.slice(0,220);}).join('\n'))
                                        : '全文图注里没有 n=／±／统计检验等定量线索';
  }
  if(k==='controls') return '仅摘要，无法判断对照 —— 点「取全文补齐内容层」';
  if(k==='figq') return '仅摘要，无图注 —— 点「取全文补齐内容层」';
  /* 层 4 内容精读：自动抽取，抽不到就写「摘要未报告」，不猜 */
  if(k==='stype') return (e.types||[]).join(' / ')||'未能从标题/摘要判定';
  if(k==='question') return e.question||'摘要未给目的/背景段';
  if(k==='findings') return (e.findings||[]).map(function(x){return '· '+x;}).join('\n')||'摘要未给结果段';
  if(k==='conclusion') return (e.conclusion||[]).map(function(x){return '· '+x;}).join('\n')||'摘要未给结论段';
  if(k==='samples') return (e.samples||[]).map(function(x){return '· '+x.kind+'：'+x.hit;}).join('\n')||'摘要未报告样本量';
  if(k==='analysis') return (e.analysis||[]).map(function(x){return '· '+x.name+'（命中 '+x.hit+'）\n  原句：'+x.sent;}).join('\n')||'摘要未提到具体分析方法';
  if(k==='future') return (e.future||[]).map(function(x){return '· （命中 "'+x.hit+'"）'+x.sent;}).join('\n')||'摘要未提未来方向';
  if(k==='variables'){
    var v=(e.analysis||[]).map(function(x){return x.name;});
    return v.length?('可从分析方法反推：'+v.join('、')+'\n【需你确认】具体自变量/因变量/协变量请读全文 Methods 后补'):'【需你填】摘要不足以判定变量';
  }
  if(k==='theoryf'){
    var t=e.theory||{}, L=[];
    if((t.prop||[]).length) L.push('核心命题：'+t.prop.map(function(x){return '\n  · '+x;}).join(''));
    if((t.mech||[]).length) L.push('机制陈述：'+t.mech.map(function(x){return '\n  · '+x;}).join(''));
    if((t.bound||[]).length) L.push('边界条件：'+t.bound.map(function(x){return '\n  · '+x;}).join(''));
    if(e.rev){
      if((e.rev.strategy||[]).length) L.push('【综述专项】检索策略：'+e.rev.strategy.map(function(x){return '\n  · '+x;}).join(''));
      if((e.rev.nstudies||[]).length) L.push('【综述专项】纳入研究数：'+e.rev.nstudies.map(function(x){return '\n  · '+x.hit+' —— '+x.sent;}).join(''));
      if((e.rev.framework||[]).length) L.push('【综述专项】分类框架：'+e.rev.framework.map(function(x){return '\n  · '+x;}).join(''));
    }
    if(e.picos){
      var p=e.picos, pl=[];
      if(p.P) pl.push('P 人群/体系：'+p.P);
      if(p.I) pl.push('I 干预/暴露：'+p.I);
      if(p.C) pl.push('C 对照：'+p.C);
      if(p.O) pl.push('O 结果：'+p.O);
      if(p.S) pl.push('S 设计：'+p.S);
      if(pl.length) L.push('【实证专项 PICOS】'+pl.map(function(x){return '\n  · '+x;}).join(''));
    }
    return L.join('\n')||'摘要里没有可识别的命题/机制/边界陈述';
  }
  if(k==='quotes') return (e.quotes||[]).map(function(x){return '· ['+x.why+'] 「'+x.sent+'」';}).join('\n')||'摘要里没有带数字或方法证据的可引用句';
  if(k==='isReview') return r.isReview?'综述':'研究';
  if(k==='cites') return (r.cites===null?('未获取（'+(r.citeNote||'')+'）'):String(r.cites));
  if(k==='dirs') return (r.dirs||[]).map(function(d){return d.name+'：'+d.hits.join('、');}).join('\n');
  if(k==='methods') return (r.methods||[]).map(function(m){return '· '+m.name+'（命中 '+m.hit+'）\n  原句：'+m.sent;}).join('\n');
  if(k==='nums') return (r.nums||[]).map(function(n){return '· ['+n.kind+'] '+n.hit+'\n  原句：'+n.sent;}).join('\n');
  if(k==='gaps') return (r.gaps||[]).map(function(g){return '· '+g.sent;}).join('\n');
  if(k==='secOrigin') return r.secOrigin==='source'?'出版方标注':'规则推断（可能出错）';
  if(k==='queries') return (r.queries||[]).join('\n');
  if(k==='found') return String(r.found||'').slice(0,16).replace('T',' ');
  return String(r[k]===undefined||r[k]===null?'':r[k]);
}
function xlsTable(cols,rows,rowfn,mark){
  var h='<table><tr>'+cols.map(function(c){return '<th>'+esc(c[1])+'</th>';}).join('')+'</tr>';
  /* 表头第二行标出每列是自动抓的还是要你填的 —— 打开表就知道哪些格子是待办 */
  if(mark) h+='<tr>'+cols.map(function(c){
    return '<td style="background:#F3E5F5;font-size:8.5pt;color:#4A148C">'+
           (AUTO_COLS[c[0]]?'auto 自动抓':'你填')+'</td>';}).join('')+'</tr>';
  rows.forEach(function(r){ h+='<tr>'+cols.map(function(c){
    return '<td>'+esc(rowfn(r,c[0])).replace(/\n/g,'<br>')+'</td>';}).join('')+'</tr>'; });
  return h+'</table>';
}
function xlsMulti(sheets){
  var names=sheets.map(function(s){
    return '<x:ExcelWorksheet><x:Name>'+esc(s[0])+'</x:Name><x:WorksheetOptions><x:DisplayGridlines/>'+
           '</x:WorksheetOptions></x:ExcelWorksheet>';}).join('');
  return '<html xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="utf-8">'+
   '<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>'+names+
   '</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->'+
   '<style>td,th{border:1px solid #999;font-size:10pt;vertical-align:top}'+
   'th{background:#EDE7F6;font-weight:bold}br{mso-data-placement:same-cell}</style></head><body>'+
   sheets.map(function(s){return s[1];}).join('<br style="page-break-before:always">')+'</body></html>';
}
function processSheet(L){
  var F=funnel(L), led=getLedger();
  var rows=[
   ['数据库','PubMed（NCBI E-utilities esearch/esummary/efetch）＋ Europe PMC（被引数、开放全文）'],
   ['导出日期',new Date().toISOString().slice(0,16).replace('T',' ')],
   ['总表条目数（跨检索去重，按 PMID）',String(F.total)],
   ['检索次数',String(led.length)],
   ['抓取合计（各次 fetched 之和）',String(led.reduce(function(a,e){return a+(e.fetched||0);},0))],
   ['收进总表合计',String(led.reduce(function(a,e){return a+(e.kept||0);},0))],
   ['因已存在而合并检索式',String(led.reduce(function(a,e){return a+(e.merged||0);},0))],
   ['—— 筛选漏斗 ——',''],
   ['① 入库（去重后）',String(F.total)],
   ['② 已初筛（状态≠未读）',String(F.screened)],
   ['③ 已读 / 精读',String(F.fulltext)],
   ['④ 最终纳入',String(F.included)],
   ['⑤ 排除',String(F.excluded)],
   ['⑥ 待定',String(F.pending)],
   ['—— 排除原因分布 ——','']
  ];
  var ex={};
  L.forEach(function(r){ var s=scrOf(r.pmid); if(s.incl==='排除'){ var k=s.exreason||'（未写原因）'; ex[k]=(ex[k]||0)+1; } });
  Object.keys(ex).forEach(function(k){ rows.push([k,String(ex[k])]); });
  if(!Object.keys(ex).length) rows.push(['（还没有标为排除的条目）','']);
  var ft=L.filter(function(r){return r.ftEnr;}).length;
  rows.push(['—— 全文覆盖 ——','']);
  rows.push(['已取到 PMC 开放全文并按全文重填内容层',String(ft)]);
  rows.push(['仅摘要（付费墙或未尝试）',String(L.length-ft)]);
  rows.push(['—— 逐次检索明细 ——','']);
  led.forEach(function(e,i){
    rows.push(['第 '+(led.length-i)+' 次 · '+String(e.ts).slice(0,16).replace('T',' '),
      '检索式：'+(e.query||'')+' ｜ 全库命中 '+(e.total==null?'?':e.total)+' ｜ 抓取 '+(e.fetched||0)+
      ' ｜ 收进 '+(e.kept||0)+' ｜ 合并 '+(e.merged||0)+' ｜ 排序 '+(e.sort||'')+' ｜ 上限 '+(e.limit||'')+
      (e.ladder?(' ｜ 子句阶梯：'+e.ladder.verdict):'')]);
  });
  return '<table><tr><th>项目</th><th>值</th></tr>'+
    rows.map(function(x){
      var b=/^——/.test(x[0]);
      return '<tr><td'+(b?' style="background:#EDE7F6;font-weight:bold"':'')+'>'+esc(x[0])+'</td><td>'+
             esc(x[1]).replace(/\n/g,'<br>')+'</td></tr>';}).join('')+'</table>';
}
function ledCell(e,k){
  if(k==='ts') return String(e.ts).slice(0,16).replace('T',' ');
  if(k==='verdict') return e.ladder?e.ladder.verdict:'未触发（命中充足）';
  if(k==='ladder'){
    if(!e.ladder) return '';
    var s=Object.keys(e.ladder.singles||{}).map(function(x){return '单词 '+x+' → '+e.ladder.singles[x];});
    var p=Object.keys(e.ladder.pairs||{}).map(function(x){return '两两 '+x+' → '+e.ladder.pairs[x];});
    return s.concat(p).join('\n');
  }
  return String(e[k]===undefined||e[k]===null?'':e[k]);
}
function getLedger(){try{return JSON.parse(localStorage.getItem(LS+'ledger')||'[]');}catch(e){return [];}}
function putLedger(a){try{localStorage.setItem(LS+'ledger',JSON.stringify(a));}catch(e){}}
function getMaster(){try{return JSON.parse(localStorage.getItem(LS+'master')||'{}');}catch(e){return {};}}
function putMaster(o){try{localStorage.setItem(LS+'master',JSON.stringify(o));}catch(e){stat('本机存储已满，先导出再清理。','err');}}
function masterList(){var M=getMaster();return Object.keys(M).map(function(k){return M[k];});}
function slim(r){
  return {pmid:r.pmid,title:r.title,journal:r.journal,year:r.year,authors:r.authors,nauth:r.nauth,
    doi:r.doi,isReview:r.isReview,cites:r.cites,citeNote:r.citeNote,secOrigin:r.secOrigin,
    methods:r.methods.map(function(m){return {name:m.name,hit:m.hit,sent:m.sent};}),
    nums:r.nums.map(function(n){return {kind:n.kind,hit:n.hit,sent:n.sent};}),
    gaps:r.gaps.map(function(g){return {sent:g.sent};}),
    dirs:r.dirs.map(function(d){return {id:d.id,name:d.name,hits:d.hits};}),
    abstract:r.abstract, queries:[r.query], found:r.found,
    /* 层 2 题录补全 */
    authorsAll:r.authorsAll||[], vol:r.vol||'', issue:r.issue||'', pages:r.pages||'',
    lang:r.lang||r.lang2||'', issn:r.issn||'', ptypes:r.ptypes||[], mesh:(r.mesh||[]).slice(0,15),
    authorKw:(r.authorKw||[]).slice(0,12), nlmdate:r.nlmdate||'',
    /* 层 4 内容精读（自动抽取，落盘以免每次重算） */
    enr:enrich(r)};
}
function detailHTML(r){
  var pmid=r.pmid, s=scrOf(pmid);
  function block(title,keys,note){
    var rows=keys.map(function(k){
      var v=cellOf(r,k); if(!v) return '';
      return '<div style="margin:4px 0"><b style="color:var(--bb);font-size:12.4px">'+esc(labOf(k))+'</b>'+
             '<div class="ev" style="white-space:pre-wrap">'+esc(v)+'</div></div>';
    }).join('');
    return '<div style="margin:8px 0"><div style="font-weight:700;color:var(--pp)">'+title+'</div>'+
           (note?('<div class="note">'+note+'</div>'):'')+(rows||'<div class="note">无内容</div>')+'</div>';
  }
  var h='<div style="padding:8px 10px;background:#FAF8FD;border-left:3px solid var(--pp)">';
  h+=block('① 过程信息（可重复性）',L1,'这篇被哪些检索式命中、来自哪个库、何时首次命中 —— 写方法学章节时按这个复现。');
  h+=block('② 题录信息（自动导出）',L2,'卷/期/页/语言/关键词均来自 PubMed 记录本身；该记录没给的字段会写「未给」，不补。');
  h+=block('④ 内容精读（自动抽取，每条附原句）',L4,
    '综述额外抓检索策略/纳入研究数/分类框架；实证额外抓 PICOS —— 按文献类型自动切换。抽不到就写「摘要未报告」。');
  h+=block('⑤ 使用信息 · 可直接引用的原句',L5,'优先给带数字的句子，其次是方法证据句与作者自承空白句。');
  h+='<div style="margin:10px 0 4px;font-weight:700;color:var(--pp)">③ 筛选与质量 ＋ ⑤ 写作素材（这些要你判断，默认一律「待定」）</div>';
  h+='<div style="display:flex;flex-wrap:wrap;gap:8px">';
  SCR_FIELDS.forEach(function(f){
    h+='<label style="font-size:12.2px">'+esc(f.lab)+'<br><select data-scr="'+esc(pmid)+'" data-k="'+f.k+'">'+
       f.opts.map(function(o){return '<option value="'+esc(o)+'"'+(String(s[f.k])===o?' selected':'')+'>'+esc(o||'—')+'</option>';}).join('')+
       '</select></label>';
  });
  h+='</div>';
  SCR_TEXT.forEach(function(f){
    h+='<div style="margin:6px 0"><label style="font-size:12.2px;font-weight:600">'+esc(f.lab)+'</label>'+
       '<textarea data-scr="'+esc(pmid)+'" data-k="'+f.k+'" rows="2" style="width:100%" placeholder="'+esc(f.ph)+'">'+
       esc(s[f.k]||'')+'</textarea></div>';
  });
  h+='<div class="note">改动即时存本机（键 '+LS_SCR+pmid+'），与总表分开存，重新检索不会冲掉。</div>';
  return h+'</div>';
}
function scrBadge(pmid,k){
  var s=scrOf(pmid), v=String(s[k]||'');
  var col={'未读':'#6b7280','在读':'#0D47A1','已读':'#1b7f4d','精读':'#4A148C',
           '待定':'#7A5200','纳入':'#1b7f4d','排除':'#b3261e'}[v]||'#6b7280';
  return '<span class="badge" style="color:'+col+';border-color:'+col+'">'+esc(v||'—')+'</span>';
}
