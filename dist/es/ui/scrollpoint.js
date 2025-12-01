var m = Object.defineProperty;
var f = (a, t, s) => t in a ? m(a, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : a[t] = s;
var d = (a, t, s) => f(a, typeof t != "symbol" ? t + "" : t, s);
import { ComponentInitializer as p } from "../core/component.js";
import { logError as g } from "../utils/class-logger.js";
import { getElement as b } from "@ulu/utils/browser/dom.js";
const c = new p({
  type: "scrollpoint",
  baseAttribute: "data-ulu-scrollpoint"
});
function w() {
  c.init({
    withData: !0,
    coreEvents: ["pageModified"],
    setup({ element: a, data: t, initialize: s }) {
      const e = Object.assign({}, t);
      new h(a, e), s();
    }
  });
}
const l = class l {
  /**
   * Setup a new scrollpoint
   * @param {Node} element The element to create the scrollpoint for
   * @param {Object} config Options to configure the scrollpoint see Scrollpoint.defaults for more information on settings
   */
  constructor(t, s) {
    const e = Object.assign({}, l.defaults, s);
    if (!t) {
      g(this, "Missing required element");
      return;
    }
    e.rootSelector && (e.root = document.querySelector(e.rootSelector), delete e.rootSelector), this.options = e, this.observer = null, this.lastPosition = null, this.isActive = !1, this.element = t, this.syncedElements = [
      t,
      ...e.syncElements.map((i) => b(i))
    ], this.classes = {
      enter: this.getClassname("enter"),
      enterForward: this.getClassname("enter--from-forward"),
      enterReverse: this.getClassname("enter--from-reverse"),
      exit: this.getClassname("exit"),
      exitForward: this.getClassname("exit--from-forward"),
      exitReverse: this.getClassname("exit--from-reverse")
    }, this.setupObserver(), e.debug && c.log(this);
  }
  getClassname(t) {
    return this.options.classPrefix + "-" + t;
  }
  getObserverOptions() {
    const { root: t, marginStart: s, marginEnd: e, threshold: i, horizontal: r } = this.options, o = r ? `0px ${s} 0px ${e}` : `${s} 0px ${e} 0px`;
    return { root: t, rootMargin: o, threshold: i };
  }
  /**
   * IntersectionObserver Callback
   * - Should set the state
   */
  onObserve(t) {
    const s = this.getScrollY(), { lastPosition: e, isActive: i, options: r } = this, o = e === null ? null : e < s;
    t.forEach((n) => {
      const { isIntersecting: u } = n;
      u && !i ? this.setState(!0, o) : !u && i && r.exit && (o && r.exitForward || !o && r.exitReverse) && this.setState(!1, o);
    }), this.lastPosition = s;
  }
  setupObserver() {
    const t = (e) => {
      this.onObserve(e);
    }, s = this.getObserverOptions();
    this.options.debug && c.log("IntersectionObserver (options)", s), this.observer = new IntersectionObserver(t, s), this.observer.observe(this.element);
  }
  getScrollY() {
    const { root: t } = this.options;
    return t === null || t === document ? window.scrollY : t.scrollTop;
  }
  setState(t, s) {
    const { element: e } = this, i = { isActive: t, isForward: s, element: e, instance: this }, { setClasses: r, setAttribute: o, onChange: n } = this.options;
    r && this.updateClasses(t, s), o && this.updateStateAttribute(t, s), n && n(i), this.isActive = t;
  }
  getAllClasses() {
    return Object.values(this.classes);
  }
  updateClasses(t, s) {
    const { classes: e } = this, i = this.getAllClasses(), r = [
      e.enter,
      s ? e.enterForward : e.enterReverse
    ], o = [
      e.exit,
      s ? e.exitForward : e.exitReverse
    ];
    this.syncedElements.forEach((n) => {
      n.classList.remove(...i), t ? n.classList.add(...r) : n.classList.add(...o);
    });
  }
  updateStateAttribute(t, s) {
    const e = t ? "enter" : "exit", i = s ? "forward" : "reverse";
    this.syncedElements.forEach((r) => {
      r.setAttribute(this.options.attributeName, `${e}-${i}`);
    });
  }
  destroy() {
    this.observer.disconnect(), this.observer = null, this.options.setClasses && this.element.classList.remove(...this.getAllClasses()), this.options.setAttribute && this.element.removeAttribute(this.options.attributeName);
  }
};
d(l, "defaults", {
  /**
   * Default observer root element
   */
  root: null,
  /**
   * Use a selector to select the observer root element
   */
  rootSelector: null,
  /**
   * Log debug info to console
   */
  debug: !1,
  /**
   * Change scroll orientation to horizontal
   */
  horizontal: !1,
  /**
   * Margin for observer top or left (depending on orientation)
   */
  marginStart: "-25%",
  /**
   * Margin for observer bottom or right (depending on orientation)
   */
  marginEnd: "-55%",
  /**
   * Threshold for observer
   */
  threshold: [0, 1],
  /**
   * The point can exited (else persists)
   */
  exit: !0,
  /**
   * The point can exit from the end
   */
  exitForward: !0,
  /**
   * The point can exit from the start
   */
  exitReverse: !0,
  /**
   * Set state classes
   */
  setClasses: !1,
  /**
   * Prefix for classes
   */
  classPrefix: "scrollpoint",
  /**
   * Set attribute for state (less verbose same info as classes)
   */
  setAttribute: !0,
  /**
   * Attribute name to set state info in
   */
  attributeName: "data-ulu-scrollpoint-state",
  /**
   * Group multiple points, one active at a time (scroll menus)
   */
  // groupName: null,
  /**
   * Elements that should also get active state info (classes or attributes)
   */
  syncElements: [],
  /**
   * Callback called when state changes
   */
  onChange(t) {
  }
});
let h = l;
export {
  h as Scrollpoint,
  w as init,
  c as initializer
};
