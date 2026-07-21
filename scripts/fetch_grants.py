#!/usr/bin/env python3
"""
Fetch relevant federal funding opportunities from Grants.gov Search2 API
and write data/grants.json. Runs in GitHub Actions (has internet).
No API key required.
"""
import json, urllib.request, socket, time, datetime, os

socket.setdefaulttimeout(45)
API = "https://api.grants.gov/v1/api/search2"

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

    rows = []
    for h in seen.values():
        dl = days_left(h.get("closeDate"), today)
        if dl is not None and dl < 0:
            continue  # drop expired
        agency = h.get("agency") or h.get("agencyCode")
        rows.append({
            "id": h["id"], "number": h.get("number"), "title": h.get("title"),
            "agency": agency,
            "openDate": h.get("openDate"), "closeDate": h.get("closeDate"),
            "status": h.get("oppStatus"), "days": dl,
            "cfda": ", ".join(h.get("cfdaList") or []),
            "rel": relevance(h.get("title"), agency),
            "url": "https://www.grants.gov/search-results-detail/" + str(h["id"]),
        })
    relrank = {"高": 0, "中": 1, "低": 2}
    rows.sort(key=lambda r: (relrank[r["rel"]], r["days"] if r["days"] is not None else 9999))

    out = {
        "updated": today.isoformat(),
        "updated_utc": datetime.datetime.utcnow().isoformat() + "Z",
        "count": len(rows),
        "source": "Grants.gov Search2 API",
        "grants": rows,
    }
    os.makedirs("data", exist_ok=True)
    with open("data/grants.json", "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
    print(f"Wrote data/grants.json — {len(rows)} active opportunities on {today}")

if __name__ == "__main__":
    main()
