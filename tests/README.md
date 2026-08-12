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
