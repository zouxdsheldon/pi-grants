const fs=require("fs"),{JSDOM,VirtualConsole}=require("jsdom");
const dom=new JSDOM(fs.readFileSync(process.argv[2],"utf8"),
  {runScripts:"dangerously",url:"https://x.test/",virtualConsole:new VirtualConsole()});
const w=dom.window,d=w.document;
setTimeout(()=>{
  // 走用户真实路径:点左侧栏那一项,而不是直接调 renderPivot()
  const link=d.querySelector('#sideNav a.sitem[data-side="tpivot"]');
  if(!link){console.log("FAIL 侧栏没有 tpivot 入口");process.exit(1);}
  link.click();
  const p=d.getElementById("tpivot");
  const vis=p&&p.className.indexOf("active")>=0;
  const body=(p&&p.textContent||"").trim();
  console.log("侧栏可点:是 | 面板激活:"+(vis?"是":"否")+" | 正文字数:"+body.length);
  console.log("含『本地解析』声明:"+/本地|不会上传|不上传/.test(body));
  console.log("有文件选择控件:"+!!d.getElementById("pvFile")+" | 有预览按钮:"+!!d.getElementById("pvDry"));
  process.exit(vis&&body.length>100?0:1);
},2500);