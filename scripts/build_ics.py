#!/usr/bin/env python3
"""Build data/grant_deadlines.ics from data/grants.json + data/curated.json.

Emits one VEVENT per eligible deadline (博后/早期 · 非美籍专属 · 未过窗口),
each with two DISPLAY alarms (-30d, -7d). Run after fetch_grants.py so the
subscription feed stays in sync with the daily data refresh.
"""
import json, re, hashlib, os
from datetime import date, datetime, timedelta

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data")
TODAY = date.today()


def is_mine(apply):
    apply = apply or []
    return "博后/早期" in apply or "不限身份" in apply


def fed_date(g):
    if g.get("closeDate"):
        m = re.match(r"(\d{2})/(\d{2})/(\d{4})", g["closeDate"])
        if m:
            return date(int(m[3]), int(m[1]), int(m[2]))  # YYYY, MM, DD
    if g.get("days") is not None:
        return TODAY + timedelta(days=g["days"])
    return None


def cur_months(t):
    if not t:
        return []
    if re.search(r"滚动|常开|按.*公告", t):
        return ["roll"]
    s = set(int(x) for x in re.findall(r"(\d{1,2})\s*月", t) if 1 <= int(x) <= 12)
    for w, mm in [("春", 4), ("夏", 7), ("秋", 10), ("冬", 1),
                  ("年底", 12), ("年中", 6), ("年初", 2)]:
        if w in t:
            s.add(mm)
    return sorted(s) if s else ["unk"]


def collect_events():
    live = json.load(open(f"{DATA}/grants.json", encoding="utf-8"))["grants"]
    cur = json.load(open(f"{DATA}/curated.json", encoding="utf-8"))["grants"]
    events = []
    for g in live:
        if not is_mine(g.get("apply")) or g.get("cit_req") is True:
            continue
        dt = fed_date(g)
        if not dt or not (TODAY.year <= dt.year <= TODAY.year + 1):
            continue
        events.append(dict(dt=dt, exact=bool(g.get("closeDate")), title=g.get("title"),
                           agency=g.get("agency"), region="US",
                           apply=" / ".join(g.get("apply", [])),
                           amount=g.get("amount") or "见官方", rel=g.get("rel") or "低",
                           url=g.get("url"), cycle=""))
    for c in cur:
        if not is_mine(c.get("apply")) or "❌" in (c.get("elig") or ""):
            continue
        if "United States" in (c.get("cite_req") or "") and "临时签证" not in (c.get("cite_req") or ""):
            continue
        ms = cur_months(c.get("deadline"))
        if ms and ms[0] in ("roll", "unk"):
            continue
        for mm in ms:
            for yr in (TODAY.year, TODAY.year + 1):
                dt = date(yr, mm, 15)
                if dt >= TODAY:
                    events.append(dict(dt=dt, exact=False, title=c.get("name"),
                                       agency=c.get("funder"), region=c.get("region"),
                                       apply=" / ".join(c.get("apply", [])),
                                       amount=c.get("amount") or "", rel=c.get("fit") or "中",
                                       url=c.get("url"), cycle=c.get("deadline")))
    events.sort(key=lambda e: e["dt"])
    return events


def esc(s):
    if s is None:
        return ""
    return str(s).replace("\\", "\\\\").replace(";", "\\;").replace(",", "\\,").replace("\n", "\\n")


def fold(line):
    b = line.encode("utf-8")
    out = []
    while len(b) > 73:
        cut = 73
        while (b[cut] & 0xC0) == 0x80:
            cut -= 1
        out.append(b[:cut])
        b = b" " + b[cut:]
    out.append(b)
    return b"\r\n".join(out)


def build():
    events = collect_events()
    now_stamp = datetime.utcnow().strftime("%Y%m%dT%H%M%SZ")
    y0, y1 = TODAY.year, TODAY.year + 1
    lines = ["BEGIN:VCALENDAR", "VERSION:2.0",
             "PRODID:-//Sheldon Zou//Grant Deadlines//CN", "CALSCALE:GREGORIAN",
             "METHOD:PUBLISH", f"X-WR-CALNAME:资助申请截止 {y0}-{y1}",
             "X-WR-TIMEZONE:America/New_York",
             "X-WR-CALDESC:可申请的资助截止日历(博后/早期·非美籍专属·未过窗口)·每日自动刷新"]
    relmark = {"高": "🟢", "中": "🟡", "低": "⚪"}
    for i, e in enumerate(events):
        d = e["dt"]
        dstr = d.strftime("%Y%m%d")
        dend = (d + timedelta(days=1)).strftime("%Y%m%d")
        uid = hashlib.md5(f"{e['title']}{dstr}{i}".encode()).hexdigest() + "@pi-grants"
        approx = "" if e["exact"] else "(约估·请核对官方受理日)"
        summ = f"{relmark.get(e['rel'], '⚪')} 截止:{e['title']}{approx}"
        desc = (f"资助方:{e.get('agency','')}\\n地区:{e.get('region','')}\\n"
                f"谁能申:{e.get('apply','')}\\n金额:{e.get('amount','')}\\n相关度:{e['rel']}")
        if not e["exact"]:
            desc += (f"\\n受理周期:{esc(e.get('cycle',''))}\\n"
                     "⚠️ 此日期为每年约X月的近似(取15日),投递前务必核对当年官方精确受理日。")
        if e.get("url"):
            desc += f"\\n官方链接:{e['url']}"
        ev = ["BEGIN:VEVENT", f"UID:{uid}", f"DTSTAMP:{now_stamp}",
              f"DTSTART;VALUE=DATE:{dstr}", f"DTEND;VALUE=DATE:{dend}",
              f"SUMMARY:{esc(summ)}", f"DESCRIPTION:{desc}",
              "TRANSP:TRANSPARENT", "CATEGORIES:GRANT DEADLINE"]
        if e.get("url"):
            ev.append(f"URL:{e['url']}")
        for days, txt in [(30, "还有30天截止"), (7, "还有7天截止!")]:
            ev += ["BEGIN:VALARM", "ACTION:DISPLAY", f"TRIGGER:-P{days}D",
                   f"DESCRIPTION:{esc(txt + ' — ' + (e['title'] or ''))}", "END:VALARM"]
        ev.append("END:VEVENT")
        lines += ev
    lines.append("END:VCALENDAR")
    raw = b"\r\n".join(fold(l) for l in lines) + b"\r\n"
    with open(f"{DATA}/grant_deadlines.ics", "wb") as f:
        f.write(raw)
    print(f"Wrote data/grant_deadlines.ics — {len(events)} events, {len(events)*2} alarms")


if __name__ == "__main__":
    build()
