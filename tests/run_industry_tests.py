#!/usr/bin/env python3
"""tests/run_industry_tests.py — 「企业岗位」面板测试入口

为什么单独一个 runner:这个面板的分数是**唯一会被用户当判断依据**的数字,
而它有两类静默失效 —— 都不会报错,只会给出看似合理的排序:

  1. **关键词裸子串匹配**。"delivering revenue" 命中 "liver"、"external"
     命中 "rna"、"excellent" 命中 "cell"。首版实测:11/11 个 "liver" 命中
     全是假的。分数照样算出来,销售岗照样排前面。
  2. **公司样板文字污染**。公司简介 / 福利 / EEO 段落里塞满 "gene editing"
     "RNA" "liver",于是设施维护岗和研发岗拿到同一档分数。首版实测 Beam 的
     Facilities & Maintenance 岗拿到 11 分。

再加一类:**截断顺序**。若先把描述截到 600 字符再剔样板,而公司又把简介放在
开头,则剔完一个字不剩 —— 首版 58%(266/461)的岗位 desc 为空,分数全为 0,
但页面看起来完全正常。

所以这里先做数据契约自检,再跑 DOM 行为测试。缺 jsdom 时**明确跳过并说明**,
不假装通过。

跑法:python3 tests/run_industry_tests.py
"""
import json
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
DATA = os.path.join(ROOT, "data")


def find_jsdom():
    cand = []
    if os.environ.get("NODE_PATH"):
        cand += os.environ["NODE_PATH"].split(os.pathsep)
    cand += [os.path.join(ROOT, "node_modules"),
             os.path.join(os.path.dirname(ROOT), "node_modules"),
             "/tmp/jsdomtest/node_modules"]
    try:
        g = subprocess.run(["npm", "root", "-g"], capture_output=True, text=True, timeout=20)
        if g.returncode == 0 and g.stdout.strip():
            cand.append(g.stdout.strip())
    except Exception:
        pass
    for c in cand:
        # package.json 必须在 —— 只有 lib/ 的残缺安装 node 解析不了
        if c and os.path.isfile(os.path.join(c, "jsdom", "package.json")):
            return c
    return None


def data_selfcheck():
    errs = []
    p = os.path.join(DATA, "industry_jobs.json")
    if not os.path.isfile(p):
        return ["缺 data/industry_jobs.json —— 先跑 scripts/fetch_industry_jobs.py"]
    D = json.load(open(p, encoding="utf-8"))
    J = D.get("jobs", [])
    if len(J) < 50:
        errs.append("岗位数过少(%d),抓取可能大面积失败" % len(J))
    n_empty = sum(1 for j in J if not (j.get("desc") or "").strip())
    if n_empty:
        errs.append("%d 条 desc 为空 —— 截断顺序 bug 回归(先截断再剔样板)" % n_empty)
    if not D.get("n_boilerplate_sents"):
        errs.append("未检出任何样板句 —— 剔除逻辑失效")
    miss = [j["title"] for j in J if j.get("raw_score") is None][:3]
    if miss:
        errs.append("缺 raw_score,无法核对折减是否说谎,例:%s" % miss)
    W = D.get("weights") or {}
    if not W:
        errs.append("meta 缺 weights —— 前端无法验证折减")
    return errs


def main():
    print("== 数据契约自检 ==")
    errs = data_selfcheck()
    for e in errs:
        print("  FAIL " + e)
    if not errs:
        print("  ok   数据契约通过")

    print("\n== DOM 行为测试 ==")
    np_ = find_jsdom()
    if not np_:
        print("  跳过(未通过):找不到可用的 jsdom。装法:npm i jsdom,"
              "然后 NODE_PATH=<node_modules 目录> 重跑。")
        print("  注意:只有 lib/ 而没有 package.json 的残缺安装不算可用。")
        return 1 if errs else 2
    env = dict(os.environ, NODE_PATH=np_)
    r = subprocess.run(["node", os.path.join(HERE, "industry_test.js")],
                       cwd=ROOT, capture_output=True, text=True, env=env)
    sys.stdout.write(r.stdout)
    if r.stderr.strip():
        sys.stderr.write(r.stderr[-1500:])
    return 1 if (errs or r.returncode) else 0


if __name__ == "__main__":
    sys.exit(main())
