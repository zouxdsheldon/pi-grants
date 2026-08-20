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
    # 必须用 UTC:抓取跑在 GitHub runner(UTC)上,本地时区落后时会把今早刚入库的
    # 记录误判成"未来日期"。多给一天容差,跨时区/跨日切换时不误报。
    today = (datetime.datetime.now(datetime.timezone.utc).date()
             + datetime.timedelta(days=1)).isoformat()
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
        # 不能拿数量比数量:语料是 400 天滑动窗口、台账是只增账,两者没有大小关系。
        # (曾经写成 len(seen) < len(keyed) 而误报:抓取提交失败导致台账滞后三天,
        #  语料已更新、台账未落库,数量比较就报"台账被截断",实际台账完好。)
        # 真正要防的是"台账被截断/清空",判据是:早先已经记过的键突然消失。
        # 逐键核对时必须与抓取脚本同口径 —— stamp_first_seen 用的是 doi or pmid,
        # 优先级反了会把所有有 DOI 的记录误判成缺失。
        key = lambda p: (p.get("doi") or p.get("pmid") or "")
        stamped = [p for p in keyed if p.get("first_seen")]
        # 记录自称有入库日期,台账里却查无此键 = 台账掉过数据
        # 台账文件与 papers.json 可能不在同一次提交里落库,今天刚入库的记录允许暂缺;
        # 真正的截断表现为"更早日期的记录"从台账里消失。
        ledger_max = max(seen.values()) if seen else ""
        orphan = [p for p in stamped
                  if key(p) not in seen and (p.get("first_seen") or "") <= ledger_max]
        if orphan:
            errs.append(f"{len(orphan)}/{len(stamped)} 条记录带 first_seen,台账里却没有对应键 "
                        f"(例:{key(orphan[0])}) —— 台账被截断过,这些文献下次会假装成新入库")
        # 台账明显缩水也要报(允许滞后,不允许倒退)
        if led.get("n") is not None and len(seen) < int(led.get("n") or 0):
            errs.append(f"台账 n={led.get('n')} 但实际只有 {len(seen)} 个键 —— 台账被写坏了")
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
