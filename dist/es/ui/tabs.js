var u = Object.defineProperty;
var s = Object.getOwnPropertySymbols;
var d = Object.prototype.hasOwnProperty, f = Object.prototype.propertyIsEnumerable;
var c = (i, e, t) => e in i ? u(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, l = (i, e) => {
  for (var t in e || (e = {}))
    d.call(e, t) && c(i, t, e[t]);
  if (s)
    for (var t of s(e))
      f.call(e, t) && c(i, t, e[t]);
  return i;
};
import { TabManager as p } from "./tab-manager.js";
import { ComponentInitializer as b } from "../core/component.js";
import { ensureId as m } from "../utils/id.js";
const h = [], w = new b({
  type: "tabs",
  baseAttribute: "data-ulu-tablist"
});
function M() {
  const i = () => {
    w.init({
      coreEvents: ["pageModified"],
      withData: !0,
      setup({ element: e, data: t, initialize: o }) {
        y(e, t), o();
      }
    });
  };
  document.readyState === "complete" ? i() : window.addEventListener("load", i);
}
function y(i, e = {}) {
  const t = l({}, e);
  t.vertical && (t.allArrows = !0), t.openByUrlHash && (t.setUrlHash = !0), [...i.children].forEach((n) => {
    if (!n.hasAttribute("aria-controls")) {
      const r = document.querySelector(`[aria-labelledby="${n.id}"]`);
      r && (m(r), n.setAttribute("aria-controls", r.id));
    }
  });
  const a = { element: i, options: e };
  return a.tabManager = new p(i, t), h.push(a), a;
}
export {
  M as init,
  w as initializer,
  h as instances,
  y as setup
};
