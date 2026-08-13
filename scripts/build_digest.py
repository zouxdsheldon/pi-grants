#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_digest.py — 由 data/papers.json 生成:
  1. data/digest.json   每日摘要数据(面板与 digest.html 共用)
  2. digest.html        独立的「每日文献摘要」静态页(可直接分享/打印)
  3. feed.xml           RSS 2.0(可加进任意 RSS 阅读器,替代邮件推送)

为什么不做邮件推送:发邮件需要 SMTP 凭据(用户名/密码或 API key),
放进公开仓库不安全;RSS 达到同样效果且零凭据。
"""
import json, os, re, datetime, html, xml.sax.saxutils as sx

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
DATA = os.path.join(ROOT, "data")
def _cfg():
    fp = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data", "config.json")
    try:
        return json.load(open(fp))
    except Exception:
        return {}

def _site_url(cfg):
    """站点地址：config.site_url 优先；否则从 GitHub Actions 环境推出 Pages 地址。"""
    u = (cfg.get("site_url") or "").rstrip("/")
    if u:
        return u
    repo = os.environ.get("GITHUB_REPOSITORY", "")      # "owner/name"
    if "/" in repo:
        owner, name = repo.split("/", 1)
        if name.lower() == owner.lower() + ".github.io":
            return "https://%s.github.io" % owner
        return "https://%s.github.io/%s" % (owner, name)
    return ""

CFG = _cfg()
SITE = _site_url(CFG)
SITE_TITLE = CFG.get("site_title", "科研罗盘 · Lab Compass").strip()
FEED_TITLE = (CFG.get("owner_display") or SITE_TITLE) + " · 文献追踪"
TODAY = datetime.date.today()

TIERLAB = {"T1": "顶刊层级", "T2": "一流专业刊", "T3": "本领域主力刊",
           "T4": "其它", "preprint": "预印本"}
SRCLAB = {"pubmed": "PubMed", "epmc": "Europe PMC", "epmc_ppr": "Europe PMC 预印本",
          "biorxiv": "bioRxiv", "arxiv": "arXiv", "crossref": "Crossref"}


def load():
    fp = os.path.join(DATA, "papers.json")
    if not os.path.exists(fp):
        raise SystemExit("data/papers.json 不存在 —— 先跑 scripts/fetch_papers.py")
    d = json.load(open(fp))
    return d["papers"], d["meta"], json.load(open(os.path.join(DATA, "interests.json")))


def is_new(p, days=1):
    """当日新增判定:以数据库首次发表日期落在窗口内为准(而非抓取日)。"""
    d = p.get("date") or ""
    if len(d) < 10:
        return False
    try:
        dt = datetime.date.fromisoformat(d[:10])
    except ValueError:
        return False
    return (TODAY - dt).days <= days


def build(papers, meta, cfg):
    imap = {i["id"]: i for i in cfg["interests"]}
    # 摘要口径:近 7 天发表 + 相关性 ≥ medium,按分排序
    recent = [p for p in papers if is_new(p, 7) and p["band"] in ("high", "medium")]
    recent.sort(key=lambda p: -p["score"])
    hot = [p for p in papers if "hotspot" in p["tags"]][:12]
    gap = [p for p in papers if "gap" in p["tags"]][:12]
    que = [p for p in papers if "question" in p["tags"]][:12]

    by_dir = {}
    for p in papers:
        if p["band"] in ("high", "medium"):
            by_dir.setdefault(p.get("top_dir") or "?", []).append(p)

    dig = {
        "date": TODAY.isoformat(),
        "updated": meta.get("updated"),
        "n_total": meta.get("n"),
        "n_recent7": len(recent),
        "snapshot_days": meta.get("snapshot_days", 0),
        "by_band": meta.get("by_band", {}),
        "by_tag": meta.get("by_tag", {}),
        "by_src": meta.get("by_src", {}),
        "recent": [slim(p, imap) for p in recent[:40]],
        "hotspot": [slim(p, imap) for p in hot],
        "gap": [slim(p, imap) for p in gap],
        "question": [slim(p, imap) for p in que],
        "by_dir_counts": {k: len(v) for k, v in sorted(by_dir.items(), key=lambda kv: -len(kv[1]))},
    }
    json.dump(dig, open(os.path.join(DATA, "digest.json"), "w"),
              ensure_ascii=False, separators=(",", ":"))
    return dig, imap


def slim(p, imap):
    ev = p.get("evidence") or {}
    return {
        "title": p["title"], "journal": p.get("journal", ""), "date": p.get("date", ""),
        "authors": (p.get("authors") or [])[:5], "doi": p.get("doi", ""), "pmid": p.get("pmid", ""),
        "url": p.get("url", ""), "score": p["score"], "band": p["band"],
        "tier": p.get("tier"), "is_oa": p.get("is_oa"), "cites": p.get("cites"),
        "cite_rate": p.get("cite_rate"), "cite_accel": p.get("cite_accel"),
        "tags": p.get("tags", []), "src": p.get("src", []),
        "dir_name": (imap.get(p.get("top_dir")) or {}).get("name", ""),
        "dir_color": (imap.get(p.get("top_dir")) or {}).get("color", "#666"),
        "gap": (ev.get("gap") or [None])[0],
        "question": (ev.get("question") or [None])[0],
        "limitation": (ev.get("limitation") or [None])[0],
        "hotspot": ev.get("hotspot"),
    }


# ---------------------------------------------------------------- digest.html
def esc(x):
    return html.escape(str(x or ""), quote=True)


def card(p):
    link = p["url"] or (("https://doi.org/" + p["doi"]) if p["doi"] else "#")
    tags = "".join(
        f'<span class="t {t}">{ {"hotspot":"🔥 Hotspot","gap":"🕳️ Gap","question":"❓ Question","limitation":"⚠️ 局限"}.get(t, t)}</span>'
        for t in p["tags"] if t in ("hotspot", "gap", "question", "limitation"))
    oa = '<span class="t oa">🔓 OA</span>' if p["is_oa"] else ""
    tier = f'<span class="t tier" title="期刊层级代理,非 JCR 影响因子">{esc(p["tier"])} {TIERLAB.get(p["tier"],"")}</span>' if p["tier"] else ""
    cit = ""
    if p["cites"] is not None:
        cit = f' · 被引 <b>{p["cites"]}</b>'
        if p["cite_rate"]:
            cit += f'({p["cite_rate"]}/月)'
    ev = []
    if p["gap"]:
        ev.append(f'<div class="ev"><b>🕳️ Gap 原句:</b>“{esc(p["gap"])}”</div>')
    if p["question"]:
        ev.append(f'<div class="ev"><b>❓ 作者提出的问题:</b>“{esc(p["question"])}”</div>')
    if p["limitation"]:
        ev.append(f'<div class="ev"><b>⚠️ 作者自述局限:</b>“{esc(p["limitation"])}”</div>')
    if p["hotspot"]:
        h = p["hotspot"]
        acc = f'引用加速度 {h["accel"]}/月' if h.get("accel") is not None else "引用加速度:快照天数不足,暂不计算"
        ev.append(f'<div class="ev"><b>🔥 Hotspot 依据:</b>被引 {h.get("cites")} 次 · '
                  f'{h.get("cite_rate")}/月 · 发表 {h.get("age_days")} 天前 · {acc}</div>')
    srcs = " · ".join(SRCLAB.get(x, x) for x in p["src"])
    return f'''<div class="c">
  <div class="ti"><a href="{esc(link)}" target="_blank" rel="noopener">{esc(p["title"])}</a></div>
  <div class="m"><span class="sc">相关性 {p["score"]:.2f}</span> {tags}{oa}{tier}
    <br>{esc(p["journal"])} · {esc(p["date"])}{cit}
    <br>{esc(", ".join(p["authors"]))}
    <br><span class="dim">来源:{esc(srcs)}</span>
    <span class="pill" style="background:{esc(p["dir_color"])}">{esc(p["dir_name"])}</span></div>
  {"".join(ev)}
</div>'''


def section(title, note, items):
    if not items:
        return f'<h2>{esc(title)}</h2><p class="dim">今日无。</p>'
    return (f'<h2>{esc(title)} <span class="n">{len(items)}</span></h2>'
            f'<p class="note">{note}</p>' + "".join(card(p) for p in items))


def build_html(dig):
    bb = dig["by_band"]
    snap = dig["snapshot_days"]
    snapnote = (f'引用快照已积累 <b>{snap}</b> 天 —— 满 7 天后 Hotspot 才会显示真实引用加速度;'
                f'当前用「引用速率 + 发表新近度 + 预印本被接收」这三项<b>当日可核验</b>的信号代替。'
                if snap < 7 else
                f'引用快照已积累 <b>{snap}</b> 天,Hotspot 已包含真实引用加速度(本期新增引用 ÷ 间隔月数)。')
    return f'''<!doctype html>
<html lang="zh-CN"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>每日文献摘要 · {dig["date"]} · {html.escape(SITE_TITLE)}</title>
<style>
:root{{--pp:#4A148C;--bl:#0D47A1}}
*{{box-sizing:border-box}}
body{{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;
  max-width:900px;margin:0 auto;padding:22px 18px 60px;color:#222;line-height:1.62;background:#FAFBFD}}
h1{{color:var(--pp);font-size:23px;margin:0 0 4px}}
h2{{color:var(--bl);font-size:17px;margin:26px 0 6px;border-bottom:2px solid #E8EDF5;padding-bottom:5px}}
.n{{font-size:12px;background:#EDE7F6;color:var(--pp);padding:1px 8px;border-radius:10px;vertical-align:middle}}
.sub{{color:#66707E;font-size:12.6px;margin:0 0 14px}}
.kpi{{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 6px}}
.kpi div{{background:#fff;border:1px solid #E3E9F2;border-radius:9px;padding:8px 13px;font-size:12.6px}}
.kpi b{{display:block;font-size:19px;color:var(--pp)}}
.warn{{background:#FFFBEC;border:1px solid #F0D38A;border-radius:8px;padding:10px 13px;
  font-size:12.4px;color:#7A5A00;margin:12px 0}}
.note{{font-size:12.2px;color:#66707E;margin:2px 0 10px}}
.c{{background:#fff;border:1px solid #E3E9F2;border-left:3px solid var(--pp);border-radius:9px;
  padding:11px 14px;margin:9px 0}}
.ti a{{color:#123;text-decoration:none;font-weight:640;font-size:14.4px}}
.ti a:hover{{color:var(--pp);text-decoration:underline}}
.m{{font-size:12.3px;color:#4A5566;margin-top:5px}}
.dim{{color:#8892A4}}
.sc{{background:#EDE7F6;color:var(--pp);font-weight:700;padding:1px 8px;border-radius:9px;font-size:11.6px}}
.t{{display:inline-block;font-size:11px;padding:1px 7px;border-radius:9px;margin-left:4px;
  background:#F0F3F8;color:#48525F;border:1px solid #DDE4EE}}
.t.hotspot{{background:#FFEFE6;color:#B33B00;border-color:#F5C6A8}}
.t.gap{{background:#EAF7EE;color:#12652F;border-color:#B9E0C6}}
.t.question{{background:#EEF0FF;color:#2A2F92;border-color:#C3C9F5}}
.t.limitation{{background:#FFF6E5;color:#8A5A00;border-color:#EFD9A6}}
.t.oa{{background:#E7F6F0;color:#0A6B4E;border-color:#B4E2D0}}
.t.tier{{background:#F5EEFF;color:#5B2A9E;border-color:#DCC9F5}}
.pill{{display:inline-block;font-size:10.6px;font-weight:600;padding:2px 8px;border-radius:11px;
  color:#fff;margin-left:5px}}
.ev{{background:#F7F9FC;border-left:2px solid #C9D4E6;padding:6px 10px;margin:6px 0 0;
  font-size:12.1px;color:#3B4553;border-radius:0 5px 5px 0}}
a.back{{display:inline-block;margin-top:26px;font-size:13px;color:var(--bl)}}
footer{{margin-top:34px;font-size:11.6px;color:#8892A4;border-top:1px solid #E3E9F2;padding-top:12px}}
</style></head><body>
<h1>📚 每日文献摘要 · {dig["date"]}</h1>
<p class="sub">数据更新:{esc(dig["updated"])} · 六源抓取(PubMed / Europe PMC / Europe PMC 预印本 / bioRxiv / arXiv / Crossref)
· 去重后共 <b>{dig["n_total"]}</b> 篇在库 · <a href="feed.xml">RSS 订阅</a> · <a href="./">返回主站</a></p>

<div class="kpi">
  <div><b>{dig["n_recent7"]}</b>近 7 天新发(高/中相关)</div>
  <div><b>{bb.get("high",0)}</b>高相关</div>
  <div><b>{bb.get("medium",0)}</b>中相关</div>
  <div><b>{dig["by_tag"].get("hotspot",0)}</b>🔥 Hotspot</div>
  <div><b>{dig["by_tag"].get("gap",0)}</b>🕳️ Gap</div>
  <div><b>{dig["by_tag"].get("question",0)}</b>❓ Question</div>
</div>

<div class="warn"><b>诚实说明:</b>{snapnote}
「T1–T4 期刊层级」是本站<b>自建的公开刊名分层代理</b>,<b>不是</b> JCR 影响因子(Clarivate 版权数据,无免费接口)。
Gap / Question / 局限 三类标记是<b>原文句子的正则抽取</b>,不是模型改写 —— 每条都附原句供你核对。</div>

{section("近 7 天新发", "按相关性排序,只列高/中相关。相关性算法与权重全部公开在 README。", dig["recent"])}
{section("🔥 Hotspot", "同当日可核验信号:引用速率、发表新近度、预印本是否已被期刊接收。", dig["hotspot"])}
{section("🕳️ Gap(作者自己写的空白)", "从摘要中正则抽取「仍不清楚 / 尚未阐明 / 缺乏证据」类句子 —— 这些是可直接写进 Significance 段的现成缺口。", dig["gap"])}
{section("❓ Question(作者提出的开放问题)", "可直接改写成你的 Specific Aims 假设句。", dig["question"])}

<a class="back" href="./">← 返回 PI 资助与文献追踪主站</a>
<footer>本页由 scripts/build_digest.py 自动生成,数据源与算法见仓库 README。
个人标签、笔记、收藏保存在浏览器本地(localStorage),不上传服务器。</footer>
</body></html>'''


# ---------------------------------------------------------------- feed.xml
def build_rss(dig):
    items = []
    seen = set()
    for grp, lab in (("recent", "近 7 天新发"), ("hotspot", "🔥 Hotspot"),
                     ("gap", "🕳️ Gap"), ("question", "❓ Question")):
        for p in dig[grp]:
            k = p["doi"] or p["pmid"] or p["title"]
            if k in seen:
                continue
            seen.add(k)
            link = p["url"] or (("https://doi.org/" + p["doi"]) if p["doi"] else SITE)
            desc = [f'相关性 {p["score"]:.2f} · {p["band"]} · {p["dir_name"]}',
                    f'{p["journal"]} · {p["date"]}']
            if p["cites"] is not None:
                desc.append(f'被引 {p["cites"]}({p["cite_rate"]}/月)')
            if p["gap"]:
                desc.append(f'🕳️ Gap 原句:“{p["gap"]}”')
            if p["question"]:
                desc.append(f'❓ 作者提出的问题:“{p["question"]}”')
            if p["limitation"]:
                desc.append(f'⚠️ 作者自述局限:“{p["limitation"]}”')
            try:
                dt = datetime.datetime.fromisoformat((p["date"] or TODAY.isoformat())[:10])
            except ValueError:
                dt = datetime.datetime.now()
            items.append(f'''  <item>
    <title>[{lab}] {sx.escape(p["title"])}</title>
    <link>{sx.escape(link)}</link>
    <guid isPermaLink="false">{sx.escape(k)}</guid>
    <pubDate>{dt.strftime("%a, %d %b %Y 08:00:00 +0000")}</pubDate>
    <category>{sx.escape(p["dir_name"] or "未分类")}</category>
    <description>{sx.escape(" | ".join(desc))}</description>
  </item>''')
            if len(items) >= 60:
                break
    now = datetime.datetime.utcnow().strftime("%a, %d %b %Y %H:%M:%S +0000")
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>{sx.escape(FEED_TITLE)}</title>
  <link>{SITE}/digest.html</link>
  <description>按 data/interests.json 里配置的研究方向 × 六个数据源,每日自动抓取、去重、透明打分,并标注 Hotspot / Gap / Question。</description>
  <language>zh-cn</language>
  <lastBuildDate>{now}</lastBuildDate>
  <generator>scripts/build_digest.py</generator>
{chr(10).join(items)}
</channel></rss>'''


def main():
    papers, meta, cfg = load()
    dig, imap = build(papers, meta, cfg)
    open(os.path.join(ROOT, "digest.html"), "w").write(build_html(dig))
    open(os.path.join(ROOT, "feed.xml"), "w").write(build_rss(dig))
    print(json.dumps({"date": dig["date"], "n_total": dig["n_total"],
                      "recent7": dig["n_recent7"], "hotspot": len(dig["hotspot"]),
                      "gap": len(dig["gap"]), "question": len(dig["question"]),
                      "snapshot_days": dig["snapshot_days"]}, ensure_ascii=False))


if __name__ == "__main__":
    main()
