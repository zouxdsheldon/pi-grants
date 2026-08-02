# 全球 PI 资助追踪网站

一个**在线、可自动更新**的资助搜索网站,为 Xiaodong Zou(MSKCC / Eric Lai 实验室,RNA 降解与代谢方向)定制。

## 它怎么工作

- **前端**(`index.html`):纯静态页面,打开后从同域的 `data/*.json` 读数据 → 无 CORS 问题,加载快。三个标签:联邦机会 / 国际·基金会·亚洲 PI 精选 / 我关注的。
- **数据**(`data/grants.json`):美国联邦全量资助机会(NIH / NSF / DoD / HHS 等),已按你的研究方向打相关度标签、剔除过期、按截止排序。
- **自动更新**(`.github/workflows/update.yml`):GitHub Actions 每天在 GitHub 的服务器上运行 `scripts/fetch_grants.py`,重新抓 Grants.gov 并提交最新数据。**抓取在 GitHub 端完成,与你本地网络无关** —— 这就绕开了 MSKCC 内网访问 grants.gov 的限制。你的浏览器只连 `*.github.io`。

## 部署(3 步,一次性)

1. 在 GitHub 新建一个仓库(比如 `pi-grants`),把本文件夹所有内容上传。
2. 仓库 **Settings → Pages → Source 选 `Deploy from a branch` → `main` / `root`** → 保存。几分钟后得到网址:`https://<你的用户名>.github.io/pi-grants/`。
3. 仓库 **Settings → Actions → General → Workflow permissions 选 `Read and write permissions`** → 保存(让定时任务能提交更新)。

完成后:收藏那个网址,任何设备打开都是最新。

## 手动更新

不想等每天定时?仓库 **Actions 标签 → 选 "Update grants data" → Run workflow** 即可立刻刷新。

## 调整搜索范围

编辑 `scripts/fetch_grants.py` 顶部的 `KEYWORDS` 列表(增删关键词),以及 `HI`/`MID`(相关度打分词)。改动 push 后下次运行即生效。

## 从 Pivot-RP 导入(合法用法)

MSKCC 订阅的 Pivot-RP 没有面向个人的 API,且其编辑描述是 Clarivate 版权内容,不能整段搬运。
正确做法是把它当**发现工具**,导出后只并入**事实字段 + 官方链接**:

1. Pivot-RP 里勾选想要的机会 → **Export**(导出 CSV)。
2. 把文件放到 `data/pivot_export.csv`。
3. 运行 `python3 scripts/import_pivot.py data/pivot_export.csv`。
4. 条目会以地区「📥 我的 Pivot 精选」写入 `data/curated.json`,网站自动出现该地区筛选。
5. `git add -A && git commit -m "import pivot" && git push` → 自动重新部署。

脚本只保留项目名/资助方/截止日/金额/链接;描述留空,请用你自己的话补 `note`。

**自动归国**:导入时按资助方名自动判定国家/地区(NIH→🇺🇸、ERC→🇪🇺、Wellcome→🇬🇧、
NSFC→🇨🇳、JSPS→🇯🇵、A*STAR/NRF→🇸🇬、NHMRC→🇦🇺、CIHR→🇨🇦、HFSP→🌍…),
落到对应国旗分区;识别不到的资助方进「📥 我的 Pivot 精选」兜底。运行后会打印归国报告,
想补规则就编辑 `scripts/import_pivot.py` 顶部的 `REGION_RULES`。

---

## 📚 文献追踪面板 — 算法与已知局限

### 数据来源(6 源)

| 源 | 覆盖 | 取什么 | 已知局限 |
|---|---|---|---|
| **PubMed** (E-utilities) | 生物医学期刊 | 标题/摘要/作者/单位/MeSH | 只收录已被 PubMed 索引的期刊;新刊/中文刊缺失 |
| **Europe PMC** | PubMed 超集 + 全文 + 被引数 | 同上 + `citedByCount` + OA 全文链接 | 被引数只统计 Europe PMC 内部的引用,**系统性低于 Web of Science / Scopus** |
| **Europe PMC 预印本** (`SRC:PPR`) | bioRxiv/medRxiv/Research Square | 预印本记录 | 索引有滞后 |
| **bioRxiv API** | bioRxiv 全量 | 按日期窗翻页 + 本地词库过滤 | 官方 API **不支持关键词检索**,只能全量翻页(每页 30 条);详见下方"截断" |
| **arXiv** | q-bio 等 | 少量计算/建模类 | 生物学论文极少投 arXiv,命中量本来就小;官方要求请求间隔 ≥3 秒 |
| **Crossref** | 全学科 DOI 元数据 | 补充非 PubMed 期刊 + `is-referenced-by-count` | `query.bibliographic` 是**宽松相关性匹配**,返回大量弱相关项 —— 全部要再过本站打分器 |

**没用 OpenAlex**:需要 API key,本项目未获授权,故被引数改由 Europe PMC + Crossref 提供。
**没用 Web of Science / Scopus**:需付费订阅,无免费接口。

### 相关性评分(完全透明,面板里每个分数可点开看构成)

分数 ∈ [0, 1],由四部分加权求和,权重写在 `data/interests.json` 的 `score_weights`:

1. **核心词命中**(`core`)—— 你方向里的定义性术语(如 `zswim8`、`tdmd`),权重最高
2. **外围词命中**(`peri`)—— 相关但不特异的词(如 `mirna`、`ampk`)
3. **TF-IDF 余弦**—— 论文文本与该方向词库的向量相似度,捕捉没被词表穷举的表述
4. **加成/惩罚**—— 标题命中乘以 `title_multiplier`(标题里出现比摘要里出现更说明问题);命中 `exclude` 词(如纯植物学、纯临床流行病学语境)按 `exclude_penalty` 扣分

得分 < 0.12 的记录直接丢弃。剩下的按 `bands` 阈值分成 🟣高 / 🔵中 / ⚪低。

**这不是"AI 判断"**,是可复算的字符串匹配 + 向量相似度。你不同意某篇的分数,改 `interests.json` 的词库即可,下次抓取立刻生效。

### 三类标记怎么来的

| 标记 | 判据 | 局限 |
|---|---|---|
| 🔥 **Hotspot** | 引用速率(被引/月)+ 新鲜度(≤60/180 天)+ 预印本已被期刊接收 + 引用加速度 | **引用加速度需要历史快照**:每天抓取会把当天被引数存进 `data/citation_snapshots.json`,累积 ≥7 天后才能算加速度。刚部署时这一项恒为空,面板会如实显示"快照天数不足"。另:新论文被引数天然接近 0,所以"新鲜度"权重是必要的补偿,但也意味着**高分 ≠ 重要**,只是"值得现在看一眼" |
| 🕳️ **Gap** | 正则匹配作者自己写的空白句("remains unclear"、"has not been investigated"、"lack of evidence" 等) | **只能抓到作者明写的空白**。真正的空白往往没人写出来 —— 这是提示,不是空白检测器。面板里**原句照抄展示**,你自己判断 |
| ❓ **Question** | 正则匹配 future work 句式("future studies should"、"it will be important to" 等) | 同上;另有 `limitation` 句作为附加证据展示 |

三类标记都**不做模型改写**,展示的是论文原句,可点 DOI 回原文核对。

### 期刊层级 T1–T4 是自建代理,不是影响因子

JCR 影响因子是 Clarivate 的版权数据,没有免费接口。本站按**公开可查的刊名**做了一个四级分层(`journal_tier()` 里的名单是硬编码的、可读的、你可以直接改)。

- 它**不是** IF,不要写进任何正式材料
- 名单不全,没收录的刊一律归 T4 —— **T4 不代表期刊差,只代表不在名单里**
- 预印本单独标 `preprint`,不参与分层

### bioRxiv 扫描是**有意截断**的

bioRxiv 官方 API 不支持关键词检索,只能按日期窗全量翻页,每页 30 条 —— 60 天窗口约 1.2 万篇,要翻几百次。为了不让每日 Actions 卡死,设了**时间预算 + 页数上限**,超出即停,并在 `data/papers.json` 的 `meta.biorxiv_scan` 里**如实记录**扫了多少 / 总共多少 / 是否截断。

最新的预印本排在前面,所以截断丢的是**较旧的**而不是最相关的;Europe PMC 的 `SRC:PPR` 源提供互补覆盖。

### 去重

三级:归一化 DOI → PMID → 标题相似度(difflib ≥ 0.92,按标题前 12 字符分桶避免 O(n²))。合并时保留字段最全的版本,来源标签取并集,被引数取最大值。

**已修的坑**(留作记录):预印本与其期刊正式版合并时,布尔字段 `preprint` 曾被错误覆盖成 `True`,导致正式期刊论文被标成预印本 —— 布尔字段判空不能用 `not x`。

### 合作者网络的局限

作者姓名按**姓 + 名首字母**匹配。这意味着:同名不同人会被合并;大型联盟论文(几十个作者)会产生大量虚假边。网络图只用于**发现潜在合作方向**,不能当作可靠的社会网络分析。

### 每日自动化

`.github/workflows/update.yml` 每天跑一次:抓资助 → 抓职位 → 建日历 → **抓文献 + 存被引快照** → **生成摘要页 + RSS**,有变化就自动提交。

- 摘要页:`digest.html`(可直接打印/转发)
- RSS:`feed.xml` —— 加进 Feedly / Inoreader / NetNewsWire 即可每日推送
- **不做邮件推送**:发信需要 SMTP 账号密码,放进公开仓库不安全;RSS 效果相同且零凭据

### 本地状态存在浏览器里

收藏 / 已读 / 自定义标签 / 笔记存在 `localStorage`(key `pi_papers_state`),**不上传**。换浏览器或清缓存会丢 —— 重要笔记请用面板的导出按钮存成 Markdown/CSV。

### 调整方向和词库

编辑 `data/interests.json`:每个方向有 `core`(高权重词)、`peri`(低权重词)、`exclude`(降权词),以及各源的检索式 `q_pubmed` / `q_epmc` / `q_arxiv` / `q_crossref`。改完推上去,第二天自动生效;想立刻生效就在 Actions 里手动触发 `workflow_dispatch`。
