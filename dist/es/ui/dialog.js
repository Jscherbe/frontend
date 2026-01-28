var O = Object.defineProperty;
var f = Object.getOwnPropertySymbols;
var S = Object.prototype.hasOwnProperty, b = Object.prototype.propertyIsEnumerable;
var m = (e, o, t) => o in e ? O(e, o, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[o] = t, g = (e, o) => {
  for (var t in o || (o = {}))
    S.call(o, t) && m(e, t, o[t]);
  if (f)
    for (var t of f(o))
      b.call(o, t) && m(e, t, o[t]);
  return e;
};
import { getUluEventName as v } from "../core/events.js";
import { ComponentInitializer as V } from "../core/component.js";
import { preventScroll as w, wasClickOutside as C } from "@ulu/utils/browser/dom.js";
import { prepVideos as D, pauseVideos as k } from "../utils/pause-youtube-video.js";
const L = "data-ulu-dialog", i = new V({ type: "dialog", baseAttribute: L }), x = i.getAttribute("close"), y = {
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
let a = g({}, y);
function P(e) {
  a = Object.assign({}, a, e);
}
function U() {
  i.init({
    coreEvents: ["pageModified"],
    withData: !0,
    setup({ element: e, initialize: o, data: t }) {
      M(e, t), o();
    }
  }), i.init({
    key: "trigger",
    coreEvents: ["pageModified"],
    withData: !0,
    setup({ element: e, initialize: o, data: t }) {
      z(e, t), o();
    }
  });
}
function z(e, o) {
  e.addEventListener("click", t);
  function t(r) {
    var c;
    r.target.closest("a") && r.preventDefault();
    const n = document.getElementById(o);
    if (!n) {
      console.error("Could not locate dialog (id)", o);
      return;
    }
    if (((c = n == null ? void 0 : n.tagName) == null ? void 0 : c.toLowerCase()) !== "dialog") {
      console.error("Attempted to trigger non <dialog> element. Did you mean to use modal builder?");
      return;
    }
    const u = A(n);
    n[u.nonModal ? "show" : "showModal"]();
  }
}
function M(e, o) {
  const t = Object.assign({}, a, o), r = document.body, { preventScrollShift: d } = t;
  let n;
  if (e.addEventListener(v("resizer:start"), c), e.addEventListener(v("resizer:end"), h), e.addEventListener("click", u), t.documentEnd && r.appendChild(e), t.pauseVideos && I(e), !t.nonModal && t.preventScroll) {
    let s;
    e.addEventListener("toggle", (l) => {
      l.newState === "open" ? s = w({ preventShift: d }) : s && s();
    });
  }
  function u(s) {
    const { target: l } = s, p = l === e, E = l.closest(i.attributeSelector("close"));
    (!n && t.clickOutsideCloses && p && C(e, s) || E) && (t.pauseVideos && j(e), e.close());
  }
  function c(s) {
    n = s.pointerId;
  }
  function h(s) {
    n === s.pointerId && setTimeout(() => {
      n = null;
    }, 0);
  }
}
function A(e) {
  return Object.assign({}, a, i.getData(e));
}
function I(e) {
  D(e);
}
function j(e) {
  k(e), e.querySelectorAll("video").forEach((t) => t.pause());
}
export {
  L as baseAttribute,
  x as closeAttribute,
  y as defaults,
  A as getDialogOptions,
  U as init,
  i as initializer,
  P as setDefaults,
  M as setupDialog,
  z as setupTrigger
};
