var S = Object.defineProperty;
var p = Object.getOwnPropertySymbols;
var D = Object.prototype.hasOwnProperty, O = Object.prototype.propertyIsEnumerable;
var f = (e, o, t) => o in e ? S(e, o, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[o] = t, m = (e, o) => {
  for (var t in o || (o = {}))
    D.call(o, t) && f(e, t, o[t]);
  if (p)
    for (var t of p(o))
      O.call(o, t) && f(e, t, o[t]);
  return e;
};
import { getUluEventName as g } from "../core/events.js";
import { ComponentInitializer as V } from "../core/component.js";
import { wasClickOutside as C, preventScroll as k } from "@ulu/utils/browser/dom.js";
import { prepVideos as w, pauseVideos as y } from "../utils/pause-youtube-video.js";
import { observeDialogToggle as z } from "../utils/dialog.js";
const L = "data-ulu-dialog", r = new V({ type: "dialog", baseAttribute: L }), G = r.getAttribute("close"), M = {
  /**
   * Use non-modal interface for dialog
   */
  nonModal: !1,
  /**
   * Move the dialog to the document end (hoist out of content)
   * - helpful if dialogs are within editor body, etc
   */
  documentEnd: !1,
  /**
   * Requires styling that reduces any padding/border on dialog
   */
  clickOutsideCloses: !0,
  /**
   * Whether or not to pause videos when dialog closes (currently just youtube and native)
   */
  pauseVideos: !0,
  /**
   * When open and not non-modal, the body is prevented from scrolling (defaults to true).
   */
  preventScroll: !0,
  /**
   * Compensate for layout shift when preventing scroll. Which adds padding equal to scrollbars 
   * width while dialog is open
   */
  preventScrollShift: !0
};
let a = m({}, M);
function H(e) {
  a = Object.assign({}, a, e);
}
function J() {
  r.init({
    coreEvents: ["pageModified"],
    withData: !0,
    setup({ element: e, initialize: o, data: t }) {
      I(e, t), o();
    }
  }), r.init({
    key: "trigger",
    coreEvents: ["pageModified"],
    withData: !0,
    setup({ element: e, initialize: o, data: t }) {
      A(e, t), o();
    }
  });
}
function A(e, o) {
  e.addEventListener("click", t);
  function t(l) {
    var c;
    l.target.closest("a") && l.preventDefault();
    const n = document.getElementById(o);
    if (!n) {
      console.error("Could not locate dialog (id)", o);
      return;
    }
    if (((c = n == null ? void 0 : n.tagName) == null ? void 0 : c.toLowerCase()) !== "dialog") {
      console.error("Attempted to trigger non <dialog> element. Did you mean to use modal builder?");
      return;
    }
    const i = R(n);
    n[i.nonModal ? "show" : "showModal"]();
  }
}
function I(e, o) {
  const t = Object.assign({}, a, o), l = document.body, { preventScrollShift: d } = t;
  let n = null, i;
  if (e.addEventListener(g("resizer:start"), v), e.addEventListener(g("resizer:end"), b), e.addEventListener("click", c), t.documentEnd && l.appendChild(e), t.pauseVideos && T(e), !t.nonModal && t.preventScroll) {
    let s;
    n = z(e, (u) => {
      u ? s = k({ preventShift: d }) : s && (s(), s = null);
    });
  }
  function c(s) {
    const { target: u } = s, h = u === e, E = u.closest(r.attributeSelector("close"));
    (!i && t.clickOutsideCloses && h && C(e, s) || E) && (t.pauseVideos && j(e), e.close());
  }
  function v(s) {
    i = s.pointerId;
  }
  function b(s) {
    i === s.pointerId && setTimeout(() => {
      i = null;
    }, 0);
  }
  return {
    destroy: () => {
      n && n.destroy();
    }
  };
}
function R(e) {
  return Object.assign({}, a, r.getData(e));
}
function T(e) {
  w(e);
}
function j(e) {
  y(e), e.querySelectorAll("video").forEach((t) => t.pause());
}
export {
  L as baseAttribute,
  G as closeAttribute,
  M as defaults,
  R as getDialogOptions,
  J as init,
  r as initializer,
  H as setDefaults,
  I as setupDialog,
  A as setupTrigger
};
