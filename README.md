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
