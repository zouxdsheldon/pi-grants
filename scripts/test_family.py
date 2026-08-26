#!/usr/bin/env python3
"""职能族分类回归测试 —— 每条用例都来自真实抓取到的岗位标题。

为什么要有这个文件：FAMILY_RULES 是顺序敏感的（先中先得），
改任何一条正则都可能把别的族抢走。历史上踩过的坑：
  · 前缀关键词词尾多写了词界断言 → "Computational Biologist" 整族匹配失效；
  · field 排在 bench 之后 → "Field Application Scientist" 被算成实验台科研；
  · pmo 排在 labops 之后 → "Program Manager, Research Operations" 被算成实验室运营。
所以：改规则后必须跑 `python3 scripts/test_family.py`，全绿才提交。
用例里既有正向期望，也有负控（不能被新规则抢走的标题）。
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from fetch_industry_jobs import family

CASES = [
    ('Senior Director, Scientific Project Lead  (Cardio-Renal-Metabolic)', 'pmo'),
    ('Regional Director, Rare Disease, Neurology (Great Lakes)', 'bizdev'),
    ('Director / Senior Director, Intellectual Property', 'admin'),
    ('Director, Field Market Access', 'bizdev'),
    ('Director, Key Account Management', 'bizdev'),
    ('Director, Supply Chain Planning', 'admin'),
    ('Director, Medical Writing', 'clinical'),
    ('Associate Medical Director/Medical Director, Endocrinology and Metabolism', 'clinical'),
    ('Global Support Engineer', 'eng'),
    ('Staff Optical Systems Engineer', 'eng'),
    ('Associate Director or Director, PBPK & Biopharmaceutics Modeling', 'compbio'),
    ('Cheminformatics & Synthesis Prediction', 'compbio'),
    ('PhD Candidate, Tissue Rejuvenation', 'bench'),
    ('Associate Director, Precision Medicine & Companion Diagnostics', 'science'),
    ('Director, Insights and Analytics', 'bizdev'),
    ('VP, Head of Procurement', 'admin'),
    ('VP, Learning & Leadership Development', 'admin'),
    ('Senior Director, Real World Data (RWD)', 'clinical'),
    ('Director of Nonclinical Safety, Cambridge, MA', 'clinical'),
    ('Histology Lab Operator II', 'labops'),
    ('Histotechnician I', 'labops'),
    ('Phlebotomist', 'labops'),
    ('Senior Director, Outcomes, Value & Access', 'bizdev'),
    ('Automation Engineer', 'labops'),
    ('Scientist, Disease Modeling', 'bench'),
    ('Research Associate, Organoid Disease Modeling', 'bench'),
    ('Computational Biologist', 'compbio'),
    ('Postdoctoral Researcher', 'bench'),
    ('Senior Scientist, Molecular Biology', 'bench'),
    ('Process Development Engineer', 'cmc'),
    ('Clinical Trial Manager', 'clinical'),
    ('Quality Control Analyst', 'quality'),
    ('Field Application Scientist', 'field'),
    ('Business Development Director', 'bizdev'),
    ('Program Manager, Discovery', 'pmo'),
    ('Laboratory Manager', 'labops'),
    ('Field Service Engineer', 'field'),
    ('Scientist, Assay Development', 'bench'),
    ('Senior Application Scientist, Genomics', 'field'),
    ('Research Scientist, Immunology', 'bench'),
    ('Associate Director, Pipeline & Portfolio Market Planning', 'bizdev'),
    ('Associate Director, New Product Strategy', 'bizdev'),
    ('Engagement Manager, US', 'bizdev'),
    ('Senior Director, ECD Product Strategy', 'bizdev'),
    ('Senior Director of Trade and Channel Management', 'bizdev'),
    ('Executive Director, Corporate Strategy & Intelligence', 'bizdev'),
    ('Director, US Analytics, Lung', 'bizdev'),
    ('Associate Director, Global Omnichannel Solutions Delivery', 'bizdev'),
    ('Senior Director, Customer Engagement Strategy & Operations', 'bizdev'),
    ('Rare Disease Specialist (National)', 'bizdev'),
    ('Director, IT Infrastructure & Operations', 'admin'),
    ('Vice President, Global Privacy', 'admin'),
    ('Head of Operations', 'admin'),
    ('Software Graduate Intern, Autonomous Lab', 'compbio'),
    ('Member of Technical Staff', 'compbio'),
    ('Senior Engineering Manager — Lab Execution Platform', 'compbio'),
    ('Cytogenetics Technologist', 'labops'),
    ('Vice President, Pharmaceutical Development', 'cmc'),
    ('Scientist, Translational Strategy', 'bench'),
    ('Computational Biologist, Data Analytics', 'compbio'),
    ('Research Associate, Cell Culture', 'bench'),
    ('Clinical Trial Specialist', 'clinical'),
    ('Senior Scientist, Formulation Development', 'bench'),
    ('Quality Assurance Specialist', 'quality'),
    ('Program Manager, Research Operations', 'pmo'),
    ('Lab Operations Manager', 'labops'),
    ('Research Operations Coordinator', 'labops'),
    ('Senior Program Manager, Discovery Biology', 'pmo'),
    ('Vivarium Technician', 'labops'),
    ('Senior Director, Investor Relations', 'admin'),
    ('Director Global Logistics', 'admin'),
    ('Senior Azure Cloud Engineer', 'admin'),
    ('Senior Netsuite Specialist', 'admin'),
    ('FP&A Manager', 'admin'),
    ('Senior Director, State Government Affairs', 'admin'),
    ('Vice President, Head of Search & Evaluation', 'admin'),
    ('Senior Animal Care Technician', 'labops'),
    ('Genetic Counselor', 'clinical'),
    ('Oncology RN', 'clinical'),
    ('Senior Manager, Care Advocacy', 'clinical'),
    ('Cancer Screening Advocate (Temporary Contractor)', 'clinical'),
    ('Technician I, Production', 'cmc'),
    ('Sr  Manager, Industrial Engineering & Process Optimization', 'cmc'),
    ('Clinical Data Manager', 'clinical'),
    ('Scientist, Process Development', 'bench'),
    ('Optical Engineer', 'eng'),
    ('Business Development Manager', 'bizdev'),
    ('Dyne Care Partner - Atlanta', 'clinical'),
    ('Lead Medical Safety Physician', 'clinical'),
    ('Associate Director, Treatment Center Quality', 'clinical'),
    ('Thought Leader Liaison - Midwest', 'bizdev'),
    ('Director, National Field Access (Central)', 'bizdev'),
    ('Region Manager - Mississippi Region', 'bizdev'),
    ('GM, Oncology Care', 'bizdev'),
    ('Associate Director, Statistical Programming', 'compbio'),
    ('Associate Director, Quality Management Systems', 'quality'),
    ('Manager, Quality Operations', 'quality'),
    ('Senior Director, SEC Reporting & SOX', 'admin'),
]

def main():
    bad = [(t, e, family(t)) for t, e in CASES if family(t) != e]
    print(f"{len(CASES) - len(bad)}/{len(CASES)} pass")
    for t, e, got in bad:
        print(f"  FAIL {t!r}: expect {e}, got {got}")
    return 1 if bad else 0

if __name__ == "__main__":
    sys.exit(main())
