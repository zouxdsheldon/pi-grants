# ZSWIM8-6 旗舰写作模板 · Grant Writing Master Template
## "Energy-stress–driven metabolic memory via ZSWIM8-dependent miRNA decay"
### 写一次核心内容 → 套用所有基金类型 (K99/R00 · F32 · R01 · 海外优青 · RGC ECS · NRF)

> **怎么用这份模板**:第 1 部分是**核心内容库**——同一个项目按 NIH 全长写出来的 Aims / Significance / Innovation / Approach / Career,方括号 `[…]` 已用你的真实课题词填好。第 2 部分是**每类基金的裁剪指南**——告诉你把核心内容删到多少页、加哪一节、强调什么。真正写作时:先复制第 1 部分对应段落 → 按第 2 部分你目标基金那一列裁剪/补写 → 完成。
> **数据口径(重要)**:本模板所有数字与图均为 **predicted / schematic(预期/示意)**,不是实测数据。可行性由 (a) 你自建的透明 AMPK 底物 PSSM 打分、(b) 已发表文献、(c) 你的独家资源(T2D 猪模型、类器官、小 RNA 测序体系、碱基/先导编辑)三者支撑。真正投稿前,凡有预实验结果的地方替换为真实图/值。

---

# 第 1 部分 · 核心内容库(NIH 全长,英文正文)

## 1.1 Specific Aims (一页,所有基金通用的骨架)

**[Opening hook]** MicroRNAs, once regarded as constitutively stable, are actively destroyed on a physiological timescale by target-directed miRNA decay (TDMD), in which the ZSWIM8 ubiquitin ligase recognizes a highly complementary target engaged by an AGO2–miRNA complex and marks AGO2 for degradation.

**[Knowledge gap]** Although the ZSWIM8 TDMD machinery is now structurally defined, whether and how it is tuned by the cell's metabolic state is unknown. In particular, whether the energy sensor AMPK—activated within minutes of nutrient stress—directly controls the rate of miRNA turnover has never been tested. This gap is pressing because type 2 diabetes (T2D) exhibits "metabolic memory": tissues retain a disordered metabolic program long after glycemic control is restored, yet no molecular mechanism explains this persistence.

**[Long-term goal & central hypothesis]** Our long-term goal is to define the metabolic control of miRNA stability and exploit it therapeutically. **Our central hypothesis is that energy stress, through AMPK, phosphorylates ZSWIM8 at S608, accelerating TDMD of specific metabolic miRNAs and thereby encoding a durable, reversible metabolic memory.** This hypothesis is grounded in our transparent AMPK substrate-motif scan, which places ZSWIM8-S608 in a textbook AMPK recognition context (…KRR-**S**608…) within a disordered, kinase-accessible region.

**[Aim 1 — molecular event]** *Test whether AMPK directly phosphorylates ZSWIM8 at S608.* In vitro kinase assays with recombinant AMPK and ZSWIM8 fragments, phospho-specific detection, and S608A/S608D mutants will establish direct phosphorylation and its dependence on the predicted motif. *(Predicted outcome: S608 phosphorylation is AMP-dependent and abolished by S608A.)*

**[Aim 2 — functional readout]** *Determine how S608 phosphorylation sets the rate of TDMD.* Using time-resolved small-RNA sequencing after transcriptional shut-off in ZSWIM8-reconstituted cells (WT / S608A / S608D / KO), we will fit decay-rate constants for candidate miRNAs. *(Predicted ordering: S608D > WT > S608A > KO.)*

**[Aim 3 — disease / memory]** *Test whether AMPK-driven ZSWIM8 activity encodes metabolic memory.* In a T2D pig model and in fibrosis organoids subjected to a defined nutrient-stress pulse, we will ask whether a transient stress produces a durable, S608-dependent shift in metabolic miRNA levels and phenotype. *(Predicted: transient stress → lasting, S608-dependent miRNA suppression.)*

**[Payoff]** Successful completion will establish the first metabolic input to the TDMD machinery, define a phospho-switch (ZSWIM8-S608) as a druggable node, and open metabolic control of miRNA stability as a new axis in diabetes and its complications.

---

## 1.2 Significance (R01/K99 用全长;fellowship 压缩)

- **Clinical burden.** Metabolic memory drives the persistence of diabetic complications despite glycemic control; there is no therapy that erases this memory. A metabolic lever on miRNA decay would be a mechanistically novel entry point.
- **Mechanistic advance.** Establishing AMPK as an upstream regulator of TDMD would convert miRNA turnover from a housekeeping process into a signal-responsive, druggable pathway.
- **Conceptual reach.** Because ZSWIM8 governs decay of many miRNAs, a metabolic input would have consequences across the miRNAome, not a single miRNA.
- **Unique resources.** Direct access to a T2D pig model, intestinal/cardiac organoids, a lab-native small-RNA sequencing pipeline, and base/prime editing positions us to test this axis in human-relevant, large-animal contexts other labs cannot easily replicate.

## 1.3 Innovation (R01/K99 用;fellowship 合并进 Significance)

- **Conceptual:** a paradigm shift—miRNA decay is not constitutive but is set by metabolic state through a defined kinase→ligase axis.
- **New target:** ZSWIM8-S608 as, to our knowledge, the first phosphosite proposed to couple energy sensing to TDMD.
- **Methodological:** an integrated pipeline—transparent AMPK substrate scorer + endogenous phospho-mimetic editing + single-miRNA decay kinetics—not previously applied to TDMD.
- **Editing:** base/prime editing installs precise endogenous S608A/S608D alleles, avoiding overexpression artifacts.

## 1.4 Approach (核心;每 Aim = 假设→设计→读出→预期→备选→陷阱)

**Aim 1.** *Rationale:* our motif scan flags S608 (…KRR-S608…) in a disordered region. *Design:* recombinant AMPK + ZSWIM8 fragment kinase assays ± AMP; phospho-specific antibody/MS; S608A/S608D. *Readout:* stoichiometry of S608 phosphorylation. *Predicted:* AMP-dependent, S608A-abolished. *Alternative:* if S608 insufficient, test neighboring S609 and S1202 (also flagged by our scan) and screen AMPK-independent kinases. *Pitfall:* S608D may not fully mimic phospho-S608 → corroborate with in-vitro-phosphorylated protein.

**Aim 2.** *Design:* reconstitute ZSWIM8-KO cells with WT/S608A/S608D; transcriptional shut-off; time-course small-RNA-seq. *Readout:* per-miRNA decay-rate constant k. *Predicted:* S608D > WT > S608A > KO. *Statistics:* powered to detect a 30% difference in k at 80% power (α=0.05), ≥3 biological replicates. *Pitfall:* global vs. selective effects → normalize to TDMD-insensitive miRNAs.

**Aim 3.** *Design:* (i) T2D pig tissue under controlled metabolic challenge; (ii) organoids given a defined nutrient-stress pulse, tracked 7–14 days; endogenous S608A/S608D installed by prime editing. *Readout:* durable change in metabolic miRNA levels + phenotype after stress withdrawal. *Predicted:* transient stress → lasting, S608-dependent suppression (metabolic memory). *Alternative:* if organoids lack durability, extend pulse or use repeated pulses.

**Rigor:** both sexes studied, sex as a biological variable; all antibodies/cell lines/constructs authenticated per RRID; go/no-go milestone—Aim 1 must confirm S608 phosphorylation before Aim 2 proceeds.

## 1.5 Candidate & Career (仅 K99/R00·fellowship·优青/NRF 需要)

- **Transition logic (K99 mentored phase):** advanced training in quantitative RNA-decay measurement and large-animal metabolic modeling, carried into the independent program.
- **Independence (R00 phase):** an independent program on metabolic control of miRNA stability, distinct from the mentor's focus on TDMD structure.
- **Track record:** seven first-author publications in RNA biology and metabolic disease establish capacity to lead this interdisciplinary program.
- **Mentoring team:** spans TDMD biochemistry, kinase signaling, and organoid disease modeling—covering every methodology in the proposal.

---

# 第 2 部分 · 每类基金裁剪指南(核心内容 → 具体基金)

> 用法:选定目标基金那一行,照"篇幅/必写节/加什么/砍什么/语气"把第 1 部分裁剪成型。

## 2.1 全类型对照表

| 基金 | 研究计划篇幅 | 必写章节 | 从核心内容裁剪 | 额外要加 | 语气/侧重 |
|---|---|---|---|---|---|
| **🇺🇸 NCI K99/R00** (PAR-25-135) | ≤12 页(K99 6 + R00 6) | Aims·Significance·Innovation·Approach·**Candidate·职业发展** | 全部 1.1–1.5 都用;Approach 按 K99/R00 两段拆 | 职业发展计划(课程/技能/时间表)、导师团队、机构环境 | K99 段=导师指导下的过渡工作;R00 段=独立后招牌。**你的头号目标** |
| **🇺🇸 NRSA F32** | ≤6 页 | Aims·Approach·**Training Goals**·Sponsor 环境 | 1.1 全用;1.2/1.3 压成半页;1.4 用 Aim1–2 为主 | **训练目标**(学什么新技能)、导师 track record | 重"训练"轻"产出"。⚠️ 多要求美籍/绿卡——先核对资格 |
| **🇺🇸 R01** | ≤12 页 | Aims·Significance·Innovation·Approach | 1.1–1.4 全长;不需 Career | 更深的 preliminary data、更多备选方案 | 现阶段学结构用;K99→R00→R01 同逻辑放大 |
| **🇨🇳 海外优青** | 按当年指南(研究基础+拟开展研究) | 科学问题·研究基础·关键问题·研究方案 | 1.1 凝练成"1 句科学问题";1.4 作研究方案;1.5 作研究基础 | **代表作证据链**(7 篇一作)、回国后国家需求、学科前沿 | 评审多为国内同行:强调国家需求+你能"拥有"的独立性 |
| **🇭🇰 RGC ECS** | 按 RGC 模板 | Objectives·Background·Methodology·Impact | 1.1→Objectives 清单化;1.4→Methodology(要详实) | 对香港/大湾区的贡献、国际竞争力 | 英式:Objectives 列点、方法学详尽 |
| **🇸🇬 NRF Fellowship** | 按 NRF 模板 | Vision·Track Record·Research Plan·Budget | 1.2→Vision(5 年蓝图);1.4→Plan;1.5→Track Record | 独立后 5 年愿景、新加坡东道机构支持 | Track Record + Vision 权重最高 |

## 2.2 三处最常改的地方(不同基金的"变体句")

**① 开场第一句** — 按评审背景调:
- NIH/RGC/NRF(国际同行):用 1.1 的 TDMD 机制钩子(上文原句)。
- 海外优青(国内同行):`代谢记忆是2型糖尿病并发症持续的核心难题,但将营养应激转化为持久转录后重编程的分子机制长期空白——这正是本项目要解决的国家健康需求。`

**② 中心假设的语气** — 按有无预实验:
- 无数据(你现在):`We hypothesize that energy stress, through AMPK, shifts the rate of ZSWIM8-dependent miRNA decay…`(用 shift/hypothesize,谨慎)
- 有数据(将来):`Our data demonstrate…; we therefore hypothesize that AMPK phosphorylates ZSWIM8 at S608…`(用 demonstrate,自信)

**③ 可行性段落** — 按基金:
- K99/F32:强调"在导师指导下我将学会 X"→把资源写成训练机会。
- 优青/NRF:强调"我已独立掌握 X + 独家资源 Y"→把资源写成独立能力证据。

## 2.3 落地顺序建议(你现在就能做)

1. **先写 Specific Aims 一页**(1.1 已基本成稿)——这是所有基金共用、且最先被读的一页,先打磨到位。
2. **按目标基金补 Career/Training 段**(K99/优青/NRF 必需;R01 不要)。
3. **Approach 补预实验**:凡有真实结果替换 predicted;暂无则保留 predicted 并强化资源论证。
4. **投前核对官方 NOFO**:篇幅、字体、页边距、SABV/Rigor 栏以官方为准。

---

*本模板基于你的 executive_summary_PI_directions.xlsx 中"旗舰① ZSWIM8-6"方向构建。配套完整旗舰提案见 proposal_AMPK_TDMD.md(英)/ proposal_zh.md(中);101 句写作语料见 grant_writing_corpus.xlsx。*
