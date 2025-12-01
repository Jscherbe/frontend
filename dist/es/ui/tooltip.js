var f = Object.defineProperty;
var g = (l, t, e) => t in l ? f(l, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : l[t] = e;
var u = (l, t, e) => g(l, typeof t != "symbol" ? t + "" : t, e);
import { ComponentInitializer as v } from "../core/component.js";
import { getUluEventName as E } from "../core/events.js";
import { createFloatingUi as y } from "../utils/floating-ui.js";
import { createElementFromHtml as C } from "@ulu/utils/browser/dom.js";
import { logError as p } from "../utils/class-logger.js";
import { ensureId as b, newId as w } from "../utils/id.js";
const d = new v({
  type: "tooltip",
  baseAttribute: "data-ulu-tooltip"
}), A = d.getAttribute("body"), H = d.attributeSelector("body"), S = d.attributeSelector("arrow");
function j() {
  d.init({
    coreEvents: ["pageModified"],
    withData: !0,
    setup({ element: l, data: t, initialize: e }) {
      const n = typeof t == "object" ? t : {};
      typeof t == "string" && (n.content = t), e(), new m({ trigger: l }, n);
    }
  });
}
const a = class a {
  constructor(t, e, n) {
    const { trigger: s } = t;
    if (!s) {
      p(this, "missing required trigger");
      return;
    }
    this.options = Object.assign({}, a.defaults, e), this.floatingOptions = Object.assign({}, a.defaultFloatingOptions, n), this.elements = { ...t }, this.handlers = {}, this.isOpen = !1, b(s), this.setup();
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
      p(this, "Could not resolve inner content");
  }
  getAnchorElement() {
    const { trigger: t } = this.elements, { href: e } = t, n = e ? e.split("#")[1] : null, s = n ? document.getElementById(n) : null;
    return s || console.error("Unable to get 'fromAnchor' element", t), s;
  }
  createContentElement() {
    const { options: t } = this, e = C(t.template(t)), n = e.querySelector(H), s = this.getInnerContent();
    t.isHtml ? n.innerHTML = s : n.textContent = s, e.id = w(), t.contentClass && e.classList.add(t.contentClass), this.elements.content = e, this.elements.contentArrow = e.querySelector(S), document.body.appendChild(e);
  }
  attachHandlers() {
    const { trigger: t } = this.elements, { showEvents: e, hideEvents: n, delay: s } = this.options;
    let o = null;
    const c = (i) => {
      o || (o = setTimeout(() => {
        this.show(i), clearTimeout(o);
      }, s));
    }, r = (i) => {
      o && (clearTimeout(o), o = null), this.hide(i);
    }, h = (i) => {
      i.key === "Escape" && this.hide(i);
    };
    e.forEach((i) => {
      t.addEventListener(i, c);
    }), n.forEach((i) => {
      t.addEventListener(i, r);
    }), document.addEventListener("keydown", h), this.handlers = { onShow: c, onHide: r, onDocumentKeydown: h };
  }
  destroyHandlers() {
    const { trigger: t } = this, { onShow: e, onHide: n, onDocumentKeydown: s } = this.handlers, { showEvents: o, hideEvents: c } = this.options;
    e && o.forEach((r) => {
      t.removeEventListener(r, e);
    }), n && c.forEach((r) => {
      t.removeEventListener(r, n);
    }), s && document.removeEventListener("keydown", s);
  }
  setState(t, e) {
    const n = {
      instance: this,
      isOpen: t,
      event: e
    }, { trigger: s, content: o } = this.elements, { openClass: c } = this.options, r = (h) => h.classList[t ? "add" : "remove"](c);
    r(s), r(o), this.isOpen = t, this.options.onChange(n), s.dispatchEvent(this.createEvent("change", n)), this.destroyFloatingInstance(), t && this.createFloatingInstance();
  }
  createEvent(t, e) {
    return new CustomEvent(E("tooltip:" + t), { detail: e });
  }
  createFloatingInstance() {
    this.floatingCleanup = y(this.elements, this.floatingOptions);
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
u(a, "defaults", {
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
          <div class="popover__inner" ${A}>
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
}), u(a, "defaultFloatingOptions", {
  // strategy: "fixed"
});
let m = a;
export {
  m as Tooltip,
  j as init,
  d as initializer
};
