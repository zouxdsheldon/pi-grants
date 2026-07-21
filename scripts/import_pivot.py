#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
import_pivot.py  —  把你从 Pivot-RP 导出的 CSV 并入网站精选层。

合法性设计(重要):
  - 只保留【事实字段】:项目名、资助方、截止日、金额、官方链接。
  - 不复制 Pivot 的编辑/AI 描述原文(那是 Clarivate 版权内容)。
    note 字段留空或放你自己写的一句话,由你在网站里补。
  - 因此并入公开网站的只是事实 + 指向官方页的链接,不构成对订阅内容的转发。

用法:
  1. 在 Pivot-RP 里勾选想要的机会 → Export(导出 CSV)。
  2. 把导出的文件放到  data/pivot_export.csv
  3. 运行:  python3 scripts/import_pivot.py data/pivot_export.csv
  4. 脚本会把条目写进 data/curated.json,region 标为「📥 我的 Pivot 精选」,
     网站的「各国 PI 资助」标签页会自动出现这个地区筛选钮。
  5. git commit + push,网站自动重新部署。

列名容错:Pivot 各机构导出表头略有差异,脚本对常见列名做模糊匹配,
并在最后打印映射报告;若某列没匹配上,按报告调整 COLMAP 即可。
"""
import csv, json, sys, os, re
from datetime import datetime

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
CURATED = os.path.join(ROOT, "data", "curated.json")
REGION = "📥 我的 Pivot 精选"

# 目标字段 -> 可能的 Pivot 导出列名(小写、去空格后匹配,子串命中即可)
COLMAP = {
    "name":     ["title", "opportunityname", "name", "grantname", "fundingopportunity"],
    "funder":   ["sponsor", "funder", "sponsorname", "agency", "organization"],
    "deadline": ["deadline", "duedate", "closedate", "applicationdeadline", "nextdeadline"],
    "amount":   ["amount", "award", "funding", "awardamount", "fundingamount"],
    "url":      ["url", "link", "sponsorurl", "moreinfo", "weblink", "opportunityurl"],
    "cat":      ["category", "type", "fundingtype", "keywords", "discipline"],
}

def norm(s): return re.sub(r"[^a-z0-9]", "", (s or "").lower())

def build_index(headers):
    idx = {}
    nheaders = {norm(h): h for h in headers}
    for tgt, cands in COLMAP.items():
        hit = None
        for c in cands:
            for nh, orig in nheaders.items():
                if c == nh or c in nh:
                    hit = orig; break
            if hit: break
        idx[tgt] = hit
    return idx

def load_rows(path):
    # 处理可能的 BOM 与编码
    for enc in ("utf-8-sig", "utf-8", "latin-1"):
        try:
            with open(path, newline="", encoding=enc) as f:
                rows = list(csv.DictReader(f))
            return rows
        except UnicodeDecodeError:
            continue
    raise SystemExit("无法解码 CSV,请另存为 UTF-8。")

def main():
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(0)
    path = sys.argv[1]
    rows = load_rows(path)
    if not rows:
        raise SystemExit("CSV 为空。")
    idx = build_index(rows[0].keys())
    print("列映射报告:")
    for tgt, col in idx.items():
        print(f"  {tgt:9s} <- {col if col else '⚠️ 未匹配(将留空)'}")
    if not idx["name"]:
        raise SystemExit("找不到『项目名』列,请把该列名加进 COLMAP['name'] 后重试。")

    cur = json.load(open(CURATED, encoding="utf-8"))
    existing = {(norm(g.get("name","")), norm(g.get("funder",""))) for g in cur["grants"]}

    added, skipped = 0, 0
    for r in rows:
        name   = (r.get(idx["name"]) or "").strip()
        funder = (r.get(idx["funder"]) or "").strip() if idx["funder"] else ""
        if not name:
            continue
        key = (norm(name), norm(funder))
        if key in existing:
            skipped += 1; continue
        entry = {
            "name": name,
            "funder": funder or "—",
            "region": REGION,
            "cat": "Pivot 导入",
            "deadline": (r.get(idx["deadline"]) or "").strip() if idx["deadline"] else "",
            "amount":   (r.get(idx["amount"]) or "").strip() if idx["amount"] else "",
            "url":      (r.get(idx["url"]) or "").strip() if idx["url"] else "",
            # 事实以外一律留空 / 由你自己填,不放 Pivot 版权描述
            "window": "",
            "cite_req": "见官方页(Pivot 结构化数据不含公民要求)",
            "elig": "⚠️",
            "fit": "中",
            "verify": "待核实(来自我的 Pivot 导出)",
            "cite": "来自我在 Pivot-RP 的检索/追踪清单;详情以官方页为准。",
            "note": "",   # ← 想加备注请用你自己的话
        }
        cur["grants"].append(entry)
        existing.add(key); added += 1

    cur["updated"] = datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC")
    json.dump(cur, open(CURATED, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"\n完成:新增 {added} 条,跳过重复 {skipped} 条。")
    print(f"curated.json 现有 {len(cur['grants'])} 条。")
    print("下一步:git add -A && git commit && git push,网站自动重新部署。")

if __name__ == "__main__":
    main()
