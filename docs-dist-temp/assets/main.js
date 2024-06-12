var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __publicField = (obj, key2, value) => {
  __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
  return value;
};
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/docs-dist-temp/assets//" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
    const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
    promise = Promise.all(deps.map((dep) => {
      dep = assetsURL(dep);
      if (dep in seen)
        return;
      seen[dep] = true;
      const isCss = dep.endsWith(".css");
      const cssSelector = isCss ? '[rel="stylesheet"]' : "";
      if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
        return;
      }
      const link = document.createElement("link");
      link.rel = isCss ? "stylesheet" : scriptRel;
      if (!isCss) {
        link.as = "script";
        link.crossOrigin = "";
      }
      link.href = dep;
      if (cspNonce) {
        link.setAttribute("nonce", cspNonce);
      }
      document.head.appendChild(link);
      if (isCss) {
        return new Promise((res, rej) => {
          link.addEventListener("load", res);
          link.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
        });
      }
    }));
  }
  return promise.then(() => baseModule()).catch((err) => {
    const e2 = new Event("vite:preloadError", { cancelable: true });
    e2.payload = err;
    window.dispatchEvent(e2);
    if (!e2.defaultPrevented) {
      throw err;
    }
  });
};
function removeArrayElement(array, element) {
  var index2 = array.indexOf(element);
  if (index2 > -1) {
    array.splice(index2, 1);
  }
}
function debounce(callback, wait, immediate, valueThis) {
  var timeout;
  return function executedFunction() {
    var context = this;
    var args = arguments;
    var later = function() {
      timeout = null;
      callback.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
const events = {
  pageModified(context) {
    context.dispatchEvent(new Event(getName$1("pageModified"), { bubbles: true }));
  },
  pageResized(context) {
    context.dispatchEvent(new Event(getName$1("pageResized"), { bubbles: true }));
  }
};
if (typeof window !== "undefined") {
  window.addEventListener("resize", debounce(() => dispatch("pageResized", document), 250));
}
function dispatch(type, context) {
  if (events[type]) {
    events[type](context);
  } else {
    console.warn(`Unable to dispatch site event: ${type} in context:`, context);
  }
}
function getName$1(type) {
  return "ulu:" + type;
}
const index$c = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dispatch,
  getName: getName$1
}, Symbol.toStringTag, { value: "Module" }));
const config = {
  debug: false,
  warningsAlways: true,
  errorsAlways: true,
  outputContext: false
};
const hasConsole = "console" in window;
function allow(context) {
  return hasConsole && config.debug && ((context == null ? void 0 : context.debug) || context == null);
}
function getName(context) {
  var _a;
  return typeof context === "object" && ((_a = context == null ? void 0 : context.constructor) == null ? void 0 : _a.name);
}
function output(method, context, messages) {
  const label = getName(context) || "Logger";
  console[method](label, ...messages);
}
function log(context, ...messages) {
  if (allow(context)) {
    output("log", context, messages);
  }
}
function logWarning(context, ...messages) {
  {
    output("warn", context, messages);
  }
}
function logError$1(context, ...messages) {
  {
    output("error", context, messages);
  }
}
window.addEventListener(getName$1("pageResized"), () => {
  BreakpointManager.instances.forEach((i2) => i2.update());
});
const _BreakpointManager = class _BreakpointManager {
  /**
   * @param {Object} config Configruation object
   * @param {Array} config.order Array of strings that correspond to the breakpoints setup in the styles, Breakpoints from smallest to largest, defaults to [small, medium, large]
   * @param {Array} config.customProperty Property to grab breakpoint from (default is --breakpoint)
   * @param {Array} config.valueFromPsuedo Use the legacy method of grabbing breakpoint from psuedo element, default uses custom property
   * @param {Node} config.element The element to retrieve active breakpoint from stylesheet. (default is html) For using the old psuedo method, adjust this to document.body
   * @param {String} config.psuedoSelector Change psuedo selector used to get the breakpoint from the psuedo's content property
   */
  constructor(config2) {
    Object.assign(this, _BreakpointManager.defaults, config2);
    this.active = null;
    this.previous = null;
    this.activeIndex = null;
    this.resizeDirection = null;
    this.previousIndex = null;
    this.breakpoints = {};
    this.onChangeCallbacks = [];
    this.order.forEach((n2) => this.breakpoints[n2] = new Breakpoint(n2, this));
    log(this, this);
    this.update();
    _BreakpointManager.instances.push(this);
  }
  /**
   * Add a callback for everytime a breakpoint changes
   * - Not recommended, possibly use to watch for changes, etc
   * - For more control use intance.at(name) with breakpoint methods
   * @param {Function} callback Function to call, passed one argument current instance which can be used to get information about breakpoints
   */
  onChange(callback) {
    this.onChangeCallbacks.push(callback);
  }
  /**
   * Remove change callback
   * @param {Function} callback Function to remove
   */
  removeOnChange(callback) {
    removeArrayElement(this.onChangeCallbacks, callback);
  }
  /**
   * Get breakpoint from a psuedo element
   */
  getBreakpointInPsuedo() {
    return window.getComputedStyle(this.element, this.psuedoSelector).content.replace(/^"|"$/g, "");
  }
  /**
   * Get breakpoint from a custom property
   */
  getBreakpointInProperty() {
    return getComputedStyle(this.element).getPropertyValue(this.customProperty);
  }
  /**
   * Get breakpoint from element (design note: user could override prototype)
   */
  getBreakpoint() {
    if (this.valueFromPsuedo) {
      return this.getBreakpointInPsuedo();
    } else {
      return this.getBreakpointInProperty();
    }
  }
  /**
   * Updates the active breakpoint by checking the element and executes handlers on change
   */
  update() {
    const name = this.getBreakpoint();
    if (!name) {
      logError$1(this, "Unable to get current breakpoint, maybe order is incorrect? Breakpoint check skipped!");
      return;
    }
    if (name === this.active)
      return;
    this.previous = this.active;
    this.previousIndex = this.activeIndex;
    const index2 = this.order.indexOf(name);
    this.active = name;
    this.activeIndex = index2;
    const activeBreakpoint = this.at(this.active);
    const mapBreakpoints = (n2) => this.at(n2);
    const max2 = this.order.slice(index2).map(mapBreakpoints);
    const notMax = this.order.slice(0, index2).map(mapBreakpoints);
    const min2 = this.order.slice(0, index2 + 1).map(mapBreakpoints);
    const notMin = this.order.slice(index2 + 1).map(mapBreakpoints);
    const notOnly = this.order.slice().map(mapBreakpoints);
    notOnly.splice(index2, 1);
    log(this, "max:", max2.map((b) => b.name).join());
    log(this, "min:", min2.map((b) => b.name).join());
    max2.forEach((b) => b._setDirection("max", true));
    min2.forEach((b) => b._setDirection("min", true));
    activeBreakpoint._setDirection("only", true);
    notMax.forEach((b) => b._setDirection("max", false));
    notMin.forEach((b) => b._setDirection("min", false));
    notOnly.forEach((b) => b._setDirection("only", false));
    if (this.previousIndex !== null) {
      this.resizeDirection = this.previousIndex < index2 ? "up" : "down";
    }
    this.onChangeCallbacks.forEach((cb) => cb(this));
  }
  /**
   * Get a breakpoint by key
   * @param {String} name The name of the breakpoint to get
   * @return {Breakpoint} Breakpoint to act on (see Breakpoint class)
   */
  at(name) {
    const bp = this.breakpoints[name];
    if (!name) {
      logError$1(this, "Unable to find breakpoint for:", bp);
    }
    return bp;
  }
};
__publicField(_BreakpointManager, "instances", []);
__publicField(_BreakpointManager, "defaults", {
  element: document == null ? void 0 : document.documentElement,
  valueFromPsuedo: false,
  customProperty: "--breakpoint",
  psuedoSelector: ":before",
  order: ["none", "small", "medium", "large"],
  debug: false
});
let BreakpointManager = _BreakpointManager;
class BreakpointDirection {
  constructor(direction, breakpoint) {
    this.direction = direction;
    this.active = false;
    this.on = [];
    this.off = [];
    this.breakpoint = breakpoint;
  }
  /**
   * Change the state of the direction
   */
  change(to) {
    if (this.active !== to) {
      if (to)
        this._call(true);
      else if (this.active)
        this._call(false);
      this.active = to;
    }
  }
  /**
   * Calls all functions in handlers or
   */
  _call(forActive) {
    const handlers = forActive ? this.on : this.off;
    handlers.forEach((handler) => handler());
    log(this.breakpoint._manager, `Handlers called (${forActive ? "on" : "off"}): ${this.direction}`);
  }
  /**
   * Returns handlers in normalized object format on/off
   */
  getHandlers(handler) {
    return typeof handler !== "object" ? { on: handler } : handler;
  }
  /**
   * Adds a handler for the direction, optionally use object to add off state handler
   * @param {Function|Object} handler Function to be executed when direction is active, read object description for on/off
   * @param {Function|Object} handler.on Function to be executed when direction is active
   * @param {Function|Object} handler.off Function to be executed when direction was active and is now changed to inactive
   */
  add(handler) {
    const handlers = this.getHandlers(handler);
    if (handlers.on) {
      this.on.push(handlers.on);
    }
    if (handlers.off) {
      this.off.push(handlers.off);
    }
    if (this.active && handlers.on) {
      handlers.on();
      log(this.breakpoint._manager, `Handler called immediately: ${this.direction}`, handlers.on);
    }
  }
  /**
   * Removes a handler
   */
  remove(handler) {
    const handlers = this.getHandlers(handler);
    if (handlers.on) {
      removeArrayElement(this.on, handlers.on);
    }
    if (handlers.off) {
      removeArrayElement(this.off, handlers.off);
    }
  }
}
class Breakpoint {
  constructor(name, manager) {
    this.directions = {
      max: new BreakpointDirection("max", this),
      min: new BreakpointDirection("min", this),
      only: new BreakpointDirection("only", this)
    };
    this._manager = manager;
    this.name = name;
  }
  /**
   * Private method used inrternally for managing direction activation
   * - Each direction manages it's own state and handlers
   * @param {String} direction The directional key
   * @param {Boolean} active State of that direction to set
   */
  _setDirection(direction, active) {
    this.directions[direction].change(active);
  }
  /**
   * Attach handler to be executed from the breakpoint and to all breakpoints below.
   * - If the browser resizes from a breakpoint below this breakpoint, 
   *   and above the breakpoint name specified, this handler will fire
   * @param {Function} handler Handler to be executed
   */
  max(handler) {
    this.directions.max.add(handler);
  }
  /**
   * Attach handler to be executed from the breakpoint and to all breakpoints below.
   * - If the browser resizes from a breakpoint above this breakpoint, 
   *   and below the breakpoint name specified, this handler will fire
   * @param {Function} handler Handler to be executed
   */
  min(handler) {
    this.directions.min.add(handler);
  }
  /**
   * Attach a handler to fire when the breakpoint is within the key
   * @param {Function} handler Handler to be executed
   */
  only(handler) {
    this.directions.only.add(handler);
  }
  /**
   * Remove handler
   * @param {Function} handler Handler to be removed, extended on/off object style can be used
   * @param {String} direction Remove handler only from specified direction, else search all directions
   */
  remove(handler, direction) {
    const directions = direction ? [direction] : ["max", "min", "only"];
    directions.forEach((d) => d.remove(handler));
  }
  log(...msg) {
    msg.unshift(`Breakpoint (${this.name}):`);
    this._manager.log.apply(this._manager, msg);
  }
}
const index$b = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BreakpointManager
}, Symbol.toStringTag, { value: "Module" }));
let idCount = 0;
function newId() {
  return `ulu-uid-${++idCount}`;
}
function ensureId(element) {
  if (!element.id) {
    element.id = newId();
  }
}
const id = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ensureId,
  newId
}, Symbol.toStringTag, { value: "Module" }));
const _Collapsible = class _Collapsible {
  /**
   * @param {Object} elements Elements object 
   * @param {Node} elements.trigger Trigger button/element that opens/closes collapsible
   * @param {Node} elements.content The content element that the trigger reveals
   * @param {Object} config Configuration options (see defaults)
   * @returns {Object} Collapsible instance
   */
  constructor(elements, config2) {
    const { trigger, content } = elements;
    if (!trigger || !content) {
      logError$1(this, "missing required elements (trigger or content)");
      return;
    }
    const options = Object.assign({}, _Collapsible.defaults, config2);
    this.elements = elements;
    this.options = options;
    this.isOpen = false;
    ensureId(trigger);
    ensureId(content);
    this.debugLog(this, this);
    if (!options.selfManaged) {
      this.attachHandlers();
    }
  }
  attachHandlers() {
    const { trigger } = this.elements;
    this.clickHandler = (event) => this.onClick(event);
    trigger.addEventListener("click", this.clickHandler);
  }
  removeHandlers() {
    const { trigger } = this.elements;
    trigger.removeEventListener("click", this.clickHandler);
  }
  onClick(event) {
    this.toggle(event);
  }
  destroy() {
    this.removeHandlers();
  }
  debugLog(...msgs) {
    if (this.options.debug) {
      log(this, ...msgs);
    }
  }
  setup() {
    const { trigger, content } = this.elements;
    const { startOpen } = this.options;
    trigger.setAttribute("role", "button");
    trigger.setAttribute("aria-controls", content.id);
    content.setAttribute("aria-labelledby", trigger.id);
    this.setState(startOpen);
  }
  createEvent(name, detail) {
    return new CustomEvent(getName$1("collapsible:" + name), { detail });
  }
  setState(isOpen, event) {
    const ctx = {
      collapsible: this,
      isOpen,
      event
    };
    this.debugLog(this, "Set state", ctx);
    const { trigger, content } = this.elements;
    const { openClass } = this.options;
    const setClass = (el) => el.classList[isOpen ? "add" : "remove"](openClass);
    trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    setClass(trigger);
    setClass(content);
    this.isOpen = isOpen;
    this.options.onChange(ctx);
    trigger.dispatchEvent(this.createEvent("change", ctx));
  }
  open(event) {
    this.setState(true, event);
  }
  close(event) {
    this.setState(false, event);
  }
  toggle(event) {
    this.setState(!this.isOpen, event);
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
__publicField(_Collapsible, "defaults", {
  clickOutsideCloses: false,
  oneOpenPerContext: false,
  clickWithinCloses: false,
  focusoutCloses: false,
  closeOnEscape: false,
  /**
   * The module won't attach the handlers (you need to do it yourself)
   */
  selfManaged: false,
  /**
   * This collapsible starts in open state
   */
  startOpen: false,
  /**
   * Open/active state class
   */
  openClass: "is-active",
  /**
   * Output debug info
   */
  debug: false,
  onChange(_ctx) {
  }
});
let Collapsible = _Collapsible;
const index$a = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
const linebreaks = /(\r\n|\n|\r)/gm;
const multiSpace = /\s+/g;
function trimWhitespace(string) {
  return string.replace(linebreaks, "").replace(multiSpace, " ").trim();
}
const _Flipcard = class _Flipcard {
  constructor(container2, front, back, config2, debug = false) {
    if (!back) {
      logError$1(this, "Missing an element (container, front, back)");
    }
    this.options = Object.assign({}, _Flipcard.defaults, config2);
    const { namespace } = this.options;
    _Flipcard.instances.push(this);
    this.debug = debug;
    this.elements = { container: container2, front, back };
    this.isOpen = false;
    this.uid = `${namespace}-id-${_Flipcard.instances.length}`;
    this.stateAttr = `data-${namespace}-state`.toLowerCase();
    this.setup();
    this.setVisiblity(false);
    log(this, this);
  }
  toggle() {
    this.setVisiblity(!this.isOpen);
  }
  setup() {
    const { uid } = this;
    const { namespace, proxyClick } = this.options;
    const { container: container2, front, back } = this.elements;
    const control = this.elements.control = document.createElement("button");
    control.classList.add(this.getClass("control-button"));
    control.setAttribute("type", "button");
    control.innerHTML = this.createControlContent();
    control.style.gridArea = namespace;
    control.style.zIndex = "-1";
    control.addEventListener("focusin", () => {
      control.style.zIndex = "20";
    });
    control.addEventListener("focusout", () => {
      control.style.zIndex = "-1";
    });
    control.addEventListener("click", this.toggle.bind(this));
    back.parentNode.insertBefore(control, back);
    container2.classList.add(this.options.namespace);
    container2.setAttribute("style", trimWhitespace(this.containerCss()));
    if (proxyClick) {
      container2.addEventListener("click", this.onProxyClick.bind(this));
    }
    front.style.gridArea = namespace;
    back.style.gridArea = namespace;
    control.id = `${uid}-control`;
    control.setAttribute("aria-controls", back.id);
    control.setAttribute("aria-expanded", "false");
    back.id = `${uid}-back`;
    back.setAttribute("aria-labelledby", control.id);
    back.setAttribute("aria-hidden", "true");
  }
  /**
   * Click handler on everything on container
   * - Determines if click was something that should be ignored (link, etc)
   */
  onProxyClick({ target }) {
    const { exclude, allowSelection, selectionMin } = this.options.proxyClick;
    const selection = window.getSelection();
    if (exclude && !target.matches(exclude)) {
      if (!allowSelection || selection.toString().length < selectionMin) {
        this.toggle();
      }
    }
  }
  getClass(child) {
    const { namespace } = this.options;
    return child ? `${namespace}__${child}` : namespace;
  }
  createControlContent() {
    return `
      <span class="hidden-visually">Show More Information</span>
    `;
  }
  setVisiblity(visible2) {
    const { back, container: container2, control } = this.elements;
    const state = visible2 ? "open" : "closed";
    back.style.zIndex = visible2 ? "10" : "1";
    back.style.visibility = visible2 ? "visible" : "hidden";
    container2.setAttribute(this.stateAttr, state);
    back.setAttribute("aria-hidden", visible2 ? "false" : "true");
    control.setAttribute("aria-expanded", visible2 ? "true" : "false");
    this.isOpen = visible2;
  }
  containerCss() {
    return `
      display: -ms-grid;
      display: grid;
      position: relative; 
      -ms-grid-columns: 1fr; 
      grid-template-columns: 1fr;
      justify-items: stretch;
      grid-template-areas: "${this.options.namespace}";
      cursor: pointer;
    `;
  }
  panelCss(zIndex = 1) {
    return `
      grid-area: ${this.options.namespace};
      z-index: ${zIndex}
    `;
  }
};
__publicField(_Flipcard, "instances", []);
__publicField(_Flipcard, "defaults", {
  namespace: "Flipcard",
  proxyClick: {
    allowSelection: true,
    // Don't proxy click if the user has more than the minmimum selected
    selectionMin: 10,
    // Minimum length that qualifies as a selection
    exclude: "a, input, textarea, button"
    // Selectors to avoid closing a flipcard onProxyclick 
  }
});
let Flipcard = _Flipcard;
const index$9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Flipcard
}, Symbol.toStringTag, { value: "Module" }));
function setPositionClasses(parent, classes2 = {
  columnFirst: "position-column-first",
  columnLast: "position-column-last",
  rowFirst: "position-row-first",
  rowLast: "position-row-last"
}) {
  const children = [...parent.children];
  const rows = [];
  let lastY;
  children.forEach((child) => {
    const y = child.getBoundingClientRect().y;
    if (lastY !== y)
      rows.push([]);
    rows[rows.length - 1].push(child);
    lastY = y;
    child.classList.remove(...Object.values(classes2));
  });
  rows.forEach((row, index2) => {
    if (index2 === 0)
      row.forEach((child) => child.classList.add(classes2.rowFirst));
    if (index2 == rows.length - 1)
      row.forEach((child) => child.classList.add(classes2.rowLast));
    row.forEach((child, childIndex) => {
      if (childIndex === 0)
        child.classList.add(classes2.columnFirst);
      if (childIndex == row.length - 1)
        child.classList.add(classes2.columnLast);
    });
  });
}
function init$3(selector = "[data-grid]", classes2) {
  document.addEventListener(getName$1("pageModified"), () => setup$2(selector, classes2));
  document.addEventListener(getName$1("pageResized"), () => setup$2(selector, classes2));
  setup$2(selector, classes2);
}
function setup$2(selector, classes2) {
  document.querySelectorAll(selector).forEach((element) => setPositionClasses(element, classes2 || void 0));
}
const index$8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: init$3,
  setup: setup$2
}, Symbol.toStringTag, { value: "Module" }));
function addScrollbarProperty(element = document.body, container2 = window, propName = "--ulu-scrollbar-width") {
  const scrollbarWidth = container2.innerWidth - element.clientWidth;
  element.style.setProperty(propName, `${scrollbarWidth}px`);
}
const index$7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addScrollbarProperty
}, Symbol.toStringTag, { value: "Module" }));
function e(e2, t2) {
  for (var o2 = 0; o2 < t2.length; o2++) {
    var n2 = t2[o2];
    n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(e2, n2.key, n2);
  }
}
function t(e2) {
  return function(e3) {
    if (Array.isArray(e3))
      return o(e3);
  }(e2) || function(e3) {
    if ("undefined" != typeof Symbol && Symbol.iterator in Object(e3))
      return Array.from(e3);
  }(e2) || function(e3, t2) {
    if (!e3)
      return;
    if ("string" == typeof e3)
      return o(e3, t2);
    var n2 = Object.prototype.toString.call(e3).slice(8, -1);
    "Object" === n2 && e3.constructor && (n2 = e3.constructor.name);
    if ("Map" === n2 || "Set" === n2)
      return Array.from(e3);
    if ("Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
      return o(e3, t2);
  }(e2) || function() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function o(e2, t2) {
  (null == t2 || t2 > e2.length) && (t2 = e2.length);
  for (var o2 = 0, n2 = new Array(t2); o2 < t2; o2++)
    n2[o2] = e2[o2];
  return n2;
}
var n, i, a, r, s, l = (n = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden])", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'], i = function() {
  function o2(e2) {
    var n2 = e2.targetModal, i3 = e2.triggers, a3 = void 0 === i3 ? [] : i3, r2 = e2.onShow, s2 = void 0 === r2 ? function() {
    } : r2, l2 = e2.onClose, c = void 0 === l2 ? function() {
    } : l2, d = e2.openTrigger, u = void 0 === d ? "data-micromodal-trigger" : d, f = e2.closeTrigger, h = void 0 === f ? "data-micromodal-close" : f, v = e2.openClass, g = void 0 === v ? "is-open" : v, m = e2.disableScroll, b = void 0 !== m && m, y = e2.disableFocus, p = void 0 !== y && y, w = e2.awaitCloseAnimation, E = void 0 !== w && w, k = e2.awaitOpenAnimation, M = void 0 !== k && k, A = e2.debugMode, C = void 0 !== A && A;
    !function(e3, t2) {
      if (!(e3 instanceof t2))
        throw new TypeError("Cannot call a class as a function");
    }(this, o2), this.modal = document.getElementById(n2), this.config = { debugMode: C, disableScroll: b, openTrigger: u, closeTrigger: h, openClass: g, onShow: s2, onClose: c, awaitCloseAnimation: E, awaitOpenAnimation: M, disableFocus: p }, a3.length > 0 && this.registerTriggers.apply(this, t(a3)), this.onClick = this.onClick.bind(this), this.onKeydown = this.onKeydown.bind(this);
  }
  var i2, a2;
  return i2 = o2, (a2 = [{ key: "registerTriggers", value: function() {
    for (var e2 = this, t2 = arguments.length, o3 = new Array(t2), n2 = 0; n2 < t2; n2++)
      o3[n2] = arguments[n2];
    o3.filter(Boolean).forEach(function(t3) {
      t3.addEventListener("click", function(t4) {
        return e2.showModal(t4);
      });
    });
  } }, { key: "showModal", value: function() {
    var e2 = this, t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
    if (this.activeElement = document.activeElement, this.modal.setAttribute("aria-hidden", "false"), this.modal.classList.add(this.config.openClass), this.scrollBehaviour("disable"), this.addEventListeners(), this.config.awaitOpenAnimation) {
      var o3 = function t3() {
        e2.modal.removeEventListener("animationend", t3, false), e2.setFocusToFirstNode();
      };
      this.modal.addEventListener("animationend", o3, false);
    } else
      this.setFocusToFirstNode();
    this.config.onShow(this.modal, this.activeElement, t2);
  } }, { key: "closeModal", value: function() {
    var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, t2 = this.modal;
    if (this.modal.setAttribute("aria-hidden", "true"), this.removeEventListeners(), this.scrollBehaviour("enable"), this.activeElement && this.activeElement.focus && this.activeElement.focus(), this.config.onClose(this.modal, this.activeElement, e2), this.config.awaitCloseAnimation) {
      var o3 = this.config.openClass;
      this.modal.addEventListener("animationend", function e3() {
        t2.classList.remove(o3), t2.removeEventListener("animationend", e3, false);
      }, false);
    } else
      t2.classList.remove(this.config.openClass);
  } }, { key: "closeModalById", value: function(e2) {
    this.modal = document.getElementById(e2), this.modal && this.closeModal();
  } }, { key: "scrollBehaviour", value: function(e2) {
    if (this.config.disableScroll) {
      var t2 = document.querySelector("body");
      switch (e2) {
        case "enable":
          Object.assign(t2.style, { overflow: "" });
          break;
        case "disable":
          Object.assign(t2.style, { overflow: "hidden" });
      }
    }
  } }, { key: "addEventListeners", value: function() {
    this.modal.addEventListener("touchstart", this.onClick), this.modal.addEventListener("click", this.onClick), document.addEventListener("keydown", this.onKeydown);
  } }, { key: "removeEventListeners", value: function() {
    this.modal.removeEventListener("touchstart", this.onClick), this.modal.removeEventListener("click", this.onClick), document.removeEventListener("keydown", this.onKeydown);
  } }, { key: "onClick", value: function(e2) {
    (e2.target.hasAttribute(this.config.closeTrigger) || e2.target.parentNode.hasAttribute(this.config.closeTrigger)) && (e2.preventDefault(), e2.stopPropagation(), this.closeModal(e2));
  } }, { key: "onKeydown", value: function(e2) {
    27 === e2.keyCode && this.closeModal(e2), 9 === e2.keyCode && this.retainFocus(e2);
  } }, { key: "getFocusableNodes", value: function() {
    var e2 = this.modal.querySelectorAll(n);
    return Array.apply(void 0, t(e2));
  } }, { key: "setFocusToFirstNode", value: function() {
    var e2 = this;
    if (!this.config.disableFocus) {
      var t2 = this.getFocusableNodes();
      if (0 !== t2.length) {
        var o3 = t2.filter(function(t3) {
          return !t3.hasAttribute(e2.config.closeTrigger);
        });
        o3.length > 0 && o3[0].focus(), 0 === o3.length && t2[0].focus();
      }
    }
  } }, { key: "retainFocus", value: function(e2) {
    var t2 = this.getFocusableNodes();
    if (0 !== t2.length)
      if (t2 = t2.filter(function(e3) {
        return null !== e3.offsetParent;
      }), this.modal.contains(document.activeElement)) {
        var o3 = t2.indexOf(document.activeElement);
        e2.shiftKey && 0 === o3 && (t2[t2.length - 1].focus(), e2.preventDefault()), !e2.shiftKey && t2.length > 0 && o3 === t2.length - 1 && (t2[0].focus(), e2.preventDefault());
      } else
        t2[0].focus();
  } }]) && e(i2.prototype, a2), o2;
}(), a = null, r = function(e2) {
  if (!document.getElementById(e2))
    return console.warn("MicroModal: ❗Seems like you have missed %c'".concat(e2, "'"), "background-color: #f8f9fa;color: #50596c;font-weight: bold;", "ID somewhere in your code. Refer example below to resolve it."), console.warn("%cExample:", "background-color: #f8f9fa;color: #50596c;font-weight: bold;", '<div class="modal" id="'.concat(e2, '"></div>')), false;
}, s = function(e2, t2) {
  if (function(e3) {
    e3.length <= 0 && (console.warn("MicroModal: ❗Please specify at least one %c'micromodal-trigger'", "background-color: #f8f9fa;color: #50596c;font-weight: bold;", "data attribute."), console.warn("%cExample:", "background-color: #f8f9fa;color: #50596c;font-weight: bold;", '<a href="#" data-micromodal-trigger="my-modal"></a>'));
  }(e2), !t2)
    return true;
  for (var o2 in t2)
    r(o2);
  return true;
}, { init: function(e2) {
  var o2 = Object.assign({}, { openTrigger: "data-micromodal-trigger" }, e2), n2 = t(document.querySelectorAll("[".concat(o2.openTrigger, "]"))), r2 = function(e3, t2) {
    var o3 = [];
    return e3.forEach(function(e4) {
      var n3 = e4.attributes[t2].value;
      void 0 === o3[n3] && (o3[n3] = []), o3[n3].push(e4);
    }), o3;
  }(n2, o2.openTrigger);
  if (true !== o2.debugMode || false !== s(n2, r2))
    for (var l2 in r2) {
      var c = r2[l2];
      o2.targetModal = l2, o2.triggers = t(c), a = new i(o2);
    }
}, show: function(e2, t2) {
  var o2 = t2 || {};
  o2.targetModal = e2, true === o2.debugMode && false === r(e2) || (a && a.removeEventListeners(), (a = new i(o2)).showModal());
}, close: function(e2) {
  e2 ? a.closeModalById(e2) : a.closeModal();
} });
"undefined" != typeof window && (window.MicroModal = l);
const _Resizer = class _Resizer {
  /**
   * 
   * @param {Node} container Container to be resize   
   * @param {Node} control Resize handle element 
   * @param {Object} options Defualt can be changed on class
   * @param {Boolean} options.debug Enable non-essential debugging logs
   * @param {Boolean} options.overrideMaxWidth When script is activated by handle remove the elements max-width and allow the width of the resize to exceed the max (default false)
   * @param {Boolean} options.fromLeft The script should assume the handle is on the left side of the element
   */
  constructor(container2, control, options) {
    if (!control || !container2) {
      logError$1(this, "Missing required elements 'control' or 'container'");
    }
    this.options = Object.assign({}, _Resizer.defaults, options);
    this.container = container2;
    this.control = control;
    this.handlerMousedown = this.onMousedown.bind(this);
    this.control.addEventListener("mousedown", this.handlerMousedown);
  }
  destroy() {
    this.control.removeEventListener("mousedown", this.handlerMousedown);
  }
  onMousedown(e2) {
    const { overrideMaxWidth, fromLeft } = this.options;
    const doc = document.documentElement;
    const win = document.defaultView;
    const x = e2.clientX;
    const width = parseInt(win.getComputedStyle(this.container).width, 10);
    if (overrideMaxWidth) {
      this.container.style.maxWidth = "none";
    }
    const mousemove = (event) => {
      const polarity = fromLeft ? -1 : 1;
      this.container.style.width = `${width + (event.clientX - x) * polarity}px`;
    };
    const cleanup = () => {
      doc.removeEventListener("mousemove", mousemove, false);
    };
    doc.addEventListener("mousemove", mousemove, false);
    doc.addEventListener("mouseup", cleanup, { capture: true, once: true });
  }
};
__publicField(_Resizer, "defaults", {
  debug: false,
  overrideMaxWidth: false,
  fromLeft: false
});
let Resizer = _Resizer;
function createElementFromHtml(markup) {
  const doc = new DOMParser().parseFromString(markup, "text/html");
  return doc.body.firstElementChild;
}
const selectors = [
  ".youtube-embedded-video",
  'iframe[title*="YouTube video player"]',
  'iframe[src*="youtube.com/embed"]'
];
function pauseVideos(context = document) {
  const videos = getVideos(context);
  videos.forEach((video) => {
    try {
      video.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', "*");
    } catch (error) {
      console.error(error);
    }
  });
}
function prepVideos(context = document) {
  const videos = getVideos(context);
  videos.forEach((video) => {
    const { src } = video;
    if (src) {
      video.src = src.split("?")[0] + "?rel=0&enablejsapi=1";
    }
  });
}
function getVideos(context) {
  return context.querySelectorAll(selectors.join(", "));
}
const classes = {
  open: "site-modal--open",
  container: "site-modal__container",
  body: "site-modal__body",
  resizer: "site-modal__resizer"
};
const triggerAttr = "data-site-modal-trigger";
const triggerSelector = `[${triggerAttr}]`;
const defaults$1 = {
  allowResize: true,
  position: "center",
  containerClass: "",
  closeSelector: "[data-site-modal-close]"
};
const configMicroModal = {
  openClass: classes.open,
  disableScroll: true,
  openTrigger: "data-site-modal-trigger",
  closeTrigger: "data-NOT-USED",
  // Proxied to avoid this click handler (on keydown, allow click on things underneath)
  onClose: function(modal) {
    pauseVideos(modal);
  }
};
document.querySelectorAll("[data-site-modal]").forEach((element) => setupModal(element));
attachTriggers();
function attachTriggers(context = document) {
  const flag = "data-site-modal-trigger-attached";
  context.querySelectorAll(triggerSelector).forEach((trigger) => {
    if (!trigger.hasAttribute(flag)) {
      const mid = trigger.getAttribute(triggerAttr);
      if (!mid) {
        console.warn("Unable to get modal trigger id");
      } else {
        trigger.setAttribute(flag, "");
        trigger.addEventListener("click", () => {
          show(mid);
        });
      }
    }
  });
}
function setupModal(modal, settings) {
  const id2 = modal.id;
  const originalClasses = modal.getAttribute("class") || "";
  let data = {};
  if (modal.dataset.siteModal) {
    data = JSON.parse(modal.dataset.siteModal);
  }
  data = Object.assign({}, defaults$1, data, settings);
  const { allowResize, position } = data;
  const notCenter = position !== "center";
  const hasResizer = notCenter && allowResize;
  const resizerMarkup = hasResizer ? `<div class="${classes.resizer}"></div>` : "";
  const resizerModifierClass = allowResize ? "resize" : "no-resize";
  const closeAttr = "data-site-modal-close";
  modal.removeAttribute("data-site-modal");
  modal.removeAttribute("id");
  modal.removeAttribute("class");
  const markup = `
    <div 
      class="
        site-modal 
        site-modal--${position} 
        site-modal--${resizerModifierClass} 
        ${data.containerClass}
      " 
      id="${id2}" aria-hidden="true"
    >
      <div class="site-modal__overlay" tabindex="-1" ${closeAttr}>
        <div class="site-modal__container" role="dialog" aria-modal="true" aria-labelledby="${id2}-title">
          <div class="site-modal__header">
            <h2 class="site-modal__title" id="${id2}-title" tabindex="0">${data.title}</h2>
            <button class="site-modal__close" aria-label="Close modal" ${closeAttr}>
              <span class="site-modal__close-icon" aria-hidden="true" ${closeAttr}></span>
            </button>
          </div>
          <div class="${classes.body} ${originalClasses}"></div>
          ${resizerMarkup}
        </div>
      </div>
    </div>`;
  const select = (container2, classKey) => container2.querySelector("." + classes[classKey]);
  const wrapper = createElementFromHtml(markup.trim());
  const elements = {
    body: select(wrapper, "body"),
    resizer: select(wrapper, "resizer"),
    container: select(wrapper, "container")
  };
  elements.body.appendChild(modal);
  if (hasResizer) {
    new Resizer(elements.container, elements.resizer, {
      fromLeft: position === "right"
    });
  }
  prepVideos(wrapper);
  document.body.appendChild(wrapper);
  const closeButtons = wrapper.querySelectorAll(data.closeSelector);
  closeButtons.forEach((b) => b.addEventListener("click", ({ target }) => {
    const outsideContainer = !elements.container.contains(target) && target !== elements.container;
    if (target.matches(`[${closeAttr}]`) || outsideContainer) {
      close(id2);
    }
  }));
}
function show(id2, config2) {
  const merged = Object.assign({}, configMicroModal, config2);
  l.show(id2, merged);
}
function close(id2) {
  l.close(id2);
}
const index$6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attachTriggers,
  close,
  setupModal,
  show,
  triggerAttr
}, Symbol.toStringTag, { value: "Module" }));
function hasRequiredProps(required) {
  return function(object) {
    return required.every((value) => object.hasOwnProperty(value));
  };
}
const requiredElements$1 = [
  "track",
  "controls"
];
const _OverflowScroller = class _OverflowScroller {
  constructor(elements, config2) {
    this.options = Object.assign({}, _OverflowScroller.defaults, config2);
    if (!hasRequiredProps(requiredElements$1)) {
      logError$1(this, "Missing a required Element");
    }
    this.elements = {
      ...elements,
      ...this.createControls(elements.controls)
    };
    this.nextEnabled = true;
    this.previousEnabled = true;
    this.scrollHandler = (e2) => this.onScroll(e2);
    this.elements.track.addEventListener("scroll", this.scrollHandler, { passive: true });
    this.checkOverflow();
    this.onScroll();
  }
  checkOverflow() {
    const { track } = this.elements;
    this.hasOverflow = track.scrollWidth > track.clientWidth;
  }
  createControls(context) {
    const controls = document.createElement("ul");
    const previousItem = document.createElement("li");
    const nextItem = document.createElement("li");
    const previous = this.createControlButton("previous");
    const next = this.createControlButton("next");
    const itemClass = this.getClass("controls-item");
    nextItem.classList.add(itemClass);
    nextItem.classList.add(itemClass + "--next");
    previousItem.classList.add(itemClass);
    previousItem.classList.add(itemClass + "--previous");
    controls.classList.add(this.getClass("controls"));
    previousItem.appendChild(previous);
    nextItem.appendChild(next);
    controls.appendChild(previousItem);
    controls.appendChild(nextItem);
    previous.addEventListener("click", this.previous.bind(this));
    next.addEventListener("click", this.next.bind(this));
    context.appendChild(controls);
    return {
      controls,
      previousItem,
      nextItem,
      previous,
      next
    };
  }
  createControlButton(action) {
    const button = document.createElement("button");
    button.classList.add(this.getClass("control-button"));
    button.classList.add(this.getClass(`control-button--${action}`));
    button.setAttribute("type", "button");
    button.innerHTML = this.getControlContent(action);
    return button;
  }
  getControlContent(action) {
    return `
      <span class="hidden-visually">${action}</span>
      <span aria-hidden="true">${action === "next" ? "→" : "←"}</span>
    `;
  }
  onScroll(event) {
    if (!this.hasOverflow)
      return;
    this.onScrollHorizontal();
  }
  onScrollHorizontal() {
    const { nextEnabled, previousEnabled } = this;
    const { track } = this.elements;
    const { offsetStart, offsetEnd } = this.options;
    const { scrollWidth, clientWidth, scrollLeft } = track;
    const atStart = scrollLeft <= offsetStart;
    const atEnd = scrollWidth - scrollLeft - offsetEnd <= clientWidth;
    if (atStart && previousEnabled) {
      this.setControlState("previous", false);
    } else if (!atStart && !previousEnabled) {
      this.setControlState("previous", true);
    }
    if (atEnd && nextEnabled) {
      this.setControlState("next", false);
    } else if (!atEnd && !nextEnabled) {
      this.setControlState("next", true);
    }
  }
  setControlState(dir, enabled) {
    const isNext = dir === "next";
    const { next, nextItem, previous, previousItem } = this.elements;
    const item = isNext ? nextItem : previousItem;
    const button = isNext ? next : previous;
    const classlistMethod = enabled ? "remove" : "add";
    item.classList[classlistMethod](this.getClass("controls-item--disabled"));
    button.classList[enabled ? "remove" : "add"](this.getClass("control--disabled"));
    if (enabled) {
      button.removeAttribute("disabled");
    } else {
      button.setAttribute("disabled", "");
    }
    this[isNext ? "nextEnabled" : "previousEnabled"] = enabled;
  }
  resolveAmount(dir) {
    const isNext = dir === "next";
    const { amount } = this.options;
    const { scrollLeft, offsetWidth } = this.elements.track;
    if (amount === "auto") {
      return isNext ? scrollLeft + offsetWidth : scrollLeft - offsetWidth;
    } else if (typeof amount === "function") {
      return amount(this, dir);
    } else if (typeof amount === "number") {
      return isNext ? scrollLeft + amount : scrollLeft - amount;
    }
    logError$1("Unable to resolve amount for scroll");
    return 500;
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
  getClass(child) {
    const { namespace } = this.options;
    return `${namespace}__${child}`;
  }
};
__publicField(_OverflowScroller, "instances", []);
__publicField(_OverflowScroller, "defaults", {
  namespace: "OverflowScroller",
  events: {},
  horizontal: true,
  offsetStart: 100,
  offsetEnd: 100,
  amount: "auto"
});
let OverflowScroller = _OverflowScroller;
function createPager() {
  return function pager(instance, dir) {
    const isNext = dir === "next";
    const { track } = instance.elements;
    if (!track.children)
      return 400;
    const trackStyle = window.getComputedStyle(track);
    const scrollPaddingRaw = trackStyle.getPropertyValue("scroll-padding-left").replace("auto", "0px");
    const scrollPadding = parseInt(scrollPaddingRaw, 10);
    const { scrollLeft, offsetWidth } = track;
    const right = scrollLeft + offsetWidth;
    const slides = [...track.children].map((element) => {
      const { offsetLeft, offsetWidth: offsetWidth2 } = element;
      return {
        element,
        offsetLeft,
        offsetRight: offsetLeft + offsetWidth2
      };
    });
    let slideFound;
    if (isNext) {
      slideFound = slides.find((slide) => slide.offsetRight >= right);
    } else {
      let slideBeforeIndex = slides.findLastIndex((slide) => slide.offsetLeft <= scrollLeft);
      if (slideBeforeIndex) {
        let slideBefore = slides[slideBeforeIndex];
        let slidesBefore = slides.slice(0, slideBeforeIndex + 1);
        slideFound = slidesBefore.find((slide) => {
          const rightEdge = slide.offsetLeft + scrollPadding + offsetWidth;
          return rightEdge >= slideBefore.offsetRight;
        });
      }
    }
    if (slideFound) {
      return isNext ? slideFound.offsetLeft : slideFound.offsetLeft + scrollPadding;
    } else {
      return 400;
    }
  };
}
const index$5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OverflowScroller,
  createPager
}, Symbol.toStringTag, { value: "Module" }));
const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = (v) => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
const oppositeAlignmentMap = {
  start: "end",
  end: "start"
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl)
        return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
const computePosition$1 = async (reference, floating, config2) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config2;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i2 = 0; i2 < validMiddleware.length; i2++) {
    const {
      name,
      fn
    } = validMiddleware[i2];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i2 = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
const arrow$1 = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset2 = clamp(min$1, center, max2);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset2 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset2,
        centerOffset: center - offset2 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
const flip$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== "none") {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides[0]], overflow[sides[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a2, b) => a2.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$map$so;
              const placement2 = (_overflowsData$map$so = overflowsData.map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a2, b) => a2[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
function getBoundingRect(rects) {
  const minX = min(...rects.map((rect) => rect.left));
  const minY = min(...rects.map((rect) => rect.top));
  const maxX = max(...rects.map((rect) => rect.right));
  const maxY = max(...rects.map((rect) => rect.bottom));
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}
function getRectsByLine(rects) {
  const sortedRects = rects.slice().sort((a2, b) => a2.y - b.y);
  const groups = [];
  let prevRect = null;
  for (let i2 = 0; i2 < sortedRects.length; i2++) {
    const rect = sortedRects[i2];
    if (!prevRect || rect.y - prevRect.y > prevRect.height / 2) {
      groups.push([rect]);
    } else {
      groups[groups.length - 1].push(rect);
    }
    prevRect = rect;
  }
  return groups.map((rect) => rectToClientRect(getBoundingRect(rect)));
}
const inline$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "inline",
    options,
    async fn(state) {
      const {
        placement,
        elements,
        rects,
        platform: platform2,
        strategy
      } = state;
      const {
        padding = 2,
        x,
        y
      } = evaluate(options, state);
      const nativeClientRects = Array.from(await (platform2.getClientRects == null ? void 0 : platform2.getClientRects(elements.reference)) || []);
      const clientRects = getRectsByLine(nativeClientRects);
      const fallback = rectToClientRect(getBoundingRect(nativeClientRects));
      const paddingObject = getPaddingObject(padding);
      function getBoundingClientRect2() {
        if (clientRects.length === 2 && clientRects[0].left > clientRects[1].right && x != null && y != null) {
          return clientRects.find((rect) => x > rect.left - paddingObject.left && x < rect.right + paddingObject.right && y > rect.top - paddingObject.top && y < rect.bottom + paddingObject.bottom) || fallback;
        }
        if (clientRects.length >= 2) {
          if (getSideAxis(placement) === "y") {
            const firstRect = clientRects[0];
            const lastRect = clientRects[clientRects.length - 1];
            const isTop = getSide(placement) === "top";
            const top2 = firstRect.top;
            const bottom2 = lastRect.bottom;
            const left2 = isTop ? firstRect.left : lastRect.left;
            const right2 = isTop ? firstRect.right : lastRect.right;
            const width2 = right2 - left2;
            const height2 = bottom2 - top2;
            return {
              top: top2,
              bottom: bottom2,
              left: left2,
              right: right2,
              width: width2,
              height: height2,
              x: left2,
              y: top2
            };
          }
          const isLeftSide = getSide(placement) === "left";
          const maxRight = max(...clientRects.map((rect) => rect.right));
          const minLeft = min(...clientRects.map((rect) => rect.left));
          const measureRects = clientRects.filter((rect) => isLeftSide ? rect.left === minLeft : rect.right === maxRight);
          const top = measureRects[0].top;
          const bottom = measureRects[measureRects.length - 1].bottom;
          const left = minLeft;
          const right = maxRight;
          const width = right - left;
          const height = bottom - top;
          return {
            top,
            bottom,
            left,
            right,
            width,
            height,
            x: left,
            y: top
          };
        }
        return fallback;
      }
      const resetRects = await platform2.getElementRects({
        reference: {
          getBoundingClientRect: getBoundingClientRect2
        },
        floating: elements.floating,
        strategy
      });
      if (rects.reference.x !== resetRects.reference.x || rects.reference.y !== resetRects.reference.y || rects.reference.width !== resetRects.reference.width || rects.reference.height !== resetRects.reference.height) {
        return {
          reset: {
            rects: resetRects
          }
        };
      }
      return {};
    }
  };
};
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
const offset$1 = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
const shift$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x,
        y,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y2
            } = _ref;
            return {
              x: x2,
              y: y2
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y
        }
      };
    }
  };
};
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow$1(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  return value instanceof Node || value instanceof getWindow$1(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow$1(value).Element;
}
function isHTMLElement(value) {
  return value instanceof HTMLElement || value instanceof getWindow$1(value).HTMLElement;
}
function isShadowRoot(value) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow$1(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isContainingBlock(element) {
  const webkit = isWebKit();
  const css = getComputedStyle$1(element);
  return css.transform !== "none" || css.perspective !== "none" || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || ["transform", "perspective", "filter"].some((value) => (css.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports)
    return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle$1(element) {
  return getWindow$1(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow$1(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], win.frameElement && traverseIframes ? getOverflowAncestors(win.frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getCssDimensions(element) {
  const css = getComputedStyle$1(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
const noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow$1(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow$1(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow$1(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow$1(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = currentWin.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle$1(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow$1(currentIFrame);
      currentIFrame = currentWin.frameElement;
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
const topLayerSelectors = [":popover-open", ":modal"];
function isTopLayer(element) {
  return topLayerSelectors.some((selector) => {
    try {
      return element.matches(selector);
    } catch (e2) {
      return false;
    }
  });
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow$1(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle$1(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const x = rect.left + scroll.scrollLeft - offsets.x;
  const y = rect.top + scroll.scrollTop - offsets.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle$1(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow$1(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
const getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle$1(element).direction === "rtl";
}
const platform$2 = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e2) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
const offset = offset$1;
const shift = shift$1;
const flip = flip$1;
const arrow = arrow$1;
const inline = inline$1;
const computePosition = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform: platform$2,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};
const defaults = {
  placement: "bottom",
  inline: false,
  offset: {
    mainAxis: 16
  },
  shift: true,
  flip: true,
  arrow: true
  // Options for arrow (not element)
};
function createFloatingUi(elements, config2) {
  const options = Object.assign({}, defaults, config2);
  const { trigger, content, contentArrow } = elements;
  const middleware = [
    ...addPlugin(inline, options.inline),
    ...addPlugin(offset, options.offset),
    ...addPlugin(flip, options.flip),
    ...addPlugin(shift, options.shift),
    ...addPlugin(arrow, options.arrow, { element: contentArrow })
  ];
  return autoUpdate(trigger, content, () => {
    computePosition(trigger, content, {
      placement: options.placement,
      middleware
    }).then((data) => {
      const { x, y, middlewareData, placement } = data;
      const arrowPos = middlewareData.arrow;
      Object.assign(content.style, {
        left: `${x}px`,
        top: `${y}px`
      });
      content.setAttribute("data-placement", placement);
      if (arrowPos) {
        Object.assign(contentArrow.style, {
          // position: "absolute",
          left: (arrowPos == null ? void 0 : arrowPos.x) != null ? `${arrowPos.x}px` : "",
          top: (arrowPos == null ? void 0 : arrowPos.y) != null ? `${arrowPos.y}px` : ""
        });
      }
    });
  });
}
function addPlugin(plugin, option, overrides = {}) {
  if (!option) {
    return [];
  } else if (typeof option === "object") {
    return [plugin({ ...option, ...overrides })];
  } else {
    return [plugin(overrides)];
  }
}
class Popover extends Collapsible {
  constructor(elements, config2, floatingOptions) {
    super(elements, config2);
    this.floatingOptions = floatingOptions;
  }
  setState(isOpen, event) {
    super.setState(isOpen, event);
    this.destroyFloatingUi();
    if (isOpen) {
      this.createFloatingUi();
    }
  }
  destroy() {
    super.destroy();
    this.destroyFloatingUi();
  }
  createFloatingUi() {
    this.floatingCleanup = createFloatingUi(this.elements, this.floatingOptions);
  }
  destroyFloatingUi() {
    if (this.floatingCleanup) {
      this.floatingCleanup();
      this.floatingCleanup = null;
    }
  }
}
const instances$1 = /* @__PURE__ */ new WeakMap();
const logError = (...msgs) => console.error("@ulu (popovers):", ...msgs);
const attrs = {
  trigger: "data-ulu-popover-trigger",
  content: "data-ulu-popover-content",
  arrow: "data-ulu-popover-arrow"
};
const attrSelector = (key2) => `[${attrs[key2]}]`;
function init$2() {
  document.addEventListener(getName$1("pageModified"), setup$1);
  setup$1();
}
function setup$1() {
  const triggers = document.querySelectorAll(attrSelector("trigger"));
  const resolved = Array.from(triggers).filter((trigger) => !instances$1.has(trigger)).map(resolve).filter((v) => v);
  resolved.forEach(({ elements, options, floatingOptions }) => {
    instances$1.set(elements.trigger, new Popover(elements, options, floatingOptions));
  });
}
function resolve(trigger) {
  const raw = trigger.dataset.uluPopoverTrigger;
  const options = (raw == null ? void 0 : raw.length) ? JSON.parse(raw) : {};
  const content = getContentByTrigger(trigger);
  const elements = {
    trigger,
    content,
    contentArrow: content.querySelector(attrSelector("arrow"))
  };
  const floatingOptions = options.floating || {};
  delete options.floating;
  if (content) {
    return { elements, options, floatingOptions };
  } else {
    logError("Unable to make popover for", trigger);
    return false;
  }
}
function getContentByTrigger(trigger) {
  var _a;
  let content;
  const ariaControls = trigger.getAttribute("aria-controls");
  if (ariaControls) {
    content = document.getElementById(ariaControls);
  } else if ((_a = trigger == null ? void 0 : trigger.nextElementSibling) == null ? void 0 : _a.hasAttribute(attrs.content)) {
    content = trigger.nextElementSibling;
  } else {
    const children = Array.from(trigger.parentNode.children);
    const triggerIndex = children.findIndex((c) => c === trigger);
    const childrenAfter = children.slice(triggerIndex);
    content = childrenAfter.find((child) => child.matches(attrSelector("content")));
  }
  if (!content) {
    logError("Unable to resolve 'content' element for popover", trigger);
  }
  return content;
}
const index$4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Popover,
  init: init$2,
  setup: setup$1
}, Symbol.toStringTag, { value: "Module" }));
const index$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Resizer
}, Symbol.toStringTag, { value: "Module" }));
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var _maintain = { exports: {} };
var disabled$2 = { exports: {} };
var nodeArray = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function(input) {
    if (!input) {
      return [];
    }
    if (Array.isArray(input)) {
      return input;
    }
    if (input.nodeType !== void 0) {
      return [input];
    }
    if (typeof input === "string") {
      input = document.querySelectorAll(input);
    }
    if (input.length !== void 0) {
      return [].slice.call(input, 0);
    }
    throw new TypeError("unexpected input " + String(input));
  };
  module.exports = exports["default"];
})(nodeArray, nodeArray.exports);
var nodeArrayExports = nodeArray.exports;
var focusable$2 = { exports: {} };
var contextToElement = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function(_ref) {
    var context = _ref.context, _ref$label = _ref.label, label = _ref$label === void 0 ? "context-to-element" : _ref$label, resolveDocument = _ref.resolveDocument, defaultToDocument = _ref.defaultToDocument;
    var element = (0, _nodeArray2.default)(context)[0];
    if (resolveDocument && element && element.nodeType === Node.DOCUMENT_NODE) {
      element = element.documentElement;
    }
    if (!element && defaultToDocument) {
      return document.documentElement;
    }
    if (!element) {
      throw new TypeError(label + " requires valid options.context");
    }
    if (element.nodeType !== Node.ELEMENT_NODE && element.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
      throw new TypeError(label + " requires options.context to be an Element");
    }
    return element;
  };
  var _nodeArray = nodeArrayExports;
  var _nodeArray2 = _interopRequireDefault2(_nodeArray);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  module.exports = exports["default"];
})(contextToElement, contextToElement.exports);
var contextToElementExports = contextToElement.exports;
var focusable_strict = { exports: {} };
var focusable$1 = { exports: {} };
var focusRelevant = { exports: {} };
var parents = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function() {
    var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, context = _ref.context;
    var list = [];
    var element = (0, _contextToElement2.default)({
      label: "get/parents",
      context
    });
    while (element) {
      list.push(element);
      element = element.parentNode;
      if (element && element.nodeType !== Node.ELEMENT_NODE) {
        element = null;
      }
    }
    return list;
  };
  var _contextToElement = contextToElementExports;
  var _contextToElement2 = _interopRequireDefault2(_contextToElement);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  module.exports = exports["default"];
})(parents, parents.exports);
var parentsExports = parents.exports;
var elementMatches = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = elementMatches2;
  var names = ["matches", "webkitMatchesSelector", "mozMatchesSelector", "msMatchesSelector"];
  var name = null;
  function findMethodName(element) {
    names.some(function(_name) {
      if (!element[_name]) {
        return false;
      }
      name = _name;
      return true;
    });
  }
  function elementMatches2(element, selector) {
    if (!name) {
      findMethodName(element);
    }
    return element[name](selector);
  }
  module.exports = exports["default"];
})(elementMatches, elementMatches.exports);
var elementMatchesExports = elementMatches.exports;
var tabindexValue = { exports: {} };
var validTabindex = { exports: {} };
var supports = { exports: {} };
var detectFocus = { exports: {} };
var platform$1 = { exports: {} };
var platform = { exports: {} };
/*!
 * Platform.js <https://mths.be/platform>
 * Copyright 2014-2016 Benjamin Tan <https://demoneaux.github.io/>
 * Copyright 2011-2013 John-David Dalton <http://allyoucanleet.com/>
 * Available under MIT license <https://mths.be/mit>
 */
platform.exports;
(function(module, exports) {
  (function() {
    var objectTypes = {
      "function": true,
      "object": true
    };
    var root = objectTypes[typeof window] && window || this;
    var oldRoot = root;
    var freeExports = exports;
    var freeModule = module && !module.nodeType && module;
    var freeGlobal = freeExports && freeModule && typeof commonjsGlobal == "object" && commonjsGlobal;
    if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
      root = freeGlobal;
    }
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var reOpera = /\bOpera/;
    var thisBinding = this;
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var toString = objectProto.toString;
    function capitalize(string) {
      string = String(string);
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function cleanupOS(os, pattern, label) {
      var data = {
        "10.0": "10",
        "6.4": "10 Technical Preview",
        "6.3": "8.1",
        "6.2": "8",
        "6.1": "Server 2008 R2 / 7",
        "6.0": "Server 2008 / Vista",
        "5.2": "Server 2003 / XP 64-bit",
        "5.1": "XP",
        "5.01": "2000 SP1",
        "5.0": "2000",
        "4.0": "NT",
        "4.90": "ME"
      };
      if (pattern && label && /^Win/i.test(os) && !/^Windows Phone /i.test(os) && (data = data[/[\d.]+$/.exec(os)])) {
        os = "Windows " + data;
      }
      os = String(os);
      if (pattern && label) {
        os = os.replace(RegExp(pattern, "i"), label);
      }
      os = format(
        os.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0]
      );
      return os;
    }
    function each(object, callback) {
      var index2 = -1, length = object ? object.length : 0;
      if (typeof length == "number" && length > -1 && length <= maxSafeInteger) {
        while (++index2 < length) {
          callback(object[index2], index2, object);
        }
      } else {
        forOwn(object, callback);
      }
    }
    function format(string) {
      string = trim(string);
      return /^(?:webOS|i(?:OS|P))/.test(string) ? string : capitalize(string);
    }
    function forOwn(object, callback) {
      for (var key2 in object) {
        if (hasOwnProperty.call(object, key2)) {
          callback(object[key2], key2, object);
        }
      }
    }
    function getClassOf(value) {
      return value == null ? capitalize(value) : toString.call(value).slice(8, -1);
    }
    function isHostType(object, property) {
      var type = object != null ? typeof object[property] : "number";
      return !/^(?:boolean|number|string|undefined)$/.test(type) && (type == "object" ? !!object[property] : true);
    }
    function qualify(string) {
      return String(string).replace(/([ -])(?!$)/g, "$1?");
    }
    function reduce(array, callback) {
      var accumulator = null;
      each(array, function(value, index2) {
        accumulator = callback(accumulator, value, index2, array);
      });
      return accumulator;
    }
    function trim(string) {
      return String(string).replace(/^ +| +$/g, "");
    }
    function parse(ua) {
      var context = root;
      var isCustomContext = ua && typeof ua == "object" && getClassOf(ua) != "String";
      if (isCustomContext) {
        context = ua;
        ua = null;
      }
      var nav = context.navigator || {};
      var userAgent = nav.userAgent || "";
      ua || (ua = userAgent);
      var isModuleScope = isCustomContext || thisBinding == oldRoot;
      var likeChrome = isCustomContext ? !!nav.likeChrome : /\bChrome\b/.test(ua) && !/internal|\n/i.test(toString.toString());
      var objectClass = "Object", airRuntimeClass = isCustomContext ? objectClass : "ScriptBridgingProxyObject", enviroClass = isCustomContext ? objectClass : "Environment", javaClass = isCustomContext && context.java ? "JavaPackage" : getClassOf(context.java), phantomClass = isCustomContext ? objectClass : "RuntimeObject";
      var java = /\bJava/.test(javaClass) && context.java;
      var rhino = java && getClassOf(context.environment) == enviroClass;
      var alpha = java ? "a" : "α";
      var beta = java ? "b" : "β";
      var doc = context.document || {};
      var opera = context.operamini || context.opera;
      var operaClass = reOpera.test(operaClass = isCustomContext && opera ? opera["[[Class]]"] : getClassOf(opera)) ? operaClass : opera = null;
      var data;
      var arch = ua;
      var description = [];
      var prerelease = null;
      var useFeatures = ua == userAgent;
      var version2 = useFeatures && opera && typeof opera.version == "function" && opera.version();
      var isSpecialCasedOS;
      var layout = getLayout([
        { "label": "EdgeHTML", "pattern": "Edge" },
        "Trident",
        { "label": "WebKit", "pattern": "AppleWebKit" },
        "iCab",
        "Presto",
        "NetFront",
        "Tasman",
        "KHTML",
        "Gecko"
      ]);
      var name = getName2([
        "Adobe AIR",
        "Arora",
        "Avant Browser",
        "Breach",
        "Camino",
        "Epiphany",
        "Fennec",
        "Flock",
        "Galeon",
        "GreenBrowser",
        "iCab",
        "Iceweasel",
        "K-Meleon",
        "Konqueror",
        "Lunascape",
        "Maxthon",
        { "label": "Microsoft Edge", "pattern": "Edge" },
        "Midori",
        "Nook Browser",
        "PaleMoon",
        "PhantomJS",
        "Raven",
        "Rekonq",
        "RockMelt",
        "SeaMonkey",
        { "label": "Silk", "pattern": "(?:Cloud9|Silk-Accelerated)" },
        "Sleipnir",
        "SlimBrowser",
        { "label": "SRWare Iron", "pattern": "Iron" },
        "Sunrise",
        "Swiftfox",
        "WebPositive",
        "Opera Mini",
        { "label": "Opera Mini", "pattern": "OPiOS" },
        "Opera",
        { "label": "Opera", "pattern": "OPR" },
        "Chrome",
        { "label": "Chrome Mobile", "pattern": "(?:CriOS|CrMo)" },
        { "label": "Firefox", "pattern": "(?:Firefox|Minefield)" },
        { "label": "Firefox for iOS", "pattern": "FxiOS" },
        { "label": "IE", "pattern": "IEMobile" },
        { "label": "IE", "pattern": "MSIE" },
        "Safari"
      ]);
      var product = getProduct([
        { "label": "BlackBerry", "pattern": "BB10" },
        "BlackBerry",
        { "label": "Galaxy S", "pattern": "GT-I9000" },
        { "label": "Galaxy S2", "pattern": "GT-I9100" },
        { "label": "Galaxy S3", "pattern": "GT-I9300" },
        { "label": "Galaxy S4", "pattern": "GT-I9500" },
        "Google TV",
        "Lumia",
        "iPad",
        "iPod",
        "iPhone",
        "Kindle",
        { "label": "Kindle Fire", "pattern": "(?:Cloud9|Silk-Accelerated)" },
        "Nexus",
        "Nook",
        "PlayBook",
        "PlayStation 3",
        "PlayStation 4",
        "PlayStation Vita",
        "TouchPad",
        "Transformer",
        { "label": "Wii U", "pattern": "WiiU" },
        "Wii",
        "Xbox One",
        { "label": "Xbox 360", "pattern": "Xbox" },
        "Xoom"
      ]);
      var manufacturer = getManufacturer({
        "Apple": { "iPad": 1, "iPhone": 1, "iPod": 1 },
        "Archos": {},
        "Amazon": { "Kindle": 1, "Kindle Fire": 1 },
        "Asus": { "Transformer": 1 },
        "Barnes & Noble": { "Nook": 1 },
        "BlackBerry": { "PlayBook": 1 },
        "Google": { "Google TV": 1, "Nexus": 1 },
        "HP": { "TouchPad": 1 },
        "HTC": {},
        "LG": {},
        "Microsoft": { "Xbox": 1, "Xbox One": 1 },
        "Motorola": { "Xoom": 1 },
        "Nintendo": { "Wii U": 1, "Wii": 1 },
        "Nokia": { "Lumia": 1 },
        "Samsung": { "Galaxy S": 1, "Galaxy S2": 1, "Galaxy S3": 1, "Galaxy S4": 1 },
        "Sony": { "PlayStation 4": 1, "PlayStation 3": 1, "PlayStation Vita": 1 }
      });
      var os = getOS([
        "Windows Phone",
        "Android",
        "CentOS",
        { "label": "Chrome OS", "pattern": "CrOS" },
        "Debian",
        "Fedora",
        "FreeBSD",
        "Gentoo",
        "Haiku",
        "Kubuntu",
        "Linux Mint",
        "OpenBSD",
        "Red Hat",
        "SuSE",
        "Ubuntu",
        "Xubuntu",
        "Cygwin",
        "Symbian OS",
        "hpwOS",
        "webOS ",
        "webOS",
        "Tablet OS",
        "Linux",
        "Mac OS X",
        "Macintosh",
        "Mac",
        "Windows 98;",
        "Windows "
      ]);
      function getLayout(guesses) {
        return reduce(guesses, function(result, guess) {
          return result || RegExp("\\b" + (guess.pattern || qualify(guess)) + "\\b", "i").exec(ua) && (guess.label || guess);
        });
      }
      function getManufacturer(guesses) {
        return reduce(guesses, function(result, value, key2) {
          return result || (value[product] || value[/^[a-z]+(?: +[a-z]+\b)*/i.exec(product)] || RegExp("\\b" + qualify(key2) + "(?:\\b|\\w*\\d)", "i").exec(ua)) && key2;
        });
      }
      function getName2(guesses) {
        return reduce(guesses, function(result, guess) {
          return result || RegExp("\\b" + (guess.pattern || qualify(guess)) + "\\b", "i").exec(ua) && (guess.label || guess);
        });
      }
      function getOS(guesses) {
        return reduce(guesses, function(result, guess) {
          var pattern = guess.pattern || qualify(guess);
          if (!result && (result = RegExp("\\b" + pattern + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(ua))) {
            result = cleanupOS(result, pattern, guess.label || guess);
          }
          return result;
        });
      }
      function getProduct(guesses) {
        return reduce(guesses, function(result, guess) {
          var pattern = guess.pattern || qualify(guess);
          if (!result && (result = RegExp("\\b" + pattern + " *\\d+[.\\w_]*", "i").exec(ua) || RegExp("\\b" + pattern + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(ua))) {
            if ((result = String(guess.label && !RegExp(pattern, "i").test(guess.label) ? guess.label : result).split("/"))[1] && !/[\d.]+/.test(result[0])) {
              result[0] += " " + result[1];
            }
            guess = guess.label || guess;
            result = format(result[0].replace(RegExp(pattern, "i"), guess).replace(RegExp("; *(?:" + guess + "[_-])?", "i"), " ").replace(RegExp("(" + guess + ")[-_.]?(\\w)", "i"), "$1 $2"));
          }
          return result;
        });
      }
      function getVersion(patterns) {
        return reduce(patterns, function(result, pattern) {
          return result || (RegExp(pattern + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(ua) || 0)[1] || null;
        });
      }
      function toStringPlatform() {
        return this.description || "";
      }
      layout && (layout = [layout]);
      if (manufacturer && !product) {
        product = getProduct([manufacturer]);
      }
      if (data = /\bGoogle TV\b/.exec(product)) {
        product = data[0];
      }
      if (/\bSimulator\b/i.test(ua)) {
        product = (product ? product + " " : "") + "Simulator";
      }
      if (name == "Opera Mini" && /\bOPiOS\b/.test(ua)) {
        description.push("running in Turbo/Uncompressed mode");
      }
      if (name == "IE" && /\blike iPhone OS\b/.test(ua)) {
        data = parse(ua.replace(/like iPhone OS/, ""));
        manufacturer = data.manufacturer;
        product = data.product;
      } else if (/^iP/.test(product)) {
        name || (name = "Safari");
        os = "iOS" + ((data = / OS ([\d_]+)/i.exec(ua)) ? " " + data[1].replace(/_/g, ".") : "");
      } else if (name == "Konqueror" && !/buntu/i.test(os)) {
        os = "Kubuntu";
      } else if (manufacturer && manufacturer != "Google" && (/Chrome/.test(name) && !/\bMobile Safari\b/i.test(ua) || /\bVita\b/.test(product)) || /\bAndroid\b/.test(os) && /^Chrome/.test(name) && /\bVersion\//i.test(ua)) {
        name = "Android Browser";
        os = /\bAndroid\b/.test(os) ? os : "Android";
      } else if (name == "Silk") {
        if (!/\bMobi/i.test(ua)) {
          os = "Android";
          description.unshift("desktop mode");
        }
        if (/Accelerated *= *true/i.test(ua)) {
          description.unshift("accelerated");
        }
      } else if (name == "PaleMoon" && (data = /\bFirefox\/([\d.]+)\b/.exec(ua))) {
        description.push("identifying as Firefox " + data[1]);
      } else if (name == "Firefox" && (data = /\b(Mobile|Tablet|TV)\b/i.exec(ua))) {
        os || (os = "Firefox OS");
        product || (product = data[1]);
      } else if (!name || (data = !/\bMinefield\b/i.test(ua) && /\b(?:Firefox|Safari)\b/.exec(name))) {
        if (name && !product && /[\/,]|^[^(]+?\)/.test(ua.slice(ua.indexOf(data + "/") + 8))) {
          name = null;
        }
        if ((data = product || manufacturer || os) && (product || manufacturer || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(os))) {
          name = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(os) ? os : data) + " Browser";
        }
      }
      if (!version2) {
        version2 = getVersion([
          "(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|Silk(?!/[\\d.]+$))",
          "Version",
          qualify(name),
          "(?:Firefox|Minefield|NetFront)"
        ]);
      }
      if (data = layout == "iCab" && parseFloat(version2) > 3 && "WebKit" || /\bOpera\b/.test(name) && (/\bOPR\b/.test(ua) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(ua) && !/^(?:Trident|EdgeHTML)$/.test(layout) && "WebKit" || !layout && /\bMSIE\b/i.test(ua) && (os == "Mac OS" ? "Tasman" : "Trident") || layout == "WebKit" && /\bPlayStation\b(?! Vita\b)/i.test(name) && "NetFront") {
        layout = [data];
      }
      if (name == "IE" && (data = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(ua) || 0)[1])) {
        name += " Mobile";
        os = "Windows Phone " + (/\+$/.test(data) ? data : data + ".x");
        description.unshift("desktop mode");
      } else if (/\bWPDesktop\b/i.test(ua)) {
        name = "IE Mobile";
        os = "Windows Phone 8.x";
        description.unshift("desktop mode");
        version2 || (version2 = (/\brv:([\d.]+)/.exec(ua) || 0)[1]);
      } else if (name != "IE" && layout == "Trident" && (data = /\brv:([\d.]+)/.exec(ua))) {
        if (name) {
          description.push("identifying as " + name + (version2 ? " " + version2 : ""));
        }
        name = "IE";
        version2 = data[1];
      }
      if (useFeatures) {
        if (isHostType(context, "global")) {
          if (java) {
            data = java.lang.System;
            arch = data.getProperty("os.arch");
            os = os || data.getProperty("os.name") + " " + data.getProperty("os.version");
          }
          if (isModuleScope && isHostType(context, "system") && (data = [context.system])[0]) {
            os || (os = data[0].os || null);
            try {
              data[1] = context.require("ringo/engine").version;
              version2 = data[1].join(".");
              name = "RingoJS";
            } catch (e2) {
              if (data[0].global.system == context.system) {
                name = "Narwhal";
              }
            }
          } else if (typeof context.process == "object" && !context.process.browser && (data = context.process)) {
            name = "Node.js";
            arch = data.arch;
            os = data.platform;
            version2 = /[\d.]+/.exec(data.version)[0];
          } else if (rhino) {
            name = "Rhino";
          }
        } else if (getClassOf(data = context.runtime) == airRuntimeClass) {
          name = "Adobe AIR";
          os = data.flash.system.Capabilities.os;
        } else if (getClassOf(data = context.phantom) == phantomClass) {
          name = "PhantomJS";
          version2 = (data = data.version || null) && data.major + "." + data.minor + "." + data.patch;
        } else if (typeof doc.documentMode == "number" && (data = /\bTrident\/(\d+)/i.exec(ua))) {
          version2 = [version2, doc.documentMode];
          if ((data = +data[1] + 4) != version2[1]) {
            description.push("IE " + version2[1] + " mode");
            layout && (layout[1] = "");
            version2[1] = data;
          }
          version2 = name == "IE" ? String(version2[1].toFixed(1)) : version2[0];
        }
        os = os && format(os);
      }
      if (version2 && (data = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(version2) || /(?:alpha|beta)(?: ?\d)?/i.exec(ua + ";" + (useFeatures && nav.appMinorVersion)) || /\bMinefield\b/i.test(ua) && "a")) {
        prerelease = /b/i.test(data) ? "beta" : "alpha";
        version2 = version2.replace(RegExp(data + "\\+?$"), "") + (prerelease == "beta" ? beta : alpha) + (/\d+\+?/.exec(data) || "");
      }
      if (name == "Fennec" || name == "Firefox" && /\b(?:Android|Firefox OS)\b/.test(os)) {
        name = "Firefox Mobile";
      } else if (name == "Maxthon" && version2) {
        version2 = version2.replace(/\.[\d.]+/, ".x");
      } else if (/\bXbox\b/i.test(product)) {
        os = null;
        if (product == "Xbox 360" && /\bIEMobile\b/.test(ua)) {
          description.unshift("mobile mode");
        }
      } else if ((/^(?:Chrome|IE|Opera)$/.test(name) || name && !product && !/Browser|Mobi/.test(name)) && (os == "Windows CE" || /Mobi/i.test(ua))) {
        name += " Mobile";
      } else if (name == "IE" && useFeatures && context.external === null) {
        description.unshift("platform preview");
      } else if ((/\bBlackBerry\b/.test(product) || /\bBB10\b/.test(ua)) && (data = (RegExp(product.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(ua) || 0)[1] || version2)) {
        data = [data, /BB10/.test(ua)];
        os = (data[1] ? (product = null, manufacturer = "BlackBerry") : "Device Software") + " " + data[0];
        version2 = null;
      } else if (this != forOwn && product != "Wii" && (useFeatures && opera || /Opera/.test(name) && /\b(?:MSIE|Firefox)\b/i.test(ua) || name == "Firefox" && /\bOS X (?:\d+\.){2,}/.test(os) || name == "IE" && (os && !/^Win/.test(os) && version2 > 5.5 || /\bWindows XP\b/.test(os) && version2 > 8 || version2 == 8 && !/\bTrident\b/.test(ua))) && !reOpera.test(data = parse.call(forOwn, ua.replace(reOpera, "") + ";")) && data.name) {
        data = "ing as " + data.name + ((data = data.version) ? " " + data : "");
        if (reOpera.test(name)) {
          if (/\bIE\b/.test(data) && os == "Mac OS") {
            os = null;
          }
          data = "identify" + data;
        } else {
          data = "mask" + data;
          if (operaClass) {
            name = format(operaClass.replace(/([a-z])([A-Z])/g, "$1 $2"));
          } else {
            name = "Opera";
          }
          if (/\bIE\b/.test(data)) {
            os = null;
          }
          if (!useFeatures) {
            version2 = null;
          }
        }
        layout = ["Presto"];
        description.push(data);
      }
      if (data = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(ua) || 0)[1]) {
        data = [parseFloat(data.replace(/\.(\d)$/, ".0$1")), data];
        if (name == "Safari" && data[1].slice(-1) == "+") {
          name = "WebKit Nightly";
          prerelease = "alpha";
          version2 = data[1].slice(0, -1);
        } else if (version2 == data[1] || version2 == (data[2] = (/\bSafari\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
          version2 = null;
        }
        data[1] = (/\bChrome\/([\d.]+)/i.exec(ua) || 0)[1];
        if (data[0] == 537.36 && data[2] == 537.36 && parseFloat(data[1]) >= 28 && layout == "WebKit") {
          layout = ["Blink"];
        }
        if (!useFeatures || !likeChrome && !data[1]) {
          layout && (layout[1] = "like Safari");
          data = (data = data[0], data < 400 ? 1 : data < 500 ? 2 : data < 526 ? 3 : data < 533 ? 4 : data < 534 ? "4+" : data < 535 ? 5 : data < 537 ? 6 : data < 538 ? 7 : data < 601 ? 8 : "8");
        } else {
          layout && (layout[1] = "like Chrome");
          data = data[1] || (data = data[0], data < 530 ? 1 : data < 532 ? 2 : data < 532.05 ? 3 : data < 533 ? 4 : data < 534.03 ? 5 : data < 534.07 ? 6 : data < 534.1 ? 7 : data < 534.13 ? 8 : data < 534.16 ? 9 : data < 534.24 ? 10 : data < 534.3 ? 11 : data < 535.01 ? 12 : data < 535.02 ? "13+" : data < 535.07 ? 15 : data < 535.11 ? 16 : data < 535.19 ? 17 : data < 536.05 ? 18 : data < 536.1 ? 19 : data < 537.01 ? 20 : data < 537.11 ? "21+" : data < 537.13 ? 23 : data < 537.18 ? 24 : data < 537.24 ? 25 : data < 537.36 ? 26 : layout != "Blink" ? "27" : "28");
        }
        layout && (layout[1] += " " + (data += typeof data == "number" ? ".x" : /[.+]/.test(data) ? "" : "+"));
        if (name == "Safari" && (!version2 || parseInt(version2) > 45)) {
          version2 = data;
        }
      }
      if (name == "Opera" && (data = /\bzbov|zvav$/.exec(os))) {
        name += " ";
        description.unshift("desktop mode");
        if (data == "zvav") {
          name += "Mini";
          version2 = null;
        } else {
          name += "Mobile";
        }
        os = os.replace(RegExp(" *" + data + "$"), "");
      } else if (name == "Safari" && /\bChrome\b/.exec(layout && layout[1])) {
        description.unshift("desktop mode");
        name = "Chrome Mobile";
        version2 = null;
        if (/\bOS X\b/.test(os)) {
          manufacturer = "Apple";
          os = "iOS 4.3+";
        } else {
          os = null;
        }
      }
      if (version2 && version2.indexOf(data = /[\d.]+$/.exec(os)) == 0 && ua.indexOf("/" + data + "-") > -1) {
        os = trim(os.replace(data, ""));
      }
      if (layout && !/\b(?:Avant|Nook)\b/.test(name) && (/Browser|Lunascape|Maxthon/.test(name) || name != "Safari" && /^iOS/.test(os) && /\bSafari\b/.test(layout[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Sleipnir|Web)/.test(name) && layout[1])) {
        (data = layout[layout.length - 1]) && description.push(data);
      }
      if (description.length) {
        description = ["(" + description.join("; ") + ")"];
      }
      if (manufacturer && product && product.indexOf(manufacturer) < 0) {
        description.push("on " + manufacturer);
      }
      if (product) {
        description.push((/^on /.test(description[description.length - 1]) ? "" : "on ") + product);
      }
      if (os) {
        data = / ([\d.+]+)$/.exec(os);
        isSpecialCasedOS = data && os.charAt(os.length - data[0].length - 1) == "/";
        os = {
          "architecture": 32,
          "family": data && !isSpecialCasedOS ? os.replace(data[0], "") : os,
          "version": data ? data[1] : null,
          "toString": function() {
            var version3 = this.version;
            return this.family + (version3 && !isSpecialCasedOS ? " " + version3 : "") + (this.architecture == 64 ? " 64-bit" : "");
          }
        };
      }
      if ((data = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(arch)) && !/\bi686\b/i.test(arch)) {
        if (os) {
          os.architecture = 64;
          os.family = os.family.replace(RegExp(" *" + data), "");
        }
        if (name && (/\bWOW64\b/i.test(ua) || useFeatures && /\w(?:86|32)$/.test(nav.cpuClass || nav.platform) && !/\bWin64; x64\b/i.test(ua))) {
          description.unshift("32-bit");
        }
      } else if (os && /^OS X/.test(os.family) && name == "Chrome" && parseFloat(version2) >= 39) {
        os.architecture = 64;
      }
      ua || (ua = null);
      var platform3 = {};
      platform3.description = ua;
      platform3.layout = layout && layout[0];
      platform3.manufacturer = manufacturer;
      platform3.name = name;
      platform3.prerelease = prerelease;
      platform3.product = product;
      platform3.ua = ua;
      platform3.version = name && version2;
      platform3.os = os || {
        /**
         * The CPU architecture the OS is built for.
         *
         * @memberOf platform.os
         * @type number|null
         */
        "architecture": null,
        /**
         * The family of the OS.
         *
         * Common values include:
         * "Windows", "Windows Server 2008 R2 / 7", "Windows Server 2008 / Vista",
         * "Windows XP", "OS X", "Ubuntu", "Debian", "Fedora", "Red Hat", "SuSE",
         * "Android", "iOS" and "Windows Phone"
         *
         * @memberOf platform.os
         * @type string|null
         */
        "family": null,
        /**
         * The version of the OS.
         *
         * @memberOf platform.os
         * @type string|null
         */
        "version": null,
        /**
         * Returns the OS string.
         *
         * @memberOf platform.os
         * @returns {string} The OS string.
         */
        "toString": function() {
          return "null";
        }
      };
      platform3.parse = parse;
      platform3.toString = toStringPlatform;
      if (platform3.version) {
        description.unshift(version2);
      }
      if (platform3.name) {
        description.unshift(name);
      }
      if (os && name && !(os == String(os).split(" ")[0] && (os == name.split(" ")[0] || product))) {
        description.push(product ? "(" + os + ")" : "on " + os);
      }
      if (description.length) {
        platform3.description = description.join(" ");
      }
      return platform3;
    }
    var platform2 = parse();
    if (freeExports && freeModule) {
      forOwn(platform2, function(value, key2) {
        freeExports[key2] = value;
      });
    } else {
      root.platform = platform2;
    }
  }).call(commonjsGlobal);
})(platform, platform.exports);
var platformExports$1 = platform.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _platform2 = platformExports$1;
  var _platform3 = _interopRequireDefault2(_platform2);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var platform2 = JSON.parse(JSON.stringify(_platform3.default));
  var os = platform2.os.family || "";
  var ANDROID = os === "Android";
  var WINDOWS = os.slice(0, 7) === "Windows";
  var OSX = os === "OS X";
  var IOS = os === "iOS";
  var BLINK = platform2.layout === "Blink";
  var GECKO = platform2.layout === "Gecko";
  var TRIDENT = platform2.layout === "Trident";
  var EDGE = platform2.layout === "EdgeHTML";
  var WEBKIT = platform2.layout === "WebKit";
  var version2 = parseFloat(platform2.version);
  var majorVersion = Math.floor(version2);
  platform2.majorVersion = majorVersion;
  platform2.is = {
    // operating system
    ANDROID,
    WINDOWS,
    OSX,
    IOS,
    // layout
    BLINK,
    // "Chrome", "Chrome Mobile", "Opera"
    GECKO,
    // "Firefox"
    TRIDENT,
    // "Internet Explorer"
    EDGE,
    // "Microsoft Edge"
    WEBKIT,
    // "Safari"
    // INTERNET EXPLORERS
    IE9: TRIDENT && majorVersion === 9,
    IE10: TRIDENT && majorVersion === 10,
    IE11: TRIDENT && majorVersion === 11
  };
  exports.default = platform2;
  module.exports = exports["default"];
})(platform$1, platform$1.exports);
var platformExports = platform$1.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function(tests) {
    var data = before();
    var results = {};
    Object.keys(tests).map(function(key2) {
      results[key2] = test(data, tests[key2]);
    });
    after(data);
    return results;
  };
  var _platform = platformExports;
  var _platform2 = _interopRequireDefault2(_platform);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function before() {
    var data = {
      // remember what had focus to restore after test
      activeElement: document.activeElement,
      // remember scroll positions to restore after test
      windowScrollTop: window.scrollTop,
      windowScrollLeft: window.scrollLeft,
      bodyScrollTop: document.body.scrollTop,
      bodyScrollLeft: document.body.scrollLeft
    };
    var iframe = document.createElement("iframe");
    iframe.setAttribute("style", "position:absolute; position:fixed; top:0; left:-2px; width:1px; height:1px; overflow:hidden;");
    iframe.setAttribute("aria-live", "off");
    iframe.setAttribute("aria-busy", "true");
    iframe.setAttribute("aria-hidden", "true");
    document.body.appendChild(iframe);
    var _window = iframe.contentWindow;
    var _document = _window.document;
    _document.open();
    _document.close();
    var wrapper = _document.createElement("div");
    _document.body.appendChild(wrapper);
    data.iframe = iframe;
    data.wrapper = wrapper;
    data.window = _window;
    data.document = _document;
    return data;
  }
  function test(data, options) {
    data.wrapper.innerHTML = "";
    var element = typeof options.element === "string" ? data.document.createElement(options.element) : options.element(data.wrapper, data.document);
    var focus2 = options.mutate && options.mutate(element, data.wrapper, data.document);
    if (!focus2 && focus2 !== false) {
      focus2 = element;
    }
    !element.parentNode && data.wrapper.appendChild(element);
    focus2 && focus2.focus && focus2.focus();
    return options.validate ? options.validate(element, focus2, data.document) : data.document.activeElement === focus2;
  }
  function after(data) {
    if (data.activeElement === document.body) {
      document.activeElement && document.activeElement.blur && document.activeElement.blur();
      if (_platform2.default.is.IE10) {
        document.body.focus();
      }
    } else {
      data.activeElement && data.activeElement.focus && data.activeElement.focus();
    }
    document.body.removeChild(data.iframe);
    window.scrollTop = data.windowScrollTop;
    window.scrollLeft = data.windowScrollLeft;
    document.body.scrollTop = data.bodyScrollTop;
    document.body.scrollLeft = data.bodyScrollLeft;
  }
  module.exports = exports["default"];
})(detectFocus, detectFocus.exports);
var detectFocusExports = detectFocus.exports;
var supportsCache = { exports: {} };
var version = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var version2 = "1.4.1";
  exports.default = version2;
  module.exports = exports["default"];
})(version, version.exports);
var versionExports = version.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _version = versionExports;
  var _version2 = _interopRequireDefault2(_version);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function readLocalStorage(key2) {
    var data = void 0;
    try {
      data = window.localStorage && window.localStorage.getItem(key2);
      data = data ? JSON.parse(data) : {};
    } catch (e2) {
      data = {};
    }
    return data;
  }
  function writeLocalStorage(key2, value) {
    if (!document.hasFocus()) {
      try {
        window.localStorage && window.localStorage.removeItem(key2);
      } catch (e2) {
      }
      return;
    }
    try {
      window.localStorage && window.localStorage.setItem(key2, JSON.stringify(value));
    } catch (e2) {
    }
  }
  var userAgent = typeof window !== "undefined" && window.navigator.userAgent || "";
  var cacheKey = "ally-supports-cache";
  var cache = readLocalStorage(cacheKey);
  if (cache.userAgent !== userAgent || cache.version !== _version2.default) {
    cache = {};
  }
  cache.userAgent = userAgent;
  cache.version = _version2.default;
  exports.default = {
    get: function get() {
      return cache;
    },
    set: function set(values) {
      Object.keys(values).forEach(function(key2) {
        cache[key2] = values[key2];
      });
      cache.time = (/* @__PURE__ */ new Date()).toISOString();
      writeLocalStorage(cacheKey, cache);
    }
  };
  module.exports = exports["default"];
})(supportsCache, supportsCache.exports);
var supportsCacheExports = supportsCache.exports;
var cssShadowPiercingDeepCombinator = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function() {
    var combinator = void 0;
    try {
      document.querySelector("html >>> :first-child");
      combinator = ">>>";
    } catch (noArrowArrowArrow) {
      try {
        document.querySelector("html /deep/ :first-child");
        combinator = "/deep/";
      } catch (noDeep) {
        combinator = "";
      }
    }
    return combinator;
  };
  module.exports = exports["default"];
})(cssShadowPiercingDeepCombinator, cssShadowPiercingDeepCombinator.exports);
var cssShadowPiercingDeepCombinatorExports = cssShadowPiercingDeepCombinator.exports;
var focusAreaImgTabindex = { exports: {} };
var gif = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  module.exports = exports["default"];
})(gif, gif.exports);
var gifExports = gif.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _gif = gifExports;
  var _gif2 = _interopRequireDefault2(_gif);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  exports.default = {
    element: "div",
    mutate: function mutate(element) {
      element.innerHTML = '<map name="image-map-tabindex-test"><area shape="rect" coords="63,19,144,45"></map><img usemap="#image-map-tabindex-test" tabindex="-1" alt="" src="' + _gif2.default + '">';
      return element.querySelector("area");
    }
  };
  module.exports = exports["default"];
})(focusAreaImgTabindex, focusAreaImgTabindex.exports);
var focusAreaImgTabindexExports = focusAreaImgTabindex.exports;
var focusAreaTabindex = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _gif = gifExports;
  var _gif2 = _interopRequireDefault2(_gif);
  var _platform = platformExports;
  var _platform2 = _interopRequireDefault2(_platform);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  exports.default = {
    element: "div",
    mutate: function mutate(element) {
      element.innerHTML = '<map name="image-map-tabindex-test"><area href="#void" tabindex="-1" shape="rect" coords="63,19,144,45"></map><img usemap="#image-map-tabindex-test" alt="" src="' + _gif2.default + '">';
      return false;
    },
    validate: function validate2(element, focusTarget, _document) {
      if (_platform2.default.is.GECKO) {
        return true;
      }
      var focus2 = element.querySelector("area");
      focus2.focus();
      return _document.activeElement === focus2;
    }
  };
  module.exports = exports["default"];
})(focusAreaTabindex, focusAreaTabindex.exports);
var focusAreaTabindexExports = focusAreaTabindex.exports;
var focusAreaWithoutHref = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _gif = gifExports;
  var _gif2 = _interopRequireDefault2(_gif);
  var _platform = platformExports;
  var _platform2 = _interopRequireDefault2(_platform);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  exports.default = {
    element: "div",
    mutate: function mutate(element) {
      element.innerHTML = '<map name="image-map-area-href-test"><area shape="rect" coords="63,19,144,45"></map><img usemap="#image-map-area-href-test" alt="" src="' + _gif2.default + '">';
      return element.querySelector("area");
    },
    validate: function validate2(element, focusTarget, _document) {
      if (_platform2.default.is.GECKO) {
        return true;
      }
      return _document.activeElement === focusTarget;
    }
  };
  module.exports = exports["default"];
})(focusAreaWithoutHref, focusAreaWithoutHref.exports);
var focusAreaWithoutHrefExports = focusAreaWithoutHref.exports;
var focusAudioWithoutControls = { exports: {} };
var mp3 = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _gif = gifExports;
  var _gif2 = _interopRequireDefault2(_gif);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  exports.default = _gif2.default;
  module.exports = exports["default"];
})(mp3, mp3.exports);
var mp3Exports = mp3.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _mp = mp3Exports;
  var _mp2 = _interopRequireDefault2(_mp);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  exports.default = {
    name: "can-focus-audio-without-controls",
    element: "audio",
    mutate: function mutate(element) {
      try {
        element.setAttribute("src", _mp2.default);
      } catch (e2) {
      }
    }
  };
  module.exports = exports["default"];
})(focusAudioWithoutControls, focusAudioWithoutControls.exports);
var focusAudioWithoutControlsExports = focusAudioWithoutControls.exports;
var focusBrokenImageMap = { exports: {} };
var gif_invalid = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ";
  module.exports = exports["default"];
})(gif_invalid, gif_invalid.exports);
var gif_invalidExports = gif_invalid.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _gif = gif_invalidExports;
  var _gif2 = _interopRequireDefault2(_gif);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  exports.default = {
    element: "div",
    mutate: function mutate(element) {
      element.innerHTML = '<map name="broken-image-map-test"><area href="#void" shape="rect" coords="63,19,144,45"></map><img usemap="#broken-image-map-test" alt="" src="' + _gif2.default + '">';
      return element.querySelector("area");
    }
  };
  module.exports = exports["default"];
})(focusBrokenImageMap, focusBrokenImageMap.exports);
var focusBrokenImageMapExports = focusBrokenImageMap.exports;
var focusChildrenOfFocusableFlexbox = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    element: "div",
    mutate: function mutate(element) {
      element.setAttribute("tabindex", "-1");
      element.setAttribute("style", "display: -webkit-flex; display: -ms-flexbox; display: flex;");
      element.innerHTML = '<span style="display: block;">hello</span>';
      return element.querySelector("span");
    }
  };
  module.exports = exports["default"];
})(focusChildrenOfFocusableFlexbox, focusChildrenOfFocusableFlexbox.exports);
var focusChildrenOfFocusableFlexboxExports = focusChildrenOfFocusableFlexbox.exports;
var focusFieldsetDisabled = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    element: "fieldset",
    mutate: function mutate(element) {
      element.setAttribute("tabindex", 0);
      element.setAttribute("disabled", "disabled");
    }
  };
  module.exports = exports["default"];
})(focusFieldsetDisabled, focusFieldsetDisabled.exports);
var focusFieldsetDisabledExports = focusFieldsetDisabled.exports;
var focusFieldset = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    element: "fieldset",
    mutate: function mutate(element) {
      element.innerHTML = "<legend>legend</legend><p>content</p>";
    }
  };
  module.exports = exports["default"];
})(focusFieldset, focusFieldset.exports);
var focusFieldsetExports = focusFieldset.exports;
var focusFlexboxContainer = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    element: "span",
    mutate: function mutate(element) {
      element.setAttribute("style", "display: -webkit-flex; display: -ms-flexbox; display: flex;");
      element.innerHTML = '<span style="display: block;">hello</span>';
    }
  };
  module.exports = exports["default"];
})(focusFlexboxContainer, focusFlexboxContainer.exports);
var focusFlexboxContainerExports = focusFlexboxContainer.exports;
var focusFormDisabled = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    element: "form",
    mutate: function mutate(element) {
      element.setAttribute("tabindex", 0);
      element.setAttribute("disabled", "disabled");
    }
  };
  module.exports = exports["default"];
})(focusFormDisabled, focusFormDisabled.exports);
var focusFormDisabledExports = focusFormDisabled.exports;
var focusImgIsmap = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _gif = gifExports;
  var _gif2 = _interopRequireDefault2(_gif);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  exports.default = {
    element: "a",
    mutate: function mutate(element) {
      element.href = "#void";
      element.innerHTML = '<img ismap src="' + _gif2.default + '" alt="">';
      return element.querySelector("img");
    }
  };
  module.exports = exports["default"];
})(focusImgIsmap, focusImgIsmap.exports);
var focusImgIsmapExports = focusImgIsmap.exports;
var focusImgUsemapTabindex = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _gif = gifExports;
  var _gif2 = _interopRequireDefault2(_gif);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  exports.default = {
    element: "div",
    mutate: function mutate(element) {
      element.innerHTML = '<map name="image-map-tabindex-test"><area href="#void" shape="rect" coords="63,19,144,45"></map><img usemap="#image-map-tabindex-test" tabindex="-1" alt="" src="' + _gif2.default + '">';
      return element.querySelector("img");
    }
  };
  module.exports = exports["default"];
})(focusImgUsemapTabindex, focusImgUsemapTabindex.exports);
var focusImgUsemapTabindexExports = focusImgUsemapTabindex.exports;
var focusInHiddenIframe = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    element: function element(wrapper, _document) {
      var iframe = _document.createElement("iframe");
      wrapper.appendChild(iframe);
      var iframeDocument = iframe.contentWindow.document;
      iframeDocument.open();
      iframeDocument.close();
      return iframe;
    },
    mutate: function mutate(iframe) {
      iframe.style.visibility = "hidden";
      var iframeDocument = iframe.contentWindow.document;
      var input = iframeDocument.createElement("input");
      iframeDocument.body.appendChild(input);
      return input;
    },
    validate: function validate2(iframe) {
      var iframeDocument = iframe.contentWindow.document;
      var focus2 = iframeDocument.querySelector("input");
      return iframeDocument.activeElement === focus2;
    }
  };
  module.exports = exports["default"];
})(focusInHiddenIframe, focusInHiddenIframe.exports);
var focusInHiddenIframeExports = focusInHiddenIframe.exports;
var focusInZeroDimensionObject = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function() {
    return result;
  };
  var _platform = platformExports;
  var _platform2 = _interopRequireDefault2(_platform);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var result = !_platform2.default.is.WEBKIT;
  module.exports = exports["default"];
})(focusInZeroDimensionObject, focusInZeroDimensionObject.exports);
var focusInZeroDimensionObjectExports = focusInZeroDimensionObject.exports;
var focusInvalidTabindex = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    element: "div",
    mutate: function mutate(element) {
      element.setAttribute("tabindex", "invalid-value");
    }
  };
  module.exports = exports["default"];
})(focusInvalidTabindex, focusInvalidTabindex.exports);
var focusInvalidTabindexExports = focusInvalidTabindex.exports;
var focusLabelTabindex = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    element: "label",
    mutate: function mutate(element) {
      element.setAttribute("tabindex", "-1");
    },
    validate: function validate2(element, focusTarget, _document) {
      element.offsetHeight;
      element.focus();
      return _document.activeElement === element;
    }
  };
  module.exports = exports["default"];
})(focusLabelTabindex, focusLabelTabindex.exports);
var focusLabelTabindexExports = focusLabelTabindex.exports;
var focusObjectSvgHidden = { exports: {} };
var svg$1 = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBpZD0ic3ZnIj48dGV4dCB4PSIxMCIgeT0iMjAiIGlkPSJzdmctbGluay10ZXh0Ij50ZXh0PC90ZXh0Pjwvc3ZnPg==";
  module.exports = exports["default"];
})(svg$1, svg$1.exports);
var svgExports = svg$1.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _svg = svgExports;
  var _svg2 = _interopRequireDefault2(_svg);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  exports.default = {
    element: "object",
    mutate: function mutate(element) {
      element.setAttribute("type", "image/svg+xml");
      element.setAttribute("data", _svg2.default);
      element.setAttribute("width", "200");
      element.setAttribute("height", "50");
      element.style.visibility = "hidden";
    }
  };
  module.exports = exports["default"];
})(focusObjectSvgHidden, focusObjectSvgHidden.exports);
var focusObjectSvgHiddenExports = focusObjectSvgHidden.exports;
var focusObjectSvg = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _svg = svgExports;
  var _svg2 = _interopRequireDefault2(_svg);
  var _platform = platformExports;
  var _platform2 = _interopRequireDefault2(_platform);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  exports.default = {
    name: "can-focus-object-svg",
    element: "object",
    mutate: function mutate(element) {
      element.setAttribute("type", "image/svg+xml");
      element.setAttribute("data", _svg2.default);
      element.setAttribute("width", "200");
      element.setAttribute("height", "50");
    },
    validate: function validate2(element, focusTarget, _document) {
      if (_platform2.default.is.GECKO) {
        return true;
      }
      return _document.activeElement === element;
    }
  };
  module.exports = exports["default"];
})(focusObjectSvg, focusObjectSvg.exports);
var focusObjectSvgExports = focusObjectSvg.exports;
var focusObjectSwf = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function() {
    return result;
  };
  var _platform = platformExports;
  var _platform2 = _interopRequireDefault2(_platform);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var result = !_platform2.default.is.IE9;
  module.exports = exports["default"];
})(focusObjectSwf, focusObjectSwf.exports);
var focusObjectSwfExports = focusObjectSwf.exports;
var focusRedirectImgUsemap = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _gif = gifExports;
  var _gif2 = _interopRequireDefault2(_gif);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  exports.default = {
    element: "div",
    mutate: function mutate(element) {
      element.innerHTML = '<map name="focus-redirect-img-usemap"><area href="#void" shape="rect" coords="63,19,144,45"></map><img usemap="#focus-redirect-img-usemap" alt="" src="' + _gif2.default + '">';
      return element.querySelector("img");
    },
    validate: function validate2(element, focusTarget, _document) {
      var target = element.querySelector("area");
      return _document.activeElement === target;
    }
  };
  module.exports = exports["default"];
})(focusRedirectImgUsemap, focusRedirectImgUsemap.exports);
var focusRedirectImgUsemapExports = focusRedirectImgUsemap.exports;
var focusRedirectLegend = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    element: "fieldset",
    mutate: function mutate(element) {
      element.innerHTML = '<legend>legend</legend><input tabindex="-1"><input tabindex="0">';
      return false;
    },
    validate: function validate2(element, focusTarget, _document) {
      var focusable2 = element.querySelector('input[tabindex="-1"]');
      var tabbable2 = element.querySelector('input[tabindex="0"]');
      element.focus();
      element.querySelector("legend").focus();
      return _document.activeElement === focusable2 && "focusable" || _document.activeElement === tabbable2 && "tabbable" || "";
    }
  };
  module.exports = exports["default"];
})(focusRedirectLegend, focusRedirectLegend.exports);
var focusRedirectLegendExports = focusRedirectLegend.exports;
var focusScrollBody = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    element: "div",
    mutate: function mutate(element) {
      element.setAttribute("style", "width: 100px; height: 50px; overflow: auto;");
      element.innerHTML = '<div style="width: 500px; height: 40px;">scrollable content</div>';
      return element.querySelector("div");
    }
  };
  module.exports = exports["default"];
})(focusScrollBody, focusScrollBody.exports);
var focusScrollBodyExports = focusScrollBody.exports;
var focusScrollContainerWithoutOverflow = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    element: "div",
    mutate: function mutate(element) {
      element.setAttribute("style", "width: 100px; height: 50px;");
      element.innerHTML = '<div style="width: 500px; height: 40px;">scrollable content</div>';
    }
  };
  module.exports = exports["default"];
})(focusScrollContainerWithoutOverflow, focusScrollContainerWithoutOverflow.exports);
var focusScrollContainerWithoutOverflowExports = focusScrollContainerWithoutOverflow.exports;
var focusScrollContainer = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    element: "div",
    mutate: function mutate(element) {
      element.setAttribute("style", "width: 100px; height: 50px; overflow: auto;");
      element.innerHTML = '<div style="width: 500px; height: 40px;">scrollable content</div>';
    }
  };
  module.exports = exports["default"];
})(focusScrollContainer, focusScrollContainer.exports);
var focusScrollContainerExports = focusScrollContainer.exports;
var focusSummary = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    element: "details",
    mutate: function mutate(element) {
      element.innerHTML = "<summary>foo</summary><p>content</p>";
      return element.firstElementChild;
    }
  };
  module.exports = exports["default"];
})(focusSummary, focusSummary.exports);
var focusSummaryExports = focusSummary.exports;
var focusSvgFocusableAttribute = { exports: {} };
var svg = {};
var focus_svgForeignObjectHack = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function(element) {
    var isSvgElement = element.ownerSVGElement || element.nodeName.toLowerCase() === "svg";
    if (!isSvgElement) {
      return false;
    }
    var foreignObject = makeFocusableForeignObject();
    element.appendChild(foreignObject);
    var input = foreignObject.querySelector("input");
    input.focus();
    input.disabled = true;
    element.removeChild(foreignObject);
    return true;
  };
  function makeFocusableForeignObject() {
    var fragment = document.createElement("div");
    fragment.innerHTML = '<svg><foreignObject width="30" height="30">\n      <input type="text"/>\n  </foreignObject></svg>';
    return fragment.firstChild.firstChild;
  }
  module.exports = exports["default"];
})(focus_svgForeignObjectHack, focus_svgForeignObjectHack.exports);
var focus_svgForeignObjectHackExports = focus_svgForeignObjectHack.exports;
Object.defineProperty(svg, "__esModule", {
  value: true
});
svg.generate = generate;
svg.focus = focus;
svg.validate = validate;
var _focus = focus_svgForeignObjectHackExports;
var _focus2 = _interopRequireDefault$1(_focus);
function _interopRequireDefault$1(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function generate(element) {
  return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' + element + "</svg>";
}
function focus(element) {
  if (element.focus) {
    return;
  }
  try {
    HTMLElement.prototype.focus.call(element);
  } catch (e2) {
    (0, _focus2.default)(element);
  }
}
function validate(element, focusTarget, _document) {
  focus(focusTarget);
  return _document.activeElement === focusTarget;
}
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _svg = svg;
  exports.default = {
    element: "div",
    mutate: function mutate(element) {
      element.innerHTML = (0, _svg.generate)('<text focusable="true">a</text>');
      return element.querySelector("text");
    },
    validate: _svg.validate
  };
  module.exports = exports["default"];
})(focusSvgFocusableAttribute, focusSvgFocusableAttribute.exports);
var focusSvgFocusableAttributeExports = focusSvgFocusableAttribute.exports;
var focusSvgTabindexAttribute = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _svg = svg;
  exports.default = {
    element: "div",
    mutate: function mutate(element) {
      element.innerHTML = (0, _svg.generate)('<text tabindex="0">a</text>');
      return element.querySelector("text");
    },
    validate: _svg.validate
  };
  module.exports = exports["default"];
})(focusSvgTabindexAttribute, focusSvgTabindexAttribute.exports);
var focusSvgTabindexAttributeExports = focusSvgTabindexAttribute.exports;
var focusSvgNegativeTabindexAttribute = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _svg = svg;
  exports.default = {
    element: "div",
    mutate: function mutate(element) {
      element.innerHTML = (0, _svg.generate)('<text tabindex="-1">a</text>');
      return element.querySelector("text");
    },
    validate: _svg.validate
  };
  module.exports = exports["default"];
})(focusSvgNegativeTabindexAttribute, focusSvgNegativeTabindexAttribute.exports);
var focusSvgNegativeTabindexAttributeExports = focusSvgNegativeTabindexAttribute.exports;
var focusSvgUseTabindex = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _svg = svg;
  exports.default = {
    element: "div",
    mutate: function mutate(element) {
      element.innerHTML = (0, _svg.generate)(['<g id="ally-test-target"><a xlink:href="#void"><text>link</text></a></g>', '<use xlink:href="#ally-test-target" x="0" y="0" tabindex="-1" />'].join(""));
      return element.querySelector("use");
    },
    validate: _svg.validate
  };
  module.exports = exports["default"];
})(focusSvgUseTabindex, focusSvgUseTabindex.exports);
var focusSvgUseTabindexExports = focusSvgUseTabindex.exports;
var focusSvgForeignobjectTabindex = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _svg = svg;
  exports.default = {
    element: "div",
    mutate: function mutate(element) {
      element.innerHTML = (0, _svg.generate)('<foreignObject tabindex="-1"><input type="text" /></foreignObject>');
      return element.querySelector("foreignObject") || element.getElementsByTagName("foreignObject")[0];
    },
    validate: _svg.validate
  };
  module.exports = exports["default"];
})(focusSvgForeignobjectTabindex, focusSvgForeignobjectTabindex.exports);
var focusSvgForeignobjectTabindexExports = focusSvgForeignobjectTabindex.exports;
var focusSvgInIframe = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function() {
    return result;
  };
  var _platform = platformExports;
  var _platform2 = _interopRequireDefault2(_platform);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var result = Boolean(_platform2.default.is.GECKO && typeof SVGElement !== "undefined" && SVGElement.prototype.focus);
  module.exports = exports["default"];
})(focusSvgInIframe, focusSvgInIframe.exports);
var focusSvgInIframeExports = focusSvgInIframe.exports;
var focusSvg = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _svg = svg;
  exports.default = {
    element: "div",
    mutate: function mutate(element) {
      element.innerHTML = (0, _svg.generate)("");
      return element.firstChild;
    },
    validate: _svg.validate
  };
  module.exports = exports["default"];
})(focusSvg, focusSvg.exports);
var focusSvgExports = focusSvg.exports;
var focusTabindexTrailingCharacters = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    element: "div",
    mutate: function mutate(element) {
      element.setAttribute("tabindex", "3x");
    }
  };
  module.exports = exports["default"];
})(focusTabindexTrailingCharacters, focusTabindexTrailingCharacters.exports);
var focusTabindexTrailingCharactersExports = focusTabindexTrailingCharacters.exports;
var focusTable = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    element: "table",
    mutate: function mutate(element, wrapper, _document) {
      var fragment = _document.createDocumentFragment();
      fragment.innerHTML = "<tr><td>cell</td></tr>";
      element.appendChild(fragment);
    }
  };
  module.exports = exports["default"];
})(focusTable, focusTable.exports);
var focusTableExports = focusTable.exports;
var focusVideoWithoutControls = { exports: {} };
var mp4 = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _gif = gifExports;
  var _gif2 = _interopRequireDefault2(_gif);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  exports.default = _gif2.default;
  module.exports = exports["default"];
})(mp4, mp4.exports);
var mp4Exports = mp4.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _mp = mp4Exports;
  var _mp2 = _interopRequireDefault2(_mp);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  exports.default = {
    element: "video",
    mutate: function mutate(element) {
      try {
        element.setAttribute("src", _mp2.default);
      } catch (e2) {
      }
    }
  };
  module.exports = exports["default"];
})(focusVideoWithoutControls, focusVideoWithoutControls.exports);
var focusVideoWithoutControlsExports = focusVideoWithoutControls.exports;
var tabsequenceAreaAtImgPosition = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function() {
    return result;
  };
  var _platform = platformExports;
  var _platform2 = _interopRequireDefault2(_platform);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var result = _platform2.default.is.GECKO || _platform2.default.is.TRIDENT || _platform2.default.is.EDGE;
  module.exports = exports["default"];
})(tabsequenceAreaAtImgPosition, tabsequenceAreaAtImgPosition.exports);
var tabsequenceAreaAtImgPositionExports = tabsequenceAreaAtImgPosition.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function() {
    if (supportsCache2) {
      return supportsCache2;
    }
    supportsCache2 = _supportsCache2.default.get();
    if (!supportsCache2.time) {
      _supportsCache2.default.set(executeTests());
      supportsCache2 = _supportsCache2.default.get();
    }
    return supportsCache2;
  };
  var _detectFocus = detectFocusExports;
  var _detectFocus2 = _interopRequireDefault2(_detectFocus);
  var _supportsCache = supportsCacheExports;
  var _supportsCache2 = _interopRequireDefault2(_supportsCache);
  var _cssShadowPiercingDeepCombinator = cssShadowPiercingDeepCombinatorExports;
  var _cssShadowPiercingDeepCombinator2 = _interopRequireDefault2(_cssShadowPiercingDeepCombinator);
  var _focusAreaImgTabindex = focusAreaImgTabindexExports;
  var _focusAreaImgTabindex2 = _interopRequireDefault2(_focusAreaImgTabindex);
  var _focusAreaTabindex = focusAreaTabindexExports;
  var _focusAreaTabindex2 = _interopRequireDefault2(_focusAreaTabindex);
  var _focusAreaWithoutHref = focusAreaWithoutHrefExports;
  var _focusAreaWithoutHref2 = _interopRequireDefault2(_focusAreaWithoutHref);
  var _focusAudioWithoutControls = focusAudioWithoutControlsExports;
  var _focusAudioWithoutControls2 = _interopRequireDefault2(_focusAudioWithoutControls);
  var _focusBrokenImageMap = focusBrokenImageMapExports;
  var _focusBrokenImageMap2 = _interopRequireDefault2(_focusBrokenImageMap);
  var _focusChildrenOfFocusableFlexbox = focusChildrenOfFocusableFlexboxExports;
  var _focusChildrenOfFocusableFlexbox2 = _interopRequireDefault2(_focusChildrenOfFocusableFlexbox);
  var _focusFieldsetDisabled = focusFieldsetDisabledExports;
  var _focusFieldsetDisabled2 = _interopRequireDefault2(_focusFieldsetDisabled);
  var _focusFieldset = focusFieldsetExports;
  var _focusFieldset2 = _interopRequireDefault2(_focusFieldset);
  var _focusFlexboxContainer = focusFlexboxContainerExports;
  var _focusFlexboxContainer2 = _interopRequireDefault2(_focusFlexboxContainer);
  var _focusFormDisabled = focusFormDisabledExports;
  var _focusFormDisabled2 = _interopRequireDefault2(_focusFormDisabled);
  var _focusImgIsmap = focusImgIsmapExports;
  var _focusImgIsmap2 = _interopRequireDefault2(_focusImgIsmap);
  var _focusImgUsemapTabindex = focusImgUsemapTabindexExports;
  var _focusImgUsemapTabindex2 = _interopRequireDefault2(_focusImgUsemapTabindex);
  var _focusInHiddenIframe = focusInHiddenIframeExports;
  var _focusInHiddenIframe2 = _interopRequireDefault2(_focusInHiddenIframe);
  var _focusInZeroDimensionObject = focusInZeroDimensionObjectExports;
  var _focusInZeroDimensionObject2 = _interopRequireDefault2(_focusInZeroDimensionObject);
  var _focusInvalidTabindex = focusInvalidTabindexExports;
  var _focusInvalidTabindex2 = _interopRequireDefault2(_focusInvalidTabindex);
  var _focusLabelTabindex = focusLabelTabindexExports;
  var _focusLabelTabindex2 = _interopRequireDefault2(_focusLabelTabindex);
  var _focusObjectSvgHidden = focusObjectSvgHiddenExports;
  var _focusObjectSvgHidden2 = _interopRequireDefault2(_focusObjectSvgHidden);
  var _focusObjectSvg = focusObjectSvgExports;
  var _focusObjectSvg2 = _interopRequireDefault2(_focusObjectSvg);
  var _focusObjectSwf = focusObjectSwfExports;
  var _focusObjectSwf2 = _interopRequireDefault2(_focusObjectSwf);
  var _focusRedirectImgUsemap = focusRedirectImgUsemapExports;
  var _focusRedirectImgUsemap2 = _interopRequireDefault2(_focusRedirectImgUsemap);
  var _focusRedirectLegend = focusRedirectLegendExports;
  var _focusRedirectLegend2 = _interopRequireDefault2(_focusRedirectLegend);
  var _focusScrollBody = focusScrollBodyExports;
  var _focusScrollBody2 = _interopRequireDefault2(_focusScrollBody);
  var _focusScrollContainerWithoutOverflow = focusScrollContainerWithoutOverflowExports;
  var _focusScrollContainerWithoutOverflow2 = _interopRequireDefault2(_focusScrollContainerWithoutOverflow);
  var _focusScrollContainer = focusScrollContainerExports;
  var _focusScrollContainer2 = _interopRequireDefault2(_focusScrollContainer);
  var _focusSummary = focusSummaryExports;
  var _focusSummary2 = _interopRequireDefault2(_focusSummary);
  var _focusSvgFocusableAttribute = focusSvgFocusableAttributeExports;
  var _focusSvgFocusableAttribute2 = _interopRequireDefault2(_focusSvgFocusableAttribute);
  var _focusSvgTabindexAttribute = focusSvgTabindexAttributeExports;
  var _focusSvgTabindexAttribute2 = _interopRequireDefault2(_focusSvgTabindexAttribute);
  var _focusSvgNegativeTabindexAttribute = focusSvgNegativeTabindexAttributeExports;
  var _focusSvgNegativeTabindexAttribute2 = _interopRequireDefault2(_focusSvgNegativeTabindexAttribute);
  var _focusSvgUseTabindex = focusSvgUseTabindexExports;
  var _focusSvgUseTabindex2 = _interopRequireDefault2(_focusSvgUseTabindex);
  var _focusSvgForeignobjectTabindex = focusSvgForeignobjectTabindexExports;
  var _focusSvgForeignobjectTabindex2 = _interopRequireDefault2(_focusSvgForeignobjectTabindex);
  var _focusSvgInIframe = focusSvgInIframeExports;
  var _focusSvgInIframe2 = _interopRequireDefault2(_focusSvgInIframe);
  var _focusSvg = focusSvgExports;
  var _focusSvg2 = _interopRequireDefault2(_focusSvg);
  var _focusTabindexTrailingCharacters = focusTabindexTrailingCharactersExports;
  var _focusTabindexTrailingCharacters2 = _interopRequireDefault2(_focusTabindexTrailingCharacters);
  var _focusTable = focusTableExports;
  var _focusTable2 = _interopRequireDefault2(_focusTable);
  var _focusVideoWithoutControls = focusVideoWithoutControlsExports;
  var _focusVideoWithoutControls2 = _interopRequireDefault2(_focusVideoWithoutControls);
  var _tabsequenceAreaAtImgPosition = tabsequenceAreaAtImgPositionExports;
  var _tabsequenceAreaAtImgPosition2 = _interopRequireDefault2(_tabsequenceAreaAtImgPosition);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var testCallbacks = {
    cssShadowPiercingDeepCombinator: _cssShadowPiercingDeepCombinator2.default,
    focusInZeroDimensionObject: _focusInZeroDimensionObject2.default,
    focusObjectSwf: _focusObjectSwf2.default,
    focusSvgInIframe: _focusSvgInIframe2.default,
    tabsequenceAreaAtImgPosition: _tabsequenceAreaAtImgPosition2.default
  };
  var testDescriptions = {
    focusAreaImgTabindex: _focusAreaImgTabindex2.default,
    focusAreaTabindex: _focusAreaTabindex2.default,
    focusAreaWithoutHref: _focusAreaWithoutHref2.default,
    focusAudioWithoutControls: _focusAudioWithoutControls2.default,
    focusBrokenImageMap: _focusBrokenImageMap2.default,
    focusChildrenOfFocusableFlexbox: _focusChildrenOfFocusableFlexbox2.default,
    focusFieldsetDisabled: _focusFieldsetDisabled2.default,
    focusFieldset: _focusFieldset2.default,
    focusFlexboxContainer: _focusFlexboxContainer2.default,
    focusFormDisabled: _focusFormDisabled2.default,
    focusImgIsmap: _focusImgIsmap2.default,
    focusImgUsemapTabindex: _focusImgUsemapTabindex2.default,
    focusInHiddenIframe: _focusInHiddenIframe2.default,
    focusInvalidTabindex: _focusInvalidTabindex2.default,
    focusLabelTabindex: _focusLabelTabindex2.default,
    focusObjectSvg: _focusObjectSvg2.default,
    focusObjectSvgHidden: _focusObjectSvgHidden2.default,
    focusRedirectImgUsemap: _focusRedirectImgUsemap2.default,
    focusRedirectLegend: _focusRedirectLegend2.default,
    focusScrollBody: _focusScrollBody2.default,
    focusScrollContainerWithoutOverflow: _focusScrollContainerWithoutOverflow2.default,
    focusScrollContainer: _focusScrollContainer2.default,
    focusSummary: _focusSummary2.default,
    focusSvgFocusableAttribute: _focusSvgFocusableAttribute2.default,
    focusSvgTabindexAttribute: _focusSvgTabindexAttribute2.default,
    focusSvgNegativeTabindexAttribute: _focusSvgNegativeTabindexAttribute2.default,
    focusSvgUseTabindex: _focusSvgUseTabindex2.default,
    focusSvgForeignobjectTabindex: _focusSvgForeignobjectTabindex2.default,
    focusSvg: _focusSvg2.default,
    focusTabindexTrailingCharacters: _focusTabindexTrailingCharacters2.default,
    focusTable: _focusTable2.default,
    focusVideoWithoutControls: _focusVideoWithoutControls2.default
  };
  function executeTests() {
    var results = (0, _detectFocus2.default)(testDescriptions);
    Object.keys(testCallbacks).forEach(function(key2) {
      results[key2] = testCallbacks[key2]();
    });
    return results;
  }
  var supportsCache2 = null;
  module.exports = exports["default"];
})(supports, supports.exports);
var supportsExports = supports.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function(context) {
    if (!supports2) {
      supports2 = (0, _supports3.default)();
    }
    var validIntegerPattern = supports2.focusTabindexTrailingCharacters ? validIntegerPatternWithTrailing : validIntegerPatternNoTrailing;
    var element = (0, _contextToElement2.default)({
      label: "is/valid-tabindex",
      resolveDocument: true,
      context
    });
    var hasTabindex = element.hasAttribute("tabindex");
    var hasTabIndex = element.hasAttribute("tabIndex");
    if (!hasTabindex && !hasTabIndex) {
      return false;
    }
    var isSvgElement = element.ownerSVGElement || element.nodeName.toLowerCase() === "svg";
    if (isSvgElement && !supports2.focusSvgTabindexAttribute) {
      return false;
    }
    if (supports2.focusInvalidTabindex) {
      return true;
    }
    var tabindex = element.getAttribute(hasTabindex ? "tabindex" : "tabIndex");
    if (tabindex === "-32768") {
      return false;
    }
    return Boolean(tabindex && validIntegerPattern.test(tabindex));
  };
  var _contextToElement = contextToElementExports;
  var _contextToElement2 = _interopRequireDefault2(_contextToElement);
  var _supports2 = supportsExports;
  var _supports3 = _interopRequireDefault2(_supports2);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var supports2 = void 0;
  var validIntegerPatternNoTrailing = /^\s*(-|\+)?[0-9]+\s*$/;
  var validIntegerPatternWithTrailing = /^\s*(-|\+)?[0-9]+.*$/;
  module.exports = exports["default"];
})(validTabindex, validTabindex.exports);
var validTabindexExports = validTabindex.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function(element) {
    if (!(0, _validTabindex2.default)(element)) {
      return null;
    }
    var hasTabindex = element.hasAttribute("tabindex");
    var attributeName = hasTabindex ? "tabindex" : "tabIndex";
    var tabindex = parseInt(element.getAttribute(attributeName), 10);
    return isNaN(tabindex) ? -1 : tabindex;
  };
  var _validTabindex = validTabindexExports;
  var _validTabindex2 = _interopRequireDefault2(_validTabindex);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  module.exports = exports["default"];
})(tabindexValue, tabindexValue.exports);
var tabindexValueExports = tabindexValue.exports;
var is_util = {};
Object.defineProperty(is_util, "__esModule", {
  value: true
});
is_util.isUserModifyWritable = isUserModifyWritable;
is_util.hasCssOverflowScroll = hasCssOverflowScroll;
is_util.hasCssDisplayFlex = hasCssDisplayFlex;
is_util.isScrollableContainer = isScrollableContainer;
function isUserModifyWritable(style) {
  var userModify = style.webkitUserModify || "";
  return Boolean(userModify && userModify.indexOf("write") !== -1);
}
function hasCssOverflowScroll(style) {
  return [style.getPropertyValue("overflow"), style.getPropertyValue("overflow-x"), style.getPropertyValue("overflow-y")].some(function(overflow) {
    return overflow === "auto" || overflow === "scroll";
  });
}
function hasCssDisplayFlex(style) {
  return style.display.indexOf("flex") > -1;
}
function isScrollableContainer(element, nodeName, parentNodeName, parentStyle) {
  if (nodeName !== "div" && nodeName !== "span") {
    return false;
  }
  if (parentNodeName && parentNodeName !== "div" && parentNodeName !== "span" && !hasCssOverflowScroll(parentStyle)) {
    return false;
  }
  return element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth;
}
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _parents = parentsExports;
  var _parents2 = _interopRequireDefault2(_parents);
  var _contextToElement = contextToElementExports;
  var _contextToElement2 = _interopRequireDefault2(_contextToElement);
  var _elementMatches = elementMatchesExports;
  var _elementMatches2 = _interopRequireDefault2(_elementMatches);
  var _tabindexValue = tabindexValueExports;
  var _tabindexValue2 = _interopRequireDefault2(_tabindexValue);
  var _validTabindex = validTabindexExports;
  var _validTabindex2 = _interopRequireDefault2(_validTabindex);
  var _is = is_util;
  var _supports2 = supportsExports;
  var _supports3 = _interopRequireDefault2(_supports2);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var supports2 = void 0;
  function isFocusRelevantRules() {
    var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, context = _ref.context, _ref$except = _ref.except, except = _ref$except === void 0 ? {
      flexbox: false,
      scrollable: false,
      shadow: false
    } : _ref$except;
    if (!supports2) {
      supports2 = (0, _supports3.default)();
    }
    var element = (0, _contextToElement2.default)({
      label: "is/focus-relevant",
      resolveDocument: true,
      context
    });
    if (!except.shadow && element.shadowRoot) {
      return true;
    }
    var nodeName = element.nodeName.toLowerCase();
    if (nodeName === "input" && element.type === "hidden") {
      return false;
    }
    if (nodeName === "input" || nodeName === "select" || nodeName === "button" || nodeName === "textarea") {
      return true;
    }
    if (nodeName === "legend" && supports2.focusRedirectLegend) {
      return true;
    }
    if (nodeName === "label") {
      return true;
    }
    if (nodeName === "area") {
      return true;
    }
    if (nodeName === "a" && element.hasAttribute("href")) {
      return true;
    }
    if (nodeName === "object" && element.hasAttribute("usemap")) {
      return false;
    }
    if (nodeName === "object") {
      var svgType = element.getAttribute("type");
      if (!supports2.focusObjectSvg && svgType === "image/svg+xml") {
        return false;
      } else if (!supports2.focusObjectSwf && svgType === "application/x-shockwave-flash") {
        return false;
      }
    }
    if (nodeName === "iframe" || nodeName === "object") {
      return true;
    }
    if (nodeName === "embed" || nodeName === "keygen") {
      return true;
    }
    if (element.hasAttribute("contenteditable")) {
      return true;
    }
    if (nodeName === "audio" && (supports2.focusAudioWithoutControls || element.hasAttribute("controls"))) {
      return true;
    }
    if (nodeName === "video" && (supports2.focusVideoWithoutControls || element.hasAttribute("controls"))) {
      return true;
    }
    if (supports2.focusSummary && nodeName === "summary") {
      return true;
    }
    var validTabindex2 = (0, _validTabindex2.default)(element);
    if (nodeName === "img" && element.hasAttribute("usemap")) {
      return validTabindex2 && supports2.focusImgUsemapTabindex || supports2.focusRedirectImgUsemap;
    }
    if (supports2.focusTable && (nodeName === "table" || nodeName === "td")) {
      return true;
    }
    if (supports2.focusFieldset && nodeName === "fieldset") {
      return true;
    }
    var isSvgElement = nodeName === "svg";
    var isSvgContent = element.ownerSVGElement;
    var focusableAttribute = element.getAttribute("focusable");
    var tabindex = (0, _tabindexValue2.default)(element);
    if (nodeName === "use" && tabindex !== null && !supports2.focusSvgUseTabindex) {
      return false;
    }
    if (nodeName === "foreignobject") {
      return tabindex !== null && supports2.focusSvgForeignobjectTabindex;
    }
    if ((0, _elementMatches2.default)(element, "svg a") && element.hasAttribute("xlink:href")) {
      return true;
    }
    if ((isSvgElement || isSvgContent) && element.focus && !supports2.focusSvgNegativeTabindexAttribute && tabindex < 0) {
      return false;
    }
    if (isSvgElement) {
      return validTabindex2 || supports2.focusSvg || supports2.focusSvgInIframe || Boolean(supports2.focusSvgFocusableAttribute && focusableAttribute && focusableAttribute === "true");
    }
    if (isSvgContent) {
      if (supports2.focusSvgTabindexAttribute && validTabindex2) {
        return true;
      }
      if (supports2.focusSvgFocusableAttribute) {
        return focusableAttribute === "true";
      }
    }
    if (validTabindex2) {
      return true;
    }
    var style = window.getComputedStyle(element, null);
    if ((0, _is.isUserModifyWritable)(style)) {
      return true;
    }
    if (supports2.focusImgIsmap && nodeName === "img" && element.hasAttribute("ismap")) {
      var hasLinkParent = (0, _parents2.default)({ context: element }).some(function(parent2) {
        return parent2.nodeName.toLowerCase() === "a" && parent2.hasAttribute("href");
      });
      if (hasLinkParent) {
        return true;
      }
    }
    if (!except.scrollable && supports2.focusScrollContainer) {
      if (supports2.focusScrollContainerWithoutOverflow) {
        if ((0, _is.isScrollableContainer)(element, nodeName)) {
          return true;
        }
      } else if ((0, _is.hasCssOverflowScroll)(style)) {
        return true;
      }
    }
    if (!except.flexbox && supports2.focusFlexboxContainer && (0, _is.hasCssDisplayFlex)(style)) {
      return true;
    }
    var parent = element.parentElement;
    if (!except.scrollable && parent) {
      var parentNodeName = parent.nodeName.toLowerCase();
      var parentStyle = window.getComputedStyle(parent, null);
      if (supports2.focusScrollBody && (0, _is.isScrollableContainer)(parent, nodeName, parentNodeName, parentStyle)) {
        return true;
      }
      if (supports2.focusChildrenOfFocusableFlexbox) {
        if ((0, _is.hasCssDisplayFlex)(parentStyle)) {
          return true;
        }
      }
    }
    return false;
  }
  isFocusRelevantRules.except = function() {
    var except = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var isFocusRelevant2 = function isFocusRelevant3(context) {
      return isFocusRelevantRules({
        context,
        except
      });
    };
    isFocusRelevant2.rules = isFocusRelevantRules;
    return isFocusRelevant2;
  };
  var isFocusRelevant = isFocusRelevantRules.except({});
  exports.default = isFocusRelevant;
  module.exports = exports["default"];
})(focusRelevant, focusRelevant.exports);
var focusRelevantExports = focusRelevant.exports;
var validArea = { exports: {} };
var visible = { exports: {} };
var arrayFindIndex = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = findIndex;
  function findIndex(array, callback) {
    if (array.findIndex) {
      return array.findIndex(callback);
    }
    var length = array.length;
    if (length === 0) {
      return -1;
    }
    for (var i2 = 0; i2 < length; i2++) {
      if (callback(array[i2], i2, array)) {
        return i2;
      }
    }
    return -1;
  }
  module.exports = exports["default"];
})(arrayFindIndex, arrayFindIndex.exports);
var arrayFindIndexExports = arrayFindIndex.exports;
var getFrameElement = { exports: {} };
var getContentDocument = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function(node) {
    try {
      return node.contentDocument || node.contentWindow && node.contentWindow.document || node.getSVGDocument && node.getSVGDocument() || null;
    } catch (e2) {
      return null;
    }
  };
  module.exports = exports["default"];
})(getContentDocument, getContentDocument.exports);
var getContentDocumentExports = getContentDocument.exports;
var getWindow = { exports: {} };
var getDocument = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function(node) {
    if (!node) {
      return document;
    }
    if (node.nodeType === Node.DOCUMENT_NODE) {
      return node;
    }
    return node.ownerDocument || document;
  };
  module.exports = exports["default"];
})(getDocument, getDocument.exports);
var getDocumentExports = getDocument.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function(node) {
    var _document = (0, _getDocument22.default)(node);
    return _document.defaultView || window;
  };
  var _getDocument3 = getDocumentExports;
  var _getDocument22 = _interopRequireDefault2(_getDocument3);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  module.exports = exports["default"];
})(getWindow, getWindow.exports);
var getWindowExports = getWindow.exports;
var selectInShadows = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function(selector) {
    if (typeof shadowPrefix !== "string") {
      var operator = (0, _cssShadowPiercingDeepCombinator2.default)();
      if (operator) {
        shadowPrefix = ", html " + operator + " ";
      }
    }
    if (!shadowPrefix) {
      return selector;
    }
    return selector + shadowPrefix + selector.replace(/\s*,\s*/g, ",").split(",").join(shadowPrefix);
  };
  var _cssShadowPiercingDeepCombinator = cssShadowPiercingDeepCombinatorExports;
  var _cssShadowPiercingDeepCombinator2 = _interopRequireDefault2(_cssShadowPiercingDeepCombinator);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var shadowPrefix = void 0;
  module.exports = exports["default"];
})(selectInShadows, selectInShadows.exports);
var selectInShadowsExports = selectInShadows.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getFrameElement2;
  var _getContentDocument = getContentDocumentExports;
  var _getContentDocument2 = _interopRequireDefault2(_getContentDocument);
  var _getWindow = getWindowExports;
  var _getWindow2 = _interopRequireDefault2(_getWindow);
  var _selectInShadows = selectInShadowsExports;
  var _selectInShadows2 = _interopRequireDefault2(_selectInShadows);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var selector = void 0;
  function findDocumentHostElement(_window) {
    if (!selector) {
      selector = (0, _selectInShadows2.default)("object, iframe");
    }
    if (_window._frameElement !== void 0) {
      return _window._frameElement;
    }
    _window._frameElement = null;
    var potentialHosts = _window.parent.document.querySelectorAll(selector);
    [].some.call(potentialHosts, function(element) {
      var _document = (0, _getContentDocument2.default)(element);
      if (_document !== _window.document) {
        return false;
      }
      _window._frameElement = element;
      return true;
    });
    return _window._frameElement;
  }
  function getFrameElement2(element) {
    var _window = (0, _getWindow2.default)(element);
    if (!_window.parent || _window.parent === _window) {
      return null;
    }
    try {
      return _window.frameElement || findDocumentHostElement(_window);
    } catch (e2) {
      return null;
    }
  }
  module.exports = exports["default"];
})(getFrameElement, getFrameElement.exports);
var getFrameElementExports = getFrameElement.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _arrayFindIndex = arrayFindIndexExports;
  var _arrayFindIndex2 = _interopRequireDefault2(_arrayFindIndex);
  var _parents = parentsExports;
  var _parents2 = _interopRequireDefault2(_parents);
  var _contextToElement = contextToElementExports;
  var _contextToElement2 = _interopRequireDefault2(_contextToElement);
  var _getFrameElement = getFrameElementExports;
  var _getFrameElement2 = _interopRequireDefault2(_getFrameElement);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var notRenderedElementsPattern = /^(area)$/;
  function computedStyle(element, property) {
    return window.getComputedStyle(element, null).getPropertyValue(property);
  }
  function notDisplayed(_path) {
    return _path.some(function(element) {
      return computedStyle(element, "display") === "none";
    });
  }
  function notVisible(_path) {
    var hidden2 = (0, _arrayFindIndex2.default)(_path, function(element) {
      var visibility = computedStyle(element, "visibility");
      return visibility === "hidden" || visibility === "collapse";
    });
    if (hidden2 === -1) {
      return false;
    }
    var visible2 = (0, _arrayFindIndex2.default)(_path, function(element) {
      return computedStyle(element, "visibility") === "visible";
    });
    if (visible2 === -1) {
      return true;
    }
    if (hidden2 < visible2) {
      return true;
    }
    return false;
  }
  function collapsedParent(_path) {
    var offset2 = 1;
    if (_path[0].nodeName.toLowerCase() === "summary") {
      offset2 = 2;
    }
    return _path.slice(offset2).some(function(element) {
      return element.nodeName.toLowerCase() === "details" && element.open === false;
    });
  }
  function isVisibleRules() {
    var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, context = _ref.context, _ref$except = _ref.except, except = _ref$except === void 0 ? {
      notRendered: false,
      cssDisplay: false,
      cssVisibility: false,
      detailsElement: false,
      browsingContext: false
    } : _ref$except;
    var element = (0, _contextToElement2.default)({
      label: "is/visible",
      resolveDocument: true,
      context
    });
    var nodeName = element.nodeName.toLowerCase();
    if (!except.notRendered && notRenderedElementsPattern.test(nodeName)) {
      return true;
    }
    var _path = (0, _parents2.default)({ context: element });
    var isAudioWithoutControls = nodeName === "audio" && !element.hasAttribute("controls");
    if (!except.cssDisplay && notDisplayed(isAudioWithoutControls ? _path.slice(1) : _path)) {
      return false;
    }
    if (!except.cssVisibility && notVisible(_path)) {
      return false;
    }
    if (!except.detailsElement && collapsedParent(_path)) {
      return false;
    }
    if (!except.browsingContext) {
      var frameElement = (0, _getFrameElement2.default)(element);
      var _isVisible = isVisibleRules.except(except);
      if (frameElement && !_isVisible(frameElement)) {
        return false;
      }
    }
    return true;
  }
  isVisibleRules.except = function() {
    var except = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var isVisible2 = function isVisible3(context) {
      return isVisibleRules({
        context,
        except
      });
    };
    isVisible2.rules = isVisibleRules;
    return isVisible2;
  };
  var isVisible = isVisibleRules.except({});
  exports.default = isVisible;
  module.exports = exports["default"];
})(visible, visible.exports);
var visibleExports = visible.exports;
var imageMap = {};
var css_escape = { exports: {} };
/*! https://mths.be/cssescape v1.5.1 by @mathias | MIT license */
(function(module, exports) {
  (function(root, factory) {
    {
      module.exports = factory(root);
    }
  })(typeof commonjsGlobal != "undefined" ? commonjsGlobal : commonjsGlobal, function(root) {
    if (root.CSS && root.CSS.escape) {
      return root.CSS.escape;
    }
    var cssEscape = function(value) {
      if (arguments.length == 0) {
        throw new TypeError("`CSS.escape` requires an argument.");
      }
      var string = String(value);
      var length = string.length;
      var index2 = -1;
      var codeUnit;
      var result = "";
      var firstCodeUnit = string.charCodeAt(0);
      while (++index2 < length) {
        codeUnit = string.charCodeAt(index2);
        if (codeUnit == 0) {
          result += "�";
          continue;
        }
        if (
          // If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
          // U+007F, […]
          codeUnit >= 1 && codeUnit <= 31 || codeUnit == 127 || // If the character is the first character and is in the range [0-9]
          // (U+0030 to U+0039), […]
          index2 == 0 && codeUnit >= 48 && codeUnit <= 57 || // If the character is the second character and is in the range [0-9]
          // (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
          index2 == 1 && codeUnit >= 48 && codeUnit <= 57 && firstCodeUnit == 45
        ) {
          result += "\\" + codeUnit.toString(16) + " ";
          continue;
        }
        if (
          // If the character is the first character and is a `-` (U+002D), and
          // there is no second character, […]
          index2 == 0 && length == 1 && codeUnit == 45
        ) {
          result += "\\" + string.charAt(index2);
          continue;
        }
        if (codeUnit >= 128 || codeUnit == 45 || codeUnit == 95 || codeUnit >= 48 && codeUnit <= 57 || codeUnit >= 65 && codeUnit <= 90 || codeUnit >= 97 && codeUnit <= 122) {
          result += string.charAt(index2);
          continue;
        }
        result += "\\" + string.charAt(index2);
      }
      return result;
    };
    if (!root.CSS) {
      root.CSS = {};
    }
    root.CSS.escape = cssEscape;
    return cssEscape;
  });
})(css_escape);
var css_escapeExports = css_escape.exports;
Object.defineProperty(imageMap, "__esModule", {
  value: true
});
imageMap.getMapByName = getMapByName;
imageMap.getMapOfImage = getMapOfImage;
imageMap.getImageOfArea = getImageOfArea;
var _css = css_escapeExports;
var _css2 = _interopRequireDefault(_css);
var _getDocument = getDocumentExports;
var _getDocument2 = _interopRequireDefault(_getDocument);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function getMapByName(name, _document) {
  var map = _document.querySelector('map[name="' + (0, _css2.default)(name) + '"]');
  return map || null;
}
function getMapOfImage(element) {
  var usemap = element.getAttribute("usemap");
  if (!usemap) {
    return null;
  }
  var _document = (0, _getDocument2.default)(element);
  return getMapByName(usemap.slice(1), _document);
}
function getImageOfArea(element) {
  var map = element.parentElement;
  if (!map.name || map.nodeName.toLowerCase() !== "map") {
    return null;
  }
  var _document = (0, _getDocument2.default)(element);
  return _document.querySelector('img[usemap="#' + (0, _css2.default)(map.name) + '"]') || null;
}
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function(context) {
    if (!supports2) {
      supports2 = (0, _supports3.default)();
    }
    var element = (0, _contextToElement2.default)({
      label: "is/valid-area",
      context
    });
    var nodeName = element.nodeName.toLowerCase();
    if (nodeName !== "area") {
      return false;
    }
    var hasTabindex = element.hasAttribute("tabindex");
    if (!supports2.focusAreaTabindex && hasTabindex) {
      return false;
    }
    var img = (0, _imageMap.getImageOfArea)(element);
    if (!img || !(0, _visible2.default)(img)) {
      return false;
    }
    if (!supports2.focusBrokenImageMap && (!img.complete || !img.naturalHeight || img.offsetWidth <= 0 || img.offsetHeight <= 0)) {
      return false;
    }
    if (!supports2.focusAreaWithoutHref && !element.href) {
      return supports2.focusAreaTabindex && hasTabindex || supports2.focusAreaImgTabindex && img.hasAttribute("tabindex");
    }
    var childOfInteractive = (0, _parents2.default)({ context: img }).slice(1).some(function(_element) {
      var name = _element.nodeName.toLowerCase();
      return name === "button" || name === "a";
    });
    if (childOfInteractive) {
      return false;
    }
    return true;
  };
  var _contextToElement = contextToElementExports;
  var _contextToElement2 = _interopRequireDefault2(_contextToElement);
  var _visible = visibleExports;
  var _visible2 = _interopRequireDefault2(_visible);
  var _parents = parentsExports;
  var _parents2 = _interopRequireDefault2(_parents);
  var _imageMap = imageMap;
  var _supports2 = supportsExports;
  var _supports3 = _interopRequireDefault2(_supports2);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var supports2 = void 0;
  module.exports = exports["default"];
})(validArea, validArea.exports);
var validAreaExports = validArea.exports;
var disabled$1 = { exports: {} };
var nativeDisabledSupported = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function(context) {
    if (!supports2) {
      supports2 = (0, _supports3.default)();
      if (supports2.focusFieldsetDisabled) {
        delete disabledElements.fieldset;
      }
      if (supports2.focusFormDisabled) {
        delete disabledElements.form;
      }
      disabledElementsPattern = new RegExp("^(" + Object.keys(disabledElements).join("|") + ")$");
    }
    var element = (0, _contextToElement2.default)({
      label: "is/native-disabled-supported",
      context
    });
    var nodeName = element.nodeName.toLowerCase();
    return Boolean(disabledElementsPattern.test(nodeName));
  };
  var _contextToElement = contextToElementExports;
  var _contextToElement2 = _interopRequireDefault2(_contextToElement);
  var _supports2 = supportsExports;
  var _supports3 = _interopRequireDefault2(_supports2);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var supports2 = void 0;
  var disabledElementsPattern = void 0;
  var disabledElements = {
    input: true,
    select: true,
    textarea: true,
    button: true,
    fieldset: true,
    form: true
  };
  module.exports = exports["default"];
})(nativeDisabledSupported, nativeDisabledSupported.exports);
var nativeDisabledSupportedExports = nativeDisabledSupported.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function(context) {
    if (!supports2) {
      supports2 = (0, _supports3.default)();
    }
    var element = (0, _contextToElement2.default)({
      label: "is/disabled",
      context
    });
    if (element.hasAttribute("data-ally-disabled")) {
      return true;
    }
    if (!(0, _nativeDisabledSupported2.default)(element)) {
      return false;
    }
    if (element.disabled) {
      return true;
    }
    var parents2 = (0, _parents2.default)({ context: element });
    if (parents2.some(isDisabledFieldset)) {
      return true;
    }
    if (!supports2.focusFormDisabled && parents2.some(isDisabledForm)) {
      return true;
    }
    return false;
  };
  var _contextToElement = contextToElementExports;
  var _contextToElement2 = _interopRequireDefault2(_contextToElement);
  var _parents = parentsExports;
  var _parents2 = _interopRequireDefault2(_parents);
  var _nativeDisabledSupported = nativeDisabledSupportedExports;
  var _nativeDisabledSupported2 = _interopRequireDefault2(_nativeDisabledSupported);
  var _supports2 = supportsExports;
  var _supports3 = _interopRequireDefault2(_supports2);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var supports2 = void 0;
  function isDisabledFieldset(element) {
    var nodeName = element.nodeName.toLowerCase();
    return nodeName === "fieldset" && element.disabled;
  }
  function isDisabledForm(element) {
    var nodeName = element.nodeName.toLowerCase();
    return nodeName === "form" && element.disabled;
  }
  module.exports = exports["default"];
})(disabled$1, disabled$1.exports);
var disabledExports$2 = disabled$1.exports;
var onlyTabbable = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _visible = visibleExports;
  var _visible2 = _interopRequireDefault2(_visible);
  var _contextToElement = contextToElementExports;
  var _contextToElement2 = _interopRequireDefault2(_contextToElement);
  var _getFrameElement = getFrameElementExports;
  var _getFrameElement2 = _interopRequireDefault2(_getFrameElement);
  var _tabindexValue = tabindexValueExports;
  var _tabindexValue2 = _interopRequireDefault2(_tabindexValue);
  var _platform = platformExports;
  var _platform2 = _interopRequireDefault2(_platform);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function isOnlyTabbableRules() {
    var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, context = _ref.context, _ref$except = _ref.except, except = _ref$except === void 0 ? {
      onlyFocusableBrowsingContext: false,
      visible: false
    } : _ref$except;
    var element = (0, _contextToElement2.default)({
      label: "is/only-tabbable",
      resolveDocument: true,
      context
    });
    if (!except.visible && !(0, _visible2.default)(element)) {
      return false;
    }
    if (!except.onlyFocusableBrowsingContext && (_platform2.default.is.GECKO || _platform2.default.is.TRIDENT || _platform2.default.is.EDGE)) {
      var frameElement = (0, _getFrameElement2.default)(element);
      if (frameElement) {
        if ((0, _tabindexValue2.default)(frameElement) < 0) {
          return false;
        }
      }
    }
    var nodeName = element.nodeName.toLowerCase();
    var tabindex = (0, _tabindexValue2.default)(element);
    if (nodeName === "label" && _platform2.default.is.GECKO) {
      return tabindex !== null && tabindex >= 0;
    }
    if (_platform2.default.is.GECKO && element.ownerSVGElement && !element.focus) {
      if (nodeName === "a" && element.hasAttribute("xlink:href")) {
        if (_platform2.default.is.GECKO) {
          return true;
        }
      }
    }
    return false;
  }
  isOnlyTabbableRules.except = function() {
    var except = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var isOnlyTabbable2 = function isOnlyTabbable3(context) {
      return isOnlyTabbableRules({
        context,
        except
      });
    };
    isOnlyTabbable2.rules = isOnlyTabbableRules;
    return isOnlyTabbable2;
  };
  var isOnlyTabbable = isOnlyTabbableRules.except({});
  exports.default = isOnlyTabbable;
  module.exports = exports["default"];
})(onlyTabbable, onlyTabbable.exports);
var onlyTabbableExports = onlyTabbable.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _focusRelevant = focusRelevantExports;
  var _focusRelevant2 = _interopRequireDefault2(_focusRelevant);
  var _validArea = validAreaExports;
  var _validArea2 = _interopRequireDefault2(_validArea);
  var _visible = visibleExports;
  var _visible2 = _interopRequireDefault2(_visible);
  var _disabled = disabledExports$2;
  var _disabled2 = _interopRequireDefault2(_disabled);
  var _onlyTabbable = onlyTabbableExports;
  var _onlyTabbable2 = _interopRequireDefault2(_onlyTabbable);
  var _contextToElement = contextToElementExports;
  var _contextToElement2 = _interopRequireDefault2(_contextToElement);
  var _getFrameElement = getFrameElementExports;
  var _getFrameElement2 = _interopRequireDefault2(_getFrameElement);
  var _tabindexValue = tabindexValueExports;
  var _tabindexValue2 = _interopRequireDefault2(_tabindexValue);
  var _supports2 = supportsExports;
  var _supports3 = _interopRequireDefault2(_supports2);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var supports2 = void 0;
  function isOnlyFocusRelevant(element) {
    var nodeName = element.nodeName.toLowerCase();
    if (nodeName === "embed" || nodeName === "keygen") {
      return true;
    }
    var _tabindex = (0, _tabindexValue2.default)(element);
    if (element.shadowRoot && _tabindex === null) {
      return true;
    }
    if (nodeName === "label") {
      return !supports2.focusLabelTabindex || _tabindex === null;
    }
    if (nodeName === "legend") {
      return _tabindex === null;
    }
    if (supports2.focusSvgFocusableAttribute && (element.ownerSVGElement || nodeName === "svg")) {
      var focusableAttribute = element.getAttribute("focusable");
      return focusableAttribute && focusableAttribute === "false";
    }
    if (nodeName === "img" && element.hasAttribute("usemap")) {
      return _tabindex === null || !supports2.focusImgUsemapTabindex;
    }
    if (nodeName === "area") {
      return !(0, _validArea2.default)(element);
    }
    return false;
  }
  function isFocusableRules() {
    var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, context = _ref.context, _ref$except = _ref.except, except = _ref$except === void 0 ? {
      disabled: false,
      visible: false,
      onlyTabbable: false
    } : _ref$except;
    if (!supports2) {
      supports2 = (0, _supports3.default)();
    }
    var _isOnlyTabbable = _onlyTabbable2.default.rules.except({
      onlyFocusableBrowsingContext: true,
      visible: except.visible
    });
    var element = (0, _contextToElement2.default)({
      label: "is/focusable",
      resolveDocument: true,
      context
    });
    var focusRelevant2 = _focusRelevant2.default.rules({
      context: element,
      except
    });
    if (!focusRelevant2 || isOnlyFocusRelevant(element)) {
      return false;
    }
    if (!except.disabled && (0, _disabled2.default)(element)) {
      return false;
    }
    if (!except.onlyTabbable && _isOnlyTabbable(element)) {
      return false;
    }
    if (!except.visible) {
      var visibilityOptions = {
        context: element,
        except: {}
      };
      if (supports2.focusInHiddenIframe) {
        visibilityOptions.except.browsingContext = true;
      }
      if (supports2.focusObjectSvgHidden) {
        var _nodeName2 = element.nodeName.toLowerCase();
        if (_nodeName2 === "object") {
          visibilityOptions.except.cssVisibility = true;
        }
      }
      if (!_visible2.default.rules(visibilityOptions)) {
        return false;
      }
    }
    var frameElement = (0, _getFrameElement2.default)(element);
    if (frameElement) {
      var _nodeName = frameElement.nodeName.toLowerCase();
      if (_nodeName === "object" && !supports2.focusInZeroDimensionObject) {
        if (!frameElement.offsetWidth || !frameElement.offsetHeight) {
          return false;
        }
      }
    }
    var nodeName = element.nodeName.toLowerCase();
    if (nodeName === "svg" && supports2.focusSvgInIframe && !frameElement && element.getAttribute("tabindex") === null) {
      return false;
    }
    return true;
  }
  isFocusableRules.except = function() {
    var except = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var isFocusable2 = function isFocusable3(context) {
      return isFocusableRules({
        context,
        except
      });
    };
    isFocusable2.rules = isFocusableRules;
    return isFocusable2;
  };
  var isFocusable = isFocusableRules.except({});
  exports.default = isFocusable;
  module.exports = exports["default"];
})(focusable$1, focusable$1.exports);
var focusableExports$2 = focusable$1.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = queryFocusableStrict;
  var _focusable = focusableExports$2;
  var _focusable2 = _interopRequireDefault2(_focusable);
  var _focusRelevant = focusRelevantExports;
  var _focusRelevant2 = _interopRequireDefault2(_focusRelevant);
  var _getDocument3 = getDocumentExports;
  var _getDocument22 = _interopRequireDefault2(_getDocument3);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function createFilter(condition) {
    var filter = function filter2(node) {
      if (node.shadowRoot) {
        return NodeFilter.FILTER_ACCEPT;
      }
      if (condition(node)) {
        return NodeFilter.FILTER_ACCEPT;
      }
      return NodeFilter.FILTER_SKIP;
    };
    filter.acceptNode = filter;
    return filter;
  }
  var PossiblyFocusableFilter = createFilter(_focusRelevant2.default);
  function queryFocusableStrict() {
    var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, context = _ref.context, includeContext = _ref.includeContext, includeOnlyTabbable = _ref.includeOnlyTabbable, strategy = _ref.strategy;
    if (!context) {
      context = document.documentElement;
    }
    var _isFocusable = _focusable2.default.rules.except({
      onlyTabbable: includeOnlyTabbable
    });
    var _document = (0, _getDocument22.default)(context);
    var walker = _document.createTreeWalker(
      // root element to start search in
      context,
      // element type filter
      NodeFilter.SHOW_ELEMENT,
      // custom NodeFilter filter
      strategy === "all" ? PossiblyFocusableFilter : createFilter(_isFocusable),
      // deprecated, but IE requires it
      false
    );
    var list = [];
    while (walker.nextNode()) {
      if (walker.currentNode.shadowRoot) {
        if (_isFocusable(walker.currentNode)) {
          list.push(walker.currentNode);
        }
        list = list.concat(queryFocusableStrict({
          context: walker.currentNode.shadowRoot,
          includeOnlyTabbable,
          strategy
        }));
      } else {
        list.push(walker.currentNode);
      }
    }
    if (includeContext) {
      if (strategy === "all") {
        if ((0, _focusRelevant2.default)(context)) {
          list.unshift(context);
        }
      } else if (_isFocusable(context)) {
        list.unshift(context);
      }
    }
    return list;
  }
  module.exports = exports["default"];
})(focusable_strict, focusable_strict.exports);
var focusable_strictExports = focusable_strict.exports;
var focusable_quick = { exports: {} };
var focusable = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function() {
    if (!supports2) {
      supports2 = (0, _supports3.default)();
    }
    if (typeof selector === "string") {
      return selector;
    }
    selector = (supports2.focusTable ? "table, td," : "") + (supports2.focusFieldset ? "fieldset," : "") + "svg a,a[href],area[href],input, select, textarea, button,iframe, object, embed,keygen," + (supports2.focusAudioWithoutControls ? "audio," : "audio[controls],") + (supports2.focusVideoWithoutControls ? "video," : "video[controls],") + (supports2.focusSummary ? "summary," : "") + "[tabindex],[contenteditable]";
    selector = (0, _selectInShadows2.default)(selector);
    return selector;
  };
  var _selectInShadows = selectInShadowsExports;
  var _selectInShadows2 = _interopRequireDefault2(_selectInShadows);
  var _supports2 = supportsExports;
  var _supports3 = _interopRequireDefault2(_supports2);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var supports2 = void 0;
  var selector = void 0;
  module.exports = exports["default"];
})(focusable, focusable.exports);
var focusableExports$1 = focusable.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = queryFocusableQuick;
  var _focusable = focusableExports$1;
  var _focusable2 = _interopRequireDefault2(_focusable);
  var _focusable3 = focusableExports$2;
  var _focusable4 = _interopRequireDefault2(_focusable3);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function queryFocusableQuick() {
    var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, context = _ref.context, includeContext = _ref.includeContext, includeOnlyTabbable = _ref.includeOnlyTabbable;
    var _selector = (0, _focusable2.default)();
    var elements = context.querySelectorAll(_selector);
    var _isFocusable = _focusable4.default.rules.except({
      onlyTabbable: includeOnlyTabbable
    });
    var result = [].filter.call(elements, _isFocusable);
    if (includeContext && _isFocusable(context)) {
      result.unshift(context);
    }
    return result;
  }
  module.exports = exports["default"];
})(focusable_quick, focusable_quick.exports);
var focusable_quickExports = focusable_quick.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function() {
    var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, context = _ref.context, includeContext = _ref.includeContext, includeOnlyTabbable = _ref.includeOnlyTabbable, _ref$strategy = _ref.strategy, strategy = _ref$strategy === void 0 ? "quick" : _ref$strategy;
    var element = (0, _contextToElement2.default)({
      label: "query/focusable",
      resolveDocument: true,
      defaultToDocument: true,
      context
    });
    var options = {
      context: element,
      includeContext,
      includeOnlyTabbable,
      strategy
    };
    if (strategy === "quick") {
      return (0, _focusable4.default)(options);
    } else if (strategy === "strict" || strategy === "all") {
      return (0, _focusable2.default)(options);
    }
    throw new TypeError('query/focusable requires option.strategy to be one of ["quick", "strict", "all"]');
  };
  var _contextToElement = contextToElementExports;
  var _contextToElement2 = _interopRequireDefault2(_contextToElement);
  var _focusable = focusable_strictExports;
  var _focusable2 = _interopRequireDefault2(_focusable);
  var _focusable3 = focusable_quickExports;
  var _focusable4 = _interopRequireDefault2(_focusable3);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  module.exports = exports["default"];
})(focusable$2, focusable$2.exports);
var focusableExports = focusable$2.exports;
var disabled = { exports: {} };
var toggleAttribute = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function(_ref) {
    var element = _ref.element, attribute = _ref.attribute;
    var temporaryAttribute = "data-cached-" + attribute;
    var temporaryAttributeValue = element.getAttribute(temporaryAttribute);
    if (temporaryAttributeValue === null) {
      var _value = element.getAttribute(attribute);
      if (_value === null) {
        return;
      }
      element.setAttribute(temporaryAttribute, _value || "");
      element.removeAttribute(attribute);
    } else {
      var _value2 = element.getAttribute(temporaryAttribute);
      element.removeAttribute(temporaryAttribute);
      element.setAttribute(attribute, _value2);
    }
  };
  module.exports = exports["default"];
})(toggleAttribute, toggleAttribute.exports);
var toggleAttributeExports = toggleAttribute.exports;
var toggleAttributeValue = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function(_ref) {
    var element = _ref.element, attribute = _ref.attribute, temporaryValue = _ref.temporaryValue, saveValue = _ref.saveValue;
    var temporaryAttribute = "data-cached-" + attribute;
    if (temporaryValue !== void 0) {
      var _value = saveValue || element.getAttribute(attribute);
      element.setAttribute(temporaryAttribute, _value || "");
      element.setAttribute(attribute, temporaryValue);
    } else {
      var _value2 = element.getAttribute(temporaryAttribute);
      element.removeAttribute(temporaryAttribute);
      if (_value2 === "") {
        element.removeAttribute(attribute);
      } else {
        element.setAttribute(attribute, _value2);
      }
    }
  };
  module.exports = exports["default"];
})(toggleAttributeValue, toggleAttributeValue.exports);
var toggleAttributeValueExports = toggleAttributeValue.exports;
var logger = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var noop = function noop2() {
  };
  var _console = {
    log: noop,
    debug: noop,
    info: noop,
    warn: noop,
    error: noop
  };
  exports.default = typeof console !== "undefined" ? console : _console;
  module.exports = exports["default"];
})(logger, logger.exports);
var loggerExports = logger.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function(context, disabledState) {
    if (!supports2) {
      supports2 = (0, _supports3.default)();
    }
    var element = (0, _contextToElement2.default)({
      label: "element/disabled",
      context
    });
    disabledState = Boolean(disabledState);
    var currentState = element.hasAttribute("data-ally-disabled");
    var runningAsGetter = arguments.length === 1;
    if ((0, _nativeDisabledSupported2.default)(element)) {
      if (runningAsGetter) {
        return element.disabled;
      }
      element.disabled = disabledState;
      return element;
    }
    if (runningAsGetter) {
      return currentState;
    }
    if (currentState === disabledState) {
      return element;
    }
    setElementDisabled(element, disabledState);
    return element;
  };
  var _contextToElement = contextToElementExports;
  var _contextToElement2 = _interopRequireDefault2(_contextToElement);
  var _tabindexValue = tabindexValueExports;
  var _tabindexValue2 = _interopRequireDefault2(_tabindexValue);
  var _nativeDisabledSupported = nativeDisabledSupportedExports;
  var _nativeDisabledSupported2 = _interopRequireDefault2(_nativeDisabledSupported);
  var _toggleAttribute = toggleAttributeExports;
  var _toggleAttribute2 = _interopRequireDefault2(_toggleAttribute);
  var _toggleAttributeValue = toggleAttributeValueExports;
  var _toggleAttributeValue2 = _interopRequireDefault2(_toggleAttributeValue);
  var _logger = loggerExports;
  var _logger2 = _interopRequireDefault2(_logger);
  var _supports2 = supportsExports;
  var _supports3 = _interopRequireDefault2(_supports2);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var supports2 = void 0;
  function disabledFocus() {
    _logger2.default.warn("trying to focus inert element", this);
  }
  function disableTabindex(element, disabledState) {
    if (disabledState) {
      var tabIndex = (0, _tabindexValue2.default)(element);
      (0, _toggleAttributeValue2.default)({
        element,
        attribute: "tabindex",
        temporaryValue: "-1",
        saveValue: tabIndex !== null ? tabIndex : ""
      });
    } else {
      (0, _toggleAttributeValue2.default)({
        element,
        attribute: "tabindex"
      });
    }
  }
  function disableVideoControls(element, disabledState) {
    (0, _toggleAttribute2.default)({
      element,
      attribute: "controls",
      remove: disabledState
    });
  }
  function disableSvgFocusable(element, disabledState) {
    (0, _toggleAttributeValue2.default)({
      element,
      attribute: "focusable",
      temporaryValue: disabledState ? "false" : void 0
    });
  }
  function disableSvgLink(element, disabledState) {
    (0, _toggleAttribute2.default)({
      element,
      attribute: "xlink:href",
      remove: disabledState
    });
  }
  function setAriaDisabled(element, disabledState) {
    (0, _toggleAttributeValue2.default)({
      element,
      attribute: "aria-disabled",
      temporaryValue: disabledState ? "true" : void 0
    });
  }
  function disableScriptFocus(element, disabledState) {
    if (disabledState) {
      element.focus = disabledFocus;
    } else {
      delete element.focus;
    }
  }
  function disablePointerEvents(element, disabledState) {
    if (disabledState) {
      var pointerEvents = element.style.pointerEvents || "";
      element.setAttribute("data-inert-pointer-events", pointerEvents);
      element.style.pointerEvents = "none";
    } else {
      var _pointerEvents = element.getAttribute("data-inert-pointer-events");
      element.removeAttribute("data-inert-pointer-events");
      element.style.pointerEvents = _pointerEvents;
    }
  }
  function setElementDisabled(element, disabledState) {
    setAriaDisabled(element, disabledState);
    disableTabindex(element, disabledState);
    disableScriptFocus(element, disabledState);
    disablePointerEvents(element, disabledState);
    var nodeName = element.nodeName.toLowerCase();
    if (nodeName === "video" || nodeName === "audio") {
      disableVideoControls(element, disabledState);
    }
    if (nodeName === "svg" || element.ownerSVGElement) {
      if (supports2.focusSvgFocusableAttribute) {
        disableSvgFocusable(element, disabledState);
      } else if (!supports2.focusSvgTabindexAttribute && nodeName === "a") {
        disableSvgLink(element, disabledState);
      }
    }
    if (disabledState) {
      element.setAttribute("data-ally-disabled", "true");
    } else {
      element.removeAttribute("data-ally-disabled");
    }
  }
  module.exports = exports["default"];
})(disabled, disabled.exports);
var disabledExports$1 = disabled.exports;
var shadowMutations = { exports: {} };
var shadowHosts = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = queryShadowHosts;
  var _contextToElement = contextToElementExports;
  var _contextToElement2 = _interopRequireDefault2(_contextToElement);
  var _getDocument3 = getDocumentExports;
  var _getDocument22 = _interopRequireDefault2(_getDocument3);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var filter = function filter2(node) {
    if (node.shadowRoot) {
      return NodeFilter.FILTER_ACCEPT;
    }
    return NodeFilter.FILTER_SKIP;
  };
  filter.acceptNode = filter;
  function queryShadowHosts() {
    var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, context = _ref.context;
    var element = (0, _contextToElement2.default)({
      label: "query/shadow-hosts",
      resolveDocument: true,
      defaultToDocument: true,
      context
    });
    var _document = (0, _getDocument22.default)(context);
    var walker = _document.createTreeWalker(
      // root element to start search in
      element,
      // element type filter
      NodeFilter.SHOW_ELEMENT,
      // custom NodeFilter filter
      filter,
      // deprecated, but IE requires it
      false
    );
    var list = [];
    if (element.shadowRoot) {
      list.push(element);
      list = list.concat(queryShadowHosts({
        context: element.shadowRoot
      }));
    }
    while (walker.nextNode()) {
      list.push(walker.currentNode);
      list = list.concat(queryShadowHosts({
        context: walker.currentNode.shadowRoot
      }));
    }
    return list;
  }
  module.exports = exports["default"];
})(shadowHosts, shadowHosts.exports);
var shadowHostsExports = shadowHosts.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };
  var _createClass = /* @__PURE__ */ function() {
    function defineProperties(target, props) {
      for (var i2 = 0; i2 < props.length; i2++) {
        var descriptor = props[i2];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  exports.default = function() {
    var _ref2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, context = _ref2.context, callback = _ref2.callback, config2 = _ref2.config;
    if (typeof callback !== "function") {
      throw new TypeError("observe/shadow-mutations requires options.callback to be a function");
    }
    if ((typeof config2 === "undefined" ? "undefined" : _typeof(config2)) !== "object") {
      throw new TypeError("observe/shadow-mutations requires options.config to be an object");
    }
    if (!window.MutationObserver) {
      return {
        disengage: function disengage() {
        }
      };
    }
    var element = (0, _contextToElement2.default)({
      label: "observe/shadow-mutations",
      resolveDocument: true,
      defaultToDocument: true,
      context
    });
    var service = new ShadowMutationObserver({
      context: element,
      callback,
      config: config2
    });
    return {
      disengage: service.disengage
    };
  };
  var _nodeArray = nodeArrayExports;
  var _nodeArray2 = _interopRequireDefault2(_nodeArray);
  var _shadowHosts = shadowHostsExports;
  var _shadowHosts2 = _interopRequireDefault2(_shadowHosts);
  var _contextToElement = contextToElementExports;
  var _contextToElement2 = _interopRequireDefault2(_contextToElement);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var shadowObserverConfig = {
    childList: true,
    subtree: true
  };
  var ShadowMutationObserver = function() {
    function ShadowMutationObserver2() {
      var _this = this;
      var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, context = _ref.context, callback = _ref.callback, config2 = _ref.config;
      _classCallCheck(this, ShadowMutationObserver2);
      this.config = config2;
      this.disengage = this.disengage.bind(this);
      this.clientObserver = new MutationObserver(callback);
      this.hostObserver = new MutationObserver(function(mutations) {
        return mutations.forEach(_this.handleHostMutation, _this);
      });
      this.observeContext(context);
      this.observeShadowHosts(context);
    }
    _createClass(ShadowMutationObserver2, [{
      key: "disengage",
      value: function disengage() {
        this.clientObserver && this.clientObserver.disconnect();
        this.clientObserver = null;
        this.hostObserver && this.hostObserver.disconnect();
        this.hostObserver = null;
      }
    }, {
      key: "observeShadowHosts",
      value: function observeShadowHosts(context) {
        var _this2 = this;
        var hosts = (0, _shadowHosts2.default)({
          context
        });
        hosts.forEach(function(element) {
          return _this2.observeContext(element.shadowRoot);
        });
      }
    }, {
      key: "observeContext",
      value: function observeContext(context) {
        this.clientObserver.observe(context, this.config);
        this.hostObserver.observe(context, shadowObserverConfig);
      }
    }, {
      key: "handleHostMutation",
      value: function handleHostMutation(mutation) {
        if (mutation.type !== "childList") {
          return;
        }
        var addedElements = (0, _nodeArray2.default)(mutation.addedNodes).filter(function(element) {
          return element.nodeType === Node.ELEMENT_NODE;
        });
        addedElements.forEach(this.observeShadowHosts, this);
      }
    }]);
    return ShadowMutationObserver2;
  }();
  module.exports = exports["default"];
})(shadowMutations, shadowMutations.exports);
var shadowMutationsExports = shadowMutations.exports;
var comparePosition = {};
Object.defineProperty(comparePosition, "__esModule", {
  value: true
});
comparePosition.getParentComparator = getParentComparator;
function getParentComparator() {
  var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, parent = _ref.parent, element = _ref.element, includeSelf = _ref.includeSelf;
  if (parent) {
    return function isChildOf(node) {
      return Boolean(includeSelf && node === parent || parent.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_CONTAINED_BY);
    };
  } else if (element) {
    return function isParentOf(node) {
      return Boolean(includeSelf && element === node || node.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_CONTAINED_BY);
    };
  }
  throw new TypeError("util/compare-position#getParentComparator required either options.parent or options.element");
}
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _createClass = /* @__PURE__ */ function() {
    function defineProperties(target, props) {
      for (var i2 = 0; i2 < props.length; i2++) {
        var descriptor = props[i2];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  exports.default = function() {
    var _ref2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, context = _ref2.context, filter = _ref2.filter;
    var service = new InertSubtree({ context, filter });
    return { disengage: service.disengage };
  };
  var _nodeArray = nodeArrayExports;
  var _nodeArray2 = _interopRequireDefault2(_nodeArray);
  var _focusable = focusableExports;
  var _focusable2 = _interopRequireDefault2(_focusable);
  var _disabled = disabledExports$1;
  var _disabled2 = _interopRequireDefault2(_disabled);
  var _shadowMutations = shadowMutationsExports;
  var _shadowMutations2 = _interopRequireDefault2(_shadowMutations);
  var _comparePosition = comparePosition;
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function makeElementInert(element) {
    return (0, _disabled2.default)(element, true);
  }
  function undoElementInert(element) {
    return (0, _disabled2.default)(element, false);
  }
  var observerConfig = {
    attributes: true,
    childList: true,
    subtree: true,
    attributeFilter: ["tabindex", "disabled", "data-ally-disabled"]
  };
  var InertSubtree = function() {
    function InertSubtree2() {
      var _this = this;
      var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, context = _ref.context, filter = _ref.filter;
      _classCallCheck(this, InertSubtree2);
      this._context = (0, _nodeArray2.default)(context || document.documentElement)[0];
      this._filter = (0, _nodeArray2.default)(filter);
      this._inertElementCache = [];
      this.disengage = this.disengage.bind(this);
      this.handleMutation = this.handleMutation.bind(this);
      this.renderInert = this.renderInert.bind(this);
      this.filterElements = this.filterElements.bind(this);
      this.filterParentElements = this.filterParentElements.bind(this);
      var focusable2 = (0, _focusable2.default)({
        context: this._context,
        includeContext: true,
        strategy: "all"
      });
      this.renderInert(focusable2);
      this.shadowObserver = (0, _shadowMutations2.default)({
        context: this._context,
        config: observerConfig,
        callback: function callback(mutations) {
          return mutations.forEach(_this.handleMutation);
        }
      });
    }
    _createClass(InertSubtree2, [{
      key: "disengage",
      value: function disengage() {
        if (!this._context) {
          return;
        }
        undoElementInert(this._context);
        this._inertElementCache.forEach(function(element) {
          return undoElementInert(element);
        });
        this._inertElementCache = null;
        this._filter = null;
        this._context = null;
        this.shadowObserver && this.shadowObserver.disengage();
        this.shadowObserver = null;
      }
    }, {
      key: "listQueryFocusable",
      value: function listQueryFocusable(list) {
        return list.map(function(element) {
          return (0, _focusable2.default)({ context: element, includeContext: true, strategy: "all" });
        }).reduce(function(previous, current) {
          return previous.concat(current);
        }, []);
      }
    }, {
      key: "renderInert",
      value: function renderInert(elements) {
        var _this2 = this;
        var makeInert = function makeInert2(element) {
          _this2._inertElementCache.push(element);
          makeElementInert(element);
        };
        elements.filter(this.filterElements).filter(this.filterParentElements).filter(function(element) {
          return !(0, _disabled2.default)(element);
        }).forEach(makeInert);
      }
    }, {
      key: "filterElements",
      value: function filterElements(element) {
        var isParentOfElement = (0, _comparePosition.getParentComparator)({ element, includeSelf: true });
        return !this._filter.some(isParentOfElement);
      }
    }, {
      key: "filterParentElements",
      value: function filterParentElements(element) {
        var isParentOfElement = (0, _comparePosition.getParentComparator)({ parent: element });
        return !this._filter.some(isParentOfElement);
      }
    }, {
      key: "handleMutation",
      value: function handleMutation(mutation) {
        if (mutation.type === "childList") {
          var addedElements = (0, _nodeArray2.default)(mutation.addedNodes).filter(function(element) {
            return element.nodeType === Node.ELEMENT_NODE;
          });
          if (!addedElements.length) {
            return;
          }
          var addedFocusableElements = this.listQueryFocusable(addedElements);
          this.renderInert(addedFocusableElements);
        } else if (mutation.type === "attributes") {
          this.renderInert([mutation.target]);
        }
      }
    }]);
    return InertSubtree2;
  }();
  module.exports = exports["default"];
})(disabled$2, disabled$2.exports);
var disabledExports = disabled$2.exports;
var hidden = { exports: {} };
var insignificantBranches = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function() {
    var _ref2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, context = _ref2.context, filter = _ref2.filter;
    context = (0, _contextToElement2.default)({
      label: "get/insignificant-branches",
      defaultToDocument: true,
      context
    });
    filter = (0, _nodeArray2.default)(filter);
    if (!filter.length) {
      throw new TypeError("get/insignificant-branches requires valid options.filter");
    }
    return queryInsignificantBranches({
      context,
      filter
    });
  };
  var _contextToElement = contextToElementExports;
  var _contextToElement2 = _interopRequireDefault2(_contextToElement);
  var _nodeArray = nodeArrayExports;
  var _nodeArray2 = _interopRequireDefault2(_nodeArray);
  var _comparePosition = comparePosition;
  var _getDocument3 = getDocumentExports;
  var _getDocument22 = _interopRequireDefault2(_getDocument3);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function queryInsignificantBranches(_ref) {
    var context = _ref.context, filter = _ref.filter;
    var containsFilteredElement = function containsFilteredElement2(node) {
      var containsNode = (0, _comparePosition.getParentComparator)({ parent: node });
      return filter.some(containsNode);
    };
    var insiginificantBranches = [];
    var CollectInsignificantBranchesFilter = function CollectInsignificantBranchesFilter2(node) {
      if (filter.some(function(element) {
        return node === element;
      })) {
        return NodeFilter.FILTER_REJECT;
      }
      if (containsFilteredElement(node)) {
        return NodeFilter.FILTER_ACCEPT;
      }
      insiginificantBranches.push(node);
      return NodeFilter.FILTER_REJECT;
    };
    CollectInsignificantBranchesFilter.acceptNode = CollectInsignificantBranchesFilter;
    var _document = (0, _getDocument22.default)(context);
    var walker = _document.createTreeWalker(
      // root element to start search in
      context,
      // element type filter
      NodeFilter.SHOW_ELEMENT,
      // custom NodeFilter filter
      CollectInsignificantBranchesFilter,
      // deprecated, but IE requires it
      false
    );
    while (walker.nextNode()) {
    }
    return insiginificantBranches;
  }
  module.exports = exports["default"];
})(insignificantBranches, insignificantBranches.exports);
var insignificantBranchesExports = insignificantBranches.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _createClass = /* @__PURE__ */ function() {
    function defineProperties(target, props) {
      for (var i2 = 0; i2 < props.length; i2++) {
        var descriptor = props[i2];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  exports.default = function() {
    var _ref2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, context = _ref2.context, filter = _ref2.filter;
    var service = new HiddenSubtree({ context, filter });
    return { disengage: service.disengage };
  };
  var _nodeArray = nodeArrayExports;
  var _nodeArray2 = _interopRequireDefault2(_nodeArray);
  var _insignificantBranches = insignificantBranchesExports;
  var _insignificantBranches2 = _interopRequireDefault2(_insignificantBranches);
  var _parents = parentsExports;
  var _parents2 = _interopRequireDefault2(_parents);
  var _toggleAttributeValue = toggleAttributeValueExports;
  var _toggleAttributeValue2 = _interopRequireDefault2(_toggleAttributeValue);
  var _comparePosition = comparePosition;
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function makeElementHidden(element) {
    (0, _toggleAttributeValue2.default)({
      element,
      attribute: "aria-hidden",
      temporaryValue: "true"
    });
  }
  function undoElementHidden(element) {
    (0, _toggleAttributeValue2.default)({
      element,
      attribute: "aria-hidden"
    });
  }
  var observerConfig = {
    attributes: false,
    childList: true,
    subtree: true
  };
  var HiddenSubtree = function() {
    function HiddenSubtree2() {
      var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, context = _ref.context, filter = _ref.filter;
      _classCallCheck(this, HiddenSubtree2);
      this._context = (0, _nodeArray2.default)(context || document.documentElement)[0];
      this._filter = (0, _nodeArray2.default)(filter);
      this.disengage = this.disengage.bind(this);
      this.handleMutation = this.handleMutation.bind(this);
      this.isInsignificantBranch = this.isInsignificantBranch.bind(this);
      var insignificantBranches2 = (0, _insignificantBranches2.default)({ context: this._context, filter: this._filter });
      insignificantBranches2.forEach(makeElementHidden);
      this.startObserver();
    }
    _createClass(HiddenSubtree2, [{
      key: "disengage",
      value: function disengage() {
        if (!this._context) {
          return;
        }
        [].forEach.call(this._context.querySelectorAll("[data-cached-aria-hidden]"), undoElementHidden);
        this._context = null;
        this._filter = null;
        this._observer && this._observer.disconnect();
        this._observer = null;
      }
    }, {
      key: "startObserver",
      value: function startObserver() {
        var _this = this;
        if (!window.MutationObserver) {
          return;
        }
        this._observer = new MutationObserver(function(mutations) {
          return mutations.forEach(_this.handleMutation);
        });
        this._observer.observe(this._context, observerConfig);
      }
    }, {
      key: "handleMutation",
      value: function handleMutation(mutation) {
        if (mutation.type === "childList") {
          (0, _nodeArray2.default)(mutation.addedNodes).filter(function(element) {
            return element.nodeType === Node.ELEMENT_NODE;
          }).filter(this.isInsignificantBranch).forEach(makeElementHidden);
        }
      }
    }, {
      key: "isInsignificantBranch",
      value: function isInsignificantBranch(element) {
        var parents2 = (0, _parents2.default)({ context: element });
        if (parents2.some(function(_element) {
          return _element.getAttribute("aria-hidden") === "true";
        })) {
          return false;
        }
        var isParentOfElement = (0, _comparePosition.getParentComparator)({ element });
        if (this._filter.some(isParentOfElement)) {
          return false;
        }
        return true;
      }
    }]);
    return HiddenSubtree2;
  }();
  module.exports = exports["default"];
})(hidden, hidden.exports);
var hiddenExports = hidden.exports;
var tabFocus = { exports: {} };
var activeElement = { exports: {} };
var shadowHost = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function() {
    var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, context = _ref.context;
    var element = (0, _contextToElement2.default)({
      label: "get/shadow-host",
      context
    });
    var container2 = null;
    while (element) {
      container2 = element;
      element = element.parentNode;
    }
    if (container2.nodeType === container2.DOCUMENT_FRAGMENT_NODE && container2.host) {
      return container2.host;
    }
    return null;
  };
  var _contextToElement = contextToElementExports;
  var _contextToElement2 = _interopRequireDefault2(_contextToElement);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  module.exports = exports["default"];
})(shadowHost, shadowHost.exports);
var shadowHostExports = shadowHost.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function(context) {
    var element = (0, _contextToElement2.default)({
      label: "is/active-element",
      resolveDocument: true,
      context
    });
    var _document = (0, _getDocument22.default)(element);
    if (_document.activeElement === element) {
      return true;
    }
    var shadowHost2 = (0, _shadowHost2.default)({ context: element });
    if (shadowHost2 && shadowHost2.shadowRoot.activeElement === element) {
      return true;
    }
    return false;
  };
  var _contextToElement = contextToElementExports;
  var _contextToElement2 = _interopRequireDefault2(_contextToElement);
  var _shadowHost = shadowHostExports;
  var _shadowHost2 = _interopRequireDefault2(_shadowHost);
  var _getDocument3 = getDocumentExports;
  var _getDocument22 = _interopRequireDefault2(_getDocument3);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  module.exports = exports["default"];
})(activeElement, activeElement.exports);
var activeElementExports = activeElement.exports;
var tabsequence = { exports: {} };
var tabbable$1 = { exports: {} };
var tabbable = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _visible = visibleExports;
  var _visible2 = _interopRequireDefault2(_visible);
  var _contextToElement = contextToElementExports;
  var _contextToElement2 = _interopRequireDefault2(_contextToElement);
  var _elementMatches = elementMatchesExports;
  var _elementMatches2 = _interopRequireDefault2(_elementMatches);
  var _tabindexValue = tabindexValueExports;
  var _tabindexValue2 = _interopRequireDefault2(_tabindexValue);
  var _focusRelevant = focusRelevantExports;
  var _focusRelevant2 = _interopRequireDefault2(_focusRelevant);
  var _getFrameElement = getFrameElementExports;
  var _getFrameElement2 = _interopRequireDefault2(_getFrameElement);
  var _platform = platformExports;
  var _platform2 = _interopRequireDefault2(_platform);
  var _imageMap = imageMap;
  var _is = is_util;
  var _supports2 = supportsExports;
  var _supports3 = _interopRequireDefault2(_supports2);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var supports2 = void 0;
  var focusableElementsPattern = /^(fieldset|table|td|body)$/;
  function isTabbableRules() {
    var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, context = _ref.context, _ref$except = _ref.except, except = _ref$except === void 0 ? {
      flexbox: false,
      scrollable: false,
      shadow: false,
      visible: false,
      onlyTabbable: false
    } : _ref$except;
    if (!supports2) {
      supports2 = (0, _supports3.default)();
    }
    var element = (0, _contextToElement2.default)({
      label: "is/tabbable",
      resolveDocument: true,
      context
    });
    if (_platform2.default.is.BLINK && _platform2.default.is.ANDROID && _platform2.default.majorVersion > 42) {
      return false;
    }
    var frameElement = (0, _getFrameElement2.default)(element);
    if (frameElement) {
      if (_platform2.default.is.WEBKIT && _platform2.default.is.IOS) {
        return false;
      }
      if ((0, _tabindexValue2.default)(frameElement) < 0) {
        return false;
      }
      if (!except.visible && (_platform2.default.is.BLINK || _platform2.default.is.WEBKIT) && !(0, _visible2.default)(frameElement)) {
        return false;
      }
      var frameNodeName = frameElement.nodeName.toLowerCase();
      if (frameNodeName === "object") {
        var isFixedBlink = _platform2.default.name === "Chrome" && _platform2.default.majorVersion >= 54 || _platform2.default.name === "Opera" && _platform2.default.majorVersion >= 41;
        if (_platform2.default.is.WEBKIT || _platform2.default.is.BLINK && !isFixedBlink) {
          return false;
        }
      }
    }
    var nodeName = element.nodeName.toLowerCase();
    var _tabindex = (0, _tabindexValue2.default)(element);
    var tabindex = _tabindex === null ? null : _tabindex >= 0;
    if (_platform2.default.is.EDGE && _platform2.default.majorVersion >= 14 && frameElement && element.ownerSVGElement && _tabindex < 0) {
      return true;
    }
    var hasTabbableTabindexOrNone = tabindex !== false;
    var hasTabbableTabindex = _tabindex !== null && _tabindex >= 0;
    if (element.hasAttribute("contenteditable")) {
      return hasTabbableTabindexOrNone;
    }
    if (focusableElementsPattern.test(nodeName) && tabindex !== true) {
      return false;
    }
    if (_platform2.default.is.WEBKIT && _platform2.default.is.IOS) {
      var potentiallyTabbable = nodeName === "input" && element.type === "text" || element.type === "password" || nodeName === "select" || nodeName === "textarea" || element.hasAttribute("contenteditable");
      if (!potentiallyTabbable) {
        var style = window.getComputedStyle(element, null);
        potentiallyTabbable = (0, _is.isUserModifyWritable)(style);
      }
      if (!potentiallyTabbable) {
        return false;
      }
    }
    if (nodeName === "use" && _tabindex !== null) {
      if (_platform2.default.is.BLINK || _platform2.default.is.WEBKIT && _platform2.default.majorVersion === 9) {
        return true;
      }
    }
    if ((0, _elementMatches2.default)(element, "svg a") && element.hasAttribute("xlink:href")) {
      if (hasTabbableTabindexOrNone) {
        return true;
      }
      if (element.focus && !supports2.focusSvgNegativeTabindexAttribute) {
        return true;
      }
    }
    if (nodeName === "svg" && supports2.focusSvgInIframe && hasTabbableTabindexOrNone) {
      return true;
    }
    if (_platform2.default.is.TRIDENT || _platform2.default.is.EDGE) {
      if (nodeName === "svg") {
        if (supports2.focusSvg) {
          return true;
        }
        return element.hasAttribute("focusable") || hasTabbableTabindex;
      }
      if (element.ownerSVGElement) {
        if (supports2.focusSvgTabindexAttribute && hasTabbableTabindex) {
          return true;
        }
        return element.hasAttribute("focusable");
      }
    }
    if (element.tabIndex === void 0) {
      return Boolean(except.onlyTabbable);
    }
    if (nodeName === "audio") {
      if (!element.hasAttribute("controls")) {
        return false;
      } else if (_platform2.default.is.BLINK) {
        return true;
      }
    }
    if (nodeName === "video") {
      if (!element.hasAttribute("controls")) {
        if (_platform2.default.is.TRIDENT || _platform2.default.is.EDGE) {
          return false;
        }
      } else if (_platform2.default.is.BLINK || _platform2.default.is.GECKO) {
        return true;
      }
    }
    if (nodeName === "object") {
      if (_platform2.default.is.BLINK || _platform2.default.is.WEBKIT) {
        return false;
      }
    }
    if (nodeName === "iframe") {
      return false;
    }
    if (!except.scrollable && _platform2.default.is.GECKO) {
      var _style = window.getComputedStyle(element, null);
      if ((0, _is.hasCssOverflowScroll)(_style)) {
        return hasTabbableTabindexOrNone;
      }
    }
    if (_platform2.default.is.TRIDENT || _platform2.default.is.EDGE) {
      if (nodeName === "area") {
        var img = (0, _imageMap.getImageOfArea)(element);
        if (img && (0, _tabindexValue2.default)(img) < 0) {
          return false;
        }
      }
      var _style2 = window.getComputedStyle(element, null);
      if ((0, _is.isUserModifyWritable)(_style2)) {
        return element.tabIndex >= 0;
      }
      if (!except.flexbox && (0, _is.hasCssDisplayFlex)(_style2)) {
        if (_tabindex !== null) {
          return hasTabbableTabindex;
        }
        return isFocusRelevantWithoutFlexbox(element) && isTabbableWithoutFlexbox(element);
      }
      if ((0, _is.isScrollableContainer)(element, nodeName)) {
        return false;
      }
      var parent = element.parentElement;
      if (parent) {
        var parentNodeName = parent.nodeName.toLowerCase();
        var parentStyle = window.getComputedStyle(parent, null);
        if ((0, _is.isScrollableContainer)(parent, nodeName, parentNodeName, parentStyle)) {
          return false;
        }
        if ((0, _is.hasCssDisplayFlex)(parentStyle)) {
          return hasTabbableTabindex;
        }
      }
    }
    return element.tabIndex >= 0;
  }
  isTabbableRules.except = function() {
    var except = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var isTabbable2 = function isTabbable3(context) {
      return isTabbableRules({
        context,
        except
      });
    };
    isTabbable2.rules = isTabbableRules;
    return isTabbable2;
  };
  var isFocusRelevantWithoutFlexbox = _focusRelevant2.default.rules.except({ flexbox: true });
  var isTabbableWithoutFlexbox = isTabbableRules.except({ flexbox: true });
  var isTabbable = isTabbableRules.except({});
  exports.default = isTabbable;
  module.exports = exports["default"];
})(tabbable, tabbable.exports);
var tabbableExports$1 = tabbable.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function() {
    var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, context = _ref.context, includeContext = _ref.includeContext, includeOnlyTabbable = _ref.includeOnlyTabbable, strategy = _ref.strategy;
    var _isTabbable = _tabbable2.default.rules.except({
      onlyTabbable: includeOnlyTabbable
    });
    return (0, _focusable2.default)({
      context,
      includeContext,
      includeOnlyTabbable,
      strategy
    }).filter(_isTabbable);
  };
  var _focusable = focusableExports;
  var _focusable2 = _interopRequireDefault2(_focusable);
  var _tabbable = tabbableExports$1;
  var _tabbable2 = _interopRequireDefault2(_tabbable);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  module.exports = exports["default"];
})(tabbable$1, tabbable$1.exports);
var tabbableExports = tabbable$1.exports;
var tabsequence_sortArea = { exports: {} };
var mergeDomOrder = { exports: {} };
var sortDomOrder = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function(elements) {
    return elements.sort(compareDomPosition);
  };
  function compareDomPosition(a2, b) {
    return a2.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
  }
  module.exports = exports["default"];
})(sortDomOrder, sortDomOrder.exports);
var sortDomOrderExports = sortDomOrder.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function() {
    var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, list = _ref.list, elements = _ref.elements, resolveElement = _ref.resolveElement;
    var _list = list.slice(0);
    var _elements = (0, _nodeArray2.default)(elements).slice(0);
    (0, _sortDomOrder2.default)(_elements);
    var insertions = findInsertionOffsets(_list, _elements, resolveElement);
    insertElementsAtOffsets(_list, insertions);
    return _list;
  };
  var _arrayFindIndex = arrayFindIndexExports;
  var _arrayFindIndex2 = _interopRequireDefault2(_arrayFindIndex);
  var _nodeArray = nodeArrayExports;
  var _nodeArray2 = _interopRequireDefault2(_nodeArray);
  var _sortDomOrder = sortDomOrderExports;
  var _sortDomOrder2 = _interopRequireDefault2(_sortDomOrder);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function getFirstSuccessorOffset(list, target) {
    return (0, _arrayFindIndex2.default)(list, function(element) {
      return target.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_FOLLOWING;
    });
  }
  function findInsertionOffsets(list, elements, resolveElement) {
    var insertions = [];
    elements.forEach(function(element) {
      var replace = true;
      var offset2 = list.indexOf(element);
      if (offset2 === -1) {
        offset2 = getFirstSuccessorOffset(list, element);
        replace = false;
      }
      if (offset2 === -1) {
        offset2 = list.length;
      }
      var injections = (0, _nodeArray2.default)(resolveElement ? resolveElement(element) : element);
      if (!injections.length) {
        return;
      }
      insertions.push({
        offset: offset2,
        replace,
        elements: injections
      });
    });
    return insertions;
  }
  function insertElementsAtOffsets(list, insertions) {
    var inserted = 0;
    insertions.sort(function(a2, b) {
      return a2.offset - b.offset;
    });
    insertions.forEach(function(insertion) {
      var remove = insertion.replace ? 1 : 0;
      var args = [insertion.offset + inserted, remove].concat(insertion.elements);
      list.splice.apply(list, args);
      inserted += insertion.elements.length - remove;
    });
  }
  module.exports = exports["default"];
})(mergeDomOrder, mergeDomOrder.exports);
var mergeDomOrderExports = mergeDomOrder.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _createClass = /* @__PURE__ */ function() {
    function defineProperties(target, props) {
      for (var i2 = 0; i2 < props.length; i2++) {
        var descriptor = props[i2];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  exports.default = function(elements, context) {
    var usemaps = context.querySelectorAll("img[usemap]");
    var maps = new Maps(context);
    var _elements = maps.extractAreasFromList(elements);
    if (!usemaps.length) {
      return _elements;
    }
    return (0, _mergeDomOrder2.default)({
      list: _elements,
      elements: usemaps,
      resolveElement: function resolveElement(image) {
        var name = image.getAttribute("usemap").slice(1);
        return maps.getAreasFor(name);
      }
    });
  };
  var _tabbable = tabbableExports;
  var _tabbable2 = _interopRequireDefault2(_tabbable);
  var _mergeDomOrder = mergeDomOrderExports;
  var _mergeDomOrder2 = _interopRequireDefault2(_mergeDomOrder);
  var _getDocument3 = getDocumentExports;
  var _getDocument22 = _interopRequireDefault2(_getDocument3);
  var _imageMap = imageMap;
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var Maps = function() {
    function Maps2(context) {
      _classCallCheck(this, Maps2);
      this._document = (0, _getDocument22.default)(context);
      this.maps = {};
    }
    _createClass(Maps2, [{
      key: "getAreasFor",
      value: function getAreasFor(name) {
        if (!this.maps[name]) {
          this.addMapByName(name);
        }
        return this.maps[name];
      }
    }, {
      key: "addMapByName",
      value: function addMapByName(name) {
        var map = (0, _imageMap.getMapByName)(name, this._document);
        if (!map) {
          return;
        }
        this.maps[map.name] = (0, _tabbable2.default)({ context: map });
      }
    }, {
      key: "extractAreasFromList",
      value: function extractAreasFromList(elements) {
        return elements.filter(function(element) {
          var nodeName = element.nodeName.toLowerCase();
          if (nodeName !== "area") {
            return true;
          }
          var map = element.parentNode;
          if (!this.maps[map.name]) {
            this.maps[map.name] = [];
          }
          this.maps[map.name].push(element);
          return false;
        }, this);
      }
    }]);
    return Maps2;
  }();
  module.exports = exports["default"];
})(tabsequence_sortArea, tabsequence_sortArea.exports);
var tabsequence_sortAreaExports = tabsequence_sortArea.exports;
var tabsequence_sortShadowed = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _createClass = /* @__PURE__ */ function() {
    function defineProperties(target, props) {
      for (var i2 = 0; i2 < props.length; i2++) {
        var descriptor = props[i2];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  exports.default = function(elements, context, sortElements) {
    var shadows = new Shadows(context, sortElements);
    var _elements = shadows.extractElements(elements);
    if (_elements.length === elements.length) {
      return sortElements(elements);
    }
    return shadows.sort(_elements);
  };
  var _shadowHost = shadowHostExports;
  var _shadowHost2 = _interopRequireDefault2(_shadowHost);
  var _mergeDomOrder = mergeDomOrderExports;
  var _mergeDomOrder2 = _interopRequireDefault2(_mergeDomOrder);
  var _tabindexValue = tabindexValueExports;
  var _tabindexValue2 = _interopRequireDefault2(_tabindexValue);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var Shadows = function() {
    function Shadows2(context, sortElements) {
      _classCallCheck(this, Shadows2);
      this.context = context;
      this.sortElements = sortElements;
      this.hostCounter = 1;
      this.inHost = {};
      this.inDocument = [];
      this.hosts = {};
      this.elements = {};
    }
    _createClass(Shadows2, [{
      key: "_registerHost",
      value: function _registerHost(host) {
        if (host._sortingId) {
          return;
        }
        host._sortingId = "shadow-" + this.hostCounter++;
        this.hosts[host._sortingId] = host;
        var parentHost = (0, _shadowHost2.default)({ context: host });
        if (parentHost) {
          this._registerHost(parentHost);
          this._registerHostParent(host, parentHost);
        } else {
          this.inDocument.push(host);
        }
      }
      // remember which host is the child of which other host
    }, {
      key: "_registerHostParent",
      value: function _registerHostParent(host, parent) {
        if (!this.inHost[parent._sortingId]) {
          this.inHost[parent._sortingId] = [];
        }
        this.inHost[parent._sortingId].push(host);
      }
      // remember which elements a host contains
    }, {
      key: "_registerElement",
      value: function _registerElement(element, host) {
        if (!this.elements[host._sortingId]) {
          this.elements[host._sortingId] = [];
        }
        this.elements[host._sortingId].push(element);
      }
      // remove shadowed elements from the sequence and register
      // the ShadowHosts they belong to so we know what to sort
      // later on
    }, {
      key: "extractElements",
      value: function extractElements(elements) {
        return elements.filter(function(element) {
          var host = (0, _shadowHost2.default)({ context: element });
          if (!host) {
            return true;
          }
          this._registerHost(host);
          this._registerElement(element, host);
          return false;
        }, this);
      }
      // inject hosts into the sequence, sort everything,
      // and recoursively replace hosts by its descendants
    }, {
      key: "sort",
      value: function sort(elements) {
        var _elements = this._injectHosts(elements);
        _elements = this._replaceHosts(_elements);
        this._cleanup();
        return _elements;
      }
      // merge ShadowHosts into the element lists of other ShadowHosts
      // or the document, then sort the individual lists
    }, {
      key: "_injectHosts",
      value: function _injectHosts(elements) {
        Object.keys(this.hosts).forEach(function(_sortingId) {
          var _list = this.elements[_sortingId];
          var _elements = this.inHost[_sortingId];
          var _context = this.hosts[_sortingId].shadowRoot;
          this.elements[_sortingId] = this._merge(_list, _elements, _context);
        }, this);
        return this._merge(elements, this.inDocument, this.context);
      }
    }, {
      key: "_merge",
      value: function _merge(list, elements, context) {
        var merged = (0, _mergeDomOrder2.default)({
          list,
          elements
        });
        return this.sortElements(merged, context);
      }
    }, {
      key: "_replaceHosts",
      value: function _replaceHosts(elements) {
        return (0, _mergeDomOrder2.default)({
          list: elements,
          elements: this.inDocument,
          resolveElement: this._resolveHostElement.bind(this)
        });
      }
    }, {
      key: "_resolveHostElement",
      value: function _resolveHostElement(host) {
        var merged = (0, _mergeDomOrder2.default)({
          list: this.elements[host._sortingId],
          elements: this.inHost[host._sortingId],
          resolveElement: this._resolveHostElement.bind(this)
        });
        var _tabindex = (0, _tabindexValue2.default)(host);
        if (_tabindex !== null && _tabindex > -1) {
          return [host].concat(merged);
        }
        return merged;
      }
    }, {
      key: "_cleanup",
      value: function _cleanup() {
        Object.keys(this.hosts).forEach(function(key2) {
          delete this.hosts[key2]._sortingId;
        }, this);
      }
    }]);
    return Shadows2;
  }();
  module.exports = exports["default"];
})(tabsequence_sortShadowed, tabsequence_sortShadowed.exports);
var tabsequence_sortShadowedExports = tabsequence_sortShadowed.exports;
var tabsequence_sortTabindex = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function(elements) {
    var map = {};
    var indexes = [];
    var normal = elements.filter(function(element) {
      var tabIndex = element.tabIndex;
      if (tabIndex === void 0) {
        tabIndex = (0, _tabindexValue2.default)(element);
      }
      if (tabIndex <= 0 || tabIndex === null || tabIndex === void 0) {
        return true;
      }
      if (!map[tabIndex]) {
        map[tabIndex] = [];
        indexes.push(tabIndex);
      }
      map[tabIndex].push(element);
      return false;
    });
    var _elements = indexes.sort().map(function(tabIndex) {
      return map[tabIndex];
    }).reduceRight(function(previous, current) {
      return current.concat(previous);
    }, normal);
    return _elements;
  };
  var _tabindexValue = tabindexValueExports;
  var _tabindexValue2 = _interopRequireDefault2(_tabindexValue);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  module.exports = exports["default"];
})(tabsequence_sortTabindex, tabsequence_sortTabindex.exports);
var tabsequence_sortTabindexExports = tabsequence_sortTabindex.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function() {
    var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, context = _ref.context, includeContext = _ref.includeContext, includeOnlyTabbable = _ref.includeOnlyTabbable, strategy = _ref.strategy;
    if (!supports2) {
      supports2 = (0, _supports3.default)();
    }
    var _context = (0, _nodeArray2.default)(context)[0] || document.documentElement;
    var elements = (0, _tabbable2.default)({
      context: _context,
      includeContext,
      includeOnlyTabbable,
      strategy
    });
    if (document.body.createShadowRoot && _platform2.default.is.BLINK) {
      elements = (0, _tabsequence4.default)(elements, _context, sortElements);
    } else {
      elements = sortElements(elements, _context);
    }
    if (includeContext) {
      elements = moveContextToBeginning(elements, _context);
    }
    return elements;
  };
  var _tabbable = tabbableExports;
  var _tabbable2 = _interopRequireDefault2(_tabbable);
  var _nodeArray = nodeArrayExports;
  var _nodeArray2 = _interopRequireDefault2(_nodeArray);
  var _platform = platformExports;
  var _platform2 = _interopRequireDefault2(_platform);
  var _tabsequence = tabsequence_sortAreaExports;
  var _tabsequence2 = _interopRequireDefault2(_tabsequence);
  var _tabsequence3 = tabsequence_sortShadowedExports;
  var _tabsequence4 = _interopRequireDefault2(_tabsequence3);
  var _tabsequence5 = tabsequence_sortTabindexExports;
  var _tabsequence6 = _interopRequireDefault2(_tabsequence5);
  var _supports2 = supportsExports;
  var _supports3 = _interopRequireDefault2(_supports2);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var supports2 = void 0;
  function moveContextToBeginning(elements, context) {
    var pos = elements.indexOf(context);
    if (pos > 0) {
      var tmp = elements.splice(pos, 1);
      return tmp.concat(elements);
    }
    return elements;
  }
  function sortElements(elements, _context) {
    if (supports2.tabsequenceAreaAtImgPosition) {
      elements = (0, _tabsequence2.default)(elements, _context);
    }
    elements = (0, _tabsequence6.default)(elements);
    return elements;
  }
  module.exports = exports["default"];
})(tabsequence, tabsequence.exports);
var tabsequenceExports = tabsequence.exports;
var key$1 = { exports: {} };
var key_binding = { exports: {} };
var keycode = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var keycode2 = {
    // Element Focus
    tab: 9,
    // Navigation
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    pageUp: 33,
    "page-up": 33,
    pageDown: 34,
    "page-down": 34,
    end: 35,
    home: 36,
    // Action
    enter: 13,
    escape: 27,
    space: 32,
    // Modifier
    shift: 16,
    capsLock: 20,
    "caps-lock": 20,
    ctrl: 17,
    alt: 18,
    meta: 91,
    // in firefox: 224
    // on mac (chrome): meta-left=91, meta-right=93
    // on win (IE11): meta-left=91, meta-right=92
    pause: 19,
    // Content Manipulation
    insert: 45,
    "delete": 46,
    backspace: 8,
    // the same logical key may be identified through different keyCodes
    _alias: {
      91: [92, 93, 224]
    }
  };
  for (var n2 = 1; n2 < 26; n2++) {
    keycode2["f" + n2] = n2 + 111;
  }
  for (var _n = 0; _n < 10; _n++) {
    var code = _n + 48;
    var numCode = _n + 96;
    keycode2[_n] = code;
    keycode2["num-" + _n] = numCode;
    keycode2._alias[code] = [numCode];
  }
  for (var _n2 = 0; _n2 < 26; _n2++) {
    var _code = _n2 + 65;
    var name = String.fromCharCode(_code).toLowerCase();
    keycode2[name] = _code;
  }
  exports.default = keycode2;
  module.exports = exports["default"];
})(keycode, keycode.exports);
var keycodeExports = keycode.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function(text) {
    return text.split(/\s+/).map(function(_text) {
      var tokens = _text.split("+");
      var _modifiers = resolveModifiers(tokens.slice(0, -1));
      var _keyCodes = resolveKey(tokens.slice(-1));
      return {
        keyCodes: _keyCodes,
        modifiers: _modifiers,
        matchModifiers: matchModifiers.bind(null, _modifiers)
      };
    });
  };
  var _keycode = keycodeExports;
  var _keycode2 = _interopRequireDefault2(_keycode);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var modifier = {
    alt: "altKey",
    ctrl: "ctrlKey",
    meta: "metaKey",
    shift: "shiftKey"
  };
  var modifierSequence = Object.keys(modifier).map(function(name) {
    return modifier[name];
  });
  function createExpectedModifiers(ignoreModifiers) {
    var value = ignoreModifiers ? null : false;
    return {
      altKey: value,
      ctrlKey: value,
      metaKey: value,
      shiftKey: value
    };
  }
  function resolveModifiers(modifiers) {
    var ignoreModifiers = modifiers.indexOf("*") !== -1;
    var expected = createExpectedModifiers(ignoreModifiers);
    modifiers.forEach(function(token) {
      if (token === "*") {
        return;
      }
      var value = true;
      var operator = token.slice(0, 1);
      if (operator === "?") {
        value = null;
      } else if (operator === "!") {
        value = false;
      }
      if (value !== true) {
        token = token.slice(1);
      }
      var propertyName = modifier[token];
      if (!propertyName) {
        throw new TypeError('Unknown modifier "' + token + '"');
      }
      expected[propertyName] = value;
    });
    return expected;
  }
  function resolveKey(key2) {
    var code = _keycode2.default[key2] || parseInt(key2, 10);
    if (!code || typeof code !== "number" || isNaN(code)) {
      throw new TypeError('Unknown key "' + key2 + '"');
    }
    return [code].concat(_keycode2.default._alias[code] || []);
  }
  function matchModifiers(expected, event) {
    return !modifierSequence.some(function(prop) {
      return typeof expected[prop] === "boolean" && Boolean(event[prop]) !== expected[prop];
    });
  }
  module.exports = exports["default"];
})(key_binding, key_binding.exports);
var key_bindingExports = key_binding.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function() {
    var map = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var bindings = {};
    var context = (0, _nodeArray2.default)(map.context)[0] || document.documentElement;
    delete map.context;
    var filter = (0, _nodeArray2.default)(map.filter);
    delete map.filter;
    var mapKeys = Object.keys(map);
    if (!mapKeys.length) {
      throw new TypeError("when/key requires at least one option key");
    }
    var registerBinding = function registerBinding2(event) {
      event.keyCodes.forEach(function(code) {
        if (!bindings[code]) {
          bindings[code] = [];
        }
        bindings[code].push(event);
      });
    };
    mapKeys.forEach(function(text) {
      if (typeof map[text] !== "function") {
        throw new TypeError('when/key requires option["' + text + '"] to be a function');
      }
      var addCallback = function addCallback2(event) {
        event.callback = map[text];
        return event;
      };
      (0, _key2.default)(text).map(addCallback).forEach(registerBinding);
    });
    var handleKeyDown = function handleKeyDown2(event) {
      if (event.defaultPrevented) {
        return;
      }
      if (filter.length) {
        var isParentOfElement = (0, _comparePosition.getParentComparator)({ element: event.target, includeSelf: true });
        if (filter.some(isParentOfElement)) {
          return;
        }
      }
      var key2 = event.keyCode || event.which;
      if (!bindings[key2]) {
        return;
      }
      bindings[key2].forEach(function(_event) {
        if (!_event.matchModifiers(event)) {
          return;
        }
        _event.callback.call(context, event, disengage);
      });
    };
    context.addEventListener("keydown", handleKeyDown, false);
    var disengage = function disengage2() {
      context.removeEventListener("keydown", handleKeyDown, false);
    };
    return { disengage };
  };
  var _key = key_bindingExports;
  var _key2 = _interopRequireDefault2(_key);
  var _nodeArray = nodeArrayExports;
  var _nodeArray2 = _interopRequireDefault2(_nodeArray);
  var _comparePosition = comparePosition;
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  module.exports = exports["default"];
})(key$1, key$1.exports);
var keyExports = key$1.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function() {
    var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, context = _ref.context;
    if (!context) {
      context = document.documentElement;
    }
    (0, _tabsequence2.default)();
    return (0, _key2.default)({
      // Safari on OSX may require ALT+TAB to reach links,
      // see https://github.com/medialize/ally.js/issues/146
      "?alt+?shift+tab": function altShiftTab(event) {
        event.preventDefault();
        var sequence = (0, _tabsequence2.default)({
          context
        });
        var backward = event.shiftKey;
        var first = sequence[0];
        var last = sequence[sequence.length - 1];
        var source = backward ? first : last;
        var target = backward ? last : first;
        if ((0, _activeElement2.default)(source)) {
          target.focus();
          return;
        }
        var currentIndex = void 0;
        var found = sequence.some(function(element, index2) {
          if (!(0, _activeElement2.default)(element)) {
            return false;
          }
          currentIndex = index2;
          return true;
        });
        if (!found) {
          first.focus();
          return;
        }
        var offset2 = backward ? -1 : 1;
        sequence[currentIndex + offset2].focus();
      }
    });
  };
  var _activeElement = activeElementExports;
  var _activeElement2 = _interopRequireDefault2(_activeElement);
  var _tabsequence = tabsequenceExports;
  var _tabsequence2 = _interopRequireDefault2(_tabsequence);
  var _key = keyExports;
  var _key2 = _interopRequireDefault2(_key);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  module.exports = exports["default"];
})(tabFocus, tabFocus.exports);
var tabFocusExports = tabFocus.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _disabled = disabledExports;
  var _disabled2 = _interopRequireDefault2(_disabled);
  var _hidden = hiddenExports;
  var _hidden2 = _interopRequireDefault2(_hidden);
  var _tabFocus = tabFocusExports;
  var _tabFocus2 = _interopRequireDefault2(_tabFocus);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  exports.default = {
    disabled: _disabled2.default,
    hidden: _hidden2.default,
    tabFocus: _tabFocus2.default
  };
  module.exports = exports["default"];
})(_maintain, _maintain.exports);
var _maintainExports = _maintain.exports;
const maintain = /* @__PURE__ */ getDefaultExportFromCjs(_maintainExports);
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const eventOnce = { once: true };
const cssDuration = (d) => `${d}ms`;
addEventListener("load", () => {
  addEventListener("resize", debounce(() => {
    Slider.instances.forEach((i2) => i2.handleResize());
  }, 250));
});
const requiredElements = [
  "container",
  "trackContainer",
  "track",
  "slides"
];
const _Slider = class _Slider {
  // constructor(container, title, trackContainer, track, slides, config, debug = false) {
  constructor(elements, config2, debug = false) {
    const options = Object.assign({}, _Slider.defaults, config2);
    this.debug = debug;
    this.options = options;
    this.slide = null;
    this.index = null;
    this.transitioning = false;
    if (!hasRequiredProps(requiredElements)) {
      logError$1(this, "Missing a required Element");
    }
    if (!elements.slides.length) {
      logError$1(this, "Missing slides");
    }
    this.slides = [...elements.slides].map((element, index2) => {
      return {
        element,
        index: index2,
        number: index2 + 1
      };
    });
    this.elements = {
      ...elements,
      ...this.createControls(elements.controlContext || elements.container),
      ...this.createNav(elements.navContext || elements.container)
    };
    this.transition = options.transition ? options.transitionFade || reduceMotion ? this.fadeTransition : this.slideTransition : this.noTransition;
    this.setup();
    this.goto(0, null, "init");
    log(this, "Slider Instance Created", this);
    _Slider.instances.push(this);
  }
  /**
   * Sliding mechanism needs translate updated on resize
   */
  handleResize() {
    const { slide, transition, slideTransition } = this;
    if (transition === slideTransition && slide) {
      this.translateTo(slide.element.offsetLeft, 0);
    }
  }
  /**
   * Goto to the previous slide
   */
  previous(event) {
    const { index: lastIndex, slides } = this;
    const last = slides.length - 1;
    const prev = lastIndex - 1;
    const index2 = prev < 0 ? last : prev;
    this.emit("previous", [event, index2]);
    this.goto(index2, event, "previous");
  }
  /**
   * Goto to the next slide
   */
  next(event) {
    const { index: lastIndex, slides } = this;
    const next = lastIndex + 1;
    const index2 = next > slides.length - 1 ? 0 : next;
    this.emit("next", [event, index2]);
    this.goto(index2, event, "next");
  }
  /**
   *  Makes sure that no matter what the callback is called if transition event
   * doesn't start or fails to finish/cancel
   * @param {number} element
   * @param {number} duration Duration to wait for complete 
   * @param {Function} beginTransition Css changes to begin/start transtion 
   */
  ensureTranstionEnds(element, duration, beginTransition) {
    return new Promise((resolve2) => {
      const tid = {};
      const onStart = () => {
        clearTimeout(tid.start);
        tid.end = setTimeout(onComplete, duration + 500);
      };
      const onComplete = () => {
        clearTimeout(tid.start);
        clearTimeout(tid.end);
        element.removeEventListener("transitionrun", onStart, eventOnce);
        element.removeEventListener("transitionend", onComplete, eventOnce);
        element.removeEventListener("transitioncancel", onComplete, eventOnce);
        resolve2();
      };
      element.addEventListener("transitionrun", onStart, eventOnce);
      element.addEventListener("transitionend", onComplete, eventOnce);
      element.addEventListener("transitioncancel", onComplete, eventOnce);
      tid.start = setTimeout(onComplete, duration + 500);
      element.style.transitionDuration = cssDuration(duration);
      beginTransition();
      if (!duration) {
        onComplete();
      }
    });
  }
  /**
   * Translate the track to X
   */
  translateTo(x, duration) {
    const { track } = this.elements;
    const set = () => track.style.transform = `translateX(-${x}px)`;
    track.style.willChange = "transform";
    return this.ensureTranstionEnds(track, duration, set).then(() => {
      track.style.willChange = "auto";
    });
  }
  /**
   * Show's a specifc slide and hides others, except when passing true to show all
   * then all slides will visible
   */
  setVisibility(activeSlide, showAll) {
    if (!showAll) {
      activeSlide.element.style.visibility = "visible";
    }
    this.slides.forEach((slide) => {
      if (slide !== activeSlide) {
        slide.element.style.visibility = showAll ? "visible" : "hidden";
      }
    });
  }
  /**
   * Perform a fade on a single slide
   */
  fadeSlide(slide, visible2) {
    const { options } = this;
    const { element } = slide;
    const duration = visible2 ? options.transitionDuration : options.transitionDurationExit;
    return this.ensureTranstionEnds(element, duration, () => {
      element.style.opacity = visible2 ? "1" : "0";
    });
  }
  /**
   * Handler for the entire slide transtion
   */
  async slideTransition({ slide, index: index2, old, oldIndex, triggerType }) {
    const count = this.slides.length;
    const reverse = triggerType === "previous";
    const lastIndex = count - 1;
    const lastToFirst = index2 === 0 && oldIndex === lastIndex;
    const firstToLast = index2 === lastIndex && oldIndex === 0;
    let switchSlide;
    let duration = this.options.transitionDuration;
    if (oldIndex && !lastToFirst && !firstToLast) {
      duration = duration * Math.abs(oldIndex - index2);
    }
    if (count < 3) {
      if (lastToFirst && !reverse) {
        switchSlide = old;
      } else if (firstToLast) {
        switchSlide = reverse ? slide : old;
      }
    } else {
      if (lastToFirst) {
        switchSlide = old;
      } else if (firstToLast) {
        switchSlide = slide;
      }
    }
    this.setVisibility(null, true);
    if (switchSlide) {
      switchSlide.element.style.order = "-1";
      await this.translateTo(lastToFirst ? 0 : old.element.offsetLeft, 0);
    }
    await this.translateTo(slide.element.offsetLeft, duration);
    if (switchSlide) {
      switchSlide.element.style.order = "0";
      await this.translateTo(slide.element.offsetLeft, 0);
    }
    this.setVisibility(slide, false);
  }
  /**
   * Handler for the entire fade transtion
   */
  async fadeTransition({ slide, old }) {
    this.setVisibility(null, true);
    if (old) {
      await this.fadeSlide(old, false);
      old.element.style.order = "0";
    }
    slide.element.style.order = "-1";
    await this.fadeSlide(slide, true);
    this.setVisibility(slide, false);
  }
  /**
   * Handler for the entire NO transtion
   */
  noTransition({ slide, old }) {
    this.setVisibility(slide, false);
    if (old) {
      old.element.style.order = "0";
    }
    slide.element.style.order = "-1";
    return Promise.resolve();
  }
  goto(index2, event, triggerType) {
    const {
      slide: old,
      index: oldIndex,
      slides,
      elements
    } = this;
    const isInit = triggerType === "init";
    const slide = slides[index2];
    const activeClass = this.getClass("nav-button--active");
    const transitionClass = this.getClass("transition", true);
    const to = { slide, index: index2, old, oldIndex, triggerType };
    if (index2 === oldIndex) {
      logWarning(this, "Could not goto slide, still performing transition");
      return;
    }
    if (this.transitioning) {
      logWarning(this, "Cancel goto(), same slide index as current slide");
      return;
    }
    const lockInteractives = maintain.disabled({ context: this.elements.track });
    this.transitioning = true;
    if (old)
      old.navButton.classList.remove(activeClass);
    slide.navButton.classList.add(activeClass);
    elements.container.classList.add(transitionClass);
    this.transition(to).then(() => {
      this.index = index2;
      this.slide = slide;
      this.transitioning = false;
      elements.container.classList.remove(transitionClass);
      lockInteractives.disengage();
      if (!isInit) {
        slide.element.focus();
        this.emit("goto", [event, index2, slide]);
      }
    });
  }
  setup() {
    const { container: container2, track, trackContainer } = this.elements;
    const trackCss = trimWhitespace(this.trackCss());
    const trackContainerStyles = trimWhitespace(this.trackContainerStyles());
    const slideCss = trimWhitespace(this.slideCss());
    track.setAttribute("style", trackCss);
    trackContainer.setAttribute("style", trackContainerStyles);
    this.slides.forEach((slide) => {
      slide.element.setAttribute("style", slideCss);
      slide.element.setAttribute("tabindex", "-1");
    });
    container2.classList.add(this.getClass());
  }
  trackContainerStyles() {
    return `
      overflow: hidden;
    `;
  }
  transitionCss(property) {
    const { transitionTimingFunction, transitionDuration } = this.options;
    return `
      transition-property: ${property};
      transition-duration: ${cssDuration(transitionDuration)};
      transition-timing-function: ${transitionTimingFunction};
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
    const fadingTransition = this.transition === this.fadeTransition;
    return `
      width: 100%;
      flex: 0 0 100%;
      ${fadingTransition ? this.transitionCss("opacity") : ""}
      opacity: ${fadingTransition ? "0" : "1"}
    `;
  }
  getClass(child, modifier) {
    const { namespace } = this.options;
    if (modifier) {
      return `${namespace}--${child}`;
    } else if (child) {
      return `${namespace}__${child}`;
    } else {
      return namespace;
    }
  }
  createControlButton(action) {
    const button = document.createElement("button");
    button.classList.add(this.getClass("control-button"));
    button.classList.add(this.getClass(`control-button--${action}`));
    button.setAttribute("data-slider-control", action);
    button.setAttribute("type", "button");
    button.innerHTML = this.getControlContent(action);
    return button;
  }
  createControls(context) {
    const controls = document.createElement("ul");
    const previousItem = document.createElement("li");
    const nextItem = document.createElement("li");
    const previous = this.createControlButton("previous");
    const next = this.createControlButton("next");
    controls.classList.add(this.getClass("controls"));
    previousItem.appendChild(previous);
    nextItem.appendChild(next);
    controls.appendChild(previousItem);
    controls.appendChild(nextItem);
    previous.addEventListener("click", this.previous.bind(this));
    next.addEventListener("click", this.next.bind(this));
    context.appendChild(controls);
    return {
      controls,
      previousItem,
      nextItem,
      previous,
      next
    };
  }
  createNav(container2) {
    const nav = document.createElement("ul");
    const navButtons = this.slides.map(this.createNavButton.bind(this));
    const navItems = navButtons.map((button) => {
      const item = document.createElement("li");
      item.appendChild(button);
      nav.appendChild(item);
      return item;
    });
    nav.classList.add(this.getClass("nav"));
    container2.appendChild(nav);
    return {
      nav,
      navButtons,
      navItems
    };
  }
  createNavButton(slide, index2) {
    const button = document.createElement("button");
    button.classList.add(this.getClass("nav-button"));
    button.setAttribute("type", "button");
    button.innerHTML = this.getNavContent(slide.number);
    slide.navButton = button;
    button.addEventListener("click", this.goto.bind(this, index2));
    return button;
  }
  getControlContent(action) {
    return `
      <span class="hidden-visually">${action}</span>
      <span aria-hidden="true">${action === "next" ? "→" : "←"}</span>
    `;
  }
  getNavContent(number) {
    return `<span class="hidden-visually">Item</span> <span>${number}</span>`;
  }
  emit(name, args) {
    if (this.options.events[name]) {
      this.options.events[name].apply(this, args);
    }
  }
};
__publicField(_Slider, "instances", []);
__publicField(_Slider, "defaults", {
  classAccessiblyHidden: "hidden-visually",
  namespace: "Slider",
  events: {},
  transition: true,
  transitionFade: false,
  transitionDuration: 700,
  transitionDurationExit: 400,
  transitionTimingFunction: "ease-in-out"
  // transition: true
});
let Slider = _Slider;
const index$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Slider
}, Symbol.toStringTag, { value: "Module" }));
function setHeights(element) {
  const tabs = [...element.children];
  const panels = tabs.map((n2) => document.querySelector(`[aria-labelledby="${n2.id}"]`));
  const parent = panels[0].parentElement;
  const images = [...parent.querySelectorAll("img")];
  const imagePromises = images.map((image) => imagePromise(image));
  function imagePromise(image) {
    return new Promise((resolve2, reject) => {
      image.onload = () => resolve2(image);
      image.onerror = reject;
    });
  }
  Promise.all(imagePromises).then(() => {
    const heights = panels.map((panel) => panel.offsetHeight);
    const max2 = Math.max(...heights);
    panels.forEach((panel) => panel.style.minHeight = `${max2}px`);
  });
}
var ariaTablist_min = { exports: {} };
(function(module, exports) {
  !function(t2, e2) {
    module.exports = e2();
  }(window, function() {
    return function(t2) {
      var e2 = {};
      function i2(a2) {
        if (e2[a2])
          return e2[a2].exports;
        var s2 = e2[a2] = { i: a2, l: false, exports: {} };
        return t2[a2].call(s2.exports, s2, s2.exports, i2), s2.l = true, s2.exports;
      }
      return i2.m = t2, i2.c = e2, i2.d = function(t3, e3, a2) {
        i2.o(t3, e3) || Object.defineProperty(t3, e3, { enumerable: true, get: a2 });
      }, i2.r = function(t3) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t3, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t3, "__esModule", { value: true });
      }, i2.t = function(t3, e3) {
        if (1 & e3 && (t3 = i2(t3)), 8 & e3)
          return t3;
        if (4 & e3 && "object" == typeof t3 && t3 && t3.__esModule)
          return t3;
        var a2 = /* @__PURE__ */ Object.create(null);
        if (i2.r(a2), Object.defineProperty(a2, "default", { enumerable: true, value: t3 }), 2 & e3 && "string" != typeof t3)
          for (var s2 in t3)
            i2.d(a2, s2, (function(e4) {
              return t3[e4];
            }).bind(null, s2));
        return a2;
      }, i2.n = function(t3) {
        var e3 = t3 && t3.__esModule ? function() {
          return t3.default;
        } : function() {
          return t3;
        };
        return i2.d(e3, "a", e3), e3;
      }, i2.o = function(t3, e3) {
        return Object.prototype.hasOwnProperty.call(t3, e3);
      }, i2.p = "", i2(i2.s = 0);
    }([function(t2, e2, i2) {
      i2.r(e2), i2.d(e2, "AriaTablist", function() {
        return x;
      });
      var a2 = 35, s2 = 36, n2 = 37, r2 = 38, o2 = 39, l2 = 40, h = 46, b = 13, c = 32, u = { 37: -1, 38: -1, 39: 1, 40: 1 }, d = function() {
        function t3(t4) {
          this.tabs = t4.tabs, this.panels = t4.panels, this.options = t4.options, this.open = this.open.bind(t4), this.close = this.close.bind(t4), this.delete = this.delete.bind(t4), this.destroy = this.destroy.bind(t4), t4.tablist.ariaTablist = this;
        }
        return t3.prototype.open = function(t4, e3) {
          this.checkMultiple(), this.activateTabWithTimer.apply(this, [t4, e3, true]);
        }, t3.prototype.close = function(t4, e3) {
          this.checkMultiple(), this.deactivateTab.apply(this, [t4, e3, true]), this.makeFocusable();
        }, t3.prototype.delete = function(t4) {
          this.determineDeletable.call(this, t4);
        }, t3.prototype.destroy = function() {
          this.destroy.call(this);
        }, t3;
      }(), p = function(t3) {
        for (var e3 in void 0 === t3 && (t3 = {}), this.delay = 0, this.deletable = false, this.focusableTabs = false, this.focusablePanels = true, this.arrowActivation = false, this.allArrows = false, this.tabSelector = '[role="tab"]', this.tabindex = 0, t3)
          t3.hasOwnProperty(e3) && void 0 !== t3[e3] && (this[e3] = t3[e3]);
      };
      function f(t3) {
        t3 && "function" == typeof t3.preventDefault && t3.preventDefault();
      }
      function v(t3, e3) {
        return t3.getAttribute && t3.getAttribute(e3) || "";
      }
      function y(t3, e3, i3) {
        t3 && v(t3, e3) !== i3 && t3.setAttribute && t3.setAttribute(e3, i3);
      }
      function T(t3, e3) {
        t3 && e3 && t3.removeAttribute && e3.split(" ").forEach(function(e4) {
          return e4 && t3.removeAttribute(e4);
        });
      }
      var m = 0, g = function() {
        function t3(t4, e3) {
          if (this.tabs = [], this.panels = [], t4 && 1 === t4.nodeType) {
            var i3 = t4.ariaTablist;
            i3 && "function" == typeof i3.destroy && i3.destroy(), m += 1, this.tablist = t4, this.options = new p(e3), this.api = new d(this), this.init();
          }
        }
        return t3.prototype.checkMultiple = function() {
          this.multiple = "true" === v(this.tablist, "aria-multiselectable");
        }, t3.prototype.triggerOptionCallback = function(t4, e3) {
          if (void 0 === e3 && (e3 = []), this.options && "function" == typeof this.options[t4])
            return this.options[t4].apply(this.api, e3);
        }, t3.prototype.makeFocusable = function() {
          for (var t4 = "" + (this.options.tabindex || 0), e3 = 0, i3 = this.tabs.length; e3 < i3; e3 += 1)
            if (v(this.tabs[e3], "tabindex") === t4)
              return;
          y(this.tabs[0], "tabindex", t4);
        }, t3.prototype.setCoreAttributes = function(t4, e3, i3) {
          var a3 = this.options.tabindex || "0";
          this.options.focusableTabs && y(t4, "tabindex", a3), this.options.focusablePanels && y(e3, "tabindex", a3), t4.id || y(t4, "id", "aria-tablist-" + m + "-tab-" + i3), e3.id || y(e3, "id", "aria-tablist-" + m + "-panel-" + i3), y(t4, "role", "tab"), y(e3, "role", "tabpanel"), y(t4, "aria-controls", e3.id), y(e3, "aria-labelledby", t4.id);
        }, t3.prototype.getTabPanel = function(t4) {
          var e3 = "number" == typeof t4 ? this.tabs[t4] : t4;
          if (!e3 || 1 !== e3.nodeType)
            return null;
          var i3 = "number" == typeof t4 ? this.panels[t4] : null;
          if (i3)
            return i3;
          var a3 = v(e3, "aria-controls");
          return a3 || (a3 = v(e3, "data-controls")), a3 && (i3 = document.getElementById(a3)), i3 || (a3 && T(e3, "aria-controls"), e3.id && (i3 = document.querySelector('[aria-labelledby="' + e3.id + '"]')), i3 || (i3 = document.querySelector('[data-labelledby="' + e3.id + '"]'))), i3;
        }, t3.prototype.generateArrays = function(t4) {
          this.tabs.splice(0), this.panels.splice(0);
          var e3 = this.tablist.querySelectorAll(this.options.tabSelector);
          t4 && !e3.length && (e3 = this.tablist.childNodes);
          for (var i3 = 0, a3 = e3.length; i3 < a3; i3 += 1) {
            var s3 = e3[i3];
            if (s3 && 1 === s3.nodeType && !(this.panels.indexOf(s3) > -1)) {
              var n3 = this.getTabPanel(s3);
              n3 ? (this.tabs.push(s3), this.panels.push(n3), this.setCoreAttributes(s3, n3, i3), s3._ariaTablistTabIndex = this.tabs.length - 1) : "tab" === v(s3, "role") && T(s3, "role");
            }
          }
        }, t3.prototype.elementIsTab = function(t4) {
          return !!(t4 && this.tabs.indexOf(t4) > -1);
        }, t3.prototype.addListenersToTab = function(t4) {
          var e3 = this.tabs[t4];
          e3.addEventListener("keydown", this.tabKeydownEvent), e3.addEventListener("keyup", this.tabKeyupEvent), e3.addEventListener("click", this.tabClickEvent);
        }, t3.prototype.tabClickEvent = function(t4) {
          var e3 = t4.target;
          do {
            if (this.elementIsTab(e3))
              return this.checkMultiple(), f(t4), this.activateTabWithTimer(e3, false);
            e3 = e3.parentElement || e3.parentNode;
          } while (null !== e3 && 1 === e3.nodeType);
        }, t3.prototype.tabKeydownEvent = function(t4) {
          if (this.elementIsTab(t4.target))
            switch (t4.keyCode) {
              case a2:
                f(t4), this.focusLastTab();
                break;
              case s2:
                f(t4), this.focusFirstTab();
                break;
              case r2:
              case l2:
              case n2:
              case o2:
                this.processArrowPress(t4);
                break;
              case c:
              case b:
                f(t4);
            }
        }, t3.prototype.tabKeyupEvent = function(t4) {
          var e3 = t4.target;
          if (this.elementIsTab(e3))
            switch (t4.keyCode) {
              case h:
                this.determineDeletable(e3);
                break;
              case b:
              case c:
                this.checkMultiple(), f(t4), this.activateTabWithTimer(e3);
            }
        }, t3.prototype.processArrowPress = function(t4) {
          var e3 = t4.keyCode;
          (this.options.allArrows || ("vertical" === v(this.tablist, "aria-orientation") ? e3 === r2 || e3 === l2 : e3 === n2 || e3 === o2)) && this.switchTabOnArrowPress(t4);
        }, t3.prototype.switchTabOnArrowPress = function(t4) {
          var e3 = t4.keyCode, i3 = u[e3], a3 = t4.target._ariaTablistTabIndex;
          if (i3 && "number" == typeof a3) {
            f(t4);
            var s3 = (e3 === n2 || e3 === o2) && ("rtl" === document.dir || "rtl" === this.tablist.dir);
            s3 && "ltr" !== this.tablist.dir && (i3 *= -1);
            var h2 = a3 + i3;
            this.tabs[h2] ? this.focusTab(h2) : e3 === n2 || e3 === r2 ? s3 ? this.focusFirstTab() : this.focusLastTab() : e3 !== o2 && e3 != l2 || (s3 ? this.focusLastTab() : this.focusFirstTab());
          }
        }, t3.prototype.getTab = function(t4) {
          return "number" == typeof t4 && this.elementIsTab(this.tabs[t4]) ? this.tabs[t4] : this.elementIsTab(t4) ? t4 : null;
        }, t3.prototype.activateTabWithTimer = function(t4, e3, i3) {
          var a3 = this;
          this.tabTimer && clearTimeout(this.tabTimer);
          var s3 = "number" == typeof this.options.delay ? this.options.delay : 0;
          this.tabTimer = setTimeout(function() {
            a3.activateTab(t4, e3, i3);
          }, s3);
        }, t3.prototype.activateTab = function(t4, e3, i3) {
          void 0 === e3 && (e3 = true), void 0 === i3 && (i3 = false);
          var a3 = this.getTab(t4);
          if (a3 && e3 && a3.focus(), a3 && (i3 || "true" !== v(a3, "aria-disabled"))) {
            var s3 = "true" === v(a3, "aria-selected");
            if (this.multiple && s3 && !i3)
              return this.deactivateTab(a3), void this.makeFocusable();
            this.multiple || this.deactivateTabs([a3]);
            var n3 = this.options.tabindex || "0";
            y(a3, "tabindex", n3), y(a3, "aria-selected", "true");
            var r3 = this.getTabPanel(t4);
            if (r3) {
              var o3 = "hidden" === v(r3, "hidden");
              T(r3, "hidden aria-hidden"), this.multiple && (y(r3, "aria-expanded", "true"), y(a3, "aria-expanded", "true")), this.options.focusablePanels && y(r3, "tabindex", n3), o3 && this.triggerOptionCallback("onOpen", [r3, a3]);
            }
          }
        }, t3.prototype.deactivateTab = function(t4, e3, i3) {
          void 0 === e3 && (e3 = false), void 0 === i3 && (i3 = false);
          var a3 = this.getTab(t4);
          if (a3 && (e3 && a3.focus(), y(a3, "tabindex", this.options.focusableTabs ? this.options.tabindex || "0" : "-1"), i3 || "true" !== v(a3, "aria-disabled"))) {
            y(a3, "aria-selected", "false");
            var s3 = this.getTabPanel(t4);
            if (s3) {
              var n3 = "hidden" === v(s3, "hidden");
              T(s3, "tabindex"), y(s3, "hidden", "hidden"), y(s3, "aria-hidden", "true"), this.multiple ? (y(a3, "aria-expanded", "false"), y(s3, "aria-expanded", "false")) : (T(s3, "aria-expanded"), T(a3, "aria-expanded")), n3 || this.triggerOptionCallback("onClose", [s3, a3]);
            }
          }
        }, t3.prototype.deactivateTabs = function(t4) {
          var e3 = this;
          void 0 === t4 && (t4 = []);
          var i3 = Array.isArray(t4);
          this.tabs.forEach(function(a3) {
            i3 && -1 !== t4.indexOf(a3) || e3.deactivateTab(a3, false, true);
          });
        }, t3.prototype.focusTab = function(t4) {
          var e3 = this.getTab(t4), i3 = this.options.arrowActivation;
          if (e3) {
            if (i3 && "true" !== v(e3, "aria-selected"))
              return void this.activateTabWithTimer(e3);
            e3.focus();
          }
        }, t3.prototype.focusFirstTab = function() {
          this.focusTab(0);
        }, t3.prototype.focusLastTab = function() {
          this.focusTab(this.tabs.length - 1);
        }, t3.prototype.determineDeletable = function(t4) {
          if (this.options.deletable) {
            var e3 = this.getTab(t4);
            if (e3 && "false" !== v(e3, "data-deletable")) {
              this.checkMultiple(), this.deleteTab(e3), this.generateArrays();
              var i3 = e3._ariaTablistTabIndex, a3 = i3 - 1 > -1 ? i3 - 1 : 0;
              this.multiple || "true" !== v(e3, "aria-selected") ? this.tabs[a3] && this.tabs[a3].focus() : this.activateTab(a3), this.makeFocusable(), this.triggerOptionCallback("onDelete", [e3]);
            }
          }
        }, t3.prototype.deleteTab = function(t4) {
          var e3 = this.getTabPanel(t4);
          t4.parentElement.removeChild(t4), e3 && e3.parentElement.removeChild(e3);
        }, t3.prototype.destroy = function() {
          var t4 = this, e3 = "aria-expanded aria-hidden hidden role tabindex";
          this.tabs.forEach(function(i3, a3) {
            i3.removeEventListener("keydown", t4.tabKeydownEvent), i3.removeEventListener("keyup", t4.tabKeyupEvent), i3.removeEventListener("click", t4.tabClickEvent), T(t4.panels[a3], e3), T(i3, e3), delete i3._ariaTablistTabIndex;
          }), this.tablist && (delete this.tablist.ariaTablist, T(this.tablist, "role")), this.panels.splice(0), this.tabs.splice(0), this.tablist = null;
        }, t3.prototype.init = function() {
          var t4 = this;
          this.checkMultiple(), this.generateArrays(true), this.tabKeydownEvent = this.tabKeydownEvent.bind(this), this.tabClickEvent = this.tabClickEvent.bind(this), this.tabKeyupEvent = this.tabKeyupEvent.bind(this);
          var e3 = [];
          this.tabs.forEach(function(i3, a3) {
            t4.addListenersToTab(a3), !("true" === v(i3, "aria-selected") || "true" === v(i3, "data-selected")) || !t4.multiple && e3.length || e3.push(i3);
          }), y(this.tablist, "role", "tablist"), this.tabs.length && (this.multiple || e3.length || e3.push(this.tabs[0]), this.deactivateTabs(e3), e3.forEach(function(e4) {
            return t4.activateTab(e4, false, true);
          }), this.makeFocusable()), this.triggerOptionCallback("onReady", [this.tablist]);
        }, t3;
      }();
      function x(t3, e3) {
        return new g(t3, e3).api;
      }
      e2.default = x;
    }]);
  });
})(ariaTablist_min);
var ariaTablist_minExports = ariaTablist_min.exports;
const AriaTablist = /* @__PURE__ */ getDefaultExportFromCjs(ariaTablist_minExports);
const instances = [];
function init$1() {
  window.addEventListener("load", () => {
    setupAll(document);
    instances.forEach(openByCurrentHash);
  });
  document.addEventListener(getName$1("pageModified"), (e2) => setupAll(e2.target));
}
function setupAll(context) {
  if (!context)
    return;
  const tablists = context.querySelectorAll("[data-site-tablist]");
  tablists.forEach(setup);
}
function openByCurrentHash({ options, ariaTablist }) {
  if (options.openByUrlHash) {
    const { hash } = window.location;
    if (hash && hash.length > 1) {
      const possibleId = hash.substring(1);
      ariaTablist.tabs.forEach((tab) => {
        if (possibleId === tab.id) {
          ariaTablist.open(tab);
        }
      });
    }
  }
}
function setup(element) {
  let options = {};
  const config2 = {};
  if (element.dataset.siteTablist) {
    try {
      options = JSON.parse(element.dataset.siteTablist);
    } catch (e2) {
      console.error("(JSON Parse for options fail)", element);
    }
  }
  if (options.vertical) {
    config2.allArrows = true;
  }
  ready();
  if (options.equalHeights) {
    setHeights(element);
  }
  function ready() {
    const instance = { element, options };
    instance.ariaTablist = AriaTablist(element, {
      onOpen(...args) {
        args.unshift(instance);
        handleOpen.apply(null, args);
      },
      ...config2
    });
    instances.push(instance);
  }
}
function handleOpen({ options }, panel, tab) {
  if (options.openByUrlHash && window.history) {
    window.history.replaceState(null, "", `#${tab.id}`);
  }
}
const index$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: init$1,
  instances,
  setup,
  setupAll
}, Symbol.toStringTag, { value: "Module" }));
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  id
}, Symbol.toStringTag, { value: "Module" }));
const ulu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  breakpoints: index$b,
  collapsible: index$a,
  events: index$c,
  flipcard: index$9,
  grid: index$8,
  helpers: index$7,
  modals: index$6,
  overflowScroller: index$5,
  popover: index$4,
  resizer: index$3,
  slider: index$2,
  tabs: index$1,
  utils: index
}, Symbol.toStringTag, { value: "Module" }));
var algoliasearchLite_umd = { exports: {} };
/*! algoliasearch-lite.umd.js | 4.23.3 | © Algolia, inc. | https://github.com/algolia/algoliasearch-client-javascript */
(function(module, exports) {
  !function(e2, t2) {
    module.exports = t2();
  }(commonjsGlobal, function() {
    function e2(e3, t3, r3) {
      return t3 in e3 ? Object.defineProperty(e3, t3, { value: r3, enumerable: true, configurable: true, writable: true }) : e3[t3] = r3, e3;
    }
    function t2(e3, t3) {
      var r3 = Object.keys(e3);
      if (Object.getOwnPropertySymbols) {
        var n3 = Object.getOwnPropertySymbols(e3);
        t3 && (n3 = n3.filter(function(t4) {
          return Object.getOwnPropertyDescriptor(e3, t4).enumerable;
        })), r3.push.apply(r3, n3);
      }
      return r3;
    }
    function r2(r3) {
      for (var n3 = 1; n3 < arguments.length; n3++) {
        var o3 = null != arguments[n3] ? arguments[n3] : {};
        n3 % 2 ? t2(Object(o3), true).forEach(function(t3) {
          e2(r3, t3, o3[t3]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r3, Object.getOwnPropertyDescriptors(o3)) : t2(Object(o3)).forEach(function(e3) {
          Object.defineProperty(r3, e3, Object.getOwnPropertyDescriptor(o3, e3));
        });
      }
      return r3;
    }
    function n2(e3, t3) {
      if (null == e3)
        return {};
      var r3, n3, o3 = function(e4, t4) {
        if (null == e4)
          return {};
        var r4, n4, o4 = {}, a4 = Object.keys(e4);
        for (n4 = 0; n4 < a4.length; n4++)
          r4 = a4[n4], t4.indexOf(r4) >= 0 || (o4[r4] = e4[r4]);
        return o4;
      }(e3, t3);
      if (Object.getOwnPropertySymbols) {
        var a3 = Object.getOwnPropertySymbols(e3);
        for (n3 = 0; n3 < a3.length; n3++)
          r3 = a3[n3], t3.indexOf(r3) >= 0 || Object.prototype.propertyIsEnumerable.call(e3, r3) && (o3[r3] = e3[r3]);
      }
      return o3;
    }
    function o2(e3, t3) {
      return function(e4) {
        if (Array.isArray(e4))
          return e4;
      }(e3) || function(e4, t4) {
        if (!(Symbol.iterator in Object(e4) || "[object Arguments]" === Object.prototype.toString.call(e4)))
          return;
        var r3 = [], n3 = true, o3 = false, a3 = void 0;
        try {
          for (var u2, i3 = e4[Symbol.iterator](); !(n3 = (u2 = i3.next()).done) && (r3.push(u2.value), !t4 || r3.length !== t4); n3 = true)
            ;
        } catch (e5) {
          o3 = true, a3 = e5;
        } finally {
          try {
            n3 || null == i3.return || i3.return();
          } finally {
            if (o3)
              throw a3;
          }
        }
        return r3;
      }(e3, t3) || function() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }();
    }
    function a2(e3) {
      return function(e4) {
        if (Array.isArray(e4)) {
          for (var t3 = 0, r3 = new Array(e4.length); t3 < e4.length; t3++)
            r3[t3] = e4[t3];
          return r3;
        }
      }(e3) || function(e4) {
        if (Symbol.iterator in Object(e4) || "[object Arguments]" === Object.prototype.toString.call(e4))
          return Array.from(e4);
      }(e3) || function() {
        throw new TypeError("Invalid attempt to spread non-iterable instance");
      }();
    }
    function u(e3) {
      var t3, r3 = "algoliasearch-client-js-".concat(e3.key), n3 = function() {
        return void 0 === t3 && (t3 = e3.localStorage || window.localStorage), t3;
      }, a3 = function() {
        return JSON.parse(n3().getItem(r3) || "{}");
      }, u2 = function(e4) {
        n3().setItem(r3, JSON.stringify(e4));
      }, i3 = function() {
        var t4 = e3.timeToLive ? 1e3 * e3.timeToLive : null, r4 = a3(), n4 = Object.fromEntries(Object.entries(r4).filter(function(e4) {
          return void 0 !== o2(e4, 2)[1].timestamp;
        }));
        if (u2(n4), t4) {
          var i4 = Object.fromEntries(Object.entries(n4).filter(function(e4) {
            var r5 = o2(e4, 2)[1], n5 = (/* @__PURE__ */ new Date()).getTime();
            return !(r5.timestamp + t4 < n5);
          }));
          u2(i4);
        }
      };
      return { get: function(e4, t4) {
        var r4 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function() {
          return Promise.resolve();
        } };
        return Promise.resolve().then(function() {
          i3();
          var t5 = JSON.stringify(e4);
          return a3()[t5];
        }).then(function(e5) {
          return Promise.all([e5 ? e5.value : t4(), void 0 !== e5]);
        }).then(function(e5) {
          var t5 = o2(e5, 2), n4 = t5[0], a4 = t5[1];
          return Promise.all([n4, a4 || r4.miss(n4)]);
        }).then(function(e5) {
          return o2(e5, 1)[0];
        });
      }, set: function(e4, t4) {
        return Promise.resolve().then(function() {
          var o3 = a3();
          return o3[JSON.stringify(e4)] = { timestamp: (/* @__PURE__ */ new Date()).getTime(), value: t4 }, n3().setItem(r3, JSON.stringify(o3)), t4;
        });
      }, delete: function(e4) {
        return Promise.resolve().then(function() {
          var t4 = a3();
          delete t4[JSON.stringify(e4)], n3().setItem(r3, JSON.stringify(t4));
        });
      }, clear: function() {
        return Promise.resolve().then(function() {
          n3().removeItem(r3);
        });
      } };
    }
    function i2(e3) {
      var t3 = a2(e3.caches), r3 = t3.shift();
      return void 0 === r3 ? { get: function(e4, t4) {
        var r4 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function() {
          return Promise.resolve();
        } }, n3 = t4();
        return n3.then(function(e5) {
          return Promise.all([e5, r4.miss(e5)]);
        }).then(function(e5) {
          return o2(e5, 1)[0];
        });
      }, set: function(e4, t4) {
        return Promise.resolve(t4);
      }, delete: function(e4) {
        return Promise.resolve();
      }, clear: function() {
        return Promise.resolve();
      } } : { get: function(e4, n3) {
        var o3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function() {
          return Promise.resolve();
        } };
        return r3.get(e4, n3, o3).catch(function() {
          return i2({ caches: t3 }).get(e4, n3, o3);
        });
      }, set: function(e4, n3) {
        return r3.set(e4, n3).catch(function() {
          return i2({ caches: t3 }).set(e4, n3);
        });
      }, delete: function(e4) {
        return r3.delete(e4).catch(function() {
          return i2({ caches: t3 }).delete(e4);
        });
      }, clear: function() {
        return r3.clear().catch(function() {
          return i2({ caches: t3 }).clear();
        });
      } };
    }
    function s2() {
      var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : { serializable: true }, t3 = {};
      return { get: function(r3, n3) {
        var o3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function() {
          return Promise.resolve();
        } }, a3 = JSON.stringify(r3);
        if (a3 in t3)
          return Promise.resolve(e3.serializable ? JSON.parse(t3[a3]) : t3[a3]);
        var u2 = n3(), i3 = o3 && o3.miss || function() {
          return Promise.resolve();
        };
        return u2.then(function(e4) {
          return i3(e4);
        }).then(function() {
          return u2;
        });
      }, set: function(r3, n3) {
        return t3[JSON.stringify(r3)] = e3.serializable ? JSON.stringify(n3) : n3, Promise.resolve(n3);
      }, delete: function(e4) {
        return delete t3[JSON.stringify(e4)], Promise.resolve();
      }, clear: function() {
        return t3 = {}, Promise.resolve();
      } };
    }
    function c(e3) {
      for (var t3 = e3.length - 1; t3 > 0; t3--) {
        var r3 = Math.floor(Math.random() * (t3 + 1)), n3 = e3[t3];
        e3[t3] = e3[r3], e3[r3] = n3;
      }
      return e3;
    }
    function l2(e3, t3) {
      return t3 ? (Object.keys(t3).forEach(function(r3) {
        e3[r3] = t3[r3](e3);
      }), e3) : e3;
    }
    function f(e3) {
      for (var t3 = arguments.length, r3 = new Array(t3 > 1 ? t3 - 1 : 0), n3 = 1; n3 < t3; n3++)
        r3[n3 - 1] = arguments[n3];
      var o3 = 0;
      return e3.replace(/%s/g, function() {
        return encodeURIComponent(r3[o3++]);
      });
    }
    var h = { WithinQueryParameters: 0, WithinHeaders: 1 };
    function m(e3, t3) {
      var r3 = e3 || {}, n3 = r3.data || {};
      return Object.keys(r3).forEach(function(e4) {
        -1 === ["timeout", "headers", "queryParameters", "data", "cacheable"].indexOf(e4) && (n3[e4] = r3[e4]);
      }), { data: Object.entries(n3).length > 0 ? n3 : void 0, timeout: r3.timeout || t3, headers: r3.headers || {}, queryParameters: r3.queryParameters || {}, cacheable: r3.cacheable };
    }
    var d = { Read: 1, Write: 2, Any: 3 }, p = 1, v = 2, g = 3;
    function y(e3) {
      var t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : p;
      return r2(r2({}, e3), {}, { status: t3, lastUpdate: Date.now() });
    }
    function b(e3) {
      return "string" == typeof e3 ? { protocol: "https", url: e3, accept: d.Any } : { protocol: e3.protocol || "https", url: e3.url, accept: e3.accept || d.Any };
    }
    var O = "GET", P = "POST";
    function q(e3, t3) {
      return Promise.all(t3.map(function(t4) {
        return e3.get(t4, function() {
          return Promise.resolve(y(t4));
        });
      })).then(function(e4) {
        var r3 = e4.filter(function(e5) {
          return function(e6) {
            return e6.status === p || Date.now() - e6.lastUpdate > 12e4;
          }(e5);
        }), n3 = e4.filter(function(e5) {
          return function(e6) {
            return e6.status === g && Date.now() - e6.lastUpdate <= 12e4;
          }(e5);
        }), o3 = [].concat(a2(r3), a2(n3));
        return { getTimeout: function(e5, t4) {
          return (0 === n3.length && 0 === e5 ? 1 : n3.length + 3 + e5) * t4;
        }, statelessHosts: o3.length > 0 ? o3.map(function(e5) {
          return b(e5);
        }) : t3 };
      });
    }
    function j(e3, t3, n3, o3) {
      var u2 = [], i3 = function(e4, t4) {
        if (e4.method === O || void 0 === e4.data && void 0 === t4.data)
          return;
        var n4 = Array.isArray(e4.data) ? e4.data : r2(r2({}, e4.data), t4.data);
        return JSON.stringify(n4);
      }(n3, o3), s3 = function(e4, t4) {
        var n4 = r2(r2({}, e4.headers), t4.headers), o4 = {};
        return Object.keys(n4).forEach(function(e5) {
          var t5 = n4[e5];
          o4[e5.toLowerCase()] = t5;
        }), o4;
      }(e3, o3), c2 = n3.method, l3 = n3.method !== O ? {} : r2(r2({}, n3.data), o3.data), f2 = r2(r2(r2({ "x-algolia-agent": e3.userAgent.value }, e3.queryParameters), l3), o3.queryParameters), h2 = 0, m2 = function t4(r3, a3) {
        var l4 = r3.pop();
        if (void 0 === l4)
          throw { name: "RetryError", message: "Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.", transporterStackTrace: A(u2) };
        var m3 = { data: i3, headers: s3, method: c2, url: S(l4, n3.path, f2), connectTimeout: a3(h2, e3.timeouts.connect), responseTimeout: a3(h2, o3.timeout) }, d2 = function(e4) {
          var t5 = { request: m3, response: e4, host: l4, triesLeft: r3.length };
          return u2.push(t5), t5;
        }, p2 = { onSuccess: function(e4) {
          return function(e5) {
            try {
              return JSON.parse(e5.content);
            } catch (t5) {
              throw /* @__PURE__ */ function(e6, t6) {
                return { name: "DeserializationError", message: e6, response: t6 };
              }(t5.message, e5);
            }
          }(e4);
        }, onRetry: function(n4) {
          var o4 = d2(n4);
          return n4.isTimedOut && h2++, Promise.all([e3.logger.info("Retryable failure", x(o4)), e3.hostsCache.set(l4, y(l4, n4.isTimedOut ? g : v))]).then(function() {
            return t4(r3, a3);
          });
        }, onFail: function(e4) {
          throw d2(e4), function(e5, t5) {
            var r4 = e5.content, n4 = e5.status, o4 = r4;
            try {
              o4 = JSON.parse(r4).message;
            } catch (e6) {
            }
            return /* @__PURE__ */ function(e6, t6, r5) {
              return { name: "ApiError", message: e6, status: t6, transporterStackTrace: r5 };
            }(o4, n4, t5);
          }(e4, A(u2));
        } };
        return e3.requester.send(m3).then(function(e4) {
          return function(e5, t5) {
            return function(e6) {
              var t6 = e6.status;
              return e6.isTimedOut || function(e7) {
                var t7 = e7.isTimedOut, r4 = e7.status;
                return !t7 && 0 == ~~r4;
              }(e6) || 2 != ~~(t6 / 100) && 4 != ~~(t6 / 100);
            }(e5) ? t5.onRetry(e5) : 2 == ~~(e5.status / 100) ? t5.onSuccess(e5) : t5.onFail(e5);
          }(e4, p2);
        });
      };
      return q(e3.hostsCache, t3).then(function(e4) {
        return m2(a2(e4.statelessHosts).reverse(), e4.getTimeout);
      });
    }
    function w(e3) {
      var t3 = { value: "Algolia for JavaScript (".concat(e3, ")"), add: function(e4) {
        var r3 = "; ".concat(e4.segment).concat(void 0 !== e4.version ? " (".concat(e4.version, ")") : "");
        return -1 === t3.value.indexOf(r3) && (t3.value = "".concat(t3.value).concat(r3)), t3;
      } };
      return t3;
    }
    function S(e3, t3, r3) {
      var n3 = T(r3), o3 = "".concat(e3.protocol, "://").concat(e3.url, "/").concat("/" === t3.charAt(0) ? t3.substr(1) : t3);
      return n3.length && (o3 += "?".concat(n3)), o3;
    }
    function T(e3) {
      return Object.keys(e3).map(function(t3) {
        return f("%s=%s", t3, (r3 = e3[t3], "[object Object]" === Object.prototype.toString.call(r3) || "[object Array]" === Object.prototype.toString.call(r3) ? JSON.stringify(e3[t3]) : e3[t3]));
        var r3;
      }).join("&");
    }
    function A(e3) {
      return e3.map(function(e4) {
        return x(e4);
      });
    }
    function x(e3) {
      var t3 = e3.request.headers["x-algolia-api-key"] ? { "x-algolia-api-key": "*****" } : {};
      return r2(r2({}, e3), {}, { request: r2(r2({}, e3.request), {}, { headers: r2(r2({}, e3.request.headers), t3) }) });
    }
    var N = function(e3) {
      var t3 = e3.appId, n3 = /* @__PURE__ */ function(e4, t4, r3) {
        var n4 = { "x-algolia-api-key": r3, "x-algolia-application-id": t4 };
        return { headers: function() {
          return e4 === h.WithinHeaders ? n4 : {};
        }, queryParameters: function() {
          return e4 === h.WithinQueryParameters ? n4 : {};
        } };
      }(void 0 !== e3.authMode ? e3.authMode : h.WithinHeaders, t3, e3.apiKey), a3 = function(e4) {
        var t4 = e4.hostsCache, r3 = e4.logger, n4 = e4.requester, a4 = e4.requestsCache, u2 = e4.responsesCache, i3 = e4.timeouts, s3 = e4.userAgent, c2 = e4.hosts, l3 = e4.queryParameters, f2 = { hostsCache: t4, logger: r3, requester: n4, requestsCache: a4, responsesCache: u2, timeouts: i3, userAgent: s3, headers: e4.headers, queryParameters: l3, hosts: c2.map(function(e5) {
          return b(e5);
        }), read: function(e5, t5) {
          var r4 = m(t5, f2.timeouts.read), n5 = function() {
            return j(f2, f2.hosts.filter(function(e6) {
              return 0 != (e6.accept & d.Read);
            }), e5, r4);
          };
          if (true !== (void 0 !== r4.cacheable ? r4.cacheable : e5.cacheable))
            return n5();
          var a5 = { request: e5, mappedRequestOptions: r4, transporter: { queryParameters: f2.queryParameters, headers: f2.headers } };
          return f2.responsesCache.get(a5, function() {
            return f2.requestsCache.get(a5, function() {
              return f2.requestsCache.set(a5, n5()).then(function(e6) {
                return Promise.all([f2.requestsCache.delete(a5), e6]);
              }, function(e6) {
                return Promise.all([f2.requestsCache.delete(a5), Promise.reject(e6)]);
              }).then(function(e6) {
                var t6 = o2(e6, 2);
                t6[0];
                return t6[1];
              });
            });
          }, { miss: function(e6) {
            return f2.responsesCache.set(a5, e6);
          } });
        }, write: function(e5, t5) {
          return j(f2, f2.hosts.filter(function(e6) {
            return 0 != (e6.accept & d.Write);
          }), e5, m(t5, f2.timeouts.write));
        } };
        return f2;
      }(r2(r2({ hosts: [{ url: "".concat(t3, "-dsn.algolia.net"), accept: d.Read }, { url: "".concat(t3, ".algolia.net"), accept: d.Write }].concat(c([{ url: "".concat(t3, "-1.algolianet.com") }, { url: "".concat(t3, "-2.algolianet.com") }, { url: "".concat(t3, "-3.algolianet.com") }])) }, e3), {}, { headers: r2(r2(r2({}, n3.headers()), { "content-type": "application/x-www-form-urlencoded" }), e3.headers), queryParameters: r2(r2({}, n3.queryParameters()), e3.queryParameters) }));
      return l2({ transporter: a3, appId: t3, addAlgoliaAgent: function(e4, t4) {
        a3.userAgent.add({ segment: e4, version: t4 });
      }, clearCache: function() {
        return Promise.all([a3.requestsCache.clear(), a3.responsesCache.clear()]).then(function() {
        });
      } }, e3.methods);
    }, C = function(e3) {
      return function(t3, r3) {
        return t3.method === O ? e3.transporter.read(t3, r3) : e3.transporter.write(t3, r3);
      };
    }, E = function(e3) {
      return function(t3) {
        var r3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n3 = { transporter: e3.transporter, appId: e3.appId, indexName: t3 };
        return l2(n3, r3.methods);
      };
    }, J = function(e3) {
      return function(t3, n3) {
        var o3 = t3.map(function(e4) {
          return r2(r2({}, e4), {}, { params: T(e4.params || {}) });
        });
        return e3.transporter.read({ method: P, path: "1/indexes/*/queries", data: { requests: o3 }, cacheable: true }, n3);
      };
    }, k = function(e3) {
      return function(t3, o3) {
        return Promise.all(t3.map(function(t4) {
          var a3 = t4.params, u2 = a3.facetName, i3 = a3.facetQuery, s3 = n2(a3, ["facetName", "facetQuery"]);
          return E(e3)(t4.indexName, { methods: { searchForFacetValues: F } }).searchForFacetValues(u2, i3, r2(r2({}, o3), s3));
        }));
      };
    }, I = function(e3) {
      return function(t3, r3, n3) {
        return e3.transporter.read({ method: P, path: f("1/answers/%s/prediction", e3.indexName), data: { query: t3, queryLanguages: r3 }, cacheable: true }, n3);
      };
    }, R = function(e3) {
      return function(t3, r3) {
        return e3.transporter.read({ method: P, path: f("1/indexes/%s/query", e3.indexName), data: { query: t3 }, cacheable: true }, r3);
      };
    }, F = function(e3) {
      return function(t3, r3, n3) {
        return e3.transporter.read({ method: P, path: f("1/indexes/%s/facets/%s/query", e3.indexName, t3), data: { facetQuery: r3 }, cacheable: true }, n3);
      };
    }, D = 1, W = 2, H = 3;
    var Q = function(e3) {
      return function(t3, n3) {
        var o3 = t3.map(function(e4) {
          return r2(r2({}, e4), {}, { threshold: e4.threshold || 0 });
        });
        return e3.transporter.read({ method: P, path: "1/indexes/*/recommendations", data: { requests: o3 }, cacheable: true }, n3);
      };
    };
    function L(e3, t3, n3) {
      var o3, a3 = { appId: e3, apiKey: t3, timeouts: { connect: 1, read: 2, write: 30 }, requester: { send: function(e4) {
        return new Promise(function(t4) {
          var r3 = new XMLHttpRequest();
          r3.open(e4.method, e4.url, true), Object.keys(e4.headers).forEach(function(t5) {
            return r3.setRequestHeader(t5, e4.headers[t5]);
          });
          var n4, o4 = function(e5, n5) {
            return setTimeout(function() {
              r3.abort(), t4({ status: 0, content: n5, isTimedOut: true });
            }, 1e3 * e5);
          }, a4 = o4(e4.connectTimeout, "Connection timeout");
          r3.onreadystatechange = function() {
            r3.readyState > r3.OPENED && void 0 === n4 && (clearTimeout(a4), n4 = o4(e4.responseTimeout, "Socket timeout"));
          }, r3.onerror = function() {
            0 === r3.status && (clearTimeout(a4), clearTimeout(n4), t4({ content: r3.responseText || "Network request failed", status: r3.status, isTimedOut: false }));
          }, r3.onload = function() {
            clearTimeout(a4), clearTimeout(n4), t4({ content: r3.responseText, status: r3.status, isTimedOut: false });
          }, r3.send(e4.data);
        });
      } }, logger: (o3 = H, { debug: function(e4, t4) {
        return D >= o3 && console.debug(e4, t4), Promise.resolve();
      }, info: function(e4, t4) {
        return W >= o3 && console.info(e4, t4), Promise.resolve();
      }, error: function(e4, t4) {
        return console.error(e4, t4), Promise.resolve();
      } }), responsesCache: s2(), requestsCache: s2({ serializable: false }), hostsCache: i2({ caches: [u({ key: "".concat("4.23.3", "-").concat(e3) }), s2()] }), userAgent: w("4.23.3").add({ segment: "Browser", version: "lite" }), authMode: h.WithinQueryParameters };
      return N(r2(r2(r2({}, a3), n3), {}, { methods: { search: J, searchForFacetValues: k, multipleQueries: J, multipleSearchForFacetValues: k, customRequest: C, initIndex: function(e4) {
        return function(t4) {
          return E(e4)(t4, { methods: { search: R, searchForFacetValues: F, findAnswers: I } });
        };
      }, getRecommendations: Q } }));
    }
    return L.version = "4.23.3", L;
  });
})(algoliasearchLite_umd);
var algoliasearchLite_umdExports = algoliasearchLite_umd.exports;
const algoliasearch = /* @__PURE__ */ getDefaultExportFromCjs(algoliasearchLite_umdExports);
var instantsearch_production_min = { exports: {} };
/*! InstantSearch.js 4.68.1 | © Algolia, Inc. and contributors; MIT License | https://github.com/algolia/instantsearch */
(function(module, exports) {
  !function(e2, t2) {
    module.exports = t2();
  }(commonjsGlobal, function() {
    function o2(t3, e3) {
      var n3, r3 = Object.keys(t3);
      return Object.getOwnPropertySymbols && (n3 = Object.getOwnPropertySymbols(t3), e3 && (n3 = n3.filter(function(e4) {
        return Object.getOwnPropertyDescriptor(t3, e4).enumerable;
      })), r3.push.apply(r3, n3)), r3;
    }
    function T(t3) {
      for (var e3 = 1; e3 < arguments.length; e3++) {
        var n3 = null != arguments[e3] ? arguments[e3] : {};
        e3 % 2 ? o2(Object(n3), true).forEach(function(e4) {
          E(t3, e4, n3[e4]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t3, Object.getOwnPropertyDescriptors(n3)) : o2(Object(n3)).forEach(function(e4) {
          Object.defineProperty(t3, e4, Object.getOwnPropertyDescriptor(n3, e4));
        });
      }
      return t3;
    }
    function A(e3) {
      return (A = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e4) {
        return typeof e4;
      } : function(e4) {
        return e4 && "function" == typeof Symbol && e4.constructor === Symbol && e4 !== Symbol.prototype ? "symbol" : typeof e4;
      })(e3);
    }
    function W(e3, t3) {
      if (!(e3 instanceof t3))
        throw new TypeError("Cannot call a class as a function");
    }
    function c(e3, t3) {
      for (var n3 = 0; n3 < t3.length; n3++) {
        var r3 = t3[n3];
        r3.enumerable = r3.enumerable || false, r3.configurable = true, "value" in r3 && (r3.writable = true), Object.defineProperty(e3, z(r3.key), r3);
      }
    }
    function D(e3, t3, n3) {
      return t3 && c(e3.prototype, t3), Object.defineProperty(e3, "prototype", { writable: false }), e3;
    }
    function E(e3, t3, n3) {
      return (t3 = z(t3)) in e3 ? Object.defineProperty(e3, t3, { value: n3, enumerable: true, configurable: true, writable: true }) : e3[t3] = n3, e3;
    }
    function m() {
      return (m = Object.assign ? Object.assign.bind() : function(e3) {
        for (var t3 = 1; t3 < arguments.length; t3++) {
          var n3, r3 = arguments[t3];
          for (n3 in r3)
            Object.prototype.hasOwnProperty.call(r3, n3) && (e3[n3] = r3[n3]);
        }
        return e3;
      }).apply(this, arguments);
    }
    function U(e3, t3) {
      if ("function" != typeof t3 && null !== t3)
        throw new TypeError("Super expression must either be null or a function");
      e3.prototype = Object.create(t3 && t3.prototype, { constructor: { value: e3, writable: true, configurable: true } }), Object.defineProperty(e3, "prototype", { writable: false }), t3 && B(e3, t3);
    }
    function $(e3) {
      return ($ = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e4) {
        return e4.__proto__ || Object.getPrototypeOf(e4);
      })(e3);
    }
    function B(e3, t3) {
      return (B = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e4, t4) {
        return e4.__proto__ = t4, e4;
      })(e3, t3);
    }
    function Q(e3) {
      if (null == e3)
        throw new TypeError("Cannot destructure " + e3);
    }
    function k(e3, t3) {
      if (null == e3)
        return {};
      var n3, r3 = function(e4, t4) {
        if (null == e4)
          return {};
        for (var n4, r4 = {}, i4 = Object.keys(e4), a4 = 0; a4 < i4.length; a4++)
          n4 = i4[a4], 0 <= t4.indexOf(n4) || (r4[n4] = e4[n4]);
        return r4;
      }(e3, t3);
      if (Object.getOwnPropertySymbols)
        for (var i3 = Object.getOwnPropertySymbols(e3), a3 = 0; a3 < i3.length; a3++)
          n3 = i3[a3], 0 <= t3.indexOf(n3) || Object.prototype.propertyIsEnumerable.call(e3, n3) && (r3[n3] = e3[n3]);
      return r3;
    }
    function y(e3) {
      if (void 0 === e3)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e3;
    }
    function q(n3) {
      var r3 = function() {
        if ("undefined" == typeof Reflect || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if ("function" == typeof Proxy)
          return true;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          })), true;
        } catch (e3) {
          return false;
        }
      }();
      return function() {
        var e3, t3 = $(n3), t3 = (e3 = r3 ? (e3 = $(this).constructor, Reflect.construct(t3, arguments, e3)) : t3.apply(this, arguments), this);
        if (e3 && ("object" == typeof e3 || "function" == typeof e3))
          return e3;
        if (void 0 !== e3)
          throw new TypeError("Derived constructors may only return object or undefined");
        return y(t3);
      };
    }
    function j(e3, t3) {
      return function(e4) {
        if (Array.isArray(e4))
          return e4;
      }(e3) || function(e4, t4) {
        var n3 = null == e4 ? null : "undefined" != typeof Symbol && e4[Symbol.iterator] || e4["@@iterator"];
        if (null != n3) {
          var r3, i3, a3, s3, o3 = [], c2 = true, u2 = false;
          try {
            if (a3 = (n3 = n3.call(e4)).next, 0 === t4) {
              if (Object(n3) !== n3)
                return;
              c2 = false;
            } else
              for (; !(c2 = (r3 = a3.call(n3)).done) && (o3.push(r3.value), o3.length !== t4); c2 = true)
                ;
          } catch (e5) {
            u2 = true, i3 = e5;
          } finally {
            try {
              if (!c2 && null != n3.return && (s3 = n3.return(), Object(s3) !== s3))
                return;
            } finally {
              if (u2)
                throw i3;
            }
          }
          return o3;
        }
      }(e3, t3) || V(e3, t3) || function() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }();
    }
    function w(e3) {
      return function(e4) {
        if (Array.isArray(e4))
          return K(e4);
      }(e3) || function(e4) {
        if ("undefined" != typeof Symbol && null != e4[Symbol.iterator] || null != e4["@@iterator"])
          return Array.from(e4);
      }(e3) || V(e3) || function() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }();
    }
    function V(e3, t3) {
      var n3;
      if (e3)
        return "string" == typeof e3 ? K(e3, t3) : "Map" === (n3 = "Object" === (n3 = Object.prototype.toString.call(e3).slice(8, -1)) && e3.constructor ? e3.constructor.name : n3) || "Set" === n3 ? Array.from(e3) : "Arguments" === n3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n3) ? K(e3, t3) : void 0;
    }
    function K(e3, t3) {
      (null == t3 || t3 > e3.length) && (t3 = e3.length);
      for (var n3 = 0, r3 = new Array(t3); n3 < t3; n3++)
        r3[n3] = e3[n3];
      return r3;
    }
    function z(e3) {
      e3 = function(e4, t3) {
        if ("object" != typeof e4 || null === e4)
          return e4;
        var n3 = e4[Symbol.toPrimitive];
        if (void 0 === n3)
          return ("string" === t3 ? String : Number)(e4);
        if ("object" != typeof (n3 = n3.call(e4, t3 || "default")))
          return n3;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }(e3, "string");
      return "symbol" == typeof e3 ? e3 : String(e3);
    }
    function R() {
    }
    function J(e3, t3) {
      return e3;
    }
    function h(e3, t3) {
      if (void 0 === e3 || "function" != typeof e3)
        throw new Error("The render function is not valid (received type ".concat(Object.prototype.toString.call(e3).slice(8, -1), ").\n\n").concat(t3));
    }
    function Z(e3) {
      var t3 = e3.helper, e3 = e3.attributesToClear, e3 = void 0 === e3 ? [] : e3, n3 = t3.state.setPage(0), n3 = e3.reduce(function(e4, t4) {
        return n3.isNumericRefined(t4) ? e4.removeNumericRefinement(t4) : n3.isHierarchicalFacet(t4) ? e4.removeHierarchicalFacetRefinement(t4) : n3.isDisjunctiveFacet(t4) ? e4.removeDisjunctiveFacetRefinement(t4) : n3.isConjunctiveFacet(t4) ? e4.removeFacetRefinement(t4) : e4;
      }, n3);
      return n3 = -1 !== e3.indexOf("query") ? n3.setQuery("") : n3;
    }
    var Y = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, X = /[&<>"']/g, G = RegExp(X.source);
    var ee = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" }, te = /&(amp|quot|lt|gt|#39);/g, ne = RegExp(te.source);
    function re(e3) {
      return e3 && ne.test(e3) ? e3.replace(te, function(e4) {
        return ee[e4];
      }) : e3;
    }
    function ie(e3) {
      if ("object" === A(t3 = e3) && null !== t3 && "[object Object]" === (null === (t3 = e3) ? void 0 === t3 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(t3))) {
        var t3;
        if (null === Object.getPrototypeOf(e3))
          return 1;
        for (var n3 = e3; null !== Object.getPrototypeOf(n3); )
          n3 = Object.getPrototypeOf(n3);
        return Object.getPrototypeOf(e3) === n3;
      }
    }
    var ae = { highlightPreTag: "__ais-highlight__", highlightPostTag: "__/ais-highlight__" }, u = { highlightPreTag: "<mark>", highlightPostTag: "</mark>" };
    function se(e3) {
      return ((e3 = e3) && G.test(e3) ? e3.replace(X, function(e4) {
        return Y[e4];
      }) : e3).replace(new RegExp(ae.highlightPreTag, "g"), u.highlightPreTag).replace(new RegExp(ae.highlightPostTag, "g"), u.highlightPostTag);
    }
    function oe(n3) {
      return ie(n3) && "string" != typeof n3.value ? Object.keys(n3).reduce(function(e3, t3) {
        return T(T({}, e3), {}, E({}, t3, oe(n3[t3])));
      }, {}) : Array.isArray(n3) ? n3.map(oe) : T(T({}, n3), {}, { value: se(n3.value) });
    }
    function ce(e3) {
      return void 0 === e3.__escaped && ((e3 = e3.map(function(e4) {
        e4 = m({}, (Q(e4), e4));
        return e4._highlightResult && (e4._highlightResult = oe(e4._highlightResult)), e4._snippetResult && (e4._snippetResult = oe(e4._snippetResult)), e4;
      })).__escaped = true), e3;
    }
    function ue(e3) {
      var t3 = u.highlightPreTag, n3 = u.highlightPostTag;
      return e3.map(function(e4) {
        return e4.isHighlighted ? t3 + e4.value + n3 : e4.value;
      }).join("");
    }
    function le(e3) {
      var h2 = e3.instantSearchInstance, f2 = e3.helper, m2 = e3.attribute, p2 = e3.widgetType;
      return function() {
        for (var e4 = arguments.length, t3 = new Array(e4), n3 = 0; n3 < e4; n3++)
          t3[n3] = arguments[n3];
        var r3, i3, a3, s3 = t3[1], o3 = t3[2], o3 = void 0 === o3 ? "Filter Applied" : o3, c2 = t3[3], c2 = void 0 === c2 ? {} : c2, u2 = j(t3[0].split(":"), 2), l3 = u2[0], u2 = u2[1], d2 = "string" == typeof m2 ? m2 : m2(s3);
        1 === t3.length && "object" === A(t3[0]) ? h2.sendEventToInsights(t3[0]) : "click" === l3 && 2 <= t3.length && t3.length <= 4 && (i3 = d2, a3 = s3, ((r3 = f2).state.isHierarchicalFacet(i3) ? r3.state.isHierarchicalFacetRefined(i3, a3) : r3.state.isConjunctiveFacet(i3) ? r3.state.isFacetRefined(i3, a3) : r3.state.isDisjunctiveFacetRefined(i3, a3)) || h2.sendEventToInsights({ insightsMethod: "clickedFilters", widgetType: p2, eventType: l3, eventModifier: u2, payload: T({ eventName: o3, index: f2.getIndex(), filters: ["".concat(d2, ":").concat(s3)] }, c2), attribute: d2 }));
      };
    }
    function de(e3) {
      return btoa(encodeURIComponent(JSON.stringify(e3)));
    }
    function he(e3) {
      return JSON.parse(decodeURIComponent(atob(e3)));
    }
    function fe(e3) {
      var n3, r3, i3, a3, s3, t3, o3, c2, u2 = e3.getIndex, l3 = e3.widgetType, d2 = (e3.methodName, e3.args), e3 = e3.instantSearchInstance;
      return 1 === d2.length && "object" === A(d2[0]) ? [d2[0]] : (t3 = j(d2[0].split(":"), 2), n3 = t3[0], r3 = t3[1], t3 = d2[1], i3 = d2[2], a3 = d2[3] || {}, !t3 || !("click" !== n3 && "conversion" !== n3 || i3) || 0 === (d2 = Array.isArray(t3) ? t3 : [t3]).length ? [] : (s3 = d2[0].__queryID, t3 = function(e4, t4) {
        for (var n4 = 1 < arguments.length && void 0 !== t4 ? t4 : 20, r4 = [], i4 = 0; i4 < Math.ceil(e4.length / n4); i4++)
          r4.push(e4.slice(i4 * n4, (i4 + 1) * n4));
        return r4;
      }(d2), o3 = t3.map(function(e4) {
        return e4.map(function(e5) {
          return e5.objectID;
        });
      }), c2 = t3.map(function(e4) {
        return e4.map(function(e5) {
          return e5.__position;
        });
      }), "view" === n3 ? "idle" !== e3.status ? [] : t3.map(function(e4, t4) {
        return { insightsMethod: "viewedObjectIDs", widgetType: l3, eventType: n3, payload: T({ eventName: i3 || "Hits Viewed", index: u2(), objectIDs: o3[t4] }, a3), hits: e4, eventModifier: r3 };
      }) : "click" === n3 ? t3.map(function(e4, t4) {
        return { insightsMethod: "clickedObjectIDsAfterSearch", widgetType: l3, eventType: n3, payload: T({ eventName: i3 || "Hit Clicked", index: u2(), queryID: s3, objectIDs: o3[t4], positions: c2[t4] }, a3), hits: e4, eventModifier: r3 };
      }) : "conversion" === n3 ? t3.map(function(e4, t4) {
        return { insightsMethod: "convertedObjectIDsAfterSearch", widgetType: l3, eventType: n3, payload: T({ eventName: i3 || "Hit Converted", index: u2(), queryID: s3, objectIDs: o3[t4] }, a3), hits: e4, eventModifier: r3 };
      }) : []));
    }
    function me(e3) {
      var r3 = e3.instantSearchInstance, i3 = e3.getIndex, a3 = e3.widgetType, s3 = {}, o3 = void 0;
      return function() {
        for (var e4 = arguments.length, t3 = new Array(e4), n3 = 0; n3 < e4; n3++)
          t3[n3] = arguments[n3];
        fe({ widgetType: a3, getIndex: i3, methodName: "sendEvent", args: t3, instantSearchInstance: r3 }).forEach(function(e5) {
          "click" === e5.eventType && "internal" === e5.eventModifier && s3[e5.eventType] || (s3[e5.eventType] = true, r3.sendEventToInsights(e5));
        }), clearTimeout(o3), o3 = setTimeout(function() {
          s3 = {};
        }, 0);
      };
    }
    function pe(e3) {
      var i3 = e3.getIndex, a3 = e3.widgetType, s3 = e3.instantSearchInstance;
      return function() {
        for (var e4 = arguments.length, t3 = new Array(e4), n3 = 0; n3 < e4; n3++)
          t3[n3] = arguments[n3];
        var r3 = fe({ widgetType: a3, getIndex: i3, methodName: "bindEvent", args: t3, instantSearchInstance: s3 });
        return r3.length ? "data-insights-event=".concat(de(r3)) : "";
      };
    }
    function ge(e3) {
      return "ais.index" === e3.$$type;
    }
    function ve(t3, e3) {
      var n3 = t3[e3.getIndexId()] || {};
      e3.getHelper().setState(e3.getWidgetSearchParameters(e3.getHelper().state, { uiState: n3 })), e3.getWidgets().filter(ge).forEach(function(e4) {
        return ve(t3, e4);
      });
    }
    function ye(r3, i3) {
      var a3 = null;
      return function() {
        for (var e3 = arguments.length, n3 = new Array(e3), t3 = 0; t3 < e3; t3++)
          n3[t3] = arguments[t3];
        return new Promise(function(e4, t4) {
          a3 && clearTimeout(a3), a3 = setTimeout(function() {
            a3 = null, Promise.resolve(r3.apply(void 0, n3)).then(e4).catch(t4);
          }, i3);
        });
      };
    }
    var be = Promise.resolve();
    function Re(r3) {
      function e3() {
        for (var e4 = arguments.length, t3 = new Array(e4), n3 = 0; n3 < e4; n3++)
          t3[n3] = arguments[n3];
        null === i3 && (i3 = be.then(function() {
          i3 = null, a3 ? a3 = false : r3.apply(void 0, t3);
        }));
      }
      var i3 = null, a3 = false;
      return e3.wait = function() {
        if (null === i3)
          throw new Error("The deferred function should be called before calling `wait()`");
        return i3;
      }, e3.cancel = function() {
        null !== i3 && (a3 = true);
      }, e3;
    }
    function l2() {
      for (var e3 = arguments.length, t3 = new Array(e3), n3 = 0; n3 < e3; n3++)
        t3[n3] = arguments[n3];
      var r3 = t3.map(function(e4) {
        return t4 = (e4 = e4).name, e4 = e4.connector, ["https://www.algolia.com/doc/api-reference/widgets/", t4, "/js/", void 0 !== e4 && e4 ? "#connector" : ""].join("");
        var t4;
      }).join(", ");
      return function(e4) {
        return [e4, "See documentation: ".concat(r3)].filter(Boolean).join("\n\n");
      };
    }
    function Se(e3) {
      return "number" == typeof e3 && e3 < 0 || "string" == typeof e3 ? String(e3).replace(/^-/, "\\-") : e3;
    }
    function _e(e3, t3) {
      for (var n3, r3 = 0; r3 < e3.length; r3++)
        if (t3(n3 = e3[r3], r3, e3))
          return n3;
    }
    var we = /^(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)$/;
    function Pe(e3) {
      if (Array.isArray(e3)) {
        var t3 = e3, n3 = j(t3, 1)[0], r3 = (n3 = j(void 0 === n3 ? [void 0, void 0, void 0, void 0] : n3, 4))[0], i3 = n3[1], a3 = n3[2], n3 = n3[3];
        if (r3 && i3 && a3 && n3)
          return { northEast: { lat: r3, lng: i3 }, southWest: { lat: a3, lng: n3 } };
        throw new Error('Invalid value for "insideBoundingBox" parameter: ['.concat(t3, "]"));
      }
      r3 = e3, a3 = (i3 = j(r3.split(",").map(parseFloat), 4))[0], n3 = i3[1], t3 = i3[2], i3 = i3[3];
      if (a3 && n3 && t3 && i3)
        return { northEast: { lat: a3, lng: n3 }, southWest: { lat: t3, lng: i3 } };
      throw new Error('Invalid value for "insideBoundingBox" parameter: "'.concat(r3, '"'));
    }
    function P(e3) {
      var t3, n3 = "string" == typeof e3, r3 = n3 ? document.querySelector(e3) : e3;
      if ((t3 = r3) instanceof HTMLElement || Boolean(t3) && 0 < t3.nodeType)
        return r3;
      throw t3 = "Container must be `string` or `HTMLElement`.", n3 && (t3 += " Unable to find ".concat(e3)), new Error(t3);
    }
    function Ne(e3) {
      var t3 = u.highlightPostTag, n3 = u.highlightPreTag, e3 = e3.split(n3), n3 = e3.shift(), r3 = n3 ? [{ value: n3, isHighlighted: false }] : [];
      return e3.forEach(function(e4) {
        e4 = e4.split(t3);
        r3.push({ value: e4[0], isHighlighted: true }), "" !== e4[1] && r3.push({ value: e4[1], isHighlighted: false });
      }), r3;
    }
    var xe = new RegExp(/\w/i);
    function Ie(e3, t3) {
      return (Array.isArray(t3) ? t3 : t3.split(".")).reduce(function(e4, t4) {
        return e4 && e4[t4];
      }, e3);
    }
    function Fe(e3, t3, n3, r3, i3) {
      var a3, i3 = 4 < arguments.length && void 0 !== i3 ? i3 : [], s3 = { type: t3, attribute: n3, name: r3, escapedValue: Se(r3) }, o3 = _e(i3, function(e4) {
        return e4.name === n3;
      });
      if ("hierarchical" === t3) {
        for (var i3 = e3.getHierarchicalFacetByName(n3), c2 = r3.split(i3.separator), u2 = 0; void 0 !== o3 && u2 < c2.length; ++u2)
          !function(t4) {
            var n4;
            o3 = o3 && o3.data && _e(Object.keys(o3.data).map((n4 = o3.data, function(e4) {
              return n4[e4];
            })), function(e4) {
              return e4.name === c2[t4];
            });
          }(u2);
        a3 = o3 && o3.count;
      } else
        a3 = o3 && o3.data && o3.data[s3.name];
      return void 0 !== a3 && (s3.count = a3), o3 && void 0 !== o3.exhaustive && (s3.exhaustive = o3.exhaustive), s3;
    }
    function Ce(n3, r3, e3) {
      var e3 = 2 < arguments.length && void 0 !== e3 && e3, i3 = [], t3 = r3.facetsRefinements, a3 = void 0 === t3 ? {} : t3, t3 = r3.facetsExcludes, s3 = void 0 === t3 ? {} : t3, t3 = r3.disjunctiveFacetsRefinements, o3 = void 0 === t3 ? {} : t3, t3 = r3.hierarchicalFacetsRefinements, c2 = void 0 === t3 ? {} : t3, t3 = r3.numericRefinements, u2 = void 0 === t3 ? {} : t3, t3 = r3.tagRefinements, t3 = void 0 === t3 ? [] : t3;
      return Object.keys(a3).forEach(function(t4) {
        a3[t4].forEach(function(e4) {
          i3.push(Fe(r3, "facet", t4, e4, n3.facets));
        });
      }), Object.keys(s3).forEach(function(t4) {
        s3[t4].forEach(function(e4) {
          i3.push({ type: "exclude", attribute: t4, name: e4, exclude: true });
        });
      }), Object.keys(o3).forEach(function(t4) {
        o3[t4].forEach(function(e4) {
          i3.push(Fe(r3, "disjunctive", t4, "string" == typeof (e4 = e4) ? e4.replace(/^\\-/, "-") : e4, n3.disjunctiveFacets));
        });
      }), Object.keys(c2).forEach(function(t4) {
        c2[t4].forEach(function(e4) {
          i3.push(Fe(r3, "hierarchical", t4, e4, n3.hierarchicalFacets));
        });
      }), Object.keys(u2).forEach(function(n4) {
        var r4 = u2[n4];
        Object.keys(r4).forEach(function(e4) {
          var t4 = e4, e4 = r4[t4];
          (Array.isArray(e4) ? e4 : [e4]).forEach(function(e5) {
            i3.push({ type: "numeric", attribute: n4, name: "".concat(e5), numericValue: e5, operator: t4 });
          });
        });
      }), t3.forEach(function(e4) {
        i3.push({ type: "tag", attribute: "_tags", name: e4 });
      }), e3 && r3.query && r3.query.trim() && i3.push({ attribute: "query", type: "query", name: r3.query, query: r3.query }), i3;
    }
    function Te(e3, t3) {
      var n3 = null == (n3 = e3.getWidgetRenderState) ? void 0 : n3.call(e3, t3), t3 = null;
      if (n3 && n3.widgetParams && ((n3 = n3.widgetParams).attribute ? t3 = n3.attribute : Array.isArray(n3.attributes) && (t3 = n3.attributes[0])), "string" != typeof t3)
        throw new Error("Could not find the attribute of the widget:\n\n".concat(JSON.stringify(e3), "\n\nPlease check whether the widget's getWidgetRenderState returns widgetParams.attribute correctly."));
      return t3;
    }
    function Ee(e3, n3, r3) {
      return e3.map(function(e4, t3) {
        return T(T({}, e4), {}, { __position: r3 * n3 + t3 + 1 });
      });
    }
    function ke(e3, t3) {
      return t3 ? e3.map(function(e4) {
        return T(T({}, e4), {}, { __queryID: t3 });
      }) : e3;
    }
    function je(a3, r3) {
      var e3, s3, t3;
      r3 && ("transporter" in a3 && !a3._cacheHydrated || a3._useCache && "function" == typeof a3.addAlgoliaAgent) && (e3 = Object.keys(r3).map(function(e4) {
        var e4 = r3[e4], t4 = e4.state, n3 = e4.requestParams;
        return e4.results.map(function(e5) {
          return T({ indexName: t4.index || e5.index }, n3 || e5.params ? { params: Me(n3 || e5.params.split("&").reduce(function(e6, t5) {
            var t5 = j(t5.split("="), 2), n4 = t5[0], t5 = t5[1];
            return e6[n4] = t5 ? decodeURIComponent(t5) : "", e6;
          }, {})) } : {});
        });
      }), t3 = Object.keys(r3).reduce(function(e4, t4) {
        return e4.concat(r3[t4].results);
      }, []), "transporter" in a3 && !a3._cacheHydrated && (a3._cacheHydrated = true, s3 = a3.search, a3.search = function(e4) {
        for (var t4 = arguments.length, n3 = new Array(1 < t4 ? t4 - 1 : 0), r4 = 1; r4 < t4; r4++)
          n3[r4 - 1] = arguments[r4];
        var i3 = e4.map(function(e5) {
          return T(T({}, e5), {}, { params: Me(e5.params) });
        });
        return a3.transporter.responsesCache.get({ method: "search", args: [i3].concat(n3) }, function() {
          return s3.apply(void 0, [e4].concat(n3));
        });
      }, a3.transporter.responsesCache.set({ method: "search", args: e3 }, { results: t3 })), "transporter" in a3 || (t3 = "/1/indexes/*/queries_body_".concat(JSON.stringify({ requests: e3 })), a3.cache = T(T({}, a3.cache), {}, E({}, t3, JSON.stringify({ results: Object.keys(r3).map(function(e4) {
        return r3[e4].results;
      }) })))));
    }
    function Me(n3) {
      return Object.keys(n3).map(function(e3) {
        return function(e4) {
          for (var t4 = arguments.length, n4 = new Array(1 < t4 ? t4 - 1 : 0), r3 = 1; r3 < t4; r3++)
            n4[r3 - 1] = arguments[r3];
          var i3 = 0;
          return e4.replace(/%s/g, function() {
            return encodeURIComponent(n4[i3++]);
          });
        }("%s=%s", e3, (t3 = n3[e3], "[object Object]" === Object.prototype.toString.call(t3) || "[object Array]" === Object.prototype.toString.call(t3) ? JSON.stringify(n3[e3]) : n3[e3]));
        var t3;
      }).join("&");
    }
    function Le(e3) {
      return e3 !== Object(e3);
    }
    function Oe(e3, t3) {
      if (e3 === t3)
        return 1;
      if (Le(e3) || Le(t3) || "function" == typeof e3 || "function" == typeof t3)
        return e3 === t3;
      if (Object.keys(e3).length === Object.keys(t3).length) {
        for (var n3 = 0, r3 = Object.keys(e3); n3 < r3.length; n3++) {
          var i3 = r3[n3];
          if (!(i3 in t3))
            return;
          if (!Oe(e3[i3], t3[i3]))
            return;
        }
        return 1;
      }
    }
    function b(e3) {
      return "number" == typeof e3 && isFinite(e3);
    }
    function He(e3) {
      return 1 === e3.button || e3.altKey || e3.ctrlKey || e3.metaKey || e3.shiftKey;
    }
    function Ae(e3) {
      return e3.filter(function(e4, t3, n3) {
        return n3.indexOf(e4) === t3;
      });
    }
    var We = ["facets", "disjunctiveFacets", "facetsRefinements", "facetsExcludes", "disjunctiveFacetsRefinements", "numericRefinements", "tagRefinements", "hierarchicalFacets", "hierarchicalFacetsRefinements", "ruleContexts"], De = function(e3, t3) {
      t3.facets, t3.disjunctiveFacets, t3.facetsRefinements, t3.facetsExcludes, t3.disjunctiveFacetsRefinements, t3.numericRefinements, t3.tagRefinements, t3.hierarchicalFacets, t3.hierarchicalFacetsRefinements, t3.ruleContexts;
      t3 = k(t3, We);
      return e3.setQueryParameters(t3);
    }, Ue = function(e3, t3) {
      return t3.facets.reduce(function(e4, t4) {
        return e4.addFacet(t4);
      }, e3);
    }, $e = function(e3, t3) {
      return t3.disjunctiveFacets.reduce(function(e4, t4) {
        return e4.addDisjunctiveFacet(t4);
      }, e3);
    }, Be = function(e3, t3) {
      return e3.setQueryParameters({ hierarchicalFacets: t3.hierarchicalFacets.reduce(function(e4, t4) {
        var n3 = function(e5, t5) {
          if (Array.isArray(e5)) {
            for (var n4 = 0; n4 < e5.length; n4++)
              if (t5(e5[n4]))
                return n4;
          }
          return -1;
        }(e4, function(e5) {
          return e5.name === t4.name;
        });
        return -1 === n3 ? e4.concat(t4) : ((e4 = e4.slice()).splice(n3, 1, t4), e4);
      }, e3.hierarchicalFacets) });
    }, Qe = function(e3, t3) {
      return t3.tagRefinements.reduce(function(e4, t4) {
        return e4.addTagRefinement(t4);
      }, e3);
    }, qe = function(e3, t3) {
      return e3.setQueryParameters({ facetsRefinements: T(T({}, e3.facetsRefinements), t3.facetsRefinements) });
    }, Ve = function(e3, t3) {
      return e3.setQueryParameters({ facetsExcludes: T(T({}, e3.facetsExcludes), t3.facetsExcludes) });
    }, Ke = function(e3, t3) {
      return e3.setQueryParameters({ disjunctiveFacetsRefinements: T(T({}, e3.disjunctiveFacetsRefinements), t3.disjunctiveFacetsRefinements) });
    }, ze = function(e3, t3) {
      return e3.setQueryParameters({ numericRefinements: T(T({}, e3.numericRefinements), t3.numericRefinements) });
    }, Je = function(e3, t3) {
      return e3.setQueryParameters({ hierarchicalFacetsRefinements: T(T({}, e3.hierarchicalFacetsRefinements), t3.hierarchicalFacetsRefinements) });
    }, Ze = function(e3, t3) {
      t3 = Ae([].concat(e3.ruleContexts).concat(t3.ruleContexts).filter(Boolean));
      return 0 < t3.length ? e3.setQueryParameters({ ruleContexts: t3 }) : e3;
    }, Ye = function() {
      for (var e3 = arguments.length, t3 = new Array(e3), n3 = 0; n3 < e3; n3++)
        t3[n3] = arguments[n3];
      return t3.reduce(function(e4, t4) {
        e4 = Je(e4, t4), e4 = Be(e4, t4), e4 = Qe(e4, t4), e4 = ze(e4, t4), e4 = Ke(e4, t4), e4 = Ve(e4, t4), e4 = qe(e4, t4), e4 = $e(e4, t4), e4 = Ze(e4, t4), e4 = Ue(e4, t4);
        return De(e4, t4);
      });
    };
    function Xe(n3, r3) {
      return null == n3 ? n3 : Object.keys(n3).reduce(function(e3, t3) {
        return 0 <= r3.indexOf(t3) || (e3[t3] = n3[t3]), e3;
      }, {});
    }
    function Ge(e3) {
      var t3 = e3.start, n3 = void 0 === t3 ? 0 : t3, t3 = e3.end, e3 = e3.step, e3 = void 0 === e3 ? 1 : e3, r3 = 0 === e3 ? 1 : e3, e3 = Math.round((t3 - n3) / r3);
      return w(Array(e3)).map(function(e4, t4) {
        return n3 + t4 * r3;
      });
    }
    function et(e3, t3, n3) {
      var r3 = t3.getHelper();
      return { uiState: n3, helper: r3, parent: t3, instantSearchInstance: e3, state: r3.state, renderState: e3.renderState, templatesConfig: e3.templatesConfig, createURL: t3.createURL, scopedResults: [], searchMetadata: { isSearchStalled: "stalled" === e3.status }, status: e3.status, error: e3.error };
    }
    function tt(e3, t3) {
      var n3 = t3.getResults(), r3 = t3.getHelper();
      return { helper: r3, parent: t3, instantSearchInstance: e3, results: n3, scopedResults: t3.getScopedResults(), state: n3 ? n3._state : r3.state, renderState: e3.renderState, templatesConfig: e3.templatesConfig, createURL: t3.createURL, searchMetadata: { isSearchStalled: "stalled" === e3.status }, status: e3.status, error: e3.error };
    }
    function nt(i3) {
      return i3.some(function(e3) {
        return e3.isHighlighted;
      }) ? i3.map(function(e3, t3) {
        return T(T({}, e3), {}, { isHighlighted: (n3 = (e3 = i3)[t3 = t3], r3 = (null == (r3 = i3[t3 + 1]) ? void 0 : r3.isHighlighted) || true, t3 = (null == (e3 = i3[t3 - 1]) ? void 0 : e3.isHighlighted) || true, !(xe.test(re(n3.value)) || t3 !== r3 ? n3.isHighlighted : t3)) });
        var n3, r3;
      }) : i3.map(function(e3) {
        return T(T({}, e3), {}, { isHighlighted: false });
      });
    }
    function rt(e3, t3) {
      t3 = (1 < arguments.length && void 0 !== t3 ? t3 : { fallback: function() {
      } }).fallback;
      return "undefined" == typeof window ? t3() : e3({ window });
    }
    function it(e3) {
      return Array.isArray(e3) ? e3 : [e3];
    }
    function at(y2) {
      var b2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(y2, ct()), function(e3) {
        var r3, n3, i3, a3, s3, o3, c2, u2, t3 = e3 || {}, l3 = t3.queryLanguages, d2 = t3.attributesForPrediction, h2 = t3.nbHits, f2 = void 0 === h2 ? 1 : h2, h2 = t3.renderDebounceTime, m2 = t3.searchDebounceTime, p2 = void 0 === m2 ? 100 : m2, m2 = t3.escapeHTML, g2 = void 0 === m2 || m2, m2 = t3.extraParameters, v2 = void 0 === m2 ? {} : m2;
        if (l3 && 0 !== l3.length)
          return r3 = function(e4) {
            var t4 = ++n3;
            return Promise.resolve(e4).then(function(e5) {
              return a3 && t4 < i3 ? a3 : (i3 = t4, a3 = e5);
            });
          }, s3 = [], o3 = !(i3 = n3 = -1), c2 = ye(y2, (a3 = void 0) === h2 ? 100 : h2), { $$type: "ais.answers", init: function(e4) {
            var t4 = e4.state, t4 = e4.instantSearchInstance.client.initIndex(t4.index);
            if ("function" != typeof t4.findAnswers)
              throw new Error(ct("`algoliasearch` >= 4.8.0 required."));
            u2 = ye(t4.findAnswers, p2), y2(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: e4.instantSearchInstance }), true);
          }, render: function(t4) {
            var n4 = this, e4 = t4.state.query;
            e4 ? (s3 = [], o3 = true, y2(T(T({}, this.getWidgetRenderState(t4)), {}, { instantSearchInstance: t4.instantSearchInstance }), false), r3(u2(e4, l3, T(T({}, v2), {}, { nbHits: f2, attributesForPrediction: d2 }))).then(function(e5) {
              e5 && (g2 && 0 < e5.hits.length && (e5.hits = ce(e5.hits)), e5 = ke(Ee(e5.hits, 0, f2), e5.queryID), s3 = e5, o3 = false, c2(T(T({}, n4.getWidgetRenderState(t4)), {}, { instantSearchInstance: t4.instantSearchInstance }), false));
            })) : (o3 = !(s3 = []), y2(T(T({}, this.getWidgetRenderState(t4)), {}, { instantSearchInstance: t4.instantSearchInstance }), false));
          }, getRenderState: function(e4, t4) {
            return T(T({}, e4), {}, { answers: this.getWidgetRenderState(t4) });
          }, getWidgetRenderState: function() {
            return { hits: s3, isLoading: o3, widgetParams: e3 };
          }, dispose: function(e4) {
            e4 = e4.state;
            return b2(), e4;
          }, getWidgetSearchParameters: function(e4) {
            return e4;
          } };
        throw new Error(ct("The `queryLanguages` expects an array of strings."));
      };
    }
    function st(u2) {
      var s3 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(u2, ut()), function(n3) {
        var o3, e3 = n3.widgets, t3 = n3.maxValuesPerFacet, r3 = void 0 === t3 ? 20 : t3, t3 = n3.facets, i3 = void 0 === t3 ? ["*"] : t3, t3 = n3.transformItems, a3 = void 0 === t3 ? function(e4) {
          return e4;
        } : t3, c2 = n3.fallbackWidget;
        if (!(e3 && Array.isArray(e3) && e3.every(function(e4) {
          return "object" === A(e4);
        })))
          throw new Error(ut("The `widgets` option expects an array of widgets."));
        if (Array.isArray(i3))
          return o3 = /* @__PURE__ */ new Map(), { $$type: "ais.dynamicWidgets", init: function(n4) {
            e3.forEach(function(e4) {
              var t4 = Te(e4, n4);
              o3.set(t4, { widget: e4, isMounted: false });
            }), u2(T(T({}, this.getWidgetRenderState(n4)), {}, { instantSearchInstance: n4.instantSearchInstance }), true);
          }, render: function(e4) {
            var t4 = e4.parent, i4 = this.getWidgetRenderState(e4), a4 = [], s4 = [];
            c2 && i4.attributesToRender.forEach(function(e5) {
              var t5;
              o3.has(e5) || (t5 = c2({ attribute: e5 }), o3.set(e5, { widget: t5, isMounted: false }));
            }), o3.forEach(function(e5, t5) {
              var n4 = e5.widget, e5 = e5.isMounted, r4 = -1 < i4.attributesToRender.indexOf(t5);
              !e5 && r4 ? (s4.push(n4), o3.set(t5, { widget: n4, isMounted: true })) : e5 && !r4 && (a4.push(n4), o3.set(t5, { widget: n4, isMounted: false }));
            }), t4.addWidgets(s4), setTimeout(function() {
              return t4.removeWidgets(a4);
            }, 0), u2(T(T({}, i4), {}, { instantSearchInstance: e4.instantSearchInstance }), false);
          }, dispose: function(e4) {
            var e4 = e4.parent, n4 = [];
            o3.forEach(function(e5) {
              var t4 = e5.widget;
              e5.isMounted && n4.push(t4);
            }), e4.removeWidgets(n4), s3();
          }, getWidgetSearchParameters: function(e4) {
            return i3.reduce(function(e5, t4) {
              return e5.addFacet(t4);
            }, e4.setQueryParameters({ maxValuesPerFacet: Math.max(r3 || 0, e4.maxValuesPerFacet || 0) }));
          }, getRenderState: function(e4, t4) {
            return T(T({}, e4), {}, { dynamicWidgets: this.getWidgetRenderState(t4) });
          }, getWidgetRenderState: function(e4) {
            var t4 = e4.results;
            e4.state;
            if (!t4)
              return { attributesToRender: [], widgetParams: n3 };
            e4 = a3(null != (e4 = null == (e4 = t4.renderingContent) || null == (e4 = e4.facetOrdering) || null == (e4 = e4.facets) ? void 0 : e4.order) ? e4 : [], { results: t4 });
            if (Array.isArray(e4))
              return { attributesToRender: e4, widgetParams: n3 };
            throw new Error(ut("The `transformItems` option expects a function that returns an Array."));
          } };
        throw new Error(ut("The `facets` option only accepts an array of facets, you passed ".concat(JSON.stringify(i3))));
      };
    }
    function ot(n3) {
      var s3 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(n3, lt()), function(r3) {
        var e3 = r3 || {}, t3 = e3.includedAttributes, o3 = void 0 === t3 ? [] : t3, t3 = e3.excludedAttributes, c2 = void 0 === t3 ? ["query"] : t3, t3 = e3.transformItems, u2 = void 0 === t3 ? function(e4) {
          return e4;
        } : t3;
        if (r3 && r3.includedAttributes && r3.excludedAttributes)
          throw new Error(lt("The options `includedAttributes` and `excludedAttributes` cannot be used together."));
        function i3() {
          return l3.refine();
        }
        function a3() {
          return l3.createURL();
        }
        var l3 = { refine: R, createURL: function() {
          return "";
        }, attributesToClear: [] };
        return { $$type: "ais.clearRefinements", init: function(e4) {
          var t4 = e4.instantSearchInstance;
          n3(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: t4 }), true);
        }, render: function(e4) {
          var t4 = e4.instantSearchInstance;
          n3(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: t4 }), false);
        }, dispose: function() {
          s3();
        }, getRenderState: function(e4, t4) {
          return T(T({}, e4), {}, { clearRefinements: this.getWidgetRenderState(t4) });
        }, getWidgetRenderState: function(e4) {
          var t4 = e4.createURL, n4 = e4.scopedResults, s4 = e4.results, e4 = (l3.attributesToClear = n4.reduce(function(e5, t5) {
            return e5.concat((t5 = (e5 = { scopedResult: t5, includedAttributes: o3, excludedAttributes: c2, transformItems: u2, results: s4 }).scopedResult, n5 = e5.includedAttributes, r4 = e5.excludedAttributes, i4 = e5.transformItems, e5 = e5.results, a4 = -1 !== n5.indexOf("query") || -1 === r4.indexOf("query"), { helper: t5.helper, items: i4(Ae(Ce(t5.results, t5.helper.state, a4).map(function(e6) {
              return e6.attribute;
            }).filter(function(e6) {
              return 0 === n5.length || -1 !== n5.indexOf(e6);
            }).filter(function(e6) {
              return "query" === e6 && a4 || -1 === r4.indexOf(e6);
            })), { results: e5 }) }));
            var n5, r4, i4, a4;
          }, []), l3.refine = function() {
            l3.attributesToClear.forEach(function(e5) {
              var t5 = e5.helper, e5 = e5.items;
              t5.setState(Z({ helper: t5, attributesToClear: e5 })).search();
            });
          }, l3.createURL = function() {
            return t4(Ye.apply(void 0, w(l3.attributesToClear.map(function(e5) {
              return Z({ helper: e5.helper, attributesToClear: e5.items });
            }))));
          }, l3.attributesToClear.some(function(e5) {
            return 0 < e5.items.length;
          }));
          return { canRefine: e4, hasRefinements: e4, refine: i3, createURL: a3, widgetParams: r3 };
        } };
      };
    }
    var ct = l2({ name: "answers", connector: true }), ut = l2({ name: "dynamic-widgets", connector: true }), lt = l2({ name: "clear-refinements", connector: true });
    function dt(n3) {
      var r3 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(n3, ht()), function(a3) {
        if ((a3 || {}).includedAttributes && (a3 || {}).excludedAttributes)
          throw new Error(ht("The options `includedAttributes` and `excludedAttributes` cannot be used together."));
        var e3 = a3 || {}, s3 = e3.includedAttributes, t3 = e3.excludedAttributes, o3 = void 0 === t3 ? ["query"] : t3, t3 = e3.transformItems, c2 = void 0 === t3 ? function(e4) {
          return e4;
        } : t3;
        return { $$type: "ais.currentRefinements", init: function(e4) {
          var t4 = e4.instantSearchInstance;
          n3(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: t4 }), true);
        }, render: function(e4) {
          var t4 = e4.instantSearchInstance;
          n3(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: t4 }), false);
        }, dispose: function() {
          r3();
        }, getRenderState: function(e4, t4) {
          return T(T({}, e4), {}, { currentRefinements: this.getWidgetRenderState(t4) });
        }, getWidgetRenderState: function(e4) {
          var n4 = e4.results, t4 = e4.scopedResults, r4 = e4.createURL, i3 = e4.helper;
          e4 = n4 ? t4.reduce(function(e5, t5) {
            return e5.concat(c2(ft({ results: t5.results, helper: t5.helper, indexId: t5.indexId, includedAttributes: s3, excludedAttributes: o3 }), { results: n4 }));
          }, []) : c2(ft({ results: {}, helper: i3, indexId: i3.state.index, includedAttributes: s3, excludedAttributes: o3 }), { results: n4 });
          return { items: e4, canRefine: 0 < e4.length, refine: function(e5) {
            return pt(i3, e5);
          }, createURL: function(e5) {
            return r4(mt(i3.state, e5));
          }, widgetParams: a3 };
        } };
      };
    }
    var ht = l2({ name: "current-refinements", connector: true });
    function ft(e3) {
      var t3 = e3.results, n3 = e3.helper, r3 = e3.indexId, i3 = e3.includedAttributes, a3 = e3.excludedAttributes, e3 = -1 !== (i3 || []).indexOf("query") || -1 === (a3 || []).indexOf("query"), s3 = i3 ? function(e4) {
        return -1 !== i3.indexOf(e4.attribute);
      } : function(e4) {
        return -1 === a3.indexOf(e4.attribute);
      }, o3 = Ce(t3, n3.state, e3).map(gt).filter(s3);
      return o3.reduce(function(e4, t4) {
        return [].concat(w(e4.filter(function(e5) {
          return e5.attribute !== t4.attribute;
        })), [{ indexName: n3.state.index, indexId: r3, attribute: t4.attribute, label: t4.attribute, refinements: o3.filter(function(e5) {
          return e5.attribute === t4.attribute;
        }).sort(function(e5, t5) {
          return "numeric" === e5.type ? e5.value - t5.value : 0;
        }), refine: function(e5) {
          return pt(n3, e5);
        } }]);
      }, []);
    }
    function mt(e3, t3) {
      switch (e3 = e3.resetPage(), t3.type) {
        case "facet":
          return e3.removeFacetRefinement(t3.attribute, String(t3.value));
        case "disjunctive":
          return e3.removeDisjunctiveFacetRefinement(t3.attribute, String(t3.value));
        case "hierarchical":
          return e3.removeHierarchicalFacetRefinement(t3.attribute);
        case "exclude":
          return e3.removeExcludeRefinement(t3.attribute, String(t3.value));
        case "numeric":
          return e3.removeNumericRefinement(t3.attribute, t3.operator, String(t3.value));
        case "tag":
          return e3.removeTagRefinement(String(t3.value));
        case "query":
          return e3.setQueryParameter("query", "");
        default:
          return e3;
      }
    }
    function pt(e3, t3) {
      e3.setState(mt(e3.state, t3)).search();
    }
    function gt(e3) {
      var t3 = function(e4) {
        if ("numeric" === e4.type)
          return Number(e4.name);
        if ("escapedValue" in e4)
          return e4.escapedValue;
        return e4.name;
      }(e3), n3 = e3.operator ? "".concat(function(e4) {
        switch (e4) {
          case ">=":
            return "≥";
          case "<=":
            return "≤";
          default:
            return e4;
        }
      }(e3.operator), " ").concat(e3.name) : e3.name, t3 = { attribute: e3.attribute, type: e3.type, value: t3, label: n3 };
      return void 0 !== e3.operator && (t3.operator = e3.operator), void 0 !== e3.count && (t3.count = e3.count), void 0 !== e3.exhaustive && (t3.exhaustive = e3.exhaustive), t3;
    }
    function vt(c2) {
      var n3 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(c2, bt()), function(u2) {
        var e3 = u2 || {}, l3 = e3.attributes, t3 = e3.separator, d2 = void 0 === t3 ? " > " : t3, t3 = e3.rootPath, r3 = void 0 === t3 ? null : t3, t3 = e3.showParentLevel, i3 = void 0 === t3 || t3, t3 = e3.limit, a3 = void 0 === t3 ? 10 : t3, t3 = e3.showMore, h2 = void 0 !== t3 && t3, t3 = e3.showMoreLimit, s3 = void 0 === t3 ? 20 : t3, t3 = e3.sortBy, f2 = void 0 === t3 ? Rt : t3, t3 = e3.transformItems, m2 = void 0 === t3 ? function(e4) {
          return e4;
        } : t3;
        if (!l3 || !Array.isArray(l3) || 0 === l3.length)
          throw new Error(bt("The `attributes` option expects an array of strings."));
        if (true === h2 && s3 <= a3)
          throw new Error(bt("The `showMoreLimit` option must be greater than `limit`."));
        var p2, g2, v2 = j(l3, 1)[0], o3 = function() {
        };
        function y2() {
          o3();
        }
        var b2 = false;
        function R2() {
          return b2 ? s3 : a3;
        }
        return { $$type: "ais.hierarchicalMenu", init: function(e4) {
          var t4 = e4.instantSearchInstance;
          c2(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: t4 }), true);
        }, render: function(e4) {
          var t4, n4, r4 = e4.instantSearchInstance;
          t4 = e4, o3 = function() {
            b2 = !b2, n4.render(t4);
          }, c2(T(T({}, (n4 = this).getWidgetRenderState(e4)), {}, { instantSearchInstance: r4 }), false);
        }, dispose: function(e4) {
          e4 = e4.state;
          return n3(), e4.removeHierarchicalFacet(v2).setQueryParameter("maxValuesPerFacet", void 0);
        }, getRenderState: function(e4, t4) {
          return T(T({}, e4), {}, { hierarchicalMenu: T(T({}, e4.hierarchicalMenu), {}, E({}, v2, this.getWidgetRenderState(t4))) });
        }, getWidgetRenderState: function(e4) {
          var t4, n4 = this, r4 = e4.results, i4 = e4.state, a4 = e4.createURL, s4 = e4.instantSearchInstance, o4 = e4.helper, e4 = [], c3 = false;
          return p2 = p2 || le({ instantSearchInstance: s4, helper: o4, attribute: function(e5) {
            e5 = e5.split(d2).length - 1;
            return l3[e5];
          }, widgetType: this.$$type }), g2 = g2 || function(e5) {
            p2("click:internal", e5), o4.toggleFacetRefinement(v2, e5).search();
          }, r4 && (s4 = (s4 = r4.getFacetValues(v2, { sortBy: f2, facetOrdering: f2 === Rt })) && !Array.isArray(s4) && s4.data ? s4.data : [], t4 = (i4.maxValuesPerFacet || 0) > R2() ? s4.length <= R2() : s4.length < R2(), c3 = h2 && (b2 || !t4), e4 = m2(function i5(e5) {
            return e5.slice(0, R2()).map(function(e6) {
              var t5 = e6.name, n5 = e6.escapedValue, r5 = e6.data, e6 = (e6.path, T(T({}, k(e6, yt)), {}, { value: n5, label: t5, data: null }));
              return Array.isArray(r5) && (e6.data = i5(r5)), e6;
            });
          }(s4), { results: r4 })), { items: e4, refine: g2, canRefine: 0 < e4.length, createURL: function(t5) {
            return a4(function(e5) {
              return n4.getWidgetUiState(e5, { searchParameters: i4.resetPage().toggleFacetRefinement(v2, t5), helper: o4 });
            });
          }, sendEvent: p2, widgetParams: u2, isShowingMore: b2, toggleShowMore: y2, canToggleShowMore: c3 };
        }, getWidgetUiState: function(e4, t4) {
          var t4 = t4.searchParameters.getHierarchicalFacetBreadcrumb(v2);
          return e4 = T(T({}, e4), {}, { hierarchicalMenu: T(T({}, e4.hierarchicalMenu), {}, E({}, v2, t4)) }), t4 = v2, e4.hierarchicalMenu && (e4.hierarchicalMenu[t4] && 0 !== e4.hierarchicalMenu[t4].length || delete e4.hierarchicalMenu[t4], 0 === Object.keys(e4.hierarchicalMenu).length) && delete e4.hierarchicalMenu, e4;
        }, getWidgetSearchParameters: function(e4, t4) {
          t4 = t4.uiState, t4 = t4.hierarchicalMenu && t4.hierarchicalMenu[v2];
          if (e4.isConjunctiveFacet(v2) || e4.isDisjunctiveFacet(v2))
            return e4;
          e4.isHierarchicalFacet(v2) && e4.getHierarchicalFacetByName(v2);
          var e4 = e4.removeHierarchicalFacet(v2).addHierarchicalFacet({ name: v2, attributes: l3, separator: d2, rootPath: r3, showParentLevel: i3 }), n4 = e4.maxValuesPerFacet || 0, n4 = Math.max(n4, h2 ? s3 : a3), e4 = e4.setQueryParameter("maxValuesPerFacet", n4);
          return t4 ? e4.addHierarchicalFacetRefinement(v2, t4.join(d2)) : e4.setQueryParameters({ hierarchicalFacetsRefinements: T(T({}, e4.hierarchicalFacetsRefinements), {}, E({}, v2, [])) });
        } };
      };
    }
    var yt = ["name", "escapedValue", "data", "path"], bt = l2({ name: "hierarchical-menu", connector: true }), Rt = ["name:asc"];
    function St(n3) {
      var c2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(n3, _t()), function(r3) {
        var i3, a3, e3 = r3 || {}, t3 = e3.escapeHTML, s3 = void 0 === t3 || t3, t3 = e3.transformItems, o3 = void 0 === t3 ? function(e4) {
          return e4;
        } : t3;
        return { $$type: "ais.hits", init: function(e4) {
          n3(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: e4.instantSearchInstance }), true);
        }, render: function(e4) {
          var t4 = this.getWidgetRenderState(e4);
          n3(T(T({}, t4), {}, { instantSearchInstance: e4.instantSearchInstance }), false), t4.sendEvent("view:internal", t4.hits);
        }, getRenderState: function(e4, t4) {
          return T(T({}, e4), {}, { hits: this.getWidgetRenderState(t4) });
        }, getWidgetRenderState: function(e4) {
          var t4 = e4.results, n4 = e4.helper, e4 = e4.instantSearchInstance;
          if (i3 = i3 || me({ instantSearchInstance: e4, getIndex: function() {
            return n4.getIndex();
          }, widgetType: this.$$type }), a3 = a3 || pe({ getIndex: function() {
            return n4.getIndex();
          }, widgetType: this.$$type, instantSearchInstance: e4 }), !t4)
            return { hits: [], results: void 0, banner: void 0, sendEvent: i3, bindEvent: a3, widgetParams: r3 };
          s3 && 0 < t4.hits.length && (t4.hits = ce(t4.hits));
          var e4 = ke(Ee(t4.hits, t4.page, t4.hitsPerPage), t4.queryID);
          return { hits: o3(e4, { results: t4 }), results: t4, banner: null == (e4 = t4.renderingContent) || null == (t4 = e4.widgets) || null == (e4 = t4.banners) ? void 0 : e4[0], sendEvent: i3, bindEvent: a3, widgetParams: r3 };
        }, dispose: function(e4) {
          e4 = e4.state;
          return c2(), s3 ? e4.setQueryParameters(Object.keys(ae).reduce(function(e5, t4) {
            return T(T({}, e5), {}, E({}, t4, void 0));
          }, {})) : e4;
        }, getWidgetSearchParameters: function(e4) {
          return s3 ? e4.setQueryParameters(ae) : e4;
        } };
      };
    }
    var _t = l2({ name: "hits", connector: true }), wt = function(e3) {
      var n3, t3 = e3.method, r3 = e3.results, i3 = e3.hits, a3 = e3.objectIDs, s3 = r3.index, o3 = (n3 = i3, a3.map(function(t4) {
        var e4 = _e(n3, function(e5) {
          return e5.objectID === t4;
        });
        if (void 0 === e4)
          throw new Error('Could not find objectID "'.concat(t4, '" passed to `clickedObjectIDsAfterSearch` in the returned hits. This is necessary to infer the absolute position and the query ID.'));
        return e4;
      })), c2 = function(e4) {
        e4 = Ae(e4.map(function(e5) {
          return e5.__queryID;
        }));
        if (1 < e4.length)
          throw new Error("Insights currently allows a single `queryID`. The `objectIDs` provided map to multiple `queryID`s.");
        e4 = e4[0];
        if ("string" != typeof e4)
          throw new Error("Could not infer `queryID`. Ensure InstantSearch `clickAnalytics: true` was added with the Configure widget.\n\nSee: https://alg.li/lNiZZ7");
        return e4;
      }(o3);
      switch (t3) {
        case "clickedObjectIDsAfterSearch":
          return { index: s3, queryID: c2, objectIDs: a3, positions: o3.map(function(e4) {
            return e4.__position;
          }) };
        case "convertedObjectIDsAfterSearch":
          return { index: s3, queryID: c2, objectIDs: a3 };
        default:
          throw new Error('Unsupported method passed to insights: "'.concat(t3, '".'));
      }
    };
    function Pt(t3) {
      return function(a3, e3) {
        return t3(function(e4, t4) {
          var s3, o3, c2, n3 = e4.results, r3 = e4.hits, i3 = e4.instantSearchInstance;
          return n3 && r3 && i3 ? (s3 = i3.insightsClient, o3 = n3, c2 = r3, i3 = function(e5) {
            for (var t5 = arguments.length, n4 = new Array(1 < t5 ? t5 - 1 : 0), r4 = 1; r4 < t5; r4++)
              n4[r4 - 1] = arguments[r4];
            var i4 = n4[0];
            if (!s3)
              throw a4 = l2({ name: "instantsearch" }), new Error(a4("The `insightsClient` option has not been provided to `instantsearch`."));
            if (!Array.isArray(i4.objectIDs))
              throw new TypeError("Expected `objectIDs` to be an array.");
            var a4 = wt({ method: e5, results: o3, hits: c2, objectIDs: i4.objectIDs });
            s3(e5, T(T({}, a4), i4));
          }, a3(T(T({}, e4), {}, { insights: i3 }), t4)) : a3(e4, t4);
        }, e3);
      };
    }
    var Nt, N, xt, It, Ft, Ct = {}, Tt = [], Et = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
    function kt(e3, t3) {
      for (var n3 in t3)
        e3[n3] = t3[n3];
      return e3;
    }
    function jt(e3) {
      var t3 = e3.parentNode;
      t3 && t3.removeChild(e3);
    }
    function M(e3, t3, n3) {
      var r3, i3, a3, s3 = {};
      for (a3 in t3)
        "key" == a3 ? r3 = t3[a3] : "ref" == a3 ? i3 = t3[a3] : s3[a3] = t3[a3];
      if (2 < arguments.length && (s3.children = 3 < arguments.length ? Nt.call(arguments, 2) : n3), "function" == typeof e3 && null != e3.defaultProps)
        for (a3 in e3.defaultProps)
          void 0 === s3[a3] && (s3[a3] = e3.defaultProps[a3]);
      return Mt(e3, s3, r3, i3, null);
    }
    function Mt(e3, t3, n3, r3, i3) {
      e3 = { type: e3, props: t3, key: n3, ref: r3, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: null == i3 ? ++xt : i3 };
      return null == i3 && null != N.vnode && N.vnode(e3), e3;
    }
    function Lt() {
      return { current: null };
    }
    function x(e3) {
      return e3.children;
    }
    function Ot(e3, t3) {
      this.props = e3, this.context = t3;
    }
    function Ht(e3, t3) {
      if (null == t3)
        return e3.__ ? Ht(e3.__, e3.__.__k.indexOf(e3) + 1) : null;
      for (var n3; t3 < e3.__k.length; t3++)
        if (null != (n3 = e3.__k[t3]) && null != n3.__e)
          return n3.__e;
      return "function" == typeof e3.type ? Ht(e3) : null;
    }
    function At(e3) {
      (e3.__d || (e3.__d = true, !It.push(e3)) || Wt.__r++) && Ft === N.debounceRendering || ((Ft = N.debounceRendering) || setTimeout)(Wt);
    }
    function Wt() {
      for (var e3; Wt.__r = It.length; )
        e3 = It.sort(function(e4, t3) {
          return e4.__v.__b - t3.__v.__b;
        }), It = [], e3.some(function(e4) {
          var t3, n3, r3, i3, a3;
          e4.__d && (i3 = (r3 = (e4 = e4).__v).__e, a3 = e4.__P) && (t3 = [], (n3 = kt({}, r3)).__v = r3.__v + 1, Vt(a3, r3, n3, e4.__n, void 0 !== a3.ownerSVGElement, null != r3.__h ? [i3] : null, t3, null == i3 ? Ht(r3) : i3, r3.__h), Kt(t3, r3), r3.__e != i3) && function e5(t4) {
            var n4, r4;
            if (null != (t4 = t4.__) && null != t4.__c) {
              for (t4.__e = t4.__c.base = null, n4 = 0; n4 < t4.__k.length; n4++)
                if (null != (r4 = t4.__k[n4]) && null != r4.__e) {
                  t4.__e = t4.__c.base = r4.__e;
                  break;
                }
              return e5(t4);
            }
          }(r3);
        });
    }
    function Dt(e3, t3, n3, r3, i3, a3, s3, o3, c2, u2) {
      var l3, d2, h2, f2, m2, p2, g2, v2 = r3 && r3.__k || Tt, y2 = v2.length;
      for (n3.__k = [], l3 = 0; l3 < t3.length; l3++)
        if (null != (f2 = n3.__k[l3] = null == (f2 = t3[l3]) || "boolean" == typeof f2 ? null : "string" == typeof f2 || "number" == typeof f2 || "bigint" == typeof f2 ? Mt(null, f2, null, null, f2) : Array.isArray(f2) ? Mt(x, { children: f2 }, null, null, null) : 0 < f2.__b ? Mt(f2.type, f2.props, f2.key, f2.ref || null, f2.__v) : f2)) {
          if (f2.__ = n3, f2.__b = n3.__b + 1, null === (h2 = v2[l3]) || h2 && f2.key == h2.key && f2.type === h2.type)
            v2[l3] = void 0;
          else
            for (d2 = 0; d2 < y2; d2++) {
              if ((h2 = v2[d2]) && f2.key == h2.key && f2.type === h2.type) {
                v2[d2] = void 0;
                break;
              }
              h2 = null;
            }
          Vt(e3, f2, h2 = h2 || Ct, i3, a3, s3, o3, c2, u2), m2 = f2.__e, (d2 = f2.ref) && h2.ref != d2 && (g2 = g2 || [], h2.ref && g2.push(h2.ref, null, f2), g2.push(d2, f2.__c || m2, f2)), null != m2 ? (null == p2 && (p2 = m2), "function" == typeof f2.type && f2.__k === h2.__k ? f2.__d = c2 = function e4(t4, n4, r4) {
            for (var i4, a4 = t4.__k, s4 = 0; a4 && s4 < a4.length; s4++)
              (i4 = a4[s4]) && (i4.__ = t4, n4 = "function" == typeof i4.type ? e4(i4, n4, r4) : Ut(r4, i4, i4, a4, i4.__e, n4));
            return n4;
          }(f2, c2, e3) : c2 = Ut(e3, f2, h2, v2, m2, c2), "function" == typeof n3.type && (n3.__d = c2)) : c2 && h2.__e == c2 && c2.parentNode != e3 && (c2 = Ht(h2));
        }
      for (n3.__e = p2, l3 = y2; l3--; )
        null != v2[l3] && ("function" == typeof n3.type && null != v2[l3].__e && v2[l3].__e == n3.__d && (n3.__d = Ht(r3, l3 + 1)), function e4(t4, n4, r4) {
          var i4, a4;
          if (N.unmount && N.unmount(t4), !(i4 = t4.ref) || i4.current && i4.current !== t4.__e || zt(i4, null, n4), null != (i4 = t4.__c)) {
            if (i4.componentWillUnmount)
              try {
                i4.componentWillUnmount();
              } catch (t5) {
                N.__e(t5, n4);
              }
            i4.base = i4.__P = null, t4.__c = void 0;
          }
          if (i4 = t4.__k)
            for (a4 = 0; a4 < i4.length; a4++)
              i4[a4] && e4(i4[a4], n4, "function" != typeof t4.type);
          r4 || null == t4.__e || jt(t4.__e), t4.__ = t4.__e = t4.__d = void 0;
        }(v2[l3], v2[l3]));
      if (g2)
        for (l3 = 0; l3 < g2.length; l3++)
          zt(g2[l3], g2[++l3], g2[++l3]);
    }
    function Ut(e3, t3, n3, r3, i3, a3) {
      var s3, o3, c2;
      if (void 0 !== t3.__d)
        s3 = t3.__d, t3.__d = void 0;
      else if (null == n3 || i3 != a3 || null == i3.parentNode)
        e:
          if (null == a3 || a3.parentNode !== e3)
            e3.appendChild(i3), s3 = null;
          else {
            for (o3 = a3, c2 = 0; (o3 = o3.nextSibling) && c2 < r3.length; c2 += 2)
              if (o3 == i3)
                break e;
            e3.insertBefore(i3, a3), s3 = a3;
          }
      return void 0 !== s3 ? s3 : i3.nextSibling;
    }
    function $t(e3, t3, n3) {
      "-" === t3[0] ? e3.setProperty(t3, n3) : e3[t3] = null == n3 ? "" : "number" != typeof n3 || Et.test(t3) ? n3 : n3 + "px";
    }
    function Bt(e3, t3, n3, r3, i3) {
      var a3;
      e:
        if ("style" === t3)
          if ("string" == typeof n3)
            e3.style.cssText = n3;
          else {
            if ("string" == typeof r3 && (e3.style.cssText = r3 = ""), r3)
              for (t3 in r3)
                n3 && t3 in n3 || $t(e3.style, t3, "");
            if (n3)
              for (t3 in n3)
                r3 && n3[t3] === r3[t3] || $t(e3.style, t3, n3[t3]);
          }
        else if ("o" === t3[0] && "n" === t3[1])
          a3 = t3 !== (t3 = t3.replace(/Capture$/, "")), t3 = (t3.toLowerCase() in e3 ? t3.toLowerCase() : t3).slice(2), e3.l || (e3.l = {}), (e3.l[t3 + a3] = n3) ? r3 || e3.addEventListener(t3, a3 ? qt : Qt, a3) : e3.removeEventListener(t3, a3 ? qt : Qt, a3);
        else if ("dangerouslySetInnerHTML" !== t3) {
          if (i3)
            t3 = t3.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
          else if ("href" !== t3 && "list" !== t3 && "form" !== t3 && "tabIndex" !== t3 && "download" !== t3 && t3 in e3)
            try {
              e3[t3] = null == n3 ? "" : n3;
              break e;
            } catch (e4) {
            }
          "function" != typeof n3 && (null != n3 && (false !== n3 || "a" === t3[0] && "r" === t3[1]) ? e3.setAttribute(t3, n3) : e3.removeAttribute(t3));
        }
    }
    function Qt(e3) {
      this.l[e3.type + false](N.event ? N.event(e3) : e3);
    }
    function qt(e3) {
      this.l[e3.type + true](N.event ? N.event(e3) : e3);
    }
    function Vt(e3, t3, n3, r3, i3, a3, s3, o3, c2) {
      var u2, l3, d2, h2, f2, m2, p2, g2, v2, y2, b2, R2, S2, _2 = t3.type;
      if (void 0 === t3.constructor) {
        null != n3.__h && (c2 = n3.__h, o3 = t3.__e = n3.__e, t3.__h = null, a3 = [o3]), (u2 = N.__b) && u2(t3);
        try {
          e:
            if ("function" == typeof _2) {
              if (g2 = t3.props, v2 = (u2 = _2.contextType) && r3[u2.__c], y2 = u2 ? v2 ? v2.props.value : u2.__ : r3, n3.__c ? p2 = (l3 = t3.__c = n3.__c).__ = l3.__E : ("prototype" in _2 && _2.prototype.render ? t3.__c = l3 = new _2(g2, y2) : (t3.__c = l3 = new Ot(g2, y2), l3.constructor = _2, l3.render = Jt), v2 && v2.sub(l3), l3.props = g2, l3.state || (l3.state = {}), l3.context = y2, l3.__n = r3, d2 = l3.__d = true, l3.__h = []), null == l3.__s && (l3.__s = l3.state), null != _2.getDerivedStateFromProps && (l3.__s == l3.state && (l3.__s = kt({}, l3.__s)), kt(l3.__s, _2.getDerivedStateFromProps(g2, l3.__s))), h2 = l3.props, f2 = l3.state, d2)
                null == _2.getDerivedStateFromProps && null != l3.componentWillMount && l3.componentWillMount(), null != l3.componentDidMount && l3.__h.push(l3.componentDidMount);
              else {
                if (null == _2.getDerivedStateFromProps && g2 !== h2 && null != l3.componentWillReceiveProps && l3.componentWillReceiveProps(g2, y2), !l3.__e && null != l3.shouldComponentUpdate && false === l3.shouldComponentUpdate(g2, l3.__s, y2) || t3.__v === n3.__v) {
                  l3.props = g2, l3.state = l3.__s, t3.__v !== n3.__v && (l3.__d = false), (l3.__v = t3).__e = n3.__e, t3.__k = n3.__k, t3.__k.forEach(function(e4) {
                    e4 && (e4.__ = t3);
                  }), l3.__h.length && s3.push(l3);
                  break e;
                }
                null != l3.componentWillUpdate && l3.componentWillUpdate(g2, l3.__s, y2), null != l3.componentDidUpdate && l3.__h.push(function() {
                  l3.componentDidUpdate(h2, f2, m2);
                });
              }
              if (l3.context = y2, l3.props = g2, l3.__v = t3, l3.__P = e3, b2 = N.__r, R2 = 0, "prototype" in _2 && _2.prototype.render)
                l3.state = l3.__s, l3.__d = false, b2 && b2(t3), u2 = l3.render(l3.props, l3.state, l3.context);
              else
                for (; l3.__d = false, b2 && b2(t3), u2 = l3.render(l3.props, l3.state, l3.context), l3.state = l3.__s, l3.__d && ++R2 < 25; )
                  ;
              l3.state = l3.__s, null != l3.getChildContext && (r3 = kt(kt({}, r3), l3.getChildContext())), d2 || null == l3.getSnapshotBeforeUpdate || (m2 = l3.getSnapshotBeforeUpdate(h2, f2)), S2 = null != u2 && u2.type === x && null == u2.key ? u2.props.children : u2, Dt(e3, Array.isArray(S2) ? S2 : [S2], t3, n3, r3, i3, a3, s3, o3, c2), l3.base = t3.__e, t3.__h = null, l3.__h.length && s3.push(l3), p2 && (l3.__E = l3.__ = null), l3.__e = false;
            } else
              null == a3 && t3.__v === n3.__v ? (t3.__k = n3.__k, t3.__e = n3.__e) : t3.__e = function(e4, t4, n4, r4, i4, a4, s4, o4) {
                var c3, u3, l4, d3 = n4.props, h3 = t4.props, f3 = t4.type, m3 = 0;
                if ("svg" === f3 && (i4 = true), null != a4) {
                  for (; m3 < a4.length; m3++)
                    if ((c3 = a4[m3]) && "setAttribute" in c3 == !!f3 && (f3 ? c3.localName === f3 : 3 === c3.nodeType)) {
                      e4 = c3, a4[m3] = null;
                      break;
                    }
                }
                if (null == e4) {
                  if (null === f3)
                    return document.createTextNode(h3);
                  e4 = i4 ? document.createElementNS("http://www.w3.org/2000/svg", f3) : document.createElement(f3, h3.is && h3), a4 = null, o4 = false;
                }
                if (null === f3)
                  d3 === h3 || o4 && e4.data === h3 || (e4.data = h3);
                else {
                  if (a4 = a4 && Nt.call(e4.childNodes), u3 = (d3 = n4.props || Ct).dangerouslySetInnerHTML, l4 = h3.dangerouslySetInnerHTML, !o4) {
                    if (null != a4)
                      for (d3 = {}, m3 = 0; m3 < e4.attributes.length; m3++)
                        d3[e4.attributes[m3].name] = e4.attributes[m3].value;
                    !l4 && !u3 || l4 && (u3 && l4.__html == u3.__html || l4.__html === e4.innerHTML) || (e4.innerHTML = l4 && l4.__html || "");
                  }
                  if (function(e5, t5, n5, r5, i5) {
                    for (var a5 in n5)
                      "children" === a5 || "key" === a5 || a5 in t5 || Bt(e5, a5, null, n5[a5], r5);
                    for (a5 in t5)
                      i5 && "function" != typeof t5[a5] || "children" === a5 || "key" === a5 || "value" === a5 || "checked" === a5 || n5[a5] === t5[a5] || Bt(e5, a5, t5[a5], n5[a5], r5);
                  }(e4, h3, d3, i4, o4), l4)
                    t4.__k = [];
                  else if (m3 = t4.props.children, Dt(e4, Array.isArray(m3) ? m3 : [m3], t4, n4, r4, i4 && "foreignObject" !== f3, a4, s4, a4 ? a4[0] : n4.__k && Ht(n4, 0), o4), null != a4)
                    for (m3 = a4.length; m3--; )
                      null != a4[m3] && jt(a4[m3]);
                  o4 || ("value" in h3 && void 0 !== (m3 = h3.value) && (m3 !== e4.value || "progress" === f3 && !m3 || "option" === f3 && m3 !== d3.value) && Bt(e4, "value", m3, d3.value, false), "checked" in h3 && void 0 !== (m3 = h3.checked) && m3 !== e4.checked && Bt(e4, "checked", m3, d3.checked, false));
                }
                return e4;
              }(n3.__e, t3, n3, r3, i3, a3, s3, c2);
          (u2 = N.diffed) && u2(t3);
        } catch (e4) {
          t3.__v = null, !c2 && null == a3 || (t3.__e = o3, t3.__h = !!c2, a3[a3.indexOf(o3)] = null), N.__e(e4, t3, n3);
        }
      }
    }
    function Kt(e3, t3) {
      N.__c && N.__c(t3, e3), e3.some(function(t4) {
        try {
          e3 = t4.__h, t4.__h = [], e3.some(function(e4) {
            e4.call(t4);
          });
        } catch (e4) {
          N.__e(e4, t4.__v);
        }
      });
    }
    function zt(e3, t3, n3) {
      try {
        "function" == typeof e3 ? e3(t3) : e3.current = t3;
      } catch (e4) {
        N.__e(e4, n3);
      }
    }
    function Jt(e3, t3, n3) {
      return this.constructor(e3, n3);
    }
    function L(e3, t3, n3) {
      var r3, i3, a3;
      N.__ && N.__(e3, t3), i3 = (r3 = "function" == typeof n3) ? null : t3.__k, a3 = [], Vt(t3, e3 = (!r3 && n3 || t3).__k = M(x, null, [e3]), i3 || Ct, Ct, void 0 !== t3.ownerSVGElement, !r3 && n3 ? [n3] : !i3 && t3.firstChild ? Nt.call(t3.childNodes) : null, a3, !r3 && n3 ? n3 : i3 ? i3.__e : t3.firstChild, r3), Kt(a3, e3);
    }
    function Zt(e3, t3) {
      var n3, e3 = { method: e3, payload: t3 }, t3 = e3.method;
      if ("object" !== A(e3 = e3.payload))
        throw new Error("The insights helper expects the payload to be an object.");
      try {
        n3 = de(e3);
      } catch (e4) {
        throw new Error("Could not JSON serialize the payload object.");
      }
      return 'data-insights-method="'.concat(t3, '" data-insights-payload="').concat(n3, '"');
    }
    Nt = Tt.slice, N = { __e: function(e3, t3, n3, r3) {
      for (var i3, a3, s3; t3 = t3.__; )
        if ((i3 = t3.__c) && !i3.__)
          try {
            if ((a3 = i3.constructor) && null != a3.getDerivedStateFromError && (i3.setState(a3.getDerivedStateFromError(e3)), s3 = i3.__d), null != i3.componentDidCatch && (i3.componentDidCatch(e3, r3 || {}), s3 = i3.__d), s3)
              return i3.__E = i3;
          } catch (t4) {
            e3 = t4;
          }
      throw e3;
    } }, xt = 0, Ot.prototype.setState = function(e3, t3) {
      var n3 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = kt({}, this.state);
      (e3 = "function" == typeof e3 ? e3(kt({}, n3), this.props) : e3) && kt(n3, e3), null != e3 && this.__v && (t3 && this.__h.push(t3), At(this));
    }, Ot.prototype.forceUpdate = function(e3) {
      this.__v && (this.__e = true, e3 && this.__h.push(e3), At(this));
    }, Ot.prototype.render = x, It = [], Wt.__r = 0;
    var Yt = function(e3) {
      var n3 = e3.insights, r3 = e3.sendEvent;
      return function(e4) {
        var t3 = Xt(e4.target, e4.currentTarget, function(e5) {
          return e5.hasAttribute("data-insights-event");
        }), t3 = (t3 && function(e5) {
          e5 = e5.getAttribute("data-insights-event");
          if ("string" != typeof e5)
            throw new Error("The insights middleware expects `data-insights-event` to be a base64-encoded JSON string.");
          try {
            return he(e5);
          } catch (e6) {
            throw new Error("The insights middleware was unable to parse `data-insights-event`.");
          }
        }(t3).forEach(function(e5) {
          return r3(e5);
        }), Xt(e4.target, e4.currentTarget, function(e5) {
          return e5.hasAttribute("data-insights-method") && e5.hasAttribute("data-insights-payload");
        }));
        t3 && (t3 = (e4 = function(e5) {
          var t4 = e5.getAttribute("data-insights-method");
          if ("string" != typeof (e5 = e5.getAttribute("data-insights-payload")))
            throw new Error("The insights helper expects `data-insights-payload` to be a base64-encoded JSON string.");
          try {
            return { method: t4, payload: he(e5) };
          } catch (e6) {
            throw new Error("The insights helper was unable to parse `data-insights-payload`.");
          }
        }(t3)).method, e4 = e4.payload, n3(t3, e4));
      };
    };
    function Xt(e3, t3, n3) {
      for (var r3 = e3; r3 && !n3(r3); ) {
        if (r3 === t3)
          return null;
        r3 = r3.parentElement;
      }
      return r3;
    }
    function Gt(r3) {
      var i3 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(r3, tn()), function(s3) {
        var e3 = s3 || {}, t3 = e3.items, e3 = e3.transformItems, o3 = void 0 === e3 ? function(e4) {
          return e4;
        } : e3;
        if (!Array.isArray(t3))
          throw new Error(tn("The `items` option expects an array of objects."));
        var c2 = t3, e3 = c2.filter(function(e4) {
          return true === e4.default;
        });
        if (0 === e3.length)
          throw new Error(tn("A default value must be specified in `items`."));
        if (1 < e3.length)
          throw new Error(tn("More than one default value is specified in `items`."));
        var n3 = e3[0], u2 = function(t4) {
          return function(e4) {
            return (e4 || 0 === e4 ? t4.setQueryParameter("hitsPerPage", e4) : t4.setQueryParameter("hitsPerPage", void 0)).search();
          };
        }, l3 = function(e4) {
          var n4 = e4.state, r4 = e4.createURL, i4 = e4.getWidgetUiState, a3 = e4.helper;
          return function(t4) {
            return r4(function(e5) {
              return i4(e5, { searchParameters: n4.resetPage().setQueryParameter("hitsPerPage", t4 || 0 === t4 ? t4 : void 0), helper: a3 });
            });
          };
        };
        return { $$type: "ais.hitsPerPage", init: function(e4) {
          var t4 = e4.state, n4 = e4.instantSearchInstance;
          c2.some(function(e5) {
            return Number(t4.hitsPerPage) === Number(e5.value);
          }) || (c2 = [{ value: "", label: "" }].concat(w(c2))), r3(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: n4 }), true);
        }, render: function(e4) {
          var t4 = e4.instantSearchInstance;
          r3(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: t4 }), false);
        }, dispose: function(e4) {
          e4 = e4.state;
          return i3(), e4.setQueryParameter("hitsPerPage", void 0);
        }, getRenderState: function(e4, t4) {
          return T(T({}, e4), {}, { hitsPerPage: this.getWidgetRenderState(t4) });
        }, getWidgetRenderState: function(e4) {
          var t4, n4 = e4.state, r4 = e4.results, i4 = e4.createURL, e4 = e4.helper, a3 = !!r4 && 0 < r4.nbHits;
          return { items: o3((t4 = n4.hitsPerPage, c2.map(function(e5) {
            return T(T({}, e5), {}, { isRefined: Number(e5.value) === Number(t4) });
          })), { results: r4 }), refine: u2(e4), createURL: l3({ state: n4, createURL: i4, getWidgetUiState: this.getWidgetUiState, helper: e4 }), hasNoResults: !a3, canRefine: a3, widgetParams: s3 };
        }, getWidgetUiState: function(e4, t4) {
          t4 = t4.searchParameters.hitsPerPage;
          return void 0 === t4 || t4 === n3.value ? e4 : T(T({}, e4), {}, { hitsPerPage: t4 });
        }, getWidgetSearchParameters: function(e4, t4) {
          t4 = t4.uiState;
          return e4.setQueryParameters({ hitsPerPage: t4.hitsPerPage || n3.value });
        } };
      };
    }
    var en = Pt(St), tn = l2({ name: "hits-per-page", connector: true }), nn = ["page"], rn = ["clickAnalytics", "userToken"], an = l2({ name: "infinite-hits", connector: true });
    function sn(e3) {
      e3 = e3 || {};
      e3.page;
      return k(e3, nn);
    }
    function on(e3) {
      e3 = e3 || {};
      e3.clickAnalytics, e3.userToken;
      return k(e3, rn);
    }
    function cn(i3) {
      var a3 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(i3, an()), function(f2) {
        var n3, r3, m2, p2, g2, v2, e3 = f2 || {}, t3 = e3.escapeHTML, y2 = void 0 === t3 || t3, t3 = e3.transformItems, b2 = void 0 === t3 ? function(e4) {
          return e4;
        } : t3, t3 = e3.cache, R2 = void 0 === t3 ? (r3 = n3 = null, { read: function(e4) {
          e4 = e4.state;
          return Oe(r3, sn(e4)) ? n3 : null;
        }, write: function(e4) {
          var t4 = e4.state, e4 = e4.hits;
          r3 = sn(t4), n3 = e4;
        } }) : t3, S2 = function(e4, t4) {
          e4 = e4.page, e4 = void 0 === e4 ? 0 : e4, t4 = Object.keys(t4).map(Number);
          return 0 === t4.length ? e4 : Math.min.apply(Math, [e4].concat(w(t4)));
        }, _2 = function(e4, t4) {
          e4 = e4.page, e4 = void 0 === e4 ? 0 : e4, t4 = Object.keys(t4).map(Number);
          return 0 === t4.length ? e4 : Math.max.apply(Math, [e4].concat(w(t4)));
        };
        return { $$type: "ais.infiniteHits", init: function(e4) {
          i3(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: e4.instantSearchInstance }), true);
        }, render: function(e4) {
          var t4 = e4.instantSearchInstance, e4 = this.getWidgetRenderState(e4);
          i3(T(T({}, e4), {}, { instantSearchInstance: t4 }), false), g2("view:internal", e4.currentPageHits);
        }, getRenderState: function(e4, t4) {
          return T(T({}, e4), {}, { infiniteHits: this.getWidgetRenderState(t4) });
        }, getWidgetRenderState: function(e4) {
          var t4, n4, r4, i4, a4 = e4.results, s3 = e4.helper, o3 = e4.parent, c2 = e4.state, e4 = e4.instantSearchInstance, u2 = [], o3 = o3.getPreviousState() || c2, c2 = R2.read({ state: on(o3) }) || {}, l3 = a4 ? (d2 = void 0 === (d2 = o3.page) ? 0 : d2, y2 && 0 < a4.hits.length && (a4.hits = ce(a4.hits)), h2 = ke(Ee(a4.hits, a4.page, a4.hitsPerPage), a4.queryID), h2 = b2(h2, { results: a4 }), t4 = false, function t5(e5, n5) {
            n5(e5), e5.getWidgets().forEach(function(e6) {
              ge(e6) && t5(e6, n5);
            });
          }(e4.mainIndex, function(e5) {
            !t4 && e5.getWidgets().some(function(e6) {
              return "ais.dynamicWidgets" === e6.$$type;
            }) && (t4 = true);
          }), l3 = !(null != (l3 = o3.disjunctiveFacets) && l3.length || (o3.facets || []).filter(function(e5) {
            return "*" !== e5;
          }).length || null != (l3 = o3.hierarchicalFacets) && l3.length), void 0 !== c2[d2] || a4.__isArtificial || "idle" !== e4.status || t4 && l3 || (c2[d2] = h2, R2.write({ state: on(o3), hits: c2 })), u2 = h2, 0 === S2(o3, c2)) : (m2 = function() {
            r4.overrideStateWithoutTriggeringChangeEvent(T(T({}, r4.state), {}, { page: S2(r4.state, R2.read({ state: on(r4.state) }) || {}) - 1 })).searchWithoutTriggeringOnStateChange();
          }, n4 = r4 = s3, p2 = function() {
            n4.setPage(_2(n4.state, R2.read({ state: on(n4.state) }) || {}) + 1).search();
          }, g2 = me({ instantSearchInstance: e4, getIndex: function() {
            return s3.getIndex();
          }, widgetType: this.$$type }), v2 = pe({ getIndex: function() {
            return s3.getIndex();
          }, widgetType: this.$$type, instantSearchInstance: e4 }), void 0 === o3.page || 0 === S2(o3, c2)), d2 = (i4 = c2, Object.keys(i4).map(Number).sort(function(e5, t5) {
            return e5 - t5;
          }).reduce(function(e5, t5) {
            return e5.concat(i4[t5]);
          }, [])), h2 = !a4 || a4.nbPages <= _2(o3, c2) + 1;
          return { hits: d2, currentPageHits: u2, sendEvent: g2, bindEvent: v2, results: a4, showPrevious: m2, showMore: p2, isFirstPage: l3, isLastPage: h2, widgetParams: f2 };
        }, dispose: function(e4) {
          e4 = e4.state, a3(), e4 = e4.setQueryParameter("page", void 0);
          return y2 ? e4.setQueryParameters(Object.keys(ae).reduce(function(e5, t4) {
            return T(T({}, e5), {}, E({}, t4, void 0));
          }, {})) : e4;
        }, getWidgetUiState: function(e4, t4) {
          t4 = t4.searchParameters.page || 0;
          return t4 ? T(T({}, e4), {}, { page: t4 + 1 }) : e4;
        }, getWidgetSearchParameters: function(e4, t4) {
          var t4 = t4.uiState, n4 = e4, e4 = (y2 && (n4 = e4.setQueryParameters(ae)), t4.page ? t4.page - 1 : 0);
          return n4.setQueryParameter("page", e4);
        } };
      };
    }
    function un(n3) {
      var a3 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(n3, hn()), function(l3) {
        var d2, h2, f2, e3 = l3 || {}, m2 = e3.attribute, t3 = e3.limit, r3 = void 0 === t3 ? 10 : t3, t3 = e3.showMore, p2 = void 0 !== t3 && t3, t3 = e3.showMoreLimit, i3 = void 0 === t3 ? 20 : t3, t3 = e3.sortBy, g2 = void 0 === t3 ? fn : t3, t3 = e3.transformItems, v2 = void 0 === t3 ? function(e4) {
          return e4;
        } : t3;
        if (!m2)
          throw new Error(hn("The `attribute` option is required."));
        if (true === p2 && i3 <= r3)
          throw new Error(hn("The `showMoreLimit` option must be greater than `limit`."));
        var y2 = false, b2 = function() {
        };
        function R2() {
          b2();
        }
        function S2() {
          return y2 ? i3 : r3;
        }
        return { $$type: "ais.menu", init: function(e4) {
          var t4 = e4.instantSearchInstance;
          n3(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: t4 }), true);
        }, render: function(e4) {
          var t4 = e4.instantSearchInstance;
          n3(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: t4 }), false);
        }, dispose: function(e4) {
          e4 = e4.state;
          return a3(), e4.removeHierarchicalFacet(m2).setQueryParameter("maxValuesPerFacet", void 0);
        }, getRenderState: function(e4, t4) {
          return T(T({}, e4), {}, { menu: T(T({}, e4.menu), {}, E({}, m2, this.getWidgetRenderState(t4))) });
        }, getWidgetRenderState: function(e4) {
          var t4, n4, r4 = this, i4 = e4.results, a4 = e4.createURL, s3 = e4.instantSearchInstance, o3 = e4.helper, c2 = [], u2 = false;
          return d2 = d2 || le({ instantSearchInstance: s3, helper: o3, attribute: m2, widgetType: this.$$type }), h2 = h2 || function(t5) {
            return a4(function(e5) {
              return r4.getWidgetUiState(e5, { searchParameters: o3.state.resetPage().toggleFacetRefinement(m2, t5), helper: o3 });
            });
          }, f2 = f2 || function(e5) {
            var t5 = j(o3.getHierarchicalFacetBreadcrumb(m2), 1)[0];
            d2("click:internal", e5 || t5), o3.toggleFacetRefinement(m2, e5 || t5).search();
          }, e4.results && (t4 = e4, n4 = this, b2 = function() {
            y2 = !y2, n4.render(t4);
          }), i4 && (e4 = (s3 = i4.getFacetValues(m2, { sortBy: g2, facetOrdering: g2 === fn })) && !Array.isArray(s3) && s3.data ? s3.data : [], u2 = p2 && (y2 || e4.length > S2()), c2 = v2(e4.slice(0, S2()).map(function(e5) {
            var t5 = e5.name, n5 = e5.escapedValue;
            e5.path;
            return T(T({}, k(e5, dn)), {}, { label: t5, value: n5 });
          }), { results: i4 })), { items: c2, createURL: h2, refine: f2, sendEvent: d2, canRefine: 0 < c2.length, widgetParams: l3, isShowingMore: y2, toggleShowMore: R2, canToggleShowMore: u2 };
        }, getWidgetUiState: function(e4, t4) {
          var t4 = j(t4.searchParameters.getHierarchicalFacetBreadcrumb(m2), 1)[0];
          return e4 = T(T({}, e4), {}, { menu: T(T({}, e4.menu), {}, E({}, m2, t4)) }), t4 = m2, e4.menu && (void 0 === e4.menu[t4] && delete e4.menu[t4], 0 === Object.keys(e4.menu).length) && delete e4.menu, e4;
        }, getWidgetSearchParameters: function(e4, t4) {
          var n4, t4 = t4.uiState, t4 = t4.menu && t4.menu[m2];
          return e4.isConjunctiveFacet(m2) || e4.isDisjunctiveFacet(m2) ? e4 : (n4 = (e4 = e4.removeHierarchicalFacet(m2).addHierarchicalFacet({ name: m2, attributes: [m2] })).maxValuesPerFacet || 0, n4 = Math.max(n4, p2 ? i3 : r3), e4 = e4.setQueryParameter("maxValuesPerFacet", n4), t4 ? e4.addHierarchicalFacetRefinement(m2, t4) : e4.setQueryParameters({ hierarchicalFacetsRefinements: T(T({}, e4.hierarchicalFacetsRefinements), {}, E({}, m2, [])) }));
        } };
      };
    }
    var ln = Pt(cn), dn = ["name", "escapedValue", "path"], hn = l2({ name: "menu", connector: true }), fn = ["isRefined", "name:asc"];
    function mn(n3) {
      var r3 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(n3, pn()), function(f2) {
        var m2, e3 = f2 || {}, t3 = e3.attribute, p2 = void 0 === t3 ? "" : t3, t3 = e3.items, g2 = void 0 === t3 ? [] : t3, t3 = e3.transformItems, v2 = void 0 === t3 ? function(e4) {
          return e4;
        } : t3;
        if ("" === p2)
          throw new Error(pn("The `attribute` option is required."));
        if (g2 && 0 !== g2.length)
          return m2 = {}, { $$type: "ais.numericMenu", init: function(e4) {
            var t4 = e4.instantSearchInstance;
            n3(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: t4 }), true);
          }, render: function(e4) {
            var t4 = e4.instantSearchInstance;
            n3(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: t4 }), false);
          }, dispose: function(e4) {
            e4 = e4.state;
            return r3(), e4.removeNumericRefinement(p2);
          }, getWidgetUiState: function(e4, t4) {
            var t4 = t4.searchParameters.getNumericRefinements(p2), n4 = t4["="] && t4["="][0];
            return n4 || 0 === n4 ? T(T({}, e4), {}, { numericMenu: T(T({}, e4.numericMenu), {}, E({}, p2, "".concat(t4["="]))) }) : (n4 = t4[">="] && t4[">="][0] || "", t4 = t4["<="] && t4["<="][0] || "", e4 = T(T({}, e4), {}, { numericMenu: T(T({}, e4.numericMenu), {}, E({}, p2, "".concat(n4, ":").concat(t4))) }), n4 = p2, e4.numericMenu && (":" === e4.numericMenu[n4] && delete e4.numericMenu[n4], 0 === Object.keys(e4.numericMenu).length) && delete e4.numericMenu, e4);
          }, getWidgetSearchParameters: function(e4, t4) {
            var n4, t4 = t4.uiState, t4 = t4.numericMenu && t4.numericMenu[p2], e4 = e4.setQueryParameters({ numericRefinements: T(T({}, e4.numericRefinements), {}, E({}, p2, {})) });
            return t4 ? -1 === t4.indexOf(":") ? e4.addNumericRefinement(p2, "=", Number(t4)) : (n4 = (t4 = j(t4.split(":").map(parseFloat), 2))[0], t4 = t4[1], n4 = b(n4) ? e4.addNumericRefinement(p2, ">=", n4) : e4, b(t4) ? n4.addNumericRefinement(p2, "<=", t4) : n4) : e4;
          }, getRenderState: function(e4, t4) {
            return T(T({}, e4), {}, { numericMenu: T(T({}, e4.numericMenu), {}, E({}, p2, this.getWidgetRenderState(t4))) });
          }, getWidgetRenderState: function(e4) {
            var t4, r4, n4, i3 = this, a3 = e4.results, s3 = e4.state, o3 = e4.instantSearchInstance, c2 = e4.helper, u2 = e4.createURL, e4 = (m2.refine || (m2.refine = function(e5) {
              var t5 = vn(c2.state, p2, e5);
              m2.sendEvent("click:internal", e5), c2.setState(t5).search();
            }), m2.createURL || (m2.createURL = function(n5) {
              return function(t5) {
                return u2(function(e5) {
                  return i3.getWidgetUiState(e5, { searchParameters: vn(n5, p2, t5), helper: c2 });
                });
              };
            }), m2.sendEvent || (m2.sendEvent = (t4 = { instantSearchInstance: o3 }.instantSearchInstance, function() {
              1 === arguments.length && t4.sendEventToInsights(arguments.length <= 0 ? void 0 : arguments[0]);
            })), !a3 || 0 === a3.nbHits), o3 = (r4 = s3, g2.map(function(e5) {
              var t5 = e5.start, n5 = e5.end, e5 = e5.label;
              return { label: e5, value: encodeURI(JSON.stringify({ start: t5, end: n5 })), isRefined: gn(r4, p2, { start: t5, end: n5, label: e5 }) };
            })), l3 = true, d2 = function(e5, t5) {
              var n5, r5, i4, a4, s4 = "undefined" != typeof Symbol && e5[Symbol.iterator] || e5["@@iterator"];
              if (s4)
                return r5 = !(n5 = true), { s: function() {
                  s4 = s4.call(e5);
                }, n: function() {
                  var e6 = s4.next();
                  return n5 = e6.done, e6;
                }, e: function(e6) {
                  r5 = true, i4 = e6;
                }, f: function() {
                  try {
                    n5 || null == s4.return || s4.return();
                  } finally {
                    if (r5)
                      throw i4;
                  }
                } };
              if (Array.isArray(e5) || (s4 = V(e5)) || t5 && e5 && "number" == typeof e5.length)
                return s4 && (e5 = s4), a4 = 0, { s: t5 = function() {
                }, n: function() {
                  return a4 >= e5.length ? { done: true } : { done: false, value: e5[a4++] };
                }, e: function(e6) {
                  throw e6;
                }, f: t5 };
              throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }(o3);
            try {
              for (d2.s(); !(n4 = d2.n()).done; ) {
                var h2 = n4.value;
                if (h2.isRefined && "{}" !== decodeURI(h2.value)) {
                  l3 = false;
                  break;
                }
              }
            } catch (e5) {
              d2.e(e5);
            } finally {
              d2.f();
            }
            return { createURL: m2.createURL(s3), items: v2(o3, { results: a3 }), hasNoResults: e4, canRefine: !(e4 && l3), refine: m2.refine, sendEvent: m2.sendEvent, widgetParams: f2 };
          } };
        throw new Error(pn("The `items` option expects an array of objects."));
      };
    }
    var pn = l2({ name: "numeric-menu", connector: true });
    function gn(e3, t3, n3) {
      var r3 = e3.getNumericRefinements(t3);
      return void 0 !== n3.start && void 0 !== n3.end ? n3.start === n3.end ? yn(r3, "=", n3.start) : yn(r3, ">=", n3.start) && yn(r3, "<=", n3.end) : void 0 !== n3.start ? yn(r3, ">=", n3.start) : void 0 !== n3.end ? yn(r3, "<=", n3.end) : void 0 === n3.start && void 0 === n3.end && Object.keys(r3).every(function(e4) {
        return 0 === (r3[e4] || []).length;
      });
    }
    function vn(e3, t3, n3) {
      var n3 = JSON.parse(decodeURI(n3)), r3 = e3.getNumericRefinements(t3);
      if (void 0 === n3.start && void 0 === n3.end)
        return e3.removeNumericRefinement(t3);
      if (gn(e3, t3, n3) || (e3 = e3.removeNumericRefinement(t3)), void 0 !== n3.start && void 0 !== n3.end) {
        if (n3.start > n3.end)
          throw new Error("option.start should be > to option.end");
        if (n3.start === n3.end)
          return e3 = yn(r3, "=", n3.start) ? e3.removeNumericRefinement(t3, "=", n3.start) : e3.addNumericRefinement(t3, "=", n3.start);
      }
      return void 0 !== n3.start && (e3 = (e3 = yn(r3, ">=", n3.start) ? e3.removeNumericRefinement(t3, ">=", n3.start) : e3).addNumericRefinement(t3, ">=", n3.start)), "number" == typeof (e3 = void 0 !== n3.end ? (e3 = yn(r3, "<=", n3.end) ? e3.removeNumericRefinement(t3, "<=", n3.end) : e3).addNumericRefinement(t3, "<=", n3.end) : e3).page && (e3.page = 0), e3;
    }
    function yn(e3, t3, n3) {
      return void 0 !== e3[t3] && e3[t3].includes(n3);
    }
    function bn(n3) {
      var t3 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(n3, Sn()), function(a3) {
        var e3 = a3 || {}, s3 = e3.totalPages, e3 = e3.padding, o3 = new Rn({ currentPage: 0, total: 0, padding: void 0 === e3 ? 3 : e3 }), c2 = {};
        return { $$type: "ais.pagination", init: function(e4) {
          var t4 = e4.instantSearchInstance;
          n3(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: t4 }), true);
        }, render: function(e4) {
          var t4 = e4.instantSearchInstance;
          n3(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: t4 }), false);
        }, dispose: function(e4) {
          e4 = e4.state;
          return t3(), e4.setQueryParameter("page", void 0);
        }, getWidgetUiState: function(e4, t4) {
          t4 = t4.searchParameters.page || 0;
          return t4 ? T(T({}, e4), {}, { page: t4 + 1 }) : e4;
        }, getWidgetSearchParameters: function(e4, t4) {
          t4 = t4.uiState, t4 = t4.page ? t4.page - 1 : 0;
          return e4.setQueryParameter("page", t4);
        }, getWidgetRenderState: function(e4) {
          var t4 = e4.results, n4 = e4.helper, r3 = e4.state, i3 = e4.createURL, e4 = (c2.refine || (c2.refine = function(e5) {
            n4.setPage(e5), n4.search();
          }), c2.createURL || (c2.createURL = function(t5) {
            return i3(function(e5) {
              return T(T({}, e5), {}, { page: t5 + 1 });
            });
          }), r3.page || 0), r3 = (r3 = (r3 = t4 || { nbPages: 0 }).nbPages, void 0 !== s3 ? Math.min(s3, r3) : r3);
          return o3.currentPage = e4, o3.total = r3, { createURL: c2.createURL, refine: c2.refine, canRefine: 1 < r3, currentRefinement: e4, nbHits: (null == t4 ? void 0 : t4.nbHits) || 0, nbPages: r3, pages: t4 ? o3.pages() : [], isFirstPage: o3.isFirstPage(), isLastPage: o3.isLastPage(), widgetParams: a3 };
        }, getRenderState: function(e4, t4) {
          return T(T({}, e4), {}, { pagination: this.getWidgetRenderState(t4) });
        } };
      };
    }
    var Rn = function() {
      function t3(e3) {
        W(this, t3), E(this, "currentPage", void 0), E(this, "total", void 0), E(this, "padding", void 0), this.currentPage = e3.currentPage, this.total = e3.total, this.padding = e3.padding;
      }
      return D(t3, [{ key: "pages", value: function() {
        var e3, t4 = this.total, n3 = this.currentPage, r3 = this.padding;
        return 0 === t4 ? [0] : Ge((e3 = this.nbPagesDisplayed(r3, t4)) === t4 ? { end: t4 } : { start: n3 - (r3 = this.calculatePaddingLeft(n3, r3, t4, e3)), end: n3 + (e3 - r3) });
      } }, { key: "nbPagesDisplayed", value: function(e3, t4) {
        return Math.min(2 * e3 + 1, t4);
      } }, { key: "calculatePaddingLeft", value: function(e3, t4, n3, r3) {
        return e3 <= t4 ? e3 : n3 - t4 <= e3 ? r3 - (n3 - e3) : t4;
      } }, { key: "isLastPage", value: function() {
        return this.currentPage === this.total - 1 || 0 === this.total;
      } }, { key: "isFirstPage", value: function() {
        return 0 === this.currentPage;
      } }]), t3;
    }(), Sn = l2({ name: "pagination", connector: true }), _n = l2({ name: "range-input", connector: true }, { name: "range-slider", connector: true });
    function wn(e3) {
      var t3 = e3.min, n3 = e3.max, e3 = e3.precision, e3 = Math.pow(10, e3);
      return { min: t3 && Math.floor(t3 * e3) / e3, max: n3 && Math.ceil(n3 * e3) / e3 };
    }
    function Pn(n3) {
      var r3 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(n3, _n()), function(o3) {
        var e3 = o3 || {}, t3 = e3.attribute, u2 = void 0 === t3 ? "" : t3, l3 = e3.min, d2 = e3.max, t3 = e3.precision, h2 = void 0 === t3 ? 0 : t3;
        if (!u2)
          throw new Error(_n("The `attribute` option is required."));
        if (b(l3) && b(d2) && d2 < l3)
          throw new Error(_n("The `max` option can't be lower than `min`."));
        var c2 = { from: function(e4) {
          return e4.toLocaleString();
        }, to: function(e4) {
          return Number(Number(e4).toFixed(h2)).toLocaleString();
        } }, i3 = function(e4, t4, n4, r4) {
          var e4 = e4.state, i4 = t4.min, t4 = t4.max, a3 = j(e4.getNumericRefinement(u2, ">=") || [], 1)[0], s3 = j(e4.getNumericRefinement(u2, "<=") || [], 1)[0], o4 = void 0 === n4 || "" === n4, c3 = void 0 === r4 || "" === r4, n4 = wn({ min: o4 ? void 0 : parseFloat(n4), max: c3 ? void 0 : parseFloat(r4), precision: h2 }), r4 = n4.min, n4 = n4.max, o4 = b(l3) || i4 !== r4 ? b(l3) && o4 ? l3 : r4 : void 0, r4 = b(d2) || t4 !== n4 ? b(d2) && c3 ? d2 : n4 : void 0, c3 = void 0 === o4, n4 = b(i4) && i4 <= o4, c3 = c3 || b(o4) && (!b(i4) || n4), i4 = void 0 === r4, n4 = b(r4) && r4 <= t4, i4 = i4 || b(r4) && (!b(t4) || n4);
          return (a3 !== o4 || s3 !== r4) && c3 && i4 ? (e4 = e4.removeNumericRefinement(u2), b(o4) && (e4 = e4.addNumericRefinement(u2, ">=", o4)), (e4 = b(r4) ? e4.addNumericRefinement(u2, "<=", r4) : e4).resetPage()) : null;
        };
        function f2(n4, r4) {
          return function() {
            var e4 = j(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [void 0, void 0], 2), t4 = e4[0], e4 = e4[1], t4 = i3(n4, r4, t4, e4);
            t4 && n4.setState(t4).search();
          };
        }
        return { $$type: "ais.range", init: function(e4) {
          n3(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: e4.instantSearchInstance }), true);
        }, render: function(e4) {
          n3(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: e4.instantSearchInstance }), false);
        }, getRenderState: function(e4, t4) {
          return T(T({}, e4), {}, { range: T(T({}, e4.range), {}, E({}, u2, this.getWidgetRenderState(t4))) });
        }, getWidgetRenderState: function(e4) {
          var t4, n4 = e4.results, r4 = e4.helper, e4 = e4.instantSearchInstance, i4 = _e(n4 && n4.disjunctiveFacets || [], function(e5) {
            return e5.name === u2;
          }), i4 = i4 && i4.stats || { min: void 0, max: void 0 }, a3 = (i4 = i4, a3 = b(l3) ? l3 : b(i4.min) ? i4.min : 0, i4 = b(d2) ? d2 : b(i4.max) ? i4.max : 0, wn({ min: a3, max: i4, precision: h2 })), s3 = (s3 = j((i4 = r4).getNumericRefinement(u2, ">=") || [], 1)[0], i4 = j(i4.getNumericRefinement(u2, "<=") || [], 1)[0], [b(s3) ? s3 : -1 / 0, b(i4) ? i4 : 1 / 0]), i4 = f2(r4, n4 ? a3 : { min: void 0, max: void 0 });
          return { refine: i4, canRefine: a3.min !== a3.max, format: c2, range: a3, sendEvent: (t4 = e4, function() {
            1 === arguments.length && t4.sendEventToInsights(arguments.length <= 0 ? void 0 : arguments[0]);
          }), widgetParams: T(T({}, o3), {}, { precision: h2 }), start: s3 };
        }, dispose: function(e4) {
          e4 = e4.state;
          return r3(), e4.removeDisjunctiveFacet(u2).removeNumericRefinement(u2);
        }, getWidgetUiState: function(e4, t4) {
          var t4 = t4.searchParameters.getNumericRefinements(u2), n4 = t4[">="], n4 = void 0 === n4 ? [] : n4, t4 = t4["<="], t4 = void 0 === t4 ? [] : t4;
          return 0 === n4.length && 0 === t4.length ? e4 : T(T({}, e4), {}, { range: T(T({}, e4.range), {}, E({}, u2, "".concat(n4, ":").concat(t4))) });
        }, getWidgetSearchParameters: function(e4, t4) {
          var n4, t4 = t4.uiState, e4 = e4.addDisjunctiveFacet(u2).setQueryParameters({ numericRefinements: T(T({}, e4.numericRefinements), {}, E({}, u2, {})) }), t4 = (b(l3) && (e4 = e4.addNumericRefinement(u2, ">=", l3)), b(d2) && (e4 = e4.addNumericRefinement(u2, "<=", d2)), t4.range && t4.range[u2]);
          return e4 = t4 && -1 !== t4.indexOf(":") && (n4 = (t4 = j(t4.split(":").map(parseFloat), 2))[0], t4 = t4[1], b(n4) && (!b(l3) || l3 < n4) && (e4 = (e4 = e4.removeNumericRefinement(u2, ">=")).addNumericRefinement(u2, ">=", n4)), b(t4)) && (!b(d2) || t4 < d2) ? (e4 = e4.removeNumericRefinement(u2, "<=")).addNumericRefinement(u2, "<=", t4) : e4;
        } };
      };
    }
    function Nn(c2) {
      var n3 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(c2, Fn()), function(h2) {
        var e3 = h2 || {}, f2 = e3.attribute, t3 = e3.operator, i3 = void 0 === t3 ? "or" : t3, t3 = e3.limit, m2 = void 0 === t3 ? 10 : t3, t3 = e3.showMore, p2 = void 0 !== t3 && t3, t3 = e3.showMoreLimit, a3 = void 0 === t3 ? 20 : t3, t3 = e3.sortBy, g2 = void 0 === t3 ? Cn : t3, t3 = e3.escapeFacetValues, o3 = void 0 === t3 || t3, t3 = e3.transformItems, v2 = void 0 === t3 ? function(e4) {
          return e4;
        } : t3;
        if (!f2)
          throw new Error(Fn("The `attribute` option is required."));
        if (!/^(and|or)$/.test(i3))
          throw new Error(Fn('The `operator` must one of: `"and"`, `"or"` (got "'.concat(i3, '").')));
        if (true === p2 && a3 <= m2)
          throw new Error(Fn("`showMoreLimit` should be greater than `limit`."));
        function y2(e4) {
          var t4 = e4.name, n4 = e4.escapedValue;
          return T(T({}, k(e4, xn)), {}, { value: n4, label: t4, highlighted: t4 });
        }
        var b2, R2, S2, _2 = [], w2 = true, P2 = false, N2 = function() {
        };
        function x2() {
          N2();
        }
        function I2() {
          return P2 ? a3 : m2;
        }
        function F2(a4, s3) {
          return function(i4) {
            return function(e4) {
              var t4, n4 = i4.instantSearchInstance, r3 = i4.results;
              "" === e4 && _2 ? c2(T(T({}, s3.getWidgetRenderState(T(T({}, i4), {}, { results: b2 }))), {}, { instantSearchInstance: n4 }), false) : (t4 = { highlightPreTag: (o3 ? ae : u).highlightPreTag, highlightPostTag: (o3 ? ae : u).highlightPostTag }, a4.searchForFacetValues(f2, e4, Math.min(I2(), 100), t4).then(function(e5) {
                e5 = o3 ? e5.facetHits.map(function(e6) {
                  return T(T({}, e6), {}, { highlighted: se(e6.highlighted) });
                }) : e5.facetHits, e5 = v2(e5.map(function(e6) {
                  var t5 = e6.escapedValue, n5 = e6.value;
                  return T(T({}, k(e6, In)), {}, { value: t5, label: n5 });
                }), { results: r3 });
                c2(T(T({}, s3.getWidgetRenderState(T(T({}, i4), {}, { results: b2 }))), {}, { items: e5, canToggleShowMore: false, canRefine: true, isFromSearch: true, instantSearchInstance: n4 }), false);
              }));
            };
          };
        }
        var C2 = function() {
          return function() {
          };
        };
        return { $$type: "ais.refinementList", init: function(e4) {
          c2(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: e4.instantSearchInstance }), true);
        }, render: function(e4) {
          c2(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: e4.instantSearchInstance }), false);
        }, getRenderState: function(e4, t4) {
          return T(T({}, e4), {}, { refinementList: T(T({}, e4.refinementList), {}, E({}, f2, this.getWidgetRenderState(t4))) });
        }, getWidgetRenderState: function(e4) {
          var t4, n4, r3 = this, i4 = e4.results, a4 = e4.state, s3 = e4.createURL, o4 = e4.instantSearchInstance, c3 = e4.helper, u2 = [], l3 = [], o4 = (S2 && R2 && C2 || (S2 = le({ instantSearchInstance: o4, helper: c3, attribute: f2, widgetType: this.$$type }), R2 = function(e5) {
            S2("click:internal", e5), c3.toggleFacetRefinement(f2, e5).search();
          }, C2 = F2(c3, this)), i4 && (l3 = (o4 = i4.getFacetValues(f2, { sortBy: g2, facetOrdering: g2 === Cn })) && Array.isArray(o4) ? o4 : [], u2 = v2(l3.slice(0, I2()).map(y2), { results: i4 }), o4 = a4.maxValuesPerFacet, d2 = I2(), w2 = d2 < o4 ? l3.length <= d2 : l3.length < d2, b2 = i4, _2 = u2, e4.results) && (t4 = e4, n4 = this, N2 = function() {
            P2 = !P2, n4.render(t4);
          }), C2 && C2(e4)), l3 = P2 && _2.length > m2, d2 = p2 && !w2;
          return { createURL: function(t5) {
            return s3(function(e5) {
              return r3.getWidgetUiState(e5, { searchParameters: a4.resetPage().toggleFacetRefinement(f2, t5), helper: c3 });
            });
          }, items: u2, refine: R2, searchForItems: o4, isFromSearch: false, canRefine: 0 < u2.length, widgetParams: h2, isShowingMore: P2, canToggleShowMore: l3 || d2, toggleShowMore: x2, sendEvent: S2, hasExhaustiveItems: w2 };
        }, dispose: function(e4) {
          e4 = e4.state, n3(), e4 = e4.setQueryParameter("maxValuesPerFacet", void 0);
          return "and" === i3 ? e4.removeFacet(f2) : e4.removeDisjunctiveFacet(f2);
        }, getWidgetUiState: function(e4, t4) {
          var t4 = t4.searchParameters, t4 = "or" === i3 ? t4.getDisjunctiveRefinements(f2) : t4.getConjunctiveRefinements(f2);
          return e4 = T(T({}, e4), {}, { refinementList: T(T({}, e4.refinementList), {}, E({}, f2, t4)) }), t4 = f2, e4.refinementList && (e4.refinementList[t4] && 0 !== e4.refinementList[t4].length || delete e4.refinementList[t4], 0 === Object.keys(e4.refinementList).length) && delete e4.refinementList, e4;
        }, getWidgetSearchParameters: function(e4, t4) {
          var n4, t4 = t4.uiState, r3 = "or" === i3;
          return e4.isHierarchicalFacet(f2) || r3 && e4.isConjunctiveFacet(f2) || !r3 && e4.isDisjunctiveFacet(f2) ? e4 : (t4 = t4.refinementList && t4.refinementList[f2], n4 = (e4 = r3 ? e4.addDisjunctiveFacet(f2).removeDisjunctiveFacetRefinement(f2) : e4.addFacet(f2).removeFacetRefinement(f2)).maxValuesPerFacet || 0, n4 = Math.max(n4, p2 ? a3 : m2), e4 = e4.setQueryParameter("maxValuesPerFacet", n4), t4 ? t4.reduce(function(e5, t5) {
            return r3 ? e5.addDisjunctiveFacetRefinement(f2, t5) : e5.addFacetRefinement(f2, t5);
          }, e4) : e4.setQueryParameters(E({}, n4 = r3 ? "disjunctiveFacetsRefinements" : "facetsRefinements", T(T({}, e4[n4]), {}, E({}, f2, [])))));
        } };
      };
    }
    var xn = ["name", "escapedValue"], In = ["escapedValue", "value"], Fn = l2({ name: "refinement-list", connector: true }), Cn = ["isRefined", "count:desc", "name:asc"];
    function Tn(e3, t3) {
      return t3(e3);
    }
    function En(n3) {
      var t3 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(n3, Mn()), function(r3) {
        var i3, a3, e3 = (r3 || {}).queryHook, s3 = void 0 === e3 ? Tn : e3;
        return { $$type: "ais.searchBox", init: function(e4) {
          var t4 = e4.instantSearchInstance;
          n3(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: t4 }), true);
        }, render: function(e4) {
          var t4 = e4.instantSearchInstance;
          n3(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: t4 }), false);
        }, dispose: function(e4) {
          e4 = e4.state;
          return t3(), e4.setQueryParameter("query", void 0);
        }, getRenderState: function(e4, t4) {
          return T(T({}, e4), {}, { searchBox: this.getWidgetRenderState(t4) });
        }, getWidgetRenderState: function(e4) {
          var t4 = e4.helper, n4 = e4.instantSearchInstance, e4 = e4.state;
          return i3 || (i3 = function(e5) {
            s3(e5, function(e6) {
              return t4.setQuery(e6).search();
            });
          }, a3 = function() {
            t4.setQuery("").search();
          }), { query: e4.query || "", refine: i3, clear: a3, widgetParams: r3, isSearchStalled: "stalled" === n4.status };
        }, getWidgetUiState: function(e4, t4) {
          t4 = t4.searchParameters.query || "";
          return "" === t4 || e4 && e4.query === t4 ? e4 : T(T({}, e4), {}, { query: t4 });
        }, getWidgetSearchParameters: function(e4, t4) {
          t4 = t4.uiState;
          return e4.setQueryParameter("query", t4.query || "");
        } };
      };
    }
    function kn(r3) {
      var t3 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R, o3 = (h(r3, Ln()), {});
      return function(i3) {
        var e3 = i3 || {}, a3 = e3.items, e3 = e3.transformItems, s3 = void 0 === e3 ? function(e4) {
          return e4;
        } : e3;
        if (Array.isArray(a3))
          return { $$type: "ais.sortBy", init: function(e4) {
            var t4 = e4.instantSearchInstance, e4 = this.getWidgetRenderState(e4), n3 = e4.currentRefinement;
            _e(a3, function(e5) {
              return e5.value === n3;
            });
            r3(T(T({}, e4), {}, { instantSearchInstance: t4 }), true);
          }, render: function(e4) {
            var t4 = e4.instantSearchInstance;
            r3(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: t4 }), false);
          }, dispose: function(e4) {
            e4 = e4.state;
            return t3(), o3.initialIndex ? e4.setIndex(o3.initialIndex) : e4;
          }, getRenderState: function(e4, t4) {
            return T(T({}, e4), {}, { sortBy: this.getWidgetRenderState(t4) });
          }, getWidgetRenderState: function(e4) {
            var t4 = e4.results, n3 = e4.helper, r4 = e4.state, e4 = e4.parent, e4 = (!o3.initialIndex && e4 && (o3.initialIndex = e4.getIndexName()), o3.setIndex || (o3.setIndex = function(e5) {
              n3.setIndex(e5).search();
            }), !t4 || 0 === t4.nbHits);
            return { currentRefinement: r4.index, options: s3(a3, { results: t4 }), refine: o3.setIndex, hasNoResults: e4, canRefine: !e4 && 0 < a3.length, widgetParams: i3 };
          }, getWidgetUiState: function(e4, t4) {
            t4 = t4.searchParameters.index;
            return T(T({}, e4), {}, { sortBy: t4 !== o3.initialIndex ? t4 : void 0 });
          }, getWidgetSearchParameters: function(e4, t4) {
            t4 = t4.uiState;
            return e4.setQueryParameter("index", t4.sortBy || o3.initialIndex || e4.index);
          } };
        throw new Error(Ln("The `items` option expects an array of objects."));
      };
    }
    function jn(n3) {
      var t3 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(n3, On()), function(g2) {
        var v2, y2, b2, R2, e3 = g2 || {}, S2 = e3.attribute, e3 = e3.max, _2 = void 0 === e3 ? 5 : e3;
        if (S2)
          return y2 = function(e4) {
            var t4, e4 = e4.getNumericRefinements(S2);
            if (null != (t4 = e4[">="]) && t4.length)
              return e4[">="][0];
          }, b2 = function(e4) {
            return (function(e5, t4) {
              v2("click:internal", t4), e5.setState(s3(e5.state, t4)).search();
            }).bind(null, e4);
          }, R2 = function(e4) {
            var n4 = e4.state, r3 = e4.createURL, i3 = e4.getWidgetUiState, a3 = e4.helper;
            return function(t4) {
              return r3(function(e5) {
                return i3(e5, { searchParameters: s3(n4, t4), helper: a3 });
              });
            };
          }, { $$type: Hn, init: function(e4) {
            var t4 = e4.instantSearchInstance;
            n3(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: t4 }), true);
          }, render: function(e4) {
            var t4 = e4.instantSearchInstance;
            n3(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: t4 }), false);
          }, getRenderState: function(e4, t4) {
            return T(T({}, e4), {}, { ratingMenu: T(T({}, e4.ratingMenu), {}, E({}, S2, this.getWidgetRenderState(t4))) });
          }, getWidgetRenderState: function(e4) {
            var o3, c2, u2, l3, t4, n4 = e4.helper, r3 = e4.results, i3 = e4.state, a3 = e4.instantSearchInstance, e4 = e4.createURL, s4 = [], d2 = (v2 || (o3 = (a3 = { instantSearchInstance: a3, helper: n4, getRefinedStar: function() {
              return y2(n4.state);
            }, attribute: S2 }).instantSearchInstance, c2 = a3.helper, u2 = a3.getRefinedStar, l3 = a3.attribute, v2 = function() {
              for (var e5, t5, n5, r4, i4 = arguments.length, a4 = new Array(i4), s5 = 0; s5 < i4; s5++)
                a4[s5] = arguments[s5];
              1 === a4.length ? o3.sendEventToInsights(a4[0]) : (e5 = a4[1], t5 = void 0 === (t5 = a4[2]) ? "Filter Applied" : t5, n5 = (r4 = j(a4[0].split(":"), 2))[0], r4 = r4[1], "click" === n5 && u2() !== Number(e5) && o3.sendEventToInsights({ insightsMethod: "clickedFilters", widgetType: Hn, eventType: n5, eventModifier: r4, payload: { eventName: t5, index: c2.getIndex(), filters: ["".concat(l3, ">=").concat(e5)] }, attribute: l3 }));
            }), false), h2 = 0, f2 = null == r3 ? void 0 : r3.getFacetValues(S2, {});
            if (r3 && f2) {
              f2.length, t4 = 0, f2.forEach(function(e5) {
                e5 = j(e5.name.split("."), 2)[1];
                t4 = Math.max(t4, (void 0 === e5 ? "" : e5).length);
              });
              for (var m2 = y2(i3), p2 = 1; p2 < _2; p2 += 1)
                (function(n5) {
                  var e5 = m2 === n5, t5 = (d2 = d2 || e5, f2.filter(function(e6) {
                    return Number(e6.name) >= n5 && Number(e6.name) <= _2;
                  }).map(function(e6) {
                    return e6.count;
                  }).reduce(function(e6, t6) {
                    return e6 + t6;
                  }, 0));
                  if (h2 += t5, m2 && !e5 && 0 === t5)
                    return;
                  var r4 = w(new Array(Math.floor(+_2))).map(function(e6, t6) {
                    return +t6 < n5;
                  });
                  s4.push({ stars: r4, name: String(n5), label: String(n5), value: String(n5), count: t5, isRefined: e5 });
                })(p2);
            }
            s4 = s4.reverse(), a3 = !r3 || 0 === r3.nbHits;
            return { items: s4, hasNoResults: a3, canRefine: (!a3 || d2) && 0 < h2, refine: b2(n4), sendEvent: v2, createURL: R2({ state: i3, createURL: e4, helper: n4, getWidgetUiState: this.getWidgetUiState }), widgetParams: g2 };
          }, dispose: function(e4) {
            e4 = e4.state;
            return t3(), e4.removeNumericRefinement(S2);
          }, getWidgetUiState: function(e4, t4) {
            var t4 = t4.searchParameters, t4 = y2(t4);
            return e4 = T(T({}, e4), {}, { ratingMenu: T(T({}, e4.ratingMenu), {}, E({}, S2, "number" == typeof t4 ? t4 : void 0)) }), t4 = S2, e4.ratingMenu && ("number" != typeof e4.ratingMenu[t4] && delete e4.ratingMenu[t4], 0 === Object.keys(e4.ratingMenu).length) && delete e4.ratingMenu, e4;
          }, getWidgetSearchParameters: function(e4, t4) {
            t4 = t4.uiState, t4 = t4.ratingMenu && t4.ratingMenu[S2], e4 = e4.addDisjunctiveFacet(S2).removeNumericRefinement(S2).removeDisjunctiveFacetRefinement(S2);
            return t4 ? e4.addNumericRefinement(S2, "<=", _2).addNumericRefinement(S2, ">=", t4) : e4.setQueryParameters({ numericRefinements: T(T({}, e4.numericRefinements), {}, E({}, S2, {})) });
          } };
        throw new Error(On("The `attribute` option is required."));
        function s3(e4, t4) {
          var n4 = y2(e4) === Number(t4), e4 = e4.resetPage().removeNumericRefinement(S2);
          return n4 ? e4 : e4.addNumericRefinement(S2, "<=", _2).addNumericRefinement(S2, ">=", Number(t4));
        }
      };
    }
    var Mn = l2({ name: "search-box", connector: true }), Ln = l2({ name: "sort-by", connector: true }), On = l2({ name: "rating-menu", connector: true }), Hn = "ais.ratingMenu";
    function An(r3) {
      var e3 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(r3, Un()), function(n3) {
        return { $$type: "ais.stats", init: function(e4) {
          var t3 = e4.instantSearchInstance;
          r3(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: t3 }), true);
        }, render: function(e4) {
          var t3 = e4.instantSearchInstance;
          r3(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: t3 }), false);
        }, dispose: function() {
          e3();
        }, getRenderState: function(e4, t3) {
          return T(T({}, e4), {}, { stats: this.getWidgetRenderState(t3) });
        }, getWidgetRenderState: function(e4) {
          var t3 = e4.results, e4 = e4.state;
          return t3 ? { hitsPerPage: t3.hitsPerPage, nbHits: t3.nbHits, nbSortedHits: t3.nbSortedHits, areHitsSorted: void 0 !== t3.appliedRelevancyStrictness && 0 < t3.appliedRelevancyStrictness && t3.nbSortedHits !== t3.nbHits, nbPages: t3.nbPages, page: t3.page, processingTimeMS: t3.processingTimeMS, query: t3.query, widgetParams: n3 } : { hitsPerPage: e4.hitsPerPage, nbHits: 0, nbSortedHits: void 0, areHitsSorted: false, nbPages: 0, page: e4.page || 0, processingTimeMS: -1, query: e4.query || "", widgetParams: n3 };
        } };
      };
    }
    function Wn(n3) {
      var r3 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(n3, $n()), function(g2) {
        var v2, y2, b2, R2, S2, e3 = g2 || {}, _2 = e3.attribute, t3 = e3.on, e3 = e3.off;
        if (_2)
          return v2 = void 0 !== e3, y2 = it(void 0 === t3 || t3).map(Se), b2 = v2 ? it(e3).map(Se) : void 0, S2 = function(t4, e4) {
            var n4 = e4.state, r4 = e4.createURL, i3 = e4.getWidgetUiState, a3 = e4.helper;
            return function() {
              n4 = n4.resetPage();
              var e5 = t4 ? y2 : b2, e5 = (e5 && e5.forEach(function(e6) {
                n4 = n4.removeDisjunctiveFacetRefinement(_2, e6);
              }), t4 ? b2 : y2);
              return e5 && e5.forEach(function(e6) {
                n4 = n4.addDisjunctiveFacetRefinement(_2, e6);
              }), r4(function(e6) {
                return i3(e6, { searchParameters: n4, helper: a3 });
              });
            };
          }, { $$type: Bn, init: function(e4) {
            var t4 = e4.instantSearchInstance;
            n3(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: t4 }), true);
          }, render: function(e4) {
            var t4 = e4.instantSearchInstance;
            n3(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: t4 }), false);
          }, dispose: function(e4) {
            e4 = e4.state;
            return r3(), e4.removeDisjunctiveFacet(_2);
          }, getRenderState: function(e4, t4) {
            return T(T({}, e4), {}, { toggleRefinement: T(T({}, e4.toggleRefinement), {}, E({}, _2, this.getWidgetRenderState(t4))) });
          }, getWidgetRenderState: function(e4) {
            var n4, t4, o3, c2, u2, l3, r4, i3 = e4.state, a3 = e4.helper, s3 = e4.results, d2 = e4.createURL, e4 = e4.instantSearchInstance, h2 = s3 ? y2.every(function(e5) {
              return i3.isDisjunctiveFacetRefined(_2, e5);
            }) : y2.every(function(e5) {
              return i3.isDisjunctiveFacetRefined(_2, e5);
            }), f2 = { isRefined: h2, count: 0 }, m2 = { isRefined: v2 && !h2, count: 0 }, p2 = (s3 && (p2 = it(b2 || false), n4 = s3.getFacetValues(_2, {}) || [], t4 = y2.map(function(t5) {
              return _e(n4, function(e5) {
                return e5.escapedValue === Se(String(t5));
              });
            }).filter(function(e5) {
              return void 0 !== e5;
            }), p2 = v2 ? p2.map(function(t5) {
              return _e(n4, function(e5) {
                return e5.escapedValue === Se(String(t5));
              });
            }).filter(function(e5) {
              return void 0 !== e5;
            }) : [], f2 = { isRefined: !!t4.length && t4.every(function(e5) {
              return e5.isRefined;
            }), count: t4.reduce(function(e5, t5) {
              return e5 + t5.count;
            }, 0) || null }, m2 = { isRefined: !!p2.length && p2.every(function(e5) {
              return e5.isRefined;
            }), count: p2.reduce(function(e5, t5) {
              return e5 + t5.count;
            }, 0) || n4.reduce(function(e5, t5) {
              return e5 + t5.count;
            }, 0) }), R2 || (o3 = (t4 = { instantSearchInstance: e4, attribute: _2, on: y2, helper: a3 }).instantSearchInstance, c2 = t4.helper, u2 = t4.attribute, l3 = t4.on, R2 = function() {
              for (var e5, t5, n5, r5, i4 = arguments.length, a4 = new Array(i4), s4 = 0; s4 < i4; s4++)
                a4[s4] = arguments[s4];
              1 === a4.length ? o3.sendEventToInsights(a4[0]) : (e5 = a4[1], t5 = void 0 === (t5 = a4[2]) ? "Filter Applied" : t5, n5 = (r5 = j(a4[0].split(":"), 2))[0], r5 = r5[1], "click" !== n5 || void 0 === l3 || e5 || o3.sendEventToInsights({ insightsMethod: "clickedFilters", widgetType: Bn, eventType: n5, eventModifier: r5, payload: { eventName: t5, index: c2.getIndex(), filters: l3.map(function(e6) {
                return "".concat(u2, ":").concat(e6);
              }) }, attribute: u2 }));
            }), h2 ? m2 : f2);
            return { value: { name: _2, isRefined: h2, count: s3 ? p2.count : null, onFacetValue: f2, offFacetValue: m2 }, createURL: S2(h2, { state: i3, createURL: d2, helper: a3, getWidgetUiState: this.getWidgetUiState }), sendEvent: R2, canRefine: Boolean(s3 ? p2.count : null), refine: (r4 = a3, function() {
              var e5 = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : { isRefined: false }).isRefined;
              e5 ? (y2.forEach(function(e6) {
                return r4.removeDisjunctiveFacetRefinement(_2, e6);
              }), v2 && b2.forEach(function(e6) {
                return r4.addDisjunctiveFacetRefinement(_2, e6);
              })) : (R2("click:internal", e5), v2 && b2.forEach(function(e6) {
                return r4.removeDisjunctiveFacetRefinement(_2, e6);
              }), y2.forEach(function(e6) {
                return r4.addDisjunctiveFacetRefinement(_2, e6);
              })), r4.search();
            }), widgetParams: g2 };
          }, getWidgetUiState: function(e4, t4) {
            var n4 = t4.searchParameters, t4 = y2 && y2.every(function(e5) {
              return n4.isDisjunctiveFacetRefined(_2, e5);
            });
            return t4 ? T(T({}, e4), {}, { toggle: T(T({}, e4.toggle), {}, E({}, _2, t4)) }) : (null != (t4 = e4.toggle) && delete t4[_2], e4);
          }, getWidgetSearchParameters: function(e4, t4) {
            var n4, t4 = t4.uiState;
            return e4.isHierarchicalFacet(_2) || e4.isConjunctiveFacet(_2) ? e4 : (n4 = e4.addDisjunctiveFacet(_2).removeDisjunctiveFacetRefinement(_2), Boolean(t4.toggle && t4.toggle[_2]) ? (y2 && y2.forEach(function(e5) {
              n4 = n4.addDisjunctiveFacetRefinement(_2, e5);
            }), n4) : v2 ? (b2 && b2.forEach(function(e5) {
              n4 = n4.addDisjunctiveFacetRefinement(_2, e5);
            }), n4) : n4.setQueryParameters({ disjunctiveFacetsRefinements: T(T({}, e4.disjunctiveFacetsRefinements), {}, E({}, _2, [])) }));
          } };
        throw new Error($n("The `attribute` option is required."));
      };
    }
    function Dn(u2) {
      var l3 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R, d2 = (h(u2, Qn()), {});
      return function(s3) {
        var n3, e3 = s3 || {}, r3 = e3.attributes, t3 = e3.separator, i3 = void 0 === t3 ? " > " : t3, t3 = e3.rootPath, a3 = void 0 === t3 ? null : t3, t3 = e3.transformItems, o3 = void 0 === t3 ? function(e4) {
          return e4;
        } : t3;
        if (r3 && Array.isArray(r3) && 0 !== r3.length)
          return n3 = j(r3, 1)[0], { $$type: "ais.breadcrumb", init: function(e4) {
            u2(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: e4.instantSearchInstance }), true);
          }, render: function(e4) {
            u2(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: e4.instantSearchInstance }), false);
          }, dispose: function() {
            l3();
          }, getRenderState: function(e4, t4) {
            return T(T({}, e4), {}, { breadcrumb: T(T({}, e4.breadcrumb), {}, E({}, n3, this.getWidgetRenderState(t4))) });
          }, getWidgetRenderState: function(e4) {
            var n4 = this, r4 = e4.helper, i4 = e4.createURL, t4 = e4.results, e4 = e4.state;
            var a4, e4 = t4 && 0 !== e4.hierarchicalFacets.length ? (e4 = j(e4.hierarchicalFacets, 1)[0].name, e4 = (e4 = t4.getFacetValues(e4, {})) && !Array.isArray(e4) && e4.data ? e4.data : [], o3((a4 = function n5(e5) {
              return e5.reduce(function(e6, t5) {
                return e6 = t5.isRefined && (e6.push({ label: t5.name, value: t5.escapedValue }), Array.isArray(t5.data)) ? e6.concat(n5(t5.data)) : e6;
              }, []);
            }(e4)).map(function(e5, t5) {
              return { label: e5.label, value: t5 + 1 === a4.length ? null : a4[t5 + 1].value };
            }), { results: t4 })) : [];
            return d2.createURL || (d2.createURL = function(t5) {
              return i4(function(e5) {
                return n4.getWidgetUiState(e5, { searchParameters: c2(r4.state, t5), helper: r4 });
              });
            }), d2.refine || (d2.refine = function(e5) {
              r4.setState(c2(r4.state, e5)).search();
            }), { canRefine: 0 < e4.length, createURL: d2.createURL, items: e4, refine: d2.refine, widgetParams: s3 };
          }, getWidgetUiState: function(e4, t4) {
            var t4 = t4.searchParameters.getHierarchicalFacetBreadcrumb(n3);
            return e4 = T(T({}, e4), {}, { hierarchicalMenu: T(T({}, e4.hierarchicalMenu), {}, E({}, n3, t4)) }), t4 = n3, e4.hierarchicalMenu && (e4.hierarchicalMenu[t4] && e4.hierarchicalMenu[t4].length || delete e4.hierarchicalMenu[t4], 0 === Object.keys(e4.hierarchicalMenu).length) && delete e4.hierarchicalMenu, e4;
          }, getWidgetSearchParameters: function(e4, t4) {
            t4 = t4.uiState, t4 = t4.hierarchicalMenu && t4.hierarchicalMenu[n3];
            if (e4.isConjunctiveFacet(n3) || e4.isDisjunctiveFacet(n3))
              return e4;
            e4.isHierarchicalFacet(n3) && e4.getHierarchicalFacetByName(n3);
            e4 = e4.removeHierarchicalFacet(n3).addHierarchicalFacet({ name: n3, attributes: r3, separator: i3, rootPath: a3 });
            return t4 ? e4.addHierarchicalFacetRefinement(n3, t4.join(i3)) : e4.setQueryParameters({ hierarchicalFacetsRefinements: T(T({}, e4.hierarchicalFacetsRefinements), {}, E({}, n3, [])) });
          } };
        throw new Error(Qn("The `attributes` option expects an array of strings."));
        function c2(e4, t4) {
          return t4 ? e4.resetPage().toggleFacetRefinement(n3, t4) : 0 === (t4 = e4.getHierarchicalFacetBreadcrumb(n3)).length ? e4 : e4.resetPage().toggleFacetRefinement(n3, t4[0]);
        }
      };
    }
    var Un = l2({ name: "stats", connector: true }), $n = l2({ name: "toggle-refinement", connector: true }), Bn = "ais.toggleRefinement", Qn = l2({ name: "breadcrumb", connector: true });
    var qn = l2({ name: "geo-search", connector: true });
    function Vn(e3) {
      return e3.insideBoundingBox || "";
    }
    function Kn(e3, t3) {
      return e3.setQueryParameter("insideBoundingBox", t3);
    }
    function zn(g2) {
      var n3 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(g2, qn()), function(o3) {
        function c2(e4) {
          if (e4.aroundLatLng) {
            var e4 = e4.aroundLatLng, t4 = e4.match(we);
            if (t4)
              return { lat: parseFloat(t4[1]), lng: parseFloat(t4[2]) };
            throw new Error('Invalid value for "aroundLatLng" parameter: "'.concat(e4, '"'));
          }
        }
        function u2() {
          return p2.internalToggleRefineOnMapMove();
        }
        function a3(e4, t4) {
          return function() {
            p2.isRefineOnMapMove = !p2.isRefineOnMapMove, t4(e4);
          };
        }
        function l3() {
          return p2.isRefineOnMapMove;
        }
        function d2() {
          return p2.internalSetMapMoveSinceLastRefine();
        }
        function s3(t4, n4) {
          return function() {
            var e4 = true !== p2.hasMapMoveSinceLastRefine;
            p2.hasMapMoveSinceLastRefine = true, e4 && n4(t4);
          };
        }
        function h2() {
          return p2.hasMapMoveSinceLastRefine;
        }
        var f2, e3 = o3 || {}, t3 = e3.enableRefineOnMapMove, e3 = e3.transformItems, m2 = void 0 === e3 ? function(e4) {
          return e4;
        } : e3, p2 = { isRefineOnMapMove: void 0 === t3 || t3, hasMapMoveSinceLastRefine: false, lastRefinePosition: "", lastRefineBoundingBox: "", internalToggleRefineOnMapMove: R, internalSetMapMoveSinceLastRefine: R };
        return { $$type: Zn, init: function(e4) {
          var t4 = e4.instantSearchInstance;
          p2.internalToggleRefineOnMapMove = a3(e4, R), p2.internalSetMapMoveSinceLastRefine = s3(e4, R), g2(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: t4 }), true);
        }, render: function(e4) {
          var t4 = e4.helper, n4 = e4.instantSearchInstance, t4 = t4.state, r3 = Boolean(t4.aroundLatLng) && Boolean(p2.lastRefinePosition) && t4.aroundLatLng !== p2.lastRefinePosition, i3 = !t4.insideBoundingBox && Boolean(p2.lastRefineBoundingBox) && t4.insideBoundingBox !== p2.lastRefineBoundingBox, r3 = ((r3 || i3) && (p2.hasMapMoveSinceLastRefine = false), p2.lastRefinePosition = t4.aroundLatLng || "", p2.lastRefineBoundingBox = Vn(t4), p2.internalToggleRefineOnMapMove = a3(e4, this.render.bind(this)), p2.internalSetMapMoveSinceLastRefine = s3(e4, this.render.bind(this)), this.getWidgetRenderState(e4));
          f2("view:internal", r3.items), g2(T(T({}, r3), {}, { instantSearchInstance: n4 }), false);
        }, getWidgetRenderState: function(e4) {
          var t4, n4, r3, i3 = e4.helper, a4 = e4.results, e4 = e4.instantSearchInstance, s4 = i3.state, a4 = a4 ? m2(a4.hits.filter(function(e5) {
            return e5._geoloc;
          }), { results: a4 }) : [];
          return f2 = f2 || me({ instantSearchInstance: e4, getIndex: function() {
            return i3.getIndex();
          }, widgetType: Zn }), { items: a4, position: c2(s4), currentRefinement: (e4 = s4).insideBoundingBox && Pe(e4.insideBoundingBox), refine: function(e5) {
            var t5 = e5.northEast, e5 = e5.southWest, t5 = [t5.lat, t5.lng, e5.lat, e5.lng].join();
            r3.setState(Kn(r3.state, t5).resetPage()).search(), p2.hasMapMoveSinceLastRefine = false, p2.lastRefineBoundingBox = t5;
          }, sendEvent: f2, clearMapRefinement: (n4 = r3 = i3, function() {
            n4.setQueryParameter("insideBoundingBox", void 0).search();
          }), isRefinedWithMap: (t4 = s4, function() {
            return Boolean(t4.insideBoundingBox);
          }), toggleRefineOnMapMove: u2, isRefineOnMapMove: l3, setMapMoveSinceLastRefine: d2, hasMapMoveSinceLastRefine: h2, widgetParams: o3 };
        }, getRenderState: function(e4, t4) {
          return T(T({}, e4), {}, { geoSearch: this.getWidgetRenderState(t4) });
        }, dispose: function(e4) {
          e4 = e4.state;
          return n3(), e4.setQueryParameter("insideBoundingBox", void 0);
        }, getWidgetUiState: function(e4, t4) {
          t4 = Vn(t4.searchParameters);
          return !t4 || e4 && e4.geoSearch && e4.geoSearch.boundingBox === t4 ? e4 : T(T({}, e4), {}, { geoSearch: { boundingBox: t4 } });
        }, getWidgetSearchParameters: function(e4, t4) {
          t4 = t4.uiState;
          return t4 && t4.geoSearch ? Kn(e4, t4.geoSearch.boundingBox) : e4.setQueryParameter("insideBoundingBox", void 0);
        } };
      };
    }
    function Jn(r3) {
      var i3 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R, a3 = (h(r3, Yn()), "https://www.algolia.com/?utm_source=instantsearch.js&utm_medium=website&" + "utm_content=".concat(rt(function(e3) {
        return (null == (e3 = e3.window.location) ? void 0 : e3.hostname) || "";
      }, { fallback: function() {
        return "";
      } }), "&") + "utm_campaign=poweredby");
      return function(e3) {
        var t3 = (e3 || {}).url, n3 = void 0 === t3 ? a3 : t3;
        return { $$type: "ais.poweredBy", init: function(e4) {
          var t4 = e4.instantSearchInstance;
          r3(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: t4 }), true);
        }, render: function(e4) {
          var t4 = e4.instantSearchInstance;
          r3(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: t4 }), false);
        }, getRenderState: function(e4, t4) {
          return T(T({}, e4), {}, { poweredBy: this.getWidgetRenderState(t4) });
        }, getWidgetRenderState: function() {
          return { url: n3, widgetParams: e3 };
        }, dispose: function() {
          i3();
        } };
      };
    }
    var Zn = "ais.geoSearch", Yn = l2({ name: "powered-by", connector: true });
    function n2() {
      this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0;
    }
    var Xn = n2;
    function Gn(e3) {
      return "function" == typeof e3;
    }
    function er(e3) {
      return "object" == typeof e3 && null !== e3;
    }
    function tr(e3) {
      return void 0 === e3;
    }
    n2.prototype._events = void 0, n2.prototype._maxListeners = void 0, n2.defaultMaxListeners = 10, n2.prototype.setMaxListeners = function(e3) {
      if ("number" != typeof e3 || e3 < 0 || isNaN(e3))
        throw TypeError("n must be a positive number");
      return this._maxListeners = e3, this;
    }, n2.prototype.emit = function(e3) {
      var t3, n3, r3, i3, a3, s3, o3;
      if ((this._events || (this._events = {}), "error" === e3) && (!this._events.error || er(this._events.error) && !this._events.error.length))
        throw (o3 = arguments[1]) instanceof Error ? o3 : ((s3 = new Error('Uncaught, unspecified "error" event. (' + o3 + ")")).context = o3, s3);
      if (tr(t3 = this._events[e3]))
        return false;
      if (Gn(t3))
        switch (arguments.length) {
          case 1:
            t3.call(this);
            break;
          case 2:
            t3.call(this, arguments[1]);
            break;
          case 3:
            t3.call(this, arguments[1], arguments[2]);
            break;
          default:
            r3 = Array.prototype.slice.call(arguments, 1), t3.apply(this, r3);
        }
      else if (er(t3))
        for (r3 = Array.prototype.slice.call(arguments, 1), n3 = (a3 = t3.slice()).length, i3 = 0; i3 < n3; i3++)
          a3[i3].apply(this, r3);
      return true;
    }, n2.prototype.on = n2.prototype.addListener = function(e3, t3) {
      if (Gn(t3))
        return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e3, Gn(t3.listener) ? t3.listener : t3), this._events[e3] ? er(this._events[e3]) ? this._events[e3].push(t3) : this._events[e3] = [this._events[e3], t3] : this._events[e3] = t3, er(this._events[e3]) && !this._events[e3].warned && (t3 = tr(this._maxListeners) ? n2.defaultMaxListeners : this._maxListeners) && 0 < t3 && this._events[e3].length > t3 && (this._events[e3].warned = true, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e3].length), "function" == typeof console.trace) && console.trace(), this;
      throw TypeError("listener must be a function");
    }, n2.prototype.once = function(e3, t3) {
      var n3;
      if (Gn(t3))
        return n3 = false, r3.listener = t3, this.on(e3, r3), this;
      throw TypeError("listener must be a function");
      function r3() {
        this.removeListener(e3, r3), n3 || (n3 = true, t3.apply(this, arguments));
      }
    }, n2.prototype.removeListener = function(e3, t3) {
      var n3, r3, i3, a3;
      if (!Gn(t3))
        throw TypeError("listener must be a function");
      if (this._events && this._events[e3]) {
        if (i3 = (n3 = this._events[e3]).length, r3 = -1, n3 === t3 || Gn(n3.listener) && n3.listener === t3)
          delete this._events[e3], this._events.removeListener && this.emit("removeListener", e3, t3);
        else if (er(n3)) {
          for (a3 = i3; 0 < a3--; )
            if (n3[a3] === t3 || n3[a3].listener && n3[a3].listener === t3) {
              r3 = a3;
              break;
            }
          if (r3 < 0)
            return this;
          1 === n3.length ? (n3.length = 0, delete this._events[e3]) : n3.splice(r3, 1), this._events.removeListener && this.emit("removeListener", e3, t3);
        }
      }
      return this;
    }, n2.prototype.removeAllListeners = function(e3) {
      var t3, n3;
      if (this._events)
        if (this._events.removeListener)
          if (0 === arguments.length) {
            for (t3 in this._events)
              "removeListener" !== t3 && this.removeAllListeners(t3);
            this.removeAllListeners("removeListener"), this._events = {};
          } else {
            if (Gn(n3 = this._events[e3]))
              this.removeListener(e3, n3);
            else if (n3)
              for (; n3.length; )
                this.removeListener(e3, n3[n3.length - 1]);
            delete this._events[e3];
          }
        else
          0 === arguments.length ? this._events = {} : this._events[e3] && delete this._events[e3];
      return this;
    }, n2.prototype.listeners = function(e3) {
      e3 = this._events && this._events[e3] ? Gn(this._events[e3]) ? [this._events[e3]] : this._events[e3].slice() : [];
      return e3;
    }, n2.prototype.listenerCount = function(e3) {
      if (this._events) {
        e3 = this._events[e3];
        if (Gn(e3))
          return 1;
        if (e3)
          return e3.length;
      }
      return 0;
    }, n2.listenerCount = function(e3, t3) {
      return e3.listenerCount(t3);
    };
    var e2 = function(e3, t3) {
      e3.prototype = Object.create(t3.prototype, { constructor: { value: e3, enumerable: false, writable: true, configurable: true } });
    };
    function nr(e3, t3, n3) {
      this.main = e3, this.fn = t3, this.recommendFn = n3, this.lastResults = null, this.lastRecommendResults = null;
    }
    e2(nr, Xn), nr.prototype.detach = function() {
      this.removeAllListeners(), this.main.detachDerivedHelper(this);
    }, nr.prototype.getModifiedState = function(e3) {
      return this.fn(e3);
    }, nr.prototype.getModifiedRecommendState = function(e3) {
      return this.recommendFn(e3);
    };
    var rr = nr;
    var ir = function(e3) {
      return "string" != typeof e3 ? e3 : String(e3).replace(/^-/, "\\-");
    }, ar = function(e3) {
      return "string" != typeof e3 ? e3 : e3.replace(/^\\-/, "-");
    };
    function sr(e3) {
      return "function" == typeof e3 || Array.isArray(e3) || "[object Object]" === Object.prototype.toString.call(e3);
    }
    function or(e3, t3) {
      var n3, r3;
      if (e3 !== t3)
        for (var i3 in t3)
          Object.prototype.hasOwnProperty.call(t3, i3) && "__proto__" !== i3 && "constructor" !== i3 && (n3 = t3[i3], void 0 !== (r3 = e3[i3]) && void 0 === n3 || (sr(r3) && sr(n3) ? e3[i3] = or(r3, n3) : e3[i3] = "object" == typeof (r3 = n3) && null !== r3 ? or(Array.isArray(r3) ? [] : {}, r3) : r3));
      return e3;
    }
    var cr = function(e3) {
      sr(e3) || (e3 = {});
      for (var t3 = 1, n3 = arguments.length; t3 < n3; t3++) {
        var r3 = arguments[t3];
        sr(r3) && or(e3, r3);
      }
      return e3;
    };
    var ur = function(e3) {
      return e3 && 0 < Object.keys(e3).length;
    };
    var lr = function(e3, t3) {
      if (null === e3)
        return {};
      for (var n3, r3 = {}, i3 = Object.keys(e3), a3 = 0; a3 < i3.length; a3++)
        n3 = i3[a3], 0 <= t3.indexOf(n3) || (r3[n3] = e3[n3]);
      return r3;
    };
    function dr(e3) {
      this.params = (e3 = e3 || {}).params || [];
    }
    dr.prototype = { constructor: dr, addParams: function(t3) {
      var e3 = this.params.slice(), n3 = this.params.findIndex(function(e4) {
        return e4.$$id === t3.$$id;
      });
      return -1 !== n3 ? e3.splice(n3, 1, t3) : e3.push(t3), new dr({ params: e3 });
    }, removeParams: function(t3) {
      return new dr({ params: this.params.filter(function(e3) {
        return e3.$$id !== t3;
      }) });
    }, addFrequentlyBoughtTogether: function(e3) {
      return this.addParams(Object.assign({}, e3, { model: "bought-together" }));
    }, addRelatedProducts: function(e3) {
      return this.addParams(Object.assign({}, e3, { model: "related-products" }));
    }, addTrendingItems: function(e3) {
      return this.addParams(Object.assign({}, e3, { model: "trending-items" }));
    }, addTrendingFacets: function(e3) {
      return this.addParams(Object.assign({}, e3, { model: "trending-facets" }));
    }, addLookingSimilar: function(e3) {
      return this.addParams(Object.assign({}, e3, { model: "looking-similar" }));
    }, _buildQueries: function(t3) {
      return this.params.map(function(e3) {
        e3 = Object.assign({}, e3, { indexName: t3 });
        return delete e3.$$id, e3;
      });
    } };
    var hr = dr;
    function fr(n3) {
      return Object.keys(n3).sort().reduce(function(e3, t3) {
        return e3[t3] = n3[t3], e3;
      }, {});
    }
    function mr() {
      return Array.prototype.slice.call(arguments).reduceRight(function(t3, n3) {
        return Object.keys(Object(n3)).forEach(function(e3) {
          void 0 !== n3[e3] && (void 0 !== t3[e3] && delete t3[e3], t3[e3] = n3[e3]);
        }), t3;
      }, {});
    }
    var d = { _getQueries: function(o3, c2) {
      var u2 = [];
      return u2.push({ indexName: o3, params: d._getHitsSearchParams(c2) }), c2.getRefinedDisjunctiveFacets().forEach(function(e3) {
        u2.push({ indexName: o3, params: d._getDisjunctiveFacetSearchParams(c2, e3) });
      }), c2.getRefinedHierarchicalFacets().forEach(function(e3) {
        var a3, s3 = c2.getHierarchicalFacetByName(e3), e3 = c2.getHierarchicalRefinement(e3), r3 = c2._getHierarchicalFacetSeparator(s3);
        0 < e3.length && 1 < e3[0].split(r3).length && (a3 = e3[0].split(r3).slice(0, -1).reduce(function(e4, t3, n3) {
          return e4.concat({ attribute: s3.attributes[n3], value: 0 === n3 ? t3 : [e4[e4.length - 1].value, t3].join(r3) });
        }, [])).forEach(function(e4, t3) {
          e4 = d._getDisjunctiveFacetSearchParams(c2, e4.attribute, 0 === t3);
          function r4(t4) {
            return s3.attributes.some(function(e5) {
              return e5 === t4.split(":")[0];
            });
          }
          var n3 = (e4.facetFilters || []).reduce(function(e5, t4) {
            var n4;
            return Array.isArray(t4) && 0 < (n4 = t4.filter(function(e6) {
              return !r4(e6);
            })).length && e5.push(n4), "string" != typeof t4 || r4(t4) || e5.push(t4), e5;
          }, []), i3 = a3[t3 - 1];
          e4.facetFilters = 0 < t3 ? n3.concat(i3.attribute + ":" + i3.value) : 0 < n3.length ? n3 : void 0, u2.push({ indexName: o3, params: e4 });
        });
      }), u2;
    }, _getHitsSearchParams: function(e3) {
      var t3 = e3.facets.concat(e3.disjunctiveFacets).concat(d._getHitsHierarchicalFacetsAttributes(e3)).sort(), n3 = d._getFacetFilters(e3), r3 = d._getNumericFilters(e3), i3 = d._getTagFilters(e3), t3 = { facets: -1 < t3.indexOf("*") ? ["*"] : t3, tagFilters: i3 };
      return 0 < n3.length && (t3.facetFilters = n3), 0 < r3.length && (t3.numericFilters = r3), fr(cr({}, e3.getQueryParams(), t3));
    }, _getDisjunctiveFacetSearchParams: function(e3, t3, n3) {
      var r3 = d._getFacetFilters(e3, t3, n3), i3 = d._getNumericFilters(e3, t3), a3 = d._getTagFilters(e3), s3 = { hitsPerPage: 0, page: 0, analytics: false, clickAnalytics: false }, a3 = (0 < a3.length && (s3.tagFilters = a3), e3.getHierarchicalFacetByName(t3));
      return s3.facets = a3 ? d._getDisjunctiveHierarchicalFacetAttribute(e3, a3, n3) : t3, 0 < i3.length && (s3.numericFilters = i3), 0 < r3.length && (s3.facetFilters = r3), fr(cr({}, e3.getQueryParams(), s3));
    }, _getNumericFilters: function(e3, i3) {
      var a3;
      return e3.numericFilters || (a3 = [], Object.keys(e3.numericRefinements).forEach(function(r3) {
        var t3 = e3.numericRefinements[r3] || {};
        Object.keys(t3).forEach(function(n3) {
          var e4 = t3[n3] || [];
          i3 !== r3 && e4.forEach(function(e5) {
            var t4;
            Array.isArray(e5) ? (t4 = e5.map(function(e6) {
              return r3 + n3 + e6;
            }), a3.push(t4)) : a3.push(r3 + n3 + e5);
          });
        });
      }), a3);
    }, _getTagFilters: function(e3) {
      return e3.tagFilters || e3.tagRefinements.join(",");
    }, _getFacetFilters: function(s3, o3, c2) {
      var u2 = [], e3 = s3.facetsRefinements || {}, n3 = (Object.keys(e3).sort().forEach(function(t3) {
        (e3[t3] || []).slice().sort().forEach(function(e4) {
          u2.push(t3 + ":" + e4);
        });
      }), s3.facetsExcludes || {}), r3 = (Object.keys(n3).sort().forEach(function(t3) {
        (n3[t3] || []).sort().forEach(function(e4) {
          u2.push(t3 + ":-" + e4);
        });
      }), s3.disjunctiveFacetsRefinements || {}), l3 = (Object.keys(r3).sort().forEach(function(t3) {
        var n4, e4 = r3[t3] || [];
        t3 !== o3 && e4 && 0 !== e4.length && (n4 = [], e4.slice().sort().forEach(function(e5) {
          n4.push(t3 + ":" + e5);
        }), u2.push(n4));
      }), s3.hierarchicalFacetsRefinements || {});
      return Object.keys(l3).sort().forEach(function(e4) {
        var t3 = (l3[e4] || [])[0];
        if (void 0 !== t3) {
          var n4, r4 = s3.getHierarchicalFacetByName(e4), i3 = s3._getHierarchicalFacetSeparator(r4), a3 = s3._getHierarchicalRootPath(r4);
          if (o3 === e4) {
            if (-1 === t3.indexOf(i3) || !a3 && true === c2 || a3 && a3.split(i3).length === t3.split(i3).length)
              return;
            t3 = a3 ? (n4 = a3.split(i3).length - 1, a3) : (n4 = t3.split(i3).length - 2, t3.slice(0, t3.lastIndexOf(i3)));
          } else
            n4 = t3.split(i3).length - 1;
          (e4 = r4.attributes[n4]) && u2.push([e4 + ":" + t3]);
        }
      }), u2;
    }, _getHitsHierarchicalFacetsAttributes: function(i3) {
      return i3.hierarchicalFacets.reduce(function(e3, t3) {
        var n3, r3 = i3.getHierarchicalRefinement(t3.name)[0];
        return r3 ? (n3 = i3._getHierarchicalFacetSeparator(t3), r3 = r3.split(n3).length, n3 = t3.attributes.slice(0, r3 + 1), e3.concat(n3)) : (e3.push(t3.attributes[0]), e3);
      }, []);
    }, _getDisjunctiveHierarchicalFacetAttribute: function(e3, t3, n3) {
      var r3, i3 = e3._getHierarchicalFacetSeparator(t3);
      return true === n3 ? (n3 = 0, (r3 = e3._getHierarchicalRootPath(t3)) && (n3 = r3.split(i3).length), [t3.attributes[n3]]) : (r3 = (e3.getHierarchicalRefinement(t3.name)[0] || "").split(i3).length - 1, t3.attributes.slice(0, 1 + r3));
    }, getSearchForFacetQuery: function(e3, t3, n3, r3) {
      r3 = r3.isDisjunctiveFacet(e3) ? r3.clearRefinements(e3) : r3, t3 = { facetQuery: t3, facetName: e3 };
      return "number" == typeof n3 && (t3.maxFacetHits = n3), fr(cr({}, d._getHitsSearchParams(r3), t3));
    } }, pr = d, p = function(e3, t3) {
      if (Array.isArray(e3)) {
        for (var n3 = 0; n3 < e3.length; n3++)
          if (t3(e3[n3]))
            return e3[n3];
      }
    };
    var gr = function(n3, r3) {
      return n3.filter(function(e3, t3) {
        return -1 < r3.indexOf(e3) && n3.indexOf(e3) === t3;
      });
    };
    var vr = function e3(t3) {
      if ("number" == typeof t3)
        return t3;
      if ("string" == typeof t3)
        return parseFloat(t3);
      if (Array.isArray(t3))
        return t3.map(e3);
      throw new Error("The value should be a number, a parsable string or an array of those.");
    }, yr = { addRefinement: function(e3, t3, n3) {
      var r3;
      return yr.isRefined(e3, t3, n3) ? e3 : (n3 = "" + n3, n3 = e3[t3] ? e3[t3].concat(n3) : [n3], (r3 = {})[t3] = n3, mr({}, r3, e3));
    }, removeRefinement: function(e3, n3, t3) {
      var r3;
      return void 0 === t3 ? yr.clearRefinement(e3, function(e4, t4) {
        return n3 === t4;
      }) : (r3 = "" + t3, yr.clearRefinement(e3, function(e4, t4) {
        return n3 === t4 && r3 === e4;
      }));
    }, toggleRefinement: function(e3, t3, n3) {
      if (void 0 === n3)
        throw new Error("toggleRefinement should be used with a value");
      return yr.isRefined(e3, t3, n3) ? yr.removeRefinement(e3, t3, n3) : yr.addRefinement(e3, t3, n3);
    }, clearRefinement: function(i3, a3, s3) {
      var o3, e3;
      return void 0 === a3 ? ur(i3) ? {} : i3 : "string" == typeof a3 ? lr(i3, [a3]) : "function" == typeof a3 ? (o3 = false, e3 = Object.keys(i3).reduce(function(e4, t3) {
        var n3 = i3[t3] || [], r3 = n3.filter(function(e5) {
          return !a3(e5, t3, s3);
        });
        return r3.length !== n3.length && (o3 = true), e4[t3] = r3, e4;
      }, {}), o3 ? e3 : i3) : void 0;
    }, isRefined: function(e3, t3, n3) {
      var r3 = Boolean(e3[t3]) && 0 < e3[t3].length;
      return void 0 !== n3 && r3 ? -1 !== e3[t3].indexOf("" + n3) : r3;
    } }, r2 = yr;
    function br(e3, n3) {
      return Array.isArray(e3) && Array.isArray(n3) ? e3.length === n3.length && e3.every(function(e4, t3) {
        return br(n3[t3], e4);
      }) : e3 === n3;
    }
    function s2(e3) {
      var r3 = e3 ? s2._parseNumbers(e3) : {}, i3 = (void 0 === r3.userToken || null !== (e3 = r3.userToken) && /^[a-zA-Z0-9_-]{1,64}$/.test(e3) || console.warn("[algoliasearch-helper] The `userToken` parameter is invalid. This can lead to wrong analytics.\n  - Format: [a-zA-Z0-9_-]{1,64}"), this.facets = r3.facets || [], this.disjunctiveFacets = r3.disjunctiveFacets || [], this.hierarchicalFacets = r3.hierarchicalFacets || [], this.facetsRefinements = r3.facetsRefinements || {}, this.facetsExcludes = r3.facetsExcludes || {}, this.disjunctiveFacetsRefinements = r3.disjunctiveFacetsRefinements || {}, this.numericRefinements = r3.numericRefinements || {}, this.tagRefinements = r3.tagRefinements || [], this.hierarchicalFacetsRefinements = r3.hierarchicalFacetsRefinements || {}, this);
      Object.keys(r3).forEach(function(e4) {
        var t3 = -1 !== s2.PARAMETERS.indexOf(e4), n3 = void 0 !== r3[e4];
        !t3 && n3 && (i3[e4] = r3[e4]);
      });
    }
    s2.PARAMETERS = Object.keys(new s2()), s2._parseNumbers = function(i3) {
      var r3, a3;
      return i3 instanceof s2 ? i3 : (r3 = {}, ["aroundPrecision", "aroundRadius", "getRankingInfo", "minWordSizefor2Typos", "minWordSizefor1Typo", "page", "maxValuesPerFacet", "distinct", "minimumAroundRadius", "hitsPerPage", "minProximity"].forEach(function(e3) {
        var t3, n3 = i3[e3];
        "string" == typeof n3 && (t3 = parseFloat(n3), r3[e3] = isNaN(t3) ? n3 : t3);
      }), Array.isArray(i3.insideBoundingBox) && (r3.insideBoundingBox = i3.insideBoundingBox.map(function(e3) {
        return Array.isArray(e3) ? e3.map(function(e4) {
          return parseFloat(e4);
        }) : e3;
      })), i3.numericRefinements && (a3 = {}, Object.keys(i3.numericRefinements).forEach(function(n3) {
        var r4 = i3.numericRefinements[n3] || {};
        a3[n3] = {}, Object.keys(r4).forEach(function(e3) {
          var t3 = r4[e3].map(function(e4) {
            return Array.isArray(e4) ? e4.map(function(e5) {
              return "string" == typeof e5 ? parseFloat(e5) : e5;
            }) : "string" == typeof e4 ? parseFloat(e4) : e4;
          });
          a3[n3][e3] = t3;
        });
      }), r3.numericRefinements = a3), cr(i3, r3));
    }, s2.make = function(e3) {
      var n3 = new s2(e3);
      return (e3.hierarchicalFacets || []).forEach(function(e4) {
        var t3;
        e4.rootPath && 0 === (t3 = (n3 = 0 < (t3 = n3.getHierarchicalRefinement(e4.name)).length && 0 !== t3[0].indexOf(e4.rootPath) ? n3.clearRefinements(e4.name) : n3).getHierarchicalRefinement(e4.name)).length && (n3 = n3.toggleHierarchicalFacetRefinement(e4.name, e4.rootPath));
      }), n3;
    }, s2.validate = function(e3, t3) {
      t3 = t3 || {};
      return e3.tagFilters && t3.tagRefinements && 0 < t3.tagRefinements.length ? new Error("[Tags] Cannot switch from the managed tag API to the advanced API. It is probably an error, if it is really what you want, you should first clear the tags with clearTags method.") : 0 < e3.tagRefinements.length && t3.tagFilters ? new Error("[Tags] Cannot switch from the advanced tag API to the managed API. It is probably an error, if it is not, you should first clear the tags with clearTags method.") : e3.numericFilters && t3.numericRefinements && ur(t3.numericRefinements) ? new Error("[Numeric filters] Can't switch from the advanced to the managed API. It is probably an error, if this is really what you want, you have to first clear the numeric filters.") : ur(e3.numericRefinements) && t3.numericFilters ? new Error("[Numeric filters] Can't switch from the managed API to the advanced. It is probably an error, if this is really what you want, you have to first clear the numeric filters.") : null;
    }, s2.prototype = { constructor: s2, clearRefinements: function(e3) {
      e3 = { numericRefinements: this._clearNumericRefinements(e3), facetsRefinements: r2.clearRefinement(this.facetsRefinements, e3, "conjunctiveFacet"), facetsExcludes: r2.clearRefinement(this.facetsExcludes, e3, "exclude"), disjunctiveFacetsRefinements: r2.clearRefinement(this.disjunctiveFacetsRefinements, e3, "disjunctiveFacet"), hierarchicalFacetsRefinements: r2.clearRefinement(this.hierarchicalFacetsRefinements, e3, "hierarchicalFacet") };
      return e3.numericRefinements === this.numericRefinements && e3.facetsRefinements === this.facetsRefinements && e3.facetsExcludes === this.facetsExcludes && e3.disjunctiveFacetsRefinements === this.disjunctiveFacetsRefinements && e3.hierarchicalFacetsRefinements === this.hierarchicalFacetsRefinements ? this : this.setQueryParameters(e3);
    }, clearTags: function() {
      return void 0 === this.tagFilters && 0 === this.tagRefinements.length ? this : this.setQueryParameters({ tagFilters: void 0, tagRefinements: [] });
    }, setIndex: function(e3) {
      return e3 === this.index ? this : this.setQueryParameters({ index: e3 });
    }, setQuery: function(e3) {
      return e3 === this.query ? this : this.setQueryParameters({ query: e3 });
    }, setPage: function(e3) {
      return e3 === this.page ? this : this.setQueryParameters({ page: e3 });
    }, setFacets: function(e3) {
      return this.setQueryParameters({ facets: e3 });
    }, setDisjunctiveFacets: function(e3) {
      return this.setQueryParameters({ disjunctiveFacets: e3 });
    }, setHitsPerPage: function(e3) {
      return this.hitsPerPage === e3 ? this : this.setQueryParameters({ hitsPerPage: e3 });
    }, setTypoTolerance: function(e3) {
      return this.typoTolerance === e3 ? this : this.setQueryParameters({ typoTolerance: e3 });
    }, addNumericRefinement: function(e3, t3, n3) {
      var r3, n3 = vr(n3);
      return this.isNumericRefined(e3, t3, n3) ? this : ((r3 = cr({}, this.numericRefinements))[e3] = cr({}, r3[e3]), r3[e3][t3] ? (r3[e3][t3] = r3[e3][t3].slice(), r3[e3][t3].push(n3)) : r3[e3][t3] = [n3], this.setQueryParameters({ numericRefinements: r3 }));
    }, getConjunctiveRefinements: function(e3) {
      return this.isConjunctiveFacet(e3) && this.facetsRefinements[e3] || [];
    }, getDisjunctiveRefinements: function(e3) {
      return this.isDisjunctiveFacet(e3) && this.disjunctiveFacetsRefinements[e3] || [];
    }, getHierarchicalRefinement: function(e3) {
      return this.hierarchicalFacetsRefinements[e3] || [];
    }, getExcludeRefinements: function(e3) {
      return this.isConjunctiveFacet(e3) && this.facetsExcludes[e3] || [];
    }, removeNumericRefinement: function(n3, r3, e3) {
      var i3 = e3;
      return void 0 !== i3 ? this.isNumericRefined(n3, r3, i3) ? this.setQueryParameters({ numericRefinements: this._clearNumericRefinements(function(e4, t3) {
        return t3 === n3 && e4.op === r3 && br(e4.val, vr(i3));
      }) }) : this : void 0 !== r3 ? this.isNumericRefined(n3, r3) ? this.setQueryParameters({ numericRefinements: this._clearNumericRefinements(function(e4, t3) {
        return t3 === n3 && e4.op === r3;
      }) }) : this : this.isNumericRefined(n3) ? this.setQueryParameters({ numericRefinements: this._clearNumericRefinements(function(e4, t3) {
        return t3 === n3;
      }) }) : this;
    }, getNumericRefinements: function(e3) {
      return this.numericRefinements[e3] || {};
    }, getNumericRefinement: function(e3, t3) {
      return this.numericRefinements[e3] && this.numericRefinements[e3][t3];
    }, _clearNumericRefinements: function(s3) {
      var o3, t3, e3;
      return void 0 === s3 ? ur(this.numericRefinements) ? {} : this.numericRefinements : "string" == typeof s3 ? lr(this.numericRefinements, [s3]) : "function" == typeof s3 ? (o3 = false, t3 = this.numericRefinements, e3 = Object.keys(t3).reduce(function(e4, r3) {
        var i3 = t3[r3], a3 = {}, i3 = i3 || {};
        return Object.keys(i3).forEach(function(t4) {
          var e5 = i3[t4] || [], n3 = [];
          e5.forEach(function(e6) {
            s3({ val: e6, op: t4 }, r3, "numeric") || n3.push(e6);
          }), n3.length !== e5.length && (o3 = true), a3[t4] = n3;
        }), e4[r3] = a3, e4;
      }, {}), o3 ? e3 : this.numericRefinements) : void 0;
    }, addFacet: function(e3) {
      return this.isConjunctiveFacet(e3) ? this : this.setQueryParameters({ facets: this.facets.concat([e3]) });
    }, addDisjunctiveFacet: function(e3) {
      return this.isDisjunctiveFacet(e3) ? this : this.setQueryParameters({ disjunctiveFacets: this.disjunctiveFacets.concat([e3]) });
    }, addHierarchicalFacet: function(e3) {
      if (this.isHierarchicalFacet(e3.name))
        throw new Error("Cannot declare two hierarchical facets with the same name: `" + e3.name + "`");
      return this.setQueryParameters({ hierarchicalFacets: this.hierarchicalFacets.concat([e3]) });
    }, addFacetRefinement: function(e3, t3) {
      if (this.isConjunctiveFacet(e3))
        return r2.isRefined(this.facetsRefinements, e3, t3) ? this : this.setQueryParameters({ facetsRefinements: r2.addRefinement(this.facetsRefinements, e3, t3) });
      throw new Error(e3 + " is not defined in the facets attribute of the helper configuration");
    }, addExcludeRefinement: function(e3, t3) {
      if (this.isConjunctiveFacet(e3))
        return r2.isRefined(this.facetsExcludes, e3, t3) ? this : this.setQueryParameters({ facetsExcludes: r2.addRefinement(this.facetsExcludes, e3, t3) });
      throw new Error(e3 + " is not defined in the facets attribute of the helper configuration");
    }, addDisjunctiveFacetRefinement: function(e3, t3) {
      if (this.isDisjunctiveFacet(e3))
        return r2.isRefined(this.disjunctiveFacetsRefinements, e3, t3) ? this : this.setQueryParameters({ disjunctiveFacetsRefinements: r2.addRefinement(this.disjunctiveFacetsRefinements, e3, t3) });
      throw new Error(e3 + " is not defined in the disjunctiveFacets attribute of the helper configuration");
    }, addTagRefinement: function(e3) {
      return this.isTagRefined(e3) ? this : (e3 = { tagRefinements: this.tagRefinements.concat(e3) }, this.setQueryParameters(e3));
    }, removeFacet: function(t3) {
      return this.isConjunctiveFacet(t3) ? this.clearRefinements(t3).setQueryParameters({ facets: this.facets.filter(function(e3) {
        return e3 !== t3;
      }) }) : this;
    }, removeDisjunctiveFacet: function(t3) {
      return this.isDisjunctiveFacet(t3) ? this.clearRefinements(t3).setQueryParameters({ disjunctiveFacets: this.disjunctiveFacets.filter(function(e3) {
        return e3 !== t3;
      }) }) : this;
    }, removeHierarchicalFacet: function(t3) {
      return this.isHierarchicalFacet(t3) ? this.clearRefinements(t3).setQueryParameters({ hierarchicalFacets: this.hierarchicalFacets.filter(function(e3) {
        return e3.name !== t3;
      }) }) : this;
    }, removeFacetRefinement: function(e3, t3) {
      if (this.isConjunctiveFacet(e3))
        return r2.isRefined(this.facetsRefinements, e3, t3) ? this.setQueryParameters({ facetsRefinements: r2.removeRefinement(this.facetsRefinements, e3, t3) }) : this;
      throw new Error(e3 + " is not defined in the facets attribute of the helper configuration");
    }, removeExcludeRefinement: function(e3, t3) {
      if (this.isConjunctiveFacet(e3))
        return r2.isRefined(this.facetsExcludes, e3, t3) ? this.setQueryParameters({ facetsExcludes: r2.removeRefinement(this.facetsExcludes, e3, t3) }) : this;
      throw new Error(e3 + " is not defined in the facets attribute of the helper configuration");
    }, removeDisjunctiveFacetRefinement: function(e3, t3) {
      if (this.isDisjunctiveFacet(e3))
        return r2.isRefined(this.disjunctiveFacetsRefinements, e3, t3) ? this.setQueryParameters({ disjunctiveFacetsRefinements: r2.removeRefinement(this.disjunctiveFacetsRefinements, e3, t3) }) : this;
      throw new Error(e3 + " is not defined in the disjunctiveFacets attribute of the helper configuration");
    }, removeTagRefinement: function(t3) {
      var e3;
      return this.isTagRefined(t3) ? (e3 = { tagRefinements: this.tagRefinements.filter(function(e4) {
        return e4 !== t3;
      }) }, this.setQueryParameters(e3)) : this;
    }, toggleRefinement: function(e3, t3) {
      return this.toggleFacetRefinement(e3, t3);
    }, toggleFacetRefinement: function(e3, t3) {
      if (this.isHierarchicalFacet(e3))
        return this.toggleHierarchicalFacetRefinement(e3, t3);
      if (this.isConjunctiveFacet(e3))
        return this.toggleConjunctiveFacetRefinement(e3, t3);
      if (this.isDisjunctiveFacet(e3))
        return this.toggleDisjunctiveFacetRefinement(e3, t3);
      throw new Error("Cannot refine the undeclared facet " + e3 + "; it should be added to the helper options facets, disjunctiveFacets or hierarchicalFacets");
    }, toggleConjunctiveFacetRefinement: function(e3, t3) {
      if (this.isConjunctiveFacet(e3))
        return this.setQueryParameters({ facetsRefinements: r2.toggleRefinement(this.facetsRefinements, e3, t3) });
      throw new Error(e3 + " is not defined in the facets attribute of the helper configuration");
    }, toggleExcludeFacetRefinement: function(e3, t3) {
      if (this.isConjunctiveFacet(e3))
        return this.setQueryParameters({ facetsExcludes: r2.toggleRefinement(this.facetsExcludes, e3, t3) });
      throw new Error(e3 + " is not defined in the facets attribute of the helper configuration");
    }, toggleDisjunctiveFacetRefinement: function(e3, t3) {
      if (this.isDisjunctiveFacet(e3))
        return this.setQueryParameters({ disjunctiveFacetsRefinements: r2.toggleRefinement(this.disjunctiveFacetsRefinements, e3, t3) });
      throw new Error(e3 + " is not defined in the disjunctiveFacets attribute of the helper configuration");
    }, toggleHierarchicalFacetRefinement: function(e3, t3) {
      var n3, r3;
      if (this.isHierarchicalFacet(e3))
        return n3 = this._getHierarchicalFacetSeparator(this.getHierarchicalFacetByName(e3)), r3 = {}, void 0 !== this.hierarchicalFacetsRefinements[e3] && 0 < this.hierarchicalFacetsRefinements[e3].length && (this.hierarchicalFacetsRefinements[e3][0] === t3 || 0 === this.hierarchicalFacetsRefinements[e3][0].indexOf(t3 + n3)) ? -1 === t3.indexOf(n3) ? r3[e3] = [] : r3[e3] = [t3.slice(0, t3.lastIndexOf(n3))] : r3[e3] = [t3], this.setQueryParameters({ hierarchicalFacetsRefinements: mr({}, r3, this.hierarchicalFacetsRefinements) });
      throw new Error(e3 + " is not defined in the hierarchicalFacets attribute of the helper configuration");
    }, addHierarchicalFacetRefinement: function(e3, t3) {
      if (this.isHierarchicalFacetRefined(e3))
        throw new Error(e3 + " is already refined.");
      var n3;
      if (this.isHierarchicalFacet(e3))
        return (n3 = {})[e3] = [t3], this.setQueryParameters({ hierarchicalFacetsRefinements: mr({}, n3, this.hierarchicalFacetsRefinements) });
      throw new Error(e3 + " is not defined in the hierarchicalFacets attribute of the helper configuration.");
    }, removeHierarchicalFacetRefinement: function(e3) {
      var t3;
      return this.isHierarchicalFacetRefined(e3) ? ((t3 = {})[e3] = [], this.setQueryParameters({ hierarchicalFacetsRefinements: mr({}, t3, this.hierarchicalFacetsRefinements) })) : this;
    }, toggleTagRefinement: function(e3) {
      return this.isTagRefined(e3) ? this.removeTagRefinement(e3) : this.addTagRefinement(e3);
    }, isDisjunctiveFacet: function(e3) {
      return -1 < this.disjunctiveFacets.indexOf(e3);
    }, isHierarchicalFacet: function(e3) {
      return void 0 !== this.getHierarchicalFacetByName(e3);
    }, isConjunctiveFacet: function(e3) {
      return -1 < this.facets.indexOf(e3);
    }, isFacetRefined: function(e3, t3) {
      return !!this.isConjunctiveFacet(e3) && r2.isRefined(this.facetsRefinements, e3, t3);
    }, isExcludeRefined: function(e3, t3) {
      return !!this.isConjunctiveFacet(e3) && r2.isRefined(this.facetsExcludes, e3, t3);
    }, isDisjunctiveFacetRefined: function(e3, t3) {
      return !!this.isDisjunctiveFacet(e3) && r2.isRefined(this.disjunctiveFacetsRefinements, e3, t3);
    }, isHierarchicalFacetRefined: function(e3, t3) {
      return !!this.isHierarchicalFacet(e3) && (e3 = this.getHierarchicalRefinement(e3), t3 ? -1 !== e3.indexOf(t3) : 0 < e3.length);
    }, isNumericRefined: function(e3, t3, n3) {
      var r3, i3;
      return void 0 === n3 && void 0 === t3 ? Boolean(this.numericRefinements[e3]) : (r3 = this.numericRefinements[e3] && void 0 !== this.numericRefinements[e3][t3], void 0 !== n3 && r3 ? (n3 = vr(n3), t3 = void 0 !== (e3 = this.numericRefinements[e3][t3], i3 = n3, p(e3, function(e4) {
        return br(e4, i3);
      })), r3 && t3) : r3);
    }, isTagRefined: function(e3) {
      return -1 !== this.tagRefinements.indexOf(e3);
    }, getRefinedDisjunctiveFacets: function() {
      var t3 = this, e3 = gr(Object.keys(this.numericRefinements).filter(function(e4) {
        return 0 < Object.keys(t3.numericRefinements[e4]).length;
      }), this.disjunctiveFacets);
      return Object.keys(this.disjunctiveFacetsRefinements).filter(function(e4) {
        return 0 < t3.disjunctiveFacetsRefinements[e4].length;
      }).concat(e3).concat(this.getRefinedHierarchicalFacets()).sort();
    }, getRefinedHierarchicalFacets: function() {
      var t3 = this;
      return gr(this.hierarchicalFacets.map(function(e3) {
        return e3.name;
      }), Object.keys(this.hierarchicalFacetsRefinements).filter(function(e3) {
        return 0 < t3.hierarchicalFacetsRefinements[e3].length;
      })).sort();
    }, getUnrefinedDisjunctiveFacets: function() {
      var t3 = this.getRefinedDisjunctiveFacets();
      return this.disjunctiveFacets.filter(function(e3) {
        return -1 === t3.indexOf(e3);
      });
    }, managedParameters: ["index", "facets", "disjunctiveFacets", "facetsRefinements", "hierarchicalFacets", "facetsExcludes", "disjunctiveFacetsRefinements", "numericRefinements", "tagRefinements", "hierarchicalFacetsRefinements"], getQueryParams: function() {
      var n3 = this.managedParameters, r3 = {}, i3 = this;
      return Object.keys(this).forEach(function(e3) {
        var t3 = i3[e3];
        -1 === n3.indexOf(e3) && void 0 !== t3 && (r3[e3] = t3);
      }), r3;
    }, setQueryParameter: function(e3, t3) {
      var n3;
      return this[e3] === t3 ? this : ((n3 = {})[e3] = t3, this.setQueryParameters(n3));
    }, setQueryParameters: function(e3) {
      if (!e3)
        return this;
      var t3 = s2.validate(this, e3);
      if (t3)
        throw t3;
      var n3 = this, i3 = s2._parseNumbers(e3), t3 = Object.keys(this).reduce(function(e4, t4) {
        return e4[t4] = n3[t4], e4;
      }, {}), e3 = Object.keys(i3).reduce(function(e4, t4) {
        var n4 = void 0 !== e4[t4], r3 = void 0 !== i3[t4];
        return n4 && !r3 ? lr(e4, [t4]) : (r3 && (e4[t4] = i3[t4]), e4);
      }, t3);
      return new this.constructor(e3);
    }, resetPage: function() {
      return void 0 === this.page ? this : this.setPage(0);
    }, _getHierarchicalFacetSortBy: function(e3) {
      return e3.sortBy || ["isRefined:desc", "name:asc"];
    }, _getHierarchicalFacetSeparator: function(e3) {
      return e3.separator || " > ";
    }, _getHierarchicalRootPath: function(e3) {
      return e3.rootPath || null;
    }, _getHierarchicalShowParentLevel: function(e3) {
      return "boolean" != typeof e3.showParentLevel || e3.showParentLevel;
    }, getHierarchicalFacetByName: function(t3) {
      return p(this.hierarchicalFacets, function(e3) {
        return e3.name === t3;
      });
    }, getHierarchicalFacetBreadcrumb: function(e3) {
      var t3;
      return this.isHierarchicalFacet(e3) && (t3 = this.getHierarchicalRefinement(e3)[0]) ? (e3 = this._getHierarchicalFacetSeparator(this.getHierarchicalFacetByName(e3)), t3.split(e3).map(function(e4) {
        return e4.trim();
      })) : [];
    }, toString: function() {
      return JSON.stringify(this, null, 2);
    } };
    function Rr(e3) {
      return Array.isArray(e3) ? e3.filter(Boolean) : [];
    }
    function Sr(e3, t3) {
      if (Array.isArray(e3)) {
        for (var n3 = 0; n3 < e3.length; n3++)
          if (t3(e3[n3]))
            return n3;
      }
      return -1;
    }
    function _r(e3, t3) {
      var r3 = (t3 || []).map(function(e4) {
        return e4.split(":");
      });
      return e3.reduce(function(e4, t4) {
        var n3 = t4.split(":"), t4 = p(r3, function(e5) {
          return e5[0] === n3[0];
        });
        return 1 < n3.length || !t4 ? (e4[0].push(n3[0]), e4[1].push(n3[1])) : (e4[0].push(t4[0]), e4[1].push(t4[1])), e4;
      }, [[], []]);
    }
    var wr = s2;
    var Pr = function(e3, n3, i3) {
      return Array.isArray(e3) ? (Array.isArray(i3) || (i3 = []), (e3 = e3.map(function(t3, e4) {
        return { criteria: n3.map(function(e5) {
          return t3[e5];
        }), index: e4, value: t3 };
      })).sort(function(e4, t3) {
        for (var n4 = -1; ++n4 < e4.criteria.length; ) {
          var r3 = function(e5, t4) {
            if (e5 !== t4) {
              var n5 = void 0 !== e5, r4 = null === e5, i4 = void 0 !== t4, a3 = null === t4;
              if (!a3 && t4 < e5 || r4 && i4 || !n5)
                return 1;
              if (!r4 && e5 < t4 || a3 && n5 || !i4)
                return -1;
            }
            return 0;
          }(e4.criteria[n4], t3.criteria[n4]);
          if (r3)
            return !(n4 >= i3.length) && "desc" === i3[n4] ? -r3 : r3;
        }
        return e4.index - t3.index;
      }), e3.map(function(e4) {
        return e4.value;
      })) : [];
    }, Nr = function(m2) {
      return function(e3, t3) {
        function n3(e4, s4, t4) {
          var n4, o4 = e4;
          if (0 < t4) {
            var r4 = 0;
            for (o4 = e4; r4 < t4; ) {
              var i4 = o4 && Array.isArray(o4.data) ? o4.data : [], o4 = p(i4, function(e5) {
                return e5.isRefined;
              });
              r4++;
            }
          }
          return o4 && (n4 = Object.keys(s4.data).map(function(e5) {
            return [e5, s4.data[e5]];
          }).filter(function(e5) {
            var t5, n5, r5, i5, a4, e5 = e5[0];
            return e5 = e5, t5 = o4.path || u2, n5 = d2, r5 = c2, a4 = l3, (!(i5 = u2) || 0 === e5.indexOf(i5) && i5 !== e5) && (!i5 && -1 === e5.indexOf(r5) || i5 && e5.split(r5).length - i5.split(r5).length == 1 || -1 === e5.indexOf(r5) && -1 === n5.indexOf(r5) || 0 === n5.indexOf(e5) || 0 === e5.indexOf(t5 + r5) && (a4 || 0 === e5.indexOf(n5)));
          }), o4.data = Pr(n4.map(function(e5) {
            var t5, n5, r5, i5, a4 = e5[0], e5 = e5[1];
            return e5 = e5, a4 = a4, t5 = c2, n5 = Ir(d2), r5 = s4.exhaustive, { name: (i5 = a4.split(t5))[i5.length - 1].trim(), path: a4, escapedValue: xr(a4), count: e5, isRefined: n5 === a4 || 0 === n5.indexOf(a4 + t5), exhaustive: r5, data: null };
          }), a3[0], a3[1])), e4;
        }
        var a3, c2, u2, l3, d2, r3 = m2.hierarchicalFacets[t3], i3 = m2.hierarchicalFacetsRefinements[r3.name] && m2.hierarchicalFacetsRefinements[r3.name][0] || "", s3 = m2._getHierarchicalFacetSeparator(r3), o3 = m2._getHierarchicalRootPath(r3), h2 = m2._getHierarchicalShowParentLevel(r3), r3 = _r(m2._getHierarchicalFacetSortBy(r3)), f2 = e3.every(function(e4) {
          return e4.exhaustive;
        }), r3 = (a3 = r3, c2 = s3, l3 = h2, d2 = i3, e3);
        return (r3 = (u2 = o3) ? e3.slice(o3.split(s3).length) : r3).reduce(n3, { name: m2.hierarchicalFacets[t3].name, count: null, isRefined: true, path: null, escapedValue: null, exhaustive: f2, data: null });
      };
    }, xr = ir, Ir = ar;
    var Fr = ir, Cr = ar;
    function Tr(e3) {
      var n3 = {};
      return e3.forEach(function(e4, t3) {
        n3[e4] = t3;
      }), n3;
    }
    function Er(e3, t3, n3) {
      t3 && t3[n3] && (e3.stats = t3[n3]);
    }
    function kr(l3, t3, e3) {
      var o3 = t3[0], d2 = (this._rawResults = t3, this), n3 = (Object.keys(o3).forEach(function(e4) {
        d2[e4] = o3[e4];
      }), cr({ persistHierarchicalRootCount: false }, e3)), e3 = (Object.keys(n3).forEach(function(e4) {
        d2[e4] = n3[e4];
      }), this.processingTimeMS = t3.reduce(function(e4, t4) {
        return void 0 === t4.processingTimeMS ? e4 : e4 + t4.processingTimeMS;
      }, 0), this.disjunctiveFacets = [], this.hierarchicalFacets = l3.hierarchicalFacets.map(function() {
        return [];
      }), this.facets = [], l3.getRefinedDisjunctiveFacets()), c2 = Tr(l3.facets), u2 = Tr(l3.disjunctiveFacets), r3 = 1, h2 = o3.facets || {};
      Object.keys(h2).forEach(function(e4) {
        var t4, n4, r4, i3, a3 = h2[e4], s3 = (r4 = l3.hierarchicalFacets, t4 = e4, p(r4, function(e5) {
          return -1 < (e5.attributes || []).indexOf(t4);
        }));
        s3 ? (r4 = s3.attributes.indexOf(e4), n4 = Sr(l3.hierarchicalFacets, function(e5) {
          return e5.name === s3.name;
        }), d2.hierarchicalFacets[n4][r4] = { attribute: e4, data: a3, exhaustive: o3.exhaustiveFacetsCount }) : (n4 = -1 !== l3.disjunctiveFacets.indexOf(e4), r4 = -1 !== l3.facets.indexOf(e4), n4 && (i3 = u2[e4], d2.disjunctiveFacets[i3] = { name: e4, data: a3, exhaustive: o3.exhaustiveFacetsCount }, Er(d2.disjunctiveFacets[i3], o3.facets_stats, e4)), r4 && (i3 = c2[e4], d2.facets[i3] = { name: e4, data: a3, exhaustive: o3.exhaustiveFacetsCount }, Er(d2.facets[i3], o3.facets_stats, e4)));
      }), this.hierarchicalFacets = Rr(this.hierarchicalFacets), e3.forEach(function(e4) {
        var i3 = t3[r3], a3 = i3 && i3.facets ? i3.facets : {}, s3 = l3.getHierarchicalFacetByName(e4);
        Object.keys(a3).forEach(function(t4) {
          var n4, e5, r4 = a3[t4];
          s3 ? (n4 = Sr(l3.hierarchicalFacets, function(e6) {
            return e6.name === s3.name;
          }), -1 !== (e5 = Sr(d2.hierarchicalFacets[n4], function(e6) {
            return e6.attribute === t4;
          })) && (d2.hierarchicalFacets[n4][e5].data = cr({}, d2.hierarchicalFacets[n4][e5].data, r4))) : (n4 = u2[t4], e5 = o3.facets && o3.facets[t4] || {}, d2.disjunctiveFacets[n4] = { name: t4, data: mr({}, r4, e5), exhaustive: i3.exhaustiveFacetsCount }, Er(d2.disjunctiveFacets[n4], i3.facets_stats, t4), l3.disjunctiveFacetsRefinements[t4] && l3.disjunctiveFacetsRefinements[t4].forEach(function(e6) {
            !d2.disjunctiveFacets[n4].data[e6] && -1 < l3.disjunctiveFacetsRefinements[t4].indexOf(Cr(e6)) && (d2.disjunctiveFacets[n4].data[e6] = 0);
          }));
        }), r3++;
      }), l3.getRefinedHierarchicalFacets().forEach(function(e4) {
        var o4 = l3.getHierarchicalFacetByName(e4), c3 = l3._getHierarchicalFacetSeparator(o4), u3 = l3.getHierarchicalRefinement(e4);
        0 === u3.length || u3[0].split(c3).length < 2 || t3.slice(r3).forEach(function(e5) {
          var s3 = e5 && e5.facets ? e5.facets : {};
          Object.keys(s3).forEach(function(t4) {
            var e6, n4, r4 = s3[t4], i3 = Sr(l3.hierarchicalFacets, function(e7) {
              return e7.name === o4.name;
            }), a3 = Sr(d2.hierarchicalFacets[i3], function(e7) {
              return e7.attribute === t4;
            });
            -1 !== a3 && (e6 = {}, 0 < u3.length && !d2.persistHierarchicalRootCount && (e6[n4 = u3[0].split(c3)[0]] = d2.hierarchicalFacets[i3][a3].data[n4]), d2.hierarchicalFacets[i3][a3].data = mr(e6, r4, d2.hierarchicalFacets[i3][a3].data));
          }), r3++;
        });
      }), Object.keys(l3.facetsExcludes).forEach(function(t4) {
        var e4 = l3.facetsExcludes[t4], n4 = c2[t4];
        d2.facets[n4] = { name: t4, data: h2[t4], exhaustive: o3.exhaustiveFacetsCount }, e4.forEach(function(e5) {
          d2.facets[n4] = d2.facets[n4] || { name: t4 }, d2.facets[n4].data = d2.facets[n4].data || {}, d2.facets[n4].data[e5] = 0;
        });
      }), this.hierarchicalFacets = this.hierarchicalFacets.map(Nr(l3)), this.facets = Rr(this.facets), this.disjunctiveFacets = Rr(this.disjunctiveFacets), this._state = l3;
    }
    function jr(n3, r3) {
      function e3(e4) {
        return e4.name === r3;
      }
      var i3, a3, t3, s3, o3, c2;
      return n3._state.isConjunctiveFacet(r3) ? (i3 = p(n3.facets, e3)) ? Object.keys(i3.data).map(function(e4) {
        var t4 = Fr(e4);
        return { name: e4, escapedValue: t4, count: i3.data[e4], isRefined: n3._state.isFacetRefined(r3, t4), isExcluded: n3._state.isExcludeRefined(r3, e4) };
      }) : [] : n3._state.isDisjunctiveFacet(r3) ? (a3 = p(n3.disjunctiveFacets, e3)) ? Object.keys(a3.data).map(function(e4) {
        var t4 = Fr(e4);
        return { name: e4, escapedValue: t4, count: a3.data[e4], isRefined: n3._state.isDisjunctiveFacetRefined(r3, t4) };
      }) : [] : n3._state.isHierarchicalFacet(r3) ? ((t3 = p(n3.hierarchicalFacets, e3)) && (c2 = n3._state.getHierarchicalFacetByName(r3), s3 = n3._state._getHierarchicalFacetSeparator(c2), (c2 = (o3 = 0 === (o3 = Cr(n3._state.getHierarchicalRefinement(r3)[0] || "")).indexOf(c2.rootPath) ? o3.replace(c2.rootPath + s3, "") : o3).split(s3)).unshift(r3), function t4(e4, n4, r4) {
        e4.isRefined = e4.name === (n4[r4] && n4[r4].trim());
        e4.data && e4.data.forEach(function(e5) {
          t4(e5, n4, r4 + 1);
        });
      }(t3, c2, 0)), t3) : void 0;
    }
    function Mr(e3, t3) {
      e3 = p(e3, function(e4) {
        return e4.name === t3;
      });
      return e3 && e3.stats;
    }
    function Lr(e3, t3, n3, r3, i3) {
      var i3 = p(i3, function(e4) {
        return e4.name === n3;
      }), a3 = i3 && i3.data && i3.data[r3] ? i3.data[r3] : 0, i3 = i3 && i3.exhaustive || false;
      return { type: t3, attributeName: n3, name: r3, count: a3, exhaustive: i3 };
    }
    kr.prototype.getFacetByName = function(t3) {
      function e3(e4) {
        return e4.name === t3;
      }
      return p(this.facets, e3) || p(this.disjunctiveFacets, e3) || p(this.hierarchicalFacets, e3);
    }, kr.DEFAULT_SORT = ["isRefined:desc", "count:desc", "name:asc"], kr.prototype.getFacetValues = function(e3, t3) {
      var s3, o3, n3 = jr(this, e3);
      if (n3)
        return s3 = mr({}, t3, { sortBy: kr.DEFAULT_SORT, facetOrdering: !(t3 && t3.sortBy) }), o3 = this, function t4(n4, e4, r3, i3) {
          var a3;
          return i3 = i3 || 0, Array.isArray(e4) ? n4(e4, r3[i3]) : e4.data && 0 !== e4.data.length ? (a3 = e4.data.map(function(e5) {
            return t4(n4, e5, r3, i3 + 1);
          }), a3 = n4(a3, r3[i3]), mr({ data: a3 }, e4)) : e4;
        }(function(e4, t4) {
          if (s3.facetOrdering) {
            t4 = t4;
            a3 = (a3 = o3).renderingContent && a3.renderingContent.facetOrdering && a3.renderingContent.facetOrdering.values && a3.renderingContent.facetOrdering.values[t4];
            if (a3)
              return t4 = e4, n4 = [], r3 = [], i3 = ((a3 = a3).order || []).reduce(function(e5, t5, n5) {
                return e5[t5] = n5, e5;
              }, {}), t4.forEach(function(e5) {
                var t5 = e5.path || e5.name;
                void 0 !== i3[t5] ? n4[i3[t5]] = e5 : r3.push(e5);
              }), n4 = n4.filter(function(e5) {
                return e5;
              }), "hidden" === (t4 = a3.sortRemainingBy) ? n4 : n4.concat(Pr(r3, (a3 = "alpha" === t4 ? [["path", "name"], ["asc", "asc"]] : [["count"], ["desc"]])[0], a3[1]));
          }
          var n4, r3, i3, a3;
          if (Array.isArray(s3.sortBy))
            return t4 = _r(s3.sortBy, kr.DEFAULT_SORT), Pr(e4, t4[0], t4[1]);
          if ("function" == typeof s3.sortBy)
            return a3 = s3.sortBy, e4.sort(a3);
          throw new Error("options.sortBy is optional but if defined it must be either an array of string (predicates) or a sorting function");
        }, n3, Array.isArray(n3) ? [e3] : o3._state.getHierarchicalFacetByName(n3.name).attributes);
    }, kr.prototype.getFacetStats = function(e3) {
      return this._state.isConjunctiveFacet(e3) ? Mr(this.facets, e3) : this._state.isDisjunctiveFacet(e3) ? Mr(this.disjunctiveFacets, e3) : void 0;
    }, kr.prototype.getRefinements = function() {
      var s3 = this._state, o3 = this, c2 = [];
      return Object.keys(s3.facetsRefinements).forEach(function(t3) {
        s3.facetsRefinements[t3].forEach(function(e3) {
          c2.push(Lr(0, "facet", t3, e3, o3.facets));
        });
      }), Object.keys(s3.facetsExcludes).forEach(function(t3) {
        s3.facetsExcludes[t3].forEach(function(e3) {
          c2.push(Lr(0, "exclude", t3, e3, o3.facets));
        });
      }), Object.keys(s3.disjunctiveFacetsRefinements).forEach(function(t3) {
        s3.disjunctiveFacetsRefinements[t3].forEach(function(e3) {
          c2.push(Lr(0, "disjunctive", t3, e3, o3.disjunctiveFacets));
        });
      }), Object.keys(s3.hierarchicalFacetsRefinements).forEach(function(a3) {
        s3.hierarchicalFacetsRefinements[a3].forEach(function(e3) {
          var t3, n3, r3, i3;
          c2.push((t3 = s3, n3 = a3, e3 = e3, r3 = o3.hierarchicalFacets, i3 = t3.getHierarchicalFacetByName(n3), t3 = t3._getHierarchicalFacetSeparator(i3), i3 = e3.split(t3), e3 = p(r3, function(e4) {
            return e4.name === n3;
          }), t3 = i3.reduce(function(e4, t4) {
            var n4 = e4 && p(e4.data, function(e5) {
              return e5.name === t4;
            });
            return void 0 !== n4 ? n4 : e4;
          }, e3), r3 = t3 && t3.count || 0, i3 = t3 && t3.exhaustive || false, e3 = t3 && t3.path || "", { type: "hierarchical", attributeName: n3, name: e3, count: r3, exhaustive: i3 }));
        });
      }), Object.keys(s3.numericRefinements).forEach(function(n3) {
        var e3 = s3.numericRefinements[n3];
        Object.keys(e3).forEach(function(t3) {
          e3[t3].forEach(function(e4) {
            c2.push({ type: "numeric", attributeName: n3, name: e4, numericValue: e4, operator: t3 });
          });
        });
      }), s3.tagRefinements.forEach(function(e3) {
        c2.push({ type: "tag", attributeName: "_tags", name: e3 });
      }), c2;
    };
    var Or = kr, ar = "3.19.0", Hr = ir;
    function t2(e3, t3, n3, r3) {
      "function" == typeof e3.addAlgoliaAgent && e3.addAlgoliaAgent("JS Helper (3.19.0)"), this.setClient(e3);
      e3 = n3 || {};
      e3.index = t3, this.state = wr.make(e3), this.recommendState = new hr({ params: e3.recommendState }), this.lastResults = null, this.lastRecommendResults = null, this._queryId = 0, this._recommendQueryId = 0, this._lastQueryIdReceived = -1, this._lastRecommendQueryIdReceived = -1, this.derivedHelpers = [], this._currentNbQueries = 0, this._currentNbRecommendQueries = 0, this._searchResultsOptions = r3;
    }
    function Ar(e3) {
      if (e3 < 0)
        throw new Error("Page requested below 0.");
      return this._change({ state: this.state.setPage(e3), isPageReset: false }), this;
    }
    function Wr() {
      return this.state.page;
    }
    e2(t2, Xn), t2.prototype.search = function() {
      return this._search({ onlyWithDerivedHelpers: false }), this;
    }, t2.prototype.searchOnlyWithDerivedHelpers = function() {
      return this._search({ onlyWithDerivedHelpers: true }), this;
    }, t2.prototype.recommend = function() {
      return this._recommend(), this;
    }, t2.prototype.getQuery = function() {
      var e3 = this.state;
      return pr._getHitsSearchParams(e3);
    }, t2.prototype.searchOnce = function(e3, t3) {
      var n3 = e3 ? this.state.setQueryParameters(e3) : this.state, e3 = pr._getQueries(n3.index, n3), r3 = this;
      if (this._currentNbQueries++, this.emit("searchOnce", { state: n3 }), !t3)
        return this.client.search(e3).then(function(e4) {
          return r3._currentNbQueries--, 0 === r3._currentNbQueries && r3.emit("searchQueueEmpty"), { content: new Or(n3, e4.results), state: n3, _originalResponse: e4 };
        }, function(e4) {
          throw r3._currentNbQueries--, 0 === r3._currentNbQueries && r3.emit("searchQueueEmpty"), e4;
        });
      this.client.search(e3).then(function(e4) {
        r3._currentNbQueries--, 0 === r3._currentNbQueries && r3.emit("searchQueueEmpty"), t3(null, new Or(n3, e4.results), n3);
      }).catch(function(e4) {
        r3._currentNbQueries--, 0 === r3._currentNbQueries && r3.emit("searchQueueEmpty"), t3(e4, null, n3);
      });
    }, t2.prototype.findAnswers = function(e3) {
      console.warn("[algoliasearch-helper] answers is no longer supported");
      var t3 = this.state, n3 = this.derivedHelpers[0];
      if (!n3)
        return Promise.resolve([]);
      var n3 = n3.getModifiedState(t3), t3 = cr({ attributesForPrediction: e3.attributesForPrediction, nbHits: e3.nbHits }, { params: lr(pr._getHitsSearchParams(n3), ["attributesToSnippet", "hitsPerPage", "restrictSearchableAttributes", "snippetEllipsisText"]) }), r3 = "search for answers was called, but this client does not have a function client.initIndex(index).findAnswers";
      if ("function" != typeof this.client.initIndex)
        throw new Error(r3);
      var i3 = this.client.initIndex(n3.index);
      if ("function" != typeof i3.findAnswers)
        throw new Error(r3);
      return i3.findAnswers(n3.query, e3.queryLanguages, t3);
    }, t2.prototype.searchForFacetValues = function(t3, e3, n3, r3) {
      var i3, a3, s3, o3 = "function" == typeof this.client.searchForFacetValues, c2 = "function" == typeof this.client.initIndex;
      if (o3 || c2 || "function" == typeof this.client.search)
        return i3 = this.state.setQueryParameters(r3 || {}), a3 = i3.isDisjunctiveFacet(t3), r3 = pr.getSearchForFacetQuery(t3, e3, n3, i3), this._currentNbQueries++, s3 = this, n3 = o3 ? this.client.searchForFacetValues([{ indexName: i3.index, params: r3 }]) : c2 ? this.client.initIndex(i3.index).searchForFacetValues(r3) : (delete r3.facetName, this.client.search([{ type: "facet", facet: t3, indexName: i3.index, params: r3 }]).then(function(e4) {
          return e4.results[0];
        })), this.emit("searchForFacetValues", { state: i3, facet: t3, query: e3 }), n3.then(function(e4) {
          return s3._currentNbQueries--, 0 === s3._currentNbQueries && s3.emit("searchQueueEmpty"), (e4 = Array.isArray(e4) ? e4[0] : e4).facetHits.forEach(function(e5) {
            e5.escapedValue = Hr(e5.value), e5.isRefined = a3 ? i3.isDisjunctiveFacetRefined(t3, e5.escapedValue) : i3.isFacetRefined(t3, e5.escapedValue);
          }), e4;
        }, function(e4) {
          throw s3._currentNbQueries--, 0 === s3._currentNbQueries && s3.emit("searchQueueEmpty"), e4;
        });
      throw new Error("search for facet values (searchable) was called, but this client does not have a function client.searchForFacetValues or client.initIndex(index).searchForFacetValues");
    }, t2.prototype.setQuery = function(e3) {
      return this._change({ state: this.state.resetPage().setQuery(e3), isPageReset: true }), this;
    }, t2.prototype.clearRefinements = function(e3) {
      return this._change({ state: this.state.resetPage().clearRefinements(e3), isPageReset: true }), this;
    }, t2.prototype.clearTags = function() {
      return this._change({ state: this.state.resetPage().clearTags(), isPageReset: true }), this;
    }, t2.prototype.addDisjunctiveFacetRefinement = function(e3, t3) {
      return this._change({ state: this.state.resetPage().addDisjunctiveFacetRefinement(e3, t3), isPageReset: true }), this;
    }, t2.prototype.addDisjunctiveRefine = function() {
      return this.addDisjunctiveFacetRefinement.apply(this, arguments);
    }, t2.prototype.addHierarchicalFacetRefinement = function(e3, t3) {
      return this._change({ state: this.state.resetPage().addHierarchicalFacetRefinement(e3, t3), isPageReset: true }), this;
    }, t2.prototype.addNumericRefinement = function(e3, t3, n3) {
      return this._change({ state: this.state.resetPage().addNumericRefinement(e3, t3, n3), isPageReset: true }), this;
    }, t2.prototype.addFacetRefinement = function(e3, t3) {
      return this._change({ state: this.state.resetPage().addFacetRefinement(e3, t3), isPageReset: true }), this;
    }, t2.prototype.addRefine = function() {
      return this.addFacetRefinement.apply(this, arguments);
    }, t2.prototype.addFacetExclusion = function(e3, t3) {
      return this._change({ state: this.state.resetPage().addExcludeRefinement(e3, t3), isPageReset: true }), this;
    }, t2.prototype.addExclude = function() {
      return this.addFacetExclusion.apply(this, arguments);
    }, t2.prototype.addTag = function(e3) {
      return this._change({ state: this.state.resetPage().addTagRefinement(e3), isPageReset: true }), this;
    }, t2.prototype.addFrequentlyBoughtTogether = function(e3) {
      return this._recommendChange({ state: this.recommendState.addFrequentlyBoughtTogether(e3) }), this;
    }, t2.prototype.addRelatedProducts = function(e3) {
      return this._recommendChange({ state: this.recommendState.addRelatedProducts(e3) }), this;
    }, t2.prototype.addTrendingItems = function(e3) {
      return this._recommendChange({ state: this.recommendState.addTrendingItems(e3) }), this;
    }, t2.prototype.addTrendingFacets = function(e3) {
      return this._recommendChange({ state: this.recommendState.addTrendingFacets(e3) }), this;
    }, t2.prototype.addLookingSimilar = function(e3) {
      return this._recommendChange({ state: this.recommendState.addLookingSimilar(e3) }), this;
    }, t2.prototype.removeNumericRefinement = function(e3, t3, n3) {
      return this._change({ state: this.state.resetPage().removeNumericRefinement(e3, t3, n3), isPageReset: true }), this;
    }, t2.prototype.removeDisjunctiveFacetRefinement = function(e3, t3) {
      return this._change({ state: this.state.resetPage().removeDisjunctiveFacetRefinement(e3, t3), isPageReset: true }), this;
    }, t2.prototype.removeDisjunctiveRefine = function() {
      return this.removeDisjunctiveFacetRefinement.apply(this, arguments);
    }, t2.prototype.removeHierarchicalFacetRefinement = function(e3) {
      return this._change({ state: this.state.resetPage().removeHierarchicalFacetRefinement(e3), isPageReset: true }), this;
    }, t2.prototype.removeFacetRefinement = function(e3, t3) {
      return this._change({ state: this.state.resetPage().removeFacetRefinement(e3, t3), isPageReset: true }), this;
    }, t2.prototype.removeRefine = function() {
      return this.removeFacetRefinement.apply(this, arguments);
    }, t2.prototype.removeFacetExclusion = function(e3, t3) {
      return this._change({ state: this.state.resetPage().removeExcludeRefinement(e3, t3), isPageReset: true }), this;
    }, t2.prototype.removeExclude = function() {
      return this.removeFacetExclusion.apply(this, arguments);
    }, t2.prototype.removeTag = function(e3) {
      return this._change({ state: this.state.resetPage().removeTagRefinement(e3), isPageReset: true }), this;
    }, t2.prototype.removeFrequentlyBoughtTogether = function(e3) {
      return this._recommendChange({ state: this.recommendState.removeParams(e3) }), this;
    }, t2.prototype.removeRelatedProducts = function(e3) {
      return this._recommendChange({ state: this.recommendState.removeParams(e3) }), this;
    }, t2.prototype.removeTrendingItems = function(e3) {
      return this._recommendChange({ state: this.recommendState.removeParams(e3) }), this;
    }, t2.prototype.removeTrendingFacets = function(e3) {
      return this._recommendChange({ state: this.recommendState.removeParams(e3) }), this;
    }, t2.prototype.removeLookingSimilar = function(e3) {
      return this._recommendChange({ state: this.recommendState.removeParams(e3) }), this;
    }, t2.prototype.toggleFacetExclusion = function(e3, t3) {
      return this._change({ state: this.state.resetPage().toggleExcludeFacetRefinement(e3, t3), isPageReset: true }), this;
    }, t2.prototype.toggleExclude = function() {
      return this.toggleFacetExclusion.apply(this, arguments);
    }, t2.prototype.toggleRefinement = function(e3, t3) {
      return this.toggleFacetRefinement(e3, t3);
    }, t2.prototype.toggleFacetRefinement = function(e3, t3) {
      return this._change({ state: this.state.resetPage().toggleFacetRefinement(e3, t3), isPageReset: true }), this;
    }, t2.prototype.toggleRefine = function() {
      return this.toggleFacetRefinement.apply(this, arguments);
    }, t2.prototype.toggleTag = function(e3) {
      return this._change({ state: this.state.resetPage().toggleTagRefinement(e3), isPageReset: true }), this;
    }, t2.prototype.nextPage = function() {
      var e3 = this.state.page || 0;
      return this.setPage(e3 + 1);
    }, t2.prototype.previousPage = function() {
      var e3 = this.state.page || 0;
      return this.setPage(e3 - 1);
    }, t2.prototype.setCurrentPage = Ar, t2.prototype.setPage = Ar, t2.prototype.setIndex = function(e3) {
      return this._change({ state: this.state.resetPage().setIndex(e3), isPageReset: true }), this;
    }, t2.prototype.setQueryParameter = function(e3, t3) {
      return this._change({ state: this.state.resetPage().setQueryParameter(e3, t3), isPageReset: true }), this;
    }, t2.prototype.setState = function(e3) {
      return this._change({ state: wr.make(e3), isPageReset: false }), this;
    }, t2.prototype.overrideStateWithoutTriggeringChangeEvent = function(e3) {
      return this.state = new wr(e3), this;
    }, t2.prototype.hasRefinements = function(e3) {
      return !!ur(this.state.getNumericRefinements(e3)) || (this.state.isConjunctiveFacet(e3) ? this.state.isFacetRefined(e3) : this.state.isDisjunctiveFacet(e3) ? this.state.isDisjunctiveFacetRefined(e3) : !!this.state.isHierarchicalFacet(e3) && this.state.isHierarchicalFacetRefined(e3));
    }, t2.prototype.isExcluded = function(e3, t3) {
      return this.state.isExcludeRefined(e3, t3);
    }, t2.prototype.isDisjunctiveRefined = function(e3, t3) {
      return this.state.isDisjunctiveFacetRefined(e3, t3);
    }, t2.prototype.hasTag = function(e3) {
      return this.state.isTagRefined(e3);
    }, t2.prototype.isTagRefined = function() {
      return this.hasTagRefinements.apply(this, arguments);
    }, t2.prototype.getIndex = function() {
      return this.state.index;
    }, t2.prototype.getCurrentPage = Wr, t2.prototype.getPage = Wr, t2.prototype.getTags = function() {
      return this.state.tagRefinements;
    }, t2.prototype.getRefinements = function(e3) {
      var n3 = [], r3 = (this.state.isConjunctiveFacet(e3) ? (this.state.getConjunctiveRefinements(e3).forEach(function(e4) {
        n3.push({ value: e4, type: "conjunctive" });
      }), this.state.getExcludeRefinements(e3).forEach(function(e4) {
        n3.push({ value: e4, type: "exclude" });
      })) : this.state.isDisjunctiveFacet(e3) && this.state.getDisjunctiveRefinements(e3).forEach(function(e4) {
        n3.push({ value: e4, type: "disjunctive" });
      }), this.state.getNumericRefinements(e3));
      return Object.keys(r3).forEach(function(e4) {
        var t3 = r3[e4];
        n3.push({ value: t3, operator: e4, type: "numeric" });
      }), n3;
    }, t2.prototype.getNumericRefinement = function(e3, t3) {
      return this.state.getNumericRefinement(e3, t3);
    }, t2.prototype.getHierarchicalFacetBreadcrumb = function(e3) {
      return this.state.getHierarchicalFacetBreadcrumb(e3);
    }, t2.prototype._search = function(e3) {
      var r3 = this.state, i3 = [], t3 = [], e3 = (e3.onlyWithDerivedHelpers || (t3 = pr._getQueries(r3.index, r3), i3.push({ state: r3, queriesCount: t3.length, helper: this }), this.emit("search", { state: r3, results: this.lastResults })), this.derivedHelpers.map(function(e4) {
        var t4 = e4.getModifiedState(r3), n3 = t4.index ? pr._getQueries(t4.index, t4) : [];
        return i3.push({ state: t4, queriesCount: n3.length, helper: e4 }), e4.emit("search", { state: t4, results: e4.lastResults }), n3;
      })), t3 = Array.prototype.concat.apply(t3, e3), e3 = this._queryId++;
      if (this._currentNbQueries++, !t3.length)
        return Promise.resolve({ results: [] }).then(this._dispatchAlgoliaResponse.bind(this, i3, e3));
      try {
        this.client.search(t3).then(this._dispatchAlgoliaResponse.bind(this, i3, e3)).catch(this._dispatchAlgoliaError.bind(this, e3));
      } catch (e4) {
        this.emit("error", { error: e4 });
      }
    }, t2.prototype._recommend = function() {
      var r3 = this.state, e3 = this.recommendState, t3 = this.getIndex(), i3 = [{ state: e3, index: t3, helper: this }], e3 = (this.emit("fetch", { recommend: { state: e3, results: this.lastRecommendResults } }), this.derivedHelpers.map(function(e4) {
        var t4, n3 = e4.getModifiedState(r3).index;
        return n3 ? (t4 = e4.getModifiedRecommendState(new hr()), i3.push({ state: t4, index: n3, helper: e4 }), e4.emit("fetch", { recommend: { state: t4, results: e4.lastRecommendResults } }), t4._buildQueries(n3)) : [];
      })), t3 = Array.prototype.concat.apply(this.recommendState._buildQueries(t3), e3);
      if (0 !== t3.length)
        if (0 < t3.length && void 0 === this.client.getRecommendations)
          console.warn("Please update algoliasearch/lite to the latest version in order to use recommendations widgets.");
        else {
          e3 = this._recommendQueryId++;
          this._currentNbRecommendQueries++;
          try {
            this.client.getRecommendations(t3).then(this._dispatchRecommendResponse.bind(this, e3, i3)).catch(this._dispatchRecommendError.bind(this, e3));
          } catch (e4) {
            this.emit("error", { error: e4 });
          }
        }
    }, t2.prototype._dispatchAlgoliaResponse = function(e3, t3, n3) {
      var r3, i3 = this;
      t3 < this._lastQueryIdReceived || (this._currentNbQueries -= t3 - this._lastQueryIdReceived, this._lastQueryIdReceived = t3, 0 === this._currentNbQueries && this.emit("searchQueueEmpty"), r3 = n3.results.slice(), e3.forEach(function(e4) {
        var t4 = e4.state, n4 = e4.queriesCount, e4 = e4.helper, n4 = r3.splice(0, n4);
        t4.index ? (e4.lastResults = new Or(t4, n4, i3._searchResultsOptions), e4.emit("result", { results: e4.lastResults, state: t4 })) : e4.emit("result", { results: null, state: t4 });
      }));
    }, t2.prototype._dispatchRecommendResponse = function(e3, t3, n3) {
      var r3;
      e3 < this._lastRecommendQueryIdReceived || (this._currentNbRecommendQueries -= e3 - this._lastRecommendQueryIdReceived, this._lastRecommendQueryIdReceived = e3, 0 === this._currentNbRecommendQueries && this.emit("recommendQueueEmpty"), r3 = n3.results.slice(), t3.forEach(function(e4) {
        var t4 = e4.state, n4 = e4.helper;
        e4.index ? (n4.lastRecommendResults = r3, n4.emit("recommend:result", { recommend: { results: n4.lastRecommendResults, state: t4 } })) : n4.emit("recommend:result", { results: null, state: t4 });
      }));
    }, t2.prototype._dispatchAlgoliaError = function(e3, t3) {
      e3 < this._lastQueryIdReceived || (this._currentNbQueries -= e3 - this._lastQueryIdReceived, this._lastQueryIdReceived = e3, this.emit("error", { error: t3 }), 0 === this._currentNbQueries && this.emit("searchQueueEmpty"));
    }, t2.prototype._dispatchRecommendError = function(e3, t3) {
      e3 < this._lastRecommendQueryIdReceived || (this._currentNbRecommendQueries -= e3 - this._lastRecommendQueryIdReceived, this._lastRecommendQueryIdReceived = e3, this.emit("error", { error: t3 }), 0 === this._currentNbRecommendQueries && this.emit("recommendQueueEmpty"));
    }, t2.prototype.containsRefinement = function(e3, t3, n3, r3) {
      return e3 || 0 !== t3.length || 0 !== n3.length || 0 !== r3.length;
    }, t2.prototype._hasDisjunctiveRefinements = function(e3) {
      return this.state.disjunctiveRefinements[e3] && 0 < this.state.disjunctiveRefinements[e3].length;
    }, t2.prototype._change = function(e3) {
      var t3 = e3.state, e3 = e3.isPageReset;
      t3 !== this.state && (this.state = t3, this.emit("change", { state: this.state, results: this.lastResults, isPageReset: e3 }));
    }, t2.prototype._recommendChange = function(e3) {
      e3 = e3.state;
      e3 !== this.recommendState && (this.recommendState = e3, this.emit("recommend:change", { search: { results: this.lastResults, state: this.state }, recommend: { results: this.lastRecommendResults, state: this.recommendState } }));
    }, t2.prototype.clearCache = function() {
      return this.client.clearCache && this.client.clearCache(), this;
    }, t2.prototype.setClient = function(e3) {
      return this.client !== e3 && ("function" == typeof e3.addAlgoliaAgent && e3.addAlgoliaAgent("JS Helper (3.19.0)"), this.client = e3), this;
    }, t2.prototype.getClient = function() {
      return this.client;
    }, t2.prototype.derive = function(e3, t3) {
      e3 = new rr(this, e3, t3);
      return this.derivedHelpers.push(e3), e3;
    }, t2.prototype.detachDerivedHelper = function(e3) {
      e3 = this.derivedHelpers.indexOf(e3);
      if (-1 === e3)
        throw new Error("Derived helper already detached");
      this.derivedHelpers.splice(e3, 1);
    }, t2.prototype.hasPendingRequests = function() {
      return 0 < this._currentNbQueries;
    };
    var Dr = t2;
    function Ur(e3, t3, n3, r3) {
      return new Dr(e3, t3, n3, r3);
    }
    Ur.version = ar, Ur.AlgoliaSearchHelper = Dr, Ur.SearchParameters = wr, Ur.RecommendParameters = hr, Ur.SearchResults = Or;
    var g = Ur, $r = l2({ name: "configure", connector: true });
    function Br(e3, t3) {
      return e3.setQueryParameters(Object.keys(t3.searchParameters).reduce(function(e4, t4) {
        return T(T({}, e4), {}, E({}, t4, void 0));
      }, {}));
    }
    function Qr() {
      var n3 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : R, i3 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return function(r3) {
        var t3;
        if (r3 && ie(r3.searchParameters))
          return t3 = {}, { $$type: "ais.configure", init: function(e3) {
            var t4 = e3.instantSearchInstance;
            n3(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t4 }), true);
          }, render: function(e3) {
            var t4 = e3.instantSearchInstance;
            n3(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t4 }), false);
          }, dispose: function(e3) {
            e3 = e3.state;
            return i3(), Br(e3, r3);
          }, getRenderState: function(e3, t4) {
            t4 = this.getWidgetRenderState(t4);
            return T(T({}, e3), {}, { configure: T(T({}, t4), {}, { widgetParams: T(T({}, t4.widgetParams), {}, { searchParameters: Ye(new g.SearchParameters(null == (e3 = e3.configure) ? void 0 : e3.widgetParams.searchParameters), new g.SearchParameters(t4.widgetParams.searchParameters)).getQueryParams() }) }) });
          }, getWidgetRenderState: function(e3) {
            var n4, e3 = e3.helper;
            return t3.refine || (t3.refine = (n4 = e3, function(e4) {
              var t4 = Br(n4.state, r3), t4 = Ye(t4, new g.SearchParameters(e4));
              r3.searchParameters = e4, n4.setState(t4).search();
            })), { refine: t3.refine, widgetParams: r3 };
          }, getWidgetSearchParameters: function(e3, t4) {
            t4 = t4.uiState;
            return Ye(e3, new g.SearchParameters(T(T({}, t4.configure), r3.searchParameters)));
          }, getWidgetUiState: function(e3) {
            return T(T({}, e3), {}, { configure: T(T({}, e3.configure), r3.searchParameters) });
          } };
        throw new Error($r("The `searchParameters` option expects an object."));
      };
    }
    var qr = l2({ name: "configure-related-items", connector: true });
    function Vr(e3) {
      var t3 = e3.attributeName, n3 = e3.attributeValue, e3 = e3.attributeScore;
      return "".concat(t3, ":").concat(n3, "<score=").concat(e3 || 1, ">");
    }
    function Kr(n3, r3) {
      return function(e3) {
        var t3, e3 = e3 || {}, a3 = e3.hit, s3 = e3.matchingPatterns, e3 = e3.transformSearchParameters, e3 = void 0 === e3 ? function(e4) {
          return e4;
        } : e3;
        if (!a3)
          throw new Error(qr("The `hit` option is required."));
        if (s3)
          return t3 = Object.keys(s3).reduce(function(e4, t4) {
            var n4 = s3[t4], r4 = Ie(a3, t4), i3 = n4.score;
            return Array.isArray(r4) ? [].concat(w(e4), [r4.map(function(e5) {
              return Vr({ attributeName: t4, attributeValue: e5, attributeScore: i3 });
            })]) : "string" == typeof r4 ? [].concat(w(e4), [Vr({ attributeName: t4, attributeValue: r4, attributeScore: i3 })]) : e4;
          }, []), e3 = T({}, e3(new g.SearchParameters({ sumOrFiltersScores: true, facetFilters: ["objectID:-".concat(a3.objectID)], optionalFilters: t3 }))), T(T({}, Qr(n3, r3)({ searchParameters: e3 })), {}, { $$type: "ais.configureRelatedItems" });
        throw new Error(qr("The `matchingPatterns` option is required."));
      };
    }
    var zr = l2({ name: "autocomplete", connector: true }), Jr = l2({ name: "query-rules", connector: true });
    function Zr(e3) {
      var i3, a3, s3, t3 = this.helper, n3 = this.initialRuleContexts, r3 = this.trackedFilters, o3 = this.transformRuleContexts, e3 = e3.state, c2 = e3.ruleContexts || [], r3 = (i3 = (r3 = { helper: t3, sharedHelperState: e3, trackedFilters: r3 }).helper, a3 = r3.sharedHelperState, s3 = r3.trackedFilters, Object.keys(s3).reduce(function(e4, t4) {
        var n4 = Ce(i3.lastResults || {}, a3, true).filter(function(e5) {
          return e5.attribute === t4;
        }).map(function(e5) {
          return e5.numericValue || e5.name;
        }), r4 = (0, s3[t4])(n4);
        return [].concat(w(e4), w(n4.filter(function(e5) {
          return r4.includes(e5);
        }).map(function(e5) {
          return "ais-".concat(t4, "-").concat(e5).replace(/[^a-z0-9-_]+/gi, "_");
        })));
      }, [])), o3 = o3([].concat(w(n3), w(r3))).slice(0, 10);
      Oe(c2, o3) || t3.overrideStateWithoutTriggeringChangeEvent(T(T({}, e3), {}, { ruleContexts: o3 }));
    }
    function Yr(l3) {
      var r3 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(l3, Jr()), function(i3) {
        var a3, e3 = i3 || {}, t3 = e3.trackedFilters, s3 = void 0 === t3 ? {} : t3, t3 = e3.transformRuleContexts, o3 = void 0 === t3 ? function(e4) {
          return e4;
        } : t3, t3 = e3.transformItems, n3 = void 0 === t3 ? function(e4) {
          return e4;
        } : t3, c2 = (Object.keys(s3).forEach(function(e4) {
          if ("function" != typeof s3[e4])
            throw new Error(Jr(`'The "`.concat(e4, '" filter value in the `trackedFilters` option expects a function.')));
        }), 0 < Object.keys(s3).length), u2 = [];
        return { $$type: "ais.queryRules", init: function(e4) {
          var t4 = e4.helper, n4 = e4.state, r4 = e4.instantSearchInstance;
          u2 = n4.ruleContexts || [], a3 = Zr.bind({ helper: t4, initialRuleContexts: u2, trackedFilters: s3, transformRuleContexts: o3 }), c2 && (([n4.disjunctiveFacetsRefinements, n4.facetsRefinements, n4.hierarchicalFacetsRefinements, n4.numericRefinements].some(function(e5) {
            return Boolean(e5 && 0 < Object.keys(e5).length);
          }) || Boolean(i3.transformRuleContexts)) && a3({ state: n4 }), t4.on("change", a3)), l3(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: r4 }), true);
        }, render: function(e4) {
          var t4 = e4.instantSearchInstance;
          l3(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: t4 }), false);
        }, getWidgetRenderState: function(e4) {
          var e4 = e4.results, t4 = (e4 || {}).userData;
          return { items: n3(void 0 === t4 ? [] : t4, { results: e4 }), widgetParams: i3 };
        }, getRenderState: function(e4, t4) {
          return T(T({}, e4), {}, { queryRules: this.getWidgetRenderState(t4) });
        }, dispose: function(e4) {
          var t4 = e4.helper, e4 = e4.state;
          return r3(), c2 ? (t4.removeListener("change", a3), e4.setQueryParameter("ruleContexts", u2)) : e4;
        } };
      };
    }
    function Xr(e3) {
      function t3() {
        d2(u2(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "initial"));
      }
      function n3() {
        r3 && (r3.stop(), r3.removeEventListener("start", h2), r3.removeEventListener("error", f2), r3.removeEventListener("result", m2), r3.removeEventListener("end", p2), r3 = void 0);
      }
      var r3, i3 = e3.searchAsYouSpeak, a3 = e3.language, s3 = e3.onQueryChange, o3 = e3.onStateChange, c2 = window.webkitSpeechRecognition || window.SpeechRecognition, u2 = function(e4) {
        return { status: e4, transcript: "", isSpeechFinal: false, errorCode: void 0 };
      }, l3 = u2("initial"), d2 = function() {
        var e4 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
        l3 = T(T({}, l3), e4), o3();
      }, h2 = function() {
        d2({ status: "waiting" });
      }, f2 = function(e4) {
        d2({ status: "error", errorCode: e4.error });
      }, m2 = function(e4) {
        d2({ status: "recognizing", transcript: e4.results[0] && e4.results[0][0] && e4.results[0][0].transcript || "", isSpeechFinal: e4.results[0] && e4.results[0].isFinal }), i3 && l3.transcript && s3(l3.transcript);
      }, p2 = function() {
        l3.errorCode || !l3.transcript || i3 || s3(l3.transcript), "error" !== l3.status && d2({ status: "finished" });
      };
      return { getState: function() {
        return l3;
      }, isBrowserSupported: function() {
        return Boolean(c2);
      }, isListening: function() {
        return "askingPermission" === l3.status || "waiting" === l3.status || "recognizing" === l3.status;
      }, startListening: function() {
        (r3 = new c2()) && (t3("askingPermission"), r3.interimResults = true, a3 && (r3.lang = a3), r3.addEventListener("start", h2), r3.addEventListener("error", f2), r3.addEventListener("result", m2), r3.addEventListener("end", p2), r3.start());
      }, stopListening: function() {
        n3(), t3("finished");
      }, dispose: n3 };
    }
    function Gr(m2) {
      var r3 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(m2, ti()), function(u2) {
        var e3 = u2.searchAsYouSpeak, l3 = void 0 !== e3 && e3, d2 = u2.language, h2 = u2.additionalQueryParameters, e3 = u2.createVoiceSearchHelper, f2 = void 0 === e3 ? Xr : e3;
        return { $$type: "ais.voiceSearch", init: function(e4) {
          var t3 = e4.instantSearchInstance;
          m2(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: t3 }), true);
        }, render: function(e4) {
          var t3 = e4.instantSearchInstance;
          m2(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: t3 }), false);
        }, getRenderState: function(e4, t3) {
          return T(T({}, e4), {}, { voiceSearch: this.getWidgetRenderState(t3) });
        }, getWidgetRenderState: function(e4) {
          var t3 = this, n3 = e4.helper, r4 = e4.instantSearchInstance, i3 = (this._refine || (this._refine = function(e5) {
            var t4;
            e5 !== n3.state.query && (t4 = d2 ? [d2.split("-")[0]] : void 0, n3.setQueryParameter("queryLanguages", t4), "function" == typeof h2 && n3.setState(n3.state.setQueryParameters(T({ ignorePlurals: true, removeStopWords: true, optionalWords: e5 }, h2({ query: e5 })))), n3.setQuery(e5).search());
          }), this._voiceSearchHelper || (this._voiceSearchHelper = f2({ searchAsYouSpeak: l3, language: d2, onQueryChange: function(e5) {
            return t3._refine(e5);
          }, onStateChange: function() {
            m2(T(T({}, t3.getWidgetRenderState(e4)), {}, { instantSearchInstance: r4 }), false);
          } })), this._voiceSearchHelper), a3 = i3.isBrowserSupported, s3 = i3.isListening, o3 = i3.startListening, c2 = i3.stopListening, i3 = i3.getState;
          return { isBrowserSupported: a3(), isListening: s3(), toggleListening: function() {
            a3() && (s3() ? c2 : o3)();
          }, voiceListeningState: i3(), widgetParams: u2 };
        }, dispose: function(e4) {
          var t3, e4 = e4.state, n3 = (this._voiceSearchHelper.dispose(), r3(), e4);
          return "function" == typeof h2 && (t3 = (t3 = h2({ query: "" })) ? Object.keys(t3).reduce(function(e5, t4) {
            return e5[t4] = void 0, e5;
          }, {}) : {}, n3 = e4.setQueryParameters(T({ queryLanguages: void 0, ignorePlurals: void 0, removeStopWords: void 0, optionalWords: void 0 }, t3))), n3.setQueryParameter("query", void 0);
        }, getWidgetUiState: function(e4, t3) {
          t3 = t3.searchParameters.query || "";
          return t3 ? T(T({}, e4), {}, { query: t3 }) : e4;
        }, getWidgetSearchParameters: function(e4, t3) {
          t3 = t3.uiState;
          return e4.setQueryParameter("query", t3.query || "");
        } };
      };
    }
    function ei() {
      var n3 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : R, t3 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return function(r3) {
        var i3 = {};
        return { $$type: "ais.relevantSort", init: function(e3) {
          var t4 = e3.instantSearchInstance;
          n3(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t4 }), true);
        }, render: function(e3) {
          var t4 = e3.instantSearchInstance;
          n3(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t4 }), false);
        }, dispose: function(e3) {
          e3 = e3.state;
          return t3(), e3.setQueryParameter("relevancyStrictness", void 0);
        }, getRenderState: function(e3, t4) {
          return T(T({}, e3), {}, { relevantSort: this.getWidgetRenderState(t4) });
        }, getWidgetRenderState: function(e3) {
          var t4 = e3.results, n4 = e3.helper;
          i3.refine || (i3.refine = function(e4) {
            n4.setQueryParameter("relevancyStrictness", e4).search();
          });
          e3 = (t4 || {}).appliedRelevancyStrictness, t4 = void 0 !== e3;
          return { isRelevantSorted: void 0 !== e3 && 0 < e3, isVirtualReplica: t4, canRefine: t4, refine: i3.refine, widgetParams: r3 };
        }, getWidgetSearchParameters: function(e3, t4) {
          var t4 = t4.uiState;
          return e3.setQueryParameter("relevancyStrictness", null != (t4 = t4.relevantSort) ? t4 : e3.relevancyStrictness);
        }, getWidgetUiState: function(e3, t4) {
          t4 = t4.searchParameters;
          return T(T({}, e3), {}, { relevantSort: t4.relevancyStrictness || e3.relevantSort });
        } };
      };
    }
    function i2(n3) {
      return function() {
        var e3 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t3 = e3.descendantName, e3 = e3.modifierName, t3 = t3 ? "-".concat(t3) : "", e3 = e3 ? "--".concat(e3) : "";
        return "".concat("ais", "-").concat(n3).concat(t3).concat(e3);
      };
    }
    var ti = l2({ name: "voice-search", connector: true }), ir = J(at), e2 = J(st), ar = Object.freeze({ __proto__: null, EXPERIMENTAL_connectAnswers: ir, EXPERIMENTAL_connectDynamicWidgets: e2, connectDynamicWidgets: st, connectClearRefinements: ot, connectCurrentRefinements: dt, connectHierarchicalMenu: vt, connectHits: St, connectHitsWithInsights: en, connectHitsPerPage: Gt, connectInfiniteHits: cn, connectInfiniteHitsWithInsights: ln, connectMenu: un, connectNumericMenu: mn, connectPagination: bn, connectRange: Pn, connectRefinementList: Nn, connectSearchBox: En, connectSortBy: kn, connectRatingMenu: jn, connectStats: An, connectToggleRefinement: Wn, connectBreadcrumb: Dn, connectGeoSearch: zn, connectPoweredBy: Jn, connectConfigure: Qr, EXPERIMENTAL_connectConfigureRelatedItems: Kr, connectAutocomplete: function(n3) {
      var t3 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(n3, zr()), function(s3) {
        var e3 = (s3 || {}).escapeHTML, o3 = void 0 === e3 || e3, c2 = {};
        return { $$type: "ais.autocomplete", init: function(e4) {
          var t4 = e4.instantSearchInstance;
          n3(T(T({}, this.getWidgetRenderState(e4)), {}, { instantSearchInstance: t4 }), true);
        }, render: function(e4) {
          var t4 = e4.instantSearchInstance, e4 = this.getWidgetRenderState(e4);
          e4.indices.forEach(function(e5) {
            (0, e5.sendEvent)("view:internal", e5.hits);
          }), n3(T(T({}, e4), {}, { instantSearchInstance: t4 }), false);
        }, getRenderState: function(e4, t4) {
          return T(T({}, e4), {}, { autocomplete: this.getWidgetRenderState(t4) });
        }, getWidgetRenderState: function(e4) {
          var n4 = this, t4 = e4.helper, r3 = e4.state, i3 = e4.scopedResults, a3 = e4.instantSearchInstance, e4 = (c2.refine || (c2.refine = function(e5) {
            t4.setQuery(e5).search();
          }), i3.map(function(e5) {
            e5.results.hits = o3 ? ce(e5.results.hits) : e5.results.hits;
            var t5 = me({ instantSearchInstance: a3, getIndex: function() {
              return e5.results.index;
            }, widgetType: n4.$$type });
            return { indexId: e5.indexId, indexName: e5.results.index, hits: e5.results.hits, results: e5.results, sendEvent: t5 };
          }));
          return { currentRefinement: r3.query || "", indices: e4, refine: c2.refine, widgetParams: s3 };
        }, getWidgetUiState: function(e4, t4) {
          t4 = t4.searchParameters.query || "";
          return "" === t4 || e4 && e4.query === t4 ? e4 : T(T({}, e4), {}, { query: t4 });
        }, getWidgetSearchParameters: function(e4, t4) {
          t4 = { query: t4.uiState.query || "" };
          return o3 ? e4.setQueryParameters(T(T({}, t4), ae)) : e4.setQueryParameters(t4);
        }, dispose: function(e4) {
          e4 = e4.state, t3(), e4 = e4.setQueryParameter("query", void 0);
          return o3 ? e4.setQueryParameters(Object.keys(ae).reduce(function(e5, t4) {
            return T(T({}, e5), {}, E({}, t4, void 0));
          }, {})) : e4;
        } };
      };
    }, connectQueryRules: Yr, connectVoiceSearch: Gr, connectRelevantSort: ei }), ni = i2("Highlight");
    function ri(e3) {
      var t3 = e3.attribute, n3 = e3.highlightedTagName, n3 = void 0 === n3 ? "mark" : n3, r3 = e3.hit, e3 = e3.cssClasses, e3 = void 0 === e3 ? {} : e3, r3 = (Ie(r3._highlightResult, t3) || {}).value, t3 = void 0 === r3 ? "" : r3, r3 = ni({ descendantName: "highlighted" }) + (e3.highlighted ? " ".concat(e3.highlighted) : "");
      return t3.replace(new RegExp(u.highlightPreTag, "g"), "<".concat(n3, ' class="').concat(r3, '">')).replace(new RegExp(u.highlightPostTag, "g"), "</".concat(n3, ">"));
    }
    var ii = i2("ReverseHighlight");
    function ai(e3) {
      var t3 = e3.attribute, n3 = e3.highlightedTagName, n3 = void 0 === n3 ? "mark" : n3, r3 = e3.hit, e3 = e3.cssClasses, e3 = void 0 === e3 ? {} : e3, r3 = (Ie(r3._highlightResult, t3) || {}).value, t3 = void 0 === r3 ? "" : r3, r3 = ii({ descendantName: "highlighted" }) + (e3.highlighted ? " ".concat(e3.highlighted) : "");
      return ue(nt(Ne(t3))).replace(new RegExp(u.highlightPreTag, "g"), "<".concat(n3, ' class="').concat(r3, '">')).replace(new RegExp(u.highlightPostTag, "g"), "</".concat(n3, ">"));
    }
    var si = i2("Snippet");
    function oi(e3) {
      var t3 = e3.attribute, n3 = e3.highlightedTagName, n3 = void 0 === n3 ? "mark" : n3, r3 = e3.hit, e3 = e3.cssClasses, e3 = void 0 === e3 ? {} : e3, r3 = (Ie(r3._snippetResult, t3) || {}).value, t3 = void 0 === r3 ? "" : r3, r3 = si({ descendantName: "highlighted" }) + (e3.highlighted ? " ".concat(e3.highlighted) : "");
      return t3.replace(new RegExp(u.highlightPreTag, "g"), "<".concat(n3, ' class="').concat(r3, '">')).replace(new RegExp(u.highlightPostTag, "g"), "</".concat(n3, ">"));
    }
    var ci = i2("ReverseSnippet");
    function ui(e3) {
      var t3 = e3.attribute, n3 = e3.highlightedTagName, n3 = void 0 === n3 ? "mark" : n3, r3 = e3.hit, e3 = e3.cssClasses, e3 = void 0 === e3 ? {} : e3, r3 = (Ie(r3._snippetResult, t3) || {}).value, t3 = void 0 === r3 ? "" : r3, r3 = ci({ descendantName: "highlighted" }) + (e3.highlighted ? " ".concat(e3.highlighted) : "");
      return ue(nt(Ne(t3))).replace(new RegExp(u.highlightPreTag, "g"), "<".concat(n3, ' class="').concat(r3, '">')).replace(new RegExp(u.highlightPostTag, "g"), "</".concat(n3, ">"));
    }
    var li = "_ALGOLIA";
    function di() {
      var e3 = li;
      if ("object" === ("undefined" == typeof document ? "undefined" : A(document)) && "string" == typeof document.cookie)
        for (var t3 = "".concat(e3, "="), n3 = document.cookie.split(";"), r3 = 0; r3 < n3.length; r3++) {
          for (var i3 = n3[r3]; " " === i3.charAt(0); )
            i3 = i3.substring(1);
          if (0 === i3.indexOf(t3))
            return i3.substring(t3.length, i3.length);
        }
    }
    var hi = ["page"];
    function fi(e3) {
      e3 = e3 || {};
      e3.page;
      return k(e3, hi);
    }
    var mi = "ais.infiniteHits";
    var pi = "2.13.0", gi = "https://cdn.jsdelivr.net/npm/search-insights@".concat(pi, "/dist/search-insights.min.js");
    function vi() {
      var e3 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t3 = e3.insightsClient, m2 = e3.insightsInitParams, p2 = e3.onEvent, n3 = e3.$$internal, g2 = void 0 !== n3 && n3, n3 = e3.$$automatic, v2 = void 0 !== n3 && n3, a3 = t3, y2 = (t3 || null === t3 || rt(function(e4) {
        var r3 = e4.window, i3 = r3.AlgoliaAnalyticsObject || "aa";
        (a3 = "string" == typeof i3 ? r3[i3] : a3) || (r3.AlgoliaAnalyticsObject = i3, r3[i3] || (r3[i3] = function() {
          r3[i3].queue || (r3[i3].queue = []);
          for (var e5 = arguments.length, t4 = new Array(e5), n4 = 0; n4 < e5; n4++)
            t4[n4] = arguments[n4];
          r3[i3].queue.push(t4);
        }, r3[i3].version = pi, r3[i3].shouldAddScript = true), a3 = r3[i3]);
      }), a3 || R);
      return function(e4) {
        var a4 = e4.instantSearchInstance, e4 = a4.middleware.filter(function(e5) {
          return "ais.insights" === e5.instance.$$type && e5.instance.$$internal;
        }).map(function(e5) {
          return e5.creator;
        });
        a4.unuse.apply(a4, w(e4));
        var t4, n4, s3, o3, r3 = j((e4 = a4.client).transporter ? (r3 = (t4 = e4.transporter).headers, t4 = t4.queryParameters, [r3[n4 = "x-algolia-application-id"] || t4[n4], r3[n4 = "x-algolia-api-key"] || t4[n4]]) : [e4.applicationID, e4.apiKey], 2), c2 = r3[0], u2 = r3[1], l3 = void 0, d2 = void 0, h2 = void 0, f2 = void 0, i3 = y2.queue;
        return Array.isArray(i3) && (t4 = ["setUserToken", "setAuthenticatedUserToken"].map(function(t5) {
          var e5 = _e(i3.slice().reverse(), function(e6) {
            return j(e6, 1)[0] === t5;
          }) || [];
          return j(e5, 2)[1];
        }), n4 = j(t4, 2), l3 = n4[0], d2 = n4[1]), y2("getUserToken", null, function(e5, t5) {
          h2 = bi(t5);
        }), y2("getAuthenticatedUserToken", null, function(e5, t5) {
          f2 = bi(t5);
        }), !m2 && yi(y2) || y2("init", T({ appId: c2, apiKey: u2, partial: true }, m2)), { $$type: "ais.insights", $$internal: g2, $$automatic: v2, onStateChange: function() {
        }, subscribe: function() {
          if (y2.shouldAddScript) {
            var t5 = "[insights middleware]: could not load search-insights.js. Please load it manually following https://alg.li/insights-init";
            try {
              var e5 = document.createElement("script");
              e5.async = true, e5.src = gi, e5.onerror = function() {
                a4.emit("error", new Error(t5));
              }, document.body.appendChild(e5), y2.shouldAddScript = false;
            } catch (e6) {
              y2.shouldAddScript = false, a4.emit("error", new Error(t5));
            }
          }
        }, started: function() {
          y2("addAlgoliaAgent", "insights-middleware"), o3 = a4.mainHelper, s3 = { userToken: o3.state.userToken, clickAnalytics: o3.state.clickAnalytics }, v2 || o3.overrideStateWithoutTriggeringChangeEvent(T(T({}, o3.state), {}, { clickAnalytics: true })), g2 || a4.scheduleSearch();
          var r4 = function(e6) {
            var t6, n6 = 1 < arguments.length && void 0 !== arguments[1] && arguments[1], r5 = bi(e6);
            function i5() {
              o3.overrideStateWithoutTriggeringChangeEvent(T(T({}, o3.state), {}, { userToken: r5 })), t6 && t6 !== e6 && a4.scheduleSearch();
            }
            r5 && (t6 = o3.state.userToken, n6 ? i5() : setTimeout(i5, 0));
          }, e5 = di();
          function t5(e6, t6, n6) {
            r4(e6, true), t6 && y2("setUserToken", t6), n6 && y2("setAuthenticatedUserToken", n6);
          }
          e5 && r4(e5, true);
          var e5 = f2 || h2, n5 = d2 || l3, i4 = (e5 ? t5(e5, h2, f2) : n5 && t5(n5, l3, d2), y2("onUserTokenChange", r4, { immediate: true }), y2("onAuthenticatedUserTokenChange", function(e6) {
            e6 || y2("getUserToken", null, function(e7, t6) {
              r4(t6);
            }), r4(e6);
          }, { immediate: true }), y2);
          yi(y2) && (i4 = function(e6, t6) {
            return y2(e6, t6, { headers: { "X-Algolia-Application-Id": c2, "X-Algolia-API-Key": u2 } });
          }), a4.sendEventToInsights = function(e6) {
            p2 ? p2(e6, i4) : e6.insightsMethod && (e6.payload.algoliaSource = ["instantsearch"], v2 && e6.payload.algoliaSource.push("instantsearch-automatic"), "internal" === e6.eventModifier && e6.payload.algoliaSource.push("instantsearch-internal"), i4(e6.insightsMethod, e6.payload));
          };
        }, unsubscribe: function() {
          y2("onUserTokenChange", void 0), y2("onAuthenticatedUserTokenChange", void 0), a4.sendEventToInsights = R, o3 && s3 && (o3.overrideStateWithoutTriggeringChangeEvent(T(T({}, o3.state), s3)), a4.scheduleSearch());
        } };
      };
    }
    function yi(e3) {
      var e3 = j((e3.version || "").split(".").map(Number), 2), t3 = e3[0], e3 = e3[1];
      return 3 <= t3 || 2 === t3 && 6 <= e3 || 1 === t3 && 10 <= e3;
    }
    function bi(e3) {
      if (e3)
        return "number" == typeof e3 ? e3.toString() : e3;
    }
    function Ri() {
      return rt(function(e3) {
        return -1 < (null == (e3 = e3.window.navigator) || null == (e3 = e3.userAgent) ? void 0 : e3.indexOf("Algolia Crawler"));
      }, { fallback: function() {
        return false;
      } });
    }
    function Si() {
      var e3 = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).$$internal, a3 = void 0 !== e3 && e3;
      return function(e4) {
        var t3 = e4.instantSearchInstance, n3 = { widgets: [] }, r3 = document.createElement("meta"), i3 = document.querySelector("head");
        return r3.name = "instantsearch:widgets", { $$type: "ais.metadata", $$internal: a3, onStateChange: function() {
        }, subscribe: function() {
          setTimeout(function() {
            var e5 = t3.client;
            n3.ua = e5.transporter && e5.transporter.userAgent ? e5.transporter.userAgent.value : e5._ua, function r4(e6, i4, a4) {
              var s3 = et(i4, i4.mainIndex, i4._initialUiState);
              e6.forEach(function(e7) {
                var t4 = {}, n4 = (e7.getWidgetRenderState && (n4 = e7.getWidgetRenderState(s3)) && n4.widgetParams && (t4 = n4.widgetParams), Object.keys(t4).filter(function(e8) {
                  return void 0 !== t4[e8];
                }));
                a4.widgets.push({ type: e7.$$type, widgetType: e7.$$widgetType, params: n4 }), "ais.index" === e7.$$type && r4(e7.getWidgets(), i4, a4);
              });
            }(t3.mainIndex.getWidgets(), t3, n3), t3.middleware.forEach(function(e6) {
              return n3.widgets.push({ middleware: true, type: e6.instance.$$type, internal: e6.instance.$$internal });
            }), r3.content = JSON.stringify(n3), i3.appendChild(r3);
          }, 0);
        }, started: function() {
        }, unsubscribe: function() {
          r3.remove();
        } };
      };
    }
    function _i(e3, t3) {
      for (var n3 = t3 && t3.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, r3 = 0; r3 < e3.length; ++r3)
        void 0 !== e3[r3] && (n3[r3] = e3[r3]);
      return n3;
    }
    function wi(e3, t3, n3, r3, i3, a3, s3, o3, c2, u2, l3, d2, h2, f2) {
      var m2 = e3;
      if ("function" == typeof s3 ? m2 = s3(t3, m2) : m2 instanceof Date ? m2 = u2(m2) : "comma" === n3 && Mi(m2) && (m2 = Ei.maybeMap(m2, function(e4) {
        return e4 instanceof Date ? u2(e4) : e4;
      })), null === m2) {
        if (r3)
          return a3 && !h2 ? a3(t3, I.encoder, f2, "key", l3) : t3;
        m2 = "";
      }
      if (Wi(m2) || Ei.isBuffer(m2)) {
        if (a3) {
          e3 = h2 ? t3 : a3(t3, I.encoder, f2, "key", l3);
          if ("comma" === n3 && h2) {
            for (var p2 = Li.call(String(m2), ","), g2 = "", v2 = 0; v2 < p2.length; ++v2)
              g2 += (0 === v2 ? "" : ",") + d2(a3(p2[v2], I.encoder, f2, "value", l3));
            return [d2(e3) + "=" + g2];
          }
          return [d2(e3) + "=" + d2(a3(m2, I.encoder, f2, "value", l3))];
        }
        return [d2(t3) + "=" + d2(String(m2))];
      }
      var y2, b2 = [];
      if (void 0 !== m2) {
        y2 = "comma" === n3 && Mi(m2) ? [{ value: 0 < m2.length ? m2.join(",") || null : void 0 }] : Mi(s3) ? s3 : (e3 = Object.keys(m2), o3 ? e3.sort(o3) : e3);
        for (var R2 = 0; R2 < y2.length; ++R2) {
          var S2 = y2[R2], _2 = "object" == typeof S2 && void 0 !== S2.value ? S2.value : m2[S2];
          i3 && null === _2 || (S2 = Mi(m2) ? "function" == typeof n3 ? n3(t3, S2) : t3 : t3 + (c2 ? "." + S2 : "[" + S2 + "]"), Hi(b2, wi(_2, S2, n3, r3, i3, a3, s3, o3, c2, u2, l3, d2, h2, f2)));
        }
      }
      return b2;
    }
    function Pi(e3) {
      e3 && (window.document.title = e3);
    }
    var Ni = String.prototype.replace, xi = /%20/g, ir = "RFC3986", Ii = { default: ir, formatters: { RFC1738: function(e3) {
      return Ni.call(e3, xi, "+");
    }, RFC3986: function(e3) {
      return String(e3);
    } }, RFC1738: "RFC1738", RFC3986: ir }, Fi = Object.prototype.hasOwnProperty, Ci = Array.isArray, Ti = function() {
      for (var e3 = [], t3 = 0; t3 < 256; ++t3)
        e3.push("%" + ((t3 < 16 ? "0" : "") + t3.toString(16)).toUpperCase());
      return e3;
    }(), Ei = { arrayToObject: _i, assign: function(e3, n3) {
      return Object.keys(n3).reduce(function(e4, t3) {
        return e4[t3] = n3[t3], e4;
      }, e3);
    }, combine: function(e3, t3) {
      return [].concat(e3, t3);
    }, compact: function(e3) {
      for (var t3 = [{ obj: { o: e3 }, prop: "o" }], n3 = [], r3 = 0; r3 < t3.length; ++r3)
        for (var i3 = t3[r3], a3 = i3.obj[i3.prop], s3 = Object.keys(a3), o3 = 0; o3 < s3.length; ++o3) {
          var c2 = s3[o3], u2 = a3[c2];
          "object" == typeof u2 && null !== u2 && -1 === n3.indexOf(u2) && (t3.push({ obj: a3, prop: c2 }), n3.push(u2));
        }
      for (var l3 = t3; 1 < l3.length; ) {
        var d2 = l3.pop(), h2 = d2.obj[d2.prop];
        if (Ci(h2)) {
          for (var f2 = [], m2 = 0; m2 < h2.length; ++m2)
            void 0 !== h2[m2] && f2.push(h2[m2]);
          d2.obj[d2.prop] = f2;
        }
      }
      return e3;
    }, decode: function(t3, e3, n3) {
      t3 = t3.replace(/\+/g, " ");
      if ("iso-8859-1" === n3)
        return t3.replace(/%[0-9a-f]{2}/gi, unescape);
      try {
        return decodeURIComponent(t3);
      } catch (e4) {
        return t3;
      }
    }, encode: function(e3, t3, n3, r3, i3) {
      if (0 === e3.length)
        return e3;
      var a3 = e3;
      if ("symbol" == typeof e3 ? a3 = Symbol.prototype.toString.call(e3) : "string" != typeof e3 && (a3 = String(e3)), "iso-8859-1" === n3)
        return escape(a3).replace(/%u[0-9a-f]{4}/gi, function(e4) {
          return "%26%23" + parseInt(e4.slice(2), 16) + "%3B";
        });
      for (var s3 = "", o3 = 0; o3 < a3.length; ++o3) {
        var c2 = a3.charCodeAt(o3);
        45 === c2 || 46 === c2 || 95 === c2 || 126 === c2 || 48 <= c2 && c2 <= 57 || 65 <= c2 && c2 <= 90 || 97 <= c2 && c2 <= 122 || i3 === Ii.RFC1738 && (40 === c2 || 41 === c2) ? s3 += a3.charAt(o3) : c2 < 128 ? s3 += Ti[c2] : c2 < 2048 ? s3 += Ti[192 | c2 >> 6] + Ti[128 | 63 & c2] : c2 < 55296 || 57344 <= c2 ? s3 += Ti[224 | c2 >> 12] + Ti[128 | c2 >> 6 & 63] + Ti[128 | 63 & c2] : (o3 += 1, c2 = 65536 + ((1023 & c2) << 10 | 1023 & a3.charCodeAt(o3)), s3 += Ti[240 | c2 >> 18] + Ti[128 | c2 >> 12 & 63] + Ti[128 | c2 >> 6 & 63] + Ti[128 | 63 & c2]);
      }
      return s3;
    }, isBuffer: function(e3) {
      return !(!e3 || "object" != typeof e3 || !(e3.constructor && e3.constructor.isBuffer && e3.constructor.isBuffer(e3)));
    }, isRegExp: function(e3) {
      return "[object RegExp]" === Object.prototype.toString.call(e3);
    }, maybeMap: function(e3, t3) {
      if (Ci(e3)) {
        for (var n3 = [], r3 = 0; r3 < e3.length; r3 += 1)
          n3.push(t3(e3[r3]));
        return n3;
      }
      return t3(e3);
    }, merge: function r3(i3, a3, s3) {
      if (!a3)
        return i3;
      if ("object" != typeof a3) {
        if (Ci(i3))
          i3.push(a3);
        else {
          if (!i3 || "object" != typeof i3)
            return [i3, a3];
          (s3 && (s3.plainObjects || s3.allowPrototypes) || !Fi.call(Object.prototype, a3)) && (i3[a3] = true);
        }
        return i3;
      }
      var e3;
      return i3 && "object" == typeof i3 ? (Ci(e3 = i3) && !Ci(a3) && (e3 = _i(i3, s3)), Ci(i3) && Ci(a3) ? (a3.forEach(function(e4, t3) {
        var n3;
        Fi.call(i3, t3) ? (n3 = i3[t3]) && "object" == typeof n3 && e4 && "object" == typeof e4 ? i3[t3] = r3(n3, e4, s3) : i3.push(e4) : i3[t3] = e4;
      }), i3) : Object.keys(a3).reduce(function(e4, t3) {
        var n3 = a3[t3];
        return Fi.call(e4, t3) ? e4[t3] = r3(e4[t3], n3, s3) : e4[t3] = n3, e4;
      }, e3)) : [i3].concat(a3);
    } }, ki = Object.prototype.hasOwnProperty, ji = { brackets: function(e3) {
      return e3 + "[]";
    }, comma: "comma", indices: function(e3, t3) {
      return e3 + "[" + t3 + "]";
    }, repeat: function(e3) {
      return e3;
    } }, Mi = Array.isArray, Li = String.prototype.split, Oi = Array.prototype.push, Hi = function(e3, t3) {
      Oi.apply(e3, Mi(t3) ? t3 : [t3]);
    }, Ai = Date.prototype.toISOString, e2 = Ii.default, I = { addQueryPrefix: false, allowDots: false, charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encoder: Ei.encode, encodeValuesOnly: false, format: e2, formatter: Ii.formatters[e2], indices: false, serializeDate: function(e3) {
      return Ai.call(e3);
    }, skipNulls: false, strictNullHandling: false }, Wi = function(e3) {
      return "string" == typeof e3 || "number" == typeof e3 || "boolean" == typeof e3 || "symbol" == typeof e3 || "bigint" == typeof e3;
    }, Di = Object.prototype.hasOwnProperty, Ui = Array.isArray, f = { allowDots: false, allowPrototypes: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decoder: Ei.decode, delimiter: "&", depth: 5, ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false }, $i = function(e3) {
      return e3.replace(/&#(\d+);/g, function(e4, t3) {
        return String.fromCharCode(parseInt(t3, 10));
      });
    }, Bi = function(e3, t3) {
      return e3 && "string" == typeof e3 && t3.comma && -1 < e3.indexOf(",") ? e3.split(",") : e3;
    }, Qi = "utf8=%26%2310003%3B", qi = "utf8=%E2%9C%93", Vi = function(e3, t3, n3, r3) {
      for (var i3 = r3 ? t3 : Bi(t3, n3), a3 = e3.length - 1; 0 <= a3; --a3) {
        var s3, o3, c2, u2 = e3[a3];
        "[]" === u2 && n3.parseArrays ? s3 = [].concat(i3) : (s3 = n3.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, o3 = "[" === u2.charAt(0) && "]" === u2.charAt(u2.length - 1) ? u2.slice(1, -1) : u2, c2 = parseInt(o3, 10), n3.parseArrays || "" !== o3 ? !isNaN(c2) && u2 !== o3 && String(c2) === o3 && 0 <= c2 && n3.parseArrays && c2 <= n3.arrayLimit ? (s3 = [])[c2] = i3 : "__proto__" !== o3 && (s3[o3] = i3) : s3 = { 0: i3 }), i3 = s3;
      }
      return i3;
    }, Ki = { formats: Ii, parse: function(e3, t3) {
      var n3 = function(e4) {
        if (!e4)
          return f;
        if (null !== e4.decoder && void 0 !== e4.decoder && "function" != typeof e4.decoder)
          throw new TypeError("Decoder has to be a function.");
        if (void 0 !== e4.charset && "utf-8" !== e4.charset && "iso-8859-1" !== e4.charset)
          throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        var t4 = (void 0 === e4.charset ? f : e4).charset;
        return { allowDots: void 0 === e4.allowDots ? f.allowDots : !!e4.allowDots, allowPrototypes: ("boolean" == typeof e4.allowPrototypes ? e4 : f).allowPrototypes, arrayLimit: ("number" == typeof e4.arrayLimit ? e4 : f).arrayLimit, charset: t4, charsetSentinel: ("boolean" == typeof e4.charsetSentinel ? e4 : f).charsetSentinel, comma: ("boolean" == typeof e4.comma ? e4 : f).comma, decoder: ("function" == typeof e4.decoder ? e4 : f).decoder, delimiter: ("string" == typeof e4.delimiter || Ei.isRegExp(e4.delimiter) ? e4 : f).delimiter, depth: "number" == typeof e4.depth || false === e4.depth ? +e4.depth : f.depth, ignoreQueryPrefix: true === e4.ignoreQueryPrefix, interpretNumericEntities: ("boolean" == typeof e4.interpretNumericEntities ? e4 : f).interpretNumericEntities, parameterLimit: ("number" == typeof e4.parameterLimit ? e4 : f).parameterLimit, parseArrays: false !== e4.parseArrays, plainObjects: ("boolean" == typeof e4.plainObjects ? e4 : f).plainObjects, strictNullHandling: ("boolean" == typeof e4.strictNullHandling ? e4 : f).strictNullHandling };
      }(t3);
      if ("" === e3 || null == e3)
        return n3.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      for (var r3 = "string" == typeof e3 ? function(e4, t4) {
        var n4, r4, i4, a4, s4 = {}, e4 = t4.ignoreQueryPrefix ? e4.replace(/^\?/, "") : e4, o4 = t4.parameterLimit === 1 / 0 ? void 0 : t4.parameterLimit, c2 = e4.split(t4.delimiter, o4), u2 = -1, l3 = t4.charset;
        if (t4.charsetSentinel)
          for (n4 = 0; n4 < c2.length; ++n4)
            0 === c2[n4].indexOf("utf8=") && (c2[n4] === qi ? l3 = "utf-8" : c2[n4] === Qi && (l3 = "iso-8859-1"), u2 = n4, n4 = c2.length);
        for (n4 = 0; n4 < c2.length; ++n4)
          n4 !== u2 && ((a4 = -1 === (a4 = -1 === (a4 = (r4 = c2[n4]).indexOf("]=")) ? r4.indexOf("=") : a4 + 1) ? (i4 = t4.decoder(r4, f.decoder, l3, "key"), t4.strictNullHandling ? null : "") : (i4 = t4.decoder(r4.slice(0, a4), f.decoder, l3, "key"), Ei.maybeMap(Bi(r4.slice(a4 + 1), t4), function(e5) {
            return t4.decoder(e5, f.decoder, l3, "value");
          }))) && t4.interpretNumericEntities && "iso-8859-1" === l3 && (a4 = $i(a4)), -1 < r4.indexOf("[]=") && (a4 = Ui(a4) ? [a4] : a4), Di.call(s4, i4) ? s4[i4] = Ei.combine(s4[i4], a4) : s4[i4] = a4);
        return s4;
      }(e3, n3) : e3, i3 = n3.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, a3 = Object.keys(r3), s3 = 0; s3 < a3.length; ++s3)
        var o3 = a3[s3], o3 = function(e4, t4, n4, r4) {
          if (e4) {
            var i4 = n4.allowDots ? e4.replace(/\.([^.[]+)/g, "[$1]") : e4, a4 = /(\[[^[\]]*])/g, s4 = 0 < n4.depth && /(\[[^[\]]*])/.exec(i4), e4 = s4 ? i4.slice(0, s4.index) : i4, o4 = [];
            if (e4) {
              if (!n4.plainObjects && Di.call(Object.prototype, e4) && !n4.allowPrototypes)
                return;
              o4.push(e4);
            }
            for (var c2 = 0; 0 < n4.depth && null !== (s4 = a4.exec(i4)) && c2 < n4.depth; ) {
              if (c2 += 1, !n4.plainObjects && Di.call(Object.prototype, s4[1].slice(1, -1)) && !n4.allowPrototypes)
                return;
              o4.push(s4[1]);
            }
            return s4 && o4.push("[" + i4.slice(s4.index) + "]"), Vi(o4, t4, n4, r4);
          }
        }(o3, r3[o3], n3, "string" == typeof e3), i3 = Ei.merge(i3, o3, n3);
      return Ei.compact(i3);
    }, stringify: function(e3, t3) {
      var n3 = e3, r3 = function(e4) {
        if (!e4)
          return I;
        if (null !== e4.encoder && void 0 !== e4.encoder && "function" != typeof e4.encoder)
          throw new TypeError("Encoder has to be a function.");
        var t4 = e4.charset || I.charset;
        if (void 0 !== e4.charset && "utf-8" !== e4.charset && "iso-8859-1" !== e4.charset)
          throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        var n4 = Ii.default;
        if (void 0 !== e4.format) {
          if (!ki.call(Ii.formatters, e4.format))
            throw new TypeError("Unknown format option provided.");
          n4 = e4.format;
        }
        var r4 = Ii.formatters[n4], i4 = I.filter;
        return "function" != typeof e4.filter && !Mi(e4.filter) || (i4 = e4.filter), { addQueryPrefix: ("boolean" == typeof e4.addQueryPrefix ? e4 : I).addQueryPrefix, allowDots: void 0 === e4.allowDots ? I.allowDots : !!e4.allowDots, charset: t4, charsetSentinel: ("boolean" == typeof e4.charsetSentinel ? e4 : I).charsetSentinel, delimiter: (void 0 === e4.delimiter ? I : e4).delimiter, encode: ("boolean" == typeof e4.encode ? e4 : I).encode, encoder: ("function" == typeof e4.encoder ? e4 : I).encoder, encodeValuesOnly: ("boolean" == typeof e4.encodeValuesOnly ? e4 : I).encodeValuesOnly, filter: i4, format: n4, formatter: r4, serializeDate: ("function" == typeof e4.serializeDate ? e4 : I).serializeDate, skipNulls: ("boolean" == typeof e4.skipNulls ? e4 : I).skipNulls, sort: "function" == typeof e4.sort ? e4.sort : null, strictNullHandling: ("boolean" == typeof e4.strictNullHandling ? e4 : I).strictNullHandling };
      }(t3), i3 = ("function" == typeof r3.filter ? n3 = (0, r3.filter)("", n3) : Mi(r3.filter) && (s3 = r3.filter), []);
      if ("object" != typeof n3 || null === n3)
        return "";
      var e3 = t3 && t3.arrayFormat in ji ? t3.arrayFormat : !(t3 && "indices" in t3) || t3.indices ? "indices" : "repeat", a3 = ji[e3], s3 = s3 || Object.keys(n3);
      r3.sort && s3.sort(r3.sort);
      for (var o3 = 0; o3 < s3.length; ++o3) {
        var c2 = s3[o3];
        r3.skipNulls && null === n3[c2] || Hi(i3, wi(n3[c2], c2, a3, r3.strictNullHandling, r3.skipNulls, r3.encode ? r3.encoder : null, r3.filter, r3.sort, r3.allowDots, r3.serializeDate, r3.format, r3.formatter, r3.encodeValuesOnly, r3.charset));
      }
      t3 = i3.join(r3.delimiter), e3 = true === r3.addQueryPrefix ? "?" : "";
      return r3.charsetSentinel && ("iso-8859-1" === r3.charset ? e3 += "utf8=%26%2310003%3B&" : e3 += "utf8=%E2%9C%93&"), 0 < t3.length ? e3 + t3 : "";
    } }, zi = function() {
      function l3(e3) {
        var n3 = this, t3 = e3.windowTitle, r3 = e3.writeDelay, r3 = void 0 === r3 ? 400 : r3, i3 = e3.createURL, a3 = e3.parseURL, s3 = e3.getLocation, o3 = e3.start, c2 = e3.dispose, u2 = e3.push, e3 = e3.cleanUrlOnDispose;
        W(this, l3), E(this, "$$type", "ais.browser"), E(this, "windowTitle", void 0), E(this, "writeDelay", void 0), E(this, "_createURL", void 0), E(this, "parseURL", void 0), E(this, "getLocation", void 0), E(this, "writeTimer", void 0), E(this, "_onPopState", void 0), E(this, "inPopState", false), E(this, "isDisposed", false), E(this, "latestAcknowledgedHistory", 0), E(this, "_start", void 0), E(this, "_dispose", void 0), E(this, "_push", void 0), E(this, "_cleanUrlOnDispose", void 0), this.windowTitle = t3, this.writeTimer = void 0, this.writeDelay = r3, this._createURL = i3, this.parseURL = a3, this.getLocation = s3, this._start = o3, this._dispose = c2, this._push = u2, this._cleanUrlOnDispose = void 0 === e3 || e3, rt(function(e4) {
          var e4 = e4.window, t4 = n3.windowTitle && n3.windowTitle(n3.read());
          Pi(t4), n3.latestAcknowledgedHistory = e4.history.length;
        });
      }
      return D(l3, [{ key: "read", value: function() {
        return this.parseURL({ qsModule: Ki, location: this.getLocation() });
      } }, { key: "write", value: function(i3) {
        var a3 = this;
        rt(function(e3) {
          var t3 = e3.window, n3 = a3.createURL(i3), r3 = a3.windowTitle && a3.windowTitle(i3);
          a3.writeTimer && clearTimeout(a3.writeTimer), a3.writeTimer = setTimeout(function() {
            Pi(r3), a3.shouldWrite(n3) && (a3._push ? a3._push(n3) : t3.history.pushState(i3, r3 || "", n3), a3.latestAcknowledgedHistory = t3.history.length), a3.inPopState = false, a3.writeTimer = void 0;
          }, a3.writeDelay);
        });
      } }, { key: "onUpdate", value: function(e3) {
        var t3 = this;
        this._start && this._start(function() {
          e3(t3.read());
        }), this._onPopState = function() {
          t3.writeTimer && (clearTimeout(t3.writeTimer), t3.writeTimer = void 0), t3.inPopState = true, e3(t3.read());
        }, rt(function(e4) {
          e4.window.addEventListener("popstate", t3._onPopState);
        });
      } }, { key: "createURL", value: function(e3) {
        return this._createURL({ qsModule: Ki, routeState: e3, location: this.getLocation() });
      } }, { key: "dispose", value: function() {
        var t3 = this;
        this._dispose && this._dispose(), this.isDisposed = true, rt(function(e3) {
          e3 = e3.window;
          t3._onPopState && e3.removeEventListener("popstate", t3._onPopState);
        }), this.writeTimer && clearTimeout(this.writeTimer), this._cleanUrlOnDispose && this.write({});
      } }, { key: "start", value: function() {
        this.isDisposed = false;
      } }, { key: "shouldWrite", value: function(n3) {
        var r3 = this;
        return rt(function(e3) {
          var e3 = e3.window, t3 = !(r3.isDisposed && r3.latestAcknowledgedHistory !== e3.history.length);
          return !r3.inPopState && t3 && n3 !== e3.location.href;
        });
      } }]), l3;
    }();
    function Ji() {
      var e3 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t3 = e3.createURL, n3 = e3.parseURL, r3 = e3.writeDelay, i3 = e3.windowTitle, a3 = e3.getLocation, s3 = e3.start, o3 = e3.dispose, c2 = e3.push, e3 = e3.cleanUrlOnDispose;
      return new zi({ createURL: void 0 === t3 ? function(e4) {
        var t4 = e4.qsModule, n4 = e4.routeState, e4 = e4.location, r4 = e4.protocol, i4 = e4.hostname, a4 = e4.port, a4 = void 0 === a4 ? "" : a4, s4 = e4.pathname, e4 = e4.hash, t4 = t4.stringify(n4), n4 = "" === a4 ? "" : ":".concat(a4);
        return (t4 ? "".concat(r4, "//").concat(i4).concat(n4).concat(s4, "?").concat(t4) : "".concat(r4, "//").concat(i4).concat(n4).concat(s4)).concat(e4);
      } : t3, parseURL: void 0 === n3 ? function(e4) {
        var t4 = e4.qsModule, e4 = e4.location;
        return t4.parse(e4.search.slice(1), { arrayLimit: 99 });
      } : n3, writeDelay: void 0 === r3 ? 400 : r3, windowTitle: i3, getLocation: void 0 === a3 ? function() {
        return rt(function(e4) {
          return e4.window.location;
        }, { fallback: function() {
          throw new Error("You need to provide `getLocation` to the `history` router in environments where `window` does not exist.");
        } });
      } : a3, start: s3, dispose: o3, push: c2, cleanUrlOnDispose: e3 });
    }
    var Zi = ["configure"];
    function Yi(e3) {
      e3.configure;
      return k(e3, Zi);
    }
    function Xi() {
      return { $$type: "ais.simple", stateToRoute: function(n3) {
        return Object.keys(n3).reduce(function(e3, t3) {
          return T(T({}, e3), {}, E({}, t3, Yi(n3[t3])));
        }, {});
      }, routeToState: function() {
        var n3 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
        return Object.keys(n3).reduce(function(e3, t3) {
          return T(T({}, e3), {}, E({}, t3, Yi(n3[t3])));
        }, {});
      } };
    }
    function Gi() {
      var e3 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t3 = e3.router, i3 = void 0 === t3 ? Ji() : t3, a3 = void 0 === (t3 = e3.stateMapping) ? Xi() : t3, s3 = void 0 !== (t3 = e3.$$internal) && t3;
      return function(e4) {
        var t4 = e4.instantSearchInstance;
        t4._createURL = function(n4) {
          var e5 = 0 === t4.mainIndex.getWidgets().length ? t4._initialUiState : t4.mainIndex.getWidgetUiState({}), e5 = Object.keys(n4).reduce(function(e6, t5) {
            return T(T({}, e6), {}, E({}, t5, n4[t5]));
          }, e5), e5 = a3.stateToRoute(e5);
          return i3.createURL(e5);
        };
        var n3 = void 0, r3 = t4._initialUiState;
        return { $$type: "ais.router({router:".concat(i3.$$type || "__unknown__", ", stateMapping:").concat(a3.$$type || "__unknown__", "})"), $$internal: s3, onStateChange: function(e5) {
          e5 = e5.uiState, e5 = a3.stateToRoute(e5);
          void 0 !== n3 && Oe(n3, e5) || (i3.write(e5), n3 = e5);
        }, subscribe: function() {
          t4._initialUiState = T(T({}, r3), a3.routeToState(i3.read())), i3.onUpdate(function(e5) {
            0 < t4.mainIndex.getWidgets().length && t4.setUiState(a3.routeToState(e5));
          });
        }, started: function() {
          var e5;
          null != (e5 = i3.start) && e5.call(i3);
        }, unsubscribe: function() {
          i3.dispose();
        } };
      };
    }
    var ea = ["initialSearchParameters"], ta = ["initialRecommendParameters"], na = l2({ name: "index-widget" });
    function ra(e3, t3) {
      var n3 = t3.state, r3 = t3.recommendState, i3 = t3.isPageReset, t3 = t3._uiState;
      n3 !== e3.state && (e3.state = n3, e3.emit("change", { state: e3.state, results: e3.lastResults, isPageReset: i3, _uiState: t3 })), r3 !== e3.recommendState && (e3.recommendState = r3);
    }
    function ia(e3, n3, t3) {
      return e3.reduce(function(e4, t4) {
        return !ge(t4) && (t4.getWidgetUiState || t4.getWidgetState) ? t4.getWidgetUiState ? t4.getWidgetUiState(e4, n3) : t4.getWidgetState(e4, n3) : e4;
      }, 2 < arguments.length && void 0 !== t3 ? t3 : {});
    }
    function aa(e3, t3) {
      var n3 = t3.initialSearchParameters, r3 = k(t3, ea);
      return e3.reduce(function(e4, t4) {
        return !t4.getWidgetSearchParameters || ge(t4) ? e4 : "search" === t4.dependsOn && t4.getWidgetParameters ? t4.getWidgetParameters(e4, r3) : t4.getWidgetSearchParameters(e4, r3);
      }, n3);
    }
    function sa(e3, t3) {
      var n3 = t3.initialRecommendParameters, r3 = k(t3, ta);
      return e3.reduce(function(e4, t4) {
        return !ge(t4) && "recommend" === t4.dependsOn && t4.getWidgetParameters ? t4.getWidgetParameters(e4, r3) : e4;
      }, n3);
    }
    function oa(e3) {
      if (void 0 === e3 || void 0 === e3.indexName)
        throw new Error(na("The `indexName` option is required."));
      var s3 = e3.indexName, o3 = void 0 === (e3 = e3.indexId) ? s3 : e3, c2 = [], u2 = {}, l3 = null, d2 = null, h2 = null, f2 = null, m2 = null;
      return { $$type: "ais.index", $$widgetType: "ais.index", getIndexName: function() {
        return s3;
      }, getIndexId: function() {
        return o3;
      }, getHelper: function() {
        return h2;
      }, getResults: function() {
        var e4;
        return null != (e4 = f2) && e4.lastResults ? (f2.lastResults._state = h2.state, f2.lastResults) : null;
      }, getPreviousState: function() {
        return m2;
      }, getScopedResults: function() {
        var e4 = this.getParent(), e4 = e4 ? e4.getWidgets() : 0 === s3.length ? this.getWidgets() : [this];
        return function n3(e5) {
          return e5.filter(ge).reduce(function(e6, t3) {
            return e6.concat.apply(e6, [{ indexId: t3.getIndexId(), results: t3.getResults(), helper: t3.getHelper() }].concat(w(n3(t3.getWidgets()))));
          }, []);
        }(e4);
      }, getParent: function() {
        return d2;
      }, createURL: function(e4) {
        return "function" == typeof e4 ? l3._createURL(E({}, o3, e4(u2))) : l3._createURL(E({}, o3, ia(c2, { searchParameters: e4, helper: h2 })));
      }, getWidgets: function() {
        return c2;
      }, addWidgets: function(e4) {
        var t3 = this;
        if (!Array.isArray(e4))
          throw new Error(na("The `addWidgets` method expects an array of widgets."));
        if (e4.some(function(e5) {
          return "function" != typeof e5.init && "function" != typeof e5.render;
        }))
          throw new Error(na("The widget definition expects a `render` and/or an `init` method."));
        return c2 = c2.concat(e4), l3 && Boolean(e4.length) && (ra(h2, { state: aa(c2, { uiState: u2, initialSearchParameters: h2.state }), recommendState: sa(c2, { uiState: u2, initialRecommendParameters: h2.recommendState }), _uiState: u2 }), e4.forEach(function(e5) {
          e5.getRenderState && ca({ renderState: e5.getRenderState(l3.renderState[t3.getIndexId()] || {}, et(l3, t3, l3._initialUiState)), instantSearchInstance: l3, parent: t3 });
        }), e4.forEach(function(e5) {
          e5.init && e5.init(et(l3, t3, l3._initialUiState));
        }), l3.scheduleSearch()), this;
      }, removeWidgets: function(t3) {
        var e4, n3 = this;
        if (!Array.isArray(t3))
          throw new Error(na("The `removeWidgets` method expects an array of widgets."));
        if (t3.some(function(e5) {
          return "function" != typeof e5.dispose;
        }))
          throw new Error(na("The widget definition expects a `dispose` method."));
        return c2 = c2.filter(function(e5) {
          return -1 === t3.indexOf(e5);
        }), l3 && Boolean(t3.length) && (e4 = t3.reduce(function(e5, t4) {
          return t4.dispose({ helper: h2, state: e5, parent: n3 }) || e5;
        }, h2.state), e4 = l3.future.preserveSharedStateOnUnmount ? aa(c2, { uiState: u2, initialSearchParameters: new g.SearchParameters({ index: this.getIndexName() }) }) : aa(c2, { uiState: ia(c2, { searchParameters: e4, helper: h2 }), initialSearchParameters: e4 }), u2 = ia(c2, { searchParameters: e4, helper: h2 }), h2.setState(e4), c2.length) && l3.scheduleSearch(), this;
      }, init: function(e4) {
        var i3, t3 = this, n3 = e4.instantSearchInstance, r3 = e4.parent, a3 = e4.uiState;
        null === h2 && (l3 = n3, d2 = r3, u2 = a3[o3] || {}, i3 = n3.mainHelper, e4 = aa(c2, { uiState: u2, initialSearchParameters: new g.SearchParameters({ index: s3 }) }), r3 = sa(c2, { uiState: u2, initialRecommendParameters: new g.RecommendParameters() }), (h2 = g({}, e4.index, e4)).recommendState = r3, h2.search = function() {
          return n3.onStateChange ? (n3.onStateChange({ uiState: n3.mainIndex.getWidgetUiState({}), setUiState: function(e5) {
            return n3.setUiState(e5, false);
          } }), i3) : i3.search();
        }, h2.searchWithoutTriggeringOnStateChange = function() {
          return i3.search();
        }, h2.searchForFacetValues = function(e5, t4, n4, r4) {
          r4 = h2.state.setQueryParameters(r4);
          return i3.searchForFacetValues(e5, t4, n4, r4);
        }, f2 = i3.derive(function() {
          return Ye.apply(void 0, [i3.state].concat(w(function(e5) {
            for (var t4 = e5.getParent(), n4 = [e5.getHelper().state]; null !== t4; )
              n4 = [t4.getHelper().state].concat(n4), t4 = t4.getParent();
            return n4;
          }(t3))));
        }, function() {
          return t3.getHelper().recommendState;
        }), (r3 = null == (e4 = n3._initialResults) ? void 0 : e4[this.getIndexId()]) && (e4 = new g.SearchResults(new g.SearchParameters(r3.state), r3.results), f2.lastResults = e4, h2.lastResults = e4), h2.on("change", function(e5) {
          e5.isPageReset && !function n4(e6) {
            e6 = e6.filter(ge);
            0 !== e6.length && e6.forEach(function(e7) {
              var t4 = e7.getHelper();
              ra(t4, { state: t4.state.resetPage(), recommendState: t4.recommendState, isPageReset: true }), n4(e7.getWidgets());
            });
          }(c2);
        }), f2.on("search", function() {
          n3.scheduleStalledRender();
        }), f2.on("result", function(e5) {
          e5 = e5.results;
          n3.scheduleRender(), h2.lastResults = e5, m2 = null == e5 ? void 0 : e5._state;
        }), f2.on("recommend:result", function(e5) {
          e5 = e5.recommend;
          n3.scheduleRender(), h2.lastRecommendResults = e5.results;
        }), c2.forEach(function(e5) {
          e5.getRenderState && ca({ renderState: e5.getRenderState(n3.renderState[t3.getIndexId()] || {}, et(n3, t3, a3)), instantSearchInstance: n3, parent: t3 });
        }), c2.forEach(function(e5) {
          e5.init && e5.init(et(n3, t3, a3));
        }), h2.on("change", function(e5) {
          var t4 = e5.state, e5 = e5._uiState;
          u2 = ia(c2, { searchParameters: t4, helper: h2 }, e5 || {}), n3.onStateChange || n3.onInternalStateChange();
        }), r3) && n3.scheduleRender();
      }, render: function(e4) {
        var t3 = this, n3 = e4.instantSearchInstance, e4 = ("error" === n3.status && !n3.mainHelper.hasPendingRequests() && m2 && h2.setState(m2), this.getResults() ? c2 : c2.filter(ge));
        (e4 = e4.filter(function(e5) {
          return !e5.shouldRender || e5.shouldRender({ instantSearchInstance: n3 });
        })).forEach(function(e5) {
          e5.getRenderState && ca({ renderState: e5.getRenderState(n3.renderState[t3.getIndexId()] || {}, tt(n3, t3)), instantSearchInstance: n3, parent: t3 });
        }), e4.forEach(function(e5) {
          e5.render && e5.render(tt(n3, t3));
        });
      }, dispose: function() {
        var e4, t3 = this;
        c2.forEach(function(e5) {
          e5.dispose && h2 && e5.dispose({ helper: h2, state: h2.state, parent: t3 });
        }), (d2 = l3 = null) != (e4 = h2) && e4.removeAllListeners(), (h2 = null) != (e4 = f2) && e4.detach(), f2 = null;
      }, getWidgetUiState: function(e4) {
        return c2.filter(ge).reduce(function(e5, t3) {
          return t3.getWidgetUiState(e5);
        }, T(T({}, e4), {}, E({}, o3, T(T({}, e4[o3]), u2))));
      }, getWidgetState: function(e4) {
        return this.getWidgetUiState(e4);
      }, getWidgetSearchParameters: function(e4, t3) {
        t3 = t3.uiState;
        return aa(c2, { uiState: t3, initialSearchParameters: e4 });
      }, refreshUiState: function() {
        u2 = ia(c2, { searchParameters: this.getHelper().state, helper: this.getHelper() }, u2);
      }, setIndexUiState: function(e4) {
        var t3 = "function" == typeof e4 ? e4(u2) : e4;
        l3.setUiState(function(e5) {
          return T(T({}, e5), {}, E({}, o3, t3));
        });
      } };
    }
    function ca(e3) {
      var t3 = e3.renderState, n3 = e3.instantSearchInstance, e3 = e3.parent, e3 = (e3 || n3.mainIndex).getIndexId();
      n3.renderState = T(T({}, n3.renderState), {}, E({}, e3, T(T({}, n3.renderState[e3]), t3)));
    }
    function ua(e3, t3) {
      return e3.toLocaleString(t3);
    }
    var la = l2({ name: "instantsearch" });
    function da() {
      return "#";
    }
    var ha = { preserveSharedStateOnUnmount: false, persistHierarchicalRootCount: false }, fa = function() {
      U(p2, Xn);
      var m2 = q(p2);
      function p2(e3) {
        W(this, p2), E(y(n3 = m2.call(this)), "client", void 0), E(y(n3), "indexName", void 0), E(y(n3), "insightsClient", void 0), E(y(n3), "onStateChange", null), E(y(n3), "future", void 0), E(y(n3), "helper", void 0), E(y(n3), "mainHelper", void 0), E(y(n3), "mainIndex", void 0), E(y(n3), "started", void 0), E(y(n3), "templatesConfig", void 0), E(y(n3), "renderState", {}), E(y(n3), "_stalledSearchDelay", void 0), E(y(n3), "_searchStalledTimer", void 0), E(y(n3), "_initialUiState", void 0), E(y(n3), "_initialResults", void 0), E(y(n3), "_createURL", void 0), E(y(n3), "_searchFunction", void 0), E(y(n3), "_mainHelperSearch", void 0), E(y(n3), "_insights", void 0), E(y(n3), "middleware", []), E(y(n3), "sendEventToInsights", void 0), E(y(n3), "status", "idle"), E(y(n3), "error", void 0), E(y(n3), "scheduleSearch", Re(function() {
          n3.started && n3.mainHelper.search();
        })), E(y(n3), "scheduleRender", Re(function() {
          var e4, t4 = !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0];
          null != (e4 = n3.mainHelper) && e4.hasPendingRequests() || (clearTimeout(n3._searchStalledTimer), n3._searchStalledTimer = null, t4 && (n3.status = "idle", n3.error = void 0)), n3.mainIndex.render({ instantSearchInstance: y(n3) }), n3.emit("render");
        })), E(y(n3), "onInternalStateChange", Re(function() {
          var t4 = n3.mainIndex.getWidgetUiState({});
          n3.middleware.forEach(function(e4) {
            e4.instance.onStateChange({ uiState: t4 });
          });
        })), n3.setMaxListeners(100);
        var n3, r3, t3 = e3.indexName, t3 = void 0 === t3 ? "" : t3, i3 = e3.numberLocale, a3 = e3.initialUiState, a3 = void 0 === a3 ? {} : a3, s3 = e3.routing, s3 = void 0 === s3 ? null : s3, o3 = e3.insights, o3 = void 0 === o3 ? void 0 : o3, c2 = e3.searchFunction, u2 = e3.stalledSearchDelay, u2 = void 0 === u2 ? 200 : u2, l3 = e3.searchClient, l3 = void 0 === l3 ? null : l3, d2 = e3.insightsClient, d2 = void 0 === d2 ? null : d2, h2 = e3.onStateChange, h2 = void 0 === h2 ? null : h2, f2 = e3.future, e3 = void 0 === f2 ? T(T({}, ha), e3.future || {}) : f2;
        if (null === l3)
          throw new Error(la("The `searchClient` option is required."));
        if ("function" != typeof l3.search)
          throw new Error("The `searchClient` must implement a `search` method.\n\nSee: https://www.algolia.com/doc/guides/building-search-ui/going-further/backend-search/in-depth/backend-instantsearch/js/");
        if ("function" == typeof l3.addAlgoliaAgent && l3.addAlgoliaAgent("instantsearch.js (".concat("4.68.1", ")")), d2 && "function" != typeof d2)
          throw new Error(la("The `insightsClient` option should be a function."));
        return n3.client = l3, n3.future = e3, n3.insightsClient = d2, n3.indexName = t3, n3.helper = null, n3.mainHelper = null, n3.mainIndex = oa({ indexName: t3 }), n3.onStateChange = h2, n3.started = false, n3.templatesConfig = { helpers: (r3 = { numberLocale: i3 }.numberLocale, { formatNumber: function(e4, t4) {
          return ua(Number(t4(e4)), r3);
        }, highlight: function(e4, t4) {
          try {
            return t4(ri(T(T({}, JSON.parse(e4)), {}, { hit: this })));
          } catch (e5) {
            throw new Error('\nThe highlight helper expects a JSON object of the format:\n{ "attribute": "name", "highlightedTagName": "mark" }');
          }
        }, reverseHighlight: function(e4, t4) {
          try {
            return t4(ai(T(T({}, JSON.parse(e4)), {}, { hit: this })));
          } catch (e5) {
            throw new Error('\n  The reverseHighlight helper expects a JSON object of the format:\n  { "attribute": "name", "highlightedTagName": "mark" }');
          }
        }, snippet: function(e4, t4) {
          try {
            return t4(oi(T(T({}, JSON.parse(e4)), {}, { hit: this })));
          } catch (e5) {
            throw new Error('\nThe snippet helper expects a JSON object of the format:\n{ "attribute": "name", "highlightedTagName": "mark" }');
          }
        }, reverseSnippet: function(e4, t4) {
          try {
            return t4(ui(T(T({}, JSON.parse(e4)), {}, { hit: this })));
          } catch (e5) {
            throw new Error('\n  The reverseSnippet helper expects a JSON object of the format:\n  { "attribute": "name", "highlightedTagName": "mark" }');
          }
        }, insights: function(e4, t4) {
          try {
            var n4 = JSON.parse(e4), r4 = n4.method, i4 = n4.payload;
            return t4(Zt(r4, T({ objectIDs: [this.objectID] }, i4)));
          } catch (e5) {
            throw new Error('\nThe insights helper expects a JSON object of the format:\n{ "method": "method-name", "payload": { "eventName": "name of the event" } }');
          }
        } }), compileOptions: {} }, n3._stalledSearchDelay = u2, n3._searchStalledTimer = null, n3._createURL = da, n3._initialUiState = a3, n3._initialResults = null, n3._insights = o3, c2 && (n3._searchFunction = c2), n3.sendEventToInsights = R, s3 && ((f2 = "boolean" == typeof s3 ? {} : s3).$$internal = true, n3.use(Gi(f2))), o3 && ((l3 = "boolean" == typeof o3 ? {} : o3).$$internal = true, n3.use(vi(l3))), Ri() && n3.use(Si({ $$internal: true })), n3;
      }
      return D(p2, [{ key: "_isSearchStalled", get: function() {
        return "stalled" === this.status;
      } }, { key: "use", value: function() {
        for (var n3 = this, e3 = arguments.length, t3 = new Array(e3), r3 = 0; r3 < e3; r3++)
          t3[r3] = arguments[r3];
        var i3 = t3.map(function(e4) {
          var t4 = T({ $$type: "__unknown__", $$internal: false, subscribe: R, started: R, unsubscribe: R, onStateChange: R }, e4({ instantSearchInstance: n3 }));
          return n3.middleware.push({ creator: e4, instance: t4 }), t4;
        });
        return this.started && i3.forEach(function(e4) {
          e4.subscribe(), e4.started();
        }), this;
      } }, { key: "unuse", value: function() {
        for (var e3 = arguments.length, t3 = new Array(e3), n3 = 0; n3 < e3; n3++)
          t3[n3] = arguments[n3];
        return this.middleware.filter(function(e4) {
          return t3.includes(e4.creator);
        }).forEach(function(e4) {
          return e4.instance.unsubscribe();
        }), this.middleware = this.middleware.filter(function(e4) {
          return !t3.includes(e4.creator);
        }), this;
      } }, { key: "EXPERIMENTAL_use", value: function() {
        return this.use.apply(this, arguments);
      } }, { key: "addWidget", value: function(e3) {
        return this.addWidgets([e3]);
      } }, { key: "addWidgets", value: function(e3) {
        if (!Array.isArray(e3))
          throw new Error(la("The `addWidgets` method expects an array of widgets. Please use `addWidget`."));
        if (e3.some(function(e4) {
          return "function" != typeof e4.init && "function" != typeof e4.render;
        }))
          throw new Error(la("The widget definition expects a `render` and/or an `init` method."));
        return this.mainIndex.addWidgets(e3), this;
      } }, { key: "removeWidget", value: function(e3) {
        return this.removeWidgets([e3]);
      } }, { key: "removeWidgets", value: function(e3) {
        if (!Array.isArray(e3))
          throw new Error(la("The `removeWidgets` method expects an array of widgets. Please use `removeWidget`."));
        if (e3.some(function(e4) {
          return "function" != typeof e4.dispose;
        }))
          throw new Error(la("The widget definition expects a `dispose` method."));
        return this.mainIndex.removeWidgets(e3), this;
      } }, { key: "start", value: function() {
        var r3 = this;
        if (this.started)
          throw new Error(la("The `start` method has already been called once."));
        var n3, e3, i3 = this.mainHelper || g(this.client, this.indexName, void 0, { persistHierarchicalRootCount: this.future.persistHierarchicalRootCount });
        i3.search = function() {
          return r3.status = "loading", r3.scheduleRender(false), i3.searchOnlyWithDerivedHelpers() && i3.recommend();
        }, this._searchFunction && (n3 = { search: function() {
          return new Promise(R);
        } }, this._mainHelperSearch = i3.search.bind(i3), i3.search = function() {
          var t3 = r3.mainIndex.getHelper(), e4 = g(n3, t3.state.index, t3.state);
          return e4.once("search", function(e5) {
            e5 = e5.state;
            t3.overrideStateWithoutTriggeringChangeEvent(e5), r3._mainHelperSearch();
          }), e4.on("change", function(e5) {
            e5 = e5.state;
            t3.setState(e5);
          }), r3._searchFunction(e4), i3;
        }), i3.on("error", function(e4) {
          var n4, e4 = e4.error;
          e4 instanceof Error || (n4 = e4, e4 = Object.keys(n4).reduce(function(e5, t3) {
            return e5[t3] = n4[t3], e5;
          }, new Error(n4.message))), e4.error = e4, r3.error = e4, r3.status = "error", r3.scheduleRender(false), r3.emit("error", e4);
        }), this.mainHelper = i3, this.middleware.forEach(function(e4) {
          e4.instance.subscribe();
        }), this.mainIndex.init({ instantSearchInstance: this, parent: null, uiState: this._initialUiState }), this._initialResults ? (je(this.client, this._initialResults), e3 = this.scheduleSearch, this.scheduleSearch = Re(R), Re(function() {
          r3.scheduleSearch = e3;
        })()) : 0 < this.mainIndex.getWidgets().length && this.scheduleSearch(), this.helper = this.mainIndex.getHelper(), this.started = true, this.middleware.forEach(function(e4) {
          e4.instance.started();
        }), void 0 === this._insights && i3.derivedHelpers[0].once("result", function() {
          r3.mainIndex.getScopedResults().some(function(e4) {
            e4 = e4.results;
            return null == e4 ? void 0 : e4._automaticInsights;
          }) && r3.use(vi({ $$internal: true, $$automatic: true }));
        });
      } }, { key: "dispose", value: function() {
        var e3;
        this.scheduleSearch.cancel(), this.scheduleRender.cancel(), clearTimeout(this._searchStalledTimer), this.removeWidgets(this.mainIndex.getWidgets()), this.mainIndex.dispose(), this.started = false, this.removeAllListeners(), null != (e3 = this.mainHelper) && e3.removeAllListeners(), this.mainHelper = null, this.helper = null, this.middleware.forEach(function(e4) {
          e4.instance.unsubscribe();
        });
      } }, { key: "scheduleStalledRender", value: function() {
        var e3 = this;
        this._searchStalledTimer || (this._searchStalledTimer = setTimeout(function() {
          e3.status = "stalled", e3.scheduleRender();
        }, this._stalledSearchDelay));
      } }, { key: "setUiState", value: function(e3) {
        var t3 = this, n3 = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
        if (!this.mainHelper)
          throw new Error(la("The `start` method needs to be called before `setUiState`."));
        this.mainIndex.refreshUiState();
        var r3 = "function" == typeof e3 ? e3(this.mainIndex.getWidgetUiState({})) : e3;
        this.onStateChange && n3 ? this.onStateChange({ uiState: r3, setUiState: function(e4) {
          ve("function" == typeof e4 ? e4(r3) : e4, t3.mainIndex), t3.scheduleSearch(), t3.onInternalStateChange();
        } }) : (ve(r3, this.mainIndex), this.scheduleSearch(), this.onInternalStateChange());
      } }, { key: "getUiState", value: function() {
        return this.started && this.mainIndex.refreshUiState(), this.mainIndex.getWidgetUiState({});
      } }, { key: "createURL", value: function() {
        if (this.started)
          return this._createURL(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {});
        throw new Error(la("The `start` method needs to be called before `createURL`."));
      } }, { key: "refresh", value: function() {
        if (!this.mainHelper)
          throw new Error(la("The `start` method needs to be called before `refresh`."));
        this.mainHelper.clearCache().search();
      } }]), p2;
    }(), en = Object.freeze({ __proto__: null, history: Ji }), ma = ["configure"];
    function pa(e3) {
      e3.configure;
      return k(e3, ma);
    }
    ln = Object.freeze({ __proto__: null, simple: Xi, singleIndex: function(t3) {
      return { $$type: "ais.singleIndex", stateToRoute: function(e3) {
        return pa(e3[t3] || {});
      }, routeToState: function() {
        return E({}, t3, pa(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}));
      } };
    } }), ir = Object.freeze({ __proto__: null, createInsightsMiddleware: vi, createRouterMiddleware: Gi, isMetadataEnabled: Ri, createMetadataMiddleware: Si });
    function ga(e3) {
      return e3 && e3.__esModule && Object.prototype.hasOwnProperty.call(e3, "default") ? e3.default : e3;
    }
    function va(e3, t3) {
      return e3(t3 = { exports: {} }, t3.exports), t3.exports;
    }
    var ya = ga(va(function(e3) {
      function t3() {
        return e3.exports = t3 = Object.assign ? Object.assign.bind() : function(e4) {
          for (var t4 = 1; t4 < arguments.length; t4++) {
            var n3, r3 = arguments[t4];
            for (n3 in r3)
              Object.prototype.hasOwnProperty.call(r3, n3) && (e4[n3] = r3[n3]);
          }
          return e4;
        }, e3.exports.__esModule = true, e3.exports.default = e3.exports, t3.apply(this, arguments);
      }
      e3.exports = t3, e3.exports.__esModule = true, e3.exports.default = e3.exports;
    })), ba = va(function(e3) {
      e3.exports = function(e4, t3) {
        if (null == e4)
          return {};
        for (var n3, r3 = {}, i3 = Object.keys(e4), a3 = 0; a3 < i3.length; a3++)
          n3 = i3[a3], 0 <= t3.indexOf(n3) || (r3[n3] = e4[n3]);
        return r3;
      }, e3.exports.__esModule = true, e3.exports.default = e3.exports;
    }), e2 = (ga(ba), va(function(e3) {
      e3.exports = function(e4, t3) {
        if (null == e4)
          return {};
        var n3, r3 = ba(e4, t3);
        if (Object.getOwnPropertySymbols)
          for (var i3 = Object.getOwnPropertySymbols(e4), a3 = 0; a3 < i3.length; a3++)
            n3 = i3[a3], 0 <= t3.indexOf(n3) || Object.prototype.propertyIsEnumerable.call(e4, n3) && (r3[n3] = e4[n3]);
        return r3;
      }, e3.exports.__esModule = true, e3.exports.default = e3.exports;
    })), Ra = ga(e2);
    function F() {
      for (var e3 = arguments.length, t3 = new Array(e3), n3 = 0; n3 < e3; n3++)
        t3[n3] = arguments[n3];
      return t3.reduce(function(e4, t4) {
        return Array.isArray(t4) ? e4.concat(t4) : e4.concat([t4]);
      }, []).filter(Boolean).join(" ");
    }
    var Sa = ["parts", "highlightedTagName", "nonHighlightedTagName", "separator", "className", "classNames"];
    var _a = ["classNames", "hits", "itemComponent", "sendEvent", "emptyComponent", "banner", "bannerComponent"];
    function O(e3) {
      var t3 = e3.defaultTemplates, n3 = e3.templates;
      return T({ templatesConfig: e3.templatesConfig }, function(a3, e4) {
        var s3 = 1 < arguments.length && void 0 !== e4 ? e4 : {};
        return Ae([].concat(w(Object.keys(a3 || {})), w(Object.keys(s3)))).reduce(function(e5, t4) {
          var n4 = a3 ? a3[t4] : void 0, r3 = s3[t4], i3 = void 0 !== r3 && r3 !== n4;
          return e5.templates[t4] = i3 ? r3 : n4, e5.useCustomCompileOptions[t4] = i3, e5;
        }, { templates: {}, useCustomCompileOptions: {} });
      }(t3, n3));
    }
    var e2 = va(function(e3, t3) {
      function b2(e4) {
        return e4.trim ? e4.trim() : e4.replace(/^\s*|\s*$/g, "");
      }
      function R2(e4, t4, n4) {
        if (t4.charAt(n4) == e4.charAt(0)) {
          for (var r4 = 1, i4 = e4.length; r4 < i4; r4++)
            if (t4.charAt(n4 + r4) != e4.charAt(r4))
              return;
          return 1;
        }
      }
      function c2(e4, t4, n4, r4) {
        for (var i4 = [], a4 = null, s4 = null, o4 = n4[n4.length - 1]; 0 < e4.length; ) {
          if (s4 = e4.shift(), o4 && "<" == o4.tag && !(s4.tag in p2))
            throw new Error("Illegal content in < super tag.");
          if (S2.tags[s4.tag] <= S2.tags.$ || function(e5, t5) {
            for (var n5 = 0, r5 = t5.length; n5 < r5; n5++)
              if (t5[n5].o == e5.n)
                return e5.tag = "#";
          }(s4, r4))
            n4.push(s4), s4.nodes = c2(e4, s4.tag, n4, r4);
          else {
            if ("/" == s4.tag) {
              if (0 === n4.length)
                throw new Error("Closing tag without opener: /" + s4.n);
              if (a4 = n4.pop(), s4.n == a4.n || function(e5, t5, n5) {
                for (var r5 = 0, i5 = n5.length; r5 < i5; r5++)
                  if (n5[r5].c == e5 && n5[r5].o == t5)
                    return 1;
              }(s4.n, a4.n, r4))
                return a4.end = s4.i, i4;
              throw new Error("Nesting error: " + a4.n + " vs. " + s4.n);
            }
            "\n" == s4.tag && (s4.last = 0 == e4.length || "\n" == e4[0].tag);
          }
          i4.push(s4);
        }
        if (0 < n4.length)
          throw new Error("missing closing tag: " + n4.pop().n);
        return i4;
      }
      function r3(e4) {
        var t4, n4 = [];
        for (t4 in e4.partials)
          n4.push('"' + i3(t4) + '":{name:"' + i3(e4.partials[t4].name) + '", ' + r3(e4.partials[t4]) + "}");
        return "partials: {" + n4.join(",") + "}, subs: " + function(e5) {
          var t5, n5 = [];
          for (t5 in e5)
            n5.push('"' + i3(t5) + '": function(c,p,t,i) {' + e5[t5] + "}");
          return "{ " + n5.join(",") + " }";
        }(e4.subs);
      }
      function i3(e4) {
        return e4.replace(h2, "\\\\").replace(u2, '\\"').replace(l3, "\\n").replace(d2, "\\r").replace(f2, "\\u2028").replace(m2, "\\u2029");
      }
      function n3(e4) {
        return ~e4.indexOf(".") ? "d" : "f";
      }
      function a3(e4, t4) {
        var n4 = "<" + (t4.prefix || "") + e4.n + g2++;
        return t4.partials[n4] = { name: e4.n, partials: {} }, t4.code += 't.b(t.rp("' + i3(n4) + '",c,p,"' + (e4.indent || "") + '"));', n4;
      }
      function s3(e4, t4) {
        t4.code += "t.b(t.t(t." + n3(e4.n) + '("' + i3(e4.n) + '",c,p,0)));';
      }
      function o3(e4) {
        return "t.b(" + e4 + ");";
      }
      var S2, _2, u2, l3, d2, h2, f2, m2, p2, g2;
      _2 = /\S/, u2 = /\"/g, l3 = /\n/g, d2 = /\r/g, h2 = /\\/g, f2 = /\u2028/, m2 = /\u2029/, (S2 = t3).tags = { "#": 1, "^": 2, "<": 3, $: 4, "/": 5, "!": 6, ">": 7, "=": 8, _v: 9, "{": 10, "&": 11, _t: 12 }, S2.scan = function(e4, t4) {
        var n4, r4, i4, a4, s4, o4 = e4.length, c3 = 0, u3 = null, l4 = "", d3 = [], h3 = false, f3 = 0, m3 = 0, p3 = "{{", g3 = "}}";
        function v2() {
          0 < l4.length && (d3.push({ tag: "_t", text: new String(l4) }), l4 = "");
        }
        function y2(e5, t5) {
          if (v2(), e5 && function() {
            for (var e6 = true, t6 = m3; t6 < d3.length; t6++)
              if (!(e6 = S2.tags[d3[t6].tag] < S2.tags._v || "_t" == d3[t6].tag && null === d3[t6].text.match(_2)))
                return;
            return e6;
          }())
            for (var n5, r5 = m3; r5 < d3.length; r5++)
              d3[r5].text && ((n5 = d3[r5 + 1]) && ">" == n5.tag && (n5.indent = d3[r5].text.toString()), d3.splice(r5, 1));
          else
            t5 || d3.push({ tag: "\n" });
          h3 = false, m3 = d3.length;
        }
        for (t4 && (t4 = t4.split(" "), p3 = t4[0], g3 = t4[1]), f3 = 0; f3 < o4; f3++)
          0 == c3 ? R2(p3, e4, f3) ? (--f3, v2(), c3 = 1) : "\n" == e4.charAt(f3) ? y2(h3) : l4 += e4.charAt(f3) : 1 == c3 ? (f3 += p3.length - 1, c3 = "=" == (u3 = (n4 = S2.tags[e4.charAt(f3 + 1)]) ? e4.charAt(f3 + 1) : "_v") ? (i4 = f3, s4 = a4 = void 0, a4 = "=" + g3, s4 = (r4 = e4).indexOf(a4, i4), r4 = b2(r4.substring(r4.indexOf("=", i4) + 1, s4)).split(" "), p3 = r4[0], g3 = r4[r4.length - 1], f3 = s4 + a4.length - 1, 0) : (n4 && f3++, 2), h3 = f3) : R2(g3, e4, f3) ? (d3.push({ tag: u3, n: b2(l4), otag: p3, ctag: g3, i: "/" == u3 ? h3 - p3.length : f3 + g3.length }), l4 = "", f3 += g3.length - 1, c3 = 0, "{" == u3 && ("}}" == g3 ? f3++ : "}" === (i4 = d3[d3.length - 1]).n.substr(i4.n.length - 1) && (i4.n = i4.n.substring(0, i4.n.length - 1)))) : l4 += e4.charAt(f3);
        return y2(h3, true), d3;
      }, p2 = { _t: true, "\n": true, $: true, "/": true }, S2.stringify = function(e4, t4, n4) {
        return "{code: function (c,p,i) { " + S2.wrapMain(e4.code) + " }," + r3(e4) + "}";
      }, g2 = 0, S2.generate = function(e4, t4, n4) {
        g2 = 0;
        var r4 = { code: "", subs: {}, partials: {} };
        return S2.walk(e4, r4), n4.asString ? this.stringify(r4, t4, n4) : this.makeTemplate(r4, t4, n4);
      }, S2.wrapMain = function(e4) {
        return 'var t=this;t.b(i=i||"");' + e4 + "return t.fl();";
      }, S2.template = S2.Template, S2.makeTemplate = function(e4, t4, n4) {
        var r4 = this.makePartials(e4);
        return r4.code = new Function("c", "p", "i", this.wrapMain(e4.code)), new this.template(r4, t4, this, n4);
      }, S2.makePartials = function(e4) {
        var t4, n4 = { subs: {}, partials: e4.partials, name: e4.name };
        for (t4 in n4.partials)
          n4.partials[t4] = this.makePartials(n4.partials[t4]);
        for (t4 in e4.subs)
          n4.subs[t4] = new Function("c", "p", "t", "i", e4.subs[t4]);
        return n4;
      }, S2.codegen = { "#": function(e4, t4) {
        t4.code += "if(t.s(t." + n3(e4.n) + '("' + i3(e4.n) + '",c,p,1),c,p,0,' + e4.i + "," + e4.end + ',"' + e4.otag + " " + e4.ctag + '")){t.rs(c,p,function(c,p,t){', S2.walk(e4.nodes, t4), t4.code += "});c.pop();}";
      }, "^": function(e4, t4) {
        t4.code += "if(!t.s(t." + n3(e4.n) + '("' + i3(e4.n) + '",c,p,1),c,p,1,0,0,"")){', S2.walk(e4.nodes, t4), t4.code += "};";
      }, ">": a3, "<": function(e4, t4) {
        var n4 = { partials: {}, code: "", subs: {}, inPartial: true }, e4 = (S2.walk(e4.nodes, n4), t4.partials[a3(e4, t4)]);
        e4.subs = n4.subs, e4.partials = n4.partials;
      }, $: function(e4, t4) {
        var n4 = { subs: {}, code: "", partials: t4.partials, prefix: e4.n };
        S2.walk(e4.nodes, n4), t4.subs[e4.n] = n4.code, t4.inPartial || (t4.code += 't.sub("' + i3(e4.n) + '",c,p,i);');
      }, "\n": function(e4, t4) {
        t4.code += o3('"\\n"' + (e4.last ? "" : " + i"));
      }, _v: function(e4, t4) {
        t4.code += "t.b(t.v(t." + n3(e4.n) + '("' + i3(e4.n) + '",c,p,0)));';
      }, _t: function(e4, t4) {
        t4.code += o3('"' + i3(e4.text) + '"');
      }, "{": s3, "&": s3 }, S2.walk = function(e4, t4) {
        for (var n4, r4 = 0, i4 = e4.length; r4 < i4; r4++)
          (n4 = S2.codegen[e4[r4].tag]) && n4(e4[r4], t4);
        return t4;
      }, S2.parse = function(e4, t4, n4) {
        return c2(e4, 0, [], (n4 = n4 || {}).sectionTags || []);
      }, S2.cache = {}, S2.cacheKey = function(e4, t4) {
        return [e4, !!t4.asString, !!t4.disableLambda, t4.delimiters, !!t4.modelGet].join("||");
      }, S2.compile = function(e4, t4) {
        var n4 = S2.cacheKey(e4, t4 = t4 || {}), r4 = this.cache[n4];
        if (r4) {
          var i4, a4 = r4.partials;
          for (i4 in a4)
            delete a4[i4].instance;
          return r4;
        }
        return r4 = this.generate(this.parse(this.scan(e4, t4.delimiters), e4, t4), e4, t4), this.cache[n4] = r4;
      };
    }), wa = va(function(e3, t3) {
      function l3(e4, t4, n4) {
        var r4;
        return t4 && "object" == typeof t4 && (void 0 !== t4[e4] ? r4 = t4[e4] : n4 && t4.get && "function" == typeof t4.get && (r4 = t4.get(e4))), r4;
      }
      function s3(e4) {
        return String(null == e4 ? "" : e4);
      }
      var n3, r3, i3, a3, o3, c2, d2;
      (t3 = t3).Template = function(e4, t4, n4, r4) {
        this.r = (e4 = e4 || {}).code || this.r, this.c = n4, this.options = r4 || {}, this.text = t4 || "", this.partials = e4.partials || {}, this.subs = e4.subs || {}, this.buf = "";
      }, t3.Template.prototype = { r: function(e4, t4, n4) {
        return "";
      }, v: function(e4) {
        return e4 = s3(e4), c2.test(e4) ? e4.replace(n3, "&amp;").replace(r3, "&lt;").replace(i3, "&gt;").replace(a3, "&#39;").replace(o3, "&quot;") : e4;
      }, t: s3, render: function(e4, t4, n4) {
        return this.ri([e4], t4 || {}, n4);
      }, ri: function(e4, t4, n4) {
        return this.r(e4, t4, n4);
      }, ep: function(e4, t4) {
        var n4 = this.partials[e4], r4 = t4[n4.name];
        if (n4.instance && n4.base == r4)
          return n4.instance;
        if ("string" == typeof r4) {
          if (!this.c)
            throw new Error("No compiler available.");
          r4 = this.c.compile(r4, this.options);
        }
        if (!r4)
          return null;
        if (this.partials[e4].base = r4, n4.subs) {
          for (key in t4.stackText || (t4.stackText = {}), n4.subs)
            t4.stackText[key] || (t4.stackText[key] = void 0 !== this.activeSub && t4.stackText[this.activeSub] ? t4.stackText[this.activeSub] : this.text);
          r4 = function(e5, t5, n5, r5, i4, a4) {
            function s4() {
            }
            function o4() {
            }
            o4.prototype = (s4.prototype = e5).subs;
            var c3, u2 = new s4();
            for (c3 in u2.subs = new o4(), u2.subsText = {}, u2.buf = "", r5 = r5 || {}, u2.stackSubs = r5, u2.subsText = a4, t5)
              r5[c3] || (r5[c3] = t5[c3]);
            for (c3 in r5)
              u2.subs[c3] = r5[c3];
            for (c3 in i4 = i4 || {}, u2.stackPartials = i4, n5)
              i4[c3] || (i4[c3] = n5[c3]);
            for (c3 in i4)
              u2.partials[c3] = i4[c3];
            return u2;
          }(r4, n4.subs, n4.partials, this.stackSubs, this.stackPartials, t4.stackText);
        }
        return this.partials[e4].instance = r4;
      }, rp: function(e4, t4, n4, r4) {
        e4 = this.ep(e4, n4);
        return e4 ? e4.ri(t4, n4, r4) : "";
      }, rs: function(e4, t4, n4) {
        var r4 = e4[e4.length - 1];
        if (d2(r4))
          for (var i4 = 0; i4 < r4.length; i4++)
            e4.push(r4[i4]), n4(e4, t4, this), e4.pop();
        else
          n4(e4, t4, this);
      }, s: function(e4, t4, n4, r4, i4, a4, s4) {
        return (!d2(e4) || 0 !== e4.length) && (n4 = !!(e4 = "function" == typeof e4 ? this.ms(e4, t4, n4, r4, i4, a4, s4) : e4), !r4 && n4 && t4 && t4.push("object" == typeof e4 ? e4 : t4[t4.length - 1]), n4);
      }, d: function(e4, t4, n4, r4) {
        var i4, a4 = e4.split("."), s4 = this.f(a4[0], t4, n4, r4), o4 = this.options.modelGet, c3 = null;
        if ("." === e4 && d2(t4[t4.length - 2]))
          s4 = t4[t4.length - 1];
        else
          for (var u2 = 1; u2 < a4.length; u2++)
            s4 = void 0 !== (i4 = l3(a4[u2], s4, o4)) ? (c3 = s4, i4) : "";
        return !(r4 && !s4) && (r4 || "function" != typeof s4 || (t4.push(c3), s4 = this.mv(s4, t4, n4), t4.pop()), s4);
      }, f: function(e4, t4, n4, r4) {
        for (var i4 = false, a4 = false, s4 = this.options.modelGet, o4 = t4.length - 1; 0 <= o4; o4--)
          if (void 0 !== (i4 = l3(e4, t4[o4], s4))) {
            a4 = true;
            break;
          }
        return a4 ? r4 || "function" != typeof i4 ? i4 : this.mv(i4, t4, n4) : !r4 && "";
      }, ls: function(e4, t4, n4, r4, i4) {
        var a4 = this.options.delimiters;
        return this.options.delimiters = i4, this.b(this.ct(s3(e4.call(t4, r4)), t4, n4)), this.options.delimiters = a4, false;
      }, ct: function(e4, t4, n4) {
        if (this.options.disableLambda)
          throw new Error("Lambda features disabled.");
        return this.c.compile(e4, this.options).render(t4, n4);
      }, b: function(e4) {
        this.buf += e4;
      }, fl: function() {
        var e4 = this.buf;
        return this.buf = "", e4;
      }, ms: function(e4, t4, n4, r4, i4, a4, s4) {
        t4 = t4[t4.length - 1], e4 = e4.call(t4);
        return "function" == typeof e4 ? !!r4 || (r4 = this.activeSub && this.subsText && this.subsText[this.activeSub] ? this.subsText[this.activeSub] : this.text, this.ls(e4, t4, n4, r4.substring(i4, a4), s4)) : e4;
      }, mv: function(e4, t4, n4) {
        t4 = t4[t4.length - 1], e4 = e4.call(t4);
        return "function" == typeof e4 ? this.ct(s3(e4.call(t4)), t4, n4) : e4;
      }, sub: function(e4, t4, n4, r4) {
        var i4 = this.subs[e4];
        i4 && (this.activeSub = e4, i4(t4, n4, this, r4), this.activeSub = false);
      } }, n3 = /&/g, r3 = /</g, i3 = />/g, a3 = /\'/g, o3 = /\"/g, c2 = /[&<>\"\']/, d2 = Array.isArray || function(e4) {
        return "[object Array]" === Object.prototype.toString.call(e4);
      };
    }), Pa = (e2.Template = wa.Template, e2.template = e2.Template, e2), Na = function(e3, t3, n3, r3) {
      t3[0] = 0;
      for (var i3 = 1; i3 < t3.length; i3++) {
        var a3 = t3[i3++], s3 = t3[i3] ? (t3[0] |= a3 ? 1 : 2, n3[t3[i3++]]) : t3[++i3];
        3 === a3 ? r3[0] = s3 : 4 === a3 ? r3[1] = Object.assign(r3[1] || {}, s3) : 5 === a3 ? (r3[1] = r3[1] || {})[t3[++i3]] = s3 : 6 === a3 ? r3[1][t3[++i3]] += s3 + "" : a3 ? (a3 = e3.apply(s3, Na(e3, s3, n3, ["", null])), r3.push(a3), s3[0] ? t3[0] |= 2 : (t3[i3 - 2] = 0, t3[i3] = a3)) : r3.push(s3);
      }
      return r3;
    }, xa = /* @__PURE__ */ new Map();
    var Ia, Fa, Ca, Ta = (function(e3) {
      var t3 = xa.get(this);
      return t3 || (t3 = /* @__PURE__ */ new Map(), xa.set(this, t3)), 1 < (t3 = Na(this, t3.get(e3) || (t3.set(e3, t3 = function(e4) {
        for (var t4, n3, r3 = 1, i3 = "", a3 = "", s3 = [0], o3 = function(e5) {
          1 === r3 && (e5 || (i3 = i3.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? s3.push(0, e5, i3) : 3 === r3 && (e5 || i3) ? (s3.push(3, e5, i3), r3 = 2) : 2 === r3 && "..." === i3 && e5 ? s3.push(4, e5, 0) : 2 === r3 && i3 && !e5 ? s3.push(5, 0, true, i3) : 5 <= r3 && ((i3 || !e5 && 5 === r3) && (s3.push(r3, 0, i3, n3), r3 = 6), e5) && (s3.push(r3, e5, 0, n3), r3 = 6), i3 = "";
        }, c2 = 0; c2 < e4.length; c2++) {
          c2 && (1 === r3 && o3(), o3(c2));
          for (var u2 = 0; u2 < e4[c2].length; u2++)
            t4 = e4[c2][u2], 1 === r3 ? "<" === t4 ? (o3(), s3 = [s3], r3 = 3) : i3 += t4 : 4 === r3 ? i3 = "--" === i3 && ">" === t4 ? (r3 = 1, "") : t4 + i3[0] : a3 ? t4 === a3 ? a3 = "" : i3 += t4 : '"' === t4 || "'" === t4 ? a3 = t4 : ">" === t4 ? (o3(), r3 = 1) : r3 && ("=" === t4 ? (r3 = 5, n3 = i3, i3 = "") : "/" === t4 && (r3 < 5 || ">" === e4[c2][u2 + 1]) ? (o3(), 3 === r3 && (s3 = s3[0]), (s3 = (r3 = s3)[0]).push(2, 0, r3), r3 = 0) : " " === t4 || "	" === t4 || "\n" === t4 || "\r" === t4 ? (o3(), r3 = 2) : i3 += t4), 3 === r3 && "!--" === i3 && (r3 = 4, s3 = s3[0]);
        }
        return o3(), s3;
      }(e3)), t3), arguments, [])).length ? t3 : t3[0];
    }).bind(M), Ea = (Fa = (wa = { createElement: M, Fragment: x }).createElement, Ca = wa.Fragment, Ia = { createElement: Fa, Fragment: Ca }.createElement, function(e3) {
      var r3 = e3.parts, t3 = e3.highlightedTagName, i3 = void 0 === t3 ? "mark" : t3, t3 = e3.nonHighlightedTagName, a3 = void 0 === t3 ? "span" : t3, t3 = e3.separator, s3 = void 0 === t3 ? ", " : t3, t3 = e3.className, n3 = e3.classNames, o3 = void 0 === n3 ? {} : n3, n3 = Ra(e3, Sa);
      return Fa("span", ya({}, n3, { className: F(o3.root, t3) }), r3.map(function(e4, t4) {
        var n4 = t4 === r3.length - 1;
        return Fa(Ca, { key: t4 }, e4.map(function(e5, t5) {
          return Fa(ka, { key: t5, classNames: o3, highlightedTagName: i3, nonHighlightedTagName: a3, isHighlighted: e5.isHighlighted }, e5.value);
        }), !n4 && Fa("span", { className: o3.separator }, s3));
      }));
    });
    function ka(e3) {
      var t3 = e3.classNames, n3 = e3.children, r3 = e3.highlightedTagName, i3 = e3.isHighlighted, e3 = e3.nonHighlightedTagName;
      return Ia(i3 ? r3 : e3, { className: i3 ? t3.highlighted : t3.nonHighlighted }, n3);
    }
    var ja = ["classNames"];
    function Ma(e3) {
      var t3 = e3.classNames, t3 = void 0 === t3 ? {} : t3, e3 = k(e3, ja);
      return M(Ea, m({ classNames: { root: F("ais-Highlight", t3.root), highlighted: F("ais-Highlight-highlighted", t3.highlighted), nonHighlighted: F("ais-Highlight-nonHighlighted", t3.nonHighlighted), separator: F("ais-Highlight-separator", t3.separator) } }, e3));
    }
    var La = ["hit", "attribute", "cssClasses"];
    function Oa(e3) {
      var t3 = e3.hit, n3 = e3.attribute, r3 = e3.cssClasses;
      return M(Ma, m({}, k(e3, La), { parts: it(Ie(t3._highlightResult, n3) || []).map(function(e4) {
        return Ne(re(e4.value || ""));
      }), classNames: r3 }));
    }
    var Ha = ["classNames"];
    function Aa(e3) {
      var t3 = e3.classNames, t3 = void 0 === t3 ? {} : t3, e3 = k(e3, Ha);
      return M(Ea, m({ classNames: { root: F("ais-ReverseHighlight", t3.root), highlighted: F("ais-ReverseHighlight-highlighted", t3.highlighted), nonHighlighted: F("ais-ReverseHighlight-nonHighlighted", t3.nonHighlighted), separator: F("ais-ReverseHighlight-separator", t3.separator) } }, e3));
    }
    var Wa = ["hit", "attribute", "cssClasses"], Da = ["isHighlighted"];
    function Ua(e3) {
      var t3 = e3.hit, n3 = e3.attribute, r3 = e3.cssClasses;
      return M(Aa, m({}, k(e3, Wa), { parts: it(Ie(t3._highlightResult, n3) || []).map(function(e4) {
        return Ne(re(e4.value || "")).map(function(e5) {
          var t4 = e5.isHighlighted;
          return T(T({}, k(e5, Da)), {}, { isHighlighted: !t4 });
        });
      }), classNames: r3 }));
    }
    var $a = ["classNames"];
    function Ba(e3) {
      var t3 = e3.classNames, t3 = void 0 === t3 ? {} : t3, e3 = k(e3, $a);
      return M(Ea, m({ classNames: { root: F("ais-ReverseSnippet", t3.root), highlighted: F("ais-ReverseSnippet-highlighted", t3.highlighted), nonHighlighted: F("ais-ReverseSnippet-nonHighlighted", t3.nonHighlighted), separator: F("ais-ReverseSnippet-separator", t3.separator) } }, e3));
    }
    var Qa = ["hit", "attribute", "cssClasses"], qa = ["isHighlighted"];
    function Va(e3) {
      var t3 = e3.hit, n3 = e3.attribute, r3 = e3.cssClasses;
      return M(Ba, m({}, k(e3, Qa), { parts: it(Ie(t3._snippetResult, n3) || []).map(function(e4) {
        return Ne(re(e4.value || "")).map(function(e5) {
          var t4 = e5.isHighlighted;
          return T(T({}, k(e5, qa)), {}, { isHighlighted: !t4 });
        });
      }), classNames: r3 }));
    }
    var Ka = ["classNames"];
    function za(e3) {
      var t3 = e3.classNames, t3 = void 0 === t3 ? {} : t3, e3 = k(e3, Ka);
      return M(Ea, m({ classNames: { root: F("ais-Snippet", t3.root), highlighted: F("ais-Snippet-highlighted", t3.highlighted), nonHighlighted: F("ais-Snippet-nonHighlighted", t3.nonHighlighted), separator: F("ais-Snippet-separator", t3.separator) } }, e3));
    }
    var Ja = ["hit", "attribute", "cssClasses"];
    function Za(e3) {
      var t3 = e3.hit, n3 = e3.attribute, r3 = e3.cssClasses;
      return M(za, m({}, k(e3, Ja), { parts: it(Ie(t3._snippetResult, n3) || []).map(function(e4) {
        return Ne(re(e4.value || ""));
      }), classNames: r3 }));
    }
    function Ya(e3) {
      var t3 = e3.templates, n3 = e3.templateKey, r3 = e3.compileOptions, i3 = e3.helpers, a3 = e3.data, s3 = e3.bindEvent, e3 = e3.sendEvent, t3 = t3[n3];
      if ("string" != typeof t3 && "function" != typeof t3)
        throw new Error("Template must be 'string' or 'function', was '".concat(A(t3), "' (key: ").concat(n3, ")"));
      return "function" == typeof t3 ? ((n3 = s3 || {}).html = Ta, n3.sendEvent = e3, n3.components = { Highlight: Oa, ReverseHighlight: Ua, Snippet: Za, ReverseSnippet: Va }, t3(a3, n3)) : (s3 = function(e4, t4, n4) {
        var r4 = 0 < arguments.length && void 0 !== e4 ? e4 : {}, i4 = 1 < arguments.length ? t4 : void 0, a4 = 2 < arguments.length ? n4 : void 0;
        return Object.keys(r4).reduce(function(e5, n5) {
          return T(T({}, e5), {}, E({}, n5, function() {
            var t5 = this;
            return function(e6) {
              return r4[n5].call(a4, e6, function(e7) {
                return Pa.compile(e7, i4).render(t5);
              });
            };
          }));
        }, {});
      }(i3, r3, a3), Pa.compile(t3, r3).render(T(T({}, a3), {}, { helpers: s3 })).replace(/[ \n\r\t\f\xA0]+/g, function(e4) {
        return e4.replace(/(^|\xA0+)[^\xA0]+/g, "$1 ");
      }).trim());
    }
    var Xa = function() {
      U(a3, Ot);
      var i3 = q(a3);
      function a3() {
        var e3;
        W(this, a3);
        for (var t3 = arguments.length, n3 = new Array(t3), r3 = 0; r3 < t3; r3++)
          n3[r3] = arguments[r3];
        return E(y(e3 = i3.call.apply(i3, [this].concat(n3))), "ref", Lt()), E(y(e3), "nodes", []), e3;
      }
      return D(a3, [{ key: "componentDidMount", value: function() {
        var t3 = new DocumentFragment(), e3 = document.createElement("div");
        e3.innerHTML = this.props.content, this.nodes = w(e3.childNodes), this.nodes.forEach(function(e4) {
          return t3.appendChild(e4);
        }), this.ref.current.replaceWith(t3);
      } }, { key: "componentWillUnmount", value: function() {
        this.nodes.forEach(function(e3) {
          e3 instanceof Element ? e3.outerHTML = "" : e3.nodeValue = "";
        }), this.nodes[0].nodeValue && (this.nodes[0].nodeValue = "");
      } }, { key: "render", value: function() {
        return M("div", { ref: this.ref });
      } }]), a3;
    }(), v = function() {
      U(t3, Ot);
      var e3 = q(t3);
      function t3() {
        return W(this, t3), e3.apply(this, arguments);
      }
      return D(t3, [{ key: "shouldComponentUpdate", value: function(e4) {
        return !Oe(this.props.data, e4.data) || this.props.templateKey !== e4.templateKey || !Oe(this.props.rootProps, e4.rootProps);
      } }, { key: "render", value: function() {
        var e4 = "fragment" === this.props.rootTagName ? x : this.props.rootTagName, t4 = this.props.useCustomCompileOptions[this.props.templateKey] ? this.props.templatesConfig.compileOptions : {}, t4 = Ya({ templates: this.props.templates, templateKey: this.props.templateKey, compileOptions: t4, helpers: this.props.templatesConfig.helpers, data: this.props.data, bindEvent: this.props.bindEvent, sendEvent: this.props.sendEvent });
        return null === t4 ? null : "object" === A(t4) ? M(e4, this.props.rootProps, t4) : e4 === x ? M(Xa, { content: t4, key: t4 }) : M(e4, m({}, this.props.rootProps, { dangerouslySetInnerHTML: { __html: t4 } }));
      } }]), t3;
    }(), Ga = (E(v, "defaultProps", { data: {}, rootTagName: "div", useCustomCompileOptions: {}, templates: {}, templatesConfig: {} }), function(e3) {
      var t3 = e3.hits, n3 = e3.isLoading, r3 = e3.cssClasses, i3 = e3.templateProps;
      return M("div", { className: F(r3.root, 0 === t3.length && r3.emptyRoot) }, M(v, m({}, i3, { templateKey: "header", rootProps: { className: r3.header }, data: { hits: t3, isLoading: n3 } })), n3 ? M(v, m({}, i3, { templateKey: "loader", rootProps: { className: r3.loader } })) : M("ul", { className: r3.list }, t3.map(function(e4, t4) {
        return M(v, m({}, i3, { templateKey: "item", rootTagName: "li", rootProps: { className: r3.item }, key: e4.objectID, data: T(T({}, e4), {}, { get __hitIndex() {
          return t4;
        } }) }));
      })));
    }), es = { header: function() {
      return "";
    }, loader: function() {
      return "";
    }, item: function(e3) {
      return JSON.stringify(e3);
    } }, ts = l2({ name: "answers" }), ns = i2("Answers"), e2 = J(function(e3) {
      var t3, i3, a3, s3, o3, e3 = e3 || {}, n3 = e3.container, r3 = e3.attributesForPrediction, c2 = e3.queryLanguages, u2 = e3.nbHits, l3 = e3.searchDebounceTime, d2 = e3.renderDebounceTime, h2 = e3.escapeHTML, f2 = e3.extraParameters, m2 = e3.templates, m2 = void 0 === m2 ? {} : m2, e3 = e3.cssClasses, e3 = void 0 === e3 ? {} : e3;
      if (n3)
        return t3 = P(n3), n3 = { root: F(ns(), e3.root), emptyRoot: F(ns({ modifierName: "empty" }), e3.emptyRoot), header: F(ns({ descendantName: "header" }), e3.header), loader: F(ns({ descendantName: "loader" }), e3.loader), list: F(ns({ descendantName: "list" }), e3.list), item: F(ns({ descendantName: "item" }), e3.item) }, i3 = (e3 = { containerNode: t3, cssClasses: n3, templates: m2, renderState: {} }).containerNode, a3 = e3.cssClasses, s3 = e3.renderState, o3 = e3.templates, T(T({}, at(function(e4, t4) {
          var n4 = e4.hits, r4 = e4.isLoading, e4 = e4.instantSearchInstance;
          t4 ? s3.templateProps = O({ defaultTemplates: es, templatesConfig: e4.templatesConfig, templates: o3 }) : L(M(Ga, { cssClasses: a3, hits: n4, isLoading: r4, templateProps: s3.templateProps }), i3);
        }, function() {
          return L(null, t3);
        })({ attributesForPrediction: r3, queryLanguages: c2, nbHits: u2, searchDebounceTime: l3, renderDebounceTime: d2, escapeHTML: h2, extraParameters: f2 })), {}, { $$widgetType: "ais.answers" });
      throw new Error(ts("The `container` option is required."));
    }), rs = ["container", "widgets", "fallbackWidget"], is = l2({ name: "dynamic-widgets" }), as = i2("DynamicWidgets");
    function ss(e3) {
      var t3 = document.createElement("div");
      return t3.className = as({ descendantName: "widget" }), e3.appendChild(t3), t3;
    }
    function os(e3) {
      var n3, i3, a3, s3, t3, r3 = (e3 = e3 || {}).container, o3 = e3.widgets, c2 = e3.fallbackWidget, e3 = k(e3, rs);
      if (!r3)
        throw new Error(is("The `container` option is required."));
      if (o3 && Array.isArray(o3) && o3.every(function(e4) {
        return "function" == typeof e4;
      }))
        return n3 = P(r3), (i3 = document.createElement("div")).className = as(), a3 = /* @__PURE__ */ new Map(), s3 = [], t3 = st(function(e4, t4) {
          e4 = e4.attributesToRender;
          t4 && n3.appendChild(i3), e4.forEach(function(e5) {
            a3.has(e5) && (e5 = a3.get(e5), i3.appendChild(e5));
          });
        }, function() {
          n3.removeChild(i3);
        })(T(T({}, e3), {}, { widgets: s3, fallbackWidget: "function" == typeof c2 ? function(e4) {
          var e4 = e4.attribute, t4 = ss(i3);
          return a3.set(e4, t4), c2({ attribute: e4, container: t4 });
        } : void 0 })), T(T({}, t3), {}, { init: function(r4) {
          o3.forEach(function(e4) {
            var t4 = ss(i3), e4 = e4(t4), n4 = Te(e4, r4);
            a3.set(n4, t4), s3.push(e4);
          }), t3.init(r4);
        }, $$widgetType: "ais.dynamicWidgets" });
      throw new Error(is("The `widgets` option expects an array of callbacks."));
    }
    function cs(e3, t3) {
      var n3 = e3.items, r3 = e3.widgetParams, e3 = e3.canRefine;
      t3 || (t3 = r3.container, r3 = r3.cssClasses, L(M(Ss, { cssClasses: r3, items: n3, canRefine: e3 }), t3));
    }
    function us(e3) {
      var t3 = e3.className, n3 = e3.disabled;
      return M("button", { className: t3, onClick: e3.onClick, disabled: void 0 !== n3 && n3 }, e3.children);
    }
    function ls(e3) {
      var t3 = e3.classNameLabel, n3 = e3.classNameInput, r3 = e3.checked, i3 = e3.onToggle, e3 = e3.children;
      return M("label", { className: t3 }, M("input", { className: n3, type: "checkbox", checked: r3, onChange: i3 }), e3);
    }
    function ds(e3, t3) {
      var n3, r3, i3, a3, s3 = e3.items, o3 = e3.position, c2 = e3.currentRefinement, u2 = e3.refine, l3 = e3.clearMapRefinement, d2 = e3.toggleRefineOnMapMove, h2 = e3.isRefineOnMapMove, f2 = e3.setMapMoveSinceLastRefine, m2 = e3.hasMapMoveSinceLastRefine, p2 = e3.isRefinedWithMap, g2 = e3.widgetParams, e3 = e3.instantSearchInstance, v2 = g2.container, y2 = g2.googleReference, b2 = g2.cssClasses, R2 = g2.templates, S2 = g2.initialZoom, _2 = g2.initialPosition, w2 = g2.enableRefine, P2 = g2.enableClearMapRefinement, N2 = g2.enableRefineControl, x2 = g2.mapOptions, I2 = g2.createMarker, F2 = g2.markerOptions, C2 = g2.renderState;
      t3 ? (C2.isUserInteraction = true, C2.isPendingRefine = false, C2.markers = [], (g2 = document.createElement("div")).className = b2.root, v2.appendChild(g2), (t3 = document.createElement("div")).className = b2.map, g2.appendChild(t3), (n3 = document.createElement("div")).className = b2.tree, g2.appendChild(n3), C2.mapInstance = new y2.maps.Map(t3, T({ mapTypeControl: false, fullscreenControl: false, streetViewControl: false, clickableIcons: false, zoomControlOptions: { position: y2.maps.ControlPosition.LEFT_TOP } }, x2)), y2.maps.event.addListenerOnce(C2.mapInstance, "idle", function() {
        function e4() {
          C2.isUserInteraction && w2 && (f2(), h2()) && (C2.isPendingRefine = true);
        }
        C2.mapInstance.addListener("center_changed", e4), C2.mapInstance.addListener("zoom_changed", e4), C2.mapInstance.addListener("dragstart", e4), C2.mapInstance.addListener("idle", function() {
          C2.isUserInteraction && C2.isPendingRefine && (C2.isPendingRefine = false, Is({ mapInstance: C2.mapInstance, refine: u2 }));
        });
      }), C2.templateProps = O({ templatesConfig: e3.templatesConfig, templates: R2 })) : (g2 = s3.map(function(e4) {
        return e4.objectID;
      }), t3 = (n3 = j(Fs(C2.markers, g2), 2))[0], x2 = n3[1], r3 = t3.map(function(e4) {
        return e4.__id;
      }), e3 = s3.filter(function(e4) {
        return !r3.includes(e4.objectID);
      }), x2.forEach(function(e4) {
        return e4.setMap(null);
      }), C2.markers = t3.concat(e3.map(function(n4) {
        var r4 = I2({ map: C2.mapInstance, item: n4 });
        return Object.keys(F2.events).forEach(function(t4) {
          r4.addListener(t4, function(e4) {
            F2.events[t4]({ map: C2.mapInstance, event: e4, item: n4, marker: r4 });
          });
        }), r4;
      })), R2 = !m2(), i3 = c2 ? 0 : null, (a3 = !c2 && Boolean(C2.markers.length) ? Cs(y2, C2.markers) : c2) && R2 ? Ts(C2, function() {
        C2.mapInstance.fitBounds(new y2.maps.LatLngBounds(a3.southWest, a3.northEast), i3);
      }) : R2 && Ts(C2, function() {
        C2.mapInstance.setCenter(o3 || _2), C2.mapInstance.setZoom(S2);
      }), L(M(xs, { cssClasses: b2, enableRefine: w2, enableRefineControl: N2, enableClearMapRefinement: P2, isRefineOnMapMove: h2(), isRefinedWithMap: p2(), hasMapMoveSinceLastRefine: m2(), onRefineToggle: d2, onRefineClick: function() {
        return Is({ mapInstance: C2.mapInstance, refine: u2 });
      }, onClearClick: l3, templateProps: C2.templateProps }), v2.querySelector(".".concat(b2.tree))));
    }
    var hs = l2({ name: "analytics" }), fs = function(e3) {
      var r3 = e3.items, i3 = e3.cssClasses, a3 = e3.templateProps, s3 = e3.createURL, o3 = e3.refine;
      return M("div", { className: F(i3.root, 0 === r3.length && i3.noRefinementRoot) }, M("ul", { className: i3.list }, M("li", { className: F(i3.item, 0 === r3.length && i3.selectedItem) }, M(v, m({}, a3, { templateKey: "home", rootTagName: "a", rootProps: { className: i3.link, href: s3(null), onClick: function(e4) {
        e4.preventDefault(), o3(null);
      } } }))), r3.map(function(t3, e4) {
        var n3 = e4 === r3.length - 1;
        return M("li", { key: t3.label + e4, className: F(i3.item, n3 && i3.selectedItem) }, M(v, m({}, a3, { templateKey: "separator", rootTagName: "span", rootProps: { className: i3.separator, "aria-hidden": true } })), n3 ? t3.label : M("a", { className: i3.link, href: s3(t3.value), onClick: function(e5) {
          e5.preventDefault(), o3(t3.value);
        } }, t3.label));
      })));
    }, ms = { home: function() {
      return "Home";
    }, separator: function() {
      return ">";
    } }, ps = l2({ name: "breadcrumb" }), gs = i2("Breadcrumb"), vs = function(e3) {
      var t3 = e3.hasRefinements, n3 = e3.refine, r3 = e3.cssClasses, e3 = e3.templateProps;
      return M("div", { className: r3.root }, M(v, m({}, e3, { templateKey: "resetLabel", rootTagName: "button", rootProps: { className: F(r3.button, !t3 && r3.disabledButton), onClick: n3, disabled: !t3 }, data: { hasRefinements: t3 } })));
    }, ys = { resetLabel: function() {
      return "Clear refinements";
    } }, bs = l2({ name: "clear-refinements" }), Rs = i2("ClearRefinements"), Ss = function(e3) {
      var t3 = e3.items, a3 = e3.cssClasses, e3 = e3.canRefine;
      return M("div", { className: F(a3.root, !e3 && a3.noRefinementRoot) }, M("ul", { className: a3.list }, t3.map(function(i3, e4) {
        return M("li", { key: "".concat(i3.indexName, "-").concat(i3.attribute, "-").concat(e4), className: a3.item }, M("span", { className: a3.label }, (e4 = i3.label).toString().charAt(0).toUpperCase() + e4.toString().slice(1), ": "), i3.refinements.map(function(e5) {
          return M("span", { key: (n3 = e5.attribute, r3 = e5.value, [n3, e5.type, r3, e5.operator].map(function(e6) {
            return e6;
          }).filter(Boolean).join(":")), className: a3.category }, M("span", { className: a3.categoryLabel }, "query" === e5.attribute ? M("q", null, e5.label) : e5.label), M("button", { className: a3.delete, type: "button", onClick: (t4 = i3.refine.bind(null, e5), function(e6) {
            He(e6) || (e6.preventDefault(), t4());
          }) }, "✕"));
          var t4, n3, r3;
        }));
      })));
    }, _s = l2({ name: "current-refinements" }), ws = i2("CurrentRefinements"), Ps = M("p", null, "Your custom HTML Marker"), Ns = { HTMLMarker: function() {
      return Ps;
    }, reset: function() {
      return "Clear the map refinement";
    }, toggle: function() {
      return "Search as I move the map";
    }, redo: function() {
      return "Redo search here";
    } }, xs = function(e3) {
      var t3 = e3.cssClasses, n3 = e3.enableRefine, r3 = e3.enableRefineControl, i3 = e3.enableClearMapRefinement, a3 = e3.isRefineOnMapMove, s3 = e3.isRefinedWithMap, o3 = e3.hasMapMoveSinceLastRefine, c2 = e3.onRefineToggle, u2 = e3.onRefineClick, l3 = e3.onClearClick, e3 = e3.templateProps;
      return M(x, null, n3 && M("div", null, r3 && M("div", { className: t3.control }, a3 || !o3 ? M(ls, { classNameLabel: F(t3.label, a3 && t3.selectedLabel), classNameInput: t3.input, checked: a3, onToggle: c2 }, M(v, m({}, e3, { templateKey: "toggle", rootTagName: "span" }))) : M(us, { className: t3.redo, disabled: !o3, onClick: u2 }, M(v, m({}, e3, { templateKey: "redo", rootTagName: "span" })))), !r3 && !a3 && M("div", { className: t3.control }, M(us, { className: F(t3.redo, !o3 && t3.disabledRedo), disabled: !o3, onClick: u2 }, M(v, m({}, e3, { templateKey: "redo", rootTagName: "span" })))), i3 && s3 && M(us, { className: t3.reset, onClick: l3 }, M(v, m({}, e3, { templateKey: "reset", rootTagName: "span" })))));
    }, Is = function(e3) {
      var t3 = e3.refine, e3 = e3.mapInstance;
      return t3({ northEast: e3.getBounds().getNorthEast().toJSON(), southWest: e3.getBounds().getSouthWest().toJSON() });
    }, Fs = function(e3, r3) {
      return e3.reduce(function(e4, t3) {
        var e4 = j(e4, 2), n3 = e4[0], e4 = e4[1];
        return r3.includes(t3.__id) ? [n3.concat(t3), e4] : [n3, e4.concat(t3)];
      }, [[], []]);
    }, Cs = function(e3, t3) {
      t3 = t3.reduce(function(e4, t4) {
        return e4.extend(t4.getPosition());
      }, new e3.maps.LatLngBounds());
      return { northEast: t3.getNorthEast().toJSON(), southWest: t3.getSouthWest().toJSON() };
    }, Ts = function(e3, t3) {
      e3.isUserInteraction = false, t3(), e3.isUserInteraction = true;
    }, Es = ["initialZoom", "initialPosition", "templates", "cssClasses", "builtInMarker", "customHTMLMarker", "enableRefine", "enableClearMapRefinement", "enableRefineControl", "container", "googleReference"], ks = ["item"], js = ["item"], Ms = l2({ name: "geo-search" }), Ls = i2("GeoSearch"), wa = { query: "", showSubmit: true, showReset: true, showLoadingIndicator: true, autofocus: false, searchAsYouType: true, ignoreCompositionEvents: false, isSearchStalled: false, disabled: false, ariaLabel: "Search", onChange: R, onSubmit: R, onReset: R, refine: R }, Os = function() {
      U(i3, Ot);
      var r3 = q(i3);
      function i3() {
        var a3;
        W(this, i3);
        for (var e3 = arguments.length, t3 = new Array(e3), n3 = 0; n3 < e3; n3++)
          t3[n3] = arguments[n3];
        return E(y(a3 = r3.call.apply(r3, [this].concat(t3))), "state", { query: a3.props.query, focused: false }), E(y(a3), "input", Lt()), E(y(a3), "onInput", function(e4) {
          var t4 = a3.props, n4 = t4.searchAsYouType, r4 = t4.refine, t4 = t4.onChange, i4 = e4.target.value;
          a3.props.ignoreCompositionEvents && e4.isComposing || (n4 && r4(i4), a3.setState({ query: i4 }), t4(e4));
        }), E(y(a3), "onSubmit", function(e4) {
          var t4 = a3.props, n4 = t4.searchAsYouType, r4 = t4.refine, t4 = t4.onSubmit;
          return e4.preventDefault(), e4.stopPropagation(), a3.input.current && a3.input.current.blur(), n4 || r4(a3.state.query), t4(e4), false;
        }), E(y(a3), "onReset", function(e4) {
          var t4 = a3.props, n4 = t4.refine, t4 = t4.onReset;
          a3.input.current && a3.input.current.focus(), n4(""), a3.setState({ query: "" }), t4(e4);
        }), E(y(a3), "onBlur", function() {
          a3.setState({ focused: false });
        }), E(y(a3), "onFocus", function() {
          a3.setState({ focused: true });
        }), a3;
      }
      return D(i3, [{ key: "resetInput", value: function() {
        this.setState({ query: "" });
      } }, { key: "componentWillReceiveProps", value: function(e3) {
        this.state.focused || e3.query === this.state.query || this.setState({ query: e3.query });
      } }, { key: "render", value: function() {
        var e3 = this.props, t3 = e3.cssClasses, n3 = e3.placeholder, r4 = e3.autofocus, i4 = e3.showSubmit, a3 = e3.showReset, s3 = e3.showLoadingIndicator, o3 = e3.templates, c2 = e3.isSearchStalled, e3 = e3.ariaLabel;
        return M("div", { className: t3.root }, M("form", { action: "", role: "search", className: t3.form, noValidate: true, onSubmit: this.onSubmit, onReset: this.onReset }, M("input", { ref: this.input, value: this.state.query, disabled: this.props.disabled, className: t3.input, type: "search", placeholder: n3, autoFocus: r4, autoComplete: "off", autoCorrect: "off", autoCapitalize: "off", spellCheck: "false", maxLength: 512, onInput: this.onInput, oncompositionend: this.onInput, onBlur: this.onBlur, onFocus: this.onFocus, "aria-label": e3 }), M(v, { templateKey: "submit", rootTagName: "button", rootProps: { className: t3.submit, type: "submit", title: "Submit the search query", hidden: !i4 }, templates: o3, data: { cssClasses: t3 } }), M(v, { templateKey: "reset", rootTagName: "button", rootProps: { className: t3.reset, type: "reset", title: "Clear the search query", hidden: !(a3 && this.state.query.trim() && !c2) }, templates: o3, data: { cssClasses: t3 } }), s3 && M(v, { templateKey: "loadingIndicator", rootTagName: "span", rootProps: { className: t3.loadingIndicator, hidden: !c2 }, templates: o3, data: { cssClasses: t3 } })));
      } }]), i3;
    }();
    function Hs(e3) {
      var t3 = e3.className, n3 = e3.handleClick, r3 = e3.facetValueToRefine, i3 = e3.isRefined, a3 = e3.templateProps, s3 = e3.templateKey, o3 = e3.templateData, e3 = e3.subItems;
      return M("li", { className: t3, onClick: function(e4) {
        n3({ facetValueToRefine: r3, isRefined: i3, originalEvent: e4 });
      } }, M(v, m({}, a3, { templateKey: s3, data: o3 })), e3);
    }
    E(Os, "defaultProps", wa);
    var As = ["root"];
    function Ws(e3) {
      return void 0 !== e3.data;
    }
    var Ds, Us, $s = function() {
      U(s3, Ot);
      var r3 = q(s3);
      function s3() {
        var a3;
        W(this, s3);
        for (var e3 = arguments.length, t3 = new Array(e3), n3 = 0; n3 < e3; n3++)
          t3[n3] = arguments[n3];
        return E(y(a3 = r3.call.apply(r3, [this].concat(t3))), "searchBox", Lt()), E(y(a3), "_generateFacetItem", function(e4) {
          Ws(e4) && Array.isArray(e4.data) && 0 < e4.data.length && ((t4 = a3.props.cssClasses).root, t4 = k(t4, As), t4 = M(s3, m({}, a3.props, { cssClasses: t4, depth: a3.props.depth + 1, facetValues: e4.data, showMore: false, className: a3.props.cssClasses.childList })));
          var t4, n4 = a3.props.createURL(e4.value), n4 = T(T({}, e4), {}, { url: n4, attribute: a3.props.attribute, cssClasses: a3.props.cssClasses, isFromSearch: a3.props.isFromSearch }), r4 = e4.value, i3 = (void 0 !== e4.isRefined && (r4 += "/".concat(e4.isRefined)), void 0 !== e4.count && (r4 += "/".concat(e4.count)), F(a3.props.cssClasses.item, e4.isRefined && a3.props.cssClasses.selectedItem, !e4.count && a3.props.cssClasses.disabledItem, Boolean(Ws(e4) && Array.isArray(e4.data) && 0 < e4.data.length) && a3.props.cssClasses.parentItem));
          return M(Hs, { templateKey: "item", key: r4, facetValueToRefine: e4.value, handleClick: a3.handleItemClick, isRefined: e4.isRefined, className: i3, subItems: t4, templateData: n4, templateProps: a3.props.templateProps });
        }), E(y(a3), "handleItemClick", function(e4) {
          var t4 = e4.facetValueToRefine, n4 = e4.isRefined, r4 = e4.originalEvent;
          if (!He(r4)) {
            var i3 = r4.target;
            if (!(null === i3 || null === i3.parentNode || n4 && i3.parentNode.querySelector('input[type="radio"]:checked'))) {
              if ("INPUT" !== i3.tagName) {
                for (; i3 !== r4.currentTarget; ) {
                  if ("LABEL" === i3.tagName && (i3.querySelector('input[type="checkbox"]') || i3.querySelector('input[type="radio"]')))
                    return;
                  "A" === i3.tagName && i3.href && r4.preventDefault(), i3 = i3.parentNode;
                }
                r4.stopPropagation();
              }
              a3.refine(t4);
            }
          }
        }), a3;
      }
      return D(s3, [{ key: "shouldComponentUpdate", value: function(e3) {
        return !Oe(this.props.facetValues, e3.facetValues);
      } }, { key: "refine", value: function(e3) {
        this.props.toggleRefinement(e3);
      } }, { key: "componentWillReceiveProps", value: function(e3) {
        this.searchBox.current && !e3.isFromSearch && this.searchBox.current.resetInput();
      } }, { key: "refineFirstValue", value: function() {
        var e3 = this.props.facetValues && this.props.facetValues[0];
        e3 && (e3 = e3.value, this.props.toggleRefinement(e3));
      } }, { key: "render", value: function() {
        var t3 = this, e3 = F(this.props.cssClasses.showMore, !(true === this.props.showMore && this.props.canToggleShowMore) && this.props.cssClasses.disabledShowMore), e3 = true === this.props.showMore && M(v, m({}, this.props.templateProps, { templateKey: "showMoreText", rootTagName: "button", rootProps: { className: e3, disabled: !this.props.canToggleShowMore, onClick: this.props.toggleShowMore }, data: { isShowingMore: this.props.isShowingMore } })), n3 = true !== this.props.searchIsAlwaysActive && !(this.props.isFromSearch || !this.props.hasExhaustiveItems), n3 = this.props.searchFacetValues && M("div", { className: this.props.cssClasses.searchBox }, M(Os, { ref: this.searchBox, placeholder: this.props.searchPlaceholder, disabled: n3, cssClasses: this.props.cssClasses.searchable, templates: this.props.searchBoxTemplateProps.templates, onChange: function(e4) {
          return t3.props.searchFacetValues(e4.target.value);
        }, onReset: function() {
          return t3.props.searchFacetValues("");
        }, onSubmit: function() {
          return t3.refineFirstValue();
        }, searchAsYouType: false, ariaLabel: "Search for filters" })), r4 = this.props.facetValues && 0 < this.props.facetValues.length && M("ul", { className: this.props.cssClasses.list }, this.props.facetValues.map(this._generateFacetItem, this)), i3 = this.props.searchFacetValues && this.props.isFromSearch && (!this.props.facetValues || 0 === this.props.facetValues.length) && M(v, m({}, this.props.templateProps, { templateKey: "searchableNoResults", rootProps: { className: this.props.cssClasses.noResults } }));
        return M("div", { className: F(this.props.cssClasses.root, (!this.props.facetValues || 0 === this.props.facetValues.length) && this.props.cssClasses.noRefinementRoot, this.props.className) }, this.props.children, n3, r4, i3, e3);
      } }]), s3;
    }(), Bs = (E($s, "defaultProps", { cssClasses: {}, depth: 0 }), { item: function(e3) {
      var t3 = e3.url, n3 = e3.label, r3 = e3.count, i3 = e3.cssClasses, e3 = e3.isRefined;
      return M("a", { className: F(F(i3.link), F(e3 ? i3.selectedItemLink : void 0)), href: t3 }, M("span", { className: F(i3.label) }, n3), M("span", { className: F(i3.count) }, ua(r3)));
    }, showMoreText: function(e3) {
      return e3.isShowingMore ? "Show less" : "Show more";
    } }), Qs = l2({ name: "hierarchical-menu" }), S = i2("HierarchicalMenu"), qs = { empty: function() {
      return "No results";
    }, item: function(e3) {
      return JSON.stringify(Xe(e3, ["__hitIndex"]), null, 2);
    } }, Vs = ["hit", "index"], Ks = l2({ name: "hits" }), zs = (Us = (wa = { createElement: M, Fragment: x }).createElement, wa = wa.Fragment, Ds = { createElement: Us, Fragment: wa }.createElement, function(e3) {
      var t3 = e3.classNames, n3 = void 0 === t3 ? {} : t3, t3 = e3.hits, r3 = e3.itemComponent, i3 = e3.sendEvent, a3 = e3.emptyComponent, s3 = e3.banner, o3 = e3.bannerComponent, e3 = Ra(e3, _a);
      return Us("div", ya({}, e3, { className: F("ais-Hits", n3.root, 0 === t3.length && F("ais-Hits--empty", n3.emptyRoot), e3.className) }), s3 && (o3 ? Us(o3, { className: F("ais-Hits-banner", n3.bannerRoot), banner: s3 }) : Us(Js, { classNames: n3, banner: s3 })), 0 === t3.length && a3 ? Us(a3, null) : Us("ol", { className: F("ais-Hits-list", n3.list) }, t3.map(function(e4, t4) {
        return Us(r3, { key: e4.objectID, hit: e4, index: t4, className: F("ais-Hits-item", n3.item), onClick: function() {
          i3("click:internal", e4, "Hit Clicked");
        }, onAuxClick: function() {
          i3("click:internal", e4, "Hit Clicked");
        } });
      })));
    });
    function Js(e3) {
      var t3, n3 = e3.classNames;
      return (e3 = e3.banner).image.urls[0].url ? Ds("aside", { className: F("ais-Hits-banner", n3.bannerRoot) }, null != (t3 = e3.link) && t3.url ? Ds("a", { className: F("ais-Hits-banner-link", n3.bannerLink), href: e3.link.url, target: e3.link.target }, Ds("img", { className: F("ais-Hits-banner-image", n3.bannerImage), src: e3.image.urls[0].url, alt: e3.image.title })) : Ds("img", { className: F("ais-Hits-banner-image", n3.bannerImage), src: e3.image.urls[0].url, alt: e3.image.title })) : null;
    }
    function Zs(e3) {
      var t3 = e3.currentValue, n3 = e3.options, r3 = e3.cssClasses, i3 = e3.setValue, e3 = e3.ariaLabel;
      return M("select", { className: F(r3.select), onChange: function(e4) {
        return i3(e4.target.value);
      }, value: "".concat(t3), "aria-label": e3 }, n3.map(function(e4) {
        return M("option", { className: F(r3.option), key: e4.label + e4.value, value: "".concat(e4.value) }, e4.label);
      }));
    }
    var Ys = l2({ name: "hits-per-page" }), Xs = i2("HitsPerPage"), Gs = function(e3) {
      var t3 = e3.results, n3 = e3.hits, r3 = e3.insights, i3 = e3.bindEvent, a3 = e3.sendEvent, s3 = e3.hasShowPrevious, o3 = e3.showPrevious, c2 = e3.showMore, u2 = e3.isFirstPage, l3 = e3.isLastPage, d2 = e3.cssClasses, h2 = e3.templateProps, f2 = Yt({ insights: r3, sendEvent: a3 });
      return 0 === t3.hits.length ? M(v, m({}, h2, { templateKey: "empty", rootProps: { className: F(d2.root, d2.emptyRoot), onClick: f2 }, data: t3 })) : M("div", { className: d2.root }, s3 && M(v, m({}, h2, { templateKey: "showPreviousText", rootTagName: "button", rootProps: { className: F(d2.loadPrevious, u2 && d2.disabledLoadPrevious), disabled: u2, onClick: o3 } })), M("ol", { className: d2.list }, n3.map(function(t4, e4) {
        return M(v, m({}, h2, { templateKey: "item", rootTagName: "li", rootProps: { className: d2.item, onClick: function(e5) {
          f2(e5), a3("click:internal", t4, "Hit Clicked");
        }, onAuxClick: function(e5) {
          f2(e5), a3("click:internal", t4, "Hit Clicked");
        } }, key: t4.objectID, data: T(T({}, t4), {}, { get __hitIndex() {
          return e4;
        } }), bindEvent: i3, sendEvent: a3 }));
      })), M(v, m({}, h2, { templateKey: "showMoreText", rootTagName: "button", rootProps: { className: F(d2.loadMore, l3 && d2.disabledLoadMore), disabled: l3, onClick: c2 } })));
    }, eo = { empty: function() {
      return "No results";
    }, showPreviousText: function() {
      return "Show previous results";
    }, showMoreText: function() {
      return "Show more results";
    }, item: function(e3) {
      return JSON.stringify(Xe(e3, ["__hitIndex"]), null, 2);
    } }, to = l2({ name: "infinite-hits" }), no = i2("InfiniteHits"), ro = { item: function(e3) {
      var t3 = e3.cssClasses, n3 = e3.url, r3 = e3.label, e3 = e3.count;
      return M("a", { className: F(t3.link), href: n3 }, M("span", { className: F(t3.label) }, r3), M("span", { className: F(t3.count) }, ua(e3)));
    }, showMoreText: function(e3) {
      return e3.isShowingMore ? "Show less" : "Show more";
    } }, io = l2({ name: "menu" }), ao = i2("Menu");
    function so(e3) {
      var t3 = e3.cssClasses, n3 = e3.templateProps, r3 = e3.items, i3 = e3.refine, e3 = (_e(r3, function(e4) {
        return e4.isRefined;
      }) || { value: "" }).value;
      return M("div", { className: F(t3.root, 0 === r3.length && t3.noRefinementRoot) }, M("select", { className: t3.select, value: e3, onChange: function(e4) {
        i3(e4.target.value);
      } }, M(v, m({}, n3, { templateKey: "defaultOption", rootTagName: "option", rootProps: { value: "", className: t3.option } })), r3.map(function(e4) {
        return M(v, m({}, n3, { templateKey: "item", rootTagName: "option", rootProps: { value: e4.value, className: t3.option }, key: e4.value, data: e4 }));
      })));
    }
    var oo = { item: function(e3) {
      var t3 = e3.label, e3 = e3.count;
      return "".concat(t3, " (").concat(ua(e3), ")");
    }, defaultOption: function() {
      return "See all";
    } }, co = l2({ name: "menu-select" }), uo = i2("MenuSelect"), lo = { item: function(e3) {
      var t3 = e3.cssClasses, n3 = e3.attribute, r3 = e3.label, e3 = e3.isRefined;
      return M("label", { className: t3.label }, M("input", { type: "radio", className: t3.radio, name: n3, defaultChecked: e3 }), M("span", { className: t3.labelText }, r3));
    } }, ho = l2({ name: "numeric-menu" }), fo = i2("NumericMenu");
    function mo(n3) {
      function t3(t4) {
        return function(e3) {
          He(e3) || (e3.preventDefault(), n3.setCurrentPage(t4));
        };
      }
      return M("div", { className: F(n3.cssClasses.root, n3.nbPages <= 1 && n3.cssClasses.noRefinementRoot) }, M("ul", { className: n3.cssClasses.list }, n3.showFirst && M(po, { ariaLabel: "First Page", className: n3.cssClasses.firstPageItem, isDisabled: n3.isFirstPage, templates: n3.templates, templateKey: "first", pageNumber: 0, createURL: n3.createURL, cssClasses: n3.cssClasses, createClickHandler: t3 }), n3.showPrevious && M(po, { ariaLabel: "Previous Page", className: n3.cssClasses.previousPageItem, isDisabled: n3.isFirstPage, templates: n3.templates, templateKey: "previous", pageNumber: n3.currentPage - 1, createURL: n3.createURL, cssClasses: n3.cssClasses, createClickHandler: t3 }), n3.pages.map(function(e3) {
        return M(po, { key: e3, ariaLabel: "Page ".concat(e3 + 1), className: n3.cssClasses.pageItem, isSelected: e3 === n3.currentPage, templates: n3.templates, templateKey: "page", pageNumber: e3, createURL: n3.createURL, cssClasses: n3.cssClasses, createClickHandler: t3 });
      }), n3.showNext && M(po, { ariaLabel: "Next Page", className: n3.cssClasses.nextPageItem, isDisabled: n3.isLastPage, templates: n3.templates, templateKey: "next", pageNumber: n3.currentPage + 1, createURL: n3.createURL, cssClasses: n3.cssClasses, createClickHandler: t3 }), n3.showLast && M(po, { ariaLabel: "Last Page, Page ".concat(n3.nbPages), className: n3.cssClasses.lastPageItem, isDisabled: n3.isLastPage, templates: n3.templates, templateKey: "last", pageNumber: n3.nbPages - 1, createURL: n3.createURL, cssClasses: n3.cssClasses, createClickHandler: t3 })));
    }
    function po(e3) {
      var t3 = e3.templates, n3 = e3.templateKey, r3 = e3.ariaLabel, i3 = e3.pageNumber, a3 = e3.className, s3 = e3.isDisabled, s3 = void 0 !== s3 && s3, o3 = e3.isSelected, c2 = e3.cssClasses, u2 = e3.createURL, e3 = e3.createClickHandler;
      return M("li", { className: F(c2.item, s3 && c2.disabledItem, a3, void 0 !== o3 && o3 && c2.selectedItem) }, M(v, s3 ? { rootTagName: "span", rootProps: { className: c2.link, "aria-label": r3 }, templateKey: n3, templates: t3, data: { page: i3 + 1 } } : { rootTagName: "a", rootProps: { className: c2.link, "aria-label": r3, href: u2(i3), onClick: e3(i3) }, templateKey: n3, templates: t3, data: { page: i3 + 1 } }));
    }
    var go, _, vo, yo, bo = i2("Pagination"), Ro = l2({ name: "pagination" }), So = { previous: function() {
      return "‹";
    }, next: function() {
      return "›";
    }, page: function(e3) {
      e3 = e3.page;
      return "".concat(e3);
    }, first: function() {
      return "«";
    }, last: function() {
      return "»";
    } }, _o = 0, wo = [], Po = [], No = N.__b, xo = N.__r, Io = N.diffed, Fo = N.__c, Co = N.unmount;
    function To(e3, t3) {
      N.__h && N.__h(_, e3, _o || t3), _o = 0;
      t3 = _.__H || (_.__H = { __: [], __h: [] });
      return e3 >= t3.__.length && t3.__.push({ __V: Po }), t3.__[e3];
    }
    function Eo(e3) {
      _o = 1;
      var a3, t3 = Ao, s3 = To(go++, 2);
      return s3.t = t3, s3.__c || (s3.__ = [Ao(void 0, e3), function(e4) {
        var t4 = (s3.__N || s3.__)[0], e4 = s3.t(t4, e4);
        t4 !== e4 && (s3.__N = [e4, s3.__[1]], s3.__c.setState({}));
      }], (s3.__c = _).u) || (_.u = true, a3 = _.shouldComponentUpdate, _.shouldComponentUpdate = function(e4, t4, n3) {
        var r3, i3;
        return !s3.__c.__H || ((r3 = s3.__c.__H.__.filter(function(e5) {
          return e5.__c;
        })).every(function(e5) {
          return !e5.__N;
        }) || (i3 = false, r3.forEach(function(e5) {
          var t5;
          e5.__N && (t5 = e5.__[0], e5.__ = e5.__N, e5.__N = void 0, t5 !== e5.__[0]) && (i3 = true);
        }), !!i3)) && (!a3 || a3.call(this, e4, t4, n3));
      }), s3.__N || s3.__;
    }
    function ko(e3) {
      return _o = 5, t3 = function() {
        return { current: e3 };
      }, n3 = [], Ho((r3 = To(go++, 7)).__H, n3) ? (r3.__V = t3(), r3.i = n3, r3.__h = t3, r3.__V) : r3.__;
      var t3, n3, r3;
    }
    function jo() {
      for (var t3; t3 = wo.shift(); )
        if (t3.__P && t3.__H)
          try {
            t3.__H.__h.forEach(Lo), t3.__H.__h.forEach(Oo), t3.__H.__h = [];
          } catch (e3) {
            t3.__H.__h = [], N.__e(e3, t3.__v);
          }
    }
    N.__b = function(e3) {
      "function" != typeof e3.type || e3.o || e3.type === x ? e3.o || (e3.o = e3.__ && e3.__.o ? e3.__.o : "") : e3.o = (e3.__ && e3.__.o ? e3.__.o : "") + (e3.__ && e3.__.__k ? e3.__.__k.indexOf(e3) : 0), _ = null, No && No(e3);
    }, N.__r = function(e3) {
      xo && xo(e3), go = 0;
      e3 = (_ = e3.__c).__H;
      e3 && (vo === _ ? (e3.__h = [], _.__h = [], e3.__.forEach(function(e4) {
        e4.__N && (e4.__ = e4.__N), e4.__V = Po, e4.__N = e4.i = void 0;
      })) : (e3.__h.forEach(Lo), e3.__h.forEach(Oo), e3.__h = [])), vo = _;
    }, N.diffed = function(e3) {
      Io && Io(e3);
      e3 = e3.__c;
      e3 && e3.__H && (!e3.__H.__h.length || 1 !== wo.push(e3) && yo === N.requestAnimationFrame || ((yo = N.requestAnimationFrame) || function(e4) {
        function t3() {
          clearTimeout(r3), Mo && cancelAnimationFrame(n3), setTimeout(e4);
        }
        var n3, r3 = setTimeout(t3, 100);
        Mo && (n3 = requestAnimationFrame(t3));
      })(jo), e3.__H.__.forEach(function(e4) {
        e4.i && (e4.__H = e4.i), e4.__V !== Po && (e4.__ = e4.__V), e4.i = void 0, e4.__V = Po;
      })), vo = _ = null;
    }, N.__c = function(e3, n3) {
      n3.some(function(t3) {
        try {
          t3.__h.forEach(Lo), t3.__h = t3.__h.filter(function(e4) {
            return !e4.__ || Oo(e4);
          });
        } catch (e4) {
          n3.some(function(e5) {
            e5.__h && (e5.__h = []);
          }), n3 = [], N.__e(e4, t3.__v);
        }
      }), Fo && Fo(e3, n3);
    }, N.unmount = function(e3) {
      Co && Co(e3);
      var t3, e3 = e3.__c;
      e3 && e3.__H && (e3.__H.__.forEach(function(e4) {
        try {
          Lo(e4);
        } catch (e5) {
          t3 = e5;
        }
      }), e3.__H = void 0, t3) && N.__e(t3, e3.__v);
    };
    var Mo = "function" == typeof requestAnimationFrame;
    function Lo(e3) {
      var t3 = _, n3 = e3.__c;
      "function" == typeof n3 && (e3.__c = void 0, n3()), _ = t3;
    }
    function Oo(e3) {
      var t3 = _;
      e3.__c = e3.__(), _ = t3;
    }
    function Ho(n3, e3) {
      return !n3 || n3.length !== e3.length || e3.some(function(e4, t3) {
        return e4 !== n3[t3];
      });
    }
    function Ao(e3, t3) {
      return "function" == typeof t3 ? t3(e3) : t3;
    }
    function Wo(t3) {
      var e3, n3, r3 = j(Eo(t3.isCollapsed), 2), i3 = r3[0], a3 = r3[1], r3 = j(Eo(false), 2), s3 = r3[0], o3 = r3[1], c2 = ko(null);
      return r3 = function() {
        var e4 = c2.current;
        if (e4)
          return e4.appendChild(t3.bodyElement), function() {
            e4.removeChild(t3.bodyElement);
          };
      }, e3 = [c2, t3.bodyElement], n3 = To(go++, 3), !N.__s && Ho(n3.__H, e3) && (n3.__ = r3, n3.i = e3, _.__H.__h.push(n3)), s3 || t3.isCollapsed === i3 || a3(t3.isCollapsed), M("div", { className: F(t3.cssClasses.root, t3.hidden && t3.cssClasses.noRefinementRoot, t3.collapsible && t3.cssClasses.collapsibleRoot, i3 && t3.cssClasses.collapsedRoot), hidden: t3.hidden }, t3.templates.header && M("div", { className: t3.cssClasses.header }, M(v, { templates: t3.templates, templateKey: "header", rootTagName: "span", data: t3.data }), t3.collapsible && M("button", { className: t3.cssClasses.collapseButton, "aria-expanded": !i3, onClick: function(e4) {
        e4.preventDefault(), o3(true), a3(function(e5) {
          return !e5;
        });
      } }, M(v, { templates: t3.templates, templateKey: "collapseButtonText", rootTagName: "span", data: { collapsed: i3 } }))), M("div", { className: t3.cssClasses.body, ref: c2 }), t3.templates.footer && M(v, { templates: t3.templates, templateKey: "footer", rootProps: { className: t3.cssClasses.footer }, data: t3.data }));
    }
    var Do = l2({ name: "panel" }), Uo = i2("Panel"), $o = ["placesReference", "defaultPosition"], Bo = ["places"], wa = J(function(e3) {
      var t3 = e3 || {}, n3 = t3.placesReference, r3 = t3.defaultPosition, i3 = void 0 === r3 ? [] : r3, r3 = k(t3, $o);
      if ("function" != typeof n3)
        throw new Error("The `placesReference` option requires a valid Places.js reference.");
      var a3 = n3(r3), s3 = { query: "", initialLatLngViaIP: void 0, isInitialLatLngViaIPSet: false };
      return { $$type: "ais.places", $$widgetType: "ais.places", init: function(e4) {
        var r4 = e4.helper;
        a3.on("change", function(e5) {
          var e5 = e5.suggestion, t4 = e5.value, e5 = e5.latlng, n4 = e5.lat, e5 = e5.lng;
          s3.query = t4, r4.setQueryParameter("insideBoundingBox", void 0).setQueryParameter("aroundLatLngViaIP", false).setQueryParameter("aroundLatLng", "".concat(n4, ",").concat(e5)).search();
        }), a3.on("clear", function() {
          s3.query = "", r4.setQueryParameter("insideBoundingBox", void 0), 1 < i3.length ? r4.setQueryParameter("aroundLatLngViaIP", false).setQueryParameter("aroundLatLng", i3.join(",")) : r4.setQueryParameter("aroundLatLngViaIP", s3.initialLatLngViaIP).setQueryParameter("aroundLatLng", void 0), r4.search();
        });
      }, getWidgetUiState: function(e4, t4) {
        t4 = t4.searchParameters.aroundLatLng || i3.join(",");
        return t4 !== i3.join(",") || s3.query ? T(T({}, e4), {}, { places: { query: s3.query, position: t4 } }) : (e4.places, k(e4, Bo));
      }, getWidgetSearchParameters: function(e4, t4) {
        var t4 = t4.uiState.places || {}, n4 = t4.query, n4 = void 0 === n4 ? "" : n4, t4 = t4.position, t4 = void 0 === t4 ? i3.join(",") : t4;
        return s3.query = n4, s3.isInitialLatLngViaIPSet || (s3.isInitialLatLngViaIPSet = true, s3.initialLatLngViaIP = e4.aroundLatLngViaIP), a3.setVal(n4), a3.close(), e4.setQueryParameter("insideBoundingBox", void 0).setQueryParameter("aroundLatLngViaIP", false).setQueryParameter("aroundLatLng", t4 || void 0);
      }, getRenderState: function(e4, t4) {
        return T(T({}, e4), {}, { places: this.getWidgetRenderState(t4) });
      }, getWidgetRenderState: function() {
        return { widgetParams: e3 };
      } };
    }), Qo = function(e3) {
      var t3 = e3.url, n3 = e3.theme, e3 = e3.cssClasses;
      return M("div", { className: e3.root }, M("a", { href: t3, target: "_blank", className: e3.link, "aria-label": "Search by Algolia", rel: "noopener noreferrer" }, M("svg", { height: "1.2em", className: e3.logo, viewBox: "0 0 572 64", style: { width: "auto" } }, M("path", { fill: "dark" === n3 ? "#FFF" : "#36395A", d: "M16 48.3c-3.4 0-6.3-.6-8.7-1.7A12.4 12.4 0 0 1 1.9 42C.6 40 0 38 0 35.4h6.5a6.7 6.7 0 0 0 3.9 6c1.4.7 3.3 1.1 5.6 1.1 2.2 0 4-.3 5.4-1a7 7 0 0 0 3-2.4 6 6 0 0 0 1-3.4c0-1.5-.6-2.8-1.9-3.7-1.3-1-3.3-1.6-5.9-1.8l-4-.4c-3.7-.3-6.6-1.4-8.8-3.4a10 10 0 0 1-3.3-7.9c0-2.4.6-4.6 1.8-6.4a12 12 0 0 1 5-4.3c2.2-1 4.7-1.6 7.5-1.6s5.5.5 7.6 1.6a12 12 0 0 1 5 4.4c1.2 1.8 1.8 4 1.8 6.7h-6.5a6.4 6.4 0 0 0-3.5-5.9c-1-.6-2.6-1-4.4-1s-3.2.3-4.4 1c-1.1.6-2 1.4-2.6 2.4-.5 1-.8 2-.8 3.1a5 5 0 0 0 1.5 3.6c1 1 2.6 1.7 4.7 1.9l4 .3c2.8.2 5.2.8 7.2 1.8 2.1 1 3.7 2.2 4.9 3.8a9.7 9.7 0 0 1 1.7 5.8c0 2.5-.7 4.7-2 6.6a13 13 0 0 1-5.6 4.4c-2.4 1-5.2 1.6-8.4 1.6Zm35.6 0c-2.6 0-4.8-.4-6.7-1.3a13 13 0 0 1-4.7-3.5 17.1 17.1 0 0 1-3.6-10.4v-1c0-2 .3-3.8 1-5.6a13 13 0 0 1 7.3-8.3 15 15 0 0 1 6.3-1.4A13.2 13.2 0 0 1 64 24.3c1 2.2 1.6 4.6 1.6 7.2V34H39.4v-4.3h21.8l-1.8 2.2c0-2-.3-3.7-.9-5.1a7.3 7.3 0 0 0-2.7-3.4c-1.2-.7-2.7-1.1-4.6-1.1s-3.4.4-4.7 1.3a8 8 0 0 0-2.9 3.6c-.6 1.5-.9 3.3-.9 5.4 0 2 .3 3.7 1 5.3a7.9 7.9 0 0 0 2.8 3.7c1.3.8 3 1.3 5 1.3s3.8-.5 5.1-1.3c1.3-1 2.1-2 2.4-3.2h6a11.8 11.8 0 0 1-7 8.7 16 16 0 0 1-6.4 1.2ZM80 48c-2.2 0-4-.3-5.7-1a8.4 8.4 0 0 1-3.7-3.3 9.7 9.7 0 0 1-1.3-5.2c0-2 .5-3.8 1.5-5.2a9 9 0 0 1 4.3-3.1c1.8-.7 4-1 6.7-1H89v4.1h-7.5c-2 0-3.4.5-4.4 1.4-1 1-1.6 2.1-1.6 3.6s.5 2.7 1.6 3.6c1 1 2.5 1.4 4.4 1.4 1.1 0 2.2-.2 3.2-.7 1-.4 1.9-1 2.6-2 .6-1 1-2.4 1-4.2l1.7 2.1c-.2 2-.7 3.8-1.5 5.2a9 9 0 0 1-3.4 3.3 12 12 0 0 1-5.3 1Zm9.5-.7v-8.8h-1v-10c0-1.8-.5-3.2-1.4-4.1-1-1-2.4-1.4-4.2-1.4a142.9 142.9 0 0 0-10.2.4v-5.6a74.8 74.8 0 0 1 8.6-.4c3 0 5.5.4 7.5 1.2s3.4 2 4.4 3.6c1 1.7 1.4 4 1.4 6.7v18.4h-5Zm12.9 0V17.8h5v12.3h-.2c0-4.2 1-7.4 2.8-9.5a11 11 0 0 1 8.3-3.1h1v5.6h-2a9 9 0 0 0-6.3 2.2c-1.5 1.5-2.2 3.6-2.2 6.4v15.6h-6.4Zm34.4 1a15 15 0 0 1-6.6-1.3c-1.9-.9-3.4-2-4.7-3.5a15.5 15.5 0 0 1-2.7-5c-.6-1.7-1-3.6-1-5.4v-1c0-2 .4-3.8 1-5.6a15 15 0 0 1 2.8-4.9c1.3-1.5 2.8-2.6 4.6-3.5a16.4 16.4 0 0 1 13.3.2c2 1 3.5 2.3 4.8 4a12 12 0 0 1 2 6H144c-.2-1.6-1-3-2.2-4.1a7.5 7.5 0 0 0-5.2-1.7 8 8 0 0 0-4.7 1.3 8 8 0 0 0-2.8 3.6 13.8 13.8 0 0 0 0 10.3c.6 1.5 1.5 2.7 2.8 3.6s2.8 1.3 4.8 1.3c1.5 0 2.7-.2 3.8-.8a7 7 0 0 0 2.6-2c.7-1 1-2 1.2-3.2h6.2a11 11 0 0 1-2 6.2 15.1 15.1 0 0 1-11.8 5.5Zm19.7-1v-40h6.4V31h-1.3c0-3 .4-5.5 1.1-7.6a9.7 9.7 0 0 1 3.5-4.8A9.9 9.9 0 0 1 172 17h.3c3.5 0 6 1.1 7.9 3.5 1.7 2.3 2.6 5.7 2.6 10v16.8h-6.4V29.6c0-2.1-.6-3.8-1.8-5a6.4 6.4 0 0 0-4.8-1.8c-2 0-3.7.7-5 2a7.8 7.8 0 0 0-1.9 5.5v17h-6.4Zm63.8 1a12.2 12.2 0 0 1-10.9-6.2 19 19 0 0 1-1.8-7.3h1.4v12.5h-5.1v-40h6.4v19.8l-2 3.5c.2-3.1.8-5.7 1.9-7.7a11 11 0 0 1 4.4-4.5c1.8-1 3.9-1.5 6.1-1.5a13.4 13.4 0 0 1 12.8 9.1c.7 1.9 1 3.8 1 6v1c0 2.2-.3 4.1-1 6a13.6 13.6 0 0 1-13.2 9.4Zm-1.2-5.5a8.4 8.4 0 0 0 7.9-5c.7-1.5 1.1-3.3 1.1-5.3s-.4-3.8-1.1-5.3a8.7 8.7 0 0 0-3.2-3.6 9.6 9.6 0 0 0-9.2-.2 8.5 8.5 0 0 0-3.3 3.2c-.8 1.4-1.3 3-1.3 5v2.3a9 9 0 0 0 1.3 4.8 9 9 0 0 0 3.4 3c1.4.7 2.8 1 4.4 1Zm27.3 3.9-10-28.9h6.5l9.5 28.9h-6Zm-7.5 12.2v-5.7h4.9c1 0 2-.1 2.9-.4a4 4 0 0 0 2-1.4c.4-.7.9-1.6 1.2-2.7l8.6-30.9h6.2l-9.3 32.4a14 14 0 0 1-2.5 5 8.9 8.9 0 0 1-4 2.8c-1.5.6-3.4.9-5.6.9h-4.4Zm9-12.2v-5.2h6.4v5.2H248Z" }), M("path", { fill: "dark" === n3 ? "#FFF" : "#003DFF", d: "M534.4 9.1H528a.8.8 0 0 1-.7-.7V1.8c0-.4.2-.7.6-.8l6.5-1c.4 0 .8.2.9.6v7.8c0 .4-.4.7-.8.7zM428 35.2V.8c0-.5-.3-.8-.7-.8h-.2l-6.4 1c-.4 0-.7.4-.7.8v35c0 1.6 0 11.8 12.3 12.2.5 0 .8-.4.8-.8V43c0-.4-.3-.7-.6-.8-4.5-.5-4.5-6-4.5-7zm106.5-21.8H528c-.4 0-.7.4-.7.8v34c0 .4.3.8.7.8h6.5c.4 0 .8-.4.8-.8v-34c0-.5-.4-.8-.8-.8zm-17.7 21.8V.8c0-.5-.3-.8-.8-.8l-6.5 1c-.4 0-.7.4-.7.8v35c0 1.6 0 11.8 12.3 12.2.4 0 .8-.4.8-.8V43c0-.4-.3-.7-.7-.8-4.4-.5-4.4-6-4.4-7zm-22.2-20.6a16.5 16.5 0 0 1 8.6 9.3c.8 2.2 1.3 4.8 1.3 7.5a19.4 19.4 0 0 1-4.6 12.6 14.8 14.8 0 0 1-5.2 3.6c-2 .9-5.2 1.4-6.8 1.4a21 21 0 0 1-6.7-1.4 15.4 15.4 0 0 1-8.6-9.3 21.3 21.3 0 0 1 0-14.4 15.2 15.2 0 0 1 8.6-9.3c2-.8 4.3-1.2 6.7-1.2s4.6.4 6.7 1.2zm-6.7 27.6c2.7 0 4.7-1 6.2-3s2.2-4.3 2.2-7.8-.7-6.3-2.2-8.3-3.5-3-6.2-3-4.7 1-6.1 3c-1.5 2-2.2 4.8-2.2 8.3s.7 5.8 2.2 7.8 3.5 3 6.2 3zm-88.8-28.8c-6.2 0-11.7 3.3-14.8 8.2a18.6 18.6 0 0 0 4.8 25.2c1.8 1.2 4 1.8 6.2 1.7s.1 0 .1 0h.9c4.2-.7 8-4 9.1-8.1v7.4c0 .4.3.7.8.7h6.4a.7.7 0 0 0 .7-.7V14.2c0-.5-.3-.8-.7-.8h-13.5zm6.3 26.5a9.8 9.8 0 0 1-5.7 2h-.5a10 10 0 0 1-9.2-14c1.4-3.7 5-6.3 9-6.3h6.4v18.3zm152.3-26.5h13.5c.5 0 .8.3.8.7v33.7c0 .4-.3.7-.8.7h-6.4a.7.7 0 0 1-.8-.7v-7.4c-1.2 4-4.8 7.4-9 8h-.1a4.2 4.2 0 0 1-.5.1h-.9a10.3 10.3 0 0 1-7-2.6c-4-3.3-6.5-8.4-6.5-14.2 0-3.7 1-7.2 3-10 3-5 8.5-8.3 14.7-8.3zm.6 28.4c2.2-.1 4.2-.6 5.7-2V21.7h-6.3a9.8 9.8 0 0 0-9 6.4 10.2 10.2 0 0 0 9.1 13.9h.5zM452.8 13.4c-6.2 0-11.7 3.3-14.8 8.2a18.5 18.5 0 0 0 3.6 24.3 10.4 10.4 0 0 0 13 .6c2.2-1.5 3.8-3.7 4.5-6.1v7.8c0 2.8-.8 5-2.2 6.3-1.5 1.5-4 2.2-7.5 2.2l-6-.3c-.3 0-.7.2-.8.5l-1.6 5.5c-.1.4.1.8.5 1h.1c2.8.4 5.5.6 7 .6 6.3 0 11-1.4 14-4.1 2.7-2.5 4.2-6.3 4.5-11.4V14.2c0-.5-.4-.8-.8-.8h-13.5zm6.3 8.2v18.3a9.6 9.6 0 0 1-5.6 2h-1a10.3 10.3 0 0 1-8.8-14c1.4-3.7 5-6.3 9-6.3h6.4zM291 31.5A32 32 0 0 1 322.8 0h30.8c.6 0 1.2.5 1.2 1.2v61.5c0 1.1-1.3 1.7-2.2 1l-19.2-17a18 18 0 0 1-11 3.4 18.1 18.1 0 1 1 18.2-14.8c-.1.4-.5.7-.9.6-.1 0-.3 0-.4-.2l-3.8-3.4c-.4-.3-.6-.8-.7-1.4a12 12 0 1 0-2.4 8.3c.4-.4 1-.5 1.6-.2l14.7 13.1v-46H323a26 26 0 1 0 10 49.7c.8-.4 1.6-.2 2.3.3l3 2.7c.3.2.3.7 0 1l-.2.2a32 32 0 0 1-47.2-28.6z" }))));
    }, qo = i2("PoweredBy"), Vo = l2({ name: "powered-by" }), Ko = l2({ name: "query-rule-context" }), zo = function(e3) {
      var t3 = e3.cssClasses, n3 = e3.templates, e3 = e3.items;
      return M(v, { templateKey: "default", templates: n3, rootProps: { className: t3.root }, data: { items: e3 } });
    }, Jo = { default: function(e3) {
      e3 = e3.items;
      return JSON.stringify(e3, null, 2);
    } }, Zo = l2({ name: "query-rule-custom-data" }), Yo = i2("QueryRuleCustomData");
    function Xo(e3) {
      return e3.replace(/^(0+)\d/, function(e4) {
        return Number(e4).toString();
      });
    }
    function Go(e3) {
      var t3 = e3.style, e3 = e3.children, n3 = Math.round(parseFloat(t3.left)), r3 = [0, 50, 100].includes(n3), e3 = Math.round(100 * parseInt(e3, 10)) / 100;
      return M("div", { style: T(T({}, t3), {}, { marginLeft: 100 === n3 ? "-2px" : 0 }), className: F("rheostat-marker", "rheostat-marker-horizontal", r3 && "rheostat-marker-large") }, r3 && M("div", { className: "rheostat-value" }, e3));
    }
    var ec = function() {
      U(s3, Ot);
      var a3 = q(s3);
      function s3() {
        var e3, n3;
        W(this, s3);
        for (var t3 = arguments.length, r3 = new Array(t3), i3 = 0; i3 < t3; i3++)
          r3[i3] = arguments[i3];
        return E(y(n3 = a3.call.apply(a3, [this].concat(r3))), "state", { min: null == (e3 = n3.props.values.min) ? void 0 : e3.toString(), max: null == (e3 = n3.props.values.max) ? void 0 : e3.toString() }), E(y(n3), "onInput", function(t4) {
          return function(e4) {
            e4 = e4.currentTarget.value;
            n3.setState(E({}, t4, e4));
          };
        }), E(y(n3), "onSubmit", function(e4) {
          e4.preventDefault();
          var e4 = n3.state, t4 = e4.min, e4 = e4.max;
          n3.props.refine([t4 ? Number(t4) : void 0, e4 ? Number(e4) : void 0]);
        }), n3;
      }
      return D(s3, [{ key: "componentWillReceiveProps", value: function(e3) {
        var t3;
        this.setState({ min: null == (t3 = e3.values.min) ? void 0 : t3.toString(), max: null == (t3 = e3.values.max) ? void 0 : t3.toString() });
      } }, { key: "render", value: function() {
        var e3 = this.state, t3 = e3.min, e3 = e3.max, n3 = this.props, r3 = n3.min, i3 = n3.max, a4 = n3.step, s4 = n3.cssClasses, n3 = n3.templateProps, o3 = !(!r3 || !i3) && i3 <= r3, c2 = Boolean(t3 || e3);
        return M("div", { className: F(s4.root, !c2 && s4.noRefinement) }, M("form", { className: s4.form, onSubmit: this.onSubmit }, M("label", { className: s4.label }, M("input", { className: F(s4.input, s4.inputMin), type: "number", min: r3, max: i3, step: a4, value: Xo(null != t3 ? t3 : ""), onInput: this.onInput("min"), placeholder: null == r3 ? void 0 : r3.toString(), disabled: o3 })), M(v, m({}, n3, { templateKey: "separatorText", rootTagName: "span", rootProps: { className: s4.separator } })), M("label", { className: s4.label }, M("input", { className: F(s4.input, s4.inputMax), type: "number", min: r3, max: i3, step: a4, value: Xo(null != e3 ? e3 : ""), onInput: this.onInput("max"), placeholder: null == i3 ? void 0 : i3.toString(), disabled: o3 })), M(v, m({}, n3, { templateKey: "submitText", rootTagName: "button", rootProps: { type: "submit", className: s4.submit, disabled: o3 } }))));
      } }]), s3;
    }(), tc = l2({ name: "range-input" }), nc = i2("RangeInput"), rc = { separatorText: function() {
      return "to";
    }, submitText: function() {
      return "Go";
    } }, ic = 40, ac = 35, sc = 27, oc = 36, cc = 37, uc = 34, lc = 33, dc = 39, hc = 38, fc = 100;
    function mc(e3, t3, n3) {
      return (e3 - t3) / (n3 - t3) * 100;
    }
    function pc(e3, t3, n3) {
      return 0 === e3 ? t3 : 100 === e3 ? n3 : Math.round((n3 - t3) * (e3 / 100) + t3);
    }
    function gc(e3) {
      return ["rheostat", "vertical" === e3.orientation ? "rheostat-vertical" : "rheostat-horizontal"].concat(e3.className.split(" ")).join(" ");
    }
    function vc(e3) {
      return Number(e3.currentTarget.getAttribute("data-handle-key"));
    }
    function yc(e3) {
      e3.stopPropagation(), e3.preventDefault();
    }
    var bc = M("div", { className: "rheostat-background" }), Rc = function() {
      U(i3, Ot);
      var r3 = q(i3);
      function i3() {
        var f2;
        W(this, i3);
        for (var e3 = arguments.length, t3 = new Array(e3), n3 = 0; n3 < e3; n3++)
          t3[n3] = arguments[n3];
        return E(y(f2 = r3.call.apply(r3, [this].concat(t3))), "x", [0, 0].map(function(e4) {
          return e4;
        })), E(y(f2), "state", { className: gc(f2.props), handlePos: f2.props.values.map(function(e4) {
          return mc(e4, f2.props.min, f2.props.max);
        }), handleDimensions: 0, mousePos: null, sliderBox: {}, slidingIndex: null, values: f2.props.values }), E(y(f2), "rheostat", Lt()), E(y(f2), "componentWillReceiveProps", function(n4) {
          var e4 = f2.props, t4 = e4.className, r4 = e4.disabled, i4 = e4.min, a3 = e4.max, e4 = e4.orientation, s3 = f2.state, o3 = s3.values, s3 = s3.slidingIndex, i4 = n4.min !== i4 || n4.max !== a3, a3 = o3.length !== n4.values.length || o3.some(function(e5, t5) {
            return n4.values[t5] !== e5;
          }), o3 = n4.className !== t4 || n4.orientation !== e4, t4 = n4.disabled && !r4;
          o3 && f2.setState({ className: gc(n4) }), (i4 || a3) && f2.updateNewValues(n4), t4 && null !== s3 && f2.endSlide();
        }), E(y(f2), "getPublicState", function() {
          var e4 = f2.props, t4 = e4.min;
          return { max: e4.max, min: t4, values: f2.state.values };
        }), E(y(f2), "getSliderBoundingBox", function() {
          var e4 = f2.rheostat.current, t4 = e4.getBoundingClientRect();
          return { height: t4.height || e4.clientHeight, left: t4.left, top: t4.top, width: t4.width || e4.clientWidth };
        }), E(y(f2), "getProgressStyle", function(e4) {
          var t4 = f2.state.handlePos, n4 = t4[e4];
          return 0 === e4 ? "vertical" === f2.props.orientation ? { height: "".concat(n4, "%"), top: 0 } : { left: 0, width: "".concat(n4, "%") } : (t4 = n4 - (n4 = t4[e4 - 1]), "vertical" === f2.props.orientation ? { height: "".concat(t4, "%"), top: "".concat(n4, "%") } : { left: "".concat(n4, "%"), width: "".concat(t4, "%") });
        }), E(y(f2), "getMinValue", function(e4) {
          return f2.state.values[e4 - 1] ? Math.max(f2.props.min, f2.state.values[e4 - 1]) : f2.props.min;
        }), E(y(f2), "getMaxValue", function(e4) {
          return f2.state.values[e4 + 1] ? Math.min(f2.props.max, f2.state.values[e4 + 1]) : f2.props.max;
        }), E(y(f2), "getHandleDimensions", function(e4, t4) {
          e4 = e4.currentTarget || null;
          return e4 ? "vertical" === f2.props.orientation ? e4.clientHeight / t4.height * fc / 2 : e4.clientWidth / t4.width * fc / 2 : 0;
        }), E(y(f2), "getClosestSnapPoint", function(n4) {
          return f2.props.snapPoints.length ? f2.props.snapPoints.reduce(function(e4, t4) {
            return Math.abs(e4 - n4) < Math.abs(t4 - n4) ? e4 : t4;
          }) : n4;
        }), E(y(f2), "getSnapPosition", function(e4) {
          var t4, n4, r4;
          return f2.props.snap ? (t4 = (n4 = f2.props).max, r4 = pc(e4, n4 = n4.min, t4), mc(f2.getClosestSnapPoint(r4), n4, t4)) : e4;
        }), E(y(f2), "getNextPositionForKey", function(e4, t4) {
          var n4 = f2.state, r4 = n4.handlePos, n4 = n4.values, i4 = f2.props, a3 = i4.max, s3 = i4.min, i4 = i4.snapPoints, o3 = f2.props.snap, c2 = n4[e4], r4 = r4[e4], u2 = r4, l3 = 1, d2 = (100 <= a3 ? r4 = Math.round(r4) : l3 = 100 / (a3 - s3), null), e4 = (o3 && (d2 = i4.indexOf(f2.getClosestSnapPoint(n4[e4]))), E(n4 = {}, cc, function(e5) {
            return -1 * e5;
          }), E(n4, dc, function(e5) {
            return e5;
          }), E(n4, hc, function(e5) {
            return e5;
          }), E(n4, ic, function(e5) {
            return -1 * e5;
          }), E(n4, uc, function(e5) {
            return 1 < e5 ? -e5 : -10 * e5;
          }), E(n4, lc, function(e5) {
            return 1 < e5 ? e5 : 10 * e5;
          }), n4);
          if (Object.prototype.hasOwnProperty.call(e4, t4))
            r4 += e4[t4](l3), o3 && d2 && (u2 < r4 ? d2 < i4.length - 1 && (c2 = i4[d2 + 1]) : 0 < d2 && (c2 = i4[d2 - 1]));
          else if (t4 === oc)
            r4 = 0, o3 && (c2 = i4[0]);
          else {
            if (t4 !== ac)
              return null;
            r4 = fc, o3 && (c2 = i4[i4.length - 1]);
          }
          return o3 ? mc(c2, s3, a3) : r4;
        }), E(y(f2), "getNextState", function(n4, e4) {
          var t4 = f2.state.handlePos, r4 = f2.props, i4 = r4.max, a3 = r4.min, s3 = f2.validatePosition(n4, e4), r4 = t4.map(function(e5, t5) {
            return t5 === n4 ? s3 : e5;
          });
          return { handlePos: r4, values: r4.map(function(e5) {
            return pc(e5, a3, i4);
          }) };
        }), E(y(f2), "getClosestHandle", function(r4) {
          var i4 = f2.state.handlePos;
          return i4.reduce(function(e4, t4, n4) {
            return Math.abs(i4[n4] - r4) < Math.abs(i4[e4] - r4) ? n4 : e4;
          }, 0);
        }), E(y(f2), "setStartSlide", function(e4, t4, n4) {
          var r4 = f2.getSliderBoundingBox();
          f2.setState({ handleDimensions: f2.getHandleDimensions(e4, r4), mousePos: { x: t4, y: n4 }, sliderBox: r4, slidingIndex: vc(e4) });
        }), E(y(f2), "startMouseSlide", function(e4) {
          f2.setStartSlide(e4, e4.clientX, e4.clientY), document.addEventListener("mousemove", f2.handleMouseSlide, false), document.addEventListener("mouseup", f2.endSlide, false), yc(e4);
        }), E(y(f2), "startTouchSlide", function(e4) {
          var t4;
          1 < e4.changedTouches.length || (t4 = e4.changedTouches[0], f2.setStartSlide(e4, t4.clientX, t4.clientY), document.addEventListener("touchmove", f2.handleTouchSlide, false), document.addEventListener("touchend", f2.endSlide, false), f2.props.onSliderDragStart && f2.props.onSliderDragStart(), yc(e4));
        }), E(y(f2), "handleMouseSlide", function(e4) {
          null !== f2.state.slidingIndex && (f2.handleSlide(e4.clientX, e4.clientY), yc(e4));
        }), E(y(f2), "handleTouchSlide", function(e4) {
          var t4;
          null !== f2.state.slidingIndex && (1 < e4.changedTouches.length ? f2.endSlide() : (t4 = e4.changedTouches[0], f2.handleSlide(t4.clientX, t4.clientY), yc(e4)));
        }), E(y(f2), "handleSlide", function(e4, t4) {
          var n4 = f2.state, r4 = n4.slidingIndex, n4 = n4.sliderBox, n4 = "vertical" === f2.props.orientation ? (t4 - n4.top) / n4.height * fc : (e4 - n4.left) / n4.width * fc;
          f2.slideTo(r4, n4), f2.canMove(r4, n4) && (f2.setState({ mousePos: { x: e4, y: t4 } }), f2.props.onSliderDragMove) && f2.props.onSliderDragMove();
        }), E(y(f2), "endSlide", function() {
          var e4, t4 = f2.state.slidingIndex;
          f2.setState({ slidingIndex: null }), document.removeEventListener("mouseup", f2.endSlide, false), document.removeEventListener("touchend", f2.endSlide, false), document.removeEventListener("touchmove", f2.handleTouchSlide, false), document.removeEventListener("mousemove", f2.handleMouseSlide, false), f2.props.onSliderDragEnd && f2.props.onSliderDragEnd(), f2.props.snap ? (e4 = f2.getSnapPosition(f2.state.handlePos[t4]), f2.slideTo(t4, e4, function() {
            return f2.fireChangeEvent();
          })) : f2.fireChangeEvent();
        }), E(y(f2), "handleClick", function(e4) {
          var t4;
          e4.target.getAttribute("data-handle-key") || (t4 = f2.getSliderBoundingBox(), e4 = ("vertical" === f2.props.orientation ? (e4.clientY - t4.top) / t4.height : (e4.clientX - t4.left) / t4.width) * fc, t4 = f2.getClosestHandle(e4), e4 = f2.getSnapPosition(e4), f2.slideTo(t4, e4, function() {
            return f2.fireChangeEvent();
          }), f2.props.onClick && f2.props.onClick());
        }), E(y(f2), "handleKeydown", function(e4) {
          var t4, n4 = vc(e4);
          e4.keyCode === sc ? e4.currentTarget.blur() : null !== (t4 = f2.getNextPositionForKey(n4, e4.keyCode)) && (f2.canMove(n4, t4) && (f2.slideTo(n4, t4, function() {
            return f2.fireChangeEvent();
          }), f2.props.onKeyPress) && f2.props.onKeyPress(), yc(e4));
        }), E(y(f2), "validatePosition", function(e4, t4) {
          var n4 = f2.state, r4 = n4.handlePos, n4 = n4.handleDimensions;
          return Math.max(Math.min(t4, void 0 !== r4[e4 + 1] ? r4[e4 + 1] - n4 : fc), void 0 !== r4[e4 - 1] ? r4[e4 - 1] + n4 : 0);
        }), E(y(f2), "validateValues", function(e4, t4) {
          var t4 = t4 || f2.props, r4 = t4.max, i4 = t4.min;
          return e4.map(function(e5, t5, n4) {
            e5 = Math.max(Math.min(e5, r4), i4);
            return n4.length && e5 < n4[t5 - 1] ? n4[t5 - 1] : e5;
          });
        }), E(y(f2), "canMove", function(e4, t4) {
          var n4 = f2.state, r4 = n4.handlePos, n4 = n4.handleDimensions;
          return !(t4 < 0 || fc < t4 || (void 0 !== r4[e4 + 1] ? r4[e4 + 1] - n4 : 1 / 0) < t4 || t4 < (void 0 !== r4[e4 - 1] ? r4[e4 - 1] + n4 : -1 / 0));
        }), E(y(f2), "fireChangeEvent", function() {
          var e4 = f2.props.onChange;
          e4 && e4(f2.getPublicState());
        }), E(y(f2), "slideTo", function(e4, t4, n4) {
          e4 = f2.getNextState(e4, t4);
          f2.setState(e4, function() {
            var e5 = f2.props.onValuesUpdated;
            e5 && e5(f2.getPublicState()), n4 && n4();
          });
        }), E(y(f2), "updateNewValues", function(e4) {
          var t4, n4, r4;
          null === f2.state.slidingIndex && (t4 = e4.max, n4 = e4.min, r4 = e4.values, r4 = f2.validateValues(r4, e4), f2.setState({ handlePos: r4.map(function(e5) {
            return mc(e5, n4, t4);
          }), values: r4 }, function() {
            return f2.fireChangeEvent();
          }));
        }), E(y(f2), "render", function() {
          var e4 = f2.props, t4 = e4.children, n4 = e4.disabled, r4 = e4.handle, i4 = e4.max, a3 = e4.min, s3 = e4.orientation, o3 = e4.pitComponent, c2 = e4.pitPoints, u2 = e4.progressBar, e4 = f2.state, l3 = e4.className, d2 = e4.handlePos, h2 = e4.values;
          return M("div", { className: l3, ref: f2.rheostat, onClick: n4 ? void 0 : f2.handleClick, style: { position: "relative" } }, bc, d2.map(function(e5, t5) {
            e5 = "vertical" === s3 ? { top: "".concat(e5, "%"), position: "absolute" } : { left: "".concat(e5, "%"), position: "absolute" };
            return M(r4, { "aria-valuemax": f2.getMaxValue(t5), "aria-valuemin": f2.getMinValue(t5), "aria-valuenow": h2[t5], "aria-disabled": n4, "data-handle-key": t5, className: "rheostat-handle", key: "handle-".concat(t5), onClick: yc, onKeyDown: n4 ? void 0 : f2.handleKeydown, onMouseDown: n4 ? void 0 : f2.startMouseSlide, onTouchStart: n4 ? void 0 : f2.startTouchSlide, role: "slider", style: e5, tabIndex: 0 });
          }), d2.map(function(e5, t5, n5) {
            return 0 === t5 && 1 < n5.length ? null : M(u2, { className: "rheostat-progress", key: "progress-bar-".concat(t5), style: f2.getProgressStyle(t5) });
          }), o3 && c2.map(function(e5) {
            var t5 = mc(e5, a3, i4), t5 = "vertical" === s3 ? { top: "".concat(t5, "%"), position: "absolute" } : { left: "".concat(t5, "%"), position: "absolute" };
            return M(o3, { key: "pit-".concat(e5), style: t5 }, e5);
          }), t4);
        }), f2;
      }
      return D(i3);
    }(), Sc = (E(Rc, "defaultProps", { className: "", children: null, disabled: false, handle: function(e3) {
      return M("button", m({}, e3, { type: "button" }));
    }, max: fc, min: 0, onClick: null, onChange: null, onKeyPress: null, onSliderDragEnd: null, onSliderDragMove: null, onSliderDragStart: null, onValuesUpdated: null, orientation: "horizontal", pitComponent: null, pitPoints: [], progressBar: "div", snap: false, snapPoints: [], values: [0] }), function() {
      U(a3, Ot);
      var i3 = q(a3);
      function a3() {
        var t3;
        W(this, a3);
        for (var e3 = arguments.length, n3 = new Array(e3), r3 = 0; r3 < e3; r3++)
          n3[r3] = arguments[r3];
        return E(y(t3 = i3.call.apply(i3, [this].concat(n3))), "handleChange", function(e4) {
          e4 = e4.values;
          t3.isDisabled || t3.props.refine(e4);
        }), E(y(t3), "createHandleComponent", function(n4) {
          return function(e4) {
            var t4 = Math.round(100 * parseFloat(e4["aria-valuenow"])) / 100, t4 = "object" === A(n4) && n4.format ? n4.format(t4) : t4;
            return M("div", m({}, e4, { className: F(e4.className, 0 === e4["data-handle-key"] && "rheostat-handle-lower", 1 === e4["data-handle-key"] && "rheostat-handle-upper"), "aria-label": 0 === e4["data-handle-key"] ? "Minimum Filter Handle" : "Maximum Filter Handle" }), n4 && M("div", { className: "rheostat-tooltip" }, t4));
          };
        }), t3;
      }
      return D(a3, [{ key: "isDisabled", get: function() {
        return this.props.min >= this.props.max;
      } }, { key: "computeDefaultPitPoints", value: function(e3) {
        var t3 = e3.min, e3 = e3.max, n3 = (e3 - t3) / 34;
        return [t3].concat(w(Ge({ end: 33 }).map(function(e4) {
          return t3 + n3 * (e4 + 1);
        })), [e3]);
      } }, { key: "computeSnapPoints", value: function(e3) {
        var t3 = e3.min, n3 = e3.max, e3 = e3.step;
        if (e3)
          return [].concat(w(Ge({ start: t3, end: n3, step: e3 })), [n3]);
      } }, { key: "render", value: function() {
        var e3 = this.props, t3 = e3.tooltips, n3 = e3.step, r3 = e3.pips, i4 = e3.values, e3 = e3.cssClasses, a4 = this.isDisabled ? { min: this.props.min, max: this.props.max + 1e-3 } : this.props, s3 = a4.min, a4 = a4.max, n3 = this.computeSnapPoints({ min: s3, max: a4, step: n3 }), r3 = false === r3 ? [] : this.computeDefaultPitPoints({ min: s3, max: a4 });
        return M("div", { className: F(e3.root, this.isDisabled && e3.disabledRoot) }, M(Rc, { handle: this.createHandleComponent(t3), onChange: this.handleChange, min: s3, max: a4, pitComponent: Go, pitPoints: r3, snap: true, snapPoints: n3, values: this.isDisabled ? [s3, a4] : i4, disabled: this.isDisabled }));
      } }]), a3;
    }()), _c = l2({ name: "range-slider" }), wc = i2("RangeSlider");
    function Pc(e3) {
      var t3 = e3.children, n3 = e3.count, r3 = e3.value, i3 = e3.url, e3 = e3.cssClasses;
      return n3 ? M("a", { className: F(e3.link), "aria-label": "".concat(r3, " & up"), href: i3 }, t3) : M("div", { className: F(e3.link), "aria-label": "".concat(r3, " & up"), disabled: true }, t3);
    }
    var Nc = { item: function(e3) {
      var t3 = e3.count, n3 = e3.value, r3 = e3.url, i3 = e3.stars, a3 = e3.cssClasses;
      return M(Pc, { count: t3, value: n3, url: r3, cssClasses: a3 }, i3.map(function(e4, t4) {
        return M("svg", { key: t4, className: F(a3.starIcon, e4 ? a3.fullStarIcon : a3.emptyStarIcon), "aria-hidden": "true", width: "24", height: "24" }, M("use", { xlinkHref: e4 ? "#ais-RatingMenu-starSymbol" : "#ais-RatingMenu-starEmptySymbol" }));
      }), M("span", { className: F(a3.label) }, "& Up"), t3 && M("span", { className: F(a3.count) }, ua(t3)));
    } }, xc = l2({ name: "rating-menu" }), C = i2("RatingMenu"), Ic = M("path", { d: "M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" }), Fc = M("path", { d: "M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z" }), Cc = M("path", { d: "M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z" }), Tc = M("path", { d: "M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z" }), Ec = M("g", { fill: "none", "fill-rule": "evenodd" }, M("g", { transform: "translate(1 1)", "stroke-width": "2" }, M("circle", { "stroke-opacity": ".5", cx: "18", cy: "18", r: "18" }), M("path", { d: "M36 18c0-9.94-8.06-18-18-18" }, M("animateTransform", { attributeName: "transform", type: "rotate", from: "0 18 18", to: "360 18 18", dur: "1s", repeatCount: "indefinite" })))), kc = { reset: function(e3) {
      return M("svg", { className: e3.cssClasses.resetIcon, viewBox: "0 0 20 20", width: "10", height: "10", "aria-hidden": "true" }, Cc);
    }, submit: function(e3) {
      return M("svg", { className: e3.cssClasses.submitIcon, width: "10", height: "10", viewBox: "0 0 40 40", "aria-hidden": "true" }, Tc);
    }, loadingIndicator: function(e3) {
      return M("svg", { "aria-label": "Results are loading", className: e3.cssClasses.loadingIcon, width: "16", height: "16", viewBox: "0 0 38 38", stroke: "#444", "aria-hidden": "true" }, Ec);
    } }, jc = { item: function(e3) {
      var t3 = e3.cssClasses, n3 = e3.count, r3 = e3.value, i3 = e3.highlighted, a3 = e3.isRefined, e3 = e3.isFromSearch;
      return M("label", { className: F(t3.label) }, M("input", { type: "checkbox", className: F(t3.checkbox), value: r3, defaultChecked: a3 }), M("span", { className: F(t3.labelText), dangerouslySetInnerHTML: e3 ? { __html: i3 } : void 0 }, !e3 && i3), M("span", { className: F(t3.count) }, ua(n3)));
    }, showMoreText: function(e3) {
      return e3.isShowingMore ? "Show less" : "Show more";
    }, searchableNoResults: function() {
      return "No results";
    } }, Mc = l2({ name: "refinement-list" }), H = i2("RefinementList"), Lc = i2("SearchBox"), Oc = function(e3) {
      var t3 = e3.cssClasses, n3 = e3.templates, r3 = e3.isRelevantSorted, i3 = e3.isVirtualReplica, a3 = e3.refine;
      return i3 ? M("div", { className: t3.root }, M(v, { templateKey: "text", templates: n3, rootProps: { className: t3.text }, data: { isRelevantSorted: r3 } }), M("button", { type: "button", className: t3.button, onClick: function() {
        a3(r3 ? 0 : void 0);
      } }, M(v, { rootTagName: "span", templateKey: "button", templates: n3, data: { isRelevantSorted: r3 } }))) : null;
    }, Hc = { text: function() {
      return "";
    }, button: function(e3) {
      return e3.isRelevantSorted ? "See all results" : "See relevant results";
    } }, Ac = l2({ name: "relevant-sort" }), Wc = i2("RelevantSort"), Dc = l2({ name: "search-box" }), Uc = i2("SearchBox"), $c = l2({ name: "sort-by" }), Bc = i2("SortBy"), Qc = ["nbHits", "nbSortedHits", "cssClasses", "templateProps"], qc = function(e3) {
      var t3 = e3.nbHits, n3 = e3.nbSortedHits, r3 = e3.cssClasses, i3 = e3.templateProps, e3 = k(e3, Qc);
      return M("div", { className: F(r3.root) }, M(v, m({}, i3, { templateKey: "text", rootTagName: "span", rootProps: { className: r3.text }, data: T({ hasManySortedResults: n3 && 1 < n3, hasNoSortedResults: 0 === n3, hasOneSortedResults: 1 === n3, hasManyResults: 1 < t3, hasNoResults: 0 === t3, hasOneResult: 1 === t3, nbHits: t3, nbSortedHits: n3, cssClasses: r3 }, e3) })));
    }, Vc = l2({ name: "stats" }), Kc = i2("Stats"), zc = { text: function(e3) {
      return "".concat((e3.areHitsSorted ? function(e4) {
        var t3 = e4.nbHits, n3 = e4.hasNoSortedResults, r3 = e4.hasOneSortedResults, i3 = e4.hasManySortedResults, e4 = e4.nbSortedHits, t3 = "sorted out of ".concat(ua(t3));
        if (n3)
          return "No relevant results ".concat(t3);
        if (r3)
          return "1 relevant result ".concat(t3);
        if (i3)
          return "".concat(ua(e4 || 0), " relevant results ").concat(t3);
        return "";
      } : function(e4) {
        var t3 = e4.nbHits, n3 = e4.hasNoResults, r3 = e4.hasOneResult, e4 = e4.hasManyResults;
        if (n3)
          return "No results";
        if (r3)
          return "1 result";
        if (e4)
          return "".concat(ua(t3), " results");
        return "";
      })(e3), " found in ").concat(e3.processingTimeMS, "ms");
    } };
    function Jc(e3) {
      var t3 = e3.status, n3 = e3.errorCode, e3 = e3.isListening;
      return "error" === t3 && "not-allowed" === n3 ? tu : M(x, null, M("path", { d: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z", fill: e3 ? "currentColor" : "none" }), nu, ru, iu);
    }
    function a2(e3) {
      return new fa(e3);
    }
    var Zc = function(e3) {
      var t3 = e3.currentRefinement, n3 = e3.refine, r3 = e3.cssClasses, e3 = e3.templateProps;
      return M("div", { className: r3.root }, M("label", { className: r3.label }, M("input", { className: r3.checkbox, type: "checkbox", checked: t3.isRefined, onChange: function(e4) {
        return n3({ isRefined: !e4.target.checked });
      } }), M(v, m({}, e3, { rootTagName: "span", rootProps: { className: r3.labelText }, templateKey: "labelText", data: t3 }))));
    }, Yc = { labelText: function(e3) {
      return e3.name;
    } }, Xc = l2({ name: "toggle-refinement" }), Gc = i2("ToggleRefinement"), eu = function(e3) {
      var t3 = e3.cssClasses, n3 = e3.isBrowserSupported, r3 = e3.isListening, i3 = e3.toggleListening, a3 = e3.voiceListeningState, e3 = e3.templates, s3 = a3.status, o3 = a3.transcript, c2 = a3.isSpeechFinal, a3 = a3.errorCode;
      return M("div", { className: t3.root }, M(v, { templateKey: "buttonText", rootTagName: "button", rootProps: { className: t3.button, type: "button", title: "Search by voice".concat(n3 ? "" : " (not supported on this browser)"), onClick: function(e4) {
        e4.currentTarget instanceof HTMLElement && e4.currentTarget.blur(), i3();
      }, disabled: !n3 }, data: { status: s3, errorCode: a3, isListening: r3, transcript: o3, isSpeechFinal: c2, isBrowserSupported: n3 }, templates: e3 }), M(v, { templateKey: "status", rootProps: { className: t3.status }, data: { status: s3, errorCode: a3, isListening: r3, transcript: o3, isSpeechFinal: c2, isBrowserSupported: n3 }, templates: e3 }));
    }, tu = M(x, null, M("line", { x1: "1", y1: "1", x2: "23", y2: "23" }), M("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" }), M("path", { d: "M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" }), M("line", { x1: "12", y1: "19", x2: "12", y2: "23" }), M("line", { x1: "8", y1: "23", x2: "16", y2: "23" })), nu = M("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }), ru = M("line", { x1: "12", y1: "19", x2: "12", y2: "23" }), iu = M("line", { x1: "8", y1: "23", x2: "16", y2: "23" }), au = { buttonText: function(e3) {
      var t3 = e3.status, n3 = e3.errorCode, e3 = e3.isListening;
      return M("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, M(Jc, { status: t3, errorCode: n3, isListening: e3 }));
    }, status: function(e3) {
      return M("p", null, e3.transcript);
    } }, su = l2({ name: "voice-search" }), ou = i2("VoiceSearch"), e2 = J(e2), cu = J(os), e2 = Object.freeze({ __proto__: null, EXPERIMENTAL_answers: e2, EXPERIMENTAL_dynamicWidgets: cu, dynamicWidgets: os, analytics: function(e3) {
      var n3, i3, a3, s3, r3, o3, c2, t3, u2, l3 = e3 || {}, d2 = l3.pushFunction, h2 = l3.delay, f2 = void 0 === h2 ? 3e3 : h2, h2 = l3.triggerOnUIInteraction, m2 = void 0 !== h2 && h2, h2 = l3.pushInitialSearch, l3 = l3.pushPagination, p2 = void 0 !== l3 && l3;
      if (d2)
        return n3 = null, i3 = function(e4) {
          var t4, n4, r4 = [];
          for (t4 in e4)
            e4.hasOwnProperty(t4) && (n4 = e4[t4].join("+"), r4.push("".concat(encodeURIComponent(t4), "=").concat(encodeURIComponent(t4), "_").concat(encodeURIComponent(n4))));
          return r4.join("&");
        }, a3 = function(e4) {
          var t4, n4 = [];
          for (t4 in e4)
            if (e4.hasOwnProperty(t4)) {
              var r4 = e4[t4];
              if (r4.hasOwnProperty(">=") && r4.hasOwnProperty("<="))
                r4[">="] && r4[">="][0] === r4["<="] && r4["<="][0] ? n4.push("".concat(t4, "=").concat(t4, "_").concat(r4[">="])) : n4.push("".concat(t4, "=").concat(t4, "_").concat(r4[">="], "to").concat(r4["<="]));
              else if (r4.hasOwnProperty(">="))
                n4.push("".concat(t4, "=").concat(t4, "_from").concat(r4[">="]));
              else if (r4.hasOwnProperty("<="))
                n4.push("".concat(t4, "=").concat(t4, "_to").concat(r4["<="]));
              else if (r4.hasOwnProperty("=")) {
                var i4, a4 = [];
                for (i4 in r4["="])
                  r4["="].hasOwnProperty(i4) && a4.push(r4["="][i4]);
                n4.push("".concat(t4, "=").concat(t4, "_").concat(a4.join("-")));
              }
            }
          return n4.join("&");
        }, r3 = function(e4) {
          var t4, n4, r4;
          null !== e4 && (t4 = [], n4 = i3(T(T(T({}, e4.state.disjunctiveFacetsRefinements), e4.state.facetsRefinements), e4.state.hierarchicalFacetsRefinements)), r4 = a3(e4.state.numericRefinements), "" !== n4 && t4.push(n4), "" !== r4 && t4.push(r4), n4 = t4.join("&"), r4 = "Query: ".concat(e4.state.query || "", ", ").concat(n4), true === p2 && (r4 += ", Page: ".concat(e4.state.page || 0)), s3 !== r4) && (d2(n4, e4.state, e4.results), s3 = r4);
        }, c2 = !(s3 = "") === (void 0 === h2 || h2) ? false : true, t3 = function() {
          r3(n3);
        }, u2 = function() {
          r3(n3);
        }, { $$type: "ais.analytics", $$widgetType: "ais.analytics", init: function() {
          true === m2 && (document.addEventListener("click", t3), window.addEventListener("beforeunload", u2));
        }, render: function(e4) {
          var t4 = e4.results, e4 = e4.state;
          true === c2 ? c2 = false : (n3 = { results: t4, state: e4 }, o3 && clearTimeout(o3), o3 = window.setTimeout(function() {
            return r3(n3);
          }, f2));
        }, dispose: function() {
          true === m2 && (document.removeEventListener("click", t3), window.removeEventListener("beforeunload", u2));
        }, getRenderState: function(e4, t4) {
          return T(T({}, e4), {}, { analytics: this.getWidgetRenderState(t4) });
        }, getWidgetRenderState: function() {
          return { widgetParams: e3 };
        } };
      throw new Error(hs("The `pushFunction` option is required."));
    }, breadcrumb: function(e3) {
      var t3, s3, o3, c2, u2, e3 = e3 || {}, n3 = e3.container, r3 = e3.attributes, i3 = e3.separator, a3 = e3.rootPath, l3 = e3.transformItems, d2 = e3.templates, d2 = void 0 === d2 ? {} : d2, e3 = e3.cssClasses, e3 = void 0 === e3 ? {} : e3;
      if (n3)
        return t3 = P(n3), n3 = { root: F(gs(), e3.root), noRefinementRoot: F(gs({ modifierName: "noRefinement" }), e3.noRefinementRoot), list: F(gs({ descendantName: "list" }), e3.list), item: F(gs({ descendantName: "item" }), e3.item), selectedItem: F(gs({ descendantName: "item", modifierName: "selected" }), e3.selectedItem), separator: F(gs({ descendantName: "separator" }), e3.separator), link: F(gs({ descendantName: "link" }), e3.link) }, s3 = (e3 = { containerNode: t3, cssClasses: n3, renderState: {}, templates: d2 }).containerNode, o3 = e3.cssClasses, c2 = e3.renderState, u2 = e3.templates, T(T({}, Dn(function(e4, t4) {
          var n4 = e4.canRefine, r4 = e4.createURL, i4 = e4.instantSearchInstance, a4 = e4.items, e4 = e4.refine;
          t4 ? c2.templateProps = O({ defaultTemplates: ms, templatesConfig: i4.templatesConfig, templates: u2 }) : L(M(fs, { canRefine: n4, cssClasses: o3, createURL: r4, items: a4, refine: e4, templateProps: c2.templateProps }), s3);
        }, function() {
          return L(null, t3);
        })({ attributes: r3, separator: i3, rootPath: a3, transformItems: l3 })), {}, { $$widgetType: "ais.breadcrumb" });
      throw new Error(ps("The `container` option is required."));
    }, clearRefinements: function(e3) {
      var t3, i3, a3, s3, o3, e3 = e3 || {}, n3 = e3.container, r3 = e3.templates, r3 = void 0 === r3 ? {} : r3, c2 = e3.includedAttributes, u2 = e3.excludedAttributes, l3 = e3.transformItems, e3 = e3.cssClasses, e3 = void 0 === e3 ? {} : e3;
      if (n3)
        return t3 = P(n3), n3 = { root: F(Rs(), e3.root), button: F(Rs({ descendantName: "button" }), e3.button), disabledButton: F(Rs({ descendantName: "button", modifierName: "disabled" }), e3.disabledButton) }, i3 = (e3 = { containerNode: t3, cssClasses: n3, renderState: {}, templates: r3 }).containerNode, a3 = e3.cssClasses, s3 = e3.renderState, o3 = e3.templates, T(T({}, ot(function(e4, t4) {
          var n4 = e4.refine, r4 = e4.canRefine, e4 = e4.instantSearchInstance;
          t4 ? s3.templateProps = O({ defaultTemplates: ys, templatesConfig: e4.templatesConfig, templates: o3 }) : L(M(vs, { refine: n4, cssClasses: a3, hasRefinements: r4, templateProps: s3.templateProps }), i3);
        }, function() {
          return L(null, t3);
        })({ includedAttributes: c2, excludedAttributes: u2, transformItems: l3 })), {}, { $$widgetType: "ais.clearRefinements" });
      throw new Error(bs("The `container` option is required."));
    }, configure: function(e3) {
      return T(T({}, Qr(R)({ searchParameters: e3 })), {}, { $$widgetType: "ais.configure" });
    }, currentRefinements: function(e3) {
      var t3, e3 = e3 || {}, n3 = e3.container, r3 = e3.includedAttributes, i3 = e3.excludedAttributes, a3 = e3.cssClasses, a3 = void 0 === a3 ? {} : a3, e3 = e3.transformItems;
      if (n3)
        return t3 = P(n3), n3 = { root: F(ws(), a3.root), noRefinementRoot: F(ws({ modifierName: "noRefinement" }), a3.noRefinementRoot), list: F(ws({ descendantName: "list" }), a3.list), item: F(ws({ descendantName: "item" }), a3.item), label: F(ws({ descendantName: "label" }), a3.label), category: F(ws({ descendantName: "category" }), a3.category), categoryLabel: F(ws({ descendantName: "categoryLabel" }), a3.categoryLabel), delete: F(ws({ descendantName: "delete" }), a3.delete) }, T(T({}, dt(cs, function() {
          return L(null, t3);
        })({ container: t3, cssClasses: n3, includedAttributes: r3, excludedAttributes: i3, transformItems: e3 })), {}, { $$widgetType: "ais.currentRefinements" });
      throw new Error(_s("The `container` option is required."));
    }, EXPERIMENTAL_configureRelatedItems: function(e3) {
      return T(T({}, Kr(R)(e3)), {}, { $$widgetType: "ais.configureRelatedItems" });
    }, geoSearch: function(e3) {
      var t3, n3, r3, i3, a3, u2, e3 = e3 || {}, s3 = e3.initialZoom, s3 = void 0 === s3 ? 1 : s3, o3 = e3.initialPosition, o3 = void 0 === o3 ? { lat: 0, lng: 0 } : o3, c2 = e3.templates, c2 = void 0 === c2 ? {} : c2, l3 = e3.cssClasses, l3 = void 0 === l3 ? {} : l3, d2 = e3.builtInMarker, d2 = void 0 === d2 ? {} : d2, h2 = e3.customHTMLMarker, f2 = e3.enableRefine, f2 = void 0 === f2 || f2, m2 = e3.enableClearMapRefinement, m2 = void 0 === m2 || m2, p2 = e3.enableRefineControl, p2 = void 0 === p2 || p2, g2 = e3.container, v2 = e3.googleReference, e3 = k(e3, Es);
      if (!g2)
        throw new Error(Ms("The `container` option is required."));
      if (v2)
        return t3 = P(g2), g2 = { root: F(Ls(), l3.root), tree: Ls({ descendantName: "tree" }), map: F(Ls({ descendantName: "map" }), l3.map), control: F(Ls({ descendantName: "control" }), l3.control), label: F(Ls({ descendantName: "label" }), l3.label), selectedLabel: F(Ls({ descendantName: "label", modifierName: "selected" }), l3.selectedLabel), input: F(Ls({ descendantName: "input" }), l3.input), redo: F(Ls({ descendantName: "redo" }), l3.redo), disabledRedo: F(Ls({ descendantName: "redo", modifierName: "disabled" }), l3.disabledRedo), reset: F(Ls({ descendantName: "reset" }), l3.reset) }, n3 = T(T({}, Ns), c2), r3 = T(T({}, { createOptions: function() {
          return {};
        }, events: {} }), d2), i3 = (Boolean(h2) || Boolean(c2.HTMLMarker)) && T(T({}, { createOptions: function() {
          return {};
        }, events: {} }), h2), u2 = v2, a3 = function() {
          U(c3, u2.maps.OverlayView);
          var o4 = q(c3);
          function c3(e4) {
            var t4, n4 = e4.__id, r4 = e4.position, i4 = e4.map, a4 = e4.template, s4 = e4.className, e4 = e4.anchor, e4 = void 0 === e4 ? { x: 0, y: 0 } : e4;
            return W(this, c3), E(y(t4 = o4.call(this)), "__id", void 0), E(y(t4), "anchor", void 0), E(y(t4), "offset", void 0), E(y(t4), "listeners", void 0), E(y(t4), "latLng", void 0), E(y(t4), "element", void 0), t4.__id = n4, t4.anchor = e4, t4.listeners = {}, t4.latLng = new u2.maps.LatLng(r4), t4.element = document.createElement("div"), t4.element.className = s4, t4.element.style.position = "absolute", "object" === A(a4) ? L(a4, t4.element) : t4.element.innerHTML = a4, t4.setMap(i4), t4;
          }
          return D(c3, [{ key: "onAdd", value: function() {
            this.getPanes().overlayMouseTarget.appendChild(this.element);
            var e4 = this.element.getBoundingClientRect();
            this.offset = { x: this.anchor.x + e4.width / 2, y: this.anchor.y + e4.height }, this.element.style.width = "".concat(e4.width, "px");
          } }, { key: "draw", value: function() {
            var e4 = this.getProjection().fromLatLngToDivPixel(this.latLng);
            this.element.style.left = "".concat(Math.round(e4.x - this.offset.x), "px"), this.element.style.top = "".concat(Math.round(e4.y - this.offset.y), "px"), this.element.style.zIndex = String(parseInt(this.element.style.top, 10));
          } }, { key: "onRemove", value: function() {
            var t4 = this;
            this.element && (this.element.parentNode.removeChild(this.element), Object.keys(this.listeners).forEach(function(e4) {
              t4.element.removeEventListener(e4, t4.listeners[e4]);
            }), delete this.element, delete this.listeners);
          } }, { key: "addListener", value: function(e4, t4) {
            this.listeners[e4] = t4;
            var n4 = this.element;
            return n4.addEventListener(e4, t4), { remove: function() {
              return n4.removeEventListener(e4, t4);
            } };
          } }, { key: "getPosition", value: function() {
            return this.latLng;
          } }]), c3;
        }(), l3 = i3 ? function(e4) {
          var t4 = e4.item, e4 = k(e4, js);
          return new a3(T(T(T({}, i3.createOptions(t4)), e4), {}, { __id: t4.objectID, position: t4._geoloc, className: F(Ls({ descendantName: "marker" })), template: Ya({ templateKey: "HTMLMarker", templates: n3, data: t4 }) }));
        } : function(e4) {
          var t4 = e4.item, e4 = k(e4, ks);
          return new v2.maps.Marker(T(T(T({}, r3.createOptions(t4)), e4), {}, { __id: t4.objectID, position: t4._geoloc }));
        }, d2 = i3 || r3, T(T({}, zn(ds, function() {
          return L(null, t3);
        })(T(T({}, e3), {}, { renderState: {}, container: t3, googleReference: v2, initialZoom: s3, initialPosition: o3, templates: n3, cssClasses: g2, createMarker: l3, markerOptions: d2, enableRefine: f2, enableClearMapRefinement: m2, enableRefineControl: p2 }))), {}, { $$widgetType: "ais.geoSearch" });
      throw new Error(Ms("The `googleReference` option is required."));
    }, hierarchicalMenu: function(e3) {
      var t3, c2, u2, l3, d2, h2, e3 = e3 || {}, n3 = e3.container, r3 = e3.attributes, i3 = e3.separator, a3 = e3.rootPath, s3 = e3.showParentLevel, o3 = e3.limit, f2 = e3.showMore, f2 = void 0 !== f2 && f2, m2 = e3.showMoreLimit, p2 = e3.sortBy, g2 = e3.transformItems, v2 = e3.templates, v2 = void 0 === v2 ? {} : v2, e3 = e3.cssClasses, e3 = void 0 === e3 ? {} : e3;
      if (n3)
        return t3 = P(n3), n3 = { root: F(S(), e3.root), noRefinementRoot: F(S({ modifierName: "noRefinement" }), e3.noRefinementRoot), list: F(S({ descendantName: "list" }), e3.list), childList: F(S({ descendantName: "list", modifierName: "child" }), e3.childList), item: F(S({ descendantName: "item" }), e3.item), selectedItem: F(S({ descendantName: "item", modifierName: "selected" }), e3.selectedItem), parentItem: F(S({ descendantName: "item", modifierName: "parent" }), e3.parentItem), link: F(S({ descendantName: "link" }), e3.link), selectedItemLink: F(S({ descendantName: "link", modifierName: "selected" }), e3.selectedItemLink), label: F(S({ descendantName: "label" }), e3.label), count: F(S({ descendantName: "count" }), e3.count), showMore: F(S({ descendantName: "showMore" }), e3.showMore), disabledShowMore: F(S({ descendantName: "showMore", modifierName: "disabled" }), e3.disabledShowMore) }, c2 = (e3 = { cssClasses: n3, containerNode: t3, templates: v2, showMore: f2, renderState: {} }).cssClasses, u2 = e3.containerNode, l3 = e3.showMore, d2 = e3.templates, h2 = e3.renderState, T(T({}, vt(function(e4, t4) {
          var n4 = e4.createURL, r4 = e4.items, i4 = e4.refine, a4 = e4.instantSearchInstance, s4 = e4.isShowingMore, o4 = e4.toggleShowMore, e4 = e4.canToggleShowMore;
          t4 ? h2.templateProps = O({ defaultTemplates: Bs, templatesConfig: a4.templatesConfig, templates: d2 }) : L(M($s, { createURL: n4, cssClasses: c2, facetValues: r4, templateProps: h2.templateProps, toggleRefinement: i4, showMore: l3, toggleShowMore: o4, isShowingMore: s4, canToggleShowMore: e4 }), u2);
        }, function() {
          return L(null, t3);
        })({ attributes: r3, separator: i3, rootPath: a3, showParentLevel: s3, limit: o3, showMore: f2, showMoreLimit: m2, sortBy: p2, transformItems: g2 })), {}, { $$widgetType: "ais.hierarchicalMenu" });
      throw new Error(Qs("The `container` option is required."));
    }, hits: function(e3) {
      var t3, u2, l3, d2, h2, e3 = e3 || {}, n3 = e3.container, r3 = e3.escapeHTML, i3 = e3.transformItems, a3 = e3.templates, a3 = void 0 === a3 ? {} : a3, e3 = e3.cssClasses, e3 = void 0 === e3 ? {} : e3;
      if (n3)
        return t3 = P(n3), u2 = (n3 = { containerNode: t3, cssClasses: e3, renderState: {}, templates: a3 }).renderState, l3 = n3.cssClasses, d2 = n3.containerNode, h2 = n3.templates, T(T({}, Pt(St)(function(e4, t4) {
          var i4, n4 = e4.hits, r4 = e4.results, a4 = e4.instantSearchInstance, s3 = e4.insights, o3 = e4.bindEvent, c2 = e4.sendEvent, e4 = e4.banner;
          t4 ? u2.templateProps = O({ defaultTemplates: qs, templatesConfig: a4.templatesConfig, templates: h2 }) : (i4 = Yt({ insights: s3, sendEvent: c2 }), L(M(zs, { hits: n4, itemComponent: function(e5) {
            var t5 = e5.hit, n5 = e5.index, r5 = k(e5, Vs);
            return M(v, m({}, u2.templateProps, { templateKey: "item", rootTagName: "li", rootProps: T(T({}, r5), {}, { onClick: function(e6) {
              i4(e6), r5.onClick();
            }, onAuxClick: function(e6) {
              i4(e6), r5.onAuxClick();
            } }), data: T(T({}, t5), {}, { get __hitIndex() {
              return n5;
            } }), bindEvent: o3, sendEvent: c2 }));
          }, sendEvent: c2, classNames: l3, emptyComponent: function(e5) {
            e5 = m({}, (Q(e5), e5));
            return M(v, m({}, u2.templateProps, { rootProps: e5, templateKey: "empty", data: r4, rootTagName: "fragment" }));
          }, banner: e4, bannerComponent: h2.banner ? function(e5) {
            return M(v, m({}, u2.templateProps, { templateKey: "banner", data: e5, rootTagName: "fragment" }));
          } : void 0 }), d2));
        }, function() {
          return L(null, t3);
        })({ escapeHTML: r3, transformItems: i3 })), {}, { $$widgetType: "ais.hits" });
      throw new Error(Ks("The `container` option is required."));
    }, hitsPerPage: function(e3) {
      var t3, r3, i3, e3 = e3 || {}, n3 = e3.container, a3 = e3.items, s3 = e3.cssClasses, s3 = void 0 === s3 ? {} : s3, e3 = e3.transformItems;
      if (n3)
        return t3 = P(n3), n3 = { root: F(Xs(), s3.root), select: F(Xs({ descendantName: "select" }), s3.select), option: F(Xs({ descendantName: "option" }), s3.option) }, r3 = (s3 = { containerNode: t3, cssClasses: n3 }).containerNode, i3 = s3.cssClasses, T(T({}, Gt(function(e4, t4) {
          var n4 = e4.items, e4 = e4.refine;
          t4 || (t4 = (_e(n4, function(e5) {
            return e5.isRefined;
          }) || {}).value, L(M("div", { className: i3.root }, M(Zs, { cssClasses: i3, currentValue: t4, options: n4, setValue: e4 })), r3));
        }, function() {
          return L(null, t3);
        })({ items: a3, transformItems: e3 })), {}, { $$widgetType: "ais.hitsPerPage" });
      throw new Error(Ys("The `container` option is required."));
    }, index: oa, infiniteHits: function(e3) {
      var t3, d2, h2, f2, m2, p2, e3 = e3 || {}, n3 = e3.container, r3 = e3.escapeHTML, i3 = e3.transformItems, a3 = e3.templates, a3 = void 0 === a3 ? {} : a3, s3 = e3.cssClasses, s3 = void 0 === s3 ? {} : s3, o3 = e3.showPrevious, e3 = e3.cache;
      if (n3)
        return t3 = P(n3), n3 = { root: F(no(), s3.root), emptyRoot: F(no({ modifierName: "empty" }), s3.emptyRoot), item: F(no({ descendantName: "item" }), s3.item), list: F(no({ descendantName: "list" }), s3.list), loadPrevious: F(no({ descendantName: "loadPrevious" }), s3.loadPrevious), disabledLoadPrevious: F(no({ descendantName: "loadPrevious", modifierName: "disabled" }), s3.disabledLoadPrevious), loadMore: F(no({ descendantName: "loadMore" }), s3.loadMore), disabledLoadMore: F(no({ descendantName: "loadMore", modifierName: "disabled" }), s3.disabledLoadMore) }, d2 = (s3 = { containerNode: t3, cssClasses: n3, templates: a3, showPrevious: o3, renderState: {} }).containerNode, h2 = s3.cssClasses, f2 = s3.renderState, m2 = s3.templates, p2 = s3.showPrevious, T(T({}, Pt(cn)(function(e4, t4) {
          var n4 = e4.hits, r4 = e4.results, i4 = e4.showMore, a4 = e4.showPrevious, s4 = e4.isFirstPage, o4 = e4.isLastPage, c2 = e4.instantSearchInstance, u2 = e4.insights, l3 = e4.bindEvent, e4 = e4.sendEvent;
          t4 ? f2.templateProps = O({ defaultTemplates: eo, templatesConfig: c2.templatesConfig, templates: m2 }) : L(M(Gs, { cssClasses: h2, hits: n4, results: r4, hasShowPrevious: p2, showPrevious: a4, showMore: i4, templateProps: f2.templateProps, isFirstPage: s4, isLastPage: o4, insights: u2, sendEvent: e4, bindEvent: l3 }), d2);
        }, function() {
          return L(null, t3);
        })({ escapeHTML: r3, transformItems: i3, showPrevious: o3, cache: e3 })), {}, { $$widgetType: "ais.infiniteHits" });
      throw new Error(to("The `container` option is required."));
    }, menu: function(e3) {
      var t3, c2, u2, l3, d2, h2, e3 = e3 || {}, n3 = e3.container, r3 = e3.attribute, i3 = e3.sortBy, a3 = e3.limit, s3 = e3.showMore, o3 = e3.showMoreLimit, f2 = e3.cssClasses, f2 = void 0 === f2 ? {} : f2, m2 = e3.templates, m2 = void 0 === m2 ? {} : m2, e3 = e3.transformItems;
      if (n3)
        return t3 = P(n3), n3 = { root: F(ao(), f2.root), noRefinementRoot: F(ao({ modifierName: "noRefinement" }), f2.noRefinementRoot), list: F(ao({ descendantName: "list" }), f2.list), item: F(ao({ descendantName: "item" }), f2.item), selectedItem: F(ao({ descendantName: "item", modifierName: "selected" }), f2.selectedItem), link: F(ao({ descendantName: "link" }), f2.link), label: F(ao({ descendantName: "label" }), f2.label), count: F(ao({ descendantName: "count" }), f2.count), showMore: F(ao({ descendantName: "showMore" }), f2.showMore), disabledShowMore: F(ao({ descendantName: "showMore", modifierName: "disabled" }), f2.disabledShowMore) }, c2 = (f2 = { containerNode: t3, cssClasses: n3, renderState: {}, templates: m2, showMore: s3 }).containerNode, u2 = f2.cssClasses, l3 = f2.renderState, d2 = f2.templates, h2 = f2.showMore, T(T({}, un(function(e4, t4) {
          var n4 = e4.refine, r4 = e4.items, i4 = e4.createURL, a4 = e4.instantSearchInstance, s4 = e4.isShowingMore, o4 = e4.toggleShowMore, e4 = e4.canToggleShowMore;
          t4 ? l3.templateProps = O({ defaultTemplates: ro, templatesConfig: a4.templatesConfig, templates: d2 }) : (t4 = r4.map(function(e5) {
            return T(T({}, e5), {}, { url: i4(e5.value) });
          }), L(M($s, { createURL: i4, cssClasses: u2, facetValues: t4, showMore: h2, templateProps: l3.templateProps, toggleRefinement: n4, toggleShowMore: o4, isShowingMore: s4, canToggleShowMore: e4 }), c2));
        }, function() {
          return L(null, t3);
        })({ attribute: r3, limit: a3, showMore: s3, showMoreLimit: o3, sortBy: i3, transformItems: e3 })), {}, { $$widgetType: "ais.menu" });
      throw new Error(io("The `container` option is required."));
    }, menuSelect: function(e3) {
      var t3, i3, a3, s3, o3, e3 = e3 || {}, n3 = e3.container, r3 = e3.attribute, c2 = e3.sortBy, c2 = void 0 === c2 ? ["name:asc"] : c2, u2 = e3.limit, u2 = void 0 === u2 ? 10 : u2, l3 = e3.cssClasses, l3 = void 0 === l3 ? {} : l3, d2 = e3.templates, d2 = void 0 === d2 ? {} : d2, e3 = e3.transformItems;
      if (n3)
        return t3 = P(n3), n3 = { root: F(uo(), l3.root), noRefinementRoot: F(uo({ modifierName: "noRefinement" }), l3.noRefinementRoot), select: F(uo({ descendantName: "select" }), l3.select), option: F(uo({ descendantName: "option" }), l3.option) }, i3 = (l3 = { containerNode: t3, cssClasses: n3, renderState: {}, templates: d2 }).containerNode, a3 = l3.cssClasses, s3 = l3.renderState, o3 = l3.templates, T(T({}, un(function(e4, t4) {
          var n4 = e4.refine, r4 = e4.items, e4 = e4.instantSearchInstance;
          t4 ? s3.templateProps = O({ defaultTemplates: oo, templatesConfig: e4.templatesConfig, templates: o3 }) : L(M(so, { cssClasses: a3, items: r4, refine: n4, templateProps: s3.templateProps }), i3);
        }, function() {
          return L(null, t3);
        })({ attribute: r3, limit: u2, sortBy: c2, transformItems: e3 })), {}, { $$widgetType: "ais.menuSelect" });
      throw new Error(co("The `container` option is required."));
    }, numericMenu: function(e3) {
      var t3, a3, s3, o3, c2, u2, e3 = e3 || {}, n3 = e3.container, r3 = e3.attribute, i3 = e3.items, l3 = e3.cssClasses, l3 = void 0 === l3 ? {} : l3, d2 = e3.templates, d2 = void 0 === d2 ? {} : d2, e3 = e3.transformItems;
      if (n3)
        return t3 = P(n3), n3 = { root: F(fo(), l3.root), noRefinementRoot: F(fo({ modifierName: "noRefinement" }), l3.noRefinementRoot), list: F(fo({ descendantName: "list" }), l3.list), item: F(fo({ descendantName: "item" }), l3.item), selectedItem: F(fo({ descendantName: "item", modifierName: "selected" }), l3.selectedItem), label: F(fo({ descendantName: "label" }), l3.label), radio: F(fo({ descendantName: "radio" }), l3.radio), labelText: F(fo({ descendantName: "labelText" }), l3.labelText) }, a3 = (l3 = { containerNode: t3, attribute: r3, cssClasses: n3, renderState: {}, templates: d2 }).containerNode, s3 = l3.attribute, o3 = l3.cssClasses, c2 = l3.renderState, u2 = l3.templates, T(T({}, mn(function(e4, t4) {
          var n4 = e4.createURL, r4 = e4.instantSearchInstance, i4 = e4.refine, e4 = e4.items;
          t4 ? c2.templateProps = O({ defaultTemplates: lo, templatesConfig: r4.templatesConfig, templates: u2 }) : L(M($s, { createURL: n4, cssClasses: o3, facetValues: e4, templateProps: c2.templateProps, toggleRefinement: i4, attribute: s3 }), a3);
        }, function() {
          return L(null, t3);
        })({ attribute: r3, items: i3, transformItems: e3 })), {}, { $$widgetType: "ais.numericMenu" });
      throw new Error(ho("The `container` option is required."));
    }, pagination: function(e3) {
      var t3, u2, l3, d2, h2, f2, m2, p2, g2, e3 = e3 || {}, n3 = e3.container, r3 = e3.templates, r3 = void 0 === r3 ? {} : r3, i3 = e3.cssClasses, i3 = void 0 === i3 ? {} : i3, a3 = e3.totalPages, s3 = e3.padding, o3 = e3.showFirst, o3 = void 0 === o3 || o3, c2 = e3.showLast, c2 = void 0 === c2 || c2, v2 = e3.showPrevious, v2 = void 0 === v2 || v2, y2 = e3.showNext, y2 = void 0 === y2 || y2, e3 = e3.scrollTo, e3 = void 0 === e3 ? "body" : e3;
      if (n3)
        return t3 = P(n3), e3 = false !== (n3 = true === e3 ? "body" : e3) && P(n3), n3 = { root: F(bo(), i3.root), noRefinementRoot: F(bo({ modifierName: "noRefinement" }), i3.noRefinementRoot), list: F(bo({ descendantName: "list" }), i3.list), item: F(bo({ descendantName: "item" }), i3.item), firstPageItem: F(bo({ descendantName: "item", modifierName: "firstPage" }), i3.firstPageItem), lastPageItem: F(bo({ descendantName: "item", modifierName: "lastPage" }), i3.lastPageItem), previousPageItem: F(bo({ descendantName: "item", modifierName: "previousPage" }), i3.previousPageItem), nextPageItem: F(bo({ descendantName: "item", modifierName: "nextPage" }), i3.nextPageItem), pageItem: F(bo({ descendantName: "item", modifierName: "page" }), i3.pageItem), selectedItem: F(bo({ descendantName: "item", modifierName: "selected" }), i3.selectedItem), disabledItem: F(bo({ descendantName: "item", modifierName: "disabled" }), i3.disabledItem), link: F(bo({ descendantName: "link" }), i3.link) }, i3 = T(T({}, So), r3), u2 = (r3 = { containerNode: t3, cssClasses: n3, templates: i3, showFirst: o3, showLast: c2, showPrevious: v2, showNext: y2, scrollToNode: e3 }).containerNode, l3 = r3.cssClasses, d2 = r3.templates, h2 = r3.showFirst, f2 = r3.showLast, m2 = r3.showPrevious, p2 = r3.showNext, g2 = r3.scrollToNode, T(T({}, bn(function(e4, t4) {
          var n4 = e4.createURL, r4 = e4.currentRefinement, i4 = e4.nbPages, a4 = e4.pages, s4 = e4.isFirstPage, o4 = e4.isLastPage, c3 = e4.refine;
          t4 || L(M(mo, { createURL: n4, cssClasses: l3, currentPage: r4, templates: d2, nbPages: i4, pages: a4, isFirstPage: s4, isLastPage: o4, setCurrentPage: function(e5) {
            c3(e5), false !== g2 && g2.scrollIntoView();
          }, showFirst: h2, showLast: f2, showPrevious: m2, showNext: p2 }), u2);
        }, function() {
          return L(null, t3);
        })({ totalPages: a3, padding: s3 })), {}, { $$widgetType: "ais.pagination" });
      throw new Error(Ro("The `container` option is required."));
    }, panel: function(e3) {
      var e3 = e3 || {}, t3 = e3.templates, r3 = void 0 === t3 ? {} : t3, t3 = e3.hidden, d2 = void 0 === t3 ? function() {
        return false;
      } : t3, t3 = e3.collapsed, e3 = e3.cssClasses, e3 = void 0 === e3 ? {} : e3, h2 = document.createElement("div"), f2 = Boolean(t3), m2 = "function" == typeof t3 ? t3 : function() {
        return false;
      }, p2 = { root: F(Uo(), e3.root), noRefinementRoot: F(Uo({ modifierName: "noRefinement" }), e3.noRefinementRoot), collapsibleRoot: F(Uo({ modifierName: "collapsible" }), e3.collapsibleRoot), collapsedRoot: F(Uo({ modifierName: "collapsed" }), e3.collapsedRoot), collapseButton: F(Uo({ descendantName: "collapseButton" }), e3.collapseButton), collapseIcon: F(Uo({ descendantName: "collapseIcon" }), e3.collapseIcon), body: F(Uo({ descendantName: "body" }), e3.body), header: F(Uo({ descendantName: "header" }), e3.header), footer: F(Uo({ descendantName: "footer" }), e3.footer) };
      return function(n3) {
        return function(e4) {
          var i3, a3, t4, s3, o3, c2, u2, l3;
          if (e4 && e4.container)
            return i3 = P(e4.container), t4 = { containerNode: i3, bodyContainerNode: h2, cssClasses: p2, templates: T(T({}, { collapseButtonText: function(e5) {
              e5 = e5.collapsed;
              return '<svg\n          class="'.concat(p2.collapseIcon, '"\n          style="width: 1em; height: 1em;"\n          viewBox="0 0 500 500"\n        >\n        <path d="').concat(e5 ? "M100 250l300-150v300z" : "M250 400l150-300H100z", '" fill="currentColor" />\n        </svg>');
            } }), r3) }, s3 = t4.containerNode, o3 = t4.bodyContainerNode, c2 = t4.cssClasses, u2 = t4.templates, a3 = function(e5) {
              var t5 = e5.options, n4 = e5.hidden, r4 = e5.collapsible, e5 = e5.collapsed;
              L(M(Wo, { cssClasses: c2, hidden: n4, collapsible: r4, isCollapsed: e5, templates: u2, data: t5, bodyElement: o3 }), s3);
            }, l3 = n3(T(T({}, e4), {}, { container: h2 })), T(T({}, l3), {}, { init: function() {
              for (var e5 = arguments.length, t5 = new Array(e5), n4 = 0; n4 < e5; n4++)
                t5[n4] = arguments[n4];
              var r4 = t5[0], r4 = T(T({}, l3.getWidgetRenderState ? l3.getWidgetRenderState(r4) : {}), r4);
              a3({ options: r4, hidden: true, collapsible: f2, collapsed: false }), "function" == typeof l3.init && (r4 = l3.init).call.apply(r4, [this].concat(t5));
            }, render: function() {
              for (var e5 = arguments.length, t5 = new Array(e5), n4 = 0; n4 < e5; n4++)
                t5[n4] = arguments[n4];
              var r4 = t5[0], r4 = T(T({}, l3.getWidgetRenderState ? l3.getWidgetRenderState(r4) : {}), r4);
              a3({ options: r4, hidden: Boolean(d2(r4)), collapsible: f2, collapsed: Boolean(m2(r4)) }), "function" == typeof l3.render && (r4 = l3.render).call.apply(r4, [this].concat(t5));
            }, dispose: function() {
              if (L(null, i3), "function" == typeof l3.dispose) {
                for (var e5, t5 = arguments.length, n4 = new Array(t5), r4 = 0; r4 < t5; r4++)
                  n4[r4] = arguments[r4];
                return (e5 = l3.dispose).call.apply(e5, [this].concat(n4));
              }
            } });
          throw new Error(Do("The `container` option is required in the widget within the panel."));
        };
      };
    }, places: wa, poweredBy: function(e3) {
      var t3, r3, i3, e3 = e3 || {}, n3 = e3.container, a3 = e3.cssClasses, a3 = void 0 === a3 ? {} : a3, e3 = e3.theme, e3 = void 0 === e3 ? "light" : e3;
      if (n3)
        return t3 = P(n3), n3 = { root: F(qo(), qo({ modifierName: "dark" === e3 ? "dark" : "light" }), a3.root), link: F(qo({ descendantName: "link" }), a3.link), logo: F(qo({ descendantName: "logo" }), a3.logo) }, r3 = (a3 = { containerNode: t3, cssClasses: n3 }).containerNode, i3 = a3.cssClasses, T(T({}, Jn(function(e4, t4) {
          var n4 = e4.url, e4 = e4.widgetParams;
          t4 && (t4 = e4.theme, L(M(Qo, { cssClasses: i3, url: n4, theme: void 0 === t4 ? "light" : t4 }), r3));
        }, function() {
          return L(null, t3);
        })({ theme: e3 })), {}, { $$widgetType: "ais.poweredBy" });
      throw new Error(Vo("The `container` option is required."));
    }, queryRuleContext: function() {
      var e3 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
      if (e3.trackedFilters)
        return T(T({}, Yr(R)(e3)), {}, { $$widgetType: "ais.queryRuleContext" });
      throw new Error(Ko("The `trackedFilters` option is required."));
    }, queryRuleCustomData: function(e3) {
      var t3, n3, r3, i3, e3 = e3 || {}, a3 = e3.container, s3 = e3.cssClasses, s3 = void 0 === s3 ? {} : s3, o3 = e3.templates, o3 = void 0 === o3 ? {} : o3, e3 = e3.transformItems, e3 = void 0 === e3 ? function(e4) {
        return e4;
      } : e3;
      if (a3)
        return s3 = { root: F(Yo(), s3.root) }, t3 = P(a3), a3 = T(T({}, Jo), o3), n3 = (o3 = { containerNode: t3, cssClasses: s3, renderState: {}, templates: a3 }).containerNode, r3 = o3.cssClasses, i3 = o3.templates, T(T({}, Yr(function(e4) {
          e4 = e4.items;
          L(M(zo, { cssClasses: r3, templates: i3, items: e4 }), n3);
        }, function() {
          L(null, t3);
        })({ transformItems: e3 })), {}, { $$widgetType: "ais.queryRuleCustomData" });
      throw new Error(Zo("The `container` option is required."));
    }, rangeInput: function(e3) {
      var t3, s3, o3, c2, u2, e3 = e3 || {}, n3 = e3.container, r3 = e3.attribute, i3 = e3.min, a3 = e3.max, l3 = e3.precision, l3 = void 0 === l3 ? 0 : l3, d2 = e3.cssClasses, d2 = void 0 === d2 ? {} : d2, e3 = e3.templates, e3 = void 0 === e3 ? {} : e3;
      if (n3)
        return t3 = P(n3), n3 = { root: F(nc(), d2.root), noRefinement: F(nc({ modifierName: "noRefinement" })), form: F(nc({ descendantName: "form" }), d2.form), label: F(nc({ descendantName: "label" }), d2.label), input: F(nc({ descendantName: "input" }), d2.input), inputMin: F(nc({ descendantName: "input", modifierName: "min" }), d2.inputMin), inputMax: F(nc({ descendantName: "input", modifierName: "max" }), d2.inputMax), separator: F(nc({ descendantName: "separator" }), d2.separator), submit: F(nc({ descendantName: "submit" }), d2.submit) }, s3 = (d2 = { containerNode: t3, cssClasses: n3, templates: e3, renderState: {} }).containerNode, o3 = d2.cssClasses, c2 = d2.renderState, u2 = d2.templates, T(T({}, Pn(function(e4, t4) {
          var n4 = e4.refine, r4 = e4.range, i4 = e4.start, a4 = e4.widgetParams, e4 = e4.instantSearchInstance;
          t4 ? c2.templateProps = O({ defaultTemplates: rc, templatesConfig: e4.templatesConfig, templates: u2 }) : (t4 = r4.min, e4 = r4.max, i4 = (r4 = j(i4, 2))[0], r4 = r4[1], a4 = 1 / Math.pow(10, a4.precision || 0), L(M(ec, { min: t4, max: e4, step: a4, values: { min: i4 !== -1 / 0 && i4 !== t4 ? i4 : void 0, max: r4 !== 1 / 0 && r4 !== e4 ? r4 : void 0 }, cssClasses: o3, refine: n4, templateProps: c2.templateProps }), s3));
        }, function() {
          return L(null, t3);
        })({ attribute: r3, min: i3, max: a3, precision: l3 })), {}, { $$type: "ais.rangeInput", $$widgetType: "ais.rangeInput" });
      throw new Error(tc("The `container` option is required."));
    }, rangeSlider: function(e3) {
      var t3, a3, s3, o3, c2, u2, e3 = e3 || {}, n3 = e3.container, r3 = e3.attribute, i3 = e3.min, l3 = e3.max, d2 = e3.cssClasses, d2 = void 0 === d2 ? {} : d2, h2 = e3.step, f2 = e3.pips, f2 = void 0 === f2 || f2, m2 = e3.precision, m2 = void 0 === m2 ? 0 : m2, e3 = e3.tooltips, e3 = void 0 === e3 || e3;
      if (n3)
        return t3 = P(n3), n3 = { root: F(wc(), d2.root), disabledRoot: F(wc({ modifierName: "disabled" }), d2.disabledRoot) }, a3 = (d2 = { containerNode: t3, step: h2, pips: f2, tooltips: e3, cssClasses: n3 }).containerNode, s3 = d2.cssClasses, o3 = d2.pips, c2 = d2.step, u2 = d2.tooltips, T(T({}, Pn(function(e4, t4) {
          var n4, r4 = e4.refine, i4 = e4.range, e4 = e4.start;
          t4 || (t4 = i4.min, i4 = i4.max, n4 = (e4 = j(e4, 2))[0], e4 = e4[1], L(M(Sc, { cssClasses: s3, refine: r4, min: t4, max: i4, values: [i4 < (r4 = n4 === -1 / 0 ? t4 : n4) ? i4 : r4, (n4 = e4 === 1 / 0 ? i4 : e4) < t4 ? t4 : n4], tooltips: u2, step: c2, pips: o3 }), a3));
        }, function() {
          return L(null, t3);
        })({ attribute: r3, min: i3, max: l3, precision: m2 })), {}, { $$type: "ais.rangeSlider", $$widgetType: "ais.rangeSlider" });
      throw new Error(_c("The `container` option is required."));
    }, ratingMenu: function(e3) {
      var t3, a3, s3, o3, c2, e3 = e3 || {}, n3 = e3.container, r3 = e3.attribute, i3 = e3.max, i3 = void 0 === i3 ? 5 : i3, u2 = e3.cssClasses, u2 = void 0 === u2 ? {} : u2, e3 = e3.templates, e3 = void 0 === e3 ? {} : e3;
      if (n3)
        return t3 = P(n3), n3 = { root: F(C(), u2.root), noRefinementRoot: F(C({ modifierName: "noRefinement" }), u2.noRefinementRoot), list: F(C({ descendantName: "list" }), u2.list), item: F(C({ descendantName: "item" }), u2.item), selectedItem: F(C({ descendantName: "item", modifierName: "selected" }), u2.selectedItem), disabledItem: F(C({ descendantName: "item", modifierName: "disabled" }), u2.disabledItem), link: F(C({ descendantName: "link" }), u2.link), starIcon: F(C({ descendantName: "starIcon" }), u2.starIcon), fullStarIcon: F(C({ descendantName: "starIcon", modifierName: "full" }), u2.fullStarIcon), emptyStarIcon: F(C({ descendantName: "starIcon", modifierName: "empty" }), u2.emptyStarIcon), label: F(C({ descendantName: "label" }), u2.label), count: F(C({ descendantName: "count" }), u2.count) }, a3 = (u2 = { containerNode: t3, cssClasses: n3, renderState: {}, templates: e3 }).containerNode, s3 = u2.cssClasses, o3 = u2.templates, c2 = u2.renderState, T(T({}, jn(function(e4, t4) {
          var n4 = e4.refine, r4 = e4.items, i4 = e4.createURL, e4 = e4.instantSearchInstance;
          t4 ? c2.templateProps = O({ defaultTemplates: Nc, templatesConfig: e4.templatesConfig, templates: o3 }) : L(M($s, { createURL: i4, cssClasses: s3, facetValues: r4, templateProps: c2.templateProps, toggleRefinement: n4 }, M("svg", { style: "display:none;" }, M("symbol", { id: C({ descendantName: "starSymbol" }), viewBox: "0 0 24 24" }, Ic), M("symbol", { id: C({ descendantName: "starEmptySymbol" }), viewBox: "0 0 24 24" }, Fc))), a3);
        }, function() {
          return L(null, t3);
        })({ attribute: r3, max: i3 })), {}, { $$widgetType: "ais.ratingMenu" });
      throw new Error(xc("The `container` option is required."));
    }, refinementList: function(e3) {
      var t3, d2, h2, f2, m2, p2, g2, v2, y2, b2, e3 = e3 || {}, n3 = e3.container, r3 = e3.attribute, i3 = e3.operator, a3 = e3.sortBy, s3 = e3.limit, o3 = e3.showMore, c2 = e3.showMoreLimit, u2 = e3.searchable, u2 = void 0 !== u2 && u2, l3 = e3.searchablePlaceholder, l3 = void 0 === l3 ? "Search..." : l3, R2 = e3.searchableEscapeFacetValues, S2 = e3.searchableIsAlwaysActive, S2 = void 0 === S2 || S2, _2 = e3.cssClasses, _2 = void 0 === _2 ? {} : _2, w2 = e3.templates, w2 = void 0 === w2 ? {} : w2, e3 = e3.transformItems;
      if (n3)
        return R2 = !!u2 && Boolean(void 0 === R2 || R2), t3 = P(n3), n3 = { root: F(H(), _2.root), noRefinementRoot: F(H({ modifierName: "noRefinement" }), _2.noRefinementRoot), list: F(H({ descendantName: "list" }), _2.list), item: F(H({ descendantName: "item" }), _2.item), selectedItem: F(H({ descendantName: "item", modifierName: "selected" }), _2.selectedItem), searchBox: F(H({ descendantName: "searchBox" }), _2.searchBox), label: F(H({ descendantName: "label" }), _2.label), checkbox: F(H({ descendantName: "checkbox" }), _2.checkbox), labelText: F(H({ descendantName: "labelText" }), _2.labelText), count: F(H({ descendantName: "count" }), _2.count), noResults: F(H({ descendantName: "noResults" }), _2.noResults), showMore: F(H({ descendantName: "showMore" }), _2.showMore), disabledShowMore: F(H({ descendantName: "showMore", modifierName: "disabled" }), _2.disabledShowMore), searchable: { root: F(Lc(), _2.searchableRoot), form: F(Lc({ descendantName: "form" }), _2.searchableForm), input: F(Lc({ descendantName: "input" }), _2.searchableInput), submit: F(Lc({ descendantName: "submit" }), _2.searchableSubmit), submitIcon: F(Lc({ descendantName: "submitIcon" }), _2.searchableSubmitIcon), reset: F(Lc({ descendantName: "reset" }), _2.searchableReset), resetIcon: F(Lc({ descendantName: "resetIcon" }), _2.searchableResetIcon), loadingIndicator: F(Lc({ descendantName: "loadingIndicator" }), _2.searchableLoadingIndicator), loadingIcon: F(Lc({ descendantName: "loadingIcon" }), _2.searchableLoadingIcon) } }, _2 = { containerNode: t3, cssClasses: n3, templates: w2, searchBoxTemplates: { submit: w2.searchableSubmit, reset: w2.searchableReset, loadingIndicator: w2.searchableLoadingIndicator }, renderState: {}, searchable: u2, searchablePlaceholder: l3, searchableIsAlwaysActive: S2, showMore: o3 }, d2 = _2.containerNode, h2 = _2.cssClasses, f2 = _2.templates, m2 = _2.searchBoxTemplates, p2 = _2.renderState, g2 = _2.showMore, v2 = _2.searchable, y2 = _2.searchablePlaceholder, b2 = _2.searchableIsAlwaysActive, T(T({}, Nn(function(e4, t4) {
          var n4 = e4.refine, r4 = e4.items, i4 = e4.createURL, a4 = e4.searchForItems, s4 = e4.isFromSearch, o4 = e4.instantSearchInstance, c3 = e4.toggleShowMore, u3 = e4.isShowingMore, l4 = e4.hasExhaustiveItems, e4 = e4.canToggleShowMore;
          t4 ? (p2.templateProps = O({ defaultTemplates: jc, templatesConfig: o4.templatesConfig, templates: f2 }), p2.searchBoxTemplateProps = O({ defaultTemplates: kc, templatesConfig: o4.templatesConfig, templates: m2 })) : L(M($s, { createURL: i4, cssClasses: h2, facetValues: r4, templateProps: p2.templateProps, searchBoxTemplateProps: p2.searchBoxTemplateProps, toggleRefinement: n4, searchFacetValues: v2 ? a4 : void 0, searchPlaceholder: y2, searchIsAlwaysActive: b2, isFromSearch: s4, showMore: g2 && !s4 && 0 < r4.length, toggleShowMore: c3, isShowingMore: u3, hasExhaustiveItems: l4, canToggleShowMore: e4 }), d2);
        }, function() {
          return L(null, t3);
        })({ attribute: r3, operator: i3, limit: s3, showMore: o3, showMoreLimit: c2, sortBy: a3, escapeFacetValues: R2, transformItems: e3 })), {}, { $$widgetType: "ais.refinementList" });
      throw new Error(Mc("The `container` option is required."));
    }, relevantSort: function(e3) {
      var t3, r3, i3, a3, n3 = e3.container, s3 = e3.templates, s3 = void 0 === s3 ? {} : s3, e3 = e3.cssClasses, e3 = void 0 === e3 ? {} : e3;
      if (n3)
        return t3 = P(n3), n3 = { root: F(Wc(), e3.root), text: F(Wc({ descendantName: "text" }), e3.text), button: F(Wc({ descendantName: "button" }), e3.button) }, e3 = T(T({}, Hc), s3), r3 = (s3 = { containerNode: t3, cssClasses: n3, renderState: {}, templates: e3 }).containerNode, i3 = s3.cssClasses, a3 = s3.templates, T(T({}, ei(function(e4) {
          var t4 = e4.isRelevantSorted, n4 = e4.isVirtualReplica, e4 = e4.refine;
          L(M(Oc, { cssClasses: i3, templates: a3, isRelevantSorted: t4, isVirtualReplica: n4, refine: e4 }), r3);
        }, function() {
          L(null, t3);
        })({})), {}, { $$widgetType: "ais.relevantSort" });
      throw new Error(Ac("The `container` option is required."));
    }, searchBox: function(e3) {
      var t3, r3, i3, a3, s3, o3, c2, u2, l3, d2, h2, e3 = e3 || {}, n3 = e3.container, f2 = e3.placeholder, f2 = void 0 === f2 ? "" : f2, m2 = e3.cssClasses, m2 = void 0 === m2 ? {} : m2, p2 = e3.autofocus, p2 = void 0 !== p2 && p2, g2 = e3.searchAsYouType, g2 = void 0 === g2 || g2, v2 = e3.ignoreCompositionEvents, v2 = void 0 !== v2 && v2, y2 = e3.showReset, y2 = void 0 === y2 || y2, b2 = e3.showSubmit, b2 = void 0 === b2 || b2, R2 = e3.showLoadingIndicator, R2 = void 0 === R2 || R2, S2 = e3.queryHook, e3 = e3.templates, e3 = void 0 === e3 ? {} : e3;
      if (n3)
        return t3 = P(n3), n3 = { root: F(Uc(), m2.root), form: F(Uc({ descendantName: "form" }), m2.form), input: F(Uc({ descendantName: "input" }), m2.input), submit: F(Uc({ descendantName: "submit" }), m2.submit), submitIcon: F(Uc({ descendantName: "submitIcon" }), m2.submitIcon), reset: F(Uc({ descendantName: "reset" }), m2.reset), resetIcon: F(Uc({ descendantName: "resetIcon" }), m2.resetIcon), loadingIndicator: F(Uc({ descendantName: "loadingIndicator" }), m2.loadingIndicator), loadingIcon: F(Uc({ descendantName: "loadingIcon" }), m2.loadingIcon) }, m2 = T(T({}, kc), e3), r3 = (e3 = { containerNode: t3, cssClasses: n3, placeholder: f2, templates: m2, autofocus: p2, searchAsYouType: g2, ignoreCompositionEvents: v2, showReset: y2, showSubmit: b2, showLoadingIndicator: R2 }).containerNode, i3 = e3.cssClasses, a3 = e3.placeholder, s3 = e3.templates, o3 = e3.autofocus, c2 = e3.searchAsYouType, u2 = e3.ignoreCompositionEvents, l3 = e3.showReset, d2 = e3.showSubmit, h2 = e3.showLoadingIndicator, T(T({}, En(function(e4) {
          var t4 = e4.refine, n4 = e4.query, e4 = e4.isSearchStalled;
          L(M(Os, { query: n4, placeholder: a3, autofocus: o3, refine: t4, searchAsYouType: c2, ignoreCompositionEvents: u2, templates: s3, showSubmit: d2, showReset: l3, showLoadingIndicator: h2, isSearchStalled: e4, cssClasses: i3 }), r3);
        }, function() {
          return L(null, t3);
        })({ queryHook: S2 })), {}, { $$widgetType: "ais.searchBox" });
      throw new Error(Dc("The `container` option is required."));
    }, sortBy: function(e3) {
      var t3, i3, a3, e3 = e3 || {}, n3 = e3.container, r3 = e3.items, s3 = e3.cssClasses, s3 = void 0 === s3 ? {} : s3, e3 = e3.transformItems;
      if (n3)
        return t3 = P(n3), n3 = { root: F(Bc(), s3.root), select: F(Bc({ descendantName: "select" }), s3.select), option: F(Bc({ descendantName: "option" }), s3.option) }, i3 = (s3 = { containerNode: t3, cssClasses: n3 }).containerNode, a3 = s3.cssClasses, T(T({}, kn(function(e4, t4) {
          var n4 = e4.currentRefinement, r4 = e4.options, e4 = e4.refine;
          t4 || L(M("div", { className: a3.root }, M(Zs, { cssClasses: a3, currentValue: n4, options: r4, setValue: e4, ariaLabel: "Sort results by" })), i3);
        }, function() {
          return L(null, t3);
        })({ container: t3, items: r3, transformItems: e3 })), {}, { $$widgetType: "ais.sortBy" });
      throw new Error($c("The `container` option is required."));
    }, stats: function(e3) {
      var t3, l3, d2, h2, f2, e3 = e3 || {}, n3 = e3.container, r3 = e3.cssClasses, r3 = void 0 === r3 ? {} : r3, e3 = e3.templates, e3 = void 0 === e3 ? {} : e3;
      if (n3)
        return t3 = P(n3), n3 = { root: F(Kc(), r3.root), text: F(Kc({ descendantName: "text" }), r3.text) }, l3 = (r3 = { containerNode: t3, cssClasses: n3, templates: e3, renderState: {} }).renderState, d2 = r3.cssClasses, h2 = r3.containerNode, f2 = r3.templates, T(T({}, An(function(e4, t4) {
          var n4 = e4.hitsPerPage, r4 = e4.nbHits, i3 = e4.nbSortedHits, a3 = e4.areHitsSorted, s3 = e4.nbPages, o3 = e4.page, c2 = e4.processingTimeMS, u2 = e4.query, e4 = e4.instantSearchInstance;
          t4 ? l3.templateProps = O({ defaultTemplates: zc, templatesConfig: e4.templatesConfig, templates: f2 }) : L(M(qc, { cssClasses: d2, hitsPerPage: n4, nbHits: r4, nbSortedHits: i3, areHitsSorted: a3, nbPages: s3, page: o3, processingTimeMS: c2, query: u2, templateProps: l3.templateProps }), h2);
        }, function() {
          return L(null, t3);
        })({})), {}, { $$widgetType: "ais.stats" });
      throw new Error(Vc("The `container` option is required."));
    }, toggleRefinement: function(e3) {
      var t3, i3, a3, s3, o3, e3 = e3 || {}, n3 = e3.container, r3 = e3.attribute, c2 = e3.cssClasses, c2 = void 0 === c2 ? {} : c2, u2 = e3.templates, u2 = void 0 === u2 ? {} : u2, l3 = e3.on, l3 = void 0 === l3 || l3, e3 = e3.off;
      if (n3)
        return t3 = P(n3), n3 = { root: F(Gc(), c2.root), label: F(Gc({ descendantName: "label" }), c2.label), checkbox: F(Gc({ descendantName: "checkbox" }), c2.checkbox), labelText: F(Gc({ descendantName: "labelText" }), c2.labelText) }, i3 = (c2 = { containerNode: t3, cssClasses: n3, renderState: {}, templates: u2 }).containerNode, a3 = c2.cssClasses, s3 = c2.renderState, o3 = c2.templates, T(T({}, Wn(function(e4, t4) {
          var n4 = e4.value, r4 = e4.refine, e4 = e4.instantSearchInstance;
          t4 ? s3.templateProps = O({ defaultTemplates: Yc, templatesConfig: e4.templatesConfig, templates: o3 }) : L(M(Zc, { cssClasses: a3, currentRefinement: n4, templateProps: s3.templateProps, refine: r4 }), i3);
        }, function() {
          return L(null, t3);
        })({ attribute: r3, on: l3, off: e3 })), {}, { $$widgetType: "ais.toggleRefinement" });
      throw new Error(Xc("The `container` option is required."));
    }, voiceSearch: function(e3) {
      var t3, i3, a3, s3, e3 = e3 || {}, n3 = e3.container, r3 = e3.cssClasses, r3 = void 0 === r3 ? {} : r3, o3 = e3.templates, o3 = void 0 === o3 ? {} : o3, c2 = e3.searchAsYouSpeak, c2 = void 0 !== c2 && c2, u2 = e3.language, l3 = e3.additionalQueryParameters, e3 = e3.createVoiceSearchHelper;
      if (n3)
        return t3 = P(n3), n3 = { root: F(ou(), r3.root), button: F(ou({ descendantName: "button" }), r3.button), status: F(ou({ descendantName: "status" }), r3.status) }, r3 = T(T({}, au), o3), i3 = (o3 = { containerNode: t3, cssClasses: n3, templates: r3 }).containerNode, a3 = o3.cssClasses, s3 = o3.templates, T(T({}, Gr(function(e4) {
          var t4 = e4.isBrowserSupported, n4 = e4.isListening, r4 = e4.toggleListening, e4 = e4.voiceListeningState;
          L(M(eu, { cssClasses: a3, templates: s3, isBrowserSupported: t4, isListening: n4, toggleListening: r4, voiceListeningState: e4 }), i3);
        }, function() {
          return L(null, t3);
        })({ container: t3, cssClasses: n3, templates: r3, searchAsYouSpeak: c2, language: u2, additionalQueryParameters: l3, createVoiceSearchHelper: e3 })), {}, { $$widgetType: "ais.voiceSearch" });
      throw new Error(su("The `container` option is required."));
    } });
    return a2.version = "4.68.1", a2.connectors = ar, a2.widgets = e2, a2.middlewares = ir, a2.routers = en, a2.stateMappings = ln, a2.createInfiniteHitsSessionStorageCache = function() {
      return { read: function(e3) {
        var e3 = e3.state, t3 = rt(function(e4) {
          return e4.window.sessionStorage;
        });
        if (!t3)
          return null;
        try {
          var n3 = JSON.parse(t3.getItem(mi));
          return n3 && Oe(n3.state, fi(e3)) ? n3.hits : null;
        } catch (e4) {
          if (e4 instanceof SyntaxError)
            try {
              t3.removeItem(mi);
            } catch (e5) {
            }
          return null;
        }
      }, write: function(e3) {
        var t3 = e3.state, e3 = e3.hits, n3 = rt(function(e4) {
          return e4.window.sessionStorage;
        });
        if (n3)
          try {
            n3.setItem(mi, JSON.stringify({ state: fi(t3), hits: e3 }));
          } catch (e4) {
          }
      } };
    }, a2.highlight = ri, a2.reverseHighlight = ai, a2.snippet = oi, a2.reverseSnippet = ui, a2.insights = Zt, a2;
  });
})(instantsearch_production_min);
var instantsearch_production_minExports = instantsearch_production_min.exports;
const instantsearch = /* @__PURE__ */ getDefaultExportFromCjs(instantsearch_production_minExports);
const container = document.querySelector(".site-search");
if (container) {
  console.log("init");
  init();
}
function init() {
  const searchClient = algoliasearch(
    "3PP8YC3MQX",
    "ab9e8106a1317eb9a3da408229b70590"
  );
  const search = instantsearch({
    indexName: "ulu_frontend",
    searchClient,
    future: { preserveSharedStateOnUnmount: true }
  });
  search.addWidgets([
    instantsearch.widgets.searchBox({
      container: "#search-form"
    }),
    instantsearch.widgets.hits({
      container: "#search-results",
      templates: {
        item: (hit, { html, components }) => html`
          <article>
            <div>
              <h1>${components.Highlight({ hit, attribute: "name" })}</h1>
            </div>
          </article>
        `
      }
    }),
    instantsearch.widgets.configure({
      hitsPerPage: 8
    }),
    instantsearch.widgets.pagination({
      container: "#search-pagination"
    })
  ]);
  search.start();
}
console.log("ulu:\n", ulu);
init$3();
init$2();
{
  __vitePreload(() => import("./chunks/modulepreload-polyfill.BoyGcPDr.js"), true ? [] : void 0);
}
