import re, json, os
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
s = open("index.html").read()
have = set(re.findall(r'id="([A-Za-z_][\w-]*)"', s))
blk = open("/tmp/help_block.js").read()
# ids referenced by PFILT
pf = re.search(r'var PFILT = \{(.*?)\n\};', blk, re.S).group(1)
refs = set(re.findall(r'\["([A-Za-z_][\w-]*)",', pf))
# ids referenced by HELP examples
hp = re.search(r'var HELP = \{(.*?)\n\};', blk, re.S).group(1)
exrefs = set(re.findall(r'set:\[\[?"?([A-Za-z_][\w-]*)"', hp))
exrefs |= set(re.findall(r'\["([A-Za-z_][\w-]*)",\s*"', hp))
missing_pf = sorted(refs - have)
missing_ex = sorted(exrefs - have)
print("PFILT ids referenced:", len(refs), "missing:", missing_pf)
print("example ids missing:", missing_ex)
print("countOf defined in index?", "function countOf" in s)
