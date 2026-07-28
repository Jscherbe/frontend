var x = Object.defineProperty;
var f = Object.getOwnPropertySymbols;
var L = Object.prototype.hasOwnProperty, g = Object.prototype.propertyIsEnumerable;
var p = (i, e, t) => e in i ? x(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, m = (i, e) => {
  for (var t in e || (e = {}))
    L.call(e, t) && p(i, t, e[t]);
  if (f)
    for (var t of f(e))
      g.call(e, t) && p(i, t, e[t]);
  return i;
};
var v = (i, e, t) => p(i, typeof e != "symbol" ? e + "" : e, t);
import { wrapSettingString as C } from "../core/settings.js";
import { hasRequiredProps as S } from "@ulu/utils/object.js";
import { logError as b } from "../utils/class-logger.js";
import { getCoreEventName as u } from "../core/events.js";
const k = [
  "track",
  "controls"
], c = class c {
  constructor(e, t) {
    this.options = Object.assign({}, c.defaults, t), S(k) || b(this, "Missing a required Element"), this.elements = m(m({}, e), this.createControls(e.controls)), this.nextEnabled = !0, this.previousEnabled = !0, this.scrollHandler = (s) => this.onScroll(s), this.elements.track.addEventListener("scroll", this.scrollHandler, { passive: !0 }), this.updateHandler = () => this.update(), document.addEventListener(u("pageResized"), this.updateHandler), document.addEventListener(u("pageModified"), this.updateHandler), this.checkOverflow(), this.onScroll();
  }
  checkOverflow() {
    const { track: e } = this.elements;
    this.hasOverflow = e.scrollWidth > e.clientWidth;
  }
  update() {
    this.checkOverflow(), this.onScroll();
  }
  createControls(e) {
    const t = document.createElement("ul"), s = document.createElement("li"), o = document.createElement("li"), n = this.createControlButton("previous"), l = this.createControlButton("next"), r = this.getClass("controls-item");
    return o.classList.add(r), o.classList.add(r + "--next"), s.classList.add(r), s.classList.add(r + "--previous"), t.classList.add(this.getClass("controls")), s.appendChild(n), o.appendChild(l), t.appendChild(s), t.appendChild(o), n.addEventListener("click", this.previous.bind(this)), l.addEventListener("click", this.next.bind(this)), e.appendChild(t), {
      controls: t,
      previousItem: s,
      nextItem: o,
      previous: n,
      next: l
    };
  }
  createControlButton(e) {
    const t = document.createElement("button");
    return t.classList.add(this.getClass("control-button")), t.classList.add(this.getClass(`control-button--${e}`)), t.classList.add(...this.options.buttonClasses), t.setAttribute("type", "button"), t.innerHTML = this.getControlContent(e), t;
  }
  getControlContent(e) {
    const t = this.options[e === "next" ? "iconClassNext" : "iconClassPrevious"];
    return `
      <span class="hidden-visually">${e}</span>
      <span class="${t}" aria-hidden="true"></span>
    `;
  }
  onScroll(e) {
    if (!this.hasOverflow) {
      this.setControlState("previous", !1), this.setControlState("next", !1);
      return;
    }
    this.onScrollHorizontal();
  }
  onScrollHorizontal() {
    const { nextEnabled: e, previousEnabled: t } = this, { track: s } = this.elements, { offsetStart: o, offsetEnd: n } = this.options, { scrollWidth: l, clientWidth: r, scrollLeft: d } = s, a = d <= o, h = l - d - n <= r;
    a && t ? this.setControlState("previous", !1) : !a && !t && this.setControlState("previous", !0), h && e ? this.setControlState("next", !1) : !h && !e && this.setControlState("next", !0);
  }
  setControlState(e, t) {
    const s = e === "next", { next: o, nextItem: n, previous: l, previousItem: r } = this.elements, d = s ? n : r, a = s ? o : l, h = t ? "remove" : "add";
    d.classList[h](this.getClass("controls-item--disabled")), a.classList[t ? "remove" : "add"](this.getClass("control--disabled")), t ? a.removeAttribute("disabled") : a.setAttribute("disabled", ""), this[s ? "nextEnabled" : "previousEnabled"] = t;
  }
  resolveAmount(e) {
    const t = e === "next", { amount: s } = this.options, { scrollLeft: o, offsetWidth: n } = this.elements.track;
    return s === "auto" ? t ? o + n : o - n : typeof s == "function" ? s(this, e) : typeof s == "number" ? t ? o + s : o - s : (b("Unable to resolve amount for scroll"), 500);
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
  getClass(e) {
    const { namespace: t } = this.options;
    return `${t}__${e}`;
  }
  destroy() {
    this.elements.track.removeEventListener("scroll", this.scrollHandler), document.removeEventListener(u("pageResized"), this.updateHandler), document.removeEventListener(u("pageModified"), this.updateHandler), this.elements.controls && this.elements.controls.parentNode && this.elements.controls.parentNode.removeChild(this.elements.controls);
  }
};
v(c, "instances", []), v(c, "defaults", {
  namespace: "OverflowScroller",
  events: {},
  horizontal: !0,
  offsetStart: 100,
  offsetEnd: 100,
  amount: "auto",
  buttonClasses: ["button", "button--icon"],
  iconClassPrevious: C("iconClassPrevious"),
  iconClassNext: C("iconClassNext")
});
let E = c;
export {
  E as OverflowScroller
};
