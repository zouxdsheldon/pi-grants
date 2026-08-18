#!/usr/bin/env python3
"""tests/run_papers_tests.py — 「文献追踪」分流层测试的入口

为什么值得单独一个 runner:这个面板的判断("上次之后新入库 N 篇")依赖两个
数据契约,而这两个契约都是**日常会被改的文件**:

  1. data/papers.json 每条记录要有 first_seen(入库台账日期,不是发表日期)。
     抓取脚本每天重写这个文件 —— 一次改坏,面板就会开始漏报新文献,而且不会报错,
     只是数字变小。这类"静默变小"必须有断言盯着。
  2. data/paper_first_seen.json 是只增台账。如果它被清空或被写成滑动窗口,
     昨天读过的文献明天会重新变成"新入库" —— 假新增比没有新增提示更糟。

所以先做数据自检,再跑浏览器行为测试。缺 node/jsdom 时明确跳过并说明原因,
不假装通过。

跑法:python3 tests/run_papers_tests.py
"""
import json
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
DATA = os.path.join(ROOT, "data")
IDX = os.path.join(ROOT, "index.html")


def find_jsdom():
    """不写死路径:先看现成的 NODE_PATH,再看仓库内/上层 node_modules,最后问 npm 全局根。"""
    cand = []
    if os.environ.get("NODE_PATH"):
        cand += os.environ["NODE_PATH"].split(os.pathsep)
    cand += [os.path.join(ROOT, "node_modules"),
             os.path.join(os.path.dirname(ROOT), "node_modules")]
    try:
        g = subprocess.run(["npm", "root", "-g"], capture_output=True, text=True, timeout=20)
        if g.returncode == 0 and g.stdout.strip():
            cand.append(g.stdout.strip())
    except Exception:
        pass
    for c in cand:
        if c and os.path.isdir(os.path.join(c, "jsdom")):
            return c
    return None


def data_selfcheck():
    """数据契约自检 —— 返回错误列表(空 = 通过)。"""
    errs = []
    pj = os.path.join(DATA, "papers.json")
    if not os.path.exists(pj):
        return ["data/papers.json 不存在"]
    d = json.load(open(pj, encoding="utf-8"))
    papers = d.get("papers") or []
    meta = d.get("meta") or {}
    if not papers:
        return ["data/papers.json 里没有 papers"]

    # 台账字段必须存在于绝大多数记录上。允许少量无 DOI/PMID 的记录为空(诚实留空),
    # 但如果整体缺失,说明抓取脚本没写台账 —— 面板会静默把「新入库」显示为 0。
    keyed = [p for p in papers if p.get("doi") or p.get("pmid")]
    missing = [p for p in keyed if not p.get("first_seen")]
    if keyed and len(missing) > 0:
        errs.append(f"{len(missing)}/{len(keyed)} 条有 DOI/PMID 的记录缺 first_seen "
                    f"(例:{(missing[0].get('title') or '')[:60]}) —— 面板的「新入库」会漏报")
    if not meta.get("first_seen_since"):
        errs.append("meta.first_seen_since 缺失 —— 面板无法说明台账从哪天起有数据,"
                    "会让存量文献看起来像今天新增的")

    # first_seen 不能晚于今天,也不能早于台账建立日 —— 两者都说明台账被写坏了
    since = meta.get("first_seen_since") or ""
    import datetime
    today = datetime.date.today().isoformat()
    bad_future = [p for p in keyed if (p.get("first_seen") or "") > today]
    if bad_future:
        errs.append(f"{len(bad_future)} 条 first_seen 晚于今天 —— 未来日期会让它永远算「新」")
    if since:
        bad_early = [p for p in keyed if (p.get("first_seen") or since) < since]
        if bad_early:
            errs.append(f"{len(bad_early)} 条 first_seen 早于 meta.first_seen_since={since} "
                        "—— 台账起始日与记录矛盾")

    # 台账文件本身:只增,键数不应少于当前语料里有标识的记录数
    lj = os.path.join(DATA, "paper_first_seen.json")
    if os.path.exists(lj):
        led = json.load(open(lj, encoding="utf-8"))
        seen = led.get("seen") or {}
        if len(seen) < len(keyed):
            errs.append(f"台账只有 {len(seen)} 个键,少于语料里 {len(keyed)} 条有标识的记录 "
                        "—— 台账被截断过?掉出去的文献下次会假装成新入库")
    else:
        errs.append("data/paper_first_seen.json 不存在 —— 下次抓取会把全部文献当成新入库")
    return errs


def main():
    errs = data_selfcheck()
    if errs:
        print("数据自检失败:")
        for e in errs:
            print("  ✗ " + e)
        return 1
    print("数据自检通过(台账字段齐全、日期自洽、台账未被截断)")

    np = find_jsdom()
    if not np:
        print("跳过浏览器行为测试:找不到 jsdom。"
              "装法:npm i jsdom 然后 NODE_PATH=<node_modules 目录> 重跑。"
              "(跳过 ≠ 通过)")
        return 0
    env = dict(os.environ, NODE_PATH=np)
    r = subprocess.run(["node", os.path.join(HERE, "papers_test.js"), IDX, DATA],
                       env=env, cwd=ROOT)
    if r.returncode == 0:
        print("文献分流层行为测试通过(台账口径 / 时间戳不自动前移 / "
              "备份往返 / 隐藏筛选自动展开 / 预设叠加 / 引用列表块级)")
    return r.returncode


if __name__ == "__main__":
    sys.exit(main())
