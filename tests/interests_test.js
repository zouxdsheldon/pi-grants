/* 我的研究方向 面板 —— 行为测试
 *
 * 两个环境教训(从 papers_test.js / profile_test.js 带过来,别重犯):
 *  1) 替身 fetch 必须在 parse 之前装好 —— 页面在文档构建期间就同步发 fetch。
 *  2) 页面里的 let/const 是块级声明,必须通过页面自己的作用域取,
 *     直接读 window.X 会拿到 undefined,于是测试「看不到东西也算过」。
 *
 * 本套件钉住的诚实契约:
 *  - I5: 面板不显示预测分数(线上分含 TF-IDF,网页算不准 → 只给命中篇数)
 *  - I6: 换方向会重建语料库,这件事必须写在页面上
 *  - I7: 本地 0 命中不得说成「方向写错了」(现有语料是按旧方向抓的)
 *  - I8: 校验不通过时下载按钮必须禁用(免得传上去第二天才被拒)
 */
const fs = require("fs"), path = require("path");
const { JSDOM } = require("jsdom");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, process.argv[2] || "index.html"), "utf8");

const DATA = {};
for (const f of fs.readdirSync(path.join(root, "data"))) {
  if (f.endsWith(".json")) {
    try { DATA[f] = fs.readFileSync(path.join(root, "data", f), "utf8"); } catch (e) {}
  }
}

let pass = 0, fail = 0;
const T = (name, fn) => {
  try { fn(); console.log("  ok   " + name); pass++; }
  catch (e) { console.log("  FAIL " + name + " — " + (e && e.message || e)); fail++; }
};
const eq = (a, b, m) => { if (a !== b) throw new Error((m || "") + " got=" + JSON.stringify(a) + " want=" + JSON.stringify(b)); };
const ok = (c, m) => { if (!c) throw new Error(m || "assertion failed"); };

const dom = new JSDOM(html, {
  runScripts: "dangerously",
  url: "https://example.github.io/pi-grants/",
  beforeParse(win) {
    // 教训 1:parse 前装好
    win.fetch = (u) => {
      const name = String(u).split("/").pop().split("?")[0];
      if (DATA[name]) return Promise.resolve({ ok: true, status: 200,
        json: () => Promise.resolve(JSON.parse(DATA[name])),
        text: () => Promise.resolve(DATA[name]) });
      // 外部 API(试算)默认不通,单独的测试会临时替换
      return Promise.reject(new Error("offline in test"));
    };
    win.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {} });
    win.URL.createObjectURL = () => "blob:stub";
  },
});

const win = dom.window, doc = win.document;

// 教训 2:通过页面作用域取块级声明
function P(expr) {
  return win.eval(expr);
}

setTimeout(() => {
  console.log("== 我的研究方向 面板 ==");

  // ---- I1 面板存在且可达 ----
  T("I1 面板与入口都存在", () => {
    ok(doc.getElementById("mydirs"), "缺少 #mydirs 面板");
    ok(doc.querySelector('.tab[data-p="mydirs"]'), "缺少 mydirs tab 按钮(左侧导航点了会静默失效)");
    ok(doc.getElementById("dirWrap"), "缺少 #dirWrap");
    ok(doc.getElementById("dirDl"), "缺少下载按钮");
    ok(doc.getElementById("dirInbox"), "缺少收件箱链接");
  });

  // ---- I2 检索式生成:与 Python 端比对由 run_interests_tests.py 做,
  //      这里只钉住形状,免得两边都改错还互相"一致" ----
  T("I2 buildQueries 生成四源检索式且用户无需写语法", () => {
    const q = P('buildQueries(["ampk","metabolic memory"], false)');
    eq(q.q_pubmed, '(ampk[tiab] OR "metabolic memory"[tiab])', "PubMed 式");
    eq(q.q_epmc, '(TITLE_ABS:ampk OR TITLE_ABS:"metabolic memory")', "EPMC 式");
    eq(q.q_arxiv, "", "未勾选 arXiv 时应为空");
    eq(q.q_crossref, "ampk metabolic memory", "Crossref 用自然语言");
    const q2 = P('buildQueries(["tdmd"], true)');
    eq(q2.q_arxiv, "all:tdmd", "勾选 arXiv 时应生成");
    const q3 = P('buildQueries([], false)');
    eq(q3.q_pubmed, "", "空核心词 → 空式");
  });

  T("I2b 带连字符/空格的词自动加引号(用户不用管)", () => {
    const q = P('buildQueries(["co-culture"], false)');
    ok(q.q_pubmed.indexOf('"co-culture"[tiab]') >= 0, "连字符词应加引号: " + q.q_pubmed);
  });

  // ---- I3 读回线上方向 ----
  T("I3 读回线上方向,数量与 interests.json 一致", () => {
    P("dirFromLive()");
    const n = P("MYDIRS.length"), live = P("INTERESTS.length");
    ok(live > 0, "测试数据里应有线上方向");
    eq(n, live, "读回数量");
    ok(P("MYDIRS[0].core.length") > 0, "读回的方向应带核心词");
  });

  // ---- I4 命中计数与线上口径一致(纯子串) ----
  T("I4 命中计数只用子串匹配,与线上 core_hits 同口径", () => {
    const r = P('dirHitCount(["mirna"])');
    ok(r.n > 0, "mirna 应在语料里有命中");
    ok(r.n <= P("PAPERS.length"), "命中数不能超过语料量");
    const z = P('dirHitCount(["zzzznotarealterm"])');
    eq(z.n, 0, "不存在的词应 0 命中");
  });

  // ---- I5 诚实契约:不得出现预测分数 ----
  // 注意作用域:帮助条(hstrip)也渲染在本面板内,并重复同一批披露。
  // 若断言整个面板的 textContent,删掉页面正文里的说明仍会因帮助条而通过
  // —— 这正是首轮 D3/D4 注入被漏掉的原因。故每条披露只在**自己的容器**里断言,
  // 帮助条那份由 I14 独立钉住,两处都不能少。
  T("I5 面板正文不显示预测分数,并说明为什么", () => {
    const t = doc.getElementById("dirConseqBody").textContent;
    ok(/TF.?IDF/i.test(t), "正文必须说明分数算不准的原因(TF-IDF 需过滤前语料)");
    ok(t.indexOf("命中") >= 0, "正文必须给出命中量作为替代信号");
    ok(!/预测分数[^,。]*[:：]\s*0\./.test(doc.getElementById("mydirs").textContent),
       "不得展示具体预测分值");
  });

  // ---- I6 诚实契约:换方向会重建语料库,必须明说 ----
  T("I6 正文明确告知换方向会重建语料库、旧文献会消失", () => {
    const t = doc.getElementById("dirConseqBody").textContent;
    ok(t.indexOf("重建") >= 0 || t.indexOf("从零") >= 0, "正文必须说明语料会重建");
    ok(t.indexOf("消失") >= 0, "正文必须说明不再匹配的旧文献会消失");
    ok(/⭐|收藏/.test(t) && t.indexOf("不会丢") >= 0, "正文必须说明标记不会丢");
    ok(t.indexOf("明早") >= 0 || t.indexOf("定时") >= 0, "正文必须说明生效时间不是即时");
  });

  // ---- I7 诚实契约:本地 0 命中不得断言方向写错 ----
  T("I7 本地 0 命中时不断言方向写错,并指向全库试算", () => {
    P('MYDIRS=[{name:"测试",core:["zzzznotarealterm"],peri:[],w:1,want_arxiv:false,probe:null}]');
    P("renderMyDirs()");
    const t = doc.getElementById("dirWrap").textContent;
    ok(t.indexOf("一篇也没命中") >= 0, "应报告 0 命中");
    ok(t.indexOf("不一定") >= 0, "不得断言方向写错");
    ok(t.indexOf("旧方向") >= 0, "应解释现有语料是按旧方向抓的");
  });

  // ---- I8 校验:不通过则禁用下载 ----
  T("I8 缺名字/缺核心词时下载按钮禁用并列出原因", () => {
    P('MYDIRS=[{name:"",core:[],peri:[],w:1,want_arxiv:false,probe:null}]');
    P("renderMyDirs()");
    const errs = P("dirValidate()");
    ok(errs.length >= 2, "应同时报名字和核心词缺失,got " + JSON.stringify(errs));
    eq(doc.getElementById("dirDl").disabled, true, "下载按钮应禁用");
    ok(doc.getElementById("dirGlobal").textContent.indexOf("还不能下载") >= 0, "应说明为何不能下载");
  });

  T("I8b 阈值高低颠倒会被拦住", () => {
    P('MYDIRS=[{name:"x",core:["ampk"],peri:[],w:1,want_arxiv:false,probe:null}]');
    P("MYBANDS={high:0.1,medium:0.5}");
    P("renderMyDirs()");
    ok(P("dirValidate()").join("|").indexOf("阈值") >= 0, "应报阈值颠倒");
    P("MYBANDS={high:0.55,medium:0.28}");
  });

  T("I8c 填好之后下载按钮启用", () => {
    P('MYDIRS=[{name:"AMPK 与代谢记忆",core:["ampk","tdmd"],peri:["mirna"],w:1,want_arxiv:false,probe:null}]');
    P("renderMyDirs()");
    eq(P("dirValidate().length"), 0, "应无错误");
    eq(doc.getElementById("dirDl").disabled, false, "下载按钮应启用");
  });

  // ---- I9 chip 编辑:回车加词、× 删词 ----
  T("I9 回车加词、× 删词,用户不需要知道分隔规则", () => {
    P('MYDIRS=[{name:"x",core:["ampk"],peri:[],w:1,want_arxiv:false,probe:null}]');
    P("renderMyDirs()");
    const inp = doc.querySelector('[data-dadd="0"][data-df="core"]');
    ok(inp, "缺少加词输入框");
    inp.value = "zswim8";
    inp.dispatchEvent(new win.KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    eq(P('MYDIRS[0].core.join(",")'), "ampk,zswim8", "回车应加词");
    // 逗号也算成词(中英文逗号都要行)
    const inp2 = doc.querySelector('[data-dadd="0"][data-df="core"]');
    inp2.value = "cul3";
    inp2.dispatchEvent(new win.KeyboardEvent("keydown", { key: "，", bubbles: true }));
    ok(P('MYDIRS[0].core.indexOf("cul3")') >= 0, "中文逗号应能成词");
    // 删词
    const x = doc.querySelector('[data-dc="0"][data-df="core"][data-di="0"]');
    ok(x, "缺少删词按钮");
    x.click();
    eq(P('MYDIRS[0].core.indexOf("ampk")'), -1, "× 应删掉该词");
  });

  T("I9b 重复词不会加两遍", () => {
    P('MYDIRS=[{name:"x",core:["ampk"],peri:[],w:1,want_arxiv:false,probe:null}]');
    P("renderMyDirs()");
    const inp = doc.querySelector('[data-dadd="0"][data-df="core"]');
    inp.value = "AMPK";  // 大小写不同,存的是小写
    inp.dispatchEvent(new win.KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    eq(P("MYDIRS[0].core.length"), 1, "同一个词不应重复加入");
  });

  // ---- I10 导出结构必须是导入脚本认的那一份 ----
  T("I10 导出结构含 interests/bands/exclude 且字段名与导入脚本一致", () => {
    P('MYDIRS=[{name:"AMPK",core:["ampk"],peri:["mirna"],w:1.5,want_arxiv:true,probe:null}]');
    const d = P("dirDoc()");
    ok(Array.isArray(d.interests), "缺 interests 数组");
    eq(d.interests[0].name, "AMPK");
    eq(d.interests[0].w, 1.5);
    eq(d.interests[0].core.join(","), "ampk");
    eq(d.interests[0].want_arxiv, true);
    ok(d.bands && typeof d.bands.high === "number", "缺 bands.high");
    ok(Array.isArray(d.exclude), "缺 exclude 数组");
    // 导出里不应含面板内部状态
    ok(!("probe" in d.interests[0]), "不应导出内部 probe 状态");
  });

  // ---- I11 收件箱链接由 URL 推导,不写死 ----
  T("I11 收件箱链接按本页 URL 推导 owner/repo", () => {
    P("wireMyDirsOnce()");
    const h = doc.getElementById("dirInbox").getAttribute("href");
    eq(h, "https://github.com/example/pi-grants/upload/main/data/interests_inbox", "收件箱路径");
  });

  // ---- I12 至少留一个方向 ----
  T("I12 不允许删到零个方向", () => {
    P('MYDIRS=[{name:"x",core:["ampk"],peri:[],w:1,want_arxiv:false,probe:null}]');
    P("renderMyDirs()");
    doc.querySelector('[data-drm="0"]').click();
    eq(P("MYDIRS.length"), 1, "最后一个方向不应被删掉");
    ok(doc.getElementById("dirStat").textContent.indexOf("至少") >= 0, "应说明原因");
  });

  // ---- I13 试算:宽度判读 ----
  T("I13 试算把过宽/为零/合适分别讲清楚", () => {
    const cases = [[0, "拼错"], [148000, "太宽"], [1200, "合适"]];
    for (const [n, want] of cases) {
      P('MYDIRS=[{name:"x",core:["lactate"],peri:[],w:1,want_arxiv:false,probe:{pubmed:' + n + '}}]');
      P("renderMyDirs()");
      const t = doc.getElementById("dirWrap").textContent;
      ok(t.indexOf(want) >= 0, "n=" + n + " 应提示「" + want + "」,实际:" + t.slice(0, 200));
    }
  });

  T("I13b 试算失败要说是网络问题,不能装作方向不好", () => {
    P('MYDIRS=[{name:"x",core:["ampk"],peri:[],w:1,want_arxiv:false,probe:{err:"HTTP 429"}}]');
    P("renderMyDirs()");
    const t = doc.getElementById("dirWrap").textContent;
    ok(t.indexOf("没成功") >= 0 && t.indexOf("429") >= 0, "应报告网络错误原文");
  });

  // ---- I14 帮助条 ----
  T("I14 帮助条讲清四步流程与三条边界", () => {
    const H = P("HELP");
    ok(H && H.mydirs, "HELP 缺 mydirs 条目");
    ok(H.mydirs.caveat.indexOf("重建") >= 0, "caveat 应含语料重建");
    ok(H.mydirs.caveat.indexOf("改不了线上") >= 0, "caveat 应说明静态页无服务端");
    ok(H.mydirs.how.join(" ").indexOf("核心词") >= 0, "how 应解释核心词/外围词区别");
  });

  console.log("\n" + pass + " passed, " + fail + " failed");
  process.exit(fail ? 1 : 0);
}, 900);
