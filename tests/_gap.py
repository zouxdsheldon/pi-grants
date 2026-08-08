"""盘点:每个数据源有哪些字段、字段的取值基数,和面板上已有的筛选控件数对比。
基数 2..40 的字段是"适合做下拉筛选却可能还没做"的候选。"""
import json, os, re
from collections import Counter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = os.path.join(ROOT, "data")


def jload(fn, key=None):
    b = json.load(open(os.path.join(D, fn)))
    if key:
        return b.get(key, [])
    return b


SRC = {
    "grants.json":   jload("grants.json", "grants") or jload("grants.json", "opportunities"),
    "curated.json":  jload("curated.json", "curated") or jload("curated.json", "funds"),
    "jobs.json":     jload("jobs.json", "jobs"),
    "papers.json":   jload("papers.json", "papers"),
    "journals.json": jload("journals.json", "journals"),
}

PANEL_CTRLS = {  # 来自 _inv.py 的实测
    "grants.json": 3, "curated.json": 7, "jobs.json": 13,
    "papers.json": 19, "journals.json": 4,
}

for fn, rows in SRC.items():
    print("=" * 68)
    print("%s  n=%d  面板控件数=%s" % (fn, len(rows), PANEL_CTRLS.get(fn, "?")))
    if not rows:
        continue
    keys = Counter()
    for r in rows[:4000]:
        for k in r.keys():
            keys[k] += 1
    cand = []
    for k, present in keys.most_common():
        vals = [r.get(k) for r in rows if r.get(k) not in (None, "", [], {})]
        if not vals:
            continue
        if isinstance(vals[0], (dict, list)):
            kind = "list/dict"
            card = "-"
        else:
            u = set(map(str, vals))
            card = len(u)
            kind = "scalar"
        cov = 100 * present // len(rows)
        if kind == "scalar" and 2 <= card <= 40:
            cand.append((k, card, cov))
        print("   %-22s cov=%3d%% card=%-6s %s" % (k, cov, card, kind))
    print("  → 适合做下拉筛选的字段:", [c[0] for c in cand])
