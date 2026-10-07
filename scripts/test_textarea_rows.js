const fs=require('fs');
function taRows(v){
  var t=String(v||''); if(!t) return 3;
  var lines=t.split('\n'), n=0;
  lines.forEach(function(L){ n += Math.max(1, Math.ceil(L.length/78)); });
  return Math.max(3, Math.min(26, n+1));
}
var F=0; function ck(l,c){console.log((c?'  ✓ ':'  ✗ ')+l); if(!c)F++;}
ck('空内容给 3 行', taRows('')===3);
ck('短内容仍是 3 行', taRows('一句话')===3);
/* new Array(11).join('x\n') 产生 10 个 "x" + 末尾空段 = 11 个分段，再加 1 行余量 = 12。
   先前这里写 11 是我的断言算错，不是代码错。 */
ck('10 个换行给 12 行（11 段 + 1 行余量）', taRows(new Array(11).join('x\n'))===12);
ck('长单行会折行计数', taRows(new Array(400).join('a'))>4);
ck('超长内容封顶 26 行', taRows(new Array(200).join('line\n'))===26);
ck('null/undefined 不崩', taRows(null)===3 && taRows(undefined)===3);
console.log('失败:'+F);
