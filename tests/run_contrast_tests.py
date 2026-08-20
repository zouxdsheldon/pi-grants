#!/usr/bin/env python3
"""按钮/标签文字对比度检查。

为什么要有这一条:.abtn 的默认字色是 #445(深灰)。给按钮只写
style="background:#37474F" 而不写 color 时,深灰字压在深色底上,
实测对比度 1.01 —— 1.0 就是与底色完全同色,按钮上的字等于隐形。
用户 2026-08-20 反馈"看不清"就是这个原因,当时 6 个按钮全中。

修法是 .abtn.solid(白字),这个脚本防止以后再写出只设 background 的按钮。

误报处理:类在 CSS 里已经声明了 color(如 .gobtn / .jlvl)的不算,
没有文字内容的纯色块(条形图)也不算 —— 否则天天报假警,很快就没人看。
"""
import re, sys, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
s = open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()

def lum(h):
    h = h.lstrip('#')
    if len(h) == 3: h = ''.join(c*2 for c in h)
    c = [int(h[i:i+2], 16)/255 for i in (0, 2, 4)]
    c = [(x/12.92 if x <= 0.03928 else ((x+0.055)/1.055)**2.4) for x in c]
    return 0.2126*c[0] + 0.7152*c[1] + 0.0722*c[2]

def cr(a, b):
    L = sorted([lum(a), lum(b)], reverse=True)
    return (L[0]+0.05) / (L[1]+0.05)

# 取每个「单类选择器」在 CSS 里声明的字色。
# 关键教训:不能因为「这个类声明了 color」就豁免 —— .abtn 声明的正是
# color:#445(深灰),而深灰压在深色底上恰恰是本次要抓的缺陷。
# 必须拿它实际声明的字色去算对比度。
# (第一版写成「声明了 color 就跳过」,负控注入完全没被抓到。)
cls_color = {}
for m in re.finditer(r'(?:^|[,}\s])\.([A-Za-z][\w-]*)\s*\{([^}]*)\}', s, re.M):
    cm = re.search(r'\bcolor\s*:\s*(#[0-9A-Fa-f]{3,6})', m.group(2))
    if cm:
        cls_color.setdefault(m.group(1), cm.group(1))
# 复合选择器 .abtn.solid{color:#fff} 单独记,只有同时带两个类才算
compound_color = {}
for m in re.finditer(r'(?:^|[,}\s])\.([A-Za-z][\w-]*)\.([A-Za-z][\w-]*)\s*\{([^}]*)\}', s, re.M):
    cm = re.search(r'\bcolor\s*:\s*(#[0-9A-Fa-f]{3,6})', m.group(3))
    if cm:
        compound_color[(m.group(1), m.group(2))] = cm.group(1)

pat = re.compile(
    r'[<](button|a|span)\b([^>]*?)style="([^"]*background:\s*(#[0-9A-Fa-f]{3,6})[^"]*)"([^>]*)[>]'
    r'([^<]*)')
fails = []
for m in pat.finditer(s):
    tag, pre, style, bg, post, inner = m.groups()
    attrs = pre + post
    if not inner.strip():            # 纯色块(条形图),没有文字
        continue
    cm = re.search(r'class="([^"]*)"', attrs)
    cls = cm.group(1).split() if cm else []

    # 该元素实际生效的字色:内联 > 复合类 > 单类 > 浏览器默认(按深色 #445 保守估)
    inline = re.search(r'\bcolor\s*:\s*(#[0-9A-Fa-f]{3,6})', style)
    if inline:
        fg = inline.group(1)
    else:
        fg = None
        for a in cls:
            for b in cls:
                if (a, b) in compound_color:
                    fg = compound_color[(a, b)]
        if fg is None:
            for c in cls:
                if c in cls_color:
                    fg = cls_color[c]; break
        if fg is None:
            fg = '#445'

    ratio = cr(bg, fg)
    if ratio < 4.5:
        line = s[:m.start()].count("\n") + 1
        fails.append(
            "第 %d 行 %s(class=%r)底色 %s + 字色 %s,对比度只有 %.2f"
            "(WCAG AA 要 4.5)。文字会糊在底色里 —— 彩底按钮请加 class=\"solid\" 用白字。"
            % (line, tag, " ".join(cls), bg, fg, ratio))

# .abtn.solid 规则本身必须在
if not re.search(r'\.abtn\.solid\s*\{[^}]*color\s*:\s*#fff', s):
    fails.append(".abtn.solid{color:#fff} 规则不见了 —— 所有彩色按钮会退回深灰字,重演看不清的问题")

for f in fails:
    print("  FAIL", f)
if fails:
    print("\n对比度检查失败"); sys.exit(1)
print("  ok   彩色按钮均有足够对比度(.abtn.solid 白字规则在位)")
print("\n对比度检查通过")
