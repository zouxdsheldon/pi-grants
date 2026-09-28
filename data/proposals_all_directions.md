# 五个可行方向的完整立项书 / Full Proposals for All Viable Directions
### Xiaodong ZOU · 2026-09-28

**统一叙事 / Unifying thesis**
> **代谢与信号状态如何通过控制 miRNA 的降解与末端修饰，决定慢性疾病的可逆性。**
> How metabolic and signalling state, acting through miRNA decay and 3′-end modification, sets the reversibility of chronic disease.

五个方向共用 **miR-29** 作为核心 miRNA、共用一套方法栈（smallRNA-seq + 半衰期测定 + 编辑 + 类器官），所以它们可以作为**同一份申请书的 Aims**，而不是五个互相稀释的项目。

**证据等级标注 / Evidence grading** — 本文件每条机制前提都标注来源：
`[已发表]` 有 PMID 支撑 · `[本项目计算]` 来自自建 PSSM，**假设生成级** · `[待测]` 尚无证据。
所有图与数字若出现在申请书中，一律标注 **predicted/schematic**。

**已识别的竞争风险（两篇，2026）**
| PMID | 是什么 | 威胁 | 对策 |
|---|---|---|---|
| 41542392 | bioRxiv 2026：E3 连接酶如何决定 TDMD 的**特异性** | 若已触及上游调控，方向 1 的新颖度受损 | 第 12 周逐句读；差异声明落在「**代谢信号输入**」而非「特异性机制」 |
| 42608480 | EMBO J 2026：经典与非经典 miRNA 降解塑造**状态转换** | 「状态转换」与我的「代谢记忆」概念可能是同一件事 | 差异声明落在「**可逆性/记忆的时间尺度**」与「代谢病语境」 |

---

# 方向 1 · AMPK–ZSWIM8–代谢记忆（旗舰）
## Direction 1 · Energy stress → ZSWIM8 → metabolic memory

### 1.1 一句话假设
能量应激激活的 AMPK 磷酸化 ZSWIM8，加速代谢相关 miRNA 的靶标导向降解（TDMD），把一过性代谢刺激固化为持久的「代谢记忆」。

### 1.2 科学前提
| # | 前提 | 等级 | 依据 |
|---|---|---|---|
| P1 | ZSWIM8–Cul3 是 TDMD 的执行者 | `[已发表]` | PMID 33184234 / 33184237（两篇独立 *Science* 2020） |
| P2 | 靶标识别依赖 AGO2 构象改变，机器对构象敏感 | `[已发表]` | PMID 31353209（*Mol Cell* 2019 结构）；PMID 41851464（*Nature* 2026 冷冻电镜） |
| P3 | AGO2 亦可保护 miRNA 免于 TDMD —— 降解/保护是可调平衡 | `[已发表]` | PMID 33853897 |
| P4 | AMPK 底物基序为 −3/−4 碱性 + +4 疏水 | `[已发表]` | PMID 7698321（原始生化）；PMID 25683918（基序亲和 + 质谱发现流程） |
| P5 | ZSWIM8-S608/S609 落在该基序内、且处于无序区（易被激酶接近） | `[本项目计算]` | 自建透明 PSSM：S609 98.3 百分位 / S608 96.4 / S1202 82.7。**分值本身不构成证据** |
| P6 | 代谢记忆存在且具表观遗传基础 | `[已发表]` | PMID 25481708；PMID 42321894（2026 综述，miRNA 与高血糖代谢记忆） |
| P7 | 上游信号如何调控 miRNA 降解机器 —— **几乎空白** | `[待测]` | AMPK 已知底物分类中几乎没有 RNA 结合蛋白（PMID 26616193） |

### 1.3 Aim 1 — AMPK 是否直接磷酸化 ZSWIM8（12 个月 go/no-go）
**实验**
1. **体外激酶反应**：重组 AMPK（α1β1γ1）+ 纯化 ZSWIM8 片段（含 S608/S609 的无序区，约 560–660 aa），WT vs S608A vs S609A vs 双突变。**必须同板跑经典 AMPK 底物肽作阳性对照**（否则阴性结果无信息量，PMID 11902845）。
2. **Phos-tag SDS-PAGE** 定量多位点磷酸化化学计量比——S608 在无序区，正是 Phos-tag 适用场景（PMID 32696389）。
3. **质谱定位位点**：送 MSKCC proteomics core；位点定位概率阈值 >0.75 方可作结论（PMID 27667718）。
4. **细胞内验证**：AICAR 与 A-769662（**两种机制不同的激动剂互为对照**）+ 葡萄糖剥夺；自制 phospho-S608 抗体检测；AMPKα1/α2 双敲除细胞作遗传对照。
5. **自制抗体**：用你的杂交瘤能力做 phospho-ZSWIM8(S608) 单抗，按 PMID 15728188 的验证范式（磷酸酶处理 + 位点突变体双阴性对照）。

**预期结果（predicted/schematic）** WT + AMP 激活 ≈100%，WT 未激活 ≈44%，S608A ≈9%，无激酶 ≈6%，SAMS 阳性对照 ≈92%。

**陷阱与替代** ① 全长 ZSWIM8（1837 aa）表达困难 → 用片段，但须在细胞内用全长回补验证。② 无序区片段易降解 → 加 MBP/SUMO 标签与蛋白酶抑制剂。③ 若 AMPK 不直接磷酸化 → 检查是否经 SIK/MARK 等 AMPK 家族激酶，或经中间体。

### 1.4 Aim 2 — 磷酸化是否改变 miRNA 半衰期
**实验**
1. **半衰期测定**：actinomycin D chase + smallRNA-seq，先在已知短命 miRNA 上做阳性对照再上候选（基准数值取自 PMID 31519739、方法取自 PMID 21447562）。
2. **正交方法**：4sU 代谢标记 / SLAM-seq 思路（PMID 28945705）——单一方法的偏倚必须用第二种方法排除。
3. **内源位点突变**：用你的 **ABE/BE4 在内源位点**敲入 S608A（磷酸化缺陷）与 S608D（拟磷酸化），**不用过表达质粒**——审稿人对内源点突变的信任度远高于过表达（可行性见 PMID 31937940 / 31634902 / 33606977）。
4. **候选 miRNA**：miR-29（抗纤维化）、miR-33（胆固醇/AMPK 轴）、miR-375（胰岛）；miR-375 的功能依据见 PMID 15538371。
5. **AGO-RIP** 检查载荷变化（Halo 增强法比 iCLIP 可行，PMID 32497496）。

**预期结果（predicted/schematic）** 降解速率 S608D > WT > S608A > ZSWIM8-KO（k ≈ 0.075 / 0.045 / 0.020 / 0.006 h⁻¹）。

**陷阱与替代** ① Act-D 本身扰动细胞 → 限制在 8 小时内并用 4sU 正交。② 半衰期差异可能被归一化方式掩盖 → 预先固定 spike-in 归一化方案并写进 SOP。③ 若半衰期不变但载荷变化 → 假设改为「磷酸化调控 AGO2 载荷而非降解速率」，方向不废。

### 1.5 Aim 3 — 在代谢记忆模型里验证因果
**实验** 高糖脉冲后撤除 → 追踪 miR-29/33/375 丰度与靶基因随时间恢复 → 比较 WT / S608A / S608D / ZSWIM8-KO 的「记忆强度」；体系用类器官（你已有）与 T2D 小型猪样本（你自己的一作模型，PMID 见 CV #11）。
**预期结果（predicted/schematic）** 撤除后第 7 天：WT 恢复到 58%、KO 92%、S608A 88%（即失去记忆）。
**陷阱** 猪样本可及性未确认 → 主线放在类器官，猪作为加分验证。

### 1.6 可行性：为什么是你
| 支柱 | 你的背书 |
|---|---|
| 代谢→表型完整因果链 | CV #8（乳酸→胆固醇→病毒复制，*iScience*）、#9（胆固醇→CSFV，*Viruses*） |
| 代谢病大动物模型 | CV #11（CRISPR T2D 小型猪，*Cell Death Dis* 2019） |
| miRNA 机制训练 | CV #1（*Cell Rep* 2025，Lai lab） |
| 内源位点编辑 | CV #2（碱基编辑方法章节）+ CRISPR/ABE/BE4 全栈 |
| **自制磷酸化抗体** | CV 技能栏「杂交瘤单抗制备」——**这是领域最大的试剂瓶颈，而你有现成能力** |

### 1.7 时间线 · 目标产出 · 放弃条件
- **0–12 月**：Aim 1 go/no-go + Aim 2 首批半衰期数据；抗体进入免疫程序（周期长，Q2 就要启动）。
- **12–18 月**：第一篇机制论文投稿（*Nucleic Acids Research* / *Cell Reports* / *EMBO J*）。
- **3 年**：冲 *Molecular Cell* / *Genes & Development*。
- **基金**：海外优青 / NIH R01（**NIDDK 而非 NCI**）/ 香港 RGC ECS / 新加坡 NRF。
- **放弃条件（12 个月硬线）**：若 (a) 体外激酶反应测不到磷酸化（阳性对照成立的前提下）**且** (b) 任何代谢处理都不改变任何候选 miRNA 的半衰期 → 放弃「AMPK 直接磷酸化」，退守方向 2，并把代谢输入层从翻译后修饰改为转录/翻译调控。

---

# 方向 2 · TUT4/7–miR-29 纤维化检查点（最快出成果）
## Direction 2 · Uridylation checkpoint on anti-fibrotic miRNA

### 2.1 一句话假设
器官纤维化时，TUT4/7 对 miR-29 的 3′ 尿苷化加速其降解，解除对胶原的抑制；这个开关可药控。

### 2.2 科学前提 —— 以及一个必须正面处理的竞争解释
| # | 前提 | 等级 | 依据 |
|---|---|---|---|
| P1 | miR-29 是跨器官的抗纤维化核心 miRNA | `[已发表]` | 肝 PMID 20890893；肾 21784902；肺 20971881；皮肤/SSc 20201077 |
| P2 | 尿苷化可把 RNA 导向降解，并改变炎症输出 | `[已发表]` | PMID 19701194（Zcchc11 尿苷化 miRNA → 细胞因子）；25480299（TUT4/7 标记 mRNA 降解）；23594738（DIS3L2 执行降解） |
| **P3** | **miR-29 下降由 TGF-β/Smad3 在转录层驱动** | `[已发表]` | **PMID 21784902、22095944 —— 这是我的降解假设最强的替代解释** |
| P4 | 尿苷化也可**促进**前体加工（反例） | `[已发表]` | PMID 23063654（单尿苷化促进第 II 组前体生成）；39054354（末端转移酶活性切换决定 let-7 命运） |
| P5 | 纤维化时 miR-29 的**末端状态**如何变化 | `[待测]` | 文献普遍只测成熟体丰度，未测 3′ 末端 |

> **这一条决定方向 2 成立与否，必须写进申请书正面回应：**
> 既然 TGF-β/Smad3 已在转录层解释了 miR-29 下降，我的第一个实验就**不是**测成熟体，而是测 **pri/pre-miR-29 与成熟体的比值**。若前体同步下降 → 转录机制主导，假设降级；若前体不变而成熟体下降 → 降解/加工层被打开，假设成立。**这是一个真正的 go/no-go，而不是一个必然成功的实验。**

### 2.3 Aim 1 — 区分转录 vs 降解（零成本起步，9 个月内可完成）
**实验** 在你已发表的两个模型的**存档组织**上：① qPCR 测 pri-/pre-/成熟 miR-29a/b/c 三层；② 小 RNA 3′ 末端测序（TAIL-seq 思路，PMID 24582499）测尿苷化比例；③ 与纤维化程度（胶原定量）做相关。
**体系**：MYBPC3 缺失心脏（CV #7）+ SAA3 缺失 DSS-IBD 肠（CV #5）——**两个不同器官，同一逻辑**，这是几乎无人具备的对照。

### 2.4 Aim 2 — TUT4/7 是否是执行者
**实验** TUT4/TUT7 单敲与双敲（siRNA + ASO 两种方式互为对照）→ miR-29 末端状态与半衰期 → 胶原读出；DIS3L2 敲低验证下游；类器官纤维化模型复现（模型依据 PMID 25828392）。
**关键对照** 必须同时检验「加工层 vs 降解层」：若 TUT4/7 敲低同时改变前体加工，则效应不能归因于降解（依据 P4 的反例）。

### 2.5 Aim 3 — 可药控性
**实验** ASO 阻断 miR-29 的尿苷化位点 / TUT4-7 抑制剂（若可得）→ 纤维化消退读出；人源验证用狭窄型克罗恩病样本的分子标记对齐（PMID 42622514），病理亚群参照 TWIST1⁺FAP⁺ 成纤维细胞（PMID 39024569）。
**临床语境** IBD 纤维化的未满足需求与终点取自 PMID 27720839（*Gastroenterology* 综述）；**心、肠纤维化目前零获批药**——这是 Significance 的核心数字。

### 2.6 时间线 · 目标产出 · 放弃条件
- **0–9 月**：Aim 1 完成（存档样本，启动成本接近零）。
- **9–12 月**：第一篇投稿（*JCI Insight* / *Cell Death & Disease* / 消化或心血管专业刊）。
- **定位**：这是「保产出、养实验室」的现金流方向，与方向 1 的高风险互补。
- **放弃条件**：两个器官模型都测不到末端修饰差异，且前体同步下降 → 转向「miR-29 丰度的其他调控机制（AGO 载荷 / TDMD 触发转录本）」，或把资源并入方向 1。

---

# 方向 3 · 乳酸/乳酰化对小 RNA 稳态的调控（身份标签）
## Direction 3 · Lactate & lactylation as an input to small-RNA homeostasis

### 3.1 一句话假设
乳酸及蛋白乳酰化直接修饰 AGO2 / ZSWIM8 / TUT4-7，重编程 miRNA 稳态。

### 3.2 科学前提 —— 先例已经存在，而且是 RNA 酶
| # | 前提 | 等级 | 依据 |
|---|---|---|---|
| P1 | **RNA 修饰酶可被乳酰化并改变功能** | `[已发表]` | **PMID 35320754（METTL3 乳酰化 → m6A，*Mol Cell* 2022）；37863889（METTL16 乳酰化）** |
| P2 | 乳酰化有明确的上游酶学机制 | `[已发表]` | PMID 38653238（AARS1 是乳酸感受器兼乳酰转移酶，*Cell* 2024）；药理工具已有 PMID 42744818 |
| P3 | 非组蛋白乳酰化可改变蛋白–核酸互作 | `[已发表]` | PMID 38128537（MRE11 乳酰化 → 同源重组） |
| P4 | 代谢物直接修饰 RNA 机器的更广范式 | `[已发表]` | PMID 33434505（R-2HG）；38769664（NSUN2/m5C 的代谢重编程） |
| P5 | 乳酸/乳酰化对 **miRNA 降解机器** 的作用 | `[待测]` | 检索 632 篇候选池中未见报道 —— **这是真空白** |

**为什么是你**：你有一作论文完整证明「乳酸 → 胆固醇合成 → 病毒复制」的因果链（PMID 见 CV #8），乳酸是你手上的现成工具而非新学的技术。全世界同时具备「乳酸因果链经验 + miRNA 降解机器语境」的人极少。

### 3.3 三个 Aim（压缩版）
- **Aim 1** 乳酸处理 / 糖酵解抑制 → AGO2、ZSWIM8、TUT4/7 免疫沉淀 + 泛乳酰化 western 筛查。
- **Aim 2** 质谱定位乳酰化位点（**必需质谱合作者**）→ 用你的碱基编辑在内源位点做位点突变（K→R 去修饰、K→Q 拟修饰）→ 测 miRNA 半衰期。
- **Aim 3** 在你的疾病体系里验证：乳酸高的微环境（炎症肠、缺血心肌）是否对应 miRNA 稳态改变。

### 3.4 定位 · 风险 · 放弃条件
- **建议先作为方向 1 主基金里的 Aim 3，或申请探索性/种子基金**，不要一开始就独立立项。
- **时间线** 18–30 个月；高风险高回报。
- **风险** 乳酰化可能只是间接效应（经 pH 或代谢通量改变）——必须做 pH 匹配对照与非代谢性酸化对照。
- **放弃条件** 若位点突变不改变 miRNA 半衰期 → 降级为方向 1 的补充 Aim，不独立立项。

---

# 方向 4 · 类器官 TDMD 报告平台（资源/合作牌）
## Direction 4 · An organoid TDMD reporter platform

### 4.1 一句话目标
建立疾病特异的类器官 + TDMD 荧光报告系统，把 miRNA 降解动态变成可定量、可筛选的活体读出。

### 4.2 前提与空白
- 类器官已可用于抗纤维化药评价 `[已发表]` PMID 25828392；操作方案 PMID 42763855。
- TDMD 极少在类器官/大动物层面做因果验证 `[待测]` —— 现有工作基本止于细胞系（对比 PMID 37532519、29887379）。
- 体内 miRNA 靶标鉴定已有比 iCLIP 更可行的方法 `[已发表]` PMID 32497496。

### 4.3 三个 Aim
- **Aim 1** 构建 TDMD 荧光报告（双色比值读出：报告 miRNA vs 对照 miRNA），**用内源位点敲入而非质粒**，降低批次噪声。
- **Aim 2** 移植进你已有的肠类器官与纤维化读出体系，标定动态范围与批次变异（类器官定量标准化是公认弱点，必须自己给出 CV%）。
- **Aim 3** 小规模化合物/遗传筛选，产出「能改变 miRNA 半衰期的干预清单」。

### 4.4 定位
**不作为独立学术主线，而是「资源牌」**：平台成果易发方法学论文、易与临床和药企谈合作、易拿平台类经费，适合作为 PI 起步的谈判资本。风险是平台易被复制——差异化必须落在**独特读出 + 你自己的疾病模型**，而不是「我们也做类器官」。

---

# 方向 5 · 碱基编辑解剖 TDMD 的功能语法（方法学手术刀）
## Direction 5 · Dissecting the TDMD grammar by base editing

### 5.1 一句话目标
在内源位点逐个敲入/破坏磷酸化位点与底物识别位点，解析 ZSWIM8 决定「降解谁、何时降解」的功能语法。

### 5.2 前提
- Prime editing 与碱基编辑可在内源位点高效引入点突变 `[已发表]` PMID 31634902 / 31937940；规模化变异评估范式 PMID 33606977。
- ZSWIM8 的底物识别语法未解 `[待测]`；结构约束见 PMID 41851464、31353209。
- **竞争提示**：PMID 41542392（2026 预印本）正在做 TDMD 特异性机制——本方向必须与其划清界线，或转为合作。

### 5.3 定位
**作为方向 1/3 的机制手术刀，不独立立项。** 它的价值是让方向 1 的关键结论建立在内源位点突变而非过表达之上——这一点对审稿人极重要，而多数 RNA 实验室做不到，你能做。

---

# 五方向决策表 / Decision matrix

| 方向 | 新颖度 | 难度 | 启动成本 | 首篇时间 | 可持续性 | 建议定位 |
|---|---|---|---|---|---|---|
| **1 AMPK–ZSWIM8–代谢记忆** | 高 | 中-高 | 中 | 12–18 月 | 4.4 | **主线（冲顶刊与大基金）** |
| **2 TUT4/7–miR-29 纤维化** | 中-高 | 中 | **接近零** | **9–12 月** | 4.4 | **主线（保产出）** |
| **3 乳酸/乳酰化 × 小 RNA** | **最高（真空白）** | 高 | 中（需质谱合作） | 18–30 月 | 3.3→上升 | 方向 1 的 Aim 3 / 种子基金 |
| **4 类器官 TDMD 报告平台** | 中 | 低-中 | 中 | 12–18 月 | 3.4 | 资源牌、合作与平台经费 |
| **5 碱基编辑解剖 TDMD** | 中 | 中 | 低（你已有技能） | 随 1/3 | — | 机制手术刀，不独立立项 |

**组合建议**：**1 + 2 为双主线**（一高新颖度、一快产出，共用 miR-29 叙事），**3 作为 1 的 Aim 3** 用来在申请书里凸显「只有我能做」，**4/5 写进每个 Aim 的可行性段落**。

**明确退出**：胃癌 lncRNA-Wnt 线（VAX2/SNHG9、Linc01189、Linc02139）与「兽医病毒」作为独立方向——理由见主报告第 4/5 节。

---

# English summary

Five proposals under one thesis: metabolic and signalling state controlling miRNA decay and 3′-end modification, and thereby the reversibility of chronic disease. Every mechanistic premise is graded `[published]` with a PMID, `[computed in this project]` (the AMPK PSSM — hypothesis-generating only, the score is not evidence), or `[untested]`.

**Direction 1 (flagship)** — AMPK phosphorylates ZSWIM8 to accelerate TDMD of metabolic miRNAs, converting transient metabolic insult into durable memory. Aim 1 is a 12-month go/no-go: in-vitro kinase assay on recombinant disordered-region fragments (WT vs S→A) with a canonical AMPK substrate on the same gel, Phos-tag stoichiometry, MS site localisation above 0.75 probability, and cellular validation with two mechanistically distinct AMPK agonists plus AMPKα1/α2 double knockout. Aim 2 measures half-life by Act-D chase plus an orthogonal 4sU/SLAM-seq approach, with S608A/S608D installed at the **endogenous locus** by base editing rather than overexpression. Aim 3 tests memory strength after a glucose pulse in organoids and T2D pig material. Explicit abandonment condition at 12 months with a named fallback.

**Direction 2 (fastest)** — TUT4/7 uridylation of miR-29 as a druggable fibrosis checkpoint, startable on banked tissue from his own two published organ models at near-zero cost. Crucially, the literature already offers a **strong competing explanation**: TGF-β/Smad3 suppresses miR-29 transcriptionally (PMID 21784902, 22095944). The proposal therefore makes its first experiment the pri/pre-versus-mature ratio, which discriminates the two mechanisms — a genuine go/no-go rather than a guaranteed result. It must also separate the processing layer from the decay layer, because uridylation is known to *promote* processing in other contexts (PMID 23063654, 39054354).

**Direction 3 (identity marker)** — lactate/lactylation as an input to the small-RNA machinery. Precedent is real and recent: lactylation of the RNA-modifying enzymes METTL3 and METTL16 changes their function (PMID 35320754, 37863889), and AARS1 is an established lactate sensor and lactyltransferase (PMID 38653238). No report of lactate acting on the miRNA decay machinery appeared in a 632-paper candidate pool — a genuine gap. Requires a mass-spectrometry collaborator; run it as Aim 3 of Direction 1, not standalone, and control for pH and non-metabolic acidification.

**Direction 4** — an organoid TDMD reporter platform: a resource and collaboration asset rather than an academic identity, differentiated by unique read-out plus his own disease models, with batch CV% reported honestly.

**Direction 5** — base editing to dissect the TDMD grammar at endogenous loci: the mechanistic scalpel that lets Direction 1's key claims rest on endogenous point mutants rather than overexpression, which most RNA labs cannot do.

**Recommended combination:** 1 + 2 as twin core lines sharing the miR-29 narrative, 3 as Aim 3 for differentiation, 4/5 in the feasibility paragraphs. Deliberately exit the lncRNA gastric-cancer line and veterinary virology as standalone directions.
