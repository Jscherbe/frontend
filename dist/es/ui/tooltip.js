var E = Object.defineProperty;
var f = Object.getOwnPropertySymbols;
var y = Object.prototype.hasOwnProperty, C = Object.prototype.propertyIsEnumerable;
var u = (i, t, e) => t in i ? E(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e, g = (i, t) => {
  for (var e in t || (t = {}))
    y.call(t, e) && u(i, e, t[e]);
  if (f)
    for (var e of f(t))
      C.call(t, e) && u(i, e, t[e]);
  return i;
};
var m = (i, t, e) => u(i, typeof t != "symbol" ? t + "" : t, e);
import { ComponentInitializer as b } from "../core/component.js";
import { getUluEventName as w } from "../core/events.js";
import { createFloatingUi as A } from "../utils/floating-ui.js";
import { createElementFromHtml as H } from "@ulu/utils/browser/dom.js";
import { logError as v } from "../utils/class-logger.js";
import { ensureId as S, newId as I } from "../utils/id.js";
const d = new b({
  type: "tooltip",
  baseAttribute: "data-ulu-tooltip"
}), L = d.getAttribute("body"), F = d.attributeSelector("body"), O = d.attributeSelector("arrow");
function T() {
  d.init({
    coreEvents: ["pageModified"],
    withData: !0,
    setup({ element: i, data: t, initialize: e }) {
      const n = typeof t == "object" ? t : {};
      typeof t == "string" && (n.content = t), e(), new p({ trigger: i }, n);
    }
  });
}
const a = class a {
  constructor(t, e, n) {
    const { trigger: s } = t;
    if (!s) {
      v(this, "missing required trigger");
      return;
    }
    this.options = Object.assign({}, a.defaults, e), this.floatingOptions = Object.assign({}, a.defaultFloatingOptions, n), this.elements = g({}, t), this.handlers = {}, this.isOpen = !1, S(s), this.setup();
  }
  setup() {
    this.createContentElement(), this.attachHandlers(), this.setupAccessibility();
  }
  setupAccessibility() {
    const { trigger: t, content: e } = this.elements, { accessible: n } = this.options;
    n && t.setAttribute("aria-describedby", e.id);
  }
  destroy() {
    this.destroyHandlers(), this.destroyDisplay();
  }
  getInnerContent() {
    const { fromElement: t, content: e, isHtml: n, fromAnchor: s } = this.options;
    if (e)
      return e;
    if (t || s) {
      const o = s ? this.getAnchorElement() : document.querySelector(t);
      return o ? n ? o.innerHTML : o.innerText : "";
    } else
      v(this, "Could not resolve inner content");
  }
  getAnchorElement() {
    const { trigger: t } = this.elements, { href: e } = t, n = e ? e.split("#")[1] : null, s = n ? document.getElementById(n) : null;
    return s || console.error("Unable to get 'fromAnchor' element", t), s;
  }
  createContentElement() {
    const { options: t } = this, e = H(t.template(t)), n = e.querySelector(F), s = this.getInnerContent();
    t.isHtml ? n.innerHTML = s : n.textContent = s, e.id = I(), t.contentClass && e.classList.add(t.contentClass), this.elements.content = e, this.elements.contentArrow = e.querySelector(O), document.body.appendChild(e);
  }
  attachHandlers() {
    const { trigger: t } = this.elements, { showEvents: e, hideEvents: n, delay: s } = this.options;
    let o = null;
    const c = (r) => {
      o || (o = setTimeout(() => {
        this.show(r), clearTimeout(o);
      }, s));
    }, l = (r) => {
      o && (clearTimeout(o), o = null), this.hide(r);
    }, h = (r) => {
      r.key === "Escape" && this.hide(r);
    };
    e.forEach((r) => {
      t.addEventListener(r, c);
    }), n.forEach((r) => {
      t.addEventListener(r, l);
    }), document.addEventListener("keydown", h), this.handlers = { onShow: c, onHide: l, onDocumentKeydown: h };
  }
  destroyHandlers() {
    const { trigger: t } = this, { onShow: e, onHide: n, onDocumentKeydown: s } = this.handlers, { showEvents: o, hideEvents: c } = this.options;
    e && o.forEach((l) => {
      t.removeEventListener(l, e);
    }), n && c.forEach((l) => {
      t.removeEventListener(l, n);
    }), s && document.removeEventListener("keydown", s);
  }
  setState(t, e) {
    const n = {
      instance: this,
      isOpen: t,
      event: e
    }, { trigger: s, content: o } = this.elements, { openClass: c } = this.options, l = (h) => h.classList[t ? "add" : "remove"](c);
    l(s), l(o), this.isOpen = t, this.options.onChange(n), s.dispatchEvent(this.createEvent("change", n)), this.destroyFloatingInstance(), t && this.createFloatingInstance();
  }
  createEvent(t, e) {
    return new CustomEvent(w("tooltip:" + t), { detail: e });
  }
  createFloatingInstance() {
    this.floatingCleanup = A(this.elements, this.floatingOptions);
  }
  destroyFloatingInstance() {
    this.floatingCleanup && (this.floatingCleanup(), this.floatingCleanup = null);
  }
  show(t) {
    this.setState(!0, t);
  }
  hide(t) {
    this.setState(!1, t);
  }
};
/**
 * Defaults options
 */
m(a, "defaults", {
  /**
   * Should the tooltip and content be linked accessibly
   * - Note tooltips can only apply to interactive elements! (ie button, input, role="...", etc)
   * @type {Boolean}
   */
  accessible: !0,
  /**
   * String/markup to insert into tooltip display
   * @type {String}
   */
  content: null,
  openClass: "is-active",
  contentClass: "",
  isHtml: !1,
  /**
   * Pull content from pre-existing content on page 
   * @type {String|Node}
   */
  fromElement: null,
  /**
   * If used on a link that is an anchor link it will display the content of the anchor like fromElement
   */
  fromAnchor: !1,
  /**
   * Move the content to the bottom of the document
   * @type {Boolean}
   */
  endOfDocument: !0,
  /**
   * Events to show tooltip on
   * @type {Array.<String>}
   */
  showEvents: ["pointerenter", "focus"],
  /**
   * Events to hide tooltip on
   * @type {Array.<String>}
   */
  hideEvents: ["pointerleave", "blur"],
  /**
   * Delay when using the directive
   * @type {Number}
   */
  delay: 500,
  /**
   * Template for the content display
   */
  template(t) {
    return `
        <div class="popover popover--tooltip">
          <div class="popover__inner" ${L}>
          </div>
          <span class="popover__arrow" data-ulu-tooltip-arrow></span>
        </div>
      `;
  },
  /**
   * Callback when tooltip is shown or hidden
   * @type {Function}
   */
  onChange(t) {
  }
}), m(a, "defaultFloatingOptions", {
  // strategy: "fixed"
});
let p = a;
export {
  p as Tooltip,
  T as init,
  d as initializer
};
