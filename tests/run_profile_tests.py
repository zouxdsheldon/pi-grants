#!/usr/bin/env python3
"""tests/run_profile_tests.py — 「我的档案」智能层测试的入口

为什么要单独一个 runner：档案层的判定逻辑（能投 / 差一步 / 信息不足 / 不符、
窗口倒计时、缺口排序、年份自动推算）全部由 data/funds.json + data/profile_schema.json
驱动。改这两个 JSON 是**不改代码**的日常操作，所以每次改完都要有东西替你确认：

  · 留空的字段仍然判「信息不足」，没有被悄悄当成「符合」；
  · 「差一步」只用在真的能改的门槛上（愿不愿意去、有没有落地单位），
    国籍/年龄这类当下改不了的失败绝不能被美化；
  · 年份表示法不过期（明年打开，年数自动 +1）；
  · 打开弹层→翻页→保存这一整趟，不会抹掉任何已存答案（这是真发生过的缺陷）。

用 jsdom 跑真实 index.html + 真实 data/*.json，不用 DOM 桩：桩会把事件和
innerHTML 吃掉，「填一个字段判定立刻变」这类行为在桩上永远是绿的，测不出东西。

跑法：  python3 tests/run_profile_tests.py
依赖：  node + jsdom。找不到就跳过并说明原因（不会假装通过）。
"""
import json
import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEST_JS = os.path.join(ROOT, "tests", "profile_test.js")
INDEX = os.path.join(ROOT, "index.html")
DATA = os.path.join(ROOT, "data")


def find_jsdom():
    """返回一个能 require('jsdom') 的 NODE_PATH，找不到返回 None。

    不写死路径：先看现有 NODE_PATH，再看仓库/上级的 node_modules，最后问 npm。
    """
    cands = []
    if os.environ.get("NODE_PATH"):
        cands += os.environ["NODE_PATH"].split(os.pathsep)
    cands += [
        os.path.join(ROOT, "node_modules"),
        os.path.join(ROOT, "tests", "node_modules"),
        os.path.join(os.path.dirname(ROOT), "node_modules"),
    ]
    try:
        out = subprocess.run(["npm", "root", "-g"], capture_output=True, text=True, timeout=30)
        if out.returncode == 0 and out.stdout.strip():
            cands.append(out.stdout.strip())
    except Exception:
        pass
    for c in cands:
        if c and os.path.isdir(os.path.join(c, "jsdom")):
            return c
    return None


def main():
    if not os.path.exists(TEST_JS):
        print("跳过：找不到 tests/profile_test.js")
        return 0
    try:
        subprocess.run(["node", "-v"], capture_output=True, timeout=30, check=True)
    except Exception:
        print("跳过：没有 node —— 档案层测试需要 node + jsdom（`npm i jsdom` 后重跑）")
        return 0
    np = find_jsdom()
    if not np:
        print("跳过：找不到 jsdom —— 在仓库根目录跑 `npm i jsdom` 后重跑")
        return 0

    # 数据文件本身先自检一遍：rules 引用的字段必须在 schema 里，否则跳转按钮会点空
    funds = json.load(open(os.path.join(DATA, "funds.json"), encoding="utf-8"))
    schema = json.load(open(os.path.join(DATA, "profile_schema.json"), encoding="utf-8"))
    keys = {f["key"] for f in schema["fields"]}
    bad = []
    for f in funds["funds"]:
        for r in f.get("rules", []):
            if r["field"] not in keys:
                bad.append(f["id"] + ":" + r["field"])
    if bad:
        print("FAIL 资格规则引用了 schema 里不存在的字段：" + ", ".join(bad))
        print("     （这会让「✏️ 去填 X」按钮点了没反应）")
        return 1

    env = dict(os.environ, NODE_PATH=np)
    r = subprocess.run(["node", TEST_JS, INDEX, DATA],
                       capture_output=True, text=True, env=env, timeout=900)
    sys.stdout.write(r.stdout)
    if r.stderr.strip():
        sys.stderr.write(r.stderr[-2000:])
    if r.returncode == 0:
        print("档案层：全部通过（判定诚实性 / 年份不过期 / 保存不丢数据）")
    return r.returncode


if __name__ == "__main__":
    sys.exit(main())
