/* pivot_parity.js — 证明网页端的 Pivot 导入逻辑与 scripts/import_pivot.py 完全一致。
   本文件绝不自己实现一份规则:它把页面里的 pvGuessRegion / pvParseCSV / pvBuildIndex
   取出来,在同一批探针上跑,结果交给 Python 侧逐条比对。
   用法: node pivot_parity.js <index.html> <pivot_rules.json> <probes.json> <out.json> */
const fs = require("fs");
const { JSDOM, VirtualConsole } = require("jsdom");

const page   = fs.readFileSync(process.argv[2], "utf8");
const rules  = JSON.parse(fs.readFileSync(process.argv[3], "utf8"));
const probes = JSON.parse(fs.readFileSync(process.argv[4], "utf8"));
const outPath = process.argv[5] || "/tmp/js_pivot.json";

const vc  = new VirtualConsole();          // 页面自身的报错不该淹没比对输出
const dom = new JSDOM(page, { runScripts: "dangerously", url: "https://x.test/",
                              virtualConsole: vc });
const w = dom.window;

setTimeout(() => {
if (typeof w.pvGuessRegion !== "function") {
  fs.writeFileSync(outPath, JSON.stringify({ error: "pvGuessRegion 未定义" }));
  console.log("FAIL: pvGuessRegion missing");
  process.exit(1);
}
w.PVRULES = rules;

const out = {
  regions: probes.funders.map(f => w.pvGuessRegion(f, "")),
  csv:     w.pvParseCSV(probes.csv_text),
  idx:     w.pvBuildIndex(probes.headers)
};
/* 端到端:整份 CSV 走完 pvProcess,拿到真正会写进 curated.json 的条目。
   逐个字段比对才能发现「三个零件各自对、拼起来错」的情形。 */
if (typeof w.pvProcess === "function") {
  try {
    /* CURATED 用 let 声明 → 不是 window 属性,w.CURATED=... 只会建一个影子属性,
       页面里的绑定纹丝不动(去重会假装通过)。必须在页面自己的作用域里赋值。 */
    w.eval("CURATED = " + JSON.stringify(probes.existing || []) + ";");
    if (w.eval("CURATED.length") !== (probes.existing || []).length) {
      out.entries_error = "注入 CURATED 失败,去重比对无效"; throw new Error(out.entries_error);
    }
    w.pvProcess([{name: "probe.csv", text: probes.csv_text}]);
    out.entries = w.PVPARSED;               // 真正会被下载/合并的条目
  } catch (e) { out.entries_error = String(e && e.message || e); }
} else { out.entries_error = "pvProcess 未定义"; }
fs.writeFileSync(outPath, JSON.stringify(out));
console.log("ok regions=" + out.regions.length);
}, 2500);
