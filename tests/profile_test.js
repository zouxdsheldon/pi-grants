/* tests/profile_test.js — 「我的档案」智能层的行为测试（jsdom，无需浏览器）
 *
 * 为什么用 jsdom 而不是 DOM 桩：这一层的核心是「填一个字段 → 判定与提示立刻变」，
 * 桩会把事件、class、innerHTML 全吃掉，测出来的绿是假的。jsdom 跑真实页面 + 真实
 * data/*.json，断言的是**诚实性契约**，不只是「不报错」：
 *
 *   H1 空档案不得产出任何「能投」——留空一律「信息不足」，不许猜。
 *   H2 年份表示法不过期：把系统年份推到明年，博后年数必须 +1。
 *   H3 手填年数优先：用户手改年数后，不得被年份静默盖回去。
 *   H4 影响面索引只能来自 data/funds.json 的 rules —— 规则里出现的字段必须全部在册，
 *      不在规则里的字段不许冒充「能解锁判定」。
 *   H5 「差一步」只对可改字段成立：国籍/年龄这类当下改不了的门槛失败，永远不能被
 *      美化成「差一步」。
 *   H6 缺口列表按解锁数降序，且只列真正留空的字段。
 *   H7 每个「✏️ 去填 X」按钮指向的字段必须真实存在于 schema —— 否则点了跳到空处。
 *   H8 窗口倒计时的三种态（还剩 N 年 / 最后一年 / 已过窗口）必须和 rules 的上界一致。
 *
 * 跑法：NODE_PATH=<装了 jsdom 的目录> node tests/profile_test.js <index.html> <data 目录>
 * 通常由 tests/run_profile_tests.py 调用。
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

/* ---- 用真实数据文件伪造 fetch：同源 data/*.json 全部走本地磁盘 ---- */
function makeFetch() {
  return function (url) {
    let u = String(url).split("?")[0].split("#")[0];
    u = u.replace(/^\.?\//, "");
    const p = path.join(DATA, "..", u);
    return new Promise(function (res) {
      let body = "{}", okk = true;
      try { body = fs.readFileSync(p, "utf8"); } catch (e) { okk = false; }
      res({ ok: okk, status: okk ? 200 : 404,
            json: () => Promise.resolve(JSON.parse(body)),
            text: () => Promise.resolve(body) });
    });
  };
}

function boot(mutate, nowYear) {
  let html = fs.readFileSync(IDX, "utf8");
  if (mutate) html = mutate(html);
  const vc = new VirtualConsole();
  const errs = [];
  vc.on("jsdomError", e => errs.push(String(e.message || e)));
  /* 关键：页面脚本在 JSDOM 构造过程中就同步跑完了（loadData() 立即发起 fetch），
     构造完再赋 w.fetch 已经太晚 —— 那时请求早已打空。所以 fetch 与 Date 都必须
     在 beforeParse 里装好。之前这里就是因为装晚了，测试卡在「数据未载入」。 */
  const dom = new JSDOM(html, { runScripts: "dangerously", virtualConsole: vc,
    url: "https://zouxdsheldon.github.io/pi-grants/",
    beforeParse(win) {
      win.fetch = makeFetch();
      if (nowYear) {
        const RealDate = win.Date;
        function FakeDate(...a) {
          if (!a.length) return new RealDate(nowYear + "-06-15T00:00:00Z");
          return new RealDate(...a);
        }
        FakeDate.prototype = RealDate.prototype;
        FakeDate.now = () => new RealDate(nowYear + "-06-15T00:00:00Z").getTime();
        FakeDate.parse = RealDate.parse; FakeDate.UTC = RealDate.UTC;
        win.Date = FakeDate;
      }
    } });
  const w = dom.window;
  if (false) {
    /* 只改「今年是哪一年」，不动其他 Date 行为 */
    const RealDate = w.Date;
    function FakeDate(...a) {
      if (!a.length) return new RealDate(nowYear + "-06-15T00:00:00Z");
      return new RealDate(...a);
    }
    FakeDate.prototype = RealDate.prototype;
    FakeDate.now = () => new RealDate(nowYear + "-06-15T00:00:00Z").getTime();
    w.Date = FakeDate;
  }
  return { dom, w, errs };
}

/* 页面用 let 声明 FUNDS / PSCHEMA / PKEY —— 块级作用域，不会挂到 window 上。
   所以读状态一律走页面自己的全局作用域（w.eval），不能写 w.FUNDS：
   那样拿到的是 undefined，测试会「因为读不到而绿」，属于假通过。 */
function gv(w, expr) { return w.eval(expr); }

/* 等 loadData() 把 FUNDS / PSCHEMA 灌进去 */
function ready(w, tries) {
  return new Promise(function (res, rej) {
    let n = 0;
    (function tick() {
      let okk = false;
      try { okk = gv(w, "FUNDS.length>0 && PSCHEMA && PSCHEMA.fields && PSCHEMA.fields.length>0"); }
      catch (e) { okk = false; }
      if (okk) return res();
      if (++n > (tries || 200)) return rej(new Error("FUNDS/PSCHEMA 未在超时内载入"));
      setTimeout(tick, 25);
    })();
  });
}

const FUNDS_JSON = JSON.parse(fs.readFileSync(path.join(DATA, "funds.json"), "utf8"));
const SCHEMA_JSON = JSON.parse(fs.readFileSync(path.join(DATA, "profile_schema.json"), "utf8"));

(async function main() {
  /* ================= 主实例 ================= */
  const { w, errs } = boot(null, null);
  await ready(w);
  ok("页面无 jsdom 级错误", errs.length === 0, errs.slice(0, 2).join(" | "));

  const setProf = p => w.localStorage.setItem(gv(w, "PKEY"), JSON.stringify(p));

  /* ---- H1 空档案不得有「能投」 ---- */
  setProf({});
  let counts = w.profileVerdictCounts();
  ok("H1 空档案 0 个「能投」", counts.yes === 0, JSON.stringify(counts));
  ok("H1 空档案 0 个「差一步」", counts.near === 0, JSON.stringify(counts));
  ok("H1 空档案全部落到信息不足/不符",
     counts.unknown + counts.no === gv(w, "FUNDS.length"), JSON.stringify(counts));

  /* ---- H4 影响面索引只能来自 funds.json ---- */
  const ruleFields = new Set();
  FUNDS_JSON.funds.forEach(f => (f.rules || []).forEach(r => ruleFields.add(r.field)));
  const impact = w.fieldImpact();
  const impactKeys = Object.keys(impact);
  ok("H4 规则里的字段全部在影响面索引里",
     [...ruleFields].every(k => impactKeys.indexOf(k) >= 0),
     [...ruleFields].filter(k => impactKeys.indexOf(k) < 0).join(","));
  ok("H4 索引里没有规则外的字段",
     impactKeys.every(k => ruleFields.has(k)),
     impactKeys.filter(k => !ruleFields.has(k)).join(","));
  /* 计数必须等于真的引用了该字段的基金数 */
  let cntOK = true, cntBad = "";
  impactKeys.forEach(k => {
    const real = FUNDS_JSON.funds.filter(f => (f.rules || []).some(r => r.field === k)).length;
    if (impact[k].length !== real) { cntOK = false; cntBad = k + ":" + impact[k].length + "≠" + real; }
  });
  ok("H4 影响面计数与 funds.json 一致", cntOK, cntBad);

  /* ---- H7 跳转按钮的目标字段必须存在于 schema ---- */
  const schemaKeys = new Set(SCHEMA_JSON.fields.map(f => f.key));
  ok("H7 每个可跳转字段都在 schema 里",
     [...ruleFields].every(k => schemaKeys.has(k)),
     [...ruleFields].filter(k => !schemaKeys.has(k)).join(","));

  /* ---- H2 年份不过期 ---- */
  const yr = new w.Date().getFullYear();
  setProf({ postdoc_start_year: yr - 3, phd_year: yr - 5 });
  let eff = w.getProfileEff();
  ok("H2 博后年数由年份算出", eff.postdoc_years === 3, "got " + eff.postdoc_years);
  ok("H2 PhD 年数由年份算出", eff.years_since_phd === 5, "got " + eff.years_since_phd);

  /* ---- H6 缺口列表：降序 + 只列留空 ---- */
  const gaps = w.profileGaps();
  let desc = true;
  for (let i = 1; i < gaps.length; i++) if (gaps[i].n > gaps[i - 1].n) desc = false;
  ok("H6 缺口按解锁数降序", desc, gaps.map(g => g.key + ":" + g.n).join(","));
  ok("H6 缺口只含留空字段",
     gaps.every(g => w.isBlank(eff[g.key])),
     gaps.filter(g => !w.isBlank(eff[g.key])).map(g => g.key).join(","));
  ok("H6 已填字段不出现在缺口里",
     !gaps.some(g => g.key === "postdoc_years"), "postdoc_years 已由年份算出却仍报缺");

  /* ---- H5 「差一步」只对可改字段成立 ----
     注意 op 词表必须从 data/funds.json 实际取（in / has / lte / nhas），
     不能凭印象写 max/eq/contains_any —— 那样整段会静默跳过而报绿。 */
  const OPS_PRESENT = new Set();
  FUNDS_JSON.funds.forEach(f => (f.rules || []).forEach(r => OPS_PRESENT.add(r.op)));
  ok("H5/H8 前置：op 词表已知", [...OPS_PRESENT].every(o => ["in","has","lte","nhas"].indexOf(o) >= 0),
     "出现未知 op：" + [...OPS_PRESENT].join(","));

  /* 按某条规则构造一个「满足」它的值 */
  function satisfy(p, r) {
    if (r.op === "in") p[r.field] = [].concat(r.value)[0];
    else if (r.op === "has") p[r.field] = [].concat(p[r.field] || []).concat([r.value]);
    else if (r.op === "nhas") p[r.field] = [];
    else if (r.op === "lte") p[r.field] = Number(r.value);
  }
  /* 按某条规则构造一个「明确不满足」（且非空）的值 */
  function violate(p, r) {
    if (r.op === "in") {
      const sch = SCHEMA_JSON.fields.find(f => f.key === r.field);
      const alt = (sch && sch.options || []).map(o => o.v).find(v => [].concat(r.value).indexOf(v) < 0);
      p[r.field] = alt || "__other__";
    } else if (r.op === "has") {
      p[r.field] = ["__elsewhere__"];           /* 非空但不含所需项 */
    } else if (r.op === "nhas") {
      p[r.field] = [r.value];
    } else if (r.op === "lte") {
      p[r.field] = Number(r.value) + 5;
    }
  }

  const citFund = FUNDS_JSON.funds.find(f => (f.rules || []).some(r => r.field === "citizenship"));
  ok("H5 前置：存在带国籍门槛的基金", !!citFund);
  if (citFund) {
    const p = {};
    (citFund.rules || []).forEach(r => satisfy(p, r));
    violate(p, (citFund.rules || []).find(r => r.field === "citizenship"));
    const v = w.evalFund2(citFund, w.deriveProfile(p));
    ok("H5 国籍不符判为「不符」而非「差一步」", v.status === "no",
       citFund.id + " → " + v.status);
  }

  /* 正面：只差一个可改字段（且该字段已明确回答）时必须是 near */
  const softFund = FUNDS_JSON.funds.find(f =>
    (f.rules || []).some(r => ["willing_relocate","has_position","institution"].indexOf(r.field) >= 0));
  ok("H5 前置：存在带可改门槛的基金", !!softFund);
  if (softFund) {
    const sr = (softFund.rules || []).find(r =>
      ["willing_relocate","has_position","institution"].indexOf(r.field) >= 0);
    const p = {};
    (softFund.rules || []).forEach(r => { if (r !== sr) satisfy(p, r); });
    violate(p, sr);                                  /* 只有这一项明确不满足 */
    const v2 = w.evalFund2(softFund, w.deriveProfile(p));
    ok("H5 只差可改字段时判为「差一步」", v2.status === "near",
       softFund.id + "/" + sr.field + " → " + v2.status +
       " soft=" + JSON.stringify((v2.soft || []).map(x => x.field)));
    ok("H5 「差一步」必须点名差哪个字段",
       v2.status === "near" && (v2.soft || []).some(x => x.field === sr.field),
       JSON.stringify((v2.soft || []).map(x => x.field)));

    /* 诚实性红线：同一个可改字段**留空**时，只能是「信息不足」，绝不能美化成「差一步」，
       更不能算「能投」。留空 ≠ 回答了「没有」。 */
    const pb = {};
    (softFund.rules || []).forEach(r => { if (r !== sr) satisfy(pb, r); });
    delete pb[sr.field];
    const v3 = w.evalFund2(softFund, w.deriveProfile(pb));
    ok("H5 可改字段留空 → 信息不足（不得当成差一步/能投）", v3.status === "unknown",
       sr.field + " 留空 → " + v3.status);
  }

  /* ---- H8 窗口倒计时与 rules 上界一致（上界 op 在本站数据里是 "lte"） ---- */
  const maxFund = FUNDS_JSON.funds.find(f => (f.rules || []).some(r =>
    r.op === "lte" && (SCHEMA_JSON.fields.find(x => x.key === r.field) || {}).type === "number"));
  ok("H8 前置：存在数值上界规则的基金", !!maxFund,
     "没有 lte+number 规则 —— 这一段若跳过就是假绿");
  if (maxFund) {
    const mr = (maxFund.rules || []).find(r => r.op === "lte" &&
      (SCHEMA_JSON.fields.find(x => x.key === r.field) || {}).type === "number");
    const mk = mr.field, lim = Number(mr.value);
    const mkP = v => { const o = {}; o[mk] = v; return w.deriveProfile(o); };
    const wOpen = w.windowLeft(maxFund, mkP(lim - 2));
    const wLast = w.windowLeft(maxFund, mkP(lim));
    const wOver = w.windowLeft(maxFund, mkP(lim + 3));
    ok("H8 窗口内剩余年数正确", wOpen && wOpen.left === 2, JSON.stringify(wOpen));
    ok("H8 最后一年 left=0", wLast && wLast.left === 0, JSON.stringify(wLast));
    ok("H8 超窗 left<0", wOver && wOver.left === -3, JSON.stringify(wOver));
    ok("H8 徽标文案：最后一年", w.windowBadge(wLast).indexOf("最后一个窗口年") >= 0,
       w.windowBadge(wLast));
    ok("H8 徽标文案：已超窗", w.windowBadge(wOver).indexOf("已超窗") >= 0,
       w.windowBadge(wOver));
    ok("H8 字段留空时不显示倒计时（不许凭空造窗口）",
       w.windowLeft(maxFund, w.deriveProfile({})) === null,
       JSON.stringify(w.windowLeft(maxFund, w.deriveProfile({}))));
  }

  /* ---- 完整度是个真分数 ---- */
  const comp = w.profileCompleteness();
  ok("完整度 total = 判定相关字段数", comp.total === ruleFields.size,
     comp.total + " vs " + ruleFields.size);
  ok("完整度 pct 在 0..100", comp.pct >= 0 && comp.pct <= 100, String(comp.pct));

  /* ---- 面板真的渲染出东西，且空档案时不出现「能投」字样 ---- */
  setProf({});
  w.checkElig();
  const html0 = w.document.getElementById("eligResult").innerHTML;
  ok("空档案面板给出填档案引导", html0.indexOf("还没有档案") >= 0);
  ok("空档案面板不出现「现在能投」结论", html0.indexOf("现在能投") < 0);
  ok("空档案面板给出补填按钮", html0.indexOf("openPfField(") >= 0);

  setProf({ career_stage: "postdoc", citizenship: "cn", postdoc_start_year: yr - 2,
            phd_year: yr - 3, age: 32, first_author_papers: 7,
            institution: "MSKCC", has_position: [], willing_relocate: "yes" });
  w.checkElig();
  const html1 = w.document.getElementById("eligResult").innerHTML;
  ok("有档案面板给出小结", html1.indexOf("按你现在的档案") >= 0);
  ok("有档案面板显示完整度条", html1.indexOf("pfbar") >= 0);
  w.paintChip();
  const chip = w.document.getElementById("pfMeter").innerHTML;
  ok("顶部条显示能投数与完整度", chip.indexOf("✅") >= 0 && chip.indexOf("pfbar") >= 0, chip.slice(0, 120));

  /* ---- 弹层：改一个字段，实时判定条必须跟着变 ----
     选哪个字段来改不能凭感觉：上一版随手挑了 willing_relocate，而在那份档案下
     它并不改变任何判定（别的规则先把结果压成「信息不足」了），于是测试报「未变化」
     其实是探针选错，不是代码坏。这里改成：先在纯逻辑层找出一个**确实会改变判定分布**
     的字段值，再去界面上改它，最后要求判定条真的跟着动。 */
  {
    const baseProf = { career_stage: "postdoc", citizenship: "cn", postdoc_start_year: yr - 2,
                       phd_year: yr - 3, age: 32, first_author_papers: 7,
                       institution: "MSKCC", has_position: [], willing_relocate: "yes" };
    const tally = pp => {
      const c = { yes: 0, near: 0, unknown: 0, no: 0 };
      FUNDS_JSON.funds.forEach(f => { c[w.evalFund2(f, w.deriveProfile(pp)).status]++; });
      return JSON.stringify(c);
    };
    const t0 = tally(baseProf);
    /* 候选：每个「in」型规则字段的每个取值，以及 has_position 的各地区 */
    let probe = null;
    const cands = [];
    SCHEMA_JSON.fields.forEach(f => {
      if (!f.options) return;
      f.options.forEach(o => cands.push([f.key, f.type === "multi" ? [o.v] : o.v]));
    });
    for (const [k, v] of cands) {
      const p2 = Object.assign({}, baseProf); p2[k] = v;
      if (tally(p2) !== t0) { probe = [k, v]; break; }
    }
    ok("实时判定条前置：找到一个会改变判定的字段", !!probe,
       "没有任何单字段改动能改变判定分布 —— 探针无效");
    if (probe) {
      setProf(baseProf);
      /* 探针字段可能落在第 1 步也可能第 2 步 —— 按 schema 的 group 打开对应那一步，
         否则输入框根本没渲染，失败的是测试而不是页面。 */
      const pf = SCHEMA_JSON.fields.find(f => f.key === probe[0]);
      w.openPf(((pf && pf.group) || "basic") === "basic" ? 1 : 2);
      const live0 = w.document.getElementById("pfLive").innerHTML;
      ok("弹层有实时判定条", live0.indexOf("能投") >= 0, live0.slice(0, 120));
      const [pk, pv] = probe;
      const el = w.document.getElementById("pff_" + pk);
      ok("弹层渲染出该字段的输入（" + pk + "）", !!el);
      if (el) {
        if (Array.isArray(pv)) {
          const sp = [...el.querySelectorAll("span")].find(x => x.dataset.v === pv[0]);
          ok("多选项存在（" + pv[0] + "）", !!sp);
          if (sp) sp.click();                       /* 走页面自己的 onclick → pfLive() */
        } else {
          el.value = pv;
          el.dispatchEvent(new w.Event("change", { bubbles: true }));
        }
        const live1 = w.document.getElementById("pfLive").innerHTML;
        ok("改字段后实时判定条更新（" + pk + "→" + JSON.stringify(pv) + "）",
           live1 !== live0, "判定条未变：" + live1.slice(0, 140));
        /* 判定条上的数字必须与逻辑层一致，不能只是「变了」 */
        const p3 = Object.assign({}, baseProf); p3[pk] = pv;
        const c3 = JSON.parse(tally(p3));
        ok("判定条数字与逻辑层一致",
           live1.indexOf("能投 " + c3.yes) >= 0 && live1.indexOf("不符 " + c3.no) >= 0,
           "期望 yes=" + c3.yes + " no=" + c3.no + " 实际：" + live1.replace(/<[^>]+>/g, " "));
      }
    }
    /* 字段影响提示必须写明影响哪些基金 */
    const formHTML = w.document.getElementById("pfForm").innerHTML;
    ok("字段下方写明影响哪些资助", formHTML.indexOf("fimpact") >= 0);
  }

  /* ---- H9 打开弹层、翻页、保存 —— 一整趟不得抹掉任何已存答案 ----
     这是本次真正抓到的一个数据丢失缺陷：档案里存着 citizenship="cn"，而当时选项表里
     没有 cn，fieldHTML 就把它丢了 → 下拉显示「未选择」→ collectStep 把 undefined 写回
     草稿 → 用户一点保存，答案被静默抹掉。

     ⚠️ 这个测试第一版是假绿的：它靠反复调 openPf(step) 来翻页，而 openPf 每次都会
     用 getProfileEff() 重新灌满草稿，等于每翻一页就把丢掉的值又补回来，缺陷被掩盖。
     现在改成走用户真实路径 —— 点「下一步」按钮翻页、点「保存」落盘 —— 并且最终
     断言的是 **localStorage 里存下来的东西**，而不是中途的草稿。 */
  {
    const roundTrip = prof => {
      const b = boot(null, null);
      return ready(b.w).then(() => {
        const K = gv(b.w, "PKEY");
        b.w.localStorage.setItem(K, JSON.stringify(prof));
        const $ = id => b.w.document.getElementById(id);
        b.w.openPf(1);                       /* 用户点「✏️ 填写/修改档案」 */
        $("pfNext").click();                 /* → 第 2 步 */
        $("pfNext").click();                 /* → 第 3 步 */
        $("pfSave").click();                 /* 保存落盘 */
        const saved = JSON.parse(b.w.localStorage.getItem(K) || "{}");
        b.dom.window.close();
        return saved;
      });
    };
    /* (a) 词表内的正常值：翻完三步保存后必须原样在盘上 */
    const p1 = { display_name: "Sheldon", institution: "MSKCC", citizenship: "cn",
                 career_stage: "postdoc", postdoc_start_year: yr - 3,
                 age: 33, first_author_papers: 7,
                 has_position: ["US"], willing_relocate: ["US", "HK"] };
    const a1 = await roundTrip(p1);
    ok("H9 保存后国籍不丢", a1.citizenship === "cn", "got " + JSON.stringify(a1.citizenship));
    ok("H9 保存后阶段不丢", a1.career_stage === "postdoc", "got " + a1.career_stage);
    ok("H9 保存后年份不丢", Number(a1.postdoc_start_year) === yr - 3, "got " + a1.postdoc_start_year);
    ok("H9 保存后多选不丢", (a1.has_position || []).indexOf("US") >= 0 &&
       (a1.willing_relocate || []).length === 2, JSON.stringify(a1.willing_relocate));
    ok("H9 保存后姓名/单位不丢", a1.display_name === "Sheldon" && a1.institution === "MSKCC",
       JSON.stringify([a1.display_name, a1.institution]));
    /* (b) 词表外的值（换词表 / 外部导入的档案）同样不许被抹 */
    const a2 = await roundTrip({ citizenship: "__legacy_value__", has_position: ["ZZ"] });
    ok("H9 词表外的单选值保存后仍在", a2.citizenship === "__legacy_value__",
       "got " + JSON.stringify(a2.citizenship));
    ok("H9 词表外的多选值保存后仍在", (a2.has_position || []).indexOf("ZZ") >= 0,
       JSON.stringify(a2.has_position));
  }

  /* ---- openPfField 真的打开到那一步并高亮 ---- */
  w.closePf();
  w.openPfField("citizenship");
  await new Promise(r => setTimeout(r, 150));
  ok("openPfField 打开了弹层",
     w.document.getElementById("pfModal").className.indexOf("open") >= 0,
     w.document.getElementById("pfModal").className);
  ok("openPfField 定位到含该字段的步骤",
     !!w.document.getElementById("pff_citizenship"));

  /* ================= H2b 明年再打开：年数自动 +1 ================= */
  {
    const b = boot(null, new w.Date().getFullYear() + 1);
    await ready(b.w);
    b.w.localStorage.setItem(gv(b.w, "PKEY"), JSON.stringify({ postdoc_start_year: yr - 3 }));
    const e2 = b.w.getProfileEff();
    ok("H2b 明年打开博后年数自动 +1", e2.postdoc_years === 4, "got " + e2.postdoc_years);
    b.dom.window.close();
  }

  /* ================= H3 手填年数优先 ================= */
  {
    const b = boot(null, null);
    await ready(b.w);
    b.w.localStorage.setItem(gv(b.w, "PKEY"), JSON.stringify({ postdoc_start_year: yr - 3 }));
    b.w.openPf(2);
    const src = b.w.document.getElementById("pff_postdoc_start_year");
    const dst = b.w.document.getElementById("pff_postdoc_years");
    ok("H3 年份与年数两个输入都在", !!src && !!dst);
    if (src && dst) {
      ok("H3 初始由年份自动算出", dst.value === "3", "got " + dst.value);
      dst.value = "9";
      dst.dispatchEvent(new b.w.Event("input", { bubbles: true }));
      ok("H3 手填年数后年份被清空", src.value === "", "src=" + src.value);
      b.w.collectStep();
      /* PFDRAFT 同样是 let 声明 —— 必须走页面作用域读，否则拿到 undefined 而误判 */
      const got = gv(b.w, "deriveProfile(PFDRAFT).postdoc_years");
      ok("H3 手填的 9 年没被年份盖掉", Number(got) === 9, "got " + got);
      ok("H3 年份已从草稿中清除",
         gv(b.w, "PFDRAFT.postdoc_start_year===undefined||PFDRAFT.postdoc_start_year===''"),
         "postdoc_start_year=" + gv(b.w, "String(PFDRAFT.postdoc_start_year)"));
    }
    b.dom.window.close();
  }

  /* ================= 输出 ================= */
  console.log("PASS " + passes.length + " FAIL " + fails.length);
  fails.forEach(f => console.log("  ✗ " + f));
  process.exit(fails.length ? 1 : 0);
})().catch(e => { console.log("HARNESS ERROR " + (e && e.message)); process.exit(2); });
