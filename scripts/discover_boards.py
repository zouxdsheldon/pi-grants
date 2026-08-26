#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""发现并核验美国生物技术公司的公开职位板 token，输出可粘进 fetch_industry_jobs.py 的 BOARDS。

为什么要「核验」而不是直接猜 token
--------------------------------
公司名 → token 只能猜（"beam" → Beam Therapeutics？实测是一家广告公司；
"genesis" / "relay" / "resilience" / "caribou" 同样撞名）。猜中的 token 会把
毫不相关公司的岗位当成生物技术岗写进数据。所以每个候选 token 必须过三道独立证据：

  E1 板面名称  ATS 返回的板面/公司名与候选公司名互相包含（归一化后）。
               Greenhouse 有 /boards/{tok} 元数据端点，Lever/Ashby 没有 → 只能靠 E2/E3。
  E2 行业词证据 该板全部岗位描述里出现 ≥MIN_TERMS 个**不同**的严格行业词
               （见 STRICT）。历史教训：把词表放宽到"assay/pipeline/platform"
               这类通用词后，一家广告公司的板面也能过线 —— 所以只用严格词。
  E3 最小语料  岗位数 ≥MIN_JOBS。板面太小时 E2 无法判断；而太小的板面本来
               也几乎不贡献岗位，排除它的代价接近 0，却能消掉撞名风险。

判定三值，不是布尔：
  ok        E1 通过，或 (E2 且 E3) 通过        → 写入 BOARDS
  unjudged  token 有效但语料不足以判断        → 只列公司名，不取岗位
  reject    证据指向另一家公司                 → 丢弃

历史坑（勿回归）
  · 空板面不是证据。某次正控板面在两次探测之间恰好清空，被误判为 reject。
    岗位数为 0 一律 unjudged，不得 reject。
  · 有一个 ATS 对任意乱码 token 都返回 200 + 空列表，无法区分真假板面，已弃用。
  · token 变体要全试：公司名去空格、去后缀（therapeutics/bio/labs/pharma…）、
    连字符形式。Ashby 多用连字符，Greenhouse 多用全连写。
"""
import json, re, sys, time, urllib.request, urllib.error, html
import concurrent.futures as cf

TIMEOUT = 20
UA = {"User-Agent": "Mozilla/5.0 (compatible; grant-site-board-discovery)"}
MIN_TERMS = 4          # E2 阈值：不同严格行业词个数
MIN_JOBS  = 5          # E3 阈值：板面岗位数

# 严格行业词：只收生物医药语境下几乎不会出现在别行业的词。
# 不要加 assay/platform/pipeline/data/research —— 广告业与咨询业同样高频使用。
STRICT = [
    "clinical trial", "preclinical", "in vivo", "in vitro", "cell culture",
    "flow cytometry", "western blot", "qpcr", "rna-seq", "sequencing",
    "crispr", "mrna", "sirna", "oligonucleotide", "antibody", "antibodies",
    "cell line", "gmp", "cmc", "ind-enabling", "fda", "pharmacokinetic",
    "pharmacology", "toxicology", "immunology", "oncology", "biomarker",
    "drug substance", "drug product", "bioanalytical", "molecular biology",
    "protein purification", "mass spectrometry", "cryo-em", "medicinal chemistry",
    "translational", "regulatory affairs", "gxp", "biologics", "gene therapy",
    "cell therapy", "vector", "plasmid", "organoid", "pipette",
]
STRICT_RE = [(t, re.compile(r"(?<![a-z])" + re.escape(t) + r"(?![a-z])", re.I)) for t in STRICT]

SUFFIX = ("therapeutics", "biosciences", "bioscience", "pharmaceuticals", "pharmaceutical",
          "pharma", "biotherapeutics", "biopharma", "biologics", "medicines", "bio",
          "labs", "laboratories", "sciences", "science", "technologies", "genomics",
          "health", "inc", "corporation", "corp", "company", "holdings", "group", "ltd")


def norm(s):
    return re.sub(r"[^a-z0-9]", "", (s or "").lower())


def core(name):
    """去掉行业后缀后的公司主干名，用于 E1 的宽松互含比较。"""
    w = [x for x in re.split(r"[^A-Za-z0-9]+", name) if x]
    while len(w) > 1 and w[-1].lower() in SUFFIX:
        w.pop()
    return norm(" ".join(w))


def toks(name):
    """生成候选 token，顺序即优先级。"""
    w = [x for x in re.split(r"[^A-Za-z0-9]+", name) if x]
    full = "".join(w).lower()
    c = core(name)
    out = [full, c]
    if len(w) > 1:
        out.append("-".join(x.lower() for x in w))
        cw = [x for x in w if x.lower() not in SUFFIX] or w
        out.append("-".join(x.lower() for x in cw))
    out.append(w[0].lower())                     # 单词首名（撞名高危，靠 E1/E2 兜底）
    seen, res = set(), []
    for t in out:
        if len(t) >= 3 and t not in seen:
            seen.add(t); res.append(t)
    return res


def get(url):
    try:
        req = urllib.request.Request(url, headers=UA)
        with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
            return json.loads(r.read().decode("utf-8", "replace"))
    except Exception:
        return None


def strip_html(t):
    t = html.unescape(html.unescape(t or ""))
    return re.sub(r"<[^>]+>", " ", t)


# ── 每个 ATS：返回 (board_name_or_None, [(title, description), ...]) ──
def probe_gh(tok):
    d = get(f"https://boards-api.greenhouse.io/v1/boards/{tok}/jobs?content=true")
    if not d or "jobs" not in d:
        return None
    meta = get(f"https://boards-api.greenhouse.io/v1/boards/{tok}")
    bn = (meta or {}).get("name")
    return bn, [(j.get("title", ""), strip_html(j.get("content", ""))) for j in d["jobs"]]


def probe_lv(tok):
    d = get(f"https://api.lever.co/v0/postings/{tok}?mode=json")
    if not isinstance(d, list):
        return None
    return None, [(j.get("text", ""), strip_html(j.get("descriptionPlain") or j.get("description", "")))
                  for j in d]


def probe_ab(tok):
    d = get(f"https://api.ashbyhq.com/posting-api/job-board/{tok}?includeCompensation=false")
    if not d or "jobs" not in d:
        return None
    return d.get("name"), [(j.get("title", ""), strip_html(j.get("descriptionHtml") or
                                                          j.get("descriptionPlain", "")))
                           for j in d["jobs"]]


PROBES = [("gh", probe_gh), ("lv", probe_lv), ("ab", probe_ab)]


def words(name):
    """去掉行业后缀与通用词后的词集合，用于 E1 比较。"""
    w = [x.lower() for x in re.split(r"[^A-Za-z0-9]+", name or "") if x]
    return {x for x in w if x not in SUFFIX and len(x) > 1}


def judge(company, board_name, jobs, tok=None):
    """三值判定：('ok'|'unjudged'|'reject', 理由)

    E1 只在**主干名完全相等**时判 ok。历史坑：早先用「互为子串」，
    结果 'Beam Therapeutics' 被一家名为 'Beam (advertising)' 的板面通过
    （短名 'beam' 是长名的子串）。名字部分重叠一律降级到 E2 取语料证据，
    完全不相交才 reject。
    """
    if not jobs:
        return "unjudged", "板面为空（空板面不构成证据）"

    # token 本身即名称证据：若 token 等于「公司全名去符号小写」且公司名不止一个词，
    # 别家公司几乎不可能占用它（'fatetherapeutics'、'delfidiagnostics'）。
    # 反例必须挡住：'beam' 只等于**主干名**、不等于全名 'beamtherapeutics' → 不算证据，
    # 这正是撞名广告公司的形态。
    tok_evidence = bool(
        tok and norm(tok) == norm(company) and len(re.findall(r"[A-Za-z0-9]+", company)) > 1)

    if board_name:
        a, b = core(company), core(board_name)
        if a and b and a == b:
            return "ok", f"E1 板面主干名相等：{board_name!r}"
        wa, wb = words(company), words(board_name)
        if wa and wb and not (wa & wb):
            return "reject", f"E1 板面名与公司名无共同词：{board_name!r} ≠ {company!r}"
        # 部分重叠（撞名高危）→ 由语料裁决，但门槛降到 1 个行业词。
        # 历史坑：'Blueprint Medicines, a Sanofi company' 明显就是该公司，
        # 却因板面小、严格词只有 2 个而被 reject。名字部分相符本身已是证据，
        # 再要求 MIN_TERMS 个词等于双重惩罚小板面。撞名的广告公司行业词为 0，
        # 仍会被挡住 —— 阈值 1 足以区分。
        partial = True
        name_note = f"（板面名 {board_name!r} 部分相符 + 语料佐证）"
    elif tok_evidence:
        partial = True
        name_note = f"（token {tok!r} 与公司全名一致 + 语料佐证）"
    else:
        partial = False
        name_note = ""

    # 无板面名时，token 必须由**完整公司名**推导（全名连写或去后缀主干），
    # 不能是「首个单词」。历史坑：Bio-Techne 的候选 token 'bio' 命中了另一家
    # 11 人小公司的 Ashby 板面（岗位含 E-commerce Lead），却因描述里有
    # preclinical/pharmacology 等词通过了 E2。仅靠语料无法区分同行业的另一家公司，
    # 所以此处用 token 形态兜底。
    if not board_name and tok and norm(tok) not in (norm(company), core(company)):
        return "reject", f"无板面名，且 token {tok!r} 非由公司全名推导（撞名风险）"

    corpus = " ".join(t + " " + dsc for t, dsc in jobs).lower()
    hit = sorted(t for t, rx in STRICT_RE if rx.search(corpus))
    if len(jobs) < MIN_JOBS:
        return "unjudged", f"岗位仅 {len(jobs)} 个（<{MIN_JOBS}），语料不足以判断{name_note}"
    need = 1 if partial else MIN_TERMS
    if len(hit) >= need:
        return "ok", f"E2 行业词 {len(hit)} 个：{', '.join(hit[:6])}{name_note}"
    return "reject", f"E2 行业词仅 {len(hit)} 个（需 {need}）：{hit}{name_note}"


def resolve(company, cat):
    for tok in toks(company):
        for ats, fn in PROBES:
            r = fn(tok)
            if r is None:
                continue
            bn, jobs = r
            verdict, why = judge(company, bn, jobs, tok=tok)
            if verdict == "ok":
                return {"co": company, "cat": cat, "ats": ats, "tok": tok,
                        "n": len(jobs), "why": why}
            if verdict == "unjudged":
                return {"co": company, "cat": cat, "ats": ats, "tok": tok,
                        "n": len(jobs), "why": why, "unjudged": True}
            print(f"    - {company} [{ats}:{tok}] 丢弃：{why}", file=sys.stderr)
    return None


def main(cand):
    ok, unj, miss = [], [], []
    with cf.ThreadPoolExecutor(max_workers=8) as ex:
        futs = {ex.submit(resolve, c, k): c for c, k in cand}
        done = 0
        for f in cf.as_completed(futs):
            done += 1
            if done % 25 == 0:
                print(f"  …{done}/{len(cand)}", file=sys.stderr)
            r = f.result()
            if r is None:
                miss.append(futs[f])
            elif r.get("unjudged"):
                unj.append(r)
            else:
                ok.append(r)
    ok.sort(key=lambda r: (r["cat"], r["co"]))
    unj.sort(key=lambda r: r["co"])
    out = {"verified": ok, "unjudged": unj, "no_board": sorted(miss)}
    json.dump(out, open("scripts/board_discovery.json", "w"), ensure_ascii=False, indent=1)
    print(f"核验通过 {len(ok)} 家 · 无法判断 {len(unj)} 家 · 未找到板面 {len(miss)} 家")
    return out


if __name__ == "__main__":
    cand = json.load(open(sys.argv[1] if len(sys.argv) > 1 else "scripts/candidates.json"))
    main([(c["co"], c["cat"]) for c in cand])
