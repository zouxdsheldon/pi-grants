#!/usr/bin/env python3
"""
Fetch relevant federal funding opportunities from Grants.gov Search2 API
and write data/grants.json. Runs in GitHub Actions (has internet).
No API key required.
"""
import json, urllib.request, socket, time, datetime, os

socket.setdefaulttimeout(30)
API = "https://api.grants.gov/v1/api/search2"

# Keywords tuned to Xiaodong Zou's profile: RNA biology, decay, metabolism, disease models
KEYWORDS = [
    "microRNA", "RNA", "non-coding RNA", "RNA decay", "small RNA",
    "cancer", "diabetes", "metabolic", "fibrosis", "muscle",
    "career development", "Pathway to Independence", "epigenetic", "gene regulation",
]

HI  = ["microrna","mirna","non-coding","noncoding","rna decay","small rna","argonaute"]
MID = ["rna","metabol","diabet","fibrosis","ampk","muscle","cancer","epigen",
       "career development","pathway to independence","k99","gene regulation"]

def gg(body):
    req = urllib.request.Request(
        API, data=json.dumps(body).encode(), method="POST",
        headers={"Content-Type": "text/plain", "Accept": "application/json"})
    with urllib.request.urlopen(req) as r:
        return json.load(r)

def relevance(title):
    t = (title or "").lower()
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
    for kw in KEYWORDS:
        for status in ("posted", "forecasted"):
            try:
                r = gg({"rows": 100, "keyword": kw, "oppStatuses": status})
                for h in r.get("data", {}).get("oppHits", []):
                    seen[h["id"]] = h
            except Exception as e:
                print(f"WARN {kw}/{status}: {type(e).__name__} {e}")
            time.sleep(0.15)

    rows = []
    for h in seen.values():
        dl = days_left(h.get("closeDate"), today)
        if dl is not None and dl < 0:
            continue  # drop expired
        rows.append({
            "id": h["id"], "number": h.get("number"), "title": h.get("title"),
            "agency": h.get("agency") or h.get("agencyCode"),
            "openDate": h.get("openDate"), "closeDate": h.get("closeDate"),
            "status": h.get("oppStatus"), "days": dl,
            "cfda": ", ".join(h.get("cfdaList") or []),
            "rel": relevance(h.get("title")),
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
