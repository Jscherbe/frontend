var v = Object.defineProperty;
var l = Object.getOwnPropertySymbols;
var P = Object.prototype.hasOwnProperty, b = Object.prototype.propertyIsEnumerable;
var u = (t, o, e) => o in t ? v(t, o, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[o] = e, d = (t, o) => {
  for (var e in o || (o = {}))
    P.call(o, e) && u(t, e, o[e]);
  if (l)
    for (var e of l(o))
      b.call(o, e) && u(t, e, o[e]);
  return t;
};
import { ComponentInitializer as m } from "../core/component.js";
const x = new m({
  type: "proxy-click",
  baseAttribute: "data-ulu-proxy-click"
}), y = {
  selector: "[data-ulu-proxy-click-source]",
  selectorPreventBase: "input, select, textarea, button, a, [tabindex='-1']",
  selectorPrevent: "",
  mousedownDurationPrevent: 250
};
let c = d({}, y);
function E(t) {
  c = Object.assign({}, c, t);
}
function $() {
  x.init({
    withData: !0,
    coreEvents: ["pageModified"],
    setup({ element: t, data: o, initialize: e }) {
      h(t, o), e();
    }
  });
}
function h(t, o) {
  const e = Object.assign({}, c, o), s = t.querySelector(e.selector);
  s ? k(t, s, e) : console.error("Unable to locate proxy click source", e.selector);
}
function k(t, o, e) {
  const { selectorPreventBase: s, selectorPrevent: i } = e, p = `${s}${i ? `, ${i}` : ""}`;
  let a, n;
  t.addEventListener("mousedown", ({ target: r, timeStamp: f }) => {
    n = !1, r.matches(p) || (n = !0, a = f);
  }), t.addEventListener("mouseup", ({ timeStamp: r }) => {
    n && r - a < e.mousedownDurationPrevent && o.click();
  }), t.style.cursor = "pointer";
}
export {
  k as attachHandlers,
  y as defaults,
  $ as init,
  x as initializer,
  E as setDefaults,
  h as setupProxy
};
