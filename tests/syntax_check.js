// jsc tests/syntax_check.js -- <path-to-js>
try {
  var p = arguments.length ? arguments[0] : "/tmp/index.html.js";
  var src = read(p);
  new Function(src);
  print("SYNTAX OK " + src.length + "  " + p);
} catch (e) {
  print("SYNTAX ERROR: " + e);
}
