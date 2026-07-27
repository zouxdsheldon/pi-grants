#!/usr/bin/env python3
"""Fetch academic life-sciences faculty / postdoc positions for the PI-grants site.

Runs on GitHub Actions (unrestricted internet). Pulls jobRxiv (a free, academic,
preprint-community job board with an RSS/job_feed endpoint) across several
faculty/PI keyword queries, de-duplicates, keeps faculty + postdoc-level roles
in life sciences, scores each for research fit to Sheldon's profile
(RNA / miRNA / TDMD / metabolism / AMPK ...), and writes data/jobs.json.

Design mirrors fetch_grants.py: the page reads data/jobs.json same-origin and
re-screens client-side, so it auto-updates whenever this script re-runs.
"""
import json, re, time, datetime, urllib.request, urllib.error

UA = {"User-Agent": "Mozilla/5.0 (compatible; pi-grants-jobs/1.0)"}
BASE = "https://jobrxiv.org/?feed=job_feed&posts_per_page=100"
KW_QUERIES = ["faculty", "professor", "principal+investigator", "group+leader",
              "tenure+track", "independent", "assistant+professor",
              "rna", "molecular+biology", "biochemistry"]

RESEARCH_KW_STRONG = ["rna","mirna","microrna","non-coding","noncoding","tdmd",
    "argonaute","ago2","small rna","post-transcript","transcriptom","epigenet",
    "metaboli","ampk","lactate","cholesterol","gene regulat","rna biology","ribonucle"]
RESEARCH_KW_WEAK = ["molecular biology","biochem","cell biology","genetic","genomic",
    "cancer","tumor","diabet","fibrosis","muscle","stem cell","developmental biology",
    "immunolog","microbiolog","biomedic","physiolog","pharmacolog","organoid","crispr",
    "gene editing","nucleic acid","structural biol","virolog","neuroscience"]
EXCLUDE = ["law","humanities"," arts","anesthesiology","anesthesia","nursing",
    "clinical x","surgery","radiolog","psychiatr","dental","veterinar","economic",
    "business","social work","theolog","music","accounting","marketing"]
FAC_RE = re.compile(r'faculty|professor|principal investigator|group leader|tenure|'
    r'assistant prof|associate prof|independent (invest|research)|lecturer|'
    r'junior (group|fellow)|w1|w2|w3|\bchair\b', re.I)
PD_RE = re.compile(r'postdoc|post-doc|research (fellow|associate|scientist)', re.I)


def fetch(url):
    try:
        req = urllib.request.Request(url, headers=UA)
        return urllib.request.urlopen(req, timeout=30).read()
    except Exception as e:
        print(f"  [warn] fetch failed {url[:70]} -> {e}")
        return None


def parse_items(body):
    import xml.etree.ElementTree as ET
    out = []
    try:
        root = ET.fromstring(body)
    except Exception:
        return out
    for it in root.findall('.//item'):
        d = {}
        for ch in it:
            d[ch.tag.split('}')[-1]] = (ch.text or "")
        out.append(d)
    return out


def clean(html):
    return re.sub(r'<[^>]+>', '', html or '').replace('&amp;', '&').replace('&nbsp;', ' ').strip()


def region_of(loc):
    l = (loc or '').lower()
    if 'united states' in l or '(us)' in l: return '🇺🇸 美国'
    if 'canada' in l: return '🇨🇦 加拿大'
    if 'united kingdom' in l or '(uk)' in l or 'england' in l or 'scotland' in l: return '🇬🇧 英国'
    if any(c in l for c in ['germany','france','denmark','netherlands','sweden',
        'switzerland','spain','italy','austria','belgium','norway','finland','ireland','portugal']):
        return '🇪🇺 欧洲'
    if 'china' in l: return '🇨🇳 中国大陆'
    if 'hong kong' in l: return '🇭🇰 香港'
    if 'singapore' in l: return '🇸🇬 新加坡'
    if 'japan' in l: return '🇯🇵 日本'
    if 'korea' in l: return '🇰🇷 韩国'
    if 'australia' in l or 'new zealand' in l: return '🇦🇺 澳新'
    # jobs.ac.uk gives bare UK city / region names
    if any(c in l for c in ['london','oxford','cambridge','edinburgh','glasgow','manchester',
        'bristol','leeds','sheffield','birmingham','nottingham','norwich','york','cardiff',
        'belfast','dundee','aberdeen','southampton','exeter','liverpool','newcastle','bath',
        'warwick','durham','coventry','reading','surrey','sussex','kent','essex','leicester',
        'st andrews','swansea','hatfield','loughborough','uk']):
        return '🇬🇧 英国'
    return '🌍 其它/国际'


def score(blob):
    s = 0; hits = []
    for k in RESEARCH_KW_STRONG:
        if k in blob: s += 2; hits.append(k)
    for k in RESEARCH_KW_WEAK:
        if k in blob: s += 1; hits.append(k)
    return s, list(dict.fromkeys(hits))[:6]


UK_BASE = "https://www.jobs.ac.uk/search/?keywords="
UK_TERMS = ["RNA+biology", "microRNA", "gene+regulation", "molecular+biology",
            "RNA+metabolism", "biochemistry+lecturer", "group+leader+biology"]


def parse_uk(body):
    """Parse jobs.ac.uk search-result cards (UK + EU academic posts)."""
    import html as ihtml
    out = []
    for blk in body.split('class="j-search-result__result')[1:]:
        m = re.search(r'<a href="(/job/[^"]+)">\s*(.*?)\s*</a>', blk, re.S)
        if not m:
            continue
        def grab(pat):
            g = re.search(pat, blk, re.S)
            return ihtml.unescape(re.sub(r'<[^>]+>', '', g.group(1))).strip() if g else ""
        out.append({
            "link": "https://www.jobs.ac.uk" + m.group(1),
            "title": ihtml.unescape(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', m.group(2)))).strip(),
            "company": grab(r'j-search-result__employer">\s*<b>(.*?)</b>'),
            "location": grab(r'<div>Location:\s*(.*?)\s*</div>'),
            "description": grab(r'j-search-result__department">\s*(.*?)\s*</div>'),
            "job_type": "Academic post",
            "pubDate": "closes " + grab(r'j-search-result__date--blue[^>]*>\s*(.*?)\s*</span>'),
            "_uk": True,
        })
    return out


def main():
    seen = {}
    for kw in KW_QUERIES:
        body = fetch(f"{BASE}&search_keywords={kw}")
        if body:
            for r in parse_items(body):
                if r.get('link'):
                    seen[r['link']] = r
        time.sleep(0.6)
    print(f"Collected {len(seen)} unique postings from jobRxiv")

    n0 = len(seen)
    for t in UK_TERMS:
        for pg in (1, 2):
            body = fetch(f"{UK_BASE}{t}&page={pg}")
            if body:
                for r in parse_uk(body.decode('utf-8', 'ignore')):
                    seen[r['link']] = r
            time.sleep(0.6)
    print(f"Collected {len(seen) - n0} additional postings from jobs.ac.uk")

    jobs = []
    for r in seen.values():
        title = r.get('title', '')
        desc = clean(r.get('description', ''))
        blob = (title + " " + r.get('company', '') + " " + desc).lower()
        is_fac = bool(FAC_RE.search(title))
        is_pd = bool(PD_RE.search(title))
        if not (is_fac or is_pd):
            continue
        sc, hits = score(blob)
        # drop clearly off-field roles unless they mention a strong research kw
        if any(x in blob for x in EXCLUDE) and not any(k in blob for k in RESEARCH_KW_STRONG):
            continue
        jobs.append({
            "title": title,
            "company": r.get('company', ''),
            "location": r.get('location', ''),
            "region": region_of(r.get('location', '')),
            "type": r.get('job_type', ''),
            "level": "faculty" if is_fac else "postdoc",
            "date": r.get('pubDate', ''),
            "url": r.get('link', ''),
            "desc": desc[:400],
            "score": sc,
            "hits": hits,
            "src": "jobs.ac.uk" if r.get('_uk') else "jobRxiv",
        })
    jobs.sort(key=lambda j: (0 if j['level'] == 'faculty' else 1, -j['score']))
    today = datetime.date.today()
    out = {
        "updated": today.isoformat(),
        "updated_utc": datetime.datetime.utcnow().isoformat() + "Z",
        "count": len(jobs),
        "n_faculty": sum(1 for j in jobs if j['level'] == 'faculty'),
        "n_postdoc": sum(1 for j in jobs if j['level'] == 'postdoc'),
        "source": "jobRxiv + jobs.ac.uk — screened for life-sciences faculty/PI + postdoc",
        "n_jobrxiv": sum(1 for j in jobs if j.get('src') == 'jobRxiv'),
        "n_uk": sum(1 for j in jobs if j.get('src') == 'jobs.ac.uk'),
        "jobs": jobs,
    }
    with open("data/jobs.json", "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
    print(f"Wrote data/jobs.json — {len(jobs)} jobs "
          f"({out['n_faculty']} faculty / {out['n_postdoc']} postdoc) on {today}")


if __name__ == "__main__":
    main()
