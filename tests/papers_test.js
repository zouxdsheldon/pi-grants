/* tests/papers_test.js — 「文献追踪」分流层的行为测试（jsdom，真实页面 + 真实 data/*.json）
 *
 * 这一层的价值全在「诚实的时间」上：面板声称「上次之后新入库 N 篇」，如果这个 N 是
 * 用发表日期算的、或者会自己悄悄归零，那它比没有更糟 —— 会让人漏读。所以测的是契约：
 *
 *   P1 「新入库」必须走入库台账 first_seen，不得用发表日期 date。
 *      判据：构造一篇发表日期很老但 first_seen 是今天的记录，它必须算新。
 *   P2 「上次查看」只在用户按按钮时前移；仅仅打开面板 / 渲染一次，不得前移。
 *   P3 从未标记过 → 全部算「待过一遍」，且界面必须说明这不是「今天真进了这么多」。
 *   P4 时间戳必须是 JSON 存储：exportAll/importAll 对每个键 JSON.parse，
 *      裸字符串会在备份往返中丢失或被多套一层引号。
 *   P5 折叠的进阶筛选若有条件生效，必须自动展开 —— 隐藏的筛选器会让人以为结果错了。
 *   P6 工作台预设与筛选器叠加（AND），不是互相覆盖。
 *   P7 引用网络列表必须是块级 <li>（标题与计数分列），不得回到 <br>+&nbsp; 伪列表。
 *   P8 无 DOI/PMID 的记录 first_seen 为空，不算新也不算旧，不进分流计数。
 *
 * 跑法：NODE_PATH=<装了 jsdom 的目录> node tests/papers_test.js <index.html> <data 目录>
 * 通常由 tests/run_papers_tests.py 调用。
 */
const fs = require("fs");
const path = require("path");
const { JSDOM, VirtualConsole } = require("jsdom");

const IDX = process.argv[2];
const DATA = process.argv[3];

const fails = [];
const passes = [];
function ok(name, cond, detail) {
  if (cond) passes.push(name);
  else fails.push(name + (detail ? " — " + detail : ""));
}

/* 用真实数据文件伪造 fetch；papers.json 可按需改写（测 P1/P8 要注入构造记录） */
function makeFetch(patch) {
  return function (url) {
    let u = String(url).split("?")[0].split("#")[0];
    u = u.replace(/^\.?\//, "");
    const p = path.join(DATA, "..", u);
    return new Promise(function (res) {
      let body = "{}", okk = true;
      try { body = fs.readFileSync(p, "utf8"); } catch (e) { okk = false; }
      if (okk && patch && /papers\.json$/.test(u)) body = patch(body);
      res({ ok: okk, status: okk ? 200 : 404,
            json: () => Promise.resolve(JSON.parse(body)),
            text: () => Promise.resolve(body) });
    });
  };
}

/* fetch 必须在 beforeParse 里装：页面脚本在 JSDOM 构造过程中就同步调用 loadData()，
   构造完再赋值已经太晚，请求会打空、测试会卡在「数据未载入」。 */
function boot(opts) {
  opts = opts || {};
  let html = fs.readFileSync(IDX, "utf8");
  if (opts.mutate) html = opts.mutate(html);
  const vc = new VirtualConsole();
  const errs = [];
  vc.on("jsdomError", e => errs.push(String(e.message || e)));
  const dom = new JSDOM(html, { runScripts: "dangerously", virtualConsole: vc,
    url: "https://zouxdsheldon.github.io/pi-grants/",
    beforeParse(win) { win.fetch = makeFetch(opts.patchPapers); } });
  return { dom, w: dom.window, errs };
}

/* 页面用 let 声明 PAPERS / PAPMETA / PAPQ —— 块级作用域，不挂 window。
   读状态一律走页面自己的全局作用域，写 w.PAPERS 拿到 undefined 会「因读不到而绿」。 */
function gv(w, expr) { return w.eval(expr); }

function ready(w, tries) {
  return new Promise(function (res, rej) {
    let n = 0;
    (function tick() {
      let okk = false;
      try { okk = gv(w, "PAPERS.length>0 && PAPMETA && typeof renderPapBench==='function'"); }
      catch (e) { okk = false; }
      if (okk) return res();
      if (++n > (tries || 200)) return rej(new Error("PAPERS 未在超时内载入"));
      setTimeout(tick, 25);
    })();
  });
}

/* 切到文献面板并渲染一次（面板默认不是首屏，不切过去 DOM 是空的） */
function showPapers(w) {
  gv(w, "(function(){ if(typeof show==='function'){show('papers');} else {renderPapers();} })()");
}

const TODAY = new Date().toISOString().slice(0, 10);
function daysAgo(n) {
  const d = new Date(Date.now() - n * 86400000);
  return d.toISOString().slice(0, 10);
}

(async function main() {
  /* ============ P1 / P8：新入库看台账，不看发表日期 ============ */
  {
    /* 注入三条构造记录：
       A 发表很老(2019) 但今天入库  → 必须算新
       B 发表很新(昨天) 但入库日期在上次查看之前 → 必须不算新
       C 无 DOI/PMID，first_seen 为空 → 既不算新也不算旧 */
    const patch = (body) => {
      const d = JSON.parse(body);
      const proto = d.papers[0];
      const mk = (o) => Object.assign({}, proto, o);
      d.papers = d.papers.concat([
        mk({ i: 900001, title: "TEST_A_old_pub_new_intake", doi: "10.0/testA",
             pmid: "90000001", date: "2019-03-01", first_seen: TODAY, band: "high", tags: [] }),
        mk({ i: 900002, title: "TEST_B_new_pub_old_intake", doi: "10.0/testB",
             pmid: "90000002", date: daysAgo(1), first_seen: daysAgo(30), band: "high", tags: [] }),
        mk({ i: 900003, title: "TEST_C_no_ids", doi: null, pmid: null,
             date: daysAgo(1), first_seen: null, band: "high", tags: [] })
      ]);
      return JSON.stringify(d);
    };
    const { w } = boot({ patchPapers: patch });
    await ready(w);
    /* 上次查看设为 10 天前 */
    gv(w, `setLastSeen(${JSON.stringify(daysAgo(10) + "T00:00:00.000Z")})`);
    const titles = gv(w, "papNewList().map(function(p){return p.title})");
    const hasA = titles.indexOf("TEST_A_old_pub_new_intake") >= 0;
    const hasB = titles.indexOf("TEST_B_new_pub_old_intake") >= 0;
    const hasC = titles.indexOf("TEST_C_no_ids") >= 0;
    ok("P1 老论文今天入库 → 算新入库（走台账，不走发表日期）", hasA,
       "papNewList 未包含 TEST_A");
    ok("P1 新论文旧入库 → 不算新入库", !hasB, "papNewList 误含 TEST_B");
    ok("P8 无 DOI/PMID（first_seen 空）不进新入库计数", !hasC,
       "papNewList 误含无标识记录 TEST_C");

    /* ============ P2：渲染不得前移「上次查看」 ============ */
    const before = gv(w, "getLastSeen()");
    showPapers(w);
    gv(w, "renderPapers()"); gv(w, "renderPapBench()");
    const after = gv(w, "getLastSeen()");
    ok("P2 打开/渲染面板不前移「上次查看」时间戳", before === after,
       `before=${before} after=${after}`);

    /* 按按钮才前移，且「新入库」归零 */
    const btn = w.document.getElementById("papMarkSeen");
    ok("P2 「标记为已看过」按钮存在", !!btn);
    if (btn) {
      btn.click();
      const after2 = gv(w, "getLastSeen()");
      ok("P2 点按钮后时间戳前移", after2 > before, `after2=${after2}`);
      ok("P2 前移后新入库归零", gv(w, "papNewList().length") === 0,
         "still " + gv(w, "papNewList().length"));
    }

    /* ============ P4：时间戳必须能过备份往返 ============ */
    const roundtrip = gv(w, `(function(){
      var t = getLastSeen();
      var dump = exportAll();
      localStorage.removeItem("pi_papers_lastseen");
      importAll(dump);
      return [t, getLastSeen()];
    })()`);
    ok("P4 时间戳能过 exportAll→importAll 往返且值不变",
       roundtrip[0] && roundtrip[0] === roundtrip[1],
       `before=${roundtrip[0]} after=${roundtrip[1]}`);
  }

  /* ============ P3：从未标记 → 全部待过一遍，且界面说明 ============ */
  {
    const { w } = boot({});
    await ready(w);
    gv(w, "localStorage.removeItem('pi_papers_lastseen')");
    showPapers(w);
    gv(w, "renderPapBench()");
    const nWithFs = gv(w, "PAPERS.filter(function(p){return !!p.first_seen}).length");
    const nNew = gv(w, "papNewList().length");
    ok("P3 从未标记过 → 待过一遍 = 全部有台账记录的文献", nNew === nWithFs,
       `nNew=${nNew} nWithFs=${nWithFs}`);
    const bench = w.document.getElementById("papBench").textContent;
    ok("P3 首次使用时标签说明这是「待过一遍」而非「今天新增」",
       /待过一遍/.test(bench), "bench=" + bench.slice(0, 120));
    const seen = w.document.getElementById("papSeen").textContent;
    ok("P3 说明台账起始日（不假装知道更早的入库时间）",
       /台账自|从未/.test(seen), "seen=" + seen.slice(0, 140));

    /* ============ P6：预设与筛选器叠加（AND），不是覆盖 ============ */
    gv(w, "PAPQ='star'");
    gv(w, "renderPapers()");
    const nStarOnly = gv(w, "PAPERS.filter(function(x){return ppass(x,null)}).length");
    ok("P6 未收藏任何文献时「我的收藏」预设结果为 0（预设真的生效）",
       nStarOnly === 0, "got " + nStarOnly);
    /* 预设 dig 与一个正交筛选叠加后不得变多 */
    gv(w, "PAPQ='dig'"); gv(w, "renderPapers()");
    const nDig = gv(w, "PAPERS.filter(function(x){return ppass(x,null)}).length");
    w.document.getElementById("pap_oa").checked = true;
    gv(w, "renderPapers()");
    const nDigOa = gv(w, "PAPERS.filter(function(x){return ppass(x,null)}).length");
    ok("P6 预设 + 筛选器为 AND（叠加后不增加）", nDigOa <= nDig,
       `dig=${nDig} dig+oa=${nDigOa}`);
    ok("P6 预设 dig 本身有筛选效果（少于全库）", nDig < gv(w, "PAPERS.length"),
       `dig=${nDig} all=${gv(w, "PAPERS.length")}`);

    /* ============ P5：隐藏的进阶筛选生效时必须自动展开 ============ */
    gv(w, "PAPQ=''");
    const fg = w.document.getElementById("papFgrp");
    fg.classList.remove("openadv");
    w.document.getElementById("pap_oa").checked = true;   /* 进阶区里的条件 */
    gv(w, "renderPapers()");
    ok("P5 折叠区有条件生效 → 自动展开", fg.classList.contains("openadv"),
       "class=" + fg.className);
    ok("P5 展开时提示「已自动展开」", /自动展开/.test(w.document.getElementById("papMore").textContent),
       w.document.getElementById("papMore").textContent);
    /* 反向：清掉后不应强制展开（用户可以自己收起） */
    w.document.getElementById("pap_oa").checked = false;
    fg.classList.remove("openadv");
    gv(w, "renderPapers()");
    ok("P5 进阶区无条件时不强制展开", !fg.classList.contains("openadv"),
       "class=" + fg.className);

    /* ============ P7：引用网络是块级列表，不是 <br> 伪列表 ============ */
    const cb = w.document.getElementById("citeBanner");
    const hasNet = gv(w, "!!(CITENET && (CITENET.edges_n || (CITENET.foundational||[]).length))");
    if (hasNet && cb && cb.style.display !== "none") {
      const nLi = cb.querySelectorAll("ol.fnd li").length;
      const fnd = gv(w, "(CITENET.foundational||[]).filter(function(f){return f.n>=2}).length");
      if (fnd > 0) {
        ok("P7 地基文献渲染为块级 <li>（标题与计数分列）", nLi > 0,
           `li=${nLi} foundational>=2 = ${fnd}`);
        ok("P7 每篇一行：li 数 = 可显示的地基文献数（上限 6）",
           nLi === Math.min(6, fnd), `li=${nLi} expect=${Math.min(6, fnd)}`);
      } else {
        passes.push("P7 跳过：语料内暂无 ≥2 次被引的地基文献");
      }
      ok("P7 不得回到 <br>+&nbsp; 伪列表",
         !/&nbsp;&nbsp;·/.test(cb.innerHTML), "仍含 &nbsp; 拼接");
    } else {
      passes.push("P7 跳过：CITENET 无数据");
    }
  }

  /* ---- 结果 ---- */
  console.log(passes.length + " passed");
  if (fails.length) {
    console.log("\n" + fails.length + " FAILED:");
    fails.forEach(f => console.log("  ✗ " + f));
    process.exit(1);
  }
  console.log("all green");
})().catch(e => { console.log("HARNESS ERROR: " + (e && e.stack || e)); process.exit(2); });
