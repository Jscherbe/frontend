const l = {
  debug: !1,
  warningsAlways: !0,
  errorsAlways: !0,
  outputContext: !1
};
function o(r) {
  var u;
  return l.debug && ((r == null ? void 0 : r.debug) || ((u = r == null ? void 0 : r.options) == null ? void 0 : u.debug) || r == null);
}
function i(r) {
  var u;
  return typeof r == "object" && ((u = r == null ? void 0 : r.constructor) == null ? void 0 : u.name);
}
function s(r, u, n) {
  const g = i(u) || "Logger";
  console[r](g, ...n), l.outputContext && console.log(`Context:
`, u);
}
function a(r) {
  Object.assign(l, r);
}
function f(r, ...u) {
  o(r) && s("log", r, u);
}
function e(r, ...u) {
  (l.warningsAlways || o(r)) && s("warn", r, u);
}
function w(r, ...u) {
  (l.errorsAlways || o(r)) && s("error", r, u);
}
export {
  f as log,
  w as logError,
  e as logWarning,
  a as set
};
