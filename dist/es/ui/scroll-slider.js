import { ComponentInitializer as n } from "../core/component.js";
import { OverflowScroller as i } from "./overflow-scroller.js";
import { createPager as l } from "./overflow-scroller-pager.js";
const o = new n({
  type: "scroll-slider",
  baseAttribute: "data-ulu-scroll-slider"
}), s = o.attributeSelector("track"), a = o.attributeSelector("control-context"), u = [], p = {
  amount: l()
};
function b() {
  o.init({
    withData: !0,
    coreEvents: ["pageModified"],
    setup({ element: t, data: e, initialize: r }) {
      f(t, e), r();
    }
  });
}
function f(t, e) {
  const r = Object.assign({}, p, e), c = {
    track: t.querySelector(s),
    controls: t.querySelector(a)
  };
  u.push(new i(c, r));
}
export {
  b as init,
  o as initializer
};
