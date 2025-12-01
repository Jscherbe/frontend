import f from "aria-tablist";
import { ComponentInitializer as u } from "../core/component.js";
const l = [], p = new u({
  type: "tabs",
  baseAttribute: "data-ulu-tablist"
});
function E() {
  const e = () => {
    p.init({
      coreEvents: ["pageModified"],
      withData: !0,
      setup({ element: n, data: t, initialize: o }) {
        m(n, t), o();
      }
    }), l.forEach(b);
  };
  document.readyState === "complete" ? e() : window.addEventListener("load", e);
}
function m(e, n = {}) {
  const t = Object.assign({}, n);
  t.vertical && (t.allArrows = !0);
  const o = { element: e, options: n };
  return o.ariaTablist = f(e, {
    onOpen(...a) {
      a.unshift(o), g.apply(null, a);
    },
    ...t
  }), l.push(o), t.equalHeights && w(e), o;
}
function b({ options: e, ariaTablist: n }) {
  if (e.openByUrlHash) {
    const { hash: t } = window.location;
    if (t && t.length > 1) {
      const o = t.substring(1);
      n.tabs.forEach((a) => {
        o === a.id && n.open(a);
      });
    }
  }
}
function g({ options: e }, n, t) {
  e.openByUrlHash && window.history && window.history.replaceState(null, "", `#${t.id}`);
}
function w(e) {
  const t = [...e.children].map((i) => document.querySelector(`[aria-labelledby="${i.id}"]`)), h = [...t[0].parentElement.querySelectorAll("img")].map((i) => d(i));
  function d(i) {
    return new Promise((r) => {
      i.complete ? r(i) : (i.onload = r, i.onerror = r);
    });
  }
  Promise.all(h).then(() => {
    const i = t.map((s) => {
      let c = s.offsetHeight;
      return s.hidden && (s.hidden = !1, c = s.offsetHeight, s.setAttribute("hidden", "hidden")), c;
    }), r = Math.max(...i);
    t.forEach((s) => s.style.minHeight = `${r}px`);
  });
}
export {
  E as init,
  p as initializer,
  l as instances,
  m as setup
};
