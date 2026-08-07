#!/usr/bin/env python3
"""标签配平 + 脚本抽取 + id 引用检查。用法: python3 tests/validate_html.py [file]"""
import re, sys, os

fp = sys.argv[1] if len(sys.argv) > 1 else "index.html"
s = open(fp).read()
bad = 0
for tag in ["div", "pre", "details", "table", "thead", "tbody", "select", "nav", "tr", "td", "th"]:
    o = len(re.findall("<" + tag + "[ " + chr(62) + "]", s))
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
need = set(re.findall(r'getElementById\("([A-Za-z0-9_]+)"\)', sc[-1]))
miss = sorted(need - ids)
print("missing ids:", miss)
sys.exit(1 if (bad or miss) else 0)
