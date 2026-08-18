#!/usr/bin/env python3
"""我的研究方向 面板 —— 测试入口。

两部分:
  1) parity:网页 buildQueries() 与 scripts/import_interests.py 的 build_queries()
     对同一批词必须输出**字符级相同**的检索式。这条是整个设计的地基 ——
     面板给用户看的预览,必须就是明早真正入库的那一份;两边不一致的话,
     用户看到的和跑的是两回事,那预览就是骗人。
  2) 浏览器行为:tests/interests_test.js(19 项,含 4 条诚实契约)。

parity 的实现方式:直接从 index.html 里抠出 buildQueries/dq 两个函数,
在 node 里跑,与 Python 版逐字比对。不重写一份 JS —— 重写的话就变成
「测试自己的副本」,真正上线那份改了也照样绿。

node 不在时:跳过并说明原因,退出码 0,绝不假装通过。
"""
import json
import os
import re
import shutil
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "scripts"))

# parity 的测试用例:普通词、多词短语、连字符、大小写、超过 4 个词
# (Crossref 只取前 4 个,这条边界必须覆盖)、以及空列表。
CASES = [
    (["ampk"], False),
    (["ampk", "tdmd"], False),
    (["metabolic memory"], False),
    (["co-culture"], False),
    (["ZSWIM8"], False),
    (["ampk", "tdmd", "mirna", "zswim8", "cul3", "lactate"], False),
    (["ampk", "metabolic memory", "co-culture"], True),
    (["tdmd"], True),
    ([], False),
    ([], True),
]

JS_PARITY = r"""
%(fns)s
const cases = %(cases)s;
const out = cases.map(c => buildQueries(c[0], c[1]));
console.log(JSON.stringify(out));
"""


def extract_fns(html):
    """从 index.html 抠出 dq() 与 buildQueries() 的真身。"""
    got = {}
    for name in ("dq", "buildQueries"):
        m = re.search(r"\nfunction %s\((.*?)\n}\n" % name, html, re.S)
        if not m:
            return None, "index.html 里找不到 function %s(" % name
        got[name] = "function %s(%s\n}\n" % (name, m.group(1))
    return got["dq"] + "\n" + got["buildQueries"], None


def run_parity(node):
    from import_interests import build_queries as py_build

    html = open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
    fns, err = extract_fns(html)
    if err:
        print("  FAIL parity — " + err)
        return 1

    src = JS_PARITY % {"fns": fns, "cases": json.dumps(CASES)}
    tmp = os.path.join(ROOT, ".parity.tmp.js")
    open(tmp, "w", encoding="utf-8").write(src)
    try:
        r = subprocess.run([node, tmp], capture_output=True, text=True)
    finally:
        os.unlink(tmp)
    if r.returncode != 0:
        print("  FAIL parity — node 执行失败: " + (r.stderr or "")[-400:])
        return 1

    js_out = json.loads(r.stdout.strip().splitlines()[-1])
    bad = 0
    for (core, want_arxiv), js in zip(CASES, js_out):
        py = py_build(core, want_arxiv)
        for k in ("q_pubmed", "q_epmc", "q_arxiv", "q_crossref"):
            if js.get(k, "") != py.get(k, ""):
                bad += 1
                print("  FAIL parity %s core=%r arxiv=%s\n        js=%r\n        py=%r"
                      % (k, core, want_arxiv, js.get(k, ""), py.get(k, "")))
    if bad:
        print("  → 网页预览与导入脚本不一致:用户看到的检索式不是明早真正跑的那一份。")
        return 1
    print("  ok   parity — %d 组用例 × 4 个源,检索式字符级一致" % len(CASES))
    return 0


def run_validate_parity():
    """面板的校验规则与导入脚本同口径:面板放过的,导入不该再拒。
    这里只钉住导入脚本这一侧的四类错误确实会被拒(面板侧由 I8/I8b 覆盖)。"""
    from import_interests import validate

    bad_docs = [
        ("空核心词", {"interests": [{"name": "x", "core": [], "w": 1}]}),
        ("空名字", {"interests": [{"name": "", "core": ["ampk"], "w": 1}]}),
        ("权重越界", {"interests": [{"name": "x", "core": ["ampk"], "w": 99}]}),
        ("阈值颠倒", {"interests": [{"name": "x", "core": ["ampk"], "w": 1}],
                   "bands": {"high": 0.1, "medium": 0.5}}),
    ]
    fails = 0
    for label, doc in bad_docs:
        errs = validate(doc)
        if not errs:
            print("  FAIL validate — 『%s』应被拒绝但通过了" % label)
            fails += 1
    good = {"interests": [{"name": "AMPK", "core": ["ampk"], "peri": ["mirna"], "w": 1.0}],
            "bands": {"high": 0.55, "medium": 0.28}, "exclude": []}
    if validate(good):
        print("  FAIL validate — 合规文档被误拒: %r" % validate(good))
        fails += 1
    if not fails:
        print("  ok   validate — 4 类错误都会被拒,合规文档通过")
    return 1 if fails else 0


def main():
    print("== 我的研究方向:检索式一致性 + 校验口径 ==")
    node = shutil.which("node")
    rc = run_validate_parity()
    if not node:
        print("  SKIP parity + 浏览器行为 — 环境里没有 node(不是通过,是跳过)")
        return rc
    rc |= run_parity(node)

    print("\n== 浏览器行为 ==")
    env = dict(os.environ)
    env.setdefault("NODE_PATH", "/tmp/jsdomtest/node_modules")
    r = subprocess.run([node, os.path.join(ROOT, "tests", "interests_test.js"), "index.html"],
                       cwd=ROOT, env=env, capture_output=True, text=True)
    print(r.stdout.rstrip())
    if r.returncode != 0 and "Cannot find module" in (r.stderr or ""):
        print("  SKIP — 缺 jsdom:npm i jsdom 后重跑(不是通过,是跳过)")
        return rc
    if r.stderr.strip():
        print(r.stderr.strip()[-600:])
    rc |= r.returncode
    return rc


if __name__ == "__main__":
    sys.exit(main())
