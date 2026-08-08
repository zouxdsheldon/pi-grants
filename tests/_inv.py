"""一次性巡检:每个面板有哪些筛选控件、有没有用法说明。"""
import re, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
s = open(os.path.join(ROOT, "index.html")).read()

LT = chr(60)   # '<' —— 字面量避开 shell 对 <( 的语法误判
parts = re.split(r'(' + LT + r'div class="panel(?: active)?" id="[a-z]+">)', s)
rows = []
for i in range(1, len(parts), 2):
    pid = re.search(r'id="([a-z]+)"', parts[i]).group(1)
    body = parts[i + 1]
    ctrls = re.findall(LT + r'(?:input|select|textarea)[^>]*?id="([a-zA-Z0-9_]+)"', body)
    hints = sum(body.count(k) for k in ["怎么用", "用法", "示例", "例:", "例如"])
    rows.append((pid, len(body), hints, ctrls))

for pid, n, h, c in rows:
    print("%-10s len=%6d howto_hits=%2d controls=%s" % (pid, n, h, c))

print()
print("tabs:", re.findall(r'class="tab[^"]*" data-p="([a-z]+)"', s))
print("panels:", [r[0] for r in rows])
