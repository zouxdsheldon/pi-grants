
/* 科研数据集面板 —— 行为测试
 * 关注点:分层是否真的分层、类型徽章是否与数据一致、出处论文是否真实可点、
 *        筛选是否真的收窄、空结果是否给出路、带词链接是否名副其实。
 */
const fs=require("fs"), {JSDOM}=require("jsdom");
const html=fs.readFileSync("index.html","utf8");
const dom=new JSDOM(html,{runScripts:"dangerously",pretendToBeVisual:true,url:"https://x.test/"});
const w=dom.window, d=w.document;
let fail=0, pass=0;
function ck(name,cond,extra){ if(cond){pass++;console.log("  ok   "+name);}
  else{fail++;console.log("  FAIL "+name+(extra?"  → "+extra:""));} }

setTimeout(()=>{
  const CAT=w.DBCAT;
  ck("D1 目录已加载", Array.isArray(CAT)&&CAT.length>=8, "组数="+(CAT?CAT.length:"undef"));

  const items=[].concat(...CAT.map(g=>g.it));
  ck("D2 条目数 ≥70", items.length>=70, "实际 "+items.length);

  // 每条必须有:名称、链接、说明、怎么用、类型
  const nouse=items.filter(x=>!x.h||x.h.length<10);
  ck("D3 每条都有「怎么用」", nouse.length===0, nouse.map(x=>x.n).join(","));
  const nokind=items.filter(x=>!["D","T","R"].includes(x.k));
  ck("D4 每条类型合法(D/T/R)", nokind.length===0, nokind.map(x=>x.n+":"+x.k).join(","));
  const nourl=items.filter(x=>!/^https?:\/\//.test(x.u||""));
  ck("D5 每条链接是绝对 URL", nourl.length===0, nourl.map(x=>x.n).join(","));

  // 出处论文:PMID 必须是纯数字且长度合理 —— 编造的 PMID 常见形态是带字母或过短
  const badp=items.filter(x=>x.p && !/^\d{7,8}$/.test(x.p));
  ck("D6 PMID 全为 7-8 位数字", badp.length===0, badp.map(x=>x.n+":"+x.p).join(","));
  const nop=items.filter(x=>!x.p);
  ck("D7 全部条目都有出处论文", nop.length===0, "缺 "+nop.length+" 条: "+nop.map(x=>x.n).join(","));
  // PMID 不能重复(复制粘贴时最容易犯的错)
  const seen={},dup=[];
  items.forEach(x=>{ if(x.p){ if(seen[x.p]) dup.push(x.n+"="+seen[x.p]+"("+x.p+")"); seen[x.p]=x.n; }});
  ck("D8 PMID 无重复", dup.length===0, dup.join(", "));
  /* q 字段的唯一用途是"带检索词打开";不含 {q} 的 q 等同于 u,属于无意义字段,
     渲染器会正确降级为"打开"(不说谎),但数据应在源头挡掉,避免日后被误当作可检索。 */
  const fakeQ=items.filter(x=>x.q && x.q.indexOf("{q}")<0);
  ck("D8b q 字段都含 {q} 占位符", fakeQ.length===0, fakeQ.map(x=>x.n).join(",")||"");

  // 渲染
  w.DB_KIND=""; w.renderDB();
  const box=d.getElementById("dbList");
  const cards=box.querySelectorAll(".dbcard");
  ck("D9 渲染出全部卡片", cards.length===items.length, cards.length+" vs "+items.length);

  // 层级导航条:每层一个入口,且带条数
  const navs=d.querySelectorAll("#dbNav a.dbnav");
  ck("D10 层级导航条目数 = 层数", navs.length===CAT.length, navs.length+" vs "+CAT.length);
  const navsum=[...navs].reduce((a,e)=>a+parseInt(e.querySelector("b").textContent,10),0);
  ck("D11 导航条数之和 = 总条目", navsum===items.length, navsum+" vs "+items.length);
  // 锚点必须真实存在,否则点了跳不动
  /* 注意:锚点与区块 id 出自同一表达式,"锚点存在"是恒真断言(2026-08-20 负控 N4 漏报证实)。
     真正会出错的是 id 碰撞(组名首字符重复) 与 导航/区块数量不一致,改测这两项。 */
  const aids=[...navs].map(a=>a.getAttribute("data-anchor"));
  ck("D12a 锚点互不重复", new Set(aids).size===aids.length, aids.join(","));
  const grps=d.querySelectorAll("#dbList .sitegrp");
  ck("D12b 区块数 = 导航数", grps.length===navs.length, grps.length+" vs "+navs.length);
  const gids=[...grps].map(e=>e.id);
  ck("D12c 区块 id 互不重复", new Set(gids).size===gids.length, gids.join(","));

  // 出处引用行:数量对得上,且链接指向 pubmed
  const cites=box.querySelectorAll(".dbcite");
  ck("D13 出处行数 = 有 PMID 的条目数", cites.length===items.filter(x=>x.p).length,
     cites.length+" vs "+items.filter(x=>x.p).length);
  const badcite=[...cites].filter(c=>{
    const a=c.querySelector("a");
    return !a || !/pubmed\.ncbi\.nlm\.nih\.gov\/\d{7,8}\//.test(a.href);
  });
  ck("D14 出处链接指向 PubMed 且含 PMID", badcite.length===0, badcite.length+" 条异常");

  // 类型徽章要与数据一致,不能全都贴一样的
  const badges=[...box.querySelectorAll(".kbadge")];
  ck("D15 徽章数 = 卡片数", badges.length===cards.length, badges.length+" vs "+cards.length);
  const kinds=new Set(badges.map(b=>b.className.replace("kbadge ","")));
  ck("D16 三种类型徽章都出现", kinds.size===3, [...kinds].join(","));

  // 类型筛选必须真的收窄
  w.DB_KIND="T"; w.renderDB();
  const nT=box.querySelectorAll(".dbcard").length, expT=items.filter(x=>x.k==="T").length;
  ck("D17 筛「工具」条数正确", nT===expT&&nT>0&&nT<items.length, nT+" vs "+expT);
  w.DB_KIND="R"; w.renderDB();
  const nR=box.querySelectorAll(".dbcard").length, expR=items.filter(x=>x.k==="R").length;
  ck("D18 筛「仓库」条数正确", nR===expR&&nR>0, nR+" vs "+expR);
  w.DB_KIND=""; w.renderDB();

  // 关键词筛选
  d.getElementById("dbF").value="磷酸化";
  w.renderDB();
  const nf=box.querySelectorAll(".dbcard").length;
  ck("D19 关键词筛选收窄且非空", nf>0&&nf<items.length, "筛出 "+nf);

  // 空结果必须给出路,不能只是一句"没有"
  d.getElementById("dbF").value="zzz不存在的词zzz";
  w.renderDB();
  const et=box.textContent;
  ck("D20 空结果给出可操作建议", /清空|试试|常用词/.test(et)&&et.length>40, et.slice(0,60));
  d.getElementById("dbF").value="";

  // 带词打开:含占位符的才显示"带词打开",且替换后不能残留 {q}
  d.getElementById("dbQ").value="ZSWIM8";
  w.renderDB();
  const links=[...box.querySelectorAll("a.sq")];
  const withTerm=links.filter(a=>a.textContent.includes("带词"));
  ck("D21 存在带词打开的链接", withTerm.length>0, withTerm.length+" 条");
  const leftover=links.filter(a=>a.href.includes("{q}")||a.href.includes("%7Bq%7D"));
  ck("D22 链接无残留占位符", leftover.length===0, leftover.length+" 条残留");
  const liar=links.filter(a=>a.textContent.includes("带词")&&!a.href.includes("ZSWIM8"));
  ck("D23 标「带词」的链接确实含检索词", liar.length===0, liar.length+" 条名不副实");

  // 声明必须还在(诚实边界不能被改没)
  const hon=d.querySelector("#tdb .honest").textContent;
  // ── 层筛选(149 条规模下的核心可用性)
  const chips=[...d.querySelectorAll("#dbGrp .gbtn")];
  ck("D26 层 chip 数 = 层数+1(含「全部层」)", chips.length===CAT.length+1, chips.length+" vs "+(CAT.length+1));
  const allChip=chips[0];
  ck("D27 「全部层」计数 = 总条目", parseInt(allChip.querySelector("b").textContent,10)===items.length,
     allChip.textContent.trim());
  const chipSum=chips.slice(1).reduce((a,e)=>a+parseInt(e.querySelector("b").textContent,10),0);
  ck("D28 各层 chip 计数之和 = 总条目", chipSum===items.length, chipSum+" vs "+items.length);
  // 点某层必须真收窄,且只剩该层的区块
  const L=CAT[3].g.charAt(0);
  w.DB_GRP=L; w.renderDB();
  const nG=box.querySelectorAll(".dbcard").length, expG=CAT[3].it.length;
  ck("D29 选中层后只显示该层条目", nG===expG&&nG<items.length, nG+" vs "+expG);
  ck("D30 选中层后只剩一个区块", box.querySelectorAll(".sitegrp").length===1,
     box.querySelectorAll(".sitegrp").length+" 个区块");
  // 关键:选中一层后,其它层 chip 计数不能变 0(否则无法切换层)
  const chips2=[...d.querySelectorAll("#dbGrp .gbtn")].slice(1);
  const zeros=chips2.filter(e=>parseInt(e.querySelector("b").textContent,10)===0);
  ck("D31 选中层后其它层计数仍非零(可切换)", zeros.length===0, zeros.length+" 层显示 0");
  ck("D32 选中层的 chip 高亮", chips2.some(e=>e.getAttribute("data-g")===L&&e.className.indexOf("on")>=0));
  // 层 × 类型 必须能叠加
  w.DB_KIND="T"; w.renderDB();
  const nGT=box.querySelectorAll(".dbcard").length, expGT=CAT[3].it.filter(x=>x.k==="T").length;
  ck("D33 层与类型筛选可叠加", nGT===expGT, nGT+" vs "+expGT);
  w.DB_KIND=""; w.DB_GRP=""; w.renderDB();
  ck("D34 清空层筛选后恢复全部", box.querySelectorAll(".dbcard").length===items.length);
  // 规模与覆盖:11 层、每层不少于 4 条,否则分层没意义
  ck("D35 层数 ≥11", CAT.length>=11, CAT.length+" 层");
  const thin=CAT.filter(x=>x.it.length<4);
  ck("D36 每层 ≥4 条", thin.length===0, thin.map(x=>x.g+"("+x.it.length+")").join(","));
  ck("D37 条目数 ≥140", items.length>=140, items.length+" 条");

  ck("D24 保留不代理/不缓存声明", /不代理.*不缓存.*不镜像/.test(hon));
  ck("D25 保留出处核对说明", /Europe PMC/.test(hon));

  console.log("\n通过 "+pass+" / 失败 "+fail);
  process.exit(fail?1:0);
}, 900);
