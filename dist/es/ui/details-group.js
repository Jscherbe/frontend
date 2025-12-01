import { ComponentInitializer as p } from "../core/component.js";
const s = new p({
  type: "details-group",
  baseAttribute: "data-ulu-details-group"
}), u = s.getAttribute("child-init"), f = {
  onlyOneOpen: !0,
  childSelector: ":scope > details"
};
function b() {
  s.init({
    withData: !0,
    coreEvents: ["pageModified"],
    setup({ element: e, data: n, initialize: r }) {
      d(e, n), r();
    }
  });
}
function d(e, n) {
  const r = Object.assign({}, f, n);
  try {
    c();
  } catch (t) {
    console.error(t);
  }
  function i() {
    return e.querySelectorAll(r.childSelector);
  }
  function c() {
    i().forEach((t) => {
      t.hasAttribute(u) || (t.setAttribute(u, ""), t.addEventListener("toggle", a));
    });
  }
  function a({ target: t }) {
    r.onlyOneOpen && t.open && i().forEach((o) => {
      o !== t && o.open && (o.open = !1);
    });
  }
  function l() {
    i().forEach((t) => {
      t.removeEventListener("toggle", a), t.removeAttribute(u);
    }), e.removeAttribute(s.getAttribute("init"));
  }
  return { destroy: l, element: e, setupChildren: c };
}
export {
  b as init,
  s as initializer,
  d as setupGroup
};
