var T = Object.defineProperty;
var S = (r, t, s) => t in r ? T(r, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[t] = s;
var v = (r, t, s) => S(r, typeof t != "symbol" ? t + "" : t, s);
import { ComponentInitializer as x } from "../core/component.js";
import { wrapSettingString as b } from "../core/settings.js";
import k from "ally.js/maintain/_maintain";
import { hasRequiredProps as $ } from "@ulu/utils/object.js";
import { trimWhitespace as g } from "@ulu/utils/string.js";
import { debounce as I } from "@ulu/utils/performance.js";
import { logError as y, log as A, logWarning as L } from "../utils/class-logger.js";
import D from "swipe-listener";
const m = new x({
  type: "slider",
  baseAttribute: "data-ulu-slider"
}), B = m.attributeSelector("track"), N = m.attributeSelector("track-container"), q = m.attributeSelector("control-context"), M = m.attributeSelector("slide"), P = [], V = matchMedia("(prefers-reduced-motion: reduce)").matches, d = { once: !0 }, E = (r) => `${r}ms`;
addEventListener("load", () => {
  addEventListener("resize", I(() => {
    C.instances.forEach((r) => r.handleResize());
  }, 250));
});
const z = [
  "container",
  "trackContainer",
  "track",
  "slides"
];
function Q() {
  m.init({
    withData: !0,
    coreEvents: ["pageModified"],
    setup({ element: r, data: t, initialize: s }) {
      F(r, t), s();
    }
  });
}
function F(r, t) {
  const s = Object.assign({}, t), e = {
    container: r,
    track: r.querySelector(B),
    trackContainer: r.querySelector(N),
    controlContext: r.querySelector(q),
    slides: r.querySelectorAll(M)
  };
  e.slides.length && P.push(new C(e, s, !1));
}
const h = class h {
  constructor(t, s) {
    const e = Object.assign({}, h.defaults, s);
    this.options = e, this.slide = null, this.index = null, this.swipeInstance = null, this.swipeListener = null, this.swipeImageListener = null, this.transitioning = !1, $(z) || y(this, "Missing a required Element"), t.slides.length || y(this, "Missing slides"), this.slides = [...t.slides].map((i, n) => ({
      element: i,
      index: n,
      number: n + 1
    })), this.elements = {
      ...t,
      ...this.createControls(t.controlContext || t.container),
      ...this.createNav(t.navContext || t.container)
    }, this.transition = e.transition ? e.transitionFade || V ? this.fadeTransition : this.slideTransition : this.noTransition, this.setup(), this.goto(0, null, "init"), A(this, "Slider Instance Created", this), h.instances.push(this);
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
    const { index: s, slides: e } = this, i = e.length - 1, n = s - 1, o = n < 0 ? i : n;
    this.emit("previous", [t, o]), this.goto(o, t, "previous");
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
      const n = {}, o = () => {
        clearTimeout(n.start), n.end = setTimeout(a, s + 500);
      }, a = () => {
        clearTimeout(n.start), clearTimeout(n.end), t.removeEventListener("transitionrun", o, d), t.removeEventListener("transitionend", a, d), t.removeEventListener("transitioncancel", a, d), i();
      };
      t.addEventListener("transitionrun", o, d), t.addEventListener("transitionend", a, d), t.addEventListener("transitioncancel", a, d), n.start = setTimeout(a, s + 500), t.style.transitionDuration = E(s), e(), s || a();
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
  async slideTransition({ slide: t, index: s, old: e, oldIndex: i, triggerType: n }) {
    const o = this.slides.length, a = n === "previous", f = o - 1, c = s === 0 && i === f, u = s === f && i === 0;
    let l, p = this.options.transitionDuration;
    i && !c && !u && (p = p * Math.abs(i - s)), o < 3 ? c && !a ? l = e : u && (l = a ? t : e) : c ? l = e : u && (l = t), this.setVisibility(null, !0), l && (l.element.style.order = "-1", await this.translateTo(c ? 0 : e.element.offsetLeft, 0)), await this.translateTo(t.element.offsetLeft, p), l && (l.element.style.order = "0", await this.translateTo(t.element.offsetLeft, 0)), this.setVisibility(t, !1);
  }
  /**
   * Handler for the entire fade transtion
   */
  async fadeTransition({ slide: t, old: s }) {
    this.setVisibility(null, !0), s && (await this.fadeSlide(s, !1), s.element.style.order = "0"), t.element.style.order = "-1", await this.fadeSlide(t, !0), this.setVisibility(t, !1);
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
      slides: o,
      elements: a
    } = this, f = e === "init", c = o[t], u = this.getClass("nav-button--active"), l = this.getClass("transition", !0), p = { slide: c, index: t, old: i, oldIndex: n, triggerType: e };
    if (t === n) {
      L(this, "Could not goto slide, still performing transition");
      return;
    }
    if (this.transitioning) {
      L(this, "Cancel goto(), same slide index as current slide");
      return;
    }
    const w = k.disabled({ context: this.elements.track });
    this.transitioning = !0, i && i.navButton.classList.remove(u), c.navButton.classList.add(u), a.container.classList.add(l), this.transition(p).then(() => {
      this.index = t, this.slide = c, this.transitioning = !1, a.container.classList.remove(l), w.disengage(), f || (c.element.focus(), this.emit("goto", [s, t, c]));
    });
  }
  setup() {
    const { container: t, track: s, trackContainer: e } = this.elements, i = g(this.trackCss()), n = g(this.trackContainerStyles()), o = g(this.slideCss());
    s.setAttribute("style", i), e.setAttribute("style", n), this.slides.forEach((a) => {
      a.element.setAttribute("style", o), a.element.setAttribute("tabindex", "-1");
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
      s.swipeInstance = D(e, this.options.swipeOptions), e.addEventListener("swipe", this.swipeListener);
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
      transition-duration: ${E(e)};
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
    const s = document.createElement("ul"), e = document.createElement("li"), i = document.createElement("li"), n = this.createControlButton("previous"), o = this.createControlButton("next");
    return s.classList.add(this.getClass("controls")), e.appendChild(n), i.appendChild(o), s.appendChild(e), s.appendChild(i), n.addEventListener("click", this.previous.bind(this)), o.addEventListener("click", this.next.bind(this)), t.appendChild(s), {
      controls: s,
      previousItem: e,
      nextItem: i,
      previous: n,
      next: o
    };
  }
  createNav(t) {
    const s = document.createElement("ul"), e = this.slides.map(this.createNavButton.bind(this)), i = e.map((n) => {
      const o = document.createElement("li");
      return o.appendChild(n), s.appendChild(o), o;
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
v(h, "instances", []), /**
 * Default options for slider
 */
v(h, "defaults", {
  classAccessiblyHidden: "hidden-visually",
  namespace: "Slider",
  events: {},
  transition: !0,
  transitionFade: !1,
  transitionDuration: 700,
  transitionDurationExit: 400,
  transitionTimingFunction: "ease-in-out",
  buttonClasses: ["button", "button--icon"],
  iconClassPrevious: b("iconClassPrevious"),
  iconClassNext: b("iconClassNext"),
  swipeEnabled: !0,
  swipeOptions: {
    preventScroll: !0
  }
});
let C = h;
export {
  C as Slider,
  Q as init,
  m as initializer,
  F as setupSlider
};
