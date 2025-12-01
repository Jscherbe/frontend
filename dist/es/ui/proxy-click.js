import { ComponentInitializer as d } from "../core/component.js";
const p = new d({
  type: "proxy-click",
  baseAttribute: "data-ulu-proxy-click"
}), f = {
  selector: "[data-ulu-proxy-click-source]",
  selectorPreventBase: "input, select, textarea, button, a, [tabindex='-1']",
  selectorPrevent: "",
  mousedownDurationPrevent: 250
};
let c = { ...f };
function m(e) {
  c = Object.assign({}, c, e);
}
function x() {
  p.init({
    withData: !0,
    coreEvents: ["pageModified"],
    setup({ element: e, data: o, initialize: t }) {
      v(e, o), t();
    }
  });
}
function v(e, o) {
  const t = Object.assign({}, c, o), s = e.querySelector(t.selector);
  s ? P(e, s, t) : console.error("Unable to locate proxy click source", t.selector);
}
function P(e, o, t) {
  const { selectorPreventBase: s, selectorPrevent: i } = t, l = `${s}${i ? `, ${i}` : ""}`;
  let a, n;
  e.addEventListener("mousedown", ({ target: r, timeStamp: u }) => {
    n = !1, r.matches(l) || (n = !0, a = u);
  }), e.addEventListener("mouseup", ({ timeStamp: r }) => {
    n && r - a < t.mousedownDurationPrevent && o.click();
  }), e.style.cursor = "pointer";
}
export {
  P as attachHandlers,
  f as defaults,
  x as init,
  p as initializer,
  m as setDefaults,
  v as setupProxy
};
