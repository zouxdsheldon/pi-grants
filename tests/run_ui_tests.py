#!/usr/bin/env python3
"""tests/run_ui_tests.py — 文献面板前端行为测试(离线,无需浏览器)

为什么需要它:index.html 里的深读抽屉逻辑有 1000+ 行,靠肉眼看不出
"某一篇记录会渲染出 undefined" 这类问题。这里的做法是:
  1. 把 index.html 最后一个 <script> 块抽出来,去掉 loadData() 引导调用;
  2. 用一个极简 DOM 桩(只提供被测函数真正用到的 getElementById/value/checked)喂给它;
  3. 用 data/papers.json 的**全部**真实记录跑一遍每个渲染函数并断言。

跑法:  python3 tests/run_ui_tests.py
需要:  macOS 自带的 JavaScriptCore 解释器 jsc(见 JSC 常量);Linux 上换成 node 即可。

断言的是"诚实性契约"而不只是"不报错":
  · 原文自带 BACKGROUND/METHODS 标签的必须显示"原文标注",规则推断的必须显示"推断"
  · 跑题记录必须显示主题锚点告警,不能悄悄给个中等相关性
  · 没有 PMID / 不在抓取范围的记录,引用邻域必须给出文字解释而不是显示 0
  · 新颖度必须同时摊开三个分量 + 年份队列校正说明 + "不等于科学重要性"的告示
  · 句式库必须带"不要整句照抄"的警告
  · 每个筛选器都必须真的改变通过记录数(防止绑错 id 后静默失效)
"""
import json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JSC = "/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc"
ENGINE = JSC if os.path.exists(JSC) else "node"

def build():
    s = open(os.path.join(ROOT, "index.html")).read()
    blk = re.findall(r"<script[^>]*>(.*?)</script>", s, re.S)[-1]
    core = blk[: blk.rindex("loadData();")]          # 去掉引导调用,只留函数定义
    blob = json.load(open(os.path.join(ROOT, "data/papers.json")))
    cnet_p = os.path.join(ROOT, "data/citenet.json")
    cnet = json.load(open(cnet_p)) if os.path.exists(cnet_p) else {"net": {}, "foundational": [], "bridge_pairs": []}
    ints = json.load(open(os.path.join(ROOT, "data/interests.json")))
    fx = os.path.join(ROOT, "tests/_fixture.json")
    json.dump({"papers": blob["papers"], "names": [str(x.get("i")) for x in blob["papers"]],
               "meta": blob["meta"], "citenet": cnet, "interests": ints["interests"]},
              open(fx, "w"), ensure_ascii=False)
    harness = open(os.path.join(ROOT, "tests/harness.js")).read().replace("__FIXTURE__", fx)
    asserts = open(os.path.join(ROOT, "tests/assertions.js")).read()
    out = os.path.join(ROOT, "tests/_bundle.js")
    open(out, "w").write(harness + core + asserts)
    return out, len(blob["papers"])

def main():
    bundle, n = build()
    r = subprocess.run([ENGINE, bundle], capture_output=True, text=True)
    print(r.stdout.strip() or r.stderr.strip())
    ok = "ALL PASS" in r.stdout
    print(f"[{'PASS' if ok else 'FAIL'}] {n} 条真实记录 · engine={os.path.basename(ENGINE)}")
    sys.exit(0 if ok else 1)

if __name__ == "__main__":
    main()
