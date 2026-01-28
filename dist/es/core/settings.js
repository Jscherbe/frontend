var a = Object.defineProperty;
var i = Object.getOwnPropertySymbols;
var g = Object.prototype.hasOwnProperty, u = Object.prototype.propertyIsEnumerable;
var o = (n, t, s) => t in n ? a(n, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : n[t] = s, c = (n, t) => {
  for (var s in t || (t = {}))
    g.call(t, s) && o(n, s, t[s]);
  if (i)
    for (var s of i(t))
      u.call(t, s) && o(n, s, t[s]);
  return n;
};
const r = {
  iconClassClose: "css-icon css-icon--close",
  iconClassDragX: "css-icon css-icon--drag-x",
  iconClassDragBoth: "css-icon css-icon--drag-both",
  iconClassPrevious: "css-icon  css-icon--angle-left",
  iconClassNext: "css-icon  css-icon--angle-right",
  cssvarPrefix: ""
};
let e = c({}, r);
function S() {
  return c({}, r);
}
function d(n) {
  Object.assign(e, n);
}
function p() {
  return c({}, e);
}
function l(n) {
  if (!e.hasOwnProperty(n)) {
    console.warn(`Attempted to access non-existent setting: ${n}`);
    return;
  }
  return e[n];
}
function C(n, t) {
  e[n] = t;
}
function x(n, t) {
  return {
    toString() {
      const s = l(n);
      return t ? t(s) : s;
    }
  };
}
export {
  S as getDefaultSettings,
  l as getSetting,
  p as getSettings,
  C as updateSetting,
  d as updateSettings,
  x as wrapSettingString
};
