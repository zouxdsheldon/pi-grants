# 工具面板自检

在 jsdom 里真实加载 index.html,而不是只做静态字符串检查。

    npm install jsdom
    node verify2.js ../index.html   # 统计引擎 vs scipy/statsmodels 参考值,35 项
    node smoke2.js  ../index.html   # 逐面板点击每个示例按钮,检查是否抛错/输出为空

`exp2.json` 里的参考值由 scipy / statsmodels 独立算出,不是从本页面自身反推的
—— 独立性来自参考库,而不是来自复用同一份输入。

## 已知约定(不是 bug)
- 效应方向统一为 **B − A**:均值差、Cohen's d、log2FC、t 统计量同号。
  scipy 的 `ttest_ind(A,B)` 返回 A−B,故参考值里对 t 取负号。
- 等组样本量时 pooled SE 与 Welch SE 代数上相同,所以负对照必须用
  不等 n(9 vs 4)的数据才能区分这两个区间。

## 负对照
往引擎里注入 5 个已知缺陷(t 方向翻转、Hedges 校正丢失、ω² 退化成 η²、
Welch 区间误用 pooled SE、非中心 F 参数错位),verify2.js 全部能报错。
测试通过本身不算证据,能测出人为植入的错误才算。

## 研究/写作面板断言(assert_new.js)

    node smoke3.js     ../index.html   # 22 个面板逐示例跑,含新增 8 个
    node assert_new.js ../index.html   # 对新增 8 个面板做内容级断言

覆盖 tpat / tzh / tjr / tletter / tguide / tdict / tgap / tprev,断言三类事情:

1. **注册完整性** —— 每个面板必须同时进 `HELP` / `TOOLDOC` / `RENDER_OF` /
   `SIDE_NAV` / `HUB_SECTIONS`。漏 `HELP` 不会报错,只会让帮助条静默消失;
   漏 `RENDER_OF` 会让面板切回来时不重绘。这两种都不会抛异常,只能靠断言查。
2. **页数分池算术** —— K99/F32/R01 的各节页数按 `FUNDSPEC.pools` 分组求和,
   每池分别不超过它自己的上限。早先版本把所有节加成一个总数,于是 13 页对着
   12 页上限也判"没超"。断言直接重算每池和,不看页面自己给的结论。
3. **诚实声明在位** —— 信函面板"不代写"、清单面板"勾齐≠写得清楚"、
   空白扫描"E<5 不给结论"、词典"MeSH 缺新词不是拼错"、外部限制页
   "不做影响因子"。这些是产品口径的一部分,删掉页面照样能跑,所以必须断言。

### 为什么不复用 smoke3.js 的输出

smoke3.js 每个示例只记 110 字符预览。第一次跑负对照时,5 个植入缺陷有 4 个
没被发现 —— 它们改动的证据都在预览截断之后。assert_new.js 读的是面板
**完整** textContent,信函那类还专门只读 `<pre id="lePre">` 正文
(状态行自己就带一个 `〔` 字符,连状态行一起数会把正确的计数判成错)。

### 负对照(7/7 全部能报)

分池退回单池 / 清单免责句删除 / 信函"不代写"删除 / 空白扫描阈值调成恒给结论 /
`HELP.tprev` 删除 / `tgap` 从 `RENDER_OF` 摘掉 / 词典空结果解释删除。

其中两条第一次是"漏报",查下来是**负对照本身打偏了**:改的字串不是断言实际
读的那一句(清单免责句在页面里有两处措辞,词典解释有两种写法)。改成删除
断言真正读的那句之后 7/7 全部报错。断言漏报和负对照打偏是两件事,要分清。

### 顺手修掉的三个真缺陷

- 清单免责句原先只在**全部勾齐**时才出现,首次打开看不到 —— 这句话不该是
  条件式的,已改成表头常显。
- 词典示例把条数设成 6 / 8,而下拉框只有 10 / 25,`ctlSet` 静默返回 false,
  示例看着正常其实没设上。已改成合法值。
- `pvScaffold` 曾被一次**索引反向的切片**(空字符串)整段复制到 `<!DOCTYPE`
  之前,后定义覆盖前定义,修改看起来"不生效"。判断依据是内核里的字符串
  不再以 HTML 开头。改完顺带修了拼接处的重复句号。

## Pivot 导入面板(tpivot)

    python3 run_pivot_parity.py            # 网页端 vs scripts/import_pivot.py 一致性
    node    clickcheck.js ../index.html    # 从侧栏真点一下,面板必须真的打开

**为什么要做一致性测试:** 网页面板给的是「导入后会变成什么样」的预览,
真正跑在 GitHub Actions 里的却是 Python 脚本。两边各写一份归国/去重/列名规则,
漂移的表现是「网页说这条归英国、脚本归兜底」—— 页面不报错,数据悄悄不一致。
所以两边共读 `data/pivot_rules.json`,并由 `run_pivot_parity.py` 逐条比对
47 个归国探针、CSV 解析(基准是 Python 标准库 csv)、列名映射,
以及**端到端**:同一份 CSV 走完两条流水线,逐字段比对最终写进 curated.json 的条目。

负对照(全部能报错):网页端不去重 / verify 标记写成"已核实" / 漏填 src_pivot /
fit 默认值改成"高" / 短缩写改成子串匹配 / CSV 退化成 split(",") /
列名改成完全相等匹配 / 归国永远走兜底。

`clickcheck.js` 补的是另一类漏:markup、引擎、断言全在,唯独少了
`<button class="tab" data-p="tpivot">` —— 侧栏点击静默失败。这次真发生了,
被 `validate_html.py` 的可达性检查抓到。

### inbox_link.js — Pivot 收件箱链接 + 面板绑定
    NODE_PATH=<jsdom路径> node tests/inbox_link.js ../index.html

断言两件事:
1. **链接指向正确的 owner/repo**。三个按钮(上传 / 打开目录 / 立刻运行)的地址是从
   本页 URL 现推的(`owner.github.io/repo` → `github.com/owner/repo`),不是常量。
   推导写错时按钮照样渲染、照样能点,只是把人送到别人的仓库 —— 静默且难发现。
   测 5 种 host:gh-pages、带文件名、被 fork、`file://` 离线版、自定义域名。
2. **面板开箱即绑**。断言的是"打开页面后 `#pvDrop` 已 `dataset.wired`",
   不是"函数存在"。这条来自一个真实 bug:`renderPivot()` 当初只挂在 `RENDER_OF` 上,
   而 `RENDER_OF` 只被筛选芯片和子标签调用 —— 开面板不触发,拖文件进去毫无反应。

负控(6 个,全部被捕获):链接写死成别人的仓库、收件箱路径拼错、离线回落常量指错仓库、
`renderPivot()` 不在启动时调用、手动运行链接指向错 workflow、删掉上传按钮。
