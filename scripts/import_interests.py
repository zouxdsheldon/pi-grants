#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""把「我的研究方向」面板导出的方向表并入 data/interests.json。

用法
    python scripts/import_interests.py data/interests_inbox --consume
    python scripts/import_interests.py my_topics.json          # 单文件,不删

设计前提(改这个文件前先读):

1. **用户不写查询式。** 面板里他只填「方向名 + 核心词 + 外围词」。
   PubMed / Europe PMC / Crossref / arXiv 的检索式由 build_queries()
   从核心词生成。网页端有一份同样的生成逻辑(为了即时预览),两者
   必须逐字一致 —— tests/run_interests_tests.py 里有 parity 断言在盯。
   要改生成规则,两边一起改,否则 parity 测试会红。

2. **能手写就不该被覆盖。** 如果某方向已经带了自己的 q_pubmed 等字段,
   且没有标 "q_auto": true,就原样保留 —— 那是有人特意手调过的。
   面板生成的方向会带 "q_auto": true,表示「这几行是自动生成的,可以再生成」。

3. **不静默丢东西。** 校验失败就整份拒绝(退出码 1)并说明哪一条错在哪,
   绝不「跳过坏的那条、导入其余」—— 那会让用户以为全导进去了。
   原文件在覆盖前备份到 data/interests.backup.json。
"""
import datetime
import json
import os
import re
import shutil
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data")
TARGET = os.path.join(DATA, "interests.json")
BACKUP = os.path.join(DATA, "interests.backup.json")

# 面板里没填就用这套(与 interests.template.json 一致)
DEFAULT_WEIGHTS = {
    "keyword": 0.65, "tfidf": 0.35, "core_hit": 1.0,
    "peri_hit": 0.35, "title_multiplier": 2.0, "exclude_penalty": -1.5,
}
DEFAULT_BANDS = {"high": 0.55, "medium": 0.28}
DEFAULT_SOURCES = ["pubmed", "epmc", "epmc_ppr", "biorxiv", "arxiv", "crossref"]


def slugify(name, taken):
    """方向 id:用户不填,从名字生成。ASCII 化失败(纯中文名)时退回 dir1/dir2。"""
    s = re.sub(r"[^a-z0-9]+", "_", (name or "").lower()).strip("_")
    if not s:
        s = "dir"
    base, i = s, 2
    while s in taken:
        s = f"{base}{i}"
        i += 1
    return s


def _q(term):
    """检索式里的词:带空格或连字符的要加引号,引号本身转义掉。"""
    t = (term or "").strip().replace('"', "")
    return f'"{t}"' if (" " in t or "-" in t) else t


def build_queries(core, want_arxiv=False):
    """核心词 → 四个数据源的检索式。网页端 buildQueries() 必须与此逐字一致。"""
    terms = [t.strip() for t in (core or []) if t and t.strip()]
    if not terms:
        return {"q_pubmed": "", "q_epmc": "", "q_arxiv": "", "q_crossref": ""}
    pm = " OR ".join(f"{_q(t)}[tiab]" for t in terms)
    ep = " OR ".join(f"TITLE_ABS:{_q(t)}" for t in terms)
    ax = " OR ".join(f"all:{_q(t)}" for t in terms) if want_arxiv else ""
    # Crossref 的 query.bibliographic 是宽松相关性匹配,布尔式反而更差 ——
    # 一句短自然语言最有效,所以只取前 4 个核心词拼起来。
    cr = " ".join(terms[:4])
    return {
        "q_pubmed": f"({pm})",
        "q_epmc": f"({ep})",
        "q_arxiv": ax,
        "q_crossref": cr,
    }


def validate(doc, src="(input)"):
    """返回错误列表。空列表 = 通过。"""
    errs = []
    if not isinstance(doc, dict):
        return [f"{src}: 顶层不是一个 JSON 对象"]
    its = doc.get("interests")
    if not isinstance(its, list) or not its:
        return [f"{src}: 缺少 interests 数组,或里面一个方向都没有"]
    for i, it in enumerate(its, 1):
        where = f"{src} 第 {i} 个方向"
        if not isinstance(it, dict):
            errs.append(f"{where}: 不是一个对象")
            continue
        nm = (it.get("name") or "").strip()
        if not nm:
            errs.append(f"{where}: 方向名是空的 —— 面板里那一栏必须填")
        core = [t for t in (it.get("core") or []) if str(t).strip()]
        if not core:
            errs.append(f"{where}(“{nm or '未命名'}”): 一个核心词都没有。"
                        f"核心词是打分的地基,空了这个方向永远抓不到东西")
        try:
            w = float(it.get("w", 1.0))
            if not (0 < w <= 5):
                errs.append(f"{where}: 权重 {w} 不在 0–5 之间")
        except (TypeError, ValueError):
            errs.append(f"{where}: 权重 “{it.get('w')}” 不是数字")
    bands = doc.get("bands") or DEFAULT_BANDS
    try:
        if float(bands["high"]) <= float(bands["medium"]):
            errs.append(f"{src}: 高相关阈值 {bands['high']} 必须大于中相关阈值 {bands['medium']}")
    except (KeyError, TypeError, ValueError):
        errs.append(f"{src}: bands 里的阈值不是数字")
    return errs


def normalize(doc):
    """补全缺省字段、生成 id 与检索式。不改动手调过的 q_*。"""
    out = dict(doc)
    out.setdefault("score_weights", DEFAULT_WEIGHTS)
    out.setdefault("bands", DEFAULT_BANDS)
    out.setdefault("sources", DEFAULT_SOURCES)
    out.setdefault("exclude", [])
    out["updated"] = datetime.date.today().isoformat()

    taken, its = set(), []
    for it in out["interests"]:
        d = dict(it)
        d["name"] = (d.get("name") or "").strip()
        d["core"] = [str(t).strip().lower() for t in (d.get("core") or []) if str(t).strip()]
        d["peri"] = [str(t).strip().lower() for t in (d.get("peri") or []) if str(t).strip()]
        d["w"] = float(d.get("w", 1.0))
        d["color"] = d.get("color") or "#4A148C"
        d["id"] = d.get("id") or slugify(d["name"], taken)
        taken.add(d["id"])
        # 手调过的检索式(没标 q_auto)不动;其余按核心词重新生成
        handmade = d.get("q_pubmed") and not d.get("q_auto")
        if not handmade:
            d.update(build_queries(d["core"], want_arxiv=bool(d.get("want_arxiv"))))
            d["q_auto"] = True
        its.append(d)
    out["interests"] = its
    return out


def load_drops(path):
    """返回 [(文件路径, 解析出的 dict)]。目录则收集其中的 *.json。"""
    if os.path.isdir(path):
        files = sorted(os.path.join(path, f) for f in os.listdir(path)
                       if f.lower().endswith(".json") and not f.startswith("."))
    else:
        files = [path]
    out = []
    for f in files:
        try:
            out.append((f, json.load(open(f, encoding="utf-8"))))
        except Exception as e:
            print(f"× 读不了 {f}:{e}")
            sys.exit(1)
    return out


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        return 0
    consume = "--consume" in sys.argv[1:]
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    path = args[0]

    if not os.path.exists(path):
        # 收件箱目录还没建 —— 定时任务里这是正常情况,不是错误
        print(f"收件箱 {path} 不存在,什么也没做。")
        return 0

    drops = load_drops(path)
    if not drops:
        print(f"收件箱 {path} 是空的,什么也没做。")
        return 0
    if len(drops) > 1:
        print(f"× 收件箱里有 {len(drops)} 份方向表:"
              f"{[os.path.basename(f) for f, _ in drops]}。"
              f"方向表是整份替换的,同时放多份无法判断该用哪一份 —— 请只留一份。")
        return 1

    src, doc = drops[0]
    errs = validate(doc, os.path.basename(src))
    if errs:
        print("× 方向表没通过校验,原 data/interests.json 未被改动:")
        for e in errs:
            print("   -", e)
        return 1

    new = normalize(doc)
    if os.path.exists(TARGET):
        shutil.copy2(TARGET, BACKUP)
        old = json.load(open(TARGET, encoding="utf-8"))
        old_n = len(old.get("interests", []))
    else:
        old_n = 0
    json.dump(new, open(TARGET, "w", encoding="utf-8"), ensure_ascii=False, indent=1)

    print(f"✓ 已换上新的方向表:{old_n} 个方向 → {len(new['interests'])} 个")
    for it in new["interests"]:
        print(f"   · {it['id']:<14} {it['name']}  "
              f"(核心 {len(it['core'])} 词 / 外围 {len(it['peri'])} 词,权重 {it['w']})")
    print(f"   原文件已备份到 {os.path.relpath(BACKUP, ROOT)}")
    print("   注意:下一轮抓取会按新方向**重建整个语料库**,"
          "不再匹配的旧文献会从列表里消失(你的 ⭐/已读标记按 DOI/PMID 存在浏览器里,不会丢)。")

    if consume:
        os.remove(src)
        print(f"   已消费并删除:{os.path.relpath(src, ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
