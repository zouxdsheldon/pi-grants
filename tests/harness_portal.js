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

function mkEl(id){
  var self = {
    id:id, tagName:(id in VALS)?"SELECT":"DIV",
    get value(){return VALS[id]!==undefined?VALS[id]:"";}, set value(v){VALS[id]=v;},
    get checked(){return !!CHK[id];}, set checked(v){CHK[id]=v;},
    innerHTML:"", textContent:"", style:{},
    classList:{add:function(){},remove:function(){},toggle:function(){}},
    addEventListener:function(){}, dispatchEvent:function(){},
    scrollIntoView:function(){}, getAttribute:function(a){return self["_"+a]||null;},
    querySelectorAll:function(){return [];},
    onclick:null, oninput:null, onchange:null
  };
  return self;
}
var ELS = {};
function byId(id){ if(!ELS[id])ELS[id]=mkEl(id); return ELS[id]; }

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
var history = { replaceState:function(){} };
var localStorage = {getItem:function(){return null;},setItem:function(){}};
var navigator = {clipboard:{writeText:function(){return {then:function(){}};}}};
function Event(){}
