#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""run_pivot_parity.py — 网页端 Pivot 导入 必须与 scripts/import_pivot.py 完全一致。

为什么需要这个测试:
  网页面板给的是「导入后会变成什么样」的预览,GitHub Actions 里跑的却是
  Python 脚本。两边各写一份归国/去重/列名规则的话,漂移的表现是
  「网页说这条归英国、脚本归兜底」—— 页面不报错,数据悄悄不一致,
  没人会发现。所以两边共读 data/pivot_rules.json,并由本测试逐条比对。

比对三件事(同一批探针):
  1. guess_region / pvGuessRegion   —— 每个地区的关键词 + 对抗性近似词
  2. CSV 解析                        —— 与 Python 标准库 csv 比,不自写实现
  3. 列名映射                        —— 用「必须靠子串才能命中」的表头

依赖 node + jsdom。缺任何一个则跳过(退出码 0)并说明原因,
不把 CI 里的其它测试一起拖挂。
"""
import json, os, shutil, subprocess, sys, csv, io, importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
IDX = os.path.join(ROOT, "index.html")
RULES = os.path.join(ROOT, "data", "pivot_rules.json")
HARNESS = os.path.join(HERE, "pivot_parity.js")


def skip(msg):
    print(f"SKIP: {msg}")
    sys.exit(0)


if not shutil.which("node"):
    skip("找不到 node,跳过网页/脚本一致性比对")

# jsdom 得能被 harness 找到:优先用 tests/ 自己的 node_modules,
# 其次用 NODE_PATH 指过来的位置。
env = dict(os.environ)
# jsdom 可能装在 tests/、仓库根、或 NODE_PATH 指向的任意位置。
_cands = [p for p in (os.path.join(HERE, "node_modules"),
                      os.path.join(ROOT, "node_modules"),
                      env.get("NODE_PATH")) if p and os.path.isdir(p)]
if _cands:
    env["NODE_PATH"] = os.pathsep.join(_cands + ([env["NODE_PATH"]]
                                       if env.get("NODE_PATH") else []))
probe = subprocess.run(["node", "-e", "require('jsdom')"], capture_output=True,
                       text=True, cwd=HERE, env=env)
if probe.returncode != 0:
    skip("没装 jsdom(npm install jsdom),跳过一致性比对")

spec = importlib.util.spec_from_file_location(
    "import_pivot", os.path.join(ROOT, "scripts", "import_pivot.py"))
pv = importlib.util.module_from_spec(spec)
spec.loader.exec_module(pv)

rules = json.load(open(RULES, encoding="utf-8"))

# ---- 探针:每个地区的首个关键词 × 3 种写法 + 对抗性近似词 ----------------
funders = []
for _reg, kws in rules["region_rules"]:
    funders += [kws[0], kws[0].upper(), "The " + kws[0] + " Trust"]
funders += [
    "Council of Europe",      # 含 "arc"/"council",不该命中 ARC
    "Research Council",       # 含 "nci"? 不该命中 NCI
    "Flagstar Bank",          # 含 "a*star" 的字母但无边界
    "Searchlight Fund",
    "A*STAR", "a*star singapore",
    "Nciety of Odd Names",    # 以 nci 开头但不是整词
    "Unknown Local Charity",
    "国家自然科学基金委员会", "香港研究资助局 RGC",
    "", "NIH", "nih/nci", "Max-Planck-Gesellschaft",
]

CSV_TEXT = (
    'Opportunity Title (full),Sponsor Name,Application Deadline Date,'
    'Award Amount (USD),Sponsor Website URL,Discipline / Keywords\n'
    '"Early Career Award in RNA Biology",Wellcome Trust,2026-11-30,'
    '"£1,200,000",https://wellcome.org/ec-rna,Biology\n'
    '"Note, with ""quotes"" and, commas","A*STAR",2027-01-15,'
    '"S$500,000",https://astar.edu.sg/x,Bio\n'
    '"Multi\nline title",ERC,2026-10-15,"€1,500,000",https://erc.europa.eu/sg,LS\n'
)
# 表头刻意写成必须靠【子串】才能命中的形式:若哪天把列名匹配改成完全相等,
# 这个探针会当场变红。用刚好等于 COLMAP 里字面量的表头是测不出来的。
HEADERS = ["Opportunity Title (full)", "Sponsor Name", "Application Deadline Date",
           "Award Amount (USD)", "Sponsor Website URL", "Discipline / Keywords"]

probes_path = os.path.join(HERE, "_pivot_probes.json")
out_path = os.path.join(HERE, "_pivot_js.json")
EXISTING = [{"name": "Early Career Award in RNA Biology",
             "funder": "Wellcome Trust"}]   # 去重探针:两边都该跳过它
json.dump({"funders": funders, "csv_text": CSV_TEXT, "headers": HEADERS,
           "existing": EXISTING},
          open(probes_path, "w", encoding="utf-8"))

run = subprocess.run(["node", HARNESS, IDX, RULES, probes_path, out_path],
                     capture_output=True, text=True, cwd=HERE, env=env)
if run.returncode != 0:
    print("FAIL: harness 没跑起来\n" + (run.stdout or "") + (run.stderr or "")[-800:])
    sys.exit(1)

js = json.load(open(out_path, encoding="utf-8"))
if js.get("error"):
    print("FAIL: " + js["error"]); sys.exit(1)

fails = []

# 1) 归国 ---------------------------------------------------------------
py_regions = [pv.guess_region(f, "") for f in funders]
for f, p, j in zip(funders, py_regions, js["regions"]):
    if p != j:
        fails.append(f"归国不一致 {f!r}: py={p} js={j}")

# 2) CSV 解析:基准是 Python 标准库,不是我自己再写一遍 -------------------
py_rows = [r for r in csv.reader(io.StringIO(CSV_TEXT))
           if any(str(c).strip() for c in r)]
if [list(r) for r in py_rows] != js["csv"]:
    fails.append(f"CSV 解析不一致: py={py_rows} js={js['csv']}")

# 3) 端到端:同一份 CSV 走完整条流水线,比对真正写进 curated.json 的条目 ----
#    三个零件各自一致,不代表拼起来一致(去重键、字段默认值、来源文件名
#    都只在整条链路上才暴露)。这里让 import_pivot.main() 在临时目录里跑一遍。
import tempfile, datetime
_js_entries = js.get("entries")
if js.get("entries_error"):
    fails.append("网页端整条流水线没跑起来: " + js["entries_error"])
elif _js_entries is None:
    fails.append("harness 没返回 entries,端到端比对无效")
else:
    _tmp = tempfile.mkdtemp()
    _csv = os.path.join(_tmp, "probe.csv")          # 文件名要与 harness 一致
    open(_csv, "w", encoding="utf-8").write(CSV_TEXT)
    _cur = os.path.join(_tmp, "curated.json")
    json.dump({"grants": EXISTING, "count": len(EXISTING), "updated": ""},
              open(_cur, "w", encoding="utf-8"), ensure_ascii=False)
    _saved_cur, _saved_argv = pv.CURATED, sys.argv
    try:
        pv.CURATED = _cur
        sys.argv = ["import_pivot.py", _csv]
        pv.main()
        _py_entries = [g for g in json.load(open(_cur, encoding="utf-8"))["grants"]
                       if g.get("src_pivot") == "probe.csv"]
    finally:
        pv.CURATED, sys.argv = _saved_cur, _saved_argv
        shutil.rmtree(_tmp, ignore_errors=True)

    if len(_py_entries) != len(_js_entries):
        fails.append(f"端到端条数不一致: py={len(_py_entries)} js={len(_js_entries)} "
                     f"(py 名称={[e['name'] for e in _py_entries]}, "
                     f"js 名称={[e['name'] for e in _js_entries]})")
    else:
        if not _py_entries:
            fails.append("端到端探针没产出任何条目,这个比对是空的,无效")
        for a, b in zip(_py_entries, _js_entries):
            for k in sorted(set(a) | set(b)):
                if a.get(k) != b.get(k):
                    fails.append(f"端到端字段不一致 {a.get('name')!r}.{k}: "
                                 f"py={a.get(k)!r} js={b.get(k)!r}")

# 4) 列名映射 -----------------------------------------------------------
py_idx = pv.build_index(HEADERS)
if any(py_idx.get(k) is None for k in ("name", "funder", "deadline", "amount", "url")):
    fails.append(f"探针表头本身就没映射全,测试无效: {py_idx}")
if py_idx != js["idx"]:
    fails.append(f"列名映射不一致: py={py_idx} js={js['idx']}")

for p in (probes_path, out_path):
    try: os.remove(p)
    except OSError: pass

n = len(funders) + 3
if fails:
    print(f"FAIL {len(fails)}/{n}\n - " + "\n - ".join(fails))
    sys.exit(1)
print(f"PASS: 网页端与 import_pivot.py 一致 — {len(funders)} 个归国探针 · CSV 解析 · 列名映射 · 端到端 {len(_py_entries)} 条导入条目逐字段相同(含去重)")
