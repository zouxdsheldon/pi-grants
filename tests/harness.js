var T = JSON.parse(read('__FIXTURE__'));
var T = JSON.parse(read('/tmp/rdtest.json'));
/* ---- 极简 DOM 桩:只提供被测函数真正用到的读写接口 ---- */
var VALS = {papq:"",papDir:"",papSrc:"",papJournal:"",papTier:"",papType:"",papBand:"",papNov:"",papMeth:"",papWin:"",papSort:"score"};
var CHK = {pap_oa:false,pap_hot:false,pap_gap:false,pap_q:false,pap_star:false,pap_unread:false,pap_off:false,pap_ph:false};
function mkEl(id){
  return {id:id, tagName:(id in VALS)?"SELECT":"INPUT", type:"checkbox",
    get value(){return VALS[id]!==undefined?VALS[id]:"";}, set value(v){VALS[id]=v;},
    get checked(){return !!CHK[id];}, set checked(v){CHK[id]=v;},
    innerHTML:"", textContent:"", style:{}, classList:{add:function(){},remove:function(){}},
    addEventListener:function(){}, querySelectorAll:function(){return [];}, scrollTop:0,
    set onclick(f){}, get onclick(){return null;}};
}
var ELS = {};
var document = {
  getElementById:function(id){ if(!ELS[id])ELS[id]=mkEl(id); return ELS[id]; },
  querySelectorAll:function(){return {forEach:function(){}};},
  addEventListener:function(){}, createElement:mkEl
};
var window = {}; var localStorage = {getItem:function(){return null;},setItem:function(){}};
var navigator = {clipboard:{writeText:function(){return {then:function(){}};}}};
