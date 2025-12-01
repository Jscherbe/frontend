import { debounce as s } from "@ulu/utils/performance.js";
import { isBrowser as a } from "@ulu/utils/browser/dom.js";
a() && (u(), f());
const i = {
  pageModified(e) {
    e.dispatchEvent(n("pageModified"));
  },
  pageResized(e) {
    e.dispatchEvent(n("pageResized"));
  },
  beforePrint(e) {
    e.dispatchEvent(n("beforePrint"));
  },
  afterPrint(e) {
    e.dispatchEvent(n("afterPrint"));
  }
}, c = Object.keys(i);
function r(e, t) {
  i[e] ? i[e](t) : console.warn(`Unable to dispatch non-core event: ${e}`);
}
function o(e) {
  return "ulu:" + e;
}
function p(e) {
  return c.includes(e) ? o(e) : (console.warn(`'${e}' is not a valid core event type.`), null);
}
function n(e, t = null, d = { bubbles: !0 }) {
  return new CustomEvent(o(e), { detail: t, ...d });
}
function u() {
  window.addEventListener("resize", s(() => r("pageResized", document), 250));
}
function f() {
  window.addEventListener("beforeprint", () => {
    r("beforePrint", document);
  }), window.addEventListener("afterprint", () => {
    r("afterPrint", document);
  });
}
export {
  n as createUluEvent,
  r as dispatchCoreEvent,
  p as getCoreEventName,
  o as getUluEventName
};
