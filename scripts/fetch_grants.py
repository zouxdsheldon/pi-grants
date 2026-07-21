#!/usr/bin/env python3
"""
Fetch ALL active federal funding opportunities from Grants.gov, enrich each
with detail-endpoint fields (award amount, applicant types, eligibility text,
funding instrument), classify career/PI-relevance, and write data/grants.json.
Also diffs against the previous snapshot to produce data/changes.json
("What's New"). Runs daily in GitHub Actions (has internet). No API key.
"""
import json, urllib.request, socket, time, datetime, os, re

socket.setdefaulttimeout(45)
API = "https://api.grants.gov/v1/api/search2"
DETAIL = "https://api.grants.gov/v1/api/fetchOpportunity"

# --- classification vocab ---
CAREER = re.compile(r"(career|fellowship|k99|k01|k08|k22|k23|f32|f31|pathway to independence|"
                    r"early[- ]career|early[- ]stage|postdoc|mentored|training|diversity supplement|"
                    r"transition|new investigator|scholar)", re.I)
CIT_REQ = re.compile(r"(u\.?s\.?\s*citizen|united states citizen|citizens? of the united states|"
                     r"permanent resident|lawful permanent|green card)", re.I)

def _fund_type(title, category, instruments):
    t = (title or "").lower()
    if re.search(r"\bk99|pathway to independence|k01|k08|k22|k23|transition\b", t): return "转轨奖(K/独立)"
    if re.search(r"fellowship|f32|f31|postdoc|training|mentored", t): return "培训/Fellowship"
    if re.search(r"\br01|r21|r03|research project|investigator", t): return "研究项目(R类)"
    if re.search(r"equipment|instrument|shared", t): return "设备/仪器"
    if "cooperative" in " ".join(instruments).lower(): return "合作协议"
    return "其它"

# Fetch ALL active opportunities (not just the PI's direction). Relevance tags
# are still computed so the user can filter back to their field on demand.
HI  = ["microrna","mirna","non-coding","noncoding","rna decay","small rna","argonaute"]
MID = ["rna","metabol","diabet","fibrosis","ampk","muscle","cancer","epigen","organoid",
       "career development","pathway to independence","k99","gene regulation","genom","cell"]

def gg(body):
    req = urllib.request.Request(
        API, data=json.dumps(body).encode(), method="POST",
        headers={"Content-Type": "text/plain", "Accept": "application/json"})
    with urllib.request.urlopen(req) as r:
        return json.load(r)

def fetch_all(status, page=100):
    """Paginate through every opportunity of a given status."""
    out, start = [], 0
    while True:
        for attempt in range(3):
            try:
                r = gg({"rows": page, "keyword": "", "oppStatuses": status,
                        "startRecordNum": start})
                break
            except Exception as e:
                print(f"WARN {status}@{start} try{attempt}: {type(e).__name__} {e}")
                time.sleep(1.5)
        else:
            break
        d = r.get("data", {})
        hits = d.get("oppHits", [])
        total = d.get("hitCount", 0)
        out.extend(hits)
        start += page
        if start >= total or not hits:
            break
        time.sleep(0.2)
    return out

def relevance(title, agency):
    t = ((title or "") + " " + (agency or "")).lower()
    if any(k in t for k in HI):  return "高"
    if any(k in t for k in MID): return "中"
    return "低"

def fetch_detail(gid):
    """Return enrichment dict for one opportunity, or {} on failure."""
    for attempt in range(2):
        try:
            req = urllib.request.Request(
                DETAIL, data=json.dumps({"opportunityId": int(gid)}).encode(),
                method="POST", headers={"Content-Type": "text/plain", "Accept": "application/json"})
            with urllib.request.urlopen(req) as r:
                syn = json.load(r).get("data", {}).get("synopsis", {}) or {}
            elig = syn.get("applicantEligibilityDesc") or ""
            instr = [i.get("description", "") for i in (syn.get("fundingInstruments") or [])]
            return {
                "amount": syn.get("awardCeilingFormatted") or syn.get("awardCeiling"),
                "amount_num": syn.get("awardCeiling") or 0,
                "n_awards": syn.get("numberOfAwards"),
                "instr": instr,
                "cit_req": bool(CIT_REQ.search(elig)),
                "elig_txt": elig[:600],
            }
        except Exception:
            time.sleep(0.4)
    return {}

def days_left(mmddyyyy, today):
    if not mmddyyyy: return None
    try:
        m, d, y = mmddyyyy.split("/")
        return (datetime.date(int(y), int(m), int(d)) - today).days
    except Exception:
        return None

def main():
    today = datetime.date.today()
    seen = {}
    for status in ("posted", "forecasted"):
        for h in fetch_all(status):
            seen[h["id"]] = h
    print(f"Collected {len(seen)} unique opportunities across all statuses")

    # keep only non-expired first, so we only enrich what we'll show
    active = []
    for h in seen.values():
        dl = days_left(h.get("closeDate"), today)
        if dl is not None and dl < 0:
            continue  # drop expired
        active.append((h, dl))
    print(f"{len(active)} non-expired; enriching with detail endpoint...")

    rows = []
    for i, (h, dl) in enumerate(active):
        agency = h.get("agency") or h.get("agencyCode")
        det = fetch_detail(h["id"])
        instr = det.get("instr", [])
        rows.append({
            "id": h["id"], "number": h.get("number"), "title": h.get("title"),
            "agency": agency,
            "openDate": h.get("openDate"), "closeDate": h.get("closeDate"),
            "status": h.get("oppStatus"), "days": dl,
            "cfda": ", ".join(h.get("cfdaList") or []),
            "rel": relevance(h.get("title"), agency),
            "career": bool(CAREER.search(h.get("title") or "")),
            "ftype": _fund_type(h.get("title"), None, instr),
            "amount": det.get("amount"), "amount_num": det.get("amount_num", 0),
            "n_awards": det.get("n_awards"),
            "cit_req": det.get("cit_req", False),
            "url": "https://www.grants.gov/search-results-detail/" + str(h["id"]),
        })
        if (i + 1) % 200 == 0:
            print(f"  enriched {i+1}/{len(active)}")
        time.sleep(0.03)
    relrank = {"高": 0, "中": 1, "低": 2}
    rows.sort(key=lambda r: (relrank[r["rel"]], r["days"] if r["days"] is not None else 9999))

    # ---- diff against previous snapshot => data/changes.json ----
    os.makedirs("data", exist_ok=True)
    prev = {}
    try:
        with open("data/grants.json", encoding="utf-8") as f:
            for g in json.load(f).get("grants", []):
                prev[g["id"]] = g
    except Exception:
        pass
    changes = []
    now_ids = {r["id"] for r in rows}
    for r in rows:
        p = prev.get(r["id"])
        if p is None:
            changes.append({"id": r["id"], "title": r["title"], "agency": r["agency"],
                            "url": r["url"], "kind": "new", "detail": "新增机会"})
            continue
        diffs = []
        if (p.get("closeDate") or "") != (r.get("closeDate") or ""):
            diffs.append(f"截止 {p.get('closeDate') or '—'} → {r.get('closeDate') or '—'}")
        if (p.get("amount_num") or 0) != (r.get("amount_num") or 0):
            diffs.append(f"金额上限 {p.get('amount') or '—'} → {r.get('amount') or '—'}")
        if diffs:
            changes.append({"id": r["id"], "title": r["title"], "agency": r["agency"],
                            "url": r["url"], "kind": "updated", "detail": " · ".join(diffs)})
    # persist rolling change history (cap 200 newest)
    hist = []
    try:
        with open("data/changes.json", encoding="utf-8") as f:
            hist = json.load(f).get("changes", [])
    except Exception:
        pass
    stamp = today.isoformat()
    for c in changes:
        c["date"] = stamp
    hist = changes + [h for h in hist if h.get("id") not in now_ids or h.get("date") != stamp]
    hist = hist[:200]
    with open("data/changes.json", "w", encoding="utf-8") as f:
        json.dump({"updated": stamp, "count": len(hist), "changes": hist}, f,
                  ensure_ascii=False, indent=1)
    print(f"Wrote data/changes.json — {len(changes)} changes today, {len(hist)} in history")

    out = {
        "updated": today.isoformat(),
        "updated_utc": datetime.datetime.utcnow().isoformat() + "Z",
        "count": len(rows),
        "source": "Grants.gov Search2 API (+ detail enrichment)",
        "grants": rows,
    }
    with open("data/grants.json", "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
    print(f"Wrote data/grants.json — {len(rows)} active opportunities on {today}")

if __name__ == "__main__":
    main()
