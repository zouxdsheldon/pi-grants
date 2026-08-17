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
# 目标字段 -> 可能的 Pivot 导出列名(小写、去空格后匹配,子串命中即可)
_RULES_PATH = os.path.join(HERE, "..", "data", "pivot_rules.json")
try:
    _RULES = json.load(open(_RULES_PATH, encoding="utf-8"))
    COLMAP = _RULES["colmap"]
    FALLBACK_REGION = _RULES["fallback_region"]
    REGION_RULES = [(r, kws) for r, kws in _RULES["region_rules"]]
except Exception as _e:                      # 规则文件是单一数据源,缺失就必须炸,
    raise SystemExit(                         # 不能悄悄退回内置副本 —— 那样网页端和
        f"读不到导入规则 {_RULES_PATH}: {_e}\n"   # 脚本端会各跑各的规则而无人察觉。
        "该文件由网页导入面板与本脚本共用,请从仓库恢复。")

def norm(s): return re.sub(r"[^a-z0-9]", "", (s or "").lower())

def guess_region(funder, name=""):
    """按资助方名(辅以项目名)猜测国家/地区;猜不中返回兜底。

    匹配规则:
      - 短缩写(norm 后 ≤5 字符,如 nci/nsf/erc/arc/mrc)按【整词】匹配,
        避免命中 cou(nci)l、rese(arc)h 之类的子串误判;
      - 长短语(≥6 字符)用子串匹配,容忍机构名里的多余词;
      - 中文关键词 norm 后为空,用原始小写串匹配。
    """
    raw = ((funder or "") + " " + (name or "")).lower()
    tokens = set(re.findall(r"[a-z0-9]+", raw))          # 整词集合
    hay = norm(funder) + " " + norm(name)                # 去符号长串(子串用)
    for region, kws in REGION_RULES:
        for kw in kws:
            k = norm(kw)
            if not k:                                    # 中文关键词
                if kw in raw:
                    return region
                continue
            if len(k) <= 5:                              # 短缩写 → 整词
                # 整词集合按 [a-z0-9]+ 切分,含标点的缩写(a*star)永远切不出
                # 对应 token,所以再用「非字母数字包围」的原串匹配兜一次。
                # 这仍然挡得住 cou(nci)l / rese(arc)h 这类子串误判。
                if k in tokens:
                    return region
                if not kw.isalnum() and re.search(
                        r"(?<![a-z0-9])" + re.escape(kw.lower()) + r"(?![a-z0-9])", raw):
                    return region
            else:                                        # 长短语 → 子串
                if k in hay:
                    return region
    return FALLBACK_REGION

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

def iter_csv_paths(args):
    """展开命令行参数:文件直接用,目录取其中所有 .csv(排序保证可复现)。"""
    out = []
    for a in args:
        if os.path.isdir(a):
            out += [os.path.join(a, f) for f in sorted(os.listdir(a))
                    if f.lower().endswith(".csv")]
        else:
            out.append(a)
    return out


def main():
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(0)
    consume = "--consume" in sys.argv[1:]          # 收件箱模式:导入后删掉已消费的 CSV
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    paths = iter_csv_paths(args)
    if not paths:
        print("没有找到任何 CSV(收件箱为空也算正常),不做改动。")
        return

    cur = json.load(open(CURATED, encoding="utf-8"))
    existing = {(norm(g.get("name", "")), norm(g.get("funder", "")))
                for g in cur["grants"]}
    before = len(cur["grants"])

    from collections import Counter
    region_tally = Counter()
    added = skipped = 0
    consumed = []

    for path in paths:
        rows = load_rows(path)
        if not rows:
            print(f"⚠️ {os.path.basename(path)}:空文件,跳过。")
            continue
        idx = build_index(rows[0].keys())
        print(f"\n=== {os.path.basename(path)} ({len(rows)} 行) 列映射 ===")
        for tgt, col in idx.items():
            print(f"  {tgt:9s} <- {col if col else '⚠️ 未匹配(将留空)'}")
        if not idx["name"]:
            print(f"  ❌ 找不到『项目名』列,跳过此文件。"
                  f"请把该列名加进 data/pivot_rules.json 的 colmap.name。")
            continue

        for r in rows:
            name = (r.get(idx["name"]) or "").strip()
            funder = (r.get(idx["funder"]) or "").strip() if idx["funder"] else ""
            if not name:
                continue
            key = (norm(name), norm(funder))
            if key in existing:
                skipped += 1; continue
            region = guess_region(funder, name)
            cur["grants"].append({
                "name": name,
                "funder": funder or "—",
                "region": region,
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
                "note": "",
                "src_pivot": os.path.basename(path),
            })
            existing.add(key); added += 1; region_tally[region] += 1
        consumed.append(path)

    if added == 0:
        print(f"\n没有新增条目(重复 {skipped} 条),curated.json 未改动。")
    else:
        cur["updated"] = datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC")
        cur["count"] = len(cur["grants"])
        json.dump(cur, open(CURATED, "w", encoding="utf-8"),
                  ensure_ascii=False, indent=1)
        print(f"\n完成:新增 {added} 条,跳过重复 {skipped} 条。"
              f"curated.json {before} → {len(cur['grants'])} 条。")
        print("自动归国结果:")
        for reg, n in region_tally.most_common():
            tag = ("  (← 未识别资助方,已放兜底;可在 data/pivot_rules.json 补关键词)"
                   if reg == FALLBACK_REGION else "")
            print(f"  {reg}: {n}{tag}")

    if consume:
        for p in consumed:
            os.remove(p); print(f"已消费并删除:{p}")


if __name__ == "__main__":
    main()
