/* offline_test.js — verifies the standalone single-file build.
   Deliberately does NOT stub fetch: the inline-data shim must serve
   data/*.json on its own, or the file is useless offline. */
const fs = require("fs"), vm = require("vm");
const { JSDOM, VirtualConsole } = require("jsdom");
const f = process.argv[2], html = fs.readFileSync(f, "utf8");

/* 1) every <script> block must parse */
const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const synFails = [];
scripts.forEach((sc, i) => { try { new vm.Script(sc); } catch (e) { synFails.push(i + ": " + e.message); } });
console.log("scripts:", scripts.length, "syntax fails:", synFails.length, synFails.join(" | "));

/* 2) load with no fetch stub at all */
const errs = [];
const vc = new VirtualConsole();
vc.on("jsdomError", e => errs.push(e.message));
vc.on("error", m => errs.push(String(m)));
const dom = new JSDOM(html, { runScripts: "dangerously", url: "file:///x/y.html", virtualConsole: vc });
const w = dom.window, d = w.document;

setTimeout(() => {
  const R = { offlineFlag: !!w.__OFFLINE_BUILD,
              inlineKeys: w.__INLINE_DATA ? Object.keys(w.__INLINE_DATA).length : 0 };
  const ids = ["liveN", "curN", "jobN", "papN", "jrnN"];
  R.counts = {};
  ids.forEach(id => { const e = d.getElementById(id); R.counts[id] = e ? (e.textContent || "").trim() : "(no el)"; });
  R.tsearch = !!d.getElementById("tsearch");
  R.subtabs = d.querySelectorAll("#tsearch .subtab").length;
  try { R.sites = w.SITES.reduce((a, g) => a + g.it.length, 0); } catch (e) { R.sites = "ERR " + e.message; }
  R.errs = errs.slice(0, 5);

  /* storage fallback: file:// origins are opaque, so localStorage throws.
     The whole site reads it (收藏/管线/自检) — without a fallback the page dies. */
  R.storage = (function () {
    try { w.localStorage.setItem("__probe", "1");
          const v = w.localStorage.getItem("__probe");
          w.localStorage.removeItem("__probe");
          return v === "1" ? "ok" : "roundtrip failed: " + JSON.stringify(v);
    } catch (e) { return "THREW " + e.message; }
  })();
  R.memFlag = !!w.__STORAGE_IS_MEMORY;
  R.banner = (function () { const b = d.getElementById("offlineBar");
    return b ? (b.textContent || "").trim().slice(0, 80) : "(none)"; })();
  R.snapbar = (function () { const b = d.getElementById("snapbar");
    return b ? (b.textContent || "").trim().slice(0, 120) : "(none)"; })();

  const fails = [];
  if (synFails.length) fails.push("script syntax: " + synFails.join(" | "));
  if (R.storage !== "ok") fails.push("localStorage fallback broken: " + R.storage);
  if (R.banner === "(none)") fails.push("offline banner missing — user cannot tell this is the single-file build");
  if (R.memFlag && R.banner.indexOf("单文件") < 0) fails.push("memory-storage warning not surfaced in banner");
  if (R.snapbar.indexOf("数据加载失败") >= 0) fails.push("snapbar reports load failure: " + R.snapbar);
  if (!R.offlineFlag) fails.push("offline shim did not install");
  if (R.inlineKeys < 15) fails.push("inline data only " + R.inlineKeys + " files");
  /* 离线版是用户真正双击打开的那一份 —— 线上改好的分组若没同步进来,
     他看到的仍是旧导航。所以分组契约要在这一份上单独验一次。 */
  (function () {
    const nav = w.SIDE_NAV || [];
    const groups = nav.map(g => g.g).filter(Boolean);
    const lit = groups.filter(g => /文献|数据库/.test(g));
    if (lit.length !== 1)
      fails.push("离线版左栏文献/数据库分组 " + lit.length + " 个(应为 1): " + lit.join(" / "));
    if (groups.length > 8) fails.push("离线版左栏分组 " + groups.length + " 个 — 过多");
    const inNav = new Set();
    nav.forEach(g => (g.items || []).forEach(it => inNav.add(it.p)));
    const subOf = w.SUB_OF || {};
    const orphan = [];
    (w.HUB_SECTIONS || []).forEach(sec => (sec.tools || []).forEach(t => {
      if (t.ext || t.sp) return;
      const hostp = subOf[t.p] || t.p;
      if (!inNav.has(hostp)) orphan.push(t.nm);
    }));
    if (orphan.length) fails.push("离线版 hub 有但左栏进不去: " + orphan.join(", "));
  })();
  if (!R.tsearch) fails.push("merged search page missing");
  if (R.subtabs !== 7) fails.push("subtabs " + R.subtabs + " (want 7)");
  if (typeof R.sites !== "number" || R.sites < 40) fails.push("SITES " + R.sites);
  /* the point of the build: counts must be real numbers, not 0 / placeholder */
  ids.forEach(id => {
    const v = parseInt(String(R.counts[id]).replace(/[^0-9]/g, ""), 10);
    if (!(v > 0)) fails.push("count " + id + " = " + JSON.stringify(R.counts[id]) + " — inline data did not reach the app");
  });
  if (errs.length) fails.push("console errors: " + errs.slice(0, 2).join(" | "));

  R.nFail = fails.length; R.fails = fails;
  fs.writeFileSync("/tmp/offline.json", JSON.stringify(R, null, 1));
  console.log(JSON.stringify(R.counts), "| tsearch", R.tsearch, "subtabs", R.subtabs,
              "sites", R.sites, "| inlineKeys", R.inlineKeys);
  console.log(fails.length ? ("FAIL " + fails.length + "\n - " + fails.join("\n - ")) : "PASS");
}, 3000);
