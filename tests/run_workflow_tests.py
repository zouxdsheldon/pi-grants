#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""工作流触发链的安全性检查。

背景:update.yml 加了 `on: push` —— 改完研究方向立刻重抓,不用等第二天。
这条便利依赖一个前提:**本工作流自己的提交不会再次触发它自己**。
GitHub 的规则是"用默认 GITHUB_TOKEN 推的提交不触发 on:push 工作流",
所以只要提交步骤一直用默认 token,环就不会形成。

这个前提是隐式的、没有任何运行时报错会提醒你 —— 一旦有人为了绕过分支保护
把 `git push` 换成 PAT / deploy key / peter-evans 之类的 action,
就会变成"抓取→提交→抓取"的无限循环,烧掉 Actions 配额而且没人立刻发现。
所以在这里把它钉成断言。
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WF = os.path.join(ROOT, ".github", "workflows", "update.yml")

# 一旦提交步骤改用这些凭据之一,GITHUB_TOKEN 的"不自激"保证就失效
PAT_MARKERS = [
    r"secrets\.(?!GITHUB_TOKEN)[A-Z_][A-Z0-9_]*",   # 任何非默认 secret
    r"peter-evans/create-pull-request",
    r"ad-m/github-push-action",
    r"stefanzweifel/git-auto-commit-action",
    r"ssh-agent|deploy[_-]key",
]


def main():
    src = open(WF, encoding="utf-8").read()
    fails = []

    # 1) push 触发确实存在,且限定在方向相关路径 —— 否则每次改 index.html
    #    都会跑一遍完整的六源抓取,既慢又浪费配额
    if "push:" not in src:
        fails.append("update.yml 没有 on:push —— 改方向后无法立刻生效")
    else:
        head = src.split("jobs:")[0]
        if "paths:" not in head:
            fails.append("on:push 没有 paths 限定 —— 任何提交都会触发全量抓取")
        for p in ("data/interests_inbox/**", "data/interests.json"):
            if p not in head:
                fails.append(f"on:push 的 paths 里缺 {p}")

    # 2) 循环安全:提交步骤必须用默认 GITHUB_TOKEN
    for pat in PAT_MARKERS:
        m = re.search(pat, src)
        if m:
            fails.append(
                "提交步骤疑似改用了非默认凭据 (%r) —— 那样自己的推送会再次触发 on:push,"
                "形成无限循环。要么去掉 on:push,要么改回默认 GITHUB_TOKEN。" % m.group(0))

    # 3) 方向导入必须排在文献抓取之前,否则新方向要等下一轮才生效
    i_imp = src.find("import_interests.py")
    i_fet = src.find("fetch_papers.py")
    if i_imp < 0 or i_fet < 0:
        fails.append("找不到 import_interests / fetch_papers 步骤")
    elif i_imp > i_fet:
        fails.append("import_interests.py 排在 fetch_papers.py 之后 —— 新方向要等下一轮才生效")

    # 4) 提交步骤引用的每个路径都必须真的在仓库里存在。
    #    2026-08-18/19 连丢两天数据的根因:`git add data/interests_inbox`,
    #    而该目录是空的、git 不跟踪空目录 → fatal: pathspec did not match
    #    → 整个提交步骤失败 → 当天抓好的 papers.json 全部丢弃。
    #    抓取步骤全绿,只有最后一步红,页面上看不出任何异常 —— 所以必须自动盯。
    commit_blk = src[src.find("Commit if changed"):]
    referenced = re.findall(r"\b(data/[\w./-]+|digest\.html|feed\.xml)", commit_blk)
    for p in sorted(set(referenced)):
        if not os.path.exists(os.path.join(ROOT, p)):
            fails.append(
                "提交步骤引用了仓库里不存在的路径 %r —— git add 会 fatal 并中止整步,"
                "当天抓到的数据会被静默丢弃。空目录请放 .gitkeep。" % p)

    # 5) 两个收件箱目录必须带 .gitkeep 留在仓库里
    for d in ("data/interests_inbox", "data/pivot_inbox"):
        if not os.path.exists(os.path.join(ROOT, d, ".gitkeep")):
            fails.append(f"{d}/.gitkeep 不在 —— 目录会从仓库消失,重演 08-18 的丢数据故障")

    for f in fails:
        print("  FAIL", f)
    if not fails:
        print("  ok   on:push 限定在方向文件 · 默认 GITHUB_TOKEN 不自激 · 导入排在抓取之前 · 提交路径全部存在")
    print()
    print("工作流触发链检查" + ("失败" if fails else "通过"))
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())