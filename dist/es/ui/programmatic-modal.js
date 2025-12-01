var p = Object.defineProperty;
var v = (n, e, t) => e in n ? p(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var a = (n, e, t) => v(n, typeof e != "symbol" ? e + "" : e, t);
import { getCoreEventName as T, dispatchCoreEvent as E } from "../core/events.js";
import { newId as k } from "../utils/id.js";
import { buildModal as C } from "./modal-builder.js";
import { getElement as L } from "@ulu/utils/browser/dom.js";
const c = class c {
  constructor(e) {
    const t = Object.assign({}, c.defaults, e);
    this.options = t, this.triggers = null, this.cachedTrigger = null, this.triggerListener, this.onTriggerClick = (i) => {
      const r = i.target.closest(t.triggerSelector);
      r && (this.cachedTrigger = r);
    }, this.onPageModified = () => {
      this.setupTriggers();
    }, document.addEventListener(T("pageModified"), this.onPageModified), this.setupTriggers();
  }
  setupTriggers() {
    const { triggerSelector: e, triggerInitAttr: t } = this.options;
    document.querySelectorAll(`${e}:not([${t}])`).forEach((r) => {
      r.addEventListener("click", this.onTriggerClick);
    });
  }
  destroy() {
    const { triggerSelector: e } = this.options;
    document.querySelectorAll(e).forEach((i) => {
      i.removeEventListener("click", this.onTriggerClick);
    });
  }
  createAndOpen(e, t) {
    const { noClickTrigger: i, removeOnClose: r, element: u, classes: l } = e, g = L(u);
    g.id || (g.id = k()), l && g.classList.add(...l);
    let o;
    if (i || (o = this.cachedTrigger, this.cachedTrigger = null), !g) {
      console.error("No element found from config.element. ", e);
      return;
    }
    const { modal: s } = C(g, e.modal), d = { trigger: o, modal: s, config: e };
    t && t(d);
    const m = () => {
      r && s.remove(), o && o.focus();
    };
    return s.addEventListener("close", m, { once: !0 }), !r && o && o.addEventListener("click", (f) => {
      f.preventDefault(), s.showModal();
    }), E("pageModified", s), s.showModal(), d;
  }
};
a(c, "defaults", {
  triggerSelector: "[data-ulu-programmatic-modal-trigger]",
  triggerInitAttr: "data-ulu-programmatic-modal-init"
});
let h = c;
export {
  h as ProgrammaticModalManager
};
