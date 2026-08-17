/* inbox_link.js — Pivot 收件箱链接 + 面板真正被绑上的契约测试
 *
 * 为什么要有这个测试:
 *  1) 收件箱按钮指向 GitHub 上的目录。链接是从本页 URL 现推的
 *     (owner.github.io/repo → github.com/owner/repo),不是写死的常量 ——
 *     万一推导写错,按钮照样渲染出来、照样能点,只是把人送到别人的仓库。
 *     这种错静默且难发现,只能靠断言不同 host 下推出的地址。
 *  2) renderPivot() 里绑着拖放区、文件选择和这三个链接。它曾经只挂在
 *     RENDER_OF 上,而 RENDER_OF 只被筛选芯片/子标签调用 —— 开面板不触发,
 *     结果整个面板是死的:拖文件进去没反应。所以这里断言的是
 *     「打开页面后 drop 区已 wired」,而不是「函数存在」。
 *
 * 用法: NODE_PATH=<jsdom> node inbox_link.js ../index.html
 */
const fs = require("fs"), path = require("path");
let JSDOM, VirtualConsole;
try { ({ JSDOM, VirtualConsole } = require("jsdom")); }
catch (e) {
  console.log("SKIP: 未装 jsdom(NODE_PATH 未指向 node_modules);跳过而非假装通过。");
  process.exit(0);
}

const file = path.resolve(process.argv[2] || "../index.html");
const html = fs.readFileSync(file, "utf8");
const fails = [];

function load(url, cb) {
  const dom = new JSDOM(html, { runScripts: "dangerously", url,
                                virtualConsole: new VirtualConsole() });
  setTimeout(() => cb(dom.window, dom.window.document), 2600);
}

/* 期望:每个 host 场景推出的 owner/repo */
const CASES = [
  ["https://zouxdsheldon.github.io/pi-grants/",           "zouxdsheldon/pi-grants", "gh-pages"],
  ["https://zouxdsheldon.github.io/pi-grants/index.html", "zouxdsheldon/pi-grants", "带文件名"],
  ["https://someone.github.io/forked-repo/",              "someone/forked-repo",    "被 fork"],
  ["file:///tmp/pi-grants_offline.html",                  "zouxdsheldon/pi-grants", "离线版回落"],
  ["https://grants.example.org/",                         "zouxdsheldon/pi-grants", "自定义域名回落"],
];

let done = 0;
CASES.forEach(([url, expect, label]) => {
  load(url, (w, d) => {
    const up  = d.getElementById("pvGhUp");
    const dir = d.getElementById("pvGhDir");
    const run = d.getElementById("pvGhRun");

    if (!up || !dir || !run) { fails.push(`${label}: 三个收件箱按钮不全`); }
    else {
      const href = up.getAttribute("href");
      /* 光看 href 非空不够 —— 要断言指向的正是这个 owner/repo */
      if (!href) fails.push(`${label}: 上传按钮 href 未设置(renderPivot 没被调用?)`);
      else {
        if (href !== `https://github.com/${expect}/upload/main/data/pivot_inbox`)
          fails.push(`${label}: 上传链接指向错仓库 -> ${href}`);
        if (dir.getAttribute("href") !== `https://github.com/${expect}/tree/main/data/pivot_inbox`)
          fails.push(`${label}: 目录链接不对 -> ${dir.getAttribute("href")}`);
        if (run.getAttribute("href") !== `https://github.com/${expect}/actions/workflows/update.yml`)
          fails.push(`${label}: 手动运行链接不对 -> ${run.getAttribute("href")}`);
      }
    }

    /* 面板必须是「活的」:开页面就已绑好,不依赖任何额外交互 */
    if (label === "gh-pages") {
      const drop = d.getElementById("pvDrop");
      if (!drop) fails.push("拖放区 #pvDrop 不存在");
      else if (drop.dataset.wired !== "1")
        fails.push("拖放区未绑定 —— renderPivot() 没在启动时被调用,面板是死的");
      if (!d.getElementById("pvRun")) fails.push("解析按钮 #pvRun 不存在");
      /* 面板必须可达(左栏 → 隐藏 .tab → panel.active) */
      const link = d.querySelector('#sideNav a.sitem[data-side="tpivot"]');
      if (!link) fails.push("左栏没有 tpivot 入口");
      else {
        link.click();
        const p = d.getElementById("tpivot");
        if (!p || p.className.indexOf("active") < 0)
          fails.push("点左栏后面板没激活(缺 .tab[data-p=tpivot] 按钮?)");
      }
    }

    if (++done === CASES.length) {
      if (fails.length) { fails.forEach(f => console.log("FAIL: " + f)); process.exit(1); }
      console.log(`PASS: 收件箱链接在 ${CASES.length} 种 host 下均指向正确 owner/repo;` +
                  `面板开箱即绑(拖放区 wired、按钮就位、左栏可达)`);
    }
  });
});
