# 各方向技术与实验全清单 / Complete Technique & Experiment Inventory by Direction
### Xiaodong ZOU · 2026-09-28

**读法** 每张表的列固定为：**技术 → 用途 → 你的现状 → 关键参数 → 必须的对照 → 常见失败模式 → 学习路径与时间 → 依据 PMID**。
「你的现状」四档：**✅ 已具备**（CV 明确列出）· **🟡 部分**（有相邻技能可迁移）· **🔴 需新学** · **🤝 需合作者**（不建议自己做）。
关键参数中的 `〔FILL〕` 表示**必须从对应 PMID 里抄到具体数值后再动手**——这些格子填完就是你的 Methods 段落。

---

## 0 · 总技能矩阵 / Master skills matrix

| 技能 | 现状 | 方向 1 | 方向 2 | 方向 3 | 方向 4 | 方向 5 | 学习时间 |
|---|---|---|---|---|---|---|---|
| CRISPR/Cas9 · ABE · BE4 设计与应用 | ✅ | ● | ○ | ● | ● | ●●● | 已具备 |
| 杂交瘤单克隆抗体制备 | ✅ | **●●●** | ○ | ● | — | — | 已具备 |
| 类器官培养与表型读出 | ✅ | ● | ●● | ○ | **●●●** | ○ | 已具备 |
| 小鼠/大动物模型、SCNT、胚胎移植、病理 | ✅ | ●● | ●● | ○ | ● | — | 已具备 |
| IHC/组织切片/流式 | ✅ | ● | ●● | ● | ●● | — | 已具备 |
| 细胞电穿孔、克隆、敲除/过表达细胞系 | ✅ | ●● | ●● | ●● | ● | ●● | 已具备 |
| R + GO/KEGG/GSEA | ✅ | ● | ● | ● | ● | — | 已具备 |
| **smallRNA-seq 建库与分析** | 🔴 | **●●●** | **●●●** | ●● | ●● | ● | **2–3 个月（lab 内部可学）** |
| **RNA 半衰期测定（Act-D chase）** | 🔴 | **●●●** | ●● | ●● | ● | — | **1 个月** |
| **小 RNA 3′ 末端 / 尾巴测序** | 🔴 | ● | **●●●** | ● | — | — | 2 个月（依赖测序平台） |
| **激酶生化（重组蛋白 + 体外激酶反应）** | 🔴 | **●●●** | — | ● | — | ● | **2–3 个月（建议借组）** |
| Phos-tag SDS-PAGE | 🔴 | ●● | — | ○ | — | — | 2 周 |
| AGO-RIP | 🟡（有 IP 基础） | ●● | ●● | ●● | ● | ● | 1–2 个月 |
| 4sU 代谢标记 / SLAM-seq 思路 | 🔴 | ●● | ● | ● | — | — | 1–2 个月 |
| 蛋白纯化（含无序区片段） | 🔴 | ●● | — | ● | — | — | 2 个月 |
| **磷酸化 / 乳酰化质谱** | 🤝 | **●●●** | ○ | **●●●** | — | — | 不自己做：谈 core + 2 周学读数据 |
| 结构生物学（位点可及性判读） | 🤝 | ● | — | ○ | — | ● | 不自己做：读现成结构 |
| 生信深化（定量流程、半衰期建模、Python/Snakemake） | 🟡 | ●● | ●● | ● | ●● | ● | 3 个月，持续 |
| 临床样本获取（人纤维化组织） | 🤝 | — | **●●●** | ○ | ●● | — | 谈合作 |

●●● 关键路径 · ●● 重要 · ● 有用 · ○ 边缘 · — 不涉及

---

## 1 · 方向 1：AMPK–ZSWIM8–代谢记忆

### 1A 激酶生化（Aim 1 的核心，也是你最大的技术缺口）

| 技术 | 用途 | 现状 | 关键参数 | 必须的对照 | 常见失败模式 | 学习路径/时间 | 依据 |
|---|---|---|---|---|---|---|---|
| 重组蛋白表达纯化 | 做 ZSWIM8 无序区片段（约 560–660 aa）WT/S608A/S609A/双突变 | 🔴 | 表达体系 *E. coli* BL21；标签 MBP 或 SUMO（提高无序区可溶性）；诱导 16 °C 过夜 | 空载体纯化物做阴性；考马斯胶确认纯度与完整性 | 无序区易被蛋白酶切降解 → 全程加抑制剂、4 °C 操作；全长 1837 aa 几乎不可能纯化，别尝试 | 借生化组做一轮，2 个月 | — |
| **体外激酶反应** | 直接判定 AMPK 是否磷酸化 S608/S609 | 🔴 | ATP 浓度〔FILL〕；Mg²⁺〔FILL〕；反应时长〔FILL〕；酶:底物比〔FILL〕；AMP 或 A-769662 激活 | **经典 AMPK 底物肽（SAMS 类）同板阳性对照** —— 没有它，阴性结果毫无信息量；无激酶管；S→A 突变体 | 激酶批次活性差异大 → 每次用阳性对照标定；ATP 过量导致非特异 | 与阳性对照一起建立，2–3 个月 | 11902845, 7698321 |
| **Phos-tag SDS-PAGE** | 定量多位点磷酸化化学计量比（S608 在无序区，正适用） | 🔴 | 胶内 Phos-tag 浓度〔FILL〕；Mn²⁺〔FILL〕 | 磷酸酶处理样品；非磷酸化重组蛋白 | 无序蛋白在 Phos-tag 胶上迁移异常 → 需自己标定 | 2 周 | 32696389 |
| **质谱定位磷酸化位点** | 确认修饰发生在 S608 而非邻近位点 | 🤝 | 位点定位概率 **>0.75** 才可作结论；富集方式〔FILL〕；最低上样量〔FILL〕 | 未处理对照；S→A 突变体（位点应消失） | 报告了位点但概率低 → 不能写进结论 | 谈 MSKCC core；读数据 2 周 | 27667718, 25683918 |
| **自制 phospho-S608 单抗** | 突破领域最大的试剂瓶颈 | ✅（杂交瘤能力） | 抗原肽设计：以 S608 为中心 ±7 aa，磷酸化与非磷酸化两版 | **磷酸酶处理 + S608A 突变体双阴性验证**（缺一不可） | 抗体识别序列而非磷酸化状态 → 必须做双阴性 | 你已具备；免疫周期约 4–6 个月，**Q2 就要启动** | 15728188 |

### 1B 细胞与代谢处理

| 技术 | 用途 | 现状 | 关键参数 | 必须的对照 | 常见失败模式 | 依据 |
|---|---|---|---|---|---|---|
| AMPK 药理激活 | 建立「能量应激 → 表型」因果 | 🟡 | AICAR 浓度〔FILL〕；A-769662 浓度〔FILL〕；时长〔FILL〕 | **两种机制不同的激动剂互为对照**（AICAR 有 AMPK 非依赖效应）；Compound C 抑制（但特异性差，只作辅助） | 只用 AICAR → 审稿人必然质疑脱靶 | 26616193 |
| AMPK 遗传对照 | 排除药理脱靶 | 🟡 | AMPKα1/α2 双敲除细胞 | 回补野生型 AMPK 恢复表型 | 单敲除代偿 → 必须双敲 | 26616193 |
| 代谢应激 | 生理化的能量应激 | ✅ | 葡萄糖剥夺时长〔FILL〕；2-DG 浓度〔FILL〕 | 等渗对照；细胞活力检测（排除毒性） | 处理过强 → 细胞应激泛化，结果不特异 | 25481708 |

### 1C RNA 稳定性（Aim 2 的核心）

| 技术 | 用途 | 现状 | 关键参数 | 必须的对照 | 常见失败模式 | 依据 |
|---|---|---|---|---|---|---|
| **Actinomycin D chase** | 测 miRNA 半衰期 | 🔴 | Act-D 浓度〔FILL〕；取样时点〔FILL〕；**总时长限制在 8 h 内** | **先在已知短命 miRNA 上做阳性对照**，跑通再上候选；spike-in 归一化 | Act-D 本身扰动细胞 → 长时程结果不可信；归一化方式选错会把差异抹平 | 21447562, 31519739 |
| **smallRNA-seq** | 全局定量与候选发现 | 🔴 | 测序深度〔FILL，末端分析需比常规定量更深〕；建库方式〔FILL〕 | 技术重复 ≥2；spike-in | 接头偏倚导致特定 miRNA 系统性失真 | 31519739 |
| 4sU / SLAM-seq 思路 | 正交验证半衰期 | 🔴 | 标记时长〔FILL〕；转化率〔FILL〕 | 未标记对照；转化率低会把结果压平 | 单一方法的偏倚必须用第二种方法排除 | 28945705 |
| AGO-RIP | 区分「降解」与「载荷变化」 | 🟡 | 上样量〔FILL〕；洗涤严格度〔FILL〕 | IgG 对照；输入样本 | 洗涤过松 → 背景高 | 32497496, 33853897 |
| 内源位点点突变（ABE/BE4） | S608A/S608D 敲入，**替代过表达** | ✅ | 编辑窗口与 sgRNA 设计；单克隆筛选 | 未编辑同批细胞；测序确认基因型；旁编辑检查 | 旁编辑（bystander）改变邻近氨基酸 → 必须全长测序确认 | 31937940, 31634902, 33606977 |

### 1D 疾病模型（Aim 3）
类器官高糖脉冲—撤除模型（✅ 已具备）；T2D 小型猪样本（✅ 你自己的模型，但**可及性待确认**）；读出为 miR-29/33/375 丰度 + 靶基因恢复曲线 + 纤维化/代谢表型。对照：持续高糖组、never-exposed 组、撤除后不同时长组。

---

## 2 · 方向 2：TUT4/7–miR-29 纤维化检查点

| 技术 | 用途 | 现状 | 关键参数 | 必须的对照 | 常见失败模式 | 依据 |
|---|---|---|---|---|---|---|
| **pri/pre/成熟 miR-29 三层 qPCR** | **区分转录抑制 vs 降解加速 —— 这是本方向的 go/no-go** | ✅ | 三套引物（pri 跨内含子、pre 跨发夹、成熟体茎环法） | 必须三层同测；只测成熟体无法区分两种机制 | **只测成熟体 → 结论被 TGF-β/Smad3 转录解释完全覆盖** | 21784902, 22095944 |
| **小 RNA 3′ 末端测序** | 测尿苷化比例与尾巴长度 | 🔴 | 可分辨长度〔FILL〕；建库需针对小 RNA 改造 | 体外合成的已知尾长标准品 | 无法分辨单尿苷 vs 寡尿苷 → 结论不成立（两者功能相反） | 24582499, 23063654 |
| TUT4/TUT7 敲低 | 判定执行者 | ✅ | siRNA 与 ASO **两种方式互为对照**；单敲 + 双敲 | 加扰序列对照；回补实验 | 单敲代偿 → 必须双敲 | 19701194 |
| DIS3L2 敲低 | 验证下游降解酶 | ✅ | — | 若 DIS3L2 敲低能稳定尿苷化底物，则通路闭合 | — | 23594738 |
| **加工层 vs 降解层判别** | 排除「尿苷化促进加工」的反例解释 | 🔴（概念） | 同时测前体加工效率与成熟体半衰期 | 必做 —— 否则效应不能归因于降解 | 忽略这一步是本方向最可能被拒的理由 | 23063654, 39054354 |
| 胶原/纤维化定量读出 | 表型终点 | ✅ | 羟脯氨酸定量、Sirius red/Masson 定量（非仅染色）、类器官硬度 | 未处理与 TGF-β 刺激两端标定 | 只做定性染色 → 无效应量 | 25828392 |
| 存档组织分析 | **零成本起步** | ✅ | — | 两器官（心 MYBPC3 / 肠 SAA3）平行分析 | 样本 RNA 降解 → 先测 RIN | CV #5, #7 |
| 人源验证 | 提升转化说服力 | 🤝 | 狭窄型克罗恩病样本 | 对齐已发表分子标记与病理亚群 | — | 42622514, 39024569, 27720839 |

---

## 3 · 方向 3：乳酸/乳酰化 × 小 RNA 稳态

| 技术 | 用途 | 现状 | 关键参数 | 必须的对照 | 常见失败模式 | 依据 |
|---|---|---|---|---|---|---|
| 乳酸/糖酵解干预 | 建立代谢输入 | ✅（你的强项） | 乳酸钠浓度〔FILL〕；糖酵解抑制剂〔FILL〕；时长〔FILL〕 | **pH 匹配对照 + 非代谢性酸化对照** —— 乳酸效应常被 pH 混淆 | 不做 pH 对照 → 结论直接被推翻 | 38653238 |
| 泛乳酰化 western 筛查 | 先看有没有 | 🔴 | pan-Kla 抗体〔FILL 目录号〕 | 乳酸处理 vs 未处理；已报道的阳性底物（如 METTL3）作对照 | 泛抗体特异性有限 → 必须质谱确认 | 35320754, 37863889 |
| AGO2/ZSWIM8/TUT4-7 免疫沉淀 | 富集候选底物 | 🟡 | 上样量〔FILL〕 | IgG 对照 | — | 33853897 |
| **乳酰化位点质谱** | 定位修饰位点 | 🤝 | 富集策略〔FILL〕；最低上样量〔FILL〕；定位概率 >0.75 | 未处理对照 | 化学乳酰化假阳性 → 需酶依赖性验证 | 35320754, 38653238 |
| 位点突变（K→R / K→Q） | 功能验证 | ✅（碱基编辑） | 内源位点敲入 | 未编辑同批；回补 | 赖氨酸位点常同时被乙酰化 → 需排除修饰竞争 | 38128537 |
| 酶学归因 | 是酶催化还是非酶化学反应 | 🔴 | AARS1 敲低/抑制剂 | AARS1 抑制剂已有（2026） | 若为非酶反应，「通路」叙事不成立 | 38653238, 42744818 |

---

## 4 · 方向 4：类器官 TDMD 报告平台

| 技术 | 用途 | 现状 | 关键参数 | 必须的对照 | 常见失败模式 | 依据 |
|---|---|---|---|---|---|---|
| 肠类器官培养 | 平台底座 | ✅ | 培养基配方、传代周期 | — | 批次异质性 | 42763855 |
| **TDMD 双色荧光报告** | 定量读出 | 🔴（但编辑技能可迁移） | 报告 miRNA 位点 + 对照 miRNA 位点；**内源敲入而非质粒** | 无靶标位点的报告作阴性 | 质粒拷贝数差异 → 比值读出必须内源化 | 25828392（读出思路） |
| 类器官纤维化诱导 | 疾病情境 | ✅ | TGF-β 浓度〔FILL〕；诱导时长〔FILL〕 | 未诱导；已知抗纤维化药阳性对照 | — | 25828392 |
| **批次变异标定** | 平台可信度的关键 | 🔴（概念） | 报告每个指标的 **CV%**，跨 ≥3 批 | 同批内重复 vs 跨批重复分别报告 | 不报 CV% → 平台论文被拒的首要理由 | — |
| 小规模筛选 | 产出干预清单 | 🟡 | 孔板格式、Z′ 因子 | 阳性/阴性对照孔每板都要有 | Z′ < 0.5 不能做筛选 | — |

---

## 5 · 方向 5：碱基编辑解剖 TDMD 功能语法

| 技术 | 用途 | 现状 | 关键参数 | 必须的对照 | 常见失败模式 | 依据 |
|---|---|---|---|---|---|---|
| ABE/BE4 位点敲入 | 磷酸化位点与识别位点逐个突变 | ✅ | 编辑窗口、sgRNA 设计、编辑效率 | 未编辑同批；基因型测序确认 | **旁编辑**改变邻近残基 → 必须测序确认整个窗口 | 31937940, 33606977 |
| Prime editing | 碱基编辑做不到的替换 | 🔴 | pegRNA 设计、效率范围〔FILL〕 | 同上 | 效率低 → 需单克隆筛选，周期长 | 31634902 |
| 变异规模化评估 | 把位点突变做成筛选 | 🔴 | 文库设计、读出方式 | — | — | 33606977 |
| 体内编辑 | 器官层面位点突变 | 🟡 | 递送方式（LNP/AAV）、器官效率〔FILL〕 | 未编辑动物 | 递送效率决定可行性 | 31937940 |

---

## 6 · 两个别人想不到、但你独有的技能迁移

1. **杂交瘤单抗 → 自制 phospho-ZSWIM8(S608) 抗体。** 方向 1 最大的技术瓶颈是「没有好的磷酸化抗体」，而这恰好是你 CV 上明确列出的现成能力。做出来之后，这个试剂本身就是你在领域里的护城河与合作货币。**免疫周期 4–6 个月，所以必须在 Q2 启动，不能等到需要时再做。** 验证必须做磷酸酶处理 + S608A 突变体双阴性（PMID 15728188）。
2. **碱基编辑 → 内源位点点突变，而不是过表达。** 审稿人对「内源位点点突变」的信任度远高于过表达质粒，而多数 RNA 生物学实验室不具备这个能力。方向 1 的 Aim 2、方向 3 的 Aim 2、方向 5 的全部，都应该建立在内源编辑之上。这一条能把你的机制结论的可信度整体提高一档。

---

## 7 · 必须找合作者的四处（不要自己做）

| 缺口 | 为什么不自己做 | 怎么谈 | 卡住哪个方向 |
|---|---|---|---|
| **磷酸化/乳酰化质谱** | 设备与流程门槛高，自己做会浪费半年 | MSKCC proteomics core，**Q1–Q2 就去谈**，明确送样量与周期 | 方向 1 Aim 1、方向 3 Aim 2 |
| 结构生物学 | 不需要自己解结构，只需读懂现成结构 | 找结构组问一次「S608 所在无序区是否可及」 | 方向 1 的位点论证 |
| 人纤维化临床样本 | 伦理与获取周期长 | 消化科/心内科合作，用你已有的 IBD 背景切入 | 方向 2 的转化说服力 |
| 深度生信建模 | 全局半衰期建模需要专门统计能力 | 找生信合作者共通讯 | 方向 1 Aim 2 的全局分析 |

---

## 8 · 学习顺序（与 12 周阅读计划对齐）

| 时间 | 学什么 | 为什么这个顺序 |
|---|---|---|
| 第 1–2 月 | smallRNA-seq 建库 + 独立分析一套数据 | 这是方向 1/2 共同的关键路径，且 **lab 内部零成本可学**，不学它什么都做不了 |
| 第 2–3 月 | Act-D chase 半衰期测定（先做阳性对照） | 有了测序能力才能测半衰期 |
| **第 2 月（并行启动）** | **phospho-S608 抗体免疫程序** | 周期 4–6 个月，是整张表上**唯一必须提前启动**的项目 |
| 第 3–5 月 | 激酶生化（借组做一轮） | 需要先有纯化片段；与抗体并行 |
| 第 4–6 月 | 小 RNA 3′ 末端测序 | 方向 2 Aim 1 的关键；依赖测序平台排期 |
| 第 5–7 月 | AGO-RIP + 4sU 正交验证 | 用于区分降解 vs 载荷、排除单方法偏倚 |
| 持续 | 生信深化（Python/流程化/半衰期建模） | 目标是「别人不能替你分析你的数据」 |
| 随时 | 质谱 core 谈判 | 越早越好，不占你自己的时间 |

---

# English summary

A technique-by-technique inventory for all five directions, with fixed columns: technique, purpose, his current status (**have / partial / must learn / needs collaborator**), key parameters, mandatory controls, common failure modes, learning path and time, and the source PMID. Parameter cells marked `〔FILL〕` must be copied from the cited paper before bench work begins — filling them in produces the Methods section.

The master matrix shows the critical path is **small-RNA methodology**, which is learnable inside his current lab at zero cost, followed by half-life measurement and kinase biochemistry. Three controls are called out as non-negotiable because omitting them invalidates the result rather than merely weakening it: a canonical AMPK substrate on the same gel as any in-vitro kinase assay; **pri/pre-versus-mature measurement** in Direction 2, without which the result is fully explained by the established TGF-β/Smad3 transcriptional mechanism; and a pH-matched plus non-metabolic-acidification control in Direction 3, without which any lactate effect is confounded.

Two skill transfers from his own CV are singled out as unusually high-leverage: hybridoma capability lets him **raise his own phospho-ZSWIM8(S608) antibody** against the field's main reagent bottleneck — and because the immunisation cycle runs 4–6 months, this is the one item that must start in Q2 rather than when it is needed; and base editing lets him install point mutants at **endogenous loci** instead of relying on overexpression, which raises the credibility of every mechanistic claim and is something most RNA-biology labs cannot do.

Four gaps should be filled by collaborators rather than learned: phospho/lactyl mass spectrometry (mandatory, and the negotiation should start in Q1–Q2), structural interpretation of site accessibility, human fibrosis specimens, and deep computational half-life modelling.
