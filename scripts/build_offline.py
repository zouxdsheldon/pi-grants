#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""build_offline.py — 把站点打包成一个双击即用的单文件 HTML。

之前这个构建逻辑只存在于会话里的一段临时代码,工作区一被清理就没了,
只能凭记忆重写(那次就把 offlineBar 的 id 写丢了,测试当场报红)。
所以固化成脚本,纳入仓库。

    python3 scripts/build_offline.py [输出路径]

做三件事:
  1. 把 data/*.json 全部内联进 window.__INLINE_DATA;
  2. 垫掉 fetch —— 页面里的 fetch("./data/x.json?v=123") 要能命中,
     所以查表前必须先剥掉 ?query 和 #hash(这个坑真踩过:
     站点给数据 URL 加了缓存串,垫片按精确路径匹配,于是全部落空);
  3. 垫掉 localStorage —— file:// 下部分浏览器直接抛异常,
     退化成内存存储,并在顶栏如实告诉用户「关窗即丢」。

顶栏那个 <div id="offlineBar"> 的 id 是 tests/offline_test.js 的契约,
不要改名。
"""
import json, os, sys, glob, datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IDX = os.path.join(ROOT, "index.html")
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(
    os.path.dirname(ROOT), "pi-grants_单文件离线版.html")

SHIM_HEAD = """<script>
/* ---- 单文件离线版前置垫片 ---- */
window.__OFFLINE_BUILD=1;
(function(){
  var ok=false;
  try{ window.localStorage.setItem("__t","1"); window.localStorage.removeItem("__t"); ok=true; }catch(e){ ok=false; }
  if(!ok){
    window.__STORAGE_IS_MEMORY=1;
    var mem={};
    var shimStore={getItem:function(k){return (k in mem)?mem[k]:null;},
      setItem:function(k,v){mem[k]=String(v);},removeItem:function(k){delete mem[k];},
      clear:function(){mem={};},key:function(i){return Object.keys(mem)[i]||null;},
      get length(){return Object.keys(mem).length;}};
    try{Object.defineProperty(window,"localStorage",{value:shimStore,configurable:true});}
    catch(e){window.localStorage=shimStore;}
  }
})();
window.__INLINE_DATA=%s;
(function(){
  var realFetch=window.fetch?window.fetch.bind(window):null;
  window.fetch=function(u,o){
    /* 站点会给数据 URL 加缓存串 ?v=...,查表前必须剥掉,否则全部落空 */
    var key=String(u).split("#")[0].split("?")[0].replace(/^\\.\\//,"");
    if(window.__INLINE_DATA[key]!==undefined){
      var body=window.__INLINE_DATA[key];
      return Promise.resolve({ok:true,status:200,
        json:function(){return Promise.resolve(JSON.parse(body));},
        text:function(){return Promise.resolve(body);}});
    }
    if(realFetch)return realFetch(u,o);
    return Promise.reject(new Error("offline"));
  };
})();
</script>
"""

# id="offlineBar" / id="memWarn" 是 tests/offline_test.js 的契约,勿改
BANNER = """<div id="offlineBar" style="background:#FFF8E1;border-bottom:2px solid #FFB300;padding:9px 14px;font-size:13px;color:#5D4037">
📦 <b>单文件离线版</b> —— 双击即可打开,无需服务器。资助/文献/职位数据为打包时的快照;实时检索(PubMed、ClinicalTrials.gov 等)仍需联网。
<span id="memWarn"></span></div>
<script>if(window.__STORAGE_IS_MEMORY){document.getElementById("memWarn").innerHTML=
" <b style='color:#C62828'>本次浏览器禁用了本地存储:收藏、申请管线、档案在关闭窗口后不会保留。</b>";}</script>
"""


def main():
    src = open(IDX, encoding="utf-8").read()

    inline = {}
    for p in sorted(glob.glob(os.path.join(ROOT, "data", "*.json"))):
        inline["data/" + os.path.basename(p)] = open(p, encoding="utf-8").read()
    if not inline:
        print("FAIL: data/ 下没有任何 json,离线版会是空的"); sys.exit(1)

    # 是【插在】第一个 <script> 之前,不是替换它 —— 替换会吃掉主脚本的开标签,
    # 于是整段 JS 变成纯文本,页面静静地什么都不做。
    out = src.replace("<script>",
                      (SHIM_HEAD % json.dumps(inline, ensure_ascii=False)) + "<script>", 1)
    if out == src:
        print("FAIL: 没找到插入垫片的 <script> 位置"); sys.exit(1)

    anchor = "<header>"
    if anchor not in out:
        print("FAIL: 没找到 <header>,顶栏插不进去"); sys.exit(1)
    out = out.replace(anchor, BANNER + "\n" + anchor, 1)

    n_src, n_out = src.count("<script"), out.count("<script")
    if n_out != n_src + 2:                    # 垫片 1 个 + 顶栏 1 个
        print(f"FAIL: <script> 数量异常 {n_src} → {n_out},"
              f"主脚本可能被垫片吃掉了(整页 JS 会变成纯文本)"); sys.exit(1)

    open(OUT, "w", encoding="utf-8").write(out)
    print(f"离线版已生成:{OUT}")
    print(f"  内联数据 {len(inline)} 个文件 · 总大小 {len(out)/1048576:.1f} MB")
    print(f"  打包时间 {datetime.datetime.now():%Y-%m-%d %H:%M}")
    for k in sorted(inline):
        print(f"    {k}  {len(inline[k])/1024:.0f} KB")


if __name__ == "__main__":
    main()
