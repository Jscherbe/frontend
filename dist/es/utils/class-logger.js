const n = {
  debug: !1,
  warningsAlways: !0,
  errorsAlways: !0,
  outputContext: !1
}, g = "console" in window;
function s(r) {
  var o;
  return g && n.debug && ((r == null ? void 0 : r.debug) || ((o = r == null ? void 0 : r.options) == null ? void 0 : o.debug) || r == null);
}
function a(r) {
  var o;
  return typeof r == "object" && ((o = r == null ? void 0 : r.constructor) == null ? void 0 : o.name);
}
function u(r, o, l) {
  const i = a(o) || "Logger";
  console[r](i, ...l), n.outputContext && console.log(`Context:
`, o);
}
function f(r) {
  Object.assign(n, r);
}
function e(r, ...o) {
  s(r) && u("log", r, o);
}
function w(r, ...o) {
  (n.warningsAlways || s(r)) && u("warn", r, o);
}
function b(r, ...o) {
  (n.errorsAlways || s(r)) && u("error", r, o);
}
export {
  e as log,
  b as logError,
  w as logWarning,
  f as set
};
