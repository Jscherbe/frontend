var I = Object.defineProperty;
var w = Object.getOwnPropertySymbols;
var A = Object.prototype.hasOwnProperty, z = Object.prototype.propertyIsEnumerable;
var g = (r, t, s) => t in r ? I(r, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[t] = s, b = (r, t) => {
  for (var s in t || (t = {}))
    A.call(t, s) && g(r, s, t[s]);
  if (w)
    for (var s of w(t))
      z.call(t, s) && g(r, s, t[s]);
  return r;
};
var f = (r, t, s) => g(r, typeof t != "symbol" ? t + "" : t, s);
var y = (r, t, s) => new Promise((e, i) => {
  var n = (c) => {
    try {
      o(s.next(c));
    } catch (u) {
      i(u);
    }
  }, a = (c) => {
    try {
      o(s.throw(c));
    } catch (u) {
      i(u);
    }
  }, o = (c) => c.done ? e(c.value) : Promise.resolve(c.value).then(n, a);
  o((s = s.apply(r, t)).next());
});
import { ComponentInitializer as D } from "../core/component.js";
import { wrapSettingString as T } from "../core/settings.js";
import { ensureId as S } from "../utils/id.js";
import { hasRequiredProps as M } from "@ulu/utils/object.js";
import { trimWhitespace as L } from "@ulu/utils/string.js";
import { debounce as B } from "@ulu/utils/performance.js";
import { logError as k, log as N, logWarning as x } from "../utils/class-logger.js";
import q from "swipe-listener";
const C = new D({
  type: "slider",
  baseAttribute: "data-ulu-slider"
}), P = C.attributeSelector("track"), V = C.attributeSelector("track-container"), F = C.attributeSelector("control-context"), H = C.attributeSelector("slide"), O = [], m = { once: !0 }, $ = (r) => `${r}ms`, R = [
  "container",
  "trackContainer",
  "track",
  "slides"
];
function _() {
  C.init({
    withData: !0,
    coreEvents: ["pageModified"],
    setup({ element: r, data: t, initialize: s }) {
      j(r, t), s();
    }
  });
}
function j(r, t) {
  const s = Object.assign({}, t), e = {
    container: r,
    track: r.querySelector(P),
    trackContainer: r.querySelector(V),
    controlContext: r.querySelector(F),
    slides: r.querySelectorAll(H)
  };
  e.slides.length && O.push(new E(e, s, !1));
}
const l = class l {
  static _initializeGlobals() {
    l.globalsInitialized || (addEventListener("load", () => {
      addEventListener("resize", B(() => {
        l.instances.forEach((t) => t.handleResize());
      }, 250));
    }), l.reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches, l.globalsInitialized = !0);
  }
  constructor(t, s) {
    l._initializeGlobals();
    const e = Object.assign({}, l.defaults, s);
    this.options = e, this.slide = null, this.index = null, this.swipeInstance = null, this.swipeListener = null, this.swipeImageListener = null, this.transitioning = !1, M(R) || k(this, "Missing a required Element"), t.slides.length || k(this, "Missing slides"), S(t.track), this.trackId = t.track.id, this.slides = [...t.slides].map((i, n) => (S(i), {
      element: i,
      index: n,
      id: i.id,
      number: n + 1
    })), this.elements = b(b(b({}, t), this.createControls(t.controlContext || t.container)), this.createNav(t.navContext || t.container)), this.transition = e.transition ? e.transitionFade || l.reduceMotion ? this.fadeTransition : this.slideTransition : this.noTransition, this.setup(), this.goto(0, null, "init"), N(this, "Slider Instance Created", this), l.instances.push(this);
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
   * @param {Function} beginTransition Css changes to begin/start transition 
   */
  ensureTransitionEnds(t, s, e) {
    return new Promise((i) => {
      const n = {}, a = () => {
        clearTimeout(n.start), n.end = setTimeout(o, s + 500);
      }, o = () => {
        clearTimeout(n.start), clearTimeout(n.end), t.removeEventListener("transitionrun", a, m), t.removeEventListener("transitionend", o, m), t.removeEventListener("transitioncancel", o, m), i();
      };
      t.addEventListener("transitionrun", a, m), t.addEventListener("transitionend", o, m), t.addEventListener("transitioncancel", o, m), n.start = setTimeout(o, s + 500), t.style.transitionDuration = $(s), e(), s || o();
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
   * Show's a specific slide and hides others, except when passing true to show all
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
   * Handler for the entire slide transition
   */
  slideTransition(a) {
    return y(this, arguments, function* ({ slide: t, index: s, old: e, oldIndex: i, triggerType: n }) {
      const o = this.slides.length, c = n === "previous", u = o - 1, h = s === 0 && i === u, p = s === u && i === 0;
      let d, v = this.options.transitionDuration;
      i && !h && !p && (v = v * Math.abs(i - s)), o < 3 ? h && !c ? d = e : p && (d = c ? t : e) : h ? d = e : p && (d = t), this.setVisibility(null, !0), d && (d.element.style.order = "-1", yield this.translateTo(h ? 0 : e.element.offsetLeft, 0)), yield this.translateTo(t.element.offsetLeft, v), d && (d.element.style.order = "0", yield this.translateTo(t.element.offsetLeft, 0)), this.setVisibility(t, !1);
    });
  }
  /**
   * Handler for the entire fade transition
   */
  fadeTransition(e) {
    return y(this, arguments, function* ({ slide: t, old: s }) {
      this.setVisibility(null, !0), s && (yield this.fadeSlide(s, !1), s.element.style.order = "0"), t.element.style.order = "-1", yield this.fadeSlide(t, !0), this.setVisibility(t, !1);
    });
  }
  /**
   * Handler for the entire NO transition
   */
  noTransition({ slide: t, old: s }) {
    return this.setVisibility(t, !1), s && (s.element.style.order = "0"), t.element.style.order = "-1", Promise.resolve();
  }
  goto(t, s, e) {
    const {
      slide: i,
      index: n,
      slides: a,
      elements: o
    } = this, c = e === "init", u = a[t], h = this.getClass("nav-button--active"), p = this.getClass("transition", !0), d = { slide: u, index: t, old: i, oldIndex: n, triggerType: e };
    if (t === n) {
      x(this, "Could not goto slide, still performing transition");
      return;
    }
    if (this.transitioning) {
      x(this, "Cancel goto(), same slide index as current slide");
      return;
    }
    this.elements.track.inert = !0, this.transitioning = !0, i && i.navButton.classList.remove(h), u.navButton.classList.add(h), o.container.classList.add(p), this.transition(d).then(() => {
      this.index = t, this.slide = u, this.transitioning = !1, this.elements.track.inert = !1, o.container.classList.remove(p), c || (u.element.focus(), this.emit("goto", [s, t, u]));
    });
  }
  setup() {
    const { container: t, track: s, trackContainer: e } = this.elements, i = L(this.trackCss()), n = L(this.trackContainerStyles()), a = L(this.slideCss());
    s.setAttribute("style", i), e.setAttribute("style", n), s.setAttribute("aria-live", "polite"), this.slides.forEach((o) => {
      o.element.setAttribute("style", a), o.element.setAttribute("tabindex", "-1"), o.element.setAttribute("role", "group"), o.element.setAttribute("aria-roledescription", "slide"), o.element.setAttribute("aria-label", `Slide ${o.number} of ${this.slides.length}`);
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
      s.swipeInstance = q(e, this.options.swipeOptions), e.addEventListener("swipe", this.swipeListener);
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
      transition-duration: ${$(e)};
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
    return s.classList.add(this.getClass("control-button")), s.classList.add(this.getClass(`control-button--${t}`)), s.classList.add(...this.options.buttonClasses), s.setAttribute("data-slider-control", t), s.setAttribute("type", "button"), s.setAttribute("aria-controls", this.trackId), s.innerHTML = this.getControlContent(t), s;
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
    return e.classList.add(this.getClass("nav-button")), e.setAttribute("type", "button"), e.setAttribute("aria-controls", t.id), e.innerHTML = this.getNavContent(t), t.navButton = e, e.addEventListener("click", this.goto.bind(this, s)), e;
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
  _ as init,
  C as initializer,
  j as setupSlider
};
