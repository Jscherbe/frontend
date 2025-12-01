import { ComponentInitializer as p } from "../core/component.js";
import { createFloatingUi as f } from "../utils/floating-ui.js";
import { Collapsible as u } from "./collapsible.js";
const r = new p({
  type: "popover",
  baseAttribute: "data-ulu-popover"
}), d = r.attributeSelector("trigger-anchor"), h = r.attributeSelector("arrow"), m = r.getAttribute("content"), b = r.attributeSelector("content"), c = /* @__PURE__ */ new WeakMap(), g = {
  clickOutsideCloses: !0,
  escapeCloses: !0
};
function I() {
  r.init({
    key: "trigger",
    withData: !0,
    coreEvents: ["pageModified"],
    setup({ element: t, data: e, initialize: n }) {
      if (c.has(t)) return;
      const o = y(t, e);
      if (!o) {
        r.warn("Unable to resolve popover elements for trigger.", t);
        return;
      }
      const { elements: s, options: i, floatingOptions: a } = o;
      c.set(s, new S(s, i, a)), n();
    }
  });
}
function y(t, e) {
  const n = Object.assign({}, e), o = C(t), s = {
    trigger: t,
    content: o,
    anchor: t.querySelector(d) || t,
    contentArrow: o.querySelector(h)
  }, i = n.floating || {};
  return delete n.floating, o ? { elements: s, options: n, floatingOptions: i } : (r.logError("Unable to make popover for", t), !1);
}
function C(t) {
  var o;
  let e;
  const n = t.getAttribute("aria-controls");
  if (n)
    e = document.getElementById(n);
  else if ((o = t == null ? void 0 : t.nextElementSibling) != null && o.hasAttribute(m))
    e = t.nextElementSibling;
  else {
    const s = Array.from(t.parentNode.children), i = s.findIndex((l) => l === t);
    e = s.slice(i).find((l) => l.matches(b));
  }
  return e || r.logError("Unable to resolve 'content' element for popover", t), e;
}
class S extends u {
  constructor(e, n, o) {
    const s = Object.assign({}, g, n);
    super(e, s), this.floatingOptions = o || {};
  }
  setState(e, n) {
    super.setState(e, n), this.destroyFloatingInstance(), e && this.createFloatingInstance();
  }
  destroy() {
    super.destroy(), this.destroyFloatingInstance();
  }
  createFloatingInstance() {
    const { content: e, anchor: n, contentArrow: o } = this.elements, s = { trigger: n, contentArrow: o, content: e };
    this.floatingCleanup = f(s, this.floatingOptions);
  }
  destroyFloatingInstance() {
    this.floatingCleanup && (this.floatingCleanup(), this.floatingCleanup = null);
  }
}
export {
  S as Popover,
  C as getContentByTrigger,
  I as init,
  r as initializer,
  c as instances,
  y as resolve
};
