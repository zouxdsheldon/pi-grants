#!/usr/bin/env python3
"""tests/run_portal_tests.py —— 门户首页 / 全局搜索 / 期刊查选 的离线行为测试

和 run_ui_tests.py 同一套路:把 index.html 最后一个 <script> 抽出来,
去掉 loadData() 引导调用,喂一个只提供被测接口的 DOM 桩,
然后用 data/*.json 的**全部真实记录**跑断言。

断言的是诚实性契约,不是"没抛异常"。契约清单见 assertions_portal.js 顶部。

跑法:  python3 tests/run_portal_tests.py
负控:  python3 tests/run_portal_tests.py --negative   (故意注入缺陷,每条都必须被抓到)
"""
import json, os, re, shutil, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JSC = "/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc"
ENGINE = JSC if os.path.exists(JSC) else "node"


def _norm_map(papers, journals):
    """复算所需的刊名归一化表。

    这里**直接 import build_journals.norm_journal**,而不是在测试里重写一份 ——
    重写会得到"两份规则各自自洽但互不相同"的假通过。测试要证明的是
    journals.json 的发文数能用生产代码从 papers.json 原地复算出来。
    """
    sys.path.insert(0, os.path.join(ROOT, "scripts"))
    from build_journals import norm_journal as nm
    out = {}
    for p in papers:
        j = p.get("journal") or ""
        if j:
            out[j] = nm(j)
    for r in journals:
        out[r["name"]] = nm(r["name"])
    return out



def _select_opts(html):
    """从 index.html 抽出每个 <select id=...> 的静态 option 列表。

    动态填充的下拉框(facetSel 写 innerHTML 的那些)这里会是空列表 ——
    桩在运行时会用 innerHTML 解析出真实选项覆盖它。
    """
    out = {}
    for m in re.finditer(r'<select id="([A-Za-z_][\w-]*)"[^>]*>(.*?)</select>', html, re.S):
        sid, body = m.group(1), m.group(2)
        opts = []
        for om in re.finditer(r'<option(?:\s+value="([^"]*)")?[^>]*>(.*?)</option>', body, re.S):
            val = om.group(1)
            txt = re.sub(r'<[^>]*>', '', om.group(2)).strip()
            opts.append({"value": val if val is not None else txt, "textContent": txt})
        out[sid] = opts
    return out


def build(html_path=None, fixture_path=None):
    html_path = html_path or os.path.join(ROOT, "index.html")
    s = open(html_path).read()
    blk = re.findall(r"<script[^>]*>(.*?)</script>", s, re.S)[-1]
    core = blk[: blk.rindex("loadData();")]           # 只留函数与常量定义

    def jload(name, default=None):
        p = os.path.join(ROOT, "data", name)
        if not os.path.exists(p):
            return default
        return json.load(open(p))

    papers_blob = jload("papers.json")
    jrn_blob = jload("journals.json", {"journals": [], "meta": {}})
    fx = {
        "live":      jload("grants.json", {}).get("grants", []),
        # curated.json 的顶层键也叫 grants(与 index.html 里 CURATED=c.grants 一致)
        "curated":   jload("curated.json", {}).get("grants", []),
        "jobs":      jload("jobs.json", {}).get("jobs", []),
        "changes":   jload("changes.json", {}).get("changes", []),
        "papers":    papers_blob["papers"],
        "papmeta":   papers_blob["meta"],
        "citenet":   jload("citenet.json", {"net": {}, "foundational": [], "bridge_pairs": []}),
        "interests": jload("interests.json")["interests"],
        "journals":  jrn_blob["journals"],
        "jmeta":     jrn_blob["meta"],
        "panel_ids": sorted(set(re.findall(r'class="panel(?: active)?" id="([a-z]+)"', s))),
        # 平台导航条里的站内目标(data-nav="…");跨站项是 href 外链,不在此列
        "nav_targets": re.findall(r'data-nav="([a-z]+)"', s),
        # 每个 <select> 静态写死的 option。桩用它来判断"某个值是否真的在选项里",
        # 否则示例按钮设不上值却看不出来。
        "opts": _select_opts(s),
        # 页面里真实存在的 id。桩用它来决定 getElementById 该不该返回 null。
        "ids": sorted(set(re.findall(r'id="([A-Za-z_][\w-]*)"', s))),
    }
    fx["norm"] = _norm_map(fx["papers"], fx["journals"])
    fp = fixture_path or os.path.join(ROOT, "tests/_fixture_portal.json")
    json.dump(fx, open(fp, "w"), ensure_ascii=False)

    harness = open(os.path.join(ROOT, "tests/harness_portal.js")).read().replace("__FIXTURE__", fp)
    asserts = open(os.path.join(ROOT, "tests/assertions_portal.js")).read()
    out = os.path.join(ROOT, "tests/_bundle_portal.js")
    open(out, "w").write(harness + core + asserts)
    return out, fx


def run(bundle):
    r = subprocess.run([ENGINE, bundle], capture_output=True, text=True)
    return r.stdout.strip() or r.stderr.strip()


# ---- 负控:每条都是"故意写坏一处",跑完必须报 FAIL。若通过 = 断言是摆设。 ----
NEGATIVES = [
    ("门户数字写死",
     'cnt:()=>LIVE.length,      u:"个机会"',
     'cnt:()=>9999,      u:"个机会"'),
    ("门户卡片指向不存在的面板",
     '{p:"journals", ic:"📖", nm:"期刊查选"',
     '{p:"nosuchpanel", ic:"📖", nm:"期刊查选"'),
    ("全局搜索退化成 OR",
     'for(var i=0;i<toks.length;i++){if(t.indexOf(toks[i])<0)return false;}\n  return true;',
     'for(var i=0;i<toks.length;i++){if(t.indexOf(toks[i])>=0)return true;}\n  return false;'),
    ("组标题显示截断后的条数",
     '<span class="cnt">\'+all.length+\'</span>',
     '<span class="cnt">\'+Math.min(all.length,5)+\'</span>'),
    ("无结果时不解释规则",
     '搜索是<b>子串 AND</b> 匹配',
     '搜索没有命中。'),
    ("样本不足的刊照样给百分比",
     "+'<td>'+(r.thin?thin:(r.oa_pct+\"%\"))+'</td>'",
     "+'<td>'+(r.oa_pct+\"%\")+'</td>'"),
    ("层级徽标丢失",
     '\'<span class="tierb t\'+r.tier+\'">\'+r.tier+\'</span>\'',
     "'<span>'+r.tier+'</span>'"),
    ("方向指纹空值不降级",
     "if(!fp||!Object.keys(fp).length)return '<span class=\"thin\">—</span>';",
     "if(false)return '';"),
    ("期刊筛选器绑错 id(静默失效)",
     'var dir=document.getElementById("jdir").value;',
     'var dir=document.getElementById("jdirTYPO").value;'),
    ("平台导航指向不存在的面板",
     '<a href="#" data-nav="journals">📖 选期刊</a>',
     '<a href="#" data-nav="journal">📖 选期刊</a>'),
    ("工具卡跳转到不存在的面板",
     '{p:"journals", ic:"📖", nm:"期刊查选"',
     '{p:"journalz", ic:"📖", nm:"期刊查选"'),
    ("goPanel 对未知 id 静默退回首页",
     'if(!btn)return;\n  btn.click();',
     'if(!btn){document.querySelector(\'.tab[data-p="hub"]\').click();return;}\n  btn.click();'),
    # ---- 内联帮助 / 芯片 / 空结果 / 金额 ----
    ("示例按钮设了个不存在的控件",
     '["lcareer","1"]]},',
     '["lcareerTYPO","1"]]},'),
    ("示例的命中数改成写死的",
     'var n=ok?countOf(pid):null;',
     'var n=42;'),
    ("芯片栏看不见侧栏那三个筛选",
     '  var V=VFILT[pid];',
     '  var V=null;'),
    ("清空筛选漏掉虚拟筛选(勾选残留)",
     '  if(V)V.list().forEach(function(v){ V.clear(v.id); });\n  CUR_PID=null; rerender(pid);',
     '  CUR_PID=null; rerender(pid);'),
    ("零结果只说\"无结果\",不解释是哪些条件",
     'function emptyHTML(pid,total){',
     'function emptyHTML(pid,total){ return \'<div class="nores">没有结果。</div>\';'),
    ("结果回来后不清空零结果解释框",
     'else if(NORES_IN[wrapId]){ w.innerHTML=""; NORES_IN[wrapId]=0; }',
     'else if(false){ w.innerHTML=""; }'),
    ("金额缺失时把占位符当金额印出去",
     'function amtTxt(g){ return amtMissing(g&&g.amount)?"未公布 · 见 NOFO":("$"+g.amount); }',
     'function amtTxt(g){ return "$"+g.amount; }'),
    ("金额排序键退回非数字",
     'function amtNum(g){\n  if(!g)return 0;',
     'function amtNum(g){\n  if(!g)return 0;\n  return g.amount;'),
    ("可信度筛选失效(未核实条目混进来)",
     'if(fv&&verifyKey(g)!==fv)return false;',
     'if(false&&verifyKey(g)!==fv)return false;'),
]


def negative_control():
    src = os.path.join(ROOT, "index.html")
    bak = os.path.join(ROOT, "tests/_idx.bak")
    shutil.copy(src, bak)
    orig = open(bak).read()
    caught = 0
    try:
        for name, old, new in NEGATIVES:
            if old not in orig:
                print("  [SKIP] %-28s (锚点已漂移,负控未生效)" % name)
                continue
            open(src, "w").write(orig.replace(old, new, 1))
            b, _ = build()
            out = run(b)
            ok = "ALL PASS" not in out
            caught += 1 if ok else 0
            first = ""
            for ln in out.splitlines():
                if ln.startswith("FAIL"):
                    first = ln[:110]
                    break
            print("  [%s] %-28s %s" % ("CAUGHT" if ok else "MISSED", name, first or out[:110]))
    finally:
        shutil.copy(bak, src)
        os.remove(bak)
    same = open(src).read() == orig
    print("  restored byte-identical:", same)
    total = sum(1 for n, o, _ in NEGATIVES if o in orig)
    print("负控: %d/%d 被抓到" % (caught, total))
    return caught == total and same


def main():
    if "--negative" in sys.argv:
        print("=== 负控(每条都必须被抓到)===")
        sys.exit(0 if negative_control() else 1)
    b, fx = build()
    out = run(b)
    print(out)
    ok = "ALL PASS" in out
    print("[%s] portal · panels=%d journals=%d papers=%d · engine=%s"
          % ("PASS" if ok else "FAIL", len(fx["panel_ids"]), len(fx["journals"]),
             len(fx["papers"]), os.path.basename(ENGINE)))
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
