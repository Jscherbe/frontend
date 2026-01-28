var x = Object.defineProperty;
var f = Object.getOwnPropertySymbols;
var E = Object.prototype.hasOwnProperty, L = Object.prototype.propertyIsEnumerable;
var u = (i, s, t) => s in i ? x(i, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[s] = t, p = (i, s) => {
  for (var t in s || (s = {}))
    E.call(s, t) && u(i, t, s[t]);
  if (f)
    for (var t of f(s))
      L.call(s, t) && u(i, t, s[t]);
  return i;
};
var m = (i, s, t) => u(i, typeof s != "symbol" ? s + "" : s, t);
import { wrapSettingString as v } from "../core/settings.js";
import { hasRequiredProps as g } from "@ulu/utils/object.js";
import { logError as C } from "../utils/class-logger.js";
const S = [
  "track",
  "controls"
], c = class c {
  constructor(s, t) {
    this.options = Object.assign({}, c.defaults, t), g(S) || C(this, "Missing a required Element"), this.elements = p(p({}, s), this.createControls(s.controls)), this.nextEnabled = !0, this.previousEnabled = !0, this.scrollHandler = (e) => this.onScroll(e), this.elements.track.addEventListener("scroll", this.scrollHandler, { passive: !0 }), this.checkOverflow(), this.onScroll();
  }
  checkOverflow() {
    const { track: s } = this.elements;
    this.hasOverflow = s.scrollWidth > s.clientWidth;
  }
  createControls(s) {
    const t = document.createElement("ul"), e = document.createElement("li"), o = document.createElement("li"), n = this.createControlButton("previous"), l = this.createControlButton("next"), r = this.getClass("controls-item");
    return o.classList.add(r), o.classList.add(r + "--next"), e.classList.add(r), e.classList.add(r + "--previous"), t.classList.add(this.getClass("controls")), e.appendChild(n), o.appendChild(l), t.appendChild(e), t.appendChild(o), n.addEventListener("click", this.previous.bind(this)), l.addEventListener("click", this.next.bind(this)), s.appendChild(t), {
      controls: t,
      previousItem: e,
      nextItem: o,
      previous: n,
      next: l
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
    const { nextEnabled: s, previousEnabled: t } = this, { track: e } = this.elements, { offsetStart: o, offsetEnd: n } = this.options, { scrollWidth: l, clientWidth: r, scrollLeft: d } = e, a = d <= o, h = l - d - n <= r;
    a && t ? this.setControlState("previous", !1) : !a && !t && this.setControlState("previous", !0), h && s ? this.setControlState("next", !1) : !h && !s && this.setControlState("next", !0);
  }
  setControlState(s, t) {
    const e = s === "next", { next: o, nextItem: n, previous: l, previousItem: r } = this.elements, d = e ? n : r, a = e ? o : l, h = t ? "remove" : "add";
    d.classList[h](this.getClass("controls-item--disabled")), a.classList[t ? "remove" : "add"](this.getClass("control--disabled")), t ? a.removeAttribute("disabled") : a.setAttribute("disabled", ""), this[e ? "nextEnabled" : "previousEnabled"] = t;
  }
  resolveAmount(s) {
    const t = s === "next", { amount: e } = this.options, { scrollLeft: o, offsetWidth: n } = this.elements.track;
    return e === "auto" ? t ? o + n : o - n : typeof e == "function" ? e(this, s) : typeof e == "number" ? t ? o + e : o - e : (C("Unable to resolve amount for scroll"), 500);
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
m(c, "instances", []), m(c, "defaults", {
  namespace: "OverflowScroller",
  events: {},
  horizontal: !0,
  offsetStart: 100,
  offsetEnd: 100,
  amount: "auto",
  buttonClasses: ["button", "button--icon"],
  iconClassPrevious: v("iconClassPrevious"),
  iconClassNext: v("iconClassNext")
});
let b = c;
export {
  b as OverflowScroller
};
