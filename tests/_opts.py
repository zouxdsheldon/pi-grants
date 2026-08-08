"""打印每个 select 的可选值,供写示例时对照(避免示例设一个不存在的值)。"""
import re, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
s = open(os.path.join(ROOT, "index.html")).read()
LT = chr(60)
want = sys.argv[1:] or None
for m in re.finditer(LT + r'select id="([a-zA-Z0-9_]+)"[^>]*>(.*?)' + LT + r'/select>', s, re.S):
    sid, body = m.group(1), m.group(2)
    if want and sid not in want:
        continue
    opts = re.findall(r'value="([^"]*)"[^>]*>([^' + LT + r']*)', body)
    print("%-12s %s" % (sid, opts if opts else "(动态填充)"))
