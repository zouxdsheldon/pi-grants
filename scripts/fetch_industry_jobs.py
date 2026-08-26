#!/usr/bin/env python3
"""fetch_industry_jobs.py — 美国生物技术公司岗位抓取（公司为中心）

设计要点（每条都由实测缺陷驱动，勿随意删改）:

1. 公司板注册表 BOARDS 是**逐个核验过的**，不是猜名字得来的。
   猜名字会撞同名公司：实测 gh/beam = 数学公益组织、gh/verve = 广告公司、
   gh/caribou = 金融公司、ab/relay = 物流公司、ab/genesis = AI 机器人公司、
   gh/charles = 与 Charles River 无关、gh/new = "Sonja Inc."。
   核验用三条**互不相关**的证据（详见 tests/）：
     E1 语料规模 >=5 条（少于此无法判定，且这类板贡献岗位≈0，排除代价可忽略）
     E2 职位标题生物医药词占比 >=0.15（裸 "Scientist" 需排除 "Data Scientist"，
        ab/relay 曾靠 4 个 Data Scientist 岗拿到 0.17 混过）
     E3 描述正文含 >=4 个严格行业术语（与 E2 互不相关，是拦同名板最硬一道；
        Greenhouse 板另需板名核与公司名核严格相等——包含匹配会让 'beam' 命中）

2. 描述截断必须在**剔除样板文字之后**。反过来做会让多数岗位无文本可打分：
   公司惯例把 Company Overview 放开头，先截 600 字则窗口内全是样板。

3. 样板文字用**经验法**识别：同一公司多数岗位重复出现的句子按定义即样板，
   逐句加正则是打地鼠（实测加了 3 轮仍有公司愿景句漏网）。

4. 关键词匹配用**词边界**正则，不用子串包含。子串会把普通商务英语算作生物学。

5. 分数语义 = 与 Sheldon 本人实验台工作的接近度，是排序辅助，不是价值判断。
   职能族权重把行政/商务岗折价并**显式标注**折价前原始分，折价可审计。

6. 仅保留美国岗位（用户明确要求）。地点字段各 ATS 不同，见 us_only()。
"""
import json, re, sys, time, html, urllib.request, urllib.error
from collections import Counter, defaultdict
from datetime import datetime, timezone

UA = {"User-Agent": "pi-grants-industry/2.0"}
TIMEOUT = 45

# ── 已核验公司板注册表 ────────────────────────────────────────────
BOARDS = [
 {
  "co": "Altos Labs",
  "cat": "aging",
  "ats": "gh",
  "tok": "altoslabs"
 },
 {
  "co": "NewLimit",
  "cat": "aging",
  "ats": "gh",
  "tok": "newlimit"
 },
 {
  "co": "Retro Biosciences",
  "cat": "aging",
  "ats": "lv",
  "tok": "retro"
 },
 {
  "co": "A-Alpha Bio",
  "cat": "ai",
  "ats": "gh",
  "tok": "aalphabio"
 },
 {
  "co": "Cellarity",
  "cat": "ai",
  "ats": "gh",
  "tok": "cellarity"
 },
 {
  "co": "Chai Discovery",
  "cat": "ai",
  "ats": "ab",
  "tok": "chaidiscovery"
 },
 {
  "co": "Cradle Bio",
  "cat": "ai",
  "ats": "ab",
  "tok": "cradlebio"
 },
 {
  "co": "Eikon Therapeutics",
  "cat": "ai",
  "ats": "gh",
  "tok": "eikontherapeutics"
 },
 {
  "co": "Enveda Biosciences",
  "cat": "ai",
  "ats": "lv",
  "tok": "enveda"
 },
 {
  "co": "Generate Biomedicines",
  "cat": "ai",
  "ats": "gh",
  "tok": "generatebiomedicines"
 },
 {
  "co": "Iambic Therapeutics",
  "cat": "ai",
  "ats": "ab",
  "tok": "iambic-therapeutics"
 },
 {
  "co": "Insitro",
  "cat": "ai",
  "ats": "ab",
  "tok": "insitro"
 },
 {
  "co": "Isomorphic Labs",
  "cat": "ai",
  "ats": "gh",
  "tok": "isomorphiclabs"
 },
 {
  "co": "Recursion Pharmaceuticals",
  "cat": "ai",
  "ats": "gh",
  "tok": "recursionpharmaceuticals"
 },
 {
  "co": "Relay Therapeutics",
  "cat": "ai",
  "ats": "gh",
  "tok": "relaytherapeutics"
 },
 {
  "co": "Valo Health",
  "cat": "ai",
  "ats": "gh",
  "tok": "valohealth"
 },
 {
  "co": "Xaira Therapeutics",
  "cat": "ai",
  "ats": "gh",
  "tok": "xairatherapeutics"
 },
 {
  "co": "Fate Therapeutics",
  "cat": "cell",
  "ats": "lv",
  "tok": "fatetherapeutics"
 },
 {
  "co": "Lyell Immunopharma",
  "cat": "cell",
  "ats": "gh",
  "tok": "lyellimmunopharma"
 },
 {
  "co": "Obsidian Therapeutics",
  "cat": "cell",
  "ats": "gh",
  "tok": "obsidiantherapeutics"
 },
 {
  "co": "Tr1X",
  "cat": "cell",
  "ats": "gh",
  "tok": "tr1x"
 },
 {
  "co": "Umoja Biopharma",
  "cat": "cell",
  "ats": "gh",
  "tok": "umojabiopharma"
 },
 {
  "co": "Vor Biopharma",
  "cat": "cell",
  "ats": "gh",
  "tok": "vorbiopharma"
 },
 {
  "co": "Arvinas",
  "cat": "degrade",
  "ats": "gh",
  "tok": "arvinas"
 },
 {
  "co": "Kymera Therapeutics",
  "cat": "degrade",
  "ats": "gh",
  "tok": "kymeratherapeutics"
 },
 {
  "co": "Nurix Therapeutics",
  "cat": "degrade",
  "ats": "gh",
  "tok": "nurix"
 },
 {
  "co": "Color Health",
  "cat": "dx",
  "ats": "ab",
  "tok": "color-health"
 },
 {
  "co": "Delfi Diagnostics",
  "cat": "dx",
  "ats": "lv",
  "tok": "delfidiagnostics"
 },
 {
  "co": "Freenome",
  "cat": "dx",
  "ats": "gh",
  "tok": "freenome"
 },
 {
  "co": "Natera",
  "cat": "dx",
  "ats": "gh",
  "tok": "natera"
 },
 {
  "co": "Beam Therapeutics",
  "cat": "edit",
  "ats": "gh",
  "tok": "beamtherapeutics"
 },
 {
  "co": "Prime Medicine",
  "cat": "edit",
  "ats": "gh",
  "tok": "primemedicine"
 },
 {
  "co": "Verve Therapeutics",
  "cat": "edit",
  "ats": "gh",
  "tok": "verve"
 },
 {
  "co": "Ultragenyx Pharmaceutical",
  "cat": "gt",
  "ats": "gh",
  "tok": "ultragenyxpharmaceutical"
 },
 {
  "co": "Arc Institute",
  "cat": "inst",
  "ats": "gh",
  "tok": "arcinstitute"
 },
 {
  "co": "Chan Zuckerberg Initiative",
  "cat": "inst",
  "ats": "gh",
  "tok": "chanzuckerberginitiative"
 },
 {
  "co": "Akero Therapeutics",
  "cat": "metab",
  "ats": "gh",
  "tok": "akerotherapeutics"
 },
 {
  "co": "Corcept Therapeutics",
  "cat": "metab",
  "ats": "gh",
  "tok": "corcepttherapeutics"
 },
 {
  "co": "Edgewise Therapeutics",
  "cat": "metab",
  "ats": "gh",
  "tok": "edgewisetherapeutics"
 },
 {
  "co": "Blueprint Medicines",
  "cat": "pharma",
  "ats": "gh",
  "tok": "blueprintmedicines"
 },
 {
  "co": "Erasca",
  "cat": "pharma",
  "ats": "gh",
  "tok": "erasca"
 },
 {
  "co": "Kura Oncology",
  "cat": "pharma",
  "ats": "gh",
  "tok": "kuraoncology"
 },
 {
  "co": "Nuvalent",
  "cat": "pharma",
  "ats": "gh",
  "tok": "nuvalent"
 },
 {
  "co": "Olema Oncology",
  "cat": "pharma",
  "ats": "gh",
  "tok": "olema"
 },
 {
  "co": "Revolution Medicines",
  "cat": "pharma",
  "ats": "gh",
  "tok": "revolutionmedicines"
 },
 {
  "co": "Tango Therapeutics",
  "cat": "pharma",
  "ats": "gh",
  "tok": "tangotherapeutics"
 },
 {
  "co": "Treeline Biosciences",
  "cat": "pharma",
  "ats": "gh",
  "tok": "treelinebiosciences"
 },
 {
  "co": "Vaxcyte",
  "cat": "pharma",
  "ats": "gh",
  "tok": "vaxcyte"
 },
 {
  "co": "Xilio Therapeutics",
  "cat": "pharma",
  "ats": "gh",
  "tok": "xiliotherapeutics"
 },
 {
  "co": "Alltrna",
  "cat": "rna",
  "ats": "gh",
  "tok": "alltrna"
 },
 {
  "co": "Dyne Therapeutics",
  "cat": "rna",
  "ats": "gh",
  "tok": "dynetherapeutics"
 },
 {
  "co": "Entrada Therapeutics",
  "cat": "rna",
  "ats": "gh",
  "tok": "entradatherapeutics"
 },
 {
  "co": "Stoke Therapeutics",
  "cat": "rna",
  "ats": "gh",
  "tok": "stoketherapeutics"
 },
 {
  "co": "Strand Therapeutics",
  "cat": "rna",
  "ats": "gh",
  "tok": "strandtherapeutics"
 },
 {
  "co": "Tessera Therapeutics",
  "cat": "rna",
  "ats": "gh",
  "tok": "tesseratherapeutics"
 },
 {
  "co": "Akoya Biosciences",
  "cat": "tools",
  "ats": "gh",
  "tok": "akoya"
 },
 {
  "co": "Alamar Biosciences",
  "cat": "tools",
  "ats": "gh",
  "tok": "alamarbiosciences"
 },
 {
  "co": "Benchling",
  "cat": "tools",
  "ats": "ab",
  "tok": "benchling"
 },
 {
  "co": "Cellanome",
  "cat": "tools",
  "ats": "gh",
  "tok": "cellanome"
 },
 {
  "co": "Element Biosciences",
  "cat": "tools",
  "ats": "gh",
  "tok": "elementbiosciences"
 },
 {
  "co": "Ginkgo Bioworks",
  "cat": "tools",
  "ats": "gh",
  "tok": "ginkgobioworks"
 },
 {
  "co": "Maravai LifeSciences",
  "cat": "tools",
  "ats": "gh",
  "tok": "maravailifesciences"
 },
 {
  "co": "Parse Biosciences",
  "cat": "tools",
  "ats": "gh",
  "tok": "parsebiosciences"
 },
 {
  "co": "Seer",
  "cat": "tools",
  "ats": "gh",
  "tok": "seer"
 },
 {
  "co": "Singular Genomics",
  "cat": "tools",
  "ats": "gh",
  "tok": "singulargenomics"
 },
 {
  "co": "TriLink Biotechnologies",
  "cat": "tools",
  "ats": "gh",
  "tok": "trilinkbiotechnologies"
 },
 {
  "co": "Twist Bioscience",
  "cat": "tools",
  "ats": "gh",
  "tok": "twistbioscience"
 },
 {
  "co": "Ultima Genomics",
  "cat": "tools",
  "ats": "gh",
  "tok": "ultimagenomics"
 },
 {
  "co": "Watchmaker Genomics",
  "cat": "tools",
  "ats": "gh",
  "tok": "watchmakergenomics"
 }
]


# 名称相符但探测时在招岗位过少、无法用 E1–E3 核验的公司。
# 不产生岗位数据，仅在前端作为「已知雇主、当前无法核验」列出。
UNVERIFIED = [
 "Absci",
 "Alnylam Pharmaceuticals",
 "Caribou Bio",
 "Caribou Biosciences",
 "Day One Biopharmaceuticals",
 "Genesis Therapeutics",
 "Integrated DNA Technologies",
 "Jaguar Gene Therapy",
 "Korro Bio",
 "Latent Labs",
 "Plexium",
 "Tune Therapeutics",
 "Voyager Therapeutics"
]


CAT_LABEL = {
 "rna":   ["RNA / 寡核苷酸疗法", "与你 miRNA 生物学最直接对口"],
 "edit":  ["基因编辑 / 碱基编辑", "你有碱基与先导编辑经验"],
 "degrade":["蛋白降解 (TPD)", "泛素连接酶方向，与 ZSWIM8 同属 E3 生物学"],
 "ai":    ["AI 驱动药物发现", "偏计算，湿实验岗较少"],
 "aging": ["衰老 / 重编程", "代谢与表观遗传交叉"],
 "tools": ["平台与工具 / 试剂仪器", "岗位多、门槛相对友好"],
 "cell":  ["细胞治疗", ""],
 "gt":    ["基因治疗", "与你 DMD 方向相关"],
 "metab": ["代谢疾病", "与你 T2D / AMPK 主线对口"],
 "pharma":["肿瘤 / 大药企", "流程规范，训练体系完整"],
 "dx":    ["诊断", ""],
 "inst":  ["研究所 / 非营利", "介于学术与产业之间"],
}

# ── 关键词：词边界匹配，权重按与本人工作的接近度 ────────────────
CV_STRONG = ["miRNA","microRNA","small RNA","RNA decay","Argonaute","AGO2","RISC",
  "TDMD","Drosha","Dicer","RNA binding","RNA-binding","ribonucleoprotein",
  "base editing","prime editing","CRISPR","organoid","AMPK","lactate","lactylation",
  "ubiquitin","E3 ligase","proteasome","phosphorylation","kinase",
  "small RNA sequencing","CLIP-seq","RNA immunoprecipitation"]
CV_MED = ["RNA biology","non-coding RNA","noncoding RNA","gene expression","transcriptomic",
  "epigenetic","chromatin","metabolic","metabolism","diabetes","fibrosis","muscle",
  "cardiac","intestinal","liver","hepatocyte","beta cell","islet","mass spectrometry",
  "proteomic","CRISPR screen","single cell","scRNA","gene therapy","oligonucleotide",
  "siRNA","ASO","mRNA","lipid nanoparticle","LNP","target validation"]
CV_WEAK = ["molecular biology","cell biology","biochemistry","cell culture","western blot",
  "qPCR","flow cytometry","mouse model","in vivo","in vitro","primary cell","iPSC",
  "protein purification","cloning","plasmid","transfection","microscopy","assay development",
  "NGS","sequencing","bioinformatics","pipeline"]
KW_W = {"strong":3,"med":2,"weak":1}
# 词边界 + 可选复数/派生后缀。实测词条 'transcriptomic' 用纯 \b 收尾时
# 匹配不到岗位描述里实际使用的 'transcriptomics'（同理 proteomics /
# epigenetics / metabolomics），高价值关键词整批漏计。
KW_RE = {b:{k:re.compile(r"\b"+re.escape(k)+r"(?:s|es)?\b",re.I) for k in ks}
         for b,ks in (("strong",CV_STRONG),("med",CV_MED),("weak",CV_WEAK))}

# 职能族：判定用标题，权重表把与实验台无关的职能折价
# 职能族：判定用标题。
# ⚠ 前缀式词条必须写成 `词干\w*` 而**不能**是 `词干\b`。
#   实测 `computational biolog\b` 永远匹配不到 "Computational Biologist"
#   （"biolog" 后面紧跟 "i"，不存在词边界），同理 bioinformatic / postdoc /
#   manufactur 等全部前缀词条曾集体失效，导致 511 个岗位(42%)误落入 other。
FAMILY_RULES = [
 # 规则按顺序命中，先中先得。两处刻意的先后：
 #  · bench 先于 cmc：标题里出现 "Scientist" 一律算科研岗，
 #    所以 "Senior Scientist, Formulation Development" 归 bench 而非 cmc。
 #    这是有意的——那确实是在实验台上干活的人。
 # field 必须排在 bench 之前：
 # "Field Application Scientist" 里的 "scientist" 会被 bench 抢走，
 # 把现场支援岗算成实验台科研，直接污染"科研岗"计数。
 ("field",  r"\b(field application|field service|technical support|application scientist)\b"),
 ("bench",  r"\b(scientist|research associate|senior associate|postdoc\w*|post-doctoral|"
            r"research scientist|principal scientist|staff scientist|associate scientist|"
            r"lab technician|research technician|research specialist|"
            r"phd candidate|graduate researcher|"
            r"laboratory (associate|technician|specialist))\b"),
 ("compbio",r"\b(bioinformatic\w*|informatic\w*|computational biolog\w*|computational scientist|"
            r"data scientist|machine learning|computational chem\w*|biostatistic\w*|statistical programm\w*|"
            r"cheminformatic\w*|\bPBPK\b|pharmacometric\w*|quantitative systems|"
            r"(molecular|computational|statistical) modeling|modeling (and|&) simulation|"
            r"software engineer|data engineer|multiomics|genomic data|data science|\bAI\b|"
            r"artificial intelligence|deep learning|research engineer|software( \w+)? intern\b|engineering manager|technical staff|platform engineer)\b"),
 ("cmc",    r"\b(process development|manufactur\w*|CMC|GMP|bioprocess|upstream|downstream|"
            r"purification|formulation|drug product|drug substance|fill.finish|"
            r"technical operations|pharmaceutical development|technician \w+, production|production (technician|associate|operator)|industrial engineering)\b"),
 ("quality",r"\b(quality control|quality assurance|\bQA\b|\bQC\b|validation|compliance|quality (management|operations|systems|engineer\w*)|\bQMS\b)\b"),
 # 临床/医学事务/法规：含医学写作与医学总监（MD 岗，非实验岗）
 ("clinical",r"\b(clinical|medical affairs|medical science liaison|pharmacovigilance|"
            r"regulatory|\bCRA\b|clinical trial|biometrics|drug safety|"
            r"medical (writing|writer|director|lead|monitor|advisor)|nonclinical safety|"
            r"epidemiolog\w*|real.world (data|evidence)|outcomes research|\bHEOR\b|"
            r"patient safety|genetic counsel\w*|\bRN\b|nurse|nursing|care (advocacy|advocate|coordinator)|patient (advocacy|navigat\w*)|cancer screening|care partner|safety physician|medical safety|treatment center)\b"),
 # pmo 排在 labops 之前："Program Manager, Research Operations" 是协调岗，
 # 不该因标题含 "research operations" 被算作实验室运营（权重 0.5 > pmo 0.25）。
 ("pmo",    r"\b(program manage\w*|project manage\w*|portfolio manage\w*|product manage\w*|"
            r"program director|technical product|operational excellence|program lead|"
            r"scientific project lead|project team lead\w*|business manager)\b"),
 # 实验室运营/技术支撑：接触实验室但不产出科研成果（含病理技术、样本管理）
 ("labops",  r"\b(lab(oratory)? operations|research operations|vivarium|animal facility|"
            r"raw materials|materials planning|lab(oratory)? manage\w*|automation engineer|"
            r"histotech\w*|histolog\w*|phlebotom\w*|specimen|sample (management|processing)|"
            r"biorepositor\w*|lab(oratory)? (operator|assistant|coordinator)|cytotech\w*|cytogenetic\w*|technologist|animal care|husbandry)\b"),
 ("bizdev", r"\b(business development|sales|account (manager|executive|director)|"
            r"commercial|marketing|partnership|customer success|"
            r"market access|value (and|&) access|(key|strategic|national) accounts?|pricing|reimbursement|"
            r"regional (director|manager|sales)|territory|insights (and|&) analytics|(global |us |product |portfolio |brand |corporate |asset |commercial )?(insights|analytics|strategy)\b|omnichannel|trade (and|&) channel|channel management|customer engagement|market planning|(rare disease|oncology|clinical) specialist|engagement manager|thought leader|field access|region manager|\bGM\b|general manager)\b"),
 # 项目/产品管理：科学背景常被要求，但工作性质是协调而非做实验
 ("admin",  r"\b(finance|accounting|payroll|legal|counsel|patent|human resources|people|"
            r"recruit\w*|talent|facilities|office manager|administrative|executive assistant|"
            r"chief of staff|communications|IT support|project & portfolio|"
            r"intellectual property|supply chain|procurement|sourcing|"
            r"learning (and|&) (leadership )?development|workplace|\bIT\b|information technology|infrastructure (and|&) operations|privacy|head of operations|corporate development|investor relations|\bSEC\b|\bSOX\b|tax\b|treasury|government affairs|public affairs|\bFP&A\b|logistics|cloud engineer|netsuite|salesforce|azure|search (and|&) evaluation)\b"),
 # 非生物类工程岗（光学/机械/电子/固件）——排在 labops 之后，
 # 免得把"Automation Engineer"这种实验室自动化岗抢走
 ("eng",    r"\b(optical|mechanical|electrical|electronics|hardware|firmware|"
            r"systems engineer|support engineer|reliability engineer|"
            r"instrument\w* engineer|robotics engineer)\b"),
 # 兜底：标题含实验/科研语义但未落入以上任何族，仍应视为科研相关而非 other
 ("science",r"\b(biolog\w*|\w*assay\w*|sequenc\w*|genom\w*|protein\w*|immunolog\w*|"
            r"pharmacolog\w*|toxicolog\w*|ADME|\bPK\b|\bPD\b|in vivo|in vitro|"
            r"discovery|translational|laborator\w*|preclinical|biomarker|"
            r"precision medicine|companion diagnostic\w*|reprogramming|rejuvenation|"
            r"cell (culture|therapy)|gene (editing|therapy)|disease biolog\w*|oligonucleotide\w*|"
            r"antibod\w*|peptide\w*|small molecule|analytical|pharmaceutical science\w*|"
            r"biotherapeutic\w*|chemistr\w*|metabolomic\w*|histopatholog\w*|patholog\w*)\b"),
]

FAM_RE = [(f, re.compile(p, re.I)) for f, p in FAMILY_RULES]
# 权重 = 「该职能与 Sheldon 实验台技能的可迁移程度」。折价而非隐藏。
FAM_WEIGHT = {"bench":1.0,"compbio":0.85,"science":0.8,"cmc":0.6,"labops":0.5,
              "quality":0.45,"clinical":0.5,"field":0.55,"pmo":0.25,
              "bizdev":0.15,"admin":0.1,"eng":0.3,"other":0.4}
FAM_LABEL = {"bench":"实验台科研","compbio":"计算 / 生信","science":"科研相关(其它)",
             "cmc":"工艺与生产","labops":"实验室运营","quality":"质量体系",
             "clinical":"临床与法规","field":"现场应用","pmo":"项目 / 产品管理",
             "bizdev":"商务销售","admin":"行政职能","eng":"硬件 / 仪器工程","other":"未归类"}

TEST_RE = re.compile(r"\b(test|testing|dummy|do not apply|ignore this|sample job)\b", re.I)
US_STATES = ("AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO "
             "MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY DC").split()
US_CITIES = ["boston","cambridge","san francisco","south san francisco","san diego","seattle",
  "new york","philadelphia","chicago","houston","austin","denver","boulder","research triangle",
  "durham","raleigh","waltham","watertown","lexington","bedford","branford","new haven",
  "princeton","gaithersburg","rockville","bethesda","san carlos","redwood city","palo alto",
  "menlo park","emeryville","berkeley","brisbane","foster city","carlsbad","la jolla",
  "salt lake city","madison","st. louis","saint louis","indianapolis","pittsburgh","atlanta",
  "los angeles","irvine","thousand oaks","summit","cranbury","plainsboro","california","massachusetts","new jersey","north carolina",
  "washington","texas","colorado","maryland","pennsylvania","connecticut","utah","wisconsin"]
NON_US = ["united kingdom","london","cambridge, uk","germany","munich","berlin","france","paris",
  "switzerland","basel","zurich","netherlands","amsterdam","ireland","dublin","spain","madrid",
  "italy","milan","sweden","denmark","copenhagen","japan","tokyo","china","shanghai","beijing",
  "korea","seoul","singapore","india","bangalore","hyderabad","canada","toronto","vancouver",
  "montreal","australia","sydney","brazil","mexico","israel","tel aviv","poland","warsaw",
  "portugal","lisbon","belgium","brussels","austria","vienna","norway","oslo","finland",
  "czech","hungary","romania","bulgaria","turkey","emea","apac","latam","hong kong","taiwan",
  # 以下城市原缺失，导致岗位被判 unknown 而混入美国列表（实测 Zürich、Cape Town）
  "zürich","zurich","geneva","lausanne","oxford","manchester, uk","edinburgh","glasgow",
  "bristol, uk","stevenage","slough","reading, uk","cape town","johannesburg","nairobi",
  "cairo","dubai","abu dhabi","riyadh","doha","istanbul","athens, greece","prague","budapest",
  "warsaw","krakow","wroclaw","bucharest","sofia","zagreb","ljubljana","tallinn","riga",
  "vilnius","helsinki","gothenburg","malmö","malmo","aarhus","bergen","trondheim",
  "reykjavik","luxembourg","strasbourg","lyon","toulouse","marseille","nice, france",
  "bordeaux","frankfurt","hamburg","cologne","düsseldorf","dusseldorf","stuttgart",
  "leipzig","heidelberg","mainz","tübingen","tubingen","göttingen","gottingen",
  "rotterdam","utrecht","eindhoven","leiden","groningen","antwerp","ghent","leuven",
  "barcelona","valencia","seville","bilbao","porto","rome, italy","turin","bologna","florence, italy",
  "naples, italy","padua","osaka","kyoto","kobe","nagoya","yokohama","fukuoka","shenzhen",
  "guangzhou","hangzhou","suzhou","chengdu","wuhan","xi'an","nanjing","tianjin",
  "busan","incheon","daejeon","taipei","hsinchu","kaohsiung","bangkok","jakarta",
  "manila","kuala lumpur","ho chi minh","hanoi","mumbai","delhi","new delhi","chennai",
  "pune","kolkata","ahmedabad","gurgaon","gurugram","noida","melbourne","brisbane, aus",
  "perth","adelaide","auckland","wellington","ottawa","calgary","edmonton","quebec",
  "waterloo, on","mississauga","são paulo","sao paulo","rio de janeiro","buenos aires",
  "santiago","bogotá","bogota","lima, peru","monterrey","guadalajara","mexico city",
  "jerusalem","haifa","rehovot","herzliya","moscow, russia","kyiv","minsk","almaty"]

# 需按词边界匹配的裸国家/地区码：子串匹配会误伤（"uk" 命中 "Waukegan"、
# "de" 命中几乎所有单词）。实测漏网例："Regional Business Manager, UK North"
# 地点仅写 "UK North"，被判为 unknown 而进入美国岗列表。
# 美国大区归并 —— 前端地区 chip 用。按州/城市判定，判不出记 "其它/远程"。
# 州名既有缩写也有全称（实测 "Redwood City, California, United States" 185 条、
# "San Carlos, CA" 37 条并存），两种写法都要匹配，否则近半岗位落进兜底桶。
ST_ALT = {
 "MA":"massachusetts","CT":"connecticut","RI":"rhode island","NH":"new hampshire",
 "VT":"vermont","ME":"maine","CA":"california","NY":"new york","NJ":"new jersey",
 "PA":"pennsylvania","MD":"maryland","DE":"delaware","DC":"district of columbia",
 "VA":"virginia","WV":"west virginia","NC":"north carolina","SC":"south carolina",
 "GA":"georgia","FL":"florida","TN":"tennessee","AL":"alabama","MS":"mississippi",
 "LA":"louisiana","AR":"arkansas","KY":"kentucky","WA":"washington","OR":"oregon",
 "ID":"idaho","MT":"montana","AK":"alaska","IL":"illinois","IN":"indiana","OH":"ohio",
 "MI":"michigan","WI":"wisconsin","MN":"minnesota","IA":"iowa","MO":"missouri",
 "KS":"kansas","NE":"nebraska","ND":"north dakota","SD":"south dakota","TX":"texas",
 "AZ":"arizona","NM":"new mexico","NV":"nevada","OK":"oklahoma","CO":"colorado",
 "UT":"utah","WY":"wyoming",
}

def _st(*abbr):
    """生成同时匹配州缩写与全称的分支。"""
    alts = list(abbr) + [ST_ALT[a] for a in abbr if a in ST_ALT]
    return r"\b(" + "|".join(alts) + r")\b"

# 加州按城市细分（南北加州都是 CA），其余大区可直接按州判定。
NORCAL = (r"francisco|bay area|south san|brisbane|emeryville|berkeley|oakland|"
          r"redwood|palo alto|menlo|mountain view|santa clara|san jose|foster city|"
          r"hayward|fremont|alameda|san carlos|burlingame|san mateo|sunnyvale|"
          r"newark, ca|south bay|peninsula|richmond, ca|vacaville|davis, ca")
SOCAL  = (r"san diego|la jolla|carlsbad|irvine|los angeles|thousand oaks|pasadena|"
          r"santa monica|torrance|anaheim|long beach|orange county|ventura")

US_REGION = [
 ("波士顿 / 新英格兰", _st("MA","CT","RI","NH","VT","ME") + r"|boston|waltham|lexington|"
                     r"watertown|somerville|newton|bedford|andover|worcester|new haven|"
                     r"cambridge(?!,? uk)"),
 ("圣地亚哥 / 南加州", SOCAL),
 ("旧金山湾区",       NORCAL + r"|" + _st("CA")),   # 先判南加州，其余加州归北加
 ("纽约 / 新泽西",    _st("NY","NJ") + r"|new york|manhattan|brooklyn|princeton|jersey|"
                     r"basking ridge|rahway|nutley|tarrytown|yonkers"),
 ("费城 / 中大西洋",  _st("PA","MD","DE","DC","VA","WV") + r"|philadelphia|philly|"
                     r"king of prussia|gaithersburg|rockville|bethesda|baltimore|"
                     r"frederick|wilmington|washington, d"),
 ("北卡 / 东南",      _st("NC","SC","GA","FL","TN","AL","MS","LA","AR","KY") +
                     r"|research triangle|durham|raleigh|morrisville|atlanta|miami|"
                     r"tampa|nashville|charlotte"),
 ("西雅图 / 西北",    _st("WA","OR","ID","MT","AK") + r"|seattle|bothell|bellevue|portland"),
 ("中西部",           _st("IL","IN","OH","MI","WI","MN","IA","MO","KS","NE","ND","SD") +
                     r"|chicago|indianapolis|kalamazoo|st\. louis|minneapolis|columbus|"
                     r"cleveland|detroit|ann arbor"),
 ("德州 / 西南",      _st("TX","AZ","NM","NV","OK") + r"|houston|austin|dallas|"
                     r"san antonio|phoenix|tucson|las vegas"),
 ("丹佛 / 山区",      _st("CO","UT","WY") + r"|denver|boulder|salt lake|longmont"),
 ("全美远程",         r"\bremote\b|work from home|\bWFH\b|field.based|"
                     r"\bus\b\s*$|united states\s*$"),
]
US_REGION_RE = [(n, re.compile(r, re.I)) for n, r in US_REGION]

def us_region(loc):
    """把地点字符串归到美国大区。判不出返回 '其它 / 远程' —— 不猜。"""
    for name, rx in US_REGION_RE:
        if rx.search(loc or ""):
            return name
    return "其它 / 远程"

NON_US_RE = re.compile(r"\b(uk|u\.k\.|gb|deu|fra|chn|jpn|ind|can|aus|"
                       r"europe|european|asia|asian|pacific|nordic|nordics|benelux|"
                       r"dach|iberia|middle east|africa)\b", re.I)

def fetch(url, data=None, hdr=None):
    h = dict(UA)
    if hdr: h.update(hdr)
    req = urllib.request.Request(url, data=data, headers=h)
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
                return json.loads(r.read().decode("utf-8", "replace"))
        except Exception as e:
            if attempt == 2:
                print(f"    ! {url[:70]} 失败: {type(e).__name__}", file=sys.stderr)
                return None
            time.sleep(2 * (attempt + 1))

def strip_html(s):
    """两次 unescape：Greenhouse 的 content 字段是双重编码的
    （'&amp;nbsp;' → 一次 unescape 只得到 '&nbsp;'，实测 680 个岗位残留）。"""
    t = html.unescape(html.unescape(s or ""))
    t = re.sub(r"<[^>]+>", " ", t)
    return re.sub(r"[\s\u00a0]+", " ", t).strip()

# 州全称集合（供 us_status 用）。含 "georgia" —— 与国名同名，但在美国岗位板
# 语境下州义占绝大多数。
# 已知假阳性（不掩盖）: "Tbilisi, Georgia" 会被判为美国岗，除非 tbilisi 进
# NON_US 表。本数据集 47 家公司均无格鲁吉亚站点，故暂不为此加特例。
ST_FULL = sorted(set(ST_ALT.values()))

def us_status(loc):
    """三值地点判定: "us" | "intl" | "unknown"。

    为什么必须三值而不是布尔：实测有 34 个 'Field-Based'、27 个 'Remote'、
    'Any Office'、'Southeast' 这类字符串——它们既非明确在美也非明确境外。
    布尔判定只能二选一：算在美会混入境外岗，算境外会丢掉真实的美国岗。
    诚实做法是单独标为 unknown，前端明示，让用户自己判断。

    多地点字符串必须**逐段**判定。实测 'New York, New York; Remote Opportunity -
    United Kingdom; Remote Opportunity - United States; Salt Lake City, Utah'
    会因为先匹配到 'united kingdom' 而被整条误杀——它其实包含两个美国地点。
    """
    if not (loc or "").strip():
        return "unknown"
    segs = [x.strip() for x in re.split(r"[;|]|\s+/\s+", loc) if x.strip()]
    saw_intl = False
    us_seen = False
    for seg in segs:
        l = seg.lower()
        # 段内判定顺序有两层。
        # 1) 明确的美国州/国名标记优先级最高：许多美国城市与境外城市同名
        #    （Athens GA / Rome NY / Naples FL / Florence SC / Moscow ID /
        #    Lima OH / Brisbane CA / Manchester NH），只要同段出现美国州名或
        #    "US/USA/United States"，就以美国为准。
        # 2) 否则先判境外：'Cambridge, UK' 的 'cambridge' 命中美国城市表，
        #    若先判在美会把英国剑桥误判成美国岗。
        # 州名缩写与全称都算明确在美（'Athens, Georgia' 只有全称）。
        # 与境外城市同名的美国城市因此得以保留。
        explicit_us = (re.search(r"\b(u\.?s\.?a?|united states)\b", l)
                       or any(re.search(r"\b" + st + r"\b", seg) for st in US_STATES)
                       or any(re.search(r"\b" + full + r"\b", l) for full in ST_FULL))
        if explicit_us:
            us_seen = True
            continue
        if any(x in l for x in NON_US) or NON_US_RE.search(seg):
            saw_intl = True
            continue
        if any(c in l for c in US_CITIES):
            us_seen = True                   # 任一段明确在美即视为美国岗
    if us_seen:
        return "us"
    return "intl" if saw_intl else "unknown"


def split_sents(t):
    return [s.strip() for s in re.split(r"(?<=[.!?])\s+|\n+", t or "") if len(s.strip()) > 25]

def company_boilerplate(descs):
    """同一公司多数岗位重复出现的句子 = 样板文字（经验法，非手写正则）。"""
    if len(descs) < 3:
        return set()
    c = Counter()
    for d in descs:
        for s in set(split_sents(d)):
            c[s] += 1
    cut = max(2, int(len(descs) * 0.5))
    return {s for s, k in c.items() if k >= cut}

def family(title):
    for f, rx in FAM_RE:
        if rx.search(title or ""):
            return f
    return "other"

def score(text):
    tot, hits = 0, []
    for band, d in KW_RE.items():
        for kw, rx in d.items():
            if rx.search(text or ""):
                tot += KW_W[band]
                hits.append(kw)
    return tot, hits

# ── 各 ATS 抓取，统一成同一结构 ──────────────────────────────────
def from_greenhouse(tok):
    d = fetch(f"https://boards-api.greenhouse.io/v1/boards/{tok}/jobs?content=true")
    out = []
    for j in (d or {}).get("jobs", []):
        out.append({"title": j.get("title", ""),
                    "loc": (j.get("location") or {}).get("name", ""),
                    "url": j.get("absolute_url", ""),
                    "posted": (j.get("updated_at") or "")[:10],
                    "desc_raw": strip_html(j.get("content", "")),
                    "dept": "; ".join(x.get("name","") for x in (j.get("departments") or []))})
    return out

def from_lever(tok):
    d = fetch(f"https://api.lever.co/v0/postings/{tok}?mode=json")
    out = []
    for j in (d or []):
        cat = j.get("categories") or {}
        ts = j.get("createdAt")
        out.append({"title": j.get("text", ""),
                    "loc": cat.get("location", ""),
                    "url": j.get("hostedUrl", ""),
                    "posted": datetime.fromtimestamp(ts/1000, timezone.utc).strftime("%Y-%m-%d") if ts else "",
                    "desc_raw": strip_html(j.get("descriptionPlain") or j.get("description", "")),
                    "dept": cat.get("team", "") or cat.get("department", "")})
    return out

def from_ashby(tok):
    d = fetch(f"https://api.ashbyhq.com/posting-api/job-board/{tok}")
    out = []
    for j in (d or {}).get("jobs", []):
        out.append({"title": j.get("title", ""),
                    "loc": j.get("location", "") or ("Remote" if j.get("isRemote") else ""),
                    "url": j.get("jobUrl", ""),
                    "posted": (j.get("publishedAt") or "")[:10],
                    "desc_raw": j.get("descriptionPlain") or strip_html(j.get("descriptionHtml","")),
                    "dept": " / ".join(x for x in [j.get("department",""), j.get("team","")] if x)})
    return out

FETCHERS = {"gh": from_greenhouse, "lv": from_lever, "ab": from_ashby}

def main():
    jobs, per_co, n_boiler, dropped_non_us, dropped_test = [], {}, 0, 0, 0
    n_loc_unknown = 0
    for b in BOARDS:
        raw = FETCHERS[b["ats"]](b["tok"]) or []
        if not raw:
            per_co[b["co"]] = {"cat": b["cat"], "ats": b["ats"], "tok": b["tok"],
                               "n_total": 0, "n_us": 0, "fetch_ok": False}
            continue
        boiler = company_boilerplate([r["desc_raw"] for r in raw])
        n_boiler += len(boiler)
        kept = 0
        for r in raw:
            if TEST_RE.search(r["title"]):
                dropped_test += 1
                continue
            st = us_status(r["loc"])
            if st == "intl":
                dropped_non_us += 1
                continue
            # 关键顺序：先剔样板，再截断
            clean = " ".join(s for s in split_sents(r["desc_raw"]) if s not in boiler)
            body = (r["title"] + " . " + r["dept"] + " . " + clean)[:4000]
            fam = family(r["title"])
            raw_sc, hits = score(body)
            w = FAM_WEIGHT.get(fam, 0.6)
            jobs.append({"co": b["co"], "cat": b["cat"], "ats": b["ats"],
                         "title": r["title"].strip(), "loc": r["loc"], "url": r["url"],
                         "posted": r["posted"], "dept": r["dept"], "loc_us": st,
                         "fam": fam, "fam_label": FAM_LABEL[fam], "fam_weight": w,
                         "raw_score": raw_sc, "score": round(raw_sc * w, 1),
                         "region": us_region(r["loc"]),
                         "kw": sorted(set(hits))[:12],
                         "desc": clean[:600]})
            if st == "unknown":
                n_loc_unknown += 1
            kept += 1
        per_co[b["co"]] = {"cat": b["cat"], "ats": b["ats"], "tok": b["tok"],
                           "n_total": len(raw), "n_us": kept, "fetch_ok": True}
        print(f"  {b['co']:34s} [{b['ats']}/{b['tok']}] 抓取 {len(raw)} → 美国 {kept}"
              f" (样板句 {len(boiler)})")

    jobs.sort(key=lambda j: (-j["score"], j["co"], j["title"]))
    out = {"generated": datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC"),
           "jobs": jobs,
           "companies": per_co,
           "unverified_companies": UNVERIFIED,
           "meta": {"n_boards": len(BOARDS), "n_companies": len(per_co),
                    "n_jobs_us": len(jobs), "n_dropped_non_us": dropped_non_us,
                    "n_dropped_test": dropped_test,
                    "n_loc_unknown": n_loc_unknown, "n_boilerplate_sents": n_boiler,
                    "cat_label": CAT_LABEL, "fam_label": FAM_LABEL,
                    "fam_weight": FAM_WEIGHT,
                    "score_note": "score = raw_score × 职能族权重；raw_score 为折价前原始分",
                    "us_only": True,
                    "source": "Greenhouse + Lever + Ashby（公开职位板 API）",
                    "updated": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
                    "count": len(jobs),
                    "loc_note": "loc_us: us=明确在美, unknown=地点字符串无法判定(如 Field-Based/Remote)，"
                                "已保留并标注；intl=明确境外，已剔除"}}
    with open("data/industry_jobs.json", "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, separators=(",", ":"))
    print(f"\n公司 {len(per_co)} 家 · 美国岗位 {len(jobs)} 个 "
          f"(剔除境外 {dropped_non_us} / 测试岗 {dropped_test} / 样板句 {n_boiler})")

if __name__ == "__main__":
    main()
