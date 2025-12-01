var u = Object.defineProperty;
var p = (s, t, e) => t in s ? u(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var r = (s, t, e) => p(s, typeof t != "symbol" ? t + "" : t, e);
import { removeArrayElement as c } from "@ulu/utils/array.js";
import { isBrowser as g } from "@ulu/utils/browser/dom.js";
import { getCoreEventName as v } from "../core/events.js";
import { wrapSettingString as b } from "../core/settings.js";
import { getCustomProperty as k } from "../utils/css.js";
import { log as d, logError as f } from "../utils/class-logger.js";
const y = (s) => k(s, "breakpoint"), i = class i {
  static _initializeGlobals() {
    i.globalsInitialized || !g() || (window.addEventListener(v("pageResized"), () => {
      i.instances.forEach((t) => t.update());
    }), i.globalsInitialized = !0);
  }
  /**
   * @param {Object} config Configuration object
   * @param {Array} config.order Array of strings that correspond to the breakpoints setup in the styles, Breakpoints from smallest to largest, defaults to [small, medium, large]
   * @param {Array} config.customProperty Property to grab breakpoint from (default is --breakpoint)
   * @param {Array} config.valueFromPseudo Use the legacy method of grabbing breakpoint from pseudo element, default uses custom property
   * @param {Node} config.element The element to retrieve active breakpoint from stylesheet. (default is html) For using the old pseudo method, adjust this to document.body
   * @param {String} config.pseudoSelector Change pseudo selector used to get the breakpoint from the pseudo's content property
   */
  constructor(t) {
    i._initializeGlobals(), Object.assign(this, i.defaults, t), this.active = null, this.previous = null, this.activeIndex = null, this.resizeDirection = null, this.previousIndex = null, this.breakpoints = {}, this.onChangeCallbacks = [], this.order.forEach((e) => this.breakpoints[e] = new x(e, this)), d(this, this), this.update(), i.instances.push(this);
  }
  /**
   * Add a callback for every time a breakpoint changes
   * - Not recommended, possibly use to watch for changes, etc
   * - For more control use instance.at(name) with breakpoint methods
   * @param {Function} callback Function to call, passed one argument current instance which can be used to get information about breakpoints
   */
  onChange(t) {
    this.onChangeCallbacks.push(t);
  }
  /**
   * Remove change callback
   * @param {Function} callback Function to remove
   */
  removeOnChange(t) {
    c(this.onChangeCallbacks, t);
  }
  /**
   * Get breakpoint from a pseudo element
   */
  getBreakpointInPseudo() {
    return window.getComputedStyle(this.element, this.pseudoSelector).content.replace(/^"|"$/g, "");
  }
  /**
   * Get breakpoint from a custom property
   */
  getBreakpointInProperty() {
    return getComputedStyle(this.element).getPropertyValue(this.customProperty).trim();
  }
  /**
   * Get breakpoint from element (design note: user could override prototype)
   */
  getBreakpoint() {
    return this.valueFromPseudo ? this.getBreakpointInPseudo() : this.getBreakpointInProperty();
  }
  /**
   * Updates the active breakpoint by checking the element and executes handlers on change
   */
  update() {
    const t = this.getBreakpoint();
    if (!t) {
      f(this, "Unable to get current breakpoint, maybe order is incorrect? Breakpoint check skipped!");
      return;
    }
    if (t === this.active) return;
    this.previous = this.active, this.previousIndex = this.activeIndex;
    const e = this.order.indexOf(t);
    this.active = t, this.activeIndex = e, this.order.forEach((o, n) => {
      const a = this.breakpoints[o], h = this.activeIndex;
      a._setDirection("min", n <= h), a._setDirection("max", n > h), a._setDirection("only", n === h);
    }), this.previousIndex !== null && (this.resizeDirection = this.previousIndex < e ? "up" : "down"), this.onChangeCallbacks.forEach((o) => o(this));
  }
  /**
   * Get a breakpoint by key
   * @param {String} name The name of the breakpoint to get
   * @return {Breakpoint} Breakpoint to act on (see Breakpoint class)
   */
  at(t) {
    const e = this.breakpoints[t];
    return t || f(this, "Unable to find breakpoint for:", e), e;
  }
};
r(i, "instances", []), r(i, "globalsInitialized", !1), r(i, "defaults", {
  element: document == null ? void 0 : document.documentElement,
  valueFromPseudo: !1,
  customProperty: "--breakpoint",
  customProperty: b("cssvarPrefix", y),
  pseudoSelector: ":before",
  order: ["none", "small", "medium", "large"],
  debug: !1
});
let m = i;
class l {
  constructor(t, e) {
    this.direction = t, this.active = !1, this.on = [], this.off = [], this.breakpoint = e;
  }
  /**
   * Change the state of the direction
   */
  change(t) {
    this.active !== t && (t ? this._call(!0) : this.active && this._call(!1), this.active = t);
  }
  /**
   * Calls all functions in handlers or
   */
  _call(t) {
    (t ? this.on : this.off).forEach((o) => o()), d(this.breakpoint._manager, `Handlers called (${t ? "on" : "off"}): ${this.direction}`);
  }
  /**
   * Returns handlers in normalized object format on/off
   */
  getHandlers(t) {
    return typeof t != "object" ? { on: t } : t;
  }
  /**
   * Adds a handler for the direction, optionally use object to add off state handler
   * @param {Function|Object} handler Function to be executed when direction is active, read object description for on/off
   * @param {Function|Object} handler.on Function to be executed when direction is active
   * @param {Function|Object} handler.off Function to be executed when direction was active and is now changed to inactive
   */
  add(t) {
    const e = this.getHandlers(t);
    e.on && this.on.push(e.on), e.off && this.off.push(e.off), this.active && e.on && (e.on(), d(this.breakpoint._manager, `Handler called immediately: ${this.direction}`, e.on));
  }
  /**
   * Removes a handler
   */
  remove(t) {
    const e = this.getHandlers(t);
    e.on && c(this.on, e.on), e.off && c(this.off, e.off);
  }
}
class x {
  constructor(t, e) {
    this.directions = {
      max: new l("max", this),
      min: new l("min", this),
      only: new l("only", this)
    }, this._manager = e, this.name = t;
  }
  /**
   * Private method used inrternally for managing direction activation
   * - Each direction manages it's own state and handlers
   * @param {String} direction The directional key
   * @param {Boolean} active State of that direction to set
   */
  _setDirection(t, e) {
    this.directions[t].change(e);
  }
  /**
   * Attach handler to be executed from the breakpoint and to all breakpoints below (inclusive).
   * This corresponds to a `max-width` media query in SCSS.
   * @param {Function} handler Handler to be executed
   */
  max(t) {
    this.directions.max.add(t);
  }
  /**
   * Attach handler to be executed from the breakpoint and to all breakpoints above (inclusive).
   * This corresponds to a `min-width` media query in SCSS.
   * @param {Function} handler Handler to be executed
   */
  min(t) {
    this.directions.min.add(t);
  }
  /**
   * Attach a handler to fire when the breakpoint is within the key
   * @param {Function} handler Handler to be executed
   */
  only(t) {
    this.directions.only.add(t);
  }
  /**
   * Remove handler
   * @param {Function} handler Handler to be removed, extended on/off object style can be used
   * @param {String} direction Remove handler only from specified direction, else search all directions
   */
  remove(t, e) {
    (e ? [e] : ["max", "min", "only"]).forEach((n) => {
      this.directions[n] && this.directions[n].remove(t);
    });
  }
  log(...t) {
    t.unshift(`Breakpoint (${this.name}):`), this._manager.log.apply(this._manager, t);
  }
}
export {
  m as BreakpointManager
};
