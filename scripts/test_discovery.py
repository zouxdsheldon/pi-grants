#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""discover_boards.judge() 的回归测试。每条都是真实踩过的坑或其负控。

改动 E1/E2/E3 任一规则前后都必须跑这个文件；全绿才允许提交。
坑史：
  1. E1 用「互为子串」→ 'Beam Therapeutics' 被 'Beam (advertising)' 通过。改为主干名相等。
  2. 板面名部分相符（'…, a Sanofi company'）时按 MIN_TERMS 判 → 小板面被误杀。改为阈值 1。
  3. token 等于公司全名（多词）本身就是名称证据 —— 'fatetherapeutics' 别家不会占用；
     但 token 只等于主干名（'beam'）不算，那正是撞名广告公司的形态。
  4. 无板面名时，token 必须由公司全名推导 —— 'bio'(Bio-Techne 首词) 命中了另一家
     11 人小公司的板面，仅靠行业词无法区分同行业的另一家公司。
  5. 空板面曾被判 reject → 正控公司在两次探测之间清空即被丢弃。空板一律 unjudged。
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from discover_boards import judge

BIO   = [("Scientist", "in vivo preclinical crispr mrna antibody work")] * 6
WEAK  = [("Account Executive", "media buying brand campaign creative")] * 20
TINY  = [("Scientist I", "oncology immunology group")] * 7      # 板够大，严格词仅 2
SMALL = BIO[:3]                                                  # 板太小，无法判断
EMPTY = []

# (标签, 公司, 板面名, 语料, token, 期望)
TOK_CASES = [
    ("token=全名多词+行业词",  "Fate Therapeutics", None, "GMP", "fatetherapeutics", "ok"),
    ("token=全名但语料为广告",  "Fate Therapeutics", None, "WEAK", "fatetherapeutics", "reject"),
    ("token=仅主干名(撞名形态)", "Beam Therapeutics", None, "TINY", "beam", "reject"),
    ("token=全名但公司名单词",  "Moderna", None, "TINY", "moderna", "reject"),
    # 无板面名时 token 必须由公司全名推导；'bio' 是 Bio-Techne 的首词，实测命中别家
    ("无板面名+首词 token",    "Bio-Techne", None, "BIO", "bio", "reject"),
    ("无板面名+全名 token",    "Benchling", None, "BIO", "benchling", "ok"),
    ("无板面名+主干 token",    "Enveda Biosciences", None, "BIO", "enveda", "ok"),
    ("有板面名则不受 token 限制", "Akoya Biosciences", "Akoya", "BIO", "akoya", "ok"),
]
GMP = [("Scientist", "clinical trial gmp regulatory affairs work")] * 8

CASES = [
    ('名称完全相符', 'Beam Therapeutics', 'Beam Therapeutics', BIO, 'ok'),
    ('名称+Inc 后缀', 'Alnylam Pharmaceuticals', 'Alnylam Pharmaceuticals, Inc.', BIO, 'ok'),
    ('名称短名撞名+生物语料', 'Beam Therapeutics', 'Beam (advertising)', BIO, 'ok'),
    ('名称短名撞名+广告语料', 'Beam Therapeutics', 'Beam (advertising)', WEAK, 'reject'),
    ('名称完全不相干', 'Beam Therapeutics', 'Acme Insurance Group', BIO, 'reject'),
    ('空板面', 'Beam Therapeutics', None, EMPTY, 'unjudged'),
    ('无名+严格词足', 'X', None, BIO, 'ok'),
    ('无名+弱词', 'X', None, WEAK, 'reject'),
    ('无名+板太小', 'X', None, SMALL, 'unjudged'),
    ('部分相符+少量行业词', 'Blueprint Medicines', 'Blueprint Medicines, a Sanofi company', TINY, 'ok'),
    ('部分相符+0 行业词', 'Beam Therapeutics', 'Beam (advertising)', WEAK, 'reject'),
    ('无名+2 词(仍需 4)', 'X', None, TINY, 'reject'),
]


def main():
    bad = 0
    for lab, co, bn, jobs, tok, exp in TOK_CASES:
        got = judge(co, bn, globals()[jobs], tok=tok)[0]
        if got != exp:
            bad += 1
            print(f"FAIL {lab}: expect {exp}, got {got}")
    for lab, co, bn, jobs, exp in CASES:
        got = judge(co, bn, jobs)[0]
        if got != exp:
            bad += 1
            print(f"FAIL {lab}: expect {exp}, got {got}")
    n = len(CASES) + len(TOK_CASES)
    print(f"{n-bad}/{n} pass")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
