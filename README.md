# Grants Finder Pro — 早期 PI 资助 / 职位 / 文献追踪站(开源模板)

一个**纯静态、自动更新**的网站模板,把早期研究者找钱、找教职、追文献这三件事放在一个页面里。
**任何人 fork 后填自己的信息即可使用** —— 个人信息只存在使用者自己的浏览器里,不进仓库、不上传服务器。

在线示例:fork 后你的地址是 `https://<你的用户名>.github.io/<仓库名>/`

---

## 三分钟上手

**只是想用一下(不部署)**
打开站点 → 右上角 **✏️ 填写/修改档案** → 三步填完。资格自查、资助匹配排序、文献相关性会立刻按你的信息重算。
不确定要填什么,先点 **👤 载入示例档案** 看效果。

**想要属于自己的一份(含每日自动抓取)**

1. Fork 本仓库。
2. 仓库 **Settings → Pages → Source 选 `GitHub Actions`**。
3. 仓库 **Settings → Actions → General → Workflow permissions 选 `Read and write permissions`**(让定时任务能提交数据)。
4. **Actions 标签 → `Update grants data` → Run workflow** 跑一次。十分钟后站点就活了。

---

## 要改的只有 `data/` 里这几个 JSON,不用动 `index.html`

| 改什么 | 文件 | 作用 |
|---|---|---|
| 站名 / 副标题 / 仓库链接 | `data/config.json` | 页头页脚显示。`site_url`、`repo_url` 留空时,脚本与页面会从 GitHub Pages 地址自动推导 |
| **研究方向与关键词** | `data/interests.json` | 最重要的一个。决定文献抓取用什么检索式、相关性怎么算、资助怎么排序。字段写法见 `data/interests.template.json` |
| 资助清单与资格规则 | `data/funds.json` | 「资格自查」那一栏。增删基金、改判定规则都在这里,不用碰代码 |
| 档案表单问哪些字段 | `data/profile_schema.json` | 引导弹层的字段定义 |
| 示例档案 | `data/profile.example.json` | 「载入示例档案」按钮读它 |
| 院所 / 职位板清单 | `data/institutions.json` | 「院所目录」那一栏。`fit` 是契合度评分,按自己方向重排或整份替换 |
| 院所搜索兜底词 | `data/config.json` 的 `job_search_topic` | 官网链接失效时,🔍 按钮拼出的搜索词(例如 `assistant professor synthetic biology`) |
| 日历收录范围 | `data/config.json` 的 `ics_filter` | `career_stages` 留空=全部收录;`exclude_citizenship_required` 剔除限定公民身份的项目 |

### `data/funds.json` 的规则语法

每个基金一条记录,`rules` 是一个数组,全部通过才判「现在能投」:

```json
{
  "id": "k99",
  "name": "NIH K99/R00 (Pathway to Independence)",
  "flag": "🇺🇸", "agency": "NIH", "region": "美国",
  "url": "https://grants.nih.gov/...",
  "summary_zh": "博后→独立 PI 转轨奖。",
  "write_key": "k99",
  "rules": [
    {"field": "career_stage", "op": "in", "value": ["postdoc"],
     "pass_zh": "处于博士后阶段", "fail_zh": "当前身份为「{v}」,K99 要求申请时仍是博士后"},
    {"field": "postdoc_years", "op": "lte", "value": 4,
     "pass_zh": "博后 {v} 年,在 ≤4 年窗口内", "fail_zh": "博后已 {v} 年,超出窗口"}
  ]
}
```

算子:`eq` / `ne` / `gte` / `lte` / `in`(值在列表里)/ `has`(多选字段包含某项)/ `nhas`(不包含)/ `truthy` / `falsy`。
`{v}` 会替换成用户填的值。`write_key` 指向写作面板里对应的草稿模板。

### 资格判定的诚实边界

- **只用你填过的字段判定。留空 = 显示「信息不足」,绝不猜成「能申」。** 一个字段都没填时,所有基金一律显示「信息不足」,不给任何假阳性。
- 规则是各基金公开条款的**简化版**。窗口延期、机构豁免、特殊通道、逐年变动的细则都没编进去。
- **最终一律以官方 NOFO / 申报指南为准。** 每条判定旁边都有官方链接,请点进去核对。
- 联邦机会卡片上的资格徽章更弱:Grants.gov 的资格字段是**机构级**的,公民身份写在 NOFO 正文里,数据里根本没有。所以那里只用「数据里真有的字段 + 你填的职业阶段」做粗筛,标注为启发式。

---

## 隐私:你的数据在哪

档案、申请管线、文献收藏/标签/笔记 —— 全部存在**你自己浏览器的 localStorage**,不发往任何服务器,也不会进 git。
后果是:换电脑或清缓存就没了。所以档案条上有 **⇅ 导入 / 导出**,存成一个 JSON 文件带走即可。

仓库里不含任何人的个人信息。fork 之后你也不需要往仓库里写自己的信息。

---

## 写作面板里的示例内容

写作指导面板里的完整范文、六类基金草稿(K99/R00、F32、R01、海外优青、RGC ECS、NRF)和语料库,
都是围绕**一个具体研究方向的示例**(miRNA 降解 × 能量应激代谢记忆)写出来的。
它演示的是**结构与句式**,不是要你照抄科学内容 —— 六部分骨架
(Significance / Innovation / Approach / Career / 预算 / 检查清单)对任何方向都通用,
换成你自己的课题时把科学名词替换掉即可。

---

## 数据来源与自动化

- **美国联邦机会** `data/grants.json` — `scripts/fetch_grants.py` 抓 Grants.gov,每日刷新,剔除过期,按截止排序。抓取在 GitHub 的服务器上完成,与你本地网络无关。
- **各国 PI 资助精选** `data/curated.json` — 人工策展 + 可选的 Pivot-RP 导入。
- **学术职位** `data/jobs.json` — `scripts/fetch_jobs.py`。
- **文献** `data/papers.json` — `scripts/fetch_papers.py`,六源抓取,详见下方「文献追踪面板」章节。
- **截止日历** `data/grant_deadlines.ics` — `scripts/build_ics.py`,滚动两年不过期,可用 webcal 订阅。
- **每日摘要与 RSS** — `scripts/build_digest.py` 生成 `digest.html` 与 `feed.xml`。

不想等定时任务:**Actions → 选对应 workflow → Run workflow**。

### 调整联邦机会的搜索范围

编辑 `scripts/fetch_grants.py` 顶部的 `KEYWORDS` 列表,以及 `HI`/`MID`(相关度打分词)。push 后下次运行生效。

### 从 Pivot-RP 导入(合法用法)

Pivot-RP 没有面向个人的 API,且其编辑描述是 Clarivate 版权内容,不能整段搬运。
把它当**发现工具**,导出后只并入**事实字段 + 官方链接**:

1. Pivot-RP 里勾选想要的机会 → **Export**(导出 CSV)。
2. 放到 `data/pivot_export.csv`。
3. 运行 `python3 scripts/import_pivot.py data/pivot_export.csv`。
4. 脚本只保留项目名/资助方/截止日/金额/链接;描述留空,请用你自己的话补 `note`。
5. `git add -A && git commit && git push` → 自动重新部署。

**自动归国**:按资助方名判定国家/地区(NIH→🇺🇸、ERC→🇪🇺、Wellcome→🇬🇧、NSFC→🇨🇳、
JSPS→🇯🇵、A*STAR/NRF→🇸🇬、NHMRC→🇦🇺、CIHR→🇨🇦、HFSP→🌍…),识别不到的进兜底分区。
补规则编辑 `scripts/import_pivot.py` 顶部的 `REGION_RULES`。

没有 Pivot 订阅完全不影响使用 —— 联邦数据源和文献追踪都不依赖它。

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
