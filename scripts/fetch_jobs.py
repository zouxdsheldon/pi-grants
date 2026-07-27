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


US_STATES = ["alabama","alaska","arizona","arkansas","california","colorado","connecticut","delaware",
 "florida","georgia","hawaii","idaho","illinois","indiana","iowa","kansas","kentucky","louisiana","maine",
 "maryland","massachusetts","michigan","minnesota","mississippi","missouri","montana","nebraska","nevada",
 "new hampshire","new jersey","new mexico","new york","north carolina","north dakota","ohio","oklahoma",
 "oregon","pennsylvania","rhode island","south carolina","south dakota","tennessee","texas","utah",
 "vermont","virginia","washington","west virginia","wisconsin","wyoming","district of columbia"]
US_ABBR = re.compile(r',\s*(AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|'
                     r'MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY|DC)\b')
US_ORG = re.compile(r'\b(NIH|NCI|NIA|NIAID|NIDDK|St Jude|Baylor|Rutgers|Dana-Farber|UW-Madison|Penn State|'
                    r'Texas Tech|Cal Poly|Kenyon|Holy Cross|Mayo|Cleveland Clinic|Scripps|Salk|Broad|'
                    r'Whitehead|Jackson Lab|Vanderbilt|Dartmouth|Wesleyan|LSU)\b', re.I)
CN_CITY = ["beijing","shanghai","shenzhen","hangzhou","guangzhou","nanjing","suzhou","wuhan","chengdu",
 "tianjin","xi'an","xian","jinan","qingdao","hefei","changsha","xiamen","dalian","harbin","chongqing",
 "zhejiang","jiangsu","guangdong","shandong","sichuan","fujian","hubei","hunan","shaanxi","(cn)","china"]
EU_CITY = ["frankfurt","warsaw","dublin","vienna","aachen","aarhus","stockholm","copenhagen","munich",
 "berlin","heidelberg","hamburg","cologne","dresden","leipzig","gottingen","g\u00f6ttingen","tubingen",
 "t\u00fcbingen","amsterdam","utrecht","leiden","rotterdam","groningen","zurich","z\u00fcrich","basel",
 "geneva","lausanne","bern","paris","lyon","marseille","toulouse","strasbourg","grenoble","montpellier",
 "barcelona","madrid","valencia","milan","rome","turin","bologna","naples","trieste","lisbon","porto",
 "brussels","leuven","ghent","antwerp","oslo","bergen","helsinki","turku","uppsala","lund","gothenburg",
 "prague","budapest","krakow","poznan","athens","ljubljana","zagreb","tallinn","riga","vilnius","bucharest",
 "sofia","luxembourg","(pl)","(de)","(fr)","(nl)","(dk)","(se)","(ch)","(at)","(es)","(it)","(be)","(no)",
 "(fi)","(ie)","(pt)","(cz)","(gr)"]
UK_CITY = ["london","oxford","edinburgh","glasgow","manchester","bristol","leeds","sheffield","birmingham",
 "nottingham","norwich","cardiff","belfast","dundee","aberdeen","southampton","exeter","liverpool",
 "newcastle","bath","warwick","durham","coventry","reading","surrey","sussex","kent","essex","leicester",
 "st andrews","swansea","hatfield","loughborough","guildford","kiel","harwell","didcot","cambridge","york",
 "bangor","stirling","lancaster","keele","bradford","hull","plymouth","portsmouth","brighton",
 "milton keynes","cranfield","egham","uxbridge"]


def _region_core(loc):
    """Map a location string to a display region. Order matters: explicit country
    names first, then unambiguous cities, then US state names last (a bare state
    name is the weakest signal)."""
    l = (loc or '').lower()
    if not l.strip():
        return ''
    if 'united states' in l or '(us)' in l or ', usa' in l: return '\U0001F1FA\U0001F1F8 \u7f8e\u56fd'
    if 'canada' in l or '(ca)' in l or any(c in l for c in ['toronto','vancouver','montreal','ottawa',
        'calgary','edmonton','quebec','ontario','british columbia','alberta']): return '\U0001F1E8\U0001F1E6 \u52a0\u62ff\u5927'
    if 'hong kong' in l: return '\U0001F1ED\U0001F1F0 \u9999\u6e2f'
    if 'taiwan' in l or 'taipei' in l: return '\U0001F30F \u53f0\u6e7e'
    if 'singapore' in l: return '\U0001F1F8\U0001F1EC \u65b0\u52a0\u5761'
    if 'japan' in l or any(c in l for c in ['tokyo','osaka','kyoto','nagoya','sendai','tsukuba','fukuoka',
        'okinawa']): return '\U0001F1EF\U0001F1F5 \u65e5\u672c'
    if 'korea' in l or any(c in l for c in ['seoul','daejeon','busan']): return '\U0001F1F0\U0001F1F7 \u97e9\u56fd'
    if any(c in l for c in CN_CITY): return '\U0001F1E8\U0001F1F3 \u4e2d\u56fd\u5927\u9646'
    if any(c in l for c in ['australia','new zealand','sydney','melbourne','brisbane','adelaide','perth',
        'canberra','auckland','wellington','dunedin','queensland']): return '\U0001F1E6\U0001F1FA \u6fb3\u65b0'
    if any(c in l for c in ['united kingdom','(uk)','england','scotland','wales','northern ireland']):
        return '\U0001F1EC\U0001F1E7 \u82f1\u56fd'
    if any(c in l for c in ['germany','france','denmark','netherlands','sweden','switzerland','spain',
        'italy','austria','belgium','norway','finland','ireland','portugal','poland','czech','greece',
        'hungary','luxembourg','estonia','latvia','lithuania','romania','bulgaria','slovenia','croatia',
        'iceland','\u00f6sterreich','wien']): return '\U0001F1EA\U0001F1FA \u6b27\u6d32'
    if any(c in l for c in EU_CITY): return '\U0001F1EA\U0001F1FA \u6b27\u6d32'
    if any(c in l for c in UK_CITY): return '\U0001F1EC\U0001F1E7 \u82f1\u56fd'
    if any(c in l for c in ['israel','tel aviv','jerusalem','rehovot','haifa']): return '\U0001F1EE\U0001F1F1 \u4ee5\u8272\u5217'
    if any(c in l for c in ['saudi','abu dhabi','dubai','qatar','thuwal']): return '\U0001F30D \u4e2d\u4e1c'
    if any(c in l for c in ['india','bangalore','mumbai','delhi','hyderabad','(in)']): return '\U0001F1EE\U0001F1F3 \u5370\u5ea6'
    if 'brazil' in l or 'paulo' in l: return '\U0001F30E \u62c9\u7f8e'
    if US_ABBR.search(loc or ''): return '\U0001F1FA\U0001F1F8 \u7f8e\u56fd'
    if any(s in l for s in US_STATES): return '\U0001F1FA\U0001F1F8 \u7f8e\u56fd'
    return ''


def region_of(loc, extra=""):
    """Region for a posting. Nature/Science entries often carry no location field,
    so fall back to employer name + description text before giving up."""
    r = _region_core(loc)
    if r:
        return r
    if extra:
        r = _region_core(extra)
        if r:
            return r
        if US_ORG.search(extra):
            return '\U0001F1FA\U0001F1F8 \u7f8e\u56fd'
    return '\U0001F30D \u5176\u5b83/\u56fd\u9645'


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


NAT_BASE = "https://www.nature.com/naturecareers/jobs/search?keywords="
NAT_TERMS = ["RNA", "gene+regulation", "faculty", "group+leader", "tenure+track",
             "molecular+biology", "biochemistry", "metabolism"]
SCI_BASE = "https://jobs.sciencecareers.org/jobsrss/?keywords="
SCI_TERMS = ["RNA", "faculty", "tenure+track", "assistant+professor",
             "molecular+biology", "biochemistry", "gene+regulation"]


def parse_nature(body):
    """Parse Nature Careers listing cards. NB: hrefs contain embedded newlines,
    so whitespace must be normalised before matching."""
    import html as ihtml
    body = re.sub(r'\s+', ' ', body)
    out = []
    for blk in body.split('class="lister__item')[1:]:
        m = re.search(r'lister__header"><a href=" ?(/naturecareers/job/[^"?\s]+)[^"]*" [^>]*>'
                      r'(?:<span>)?(.*?)(?:</span>)?</a>', blk)
        if not m:
            continue
        def g(pat):
            x = re.search(pat, blk)
            return ihtml.unescape(re.sub(r'<[^>]+>', '', x.group(1))).strip() if x else ""
        out.append({
            "link": "https://www.nature.com" + m.group(1),
            "title": ihtml.unescape(re.sub(r'<[^>]+>', '', m.group(2))).strip(),
            "company": g(r'lister__meta-item--recruiter">(.*?)</li>') or g(r'alt="(.*?) logo"'),
            "location": g(r'lister__meta-item--location">(.*?)</li>'),
            "description": g(r'lister__meta-item--salary">(.*?)</li>'),
            "job_type": "Academic post", "pubDate": "", "_src": "Nature Careers",
        })
    return out


def parse_science(body):
    """Parse the Science Careers (AAAS) RSS feed. Titles are 'Institution: Role'."""
    import xml.etree.ElementTree as ET
    out = []
    try:
        root = ET.fromstring(body)
    except Exception:
        return out
    for it in root.findall('.//item'):
        def t(tag):
            e = it.find(tag)
            return (e.text or "").strip() if e is not None else ""
        raw = t('title')
        org, _, role = raw.partition(':')
        out.append({
            "link": t('link'),
            "title": (role.strip() or raw),
            "company": (org.strip() if role.strip() else ""),
            "location": "",
            "description": re.sub(r'\s+', ' ', t('description'))[:400],
            "job_type": "Academic post", "pubDate": t('pubDate'),
            "_src": "Science Careers",
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

    n0 = len(seen)
    for t in NAT_TERMS:
        for pg in (1, 2, 3):
            url = f"{NAT_BASE}{t}" + (f"&page={pg}" if pg > 1 else "")
            body = fetch(url)
            if body:
                for r in parse_nature(body.decode('utf-8', 'ignore')):
                    seen[r['link']] = r
            time.sleep(0.6)
    print(f"Collected {len(seen) - n0} additional postings from Nature Careers")

    n0 = len(seen)
    for t in SCI_TERMS:
        body = fetch(f"{SCI_BASE}{t}")
        if body:
            for r in parse_science(body):
                if r.get('link'):
                    seen[r['link']] = r
        time.sleep(0.6)
    print(f"Collected {len(seen) - n0} additional postings from Science Careers")

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
            "region": region_of(r.get('location', ''),
                                r.get('company', '') + " " + desc[:250]),
            "type": r.get('job_type', ''),
            "level": "faculty" if is_fac else "postdoc",
            "date": r.get('pubDate', ''),
            "url": r.get('link', ''),
            "desc": desc[:400],
            "score": sc,
            "hits": hits,
            "src": r.get('_src') or ("jobs.ac.uk" if r.get('_uk') else "jobRxiv"),
        })
    jobs.sort(key=lambda j: (0 if j['level'] == 'faculty' else 1, -j['score']))
    today = datetime.date.today()
    out = {
        "updated": today.isoformat(),
        "updated_utc": datetime.datetime.utcnow().isoformat() + "Z",
        "count": len(jobs),
        "n_faculty": sum(1 for j in jobs if j['level'] == 'faculty'),
        "n_postdoc": sum(1 for j in jobs if j['level'] == 'postdoc'),
        "source": "jobRxiv + jobs.ac.uk + Nature Careers + Science Careers — "
                  "screened for life-sciences faculty/PI + postdoc",
        "n_jobrxiv": sum(1 for j in jobs if j.get('src') == 'jobRxiv'),
        "n_uk": sum(1 for j in jobs if j.get('src') == 'jobs.ac.uk'),
        "by_src": {s: sum(1 for j in jobs if j.get('src') == s)
                   for s in ["jobRxiv", "jobs.ac.uk", "Nature Careers", "Science Careers"]},
        "jobs": jobs,
    }
    with open("data/jobs.json", "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
    print(f"Wrote data/jobs.json — {len(jobs)} jobs "
          f"({out['n_faculty']} faculty / {out['n_postdoc']} postdoc) on {today}")


if __name__ == "__main__":
    main()
