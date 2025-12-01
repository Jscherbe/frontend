var v = Object.defineProperty;
var C = (a, s, t) => s in a ? v(a, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[s] = t;
var u = (a, s, t) => C(a, typeof s != "symbol" ? s + "" : s, t);
import { wrapSettingString as p } from "../core/settings.js";
import { hasRequiredProps as b } from "@ulu/utils/object.js";
import { logError as m } from "../utils/class-logger.js";
const x = [
  "track",
  "controls"
], c = class c {
  constructor(s, t) {
    this.options = Object.assign({}, c.defaults, t), b(x) || m(this, "Missing a required Element"), this.elements = {
      ...s,
      ...this.createControls(s.controls)
    }, this.nextEnabled = !0, this.previousEnabled = !0, this.scrollHandler = (e) => this.onScroll(e), this.elements.track.addEventListener("scroll", this.scrollHandler, { passive: !0 }), this.checkOverflow(), this.onScroll();
  }
  checkOverflow() {
    const { track: s } = this.elements;
    this.hasOverflow = s.scrollWidth > s.clientWidth;
  }
  createControls(s) {
    const t = document.createElement("ul"), e = document.createElement("li"), o = document.createElement("li"), n = this.createControlButton("previous"), r = this.createControlButton("next"), i = this.getClass("controls-item");
    return o.classList.add(i), o.classList.add(i + "--next"), e.classList.add(i), e.classList.add(i + "--previous"), t.classList.add(this.getClass("controls")), e.appendChild(n), o.appendChild(r), t.appendChild(e), t.appendChild(o), n.addEventListener("click", this.previous.bind(this)), r.addEventListener("click", this.next.bind(this)), s.appendChild(t), {
      controls: t,
      previousItem: e,
      nextItem: o,
      previous: n,
      next: r
    };
  }
  createControlButton(s) {
    const t = document.createElement("button");
    return t.classList.add(this.getClass("control-button")), t.classList.add(this.getClass(`control-button--${s}`)), t.classList.add(...this.options.buttonClasses), t.setAttribute("type", "button"), t.innerHTML = this.getControlContent(s), t;
  }
  getControlContent(s) {
    const t = this.options[s === "next" ? "iconClassNext" : "iconClassPrevious"];
    return `
      <span class="hidden-visually">${s}</span>
      <span class="${t}" aria-hidden="true"></span>
    `;
  }
  onScroll(s) {
    this.hasOverflow && this.onScrollHorizontal();
  }
  onScrollHorizontal() {
    const { nextEnabled: s, previousEnabled: t } = this, { track: e } = this.elements, { offsetStart: o, offsetEnd: n } = this.options, { scrollWidth: r, clientWidth: i, scrollLeft: d } = e, l = d <= o, h = r - d - n <= i;
    l && t ? this.setControlState("previous", !1) : !l && !t && this.setControlState("previous", !0), h && s ? this.setControlState("next", !1) : !h && !s && this.setControlState("next", !0);
  }
  setControlState(s, t) {
    const e = s === "next", { next: o, nextItem: n, previous: r, previousItem: i } = this.elements, d = e ? n : i, l = e ? o : r, h = t ? "remove" : "add";
    d.classList[h](this.getClass("controls-item--disabled")), l.classList[t ? "remove" : "add"](this.getClass("control--disabled")), t ? l.removeAttribute("disabled") : l.setAttribute("disabled", ""), this[e ? "nextEnabled" : "previousEnabled"] = t;
  }
  resolveAmount(s) {
    const t = s === "next", { amount: e } = this.options, { scrollLeft: o, offsetWidth: n } = this.elements.track;
    return e === "auto" ? t ? o + n : o - n : typeof e == "function" ? e(this, s) : typeof e == "number" ? t ? o + e : o - e : (m("Unable to resolve amount for scroll"), 500);
  }
  next() {
    this.elements.track.scrollTo({
      top: 0,
      left: this.resolveAmount("next"),
      behavior: "smooth"
    });
  }
  previous() {
    this.elements.track.scrollTo({
      top: 0,
      left: this.resolveAmount("previous"),
      behavior: "smooth"
    });
  }
  getClass(s) {
    const { namespace: t } = this.options;
    return `${t}__${s}`;
  }
};
u(c, "instances", []), u(c, "defaults", {
  namespace: "OverflowScroller",
  events: {},
  horizontal: !0,
  offsetStart: 100,
  offsetEnd: 100,
  amount: "auto",
  buttonClasses: ["button", "button--icon"],
  iconClassPrevious: p("iconClassPrevious"),
  iconClassNext: p("iconClassNext")
});
let f = c;
export {
  f as OverflowScroller
};
