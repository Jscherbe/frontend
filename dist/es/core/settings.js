const c = {
  iconClassClose: "css-icon css-icon--close",
  iconClassDragX: "css-icon css-icon--drag-x",
  iconClassDragBoth: "css-icon css-icon--drag-both",
  iconClassPrevious: "css-icon  css-icon--angle-left",
  iconClassNext: "css-icon  css-icon--angle-right",
  cssvarPrefix: ""
};
let t = { ...c };
function o() {
  return { ...c };
}
function r(n) {
  Object.assign(t, n);
}
function a() {
  return { ...t };
}
function i(n) {
  if (!t.hasOwnProperty(n)) {
    console.warn(`Attempted to access non-existent setting: ${n}`);
    return;
  }
  return t[n];
}
function g(n, s) {
  t[n] = s;
}
function u(n, s) {
  return {
    toString() {
      const e = i(n);
      return s ? s(e) : e;
    }
  };
}
export {
  o as getDefaultSettings,
  i as getSetting,
  a as getSettings,
  g as updateSetting,
  r as updateSettings,
  u as wrapSettingString
};
