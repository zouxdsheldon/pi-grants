#!/usr/bin/env python3
"""Fetch company / industry R&D positions for the PI-grants site.

Companion to fetch_jobs.py (which covers academic faculty/postdoc posts).
This one hits *public, key-less* applicant-tracking-system APIs — Greenhouse
board API and Lever postings API — for a hand-verified list of biotech /
pharma / tools companies, then classifies every posting into a job FAMILY
(what kind of role it is) and scores it for fit against the site owner's CV.

Design notes
------------
* Every board token in BOARDS was verified live before being added: the API
  returned 200 AND the returned titles were checked to be life-science roles.
  A name-guessed token is worse than no entry — `verve` (guessed for Verve
  Therapeutics) turned out to be an ad-tech company and was dropped.
* Nothing is proxied or cached. The page reads data/industry_jobs.json
  same-origin and re-filters client-side, same contract as jobs.json.
* Families are職能-based (discovery scientist / platform-RNA / translational
  / process-CMC / computational / field-application / medical-regulatory),
  because the question the owner actually asks is "which kind of role can I
  apply to", not "which company is hiring".
"""
import json, re, time, datetime, urllib.request, urllib.error, sys, os

UA = {"User-Agent": "Mozilla/5.0 (compatible; pi-grants-industry/1.0)"}
OUT = os.path.join(os.path.dirname(__file__), "..", "data", "industry_jobs.json")

# ---------------------------------------------------------------- boards
# (token, display name, ats, category, note)   -- ALL verified live 2026-08
BOARDS = [
    # ── RNA / oligonucleotide therapeutics  (closest to the owner's miRNA work)
    ("alnylampharmaceuticals", "Alnylam Pharmaceuticals", "gh", "rna", "siRNA 疗法奠基公司，RNAi 上市药最多"),
    ("dynetherapeutics",       "Dyne Therapeutics",       "gh", "rna", "肌肉靶向寡核苷酸，DMD/DM1 —— 与你 DMD 模型直接对口"),
    ("stoketherapeutics",      "Stoke Therapeutics",       "gh", "rna", "TANGO 剪接上调，反义寡核苷酸"),
    ("entradatherapeutics",    "Entrada Therapeutics",     "gh", "rna", "胞内递送寡核苷酸，DMD 方向"),
    ("strandtherapeutics",     "Strand Therapeutics",      "gh", "rna", "可编程 mRNA 线路"),
    ("vorbiopharma",           "Vor Bio",                  "gh", "rna", "造血干细胞基因工程"),
    # ── 基因编辑 / 碱基编辑  (owner has base & prime editing experience)
    ("beamtherapeutics",       "Beam Therapeutics",        "gh", "edit", "碱基编辑（Liu lab 系）—— 你的碱基编辑经验对口"),
    ("primemedicine",          "Prime Medicine",           "gh", "edit", "先导编辑（prime editing）—— 你的 prime editing 经验对口"),
    ("tesseratherapeutics",    "Tessera Therapeutics",     "gh", "edit", "基因写入（Gene Writing）"),
    # ── 小分子 / 蛋白降解  (ZSWIM8 是 E3 连接酶 → 降解领域天然衔接)
    ("kymeratherapeutics",     "Kymera Therapeutics",      "gh", "degrade", "靶向蛋白降解（E3 招募）—— 与 ZSWIM8/泛素化直接相关"),
    ("relaytherapeutics",      "Relay Therapeutics",       "gh", "degrade", "蛋白动力学驱动的小分子发现"),
    ("blueprintmedicines",     "Blueprint Medicines",      "gh", "degrade", "激酶抑制剂，已上市产品"),
    ("treelinebiosciences",    "Treeline Biosciences",     "gh", "degrade", "肿瘤小分子，大额私募支持"),
    # ── AI / 计算驱动药物发现
    ("isomorphiclabs",         "Isomorphic Labs",          "gh", "ai", "DeepMind 旗下，AlphaFold 系药物设计"),
    ("xairatherapeutics",      "Xaira Therapeutics",       "gh", "ai", "10 亿美元起步的 AI 药企"),
    ("generatebiomedicines",   "Generate Biomedicines",    "gh", "ai", "生成式蛋白设计"),
    ("valohealth",             "Valo Health",              "gh", "ai", "人体数据驱动的药物发现"),
    ("eikontherapeutics",      "Eikon Therapeutics",       "gh", "ai", "单分子活细胞成像平台（Betzig 创立）"),
    # ── 衰老 / 重编程 / 代谢  (owner's metabolism moat)
    ("altoslabs",              "Altos Labs",               "gh", "aging", "细胞重编程与年轻化，30 亿美元起步"),
    ("calicolabs",             "Calico Life Sciences",     "gh", "aging", "Alphabet 旗下衰老生物学，与 AbbVie 合作"),
    ("newlimit",               "NewLimit",                 "gh", "aging", "表观重编程延长健康期"),
    # ── 平台 / 工具 / 试剂仪器  (owner has heavy wet-lab platform skills)
    ("twistbioscience",        "Twist Bioscience",         "gh", "tools", "DNA 合成与 NGS 靶向捕获panel"),
    ("parsebiosciences",       "Parse Biosciences",        "gh", "tools", "组合索引单细胞测序"),
    ("ginkgobioworks",         "Ginkgo Bioworks",          "gh", "tools", "合成生物学代工厂 + 自动化实验室"),
    # ── 非营利研究所（企业化运作、给独立 PI 式职位）
    ("arcinstitute",           "Arc Institute",            "gh", "inst", "Doudna/Hsu/Pritchard 创办，Core Investigator 制"),
    ("chanzuckerberginitiative", "Chan Zuckerberg Initiative", "gh", "inst", "CZI，Biohub 网络"),
    ("arsenalbio",             "ArsenalBio",               "lv", "cell", "可编程细胞疗法（CAR-T 线路）"),
]

CAT_LABEL = {
    "rna":    ("🧬 RNA / 寡核苷酸疗法", "与你 miRNA/TDMD 主线最近，招 RNA 生物学、递送、体内药理"),
    "edit":   ("✂️ 基因编辑 / 碱基编辑", "你有碱基编辑与先导编辑经验，属于直接对口"),
    "degrade":("🗑️ 蛋白降解 / 小分子",  "ZSWIM8 是 E3 连接酶 —— 降解领域是你机制背景的天然出口"),
    "ai":     ("🤖 AI 驱动药物发现",     "湿实验 + 组学解读能力在这些公司稀缺，可投 wet-lab/翻译岗"),
    "aging":  ("⏳ 衰老 / 重编程 / 代谢", "对应你的代谢（AMPK/乳酸/胆固醇）护城河"),
    "tools":  ("🔬 平台 / 试剂 / 仪器",  "测序、合成、单细胞平台 —— 现成技能可迁移，岗位数量大"),
    "inst":   ("🏛️ 企业化研究所",        "给独立 PI 式职位但薪资/资源按企业走，介于学术与工业之间"),
    "cell":   ("🧫 细胞疗法",            "CAR-T / 细胞线路，需要分子机制 + 细胞工程"),
}

# ------------------------------------------------------- job family rules
# ordered — first match wins, so put the specific ones first
FAMILY_RULES = [
    ("comp",  "💻 计算 / 生物信息",
     r"computational|bioinformat|data scien|machine learn|\bml\b|\bai\b engineer|"
     r"software|statistic|genomic data|algorithm"),
    ("cmc",   "🏭 工艺 / CMC / 生产",
     r"process develop|manufactur|\bcmc\b|\bgmp\b|upstream|downstream|fill.finish|"
     r"formulation|drug product|drug substance|technical operations|supply chain|"
     r"quality (control|assurance)|\bqc\b|\bqa\b|validation engineer|facilit"),
    ("trans", "🩺 转化 / 临床前 / 药理",
     r"translational|preclinical|pharmacolog|toxicolog|\bdmpk\b|in vivo|"
     r"clinical (development|pharmacolog|scien)|biomarker|pathol|safety assess"),
    ("field", "🤝 现场应用 / 技术支持 / BD",
     r"field application|application scien|technical support|sales|account (manager|exec|strateg)|"
     r"business develop|marketing|commercial|customer|partnership"),
    ("reg",   "📋 注册 / 医学事务 / 法规",
     r"regulatory|medical affairs|medical writ|pharmacovigilance|medical director|"
     r"clinical operation|clinical trial|study manager|\bcra\b"),
    ("ops",   "🏢 运营 / 财务 / 人事 / 合规",
     r"people operations|human resource|talent|recruit|compensation|"
     r"finance|financial|accounting|controller|\bfp&a\b|payroll|procurement|"
     r"compliance|legal|corporate develop|investor relation|government affairs|"
     r"communicat|administrat|executive assistant|office|facilities|"
     r"program management|project management|portfolio management|"
     r"information (technology|security)|\bit\b (support|systems)|"
     r"quality management system|training|learning"),
    ("biz",   "💼 商务 / 市场准入 / 患者服务",
     r"market access|reimbursement|payer|key account|patient (advocacy|service|support)|"
     r"care partner|insights and analytics|strategy|strategic|commercial excellence|"
     r"brand|launch|pricing|contract"),
    ("disc",  "🔬 研发科学家 / 药物发现",
     r"scientist|research associate|\bra\b\b|principal investigator|discovery|"
     r"biolog|biochem|molecular|protein|assay|screening|\brna\b|\bdna\b|cell|"
     r"immunolog|structural|chemist|platform|research fellow|postdoc"),
]
FAM_OTHER = ("other", "🧩 其它 / 职能支持")

# --------------------------------------------------- CV-based fit scoring
# Weights are visible and editable on purpose; the page shows the hit words.
CV_STRONG = {  # 3 points — the owner's own published/worked-on topics
    "mirna": 3, "microrna": 3, "small rna": 3, "non-coding": 3, "noncoding": 3,
    "argonaute": 3, "ago2": 3, "tdmd": 3, "rna decay": 3, "rna stability": 3,
    "base edit": 3, "prime edit": 3, "gene editing": 3, "crispr": 3,
    "ubiquitin": 3, "e3 ligase": 3, "protein degradation": 3, "targeted protein degrad": 3,
    "organoid": 3, "ampk": 3, "lactate": 3, "lactylation": 3, "cholesterol": 3,
}
CV_MED = {     # 2 points — adjacent skills the owner demonstrably has
    "rna biolog": 2, "rna": 2, "oligonucleotide": 2, "antisense": 2, "sirna": 2,
    "mrna": 2, "biochemistr": 2, "molecular biolog": 2, "cell biolog": 2,
    "metabolis": 2, "metabolic": 2, "diabet": 2, "fibrosis": 2, "muscle": 2,
    "dystroph": 2, "cardiac": 2, "gastric": 2, "intestin": 2, "liver": 2,
    "epigenet": 2, "transcriptom": 2, "single cell": 2, "single-cell": 2,
}
CV_WEAK = {    # 1 point — plausible transfer
    "in vivo": 1, "mouse model": 1, "animal model": 1, "pig": 1, "swine": 1,
    "target discovery": 1, "mechanism of action": 1, "assay develop": 1,
    "protein purif": 1, "structural": 1, "immunoprecipit": 1, "western": 1,
    "qpcr": 1, "sequencing": 1, "ngs": 1, "flow cytometr": 1, "microscopy": 1,
    "cell line": 1, "primary cell": 1, "delivery": 1, "screening": 1,
}
# roles the owner cannot realistically fill — down-rank, never hide silently
TEST_RE = re.compile(r"\bTEST\b|\bdo not apply\b|dummy|sandbox", re.I)
FAR_RE = re.compile(r"accounting|payroll|recruit|talent acquisi|legal counsel|"
                    r"paralegal|facilities technician|receptionist|it helpdesk|"
                    r"executive assistant|office manager|intern\b|internship", re.I)

# 词界正则：词表键多为词干（"molecular biolog", "genom"），故左边界严格、
# 右边界允许词尾延伸（genom→genomics/genomic），但不允许被包在更长词里。
KW_RE = {kw: re.compile(r"(?<![a-z])" + re.escape(kw) + r"[a-z]{0,6}(?![a-z])")
         for kw in list(CV_STRONG) + list(CV_MED) + list(CV_WEAK)}

# 职能族权重：分数的语义是「与 Sheldon 台面研究的贴近度」。BD / 销售 / 运营岗
# 的关键词命中几乎全部来自公司平台描述而非岗位本身（Kymera 的 BD Director 靠
# "targeted protein degradation" 拿到 6 分即为例），故按族折减而不是隐藏。
FAM_WEIGHT = {"disc": 1.0, "comp": 1.0, "trans": 1.0, "cmc": 1.0,
              "reg": 0.6, "other": 0.6, "field": 0.3, "ops": 0.2}


def fetch(url, tries=3):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers=UA)
            return urllib.request.urlopen(req, timeout=30).read()
        except Exception as e:
            if i == tries - 1:
                print(f"  [warn] {url[:70]} -> {e}")
                return None
            time.sleep(1.5 * (i + 1))
    return None


def strip_html(s):
    s = re.sub(r"<[^>]+>", " ", s or "")
    s = (s.replace("&amp;", "&").replace("&#8211;", "-").replace("&nbsp;", " ")
          .replace("&#39;", "'").replace("&quot;", '"').replace("&lt;", "<")
          .replace("&gt;", ">"))
    return re.sub(r"\s+", " ", s).strip()


def family(title):
    t = (title or "").lower()
    for key, label, pat in FAMILY_RULES:
        if re.search(pat, t):
            return key, label
    return FAM_OTHER


COMPANY_SENT = re.compile(
    r"\b(is a (biotechnology|biopharmaceutical|clinical.stage|pharmaceutical|"
    r"public|private|leading|life science)|"
    r"我们是|our mission is|we are (a|an|building|on a mission)|"
    r"was founded|founded in|headquarter|"
    r"company committed to|platform for|suite of|"
    r"equal opportunit|equal employment|eeo\b|"
    r"regardless of race|without regard to|"
    r"benefits (include|package)|compensation range|salary range|"
    r"anchored by|proprietary technology|our pipeline|our portfolio)\b", re.I)
BOILER_RE = re.compile(
    r"(about (us|the company|\w+ therapeutics|\w+ medicine)|our mission|company overview|"
    r"we are an equal opportunit|equal employment|eeo\b|diversity|accommodat|"
    r"benefits include|compensation range|salary range)", re.I)


def split_sents(d):
    d = re.sub(r"<[^>]+>", " ", d or "")
    return [x.strip() for x in re.split(r"(?<=[.!?])\s+|\n+", d) if x.strip()]


def build_boilerplate(jobs, min_share=0.5, min_posts=3):
    """Find each employer's boilerplate EMPIRICALLY, per company.

    A sentence repeated across most of one company's postings is by
    definition not about any single role — it is the company blurb, the EEO
    statement, the benefits paragraph. Enumerating blurb phrasings by hand is
    whack-a-mole (Beam's "has assembled a platform with integrated gene
    editing..." slipped past a hand-written pattern list), so instead we
    measure repetition and drop what repeats.

    Returns {company: set(boilerplate sentences)}.
    """
    from collections import Counter, defaultdict
    per, counts = defaultdict(int), defaultdict(Counter)
    for j in jobs:
        per[j["company"]] += 1
        for s in set(split_sents(j.get("desc", ""))):
            if len(s) > 25:
                counts[j["company"]][s] += 1
    boiler = {}
    for co, n in per.items():
        if n < min_posts:
            boiler[co] = set()
            continue
        boiler[co] = {s for s, c in counts[co].items() if c / n >= min_share}
    return boiler


def responsibilities(desc, boiler):
    """Keep only role-specific sentences."""
    keep = [s for s in split_sents(desc)
            if s not in boiler and not COMPANY_SENT.search(s)]
    return re.sub(r"\s+", " ", " ".join(keep)).strip()[:600]


def score_cv(title, blob):
    """Return (score, hits). Title hits count double — the title is the role.

    Keywords match on WORD BOUNDARIES. Bare substring matching produced pure
    noise: every "delivering revenue" scored as "liver", "external" as "rna",
    "excellent" as "cell". Measured on the first build, 11/11 "liver" hits and
    22/29 "rna" hits were of that kind.
    """
    tl, bl = (title or "").lower(), (blob or "").lower()
    sc, hits = 0, []
    for table in (CV_STRONG, CV_MED, CV_WEAK):
        for kw, w in table.items():
            rx = KW_RE.get(kw)
            in_t, in_b = bool(rx.search(tl)), bool(rx.search(bl))
            if in_t or in_b:
                sc += w * 2 if in_t else w
                hits.append(kw)
    if FAR_RE.search(tl):
        sc -= 6
    return max(0, sc), hits[:8]


def region_of(loc):
    l = (loc or "").lower()
    if any(x in l for x in ("boston", "cambridge, ma", "massachusetts", " ma,", "waltham",
                            "lexington, ma", "watertown")):
        return "🇺🇸 波士顿 / 剑桥"
    if any(x in l for x in ("south san francisco", "san francisco", "bay area", "california",
                            " ca,", "palo alto", "redwood", "berkeley", "san carlos", "san diego")):
        return "🇺🇸 旧金山湾区 / 加州"
    if any(x in l for x in ("new york", " ny,", "new jersey", " nj,", "philadelphia",
                            "pennsylvania", "maryland", "north carolina", "seattle",
                            "washington", "texas", "illinois", "chicago", "connecticut")):
        return "🇺🇸 美国其它"
    if "united states" in l or l.strip() in ("us", "usa") or "remote - us" in l:
        return "🇺🇸 美国其它"
    if any(x in l for x in ("london", "united kingdom", "cambridge, uk", "oxford", "\buk\b")):
        return "🇬🇧 英国"
    if any(x in l for x in ("switzerland", "basel", "zurich", "germany", "munich", "berlin",
                            "france", "paris", "netherlands", "amsterdam", "denmark",
                            "copenhagen", "sweden", "ireland", "dublin", "spain", "italy")):
        return "🇪🇺 欧洲"
    if any(x in l for x in ("china", "shanghai", "beijing", "suzhou", "shenzhen", "hangzhou")):
        return "🇨🇳 中国"
    if any(x in l for x in ("singapore",)):
        return "🇸🇬 新加坡"
    if any(x in l for x in ("japan", "tokyo", "korea", "seoul", "hong kong", "taiwan",
                            "india", "bangalore", "australia", "sydney")):
        return "🌏 亚太其它"
    if "remote" in l:
        return "🏠 远程"
    return "🌍 其它 / 未标注"


def from_greenhouse(tok, name, cat, note):
    body = fetch(f"https://boards-api.greenhouse.io/v1/boards/{tok}/jobs?content=true")
    if not body:
        return []
    try:
        data = json.loads(body)
    except Exception:
        return []
    out = []
    for j in data.get("jobs", []):
        title = j.get("title", "")
        loc = (j.get("location") or {}).get("name", "")
        desc = strip_html(j.get("content", ""))[:6000]   # 截断留到剔除样板之后
        out.append(dict(title=title, company=name, cat=cat, cnote=note, location=loc,
                        url=j.get("absolute_url", ""), date=(j.get("updated_at") or "")[:10],
                        desc=desc, ats="Greenhouse"))
    return out


def from_lever(tok, name, cat, note):
    body = fetch(f"https://api.lever.co/v0/postings/{tok}?mode=json")
    if not body:
        return []
    try:
        data = json.loads(body)
    except Exception:
        return []
    out = []
    for j in data if isinstance(data, list) else []:
        c = j.get("categories") or {}
        ts = j.get("createdAt")
        d = ""
        if isinstance(ts, (int, float)):
            d = datetime.datetime.utcfromtimestamp(ts / 1000).strftime("%Y-%m-%d")
        out.append(dict(title=j.get("text", ""), company=name, cat=cat, cnote=note,
                        location=c.get("location", ""), url=j.get("hostedUrl", ""),
                        date=d, desc=strip_html(j.get("descriptionPlain") or
                                                j.get("description") or "")[:6000],
                        ats="Lever"))
    return out


def main():
    all_jobs, per_board, failed = [], {}, []
    for tok, name, ats, cat, note in BOARDS:
        got = (from_greenhouse if ats == "gh" else from_lever)(tok, name, cat, note)
        per_board[name] = len(got)
        if not got:
            failed.append(name)
        all_jobs.extend(got)
        print(f"  {name:30} {len(got):>4}")
        time.sleep(0.2)

    # de-dup by (company, title, location)
    seen, jobs = set(), []
    for j in all_jobs:
        if TEST_RE.search(j["title"]):   # ATS 里的测试岗,不是真招聘
            continue
        k = (j["company"], j["title"].lower().strip(), j["location"].lower().strip())
        if k in seen:
            continue
        seen.add(k)
        fk, fl = family(j["title"])
        j["fam"], j["famlabel"] = fk, fl
        j["region"] = region_of(j["location"])
        jobs.append(j)

    boiler = build_boilerplate(jobs)
    n_boiler = sum(len(v) for v in boiler.values())
    for j in jobs:
        j["desc"] = responsibilities(j["desc"], boiler.get(j["company"], set()))
        raw, j["hits"] = score_cv(j["title"], j["title"] + " " + j["desc"])
        j["score"] = int(round(raw * FAM_WEIGHT.get(j["fam"], 1.0)))
        j["raw_score"] = raw

    jobs.sort(key=lambda x: (-x["score"], x["company"], x["title"]))
    by_fam, by_cat, by_region = {}, {}, {}
    for j in jobs:
        by_fam[j["famlabel"]] = by_fam.get(j["famlabel"], 0) + 1
        by_cat[j["cat"]] = by_cat.get(j["cat"], 0) + 1
        by_region[j["region"]] = by_region.get(j["region"], 0) + 1

    now = datetime.datetime.now(datetime.timezone.utc)
    out = dict(
        updated=now.strftime("%Y-%m-%d"), updated_utc=now.isoformat(),
        count=len(jobs), n_boards=len(BOARDS), n_companies=len(set(j["company"] for j in jobs)),
        n_failed=len(failed), failed=failed, n_boilerplate_sents=n_boiler,
        source="Greenhouse board API + Lever postings API — 逐个核实过的生物医药公司公开招聘接口",
        cat_label={k: list(v) for k, v in CAT_LABEL.items()},
        fam_label=dict([(k, l) for k, l, _ in FAMILY_RULES] + [FAM_OTHER]),
        by_board=per_board, by_fam=by_fam, by_cat=by_cat, by_region=by_region,
        weights=dict(strong=CV_STRONG, med=CV_MED, weak=CV_WEAK),
        fam_weight=FAM_WEIGHT,   # 前端据此核对「折减」标注没说谎
        jobs=jobs)
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
    print(f"\nwrote {OUT}: {len(jobs)} jobs / {out['n_companies']} companies"
          f" / {len(failed)} board(s) empty")
    if failed:
        print("  empty:", ", ".join(failed))


if __name__ == "__main__":
    main()
