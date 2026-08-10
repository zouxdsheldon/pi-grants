#!/usr/bin/env python3
"""标签配平 + 脚本抽取 + id 引用检查。用法: python3 tests/validate_html.py [file]"""
import re, sys, os

fp = sys.argv[1] if len(sys.argv) > 1 else "index.html"
s = open(fp).read()
bad = 0
for tag in ["div", "pre", "details", "table", "thead", "tbody", "select", "nav", "tr", "td", "th"]:
    # 开标签后面可能不是空格/'>',而是 JS 字符串拼接的引号:
    #   h+='<tr'+(cond?' class="hi"':'')+'>'
    # 老的 "<tag[ >]" 会漏数这些,导致假的 MISMATCH(2026-08 查出 tr 314/317)。
    # 用"标签名后不接名字字符"来判断,既覆盖 <tr>、<tr 、也覆盖 <tr'。
    o = len(re.findall("<" + tag + r"(?![A-Za-z0-9-])", s))
    c = s.count("</" + tag + chr(62))
    ok = "OK" if o == c else "MISMATCH"
    if o != c: bad += 1
    print(tag, o, c, ok)

pat = "<script" + chr(62) + "(.*?)</script" + chr(62)
sc = re.findall(pat, s, re.S)
print("scripts", len(sc), "last len", len(sc[-1]))
out = os.path.join("/tmp", os.path.basename(fp) + ".js")
open(out, "w").write(sc[-1])
print("wrote", out)

ids = set(re.findall(r'id="([A-Za-z0-9_]+)"', s))
# 侧栏计数 id 由 renderSideNav() 在运行时生成,来源是 SIDE_NAV 字面量(不写死白名单)
_sn = re.search(r"var SIDE_NAV\s*=\s*\[(.*?)\n\];", s, re.S)
if _sn:
    ids |= set(re.findall(r'\bn:\s*"(\w+)"', _sn.group(1)))
need = set(re.findall(r'getElementById\("([A-Za-z0-9_]+)"\)', sc[-1]))
miss = sorted(need - ids)
print("missing ids:", miss)

# ---- 导航可达性 ----------------------------------------------------------
# 2026-08 真实故障:四个实验工具面板的 markup、引擎、断言全都在,唯独没有
# 对应的 <button class="tab" data-p="..."> —— 而侧栏 onclick 和 goPanel() 都是
# forward 到 .tab[data-p]。按钮不存在 => querySelector 返回 null => 静默 return,
# 点了毫无反应,面板永远打不开。JS 断言测不出来:harness 的 querySelectorAll
# 是返回 [] 的桩,导航路径在假 DOM 里根本跑不起来。所以放在静态检查里。
nav_bad = []
if _sn:
    panels = set(re.findall(r'<div class="panel[^"]*" id="([A-Za-z0-9_]+)"', s))
    tabs = set(re.findall(r'class="tab[^"]*" data-p="([A-Za-z0-9_]+)"', s))
    for pid in re.findall(r'\bp:\s*"(\w+)"', _sn.group(1)):
        if pid not in panels:
            nav_bad.append(pid + "(无 panel div)")
        elif pid not in tabs:
            nav_bad.append(pid + "(无 .tab[data-p] 按钮,点击会静默失败)")
print("nav unreachable:", nav_bad)

sys.exit(1 if (bad or miss or nav_bad) else 0)
