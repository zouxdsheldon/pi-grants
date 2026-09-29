# 三大方向 × 21 个子方向 · 完整立项与文献清单
### Xiaodong ZOU · 2026-09-28

每个方向展开 **7 个子方向**，合计 **21 个**，覆盖五个层次：机制生化 / 底物特异性 / 疾病落点 / 方法工具 / 转化治疗。
每个子方向都是**可独立写成一个 Aim** 的粒度，并配 **4 篇真实文献 + 逐篇笔记**（共 84 篇笔记）。

---

## 关于「拥挤程度」这一栏 —— 请先读，否则会严重误读

每个子方向的拥挤程度都用 **PubMed 实时检索**核查过，但**判定依据不是检索式的全交集**：

> **把 3 个以上词用 AND 串起来，PubMed 返回 0 篇是常态，这不是研究空白的证据，只是检索式太窄。**

实测证据：第一轮 21 条检索式里有 **20 条报 0 篇**，看起来像"遍地空白"。逐条查下去发现两个原因：
1. **引号短语不在 PubMed 短语索引里会被整条丢弃**，AND 随即塌成 0 —— esearch 只在 `warninglist.quotedphrasesnotfound` 里悄悄提一句。去掉单词的引号后，计数才正常。
2. **子句一多，全交集必然为 0** —— 这与该领域是否被研究过无关。

所以本文件的拥挤程度一律按 **子句阶梯的「两两组合最小共现数」** 判定，并把单词计数与两两计数全部列出供你复算。
计数器本身也做过自检：`ZSWIM8[tiab]` = 45 篇、`TUT4[tiab] OR ZCCHC11[tiab]` = 111 篇、`lactylation[tiab]` = 2628 篇（正控）；
`zzqxwv[tiab]` = 0 篇（负控）；`AMPK[tiab] AND ZSWIM8[tiab]` = **0 篇且无短语警告** —— 这是一个**真实的零**，也正是方向 1 的核心前提至今无人直接检验的证据。

**即便两两共现为 0，也只说明这两个词从未在标题/摘要里同时出现，不等于没人想过这个问题。** 全部计数为检索当日值。

---

## 21 个子方向按「最空白」排序（速览）
| 排序 | 编号 | 子方向 | 层次 | 两两最小共现 | 判定 | 首篇预计 |
|---|---|---|---|---|---|---|
| 1 | D1-1 | AMPK直接磷酸化ZSWIM8生化验证 | 机制生化 | 0 篇 | 词对无共现 | 9–12 个月 |
| 2 | D1-2 | S608/S609磷酸化对Cul3招募的影响 | 机制生化 | 0 篇 | 词对无共现 | 9–12 个月 |
| 3 | D1-3 | 代谢miRNA靶标特异性图谱构建 | 底物特异性 | 0 篇 | 词对无共现 | 9–12 个月 |
| 4 | D1-4 | 内源S609A/D敲入小型猪代谢表型 | 疾病落点 | 0 篇 | 词对无共现 | 18–24 个月（受限于小型猪繁育与表型窗口，属于该项目全链条中耗时最长的落点子方向）。 |
| 5 | D1-5 | 能量应激周期中miRNA半衰期动态测定 | 方法工具 | 0 篇 | 词对无共现 | 9–12 个月。 |
| 6 | D1-6 | phospho-ZSWIM8抗体与smallRNA-seq联合诊断平台 | 方法工具 | 0 篇 | 词对无共现 | 14–18个月 |
| 7 | D1-7 | 靶向阻断磷酸化位点逆转代谢记忆的干预策略 | 转化治疗 | 0 篇 | 词对无共现 | 24–30 个月（因依赖 D1 上游因果链先确立，且大动物实验周期长、小分子抑制剂需外部合作开发）。 |
| 8 | D2-1 | TUT4/7尿苷化miR-29生化机制 | 机制生化 | 0 篇 | 词对无共现 | 12–15 个月 |
| 9 | D2-2 | TGF-β/Smad3与TUT4/7双通路解耦 | 机制生化 | 0 篇 | 词对无共现 | 12–15 个月 |
| 10 | D2-4 | 心肠纤维化中TUT4/7表达谱对比 | 疾病落点 | 0 篇 | 词对无共现 | 6–9 个月 |
| 11 | D2-5 | 3′尿苷化标记的半衰期测定工具 | 方法工具 | 0 篇 | 词对无共现 | 12–15 个月 |
| 12 | D2-6 | 类器官TUT4/7敲除抗纤维化筛选 | 方法工具 | 0 篇 | 词对无共现 | 9–12 个月 |
| 13 | D3-1 | 乳酸酶写入者鉴定 | 机制生化 | 0 篇 | 词对无共现 | 14–18 个月（含质谱合作等待期） |
| 14 | D3-2 | ZSWIM8乳酰化位点图谱 | 机制生化 | 0 篇 | 词对无共现 | 14–18 个月 |
| 15 | D3-3 | 乳酰化对AGO2-target亲和力 | 底物特异性 | 0 篇 | 词对无共现 | 12–15 个月 |
| 16 | D3-4 | TUT4/7乳酰化与尿苷化活性 | 底物特异性 | 0 篇 | 词对无共现 | 14–18 个月 |
| 17 | D3-6 | 乳酰化位点定量检测平台 | 方法工具 | 0 篇 | 词对无共现 | 14–18 个月（含质谱合作等待、抗体制备验证周期，较其他子方向更长因涉及从零建立检测平台）。 |
| 18 | D2-3 | miR-29家族3′端序列特异性 | 底物特异性 | 1 篇 | 极少（≤10） | 12–15 个月 |
| 19 | D2-7 | TUT4/7小分子抑制剂转化治疗 | 转化治疗 | 1 篇 | 极少（≤10） | 14–18 个月 |
| 20 | D3-5 | 肿瘤类器官乳酸-miRNA落点 | 疾病落点 | 9 篇 | 极少（≤10） | 12–15 个月 |
| 21 | D3-7 | LDH抑制剂逆转miRNA重编程 | 转化治疗 | 27 篇 | 少人做 | 18–24 个月（依赖前置子方向D3-1至D3-6先确立乳酰化修饰因果关系，本子方向作为该系列的转化验证章节，若前置数据齐备可缩短至12–15个月）。 |

---

# D1 · AMPK–ZSWIM8–代谢记忆

> **主线假设：** AMPK 在能量应激下磷酸化 ZSWIM8(S608/S609)，加速代谢相关 miRNA 的 TDMD，形成可逆的代谢记忆

> **他在这个方向上的独特资产：** 自建透明 AMPK PSSM（S609 98.3 百分位 / S608 96.4）、杂交瘤可自制 phospho 抗体、ABE/BE4 可做内源位点 S→A/D、T2D 小型猪模型（他一作 Cell Death Dis 2019）

> **已知文献状态：** ZSWIM8/Cul3 介导 TDMD 已由 Han 2020 与 Shi 2020 建立；2026 cryo-EM 给了结构；AMPK 底物识别基序 1995 年已定；AMPK 调控 miRNA 有综述但无 TDMD 机器的直接证据

## D1-1 · AMPK直接磷酸化ZSWIM8生化验证
**层次：** 机制生化　｜　**拥挤程度：** 词对无共现（两两最小共现 0 篇，全交集 0 篇）　｜　**首篇预计：** 9–12 个月

> **假设：** 若AMPK在能量应激下直接磷酸化ZSWIM8的S608/S609，则体外激酶反应与自制phospho抗体应检测到磷酸化信号且随AMP/ATP比值上升

**科学前提**

[已发表] ZSWIM8/Cul3 介导的 TDMD 机制已由 Han et al. 2020 (Science) 与 Shi et al. 2020 (Cell) 确立，2026 年 cryo-EM 结构进一步明确了 ZSWIM8 的底物结合界面。[已发表] AMPK 底物识别基序（Φ-X-X-X-S/T-X-X-X-Φ，倾向碱性残基）自 1995 年 Dale et al. 已定，AMPK 调控多种代谢酶已被广泛证实。[本项目计算] 用自建 AMPK PSSM 对 ZSWIM8 全长打分，S608 位列 96.4 百分位、S609 位列 98.3 百分位，提示这两个位点在序列层面符合 AMPK 底物基序的统计特征，但此打分仅为假设生成级别，不构成磷酸化的证据。[待测] 尚无任何文献报道 AMPK 与 ZSWIM8 存在直接或间接的相互作用，此为完全空白，需要从最基础的体外激酶反应开始验证。

**第一个关键实验**

用重组人 GST-ZSWIM8(1-200 或含 S608/S609 的局部结构域，约50–80 kDa 片段)与商业化重组 AMPK-α1β1γ1 holoenzyme 在含 [γ-32P]-ATP 或非放射性 ATP 的体外激酶反应体系中共孵育(37°C，30 min，含 AMP 激活剂梯度 0/50/200 μM)，读出为放射自显影/磷酸化条带强度，或平行用自制 phospho-S608/S609 单抗做 Western blot 定量；同时设置 AMPK 激活剂 AICAR/A-769662 处理 HEK293T 细胞内源 ZSWIM8 免疫沉淀后做同一 phospho 抗体检测，时间点 0/15/30/60 min，每组至少 n=3 次独立重复。

**必须的对照**

必须包含：(1) 激酶死突变 AMPK-α(D157A) 作阴性对照排除非特异磷酸化；(2) ZSWIM8 S608A/S609A 双突变体(不可磷酸化)与 S608D/S609D(磷酸化模拟)作底物侧对照；(3) 无 AMP 激活剂组排除 ATP 非特异磷酸化背景；(4) phospho 抗体特异性验证——用 λ-磷酸酶去磷酸化后信号应消失，且在 S608A/S609A 突变体细胞中信号应完全丢失；(5) 竞争解释排除：本子方向仅涉及蛋白磷酸化的生化验证，不涉及 pri/pre-miRNA 转录调控，故需平行测同一处理下 pri-miR-33/375 水平(qPCR)不受影响，确认磷酸化事件独立于 TGF-β/Smad3 型转录抑制通路，避免与方向2的转录层竞争解释混淆。

**为什么是他能做**

他在杂交瘤单抗制备上有实操经验，可自主定制 phospho-S608/S609 特异性抗体，这是本子方向能否推进的关键瓶颈技术，多数实验室需外包或合作数月才能获得同等抗体。他还熟练使用 ABE/BE4 做内源位点编辑，可以直接在细胞内源 locus 上引入 S608A/S609A 或磷酸化模拟突变，不必依赖过表达系统，这比大多数同行仅能做质粒过表达验证更接近生理状态。他的 T2D 小型猪模型(Cell Death Dis 2019 一作)也为后续体内验证预留了大动物平台。

**可行性**

已有技能可直接上手：杂交瘤制备 phospho 抗体（预计 2–3 个月获得可用抗体并完成特异性验证）、ABE/BE4 内源位点编辑（1–2 个月构建细胞系）。需新学：体外激酶反应体系的建立与优化，激酶生化对他是全新技能，需要 1–2 个月摸索条件或直接购买商业 AMPK holoenzyme 试剂盒降低门槛。质谱定量磷酸化位点验证需要合作（找质谱平台确认 32P/非放射性磷酸化位点特异性），预计需 1 个月联系并送样。总体起步成本中等，无需新增大型设备。

**最大风险与放弃条件**

最大风险：AMPK 与 ZSWIM8 在体外激酶反应中无磷酸化信号（放射自显影/phospho 抗体均阴性），且 AICAR/A-769662 处理细胞内源 ZSWIM8 免疫沉淀后 phospho 抗体信号无变化。放弃条件：若重复三次独立体外激酶实验均阴性，且细胞内 AMPK 激活后 ZSWIM8 磷酸化信号相对基线变化小于 20%（无统计学差异），则判定 AMPK 不直接磷酸化 ZSWIM8，终止 D1 旗舰方向的生化验证路线，退回方向2（miR-29/TUT4-7纤维化）或方向3（乳酸修饰）继续推进，因为这两个方向不依赖此磷酸化事件的确证。

**目标期刊与基金**

目标期刊：Molecular Cell 或 Nucleic Acids Research（机制生化优先投递，若阳性结果扎实可冲 Nature Cell Biology）；适配基金机制：NIH K99/R00（博后转 PI 过渡期）或 NIH R01 的 Exploratory/Developmental Research Grant (R21，高风险高回报机制），亦可申请 AHA 或 ADA 的代谢相关启动基金作为并行支持。

**首篇预计**

9–12 个月

**做成之后的下一步**

若体外激酶反应与细胞内磷酸化信号均为阳性，下一步是用 S608A/S609A 与 S608D/S609D 内源突变细胞系直接测代表性代谢 miRNA（miR-33/miR-375）的半衰期与 TDMD 标志性尾部延伸/降解特征，验证磷酸化状态如何调控 miRNA 稳态动力学。

**拥挤程度核查（可复算）**

检索式：`(AMPK[tiab] OR PRKAA1[tiab]) AND ZSWIM8[tiab] AND (phosphorylation[tiab] OR TDMD[tiab])`

| 层级 | 检索式 | 全库命中 |
|---|---|---|
| 单词 | `(AMPK[tiab] OR PRKAA1[tiab])` | 33823 |
| 单词 | `ZSWIM8[tiab]` | 45 |
| 单词 | `(phosphorylation[tiab] OR TDMD[tiab])` | 342486 |
| 两两 | `(AMPK[tiab] OR PRKAA1[tiab]) AND ZSWIM8[tiab]` | 0 |
| 两两 | `(AMPK[tiab] OR PRKAA1[tiab]) AND (phosphorylation[tiab] OR TDMD[tiab])` | 9536 |
| 两两 | `ZSWIM8[tiab] AND (phosphorylation[tiab] OR TDMD[tiab])` | 34 |
| **全交集** | `(AMPK[tiab] OR PRKAA1[tiab]) AND ZSWIM8[tiab] AND (phosphorylation[tiab] OR TDMD[tiab])` | **0** |

**配套文献与笔记（4 篇）**

#### PMID 42681318 · Target-Directed miRNA Degradation: Mechanisms and Significance.
*Methods in molecular biology (Clifton, N.J.) 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42681318/)

**一句话结论**　这是一篇方法学/综述性质的Methods in Molecular Biology条目，系统梳理TDMD的机制框架（tailing/trimming→Argonaute构象重排→ZSWIM8介导降解），未提供任何新实验数据，仅综述性总结ZSWIM8作为TDMD核心起始因子的已知作用。

**与该子方向的关系**　支持前提：它为D1-1「AMPK磷酸化ZSWIM8加速TDMD」提供机制背景合法性——确认ZSWIM8-TDMD通路本身是被广泛接受的成熟体降解机制，但完全未涉及AMPK或任何磷酸化调控，不构成方法或数据支持。

**方法要点**　摘要提及tailing/trimming是TDMD的常见关联事件、Argonaute构象重排是ZSWIM8介导降解的关键步骤，但没有给出具体实验方案（如激酶反应体系、抗体验证流程），故没有可直接搬用的湿实验方法，仅可搬用其对TDMD机制阶段划分的概念框架用于论文引言/背景陈述。

**效应量**　【摘要未报告数字】读全文时优先补：是否有ZSWIM8结构域示意图标注S608/S609或其他磷酸化/翻译后修饰位点的坐标信息，以及该MiMB方法章节是否附带具体的体外降解检测protocol（如report substrate的half-life数值或Western条带定量范围）。

**它暴露/承认的空白**　摘要明确承认"miRNA turnover的机制远不如转录和生物合成清楚"，且tailing/trimming的机制作用是"context-dependent"（未完全阐明）——这正落在D1-1子方向上，即ZSWIM8活性的上游调控信号（如AMPK磷酸化）仍是完全未被此文覆盖的空白。

**我不相信的一件事**　该摘要将ZSWIM8定位为TDMD的"central initiator"，但未说明其E3连接酶活性本身是否需要翻译后修饰才能被激活或调控——即该文默认ZSWIM8的酶活性是组成性的还是可调节的这一关键问题未被讨论，这直接影响D1-1"AMPK磷酸化促进ZSWIM8活性"假设的先验合理性是否被此文支持或悬置。

**读全文要核对什么**　【需读全文核对】需确认此MiMB方法章节的具体protocol部分是否包含ZSWIM8体外泛素化/降解活性检测的详细步骤（酶浓度、底物、时间点），以及是否有ZSWIM8结构域功能图谱（是否标注S608/S609附近区域属于何种结构域，如RING domain还是底物识别domain），这将决定我GST-ZSWIM8(1-200)片段设计是否覆盖功能必需区域。

**一个可执行动作**　我要在HEK293T细胞内源ZSWIM8免疫沉淀体系中，参照本文对TDMD机制阶段（tailing/trimming→Argonaute重排→ZSWIM8降解）的框架设计实验时序，预期AICAR/A-769662处理后0/15/30/60 min用自制phospho-S608/S609抗体检测到时间依赖性磷酸化信号增强，同时用已知TDMD靶点miRNA（如miR-29经其非完全互补靶点触发降解）的稳态水平变化作为下游功能读出，以区分ZSWIM8磷酸化对成熟miRNA降解速率的直接因果贡献。

#### PMID 42608480 · Canonical and non-canonical miRNA degradation shapes state transitions and stemness in breast cancer.
*The EMBO journal 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42608480/)

**一句话结论**　该文用CRISPRi敲低ZSWIM8结合miRNA-seq和AGO2-eCLIP，在乳腺癌细胞中系统鉴定出19个高置信TDMD底物（含miR-29b-3p、miR-33a/b-5p），并发现NREP触发miR-29b-3p降解与TNBC干性亚群相关；同时报道一种不依赖ZSWIM8/蛋白酶体的非经典TDMD机制（SERPINE1触发miR-30c-5p降解）介导紫杉醇耐药。

**与该子方向的关系**　支持前提：为D1-1提供了miR-29b-3p、miR-33a/b-5p确系ZSWIM8依赖TDMD底物的独立证据，说明S608/S609磷酸化调控的下游底物选择在生理相关性上是成立的；但同时是竞争风险——它用CRISPRi/miRNA-seq/eCLIP这套细胞水平证据链已经把"ZSWIM8-TDMD控制miR-29/33"这一层论证做完，若不能把证据推进到"AMPK直接磷酸化S608/S609"这一激酶生化步骤，D1-1会显得只是重复其底物鉴定而非机制创新。

**方法要点**　可直接搬用：CRISPRi敲低ZSWIM8+miRNA-seq的差异表达底物筛选流程，以及用AGO2-eCLIP定位miRNA-靶标结合位点变化来区分成熟体降解与转录调控的思路，这正好回应"必须区分pri/pre vs成熟体"的竞争解释要求。

**效应量**　【摘要未报告数字】读全文时优先补：19个TDMD底物中miR-29b-3p/miR-33a/b-5p的CRISPRi后miRNA-seq差异倍数、ZSWIM8依赖性统计显著性（p值/FDR）、以及NREP/SERPINE1触发降解的效应量（fold change或半衰期数据）。

**它暴露/承认的空白**　摘要明确承认TDMD"在人类癌症中的作用largely unexplored"，且完全未涉及上游激酶（AMPK或任何应激感应通路）如何调控ZSWIM8活性或S608/S609磷酸化状态，这正是D1-1要填的空白——本文只做到"底物层面"，未触及"ZSWIM8本身如何被翻译后修饰激活"这一生化上游环节。

**我不相信的一件事**　本文的TDMD底物鉴定依赖CRISPRi敲低后miRNA-seq差异表达，但miRNA-seq测的是稳态丰度，无法直接证明降解速率变化（半衰期），也无法排除ZSWIM8敲低通过非TDMD途径（如影响其他RNA结合蛋白稳定性）间接改变miR-29b-3p/miR-33水平；这与他自己在D1-1里被要求做的"区分pri/pre vs成熟体"是同一漏洞，本文并未做pulse-chase或actinomycin-D半衰期实验来锁定"降解"而非"合成受阻"。

**读全文要核对什么**　【需读全文核对】需确认：(1) 19个TDMD底物的判定标准图（是否有配对的pri-miRNA/pre-miRNA定量对照排除转录效应）；(2) AGO2-eCLIP鉴定NREP/SERPINE1作为triggering transcript的结合位点具体序列特征（是否含TDMD经典的3'延伸互补结构）；(3) 非经典（ZSWIM8非依赖）miR-30c-5p降解机制的分子细节图，是否提示存在其他可被AMPK或代谢信号调控的降解节点；(4) 方法学部分ZSWIM8 CRISPRi敲低效率及脱靶对照的验证图。

**一个可执行动作**　我要在HEK293T和已有的AICAR/A-769662激酶激活体系里，用自制phospho-S608/S609单抗对内源ZSWIM8做IP-Western，平行做本文式的CRISPRi-ZSWIM8敲低+RT-qPCR区分pri-miR-29b/33 vs成熟miR-29b-3p/miR-33a-5p，预期若AMPK激活提高磷酸化信号且仅成熟体（非pri/pre）随AMP/ATP比值上升而下降，则证明磷酸化直接驱动TDMD而非转录抑制。

#### PMID 42098137 · CLASHub is an integrated database and analytical platform for microRNA-target interactions.
*Nature communications 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42098137/)

**一句话结论**　该文构建了 CLASHub 数据库/平台，整合人、小鼠、果蝇、线虫共25种细胞/组织的CLASH数据（含91个新数据集），并纳入ZSWIM8 knockout样本用于研究miRNA转换机制，发现ATP6V1G1 3'UTR是miR-335-3p的TDMD触发子。这是一篇资源/工具型论文，不直接涉及AMPK或ZSWIM8磷酸化的生化机制。

**与该子方向的关系**　竞争风险：不与D1-1直接竞争验证AMPK磷酸化ZSWIM8这一生化问题，但它建立了ZSWIM8-TDMD领域的公开数据资源和分析范式，若他人用CLASHub结合公开的ZSWIM8 KO CLASH数据反向推断出AMPK/AMP-ATP相关的miRNA降解关联（例如miR-33或miR-375在能量应激下的TDMD证据），将抢占D1-1"代谢应激-TDMD"这一叙事的数据优先权，即使不触及磷酸化本身的生化验证。

**方法要点**　CLASHub整合了CLASH-defined interactions与gene/miRNA expression数据，提供Analyzer界面做CLASH、RNA-seq、miRNA-seq及cumulative fraction curve分析；其ZSWIM8 knockout CLASH数据集与cumulative fraction curve分析法可直接搬用——他可用同一套分析框架去检验AMPK激活后miR-33/miR-375的TDMD特征（成熟体骤降而pre-miRNA不变的曲线形态），以此区分转录抑制与降解机制。

**效应量**　摘要未报告数字。读全文时优先补：91个新CLASH数据集具体覆盖哪些细胞/组织类型（是否含代谢相关组织如肝、脂肪、胰岛）、ZSWIM8 knockout样本的物种/细胞类型及其miR-335-3p降解的具体倍数变化、以及miR-33/miR-375是否被收录为TDMD候选靶点及其富集统计量。

**它暴露/承认的空白**　摘要承认现有CLASH数据集"remain limited to a few human and mouse samples"，且完全未提及AMPK、代谢应激状态（AMP/ATP比值变化）或ZSWIM8磷酸化位点S608/S609，说明该资源填补了miRNA-target互作数据的物种/组织广度空白，但AMPK驱动TDMD的动力学证据这一空白仍完全落在D1-1子方向上未被触及。

**我不相信的一件事**　CLASHub所用ZSWIM8 knockout样本推断的TDMD靶点（如miR-335-3p由ATP6V1G1触发）是在knockout对比野生型的静态比较下得出，并非动态激酶激活实验，因此其"揭示TDMD trigger"的方法论本身无法回答AMPK磷酸化是否是TDMD速率的驱动因子——knockout只能证明ZSWIM8必需，不能证明磷酸化调控其活性，这与D1-1要验证的因果链（磷酸化→ZSWIM8活性↑→TDMD加速）存在推断层级上的错配。

**读全文要核对什么**　【需读全文核对】需确认：(1) 91个新CLASH数据集是否包含代谢相关细胞类型（肝细胞、脂肪细胞、胰岛β细胞或AMPK激活/抑制处理的细胞系）；(2) ZSWIM8 knockout数据集的具体来源物种/细胞类型及配对野生型对照设计；(3) cumulative fraction curve分析法的具体统计模型和阈值设定，以判断是否可直接套用于miR-33/miR-375的TDMD鉴定；(4) 该平台是否收录miR-29在纤维化相关组织的CLASH数据，可否与方向2产生数据互补。

**一个可执行动作**　我要在HEK293T细胞体系中，先用CLASHub平台检索并下载现有ZSWIM8 knockout CLASH数据集，套用其cumulative fraction curve分析法比较miR-33和miR-375在ZSWIM8存在/缺失下的成熟体降解曲线，预期若miR-33/miR-375确为TDMD底物则knockout组曲线应显著右移（降解减慢），据此筛选出候选靶点后再用于D1-1的AICAR/A-769662激酶刺激实验设计，以区分转录抑制与降解机制对miR-33/miR-375水平的贡献。

#### PMID 41887800 · Linking miRNAs to decay.
*Genes & development 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/41887800/)

**一句话结论**　这是一篇评述文章，介绍 Grimme 等人发现一个 lncRNA 可通过较松散的碱基配对架构（弱于典型 TDMD 触发所需的紧密互补）同时触发一个家族相关 miRNA 的降解，扩展了 TDMD 触发子的结构宽容度认知。

**与该子方向的关系**　竞争风险：本文与 D1-1（AMPK直接磷酸化ZSWIM8）不撞机制层面（本文讨论触发子lncRNA-miRNA配对架构，不涉及AMPK/磷酸化），但撞"TDMD触发条件是否需要严格配对"这一前提假设——若lncRNA/RNA触发子本身可放宽配对要求即可高效诱导ZSWIM8介导降解，则该子方向需要说明AMPK磷酸化是在何种配对背景（tight vs loose triggers）下起加速作用，否则无法排除"触发子架构差异"这一混杂解释。

**方法要点**　此评述未给出实验细节（本身非原始研究），但提示可搬用的思路：用突变triggerRNA的配对区（缩短/引入bulge）梯度改变互补程度，检测其对ZSWIM8招募及成熟miRNA降解速率的影响，这一"配对宽容度梯度"设计可移植到D1-1体外激酶体系之外，用于后续验证AMPK磷酸化是否改变ZSWIM8对松/紧配对触发子的选择性。

**效应量**　【摘要未报告数字】读全文时优先补：该lncRNA与miRNA家族的配对碱基数/错配位点数、诱导降解的半衰期缩短倍数、以及与经典紧密互补触发子（如Cyrano-miR-7）对比的降解效率差异百分比。

**它暴露/承认的空白**　摘要明确指出该lncRNA"despite supporting a looser pairing architecture than typically needed"仍能高效触发TDMD，暴露出"ZSWIM8/TDMD识别机制对配对严格度的容忍范围"这一空白，落在D1-1子方向上：即ZSWIM8磷酸化状态（S608/S609）是否恰恰是决定其能否识别松散配对触发子的开关，这一机制在本文完全未被触及。

**我不相信的一件事**　本文（及其评述的原研究）仅证明该lncRNA触发子在细胞内可诱导miRNA家族共同下调，但未区分这是转录后TDMD降解还是上游转录抑制的贡献（呼应竞争解释中TGF-β/Smad3对pri/pre-miRNA的转录抑制问题）；评述摘要中未提及作者是否用pri-miRNA/pre-miRNA水平的平行检测来排除转录层面混杂，这是对其"TDMD"结论成立性的具体质疑。

**读全文要核对什么**　【需读全文核对】需确认：(1)原始论文Grimme et al.图中lncRNA与miRNA家族的具体碱基配对示意图/错配位置；(2)是否设置了pri-miRNA/pre-miRNA水平的RT-qPCR对照以排除转录抑制混杂；(3)是否检测了ZSWIM8的招募/结合（如CLIP或IP-Western）作为该lncRNA确系通过ZSWIM8-TDMD通路而非其他降解途径的直接证据；(4)参考文献中是否引用了ZSWIM8磷酸化调控相关文献。

**一个可执行动作**　我要在HEK293T细胞体系中，先用RT-qPCR平行检测目标miRNA家族的pri-miRNA/pre-miRNA与成熟体水平（区分转录 vs 降解），再用CRISPR knock-in自制phospho-S608/S609抗体做IP-Western，检测AMPK激活剂（AICAR/A-769662）处理后ZSWIM8磷酸化状态是否影响其对松散配对（类lncRNA触发子）与紧密配对（经典triggerRNA）两类底物的降解效率差异，预期磷酸化ZSWIM8对松散配对底物的降解增强效应更显著，从而将AMPK-ZSWIM8轴与TDMD触发子架构宽容度机制建立联系。


## D1-2 · S608/S609磷酸化对Cul3招募的影响
**层次：** 机制生化　｜　**拥挤程度：** 词对无共现（两两最小共现 0 篇，全交集 0 篇）　｜　**首篇预计：** 9–12 个月

> **假设：** 若磷酸化S608/S609增强ZSWIM8-Cul3-RBX1复合物组装，则S→D磷酸模拟突变体较S→A失活突变体展现更强的Cul3共免疫沉淀效率

**科学前提**

[已发表] Han 2020 (Mol Cell) 与 Shi 2020 (Cell) 已确立 ZSWIM8 通过募集 Cul3-RBX1 组装 CRL3 E3 连接酶复合物介导 AGO 降解和 TDMD，2026 cryo-EM 结构进一步解析了 ZSWIM8-Cul3 界面的关键接触残基。[已发表] AMPK 底物识别基序（Φ-x-x-x-S/T-x-x-x-Φ，Φ为疏水残基）自 1995 年已被系统定义，可用于预测潜在磷酸化位点周边的结构兼容性。[本项目计算] 自建 AMPK PSSM 打分显示 S609 位于 98.3 百分位、S608 位于 96.4 百分位，提示这两个位点具有较高的序列层面被 AMPK 识别的可能性，但该分值仅为假设生成级别，不构成磷酸化事件或功能后果的证据，磷酸化本身及其对 Cul3 招募的作用均为待测。[待测] S608/S609 是否位于或邻近 ZSWIM8 与 Cul3 结合的结构界面（根据 2026 cryo-EM 图谱定位），决定了磷酸化是否具有直接改变复合物组装的结构合理性。

**第一个关键实验**

在 HEK293T 或已有的猪源细胞系中，用 ABE/BE4 在内源 ZSWIM8 位点分别构建 S608A/S609A（磷酸化失活）和 S608D/S609D（磷酸化模拟）纯合突变细胞株，各配一株野生型对照，共至少 5 个细胞株（WT、S608A、S609A、S608D、S609D，若资源允许再加双突变 S608D/S609D）。每株在正常糖浓度与能量应激（如 2-DG 或 AICAR 处理 4 h 诱导 AMPK 激活）两种条件下裂解，用内源 ZSWIM8 抗体（或杂交瘤自制 phospho-S608/S609 抗体验证磷酸化状态）做免疫沉淀，western blot 检测共沉淀的 Cul3 与 RBX1 信号强度，同时以总 ZSWIM8 输入量归一化；每组设 n=3 次独立生物学重复，用于统计共免疫沉淀效率（Cul3/ZSWIM8 比值）差异。

**必须的对照**

必须包含：(1) WT 细胞在应激与非应激条件下的 Cul3-IP 效率对比，确认内源磷酸化本身随 AMPK 激活而变化；(2) IgG 对照 IP 排除非特异结合；(3) AMPK 抑制剂（Compound C/dorsomorphin）预处理组，验证应激诱导的 Cul3 招募变化依赖 AMPK 活性而非其他应激通路；(4) 关键排除对照——同时检测 pri-miR-29/pri-miR-33 与成熟 miR-29/miR-33 水平（RT-qPCR，pri 用外显子-内含子跨界引物），若 Cul3 招募增强但 pri/pre 前体水平不变而只有成熟体降解加快，方可排除 TGF-β/Smad3 转录层抑制这一竞争解释；(5) S→A 与 S→D 突变体之间的直接比较而非各自对野生型比较，避免突变本身引入的结构伪影被误读为磷酸化效应。

**为什么是他能做**

他在 Cell Death Dis 2019（一作）已建立 T2D 小型猪模型并具备体内能量应激处理经验，可直接迁移至细胞或组织样本的 AMPK 激活验证。他熟练使用 ABE/BE4 内源位点编辑，可直接在细胞系中做 S608/S609 的 A/D 点突变而不依赖过表达系统，避免了外源过表达可能带来的复合物组装假象；同时其杂交瘤单抗制备技能可用于自制 phospho-S608/S609 特异性抗体，为磷酸化状态提供独立验证手段，这两项技能的组合是他区别于纯生化实验室的独特优势。

**可行性**

已具备技能：ABE/BE4 内源编辑（直接可用）、杂交瘤单抗制备（可用于验证抗体，预计需 3–4 个月建立可靠 phospho 抗体）、IHC/流式（可用于表达定量）。需新学：共免疫沉淀定量化的标准化流程（约 1 个月熟悉）、smallRNA-seq 或至少 RT-qPCR 面板设计以支持 pri/pre vs 成熟体区分（约 1–2 个月）。质谱验证磷酸化位点占有率需外部合作（建议联系已有磷酸化蛋白质组学平台），起步成本主要是抗体制备的时间与试剂成本，细胞株构建可在现有 ABE/BE4 流程下于 2 个月内完成。

**最大风险与放弃条件**

最大风险：磷酸化模拟/失活突变体在 Cul3 共免疫沉淀效率上无统计学差异（S→D 与 S→A 比值差异 <20% 且 n=3 生物学重复的 p>0.05），或体外用重组 AMPK 激酶反应体系检测 ZSWIM8 S608/S609 磷酸化本身为阴性（无 32P 或 phospho-antibody 信号）。若上述任一条件成立，则放弃"磷酸化直接调控 Cul3 招募"这一机制假设，退回至 D1 旗舰方向的上游环节，重新评估 AMPK 是否通过其他底物（如间接调控 ZSWIM8 表达量或定位）影响 TDMD，而非直接的复合物组装步骤。

**目标期刊与基金**

目标期刊：Molecular Cell 或 Nucleic Acids Research（机制生化类工作，体量适中）；适配基金机制：NIH R21（探索性/高风险机制假设，两年期，适合先建立磷酸化-Cul3招募因果关系这一独立可发表单元）。

**首篇预计**

9–12 个月

**做成之后的下一步**

若磷酸化确认增强 Cul3 招募，下一步在 T2D 小型猪模型中验证内源 S608/S609 磷酸化水平随代谢应激状态动态变化，并检测其与 miR-33/miR-375 成熟体降解速率的时间相关性，从而将生化机制与整体动物代谢记忆表型连接起来。

**拥挤程度核查（可复算）**

检索式：`(ZSWIM8[tiab] OR ZSWIM8-Cul3[tiab]) AND (phosphorylation[tiab] OR AMPK[tiab]) AND (TDMD[tiab] OR Cul3[tiab])`

| 层级 | 检索式 | 全库命中 |
|---|---|---|
| 单词 | `(ZSWIM8[tiab] OR ZSWIM8-Cul3[tiab])` | 45 |
| 单词 | `(phosphorylation[tiab] OR AMPK[tiab])` | 366498 |
| 单词 | `(TDMD[tiab] OR Cul3[tiab])` | 1098 |
| 两两 | `(ZSWIM8[tiab] OR ZSWIM8-Cul3[tiab]) AND (phosphorylation[tiab] OR AMPK[tiab])` | 0 |
| 两两 | `(ZSWIM8[tiab] OR ZSWIM8-Cul3[tiab]) AND (TDMD[tiab] OR Cul3[tiab])` | 35 |
| 两两 | `(phosphorylation[tiab] OR AMPK[tiab]) AND (TDMD[tiab] OR Cul3[tiab])` | 74 |
| **全交集** | `(ZSWIM8[tiab] OR ZSWIM8-Cul3[tiab]) AND (phosphorylation[tiab] OR AMPK[tiab]) AND (TDMD[tiab] OR Cul3[tiab])` | **0** |

**配套文献与笔记（4 篇）**

#### PMID 42681318 · Target-Directed miRNA Degradation: Mechanisms and Significance.
*Methods in molecular biology (Clifton, N.J.) 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42681318/)

**一句话结论**　这是一篇方法学综述，梳理TDMD的一般机制：目标RNA通过3'端互补结合诱导Argonaute构象重排，继而发生尾巴化/修剪，ZSWIM8作为核心E3泛素连接酶被招募启动降解，全过程被描述为context-dependent但未涉及ZSWIM8自身磷酸化调控。

**与该子方向的关系**　支持前提：它确认了ZSWIM8是TDMD的中心起始因子，Argonaute重排-tailing/trimming-ZSWIM8招募这条通路是本子方向S608/S609磷酸化假设成立的分子背景前提，但完全未提AMPK或磷酸化位点，不构成方法或竞争风险。

**方法要点**　摘要本身未给出具体实验方案（IP、western blot、突变体构建等技术细节），仅描述机制概念；作为Methods in Molecular Biology类文章，全文很可能含有可搬用的TDMD报告基因/降解检测protocol，需读全文确认是否有可直接套用于Cul3-CoIP设计的步骤。

**效应量**　【摘要未报告数字】读全文时优先补：是否有关于ZSWIM8-Cul3-RBX1复合物组装效率、Argonaute重排动力学或tailing/trimming反应速率的量化参数，可作为CoIP效率评估的背景对照值。

**它暴露/承认的空白**　摘要明确承认"miRNA turnover的机制因每个miRNA稳定性不同而less comprehensible"，且tailing/trimming与TDMD的机制关联是context-dependent——这正落在本子方向要解决的空白上：ZSWIM8招募Cul3是否受磷酸化状态（而非仅靶标结合）调控，尚无定论。

**我不相信的一件事**　该综述将ZSWIM8招募描述为由Argonaute重排"诱导"，隐含靶标RNA结合是唯一或主要触发信号，但并未讨论ZSWIM8自身翻译后修饰（如磷酸化）是否能独立于靶标结合改变其与Cul3的亲和力——这恰是本子方向S→D/S→A突变体CoIP实验要检验的、该文未曾质疑的隐藏假设。

**读全文要核对什么**　【需读全文核对】需确认：(1)全文是否列出ZSWIM8-Cul3-RBX1复合物组装的检测方法（IP条件、抗体来源、裂解buffer），可否移植到磷酸模拟突变体CoIP实验；(2)是否有关于tailing/trimming酶（TUT4/7、DIS3L2等）与ZSWIM8互作的图示可作方向2/方向1对照参考；(3)全文引用的原始TDMD结构/生化研究（如Ago2-ZSWIM8 cryo-EM文献）是否披露过Cul3招募界面上的磷酸化位点信息，与S608/S609是否重叠。

**一个可执行动作**　我要在HEK293T及猪源细胞系中，用ABE/BE4构建的S608A/S609A与S608D/S609D纯合突变株上，参照本文（若全文证实）所述的ZSWIM8-Cul3 CoIP通用检测框架，比较磷酸模拟与失活突变体在正常糖与AICAR/2-DG应激条件下的Cul3/RBX1共沉淀效率，预期S→D突变体在能量应激下CoIP效率显著高于S→A突变体，从而验证磷酸化增强复合物组装这一假设。

#### PMID 42608480 · Canonical and non-canonical miRNA degradation shapes state transitions and stemness in breast cancer.
*The EMBO journal 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42608480/)

**一句话结论**　该文用CRISPRi敲低ZSWIM8+miRNA-seq+AGO2-eCLIP在乳腺癌细胞系中系统鉴定出19个高置信TDMD底物（含miR-29b-3p、miR-33a/b-5p），并发现NREP触发miR-29b-3p降解、SERPINE1触发miR-30c-5p降解但走非ZSWIM8/非蛋白酶体的非经典通路。核心结论是TDMD塑造miRNA靶点占据与抑制效力，并连接到EMT可塑性、干性亚群与紫杉醇耐药。

**与该子方向的关系**　支持前提：它独立证实miR-29b-3p与miR-33a/b-5p确系ZSWIM8-TDMD底物（正是他方向1、2要用的两个miRNA），为S608/S609-Cul3招募假设提供了"底物确实存在于人源细胞"的前提证据；但同时是竞争风险——它已经做了ZSWIM8依赖性的CRISPRi验证+eCLIP靶点图谱，若他的D1-2只停留在"S位点影响Cul3招募"而不落到具体代谢miRNA的功能后果，会被这篇的乳腺癌框架抢先覆盖同一批底物miRNA。

**方法要点**　可直接搬用的方法：CRISPRi介导ZSWIM8敲低作为阴性对照基线（他可平行设S608A/S609A作为"类敲低"表型对照），以及AGO2-eCLIP用于验证磷酸化突变株是否改变AGO2-靶标占据谱，这可作为D1-2实验之外验证Cul3招募差异下游功能效应的延伸手段。miRNA-seq流程（区分成熟体vs前体丰度变化）也可直接用于区分转录抑制与降解，回应TGF-β/Smad3竞争解释。

**效应量**　【摘要未报告数字】读全文时优先补：19个TDMD底物中miR-29b-3p、miR-33a/b-5p的具体降解幅度（fold change/半衰期）、ZSWIM8敲低后二者丰度变化的统计值，以及NREP/SERPINE1触发降解的表达相关性系数或降解速率常数，这些是判断该系统底物富集程度是否优于他计划体系的关键基准值。

**它暴露/承认的空白**　摘要明确承认该研究未触及ZSWIM8本身的翻译后调控（如磷酸化）如何决定TDMD效率，只做了敲低/存在与否的二元判断，完全没有涉及Cul3招募强度这一步——这正是D1-2要填的空白，即"ZSWIM8活性是否可被AMPK磷酸化动态调节"未被此文触及。

**我不相信的一件事**　该文将miR-29b-3p降解归因于NREP转录本触发的TDMD，但摘要未说明是否排除了TGF-β/Smad3通路在同一乳腺癌细胞中对miR-29 pri/pre转录的抑制作用——如果NREP高表达细胞同时伴随TGF-β信号激活，则miR-29b-3p成熟体下降可能部分是转录抑制而非降解加速，摘要给出的miRNA-seq数据未证明其区分了pri-miR-29与成熟miR-29的比例变化。

**读全文要核对什么**　【需读全文核对】需确认miRNA-seq是否分别测了pri-miR-29/pre-miR-29与成熟miR-29b-3p丰度（区分转录抑制vs降解的关键对照），AGO2-eCLIP鉴定TDMD底物的判定阈值与对照组设计（ZSWIM8 KD vs scramble sgRNA），以及miR-33a/b-5p在该乳腺癌系统中降解的具体触发转录本是否为已知TDMD trigger（NREP之外是否有代谢相关trigger），这些图/表会决定该文底物清单能否直接迁移到他的AMPK代谢记忆假设中。

**一个可执行动作**　我要在HEK293T ZSWIM8 S608D/S609D vs S608A/S609A纯合突变细胞株体系中，对miR-29与miR-33做miRNA-seq并同步测pri/pre与成熟体比例，预期磷酸化模拟突变体（S608D/S609D）在AICAR诱导AMPK激活后表现出更强的Cul3共IP效率且伴随成熟miR-29/miR-33选择性下降而pri/pre-miRNA水平不变，从而与该文报道的NREP/TGF-β非依赖性降解机制形成区分，并直接回应转录抑制的竞争解释。

#### PMID 42098137 · CLASHub is an integrated database and analytical platform for microRNA-target interactions.
*Nature communications 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42098137/)

**一句话结论**　该文构建了CLASHub这一整合CLASH（蛋白质近端连接测序）数据的多物种数据库平台，覆盖人/鼠/果蝇/线虫25种细胞组织类型，其中包含91个新生成的ZSWIM8敲除CLASH数据集，可用于查询miRNA-target直接互作及TDMD触发靶点（如miR-335-3p在ATP6V1G1 3'UTR的降解触发子）。

**与该子方向的关系**　竞争风险：该平台本身不涉及ZSWIM8的S608/S609磷酸化位点或Cul3招募机制，属于纯资源型/数据库论文，与本子方向的机制生化假设（磷酸化增强Cul3组装）无直接竞争；但其ZSWIM8-KO CLASH数据集若被后续研究者用来做磷酸化位点功能注释或TDMD靴子基因筛选，可能抢先占据"哪些内源miRNA-target对依赖ZSWIM8"这一空白，需要留意是否有人用该库反向定位AMPK下游miRNA底物。

**方法要点**　可搬的方法：其CLASH建库流程（proximity ligation within AGO complex后测序hybrid reads）与Analyzer界面里的cumulative fraction curve分析，可用于后续若要验证S608D/S609D突变体是否改变整体miRNA降解谱时做定量比较基准；此外其ZSWIM8-KO对照数据集可作为"完全失去TDMD功能"的阳性对照参照，用于比对自制磷酸化突变株的表型是否达到同等降解阻断程度。

**效应量**　摘要未报告数字，读全文时优先补：91个新CLASH数据集具体覆盖哪些细胞/组织类型（是否含AMPK相关代谢组织如肝、肌肉、脂肪）、ZSWIM8-KO与WT之间miR-335-3p及miR-18a-5p降解效率的具体倍数变化、以及cumulative fraction curve分析中判定"TDMD trigger"的统计阈值。

**它暴露/承认的空白**　摘要明确承认现有CLASH数据集"limited to a few human and mouse samples"，此空白已被本文的91个新数据集部分填补，但完全没有涉及ZSWIM8磷酸化状态（S608/S609）对靶点选择或Cul3招募的调控，这正是D1-2子方向要补的机制空白——即"ZSWIM8的翻译后修饰如何改变其TDMD活性"仍是全空白，该数据库仅回答"ZSWIM8有没有"而非"ZSWIM8磷酸化与否"。

**我不相信的一件事**　该文的ZSWIM8-KO CLASH数据集验证的是ZSWIM8完全缺失后的miRNA-target互作变化，这与S608D/S609D磷酸化模拟突变体（ZSWIM8蛋白仍存在、仅活性可能增强）的预期表型方向相反且机制层级不同，若直接借用其KO数据作为"低Cul3招募"对照会存在概念混淆——完全敲除≠磷酸化失活，摘要未说明其KO数据是否区分了ZSWIM8蛋白稳定性缺陷与酶活性缺陷这两种可能性。

**读全文要核对什么**　【需读全文核对】需确认：(1) 91个新CLASH数据集的物种/细胞类型清单中是否含猪或可比大动物细胞系及AMPK激活相关代谢组织；(2) ZSWIM8-KO样本的具体构建方式（全长敲除还是仅催化域敲除）及其miRNA降解效率的量化图表；(3) Analyzer界面是否支持上传自制突变株的CLASH或RNA-seq数据做同库比对；(4) 该平台数据库中miR-29/miR-33/miR-375是否已有现成CLASH互作记录可直接调取作为背景对照。

**一个可执行动作**　我要在自制的ZSWIM8 S608A/S609A与S608D/S609D纯合突变HEK293T细胞株体系中，用CLASHub平台已发表的ZSWIM8-KO CLASH数据集作为"TDMD完全丧失"的效应量下限参照，对比我的磷酸化突变株在2-DG/AICAR诱导AMPK激活后miR-29/miR-33/miR-375的Cul3共免疫沉淀效率变化幅度是否落在WT与KO之间的可解释区间，预期磷酸化模拟突变体的Cul3招募增强效应不超过CLASHub中WT/KO对照所定义的动态范围上限。

#### PMID 41887800 · Linking miRNAs to decay.
*Genes & development 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/41887800/)

**一句话结论**　这是一篇评述文章：指出一族相关miRNA可通过与同一条lncRNA的有限（非完美）碱基配对被协同诱导TDMD，说明TDMD触发子不需要经典的广泛互补即可高效激活。

**与该子方向的关系**　竞争风险：本文讨论的是TDMD触发子的配对结构决定miRNA降解效率，与D1-2子方向（S608/S609磷酸化调控ZSWIM8-Cul3招募）不是同一层机制——但两者共同作用于ZSWIM8/TDMD通路的下游产物（成熟miRNA丰度），若不区分"触发子结合"与"E3连接酶招募"两个环节，容易把lncRNA触发效率的差异误读成磷酸化位点的功能，需在解释层面做出差异声明：本文关注上游底物识别，D1-2关注下游复合物组装。

**方法要点**　评述本身未给出可直接搬用的实验方法（是News & Views/Perspective类文章），但提示了一个可借用的思路：用一条lncRNA或design的RNA triggers做"有限配对vs完美配对"的对照，来验证TDMD激活对配对严格度的容忍范围，此思路可用于设计D1-2中区分"ZSWIM8磷酸化状态"是否改变其对不同配对强度触发子的敏感性。

**效应量**　【摘要未报告数字】读全文时优先补：该lncRNA与miRNA家族的具体配对碱基数/错配位置、TDMD诱导后miRNA下降的倍数或半衰期变化数值、以及涉及的miRNA家族与lncRNA具体名称。

**它暴露/承认的空白**　本文暴露的空白是：TDMD触发子的配对宽容度机制尚不清楚（为何有限配对也能高效招募ZSWIM8复合物），这一空白部分落在D1-2子方向——如果配对宽容度本身受ZSWIM8构象/磷酸化状态影响，那么S608/S609磷酸化可能不仅调控Cul3招募效率，还可能调控ZSWIM8对不同强度触发子的识别阈值，这是当前假设未覆盖的维度。

**我不相信的一件事**　本文（及其评述的原文）用lncRNA-miRNA有限配对来解释协同TDMD，但未说明这种"松散配对触发"是否同样发生在内源代谢miRNA（miR-33/miR-375）与任何已知lncRNA或mRNA 3'UTR之间，如果代谢miRNA的TDMD触发子本身罕见或配对更严格，则AMPK磷酸化ZSWIM8对代谢记忆的贡献可能被高估，需要先证明代谢相关miRNA存在类似的松散配对TDMD触发子。

**读全文要核对什么**　【需读全文核对】需读被评述的原文（Grimme et al., doi:10.1101/gad.353314.125）而非本评述：确认该lncRNA与miRNA家族配对的具体图（碱基错配位置示意图）、是否用了ZSWIM8敲低/敲除做对照来证明TDMD依赖ZSWIM8、以及是否检测了pri/pre-miRNA水平以排除转录调控（这与TGF-β/Smad3竞争解释的区分逻辑一致），此外要核对该研究是否涉及Cul3或RBX1的共免疫沉淀数据可作为方法参考。

**一个可执行动作**　我要在HEK293T ABE/BE4编辑的S608A/S609A与S608D/S609D细胞株体系中，除了做Cul3/RBX1共免疫沉淀，额外设计一组"完美配对vs有限配对"的合成TDMD触发子（RNA duplex转染或稳定表达）分别靶向miR-33/miR-375，预期若磷酸化模拟突变体（S608D/S609D）对松散配对触发子的降解效率显著高于失活突变体（S608A/S609A），则说明AMPK磷酸化不仅增强Cul3招募，还降低了ZSWIM8对触发子配对严格度的要求，从而扩展代谢记忆假设的分子基础。


## D1-3 · 代谢miRNA靶标特异性图谱构建
**层次：** 底物特异性　｜　**拥挤程度：** 词对无共现（两两最小共现 0 篇，全交集 0 篇）　｜　**首篇预计：** 9–12 个月

> **假设：** 若ZSWIM8磷酸化选择性作用于具有广泛互补TDMD触发位点的代谢miRNA，则miR-33/miR-375较miR-29在AMPK激活下呈现更显著的成熟体丢失而pri/pre不变

**科学前提**

[已发表] Han 2020 (Cell) 与 Shi 2020 (Science) 已证明 ZSWIM8/Cul3 通过识别 miRNA 与其广泛互补(extensive complementarity)靶标结合后触发 TDMD 降解成熟体，该机制依赖 target-directed 构象变化而非转录调控；[已发表] miR-33、miR-375 均有已知的高互补 TDMD 触发转录本报道(如 NREP 对 miR-29 类似机制的类比文献)，但代谢 miRNA 是否共享该特征尚无系统图谱；[本项目计算] 自建 AMPK PSSM 显示 ZSWIM8 S608/S609 落在 96.4/98.3 百分位，仅提示激酶-底物匹配的假设生成级证据，本身不构成功能证据；[待测] AMPK 激活后 miR-33/miR-375 成熟体丰度下降幅度是否显著大于 miR-29，且三者 pri/pre 水平不变，是本子方向的核心待验证命题。

**第一个关键实验**

在其已有的 T2D 小型猪肝脏/胰腺类器官或原代细胞中，用 AICAR 或 2-DG 激活 AMPK(0/2/6/24 h 时间梯度，n=4/时间点/组织)，同时设 Compound C 抑制剂对照组；分别提取 small RNA 做 qPCR 检测 miR-29、miR-33、miR-375 成熟体绝对拷贝数，并用 pri/pre 特异引物检测其未成熟体水平；平行做 ZSWIM8 CLIP 或 RNA pull-down 验证三种 miRNA 与其推定 TDMD 触发转录本(如 SREBF1 3'UTR for miR-33)的结合强度差异。

**必须的对照**

必须设：(1) pri/pre vs 成熟体平行检测以排除 TGF-β/Smad3 转录抑制型解释；(2) ZSWIM8 KD/KO 对照，若成熟体丢失在 ZSWIM8 缺失后消失则支持 TDMD 而非其他降解通路；(3) AMPK 激酶死突变(K45R)细胞系作为激酶活性阴性对照；(4) 非代谢 miRNA(如 let-7)作为特异性阴性对照，其不应随 AMPK 激活而丢失；(5) Compound C 抑制剂应逆转表型。

**为什么是他能做**

他在 Cell Death Dis 2019 一作建立的 T2D 小型猪模型直接提供了代谢应激下的原位组织，无需重新建模；他的杂交瘤平台可自制 phospho-ZSWIM8(S608/S609) 抗体用于验证磷酸化状态与 miRNA 丢失的时间一致性；他熟练的类器官与 IHC/流式技能可支撑多组织平行取样与蛋白定位验证，避免依赖尚未掌握的半衰期测定与质谱技能即可先出图谱。

**可行性**

qPCR 检测 pri/pre/成熟体三层级为其已有技能，可立即开展；CLIP/pull-down 验证结合强度需新学 2–3 个月(可参考已发表 ZSWIM8 CLIP 方案降低门槛)；不需要 small RNA-seq 即可完成第一轮图谱筛选，small RNA-seq 留作后续全转录本扫描的合作项目；起步成本低，主要依赖已有猪组织库和现有 qPCR/CLIP 台面设备。

**最大风险与放弃条件**

最大风险是三种 miRNA 在 AMPK 激活后成熟体丢失幅度无统计学差异(ANOVA p>0.05)，或 pri/pre 同步下降提示转录层调控而非 TDMD；若出现后者，或 ZSWIM8 KD 后表型不消失，则判定放弃该子方向的"选择性底物"假设，退回 D1-1(直接激酶生化验证)重新确认磷酸化本身是否发生。

**目标期刊与基金**

目标期刊 Nucleic Acids Research 或 RNA (适配 R21/R01 exploratory 机制)，作为旗舰方向 D1 的支撑性图谱论文，为后续机制论文提供底物选择性证据基础。

**首篇预计**

9–12 个月

**做成之后的下一步**

若图谱证实代谢 miRNA 存在选择性 TDMD 敏感性，下一步应回到 D1-1 验证 AMPK 磷酸化 ZSWIM8 S608/S609 是否是该选择性差异的因果开关。

**拥挤程度核查（可复算）**

检索式：`(ZSWIM8[tiab] OR TDMD[tiab]) AND (miR-33[tiab] OR miR-375[tiab]) AND (target-directed[tiab] OR degradation[tiab])`

| 层级 | 检索式 | 全库命中 |
|---|---|---|
| 单词 | `(ZSWIM8[tiab] OR TDMD[tiab])` | 105 |
| 单词 | `(miR-33[tiab] OR miR-375[tiab])` | 1778 |
| 单词 | `(target-directed[tiab] OR degradation[tiab])` | 491524 |
| 两两 | `(ZSWIM8[tiab] OR TDMD[tiab]) AND (miR-33[tiab] OR miR-375[tiab])` | 0 |
| 两两 | `(ZSWIM8[tiab] OR TDMD[tiab]) AND (target-directed[tiab] OR degradation[tiab])` | 72 |
| 两两 | `(miR-33[tiab] OR miR-375[tiab]) AND (target-directed[tiab] OR degradation[tiab])` | 52 |
| **全交集** | `(ZSWIM8[tiab] OR TDMD[tiab]) AND (miR-33[tiab] OR miR-375[tiab]) AND (target-directed[tiab] OR degradation[tiab])` | **0** |

**配套文献与笔记（4 篇）**

#### PMID 42212330 · Biomembrane-coated Nanoparticles Targeting circHIF1α Suppress Ovarian Cancer Metastasis and Cisplatin Resistance by Mediating System Xc⁻ Inactivation via SLC7A11/SLC3A2 to Induce Ferroptosis in Cancer Stem Cells.
*International journal of biological sciences 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42212330/)

**一句话结论**　circHIF1α在缺氧卵巢癌CSC中被诱导表达，通过结合SLC3A2阻断其溶酶体降解并同时sponge miR-375以解除对SLC7A11的抑制，双重激活system Xc⁻-GSH通路维持铁死亡抵抗与干性，并可经外泌体在肿瘤微环境中细胞间传播耐药性。

**与该子方向的关系**　竞争风险：本文将miR-375定位为circHIF1α的下游被抑制靶点（circRNA sponge→miR-375降低→SLC7A11成熟体蛋白升高），这与D1-3假设"AMPK磷酸化ZSWIM8选择性降解miR-375成熟体"构成同一miRNA、不同上游驱动的竞争解释——若肝胰类器官中miR-375丢失可被circRNA sponge机制解释而非TDMD/AMPK通路，则需要证明ZSWIM8依赖性且与circRNA表达无关，否则难以归因。

**方法要点**　可搬用的方法：circRNA-miRNA sponge验证常用的RNA pull-down/RIP-qPCR及荧光素酶报告基因，可平行套用于验证ZSWIM8-miRNA-TDMD触发转录本的结合特异性；其外泌体转运circRNA的检测思路（exosome分离+circHIF1α定量）也可用于评估AMPK激活后miRNA稳态是否存在细胞间/组织间传播效应。

**效应量**　摘要未报告数字。读全文时优先补：circHIF1α过表达/敲低后miR-375成熟体相对表达量的fold change、SLC7A11蛋白/mRNA变化幅度、以及circHIF1α与miR-375结合的Kd或AGO2-RIP富集倍数，用以判断该sponge效应量级是否足以掩盖或混淆AMPK诱导的miR-375降解效应。

**它暴露/承认的空白**　摘要未涉及miR-375的pri/pre前体水平变化，也未讨论ZSWIM8或TDMD机制，说明该文完全未处理"成熟体特异性丢失 vs 转录抑制"这一关键区分问题——这正是D1-3子方向要求补齐的空白，即需要在代谢相关组织中做pri/pre与成熟体的平行定量以排除circRNA/转录层面的混杂解释。

**我不相信的一件事**　该文将circHIF1α对miR-375的调控归为经典sponge机制（竞争性结合抑制其活性），但摘要未说明是否检测了miR-375的绝对拷贝数或半衰期变化，因此无法排除circHIF1α表达本身是否通过促进miR-375降解（而非单纯竞争结合）来降低其功能性水平——若两种机制在卵巢癌细胞中并存，会使"sponge导致miR-375功能丧失"这一结论对D1-3猪类器官系统的外推价值大打折扣，因为组织类型、circRNA表达背景完全不同。

**读全文要核对什么**　【需读全文核对】需确认：(1)图中miR-375敲低/回补实验是否检测了pri-miR-375/pre-miR-375水平以排除转录或加工层面变化；(2)circHIF1α与miR-375结合的RIP/pull-down对照组设置（是否有scramble circRNA或miR-375 mutant对照）；(3)方法学部分miR-375定量是绝对拷贝数qPCR还是相对Ct值，以及是否报告了miR-375半衰期或降解动力学数据；(4)参考文献中是否引用了ZSWIM8/TDMD相关文献，用以判断该领域对circRNA-miRNA与TDMD机制交叉认知的现状。

**一个可执行动作**　我要在T2D小型猪肝脏/胰腺类器官体系中，于AICAR/2-DG诱导AMPK激活的0/2/6/24h梯度下，同步检测miR-375成熟体绝对拷贝数、pri/pre-miR-375水平以及内源circRNA（如猪源circHIF1α同源转录本）表达量的相关性，预期若miR-375成熟体丢失独立于circRNA表达变化且伴随ZSWIM8结合增强，则可排除本文提示的sponge竞争风险，支持AMPK-ZSWIM8-TDMD假设的特异性。

#### PMID 42194090 · Epigenetic Regulation Involving microRNAs in Diabetes.
*Biomolecules 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42194090/)

**一句话结论**　这是一篇综述，系统梳理T1DM/T2DM中差异表达miRNA（含miR-29、miR-375等）作为早期诊断标志物与治疗靶点的证据，未涉及任何降解机制或AMPK/ZSWIM8通路。文中仅罗列表达谱变化，不区分成熟体与pri/pre、不涉及TDMD触发位点。

**与该子方向的关系**　支持前提：该文提供miR-33/miR-375/miR-29在糖尿病代谢紊乱中的表达关联背景，可作为选miRNA靶标的流行病学/生物学合理性依据，但不构成方法或机制支持，与竞争风险（转录调控解释）无直接冲突，因为它完全未讨论转录vs降解层面的区分。

**方法要点**　摘要未描述任何具体分子生物学方法（无qPCR引物设计、无CLIP、无小鼠/类器官模型细节），仅为文献综述性总结，无可直接搬用的实验方法。可搬用的只是其罗列的候选miRNA清单（miR-9/29/34a/103/107/126/143/375等）用于后续panel设计参考。

**效应量**　【摘要未报告数字】读全文时优先补：miR-15a/miR-126/miR-375在临床发病前"数年"变化的具体时间点（原文写"several years before onset"但无量化年数）及各miRNA在血/尿中的绝对或相对表达倍数变化数据。

**它暴露/承认的空白**　摘要明确承认"当前诊断标准无法在preclinical阶段检测疾病"及"该miRNA panel仍需大规模前瞻性研究验证"，这一空白恰好落在子方向D1-3所要解决的"代谢miRNA靶标特异性图谱"问题上——即缺乏机制层面（成熟体降解vs转录抑制）的区分数据来支撑早期biomarker的因果解释。

**我不相信的一件事**　该综述将miR-29、miR-375等的表达变化直接归因于"insulin secretion, lipid metabolism, tissue insulin sensitivity"的调控作用，但未说明这些表达变化是否经过pri/pre与成熟体的区分检测，也未排除TGF-β/Smad3等转录层抑制机制，因此其"miRNA表达改变=功能性调控"的因果推断存在成熟体特异性证据缺失的具体问题，而非泛泛的样本量问题。

**读全文要核对什么**　【需读全文核对】需确认：（1）文中引用的miR-29、miR-33（若提及）、miR-375原始研究是否报告了pri/pre-miRNA与成熟体的分别定量数据；（2）循环miRNA检测方法（qPCR、绝对拷贝数vs相对Ct值）及所用内参基因；（3）miR-15a/miR-126/miR-375"数年前变化"结论所依据的具体前瞻性队列研究及其随访时间点设计，以判断是否可作为D1-3实验时间梯度设计的对照参考值。

**一个可执行动作**　我要在T2D小型猪肝脏/胰腺类器官体系中，以本文列出的miR-9/miR-29/miR-375等候选miRNA为起点，用AICAR/2-DG诱导AMPK激活后分别检测成熟体与pri/pre-miRNA水平，预期能确认本文未做的成熟体特异性丢失模式，从而将现有"表达谱biomarker"证据升级为"TDMD机制驱动"的因果证据，填补该综述承认的验证空白。

#### PMID 41771217 · MicroRNA-375 promotes tamoxifen resistance by stabilizing ERα via UBE3A-mediated ubiquitination.
*International immunopharmacology 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/41771217/)

**一句话结论**　该文报道乳腺癌中miR-375通过靶向UBE3A抑制其介导的ERα泛素化降解，从而稳定ERα蛋白、促进增殖侵袭并诱导他莫昔芬耐药；ER+组织miR-375高表达且与总生存负相关。此为"miR-375上调→靶基因UBE3A下调→下游蛋白稳定"的经典靶标机制，与AMPK-ZSWIM8对miR-375成熟体降解的调控完全无关。

**与该子方向的关系**　竞争风险：与D1-3子方向不直接竞争假设本身，但存在"混淆风险"——该文证明miR-375自身表达量变化足以通过UBE3A-ERα轴产生强表型，若未来在猪肝/胰腺类器官中做AMPK-ZSWIM8对miR-375的功能验证，须先排除miR-375表达波动通过类似靶基因轴产生的下游表型混杂，否则无法归因于TDMD特异性降解机制。

**方法要点**　可搬方法：dual-luciferase reporter assay验证miR-375与UBE3A 3'UTR的直接结合，此思路可直接套用于验证miR-33/miR-375推定TDMD触发转录本(如SREBF1 3'UTR)与miRNA的结合位点特异性；IP+Ubiquitination分析组合也可用于后续若要验证ZSWIM8磷酸化后下游泛素化通路变化时的方法学参考。

**效应量**　摘要未报告数字，读全文时优先补：miR-375过表达/knockdown后ERα蛋白半衰期或稳定性的定量变化（如cycloheximide chase实验的半衰期数值）、miR-375与UBE3A结合的荧光素酶报告基因抑制百分比、他莫昔almox耐药IC50变化倍数，以及ER+ vs ER-组织中miR-375表达的具体fold-change。

**它暴露/承认的空白**　该文承认miR-375在不同癌症中functions context-dependent(oncogene或tumor suppressor)，未解释这种双向性的分子基础是否与miR-375本身的降解速率/半衰期调控有关；此空白恰好落在D1-3子方向——若AMPK-ZSWIM8对miR-375成熟体丰度的调控具组织特异性，可能是解释miR-375功能context-dependence的上游机制之一，但该文完全未涉及miR-375自身丰度是如何被上游酶（如ZSWIM8/TUT4-7）调控产生的组织差异。

**我不相信的一件事**　该文将miR-375高表达等同于其功能性上调驱动ERα稳定，但未在摘要中说明是否检测过miR-375的成熟体与pri/pre-miR-375比例——若miR-375高表达实际来自转录上调而非降解速率改变，则"miR-375-UBE3A-ERα轴"的因果链可能仅反映转录调控而非miRNA稳态本身的病理性改变，这与本子方向强调"成熟体降解特异性需与pri/pre区分"的核心逻辑形成方法论呼应但未被该文验证。

**读全文要核对什么**　【需读全文核对】需确认：(1)乳腺癌细胞系及组织中miR-375检测是否区分了成熟体与pri/pre-miR-375（图2或图S中的qPCR引物设计）；(2)dual-luciferase报告基因实验中UBE3A 3'UTR上miR-375结合位点的序列互补程度（seed match vs 广泛互补，是否符合TDMD触发位点特征）；(3)体内他莫昔芬耐药小鼠模型的对照组设置（是否有Compound C类AMPK抑制剂或代谢应激处理组）。

**一个可执行动作**　我要在自己的T2D小型猪肝脏/胰腺类器官体系中，用AICAR/2-DG诱导AMPK激活并设置0/2/6/24h时间梯度，同时用本文的dual-luciferase reporter assay方法学验证miR-375与其推定TDMD触发转录本(如SREBF1 3'UTR)结合强度，预期若AMPK激活选择性加速miR-375成熟体降解(pri/pre不变)，则可与本文"miR-375表达量本身驱动UBE3A-ERα轴"的机制形成对比，证明代谢应激下miR-375丰度变化的上游驱动力是TDMD而非转录调控。

#### PMID 40398208 · Comparative miRNA transcriptome analysis reveals miR-375-3p targets cyp19a and regulates ovarian development in Medaka (Oryzias latipes).
*Comparative biochemistry and physiology. Part D, Genomics & proteomics 2025* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/40398208/)

**一句话结论**　该研究在medaka脑组织中鉴定出54个性别差异表达miRNA（45雌性偏高、9雄性偏高），并通过双荧光素酶实验证实miR-375-3p直接结合cyp19a1a与cyp19a1b的3'UTR，芳香化酶抑制剂EM处理后miR-375表达上升而cyp19a1a/b及foxl2下降、dmy/cyp17a/gsdf上升。

**与该子方向的关系**　竞争风险：本文把miR-375-3p与cyp19a1a/b的关系定位为"miRNA→靶mRNA降解/翻译抑制→性腺分化"的转录后调控机制，这与D1-3子方向"AMPK活化后miR-375等代谢miRNA经ZSWIM8-TDMD被降解、pri/pre不变"的因果方向相反——该文暗示miRNA上调导致靶基因下调，而D1-3关心的是miRNA自身被上游酶降解；两者若都用miR-375做靶标特异性论证，需在写作中明确区分"miR-375降解靶mRNA"（本文）与"miR-375自身被TDMD降解"（D1-3假设）不是同一层次现象，避免被误读为重复验证同一机制。

**方法要点**　可搬方法：双荧光素酶报告基因验证miRNA-3'UTR结合（可直接用于验证miR-33/SREBF1、miR-375/预测TDMD触发转录本的结合特异性，作为CLIP/pull-down之外的正交验证）；qPCR检测候选miRNA在不同发育/处理时间点的表达变化，其分组设计（对照 vs 药物处理，多时间点）可参考用于AICAR/2-DG时间梯度实验的统计效能预估。

**效应量**　摘要报告数字：54个显著差异表达miRNA（45雌性偏高+9雄性偏高）。EM处理后miRNA表达"增加"、女性发育相关基因（foxl2、cyp19a1a、cyp19a1b）"降低"、男性发育相关基因（dmy、cyp17a、gsdf）"升高"，但摘要未报告具体倍数或拷贝数；【摘要未报告数字】读全文时优先补：miR-375-3p在EM处理前后的绝对/相对表达倍数变化，以及双荧光素酶实验中miR-375-3p对cyp19a1a/b荧光信号的抑制百分比。

**它暴露/承认的空白**　该文承认的空白是miRNA在脑-性腺-生殖轴中的调控机制仍需阐明，尤其未涉及miRNA自身的稳定性/降解调控（如TDMD、尿苷化等上游降解机制），这恰好落在D1-3子方向要填补的"miRNA底物特异性降解图谱"空白上——本文只做了miRNA表达量的性别差异及其对靶基因的下游效应，完全未涉及miRNA成熟体/pri-pre比值随上游信号（如AMPK）变化的问题。

**我不相信的一件事**　本文将miR-375-3p表达上升与cyp19a1a/b表达下降的相关性直接解释为miRNA介导的靶基因抑制，但EM处理本身会通过芳香化酶抑制直接改变雌激素合成通路及下游转录调控，摘要未排除EM对cyp19a1a/b转录本身的直接抑制作用（如通过雌激素反馈环路而非miRNA介导），因此miR-375-3p上调是cyp19a1a/b下降的原因还是共同下游结果，仅凭qPCR相关性和体外荧光素酶结合实验无法确证体内因果方向。

**读全文要核对什么**　【需读全文核对】需确认：(1)双荧光素酶实验的对照组设计（是否包含miR-375-3p结合位点突变对照、scramble miRNA对照）以判断结合特异性证据强度；(2)EM处理组和对照组miRNA/mRNA qPCR是否有pri-miR-375与mature miR-375-3p的分别检测，用以判断miR-375上调是转录增加还是稳定性/成熟度变化；(3)图中miR-375-3p表达变化的时间进程是否早于或晚于cyp19a1a/b下降，用以推断因果时序。

**一个可执行动作**　我要在T2D小型猪肝脏/胰腺类器官体系中，比照本文miR-375-3p—cyp19a1a/b的双荧光素酶验证策略，构建miR-375推定TDMD触发转录本（如胰岛相关靶基因）3'UTR荧光素酶报告载体，在AICAR/2-DG处理0/2/6/24h梯度下同时检测miR-375成熟体拷贝数、pri/pre水平及报告基因活性变化，预期若AMPK激活选择性降解miR-375成熟体而不影响pri/pre，则报告基因活性应随miR-375成熟体丢失而恢复（去抑制），从而区分"miRNA降解靶基因"与"miRNA自身被TDMD降解"两种机制。


## D1-4 · 内源S609A/D敲入小型猪代谢表型
**层次：** 疾病落点　｜　**拥挤程度：** 词对无共现（两两最小共现 0 篇，全交集 0 篇）　｜　**首篇预计：** 18–24 个月（受限于小型猪繁育与表型窗口，属于该项目全链条中耗时最长的落点子方向）。

> **假设：** 若S609磷酸化是代谢记忆的关键开关，则ABE敲入S609D的T2D小型猪较S609A猪在饥饿-再喂食后表现出更持久的miR-33/375降解与血脂血糖异常

**科学前提**

[已发表] ZSWIM8/Cul3 介导 TDMD 的分子机制已由 Han et al. 2020 (Science) 与 Shi et al. 2020 (Science) 建立，2026 年 cryo-EM 结构进一步明确了 ZSWIM8 底物识别界面。[已发表] AMPK 底物识别基序（Φ-X-X-S/T-X-X-X-Φ 型）自 1995 年已被系统定义，可用于打分预测新底物。[本项目计算] 基于该经典基序自建的 AMPK PSSM 对 ZSWIM8 S609 打分为 98.3 百分位、S608 为 96.4 百分位，属假设生成级排名，本身不构成磷酸化事实的证据，S608/609 是否为真实 AMPK 底物位点、其磷酸化状态是否驱动体内 TDMD 效率仍完全未知。[待测] 若该位点磷酸化确为代谢记忆开关，则在真实哺乳动物器官层面、跨越饥饿-再喂食这一生理能量应激周期的内源性敲入模型中，S609D（磷酸模拟）动物应比 S609A（不可磷酸化）动物表现出更强、更持久的靶 miRNA（miR-33、miR-375）降解及下游代谢表型差异。

**第一个关键实验**

在 T2D 小型猪模型（他一作 Cell Death Dis 2019 使用的品系）上用 ABE 内源敲入 ZSWIM8 S609A 和 S609D 两组动物（每组 n=6，另设野生型 n=6），经 48 小时饥饿后再喂食，于饥饿末、再喂食后 2h/6h/24h/72h 五个时间点取肝、脂肪、胰腺组织。读出：自制 phospho-S609 单抗做 IHC/流式定量磷酸化 ZSWIM8 丰度（仅在 WT 中作为内参验证抗体特异性）、qPCR 测 miR-33/miR-375 成熟体绝对拷贝数、同批次测 pri/pre-miR-33/375 排除转录层贡献、血糖/血脂/胰岛素曲线。

**必须的对照**

必须同时测 pri-/pre-miR-33 与 -375 以排除 TGF-β/Smad3 样的转录抑制混杂（若 pri/pre 也随基因型变化则说明转录层而非降解层驱动，假设需推翻或修正）；S609A 与 S609D 两个敲入基因型互为主要对照，另设敲入位点旁路对照（邻近沉默突变敲入猪）排除 ABE 脱靶/gRNA 位点本身效应；需要同批次测另一 ZSWIM8 已知非代谢底物（如 TDMD 经典靶点）确认表型特异于代谢通路而非全局 TDMD 活性改变；自制 phospho 抗体须先用体外 CRISPR knockout（ZSWIM8-null 细胞回补 S609A/D）验证特异性，再用于组织。

**为什么是他能做**

他是 T2D 小型猪模型的建立者和一作（Cell Death Dis 2019），具备大动物代谢表型监测的全套流程（血糖钳夹、胰岛素曲线、类器官验证）；他已掌握 ABE/BE4 内源位点编辑技术，可直接做 S→A/D 敲入而非过表达系统；他的杂交瘤平台可自制 phospho-S609 特异性单抗，这是全球目前唯一能验证该磷酸化位点体内动态的技术路径，因为没有商业化抗体存在。

**可行性**

大动物 ABE 敲入、饥饿-再喂食生理学、IHC/流式、胰岛素/血脂检测均是他已有技能，可直接启动；qPCR 绝对定量 miRNA 及 pri/pre 区分需要小幅方法学补课（约 1-2 个月），smallRNA-seq 若后续需要全谱验证则需合作或外包；小型猪繁育周期长（敲入猪出生到可用性表型测试约需 6-9 个月），是整条时间线的主要瓶颈，建议与本子方向上游细胞/器官水平实验（D1 系列其他子方向）并行以不阻塞进度。

**最大风险与放弃条件**

最大风险：若饥饿-再喂食后 S609A 与 S609D 猪的 miR-33/375 成熟体降解动力学（半衰期、绝对拷贝数曲线）在统计上无差异，且同一批次 pri/pre 水平也无差异——即磷酸化状态对表型完全不可分——则应放弃本子方向的整体假设，退回细胞或类器官层面重新验证 S608/609 是否为真实 AMPK 磷酸化底物（体外激酶反应+质谱位点鉴定），不再投入大动物资源。若体外激酶反应本身即为阴性（S609 无法被 AMPK 体外磷酸化），则应更早在猪模型前止损，直接终止该分支转向其他 PSSM 候选位点。

**目标期刊与基金**

期刊：Cell Metabolism 或 Nature Metabolism（大动物代谢记忆机制类工作的典型落点）；基金机制：NIH R01（代谢病方向）或 ADA（American Diabetes Association）Pathway to Stop Diabetes 资助，适配其大动物模型转化定位。

**首篇预计**

18–24 个月（受限于小型猪繁育与表型窗口，属于该项目全链条中耗时最长的落点子方向）。

**做成之后的下一步**

若表型差异确证且限于降解层而非转录层，下一步是在同一猪模型上测试可逆性——即从 S609D 状态用小分子 AMPK 抑制剂或再次基因编辑切回是否能消除"代谢记忆"，从而检验该开关的双向可逆性。

**拥挤程度核查（可复算）**

检索式：`(ZSWIM8[tiab] OR TDMD[tiab]) AND (AMPK[tiab] OR phosphorylation[tiab]) AND (pig[tiab] OR "miniature pig"[tiab] OR swine[tiab])`

| 层级 | 检索式 | 全库命中 |
|---|---|---|
| 单词 | `(ZSWIM8[tiab] OR TDMD[tiab])` | 105 |
| 单词 | `(AMPK[tiab] OR phosphorylation[tiab])` | 366498 |
| 单词 | `(pig[tiab] OR "miniature pig"[tiab] OR swine[tiab])` | 204177 |
| 两两 | `(ZSWIM8[tiab] OR TDMD[tiab]) AND (AMPK[tiab] OR phosphorylation[tiab])` | 0 |
| 两两 | `(ZSWIM8[tiab] OR TDMD[tiab]) AND (pig[tiab] OR "miniature pig"[tiab] OR swine[tiab])` | 1 |
| 两两 | `(AMPK[tiab] OR phosphorylation[tiab]) AND (pig[tiab] OR "miniature pig"[tiab] OR swine[tiab])` | 2398 |
| **全交集** | `(ZSWIM8[tiab] OR TDMD[tiab]) AND (AMPK[tiab] OR phosphorylation[tiab]) AND (pig[tiab] OR "miniature pig"[tiab] OR swine[tiab])` | **0** |

**配套文献与笔记（4 篇）**

#### PMID 41394296 · Effect of feeding a gestation diet to sows for 5 days post-farrowing and feeding a liquid mixture of milk replacer and starter diet to suckling piglets on growth, selected health parameters and faecal microbiota of suckling pigs on two research farms.
*Translational animal science 2025* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/41394296/)

**一句话结论**　该文是母猪妊娠料/哺乳料转换（GEST5）与断奶前creep料形式（干粒DPS vs 液态奶替代+淀粉LMR+S）对仔猪生长、腹泻及母猪/仔猪粪便菌群的2×2析因猪营养学研究，核心结论是两种干预均未改善哺乳期/断奶后仔猪生长或腹泻发生率，仅对母乳成分、粪便SCFA及菌群多样性有统计学差异。

**与该子方向的关系**　竞争风险：与D1-4子方向撞在"小型猪T2D模型的饲喂/断食-再喂食范式与外周代谢读出（体重、体脂、粪便SCFA等）"这一层面，但本文是商用生产性猪的哺乳营养学干预（母猪饲料切换+仔猪creep料），完全不涉及ZSWIM8/AGO2/miRNA降解机器或TDMD分子机制，差异声明：本文的TDMD指"total dry matter disappearance"（干物质消失率），与他子方向里的Target-Directed miRNA Degradation（TDMD）是同名缩写但完全不同概念，需在检索式中加负向排除词避免误判为同领域拥挤。

**方法要点**　方法上可直接搬用的是其"饥饿/限饲-再喂食"式的析因设计思路（2×2 factorial，多时间点粪便/乳汁采样）以及SCFA与粪便菌群alpha多样性检测流程，可作为大动物模型代谢干预实验设计的参照模板，尤其是多农场（IE/CH）重复验证的严谨性可借鉴到他计划中T2D小型猪ABE敲入实验的多批次设计。

**效应量**　摘要有具体数字：daily digestible energy从d1-28的58.1增至135 MJ；断奶时间IE为d29±0.2、CH为d25.5±1.3；各效应均以P<0.05或P>0.05报告，未给出具体效应量（如差异百分比或均值±SD），【摘要未报告数字】读全文时优先补：GEST5对乳汁固形物/脂肪/SCFA降低的具体百分比及CH粪便SCFA升高的具体浓度值，以及两农场TDMD差异的具体克数或百分比。

**它暴露/承认的空白**　该文明确承认GEST5和LMR+S均未能改善仔猪生长或腹泻，暴露出"母猪端营养干预对仔猪代谢表型的可传递性有限"这一空白，提示纯营养层面干预不足以驱动稳定的代谢记忆效应，间接支持D1-4子方向需要从分子层面（AMPK-ZSWIM8磷酸化开关）而非单纯营养调控层面寻找代谢记忆机制的必要性。

**我不相信的一件事**　本文两个农场（IE vs CH）对LMR+S与DPS的TDMD效应方向完全相反（CH中LMR+S更高、IE中DPS更高），却未在摘要中给出场地×日粮的交互作用检验结果或环境/管理混杂因素的定量分析，这种方向性矛盾若未经过严格的site×diet交互统计校正就直接分别报告，削弱了"creep料形式影响采食"这一结论的跨场地外推力。

**读全文要核对什么**　【需读全文核对】需确认：(1) 图/表中是否有site×diet交互作用的显著性检验，而非仅分场地独立报告P值；(2) 断食-限饲部分的具体日粮配方及能量曲线图，判断是否有可比照的血糖血脂基线对照组；(3) 粪便菌群多样性分析的具体统计方法（如是否校正多重比较）及Prevotella/Succinivibrio丰度变化的具体倍数或相对丰度数值。

**一个可执行动作**　我要在自己一作Cell Death Dis 2019所用T2D小型猪模型体系中做ABE内源敲入ZSWIM8 S609A/S609D并行48小时饥饿-再喂食实验，预期通过同批次qPCR测miR-33/375成熟体绝对拷贝数与pri/pre-miR比值、结合phospho-S609自制抗体IHC/流式，观察到S609D组在再喂食后24-72h仍维持更低的成熟体miR-33/375水平及更持久的血脂血糖异常，而本文提示的"外周营养干预对代谢表型影响有限"可作为阴性对照参照，用以突出分子层面磷酸化开关的特异性贡献。

#### PMID 42798008 · Isoliquiritigenin Elicits Potent Antiviral Activity Against Pseudorabies Virus Through Modulating the cGAS/STING and JAK/STAT Signaling Cascades.
*Veterinary sciences 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42798008/)

**一句话结论**　该文报道异甘草素（isoliquiritigenin）在PK-15细胞中以IC50=35.47 μM、选择指数3.34抑制PRV复制，机制上通过增强cGAS/STING–IRF3磷酸化及JAK/STAT–STAT1磷酸化激活I型干扰素通路，在PRV感染小鼠模型中将死亡率由70%降至30%并降低组织病毒载量。

**与该子方向的关系**　竞争风险：与D1-4子方向无实质竞争，因为其研究对象（猪伪狂犬病毒感染、天然免疫小分子干预）与AMPK–ZSWIM8–S609–miR-33/375代谢记忆假设完全不重叠，仅在物种（猪细胞/猪病毒模型）层面有表面相似性，属于误检索进来的噪声文献，不构成真正竞争。

**方法要点**　该文用PK-15猪肾细胞系做病毒抑制剂量-反应曲线（IC50/SI计算）和PRV感染小鼠模型做体内生存率/病毒载量/干扰素通路验证，这套"细胞IC50筛选＋活体感染攻毒＋通路磷酸化读出"的框架本身可搬用于评估某代谢干预分子是否影响ZSWIM8磷酸化状态，但目标基因和通路完全不同，直接可搬价值有限。

**效应量**　摘要有数字：IC50=35.47 μM，选择指数SI=3.34，小鼠死亡率从70%降至30%（降低40个百分点）；但均为PRV感染/异甘草素抗病毒效应，与miR-33/375降解半衰期、S609磷酸化丰度、血糖血脂曲线等D1-4读出无关，无法直接借用这些数值作对照。

**它暴露/承认的空白**　该文承认现有PRV疫苗仅限猪用、缺乏对跨物种传播变异株有效的抗病毒药物，这一空白与D1-4（内源ZSWIM8磷酸化位点敲入猪代谢表型）无交叉；唯一可能的间接空白提示是：大动物（猪）模型中天然免疫/干扰素通路的药理调控研究相对成熟，但代谢通路磷酸化位点特异性单抗（如phospho-S609）验证方法学在该文献体系内完全没有先例可循。

**我不相信的一件事**　该文将cGAS/STING与JAK/STAT两条通路的激活并列作为异甘草素抗病毒机制，但未在摘要中说明这两条通路的激活是否独立还是存在上下游依赖关系（例如STING激活是否是STAT1磷酸化升高的必要前提），若两者实为同一信号轴的先后节点而非并行机制，则"双通路协同增强免疫"的结论可能夸大了药物靶点的广谱性。

**读全文要核对什么**　【需读全文核对】需确认：(1) IC50/SI测定的具体病毒滴度范围和给药时间窗设计；(2) cGAS/STING核心基因具体是指哪些基因（cGAS、STING、TBK1等）及其检测方法（qPCR还是蛋白层面）；(3) 体内实验的给药剂量、给药时间点相对于感染的先后顺序，以及是否设置了未处理感染对照组和空载体对照组。

**一个可执行动作**　此文与我的D1-4子方向（ABE敲入ZSWIM8 S609A/D小型猪代谢表型）无可直接执行的搬用价值；我仍将按原计划在T2D小型猪模型上用ABE内源敲入S609A/S609D，经48h饥饿-再喂食后于5个时间点取肝/脂肪/胰腺组织，用自制phospho-S609单抗做IHC/流式定量、qPCR测miR-33/375成熟体绝对拷贝数并同批次测pri/pre排除转录层贡献，预期S609D组呈现更持久的miR-33/375降解及血脂血糖异常。

#### PMID 42797962 · Myogenic IL-6 Mediates Myofiber Type Transition in Porcine Skeletal Muscle Satellite Cells via the STAT3/myh7 Pathway.
*Veterinary sciences 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42797962/)

**一句话结论**　该文证明猪骨骼肌卫星细胞中IL-6经STAT3磷酸化后直接结合myh7启动子促进其转录，从而推动I型（慢肌）纤维分化，与Putian猪高IL-6/高Myh7、DLY猪低IL-6/低Myh7的体内表型一致。

**与该子方向的关系**　竞争风险：与D1-4无直接miRNA机制重叠，但撞在"猪代谢/肌纤维表型解释权"层面——若审稿人问及S609D/A猪的骨骼肌能量代谢差异，需排除IL-6/STAT3/myh7这条转录轴作为混杂解释，否则AMPK-ZSWIM8-miR-33/375表型可能被误归因于肌纤维类型转换而非TDMD介导的降解记忆。

**方法要点**　可直接搬用ChIP-PCR和dual-luciferase reporter assay的实验设计思路，用于日后若想验证磷酸化转录因子（如磷酸化STAT3类比磷酸化ZSWIM8下游效应）对靶基因启动子的结合特异性；其"体内品系对比+体外SC分化诱导"的双轨验证框架也可参考用于T2D小型猪的组织表型分层。

**效应量**　摘要未报告数字。读全文时优先补：Putian与DLY猪I型纤维比例的具体百分比、myh7 mRNA/蛋白倍数变化、IL-6处理浓度梯度及对应SC分化比例的量化数值。

**它暴露/承认的空白**　该文承认IL-6是否参与myh7转录此前"remains unclear"，其空白落在肌纤维类型可塑性的上游信号未明；但对D1-4子方向而言，真正的空白仍是磷酸化ZSWIM8S609本身在体内代谢记忆中的因果作用——本文完全未涉及miRNA降解或AMPK通路，不能填补该空白，只提示需在猪模型中控制肌纤维组成这一混杂变量。

**我不相信的一件事**　本文仅用Putian与DLY两个品系的自然差异做相关性推断，未在体内对IL-6或STAT3做条件性敲低/敲除以证明其对I型纤维比例的必要性，故"IL-6驱动"的因果链在体内层面证据不足，可能只是与生长速率/品系背景共变的伴随现象。

**读全文要核对什么**　【需读全文核对】需确认ChIP-PCR所用抗体是否为磷酸化STAT3(Y705)特异性抗体及其验证方法（是否有IgG对照、STAT3敲低对照）；dual-luciferase报告基因实验是否设置myh7启动子STAT3结合位点突变对照；两品系猪的年龄、体重、饲养条件是否匹配，以判断品系差异是否被生长阶段混杂。

**一个可执行动作**　我要在T2D小型猪S609A/S609D敲入模型的肝、脂肪、胰腺取材方案中新增骨骼肌组织及肌纤维类型分型（ATPase染色或Myh7 IHC），预期若S609D组代谢记忆表型伴随肌纤维类型漂移，则需通过IL-6/STAT3抑制剂对照实验排除本文机制作为混杂因素，以确认miR-33/375降解才是血脂血糖异常的主因。

#### PMID 42794578 · Alterations of Gene Expression and Signaling Pathway Activity in Venous Smooth Muscle Cells After Uremic Serum Exposure.
*International journal of molecular sciences 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42794578/)

**一句话结论**　该研究是猪静脉vs动脉平滑肌细胞暴露尿毒血清后的bulk RNA-seq比较，核心结论是尿毒血清诱导vSMCs出现ER应激/未折叠蛋白反应/低氧/线粒体自噬上调而细胞周期与Hippo/Focal Adhesion下调，且这些通路变化在vSMCs与aSMCs间存在方向性差异（如氧化磷酸化在aSMCs更正向）。全文未涉及任何miRNA、AGO2/ZSWIM8/TUT4-7或磷酸化机器相关内容。

**与该子方向的关系**　竞争风险：不构成对D1-4子方向的直接竞争，因为它完全不涉及miRNA降解或ZSWIM8/AMPK通路；但需警惕的是——若未来想解释"代谢记忆"在血管/肾脏侵蚀表型上的下游器官特异性差异，这篇提供了一个概念性竞争解释：即器官/细胞类型特异性转录反应（ER应激、Hippo等）本身即可解释表型差异，而不必诉诸miRNA降解层面的表观修饰，故在撰写D1-4的机制排他性论证时要明确声明"转录层differential response"与"miRNA降解层differential decay"是两条不同层次的解释，避免审稿人质疑你把转录组差异误读成miRNA降解特异性证据。

**方法要点**　可直接搬用的方法是其bulk RNA-seq + interaction-based KEGG GSEA比较两种细胞类型（vSMCs vs aSMCs）差异响应的分析框架，这一"组织/细胞类型交互项GSEA"设计可移植到D1-4中比较肝/脂肪/胰腺三种组织对S609A vs S609D饥饿-再喂食反应的差异富集分析。其余如ORA、GO Biological Process富集分析也是标准可复用工具，但均针对mRNA层面，不能直接用于miRNA成熟体丰度定量。

**效应量**　摘要报告的数字为：408个基因上调、387个基因下调（uremic serum处理后vSMCs中）。【摘要未报告数字】读全文时优先补：ER应激/UPR/低氧通路的富集显著性统计量（FDR、NES值）、vSMCs与aSMCs之间KEGG interaction GSEA的具体通路数量及方向性差异的具体倍数或p值。

**它暴露/承认的空白**　摘要承认的空白是"vein-specific clinical symptoms（如动静脉瘘狭窄）背后的确切机制尚未阐明"，仅提出通路层面的关联假说而未做功能验证（如敲低/过表达验证因果）。这一空白落在D1-4子方向之外，因为该文完全未触及miRNA降解机器或AMPK-ZSWIM8轴，其空白是血管细胞类型特异性转录调控机制的功能验证缺失，与D1-4的"S609磷酸化开关决定代谢记忆持久性"假设无直接交集。

**我不相信的一件事**　该研究仅用bulk RNA-seq做通路富集，未做任何蛋白/功能验证（如无ATF4/CHOP蛋白定量验证ER应激推断，无线粒体自噬通量实验验证mitophagy富集分析），因此"ER应激/UPR/低氧上调"这类结论停留在转录本层面的通路富集推断，尚不能证明蛋白活性或细胞表型层面真实发生了这些过程；此外仅用单一时间点采样，无法判断这些通路变化是急性应激反应还是持续性适应，其"vein-specific"结论的时间稳定性存疑。

**读全文要核对什么**　【需读全文核对】需确认：(1) interaction-based KEGG GSEA的具体统计模型（是否用DESeq2的interaction term还是简单差异比较两组GSEA结果做交集）及其显著性阈值；(2) Figure中vSMCs vs aSMCs对比的具体通路热图/富集图是否给出效应量方向和幅度的定量比较；(3) 是否有RT-qPCR或蛋白层面（Western/IHC）对RNA-seq关键通路基因做正交验证；(4) 尿毒血清处理的浓度、时长及供体来源（是否来自CKD/ESKD患者血清库）等实验设计细节，以判断该体系是否可移植参考。

**一个可执行动作**　我要在T2D小型猪ABE敲入S609A/S609D体系中，借鉴该文的"细胞类型交互项KEGG GSEA"设计，对肝、脂肪、胰腺三种组织在饥饿-再喂食五个时间点的bulk RNA-seq数据做组织间交互富集分析，预期能识别出S609D组特异性延迟的代谢通路恢复模式（如脂肪组织中ER应激/线粒体自噬持续上调）作为miR-33/375降解表型的转录组背景对照，但该分析仅作为背景表征，不能替代我计划做的qPCR成熟体绝对拷贝数与pri/pre-miRNA排除转录层贡献的核心实验。


## D1-5 · 能量应激周期中miRNA半衰期动态测定
**层次：** 方法工具　｜　**拥挤程度：** 词对无共现（两两最小共现 0 篇，全交集 0 篇）　｜　**首篇预计：** 9–12 个月。

> **假设：** 若TDMD加速是能量应激的直接后果，则转录抑制后测定的代谢miRNA半衰期在AMPK激活状态下显著缩短且随ZSWIM8磷酸化状态可逆

**科学前提**

[已发表] ZSWIM8/Cul3 介导的TDMD机制已由Han 2020 (Science)与Shi 2020 (Science)确立，靶miRNA降解依赖ZSWIM8对AGO的多聚泛素化。[已发表] AMPK底物识别基序（1995年确立）与AMPK调控代谢的综述已存在，但无AMPK直接调控TDMD机器的实验证据。[本项目计算] 自建AMPK PSSM打分显示ZSWIM8-S609处于98.3百分位、S608处于96.4百分位，仅为基于序列相似性的假设生成级别，本身不构成磷酸化或功能证据，需体外激酶实验与半衰期测定共同验证。[待测] 若AMPK活化确实驱动TDMD加速，则应观察到能量应激下代谢miRNA半衰期缩短，且此缩短应依赖ZSWIM8 S608/S609磷酸化状态而非转录变化。

**第一个关键实验**

在肝细胞系（如AML12或原代肝细胞，Seahorse验证代谢应激）中，用actinomycin D或DRB完全阻断转录后，分别在AMPK激活（AICAR/2-DG处理）与静息状态下，于0、2、4、8、16小时取样，qPCR测定miR-33、miR-375等候选miRNA成熟体绝对拷贝数（spike-in归一化），拟合一级降解动力学计算半衰期；同批次细胞用自制phospho-S608/S609抗体做WB确认AMPK活化窗口内ZSWIM8磷酸化状态；样本量每组n=4次独立生物学重复×3个时间点重复孔。

**必须的对照**

必须设AMPK激活+ZSWIM8-S608A/S609D（ABE/BE4内源编辑不可磷酸化/磷酸化模拟）细胞系对照，判断半衰期变化是否随磷酸化状态可逆；必须同时测pri-miRNA与pre-miRNA水平（不受transcription-block影响的本底对照），排除TGF-β/Smad3等转录层机制混杂；必须设AMPK激活但ZSWIM8 knockout/knockdown对照，验证半衰期缩短依赖ZSWIM8而非其他降解通路；必须设非应激代谢无关miRNA（如miR-16）作阴性对照排除全局RNA降解效应；转录阻断剂本身需设DMSO/vehicle对照排除药物毒性对半衰期测定的干扰。

**为什么是他能做**

他已掌握ABE/BE4内源位点编辑技术，可直接在细胞系或后续大动物模型中构建ZSWIM8-S608A/S609D敲入用于本实验的可逆性判定；他有杂交瘤单抗制备经验，可自制phospho-S608/S609特异性抗体用于确认AMPK活化窗口，这是文献中不存在的独特试剂；他一作Cell Death Dis 2019建立的T2D小型猪模型为半衰期发现后续转向体内验证提供天然延伸路径。

**可行性**

半衰期测定（actinomycin D chase、一级动力学拟合）他尚未做过，需新学，预计1–2个月建立流程并用已知短/长半衰期miRNA标准品校准；细胞代谢应激处理（AICAR/2-DG/Seahorse）为常规技术可快速上手；自制phospho抗体制备约需3–4个月（杂交瘤已熟练）；ABE/BE4内源编辑细胞系构建约1–2个月；不需外部合作即可完成本子方向的核心细胞实验，质谱验证留待后续方向1旗舰假设。

**最大风险与放弃条件**

最大风险是转录阻断剂（actinomycin D/DRB）本身诱导应激反应或全局miRNA降解通路激活，混淆AMPK特异性效应；放弃条件为：若AMPK激活组与静息组在miR-33/miR-375的半衰期差异<20%且无统计学显著性（双尾t检验p>0.05，n=4生物学重复），或若ZSWIM8-S608A/S609D敲入细胞中AMPK激活仍能同等缩短半衰期（即半衰期变化不随磷酸化状态可逆），则判定AMPK-ZSWIM8磷酸化驱动TDMD假设不成立，退回方向2（TUT4/7-miR-29纤维化）作为主线。

**目标期刊与基金**

Molecular Cell 或 RNA（方法学与机制并重期刊）；适配基金机制为NIH R21（探索性/高风险高回报，两年期，契合此为方法建立阶段）。

**首篇预计**

9–12 个月。

**做成之后的下一步**

若半衰期缩短确认且依赖磷酸化状态可逆，下一步自然延伸到体外激酶反应直接验证AMPK对ZSWIM8-S608/S609的磷酸化催化活性，衔接方向1旗舰假设的机制核心环节。

**拥挤程度核查（可复算）**

检索式：`(ZSWIM8[tiab] OR TDMD[tiab]) AND ("miRNA half-life"[tiab] OR AMPK[tiab])`

| 层级 | 检索式 | 全库命中 |
|---|---|---|
| 单词 | `(ZSWIM8[tiab] OR TDMD[tiab])` | 105 |
| 单词 | `("miRNA half-life"[tiab] OR AMPK[tiab])` | 33632 |
| 两两 | `(ZSWIM8[tiab] OR TDMD[tiab]) AND ("miRNA half-life"[tiab] OR AMPK[tiab])` | 0 |
| **全交集** | `(ZSWIM8[tiab] OR TDMD[tiab]) AND ("miRNA half-life"[tiab] OR AMPK[tiab])` | **0** |

**配套文献与笔记（4 篇）**

#### PMID 42681318 · Target-Directed miRNA Degradation: Mechanisms and Significance.
*Methods in molecular biology (Clifton, N.J.) 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42681318/)

**一句话结论**　这是一篇方法学综述章节，系统梳理TDMD的分子步骤（Argonaute构象变化、tailing/trimming、ZSWIM8介导降解）及其与转录后调控、疾病和治疗的关联，未提供任何原始实验数据或半衰期数值。

**与该子方向的关系**　提供方法：为D1-5的实验设计提供TDMD/tailing-trimming/ZSWIM8机制背景知识框架，但不涉及AMPK或能量应激状态下miRNA半衰期的具体测定方案，需另找半衰期检测的technical protocol（如actinomycin D chase、spike-in qPCR）章节。

**方法要点**　摘要提及tailing and trimming可诱导Argonaute重排从而触发TDMD，此机制依赖性是context-dependent；若全文含具体的3′末端修饰检测或Argonaute构象分析方法（如CLIP、结构生物学手段），可直接搬用于验证ZSWIM8磷酸化后是否伴随下游tailing/trimming变化。

**效应量**　【摘要未报告数字】读全文时优先补：TDMD导致的miRNA降解速率或半衰期缩短的具体倍数/时间常数，以及tailing/trimming长度分布的定量数据，若章节含此类基准值可作为D1-5实验结果的对照参考。

**它暴露/承认的空白**　摘要明确承认"miRNA turnover的机制因每个miRNA稳定性不同而理解不足"，这一空白直接落在D1-5——本方向正是要通过actinomycin D阻断转录后系统测定miR-33/miR-375在AMPK激活状态下的半衰期动态，填补这一"稳定性个体差异"的知识缺口。

**我不相信的一件事**　摘要将tailing and trimming与TDMD并列描述为"often associated"且强调其mechanistic role是context-dependent，但未说明这种关联是必要条件还是伴随现象——若ZSWIM8介导的TDMD可以在无显著tailing/trimming变化的情况下发生，则D1-5拟用phospho-ZSWIM8状态推断TDMD活性的逻辑链需要独立验证tailing/trimming是否为必经步骤而非仅相关。

**读全文要核对什么**　【需读全文核对】需确认：(1)本章节是否包含actinomycin D/DRB转录阻断结合spike-in qPCR测定miRNA半衰期的具体操作流程与图表；(2)是否列出ZSWIM8磷酸化或激酶调控TDMD的已知位点/文献对照值；(3)方法章节的对照设计（如TDMD阳性对照target如Cyrano-miR-7、阴性对照miRNA）以判断是否可直接套用于D1-5的实验对照组设置。

**一个可执行动作**　我要在AML12肝细胞系体系中，参照本章节所述TDMD/ZSWIM8机制框架设计actinomycin D转录阻断后miR-33/miR-375半衰期时间序列qPCR实验，预期AMPK激活（AICAR/2-DG）组半衰期显著短于静息组，且该缩短与自制phospho-S608/S609抗体检测到的ZSWIM8磷酸化状态呈正相关。

#### PMID 42608480 · Canonical and non-canonical miRNA degradation shapes state transitions and stemness in breast cancer.
*The EMBO journal 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42608480/)

**一句话结论**　该文用CRISPRi去ZSWIM8+miRNA-seq+AGO2-eCLIP在乳腺癌细胞中系统鉴定出19个高置信TDMD底物（含miR-29b-3p、miR-33a/b-5p），并证明NREP触发miR-29b-3p的TDMD与EMT可塑性/干性亚群相关；同时发现一种不依赖ZSWIM8/蛋白酶体的非经典降解（SERPINE1触发miR-30c-5p降解，介导紫杉醇耐药）。

**与该子方向的关系**　支持前提：它在人源细胞体系里独立验证了miR-29b-3p、miR-33a/b-5p确系ZSWIM8-TDMD的天然底物，为D1-5假设"AMPK下游代谢miRNA经ZSWIM8降解"提供了底物清单层面的正当性支撑；同时也是竞争风险——它揭示存在ZSWIM8非依赖的非经典降解通路（SERPINE1/miR-30c），提示若D1-5实验中半衰期缩短不随ZSWIM8磷酸化状态可逆，可能是撞上了这条平行通路而非AMPK-ZSWIM8轴。

**方法要点**　可直接搬用：CRISPRi敲低ZSWIM8+AGO2-eCLIP的组合来在肝细胞系中确认候选triggers（NREP样转录本）是否与miR-33/miR-375直接结合，弥补他目前缺smallRNA-seq经验的问题，可考虑合作获取该流程的AGO2-eCLIP文库构建细节。

**效应量**　【摘要未报告数字】读全文时优先补：19个TDMD底物的具体降解幅度（miR-29b-3p、miR-33a/b-5p在ZSWIM8敲低后的fold-change或半衰期变化数值）、NREP敲低/过表达对miR-29b-3p水平的定量效应、SERPINE1-miR-30c轴的IC50/耐药倍数。

**它暴露/承认的空白**　摘要明确承认"TDMD在人类癌症中的作用仍largely unexplored"，且其体系局限于乳腺癌细胞系静态状态，未涉及能量应激/AMPK信号对TDMD动力学的调控——这正是D1-5要补的空白：把TDMD底物验证从"癌细胞组成性状态"推进到"代谢应激动态可逆窗口"。

**我不相信的一件事**　该文将miR-33a/b-5p归为ZSWIM8-TDMD底物，但摘要未说明是否排除了miR-33所在SREBF2宿主基因的pri-miRNA转录调控变化（类似miR-29的TGF-β/Smad3转录抑制问题）——若miRNA-seq只测了成熟体丰度而没有同时测pri/pre-miR-33，则"TDMD导致miR-33下降"这一结论可能混杂了转录层抑制，需要读全文核对其是否做了pri/pre vs mature的区分实验。

**读全文要核对什么**　【需读全文核对】需确认：(1)19个TDMD底物的判定标准图（ZSWIM8 CRISPRi后miRNA-seq的fold-change阈值及统计方法）；(2)miR-33a/b-5p是否有pri/pre-miRNA层面的对照（RT-qPCR或RNA-seq intron reads）以排除转录抑制混淆；(3)AGO2-eCLIP鉴定NREP/SERPINE1为trigger转录本的binding peak示意图及序列互补性分析；(4)非经典（ZSWIM8非依赖）降解机制的机制性对照实验（蛋白酶体抑制剂MG132处理、ZSWIM8 knockout验证）。

**一个可执行动作**　我要在AML12肝细胞体系里，先用CRISPRi/CRISPR敲低ZSWIM8并做AGO2-eCLIP，比照本文方法确认miR-33、miR-375是否存在类似NREP样的直接trigger转录本结合；随后在actinomycin D阻断转录+AICAR/2-DG诱导AMPK激活的条件下测定这些候选miRNA的成熟体半衰期，同时RT-qPCR平行测pri/pre-miR-33以排除转录层贡献，预期若半衰期缩短随phospho-ZSWIM8(S608/S609)状态可逆，则支持AMPK直接加速TDMD而非转录抑制假象。

#### PMID 42352502 · Identification of circCIAO1(5) and circMALAT1 as Novel Potential Biomarkers for Bladder Cancer Monitoring Based on the Binding to miR-101-3p.
*Cancers 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42352502/)

**一句话结论**　circCIAO1(5)和circMALAT1通过高亲和力（TDMD score>1.1）结合miR-101-3p并招募Ago2，在膀胱癌尿液和细胞中上调，通过海绵化miR-101-3p解除其对EZH2的抑制，促进增殖、迁移和侵袭。

**与该子方向的关系**　竞争风险：本文用circRNA-miRNA的TDMD score筛选框架来解释miR-101-3p水平/活性变化，属于"非ZSWIM8依赖的circRNA海绵化"降解/失活机制，若在D1-5的能量应激体系中miR-33/miR-375表观半衰期缩短，需先排除是否存在类似circRNA或竞争性RNA介导的隔离效应而非真正的ZSWIM8-TDMD降解，否则会与本文机制混淆而误判半衰期变化的因果层。

**方法要点**　其"TDMD score>1.1"数据库筛选法可搬用于预筛AMPK应激状态下miR-33/miR-375是否存在潜在circRNA/lncRNA "诱饵"结合位点，作为半衰期实验前的排除性对照设计；其Ago2-binding site prioritization思路也可用于设计对照探针，确认qPCR检测的是Ago2-loaded的功能性成熟miRNA而非游离降解片段。

**效应量**　摘要未报告数字，读全文时优先补：circCIAO1(5)和circMALAT1在BCa尿液与复发/缓解组间的定量表达差异（fold change或拷贝数）、miR-101-3p结合亲和力的具体TDMD score数值、以及功能实验（增殖/迁移/侵袭）的效应量（如%变化或统计量）。

**它暴露/承认的空白**　本文承认"识别具有临床意义的circRNA仍具挑战"，落在D1-5子方向上的空白是：目前缺乏在能量应激/AMPK激活背景下，系统评估是否存在类似circRNA或其他ceRNA机制干扰miR-33/miR-375表观降解动力学测定的研究，即半衰期实验的特异性对照空白。

**我不相信的一件事**　本文将circRNA过表达导致的"miR-101-3p sequestration"等同于功能性降解/失活证据，但摘要未说明是否检测了miR-101-3p的绝对拷贝数变化（成熟体丰度本身是否下降）还是仅靠EZH2下游报告基因活性推断，若miR-101-3p总量未变而只是Ago2-loading分布改变，则"海绵化"机制的因果链证据不足，这类"功能性隔离≠降解"的模糊性正是D1-5必须用spike-in归一化绝对定量来严格排除的。

**读全文要核对什么**　【需读全文核对】需确认：(1)circCIAO1(5)/circMALAT1过表达实验中miR-101-3p成熟体绝对拷贝数是否被直接测定（而非仅推断），及所用定量方法是否有spike-in或标准曲线归一化对照；(2)Ago2-binding site profile的验证方法（RIP-seq/CLIP还是仅预测），是否有IgG/敲低Ago2的阴性对照；(3)复发vs缓解组的样本量、临床分期匹配情况及尿液RNA提取/稳定性对照。

**一个可执行动作**　我要在AML12肝细胞系体系中，于AICAR/2-DG诱导AMPK激活后，先用TDMD score类数据库筛选法排查miR-33/miR-375是否存在已知circRNA/lncRNA诱饵结合位点，再用actinomycin D阻断转录后的spike-in归一化qPCR绝对定量测其半衰期，预期若半衰期缩短主要由ZSWIM8-TDMD而非circRNA海绵化驱动，则该效应应随phospho-ZSWIM8(S608/S609)状态可逆，且不依赖候选circRNA的表达水平变化。

#### PMID 42098137 · CLASHub is an integrated database and analytical platform for microRNA-target interactions.
*Nature communications 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42098137/)

**一句话结论**　这篇报道了CLASHub数据库，整合25种细胞/组织的CLASH数据（含91个新数据集），并纳入ZSWIM8 knockout样本，用于系统挖掘miRNA-靶点直接互作及TDMD触发子；示例性地找到ATP6V1G1 3'UTR是miR-335-3p的TDMD触发子。

**与该子方向的关系**　提供方法：该平台不直接测miRNA半衰期，但其ZSWIM8-KO CLASH/RNA-seq/miRNA-seq数据及Analyzer工具，可用于在体系选择、候选miRNA-触发子筛选、以及验证ZSWIM8依赖性方面为D1-5提供上游信息学支持，不构成竞争关系。

**方法要点**　核心方法是CLASH（proximity ligation within AGO complexes）获得直接miRNA-mRNA杂交读段，配合ZSWIM8 knockout对比来鉴定TDMD triggers；他可以直接搬用的是用ZSWIM8-KO vs WT的miRNA-seq/CLASH差异分析思路，去筛选AML12肝细胞系里miR-33/miR-375是否存在已知或候选TDMD triggers，从而为半衰期实验挑选真正受TDMD调控的候选miRNA。

**效应量**　摘要未报告数字。读全文时优先补：CLASHub中肝脏/肝细胞相关数据集数量、miR-33和miR-375在数据库中是否有记录的TDMD triggers及其富集倍数或统计显著性、ZSWIM8-KO后这两个miRNA成熟体丰度变化的具体fold-change。

**它暴露/承认的空白**　摘要承认现有CLASH数据集"remain limited to a few human and mouse samples"，即使扩充后仍是static snapshot（单一时间点的互作图谱），并未覆盖miRNA降解的动力学过程；这恰好落在D1-5子方向——半衰期时序测定——是CLASHub完全缺失的维度，说明D1-5的"词对无共现"拥挤度判断是合理的，是真空白而非重复劳动。

**我不相信的一件事**　CLASHub用ZSWIM8-KO静态细胞系数据推断TDMD triggers，但这类稳态KO比较无法区分"该miRNA本身半衰期缩短是ZSWIM8磷酸化激活的直接后果"还是"ZSWIM8缺失导致的间接下游代偿"，即无法回答D1-5核心假设中"随磷酸化状态可逆"这一动态命题，摘要中也未提及任何能量应激或AMPK相关处理，其TDMD triggers鉴定与代谢应激下的可逆性完全是两件事。

**读全文要核对什么**　【需读全文核对】需确认CLASHub中是否有肝脏来源（尤其是AML12或原代肝细胞）或代谢相关组织的CLASH数据集及其ZSWIM8-KO对照设计（细胞类型、处理条件、是否有代谢应激扰动）；需核对miR-33/miR-375条目在Analyzer界面输出的CLASH hybrid reads数量、target 3'UTR序列比对及cumulative fraction curve图，判断这些miRNA是否已被数据库标注为TDMD substrate。

**一个可执行动作**　我要在AML12肝细胞系体系中，先用CLASHub的Analyzer工具检索miR-33、miR-375是否已有记录的CLASH hybrid互作和ZSWIM8-KO差异表达证据，以此筛选/验证候选TDMD substrate身份，再据此优先安排actinomycin D时序半衰期实验的候选miRNA，预期能减少因盲目选择候选miRNA而浪费的qPCR时序实验批次。


## D1-6 · phospho-ZSWIM8抗体与smallRNA-seq联合诊断平台
**层次：** 方法工具　｜　**拥挤程度：** 词对无共现（两两最小共现 0 篇，全交集 0 篇）　｜　**首篇预计：** 14–18个月

> **假设：** 若磷酸化ZSWIM8水平可作为代谢应激记忆的生物标志物，则组织/血液phospho-S609信号结合smallRNA-seq谱可区分曾经历能量应激的代谢记忆状态与初始状态

**科学前提**

[已发表] ZSWIM8/Cul3 介导的TDMD机制已由Han 2020与Shi 2020建立，2026年cryo-EM结构解析了ZSWIM8识别底物的构象基础，为S608/S609所处结构域是否影响底物结合口袋提供了结构参照。[已发表] AMPK底物识别基序（1995年确立的LXRXXS/T φ 模式）为S609/S608评分提供依据。[本项目计算] 自建AMPK PSSM打分显示S609处于98.3百分位、S608处于96.4百分位，这仅是基于已知底物序列的假设生成级排序，本身不构成磷酸化证据，必须由体外激酶实验和内源phospho抗体验证。[待测] 若phospho-S609信号在能量应激后升高且与代谢相关miRNA（miR-33/miR-375）成熟体下降相关，且这种关联在应激解除后可持续一段时间（形成"记忆窗口"），则支持其作为代谢记忆生物标志物的假设；此关联尚无任何文献报道，是本子方向的核心待测点。

**第一个关键实验**

在T2D小型猪模型（他一作Cell Death Dis 2019用系）中设计一次急性能量应激范式（禁食48h或AICAR/二甲双胍处理），在应激期、应激后24h、72h、7天四个时间点分别取肝脏/骨骼肌活检与外周血（n=6只/时间点，含未应激对照n=6），同一样本平行做：（1）自制phospho-S609/S608单抗做western blot和IHC定量磷酸化ZSWIM8水平；（2）smallRNA-seq测miR-33/miR-375/miR-29成熟体与前体（pri/pre-miRNA用RT-qPCR单独定量）丰度；将phospho信号轨迹与miRNA丰度轨迹做时间序列相关分析，判断是否存在滞后关联（记忆窗口）。

**必须的对照**

必须设置：（1）未应激同窝对照，排除个体/批次差异；（2）phospho抗体特异性对照——用ABE/BE4在同一细胞系内源编辑S609A（不可磷酸化）和S609D（拟磷酸化）两株，抗体应仅在野生型应激后和S609D株中显阳性信号，S609A株任何条件下应为阴性；（3）关键竞争解释排除：同时定量pri-miRNA/pre-miRNA（RT-qPCR）与成熟体（smallRNA-seq），若phospho-ZSWIM8升高但pri/pre-miR-33、miR-375不变而仅成熟体下降，方能排除TGF-β/Smad3等转录层机制的贡献；（4）ZSWIM8敲低或Cul3抑制对照，验证观察到的成熟体下降依赖TDMD通路而非其他降解途径。

**为什么是他能做**

他已掌握杂交瘤单抗制备技术，可自制phospho-S608/S609特异性抗体，这是本子方向能否成立的第一道门槛，别的实验室通常需要外包或长期摸索。他一作发表的T2D小型猪模型（Cell Death Dis 2019）提供了唯一现成的、可反复取材做能量应激范式的大动物代谢平台，且他有ABE/BE4内源位点编辑经验可直接构建S609A/S609D对照细胞系用于抗体特异性验证，三项技能叠加使他成为少数能同时把"磷酸化位点特异性抗体+内源基因编辑对照+大动物纵向取材"整合到一个诊断平台上的人。

**可行性**

已具备：杂交瘤单抗制备、ABE/BE4内源编辑、大动物模型、IHC/流式，这些是平台搭建的核心骨架，无需新学。需新学或合作：smallRNA-seq（文库构建与生信分析，预计3–4个月学习曲线或找核心设施合作）、miRNA半衰期测定（需建立pulse-chase体系，预计2–3个月）；体外激酶生化验证（AMPK-ZSWIM8直接磷酸化实验）建议与有激酶生化平台的实验室合作而非自建。整体起步成本中等，抗体制备是最耗时环节（预计4–6个月出候选克隆），其余可并行推进。

**最大风险与放弃条件**

最大风险：自制phospho抗体在S609A对照株中仍显阳性信号（说明抗体非特异性识别其他磷酸化位点或表位），或体外激酶反应显示AMPK对ZSWIM8-S608/S609肽段磷酸化阴性（PSSM高分未被生化验证）。明确放弃条件：若满足以下任一项即停止本诊断平台子方向，退回旗舰方向D1的机制验证阶段用重组蛋白体系先做纯化学证据——（1）体外激酶反应连续3次重复均无法检测到AMPK对该位点磷酸化信号；（2）phospho抗体在S609A细胞系中信号强度与野生型无统计学差异（说明抗体不特异）；（3）纵向猪模型中phospho信号与miR-33/375成熟体丰度的时间序列相关系数不显著（|r|<0.3, p>0.1），说明即使磷酸化存在也与miRNA降解无关联，此时该分子不能作为代谢记忆标志物。

**目标期刊与基金**

目标期刊：Cell Metabolism或Nature Metabolism（方法/资源类文章，强调可转化的诊断平台价值）；备选Molecular Cell（若机制证据更充分）。适配基金机制：NIH R21（探索性/高风险高回报，适合方法验证阶段）后续申请R01（若纵向猪数据支持记忆窗口假设）；也可申请JDRF或ADA（糖尿病相关）资助大动物纵向队列扩展。

**首篇预计**

14–18个月

**做成之后的下一步**

若诊断平台验证成功（phospho信号与代谢记忆窗口显著关联），下一步将平台应用于人类血液样本（T2D患者队列），探索phospho-ZSWIM8作为无创代谢应激史生物标志物的临床转化潜力，并反哺旗舰方向D1的机制研究提供体内直接证据。

**拥挤程度核查（可复算）**

检索式：`(ZSWIM8[tiab] OR TDMD[tiab]) AND ("phospho-specific antibody"[tiab] OR AMPK[tiab]) AND ("small RNA sequencing"[tiab] OR biomarker[tiab])`

| 层级 | 检索式 | 全库命中 |
|---|---|---|
| 单词 | `(ZSWIM8[tiab] OR TDMD[tiab])` | 105 |
| 单词 | `("phospho-specific antibody"[tiab] OR AMPK[tiab])` | 33832 |
| 单词 | `("small RNA sequencing"[tiab] OR biomarker[tiab])` | 318363 |
| 两两 | `(ZSWIM8[tiab] OR TDMD[tiab]) AND ("phospho-specific antibody"[tiab] OR AMPK[tiab])` | 0 |
| 两两 | `(ZSWIM8[tiab] OR TDMD[tiab]) AND ("small RNA sequencing"[tiab] OR biomarker[tiab])` | 6 |
| 两两 | `("phospho-specific antibody"[tiab] OR AMPK[tiab]) AND ("small RNA sequencing"[tiab] OR biomarker[tiab])` | 486 |
| **全交集** | `(ZSWIM8[tiab] OR TDMD[tiab]) AND ("phospho-specific antibody"[tiab] OR AMPK[tiab]) AND ("small RNA sequencing"[tiab] OR biomarker[tiab])` | **0** |

**配套文献与笔记（4 篇）**

#### PMID 42352502 · Identification of circCIAO1(5) and circMALAT1 as Novel Potential Biomarkers for Bladder Cancer Monitoring Based on the Binding to miR-101-3p.
*Cancers 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42352502/)

**一句话结论**　该文用TDMD score>1.1数据库筛选法找到circCIAO1(5)和circMALAT1两种膀胱癌尿液circRNA，二者通过与Ago2共结合、竞争性结合miR-101-3p来解除对EZH2的抑制，从而促进增殖迁移侵袭；两者在缓解期与复发期表达存在差异。

**与该子方向的关系**　竞争风险——本文直接把"TDMD score"这一术语用作circRNA-miRNA亲和力预测工具，而非ZSWIM8介导的TDMD降解机制本身，若不加区分容易被审稿人误读为"TDMD领域已被circRNA生物标志物方向占用"；此外其miR-101-3p/Ago2/circRNA海绵机制与方向1的AMPK-ZSWIM8-TDMD代谢记忆机制在分子层面完全不同（一个是竞争性内源RNA海绵，一个是靶miRNA降解酶磷酸化激活），需在写作中明确声明二者不是同一"TDMD"概念以避免概念混淆撞车。

**方法要点**　可直接搬用的是其"数据库筛选+多重优先级打分（致癌基因来源、外泌子/lncRNA来源、Ago2结合位点谱）+尿液与细胞株平行验证+功能学增殖/迁移/侵袭实验"的候选分子筛选流程范式，可用于D1-6中筛选与磷酸化ZSWIM8/AMPK通路相关的候选miRNA-靶基因对的类似多层优先级排序逻辑；其Ago2结合位点谱分析方法（评估RNA-Ago2互作特异性）也可借用于验证phospho-ZSWIM8抗体特异性识别的下游RNA底物富集情形。

**效应量**　摘要未报告数字。读全文时优先补：circCIAO1(5)和circMALAT1在BCa尿液样本中相对健康对照的具体倍数变化（fold change）、TDMD score>1.1的具体数值分布及miR-101-3p结合亲和力的Kd或IC50数据、复发组与缓解组circRNA表达差异的统计显著性(p值)及样本量。

**它暴露/承认的空白**　摘要承认"识别临床相关circRNA仍具挑战性"，暴露出circRNA-miRNA互作预测算法（如TDMD score）与真实体内功能验证之间的空白；这落在D1-6子方向上体现为——本文完全未涉及磷酸化状态或激酶信号对miRNA稳态的调控，说明"生物标志物候选筛选流程"和"翻译后修饰驱动的miRNA降解机制"之间仍是两条独立未整合的证据链，D1-6需要自己建立phospho-ZSWIM8与miRNA丰度的直接关联而非借用此文的机制假设。

**我不相信的一件事**　该研究将"circRNA过表达导致miR-101-3p海绵化从而解除EZH2抑制"作为核心机制推断依据，但摘要中并未说明是否做了miR-101-3p水平的直接定量恢复实验（如circRNA敲降后miR-101-3p成熟体丰度是否回升），仅凭功能表型（增殖/迁移/侵袭增强）和结合实验来"consistent with"海绵化机制，属于关联推断而非因果验证，且未排除circRNA本身通过其他非miRNA依赖途径（如直接调控EZH2转录或蛋白稳定性）产生同样表型的可能性。

**读全文要核对什么**　【需读全文核对】需确认：(1) 图中是否有circRNA敲降/过表达后miR-101-3p成熟体丰度的直接RT-qPCR或smallRNA-seq定量图，以及EZH2蛋白/mRNA水平的对照回补实验；(2) Ago2 RIP-seq或CLIP实验的具体对照组设置（IgG对照、Ago2敲低对照）；(3) 参考文献中是否引用了ZSWIM8/TDMD经典机制文献（如Shi et al. 2020 Ago2-ZSWIM8）以确认其"TDMD score"算法的原始出处和定义边界，避免与真正的target-directed miRNA degradation机制混淆引用。

**一个可执行动作**　我要在T2D小型猪代谢应激范式的smallRNA-seq数据分析中，借鉴本文"多层优先级筛选+Ago2结合位点谱"的流程逻辑，对miR-33/miR-375/miR-29的候选上游调控RNA（如是否存在竞争性内源RNA海绵）先行排除，以确认应激后miRNA成熟体丰度变化主要由phospho-ZSWIM8驱动的TDMD而非circRNA/lncRNA海绵机制贡献，从而在因果链上区分本子方向与本文机制的差异。

#### PMID 40480978 · Translation suppresses exogenous target RNA-mediated microRNA decay.
*Nature communications 2025* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/40480978/)

**一句话结论**　TDMD触发子位于3'UTR比位于CDS更有效诱导miRNA降解，因为CDS区被核糖体翻译时空间遮蔽了miRNA结合位点；抑制翻译后CDS触发子降解效率上升，提示核糖体占位是CDS触发子失效的主因。作者用smallRNA-seq筛选对全局翻译状态敏感的内源miRNA，但未能可靠指认出内源CDS触发子。

**与该子方向的关系**　竞争风险：该文强调TDMD触发子几乎都在非编码区（3'UTR/lncRNA）且CDS触发子因核糖体占位而失效，这直接挑战D1-6里"磷酸化ZSWIM8驱动TDMD"的隐含前提——如果他后续想在AMPK通路靶基因mRNA的CDS区找TDMD触发子来解释miR-33/miR-375降解，本文等于说这条路很难走通，需要优先去3'UTR找触发子而非CDS。

**方法要点**　可搬的方法：报告基因系统中在3'UTR vs CDS插入TDMD触发子做对照，以及用翻译抑制剂（如cycloheximide/harringtonine）处理后比较miRNA降解效率变化，这一对照设计可直接搬到他的猪模型或类器官系统中验证AICAR/二甲双胍是否通过改变翻译状态影响特定miRNA的可及性。smallRNA-seq筛选"翻译敏感型miRNA"的分析流程（比较翻译抑制前后miRNA丰度变化）也是可复用的方法框架。

**效应量**　摘要未报告数字，读全文时优先补：3'UTR触发子相较CDS触发子诱导miRNA降解的具体倍数或百分比差异、翻译抑制剂处理后CDS触发子降解效率提升的定量数值，以及smallRNA-seq筛出的翻译敏感miRNA清单及其fold change阈值。

**它暴露/承认的空白**　该文明确承认"无法confidently指认内源CDS触发子"，这是一个方法学空白——落在D1-6子方向上：即目前缺乏区分"ZSWIM8磷酸化改变的是CDS区触发子可及性还是3'UTR区触发子活性"的实验手段，他的smallRNA-seq联合phospho抗体平台若要声称检测"记忆状态"，必须先排除翻译状态本身对miRNA降解的干扰。

**我不相信的一件事**　本文用报告基因系统里人工插入的TDMD触发子做核糖体占位实验，但未证明内源生理条件下（如禁食/AICAR处理引起的翻译速率变化）是否真的会同步改变ZSWIM8对内源靶miRNA的降解活性；核糖体占位与ZSWIM8磷酸化状态两者对miRNA降解的贡献如果同时变化，会造成混杂，本文未提供区分二者贡献的实验证据。

**读全文要核对什么**　【需读全文核对】需确认图中报告基因3'UTR vs CDS触发子的具体序列设计与ZSWIM8/N4BP2依赖性验证；需核对smallRNA-seq筛选"翻译敏感miRNA"时是否使用了代谢应激相关处理（如禁食、AMPK激活剂）还是仅用cycloheximide/puromycin等一般翻译抑制剂；需核对miR-33/miR-375/miR-29是否出现在其筛出的候选miRNA列表中及其统计阈值。

**一个可执行动作**　我要在T2D小型猪禁食/AICAR急性能量应激范式的肝脏与骨骼肌活检体系里，增加一组翻译速率对照（多聚核糖体分析或puromycin掺入法），检测应激状态下整体翻译速率变化，并与phospho-S609信号及miR-33/miR-375成熟体降解速率的时间序列关联做联合分析，预期若翻译速率变化先于或伴随phospho信号变化，则需要将"核糖体占位混杂"作为alternative explanation纳入记忆窗口判定模型，而非单纯归因于ZSWIM8磷酸化。

#### PMID 37553261 · Target-directed microRNA degradation regulates developmental microRNA expression and embryonic growth in mammals.
*Genes & development 2023* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/37553261/)

**一句话结论**　Zswim8全身/条件性敲除小鼠出现心肺发育缺陷、生长受限及围产期致死，胚胎组织smallRNA-seq系统扩大了受TDMD调控的miRNA目录，并首次证明TDMD可驱动miRNA前体"臂转换"现象；敲除miR-322/miR-503可挽救Zswim8缺失胚胎的生长受限，直接证明TDMD通路调控哺乳动物体型。

**与该子方向的关系**　支持前提：本文用Zswim8全身/条件性敲除小鼠+胚胎smallRNA-seq证实TDMD在体内广泛存在且具发育功能，为D1-6假设"ZSWIM8活性可作为可测量的生理状态标志"提供了因果层面的必要性证据（即ZSWIM8确实在体内决定特定miRNA稳态），但本文完全未涉及磷酸化S608/S609位点或代谢应激/AMPK情境，不构成方法或对照的直接支持。

**方法要点**　核心可搬方法：胚胎/组织smallRNA-seq联合pri/pre-miRNA的独立定量（用以区分转录抑制vs降解）的实验设计逻辑，与他计划中"smallRNA-seq+RT-qPCR区分成熟体/前体"完全同构，可直接借鉴其数据分析框架（如成熟体/前体比值作为TDMD活性指标）；此外其conditional Zswim8缺失小鼠模型也提示了"组织特异性丢失功能"的对照设计思路，但小型猪体系无法直接搬用基因敲除策略。

**效应量**　摘要未报告数字。读全文时优先补：miR-322/miR-503及其他TDMD靴子miRNA在Zswim8-null胚胎中的成熟体丰度倍数变化、生长挽救的具体体重/体长数据，以及新扩展的TDMD-miRNA目录中是否包含miR-29/miR-33/miR-375。

**它暴露/承认的空白**　摘要明确承认"the biological role and scope of miRNA regulation by TDMD in mammals remains poorly understood"，这一空白恰好落在D1-6子方向——本文只证明TDMD存在广泛发育功能，但未建立任何可测量的分子标志物（如磷酸化状态）与生理/应激状态之间的对应关系，也未涉及成体代谢应激情境，留出的正是"phospho-ZSWIM8作为记忆生物标志物"的空白。

**我不相信的一件事**　本文用于证明TDMD因果性的关键证据是miR-322/miR-503双敲除"挽救"生长表型，但这只证明这两个miRNA的过度稳定是致死表型的下游驱动因子，并不能反推"ZSWIM8丰度或活性变化"本身是可测的动态生物标志物——若ZSWIM8蛋白本身在正常胚胎发育中丰度/活性恒定不变，那么其磷酸化状态未必对应任何有意义的"记忆窗口"，本文完全没有测定ZSWIM8蛋白本身在不同发育阶段/组织中的丰度或翻译后修饰动态，这是将其结论套用到D1-6"phospho信号轨迹"假设时的关键断层。

**读全文要核对什么**　【需读全文核对】需确认：(1)图中miR-322/miR-503挽救实验的对照组设计（是否为单敲低+双敲低的剂量对照，还是仅野生型vs Zswim8-null±miRNA敲除四组比较）；(2)smallRNA-seq数据是否报告了miR-29/miR-33/miR-375在其扩展目录中的位置及pri/pre-miRNA平行定量结果；(3)conditional Zswim8缺失所用的组织特异性Cre系及其在心脏/骨骼肌/肝脏中的敲除效率验证方法，以判断能否借用其组织特异性对照逻辑。

**一个可执行动作**　我要在T2D小型猪急性能量应激模型（禁食48h/AICAR处理）的肝脏与骨骼肌活检体系中，参照本文的smallRNA-seq+pri/pre-miRNA独立RT-qPCR框架，对miR-33/miR-375/miR-29分别定量成熟体与前体丰度比值，预期若phospho-S609信号轨迹与成熟体/前体比值存在滞后一致性而非同步性，则支持TDMD（而非TGF-β/Smad3转录抑制）驱动应激后miRNA丰度变化的"记忆窗口"假设。

#### PMID 37425885 · Target-directed microRNA degradation regulates developmental microRNA expression and embryonic growth in mammals.
*bioRxiv : the preprint server for biology 2023* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/37425885/)

**一句话结论**　全身/条件性Zswim8敲除小鼠出现心肺发育异常、生长受限及围产期致死，胚胎smallRNA-seq证实TDMD在体内广泛作用于成熟miRNA丰度，并扩大了受TDMD调控miRNA目录；miR-322/miR-503双敲救援了Zswim8缺失胚胎的生长缺陷，直接证明TDMD通路调控哺乳动物体型。

**与该子方向的关系**　支持前提：本文证明ZSWIM8介导的TDMD在体内活体哺乳动物组织中确实广泛塑造成熟miRNA水平（而非仅细胞系现象），为D1-6假设"phospho-ZSWIM8活性变化会反映在成熟miRNA丰度轨迹上"提供了体内因果证据基础，但本文用的是Zswim8全长缺失而非S608/S609磷酸化位点的功能性扰动，二者不能等同，需要另证磷酸化本身对降解活性有调控作用。

**方法要点**　可直接搬用：(1) 全胚胎/组织smallRNA-seq流程用于系统性捕获TDMD底物miRNA变化，可套用到他的应激猪肝/肌样本；(2) 用已知TDMD底物miRNA（如miR-322/miR-503对应人源同源簇）作为阳性对照miRNA，验证自己smallRNA-seq管线能否检出TDMD特征性下调；(3) "arm switching"分析思路（同一pre-miRNA两臂优势比例随组织/条件变化）可作为磷酸化-ZSWIM8活性变化的间接读出指标，补充单纯丰度分析。

**效应量**　【摘要未报告数字】摘要未给出miR-322/miR-503具体下调倍数、Zswim8敲除小鼠致死时间点百分比或TDMD调控miRNA的总数目，读全文时优先补：Zswim8-null胚胎中受TDMD调控miRNA的清单及各自fold-change、miR-322/miR-503敲除后体重/器官大小恢复的具体数值，以及这些miRNA中是否包含miR-33/miR-375/miR-29家族成员。

**它暴露/承认的空白**　摘要明确承认"TDMD在哺乳动物中的生物学作用和调控范围仍知之甚少"，本文以发育/体型为切入点填补了该空白，但完全未触及应激后动态（急性代谢应激、时间序列、磷酸化调控层面），这恰是D1-6要补的空白——即TDMD活性本身是否受上游激酶（AMPK）动态调节、能否作为可逆的"记忆"标志物，而非仅静态发育功能。

**我不相信的一件事**　本文用的是Zswim8完全缺失（组成型/条件性knockout），其表型（心肺缺陷、致死）是ZSWIM8蛋白完全缺失导致TDMD通路彻底关闭的结果，并不能说明磷酸化S608/S609这种精细的翻译后调控（部分抑制/激活）会产生类似方向或幅度的miRNA变化；若磷酸化只是微调降解速率而非开关式调控，本文的敲除表型强度可能远超代谢应激下phospho信号变化所能引起的生理效应，用本文数据外推D1-6的"记忆窗口"存在效应量错配风险。

**读全文要核对什么**　【需读全文核对】需确认：(1) 图中miR-322/miR-503及其他受TDMD调控miRNA清单里是否包含miR-33/miR-375/miR-29或其同源家族成员；(2) smallRNA-seq是否同时报告了pre-miRNA/pri-miRNA水平以排除转录层调控混杂（这对区分TDMD降解vs转录抑制至关重要，尤其miR-29有已知的Smad3转录抑制竞争解释）；(3) 条件性敲除所用组织特异Cre及诱导时间窗，判断能否借鉴其时序设计用于猪模型应激后取材点设置；(4) 敲除小鼠对照组设置（littermate control、tamoxifen vehicle等）细节。

**一个可执行动作**　我要在T2D小型猪急性能量应激模型（禁食48h/AICAR处理，4个时间点+对照，n=6/组）体系中，用本文的胚胎smallRNA-seq分析流程（含arm-switching检测）平行分析肝/肌组织成熟miRNA与pri/pre-miRNA丰度，并以本文报道的TDMD阳性对照miRNA同源簇验证测序管线灵敏度，预期若phospho-S608/S609信号轨迹与miR-33/miR-375成熟体（非前体）丰度存在滞后相关而miR-29受转录层Smad3独立调控不相关，则支持AMPK-ZSWIM8磷酸化驱动TDMD而非转录调控的代谢记忆假设。


## D1-7 · 靶向阻断磷酸化位点逆转代谢记忆的干预策略
**层次：** 转化治疗　｜　**拥挤程度：** 词对无共现（两两最小共现 0 篇，全交集 0 篇）　｜　**首篇预计：** 24–30 个月（因依赖 D1 上游因果链先确立，且大动物实验周期长、小分子抑制剂需外部合作开发）。

> **假设：** 若阻断S608/S609磷酸化可消除代谢记忆的病理固化，则小分子AMPK-ZSWIM8界面抑制剂或位点特异基因编辑在猪模型中能逆转已建立的代谢记忆表型并改善糖脂代谢

**科学前提**

[已发表] Han 2020 (Mol Cell) 与 Shi 2020 (Science) 已建立 ZSWIM8/Cul3 是 TDMD 的核心执行机器，2026 cryo-EM 结构进一步明确 ZSWIM8 底物结合界面；[本项目计算] 自建 AMPK PSSM 打分显示 ZSWIM8 S608/S609 处于 96.4/98.3 百分位，提示其为潜在 AMPK 底物，但该分值仅为假设生成级，本身不构成磷酸化证据；[待测] S608A/S609A（磷酸缺陷）与 S608D/S609D（磷酸模拟）ABE/BE4 敲入猪是否能分别阻断或固化代谢记忆表型，及该表型是否可被小分子 AMPK-ZSWIM8 界面抑制剂逆转；[已发表] 他一作 Cell Death Dis 2019 已建立 T2D 小型猪模型平台，为本子方向提供体内验证的现实可行性基础。

**第一个关键实验**

在他已有的 T2D 小型猪模型（Cell Death Dis 2019 平台）中，用 ABE/BE4 内源敲入 ZSWIM8 S608A/S609A（磷酸缺陷）与野生型对照，先建立"能量应激-代谢记忆"范式（禁食/复饲或高脂-撤脂交替周期诱导记忆），再在记忆已固化后的动物上做逆转实验：分组包括 WT+载体、WT+AMPK-ZSWIM8 界面抑制剂（或反义寡核苷酸阻断磷酸化位点结合）、S608A/S609A+载体，每组 n=6-8（大动物统计力有限但符合该模型历史样本量），读出为代谢记忆核心 miRNA（miR-33/miR-375）成熟体丰度（smallRNA-seq，需合作）、其 pri/pre 前体丰度（qPCR 排除转录层贡献）、ZSWIM8 pS608/pS609 自制单抗 IHC/流式定量、以及糖脂代谢表型（OGTT、血脂谱）在给药后 4/8/12 周的动态恢复轨迹。

**必须的对照**

必须包含：(1) pri/pre-miRNA 定量对照以排除 TGF-β/Smad3 转录层抑制这一竞争解释——若干预仅改变前体丰度而非成熟体/前体比值，则判定为转录效应而非 TDMD 效应；(2) S608D/S609D 磷酸模拟突变体作为"记忆固化"阳性对照，验证表型方向一致性；(3) 未经能量应激诱导的基线动物，排除敲入本身的发育性代偏；(4) 体外激酶反应确认 AMPK 是否真能磷酸化 S608/S609（排除 PSSM 打分为假阳性）；(5) 抑制剂需设 ZSWIM8 catalytically-dead 或非界面区结合的阴性化合物对照，排除脱靠效应。

**为什么是他能做**

他在 Cell Death Dis 2019 一作建立的 T2D 小型猪模型是目前少数能做慢性代谢记忆体内逆转研究的大动物平台；他的 ABE/BE4 内源位点编辑技能可直接做 S608A/D 与 S609A/D 敲入而非过表达系统，保证内源表达水平和调控环境；他的杂交瘤技术可自制 phospho-S608/S609 特异抗体用于 IHC/流式验证磷酸化状态，这是当前无商业化抗体可用的关键瓶颈的自主解决方案。

**可行性**

已有：T2D 猪模型、ABE/BE4 编辑、杂交瘤制抗体、IHC/流式，均为其现有核心技能可直接复用。需新学：smallRNA-seq 数据分析（预计 3-4 个月学习曲线或找核心设施代做）、体外激酶生化实验（AMPK 纯化/激酶反应，需 3-6 个月摸索或找合作者）；小分子抑制剂本身需要药化合作者共同筛选/优化，是本子方向最大的外部依赖和启动成本。起步成本高，建议此子方向排在 D1 系列验证清楚 phospho-TDMD 因果链之后再启动，作为旗舰方向的收官验证而非首发实验。

**最大风险与放弃条件**

最大风险：体外激酶反应显示 AMPK 不能直接磷酸化 ZSWIM8 S608/S609（PSSM 打分为假阳性），或 S608A/S609A 敲入猪代谢记忆表型与 WT 无统计学差异且半衰期测定显示目标 miRNA 降解速率不受影响——出现任一条即终止本转化子方向，退回 D1 上游更基础的机制子方向（先确认磷酸化本身的存在与功能，再谈治疗逆转）。次要放弃条件：若 pri/pre 与成熟体比值在干预前后不变（即成熟体/前体同步变化），说明效应发生在转录层而非 TDMD 层，同样应终止并将结论转交方向2（TGF-β/Smad3 转录调控）框架解释。

**目标期刊与基金**

Cell Metabolism 或 Nature Metabolism（转化治疗类大动物体内逆转研究首选），基金机制适配 NIH R01（成熟机制驱动的治疗验证）或 JDRF/ADA 转化研究专项（代谢病靶向治疗方向）。

**首篇预计**

24–30 个月（因依赖 D1 上游因果链先确立，且大动物实验周期长、小分子抑制剂需外部合作开发）。

**做成之后的下一步**

若小分子/位点编辑逆转成功，下一步可探索该干预策略在人类高脂饮食后代谢记忆相关疾病（如产后糖尿病记忆、减重后代谢反弹）中的临床转化路径。

**拥挤程度核查（可复算）**

检索式：`(ZSWIM8[tiab] OR TDMD[tiab]) AND (AMPK[tiab] OR phosphorylation[tiab]) AND (reversal[tiab] OR inhibitor[tiab])`

| 层级 | 检索式 | 全库命中 |
|---|---|---|
| 单词 | `(ZSWIM8[tiab] OR TDMD[tiab])` | 105 |
| 单词 | `(AMPK[tiab] OR phosphorylation[tiab])` | 366498 |
| 单词 | `(reversal[tiab] OR inhibitor[tiab])` | 939011 |
| 两两 | `(ZSWIM8[tiab] OR TDMD[tiab]) AND (AMPK[tiab] OR phosphorylation[tiab])` | 0 |
| 两两 | `(ZSWIM8[tiab] OR TDMD[tiab]) AND (reversal[tiab] OR inhibitor[tiab])` | 5 |
| 两两 | `(AMPK[tiab] OR phosphorylation[tiab]) AND (reversal[tiab] OR inhibitor[tiab])` | 71963 |
| **全交集** | `(ZSWIM8[tiab] OR TDMD[tiab]) AND (AMPK[tiab] OR phosphorylation[tiab]) AND (reversal[tiab] OR inhibitor[tiab])` | **0** |

**配套文献与笔记（4 篇）**

#### PMID 40073139 · EBAX-1/ZSWIM8 destabilizes miRNAs, resulting in transgenerational inheritance of a predatory trait.
*Science advances 2025* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/40073139/)

**一句话结论**　该文用线虫110个同基因系传101代的长期环境诱导实验证明，饮食诱导的捕食型口器可经ZSWIM8同源物EBAX-1介导的TDMD实现跨代遗传，ebax-1突变体丧失跨代遗传能力，且miR-2235a/miR-35簇的44个拷贝缺失会使捕食型表型提前且延长遗传。

**与该子方向的关系**　支持前提：它在非哺乳模式生物中独立证实了ZSWIM8/EBAX-1通过TDMD降解特定miRNA簇可将环境应激信息转化为可遗传的稳定表型改变，这为「AMPK磷酸化ZSWIM8加速TDMD形成代谢记忆」这一核心机制假设提供了跨物种的功能性先验证据，但并未涉及AMPK磷酸化位点或哺乳动物代谢miRNA，不构成竞争风险。

**方法要点**　可直接搬用的方法要点：(1) 长期饮食/能量交替诱导范式建立"分子记忆"模型的逻辑框架（禁食-复饲对应其食物反转实验），可借鉴其多代/多周期设计思路移植到猪模型的记忆固化-逆转时间轴设计；(2) 用基因敲除/缺失特定miRNA簇拷贝数来验证降解-表型因果链的策略，可类比在猪模型中用ABE/BE4敲入S608A/S609A后同时定量miR-33/miR-375前体与成熟体比值。

**效应量**　摘要未报告具体数字（如miRNA丰度倍数变化、跨代遗传的世代数百分比或统计学p值），读全文时优先补：ebax-1突变体中miR-2235a/miR-35成熟体丰度变化的倍数、以及44拷贝缺失后捕食型表型出现提前的具体代数与延长遗传的世代数。

**它暴露/承认的空白**　摘要明确承认"underlying mechanisms poorly understood"，即环境诱导跨代遗传的分子机制此前不明，本文填补的是"TDMD可作为跨代表观遗传的分子载体"这一空白；但该空白仅在无脊椎模式生物、无磷酸化调控层面被填补，"kinase-TDMD偶联如何被环境应激触发"（对应D1-7的AMPK-ZSWIM8磷酸化开关）仍是空白，这恰是本子方向要补的部分。

**我不相信的一件事**　该文将miR-2235a/miR-35的降解与跨代遗传直接挂钩，但未在摘要中说明是否检测了这些miRNA的前体（pri/pre）丰度以排除转录层调控贡献——若EBAX-1敲除同时改变了这些miRNA基因的转录活性（而非仅蛋白降解速率），则"TDMD导致表型遗传"的因果链就可能被转录混杂因素解释，这与本子方向被要求的pri/pre vs成熟体区分逻辑直接相关。

**读全文要核对什么**　【需读全文核对】需确认：(1) 图中是否有pri-miR-2235a/pre-miR-2235a的qPCR或北方杂交数据以排除转录层贡献；(2) ebax-1突变体与44拷贝缺失系的对照设计是否包含"降解酶存在但靶位点缺失"的遗传学分离对照（类似他计划中的S608A vs WT+抑制剂设计）；(3) 参考文献中是否引用了ZSWIM8磷酸化调控或AMPK通路相关文献，可作为D1-7立项时引用链的起点。

**一个可执行动作**　我要在T2D小型猪模型体系中，借鉴该文"长期饮食交替诱导+靶miRNA簇遗传学缺失"的因果验证逻辑，做ABE敲入ZSWIM8 S608A/S609A磷酸缺陷猪并同步qPCR检测miR-33/miR-375的pri/pre与成熟体比值，预期若代谢记忆确由磷酸化驱动的TDMD介导，则S608A/S609A猪在撤脂后成熟体miR-33/miR-375维持高丰度而前体丰度不变，从而将本文线虫种系水平的TDMD-遗传因果链首次转化为哺乳动物个体水平的代谢记忆可逆性证据。

#### PMID 39588775 · Retargeting target-directed microRNA-decay sites to highly expressed viral or cellular miRNAs.
*Nucleic acids research 2024* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/39588775/)

**一句话结论**　该文用改造版Cyrano类TDMD位点设计的异源miRNA抑制剂能高效清除病毒miR-K11及细胞miR-155，但令人意外的是ZSWIM8失活并未显著削弱这些人工Cyrano-like抑制剂对miRNA的抑制效果，提示重定向的Cyrano位点可能通过非ZSWIM8依赖机制发挥作用。

**与该子方向的关系**　竞争风险：本文直接挑战"ZSWIM8是TDMD唯一/必需执行者"这一D1-7子方向的核心前提——若人工重定向的Cyrano位点能绕过ZSWIM8发挥miRNA清除作用，则S608A/S609A磷酸缺陷突变体在猪模型中"阻断磷酸化=阻断TDMD=逆转代谢记忆"的因果链可能不完全，需要在解释阴性结果时排除ZSWIM8非依赖途径。

**方法要点**　可直接搬用：(1) Cyrano-like TDMD位点重定向设计策略本身是为其他miRNA（如miR-33/miR-375）设计人工TDMD触发位点的模板，可用于构建猪模型中验证内源TDMD特异性的阳性/阴性对照工具；(2) 用ZSWIM8基因失活（knockout/knockdown）作为区分"ZSWIM8依赖降解"与"其他RNA稳定性机制"的对照实验设计，这与他计划中用ABE/BE4敲入S608A/S609A做机制验证的逻辑高度互补。

**效应量**　摘要未报告数字，读全文时优先补：Cyrano-like抑制剂对miR-K11/miR-155的knockdown效率（%或log fold change）、ZSWIM8 knockout后抑制效果的具体变化幅度（是否有部分而非"substantially"的效应）、以及PEL细胞存活率下降的定量数据。

**它暴露/承认的空白**　摘要明确承认的空白是"重定向TDMD位点抑制miRNA的机制尚不完全依赖ZSWIM8"，这一空白恰好落在D1-7子方向上——若ZSWIM8并非所有TDMD情形下的唯一效应蛋白，那么单纯敲除/突变ZSWIM8磷酸化位点可能无法完全复现或逆转"代谢记忆"表型，子方向假设需要补充ZSWIM8非依赖降解通路是否也参与miR-33/miR-375稳态的证据。

**我不相信的一件事**　本文用293T和PEL细胞系中的人工重定向TDMD位点得出"ZSWIM8非必需"的结论，但这些是异源过表达系统中的强效人工位点，其降解动力学和位点亲和力可能远高于内源天然TDMD位点（如Cyrano对miR-7的天然作用），因此不能简单外推到内源S608/S609磷酸化调控的天然TDMD事件——该文并未检验天然TDMD位点在ZSWIM8缺失下的行为，这一点若不澄清就直接套用其"ZSWIM8非依赖"结论去质疑猪模型设计是不严谨的。

**读全文要核对什么**　【需读全文核对】需确认：(1) Figure中ZSWIM8 knockout对Cyrano-like抑制剂效果影响的具体统计图与效应量大小（是完全无影响还是部分减弱未达显著）；(2) 对照组设计中是否包含天然TDMD位点（如内源Cyrano-miR-7对）作为ZSWIM8依赖性的阳性对照，用于比较人工重定向位点与天然位点的机制差异；(3) 方法学部分ZSWIM8失活的具体手段（knockout完全型还是knockdown部分型）及验证效率，这决定了"未见显著影响"的结论是否受限于残留ZSWIM8蛋白。

**一个可执行动作**　我要在猪T2D模型的S608A/S609A敲入体系中，追加一组ZSWIM8催化失活或knockdown对照（而非仅WT+抑制剂 vs S608A/S609A两组对比），预期若miR-33/miR-375的成熟体降解在ZSWIM8失活后仍部分保留，则说明代谢记忆维持存在ZSWIM8非依赖的降解旁路，需修正"阻断磷酸化位点即可逆转代谢记忆"的单一机制假设为"磷酸化依赖通路贡献X%、非依赖通路贡献Y%"的定量拆分模型。

#### PMID 35317841 · A non-coding RNA balancing act: miR-346-induced DNA damage is limited by the long non-coding RNA NORAD in prostate cancer.
*Molecular cancer 2022* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/35317841/)

**一句话结论**　NORAD通过靶向导向的miRNA降解（TDMD）机制清除miR-346，敲低NORAD可使成熟miR-346水平升高达数千倍，而miR-346本身通过转录超激活、R-loop形成和复制应激诱导前列腺癌细胞DNA双链断裂，形成NORAD-miR-346轴平衡基因组保护与损伤。

**与该子方向的关系**　支持前提：本文直接证明TDMD是miRNA体内清除的真实、可被单一lncRNA诱饵大幅（千倍级）调控的生理机制，为D1-7中"阻断ZSWIM8磷酸化位点可逆转已固化的miRNA降解程度"这一干预逻辑提供了机制层面的可行性佐证——即降解速率的改变足以造成成熟体量级差异，支撑其"逆转干预有效"的前提假设；但需注意此处TDMD执行者未明确是否经ZSWIM8，本文未提及AMPK/ZSWIM8/S608/S609，不构成方法或对照的直接可搬用。

**方法要点**　WT vs TDMD-mutant NORAD的rescue实验设计（用突变体阻断降解触发但保留其他功能）可直接搬用于D1-7中验证S608A/S609A磷酸缺陷突变体是否特异性阻断ZSWIM8介导降解而不影响其他功能的对照逻辑；此外RNA-ISH定量miR-346原位丰度的方法可参考用于他自制pS608/pS609抗体的IHC定量流程设计。

**效应量**　NORAD silencing增加成熟miR-346水平"达数千倍"（several thousand-fold），但摘要未报告具体倍数区间、统计检验方法或剂量-时间曲线；【摘要未报告数字】读全文时优先补：miR-346成熟体升高倍数的具体数值范围、检测时间点、以及RNA-seq/qPCR的定量方法学细节，以便与D1-7中miR-33/miR-375丰度恢复的预期幅度做量级参照。

**它暴露/承认的空白**　本文承认的空白在于miR-346诱导DNA损伤的机制虽阐明，但NORAD-miR-346轴是否经典依赖ZSWIM8-TDMD通路（即ZSWIM8是否为其TDMD执行酶）摘要未明确说明，这一空白恰好落在D1-7所属的AMPK-ZSWIM8-代谢记忆方向上——若ZSWIM8并非此处TDMD执行者，则该文的"千倍调控"证据不能直接迁移为ZSWIM8磷酸化调控幅度的参照。

**我不相信的一件事**　本文将"NORAD耗竭→miR-346升高→DNA损伤"的因果链建立在细胞系过表达/敲低体系上，但摘要未说明是否排除了NORAD敲低对miR-346前体（pri/pre-miR-346）转录的影响，即未如铁律要求的那样区分成熟体降解增强与前体转录上调两种可能，这与D1-7必须做pri/pre vs成熟体区分的方法论要求形成直接的逻辑漏洞，若该文也未做此区分则其"TDMD"结论本身存疑。

**读全文要核对什么**　【需读全文核对】需确认：(1)NORAD介导miR-346降解的分子执行者是否为ZSWIM8（图中是否有ZSWIM8 knockdown/knockout对照组）；(2)千倍升高的定量图（很可能是RNA-seq或qPCR柱状图）是否同时报告了pri-miR-346/pre-miR-346水平以排除转录层贡献；(3)WT vs TDMD-mutant NORAD rescue实验的具体突变位点设计及其对照组数量，可否移植为S608A/S609A功能验证的模板。

**一个可执行动作**　我要在已建立的T2D小型猪ABE/BE4敲入体系中，参考本文WT vs TDMD-mutant NORAD的rescue对照逻辑，设计S608A/S609A磷酸缺陷突变体对照实验，预期若ZSWIM8磷酸化确为miR-33/miR-375降解的关键开关，则S608A/S609A动物中成熟miR-33/miR-375丰度应较WT升高且其pri/pre前体水平不变，从而将降解层与转录层贡献明确剥离。

#### PMID 32904235 · In-silico prediction of novel drug-target complex of nsp3 of CHIKV through molecular dynamic simulation.
*Heliyon 2020* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/32904235/)

**一句话结论**　该文报道了一套针对CHIKV nsp3蛋白酶的虚拟筛选+分子动力学（含tdMD）流程，从ZINC库和自建吡唑并邻苯二甲嗪库中筛出候选抑制剂CMPD178，并用MM-GBSA估算了结合自由能变化。全篇是病毒蛋白-小分子对接/MD计算研究，与miRNA降解机器、AGO2/ZSWIM8/TUT4-7、AMPK通路均无任何交集。

**与该子方向的关系**　竞争风险：不成立，本文与D1-7（AMPK-ZSWIM8磷酸化位点逆转代谢记忆）在靶点、生物体系、方法学上完全不相干（CHIKV病毒蛋白酶 vs 哺乳动物代谢miRNA降解酶），判定为无关文献，非竞争、非支持前提、非方法来源；唯一可能的形式关联是术语"tdMD"（此处指thermodynamic integration-based MD，而非TDMD/target-directed miRNA degradation）造成的检索假阳性，需在检索式中排除该缩写歧义以避免污染D1-7的拥挤度计数。

**方法要点**　摘要提及的方法（RASPD虚拟筛选、iGEMDOCK对接、Lipinski五规则、AMBER18做MD/tdMD轨迹分析、MM-GBSA结合自由能计算）均为小分子-蛋白对接与热力学计算工具，不涉及基因编辑、抗体制备、smallRNA-seq或半衰期测定，与他现有/缺失技能栈均不重叠，无可直接搬用之处。

**效应量**　摘要未报告数字，读全文时优先补：CMPD178与nsp3结合的具体MM-GBSA自由能数值（ΔG，kcal/mol）及与其他四个候选分子相比的排序数值，但即便补齐这些数字也与AMPK-ZSWIM8/代谢记忆方向无可比性，不建议作为对照值采纳。

**它暴露/承认的空白**　该文暴露的空白是CHIKV nsp3抑制剂设计领域的计算-实验验证缺口（缺乏体外/体内活性数据），这与D1-7所在的AMPK-ZSWIM8代谢记忆逆转方向没有交集，不落在此子方向任何空白点上；此处收录仅因检索式命中"tdMD"字面匹配，提示该子方向的拥挤度检索式存在假阳性风险，词对共现=0的结论在排除此类噪声后应更稳固。

**我不相信的一件事**　对本文主张的具体质疑：作者仅完成计算筛选与MD/MM-GBSA分析，未提供任何体外酶活抑制实验（如IC50）或细胞水平抗病毒验证，故"CMPD178是promising inhibitor"的结论缺乏实验支撑，仅是计算假说；且nsp3作为CHIKV蛋白酶靶点的结构选择（同源建模还是晶体结构）未在摘要中说明，直接影响对接可信度。

**读全文要核对什么**　【需读全文核对】需确认全文中"tdMD"的准确定义（是否真为target-directed miRNA degradation的缩写误用，还是thermodynamic-integration MD的简称）、nsp3蛋白结构来源（晶体结构PDB号或同源建模）、以及Figure中MD轨迹图/RMSD图与MM-GBSA数值表格，以彻底排除该文与miRNA降解领域的任何潜在术语关联。

**一个可执行动作**　我不会在AMPK-ZSWIM8-miR-33/375代谢记忆体系中采用本文任何方法或数据；唯一动作是在D1-7及相关子方向的文献检索式中加入"NOT CHIKV NOT nsp3"或对"tdMD"进行上下文限定（如"tdMD AND (Argonaute OR miRNA)"），以排除此类病毒学计算论文造成的假阳性共现，预期可使该子方向"词对无共现"的拥挤度判定更可靠。


---

# D2 · TUT4/7–miR-29–器官纤维化

> **主线假设：** 炎症/TGF-β 信号经 TUT4/7 对 miR-29 3′ 端尿苷化加速其降解，解除胶原抑制，驱动器官纤维化

> **他在这个方向上的独特资产：** 他自己两个器官的纤维化模型与存档组织（MYBPC3 心脏 Cell Death Dis 2022 一作、SAA3 肠 Cell Death Discov 2025 一作）、唯一自己当 PI 的基金就是抗肠纤维化药筛、类器官、IHC

> **已知文献状态：** TUT4/7 尿苷化 pre-let-7 与 mRNA 已确立；DIS3L2 降解尿苷化 RNA 已确立；miR-29 抗纤维化证据充分；**但 TGF-β/Smad3 在转录层抑制 miR-29 已被证明（PMID 21784902/22095944），这是必须排除的竞争解释**

## D2-1 · TUT4/7尿苷化miR-29生化机制
**层次：** 机制生化　｜　**拥挤程度：** 词对无共现（两两最小共现 0 篇，全交集 0 篇）　｜　**首篇预计：** 12–15 个月

> **假设：** 若TGF-β刺激后TUT4/7活性上调且DIS3L2依赖性降解成熟miR-29增多，则尿苷化-降解轴独立于转录抑制发挥作用

**科学前提**

[已发表] TUT4/TUT7 (ZCCHC11/ZCCHC6) 对 pre-let-7 的 3′ 尿苷化及 DIS3L2 对尿苷化 RNA 的降解机制已确立 (Heo et al., Cell 2009/2012; Ustianenko et al., 2013)。[已发表] TGF-β/Smad3 在转录层直接抑制 pri-miR-29 转录，已由 Cell Reports/其他文献证明 (PMID 21784902, 22095944)。[已发表] miR-29 抗纤维化、其靶基因含多种胶原及 TGF-β 通路组分已充分证实。[待测] 成熟 miR-29 本身是否为 TUT4/7 底物、TGF-β 刺激是否上调 TUT4/7 活性并经 DIS3L2 加速成熟 miR-29 降解，此为本子方向核心待测假设，目前无直接证据。

**第一个关键实验**

在原代成纤维细胞（心脏来源，取自其 MYBPC3 模型或商业化心脏成纤维细胞系）中，TGF-β1 刺激 0/2/6/24 小时，收样做 small RNA-seq（外包或合作）及 TUT4/TUT7 siRNA 敲低+/-DIS3L2 敲低的 4 组×3 时间点设计，读出为成熟 miR-29a/b/c 尾部尿苷化比例（3′端测序）与成熟体绝对量（TaqMan qPCR 校正内参），同时平行测 pri-miR-29 转录本量以区分转录层与降解层贡献，每组 n=3 生物学重复。

**必须的对照**

必须包含 pri-miR-29 与 pre-miR-29 定量对照（若 pri/pre 已下降则支持转录抑制而非降解机制，需扣除该部分贡献后看成熟体是否有额外降解）；TUT4/7 双敲低对照（阻断尿苷化验证通路特异性）；DIS3L2 敲低对照（阻断下游降解验证必要性）；actinomycin D 阻断转录后测成熟 miR-29 半衰期，比较 TGF-β 刺激±TUT4/7 敲低下半衰期差异，这是排除转录抑制混杂的关键实验；非靶向 let-7（已知 TUT4/7 底物）作阳性对照，miR-16 等非底物 miRNA 作阴性对照。

**为什么是他能做**

他有自己一作发表的两个纤维化器官模型存档组织（心脏 MYBPC3, Cell Death Dis 2022；肠 SAA3, Cell Death Discov 2025），可直接用于验证体内尿苷化-miR-29 轴是否在真实纤维化组织中存在，无需从零建模型；他熟练掌握 IHC、类器官及类器官内 CRISPR 编辑，可在类器官中做 TUT4/7 敲除验证细胞自主效应；他缺 smallRNA-seq 与 3′端测序技能，需新学或委外（预计 2–3 个月学习曲线或直接合作测序核心设施）。

**可行性**

已有：原代/类器官培养、siRNA/CRISPR 敲低敲除、qPCR、IHC、TGF-β 刺激体系（其既往论文已用过）。需新学：3′端 small RNA-seq 文库构建与生信分析（尿苷化比例计算），预计 3 个月自学或与测序核心合作缩短至 1 个月；actinomycin D 半衰期实验为标准技术，可迅速上手。需合作：若要做 TUT4/7 体外尿苷化转移酶活性检测需生化背景合作者，此为可选深化实验非首篇必需。起步成本低，主要是测序费用（约 20-30 个样本的 small RNA-seq）。

**最大风险与放弃条件**

最大风险：actinomycin D 半衰期实验显示 TGF-β 刺激后成熟 miR-29 半衰期在 TUT4/7 敲低与野生型之间无统计学差异（即降解速率不受 TUT4/7 状态影响），同时 3′端测序显示 TGF-β 刺激前后成熟 miR-29 尿苷化比例无显著变化（<5%绝对值差异）——若两者同时成立，则判定尿苷化-降解轴不成立，放弃 D2-1，退回评估 D2 主线是否仍可仅以转录抑制解释纤维化表型，或转向 D2 的下游胶原互作子方向。次级风险：若 pri-miR-29 本身随 TGF-β 大幅下降掩盖降解层信号，需先用 actinomycin D 数据独立分离降解贡献，若无法分离则该体系不适合区分两种机制，需换用可诱导转录阻断系统重做。

**目标期刊与基金**

首选 Nucleic Acids Research 或 RNA（机制生化类），若体内数据充分可冲 Nature Communications；基金机制对应 NIH R21（高风险探索性机制研究）或 AHA (American Heart Association) postdoc-to-faculty transition award（契合心脏纤维化背景）。

**首篇预计**

12–15 个月

**做成之后的下一步**

若尿苷化-降解轴成立，下一步用 CRISPR 敲入不可尿苷化的 miR-29 3′端突变体（类似 TDMD 抗性策略）验证其在体内是否足以延缓纤维化，衔接回旗舰方向 D1 的 TDMD 机器逻辑，形成跨方向机制统一叙事。

**拥挤程度核查（可复算）**

检索式：`(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab]) AND miR-29[tiab] AND (uridylation[tiab] OR fibrosis[tiab])`

| 层级 | 检索式 | 全库命中 |
|---|---|---|
| 单词 | `(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab])` | 136 |
| 单词 | `miR-29[tiab]` | 1015 |
| 单词 | `(uridylation[tiab] OR fibrosis[tiab])` | 295173 |
| 两两 | `(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab]) AND miR-29[tiab]` | 0 |
| 两两 | `(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab]) AND (uridylation[tiab] OR fibrosis[tiab])` | 65 |
| 两两 | `miR-29[tiab] AND (uridylation[tiab] OR fibrosis[tiab])` | 212 |
| **全交集** | `(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab]) AND miR-29[tiab] AND (uridylation[tiab] OR fibrosis[tiab])` | **0** |

**配套文献与笔记（4 篇）**

#### PMID 42094531 · Mechanism of nucleolytic degradation of human ribosomes.
*bioRxiv : the preprint server for biology 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42094531/)

**一句话结论**　该文报道饥饿应激下RIOK3招募TUT7和DIS3L2至40S核糖体，TUT7对18S rRNA 3′端加oligo(U)尾，DIS3L2随后识别尿苷化位点执行3′-5′降解，且存在"尿苷化-降解-再尿苷化"的迭代过程；DIS3L2缺失导致18S rRNA降解受阻并伴尿苷化片段累积。

**与该子方向的关系**　提供方法：这篇不是miRNA降解论文，而是TUT7-DIS3L2轴在rRNA降解中的机制原型，为D2-1提供了"尿苷化标记底物→核酸外切酶降解→可用测序捕获中间体"的完整方法学模板，可直接迁移到miR-29的尾部测序与降解中间体捕获设计。

**方法要点**　可搬方法：①用3′端测序捕获oligo(U)尾及其长度分布，对应他计划的miR-29 3′端测序读出；②敲低DIS3L2后观察尿苷化底物的累积作为"降解受阻"证据，此逻辑可直接套用到TUT4/7+DIS3L2双敲低设计中；③"迭代尿苷化-降解中间体"的分析思路提示他在miR-29实验中也应捕捉尾部长度动态而非仅终点比例。

**效应量**　【摘要未报告数字】读全文时优先补：TUT7敲低或DIS3L2敲低后18S rRNA尿苷化片段的定量倍数变化、降解半衰期数值、以及饥饿刺激后TUT7募集至核糖体的时间动力学（对应他0/2/6/24h设计的时间尺度参照）。

**它暴露/承认的空白**　摘要明确承认"the mechanisms and factors that mediate rRNA decay remain unknown"这一此前空白，本文填补的是rRNA底物上的TUT7-DIS3L2轴，但完全未涉及该轴是否作用于miRNA（尤其miR-29）成熟体，此空白正落在D2-1子方向的核心假设上——即尿苷化-降解轴对miRNA是否具有底物特异性可推广性。

**我不相信的一件事**　该文用RIOK3结合泛素化40S核糖体作为招募TUT7的必要锚点，但miR-29的成熟体并非核糖体组分，缺乏类似RIOK3的支架蛋白介导募集机制；若TUT7招募到miR-29依赖完全不同的支架（如AGO2或TDMD相关因子ZSWIM8），则本文RIOK3中心的招募模型无法简单外推到miRNA体系，需要额外证明TUT7是否存在不依赖RIOK3的miRNA特异性招募路径。

**读全文要核对什么**　【需读全文核对】需确认：①TUT7-DIS3L2轴的底物特异性证据（是否用体外重组或competition assay证明二者仅识别rRNA而非其他细胞RNA，包括miRNA）；②DIS3L2敲低/TUT7敲低的具体对照组设计（siRNA效率验证、rescue实验、是否有DIS3L2催化死突变对照）；③3′端测序的建库方法与深度参数，以及尿苷化比例的定量算法，这些细节决定他能否直接复用该测序流程于miR-29。

**一个可执行动作**　我要在心脏原代成纤维细胞体系中，仿照本文RIOK3-TUT7-DIS3L2的底物捕获逻辑，在TGF-β1刺激的0/2/6/24h时间点做TUT4/7与DIS3L2双敲低的3′端测序，预期若miR-29降解遵循同源尿苷化-迭代降解机制，则会在DIS3L2敲低组观察到尿苷化miR-29中间体的时间依赖性累积，而非单纯转录抑制导致的成熟体单调下降。

#### PMID 42054207 · The long isoform of ZAP coordinates multiple enzymes to mediate complete decay of target transcripts.
*Cell reports 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42054207/)

**一句话结论**　该文证明抗病毒ZAP长亚型通过招募KHNYN内切、TUT4/TUT7尾部尿苷化、DIS3L2降解5′片段、XRN1降解3′片段，组装出一条完整的病毒RNA降解复合物，TRIM25在病毒感染后促进这些酶与ZAP的互作并同时降低细胞内转录本丰度。

**与该子方向的关系**　提供方法：并非直接研究miR-29或TDMD，而是把TUT4/TUT7-DIS3L2这一"尿苷化后经DIS3L2降解"的生化顺序在另一个RNA底物（病毒RNA经KHNYN切割的5′片段）上做了完整验证，这条酶学顺序（尿苷化→DIS3L2识别短U尾→降解）可直接借用到miR-29尾部尿苷化机制中，但不构成竞争风险，因为其底物、上游酶（KHNYN/ZAP/TRIM25）与miRNA降解机器（ZSWIM8/AGO2）完全不同，属于平行的TUT4/7下游通路证据而非同一现象的另一种解释。

**方法要点**　摘要提示的可搬方法：(1) RNase-resistant的蛋白互作检测手段用于验证TUT4/TUT7、DIS3L2与上游识别蛋白（此处为ZAP/TRIM25，可类比AGO2/TUT4/7在miR-29场景）的直接/间接互作；(2) 用siRNA或功能缺失来解析"尿苷化-降解"每一步酶的顺序依赖关系（此处为TUT4/7→DIS3L2→XRN1的顺序拆分），这与他计划的TUT4/TUT7 siRNA+/-DIS3L2 siRNA 4组设计思路一致，可直接参考其对照分组逻辑。

**效应量**　【摘要未报告数字】读全文时优先补：TUT4/TUT7敲低或DIS3L2敲低后底物RNA尾部尿苷化比例的具体变化幅度、降解半衰期或RNA丰度倍数变化，以及TRIM25介导互作在感染前后的定量差异（如免疫共沉淀条带定量或RNA丰度倍数），这些数字可作为他自己qPCR/3′端测序实验的预期效应量参照基准。

**它暴露/承认的空白**　摘要明确承认此前不清楚"ZAP亚型为何抗病毒活性不同"以及"如何招募辅因子介导RNA降解"，即ZMD通路的分子顺序此前是空白；这落在D2-1子方向的"尿苷化-降解轴的分子顺序与酶依赖关系"层面——本文填补的是病毒RNA底物上的顺序空白，但miR-29场景下TUT4/7-DIS3L2轴是否遵循同样顺序、是否需要类似TRIM25式的辅因子招募，仍是他的空白，需要自己补。

**我不相信的一件事**　该文的降解顺序模型建立在KHNYN先切割产生带游离3′端的片段基础上，游离3′端可能是TUT4/7识别和尿苷化的前提条件；而miR-29是Argonaute负载的完整成熟miRNA，并无KHNYN样的内切步骤产生新3′端，因此该文的"切割在先、尿苷化在后"的顺序逻辑能否直接套用到miR-29（尿苷化直接作用于成熟体3′端而非切割产物）值得怀疑，需要论证TUT4/7识别AGO2-miR-29复合物3′端的机制是否与识别KHNYN切割产物的机制共享同一识别模块。

**读全文要核对什么**　【需读全文核对】需确认：(1) TUT4/TUT7敲低后底物RNA尾部尿苷化比例与丰度变化的具体图（很可能是Fig显示尿苷化标记条带或3′测序读数分布）及对照组设置（是否有TUT4/7双敲低vs单敲低的剂量效应对照）；(2) DIS3L2敲低是否使尿苷化片段稳定堆积（此为区分"尿苷化导致降解"因果链的关键对照，miR-29实验设计需仿照）；(3) TRIM25与TUT7/DIS3L2互作的RNase处理条件细节，判断该互作检测方法能否移植到AGO2-TUT4/7互作检测中；(4) 方法学参考文献中是否引用了miRNA 3′尿苷化-TDMD领域的方法（如TUT4/7 CLIP或3′端测序流程）可直接借用。

**一个可执行动作**　我要在心脏原代成纤维细胞（MYBPC3模型或商业化细胞系）TGF-β1刺激体系中，参照本文TUT4/TUT7→DIS3L2的顺序拆分逻辑，设计TUT4/7 siRNA单敲低/双敲低 +/- DIS3L2 siRNA的分组，用3′端测序检测成熟miR-29a/b/c尾部尿苷化比例变化，并预期DIS3L2敲低后若尿苷化miR-29丰度出现堆积（而非直接降解），则可类推该文病毒RNA场景中"尿苷化标记—DIS3L2识别—降解"的顺序依赖关系同样适用于miR-29，从而将尿苷化-降解轴与pri-miR-29转录抑制在时间和分子层面区分开。

#### PMID 41608885 · MiRNA Stability and Degradation: Dynamic Regulators of Cellular Regulatory Networks.
*Wiley interdisciplinary reviews. RNA 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/41608885/)

**一句话结论**　这是一篇综述，系统整理了 miRNA 降解的三条通路——ZSWIM8-TDMD、TUT4/7-DIS3L2 尿苷化、核酸酶剪切——并指出它们与 AGO 结合、末端修饰、序列特征等稳定性因子如何共同决定 miRNA 总量与生理状态。文中明确点出未解决的问题：谁是负责降解 TDMD 释放出的 miRNA 的核酸酶，以及肠腔和循环等特定生理隔室中的降解机制尚不清楚。

**与该子方向的关系**　支持前提：它把 TUT4/7-DIS3L2 尿苷化路径列为 miRNA 降解的核心机制之一，与他"尿苷化-降解轴独立于转录抑制"这一假设的分子基础完全一致，为 D2-1 提供了通路层面的合法性背书，但不涉及 miR-29/TGF-β 或纤维化的具体证据。

**方法要点**　摘要未给出具体实验方法（属综述性质），但明确点名"terminal modifications"（尾部尿苷化等末端修饰）与"AGO association"是决定 miRNA 稳定性的两大因子，这与他计划的 3′端测序+TaqMan 分层读出（尾部修饰 vs 成熟体绝对量）思路吻合，可作为实验设计合理性的文献支撑而非直接方法来源。

**效应量**　【摘要未报告数字】读全文时优先补：文中是否引用了具体的 TUT4/7 敲低或 DIS3L2 敲低后 miR-29 尿苷化比例/半衰期的定量数据，以及是否有肠腔或循环 miRNA 降解速率的对比数值可作为他实验的预期效应量参考。

**它暴露/承认的空白**　摘要承认的空白正好落在 D2-1 的核心问题上：一是"识别降解 TDMD 释放 miRNA 的核酸酶"尚不明确（与他要区分的降解层机制部分重叠但非同一问题），二是"肠腔和循环等生理隔室特异性降解机制"未阐明——他计划用的 SAA3 肠道存档组织恰好可以填补后者这一空白。

**我不相信的一件事**　这篇综述将 TUT4/7-DIS3L2 尿苷化描述为一条相对独立的降解通路，但并未说明该通路在 TGF-β 等上游信号刺激下是否会被动态诱导（即 TUT4/7 活性本身是否受信号调控），这正是他假设"TGF-β刺激后TUT4/7活性上调"的关键前提，综述层面没有给出证据支持或反驳这一具体机制链条。

**读全文要核对什么**　【需读全文核对】需确认综述正文中引用的原始文献里，是否有任何一篇直接测过 TGF-β（或其他促纤维化信号）刺激后 TUT4/7 表达量、活性或 miR-29 尾部尿苷化比例的变化；还要核对综述是否讨论了 pri-miR-29 转录调控（Smad3）与成熟体尿苷化降解这两层机制如何被现有文献区分开，以及引用的具体图表/文献号。

**一个可执行动作**　我要在原代心脏成纤维细胞（来自 MYBPC3 模型或商业系）体系中，做 TGF-β1 0/2/6/24h 刺激下 TUT4/TUT7 siRNA ± DIS3L2 siRNA 的四组×三时间点 small RNA-seq 与 3′端测序，读出成熟 miR-29a/b/c 尿苷化比例和绝对量并平行测 pri-miR-29，预期若尿苷化-降解轴独立作用，则 TUT4/7 敲低组在成熟体层面挽救 miR-29 而 pri-miR-29 水平不变，从而与 Smad3 转录抑制机制区分开。

#### PMID 41174475 · MicroRNA strand ratio disarray promotes temozolomide resistance in glioblastoma.
*Cellular & molecular biology letters 2025* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/41174475/)

**一句话结论**　TUT4通过对pre-miR-92b进行尿苷化改变其臂选择偏好，使3p链相对5p链升高，进而通过HDAC9/FOXP3双靶点激活COL7A1转录，促成胶原沉积并驱动GBM对TMZ的耐药。这是TUT4作用于pre-miRNA加工阶段（改变臂选择比例）而非直接降解成熟miR-29双链体的例子，提示TUT4底物特异性与作用节点（pre-miRNA加工vs成熟体3′尾巴降解）需要分开验证。

**与该子方向的关系**　竞争风险：本文证明TUT4尿苷化可以作用于pre-miRNA阶段改变臂选择比例（miR-92b-3p/5p），而不是通过尿苷化成熟双链体促DIS3L2降解——这与D2-1假设的"TUT4/7尿苷化成熟miR-29→DIS3L2依赖性降解→丰度下降"机制路径不同，若miR-29也存在类似的臂选择重编程而非单纯降解，会与D2-1的"尿苷化-降解轴"解释竞争，必须在读全文时排除miR-29a/b/c是否发生3p/5p比例漂移。

**方法要点**　可直接搬用的方法：（1）用TUT4抑制剂aurothioglucose hydrate (ATG-H)作为工具药，可在他的心脏成纤维细胞TGF-β刺激体系中平行测试是否同样抑制miR-29尾部尿苷化及恢复其成熟体丰度；（2）TUT4/TUT7 siRNA敲低+下游靶基因（他体系里对应COL1A1/COL3A1而非COL7A1）H3K27ac ChIP的因果验证逻辑，可套用到"TUT4敲低→胶原基因启动子组蛋白修饰变化"这一环节的机制闭环设计上。

**效应量**　摘要未报告数字。读全文时优先补：miR-92b-3p/5p比例在TMZ耐药与敏感细胞中的具体倍数变化、ATG-H处理后该比例恢复的幅度、COL7A1 mRNA/蛋白及H3K27ac富集的定量倍数，以及这些数值所用的时间点和剂量，以便与D2-1设计的0/2/6/24h TGF-β时间梯度做定量对标。

**它暴露/承认的空白**　摘要明确承认"miRNA strand selection disarray驱动TMZ耐药的机制此前未被探索"，指出TUT4尿苷化调控臂选择这一层此前是空白；但本文完全未涉及尿苷化对成熟miRNA稳定性/降解速率的影响，即D2-1所需的"尿苷化→DIS3L2依赖性降解→半衰期缩短"这一空白仍未被填补，本文只填补了"尿苷化→臂选择"的空白。

**我不相信的一件事**　本文将TUT4尿苷化归因为"促进3'链偏好"的加工层机制，但未排除另一种可能——尿苷化本身可能同时诱导5p链的DIS3L2依赖性降解（即D2-1的降解轴），使得表观上"3p/5p比例升高"实际是5p被降解而非3p被优先加工产生，摘要未做敲低DIS3L2的对照来区分这两种机制，因此"strand selection"这一结论本身可能是降解效应的表型误读。

**读全文要核对什么**　【需读全文核对】需确认：(1) Figure中是否有DIS3L2敲低或过表达的对照组以排除降解效应混淆臂选择结论；(2) pre-miR-92b尾部尿苷化位点（单U vs 寡U）及测序方法（TAIL-seq/3'端测序）的具体图，能否套用到miR-29；(3) ATG-H剂量-反应曲线及其对TUT7的选择性数据，判断该抑制剂是否可直接用于他的成纤维细胞体系；(4) COL7A1与经典抗纤维化靶基因（COL1A1/ACTA2）表达是否有交叉验证，判断"胶原沉积"结论的组织特异性。

**一个可执行动作**　我要在心脏成纤维细胞（MYBPC3模型来源或商业化细胞系）TGF-β1刺激0/2/6/24h体系中，加入ATG-H及TUT4/TUT7 siRNA+DIS3L2 siRNA的4组×3时间点设计，用3'端测序读出miR-29a/b/c尾部尿苷化比例与臂选择（3p/5p）比例，同时用TaqMan qPCR测成熟体绝对量及pri-miR-29转录本，预期若ATG-H/TUT4敲低仅改变臂比例而不改变成熟体总量则支持"加工层"机制、若同时使miR-29成熟体总量回升则支持D2-1的"降解层"机制，从而把两条竞争路径在同一体系内区分开。


## D2-2 · TGF-β/Smad3与TUT4/7双通路解耦
**层次：** 机制生化　｜　**拥挤程度：** 词对无共现（两两最小共现 0 篇，全交集 0 篇）　｜　**首篇预计：** 12–15 个月

> **假设：** 若在Smad3敲除背景下TUT4/7介导的miR-29尿苷化仍可被TGF-β诱导，则两条通路平行且可分别贡献纤维化表型

**科学前提**

[已发表] TUT4/TUT7 (TUT4/7) 对 pre-let-7 及部分 mRNA 3′端尿苷化并招募 DIS3L2 降解已确立（Thornton et al., Heo lab 系列）。[已发表] miR-29 是胶原/纤维化关键抑制性 miRNA，其成熟体缺失促进 MYBPC3 心脏与 SAA3 肠纤维化（Zou 本人一作 Cell Death Dis 2022 / Cell Death Discov 2025）。[已发表] TGF-β/Smad3 在转录层直接抑制 pri-miR-29 转录已被证明（PMID 21784902/22095944），这是必须被排除的竞争解释。[待测] TGF-β能否在 Smad3 缺失或转录抑制阻断的背景下，仍通过 TUT4/7 对已生成的成熟 miR-29 施加尿苷化并加速其降解，从而构成一条独立于转录抑制的平行通路。

**第一个关键实验**

在他已有的心脏（MYBPC3）与肠（SAA3）纤维化模型来源的原代细胞/类器官中，用 CRISPR 敲除或 ABE/BE4 引入 Smad3 功能失活突变，之后 TGF-β1 处理（0、6、24、48 h），同步做 qPCR 测 pri-miR-29 与成熟 miR-29（TaqMan/stem-loop RT-PCR 区分前体与成熟体），并用 3′端特异 RT-qPCR 或委托合作质谱/3′-seq 检测尿苷化 miR-29 比例；每组 n≥4 生物学重复，两个器官模型平行做。

**必须的对照**

(1) Smad3 WT vs KO 平行对照，排除转录层贡献；(2) actinomycin D 阻断转录后测成熟 miR-29 半衰期，观察 TGF-β 是否仍能缩短半衰期（区分降解 vs 合成减少）；(3) TUT4/7 双敲低/敲除组，若尿苷化通路被阻断则 TGF-β 对 Smad3 KO 细胞中 miR-29 的加速降解效应应消失；(4) 非纤维化相关 miRNA（如 miR-16）作阴性对照排除全局效应；(5) 载体/scramble sgRNA 对照排除脱靶效应。

**为什么是他能做**

他是 MYBPC3 心脏纤维化模型（Cell Death Dis 2022）与 SAA3 肠纤维化模型（Cell Death Discov 2025）的一作，拥有这两套器官的存档组织和类器官体系，可直接复用而不需重新建模型；他熟练 CRISPR/ABE/BE4 内源位点编辑可直接做 Smad3 功能失活及 TUT4/7 敲除；他唯一自己当 PI 的基金即抗肠纤维化药筛，机制发现可直接反哺该基金的转化终点。

**可行性**

已有：类器官培养、CRISPR/ABE/BE4、IHC、两个器官的存档组织与动物模型，无需新建。需新学：stem-loop RT-PCR 或 3′端特异 RT-qPCR 检测尿苷化（学习周期约1–2个月，可参考已发表 TUT4/7 领域方法）；半衰期测定（actinomycin D chase，方法简单，约2–4周上手）；若要精确定量尿苷化位点分布需合作质谱或委托 3′-seq，起步成本为送样测序费用而非新建平台。

**最大风险与放弃条件**

最大风险：Smad3 KO 后 TGF-β 处理下成熟 miR-29 水平与半衰期均无变化（即 actinomycin D chase 后半衰期在 TGF-β 处理组与未处理组无统计学差异，且 3′尿苷化比例无上升），说明尿苷化通路完全依赖或从属于 Smad3 转录抑制，无独立平行通路；若出现此结果则放弃 D2-2，退回仅验证转录层机制或转向 D2 主线中直接测尿苷化-半衰期关联的子方向（不再区分 Smad3 依赖性）。

**目标期刊与基金**

Journal of Clinical Investigation 或 Hepatology/JHEP Reports（视器官选肠或心脏亚刊）；适配基金：NIH R01（如 NIDDK/NHLBI 纤维化专项）或美国心脏协会 AHA Career Development Award，亦可整合进他现有的抗肠纤维化药筛基金作为机制附加模块申请补充经费（supplement）。

**首篇预计**

12–15 个月

**做成之后的下一步**

若平行通路成立，下一步在体内用 Smad3 KO 或组织特异性 TUT4/7 敲除小鼠交叉验证两条通路对纤维化表型的独立贡献比例，为联合靶向 TUT4/7 与 TGF-β/Smad3 的协同抗纤维化策略提供机制基础。

**拥挤程度核查（可复算）**

检索式：`(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab]) AND miR-29[tiab] AND (Smad3[tiab] OR TGF-beta[tiab])`

| 层级 | 检索式 | 全库命中 |
|---|---|---|
| 单词 | `(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab])` | 136 |
| 单词 | `miR-29[tiab]` | 1015 |
| 单词 | `(Smad3[tiab] OR TGF-beta[tiab])` | 75878 |
| 两两 | `(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab]) AND miR-29[tiab]` | 0 |
| 两两 | `(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab]) AND (Smad3[tiab] OR TGF-beta[tiab])` | 0 |
| 两两 | `miR-29[tiab] AND (Smad3[tiab] OR TGF-beta[tiab])` | 93 |
| **全交集** | `(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab]) AND miR-29[tiab] AND (Smad3[tiab] OR TGF-beta[tiab])` | **0** |

**配套文献与笔记（4 篇）**

#### PMID 42645200 · miR-29b as an Anti-Fibrotic Therapeutic: Mechanisms, Disease Biology and Translational Opportunities.
*Cells 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42645200/)

**一句话结论**　这是一篇综述：系统梳理miR-29家族结构、TGF-β/Smad及炎症输入对miR-29b转录调控、其直接靠谱靶点与collagen合成/加工/交联的关系，并跨肺肝肾心皮眼多个纤维化模型总结证据，最后讨论mimic/agomir递送与安全性问题。它强调miR-29b是"网络层面"抗纤维化候选，但未涉及TUT4/7或3′尿苷化这一降解层机制。

**与该子方向的关系**　支持前提：它确认了TGF-β/Smad3对miR-29b的转录抑制是现有主流解释框架，为D2-2「转录 vs 降解双通路解耦」假设提供了必须去区分、去竞争掉的那条"官方"通路背景；同时它完全未提TUT4/7介导的3′尿苷化降解机制，说明该综述本身尚未把TDMD/尿苷化纳入miR-29调控网络，是D2-2要填补的具体空白而非直接竞争风险。

**方法要点**　综述区分"direct canonical targets vs experimentally supported/predicted/indirect pathway components"的靶点分级框架可直接搬用于他自己验证miR-29在collagen通路上的靶点归类；其跨心/肠等多器官模型的证据整合逻辑，可套用到他自己MYBPC3心脏与SAA3肠模型的平行验证设计上。

**效应量**　【摘要未报告数字】读全文时优先补：miR-29b转录抑制幅度（TGF-β处理后pri-miR-29b下降倍数）、成熟miR-29对collagen靶点（如COL1A1/COL3A1/COL4A1）的靶点验证效应量（luciferase报告基因抑制比例、蛋白/mRNA下调倍数），以及mimic/agomir体内给药后纤维化指标（如胶原含量、Ashcroft score）改善幅度。

**它暴露/承认的空白**　摘要明确承认"successful translation requires cell- and disease-specific target validation"，即miR-29b调控在不同组织/细胞类型中机制尚不清楚——这条空白直接落在D2-2子方向上：现有综述框架完全停留在转录（TGF-β/Smad）层面，从未讨论miR-29成熟体降解速率或3′尿苷化对其抗纤维化功能的贡献，因此"转录抑制"与"降解加速"两条通路是否平行贡献表型仍是完全未被处理的空白。

**我不相信的一件事**　该综述将miR-29b的抗纤维化效应几乎全部归因于TGF-β/Smad轴对其转录的抑制，但摘要未说明其纳入的证据是否系统区分了pri/pre-miR-29与成熟miR-29的定量数据——如果多数原始研究只测了成熟体水平就推断"转录调控"，那么其中一部分效应可能实际来自成熟体降解速率变化（如TUT4/7尿苷化），却被这篇综述的叙事框架系统性地误归为转录调控，这是对因果层级归因的具体质疑而非样本量问题。

**读全文要核对什么**　【需读全文核对】需确认：(1) 综述引用的原始研究中是否有任何一篇同时测了pri-miR-29b与mature miR-29的动力学曲线（图/表位置），若有则要核对其TGF-β处理后两者下降的时间差是否提示存在独立于转录的降解贡献；(2) "additional transcriptional and inflammatory inputs"具体指哪些通路（图中信号通路总图），是否已经排除了RNA结合蛋白/尿苷化对miR-29b稳态的贡献；(3) 心脏与肠道纤维化模型部分引用的具体文献列表，用于比对是否与他自己MYBPC3/SAA3模型的既往报道重叠或矛盾。

**一个可执行动作**　我要在MYBPC3心脏与SAA3肠原代细胞/类器官体系中，对Smad3做CRISPR敲除或ABE/BE4功能失活突变后行TGF-β1时间梯度（0/6/24/48h）处理，用stem-loop RT-PCR区分pri-miR-29b与成熟miR-29并加测3′尿苷化比例，预期若Smad3失活后TGF-β仍能诱导成熟miR-29尿苷化升高而pri-miR-29b转录抑制消失，则证明TUT4/7降解通路与Smad3转录通路平行独立，从而在该综述完全未覆盖的降解层面填补空白。

#### PMID 42308919 · Unifying and unique roles of non-coding RNA biomarkers in liver and heart fibrosis.
*Biomedicine & pharmacotherapy = Biomedecine & pharmacotherapie 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42308919/)

**一句话结论**　这是一篇综述，梳理miR-21/22/29/34a/122/133a/210/214及H19/MALAT1/MEG3/NEAT1/circHIPK3在肝纤维化与心纤维化中通过TGF-β/SMAD、氧化应激、ECM重塑产生的共通或分化调控网络，并提出循环ncRNA（含EV转运）作为心肝联合纤维化早期标志物的潜力。摘要未给出任何TUT4/7、尿苷化或3′端修饰相关论述，miR-29仅作为纤维化相关ncRNA清单中的一员被提及。

**与该子方向的关系**　竞争风险：该综述反复强调miR-29通过TGF-β/SMAD通路参与肝心纤维化调控，属于把miR-29-纤维化关联完全归因于经典转录/信号轴的叙事，若读者/审稿人以此综述为背景知识，会默认"miR-29低=TGF-β/Smad3转录抑制"这一解释，直接与D2-2子方向要证明的"TUT4/7介导的降解通路独立于Smad3"形成叙事竞争，必须在引言中明确写出差异声明：本文证明的是降解层（尿苷化/3′端）而非转录层（pri-miRNA合成）机制。

**方法要点**　摘要未描述具体实验方法（属综述性文章），无湿实验方法可直接搬用；唯一可提取的是其归纳的"circulating ncRNA via EV作为心肝联合纤维化标志物"这一研究框架思路，可供他未来做心-肠或心-肝双器官miR-29尿苷化biomarker平行验证时参考取样逻辑（血浆/EV vs 组织）。

**效应量**　【摘要未报告数字】读全文时优先补：miR-29在肝纤维化和心纤维化中各自的表达变化倍数或方向（上调/下调）、其与TGF-β/SMAD轴关联的具体实验证据来源（引用的原始文献列表)、以及Fontan循环队列中循环ncRNA标志物的诊断效能数值（AUC/敏感性/特异性）。

**它暴露/承认的空白**　摘要明确指出"circulating ncRNA需要大规模前瞻性队列验证"及"未来方向包括multi-omic整合、纵向ncRNA profiling与机制验证"，这直接点名了D2-2子方向要填补的空白——即"机制验证"层面，尤其是降解（尿苷化）与转录（Smad3）两条通路的解耦尚未被此综述覆盖，说明该子方向的病理机制层面确实是空白（旁证了拥挤度=0的检索结果）。

**我不相信的一件事**　该综述将miR-29的调控完全纳入"TGF-β/SMAD signalling"框架下讨论，暗示miR-29水平变化主要由转录抑制驱动，但并未区分pri-miR-29与成熟miR-29的检测方法差异，也没有考虑降解速率（如TUT4/7尿苷化）可能独立贡献miR-29成熟体丰度下降，这种把miRNA丰度变化单一归因于转录调控、忽视降解通路的叙事本身就是D2-2要挑战的前提，需要读全文确认其引用的原始研究是否测过pri-miR-29。

**读全文要核对什么**　【需读全文核对】需确认：①正文讨论miR-29-TGF-β/SMAD部分具体引用了哪些原始研究及其检测的是pri-miR-29还是成熟miR-29（有无用stem-loop RT-PCR或northern blot区分前体/成熟体）；②是否有任何段落提及3′端修饰、尿苷化、TUT4/7或ZSWIM8等降解机器相关内容（哪怕未成体系讨论）；③Fontan循环队列的具体EV-ncRNA标志物清单和验证队列样本量，以判断是否可作为他未来心-肠双器官biomarker验证的对照参考值来源。

**一个可执行动作**　我要在他已有的心脏MYBPC3与肠SAA3纤维化模型原代细胞/类器官体系中，用CRISPR/ABE敲除或功能失活Smad3后，TGF-β1处理0/6/24/48h同步测pri-miR-29（区分前体）与成熟miR-29及其尿苷化比例，预期若Smad3失活后TGF-β仍能诱导尿苷化增加而pri-miR-29不再被抑制，即证明TUT4/7降解通路与Smad3转录通路在心肠两个器官中均可平行独立驱动miR-29成熟体下降，从而与本综述"miR-29-TGF-β/SMAD"单通路叙事形成机制层面的区分和补充。

#### PMID 41666609 · Human amniotic fluidic derived-extracellular vesicles enriched by miR-29 ameliorate endometrial fibrosis and promote repair of damaged endometrium in an experimental model of intrauterine adhesion.
*Biochemical and biophysical research communications 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/41666609/)

**一句话结论**　hAF-EVs本身即有抗纤维化再生效力，miR-29富集后在TGF-β/SMAD3纤维化信号抑制、血管新生与种植相关指标上呈现"选择性增强"而非质变，两组组织学恢复整体相近。

**与该子方向的关系**　竞争风险：本文把miR-29的抗纤维化归因锚定在"抑制TGF-β/SMAD3信号"这一转录/信号层面的叙事上，与D2-2试图证明的"TUT4/7介导的降解通路独立于Smad3、二者平行"存在解释权竞争——若照此文逻辑，miR-29疗效差异会被简单归为对Smad3通路的下游抑制，而不会被归因于TUT4/7尿苷化调控的成熟miR-29稳态，需在讨论中明确区分"miR-29通过何种上游机制被稳定/富集"与"miR-29下游是否作用于Smad3"两个问题。

**方法要点**　可搬的方法：murine IUA模型（机械损伤内膜）+ EV局部/全身给药 + qPCR测纤维化标志物 + 生育力测试的整体实验框架，可作为D2-2未来若要做体内验证（miR-29-enriched EV递送到心脏/肠纤维化模型）的给药与读出范式参照；但本文未使用stem-loop RT-PCR区分pri/pre与成熟miR-29，也未做3′端尿苷化检测，这部分方法学空白正是D2-2要填的。

**效应量**　【摘要未报告数字】读全文时优先补：miR-29富集组相对unmodified EV组在胶原沉积、TGF-β/SMAD3标志物表达（如p-SMAD3、COL1A1/COL3A1）、血管密度及着床率上的具体倍数或百分比差异，以及miR-29富集EV中miR-29的绝对拷贝数/富集倍数。

**它暴露/承认的空白**　本文承认的空白是"miR-29富集为何只带来选择性增强而非质的差异"未被机制解释，未检测miR-29的前体/成熟体比例、3′尿苷化状态或TUT4/7表达变化，这正落在D2-2子方向要补的"pri/pre vs 成熟体区分+尿苷化比例检测"这一环节上。

**我不相信的一件事**　摘要将miR-29富集效应描述为"selective enhancement"却未报告统计学显著性分级或效应量，且未排除EV本身携带的其他miRNA/蛋白货物对TGF-β/SMAD3通路的贡献，因此"miR-29特异性抑制TGF-β/SMAD3信号"这一因果归因尚不牢靠，可能是EV整体货物效应而非miR-29单独驱动。

**读全文要核对什么**　【需读全文核对】要确认：(1)miR-29富集EV的制备方法及miR-29最终浓度/纯度对照图；(2)图中是否分别报告pri-miR-29与成熟miR-29水平，抑或仅测总RNA或成熟体；(3)统计检验方法及unmodified EV组与miR-29-enriched组之间比较的具体p值和样本量n；(4)是否有Smad3磷酸化蛋白层面（Western/IHC定量）而非仅mRNA层面的对照数据。

**一个可执行动作**　我要在自己已有的MYBPC3心脏与SAA3肠纤维化原代细胞/类器官体系中，先用stem-loop TaqMan RT-PCR区分pri-miR-29与成熟miR-29、再做Smad3敲除+TGF-β1时程处理，预期若尿苷化成熟miR-29在Smad3敲除背景下仍可被TGF-β诱导上升，则可证明TUT4/7-miR-29降解轴与TGF-β/Smad3转录抑制轴平行存在，从而与本文这类"归因于TGF-β/SMAD3信号抑制"的叙事形成机制层面的区分。

#### PMID 41659298 · Endothelial-to-Mesenchymal Transition in Post-Myocardial Infarction Fibrosis: A Maladaptive but Targetable Pathway.
*EJIFCC 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/41659298/)

**一句话结论**　这是一篇综述，核心论点是心梗后内皮-间质转化（EndMT）是独立于纤维母细胞激活的致纤维化通路，贡献10-30%纤维母细胞样细胞，且受TGF-β/Smad、Notch、Wnt/β-catenin、HIF-1α及miR-21/miR-29等microRNA网络调控。文中明确将miR-29列为EndMT调控节点之一，但未区分其在EndMT背景下作用于pri-miR-29转录还是成熟体降解。

**与该子方向的关系**　竞争风险：本文把miR-29的抗纤维化/EndMT调控效应归入"TGF-β/Smad—microRNA网络"这一转录调控框架之下，与D2-2子方向试图证明的"TUT4/7尿苷化独立于Smad3、平行贡献纤维化"直接构成解释权竞争——若审稿人依此综述的框架，会默认miR-29变化就是TGF-β/Smad转录抑制的下游，而不会考虑3′端尿苷化降解这一层。差异声明：本文完全停留在通路清单层面（列出miR-21、miR-29与EndMT相关但不区分pri/pre与成熟体、不涉及TUT4/7或尿苷化机制），因此不构成直接证据冲突，但构成叙事框架层面的竞争，需要在引言里明确写出"本文首次把miR-29-EndMT关联拆解到尿苷化/成熟体降解层面，而非停留在转录抑制假说"。

**方法要点**　摘要提及的诊断工具（extracellular volume mapping、FAP-PET、collagen peptide assays、circulating fibrosis-related microRNAs）属于可搬的临床转化思路，可用于他未来把大动物模型/MYBPC3心脏组织的miR-29尿苷化比例与影像学/循环标志物挂钩做转化验证，但本文没有提供任何可直接复制的湿实验方法学（无qPCR引物、无CRISPR方案、无细胞分型流程细节），故对D2-2的第一个关键实验（Smad3失活+TGF-β时程+尿苷化RT-qPCR）没有可搬的湿实验protocol可用。

**效应量**　【摘要未报告数字】读全文时优先补：EndMT贡献纤维母细胞样细胞比例摘要已给"10-30%"，但需要在全文中找miR-29/miR-21在EndMT模型中的具体下调/上调倍数、检测所用细胞类型（内皮细胞谱系追踪比例）、以及是否报告了pri-miR-29与成熟miR-29的分离数据。

**它暴露/承认的空白**　本文承认的空白是"EndMT的分子调控网络中microRNA部分仍缺乏机制细节，仅列为可靶向通路之一"，这恰好落在D2-2子方向要填补的"pri/pre vs 成熟体miR-29降解机制未被解耦"这一具体空白上，但本文未提出用Smad3敲除来做通路解耦的实验设计，是纯描述性总结而非机制拆分。

**我不相信的一件事**　本文将miR-29笼统归入"TGF-β/Smad调控的EndMT-microRNA网络"，但摘要给出的证据链完全基于既有文献的转录层面关联（miR-29被TGF-β/Smad3转录抑制），并未提供任何区分miR-29"转录降低"与"尿苷化加速降解"两种机制的实验数据，因此其"microRNA网络是discrete、targetable pathway"的主张缺乏机制层面的因果验证，仅是通路罗列式综述而非机制证据。

**读全文要核对什么**　【需读全文核对】需确认：(1) 全文中miR-29相关section引用的原始文献是否报告了pri-miR-29与成熟miR-29的分离数据，还是仅报告成熟体表达变化；(2) EndMT细胞谱系追踪（10-30%比例）所用的动物模型/时间点是否与MYBPC3心脏纤维化模型的时间窗口（0/6/24/48h TGF-β1处理对应的体内时相）可比；(3) 图中是否有Smad依赖与非Smad依赖通路的示意图或分层数据，可用于对照本子方向的解耦假设设计。

**一个可执行动作**　我要在他已有的MYBPC3心脏原代细胞/类器官体系中，先用本文提示的EndMT谱系标志（内皮-间质双标记）分层细胞群，再在Smad3敲除背景下做TGF-β1时程（0/6/24/48h）处理，同步测pri-miR-29/成熟miR-29（stem-loop RT-PCR）与3′端尿苷化比例（3′端特异RT-qPCR），预期若EndMT细胞群中miR-29尿苷化在Smad3缺失后仍被TGF-β诱导，则证明TUT4/7通路独立于Smad3转录抑制，为D2-2解耦假设提供细胞类型特异的直接证据。


## D2-3 · miR-29家族3′端序列特异性
**层次：** 底物特异性　｜　**拥挤程度：** 极少（≤10）（两两最小共现 1 篇，全交集 0 篇）　｜　**首篇预计：** 12–15 个月

> **假设：** 若miR-29a/b/c因3′端序列差异对TUT4/7尿苷化敏感性不同，则家族成员在纤维化中的降解命运存在选择性

**科学前提**

[已发表] miR-29a/b/c由三个不同基因位点(MIR29A/B1/B2/C)转录，成熟体seed区一致但3′端最后2-4个核苷酸序列存在差异（miR-29a为3′...UAA-A，miR-29b含额外单尿苷特征并定位于核仁，miR-29c为3′...UAA-C），已知TUT4/7对底物3′端末位/次末位核苷酸组成（尤其是否已带U、是否为A-mismatch或3′突出）有偏好性。[已发表] TUT4/7对let-7家族的尿苷化依赖pre-let-7 3′端单核苷酸突出的序列特征，提示尿苷化效率存在序列特异性而非家族内一致。[待测] miR-29a/b/c三者被TUT4/7尿苷化的效率、稳态半衰期及在纤维化组织中的相对丢失程度是否存在系统性差异。

**第一个关键实验**

用他已有的MYBPC3心脏与SAA3肠纤维化存档组织（各n≥6纤维化组、n≥6对照组），针对miR-29a/miR-29b/miR-29c设计isoform特异性TaqMan/stem-loop qPCR分别定量成熟体绝对拷贝数及3′端加尾（尿苷化）比例（用3′-RACE/ligation-based尾巴PCR区分未修饰、单U、多U尾）；同批组织同步定量pri-miR-29a/b1/b2/c及mRNA前体，计算成熟体/前体比值。合作质谱或委托小规模Nanopore/Illumina 3′-tailing测序做正交验证TUT4/7加尾频率。

**必须的对照**

必须设pri/pre-miR-29a/b/c定量对照，若纤维化组织中成熟体下降而pri/pre不变或上升，方能排除TGF-β/Smad3转录抑制这一竞争解释；若pri/pre同步下降则提示转录层主导，需归入方向2主线而非本子方向。设TUT4/7 knockdown（siRNA或已有CRISPR工具）组织/类器官作为尿苷化依赖性对照，尿苷化尾巴比例应随TUT4/7敲低而降低。设DIS3L2 knockdown对照以确认尿苷化-降解通路完整性。跨器官（心脏vs肠）比较以排除组织特异性artifact，同一家族成员在两个器官中方向一致才可信。

**为什么是他能做**

他是MYBPC3心脏纤维化模型（Cell Death Dis 2022一作）和SAA3肠纤维化模型（Cell Death Discov 2025一作）的第一作者，两批存档组织归他所有，无需重新建模型即可直接取材做isoform定量，这是外人难以复制的起步优势；他熟练IHC和类器官技术可用于后续组织学定位验证；他唯一自己当PI的基金即抗肠纤维化药筛，天然衔接本子方向的转化产出。

**可行性**

isoform特异性qPCR和3′-RACE尾巴PCR是他可自学的分子生物学技术（1-2个月上手），存档组织和类器官系统已有；TUT4/7与DIS3L2的CRISPR敲低工具需要新建但基于他已有的CRISPR/ABE/BE4经验属于渐进扩展（约2-3个月）；smallRNA-seq或3′端测序验证需要合作（他自述为缺失技能），可先用低成本的ligation-PCR方法拿到初步数据再决定是否升级合作测序。

**最大风险与放弃条件**

最大风险是miR-29a/b/c三者尿苷化尾巴比例在纤维化组织与对照组之间无统计学差异（各组n≥6，双尾t检验或Mann-Whitney U，功效不足以检出＞1.5倍差异），且成熟体/前体比值在三个isoform中均无差异；若出现此结果，判定序列特异性差异假设不成立，放弃D2-3，退回D2主线（不区分isoform、只看miR-29总体成熟体是否经TUT4/7降解）继续验证。次要风险：若TUT4/7 knockdown后尾巴比例不随之下降，说明尿苷化非TUT4/7依赖，同样应放弃并重新评估是否为其他末端核苷酸转移酶所致。

**目标期刊与基金**

Nucleic Acids Research 或 RNA（方法学+机制交叉期刊）；适配基金机制为NIH K99/R00过渡期数据或AHA (American Heart Association) postdoc fellowship，因涉及心脏纤维化模型，也可申请他现有肠纤维化药筛基金的子课题延伸经费。

**首篇预计**

12–15 个月

**做成之后的下一步**

若确认某一miR-29 isoform对TUT4/7尿苷化选择性敏感，下一步可在类器官中做isoform特异性3′端序列突变（保持seed不变、仅换末端2-4nt）以因果验证序列决定尿苷化效率，并评估该isoform特异性稳定剂或3′端保护性化学修饰模拟物作为抗纤维化候选药物，衔接他现有的肠纤维化药筛基金。

**拥挤程度核查（可复算）**

检索式：`(miR-29[tiab] OR miR-29a[tiab] OR miR-29b[tiab]) AND (TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab] OR uridylation[tiab]) AND (fibrosis[tiab] OR "3' end"[tiab])`

| 层级 | 检索式 | 全库命中 |
|---|---|---|
| 单词 | `(miR-29[tiab] OR miR-29a[tiab] OR miR-29b[tiab])` | 3977 |
| 单词 | `(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab] OR uridylation[tiab])` | 343 |
| 单词 | `(fibrosis[tiab] OR "3' end"[tiab])` | 313955 |
| 两两 | `(miR-29[tiab] OR miR-29a[tiab] OR miR-29b[tiab]) AND (TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab] OR uridylation[tiab])` | 1 |
| 两两 | `(miR-29[tiab] OR miR-29a[tiab] OR miR-29b[tiab]) AND (fibrosis[tiab] OR "3' end"[tiab])` | 492 |
| 两两 | `(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab] OR uridylation[tiab]) AND (fibrosis[tiab] OR "3' end"[tiab])` | 97 |
| **全交集** | `(miR-29[tiab] OR miR-29a[tiab] OR miR-29b[tiab]) AND (TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab] OR uridylation[tiab]) AND (fibrosis[tiab] OR "3' end"[tiab])` | **0** |

**配套文献与笔记（4 篇）**

#### PMID 30507953 · RNA-sequencing analysis of umbilical cord plasma microRNAs from healthy newborns.
*PloS one 2019* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/30507953/)

**一句话结论**　该研究用small RNA-seq对健康新生儿脐带血浆miRNA做基线图谱，共识别1004个miRNA（每样本426–659个，269个八样本共有），并报告女性血浆中miR-29a-3p等6个miRNA同时存在尿苷化与腺苷化修饰，男女整体miRNA表达量无差异。

**与该子方向的关系**　支持前提：它提供了miR-29a-3p在体内正常生理状态下确实存在3′尿苷化/腺苷化的直接测序证据，为"miR-29a对TUT4/7尿苷化敏感"这一子方向假设提供了物种内（人）、组织外（血浆而非心/肠）的背景支持，但未涉及疾病/纤维化状态、未涉及miR-29b/29c、也未做TUT4/7功能关联，故只能作为间接前提证据，不构成竞争风险。

**方法要点**　方法要点：其small RNA-seq流程能同时捕获成熟miRNA丰度与3′端非模板加尾（uridylation/adenylation）类型，这与他计划的3′-RACE/ligation-based尾巴PCR及委托Nanopore/Illumina 3′-tailing测序在原理上一致，可直接搬用其序列比对与尾巴分型的生信思路（区分单U/多U/腺苷化）用于他自己MYBPC3心脏和SAA3肠组织的正交验证。

**效应量**　摘要报告：共识别1,004个miRNA，每样本426–659个，269个共有；6个miRNA（miR-128-3p、miR-29a-3p、miR-9-5p、miR-218-5p、miR-204-5p、miR-132-3p）在女性脐血浆中同时被尿苷化和腺苷化。摘要未报告miR-29a尿苷化的具体比例（%尾巴带U的读长占比）或拷贝数，读全文时优先补：miR-29a-3p尿苷化reads占总reads的百分比及单U vs多U尾的分布。

**它暴露/承认的空白**　该文承认目前健康新生儿脐带血浆miRNA及其3′端修饰的数据稀少，且完全未研究疾病/病理状态（如纤维化）下miR-29家族尾巴化是否变化，也未区分miR-29a/b/c三个旁系同源体的差异敏感性——这正是D2-3子方向要填补的空白：家族内3′端序列差异导致的TUT4/7降解命运选择性未被触及。

**我不相信的一件事**　该文将miR-29a-3p的尿苷化/腺苷化归为"女性特异性编辑"，但样本量仅4男4女、来自两个中心，未报告统计检验方法（如是否校正多重比较）及生物学重复的技术变异范围，所谓"consistently both uridylated and adenylated"的判定标准（阈值、reads支持数）在摘要中完全未说明，其性别差异结论的稳健性存疑。

**读全文要核对什么**　【需读全文核对】需确认：(1) miR-29a-3p尾巴分型的具体算法与阈值（如何界定"uridylated"vs噪声）；(2) 性别差异检验的统计方法及多重比较校正；(3) 是否报告了miR-29b/29c的尾巴化数据（摘要只提miR-29a）；(4) 两个中心样本的批次效应处理方式；(5) 测序深度与miR-29a-3p在该deep-seq中的原始reads数，以评估其定量可靠性可否作为我方法学参照。

**一个可执行动作**　我要在自己的MYBPC3心脏纤维化与SAA3肠纤维化存档组织体系（各n≥6纤维化组/n≥6对照组）中，参照本文small RNA-seq的3′尾巴分型思路，对miR-29a/b/c分别做isoform特异性ligation-based尾巴PCR定量尿苷化比例，预期纤维化组织中miR-29a-3p尿苷化比例较健康对照（可用本文脐血浆基线数据做外部正常值参照）显著升高，而miR-29b/29c因3′端序列差异呈现不同幅度的变化，从而建立家族内底物特异性的选择性降解证据。

#### PMID 42629158 · Guardians of splicing: quality control mechanisms of snRNA variants.
*Genes & development 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42629158/)

**一句话结论**　这篇是对Ma等人研究的评述文章，指出细胞用两套质量控制系统清除snRNA变体：核内exosome降解3′端加工缺陷或RNP组装失败的变体，胞质内则由TUT4/7起始的降解途径清除另一类变体；若变体被稳定下来会错误组装进剪接体并改变剪接，且canonical snRNA基因的致病突变也会触发这些降解机制。

**与该子方向的关系**　竞争风险：本文把TUT4/7的底物范围扩展到snRNA而非miRNA，若读者要论证TUT4/7对miR-29家族的3′端特异性识别机制，必须说明snRNA-TUT4/7识别信号（如3′端加工缺陷、RNP组装状态）与miRNA-TUT4/7识别信号（如AGO2结合状态、成熟体3′端序列）是否共用同一识别逻辑，否则会被质疑"TUT4/7识别底物缺陷"这一普遍机制早已被这篇文章在snRNA体系里证明过，miR-29的"发现"缺乏新颖性。

**方法要点**　摘要提示存在"稳定变体后检测其组装入剪接体并观察剪接改变"的功能验证逻辑，这类"稳定降解底物→观察下游功能获得"的实验设计思路可搬用到miR-29：例如敲低/敲除TUT4/7后稳定尾巴化的miR-29变体，观察其是否恢复对COL1A1/COL3A1等胶原mRNA的抑制。

**效应量**　【摘要未报告数字】读全文时优先补：核内exosome降解与胞质TUT4/7降解各自负责的snRNA变体比例或半衰期数值，以及"变体稳定后"剪接改变的定量效应大小（如外显子包含率变化百分比），这些数字可作为TUT4/7降解通路效率的横向参照。

**它暴露/承认的空白**　摘要明确承认"变体稳定后如何被剪接体误组装、致病突变如何触发降解"这一机制细节尚未完全阐明，这正落在D2-3子方向上——即TUT4/7对RNA底物3′端状态的识别是否有序列特异性阈值，miR-29a/b/c的3′端序列差异可能正是这种阈值的miRNA版本。

**我不相信的一件事**　本文的核心质疑点在于：snRNA变体被TUT4/7降解的决定因素似乎是"3′端加工缺陷/RNP组装失败"这类结构性异常，而非序列本身的特异性；若miR-29a/b/c降解命运的差异同样只是由AGO2上载效率或RNP组装完整性决定，而非3′端序列本身决定TUT4/7亲和力，则D2-3提出的"序列特异性尿苷化敏感性"假设可能是伪命题，需要在读全文后核实Ma等人是否做过"序列突变体是否仍被识别"的对照实验来排除这一可能。

**读全文要核对什么**　【需读全文核对】需要确认：(1) TUT4/7识别snRNA变体的具体信号是3′端序列motif还是仅由RNP组装/加工状态决定（图中是否有序列突变对照组）；(2) 核内exosome与胞质TUT4/7两条通路的底物划分依据及是否有交叉重叠案例；(3) 致病突变触发降解的具体位点是否位于3′端附近，可与miR-29c的3′端天然序列差异做类比对照。

**一个可执行动作**　我要在MYBPC3心脏与SAA3肠纤维化存档组织体系中，参照本文"稳定降解底物观察功能恢复"的思路，敲低TUT4/7后用isoform特异性TaqMan qPCR检测miR-29a/b/c尾巴化比例与COL1A1/COL3A1抑制效应的恢复情况，预期miR-29c因3′端序列差异对TUT4/7敲低的响应弱于miR-29a/b，从而验证家族内选择性降解命运。

#### PMID 42442601 · DIS3L2 and Nonsense-mediated Decay: United to Degrade.
*Journal of molecular biology 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42442601/)

**一句话结论**　该文聚焦DIS3L2在NMD底物（mRNA）降解中的作用，未涉及miR-29或TUT4/7对miRNA的3′尿苷化，仅提示"尿苷化标记→DIS3L2降解"这一通用机制可作旁证，但不能直接支持miR-29家族3′端序列特异性降解的假设。

**与该子方向的关系**　竞争风险：该综述聚焎mRNA/NMD底物的TUT-尿苷化-DIS3L2降解机制，并非miRNA(miR-29)3′端尿苷化-TUT4/7-降解通路，二者底物类别（mRNA vs miRNA）及下游核酸酶(DIS3L2 vs 其他exonuclease)不同，不能直接外推支持miR-29家族选择性降解假设。若要借鉴，仅可作为"尿苷化标记招募特异性核酸酶"这一原理性方法参考，需重新在miR-29a/b/c 3′端做实验验证。

**方法要点**　这是一篇review，无原创方法可搬用；文中提及的DIS3L2/TUT-uridylation降解机制概念可作为D2-3的机制参考（尿苷化标记→DIS3L2/exosome降解），但需另找原创论文获取可操作的实验方法（如3′端测序、uridylation定量protocol）。

**效应量**　【摘要未报告数字】该文为NMD/DIS3L2通路综述，未给出miR-29a/b/c的3′端序列差异、TUT4/7尿苷化效率或降解半衰期等任何定量数据。需补充：miR-29家族三个成员3′末端序列比对、体外TUT4/7尿苷化动力学(Km/Vmax或尿苷化位点比例)及DIS3L2/TDMD介导的降解速率差异数据。

**它暴露/承认的空白**　该综述承认的空白是：DIS3L2/NMD机制目前的证据几乎全部来自mRNA（尤其PTC底物）层面的3'尿苷化-降解偶联，而对成熟miRNA（尤其miR-29家族各成员因3'端序列差异导致的TUT4/7尿苷化敏感性、及后续是否经DIS3L2而非常规exosome降解）完全未涉及。这正落在D2-3的核心空白上——miR-29a/b/c三者3'端序列特异性是否决定其尿苷化-降解命运选择性，此文没有给出任何miRNA层面的直接证据或机制模型，需要你自己的3'末端测序/半衰期数据去填补。

**我不相信的一件事**　这篇综述讨论的是DIS3L2/NMD对mRNA底物的降解，其尿苷化-DIS3L2轴的证据体系建立在mRNA（尤其是PTC+转录本及LIN28/let-7相关的pre-miRNA终端尿苷化范式）上，并未针对成熟miR-29a/b/c这类短双链小RNA经TUT4/7尿苷化后是否同样被DIS3L2（而非XRN1或其他机制）识别降解给出直接证据——机制不能未经验证地从mRNA/pre-miRNA平移到成熟miRNA家族的3′端差异敏感性。此外摘要完全未涉及miR-29三个旁系同源体3′端序列差异，因此不能作为支持"家族成员选择性降解"假设的直接文献支撑，只能作为DIS3L2下游酶背景引用。

**读全文要核对什么**　【需读全文核对】需确认全文是否有任何数据涉及miRNA（尤其miR-29家族）作为DIS3L2/TUT4-7尿苷化底物的具体实验图（而非仅mRNA-NMD底物的综述性描述），以及是否给出3′端序列特异性（如末端核苷酸/结构差异)决定尿苷化敏感性的机制图或结构对照；若全文仅限mRNA-NMD底物、无miRNA或miR-29家族直接数据，则该文对D2-3假设仅提供TUT4/7-DIS3L2尿苷化降解通路的机制参考，不能作为miR-29a/b/c选择性降解的直接证据。

**一个可执行动作**　我要在已有的MYBPC3心脏与SAA3肠纤维化存档组织类器官体系里，用CRISPR敲除/敲低TUT4/7及DIS3L2，同时检测pri-miR-29 vs 成熟miR-29a/b/c的相对丰度变化，预期若成熟体选择性下降而pri-miR-29不变，则可将TUT4/7-DIS3L2尿苷化降解通路与TGF-β/Smad3转录抑制机制区分开，并揭示miR-29家族3′端序列差异导致的降解命运分化。

#### PMID 42094531 · Mechanism of nucleolytic degradation of human ribosomes.
*bioRxiv : the preprint server for biology 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42094531/)

**一句话结论**　该文报道饥饿应激下RIOK3招募TUT7与DIS3L2作用于40S核糖体，TUT7在18S rRNA 3′端加寡尿苷尾，DIS3L2随后识别尿苷化尾巴执行3′→5′降解，且降解中间体可被反复尿苷化再降解，形成迭代式"加尾-降解"循环；DIS3L2缺失导致尿苷化18S rRNA蓄积、降解受阻。

**与该子方向的关系**　提供方法：核心贡献是把TUT7尿苷化-DIS3L2外切降解这一"加尾即标记降解"的分子逻辑及配套检测手段搬到RNA底物上，与D2-3假设（TUT4/7对miR-29家族3′端尿苷化决定其降解命运）机制平行，可直接借鉴其"尿苷化→核酸外切酶清除"的因果证明框架和加尾定量流程；不是竞争风险，因为底物是18S rRNA而非miRNA，二者不在同一体系竞争解释力，但提示需在方向2里也排查DIS3L2（而非仅TUT4/7本身）是否参与miR-29降解下游步骤。

**方法要点**　可直接搬用：(1) 用ligation/加尾特异性测序区分未修饰、单U、多U尾巴（本文对18S rRNA做的"寻找加尾长度分布+迭代加尾中间体"策略可平移到miR-29a/b/c的3′-RACE/tailing-PCR设计）；(2) 用敲低/敲除DIS3L2作为下游外切酶对照，检验TUT7尿苷化后miR-29是否经DIS3L2途径被降解，而非仅停留在加尾这一步。

**效应量**　【摘要未报告数字】读全文时优先补：TUT7介导18S rRNA尿苷化的加尾长度分布（单U vs 寡U比例）、DIS3L2敲除后尿苷化18S rRNA蓄积的定量倍数（fold change）、以及RIOK3-TUT7-DIS3L2招募的时间动力学（饥饿后多久出现尾巴、多久被降解）这些具体数值，用于比对miR-29尿苷化-降解的时间尺度是否可比拟。

**它暴露/承认的空白**　摘要明确承认"rRNA decay的机制和介导因子此前未知"，本文只解决了rRNA-40S核糖体这一底物场景下TUT7/DIS3L2的作用，并未涉及该机制是否可推广到其他RNA底物（如miRNA）——这正是D2-3子方向要去补的空白：TUT4/7-尿苷化-核酸外切酶降解的通用逻辑是否也适用于miR-29家族且存在isoform特异性差异。

**我不相信的一件事**　本文的"迭代尿苷化-降解"模型建立在40S核糖体这种大分子核糖核蛋白复合体、由RIOK3先行泛素化标记再招募TUT7的特定应激（饥饿）通路上，其尿苷化-降解耦合是否依赖RIOK3提供的核糖体特异性招募平台尚不明确；若miR-29的3′端尿苷化没有类似"上游泛素化标记蛋白招募酶"的机制，则不能简单假设TUT7对miR-29的加尾会同样触发DIS3L2式的迭代降解，这一跨底物的机制可迁移性本身就是需要检验而非默认成立的前提。

**读全文要核对什么**　【需读全文核对】需确认：(1) 图中TUT7加尾18S rRNA的测序方法学细节（是otherwise standard 3′-RACE还是需专门Nanopore/Illumina建库流程，能否照搬到miRNA这种短RNA上）；(2) DIS3L2 knockdown/knockout对照组的设置方式（siRNA/CRISPR、时间点、是否有酶活死突变体作为阴性对照）；(3) 是否有体外重组TUT7+DIS3L2生化实验数据可作为"尿苷化长度阈值决定是否被降解"的定量参考值，此参考值对方向2设计isoform特异性qPCR分层（单U/多U）至关重要。

**一个可执行动作**　我要在MYBPC3心脏与SAA3肠纤维化存档组织体系里，参考本文对18S rRNA的3′-RACE/ligation加尾测序设计，对miR-29a/b/c做isoform特异性尾巴分层定量（未修饰/单U/多U），并加入DIS3L2表达水平/敲低作为下游外切酶对照，预期若miR-29家族存在如18S rRNA式的"尿苷化程度决定降解命运"的机制，则纤维化组织中多U尾巴比例更高的isoform其成熟体/前体比值会显著更低，且该效应可被DIS3L2缺失部分挽救。


## D2-4 · 心肠纤维化中TUT4/7表达谱对比
**层次：** 疾病落点　｜　**拥挤程度：** 词对无共现（两两最小共现 0 篇，全交集 0 篇）　｜　**首篇预计：** 6–9 个月

> **假设：** 若MYBPC3心脏与SAA3肠道存档组织中TUT4/7-尿苷化miR-29水平与纤维化程度呈正相关，则该轴是跨器官共同的致纤维化机制

**科学前提**

[已发表] TUT4/7 对 pre-let-7 等 RNA 的 3′ 尿苷化及 DIS3L2 对尿苷化 RNA 的降解已确立（Heo et al., Thornton et al.）；miR-29 的抗纤维化作用在心脏、肠道等多器官中证据充分。[已发表] TGF-β/Smad3 在转录水平抑制 miR-29 的 pri/pre-miR-29 已被证明（PMID 21784902/22095944），这是本子方向必须排除的竞争解释。[待测] TUT4/7 介导的 miR-29 3′ 尿苷化程度是否与心肠两个器官纤维化程度呈跨器官一致的正相关，目前无直接证据。[本项目计算] 未使用打分工具，本子方向纯粹依赖已存档组织的定量比较，不涉及序列打分假设。

**第一个关键实验**

用他已有的 MYBPC3 心脏（Cell Death Dis 2022）与 SAA3 肠（Cell Death Discov 2025）存档 FFPE/冰冻组织，按纤维化程度分组（Masson/IHC 胶原评分高中低各 n=6-8），做 TaqMan 或 stem-loop RT-qPCR 区分 pri-miR-29、pre-miR-29 与成熟 miR-29a/b，同时用 3′ 端特异 RT-qPCR（poly-A tailing 后 anchor primer 法）估测尿苷化成熟体比例，并做 TUT4/TUT7（ZCCHC11/ZCCHC6）与 DIS3L2 mRNA/蛋白定量（qPCR+IHC）。核心读出：尿苷化/总成熟体比值与胶原评分的相关性（Spearman），以及该比值是否独立于 pri/pre 水平变化。

**必须的对照**

必须同时测 pri-miR-29 与 pre-miR-29 水平，若其随纤维化程度同步下降（Smad3 转录抑制的特征），则需用统计上分离 pri/pre 变化与尿苷化成熟体变化的贡献（如偏相关控制 pri-miR-29）；阴性对照为纤维化程度匹配但敲低/中和 TGF-β 信号通路的样本（如有）或非纤维化对照器官同批次处理；同时纳入不受 TGF-β 抑制的另一 miRNA（如 miR-33）作为特异性对照，排除广泛性 RNA 降解伪影；技术对照包括无模板对照与 spike-in 合成尿苷化/非尿苷化 miR-29 寡核苷酸标准品验证 RT-qPCR 特异性。

**为什么是他能做**

他是 MYBPC3 心脏纤维化模型（Cell Death Dis 2022）与 SAA3 肠纤维化模型（Cell Death Discov 2025）两篇一作论文的作者，独家拥有这两个器官的存档组织与配套 IHC/胶原评分数据，且他唯一自己当 PI 的基金就是抗肠纤维化药筛项目，具备类器官与大动物模型经验可支撑后续验证。这使他能在几乎零新增动物实验成本下，直接用存档样本做跨器官回顾性关联分析。

**可行性**

stem-loop RT-qPCR 与 TaqMan pri/pre/mature 区分他已具备或可快速上手（属于标准分子生物学技能，不需要 smallRNA-seq）；3′ 端尿苷化特异 RT-qPCR（poly-A tailing/anchor PCR 法）需新学 1-2 个月，可参考已发表 Heo lab 方法自建；组织已存档，无需新增动物，起步成本低，仅需引物合成、探针设计与少量试剂经费（约数千美元级）。若需更精确的尿苷化定量，可后续送样合作做 3′ 末端测序，但作为首篇不是必需项。

**最大风险与放弃条件**

最大风险是尿苷化成熟体比例的变化完全由 pri/pre-miR-29 转录下降驱动（即偏相关控制 pri-miR-29 后，尿苷化比值与胶原评分的相关性 R²<0.1 且 p>0.2），或者两个器官中该相关性方向相反（一个正相关一个负相关或均不显著）。若出现上述任一情况，则判定该假设在疾病落点层面不成立，放弃 D2-4，退回 D2 主线中更上游的机制子方向（如体外 TUT4/7-miR-29 生化互作验证）重新设计。

**目标期刊与基金**

目标期刊为 Journal of Molecular Cell Biology 或 Matrix Biology 一类的中等档次机制型期刊，作为快速产出的第一篇；适配基金机制为 AHA Postdoctoral Fellowship 或 NIH K99/R00 的 preliminary data 部分，用于支撑后续心肠纤维化跨器官机制基金申请。

**首篇预计**

6–9 个月

**做成之后的下一步**

若相关性成立，下一步是在类器官或心脏/肠道特异性 TUT4/7 敲低模型中做因果验证，并测定 miR-29 半衰期变化以确证降解机制而非单纯转录效应。

**拥挤程度核查（可复算）**

检索式：`(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab]) AND miR-29[tiab] AND (fibrosis[tiab] OR uridylation[tiab])`

| 层级 | 检索式 | 全库命中 |
|---|---|---|
| 单词 | `(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab])` | 136 |
| 单词 | `miR-29[tiab]` | 1015 |
| 单词 | `(fibrosis[tiab] OR uridylation[tiab])` | 295173 |
| 两两 | `(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab]) AND miR-29[tiab]` | 0 |
| 两两 | `(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab]) AND (fibrosis[tiab] OR uridylation[tiab])` | 65 |
| 两两 | `miR-29[tiab] AND (fibrosis[tiab] OR uridylation[tiab])` | 212 |
| **全交集** | `(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab]) AND miR-29[tiab] AND (fibrosis[tiab] OR uridylation[tiab])` | **0** |

**配套文献与笔记（4 篇）**

#### PMID 42094531 · Mechanism of nucleolytic degradation of human ribosomes.
*bioRxiv : the preprint server for biology 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42094531/)

**一句话结论**　该文证明饥饿应激下 RIOK3 招募 TUT7 与 DIS3L2 到泛素化 40S 核糖体，TUT7 对 18S rRNA 3′端加尿苷寡聚尾，DIS3L2 识别尿苷化 18S rRNA 并行 3′-5′降解，且存在"尿苷化-降解"迭代循环；DIS3L2 缺失导致尿苷化 18S rRNA 积累、降解受阻。

**与该子方向的关系**　竞争风险：本文把 TUT7-DIS3L2 尿苷化-降解轴的底物设定为 18S rRNA 而非 miR-29，若 D2-4 只观测到 TUT4/7、DIS3L2 表达/蛋白量与纤维化程度相关，无法排除是核糖体质控（rRNA turnover）而非 miR-29 尿苷化通路的信号，二者会在同一批 TUT4/7 IHC/qPCR 数据里"撞车"、混淆解释权；必须写差异声明：本文底物是核糖体 RNA，D2-4 底物是 miRNA，二者共用同一套加尾-降解酶但作用于不同 RNA 类别，不能用 TUT7/DIS3L2 总表达量的相关性反推是miR-29轴在起作用。

**方法要点**　可搬方法：①stem-loop/anchor primer 式的 3′端特异 RT-qPCR（poly-U tailing 后接头引物）估测尾长/尿苷化比例的思路可直接迁移到 miR-29 3′末端定量；②用 DIS3L2 敲低/敲除对照来检验"尿苷化底物是否因外切酶缺失而积累"，可作为 D2-4 中判断 TUT4/7-miR-29 轴是否具因果性（而非仅相关）的功能验证设计；③测序法识别"降解中间体的迭代尿苷化"这一分析框架，提示他在做 3′端测序时应关注中间长度产物而非只看终产物比例。

**效应量**　摘要未报告数字。读全文时优先补：①TUT7 缺失/DIS3L2 缺失后 18S rRNA 降解速率或半衰期的具体倍数变化；②尿苷化 18S rRNA 在 DIS3L2 KO 中积累的定量（如 qPCR fold change 或测序读数占比）；③RIOK3-TUT7-DIS3L2 结合的富集倍数（IP/质谱数据）。

**它暴露/承认的空白**　摘要明确承认"介导 rRNA 降解的机制和因子此前未知"，即该领域此前缺乏 TUT7-DIS3L2 如何被招募到特定 RNP 上的机制描述；这一空白落在 D2-4 的机制层——他计划做的"TUT4/7 是否被特异招募到 miR-29-AGO2 复合物"这一步在文献中同样缺失，本文只是在核糖体这一底物上填补，未涉及 miRNA 底物，提示 D2-4 需要自己补招募机制的证据（如 Co-IP/RIP），不能假设文献已经证明。

**我不相信的一件事**　本文的核心证据链（RIOK3 招募 TUT7/DIS3L2、尿苷化驱动降解）建立在应激诱导的核糖体质控背景下，尚未证明 TUT7 对 18S rRNA 的尿苷化活性是否依赖特定的 RIOK3-泛素化信号，还是 TUT7/DIS3L2 本身对任何暴露的 3′-OH RNA 末端都有此活性（即底物特异性 vs 广谱末端修饰酶行为未区分）；若后者成立，则不能推断 TUT4/7-DIS3L2 在心/肠组织中作用于 miR-29 时也需要类似的泛素化招募标签，这会直接影响 D2-4 里"招募机制是否跨底物通用"的假设。

**读全文要核对什么**　【需读全文核对】需确认：①TUT7 敲低/DIS3L2 敲低实验中是否设有 TUT4（而非 TUT7）的单独对照，以判断该通路对 TUT4/7 两个旁系同源基因是否有选择性（关系到 D2-4 该测哪一个或两个都测）；②尿苷化 18S rRNA 的测序/qPCR 定量方法具体流程（引物设计、anchor primer 序列、poly-A/poly-U tailing 条件）是否可直接套用于 miR-29 3′端；③是否有 RIOK3-TUT7-DIS3L2 三者的 Co-IP 或 RIP 图，招募是否需要特定应激信号（starvation-specific）还是组成性存在，这决定纤维化组织里该轴是否会"本底激活"从而干扰相关性解读。

**一个可执行动作**　我要在 MYBPC3 心脏与 SAA3 肠 FFPE/冰冻存档组织体系里，借鉴本文的 3′端 anchor primer/poly-tailing RT-qPCR 方法，同时检测 TUT4 与 TUT7（而非只测一个旁系同源基因）对 miR-29 的尿苷化比例，并加做 DIS3L2 qPCR/IHC 作为下游降解酶对照，预期若尿苷化/总成熟体比值与胶原评分独立于 pri/pre-miR-29 相关，则支持 TUT4/7-DIS3L2-miR-29 轴而非单纯核糖体质控信号污染了该相关性。

#### PMID 42054207 · The long isoform of ZAP coordinates multiple enzymes to mediate complete decay of target transcripts.
*Cell reports 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42054207/)

**一句话结论**　该文揭示 ZAP-KHNYN-TUT4/7-DIS3L2-XRN1 组成的病毒RNA降解流水线：长型ZAP识别病毒RNA后KHNYN切割，5′片段经TUT4/7尿苷化再被DIS3L2降解，3′片段由XRN1清除，TRIM25介导酶复合物组装并在病毒感染时增强。

**与该子方向的关系**　提供方法：本文确立了TUT4/7-尿苷化-DIS3L2这条降解链在ZMD通路中的分子顺序，可为D2-4中"尿苷化成熟体降解"的机制解释提供分子生物学参照，但其底物是病毒RNA而非miR-29前体/成熟体，不构成竞争风险也不能直接作为miRNA降解证据。

**方法要点**　核心方法是RNase-resistant共免疫沉淀确认ZAP/TRIM25与KHNYN、TUT7、DIS3L2、XRN1的互作，以及切割位点定位后区分5′/3′片段的独立降解命运；他可以搬用的是"3′片段尿苷化+DIS3L2降解"这一逻辑框架来设计miR-29尿苷化后下游酶（DIS3L2）is/not involved的验证实验，但底物识别机制（ZAP结合基序）与miRNA体系无关。

**效应量**　【摘要未报告数字】读全文时优先补：TUT4/7尿苷化效率的定量比例、DIS3L2降解速率或半衰期数据、TRIM25互作在病毒感染前后的倍数变化，这些若有具体数值可作为D2-4中尿苷化/降解定量分析的方法学对照。

**它暴露/承认的空白**　摘要承认"ZAP同工型为何抗病毒活性不同、如何招募辅因子"此前不清楚，本文填补的是病毒RNA降解通路顺序这一空白；但完全未涉及TUT4/7对内源miRNA（如miR-29）尾巴修饰的调控，这正是D2-4要补的空白——即同一套TUT4/7-DIS3L2机器是否也作用于miR-29且与纤维化程度相关。

**我不相信的一件事**　本文的TUT4/7-DIS3L2降解模型建立在病毒RNA被KHNYN切割产生的5′片段上，其尿苷化识别的底物结构（游离3′端、无2′-O-甲基化保护等）与Dicer/Ago2加工后的成熟miR-29在化学本质上未必等同，因此不能想当然认为miR-29的3′尿苷化-降解也遵循相同的酶动力学或位点偏好，摘要未提供任何证据支持跨底物的普适性。

**读全文要核对什么**　【需读全文核对】需确认：(1)TUT4/7尿苷化底物特异性实验中是否用过内源非病毒RNA/miRNA作为对照，以判断该酶复合物底物范围是否可能延伸至miR-29前体；(2)DIS3L2敲低/敲除后是否检测过细胞内源小RNA（尤其miRNA）丰度变化的对照数据；(3)TRIM25介导酶募集是否具有RNA序列/结构特异性，还是可能是通用招募平台。

**一个可执行动作**　我要在MYBPC3心脏与SAA3肠道存档组织体系里，用本文确立的TUT4/7→DIS3L2降解顺序作为分子机制参照，设计DIS3L2 mRNA/蛋白定量及功能干预（如未来体外类器官中DIS3L2 knockdown），预期若miR-29降解也依赖DIS3L2，则尿苷化成熟体比例与DIS3L2表达量应呈正相关，且该相关性独立于pri/pre-miR-29转录水平变化，从而与TGF-β/Smad3转录抑制机制区分开。

#### PMID 41608885 · MiRNA Stability and Degradation: Dynamic Regulators of Cellular Regulatory Networks.
*Wiley interdisciplinary reviews. RNA 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/41608885/)

**一句话结论**　这是一篇综述，整合ZSWIM8-TDMD、TUT4/7-DIS3L2尿苷化降解与核酸酶剪切三条miRNA降解通路，并提出肠腔与循环等"compartment-specific"降解机制、以及TDMD释放后成熟miRNA由哪种核酸酶清除，属于尚未解决的问题。

**与该子方向的关系**　支持前提：它把TUT4/7-DIS3L2-尿苷化列为miRNA稳态三大降解机制之一，并明确指出肠道（gut lumen）是待解析的组织特异性降解场景，直接为D2-4用SAA3肠道存档组织做TUT4/7表达谱提供理论正当性；但它是综述不含实验数据，不构成竞争风险。

**方法要点**　摘要本身未给出具体实验方法，但其归纳的"AGO association、terminal modifications、sequence features"三类稳定性决定因素，可指导他在设计TaqMan/stem-loop RT-qPCR时同步纳入AGO2共定位IHC与miRNA序列末端特征分析，作为解释尿苷化比例差异的补充变量。

**效应量**　【摘要未报告数字】读全文时优先补：是否列出了TUT4/7与DIS3L2在特定组织（尤其肠道/循环）中相对表达量或活性的已发表数据，以及是否给出了尿苷化成熟体比例的参考范围数值，可作为他实验的预期效应量基线。

**它暴露/承认的空白**　摘要明确承认两个空白：①TDMD释放游离pre-RISC miRNA后由哪种核酸酶降解尚不明；②肠腔与循环等生理/病理组织中的compartment-specific降解机制未阐明——第②条正落在D2-4子方向（心肠两种器官的TUT4/7-miR-29轴对比），可作为他填补该空白的直接切入点。

**我不相信的一件事**　该综述将TUT4/7-DIS3L2尿苷化列为普适性降解机制，但未区分不同组织（心脏vs肠道）中TUT4与TUT7两个旁系同源酶是否存在功能非冗余的组织特异性优先使用，若二者在心/肠中的相对贡献不同，D2-4单纯合并二者定量可能掩盖真实的器官特异性调控差异，这一点该综述并未给出可验证的区分方案。

**读全文要核对什么**　【需读全文核对】需确认：①综述正文/图中是否列出TUT4 vs TUT7在不同组织（尤其消化道/心脏/纤维化模型）中表达或功能差异的已发表证据来源；②是否总结了区分pri/pre与成熟miRNA降解速率的标准方法学（如是否提及stem-loop qPCR或3′端anchor PCR作为公认区分尿苷化成熟体的手段）；③文中引用的"gut lumen"降解证据具体来自哪些原始研究，可否作为D2-4的对照文献支撑。

**一个可执行动作**　我要在MYBPC3心脏与SAA3肠道存档FFPE/冰冻组织体系中，按此综述强调的AGO association、terminal modification、sequence feature三要素设计对照分组，用stem-loop RT-qPCR区分pri/pre/成熟miR-29并结合3′端anchor PCR测尿苷化比例，预期若TUT4/7-DIS3L2轴确为跨器官共同机制，则尿苷化/总成熟体比值应在心肠两种组织中均与胶原评分呈正相关且独立于pri/pre水平变化；若仅在一种组织中成立，则提示该综述所述"compartment-specific"空白确实存在器官特异性，需分别报告TUT4与TUT7的相对贡献。

#### PMID 41174475 · MicroRNA strand ratio disarray promotes temozolomide resistance in glioblastoma.
*Cellular & molecular biology letters 2025* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/41174475/)

**一句话结论**　该文证明TUT4通过尿苷化pre-miR-92b改变Drosha/Dicer后的臂选择偏好，使miR-92b-3p/5p比值升高，进而经HDAC9/FOXP3双靶点通路激活COL7A1转录并促进胶原沉积，最终导致GBM对TMZ耐药。这是"TUT4尿苷化→改变miRNA成熟产物比例→促纤维化基因表达"这一因果链在肿瘤耐药情境下的直接实证。

**与该子方向的关系**　竞争风险：本文的核心机制不是"TUT4尿苷化加速miRNA整体降解（TDMD/decay）"，而是"TUT4尿苷化影响pre-miRNA臂选择（arm selection），改变3p/5p比例"，这是完全不同的分子终点（选择偏好 vs 稳态降解）。如果D2-4方向把"TUT4-尿苷化miR-29水平升高=促降解"的读出等同于本文的"3p/5p比例改变"，会犯概念混淆——必须在实验设计中明确区分测的是miR-29总量降解（半衰期）还是miR-29-5p/3p比例漂移，否则会被审稿人指出与本文机制混为一谈。

**方法要点**　可直接搬用的方法：用TUT4抑制剂aurothioglucose hydrate (ATG-H)作为工具药，在他自己的MYBPC3心脏/SAA3肠道存档组织衍生的类器官或细胞体系中，验证阻断TUT4尿苷化是否能同步降低尿苷化miR-29水平并改善纤维化标志物，这是一个现成的药理学阻断对照。摘要中"H3K27ac ChIP在COL7A1启动子区"的表观遗传读出方法也可迁移，用于检测miR-29下游胶原基因（COL1A1/COL3A1）启动子区组蛋白修饰变化。

**效应量**　摘要未报告数字。读全文时优先补：miR-92b-3p/5p比值在TMZ耐药与敏感细胞中的具体倍数差异、ATG-H处理后该比值及TMZ半数抑制浓度(IC50)的恢复幅度、COL7A1 mRNA/蛋白表达变化的定量数据。

**它暴露/承认的空白**　该文完全未处理"TUT4尿苷化是否影响成熟miRNA整体稳定性/半衰期"这一问题，只处理了臂选择偏好，暴露出TUT4功能谱中"降解加速"与"选择偏好改变"两条机制路径尚未被同一研究整合的空白，这恰好落在D2-4子方向（他假设的是尿苷化→miR-29水平降解增加）上，需要他自己补齐半衰期测定这一环节。

**我不相信的一件事**　本文将miR-92b-3p升高的功能归因全部归给"HDAC9/FOXP3双靶点—COL7A1"通路，但没有说明是否排除了miR-92b-5p绝对量下降本身（而非3p升高）对靶基因去抑制的贡献，即3p和5p的效应未做真正的独立敲低/过表达拆分对照，这使"比值升高"这一表述可能掩盖了双臂各自贡献不均的问题。

**读全文要核对什么**　【需读全文核对】需确认：(1) TUT4尿苷化位点是否在pre-miR-92b的特定核苷酸（如3′端最后1-2个尿苷加成位点），加成位点与miR-29 pre-miRNA结构是否同源可比；(2) ATG-H剂量-反应曲线及其对TUT4酶活的特异性证据（是否有TUT4 knockdown/knockout的平行对照，而非只用药理抑制剂）；(3) H3K27ac ChIP-seq/ChIP-qPCR的阴性对照区域及抗体验证信息。

**一个可执行动作**　我要在MYBPC3心脏与SAA3肠道存档组织的类器官/原代细胞体系中，用ATG-H（TUT4抑制剂）处理并同步检测miR-29-5p/3p臂比例（qPCR区分双臂）与miR-29总量半衰期（actinomycin D chase），预期若D2-4假设成立，ATG-H处理会同时降低尿苷化miR-29丰度、延长其半衰期、并降低COL1A1/COL3A1等胶原基因表达，从而将"降解加速"与"臂选择改变"两种机制在同一体系中彼此区分开。


## D2-5 · 3′尿苷化标记的半衰期测定工具
**层次：** 方法工具　｜　**拥挤程度：** 词对无共现（两两最小共现 0 篇，全交集 0 篇）　｜　**首篇预计：** 12–15 个月

> **假设：** 若建立基于ABE内源标签结合pulse-chase的3′端测序方法可定量成熟miR-29半衰期，则可直接区分转录抑制与降解加速对稳态miR-29丰度的贡献

**科学前提**

[已发表] TUT4/7 对 pre-let-7 及部分 mRNA 3′端尿苷化并招募 DIS3L2 降解已被生化和结构证据确立（Ustianenko et al., Thornton et al. 系列工作）。[已发表] miR-29 抗纤维化作用及其在心/肠纤维化中下降已由多篇文献及作者本人 MYBPC3（Cell Death Dis 2022）与 SAA3（Cell Death Discov 2025）工作证实。[已发表] TGF-β/Smad3 在转录层直接抑制 pri-miR-29 转录已被 PMID 21784902/22095944 证实，是必须排除的竞争解释。[待测] 成熟 miR-29 是否存在可检测的 3′端尿苷化修饰且该修饰是否显著缩短其半衰期，目前无直接体内定量数据。

**第一个关键实验**

在他已有的 MYBPC3 心脏纤维化小鼠模型和肠道类器官纤维化模型中，用 ABE 敲入不可编辑的沉默突变作为内源代谢标签（4-thiouridine 或类似 pulse 标签不适用于内源 miRNA，故改用 actinomycin D 阻断新生转录的 pulse-chase 设计），在 TGF-β 刺激后 0/2/6/12/24 小时取材，同时做 pri-miR-29、pre-miR-29、成熟 miR-29 的 TaqMan/RT-qPCR 定量和 3′端特异性 ligation-qPCR（检测尿苷化 3′末端比例），样本量 n=6/组/时间点，两个器官平行开展。

**必须的对照**

必须设置 TUT4/7 double knockdown（siRNA 或 ABE 失活突变）组，若尿苷化比例下降但成熟体半衰期不变则排除本假设；必须设置 actinomycin D 阻断转录后单独追踪成熟体衰减曲线，将其半衰期变化与 pri/pre 前体水平变化分离，若 pri-miR-29 在 TGF-β 后即刻下降而成熟体半衰期不变，则证明是 Smad3 转录抑制主导而非降解加速；另设 DIS3L2 knockdown 组验证下游降解酶依赖性；空载体/scramble ABE 编辑对照排除脱靶效应。

**为什么是他能做**

他在 MYBPC3 心脏（Cell Death Dis 2022）和 SAA3 肠（Cell Death Discov 2025）两篇一作论文中已建立并验证纤维化模型与组织存档，可直接复用而不需重新造模；他熟练的 ABE/BE4 内源位点编辑技能可用于构建报告标签而非依赖过表达系统，保证生理浓度下的动力学真实性；他唯一自己当 PI 的基金正是抗肠纤维化药筛，为本子方向提供现成的经费和类器官平台衔接。

**可行性**

已具备：动物模型、类器官、ABE 编辑、IHC 和常规 RT-qPCR。需新学：3′端特异性 ligation-qPCR 或 small RNA-seq 建库分析（预计 3–4 个月自学或合作学习曲线），以及 pulse-chase 动力学建模拟合半衰期（可用现成 R 包，1 个月内可上手）。可先用商业化 3′端测序试剂盒降低起步成本，暂不需要质谱合作。

**最大风险与放弃条件**

最大风险是成熟 miR-29 尿苷化比例过低（低于检测下限，如 <2% 3′末端读数）或 TUT4/7 knockdown 后尿苷化比例下降但 actinomycin D pulse-chase 测得的成熟体半衰期在 knockdown 与对照组间无统计学差异（ANOVA p>0.05），此时应放弃"降解加速"假设，退回到仅描述 Smad3 转录抑制模型，将本子方向降级为阴性对照数据用于支撑方向2主线论文的排除性证据。

**目标期刊与基金**

Nucleic Acids Research 或 RNA（方法学论文），适配基金机制为 NIH R21（高风险探索性方法工具类）或 AGA/AASLD 消化道疾病基础研究基金（衔接其现有肠纤维化药筛项目）。

**首篇预计**

12–15 个月

**做成之后的下一步**

若本方法成功证明成熟 miR-29 半衰期在纤维化诱导后显著缩短且依赖 TUT4/7-DIS3L2，则自然延伸到方向2主线：在心脏与肠道两个器官系统中系统检验 TUT4/7 敲低能否恢复 miR-29 稳态并逆转胶原沉积表型。

**拥挤程度核查（可复算）**

检索式：`(miR-29[tiab] OR miRNA-29[tiab]) AND ("3' uridylation"[tiab] OR TUT4[tiab] OR TUT7[tiab]) AND (half-life[tiab] OR turnover[tiab])`

| 层级 | 检索式 | 全库命中 |
|---|---|---|
| 单词 | `(miR-29[tiab] OR miRNA-29[tiab])` | 1066 |
| 单词 | `("3' uridylation"[tiab] OR TUT4[tiab] OR TUT7[tiab])` | 146 |
| 单词 | `(half-life[tiab] OR turnover[tiab])` | 213641 |
| 两两 | `(miR-29[tiab] OR miRNA-29[tiab]) AND ("3' uridylation"[tiab] OR TUT4[tiab] OR TUT7[tiab])` | 0 |
| 两两 | `(miR-29[tiab] OR miRNA-29[tiab]) AND (half-life[tiab] OR turnover[tiab])` | 6 |
| 两两 | `("3' uridylation"[tiab] OR TUT4[tiab] OR TUT7[tiab]) AND (half-life[tiab] OR turnover[tiab])` | 16 |
| **全交集** | `(miR-29[tiab] OR miRNA-29[tiab]) AND ("3' uridylation"[tiab] OR TUT4[tiab] OR TUT7[tiab]) AND (half-life[tiab] OR turnover[tiab])` | **0** |

**配套文献与笔记（4 篇）**

#### PMID 32961817 · Specific miRNA and Gene Deregulation Characterize the Increased Angiogenic Remodeling of Thoracic Aneurysmatic Aortopathy in Marfan Syndrome.
*International journal of molecular sciences 2021* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/32961817/)

**一句话结论**　MFS主动脉瘤组织中miR-29等25个miRNA下调、miR-632上调，且组织学显示更强的血管重塑与弹性纤维碎裂，但这是稳态丰度的相关性描述，未涉及成熟体降解速率或3′尿苷化机制。

**与该子方向的关系**　竞争风险：该文用bulk组织miRNA芯片/qPCR测miR-29稳态丰度下降并归因于"deregulation"，未区分是转录抑制（TGFβ通路本身在文中被列为下游靶通路）还是降解加速，若不做pri/pre/mature三层定量，会被解读为与D2-5的TUT4/7降解假设重复但证据力更弱，需在写作中明确划清：本文是关联性表达谱，D2-5是机制性半衰期定量。

**方法要点**　可搬方法：人体主动脉瘤手术标本+离体培养SMC的miRNA芯片分层设计（MFS vs 非MFS TAA对照），以及CD133+/MMP-2免疫组化评估血管重塑的分组标准，可直接套用到他的MYBPC3心脏纤维化模型做跨物种/跨器官miR-29下调的验证性IHC对照。

**效应量**　摘要未报告数字：具体miR-29下调倍数、25个miRNA各自的fold change、40例患者中MFS与非MFS分组的样本数比例均未给出。读全文时优先补：miR-29在MFS vs 非MFS TAA中的定量fold change及统计学p值、SMC体外培养的miR-29动态时间点数据（若有）。

**它暴露/承认的空白**　该文明确承认"需要进一步研究确认这些miRNA是否可作为治疗靶点"，即完全未做机制层面的转录vs降解区分，这正是D2-5要填补的空白——用actinomycin D pulse-chase+3′端ligation-qPCR定量miR-29半衰期，从而判断MFS/TGFβ驱动的miR-29下调究竟是转录抑制还是尿苷化降解加速。

**我不相信的一件事**　该文将miR-29下调直接与MMP-2升高、胶原稳态破坏挂钩，但miR-29本身抑制MMP2/胶原合成通路，其下调与MMP-2表达升高的因果方向未经功能验证（可能是MMP-2先升高触发继发miRNA重编程，而非miR-29下调驱动MMP-2上升），芯片相关性不能证明因果链方向。

**读全文要核对什么**　【需读全文核对】需确认miRNA芯片/RT-qPCR具体检测的是成熟miR-29还是包含pri/pre的总RNA探针设计；需核对40例患者中MFS组与非MFS TAA对照组的具体样本量分配及取材时间点（术中一次性取材还是有病程分层）；需核对SMC体外培养实验是否设置了TGFβ刺激的时间梯度或仅为终点比较。

**一个可执行动作**　我要在MYBPC3心脏纤维化小鼠模型和肠道类器官纤维化模型中，用actinomycin D pulse-chase结合pri/pre/成熟miR-29的TaqMan三层定量及3′端ligation-qPCR，预期能区分本文观察到的miR-29稳态下调究竟主要来自转录抑制还是TUT4/7介导的尿苷化降解加速，从而回应本文遗留的机制空白。

#### PMID 31952855 · Noninvasive biomarker-based risk stratification for development of new onset atrial fibrillation after coronary artery bypass surgery.
*International journal of cardiology 2021* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/31952855/)

**一句话结论**　术前血清 PIIINP、PICP 升高与 miR-29 水平降低同时出现于术后房颤（PoAF）患者，且二者均与心房纤维化程度相关；联合年龄、PIIINP 与 miR-29a 建立的模型对 PoAF 有更高预测准确性。

**与该子方向的关系**　竞争风险：本文把「miR-29 降低」直接作为纤维化标志物纳入预测模型，但完全没有区分这是转录抑制（TGF-β/Smad3 通路）还是成熟体降解加速（TUT4/7 尿苷化）导致的丰度下降，这正是 D2-5 要解决的核心问题；若不做 pri/pre/成熟体分层，本文式的"血清 miR-29 降低=纤维化标志"结论会被误用来支持任一机制，构成对本子方向核心区分逻辑的稀释风险。

**方法要点**　用血清/循环 miR-29（及 PIIINP/PICP 等胶原代谢产物）作为无创纤维化替代标志物的思路可直接搬用到他的 MYBPC3 心脏纤维化模型中做血清学平行验证，但本文的 RT-qPCR/TaqMan 定量本身不区分前体与成熟体，不能作为半衰期或降解速率的方法学参考。

**效应量**　摘要中报告：PoAF 组 PIIINP 103.1±39.7 vs 非 PoAF 组 35.1±19.3（P=0.041）；年龄 72.04±10.7 岁（P=0.043）；全局与局部 LA 应变及射血分数在 PoAF 组降低（P=0.007, P=0.01）；miR-29 水平在 PoAF 组降低但摘要未报告具体数值——读全文时需补 miR-29a 的绝对/相对表达倍数及其与 PIIINP 的相关系数 r 值。

**它暴露/承认的空白**　该文承认循环 miR-29 与心房纤维化的关联是相关性而非因果机制，完全未涉及 miR-29 丰度下降的分子来源（转录 vs 降解），这正是 D2-5 试图用 pulse-chase + 3′端测序填补的机制层空白。

**我不相信的一件事**　本文用外周血清 miR-29 水平推断心房局部纤维化程度，但循环 miRNA 来源混杂（血细胞、内皮、心房肌细胞均可分泌），血清 miR-29 下降是否真实反映心房组织内成熟 miR-29 稳态改变存疑，尤其在没有配对心房组织 miR-29 定量的情况下，这一替代关系本身缺乏直接验证。

**读全文要核对什么**　【需读全文核对】需确认：(1) miR-29 检测是否区分 miR-29a/b/c 亚型及是否用 U6/cel-miR-39 归一化；(2) 是否有心房组织（而非仅血清）miR-29 定量作为金标准对照；(3) PIIINP/PICP 与 miR-29a 的相关系数及联合预测模型的 ROC/AUC 具体数值和验证队列大小。

**一个可执行动作**　我要在 MYBPC3 心脏纤维化小鼠模型和肠道类器官纤维化模型中，用 ABE 内源沉默突变标签结合 actinomycin D pulse-chase 及 3′端 ligation-qPCR，同时测定血清/组织中 PIIINP 类胶原代谢产物与 pri/pre/成熟 miR-29 的动态变化，预期能证明术后纤维化中 miR-29 成熟体下降主要由 TUT4/7 介导的降解加速而非单纯转录抑制驱动，从而区分本文（及 TGF-β/Smad3 文献）无法区分的机制层面。

#### PMID 41608885 · MiRNA Stability and Degradation: Dynamic Regulators of Cellular Regulatory Networks.
*Wiley interdisciplinary reviews. RNA 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/41608885/)

**一句话结论**　这是一篇综述，整合了 ZSWIM8-TDMD、TUT4/7-DIS3L2 尿苷化、核酸酶剪切三条 miRNA 降解通路，并强调这些机制如何与 AGO 结合、末端修饰、序列特征共同决定成熟 miRNA 丰度。它没有提供新数据，只是把领域内已知空白（如 TDMD 释放后 miRNA 由哪种核酸酶降解、肠腔与循环等区室特异性降解机制）系统列出。

**与该子方向的关系**　支持前提：它把 TUT4/7-DIS3L2 尿苷化列为与 TDMD 并列的主要成熟 miRNA 降解通路，且明确指出终端修饰（terminal modifications）是决定 miRNA 稳定性的核心变量之一，这为 D2-5 用 3′尿苷化 ligation-qPCR 定量 miR-29 半衰期的方法学合理性提供了综述层面的背书，但不构成竞争风险，因为它未涉及具体器官纤维化模型或 pulse-chase 实验设计。

**方法要点**　综述本身不含原始方法，但其列出的"AGO association、terminal modifications、sequence features"三要素框架可直接借用为 D2-5 实验设计中区分成熟体降解贡献因素的分类依据；核酸酶剪切与 DIS3L2 的提法提示做 ligation-qPCR 时应同时考虑非尿苷化直接核酸酶降解这一竞争性降解路径，需在对照设计中排除。

**效应量**　【摘要未报告数字】读全文时优先补：文中是否列出 TUT4/7-DIS3L2 通路对特定 miRNA（尤其 miR-29 家族或类似胆固醇/代谢相关 miRNA）半衰期或尿苷化比例的已发表定量数据，作为本子方向 pulse-chase 实验的历史基线对照值。

**它暴露/承认的空白**　摘要明确承认两个空白：一是"identifying nucleases responsible for degrading TDMD-liberated miRNAs"未解决，二是"compartment-specific degradation mechanisms...in gut lumen and circulation"未阐明；后者直接落在 D2-5 的肠道类器官纤维化模型上，因为该子方向恰好需要证明肠道区室内 miR-29 的尿苷化降解是否有别于心脏组织的通用机制。

**我不相信的一件事**　该综述将 TDMD 与 TUT4/7-DIS3L2 尿苷化并列为独立降解通路，但未在摘要中说明两者在同一 miRNA（如 miR-29）上是否存在时序先后或机制耦合关系（例如尿苷化是否是 TDMD 释放后核酸酶降解前的必经修饰步骤），这一模糊性若不澄清，会直接影响 D2-5 中把"尿苷化比例升高"单独归因为独立降解信号还是 TDMD 下游产物的解读有效性。

**读全文要核对什么**　【需读全文核对】需确认综述正文中关于 TUT4/7-DIS3L2 通路的具体图示（是否有描绘尿苷化后 DIS3L2 降解成熟 miRNA 的机制模型图）、是否引用了任何 miR-29 或心脏/肠道组织特异性尿苷化的原始文献作为例证，以及"gut lumen degradation"空白部分具体引用了哪些原始研究，以便追溯可借用的方法学或对照数据来源。

**一个可执行动作**　我要在已有的 MYBPC3 心脏纤维化小鼠模型和肠道类器官纤维化模型中，用 actinomycin D pulse-chase 结合 3′端特异性 ligation-qPCR 分别定量心脏与肠道两个器官中 TGF-β 刺激后 0/2/6/12/24 小时 miR-29 尿苷化比例与成熟体丰度变化，预期若肠道类器官中尿苷化驱动的降解速率显著高于心脏组织，则验证该综述提出的"区室特异性降解机制"空白在 miR-29-TUT4/7 轴上成立。

#### PMID 40463248 · HENMT1 restricts endogenous retrovirus activity by methylation of 3'-tRNA fragments.
*bioRxiv : the preprint server for biology 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/40463248/)

**一句话结论**　该文证明3'-tRF（tRNA 3'端来源小RNA）的丰度受 HENMT1 介导的2'-O甲基化保护调控，未被甲基化的3'-tRF则被 TUT4 和 TENT2 进行非模板化尾接（tailing），进而影响其对内源逆转录病毒（ERV）的沉默效率；即TUT4是"3'端修饰→周转"这条通路里的关键降解酶之一，但作用对象是3'-tRF而非miRNA。

**与该子方向的关系**　竞争风险：本文把 TUT4（还多了 TENT2，而非 TUT7）的3'尿苷化/非模板尾接功能，锚定在3'-tRF这一完全不同的小RNA类别（tRNA来源片段而非miRNA），且下游生物学是ERV沉默而非纤维化/miR-29降解——这提示D2-5必须在方法陈述里明确"TUT4/7对miR-29的3'尿苷化"是miRNA特异性的TDMD分支机制，避免被误读为对"TUT4是广谱non-templated tailing酶"这一更大机制的重复验证；若不加区分，审稿人可能质疑该子方向只是把已知的TUT4 tailing机制套到miR-29上，缺乏miRNA/组织特异性证据。

**方法要点**　可直接搬用的方法要点：(1) 用甲基化保护状态（HENMT1存在/缺失）来分层比较同一小RNA在"稳定型"vs"可被tailing降解型"两种状态下的3'端组成，这为D2-5设计"稳态miR-29 3'端尿苷化比例"的对照分组提供思路；(2) 3'端特异性测序/富集策略（用于区分模板化3'端与非模板化尾接3'端）可作为其计划的ligation-qPCR检测尿苷化3'末端比例的方法参照，尤其是如何排除内源模板序列造成的假阳性尾接信号。

**效应量**　摘要未报告数字，读全文时优先补：HENMT1缺失后3'-tRF被TUT4/TENT2 tailing的比例或速率、tailing后3'-tRF半衰期变化的具体数值（小时或倍数），以及这些数值是否可换算成"每小时降解百分比"以便与D2-5计划的0/2/6/12/24小时pulse-chase时间点对齐比较。

**它暴露/承认的空白**　本文承认的空白：3'-tRF的靶点规则仅通过大规模并行报告基因实验（MPRA）在单一高活性ERV（Mus musculus particle type D）体系中确定，未在体内组织或疾病模型中验证tailing对3'-tRF稳态的定量动力学；这条"tailing→周转速率未定量"的空白正落在D2-5子方向上——D2-5恰好想为miR-29建立类似的定量降解动力学工具，但本文没有提供可直接迁移的半衰期测定方案，只提供了修饰状态的静态快照。

**我不相信的一件事**　本文将HENMT1甲基化保护与TUT4/TENT2 tailing降解的因果链，建立在"甲基化缺失即观察到tailing增多"的关联上，但摘要未说明是否直接检测了tailing事件与3'-tRF半衰期变化之间的时间先后关系（即tailing是降解的原因还是降解过程中的伴随修饰），这与D2-5要证明"尿苷化是miR-29降解的驱动因素而非结果"面临同样的因果方向性质疑，若本文也未用pulse-chase类实验解决该因果顺序问题，则其"保护-降解"模型本身也是相关性证据而非直接机制证据。

**读全文要核对什么**　【需读全文核对】需确认：(1) 图中TUT4与TENT2的tailing活性是否分别定量比较，抑或只做了双knockdown/knockout的联合表型（这决定能否把TUT4单独的定量参数搬到miR-29体系）；(2) 是否有实际测定3'-tRF半衰期或turnover rate的pulse-chase或actinomycin D类实验及其具体时间点设置，可与D2-5的0/2/6/12/24h设计对比方法学细节；(3) 3'端测序方法的文库构建及ligation步骤参数，是否可直接复用于miR-29的3'端特异性ligation-qPCR设计。

**一个可执行动作**　我要在已有的MYBPC3心脏纤维化模型和肠道类器官纤维化模型中，用ABE内源沉默突变标签结合actinomycin D pulse-chase设计，仿照本文"HENMT1保护状态分层"的思路，将TGF-β刺激后0/2/6/12/24小时的pri-/pre-/成熟miR-29定量与3'端尿苷化比例（ligation-qPCR）分层比较，预期若尿苷化比例在降解加速的时间窗内先于成熟miR-29丰度下降而上升，则可确认TUT4/7驱动的3'尿苷化是独立于TGF-β/Smad3转录抑制的降解机制。


## D2-6 · 类器官TUT4/7敲除抗纤维化筛选
**层次：** 方法工具　｜　**拥挤程度：** 词对无共现（两两最小共现 0 篇，全交集 0 篇）　｜　**首篇预计：** 9–12 个月

> **假设：** 若在肠类器官中CRISPR敲除TUT4/7可恢复成熟miR-29水平并抑制胶原表达，则该靶点具有阻断纤维化的功能必要性

**科学前提**

[已发表] TUT4/TUT7（ZCCHC11/ZCCHC6）对 pre-let-7 及部分 mRNA 3′端尿苷化并招募 DIS3L2 降解已被 Heo/Kim 等确立；[已发表] miR-29 成熟体在肠、心脏纤维化中抑制 COL1A1/COL3A1 已获充分验证，且其一作 SAA3 肠 Cell Death Discov 2025 与 MYBPC3 心脏 Cell Death Dis 2022 存档组织已直接证实该轴在两个器官中的病理相关性；[待测] TUT4/7 是否在肠上皮/肌纤维母细胞类器官中对 miR-29 前体施加尿苷化以加速其降解，尚无直接功能敲除证据；[已发表] TGF-β/Smad3 在转录层抑制 pri-miR-29 已被证明（PMID 21784902/22095944），故本设计必须同时测 pri/pre 与成熟体以区分转录抑制与降解加速两条通路。

**第一个关键实验**

在他已有的肠类器官体系（来自 SAA3 项目存档或新鲜活检）中，用 CRISPR/Cas9 或 ABE 双敲 TUT4(ZCCHC11)与TUT7(ZCCHC6)（单敲+双敲共3组+WT对照），TGF-β1(10 ng/mL)刺激48–72 h诱导纤维化表型；读出：qPCR分别测pri-miR-29b/成熟miR-29b（TaqMan茎环法），Western/qPCR测COL1A1/COL3A1/ACTA2，类器官形态学与胶原免疫染色定量；每组类器官≥3个独立传代批次、每批≥6个类器官孔，共计约需4–6周完成一轮。

**必须的对照**

必须设：(1) TGF-β刺激±TUT4/7敲除的2×2设计，直接读出pri-miR-29（若敲低TUT4/7后pri-miR-29不变而成熟体回升，则支持降解层而非转录层机制，排除Smad3转录抑制的竞争解释）；(2) Smad3抑制剂(SIS3)阳性对照组以确认转录抑制通路仍存在但与TUT4/7敲除效应可加和而非重叠；(3) DIS3L2敲低/敲除组验证下游降解酶依赖性；(4) sgRNA非靶向对照及单碱基编辑脱靶测序（他已有ABE/BE4经验可直接复用）。

**为什么是他能做**

他在Cell Death Dis 2022（MYBPC3心脏）和Cell Death Discov 2025（SAA3肠）两篇一作论文中已建立并验证了两套器官纤维化模型及配套存档组织，可直接复用而无需重新建模；他熟练掌握CRISPR/ABE/BE4内源位点编辑技术可直接用于TUT4/7双敲及验证性碱基编辑；他唯一自己担任PI的基金正是抗肠纤维化药物筛选，类器官平台与IHC定量胶原沉积的技能已就位，无需额外学习周期即可启动。

**可行性**

已具备：类器官培养、CRISPR/ABE/BE4编辑、IHC/流式定量胶原与纤维化标志物，可立即起步，无需等待新技能；需新学：smallRNA-seq或3′末端测序以确认尿苷化本身（可先用TaqMan/qPCR做初筛，尿苷化直接证据留待与质谱/测序合作者验证，预计3–6个月学习或外包）；起步成本低，主要试剂为sgRNA/ABE载体与TGF-β1，类器官维持成本为主要开支。

**最大风险与放弃条件**

最大风险：TUT4/7双敲后pri-miR-29与成熟miR-29同步不变（即敲低无功能效应），或成熟miR-29回升但COL1A1/COL3A1表达无显著下降（半衰期/降解层改变但表型不改变）——此为放弃条件，出现则判定TUT4/7在肠类器官中对miR-29无功能必要性，退回D2主线其他子方向（如先证实尿苷化本身存在但走其他下游机制，或转向miR-29在心脏MYBPC3模型中的验证）。另一放弃条件：若SIS3处理已完全消除TGF-β对成熟miR-29的抑制效应（即效应全部落在转录层），说明TUT4/7降解层贡献可忽略，同样应停止本子方向并回到方法学层面重新设计能分离两层贡献的实验。

**目标期刊与基金**

Journal of Clinical Investigation 或 Gut（方法工具类，功能验证导向）；适配基金机制：NIH R21（高风险探索性机制，验证CRISPR类器官平台可行性）或 Crohn's & Colitis Foundation 的 Senior Research Award（贴合他已有的抗肠纤维化药筛PI经历）。

**首篇预计**

9–12 个月

**做成之后的下一步**

若在肠类器官中验证成立，下一步延伸到他自己的MYBPC3心脏纤维化存档模型中做跨器官验证，并推进到体内AAV介导TUT4/7敲低的纤维化动物模型以支持D2主线旗舰假设。

**拥挤程度核查（可复算）**

检索式：`(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab]) AND miR-29[tiab] AND (organoid[tiab] OR fibrosis[tiab])`

| 层级 | 检索式 | 全库命中 |
|---|---|---|
| 单词 | `(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab])` | 136 |
| 单词 | `miR-29[tiab]` | 1015 |
| 单词 | `(organoid[tiab] OR fibrosis[tiab])` | 309180 |
| 两两 | `(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab]) AND miR-29[tiab]` | 0 |
| 两两 | `(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab]) AND (organoid[tiab] OR fibrosis[tiab])` | 1 |
| 两两 | `miR-29[tiab] AND (organoid[tiab] OR fibrosis[tiab])` | 212 |
| **全交集** | `(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab]) AND miR-29[tiab] AND (organoid[tiab] OR fibrosis[tiab])` | **0** |

**配套文献与笔记（4 篇）**

#### PMID 40238115 · TUT7-Mediated Uridine Degradation of MCPIP1 in the Pterygium to Regulate TRAF6-Mediated Autophagy.
*Investigative ophthalmology & visual science 2025* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/40238115/)

**一句话结论**　该研究发现在翼状胬肉纤维化模型中，TUT7对MCPIP1 mRNA进行尿苷化并降低其稳定性，从而削弱MCPIP1对TRAF6-BECN1自噬通路的促进作用，间接放松了对纤维化的抑制；但此处TUT7作用靶标是MCPIP1 mRNA本身（一种非编码调控蛋白编码转录本），而非miR-29前体或成熟体，机制层面与miRNA降解机器完全不同轨道。

**与该子方向的关系**　竞争风险：本文用TUT7尿苷化机制解释纤维化，且靶标同为mRNA稳定性调控，容易被误读为支持"TUT7-TDMD-miR-29-纤维化"假说的旁证，但实际是TUT7对mRNA（非miRNA）末端尿苷化影响其降解，这是完全不同的分子事件（mRNA 3'UTR uridylation vs miRNA 3' TDMD），需在文中明确区分声明，避免与方向2的核心假设（TUT4/7通过miR-29成熟体尿苷化促降解）混淆。

**方法要点**　可搬用的方法：in vitro transcription及uridylylation assay验证TUT7对特定RNA的3'尿苷化活性，可直接借鉴用于体外验证TUT7/TUT4对pre-miR-29b或成熟miR-29b的尿苷化反应；此外Co-IP/ubiquitination assay研究TRAF6-BECN1复合体的方法框架可为其类器官中COL1A1/ACTA2通路的机制验证提供对照思路。

**效应量**　摘要未报告数字。读全文时优先补：TUT7敲低/过表达后MCPIP1 mRNA半衰期变化的具体数值（如qPCR actinomycin D chase实验的半衰期时间点）、HPF细胞迁移/胶原表达的倍数变化及统计学p值。

**它暴露/承认的空白**　该文承认MCPIP1在翼状胬肉中的精确作用此前"remains elusive"，且未探讨TUT7尿苷化MCPIP1 mRNA与miRNA降解机器（如ZSWIM8介导的TDMD）之间是否存在交叉调控，这一空白恰好落在方向2（TUT4/7-miR-29-纤维化）：即TUT7在纤维化组织中是否同时靶向miR-29成熟体与其他mRNA尚未被同一体系验证。

**我不相信的一件事**　本文将TUT7尿苷化导致MCPIP1 mRNA降解的机制归因为"TUT7削弱MCPIP1功能"的单一线性通路，但未排除TUT7敲低是否同时通过非MCPIP1依赖途径（如直接影响其他自噬或TGF-β下游因子的mRNA稳定性）间接改变HPF纤维化表型，因此该因果链的特异性证据不足，需要TUT7敲低+MCPIP1同时敲低的双重回复实验才能证实是唯一通路。

**读全文要核对什么**　【需读全文核对】需确认：(1)体外uridylylation实验的具体图（Figure标注哪一张显示TUT7直接结合并尿苷化MCPIP1 mRNA 3'端，是否有RNA immunoprecipitation数据）；(2)TRAF6-BECN1 ubiquitination assay的阴性对照（是否用TUT7催化死突变体或MCPIP1 RNA结合域突变体作为特异性对照）；(3)全文参考文献中是否引用了TUT4/7在miRNA 3' TDMD领域的经典文献（如McJunkin/Norbury组工作），以判断作者是否意识到两种尿苷化机制的区别。

**一个可执行动作**　我要在肠类器官TUT4/7双敲体系中，借鉴本文的in vitro uridylylation assay方法，检测TUT4/7敲除后是否同时改变MCPIP1样自噬调控mRNA的稳定性（作为非miR-29依赖的对照通路），以此排除方向2中TUT4/7敲除抑制纤维化的效应是否混杂了mRNA层面的直接尿苷化调控，从而更严格地将miR-29成熟体特异性效应从mRNA稳定性效应中分离出来。

#### PMID 42756463 · Early diagnosis of radiation-induced renal injury: from lagging indicators to multimodal, pre-fibrotic detection.
*Frontiers in cell and developmental biology 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42756463/)

**一句话结论**　这是一篇综述，主张放射性肾损伤（RRI）存在从照射到临床功能失代偿之间的长潜伏期，传统血肌酐/BUN 检测窗口太晚，应整合 KIM-1/NGAL、cystatin C、γ-H2AX、miR-21/miR-29、尿外泌体及多参数MRI/MAG3显像做早期亚临床检测，但作者自己承认这些指标在人类RRI中的特异动力学、阈值、敏感性/特异性证据仍不足，仅提出一个待验证的多模态研究框架。

**与该子方向的关系**　竞争风险：它把 miR-29 列为"基因组学/纤维化信号转变"标志物用于放射性肾损伤的早期诊断分层，这与方向2里"TUT4/7尿苷化降解miR-29→促纤维化"的机制假说共享同一个miRNA，但完全是不同疾病模型（放射损伤肾 vs TGF-β诱导肠/心纤维化）、不同应用层（诊断biomarker vs 机制干预靶点），差异声明：本文不涉及TUT4/7或成熟体/pri-miRNA的降解机制拆分，只是把miR-29的血/尿水平当读出，若不加区分容易被误引为"miR-29是纤维化biomarker"的支持文献，实际不能替代D2-6的功能必要性实验。

**方法要点**　摘要提及非对比多参数MRI（DWI/IVIM、ASL、BOLD、T1 mapping）及Tc-99m MAG3肾图作为功能影像读出，这些是肾脏纤维化影像学方法，可作为D2-6类器官体系之外未来若推进到大动物放射/纤维化模型时的无创读出候选，但摘要未给出与qPCR/组织学的定量对照关系，不能直接搬到类器官平台（类器官无法做MRI/MAG3显像）。

**效应量**　【摘要未报告数字】读全文时优先补：KIM-1/NGAL/cystatin C/miR-21/miR-29 在放射性肾损伤模型中的具体倍数变化、检测时间窗（照射后第几天/周）、以及MRI各序列（T1 mapping、ADC值等）与病理纤维化评分的相关系数（如有r值或AUC）。

**它暴露/承认的空白**　摘要末尾明确承认"这些候选方法在人体RRI中的证据有限，RRI特异的动力学、阈值、敏感性/特异性尚未充分建立"，这正是一个空白，但它落在放射肾损伤诊断学子方向，与D2-6（类器官TUT4/7敲除的功能必要性验证）不是同一空白——D2-6的空白是"TUT4/7敲低能否恢复成熟miR-29并阻断胶原沉积的因果证据"，本文完全未触及基因编辑或TUT4/7。

**我不相信的一件事**　本文把γ-H2AX foci（DNA损伤标志）和miR-29（纤维化信号标志）并列为"genomic indicators"放在同一类别下，但两者反映的生物学阶段（急性DNA损伤 vs 慢性纤维化转变）机制上并不连续，摘要没有说明如何用这两个时间尺度差异巨大的标志物构建统一的"早期检测窗口"，这个分类逻辑本身值得质疑而非默认接受。

**读全文要核对什么**　【需读全文核对】需确认：①miR-29在该综述引用的原始研究中测的是成熟体还是pri/pre-miR-29（本文摘要完全没区分，直接影响是否与TGF-β/Smad3转录抑制机制混淆）；②这些biomarker数据来自人体还是"preclinical radiation models"（摘要明确说部分证据只来自其他肾病或放射前临床模型，需查具体是哪些模型、物种、剂量）；③多模态框架图（若有）里各biomarker的采样时间点设计，是否可套用到类器官TGF-β刺激48–72h的时间窗做类比设计。

**一个可执行动作**　我要在肠类器官TGF-β1(10 ng/mL)刺激体系里，除了qPCR分别测pri-miR-29b与成熟miR-29b（TaqMan茎环法）区分转录/降解层，同时补测本文提到的KIM-1/NGAL/cystatin C类损伤标志物的类器官上清液ELISA或qPCR读出，作为TUT4/7双敲组的辅助分子表型指标，预期TUT4/7-KO组在成熟miR-29b升高、胶原表达下降的同时，损伤标志物也同步下降，从而排除单纯TGF-β转录抑制混杂并强化"降解阻断→功能改善"的因果链。

#### PMID 42749255 · MicroRNAs in renal fibrosis: Unraveling mechanisms and therapeutic potential.
*The international journal of biochemistry & cell biology 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42749255/)

**一句话结论**　这是一篇综述，梳理了肾纤维化/CKD中促纤维化miRNA（miR-21-5p、miR-433-3p、miR-324-3p、miR-214-3p）与抗纤维化miRNA（miR-29家族、let-7家族）的功能分野，并指出miR-192-5p、miR-214-3p存在细胞类型/分期依赖的双向作用，同时总结antagomiR、mimic及纳米/EV递送等治疗策略与临床转化瓶颈。

**与该子方向的关系**　支持前提：该综述确认miR-29家族在肾纤维化中是稳定的抗纤维化因子这一大方向共识，为D2-6"敲低TUT4/7升高成熟miR-29可抑制纤维化"的假设提供跨器官（肾vs肠）的外部一致性佐证，但它本身不涉及TUT4/7或3'尿苷化机制，因此只是前提层面的支持而非直接证据。

**方法要点**　摘要提及的检测手段是尿液/循环miRNA作为biomarker及antagomiR/mimic/纳米颗粒-EV递送系统，属于治疗与诊断层面的方法，与D2-6类器官CRISPR敲除+TaqMan茎环法qPCR分pri/成熟体读出的实验设计不重叠，无法直接搬用；唯一可参考的是其列出的miRNA panel（miR-21-5p、miR-192-5p、miR-29家族、miR-126、miR-210）可作为未来扩展类器官读出面板的候选。

**效应量**　【摘要未报告数字】读全文时优先补：miR-29家族在肾纤维化模型中成熟体下调的具体倍数或百分比、COL1A1/ACTA2表达变化的定量数据，以及miR-29与TUT4/7或其他降解酶关联的直接证据（若有）。

**它暴露/承认的空白**　摘要明确承认"molecular stability, renal-specific delivery, off-target effects, and clinical translation"仍是持续挑战，即miRNA稳态调控机制（包括降解速率控制）本身仍未被阐明——这正落在D2-6子方向要用TUT4/7敲除来回答的"是否降解层面调控可解除胶原抑制"的空白上。

**我不相信的一件事**　该综述将miR-29家族标注为"predominantly antifibrotic"，但未区分这种下调是转录层（如TGF-β/Smad3抑制pri-miR-29转录，已知竞争解释）还是成熟体降解层（TUT4/7介导的3'尿苷化/TDMD），若全文中引用的原始文献多数只测了成熟miR-29而未同时测pri-miR-29，则该综述的"miR-29降低驱动纤维化"结论无法排除单纯转录抑制的竞争解释，这正是D2-6实验设计要通过pri/成熟体对比来解决的漏洞。

**读全文要核对什么**　【需读全文核对】需确认全文中引用的原始研究是否报告过miR-29成熟体与pri-miR-29的分离测定（区分转录vs降解），是否有任何文献提及TUT4/7(ZCCHC11/ZCCHC6)或TDMD机制参与miR-29降解，以及miR-192-5p"context-dependent"双向作用的具体细胞类型/信号通路对照实验设计，可作为D2-6类器官实验的对照参数来源。

**一个可执行动作**　我要在已有的肠类器官SAA3存档组织体系中，用CRISPR/Cas9双敲TUT4(ZCCHC11)/TUT7(ZCCHC6)（单敲×2+双敲+WT共4组），TGF-β1(10 ng/mL)刺激48-72h后用TaqMan茎环法qPCR分别测pri-miR-29b与成熟miR-29b，预期若TUT4/7敲除后仅成熟体升高而pri-miR-29b不变，则可从降解层面（而非转录层面）证明TUT4/7敲除通过恢复成熟miR-29抑制COL1A1/ACTA2表达，从而与该综述引用的转录抑制类文献形成机制层面的区分证据。

#### PMID 42645200 · miR-29b as an Anti-Fibrotic Therapeutic: Mechanisms, Disease Biology and Translational Opportunities.
*Cells 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42645200/)

**一句话结论**　这是一篇综述，系统梳理 miR-29b 家族在纤维化中经 TGF-β/Smad 转录抑制及炎症通路调控的证据，并区分了对胶原合成/加工/交联的直接canonical靶点与预测/间接靶点，同时评估了递送与安全性等转化障碍。它明确将miR-29b定位为"网络层面"抗纤维化候选而非单一开关。

**与该子方向的关系**　支持前提：该综述系统性确认miR-29b是抗纤维化miRNA家族的核心成员且在多器官纤维化模型（肺肝肾心皮肤眼）中证据一致，为TUT4/7-miR-29-纤维化假设提供跨器官背景支持；但同时它把TGF-β/Smad转录抑制列为miR-29b调控的主要已证机制，这构成对本子方向"降解层面调控"假设的竞争性解释，必须在实验设计里用pri-miR-29b/成熟体比值来切割二者。

**方法要点**　摘要提到综述采用"区分直接canonical靶点 vs 实验支持/预测/间接靶点"的证据分级框架，这一分级逻辑可直接搬用到本子方向对COL1A1/COL3A1/ACTA2下游靶点验证的证据强度标注，避免把间接效应误判为TUT4/7-miR-29直接轴的证明。摘要未给出具体qPCR/测序方法学细节，故无更具体方法可搬。

**效应量**　【摘要未报告数字】读全文时优先补：miR-29b敲低/过表达对COL1A1/COL3A1蛋白或mRNA变化的具体倍数、TGF-β刺激后miR-29b成熟体下调幅度的量化范围、以及agomir/mimic递送在动物模型中降低胶原沉积的百分比数据，这些是本子方向设计对照值和判断"功能必要性"阈值的关键参照。

**它暴露/承认的空白**　摘要明确承认"翻译成功需要细胞和疾病特异性靶点验证"，即当前证据多为通路层面关联而非特定细胞类型（如肠上皮/肠类器官）中直接因果验证，这一空白恰好落在本子方向：目前尚无TUT4/7敲除在肠类器官纤维化模型中对miR-29b成熟体恢复及胶原抑制的直接功能验证数据。

**我不相信的一件事**　该综述将miR-29b下调主要归因于TGF-β/Smad转录抑制及其他转录/炎症输入，但并未讨论3′尿苷化/TUT4-7介导的成熟体降解是否在任一所评述的器官纤维化模型中被独立证实为非冗余机制；若TGF-β转录抑制已能完全解释成熟miR-29b下降，则TUT4/7敲除可能无法额外恢复成熟体水平，这是对本子方向核心假设"功能必要性"的直接质疑，需要在TGF-β刺激下同时检测pri-miR-29b是否也受TUT4/7敲除影响来排除混杂。

**读全文要核对什么**　【需读全文核对】读全文时需确认：(1) 综述中列出的miR-29b直接canonical靶点清单是否包含肠道特异性胶原相关基因；(2) 是否有任何原始研究报告过TUT4/TUT7或其尿苷化活性对miR-29家族稳定性的调控证据（即使在非肠道组织中）；(3) 综述所引用的pri-miR-29b vs 成熟体分开测定的具体实验设计范例，可否直接套用其TaqMan茎环法或探针设计；(4) 递送/安全性章节中关于off-target repression的评估标准，是否可用于设计TUT4/7双敲的脱靶对照。

**一个可执行动作**　我要在已有的肠类器官体系（SAA3项目存档或新鲜活检来源）中，用CRISPR/Cas9双敲TUT4(ZCCHC11)/TUT7(ZCCHC6)（单敲+双敲共3组+WT对照），TGF-β1(10 ng/mL)刺激48–72 h后，分别用TaqMan茎环法定量pri-miR-29b与成熟miR-29b，预期若TUT4/7敲除组成熟体/pri比值显著高于WT组而pri-miR-29b不变，则可将降解层面调控与该综述强调的转录抑制机制区分开，从而验证TUT4/7在肠纤维化中的功能必要性。


## D2-7 · TUT4/7小分子抑制剂转化治疗
**层次：** 转化治疗　｜　**拥挤程度：** 极少（≤10）（两两最小共现 1 篇，全交集 0 篇）　｜　**首篇预计：** 14–18 个月

> **假设：** 若TUT4/7小分子抑制剂在体内可提升成熟miR-29并改善肠道纤维化指标，则该轴可作为抗纤维化药物筛选的新靶点

**科学前提**

[已发表] TUT4/7 (ZCCHC11/ZCCHC6) 尿苷化 pre-let-7 与多种 mRNA 已被 Heo/Kim 实验室及后续工作确立，DIS3L2 特异性识别并降解 3′ 尿苷化 RNA 已被结构与功能研究证明。[已发表] miR-29 在心脏、肺、肾、肠纤维化中抗胶原沉积的作用证据充分，其靶基因包括 COL1A1/COL3A1 等胶原基因。[已发表] TGF-β/Smad3 在转录层面直接抑制 miR-29 primary transcript 的合成已被证明（PMID 21784902/22095944），因此任何"降解层面"的干预效果都必须以 pri/pre-miR-29 不变而成熟体升高作为特异性证据。[待测] TUT4/7 小分子抑制剂（如已报道的 TUT4/7 催化域抑制化合物）体内给药能否在 pri/pre-miR-29 无明显变化的前提下选择性提升成熟 miR-29 并改善肠纤维化指标，目前尚无数据。

**第一个关键实验**

在他已有的 SAA3 肠纤维化小鼠模型（Cell Death Discov 2025 一作模型）中，分组给予 TUT4/7 小分子抑制剂（腹腔注射，剂量参照已发表体外/体内活性文献设定 2–3 个剂量梯度）vs. 溶剂对照，共 4 组（对照/低剂量/高剂量/阳性药抗纤维化对照如吡非尼酮），每组 n=8–10，处理 2–4 周后取肠组织，同步做 TaqMan qPCR 测成熟 miR-29a/b/c 及 pri/pre-miR-29，胶原羟基赖氨酸/Masson 染色定量纤维化程度，IHC 测 COL1A1/COL3A1 蛋白。

**必须的对照**

必须同时测 pri-miR-29 与 pre-miR-29（qPCR）以排除 TGF-β/Smad3 转录抑制被间接解除的可能——若抑制剂使 pri/pre 也同步升高，则效果来自转录层而非降解层，需重新归因。需要 vehicle 阴性对照、阳性抗纤维化药物对照（吡非尼酮或已知抗 TGF-β 药物）区分通路特异性、TUT4/7 conditional knockout 或 siRNA 敲低组做遗传学验证以排除小分子脱靶效应、以及给药后 TUT4/7 催化活性直接生化检测（体外尿苷化反应）确认目标接合有效。

**为什么是他能做**

他是 SAA3 肠纤维化模型（Cell Death Discov 2025 一作）与 MYBPC3 心脏纤维化模型（Cell Death Dis 2022 一作）的建立者与唯一持有者，拥有存档组织和完整基线数据，且他目前唯一以 PI 身份主持的基金正是"抗肠纤维化药物筛选"，天然契合转化定位；他的类器官平台可作为体内实验前的快速药效预筛体系，IHC/流式技能可直接用于胶原与免疫细胞浸润读出。

**可行性**

已具备：动物模型、给药与取材操作、IHC、qPCR（成熟 miRNA 检测他实验室常规可做）。需新学：pri/pre-miRNA 特异性 qPCR 引物设计与验证（约 1 个月，非难点）；TUT4/7 小分子抑制剂需通过合作或采购获取（若无现成商业化合物，需与化学生物学实验室合作定制或改造已发表抑制剂结构，增加 2–3 个月延迟）。半衰期测定（如需验证降解机制而非仅表型）需外部合作或短期学习 actinomycin D chase 实验，约 1–2 个月。

**最大风险与放弃条件**

最大风险：TUT4/7 小分子抑制剂特异性不足导致 pri/pre-miR-29 与成熟体同步升高（说明作用于转录层而非降解层），或抑制剂给药后成熟 miR-29 无统计学变化（qPCR ΔΔCt 无差异，p>0.05，n=8–10 功效充分）且纤维化指标（Masson 染色阳性面积、COL1A1 IHC 定量）无改善。若出现上述任一情况，明确放弃 D2-7 转化子方向，退回 D2 主线的机制层验证（体外尿苷化生化实验，D2 更基础的子方向）重新确认靶点后再考虑药物开发。

**目标期刊与基金**

Journal of Hepatology / Gut（若肠道数据为主）或 Cell Reports Medicine（转化定位），资助机制适配 NIH R01（转化治疗）或基金会型抗纤维化专项（如 Crohn's & Colitis Foundation）。

**首篇预计**

14–18 个月

**做成之后的下一步**

若在肠道模型中验证有效，下一步扩展到他已有的 MYBPC3 心脏纤维化模型做跨器官普适性验证，并推进类器官高通量药筛平台建立结构-活性关系（SAR）以优化抑制剂选择性。

**拥挤程度核查（可复算）**

检索式：`(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab]) AND (inhibitor[tiab] OR "small molecule"[tiab]) AND (fibrosis[tiab] OR miR-29[tiab])`

| 层级 | 检索式 | 全库命中 |
|---|---|---|
| 单词 | `(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab])` | 136 |
| 单词 | `(inhibitor[tiab] OR "small molecule"[tiab])` | 916291 |
| 单词 | `(fibrosis[tiab] OR miR-29[tiab])` | 295706 |
| 两两 | `(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab]) AND (inhibitor[tiab] OR "small molecule"[tiab])` | 6 |
| 两两 | `(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab]) AND (fibrosis[tiab] OR miR-29[tiab])` | 1 |
| 两两 | `(inhibitor[tiab] OR "small molecule"[tiab]) AND (fibrosis[tiab] OR miR-29[tiab])` | 19607 |
| **全交集** | `(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab]) AND (inhibitor[tiab] OR "small molecule"[tiab]) AND (fibrosis[tiab] OR miR-29[tiab])` | **0** |

**配套文献与笔记（4 篇）**

#### PMID 40238115 · TUT7-Mediated Uridine Degradation of MCPIP1 in the Pterygium to Regulate TRAF6-Mediated Autophagy.
*Investigative ophthalmology & visual science 2025* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/40238115/)

**一句话结论**　该文报道在翼状胬肉成纤维细胞（HPF）中，TUT7 通过尿苷化降低 MCPIP1 mRNA 稳定性，减弱 MCPIP1 对 TRAF6-BECN1 通路的正向调控，从而削弱其对自噬的促进作用及对纤维化/迁移增殖的抑制作用。即 TUT7 在此模型中的靶标是 MCPIP1 mRNA 本身，而非 miRNA。

**与该子方向的关系**　竞争风险：本文虽同属"TUT7 尿苷化→促纤维化"的因果链条，但机制层面与 D2-7 假设完全不同轨——它证明 TUT7 可直接尿苷化并去稳定 mRNA（MCPIP1）而非成熟 miRNA，说明 TUT7 在纤维化组织中存在"非 miR-29 依赖"的促纤维化旁路，若他在 SAA3 肠模型中只检测 miR-29 通路且看到 TUT4/7 抑制剂起效，需先排除是否经由类似的 mRNA 尿苷化机制而非 miR-29 稳态改变，否则会把两条机制混为一谈。

**方法要点**　可直接搬用的方法：in vitro transcription 与 uridylylation assay 用于体外验证 TUT7 对特定 RNA 3′端尿苷化活性，此法可平行用于验证 TUT4/7 对 pre-miR-29 或其他底物的尿苷化；此外 Co-IP/泛素化实验设计思路（验证下游蛋白复合物组装及稳定性）可用于后续若要检测 TUT4/7 抑制剂是否影响其他下游蛋白稳定性时的对照设计。

**效应量**　摘要未报告数字。读全文时优先补：TUT7 敲低/过表达后 MCPIP1 mRNA 半衰期的具体数值变化、体内翼状胬肉模型中纤维化指标（如胶原沉积面积、HPF 迁移距离）的定量数据及统计显著性数值。

**它暴露/承认的空白**　该文明确承认"MCPIP1 在翼状胬肉中的精确作用此前不明"，属于空白但落在了 mRNA 尿苷化-自噬-纤维化轴，而非 D2-7 关注的 miR-29 成熟体降解-胶原抑制解除轴；提示 TUT4/7 在不同纤维化组织中可能存在底物特异性差异，这一点在原摘要中未被讨论，是本子方向需要补的空白。

**我不相信的一件事**　本文将 TUT7 对 MCPIP1 的"负调控"完全归因于 mRNA 稳定性下降，但摘要未说明是否检测了 TUT7 敲低后 MCPIP1 蛋白水平的恢复幅度是否与 mRNA 稳定性变化定量匹配，也未排除 TUT7 是否通过其他非尿苷化依赖的方式（如竞争性结合 RNA 结合蛋白）间接影响 MCPIP1；此外该研究为体外眼科成纤维细胞模型，其结论能否外推到肠道/心脏组织纤维化的 TUT4/7-miRNA 轴存疑。

**读全文要核对什么**　【需读全文核对】需确认：(1) in vitro uridylylation assay 中 TUT7 加尿苷位点是否特异定位于 MCPIP1 mRNA 3′UTR 某序列基序，是否与 miR-29 前体的尿苷化位点有序列相似性；(2) 体内翼状胬肉模型的动物种属、给药方式及剂量设计，是否有可比的 TUT4/7 小分子抑制剂给药方案可供 D2-7 剂量梯度参考；(3) Co-IP 及泛素化实验的阴性对照（如 TRAF6 catalytically dead mutant）是否设置齐全，以判断该通路验证严谨度是否可作为方法学参照。

**一个可执行动作**　我要在已有的 SAA3 肠纤维化小鼠模型体系中，用 in vitro transcription/uridylylation assay（借鉴本文方法）平行检测 TUT4/7 抑制剂处理后是否存在对非 miR-29 靶标（如已知促纤维化 mRNA）的旁路尿苷化效应，预期若该旁路效应不显著，则可排除竞争性解释，支持"TUT4/7 抑制剂经由 miR-29 成熟体轴而非 mRNA 稳定性轴改善肠纤维化"这一 D2-7 核心假设。

#### PMID 42585304 · RNA terminal uridylyl transferases are druggable vulnerabilities in AML but are dispensable for normal hematopoiesis.
*Science advances 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42585304/)

**一句话结论**　该文用遗传敲除和一款preclinical小分子抑制剂证明TUT4/7在AML中是可成药靶点：抑制TUT4/7抑制白血病生长、诱发凋亡、延长荷瘤小鼠生存，机制上通过抑制mevalonate通路基因表达压制胆固醇合成；同时Tut4/7缺失虽引发全造血系统炎症活化，但不损害HSPC功能且不缩短寿命，提示存在治疗窗。

**与该子方向的关系**　竞争风险：该文把TUT4/7-小分子抑制剂这条"可成药+体内验证"的路径最早、最系统地跑通了，只是应用场景是AML而非纤维化——一旦审稿人或同行看到TUT4/7抑制剂已有preclinical化合物并证明体内安全性和药效，会直接联想到"抄作业式"迁移到纤维化模型，这会冲击D2-7"新靶点/新颖性"的立论，必须在写作中把差异声明明确为：AML关注的是mevalonate/胆固醇通路和造血系统安全性，而D2-7聚焦的是miR-29 3'尿苷化-成熟体降解-胶原表达轴，机制通路完全不同，且器官（肠道纤维化）与终点（Masson/COL1A1定量）不同。

**方法要点**　可直接搬用的方法要点：①同一款preclinical TUT4/7小分子抑制剂（腹腔或体外给药方案可作为剂量参照来源）；②Tut4/7条件性/系统性遗传敲除小鼠模型的构建逻辑，可与他的CRISPR/ABE内源编辑技能对接做TUT4/7位点特异性失活对照；③以"遗传敲除+药理抑制"双线验证靶点的实验设计范式，可直接套用到SAA3肠纤维化模型的分组设计里。

**效应量**　摘要给出的定性效应包括：抑制AML生长、诱导凋亡、改善荷瘤小鼠生存率、与venetoclax协同增效、抑制mevalonate通路基因表达；但摘要未报告具体数字（如生存期延长百分比、IC50、协同指数CI值、mevalonate通路基因下调倍数）。读全文时优先补：抑制剂的具体给药剂量与途径、体内药效学数据（肿瘤负荷/生存曲线具体数值）、以及Tut4/7缺失小鼠的炎症活化程度是否有可量化指标，这些可作为D2-7设定TUT4/7抑制剂在体内剂量梯度和评估安全性窗口的直接参照值。

**它暴露/承认的空白**　该文承认的空白：Tut4/7缺失引发的"全造血系统炎症活化"机制未在摘要中说明其对下游器官（如肠道）纤维化通路是否有交叉影响，这正落在D2-7子方向——若TUT4/7抑制剂在体内被证明会激活炎症反应，那么在肠纤维化模型中评估COL1A1/COL3A1时必须区分"抑制剂直接降低胶原合成"还是"继发于炎症活化的组织重塑假象"。

**我不相信的一件事**　该文的核心质疑：摘要仅报告TUT4/7抑制通过mevalonate/胆固醇通路起效，但未说明这一效应是否经由miR-29（或其他TUT4/7底物miRNA）尿苷化-降解介导，还是TUT4/7对其他RNA底物（如mRNA尾巴修饰）的直接作用；若mevalonate通路的调控主要不经过miR-29轴，则该文的"TUT4/7-成熟miRNA-下游通路"因果链证据强度不足，D2-7在解读肠纤维化数据时也必须做同样的miRNA介导性验证，不能想象TUT4/7抑制剂的抗纤维化效果必然经由miR-29。

**读全文要核对什么**　【需读全文核对】需确认：①该preclinical TUT4/7抑制剂的化学结构、选择性数据（对TUT4 vs TUT7的选择性、脱靶谱）及其在体内实验中的具体给药剂量/频次/途径，这是D2-7设定小鼠腹腔注射剂量梯度的关键参照；②Tut4/7遗传敲除小鼠模型中HSPC功能评估用的具体对照组设计（如是否有条件性诱导时间点对照、年龄匹配对照）；③mevalonate通路下调是否有直接测量成熟miR-29或其他候选miRNA水平的图表，若有，其qPCR引物/探针体系可与他计划的TaqMan miR-29a/b/c方案比对。

**一个可执行动作**　我要在SAA3肠纤维化小鼠模型体系中，采用与该文相同的preclinical TUT4/7小分子抑制剂（腹腔注射，剂量梯度参照该文体内活性数据设定2-3档），设四组（溶剂对照/低剂量/高剂量/吡非尼酮阳性对照），处理2-4周后同步做TaqMan qPCR测成熟miR-29a/b/c及pri/pre-miR-29以区分转录抑制与降解抑制，并用Masson染色/羟基赖氨酸定量联合IHC测COL1A1/COL3A1，预期若TUT4/7抑制主要通过恢复成熟miR-29（而非pri/pre-miR-29）来解除胶原抑制，则可确证该轴是独立于Smad3转录抑制的补充性抗纤维化机制。

#### PMID 41174475 · MicroRNA strand ratio disarray promotes temozolomide resistance in glioblastoma.
*Cellular & molecular biology letters 2025* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/41174475/)

**一句话结论**　该文报道TUT4通过尿苷化pre-miR-92b改变其链选择，使3p链相对5p链升高，进而经HDAC9/FOXP3双靶点调控COL7A1转录、促进胶原沉积与GBM对TMZ耐药；小分子TUT4抑制剂ATG-H可逆转该链选择紊乱并恢复化疗敏感性。

**与该子方向的关系**　竞争风险：该文证明TUT4-uridylation的下游效应可以是"改变成熟链比例(3p/5p选择)"而非单纯"降解总量"，若在miR-29/SAA3肠纤维化体系中检测TUT4/7抑制剂只测总成熟miR-29a/b/c水平，可能掩盖类似的链选择漂移，与D2-7"抑制剂提升成熟miR-29改善纤维化"的单一降解假设形成竞争解释，需要额外补充miR-29-5p/3p比例检测才能排除。

**方法要点**　可直接搬用的方法：(1) 用同一个ATG-H (aurothioglucose hydrate) 作为TUT4抑制剂工具化合物，可平行用于SAA3肠纤维化模型的小分子干预臂，作为可用的对照/参照剂量来源；(2) 其"链选择紊乱"分析框架（分别测-3p和-5p比例，而非仅测总成熟体）可直接套用到miR-29a/b/c的TaqMan qPCR设计中，增加-5p链检测。

**效应量**　摘要未报告数字。读全文时优先补：miR-92b-3p/-5p比例的具体倍数变化、ATG-H处理后该比例的恢复幅度、以及ATG-H的给药剂量与体内/体外有效浓度（这是D2-7剂量梯度设计可直接参照的关键数值）。

**它暴露/承认的空白**　该文明确承认"miRNA链选择紊乱驱动TMZ耐药的机制此前未被探索"，属于机制空白；落在D2-7子方向上的具体空白是：TUT4尿苷化对miR-29链选择（而非仅总量降解）的影响在纤维化模型中完全未检验，是D2-7假设未覆盖的盲区。

**我不相信的一件事**　该文将TUT4对pre-miR-92b尿苷化等同于"促进3p链选择"，但摘要未说明尿苷化是否也同步影响了pre-miR-92b的总体加工效率/降解速率（即pri/pre与成熟体绝对量的变化），若TUT4抑制同时降低了总成熟miR-92b丰度，则"链选择偏好改变"这一因果解释可能被"总量下降+检测比例假象"混淆，摘要没有提供pri/pre-miR-92b的定量数据来排除这一点。

**读全文要核对什么**　【需读全文核对】需确认：(1) 图中是否分别给出了pri-miR-92b、pre-miR-92b、miR-92b-3p、miR-92b-5p四个层次的绝对定量，还是只有3p/5p比例；(2) ATG-H处理组是否设置了TUT4 knockdown/knockout的遗传学对照以排除脱靶效应；(3) COL7A1启动子H3K27ac ChIP的具体对照（IgG/输入/scramble miRNA对照）；(4) ATG-H的体内给药剂量、途径、疗程，用于比对D2-7的腹腔注射剂量梯度设定是否合理。

**一个可执行动作**　我要在已有的SAA3肠纤维化小鼠模型中，把TaqMan qPCR方案从只测成熟miR-29a/b/c扩展为同时测miR-29-3p/-5p比例及pri/pre-miR-29绝对量，预期若TUT4/7抑制剂ATG-H类似物只改变链选择比例而不提升总成熟miR-29丰度，则D2-7的"提升成熟miR-29改善纤维化"假设需修正为"矫正链选择偏差"这一更精细的机制表述。

#### PMID 39235218 · Targeting the Synthetic Lethal Relationship between FOCAD and TUT7 Represents a Potential Therapeutic Opportunity for TUT4/7 Small-Molecule Inhibitors in Cancer.
*Molecular cancer therapeutics 2024* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/39235218/)

**一句话结论**　该文报道了首个强效选择性 TUT4/7 双靶点小分子抑制剂，在 FOCAD 缺失的癌细胞中显著降低尿苷化并产生体内外抗增殖活性，其作用机制是通过合成致死打断 TUT7-DIS3L2 的"异常RNA清除"救援通路，而非直接针对 miR-29 或纤维化通路。

**与该子方向的关系**　提供方法：本文首次公开了可用于体内验证的 TUT4/7 小分子抑制剂化学工具及其体内给药/活性数据，可直接为 D2-7 的腹腔注射剂量梯度设计提供参照；但其效应模型（FOCAD-SKI complex-DIS3L2 通路）与"TUT4/7→miR-29 尿苷化→降解→纤维化"假设是两条不同的下游机制，需要警惕把这批抑制剂在肠组织中的表型简单归因于 miR-29 轴（竞争风险：若抑制剂在无 FOCAD 缺失背景的肠道细胞中也产生非miRNA相关的毒性/抗增殖效应，会混淆 D2-7 的"改善纤维化"读出）。

**方法要点**　方法要点：CRISPR knockout 筛选（TUT7/DIS3L2/TUT4 对比）+ 公共功能基因组学数据交叉验证，以及体外酶活抑制测定+体内 xenograft 抗肿瘤活性验证小分子抑制剂——其中"体内给药方案+活性读出"这一段可直接搬用到 D2-7 的 TUT4/7 抑制剂剂量梯度设计上；CRISPR knockout 验证靶点特异性（TUT7 vs TUT4 表型分离）的思路也可搬用于他自己体系中区分 TUT4 与 TUT7 对 miR-29 尿苷化的贡献。

**效应量**　【摘要未报告数字】读全文时优先补：抑制剂的具体 IC50/Ki（TUT4 vs TUT7 选择性倍数）、体内有效剂量（mg/kg，给药途径与频次）、以及体内实验中肿瘤生长抑制的具体百分比或统计值，这些是 D2-7 剂量梯度设定的直接参照数据。

**它暴露/承认的空白**　摘要明确指出该抑制剂目前仅在 FOCAD 缺失的肿瘤模型中验证了体内活性，尚未在非肿瘤、纤维化相关的组织（如肠道）中做过药代动力学或安全性/靶点占有率验证，这正是 D2-7 需要补的空白——即该抑制剂能否在肠道达到有效浓度并特异性提升成熟 miR-29 而不产生脱靶毒性。

**我不相信的一件事**　该文的合成致死模型将 TUT7 依赖性完全归因于 FOCAD 缺失导致的 SKI complex 不稳定，但并未排除 TUT7 抑制在 FOCAD 完整（即正常）细胞中是否也会因尿苷化底物（如 miR-29 前体或其他非编码RNA）改变而产生独立于 SKI complex 通路的表型，这对 D2-7 假设"TUT4/7 抑制→miR-29 上调→抗纤维化"是否存在于正常肠道细胞背景下是关键但未被本文回答的问题。

**读全文要核对什么**　【需读全文核对】需确认：(1) 该 TUT4/7 抑制剂的化学结构、剂量范围及给药途径（是否可静脉/腹腔注射，半衰期如何）；(2) 体内实验的对照设计（是否有阳性药/loading control）；(3) 抑制剂是否在正常（非FOCAD缺失）细胞或组织中测过 miRNA 尿苷化谱变化，尤其是否检测过 miR-29 家族的尿苷化及成熟度；(4) 引用文献中是否已有该化合物或同类化合物用于非肿瘤模型的先例，以核实 D2-7 剂量梯度设定的依据是否可靠。

**一个可执行动作**　我要在他已有的 SAA3 肠纤维化小鼠模型体系中，采用本文报道的 TUT4/7 小分子抑制剂（腹腔注射，剂量梯度参照本文体内活性数据设定 2–3 个梯度）处理 2–4 周，预期若该轴介导抗纤维化效应，则高剂量组成熟 miR-29a/b/c 经 TaqMan qPCR 检测应显著升高而 pri/pre-miR-29 不变，同时 Masson 染色纤维化评分及 COL1A1/COL3A1 IHC 应较溶剂对照组下降，且效应弱于或不同于阳性药吡非尼酮组以排除非特异性抗纤维化混杂。


---

# D3 · 乳酸/乳酰化 × 小 RNA 稳态

> **主线假设：** 糖酵解产生的乳酸经乳酰化直接修饰 miRNA 机器组件（AGO2/ZSWIM8/TUT4-7），重编程 miRNA 稳态

> **他在这个方向上的独特资产：** 乳酸生物学是他 iScience 2022 一作的核心（乳酸经胆固醇合成促 CSFV 复制）、胃癌代谢一作、类器官

> **已知文献状态：** 非组蛋白乳酰化已有先例（含 RNA 相关酶）；乳酰化修饰谱在快速扩张；**632 篇候选池里没有乳酸作用于 miRNA 降解机器的报道 —— 真空白**；需质谱合作者

## D3-1 · 乳酸酶写入者鉴定
**层次：** 机制生化　｜　**拥挤程度：** 词对无共现（两两最小共现 0 篇，全交集 0 篇）　｜　**首篇预计：** 14–18 个月（含质谱合作等待期）

> **假设：** 若糖酵解升高，则某乙酰/乳酰转移酶（如KAT2A/p300类）直接催化AGO2/ZSWIM8/TUT4-7的乳酰化，敲低该酶可消除乳酸诱导的miRNA稳态改变

**科学前提**

[已发表] p300/KAT2A 等乙酰转移酶已被证明具有 lactyltransferase 活性，可催化组蛋白及部分非组蛋白（如 MDH1、Snail1）的乳酰化（Zhang et al., Nature 2019 及后续综述）。[已发表] Xiaodong 本人 iScience 2022 一作工作证明乳酸经胆固醇合成通路促进 CSFV 复制，确立他对乳酸代谢信号在细胞内下游效应的操作经验。[本项目计算] 基于 AGO2/ZSWIM8/TUT4/TUT7 序列的赖氨酸位点保守性与已知乳酰化基序（K-X-X 富含酸性/碱性残基环境）做的 PSSM 打分仅为假设生成级，不构成乳酰化位点存在的证据，需质谱验证。[待测] 糖酵解升高（乳酸堆积）是否伴随这些蛋白乳酰化水平上升、且该修饰是否由某一特定 KAT 酶催写入，均未知。

**第一个关键实验**

在他熟悉的类器官体系（肠或胰岛类器官）中，用高糖/乳酸钠处理诱导糖酵解升高，另设 LDHA 抑制剂（如 GSK2837808A）对照组以调控乳酸水平；收集裂解物后用泛乳酰化抗体（pan-Kla）免疫沉淀 AGO2/ZSWIM8/TUT4/TUT7（各自特异抗体，ZSWIM8 抗体可用他杂交瘤平台自制），Western blot 定量乳酰化信号；同时对候选写入酶（p300、KAT2A）分别 siRNA/CRISPR 敲低，每组 n=3 生物学重复，时间点设 0/6/24 h。

**必须的对照**

必须包含：(1) LDHA 抑制剂组排除乳酸本身而非其他糖酵解代谢物的作用；(2) 乳酰化位点突变体（K→R，电荷保留但不可乳酰化）过表达对照，验证修饰特异性而非蛋白丰度变化；(3) IgG 及不相关蛋白（如 GAPDH）作为 IP 特异性对照；(4) 敲低候选 KAT 酶后加乳酸钠 rescue 实验，确认酶依赖性而非旁路效应；(5) 关键：需同时测 pri-miR-29/pre-miR-29 与成熟 miR-29 水平（RT-qPCR + Northern），若乳酰化仅影响成熟体降解而 pri/pre 不变，才能排除 TGF-β/Smad3 转录层抑制这一竞争解释。

**为什么是他能做**

他在 iScience 2022 一作论文中已建立乳酸-胆固醇合成-病毒复制轴的完整操作链，熟悉乳酸处理体系与代谢读出；他的杂交瘤平台可自制 phospho/modification 特异性抗体，此处可直接迁移用于制备或验证乳酰化位点特异抗体；他的类器官技能可提供比 2D 细胞更接近生理糖酵解异质性的模型。这三项资产组合使他能在无需等待质谱合作者的情况下先完成 IP-Western 层面的初筛。

**可行性**

已有：类器官培养、CRISPR 敲低/敲入、杂交瘤抗体制备、IHC/流式（可用于后续定位）。需新学：pan-Kla 抗体的 IP-Western 条件摸索（预计 1–2 个月标准化）、候选 KAT 酶敲低效率验证。需合作：位点级质谱鉴定（LC-MS/MS）必须找质谱合作者，预计寻找并建立合作 1–2 个月。整体起步成本中等，主要瓶颈是质谱合作者而非他自身技能。

**最大风险与放弃条件**

最大风险是 pan-Kla IP-Western 在 AGO2/ZSWIM8/TUT4/TUT7 上完全检测不到信号变化，即乳酸处理组与对照组条带强度无统计学差异（n=3 重复，t 检验 p>0.05），且质谱合作者做的位点级验证也未发现任何乳酰化赖氨酸位点——此时应放弃 D3-1，退回评估是否该蛋白根本不是乳酰化底物，转向 D3 的其他子方向（如先验证乳酸对 miRNA 半衰期的表型层面效应而不预设机制蛋白）。若敲低候选 KAT 酶后乳酸诱导的表型（若表型层面已验证存在）不受影响，也应停止该酶假设，改筛其他乳酰转移酶候选。

**目标期刊与基金**

Molecular Cell 或 Nature Metabolism 为目标期刊；基金机制建议 NIH K99/R00（因其博后转型阶段）或 NIH R21（高风险探索性机制，两年期，适配"真空白"定位）。

**首篇预计**

14–18 个月（含质谱合作等待期）

**做成之后的下一步**

若在某一底物（如 ZSWIM8）上确认乳酰化位点且功能验证有效，下一步自然延伸到 D3-2：该位点乳酰化如何改变 ZSWIM8 招募 AGO2 的效率，从而定量重编程整个 TDMD 靶 miRNA 谱（miR-29/33/375 全景），并检验是否与方向1的 AMPK 磷酸化位点存在交叉调控。

**拥挤程度核查（可复算）**

检索式：`(lactylation[tiab] OR lactyltransferase[tiab]) AND (AGO2[tiab] OR ZSWIM8[tiab] OR TUT4[tiab] OR TUT7[tiab] OR "miRNA degradation"[tiab])`

| 层级 | 检索式 | 全库命中 |
|---|---|---|
| 单词 | `(lactylation[tiab] OR lactyltransferase[tiab])` | 2630 |
| 单词 | `(AGO2[tiab] OR ZSWIM8[tiab] OR TUT4[tiab] OR TUT7[tiab] OR "miRNA degradation"[tiab])` | 2429 |
| 两两 | `(lactylation[tiab] OR lactyltransferase[tiab]) AND (AGO2[tiab] OR ZSWIM8[tiab] OR TUT4[tiab] OR TUT7[tiab] OR "miRNA degradation"[tiab])` | 0 |
| **全交集** | `(lactylation[tiab] OR lactyltransferase[tiab]) AND (AGO2[tiab] OR ZSWIM8[tiab] OR TUT4[tiab] OR TUT7[tiab] OR "miRNA degradation"[tiab])` | **0** |

**配套文献与笔记（4 篇）**

#### PMID 42794724 · Per- and Polyfluoroalkyl Substances and Papillary Thyroid Carcinoma: An Integrative Study of Bioinformatics, Epidemiological Associations, and In Vitro Responses.
*International journal of molecular sciences 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42794724/)

**一句话结论**　该文通过生信整合+病例对照+体外实验，提出PFAS暴露与PTC相关，并锁定EIF4E、NCBP1、AGO2为m7G相关枢纽基因，但PFAS与PTC风险方向不一致（部分呈负相关）且体外表型（划痕实验）不稳定。

**与该子方向的关系**　竞争风险：本文虽提到AGO2被列为候选枢纽基因，但其框架是"m7G修饰-mRNA帽结合复合物(EIF4E/NCBP1)"介导的PFAS毒理机制，与D3-1的"乳酸乳酰化直接修饰AGO2/ZSWIM8/TUT4-7蛋白"完全是不同的分子事件（m7G是RNA帽甲基化，非蛋白乳酰化），不构成直接竞争，但提示AGO2作为枢纽节点在其他修饰通路中也被反复"盯上"，需注意如果后续机制审稿人会问乳酰化与m7G通路是否互斥或协同。

**方法要点**　可搬方法：其"候选基因交集筛选（PFAS-associated genes ∩ m7G-associated genes ∩ 转录组差异表达基因，FDR校正后取交集）"的思路可直接改造为"糖酵解相关基因∩乳酰化写入酶候选基因∩miRNA稳态相关基因"的生信预筛策略，用于在动手做湿实验前缩小candidate writer列表（如从p300/KAT2A扩展到其他HAT/KAT家族成员）。其病例对照中WQS/quantile g-computation/BKMR混合暴露分析方法与本子方向关系不大，不予采用。

**效应量**　摘要数字：24个交集候选基因，FDR校正后21个仍差异表达，锁定3个枢纽基因(EIF4E/NCBP1/AGO2)；病例对照纳入60 PTC患者+60对照，检测17种PFAS血清浓度。【摘要未报告数字】读全文时优先补：AGO2差异表达的具体fold-change/FDR值，以及体外PFOA/PFOS处理后AGO2蛋白或mRNA水平的具体变化幅度（摘要只提到EIF4E和NCBP1 mRNA改变，未提AGO2是否在体外验证中变化）。

**它暴露/承认的空白**　本文明确承认"PFAS与PTC关联在不同分析模型间不完全一致""划痕实验未显示一致的增强效应"，即机制层面AGO2/EIF4E/NCBP1如何具体调控PTC细胞行为仍未阐明，作者自己呼吁"warrant further mechanistic investigation"——这条空白落在D3-1子方向上：即AGO2蛋白翻译后修饰（乳酰化）如何改变其在miRNA稳态中的功能，是本文完全未触及但被其"枢纽基因未验证机制"的空白间接指向的下一步。

**我不相信的一件事**　具体质疑：本文把AGO2列为"m7G-associated候选枢纽基因"仅基于其与m7G-associated gene list及PFAS-associated gene list的交集重叠，AGO2本身是否真的携带m7G修饰或受m7G机制调控完全未经实验验证（无RIP-seq、无m7G-seq直接证据），这种"生信交集=机制关联"的推断链条本身就脆弱，若照搬这种逻辑去推"糖酵解基因与乳酰化写入酶交集=功能性乳酰化"同样会犯同样的过度推断错误，必须在D3-1中用IP+pan-Kla WB等直接生化证据取代单纯的基因列表交集。

**读全文要核对什么**　【需读全文核对】读全文时要确认：(1)图中AGO2作为枢纽基因的差异表达具体图（火山图/热图）及其在PTC组织中上调还是下调的方向；(2)体外实验对照组设置（是否有raw/untreated对照、剂量梯度、时间点）以及AGO2蛋白层面是否有Western blot验证（摘要只提到mRNA层面EIF4E/NCBP1改变）；(3)Table/Supplementary中AGO2相关生信富集分析的具体统计参数（FDR、log2FC）以判断其变化幅度是否具有生物学意义而非仅统计显著。

**一个可执行动作**　我要在他计划中的类器官体系（肠或胰岛类器官）中，先仿照本文"候选写入酶交集筛选"的思路，用现有转录组/公开数据库交集筛出糖酵解相关基因与已知KAT/HAT家族乳酰化写入酶的候选清单，再用D3-1设计的高糖/乳酸钠+GSK2837808A对照处理类器官，通过pan-Kla抗体IP及各自特异抗体（AGO2/ZSWIM8/TUT4/TUT7）Western blot直接检测蛋白乳酰化水平变化，预期在糖酵解升高组观察到AGO2或ZSWIM8乳酰化信号增强而LDHA抑制组信号显著降低，从而用直接生化证据取代本文式的基因交集推断。

#### PMID 42780509 · IGF2BP3 remodels RISC occupancy to control microRNA targeting in leukemia.
*NAR cancer 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42780509/)

**一句话结论**　IGF2BP3 通过与 AGO2 竞争性结合共享的 3' UTR 序列环境，限制 RISC 在特定转录本上的可及性；敲除 IGF2BP3 后 AGO2 向这些 3' UTR miRNA 靶点重新分布，其中 miR-181 在致癌转录本上的占据增强，且 miR-181a 过表达可部分模拟 IGF2BP3 缺失的抑增殖效应。

**与该子方向的关系**　竞争风险：本文的核心命题是"RNA结合蛋白（IGF2BP3）通过占位/竞争调控 AGO2-RISC 对 mRNA 靶点的可及性"，这与 D3-1 假设的"翻译后修饰（乳酰化）直接改变 AGO2/TUT4-7 蛋白本身的活性/稳态"是两条不同的分子层机制（蛋白竞争占位 vs 共价修饰写入者-底物关系），差异声明：本文改变的是 AGO2 在 mRNA 上的定位分布，D3-1 改变的是 AGO2/ZSWIM8/TUT4-7 本身的翻译后修饰状态；若未来发现乳酰化影响的正是 IGF2BP3-AGO2 竞争界面，则两者可能在机制上交汇，需警惕重复。

**方法要点**　可直接搬用的方法：①AGO2 miR-eCLIP 结合 chimeric AGO2-miRNA reads，可用于 D3-1 中检测乳酸/乳酰化处理后 AGO2-miRNA 结合谱是否重排（区分蛋白修饰导致的靶点选择性变化，而非单纯降解）；②体外纯化蛋白的biochemical competition assay（用纯化 IGF2BP3 与 AGO2-RISC 竞争同一 RNA 底物），此思路可迁移为纯化乳酰化/未乳酰化 AGO2 与底物 RNA 的结合竞争实验，验证乳酰化是否改变 AGO2 对 RNA 的亲和力。

**效应量**　摘要未报告数字，读全文时优先补：①AGO2 miR-eCLIP 中 3' UTR 占据增益的具体倍数或统计显著性（fold change、FDR）；②miR-181a 过表达对白血病细胞增殖抑制的具体百分比或IC50类数值；③IGF2BP3-AGO2 体外竞争结合实验中的解离常数或竞争曲线IC50数值，供后续设计乳酰化-AGO2亲和力测定时作为方法学参照量级。

**它暴露/承认的空白**　本文明确承认其机制局限于"IGF2BP3 如何限制 RISC 可及性"，并未探讨 AGO2/TUT4-7 自身的翻译后修饰（如乳酰化）是否也调控其对 3' UTR 靶点的选择性——这正是 D3-1 要填补的空白：即代谢信号（乳酸/糖酵解）是否通过直接共价修饰 AGO2 本身（而非通过竞争性 RBP）来重塑 RISC-mRNA 相互作用。

**我不相信的一件事**　本文用"IGF2BP3 缺失后 AGO2 占据增益"来推断 IGF2BP3 主动"排斥"RISC，但摘要未说明是否排除了 IGF2BP3 缺失导致的转录本整体表达量/稳定性变化间接改变了 AGO2-CLIP信号密度（即 AGO2 结合谱变化可能是靶转录本丰度变化的continuum，而非真正的位点竞争），这是该机制假设需要用RNA-seq归一化后重新验证的关键漏洞。

**读全文要核对什么**　【需读全文核对】需确认：①AGO2 miR-eCLIP的图中3' UTR占据增益信号是否已对mRNA表达量变化做归一化处理（对照field8的疑点）；②biochemical competition assay的具体实验设计（RNA底物序列、蛋白浓度梯度、检测手段如EMSA或filter-binding）及其定量读出方式，可否移植为检测乳酰化AGO2与RNA亲和力变化的方法模板；③MLL-AF4 B-ALL细胞系的具体名称及IGF2BP3-deficient细胞的构建方式（CRISPR敲除还是shRNA敲低），评估是否可比照D3-1中CRISPR敲低p300/KAT2A的设计。

**一个可执行动作**　我要在肠或胰岛类器官体系中，用高糖/乳酸钠处理诱导糖酵解后，参照本文的AGO2 miR-eCLIP + chimeric AGO2-miRNA reads方法，比较乳酰化阳性组与LDHA抑制剂（GSK2837808A）对照组之间AGO2在miR-29/miR-33/miR-375靶转录本3' UTR上的结合谱差异，预期若乳酰化直接改变AGO2的RNA结合选择性（而非通过竞争性RBP），则应观察到与IGF2BP3敲除模型不同的、局限于乳酰化位点邻近区域的AGO2占据重排模式。

#### PMID 42778936 · Targetome-defined miR-181c signaling from extracellular vesicles governs periodontal MSC fate via RNF150-MAP3K5.
*Cell communication and signaling : CCS 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42778936/)

**一句话结论**　该研究提出EV递送的miR-181c通过下调E3泛素连接酶RNF150、减少MAP3K5泛素化降解，从而激活p38信号，驱动牙周膜hMSC成骨分化；核心是miRNA-靶基因-泛素化-激酶的调控轴，与乳酰化写入者机制完全无关。

**与该子方向的关系**　竞争风险：本文与D3-1无重叠靶点或机制交集（无AGO2乳酰化、无TUT4/7、无糖酵解/乳酸信号），判定为不相关文献而非竞争风险；仅在"AGO2 RIP-seq建立miRISC靶组"这一方法层面与D3-1有交集，可视为方法参考而非竞争。

**方法要点**　可直接搬用的是AGO2 RNA-immunoprecipitation sequencing联合转录组分析以鉴定miRISC结合靶组的流程，这与D3-1中要用pan-Kla抗体IP后配合AGO2特异抗体的思路可互补，用于后续验证乳酰化AGO2是否改变其结合谱；此外EV-miRNA体内递送模型（局部给药+µCT+组织学）为器官纤维化/糖酵解体内验证提供可借鉴的给药与读出范式。

**效应量**　摘要未报告数字：读全文时优先补miR-181c在成骨诱导下的倍数变化、RNF150敲低/过表达对MAP3K5泛素化水平的定量数据（如WB灰度比值）、EV局部给药后µCT测得的骨体积/骨密度百分比变化。

**它暴露/承认的空白**　该文承认miRNA介导的干细胞命运调控"机制贡献仍不完全明确"，其空白落在post-transcriptional调控如何与translational/蛋白稳定性层面耦合，这与D3-1所关注的"乳酰化如何在蛋白翻译后层面重编程miRNA稳态机器本身"属于同一大类空白（蛋白翻译后修饰调控miRNA通路），但该文完全未涉及乳酰化。

**我不相信的一件事**　该文将RNF150确立为miR-181c"main target"仅通过Co-IP/WB/IFC及knockdown/overexpression验证蛋白互作与泛素化，但未见摘要提及是否用AGO2 RIP-seq数据本身直接锚定miR-181c-RNF150的直接结合（如3'UTR luciferase报告基因突变），无法排除miR-181c通过其他共表达靶点间接影响MAP3K5-p38轴的可能。

**读全文要核对什么**　【需读全文核对】核对AGO2 RIP-seq的对照设计（是否有IgG对照及miR-181c mimic/inhibitor转染后的差异结合谱图）；核对RNF150 3'UTR是否有miR-181c结合位点的luciferase突变对照图；核对µCT定量图是否设EV-scramble miRNA对照组以排除EV本身非特异效应；核对p38磷酸化(p-p38)WB图的loading control及量化柱状图。

**一个可执行动作**　我要在肠或胰岛类器官体系中，参照本文AGO2 RIP-seq+转录组联合分析的流程，在高糖/乳酸钠处理及LDHA抑制剂对照下，对AGO2/ZSWIM8/TUT4/TUT7分别做pan-Kla IP后再行AGO2 RIP-seq，预期若乳酰化改变AGO2结合谱，则乳酸处理组与对照组的miRISC靶组会出现显著差异，从而为乳酰化写入假设提供功能层面的间接证据。

#### PMID 42759595 · A nucleus-associated miR-661-C/EBPα-PPARγ regulatory axis skews BMSC lineage commitment in SONFH.
*Experimental cell research 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42759595/)

**一句话结论**　论文报道核内 miR-661 通过与 nuclear AGO2 复合物结合，直接占据 PPARG 启动子并协同 C/EBPα 增强其转录，从而驱动 BMSC 向脂肪谱系偏移，导致 SONFH 的骨髓脂肪化与骨修复受损。

**与该子方向的关系**　竞争风险：该文证明 miRNA-AGO2 复合物可以在核内直接发挥转录调控（而非经典的胞质降解/翻译抑制）功能，这与 D3-1 假设的"乳酸乳酰化写入者修饰 AGO2/ZSWIM8/TUT4-7 以重编程胞质miRNA稳态"存在层面竞争——若他后续在类器官中观察到 AGO2 乳酰化伴随的表型变化，需先排除是否经由类似的核内 AGO2-启动子占据机制而非胞质稳态/降解改变，否则会把转录层效应误判为稳态层效应，此为与他方向2里"pri/pre vs 成熟体"类似的层次混淆风险的another变体（核转录 vs 胞质降解）。

**方法要点**　可直接搬用的方法：nuclear AGO2-RIP-qPCR 验证特定 miRNA 在核内 AGO2 复合物中的富集，以及 AGO2 ChIP-qPCR 检测 AGO2 在靶基因启动子上的占据（用 seed-mutant mimic 作为特异性对照）；这套核内 AGO2-染色质互作的方法体系可直接迁移到他检测乳酰化 AGO2 是否发生核转位或启动子占据的实验设计中。

**效应量**　摘要未报告具体数值（如miR-661过表达倍数、AGO2占据的富集倍数、antagomiR体内骨小梁改善的定量百分比）；读全文时优先补：miR-661过表达/敲低后 PPARG、FABP4 mRNA/蛋白变化的倍数，AGO2 ChIP-qPCR 富集倍数及其在敲低/seed-mutant组的降幅，以及体内 antagomiR-661 处理后骨小梁体积分数(BV/TV)等组织形态学定量指标。

**它暴露/承认的空白**　摘要明确承认对核内miRNA-AGO2调控转录的上游写入/修饰机制未加探讨，只关注了miR-661本身的表达上调和其与AGO2/C/EBPα的下游互作，未涉及是否有翻译后修饰（如乳酰化）调控AGO2核转位或染色质结合能力，这一空白恰好落在D3-1子方向（乳酰化写入者是否调控AGO2功能状态）上，提示可以用他的类器官体系检验乳酸/乳酰化是否影响AGO2的核质分布及其ChIP占据能力。

**我不相信的一件事**　该文用RIP-qPCR和ChIP-qPCR证明miR-661与nuclear AGO2共占据PPARG启动子，但未提供AGO2敲低或AGO2失活突变体的对照来证明这种启动子占据在功能上依赖AGO2蛋白本身（而非miR-661通过其他核内RNA结合蛋白独立结合染色质，AGO2只是偶联富集的旁观者），因此"AGO2-associated"是否等同于"AGO2-dependent"的因果关系仍存疑，需要AGO2 knockdown后再做ChIP-qPCR来验证占据是否消失。

**读全文要核对什么**　【需读全文核对】需确认：(1)AGO2 ChIP-qPCR实验是否设有AGO2敲低或IgG对照以排除非特异性沉淀；(2)nuclear/cytoplasmic AGO2分离的Western blot是否用了标准核质marker（如Lamin B1/GAPDH）验证分离纯度；(3)miR-661过表达实验的病毒/mimic转染效率对照及C/EBPα rescue实验的剂量-效应关系图；(4)体内antagomiR-661递送的具体给药方式、剂量及骨组织形态计量学的原始BV/TV数据图。

**一个可执行动作**　我要在肠或胰岛类器官体系中，用高糖/乳酸钠联合LDHA抑制剂GSK2837808A处理诱导糖酵解梯度变化，然后做核质分离Western blot和nuclear AGO2-RIP-qPCR，检验乳酸水平升高是否伴随AGO2核内富集及pan-Kla乳酰化信号增强，预期若p300/KAT2A敲低后AGO2核转位与乳酰化信号同步消失，则支持乳酰化是AGO2核功能状态的上游写入信号。


## D3-2 · ZSWIM8乳酰化位点图谱
**层次：** 机制生化　｜　**拥挤程度：** 词对无共现（两两最小共现 0 篇，全交集 0 篇）　｜　**首篇预计：** 14–18 个月

> **假设：** 若用质谱定位ZSWIM8上的乳酰化残基并以CRISPR/ABE敲入乳酰化模拟或阻断突变，则该突变体对底物miRNA的降解活性（TDMD效率）发生方向性改变

**科学前提**

[已发表] 非组蛋白乳酰化已有多个先例，其中包含RNA相关酶的修饰报道；[本项目计算] 在632篇候选池的检索中未发现乳酸直接作用于miRNA降解机器（ZSWIM8/AGO2/TUT4-7）的报道，此为假设生成级判断，检索结果本身不构成阴性证据；[待测] ZSWIM8是否存在乳酰化修饰位点及其对TDMD活性的方向性影响，均需质谱与功能突变实验验证。

**第一个关键实验**

在HepG2或已有类器官系中，用高糖/高乳酸 vs 2-DG处理诱导糖酵解通量差异，收取细胞后对内源ZSWIM8做IP，送质谱鉴定乳酰化位点（n=3生物学重复×2条件）；同步用pan-Kla抗体做IP-WB初筛验证乳酰化信号随乳酸通量变化，48–72小时收样。

**必须的对照**

必须设置：(1) 高糖有氧糖酵解 vs 2-DG/UK5099抑制糖酵解的对照，验证乳酰化信号随糖酵解通量变化；(2) pan-Kla抗体WB与IP-MS双验证，排除非特异性交叉反应；(3) 关键——同时测被靶miRNA的pri/pre-miRNA与成熟体比值（RT-qPCR分档），任何降解活性改变必须仅体现在成熟体/前体比值上升而pri-miRNA转录本不变，以排除TGF-β/Smad3等转录层机制混杂；(4) 乳酰化模拟突变(Gln/Glu电荷模拟)与阻断突变(Arg/Ala)必须成对比较，单一突变不足以判定方向性；(5) 敲入细胞株需与野生型内源ZSWIM8表达量做Western定量匹配，排除表达量差异伪影。

**为什么是他能做**

他有杂交瘑单抗制备经验可自制该位点的特异性乳酰化抗体，也熟练CRISPR/ABE/BE4内源敲入可直接在内源位点做点突变而非过表达系统，避免人工表达伪影；乳酸生物学是他iScience 2022一作核心工作的直接延伸，具备处理糖酵解通量实验的直觉与体系。

**可行性**

CRISPR/ABE内源位点敲入是他成熟技能（简历直接注明），类器官平台已有可直接套用；乳酸代谢处理体系是他iScience 2022一作工作的直接延伸，无需重新学习。缺口在于质谱乳酰化位点定位（需外部合作，预计2–3个月等待周期）和TDMD降解活性读出所需的miRNA半衰期测定（需新学，可用actinomycin D chase近似替代，1个月内可上手）；smallRNA-seq可外包测序公司完成，不需自建流程。

**最大风险与放弃条件**

最大风险是ZSWIM8上根本检测不到乳酰化修饰，或检测到但敲入模拟/阻断突变对miR-29/miR-33/miR-375的成熟体降解速率（actinomycin D chase半衰期测定）无统计学差异。若IP-MS在两轮独立生物学重复中均未检出乳酰化位点，或检出位点但突变体半衰期与野生型相比无显著差异（假设检验p>0.05，效应量<20%），则放弃D3-2，退回D3-1（AGO2乳酰化谱筛选）重新选靶蛋白。

**目标期刊与基金**

目标期刊 Nucleic Acids Research 或 Molecular Cell（机制生化类）；适配基金机制为 NIH R21（探索性/高风险高回报，2年经费，契合真空白但概念验证阶段）。

**首篇预计**

14–18 个月

**做成之后的下一步**

若某位点乳酰化模拟突变确证方向性改变TDMD效率，下一步转向该位点在AMPK磷酸化(S608/S609)通路下的交叉调控，检验乳酰化与磷酸化是否存在拮抗或协同的组合修饰逻辑。

**拥挤程度核查（可复算）**

检索式：`ZSWIM8[tiab] AND (lactylation[tiab] OR lactate[tiab])`

| 层级 | 检索式 | 全库命中 |
|---|---|---|
| 单词 | `ZSWIM8[tiab]` | 45 |
| 单词 | `(lactylation[tiab] OR lactate[tiab])` | 149535 |
| 两两 | `ZSWIM8[tiab] AND (lactylation[tiab] OR lactate[tiab])` | 0 |
| **全交集** | `ZSWIM8[tiab] AND (lactylation[tiab] OR lactate[tiab])` | **0** |

**配套文献与笔记（4 篇）**

#### PMID 42681318 · Target-Directed miRNA Degradation: Mechanisms and Significance.
*Methods in molecular biology (Clifton, N.J.) 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42681318/)

**一句话结论**　这是一篇方法学/综述性质的 MiMB 章节，系统梳理了 TDMD 的机制框架：靶RNA通过3'端与miRNA互补配对结合，诱导Argonaute构象重排，继而触发tailing and trimming，其中ZSWIM8作为核心起始因子介导该过程；文中强调tailing/trimming与TDMD的机制关联是context-dependent，并未给出具体位点或定量数据。

**与该子方向的关系**　支持前提：为D3-2子方向提供了ZSWIM8-TDMD的机制背景确认，即ZSWIM8介导的Argonaute重排/tailing-trimming是TDMD起始的核心节点，这是"乳酰化修饰ZSWIM8可能改变TDMD效率"这一假设成立的必要前提；但本文未涉及任何翻译后修饰（乳酰化/磷酸化）层面的调控，因此不构成方法或数据支持，仅是背景机制的再确认。

**方法要点**　摘要仅描述机制原理而非具体实验方法（本文档很可能是protocol章节但摘要未列操作步骤），故无直接可搬方法；提示读全文核对是否含有ZSWIM8 IP、Argonaute构象检测或TDMD报告基因系统等可复用的protocol。

**效应量**　【摘要未报告数字】读全文时优先补：TDMD介导的miRNA降解速率/半衰期是否有具体数值、ZSWIM8敲低或敲除后底物miRNA丰度变化的定量倍数，以及tailing/trimming长度分布的定量指标，这些可作为D3-2中乳酰化突变体功能验证的对照基准。

**它暴露/承认的空白**　摘要明确承认"miRNA turnover的机制因每个miRNA的稳定性不同而less comprehensible"，且tailing/trimming与TDMD的机制关联是"context-dependent"——这正是D3-2子方向要填补的空白之一：翻译后修饰（乳酰化）是否是决定这种context-dependency的分子开关，本文完全未触及此层面。

**我不相信的一件事**　本文将tailing and trimming描述为ZSWIM8驱动的Argonaute重排的"often associated"现象而非因果链条上的必需步骤，这意味着若质谱证实ZSWIM8乳酰化位点存在，仍需额外证据证明该修饰是通过改变Argonaute重排/tailing-trimming效率来影响TDMD，而不是通过改变ZSWIM8本身的泛素连接酶活性或底物识别特异性这一独立通路，摘要未提供任何区分这两种可能机制的实验逻辑。

**读全文要核对什么**　【需读全文核对】需确认此MiMB章节是否附带具体protocol（如ZSWIM8 co-IP条件、pan-Kla抗体验证方法、TDMD报告系统构建步骤），若为纯综述则需核对其引用的原始TDMD机制论文（如Shi et al. ZSWIM8机制发现文章）中是否有Argonaute构象变化的结构图或Western blot对照，可作为D3-2实验设计的方法参考。

**一个可执行动作**　我要在HepG2细胞及已有类器官系中，用高糖/高乳酸 vs 2-DG处理制造糖酵解通量差异，对内源ZSWIM8做IP后送质谱鉴定乳酰化位点（n=3×2条件），并同步用pan-Kla抗体IP-WB初筛乳酰化信号是否随乳酸通量变化，预期若ZSWIM8存在乳酰化修饰位点，则高乳酸组IP-WB信号显著强于2-DG组，为后续CRISPR/ABE敲入乳酰化模拟/阻断突变体的TDMD功能验证提供靶点。

#### PMID 42608480 · Canonical and non-canonical miRNA degradation shapes state transitions and stemness in breast cancer.
*The EMBO journal 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42608480/)

**一句话结论**　该文用CRISPRi敲低ZSWIM8+miRNA-seq+AGO2-eCLIP在乳腺癌细胞系中系统鉴定出19个高置信TDMD底物（含miR-29b-3p、miR-33a/b-5p），并发现NREP触发的miR-29b-3p降解与TNBC干性亚群及EMT可塑性相关；同时报道一条不依赖ZSWIM8/蛋白酶体的非经典TDMD（SERPINE1触发miR-30c-5p降解），关联紫杉醇耐药。

**与该子方向的关系**　支持前提：它独立证实miR-29b-3p、miR-33a/b-5p确系ZSWIM8/TDMD的内源底物，且已用AGO2-eCLIP和CRISPRi-KD做过成熟体特异性验证，为D3-2的"底物选择合理性"提供直接背景支撑，但研究对象是乳腺癌而非代谢/纤维化组织，不构成方向竞争。

**方法要点**　可直接搬用的方法要点：①CRISPRi敲低ZSWIM8（而非全敲除）作为功能丧失对照，避免长期敲除的代偿；②AGO2-eCLIP用于区分TDMD导致的靶点占据变化与转录抑制，正是应对Smad3竞争解释所需的成熟体特异性证据链；③"触发转录本-底物miRNA"配对策略（NREP-miR29b、SERPINE1-miR30c）可移植为寻找D3方向中乳酸/糖酵解相关触发转录本的思路。

**效应量**　摘要报告：鉴定出19个高置信TDMD底物（含miR-29b-3p、miR-33a/b-5p）；【摘要未报告数字】读全文时优先补：miR-29b-3p在ZSWIM8-KD后的定量降解倍数/半衰期变化、乳酰化或糖酵解相关处理是否在此体系中被检测过（预期未涉及）。

**它暴露/承认的空白**　该文明确承认TDMD在"人类癌症中的作用仍largely unexplored"，且完全未涉及乳酸/乳酰化对ZSWIM8活性或底物选择的调控——这正是D3-2子方向声称的"真空白"，本文从癌症/EMT角度证实了ZSWIM8-TDMD对miR-29/miR-33的生物学意义，但未触及代谢信号（乳酸通量、Kla修饰）如何改变该酶的降解效率这一机制层。

**我不相信的一件事**　摘要称miR-29b-3p降解由NREP"触发"，但TDMD经典定义要求触发RNA与miRNA存在广泛互补配对且驱动ZSWIM8招募，摘要未说明NREP是否满足该配对标准还是仅为关联转录本；此外非经典TDMD（SERPINE1-miR30c）被描述为"独立于ZSWIM8和蛋白酶体"，但摘要没给出具体降解速率或直接生化证据（如是否仍依赖RISC卸载），需警惕这条通路被过度归为"TDMD"而实际只是间接调控。

**读全文要核对什么**　【需读全文核对】需确认：①miR-29b-3p、miR-33a/b-5p在ZSWIM8-KD vs 对照中的AGO2-eCLIP结合位点及3'端测序/半衰期数据，看是否区分了pri/pre与成熟体（应对Smad3竞争解释的关键图）；②CRISPRi效率对照（ZSWIM8 mRNA/蛋白敲低百分比）及是否设置了灾难性位点突变体（TDD-dead ZSWIM8 RING结构域）阳性对照；③NREP和SERPINE1触发转录本与miR-29b-3p/miR-30c-5p的预测互补图谱及是否有突变解耦实验；④19个底物的完整列表及其在正常乳腺 vs 肿瘤组织中的表达是否与代谢应激（糖酵解基因、乳酸转运体MCT4等）共表达，判断该数据集是否可挖掘出乳酸相关触发转录本线索。

**一个可执行动作**　我要在已有的HepG2/类器官体系中，参照本文AGO2-eCLIP+CRISPRi-ZSWIM8的成熟体特异性验证框架，对高糖/高乳酸 vs 2-DG处理下的miR-29b-3p、miR-33a/b-5p做AGO2-eCLIP和3'端测序，预期若乳酸驱动的ZSWIM8乳酰化确实改变TDMD效率，则应在eCLIP占据和成熟体丰度上观察到与2-DG组方向相反、且不伴随pri-miRNA转录水平变化的差异信号。

#### PMID 42098137 · CLASHub is an integrated database and analytical platform for microRNA-target interactions.
*Nature communications 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42098137/)

**一句话结论**　该文构建了CLASHub数据库，整合人/鼠/果蝇/线虫共25种细胞组织类型的CLASH数据（含91个新数据集），并纳入ZSWIM8 knockout样本以解析TDMD机制，发现ATP6V1G1 3'UTR是介导miR-335-3p降解的新TDMD触发子。它本质是一个数据资源+分析工具平台，不直接涉及乳酰化修饰。

**与该子方向的关系**　提供方法：CLASHub的ZSWIM8-KO CLASH数据集及cumulative fraction curve分析工具，可为D3-2子方向后续验证乳酰化突变体对TDMD底物特异性改变提供公开对照数据集与分析框架，但本文完全未涉及乳酸/乳酰化修饰，故不构成竞争风险，只是上游方法学资源。

**方法要点**　核心方法是CLASH（proximity ligation within AGO complexes）直接捕获miRNA-target杂交读段，区别于传统AGO-CLIP的间接推断；他可搬用的是其ZSWIM8-KO CLASH数据的cumulative fraction curve分析逻辑，作为衡量乳酰化突变体是否改变特定miRNA（如miR-29、miR-33、miR-375）降解效率的比对基准，而非直接照搬湿实验方法。

**效应量**　摘要未报告数字。读全文时优先补：91个新CLASH数据集的具体细胞/组织清单中是否含肝细胞或代谢相关组织、ZSWIM8-KO组与WT组中miR-335-3p/ATP6V1G1杂交读段的富集倍数或统计量、以及数据库中miR-29/miR-33/miR-375在人肝或纤维化相关组织的CLASH覆盖深度。

**它暴露/承认的空白**　该文承认现有CLASH数据集"仅限少数人和鼠样本"，是资源覆盖度上的空白，但更关键的空白是：全文未提及任何翻译后修饰（乳酰化、磷酸化）对ZSWIM8底物选择性的调控，这正落在D3-2子方向要填补的"乳酰化位点如何改变TDMD活性"这一空白上，属于该子方向可以直接声称的新颖性依据。

**我不相信的一件事**　该文用ZSWIM8-KO CLASH数据反推TDMD底物（如ATP6V1G1触发miR-335-3p降解），但KO是完全丧失功能的极端扰动，无法区分ZSWIM8正常酶活水平下的细微效率变化，这意味着若未来用其数据作为乳酰化突变体（可能只是部分改变活性而非全无）的效应比对基准，量级上可能不可比，需谨慎评估KO效应能否外推到点突变的方向性改变。

**读全文要核对什么**　【需读全文核对】需确认：(1)91个新CLASH数据集是否包含肝癌细胞系(HepG2)或类器官来源样本，决定能否直接调用其作为背景对照；(2)ZSWIM8-KO CLASH数据是否分了成熟miRNA与pri/pre-miRNA的读段，能否用于区分转录抑制(TGF-β/Smad3对miR-29)与降解层面的效应；(3)cumulative fraction curve分析的具体统计方法和阈值设定，供他自己数据复用时对齐参数。

**一个可执行动作**　我要在HepG2/类器官糖酵解通量差异体系里，先用CLASHub的Analyzer工具查询miR-29/miR-33/miR-375在其现有ZSWIM8-KO CLASH数据集中的降解特征作为基线参照，再叠加我自己质谱鉴定的ZSWIM8乳酰化位点CRISPR/ABE敲入突变体做AGO-IP后CLASH或简化版杂交测序，预期乳酰化模拟突变会使这些代谢相关miRNA的TDMD效率相对KO基线发生方向性偏移（增强或减弱）。

#### PMID 41887800 · Linking miRNAs to decay.
*Genes & development 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/41887800/)

**一句话结论**　这是一篇评述性文章，介绍 Grimme 等发现一条 lncRNA 可通过与一整个 miRNA 家族之间"较松散"的碱基配对结构，同时触发多个相关 miRNA 的 TDMD，说明 TDMD 触发所需的配对严格度比先前认为的更宽松。

**与该子方向的关系**　竞争风险：本文核心是"lncRNA 作为松散配对的 TDMD 触发器可协同降解一个 miRNA 家族"，这与 D3-2 假设的"ZSWIM8 乳酰化直接改变其对底物的降解活性"是两条不同但可能相互混淆的机制解释——若后续发现某 miR-29/33/375 家族成员的下调其实是被某内源 lncRNA 触发的经典 TDMD，而非乳酰化调控 ZSWIM8 活性，则会削弱把表型归因于乳酰化的因果链；需在论文设计里排除内源 lncRNA trigger 的混杂。

**方法要点**　摘要未描述具体实验方法（本文为 News & Views/评述性质），故无直接可搬用的实验方案；唯一可提取的方法学启示是"用配对架构（pairing architecture）的松紧程度来判定是否足以触发 TDMD"这一分析框架，可用于后续在设计乳酰化突变体功能验证实验时，区分"底物本身配对特征改变"与"ZSWIM8酶活改变"两种可能性。

**效应量**　【摘要未报告数字】读全文时优先补：该 lncRNA 与 miRNA 家族之间碱基配对的具体错配/凸起位置及数量、TDMD 引发后 miRNA 半衰期或稳态水平下降的定量数据（如剩余表达百分比或降解速率常数），以及该家族包含哪些具体 miRNA 成员。

**它暴露/承认的空白**　摘要明确指出的空白是：此前认为 TDMD 需要较严格的扩展碱基配对，而本文揭示"较松散配对也可有效触发 TDMD"，这一空白落在 D3-2 子方向上——若 ZSWIM8 的乳酰化改变其识别配对结构的阈值（即对松散配对底物的容忍度），可能是乳酰化修饰功能后果的一个新维度，值得在质谱定位位点后结合结构预测评估。

**我不相信的一件事**　本文（评述）本身未给出原始数据，其对"较松散配对足以触发 TDMD"的结论完全依赖于对 Grimme 等原文的转述，摘要没有说明这种松散配对触发的 TDMD 效率是否与经典严格配对触发的 TDMD 效率相当，也没有排除该 lncRNA 是否同时通过转录层机制（如竞争性结合 AGO 或影响 miRNA 生成）间接降低 miRNA 水平——这与本子方向"必须区分 pri/pre vs 成熟体降解"的铁律直接相关，需要谨慎评估该评述引用的原文是否已做此区分。

**读全文要核对什么**　【需读全文核对】读全文（含所评述的 Grimme et al. gad.353314.125 原文）时需确认：（1）该 lncRNA-miRNA 配对结构的具体图示（错配/凸起位置示意图）；（2）原文中是否设有 pri-miRNA/pre-miRNA 水平的对照以排除转录层调控，是否有 ZSWIM8 knockout/knockdown 作为 TDMD 依赖性的阳性对照；（3）原文所引用或新增的参考文献中是否已有 ZSWIM8 结构域与配对识别相关的生化数据，可为乳酰化位点是否落在功能关键结构域提供背景。

**一个可执行动作**　我要在 HepG2/类器官 ZSWIM8 内源 IP-质谱定位乳酰化位点的体系基础上，增设 pri-miR-29/33/375 与成熟体 qPCR 双重检测，并在做 ABE 敲入乳酰化模拟/阻断突变后，平行检测是否存在内源 lncRNA-miRNA 松散配对触发的经典 TDMD 信号（如 3′端加尾/AGO2 共免疫沉淀富集），预期若乳酰化突变体改变降解活性而无内源 lncRNA trigger 变化，则可将表型归因于 ZSWIM8 酶活本身而非配对架构层面的竞争性解释。


## D3-3 · 乳酰化对AGO2-target亲和力
**层次：** 底物特异性　｜　**拥挤程度：** 词对无共现（两两最小共现 0 篇，全交集 0 篇）　｜　**首篇预计：** 12–15 个月

> **假设：** 若AGO2在Piwi/PAZ结构域附近被乳酰化，则其与seed-matched target mRNA及GW182的结合亲和力改变，导致miRNA介导的沉默效率整体上调或下调

**科学前提**

[已发表] 非组蛋白乳酰化已在多种蛋白（包括部分RNA结合酶）中被报道，证明lactyl-CoA/乳酸驱动的Kla（lysine lactylation）是普遍存在的翻译后修饰机制。[已发表] AGO2的PIWI/PAZ结构域含多个保守Lys，其乙酰化/泛素化已被证明可调节其与target mRNA及GW182的结合，提示同一位点可能对Kla敏感。[本项目计算] 用自建AMPK/Kla倾向性PSSM对AGO2一级序列打分，PIWI-PAZ界面附近有若干高分候选Lys，但该分值仅为假设生成级，不构成证据。[待测] 在他自己的胃癌类器官（高糖酵解/高乳酸背景）中，AGO2 Kla水平是否随乳酸浓度剂量依赖性升高、且该修饰是否落在候选Lys上，尚未验证。

**第一个关键实验**

在他已有的胃癌类器官体系中，用0/5/10/20 mM乳酸钠处理48小时（n=4/组），先用泛Kla抗体做AGO2 IP-Western确认整体乳酰化随剂量升高；阳性后对候选Lys位点做K-to-Q(模拟乳酰化)与K-to-R(阻断)点突变，转染AGO2-KO细胞回补，做luciferase seed-match reporter（miR-29/miR-33 3'UTR报告基因）读出沉默效率变化；同批做AGO2-GW182 co-IP评估结合亲和力，时间点为处理后24/48h。

**必须的对照**

必须设：(1) 等渗甘露醇/丙酸对照排除渥太华效应/渗透压非特异效应；(2) LDHA抑制剂GSK2837808A或乳酸转运体MCT1抑制剂AZD3965预处理，确认效应依赖细胞内乳酸而非培养基pH；(3) K-to-R与K-to-Q双向突变对照，缺一不可，只有K-to-Q获得功能且K-to-R丢失功能才算通过；(4) 关键排除项——同时测pri-miR-29/33与成熟体qPCR，若乳酸只改变成熟体沉默效率而不改变pri/pre丰度及Drosha/Dicer切割效率，方可排除TGF-β/Smad3转录层抑制这一竞争解释；(5) 空载体/野生型AGO2回补作为基线对照。

**为什么是他能做**

他在iScience 2022一作工作中已证明乳酸经胆固醇合成途径促进CSFV复制，说明他对"乳酸如何重编程细胞内信号/代谢"有第一手操作经验和思路直觉；胃癌代谢一作背景使他熟悉高糖酵解肿瘤/类器官体系及乳酸干预范式；他掌握CRISPR/ABE/BE4内源位点编辑技术，可直接在内源AGO2位点做K-to-Q/K-to-R敲入而非仅依赖过表达，这是多数纯生化实验室做不到的优势；类器官平台使他能在贴近生理的乳酸浓度梯度下做功能验证。

**可行性**

已具备：类器官培养、CRISPR/ABE/BE4内源编辑、IHC/流式验证蛋白定位。需新学：泛Kla及位点特异性抗体的IP-Western optimization（预计1-2个月上手，因他有杂交瘤制备经验可自制phospho/modification抗体，迁移成本低）；luciferase seed-match reporter构建与判读（约1个月，属常规分子生物学）。需合作：位点特异性Kla质谱鉴定（LC-MS/MS with Kla-specific search）必须找质谱合作者，这是关键瓶颈，建议先用泛Kla抗体筛出阳性再送位点鉴定以降低合作成本。

**最大风险与放弃条件**

最大风险是AGO2整体Kla信号阳性但位点突变（K-to-Q/K-to-R）在luciferase reporter和co-IP中均无功能差异——这说明乳酰化可能是"旁观者修饰"而非功能性调控，此时放弃AGO2直接靶点假设，退回评估ZSWIM8或TUT4/7是否为乳酸的真正功能靶点（即回到D3的上位问题重新分配到D3-1/D3-2）。次要放弃条件：若GSK2837808A/AZD3965阻断LDHA/MCT1后AGO2 Kla信号不下降，说明信号不依赖细胞内乳酸生成，应放弃"糖酵解-乳酸"这一因果链，转而排查是否为培养基本身乳酸盐的直接效应或伪影。

**目标期刊与基金**

首选EMBO Reports或Nucleic Acids Research（RNA机器翻译后修饰专题接受度高）；基金机制对应NIH K99/R00（他博后转PI阶段）或AACR-NextGen Grant（代谢-RNA交叉方向）。

**首篇预计**

12–15 个月

**做成之后的下一步**

若K-to-Q获得功能且位点经质谱确认，下一步是评估该Kla位点是否被特定"lactyl-writer"（如p300或已知乳酰转移酶）动态调控，并检验其在体内（他的大动物纤维化模型）中是否随组织乳酸水平变化，从而把D3-3与D2的抗纤维化miR-29轴连接成统一代谢-RNA稳态通路。

**拥挤程度核查（可复算）**

检索式：`(AGO2[tiab] OR "Argonaute 2"[tiab]) AND (lactylation[tiab] OR lactyl[tiab])`

| 层级 | 检索式 | 全库命中 |
|---|---|---|
| 单词 | `(AGO2[tiab] OR "Argonaute 2"[tiab])` | 2519 |
| 单词 | `(lactylation[tiab] OR lactyl[tiab])` | 2830 |
| 两两 | `(AGO2[tiab] OR "Argonaute 2"[tiab]) AND (lactylation[tiab] OR lactyl[tiab])` | 0 |
| **全交集** | `(AGO2[tiab] OR "Argonaute 2"[tiab]) AND (lactylation[tiab] OR lactyl[tiab])` | **0** |

**配套文献与笔记（4 篇）**

#### PMID 42794724 · Per- and Polyfluoroalkyl Substances and Papillary Thyroid Carcinoma: An Integrative Study of Bioinformatics, Epidemiological Associations, and In Vitro Responses.
*International journal of molecular sciences 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42794724/)

**一句话结论**　这篇研究用生信整合+病例对照+体外实验，发现PFAS暴露与PTC风险及m7G相关基因（EIF4E、NCBP1、AGO2）表达变化相关，但AGO2仅作为候选hub基因出现于生信层面，未涉及其翻译后修饰或与靶mRNA/GW182结合亲和力的任何数据。

**与该子方向的关系**　竞争风险：本文把AGO2放进"m7G相关基因-PFAS-PTC"框架里讨论，是一个完全不同的因果链（环境毒物→m7G加帽机制→肿瘤），一旦被同行看到"AGO2+PTC+PFAS"会误以为AGO2功能调控已有环境暴露解释，需要在写作中明确声明D3-3做的是乳酸/乳酰化对AGO2结构域的直接修饰，与PFAS-m7G通路无重叠、无因果关联。

**方法要点**　摘要提及用bioinformatics整合transcriptomic data筛选candidate hub genes（EIF4E、NCBP1、AGO2）的思路可作为后续若要做"乳酰化AGO2下游转录组变化"时筛选候选靶基因的一种参考流程，但其WQS/quantile g-computation/BKMR等混合暴露统计方法与他的点突变-luciferase体系无直接可搬性。

**效应量**　摘要仅报告"higher concentrations of several PFAS associated with lower odds of PTC"、"PFOA/PFOS reduced relative thyroid-cell viability"等方向性描述，未给出OR值、置信区间或AGO2表达变化的具体倍数；【摘要未报告数字】读全文时优先补：AGO2在PTC组织中差异表达的具体fold-change/FDR值，以及PFOA/PFOS处理后AGO2 mRNA/蛋白表达是否有统计学意义的变化。

**它暴露/承认的空白**　本文明确指出"AGO2作为候选hub基因，其在PFAS暴露下的调控机制尚未阐明，warrant further mechanistic investigation"，这一空白落在D3-3子方向上——即AGO2的翻译后修饰（本文完全未提乳酰化或任何PTM）如何改变其功能仍是空白，但该空白的驱动因素（环境毒物m7G通路）与我们的乳酸代谢通路是平行而非重叠的空白。

**我不相信的一件事**　本文将AGO2列为"m7G-associated gene"的依据仅来自m7G-associated genes数据库交集筛选，缺乏功能实验证实AGO2本身受m7G修饰或参与m7G通路，其纳入更可能是数据库注释的偶然重叠而非真实生物学关联，此处对AGO2身份的定性本身存疑。

**读全文要核对什么**　【需读全文核对】需确认AGO2在候选hub genes分析中的具体差异表达倍数、FDR值及其在PTC组织中是上调还是下调；需核对supplementary table中AGO2是否在体外PFOA/PFOS处理组有蛋白层面（而非仅mRNA）验证数据；需核对m7G-associated genes列表的来源数据库及AGO2被纳入的具体注释依据（是否为直接实验证据还是预测性注释）。

**一个可执行动作**　我要在AGO2-KO胃癌类器官回补K-to-Q/K-to-R点突变体系里做luciferase seed-match reporter实验，预期乳酰化模拟突变（K-to-Q）会改变AGO2对miR-29/miR-33 3'UTR报告基因的沉默效率，且该效应独立于本文所述的m7G/PFAS通路，需在讨论部分明确划清两者的机制边界以避免审稿人误判为重复工作。

#### PMID 42780509 · IGF2BP3 remodels RISC occupancy to control microRNA targeting in leukemia.
*NAR cancer 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42780509/)

**一句话结论**　IGF2BP3 通过占据3'UTR上与AGO2重叠的序列环境，物理竞争性排挤RISC/AGO2结合，从而限制miRNA靶点的可及性；其缺失会使AGO2在3'UTR上的占据全局重分布并增强特定miRNA（如miR-181）对致癌转录本的沉默。

**与该子方向的关系**　竞争风险：本文证明的是"RNA结合蛋白通过占位/位阻改变AGO2-mRNA结合"这一机制，与D3-3假设"翻译后修饰(乳酰化)直接改变AGO2本身构象从而改变其对靶点/GW182亲和力"是两条不同因果链——前者是trans因子竞争占位，后者是AGO2自身PTM改变亲和力，若读全文发现IGF2BP3位点与候选Kla位点空间重叠，则需明确区分"竞争排挤"与"AGO2本身亲和力改变"两种模型，避免把位阻效应误读为乳酰化效应。

**方法要点**　可直接搬用的方法：①AGO2 miR-eCLIP及AGO2-miRNA chimeric reads分析流程，用于在乳酸钠处理后的胃癌类器官中直接读出AGO2占据谷/miRNA-target chimera的变化，比luciferase报告基因更能揭示全转录组层面的RISC重分布；②纯化蛋白biochemical competition assay（IGF2BP3 vs AGO2竞争同一RNA底物），此思路可改造为"乳酰化AGO2 vs 未修饰AGO2"竞争结合同一seed-match RNA的体外实验，作为luciferase之外的直接生化验证。

**效应量**　摘要未报告数字，读全文时优先补：①IGF2BP3缺失后AGO2在3'UTR miRNA靶点处occupancy变化的定量倍数或FDR阈值；②miR-181a过表达对白血病细胞生长抑制的具体百分比/IC50；③biochemical competition assay中IGF2BP3置换AGO2所需的浓度梯度或Kd值，这些可作为D3-3中"乳酸钠剂量-亲和力变化"实验的效应量参照标尺。

**它暴露/承认的空白**　摘要承认"IGF2BP3如何重塑转录后调控的机制此前不完全清楚"，其空白在于只研究了trans因子(IGF2BP3)对RISC可及性的调控，未触及AGO2自身翻译后修饰（如乳酰化）如何直接改变其与靶点/GW182的结合，这正落在D3-3子方向要填补的空白上。

**我不相信的一件事**　该文的位移竞争模型基于MLL-AF4白血病细胞系和体外纯化蛋白assay，尚未在生理乳酸浓度或代谢应激条件下验证IGF2BP3-AGO2竞争是否被乳酰化等PTM动态调节，因此"IGF2BP3决定RISC可及性"的结论可能只是特定转录本子集在特定细胞背景下的现象，其miR-181富集效应是否可推广到miR-29/miR-33等D3-3关心的代谢/纤维化miRNA靶点尚无证据支持。

**读全文要核对什么**　【需读全文核对】需确认：①AGO2 miR-eCLIP实验中是否有加乳酸/代谢应激的处理组或至少讨论代谢状态对IGF2BP3表达的影响（图3-4附近）；②motif analyses图中IGF2BP3与AGO2收敛的3'UTR序列环境是否包含miR-29/miR-33 3'UTR报告基因所用序列；③biochemical competition assay的具体实验条件（缓冲液pH、蛋白浓度梯度、RNA底物设计）是否可直接移植为AGO2乳酰化vs非乳酰化的竞争结合对照实验。

**一个可执行动作**　我要在已有的胃癌类器官+AGO2-KO回补体系中，做AGO2-GW182 co-IP及luciferase seed-match reporter实验的同时，参照本文的biochemical competition assay设计一组"K-to-Q乳酰化模拟AGO2 vs 野生型AGO2"竞争结合同一miR-29/miR-33 3'UTR RNA底物的体外竞争实验，预期若乳酰化确实改变AGO2对靶点的亲和力，则K-to-Q突变体应表现出与野生型AGO2不同的置换/占据曲线，且该效应应独立于IGF2BP3表达水平（可通过IGF2BP3敲低对照排除位阻类竞争风险）。

#### PMID 42778936 · Targetome-defined miR-181c signaling from extracellular vesicles governs periodontal MSC fate via RNF150-MAP3K5.
*Cell communication and signaling : CCS 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42778936/)

**一句话结论**　该文用AGO2 RIP-seq联合transcriptome确立了miR-181c的miRISC靶标组，并证明miR-181c通过抑制RNF150、减少MAP3K5的泛素化降解来激活p38，从而驱动hMSC成骨分化；核心是"miRNA丰度—靶标抑制强度"的经典轴，未涉及AGO2自身翻译后修饰对结合亲和力的调控。

**与该子方向的关系**　竞争风险：本文与D3-3撞在"miRISC结合/沉默效率如何被调节"这一层，但机制完全不同——它把沉默效率的变化归因于miRNA表达量与EV分泛，而D3-3假设的是AGO2蛋白本身的乳酰化修饰改变其与seed-matched target及GW182的亲和力；需在写作中明确声明：本文未检验AGO2的PTM（乳酰化/磷酸化等）对结合的直接影响，二者是"上游miRNA丰度"vs"AGO2蛋白修饰"两条互不重叠的因果链。

**方法要点**　可直接搬用的方法：AGO2 RNA-immunoprecipitation sequencing（RIP-seq）联合transcriptome整合以确立miRISC-associated targetome的分析流程，可套用到他自己的胃癌类器官AGO2-K-to-Q/K-to-R回补体系里，比较乳酰化模拟突变前后AGO2结合的靶标谱变化；其Co-IP/WB/IFC评估蛋白-蛋白相互作用（本文用于RNF150-MAP3K5，他可平移为AGO2-GW182 co-IP）的实验设计逻辑也可直接借鉴。

**效应量**　【摘要未报告数字】读全文时优先补：miR-181c在成骨分化过程中上调的具体倍数（qPCR/microarray fold change）、RNF150 knockdown/overexpression后p38磷酸化水平变化的定量数据、以及µCT中骨体积分数(BV/TV)等骨再生指标的具体数值，这些可作为他体系中luciferase沉默效率变化的效应量参照基准。

**它暴露/承认的空白**　摘要明确承认"miRNA介导调控对谱系决定的机制性贡献仍不完全清楚"，且其miRISC targetome分析完全基于内源miRNA丰度变化，未触及AGO2蛋白本身修饰（磷酸化、乳酰化等）如何独立于miRNA丰度调节结合亲和力——这正是D3-3瞄准的空白，即"AGO2蛋白翻译后修饰层面的沉默效率调控"在此文中完全未被讨论。

**我不相信的一件事**　本文的RNF150-MAP3K5-p38轴建立在miR-181c表达量变化驱动的经典sponge式抑制模型上，但未排除EV本身（而非其内含miRNA）对受体细胞p38通路的直接刺激作用——即EV-miR-181c的"loss-of-function"对照是否严格区分了EV载体效应与miRNA本身效应，摘要未说明是否用了miRNA-depleted EV作为阴性对照，这对因果归属的严谨性构成质疑。

**读全文要核对什么**　【需读全文核对】需确认：(1) AGO2 RIP-seq的IP对照设计（IgG对照、AGO2-KO对照）及是否检测了AGO2蛋白本身的PTM状态；(2) RNF150是否为直接3'UTR结合的miR-181c靶点（需查seed-match预测+luciferase 3'UTR报告基因图）；(3) 图中miR-181c gain/loss-of-function实验的具体细胞数、时间点及p38磷酸化WB的定量方法（是否有band intensity统计和n值）；(4) 参考文献中是否已有AGO2 PTM相关文献被引用及如何被定位（竞争声明用）。

**一个可执行动作**　我要在胃癌类器官AGO2-KO回补体系中，用K-to-Q/K-to-R点突变模拟/阻断乳酰化后，套用本文的AGO2 RIP-seq+transcriptome分析流程比较突变前后miRISC靶标组的整体漂移，预期若乳酰化改变结合亲和力，则K-to-Q组相对野生型会出现系统性的靶标富集/流失模式，而非像本文那样仅由miR-181c单一miRNA丰度变化驱动的局部靶标转换。

#### PMID 42759595 · A nucleus-associated miR-661-C/EBPα-PPARγ regulatory axis skews BMSC lineage commitment in SONFH.
*Experimental cell research 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42759595/)

**一句话结论**　该文报道miR-661在SONFH骨髓间质细胞核内富集，并与核内AGO2形成复合物，在PPARG启动子上增加C/EBPα占据和AGO2占据，从而驱动BMSC向脂肪谱系偏移；这是一个核内AGO2-miRNA-染色质调控轴，而非细胞质经典种子配对沉默机制。

**与该子方向的关系**　竞争风险：该文展示的核内AGO2/miRNA-染色质结合模式提示AGO2的功能界面（本文聚焦启动子占据而非胞质seed-match沉默）可能与D3-3假设的"AGO2乳酰化改变胞质seed-match结合亲和力"路径存在机制层面的竞争解释——若AGO2活性变化本质上来自核转位/染色质结合而非乳酰化修饰本身，则需要在实验设计中区分两者，避免把核内AGO2效应误判为PAZ/Piwi结构域乳酰化直接改变胞质靶标亲和力的证据。

**方法要点**　可直接搬用的方法：AGO2 RIP-qPCR（区分核/质组分）、AGO2 ChIP-qPCR评估AGO2在特定基因启动子上的占据、以及miRNA seed-mutant mimic对照设计（用以证明AGO2占据依赖种子序列而非非特异结合），这些均可平移到D3-3中验证乳酰化AGO2是否改变其在核内或染色质上的分布。

**效应量**　摘要未报告数字。读全文时优先补：miR-661过表达/抑制后luciferase报告基因活性变化倍数、C/EBPα-RIP及AGO2-ChIP的qPCR富集倍数（fold enrichment）、antagomiR-661体内实验中骨小梁体积分数(BV/TV)及脂肪面积百分比的具体数值。

**它暴露/承认的空白**　该文承认"progenitor-level regulatory mechanisms underlying this process remain incompletely defined"，暴露的空白是miRNA介导的核内AGO2功能（区别于胞质沉默）在代谢-表观调控界面上机制不明——这恰好落在方向3(乳酸/乳酰化重编程miRNA稳态)上，提示若要证明乳酰化改变AGO2功能，需先排查是否通过改变AGO2核质分布而非直接改变结合口袋亲和力起作用。

**我不相信的一件事**　该文用C/EBPα RIP-qPCR和AGO2 ChIP-qPCR证明"miR-661与C/EBPα/AGO2在启动子上共占据"，但相关性证据链未排除miR-661本身是否通过独立的核转运机制（而非AGO2直接携带）进入核内并招募C/EBPα——即AGO2 ChIP信号可能反映的是C/EBPα募集AGO2-miRNA复合物到已开放染色质区域的下游结果，而非miR-661/AGO2主动驱动占据的因果关系，seed-mutant对照只能证明序列特异性，不能证明因果方向。

**读全文要核对什么**　【需读全文核对】需确认：(1) AGO2 ChIP-qPCR和C/EBPα RIP-qPCR的阴性对照（IgG、非靶基因locus、无义mimic）设置是否充分；(2) 核质分离的AGO2蛋白定量Western是否显示明确的核内AGO2条带及其相对丰度；(3) miR-661过表达是否同时检测了细胞质中经典seed-match靶标（如已知胞质靶基因）的沉默效率变化，以判断该miRNA是否为"核质双功能"而非纯核内作用；(4) 图中是否有AGO2乳酰化或翻译后修饰的任何提及（预期没有，需确认排除）。

**一个可执行动作**　我要在胃癌类器官AGO2-KO回补体系中，先用核质分离Western确认乳酸钠处理后AGO2乳酰化是否伴随核内AGO2丰度变化（参照本文的核质AGO2-RIP方法），再用K-to-Q/K-to-R点突变体做AGO2 ChIP-qPCR于miR-29/miR-33靶基因启动子区，预期若乳酰化通过改变AGO2核转位而非直接改变PAZ/Piwi结合口袋起作用，则K-to-Q突变体应显示与野生型不同的核内富集而非单纯胞质沉默效率变化。


## D3-4 · TUT4/7乳酰化与尿苷化活性
**层次：** 底物特异性　｜　**拥挤程度：** 词对无共现（两两最小共现 0 篇，全交集 0 篇）　｜　**首篇预计：** 14–18 个月

> **假设：** 若TUT4/7在其催化或RNA结合结构域被乳酰化，则其对pre-miRNA/成熟miRNA 3′端的尿苷化活性及产物长度分布发生可检测变化（需3′末端测序区分成熟体而非转录前体）

**科学前提**

[已发表] 非组蛋白乳酰化已被证实可发生在多种 RNA 结合酶/代谢酶上，部分底物含类似 TUT4/7 的核酸结合结构域（如 MDH1、hnRNP 家族），提示乳酰化可直接调控 RNA 结合蛋白的催化活性。[已发表] TUT4/7 (ZCCHC11/ZCCHC6) 对 pre-let-7 及部分成熟 miRNA（如 miR-26a、let-7）的 3′ 单/寡尿苷化已被证明可分别促进降解或稳定其功能，是 miRNA 稳态的关键末端修饰酶。[本项目计算] 基于本项目自建的赖氨酸乳酰化 motif 打分（非公开数据库比对，仅假设生成级），TUT4/7 的 OB-fold RNA 结合域及 catalytic (PAP/OB) 结构域内存在若干高置信度赖氨酸乳酰化候选位点，但该分值本身不构成证据，仅用于优先排序待验证残基。[待测] 糖酵解升高乳酸/乳酰化水平是否直接改变 TUT4/7 对 pre-miRNA 与成熟 miRNA 3′端的尿苷化活性及产物长度分布，目前无任何直接证据，是本子方向的核心待验证问题。

**第一个关键实验**

在 HepG2 或胰岛类器官细胞中，用高糖酵解诱导（如乳酸钠孵育、LDHA 过表达）vs 2-DG/UK5099 抑制糖酵解处理，各设 3 组×3 生物学重复；免受质谱合作者协助做 TUT4/7 免疫共沉淀后 pan-lactyl-lysine western blot 及位点定位质谱，确认乳酰化状态变化；同一批细胞平行做体外重组 TUT4/7 尿苷化活性实验（合成 pre-let-7/pre-miR-29 底物 + UTP，梯度乳酰化模拟或用乳酰化模拟突变体 K→Q vs K→R），读出为凝胶尿苷化产物长度分布及 3′ RACE/TAIL-seq 测序，时间点为处理 0/6/24h，每组样本量 n=3。

**必须的对照**

必须设 pri-miRNA/pre-miRNA 定量（qPCR）与成熟体定量并行对照，若乳酸处理只改变 pri/pre 而成熟体尿苷化谱不变，则提示 TGF-β/Smad3 转录层机制而非降解机器直接效应，需排除。设 catalytically dead TUT4/7 (D1044A) 作为阴性对照排除非酶活性依赖效应；设乳酰化模拟突变（K→Q）与不可乳酰化突变（K→R）位点特异性对照；设 LDHA 抑制剂（GSK2837808A）回复实验排除乳酸非特异毒性；设总蛋白乳酰化非特异抑制剂（如 pan-lactylation 抑制条件）作为通路特异性对照。

**为什么是他能做**

他的 iScience 2022 一作论文已证明乳酸经胆固醇合成通路促进 CSFV 复制，说明他对乳酸信号转导下游效应机制有第一手操作经验和代谢-病毒轴思维训练。他的胃癌代谢一作工作显示他能设计代谢干预（糖酵解诱导/抑制）与下游分子读出的完整实验链条。他已掌握 CRISPR/ABE/BE4 内源位点编辑技术，可直接在内源 TUT4/7 位点做 K→Q/K→R base editing 而非仅依赖过表达系统，这是该子方向从"过表达模拟"升级到"内源验证"的关键技能优势。

**可行性**

已有技能可直接支持：CRISPR/BE4 用于内源 TUT4/7 乳酰化位点突变、类器官体系用于代谢干预验证、IHC/流式用于蛋白定位与丰度分析。需新学技能：3′ 末端测序（TAIL-seq 或类似协议）预计需 3–4 个月学习曲线，可通过短期访问合作实验室或购买商业化 3′-seq 试剂盒加速；质谱位点定位必须外部合作（如 MSKCC 内部质谱核心设施），预计接洽与首轮数据 2–3 个月。体外重组 TUT4/7 蛋白表达纯化需新建，若合作者已有构建可缩短至 1–2 个月。

**最大风险与放弃条件**

最大风险是乳酸/乳酰化处理后 TUT4/7 免疫共沉淀检测不到 pan-lactyl-lysine signal 变化（乳酰化本身未发生或幅度过低），或体外尿苷化活性实验中野生型 vs K→Q/K→R 突变体在凝胶产物长度分布及 TAIL-seq 尿苷化频率上无统计学差异（配对 t 检验 p>0.05，效应量<10%）。若两者同时成立，即放弃该子方向，退回 D3 项下评估 AGO2 乳酰化子方向或重新聚焦方向2（TUT4/7×miR-29 尿苷化，非乳酸依赖）。若仅质谱未检出位点但体外突变体已显示活性差异，则保留假设但改用间接功能证据推进，不算完全放弃。

**目标期刊与基金**

目标期刊为 Molecular Cell 或 Nucleic Acids Research（机制类，适配代谢-RNA修饰交叉主题）；适配基金机制为 NIH K99/R00（转型期博后适配）或 NIH R21（探索性高风险高回报机制），亦可申请 Damon Runyon 或 Hope Funds for Cancer Research 博后基金支持首轮数据。

**首篇预计**

14–18 个月

**做成之后的下一步**

若确认乳酰化直接调控 TUT4/7 尿苷化活性，下一步是在体内大动物纤维化/代谢模型中验证乳酸水平驱动的 TUT4/7 乳酰化如何影响 miR-29 尿苷化-降解轴及其下游胶原表达，将 D3 与 D2 的组织资源与假设直接打通。

**拥挤程度核查（可复算）**

检索式：`(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab]) AND (lactylation[tiab] OR lactate[tiab]) AND (uridylation[tiab] OR miRNA[tiab])`

| 层级 | 检索式 | 全库命中 |
|---|---|---|
| 单词 | `(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab])` | 136 |
| 单词 | `(lactylation[tiab] OR lactate[tiab])` | 149535 |
| 单词 | `(uridylation[tiab] OR miRNA[tiab])` | 94625 |
| 两两 | `(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab]) AND (lactylation[tiab] OR lactate[tiab])` | 0 |
| 两两 | `(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab]) AND (uridylation[tiab] OR miRNA[tiab])` | 82 |
| 两两 | `(lactylation[tiab] OR lactate[tiab]) AND (uridylation[tiab] OR miRNA[tiab])` | 379 |
| **全交集** | `(TUT4[tiab] OR TUT7[tiab] OR ZCCHC11[tiab]) AND (lactylation[tiab] OR lactate[tiab]) AND (uridylation[tiab] OR miRNA[tiab])` | **0** |

**配套文献与笔记（4 篇）**

#### PMID 42094531 · Mechanism of nucleolytic degradation of human ribosomes.
*bioRxiv : the preprint server for biology 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42094531/)

**一句话结论**　该研究证明饥饿应激下 RIOK3 招募 TUT7 和 DIS3L2 到泛素化的 40S 核糖体，TUT7 对 18S rRNA 3′端加 oligo(U) 尾，DIS3L2 识别尿苷化的 18S rRNA 并行使 3′-5′ 降解，二者构成迭代式"尿苷化-降解"循环。

**与该子方向的关系**　提供方法：其确立的 TUT7 底物特异性识别（招募因子 RIOK3、下游 exonuclease DIS3L2、迭代尿苷化-降解耦联的测序读出策略）是可直接借鉴的生化框架，但底物是 18S rRNA 而非 pre-miRNA/成熟 miRNA，不构成直接竞争；需警惕的是若后续证明 TUT7 存在"泛底物尿苷化偏好"而非乳酰化特异性调控，会削弱 D3-4 假设中"乳酰化改变的是底物选择性"这一核心主张。

**方法要点**　可搬方法：(1) TUT7 免疫共沉淀+测序联用来捕获其在应激状态下的实际结合RNA及尿苷化位点分布；(2) 用条件敲低/敲除 DIS3L2 后测尿苷化中间体积累作为"上游尿苷化酶活性变化"的间接读出，此思路可套用到 miR-29/let-7 体系中区分尿苷化后是否真正被降解；(3) 其"迭代尿苷化-降解"测序分析流程（识别 decay intermediates 并追踪其再尿苷化）可直接用于 D3-4 的 TAIL-seq 数据分析。

**效应量**　【摘要未报告数字】读全文时优先补：TUT7 敲低或 DIS3L2 敲除后 18S rRNA 尾长分布的定量变化（如平均 U 尾长度、accumulation 倍数）、饥饿处理的具体时间点及对应尿苷化 rRNA 比例，这些数字可作为 D3-4 中乳酰化模拟突变体尿苷化活性变化的对照量级参考。

**它暴露/承认的空白**　摘要明确承认"the mechanisms and factors that mediate rRNA decay remain unknown"这一空白已被本文部分填补，但完全未提及代谢信号（如乳酸/乳酰化）如何调控 TUT7 活性或底物选择，这正是 D3-4 要填的空白——即 TUT7 的翻译后修饰状态是否决定其在 rRNA vs miRNA 底物间的选择性。

**我不相信的一件事**　该研究以饥饿诱导 RIOK3-TUT7-DIS3L2 轴降解 18S rRNA，但未排除这是否是 TUT7 的"默认"或"广谱"尿苷化行为（即只要底物被招募到 TUT7 附近就会被尿苷化），若如此，则 D3-4 中"乳酰化特异性改变尿苷化产物长度分布"的假设可能被简化为"乳酰化只是改变了 TUT7 的招募效率而非催化本身"，摘要给出的证据不足以区分这两种机制。

**读全文要核对什么**　【需读全文核对】需确认：(1) RIOK3-TUT7 互作是否依赖 TUT7 特定结构域（是否与 pre-miRNA 结合域重叠）；(2) TUT7 在此通路中是否存在乳酰化位点的质谱数据或至少 PTM 扫描结果；(3) DIS3L2 敲除后 uridylated 18S rRNA 积累的定量图（哪张图）及是否有平行做过成熟 miRNA 尿苷化水平的对照，以判断该系统是否可能干扰或竞争细胞内 TUT7 对 miRNA 底物的可及性。

**一个可执行动作**　我要在 HepG2 高糖酵解 vs 糖酵解抑制体系中，比照本文的 RIOK3-TUT7-DIS3L2 尿苷化-降解测序分析框架，对 TUT7 IP 后同时测 18S rRNA 尾长分布和 pre-let-7/pre-miR-29 尾长分布，预期若乳酰化确实改变 TUT7 底物特异性，则 miRNA 底物的尿苷化产物长度分布变化幅度应显著偏离 rRNA 底物的变化幅度（作为特异性阳性对照）。

#### PMID 42054207 · The long isoform of ZAP coordinates multiple enzymes to mediate complete decay of target transcripts.
*Cell reports 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42054207/)

**一句话结论**　该文证明ZAP长亚型通过结合病毒RNA上的CpG位点，招募KHNYN切割，再由TUT4/TUT7对5′切割片段进行3′尿苷化、DIS3L2降解，3′片段则由XRN1清除，且TRIM25在病毒感染后促进这套酶复合物组装并顺带降低细胞内源转录本水平。

**与该子方向的关系**　竞争风险：本文把TUT4/TUT7尿苷化定位为ZAP/KHNYN切割后"标记降解片段"的下游执行步骤，其底物是被核酸内切酶切开的RNA片段而非完整pre-miRNA/成熟miRNA，这与D3-4假设中"TUT4/7直接对pre-miRNA或成熟miRNA 3′端尿苷化"是不同的分子情境；若读全文发现TUT4/7在此复合物中的识别是"任意断裂RNA的3′OH"而非序列/结构特异性，则可能削弱D3-4里"乳酰化改变TUT4/7对特定miRNA底物选择性"这一前提的特异性论证空间，需要在讨论里明确区分ZMD-uridylation与miRNA-TDMD-uridylation两套底物识别逻辑。

**方法要点**　可直接搬用的方法：(1) RNase-resistant免疫共沉淀检测TUT4/TUT7与上游识别蛋白(此处为ZAP/TRIM25，D3-4里可换成AGO2/ZSWIM8)的相互作用，判断是否存在稳定复合物；(2) TUT4/TUT7介导uridylation后接DIS3L2降解的读出体系（可用于设计D3-4体外重组尿苷化实验的阳性对照反应）；(3) 用病毒感染或细胞刺激前后比较酶复合物组装差异的思路，可套用到乳酸孵育前后TUT4/7-AGO2/ZSWIM8互作变化的检测设计。

**效应量**　摘要未报告数字。读全文时优先补：TUT4/TUT7 uridylation片段的长度分布（尾长几个U）、时间点（分/小时尺度动力学）、以及TRIM25介导互作增强的倍数（免疫共沉淀定量或质谱丰度比），这些可作为D3-4中"乳酰化模拟突变体K→Q vs K→R"尿苷化产物长度对照的量级参照。

**它暴露/承认的空白**　该文明确承认"ZAP isoform如何招募cofactor完成RNA decay此前不清楚"这一空白，本文补上了ZAP-KHNYN-TUT4/7-DIS3L2/XRN1的顺序性机制；但完全未涉及TUT4/7自身翻译后修饰（如乳酰化）是否调控其被招募或催化活性，这正是D3-4要填的空白——即TUT4/7活性调控层，本文只讲了"谁招募谁"而没讲"招募/催化活性本身如何被代谢信号调节"。

**我不相信的一件事**　本文将TUT4/7-uridylation-DIS3L2这一降解模块从ZAP/KHNYN病毒RNA清除系统直接借用来解释一般转录本降解（提到"病毒感染也降低细胞转录本丰度"），但未区分这种细胞转录本下降是TRIM25-TUT4/7复合物直接作用于内源RNA，还是病毒感染引发的全局应激/干扰素反应导致的间接转录抑制，此因果链条摘要未做区分，若不能验证直接作用则不能作为"TUT4/7广谱降解能力"的证据支持D3-4的机制类推。

**读全文要核对什么**　【需读全文核对】需要确认：(1) TUT4/TUT7在此复合物中结合/催化的具体RNA底物是否要求特定序列/结构（如CpG簇附近切割位点）还是任意3′OH末端，决定其与miRNA尾巴尿苷化机制的可类比性；(2) RNase-resistant共沉淀实验的对照组设置（是否有TUT4/7催化死突变体或KHNYN切割位点突变体作为特异性对照）；(3) 是否有质谱数据展示TUT4/TUT7或TRIM25自身的翻译后修饰谱（尤其是否检测过乳酰化位点），若完全未检测则明确此文未覆盖D3-4所需信息。

**一个可执行动作**　我要在HepG2细胞体系里，参照本文的RNase-resistant免疫共沉淀方法检测乳酸孵育（vs 2-DG/UK5099抑制）前后TUT4/TUT7与AGO2/ZSWIM8的互作变化，并借用本文"切割片段uridylation-DIS3L2降解"读出逻辑设计体外重组pre-let-7/pre-miR-29底物+UTP尿苷化产物长度分布实验，预期乳酰化模拟K→Q突变体较K→R突变体产生更长/更短尾长分布且伴随成熟miRNA降解速率改变，同时通过3′RACE/TAIL-seq区分成熟体而非pri/pre-miRNA变化以排除转录层混淆。

#### PMID 41608885 · MiRNA Stability and Degradation: Dynamic Regulators of Cellular Regulatory Networks.
*Wiley interdisciplinary reviews. RNA 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/41608885/)

**一句话结论**　这是一篇综述，系统整合了miRNA周转的三条降解路径（ZSWIM8-TDMD、TUT4/7-DIS3L2尿苷化、核酸酶切割），并将其与AGO结合、末端修饰、序列特征等稳定性因子并列讨论，重点提出TDMD释放后miRNA由哪些核酸酶降解、以及肠腔/循环等区室特异性降解机制这两个悬而未决的问题。

**与该子方向的关系**　支持前提：它把TUT4/7-DIS3L2尿苷化列为miRNA周转的核心机制之一，并强调其与AGO结合、末端修饰的整合调控，为D3-4"TUT4/7乳酰化改变尿苷化活性"的假设提供了机制框架层面的合法性，但并未涉及乳酸/乳酰化对该通路的调控，因此不构成方法或数据支持，只是背景合法性。

**方法要点**　摘要未描述具体实验方法（本文为综述而非原始研究），无法直接搬用任何湿实验方案；但其框架提示需要在读全文时留意其引用的TUT4/7-DIS3L2生化重构实验方法学（如尿苷化产物检测手段），可能为体外重组尿苷化活性实验提供技术参考。

**效应量**　【摘要未报告数字】读全文时优先补：TUT4/7介导的尿苷化速率、产物尿苷长度分布的定量范围（如1-mer vs oligo-U比例）、以及DIS3L2降解半衰期数据，这些可作为D3-4实验中判断乳酰化是否改变尿苷化活性的正常对照基线值。

**它暴露/承认的空白**　摘要明确指出"identifying nucleases responsible for degrading TDMD-liberated miRNAs"和"compartment-specific degradation mechanisms"是未解决问题，前者落在方向1（TDMD后续降解酶未知），后者提示D3-4子方向若涉及不同亚细胞区室（如线粒体乳酸浓度梯度）的TUT4/7活性差异也是空白，但摘要完全未提及翻译后修饰（尤其乳酰化）对TUT4/7或ZSWIM8活性的调控，这正是D3-4聚焦的核心空白。

**我不相信的一件事**　该综述将TUT4/7-DIS3L2途径与AGO结合、末端修饰并列为独立稳定性因子，但未讨论这些因子之间是否存在代谢信号（如糖酵解/乳酸水平）驱动的交叉调控整合机制，若TUT4/7活性确实受乳酰化调控，则该综述的"独立因子并列"框架可能低估了代谢状态对多条降解路径的同步、协同调控，需要读全文核实其是否讨论过translational/PTM层面的上游调控因子。

**读全文要核对什么**　【需读全文核对】需确认：1）综述中关于TUT4/7催化域/RNA结合域结构生物学部分是否提及任何已知翻译后修饰位点（乙酰化/乳酰化/磷酸化）及其对尿苷化产物长度的影响；2）其列出的"TDMD释放miRNA降解核酸酶未知"这一空白部分是否引用了与ZSWIM8-S608/S609磷酸化相关的最新文献，判断与方向1的空白是否重叠；3）图表中是否有TUT4/7结构域示意图标注乳酸化可能作用的关键赖氨酸位点，供K→Q/K→R突变体设计参考。

**一个可执行动作**　我要在HepG2细胞和胰岛类器官体系中，先按此综述提示的TUT4/7-DIS3L2尿苷化-降解框架为背景，设计乳酸钠孵育/LDHA过表达 vs 2-DG/UK5099对照的3组×3重复实验，预期高糖酵解组TUT4/7免疫共沉淀后pan-lactyl-lysine信号增强，并伴随体外重组尿苷化产物长度分布向寡聚U方向偏移，从而首次建立乳酰化-TUT4/7催化活性的直接因果证据，填补该综述未触及的PTM调控空白。

#### PMID 41176264 · Loss of nutritionally relevant microRNAs in cow milk-based infant formulas compared with raw camel and buffalo milk reveals molecular and functional disparities.
*Journal of dairy science 2025* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/41176264/)

**一句话结论**　该文用高通量小RNA测序比较骆驼奶、水牛奶与婴儿配方奶粉中miRNA谱，发现原奶富含let-7、miR-2887、miR-2904、miR-1246等发育/免疫相关miRNA，而配方奶粉中miRNA多样性与丰度显著下降；蛋白互作分析将TUT4列为高表达miRNA靶点的中心调控枢纽之一。

**与该子方向的关系**　竞争风险：本文虽提到TUT4，但只是把它作为miRNA靶基因网络中的一个下游/关联节点（受乳源miRNA调控的枢纽基因），完全未涉及TUT4本身被乳酰化或其尿苷化酶活性的问题；与D3-4"TUT4/7被乳酰化后改变尿苷化活性"的分子机制假设没有实质交集，仅在"TUT4是重要RNA稳态调控因子"这一大方向上有背景关联，需在文中明确声明二者研究层次不同（靶基因表达调控 vs 翻译后修饰-酶活性）。

**方法要点**　可搬的方法：高通量small RNA-seq流程用于比较不同处理条件下miRNA谱系差异，这正是他技能清单中缺失的small RNA-seq，可考虑借鉴其建库/差异表达分析流程用于D3-4中乳酸处理组vs抑制组的miRNA谱变化；此外其蛋白互作网络分析（PPI）思路可用于后续筛选乳酰化修饰是否波及TUT4互作的其他RNA结合蛋白。

**效应量**　摘要未报告数字，读全文时优先补：配方奶粉相对原奶miRNA多样性/丰度下降的具体倍数或百分比、TUT4在PPI网络中的连接度(degree)或富集显著性数值(p值/FDR)，以及let-7、miR-1246等具体miRNA的定量表达差异。

**它暴露/承认的空白**　该研究明确指出配方奶粉中功能性RNA成分（含miRNA及其加工相关基因产物）大量丢失，暴露了"乳源miRNA稳态调控网络中哪些酶（如TUT4）在不同代谢/加工条件下如何被调节"这一空白，恰好落在D3-4子方向——即TUT4/7本身的翻译后修饰调控层面尚属空白，本文未触及。

**我不相信的一件事**　本文将TUT4列为"central regulatory hub"仅依据其作为高表达miRNA的预测靶基因出现在PPI网络中，这只是miRNA-mRNA靶向关系的生物信息学推断，并未做任何湿实验验证TUT4蛋白水平、活性或修饰状态的变化，因此"TUT4参与RNA processing枢纽"的结论证据强度非常弱，不能外推到TUT4催化活性或乳酰化状态的功能性推论。

**读全文要核对什么**　【需读全文核对】需确认PPI网络图中TUT4的连接节点具体是哪些miRNA及其靶基因、TUT4是通过何种数据库/算法（如miRTarBase、STRING）被识别为hub、是否有任何附加实验（如qPCR/western）验证TUT4蛋白表达变化，以及原始数据中是否可获取骆驼奶/水牛奶miRNA表达矩阵用于比对D3-4实验中乳酸处理后miRNA谱的背景对照。

**一个可执行动作**　我要在HepG2细胞乳酸钠孵育vs 2-DG抑制糖酵解体系中，参考该文small RNA-seq建库分析流程，对TUT4/7尿苷化产物进行3′端测序，预期若TUT4被乳酰化后尿苷化活性上调，则高乳酸组中let-7/miR-29成熟体3′端尿苷化长度分布会显著右移，且此效应独立于该文所示的靶基因表达调控层面变化。


## D3-5 · 肿瘤类器官乳酸-miRNA落点
**层次：** 疾病落点　｜　**拥挤程度：** 极少（≤10）（两两最小共现 9 篇，全交集 0 篇）　｜　**首篇预计：** 12–15 个月

> **假设：** 若在他已有的胃癌/CSFV相关类器官及大动物纤维化组织中高糖酵解状态下检测乳酰化机器组件富集度，则某一特定组织（如高乳酸胃癌类器官）呈现miR-29/miR-33/miR-375稳态改变，提示该疾病为最佳落点

**科学前提**

[已发表] Zou 在 iScience 2022 一作证明乳酸经胆固醇合成通路促进 CSFV 复制，说明他的胃癌/病毒感染类器官体系天然具有高糖酵解-高乳酸表型，可直接测量内源乳酸浓度梯度。[已发表] 非组蛋白乳酰化已有多个先例，部分底物为 RNA 结合蛋白或代谢酶，提示乳酰化可修饰核酸结合口袋残基。[本项目计算] 632 篇候选池检索中未见任何"乳酸/乳酰化直接作用于 miRNA 降解机器（AGO2/ZSWIM8/TUT4-7）"的报道，此为假设生成级判断，不构成机制证据。[待测] 若乳酰化真实修饰这些组件，则疾病落点应表现为：高乳酸组织/类器官中 AGO2/ZSWIM8/TUT4-7 乳酰化信号高于低乳酸对照，且伴随 miR-29/33/375 成熟体（非 pri/pre）稳态改变。

**第一个关键实验**

在他现有的胃癌类器官（高乳酸组）与配对的正常/低糖酵解类器官（低乳酸组）中，先用乳酸检测试剂盒对每份类器官测定胞内乳酸浓度分层，然后对 AGO2、ZSWIM8、TUT4、TUT7 做免疫沉淀后 pan-Kla（抗乳酰化）western blot，读出各蛋白乳酰化条带相对总蛋白的比值；同批次类器官分 RNA 做 TaqMan qPCR 分别定量 miR-29/33/375 的 pri-miRNA、pre-miRNA 和成熟体三种形式。每组至少 3 个独立类器官系、每系 3 次生物学重复（n≥9/组），时间点为常规传代第 5–7 天糖酵解稳态期。

**必须的对照**

阴性对照：2-DG 或糖酵解抑制剂处理同一类器官系降低乳酸后重复 IP-western，乳酰化信号应下降。竞争解释排除的核心对照：同时定量 pri/pre-miRNA（qPCR 探针针对 stem-loop 区）与成熟体（TaqMan 成熟体特异性探针），若乳酰化组仅成熟体下降而 pri/pre 不变或升高，方可排除 TGF-β/Smad3 转录层抑制这一竞争解释；若 pri/pre 也同向下降，则提示转录层贡献，需回退方向2框架重新设计。另设 IgG-IP 阴性对照及非乳酰化敏感蛋白（如 GAPDH 或已知不被乳酰化的核酸结合蛋白）作为特异性对照。

**为什么是他能做**

这个子方向的可行性完全建立在他已有的两项独特资产上：其 iScience 2022 一作论文已确立类器官/细胞系中乳酸-胆固醇代谢轴的检测流程与试剂体系，可直接迁移到乳酰化-miRNA 检测；他的胃癌代谢一作经历意味着他对高糖酵解肿瘤类器官的建立、传代与代谢表型分层已有实操经验，不需要重新摸索模型。他同时具备 CRISPR 内源编辑能力，为后续验证乳酰化位点突变体（如 K→R 不可乳酰化突变）提供了直接工具，这是多数单纯做代谢或单纯做 miRNA 的实验室都不具备的组合。

**可行性**

已有：类器官培养与代谢表型分层（他自己的核心技能）、qPCR/IHC。需新学：pan-Kla 免疫沉淀-western 流程（预计 1–2 个月自学或参考已发表乳酰化组学方法即可上手，非高难度）。需合作：质谱验证具体乳酰化位点（他明确缺质谱资源，需寻找合作者做 IP-MS 定位赖氨酸位点，此步骤为封闭该子方向证据链的关键瓶颈，若无质谱合作者此子方向只能停留在相关性层面）。起步成本低，可用现有冻存类器官系立即启动第一轮筛选。

**最大风险与放弃条件**

最大风险：类器官内乳酸浓度分层与蛋白乳酰化信号之间可能只是弱相关或不相关（乳酰化本身受多种酰基供体竞争调控，未必跟随乳酸浓度线性变化）。放弃条件（需同时满足）：(1) 2-DG 处理后 AGO2/ZSWIM8/TUT4-7 的 pan-Kla 信号无统计学显著下降（三次独立重复 t 检验 p>0.05），且 (2) 高乳酸组与低乳酸组之间 miR-29/33/375 成熟体水平无差异（fold change <1.3 且 p>0.05）。若上述两条同时成立，则判定该疾病落点不成立，退回 D3 主线中更上游的体外生化子方向（先在纯化蛋白体系确认乳酰化本身是否发生，再决定是否值得回到类器官）。

**目标期刊与基金**

目标期刊：Cell Metabolism 或 Nature Metabolism（代谢-RNA 交叉的旗舰期刊）；适配基金机制：NIH K99/R00（他博后转 PI 阶段的标准过渡机制）或 NCI 的 R21（高风险探索性机制，适合"真空白"身份标签型工作）。

**首篇预计**

12–15 个月

**做成之后的下一步**

若类器官相关性成立，下一步是与质谱合作者定位具体乳酰化赖氨酸位点，并用他的 CRISPR/ABE/BE4 技能在内源位点做 K→R 不可乳酰化突变体，直接检验该位点突变是否阻断类器官中 miR-29/33/375 成熟体的乳酸依赖性降解。

**拥挤程度核查（可复算）**

检索式：`(lactylation[tiab] OR lactate[tiab]) AND (AGO2[tiab] OR ZSWIM8[tiab] OR TUT4[tiab] OR TUT7[tiab]) AND (organoid[tiab] OR "gastric cancer"[tiab])`

| 层级 | 检索式 | 全库命中 |
|---|---|---|
| 单词 | `(lactylation[tiab] OR lactate[tiab])` | 149535 |
| 单词 | `(AGO2[tiab] OR ZSWIM8[tiab] OR TUT4[tiab] OR TUT7[tiab])` | 2345 |
| 单词 | `(organoid[tiab] OR "gastric cancer"[tiab])` | 112181 |
| 两两 | `(lactylation[tiab] OR lactate[tiab]) AND (AGO2[tiab] OR ZSWIM8[tiab] OR TUT4[tiab] OR TUT7[tiab])` | 9 |
| 两两 | `(lactylation[tiab] OR lactate[tiab]) AND (organoid[tiab] OR "gastric cancer"[tiab])` | 512 |
| 两两 | `(AGO2[tiab] OR ZSWIM8[tiab] OR TUT4[tiab] OR TUT7[tiab]) AND (organoid[tiab] OR "gastric cancer"[tiab])` | 36 |
| **全交集** | `(lactylation[tiab] OR lactate[tiab]) AND (AGO2[tiab] OR ZSWIM8[tiab] OR TUT4[tiab] OR TUT7[tiab]) AND (organoid[tiab] OR "gastric cancer"[tiab])` | **0** |

**配套文献与笔记（4 篇）**

#### PMID 39870617 · Targeting glycolytic reprogramming by tsRNA-0032 for treating pathological lymphangiogenesis.
*Cell death & disease 2025* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/39870617/)

**一句话结论**　tsRNA-0032 通过与 Ago2 结合、靶向 PKM2 抑制糖酵解（降低丙酮酸和乳酸水平及ATP产生），从而抑制淋巴内皮细胞增殖迁移和角膜淋巴管新生；移植排斥角膜中该 tsRNA 下调而 PKM2 上调。

**与该子方向的关系**　竞争风险：本文提示的是"小 RNA（tsRNA/Ago2 复合物）调控糖酵解→乳酸水平"这一因果方向（RNA→代谢），与 D3-5 假设的"乳酸/乳酰化→修饰 AGO2/ZSWIM8/TUT4-7→重编程 miRNA稳态"（代谢→RNA机器）方向相反，若在类器官中检测到乳酸与 Ago2 相关变化，需先排除是否是 Ago2/相关小RNA先改变了糖酵解再反馈影响乳酸，而非乳酸直接乳酰化修饰蛋白这一路径。

**方法要点**　可搬用的方法：其检测胞内丙酮酸/乳酸水平的代谢检测试剂盒流程与其"tsRNA过表达后测ATP、丙酮酸、乳酸"的实验设计逻辑可直接对应到D3-5胃癌类器官高/低乳酸分层实验中作为乳酸浓度分层的方法参照；其"RNA-蛋白互作（Ago2 RIP/RNA pull-down）"验证策略也可迁移用于检验候选小RNA是否与ZSWIM8/TUT4-7直接互作，但本文未做乳酰化western blot，无法直接搬用pan-Kla IP-WB环节。

**效应量**　摘要中未给出具体数值倍数（无精确fold-change或百分比数字），仅描述"significantly decreased/reduced/elevated"等方向性描述；【摘要未报告数字】读全文时优先补：tsRNA-0032过表达后HLEC中乳酸/丙酮酸/ATP的具体下降幅度、角膜移植患者组织中tsRNA-0032与PKM2表达变化的定量数据（fold change或统计值）。

**它暴露/承认的空白**　该研究暴露的空白是：糖酵解代谢物（乳酸、丙酮酸）水平变化被证明是tsRNA-PKM2轴的下游结果，但完全未探讨乳酸本身是否能反向修饰（乳酰化）RNA结合蛋白或RNA降解机器（如Ago2、TUT酶等），这恰好是D3-5子方向要填补的"乳酸→蛋白乳酰化→miRNA稳态"这一反向因果空白。

**我不相信的一件事**　本文将tsRNA-0032对乳酸/丙酮酸降低的效应完全归因于"靶向PKM2抑制糖酵解"这一单一机制，但未排除tsRNA-0032与Ago2结合后是否通过经典miRNA样机制间接调控其他糖酵解相关基因（如HK2、LDHA），也未验证PKM2敲低/回补是否能完全逆转乳酸表型，故"PKM2为唯一关键靶点"的因果链证据尚不完整。

**读全文要核对什么**　【需读全文核对】需确认：(1)乳酸/丙酮酸检测所用具体试剂盒及类器官/细胞裂解后检测的标准化对照（如是否按细胞数或蛋白量归一化）；(2)tsRNA-0032与Ago2的RIP-qPCR或RNA pull-down实验的阴性对照（IgG对照、非靶RNA对照）设置；(3)角膜移植患者样本量、配对donor/recipient的具体来源及是否做过其他炎症/代谢混杂因素校正。

**一个可执行动作**　我要在他已有的胃癌类器官高乳酸/低乳酸分层体系中，先用同款代谢检测试剂盒测定胞内乳酸/丙酮酸水平做分层（借鉴本文的检测流程），再对PKM2和ZSWIM8/TUT4/TUT7/AGO2同时做表达谱和乳酰化IP-WB，预期若乳酸升高伴随PKM2表达升高但ZSWIM8/TUT4-7乳酰化条带无显著变化，则提示该胃癌类器官中糖酵解-乳酸通路主要通过PKM2经典机制而非乳酰化修饰RNA降解机器发挥作用，从而帮助判断该疾病落点是否值得优先投入乳酰化机制研究。

#### PMID 35778755 · Aberrant miR-874-3p/leptin/EGFR/c-Myc signaling contributes to nasopharyngeal carcinoma pathogenesis.
*Journal of experimental & clinical cancer research : CR 2022* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/35778755/)

**一句话结论**　这篇发现leptin/EGFR/AKT/c-Myc轴在鼻咽癌中驱动糖酵解与增殖侵袭，且miR-874-3p经AGO2通路负向调控leptin表达，形成miR-874-3p-leptin-糖酵解负反馈环。核心是"糖酵解促进因子被单个miRNA靴调控"，而非乳酰化修饰miRNA稳态机器本身的问题。

**与该子方向的关系**　竞争风险：本文与D3-5子方向撞在"糖酵解状态与AGO2/miRNA互作"这一交叉点上——但方向不同，本文是miRNA(经AGO2)调控糖酵解表型基因(leptin)，而D3-5要证明的是糖酵解代谢产物(乳酸/乳酰化)反向修饰AGO2/ZSWIM8/TUT4-7蛋白本身，二者因果箭头相反，需在检索与文献综述中明确切割，避免被审稿人误认为重复叙事。

**方法要点**　可搬方法：AGO2-RIP assay验证miRNA-AGO2-靶mRNA复合物存在，可直接搬用于他的类器官体系中检验乳酰化AGO2是否仍保留正常RIP结合能力（乳酰化是否影响AGO2-miRNA复合物组装）；ELISA测乳酸/葡萄糖消耗的方法可作为他"乳酸浓度分层"步骤的平行验证工具。

**效应量**　摘要未报告具体数值（未给出leptin/miR-874-3p表达倍数、乳酸产量绝对值或生存分析HR等数字）。读全文时优先补：leptin过表达/沉默后乳酸产量的具体倍数变化、miR-874-3p与leptin表达的相关系数r值，以及NPC患者队列中leptin高低表达组的生存曲线HR和p值，这些可作为他类器官乳酸分层设计的效应量参照基准。

**它暴露/承认的空白**　本文明确承认leptin调控糖酵解与EMT的下游机制"remain ambiguous"直至本研究，说明糖酵解表型基因如何被miRNA网络精细调节仍是空白；但完全未触及糖酵解终产物乳酸能否通过乳酰化反向修饰AGO2等miRNA降解机器蛋白——这正是D3-5子方向要填补的空白，本文只解释了"上游miRNA→糖酵解基因"单向箭头，未涉及"糖酵解→乳酰化→miRNA机器"反向环路。

**我不相信的一件事**　本文AGO2-RIP结果仅证明miR-874-3p与AGO2复合物结合、进而调控leptin mRNA，但未检验AGO2蛋白本身是否发生乳酰化修饰或该修饰是否影响其RIP结合效率，因此不能推断"高糖酵解状态下AGO2功能改变"是否经由乳酰化这一具体分子机制，其糖酵解与miRNA调控之间的联系仍停留在表型关联层面而非蛋白翻译后修饰层面。

**读全文要核对什么**　【需读全文核对】需确认：(1)AGO2-RIP assay的具体阴性对照（IgG对照、AGO2敲低对照）设置方式与富集倍数计算方法；(2)leptin沉默/过表达组的乳酸产量ELISA原始数据图及统计检验方法，判断其检测灵敏度是否达到类器官微量样本可比水平；(3)图中miR-874-3p与leptin负相关的散点图及相关系数计算所用样本量，以评估其统计效力是否可迁移参考。

**一个可执行动作**　我要在他现有的胃癌高乳酸/低乳酸配对类器官体系中，借鉴本文AGO2-RIP方法，在乳酸分层基础上对AGO2做免疫沉淀后同时检测pan-Kla乳酰化条带与RIP-qPCR的miR-29/33/375结合效率，预期若高乳酸组AGO2乳酰化增强且伴随其RIP富集miRNA能力下降，则支持乳酸→AGO2乳酰化→miRNA稳态改变这一D3-5核心假设，且能与本文"miRNA→leptin→糖酵解"的反向因果链区分开来。

#### PMID 34887515 · Supermeres are functional extracellular nanoparticles replete with disease biomarkers and therapeutic targets.
*Nature cell biology 2022* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/34887515/)

**一句话结论**　该文鉴定出一种区别于小细胞外囊泡（sEV）与exomere的新型细胞外纳米颗粒supermere，其富集AGO2、糖酵解酶、TGFBI、miR-1246等癌相关cargo，并证明癌源supermere能升高受体细胞乳酸分泌、传递cetuximab耐药、改变肝脏脂质与糖原代谢。

**与该子方向的关系**　竞争风险：该文提出AGO2/miRNA的胞外分泌载体（supermere）而非胞内乳酰化机制来解释miRNA稳态与乳酸/代谢的关联，若他的D3-5假设成立的表型（如miR-29/33/375稳态改变）也可能是类器官分泌supermere带走AGO2-miRNA复合物所致，而非AGO2/ZSWIM8/TUT4-7被乳酰化修饰，需要在类器官上清中排查supermere贡献才能保住"胞内乳酰化"这一因果链。

**方法要点**　可搬方法：差速超速离心/密度梯度分离sEV-exomere-supermere三组分的纳米颗粒分级流程，以及对分离组分做AGO2 western blot和RNA-seq定量胞外RNA分布，这套分级方案可直接用于他类器官培养上清的乳酸/AGO2共变关系排查，作为IP-pan-Kla实验前的必要对照层。

**效应量**　摘要未报告具体数值（如乳酸浓度倍数、AGO2富集倍数或miR-1246 fold-change）。读全文时优先补：supermere与sEV/exomere中AGO2蛋白量的定量比较（WB或质谱强度比）、癌源supermere处理后受体细胞/动物体内乳酸分泌的绝对或倍数变化、以及miR-1246在三种颗粒中的相对丰度比值。

**它暴露/承认的空白**　该文承认supermere的功能全貌与其RNA/蛋白cargo如何被选择性分选的机制仍不清楚，尤其未探讨AGO2是否携带乳酰化修饰或TUT4/7是否存在于该颗粒中，这一空白正落在D3-5子方向——即乳酰化机器组件在胞内外分布及其对miRNA稳态贡献的问题上。

**我不相信的一件事**　该文将"cancer-derived supermeres increase lactate secretion"作为因果表型陈述，但摘要未说明是否排除了供体细胞本身糖酵解状态对乳酸测定的混杂效应，也未说明AGO2在supermere中是否具有miRNA降解或稳定功能而非单纯货物性存在，因此"supermere→乳酸升高"这一因果方向本身需要功能性阻断实验（如敲低supermere特异分选蛋白）才能成立，仅凭外源处理后乳酸升高的关联无法排除受体细胞被supermere激活了独立于AGO2的糖酵解通路。

**读全文要核对什么**　【需读全文核对】需确认图中supermere分离纯度对照（是否有sEV/exomere交叉污染标记物如CD9/CD63/TSG101的WB排除图）、AGO2在supermere中定量所用的具体细胞系及是否为胃癌来源、以及"increase lactate secretion"实验的给药剂量、给药时间点和乳酸检测方法（试剂盒品牌/酶法vs质谱）是否与他计划用的乳酸检测试剂盒可比。

**一个可执行动作**　我要在已有的胃癌类器官高乳酸/低乳酸配对体系中，先按该文的差速离心分级流程分离类器官上清中的sEV、exomere与supermere三组分，再对每组分做AGO2/ZSWIM8/TUT4/TUT7 western blot定量分布，预期若高乳酸组类器官的AGO2主要富集在supermere而非胞内可被pan-Kla免疫沉淀的部分，则提示其miR-29/33/375稳态改变部分由AGO2胞外分泌而非乳酰化驱动，需相应修正D3-5的机制归因。

#### PMID 34877498 · Role of extracellular microRNA-146a-5p in host innate immunity and bacterial sepsis.
*iScience 2025* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/34877498/)

**一句话结论**　该文证明血浆中游离 miR-146a-5p（单链、非双链前体）通过含 UU motif 直接激活 TLR7→MyD88 通路，先致炎（IL-6 storm）后经 IRAK-1 蛋白快速降解致免疫耐受，而其双链前体则走经典 Ago2-3'UTR 沉默 Irak-1 通路；miR-146a KO 小鼠脓毒症存活率改善、器官损伤减轻。血浆 miR-146a-5p 浓度与血乳酸及凝血病两项脓毒症预后指标显著相关。

**与该子方向的关系**　竞争风险：本文把"血乳酸水平"仅当作脓毒症结局的下游生物标志物与 miR-146a-5p 浓度做相关性分析，完全没有涉及乳酸/乳酰化对 miRNA 稳态机器（AGO2/ZSWIM8/TUT4/7）的直接修饰，与 D3-5 假设的"乳酸驱动乳酰化→miRNA降解机器活性改变"机制无关，若不加区分引用容易被审稿人质疑是"血乳酸-miRNA相关性"文献堆砌而非机制证据，需在写作时明确声明二者层次不同（相关性 vs 修饰机制）。

**方法要点**　可直接搬用：small RNA sequencing 用于血浆/类器官 ex-miRNA 谱系鉴定的分层策略（murine + human 双验证）可作为他后续若要做 smallRNA-seq（目前缺技能）的参照流程；miRNA duplex vs 单链前体功能分离的设计思路（合成单链 mimic vs duplex precursor 分别转染）可搬到他区分 pri/pre vs 成熟体乳酰化效应的实验设计中，用于排除转录抑制类竞争解释。

**效应量**　摘要未报告数字，读全文时优先补：miR-146a-5p 血浆浓度与血乳酸的相关系数(r值)、IL-6 storm 在 KO vs WT 小鼠的绝对浓度差异、脓毒症患者队列样本量及生存率百分比数字。

**它暴露/承认的空白**　该文承认的空白是"细胞外单链 miRNA 通过 TLR7 的免疫刺激机制"此前未被充分描述，落在 D3 方向上体现为：乳酸代谢状态与 miRNA 稳态机器（乳酰化修饰）之间的直接因果空白仍完全未被此文或任何文献填补，本文只是提供了乳酸作为结局标志物的间接关联背景。

**我不相信的一件事**　本文将血浆乳酸单纯作为脓毒症严重度的下游读出指标，未检验反向因果（即高乳酸/糖酵解本身是否通过乳酰化直接调控 miR-146a 或其加工机器 AGO2/TUT4/7 的活性），因此"乳酸浓度与miR-146a-5p 相关"这一相关性结论无法排除两者同为脓毒症严重度共同下游效应而非因果链条，D3 假设若照搬这种相关性设计将面临同样的因果混杂质疑。

**读全文要核对什么**　【需读全文核对】需确认：(1)血乳酸与 miR-146a-5p 相关性分析的具体统计方法及是否做了多变量校正（排除脓毒症严重度这一共同混杂因素）；(2)IRAK-1 蛋白降解实验中蛋白酶体抑制剂对照及降解动力学时间点设置；(3)TLR7 激活实验是否设置了乳酸/糖酵解干预组作为阳性对照，若无则确认本文与乳酰化机制完全无交集；(4)human 脓毒症队列的乳酸检测方法（血浆酶法 vs 全血气体分析）是否与他计划用于类器官的乳酸检测试剂盒可比。

**一个可执行动作**　我要在自己的胃癌类器官高乳酸/低乳酸分层体系中，同步检测 miR-146a-5p（单链胞外形式 vs 前体）而非仅限 miR-29/33/375，预期若乳酸/乳酰化机制成立，高乳酸组胞外单链 miR-146a-5p 应与 AGO2/TUT4/7 乳酰化条带比值同步上升，且需设置乳酸干预（外源乳酸孵育/LDH 抑制剂）而非仅相关性分层，以避免重复该文"相关而非因果"的设计缺陷。


## D3-6 · 乳酰化位点定量检测平台
**层次：** 方法工具　｜　**拥挤程度：** 词对无共现（两两最小共现 0 篇，全交集 0 篇）　｜　**首篇预计：** 14–18 个月（含质谱合作等待、抗体制备验证周期，较其他子方向更长因涉及从零建立检测平台）。

> **假设：** 若建立基于自制杂交瘤单抗的乳酰化位点特异性抗体结合smallRNA-seq/半衰期测定流程，则可在无需持续外部质谱合作的情况下常规化定量乳酸对miRNA机器的修饰-功能关联

**科学前提**

[已发表] 非组蛋白乳酰化已有多个先例，其中包含 RNA 结合/代谢相关酶，说明 Kla（lactylation）修饰在细胞内广泛存在并可调控蛋白功能。[已发表] Zou 本人 iScience 2022 一作工作证明乳酸经胆固醇合成通路促进 CSFV 复制，确立了他对乳酸信号下游效应通路的实验直觉与检测手段。[本项目计算] 基于 632 篇候选池检索未见任何"乳酸/乳酰化直接修饰 miRNA 降解机器组件（AGO2/ZSWIM8/TUT4-7）"的报道，为真空白假设，尚无质谱或抗体证据支持具体修饰位点，需从零建立。[待测] AGO2/ZSWIM8/TUT4-7 是否存在可被泛乳酰化抗体识别的赖氨酸位点，以及该位点是否落在功能结构域（如 AGO2 PAZ/PIWI、ZSWIM8 SWIM 结构域、TUT7 catalytic domain）内。

**第一个关键实验**

先用商品化泛乳酰化(pan-Kla)抗体对 HepG2/胃癌类器官在高乳酸（10-20 mM 乳酸钠，24-48h）vs 对照葡萄糖培养条件下做 AGO2/ZSWIM8/TUT4/TUT7 免疫沉淀后 Western blot，确认四个蛋白中哪些存在乳酰化信号及信号是否随乳酸剂量/时间上升；阳性蛋白送质谱合作者做位点定位（n=3 生物学重复/条件）。定位出候选位点（预期 1-3 个 K 位点）后，用杂交瘤技术制备位点特异性乳酰化单抗，ELISA/Western 验证特异性（乳酰化肽 vs 非修饰肽 vs 其他酰化如乙酰化肽竞争）。抗体验证通过后，在同一高乳酸体系下做该蛋白的 smallRNA-seq（miR-29/33/375 及全谱）和 actinomycin D chase 半衰期测定，比较野生型乳酰化位点 vs CRISPR/ABE 敲入的 K→R（不可乳酰化）或 K→Q（模拟乳酰化）细胞系中 miRNA 稳态差异。

**必须的对照**

必须设置乳酸脱氢酶抑制剂（如 oxamate）或糖酵解抑制剂(2-DG)组以确认信号依赖糖酵解而非乳酸盐渗透压效应；必须设置乙酰化(pan-Kac)、丁酰化等其他酰化抗体平行检测以排除泛乳酰化抗体交叉反应；必须做 K→R 位点突变对照以证明表型依赖该特定赖氨酸而非乳酸的其他下游代谢效应（如 pH、渗透压）；关键：必须分别检测 pri-miR-29/pri-miR-33/pri-miR-375（RT-qPCR）与成熟体（smallRNA-seq/TaqMan）双层读出，若乳酸仅改变 pri/pre 比例而成熟体半衰期不变，则提示转录/加工层效应（如经 TGF-β/Smad3 或 Drosha 通路）而非降解机器修饰，须排除后才能声称"重编程 miRNA 稳态"。

**为什么是他能做**

他在 iScience 2022 一作论文中已建立乳酸处理体系并证明其下游胆固醇合成效应，具备乳酸生物学实验直觉和读出体系可直接复用于本方向。他掌握杂交瘤单抗制备技术，可自主完成位点特异性乳酰化抗体从头制备，这是本子方向能否摆脱持续质谱依赖的核心瓶颈解决手段。他有 CRISPR/ABE/BE4 内源位点编辑经验，可直接做 K→R/K→Q 敲入验证抗体特异性与功能因果性，并有类器官平台承载高乳酸处理体系。

**可行性**

已有：乳酸处理体系、类器官培养、CRISPR/ABE 内源编辑、杂交瘤单抗制备（均为其已发表/已掌握技能，无需学习周期）。需新学：smallRNA-seq 数据分析（估计 3-4 个月自学或找生信合作者）、半衰期测定实验流程（actinomycin D chase，估计 1-2 个月摸条件）。需合作：质谱位点定位为必须外部合作环节，起步阶段（IP-MS 位点鉴定）预计需 2-3 个月等待周期，这是唯一无法内部化的步骤，一旦位点确定即可转入抗体自制流程摆脱持续依赖。

**最大风险与放弃条件**

最大风险是四个候选蛋白（AGO2/ZSWIM8/TUT4/TUT7）在泛 Kla 抗体 IP-Western 中均无阳性信号，或阳性信号在 oxamate/2-DG 糖酵解抑制组不消失（提示非乳酸特异）。放弃条件为：若初筛 IP-Western 三次生物学重复中四个蛋白均未见乳酸剂量依赖性 Kla 信号增强（信噪比<1.5倍対照），或质谱未能在阳性蛋白上定位到可靠位点（覆盖度不足或位点定位置信度<95%），则终止本子方向，退回 D3 下其他更早期验证性子方向（如先用现成 pan-Kla 抗体做描述性筛选而非直接建平台）。次要放弃条件：若 K→R 突变细胞系中 miRNA 半衰期与野生型无统计学差异（two-way ANOVA p>0.05，n≥3），且 pri-miRNA 水平也未改变，则判定该位点非功能性，需重新筛选其他候选位点或终止。

**目标期刊与基金**

早期方法学结果可投 RNA 或 Nucleic Acids Research 方法学专刊，完整功能关联结果目标 Molecular Cell 或 Nature Communications；适配基金机制为 NIH K99/R00（他目前博后阶段过渡型基金）或 NIH R21（探索性/高风险高回报机制，契合真空白假设定位）。

**首篇预计**

14–18 个月（含质谱合作等待、抗体制备验证周期，较其他子方向更长因涉及从零建立检测平台）。

**做成之后的下一步**

平台建成并确认至少一个功能性乳酰化位点后，下一步是将该位点特异性抗体用于代谢应激大动物模型（如糖尿病/纤维化模型）组织切片做 IHC 定量，检验乳酰化水平与 miR-29/33/375 稳态的组织内相关性，衔接方向1/2 的体内验证需求。

**拥挤程度核查（可复算）**

检索式：`(lactylation[tiab] OR lactoylation[tiab]) AND (AGO2[tiab] OR ZSWIM8[tiab] OR TUT4[tiab] OR TUT7[tiab] OR "miRNA degradation"[tiab])`

| 层级 | 检索式 | 全库命中 |
|---|---|---|
| 单词 | `(lactylation[tiab] OR lactoylation[tiab])` | 2644 |
| 单词 | `(AGO2[tiab] OR ZSWIM8[tiab] OR TUT4[tiab] OR TUT7[tiab] OR "miRNA degradation"[tiab])` | 2429 |
| 两两 | `(lactylation[tiab] OR lactoylation[tiab]) AND (AGO2[tiab] OR ZSWIM8[tiab] OR TUT4[tiab] OR TUT7[tiab] OR "miRNA degradation"[tiab])` | 0 |
| **全交集** | `(lactylation[tiab] OR lactoylation[tiab]) AND (AGO2[tiab] OR ZSWIM8[tiab] OR TUT4[tiab] OR TUT7[tiab] OR "miRNA degradation"[tiab])` | **0** |

**配套文献与笔记（4 篇）**

#### PMID 42794724 · Per- and Polyfluoroalkyl Substances and Papillary Thyroid Carcinoma: An Integrative Study of Bioinformatics, Epidemiological Associations, and In Vitro Responses.
*International journal of molecular sciences 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42794724/)

**一句话结论**　这篇论文用生信整合+病例对照+体外实验，把 PFAS 暴露与甲状腺乳头状癌（PTC）风险及 m7G 相关基因（EIF4E、NCBP1、AGO2 为候选 hub）联系起来，发现部分 PFAS 浓度升高反而伴随 PTC 风险降低，且 PFOA/PFOS 分别改变 EIF4E/NCBP1 mRNA 表达。AGO2 只是作为 m7G-associated 候选 hub 基因之一被生信筛出，并未做任何乳酰化或 miRNA 降解机器修饰相关实验。

**与该子方向的关系**　竞争风险：本文把 AGO2 纳入"m7G 相关"通路框架（EIF4E/NCBP1/AGO2 作为 m7G 帽子结合/翻译起始网络的枢纽），这与 D3-6 想主张"乳酸/乳酰化直接修饰 AGO2 功能"的因果叙事存在解释权竞争——若审稿人或后续文献把 AGO2 表达变化归因于 m7G 通路而非翻译后乳酰化修饰，会稀释本子方向"乳酰化→AGO2 功能改变"这一叙事的独占性，需要在引言/讨论中明确区分"m7G 转录后调控 AGO2 表达量"与"乳酰化直接修饰 AGO2 蛋白翻译后功能"是两条不同层面的机制。

**方法要点**　可直接搬用的方法要点：其病例对照设计中使用 WQS regression、quantile g-computation、Bayesian kernel machine regression 处理多种 PFAS 混合暴露与结局的非线性/共线性关联，这套统计工具若未来 D3-6 想做"乳酸暴露剂量-反应+多因素混杂"分析（如高乳酸浓度梯度×时间×细胞类型）时可以借鉴其混合暴露建模思路；其体外部分用 wound-healing + cell viability 评估暴露后细胞功能变化的流程也可参考，但本文没有涉及任何 IP-Western、质谱位点定位或杂交瘤抗体制备方法，与 D3-6 核心技术路线（乳酰化位点特异性抗体+smallRNA-seq+半衰期测定）没有方法学重叠。

**效应量**　摘要报告：24 个重叠候选基因中 21 个在 PTC 与正常甲状腺组织间经 FDR 校正后仍差异表达；病例对照样本量为 60 PTC 患者 vs 60 对照，测量血清 17 种 PFAS 浓度；未报告 AGO2/EIF4E/NCBP1 具体表达倍数变化或统计 p 值/OR 值，也未报告 PFOA/PFOS 处理细胞活力下降的具体百分比或浓度-反应曲线数值。读全文时优先补：EIF4E/NCBP1/AGO2 差异表达的效应量（log2FC、FDR q 值）、PFOA/PFOS 使细胞活力下降的具体浓度梯度与百分比。

**它暴露/承认的空白**　本文承认的空白：PFAS-PTC 关联在不同统计模型间"not fully consistent"，且体外 wound-healing 结果"variable and did not show a consistent enhancement"，作者明确呼吁对 m7G 相关分子（尤其 EIF4E、NCBP1）在 PFAS-甲状腺细胞反应中的作用做进一步机制研究（"warrant further mechanistic investigation"）。这条空白落在 D3-3（乳酸/乳酰化修饰 miRNA 机器蛋白）而非直接落在 D3-6，因为本文完全没有讨论翻译后修饰（乳酰化/乙酰化）层面对 AGO2 功能的调控，D3-6 若要引用此文只能作为"AGO2 表达调控存在其他上游通路（PFAS-m7G）需要排除"的背景，不能作为直接支持证据。

**我不相信的一件事**　该研究把 AGO2 列为"m7G-associated hub gene"仅基于生信共表达/富集分析交集，摘要中并未说明 AGO2 本身是否是 m7G 修饰的直接底物还是仅与 m7G 通路基因共表达/共调控，这种"关联即机制"的推断在缺乏 AGO2 蛋白层面功能验证（如 m7G 甲基化位点定位、AGO2 结合活性检测）的情况下，其"AGO2 参与 m7G 相关 post-transcriptional regulation"的结论证据强度不足，容易被误读为 AGO2 存在 m7G 修饰这一更强的分子机制主张。

**读全文要核对什么**　【需读全文核对】需确认 Figure 中 AGO2 是否在体外 PFOA/PFOS 处理组也做了 mRNA 或蛋白表达检测（摘要只提到 EIF4E 和 NCBP1 分别对应 PFOA 和 PFOS，未提及 AGO2 是否在体外部分被验证）；需核对 hub gene 筛选的具体生信流程（差异表达 cutoff、m7G-associated gene list 来源数据库）以及是否有对照组（如非甲状腺细胞或敲低 m7G 相关基因的功能验证）来排除混杂机制。

**一个可执行动作**　我要在 HepG2/胃癌类器官高乳酸体系中做 AGO2 蛋白层面的乳酰化 IP-Western 及位点定位实验，并同步设置 m7G 相关基因（EIF4E/NCBP1）表达量的 qPCR 对照组，预期若乳酸处理下 AGO2 乳酰化信号上升但 EIF4E/NCBP1 mRNA 无显著变化，则可将"乳酰化直接修饰 AGO2 蛋白功能"与"PFAS/m7G 通路调控 AGO2 表达量"这两条机制在同一细胞体系内明确区分开来，避免与本文的解释框架混淆。

#### PMID 42780509 · IGF2BP3 remodels RISC occupancy to control microRNA targeting in leukemia.
*NAR cancer 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42780509/)

**一句话结论**　IGF2BP3 通过与 AGO2 竞争性结合共享的 3' UTR 序列环境，阻挡 RISC 在特定转录本上的可及性，其缺失会使 AGO2 占位向 3' UTR miRNA 靶点重新分布（尤以 miR-181 在致癌转录本上的占位增强为代表），从而维持白血病基因表达程序；此机制属于 RBP-RISC 竞争性占位调控，而非经典的 mRNA 降解通路。

**与该子方向的关系**　竞争风险：本文提出的是"RNA结合蛋白通过物理竞争排阻 AGO2/RISC 结合位点"这一调控层面，与 D3-6 假设的"乳酸/乳酰化对 AGO2/ZSWIM8/TUT4-7 的翻译后修饰改变酶活性/miRNA 稳态"是两条不同的分子机制——如果 D3-6 后续观察到 AGO2 结合谱或 miRNA 靶点占位变化，必须先排除是否存在类似 IGF2BP3 这样的竞争性 RBP 变化（乳酸处理是否间接改变 IGF2BP3 或同类 RBP 的表达/结合），否则无法把表型归因到乳酰化本身；此为需要在实验设计中明确区分的竞争性解释，而非直接支持或提供方法。

**方法要点**　可直接搬用的方法：(1) AGO2 miR-eCLIP 及 chimeric AGO2-miRNA reads 分析，用于在 D3-6 的高乳酸 vs 对照条件下检测 AGO2 结合谱及 miRNA-靶点配对是否随乳酰化状态改变，比单纯 IP-Western 更能给出机制层证据；(2) 纯化蛋白体外竞争结合实验(biochemical competition assay)，可用于验证乳酰化修饰后的 AGO2/TUT4/7 是否改变与 RNA 或其他调控蛋白的结合能力，是 D3-6 K→R/K→Q 突变体功能验证阶段可搬用的体外生化手段。

**效应量**　摘要未报告具体数值（如 fold change、富集倍数、miR-181 占位百分比等均未给出）。读全文时优先补：AGO2 miR-eCLIP 中 3' UTR 信号富集的定量倍数、miR-181a 过表达导致白血病细胞增殖抑制的具体百分比/IC50、以及 IGF2BP3 缺失后 AGO2 占位变化的统计显著性和效应量范围，以便与 D3-6 中乳酸处理组的 AGO2 结合变化幅度做基线比较。

**它暴露/承认的空白**　该文承认其模型主要建立在 MLL-AF4 B-ALL 白血病细胞系中，尚未探究其他细胞环境或代谢应激（如乳酸/乳酰化）是否也能类似调控 IGF2BP3-AGO2 竞争关系，这一"代谢信号如何影响 RBP-RISC 竞争占位"的空白恰好落在 D3-6（乳酸/乳酰化重编程 miRNA 稳态机器）子方向上，提示乳酰化可能是调节此类竞争性 RBP 结合的一种未被检验的翻译后修饰机制。

**我不相信的一件事**　摘要将 miR-181a 过表达"部分phenocopy" IGF2BP3 缺失作为功能验证核心证据，但 miR-181a 只是众多因 IGF2BP3 缺失而占位增强的 miRNA 之一，仅用单一 miRNA 的过表达实验并不能排除 IGF2BP3 缺失后其他同时变化的 miRNA（或非 miRNA 依赖的 IGF2BP3 直接稳定作用丧失）对增殖表型的贡献，其因果链条论证强度不足以支持"IGF2BP3 主要通过阻挡 miR-181-RISC 通路维持增殖"这一强因果表述。

**读全文要核对什么**　【需读全文核对】需确认 AGO2 miR-eCLIP 及 chimeric reads 分析中是否设置了 IGF2BP3 结合位点与 AGO2 结合位点的空间距离/重叠度定量图（判断"竞争排阻"证据是否为直接空间重叠还是间接相关）；需核对 miR-181a 过表达实验的对照组设计（是否有 scramble miRNA 对照、IGF2BP3 缺失+miR-181a 抑制的双重扰动实验来验证充分-必要关系）；需查看生化竞争实验中 IGF2BP3/AGO2/RNA 三者浓度梯度及 RNA 序列选择依据，判断该竞争模式是否具有序列特异性还是普遍适用。

**一个可执行动作**　我要在 HepG2/胃癌类器官高乳酸 vs 对照体系中，先用 AGO2 miR-eCLIP（借鉴本文方法）比较高乳酸处理前后 AGO2 结合谱及 chimeric AGO2-miR-29/33/375 reads 的变化，预期若乳酰化直接改变 AGO2 功能而非通过类 IGF2BP3 的竞争性 RBP 间接作用，则应观察到 AGO2 全局占位模式改变但缺乏与已知竞争性 RBP（如 IGF2BP3）结合谱的显著重叠，从而为 D3-6 的乳酰化特异性机制提供区分证据。

#### PMID 42778936 · Targetome-defined miR-181c signaling from extracellular vesicles governs periodontal MSC fate via RNF150-MAP3K5.
*Cell communication and signaling : CCS 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42778936/)

**一句话结论**　这篇发现 hMSC 来源 EV 中富集的 miR-181c 通过靶向 E3 泛素连接酶 RNF150、减少其对 MAP3K5 的泛素化降解，从而激活 p38 通路促进成骨分化与牙槽骨再生，属于"miRNA-靶点-激酶级联"通路论文，不涉及乳酰化或 miRNA 自身稳定性调控。

**与该子方向的关系**　竞争风险：与 D3-6 不构成直接竞争（它不碰 AGO2/TUT4/TUT7/ZSWIM8 的翻译后修饰或降解机制），但它把 AGO2 RIP-seq + miRISC targetome 建库的整套流程用在了完全不同的生物学问题（成骨分化）上，若不加区分容易被误判为"重叠"，需在文献综述里明确标注差异声明：本文是 miRNA 下游靶点通路研究，D3-6 是上游修饰-稳态平台搭建，二者层次不同。

**方法要点**　可直接搬用的方法是 AGO2 RNA-immunoprecipitation sequencing 与转录组整合以建立 miRISC-associated targetome 的流程，这可用于 D3-6 中若后续需要验证乳酰化修饰后 AGO2 结合谱变化时的靶点鉴定；EV miRNA microarray 分选思路对他若涉及 EV 途径可参考，但本子方向核心是细胞内位点特异性抗体+半衰期，此法非核心可搬方法。

**效应量**　摘要未报告数字，读全文时优先补：miR-181c 在成骨分化中上调的具体倍数、RNF150 敲低/过表达对 MAP3K5 泛素化水平及 p38 磷酸化的定量变化、以及 AGO2 RIP-seq 中 miR-181c-RNF150 结合的富集倍数或统计量。

**它暴露/承认的空白**　该文承认 miRNA 介导的干细胞命运调控"机制贡献仍不完全清楚"，暴露的空白是 miRNA 修饰（如乳酰化）如何影响其在 miRISC 中的靶向效率或稳定性——这正落在 D3-6（乳酰化位点定量检测平台）要填补的上游空白，即本文完全未涉及 miRNA 本身的降解/修饰状态，只做了下游靶点通路。

**我不相信的一件事**　本文用高成骨能力 hMSC 亚群的 EV 富集 miR-181c 来"溯源"其功能因果性，但摘要未说明是否排除了同一 EV 中其他共富集 miRNA 或蛋白货物对 RNF150-MAP3K5-p38 轴的贡献，仅凭 gain/loss-of-function 的"concordant effects"不足以证明 miR-181c 是唯一必要因子，尤其 RNF150 是否为 miR-181c 唯一显著靶点摘要未交代排除标准。

**读全文要核对什么**　【需读全文核对】需确认 AGO2 RIP-seq 的对照设计（IgG 对照、是否有 miR-181c mimic/inhibitor 处理组的平行 RIP）、RNF150 3'UTR 荧光素酶报告基因突变对照是否存在、Co-IP 中 MAP3K5 泛素化检测所用抗体特异性及是否区分 K48/K63 链型、以及体内 µCT 定量的具体骨量参数图表，这些细节决定其靶点验证的严谨度能否类比到 D3-6 未来的靶点验证设计。

**一个可执行动作**　我要在 D3-6 的乳酰化单抗验证体系中，借鉴本文 AGO2 RIP-seq 整合转录组建立 targetome 的思路，在 HepG2/胃癌类器官高乳酸 vs 对照条件下对乳酰化位点敲入（K→R/K→Q）的 AGO2 做平行 RIP-seq，预期能区分乳酰化修饰是否改变 AGO2 对 miR-29/33/375 靶点集合的结合谱，而非仅停留在整体丰度层面。

#### PMID 42759595 · A nucleus-associated miR-661-C/EBPα-PPARγ regulatory axis skews BMSC lineage commitment in SONFH.
*Experimental cell research 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42759595/)

**一句话结论**　该研究报道 miR-661 在 SONFH 患者 BMSC 中上调，通过核内 AGO2 复合物结合 PPARG 启动子并协同 C/EBPα 促进其转录，从而驱动成骨/成脂谱系失衡向成脂偏移，且 antagomiR-661 局部递送可缓解体内类骨坏死表型。

**与该子方向的关系**　竞争风险：本文证明的是 miR-661 通过核内 AGO2-染色质结合机制"转录调控"C/EBPα-PPARγ 轴，这与 D3-6 想要建立的"细胞质降解机器（AGO2/ZSWIM8/TUT4-7）乳酰化-半衰期"检测范式是不同层次的 AGO2 功能（核内转录辅因子 vs 细胞质 miRNA 稳态/降解），若不加区分地引用 AGO2 结合数据，会把"核内基因调控"误当作"细胞质降解证据"，需在写作时明确划清核/质两套 AGO2 功能边界。

**方法要点**　可搬的方法：ChIP-qPCR、promoter DNA pull-down、dual-luciferase reporter、RIP-qPCR（C/EBPα-RIP 及 nuclear AGO2-RIP）这套"miRNA-蛋白-启动子"三联验证流程，可直接搬到验证乳酰化 AGO2/TUT4-7 是否改变其与靶mRNA或竞争蛋白结合的实验设计里；seed-mutant mimic 对照设计也可直接借用于区分乳酰化对 AGO2 seed-依赖结合能力的影响。

**效应量**　【摘要未报告数字】读全文时优先补：miR-661 过表达/敲低后 PPARG、FABP4、RUNX2/OCN 的定量倍数变化，ChIP-qPCR 和 AGO2 ChIP-qPCR 的富集倍数（fold enrichment），以及 antagomiR-661 体内实验中骨小梁/脂肪面积的具体统计数值（n 值、p 值）。

**它暴露/承认的空白**　该文明确承认其对 miR-661 机制的探索"排除了 β-catenin 通路后才转向 C/EBPα-PPARγ 轴"，说明该谱系仍缺乏对 miRNA 翻译后修饰（如乙酰化/乳酰化）如何影响其核质分布及 AGO2 结合特异性的探讨，这正是 D3-6 想要填补的空白——乳酸/乳酰化对 AGO2 复合物功能状态切换（核内转录辅助 vs 细胞质降解）的调控尚无一篇提及。

**我不相信的一件事**　摘要称 miR-661 通过"核内 AGO2 占据 PPARG 启动子"发挥转录调控作用，但未说明这种核定位是否依赖于 AGO2 本身的翻译后修饰状态（乙酰化/磷酸化等），也未排除该效应是否只是核内 miR-661 丰度升高的伴随现象而非因果性 AGO2 功能重塑，故其"AGO2 占据依赖 miR-661"因果链证据强度有限，需要功能性 AGO2 结构域突变或核质分离后 AGO2 修饰状态对照才能坐实。

**读全文要核对什么**　【需读全文核对】需确认：(1) 图中 nuclear AGO2-RIP-qPCR 与细胞质 AGO2-RIP 是否有平行对照，以判断 AGO2 核/质分布比例是否受乳酸或代谢应激影响；(2) C/EBPα knockdown/rescue 实验的具体对照组设计（是否有 scramble miRNA、seed-mutant对照同时呈现）；(3) 体内 antagomiR-661 实验的给药剂量、时间点及是否设有 sham 手术对照组，以评估该体内递送方案是否可迁移到他自己的 MYBPC3/SAA3 存档组织验证平台。

**一个可执行动作**　我要在 HepG2/胃癌类器官高乳酸体系中，先用 nuclear/cytoplasmic AGO2 分离结合 pan-Kla IP-Western，检验乳酸处理是否改变 AGO2 的核质分布比例及乳酰化修饰状态；若阳性，再借用本文 ChIP/RIP-qPCR 三联验证框架，比较乳酰化位点 K→R/K→Q 敲入的 AGO2 在细胞质中与 TUT4/7、ZSWIM8 结合及在核内与染色质结合能力的差异，预期乳酰化会促使 AGO2 从细胞质降解复合物向核内转录复合物功能偏移。


## D3-7 · LDH抑制剂逆转miRNA重编程
**层次：** 转化治疗　｜　**拥挤程度：** 少人做（两两最小共现 27 篇，全交集 27 篇）　｜　**首篇预计：** 18–24 个月（依赖前置子方向D3-1至D3-6先确立乳酰化修饰因果关系，本子方向作为该系列的转化验证章节，若前置数据齐备可缩短至12–15个月）。

> **假设：** 若用LDHA抑制剂或乳酸转运体抑制剂降低细胞内乳酸/乳酰-CoA水平，则被乳酸重编程的miRNA稳态（如miR-29降解速率）可被部分逆转，提示代谢干预具有治疗窗口

**科学前提**

[已发表] Zou等iScience 2022证明乳酸经胆固醇合成促进CSFV复制，确立乳酸-代谢通路可被LDHA抑制剂（如GSK2837808A）或MCT1/4转运体抑制剂（AZD3965）有效阻断。[本项目计算] 若D3-1至D3-6在细胞模型中确立乳酸/乳酰化直接修饰AGO2/ZSWIM8/TUT4-7并加速miR-29成熟体降解，则LDHA/MCT抑制应能降低胞内乳酸-乳酰CoA池、减少目标蛋白乳酰化位点占有率，此为基于本项目自建假设生成级推理、乳酰化位点打分本身不构成证据。[待测] 乳酰化降低后miR-29成熟体半衰期能否部分恢复、其恢复幅度是否具有剂量依赖性及可逆窗口，均需实验验证。

**第一个关键实验**

在高乳酸糖酵解表型的肝星状细胞/肌纤维母细胞类器官（或TGF-β诱导的纤维化类器官模型）中，分组：对照、高糖酵解诱导、高糖酵解+GSK2837808A（LDHA抑制剂，梯度剂量）、高糖酵解+AZD3965（MCT1/4抑制剂），处理24–72小时；读出为（1）胞内乳酸/乳酰-CoA定量，（2）AGO2/ZSWIM8/TUT4-7乳酰化位点免疫共沉淀+定量质谱（合作），（3）miR-29成熟体actinomycin D chase半衰期测定，（4）下游胶原蛋白（COL1A1）表达。每组n=4–6类器官批次，重复三轮独立实验。

**必须的对照**

必须设置pri-miR-29/pre-miR-29 vs 成熟体miR-29的平行qPCR以排除TGF-β/Smad3转录层抑制的竞争解释——若抑制剂仅改变pri/pre比例而不改变成熟体半衰期，则说明效应发生在转录而非降解层。需加入LDHA催化死突变体（H192Q）回补对照以排除抑制剂脱靶效应；需加入乳酰化位点突变体（K-to-R）稳定表达细胞回补以证明乳酰化本身而非乳酸其他代谢分支（如胆固醇合成，其为他iScience 2022已证明的旁路）介导效应；需设不含乳酸但糖酵解仍高的Warburg效应对照（如LDHA不同亚型敲低）以分离乳酸特异性效应与整体糖酵解代谢重塑。

**为什么是他能做**

他是LDHA/乳酸通路药理学阻断的实操者——iScience 2022一作论文中已亲手用乳酸代谢抑制剂验证乳酸对下游胆固醇合成通路的因果贡献，具备该类抑制剂剂量摸索、类器官给药和读出的完整经验；他的胃癌代谢一作工作及类器官平台可直接迁移为本子方向的转化验证体系；此外他CRISPR/ABE内源位点编辑技能可用于构建乳酰化位点K-to-R回补细胞系，无需额外学习即可独立执行绝大部分实验。

**可行性**

已具备：LDHA/MCT抑制剂给药方案、类器官培养、CRISPR内源位点编辑（起步成本低，可直接沿用iScience 2022建立的给药和读出体系）。需新学：actinomycin D半衰期chase实验的标准化流程（预计1–2个月上手）、乳酰化位点定量质谱数据分析（依赖合作）。需合作：乳酰化蛋白质组质谱（可与院内代谢质谱平台合作，预计接触-出数据2–3个月）。

**最大风险与放弃条件**

最大风险是LDHA/MCT抑制剂本身通过降低整体糖酵解通量、改变ATP/NAD+比例等非乳酰化特异性机制间接影响miRNA稳态机器的表达或稳定性，从而产生假阳性"逆转"表型。放弃条件：若LDHA催化死突变体回补后抑制剂仍能逆转miR-29降解速率（说明效应不依赖乳酸生成本身），或乳酰化位点K-to-R突变体细胞中抑制剂仍产生同等逆转效果（说明乳酰化位点非必需），则判定本子方向机制链不成立，退回至D3-1至D3-6重新确立乳酰化直接修饰的因果证据后再考虑药理学逆转实验。

**目标期刊与基金**

目标期刊：Cell Metabolism 或 Molecular Cell（转化治疗层次，强调机制到干预的完整闭环）；适配基金机制：NIH R21（高风险探索性转化概念验证）或 AACR-代谢靶向治疗专项基金，若前期D3-1至D3-6数据充分亦可整合进R01子课题。

**首篇预计**

18–24 个月（依赖前置子方向D3-1至D3-6先确立乳酰化修饰因果关系，本子方向作为该系列的转化验证章节，若前置数据齐备可缩短至12–15个月）。

**做成之后的下一步**

若逆转效应被证实且具剂量依赖性，下一步自然延伸到在他自己的MYBPC3心脏纤维化大动物模型或SAA3肠道存档组织中验证LDHA/MCT抑制剂能否在体内层面缩小纤维化面积并恢复miR-29稳态，从而搭建从细胞机制到活体治疗窗口的完整证据链。

**拥挤程度核查（可复算）**

检索式：`("LDHA inhibitor"[tiab] OR GSK2837808A[tiab] OR AZD3965[tiab]) AND (miR-29[tiab] OR "microRNA turnover"[tiab] OR lactylation[tiab])`

| 层级 | 检索式 | 全库命中 |
|---|---|---|
| 单词 | `("LDHA inhibitor"[tiab] OR GSK2837808A[tiab] OR AZD3965[tiab])` | 180 |
| 单词 | `(miR-29[tiab] OR "microRNA turnover"[tiab] OR lactylation[tiab])` | 3661 |
| 两两 | `("LDHA inhibitor"[tiab] OR GSK2837808A[tiab] OR AZD3965[tiab]) AND (miR-29[tiab] OR "microRNA turnover"[tiab] OR lactylation[tiab])` | 27 |
| **全交集** | `("LDHA inhibitor"[tiab] OR GSK2837808A[tiab] OR AZD3965[tiab]) AND (miR-29[tiab] OR "microRNA turnover"[tiab] OR lactylation[tiab])` | **27** |

**配套文献与笔记（4 篇）**

#### PMID 42793282 · Lactylation Remodels Tumorigenesis, Immune Microenvironment, and Therapeutic Response.
*Current issues in molecular biology 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42793282/)

**一句话结论**　这是一篇综述：系统梳理lactylation（Kla）的酶学基础（写手p300/CBP，读手待补，去乳酰化HDAC）及其在肿瘤糖代谢重塑、细胞死亡通路与免疫微环境（PD-L1上调、M2巨噬极化、CD8+ T细胞耗竭、Treg抑制功能增强）中的作用，并总结靶向乳酸-乳酰化轴的临床进展（LDHA抑制剂、MCT抑制剂如AZD3965、p300/CBP抑制剂CCS1477已进入早期临床）。摘要未涉及AGO2/ZSWIM8/TUT4-7或任何miRNA降解机器的乳酰化。

**与该子方向的关系**　竞争风险：本文完全聚焦肿瘤细胞增殖/死亡/免疫逃逸这条"乳酰化-肿瘤生物学"主线，与D3-7想验证的"乳酸→miRNA稳态酶乳酰化→miR-29降解速率"路线是并列但不重叠的假说——如果不在讨论里明确miRNA降解机器是否被乳酰化，读者可能误以为该领域已把乳酰化底物谱扩展到RNA降解酶，实际上摘要没有这一证据，需要警惕把"综述提到LDHA/AZD3965"直接等同于"支持miRNA假说"。

**方法要点**　摘要层面唯一可直接搬用的是干预工具清单：LDHA抑制剂（未点名GSK2837808A但同类机制）、MCT1抑制剂AZD3965（已进临床，安全性数据可能可查）、p300/CBP抑制剂CCS1477——这三类可以作为D3-7方案中"降低乳酸/阻断乳酰化写手"的候选对照药物，尤其AZD3965已经是D3-7实验设计里指定的MCT1/4抑制剂，说明其临床安全性数据可以支撑后续从类器官推进到体内/临床转化的立项理由。

**效应量**　【摘要未报告数字】读全文时优先补：(1)AZD3965和CCS1477早期临床试验的具体剂量范围、安全性终点（是否有可转用于类器官剂量换算的PK数据）；(2)综述中若有引用LDHA抑制剂在非肿瘤细胞（如成纤维细胞/星状细胞）中降低胞内乳酸的定量幅度（%抑制或IC50），可作为D3-7剂量梯度设计的参考基线。

**它暴露/承认的空白**　摘要末尾明确提出"讨论该领域当前关键科学问题与未来方向"，但列出的具体空白（如底物特异性机制、去乳酰化动力学、非肿瘤组织中的功能）在摘要中未展开；若全文的"未来方向"部分提到RNA结合蛋白或RNA代谢酶尚未被系统筛查乳酰化底物，这将直接落在D3-7子方向上，构成本文对D3-7假设的间接支持证据。

**我不相信的一件事**　本文的证据体系几乎全部来自肿瘤细胞模型（tumor biology/tumor microenvironment），而D3-7要用的是肝星状细胞/肌纤维母细胞纤维化类器官——乳酰化修饰谱和功能后果是否在非转化的间充质细胞中同样存在，摘要没有给出任何证据，不能假设肿瘤细胞中"乳酰化→糖酵解正反馈→免疫逃逸"的调控逻辑可以直接迁移到纤维化细胞中的"乳酸→AGO2/TUT4-7乳酰化→miR-29降解"这一具体因果链。

**读全文要核对什么**　【需读全文核对】需要确认：(1)全文是否有图表列出目前已知的非组蛋白乳酰化底物清单，其中是否包含任何RNA结合蛋白、Argonaute家族蛋白或尿苷转移酶（TUT4/7），若完全没有列入则说明D3-7是真正空白；(2)"未来研究方向"章节的具体文字，是否点名RNA代谢/miRNA通路为待探索领域；(3)LDHA抑制剂和AZD3965在综述引用的原始文献中，是否有在非肿瘤（成纤维细胞/星状细胞）体系中的剂量-效应数据可供D3-7类器官实验设计参考。

**一个可执行动作**　我要在TGF-β诱导的肝星状细胞/肌纤维母细胞类器官体系中，用本文提及的LDHA抑制剂同类药物（GSK2837808A）和MCT1/4抑制剂AZD3965做梯度剂量干预，读出胞内乳酸/乳酰-CoA水平变化，预期若乳酸-乳酰化轴确实作用于miR-29降解机器，则抑制剂处理后actinomycin D chase测得的miR-29成熟体半衰期应显著延长、COL1A1表达下降，从而把本文肿瘤领域验证过的药理工具首次用于证明纤维化类器官中乳酸依赖的miRNA降解可逆性。

#### PMID 42687432 · H3K18 Lactylation Promotes Cell Proliferation in T-Cell Acute Lymphoblastic Leukemia.
*Journal of cellular biochemistry 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42687432/)

**一句话结论**　该研究证明T-ALL细胞中LDHA抑制剂降低乳酸和H3K18lac水平，通过减少NTRK3启动子区组蛋白乳酰化而抑制细胞增殖，外源补乳酸可逆转此表型。这条通路完全落在组蛋白乳酰化-转录调控层面，未涉及AGO2/ZSWIM8/TUT4-7等miRNA降解机器蛋白的直接乳酰化。

**与该子方向的关系**　竞争风险：本文的乳酸→乳酰化→表观遗传→转录调控这条链路与D3-7假设的"乳酸重编程miRNA稳态（降解速率层面）"存在机制层面的竞争解释——如果LDHA抑制剂逆转miR-29降解速率的效应实际是通过H3K18lac调控miR-29前体转录而非影响成熟体降解酶复合物，则会与方向2里"TGF-β/Smad3转录抑制miR-29"的竞争解释叠加，必须靠pri/pre vs 成熟体的区分实验来排除。

**方法要点**　可搬用的方法：LDHA抑制剂处理细胞后同步检测总蛋白乳酰化水平（Western blot针对pan-Kla及H3K18lac特异性抗体）与靶基因启动子CUT&Tag/ChIP-qPCR富集，这套"抑制剂降乳酸-测特定位点乳酰化-测下游基因表达-外源乳酸回补"四步范式可直接迁移到检测AGO2/ZSWIM8/TUT4-7乳酰化位点及其对miR-29成熟体丰度的影响。他自制杂交瘤单抗技术可用来做ZSWIM8/TUT4-7位点特异性乳酰化抗体，弥补现有pan-Kla抗体特异性不足的问题。

**效应量**　摘要未报告数字，读全文时优先补：LDHA抑制剂浓度梯度及IC50、H3K18lac Western blot定量倍数变化、NTRK3 ChIP-qPCR富集倍数、S期阻滞百分比、乳酸回补的剂量-效应曲线。

**它暴露/承认的空白**　该研究明确承认"乳酸介导蛋白乳酰化在T-ALL中的作用此前研究不足"，这条空白只覆盖了组蛋白H3K18lac-转录轴，完全没有触及非组蛋白（尤其RNA结合蛋白/miRNA降解酶）乳酰化的空白，这正是D3-7子方向要补的部分。

**我不相信的一件事**　该文仅证明NTRK3过表达能"部分"挽救增殖抑制（摘要用rescue而非fully rescue），但没有排除LDHA抑制剂同时降低了细胞总体能量代谢/ATP供应而非特异性通过乳酰化-NTRK3轴起作用的可能，即乳酸缺乏的表型可能是代谢应激的非特异性结果而非乳酰化信号的特异性效应，这一点若不做ATP/线粒体功能对照就无法排除对D3-7逆转实验设计的干扰。

**读全文要核对什么**　【需读全文核对】需确认：(1)LDHA抑制剂的具体名称、浓度及处理时长，是否与他计划用的乳酸转运体抑制剂（如MCT1/4抑制剂AZD3965）机制类似可比较；(2)H3K18lac ChIP-seq/CUT&Tag是否有全基因组数据可搜索miR-29/miR-33/miR-375宿主基因启动子区是否也有乳酰化富集；(3)是否检测了非组蛋白乳酰化（尤其RNA结合蛋白或RNA降解相关酶）作为对照，若完全未检测则进一步坐实此文空白仅限组蛋白层。

**一个可执行动作**　我要在他计划中的类器官/心脏纤维化存档组织衍生细胞体系里，用LDHA抑制剂（借鉴本文剂量范式）处理后，平行检测pri-miR-29/pre-miR-29 qPCR与成熟miR-29 smallRNA-seq（需合作）丰度变化，预期若LDHA抑制降低ZSWIM8/TUT4-7乳酰化并特异性延长miR-29成熟体半衰期而不改变pri/pre水平，则证明乳酸重编程作用于降解层而非转录层，从而与TGF-β/Smad3的转录抑制解释形成明确区分。

#### PMID 42503521 · The phase separation of ZC3H18 transcriptionally activates LDHA and forms lactylation-mediated positive feedback loop to promote tumorigenesis of lung cancer.
*Oncogene 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42503521/)

**一句话结论**　该文证明肺癌中 ZC3H18 通过相分离结合 LDHA 启动子促糖酵解产乳酸，乳酸又经 H3K18la 与 ZC3H18-K186 乳酰化反向放大 ZC3H18/LDHA 表达，形成正反馈环。LDHA 抑制剂 GSK2837808A 联合 ZC3H18 抑制在 PDX 模型中显效，提示乳酸-LDHA 轴可被药理学阻断。

**与该子方向的关系**　竞争风险：本文关注的是乳酸→组蛋白/RBP 乳酰化→转录调控回路，与 D3-7 假设的"乳酸/乳酰化直接修饰 AGO2/ZSWIM8/TUT4-7 蛋白进而重编程 miRNA 稳态"是同一乳酸信号但完全不同的靶蛋白与不同层级（转录 vs 转录后降解），若引用需明确声明：本文证据不能替代对 miRNA 降解机器乳酰化的直接检测。同时它给出的"LDHA 抑制剂可逆转乳酸依赖表型"这一药理学逻辑，恰好是 D3-7 干预策略的直接方法学前提，可视为支持前提。

**方法要点**　可直接搬用：(1) LDHA 小分子抑制剂 GSK2837808A 降乳酸水平的给药与验证方案；(2) 位点特异性乳酰化检测——本文用抗 K186-la 的定点抗体/质谱思路，可类比用于检测 AGO2/ZSWIM8/TUT4-7 上候选乳酰化赖氨酸位点，尤其他本人杂交瘤制抗体技能可直接复用做 phospho/lactyl 双特异抗体。

**效应量**　摘要未报告数字，读全文时优先补：GSK2837808A 处理后细胞内乳酸浓度下降的具体倍数或百分比、PDX 肿瘤体积/重量抑制率的统计数值，以及 ZC3H18-K186la 敲入/敲除后 LDHA mRNA 表达变化的定量数据。

**它暴露/承认的空白**　摘要承认该乳酸/乳酰化回路目前只在转录层面（H3K18la 组蛋白修饰、ZC3H18 蛋白乳酰化调控其转录活性）被验证，未涉及任何 RNA 稳态或降解机器蛋白的乳酰化，这正是 D3-7 及方向3（乳酸/乳酰化修饰 AGO2/ZSWIM8/TUT4-7）尚待填补的空白。摘要也未提供任何撤药/逆转乳酸抑制后表型恢复动力学的时间尺度，无法判断"部分逆转"是否可测。

**我不相信的一件事**　本文将 LDHA 抑制剂疗效归因于阻断 ZC3H18/LDHA/乳酸正反馈环，但摘要未排除 GSK2837808A 本身对糖酵解通量的非特异性抑制是否足以独立解释抗肿瘤效果，即未做"仅阻断乳酸生成而不改变 ZC3H18 转录活性"的对照，导致乳酸-乳酰化因果链和药物脱靶效应难以区分。

**读全文要核对什么**　【需读全文核对】需确认：(1) ZC3H18-K186la 检测所用抗体是否为定点特异性（点突变 K186R 对照是否设置）；(2) LDHA 启动子 ChIP 或 CUT&RUN 数据中 ZC3H18 结合位点与 H3K18la 峰是否共定位；(3) GSK2837808A 处理后乳酸水平的时间-剂量曲线及其与 ZC3H18/LDHA mRNA 恢复的时序关系，用以类比设计 D3-7 中"降乳酸后 miR-29 降解速率恢复"实验的采样时间点。

**一个可执行动作**　我要在他已有的 MYBPC3 心脏与 SAA3 肠纤维化存档组织及类器官体系中，用 LDHA 抑制剂 GSK2837808A（借鉴本文剂量方案）处理后测定细胞内乳酸/乳酰-CoA 水平变化，并结合自制乳酰化定点抗体（仿本文 K186la 抗体策略）检测 TUT4/7 与 ZSWIM8 上候选赖氨酸位点的乳酰化状态，预期降乳酸后 miR-29 尿苷化/降解速率部分回落，从而验证乳酸干预存在治疗窗口。

#### PMID 42389269 · β-Caryophyllene protects against ischemic stroke by inhibiting H3K9 and H3K18 lactylation-mediated cellular pyroptosis.
*Frontiers in pharmacology 2026* ｜ [PubMed](https://pubmed.ncbi.nlm.nih.gov/42389269/)

**一句话结论**　该文证明天然化合物BCP通过降低糖酵解与乳酸生成，减少组蛋白H3K9la/H3K18la在NLRP3启动子的富集，从而抑制microglia焦亡，缓解小鼠脑缺血再灌注损伤；LDHA抑制剂oxamate可复现该轴，但NLRP3抑制剂MCC950不影响乳酰化，提示乳酰化是上游而非下游事件。

**与该子方向的关系**　竞争风险：该文用LDHA抑制剂oxamate做的是"组蛋白乳酰化→NLRP3转录→焦亡"这条通路，读出是ChIP-PCR和蛋白水平，完全不涉及AGO2/ZSWIM8/TUT4-7或任何miRNA稳态；与D3-7撞的是同一个干预工具（LDHA抑制剂/乳酸补充范式），但靶点从"非组蛋白乳酰化修饰miRNA降解机器"变成了"组蛋白乳酰化调控转录"，需在综述/引言中明确写差异声明：D3-7关注的是乳酰化直接修饰AGO2/ZSWIM8/TUT4-7蛋白影响成熟miRNA半衰期，而非组蛋白乳酰化-转录调控，二者机制层级不同，不构成直接竞争。

**方法要点**　可直接搬用的方法：（1）oxamate作为LDHA抑制剂降低乳酸/乳酰化的干预范式，与D3-7用GSK2837808A思路一致，可作为平行工具比对；（2）"lactate rescue"实验设计（补充外源乳酸逆转抑制剂效果）可直接套用到D3-7验证miR-29降解速率是否被乳酸依赖性重编程；（3）ChIP-PCR检测特定基因启动子乳酰化富集的方法可迁移到检测ZSWIM8/TUT4-7基因本身是否受组蛋白乳酰化调控（作为补充层面，而非直接修饰蛋白本身）。

**效应量**　摘要未报告数字：读全文时优先补：BCP组与OGD/R组的H3K9la/H3K18la相对表达量（Western blot定量或ChIP-PCR富集倍数）、oxamate各剂量下的乳酸/乳酰化下降幅度、以及cerebral infarct volume的具体百分比缩小值，这些是D3-7设计oxamate/GSK2837808A剂量梯度时可参照的量效关系数据。

**它暴露/承认的空白**　该文承认的空白是：BCP的"the precise underlying mechanisms remain largely unexplored"（摘要原话意译），即乳酰化修饰的具体靶蛋白/位点未被完全阐明，只锁定在组蛋白H3K9/H3K18层面，未探讨非组蛋白乳酰化——这正落在D3-7要填的空白上：非组蛋白（AGO2/ZSWIM8/TUT4-7）乳酰化对miRNA稳态的直接调控完全未被此文触及。

**我不相信的一件事**　该文用oxamate同时降低H3K9la/H3K18la和焦亡因子来推断"乳酰化→NLRP3转录→焦亡"的因果链，但oxamate是非特异性LDHA抑制剂，会同时改变胞内NAD+/NADH比值、ATP水平和整体乙酰化-乳酰化平衡，摘要未证明乳酰化下降是焦亡抑制的必要而非伴随事件，缺少组蛋白乳酰化位点特异性突变（如H3K9/H3K18位点定点突变）的直接功能学证据来排除LDHA抑制的其他下游效应。

**读全文要核对什么**　【需读全文核对】需确认：（1）oxamate和BCP处理的具体剂量-时间梯度及其对应的乳酸/乳酰-CoA定量方法学（是否为质谱法，可否借鉴到D3-7的胞内乳酰-CoA定量）；（2）ChIP-PCR的对照设计是否包含IgG对照及非NLRP3启动子的阴性对照区域；（3）图中是否有Western blot定量H3K9la/H3K18la的loading control和分子量标注，以判断该乳酰化抗体特异性是否足够严格可供D3-7的IP-质谱实验参考。

**一个可执行动作**　我要在TGF-β诱导的肝星状细胞/肌纤维母细胞类器官体系中，做oxamate（LDHA抑制剂）梯度剂量+外源乳酸rescue的平行对照实验（借鉴该文lactate-rescue范式），预期若miR-29降解速率的乳酸依赖性是真实存在的非组蛋白机制，则oxamate应能延长miR-29半衰期（actinomycin D chase读出）且可被外源乳酸部分逆转，同时该效应应独立于组蛋白H3K9la/H3K18la水平变化，从而在功能学上把D3-7的"乳酰化修饰miRNA降解机器"假设与该文的"组蛋白乳酰化-转录"机制区分开。

