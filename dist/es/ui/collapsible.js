var f = Object.defineProperty;
var p = (r, t, e) => t in r ? f(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var d = (r, t, e) => p(r, typeof t != "symbol" ? t + "" : t, e);
import { getUluEventName as v } from "../core/events.js";
import { logError as k, log as E } from "../utils/class-logger.js";
import { ensureId as h } from "../utils/id.js";
const l = class l {
  /**
   * @param {Object} elements Elements object 
   * @param {Node} elements.trigger Trigger button/element that opens/closes collapsible
   * @param {Node} elements.content The content element that the trigger reveals
   * @param {Object} config Configuration options (see defaults)
   * @returns {Object} Collapsible instance
   */
  constructor(t, e) {
    const { trigger: s, content: n } = t;
    if (!s || !n) {
      k(this, "missing required elements (trigger or content)");
      return;
    }
    const i = Object.assign({}, l.defaults, e);
    this.elements = t, this.options = i, this.isOpen = !1, this.handlers = {}, h(s), h(n), this.debugLog(this, this), i.selfManaged || this.attachHandlers(), this.setup();
  }
  attachHandlers() {
    const { trigger: t, content: e } = this.elements, { focusoutCloses: s } = this.options;
    this.clickHandler = (n) => {
      this.onClick(n);
    }, this.focusoutHandler = (n) => {
      s && document.addEventListener("focusin", () => {
        e.contains(document.activeElement) || this.close(n);
      }, { once: !0 });
    }, t.addEventListener("click", this.clickHandler), e.addEventListener("focusout", this.focusoutHandler);
  }
  removeHandlers() {
    const { trigger: t, content: e } = this.elements;
    t.removeEventListener("click", this.clickHandler), e.removeEventListener("focusout", this.focusoutHandler);
  }
  onClick(t) {
    this.toggle(t);
  }
  destroy() {
    this.removeHandlers(), this.destroyTemporaryHandlers();
  }
  debugLog(...t) {
    this.options.debug && E(this, ...t);
  }
  setup() {
    const { trigger: t, content: e } = this.elements, { startOpen: s } = this.options;
    t.setAttribute("role", "button"), t.setAttribute("aria-controls", e.id), e.setAttribute("aria-labelledby", t.id), this.setState(s);
  }
  createEvent(t, e) {
    return new CustomEvent(v("collapsible:" + t), { detail: e });
  }
  setState(t, e) {
    const s = {
      collapsible: this,
      isOpen: t,
      event: e
    };
    this.debugLog(this, "Set state", s);
    const { trigger: n, content: i } = this.elements, { openClass: c } = this.options, o = (a) => a.classList[t ? "add" : "remove"](c);
    n.setAttribute("aria-expanded", t ? "true" : "false"), o(n), o(i), this.isOpen = t, this.options.onChange(s), n.dispatchEvent(this.createEvent("change", s)), t ? this.setupTemporaryHandlers() : this.destroyTemporaryHandlers();
  }
  /**
   * Setup handlers needed for closing once open
   */
  setupTemporaryHandlers() {
    const { content: t, trigger: e } = this.elements, { clickOutsideCloses: s, escapeCloses: n } = this.options, i = (o) => {
      const { target: a } = o, m = e.contains(a), g = t.contains(a);
      s && !m && !g && this.close(o);
    }, c = (o) => {
      n && o.key === "Escape" && this.close(o);
    };
    document.addEventListener("click", i), document.addEventListener("keydown", c), this.handlers.onDocumentClick = i, this.handlers.onDocumentKeydown = c;
  }
  /**
   * Destroy handlers attached for closing once open
   */
  destroyTemporaryHandlers() {
    const { onDocumentClick: t, onDocumentKeydown: e } = this.handlers;
    t && document.removeEventListener("click", t), t && document.removeEventListener("keydown", e);
  }
  open(t) {
    this.setState(!0, t);
  }
  close(t) {
    this.setState(!1, t);
  }
  toggle(t) {
    this.setState(!this.isOpen, t);
  }
  // This is removed because I think it's not useful, users should keep references
  // Static Methods for managing instances of this class
  // static instances = [];
  // /**
  //  * Get collapsible instance by trigger element
  //  * @param {Node|String} trigger Trigger node or trigger ID
  //  */
  // static getInstance(trigger) {
  //   return Collapsible.instances.find(c => typeof trigger === "string" ? 
  //     c.elements.trigger.id === trigger : 
  //     c.elements.trigger === trigger
  //   );
  // }
  // static removeInstance(instance) {
  //   const index = Collapsible.instances.findIndex(c => c === instance);
  //   if (index > -1) {
  //     Collapsible.instances.splice(index, 1);
  //   }
  // }
};
d(l, "defaults", {
  clickOutsideCloses: !1,
  // oneOpenPerContext: false, // This should be another module that manages instances within a context (accordions)
  // clickWithinCloses: false, // Not sure how this was used but seems like it should be separate
  focusoutCloses: !1,
  escapeCloses: !1,
  /**
   * The module won't attach the handlers (you need to do it yourself)
   */
  selfManaged: !1,
  /**
   * This collapsible starts in open state
   */
  startOpen: !1,
  /**
   * Open/active state class
   */
  openClass: "is-active",
  /**
   * Output debug info
   */
  debug: !0,
  onChange(t) {
  }
});
let u = l;
export {
  u as Collapsible
};
