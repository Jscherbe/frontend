var u = Object.defineProperty;
var d = Object.getOwnPropertySymbols;
var f = Object.prototype.hasOwnProperty, v = Object.prototype.propertyIsEnumerable;
var s = (e, n, t) => n in e ? u(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, a = (e, n) => {
  for (var t in n || (n = {}))
    f.call(n, t) && s(e, t, n[t]);
  if (d)
    for (var t of d(n))
      v.call(n, t) && s(e, t, n[t]);
  return e;
};
import { debounce as l } from "@ulu/utils/performance.js";
import { isBrowser as p } from "@ulu/utils/browser/dom.js";
p() && (b(), m());
const r = {
  pageModified(e) {
    e.dispatchEvent(i("pageModified"));
  },
  pageResized(e) {
    e.dispatchEvent(i("pageResized"));
  },
  beforePrint(e) {
    e.dispatchEvent(i("beforePrint"));
  },
  afterPrint(e) {
    e.dispatchEvent(i("afterPrint"));
  }
}, E = Object.keys(r);
function o(e, n) {
  r[e] ? r[e](n) : console.warn(`Unable to dispatch non-core event: ${e}`);
}
function c(e) {
  return "ulu:" + e;
}
function h(e) {
  return E.includes(e) ? c(e) : (console.warn(`'${e}' is not a valid core event type.`), null);
}
function i(e, n = null, t = { bubbles: !0 }) {
  return new CustomEvent(c(e), a({ detail: n }, t));
}
function b() {
  window.addEventListener("resize", l(() => o("pageResized", document), 250));
}
function m() {
  window.addEventListener("beforeprint", () => {
    o("beforePrint", document);
  }), window.addEventListener("afterprint", () => {
    o("afterPrint", document);
  });
}
export {
  i as createUluEvent,
  o as dispatchCoreEvent,
  h as getCoreEventName,
  c as getUluEventName
};
