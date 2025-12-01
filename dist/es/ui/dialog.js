import { getUluEventName as f } from "../core/events.js";
import { ComponentInitializer as v } from "../core/component.js";
import { preventScroll as h, wasClickOutside as E } from "@ulu/utils/browser/dom.js";
import { prepVideos as O, pauseVideos as S } from "../utils/pause-youtube-video.js";
const b = "data-ulu-dialog", i = new v({ type: "dialog", baseAttribute: b }), F = i.getAttribute("close"), V = {
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
let a = { ...V };
function R(e) {
  a = Object.assign({}, a, e);
}
function T() {
  i.init({
    coreEvents: ["pageModified"],
    withData: !0,
    setup({ element: e, initialize: s, data: t }) {
      C(e, t), s();
    }
  }), i.init({
    key: "trigger",
    coreEvents: ["pageModified"],
    withData: !0,
    setup({ element: e, initialize: s, data: t }) {
      w(e, t), s();
    }
  });
}
function w(e, s) {
  e.addEventListener("click", t);
  function t(r) {
    var c;
    r.target.closest("a") && r.preventDefault();
    const o = document.getElementById(s);
    if (!o) {
      console.error("Could not locate dialog (id)", s);
      return;
    }
    if (((c = o == null ? void 0 : o.tagName) == null ? void 0 : c.toLowerCase()) !== "dialog") {
      console.error("Attempted to trigger non <dialog> element. Did you mean to use modal builder?");
      return;
    }
    const u = D(o);
    o[u.nonModal ? "show" : "showModal"]();
  }
}
function C(e, s) {
  const t = Object.assign({}, a, s), r = document.body, { preventScrollShift: d } = t;
  let o;
  if (e.addEventListener(f("resizer:start"), c), e.addEventListener(f("resizer:end"), m), e.addEventListener("click", u), t.documentEnd && r.appendChild(e), t.pauseVideos && k(e), !t.nonModal && t.preventScroll) {
    let n;
    e.addEventListener("toggle", (l) => {
      l.newState === "open" ? n = h({ preventShift: d }) : n && n();
    });
  }
  function u(n) {
    const { target: l } = n, p = l === e, g = l.closest(i.attributeSelector("close"));
    (!o && t.clickOutsideCloses && p && E(e, n) || g) && (t.pauseVideos && L(e), e.close());
  }
  function c(n) {
    o = n.pointerId;
  }
  function m(n) {
    o === n.pointerId && setTimeout(() => {
      o = null;
    }, 0);
  }
}
function D(e) {
  return Object.assign({}, a, i.getData(e));
}
function k(e) {
  O(e);
}
function L(e) {
  S(e), e.querySelectorAll("video").forEach((t) => t.pause());
}
export {
  b as baseAttribute,
  F as closeAttribute,
  V as defaults,
  D as getDialogOptions,
  T as init,
  i as initializer,
  R as setDefaults,
  C as setupDialog,
  w as setupTrigger
};
