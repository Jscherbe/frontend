var $ = Object.defineProperty;
var w = Object.getOwnPropertySymbols;
var I = Object.prototype.hasOwnProperty, A = Object.prototype.propertyIsEnumerable;
var b = (o, t, s) => t in o ? $(o, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : o[t] = s, v = (o, t) => {
  for (var s in t || (t = {}))
    I.call(t, s) && b(o, s, t[s]);
  if (w)
    for (var s of w(t))
      A.call(t, s) && b(o, s, t[s]);
  return o;
};
var f = (o, t, s) => b(o, typeof t != "symbol" ? t + "" : t, s);
var y = (o, t, s) => new Promise((e, i) => {
  var n = (c) => {
    try {
      r(s.next(c));
    } catch (u) {
      i(u);
    }
  }, a = (c) => {
    try {
      r(s.throw(c));
    } catch (u) {
      i(u);
    }
  }, r = (c) => c.done ? e(c.value) : Promise.resolve(c.value).then(n, a);
  r((s = s.apply(o, t)).next());
});
import { ComponentInitializer as z } from "../core/component.js";
import { wrapSettingString as T } from "../core/settings.js";
import { hasRequiredProps as D } from "@ulu/utils/object.js";
import { trimWhitespace as L } from "@ulu/utils/string.js";
import { debounce as M } from "@ulu/utils/performance.js";
import { logError as x, log as B, logWarning as S } from "../utils/class-logger.js";
import N from "swipe-listener";
const C = new z({
  type: "slider",
  baseAttribute: "data-ulu-slider"
}), q = C.attributeSelector("track"), P = C.attributeSelector("track-container"), V = C.attributeSelector("control-context"), F = C.attributeSelector("slide"), H = [], m = { once: !0 }, k = (o) => `${o}ms`, O = [
  "container",
  "trackContainer",
  "track",
  "slides"
];
function Y() {
  C.init({
    withData: !0,
    coreEvents: ["pageModified"],
    setup({ element: o, data: t, initialize: s }) {
      R(o, t), s();
    }
  });
}
function R(o, t) {
  const s = Object.assign({}, t), e = {
    container: o,
    track: o.querySelector(q),
    trackContainer: o.querySelector(P),
    controlContext: o.querySelector(V),
    slides: o.querySelectorAll(F)
  };
  e.slides.length && H.push(new E(e, s, !1));
}
const l = class l {
  static _initializeGlobals() {
    l.globalsInitialized || (addEventListener("load", () => {
      addEventListener("resize", M(() => {
        l.instances.forEach((t) => t.handleResize());
      }, 250));
    }), l.reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches, l.globalsInitialized = !0);
  }
  constructor(t, s) {
    l._initializeGlobals();
    const e = Object.assign({}, l.defaults, s);
    this.options = e, this.slide = null, this.index = null, this.swipeInstance = null, this.swipeListener = null, this.swipeImageListener = null, this.transitioning = !1, D(O) || x(this, "Missing a required Element"), t.slides.length || x(this, "Missing slides"), this.slides = [...t.slides].map((i, n) => ({
      element: i,
      index: n,
      number: n + 1
    })), this.elements = v(v(v({}, t), this.createControls(t.controlContext || t.container)), this.createNav(t.navContext || t.container)), this.transition = e.transition ? e.transitionFade || l.reduceMotion ? this.fadeTransition : this.slideTransition : this.noTransition, this.setup(), this.goto(0, null, "init"), B(this, "Slider Instance Created", this), l.instances.push(this);
  }
  /**
   * Sliding mechanism needs translate updated on resize
   */
  handleResize() {
    const { slide: t, transition: s, slideTransition: e } = this;
    s === e && t && this.translateTo(t.element.offsetLeft, 0);
  }
  /**
   * Goto to the previous slide
   */
  previous(t) {
    const { index: s, slides: e } = this, i = e.length - 1, n = s - 1, a = n < 0 ? i : n;
    this.emit("previous", [t, a]), this.goto(a, t, "previous");
  }
  /**
   * Goto to the next slide
   */
  next(t) {
    const { index: s, slides: e } = this, i = s + 1, n = i > e.length - 1 ? 0 : i;
    this.emit("next", [t, n]), this.goto(n, t, "next");
  }
  /**
   *  Makes sure that no matter what the callback is called if transition event
   * doesn't start or fails to finish/cancel
   * @param {number} element
   * @param {number} duration Duration to wait for complete 
   * @param {Function} beginTransition Css changes to begin/start transtion 
   */
  ensureTransitionEnds(t, s, e) {
    return new Promise((i) => {
      const n = {}, a = () => {
        clearTimeout(n.start), n.end = setTimeout(r, s + 500);
      }, r = () => {
        clearTimeout(n.start), clearTimeout(n.end), t.removeEventListener("transitionrun", a, m), t.removeEventListener("transitionend", r, m), t.removeEventListener("transitioncancel", r, m), i();
      };
      t.addEventListener("transitionrun", a, m), t.addEventListener("transitionend", r, m), t.addEventListener("transitioncancel", r, m), n.start = setTimeout(r, s + 500), t.style.transitionDuration = k(s), e(), s || r();
    });
  }
  /**
   * Translate the track to X
   */
  translateTo(t, s) {
    const { track: e } = this.elements, i = () => e.style.transform = `translateX(-${t}px)`;
    return e.style.willChange = "transform", this.ensureTransitionEnds(e, s, i).then(() => {
      e.style.willChange = "auto";
    });
  }
  /**
   * Show's a specifc slide and hides others, except when passing true to show all
   * then all slides will visible
   */
  setVisibility(t, s) {
    s || (t.element.style.visibility = "visible"), this.slides.forEach((e) => {
      e !== t && (e.element.style.visibility = s ? "visible" : "hidden");
    });
  }
  /**
   * Perform a fade on a single slide
   */
  fadeSlide(t, s) {
    const { options: e } = this, { element: i } = t, n = s ? e.transitionDuration : e.transitionDurationExit;
    return this.ensureTransitionEnds(i, n, () => {
      i.style.opacity = s ? "1" : "0";
    });
  }
  /**
   * Handler for the entire slide transtion
   */
  slideTransition(a) {
    return y(this, arguments, function* ({ slide: t, index: s, old: e, oldIndex: i, triggerType: n }) {
      const r = this.slides.length, c = n === "previous", u = r - 1, h = s === 0 && i === u, p = s === u && i === 0;
      let d, g = this.options.transitionDuration;
      i && !h && !p && (g = g * Math.abs(i - s)), r < 3 ? h && !c ? d = e : p && (d = c ? t : e) : h ? d = e : p && (d = t), this.setVisibility(null, !0), d && (d.element.style.order = "-1", yield this.translateTo(h ? 0 : e.element.offsetLeft, 0)), yield this.translateTo(t.element.offsetLeft, g), d && (d.element.style.order = "0", yield this.translateTo(t.element.offsetLeft, 0)), this.setVisibility(t, !1);
    });
  }
  /**
   * Handler for the entire fade transtion
   */
  fadeTransition(e) {
    return y(this, arguments, function* ({ slide: t, old: s }) {
      this.setVisibility(null, !0), s && (yield this.fadeSlide(s, !1), s.element.style.order = "0"), t.element.style.order = "-1", yield this.fadeSlide(t, !0), this.setVisibility(t, !1);
    });
  }
  /**
   * Handler for the entire NO transtion
   */
  noTransition({ slide: t, old: s }) {
    return this.setVisibility(t, !1), s && (s.element.style.order = "0"), t.element.style.order = "-1", Promise.resolve();
  }
  goto(t, s, e) {
    const {
      slide: i,
      index: n,
      slides: a,
      elements: r
    } = this, c = e === "init", u = a[t], h = this.getClass("nav-button--active"), p = this.getClass("transition", !0), d = { slide: u, index: t, old: i, oldIndex: n, triggerType: e };
    if (t === n) {
      S(this, "Could not goto slide, still performing transition");
      return;
    }
    if (this.transitioning) {
      S(this, "Cancel goto(), same slide index as current slide");
      return;
    }
    this.elements.track.inert = !0, this.transitioning = !0, i && i.navButton.classList.remove(h), u.navButton.classList.add(h), r.container.classList.add(p), this.transition(d).then(() => {
      this.index = t, this.slide = u, this.transitioning = !1, this.elements.track.inert = !1, r.container.classList.remove(p), c || (u.element.focus(), this.emit("goto", [s, t, u]));
    });
  }
  setup() {
    const { container: t, track: s, trackContainer: e } = this.elements, i = L(this.trackCss()), n = L(this.trackContainerStyles()), a = L(this.slideCss());
    s.setAttribute("style", i), e.setAttribute("style", n), this.slides.forEach((r) => {
      r.element.setAttribute("style", a), r.element.setAttribute("tabindex", "-1");
    }), t.classList.add(this.getClass()), this.options.swipeEnabled && this.setupSwipe();
  }
  setupSwipe() {
    const t = this.elements.track.querySelectorAll("img");
    this.swipeListener = (s) => {
      this.onSwipe(s);
    }, this.swipeImageListener = (s) => {
      s.preventDefault();
    }, this.slides.forEach((s) => {
      const { element: e } = s;
      s.swipeInstance = N(e, this.options.swipeOptions), e.addEventListener("swipe", this.swipeListener);
    }), t.forEach((s) => {
      s.addEventListener("dragstart", this.swipeImageListener);
    });
  }
  onSwipe(t) {
    const { directions: s } = t.detail, e = s.left ? "next" : s.right ? "previous" : null;
    e && this[e](t);
  }
  trackContainerStyles() {
    return `
      overflow: hidden;
    `;
  }
  transitionCss(t) {
    const { transitionTimingFunction: s, transitionDuration: e } = this.options;
    return `
      transition-property: ${t};
      transition-duration: ${k(e)};
      transition-timing-function: ${s};
    `;
  }
  trackCss() {
    return `
      display: flex;
      position: relative;
      list-style: none;
      ${this.transition === this.slideTransition ? this.transitionCss("transform") : ""}
    `;
  }
  slideCss() {
    const t = this.transition === this.fadeTransition;
    return `
      width: 100%;
      flex: 0 0 100%;
      ${t ? this.transitionCss("opacity") : ""}
      opacity: ${t ? "0" : "1"}
    `;
  }
  getClass(t, s) {
    const { namespace: e } = this.options;
    return s ? `${e}--${t}` : t ? `${e}__${t}` : e;
  }
  createControlButton(t) {
    const s = document.createElement("button");
    return s.classList.add(this.getClass("control-button")), s.classList.add(this.getClass(`control-button--${t}`)), s.classList.add(...this.options.buttonClasses), s.setAttribute("data-slider-control", t), s.setAttribute("type", "button"), s.innerHTML = this.getControlContent(t), s;
  }
  createControls(t) {
    const s = document.createElement("ul"), e = document.createElement("li"), i = document.createElement("li"), n = this.createControlButton("previous"), a = this.createControlButton("next");
    return s.classList.add(this.getClass("controls")), e.appendChild(n), i.appendChild(a), s.appendChild(e), s.appendChild(i), n.addEventListener("click", this.previous.bind(this)), a.addEventListener("click", this.next.bind(this)), t.appendChild(s), {
      controls: s,
      previousItem: e,
      nextItem: i,
      previous: n,
      next: a
    };
  }
  createNav(t) {
    const s = document.createElement("ul"), e = this.slides.map(this.createNavButton.bind(this)), i = e.map((n) => {
      const a = document.createElement("li");
      return a.appendChild(n), s.appendChild(a), a;
    });
    return s.classList.add(this.getClass("nav")), t.appendChild(s), {
      nav: s,
      navButtons: e,
      navItems: i
    };
  }
  createNavButton(t, s) {
    const e = document.createElement("button");
    return e.classList.add(this.getClass("nav-button")), e.setAttribute("type", "button"), e.innerHTML = this.getNavContent(t), t.navButton = e, e.addEventListener("click", this.goto.bind(this, s)), e;
  }
  getControlContent(t) {
    const s = this.options[t === "next" ? "iconClassNext" : "iconClassPrevious"];
    return `
      <span class="${this.options.classAccessiblyHidden}">${t}</span>
      <span class="${this.getClass("control-icon")} ${s}" aria-hidden="true"></span>
    `;
  }
  getNavContent(t) {
    return `<span class="${this.options.classAccessiblyHidden}">Item ${t.number}</span>`;
  }
  emit(t, s) {
    this.options.events[t] && this.options.events[t].apply(this, s);
  }
};
f(l, "instances", []), f(l, "globalsInitialized", !1), f(l, "reduceMotion", !1), /**
 * Default options for slider
 */
f(l, "defaults", {
  classAccessiblyHidden: "hidden-visually",
  namespace: "Slider",
  events: {},
  transition: !0,
  transitionFade: !1,
  transitionDuration: 700,
  transitionDurationExit: 400,
  transitionTimingFunction: "ease-in-out",
  buttonClasses: ["button", "button--icon"],
  iconClassPrevious: T("iconClassPrevious"),
  iconClassNext: T("iconClassNext"),
  swipeEnabled: !0,
  swipeOptions: {
    preventScroll: !0
  }
});
let E = l;
export {
  E as Slider,
  Y as init,
  C as initializer,
  R as setupSlider
};
