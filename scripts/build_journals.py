#!/usr/bin/env python3
"""scripts/build_journals.py —— 从本站语料构建「期刊查选」库。

诚实性约定(会在页面上原样声明):
  1. 所有计数都是**本站语料范围内**的,不是该刊全库统计。语料只覆盖本人
     关注的 8 个方向、近两年,所以「Nature 只有 3 篇」意味着「本语料里
     只有 3 篇」,不代表 Nature 很小。
  2. **不提供影响因子**。JCR IF 是受版权保护的商业数据,本站不抓、不存、
     不展示。tier(T1–T4)是刊名白名单的粗代理,来源见 fetch_papers.py。
  3. 发文量 < MIN_N 的刊标记 thin=True,前端显示「样本不足」而不是给出
     会被误读的百分比。

用法:  python3 scripts/build_journals.py
产出:  data/journals.json
"""
import json, os, sys, collections, statistics, datetime

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(os.path.dirname(HERE), "data")

MIN_N = 3          # 少于这么多篇 → 样本不足,不给比例
TOP_PAPERS = 3     # 每刊保留几篇代表作
RECENT_YEARS = 2   # 「近 N 年占比」的 N


def norm_journal(j):
    """归一刊名:去掉预印本服务器的长后缀、统一大小写与空白。"""
    j = (j or "").strip()
    if not j:
        return ""
    jl = j.lower()
    # "bioRxiv : the preprint server for biology" → "bioRxiv"
    for pre in ("biorxiv", "medrxiv", "arxiv", "research square", "ssrn", "authorea"):
        if jl.startswith(pre):
            return pre.title().replace("Biorxiv", "bioRxiv").replace("Medrxiv", "medRxiv") \
                      .replace("Arxiv", "arXiv").replace("Ssrn", "SSRN")
    return j


def main():
    pp = json.load(open(os.path.join(DATA, "papers.json")))
    papers = pp.get("papers", [])
    ints = json.load(open(os.path.join(DATA, "interests.json"))).get("interests", [])
    int_ids = [i["id"] for i in ints]
    int_names = {i["id"]: i.get("name", i["id"]) for i in ints}
    int_colors = {i["id"]: i.get("color", "#666") for i in ints}

    this_year = datetime.date.today().year
    by = collections.defaultdict(list)
    for p in papers:
        n = norm_journal(p.get("journal"))
        if n:
            by[n].append(p)

    out = []
    for name, ps in by.items():
        n = len(ps)
        years = [p.get("year") for p in ps if p.get("year")]
        oa = [p for p in ps if p.get("is_oa")]
        # tier 取该刊出现最多的那个(同刊应当一致,取众数以防个别记录缺失)
        tiers = [p.get("tier") for p in ps if p.get("tier")]
        tier = collections.Counter(tiers).most_common(1)[0][0] if tiers else None

        # 方向指纹:该刊全部论文在每个方向上的平均得分,再归一成占比
        vec = {}
        for k in int_ids:
            vals = [(p.get("dirs", {}).get(k) or {}).get("score", 0) or 0 for p in ps]
            vec[k] = sum(vals) / len(vals) if vals else 0.0
        tot = sum(vec.values())
        fp = {k: round(v / tot, 4) for k, v in vec.items() if tot > 0 and v / tot >= 0.01}

        novs = [p.get("novelty_pct") for p in ps if p.get("novelty_pct") is not None]
        recent = [y for y in years if y and y >= this_year - RECENT_YEARS + 1]

        top = sorted(ps, key=lambda p: -(p.get("score") or 0))[:TOP_PAPERS]
        top_out = [{"title": p.get("title", "")[:180], "year": p.get("year"),
                    "pmid": p.get("pmid"), "doi": p.get("doi"), "url": p.get("url"),
                    "score": p.get("score"), "top_dir": p.get("top_dir")} for p in top]

        thin = n < MIN_N
        out.append({
            "name": name,
            "n": n,
            "tier": tier,
            "is_preprint": tier == "preprint",
            "thin": thin,
            # 样本不足时这些比例会严重失真,直接给 None,前端显示「样本不足」
            "oa_pct": None if thin else round(len(oa) / n * 100, 1),
            "recent_pct": None if thin else round(len(recent) / n * 100, 1),
            "novelty_med": None if (thin or not novs) else round(statistics.median(novs), 1),
            "years": sorted(set(y for y in years if y)),
            "year_hist": dict(collections.Counter(y for y in years if y)),
            "fp": fp,
            "top_dir": max(fp, key=fp.get) if fp else None,
            "top": top_out,
        })

    out.sort(key=lambda r: (-r["n"], r["name"]))
    meta = {
        "updated": datetime.date.today().isoformat(),
        "corpus_n": len(papers),
        "n_journals": len(out),
        "min_n": MIN_N,
        "recent_years": RECENT_YEARS,
        "n_thin": sum(1 for r in out if r["thin"]),
        "int_ids": int_ids, "int_names": int_names, "int_colors": int_colors,
        "note": "计数为本站语料范围内,非期刊全库统计;不提供影响因子(JCR IF 为版权数据)。",
    }
    fp_out = os.path.join(DATA, "journals.json")
    json.dump({"meta": meta, "journals": out}, open(fp_out, "w"),
              ensure_ascii=False, separators=(",", ":"))

    print(f"journals={len(out)}  thin={meta['n_thin']}  corpus={len(papers)}")
    print("tier dist:", dict(collections.Counter(r["tier"] for r in out)))
    print("top10 by n:", [(r["name"][:38], r["n"], r["tier"]) for r in out[:10]])
    print("bytes:", os.path.getsize(fp_out))


if __name__ == "__main__":
    main()
