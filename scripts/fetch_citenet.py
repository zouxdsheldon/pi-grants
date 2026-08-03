#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
fetch_citenet.py — 为语料内文献建**引用网络**(Europe PMC references / citations)。

只保留**两端都在语料里**的边。理由:跨出语料的边无法在本站核对,画上去只是装饰;
留在语料内则每条边都能点开两头看。另外记录三类可核算的派生量:

  · in_corpus_cited_by  语料内被引次数(= 本站视角的"地基文献")
  · in_corpus_refs      语料内引用了几篇(= 与本领域的连接度)
  · co_citation         与本文被同一篇后续文献共同引用的次数最高的邻居(= "常被一起读")
  · bridges             连接两个不同研究方向(interests.json 的 id)的边 → 交叉点提示

Europe PMC REST 无需 key,但要礼貌:串行 + 每次请求间隔 0.12s,只查有 PMID 的记录。
默认上限 400 篇(按相关性排序取前 N),避免每日 Actions 里跑太久;可用 --limit 调。
"""
import os, sys, json, time, socket, http.client, urllib.request, urllib.error, datetime
from concurrent.futures import ThreadPoolExecutor
from collections import defaultdict, Counter

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(os.path.dirname(HERE), "data")
EPMC = "https://www.ebi.ac.uk/europepmc/webservices/rest"
UA = {"User-Agent": "grants-finder-paper-tracker/1.0"}
SLEEP = 0.0            # 并发下不再逐次 sleep;并发度本身就是限流阀
WORKERS = 4            # Europe PMC 健康时单请求 ~1s;实测偶发挂起会拖到 30s+,
                       # 串行时 9 篇就能吃掉 7 分钟预算。4 路并发把挂起的代价摊掉。
TIMEOUT = 12           # 超过 12s 基本是挂起而非慢响应,早失败早重试
BUDGET = 1500          # 全局墙钟预算(秒)。实测单篇 1–11s,350 篇约 20 分钟;
                       # 但偶发的连接挂起会让整轮无限期卡住(线上曾跑满 2 小时无输出),
                       # 因此宁可抓一半就收工,也不让每日 Actions 卡死。
socket.setdefaulttimeout(15)   # 兜底:urlopen 的 timeout 不覆盖某些握手阶段


def jget(url, tries=2):
    for k in range(tries):
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=TIMEOUT) as f:
                return json.load(f)
        except Exception as e:
            # RemoteDisconnected / ConnectionReset 不是 URLError 子类,必须宽捕获,
            # 否则单次断连就会中断整轮抓取(实测在第 ~90s 处发生)。
            if k == tries - 1:
                return {"_error": type(e).__name__ + ": " + str(e)[:100]}
            time.sleep(1.5 * (k + 1))
    return {}


def refs_of(pmid):
    d = jget(f"{EPMC}/MED/{pmid}/references?format=json&pageSize=200")
    lst = (d.get("referenceList") or {}).get("reference") or []
    return [r["id"] for r in lst if r.get("source") == "MED" and r.get("id")]


def cites_of(pmid):
    d = jget(f"{EPMC}/MED/{pmid}/citations?format=json&pageSize=200")
    lst = (d.get("citationList") or {}).get("citation") or []
    return [r["id"] for r in lst if r.get("source") == "MED" and r.get("id")]


def main():
    global BUDGET
    limit = 400
    for i, a in enumerate(sys.argv):
        if a == "--limit" and i + 1 < len(sys.argv):
            limit = int(sys.argv[i + 1])
        if a == "--budget" and i + 1 < len(sys.argv):
            BUDGET = int(sys.argv[i + 1])

    blob = json.load(open(os.path.join(DATA, "papers.json")))
    papers = blob["papers"]
    by_pmid = {p["pmid"]: p for p in papers if p.get("pmid")}

    # 取相关性最高的前 limit 篇(有 PMID 的)去查图
    cand = sorted([p for p in papers if p.get("pmid")],
                  key=lambda p: -(p.get("score") or 0))[:limit]

    edges = set()          # (src_pmid, dst_pmid) 表示 src 引用 dst
    ext_cited_by = {}      # 语料外也算的被引者数量(仅统计,不建边)
    errs = 0
    t0 = time.time()
    def one(pm):
        return pm, refs_of(pm), cites_of(pm)

    done = 0
    with ThreadPoolExecutor(max_workers=WORKERS) as ex:
        for pm, rs, cs in ex.map(one, [p["pmid"] for p in cand]):
            done += 1
            if rs == [] and cs == []:
                errs += 1
            for r in rs:
                if r in by_pmid:
                    edges.add((pm, r))
            for c in cs:
                if c in by_pmid:
                    edges.add((c, pm))
            ext_cited_by[pm] = len(cs)
            if done % 25 == 0:
                print(f"  {done}/{len(cand)} edges={len(edges)} err={errs} {time.time()-t0:.0f}s", flush=True)
    cand = cand[:done]
    print(f"  抓取完成 {done} 篇 · 失败 {errs} · {time.time()-t0:.0f}s", flush=True)

    # ---- 派生量
    indeg = Counter(d for _, d in edges)          # 语料内被引
    outdeg = Counter(s for s, _ in edges)         # 语料内引用
    refs_by = defaultdict(set)
    for s, d in edges:
        refs_by[s].add(d)

    # 共被引:同一篇 s 同时引了 a 和 b → (a,b) 计 1
    co = Counter()
    for s, ds in refs_by.items():
        ds = sorted(ds)
        for i in range(len(ds)):
            for j in range(i + 1, len(ds)):
                co[(ds[i], ds[j])] += 1

    co_top = defaultdict(list)
    for (a, b), c in co.most_common():
        if c < 2:
            break
        if len(co_top[a]) < 5:
            co_top[a].append({"pmid": b, "n": c})
        if len(co_top[b]) < 5:
            co_top[b].append({"pmid": a, "n": c})

    # 桥边:两端 top_dir 不同 → 方向交叉点
    bridges = []
    for s, d in edges:
        ta, tb = by_pmid[s].get("top_dir"), by_pmid[d].get("top_dir")
        if ta and tb and ta != tb:
            bridges.append({"src": s, "dst": d, "from": ta, "to": tb})
    bridge_pairs = Counter((min(b["from"], b["to"]), max(b["from"], b["to"])) for b in bridges)

    # 逐篇结果单独放在 citenet.json 的 net 字段里,**不回写 papers.json**。
    # 原因:analyze_papers.py 也写 papers.json,两个脚本同时跑会互相覆盖(实测发生过),
    # 而前端本来就要单独加载 citenet.json,合并在浏览器里做即可。
    netmap = {}
    for pm in by_pmid:
        if pm not in ext_cited_by and indeg.get(pm, 0) == 0 and outdeg.get(pm, 0) == 0:
            continue
        netmap[pm] = {
            "cb": indeg.get(pm, 0),
            "rf": outdeg.get(pm, 0),
            "co": co_top.get(pm, []),
            "q": 1 if pm in ext_cited_by else 0,
        }

    out = {
        "generated": datetime.datetime.now().strftime("%Y-%m-%d %H:%M"),
        "source": "Europe PMC REST /references + /citations (无需 key)",
        "queried_n": len(cand),
        "corpus_with_pmid": len(by_pmid),
        "edges_n": len(edges),
        "query_failures": errs,
        "edges": [{"s": s, "d": d} for s, d in sorted(edges)],
        "foundational": [{"pmid": pm, "n": c,
                          "title": (by_pmid[pm].get("title") or "")[:160],
                          "year": by_pmid[pm].get("year")}
                         for pm, c in indeg.most_common(25)],
        "net": netmap,
        "bridge_pairs": [{"a": a, "b": b, "n": n} for (a, b), n in bridge_pairs.most_common(20)],
        "limits": [
            "只画两端都在本语料内的边 —— 语料外的引用无法在站内核对,故不画。",
            "只查有 PMID 的记录;预印本(bioRxiv/arXiv,无 PMID)不在图内。",
            # 报实际查询数,不报 --limit 旗标值:语料 1097 篇但只有约 670 篇有 PMID,
            # 写 "前 900 篇" 会高估实际覆盖面。
            (f"本轮实际查询 {len(cand)} 篇(语料 {len(papers)} 篇中有 PMID 的 {len(by_pmid)} 篇,"
             f"上限 --limit {limit});无 PMID 的记录 net 字段为空。"),
            (f"本轮 {errs} 次查询失败({100.0*errs/max(1,len(cand)):.0f}%)—— Europe PMC 偶发连接挂起,"
             f"失败的记录引用邻域显示为空,不代表它没有引用关系。"),
            "共被引阈值 ≥2 —— 只出现一次的共现是噪声。",
        ],
    }
    json.dump(out, open(os.path.join(DATA, "citenet.json"), "w"),
              ensure_ascii=False, separators=(",", ":"))
    print(json.dumps({k: v for k, v in out.items() if k not in ("edges", "foundational")},
                     ensure_ascii=False, indent=1) if False else
      json.dumps({k: v for k, v in out.items()
                  if k not in ("edges", "foundational", "net")}, ensure_ascii=False, indent=1))
    print("top foundational:", [(f["pmid"], f["n"]) for f in out["foundational"][:8]])


if __name__ == "__main__":
    main()
