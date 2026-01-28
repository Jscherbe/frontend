var V = Object.defineProperty;
var k = Object.getOwnPropertySymbols;
var C = Object.prototype.hasOwnProperty, W = Object.prototype.propertyIsEnumerable;
var H = (n) => {
  throw TypeError(n);
};
var L = (n, e, t) => e in n ? V(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, S = (n, e) => {
  for (var t in e || (e = {}))
    C.call(e, t) && L(n, t, e[t]);
  if (k)
    for (var t of k(e))
      W.call(e, t) && L(n, t, e[t]);
  return n;
};
var T = (n, e, t) => L(n, typeof e != "symbol" ? e + "" : e, t), x = (n, e, t) => e.has(n) || H("Cannot " + t);
var i = (n, e, t) => (x(n, e, "read from private field"), t ? t.call(n) : e.get(n)), u = (n, e, t) => e.has(n) ? H("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), a = (n, e, t, r) => (x(n, e, "write to private field"), r ? r.call(n, t) : e.set(n, t), t), p = (n, e, t) => (x(n, e, "access private method"), t);
import { createUluEvent as $ } from "../core/events.js";
import { logError as I, log as b } from "../utils/class-logger.js";
var z, v, f, d, y, w, g, E, R, l, X, A, D, K;
const Y = class Y {
  /**
   * @param {Node} container Container to be resized
   * @param {HTMLElement} control Resize handle element (should be focusable like a button)
   * @param {Object} config Options to configure the resizer.
   * @param {Boolean} [config.debug=false] Enable non-essential debugging logs.
   * @param {Boolean} [config.multiplier=1] Amount to increase size by (ie. pointer movement * multiplier).
   * @param {Boolean} [config.overrideMaxDimensions=false] When script is activated by handle, remove the element's max-width/max-height and allow the resize to exceed them.
   * @param {"left"|"right"|null} [config.fromX=null] Horizontal resizing direction.
   * @param {"top"|"bottom"|null} [config.fromY=null] Vertical resizing direction.
   * @param {number} [config.keyboardStep=10] The step in pixels for keyboard resizing.
   * @param {number} [config.keyboardDebounceTime=200] Debounce time for keyboard resize end.
   * @param {boolean} [config.manageEvents=true] If true, the Resizer will automatically bind its own events.
   * @param {boolean} [config.manageAriaLabel=false] If true, the Resizer will manage the control's aria-label.
   * @param {boolean} [config.enablePointerResizing=true] If true, pointer events will enable resizing.
   * @param {boolean} [config.enableKeyboardResizing=true] If true, keyboard events will enable resizing.
   */
  constructor(e, t, r) {
    u(this, l);
    // Declare private fields without initial assignments
    u(this, z);
    u(this, v);
    u(this, f);
    u(this, d);
    u(this, y);
    u(this, w);
    u(this, g);
    u(this, E);
    u(this, R);
    if (!t || !e) {
      I(this, "Missing required elements: control, container");
      return;
    }
    const s = Object.assign({}, Y.defaults, r);
    this.options = s, this.container = e, this.control = t, this.debug = s.debug;
    const o = ["left", "right"], c = ["top", "bottom"], { fromX: h, fromY: m } = s;
    if (!o.includes(h) && h !== null) {
      I(this, `Invalid fromX: ${h} (left|right|null)`);
      return;
    }
    if (!c.includes(m) && m !== null) {
      I(this, `Invalid fromY: ${m} (top|bottom|null)`);
      return;
    }
    if (!h && !m) {
      I(this, "Invalid fromX/fromY, failed to setup resizer (at least one of fromX or fromY must be set)");
      return;
    }
    this.resizeHorizontal = s.fromX !== null, this.resizeVertical = s.fromY !== null, s.manageEvents && (a(this, z, this.onPointerdown.bind(this)), a(this, v, this.onKeydown.bind(this)), s.enablePointerResizing && t.addEventListener("pointerdown", i(this, z)), s.enableKeyboardResizing && t.addEventListener("keydown", i(this, v))), p(this, l, X).call(this), s.manageAriaLabel && t.setAttribute("aria-label", this.getAriaLabel());
  }
  /**
   * Cleans up event listeners and internal state to prevent memory leaks.
   */
  destroy() {
    const { control: e, options: t } = this;
    t.manageEvents && (t.enablePointerResizing && e.removeEventListener("pointerdown", i(this, z)), t.enableKeyboardResizing && e.removeEventListener("keydown", i(this, v))), i(this, f) && clearTimeout(i(this, f)), p(this, l, X).call(this), t.manageAriaLabel && e.removeAttribute("aria-label"), b(this, "Resizer destroyed.");
  }
  /**
   * Public handler for pointerdown events. Call this method from your own event listeners
   * if `manageEvents` is false. Its logic will only execute if `enablePointerResizing` is true.
   * @param {PointerEvent} e The pointerdown event.
   */
  onPointerdown(e) {
    if (!this.options.enablePointerResizing) {
      b(this, "Pointer resizing disabled. Ignoring pointerdown event.");
      return;
    }
    e.preventDefault();
    const t = document.documentElement;
    a(this, E, e.clientX), a(this, R, e.clientY), p(this, l, A).call(this, {
      inputType: "pointer",
      startX: e.clientX,
      startY: e.clientY,
      pointerId: e.pointerId
    }), this.control.setPointerCapture(e.pointerId);
    const r = (o) => {
      const c = o.clientX - i(this, E), h = o.clientY - i(this, R);
      p(this, l, K).call(this, c, h, o);
    }, s = (o) => {
      t.removeEventListener("pointermove", r, !1), t.removeEventListener("pointerup", s, { capture: !0, once: !0 }), this.control.hasPointerCapture(o.pointerId) && this.control.releasePointerCapture(o.pointerId), p(this, l, D).call(this);
    };
    t.addEventListener("pointermove", r, !1), t.addEventListener("pointerup", s, { capture: !0, once: !0 });
  }
  /**
   * Public handler for keydown events. Call this method from your own event listeners
   * if `manageEvents` is false. Its logic will only execute if `enableKeyboardResizing` is true.
   * @param {KeyboardEvent} e The keydown event.
   */
  onKeydown(e) {
    if (!this.options.enableKeyboardResizing) {
      b(this, "Keyboard resizing disabled. Ignoring keydown event.");
      return;
    }
    const { key: t } = e, { keyboardStep: r, keyboardDebounceTime: s } = this.options;
    let o = 0, c = 0, h = !1;
    this.resizeHorizontal && (t === "ArrowLeft" ? (o = -r, h = !0) : t === "ArrowRight" && (o = r, h = !0)), this.resizeVertical && (t === "ArrowUp" ? (c = -r, h = !0) : t === "ArrowDown" && (c = r, h = !0)), h && (e.preventDefault(), e.stopPropagation(), (!i(this, g) || i(this, f) === null) && p(this, l, A).call(this, { inputType: "keyboard", keyboardKey: t }), a(this, y, i(this, y) + o), a(this, w, i(this, w) + c), p(this, l, K).call(this, i(this, y), i(this, w), e), i(this, f) && clearTimeout(i(this, f)), a(this, f, setTimeout(() => {
      p(this, l, D).call(this), a(this, f, null);
    }, s)));
  }
  /**
   * Generates an accessible label for the resize control based on its configuration.
   * This is a convenience function that can be used by the consumer if `manageAriaLabel` is false.
   * @returns {string} The suggested aria-label for the control.
   */
  getAriaLabel() {
    const { fromY: e, fromX: t } = this.options, r = [e, t].filter((s) => s);
    return r.length === 0 ? "Resize control" : `Resize from ${r.join(" ")} edge`;
  }
  /**
   * Dispatches a custom event on the container element.
   * @param {string} type The event type (e.g., "resizer:start", "resizer:update", "resizer:end").
   * @param {Object} [data={}] Optional data to attach to the event's detail property.
   */
  dispatchEvent(e, t = {}) {
    this.container.dispatchEvent($(e, t));
  }
};
z = new WeakMap(), v = new WeakMap(), f = new WeakMap(), d = new WeakMap(), y = new WeakMap(), w = new WeakMap(), g = new WeakMap(), E = new WeakMap(), R = new WeakMap(), l = new WeakSet(), /**
 * Resets all internal state properties to their default/inactive values.
 * This centralizes state cleanup and initial setup.
 * @private
 */
X = function() {
  a(this, f, null), a(this, d, { width: 0, height: 0 }), a(this, y, 0), a(this, w, 0), a(this, g, !1), a(this, E, 0), a(this, R, 0);
}, /**
 * Initiates a resize operation.
 * This sets initial dimensions and dispatches the 'resizer:start' event.
 * @param {Object} eventDetails Additional details about the initiating event.
 * @private
 */
A = function(e) {
  const { container: t, options: r } = this;
  if (i(this, g)) {
    r.overrideMaxDimensions && (this.resizeHorizontal && (t.style.maxWidth = "none"), this.resizeVertical && (t.style.maxHeight = "none"));
    return;
  }
  const o = document.defaultView.getComputedStyle(t);
  i(this, d).width = parseInt(o.width, 10), i(this, d).height = parseInt(o.height, 10), r.overrideMaxDimensions && (this.resizeHorizontal && (t.style.maxWidth = "none"), this.resizeVertical && (t.style.maxHeight = "none")), a(this, g, !0), this.dispatchEvent("resizer:start", e), b(this, "Resize started.", S({
    initialWidth: i(this, d).width,
    initialHeight: i(this, d).height
  }, e));
}, /**
 * Ends a resize operation.
 * Dispatches 'resizer:end' event and resets internal state.
 * @private
 */
D = function() {
  i(this, g) && (this.dispatchEvent("resizer:end"), p(this, l, X).call(this), b(this, "Resize ended."));
}, /**
 * Core logic for calculating and applying the new size of the container.
 * This method is called by both pointer and keyboard event handlers.
 *
 * @param {number} totalDeltaX The total horizontal displacement from the start of the resize.
 * @param {number} totalDeltaY The total vertical displacement from the start of the resize.
 * @param {Event} originalEvent The original DOM event (PointerEvent or KeyboardEvent) that triggered the update.
 * @private
 */
K = function(e, t, r) {
  let s = i(this, d).width, o = i(this, d).height;
  const { fromX: c, fromY: h, multiplier: m } = this.options;
  this.resizeHorizontal && (c === "right" ? s = i(this, d).width + e * m : c === "left" && (s = i(this, d).width - e * m), this.container.style.width = `${Math.max(0, s)}px`), this.resizeVertical && (h === "bottom" ? o = i(this, d).height + t * m : h === "top" && (o = i(this, d).height - t * m), this.container.style.height = `${Math.max(0, o)}px`);
  const P = {
    newWidth: s,
    newHeight: o,
    totalDeltaX: e,
    totalDeltaY: t,
    event: r
  };
  this.dispatchEvent("resizer:update", P), b(this, "Resizing update.", P);
}, T(Y, "defaults", {
  debug: !1,
  /**
   * Amount to increase size by (ie. pointer movement * multiplier)
   */
  multiplier: 1,
  /**
   * Remove max-width, max-height
   */
  overrideMaxDimensions: !1,
  /**
   * @type {"left"|"right"|null}
   * Specifies the horizontal edge from which resizing occurs.
   * `null` means no horizontal resizing.
   * - Default null
   */
  fromX: null,
  /**
   * @type {"top"|"bottom"|null}
   * Specifies the vertical edge from which resizing occurs.
   * - `null` means no vertical resizing.
   * - Default null
   */
  fromY: null,
  /**
   * The step in pixels for keyboard resizing with arrow keys.
   */
  keyboardStep: 10,
  /**
   * Debounce time in milliseconds for ending a keyboard resize.
   */
  keyboardDebounceTime: 200,
  /**
   * If true, the Resizer instance will automatically bind its own DOM event listeners
   * (pointerdown, keydown) to the control element. If `false`, the user is
   * responsible for calling `resizerInstance.onPointerdown(event)` and
   * `resizerInstance.onKeydown(event)` from their own listeners.
   * Default: true
   */
  manageEvents: !0,
  /**
   * If true, the Resizer instance will automatically manage the `aria-label`
   * attribute of the control element. If `false`, the user is responsible
   * for setting this attribute.
   * Default: false
   */
  manageAriaLabel: !1,
  /**
   * If true, pointer events (mouse/touch) will enable resizing.
   * Default: true
   */
  enablePointerResizing: !0,
  /**
   * If true, keyboard events (arrow keys) will enable resizing.
   * Default: true
   */
  enableKeyboardResizing: !0
});
let M = Y;
export {
  M as Resizer
};
