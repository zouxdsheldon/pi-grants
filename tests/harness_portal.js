/* tests/harness_portal.js —— 门户 / 全局搜索 / 期刊面板的 DOM 桩
   只提供被测函数真正用到的接口。任何被测代码用到而这里没有的东西,
   会直接抛异常 —— 这是有意的:静默的桩会把"绑错 id"这类 bug 藏起来。 */
var T = JSON.parse(read('__FIXTURE__'));

/* jhide 是 checkbox(读 .checked),其余是 input/select(读 .value)。
   放错桶会让筛选器测试静默通过 —— 第一版就踩过。 */
var VALS = {jq:"", jdir:"", jtier:"", papSort:"score", gsq:""};
var CHK  = {jhide:false};
var CLICKED = [];          // goPanel 点过的 tab
var OPENED  = [];          // window.open 打开的外链

/* 下拉框的 options。两个来源:
   ① T.opts —— 从 index.html 里静态写死的 <option> 抽出来的(build 时解析);
   ② facetSel 运行时写 innerHTML 生成的 —— 由下面 innerHTML 的 setter 解析出来。
   桩若不给 options,ctlSet/ctlDefault 会以为"这个值不在选项里",
   示例按钮的命中数就会全变成空 —— 等于测了个假的。 */
function parseOpts(html){
  var out=[], re=/<option value="([^"]*)"[^>]*>([\s\S]*?)<\/option>/g, m;
  while((m=re.exec(html))!==null)out.push({value:m[1],textContent:m[2].replace(/<[^>]*>/g,"")});
  /* 无 value 属性的 <option>高</option> 形式:value 等于文本 */
  var re2=/<option>([\s\S]*?)<\/option>/g;
  while((m=re2.exec(html))!==null)out.push({value:m[1],textContent:m[1]});
  return out;
}
function mkEl(id){
  var _html="";
  var statics=(T.opts&&T.opts[id])?T.opts[id]:null;
  var self = {
    id:id,
    tagName:(id in VALS)||(statics&&statics.length)?"SELECT":"DIV",
    get value(){return VALS[id]!==undefined?VALS[id]:"";}, set value(v){VALS[id]=v;},
    get checked(){return !!CHK[id];}, set checked(v){CHK[id]=v;},
    get options(){
      if(_html)return parseOpts(_html);            /* facetSel 填过就以运行时为准 */
      return statics?statics.slice():[];
    },
    get innerHTML(){return _html;}, set innerHTML(v){_html=String(v==null?"":v);},
    textContent:"", style:{},
    /* classList 要真的记状态。原来 contains 根本不存在,任何读 class 的分支
       (passAuto 的资格过滤开关、面板 active 态)在测试里都会炸或静默走错分支。 */
    classList:(function(){
      var set={};
      return {add:function(c){set[c]=1;}, remove:function(c){delete set[c];},
              toggle:function(c){ if(set[c])delete set[c]; else set[c]=1; },
              contains:function(c){return !!set[c];}};
    })(),
    addEventListener:function(){}, dispatchEvent:function(){},
    scrollIntoView:function(){}, getAttribute:function(a){return self["_"+a]||null;},
    /* createElement 出来的元素会被 querySelector("input") 找子节点。
       返回 null 会让 renderSidebarCounts 直接炸;返回一个哑元素即可 ——
       这里只需要它能挂 onchange,测试不模拟用户点击复选框(那条路径由虚拟筛选覆盖)。 */
    querySelector:function(){ return {onchange:null, checked:false, value:"" }; },
    querySelectorAll:function(){return [];},
    appendChild:function(){}, removeChild:function(){},
    insertAdjacentHTML:function(pos,html){ if(pos==="beforeend")self.innerHTML=self.innerHTML+html; else _html=html+self.innerHTML; },
    onclick:null, oninput:null, onchange:null
  };
  return self;
}
var ELS = {};
/* 浏览器里 getElementById 找不到就返回 null。桩必须照做 ——
   之前是"要什么就凭空造一个",于是把控件 id 拼错的 bug 全藏了起来:
   示例按钮指向 lcareerTYPO 也能"设置成功"。
   T.ids 是从 index.html 抽出的真实 id 集合;运行时新建的容器(见 KNOWN_DYN)另行放行。 */
var KNOWN_DYN = /^(chips_|nores_|help_)/;
function byId(id){
  if(ELS[id])return ELS[id];
  var real = T.ids.indexOf(id)>=0 || KNOWN_DYN.test(id);
  if(!real)return null;
  ELS[id]=mkEl(id); return ELS[id];
}

var document = {
  getElementById: byId,
  querySelector: function(sel){
    var m = /\.tab\[data-p="([a-z_0-9]+)"\]/.exec(sel);
    /* 只有真实存在的面板才有对应的 tab 按钮 —— 桩必须照实模拟这一点,
       否则 goPanel("拼错的id") 在测试里会\"成功\",把死链接藏起来。 */
    if(m && T.panel_ids.indexOf(m[1])>=0){
      var p=m[1]; return {click:function(){CLICKED.push(p);}};
    }
    return null;
  },
  querySelectorAll: function(){ return []; },
  addEventListener: function(){},
  createElement: mkEl,
  body: {appendChild:function(){}, removeChild:function(){}}
};
var window = { open:function(u){OPENED.push(u);}, location:{href:"https://x/"}, addEventListener:function(){} };
var console = { log:function(){}, warn:function(){}, error:function(){} };
var history = { replaceState:function(){} };
var localStorage = {getItem:function(){return null;},setItem:function(){}};
var navigator = {clipboard:{writeText:function(){return {then:function(){}};}}};
function Event(){}
