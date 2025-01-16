var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __publicField = (obj, key2, value) => __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
const scriptRel = "modulepreload";
const assetsURL = function(dep, importerUrl) {
  return new URL(dep, importerUrl).href;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    const links = document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
    promise = Promise.allSettled(
      deps.map((dep) => {
        dep = assetsURL(dep, importerUrl);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        const isBaseRelative = !!importerUrl;
        if (isBaseRelative) {
          for (let i = links.length - 1; i >= 0; i--) {
            const link2 = links[i];
            if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
              return;
            }
          }
        } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
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
function isBrowser() {
  return typeof window !== "undefined" && typeof window.document !== "undefined";
}
function createElementFromHtml(markup) {
  const doc = new DOMParser().parseFromString(markup, "text/html");
  return doc.body.firstElementChild;
}
if (isBrowser()) {
  initResize();
  initPrint();
}
const events = {
  /**
   * Event is dispatched when DOM in the page has changed, triggers updates from
   * all modules listening for the change (init instances, etc)
   * - Is triggered by modules that were responsible for modifying the page
   */
  pageModified(context) {
    context.dispatchEvent(new CustomEvent(getName$1("pageModified"), { bubbles: true }));
  },
  /**
   * Event called when page is resized
   */
  pageResized(context) {
    context.dispatchEvent(new CustomEvent(getName$1("pageResized"), { bubbles: true }));
  },
  /**
   * Event dispatched before page print begins (teardown/restructure/hide things)
   */
  beforePrint(context) {
    context.dispatchEvent(new CustomEvent(getName$1("beforePrint"), { bubbles: true }));
  },
  /**
   * Event dispatched after page print (cleanup)
   */
  afterPrint(context) {
    context.dispatchEvent(new CustomEvent(getName$1("afterPrint"), { bubbles: true }));
  }
};
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
function initResize() {
  window.addEventListener("resize", debounce(() => dispatch("pageResized", document), 250));
}
function initPrint() {
  window.addEventListener("beforeprint", () => {
    dispatch("beforePrint", document);
  });
  window.addEventListener("afterprint", () => {
    dispatch("afterPrint", document);
  });
}
const index$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dispatch,
  getName: getName$1
}, Symbol.toStringTag, { value: "Module" }));
const regexJsonString = /^[{\[][\s\S]*[}\]]$/;
function getDatasetJson(element, key2) {
  const passed = element.dataset[key2];
  try {
    return JSON.parse(passed);
  } catch (error) {
    console.error(`Error getting JSON from dataset (${key2}) -- "${passed}"
`, element, error);
    return {};
  }
}
function getDatasetOptionalJson(element, key2) {
  const passed = element.dataset[key2];
  if (passed && regexJsonString.test(passed.trim())) {
    return getDatasetJson(element, key2);
  } else {
    return passed;
  }
}
function wasClickOutside(element, event) {
  const rect = element.getBoundingClientRect();
  return event.clientY < rect.top || // above
  event.clientY > rect.top + rect.height || // below
  event.clientX < rect.left || // left side
  event.clientX > rect.left + rect.width;
}
function setPositionClasses(parent, classes = {
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
    if (lastY !== y) rows.push([]);
    rows[rows.length - 1].push(child);
    lastY = y;
    child.classList.remove(...Object.values(classes));
  });
  rows.forEach((row, index2) => {
    if (index2 === 0)
      row.forEach((child) => child.classList.add(classes.rowFirst));
    if (index2 == rows.length - 1)
      row.forEach((child) => child.classList.add(classes.rowLast));
    row.forEach((child, childIndex) => {
      if (childIndex === 0)
        child.classList.add(classes.columnFirst);
      if (childIndex == row.length - 1)
        child.classList.add(classes.columnLast);
    });
  });
}
function getElement(target, context = document) {
  if (typeof target === "string") {
    return context.querySelector(target);
  } else if (target instanceof Element) {
    return target;
  } else {
    console.warn("Unable to getElement()", target);
    return null;
  }
}
function addScrollbarProperty(element = document.body, container2 = window, propName = "--ulu-scrollbar-width") {
  const scrollbarWidth = container2.innerWidth - element.clientWidth;
  element.style.setProperty(propName, `${scrollbarWidth}px`);
}
const dom = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addScrollbarProperty,
  getDatasetJson,
  getDatasetOptionalJson,
  getElement,
  regexJsonString,
  setPositionClasses,
  wasClickOutside
}, Symbol.toStringTag, { value: "Module" }));
function init$f() {
  addScrollbarProperty();
}
const page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: init$f
}, Symbol.toStringTag, { value: "Module" }));
function removeArrayElement(array, element) {
  var index2 = array.indexOf(element);
  if (index2 > -1) {
    array.splice(index2, 1);
  }
}
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
  if (config.outputContext) {
    console.log("Context:\n", context);
  }
}
function set(changes) {
  Object.assign(config, changes);
}
function log(context, ...messages) {
  if (allow(context)) {
    output("log", context, messages);
  }
}
function logWarning(context, ...messages) {
  if (config.warningsAlways || allow(context)) {
    output("warn", context, messages);
  }
}
function logError$1(context, ...messages) {
  if (config.errorsAlways || allow(context)) {
    output("error", context, messages);
  }
}
const classLogger = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  log,
  logError: logError$1,
  logWarning,
  set
}, Symbol.toStringTag, { value: "Module" }));
window.addEventListener(getName$1("pageResized"), () => {
  BreakpointManager.instances.forEach((i) => i.update());
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
    this.order.forEach((n) => this.breakpoints[n] = new Breakpoint(n, this));
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
    return getComputedStyle(this.element).getPropertyValue(this.customProperty).trim();
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
    if (name === this.active) return;
    this.previous = this.active;
    this.previousIndex = this.activeIndex;
    const index2 = this.order.indexOf(name);
    this.active = name;
    this.activeIndex = index2;
    const activeBreakpoint = this.at(this.active);
    const mapBreakpoints = (n) => this.at(n);
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
      if (to) this._call(true);
      else if (this.active) this._call(false);
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
const breakpoints = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
    const options2 = Object.assign({}, _Collapsible.defaults, config2);
    this.elements = elements;
    this.options = options2;
    this.isOpen = false;
    this.handlers = {};
    ensureId(trigger);
    ensureId(content);
    this.debugLog(this, this);
    if (!options2.selfManaged) {
      this.attachHandlers();
    }
    this.setup();
  }
  attachHandlers() {
    const { trigger, content } = this.elements;
    const { focusoutCloses } = this.options;
    this.clickHandler = (event) => {
      this.onClick(event);
    };
    this.focusoutHandler = (event) => {
      if (focusoutCloses) {
        this.close(event);
      }
    };
    trigger.addEventListener("click", this.clickHandler);
    content.addEventListener("focusout", this.focusoutHandler);
  }
  removeHandlers() {
    const { trigger, content } = this.elements;
    trigger.removeEventListener("click", this.clickHandler);
    content.removeEventListener("focusout", this.focusoutHandler);
  }
  onClick(event) {
    this.toggle(event);
  }
  destroy() {
    this.removeHandlers();
    this.destroyTemporaryHandlers();
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
    if (isOpen) {
      this.setupTemporaryHandlers();
    } else {
      this.destroyTemporaryHandlers();
    }
  }
  /**
   * Setup handlers needed for closing once open
   */
  setupTemporaryHandlers() {
    const { content, trigger } = this.elements;
    const { clickOutsideCloses, escapeCloses } = this.options;
    const onDocumentClick = (event) => {
      const { target } = event;
      const inTrigger = trigger.contains(target);
      const inContent = content.contains(target);
      if (clickOutsideCloses && !inTrigger && !inContent) {
        this.close(event);
      }
    };
    const onDocumentKeydown = (event) => {
      if (escapeCloses && event.key === "Escape") {
        this.close(event);
      }
    };
    document.addEventListener("click", onDocumentClick);
    document.addEventListener("keydown", onDocumentKeydown);
    this.handlers.onDocumentClick = onDocumentClick;
    this.handlers.onDocumentKeydown = onDocumentKeydown;
  }
  /**
   * Destroy handlers attached for closing once open
   */
  destroyTemporaryHandlers() {
    const { onDocumentClick, onDocumentKeydown } = this.handlers;
    if (onDocumentClick) {
      document.removeEventListener("click", onDocumentClick);
    }
    if (onDocumentClick) {
      document.removeEventListener("keydown", onDocumentKeydown);
    }
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
  // oneOpenPerContext: false, // This should be another module that manages instances within a context (accordions)
  // clickWithinCloses: false, // Not sure how this was used but seems like it should be separate
  focusoutCloses: false,
  escapeCloses: false,
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
  debug: true,
  onChange(_ctx) {
  }
});
let Collapsible = _Collapsible;
const collapsible = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Collapsible
}, Symbol.toStringTag, { value: "Module" }));
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
  constructor(container2, control, options2) {
    if (!control || !container2) {
      logError$1(this, "Missing required elements 'control' or 'container'");
    }
    this.options = Object.assign({}, _Resizer.defaults, options2);
    this.container = container2;
    this.control = control;
    this.handlerMousedown = this.onMousedown.bind(this);
    this.control.addEventListener("mousedown", this.handlerMousedown);
  }
  destroy() {
    this.control.removeEventListener("mousedown", this.handlerMousedown);
  }
  onMousedown(e) {
    const { overrideMaxWidth, fromLeft } = this.options;
    const doc = document.documentElement;
    const win = document.defaultView;
    const x = e.clientX;
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
const resizer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Resizer
}, Symbol.toStringTag, { value: "Module" }));
const selectors = [
  ".youtube-embedded-video",
  'iframe[title*="YouTube video player"]',
  'iframe[src*="youtube.com/embed"]'
];
function pauseVideos$1(context = document) {
  const videos = getVideos(context);
  videos.forEach((video) => {
    try {
      video.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', "*");
    } catch (error) {
      console.error(error);
    }
  });
}
function prepVideos$1(context = document) {
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
const pauseYoutubeVideo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  pauseVideos: pauseVideos$1,
  prepVideos: prepVideos$1
}, Symbol.toStringTag, { value: "Module" }));
const attrs$b = {
  init: "data-ulu-dialog-init",
  dialog: "data-ulu-dialog",
  trigger: "data-ulu-dialog-trigger",
  close: "data-ulu-dialog-close"
};
const attrSelector$b = (key2) => `[${attrs$b[key2]}]`;
const attrSelectorInitial$8 = (key2) => `${attrSelector$b(key2)}:not([${attrs$b.init}])`;
const queryAllInitial$2 = (key2) => document.querySelectorAll(attrSelectorInitial$8(key2));
const defaults$7 = {
  /**
   * Use non-modal interface for dialog
   */
  nonModal: false,
  /**
   * Move the dialog to the document end (hoist out of content)
   * - helpful if dialogs are within editor body, etc
   */
  documentEnd: false,
  /**
   * Requires styling that reduces any padding/border on dialog
   */
  clickOutsideCloses: true,
  /**
   * Whether or not to pause videos when dialog closes (currently just youtube and native)
   */
  pauseVideos: true
};
let currentDefaults$2 = { ...defaults$7 };
function setDefaults$2(options2) {
  currentDefaults$2 = Object.assign({}, currentDefaults$2, options2);
}
function init$e() {
  document.addEventListener(getName$1("pageModified"), setup$c);
  setup$c();
}
function setup$c() {
  const dialogs = queryAllInitial$2("dialog");
  dialogs.forEach(setupDialog);
  const triggers = queryAllInitial$2("trigger");
  triggers.forEach(setupTrigger$2);
}
function setupTrigger$2(trigger) {
  trigger.addEventListener("click", handleTrigger);
  trigger.setAttribute(attrs$b.init, "");
  function handleTrigger() {
    var _a;
    const id2 = trigger.dataset.uluDialogTrigger;
    const dialog2 = document.getElementById(id2);
    if (!dialog2) {
      console.error("Could not locate dialog (id)", id2);
      return;
    }
    if (((_a = dialog2 == null ? void 0 : dialog2.tagName) == null ? void 0 : _a.toLowerCase()) !== "dialog") {
      console.error("Attempted to trigger non <dialog> element. Did you mean to use modal builder?");
      return;
    }
    const options2 = getDialogOptions(dialog2);
    dialog2[options2.nonModal ? "show" : "showModal"]();
  }
}
function setupDialog(dialog2) {
  const options2 = getDialogOptions(dialog2);
  dialog2.addEventListener("click", handleClicks);
  dialog2.setAttribute(attrs$b.init, "");
  if (options2.documentEnd) {
    document.body.appendChild(dialog2);
  }
  if (options2.pauseVideos) {
    prepVideos(dialog2);
  }
  function handleClicks(event) {
    const { target } = event;
    const closeFromButton = target.closest("[data-ulu-dialog-close]");
    let closeFromOutside = options2.clickOutsideCloses && target === dialog2 && wasClickOutside(dialog2, event);
    if (closeFromOutside || closeFromButton) {
      if (options2.pauseVideos) {
        pauseVideos(dialog2);
      }
      dialog2.close();
    }
  }
}
function getDialogOptions(dialog2) {
  const options2 = getDatasetJson(dialog2, "uluDialog");
  return Object.assign({}, currentDefaults$2, options2);
}
function prepVideos(dialog2) {
  prepVideos$1(dialog2);
}
function pauseVideos(dialog2) {
  pauseVideos$1(dialog2);
  const nativeVideos = dialog2.querySelectorAll("video");
  nativeVideos.forEach((video) => video.pause());
}
const dialog = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attrs: attrs$b,
  defaults: defaults$7,
  getDialogOptions,
  init: init$e,
  setDefaults: setDefaults$2,
  setup: setup$c,
  setupDialog,
  setupTrigger: setupTrigger$2
}, Symbol.toStringTag, { value: "Module" }));
const attrs$a = {
  builder: "data-ulu-modal-builder",
  body: "data-ulu-modal-builder-body",
  resizer: "data-ulu-modal-builder-resizer"
};
const attrSelector$a = (key2) => `[${attrs$a[key2]}]`;
const defaults$6 = {
  title: null,
  titleIcon: null,
  nonModal: false,
  documentEnd: true,
  allowResize: false,
  position: "center",
  bodyFills: false,
  noBackdrop: false,
  size: "default",
  print: false,
  noMinHeight: false,
  class: "",
  classCloseIcon: "css-icon css-icon--close",
  classResizerIcon: "css-icon css-icon--drag",
  debug: false,
  templateCloseIcon(config2) {
    return `<span class="modal__close-icon ${config2.classCloseIcon}" aria-hidden="true"></span>`;
  },
  templateResizerIcon(config2) {
    return `<span class="modal__resizer-icon ${config2.classResizerIcon}" aria-hidden="true"></span>`;
  },
  /**
   * Default modal template
   * @param {String} id ID for new modal
   * @param {Object} config Resolved options
   * @returns {String} Markup for modal
   */
  template(id2, config2) {
    const classes = [
      "modal",
      `modal--${config2.position}`,
      `modal--${config2.size}`,
      `modal--${config2.allowResize ? "resize" : "no-resize"}`,
      ...!config2.title ? ["modal--no-header"] : [],
      ...config2.bodyFills ? ["modal--body-fills"] : [],
      ...config2.noBackdrop ? ["modal--no-backdrop"] : [],
      ...config2.noMinHeight ? ["modal--no-min-height"] : [],
      ...config2.class ? [config2.class] : []
    ];
    return `
      <dialog id="${id2}" class="${classes.join(" ")}">
        ${config2.title ? `
          <header class="modal__header">
            <h2 class="modal__title">
              ${config2.titleIcon ? `<span class="modal__title-icon ${config2.titleIcon}" aria-hidden="true"></span>` : ""}
              <span class="modal__title-text">${config2.title}</span>
            </h2>
            <button class="modal__close" aria-label="Close modal" ${attrs$b.close} autofocus>
              ${config2.templateCloseIcon(config2)}
            </button>
          </header>
        ` : ""}
        <div class="modal__body" ${attrs$a.body}></div>
        ${config2.hasResizer ? `<div class="modal__resizer" ${attrs$a.resizer}>
            ${config2.templateResizerIcon(config2)}
          </div>` : ""}
      </div>
    `;
  }
};
let currentDefaults$1 = { ...defaults$6 };
function setDefaults$1(options2) {
  currentDefaults$1 = Object.assign({}, currentDefaults$1, options2);
}
function init$d() {
  document.addEventListener(getName$1("pageModified"), setup$b);
  setup$b();
}
function setup$b() {
  const builders = document.querySelectorAll(attrSelector$a("builder"));
  builders.forEach(setupBuilder);
}
function setupBuilder(element) {
  const options2 = getDatasetJson(element, "uluModalBuilder");
  element.removeAttribute(attrs$a.builder);
  buildModal(element, options2);
}
function buildModal(content, options2) {
  const config2 = Object.assign({}, currentDefaults$1, options2);
  if (config2.position !== "center" && config2.allowResize) {
    config2.hasResizer = true;
  }
  if (config2.debug) {
    console.log(config2, content);
  }
  if (!content.id) {
    throw new Error("Missing ID on modal");
  }
  const markup = config2.template(content.id, config2);
  const modal = createElementFromHtml(markup.trim());
  const selectChild = (key2) => modal.querySelector(attrSelector$a(key2));
  const body2 = selectChild("body");
  const resizer2 = selectChild("resizer");
  const dialogOptions = separateDialogOptions(config2);
  content.removeAttribute("id");
  content.removeAttribute("hidden");
  content.removeAttribute(attrs$a.builder);
  content.parentNode.replaceChild(modal, content);
  body2.appendChild(content);
  modal.setAttribute(attrs$b.dialog, JSON.stringify(dialogOptions));
  if (config2.hasResizer) {
    new Resizer(modal, resizer2, {
      fromLeft: config2.position === "right"
    });
  }
  if (config2.print) {
    let printClone;
    document.addEventListener(getName$1("beforePrint"), () => {
      printClone = content.cloneNode(true);
      modal.after(printClone);
    });
    document.addEventListener(getName$1("afterPrint"), () => {
      printClone.remove();
    });
  }
  return { modal };
}
function separateDialogOptions(config2) {
  return Object.keys(defaults$7).reduce((acc, key2) => {
    if (key2 in config2) {
      acc[key2] = config2[key2];
    }
    return acc;
  }, {});
}
const modalBuilder = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buildModal,
  defaults: defaults$6,
  init: init$d,
  setDefaults: setDefaults$1,
  setup: setup$b,
  setupBuilder
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
    const { namespace, proxyClick: proxyClick2 } = this.options;
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
    if (proxyClick2) {
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
const attrs$9 = {
  init: "data-ulu-flipcard-init",
  flipcard: "data-ulu-flipcard",
  front: "data-ulu-flipcard-front",
  back: "data-ulu-flipcard-back"
};
const attrSelector$9 = (key2) => `[${attrs$9[key2]}]`;
const attrSelectorInitial$7 = (key2) => `${attrSelector$9(key2)}:not([${attrs$9.init}])`;
const instances$4 = [];
function init$c() {
  document.addEventListener(getName$1("pageModified"), setup$a);
  setup$a();
}
function setup$a() {
  const builders = document.querySelectorAll(attrSelectorInitial$7("flipcard"));
  builders.forEach(setupFlipcard);
}
function setupFlipcard(container2) {
  container2.setAttribute(attrs$9.init, "");
  const options2 = getDatasetOptionalJson(container2, "uluFlipcard");
  const config2 = Object.assign({}, options2);
  const front = container2.querySelector(attrSelectorInitial$7("front"));
  const back = container2.querySelector(attrSelectorInitial$7("back"));
  instances$4.push(new Flipcard(container2, front, back, config2));
}
const flipcard = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Flipcard,
  attrs: attrs$9,
  init: init$c,
  setup: setup$a
}, Symbol.toStringTag, { value: "Module" }));
function init$b(selector = "[data-grid]", classes) {
  document.addEventListener(getName$1("pageModified"), () => setup$9(selector, classes));
  document.addEventListener(getName$1("pageResized"), () => setup$9(selector, classes));
  setup$9(selector, classes);
}
function setup$9(selector, classes) {
  document.querySelectorAll(selector).forEach((element) => setPositionClasses(element, classes || void 0));
}
const grid = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: init$b,
  setup: setup$9
}, Symbol.toStringTag, { value: "Module" }));
function createPager() {
  return function pager(instance, dir) {
    const isNext = dir === "next";
    const { track } = instance.elements;
    if (!track.children) return 400;
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
const overflowScrollerPager = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createPager
}, Symbol.toStringTag, { value: "Module" }));
function hasRequiredProps(required) {
  return (obj) => {
    return required.every((prop) => {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    });
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
    this.scrollHandler = (e) => this.onScroll(e);
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
    button.classList.add(...this.options.buttonClasses);
    button.setAttribute("type", "button");
    button.innerHTML = this.getControlContent(action);
    return button;
  }
  getControlContent(action) {
    const classes = this.options[action === "next" ? "iconClassesNext" : "iconClassesPrevious"];
    return `
      <span class="hidden-visually">${action}</span>
      <span class="${classes.join(" ")}" aria-hidden="true"></span>
    `;
  }
  onScroll(event) {
    if (!this.hasOverflow) return;
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
  amount: "auto",
  buttonClasses: ["button", "button--icon"],
  iconClassesPrevious: ["css-icon", "css-icon--angle-left"],
  iconClassesNext: ["css-icon", "css-icon--angle-right"]
});
let OverflowScroller = _OverflowScroller;
const overflowScroller = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OverflowScroller
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
      if (rtl) return isStart ? rl : lr;
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
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
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
      i = -1;
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
async function detectOverflow(state, options2) {
  var _await$platform$isEle;
  if (options2 === void 0) {
    options2 = {};
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
  } = evaluate(options2, state);
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
const arrow$1 = (options2) => ({
  name: "arrow",
  options: options2,
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
    } = evaluate(options2, state) || {};
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
const flip$1 = function(options2) {
  if (options2 === void 0) {
    options2 = {};
  }
  return {
    name: "flip",
    options: options2,
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
      } = evaluate(options2, state);
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
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$map$so;
              const placement2 = (_overflowsData$map$so = overflowsData.map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
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
  const sortedRects = rects.slice().sort((a, b) => a.y - b.y);
  const groups = [];
  let prevRect = null;
  for (let i = 0; i < sortedRects.length; i++) {
    const rect = sortedRects[i];
    if (!prevRect || rect.y - prevRect.y > prevRect.height / 2) {
      groups.push([rect]);
    } else {
      groups[groups.length - 1].push(rect);
    }
    prevRect = rect;
  }
  return groups.map((rect) => rectToClientRect(getBoundingRect(rect)));
}
const inline$1 = function(options2) {
  if (options2 === void 0) {
    options2 = {};
  }
  return {
    name: "inline",
    options: options2,
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
      } = evaluate(options2, state);
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
async function convertValueToCoords(state, options2) {
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
  const rawValue = evaluate(options2, state);
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
const offset$1 = function(options2) {
  if (options2 === void 0) {
    options2 = 0;
  }
  return {
    name: "offset",
    options: options2,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options2);
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
const shift$1 = function(options2) {
  if (options2 === void 0) {
    options2 = {};
  }
  return {
    name: "shift",
    options: options2,
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
      } = evaluate(options2, state);
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
  if (typeof CSS === "undefined" || !CSS.supports) return false;
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
    } catch (e) {
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
  const body2 = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body2.scrollWidth, body2.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body2.scrollHeight, body2.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body2).direction === "rtl") {
    x += max(html.clientWidth, body2.clientWidth) - width;
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
    const options2 = {
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
        ...options2,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options2);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options2) {
  if (options2 === void 0) {
    options2 = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options2;
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
const computePosition = (reference, floating, options2) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform: platform$2,
    ...options2
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
const defaults$5 = {
  strategy: "absolute",
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
  const options2 = Object.assign({}, defaults$5, config2);
  const { placement, strategy } = options2;
  const { trigger, content, contentArrow } = elements;
  return autoUpdate(trigger, content, () => {
    computePosition(trigger, content, {
      placement,
      strategy,
      middleware: [
        ...addPlugin(inline, options2.inline),
        ...addPlugin(offset, options2.offset),
        ...addPlugin(flip, options2.flip),
        ...addPlugin(shift, options2.shift),
        ...addPlugin(arrow, contentArrow && options2.arrow, { element: contentArrow })
      ]
    }).then((data) => {
      const { x, y, middlewareData, placement: placement2 } = data;
      const arrowPos = middlewareData.arrow;
      Object.assign(content.style, {
        left: `${x}px`,
        top: `${y}px`
      });
      content.setAttribute("data-placement", placement2);
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
const floatingUi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createFloatingUi,
  defaults: defaults$5
}, Symbol.toStringTag, { value: "Module" }));
const instances$3 = /* @__PURE__ */ new WeakMap();
const logError = (...msgs) => console.error("@ulu (popovers):", ...msgs);
const attrs$8 = {
  trigger: "data-ulu-popover-trigger",
  content: "data-ulu-popover-content",
  arrow: "data-ulu-popover-arrow",
  anchor: "data-ulu-popover-trigger-anchor"
};
const attrSelector$8 = (key2) => `[${attrs$8[key2]}]`;
const collapsibleDefaults = {
  clickOutsideCloses: true,
  escapeCloses: true
};
function init$a() {
  document.addEventListener(getName$1("pageModified"), setup$8);
  setup$8();
}
function setup$8() {
  const triggers = document.querySelectorAll(attrSelector$8("trigger"));
  const resolved = Array.from(triggers).filter((trigger) => !instances$3.has(trigger)).map(resolve).filter((v) => v);
  resolved.forEach(({ elements, options: options2, floatingOptions }) => {
    instances$3.set(elements.trigger, new Popover(elements, options2, floatingOptions));
  });
}
function resolve(trigger) {
  const raw = trigger.dataset.uluPopoverTrigger;
  const options2 = (raw == null ? void 0 : raw.length) ? JSON.parse(raw) : {};
  const content = getContentByTrigger(trigger);
  const elements = {
    trigger,
    content,
    anchor: trigger.querySelector(attrSelector$8("anchor")) || trigger,
    contentArrow: content.querySelector(attrSelector$8("arrow"))
  };
  const floatingOptions = options2.floating || {};
  delete options2.floating;
  if (content) {
    return { elements, options: options2, floatingOptions };
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
  } else if ((_a = trigger == null ? void 0 : trigger.nextElementSibling) == null ? void 0 : _a.hasAttribute(attrs$8.content)) {
    content = trigger.nextElementSibling;
  } else {
    const children = Array.from(trigger.parentNode.children);
    const triggerIndex = children.findIndex((c) => c === trigger);
    const childrenAfter = children.slice(triggerIndex);
    content = childrenAfter.find((child) => child.matches(attrSelector$8("content")));
  }
  if (!content) {
    logError("Unable to resolve 'content' element for popover", trigger);
  }
  return content;
}
class Popover extends Collapsible {
  constructor(elements, config2, floatingOptions) {
    const options2 = Object.assign({}, collapsibleDefaults, config2);
    super(elements, options2);
    this.floatingOptions = floatingOptions || {};
  }
  setState(isOpen, event) {
    super.setState(isOpen, event);
    this.destroyFloatingInstance();
    if (isOpen) {
      this.createFloatingInstance();
    }
  }
  destroy() {
    super.destroy();
    this.destroyFloatingInstance();
  }
  createFloatingInstance() {
    const { content, anchor, contentArrow } = this.elements;
    const floatingElements = { trigger: anchor, contentArrow, content };
    this.floatingCleanup = createFloatingUi(floatingElements, this.floatingOptions);
  }
  destroyFloatingInstance() {
    if (this.floatingCleanup) {
      this.floatingCleanup();
      this.floatingCleanup = null;
    }
  }
}
const popover = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Popover,
  getContentByTrigger,
  init: init$a,
  instances: instances$3,
  resolve,
  setup: setup$8
}, Symbol.toStringTag, { value: "Module" }));
const attrs$7 = {
  trigger: "data-ulu-tooltip",
  init: "data-ulu-init",
  body: "data-ulu-tooltip-display-body",
  arrow: "data-ulu-tooltip-arrow"
};
const attrSelector$7 = (key2) => `[${attrs$7[key2]}]`;
const attrSelectorInitial$6 = (key2) => `${attrSelector$7(key2)}:not([${attrs$7.init}])`;
function init$9() {
  document.addEventListener(getName$1("pageModified"), setup$7);
  setup$7();
}
function setup$7() {
  const triggers = document.querySelectorAll(attrSelectorInitial$6("trigger"));
  triggers.forEach(setupTrigger$1);
}
function setupTrigger$1(trigger) {
  const passed = getDatasetOptionalJson(trigger, "uluTooltip");
  const options2 = typeof passed === "object" ? passed : {};
  if (typeof passed === "string") {
    options2.content = passed;
  }
  return new Tooltip({ trigger }, options2);
}
const _Tooltip = class _Tooltip {
  constructor(elements, userOptions, floatingOptions) {
    const { trigger } = elements;
    if (!trigger) {
      logError$1(this, "missing required trigger");
      return;
    }
    this.options = Object.assign({}, _Tooltip.defaults, userOptions);
    this.floatingOptions = Object.assign({}, _Tooltip.defaultFloatingOptions, floatingOptions);
    this.elements = { ...elements };
    this.handlers = {};
    this.isOpen = false;
    ensureId(trigger);
    this.setup();
  }
  setup() {
    this.createContentElement();
    this.attachHandlers();
    this.setupAccessibility();
  }
  setupAccessibility() {
    const { trigger, content } = this.elements;
    const { accessible } = this.options;
    if (!accessible) return;
    trigger.setAttribute("aria-describedby", content.id);
  }
  destroy() {
    this.destroyHandlers();
    this.destroyDisplay();
  }
  getInnerContent() {
    const { fromElement, content, isHtml, fromAnchor } = this.options;
    if (content) {
      return content;
    } else if (fromElement || fromAnchor) {
      const element = fromAnchor ? this.getAnchorElement() : document.querySelector(fromElement);
      if (element) {
        return isHtml ? element.innerHTML : element.innerText;
      } else {
        return "";
      }
    } else {
      logError$1(this, "Could not resolve inner content");
    }
  }
  getAnchorElement() {
    const { trigger } = this.elements;
    const { href } = trigger;
    const id2 = href ? href.split("#")[1] : null;
    const element = id2 ? document.getElementById(id2) : null;
    if (!element) {
      console.error("Unable to get 'fromAnchor' element", trigger);
    }
    return element;
  }
  createContentElement() {
    const { options: options2 } = this;
    const content = createElementFromHtml(options2.template(options2));
    const body2 = content.querySelector(attrSelector$7("body"));
    const innerContent = this.getInnerContent();
    if (options2.isHtml) {
      body2.innerHTML = innerContent;
    } else {
      body2.textContent = innerContent;
    }
    content.id = newId();
    if (options2.contentClass) {
      content.classList.add(options2.contentClass);
    }
    this.elements.content = content;
    this.elements.contentArrow = content.querySelector(attrSelector$7("arrow"));
    document.body.appendChild(content);
  }
  attachHandlers() {
    const { trigger } = this.elements;
    const { showEvents, hideEvents, delay } = this.options;
    let tid = null;
    const onShow = (event) => {
      if (tid) return;
      tid = setTimeout(() => {
        this.show(event);
        clearTimeout(tid);
      }, delay);
    };
    const onHide = (event) => {
      if (tid) {
        clearTimeout(tid);
        tid = null;
      }
      this.hide(event);
    };
    const onDocumentKeydown = (event) => {
      if (event.key === "Escape") {
        this.hide(event);
      }
    };
    showEvents.forEach((name) => {
      trigger.addEventListener(name, onShow);
    });
    hideEvents.forEach((name) => {
      trigger.addEventListener(name, onHide);
    });
    document.addEventListener("keydown", onDocumentKeydown);
    this.handlers = { onShow, onHide, onDocumentKeydown };
  }
  destroyHandlers() {
    const { trigger } = this;
    const { onShow, onHide, onDocumentKeydown } = this.handlers;
    const { showEvents, hideEvents } = this.options;
    if (onShow) {
      showEvents.forEach((name) => {
        trigger.removeEventListener(name, onShow);
      });
    }
    if (onHide) {
      hideEvents.forEach((name) => {
        trigger.removeEventListener(name, onHide);
      });
    }
    if (onDocumentKeydown) {
      document.removeEventListener("keydown", onDocumentKeydown);
    }
  }
  setState(isOpen, event) {
    const ctx = {
      instance: this,
      isOpen,
      event
    };
    const { trigger, content } = this.elements;
    const { openClass } = this.options;
    const setClass = (el) => el.classList[isOpen ? "add" : "remove"](openClass);
    setClass(trigger);
    setClass(content);
    this.isOpen = isOpen;
    this.options.onChange(ctx);
    trigger.dispatchEvent(this.createEvent("change", ctx));
    this.destroyFloatingInstance();
    if (isOpen) {
      this.createFloatingInstance();
    }
  }
  createEvent(name, detail) {
    return new CustomEvent(getName$1("tooltip:" + name), { detail });
  }
  createFloatingInstance() {
    this.floatingCleanup = createFloatingUi(this.elements, this.floatingOptions);
  }
  destroyFloatingInstance() {
    if (this.floatingCleanup) {
      this.floatingCleanup();
      this.floatingCleanup = null;
    }
  }
  show(event) {
    this.setState(true, event);
  }
  hide(event) {
    this.setState(false, event);
  }
};
/**
 * Defaults options
 */
__publicField(_Tooltip, "defaults", {
  /**
   * Should the tooltip and content be linked accessibly
   * - Note tooltips can only apply to interactive elements! (ie button, input, role="...", etc)
   * @type {Boolean}
   */
  accessible: true,
  /**
   * String/markup to insert into tooltip display
   * @type {String}
   */
  content: null,
  openClass: "is-active",
  contentClass: "",
  isHtml: false,
  /**
   * Pull content from pre-existing content on page 
   * @type {String|Node}
   */
  fromElement: null,
  /**
   * If used on a link that is an anchor link it will display the content of the anchor like fromElement
   */
  fromAnchor: false,
  /**
   * Move the content to the bottom of the document
   * @type {Boolean}
   */
  endOfDocument: true,
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
  template(_config) {
    return `
        <div class="popover popover--tooltip">
          <div class="popover__inner" ${attrs$7.body}>
          </div>
          <span class="popover__arrow" data-ulu-tooltip-arrow></span>
        </div>
      `;
  },
  /**
   * Callback when tooltip is shown or hidden
   * @type {Function}
   */
  onChange(_ctx) {
  }
});
__publicField(_Tooltip, "defaultFloatingOptions", {
  // strategy: "fixed"
});
let Tooltip = _Tooltip;
const tooltip = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Tooltip,
  init: init$9,
  setup: setup$7,
  setupTrigger: setupTrigger$1
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
            } catch (e) {
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
  function test(data, options2) {
    data.wrapper.innerHTML = "";
    var element = typeof options2.element === "string" ? data.document.createElement(options2.element) : options2.element(data.wrapper, data.document);
    var focus2 = options2.mutate && options2.mutate(element, data.wrapper, data.document);
    if (!focus2 && focus2 !== false) {
      focus2 = element;
    }
    !element.parentNode && data.wrapper.appendChild(element);
    focus2 && focus2.focus && focus2.focus();
    return options2.validate ? options2.validate(element, focus2, data.document) : data.document.activeElement === focus2;
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
    } catch (e) {
      data = {};
    }
    return data;
  }
  function writeLocalStorage(key2, value) {
    if (!document.hasFocus()) {
      try {
        window.localStorage && window.localStorage.removeItem(key2);
      } catch (e) {
      }
      return;
    }
    try {
      window.localStorage && window.localStorage.setItem(key2, JSON.stringify(value));
    } catch (e) {
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
    set: function set2(values) {
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
      } catch (e) {
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
  } catch (e) {
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
      } catch (e) {
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
    for (var i = 0; i < length; i++) {
      if (callback(array[i], i, array)) {
        return i;
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
    } catch (e) {
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
    } catch (e) {
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
    var options2 = {
      context: element,
      includeContext,
      includeOnlyTabbable,
      strategy
    };
    if (strategy === "quick") {
      return (0, _focusable4.default)(options2);
    } else if (strategy === "strict" || strategy === "all") {
      return (0, _focusable2.default)(options2);
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
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
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
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
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
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
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
  function compareDomPosition(a, b) {
    return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
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
    insertions.sort(function(a, b) {
      return a.offset - b.offset;
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
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
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
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
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
  for (var n = 1; n < 26; n++) {
    keycode2["f" + n] = n + 111;
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
    Slider.instances.forEach((i) => i.handleResize());
  }, 250));
});
const requiredElements = [
  "container",
  "trackContainer",
  "track",
  "slides"
];
const attrs$6 = {
  init: "data-ulu-slider-init",
  slider: "data-ulu-slider",
  track: "data-ulu-slider-track",
  trackContainer: "data-ulu-slider-track-container",
  controls: "data-ulu-slider-control-context"
};
const attrSelector$6 = (key2) => `[${attrs$6[key2]}]`;
const attrSelectorInitial$5 = (key2) => `${attrSelector$6(key2)}:not([${attrs$6.init}])`;
const defaults$4 = {
  amount: createPager()
};
const instances$2 = [];
function init$8() {
  document.addEventListener(getName$1("pageModified"), setup$6);
  setup$6();
}
function setup$6() {
  const builders = document.querySelectorAll(attrSelectorInitial$5("slider"));
  builders.forEach(setupSlider$1);
}
function setupSlider$1(container2) {
  container2.setAttribute(attrs$6.init, "");
  const options2 = getDatasetOptionalJson(container2, "uluScrollSlider");
  const config2 = Object.assign({}, defaults$4, options2);
  const elements = {
    container: container2,
    track: container2.querySelector("[data-ulu-slider-track]"),
    trackContainer: container2.querySelector("[data-ulu-slider-track-container]"),
    controlContext: container2.querySelector("[data-ulu-slider-control-context]"),
    slides: container2.querySelectorAll("[data-ulu-slider-slide]")
  };
  if (elements.slides.length) {
    instances$2.push(new Slider(elements, config2, false));
  }
}
const _Slider = class _Slider {
  // constructor(container, title, trackContainer, track, slides, config, debug = false) {
  constructor(elements, config2, debug = false) {
    const options2 = Object.assign({}, _Slider.defaults, config2);
    this.debug = debug;
    this.options = options2;
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
    this.transition = options2.transition ? options2.transitionFade || reduceMotion ? this.fadeTransition : this.slideTransition : this.noTransition;
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
  ensureTransitionEnds(element, duration, beginTransition) {
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
    const set2 = () => track.style.transform = `translateX(-${x}px)`;
    track.style.willChange = "transform";
    return this.ensureTransitionEnds(track, duration, set2).then(() => {
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
    const { options: options2 } = this;
    const { element } = slide;
    const duration = visible2 ? options2.transitionDuration : options2.transitionDurationExit;
    return this.ensureTransitionEnds(element, duration, () => {
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
    if (old) old.navButton.classList.remove(activeClass);
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
    button.classList.add(...this.options.buttonClasses);
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
  // change to css-icon 
  getControlContent(action) {
    const classes = this.options[action === "next" ? "iconClassesNext" : "iconClassesPrevious"];
    return `
      <span class="hidden-visually">${action}</span>
      <span class="${classes.join(" ")}" aria-hidden="true"></span>
    `;
  }
  getNavContent(number) {
    return `<span class="hidden-visually">Item ${number}</span>`;
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
  transitionTimingFunction: "ease-in-out",
  buttonClasses: ["Slider__control-icon", "button", "button--icon"],
  iconClassesPrevious: ["css-icon", "css-icon--angle-left"],
  iconClassesNext: ["css-icon", "css-icon--angle-right"]
  // transition: true
});
let Slider = _Slider;
const slider = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Slider,
  attrs: attrs$6,
  init: init$8,
  setup: setup$6,
  setupSlider: setupSlider$1
}, Symbol.toStringTag, { value: "Module" }));
var ariaTablist_min = { exports: {} };
(function(module, exports) {
  !function(t, e) {
    module.exports = e();
  }(window, function() {
    return function(t) {
      var e = {};
      function i(a) {
        if (e[a]) return e[a].exports;
        var s = e[a] = { i: a, l: false, exports: {} };
        return t[a].call(s.exports, s, s.exports, i), s.l = true, s.exports;
      }
      return i.m = t, i.c = e, i.d = function(t2, e2, a) {
        i.o(t2, e2) || Object.defineProperty(t2, e2, { enumerable: true, get: a });
      }, i.r = function(t2) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
      }, i.t = function(t2, e2) {
        if (1 & e2 && (t2 = i(t2)), 8 & e2) return t2;
        if (4 & e2 && "object" == typeof t2 && t2 && t2.__esModule) return t2;
        var a = /* @__PURE__ */ Object.create(null);
        if (i.r(a), Object.defineProperty(a, "default", { enumerable: true, value: t2 }), 2 & e2 && "string" != typeof t2) for (var s in t2) i.d(a, s, (function(e3) {
          return t2[e3];
        }).bind(null, s));
        return a;
      }, i.n = function(t2) {
        var e2 = t2 && t2.__esModule ? function() {
          return t2.default;
        } : function() {
          return t2;
        };
        return i.d(e2, "a", e2), e2;
      }, i.o = function(t2, e2) {
        return Object.prototype.hasOwnProperty.call(t2, e2);
      }, i.p = "", i(i.s = 0);
    }([function(t, e, i) {
      i.r(e), i.d(e, "AriaTablist", function() {
        return x;
      });
      var a = 35, s = 36, n = 37, r = 38, o = 39, l = 40, h = 46, b = 13, c = 32, u = { 37: -1, 38: -1, 39: 1, 40: 1 }, d = function() {
        function t2(t3) {
          this.tabs = t3.tabs, this.panels = t3.panels, this.options = t3.options, this.open = this.open.bind(t3), this.close = this.close.bind(t3), this.delete = this.delete.bind(t3), this.destroy = this.destroy.bind(t3), t3.tablist.ariaTablist = this;
        }
        return t2.prototype.open = function(t3, e2) {
          this.checkMultiple(), this.activateTabWithTimer.apply(this, [t3, e2, true]);
        }, t2.prototype.close = function(t3, e2) {
          this.checkMultiple(), this.deactivateTab.apply(this, [t3, e2, true]), this.makeFocusable();
        }, t2.prototype.delete = function(t3) {
          this.determineDeletable.call(this, t3);
        }, t2.prototype.destroy = function() {
          this.destroy.call(this);
        }, t2;
      }(), p = function(t2) {
        for (var e2 in void 0 === t2 && (t2 = {}), this.delay = 0, this.deletable = false, this.focusableTabs = false, this.focusablePanels = true, this.arrowActivation = false, this.allArrows = false, this.tabSelector = '[role="tab"]', this.tabindex = 0, t2) t2.hasOwnProperty(e2) && void 0 !== t2[e2] && (this[e2] = t2[e2]);
      };
      function f(t2) {
        t2 && "function" == typeof t2.preventDefault && t2.preventDefault();
      }
      function v(t2, e2) {
        return t2.getAttribute && t2.getAttribute(e2) || "";
      }
      function y(t2, e2, i2) {
        t2 && v(t2, e2) !== i2 && t2.setAttribute && t2.setAttribute(e2, i2);
      }
      function T(t2, e2) {
        t2 && e2 && t2.removeAttribute && e2.split(" ").forEach(function(e3) {
          return e3 && t2.removeAttribute(e3);
        });
      }
      var m = 0, g = function() {
        function t2(t3, e2) {
          if (this.tabs = [], this.panels = [], t3 && 1 === t3.nodeType) {
            var i2 = t3.ariaTablist;
            i2 && "function" == typeof i2.destroy && i2.destroy(), m += 1, this.tablist = t3, this.options = new p(e2), this.api = new d(this), this.init();
          }
        }
        return t2.prototype.checkMultiple = function() {
          this.multiple = "true" === v(this.tablist, "aria-multiselectable");
        }, t2.prototype.triggerOptionCallback = function(t3, e2) {
          if (void 0 === e2 && (e2 = []), this.options && "function" == typeof this.options[t3]) return this.options[t3].apply(this.api, e2);
        }, t2.prototype.makeFocusable = function() {
          for (var t3 = "" + (this.options.tabindex || 0), e2 = 0, i2 = this.tabs.length; e2 < i2; e2 += 1) if (v(this.tabs[e2], "tabindex") === t3) return;
          y(this.tabs[0], "tabindex", t3);
        }, t2.prototype.setCoreAttributes = function(t3, e2, i2) {
          var a2 = this.options.tabindex || "0";
          this.options.focusableTabs && y(t3, "tabindex", a2), this.options.focusablePanels && y(e2, "tabindex", a2), t3.id || y(t3, "id", "aria-tablist-" + m + "-tab-" + i2), e2.id || y(e2, "id", "aria-tablist-" + m + "-panel-" + i2), y(t3, "role", "tab"), y(e2, "role", "tabpanel"), y(t3, "aria-controls", e2.id), y(e2, "aria-labelledby", t3.id);
        }, t2.prototype.getTabPanel = function(t3) {
          var e2 = "number" == typeof t3 ? this.tabs[t3] : t3;
          if (!e2 || 1 !== e2.nodeType) return null;
          var i2 = "number" == typeof t3 ? this.panels[t3] : null;
          if (i2) return i2;
          var a2 = v(e2, "aria-controls");
          return a2 || (a2 = v(e2, "data-controls")), a2 && (i2 = document.getElementById(a2)), i2 || (a2 && T(e2, "aria-controls"), e2.id && (i2 = document.querySelector('[aria-labelledby="' + e2.id + '"]')), i2 || (i2 = document.querySelector('[data-labelledby="' + e2.id + '"]'))), i2;
        }, t2.prototype.generateArrays = function(t3) {
          this.tabs.splice(0), this.panels.splice(0);
          var e2 = this.tablist.querySelectorAll(this.options.tabSelector);
          t3 && !e2.length && (e2 = this.tablist.childNodes);
          for (var i2 = 0, a2 = e2.length; i2 < a2; i2 += 1) {
            var s2 = e2[i2];
            if (s2 && 1 === s2.nodeType && !(this.panels.indexOf(s2) > -1)) {
              var n2 = this.getTabPanel(s2);
              n2 ? (this.tabs.push(s2), this.panels.push(n2), this.setCoreAttributes(s2, n2, i2), s2._ariaTablistTabIndex = this.tabs.length - 1) : "tab" === v(s2, "role") && T(s2, "role");
            }
          }
        }, t2.prototype.elementIsTab = function(t3) {
          return !!(t3 && this.tabs.indexOf(t3) > -1);
        }, t2.prototype.addListenersToTab = function(t3) {
          var e2 = this.tabs[t3];
          e2.addEventListener("keydown", this.tabKeydownEvent), e2.addEventListener("keyup", this.tabKeyupEvent), e2.addEventListener("click", this.tabClickEvent);
        }, t2.prototype.tabClickEvent = function(t3) {
          var e2 = t3.target;
          do {
            if (this.elementIsTab(e2)) return this.checkMultiple(), f(t3), this.activateTabWithTimer(e2, false);
            e2 = e2.parentElement || e2.parentNode;
          } while (null !== e2 && 1 === e2.nodeType);
        }, t2.prototype.tabKeydownEvent = function(t3) {
          if (this.elementIsTab(t3.target)) switch (t3.keyCode) {
            case a:
              f(t3), this.focusLastTab();
              break;
            case s:
              f(t3), this.focusFirstTab();
              break;
            case r:
            case l:
            case n:
            case o:
              this.processArrowPress(t3);
              break;
            case c:
            case b:
              f(t3);
          }
        }, t2.prototype.tabKeyupEvent = function(t3) {
          var e2 = t3.target;
          if (this.elementIsTab(e2)) switch (t3.keyCode) {
            case h:
              this.determineDeletable(e2);
              break;
            case b:
            case c:
              this.checkMultiple(), f(t3), this.activateTabWithTimer(e2);
          }
        }, t2.prototype.processArrowPress = function(t3) {
          var e2 = t3.keyCode;
          (this.options.allArrows || ("vertical" === v(this.tablist, "aria-orientation") ? e2 === r || e2 === l : e2 === n || e2 === o)) && this.switchTabOnArrowPress(t3);
        }, t2.prototype.switchTabOnArrowPress = function(t3) {
          var e2 = t3.keyCode, i2 = u[e2], a2 = t3.target._ariaTablistTabIndex;
          if (i2 && "number" == typeof a2) {
            f(t3);
            var s2 = (e2 === n || e2 === o) && ("rtl" === document.dir || "rtl" === this.tablist.dir);
            s2 && "ltr" !== this.tablist.dir && (i2 *= -1);
            var h2 = a2 + i2;
            this.tabs[h2] ? this.focusTab(h2) : e2 === n || e2 === r ? s2 ? this.focusFirstTab() : this.focusLastTab() : e2 !== o && e2 != l || (s2 ? this.focusLastTab() : this.focusFirstTab());
          }
        }, t2.prototype.getTab = function(t3) {
          return "number" == typeof t3 && this.elementIsTab(this.tabs[t3]) ? this.tabs[t3] : this.elementIsTab(t3) ? t3 : null;
        }, t2.prototype.activateTabWithTimer = function(t3, e2, i2) {
          var a2 = this;
          this.tabTimer && clearTimeout(this.tabTimer);
          var s2 = "number" == typeof this.options.delay ? this.options.delay : 0;
          this.tabTimer = setTimeout(function() {
            a2.activateTab(t3, e2, i2);
          }, s2);
        }, t2.prototype.activateTab = function(t3, e2, i2) {
          void 0 === e2 && (e2 = true), void 0 === i2 && (i2 = false);
          var a2 = this.getTab(t3);
          if (a2 && e2 && a2.focus(), a2 && (i2 || "true" !== v(a2, "aria-disabled"))) {
            var s2 = "true" === v(a2, "aria-selected");
            if (this.multiple && s2 && !i2) return this.deactivateTab(a2), void this.makeFocusable();
            this.multiple || this.deactivateTabs([a2]);
            var n2 = this.options.tabindex || "0";
            y(a2, "tabindex", n2), y(a2, "aria-selected", "true");
            var r2 = this.getTabPanel(t3);
            if (r2) {
              var o2 = "hidden" === v(r2, "hidden");
              T(r2, "hidden aria-hidden"), this.multiple && (y(r2, "aria-expanded", "true"), y(a2, "aria-expanded", "true")), this.options.focusablePanels && y(r2, "tabindex", n2), o2 && this.triggerOptionCallback("onOpen", [r2, a2]);
            }
          }
        }, t2.prototype.deactivateTab = function(t3, e2, i2) {
          void 0 === e2 && (e2 = false), void 0 === i2 && (i2 = false);
          var a2 = this.getTab(t3);
          if (a2 && (e2 && a2.focus(), y(a2, "tabindex", this.options.focusableTabs ? this.options.tabindex || "0" : "-1"), i2 || "true" !== v(a2, "aria-disabled"))) {
            y(a2, "aria-selected", "false");
            var s2 = this.getTabPanel(t3);
            if (s2) {
              var n2 = "hidden" === v(s2, "hidden");
              T(s2, "tabindex"), y(s2, "hidden", "hidden"), y(s2, "aria-hidden", "true"), this.multiple ? (y(a2, "aria-expanded", "false"), y(s2, "aria-expanded", "false")) : (T(s2, "aria-expanded"), T(a2, "aria-expanded")), n2 || this.triggerOptionCallback("onClose", [s2, a2]);
            }
          }
        }, t2.prototype.deactivateTabs = function(t3) {
          var e2 = this;
          void 0 === t3 && (t3 = []);
          var i2 = Array.isArray(t3);
          this.tabs.forEach(function(a2) {
            i2 && -1 !== t3.indexOf(a2) || e2.deactivateTab(a2, false, true);
          });
        }, t2.prototype.focusTab = function(t3) {
          var e2 = this.getTab(t3), i2 = this.options.arrowActivation;
          if (e2) {
            if (i2 && "true" !== v(e2, "aria-selected")) return void this.activateTabWithTimer(e2);
            e2.focus();
          }
        }, t2.prototype.focusFirstTab = function() {
          this.focusTab(0);
        }, t2.prototype.focusLastTab = function() {
          this.focusTab(this.tabs.length - 1);
        }, t2.prototype.determineDeletable = function(t3) {
          if (this.options.deletable) {
            var e2 = this.getTab(t3);
            if (e2 && "false" !== v(e2, "data-deletable")) {
              this.checkMultiple(), this.deleteTab(e2), this.generateArrays();
              var i2 = e2._ariaTablistTabIndex, a2 = i2 - 1 > -1 ? i2 - 1 : 0;
              this.multiple || "true" !== v(e2, "aria-selected") ? this.tabs[a2] && this.tabs[a2].focus() : this.activateTab(a2), this.makeFocusable(), this.triggerOptionCallback("onDelete", [e2]);
            }
          }
        }, t2.prototype.deleteTab = function(t3) {
          var e2 = this.getTabPanel(t3);
          t3.parentElement.removeChild(t3), e2 && e2.parentElement.removeChild(e2);
        }, t2.prototype.destroy = function() {
          var t3 = this, e2 = "aria-expanded aria-hidden hidden role tabindex";
          this.tabs.forEach(function(i2, a2) {
            i2.removeEventListener("keydown", t3.tabKeydownEvent), i2.removeEventListener("keyup", t3.tabKeyupEvent), i2.removeEventListener("click", t3.tabClickEvent), T(t3.panels[a2], e2), T(i2, e2), delete i2._ariaTablistTabIndex;
          }), this.tablist && (delete this.tablist.ariaTablist, T(this.tablist, "role")), this.panels.splice(0), this.tabs.splice(0), this.tablist = null;
        }, t2.prototype.init = function() {
          var t3 = this;
          this.checkMultiple(), this.generateArrays(true), this.tabKeydownEvent = this.tabKeydownEvent.bind(this), this.tabClickEvent = this.tabClickEvent.bind(this), this.tabKeyupEvent = this.tabKeyupEvent.bind(this);
          var e2 = [];
          this.tabs.forEach(function(i2, a2) {
            t3.addListenersToTab(a2), !("true" === v(i2, "aria-selected") || "true" === v(i2, "data-selected")) || !t3.multiple && e2.length || e2.push(i2);
          }), y(this.tablist, "role", "tablist"), this.tabs.length && (this.multiple || e2.length || e2.push(this.tabs[0]), this.deactivateTabs(e2), e2.forEach(function(e3) {
            return t3.activateTab(e3, false, true);
          }), this.makeFocusable()), this.triggerOptionCallback("onReady", [this.tablist]);
        }, t2;
      }();
      function x(t2, e2) {
        return new g(t2, e2).api;
      }
      e.default = x;
    }]);
  });
})(ariaTablist_min);
var ariaTablist_minExports = ariaTablist_min.exports;
const AriaTablist = /* @__PURE__ */ getDefaultExportFromCjs(ariaTablist_minExports);
const initAttr = "data-ulu-tablist-init";
const errorHeader = "[data-ulu-tablist] error:";
const instances$1 = [];
function init$7(options2 = {}) {
  const initial = () => {
    initWithin(document, options2);
    instances$1.forEach(openByCurrentHash);
  };
  if (document.readyState === "complete") {
    initial();
  } else {
    window.addEventListener("load", initial);
  }
  document.addEventListener("pageModified", (e) => initWithin(e.target, options2));
}
function initWithin(context, options2 = {}) {
  if (!context) {
    console.warn("Missing context to initWithin, skipping init of tabs");
    return;
  }
  const tablists = context.querySelectorAll(`[data-ulu-tablist]:not([${initAttr}])`);
  tablists.forEach((element) => setup$5(element, options2));
}
function setup$5(element, options2 = {}) {
  let elementOptions = {};
  if (element.dataset.uluTablist) {
    try {
      elementOptions = JSON.parse(element.dataset.uluTablist);
    } catch (e) {
      console.error(errorHeader, "(JSON Parse for options)", element);
    }
  }
  const config2 = Object.assign({}, options2, elementOptions);
  if (config2.vertical) {
    config2.allArrows = true;
  }
  const instance = { element, options: options2 };
  instance.ariaTablist = AriaTablist(element, {
    onOpen(...args) {
      args.unshift(instance);
      handleOpen.apply(null, args);
    },
    ...config2
  });
  instances$1.push(instance);
  if (config2.equalHeights) {
    setHeights(element);
  }
  element.setAttribute(initAttr, "");
  return instance;
}
function openByCurrentHash({ options: options2, ariaTablist }) {
  if (options2.openByUrlHash) {
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
function handleOpen({ options: options2 }, panel, tab) {
  if (options2.openByUrlHash && window.history) {
    window.history.replaceState(null, "", `#${tab.id}`);
  }
}
function setHeights(element) {
  const tabs2 = [...element.children];
  const panels = tabs2.map((n) => document.querySelector(`[aria-labelledby="${n.id}"]`));
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
const tabs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: init$7,
  initWithin,
  instances: instances$1,
  setup: setup$5
}, Symbol.toStringTag, { value: "Module" }));
const attrs$5 = {
  trigger: "data-ulu-proxy-click",
  init: "data-ulu-proxy-click-init"
};
const attrSelector$5 = (key2) => `[${attrs$5[key2]}]`;
const attrSelectorInitial$4 = (key2) => `${attrSelector$5(key2)}:not([${attrs$5.init}])`;
const defaults$3 = {
  selector: "[data-ulu-proxy-click-source]",
  selectorPreventBase: "input, select, textarea, button, a, [tabindex='-1']",
  selectorPrevent: "",
  mousedownDurationPrevent: 250
};
let currentDefaults = { ...defaults$3 };
function setDefaults(options2) {
  currentDefaults = Object.assign({}, currentDefaults, options2);
}
function init$6() {
  document.addEventListener(getName$1("pageModified"), () => setup$4());
  setup$4();
}
function setup$4(context = document) {
  const proxies = context.querySelectorAll(attrSelectorInitial$4("trigger"));
  proxies.forEach((proxy) => {
    const elOptions = getDatasetOptionalJson(proxy, "siteProxyClick");
    const options2 = Object.assign({}, currentDefaults, elOptions);
    const child = proxy.querySelector(options2.selector);
    if (child) {
      attachHandlers(proxy, child, options2);
      proxy.setAttribute(attrs$5.init, "");
    } else {
      console.error("Unable to locate proxy click source", options2.selector);
    }
  });
}
function attachHandlers(proxy, child, options2) {
  const { selectorPreventBase: spb, selectorPrevent: sp } = options2;
  const selectorPrevent = `${spb}${sp ? `, ${sp}` : ""}`;
  let start, shouldProxy;
  proxy.addEventListener("mousedown", ({ target, timeStamp }) => {
    shouldProxy = false;
    if (!target.matches(selectorPrevent)) {
      shouldProxy = true;
      start = timeStamp;
    }
  });
  proxy.addEventListener("mouseup", ({ timeStamp }) => {
    if (shouldProxy && timeStamp - start < options2.mousedownDurationPrevent) {
      child.click();
    }
  });
  proxy.style.cursor = "pointer";
}
const proxyClick = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attachHandlers,
  defaults: defaults$3,
  init: init$6,
  setDefaults,
  setup: setup$4
}, Symbol.toStringTag, { value: "Module" }));
const attrs$4 = {
  init: "data-ulu-scrollpoint-init",
  /**
   * Individual scrollpoint
   */
  point: "data-ulu-scrollpoint",
  group: "data-ulu-scrollpoint-group",
  groupAnchors: "data-ulu-scrollpoint-anchors"
  // Goes on container for all items
  // group: "data-ulu-scrollpoint-group"
};
const attrSelector$4 = (key2) => `[${attrs$4[key2]}]`;
const attrSelectorInitial$3 = (key2) => `${attrSelector$4(key2)}:not([${attrs$4.init}])`;
const queryAllInitial$1 = (key2) => document.querySelectorAll(attrSelectorInitial$3(key2));
function init$5() {
  document.addEventListener(getName$1("pageModified"), setup$3);
  setup$3();
}
function setup$3() {
  const elements = queryAllInitial$1("point");
  elements.forEach((element) => {
    const elOptions = getDatasetOptionalJson(element, "uluScrollpoint");
    const config2 = Object.assign({}, elOptions);
    element.setAttribute(attrs$4.init, "");
    new Scrollpoint(element, config2);
  });
}
const _Scrollpoint = class _Scrollpoint {
  /**
   * Setup a new scrollpoint
   * @param {Node} element The element to create the scrollpoint for
   * @param {Object} config Options to configure the scrollpoint see Scrollpoint.defaults for more information on settings
   */
  constructor(element, config2) {
    const options2 = Object.assign({}, _Scrollpoint.defaults, config2);
    if (!element) {
      logError$1(this, "Missing required element");
      return;
    }
    if (options2.rootSelector) {
      options2.root = document.querySelector(options2.rootSelector);
      delete options2.rootSelector;
    }
    this.options = options2;
    this.observer = null;
    this.lastPosition = null;
    this.isActive = false;
    this.element = element;
    this.syncedElements = [
      element,
      ...options2.syncElements.map((target) => getElement(target))
    ];
    this.classes = {
      enter: this.getClassname("enter"),
      enterForward: this.getClassname("enter--from-forward"),
      enterReverse: this.getClassname("enter--from-reverse"),
      exit: this.getClassname("exit"),
      exitForward: this.getClassname("exit--from-forward"),
      exitReverse: this.getClassname("exit--from-reverse")
    };
    this.setupObserver();
    if (options2.debug) {
      console.log("Scrollpoint", this);
    }
  }
  getClassname(suffix) {
    return this.options.classPrefix + "-" + suffix;
  }
  getObserverOptions() {
    const { root, marginStart, marginEnd, threshold, horizontal } = this.options;
    const rootMargin = horizontal ? `0px ${marginStart} 0px ${marginEnd}` : `${marginStart} 0px ${marginEnd} 0px`;
    return { root, rootMargin, threshold };
  }
  /**
   * IntersectionObserver Callback
   * - Should set the state
   */
  onObserve(entries) {
    const y = this.getScrollY();
    const { lastPosition, isActive, options: options2 } = this;
    const isForward = lastPosition === null ? null : lastPosition < y;
    entries.forEach((entry) => {
      const { isIntersecting } = entry;
      if (isIntersecting && !isActive) {
        this.setState(true, isForward);
      } else if (!isIntersecting && isActive && options2.exit) {
        if (isForward && options2.exitForward || !isForward && options2.exitReverse) {
          this.setState(false, isForward);
        }
      }
    });
    this.lastPosition = y;
  }
  setupObserver() {
    const handler = (entries) => {
      this.onObserve(entries);
    };
    const config2 = this.getObserverOptions();
    if (this.options.debug) {
      console.log("Scrollpoint (IntersectionObserver)", config2);
    }
    this.observer = new IntersectionObserver(handler, config2);
    this.observer.observe(this.element);
  }
  getScrollY() {
    const { root } = this.options;
    return root === null || root === document ? window.scrollY : root.scrollTop;
  }
  setState(isActive, isForward) {
    const { element } = this;
    const ctx = { isActive, isForward, element, instance: this };
    const { setClasses, setAttribute, onChange } = this.options;
    if (setClasses) {
      this.updateClasses(isActive, isForward);
    }
    if (setAttribute) {
      this.updateStateAttribute(isActive, isForward);
    }
    if (onChange) {
      onChange(ctx);
    }
    this.isActive = isActive;
  }
  getAllClasses() {
    return Object.values(this.classes);
  }
  updateClasses(isActive, isForward) {
    const { classes } = this;
    const all = this.getAllClasses();
    const classesEnter = [
      classes.enter,
      isForward ? classes.enterForward : classes.enterReverse
    ];
    const classesExit = [
      classes.exit,
      isForward ? classes.exitForward : classes.exitReverse
    ];
    this.syncedElements.forEach((element) => {
      element.classList.remove(...all);
      if (isActive) {
        element.classList.add(...classesEnter);
      } else {
        element.classList.add(...classesExit);
      }
    });
  }
  updateStateAttribute(isActive, isForward) {
    const activeTerm = isActive ? "enter" : "exit";
    const side = isForward ? "forward" : "reverse";
    this.syncedElements.forEach((element) => {
      element.setAttribute(this.options.attributeName, `${activeTerm}-${side}`);
    });
  }
  destroy() {
    this.observer.disconnect();
    this.observer = null;
    if (this.options.setClasses) {
      this.element.classList.remove(...this.getAllClasses());
    }
    if (this.options.setAttribute) {
      this.element.removeAttribute(this.options.attributeName);
    }
  }
};
__publicField(_Scrollpoint, "defaults", {
  /**
   * Default observer root element
   */
  root: null,
  /**
   * Use a selector to select the observer root element
   */
  rootSelector: null,
  /**
   * Log debug info to console
   */
  debug: false,
  /**
   * Change scroll orientation to horizontal
   */
  horizontal: false,
  /**
   * Margin for observer top or left (depending on orientation)
   */
  marginStart: "-25%",
  /**
   * Margin for observer bottom or right (depending on orientation)
   */
  marginEnd: "-55%",
  /**
   * Threshold for observer
   */
  threshold: [0, 1],
  /**
   * The point can exited (else persists)
   */
  exit: true,
  /**
   * The point can exit from the end
   */
  exitForward: true,
  /**
   * The point can exit from the start
   */
  exitReverse: true,
  /**
   * Set state classes
   */
  setClasses: false,
  /**
   * Prefix for classes
   */
  classPrefix: "scrollpoint",
  /**
   * Set attribute for state (less verbose same info as classes)
   */
  setAttribute: true,
  /**
   * Attribute name to set state info in
   */
  attributeName: "data-scrollpoint-state",
  /**
   * Group multiple points, one active at a time (scroll menus)
   */
  // groupName: null,
  /**
   * Elements that should also get active state info (classes or attributes)
   */
  syncElements: [],
  /**
   * Callback called when state changes
   */
  onChange(_ctx) {
  }
});
let Scrollpoint = _Scrollpoint;
const scrollpoint = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Scrollpoint,
  attrs: attrs$4,
  init: init$5,
  setup: setup$3
}, Symbol.toStringTag, { value: "Module" }));
function printOnly(content) {
  const w = window.open();
  w.document.write(content);
  w.print();
  w.close();
}
function printElement(element) {
  var content = element.innerHTML;
  printOnly(content);
}
const attrs$3 = {
  trigger: "data-ulu-print",
  init: "data-ulu-print-init"
};
const attrSelector$3 = (key2) => `[${attrs$3[key2]}]`;
const attrSelectorInitial$2 = (key2) => `${attrSelector$3(key2)}:not([${attrs$3.init}])`;
const queryAllInitial = (key2) => document.querySelectorAll(attrSelectorInitial$2(key2));
const defaults$2 = {
  /**
   * Print element/selector
   */
  element: null
};
function init$4() {
  document.addEventListener(getName$1("pageModified"), setup$2);
  setup$2();
}
function setup$2() {
  const triggers = queryAllInitial("trigger");
  triggers.forEach((trigger) => {
    const options2 = getDatasetOptionalJson(trigger, "uluPrint");
    setupTrigger(trigger, options2);
  });
}
function setupTrigger(trigger, options2) {
  const config2 = Object.assign({}, defaults$2, options2);
  trigger.addEventListener("click", (event) => {
    if (config2.element) {
      const element = getElement(config2.element);
      if (element) {
        printElement(element);
      } else {
        console.error("Unable to find element to print", trigger, config2);
      }
    } else {
      window.print();
    }
  });
}
const print = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attrs: attrs$3,
  init: init$4
}, Symbol.toStringTag, { value: "Module" }));
const attrs$2 = {
  opened: "data-ulu-print-details-opened"
};
const attrSelector$2 = (key2) => `[${attrs$2[key2]}]`;
const defaults$1 = {
  selector: "details:not([open])"
};
function init$3(options2) {
  const config2 = Object.assign({}, defaults$1, options2);
  document.addEventListener(getName$1("beforePrint"), () => {
    document.querySelectorAll(config2.selector).forEach((details) => {
      if (!details.open) {
        details.setAttribute(attrs$2.opened, true);
        details.open = true;
      }
    });
  });
  document.addEventListener(getName$1("afterPrint"), () => {
    document.querySelectorAll(attrSelector$2("opened")).forEach((details) => {
      details.removeAttribute(attrs$2.opened);
      details.open = false;
    });
  });
}
const printDetails = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attrs: attrs$2,
  init: init$3
}, Symbol.toStringTag, { value: "Module" }));
const attrs$1 = {
  init: "data-ulu-scroll-slider-init",
  slider: "data-ulu-scroll-slider",
  track: "data-ulu-scroll-slider-track",
  controls: "data-ulu-scroll-slider-control-context"
};
const attrSelector$1 = (key2) => `[${attrs$1[key2]}]`;
const attrSelectorInitial$1 = (key2) => `${attrSelector$1(key2)}:not([${attrs$1.init}])`;
const instances = [];
const defaults = {
  amount: createPager()
};
function init$2() {
  document.addEventListener(getName$1("pageModified"), setup$1);
  setup$1();
}
function setup$1() {
  const builders = document.querySelectorAll(attrSelectorInitial$1("slider"));
  builders.forEach(setupSlider);
}
function setupSlider(container2) {
  container2.setAttribute(attrs$1.init, "");
  const options2 = getDatasetOptionalJson(container2, "uluScrollSlider");
  const config2 = Object.assign({}, defaults, options2);
  const elements = {
    track: container2.querySelector(attrSelector$1("track")),
    controls: container2.querySelector(attrSelector$1("controls"))
  };
  instances.push(new OverflowScroller(elements, config2));
}
const scrollSlider = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attrs: attrs$1,
  init: init$2,
  setup: setup$1
}, Symbol.toStringTag, { value: "Module" }));
const attrs = {
  trigger: "data-site-theme-toggle",
  icon: "data-site-theme-toggle-icon",
  init: "data-site-theme-toggle-init"
};
const attrSelector = (key2) => `[${attrs[key2]}]`;
const attrSelectorInitial = (key2) => `${attrSelector(key2)}:not([${attrs.init}])`;
const options = {
  darkTheme: "theme-dark",
  lightTheme: "theme-light",
  defaultTheme: "dark",
  darkIcon: "fa-solid fa-moon",
  lightIcon: "fa-solid fa-sun"
};
const body = document.querySelector("[data-site-theme]");
let currentTheme = body.classList.contains(options.darkTheme) ? options.darkTheme : options.lightTheme;
const defaultThemeInverse = options.defaultTheme === "dark" ? "light" : "dark";
function init$1() {
  document.addEventListener(getName$1("beforePrint"), () => printSetup());
  document.addEventListener(getName$1("afterPrint"), () => printTearDown());
  setup();
}
function setup(context = document) {
  const body2 = context.querySelector("[data-site-theme]");
  setupTheme(body2);
  const elements = context.querySelectorAll(attrSelectorInitial("trigger"));
  elements.forEach((element) => {
    element.setAttribute(attrs.init, "");
    element.addEventListener("click", () => {
      changeTheme(body2);
    });
  });
  changeIcons();
}
function setupTheme(body2) {
  const sitePreference = localStorage.getItem("data-theme");
  const machinePreference = window.matchMedia && window.matchMedia(`(prefers-color-scheme: ${defaultThemeInverse})`).matches;
  if (sitePreference && sitePreference != currentTheme) {
    changeTheme(body2);
  } else if (machinePreference) {
    changeTheme(body2);
  }
}
function changeTheme(body2) {
  let newTheme;
  let oldTheme;
  if (body2.classList.contains(options.darkTheme)) {
    oldTheme = options.darkTheme;
    newTheme = options.lightTheme;
  } else if (body2.classList.contains(options.lightTheme)) {
    oldTheme = options.lightTheme;
    newTheme = options.darkTheme;
  }
  body2.classList.remove(oldTheme);
  body2.classList.add(newTheme);
  localStorage.setItem("data-theme", newTheme);
  currentTheme = newTheme;
  changeIcons();
}
function changeIcons(context = document) {
  const icons = context.querySelectorAll(attrSelectorInitial("icon"));
  icons.forEach((icon) => {
    if (currentTheme == options.lightTheme) {
      icon.classList = options.darkIcon;
    } else {
      icon.classList = options.lightIcon;
    }
  });
}
function printSetup() {
  const body2 = document.querySelector("body");
  if (body2.classList.contains(options.darkTheme)) {
    body2.classList.remove(options.darkTheme);
    body2.classList.add(options.lightTheme);
  }
}
function printTearDown() {
  const body2 = document.querySelector("body");
  if (!body2.classList.contains(currentTheme)) {
    body2.classList.remove(options.lightTheme);
    body2.classList.add(options.darkTheme);
  }
}
const themeToggle = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: init$1,
  options,
  setup
}, Symbol.toStringTag, { value: "Module" }));
const index$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  breakpoints,
  collapsible,
  dialog,
  flipcard,
  grid,
  get index() {
    return index$1;
  },
  modalBuilder,
  overflowScroller,
  overflowScrollerPager,
  page,
  popover,
  print,
  printDetails,
  proxyClick,
  resizer,
  scrollSlider,
  scrollpoint,
  slider,
  tabs,
  themeToggle,
  tooltip
}, Symbol.toStringTag, { value: "Module" }));
const _FileSave = class _FileSave {
  /**
   * @param {*} data Data to put in blob file
   * @param {FileSaveOptions} options Options for file, see defaults (ie. type, filename)
   */
  constructor(data, options2) {
    this.options = Object.assign({}, _FileSave.defaults, options2);
    this.data = data;
    this.blob = new Blob([data], { type: this.options.type });
    this.url = URL.createObjectURL(this.blob);
  }
  /**
   * Remove the blob url 
   */
  destroy() {
    return URL.revokeObjectURL(this.url);
  }
  /**
   * Get the blob url
   */
  getUrl() {
    return this.url;
  }
  /**
   * Create link element with blob as href
   * @param {String} text The text to put in the link
   */
  createLink(text) {
    const link = document.createElement("a");
    const textNode = document.createTextNode(text);
    link.setAttribute("download", this.options.filename);
    link.setAttribute("href", this.url);
    link.appendChild(textNode);
    return link;
  }
  /**
   * Check for Compatibility (optional, implement on user side)
   */
  static isBrowserSupported() {
    return "FileReader" in window;
  }
};
__publicField(_FileSave, "defaults", {
  filename: "filesave-file.txt",
  type: "text/plain;charset=utf-8"
});
let FileSave = _FileSave;
const fileSave = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FileSave
}, Symbol.toStringTag, { value: "Module" }));
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  classLogger,
  dom,
  fileSave,
  floatingUi,
  id,
  get index() {
    return index;
  },
  pauseYoutubeVideo
}, Symbol.toStringTag, { value: "Module" }));
const ulu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  events: index$2,
  ui: index$1,
  utils: index
}, Symbol.toStringTag, { value: "Module" }));
var algoliasearchLite_umd = { exports: {} };
/*! algoliasearch-lite.umd.js | 4.23.3 | © Algolia, inc. | https://github.com/algolia/algoliasearch-client-javascript */
(function(module, exports) {
  !function(e, t) {
    module.exports = t();
  }(commonjsGlobal, function() {
    function e(e2, t2, r2) {
      return t2 in e2 ? Object.defineProperty(e2, t2, { value: r2, enumerable: true, configurable: true, writable: true }) : e2[t2] = r2, e2;
    }
    function t(e2, t2) {
      var r2 = Object.keys(e2);
      if (Object.getOwnPropertySymbols) {
        var n2 = Object.getOwnPropertySymbols(e2);
        t2 && (n2 = n2.filter(function(t3) {
          return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
        })), r2.push.apply(r2, n2);
      }
      return r2;
    }
    function r(r2) {
      for (var n2 = 1; n2 < arguments.length; n2++) {
        var o2 = null != arguments[n2] ? arguments[n2] : {};
        n2 % 2 ? t(Object(o2), true).forEach(function(t2) {
          e(r2, t2, o2[t2]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r2, Object.getOwnPropertyDescriptors(o2)) : t(Object(o2)).forEach(function(e2) {
          Object.defineProperty(r2, e2, Object.getOwnPropertyDescriptor(o2, e2));
        });
      }
      return r2;
    }
    function n(e2, t2) {
      if (null == e2) return {};
      var r2, n2, o2 = function(e3, t3) {
        if (null == e3) return {};
        var r3, n3, o3 = {}, a3 = Object.keys(e3);
        for (n3 = 0; n3 < a3.length; n3++) r3 = a3[n3], t3.indexOf(r3) >= 0 || (o3[r3] = e3[r3]);
        return o3;
      }(e2, t2);
      if (Object.getOwnPropertySymbols) {
        var a2 = Object.getOwnPropertySymbols(e2);
        for (n2 = 0; n2 < a2.length; n2++) r2 = a2[n2], t2.indexOf(r2) >= 0 || Object.prototype.propertyIsEnumerable.call(e2, r2) && (o2[r2] = e2[r2]);
      }
      return o2;
    }
    function o(e2, t2) {
      return function(e3) {
        if (Array.isArray(e3)) return e3;
      }(e2) || function(e3, t3) {
        if (!(Symbol.iterator in Object(e3) || "[object Arguments]" === Object.prototype.toString.call(e3))) return;
        var r2 = [], n2 = true, o2 = false, a2 = void 0;
        try {
          for (var u2, i2 = e3[Symbol.iterator](); !(n2 = (u2 = i2.next()).done) && (r2.push(u2.value), !t3 || r2.length !== t3); n2 = true) ;
        } catch (e4) {
          o2 = true, a2 = e4;
        } finally {
          try {
            n2 || null == i2.return || i2.return();
          } finally {
            if (o2) throw a2;
          }
        }
        return r2;
      }(e2, t2) || function() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }();
    }
    function a(e2) {
      return function(e3) {
        if (Array.isArray(e3)) {
          for (var t2 = 0, r2 = new Array(e3.length); t2 < e3.length; t2++) r2[t2] = e3[t2];
          return r2;
        }
      }(e2) || function(e3) {
        if (Symbol.iterator in Object(e3) || "[object Arguments]" === Object.prototype.toString.call(e3)) return Array.from(e3);
      }(e2) || function() {
        throw new TypeError("Invalid attempt to spread non-iterable instance");
      }();
    }
    function u(e2) {
      var t2, r2 = "algoliasearch-client-js-".concat(e2.key), n2 = function() {
        return void 0 === t2 && (t2 = e2.localStorage || window.localStorage), t2;
      }, a2 = function() {
        return JSON.parse(n2().getItem(r2) || "{}");
      }, u2 = function(e3) {
        n2().setItem(r2, JSON.stringify(e3));
      }, i2 = function() {
        var t3 = e2.timeToLive ? 1e3 * e2.timeToLive : null, r3 = a2(), n3 = Object.fromEntries(Object.entries(r3).filter(function(e3) {
          return void 0 !== o(e3, 2)[1].timestamp;
        }));
        if (u2(n3), t3) {
          var i3 = Object.fromEntries(Object.entries(n3).filter(function(e3) {
            var r4 = o(e3, 2)[1], n4 = (/* @__PURE__ */ new Date()).getTime();
            return !(r4.timestamp + t3 < n4);
          }));
          u2(i3);
        }
      };
      return { get: function(e3, t3) {
        var r3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function() {
          return Promise.resolve();
        } };
        return Promise.resolve().then(function() {
          i2();
          var t4 = JSON.stringify(e3);
          return a2()[t4];
        }).then(function(e4) {
          return Promise.all([e4 ? e4.value : t3(), void 0 !== e4]);
        }).then(function(e4) {
          var t4 = o(e4, 2), n3 = t4[0], a3 = t4[1];
          return Promise.all([n3, a3 || r3.miss(n3)]);
        }).then(function(e4) {
          return o(e4, 1)[0];
        });
      }, set: function(e3, t3) {
        return Promise.resolve().then(function() {
          var o2 = a2();
          return o2[JSON.stringify(e3)] = { timestamp: (/* @__PURE__ */ new Date()).getTime(), value: t3 }, n2().setItem(r2, JSON.stringify(o2)), t3;
        });
      }, delete: function(e3) {
        return Promise.resolve().then(function() {
          var t3 = a2();
          delete t3[JSON.stringify(e3)], n2().setItem(r2, JSON.stringify(t3));
        });
      }, clear: function() {
        return Promise.resolve().then(function() {
          n2().removeItem(r2);
        });
      } };
    }
    function i(e2) {
      var t2 = a(e2.caches), r2 = t2.shift();
      return void 0 === r2 ? { get: function(e3, t3) {
        var r3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function() {
          return Promise.resolve();
        } }, n2 = t3();
        return n2.then(function(e4) {
          return Promise.all([e4, r3.miss(e4)]);
        }).then(function(e4) {
          return o(e4, 1)[0];
        });
      }, set: function(e3, t3) {
        return Promise.resolve(t3);
      }, delete: function(e3) {
        return Promise.resolve();
      }, clear: function() {
        return Promise.resolve();
      } } : { get: function(e3, n2) {
        var o2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function() {
          return Promise.resolve();
        } };
        return r2.get(e3, n2, o2).catch(function() {
          return i({ caches: t2 }).get(e3, n2, o2);
        });
      }, set: function(e3, n2) {
        return r2.set(e3, n2).catch(function() {
          return i({ caches: t2 }).set(e3, n2);
        });
      }, delete: function(e3) {
        return r2.delete(e3).catch(function() {
          return i({ caches: t2 }).delete(e3);
        });
      }, clear: function() {
        return r2.clear().catch(function() {
          return i({ caches: t2 }).clear();
        });
      } };
    }
    function s() {
      var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : { serializable: true }, t2 = {};
      return { get: function(r2, n2) {
        var o2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function() {
          return Promise.resolve();
        } }, a2 = JSON.stringify(r2);
        if (a2 in t2) return Promise.resolve(e2.serializable ? JSON.parse(t2[a2]) : t2[a2]);
        var u2 = n2(), i2 = o2 && o2.miss || function() {
          return Promise.resolve();
        };
        return u2.then(function(e3) {
          return i2(e3);
        }).then(function() {
          return u2;
        });
      }, set: function(r2, n2) {
        return t2[JSON.stringify(r2)] = e2.serializable ? JSON.stringify(n2) : n2, Promise.resolve(n2);
      }, delete: function(e3) {
        return delete t2[JSON.stringify(e3)], Promise.resolve();
      }, clear: function() {
        return t2 = {}, Promise.resolve();
      } };
    }
    function c(e2) {
      for (var t2 = e2.length - 1; t2 > 0; t2--) {
        var r2 = Math.floor(Math.random() * (t2 + 1)), n2 = e2[t2];
        e2[t2] = e2[r2], e2[r2] = n2;
      }
      return e2;
    }
    function l(e2, t2) {
      return t2 ? (Object.keys(t2).forEach(function(r2) {
        e2[r2] = t2[r2](e2);
      }), e2) : e2;
    }
    function f(e2) {
      for (var t2 = arguments.length, r2 = new Array(t2 > 1 ? t2 - 1 : 0), n2 = 1; n2 < t2; n2++) r2[n2 - 1] = arguments[n2];
      var o2 = 0;
      return e2.replace(/%s/g, function() {
        return encodeURIComponent(r2[o2++]);
      });
    }
    var h = { WithinQueryParameters: 0, WithinHeaders: 1 };
    function m(e2, t2) {
      var r2 = e2 || {}, n2 = r2.data || {};
      return Object.keys(r2).forEach(function(e3) {
        -1 === ["timeout", "headers", "queryParameters", "data", "cacheable"].indexOf(e3) && (n2[e3] = r2[e3]);
      }), { data: Object.entries(n2).length > 0 ? n2 : void 0, timeout: r2.timeout || t2, headers: r2.headers || {}, queryParameters: r2.queryParameters || {}, cacheable: r2.cacheable };
    }
    var d = { Read: 1, Write: 2, Any: 3 }, p = 1, v = 2, g = 3;
    function y(e2) {
      var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : p;
      return r(r({}, e2), {}, { status: t2, lastUpdate: Date.now() });
    }
    function b(e2) {
      return "string" == typeof e2 ? { protocol: "https", url: e2, accept: d.Any } : { protocol: e2.protocol || "https", url: e2.url, accept: e2.accept || d.Any };
    }
    var O = "GET", P = "POST";
    function q(e2, t2) {
      return Promise.all(t2.map(function(t3) {
        return e2.get(t3, function() {
          return Promise.resolve(y(t3));
        });
      })).then(function(e3) {
        var r2 = e3.filter(function(e4) {
          return function(e5) {
            return e5.status === p || Date.now() - e5.lastUpdate > 12e4;
          }(e4);
        }), n2 = e3.filter(function(e4) {
          return function(e5) {
            return e5.status === g && Date.now() - e5.lastUpdate <= 12e4;
          }(e4);
        }), o2 = [].concat(a(r2), a(n2));
        return { getTimeout: function(e4, t3) {
          return (0 === n2.length && 0 === e4 ? 1 : n2.length + 3 + e4) * t3;
        }, statelessHosts: o2.length > 0 ? o2.map(function(e4) {
          return b(e4);
        }) : t2 };
      });
    }
    function j(e2, t2, n2, o2) {
      var u2 = [], i2 = function(e3, t3) {
        if (e3.method === O || void 0 === e3.data && void 0 === t3.data) return;
        var n3 = Array.isArray(e3.data) ? e3.data : r(r({}, e3.data), t3.data);
        return JSON.stringify(n3);
      }(n2, o2), s2 = function(e3, t3) {
        var n3 = r(r({}, e3.headers), t3.headers), o3 = {};
        return Object.keys(n3).forEach(function(e4) {
          var t4 = n3[e4];
          o3[e4.toLowerCase()] = t4;
        }), o3;
      }(e2, o2), c2 = n2.method, l2 = n2.method !== O ? {} : r(r({}, n2.data), o2.data), f2 = r(r(r({ "x-algolia-agent": e2.userAgent.value }, e2.queryParameters), l2), o2.queryParameters), h2 = 0, m2 = function t3(r2, a2) {
        var l3 = r2.pop();
        if (void 0 === l3) throw { name: "RetryError", message: "Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.", transporterStackTrace: A(u2) };
        var m3 = { data: i2, headers: s2, method: c2, url: S(l3, n2.path, f2), connectTimeout: a2(h2, e2.timeouts.connect), responseTimeout: a2(h2, o2.timeout) }, d2 = function(e3) {
          var t4 = { request: m3, response: e3, host: l3, triesLeft: r2.length };
          return u2.push(t4), t4;
        }, p2 = { onSuccess: function(e3) {
          return function(e4) {
            try {
              return JSON.parse(e4.content);
            } catch (t4) {
              throw /* @__PURE__ */ function(e5, t5) {
                return { name: "DeserializationError", message: e5, response: t5 };
              }(t4.message, e4);
            }
          }(e3);
        }, onRetry: function(n3) {
          var o3 = d2(n3);
          return n3.isTimedOut && h2++, Promise.all([e2.logger.info("Retryable failure", x(o3)), e2.hostsCache.set(l3, y(l3, n3.isTimedOut ? g : v))]).then(function() {
            return t3(r2, a2);
          });
        }, onFail: function(e3) {
          throw d2(e3), function(e4, t4) {
            var r3 = e4.content, n3 = e4.status, o3 = r3;
            try {
              o3 = JSON.parse(r3).message;
            } catch (e5) {
            }
            return /* @__PURE__ */ function(e5, t5, r4) {
              return { name: "ApiError", message: e5, status: t5, transporterStackTrace: r4 };
            }(o3, n3, t4);
          }(e3, A(u2));
        } };
        return e2.requester.send(m3).then(function(e3) {
          return function(e4, t4) {
            return function(e5) {
              var t5 = e5.status;
              return e5.isTimedOut || function(e6) {
                var t6 = e6.isTimedOut, r3 = e6.status;
                return !t6 && 0 == ~~r3;
              }(e5) || 2 != ~~(t5 / 100) && 4 != ~~(t5 / 100);
            }(e4) ? t4.onRetry(e4) : 2 == ~~(e4.status / 100) ? t4.onSuccess(e4) : t4.onFail(e4);
          }(e3, p2);
        });
      };
      return q(e2.hostsCache, t2).then(function(e3) {
        return m2(a(e3.statelessHosts).reverse(), e3.getTimeout);
      });
    }
    function w(e2) {
      var t2 = { value: "Algolia for JavaScript (".concat(e2, ")"), add: function(e3) {
        var r2 = "; ".concat(e3.segment).concat(void 0 !== e3.version ? " (".concat(e3.version, ")") : "");
        return -1 === t2.value.indexOf(r2) && (t2.value = "".concat(t2.value).concat(r2)), t2;
      } };
      return t2;
    }
    function S(e2, t2, r2) {
      var n2 = T(r2), o2 = "".concat(e2.protocol, "://").concat(e2.url, "/").concat("/" === t2.charAt(0) ? t2.substr(1) : t2);
      return n2.length && (o2 += "?".concat(n2)), o2;
    }
    function T(e2) {
      return Object.keys(e2).map(function(t2) {
        return f("%s=%s", t2, (r2 = e2[t2], "[object Object]" === Object.prototype.toString.call(r2) || "[object Array]" === Object.prototype.toString.call(r2) ? JSON.stringify(e2[t2]) : e2[t2]));
        var r2;
      }).join("&");
    }
    function A(e2) {
      return e2.map(function(e3) {
        return x(e3);
      });
    }
    function x(e2) {
      var t2 = e2.request.headers["x-algolia-api-key"] ? { "x-algolia-api-key": "*****" } : {};
      return r(r({}, e2), {}, { request: r(r({}, e2.request), {}, { headers: r(r({}, e2.request.headers), t2) }) });
    }
    var N = function(e2) {
      var t2 = e2.appId, n2 = /* @__PURE__ */ function(e3, t3, r2) {
        var n3 = { "x-algolia-api-key": r2, "x-algolia-application-id": t3 };
        return { headers: function() {
          return e3 === h.WithinHeaders ? n3 : {};
        }, queryParameters: function() {
          return e3 === h.WithinQueryParameters ? n3 : {};
        } };
      }(void 0 !== e2.authMode ? e2.authMode : h.WithinHeaders, t2, e2.apiKey), a2 = function(e3) {
        var t3 = e3.hostsCache, r2 = e3.logger, n3 = e3.requester, a3 = e3.requestsCache, u2 = e3.responsesCache, i2 = e3.timeouts, s2 = e3.userAgent, c2 = e3.hosts, l2 = e3.queryParameters, f2 = { hostsCache: t3, logger: r2, requester: n3, requestsCache: a3, responsesCache: u2, timeouts: i2, userAgent: s2, headers: e3.headers, queryParameters: l2, hosts: c2.map(function(e4) {
          return b(e4);
        }), read: function(e4, t4) {
          var r3 = m(t4, f2.timeouts.read), n4 = function() {
            return j(f2, f2.hosts.filter(function(e5) {
              return 0 != (e5.accept & d.Read);
            }), e4, r3);
          };
          if (true !== (void 0 !== r3.cacheable ? r3.cacheable : e4.cacheable)) return n4();
          var a4 = { request: e4, mappedRequestOptions: r3, transporter: { queryParameters: f2.queryParameters, headers: f2.headers } };
          return f2.responsesCache.get(a4, function() {
            return f2.requestsCache.get(a4, function() {
              return f2.requestsCache.set(a4, n4()).then(function(e5) {
                return Promise.all([f2.requestsCache.delete(a4), e5]);
              }, function(e5) {
                return Promise.all([f2.requestsCache.delete(a4), Promise.reject(e5)]);
              }).then(function(e5) {
                var t5 = o(e5, 2);
                t5[0];
                return t5[1];
              });
            });
          }, { miss: function(e5) {
            return f2.responsesCache.set(a4, e5);
          } });
        }, write: function(e4, t4) {
          return j(f2, f2.hosts.filter(function(e5) {
            return 0 != (e5.accept & d.Write);
          }), e4, m(t4, f2.timeouts.write));
        } };
        return f2;
      }(r(r({ hosts: [{ url: "".concat(t2, "-dsn.algolia.net"), accept: d.Read }, { url: "".concat(t2, ".algolia.net"), accept: d.Write }].concat(c([{ url: "".concat(t2, "-1.algolianet.com") }, { url: "".concat(t2, "-2.algolianet.com") }, { url: "".concat(t2, "-3.algolianet.com") }])) }, e2), {}, { headers: r(r(r({}, n2.headers()), { "content-type": "application/x-www-form-urlencoded" }), e2.headers), queryParameters: r(r({}, n2.queryParameters()), e2.queryParameters) }));
      return l({ transporter: a2, appId: t2, addAlgoliaAgent: function(e3, t3) {
        a2.userAgent.add({ segment: e3, version: t3 });
      }, clearCache: function() {
        return Promise.all([a2.requestsCache.clear(), a2.responsesCache.clear()]).then(function() {
        });
      } }, e2.methods);
    }, C = function(e2) {
      return function(t2, r2) {
        return t2.method === O ? e2.transporter.read(t2, r2) : e2.transporter.write(t2, r2);
      };
    }, E = function(e2) {
      return function(t2) {
        var r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n2 = { transporter: e2.transporter, appId: e2.appId, indexName: t2 };
        return l(n2, r2.methods);
      };
    }, J = function(e2) {
      return function(t2, n2) {
        var o2 = t2.map(function(e3) {
          return r(r({}, e3), {}, { params: T(e3.params || {}) });
        });
        return e2.transporter.read({ method: P, path: "1/indexes/*/queries", data: { requests: o2 }, cacheable: true }, n2);
      };
    }, k = function(e2) {
      return function(t2, o2) {
        return Promise.all(t2.map(function(t3) {
          var a2 = t3.params, u2 = a2.facetName, i2 = a2.facetQuery, s2 = n(a2, ["facetName", "facetQuery"]);
          return E(e2)(t3.indexName, { methods: { searchForFacetValues: F } }).searchForFacetValues(u2, i2, r(r({}, o2), s2));
        }));
      };
    }, I = function(e2) {
      return function(t2, r2, n2) {
        return e2.transporter.read({ method: P, path: f("1/answers/%s/prediction", e2.indexName), data: { query: t2, queryLanguages: r2 }, cacheable: true }, n2);
      };
    }, R = function(e2) {
      return function(t2, r2) {
        return e2.transporter.read({ method: P, path: f("1/indexes/%s/query", e2.indexName), data: { query: t2 }, cacheable: true }, r2);
      };
    }, F = function(e2) {
      return function(t2, r2, n2) {
        return e2.transporter.read({ method: P, path: f("1/indexes/%s/facets/%s/query", e2.indexName, t2), data: { facetQuery: r2 }, cacheable: true }, n2);
      };
    }, D = 1, W = 2, H = 3;
    var Q = function(e2) {
      return function(t2, n2) {
        var o2 = t2.map(function(e3) {
          return r(r({}, e3), {}, { threshold: e3.threshold || 0 });
        });
        return e2.transporter.read({ method: P, path: "1/indexes/*/recommendations", data: { requests: o2 }, cacheable: true }, n2);
      };
    };
    function L(e2, t2, n2) {
      var o2, a2 = { appId: e2, apiKey: t2, timeouts: { connect: 1, read: 2, write: 30 }, requester: { send: function(e3) {
        return new Promise(function(t3) {
          var r2 = new XMLHttpRequest();
          r2.open(e3.method, e3.url, true), Object.keys(e3.headers).forEach(function(t4) {
            return r2.setRequestHeader(t4, e3.headers[t4]);
          });
          var n3, o3 = function(e4, n4) {
            return setTimeout(function() {
              r2.abort(), t3({ status: 0, content: n4, isTimedOut: true });
            }, 1e3 * e4);
          }, a3 = o3(e3.connectTimeout, "Connection timeout");
          r2.onreadystatechange = function() {
            r2.readyState > r2.OPENED && void 0 === n3 && (clearTimeout(a3), n3 = o3(e3.responseTimeout, "Socket timeout"));
          }, r2.onerror = function() {
            0 === r2.status && (clearTimeout(a3), clearTimeout(n3), t3({ content: r2.responseText || "Network request failed", status: r2.status, isTimedOut: false }));
          }, r2.onload = function() {
            clearTimeout(a3), clearTimeout(n3), t3({ content: r2.responseText, status: r2.status, isTimedOut: false });
          }, r2.send(e3.data);
        });
      } }, logger: (o2 = H, { debug: function(e3, t3) {
        return D >= o2 && console.debug(e3, t3), Promise.resolve();
      }, info: function(e3, t3) {
        return W >= o2 && console.info(e3, t3), Promise.resolve();
      }, error: function(e3, t3) {
        return console.error(e3, t3), Promise.resolve();
      } }), responsesCache: s(), requestsCache: s({ serializable: false }), hostsCache: i({ caches: [u({ key: "".concat("4.23.3", "-").concat(e2) }), s()] }), userAgent: w("4.23.3").add({ segment: "Browser", version: "lite" }), authMode: h.WithinQueryParameters };
      return N(r(r(r({}, a2), n2), {}, { methods: { search: J, searchForFacetValues: k, multipleQueries: J, multipleSearchForFacetValues: k, customRequest: C, initIndex: function(e3) {
        return function(t3) {
          return E(e3)(t3, { methods: { search: R, searchForFacetValues: F, findAnswers: I } });
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
  !function(e, t) {
    module.exports = t();
  }(commonjsGlobal, function() {
    function o(t2, e2) {
      var n2, r2 = Object.keys(t2);
      return Object.getOwnPropertySymbols && (n2 = Object.getOwnPropertySymbols(t2), e2 && (n2 = n2.filter(function(e3) {
        return Object.getOwnPropertyDescriptor(t2, e3).enumerable;
      })), r2.push.apply(r2, n2)), r2;
    }
    function T(t2) {
      for (var e2 = 1; e2 < arguments.length; e2++) {
        var n2 = null != arguments[e2] ? arguments[e2] : {};
        e2 % 2 ? o(Object(n2), true).forEach(function(e3) {
          E(t2, e3, n2[e3]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t2, Object.getOwnPropertyDescriptors(n2)) : o(Object(n2)).forEach(function(e3) {
          Object.defineProperty(t2, e3, Object.getOwnPropertyDescriptor(n2, e3));
        });
      }
      return t2;
    }
    function A(e2) {
      return (A = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
        return typeof e3;
      } : function(e3) {
        return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
      })(e2);
    }
    function W(e2, t2) {
      if (!(e2 instanceof t2)) throw new TypeError("Cannot call a class as a function");
    }
    function c(e2, t2) {
      for (var n2 = 0; n2 < t2.length; n2++) {
        var r2 = t2[n2];
        r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(e2, z(r2.key), r2);
      }
    }
    function D(e2, t2, n2) {
      return t2 && c(e2.prototype, t2), Object.defineProperty(e2, "prototype", { writable: false }), e2;
    }
    function E(e2, t2, n2) {
      return (t2 = z(t2)) in e2 ? Object.defineProperty(e2, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e2[t2] = n2, e2;
    }
    function m() {
      return (m = Object.assign ? Object.assign.bind() : function(e2) {
        for (var t2 = 1; t2 < arguments.length; t2++) {
          var n2, r2 = arguments[t2];
          for (n2 in r2) Object.prototype.hasOwnProperty.call(r2, n2) && (e2[n2] = r2[n2]);
        }
        return e2;
      }).apply(this, arguments);
    }
    function U(e2, t2) {
      if ("function" != typeof t2 && null !== t2) throw new TypeError("Super expression must either be null or a function");
      e2.prototype = Object.create(t2 && t2.prototype, { constructor: { value: e2, writable: true, configurable: true } }), Object.defineProperty(e2, "prototype", { writable: false }), t2 && B(e2, t2);
    }
    function $(e2) {
      return ($ = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e3) {
        return e3.__proto__ || Object.getPrototypeOf(e3);
      })(e2);
    }
    function B(e2, t2) {
      return (B = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e3, t3) {
        return e3.__proto__ = t3, e3;
      })(e2, t2);
    }
    function Q(e2) {
      if (null == e2) throw new TypeError("Cannot destructure " + e2);
    }
    function k(e2, t2) {
      if (null == e2) return {};
      var n2, r2 = function(e3, t3) {
        if (null == e3) return {};
        for (var n3, r3 = {}, i3 = Object.keys(e3), a3 = 0; a3 < i3.length; a3++) n3 = i3[a3], 0 <= t3.indexOf(n3) || (r3[n3] = e3[n3]);
        return r3;
      }(e2, t2);
      if (Object.getOwnPropertySymbols) for (var i2 = Object.getOwnPropertySymbols(e2), a2 = 0; a2 < i2.length; a2++) n2 = i2[a2], 0 <= t2.indexOf(n2) || Object.prototype.propertyIsEnumerable.call(e2, n2) && (r2[n2] = e2[n2]);
      return r2;
    }
    function y(e2) {
      if (void 0 === e2) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e2;
    }
    function q(n2) {
      var r2 = function() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if ("function" == typeof Proxy) return true;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          })), true;
        } catch (e2) {
          return false;
        }
      }();
      return function() {
        var e2, t2 = $(n2), t2 = (e2 = r2 ? (e2 = $(this).constructor, Reflect.construct(t2, arguments, e2)) : t2.apply(this, arguments), this);
        if (e2 && ("object" == typeof e2 || "function" == typeof e2)) return e2;
        if (void 0 !== e2) throw new TypeError("Derived constructors may only return object or undefined");
        return y(t2);
      };
    }
    function j(e2, t2) {
      return function(e3) {
        if (Array.isArray(e3)) return e3;
      }(e2) || function(e3, t3) {
        var n2 = null == e3 ? null : "undefined" != typeof Symbol && e3[Symbol.iterator] || e3["@@iterator"];
        if (null != n2) {
          var r2, i2, a2, s2, o2 = [], c2 = true, u2 = false;
          try {
            if (a2 = (n2 = n2.call(e3)).next, 0 === t3) {
              if (Object(n2) !== n2) return;
              c2 = false;
            } else for (; !(c2 = (r2 = a2.call(n2)).done) && (o2.push(r2.value), o2.length !== t3); c2 = true) ;
          } catch (e4) {
            u2 = true, i2 = e4;
          } finally {
            try {
              if (!c2 && null != n2.return && (s2 = n2.return(), Object(s2) !== s2)) return;
            } finally {
              if (u2) throw i2;
            }
          }
          return o2;
        }
      }(e2, t2) || V(e2, t2) || function() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }();
    }
    function w(e2) {
      return function(e3) {
        if (Array.isArray(e3)) return K(e3);
      }(e2) || function(e3) {
        if ("undefined" != typeof Symbol && null != e3[Symbol.iterator] || null != e3["@@iterator"]) return Array.from(e3);
      }(e2) || V(e2) || function() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }();
    }
    function V(e2, t2) {
      var n2;
      if (e2) return "string" == typeof e2 ? K(e2, t2) : "Map" === (n2 = "Object" === (n2 = Object.prototype.toString.call(e2).slice(8, -1)) && e2.constructor ? e2.constructor.name : n2) || "Set" === n2 ? Array.from(e2) : "Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2) ? K(e2, t2) : void 0;
    }
    function K(e2, t2) {
      (null == t2 || t2 > e2.length) && (t2 = e2.length);
      for (var n2 = 0, r2 = new Array(t2); n2 < t2; n2++) r2[n2] = e2[n2];
      return r2;
    }
    function z(e2) {
      e2 = function(e3, t2) {
        if ("object" != typeof e3 || null === e3) return e3;
        var n2 = e3[Symbol.toPrimitive];
        if (void 0 === n2) return ("string" === t2 ? String : Number)(e3);
        if ("object" != typeof (n2 = n2.call(e3, t2 || "default"))) return n2;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }(e2, "string");
      return "symbol" == typeof e2 ? e2 : String(e2);
    }
    function R() {
    }
    function J(e2, t2) {
      return e2;
    }
    function h(e2, t2) {
      if (void 0 === e2 || "function" != typeof e2) throw new Error("The render function is not valid (received type ".concat(Object.prototype.toString.call(e2).slice(8, -1), ").\n\n").concat(t2));
    }
    function Z(e2) {
      var t2 = e2.helper, e2 = e2.attributesToClear, e2 = void 0 === e2 ? [] : e2, n2 = t2.state.setPage(0), n2 = e2.reduce(function(e3, t3) {
        return n2.isNumericRefined(t3) ? e3.removeNumericRefinement(t3) : n2.isHierarchicalFacet(t3) ? e3.removeHierarchicalFacetRefinement(t3) : n2.isDisjunctiveFacet(t3) ? e3.removeDisjunctiveFacetRefinement(t3) : n2.isConjunctiveFacet(t3) ? e3.removeFacetRefinement(t3) : e3;
      }, n2);
      return n2 = -1 !== e2.indexOf("query") ? n2.setQuery("") : n2;
    }
    var Y = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, X = /[&<>"']/g, G = RegExp(X.source);
    var ee = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" }, te = /&(amp|quot|lt|gt|#39);/g, ne = RegExp(te.source);
    function re(e2) {
      return e2 && ne.test(e2) ? e2.replace(te, function(e3) {
        return ee[e3];
      }) : e2;
    }
    function ie(e2) {
      if ("object" === A(t2 = e2) && null !== t2 && "[object Object]" === (null === (t2 = e2) ? void 0 === t2 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(t2))) {
        var t2;
        if (null === Object.getPrototypeOf(e2)) return 1;
        for (var n2 = e2; null !== Object.getPrototypeOf(n2); ) n2 = Object.getPrototypeOf(n2);
        return Object.getPrototypeOf(e2) === n2;
      }
    }
    var ae = { highlightPreTag: "__ais-highlight__", highlightPostTag: "__/ais-highlight__" }, u = { highlightPreTag: "<mark>", highlightPostTag: "</mark>" };
    function se(e2) {
      return ((e2 = e2) && G.test(e2) ? e2.replace(X, function(e3) {
        return Y[e3];
      }) : e2).replace(new RegExp(ae.highlightPreTag, "g"), u.highlightPreTag).replace(new RegExp(ae.highlightPostTag, "g"), u.highlightPostTag);
    }
    function oe(n2) {
      return ie(n2) && "string" != typeof n2.value ? Object.keys(n2).reduce(function(e2, t2) {
        return T(T({}, e2), {}, E({}, t2, oe(n2[t2])));
      }, {}) : Array.isArray(n2) ? n2.map(oe) : T(T({}, n2), {}, { value: se(n2.value) });
    }
    function ce(e2) {
      return void 0 === e2.__escaped && ((e2 = e2.map(function(e3) {
        e3 = m({}, (Q(e3), e3));
        return e3._highlightResult && (e3._highlightResult = oe(e3._highlightResult)), e3._snippetResult && (e3._snippetResult = oe(e3._snippetResult)), e3;
      })).__escaped = true), e2;
    }
    function ue(e2) {
      var t2 = u.highlightPreTag, n2 = u.highlightPostTag;
      return e2.map(function(e3) {
        return e3.isHighlighted ? t2 + e3.value + n2 : e3.value;
      }).join("");
    }
    function le(e2) {
      var h2 = e2.instantSearchInstance, f2 = e2.helper, m2 = e2.attribute, p2 = e2.widgetType;
      return function() {
        for (var e3 = arguments.length, t2 = new Array(e3), n2 = 0; n2 < e3; n2++) t2[n2] = arguments[n2];
        var r2, i2, a2, s2 = t2[1], o2 = t2[2], o2 = void 0 === o2 ? "Filter Applied" : o2, c2 = t2[3], c2 = void 0 === c2 ? {} : c2, u2 = j(t2[0].split(":"), 2), l2 = u2[0], u2 = u2[1], d2 = "string" == typeof m2 ? m2 : m2(s2);
        1 === t2.length && "object" === A(t2[0]) ? h2.sendEventToInsights(t2[0]) : "click" === l2 && 2 <= t2.length && t2.length <= 4 && (i2 = d2, a2 = s2, ((r2 = f2).state.isHierarchicalFacet(i2) ? r2.state.isHierarchicalFacetRefined(i2, a2) : r2.state.isConjunctiveFacet(i2) ? r2.state.isFacetRefined(i2, a2) : r2.state.isDisjunctiveFacetRefined(i2, a2)) || h2.sendEventToInsights({ insightsMethod: "clickedFilters", widgetType: p2, eventType: l2, eventModifier: u2, payload: T({ eventName: o2, index: f2.getIndex(), filters: ["".concat(d2, ":").concat(s2)] }, c2), attribute: d2 }));
      };
    }
    function de(e2) {
      return btoa(encodeURIComponent(JSON.stringify(e2)));
    }
    function he(e2) {
      return JSON.parse(decodeURIComponent(atob(e2)));
    }
    function fe(e2) {
      var n2, r2, i2, a2, s2, t2, o2, c2, u2 = e2.getIndex, l2 = e2.widgetType, d2 = (e2.methodName, e2.args), e2 = e2.instantSearchInstance;
      return 1 === d2.length && "object" === A(d2[0]) ? [d2[0]] : (t2 = j(d2[0].split(":"), 2), n2 = t2[0], r2 = t2[1], t2 = d2[1], i2 = d2[2], a2 = d2[3] || {}, !t2 || !("click" !== n2 && "conversion" !== n2 || i2) || 0 === (d2 = Array.isArray(t2) ? t2 : [t2]).length ? [] : (s2 = d2[0].__queryID, t2 = function(e3, t3) {
        for (var n3 = 1 < arguments.length && void 0 !== t3 ? t3 : 20, r3 = [], i3 = 0; i3 < Math.ceil(e3.length / n3); i3++) r3.push(e3.slice(i3 * n3, (i3 + 1) * n3));
        return r3;
      }(d2), o2 = t2.map(function(e3) {
        return e3.map(function(e4) {
          return e4.objectID;
        });
      }), c2 = t2.map(function(e3) {
        return e3.map(function(e4) {
          return e4.__position;
        });
      }), "view" === n2 ? "idle" !== e2.status ? [] : t2.map(function(e3, t3) {
        return { insightsMethod: "viewedObjectIDs", widgetType: l2, eventType: n2, payload: T({ eventName: i2 || "Hits Viewed", index: u2(), objectIDs: o2[t3] }, a2), hits: e3, eventModifier: r2 };
      }) : "click" === n2 ? t2.map(function(e3, t3) {
        return { insightsMethod: "clickedObjectIDsAfterSearch", widgetType: l2, eventType: n2, payload: T({ eventName: i2 || "Hit Clicked", index: u2(), queryID: s2, objectIDs: o2[t3], positions: c2[t3] }, a2), hits: e3, eventModifier: r2 };
      }) : "conversion" === n2 ? t2.map(function(e3, t3) {
        return { insightsMethod: "convertedObjectIDsAfterSearch", widgetType: l2, eventType: n2, payload: T({ eventName: i2 || "Hit Converted", index: u2(), queryID: s2, objectIDs: o2[t3] }, a2), hits: e3, eventModifier: r2 };
      }) : []));
    }
    function me(e2) {
      var r2 = e2.instantSearchInstance, i2 = e2.getIndex, a2 = e2.widgetType, s2 = {}, o2 = void 0;
      return function() {
        for (var e3 = arguments.length, t2 = new Array(e3), n2 = 0; n2 < e3; n2++) t2[n2] = arguments[n2];
        fe({ widgetType: a2, getIndex: i2, methodName: "sendEvent", args: t2, instantSearchInstance: r2 }).forEach(function(e4) {
          "click" === e4.eventType && "internal" === e4.eventModifier && s2[e4.eventType] || (s2[e4.eventType] = true, r2.sendEventToInsights(e4));
        }), clearTimeout(o2), o2 = setTimeout(function() {
          s2 = {};
        }, 0);
      };
    }
    function pe(e2) {
      var i2 = e2.getIndex, a2 = e2.widgetType, s2 = e2.instantSearchInstance;
      return function() {
        for (var e3 = arguments.length, t2 = new Array(e3), n2 = 0; n2 < e3; n2++) t2[n2] = arguments[n2];
        var r2 = fe({ widgetType: a2, getIndex: i2, methodName: "bindEvent", args: t2, instantSearchInstance: s2 });
        return r2.length ? "data-insights-event=".concat(de(r2)) : "";
      };
    }
    function ge(e2) {
      return "ais.index" === e2.$$type;
    }
    function ve(t2, e2) {
      var n2 = t2[e2.getIndexId()] || {};
      e2.getHelper().setState(e2.getWidgetSearchParameters(e2.getHelper().state, { uiState: n2 })), e2.getWidgets().filter(ge).forEach(function(e3) {
        return ve(t2, e3);
      });
    }
    function ye(r2, i2) {
      var a2 = null;
      return function() {
        for (var e2 = arguments.length, n2 = new Array(e2), t2 = 0; t2 < e2; t2++) n2[t2] = arguments[t2];
        return new Promise(function(e3, t3) {
          a2 && clearTimeout(a2), a2 = setTimeout(function() {
            a2 = null, Promise.resolve(r2.apply(void 0, n2)).then(e3).catch(t3);
          }, i2);
        });
      };
    }
    var be = Promise.resolve();
    function Re(r2) {
      function e2() {
        for (var e3 = arguments.length, t2 = new Array(e3), n2 = 0; n2 < e3; n2++) t2[n2] = arguments[n2];
        null === i2 && (i2 = be.then(function() {
          i2 = null, a2 ? a2 = false : r2.apply(void 0, t2);
        }));
      }
      var i2 = null, a2 = false;
      return e2.wait = function() {
        if (null === i2) throw new Error("The deferred function should be called before calling `wait()`");
        return i2;
      }, e2.cancel = function() {
        null !== i2 && (a2 = true);
      }, e2;
    }
    function l() {
      for (var e2 = arguments.length, t2 = new Array(e2), n2 = 0; n2 < e2; n2++) t2[n2] = arguments[n2];
      var r2 = t2.map(function(e3) {
        return t3 = (e3 = e3).name, e3 = e3.connector, ["https://www.algolia.com/doc/api-reference/widgets/", t3, "/js/", void 0 !== e3 && e3 ? "#connector" : ""].join("");
        var t3;
      }).join(", ");
      return function(e3) {
        return [e3, "See documentation: ".concat(r2)].filter(Boolean).join("\n\n");
      };
    }
    function Se(e2) {
      return "number" == typeof e2 && e2 < 0 || "string" == typeof e2 ? String(e2).replace(/^-/, "\\-") : e2;
    }
    function _e(e2, t2) {
      for (var n2, r2 = 0; r2 < e2.length; r2++) if (t2(n2 = e2[r2], r2, e2)) return n2;
    }
    var we = /^(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)$/;
    function Pe(e2) {
      if (Array.isArray(e2)) {
        var t2 = e2, n2 = j(t2, 1)[0], r2 = (n2 = j(void 0 === n2 ? [void 0, void 0, void 0, void 0] : n2, 4))[0], i2 = n2[1], a2 = n2[2], n2 = n2[3];
        if (r2 && i2 && a2 && n2) return { northEast: { lat: r2, lng: i2 }, southWest: { lat: a2, lng: n2 } };
        throw new Error('Invalid value for "insideBoundingBox" parameter: ['.concat(t2, "]"));
      }
      r2 = e2, a2 = (i2 = j(r2.split(",").map(parseFloat), 4))[0], n2 = i2[1], t2 = i2[2], i2 = i2[3];
      if (a2 && n2 && t2 && i2) return { northEast: { lat: a2, lng: n2 }, southWest: { lat: t2, lng: i2 } };
      throw new Error('Invalid value for "insideBoundingBox" parameter: "'.concat(r2, '"'));
    }
    function P(e2) {
      var t2, n2 = "string" == typeof e2, r2 = n2 ? document.querySelector(e2) : e2;
      if ((t2 = r2) instanceof HTMLElement || Boolean(t2) && 0 < t2.nodeType) return r2;
      throw t2 = "Container must be `string` or `HTMLElement`.", n2 && (t2 += " Unable to find ".concat(e2)), new Error(t2);
    }
    function Ne(e2) {
      var t2 = u.highlightPostTag, n2 = u.highlightPreTag, e2 = e2.split(n2), n2 = e2.shift(), r2 = n2 ? [{ value: n2, isHighlighted: false }] : [];
      return e2.forEach(function(e3) {
        e3 = e3.split(t2);
        r2.push({ value: e3[0], isHighlighted: true }), "" !== e3[1] && r2.push({ value: e3[1], isHighlighted: false });
      }), r2;
    }
    var xe = new RegExp(/\w/i);
    function Ie(e2, t2) {
      return (Array.isArray(t2) ? t2 : t2.split(".")).reduce(function(e3, t3) {
        return e3 && e3[t3];
      }, e2);
    }
    function Fe(e2, t2, n2, r2, i2) {
      var a2, i2 = 4 < arguments.length && void 0 !== i2 ? i2 : [], s2 = { type: t2, attribute: n2, name: r2, escapedValue: Se(r2) }, o2 = _e(i2, function(e3) {
        return e3.name === n2;
      });
      if ("hierarchical" === t2) {
        for (var i2 = e2.getHierarchicalFacetByName(n2), c2 = r2.split(i2.separator), u2 = 0; void 0 !== o2 && u2 < c2.length; ++u2) !function(t3) {
          var n3;
          o2 = o2 && o2.data && _e(Object.keys(o2.data).map((n3 = o2.data, function(e3) {
            return n3[e3];
          })), function(e3) {
            return e3.name === c2[t3];
          });
        }(u2);
        a2 = o2 && o2.count;
      } else a2 = o2 && o2.data && o2.data[s2.name];
      return void 0 !== a2 && (s2.count = a2), o2 && void 0 !== o2.exhaustive && (s2.exhaustive = o2.exhaustive), s2;
    }
    function Ce(n2, r2, e2) {
      var e2 = 2 < arguments.length && void 0 !== e2 && e2, i2 = [], t2 = r2.facetsRefinements, a2 = void 0 === t2 ? {} : t2, t2 = r2.facetsExcludes, s2 = void 0 === t2 ? {} : t2, t2 = r2.disjunctiveFacetsRefinements, o2 = void 0 === t2 ? {} : t2, t2 = r2.hierarchicalFacetsRefinements, c2 = void 0 === t2 ? {} : t2, t2 = r2.numericRefinements, u2 = void 0 === t2 ? {} : t2, t2 = r2.tagRefinements, t2 = void 0 === t2 ? [] : t2;
      return Object.keys(a2).forEach(function(t3) {
        a2[t3].forEach(function(e3) {
          i2.push(Fe(r2, "facet", t3, e3, n2.facets));
        });
      }), Object.keys(s2).forEach(function(t3) {
        s2[t3].forEach(function(e3) {
          i2.push({ type: "exclude", attribute: t3, name: e3, exclude: true });
        });
      }), Object.keys(o2).forEach(function(t3) {
        o2[t3].forEach(function(e3) {
          i2.push(Fe(r2, "disjunctive", t3, "string" == typeof (e3 = e3) ? e3.replace(/^\\-/, "-") : e3, n2.disjunctiveFacets));
        });
      }), Object.keys(c2).forEach(function(t3) {
        c2[t3].forEach(function(e3) {
          i2.push(Fe(r2, "hierarchical", t3, e3, n2.hierarchicalFacets));
        });
      }), Object.keys(u2).forEach(function(n3) {
        var r3 = u2[n3];
        Object.keys(r3).forEach(function(e3) {
          var t3 = e3, e3 = r3[t3];
          (Array.isArray(e3) ? e3 : [e3]).forEach(function(e4) {
            i2.push({ type: "numeric", attribute: n3, name: "".concat(e4), numericValue: e4, operator: t3 });
          });
        });
      }), t2.forEach(function(e3) {
        i2.push({ type: "tag", attribute: "_tags", name: e3 });
      }), e2 && r2.query && r2.query.trim() && i2.push({ attribute: "query", type: "query", name: r2.query, query: r2.query }), i2;
    }
    function Te(e2, t2) {
      var n2 = null == (n2 = e2.getWidgetRenderState) ? void 0 : n2.call(e2, t2), t2 = null;
      if (n2 && n2.widgetParams && ((n2 = n2.widgetParams).attribute ? t2 = n2.attribute : Array.isArray(n2.attributes) && (t2 = n2.attributes[0])), "string" != typeof t2) throw new Error("Could not find the attribute of the widget:\n\n".concat(JSON.stringify(e2), "\n\nPlease check whether the widget's getWidgetRenderState returns widgetParams.attribute correctly."));
      return t2;
    }
    function Ee(e2, n2, r2) {
      return e2.map(function(e3, t2) {
        return T(T({}, e3), {}, { __position: r2 * n2 + t2 + 1 });
      });
    }
    function ke(e2, t2) {
      return t2 ? e2.map(function(e3) {
        return T(T({}, e3), {}, { __queryID: t2 });
      }) : e2;
    }
    function je(a2, r2) {
      var e2, s2, t2;
      r2 && ("transporter" in a2 && !a2._cacheHydrated || a2._useCache && "function" == typeof a2.addAlgoliaAgent) && (e2 = Object.keys(r2).map(function(e3) {
        var e3 = r2[e3], t3 = e3.state, n2 = e3.requestParams;
        return e3.results.map(function(e4) {
          return T({ indexName: t3.index || e4.index }, n2 || e4.params ? { params: Me(n2 || e4.params.split("&").reduce(function(e5, t4) {
            var t4 = j(t4.split("="), 2), n3 = t4[0], t4 = t4[1];
            return e5[n3] = t4 ? decodeURIComponent(t4) : "", e5;
          }, {})) } : {});
        });
      }), t2 = Object.keys(r2).reduce(function(e3, t3) {
        return e3.concat(r2[t3].results);
      }, []), "transporter" in a2 && !a2._cacheHydrated && (a2._cacheHydrated = true, s2 = a2.search, a2.search = function(e3) {
        for (var t3 = arguments.length, n2 = new Array(1 < t3 ? t3 - 1 : 0), r3 = 1; r3 < t3; r3++) n2[r3 - 1] = arguments[r3];
        var i2 = e3.map(function(e4) {
          return T(T({}, e4), {}, { params: Me(e4.params) });
        });
        return a2.transporter.responsesCache.get({ method: "search", args: [i2].concat(n2) }, function() {
          return s2.apply(void 0, [e3].concat(n2));
        });
      }, a2.transporter.responsesCache.set({ method: "search", args: e2 }, { results: t2 })), "transporter" in a2 || (t2 = "/1/indexes/*/queries_body_".concat(JSON.stringify({ requests: e2 })), a2.cache = T(T({}, a2.cache), {}, E({}, t2, JSON.stringify({ results: Object.keys(r2).map(function(e3) {
        return r2[e3].results;
      }) })))));
    }
    function Me(n2) {
      return Object.keys(n2).map(function(e2) {
        return function(e3) {
          for (var t3 = arguments.length, n3 = new Array(1 < t3 ? t3 - 1 : 0), r2 = 1; r2 < t3; r2++) n3[r2 - 1] = arguments[r2];
          var i2 = 0;
          return e3.replace(/%s/g, function() {
            return encodeURIComponent(n3[i2++]);
          });
        }("%s=%s", e2, (t2 = n2[e2], "[object Object]" === Object.prototype.toString.call(t2) || "[object Array]" === Object.prototype.toString.call(t2) ? JSON.stringify(n2[e2]) : n2[e2]));
        var t2;
      }).join("&");
    }
    function Le(e2) {
      return e2 !== Object(e2);
    }
    function Oe(e2, t2) {
      if (e2 === t2) return 1;
      if (Le(e2) || Le(t2) || "function" == typeof e2 || "function" == typeof t2) return e2 === t2;
      if (Object.keys(e2).length === Object.keys(t2).length) {
        for (var n2 = 0, r2 = Object.keys(e2); n2 < r2.length; n2++) {
          var i2 = r2[n2];
          if (!(i2 in t2)) return;
          if (!Oe(e2[i2], t2[i2])) return;
        }
        return 1;
      }
    }
    function b(e2) {
      return "number" == typeof e2 && isFinite(e2);
    }
    function He(e2) {
      return 1 === e2.button || e2.altKey || e2.ctrlKey || e2.metaKey || e2.shiftKey;
    }
    function Ae(e2) {
      return e2.filter(function(e3, t2, n2) {
        return n2.indexOf(e3) === t2;
      });
    }
    var We = ["facets", "disjunctiveFacets", "facetsRefinements", "facetsExcludes", "disjunctiveFacetsRefinements", "numericRefinements", "tagRefinements", "hierarchicalFacets", "hierarchicalFacetsRefinements", "ruleContexts"], De = function(e2, t2) {
      t2.facets, t2.disjunctiveFacets, t2.facetsRefinements, t2.facetsExcludes, t2.disjunctiveFacetsRefinements, t2.numericRefinements, t2.tagRefinements, t2.hierarchicalFacets, t2.hierarchicalFacetsRefinements, t2.ruleContexts;
      t2 = k(t2, We);
      return e2.setQueryParameters(t2);
    }, Ue = function(e2, t2) {
      return t2.facets.reduce(function(e3, t3) {
        return e3.addFacet(t3);
      }, e2);
    }, $e = function(e2, t2) {
      return t2.disjunctiveFacets.reduce(function(e3, t3) {
        return e3.addDisjunctiveFacet(t3);
      }, e2);
    }, Be = function(e2, t2) {
      return e2.setQueryParameters({ hierarchicalFacets: t2.hierarchicalFacets.reduce(function(e3, t3) {
        var n2 = function(e4, t4) {
          if (Array.isArray(e4)) {
            for (var n3 = 0; n3 < e4.length; n3++) if (t4(e4[n3])) return n3;
          }
          return -1;
        }(e3, function(e4) {
          return e4.name === t3.name;
        });
        return -1 === n2 ? e3.concat(t3) : ((e3 = e3.slice()).splice(n2, 1, t3), e3);
      }, e2.hierarchicalFacets) });
    }, Qe = function(e2, t2) {
      return t2.tagRefinements.reduce(function(e3, t3) {
        return e3.addTagRefinement(t3);
      }, e2);
    }, qe = function(e2, t2) {
      return e2.setQueryParameters({ facetsRefinements: T(T({}, e2.facetsRefinements), t2.facetsRefinements) });
    }, Ve = function(e2, t2) {
      return e2.setQueryParameters({ facetsExcludes: T(T({}, e2.facetsExcludes), t2.facetsExcludes) });
    }, Ke = function(e2, t2) {
      return e2.setQueryParameters({ disjunctiveFacetsRefinements: T(T({}, e2.disjunctiveFacetsRefinements), t2.disjunctiveFacetsRefinements) });
    }, ze = function(e2, t2) {
      return e2.setQueryParameters({ numericRefinements: T(T({}, e2.numericRefinements), t2.numericRefinements) });
    }, Je = function(e2, t2) {
      return e2.setQueryParameters({ hierarchicalFacetsRefinements: T(T({}, e2.hierarchicalFacetsRefinements), t2.hierarchicalFacetsRefinements) });
    }, Ze = function(e2, t2) {
      t2 = Ae([].concat(e2.ruleContexts).concat(t2.ruleContexts).filter(Boolean));
      return 0 < t2.length ? e2.setQueryParameters({ ruleContexts: t2 }) : e2;
    }, Ye = function() {
      for (var e2 = arguments.length, t2 = new Array(e2), n2 = 0; n2 < e2; n2++) t2[n2] = arguments[n2];
      return t2.reduce(function(e3, t3) {
        e3 = Je(e3, t3), e3 = Be(e3, t3), e3 = Qe(e3, t3), e3 = ze(e3, t3), e3 = Ke(e3, t3), e3 = Ve(e3, t3), e3 = qe(e3, t3), e3 = $e(e3, t3), e3 = Ze(e3, t3), e3 = Ue(e3, t3);
        return De(e3, t3);
      });
    };
    function Xe(n2, r2) {
      return null == n2 ? n2 : Object.keys(n2).reduce(function(e2, t2) {
        return 0 <= r2.indexOf(t2) || (e2[t2] = n2[t2]), e2;
      }, {});
    }
    function Ge(e2) {
      var t2 = e2.start, n2 = void 0 === t2 ? 0 : t2, t2 = e2.end, e2 = e2.step, e2 = void 0 === e2 ? 1 : e2, r2 = 0 === e2 ? 1 : e2, e2 = Math.round((t2 - n2) / r2);
      return w(Array(e2)).map(function(e3, t3) {
        return n2 + t3 * r2;
      });
    }
    function et(e2, t2, n2) {
      var r2 = t2.getHelper();
      return { uiState: n2, helper: r2, parent: t2, instantSearchInstance: e2, state: r2.state, renderState: e2.renderState, templatesConfig: e2.templatesConfig, createURL: t2.createURL, scopedResults: [], searchMetadata: { isSearchStalled: "stalled" === e2.status }, status: e2.status, error: e2.error };
    }
    function tt(e2, t2) {
      var n2 = t2.getResults(), r2 = t2.getHelper();
      return { helper: r2, parent: t2, instantSearchInstance: e2, results: n2, scopedResults: t2.getScopedResults(), state: n2 ? n2._state : r2.state, renderState: e2.renderState, templatesConfig: e2.templatesConfig, createURL: t2.createURL, searchMetadata: { isSearchStalled: "stalled" === e2.status }, status: e2.status, error: e2.error };
    }
    function nt(i2) {
      return i2.some(function(e2) {
        return e2.isHighlighted;
      }) ? i2.map(function(e2, t2) {
        return T(T({}, e2), {}, { isHighlighted: (n2 = (e2 = i2)[t2 = t2], r2 = (null == (r2 = i2[t2 + 1]) ? void 0 : r2.isHighlighted) || true, t2 = (null == (e2 = i2[t2 - 1]) ? void 0 : e2.isHighlighted) || true, !(xe.test(re(n2.value)) || t2 !== r2 ? n2.isHighlighted : t2)) });
        var n2, r2;
      }) : i2.map(function(e2) {
        return T(T({}, e2), {}, { isHighlighted: false });
      });
    }
    function rt(e2, t2) {
      t2 = (1 < arguments.length && void 0 !== t2 ? t2 : { fallback: function() {
      } }).fallback;
      return "undefined" == typeof window ? t2() : e2({ window });
    }
    function it(e2) {
      return Array.isArray(e2) ? e2 : [e2];
    }
    function at(y2) {
      var b2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(y2, ct()), function(e2) {
        var r2, n2, i2, a2, s2, o2, c2, u2, t2 = e2 || {}, l2 = t2.queryLanguages, d2 = t2.attributesForPrediction, h2 = t2.nbHits, f2 = void 0 === h2 ? 1 : h2, h2 = t2.renderDebounceTime, m2 = t2.searchDebounceTime, p2 = void 0 === m2 ? 100 : m2, m2 = t2.escapeHTML, g2 = void 0 === m2 || m2, m2 = t2.extraParameters, v2 = void 0 === m2 ? {} : m2;
        if (l2 && 0 !== l2.length) return r2 = function(e3) {
          var t3 = ++n2;
          return Promise.resolve(e3).then(function(e4) {
            return a2 && t3 < i2 ? a2 : (i2 = t3, a2 = e4);
          });
        }, s2 = [], o2 = !(i2 = n2 = -1), c2 = ye(y2, (a2 = void 0) === h2 ? 100 : h2), { $$type: "ais.answers", init: function(e3) {
          var t3 = e3.state, t3 = e3.instantSearchInstance.client.initIndex(t3.index);
          if ("function" != typeof t3.findAnswers) throw new Error(ct("`algoliasearch` >= 4.8.0 required."));
          u2 = ye(t3.findAnswers, p2), y2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: e3.instantSearchInstance }), true);
        }, render: function(t3) {
          var n3 = this, e3 = t3.state.query;
          e3 ? (s2 = [], o2 = true, y2(T(T({}, this.getWidgetRenderState(t3)), {}, { instantSearchInstance: t3.instantSearchInstance }), false), r2(u2(e3, l2, T(T({}, v2), {}, { nbHits: f2, attributesForPrediction: d2 }))).then(function(e4) {
            e4 && (g2 && 0 < e4.hits.length && (e4.hits = ce(e4.hits)), e4 = ke(Ee(e4.hits, 0, f2), e4.queryID), s2 = e4, o2 = false, c2(T(T({}, n3.getWidgetRenderState(t3)), {}, { instantSearchInstance: t3.instantSearchInstance }), false));
          })) : (o2 = !(s2 = []), y2(T(T({}, this.getWidgetRenderState(t3)), {}, { instantSearchInstance: t3.instantSearchInstance }), false));
        }, getRenderState: function(e3, t3) {
          return T(T({}, e3), {}, { answers: this.getWidgetRenderState(t3) });
        }, getWidgetRenderState: function() {
          return { hits: s2, isLoading: o2, widgetParams: e2 };
        }, dispose: function(e3) {
          e3 = e3.state;
          return b2(), e3;
        }, getWidgetSearchParameters: function(e3) {
          return e3;
        } };
        throw new Error(ct("The `queryLanguages` expects an array of strings."));
      };
    }
    function st(u2) {
      var s2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(u2, ut()), function(n2) {
        var o2, e2 = n2.widgets, t2 = n2.maxValuesPerFacet, r2 = void 0 === t2 ? 20 : t2, t2 = n2.facets, i2 = void 0 === t2 ? ["*"] : t2, t2 = n2.transformItems, a2 = void 0 === t2 ? function(e3) {
          return e3;
        } : t2, c2 = n2.fallbackWidget;
        if (!(e2 && Array.isArray(e2) && e2.every(function(e3) {
          return "object" === A(e3);
        }))) throw new Error(ut("The `widgets` option expects an array of widgets."));
        if (Array.isArray(i2)) return o2 = /* @__PURE__ */ new Map(), { $$type: "ais.dynamicWidgets", init: function(n3) {
          e2.forEach(function(e3) {
            var t3 = Te(e3, n3);
            o2.set(t3, { widget: e3, isMounted: false });
          }), u2(T(T({}, this.getWidgetRenderState(n3)), {}, { instantSearchInstance: n3.instantSearchInstance }), true);
        }, render: function(e3) {
          var t3 = e3.parent, i3 = this.getWidgetRenderState(e3), a3 = [], s3 = [];
          c2 && i3.attributesToRender.forEach(function(e4) {
            var t4;
            o2.has(e4) || (t4 = c2({ attribute: e4 }), o2.set(e4, { widget: t4, isMounted: false }));
          }), o2.forEach(function(e4, t4) {
            var n3 = e4.widget, e4 = e4.isMounted, r3 = -1 < i3.attributesToRender.indexOf(t4);
            !e4 && r3 ? (s3.push(n3), o2.set(t4, { widget: n3, isMounted: true })) : e4 && !r3 && (a3.push(n3), o2.set(t4, { widget: n3, isMounted: false }));
          }), t3.addWidgets(s3), setTimeout(function() {
            return t3.removeWidgets(a3);
          }, 0), u2(T(T({}, i3), {}, { instantSearchInstance: e3.instantSearchInstance }), false);
        }, dispose: function(e3) {
          var e3 = e3.parent, n3 = [];
          o2.forEach(function(e4) {
            var t3 = e4.widget;
            e4.isMounted && n3.push(t3);
          }), e3.removeWidgets(n3), s2();
        }, getWidgetSearchParameters: function(e3) {
          return i2.reduce(function(e4, t3) {
            return e4.addFacet(t3);
          }, e3.setQueryParameters({ maxValuesPerFacet: Math.max(r2 || 0, e3.maxValuesPerFacet || 0) }));
        }, getRenderState: function(e3, t3) {
          return T(T({}, e3), {}, { dynamicWidgets: this.getWidgetRenderState(t3) });
        }, getWidgetRenderState: function(e3) {
          var t3 = e3.results;
          e3.state;
          if (!t3) return { attributesToRender: [], widgetParams: n2 };
          e3 = a2(null != (e3 = null == (e3 = t3.renderingContent) || null == (e3 = e3.facetOrdering) || null == (e3 = e3.facets) ? void 0 : e3.order) ? e3 : [], { results: t3 });
          if (Array.isArray(e3)) return { attributesToRender: e3, widgetParams: n2 };
          throw new Error(ut("The `transformItems` option expects a function that returns an Array."));
        } };
        throw new Error(ut("The `facets` option only accepts an array of facets, you passed ".concat(JSON.stringify(i2))));
      };
    }
    function ot(n2) {
      var s2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(n2, lt()), function(r2) {
        var e2 = r2 || {}, t2 = e2.includedAttributes, o2 = void 0 === t2 ? [] : t2, t2 = e2.excludedAttributes, c2 = void 0 === t2 ? ["query"] : t2, t2 = e2.transformItems, u2 = void 0 === t2 ? function(e3) {
          return e3;
        } : t2;
        if (r2 && r2.includedAttributes && r2.excludedAttributes) throw new Error(lt("The options `includedAttributes` and `excludedAttributes` cannot be used together."));
        function i2() {
          return l2.refine();
        }
        function a2() {
          return l2.createURL();
        }
        var l2 = { refine: R, createURL: function() {
          return "";
        }, attributesToClear: [] };
        return { $$type: "ais.clearRefinements", init: function(e3) {
          var t3 = e3.instantSearchInstance;
          n2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t3 }), true);
        }, render: function(e3) {
          var t3 = e3.instantSearchInstance;
          n2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t3 }), false);
        }, dispose: function() {
          s2();
        }, getRenderState: function(e3, t3) {
          return T(T({}, e3), {}, { clearRefinements: this.getWidgetRenderState(t3) });
        }, getWidgetRenderState: function(e3) {
          var t3 = e3.createURL, n3 = e3.scopedResults, s3 = e3.results, e3 = (l2.attributesToClear = n3.reduce(function(e4, t4) {
            return e4.concat((t4 = (e4 = { scopedResult: t4, includedAttributes: o2, excludedAttributes: c2, transformItems: u2, results: s3 }).scopedResult, n4 = e4.includedAttributes, r3 = e4.excludedAttributes, i3 = e4.transformItems, e4 = e4.results, a3 = -1 !== n4.indexOf("query") || -1 === r3.indexOf("query"), { helper: t4.helper, items: i3(Ae(Ce(t4.results, t4.helper.state, a3).map(function(e5) {
              return e5.attribute;
            }).filter(function(e5) {
              return 0 === n4.length || -1 !== n4.indexOf(e5);
            }).filter(function(e5) {
              return "query" === e5 && a3 || -1 === r3.indexOf(e5);
            })), { results: e4 }) }));
            var n4, r3, i3, a3;
          }, []), l2.refine = function() {
            l2.attributesToClear.forEach(function(e4) {
              var t4 = e4.helper, e4 = e4.items;
              t4.setState(Z({ helper: t4, attributesToClear: e4 })).search();
            });
          }, l2.createURL = function() {
            return t3(Ye.apply(void 0, w(l2.attributesToClear.map(function(e4) {
              return Z({ helper: e4.helper, attributesToClear: e4.items });
            }))));
          }, l2.attributesToClear.some(function(e4) {
            return 0 < e4.items.length;
          }));
          return { canRefine: e3, hasRefinements: e3, refine: i2, createURL: a2, widgetParams: r2 };
        } };
      };
    }
    var ct = l({ name: "answers", connector: true }), ut = l({ name: "dynamic-widgets", connector: true }), lt = l({ name: "clear-refinements", connector: true });
    function dt(n2) {
      var r2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(n2, ht()), function(a2) {
        if ((a2 || {}).includedAttributes && (a2 || {}).excludedAttributes) throw new Error(ht("The options `includedAttributes` and `excludedAttributes` cannot be used together."));
        var e2 = a2 || {}, s2 = e2.includedAttributes, t2 = e2.excludedAttributes, o2 = void 0 === t2 ? ["query"] : t2, t2 = e2.transformItems, c2 = void 0 === t2 ? function(e3) {
          return e3;
        } : t2;
        return { $$type: "ais.currentRefinements", init: function(e3) {
          var t3 = e3.instantSearchInstance;
          n2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t3 }), true);
        }, render: function(e3) {
          var t3 = e3.instantSearchInstance;
          n2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t3 }), false);
        }, dispose: function() {
          r2();
        }, getRenderState: function(e3, t3) {
          return T(T({}, e3), {}, { currentRefinements: this.getWidgetRenderState(t3) });
        }, getWidgetRenderState: function(e3) {
          var n3 = e3.results, t3 = e3.scopedResults, r3 = e3.createURL, i2 = e3.helper;
          e3 = n3 ? t3.reduce(function(e4, t4) {
            return e4.concat(c2(ft({ results: t4.results, helper: t4.helper, indexId: t4.indexId, includedAttributes: s2, excludedAttributes: o2 }), { results: n3 }));
          }, []) : c2(ft({ results: {}, helper: i2, indexId: i2.state.index, includedAttributes: s2, excludedAttributes: o2 }), { results: n3 });
          return { items: e3, canRefine: 0 < e3.length, refine: function(e4) {
            return pt(i2, e4);
          }, createURL: function(e4) {
            return r3(mt(i2.state, e4));
          }, widgetParams: a2 };
        } };
      };
    }
    var ht = l({ name: "current-refinements", connector: true });
    function ft(e2) {
      var t2 = e2.results, n2 = e2.helper, r2 = e2.indexId, i2 = e2.includedAttributes, a2 = e2.excludedAttributes, e2 = -1 !== (i2 || []).indexOf("query") || -1 === (a2 || []).indexOf("query"), s2 = i2 ? function(e3) {
        return -1 !== i2.indexOf(e3.attribute);
      } : function(e3) {
        return -1 === a2.indexOf(e3.attribute);
      }, o2 = Ce(t2, n2.state, e2).map(gt).filter(s2);
      return o2.reduce(function(e3, t3) {
        return [].concat(w(e3.filter(function(e4) {
          return e4.attribute !== t3.attribute;
        })), [{ indexName: n2.state.index, indexId: r2, attribute: t3.attribute, label: t3.attribute, refinements: o2.filter(function(e4) {
          return e4.attribute === t3.attribute;
        }).sort(function(e4, t4) {
          return "numeric" === e4.type ? e4.value - t4.value : 0;
        }), refine: function(e4) {
          return pt(n2, e4);
        } }]);
      }, []);
    }
    function mt(e2, t2) {
      switch (e2 = e2.resetPage(), t2.type) {
        case "facet":
          return e2.removeFacetRefinement(t2.attribute, String(t2.value));
        case "disjunctive":
          return e2.removeDisjunctiveFacetRefinement(t2.attribute, String(t2.value));
        case "hierarchical":
          return e2.removeHierarchicalFacetRefinement(t2.attribute);
        case "exclude":
          return e2.removeExcludeRefinement(t2.attribute, String(t2.value));
        case "numeric":
          return e2.removeNumericRefinement(t2.attribute, t2.operator, String(t2.value));
        case "tag":
          return e2.removeTagRefinement(String(t2.value));
        case "query":
          return e2.setQueryParameter("query", "");
        default:
          return e2;
      }
    }
    function pt(e2, t2) {
      e2.setState(mt(e2.state, t2)).search();
    }
    function gt(e2) {
      var t2 = function(e3) {
        if ("numeric" === e3.type) return Number(e3.name);
        if ("escapedValue" in e3) return e3.escapedValue;
        return e3.name;
      }(e2), n2 = e2.operator ? "".concat(function(e3) {
        switch (e3) {
          case ">=":
            return "≥";
          case "<=":
            return "≤";
          default:
            return e3;
        }
      }(e2.operator), " ").concat(e2.name) : e2.name, t2 = { attribute: e2.attribute, type: e2.type, value: t2, label: n2 };
      return void 0 !== e2.operator && (t2.operator = e2.operator), void 0 !== e2.count && (t2.count = e2.count), void 0 !== e2.exhaustive && (t2.exhaustive = e2.exhaustive), t2;
    }
    function vt(c2) {
      var n2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(c2, bt()), function(u2) {
        var e2 = u2 || {}, l2 = e2.attributes, t2 = e2.separator, d2 = void 0 === t2 ? " > " : t2, t2 = e2.rootPath, r2 = void 0 === t2 ? null : t2, t2 = e2.showParentLevel, i2 = void 0 === t2 || t2, t2 = e2.limit, a2 = void 0 === t2 ? 10 : t2, t2 = e2.showMore, h2 = void 0 !== t2 && t2, t2 = e2.showMoreLimit, s2 = void 0 === t2 ? 20 : t2, t2 = e2.sortBy, f2 = void 0 === t2 ? Rt : t2, t2 = e2.transformItems, m2 = void 0 === t2 ? function(e3) {
          return e3;
        } : t2;
        if (!l2 || !Array.isArray(l2) || 0 === l2.length) throw new Error(bt("The `attributes` option expects an array of strings."));
        if (true === h2 && s2 <= a2) throw new Error(bt("The `showMoreLimit` option must be greater than `limit`."));
        var p2, g2, v2 = j(l2, 1)[0], o2 = function() {
        };
        function y2() {
          o2();
        }
        var b2 = false;
        function R2() {
          return b2 ? s2 : a2;
        }
        return { $$type: "ais.hierarchicalMenu", init: function(e3) {
          var t3 = e3.instantSearchInstance;
          c2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t3 }), true);
        }, render: function(e3) {
          var t3, n3, r3 = e3.instantSearchInstance;
          t3 = e3, o2 = function() {
            b2 = !b2, n3.render(t3);
          }, c2(T(T({}, (n3 = this).getWidgetRenderState(e3)), {}, { instantSearchInstance: r3 }), false);
        }, dispose: function(e3) {
          e3 = e3.state;
          return n2(), e3.removeHierarchicalFacet(v2).setQueryParameter("maxValuesPerFacet", void 0);
        }, getRenderState: function(e3, t3) {
          return T(T({}, e3), {}, { hierarchicalMenu: T(T({}, e3.hierarchicalMenu), {}, E({}, v2, this.getWidgetRenderState(t3))) });
        }, getWidgetRenderState: function(e3) {
          var t3, n3 = this, r3 = e3.results, i3 = e3.state, a3 = e3.createURL, s3 = e3.instantSearchInstance, o3 = e3.helper, e3 = [], c3 = false;
          return p2 = p2 || le({ instantSearchInstance: s3, helper: o3, attribute: function(e4) {
            e4 = e4.split(d2).length - 1;
            return l2[e4];
          }, widgetType: this.$$type }), g2 = g2 || function(e4) {
            p2("click:internal", e4), o3.toggleFacetRefinement(v2, e4).search();
          }, r3 && (s3 = (s3 = r3.getFacetValues(v2, { sortBy: f2, facetOrdering: f2 === Rt })) && !Array.isArray(s3) && s3.data ? s3.data : [], t3 = (i3.maxValuesPerFacet || 0) > R2() ? s3.length <= R2() : s3.length < R2(), c3 = h2 && (b2 || !t3), e3 = m2(function i4(e4) {
            return e4.slice(0, R2()).map(function(e5) {
              var t4 = e5.name, n4 = e5.escapedValue, r4 = e5.data, e5 = (e5.path, T(T({}, k(e5, yt)), {}, { value: n4, label: t4, data: null }));
              return Array.isArray(r4) && (e5.data = i4(r4)), e5;
            });
          }(s3), { results: r3 })), { items: e3, refine: g2, canRefine: 0 < e3.length, createURL: function(t4) {
            return a3(function(e4) {
              return n3.getWidgetUiState(e4, { searchParameters: i3.resetPage().toggleFacetRefinement(v2, t4), helper: o3 });
            });
          }, sendEvent: p2, widgetParams: u2, isShowingMore: b2, toggleShowMore: y2, canToggleShowMore: c3 };
        }, getWidgetUiState: function(e3, t3) {
          var t3 = t3.searchParameters.getHierarchicalFacetBreadcrumb(v2);
          return e3 = T(T({}, e3), {}, { hierarchicalMenu: T(T({}, e3.hierarchicalMenu), {}, E({}, v2, t3)) }), t3 = v2, e3.hierarchicalMenu && (e3.hierarchicalMenu[t3] && 0 !== e3.hierarchicalMenu[t3].length || delete e3.hierarchicalMenu[t3], 0 === Object.keys(e3.hierarchicalMenu).length) && delete e3.hierarchicalMenu, e3;
        }, getWidgetSearchParameters: function(e3, t3) {
          t3 = t3.uiState, t3 = t3.hierarchicalMenu && t3.hierarchicalMenu[v2];
          if (e3.isConjunctiveFacet(v2) || e3.isDisjunctiveFacet(v2)) return e3;
          e3.isHierarchicalFacet(v2) && e3.getHierarchicalFacetByName(v2);
          var e3 = e3.removeHierarchicalFacet(v2).addHierarchicalFacet({ name: v2, attributes: l2, separator: d2, rootPath: r2, showParentLevel: i2 }), n3 = e3.maxValuesPerFacet || 0, n3 = Math.max(n3, h2 ? s2 : a2), e3 = e3.setQueryParameter("maxValuesPerFacet", n3);
          return t3 ? e3.addHierarchicalFacetRefinement(v2, t3.join(d2)) : e3.setQueryParameters({ hierarchicalFacetsRefinements: T(T({}, e3.hierarchicalFacetsRefinements), {}, E({}, v2, [])) });
        } };
      };
    }
    var yt = ["name", "escapedValue", "data", "path"], bt = l({ name: "hierarchical-menu", connector: true }), Rt = ["name:asc"];
    function St(n2) {
      var c2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(n2, _t()), function(r2) {
        var i2, a2, e2 = r2 || {}, t2 = e2.escapeHTML, s2 = void 0 === t2 || t2, t2 = e2.transformItems, o2 = void 0 === t2 ? function(e3) {
          return e3;
        } : t2;
        return { $$type: "ais.hits", init: function(e3) {
          n2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: e3.instantSearchInstance }), true);
        }, render: function(e3) {
          var t3 = this.getWidgetRenderState(e3);
          n2(T(T({}, t3), {}, { instantSearchInstance: e3.instantSearchInstance }), false), t3.sendEvent("view:internal", t3.hits);
        }, getRenderState: function(e3, t3) {
          return T(T({}, e3), {}, { hits: this.getWidgetRenderState(t3) });
        }, getWidgetRenderState: function(e3) {
          var t3 = e3.results, n3 = e3.helper, e3 = e3.instantSearchInstance;
          if (i2 = i2 || me({ instantSearchInstance: e3, getIndex: function() {
            return n3.getIndex();
          }, widgetType: this.$$type }), a2 = a2 || pe({ getIndex: function() {
            return n3.getIndex();
          }, widgetType: this.$$type, instantSearchInstance: e3 }), !t3) return { hits: [], results: void 0, banner: void 0, sendEvent: i2, bindEvent: a2, widgetParams: r2 };
          s2 && 0 < t3.hits.length && (t3.hits = ce(t3.hits));
          var e3 = ke(Ee(t3.hits, t3.page, t3.hitsPerPage), t3.queryID);
          return { hits: o2(e3, { results: t3 }), results: t3, banner: null == (e3 = t3.renderingContent) || null == (t3 = e3.widgets) || null == (e3 = t3.banners) ? void 0 : e3[0], sendEvent: i2, bindEvent: a2, widgetParams: r2 };
        }, dispose: function(e3) {
          e3 = e3.state;
          return c2(), s2 ? e3.setQueryParameters(Object.keys(ae).reduce(function(e4, t3) {
            return T(T({}, e4), {}, E({}, t3, void 0));
          }, {})) : e3;
        }, getWidgetSearchParameters: function(e3) {
          return s2 ? e3.setQueryParameters(ae) : e3;
        } };
      };
    }
    var _t = l({ name: "hits", connector: true }), wt = function(e2) {
      var n2, t2 = e2.method, r2 = e2.results, i2 = e2.hits, a2 = e2.objectIDs, s2 = r2.index, o2 = (n2 = i2, a2.map(function(t3) {
        var e3 = _e(n2, function(e4) {
          return e4.objectID === t3;
        });
        if (void 0 === e3) throw new Error('Could not find objectID "'.concat(t3, '" passed to `clickedObjectIDsAfterSearch` in the returned hits. This is necessary to infer the absolute position and the query ID.'));
        return e3;
      })), c2 = function(e3) {
        e3 = Ae(e3.map(function(e4) {
          return e4.__queryID;
        }));
        if (1 < e3.length) throw new Error("Insights currently allows a single `queryID`. The `objectIDs` provided map to multiple `queryID`s.");
        e3 = e3[0];
        if ("string" != typeof e3) throw new Error("Could not infer `queryID`. Ensure InstantSearch `clickAnalytics: true` was added with the Configure widget.\n\nSee: https://alg.li/lNiZZ7");
        return e3;
      }(o2);
      switch (t2) {
        case "clickedObjectIDsAfterSearch":
          return { index: s2, queryID: c2, objectIDs: a2, positions: o2.map(function(e3) {
            return e3.__position;
          }) };
        case "convertedObjectIDsAfterSearch":
          return { index: s2, queryID: c2, objectIDs: a2 };
        default:
          throw new Error('Unsupported method passed to insights: "'.concat(t2, '".'));
      }
    };
    function Pt(t2) {
      return function(a2, e2) {
        return t2(function(e3, t3) {
          var s2, o2, c2, n2 = e3.results, r2 = e3.hits, i2 = e3.instantSearchInstance;
          return n2 && r2 && i2 ? (s2 = i2.insightsClient, o2 = n2, c2 = r2, i2 = function(e4) {
            for (var t4 = arguments.length, n3 = new Array(1 < t4 ? t4 - 1 : 0), r3 = 1; r3 < t4; r3++) n3[r3 - 1] = arguments[r3];
            var i3 = n3[0];
            if (!s2) throw a3 = l({ name: "instantsearch" }), new Error(a3("The `insightsClient` option has not been provided to `instantsearch`."));
            if (!Array.isArray(i3.objectIDs)) throw new TypeError("Expected `objectIDs` to be an array.");
            var a3 = wt({ method: e4, results: o2, hits: c2, objectIDs: i3.objectIDs });
            s2(e4, T(T({}, a3), i3));
          }, a2(T(T({}, e3), {}, { insights: i2 }), t3)) : a2(e3, t3);
        }, e2);
      };
    }
    var Nt, N, xt, It, Ft, Ct = {}, Tt = [], Et = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
    function kt(e2, t2) {
      for (var n2 in t2) e2[n2] = t2[n2];
      return e2;
    }
    function jt(e2) {
      var t2 = e2.parentNode;
      t2 && t2.removeChild(e2);
    }
    function M(e2, t2, n2) {
      var r2, i2, a2, s2 = {};
      for (a2 in t2) "key" == a2 ? r2 = t2[a2] : "ref" == a2 ? i2 = t2[a2] : s2[a2] = t2[a2];
      if (2 < arguments.length && (s2.children = 3 < arguments.length ? Nt.call(arguments, 2) : n2), "function" == typeof e2 && null != e2.defaultProps) for (a2 in e2.defaultProps) void 0 === s2[a2] && (s2[a2] = e2.defaultProps[a2]);
      return Mt(e2, s2, r2, i2, null);
    }
    function Mt(e2, t2, n2, r2, i2) {
      e2 = { type: e2, props: t2, key: n2, ref: r2, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: null == i2 ? ++xt : i2 };
      return null == i2 && null != N.vnode && N.vnode(e2), e2;
    }
    function Lt() {
      return { current: null };
    }
    function x(e2) {
      return e2.children;
    }
    function Ot(e2, t2) {
      this.props = e2, this.context = t2;
    }
    function Ht(e2, t2) {
      if (null == t2) return e2.__ ? Ht(e2.__, e2.__.__k.indexOf(e2) + 1) : null;
      for (var n2; t2 < e2.__k.length; t2++) if (null != (n2 = e2.__k[t2]) && null != n2.__e) return n2.__e;
      return "function" == typeof e2.type ? Ht(e2) : null;
    }
    function At(e2) {
      (e2.__d || (e2.__d = true, !It.push(e2)) || Wt.__r++) && Ft === N.debounceRendering || ((Ft = N.debounceRendering) || setTimeout)(Wt);
    }
    function Wt() {
      for (var e2; Wt.__r = It.length; ) e2 = It.sort(function(e3, t2) {
        return e3.__v.__b - t2.__v.__b;
      }), It = [], e2.some(function(e3) {
        var t2, n2, r2, i2, a2;
        e3.__d && (i2 = (r2 = (e3 = e3).__v).__e, a2 = e3.__P) && (t2 = [], (n2 = kt({}, r2)).__v = r2.__v + 1, Vt(a2, r2, n2, e3.__n, void 0 !== a2.ownerSVGElement, null != r2.__h ? [i2] : null, t2, null == i2 ? Ht(r2) : i2, r2.__h), Kt(t2, r2), r2.__e != i2) && function e4(t3) {
          var n3, r3;
          if (null != (t3 = t3.__) && null != t3.__c) {
            for (t3.__e = t3.__c.base = null, n3 = 0; n3 < t3.__k.length; n3++) if (null != (r3 = t3.__k[n3]) && null != r3.__e) {
              t3.__e = t3.__c.base = r3.__e;
              break;
            }
            return e4(t3);
          }
        }(r2);
      });
    }
    function Dt(e2, t2, n2, r2, i2, a2, s2, o2, c2, u2) {
      var l2, d2, h2, f2, m2, p2, g2, v2 = r2 && r2.__k || Tt, y2 = v2.length;
      for (n2.__k = [], l2 = 0; l2 < t2.length; l2++) if (null != (f2 = n2.__k[l2] = null == (f2 = t2[l2]) || "boolean" == typeof f2 ? null : "string" == typeof f2 || "number" == typeof f2 || "bigint" == typeof f2 ? Mt(null, f2, null, null, f2) : Array.isArray(f2) ? Mt(x, { children: f2 }, null, null, null) : 0 < f2.__b ? Mt(f2.type, f2.props, f2.key, f2.ref || null, f2.__v) : f2)) {
        if (f2.__ = n2, f2.__b = n2.__b + 1, null === (h2 = v2[l2]) || h2 && f2.key == h2.key && f2.type === h2.type) v2[l2] = void 0;
        else for (d2 = 0; d2 < y2; d2++) {
          if ((h2 = v2[d2]) && f2.key == h2.key && f2.type === h2.type) {
            v2[d2] = void 0;
            break;
          }
          h2 = null;
        }
        Vt(e2, f2, h2 = h2 || Ct, i2, a2, s2, o2, c2, u2), m2 = f2.__e, (d2 = f2.ref) && h2.ref != d2 && (g2 = g2 || [], h2.ref && g2.push(h2.ref, null, f2), g2.push(d2, f2.__c || m2, f2)), null != m2 ? (null == p2 && (p2 = m2), "function" == typeof f2.type && f2.__k === h2.__k ? f2.__d = c2 = function e3(t3, n3, r3) {
          for (var i3, a3 = t3.__k, s3 = 0; a3 && s3 < a3.length; s3++) (i3 = a3[s3]) && (i3.__ = t3, n3 = "function" == typeof i3.type ? e3(i3, n3, r3) : Ut(r3, i3, i3, a3, i3.__e, n3));
          return n3;
        }(f2, c2, e2) : c2 = Ut(e2, f2, h2, v2, m2, c2), "function" == typeof n2.type && (n2.__d = c2)) : c2 && h2.__e == c2 && c2.parentNode != e2 && (c2 = Ht(h2));
      }
      for (n2.__e = p2, l2 = y2; l2--; ) null != v2[l2] && ("function" == typeof n2.type && null != v2[l2].__e && v2[l2].__e == n2.__d && (n2.__d = Ht(r2, l2 + 1)), function e3(t3, n3, r3) {
        var i3, a3;
        if (N.unmount && N.unmount(t3), !(i3 = t3.ref) || i3.current && i3.current !== t3.__e || zt(i3, null, n3), null != (i3 = t3.__c)) {
          if (i3.componentWillUnmount) try {
            i3.componentWillUnmount();
          } catch (t4) {
            N.__e(t4, n3);
          }
          i3.base = i3.__P = null, t3.__c = void 0;
        }
        if (i3 = t3.__k) for (a3 = 0; a3 < i3.length; a3++) i3[a3] && e3(i3[a3], n3, "function" != typeof t3.type);
        r3 || null == t3.__e || jt(t3.__e), t3.__ = t3.__e = t3.__d = void 0;
      }(v2[l2], v2[l2]));
      if (g2) for (l2 = 0; l2 < g2.length; l2++) zt(g2[l2], g2[++l2], g2[++l2]);
    }
    function Ut(e2, t2, n2, r2, i2, a2) {
      var s2, o2, c2;
      if (void 0 !== t2.__d) s2 = t2.__d, t2.__d = void 0;
      else if (null == n2 || i2 != a2 || null == i2.parentNode) e: if (null == a2 || a2.parentNode !== e2) e2.appendChild(i2), s2 = null;
      else {
        for (o2 = a2, c2 = 0; (o2 = o2.nextSibling) && c2 < r2.length; c2 += 2) if (o2 == i2) break e;
        e2.insertBefore(i2, a2), s2 = a2;
      }
      return void 0 !== s2 ? s2 : i2.nextSibling;
    }
    function $t(e2, t2, n2) {
      "-" === t2[0] ? e2.setProperty(t2, n2) : e2[t2] = null == n2 ? "" : "number" != typeof n2 || Et.test(t2) ? n2 : n2 + "px";
    }
    function Bt(e2, t2, n2, r2, i2) {
      var a2;
      e: if ("style" === t2) if ("string" == typeof n2) e2.style.cssText = n2;
      else {
        if ("string" == typeof r2 && (e2.style.cssText = r2 = ""), r2) for (t2 in r2) n2 && t2 in n2 || $t(e2.style, t2, "");
        if (n2) for (t2 in n2) r2 && n2[t2] === r2[t2] || $t(e2.style, t2, n2[t2]);
      }
      else if ("o" === t2[0] && "n" === t2[1]) a2 = t2 !== (t2 = t2.replace(/Capture$/, "")), t2 = (t2.toLowerCase() in e2 ? t2.toLowerCase() : t2).slice(2), e2.l || (e2.l = {}), (e2.l[t2 + a2] = n2) ? r2 || e2.addEventListener(t2, a2 ? qt : Qt, a2) : e2.removeEventListener(t2, a2 ? qt : Qt, a2);
      else if ("dangerouslySetInnerHTML" !== t2) {
        if (i2) t2 = t2.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if ("href" !== t2 && "list" !== t2 && "form" !== t2 && "tabIndex" !== t2 && "download" !== t2 && t2 in e2) try {
          e2[t2] = null == n2 ? "" : n2;
          break e;
        } catch (e3) {
        }
        "function" != typeof n2 && (null != n2 && (false !== n2 || "a" === t2[0] && "r" === t2[1]) ? e2.setAttribute(t2, n2) : e2.removeAttribute(t2));
      }
    }
    function Qt(e2) {
      this.l[e2.type + false](N.event ? N.event(e2) : e2);
    }
    function qt(e2) {
      this.l[e2.type + true](N.event ? N.event(e2) : e2);
    }
    function Vt(e2, t2, n2, r2, i2, a2, s2, o2, c2) {
      var u2, l2, d2, h2, f2, m2, p2, g2, v2, y2, b2, R2, S2, _2 = t2.type;
      if (void 0 === t2.constructor) {
        null != n2.__h && (c2 = n2.__h, o2 = t2.__e = n2.__e, t2.__h = null, a2 = [o2]), (u2 = N.__b) && u2(t2);
        try {
          e: if ("function" == typeof _2) {
            if (g2 = t2.props, v2 = (u2 = _2.contextType) && r2[u2.__c], y2 = u2 ? v2 ? v2.props.value : u2.__ : r2, n2.__c ? p2 = (l2 = t2.__c = n2.__c).__ = l2.__E : ("prototype" in _2 && _2.prototype.render ? t2.__c = l2 = new _2(g2, y2) : (t2.__c = l2 = new Ot(g2, y2), l2.constructor = _2, l2.render = Jt), v2 && v2.sub(l2), l2.props = g2, l2.state || (l2.state = {}), l2.context = y2, l2.__n = r2, d2 = l2.__d = true, l2.__h = []), null == l2.__s && (l2.__s = l2.state), null != _2.getDerivedStateFromProps && (l2.__s == l2.state && (l2.__s = kt({}, l2.__s)), kt(l2.__s, _2.getDerivedStateFromProps(g2, l2.__s))), h2 = l2.props, f2 = l2.state, d2) null == _2.getDerivedStateFromProps && null != l2.componentWillMount && l2.componentWillMount(), null != l2.componentDidMount && l2.__h.push(l2.componentDidMount);
            else {
              if (null == _2.getDerivedStateFromProps && g2 !== h2 && null != l2.componentWillReceiveProps && l2.componentWillReceiveProps(g2, y2), !l2.__e && null != l2.shouldComponentUpdate && false === l2.shouldComponentUpdate(g2, l2.__s, y2) || t2.__v === n2.__v) {
                l2.props = g2, l2.state = l2.__s, t2.__v !== n2.__v && (l2.__d = false), (l2.__v = t2).__e = n2.__e, t2.__k = n2.__k, t2.__k.forEach(function(e3) {
                  e3 && (e3.__ = t2);
                }), l2.__h.length && s2.push(l2);
                break e;
              }
              null != l2.componentWillUpdate && l2.componentWillUpdate(g2, l2.__s, y2), null != l2.componentDidUpdate && l2.__h.push(function() {
                l2.componentDidUpdate(h2, f2, m2);
              });
            }
            if (l2.context = y2, l2.props = g2, l2.__v = t2, l2.__P = e2, b2 = N.__r, R2 = 0, "prototype" in _2 && _2.prototype.render) l2.state = l2.__s, l2.__d = false, b2 && b2(t2), u2 = l2.render(l2.props, l2.state, l2.context);
            else for (; l2.__d = false, b2 && b2(t2), u2 = l2.render(l2.props, l2.state, l2.context), l2.state = l2.__s, l2.__d && ++R2 < 25; ) ;
            l2.state = l2.__s, null != l2.getChildContext && (r2 = kt(kt({}, r2), l2.getChildContext())), d2 || null == l2.getSnapshotBeforeUpdate || (m2 = l2.getSnapshotBeforeUpdate(h2, f2)), S2 = null != u2 && u2.type === x && null == u2.key ? u2.props.children : u2, Dt(e2, Array.isArray(S2) ? S2 : [S2], t2, n2, r2, i2, a2, s2, o2, c2), l2.base = t2.__e, t2.__h = null, l2.__h.length && s2.push(l2), p2 && (l2.__E = l2.__ = null), l2.__e = false;
          } else null == a2 && t2.__v === n2.__v ? (t2.__k = n2.__k, t2.__e = n2.__e) : t2.__e = function(e3, t3, n3, r3, i3, a3, s3, o3) {
            var c3, u3, l3, d3 = n3.props, h3 = t3.props, f3 = t3.type, m3 = 0;
            if ("svg" === f3 && (i3 = true), null != a3) {
              for (; m3 < a3.length; m3++) if ((c3 = a3[m3]) && "setAttribute" in c3 == !!f3 && (f3 ? c3.localName === f3 : 3 === c3.nodeType)) {
                e3 = c3, a3[m3] = null;
                break;
              }
            }
            if (null == e3) {
              if (null === f3) return document.createTextNode(h3);
              e3 = i3 ? document.createElementNS("http://www.w3.org/2000/svg", f3) : document.createElement(f3, h3.is && h3), a3 = null, o3 = false;
            }
            if (null === f3) d3 === h3 || o3 && e3.data === h3 || (e3.data = h3);
            else {
              if (a3 = a3 && Nt.call(e3.childNodes), u3 = (d3 = n3.props || Ct).dangerouslySetInnerHTML, l3 = h3.dangerouslySetInnerHTML, !o3) {
                if (null != a3) for (d3 = {}, m3 = 0; m3 < e3.attributes.length; m3++) d3[e3.attributes[m3].name] = e3.attributes[m3].value;
                !l3 && !u3 || l3 && (u3 && l3.__html == u3.__html || l3.__html === e3.innerHTML) || (e3.innerHTML = l3 && l3.__html || "");
              }
              if (function(e4, t4, n4, r4, i4) {
                for (var a4 in n4) "children" === a4 || "key" === a4 || a4 in t4 || Bt(e4, a4, null, n4[a4], r4);
                for (a4 in t4) i4 && "function" != typeof t4[a4] || "children" === a4 || "key" === a4 || "value" === a4 || "checked" === a4 || n4[a4] === t4[a4] || Bt(e4, a4, t4[a4], n4[a4], r4);
              }(e3, h3, d3, i3, o3), l3) t3.__k = [];
              else if (m3 = t3.props.children, Dt(e3, Array.isArray(m3) ? m3 : [m3], t3, n3, r3, i3 && "foreignObject" !== f3, a3, s3, a3 ? a3[0] : n3.__k && Ht(n3, 0), o3), null != a3) for (m3 = a3.length; m3--; ) null != a3[m3] && jt(a3[m3]);
              o3 || ("value" in h3 && void 0 !== (m3 = h3.value) && (m3 !== e3.value || "progress" === f3 && !m3 || "option" === f3 && m3 !== d3.value) && Bt(e3, "value", m3, d3.value, false), "checked" in h3 && void 0 !== (m3 = h3.checked) && m3 !== e3.checked && Bt(e3, "checked", m3, d3.checked, false));
            }
            return e3;
          }(n2.__e, t2, n2, r2, i2, a2, s2, c2);
          (u2 = N.diffed) && u2(t2);
        } catch (e3) {
          t2.__v = null, !c2 && null == a2 || (t2.__e = o2, t2.__h = !!c2, a2[a2.indexOf(o2)] = null), N.__e(e3, t2, n2);
        }
      }
    }
    function Kt(e2, t2) {
      N.__c && N.__c(t2, e2), e2.some(function(t3) {
        try {
          e2 = t3.__h, t3.__h = [], e2.some(function(e3) {
            e3.call(t3);
          });
        } catch (e3) {
          N.__e(e3, t3.__v);
        }
      });
    }
    function zt(e2, t2, n2) {
      try {
        "function" == typeof e2 ? e2(t2) : e2.current = t2;
      } catch (e3) {
        N.__e(e3, n2);
      }
    }
    function Jt(e2, t2, n2) {
      return this.constructor(e2, n2);
    }
    function L(e2, t2, n2) {
      var r2, i2, a2;
      N.__ && N.__(e2, t2), i2 = (r2 = "function" == typeof n2) ? null : t2.__k, a2 = [], Vt(t2, e2 = (!r2 && n2 || t2).__k = M(x, null, [e2]), i2 || Ct, Ct, void 0 !== t2.ownerSVGElement, !r2 && n2 ? [n2] : !i2 && t2.firstChild ? Nt.call(t2.childNodes) : null, a2, !r2 && n2 ? n2 : i2 ? i2.__e : t2.firstChild, r2), Kt(a2, e2);
    }
    function Zt(e2, t2) {
      var n2, e2 = { method: e2, payload: t2 }, t2 = e2.method;
      if ("object" !== A(e2 = e2.payload)) throw new Error("The insights helper expects the payload to be an object.");
      try {
        n2 = de(e2);
      } catch (e3) {
        throw new Error("Could not JSON serialize the payload object.");
      }
      return 'data-insights-method="'.concat(t2, '" data-insights-payload="').concat(n2, '"');
    }
    Nt = Tt.slice, N = { __e: function(e2, t2, n2, r2) {
      for (var i2, a2, s2; t2 = t2.__; ) if ((i2 = t2.__c) && !i2.__) try {
        if ((a2 = i2.constructor) && null != a2.getDerivedStateFromError && (i2.setState(a2.getDerivedStateFromError(e2)), s2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(e2, r2 || {}), s2 = i2.__d), s2) return i2.__E = i2;
      } catch (t3) {
        e2 = t3;
      }
      throw e2;
    } }, xt = 0, Ot.prototype.setState = function(e2, t2) {
      var n2 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = kt({}, this.state);
      (e2 = "function" == typeof e2 ? e2(kt({}, n2), this.props) : e2) && kt(n2, e2), null != e2 && this.__v && (t2 && this.__h.push(t2), At(this));
    }, Ot.prototype.forceUpdate = function(e2) {
      this.__v && (this.__e = true, e2 && this.__h.push(e2), At(this));
    }, Ot.prototype.render = x, It = [], Wt.__r = 0;
    var Yt = function(e2) {
      var n2 = e2.insights, r2 = e2.sendEvent;
      return function(e3) {
        var t2 = Xt(e3.target, e3.currentTarget, function(e4) {
          return e4.hasAttribute("data-insights-event");
        }), t2 = (t2 && function(e4) {
          e4 = e4.getAttribute("data-insights-event");
          if ("string" != typeof e4) throw new Error("The insights middleware expects `data-insights-event` to be a base64-encoded JSON string.");
          try {
            return he(e4);
          } catch (e5) {
            throw new Error("The insights middleware was unable to parse `data-insights-event`.");
          }
        }(t2).forEach(function(e4) {
          return r2(e4);
        }), Xt(e3.target, e3.currentTarget, function(e4) {
          return e4.hasAttribute("data-insights-method") && e4.hasAttribute("data-insights-payload");
        }));
        t2 && (t2 = (e3 = function(e4) {
          var t3 = e4.getAttribute("data-insights-method");
          if ("string" != typeof (e4 = e4.getAttribute("data-insights-payload"))) throw new Error("The insights helper expects `data-insights-payload` to be a base64-encoded JSON string.");
          try {
            return { method: t3, payload: he(e4) };
          } catch (e5) {
            throw new Error("The insights helper was unable to parse `data-insights-payload`.");
          }
        }(t2)).method, e3 = e3.payload, n2(t2, e3));
      };
    };
    function Xt(e2, t2, n2) {
      for (var r2 = e2; r2 && !n2(r2); ) {
        if (r2 === t2) return null;
        r2 = r2.parentElement;
      }
      return r2;
    }
    function Gt(r2) {
      var i2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(r2, tn()), function(s2) {
        var e2 = s2 || {}, t2 = e2.items, e2 = e2.transformItems, o2 = void 0 === e2 ? function(e3) {
          return e3;
        } : e2;
        if (!Array.isArray(t2)) throw new Error(tn("The `items` option expects an array of objects."));
        var c2 = t2, e2 = c2.filter(function(e3) {
          return true === e3.default;
        });
        if (0 === e2.length) throw new Error(tn("A default value must be specified in `items`."));
        if (1 < e2.length) throw new Error(tn("More than one default value is specified in `items`."));
        var n2 = e2[0], u2 = function(t3) {
          return function(e3) {
            return (e3 || 0 === e3 ? t3.setQueryParameter("hitsPerPage", e3) : t3.setQueryParameter("hitsPerPage", void 0)).search();
          };
        }, l2 = function(e3) {
          var n3 = e3.state, r3 = e3.createURL, i3 = e3.getWidgetUiState, a2 = e3.helper;
          return function(t3) {
            return r3(function(e4) {
              return i3(e4, { searchParameters: n3.resetPage().setQueryParameter("hitsPerPage", t3 || 0 === t3 ? t3 : void 0), helper: a2 });
            });
          };
        };
        return { $$type: "ais.hitsPerPage", init: function(e3) {
          var t3 = e3.state, n3 = e3.instantSearchInstance;
          c2.some(function(e4) {
            return Number(t3.hitsPerPage) === Number(e4.value);
          }) || (c2 = [{ value: "", label: "" }].concat(w(c2))), r2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: n3 }), true);
        }, render: function(e3) {
          var t3 = e3.instantSearchInstance;
          r2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t3 }), false);
        }, dispose: function(e3) {
          e3 = e3.state;
          return i2(), e3.setQueryParameter("hitsPerPage", void 0);
        }, getRenderState: function(e3, t3) {
          return T(T({}, e3), {}, { hitsPerPage: this.getWidgetRenderState(t3) });
        }, getWidgetRenderState: function(e3) {
          var t3, n3 = e3.state, r3 = e3.results, i3 = e3.createURL, e3 = e3.helper, a2 = !!r3 && 0 < r3.nbHits;
          return { items: o2((t3 = n3.hitsPerPage, c2.map(function(e4) {
            return T(T({}, e4), {}, { isRefined: Number(e4.value) === Number(t3) });
          })), { results: r3 }), refine: u2(e3), createURL: l2({ state: n3, createURL: i3, getWidgetUiState: this.getWidgetUiState, helper: e3 }), hasNoResults: !a2, canRefine: a2, widgetParams: s2 };
        }, getWidgetUiState: function(e3, t3) {
          t3 = t3.searchParameters.hitsPerPage;
          return void 0 === t3 || t3 === n2.value ? e3 : T(T({}, e3), {}, { hitsPerPage: t3 });
        }, getWidgetSearchParameters: function(e3, t3) {
          t3 = t3.uiState;
          return e3.setQueryParameters({ hitsPerPage: t3.hitsPerPage || n2.value });
        } };
      };
    }
    var en = Pt(St), tn = l({ name: "hits-per-page", connector: true }), nn = ["page"], rn = ["clickAnalytics", "userToken"], an = l({ name: "infinite-hits", connector: true });
    function sn(e2) {
      e2 = e2 || {};
      e2.page;
      return k(e2, nn);
    }
    function on(e2) {
      e2 = e2 || {};
      e2.clickAnalytics, e2.userToken;
      return k(e2, rn);
    }
    function cn(i2) {
      var a2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(i2, an()), function(f2) {
        var n2, r2, m2, p2, g2, v2, e2 = f2 || {}, t2 = e2.escapeHTML, y2 = void 0 === t2 || t2, t2 = e2.transformItems, b2 = void 0 === t2 ? function(e3) {
          return e3;
        } : t2, t2 = e2.cache, R2 = void 0 === t2 ? (r2 = n2 = null, { read: function(e3) {
          e3 = e3.state;
          return Oe(r2, sn(e3)) ? n2 : null;
        }, write: function(e3) {
          var t3 = e3.state, e3 = e3.hits;
          r2 = sn(t3), n2 = e3;
        } }) : t2, S2 = function(e3, t3) {
          e3 = e3.page, e3 = void 0 === e3 ? 0 : e3, t3 = Object.keys(t3).map(Number);
          return 0 === t3.length ? e3 : Math.min.apply(Math, [e3].concat(w(t3)));
        }, _2 = function(e3, t3) {
          e3 = e3.page, e3 = void 0 === e3 ? 0 : e3, t3 = Object.keys(t3).map(Number);
          return 0 === t3.length ? e3 : Math.max.apply(Math, [e3].concat(w(t3)));
        };
        return { $$type: "ais.infiniteHits", init: function(e3) {
          i2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: e3.instantSearchInstance }), true);
        }, render: function(e3) {
          var t3 = e3.instantSearchInstance, e3 = this.getWidgetRenderState(e3);
          i2(T(T({}, e3), {}, { instantSearchInstance: t3 }), false), g2("view:internal", e3.currentPageHits);
        }, getRenderState: function(e3, t3) {
          return T(T({}, e3), {}, { infiniteHits: this.getWidgetRenderState(t3) });
        }, getWidgetRenderState: function(e3) {
          var t3, n3, r3, i3, a3 = e3.results, s2 = e3.helper, o2 = e3.parent, c2 = e3.state, e3 = e3.instantSearchInstance, u2 = [], o2 = o2.getPreviousState() || c2, c2 = R2.read({ state: on(o2) }) || {}, l2 = a3 ? (d2 = void 0 === (d2 = o2.page) ? 0 : d2, y2 && 0 < a3.hits.length && (a3.hits = ce(a3.hits)), h2 = ke(Ee(a3.hits, a3.page, a3.hitsPerPage), a3.queryID), h2 = b2(h2, { results: a3 }), t3 = false, function t4(e4, n4) {
            n4(e4), e4.getWidgets().forEach(function(e5) {
              ge(e5) && t4(e5, n4);
            });
          }(e3.mainIndex, function(e4) {
            !t3 && e4.getWidgets().some(function(e5) {
              return "ais.dynamicWidgets" === e5.$$type;
            }) && (t3 = true);
          }), l2 = !(null != (l2 = o2.disjunctiveFacets) && l2.length || (o2.facets || []).filter(function(e4) {
            return "*" !== e4;
          }).length || null != (l2 = o2.hierarchicalFacets) && l2.length), void 0 !== c2[d2] || a3.__isArtificial || "idle" !== e3.status || t3 && l2 || (c2[d2] = h2, R2.write({ state: on(o2), hits: c2 })), u2 = h2, 0 === S2(o2, c2)) : (m2 = function() {
            r3.overrideStateWithoutTriggeringChangeEvent(T(T({}, r3.state), {}, { page: S2(r3.state, R2.read({ state: on(r3.state) }) || {}) - 1 })).searchWithoutTriggeringOnStateChange();
          }, n3 = r3 = s2, p2 = function() {
            n3.setPage(_2(n3.state, R2.read({ state: on(n3.state) }) || {}) + 1).search();
          }, g2 = me({ instantSearchInstance: e3, getIndex: function() {
            return s2.getIndex();
          }, widgetType: this.$$type }), v2 = pe({ getIndex: function() {
            return s2.getIndex();
          }, widgetType: this.$$type, instantSearchInstance: e3 }), void 0 === o2.page || 0 === S2(o2, c2)), d2 = (i3 = c2, Object.keys(i3).map(Number).sort(function(e4, t4) {
            return e4 - t4;
          }).reduce(function(e4, t4) {
            return e4.concat(i3[t4]);
          }, [])), h2 = !a3 || a3.nbPages <= _2(o2, c2) + 1;
          return { hits: d2, currentPageHits: u2, sendEvent: g2, bindEvent: v2, results: a3, showPrevious: m2, showMore: p2, isFirstPage: l2, isLastPage: h2, widgetParams: f2 };
        }, dispose: function(e3) {
          e3 = e3.state, a2(), e3 = e3.setQueryParameter("page", void 0);
          return y2 ? e3.setQueryParameters(Object.keys(ae).reduce(function(e4, t3) {
            return T(T({}, e4), {}, E({}, t3, void 0));
          }, {})) : e3;
        }, getWidgetUiState: function(e3, t3) {
          t3 = t3.searchParameters.page || 0;
          return t3 ? T(T({}, e3), {}, { page: t3 + 1 }) : e3;
        }, getWidgetSearchParameters: function(e3, t3) {
          var t3 = t3.uiState, n3 = e3, e3 = (y2 && (n3 = e3.setQueryParameters(ae)), t3.page ? t3.page - 1 : 0);
          return n3.setQueryParameter("page", e3);
        } };
      };
    }
    function un(n2) {
      var a2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(n2, hn()), function(l2) {
        var d2, h2, f2, e2 = l2 || {}, m2 = e2.attribute, t2 = e2.limit, r2 = void 0 === t2 ? 10 : t2, t2 = e2.showMore, p2 = void 0 !== t2 && t2, t2 = e2.showMoreLimit, i2 = void 0 === t2 ? 20 : t2, t2 = e2.sortBy, g2 = void 0 === t2 ? fn : t2, t2 = e2.transformItems, v2 = void 0 === t2 ? function(e3) {
          return e3;
        } : t2;
        if (!m2) throw new Error(hn("The `attribute` option is required."));
        if (true === p2 && i2 <= r2) throw new Error(hn("The `showMoreLimit` option must be greater than `limit`."));
        var y2 = false, b2 = function() {
        };
        function R2() {
          b2();
        }
        function S2() {
          return y2 ? i2 : r2;
        }
        return { $$type: "ais.menu", init: function(e3) {
          var t3 = e3.instantSearchInstance;
          n2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t3 }), true);
        }, render: function(e3) {
          var t3 = e3.instantSearchInstance;
          n2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t3 }), false);
        }, dispose: function(e3) {
          e3 = e3.state;
          return a2(), e3.removeHierarchicalFacet(m2).setQueryParameter("maxValuesPerFacet", void 0);
        }, getRenderState: function(e3, t3) {
          return T(T({}, e3), {}, { menu: T(T({}, e3.menu), {}, E({}, m2, this.getWidgetRenderState(t3))) });
        }, getWidgetRenderState: function(e3) {
          var t3, n3, r3 = this, i3 = e3.results, a3 = e3.createURL, s2 = e3.instantSearchInstance, o2 = e3.helper, c2 = [], u2 = false;
          return d2 = d2 || le({ instantSearchInstance: s2, helper: o2, attribute: m2, widgetType: this.$$type }), h2 = h2 || function(t4) {
            return a3(function(e4) {
              return r3.getWidgetUiState(e4, { searchParameters: o2.state.resetPage().toggleFacetRefinement(m2, t4), helper: o2 });
            });
          }, f2 = f2 || function(e4) {
            var t4 = j(o2.getHierarchicalFacetBreadcrumb(m2), 1)[0];
            d2("click:internal", e4 || t4), o2.toggleFacetRefinement(m2, e4 || t4).search();
          }, e3.results && (t3 = e3, n3 = this, b2 = function() {
            y2 = !y2, n3.render(t3);
          }), i3 && (e3 = (s2 = i3.getFacetValues(m2, { sortBy: g2, facetOrdering: g2 === fn })) && !Array.isArray(s2) && s2.data ? s2.data : [], u2 = p2 && (y2 || e3.length > S2()), c2 = v2(e3.slice(0, S2()).map(function(e4) {
            var t4 = e4.name, n4 = e4.escapedValue;
            e4.path;
            return T(T({}, k(e4, dn)), {}, { label: t4, value: n4 });
          }), { results: i3 })), { items: c2, createURL: h2, refine: f2, sendEvent: d2, canRefine: 0 < c2.length, widgetParams: l2, isShowingMore: y2, toggleShowMore: R2, canToggleShowMore: u2 };
        }, getWidgetUiState: function(e3, t3) {
          var t3 = j(t3.searchParameters.getHierarchicalFacetBreadcrumb(m2), 1)[0];
          return e3 = T(T({}, e3), {}, { menu: T(T({}, e3.menu), {}, E({}, m2, t3)) }), t3 = m2, e3.menu && (void 0 === e3.menu[t3] && delete e3.menu[t3], 0 === Object.keys(e3.menu).length) && delete e3.menu, e3;
        }, getWidgetSearchParameters: function(e3, t3) {
          var n3, t3 = t3.uiState, t3 = t3.menu && t3.menu[m2];
          return e3.isConjunctiveFacet(m2) || e3.isDisjunctiveFacet(m2) ? e3 : (n3 = (e3 = e3.removeHierarchicalFacet(m2).addHierarchicalFacet({ name: m2, attributes: [m2] })).maxValuesPerFacet || 0, n3 = Math.max(n3, p2 ? i2 : r2), e3 = e3.setQueryParameter("maxValuesPerFacet", n3), t3 ? e3.addHierarchicalFacetRefinement(m2, t3) : e3.setQueryParameters({ hierarchicalFacetsRefinements: T(T({}, e3.hierarchicalFacetsRefinements), {}, E({}, m2, [])) }));
        } };
      };
    }
    var ln = Pt(cn), dn = ["name", "escapedValue", "path"], hn = l({ name: "menu", connector: true }), fn = ["isRefined", "name:asc"];
    function mn(n2) {
      var r2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(n2, pn()), function(f2) {
        var m2, e2 = f2 || {}, t2 = e2.attribute, p2 = void 0 === t2 ? "" : t2, t2 = e2.items, g2 = void 0 === t2 ? [] : t2, t2 = e2.transformItems, v2 = void 0 === t2 ? function(e3) {
          return e3;
        } : t2;
        if ("" === p2) throw new Error(pn("The `attribute` option is required."));
        if (g2 && 0 !== g2.length) return m2 = {}, { $$type: "ais.numericMenu", init: function(e3) {
          var t3 = e3.instantSearchInstance;
          n2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t3 }), true);
        }, render: function(e3) {
          var t3 = e3.instantSearchInstance;
          n2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t3 }), false);
        }, dispose: function(e3) {
          e3 = e3.state;
          return r2(), e3.removeNumericRefinement(p2);
        }, getWidgetUiState: function(e3, t3) {
          var t3 = t3.searchParameters.getNumericRefinements(p2), n3 = t3["="] && t3["="][0];
          return n3 || 0 === n3 ? T(T({}, e3), {}, { numericMenu: T(T({}, e3.numericMenu), {}, E({}, p2, "".concat(t3["="]))) }) : (n3 = t3[">="] && t3[">="][0] || "", t3 = t3["<="] && t3["<="][0] || "", e3 = T(T({}, e3), {}, { numericMenu: T(T({}, e3.numericMenu), {}, E({}, p2, "".concat(n3, ":").concat(t3))) }), n3 = p2, e3.numericMenu && (":" === e3.numericMenu[n3] && delete e3.numericMenu[n3], 0 === Object.keys(e3.numericMenu).length) && delete e3.numericMenu, e3);
        }, getWidgetSearchParameters: function(e3, t3) {
          var n3, t3 = t3.uiState, t3 = t3.numericMenu && t3.numericMenu[p2], e3 = e3.setQueryParameters({ numericRefinements: T(T({}, e3.numericRefinements), {}, E({}, p2, {})) });
          return t3 ? -1 === t3.indexOf(":") ? e3.addNumericRefinement(p2, "=", Number(t3)) : (n3 = (t3 = j(t3.split(":").map(parseFloat), 2))[0], t3 = t3[1], n3 = b(n3) ? e3.addNumericRefinement(p2, ">=", n3) : e3, b(t3) ? n3.addNumericRefinement(p2, "<=", t3) : n3) : e3;
        }, getRenderState: function(e3, t3) {
          return T(T({}, e3), {}, { numericMenu: T(T({}, e3.numericMenu), {}, E({}, p2, this.getWidgetRenderState(t3))) });
        }, getWidgetRenderState: function(e3) {
          var t3, r3, n3, i2 = this, a2 = e3.results, s2 = e3.state, o2 = e3.instantSearchInstance, c2 = e3.helper, u2 = e3.createURL, e3 = (m2.refine || (m2.refine = function(e4) {
            var t4 = vn(c2.state, p2, e4);
            m2.sendEvent("click:internal", e4), c2.setState(t4).search();
          }), m2.createURL || (m2.createURL = function(n4) {
            return function(t4) {
              return u2(function(e4) {
                return i2.getWidgetUiState(e4, { searchParameters: vn(n4, p2, t4), helper: c2 });
              });
            };
          }), m2.sendEvent || (m2.sendEvent = (t3 = { instantSearchInstance: o2 }.instantSearchInstance, function() {
            1 === arguments.length && t3.sendEventToInsights(arguments.length <= 0 ? void 0 : arguments[0]);
          })), !a2 || 0 === a2.nbHits), o2 = (r3 = s2, g2.map(function(e4) {
            var t4 = e4.start, n4 = e4.end, e4 = e4.label;
            return { label: e4, value: encodeURI(JSON.stringify({ start: t4, end: n4 })), isRefined: gn(r3, p2, { start: t4, end: n4, label: e4 }) };
          })), l2 = true, d2 = function(e4, t4) {
            var n4, r4, i3, a3, s3 = "undefined" != typeof Symbol && e4[Symbol.iterator] || e4["@@iterator"];
            if (s3) return r4 = !(n4 = true), { s: function() {
              s3 = s3.call(e4);
            }, n: function() {
              var e5 = s3.next();
              return n4 = e5.done, e5;
            }, e: function(e5) {
              r4 = true, i3 = e5;
            }, f: function() {
              try {
                n4 || null == s3.return || s3.return();
              } finally {
                if (r4) throw i3;
              }
            } };
            if (Array.isArray(e4) || (s3 = V(e4)) || t4 && e4 && "number" == typeof e4.length) return s3 && (e4 = s3), a3 = 0, { s: t4 = function() {
            }, n: function() {
              return a3 >= e4.length ? { done: true } : { done: false, value: e4[a3++] };
            }, e: function(e5) {
              throw e5;
            }, f: t4 };
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }(o2);
          try {
            for (d2.s(); !(n3 = d2.n()).done; ) {
              var h2 = n3.value;
              if (h2.isRefined && "{}" !== decodeURI(h2.value)) {
                l2 = false;
                break;
              }
            }
          } catch (e4) {
            d2.e(e4);
          } finally {
            d2.f();
          }
          return { createURL: m2.createURL(s2), items: v2(o2, { results: a2 }), hasNoResults: e3, canRefine: !(e3 && l2), refine: m2.refine, sendEvent: m2.sendEvent, widgetParams: f2 };
        } };
        throw new Error(pn("The `items` option expects an array of objects."));
      };
    }
    var pn = l({ name: "numeric-menu", connector: true });
    function gn(e2, t2, n2) {
      var r2 = e2.getNumericRefinements(t2);
      return void 0 !== n2.start && void 0 !== n2.end ? n2.start === n2.end ? yn(r2, "=", n2.start) : yn(r2, ">=", n2.start) && yn(r2, "<=", n2.end) : void 0 !== n2.start ? yn(r2, ">=", n2.start) : void 0 !== n2.end ? yn(r2, "<=", n2.end) : void 0 === n2.start && void 0 === n2.end && Object.keys(r2).every(function(e3) {
        return 0 === (r2[e3] || []).length;
      });
    }
    function vn(e2, t2, n2) {
      var n2 = JSON.parse(decodeURI(n2)), r2 = e2.getNumericRefinements(t2);
      if (void 0 === n2.start && void 0 === n2.end) return e2.removeNumericRefinement(t2);
      if (gn(e2, t2, n2) || (e2 = e2.removeNumericRefinement(t2)), void 0 !== n2.start && void 0 !== n2.end) {
        if (n2.start > n2.end) throw new Error("option.start should be > to option.end");
        if (n2.start === n2.end) return e2 = yn(r2, "=", n2.start) ? e2.removeNumericRefinement(t2, "=", n2.start) : e2.addNumericRefinement(t2, "=", n2.start);
      }
      return void 0 !== n2.start && (e2 = (e2 = yn(r2, ">=", n2.start) ? e2.removeNumericRefinement(t2, ">=", n2.start) : e2).addNumericRefinement(t2, ">=", n2.start)), "number" == typeof (e2 = void 0 !== n2.end ? (e2 = yn(r2, "<=", n2.end) ? e2.removeNumericRefinement(t2, "<=", n2.end) : e2).addNumericRefinement(t2, "<=", n2.end) : e2).page && (e2.page = 0), e2;
    }
    function yn(e2, t2, n2) {
      return void 0 !== e2[t2] && e2[t2].includes(n2);
    }
    function bn(n2) {
      var t2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(n2, Sn()), function(a2) {
        var e2 = a2 || {}, s2 = e2.totalPages, e2 = e2.padding, o2 = new Rn({ currentPage: 0, total: 0, padding: void 0 === e2 ? 3 : e2 }), c2 = {};
        return { $$type: "ais.pagination", init: function(e3) {
          var t3 = e3.instantSearchInstance;
          n2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t3 }), true);
        }, render: function(e3) {
          var t3 = e3.instantSearchInstance;
          n2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t3 }), false);
        }, dispose: function(e3) {
          e3 = e3.state;
          return t2(), e3.setQueryParameter("page", void 0);
        }, getWidgetUiState: function(e3, t3) {
          t3 = t3.searchParameters.page || 0;
          return t3 ? T(T({}, e3), {}, { page: t3 + 1 }) : e3;
        }, getWidgetSearchParameters: function(e3, t3) {
          t3 = t3.uiState, t3 = t3.page ? t3.page - 1 : 0;
          return e3.setQueryParameter("page", t3);
        }, getWidgetRenderState: function(e3) {
          var t3 = e3.results, n3 = e3.helper, r2 = e3.state, i2 = e3.createURL, e3 = (c2.refine || (c2.refine = function(e4) {
            n3.setPage(e4), n3.search();
          }), c2.createURL || (c2.createURL = function(t4) {
            return i2(function(e4) {
              return T(T({}, e4), {}, { page: t4 + 1 });
            });
          }), r2.page || 0), r2 = (r2 = (r2 = t3 || { nbPages: 0 }).nbPages, void 0 !== s2 ? Math.min(s2, r2) : r2);
          return o2.currentPage = e3, o2.total = r2, { createURL: c2.createURL, refine: c2.refine, canRefine: 1 < r2, currentRefinement: e3, nbHits: (null == t3 ? void 0 : t3.nbHits) || 0, nbPages: r2, pages: t3 ? o2.pages() : [], isFirstPage: o2.isFirstPage(), isLastPage: o2.isLastPage(), widgetParams: a2 };
        }, getRenderState: function(e3, t3) {
          return T(T({}, e3), {}, { pagination: this.getWidgetRenderState(t3) });
        } };
      };
    }
    var Rn = function() {
      function t2(e2) {
        W(this, t2), E(this, "currentPage", void 0), E(this, "total", void 0), E(this, "padding", void 0), this.currentPage = e2.currentPage, this.total = e2.total, this.padding = e2.padding;
      }
      return D(t2, [{ key: "pages", value: function() {
        var e2, t3 = this.total, n2 = this.currentPage, r2 = this.padding;
        return 0 === t3 ? [0] : Ge((e2 = this.nbPagesDisplayed(r2, t3)) === t3 ? { end: t3 } : { start: n2 - (r2 = this.calculatePaddingLeft(n2, r2, t3, e2)), end: n2 + (e2 - r2) });
      } }, { key: "nbPagesDisplayed", value: function(e2, t3) {
        return Math.min(2 * e2 + 1, t3);
      } }, { key: "calculatePaddingLeft", value: function(e2, t3, n2, r2) {
        return e2 <= t3 ? e2 : n2 - t3 <= e2 ? r2 - (n2 - e2) : t3;
      } }, { key: "isLastPage", value: function() {
        return this.currentPage === this.total - 1 || 0 === this.total;
      } }, { key: "isFirstPage", value: function() {
        return 0 === this.currentPage;
      } }]), t2;
    }(), Sn = l({ name: "pagination", connector: true }), _n = l({ name: "range-input", connector: true }, { name: "range-slider", connector: true });
    function wn(e2) {
      var t2 = e2.min, n2 = e2.max, e2 = e2.precision, e2 = Math.pow(10, e2);
      return { min: t2 && Math.floor(t2 * e2) / e2, max: n2 && Math.ceil(n2 * e2) / e2 };
    }
    function Pn(n2) {
      var r2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(n2, _n()), function(o2) {
        var e2 = o2 || {}, t2 = e2.attribute, u2 = void 0 === t2 ? "" : t2, l2 = e2.min, d2 = e2.max, t2 = e2.precision, h2 = void 0 === t2 ? 0 : t2;
        if (!u2) throw new Error(_n("The `attribute` option is required."));
        if (b(l2) && b(d2) && d2 < l2) throw new Error(_n("The `max` option can't be lower than `min`."));
        var c2 = { from: function(e3) {
          return e3.toLocaleString();
        }, to: function(e3) {
          return Number(Number(e3).toFixed(h2)).toLocaleString();
        } }, i2 = function(e3, t3, n3, r3) {
          var e3 = e3.state, i3 = t3.min, t3 = t3.max, a2 = j(e3.getNumericRefinement(u2, ">=") || [], 1)[0], s2 = j(e3.getNumericRefinement(u2, "<=") || [], 1)[0], o3 = void 0 === n3 || "" === n3, c3 = void 0 === r3 || "" === r3, n3 = wn({ min: o3 ? void 0 : parseFloat(n3), max: c3 ? void 0 : parseFloat(r3), precision: h2 }), r3 = n3.min, n3 = n3.max, o3 = b(l2) || i3 !== r3 ? b(l2) && o3 ? l2 : r3 : void 0, r3 = b(d2) || t3 !== n3 ? b(d2) && c3 ? d2 : n3 : void 0, c3 = void 0 === o3, n3 = b(i3) && i3 <= o3, c3 = c3 || b(o3) && (!b(i3) || n3), i3 = void 0 === r3, n3 = b(r3) && r3 <= t3, i3 = i3 || b(r3) && (!b(t3) || n3);
          return (a2 !== o3 || s2 !== r3) && c3 && i3 ? (e3 = e3.removeNumericRefinement(u2), b(o3) && (e3 = e3.addNumericRefinement(u2, ">=", o3)), (e3 = b(r3) ? e3.addNumericRefinement(u2, "<=", r3) : e3).resetPage()) : null;
        };
        function f2(n3, r3) {
          return function() {
            var e3 = j(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [void 0, void 0], 2), t3 = e3[0], e3 = e3[1], t3 = i2(n3, r3, t3, e3);
            t3 && n3.setState(t3).search();
          };
        }
        return { $$type: "ais.range", init: function(e3) {
          n2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: e3.instantSearchInstance }), true);
        }, render: function(e3) {
          n2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: e3.instantSearchInstance }), false);
        }, getRenderState: function(e3, t3) {
          return T(T({}, e3), {}, { range: T(T({}, e3.range), {}, E({}, u2, this.getWidgetRenderState(t3))) });
        }, getWidgetRenderState: function(e3) {
          var t3, n3 = e3.results, r3 = e3.helper, e3 = e3.instantSearchInstance, i3 = _e(n3 && n3.disjunctiveFacets || [], function(e4) {
            return e4.name === u2;
          }), i3 = i3 && i3.stats || { min: void 0, max: void 0 }, a2 = (i3 = i3, a2 = b(l2) ? l2 : b(i3.min) ? i3.min : 0, i3 = b(d2) ? d2 : b(i3.max) ? i3.max : 0, wn({ min: a2, max: i3, precision: h2 })), s2 = (s2 = j((i3 = r3).getNumericRefinement(u2, ">=") || [], 1)[0], i3 = j(i3.getNumericRefinement(u2, "<=") || [], 1)[0], [b(s2) ? s2 : -1 / 0, b(i3) ? i3 : 1 / 0]), i3 = f2(r3, n3 ? a2 : { min: void 0, max: void 0 });
          return { refine: i3, canRefine: a2.min !== a2.max, format: c2, range: a2, sendEvent: (t3 = e3, function() {
            1 === arguments.length && t3.sendEventToInsights(arguments.length <= 0 ? void 0 : arguments[0]);
          }), widgetParams: T(T({}, o2), {}, { precision: h2 }), start: s2 };
        }, dispose: function(e3) {
          e3 = e3.state;
          return r2(), e3.removeDisjunctiveFacet(u2).removeNumericRefinement(u2);
        }, getWidgetUiState: function(e3, t3) {
          var t3 = t3.searchParameters.getNumericRefinements(u2), n3 = t3[">="], n3 = void 0 === n3 ? [] : n3, t3 = t3["<="], t3 = void 0 === t3 ? [] : t3;
          return 0 === n3.length && 0 === t3.length ? e3 : T(T({}, e3), {}, { range: T(T({}, e3.range), {}, E({}, u2, "".concat(n3, ":").concat(t3))) });
        }, getWidgetSearchParameters: function(e3, t3) {
          var n3, t3 = t3.uiState, e3 = e3.addDisjunctiveFacet(u2).setQueryParameters({ numericRefinements: T(T({}, e3.numericRefinements), {}, E({}, u2, {})) }), t3 = (b(l2) && (e3 = e3.addNumericRefinement(u2, ">=", l2)), b(d2) && (e3 = e3.addNumericRefinement(u2, "<=", d2)), t3.range && t3.range[u2]);
          return e3 = t3 && -1 !== t3.indexOf(":") && (n3 = (t3 = j(t3.split(":").map(parseFloat), 2))[0], t3 = t3[1], b(n3) && (!b(l2) || l2 < n3) && (e3 = (e3 = e3.removeNumericRefinement(u2, ">=")).addNumericRefinement(u2, ">=", n3)), b(t3)) && (!b(d2) || t3 < d2) ? (e3 = e3.removeNumericRefinement(u2, "<=")).addNumericRefinement(u2, "<=", t3) : e3;
        } };
      };
    }
    function Nn(c2) {
      var n2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(c2, Fn()), function(h2) {
        var e2 = h2 || {}, f2 = e2.attribute, t2 = e2.operator, i2 = void 0 === t2 ? "or" : t2, t2 = e2.limit, m2 = void 0 === t2 ? 10 : t2, t2 = e2.showMore, p2 = void 0 !== t2 && t2, t2 = e2.showMoreLimit, a2 = void 0 === t2 ? 20 : t2, t2 = e2.sortBy, g2 = void 0 === t2 ? Cn : t2, t2 = e2.escapeFacetValues, o2 = void 0 === t2 || t2, t2 = e2.transformItems, v2 = void 0 === t2 ? function(e3) {
          return e3;
        } : t2;
        if (!f2) throw new Error(Fn("The `attribute` option is required."));
        if (!/^(and|or)$/.test(i2)) throw new Error(Fn('The `operator` must one of: `"and"`, `"or"` (got "'.concat(i2, '").')));
        if (true === p2 && a2 <= m2) throw new Error(Fn("`showMoreLimit` should be greater than `limit`."));
        function y2(e3) {
          var t3 = e3.name, n3 = e3.escapedValue;
          return T(T({}, k(e3, xn)), {}, { value: n3, label: t3, highlighted: t3 });
        }
        var b2, R2, S2, _2 = [], w2 = true, P2 = false, N2 = function() {
        };
        function x2() {
          N2();
        }
        function I2() {
          return P2 ? a2 : m2;
        }
        function F2(a3, s2) {
          return function(i3) {
            return function(e3) {
              var t3, n3 = i3.instantSearchInstance, r2 = i3.results;
              "" === e3 && _2 ? c2(T(T({}, s2.getWidgetRenderState(T(T({}, i3), {}, { results: b2 }))), {}, { instantSearchInstance: n3 }), false) : (t3 = { highlightPreTag: (o2 ? ae : u).highlightPreTag, highlightPostTag: (o2 ? ae : u).highlightPostTag }, a3.searchForFacetValues(f2, e3, Math.min(I2(), 100), t3).then(function(e4) {
                e4 = o2 ? e4.facetHits.map(function(e5) {
                  return T(T({}, e5), {}, { highlighted: se(e5.highlighted) });
                }) : e4.facetHits, e4 = v2(e4.map(function(e5) {
                  var t4 = e5.escapedValue, n4 = e5.value;
                  return T(T({}, k(e5, In)), {}, { value: t4, label: n4 });
                }), { results: r2 });
                c2(T(T({}, s2.getWidgetRenderState(T(T({}, i3), {}, { results: b2 }))), {}, { items: e4, canToggleShowMore: false, canRefine: true, isFromSearch: true, instantSearchInstance: n3 }), false);
              }));
            };
          };
        }
        var C2 = function() {
          return function() {
          };
        };
        return { $$type: "ais.refinementList", init: function(e3) {
          c2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: e3.instantSearchInstance }), true);
        }, render: function(e3) {
          c2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: e3.instantSearchInstance }), false);
        }, getRenderState: function(e3, t3) {
          return T(T({}, e3), {}, { refinementList: T(T({}, e3.refinementList), {}, E({}, f2, this.getWidgetRenderState(t3))) });
        }, getWidgetRenderState: function(e3) {
          var t3, n3, r2 = this, i3 = e3.results, a3 = e3.state, s2 = e3.createURL, o3 = e3.instantSearchInstance, c3 = e3.helper, u2 = [], l2 = [], o3 = (S2 && R2 && C2 || (S2 = le({ instantSearchInstance: o3, helper: c3, attribute: f2, widgetType: this.$$type }), R2 = function(e4) {
            S2("click:internal", e4), c3.toggleFacetRefinement(f2, e4).search();
          }, C2 = F2(c3, this)), i3 && (l2 = (o3 = i3.getFacetValues(f2, { sortBy: g2, facetOrdering: g2 === Cn })) && Array.isArray(o3) ? o3 : [], u2 = v2(l2.slice(0, I2()).map(y2), { results: i3 }), o3 = a3.maxValuesPerFacet, d2 = I2(), w2 = d2 < o3 ? l2.length <= d2 : l2.length < d2, b2 = i3, _2 = u2, e3.results) && (t3 = e3, n3 = this, N2 = function() {
            P2 = !P2, n3.render(t3);
          }), C2 && C2(e3)), l2 = P2 && _2.length > m2, d2 = p2 && !w2;
          return { createURL: function(t4) {
            return s2(function(e4) {
              return r2.getWidgetUiState(e4, { searchParameters: a3.resetPage().toggleFacetRefinement(f2, t4), helper: c3 });
            });
          }, items: u2, refine: R2, searchForItems: o3, isFromSearch: false, canRefine: 0 < u2.length, widgetParams: h2, isShowingMore: P2, canToggleShowMore: l2 || d2, toggleShowMore: x2, sendEvent: S2, hasExhaustiveItems: w2 };
        }, dispose: function(e3) {
          e3 = e3.state, n2(), e3 = e3.setQueryParameter("maxValuesPerFacet", void 0);
          return "and" === i2 ? e3.removeFacet(f2) : e3.removeDisjunctiveFacet(f2);
        }, getWidgetUiState: function(e3, t3) {
          var t3 = t3.searchParameters, t3 = "or" === i2 ? t3.getDisjunctiveRefinements(f2) : t3.getConjunctiveRefinements(f2);
          return e3 = T(T({}, e3), {}, { refinementList: T(T({}, e3.refinementList), {}, E({}, f2, t3)) }), t3 = f2, e3.refinementList && (e3.refinementList[t3] && 0 !== e3.refinementList[t3].length || delete e3.refinementList[t3], 0 === Object.keys(e3.refinementList).length) && delete e3.refinementList, e3;
        }, getWidgetSearchParameters: function(e3, t3) {
          var n3, t3 = t3.uiState, r2 = "or" === i2;
          return e3.isHierarchicalFacet(f2) || r2 && e3.isConjunctiveFacet(f2) || !r2 && e3.isDisjunctiveFacet(f2) ? e3 : (t3 = t3.refinementList && t3.refinementList[f2], n3 = (e3 = r2 ? e3.addDisjunctiveFacet(f2).removeDisjunctiveFacetRefinement(f2) : e3.addFacet(f2).removeFacetRefinement(f2)).maxValuesPerFacet || 0, n3 = Math.max(n3, p2 ? a2 : m2), e3 = e3.setQueryParameter("maxValuesPerFacet", n3), t3 ? t3.reduce(function(e4, t4) {
            return r2 ? e4.addDisjunctiveFacetRefinement(f2, t4) : e4.addFacetRefinement(f2, t4);
          }, e3) : e3.setQueryParameters(E({}, n3 = r2 ? "disjunctiveFacetsRefinements" : "facetsRefinements", T(T({}, e3[n3]), {}, E({}, f2, [])))));
        } };
      };
    }
    var xn = ["name", "escapedValue"], In = ["escapedValue", "value"], Fn = l({ name: "refinement-list", connector: true }), Cn = ["isRefined", "count:desc", "name:asc"];
    function Tn(e2, t2) {
      return t2(e2);
    }
    function En(n2) {
      var t2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(n2, Mn()), function(r2) {
        var i2, a2, e2 = (r2 || {}).queryHook, s2 = void 0 === e2 ? Tn : e2;
        return { $$type: "ais.searchBox", init: function(e3) {
          var t3 = e3.instantSearchInstance;
          n2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t3 }), true);
        }, render: function(e3) {
          var t3 = e3.instantSearchInstance;
          n2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t3 }), false);
        }, dispose: function(e3) {
          e3 = e3.state;
          return t2(), e3.setQueryParameter("query", void 0);
        }, getRenderState: function(e3, t3) {
          return T(T({}, e3), {}, { searchBox: this.getWidgetRenderState(t3) });
        }, getWidgetRenderState: function(e3) {
          var t3 = e3.helper, n3 = e3.instantSearchInstance, e3 = e3.state;
          return i2 || (i2 = function(e4) {
            s2(e4, function(e5) {
              return t3.setQuery(e5).search();
            });
          }, a2 = function() {
            t3.setQuery("").search();
          }), { query: e3.query || "", refine: i2, clear: a2, widgetParams: r2, isSearchStalled: "stalled" === n3.status };
        }, getWidgetUiState: function(e3, t3) {
          t3 = t3.searchParameters.query || "";
          return "" === t3 || e3 && e3.query === t3 ? e3 : T(T({}, e3), {}, { query: t3 });
        }, getWidgetSearchParameters: function(e3, t3) {
          t3 = t3.uiState;
          return e3.setQueryParameter("query", t3.query || "");
        } };
      };
    }
    function kn(r2) {
      var t2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R, o2 = (h(r2, Ln()), {});
      return function(i2) {
        var e2 = i2 || {}, a2 = e2.items, e2 = e2.transformItems, s2 = void 0 === e2 ? function(e3) {
          return e3;
        } : e2;
        if (Array.isArray(a2)) return { $$type: "ais.sortBy", init: function(e3) {
          var t3 = e3.instantSearchInstance, e3 = this.getWidgetRenderState(e3), n2 = e3.currentRefinement;
          _e(a2, function(e4) {
            return e4.value === n2;
          });
          r2(T(T({}, e3), {}, { instantSearchInstance: t3 }), true);
        }, render: function(e3) {
          var t3 = e3.instantSearchInstance;
          r2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t3 }), false);
        }, dispose: function(e3) {
          e3 = e3.state;
          return t2(), o2.initialIndex ? e3.setIndex(o2.initialIndex) : e3;
        }, getRenderState: function(e3, t3) {
          return T(T({}, e3), {}, { sortBy: this.getWidgetRenderState(t3) });
        }, getWidgetRenderState: function(e3) {
          var t3 = e3.results, n2 = e3.helper, r3 = e3.state, e3 = e3.parent, e3 = (!o2.initialIndex && e3 && (o2.initialIndex = e3.getIndexName()), o2.setIndex || (o2.setIndex = function(e4) {
            n2.setIndex(e4).search();
          }), !t3 || 0 === t3.nbHits);
          return { currentRefinement: r3.index, options: s2(a2, { results: t3 }), refine: o2.setIndex, hasNoResults: e3, canRefine: !e3 && 0 < a2.length, widgetParams: i2 };
        }, getWidgetUiState: function(e3, t3) {
          t3 = t3.searchParameters.index;
          return T(T({}, e3), {}, { sortBy: t3 !== o2.initialIndex ? t3 : void 0 });
        }, getWidgetSearchParameters: function(e3, t3) {
          t3 = t3.uiState;
          return e3.setQueryParameter("index", t3.sortBy || o2.initialIndex || e3.index);
        } };
        throw new Error(Ln("The `items` option expects an array of objects."));
      };
    }
    function jn(n2) {
      var t2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(n2, On()), function(g2) {
        var v2, y2, b2, R2, e2 = g2 || {}, S2 = e2.attribute, e2 = e2.max, _2 = void 0 === e2 ? 5 : e2;
        if (S2) return y2 = function(e3) {
          var t3, e3 = e3.getNumericRefinements(S2);
          if (null != (t3 = e3[">="]) && t3.length) return e3[">="][0];
        }, b2 = function(e3) {
          return (function(e4, t3) {
            v2("click:internal", t3), e4.setState(s2(e4.state, t3)).search();
          }).bind(null, e3);
        }, R2 = function(e3) {
          var n3 = e3.state, r2 = e3.createURL, i2 = e3.getWidgetUiState, a2 = e3.helper;
          return function(t3) {
            return r2(function(e4) {
              return i2(e4, { searchParameters: s2(n3, t3), helper: a2 });
            });
          };
        }, { $$type: Hn, init: function(e3) {
          var t3 = e3.instantSearchInstance;
          n2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t3 }), true);
        }, render: function(e3) {
          var t3 = e3.instantSearchInstance;
          n2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t3 }), false);
        }, getRenderState: function(e3, t3) {
          return T(T({}, e3), {}, { ratingMenu: T(T({}, e3.ratingMenu), {}, E({}, S2, this.getWidgetRenderState(t3))) });
        }, getWidgetRenderState: function(e3) {
          var o2, c2, u2, l2, t3, n3 = e3.helper, r2 = e3.results, i2 = e3.state, a2 = e3.instantSearchInstance, e3 = e3.createURL, s3 = [], d2 = (v2 || (o2 = (a2 = { instantSearchInstance: a2, helper: n3, getRefinedStar: function() {
            return y2(n3.state);
          }, attribute: S2 }).instantSearchInstance, c2 = a2.helper, u2 = a2.getRefinedStar, l2 = a2.attribute, v2 = function() {
            for (var e4, t4, n4, r3, i3 = arguments.length, a3 = new Array(i3), s4 = 0; s4 < i3; s4++) a3[s4] = arguments[s4];
            1 === a3.length ? o2.sendEventToInsights(a3[0]) : (e4 = a3[1], t4 = void 0 === (t4 = a3[2]) ? "Filter Applied" : t4, n4 = (r3 = j(a3[0].split(":"), 2))[0], r3 = r3[1], "click" === n4 && u2() !== Number(e4) && o2.sendEventToInsights({ insightsMethod: "clickedFilters", widgetType: Hn, eventType: n4, eventModifier: r3, payload: { eventName: t4, index: c2.getIndex(), filters: ["".concat(l2, ">=").concat(e4)] }, attribute: l2 }));
          }), false), h2 = 0, f2 = null == r2 ? void 0 : r2.getFacetValues(S2, {});
          if (r2 && f2) {
            f2.length, t3 = 0, f2.forEach(function(e4) {
              e4 = j(e4.name.split("."), 2)[1];
              t3 = Math.max(t3, (void 0 === e4 ? "" : e4).length);
            });
            for (var m2 = y2(i2), p2 = 1; p2 < _2; p2 += 1) (function(n4) {
              var e4 = m2 === n4, t4 = (d2 = d2 || e4, f2.filter(function(e5) {
                return Number(e5.name) >= n4 && Number(e5.name) <= _2;
              }).map(function(e5) {
                return e5.count;
              }).reduce(function(e5, t5) {
                return e5 + t5;
              }, 0));
              if (h2 += t4, m2 && !e4 && 0 === t4) return;
              var r3 = w(new Array(Math.floor(+_2))).map(function(e5, t5) {
                return +t5 < n4;
              });
              s3.push({ stars: r3, name: String(n4), label: String(n4), value: String(n4), count: t4, isRefined: e4 });
            })(p2);
          }
          s3 = s3.reverse(), a2 = !r2 || 0 === r2.nbHits;
          return { items: s3, hasNoResults: a2, canRefine: (!a2 || d2) && 0 < h2, refine: b2(n3), sendEvent: v2, createURL: R2({ state: i2, createURL: e3, helper: n3, getWidgetUiState: this.getWidgetUiState }), widgetParams: g2 };
        }, dispose: function(e3) {
          e3 = e3.state;
          return t2(), e3.removeNumericRefinement(S2);
        }, getWidgetUiState: function(e3, t3) {
          var t3 = t3.searchParameters, t3 = y2(t3);
          return e3 = T(T({}, e3), {}, { ratingMenu: T(T({}, e3.ratingMenu), {}, E({}, S2, "number" == typeof t3 ? t3 : void 0)) }), t3 = S2, e3.ratingMenu && ("number" != typeof e3.ratingMenu[t3] && delete e3.ratingMenu[t3], 0 === Object.keys(e3.ratingMenu).length) && delete e3.ratingMenu, e3;
        }, getWidgetSearchParameters: function(e3, t3) {
          t3 = t3.uiState, t3 = t3.ratingMenu && t3.ratingMenu[S2], e3 = e3.addDisjunctiveFacet(S2).removeNumericRefinement(S2).removeDisjunctiveFacetRefinement(S2);
          return t3 ? e3.addNumericRefinement(S2, "<=", _2).addNumericRefinement(S2, ">=", t3) : e3.setQueryParameters({ numericRefinements: T(T({}, e3.numericRefinements), {}, E({}, S2, {})) });
        } };
        throw new Error(On("The `attribute` option is required."));
        function s2(e3, t3) {
          var n3 = y2(e3) === Number(t3), e3 = e3.resetPage().removeNumericRefinement(S2);
          return n3 ? e3 : e3.addNumericRefinement(S2, "<=", _2).addNumericRefinement(S2, ">=", Number(t3));
        }
      };
    }
    var Mn = l({ name: "search-box", connector: true }), Ln = l({ name: "sort-by", connector: true }), On = l({ name: "rating-menu", connector: true }), Hn = "ais.ratingMenu";
    function An(r2) {
      var e2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(r2, Un()), function(n2) {
        return { $$type: "ais.stats", init: function(e3) {
          var t2 = e3.instantSearchInstance;
          r2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t2 }), true);
        }, render: function(e3) {
          var t2 = e3.instantSearchInstance;
          r2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t2 }), false);
        }, dispose: function() {
          e2();
        }, getRenderState: function(e3, t2) {
          return T(T({}, e3), {}, { stats: this.getWidgetRenderState(t2) });
        }, getWidgetRenderState: function(e3) {
          var t2 = e3.results, e3 = e3.state;
          return t2 ? { hitsPerPage: t2.hitsPerPage, nbHits: t2.nbHits, nbSortedHits: t2.nbSortedHits, areHitsSorted: void 0 !== t2.appliedRelevancyStrictness && 0 < t2.appliedRelevancyStrictness && t2.nbSortedHits !== t2.nbHits, nbPages: t2.nbPages, page: t2.page, processingTimeMS: t2.processingTimeMS, query: t2.query, widgetParams: n2 } : { hitsPerPage: e3.hitsPerPage, nbHits: 0, nbSortedHits: void 0, areHitsSorted: false, nbPages: 0, page: e3.page || 0, processingTimeMS: -1, query: e3.query || "", widgetParams: n2 };
        } };
      };
    }
    function Wn(n2) {
      var r2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(n2, $n()), function(g2) {
        var v2, y2, b2, R2, S2, e2 = g2 || {}, _2 = e2.attribute, t2 = e2.on, e2 = e2.off;
        if (_2) return v2 = void 0 !== e2, y2 = it(void 0 === t2 || t2).map(Se), b2 = v2 ? it(e2).map(Se) : void 0, S2 = function(t3, e3) {
          var n3 = e3.state, r3 = e3.createURL, i2 = e3.getWidgetUiState, a2 = e3.helper;
          return function() {
            n3 = n3.resetPage();
            var e4 = t3 ? y2 : b2, e4 = (e4 && e4.forEach(function(e5) {
              n3 = n3.removeDisjunctiveFacetRefinement(_2, e5);
            }), t3 ? b2 : y2);
            return e4 && e4.forEach(function(e5) {
              n3 = n3.addDisjunctiveFacetRefinement(_2, e5);
            }), r3(function(e5) {
              return i2(e5, { searchParameters: n3, helper: a2 });
            });
          };
        }, { $$type: Bn, init: function(e3) {
          var t3 = e3.instantSearchInstance;
          n2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t3 }), true);
        }, render: function(e3) {
          var t3 = e3.instantSearchInstance;
          n2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t3 }), false);
        }, dispose: function(e3) {
          e3 = e3.state;
          return r2(), e3.removeDisjunctiveFacet(_2);
        }, getRenderState: function(e3, t3) {
          return T(T({}, e3), {}, { toggleRefinement: T(T({}, e3.toggleRefinement), {}, E({}, _2, this.getWidgetRenderState(t3))) });
        }, getWidgetRenderState: function(e3) {
          var n3, t3, o2, c2, u2, l2, r3, i2 = e3.state, a2 = e3.helper, s2 = e3.results, d2 = e3.createURL, e3 = e3.instantSearchInstance, h2 = s2 ? y2.every(function(e4) {
            return i2.isDisjunctiveFacetRefined(_2, e4);
          }) : y2.every(function(e4) {
            return i2.isDisjunctiveFacetRefined(_2, e4);
          }), f2 = { isRefined: h2, count: 0 }, m2 = { isRefined: v2 && !h2, count: 0 }, p2 = (s2 && (p2 = it(b2 || false), n3 = s2.getFacetValues(_2, {}) || [], t3 = y2.map(function(t4) {
            return _e(n3, function(e4) {
              return e4.escapedValue === Se(String(t4));
            });
          }).filter(function(e4) {
            return void 0 !== e4;
          }), p2 = v2 ? p2.map(function(t4) {
            return _e(n3, function(e4) {
              return e4.escapedValue === Se(String(t4));
            });
          }).filter(function(e4) {
            return void 0 !== e4;
          }) : [], f2 = { isRefined: !!t3.length && t3.every(function(e4) {
            return e4.isRefined;
          }), count: t3.reduce(function(e4, t4) {
            return e4 + t4.count;
          }, 0) || null }, m2 = { isRefined: !!p2.length && p2.every(function(e4) {
            return e4.isRefined;
          }), count: p2.reduce(function(e4, t4) {
            return e4 + t4.count;
          }, 0) || n3.reduce(function(e4, t4) {
            return e4 + t4.count;
          }, 0) }), R2 || (o2 = (t3 = { instantSearchInstance: e3, attribute: _2, on: y2, helper: a2 }).instantSearchInstance, c2 = t3.helper, u2 = t3.attribute, l2 = t3.on, R2 = function() {
            for (var e4, t4, n4, r4, i3 = arguments.length, a3 = new Array(i3), s3 = 0; s3 < i3; s3++) a3[s3] = arguments[s3];
            1 === a3.length ? o2.sendEventToInsights(a3[0]) : (e4 = a3[1], t4 = void 0 === (t4 = a3[2]) ? "Filter Applied" : t4, n4 = (r4 = j(a3[0].split(":"), 2))[0], r4 = r4[1], "click" !== n4 || void 0 === l2 || e4 || o2.sendEventToInsights({ insightsMethod: "clickedFilters", widgetType: Bn, eventType: n4, eventModifier: r4, payload: { eventName: t4, index: c2.getIndex(), filters: l2.map(function(e5) {
              return "".concat(u2, ":").concat(e5);
            }) }, attribute: u2 }));
          }), h2 ? m2 : f2);
          return { value: { name: _2, isRefined: h2, count: s2 ? p2.count : null, onFacetValue: f2, offFacetValue: m2 }, createURL: S2(h2, { state: i2, createURL: d2, helper: a2, getWidgetUiState: this.getWidgetUiState }), sendEvent: R2, canRefine: Boolean(s2 ? p2.count : null), refine: (r3 = a2, function() {
            var e4 = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : { isRefined: false }).isRefined;
            e4 ? (y2.forEach(function(e5) {
              return r3.removeDisjunctiveFacetRefinement(_2, e5);
            }), v2 && b2.forEach(function(e5) {
              return r3.addDisjunctiveFacetRefinement(_2, e5);
            })) : (R2("click:internal", e4), v2 && b2.forEach(function(e5) {
              return r3.removeDisjunctiveFacetRefinement(_2, e5);
            }), y2.forEach(function(e5) {
              return r3.addDisjunctiveFacetRefinement(_2, e5);
            })), r3.search();
          }), widgetParams: g2 };
        }, getWidgetUiState: function(e3, t3) {
          var n3 = t3.searchParameters, t3 = y2 && y2.every(function(e4) {
            return n3.isDisjunctiveFacetRefined(_2, e4);
          });
          return t3 ? T(T({}, e3), {}, { toggle: T(T({}, e3.toggle), {}, E({}, _2, t3)) }) : (null != (t3 = e3.toggle) && delete t3[_2], e3);
        }, getWidgetSearchParameters: function(e3, t3) {
          var n3, t3 = t3.uiState;
          return e3.isHierarchicalFacet(_2) || e3.isConjunctiveFacet(_2) ? e3 : (n3 = e3.addDisjunctiveFacet(_2).removeDisjunctiveFacetRefinement(_2), Boolean(t3.toggle && t3.toggle[_2]) ? (y2 && y2.forEach(function(e4) {
            n3 = n3.addDisjunctiveFacetRefinement(_2, e4);
          }), n3) : v2 ? (b2 && b2.forEach(function(e4) {
            n3 = n3.addDisjunctiveFacetRefinement(_2, e4);
          }), n3) : n3.setQueryParameters({ disjunctiveFacetsRefinements: T(T({}, e3.disjunctiveFacetsRefinements), {}, E({}, _2, [])) }));
        } };
        throw new Error($n("The `attribute` option is required."));
      };
    }
    function Dn(u2) {
      var l2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R, d2 = (h(u2, Qn()), {});
      return function(s2) {
        var n2, e2 = s2 || {}, r2 = e2.attributes, t2 = e2.separator, i2 = void 0 === t2 ? " > " : t2, t2 = e2.rootPath, a2 = void 0 === t2 ? null : t2, t2 = e2.transformItems, o2 = void 0 === t2 ? function(e3) {
          return e3;
        } : t2;
        if (r2 && Array.isArray(r2) && 0 !== r2.length) return n2 = j(r2, 1)[0], { $$type: "ais.breadcrumb", init: function(e3) {
          u2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: e3.instantSearchInstance }), true);
        }, render: function(e3) {
          u2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: e3.instantSearchInstance }), false);
        }, dispose: function() {
          l2();
        }, getRenderState: function(e3, t3) {
          return T(T({}, e3), {}, { breadcrumb: T(T({}, e3.breadcrumb), {}, E({}, n2, this.getWidgetRenderState(t3))) });
        }, getWidgetRenderState: function(e3) {
          var n3 = this, r3 = e3.helper, i3 = e3.createURL, t3 = e3.results, e3 = e3.state;
          var a3, e3 = t3 && 0 !== e3.hierarchicalFacets.length ? (e3 = j(e3.hierarchicalFacets, 1)[0].name, e3 = (e3 = t3.getFacetValues(e3, {})) && !Array.isArray(e3) && e3.data ? e3.data : [], o2((a3 = function n4(e4) {
            return e4.reduce(function(e5, t4) {
              return e5 = t4.isRefined && (e5.push({ label: t4.name, value: t4.escapedValue }), Array.isArray(t4.data)) ? e5.concat(n4(t4.data)) : e5;
            }, []);
          }(e3)).map(function(e4, t4) {
            return { label: e4.label, value: t4 + 1 === a3.length ? null : a3[t4 + 1].value };
          }), { results: t3 })) : [];
          return d2.createURL || (d2.createURL = function(t4) {
            return i3(function(e4) {
              return n3.getWidgetUiState(e4, { searchParameters: c2(r3.state, t4), helper: r3 });
            });
          }), d2.refine || (d2.refine = function(e4) {
            r3.setState(c2(r3.state, e4)).search();
          }), { canRefine: 0 < e3.length, createURL: d2.createURL, items: e3, refine: d2.refine, widgetParams: s2 };
        }, getWidgetUiState: function(e3, t3) {
          var t3 = t3.searchParameters.getHierarchicalFacetBreadcrumb(n2);
          return e3 = T(T({}, e3), {}, { hierarchicalMenu: T(T({}, e3.hierarchicalMenu), {}, E({}, n2, t3)) }), t3 = n2, e3.hierarchicalMenu && (e3.hierarchicalMenu[t3] && e3.hierarchicalMenu[t3].length || delete e3.hierarchicalMenu[t3], 0 === Object.keys(e3.hierarchicalMenu).length) && delete e3.hierarchicalMenu, e3;
        }, getWidgetSearchParameters: function(e3, t3) {
          t3 = t3.uiState, t3 = t3.hierarchicalMenu && t3.hierarchicalMenu[n2];
          if (e3.isConjunctiveFacet(n2) || e3.isDisjunctiveFacet(n2)) return e3;
          e3.isHierarchicalFacet(n2) && e3.getHierarchicalFacetByName(n2);
          e3 = e3.removeHierarchicalFacet(n2).addHierarchicalFacet({ name: n2, attributes: r2, separator: i2, rootPath: a2 });
          return t3 ? e3.addHierarchicalFacetRefinement(n2, t3.join(i2)) : e3.setQueryParameters({ hierarchicalFacetsRefinements: T(T({}, e3.hierarchicalFacetsRefinements), {}, E({}, n2, [])) });
        } };
        throw new Error(Qn("The `attributes` option expects an array of strings."));
        function c2(e3, t3) {
          return t3 ? e3.resetPage().toggleFacetRefinement(n2, t3) : 0 === (t3 = e3.getHierarchicalFacetBreadcrumb(n2)).length ? e3 : e3.resetPage().toggleFacetRefinement(n2, t3[0]);
        }
      };
    }
    var Un = l({ name: "stats", connector: true }), $n = l({ name: "toggle-refinement", connector: true }), Bn = "ais.toggleRefinement", Qn = l({ name: "breadcrumb", connector: true });
    var qn = l({ name: "geo-search", connector: true });
    function Vn(e2) {
      return e2.insideBoundingBox || "";
    }
    function Kn(e2, t2) {
      return e2.setQueryParameter("insideBoundingBox", t2);
    }
    function zn(g2) {
      var n2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(g2, qn()), function(o2) {
        function c2(e3) {
          if (e3.aroundLatLng) {
            var e3 = e3.aroundLatLng, t3 = e3.match(we);
            if (t3) return { lat: parseFloat(t3[1]), lng: parseFloat(t3[2]) };
            throw new Error('Invalid value for "aroundLatLng" parameter: "'.concat(e3, '"'));
          }
        }
        function u2() {
          return p2.internalToggleRefineOnMapMove();
        }
        function a2(e3, t3) {
          return function() {
            p2.isRefineOnMapMove = !p2.isRefineOnMapMove, t3(e3);
          };
        }
        function l2() {
          return p2.isRefineOnMapMove;
        }
        function d2() {
          return p2.internalSetMapMoveSinceLastRefine();
        }
        function s2(t3, n3) {
          return function() {
            var e3 = true !== p2.hasMapMoveSinceLastRefine;
            p2.hasMapMoveSinceLastRefine = true, e3 && n3(t3);
          };
        }
        function h2() {
          return p2.hasMapMoveSinceLastRefine;
        }
        var f2, e2 = o2 || {}, t2 = e2.enableRefineOnMapMove, e2 = e2.transformItems, m2 = void 0 === e2 ? function(e3) {
          return e3;
        } : e2, p2 = { isRefineOnMapMove: void 0 === t2 || t2, hasMapMoveSinceLastRefine: false, lastRefinePosition: "", lastRefineBoundingBox: "", internalToggleRefineOnMapMove: R, internalSetMapMoveSinceLastRefine: R };
        return { $$type: Zn, init: function(e3) {
          var t3 = e3.instantSearchInstance;
          p2.internalToggleRefineOnMapMove = a2(e3, R), p2.internalSetMapMoveSinceLastRefine = s2(e3, R), g2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t3 }), true);
        }, render: function(e3) {
          var t3 = e3.helper, n3 = e3.instantSearchInstance, t3 = t3.state, r2 = Boolean(t3.aroundLatLng) && Boolean(p2.lastRefinePosition) && t3.aroundLatLng !== p2.lastRefinePosition, i2 = !t3.insideBoundingBox && Boolean(p2.lastRefineBoundingBox) && t3.insideBoundingBox !== p2.lastRefineBoundingBox, r2 = ((r2 || i2) && (p2.hasMapMoveSinceLastRefine = false), p2.lastRefinePosition = t3.aroundLatLng || "", p2.lastRefineBoundingBox = Vn(t3), p2.internalToggleRefineOnMapMove = a2(e3, this.render.bind(this)), p2.internalSetMapMoveSinceLastRefine = s2(e3, this.render.bind(this)), this.getWidgetRenderState(e3));
          f2("view:internal", r2.items), g2(T(T({}, r2), {}, { instantSearchInstance: n3 }), false);
        }, getWidgetRenderState: function(e3) {
          var t3, n3, r2, i2 = e3.helper, a3 = e3.results, e3 = e3.instantSearchInstance, s3 = i2.state, a3 = a3 ? m2(a3.hits.filter(function(e4) {
            return e4._geoloc;
          }), { results: a3 }) : [];
          return f2 = f2 || me({ instantSearchInstance: e3, getIndex: function() {
            return i2.getIndex();
          }, widgetType: Zn }), { items: a3, position: c2(s3), currentRefinement: (e3 = s3).insideBoundingBox && Pe(e3.insideBoundingBox), refine: function(e4) {
            var t4 = e4.northEast, e4 = e4.southWest, t4 = [t4.lat, t4.lng, e4.lat, e4.lng].join();
            r2.setState(Kn(r2.state, t4).resetPage()).search(), p2.hasMapMoveSinceLastRefine = false, p2.lastRefineBoundingBox = t4;
          }, sendEvent: f2, clearMapRefinement: (n3 = r2 = i2, function() {
            n3.setQueryParameter("insideBoundingBox", void 0).search();
          }), isRefinedWithMap: (t3 = s3, function() {
            return Boolean(t3.insideBoundingBox);
          }), toggleRefineOnMapMove: u2, isRefineOnMapMove: l2, setMapMoveSinceLastRefine: d2, hasMapMoveSinceLastRefine: h2, widgetParams: o2 };
        }, getRenderState: function(e3, t3) {
          return T(T({}, e3), {}, { geoSearch: this.getWidgetRenderState(t3) });
        }, dispose: function(e3) {
          e3 = e3.state;
          return n2(), e3.setQueryParameter("insideBoundingBox", void 0);
        }, getWidgetUiState: function(e3, t3) {
          t3 = Vn(t3.searchParameters);
          return !t3 || e3 && e3.geoSearch && e3.geoSearch.boundingBox === t3 ? e3 : T(T({}, e3), {}, { geoSearch: { boundingBox: t3 } });
        }, getWidgetSearchParameters: function(e3, t3) {
          t3 = t3.uiState;
          return t3 && t3.geoSearch ? Kn(e3, t3.geoSearch.boundingBox) : e3.setQueryParameter("insideBoundingBox", void 0);
        } };
      };
    }
    function Jn(r2) {
      var i2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R, a2 = (h(r2, Yn()), "https://www.algolia.com/?utm_source=instantsearch.js&utm_medium=website&" + "utm_content=".concat(rt(function(e2) {
        return (null == (e2 = e2.window.location) ? void 0 : e2.hostname) || "";
      }, { fallback: function() {
        return "";
      } }), "&") + "utm_campaign=poweredby");
      return function(e2) {
        var t2 = (e2 || {}).url, n2 = void 0 === t2 ? a2 : t2;
        return { $$type: "ais.poweredBy", init: function(e3) {
          var t3 = e3.instantSearchInstance;
          r2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t3 }), true);
        }, render: function(e3) {
          var t3 = e3.instantSearchInstance;
          r2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t3 }), false);
        }, getRenderState: function(e3, t3) {
          return T(T({}, e3), {}, { poweredBy: this.getWidgetRenderState(t3) });
        }, getWidgetRenderState: function() {
          return { url: n2, widgetParams: e2 };
        }, dispose: function() {
          i2();
        } };
      };
    }
    var Zn = "ais.geoSearch", Yn = l({ name: "powered-by", connector: true });
    function n() {
      this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0;
    }
    var Xn = n;
    function Gn(e2) {
      return "function" == typeof e2;
    }
    function er(e2) {
      return "object" == typeof e2 && null !== e2;
    }
    function tr(e2) {
      return void 0 === e2;
    }
    n.prototype._events = void 0, n.prototype._maxListeners = void 0, n.defaultMaxListeners = 10, n.prototype.setMaxListeners = function(e2) {
      if ("number" != typeof e2 || e2 < 0 || isNaN(e2)) throw TypeError("n must be a positive number");
      return this._maxListeners = e2, this;
    }, n.prototype.emit = function(e2) {
      var t2, n2, r2, i2, a2, s2, o2;
      if ((this._events || (this._events = {}), "error" === e2) && (!this._events.error || er(this._events.error) && !this._events.error.length)) throw (o2 = arguments[1]) instanceof Error ? o2 : ((s2 = new Error('Uncaught, unspecified "error" event. (' + o2 + ")")).context = o2, s2);
      if (tr(t2 = this._events[e2])) return false;
      if (Gn(t2)) switch (arguments.length) {
        case 1:
          t2.call(this);
          break;
        case 2:
          t2.call(this, arguments[1]);
          break;
        case 3:
          t2.call(this, arguments[1], arguments[2]);
          break;
        default:
          r2 = Array.prototype.slice.call(arguments, 1), t2.apply(this, r2);
      }
      else if (er(t2)) for (r2 = Array.prototype.slice.call(arguments, 1), n2 = (a2 = t2.slice()).length, i2 = 0; i2 < n2; i2++) a2[i2].apply(this, r2);
      return true;
    }, n.prototype.on = n.prototype.addListener = function(e2, t2) {
      if (Gn(t2)) return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e2, Gn(t2.listener) ? t2.listener : t2), this._events[e2] ? er(this._events[e2]) ? this._events[e2].push(t2) : this._events[e2] = [this._events[e2], t2] : this._events[e2] = t2, er(this._events[e2]) && !this._events[e2].warned && (t2 = tr(this._maxListeners) ? n.defaultMaxListeners : this._maxListeners) && 0 < t2 && this._events[e2].length > t2 && (this._events[e2].warned = true, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e2].length), "function" == typeof console.trace) && console.trace(), this;
      throw TypeError("listener must be a function");
    }, n.prototype.once = function(e2, t2) {
      var n2;
      if (Gn(t2)) return n2 = false, r2.listener = t2, this.on(e2, r2), this;
      throw TypeError("listener must be a function");
      function r2() {
        this.removeListener(e2, r2), n2 || (n2 = true, t2.apply(this, arguments));
      }
    }, n.prototype.removeListener = function(e2, t2) {
      var n2, r2, i2, a2;
      if (!Gn(t2)) throw TypeError("listener must be a function");
      if (this._events && this._events[e2]) {
        if (i2 = (n2 = this._events[e2]).length, r2 = -1, n2 === t2 || Gn(n2.listener) && n2.listener === t2) delete this._events[e2], this._events.removeListener && this.emit("removeListener", e2, t2);
        else if (er(n2)) {
          for (a2 = i2; 0 < a2--; ) if (n2[a2] === t2 || n2[a2].listener && n2[a2].listener === t2) {
            r2 = a2;
            break;
          }
          if (r2 < 0) return this;
          1 === n2.length ? (n2.length = 0, delete this._events[e2]) : n2.splice(r2, 1), this._events.removeListener && this.emit("removeListener", e2, t2);
        }
      }
      return this;
    }, n.prototype.removeAllListeners = function(e2) {
      var t2, n2;
      if (this._events) if (this._events.removeListener) if (0 === arguments.length) {
        for (t2 in this._events) "removeListener" !== t2 && this.removeAllListeners(t2);
        this.removeAllListeners("removeListener"), this._events = {};
      } else {
        if (Gn(n2 = this._events[e2])) this.removeListener(e2, n2);
        else if (n2) for (; n2.length; ) this.removeListener(e2, n2[n2.length - 1]);
        delete this._events[e2];
      }
      else 0 === arguments.length ? this._events = {} : this._events[e2] && delete this._events[e2];
      return this;
    }, n.prototype.listeners = function(e2) {
      e2 = this._events && this._events[e2] ? Gn(this._events[e2]) ? [this._events[e2]] : this._events[e2].slice() : [];
      return e2;
    }, n.prototype.listenerCount = function(e2) {
      if (this._events) {
        e2 = this._events[e2];
        if (Gn(e2)) return 1;
        if (e2) return e2.length;
      }
      return 0;
    }, n.listenerCount = function(e2, t2) {
      return e2.listenerCount(t2);
    };
    var e = function(e2, t2) {
      e2.prototype = Object.create(t2.prototype, { constructor: { value: e2, enumerable: false, writable: true, configurable: true } });
    };
    function nr(e2, t2, n2) {
      this.main = e2, this.fn = t2, this.recommendFn = n2, this.lastResults = null, this.lastRecommendResults = null;
    }
    e(nr, Xn), nr.prototype.detach = function() {
      this.removeAllListeners(), this.main.detachDerivedHelper(this);
    }, nr.prototype.getModifiedState = function(e2) {
      return this.fn(e2);
    }, nr.prototype.getModifiedRecommendState = function(e2) {
      return this.recommendFn(e2);
    };
    var rr = nr;
    var ir = function(e2) {
      return "string" != typeof e2 ? e2 : String(e2).replace(/^-/, "\\-");
    }, ar = function(e2) {
      return "string" != typeof e2 ? e2 : e2.replace(/^\\-/, "-");
    };
    function sr(e2) {
      return "function" == typeof e2 || Array.isArray(e2) || "[object Object]" === Object.prototype.toString.call(e2);
    }
    function or(e2, t2) {
      var n2, r2;
      if (e2 !== t2) for (var i2 in t2) Object.prototype.hasOwnProperty.call(t2, i2) && "__proto__" !== i2 && "constructor" !== i2 && (n2 = t2[i2], void 0 !== (r2 = e2[i2]) && void 0 === n2 || (sr(r2) && sr(n2) ? e2[i2] = or(r2, n2) : e2[i2] = "object" == typeof (r2 = n2) && null !== r2 ? or(Array.isArray(r2) ? [] : {}, r2) : r2));
      return e2;
    }
    var cr = function(e2) {
      sr(e2) || (e2 = {});
      for (var t2 = 1, n2 = arguments.length; t2 < n2; t2++) {
        var r2 = arguments[t2];
        sr(r2) && or(e2, r2);
      }
      return e2;
    };
    var ur = function(e2) {
      return e2 && 0 < Object.keys(e2).length;
    };
    var lr = function(e2, t2) {
      if (null === e2) return {};
      for (var n2, r2 = {}, i2 = Object.keys(e2), a2 = 0; a2 < i2.length; a2++) n2 = i2[a2], 0 <= t2.indexOf(n2) || (r2[n2] = e2[n2]);
      return r2;
    };
    function dr(e2) {
      this.params = (e2 = e2 || {}).params || [];
    }
    dr.prototype = { constructor: dr, addParams: function(t2) {
      var e2 = this.params.slice(), n2 = this.params.findIndex(function(e3) {
        return e3.$$id === t2.$$id;
      });
      return -1 !== n2 ? e2.splice(n2, 1, t2) : e2.push(t2), new dr({ params: e2 });
    }, removeParams: function(t2) {
      return new dr({ params: this.params.filter(function(e2) {
        return e2.$$id !== t2;
      }) });
    }, addFrequentlyBoughtTogether: function(e2) {
      return this.addParams(Object.assign({}, e2, { model: "bought-together" }));
    }, addRelatedProducts: function(e2) {
      return this.addParams(Object.assign({}, e2, { model: "related-products" }));
    }, addTrendingItems: function(e2) {
      return this.addParams(Object.assign({}, e2, { model: "trending-items" }));
    }, addTrendingFacets: function(e2) {
      return this.addParams(Object.assign({}, e2, { model: "trending-facets" }));
    }, addLookingSimilar: function(e2) {
      return this.addParams(Object.assign({}, e2, { model: "looking-similar" }));
    }, _buildQueries: function(t2) {
      return this.params.map(function(e2) {
        e2 = Object.assign({}, e2, { indexName: t2 });
        return delete e2.$$id, e2;
      });
    } };
    var hr = dr;
    function fr(n2) {
      return Object.keys(n2).sort().reduce(function(e2, t2) {
        return e2[t2] = n2[t2], e2;
      }, {});
    }
    function mr() {
      return Array.prototype.slice.call(arguments).reduceRight(function(t2, n2) {
        return Object.keys(Object(n2)).forEach(function(e2) {
          void 0 !== n2[e2] && (void 0 !== t2[e2] && delete t2[e2], t2[e2] = n2[e2]);
        }), t2;
      }, {});
    }
    var d = { _getQueries: function(o2, c2) {
      var u2 = [];
      return u2.push({ indexName: o2, params: d._getHitsSearchParams(c2) }), c2.getRefinedDisjunctiveFacets().forEach(function(e2) {
        u2.push({ indexName: o2, params: d._getDisjunctiveFacetSearchParams(c2, e2) });
      }), c2.getRefinedHierarchicalFacets().forEach(function(e2) {
        var a2, s2 = c2.getHierarchicalFacetByName(e2), e2 = c2.getHierarchicalRefinement(e2), r2 = c2._getHierarchicalFacetSeparator(s2);
        0 < e2.length && 1 < e2[0].split(r2).length && (a2 = e2[0].split(r2).slice(0, -1).reduce(function(e3, t2, n2) {
          return e3.concat({ attribute: s2.attributes[n2], value: 0 === n2 ? t2 : [e3[e3.length - 1].value, t2].join(r2) });
        }, [])).forEach(function(e3, t2) {
          e3 = d._getDisjunctiveFacetSearchParams(c2, e3.attribute, 0 === t2);
          function r3(t3) {
            return s2.attributes.some(function(e4) {
              return e4 === t3.split(":")[0];
            });
          }
          var n2 = (e3.facetFilters || []).reduce(function(e4, t3) {
            var n3;
            return Array.isArray(t3) && 0 < (n3 = t3.filter(function(e5) {
              return !r3(e5);
            })).length && e4.push(n3), "string" != typeof t3 || r3(t3) || e4.push(t3), e4;
          }, []), i2 = a2[t2 - 1];
          e3.facetFilters = 0 < t2 ? n2.concat(i2.attribute + ":" + i2.value) : 0 < n2.length ? n2 : void 0, u2.push({ indexName: o2, params: e3 });
        });
      }), u2;
    }, _getHitsSearchParams: function(e2) {
      var t2 = e2.facets.concat(e2.disjunctiveFacets).concat(d._getHitsHierarchicalFacetsAttributes(e2)).sort(), n2 = d._getFacetFilters(e2), r2 = d._getNumericFilters(e2), i2 = d._getTagFilters(e2), t2 = { facets: -1 < t2.indexOf("*") ? ["*"] : t2, tagFilters: i2 };
      return 0 < n2.length && (t2.facetFilters = n2), 0 < r2.length && (t2.numericFilters = r2), fr(cr({}, e2.getQueryParams(), t2));
    }, _getDisjunctiveFacetSearchParams: function(e2, t2, n2) {
      var r2 = d._getFacetFilters(e2, t2, n2), i2 = d._getNumericFilters(e2, t2), a2 = d._getTagFilters(e2), s2 = { hitsPerPage: 0, page: 0, analytics: false, clickAnalytics: false }, a2 = (0 < a2.length && (s2.tagFilters = a2), e2.getHierarchicalFacetByName(t2));
      return s2.facets = a2 ? d._getDisjunctiveHierarchicalFacetAttribute(e2, a2, n2) : t2, 0 < i2.length && (s2.numericFilters = i2), 0 < r2.length && (s2.facetFilters = r2), fr(cr({}, e2.getQueryParams(), s2));
    }, _getNumericFilters: function(e2, i2) {
      var a2;
      return e2.numericFilters || (a2 = [], Object.keys(e2.numericRefinements).forEach(function(r2) {
        var t2 = e2.numericRefinements[r2] || {};
        Object.keys(t2).forEach(function(n2) {
          var e3 = t2[n2] || [];
          i2 !== r2 && e3.forEach(function(e4) {
            var t3;
            Array.isArray(e4) ? (t3 = e4.map(function(e5) {
              return r2 + n2 + e5;
            }), a2.push(t3)) : a2.push(r2 + n2 + e4);
          });
        });
      }), a2);
    }, _getTagFilters: function(e2) {
      return e2.tagFilters || e2.tagRefinements.join(",");
    }, _getFacetFilters: function(s2, o2, c2) {
      var u2 = [], e2 = s2.facetsRefinements || {}, n2 = (Object.keys(e2).sort().forEach(function(t2) {
        (e2[t2] || []).slice().sort().forEach(function(e3) {
          u2.push(t2 + ":" + e3);
        });
      }), s2.facetsExcludes || {}), r2 = (Object.keys(n2).sort().forEach(function(t2) {
        (n2[t2] || []).sort().forEach(function(e3) {
          u2.push(t2 + ":-" + e3);
        });
      }), s2.disjunctiveFacetsRefinements || {}), l2 = (Object.keys(r2).sort().forEach(function(t2) {
        var n3, e3 = r2[t2] || [];
        t2 !== o2 && e3 && 0 !== e3.length && (n3 = [], e3.slice().sort().forEach(function(e4) {
          n3.push(t2 + ":" + e4);
        }), u2.push(n3));
      }), s2.hierarchicalFacetsRefinements || {});
      return Object.keys(l2).sort().forEach(function(e3) {
        var t2 = (l2[e3] || [])[0];
        if (void 0 !== t2) {
          var n3, r3 = s2.getHierarchicalFacetByName(e3), i2 = s2._getHierarchicalFacetSeparator(r3), a2 = s2._getHierarchicalRootPath(r3);
          if (o2 === e3) {
            if (-1 === t2.indexOf(i2) || !a2 && true === c2 || a2 && a2.split(i2).length === t2.split(i2).length) return;
            t2 = a2 ? (n3 = a2.split(i2).length - 1, a2) : (n3 = t2.split(i2).length - 2, t2.slice(0, t2.lastIndexOf(i2)));
          } else n3 = t2.split(i2).length - 1;
          (e3 = r3.attributes[n3]) && u2.push([e3 + ":" + t2]);
        }
      }), u2;
    }, _getHitsHierarchicalFacetsAttributes: function(i2) {
      return i2.hierarchicalFacets.reduce(function(e2, t2) {
        var n2, r2 = i2.getHierarchicalRefinement(t2.name)[0];
        return r2 ? (n2 = i2._getHierarchicalFacetSeparator(t2), r2 = r2.split(n2).length, n2 = t2.attributes.slice(0, r2 + 1), e2.concat(n2)) : (e2.push(t2.attributes[0]), e2);
      }, []);
    }, _getDisjunctiveHierarchicalFacetAttribute: function(e2, t2, n2) {
      var r2, i2 = e2._getHierarchicalFacetSeparator(t2);
      return true === n2 ? (n2 = 0, (r2 = e2._getHierarchicalRootPath(t2)) && (n2 = r2.split(i2).length), [t2.attributes[n2]]) : (r2 = (e2.getHierarchicalRefinement(t2.name)[0] || "").split(i2).length - 1, t2.attributes.slice(0, 1 + r2));
    }, getSearchForFacetQuery: function(e2, t2, n2, r2) {
      r2 = r2.isDisjunctiveFacet(e2) ? r2.clearRefinements(e2) : r2, t2 = { facetQuery: t2, facetName: e2 };
      return "number" == typeof n2 && (t2.maxFacetHits = n2), fr(cr({}, d._getHitsSearchParams(r2), t2));
    } }, pr = d, p = function(e2, t2) {
      if (Array.isArray(e2)) {
        for (var n2 = 0; n2 < e2.length; n2++) if (t2(e2[n2])) return e2[n2];
      }
    };
    var gr = function(n2, r2) {
      return n2.filter(function(e2, t2) {
        return -1 < r2.indexOf(e2) && n2.indexOf(e2) === t2;
      });
    };
    var vr = function e2(t2) {
      if ("number" == typeof t2) return t2;
      if ("string" == typeof t2) return parseFloat(t2);
      if (Array.isArray(t2)) return t2.map(e2);
      throw new Error("The value should be a number, a parsable string or an array of those.");
    }, yr = { addRefinement: function(e2, t2, n2) {
      var r2;
      return yr.isRefined(e2, t2, n2) ? e2 : (n2 = "" + n2, n2 = e2[t2] ? e2[t2].concat(n2) : [n2], (r2 = {})[t2] = n2, mr({}, r2, e2));
    }, removeRefinement: function(e2, n2, t2) {
      var r2;
      return void 0 === t2 ? yr.clearRefinement(e2, function(e3, t3) {
        return n2 === t3;
      }) : (r2 = "" + t2, yr.clearRefinement(e2, function(e3, t3) {
        return n2 === t3 && r2 === e3;
      }));
    }, toggleRefinement: function(e2, t2, n2) {
      if (void 0 === n2) throw new Error("toggleRefinement should be used with a value");
      return yr.isRefined(e2, t2, n2) ? yr.removeRefinement(e2, t2, n2) : yr.addRefinement(e2, t2, n2);
    }, clearRefinement: function(i2, a2, s2) {
      var o2, e2;
      return void 0 === a2 ? ur(i2) ? {} : i2 : "string" == typeof a2 ? lr(i2, [a2]) : "function" == typeof a2 ? (o2 = false, e2 = Object.keys(i2).reduce(function(e3, t2) {
        var n2 = i2[t2] || [], r2 = n2.filter(function(e4) {
          return !a2(e4, t2, s2);
        });
        return r2.length !== n2.length && (o2 = true), e3[t2] = r2, e3;
      }, {}), o2 ? e2 : i2) : void 0;
    }, isRefined: function(e2, t2, n2) {
      var r2 = Boolean(e2[t2]) && 0 < e2[t2].length;
      return void 0 !== n2 && r2 ? -1 !== e2[t2].indexOf("" + n2) : r2;
    } }, r = yr;
    function br(e2, n2) {
      return Array.isArray(e2) && Array.isArray(n2) ? e2.length === n2.length && e2.every(function(e3, t2) {
        return br(n2[t2], e3);
      }) : e2 === n2;
    }
    function s(e2) {
      var r2 = e2 ? s._parseNumbers(e2) : {}, i2 = (void 0 === r2.userToken || null !== (e2 = r2.userToken) && /^[a-zA-Z0-9_-]{1,64}$/.test(e2) || console.warn("[algoliasearch-helper] The `userToken` parameter is invalid. This can lead to wrong analytics.\n  - Format: [a-zA-Z0-9_-]{1,64}"), this.facets = r2.facets || [], this.disjunctiveFacets = r2.disjunctiveFacets || [], this.hierarchicalFacets = r2.hierarchicalFacets || [], this.facetsRefinements = r2.facetsRefinements || {}, this.facetsExcludes = r2.facetsExcludes || {}, this.disjunctiveFacetsRefinements = r2.disjunctiveFacetsRefinements || {}, this.numericRefinements = r2.numericRefinements || {}, this.tagRefinements = r2.tagRefinements || [], this.hierarchicalFacetsRefinements = r2.hierarchicalFacetsRefinements || {}, this);
      Object.keys(r2).forEach(function(e3) {
        var t2 = -1 !== s.PARAMETERS.indexOf(e3), n2 = void 0 !== r2[e3];
        !t2 && n2 && (i2[e3] = r2[e3]);
      });
    }
    s.PARAMETERS = Object.keys(new s()), s._parseNumbers = function(i2) {
      var r2, a2;
      return i2 instanceof s ? i2 : (r2 = {}, ["aroundPrecision", "aroundRadius", "getRankingInfo", "minWordSizefor2Typos", "minWordSizefor1Typo", "page", "maxValuesPerFacet", "distinct", "minimumAroundRadius", "hitsPerPage", "minProximity"].forEach(function(e2) {
        var t2, n2 = i2[e2];
        "string" == typeof n2 && (t2 = parseFloat(n2), r2[e2] = isNaN(t2) ? n2 : t2);
      }), Array.isArray(i2.insideBoundingBox) && (r2.insideBoundingBox = i2.insideBoundingBox.map(function(e2) {
        return Array.isArray(e2) ? e2.map(function(e3) {
          return parseFloat(e3);
        }) : e2;
      })), i2.numericRefinements && (a2 = {}, Object.keys(i2.numericRefinements).forEach(function(n2) {
        var r3 = i2.numericRefinements[n2] || {};
        a2[n2] = {}, Object.keys(r3).forEach(function(e2) {
          var t2 = r3[e2].map(function(e3) {
            return Array.isArray(e3) ? e3.map(function(e4) {
              return "string" == typeof e4 ? parseFloat(e4) : e4;
            }) : "string" == typeof e3 ? parseFloat(e3) : e3;
          });
          a2[n2][e2] = t2;
        });
      }), r2.numericRefinements = a2), cr(i2, r2));
    }, s.make = function(e2) {
      var n2 = new s(e2);
      return (e2.hierarchicalFacets || []).forEach(function(e3) {
        var t2;
        e3.rootPath && 0 === (t2 = (n2 = 0 < (t2 = n2.getHierarchicalRefinement(e3.name)).length && 0 !== t2[0].indexOf(e3.rootPath) ? n2.clearRefinements(e3.name) : n2).getHierarchicalRefinement(e3.name)).length && (n2 = n2.toggleHierarchicalFacetRefinement(e3.name, e3.rootPath));
      }), n2;
    }, s.validate = function(e2, t2) {
      t2 = t2 || {};
      return e2.tagFilters && t2.tagRefinements && 0 < t2.tagRefinements.length ? new Error("[Tags] Cannot switch from the managed tag API to the advanced API. It is probably an error, if it is really what you want, you should first clear the tags with clearTags method.") : 0 < e2.tagRefinements.length && t2.tagFilters ? new Error("[Tags] Cannot switch from the advanced tag API to the managed API. It is probably an error, if it is not, you should first clear the tags with clearTags method.") : e2.numericFilters && t2.numericRefinements && ur(t2.numericRefinements) ? new Error("[Numeric filters] Can't switch from the advanced to the managed API. It is probably an error, if this is really what you want, you have to first clear the numeric filters.") : ur(e2.numericRefinements) && t2.numericFilters ? new Error("[Numeric filters] Can't switch from the managed API to the advanced. It is probably an error, if this is really what you want, you have to first clear the numeric filters.") : null;
    }, s.prototype = { constructor: s, clearRefinements: function(e2) {
      e2 = { numericRefinements: this._clearNumericRefinements(e2), facetsRefinements: r.clearRefinement(this.facetsRefinements, e2, "conjunctiveFacet"), facetsExcludes: r.clearRefinement(this.facetsExcludes, e2, "exclude"), disjunctiveFacetsRefinements: r.clearRefinement(this.disjunctiveFacetsRefinements, e2, "disjunctiveFacet"), hierarchicalFacetsRefinements: r.clearRefinement(this.hierarchicalFacetsRefinements, e2, "hierarchicalFacet") };
      return e2.numericRefinements === this.numericRefinements && e2.facetsRefinements === this.facetsRefinements && e2.facetsExcludes === this.facetsExcludes && e2.disjunctiveFacetsRefinements === this.disjunctiveFacetsRefinements && e2.hierarchicalFacetsRefinements === this.hierarchicalFacetsRefinements ? this : this.setQueryParameters(e2);
    }, clearTags: function() {
      return void 0 === this.tagFilters && 0 === this.tagRefinements.length ? this : this.setQueryParameters({ tagFilters: void 0, tagRefinements: [] });
    }, setIndex: function(e2) {
      return e2 === this.index ? this : this.setQueryParameters({ index: e2 });
    }, setQuery: function(e2) {
      return e2 === this.query ? this : this.setQueryParameters({ query: e2 });
    }, setPage: function(e2) {
      return e2 === this.page ? this : this.setQueryParameters({ page: e2 });
    }, setFacets: function(e2) {
      return this.setQueryParameters({ facets: e2 });
    }, setDisjunctiveFacets: function(e2) {
      return this.setQueryParameters({ disjunctiveFacets: e2 });
    }, setHitsPerPage: function(e2) {
      return this.hitsPerPage === e2 ? this : this.setQueryParameters({ hitsPerPage: e2 });
    }, setTypoTolerance: function(e2) {
      return this.typoTolerance === e2 ? this : this.setQueryParameters({ typoTolerance: e2 });
    }, addNumericRefinement: function(e2, t2, n2) {
      var r2, n2 = vr(n2);
      return this.isNumericRefined(e2, t2, n2) ? this : ((r2 = cr({}, this.numericRefinements))[e2] = cr({}, r2[e2]), r2[e2][t2] ? (r2[e2][t2] = r2[e2][t2].slice(), r2[e2][t2].push(n2)) : r2[e2][t2] = [n2], this.setQueryParameters({ numericRefinements: r2 }));
    }, getConjunctiveRefinements: function(e2) {
      return this.isConjunctiveFacet(e2) && this.facetsRefinements[e2] || [];
    }, getDisjunctiveRefinements: function(e2) {
      return this.isDisjunctiveFacet(e2) && this.disjunctiveFacetsRefinements[e2] || [];
    }, getHierarchicalRefinement: function(e2) {
      return this.hierarchicalFacetsRefinements[e2] || [];
    }, getExcludeRefinements: function(e2) {
      return this.isConjunctiveFacet(e2) && this.facetsExcludes[e2] || [];
    }, removeNumericRefinement: function(n2, r2, e2) {
      var i2 = e2;
      return void 0 !== i2 ? this.isNumericRefined(n2, r2, i2) ? this.setQueryParameters({ numericRefinements: this._clearNumericRefinements(function(e3, t2) {
        return t2 === n2 && e3.op === r2 && br(e3.val, vr(i2));
      }) }) : this : void 0 !== r2 ? this.isNumericRefined(n2, r2) ? this.setQueryParameters({ numericRefinements: this._clearNumericRefinements(function(e3, t2) {
        return t2 === n2 && e3.op === r2;
      }) }) : this : this.isNumericRefined(n2) ? this.setQueryParameters({ numericRefinements: this._clearNumericRefinements(function(e3, t2) {
        return t2 === n2;
      }) }) : this;
    }, getNumericRefinements: function(e2) {
      return this.numericRefinements[e2] || {};
    }, getNumericRefinement: function(e2, t2) {
      return this.numericRefinements[e2] && this.numericRefinements[e2][t2];
    }, _clearNumericRefinements: function(s2) {
      var o2, t2, e2;
      return void 0 === s2 ? ur(this.numericRefinements) ? {} : this.numericRefinements : "string" == typeof s2 ? lr(this.numericRefinements, [s2]) : "function" == typeof s2 ? (o2 = false, t2 = this.numericRefinements, e2 = Object.keys(t2).reduce(function(e3, r2) {
        var i2 = t2[r2], a2 = {}, i2 = i2 || {};
        return Object.keys(i2).forEach(function(t3) {
          var e4 = i2[t3] || [], n2 = [];
          e4.forEach(function(e5) {
            s2({ val: e5, op: t3 }, r2, "numeric") || n2.push(e5);
          }), n2.length !== e4.length && (o2 = true), a2[t3] = n2;
        }), e3[r2] = a2, e3;
      }, {}), o2 ? e2 : this.numericRefinements) : void 0;
    }, addFacet: function(e2) {
      return this.isConjunctiveFacet(e2) ? this : this.setQueryParameters({ facets: this.facets.concat([e2]) });
    }, addDisjunctiveFacet: function(e2) {
      return this.isDisjunctiveFacet(e2) ? this : this.setQueryParameters({ disjunctiveFacets: this.disjunctiveFacets.concat([e2]) });
    }, addHierarchicalFacet: function(e2) {
      if (this.isHierarchicalFacet(e2.name)) throw new Error("Cannot declare two hierarchical facets with the same name: `" + e2.name + "`");
      return this.setQueryParameters({ hierarchicalFacets: this.hierarchicalFacets.concat([e2]) });
    }, addFacetRefinement: function(e2, t2) {
      if (this.isConjunctiveFacet(e2)) return r.isRefined(this.facetsRefinements, e2, t2) ? this : this.setQueryParameters({ facetsRefinements: r.addRefinement(this.facetsRefinements, e2, t2) });
      throw new Error(e2 + " is not defined in the facets attribute of the helper configuration");
    }, addExcludeRefinement: function(e2, t2) {
      if (this.isConjunctiveFacet(e2)) return r.isRefined(this.facetsExcludes, e2, t2) ? this : this.setQueryParameters({ facetsExcludes: r.addRefinement(this.facetsExcludes, e2, t2) });
      throw new Error(e2 + " is not defined in the facets attribute of the helper configuration");
    }, addDisjunctiveFacetRefinement: function(e2, t2) {
      if (this.isDisjunctiveFacet(e2)) return r.isRefined(this.disjunctiveFacetsRefinements, e2, t2) ? this : this.setQueryParameters({ disjunctiveFacetsRefinements: r.addRefinement(this.disjunctiveFacetsRefinements, e2, t2) });
      throw new Error(e2 + " is not defined in the disjunctiveFacets attribute of the helper configuration");
    }, addTagRefinement: function(e2) {
      return this.isTagRefined(e2) ? this : (e2 = { tagRefinements: this.tagRefinements.concat(e2) }, this.setQueryParameters(e2));
    }, removeFacet: function(t2) {
      return this.isConjunctiveFacet(t2) ? this.clearRefinements(t2).setQueryParameters({ facets: this.facets.filter(function(e2) {
        return e2 !== t2;
      }) }) : this;
    }, removeDisjunctiveFacet: function(t2) {
      return this.isDisjunctiveFacet(t2) ? this.clearRefinements(t2).setQueryParameters({ disjunctiveFacets: this.disjunctiveFacets.filter(function(e2) {
        return e2 !== t2;
      }) }) : this;
    }, removeHierarchicalFacet: function(t2) {
      return this.isHierarchicalFacet(t2) ? this.clearRefinements(t2).setQueryParameters({ hierarchicalFacets: this.hierarchicalFacets.filter(function(e2) {
        return e2.name !== t2;
      }) }) : this;
    }, removeFacetRefinement: function(e2, t2) {
      if (this.isConjunctiveFacet(e2)) return r.isRefined(this.facetsRefinements, e2, t2) ? this.setQueryParameters({ facetsRefinements: r.removeRefinement(this.facetsRefinements, e2, t2) }) : this;
      throw new Error(e2 + " is not defined in the facets attribute of the helper configuration");
    }, removeExcludeRefinement: function(e2, t2) {
      if (this.isConjunctiveFacet(e2)) return r.isRefined(this.facetsExcludes, e2, t2) ? this.setQueryParameters({ facetsExcludes: r.removeRefinement(this.facetsExcludes, e2, t2) }) : this;
      throw new Error(e2 + " is not defined in the facets attribute of the helper configuration");
    }, removeDisjunctiveFacetRefinement: function(e2, t2) {
      if (this.isDisjunctiveFacet(e2)) return r.isRefined(this.disjunctiveFacetsRefinements, e2, t2) ? this.setQueryParameters({ disjunctiveFacetsRefinements: r.removeRefinement(this.disjunctiveFacetsRefinements, e2, t2) }) : this;
      throw new Error(e2 + " is not defined in the disjunctiveFacets attribute of the helper configuration");
    }, removeTagRefinement: function(t2) {
      var e2;
      return this.isTagRefined(t2) ? (e2 = { tagRefinements: this.tagRefinements.filter(function(e3) {
        return e3 !== t2;
      }) }, this.setQueryParameters(e2)) : this;
    }, toggleRefinement: function(e2, t2) {
      return this.toggleFacetRefinement(e2, t2);
    }, toggleFacetRefinement: function(e2, t2) {
      if (this.isHierarchicalFacet(e2)) return this.toggleHierarchicalFacetRefinement(e2, t2);
      if (this.isConjunctiveFacet(e2)) return this.toggleConjunctiveFacetRefinement(e2, t2);
      if (this.isDisjunctiveFacet(e2)) return this.toggleDisjunctiveFacetRefinement(e2, t2);
      throw new Error("Cannot refine the undeclared facet " + e2 + "; it should be added to the helper options facets, disjunctiveFacets or hierarchicalFacets");
    }, toggleConjunctiveFacetRefinement: function(e2, t2) {
      if (this.isConjunctiveFacet(e2)) return this.setQueryParameters({ facetsRefinements: r.toggleRefinement(this.facetsRefinements, e2, t2) });
      throw new Error(e2 + " is not defined in the facets attribute of the helper configuration");
    }, toggleExcludeFacetRefinement: function(e2, t2) {
      if (this.isConjunctiveFacet(e2)) return this.setQueryParameters({ facetsExcludes: r.toggleRefinement(this.facetsExcludes, e2, t2) });
      throw new Error(e2 + " is not defined in the facets attribute of the helper configuration");
    }, toggleDisjunctiveFacetRefinement: function(e2, t2) {
      if (this.isDisjunctiveFacet(e2)) return this.setQueryParameters({ disjunctiveFacetsRefinements: r.toggleRefinement(this.disjunctiveFacetsRefinements, e2, t2) });
      throw new Error(e2 + " is not defined in the disjunctiveFacets attribute of the helper configuration");
    }, toggleHierarchicalFacetRefinement: function(e2, t2) {
      var n2, r2;
      if (this.isHierarchicalFacet(e2)) return n2 = this._getHierarchicalFacetSeparator(this.getHierarchicalFacetByName(e2)), r2 = {}, void 0 !== this.hierarchicalFacetsRefinements[e2] && 0 < this.hierarchicalFacetsRefinements[e2].length && (this.hierarchicalFacetsRefinements[e2][0] === t2 || 0 === this.hierarchicalFacetsRefinements[e2][0].indexOf(t2 + n2)) ? -1 === t2.indexOf(n2) ? r2[e2] = [] : r2[e2] = [t2.slice(0, t2.lastIndexOf(n2))] : r2[e2] = [t2], this.setQueryParameters({ hierarchicalFacetsRefinements: mr({}, r2, this.hierarchicalFacetsRefinements) });
      throw new Error(e2 + " is not defined in the hierarchicalFacets attribute of the helper configuration");
    }, addHierarchicalFacetRefinement: function(e2, t2) {
      if (this.isHierarchicalFacetRefined(e2)) throw new Error(e2 + " is already refined.");
      var n2;
      if (this.isHierarchicalFacet(e2)) return (n2 = {})[e2] = [t2], this.setQueryParameters({ hierarchicalFacetsRefinements: mr({}, n2, this.hierarchicalFacetsRefinements) });
      throw new Error(e2 + " is not defined in the hierarchicalFacets attribute of the helper configuration.");
    }, removeHierarchicalFacetRefinement: function(e2) {
      var t2;
      return this.isHierarchicalFacetRefined(e2) ? ((t2 = {})[e2] = [], this.setQueryParameters({ hierarchicalFacetsRefinements: mr({}, t2, this.hierarchicalFacetsRefinements) })) : this;
    }, toggleTagRefinement: function(e2) {
      return this.isTagRefined(e2) ? this.removeTagRefinement(e2) : this.addTagRefinement(e2);
    }, isDisjunctiveFacet: function(e2) {
      return -1 < this.disjunctiveFacets.indexOf(e2);
    }, isHierarchicalFacet: function(e2) {
      return void 0 !== this.getHierarchicalFacetByName(e2);
    }, isConjunctiveFacet: function(e2) {
      return -1 < this.facets.indexOf(e2);
    }, isFacetRefined: function(e2, t2) {
      return !!this.isConjunctiveFacet(e2) && r.isRefined(this.facetsRefinements, e2, t2);
    }, isExcludeRefined: function(e2, t2) {
      return !!this.isConjunctiveFacet(e2) && r.isRefined(this.facetsExcludes, e2, t2);
    }, isDisjunctiveFacetRefined: function(e2, t2) {
      return !!this.isDisjunctiveFacet(e2) && r.isRefined(this.disjunctiveFacetsRefinements, e2, t2);
    }, isHierarchicalFacetRefined: function(e2, t2) {
      return !!this.isHierarchicalFacet(e2) && (e2 = this.getHierarchicalRefinement(e2), t2 ? -1 !== e2.indexOf(t2) : 0 < e2.length);
    }, isNumericRefined: function(e2, t2, n2) {
      var r2, i2;
      return void 0 === n2 && void 0 === t2 ? Boolean(this.numericRefinements[e2]) : (r2 = this.numericRefinements[e2] && void 0 !== this.numericRefinements[e2][t2], void 0 !== n2 && r2 ? (n2 = vr(n2), t2 = void 0 !== (e2 = this.numericRefinements[e2][t2], i2 = n2, p(e2, function(e3) {
        return br(e3, i2);
      })), r2 && t2) : r2);
    }, isTagRefined: function(e2) {
      return -1 !== this.tagRefinements.indexOf(e2);
    }, getRefinedDisjunctiveFacets: function() {
      var t2 = this, e2 = gr(Object.keys(this.numericRefinements).filter(function(e3) {
        return 0 < Object.keys(t2.numericRefinements[e3]).length;
      }), this.disjunctiveFacets);
      return Object.keys(this.disjunctiveFacetsRefinements).filter(function(e3) {
        return 0 < t2.disjunctiveFacetsRefinements[e3].length;
      }).concat(e2).concat(this.getRefinedHierarchicalFacets()).sort();
    }, getRefinedHierarchicalFacets: function() {
      var t2 = this;
      return gr(this.hierarchicalFacets.map(function(e2) {
        return e2.name;
      }), Object.keys(this.hierarchicalFacetsRefinements).filter(function(e2) {
        return 0 < t2.hierarchicalFacetsRefinements[e2].length;
      })).sort();
    }, getUnrefinedDisjunctiveFacets: function() {
      var t2 = this.getRefinedDisjunctiveFacets();
      return this.disjunctiveFacets.filter(function(e2) {
        return -1 === t2.indexOf(e2);
      });
    }, managedParameters: ["index", "facets", "disjunctiveFacets", "facetsRefinements", "hierarchicalFacets", "facetsExcludes", "disjunctiveFacetsRefinements", "numericRefinements", "tagRefinements", "hierarchicalFacetsRefinements"], getQueryParams: function() {
      var n2 = this.managedParameters, r2 = {}, i2 = this;
      return Object.keys(this).forEach(function(e2) {
        var t2 = i2[e2];
        -1 === n2.indexOf(e2) && void 0 !== t2 && (r2[e2] = t2);
      }), r2;
    }, setQueryParameter: function(e2, t2) {
      var n2;
      return this[e2] === t2 ? this : ((n2 = {})[e2] = t2, this.setQueryParameters(n2));
    }, setQueryParameters: function(e2) {
      if (!e2) return this;
      var t2 = s.validate(this, e2);
      if (t2) throw t2;
      var n2 = this, i2 = s._parseNumbers(e2), t2 = Object.keys(this).reduce(function(e3, t3) {
        return e3[t3] = n2[t3], e3;
      }, {}), e2 = Object.keys(i2).reduce(function(e3, t3) {
        var n3 = void 0 !== e3[t3], r2 = void 0 !== i2[t3];
        return n3 && !r2 ? lr(e3, [t3]) : (r2 && (e3[t3] = i2[t3]), e3);
      }, t2);
      return new this.constructor(e2);
    }, resetPage: function() {
      return void 0 === this.page ? this : this.setPage(0);
    }, _getHierarchicalFacetSortBy: function(e2) {
      return e2.sortBy || ["isRefined:desc", "name:asc"];
    }, _getHierarchicalFacetSeparator: function(e2) {
      return e2.separator || " > ";
    }, _getHierarchicalRootPath: function(e2) {
      return e2.rootPath || null;
    }, _getHierarchicalShowParentLevel: function(e2) {
      return "boolean" != typeof e2.showParentLevel || e2.showParentLevel;
    }, getHierarchicalFacetByName: function(t2) {
      return p(this.hierarchicalFacets, function(e2) {
        return e2.name === t2;
      });
    }, getHierarchicalFacetBreadcrumb: function(e2) {
      var t2;
      return this.isHierarchicalFacet(e2) && (t2 = this.getHierarchicalRefinement(e2)[0]) ? (e2 = this._getHierarchicalFacetSeparator(this.getHierarchicalFacetByName(e2)), t2.split(e2).map(function(e3) {
        return e3.trim();
      })) : [];
    }, toString: function() {
      return JSON.stringify(this, null, 2);
    } };
    function Rr(e2) {
      return Array.isArray(e2) ? e2.filter(Boolean) : [];
    }
    function Sr(e2, t2) {
      if (Array.isArray(e2)) {
        for (var n2 = 0; n2 < e2.length; n2++) if (t2(e2[n2])) return n2;
      }
      return -1;
    }
    function _r(e2, t2) {
      var r2 = (t2 || []).map(function(e3) {
        return e3.split(":");
      });
      return e2.reduce(function(e3, t3) {
        var n2 = t3.split(":"), t3 = p(r2, function(e4) {
          return e4[0] === n2[0];
        });
        return 1 < n2.length || !t3 ? (e3[0].push(n2[0]), e3[1].push(n2[1])) : (e3[0].push(t3[0]), e3[1].push(t3[1])), e3;
      }, [[], []]);
    }
    var wr = s;
    var Pr = function(e2, n2, i2) {
      return Array.isArray(e2) ? (Array.isArray(i2) || (i2 = []), (e2 = e2.map(function(t2, e3) {
        return { criteria: n2.map(function(e4) {
          return t2[e4];
        }), index: e3, value: t2 };
      })).sort(function(e3, t2) {
        for (var n3 = -1; ++n3 < e3.criteria.length; ) {
          var r2 = function(e4, t3) {
            if (e4 !== t3) {
              var n4 = void 0 !== e4, r3 = null === e4, i3 = void 0 !== t3, a2 = null === t3;
              if (!a2 && t3 < e4 || r3 && i3 || !n4) return 1;
              if (!r3 && e4 < t3 || a2 && n4 || !i3) return -1;
            }
            return 0;
          }(e3.criteria[n3], t2.criteria[n3]);
          if (r2) return !(n3 >= i2.length) && "desc" === i2[n3] ? -r2 : r2;
        }
        return e3.index - t2.index;
      }), e2.map(function(e3) {
        return e3.value;
      })) : [];
    }, Nr = function(m2) {
      return function(e2, t2) {
        function n2(e3, s3, t3) {
          var n3, o3 = e3;
          if (0 < t3) {
            var r3 = 0;
            for (o3 = e3; r3 < t3; ) {
              var i3 = o3 && Array.isArray(o3.data) ? o3.data : [], o3 = p(i3, function(e4) {
                return e4.isRefined;
              });
              r3++;
            }
          }
          return o3 && (n3 = Object.keys(s3.data).map(function(e4) {
            return [e4, s3.data[e4]];
          }).filter(function(e4) {
            var t4, n4, r4, i4, a3, e4 = e4[0];
            return e4 = e4, t4 = o3.path || u2, n4 = d2, r4 = c2, a3 = l2, (!(i4 = u2) || 0 === e4.indexOf(i4) && i4 !== e4) && (!i4 && -1 === e4.indexOf(r4) || i4 && e4.split(r4).length - i4.split(r4).length == 1 || -1 === e4.indexOf(r4) && -1 === n4.indexOf(r4) || 0 === n4.indexOf(e4) || 0 === e4.indexOf(t4 + r4) && (a3 || 0 === e4.indexOf(n4)));
          }), o3.data = Pr(n3.map(function(e4) {
            var t4, n4, r4, i4, a3 = e4[0], e4 = e4[1];
            return e4 = e4, a3 = a3, t4 = c2, n4 = Ir(d2), r4 = s3.exhaustive, { name: (i4 = a3.split(t4))[i4.length - 1].trim(), path: a3, escapedValue: xr(a3), count: e4, isRefined: n4 === a3 || 0 === n4.indexOf(a3 + t4), exhaustive: r4, data: null };
          }), a2[0], a2[1])), e3;
        }
        var a2, c2, u2, l2, d2, r2 = m2.hierarchicalFacets[t2], i2 = m2.hierarchicalFacetsRefinements[r2.name] && m2.hierarchicalFacetsRefinements[r2.name][0] || "", s2 = m2._getHierarchicalFacetSeparator(r2), o2 = m2._getHierarchicalRootPath(r2), h2 = m2._getHierarchicalShowParentLevel(r2), r2 = _r(m2._getHierarchicalFacetSortBy(r2)), f2 = e2.every(function(e3) {
          return e3.exhaustive;
        }), r2 = (a2 = r2, c2 = s2, l2 = h2, d2 = i2, e2);
        return (r2 = (u2 = o2) ? e2.slice(o2.split(s2).length) : r2).reduce(n2, { name: m2.hierarchicalFacets[t2].name, count: null, isRefined: true, path: null, escapedValue: null, exhaustive: f2, data: null });
      };
    }, xr = ir, Ir = ar;
    var Fr = ir, Cr = ar;
    function Tr(e2) {
      var n2 = {};
      return e2.forEach(function(e3, t2) {
        n2[e3] = t2;
      }), n2;
    }
    function Er(e2, t2, n2) {
      t2 && t2[n2] && (e2.stats = t2[n2]);
    }
    function kr(l2, t2, e2) {
      var o2 = t2[0], d2 = (this._rawResults = t2, this), n2 = (Object.keys(o2).forEach(function(e3) {
        d2[e3] = o2[e3];
      }), cr({ persistHierarchicalRootCount: false }, e2)), e2 = (Object.keys(n2).forEach(function(e3) {
        d2[e3] = n2[e3];
      }), this.processingTimeMS = t2.reduce(function(e3, t3) {
        return void 0 === t3.processingTimeMS ? e3 : e3 + t3.processingTimeMS;
      }, 0), this.disjunctiveFacets = [], this.hierarchicalFacets = l2.hierarchicalFacets.map(function() {
        return [];
      }), this.facets = [], l2.getRefinedDisjunctiveFacets()), c2 = Tr(l2.facets), u2 = Tr(l2.disjunctiveFacets), r2 = 1, h2 = o2.facets || {};
      Object.keys(h2).forEach(function(e3) {
        var t3, n3, r3, i2, a2 = h2[e3], s2 = (r3 = l2.hierarchicalFacets, t3 = e3, p(r3, function(e4) {
          return -1 < (e4.attributes || []).indexOf(t3);
        }));
        s2 ? (r3 = s2.attributes.indexOf(e3), n3 = Sr(l2.hierarchicalFacets, function(e4) {
          return e4.name === s2.name;
        }), d2.hierarchicalFacets[n3][r3] = { attribute: e3, data: a2, exhaustive: o2.exhaustiveFacetsCount }) : (n3 = -1 !== l2.disjunctiveFacets.indexOf(e3), r3 = -1 !== l2.facets.indexOf(e3), n3 && (i2 = u2[e3], d2.disjunctiveFacets[i2] = { name: e3, data: a2, exhaustive: o2.exhaustiveFacetsCount }, Er(d2.disjunctiveFacets[i2], o2.facets_stats, e3)), r3 && (i2 = c2[e3], d2.facets[i2] = { name: e3, data: a2, exhaustive: o2.exhaustiveFacetsCount }, Er(d2.facets[i2], o2.facets_stats, e3)));
      }), this.hierarchicalFacets = Rr(this.hierarchicalFacets), e2.forEach(function(e3) {
        var i2 = t2[r2], a2 = i2 && i2.facets ? i2.facets : {}, s2 = l2.getHierarchicalFacetByName(e3);
        Object.keys(a2).forEach(function(t3) {
          var n3, e4, r3 = a2[t3];
          s2 ? (n3 = Sr(l2.hierarchicalFacets, function(e5) {
            return e5.name === s2.name;
          }), -1 !== (e4 = Sr(d2.hierarchicalFacets[n3], function(e5) {
            return e5.attribute === t3;
          })) && (d2.hierarchicalFacets[n3][e4].data = cr({}, d2.hierarchicalFacets[n3][e4].data, r3))) : (n3 = u2[t3], e4 = o2.facets && o2.facets[t3] || {}, d2.disjunctiveFacets[n3] = { name: t3, data: mr({}, r3, e4), exhaustive: i2.exhaustiveFacetsCount }, Er(d2.disjunctiveFacets[n3], i2.facets_stats, t3), l2.disjunctiveFacetsRefinements[t3] && l2.disjunctiveFacetsRefinements[t3].forEach(function(e5) {
            !d2.disjunctiveFacets[n3].data[e5] && -1 < l2.disjunctiveFacetsRefinements[t3].indexOf(Cr(e5)) && (d2.disjunctiveFacets[n3].data[e5] = 0);
          }));
        }), r2++;
      }), l2.getRefinedHierarchicalFacets().forEach(function(e3) {
        var o3 = l2.getHierarchicalFacetByName(e3), c3 = l2._getHierarchicalFacetSeparator(o3), u3 = l2.getHierarchicalRefinement(e3);
        0 === u3.length || u3[0].split(c3).length < 2 || t2.slice(r2).forEach(function(e4) {
          var s2 = e4 && e4.facets ? e4.facets : {};
          Object.keys(s2).forEach(function(t3) {
            var e5, n3, r3 = s2[t3], i2 = Sr(l2.hierarchicalFacets, function(e6) {
              return e6.name === o3.name;
            }), a2 = Sr(d2.hierarchicalFacets[i2], function(e6) {
              return e6.attribute === t3;
            });
            -1 !== a2 && (e5 = {}, 0 < u3.length && !d2.persistHierarchicalRootCount && (e5[n3 = u3[0].split(c3)[0]] = d2.hierarchicalFacets[i2][a2].data[n3]), d2.hierarchicalFacets[i2][a2].data = mr(e5, r3, d2.hierarchicalFacets[i2][a2].data));
          }), r2++;
        });
      }), Object.keys(l2.facetsExcludes).forEach(function(t3) {
        var e3 = l2.facetsExcludes[t3], n3 = c2[t3];
        d2.facets[n3] = { name: t3, data: h2[t3], exhaustive: o2.exhaustiveFacetsCount }, e3.forEach(function(e4) {
          d2.facets[n3] = d2.facets[n3] || { name: t3 }, d2.facets[n3].data = d2.facets[n3].data || {}, d2.facets[n3].data[e4] = 0;
        });
      }), this.hierarchicalFacets = this.hierarchicalFacets.map(Nr(l2)), this.facets = Rr(this.facets), this.disjunctiveFacets = Rr(this.disjunctiveFacets), this._state = l2;
    }
    function jr(n2, r2) {
      function e2(e3) {
        return e3.name === r2;
      }
      var i2, a2, t2, s2, o2, c2;
      return n2._state.isConjunctiveFacet(r2) ? (i2 = p(n2.facets, e2)) ? Object.keys(i2.data).map(function(e3) {
        var t3 = Fr(e3);
        return { name: e3, escapedValue: t3, count: i2.data[e3], isRefined: n2._state.isFacetRefined(r2, t3), isExcluded: n2._state.isExcludeRefined(r2, e3) };
      }) : [] : n2._state.isDisjunctiveFacet(r2) ? (a2 = p(n2.disjunctiveFacets, e2)) ? Object.keys(a2.data).map(function(e3) {
        var t3 = Fr(e3);
        return { name: e3, escapedValue: t3, count: a2.data[e3], isRefined: n2._state.isDisjunctiveFacetRefined(r2, t3) };
      }) : [] : n2._state.isHierarchicalFacet(r2) ? ((t2 = p(n2.hierarchicalFacets, e2)) && (c2 = n2._state.getHierarchicalFacetByName(r2), s2 = n2._state._getHierarchicalFacetSeparator(c2), (c2 = (o2 = 0 === (o2 = Cr(n2._state.getHierarchicalRefinement(r2)[0] || "")).indexOf(c2.rootPath) ? o2.replace(c2.rootPath + s2, "") : o2).split(s2)).unshift(r2), function t3(e3, n3, r3) {
        e3.isRefined = e3.name === (n3[r3] && n3[r3].trim());
        e3.data && e3.data.forEach(function(e4) {
          t3(e4, n3, r3 + 1);
        });
      }(t2, c2, 0)), t2) : void 0;
    }
    function Mr(e2, t2) {
      e2 = p(e2, function(e3) {
        return e3.name === t2;
      });
      return e2 && e2.stats;
    }
    function Lr(e2, t2, n2, r2, i2) {
      var i2 = p(i2, function(e3) {
        return e3.name === n2;
      }), a2 = i2 && i2.data && i2.data[r2] ? i2.data[r2] : 0, i2 = i2 && i2.exhaustive || false;
      return { type: t2, attributeName: n2, name: r2, count: a2, exhaustive: i2 };
    }
    kr.prototype.getFacetByName = function(t2) {
      function e2(e3) {
        return e3.name === t2;
      }
      return p(this.facets, e2) || p(this.disjunctiveFacets, e2) || p(this.hierarchicalFacets, e2);
    }, kr.DEFAULT_SORT = ["isRefined:desc", "count:desc", "name:asc"], kr.prototype.getFacetValues = function(e2, t2) {
      var s2, o2, n2 = jr(this, e2);
      if (n2) return s2 = mr({}, t2, { sortBy: kr.DEFAULT_SORT, facetOrdering: !(t2 && t2.sortBy) }), o2 = this, function t3(n3, e3, r2, i2) {
        var a2;
        return i2 = i2 || 0, Array.isArray(e3) ? n3(e3, r2[i2]) : e3.data && 0 !== e3.data.length ? (a2 = e3.data.map(function(e4) {
          return t3(n3, e4, r2, i2 + 1);
        }), a2 = n3(a2, r2[i2]), mr({ data: a2 }, e3)) : e3;
      }(function(e3, t3) {
        if (s2.facetOrdering) {
          t3 = t3;
          a2 = (a2 = o2).renderingContent && a2.renderingContent.facetOrdering && a2.renderingContent.facetOrdering.values && a2.renderingContent.facetOrdering.values[t3];
          if (a2) return t3 = e3, n3 = [], r2 = [], i2 = ((a2 = a2).order || []).reduce(function(e4, t4, n4) {
            return e4[t4] = n4, e4;
          }, {}), t3.forEach(function(e4) {
            var t4 = e4.path || e4.name;
            void 0 !== i2[t4] ? n3[i2[t4]] = e4 : r2.push(e4);
          }), n3 = n3.filter(function(e4) {
            return e4;
          }), "hidden" === (t3 = a2.sortRemainingBy) ? n3 : n3.concat(Pr(r2, (a2 = "alpha" === t3 ? [["path", "name"], ["asc", "asc"]] : [["count"], ["desc"]])[0], a2[1]));
        }
        var n3, r2, i2, a2;
        if (Array.isArray(s2.sortBy)) return t3 = _r(s2.sortBy, kr.DEFAULT_SORT), Pr(e3, t3[0], t3[1]);
        if ("function" == typeof s2.sortBy) return a2 = s2.sortBy, e3.sort(a2);
        throw new Error("options.sortBy is optional but if defined it must be either an array of string (predicates) or a sorting function");
      }, n2, Array.isArray(n2) ? [e2] : o2._state.getHierarchicalFacetByName(n2.name).attributes);
    }, kr.prototype.getFacetStats = function(e2) {
      return this._state.isConjunctiveFacet(e2) ? Mr(this.facets, e2) : this._state.isDisjunctiveFacet(e2) ? Mr(this.disjunctiveFacets, e2) : void 0;
    }, kr.prototype.getRefinements = function() {
      var s2 = this._state, o2 = this, c2 = [];
      return Object.keys(s2.facetsRefinements).forEach(function(t2) {
        s2.facetsRefinements[t2].forEach(function(e2) {
          c2.push(Lr(0, "facet", t2, e2, o2.facets));
        });
      }), Object.keys(s2.facetsExcludes).forEach(function(t2) {
        s2.facetsExcludes[t2].forEach(function(e2) {
          c2.push(Lr(0, "exclude", t2, e2, o2.facets));
        });
      }), Object.keys(s2.disjunctiveFacetsRefinements).forEach(function(t2) {
        s2.disjunctiveFacetsRefinements[t2].forEach(function(e2) {
          c2.push(Lr(0, "disjunctive", t2, e2, o2.disjunctiveFacets));
        });
      }), Object.keys(s2.hierarchicalFacetsRefinements).forEach(function(a2) {
        s2.hierarchicalFacetsRefinements[a2].forEach(function(e2) {
          var t2, n2, r2, i2;
          c2.push((t2 = s2, n2 = a2, e2 = e2, r2 = o2.hierarchicalFacets, i2 = t2.getHierarchicalFacetByName(n2), t2 = t2._getHierarchicalFacetSeparator(i2), i2 = e2.split(t2), e2 = p(r2, function(e3) {
            return e3.name === n2;
          }), t2 = i2.reduce(function(e3, t3) {
            var n3 = e3 && p(e3.data, function(e4) {
              return e4.name === t3;
            });
            return void 0 !== n3 ? n3 : e3;
          }, e2), r2 = t2 && t2.count || 0, i2 = t2 && t2.exhaustive || false, e2 = t2 && t2.path || "", { type: "hierarchical", attributeName: n2, name: e2, count: r2, exhaustive: i2 }));
        });
      }), Object.keys(s2.numericRefinements).forEach(function(n2) {
        var e2 = s2.numericRefinements[n2];
        Object.keys(e2).forEach(function(t2) {
          e2[t2].forEach(function(e3) {
            c2.push({ type: "numeric", attributeName: n2, name: e3, numericValue: e3, operator: t2 });
          });
        });
      }), s2.tagRefinements.forEach(function(e2) {
        c2.push({ type: "tag", attributeName: "_tags", name: e2 });
      }), c2;
    };
    var Or = kr, ar = "3.19.0", Hr = ir;
    function t(e2, t2, n2, r2) {
      "function" == typeof e2.addAlgoliaAgent && e2.addAlgoliaAgent("JS Helper (3.19.0)"), this.setClient(e2);
      e2 = n2 || {};
      e2.index = t2, this.state = wr.make(e2), this.recommendState = new hr({ params: e2.recommendState }), this.lastResults = null, this.lastRecommendResults = null, this._queryId = 0, this._recommendQueryId = 0, this._lastQueryIdReceived = -1, this._lastRecommendQueryIdReceived = -1, this.derivedHelpers = [], this._currentNbQueries = 0, this._currentNbRecommendQueries = 0, this._searchResultsOptions = r2;
    }
    function Ar(e2) {
      if (e2 < 0) throw new Error("Page requested below 0.");
      return this._change({ state: this.state.setPage(e2), isPageReset: false }), this;
    }
    function Wr() {
      return this.state.page;
    }
    e(t, Xn), t.prototype.search = function() {
      return this._search({ onlyWithDerivedHelpers: false }), this;
    }, t.prototype.searchOnlyWithDerivedHelpers = function() {
      return this._search({ onlyWithDerivedHelpers: true }), this;
    }, t.prototype.recommend = function() {
      return this._recommend(), this;
    }, t.prototype.getQuery = function() {
      var e2 = this.state;
      return pr._getHitsSearchParams(e2);
    }, t.prototype.searchOnce = function(e2, t2) {
      var n2 = e2 ? this.state.setQueryParameters(e2) : this.state, e2 = pr._getQueries(n2.index, n2), r2 = this;
      if (this._currentNbQueries++, this.emit("searchOnce", { state: n2 }), !t2) return this.client.search(e2).then(function(e3) {
        return r2._currentNbQueries--, 0 === r2._currentNbQueries && r2.emit("searchQueueEmpty"), { content: new Or(n2, e3.results), state: n2, _originalResponse: e3 };
      }, function(e3) {
        throw r2._currentNbQueries--, 0 === r2._currentNbQueries && r2.emit("searchQueueEmpty"), e3;
      });
      this.client.search(e2).then(function(e3) {
        r2._currentNbQueries--, 0 === r2._currentNbQueries && r2.emit("searchQueueEmpty"), t2(null, new Or(n2, e3.results), n2);
      }).catch(function(e3) {
        r2._currentNbQueries--, 0 === r2._currentNbQueries && r2.emit("searchQueueEmpty"), t2(e3, null, n2);
      });
    }, t.prototype.findAnswers = function(e2) {
      console.warn("[algoliasearch-helper] answers is no longer supported");
      var t2 = this.state, n2 = this.derivedHelpers[0];
      if (!n2) return Promise.resolve([]);
      var n2 = n2.getModifiedState(t2), t2 = cr({ attributesForPrediction: e2.attributesForPrediction, nbHits: e2.nbHits }, { params: lr(pr._getHitsSearchParams(n2), ["attributesToSnippet", "hitsPerPage", "restrictSearchableAttributes", "snippetEllipsisText"]) }), r2 = "search for answers was called, but this client does not have a function client.initIndex(index).findAnswers";
      if ("function" != typeof this.client.initIndex) throw new Error(r2);
      var i2 = this.client.initIndex(n2.index);
      if ("function" != typeof i2.findAnswers) throw new Error(r2);
      return i2.findAnswers(n2.query, e2.queryLanguages, t2);
    }, t.prototype.searchForFacetValues = function(t2, e2, n2, r2) {
      var i2, a2, s2, o2 = "function" == typeof this.client.searchForFacetValues, c2 = "function" == typeof this.client.initIndex;
      if (o2 || c2 || "function" == typeof this.client.search) return i2 = this.state.setQueryParameters(r2 || {}), a2 = i2.isDisjunctiveFacet(t2), r2 = pr.getSearchForFacetQuery(t2, e2, n2, i2), this._currentNbQueries++, s2 = this, n2 = o2 ? this.client.searchForFacetValues([{ indexName: i2.index, params: r2 }]) : c2 ? this.client.initIndex(i2.index).searchForFacetValues(r2) : (delete r2.facetName, this.client.search([{ type: "facet", facet: t2, indexName: i2.index, params: r2 }]).then(function(e3) {
        return e3.results[0];
      })), this.emit("searchForFacetValues", { state: i2, facet: t2, query: e2 }), n2.then(function(e3) {
        return s2._currentNbQueries--, 0 === s2._currentNbQueries && s2.emit("searchQueueEmpty"), (e3 = Array.isArray(e3) ? e3[0] : e3).facetHits.forEach(function(e4) {
          e4.escapedValue = Hr(e4.value), e4.isRefined = a2 ? i2.isDisjunctiveFacetRefined(t2, e4.escapedValue) : i2.isFacetRefined(t2, e4.escapedValue);
        }), e3;
      }, function(e3) {
        throw s2._currentNbQueries--, 0 === s2._currentNbQueries && s2.emit("searchQueueEmpty"), e3;
      });
      throw new Error("search for facet values (searchable) was called, but this client does not have a function client.searchForFacetValues or client.initIndex(index).searchForFacetValues");
    }, t.prototype.setQuery = function(e2) {
      return this._change({ state: this.state.resetPage().setQuery(e2), isPageReset: true }), this;
    }, t.prototype.clearRefinements = function(e2) {
      return this._change({ state: this.state.resetPage().clearRefinements(e2), isPageReset: true }), this;
    }, t.prototype.clearTags = function() {
      return this._change({ state: this.state.resetPage().clearTags(), isPageReset: true }), this;
    }, t.prototype.addDisjunctiveFacetRefinement = function(e2, t2) {
      return this._change({ state: this.state.resetPage().addDisjunctiveFacetRefinement(e2, t2), isPageReset: true }), this;
    }, t.prototype.addDisjunctiveRefine = function() {
      return this.addDisjunctiveFacetRefinement.apply(this, arguments);
    }, t.prototype.addHierarchicalFacetRefinement = function(e2, t2) {
      return this._change({ state: this.state.resetPage().addHierarchicalFacetRefinement(e2, t2), isPageReset: true }), this;
    }, t.prototype.addNumericRefinement = function(e2, t2, n2) {
      return this._change({ state: this.state.resetPage().addNumericRefinement(e2, t2, n2), isPageReset: true }), this;
    }, t.prototype.addFacetRefinement = function(e2, t2) {
      return this._change({ state: this.state.resetPage().addFacetRefinement(e2, t2), isPageReset: true }), this;
    }, t.prototype.addRefine = function() {
      return this.addFacetRefinement.apply(this, arguments);
    }, t.prototype.addFacetExclusion = function(e2, t2) {
      return this._change({ state: this.state.resetPage().addExcludeRefinement(e2, t2), isPageReset: true }), this;
    }, t.prototype.addExclude = function() {
      return this.addFacetExclusion.apply(this, arguments);
    }, t.prototype.addTag = function(e2) {
      return this._change({ state: this.state.resetPage().addTagRefinement(e2), isPageReset: true }), this;
    }, t.prototype.addFrequentlyBoughtTogether = function(e2) {
      return this._recommendChange({ state: this.recommendState.addFrequentlyBoughtTogether(e2) }), this;
    }, t.prototype.addRelatedProducts = function(e2) {
      return this._recommendChange({ state: this.recommendState.addRelatedProducts(e2) }), this;
    }, t.prototype.addTrendingItems = function(e2) {
      return this._recommendChange({ state: this.recommendState.addTrendingItems(e2) }), this;
    }, t.prototype.addTrendingFacets = function(e2) {
      return this._recommendChange({ state: this.recommendState.addTrendingFacets(e2) }), this;
    }, t.prototype.addLookingSimilar = function(e2) {
      return this._recommendChange({ state: this.recommendState.addLookingSimilar(e2) }), this;
    }, t.prototype.removeNumericRefinement = function(e2, t2, n2) {
      return this._change({ state: this.state.resetPage().removeNumericRefinement(e2, t2, n2), isPageReset: true }), this;
    }, t.prototype.removeDisjunctiveFacetRefinement = function(e2, t2) {
      return this._change({ state: this.state.resetPage().removeDisjunctiveFacetRefinement(e2, t2), isPageReset: true }), this;
    }, t.prototype.removeDisjunctiveRefine = function() {
      return this.removeDisjunctiveFacetRefinement.apply(this, arguments);
    }, t.prototype.removeHierarchicalFacetRefinement = function(e2) {
      return this._change({ state: this.state.resetPage().removeHierarchicalFacetRefinement(e2), isPageReset: true }), this;
    }, t.prototype.removeFacetRefinement = function(e2, t2) {
      return this._change({ state: this.state.resetPage().removeFacetRefinement(e2, t2), isPageReset: true }), this;
    }, t.prototype.removeRefine = function() {
      return this.removeFacetRefinement.apply(this, arguments);
    }, t.prototype.removeFacetExclusion = function(e2, t2) {
      return this._change({ state: this.state.resetPage().removeExcludeRefinement(e2, t2), isPageReset: true }), this;
    }, t.prototype.removeExclude = function() {
      return this.removeFacetExclusion.apply(this, arguments);
    }, t.prototype.removeTag = function(e2) {
      return this._change({ state: this.state.resetPage().removeTagRefinement(e2), isPageReset: true }), this;
    }, t.prototype.removeFrequentlyBoughtTogether = function(e2) {
      return this._recommendChange({ state: this.recommendState.removeParams(e2) }), this;
    }, t.prototype.removeRelatedProducts = function(e2) {
      return this._recommendChange({ state: this.recommendState.removeParams(e2) }), this;
    }, t.prototype.removeTrendingItems = function(e2) {
      return this._recommendChange({ state: this.recommendState.removeParams(e2) }), this;
    }, t.prototype.removeTrendingFacets = function(e2) {
      return this._recommendChange({ state: this.recommendState.removeParams(e2) }), this;
    }, t.prototype.removeLookingSimilar = function(e2) {
      return this._recommendChange({ state: this.recommendState.removeParams(e2) }), this;
    }, t.prototype.toggleFacetExclusion = function(e2, t2) {
      return this._change({ state: this.state.resetPage().toggleExcludeFacetRefinement(e2, t2), isPageReset: true }), this;
    }, t.prototype.toggleExclude = function() {
      return this.toggleFacetExclusion.apply(this, arguments);
    }, t.prototype.toggleRefinement = function(e2, t2) {
      return this.toggleFacetRefinement(e2, t2);
    }, t.prototype.toggleFacetRefinement = function(e2, t2) {
      return this._change({ state: this.state.resetPage().toggleFacetRefinement(e2, t2), isPageReset: true }), this;
    }, t.prototype.toggleRefine = function() {
      return this.toggleFacetRefinement.apply(this, arguments);
    }, t.prototype.toggleTag = function(e2) {
      return this._change({ state: this.state.resetPage().toggleTagRefinement(e2), isPageReset: true }), this;
    }, t.prototype.nextPage = function() {
      var e2 = this.state.page || 0;
      return this.setPage(e2 + 1);
    }, t.prototype.previousPage = function() {
      var e2 = this.state.page || 0;
      return this.setPage(e2 - 1);
    }, t.prototype.setCurrentPage = Ar, t.prototype.setPage = Ar, t.prototype.setIndex = function(e2) {
      return this._change({ state: this.state.resetPage().setIndex(e2), isPageReset: true }), this;
    }, t.prototype.setQueryParameter = function(e2, t2) {
      return this._change({ state: this.state.resetPage().setQueryParameter(e2, t2), isPageReset: true }), this;
    }, t.prototype.setState = function(e2) {
      return this._change({ state: wr.make(e2), isPageReset: false }), this;
    }, t.prototype.overrideStateWithoutTriggeringChangeEvent = function(e2) {
      return this.state = new wr(e2), this;
    }, t.prototype.hasRefinements = function(e2) {
      return !!ur(this.state.getNumericRefinements(e2)) || (this.state.isConjunctiveFacet(e2) ? this.state.isFacetRefined(e2) : this.state.isDisjunctiveFacet(e2) ? this.state.isDisjunctiveFacetRefined(e2) : !!this.state.isHierarchicalFacet(e2) && this.state.isHierarchicalFacetRefined(e2));
    }, t.prototype.isExcluded = function(e2, t2) {
      return this.state.isExcludeRefined(e2, t2);
    }, t.prototype.isDisjunctiveRefined = function(e2, t2) {
      return this.state.isDisjunctiveFacetRefined(e2, t2);
    }, t.prototype.hasTag = function(e2) {
      return this.state.isTagRefined(e2);
    }, t.prototype.isTagRefined = function() {
      return this.hasTagRefinements.apply(this, arguments);
    }, t.prototype.getIndex = function() {
      return this.state.index;
    }, t.prototype.getCurrentPage = Wr, t.prototype.getPage = Wr, t.prototype.getTags = function() {
      return this.state.tagRefinements;
    }, t.prototype.getRefinements = function(e2) {
      var n2 = [], r2 = (this.state.isConjunctiveFacet(e2) ? (this.state.getConjunctiveRefinements(e2).forEach(function(e3) {
        n2.push({ value: e3, type: "conjunctive" });
      }), this.state.getExcludeRefinements(e2).forEach(function(e3) {
        n2.push({ value: e3, type: "exclude" });
      })) : this.state.isDisjunctiveFacet(e2) && this.state.getDisjunctiveRefinements(e2).forEach(function(e3) {
        n2.push({ value: e3, type: "disjunctive" });
      }), this.state.getNumericRefinements(e2));
      return Object.keys(r2).forEach(function(e3) {
        var t2 = r2[e3];
        n2.push({ value: t2, operator: e3, type: "numeric" });
      }), n2;
    }, t.prototype.getNumericRefinement = function(e2, t2) {
      return this.state.getNumericRefinement(e2, t2);
    }, t.prototype.getHierarchicalFacetBreadcrumb = function(e2) {
      return this.state.getHierarchicalFacetBreadcrumb(e2);
    }, t.prototype._search = function(e2) {
      var r2 = this.state, i2 = [], t2 = [], e2 = (e2.onlyWithDerivedHelpers || (t2 = pr._getQueries(r2.index, r2), i2.push({ state: r2, queriesCount: t2.length, helper: this }), this.emit("search", { state: r2, results: this.lastResults })), this.derivedHelpers.map(function(e3) {
        var t3 = e3.getModifiedState(r2), n2 = t3.index ? pr._getQueries(t3.index, t3) : [];
        return i2.push({ state: t3, queriesCount: n2.length, helper: e3 }), e3.emit("search", { state: t3, results: e3.lastResults }), n2;
      })), t2 = Array.prototype.concat.apply(t2, e2), e2 = this._queryId++;
      if (this._currentNbQueries++, !t2.length) return Promise.resolve({ results: [] }).then(this._dispatchAlgoliaResponse.bind(this, i2, e2));
      try {
        this.client.search(t2).then(this._dispatchAlgoliaResponse.bind(this, i2, e2)).catch(this._dispatchAlgoliaError.bind(this, e2));
      } catch (e3) {
        this.emit("error", { error: e3 });
      }
    }, t.prototype._recommend = function() {
      var r2 = this.state, e2 = this.recommendState, t2 = this.getIndex(), i2 = [{ state: e2, index: t2, helper: this }], e2 = (this.emit("fetch", { recommend: { state: e2, results: this.lastRecommendResults } }), this.derivedHelpers.map(function(e3) {
        var t3, n2 = e3.getModifiedState(r2).index;
        return n2 ? (t3 = e3.getModifiedRecommendState(new hr()), i2.push({ state: t3, index: n2, helper: e3 }), e3.emit("fetch", { recommend: { state: t3, results: e3.lastRecommendResults } }), t3._buildQueries(n2)) : [];
      })), t2 = Array.prototype.concat.apply(this.recommendState._buildQueries(t2), e2);
      if (0 !== t2.length) if (0 < t2.length && void 0 === this.client.getRecommendations) console.warn("Please update algoliasearch/lite to the latest version in order to use recommendations widgets.");
      else {
        e2 = this._recommendQueryId++;
        this._currentNbRecommendQueries++;
        try {
          this.client.getRecommendations(t2).then(this._dispatchRecommendResponse.bind(this, e2, i2)).catch(this._dispatchRecommendError.bind(this, e2));
        } catch (e3) {
          this.emit("error", { error: e3 });
        }
      }
    }, t.prototype._dispatchAlgoliaResponse = function(e2, t2, n2) {
      var r2, i2 = this;
      t2 < this._lastQueryIdReceived || (this._currentNbQueries -= t2 - this._lastQueryIdReceived, this._lastQueryIdReceived = t2, 0 === this._currentNbQueries && this.emit("searchQueueEmpty"), r2 = n2.results.slice(), e2.forEach(function(e3) {
        var t3 = e3.state, n3 = e3.queriesCount, e3 = e3.helper, n3 = r2.splice(0, n3);
        t3.index ? (e3.lastResults = new Or(t3, n3, i2._searchResultsOptions), e3.emit("result", { results: e3.lastResults, state: t3 })) : e3.emit("result", { results: null, state: t3 });
      }));
    }, t.prototype._dispatchRecommendResponse = function(e2, t2, n2) {
      var r2;
      e2 < this._lastRecommendQueryIdReceived || (this._currentNbRecommendQueries -= e2 - this._lastRecommendQueryIdReceived, this._lastRecommendQueryIdReceived = e2, 0 === this._currentNbRecommendQueries && this.emit("recommendQueueEmpty"), r2 = n2.results.slice(), t2.forEach(function(e3) {
        var t3 = e3.state, n3 = e3.helper;
        e3.index ? (n3.lastRecommendResults = r2, n3.emit("recommend:result", { recommend: { results: n3.lastRecommendResults, state: t3 } })) : n3.emit("recommend:result", { results: null, state: t3 });
      }));
    }, t.prototype._dispatchAlgoliaError = function(e2, t2) {
      e2 < this._lastQueryIdReceived || (this._currentNbQueries -= e2 - this._lastQueryIdReceived, this._lastQueryIdReceived = e2, this.emit("error", { error: t2 }), 0 === this._currentNbQueries && this.emit("searchQueueEmpty"));
    }, t.prototype._dispatchRecommendError = function(e2, t2) {
      e2 < this._lastRecommendQueryIdReceived || (this._currentNbRecommendQueries -= e2 - this._lastRecommendQueryIdReceived, this._lastRecommendQueryIdReceived = e2, this.emit("error", { error: t2 }), 0 === this._currentNbRecommendQueries && this.emit("recommendQueueEmpty"));
    }, t.prototype.containsRefinement = function(e2, t2, n2, r2) {
      return e2 || 0 !== t2.length || 0 !== n2.length || 0 !== r2.length;
    }, t.prototype._hasDisjunctiveRefinements = function(e2) {
      return this.state.disjunctiveRefinements[e2] && 0 < this.state.disjunctiveRefinements[e2].length;
    }, t.prototype._change = function(e2) {
      var t2 = e2.state, e2 = e2.isPageReset;
      t2 !== this.state && (this.state = t2, this.emit("change", { state: this.state, results: this.lastResults, isPageReset: e2 }));
    }, t.prototype._recommendChange = function(e2) {
      e2 = e2.state;
      e2 !== this.recommendState && (this.recommendState = e2, this.emit("recommend:change", { search: { results: this.lastResults, state: this.state }, recommend: { results: this.lastRecommendResults, state: this.recommendState } }));
    }, t.prototype.clearCache = function() {
      return this.client.clearCache && this.client.clearCache(), this;
    }, t.prototype.setClient = function(e2) {
      return this.client !== e2 && ("function" == typeof e2.addAlgoliaAgent && e2.addAlgoliaAgent("JS Helper (3.19.0)"), this.client = e2), this;
    }, t.prototype.getClient = function() {
      return this.client;
    }, t.prototype.derive = function(e2, t2) {
      e2 = new rr(this, e2, t2);
      return this.derivedHelpers.push(e2), e2;
    }, t.prototype.detachDerivedHelper = function(e2) {
      e2 = this.derivedHelpers.indexOf(e2);
      if (-1 === e2) throw new Error("Derived helper already detached");
      this.derivedHelpers.splice(e2, 1);
    }, t.prototype.hasPendingRequests = function() {
      return 0 < this._currentNbQueries;
    };
    var Dr = t;
    function Ur(e2, t2, n2, r2) {
      return new Dr(e2, t2, n2, r2);
    }
    Ur.version = ar, Ur.AlgoliaSearchHelper = Dr, Ur.SearchParameters = wr, Ur.RecommendParameters = hr, Ur.SearchResults = Or;
    var g = Ur, $r = l({ name: "configure", connector: true });
    function Br(e2, t2) {
      return e2.setQueryParameters(Object.keys(t2.searchParameters).reduce(function(e3, t3) {
        return T(T({}, e3), {}, E({}, t3, void 0));
      }, {}));
    }
    function Qr() {
      var n2 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : R, i2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return function(r2) {
        var t2;
        if (r2 && ie(r2.searchParameters)) return t2 = {}, { $$type: "ais.configure", init: function(e2) {
          var t3 = e2.instantSearchInstance;
          n2(T(T({}, this.getWidgetRenderState(e2)), {}, { instantSearchInstance: t3 }), true);
        }, render: function(e2) {
          var t3 = e2.instantSearchInstance;
          n2(T(T({}, this.getWidgetRenderState(e2)), {}, { instantSearchInstance: t3 }), false);
        }, dispose: function(e2) {
          e2 = e2.state;
          return i2(), Br(e2, r2);
        }, getRenderState: function(e2, t3) {
          t3 = this.getWidgetRenderState(t3);
          return T(T({}, e2), {}, { configure: T(T({}, t3), {}, { widgetParams: T(T({}, t3.widgetParams), {}, { searchParameters: Ye(new g.SearchParameters(null == (e2 = e2.configure) ? void 0 : e2.widgetParams.searchParameters), new g.SearchParameters(t3.widgetParams.searchParameters)).getQueryParams() }) }) });
        }, getWidgetRenderState: function(e2) {
          var n3, e2 = e2.helper;
          return t2.refine || (t2.refine = (n3 = e2, function(e3) {
            var t3 = Br(n3.state, r2), t3 = Ye(t3, new g.SearchParameters(e3));
            r2.searchParameters = e3, n3.setState(t3).search();
          })), { refine: t2.refine, widgetParams: r2 };
        }, getWidgetSearchParameters: function(e2, t3) {
          t3 = t3.uiState;
          return Ye(e2, new g.SearchParameters(T(T({}, t3.configure), r2.searchParameters)));
        }, getWidgetUiState: function(e2) {
          return T(T({}, e2), {}, { configure: T(T({}, e2.configure), r2.searchParameters) });
        } };
        throw new Error($r("The `searchParameters` option expects an object."));
      };
    }
    var qr = l({ name: "configure-related-items", connector: true });
    function Vr(e2) {
      var t2 = e2.attributeName, n2 = e2.attributeValue, e2 = e2.attributeScore;
      return "".concat(t2, ":").concat(n2, "<score=").concat(e2 || 1, ">");
    }
    function Kr(n2, r2) {
      return function(e2) {
        var t2, e2 = e2 || {}, a2 = e2.hit, s2 = e2.matchingPatterns, e2 = e2.transformSearchParameters, e2 = void 0 === e2 ? function(e3) {
          return e3;
        } : e2;
        if (!a2) throw new Error(qr("The `hit` option is required."));
        if (s2) return t2 = Object.keys(s2).reduce(function(e3, t3) {
          var n3 = s2[t3], r3 = Ie(a2, t3), i2 = n3.score;
          return Array.isArray(r3) ? [].concat(w(e3), [r3.map(function(e4) {
            return Vr({ attributeName: t3, attributeValue: e4, attributeScore: i2 });
          })]) : "string" == typeof r3 ? [].concat(w(e3), [Vr({ attributeName: t3, attributeValue: r3, attributeScore: i2 })]) : e3;
        }, []), e2 = T({}, e2(new g.SearchParameters({ sumOrFiltersScores: true, facetFilters: ["objectID:-".concat(a2.objectID)], optionalFilters: t2 }))), T(T({}, Qr(n2, r2)({ searchParameters: e2 })), {}, { $$type: "ais.configureRelatedItems" });
        throw new Error(qr("The `matchingPatterns` option is required."));
      };
    }
    var zr = l({ name: "autocomplete", connector: true }), Jr = l({ name: "query-rules", connector: true });
    function Zr(e2) {
      var i2, a2, s2, t2 = this.helper, n2 = this.initialRuleContexts, r2 = this.trackedFilters, o2 = this.transformRuleContexts, e2 = e2.state, c2 = e2.ruleContexts || [], r2 = (i2 = (r2 = { helper: t2, sharedHelperState: e2, trackedFilters: r2 }).helper, a2 = r2.sharedHelperState, s2 = r2.trackedFilters, Object.keys(s2).reduce(function(e3, t3) {
        var n3 = Ce(i2.lastResults || {}, a2, true).filter(function(e4) {
          return e4.attribute === t3;
        }).map(function(e4) {
          return e4.numericValue || e4.name;
        }), r3 = (0, s2[t3])(n3);
        return [].concat(w(e3), w(n3.filter(function(e4) {
          return r3.includes(e4);
        }).map(function(e4) {
          return "ais-".concat(t3, "-").concat(e4).replace(/[^a-z0-9-_]+/gi, "_");
        })));
      }, [])), o2 = o2([].concat(w(n2), w(r2))).slice(0, 10);
      Oe(c2, o2) || t2.overrideStateWithoutTriggeringChangeEvent(T(T({}, e2), {}, { ruleContexts: o2 }));
    }
    function Yr(l2) {
      var r2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(l2, Jr()), function(i2) {
        var a2, e2 = i2 || {}, t2 = e2.trackedFilters, s2 = void 0 === t2 ? {} : t2, t2 = e2.transformRuleContexts, o2 = void 0 === t2 ? function(e3) {
          return e3;
        } : t2, t2 = e2.transformItems, n2 = void 0 === t2 ? function(e3) {
          return e3;
        } : t2, c2 = (Object.keys(s2).forEach(function(e3) {
          if ("function" != typeof s2[e3]) throw new Error(Jr(`'The "`.concat(e3, '" filter value in the `trackedFilters` option expects a function.')));
        }), 0 < Object.keys(s2).length), u2 = [];
        return { $$type: "ais.queryRules", init: function(e3) {
          var t3 = e3.helper, n3 = e3.state, r3 = e3.instantSearchInstance;
          u2 = n3.ruleContexts || [], a2 = Zr.bind({ helper: t3, initialRuleContexts: u2, trackedFilters: s2, transformRuleContexts: o2 }), c2 && (([n3.disjunctiveFacetsRefinements, n3.facetsRefinements, n3.hierarchicalFacetsRefinements, n3.numericRefinements].some(function(e4) {
            return Boolean(e4 && 0 < Object.keys(e4).length);
          }) || Boolean(i2.transformRuleContexts)) && a2({ state: n3 }), t3.on("change", a2)), l2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: r3 }), true);
        }, render: function(e3) {
          var t3 = e3.instantSearchInstance;
          l2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t3 }), false);
        }, getWidgetRenderState: function(e3) {
          var e3 = e3.results, t3 = (e3 || {}).userData;
          return { items: n2(void 0 === t3 ? [] : t3, { results: e3 }), widgetParams: i2 };
        }, getRenderState: function(e3, t3) {
          return T(T({}, e3), {}, { queryRules: this.getWidgetRenderState(t3) });
        }, dispose: function(e3) {
          var t3 = e3.helper, e3 = e3.state;
          return r2(), c2 ? (t3.removeListener("change", a2), e3.setQueryParameter("ruleContexts", u2)) : e3;
        } };
      };
    }
    function Xr(e2) {
      function t2() {
        d2(u2(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "initial"));
      }
      function n2() {
        r2 && (r2.stop(), r2.removeEventListener("start", h2), r2.removeEventListener("error", f2), r2.removeEventListener("result", m2), r2.removeEventListener("end", p2), r2 = void 0);
      }
      var r2, i2 = e2.searchAsYouSpeak, a2 = e2.language, s2 = e2.onQueryChange, o2 = e2.onStateChange, c2 = window.webkitSpeechRecognition || window.SpeechRecognition, u2 = function(e3) {
        return { status: e3, transcript: "", isSpeechFinal: false, errorCode: void 0 };
      }, l2 = u2("initial"), d2 = function() {
        var e3 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
        l2 = T(T({}, l2), e3), o2();
      }, h2 = function() {
        d2({ status: "waiting" });
      }, f2 = function(e3) {
        d2({ status: "error", errorCode: e3.error });
      }, m2 = function(e3) {
        d2({ status: "recognizing", transcript: e3.results[0] && e3.results[0][0] && e3.results[0][0].transcript || "", isSpeechFinal: e3.results[0] && e3.results[0].isFinal }), i2 && l2.transcript && s2(l2.transcript);
      }, p2 = function() {
        l2.errorCode || !l2.transcript || i2 || s2(l2.transcript), "error" !== l2.status && d2({ status: "finished" });
      };
      return { getState: function() {
        return l2;
      }, isBrowserSupported: function() {
        return Boolean(c2);
      }, isListening: function() {
        return "askingPermission" === l2.status || "waiting" === l2.status || "recognizing" === l2.status;
      }, startListening: function() {
        (r2 = new c2()) && (t2("askingPermission"), r2.interimResults = true, a2 && (r2.lang = a2), r2.addEventListener("start", h2), r2.addEventListener("error", f2), r2.addEventListener("result", m2), r2.addEventListener("end", p2), r2.start());
      }, stopListening: function() {
        n2(), t2("finished");
      }, dispose: n2 };
    }
    function Gr(m2) {
      var r2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(m2, ti()), function(u2) {
        var e2 = u2.searchAsYouSpeak, l2 = void 0 !== e2 && e2, d2 = u2.language, h2 = u2.additionalQueryParameters, e2 = u2.createVoiceSearchHelper, f2 = void 0 === e2 ? Xr : e2;
        return { $$type: "ais.voiceSearch", init: function(e3) {
          var t2 = e3.instantSearchInstance;
          m2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t2 }), true);
        }, render: function(e3) {
          var t2 = e3.instantSearchInstance;
          m2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t2 }), false);
        }, getRenderState: function(e3, t2) {
          return T(T({}, e3), {}, { voiceSearch: this.getWidgetRenderState(t2) });
        }, getWidgetRenderState: function(e3) {
          var t2 = this, n2 = e3.helper, r3 = e3.instantSearchInstance, i2 = (this._refine || (this._refine = function(e4) {
            var t3;
            e4 !== n2.state.query && (t3 = d2 ? [d2.split("-")[0]] : void 0, n2.setQueryParameter("queryLanguages", t3), "function" == typeof h2 && n2.setState(n2.state.setQueryParameters(T({ ignorePlurals: true, removeStopWords: true, optionalWords: e4 }, h2({ query: e4 })))), n2.setQuery(e4).search());
          }), this._voiceSearchHelper || (this._voiceSearchHelper = f2({ searchAsYouSpeak: l2, language: d2, onQueryChange: function(e4) {
            return t2._refine(e4);
          }, onStateChange: function() {
            m2(T(T({}, t2.getWidgetRenderState(e3)), {}, { instantSearchInstance: r3 }), false);
          } })), this._voiceSearchHelper), a2 = i2.isBrowserSupported, s2 = i2.isListening, o2 = i2.startListening, c2 = i2.stopListening, i2 = i2.getState;
          return { isBrowserSupported: a2(), isListening: s2(), toggleListening: function() {
            a2() && (s2() ? c2 : o2)();
          }, voiceListeningState: i2(), widgetParams: u2 };
        }, dispose: function(e3) {
          var t2, e3 = e3.state, n2 = (this._voiceSearchHelper.dispose(), r2(), e3);
          return "function" == typeof h2 && (t2 = (t2 = h2({ query: "" })) ? Object.keys(t2).reduce(function(e4, t3) {
            return e4[t3] = void 0, e4;
          }, {}) : {}, n2 = e3.setQueryParameters(T({ queryLanguages: void 0, ignorePlurals: void 0, removeStopWords: void 0, optionalWords: void 0 }, t2))), n2.setQueryParameter("query", void 0);
        }, getWidgetUiState: function(e3, t2) {
          t2 = t2.searchParameters.query || "";
          return t2 ? T(T({}, e3), {}, { query: t2 }) : e3;
        }, getWidgetSearchParameters: function(e3, t2) {
          t2 = t2.uiState;
          return e3.setQueryParameter("query", t2.query || "");
        } };
      };
    }
    function ei() {
      var n2 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : R, t2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return function(r2) {
        var i2 = {};
        return { $$type: "ais.relevantSort", init: function(e2) {
          var t3 = e2.instantSearchInstance;
          n2(T(T({}, this.getWidgetRenderState(e2)), {}, { instantSearchInstance: t3 }), true);
        }, render: function(e2) {
          var t3 = e2.instantSearchInstance;
          n2(T(T({}, this.getWidgetRenderState(e2)), {}, { instantSearchInstance: t3 }), false);
        }, dispose: function(e2) {
          e2 = e2.state;
          return t2(), e2.setQueryParameter("relevancyStrictness", void 0);
        }, getRenderState: function(e2, t3) {
          return T(T({}, e2), {}, { relevantSort: this.getWidgetRenderState(t3) });
        }, getWidgetRenderState: function(e2) {
          var t3 = e2.results, n3 = e2.helper;
          i2.refine || (i2.refine = function(e3) {
            n3.setQueryParameter("relevancyStrictness", e3).search();
          });
          e2 = (t3 || {}).appliedRelevancyStrictness, t3 = void 0 !== e2;
          return { isRelevantSorted: void 0 !== e2 && 0 < e2, isVirtualReplica: t3, canRefine: t3, refine: i2.refine, widgetParams: r2 };
        }, getWidgetSearchParameters: function(e2, t3) {
          var t3 = t3.uiState;
          return e2.setQueryParameter("relevancyStrictness", null != (t3 = t3.relevantSort) ? t3 : e2.relevancyStrictness);
        }, getWidgetUiState: function(e2, t3) {
          t3 = t3.searchParameters;
          return T(T({}, e2), {}, { relevantSort: t3.relevancyStrictness || e2.relevantSort });
        } };
      };
    }
    function i(n2) {
      return function() {
        var e2 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t2 = e2.descendantName, e2 = e2.modifierName, t2 = t2 ? "-".concat(t2) : "", e2 = e2 ? "--".concat(e2) : "";
        return "".concat("ais", "-").concat(n2).concat(t2).concat(e2);
      };
    }
    var ti = l({ name: "voice-search", connector: true }), ir = J(at), e = J(st), ar = Object.freeze({ __proto__: null, EXPERIMENTAL_connectAnswers: ir, EXPERIMENTAL_connectDynamicWidgets: e, connectDynamicWidgets: st, connectClearRefinements: ot, connectCurrentRefinements: dt, connectHierarchicalMenu: vt, connectHits: St, connectHitsWithInsights: en, connectHitsPerPage: Gt, connectInfiniteHits: cn, connectInfiniteHitsWithInsights: ln, connectMenu: un, connectNumericMenu: mn, connectPagination: bn, connectRange: Pn, connectRefinementList: Nn, connectSearchBox: En, connectSortBy: kn, connectRatingMenu: jn, connectStats: An, connectToggleRefinement: Wn, connectBreadcrumb: Dn, connectGeoSearch: zn, connectPoweredBy: Jn, connectConfigure: Qr, EXPERIMENTAL_connectConfigureRelatedItems: Kr, connectAutocomplete: function(n2) {
      var t2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : R;
      return h(n2, zr()), function(s2) {
        var e2 = (s2 || {}).escapeHTML, o2 = void 0 === e2 || e2, c2 = {};
        return { $$type: "ais.autocomplete", init: function(e3) {
          var t3 = e3.instantSearchInstance;
          n2(T(T({}, this.getWidgetRenderState(e3)), {}, { instantSearchInstance: t3 }), true);
        }, render: function(e3) {
          var t3 = e3.instantSearchInstance, e3 = this.getWidgetRenderState(e3);
          e3.indices.forEach(function(e4) {
            (0, e4.sendEvent)("view:internal", e4.hits);
          }), n2(T(T({}, e3), {}, { instantSearchInstance: t3 }), false);
        }, getRenderState: function(e3, t3) {
          return T(T({}, e3), {}, { autocomplete: this.getWidgetRenderState(t3) });
        }, getWidgetRenderState: function(e3) {
          var n3 = this, t3 = e3.helper, r2 = e3.state, i2 = e3.scopedResults, a2 = e3.instantSearchInstance, e3 = (c2.refine || (c2.refine = function(e4) {
            t3.setQuery(e4).search();
          }), i2.map(function(e4) {
            e4.results.hits = o2 ? ce(e4.results.hits) : e4.results.hits;
            var t4 = me({ instantSearchInstance: a2, getIndex: function() {
              return e4.results.index;
            }, widgetType: n3.$$type });
            return { indexId: e4.indexId, indexName: e4.results.index, hits: e4.results.hits, results: e4.results, sendEvent: t4 };
          }));
          return { currentRefinement: r2.query || "", indices: e3, refine: c2.refine, widgetParams: s2 };
        }, getWidgetUiState: function(e3, t3) {
          t3 = t3.searchParameters.query || "";
          return "" === t3 || e3 && e3.query === t3 ? e3 : T(T({}, e3), {}, { query: t3 });
        }, getWidgetSearchParameters: function(e3, t3) {
          t3 = { query: t3.uiState.query || "" };
          return o2 ? e3.setQueryParameters(T(T({}, t3), ae)) : e3.setQueryParameters(t3);
        }, dispose: function(e3) {
          e3 = e3.state, t2(), e3 = e3.setQueryParameter("query", void 0);
          return o2 ? e3.setQueryParameters(Object.keys(ae).reduce(function(e4, t3) {
            return T(T({}, e4), {}, E({}, t3, void 0));
          }, {})) : e3;
        } };
      };
    }, connectQueryRules: Yr, connectVoiceSearch: Gr, connectRelevantSort: ei }), ni = i("Highlight");
    function ri(e2) {
      var t2 = e2.attribute, n2 = e2.highlightedTagName, n2 = void 0 === n2 ? "mark" : n2, r2 = e2.hit, e2 = e2.cssClasses, e2 = void 0 === e2 ? {} : e2, r2 = (Ie(r2._highlightResult, t2) || {}).value, t2 = void 0 === r2 ? "" : r2, r2 = ni({ descendantName: "highlighted" }) + (e2.highlighted ? " ".concat(e2.highlighted) : "");
      return t2.replace(new RegExp(u.highlightPreTag, "g"), "<".concat(n2, ' class="').concat(r2, '">')).replace(new RegExp(u.highlightPostTag, "g"), "</".concat(n2, ">"));
    }
    var ii = i("ReverseHighlight");
    function ai(e2) {
      var t2 = e2.attribute, n2 = e2.highlightedTagName, n2 = void 0 === n2 ? "mark" : n2, r2 = e2.hit, e2 = e2.cssClasses, e2 = void 0 === e2 ? {} : e2, r2 = (Ie(r2._highlightResult, t2) || {}).value, t2 = void 0 === r2 ? "" : r2, r2 = ii({ descendantName: "highlighted" }) + (e2.highlighted ? " ".concat(e2.highlighted) : "");
      return ue(nt(Ne(t2))).replace(new RegExp(u.highlightPreTag, "g"), "<".concat(n2, ' class="').concat(r2, '">')).replace(new RegExp(u.highlightPostTag, "g"), "</".concat(n2, ">"));
    }
    var si = i("Snippet");
    function oi(e2) {
      var t2 = e2.attribute, n2 = e2.highlightedTagName, n2 = void 0 === n2 ? "mark" : n2, r2 = e2.hit, e2 = e2.cssClasses, e2 = void 0 === e2 ? {} : e2, r2 = (Ie(r2._snippetResult, t2) || {}).value, t2 = void 0 === r2 ? "" : r2, r2 = si({ descendantName: "highlighted" }) + (e2.highlighted ? " ".concat(e2.highlighted) : "");
      return t2.replace(new RegExp(u.highlightPreTag, "g"), "<".concat(n2, ' class="').concat(r2, '">')).replace(new RegExp(u.highlightPostTag, "g"), "</".concat(n2, ">"));
    }
    var ci = i("ReverseSnippet");
    function ui(e2) {
      var t2 = e2.attribute, n2 = e2.highlightedTagName, n2 = void 0 === n2 ? "mark" : n2, r2 = e2.hit, e2 = e2.cssClasses, e2 = void 0 === e2 ? {} : e2, r2 = (Ie(r2._snippetResult, t2) || {}).value, t2 = void 0 === r2 ? "" : r2, r2 = ci({ descendantName: "highlighted" }) + (e2.highlighted ? " ".concat(e2.highlighted) : "");
      return ue(nt(Ne(t2))).replace(new RegExp(u.highlightPreTag, "g"), "<".concat(n2, ' class="').concat(r2, '">')).replace(new RegExp(u.highlightPostTag, "g"), "</".concat(n2, ">"));
    }
    var li = "_ALGOLIA";
    function di() {
      var e2 = li;
      if ("object" === ("undefined" == typeof document ? "undefined" : A(document)) && "string" == typeof document.cookie) for (var t2 = "".concat(e2, "="), n2 = document.cookie.split(";"), r2 = 0; r2 < n2.length; r2++) {
        for (var i2 = n2[r2]; " " === i2.charAt(0); ) i2 = i2.substring(1);
        if (0 === i2.indexOf(t2)) return i2.substring(t2.length, i2.length);
      }
    }
    var hi = ["page"];
    function fi(e2) {
      e2 = e2 || {};
      e2.page;
      return k(e2, hi);
    }
    var mi = "ais.infiniteHits";
    var pi = "2.13.0", gi = "https://cdn.jsdelivr.net/npm/search-insights@".concat(pi, "/dist/search-insights.min.js");
    function vi() {
      var e2 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t2 = e2.insightsClient, m2 = e2.insightsInitParams, p2 = e2.onEvent, n2 = e2.$$internal, g2 = void 0 !== n2 && n2, n2 = e2.$$automatic, v2 = void 0 !== n2 && n2, a2 = t2, y2 = (t2 || null === t2 || rt(function(e3) {
        var r2 = e3.window, i2 = r2.AlgoliaAnalyticsObject || "aa";
        (a2 = "string" == typeof i2 ? r2[i2] : a2) || (r2.AlgoliaAnalyticsObject = i2, r2[i2] || (r2[i2] = function() {
          r2[i2].queue || (r2[i2].queue = []);
          for (var e4 = arguments.length, t3 = new Array(e4), n3 = 0; n3 < e4; n3++) t3[n3] = arguments[n3];
          r2[i2].queue.push(t3);
        }, r2[i2].version = pi, r2[i2].shouldAddScript = true), a2 = r2[i2]);
      }), a2 || R);
      return function(e3) {
        var a3 = e3.instantSearchInstance, e3 = a3.middleware.filter(function(e4) {
          return "ais.insights" === e4.instance.$$type && e4.instance.$$internal;
        }).map(function(e4) {
          return e4.creator;
        });
        a3.unuse.apply(a3, w(e3));
        var t3, n3, s2, o2, r2 = j((e3 = a3.client).transporter ? (r2 = (t3 = e3.transporter).headers, t3 = t3.queryParameters, [r2[n3 = "x-algolia-application-id"] || t3[n3], r2[n3 = "x-algolia-api-key"] || t3[n3]]) : [e3.applicationID, e3.apiKey], 2), c2 = r2[0], u2 = r2[1], l2 = void 0, d2 = void 0, h2 = void 0, f2 = void 0, i2 = y2.queue;
        return Array.isArray(i2) && (t3 = ["setUserToken", "setAuthenticatedUserToken"].map(function(t4) {
          var e4 = _e(i2.slice().reverse(), function(e5) {
            return j(e5, 1)[0] === t4;
          }) || [];
          return j(e4, 2)[1];
        }), n3 = j(t3, 2), l2 = n3[0], d2 = n3[1]), y2("getUserToken", null, function(e4, t4) {
          h2 = bi(t4);
        }), y2("getAuthenticatedUserToken", null, function(e4, t4) {
          f2 = bi(t4);
        }), !m2 && yi(y2) || y2("init", T({ appId: c2, apiKey: u2, partial: true }, m2)), { $$type: "ais.insights", $$internal: g2, $$automatic: v2, onStateChange: function() {
        }, subscribe: function() {
          if (y2.shouldAddScript) {
            var t4 = "[insights middleware]: could not load search-insights.js. Please load it manually following https://alg.li/insights-init";
            try {
              var e4 = document.createElement("script");
              e4.async = true, e4.src = gi, e4.onerror = function() {
                a3.emit("error", new Error(t4));
              }, document.body.appendChild(e4), y2.shouldAddScript = false;
            } catch (e5) {
              y2.shouldAddScript = false, a3.emit("error", new Error(t4));
            }
          }
        }, started: function() {
          y2("addAlgoliaAgent", "insights-middleware"), o2 = a3.mainHelper, s2 = { userToken: o2.state.userToken, clickAnalytics: o2.state.clickAnalytics }, v2 || o2.overrideStateWithoutTriggeringChangeEvent(T(T({}, o2.state), {}, { clickAnalytics: true })), g2 || a3.scheduleSearch();
          var r3 = function(e5) {
            var t5, n5 = 1 < arguments.length && void 0 !== arguments[1] && arguments[1], r4 = bi(e5);
            function i4() {
              o2.overrideStateWithoutTriggeringChangeEvent(T(T({}, o2.state), {}, { userToken: r4 })), t5 && t5 !== e5 && a3.scheduleSearch();
            }
            r4 && (t5 = o2.state.userToken, n5 ? i4() : setTimeout(i4, 0));
          }, e4 = di();
          function t4(e5, t5, n5) {
            r3(e5, true), t5 && y2("setUserToken", t5), n5 && y2("setAuthenticatedUserToken", n5);
          }
          e4 && r3(e4, true);
          var e4 = f2 || h2, n4 = d2 || l2, i3 = (e4 ? t4(e4, h2, f2) : n4 && t4(n4, l2, d2), y2("onUserTokenChange", r3, { immediate: true }), y2("onAuthenticatedUserTokenChange", function(e5) {
            e5 || y2("getUserToken", null, function(e6, t5) {
              r3(t5);
            }), r3(e5);
          }, { immediate: true }), y2);
          yi(y2) && (i3 = function(e5, t5) {
            return y2(e5, t5, { headers: { "X-Algolia-Application-Id": c2, "X-Algolia-API-Key": u2 } });
          }), a3.sendEventToInsights = function(e5) {
            p2 ? p2(e5, i3) : e5.insightsMethod && (e5.payload.algoliaSource = ["instantsearch"], v2 && e5.payload.algoliaSource.push("instantsearch-automatic"), "internal" === e5.eventModifier && e5.payload.algoliaSource.push("instantsearch-internal"), i3(e5.insightsMethod, e5.payload));
          };
        }, unsubscribe: function() {
          y2("onUserTokenChange", void 0), y2("onAuthenticatedUserTokenChange", void 0), a3.sendEventToInsights = R, o2 && s2 && (o2.overrideStateWithoutTriggeringChangeEvent(T(T({}, o2.state), s2)), a3.scheduleSearch());
        } };
      };
    }
    function yi(e2) {
      var e2 = j((e2.version || "").split(".").map(Number), 2), t2 = e2[0], e2 = e2[1];
      return 3 <= t2 || 2 === t2 && 6 <= e2 || 1 === t2 && 10 <= e2;
    }
    function bi(e2) {
      if (e2) return "number" == typeof e2 ? e2.toString() : e2;
    }
    function Ri() {
      return rt(function(e2) {
        return -1 < (null == (e2 = e2.window.navigator) || null == (e2 = e2.userAgent) ? void 0 : e2.indexOf("Algolia Crawler"));
      }, { fallback: function() {
        return false;
      } });
    }
    function Si() {
      var e2 = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).$$internal, a2 = void 0 !== e2 && e2;
      return function(e3) {
        var t2 = e3.instantSearchInstance, n2 = { widgets: [] }, r2 = document.createElement("meta"), i2 = document.querySelector("head");
        return r2.name = "instantsearch:widgets", { $$type: "ais.metadata", $$internal: a2, onStateChange: function() {
        }, subscribe: function() {
          setTimeout(function() {
            var e4 = t2.client;
            n2.ua = e4.transporter && e4.transporter.userAgent ? e4.transporter.userAgent.value : e4._ua, function r3(e5, i3, a3) {
              var s2 = et(i3, i3.mainIndex, i3._initialUiState);
              e5.forEach(function(e6) {
                var t3 = {}, n3 = (e6.getWidgetRenderState && (n3 = e6.getWidgetRenderState(s2)) && n3.widgetParams && (t3 = n3.widgetParams), Object.keys(t3).filter(function(e7) {
                  return void 0 !== t3[e7];
                }));
                a3.widgets.push({ type: e6.$$type, widgetType: e6.$$widgetType, params: n3 }), "ais.index" === e6.$$type && r3(e6.getWidgets(), i3, a3);
              });
            }(t2.mainIndex.getWidgets(), t2, n2), t2.middleware.forEach(function(e5) {
              return n2.widgets.push({ middleware: true, type: e5.instance.$$type, internal: e5.instance.$$internal });
            }), r2.content = JSON.stringify(n2), i2.appendChild(r2);
          }, 0);
        }, started: function() {
        }, unsubscribe: function() {
          r2.remove();
        } };
      };
    }
    function _i(e2, t2) {
      for (var n2 = t2 && t2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, r2 = 0; r2 < e2.length; ++r2) void 0 !== e2[r2] && (n2[r2] = e2[r2]);
      return n2;
    }
    function wi(e2, t2, n2, r2, i2, a2, s2, o2, c2, u2, l2, d2, h2, f2) {
      var m2 = e2;
      if ("function" == typeof s2 ? m2 = s2(t2, m2) : m2 instanceof Date ? m2 = u2(m2) : "comma" === n2 && Mi(m2) && (m2 = Ei.maybeMap(m2, function(e3) {
        return e3 instanceof Date ? u2(e3) : e3;
      })), null === m2) {
        if (r2) return a2 && !h2 ? a2(t2, I.encoder, f2, "key", l2) : t2;
        m2 = "";
      }
      if (Wi(m2) || Ei.isBuffer(m2)) {
        if (a2) {
          e2 = h2 ? t2 : a2(t2, I.encoder, f2, "key", l2);
          if ("comma" === n2 && h2) {
            for (var p2 = Li.call(String(m2), ","), g2 = "", v2 = 0; v2 < p2.length; ++v2) g2 += (0 === v2 ? "" : ",") + d2(a2(p2[v2], I.encoder, f2, "value", l2));
            return [d2(e2) + "=" + g2];
          }
          return [d2(e2) + "=" + d2(a2(m2, I.encoder, f2, "value", l2))];
        }
        return [d2(t2) + "=" + d2(String(m2))];
      }
      var y2, b2 = [];
      if (void 0 !== m2) {
        y2 = "comma" === n2 && Mi(m2) ? [{ value: 0 < m2.length ? m2.join(",") || null : void 0 }] : Mi(s2) ? s2 : (e2 = Object.keys(m2), o2 ? e2.sort(o2) : e2);
        for (var R2 = 0; R2 < y2.length; ++R2) {
          var S2 = y2[R2], _2 = "object" == typeof S2 && void 0 !== S2.value ? S2.value : m2[S2];
          i2 && null === _2 || (S2 = Mi(m2) ? "function" == typeof n2 ? n2(t2, S2) : t2 : t2 + (c2 ? "." + S2 : "[" + S2 + "]"), Hi(b2, wi(_2, S2, n2, r2, i2, a2, s2, o2, c2, u2, l2, d2, h2, f2)));
        }
      }
      return b2;
    }
    function Pi(e2) {
      e2 && (window.document.title = e2);
    }
    var Ni = String.prototype.replace, xi = /%20/g, ir = "RFC3986", Ii = { default: ir, formatters: { RFC1738: function(e2) {
      return Ni.call(e2, xi, "+");
    }, RFC3986: function(e2) {
      return String(e2);
    } }, RFC1738: "RFC1738", RFC3986: ir }, Fi = Object.prototype.hasOwnProperty, Ci = Array.isArray, Ti = function() {
      for (var e2 = [], t2 = 0; t2 < 256; ++t2) e2.push("%" + ((t2 < 16 ? "0" : "") + t2.toString(16)).toUpperCase());
      return e2;
    }(), Ei = { arrayToObject: _i, assign: function(e2, n2) {
      return Object.keys(n2).reduce(function(e3, t2) {
        return e3[t2] = n2[t2], e3;
      }, e2);
    }, combine: function(e2, t2) {
      return [].concat(e2, t2);
    }, compact: function(e2) {
      for (var t2 = [{ obj: { o: e2 }, prop: "o" }], n2 = [], r2 = 0; r2 < t2.length; ++r2) for (var i2 = t2[r2], a2 = i2.obj[i2.prop], s2 = Object.keys(a2), o2 = 0; o2 < s2.length; ++o2) {
        var c2 = s2[o2], u2 = a2[c2];
        "object" == typeof u2 && null !== u2 && -1 === n2.indexOf(u2) && (t2.push({ obj: a2, prop: c2 }), n2.push(u2));
      }
      for (var l2 = t2; 1 < l2.length; ) {
        var d2 = l2.pop(), h2 = d2.obj[d2.prop];
        if (Ci(h2)) {
          for (var f2 = [], m2 = 0; m2 < h2.length; ++m2) void 0 !== h2[m2] && f2.push(h2[m2]);
          d2.obj[d2.prop] = f2;
        }
      }
      return e2;
    }, decode: function(t2, e2, n2) {
      t2 = t2.replace(/\+/g, " ");
      if ("iso-8859-1" === n2) return t2.replace(/%[0-9a-f]{2}/gi, unescape);
      try {
        return decodeURIComponent(t2);
      } catch (e3) {
        return t2;
      }
    }, encode: function(e2, t2, n2, r2, i2) {
      if (0 === e2.length) return e2;
      var a2 = e2;
      if ("symbol" == typeof e2 ? a2 = Symbol.prototype.toString.call(e2) : "string" != typeof e2 && (a2 = String(e2)), "iso-8859-1" === n2) return escape(a2).replace(/%u[0-9a-f]{4}/gi, function(e3) {
        return "%26%23" + parseInt(e3.slice(2), 16) + "%3B";
      });
      for (var s2 = "", o2 = 0; o2 < a2.length; ++o2) {
        var c2 = a2.charCodeAt(o2);
        45 === c2 || 46 === c2 || 95 === c2 || 126 === c2 || 48 <= c2 && c2 <= 57 || 65 <= c2 && c2 <= 90 || 97 <= c2 && c2 <= 122 || i2 === Ii.RFC1738 && (40 === c2 || 41 === c2) ? s2 += a2.charAt(o2) : c2 < 128 ? s2 += Ti[c2] : c2 < 2048 ? s2 += Ti[192 | c2 >> 6] + Ti[128 | 63 & c2] : c2 < 55296 || 57344 <= c2 ? s2 += Ti[224 | c2 >> 12] + Ti[128 | c2 >> 6 & 63] + Ti[128 | 63 & c2] : (o2 += 1, c2 = 65536 + ((1023 & c2) << 10 | 1023 & a2.charCodeAt(o2)), s2 += Ti[240 | c2 >> 18] + Ti[128 | c2 >> 12 & 63] + Ti[128 | c2 >> 6 & 63] + Ti[128 | 63 & c2]);
      }
      return s2;
    }, isBuffer: function(e2) {
      return !(!e2 || "object" != typeof e2 || !(e2.constructor && e2.constructor.isBuffer && e2.constructor.isBuffer(e2)));
    }, isRegExp: function(e2) {
      return "[object RegExp]" === Object.prototype.toString.call(e2);
    }, maybeMap: function(e2, t2) {
      if (Ci(e2)) {
        for (var n2 = [], r2 = 0; r2 < e2.length; r2 += 1) n2.push(t2(e2[r2]));
        return n2;
      }
      return t2(e2);
    }, merge: function r2(i2, a2, s2) {
      if (!a2) return i2;
      if ("object" != typeof a2) {
        if (Ci(i2)) i2.push(a2);
        else {
          if (!i2 || "object" != typeof i2) return [i2, a2];
          (s2 && (s2.plainObjects || s2.allowPrototypes) || !Fi.call(Object.prototype, a2)) && (i2[a2] = true);
        }
        return i2;
      }
      var e2;
      return i2 && "object" == typeof i2 ? (Ci(e2 = i2) && !Ci(a2) && (e2 = _i(i2, s2)), Ci(i2) && Ci(a2) ? (a2.forEach(function(e3, t2) {
        var n2;
        Fi.call(i2, t2) ? (n2 = i2[t2]) && "object" == typeof n2 && e3 && "object" == typeof e3 ? i2[t2] = r2(n2, e3, s2) : i2.push(e3) : i2[t2] = e3;
      }), i2) : Object.keys(a2).reduce(function(e3, t2) {
        var n2 = a2[t2];
        return Fi.call(e3, t2) ? e3[t2] = r2(e3[t2], n2, s2) : e3[t2] = n2, e3;
      }, e2)) : [i2].concat(a2);
    } }, ki = Object.prototype.hasOwnProperty, ji = { brackets: function(e2) {
      return e2 + "[]";
    }, comma: "comma", indices: function(e2, t2) {
      return e2 + "[" + t2 + "]";
    }, repeat: function(e2) {
      return e2;
    } }, Mi = Array.isArray, Li = String.prototype.split, Oi = Array.prototype.push, Hi = function(e2, t2) {
      Oi.apply(e2, Mi(t2) ? t2 : [t2]);
    }, Ai = Date.prototype.toISOString, e = Ii.default, I = { addQueryPrefix: false, allowDots: false, charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encoder: Ei.encode, encodeValuesOnly: false, format: e, formatter: Ii.formatters[e], indices: false, serializeDate: function(e2) {
      return Ai.call(e2);
    }, skipNulls: false, strictNullHandling: false }, Wi = function(e2) {
      return "string" == typeof e2 || "number" == typeof e2 || "boolean" == typeof e2 || "symbol" == typeof e2 || "bigint" == typeof e2;
    }, Di = Object.prototype.hasOwnProperty, Ui = Array.isArray, f = { allowDots: false, allowPrototypes: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decoder: Ei.decode, delimiter: "&", depth: 5, ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false }, $i = function(e2) {
      return e2.replace(/&#(\d+);/g, function(e3, t2) {
        return String.fromCharCode(parseInt(t2, 10));
      });
    }, Bi = function(e2, t2) {
      return e2 && "string" == typeof e2 && t2.comma && -1 < e2.indexOf(",") ? e2.split(",") : e2;
    }, Qi = "utf8=%26%2310003%3B", qi = "utf8=%E2%9C%93", Vi = function(e2, t2, n2, r2) {
      for (var i2 = r2 ? t2 : Bi(t2, n2), a2 = e2.length - 1; 0 <= a2; --a2) {
        var s2, o2, c2, u2 = e2[a2];
        "[]" === u2 && n2.parseArrays ? s2 = [].concat(i2) : (s2 = n2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, o2 = "[" === u2.charAt(0) && "]" === u2.charAt(u2.length - 1) ? u2.slice(1, -1) : u2, c2 = parseInt(o2, 10), n2.parseArrays || "" !== o2 ? !isNaN(c2) && u2 !== o2 && String(c2) === o2 && 0 <= c2 && n2.parseArrays && c2 <= n2.arrayLimit ? (s2 = [])[c2] = i2 : "__proto__" !== o2 && (s2[o2] = i2) : s2 = { 0: i2 }), i2 = s2;
      }
      return i2;
    }, Ki = { formats: Ii, parse: function(e2, t2) {
      var n2 = function(e3) {
        if (!e3) return f;
        if (null !== e3.decoder && void 0 !== e3.decoder && "function" != typeof e3.decoder) throw new TypeError("Decoder has to be a function.");
        if (void 0 !== e3.charset && "utf-8" !== e3.charset && "iso-8859-1" !== e3.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        var t3 = (void 0 === e3.charset ? f : e3).charset;
        return { allowDots: void 0 === e3.allowDots ? f.allowDots : !!e3.allowDots, allowPrototypes: ("boolean" == typeof e3.allowPrototypes ? e3 : f).allowPrototypes, arrayLimit: ("number" == typeof e3.arrayLimit ? e3 : f).arrayLimit, charset: t3, charsetSentinel: ("boolean" == typeof e3.charsetSentinel ? e3 : f).charsetSentinel, comma: ("boolean" == typeof e3.comma ? e3 : f).comma, decoder: ("function" == typeof e3.decoder ? e3 : f).decoder, delimiter: ("string" == typeof e3.delimiter || Ei.isRegExp(e3.delimiter) ? e3 : f).delimiter, depth: "number" == typeof e3.depth || false === e3.depth ? +e3.depth : f.depth, ignoreQueryPrefix: true === e3.ignoreQueryPrefix, interpretNumericEntities: ("boolean" == typeof e3.interpretNumericEntities ? e3 : f).interpretNumericEntities, parameterLimit: ("number" == typeof e3.parameterLimit ? e3 : f).parameterLimit, parseArrays: false !== e3.parseArrays, plainObjects: ("boolean" == typeof e3.plainObjects ? e3 : f).plainObjects, strictNullHandling: ("boolean" == typeof e3.strictNullHandling ? e3 : f).strictNullHandling };
      }(t2);
      if ("" === e2 || null == e2) return n2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      for (var r2 = "string" == typeof e2 ? function(e3, t3) {
        var n3, r3, i3, a3, s3 = {}, e3 = t3.ignoreQueryPrefix ? e3.replace(/^\?/, "") : e3, o3 = t3.parameterLimit === 1 / 0 ? void 0 : t3.parameterLimit, c2 = e3.split(t3.delimiter, o3), u2 = -1, l2 = t3.charset;
        if (t3.charsetSentinel) for (n3 = 0; n3 < c2.length; ++n3) 0 === c2[n3].indexOf("utf8=") && (c2[n3] === qi ? l2 = "utf-8" : c2[n3] === Qi && (l2 = "iso-8859-1"), u2 = n3, n3 = c2.length);
        for (n3 = 0; n3 < c2.length; ++n3) n3 !== u2 && ((a3 = -1 === (a3 = -1 === (a3 = (r3 = c2[n3]).indexOf("]=")) ? r3.indexOf("=") : a3 + 1) ? (i3 = t3.decoder(r3, f.decoder, l2, "key"), t3.strictNullHandling ? null : "") : (i3 = t3.decoder(r3.slice(0, a3), f.decoder, l2, "key"), Ei.maybeMap(Bi(r3.slice(a3 + 1), t3), function(e4) {
          return t3.decoder(e4, f.decoder, l2, "value");
        }))) && t3.interpretNumericEntities && "iso-8859-1" === l2 && (a3 = $i(a3)), -1 < r3.indexOf("[]=") && (a3 = Ui(a3) ? [a3] : a3), Di.call(s3, i3) ? s3[i3] = Ei.combine(s3[i3], a3) : s3[i3] = a3);
        return s3;
      }(e2, n2) : e2, i2 = n2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, a2 = Object.keys(r2), s2 = 0; s2 < a2.length; ++s2) var o2 = a2[s2], o2 = function(e3, t3, n3, r3) {
        if (e3) {
          var i3 = n3.allowDots ? e3.replace(/\.([^.[]+)/g, "[$1]") : e3, a3 = /(\[[^[\]]*])/g, s3 = 0 < n3.depth && /(\[[^[\]]*])/.exec(i3), e3 = s3 ? i3.slice(0, s3.index) : i3, o3 = [];
          if (e3) {
            if (!n3.plainObjects && Di.call(Object.prototype, e3) && !n3.allowPrototypes) return;
            o3.push(e3);
          }
          for (var c2 = 0; 0 < n3.depth && null !== (s3 = a3.exec(i3)) && c2 < n3.depth; ) {
            if (c2 += 1, !n3.plainObjects && Di.call(Object.prototype, s3[1].slice(1, -1)) && !n3.allowPrototypes) return;
            o3.push(s3[1]);
          }
          return s3 && o3.push("[" + i3.slice(s3.index) + "]"), Vi(o3, t3, n3, r3);
        }
      }(o2, r2[o2], n2, "string" == typeof e2), i2 = Ei.merge(i2, o2, n2);
      return Ei.compact(i2);
    }, stringify: function(e2, t2) {
      var n2 = e2, r2 = function(e3) {
        if (!e3) return I;
        if (null !== e3.encoder && void 0 !== e3.encoder && "function" != typeof e3.encoder) throw new TypeError("Encoder has to be a function.");
        var t3 = e3.charset || I.charset;
        if (void 0 !== e3.charset && "utf-8" !== e3.charset && "iso-8859-1" !== e3.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        var n3 = Ii.default;
        if (void 0 !== e3.format) {
          if (!ki.call(Ii.formatters, e3.format)) throw new TypeError("Unknown format option provided.");
          n3 = e3.format;
        }
        var r3 = Ii.formatters[n3], i3 = I.filter;
        return "function" != typeof e3.filter && !Mi(e3.filter) || (i3 = e3.filter), { addQueryPrefix: ("boolean" == typeof e3.addQueryPrefix ? e3 : I).addQueryPrefix, allowDots: void 0 === e3.allowDots ? I.allowDots : !!e3.allowDots, charset: t3, charsetSentinel: ("boolean" == typeof e3.charsetSentinel ? e3 : I).charsetSentinel, delimiter: (void 0 === e3.delimiter ? I : e3).delimiter, encode: ("boolean" == typeof e3.encode ? e3 : I).encode, encoder: ("function" == typeof e3.encoder ? e3 : I).encoder, encodeValuesOnly: ("boolean" == typeof e3.encodeValuesOnly ? e3 : I).encodeValuesOnly, filter: i3, format: n3, formatter: r3, serializeDate: ("function" == typeof e3.serializeDate ? e3 : I).serializeDate, skipNulls: ("boolean" == typeof e3.skipNulls ? e3 : I).skipNulls, sort: "function" == typeof e3.sort ? e3.sort : null, strictNullHandling: ("boolean" == typeof e3.strictNullHandling ? e3 : I).strictNullHandling };
      }(t2), i2 = ("function" == typeof r2.filter ? n2 = (0, r2.filter)("", n2) : Mi(r2.filter) && (s2 = r2.filter), []);
      if ("object" != typeof n2 || null === n2) return "";
      var e2 = t2 && t2.arrayFormat in ji ? t2.arrayFormat : !(t2 && "indices" in t2) || t2.indices ? "indices" : "repeat", a2 = ji[e2], s2 = s2 || Object.keys(n2);
      r2.sort && s2.sort(r2.sort);
      for (var o2 = 0; o2 < s2.length; ++o2) {
        var c2 = s2[o2];
        r2.skipNulls && null === n2[c2] || Hi(i2, wi(n2[c2], c2, a2, r2.strictNullHandling, r2.skipNulls, r2.encode ? r2.encoder : null, r2.filter, r2.sort, r2.allowDots, r2.serializeDate, r2.format, r2.formatter, r2.encodeValuesOnly, r2.charset));
      }
      t2 = i2.join(r2.delimiter), e2 = true === r2.addQueryPrefix ? "?" : "";
      return r2.charsetSentinel && ("iso-8859-1" === r2.charset ? e2 += "utf8=%26%2310003%3B&" : e2 += "utf8=%E2%9C%93&"), 0 < t2.length ? e2 + t2 : "";
    } }, zi = function() {
      function l2(e2) {
        var n2 = this, t2 = e2.windowTitle, r2 = e2.writeDelay, r2 = void 0 === r2 ? 400 : r2, i2 = e2.createURL, a2 = e2.parseURL, s2 = e2.getLocation, o2 = e2.start, c2 = e2.dispose, u2 = e2.push, e2 = e2.cleanUrlOnDispose;
        W(this, l2), E(this, "$$type", "ais.browser"), E(this, "windowTitle", void 0), E(this, "writeDelay", void 0), E(this, "_createURL", void 0), E(this, "parseURL", void 0), E(this, "getLocation", void 0), E(this, "writeTimer", void 0), E(this, "_onPopState", void 0), E(this, "inPopState", false), E(this, "isDisposed", false), E(this, "latestAcknowledgedHistory", 0), E(this, "_start", void 0), E(this, "_dispose", void 0), E(this, "_push", void 0), E(this, "_cleanUrlOnDispose", void 0), this.windowTitle = t2, this.writeTimer = void 0, this.writeDelay = r2, this._createURL = i2, this.parseURL = a2, this.getLocation = s2, this._start = o2, this._dispose = c2, this._push = u2, this._cleanUrlOnDispose = void 0 === e2 || e2, rt(function(e3) {
          var e3 = e3.window, t3 = n2.windowTitle && n2.windowTitle(n2.read());
          Pi(t3), n2.latestAcknowledgedHistory = e3.history.length;
        });
      }
      return D(l2, [{ key: "read", value: function() {
        return this.parseURL({ qsModule: Ki, location: this.getLocation() });
      } }, { key: "write", value: function(i2) {
        var a2 = this;
        rt(function(e2) {
          var t2 = e2.window, n2 = a2.createURL(i2), r2 = a2.windowTitle && a2.windowTitle(i2);
          a2.writeTimer && clearTimeout(a2.writeTimer), a2.writeTimer = setTimeout(function() {
            Pi(r2), a2.shouldWrite(n2) && (a2._push ? a2._push(n2) : t2.history.pushState(i2, r2 || "", n2), a2.latestAcknowledgedHistory = t2.history.length), a2.inPopState = false, a2.writeTimer = void 0;
          }, a2.writeDelay);
        });
      } }, { key: "onUpdate", value: function(e2) {
        var t2 = this;
        this._start && this._start(function() {
          e2(t2.read());
        }), this._onPopState = function() {
          t2.writeTimer && (clearTimeout(t2.writeTimer), t2.writeTimer = void 0), t2.inPopState = true, e2(t2.read());
        }, rt(function(e3) {
          e3.window.addEventListener("popstate", t2._onPopState);
        });
      } }, { key: "createURL", value: function(e2) {
        return this._createURL({ qsModule: Ki, routeState: e2, location: this.getLocation() });
      } }, { key: "dispose", value: function() {
        var t2 = this;
        this._dispose && this._dispose(), this.isDisposed = true, rt(function(e2) {
          e2 = e2.window;
          t2._onPopState && e2.removeEventListener("popstate", t2._onPopState);
        }), this.writeTimer && clearTimeout(this.writeTimer), this._cleanUrlOnDispose && this.write({});
      } }, { key: "start", value: function() {
        this.isDisposed = false;
      } }, { key: "shouldWrite", value: function(n2) {
        var r2 = this;
        return rt(function(e2) {
          var e2 = e2.window, t2 = !(r2.isDisposed && r2.latestAcknowledgedHistory !== e2.history.length);
          return !r2.inPopState && t2 && n2 !== e2.location.href;
        });
      } }]), l2;
    }();
    function Ji() {
      var e2 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t2 = e2.createURL, n2 = e2.parseURL, r2 = e2.writeDelay, i2 = e2.windowTitle, a2 = e2.getLocation, s2 = e2.start, o2 = e2.dispose, c2 = e2.push, e2 = e2.cleanUrlOnDispose;
      return new zi({ createURL: void 0 === t2 ? function(e3) {
        var t3 = e3.qsModule, n3 = e3.routeState, e3 = e3.location, r3 = e3.protocol, i3 = e3.hostname, a3 = e3.port, a3 = void 0 === a3 ? "" : a3, s3 = e3.pathname, e3 = e3.hash, t3 = t3.stringify(n3), n3 = "" === a3 ? "" : ":".concat(a3);
        return (t3 ? "".concat(r3, "//").concat(i3).concat(n3).concat(s3, "?").concat(t3) : "".concat(r3, "//").concat(i3).concat(n3).concat(s3)).concat(e3);
      } : t2, parseURL: void 0 === n2 ? function(e3) {
        var t3 = e3.qsModule, e3 = e3.location;
        return t3.parse(e3.search.slice(1), { arrayLimit: 99 });
      } : n2, writeDelay: void 0 === r2 ? 400 : r2, windowTitle: i2, getLocation: void 0 === a2 ? function() {
        return rt(function(e3) {
          return e3.window.location;
        }, { fallback: function() {
          throw new Error("You need to provide `getLocation` to the `history` router in environments where `window` does not exist.");
        } });
      } : a2, start: s2, dispose: o2, push: c2, cleanUrlOnDispose: e2 });
    }
    var Zi = ["configure"];
    function Yi(e2) {
      e2.configure;
      return k(e2, Zi);
    }
    function Xi() {
      return { $$type: "ais.simple", stateToRoute: function(n2) {
        return Object.keys(n2).reduce(function(e2, t2) {
          return T(T({}, e2), {}, E({}, t2, Yi(n2[t2])));
        }, {});
      }, routeToState: function() {
        var n2 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
        return Object.keys(n2).reduce(function(e2, t2) {
          return T(T({}, e2), {}, E({}, t2, Yi(n2[t2])));
        }, {});
      } };
    }
    function Gi() {
      var e2 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t2 = e2.router, i2 = void 0 === t2 ? Ji() : t2, a2 = void 0 === (t2 = e2.stateMapping) ? Xi() : t2, s2 = void 0 !== (t2 = e2.$$internal) && t2;
      return function(e3) {
        var t3 = e3.instantSearchInstance;
        t3._createURL = function(n3) {
          var e4 = 0 === t3.mainIndex.getWidgets().length ? t3._initialUiState : t3.mainIndex.getWidgetUiState({}), e4 = Object.keys(n3).reduce(function(e5, t4) {
            return T(T({}, e5), {}, E({}, t4, n3[t4]));
          }, e4), e4 = a2.stateToRoute(e4);
          return i2.createURL(e4);
        };
        var n2 = void 0, r2 = t3._initialUiState;
        return { $$type: "ais.router({router:".concat(i2.$$type || "__unknown__", ", stateMapping:").concat(a2.$$type || "__unknown__", "})"), $$internal: s2, onStateChange: function(e4) {
          e4 = e4.uiState, e4 = a2.stateToRoute(e4);
          void 0 !== n2 && Oe(n2, e4) || (i2.write(e4), n2 = e4);
        }, subscribe: function() {
          t3._initialUiState = T(T({}, r2), a2.routeToState(i2.read())), i2.onUpdate(function(e4) {
            0 < t3.mainIndex.getWidgets().length && t3.setUiState(a2.routeToState(e4));
          });
        }, started: function() {
          var e4;
          null != (e4 = i2.start) && e4.call(i2);
        }, unsubscribe: function() {
          i2.dispose();
        } };
      };
    }
    var ea = ["initialSearchParameters"], ta = ["initialRecommendParameters"], na = l({ name: "index-widget" });
    function ra(e2, t2) {
      var n2 = t2.state, r2 = t2.recommendState, i2 = t2.isPageReset, t2 = t2._uiState;
      n2 !== e2.state && (e2.state = n2, e2.emit("change", { state: e2.state, results: e2.lastResults, isPageReset: i2, _uiState: t2 })), r2 !== e2.recommendState && (e2.recommendState = r2);
    }
    function ia(e2, n2, t2) {
      return e2.reduce(function(e3, t3) {
        return !ge(t3) && (t3.getWidgetUiState || t3.getWidgetState) ? t3.getWidgetUiState ? t3.getWidgetUiState(e3, n2) : t3.getWidgetState(e3, n2) : e3;
      }, 2 < arguments.length && void 0 !== t2 ? t2 : {});
    }
    function aa(e2, t2) {
      var n2 = t2.initialSearchParameters, r2 = k(t2, ea);
      return e2.reduce(function(e3, t3) {
        return !t3.getWidgetSearchParameters || ge(t3) ? e3 : "search" === t3.dependsOn && t3.getWidgetParameters ? t3.getWidgetParameters(e3, r2) : t3.getWidgetSearchParameters(e3, r2);
      }, n2);
    }
    function sa(e2, t2) {
      var n2 = t2.initialRecommendParameters, r2 = k(t2, ta);
      return e2.reduce(function(e3, t3) {
        return !ge(t3) && "recommend" === t3.dependsOn && t3.getWidgetParameters ? t3.getWidgetParameters(e3, r2) : e3;
      }, n2);
    }
    function oa(e2) {
      if (void 0 === e2 || void 0 === e2.indexName) throw new Error(na("The `indexName` option is required."));
      var s2 = e2.indexName, o2 = void 0 === (e2 = e2.indexId) ? s2 : e2, c2 = [], u2 = {}, l2 = null, d2 = null, h2 = null, f2 = null, m2 = null;
      return { $$type: "ais.index", $$widgetType: "ais.index", getIndexName: function() {
        return s2;
      }, getIndexId: function() {
        return o2;
      }, getHelper: function() {
        return h2;
      }, getResults: function() {
        var e3;
        return null != (e3 = f2) && e3.lastResults ? (f2.lastResults._state = h2.state, f2.lastResults) : null;
      }, getPreviousState: function() {
        return m2;
      }, getScopedResults: function() {
        var e3 = this.getParent(), e3 = e3 ? e3.getWidgets() : 0 === s2.length ? this.getWidgets() : [this];
        return function n2(e4) {
          return e4.filter(ge).reduce(function(e5, t2) {
            return e5.concat.apply(e5, [{ indexId: t2.getIndexId(), results: t2.getResults(), helper: t2.getHelper() }].concat(w(n2(t2.getWidgets()))));
          }, []);
        }(e3);
      }, getParent: function() {
        return d2;
      }, createURL: function(e3) {
        return "function" == typeof e3 ? l2._createURL(E({}, o2, e3(u2))) : l2._createURL(E({}, o2, ia(c2, { searchParameters: e3, helper: h2 })));
      }, getWidgets: function() {
        return c2;
      }, addWidgets: function(e3) {
        var t2 = this;
        if (!Array.isArray(e3)) throw new Error(na("The `addWidgets` method expects an array of widgets."));
        if (e3.some(function(e4) {
          return "function" != typeof e4.init && "function" != typeof e4.render;
        })) throw new Error(na("The widget definition expects a `render` and/or an `init` method."));
        return c2 = c2.concat(e3), l2 && Boolean(e3.length) && (ra(h2, { state: aa(c2, { uiState: u2, initialSearchParameters: h2.state }), recommendState: sa(c2, { uiState: u2, initialRecommendParameters: h2.recommendState }), _uiState: u2 }), e3.forEach(function(e4) {
          e4.getRenderState && ca({ renderState: e4.getRenderState(l2.renderState[t2.getIndexId()] || {}, et(l2, t2, l2._initialUiState)), instantSearchInstance: l2, parent: t2 });
        }), e3.forEach(function(e4) {
          e4.init && e4.init(et(l2, t2, l2._initialUiState));
        }), l2.scheduleSearch()), this;
      }, removeWidgets: function(t2) {
        var e3, n2 = this;
        if (!Array.isArray(t2)) throw new Error(na("The `removeWidgets` method expects an array of widgets."));
        if (t2.some(function(e4) {
          return "function" != typeof e4.dispose;
        })) throw new Error(na("The widget definition expects a `dispose` method."));
        return c2 = c2.filter(function(e4) {
          return -1 === t2.indexOf(e4);
        }), l2 && Boolean(t2.length) && (e3 = t2.reduce(function(e4, t3) {
          return t3.dispose({ helper: h2, state: e4, parent: n2 }) || e4;
        }, h2.state), e3 = l2.future.preserveSharedStateOnUnmount ? aa(c2, { uiState: u2, initialSearchParameters: new g.SearchParameters({ index: this.getIndexName() }) }) : aa(c2, { uiState: ia(c2, { searchParameters: e3, helper: h2 }), initialSearchParameters: e3 }), u2 = ia(c2, { searchParameters: e3, helper: h2 }), h2.setState(e3), c2.length) && l2.scheduleSearch(), this;
      }, init: function(e3) {
        var i2, t2 = this, n2 = e3.instantSearchInstance, r2 = e3.parent, a2 = e3.uiState;
        null === h2 && (l2 = n2, d2 = r2, u2 = a2[o2] || {}, i2 = n2.mainHelper, e3 = aa(c2, { uiState: u2, initialSearchParameters: new g.SearchParameters({ index: s2 }) }), r2 = sa(c2, { uiState: u2, initialRecommendParameters: new g.RecommendParameters() }), (h2 = g({}, e3.index, e3)).recommendState = r2, h2.search = function() {
          return n2.onStateChange ? (n2.onStateChange({ uiState: n2.mainIndex.getWidgetUiState({}), setUiState: function(e4) {
            return n2.setUiState(e4, false);
          } }), i2) : i2.search();
        }, h2.searchWithoutTriggeringOnStateChange = function() {
          return i2.search();
        }, h2.searchForFacetValues = function(e4, t3, n3, r3) {
          r3 = h2.state.setQueryParameters(r3);
          return i2.searchForFacetValues(e4, t3, n3, r3);
        }, f2 = i2.derive(function() {
          return Ye.apply(void 0, [i2.state].concat(w(function(e4) {
            for (var t3 = e4.getParent(), n3 = [e4.getHelper().state]; null !== t3; ) n3 = [t3.getHelper().state].concat(n3), t3 = t3.getParent();
            return n3;
          }(t2))));
        }, function() {
          return t2.getHelper().recommendState;
        }), (r2 = null == (e3 = n2._initialResults) ? void 0 : e3[this.getIndexId()]) && (e3 = new g.SearchResults(new g.SearchParameters(r2.state), r2.results), f2.lastResults = e3, h2.lastResults = e3), h2.on("change", function(e4) {
          e4.isPageReset && !function n3(e5) {
            e5 = e5.filter(ge);
            0 !== e5.length && e5.forEach(function(e6) {
              var t3 = e6.getHelper();
              ra(t3, { state: t3.state.resetPage(), recommendState: t3.recommendState, isPageReset: true }), n3(e6.getWidgets());
            });
          }(c2);
        }), f2.on("search", function() {
          n2.scheduleStalledRender();
        }), f2.on("result", function(e4) {
          e4 = e4.results;
          n2.scheduleRender(), h2.lastResults = e4, m2 = null == e4 ? void 0 : e4._state;
        }), f2.on("recommend:result", function(e4) {
          e4 = e4.recommend;
          n2.scheduleRender(), h2.lastRecommendResults = e4.results;
        }), c2.forEach(function(e4) {
          e4.getRenderState && ca({ renderState: e4.getRenderState(n2.renderState[t2.getIndexId()] || {}, et(n2, t2, a2)), instantSearchInstance: n2, parent: t2 });
        }), c2.forEach(function(e4) {
          e4.init && e4.init(et(n2, t2, a2));
        }), h2.on("change", function(e4) {
          var t3 = e4.state, e4 = e4._uiState;
          u2 = ia(c2, { searchParameters: t3, helper: h2 }, e4 || {}), n2.onStateChange || n2.onInternalStateChange();
        }), r2) && n2.scheduleRender();
      }, render: function(e3) {
        var t2 = this, n2 = e3.instantSearchInstance, e3 = ("error" === n2.status && !n2.mainHelper.hasPendingRequests() && m2 && h2.setState(m2), this.getResults() ? c2 : c2.filter(ge));
        (e3 = e3.filter(function(e4) {
          return !e4.shouldRender || e4.shouldRender({ instantSearchInstance: n2 });
        })).forEach(function(e4) {
          e4.getRenderState && ca({ renderState: e4.getRenderState(n2.renderState[t2.getIndexId()] || {}, tt(n2, t2)), instantSearchInstance: n2, parent: t2 });
        }), e3.forEach(function(e4) {
          e4.render && e4.render(tt(n2, t2));
        });
      }, dispose: function() {
        var e3, t2 = this;
        c2.forEach(function(e4) {
          e4.dispose && h2 && e4.dispose({ helper: h2, state: h2.state, parent: t2 });
        }), (d2 = l2 = null) != (e3 = h2) && e3.removeAllListeners(), (h2 = null) != (e3 = f2) && e3.detach(), f2 = null;
      }, getWidgetUiState: function(e3) {
        return c2.filter(ge).reduce(function(e4, t2) {
          return t2.getWidgetUiState(e4);
        }, T(T({}, e3), {}, E({}, o2, T(T({}, e3[o2]), u2))));
      }, getWidgetState: function(e3) {
        return this.getWidgetUiState(e3);
      }, getWidgetSearchParameters: function(e3, t2) {
        t2 = t2.uiState;
        return aa(c2, { uiState: t2, initialSearchParameters: e3 });
      }, refreshUiState: function() {
        u2 = ia(c2, { searchParameters: this.getHelper().state, helper: this.getHelper() }, u2);
      }, setIndexUiState: function(e3) {
        var t2 = "function" == typeof e3 ? e3(u2) : e3;
        l2.setUiState(function(e4) {
          return T(T({}, e4), {}, E({}, o2, t2));
        });
      } };
    }
    function ca(e2) {
      var t2 = e2.renderState, n2 = e2.instantSearchInstance, e2 = e2.parent, e2 = (e2 || n2.mainIndex).getIndexId();
      n2.renderState = T(T({}, n2.renderState), {}, E({}, e2, T(T({}, n2.renderState[e2]), t2)));
    }
    function ua(e2, t2) {
      return e2.toLocaleString(t2);
    }
    var la = l({ name: "instantsearch" });
    function da() {
      return "#";
    }
    var ha = { preserveSharedStateOnUnmount: false, persistHierarchicalRootCount: false }, fa = function() {
      U(p2, Xn);
      var m2 = q(p2);
      function p2(e2) {
        W(this, p2), E(y(n2 = m2.call(this)), "client", void 0), E(y(n2), "indexName", void 0), E(y(n2), "insightsClient", void 0), E(y(n2), "onStateChange", null), E(y(n2), "future", void 0), E(y(n2), "helper", void 0), E(y(n2), "mainHelper", void 0), E(y(n2), "mainIndex", void 0), E(y(n2), "started", void 0), E(y(n2), "templatesConfig", void 0), E(y(n2), "renderState", {}), E(y(n2), "_stalledSearchDelay", void 0), E(y(n2), "_searchStalledTimer", void 0), E(y(n2), "_initialUiState", void 0), E(y(n2), "_initialResults", void 0), E(y(n2), "_createURL", void 0), E(y(n2), "_searchFunction", void 0), E(y(n2), "_mainHelperSearch", void 0), E(y(n2), "_insights", void 0), E(y(n2), "middleware", []), E(y(n2), "sendEventToInsights", void 0), E(y(n2), "status", "idle"), E(y(n2), "error", void 0), E(y(n2), "scheduleSearch", Re(function() {
          n2.started && n2.mainHelper.search();
        })), E(y(n2), "scheduleRender", Re(function() {
          var e3, t3 = !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0];
          null != (e3 = n2.mainHelper) && e3.hasPendingRequests() || (clearTimeout(n2._searchStalledTimer), n2._searchStalledTimer = null, t3 && (n2.status = "idle", n2.error = void 0)), n2.mainIndex.render({ instantSearchInstance: y(n2) }), n2.emit("render");
        })), E(y(n2), "onInternalStateChange", Re(function() {
          var t3 = n2.mainIndex.getWidgetUiState({});
          n2.middleware.forEach(function(e3) {
            e3.instance.onStateChange({ uiState: t3 });
          });
        })), n2.setMaxListeners(100);
        var n2, r2, t2 = e2.indexName, t2 = void 0 === t2 ? "" : t2, i2 = e2.numberLocale, a2 = e2.initialUiState, a2 = void 0 === a2 ? {} : a2, s2 = e2.routing, s2 = void 0 === s2 ? null : s2, o2 = e2.insights, o2 = void 0 === o2 ? void 0 : o2, c2 = e2.searchFunction, u2 = e2.stalledSearchDelay, u2 = void 0 === u2 ? 200 : u2, l2 = e2.searchClient, l2 = void 0 === l2 ? null : l2, d2 = e2.insightsClient, d2 = void 0 === d2 ? null : d2, h2 = e2.onStateChange, h2 = void 0 === h2 ? null : h2, f2 = e2.future, e2 = void 0 === f2 ? T(T({}, ha), e2.future || {}) : f2;
        if (null === l2) throw new Error(la("The `searchClient` option is required."));
        if ("function" != typeof l2.search) throw new Error("The `searchClient` must implement a `search` method.\n\nSee: https://www.algolia.com/doc/guides/building-search-ui/going-further/backend-search/in-depth/backend-instantsearch/js/");
        if ("function" == typeof l2.addAlgoliaAgent && l2.addAlgoliaAgent("instantsearch.js (".concat("4.68.1", ")")), d2 && "function" != typeof d2) throw new Error(la("The `insightsClient` option should be a function."));
        return n2.client = l2, n2.future = e2, n2.insightsClient = d2, n2.indexName = t2, n2.helper = null, n2.mainHelper = null, n2.mainIndex = oa({ indexName: t2 }), n2.onStateChange = h2, n2.started = false, n2.templatesConfig = { helpers: (r2 = { numberLocale: i2 }.numberLocale, { formatNumber: function(e3, t3) {
          return ua(Number(t3(e3)), r2);
        }, highlight: function(e3, t3) {
          try {
            return t3(ri(T(T({}, JSON.parse(e3)), {}, { hit: this })));
          } catch (e4) {
            throw new Error('\nThe highlight helper expects a JSON object of the format:\n{ "attribute": "name", "highlightedTagName": "mark" }');
          }
        }, reverseHighlight: function(e3, t3) {
          try {
            return t3(ai(T(T({}, JSON.parse(e3)), {}, { hit: this })));
          } catch (e4) {
            throw new Error('\n  The reverseHighlight helper expects a JSON object of the format:\n  { "attribute": "name", "highlightedTagName": "mark" }');
          }
        }, snippet: function(e3, t3) {
          try {
            return t3(oi(T(T({}, JSON.parse(e3)), {}, { hit: this })));
          } catch (e4) {
            throw new Error('\nThe snippet helper expects a JSON object of the format:\n{ "attribute": "name", "highlightedTagName": "mark" }');
          }
        }, reverseSnippet: function(e3, t3) {
          try {
            return t3(ui(T(T({}, JSON.parse(e3)), {}, { hit: this })));
          } catch (e4) {
            throw new Error('\n  The reverseSnippet helper expects a JSON object of the format:\n  { "attribute": "name", "highlightedTagName": "mark" }');
          }
        }, insights: function(e3, t3) {
          try {
            var n3 = JSON.parse(e3), r3 = n3.method, i3 = n3.payload;
            return t3(Zt(r3, T({ objectIDs: [this.objectID] }, i3)));
          } catch (e4) {
            throw new Error('\nThe insights helper expects a JSON object of the format:\n{ "method": "method-name", "payload": { "eventName": "name of the event" } }');
          }
        } }), compileOptions: {} }, n2._stalledSearchDelay = u2, n2._searchStalledTimer = null, n2._createURL = da, n2._initialUiState = a2, n2._initialResults = null, n2._insights = o2, c2 && (n2._searchFunction = c2), n2.sendEventToInsights = R, s2 && ((f2 = "boolean" == typeof s2 ? {} : s2).$$internal = true, n2.use(Gi(f2))), o2 && ((l2 = "boolean" == typeof o2 ? {} : o2).$$internal = true, n2.use(vi(l2))), Ri() && n2.use(Si({ $$internal: true })), n2;
      }
      return D(p2, [{ key: "_isSearchStalled", get: function() {
        return "stalled" === this.status;
      } }, { key: "use", value: function() {
        for (var n2 = this, e2 = arguments.length, t2 = new Array(e2), r2 = 0; r2 < e2; r2++) t2[r2] = arguments[r2];
        var i2 = t2.map(function(e3) {
          var t3 = T({ $$type: "__unknown__", $$internal: false, subscribe: R, started: R, unsubscribe: R, onStateChange: R }, e3({ instantSearchInstance: n2 }));
          return n2.middleware.push({ creator: e3, instance: t3 }), t3;
        });
        return this.started && i2.forEach(function(e3) {
          e3.subscribe(), e3.started();
        }), this;
      } }, { key: "unuse", value: function() {
        for (var e2 = arguments.length, t2 = new Array(e2), n2 = 0; n2 < e2; n2++) t2[n2] = arguments[n2];
        return this.middleware.filter(function(e3) {
          return t2.includes(e3.creator);
        }).forEach(function(e3) {
          return e3.instance.unsubscribe();
        }), this.middleware = this.middleware.filter(function(e3) {
          return !t2.includes(e3.creator);
        }), this;
      } }, { key: "EXPERIMENTAL_use", value: function() {
        return this.use.apply(this, arguments);
      } }, { key: "addWidget", value: function(e2) {
        return this.addWidgets([e2]);
      } }, { key: "addWidgets", value: function(e2) {
        if (!Array.isArray(e2)) throw new Error(la("The `addWidgets` method expects an array of widgets. Please use `addWidget`."));
        if (e2.some(function(e3) {
          return "function" != typeof e3.init && "function" != typeof e3.render;
        })) throw new Error(la("The widget definition expects a `render` and/or an `init` method."));
        return this.mainIndex.addWidgets(e2), this;
      } }, { key: "removeWidget", value: function(e2) {
        return this.removeWidgets([e2]);
      } }, { key: "removeWidgets", value: function(e2) {
        if (!Array.isArray(e2)) throw new Error(la("The `removeWidgets` method expects an array of widgets. Please use `removeWidget`."));
        if (e2.some(function(e3) {
          return "function" != typeof e3.dispose;
        })) throw new Error(la("The widget definition expects a `dispose` method."));
        return this.mainIndex.removeWidgets(e2), this;
      } }, { key: "start", value: function() {
        var r2 = this;
        if (this.started) throw new Error(la("The `start` method has already been called once."));
        var n2, e2, i2 = this.mainHelper || g(this.client, this.indexName, void 0, { persistHierarchicalRootCount: this.future.persistHierarchicalRootCount });
        i2.search = function() {
          return r2.status = "loading", r2.scheduleRender(false), i2.searchOnlyWithDerivedHelpers() && i2.recommend();
        }, this._searchFunction && (n2 = { search: function() {
          return new Promise(R);
        } }, this._mainHelperSearch = i2.search.bind(i2), i2.search = function() {
          var t2 = r2.mainIndex.getHelper(), e3 = g(n2, t2.state.index, t2.state);
          return e3.once("search", function(e4) {
            e4 = e4.state;
            t2.overrideStateWithoutTriggeringChangeEvent(e4), r2._mainHelperSearch();
          }), e3.on("change", function(e4) {
            e4 = e4.state;
            t2.setState(e4);
          }), r2._searchFunction(e3), i2;
        }), i2.on("error", function(e3) {
          var n3, e3 = e3.error;
          e3 instanceof Error || (n3 = e3, e3 = Object.keys(n3).reduce(function(e4, t2) {
            return e4[t2] = n3[t2], e4;
          }, new Error(n3.message))), e3.error = e3, r2.error = e3, r2.status = "error", r2.scheduleRender(false), r2.emit("error", e3);
        }), this.mainHelper = i2, this.middleware.forEach(function(e3) {
          e3.instance.subscribe();
        }), this.mainIndex.init({ instantSearchInstance: this, parent: null, uiState: this._initialUiState }), this._initialResults ? (je(this.client, this._initialResults), e2 = this.scheduleSearch, this.scheduleSearch = Re(R), Re(function() {
          r2.scheduleSearch = e2;
        })()) : 0 < this.mainIndex.getWidgets().length && this.scheduleSearch(), this.helper = this.mainIndex.getHelper(), this.started = true, this.middleware.forEach(function(e3) {
          e3.instance.started();
        }), void 0 === this._insights && i2.derivedHelpers[0].once("result", function() {
          r2.mainIndex.getScopedResults().some(function(e3) {
            e3 = e3.results;
            return null == e3 ? void 0 : e3._automaticInsights;
          }) && r2.use(vi({ $$internal: true, $$automatic: true }));
        });
      } }, { key: "dispose", value: function() {
        var e2;
        this.scheduleSearch.cancel(), this.scheduleRender.cancel(), clearTimeout(this._searchStalledTimer), this.removeWidgets(this.mainIndex.getWidgets()), this.mainIndex.dispose(), this.started = false, this.removeAllListeners(), null != (e2 = this.mainHelper) && e2.removeAllListeners(), this.mainHelper = null, this.helper = null, this.middleware.forEach(function(e3) {
          e3.instance.unsubscribe();
        });
      } }, { key: "scheduleStalledRender", value: function() {
        var e2 = this;
        this._searchStalledTimer || (this._searchStalledTimer = setTimeout(function() {
          e2.status = "stalled", e2.scheduleRender();
        }, this._stalledSearchDelay));
      } }, { key: "setUiState", value: function(e2) {
        var t2 = this, n2 = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
        if (!this.mainHelper) throw new Error(la("The `start` method needs to be called before `setUiState`."));
        this.mainIndex.refreshUiState();
        var r2 = "function" == typeof e2 ? e2(this.mainIndex.getWidgetUiState({})) : e2;
        this.onStateChange && n2 ? this.onStateChange({ uiState: r2, setUiState: function(e3) {
          ve("function" == typeof e3 ? e3(r2) : e3, t2.mainIndex), t2.scheduleSearch(), t2.onInternalStateChange();
        } }) : (ve(r2, this.mainIndex), this.scheduleSearch(), this.onInternalStateChange());
      } }, { key: "getUiState", value: function() {
        return this.started && this.mainIndex.refreshUiState(), this.mainIndex.getWidgetUiState({});
      } }, { key: "createURL", value: function() {
        if (this.started) return this._createURL(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {});
        throw new Error(la("The `start` method needs to be called before `createURL`."));
      } }, { key: "refresh", value: function() {
        if (!this.mainHelper) throw new Error(la("The `start` method needs to be called before `refresh`."));
        this.mainHelper.clearCache().search();
      } }]), p2;
    }(), en = Object.freeze({ __proto__: null, history: Ji }), ma = ["configure"];
    function pa(e2) {
      e2.configure;
      return k(e2, ma);
    }
    ln = Object.freeze({ __proto__: null, simple: Xi, singleIndex: function(t2) {
      return { $$type: "ais.singleIndex", stateToRoute: function(e2) {
        return pa(e2[t2] || {});
      }, routeToState: function() {
        return E({}, t2, pa(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}));
      } };
    } }), ir = Object.freeze({ __proto__: null, createInsightsMiddleware: vi, createRouterMiddleware: Gi, isMetadataEnabled: Ri, createMetadataMiddleware: Si });
    function ga(e2) {
      return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
    }
    function va(e2, t2) {
      return e2(t2 = { exports: {} }, t2.exports), t2.exports;
    }
    var ya = ga(va(function(e2) {
      function t2() {
        return e2.exports = t2 = Object.assign ? Object.assign.bind() : function(e3) {
          for (var t3 = 1; t3 < arguments.length; t3++) {
            var n2, r2 = arguments[t3];
            for (n2 in r2) Object.prototype.hasOwnProperty.call(r2, n2) && (e3[n2] = r2[n2]);
          }
          return e3;
        }, e2.exports.__esModule = true, e2.exports.default = e2.exports, t2.apply(this, arguments);
      }
      e2.exports = t2, e2.exports.__esModule = true, e2.exports.default = e2.exports;
    })), ba = va(function(e2) {
      e2.exports = function(e3, t2) {
        if (null == e3) return {};
        for (var n2, r2 = {}, i2 = Object.keys(e3), a2 = 0; a2 < i2.length; a2++) n2 = i2[a2], 0 <= t2.indexOf(n2) || (r2[n2] = e3[n2]);
        return r2;
      }, e2.exports.__esModule = true, e2.exports.default = e2.exports;
    }), e = (ga(ba), va(function(e2) {
      e2.exports = function(e3, t2) {
        if (null == e3) return {};
        var n2, r2 = ba(e3, t2);
        if (Object.getOwnPropertySymbols) for (var i2 = Object.getOwnPropertySymbols(e3), a2 = 0; a2 < i2.length; a2++) n2 = i2[a2], 0 <= t2.indexOf(n2) || Object.prototype.propertyIsEnumerable.call(e3, n2) && (r2[n2] = e3[n2]);
        return r2;
      }, e2.exports.__esModule = true, e2.exports.default = e2.exports;
    })), Ra = ga(e);
    function F() {
      for (var e2 = arguments.length, t2 = new Array(e2), n2 = 0; n2 < e2; n2++) t2[n2] = arguments[n2];
      return t2.reduce(function(e3, t3) {
        return Array.isArray(t3) ? e3.concat(t3) : e3.concat([t3]);
      }, []).filter(Boolean).join(" ");
    }
    var Sa = ["parts", "highlightedTagName", "nonHighlightedTagName", "separator", "className", "classNames"];
    var _a = ["classNames", "hits", "itemComponent", "sendEvent", "emptyComponent", "banner", "bannerComponent"];
    function O(e2) {
      var t2 = e2.defaultTemplates, n2 = e2.templates;
      return T({ templatesConfig: e2.templatesConfig }, function(a2, e3) {
        var s2 = 1 < arguments.length && void 0 !== e3 ? e3 : {};
        return Ae([].concat(w(Object.keys(a2 || {})), w(Object.keys(s2)))).reduce(function(e4, t3) {
          var n3 = a2 ? a2[t3] : void 0, r2 = s2[t3], i2 = void 0 !== r2 && r2 !== n3;
          return e4.templates[t3] = i2 ? r2 : n3, e4.useCustomCompileOptions[t3] = i2, e4;
        }, { templates: {}, useCustomCompileOptions: {} });
      }(t2, n2));
    }
    var e = va(function(e2, t2) {
      function b2(e3) {
        return e3.trim ? e3.trim() : e3.replace(/^\s*|\s*$/g, "");
      }
      function R2(e3, t3, n3) {
        if (t3.charAt(n3) == e3.charAt(0)) {
          for (var r3 = 1, i3 = e3.length; r3 < i3; r3++) if (t3.charAt(n3 + r3) != e3.charAt(r3)) return;
          return 1;
        }
      }
      function c2(e3, t3, n3, r3) {
        for (var i3 = [], a3 = null, s3 = null, o3 = n3[n3.length - 1]; 0 < e3.length; ) {
          if (s3 = e3.shift(), o3 && "<" == o3.tag && !(s3.tag in p2)) throw new Error("Illegal content in < super tag.");
          if (S2.tags[s3.tag] <= S2.tags.$ || function(e4, t4) {
            for (var n4 = 0, r4 = t4.length; n4 < r4; n4++) if (t4[n4].o == e4.n) return e4.tag = "#";
          }(s3, r3)) n3.push(s3), s3.nodes = c2(e3, s3.tag, n3, r3);
          else {
            if ("/" == s3.tag) {
              if (0 === n3.length) throw new Error("Closing tag without opener: /" + s3.n);
              if (a3 = n3.pop(), s3.n == a3.n || function(e4, t4, n4) {
                for (var r4 = 0, i4 = n4.length; r4 < i4; r4++) if (n4[r4].c == e4 && n4[r4].o == t4) return 1;
              }(s3.n, a3.n, r3)) return a3.end = s3.i, i3;
              throw new Error("Nesting error: " + a3.n + " vs. " + s3.n);
            }
            "\n" == s3.tag && (s3.last = 0 == e3.length || "\n" == e3[0].tag);
          }
          i3.push(s3);
        }
        if (0 < n3.length) throw new Error("missing closing tag: " + n3.pop().n);
        return i3;
      }
      function r2(e3) {
        var t3, n3 = [];
        for (t3 in e3.partials) n3.push('"' + i2(t3) + '":{name:"' + i2(e3.partials[t3].name) + '", ' + r2(e3.partials[t3]) + "}");
        return "partials: {" + n3.join(",") + "}, subs: " + function(e4) {
          var t4, n4 = [];
          for (t4 in e4) n4.push('"' + i2(t4) + '": function(c,p,t,i) {' + e4[t4] + "}");
          return "{ " + n4.join(",") + " }";
        }(e3.subs);
      }
      function i2(e3) {
        return e3.replace(h2, "\\\\").replace(u2, '\\"').replace(l2, "\\n").replace(d2, "\\r").replace(f2, "\\u2028").replace(m2, "\\u2029");
      }
      function n2(e3) {
        return ~e3.indexOf(".") ? "d" : "f";
      }
      function a2(e3, t3) {
        var n3 = "<" + (t3.prefix || "") + e3.n + g2++;
        return t3.partials[n3] = { name: e3.n, partials: {} }, t3.code += 't.b(t.rp("' + i2(n3) + '",c,p,"' + (e3.indent || "") + '"));', n3;
      }
      function s2(e3, t3) {
        t3.code += "t.b(t.t(t." + n2(e3.n) + '("' + i2(e3.n) + '",c,p,0)));';
      }
      function o2(e3) {
        return "t.b(" + e3 + ");";
      }
      var S2, _2, u2, l2, d2, h2, f2, m2, p2, g2;
      _2 = /\S/, u2 = /\"/g, l2 = /\n/g, d2 = /\r/g, h2 = /\\/g, f2 = /\u2028/, m2 = /\u2029/, (S2 = t2).tags = { "#": 1, "^": 2, "<": 3, $: 4, "/": 5, "!": 6, ">": 7, "=": 8, _v: 9, "{": 10, "&": 11, _t: 12 }, S2.scan = function(e3, t3) {
        var n3, r3, i3, a3, s3, o3 = e3.length, c3 = 0, u3 = null, l3 = "", d3 = [], h3 = false, f3 = 0, m3 = 0, p3 = "{{", g3 = "}}";
        function v2() {
          0 < l3.length && (d3.push({ tag: "_t", text: new String(l3) }), l3 = "");
        }
        function y2(e4, t4) {
          if (v2(), e4 && function() {
            for (var e5 = true, t5 = m3; t5 < d3.length; t5++) if (!(e5 = S2.tags[d3[t5].tag] < S2.tags._v || "_t" == d3[t5].tag && null === d3[t5].text.match(_2))) return;
            return e5;
          }()) for (var n4, r4 = m3; r4 < d3.length; r4++) d3[r4].text && ((n4 = d3[r4 + 1]) && ">" == n4.tag && (n4.indent = d3[r4].text.toString()), d3.splice(r4, 1));
          else t4 || d3.push({ tag: "\n" });
          h3 = false, m3 = d3.length;
        }
        for (t3 && (t3 = t3.split(" "), p3 = t3[0], g3 = t3[1]), f3 = 0; f3 < o3; f3++) 0 == c3 ? R2(p3, e3, f3) ? (--f3, v2(), c3 = 1) : "\n" == e3.charAt(f3) ? y2(h3) : l3 += e3.charAt(f3) : 1 == c3 ? (f3 += p3.length - 1, c3 = "=" == (u3 = (n3 = S2.tags[e3.charAt(f3 + 1)]) ? e3.charAt(f3 + 1) : "_v") ? (i3 = f3, s3 = a3 = void 0, a3 = "=" + g3, s3 = (r3 = e3).indexOf(a3, i3), r3 = b2(r3.substring(r3.indexOf("=", i3) + 1, s3)).split(" "), p3 = r3[0], g3 = r3[r3.length - 1], f3 = s3 + a3.length - 1, 0) : (n3 && f3++, 2), h3 = f3) : R2(g3, e3, f3) ? (d3.push({ tag: u3, n: b2(l3), otag: p3, ctag: g3, i: "/" == u3 ? h3 - p3.length : f3 + g3.length }), l3 = "", f3 += g3.length - 1, c3 = 0, "{" == u3 && ("}}" == g3 ? f3++ : "}" === (i3 = d3[d3.length - 1]).n.substr(i3.n.length - 1) && (i3.n = i3.n.substring(0, i3.n.length - 1)))) : l3 += e3.charAt(f3);
        return y2(h3, true), d3;
      }, p2 = { _t: true, "\n": true, $: true, "/": true }, S2.stringify = function(e3, t3, n3) {
        return "{code: function (c,p,i) { " + S2.wrapMain(e3.code) + " }," + r2(e3) + "}";
      }, g2 = 0, S2.generate = function(e3, t3, n3) {
        g2 = 0;
        var r3 = { code: "", subs: {}, partials: {} };
        return S2.walk(e3, r3), n3.asString ? this.stringify(r3, t3, n3) : this.makeTemplate(r3, t3, n3);
      }, S2.wrapMain = function(e3) {
        return 'var t=this;t.b(i=i||"");' + e3 + "return t.fl();";
      }, S2.template = S2.Template, S2.makeTemplate = function(e3, t3, n3) {
        var r3 = this.makePartials(e3);
        return r3.code = new Function("c", "p", "i", this.wrapMain(e3.code)), new this.template(r3, t3, this, n3);
      }, S2.makePartials = function(e3) {
        var t3, n3 = { subs: {}, partials: e3.partials, name: e3.name };
        for (t3 in n3.partials) n3.partials[t3] = this.makePartials(n3.partials[t3]);
        for (t3 in e3.subs) n3.subs[t3] = new Function("c", "p", "t", "i", e3.subs[t3]);
        return n3;
      }, S2.codegen = { "#": function(e3, t3) {
        t3.code += "if(t.s(t." + n2(e3.n) + '("' + i2(e3.n) + '",c,p,1),c,p,0,' + e3.i + "," + e3.end + ',"' + e3.otag + " " + e3.ctag + '")){t.rs(c,p,function(c,p,t){', S2.walk(e3.nodes, t3), t3.code += "});c.pop();}";
      }, "^": function(e3, t3) {
        t3.code += "if(!t.s(t." + n2(e3.n) + '("' + i2(e3.n) + '",c,p,1),c,p,1,0,0,"")){', S2.walk(e3.nodes, t3), t3.code += "};";
      }, ">": a2, "<": function(e3, t3) {
        var n3 = { partials: {}, code: "", subs: {}, inPartial: true }, e3 = (S2.walk(e3.nodes, n3), t3.partials[a2(e3, t3)]);
        e3.subs = n3.subs, e3.partials = n3.partials;
      }, $: function(e3, t3) {
        var n3 = { subs: {}, code: "", partials: t3.partials, prefix: e3.n };
        S2.walk(e3.nodes, n3), t3.subs[e3.n] = n3.code, t3.inPartial || (t3.code += 't.sub("' + i2(e3.n) + '",c,p,i);');
      }, "\n": function(e3, t3) {
        t3.code += o2('"\\n"' + (e3.last ? "" : " + i"));
      }, _v: function(e3, t3) {
        t3.code += "t.b(t.v(t." + n2(e3.n) + '("' + i2(e3.n) + '",c,p,0)));';
      }, _t: function(e3, t3) {
        t3.code += o2('"' + i2(e3.text) + '"');
      }, "{": s2, "&": s2 }, S2.walk = function(e3, t3) {
        for (var n3, r3 = 0, i3 = e3.length; r3 < i3; r3++) (n3 = S2.codegen[e3[r3].tag]) && n3(e3[r3], t3);
        return t3;
      }, S2.parse = function(e3, t3, n3) {
        return c2(e3, 0, [], (n3 = n3 || {}).sectionTags || []);
      }, S2.cache = {}, S2.cacheKey = function(e3, t3) {
        return [e3, !!t3.asString, !!t3.disableLambda, t3.delimiters, !!t3.modelGet].join("||");
      }, S2.compile = function(e3, t3) {
        var n3 = S2.cacheKey(e3, t3 = t3 || {}), r3 = this.cache[n3];
        if (r3) {
          var i3, a3 = r3.partials;
          for (i3 in a3) delete a3[i3].instance;
          return r3;
        }
        return r3 = this.generate(this.parse(this.scan(e3, t3.delimiters), e3, t3), e3, t3), this.cache[n3] = r3;
      };
    }), wa = va(function(e2, t2) {
      function l2(e3, t3, n3) {
        var r3;
        return t3 && "object" == typeof t3 && (void 0 !== t3[e3] ? r3 = t3[e3] : n3 && t3.get && "function" == typeof t3.get && (r3 = t3.get(e3))), r3;
      }
      function s2(e3) {
        return String(null == e3 ? "" : e3);
      }
      var n2, r2, i2, a2, o2, c2, d2;
      (t2 = t2).Template = function(e3, t3, n3, r3) {
        this.r = (e3 = e3 || {}).code || this.r, this.c = n3, this.options = r3 || {}, this.text = t3 || "", this.partials = e3.partials || {}, this.subs = e3.subs || {}, this.buf = "";
      }, t2.Template.prototype = { r: function(e3, t3, n3) {
        return "";
      }, v: function(e3) {
        return e3 = s2(e3), c2.test(e3) ? e3.replace(n2, "&amp;").replace(r2, "&lt;").replace(i2, "&gt;").replace(a2, "&#39;").replace(o2, "&quot;") : e3;
      }, t: s2, render: function(e3, t3, n3) {
        return this.ri([e3], t3 || {}, n3);
      }, ri: function(e3, t3, n3) {
        return this.r(e3, t3, n3);
      }, ep: function(e3, t3) {
        var n3 = this.partials[e3], r3 = t3[n3.name];
        if (n3.instance && n3.base == r3) return n3.instance;
        if ("string" == typeof r3) {
          if (!this.c) throw new Error("No compiler available.");
          r3 = this.c.compile(r3, this.options);
        }
        if (!r3) return null;
        if (this.partials[e3].base = r3, n3.subs) {
          for (key in t3.stackText || (t3.stackText = {}), n3.subs) t3.stackText[key] || (t3.stackText[key] = void 0 !== this.activeSub && t3.stackText[this.activeSub] ? t3.stackText[this.activeSub] : this.text);
          r3 = function(e4, t4, n4, r4, i3, a3) {
            function s3() {
            }
            function o3() {
            }
            o3.prototype = (s3.prototype = e4).subs;
            var c3, u2 = new s3();
            for (c3 in u2.subs = new o3(), u2.subsText = {}, u2.buf = "", r4 = r4 || {}, u2.stackSubs = r4, u2.subsText = a3, t4) r4[c3] || (r4[c3] = t4[c3]);
            for (c3 in r4) u2.subs[c3] = r4[c3];
            for (c3 in i3 = i3 || {}, u2.stackPartials = i3, n4) i3[c3] || (i3[c3] = n4[c3]);
            for (c3 in i3) u2.partials[c3] = i3[c3];
            return u2;
          }(r3, n3.subs, n3.partials, this.stackSubs, this.stackPartials, t3.stackText);
        }
        return this.partials[e3].instance = r3;
      }, rp: function(e3, t3, n3, r3) {
        e3 = this.ep(e3, n3);
        return e3 ? e3.ri(t3, n3, r3) : "";
      }, rs: function(e3, t3, n3) {
        var r3 = e3[e3.length - 1];
        if (d2(r3)) for (var i3 = 0; i3 < r3.length; i3++) e3.push(r3[i3]), n3(e3, t3, this), e3.pop();
        else n3(e3, t3, this);
      }, s: function(e3, t3, n3, r3, i3, a3, s3) {
        return (!d2(e3) || 0 !== e3.length) && (n3 = !!(e3 = "function" == typeof e3 ? this.ms(e3, t3, n3, r3, i3, a3, s3) : e3), !r3 && n3 && t3 && t3.push("object" == typeof e3 ? e3 : t3[t3.length - 1]), n3);
      }, d: function(e3, t3, n3, r3) {
        var i3, a3 = e3.split("."), s3 = this.f(a3[0], t3, n3, r3), o3 = this.options.modelGet, c3 = null;
        if ("." === e3 && d2(t3[t3.length - 2])) s3 = t3[t3.length - 1];
        else for (var u2 = 1; u2 < a3.length; u2++) s3 = void 0 !== (i3 = l2(a3[u2], s3, o3)) ? (c3 = s3, i3) : "";
        return !(r3 && !s3) && (r3 || "function" != typeof s3 || (t3.push(c3), s3 = this.mv(s3, t3, n3), t3.pop()), s3);
      }, f: function(e3, t3, n3, r3) {
        for (var i3 = false, a3 = false, s3 = this.options.modelGet, o3 = t3.length - 1; 0 <= o3; o3--) if (void 0 !== (i3 = l2(e3, t3[o3], s3))) {
          a3 = true;
          break;
        }
        return a3 ? r3 || "function" != typeof i3 ? i3 : this.mv(i3, t3, n3) : !r3 && "";
      }, ls: function(e3, t3, n3, r3, i3) {
        var a3 = this.options.delimiters;
        return this.options.delimiters = i3, this.b(this.ct(s2(e3.call(t3, r3)), t3, n3)), this.options.delimiters = a3, false;
      }, ct: function(e3, t3, n3) {
        if (this.options.disableLambda) throw new Error("Lambda features disabled.");
        return this.c.compile(e3, this.options).render(t3, n3);
      }, b: function(e3) {
        this.buf += e3;
      }, fl: function() {
        var e3 = this.buf;
        return this.buf = "", e3;
      }, ms: function(e3, t3, n3, r3, i3, a3, s3) {
        t3 = t3[t3.length - 1], e3 = e3.call(t3);
        return "function" == typeof e3 ? !!r3 || (r3 = this.activeSub && this.subsText && this.subsText[this.activeSub] ? this.subsText[this.activeSub] : this.text, this.ls(e3, t3, n3, r3.substring(i3, a3), s3)) : e3;
      }, mv: function(e3, t3, n3) {
        t3 = t3[t3.length - 1], e3 = e3.call(t3);
        return "function" == typeof e3 ? this.ct(s2(e3.call(t3)), t3, n3) : e3;
      }, sub: function(e3, t3, n3, r3) {
        var i3 = this.subs[e3];
        i3 && (this.activeSub = e3, i3(t3, n3, this, r3), this.activeSub = false);
      } }, n2 = /&/g, r2 = /</g, i2 = />/g, a2 = /\'/g, o2 = /\"/g, c2 = /[&<>\"\']/, d2 = Array.isArray || function(e3) {
        return "[object Array]" === Object.prototype.toString.call(e3);
      };
    }), Pa = (e.Template = wa.Template, e.template = e.Template, e), Na = function(e2, t2, n2, r2) {
      t2[0] = 0;
      for (var i2 = 1; i2 < t2.length; i2++) {
        var a2 = t2[i2++], s2 = t2[i2] ? (t2[0] |= a2 ? 1 : 2, n2[t2[i2++]]) : t2[++i2];
        3 === a2 ? r2[0] = s2 : 4 === a2 ? r2[1] = Object.assign(r2[1] || {}, s2) : 5 === a2 ? (r2[1] = r2[1] || {})[t2[++i2]] = s2 : 6 === a2 ? r2[1][t2[++i2]] += s2 + "" : a2 ? (a2 = e2.apply(s2, Na(e2, s2, n2, ["", null])), r2.push(a2), s2[0] ? t2[0] |= 2 : (t2[i2 - 2] = 0, t2[i2] = a2)) : r2.push(s2);
      }
      return r2;
    }, xa = /* @__PURE__ */ new Map();
    var Ia, Fa, Ca, Ta = (function(e2) {
      var t2 = xa.get(this);
      return t2 || (t2 = /* @__PURE__ */ new Map(), xa.set(this, t2)), 1 < (t2 = Na(this, t2.get(e2) || (t2.set(e2, t2 = function(e3) {
        for (var t3, n2, r2 = 1, i2 = "", a2 = "", s2 = [0], o2 = function(e4) {
          1 === r2 && (e4 || (i2 = i2.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? s2.push(0, e4, i2) : 3 === r2 && (e4 || i2) ? (s2.push(3, e4, i2), r2 = 2) : 2 === r2 && "..." === i2 && e4 ? s2.push(4, e4, 0) : 2 === r2 && i2 && !e4 ? s2.push(5, 0, true, i2) : 5 <= r2 && ((i2 || !e4 && 5 === r2) && (s2.push(r2, 0, i2, n2), r2 = 6), e4) && (s2.push(r2, e4, 0, n2), r2 = 6), i2 = "";
        }, c2 = 0; c2 < e3.length; c2++) {
          c2 && (1 === r2 && o2(), o2(c2));
          for (var u2 = 0; u2 < e3[c2].length; u2++) t3 = e3[c2][u2], 1 === r2 ? "<" === t3 ? (o2(), s2 = [s2], r2 = 3) : i2 += t3 : 4 === r2 ? i2 = "--" === i2 && ">" === t3 ? (r2 = 1, "") : t3 + i2[0] : a2 ? t3 === a2 ? a2 = "" : i2 += t3 : '"' === t3 || "'" === t3 ? a2 = t3 : ">" === t3 ? (o2(), r2 = 1) : r2 && ("=" === t3 ? (r2 = 5, n2 = i2, i2 = "") : "/" === t3 && (r2 < 5 || ">" === e3[c2][u2 + 1]) ? (o2(), 3 === r2 && (s2 = s2[0]), (s2 = (r2 = s2)[0]).push(2, 0, r2), r2 = 0) : " " === t3 || "	" === t3 || "\n" === t3 || "\r" === t3 ? (o2(), r2 = 2) : i2 += t3), 3 === r2 && "!--" === i2 && (r2 = 4, s2 = s2[0]);
        }
        return o2(), s2;
      }(e2)), t2), arguments, [])).length ? t2 : t2[0];
    }).bind(M), Ea = (Fa = (wa = { createElement: M, Fragment: x }).createElement, Ca = wa.Fragment, Ia = { createElement: Fa, Fragment: Ca }.createElement, function(e2) {
      var r2 = e2.parts, t2 = e2.highlightedTagName, i2 = void 0 === t2 ? "mark" : t2, t2 = e2.nonHighlightedTagName, a2 = void 0 === t2 ? "span" : t2, t2 = e2.separator, s2 = void 0 === t2 ? ", " : t2, t2 = e2.className, n2 = e2.classNames, o2 = void 0 === n2 ? {} : n2, n2 = Ra(e2, Sa);
      return Fa("span", ya({}, n2, { className: F(o2.root, t2) }), r2.map(function(e3, t3) {
        var n3 = t3 === r2.length - 1;
        return Fa(Ca, { key: t3 }, e3.map(function(e4, t4) {
          return Fa(ka, { key: t4, classNames: o2, highlightedTagName: i2, nonHighlightedTagName: a2, isHighlighted: e4.isHighlighted }, e4.value);
        }), !n3 && Fa("span", { className: o2.separator }, s2));
      }));
    });
    function ka(e2) {
      var t2 = e2.classNames, n2 = e2.children, r2 = e2.highlightedTagName, i2 = e2.isHighlighted, e2 = e2.nonHighlightedTagName;
      return Ia(i2 ? r2 : e2, { className: i2 ? t2.highlighted : t2.nonHighlighted }, n2);
    }
    var ja = ["classNames"];
    function Ma(e2) {
      var t2 = e2.classNames, t2 = void 0 === t2 ? {} : t2, e2 = k(e2, ja);
      return M(Ea, m({ classNames: { root: F("ais-Highlight", t2.root), highlighted: F("ais-Highlight-highlighted", t2.highlighted), nonHighlighted: F("ais-Highlight-nonHighlighted", t2.nonHighlighted), separator: F("ais-Highlight-separator", t2.separator) } }, e2));
    }
    var La = ["hit", "attribute", "cssClasses"];
    function Oa(e2) {
      var t2 = e2.hit, n2 = e2.attribute, r2 = e2.cssClasses;
      return M(Ma, m({}, k(e2, La), { parts: it(Ie(t2._highlightResult, n2) || []).map(function(e3) {
        return Ne(re(e3.value || ""));
      }), classNames: r2 }));
    }
    var Ha = ["classNames"];
    function Aa(e2) {
      var t2 = e2.classNames, t2 = void 0 === t2 ? {} : t2, e2 = k(e2, Ha);
      return M(Ea, m({ classNames: { root: F("ais-ReverseHighlight", t2.root), highlighted: F("ais-ReverseHighlight-highlighted", t2.highlighted), nonHighlighted: F("ais-ReverseHighlight-nonHighlighted", t2.nonHighlighted), separator: F("ais-ReverseHighlight-separator", t2.separator) } }, e2));
    }
    var Wa = ["hit", "attribute", "cssClasses"], Da = ["isHighlighted"];
    function Ua(e2) {
      var t2 = e2.hit, n2 = e2.attribute, r2 = e2.cssClasses;
      return M(Aa, m({}, k(e2, Wa), { parts: it(Ie(t2._highlightResult, n2) || []).map(function(e3) {
        return Ne(re(e3.value || "")).map(function(e4) {
          var t3 = e4.isHighlighted;
          return T(T({}, k(e4, Da)), {}, { isHighlighted: !t3 });
        });
      }), classNames: r2 }));
    }
    var $a = ["classNames"];
    function Ba(e2) {
      var t2 = e2.classNames, t2 = void 0 === t2 ? {} : t2, e2 = k(e2, $a);
      return M(Ea, m({ classNames: { root: F("ais-ReverseSnippet", t2.root), highlighted: F("ais-ReverseSnippet-highlighted", t2.highlighted), nonHighlighted: F("ais-ReverseSnippet-nonHighlighted", t2.nonHighlighted), separator: F("ais-ReverseSnippet-separator", t2.separator) } }, e2));
    }
    var Qa = ["hit", "attribute", "cssClasses"], qa = ["isHighlighted"];
    function Va(e2) {
      var t2 = e2.hit, n2 = e2.attribute, r2 = e2.cssClasses;
      return M(Ba, m({}, k(e2, Qa), { parts: it(Ie(t2._snippetResult, n2) || []).map(function(e3) {
        return Ne(re(e3.value || "")).map(function(e4) {
          var t3 = e4.isHighlighted;
          return T(T({}, k(e4, qa)), {}, { isHighlighted: !t3 });
        });
      }), classNames: r2 }));
    }
    var Ka = ["classNames"];
    function za(e2) {
      var t2 = e2.classNames, t2 = void 0 === t2 ? {} : t2, e2 = k(e2, Ka);
      return M(Ea, m({ classNames: { root: F("ais-Snippet", t2.root), highlighted: F("ais-Snippet-highlighted", t2.highlighted), nonHighlighted: F("ais-Snippet-nonHighlighted", t2.nonHighlighted), separator: F("ais-Snippet-separator", t2.separator) } }, e2));
    }
    var Ja = ["hit", "attribute", "cssClasses"];
    function Za(e2) {
      var t2 = e2.hit, n2 = e2.attribute, r2 = e2.cssClasses;
      return M(za, m({}, k(e2, Ja), { parts: it(Ie(t2._snippetResult, n2) || []).map(function(e3) {
        return Ne(re(e3.value || ""));
      }), classNames: r2 }));
    }
    function Ya(e2) {
      var t2 = e2.templates, n2 = e2.templateKey, r2 = e2.compileOptions, i2 = e2.helpers, a2 = e2.data, s2 = e2.bindEvent, e2 = e2.sendEvent, t2 = t2[n2];
      if ("string" != typeof t2 && "function" != typeof t2) throw new Error("Template must be 'string' or 'function', was '".concat(A(t2), "' (key: ").concat(n2, ")"));
      return "function" == typeof t2 ? ((n2 = s2 || {}).html = Ta, n2.sendEvent = e2, n2.components = { Highlight: Oa, ReverseHighlight: Ua, Snippet: Za, ReverseSnippet: Va }, t2(a2, n2)) : (s2 = function(e3, t3, n3) {
        var r3 = 0 < arguments.length && void 0 !== e3 ? e3 : {}, i3 = 1 < arguments.length ? t3 : void 0, a3 = 2 < arguments.length ? n3 : void 0;
        return Object.keys(r3).reduce(function(e4, n4) {
          return T(T({}, e4), {}, E({}, n4, function() {
            var t4 = this;
            return function(e5) {
              return r3[n4].call(a3, e5, function(e6) {
                return Pa.compile(e6, i3).render(t4);
              });
            };
          }));
        }, {});
      }(i2, r2, a2), Pa.compile(t2, r2).render(T(T({}, a2), {}, { helpers: s2 })).replace(/[ \n\r\t\f\xA0]+/g, function(e3) {
        return e3.replace(/(^|\xA0+)[^\xA0]+/g, "$1 ");
      }).trim());
    }
    var Xa = function() {
      U(a2, Ot);
      var i2 = q(a2);
      function a2() {
        var e2;
        W(this, a2);
        for (var t2 = arguments.length, n2 = new Array(t2), r2 = 0; r2 < t2; r2++) n2[r2] = arguments[r2];
        return E(y(e2 = i2.call.apply(i2, [this].concat(n2))), "ref", Lt()), E(y(e2), "nodes", []), e2;
      }
      return D(a2, [{ key: "componentDidMount", value: function() {
        var t2 = new DocumentFragment(), e2 = document.createElement("div");
        e2.innerHTML = this.props.content, this.nodes = w(e2.childNodes), this.nodes.forEach(function(e3) {
          return t2.appendChild(e3);
        }), this.ref.current.replaceWith(t2);
      } }, { key: "componentWillUnmount", value: function() {
        this.nodes.forEach(function(e2) {
          e2 instanceof Element ? e2.outerHTML = "" : e2.nodeValue = "";
        }), this.nodes[0].nodeValue && (this.nodes[0].nodeValue = "");
      } }, { key: "render", value: function() {
        return M("div", { ref: this.ref });
      } }]), a2;
    }(), v = function() {
      U(t2, Ot);
      var e2 = q(t2);
      function t2() {
        return W(this, t2), e2.apply(this, arguments);
      }
      return D(t2, [{ key: "shouldComponentUpdate", value: function(e3) {
        return !Oe(this.props.data, e3.data) || this.props.templateKey !== e3.templateKey || !Oe(this.props.rootProps, e3.rootProps);
      } }, { key: "render", value: function() {
        var e3 = "fragment" === this.props.rootTagName ? x : this.props.rootTagName, t3 = this.props.useCustomCompileOptions[this.props.templateKey] ? this.props.templatesConfig.compileOptions : {}, t3 = Ya({ templates: this.props.templates, templateKey: this.props.templateKey, compileOptions: t3, helpers: this.props.templatesConfig.helpers, data: this.props.data, bindEvent: this.props.bindEvent, sendEvent: this.props.sendEvent });
        return null === t3 ? null : "object" === A(t3) ? M(e3, this.props.rootProps, t3) : e3 === x ? M(Xa, { content: t3, key: t3 }) : M(e3, m({}, this.props.rootProps, { dangerouslySetInnerHTML: { __html: t3 } }));
      } }]), t2;
    }(), Ga = (E(v, "defaultProps", { data: {}, rootTagName: "div", useCustomCompileOptions: {}, templates: {}, templatesConfig: {} }), function(e2) {
      var t2 = e2.hits, n2 = e2.isLoading, r2 = e2.cssClasses, i2 = e2.templateProps;
      return M("div", { className: F(r2.root, 0 === t2.length && r2.emptyRoot) }, M(v, m({}, i2, { templateKey: "header", rootProps: { className: r2.header }, data: { hits: t2, isLoading: n2 } })), n2 ? M(v, m({}, i2, { templateKey: "loader", rootProps: { className: r2.loader } })) : M("ul", { className: r2.list }, t2.map(function(e3, t3) {
        return M(v, m({}, i2, { templateKey: "item", rootTagName: "li", rootProps: { className: r2.item }, key: e3.objectID, data: T(T({}, e3), {}, { get __hitIndex() {
          return t3;
        } }) }));
      })));
    }), es = { header: function() {
      return "";
    }, loader: function() {
      return "";
    }, item: function(e2) {
      return JSON.stringify(e2);
    } }, ts = l({ name: "answers" }), ns = i("Answers"), e = J(function(e2) {
      var t2, i2, a2, s2, o2, e2 = e2 || {}, n2 = e2.container, r2 = e2.attributesForPrediction, c2 = e2.queryLanguages, u2 = e2.nbHits, l2 = e2.searchDebounceTime, d2 = e2.renderDebounceTime, h2 = e2.escapeHTML, f2 = e2.extraParameters, m2 = e2.templates, m2 = void 0 === m2 ? {} : m2, e2 = e2.cssClasses, e2 = void 0 === e2 ? {} : e2;
      if (n2) return t2 = P(n2), n2 = { root: F(ns(), e2.root), emptyRoot: F(ns({ modifierName: "empty" }), e2.emptyRoot), header: F(ns({ descendantName: "header" }), e2.header), loader: F(ns({ descendantName: "loader" }), e2.loader), list: F(ns({ descendantName: "list" }), e2.list), item: F(ns({ descendantName: "item" }), e2.item) }, i2 = (e2 = { containerNode: t2, cssClasses: n2, templates: m2, renderState: {} }).containerNode, a2 = e2.cssClasses, s2 = e2.renderState, o2 = e2.templates, T(T({}, at(function(e3, t3) {
        var n3 = e3.hits, r3 = e3.isLoading, e3 = e3.instantSearchInstance;
        t3 ? s2.templateProps = O({ defaultTemplates: es, templatesConfig: e3.templatesConfig, templates: o2 }) : L(M(Ga, { cssClasses: a2, hits: n3, isLoading: r3, templateProps: s2.templateProps }), i2);
      }, function() {
        return L(null, t2);
      })({ attributesForPrediction: r2, queryLanguages: c2, nbHits: u2, searchDebounceTime: l2, renderDebounceTime: d2, escapeHTML: h2, extraParameters: f2 })), {}, { $$widgetType: "ais.answers" });
      throw new Error(ts("The `container` option is required."));
    }), rs = ["container", "widgets", "fallbackWidget"], is = l({ name: "dynamic-widgets" }), as = i("DynamicWidgets");
    function ss(e2) {
      var t2 = document.createElement("div");
      return t2.className = as({ descendantName: "widget" }), e2.appendChild(t2), t2;
    }
    function os(e2) {
      var n2, i2, a2, s2, t2, r2 = (e2 = e2 || {}).container, o2 = e2.widgets, c2 = e2.fallbackWidget, e2 = k(e2, rs);
      if (!r2) throw new Error(is("The `container` option is required."));
      if (o2 && Array.isArray(o2) && o2.every(function(e3) {
        return "function" == typeof e3;
      })) return n2 = P(r2), (i2 = document.createElement("div")).className = as(), a2 = /* @__PURE__ */ new Map(), s2 = [], t2 = st(function(e3, t3) {
        e3 = e3.attributesToRender;
        t3 && n2.appendChild(i2), e3.forEach(function(e4) {
          a2.has(e4) && (e4 = a2.get(e4), i2.appendChild(e4));
        });
      }, function() {
        n2.removeChild(i2);
      })(T(T({}, e2), {}, { widgets: s2, fallbackWidget: "function" == typeof c2 ? function(e3) {
        var e3 = e3.attribute, t3 = ss(i2);
        return a2.set(e3, t3), c2({ attribute: e3, container: t3 });
      } : void 0 })), T(T({}, t2), {}, { init: function(r3) {
        o2.forEach(function(e3) {
          var t3 = ss(i2), e3 = e3(t3), n3 = Te(e3, r3);
          a2.set(n3, t3), s2.push(e3);
        }), t2.init(r3);
      }, $$widgetType: "ais.dynamicWidgets" });
      throw new Error(is("The `widgets` option expects an array of callbacks."));
    }
    function cs(e2, t2) {
      var n2 = e2.items, r2 = e2.widgetParams, e2 = e2.canRefine;
      t2 || (t2 = r2.container, r2 = r2.cssClasses, L(M(Ss, { cssClasses: r2, items: n2, canRefine: e2 }), t2));
    }
    function us(e2) {
      var t2 = e2.className, n2 = e2.disabled;
      return M("button", { className: t2, onClick: e2.onClick, disabled: void 0 !== n2 && n2 }, e2.children);
    }
    function ls(e2) {
      var t2 = e2.classNameLabel, n2 = e2.classNameInput, r2 = e2.checked, i2 = e2.onToggle, e2 = e2.children;
      return M("label", { className: t2 }, M("input", { className: n2, type: "checkbox", checked: r2, onChange: i2 }), e2);
    }
    function ds(e2, t2) {
      var n2, r2, i2, a2, s2 = e2.items, o2 = e2.position, c2 = e2.currentRefinement, u2 = e2.refine, l2 = e2.clearMapRefinement, d2 = e2.toggleRefineOnMapMove, h2 = e2.isRefineOnMapMove, f2 = e2.setMapMoveSinceLastRefine, m2 = e2.hasMapMoveSinceLastRefine, p2 = e2.isRefinedWithMap, g2 = e2.widgetParams, e2 = e2.instantSearchInstance, v2 = g2.container, y2 = g2.googleReference, b2 = g2.cssClasses, R2 = g2.templates, S2 = g2.initialZoom, _2 = g2.initialPosition, w2 = g2.enableRefine, P2 = g2.enableClearMapRefinement, N2 = g2.enableRefineControl, x2 = g2.mapOptions, I2 = g2.createMarker, F2 = g2.markerOptions, C2 = g2.renderState;
      t2 ? (C2.isUserInteraction = true, C2.isPendingRefine = false, C2.markers = [], (g2 = document.createElement("div")).className = b2.root, v2.appendChild(g2), (t2 = document.createElement("div")).className = b2.map, g2.appendChild(t2), (n2 = document.createElement("div")).className = b2.tree, g2.appendChild(n2), C2.mapInstance = new y2.maps.Map(t2, T({ mapTypeControl: false, fullscreenControl: false, streetViewControl: false, clickableIcons: false, zoomControlOptions: { position: y2.maps.ControlPosition.LEFT_TOP } }, x2)), y2.maps.event.addListenerOnce(C2.mapInstance, "idle", function() {
        function e3() {
          C2.isUserInteraction && w2 && (f2(), h2()) && (C2.isPendingRefine = true);
        }
        C2.mapInstance.addListener("center_changed", e3), C2.mapInstance.addListener("zoom_changed", e3), C2.mapInstance.addListener("dragstart", e3), C2.mapInstance.addListener("idle", function() {
          C2.isUserInteraction && C2.isPendingRefine && (C2.isPendingRefine = false, Is({ mapInstance: C2.mapInstance, refine: u2 }));
        });
      }), C2.templateProps = O({ templatesConfig: e2.templatesConfig, templates: R2 })) : (g2 = s2.map(function(e3) {
        return e3.objectID;
      }), t2 = (n2 = j(Fs(C2.markers, g2), 2))[0], x2 = n2[1], r2 = t2.map(function(e3) {
        return e3.__id;
      }), e2 = s2.filter(function(e3) {
        return !r2.includes(e3.objectID);
      }), x2.forEach(function(e3) {
        return e3.setMap(null);
      }), C2.markers = t2.concat(e2.map(function(n3) {
        var r3 = I2({ map: C2.mapInstance, item: n3 });
        return Object.keys(F2.events).forEach(function(t3) {
          r3.addListener(t3, function(e3) {
            F2.events[t3]({ map: C2.mapInstance, event: e3, item: n3, marker: r3 });
          });
        }), r3;
      })), R2 = !m2(), i2 = c2 ? 0 : null, (a2 = !c2 && Boolean(C2.markers.length) ? Cs(y2, C2.markers) : c2) && R2 ? Ts(C2, function() {
        C2.mapInstance.fitBounds(new y2.maps.LatLngBounds(a2.southWest, a2.northEast), i2);
      }) : R2 && Ts(C2, function() {
        C2.mapInstance.setCenter(o2 || _2), C2.mapInstance.setZoom(S2);
      }), L(M(xs, { cssClasses: b2, enableRefine: w2, enableRefineControl: N2, enableClearMapRefinement: P2, isRefineOnMapMove: h2(), isRefinedWithMap: p2(), hasMapMoveSinceLastRefine: m2(), onRefineToggle: d2, onRefineClick: function() {
        return Is({ mapInstance: C2.mapInstance, refine: u2 });
      }, onClearClick: l2, templateProps: C2.templateProps }), v2.querySelector(".".concat(b2.tree))));
    }
    var hs = l({ name: "analytics" }), fs = function(e2) {
      var r2 = e2.items, i2 = e2.cssClasses, a2 = e2.templateProps, s2 = e2.createURL, o2 = e2.refine;
      return M("div", { className: F(i2.root, 0 === r2.length && i2.noRefinementRoot) }, M("ul", { className: i2.list }, M("li", { className: F(i2.item, 0 === r2.length && i2.selectedItem) }, M(v, m({}, a2, { templateKey: "home", rootTagName: "a", rootProps: { className: i2.link, href: s2(null), onClick: function(e3) {
        e3.preventDefault(), o2(null);
      } } }))), r2.map(function(t2, e3) {
        var n2 = e3 === r2.length - 1;
        return M("li", { key: t2.label + e3, className: F(i2.item, n2 && i2.selectedItem) }, M(v, m({}, a2, { templateKey: "separator", rootTagName: "span", rootProps: { className: i2.separator, "aria-hidden": true } })), n2 ? t2.label : M("a", { className: i2.link, href: s2(t2.value), onClick: function(e4) {
          e4.preventDefault(), o2(t2.value);
        } }, t2.label));
      })));
    }, ms = { home: function() {
      return "Home";
    }, separator: function() {
      return ">";
    } }, ps = l({ name: "breadcrumb" }), gs = i("Breadcrumb"), vs = function(e2) {
      var t2 = e2.hasRefinements, n2 = e2.refine, r2 = e2.cssClasses, e2 = e2.templateProps;
      return M("div", { className: r2.root }, M(v, m({}, e2, { templateKey: "resetLabel", rootTagName: "button", rootProps: { className: F(r2.button, !t2 && r2.disabledButton), onClick: n2, disabled: !t2 }, data: { hasRefinements: t2 } })));
    }, ys = { resetLabel: function() {
      return "Clear refinements";
    } }, bs = l({ name: "clear-refinements" }), Rs = i("ClearRefinements"), Ss = function(e2) {
      var t2 = e2.items, a2 = e2.cssClasses, e2 = e2.canRefine;
      return M("div", { className: F(a2.root, !e2 && a2.noRefinementRoot) }, M("ul", { className: a2.list }, t2.map(function(i2, e3) {
        return M("li", { key: "".concat(i2.indexName, "-").concat(i2.attribute, "-").concat(e3), className: a2.item }, M("span", { className: a2.label }, (e3 = i2.label).toString().charAt(0).toUpperCase() + e3.toString().slice(1), ": "), i2.refinements.map(function(e4) {
          return M("span", { key: (n2 = e4.attribute, r2 = e4.value, [n2, e4.type, r2, e4.operator].map(function(e5) {
            return e5;
          }).filter(Boolean).join(":")), className: a2.category }, M("span", { className: a2.categoryLabel }, "query" === e4.attribute ? M("q", null, e4.label) : e4.label), M("button", { className: a2.delete, type: "button", onClick: (t3 = i2.refine.bind(null, e4), function(e5) {
            He(e5) || (e5.preventDefault(), t3());
          }) }, "✕"));
          var t3, n2, r2;
        }));
      })));
    }, _s = l({ name: "current-refinements" }), ws = i("CurrentRefinements"), Ps = M("p", null, "Your custom HTML Marker"), Ns = { HTMLMarker: function() {
      return Ps;
    }, reset: function() {
      return "Clear the map refinement";
    }, toggle: function() {
      return "Search as I move the map";
    }, redo: function() {
      return "Redo search here";
    } }, xs = function(e2) {
      var t2 = e2.cssClasses, n2 = e2.enableRefine, r2 = e2.enableRefineControl, i2 = e2.enableClearMapRefinement, a2 = e2.isRefineOnMapMove, s2 = e2.isRefinedWithMap, o2 = e2.hasMapMoveSinceLastRefine, c2 = e2.onRefineToggle, u2 = e2.onRefineClick, l2 = e2.onClearClick, e2 = e2.templateProps;
      return M(x, null, n2 && M("div", null, r2 && M("div", { className: t2.control }, a2 || !o2 ? M(ls, { classNameLabel: F(t2.label, a2 && t2.selectedLabel), classNameInput: t2.input, checked: a2, onToggle: c2 }, M(v, m({}, e2, { templateKey: "toggle", rootTagName: "span" }))) : M(us, { className: t2.redo, disabled: !o2, onClick: u2 }, M(v, m({}, e2, { templateKey: "redo", rootTagName: "span" })))), !r2 && !a2 && M("div", { className: t2.control }, M(us, { className: F(t2.redo, !o2 && t2.disabledRedo), disabled: !o2, onClick: u2 }, M(v, m({}, e2, { templateKey: "redo", rootTagName: "span" })))), i2 && s2 && M(us, { className: t2.reset, onClick: l2 }, M(v, m({}, e2, { templateKey: "reset", rootTagName: "span" })))));
    }, Is = function(e2) {
      var t2 = e2.refine, e2 = e2.mapInstance;
      return t2({ northEast: e2.getBounds().getNorthEast().toJSON(), southWest: e2.getBounds().getSouthWest().toJSON() });
    }, Fs = function(e2, r2) {
      return e2.reduce(function(e3, t2) {
        var e3 = j(e3, 2), n2 = e3[0], e3 = e3[1];
        return r2.includes(t2.__id) ? [n2.concat(t2), e3] : [n2, e3.concat(t2)];
      }, [[], []]);
    }, Cs = function(e2, t2) {
      t2 = t2.reduce(function(e3, t3) {
        return e3.extend(t3.getPosition());
      }, new e2.maps.LatLngBounds());
      return { northEast: t2.getNorthEast().toJSON(), southWest: t2.getSouthWest().toJSON() };
    }, Ts = function(e2, t2) {
      e2.isUserInteraction = false, t2(), e2.isUserInteraction = true;
    }, Es = ["initialZoom", "initialPosition", "templates", "cssClasses", "builtInMarker", "customHTMLMarker", "enableRefine", "enableClearMapRefinement", "enableRefineControl", "container", "googleReference"], ks = ["item"], js = ["item"], Ms = l({ name: "geo-search" }), Ls = i("GeoSearch"), wa = { query: "", showSubmit: true, showReset: true, showLoadingIndicator: true, autofocus: false, searchAsYouType: true, ignoreCompositionEvents: false, isSearchStalled: false, disabled: false, ariaLabel: "Search", onChange: R, onSubmit: R, onReset: R, refine: R }, Os = function() {
      U(i2, Ot);
      var r2 = q(i2);
      function i2() {
        var a2;
        W(this, i2);
        for (var e2 = arguments.length, t2 = new Array(e2), n2 = 0; n2 < e2; n2++) t2[n2] = arguments[n2];
        return E(y(a2 = r2.call.apply(r2, [this].concat(t2))), "state", { query: a2.props.query, focused: false }), E(y(a2), "input", Lt()), E(y(a2), "onInput", function(e3) {
          var t3 = a2.props, n3 = t3.searchAsYouType, r3 = t3.refine, t3 = t3.onChange, i3 = e3.target.value;
          a2.props.ignoreCompositionEvents && e3.isComposing || (n3 && r3(i3), a2.setState({ query: i3 }), t3(e3));
        }), E(y(a2), "onSubmit", function(e3) {
          var t3 = a2.props, n3 = t3.searchAsYouType, r3 = t3.refine, t3 = t3.onSubmit;
          return e3.preventDefault(), e3.stopPropagation(), a2.input.current && a2.input.current.blur(), n3 || r3(a2.state.query), t3(e3), false;
        }), E(y(a2), "onReset", function(e3) {
          var t3 = a2.props, n3 = t3.refine, t3 = t3.onReset;
          a2.input.current && a2.input.current.focus(), n3(""), a2.setState({ query: "" }), t3(e3);
        }), E(y(a2), "onBlur", function() {
          a2.setState({ focused: false });
        }), E(y(a2), "onFocus", function() {
          a2.setState({ focused: true });
        }), a2;
      }
      return D(i2, [{ key: "resetInput", value: function() {
        this.setState({ query: "" });
      } }, { key: "componentWillReceiveProps", value: function(e2) {
        this.state.focused || e2.query === this.state.query || this.setState({ query: e2.query });
      } }, { key: "render", value: function() {
        var e2 = this.props, t2 = e2.cssClasses, n2 = e2.placeholder, r3 = e2.autofocus, i3 = e2.showSubmit, a2 = e2.showReset, s2 = e2.showLoadingIndicator, o2 = e2.templates, c2 = e2.isSearchStalled, e2 = e2.ariaLabel;
        return M("div", { className: t2.root }, M("form", { action: "", role: "search", className: t2.form, noValidate: true, onSubmit: this.onSubmit, onReset: this.onReset }, M("input", { ref: this.input, value: this.state.query, disabled: this.props.disabled, className: t2.input, type: "search", placeholder: n2, autoFocus: r3, autoComplete: "off", autoCorrect: "off", autoCapitalize: "off", spellCheck: "false", maxLength: 512, onInput: this.onInput, oncompositionend: this.onInput, onBlur: this.onBlur, onFocus: this.onFocus, "aria-label": e2 }), M(v, { templateKey: "submit", rootTagName: "button", rootProps: { className: t2.submit, type: "submit", title: "Submit the search query", hidden: !i3 }, templates: o2, data: { cssClasses: t2 } }), M(v, { templateKey: "reset", rootTagName: "button", rootProps: { className: t2.reset, type: "reset", title: "Clear the search query", hidden: !(a2 && this.state.query.trim() && !c2) }, templates: o2, data: { cssClasses: t2 } }), s2 && M(v, { templateKey: "loadingIndicator", rootTagName: "span", rootProps: { className: t2.loadingIndicator, hidden: !c2 }, templates: o2, data: { cssClasses: t2 } })));
      } }]), i2;
    }();
    function Hs(e2) {
      var t2 = e2.className, n2 = e2.handleClick, r2 = e2.facetValueToRefine, i2 = e2.isRefined, a2 = e2.templateProps, s2 = e2.templateKey, o2 = e2.templateData, e2 = e2.subItems;
      return M("li", { className: t2, onClick: function(e3) {
        n2({ facetValueToRefine: r2, isRefined: i2, originalEvent: e3 });
      } }, M(v, m({}, a2, { templateKey: s2, data: o2 })), e2);
    }
    E(Os, "defaultProps", wa);
    var As = ["root"];
    function Ws(e2) {
      return void 0 !== e2.data;
    }
    var Ds, Us, $s = function() {
      U(s2, Ot);
      var r2 = q(s2);
      function s2() {
        var a2;
        W(this, s2);
        for (var e2 = arguments.length, t2 = new Array(e2), n2 = 0; n2 < e2; n2++) t2[n2] = arguments[n2];
        return E(y(a2 = r2.call.apply(r2, [this].concat(t2))), "searchBox", Lt()), E(y(a2), "_generateFacetItem", function(e3) {
          Ws(e3) && Array.isArray(e3.data) && 0 < e3.data.length && ((t3 = a2.props.cssClasses).root, t3 = k(t3, As), t3 = M(s2, m({}, a2.props, { cssClasses: t3, depth: a2.props.depth + 1, facetValues: e3.data, showMore: false, className: a2.props.cssClasses.childList })));
          var t3, n3 = a2.props.createURL(e3.value), n3 = T(T({}, e3), {}, { url: n3, attribute: a2.props.attribute, cssClasses: a2.props.cssClasses, isFromSearch: a2.props.isFromSearch }), r3 = e3.value, i2 = (void 0 !== e3.isRefined && (r3 += "/".concat(e3.isRefined)), void 0 !== e3.count && (r3 += "/".concat(e3.count)), F(a2.props.cssClasses.item, e3.isRefined && a2.props.cssClasses.selectedItem, !e3.count && a2.props.cssClasses.disabledItem, Boolean(Ws(e3) && Array.isArray(e3.data) && 0 < e3.data.length) && a2.props.cssClasses.parentItem));
          return M(Hs, { templateKey: "item", key: r3, facetValueToRefine: e3.value, handleClick: a2.handleItemClick, isRefined: e3.isRefined, className: i2, subItems: t3, templateData: n3, templateProps: a2.props.templateProps });
        }), E(y(a2), "handleItemClick", function(e3) {
          var t3 = e3.facetValueToRefine, n3 = e3.isRefined, r3 = e3.originalEvent;
          if (!He(r3)) {
            var i2 = r3.target;
            if (!(null === i2 || null === i2.parentNode || n3 && i2.parentNode.querySelector('input[type="radio"]:checked'))) {
              if ("INPUT" !== i2.tagName) {
                for (; i2 !== r3.currentTarget; ) {
                  if ("LABEL" === i2.tagName && (i2.querySelector('input[type="checkbox"]') || i2.querySelector('input[type="radio"]'))) return;
                  "A" === i2.tagName && i2.href && r3.preventDefault(), i2 = i2.parentNode;
                }
                r3.stopPropagation();
              }
              a2.refine(t3);
            }
          }
        }), a2;
      }
      return D(s2, [{ key: "shouldComponentUpdate", value: function(e2) {
        return !Oe(this.props.facetValues, e2.facetValues);
      } }, { key: "refine", value: function(e2) {
        this.props.toggleRefinement(e2);
      } }, { key: "componentWillReceiveProps", value: function(e2) {
        this.searchBox.current && !e2.isFromSearch && this.searchBox.current.resetInput();
      } }, { key: "refineFirstValue", value: function() {
        var e2 = this.props.facetValues && this.props.facetValues[0];
        e2 && (e2 = e2.value, this.props.toggleRefinement(e2));
      } }, { key: "render", value: function() {
        var t2 = this, e2 = F(this.props.cssClasses.showMore, !(true === this.props.showMore && this.props.canToggleShowMore) && this.props.cssClasses.disabledShowMore), e2 = true === this.props.showMore && M(v, m({}, this.props.templateProps, { templateKey: "showMoreText", rootTagName: "button", rootProps: { className: e2, disabled: !this.props.canToggleShowMore, onClick: this.props.toggleShowMore }, data: { isShowingMore: this.props.isShowingMore } })), n2 = true !== this.props.searchIsAlwaysActive && !(this.props.isFromSearch || !this.props.hasExhaustiveItems), n2 = this.props.searchFacetValues && M("div", { className: this.props.cssClasses.searchBox }, M(Os, { ref: this.searchBox, placeholder: this.props.searchPlaceholder, disabled: n2, cssClasses: this.props.cssClasses.searchable, templates: this.props.searchBoxTemplateProps.templates, onChange: function(e3) {
          return t2.props.searchFacetValues(e3.target.value);
        }, onReset: function() {
          return t2.props.searchFacetValues("");
        }, onSubmit: function() {
          return t2.refineFirstValue();
        }, searchAsYouType: false, ariaLabel: "Search for filters" })), r3 = this.props.facetValues && 0 < this.props.facetValues.length && M("ul", { className: this.props.cssClasses.list }, this.props.facetValues.map(this._generateFacetItem, this)), i2 = this.props.searchFacetValues && this.props.isFromSearch && (!this.props.facetValues || 0 === this.props.facetValues.length) && M(v, m({}, this.props.templateProps, { templateKey: "searchableNoResults", rootProps: { className: this.props.cssClasses.noResults } }));
        return M("div", { className: F(this.props.cssClasses.root, (!this.props.facetValues || 0 === this.props.facetValues.length) && this.props.cssClasses.noRefinementRoot, this.props.className) }, this.props.children, n2, r3, i2, e2);
      } }]), s2;
    }(), Bs = (E($s, "defaultProps", { cssClasses: {}, depth: 0 }), { item: function(e2) {
      var t2 = e2.url, n2 = e2.label, r2 = e2.count, i2 = e2.cssClasses, e2 = e2.isRefined;
      return M("a", { className: F(F(i2.link), F(e2 ? i2.selectedItemLink : void 0)), href: t2 }, M("span", { className: F(i2.label) }, n2), M("span", { className: F(i2.count) }, ua(r2)));
    }, showMoreText: function(e2) {
      return e2.isShowingMore ? "Show less" : "Show more";
    } }), Qs = l({ name: "hierarchical-menu" }), S = i("HierarchicalMenu"), qs = { empty: function() {
      return "No results";
    }, item: function(e2) {
      return JSON.stringify(Xe(e2, ["__hitIndex"]), null, 2);
    } }, Vs = ["hit", "index"], Ks = l({ name: "hits" }), zs = (Us = (wa = { createElement: M, Fragment: x }).createElement, wa = wa.Fragment, Ds = { createElement: Us, Fragment: wa }.createElement, function(e2) {
      var t2 = e2.classNames, n2 = void 0 === t2 ? {} : t2, t2 = e2.hits, r2 = e2.itemComponent, i2 = e2.sendEvent, a2 = e2.emptyComponent, s2 = e2.banner, o2 = e2.bannerComponent, e2 = Ra(e2, _a);
      return Us("div", ya({}, e2, { className: F("ais-Hits", n2.root, 0 === t2.length && F("ais-Hits--empty", n2.emptyRoot), e2.className) }), s2 && (o2 ? Us(o2, { className: F("ais-Hits-banner", n2.bannerRoot), banner: s2 }) : Us(Js, { classNames: n2, banner: s2 })), 0 === t2.length && a2 ? Us(a2, null) : Us("ol", { className: F("ais-Hits-list", n2.list) }, t2.map(function(e3, t3) {
        return Us(r2, { key: e3.objectID, hit: e3, index: t3, className: F("ais-Hits-item", n2.item), onClick: function() {
          i2("click:internal", e3, "Hit Clicked");
        }, onAuxClick: function() {
          i2("click:internal", e3, "Hit Clicked");
        } });
      })));
    });
    function Js(e2) {
      var t2, n2 = e2.classNames;
      return (e2 = e2.banner).image.urls[0].url ? Ds("aside", { className: F("ais-Hits-banner", n2.bannerRoot) }, null != (t2 = e2.link) && t2.url ? Ds("a", { className: F("ais-Hits-banner-link", n2.bannerLink), href: e2.link.url, target: e2.link.target }, Ds("img", { className: F("ais-Hits-banner-image", n2.bannerImage), src: e2.image.urls[0].url, alt: e2.image.title })) : Ds("img", { className: F("ais-Hits-banner-image", n2.bannerImage), src: e2.image.urls[0].url, alt: e2.image.title })) : null;
    }
    function Zs(e2) {
      var t2 = e2.currentValue, n2 = e2.options, r2 = e2.cssClasses, i2 = e2.setValue, e2 = e2.ariaLabel;
      return M("select", { className: F(r2.select), onChange: function(e3) {
        return i2(e3.target.value);
      }, value: "".concat(t2), "aria-label": e2 }, n2.map(function(e3) {
        return M("option", { className: F(r2.option), key: e3.label + e3.value, value: "".concat(e3.value) }, e3.label);
      }));
    }
    var Ys = l({ name: "hits-per-page" }), Xs = i("HitsPerPage"), Gs = function(e2) {
      var t2 = e2.results, n2 = e2.hits, r2 = e2.insights, i2 = e2.bindEvent, a2 = e2.sendEvent, s2 = e2.hasShowPrevious, o2 = e2.showPrevious, c2 = e2.showMore, u2 = e2.isFirstPage, l2 = e2.isLastPage, d2 = e2.cssClasses, h2 = e2.templateProps, f2 = Yt({ insights: r2, sendEvent: a2 });
      return 0 === t2.hits.length ? M(v, m({}, h2, { templateKey: "empty", rootProps: { className: F(d2.root, d2.emptyRoot), onClick: f2 }, data: t2 })) : M("div", { className: d2.root }, s2 && M(v, m({}, h2, { templateKey: "showPreviousText", rootTagName: "button", rootProps: { className: F(d2.loadPrevious, u2 && d2.disabledLoadPrevious), disabled: u2, onClick: o2 } })), M("ol", { className: d2.list }, n2.map(function(t3, e3) {
        return M(v, m({}, h2, { templateKey: "item", rootTagName: "li", rootProps: { className: d2.item, onClick: function(e4) {
          f2(e4), a2("click:internal", t3, "Hit Clicked");
        }, onAuxClick: function(e4) {
          f2(e4), a2("click:internal", t3, "Hit Clicked");
        } }, key: t3.objectID, data: T(T({}, t3), {}, { get __hitIndex() {
          return e3;
        } }), bindEvent: i2, sendEvent: a2 }));
      })), M(v, m({}, h2, { templateKey: "showMoreText", rootTagName: "button", rootProps: { className: F(d2.loadMore, l2 && d2.disabledLoadMore), disabled: l2, onClick: c2 } })));
    }, eo = { empty: function() {
      return "No results";
    }, showPreviousText: function() {
      return "Show previous results";
    }, showMoreText: function() {
      return "Show more results";
    }, item: function(e2) {
      return JSON.stringify(Xe(e2, ["__hitIndex"]), null, 2);
    } }, to = l({ name: "infinite-hits" }), no = i("InfiniteHits"), ro = { item: function(e2) {
      var t2 = e2.cssClasses, n2 = e2.url, r2 = e2.label, e2 = e2.count;
      return M("a", { className: F(t2.link), href: n2 }, M("span", { className: F(t2.label) }, r2), M("span", { className: F(t2.count) }, ua(e2)));
    }, showMoreText: function(e2) {
      return e2.isShowingMore ? "Show less" : "Show more";
    } }, io = l({ name: "menu" }), ao = i("Menu");
    function so(e2) {
      var t2 = e2.cssClasses, n2 = e2.templateProps, r2 = e2.items, i2 = e2.refine, e2 = (_e(r2, function(e3) {
        return e3.isRefined;
      }) || { value: "" }).value;
      return M("div", { className: F(t2.root, 0 === r2.length && t2.noRefinementRoot) }, M("select", { className: t2.select, value: e2, onChange: function(e3) {
        i2(e3.target.value);
      } }, M(v, m({}, n2, { templateKey: "defaultOption", rootTagName: "option", rootProps: { value: "", className: t2.option } })), r2.map(function(e3) {
        return M(v, m({}, n2, { templateKey: "item", rootTagName: "option", rootProps: { value: e3.value, className: t2.option }, key: e3.value, data: e3 }));
      })));
    }
    var oo = { item: function(e2) {
      var t2 = e2.label, e2 = e2.count;
      return "".concat(t2, " (").concat(ua(e2), ")");
    }, defaultOption: function() {
      return "See all";
    } }, co = l({ name: "menu-select" }), uo = i("MenuSelect"), lo = { item: function(e2) {
      var t2 = e2.cssClasses, n2 = e2.attribute, r2 = e2.label, e2 = e2.isRefined;
      return M("label", { className: t2.label }, M("input", { type: "radio", className: t2.radio, name: n2, defaultChecked: e2 }), M("span", { className: t2.labelText }, r2));
    } }, ho = l({ name: "numeric-menu" }), fo = i("NumericMenu");
    function mo(n2) {
      function t2(t3) {
        return function(e2) {
          He(e2) || (e2.preventDefault(), n2.setCurrentPage(t3));
        };
      }
      return M("div", { className: F(n2.cssClasses.root, n2.nbPages <= 1 && n2.cssClasses.noRefinementRoot) }, M("ul", { className: n2.cssClasses.list }, n2.showFirst && M(po, { ariaLabel: "First Page", className: n2.cssClasses.firstPageItem, isDisabled: n2.isFirstPage, templates: n2.templates, templateKey: "first", pageNumber: 0, createURL: n2.createURL, cssClasses: n2.cssClasses, createClickHandler: t2 }), n2.showPrevious && M(po, { ariaLabel: "Previous Page", className: n2.cssClasses.previousPageItem, isDisabled: n2.isFirstPage, templates: n2.templates, templateKey: "previous", pageNumber: n2.currentPage - 1, createURL: n2.createURL, cssClasses: n2.cssClasses, createClickHandler: t2 }), n2.pages.map(function(e2) {
        return M(po, { key: e2, ariaLabel: "Page ".concat(e2 + 1), className: n2.cssClasses.pageItem, isSelected: e2 === n2.currentPage, templates: n2.templates, templateKey: "page", pageNumber: e2, createURL: n2.createURL, cssClasses: n2.cssClasses, createClickHandler: t2 });
      }), n2.showNext && M(po, { ariaLabel: "Next Page", className: n2.cssClasses.nextPageItem, isDisabled: n2.isLastPage, templates: n2.templates, templateKey: "next", pageNumber: n2.currentPage + 1, createURL: n2.createURL, cssClasses: n2.cssClasses, createClickHandler: t2 }), n2.showLast && M(po, { ariaLabel: "Last Page, Page ".concat(n2.nbPages), className: n2.cssClasses.lastPageItem, isDisabled: n2.isLastPage, templates: n2.templates, templateKey: "last", pageNumber: n2.nbPages - 1, createURL: n2.createURL, cssClasses: n2.cssClasses, createClickHandler: t2 })));
    }
    function po(e2) {
      var t2 = e2.templates, n2 = e2.templateKey, r2 = e2.ariaLabel, i2 = e2.pageNumber, a2 = e2.className, s2 = e2.isDisabled, s2 = void 0 !== s2 && s2, o2 = e2.isSelected, c2 = e2.cssClasses, u2 = e2.createURL, e2 = e2.createClickHandler;
      return M("li", { className: F(c2.item, s2 && c2.disabledItem, a2, void 0 !== o2 && o2 && c2.selectedItem) }, M(v, s2 ? { rootTagName: "span", rootProps: { className: c2.link, "aria-label": r2 }, templateKey: n2, templates: t2, data: { page: i2 + 1 } } : { rootTagName: "a", rootProps: { className: c2.link, "aria-label": r2, href: u2(i2), onClick: e2(i2) }, templateKey: n2, templates: t2, data: { page: i2 + 1 } }));
    }
    var go, _, vo, yo, bo = i("Pagination"), Ro = l({ name: "pagination" }), So = { previous: function() {
      return "‹";
    }, next: function() {
      return "›";
    }, page: function(e2) {
      e2 = e2.page;
      return "".concat(e2);
    }, first: function() {
      return "«";
    }, last: function() {
      return "»";
    } }, _o = 0, wo = [], Po = [], No = N.__b, xo = N.__r, Io = N.diffed, Fo = N.__c, Co = N.unmount;
    function To(e2, t2) {
      N.__h && N.__h(_, e2, _o || t2), _o = 0;
      t2 = _.__H || (_.__H = { __: [], __h: [] });
      return e2 >= t2.__.length && t2.__.push({ __V: Po }), t2.__[e2];
    }
    function Eo(e2) {
      _o = 1;
      var a2, t2 = Ao, s2 = To(go++, 2);
      return s2.t = t2, s2.__c || (s2.__ = [Ao(void 0, e2), function(e3) {
        var t3 = (s2.__N || s2.__)[0], e3 = s2.t(t3, e3);
        t3 !== e3 && (s2.__N = [e3, s2.__[1]], s2.__c.setState({}));
      }], (s2.__c = _).u) || (_.u = true, a2 = _.shouldComponentUpdate, _.shouldComponentUpdate = function(e3, t3, n2) {
        var r2, i2;
        return !s2.__c.__H || ((r2 = s2.__c.__H.__.filter(function(e4) {
          return e4.__c;
        })).every(function(e4) {
          return !e4.__N;
        }) || (i2 = false, r2.forEach(function(e4) {
          var t4;
          e4.__N && (t4 = e4.__[0], e4.__ = e4.__N, e4.__N = void 0, t4 !== e4.__[0]) && (i2 = true);
        }), !!i2)) && (!a2 || a2.call(this, e3, t3, n2));
      }), s2.__N || s2.__;
    }
    function ko(e2) {
      return _o = 5, t2 = function() {
        return { current: e2 };
      }, n2 = [], Ho((r2 = To(go++, 7)).__H, n2) ? (r2.__V = t2(), r2.i = n2, r2.__h = t2, r2.__V) : r2.__;
      var t2, n2, r2;
    }
    function jo() {
      for (var t2; t2 = wo.shift(); ) if (t2.__P && t2.__H) try {
        t2.__H.__h.forEach(Lo), t2.__H.__h.forEach(Oo), t2.__H.__h = [];
      } catch (e2) {
        t2.__H.__h = [], N.__e(e2, t2.__v);
      }
    }
    N.__b = function(e2) {
      "function" != typeof e2.type || e2.o || e2.type === x ? e2.o || (e2.o = e2.__ && e2.__.o ? e2.__.o : "") : e2.o = (e2.__ && e2.__.o ? e2.__.o : "") + (e2.__ && e2.__.__k ? e2.__.__k.indexOf(e2) : 0), _ = null, No && No(e2);
    }, N.__r = function(e2) {
      xo && xo(e2), go = 0;
      e2 = (_ = e2.__c).__H;
      e2 && (vo === _ ? (e2.__h = [], _.__h = [], e2.__.forEach(function(e3) {
        e3.__N && (e3.__ = e3.__N), e3.__V = Po, e3.__N = e3.i = void 0;
      })) : (e2.__h.forEach(Lo), e2.__h.forEach(Oo), e2.__h = [])), vo = _;
    }, N.diffed = function(e2) {
      Io && Io(e2);
      e2 = e2.__c;
      e2 && e2.__H && (!e2.__H.__h.length || 1 !== wo.push(e2) && yo === N.requestAnimationFrame || ((yo = N.requestAnimationFrame) || function(e3) {
        function t2() {
          clearTimeout(r2), Mo && cancelAnimationFrame(n2), setTimeout(e3);
        }
        var n2, r2 = setTimeout(t2, 100);
        Mo && (n2 = requestAnimationFrame(t2));
      })(jo), e2.__H.__.forEach(function(e3) {
        e3.i && (e3.__H = e3.i), e3.__V !== Po && (e3.__ = e3.__V), e3.i = void 0, e3.__V = Po;
      })), vo = _ = null;
    }, N.__c = function(e2, n2) {
      n2.some(function(t2) {
        try {
          t2.__h.forEach(Lo), t2.__h = t2.__h.filter(function(e3) {
            return !e3.__ || Oo(e3);
          });
        } catch (e3) {
          n2.some(function(e4) {
            e4.__h && (e4.__h = []);
          }), n2 = [], N.__e(e3, t2.__v);
        }
      }), Fo && Fo(e2, n2);
    }, N.unmount = function(e2) {
      Co && Co(e2);
      var t2, e2 = e2.__c;
      e2 && e2.__H && (e2.__H.__.forEach(function(e3) {
        try {
          Lo(e3);
        } catch (e4) {
          t2 = e4;
        }
      }), e2.__H = void 0, t2) && N.__e(t2, e2.__v);
    };
    var Mo = "function" == typeof requestAnimationFrame;
    function Lo(e2) {
      var t2 = _, n2 = e2.__c;
      "function" == typeof n2 && (e2.__c = void 0, n2()), _ = t2;
    }
    function Oo(e2) {
      var t2 = _;
      e2.__c = e2.__(), _ = t2;
    }
    function Ho(n2, e2) {
      return !n2 || n2.length !== e2.length || e2.some(function(e3, t2) {
        return e3 !== n2[t2];
      });
    }
    function Ao(e2, t2) {
      return "function" == typeof t2 ? t2(e2) : t2;
    }
    function Wo(t2) {
      var e2, n2, r2 = j(Eo(t2.isCollapsed), 2), i2 = r2[0], a2 = r2[1], r2 = j(Eo(false), 2), s2 = r2[0], o2 = r2[1], c2 = ko(null);
      return r2 = function() {
        var e3 = c2.current;
        if (e3) return e3.appendChild(t2.bodyElement), function() {
          e3.removeChild(t2.bodyElement);
        };
      }, e2 = [c2, t2.bodyElement], n2 = To(go++, 3), !N.__s && Ho(n2.__H, e2) && (n2.__ = r2, n2.i = e2, _.__H.__h.push(n2)), s2 || t2.isCollapsed === i2 || a2(t2.isCollapsed), M("div", { className: F(t2.cssClasses.root, t2.hidden && t2.cssClasses.noRefinementRoot, t2.collapsible && t2.cssClasses.collapsibleRoot, i2 && t2.cssClasses.collapsedRoot), hidden: t2.hidden }, t2.templates.header && M("div", { className: t2.cssClasses.header }, M(v, { templates: t2.templates, templateKey: "header", rootTagName: "span", data: t2.data }), t2.collapsible && M("button", { className: t2.cssClasses.collapseButton, "aria-expanded": !i2, onClick: function(e3) {
        e3.preventDefault(), o2(true), a2(function(e4) {
          return !e4;
        });
      } }, M(v, { templates: t2.templates, templateKey: "collapseButtonText", rootTagName: "span", data: { collapsed: i2 } }))), M("div", { className: t2.cssClasses.body, ref: c2 }), t2.templates.footer && M(v, { templates: t2.templates, templateKey: "footer", rootProps: { className: t2.cssClasses.footer }, data: t2.data }));
    }
    var Do = l({ name: "panel" }), Uo = i("Panel"), $o = ["placesReference", "defaultPosition"], Bo = ["places"], wa = J(function(e2) {
      var t2 = e2 || {}, n2 = t2.placesReference, r2 = t2.defaultPosition, i2 = void 0 === r2 ? [] : r2, r2 = k(t2, $o);
      if ("function" != typeof n2) throw new Error("The `placesReference` option requires a valid Places.js reference.");
      var a2 = n2(r2), s2 = { query: "", initialLatLngViaIP: void 0, isInitialLatLngViaIPSet: false };
      return { $$type: "ais.places", $$widgetType: "ais.places", init: function(e3) {
        var r3 = e3.helper;
        a2.on("change", function(e4) {
          var e4 = e4.suggestion, t3 = e4.value, e4 = e4.latlng, n3 = e4.lat, e4 = e4.lng;
          s2.query = t3, r3.setQueryParameter("insideBoundingBox", void 0).setQueryParameter("aroundLatLngViaIP", false).setQueryParameter("aroundLatLng", "".concat(n3, ",").concat(e4)).search();
        }), a2.on("clear", function() {
          s2.query = "", r3.setQueryParameter("insideBoundingBox", void 0), 1 < i2.length ? r3.setQueryParameter("aroundLatLngViaIP", false).setQueryParameter("aroundLatLng", i2.join(",")) : r3.setQueryParameter("aroundLatLngViaIP", s2.initialLatLngViaIP).setQueryParameter("aroundLatLng", void 0), r3.search();
        });
      }, getWidgetUiState: function(e3, t3) {
        t3 = t3.searchParameters.aroundLatLng || i2.join(",");
        return t3 !== i2.join(",") || s2.query ? T(T({}, e3), {}, { places: { query: s2.query, position: t3 } }) : (e3.places, k(e3, Bo));
      }, getWidgetSearchParameters: function(e3, t3) {
        var t3 = t3.uiState.places || {}, n3 = t3.query, n3 = void 0 === n3 ? "" : n3, t3 = t3.position, t3 = void 0 === t3 ? i2.join(",") : t3;
        return s2.query = n3, s2.isInitialLatLngViaIPSet || (s2.isInitialLatLngViaIPSet = true, s2.initialLatLngViaIP = e3.aroundLatLngViaIP), a2.setVal(n3), a2.close(), e3.setQueryParameter("insideBoundingBox", void 0).setQueryParameter("aroundLatLngViaIP", false).setQueryParameter("aroundLatLng", t3 || void 0);
      }, getRenderState: function(e3, t3) {
        return T(T({}, e3), {}, { places: this.getWidgetRenderState(t3) });
      }, getWidgetRenderState: function() {
        return { widgetParams: e2 };
      } };
    }), Qo = function(e2) {
      var t2 = e2.url, n2 = e2.theme, e2 = e2.cssClasses;
      return M("div", { className: e2.root }, M("a", { href: t2, target: "_blank", className: e2.link, "aria-label": "Search by Algolia", rel: "noopener noreferrer" }, M("svg", { height: "1.2em", className: e2.logo, viewBox: "0 0 572 64", style: { width: "auto" } }, M("path", { fill: "dark" === n2 ? "#FFF" : "#36395A", d: "M16 48.3c-3.4 0-6.3-.6-8.7-1.7A12.4 12.4 0 0 1 1.9 42C.6 40 0 38 0 35.4h6.5a6.7 6.7 0 0 0 3.9 6c1.4.7 3.3 1.1 5.6 1.1 2.2 0 4-.3 5.4-1a7 7 0 0 0 3-2.4 6 6 0 0 0 1-3.4c0-1.5-.6-2.8-1.9-3.7-1.3-1-3.3-1.6-5.9-1.8l-4-.4c-3.7-.3-6.6-1.4-8.8-3.4a10 10 0 0 1-3.3-7.9c0-2.4.6-4.6 1.8-6.4a12 12 0 0 1 5-4.3c2.2-1 4.7-1.6 7.5-1.6s5.5.5 7.6 1.6a12 12 0 0 1 5 4.4c1.2 1.8 1.8 4 1.8 6.7h-6.5a6.4 6.4 0 0 0-3.5-5.9c-1-.6-2.6-1-4.4-1s-3.2.3-4.4 1c-1.1.6-2 1.4-2.6 2.4-.5 1-.8 2-.8 3.1a5 5 0 0 0 1.5 3.6c1 1 2.6 1.7 4.7 1.9l4 .3c2.8.2 5.2.8 7.2 1.8 2.1 1 3.7 2.2 4.9 3.8a9.7 9.7 0 0 1 1.7 5.8c0 2.5-.7 4.7-2 6.6a13 13 0 0 1-5.6 4.4c-2.4 1-5.2 1.6-8.4 1.6Zm35.6 0c-2.6 0-4.8-.4-6.7-1.3a13 13 0 0 1-4.7-3.5 17.1 17.1 0 0 1-3.6-10.4v-1c0-2 .3-3.8 1-5.6a13 13 0 0 1 7.3-8.3 15 15 0 0 1 6.3-1.4A13.2 13.2 0 0 1 64 24.3c1 2.2 1.6 4.6 1.6 7.2V34H39.4v-4.3h21.8l-1.8 2.2c0-2-.3-3.7-.9-5.1a7.3 7.3 0 0 0-2.7-3.4c-1.2-.7-2.7-1.1-4.6-1.1s-3.4.4-4.7 1.3a8 8 0 0 0-2.9 3.6c-.6 1.5-.9 3.3-.9 5.4 0 2 .3 3.7 1 5.3a7.9 7.9 0 0 0 2.8 3.7c1.3.8 3 1.3 5 1.3s3.8-.5 5.1-1.3c1.3-1 2.1-2 2.4-3.2h6a11.8 11.8 0 0 1-7 8.7 16 16 0 0 1-6.4 1.2ZM80 48c-2.2 0-4-.3-5.7-1a8.4 8.4 0 0 1-3.7-3.3 9.7 9.7 0 0 1-1.3-5.2c0-2 .5-3.8 1.5-5.2a9 9 0 0 1 4.3-3.1c1.8-.7 4-1 6.7-1H89v4.1h-7.5c-2 0-3.4.5-4.4 1.4-1 1-1.6 2.1-1.6 3.6s.5 2.7 1.6 3.6c1 1 2.5 1.4 4.4 1.4 1.1 0 2.2-.2 3.2-.7 1-.4 1.9-1 2.6-2 .6-1 1-2.4 1-4.2l1.7 2.1c-.2 2-.7 3.8-1.5 5.2a9 9 0 0 1-3.4 3.3 12 12 0 0 1-5.3 1Zm9.5-.7v-8.8h-1v-10c0-1.8-.5-3.2-1.4-4.1-1-1-2.4-1.4-4.2-1.4a142.9 142.9 0 0 0-10.2.4v-5.6a74.8 74.8 0 0 1 8.6-.4c3 0 5.5.4 7.5 1.2s3.4 2 4.4 3.6c1 1.7 1.4 4 1.4 6.7v18.4h-5Zm12.9 0V17.8h5v12.3h-.2c0-4.2 1-7.4 2.8-9.5a11 11 0 0 1 8.3-3.1h1v5.6h-2a9 9 0 0 0-6.3 2.2c-1.5 1.5-2.2 3.6-2.2 6.4v15.6h-6.4Zm34.4 1a15 15 0 0 1-6.6-1.3c-1.9-.9-3.4-2-4.7-3.5a15.5 15.5 0 0 1-2.7-5c-.6-1.7-1-3.6-1-5.4v-1c0-2 .4-3.8 1-5.6a15 15 0 0 1 2.8-4.9c1.3-1.5 2.8-2.6 4.6-3.5a16.4 16.4 0 0 1 13.3.2c2 1 3.5 2.3 4.8 4a12 12 0 0 1 2 6H144c-.2-1.6-1-3-2.2-4.1a7.5 7.5 0 0 0-5.2-1.7 8 8 0 0 0-4.7 1.3 8 8 0 0 0-2.8 3.6 13.8 13.8 0 0 0 0 10.3c.6 1.5 1.5 2.7 2.8 3.6s2.8 1.3 4.8 1.3c1.5 0 2.7-.2 3.8-.8a7 7 0 0 0 2.6-2c.7-1 1-2 1.2-3.2h6.2a11 11 0 0 1-2 6.2 15.1 15.1 0 0 1-11.8 5.5Zm19.7-1v-40h6.4V31h-1.3c0-3 .4-5.5 1.1-7.6a9.7 9.7 0 0 1 3.5-4.8A9.9 9.9 0 0 1 172 17h.3c3.5 0 6 1.1 7.9 3.5 1.7 2.3 2.6 5.7 2.6 10v16.8h-6.4V29.6c0-2.1-.6-3.8-1.8-5a6.4 6.4 0 0 0-4.8-1.8c-2 0-3.7.7-5 2a7.8 7.8 0 0 0-1.9 5.5v17h-6.4Zm63.8 1a12.2 12.2 0 0 1-10.9-6.2 19 19 0 0 1-1.8-7.3h1.4v12.5h-5.1v-40h6.4v19.8l-2 3.5c.2-3.1.8-5.7 1.9-7.7a11 11 0 0 1 4.4-4.5c1.8-1 3.9-1.5 6.1-1.5a13.4 13.4 0 0 1 12.8 9.1c.7 1.9 1 3.8 1 6v1c0 2.2-.3 4.1-1 6a13.6 13.6 0 0 1-13.2 9.4Zm-1.2-5.5a8.4 8.4 0 0 0 7.9-5c.7-1.5 1.1-3.3 1.1-5.3s-.4-3.8-1.1-5.3a8.7 8.7 0 0 0-3.2-3.6 9.6 9.6 0 0 0-9.2-.2 8.5 8.5 0 0 0-3.3 3.2c-.8 1.4-1.3 3-1.3 5v2.3a9 9 0 0 0 1.3 4.8 9 9 0 0 0 3.4 3c1.4.7 2.8 1 4.4 1Zm27.3 3.9-10-28.9h6.5l9.5 28.9h-6Zm-7.5 12.2v-5.7h4.9c1 0 2-.1 2.9-.4a4 4 0 0 0 2-1.4c.4-.7.9-1.6 1.2-2.7l8.6-30.9h6.2l-9.3 32.4a14 14 0 0 1-2.5 5 8.9 8.9 0 0 1-4 2.8c-1.5.6-3.4.9-5.6.9h-4.4Zm9-12.2v-5.2h6.4v5.2H248Z" }), M("path", { fill: "dark" === n2 ? "#FFF" : "#003DFF", d: "M534.4 9.1H528a.8.8 0 0 1-.7-.7V1.8c0-.4.2-.7.6-.8l6.5-1c.4 0 .8.2.9.6v7.8c0 .4-.4.7-.8.7zM428 35.2V.8c0-.5-.3-.8-.7-.8h-.2l-6.4 1c-.4 0-.7.4-.7.8v35c0 1.6 0 11.8 12.3 12.2.5 0 .8-.4.8-.8V43c0-.4-.3-.7-.6-.8-4.5-.5-4.5-6-4.5-7zm106.5-21.8H528c-.4 0-.7.4-.7.8v34c0 .4.3.8.7.8h6.5c.4 0 .8-.4.8-.8v-34c0-.5-.4-.8-.8-.8zm-17.7 21.8V.8c0-.5-.3-.8-.8-.8l-6.5 1c-.4 0-.7.4-.7.8v35c0 1.6 0 11.8 12.3 12.2.4 0 .8-.4.8-.8V43c0-.4-.3-.7-.7-.8-4.4-.5-4.4-6-4.4-7zm-22.2-20.6a16.5 16.5 0 0 1 8.6 9.3c.8 2.2 1.3 4.8 1.3 7.5a19.4 19.4 0 0 1-4.6 12.6 14.8 14.8 0 0 1-5.2 3.6c-2 .9-5.2 1.4-6.8 1.4a21 21 0 0 1-6.7-1.4 15.4 15.4 0 0 1-8.6-9.3 21.3 21.3 0 0 1 0-14.4 15.2 15.2 0 0 1 8.6-9.3c2-.8 4.3-1.2 6.7-1.2s4.6.4 6.7 1.2zm-6.7 27.6c2.7 0 4.7-1 6.2-3s2.2-4.3 2.2-7.8-.7-6.3-2.2-8.3-3.5-3-6.2-3-4.7 1-6.1 3c-1.5 2-2.2 4.8-2.2 8.3s.7 5.8 2.2 7.8 3.5 3 6.2 3zm-88.8-28.8c-6.2 0-11.7 3.3-14.8 8.2a18.6 18.6 0 0 0 4.8 25.2c1.8 1.2 4 1.8 6.2 1.7s.1 0 .1 0h.9c4.2-.7 8-4 9.1-8.1v7.4c0 .4.3.7.8.7h6.4a.7.7 0 0 0 .7-.7V14.2c0-.5-.3-.8-.7-.8h-13.5zm6.3 26.5a9.8 9.8 0 0 1-5.7 2h-.5a10 10 0 0 1-9.2-14c1.4-3.7 5-6.3 9-6.3h6.4v18.3zm152.3-26.5h13.5c.5 0 .8.3.8.7v33.7c0 .4-.3.7-.8.7h-6.4a.7.7 0 0 1-.8-.7v-7.4c-1.2 4-4.8 7.4-9 8h-.1a4.2 4.2 0 0 1-.5.1h-.9a10.3 10.3 0 0 1-7-2.6c-4-3.3-6.5-8.4-6.5-14.2 0-3.7 1-7.2 3-10 3-5 8.5-8.3 14.7-8.3zm.6 28.4c2.2-.1 4.2-.6 5.7-2V21.7h-6.3a9.8 9.8 0 0 0-9 6.4 10.2 10.2 0 0 0 9.1 13.9h.5zM452.8 13.4c-6.2 0-11.7 3.3-14.8 8.2a18.5 18.5 0 0 0 3.6 24.3 10.4 10.4 0 0 0 13 .6c2.2-1.5 3.8-3.7 4.5-6.1v7.8c0 2.8-.8 5-2.2 6.3-1.5 1.5-4 2.2-7.5 2.2l-6-.3c-.3 0-.7.2-.8.5l-1.6 5.5c-.1.4.1.8.5 1h.1c2.8.4 5.5.6 7 .6 6.3 0 11-1.4 14-4.1 2.7-2.5 4.2-6.3 4.5-11.4V14.2c0-.5-.4-.8-.8-.8h-13.5zm6.3 8.2v18.3a9.6 9.6 0 0 1-5.6 2h-1a10.3 10.3 0 0 1-8.8-14c1.4-3.7 5-6.3 9-6.3h6.4zM291 31.5A32 32 0 0 1 322.8 0h30.8c.6 0 1.2.5 1.2 1.2v61.5c0 1.1-1.3 1.7-2.2 1l-19.2-17a18 18 0 0 1-11 3.4 18.1 18.1 0 1 1 18.2-14.8c-.1.4-.5.7-.9.6-.1 0-.3 0-.4-.2l-3.8-3.4c-.4-.3-.6-.8-.7-1.4a12 12 0 1 0-2.4 8.3c.4-.4 1-.5 1.6-.2l14.7 13.1v-46H323a26 26 0 1 0 10 49.7c.8-.4 1.6-.2 2.3.3l3 2.7c.3.2.3.7 0 1l-.2.2a32 32 0 0 1-47.2-28.6z" }))));
    }, qo = i("PoweredBy"), Vo = l({ name: "powered-by" }), Ko = l({ name: "query-rule-context" }), zo = function(e2) {
      var t2 = e2.cssClasses, n2 = e2.templates, e2 = e2.items;
      return M(v, { templateKey: "default", templates: n2, rootProps: { className: t2.root }, data: { items: e2 } });
    }, Jo = { default: function(e2) {
      e2 = e2.items;
      return JSON.stringify(e2, null, 2);
    } }, Zo = l({ name: "query-rule-custom-data" }), Yo = i("QueryRuleCustomData");
    function Xo(e2) {
      return e2.replace(/^(0+)\d/, function(e3) {
        return Number(e3).toString();
      });
    }
    function Go(e2) {
      var t2 = e2.style, e2 = e2.children, n2 = Math.round(parseFloat(t2.left)), r2 = [0, 50, 100].includes(n2), e2 = Math.round(100 * parseInt(e2, 10)) / 100;
      return M("div", { style: T(T({}, t2), {}, { marginLeft: 100 === n2 ? "-2px" : 0 }), className: F("rheostat-marker", "rheostat-marker-horizontal", r2 && "rheostat-marker-large") }, r2 && M("div", { className: "rheostat-value" }, e2));
    }
    var ec = function() {
      U(s2, Ot);
      var a2 = q(s2);
      function s2() {
        var e2, n2;
        W(this, s2);
        for (var t2 = arguments.length, r2 = new Array(t2), i2 = 0; i2 < t2; i2++) r2[i2] = arguments[i2];
        return E(y(n2 = a2.call.apply(a2, [this].concat(r2))), "state", { min: null == (e2 = n2.props.values.min) ? void 0 : e2.toString(), max: null == (e2 = n2.props.values.max) ? void 0 : e2.toString() }), E(y(n2), "onInput", function(t3) {
          return function(e3) {
            e3 = e3.currentTarget.value;
            n2.setState(E({}, t3, e3));
          };
        }), E(y(n2), "onSubmit", function(e3) {
          e3.preventDefault();
          var e3 = n2.state, t3 = e3.min, e3 = e3.max;
          n2.props.refine([t3 ? Number(t3) : void 0, e3 ? Number(e3) : void 0]);
        }), n2;
      }
      return D(s2, [{ key: "componentWillReceiveProps", value: function(e2) {
        var t2;
        this.setState({ min: null == (t2 = e2.values.min) ? void 0 : t2.toString(), max: null == (t2 = e2.values.max) ? void 0 : t2.toString() });
      } }, { key: "render", value: function() {
        var e2 = this.state, t2 = e2.min, e2 = e2.max, n2 = this.props, r2 = n2.min, i2 = n2.max, a3 = n2.step, s3 = n2.cssClasses, n2 = n2.templateProps, o2 = !(!r2 || !i2) && i2 <= r2, c2 = Boolean(t2 || e2);
        return M("div", { className: F(s3.root, !c2 && s3.noRefinement) }, M("form", { className: s3.form, onSubmit: this.onSubmit }, M("label", { className: s3.label }, M("input", { className: F(s3.input, s3.inputMin), type: "number", min: r2, max: i2, step: a3, value: Xo(null != t2 ? t2 : ""), onInput: this.onInput("min"), placeholder: null == r2 ? void 0 : r2.toString(), disabled: o2 })), M(v, m({}, n2, { templateKey: "separatorText", rootTagName: "span", rootProps: { className: s3.separator } })), M("label", { className: s3.label }, M("input", { className: F(s3.input, s3.inputMax), type: "number", min: r2, max: i2, step: a3, value: Xo(null != e2 ? e2 : ""), onInput: this.onInput("max"), placeholder: null == i2 ? void 0 : i2.toString(), disabled: o2 })), M(v, m({}, n2, { templateKey: "submitText", rootTagName: "button", rootProps: { type: "submit", className: s3.submit, disabled: o2 } }))));
      } }]), s2;
    }(), tc = l({ name: "range-input" }), nc = i("RangeInput"), rc = { separatorText: function() {
      return "to";
    }, submitText: function() {
      return "Go";
    } }, ic = 40, ac = 35, sc = 27, oc = 36, cc = 37, uc = 34, lc = 33, dc = 39, hc = 38, fc = 100;
    function mc(e2, t2, n2) {
      return (e2 - t2) / (n2 - t2) * 100;
    }
    function pc(e2, t2, n2) {
      return 0 === e2 ? t2 : 100 === e2 ? n2 : Math.round((n2 - t2) * (e2 / 100) + t2);
    }
    function gc(e2) {
      return ["rheostat", "vertical" === e2.orientation ? "rheostat-vertical" : "rheostat-horizontal"].concat(e2.className.split(" ")).join(" ");
    }
    function vc(e2) {
      return Number(e2.currentTarget.getAttribute("data-handle-key"));
    }
    function yc(e2) {
      e2.stopPropagation(), e2.preventDefault();
    }
    var bc = M("div", { className: "rheostat-background" }), Rc = function() {
      U(i2, Ot);
      var r2 = q(i2);
      function i2() {
        var f2;
        W(this, i2);
        for (var e2 = arguments.length, t2 = new Array(e2), n2 = 0; n2 < e2; n2++) t2[n2] = arguments[n2];
        return E(y(f2 = r2.call.apply(r2, [this].concat(t2))), "x", [0, 0].map(function(e3) {
          return e3;
        })), E(y(f2), "state", { className: gc(f2.props), handlePos: f2.props.values.map(function(e3) {
          return mc(e3, f2.props.min, f2.props.max);
        }), handleDimensions: 0, mousePos: null, sliderBox: {}, slidingIndex: null, values: f2.props.values }), E(y(f2), "rheostat", Lt()), E(y(f2), "componentWillReceiveProps", function(n3) {
          var e3 = f2.props, t3 = e3.className, r3 = e3.disabled, i3 = e3.min, a2 = e3.max, e3 = e3.orientation, s2 = f2.state, o2 = s2.values, s2 = s2.slidingIndex, i3 = n3.min !== i3 || n3.max !== a2, a2 = o2.length !== n3.values.length || o2.some(function(e4, t4) {
            return n3.values[t4] !== e4;
          }), o2 = n3.className !== t3 || n3.orientation !== e3, t3 = n3.disabled && !r3;
          o2 && f2.setState({ className: gc(n3) }), (i3 || a2) && f2.updateNewValues(n3), t3 && null !== s2 && f2.endSlide();
        }), E(y(f2), "getPublicState", function() {
          var e3 = f2.props, t3 = e3.min;
          return { max: e3.max, min: t3, values: f2.state.values };
        }), E(y(f2), "getSliderBoundingBox", function() {
          var e3 = f2.rheostat.current, t3 = e3.getBoundingClientRect();
          return { height: t3.height || e3.clientHeight, left: t3.left, top: t3.top, width: t3.width || e3.clientWidth };
        }), E(y(f2), "getProgressStyle", function(e3) {
          var t3 = f2.state.handlePos, n3 = t3[e3];
          return 0 === e3 ? "vertical" === f2.props.orientation ? { height: "".concat(n3, "%"), top: 0 } : { left: 0, width: "".concat(n3, "%") } : (t3 = n3 - (n3 = t3[e3 - 1]), "vertical" === f2.props.orientation ? { height: "".concat(t3, "%"), top: "".concat(n3, "%") } : { left: "".concat(n3, "%"), width: "".concat(t3, "%") });
        }), E(y(f2), "getMinValue", function(e3) {
          return f2.state.values[e3 - 1] ? Math.max(f2.props.min, f2.state.values[e3 - 1]) : f2.props.min;
        }), E(y(f2), "getMaxValue", function(e3) {
          return f2.state.values[e3 + 1] ? Math.min(f2.props.max, f2.state.values[e3 + 1]) : f2.props.max;
        }), E(y(f2), "getHandleDimensions", function(e3, t3) {
          e3 = e3.currentTarget || null;
          return e3 ? "vertical" === f2.props.orientation ? e3.clientHeight / t3.height * fc / 2 : e3.clientWidth / t3.width * fc / 2 : 0;
        }), E(y(f2), "getClosestSnapPoint", function(n3) {
          return f2.props.snapPoints.length ? f2.props.snapPoints.reduce(function(e3, t3) {
            return Math.abs(e3 - n3) < Math.abs(t3 - n3) ? e3 : t3;
          }) : n3;
        }), E(y(f2), "getSnapPosition", function(e3) {
          var t3, n3, r3;
          return f2.props.snap ? (t3 = (n3 = f2.props).max, r3 = pc(e3, n3 = n3.min, t3), mc(f2.getClosestSnapPoint(r3), n3, t3)) : e3;
        }), E(y(f2), "getNextPositionForKey", function(e3, t3) {
          var n3 = f2.state, r3 = n3.handlePos, n3 = n3.values, i3 = f2.props, a2 = i3.max, s2 = i3.min, i3 = i3.snapPoints, o2 = f2.props.snap, c2 = n3[e3], r3 = r3[e3], u2 = r3, l2 = 1, d2 = (100 <= a2 ? r3 = Math.round(r3) : l2 = 100 / (a2 - s2), null), e3 = (o2 && (d2 = i3.indexOf(f2.getClosestSnapPoint(n3[e3]))), E(n3 = {}, cc, function(e4) {
            return -1 * e4;
          }), E(n3, dc, function(e4) {
            return e4;
          }), E(n3, hc, function(e4) {
            return e4;
          }), E(n3, ic, function(e4) {
            return -1 * e4;
          }), E(n3, uc, function(e4) {
            return 1 < e4 ? -e4 : -10 * e4;
          }), E(n3, lc, function(e4) {
            return 1 < e4 ? e4 : 10 * e4;
          }), n3);
          if (Object.prototype.hasOwnProperty.call(e3, t3)) r3 += e3[t3](l2), o2 && d2 && (u2 < r3 ? d2 < i3.length - 1 && (c2 = i3[d2 + 1]) : 0 < d2 && (c2 = i3[d2 - 1]));
          else if (t3 === oc) r3 = 0, o2 && (c2 = i3[0]);
          else {
            if (t3 !== ac) return null;
            r3 = fc, o2 && (c2 = i3[i3.length - 1]);
          }
          return o2 ? mc(c2, s2, a2) : r3;
        }), E(y(f2), "getNextState", function(n3, e3) {
          var t3 = f2.state.handlePos, r3 = f2.props, i3 = r3.max, a2 = r3.min, s2 = f2.validatePosition(n3, e3), r3 = t3.map(function(e4, t4) {
            return t4 === n3 ? s2 : e4;
          });
          return { handlePos: r3, values: r3.map(function(e4) {
            return pc(e4, a2, i3);
          }) };
        }), E(y(f2), "getClosestHandle", function(r3) {
          var i3 = f2.state.handlePos;
          return i3.reduce(function(e3, t3, n3) {
            return Math.abs(i3[n3] - r3) < Math.abs(i3[e3] - r3) ? n3 : e3;
          }, 0);
        }), E(y(f2), "setStartSlide", function(e3, t3, n3) {
          var r3 = f2.getSliderBoundingBox();
          f2.setState({ handleDimensions: f2.getHandleDimensions(e3, r3), mousePos: { x: t3, y: n3 }, sliderBox: r3, slidingIndex: vc(e3) });
        }), E(y(f2), "startMouseSlide", function(e3) {
          f2.setStartSlide(e3, e3.clientX, e3.clientY), document.addEventListener("mousemove", f2.handleMouseSlide, false), document.addEventListener("mouseup", f2.endSlide, false), yc(e3);
        }), E(y(f2), "startTouchSlide", function(e3) {
          var t3;
          1 < e3.changedTouches.length || (t3 = e3.changedTouches[0], f2.setStartSlide(e3, t3.clientX, t3.clientY), document.addEventListener("touchmove", f2.handleTouchSlide, false), document.addEventListener("touchend", f2.endSlide, false), f2.props.onSliderDragStart && f2.props.onSliderDragStart(), yc(e3));
        }), E(y(f2), "handleMouseSlide", function(e3) {
          null !== f2.state.slidingIndex && (f2.handleSlide(e3.clientX, e3.clientY), yc(e3));
        }), E(y(f2), "handleTouchSlide", function(e3) {
          var t3;
          null !== f2.state.slidingIndex && (1 < e3.changedTouches.length ? f2.endSlide() : (t3 = e3.changedTouches[0], f2.handleSlide(t3.clientX, t3.clientY), yc(e3)));
        }), E(y(f2), "handleSlide", function(e3, t3) {
          var n3 = f2.state, r3 = n3.slidingIndex, n3 = n3.sliderBox, n3 = "vertical" === f2.props.orientation ? (t3 - n3.top) / n3.height * fc : (e3 - n3.left) / n3.width * fc;
          f2.slideTo(r3, n3), f2.canMove(r3, n3) && (f2.setState({ mousePos: { x: e3, y: t3 } }), f2.props.onSliderDragMove) && f2.props.onSliderDragMove();
        }), E(y(f2), "endSlide", function() {
          var e3, t3 = f2.state.slidingIndex;
          f2.setState({ slidingIndex: null }), document.removeEventListener("mouseup", f2.endSlide, false), document.removeEventListener("touchend", f2.endSlide, false), document.removeEventListener("touchmove", f2.handleTouchSlide, false), document.removeEventListener("mousemove", f2.handleMouseSlide, false), f2.props.onSliderDragEnd && f2.props.onSliderDragEnd(), f2.props.snap ? (e3 = f2.getSnapPosition(f2.state.handlePos[t3]), f2.slideTo(t3, e3, function() {
            return f2.fireChangeEvent();
          })) : f2.fireChangeEvent();
        }), E(y(f2), "handleClick", function(e3) {
          var t3;
          e3.target.getAttribute("data-handle-key") || (t3 = f2.getSliderBoundingBox(), e3 = ("vertical" === f2.props.orientation ? (e3.clientY - t3.top) / t3.height : (e3.clientX - t3.left) / t3.width) * fc, t3 = f2.getClosestHandle(e3), e3 = f2.getSnapPosition(e3), f2.slideTo(t3, e3, function() {
            return f2.fireChangeEvent();
          }), f2.props.onClick && f2.props.onClick());
        }), E(y(f2), "handleKeydown", function(e3) {
          var t3, n3 = vc(e3);
          e3.keyCode === sc ? e3.currentTarget.blur() : null !== (t3 = f2.getNextPositionForKey(n3, e3.keyCode)) && (f2.canMove(n3, t3) && (f2.slideTo(n3, t3, function() {
            return f2.fireChangeEvent();
          }), f2.props.onKeyPress) && f2.props.onKeyPress(), yc(e3));
        }), E(y(f2), "validatePosition", function(e3, t3) {
          var n3 = f2.state, r3 = n3.handlePos, n3 = n3.handleDimensions;
          return Math.max(Math.min(t3, void 0 !== r3[e3 + 1] ? r3[e3 + 1] - n3 : fc), void 0 !== r3[e3 - 1] ? r3[e3 - 1] + n3 : 0);
        }), E(y(f2), "validateValues", function(e3, t3) {
          var t3 = t3 || f2.props, r3 = t3.max, i3 = t3.min;
          return e3.map(function(e4, t4, n3) {
            e4 = Math.max(Math.min(e4, r3), i3);
            return n3.length && e4 < n3[t4 - 1] ? n3[t4 - 1] : e4;
          });
        }), E(y(f2), "canMove", function(e3, t3) {
          var n3 = f2.state, r3 = n3.handlePos, n3 = n3.handleDimensions;
          return !(t3 < 0 || fc < t3 || (void 0 !== r3[e3 + 1] ? r3[e3 + 1] - n3 : 1 / 0) < t3 || t3 < (void 0 !== r3[e3 - 1] ? r3[e3 - 1] + n3 : -1 / 0));
        }), E(y(f2), "fireChangeEvent", function() {
          var e3 = f2.props.onChange;
          e3 && e3(f2.getPublicState());
        }), E(y(f2), "slideTo", function(e3, t3, n3) {
          e3 = f2.getNextState(e3, t3);
          f2.setState(e3, function() {
            var e4 = f2.props.onValuesUpdated;
            e4 && e4(f2.getPublicState()), n3 && n3();
          });
        }), E(y(f2), "updateNewValues", function(e3) {
          var t3, n3, r3;
          null === f2.state.slidingIndex && (t3 = e3.max, n3 = e3.min, r3 = e3.values, r3 = f2.validateValues(r3, e3), f2.setState({ handlePos: r3.map(function(e4) {
            return mc(e4, n3, t3);
          }), values: r3 }, function() {
            return f2.fireChangeEvent();
          }));
        }), E(y(f2), "render", function() {
          var e3 = f2.props, t3 = e3.children, n3 = e3.disabled, r3 = e3.handle, i3 = e3.max, a2 = e3.min, s2 = e3.orientation, o2 = e3.pitComponent, c2 = e3.pitPoints, u2 = e3.progressBar, e3 = f2.state, l2 = e3.className, d2 = e3.handlePos, h2 = e3.values;
          return M("div", { className: l2, ref: f2.rheostat, onClick: n3 ? void 0 : f2.handleClick, style: { position: "relative" } }, bc, d2.map(function(e4, t4) {
            e4 = "vertical" === s2 ? { top: "".concat(e4, "%"), position: "absolute" } : { left: "".concat(e4, "%"), position: "absolute" };
            return M(r3, { "aria-valuemax": f2.getMaxValue(t4), "aria-valuemin": f2.getMinValue(t4), "aria-valuenow": h2[t4], "aria-disabled": n3, "data-handle-key": t4, className: "rheostat-handle", key: "handle-".concat(t4), onClick: yc, onKeyDown: n3 ? void 0 : f2.handleKeydown, onMouseDown: n3 ? void 0 : f2.startMouseSlide, onTouchStart: n3 ? void 0 : f2.startTouchSlide, role: "slider", style: e4, tabIndex: 0 });
          }), d2.map(function(e4, t4, n4) {
            return 0 === t4 && 1 < n4.length ? null : M(u2, { className: "rheostat-progress", key: "progress-bar-".concat(t4), style: f2.getProgressStyle(t4) });
          }), o2 && c2.map(function(e4) {
            var t4 = mc(e4, a2, i3), t4 = "vertical" === s2 ? { top: "".concat(t4, "%"), position: "absolute" } : { left: "".concat(t4, "%"), position: "absolute" };
            return M(o2, { key: "pit-".concat(e4), style: t4 }, e4);
          }), t3);
        }), f2;
      }
      return D(i2);
    }(), Sc = (E(Rc, "defaultProps", { className: "", children: null, disabled: false, handle: function(e2) {
      return M("button", m({}, e2, { type: "button" }));
    }, max: fc, min: 0, onClick: null, onChange: null, onKeyPress: null, onSliderDragEnd: null, onSliderDragMove: null, onSliderDragStart: null, onValuesUpdated: null, orientation: "horizontal", pitComponent: null, pitPoints: [], progressBar: "div", snap: false, snapPoints: [], values: [0] }), function() {
      U(a2, Ot);
      var i2 = q(a2);
      function a2() {
        var t2;
        W(this, a2);
        for (var e2 = arguments.length, n2 = new Array(e2), r2 = 0; r2 < e2; r2++) n2[r2] = arguments[r2];
        return E(y(t2 = i2.call.apply(i2, [this].concat(n2))), "handleChange", function(e3) {
          e3 = e3.values;
          t2.isDisabled || t2.props.refine(e3);
        }), E(y(t2), "createHandleComponent", function(n3) {
          return function(e3) {
            var t3 = Math.round(100 * parseFloat(e3["aria-valuenow"])) / 100, t3 = "object" === A(n3) && n3.format ? n3.format(t3) : t3;
            return M("div", m({}, e3, { className: F(e3.className, 0 === e3["data-handle-key"] && "rheostat-handle-lower", 1 === e3["data-handle-key"] && "rheostat-handle-upper"), "aria-label": 0 === e3["data-handle-key"] ? "Minimum Filter Handle" : "Maximum Filter Handle" }), n3 && M("div", { className: "rheostat-tooltip" }, t3));
          };
        }), t2;
      }
      return D(a2, [{ key: "isDisabled", get: function() {
        return this.props.min >= this.props.max;
      } }, { key: "computeDefaultPitPoints", value: function(e2) {
        var t2 = e2.min, e2 = e2.max, n2 = (e2 - t2) / 34;
        return [t2].concat(w(Ge({ end: 33 }).map(function(e3) {
          return t2 + n2 * (e3 + 1);
        })), [e2]);
      } }, { key: "computeSnapPoints", value: function(e2) {
        var t2 = e2.min, n2 = e2.max, e2 = e2.step;
        if (e2) return [].concat(w(Ge({ start: t2, end: n2, step: e2 })), [n2]);
      } }, { key: "render", value: function() {
        var e2 = this.props, t2 = e2.tooltips, n2 = e2.step, r2 = e2.pips, i3 = e2.values, e2 = e2.cssClasses, a3 = this.isDisabled ? { min: this.props.min, max: this.props.max + 1e-3 } : this.props, s2 = a3.min, a3 = a3.max, n2 = this.computeSnapPoints({ min: s2, max: a3, step: n2 }), r2 = false === r2 ? [] : this.computeDefaultPitPoints({ min: s2, max: a3 });
        return M("div", { className: F(e2.root, this.isDisabled && e2.disabledRoot) }, M(Rc, { handle: this.createHandleComponent(t2), onChange: this.handleChange, min: s2, max: a3, pitComponent: Go, pitPoints: r2, snap: true, snapPoints: n2, values: this.isDisabled ? [s2, a3] : i3, disabled: this.isDisabled }));
      } }]), a2;
    }()), _c = l({ name: "range-slider" }), wc = i("RangeSlider");
    function Pc(e2) {
      var t2 = e2.children, n2 = e2.count, r2 = e2.value, i2 = e2.url, e2 = e2.cssClasses;
      return n2 ? M("a", { className: F(e2.link), "aria-label": "".concat(r2, " & up"), href: i2 }, t2) : M("div", { className: F(e2.link), "aria-label": "".concat(r2, " & up"), disabled: true }, t2);
    }
    var Nc = { item: function(e2) {
      var t2 = e2.count, n2 = e2.value, r2 = e2.url, i2 = e2.stars, a2 = e2.cssClasses;
      return M(Pc, { count: t2, value: n2, url: r2, cssClasses: a2 }, i2.map(function(e3, t3) {
        return M("svg", { key: t3, className: F(a2.starIcon, e3 ? a2.fullStarIcon : a2.emptyStarIcon), "aria-hidden": "true", width: "24", height: "24" }, M("use", { xlinkHref: e3 ? "#ais-RatingMenu-starSymbol" : "#ais-RatingMenu-starEmptySymbol" }));
      }), M("span", { className: F(a2.label) }, "& Up"), t2 && M("span", { className: F(a2.count) }, ua(t2)));
    } }, xc = l({ name: "rating-menu" }), C = i("RatingMenu"), Ic = M("path", { d: "M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" }), Fc = M("path", { d: "M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z" }), Cc = M("path", { d: "M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z" }), Tc = M("path", { d: "M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z" }), Ec = M("g", { fill: "none", "fill-rule": "evenodd" }, M("g", { transform: "translate(1 1)", "stroke-width": "2" }, M("circle", { "stroke-opacity": ".5", cx: "18", cy: "18", r: "18" }), M("path", { d: "M36 18c0-9.94-8.06-18-18-18" }, M("animateTransform", { attributeName: "transform", type: "rotate", from: "0 18 18", to: "360 18 18", dur: "1s", repeatCount: "indefinite" })))), kc = { reset: function(e2) {
      return M("svg", { className: e2.cssClasses.resetIcon, viewBox: "0 0 20 20", width: "10", height: "10", "aria-hidden": "true" }, Cc);
    }, submit: function(e2) {
      return M("svg", { className: e2.cssClasses.submitIcon, width: "10", height: "10", viewBox: "0 0 40 40", "aria-hidden": "true" }, Tc);
    }, loadingIndicator: function(e2) {
      return M("svg", { "aria-label": "Results are loading", className: e2.cssClasses.loadingIcon, width: "16", height: "16", viewBox: "0 0 38 38", stroke: "#444", "aria-hidden": "true" }, Ec);
    } }, jc = { item: function(e2) {
      var t2 = e2.cssClasses, n2 = e2.count, r2 = e2.value, i2 = e2.highlighted, a2 = e2.isRefined, e2 = e2.isFromSearch;
      return M("label", { className: F(t2.label) }, M("input", { type: "checkbox", className: F(t2.checkbox), value: r2, defaultChecked: a2 }), M("span", { className: F(t2.labelText), dangerouslySetInnerHTML: e2 ? { __html: i2 } : void 0 }, !e2 && i2), M("span", { className: F(t2.count) }, ua(n2)));
    }, showMoreText: function(e2) {
      return e2.isShowingMore ? "Show less" : "Show more";
    }, searchableNoResults: function() {
      return "No results";
    } }, Mc = l({ name: "refinement-list" }), H = i("RefinementList"), Lc = i("SearchBox"), Oc = function(e2) {
      var t2 = e2.cssClasses, n2 = e2.templates, r2 = e2.isRelevantSorted, i2 = e2.isVirtualReplica, a2 = e2.refine;
      return i2 ? M("div", { className: t2.root }, M(v, { templateKey: "text", templates: n2, rootProps: { className: t2.text }, data: { isRelevantSorted: r2 } }), M("button", { type: "button", className: t2.button, onClick: function() {
        a2(r2 ? 0 : void 0);
      } }, M(v, { rootTagName: "span", templateKey: "button", templates: n2, data: { isRelevantSorted: r2 } }))) : null;
    }, Hc = { text: function() {
      return "";
    }, button: function(e2) {
      return e2.isRelevantSorted ? "See all results" : "See relevant results";
    } }, Ac = l({ name: "relevant-sort" }), Wc = i("RelevantSort"), Dc = l({ name: "search-box" }), Uc = i("SearchBox"), $c = l({ name: "sort-by" }), Bc = i("SortBy"), Qc = ["nbHits", "nbSortedHits", "cssClasses", "templateProps"], qc = function(e2) {
      var t2 = e2.nbHits, n2 = e2.nbSortedHits, r2 = e2.cssClasses, i2 = e2.templateProps, e2 = k(e2, Qc);
      return M("div", { className: F(r2.root) }, M(v, m({}, i2, { templateKey: "text", rootTagName: "span", rootProps: { className: r2.text }, data: T({ hasManySortedResults: n2 && 1 < n2, hasNoSortedResults: 0 === n2, hasOneSortedResults: 1 === n2, hasManyResults: 1 < t2, hasNoResults: 0 === t2, hasOneResult: 1 === t2, nbHits: t2, nbSortedHits: n2, cssClasses: r2 }, e2) })));
    }, Vc = l({ name: "stats" }), Kc = i("Stats"), zc = { text: function(e2) {
      return "".concat((e2.areHitsSorted ? function(e3) {
        var t2 = e3.nbHits, n2 = e3.hasNoSortedResults, r2 = e3.hasOneSortedResults, i2 = e3.hasManySortedResults, e3 = e3.nbSortedHits, t2 = "sorted out of ".concat(ua(t2));
        if (n2) return "No relevant results ".concat(t2);
        if (r2) return "1 relevant result ".concat(t2);
        if (i2) return "".concat(ua(e3 || 0), " relevant results ").concat(t2);
        return "";
      } : function(e3) {
        var t2 = e3.nbHits, n2 = e3.hasNoResults, r2 = e3.hasOneResult, e3 = e3.hasManyResults;
        if (n2) return "No results";
        if (r2) return "1 result";
        if (e3) return "".concat(ua(t2), " results");
        return "";
      })(e2), " found in ").concat(e2.processingTimeMS, "ms");
    } };
    function Jc(e2) {
      var t2 = e2.status, n2 = e2.errorCode, e2 = e2.isListening;
      return "error" === t2 && "not-allowed" === n2 ? tu : M(x, null, M("path", { d: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z", fill: e2 ? "currentColor" : "none" }), nu, ru, iu);
    }
    function a(e2) {
      return new fa(e2);
    }
    var Zc = function(e2) {
      var t2 = e2.currentRefinement, n2 = e2.refine, r2 = e2.cssClasses, e2 = e2.templateProps;
      return M("div", { className: r2.root }, M("label", { className: r2.label }, M("input", { className: r2.checkbox, type: "checkbox", checked: t2.isRefined, onChange: function(e3) {
        return n2({ isRefined: !e3.target.checked });
      } }), M(v, m({}, e2, { rootTagName: "span", rootProps: { className: r2.labelText }, templateKey: "labelText", data: t2 }))));
    }, Yc = { labelText: function(e2) {
      return e2.name;
    } }, Xc = l({ name: "toggle-refinement" }), Gc = i("ToggleRefinement"), eu = function(e2) {
      var t2 = e2.cssClasses, n2 = e2.isBrowserSupported, r2 = e2.isListening, i2 = e2.toggleListening, a2 = e2.voiceListeningState, e2 = e2.templates, s2 = a2.status, o2 = a2.transcript, c2 = a2.isSpeechFinal, a2 = a2.errorCode;
      return M("div", { className: t2.root }, M(v, { templateKey: "buttonText", rootTagName: "button", rootProps: { className: t2.button, type: "button", title: "Search by voice".concat(n2 ? "" : " (not supported on this browser)"), onClick: function(e3) {
        e3.currentTarget instanceof HTMLElement && e3.currentTarget.blur(), i2();
      }, disabled: !n2 }, data: { status: s2, errorCode: a2, isListening: r2, transcript: o2, isSpeechFinal: c2, isBrowserSupported: n2 }, templates: e2 }), M(v, { templateKey: "status", rootProps: { className: t2.status }, data: { status: s2, errorCode: a2, isListening: r2, transcript: o2, isSpeechFinal: c2, isBrowserSupported: n2 }, templates: e2 }));
    }, tu = M(x, null, M("line", { x1: "1", y1: "1", x2: "23", y2: "23" }), M("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" }), M("path", { d: "M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" }), M("line", { x1: "12", y1: "19", x2: "12", y2: "23" }), M("line", { x1: "8", y1: "23", x2: "16", y2: "23" })), nu = M("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }), ru = M("line", { x1: "12", y1: "19", x2: "12", y2: "23" }), iu = M("line", { x1: "8", y1: "23", x2: "16", y2: "23" }), au = { buttonText: function(e2) {
      var t2 = e2.status, n2 = e2.errorCode, e2 = e2.isListening;
      return M("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, M(Jc, { status: t2, errorCode: n2, isListening: e2 }));
    }, status: function(e2) {
      return M("p", null, e2.transcript);
    } }, su = l({ name: "voice-search" }), ou = i("VoiceSearch"), e = J(e), cu = J(os), e = Object.freeze({ __proto__: null, EXPERIMENTAL_answers: e, EXPERIMENTAL_dynamicWidgets: cu, dynamicWidgets: os, analytics: function(e2) {
      var n2, i2, a2, s2, r2, o2, c2, t2, u2, l2 = e2 || {}, d2 = l2.pushFunction, h2 = l2.delay, f2 = void 0 === h2 ? 3e3 : h2, h2 = l2.triggerOnUIInteraction, m2 = void 0 !== h2 && h2, h2 = l2.pushInitialSearch, l2 = l2.pushPagination, p2 = void 0 !== l2 && l2;
      if (d2) return n2 = null, i2 = function(e3) {
        var t3, n3, r3 = [];
        for (t3 in e3) e3.hasOwnProperty(t3) && (n3 = e3[t3].join("+"), r3.push("".concat(encodeURIComponent(t3), "=").concat(encodeURIComponent(t3), "_").concat(encodeURIComponent(n3))));
        return r3.join("&");
      }, a2 = function(e3) {
        var t3, n3 = [];
        for (t3 in e3) if (e3.hasOwnProperty(t3)) {
          var r3 = e3[t3];
          if (r3.hasOwnProperty(">=") && r3.hasOwnProperty("<=")) r3[">="] && r3[">="][0] === r3["<="] && r3["<="][0] ? n3.push("".concat(t3, "=").concat(t3, "_").concat(r3[">="])) : n3.push("".concat(t3, "=").concat(t3, "_").concat(r3[">="], "to").concat(r3["<="]));
          else if (r3.hasOwnProperty(">=")) n3.push("".concat(t3, "=").concat(t3, "_from").concat(r3[">="]));
          else if (r3.hasOwnProperty("<=")) n3.push("".concat(t3, "=").concat(t3, "_to").concat(r3["<="]));
          else if (r3.hasOwnProperty("=")) {
            var i3, a3 = [];
            for (i3 in r3["="]) r3["="].hasOwnProperty(i3) && a3.push(r3["="][i3]);
            n3.push("".concat(t3, "=").concat(t3, "_").concat(a3.join("-")));
          }
        }
        return n3.join("&");
      }, r2 = function(e3) {
        var t3, n3, r3;
        null !== e3 && (t3 = [], n3 = i2(T(T(T({}, e3.state.disjunctiveFacetsRefinements), e3.state.facetsRefinements), e3.state.hierarchicalFacetsRefinements)), r3 = a2(e3.state.numericRefinements), "" !== n3 && t3.push(n3), "" !== r3 && t3.push(r3), n3 = t3.join("&"), r3 = "Query: ".concat(e3.state.query || "", ", ").concat(n3), true === p2 && (r3 += ", Page: ".concat(e3.state.page || 0)), s2 !== r3) && (d2(n3, e3.state, e3.results), s2 = r3);
      }, c2 = !(s2 = "") === (void 0 === h2 || h2) ? false : true, t2 = function() {
        r2(n2);
      }, u2 = function() {
        r2(n2);
      }, { $$type: "ais.analytics", $$widgetType: "ais.analytics", init: function() {
        true === m2 && (document.addEventListener("click", t2), window.addEventListener("beforeunload", u2));
      }, render: function(e3) {
        var t3 = e3.results, e3 = e3.state;
        true === c2 ? c2 = false : (n2 = { results: t3, state: e3 }, o2 && clearTimeout(o2), o2 = window.setTimeout(function() {
          return r2(n2);
        }, f2));
      }, dispose: function() {
        true === m2 && (document.removeEventListener("click", t2), window.removeEventListener("beforeunload", u2));
      }, getRenderState: function(e3, t3) {
        return T(T({}, e3), {}, { analytics: this.getWidgetRenderState(t3) });
      }, getWidgetRenderState: function() {
        return { widgetParams: e2 };
      } };
      throw new Error(hs("The `pushFunction` option is required."));
    }, breadcrumb: function(e2) {
      var t2, s2, o2, c2, u2, e2 = e2 || {}, n2 = e2.container, r2 = e2.attributes, i2 = e2.separator, a2 = e2.rootPath, l2 = e2.transformItems, d2 = e2.templates, d2 = void 0 === d2 ? {} : d2, e2 = e2.cssClasses, e2 = void 0 === e2 ? {} : e2;
      if (n2) return t2 = P(n2), n2 = { root: F(gs(), e2.root), noRefinementRoot: F(gs({ modifierName: "noRefinement" }), e2.noRefinementRoot), list: F(gs({ descendantName: "list" }), e2.list), item: F(gs({ descendantName: "item" }), e2.item), selectedItem: F(gs({ descendantName: "item", modifierName: "selected" }), e2.selectedItem), separator: F(gs({ descendantName: "separator" }), e2.separator), link: F(gs({ descendantName: "link" }), e2.link) }, s2 = (e2 = { containerNode: t2, cssClasses: n2, renderState: {}, templates: d2 }).containerNode, o2 = e2.cssClasses, c2 = e2.renderState, u2 = e2.templates, T(T({}, Dn(function(e3, t3) {
        var n3 = e3.canRefine, r3 = e3.createURL, i3 = e3.instantSearchInstance, a3 = e3.items, e3 = e3.refine;
        t3 ? c2.templateProps = O({ defaultTemplates: ms, templatesConfig: i3.templatesConfig, templates: u2 }) : L(M(fs, { canRefine: n3, cssClasses: o2, createURL: r3, items: a3, refine: e3, templateProps: c2.templateProps }), s2);
      }, function() {
        return L(null, t2);
      })({ attributes: r2, separator: i2, rootPath: a2, transformItems: l2 })), {}, { $$widgetType: "ais.breadcrumb" });
      throw new Error(ps("The `container` option is required."));
    }, clearRefinements: function(e2) {
      var t2, i2, a2, s2, o2, e2 = e2 || {}, n2 = e2.container, r2 = e2.templates, r2 = void 0 === r2 ? {} : r2, c2 = e2.includedAttributes, u2 = e2.excludedAttributes, l2 = e2.transformItems, e2 = e2.cssClasses, e2 = void 0 === e2 ? {} : e2;
      if (n2) return t2 = P(n2), n2 = { root: F(Rs(), e2.root), button: F(Rs({ descendantName: "button" }), e2.button), disabledButton: F(Rs({ descendantName: "button", modifierName: "disabled" }), e2.disabledButton) }, i2 = (e2 = { containerNode: t2, cssClasses: n2, renderState: {}, templates: r2 }).containerNode, a2 = e2.cssClasses, s2 = e2.renderState, o2 = e2.templates, T(T({}, ot(function(e3, t3) {
        var n3 = e3.refine, r3 = e3.canRefine, e3 = e3.instantSearchInstance;
        t3 ? s2.templateProps = O({ defaultTemplates: ys, templatesConfig: e3.templatesConfig, templates: o2 }) : L(M(vs, { refine: n3, cssClasses: a2, hasRefinements: r3, templateProps: s2.templateProps }), i2);
      }, function() {
        return L(null, t2);
      })({ includedAttributes: c2, excludedAttributes: u2, transformItems: l2 })), {}, { $$widgetType: "ais.clearRefinements" });
      throw new Error(bs("The `container` option is required."));
    }, configure: function(e2) {
      return T(T({}, Qr(R)({ searchParameters: e2 })), {}, { $$widgetType: "ais.configure" });
    }, currentRefinements: function(e2) {
      var t2, e2 = e2 || {}, n2 = e2.container, r2 = e2.includedAttributes, i2 = e2.excludedAttributes, a2 = e2.cssClasses, a2 = void 0 === a2 ? {} : a2, e2 = e2.transformItems;
      if (n2) return t2 = P(n2), n2 = { root: F(ws(), a2.root), noRefinementRoot: F(ws({ modifierName: "noRefinement" }), a2.noRefinementRoot), list: F(ws({ descendantName: "list" }), a2.list), item: F(ws({ descendantName: "item" }), a2.item), label: F(ws({ descendantName: "label" }), a2.label), category: F(ws({ descendantName: "category" }), a2.category), categoryLabel: F(ws({ descendantName: "categoryLabel" }), a2.categoryLabel), delete: F(ws({ descendantName: "delete" }), a2.delete) }, T(T({}, dt(cs, function() {
        return L(null, t2);
      })({ container: t2, cssClasses: n2, includedAttributes: r2, excludedAttributes: i2, transformItems: e2 })), {}, { $$widgetType: "ais.currentRefinements" });
      throw new Error(_s("The `container` option is required."));
    }, EXPERIMENTAL_configureRelatedItems: function(e2) {
      return T(T({}, Kr(R)(e2)), {}, { $$widgetType: "ais.configureRelatedItems" });
    }, geoSearch: function(e2) {
      var t2, n2, r2, i2, a2, u2, e2 = e2 || {}, s2 = e2.initialZoom, s2 = void 0 === s2 ? 1 : s2, o2 = e2.initialPosition, o2 = void 0 === o2 ? { lat: 0, lng: 0 } : o2, c2 = e2.templates, c2 = void 0 === c2 ? {} : c2, l2 = e2.cssClasses, l2 = void 0 === l2 ? {} : l2, d2 = e2.builtInMarker, d2 = void 0 === d2 ? {} : d2, h2 = e2.customHTMLMarker, f2 = e2.enableRefine, f2 = void 0 === f2 || f2, m2 = e2.enableClearMapRefinement, m2 = void 0 === m2 || m2, p2 = e2.enableRefineControl, p2 = void 0 === p2 || p2, g2 = e2.container, v2 = e2.googleReference, e2 = k(e2, Es);
      if (!g2) throw new Error(Ms("The `container` option is required."));
      if (v2) return t2 = P(g2), g2 = { root: F(Ls(), l2.root), tree: Ls({ descendantName: "tree" }), map: F(Ls({ descendantName: "map" }), l2.map), control: F(Ls({ descendantName: "control" }), l2.control), label: F(Ls({ descendantName: "label" }), l2.label), selectedLabel: F(Ls({ descendantName: "label", modifierName: "selected" }), l2.selectedLabel), input: F(Ls({ descendantName: "input" }), l2.input), redo: F(Ls({ descendantName: "redo" }), l2.redo), disabledRedo: F(Ls({ descendantName: "redo", modifierName: "disabled" }), l2.disabledRedo), reset: F(Ls({ descendantName: "reset" }), l2.reset) }, n2 = T(T({}, Ns), c2), r2 = T(T({}, { createOptions: function() {
        return {};
      }, events: {} }), d2), i2 = (Boolean(h2) || Boolean(c2.HTMLMarker)) && T(T({}, { createOptions: function() {
        return {};
      }, events: {} }), h2), u2 = v2, a2 = function() {
        U(c3, u2.maps.OverlayView);
        var o3 = q(c3);
        function c3(e3) {
          var t3, n3 = e3.__id, r3 = e3.position, i3 = e3.map, a3 = e3.template, s3 = e3.className, e3 = e3.anchor, e3 = void 0 === e3 ? { x: 0, y: 0 } : e3;
          return W(this, c3), E(y(t3 = o3.call(this)), "__id", void 0), E(y(t3), "anchor", void 0), E(y(t3), "offset", void 0), E(y(t3), "listeners", void 0), E(y(t3), "latLng", void 0), E(y(t3), "element", void 0), t3.__id = n3, t3.anchor = e3, t3.listeners = {}, t3.latLng = new u2.maps.LatLng(r3), t3.element = document.createElement("div"), t3.element.className = s3, t3.element.style.position = "absolute", "object" === A(a3) ? L(a3, t3.element) : t3.element.innerHTML = a3, t3.setMap(i3), t3;
        }
        return D(c3, [{ key: "onAdd", value: function() {
          this.getPanes().overlayMouseTarget.appendChild(this.element);
          var e3 = this.element.getBoundingClientRect();
          this.offset = { x: this.anchor.x + e3.width / 2, y: this.anchor.y + e3.height }, this.element.style.width = "".concat(e3.width, "px");
        } }, { key: "draw", value: function() {
          var e3 = this.getProjection().fromLatLngToDivPixel(this.latLng);
          this.element.style.left = "".concat(Math.round(e3.x - this.offset.x), "px"), this.element.style.top = "".concat(Math.round(e3.y - this.offset.y), "px"), this.element.style.zIndex = String(parseInt(this.element.style.top, 10));
        } }, { key: "onRemove", value: function() {
          var t3 = this;
          this.element && (this.element.parentNode.removeChild(this.element), Object.keys(this.listeners).forEach(function(e3) {
            t3.element.removeEventListener(e3, t3.listeners[e3]);
          }), delete this.element, delete this.listeners);
        } }, { key: "addListener", value: function(e3, t3) {
          this.listeners[e3] = t3;
          var n3 = this.element;
          return n3.addEventListener(e3, t3), { remove: function() {
            return n3.removeEventListener(e3, t3);
          } };
        } }, { key: "getPosition", value: function() {
          return this.latLng;
        } }]), c3;
      }(), l2 = i2 ? function(e3) {
        var t3 = e3.item, e3 = k(e3, js);
        return new a2(T(T(T({}, i2.createOptions(t3)), e3), {}, { __id: t3.objectID, position: t3._geoloc, className: F(Ls({ descendantName: "marker" })), template: Ya({ templateKey: "HTMLMarker", templates: n2, data: t3 }) }));
      } : function(e3) {
        var t3 = e3.item, e3 = k(e3, ks);
        return new v2.maps.Marker(T(T(T({}, r2.createOptions(t3)), e3), {}, { __id: t3.objectID, position: t3._geoloc }));
      }, d2 = i2 || r2, T(T({}, zn(ds, function() {
        return L(null, t2);
      })(T(T({}, e2), {}, { renderState: {}, container: t2, googleReference: v2, initialZoom: s2, initialPosition: o2, templates: n2, cssClasses: g2, createMarker: l2, markerOptions: d2, enableRefine: f2, enableClearMapRefinement: m2, enableRefineControl: p2 }))), {}, { $$widgetType: "ais.geoSearch" });
      throw new Error(Ms("The `googleReference` option is required."));
    }, hierarchicalMenu: function(e2) {
      var t2, c2, u2, l2, d2, h2, e2 = e2 || {}, n2 = e2.container, r2 = e2.attributes, i2 = e2.separator, a2 = e2.rootPath, s2 = e2.showParentLevel, o2 = e2.limit, f2 = e2.showMore, f2 = void 0 !== f2 && f2, m2 = e2.showMoreLimit, p2 = e2.sortBy, g2 = e2.transformItems, v2 = e2.templates, v2 = void 0 === v2 ? {} : v2, e2 = e2.cssClasses, e2 = void 0 === e2 ? {} : e2;
      if (n2) return t2 = P(n2), n2 = { root: F(S(), e2.root), noRefinementRoot: F(S({ modifierName: "noRefinement" }), e2.noRefinementRoot), list: F(S({ descendantName: "list" }), e2.list), childList: F(S({ descendantName: "list", modifierName: "child" }), e2.childList), item: F(S({ descendantName: "item" }), e2.item), selectedItem: F(S({ descendantName: "item", modifierName: "selected" }), e2.selectedItem), parentItem: F(S({ descendantName: "item", modifierName: "parent" }), e2.parentItem), link: F(S({ descendantName: "link" }), e2.link), selectedItemLink: F(S({ descendantName: "link", modifierName: "selected" }), e2.selectedItemLink), label: F(S({ descendantName: "label" }), e2.label), count: F(S({ descendantName: "count" }), e2.count), showMore: F(S({ descendantName: "showMore" }), e2.showMore), disabledShowMore: F(S({ descendantName: "showMore", modifierName: "disabled" }), e2.disabledShowMore) }, c2 = (e2 = { cssClasses: n2, containerNode: t2, templates: v2, showMore: f2, renderState: {} }).cssClasses, u2 = e2.containerNode, l2 = e2.showMore, d2 = e2.templates, h2 = e2.renderState, T(T({}, vt(function(e3, t3) {
        var n3 = e3.createURL, r3 = e3.items, i3 = e3.refine, a3 = e3.instantSearchInstance, s3 = e3.isShowingMore, o3 = e3.toggleShowMore, e3 = e3.canToggleShowMore;
        t3 ? h2.templateProps = O({ defaultTemplates: Bs, templatesConfig: a3.templatesConfig, templates: d2 }) : L(M($s, { createURL: n3, cssClasses: c2, facetValues: r3, templateProps: h2.templateProps, toggleRefinement: i3, showMore: l2, toggleShowMore: o3, isShowingMore: s3, canToggleShowMore: e3 }), u2);
      }, function() {
        return L(null, t2);
      })({ attributes: r2, separator: i2, rootPath: a2, showParentLevel: s2, limit: o2, showMore: f2, showMoreLimit: m2, sortBy: p2, transformItems: g2 })), {}, { $$widgetType: "ais.hierarchicalMenu" });
      throw new Error(Qs("The `container` option is required."));
    }, hits: function(e2) {
      var t2, u2, l2, d2, h2, e2 = e2 || {}, n2 = e2.container, r2 = e2.escapeHTML, i2 = e2.transformItems, a2 = e2.templates, a2 = void 0 === a2 ? {} : a2, e2 = e2.cssClasses, e2 = void 0 === e2 ? {} : e2;
      if (n2) return t2 = P(n2), u2 = (n2 = { containerNode: t2, cssClasses: e2, renderState: {}, templates: a2 }).renderState, l2 = n2.cssClasses, d2 = n2.containerNode, h2 = n2.templates, T(T({}, Pt(St)(function(e3, t3) {
        var i3, n3 = e3.hits, r3 = e3.results, a3 = e3.instantSearchInstance, s2 = e3.insights, o2 = e3.bindEvent, c2 = e3.sendEvent, e3 = e3.banner;
        t3 ? u2.templateProps = O({ defaultTemplates: qs, templatesConfig: a3.templatesConfig, templates: h2 }) : (i3 = Yt({ insights: s2, sendEvent: c2 }), L(M(zs, { hits: n3, itemComponent: function(e4) {
          var t4 = e4.hit, n4 = e4.index, r4 = k(e4, Vs);
          return M(v, m({}, u2.templateProps, { templateKey: "item", rootTagName: "li", rootProps: T(T({}, r4), {}, { onClick: function(e5) {
            i3(e5), r4.onClick();
          }, onAuxClick: function(e5) {
            i3(e5), r4.onAuxClick();
          } }), data: T(T({}, t4), {}, { get __hitIndex() {
            return n4;
          } }), bindEvent: o2, sendEvent: c2 }));
        }, sendEvent: c2, classNames: l2, emptyComponent: function(e4) {
          e4 = m({}, (Q(e4), e4));
          return M(v, m({}, u2.templateProps, { rootProps: e4, templateKey: "empty", data: r3, rootTagName: "fragment" }));
        }, banner: e3, bannerComponent: h2.banner ? function(e4) {
          return M(v, m({}, u2.templateProps, { templateKey: "banner", data: e4, rootTagName: "fragment" }));
        } : void 0 }), d2));
      }, function() {
        return L(null, t2);
      })({ escapeHTML: r2, transformItems: i2 })), {}, { $$widgetType: "ais.hits" });
      throw new Error(Ks("The `container` option is required."));
    }, hitsPerPage: function(e2) {
      var t2, r2, i2, e2 = e2 || {}, n2 = e2.container, a2 = e2.items, s2 = e2.cssClasses, s2 = void 0 === s2 ? {} : s2, e2 = e2.transformItems;
      if (n2) return t2 = P(n2), n2 = { root: F(Xs(), s2.root), select: F(Xs({ descendantName: "select" }), s2.select), option: F(Xs({ descendantName: "option" }), s2.option) }, r2 = (s2 = { containerNode: t2, cssClasses: n2 }).containerNode, i2 = s2.cssClasses, T(T({}, Gt(function(e3, t3) {
        var n3 = e3.items, e3 = e3.refine;
        t3 || (t3 = (_e(n3, function(e4) {
          return e4.isRefined;
        }) || {}).value, L(M("div", { className: i2.root }, M(Zs, { cssClasses: i2, currentValue: t3, options: n3, setValue: e3 })), r2));
      }, function() {
        return L(null, t2);
      })({ items: a2, transformItems: e2 })), {}, { $$widgetType: "ais.hitsPerPage" });
      throw new Error(Ys("The `container` option is required."));
    }, index: oa, infiniteHits: function(e2) {
      var t2, d2, h2, f2, m2, p2, e2 = e2 || {}, n2 = e2.container, r2 = e2.escapeHTML, i2 = e2.transformItems, a2 = e2.templates, a2 = void 0 === a2 ? {} : a2, s2 = e2.cssClasses, s2 = void 0 === s2 ? {} : s2, o2 = e2.showPrevious, e2 = e2.cache;
      if (n2) return t2 = P(n2), n2 = { root: F(no(), s2.root), emptyRoot: F(no({ modifierName: "empty" }), s2.emptyRoot), item: F(no({ descendantName: "item" }), s2.item), list: F(no({ descendantName: "list" }), s2.list), loadPrevious: F(no({ descendantName: "loadPrevious" }), s2.loadPrevious), disabledLoadPrevious: F(no({ descendantName: "loadPrevious", modifierName: "disabled" }), s2.disabledLoadPrevious), loadMore: F(no({ descendantName: "loadMore" }), s2.loadMore), disabledLoadMore: F(no({ descendantName: "loadMore", modifierName: "disabled" }), s2.disabledLoadMore) }, d2 = (s2 = { containerNode: t2, cssClasses: n2, templates: a2, showPrevious: o2, renderState: {} }).containerNode, h2 = s2.cssClasses, f2 = s2.renderState, m2 = s2.templates, p2 = s2.showPrevious, T(T({}, Pt(cn)(function(e3, t3) {
        var n3 = e3.hits, r3 = e3.results, i3 = e3.showMore, a3 = e3.showPrevious, s3 = e3.isFirstPage, o3 = e3.isLastPage, c2 = e3.instantSearchInstance, u2 = e3.insights, l2 = e3.bindEvent, e3 = e3.sendEvent;
        t3 ? f2.templateProps = O({ defaultTemplates: eo, templatesConfig: c2.templatesConfig, templates: m2 }) : L(M(Gs, { cssClasses: h2, hits: n3, results: r3, hasShowPrevious: p2, showPrevious: a3, showMore: i3, templateProps: f2.templateProps, isFirstPage: s3, isLastPage: o3, insights: u2, sendEvent: e3, bindEvent: l2 }), d2);
      }, function() {
        return L(null, t2);
      })({ escapeHTML: r2, transformItems: i2, showPrevious: o2, cache: e2 })), {}, { $$widgetType: "ais.infiniteHits" });
      throw new Error(to("The `container` option is required."));
    }, menu: function(e2) {
      var t2, c2, u2, l2, d2, h2, e2 = e2 || {}, n2 = e2.container, r2 = e2.attribute, i2 = e2.sortBy, a2 = e2.limit, s2 = e2.showMore, o2 = e2.showMoreLimit, f2 = e2.cssClasses, f2 = void 0 === f2 ? {} : f2, m2 = e2.templates, m2 = void 0 === m2 ? {} : m2, e2 = e2.transformItems;
      if (n2) return t2 = P(n2), n2 = { root: F(ao(), f2.root), noRefinementRoot: F(ao({ modifierName: "noRefinement" }), f2.noRefinementRoot), list: F(ao({ descendantName: "list" }), f2.list), item: F(ao({ descendantName: "item" }), f2.item), selectedItem: F(ao({ descendantName: "item", modifierName: "selected" }), f2.selectedItem), link: F(ao({ descendantName: "link" }), f2.link), label: F(ao({ descendantName: "label" }), f2.label), count: F(ao({ descendantName: "count" }), f2.count), showMore: F(ao({ descendantName: "showMore" }), f2.showMore), disabledShowMore: F(ao({ descendantName: "showMore", modifierName: "disabled" }), f2.disabledShowMore) }, c2 = (f2 = { containerNode: t2, cssClasses: n2, renderState: {}, templates: m2, showMore: s2 }).containerNode, u2 = f2.cssClasses, l2 = f2.renderState, d2 = f2.templates, h2 = f2.showMore, T(T({}, un(function(e3, t3) {
        var n3 = e3.refine, r3 = e3.items, i3 = e3.createURL, a3 = e3.instantSearchInstance, s3 = e3.isShowingMore, o3 = e3.toggleShowMore, e3 = e3.canToggleShowMore;
        t3 ? l2.templateProps = O({ defaultTemplates: ro, templatesConfig: a3.templatesConfig, templates: d2 }) : (t3 = r3.map(function(e4) {
          return T(T({}, e4), {}, { url: i3(e4.value) });
        }), L(M($s, { createURL: i3, cssClasses: u2, facetValues: t3, showMore: h2, templateProps: l2.templateProps, toggleRefinement: n3, toggleShowMore: o3, isShowingMore: s3, canToggleShowMore: e3 }), c2));
      }, function() {
        return L(null, t2);
      })({ attribute: r2, limit: a2, showMore: s2, showMoreLimit: o2, sortBy: i2, transformItems: e2 })), {}, { $$widgetType: "ais.menu" });
      throw new Error(io("The `container` option is required."));
    }, menuSelect: function(e2) {
      var t2, i2, a2, s2, o2, e2 = e2 || {}, n2 = e2.container, r2 = e2.attribute, c2 = e2.sortBy, c2 = void 0 === c2 ? ["name:asc"] : c2, u2 = e2.limit, u2 = void 0 === u2 ? 10 : u2, l2 = e2.cssClasses, l2 = void 0 === l2 ? {} : l2, d2 = e2.templates, d2 = void 0 === d2 ? {} : d2, e2 = e2.transformItems;
      if (n2) return t2 = P(n2), n2 = { root: F(uo(), l2.root), noRefinementRoot: F(uo({ modifierName: "noRefinement" }), l2.noRefinementRoot), select: F(uo({ descendantName: "select" }), l2.select), option: F(uo({ descendantName: "option" }), l2.option) }, i2 = (l2 = { containerNode: t2, cssClasses: n2, renderState: {}, templates: d2 }).containerNode, a2 = l2.cssClasses, s2 = l2.renderState, o2 = l2.templates, T(T({}, un(function(e3, t3) {
        var n3 = e3.refine, r3 = e3.items, e3 = e3.instantSearchInstance;
        t3 ? s2.templateProps = O({ defaultTemplates: oo, templatesConfig: e3.templatesConfig, templates: o2 }) : L(M(so, { cssClasses: a2, items: r3, refine: n3, templateProps: s2.templateProps }), i2);
      }, function() {
        return L(null, t2);
      })({ attribute: r2, limit: u2, sortBy: c2, transformItems: e2 })), {}, { $$widgetType: "ais.menuSelect" });
      throw new Error(co("The `container` option is required."));
    }, numericMenu: function(e2) {
      var t2, a2, s2, o2, c2, u2, e2 = e2 || {}, n2 = e2.container, r2 = e2.attribute, i2 = e2.items, l2 = e2.cssClasses, l2 = void 0 === l2 ? {} : l2, d2 = e2.templates, d2 = void 0 === d2 ? {} : d2, e2 = e2.transformItems;
      if (n2) return t2 = P(n2), n2 = { root: F(fo(), l2.root), noRefinementRoot: F(fo({ modifierName: "noRefinement" }), l2.noRefinementRoot), list: F(fo({ descendantName: "list" }), l2.list), item: F(fo({ descendantName: "item" }), l2.item), selectedItem: F(fo({ descendantName: "item", modifierName: "selected" }), l2.selectedItem), label: F(fo({ descendantName: "label" }), l2.label), radio: F(fo({ descendantName: "radio" }), l2.radio), labelText: F(fo({ descendantName: "labelText" }), l2.labelText) }, a2 = (l2 = { containerNode: t2, attribute: r2, cssClasses: n2, renderState: {}, templates: d2 }).containerNode, s2 = l2.attribute, o2 = l2.cssClasses, c2 = l2.renderState, u2 = l2.templates, T(T({}, mn(function(e3, t3) {
        var n3 = e3.createURL, r3 = e3.instantSearchInstance, i3 = e3.refine, e3 = e3.items;
        t3 ? c2.templateProps = O({ defaultTemplates: lo, templatesConfig: r3.templatesConfig, templates: u2 }) : L(M($s, { createURL: n3, cssClasses: o2, facetValues: e3, templateProps: c2.templateProps, toggleRefinement: i3, attribute: s2 }), a2);
      }, function() {
        return L(null, t2);
      })({ attribute: r2, items: i2, transformItems: e2 })), {}, { $$widgetType: "ais.numericMenu" });
      throw new Error(ho("The `container` option is required."));
    }, pagination: function(e2) {
      var t2, u2, l2, d2, h2, f2, m2, p2, g2, e2 = e2 || {}, n2 = e2.container, r2 = e2.templates, r2 = void 0 === r2 ? {} : r2, i2 = e2.cssClasses, i2 = void 0 === i2 ? {} : i2, a2 = e2.totalPages, s2 = e2.padding, o2 = e2.showFirst, o2 = void 0 === o2 || o2, c2 = e2.showLast, c2 = void 0 === c2 || c2, v2 = e2.showPrevious, v2 = void 0 === v2 || v2, y2 = e2.showNext, y2 = void 0 === y2 || y2, e2 = e2.scrollTo, e2 = void 0 === e2 ? "body" : e2;
      if (n2) return t2 = P(n2), e2 = false !== (n2 = true === e2 ? "body" : e2) && P(n2), n2 = { root: F(bo(), i2.root), noRefinementRoot: F(bo({ modifierName: "noRefinement" }), i2.noRefinementRoot), list: F(bo({ descendantName: "list" }), i2.list), item: F(bo({ descendantName: "item" }), i2.item), firstPageItem: F(bo({ descendantName: "item", modifierName: "firstPage" }), i2.firstPageItem), lastPageItem: F(bo({ descendantName: "item", modifierName: "lastPage" }), i2.lastPageItem), previousPageItem: F(bo({ descendantName: "item", modifierName: "previousPage" }), i2.previousPageItem), nextPageItem: F(bo({ descendantName: "item", modifierName: "nextPage" }), i2.nextPageItem), pageItem: F(bo({ descendantName: "item", modifierName: "page" }), i2.pageItem), selectedItem: F(bo({ descendantName: "item", modifierName: "selected" }), i2.selectedItem), disabledItem: F(bo({ descendantName: "item", modifierName: "disabled" }), i2.disabledItem), link: F(bo({ descendantName: "link" }), i2.link) }, i2 = T(T({}, So), r2), u2 = (r2 = { containerNode: t2, cssClasses: n2, templates: i2, showFirst: o2, showLast: c2, showPrevious: v2, showNext: y2, scrollToNode: e2 }).containerNode, l2 = r2.cssClasses, d2 = r2.templates, h2 = r2.showFirst, f2 = r2.showLast, m2 = r2.showPrevious, p2 = r2.showNext, g2 = r2.scrollToNode, T(T({}, bn(function(e3, t3) {
        var n3 = e3.createURL, r3 = e3.currentRefinement, i3 = e3.nbPages, a3 = e3.pages, s3 = e3.isFirstPage, o3 = e3.isLastPage, c3 = e3.refine;
        t3 || L(M(mo, { createURL: n3, cssClasses: l2, currentPage: r3, templates: d2, nbPages: i3, pages: a3, isFirstPage: s3, isLastPage: o3, setCurrentPage: function(e4) {
          c3(e4), false !== g2 && g2.scrollIntoView();
        }, showFirst: h2, showLast: f2, showPrevious: m2, showNext: p2 }), u2);
      }, function() {
        return L(null, t2);
      })({ totalPages: a2, padding: s2 })), {}, { $$widgetType: "ais.pagination" });
      throw new Error(Ro("The `container` option is required."));
    }, panel: function(e2) {
      var e2 = e2 || {}, t2 = e2.templates, r2 = void 0 === t2 ? {} : t2, t2 = e2.hidden, d2 = void 0 === t2 ? function() {
        return false;
      } : t2, t2 = e2.collapsed, e2 = e2.cssClasses, e2 = void 0 === e2 ? {} : e2, h2 = document.createElement("div"), f2 = Boolean(t2), m2 = "function" == typeof t2 ? t2 : function() {
        return false;
      }, p2 = { root: F(Uo(), e2.root), noRefinementRoot: F(Uo({ modifierName: "noRefinement" }), e2.noRefinementRoot), collapsibleRoot: F(Uo({ modifierName: "collapsible" }), e2.collapsibleRoot), collapsedRoot: F(Uo({ modifierName: "collapsed" }), e2.collapsedRoot), collapseButton: F(Uo({ descendantName: "collapseButton" }), e2.collapseButton), collapseIcon: F(Uo({ descendantName: "collapseIcon" }), e2.collapseIcon), body: F(Uo({ descendantName: "body" }), e2.body), header: F(Uo({ descendantName: "header" }), e2.header), footer: F(Uo({ descendantName: "footer" }), e2.footer) };
      return function(n2) {
        return function(e3) {
          var i2, a2, t3, s2, o2, c2, u2, l2;
          if (e3 && e3.container) return i2 = P(e3.container), t3 = { containerNode: i2, bodyContainerNode: h2, cssClasses: p2, templates: T(T({}, { collapseButtonText: function(e4) {
            e4 = e4.collapsed;
            return '<svg\n          class="'.concat(p2.collapseIcon, '"\n          style="width: 1em; height: 1em;"\n          viewBox="0 0 500 500"\n        >\n        <path d="').concat(e4 ? "M100 250l300-150v300z" : "M250 400l150-300H100z", '" fill="currentColor" />\n        </svg>');
          } }), r2) }, s2 = t3.containerNode, o2 = t3.bodyContainerNode, c2 = t3.cssClasses, u2 = t3.templates, a2 = function(e4) {
            var t4 = e4.options, n3 = e4.hidden, r3 = e4.collapsible, e4 = e4.collapsed;
            L(M(Wo, { cssClasses: c2, hidden: n3, collapsible: r3, isCollapsed: e4, templates: u2, data: t4, bodyElement: o2 }), s2);
          }, l2 = n2(T(T({}, e3), {}, { container: h2 })), T(T({}, l2), {}, { init: function() {
            for (var e4 = arguments.length, t4 = new Array(e4), n3 = 0; n3 < e4; n3++) t4[n3] = arguments[n3];
            var r3 = t4[0], r3 = T(T({}, l2.getWidgetRenderState ? l2.getWidgetRenderState(r3) : {}), r3);
            a2({ options: r3, hidden: true, collapsible: f2, collapsed: false }), "function" == typeof l2.init && (r3 = l2.init).call.apply(r3, [this].concat(t4));
          }, render: function() {
            for (var e4 = arguments.length, t4 = new Array(e4), n3 = 0; n3 < e4; n3++) t4[n3] = arguments[n3];
            var r3 = t4[0], r3 = T(T({}, l2.getWidgetRenderState ? l2.getWidgetRenderState(r3) : {}), r3);
            a2({ options: r3, hidden: Boolean(d2(r3)), collapsible: f2, collapsed: Boolean(m2(r3)) }), "function" == typeof l2.render && (r3 = l2.render).call.apply(r3, [this].concat(t4));
          }, dispose: function() {
            if (L(null, i2), "function" == typeof l2.dispose) {
              for (var e4, t4 = arguments.length, n3 = new Array(t4), r3 = 0; r3 < t4; r3++) n3[r3] = arguments[r3];
              return (e4 = l2.dispose).call.apply(e4, [this].concat(n3));
            }
          } });
          throw new Error(Do("The `container` option is required in the widget within the panel."));
        };
      };
    }, places: wa, poweredBy: function(e2) {
      var t2, r2, i2, e2 = e2 || {}, n2 = e2.container, a2 = e2.cssClasses, a2 = void 0 === a2 ? {} : a2, e2 = e2.theme, e2 = void 0 === e2 ? "light" : e2;
      if (n2) return t2 = P(n2), n2 = { root: F(qo(), qo({ modifierName: "dark" === e2 ? "dark" : "light" }), a2.root), link: F(qo({ descendantName: "link" }), a2.link), logo: F(qo({ descendantName: "logo" }), a2.logo) }, r2 = (a2 = { containerNode: t2, cssClasses: n2 }).containerNode, i2 = a2.cssClasses, T(T({}, Jn(function(e3, t3) {
        var n3 = e3.url, e3 = e3.widgetParams;
        t3 && (t3 = e3.theme, L(M(Qo, { cssClasses: i2, url: n3, theme: void 0 === t3 ? "light" : t3 }), r2));
      }, function() {
        return L(null, t2);
      })({ theme: e2 })), {}, { $$widgetType: "ais.poweredBy" });
      throw new Error(Vo("The `container` option is required."));
    }, queryRuleContext: function() {
      var e2 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
      if (e2.trackedFilters) return T(T({}, Yr(R)(e2)), {}, { $$widgetType: "ais.queryRuleContext" });
      throw new Error(Ko("The `trackedFilters` option is required."));
    }, queryRuleCustomData: function(e2) {
      var t2, n2, r2, i2, e2 = e2 || {}, a2 = e2.container, s2 = e2.cssClasses, s2 = void 0 === s2 ? {} : s2, o2 = e2.templates, o2 = void 0 === o2 ? {} : o2, e2 = e2.transformItems, e2 = void 0 === e2 ? function(e3) {
        return e3;
      } : e2;
      if (a2) return s2 = { root: F(Yo(), s2.root) }, t2 = P(a2), a2 = T(T({}, Jo), o2), n2 = (o2 = { containerNode: t2, cssClasses: s2, renderState: {}, templates: a2 }).containerNode, r2 = o2.cssClasses, i2 = o2.templates, T(T({}, Yr(function(e3) {
        e3 = e3.items;
        L(M(zo, { cssClasses: r2, templates: i2, items: e3 }), n2);
      }, function() {
        L(null, t2);
      })({ transformItems: e2 })), {}, { $$widgetType: "ais.queryRuleCustomData" });
      throw new Error(Zo("The `container` option is required."));
    }, rangeInput: function(e2) {
      var t2, s2, o2, c2, u2, e2 = e2 || {}, n2 = e2.container, r2 = e2.attribute, i2 = e2.min, a2 = e2.max, l2 = e2.precision, l2 = void 0 === l2 ? 0 : l2, d2 = e2.cssClasses, d2 = void 0 === d2 ? {} : d2, e2 = e2.templates, e2 = void 0 === e2 ? {} : e2;
      if (n2) return t2 = P(n2), n2 = { root: F(nc(), d2.root), noRefinement: F(nc({ modifierName: "noRefinement" })), form: F(nc({ descendantName: "form" }), d2.form), label: F(nc({ descendantName: "label" }), d2.label), input: F(nc({ descendantName: "input" }), d2.input), inputMin: F(nc({ descendantName: "input", modifierName: "min" }), d2.inputMin), inputMax: F(nc({ descendantName: "input", modifierName: "max" }), d2.inputMax), separator: F(nc({ descendantName: "separator" }), d2.separator), submit: F(nc({ descendantName: "submit" }), d2.submit) }, s2 = (d2 = { containerNode: t2, cssClasses: n2, templates: e2, renderState: {} }).containerNode, o2 = d2.cssClasses, c2 = d2.renderState, u2 = d2.templates, T(T({}, Pn(function(e3, t3) {
        var n3 = e3.refine, r3 = e3.range, i3 = e3.start, a3 = e3.widgetParams, e3 = e3.instantSearchInstance;
        t3 ? c2.templateProps = O({ defaultTemplates: rc, templatesConfig: e3.templatesConfig, templates: u2 }) : (t3 = r3.min, e3 = r3.max, i3 = (r3 = j(i3, 2))[0], r3 = r3[1], a3 = 1 / Math.pow(10, a3.precision || 0), L(M(ec, { min: t3, max: e3, step: a3, values: { min: i3 !== -1 / 0 && i3 !== t3 ? i3 : void 0, max: r3 !== 1 / 0 && r3 !== e3 ? r3 : void 0 }, cssClasses: o2, refine: n3, templateProps: c2.templateProps }), s2));
      }, function() {
        return L(null, t2);
      })({ attribute: r2, min: i2, max: a2, precision: l2 })), {}, { $$type: "ais.rangeInput", $$widgetType: "ais.rangeInput" });
      throw new Error(tc("The `container` option is required."));
    }, rangeSlider: function(e2) {
      var t2, a2, s2, o2, c2, u2, e2 = e2 || {}, n2 = e2.container, r2 = e2.attribute, i2 = e2.min, l2 = e2.max, d2 = e2.cssClasses, d2 = void 0 === d2 ? {} : d2, h2 = e2.step, f2 = e2.pips, f2 = void 0 === f2 || f2, m2 = e2.precision, m2 = void 0 === m2 ? 0 : m2, e2 = e2.tooltips, e2 = void 0 === e2 || e2;
      if (n2) return t2 = P(n2), n2 = { root: F(wc(), d2.root), disabledRoot: F(wc({ modifierName: "disabled" }), d2.disabledRoot) }, a2 = (d2 = { containerNode: t2, step: h2, pips: f2, tooltips: e2, cssClasses: n2 }).containerNode, s2 = d2.cssClasses, o2 = d2.pips, c2 = d2.step, u2 = d2.tooltips, T(T({}, Pn(function(e3, t3) {
        var n3, r3 = e3.refine, i3 = e3.range, e3 = e3.start;
        t3 || (t3 = i3.min, i3 = i3.max, n3 = (e3 = j(e3, 2))[0], e3 = e3[1], L(M(Sc, { cssClasses: s2, refine: r3, min: t3, max: i3, values: [i3 < (r3 = n3 === -1 / 0 ? t3 : n3) ? i3 : r3, (n3 = e3 === 1 / 0 ? i3 : e3) < t3 ? t3 : n3], tooltips: u2, step: c2, pips: o2 }), a2));
      }, function() {
        return L(null, t2);
      })({ attribute: r2, min: i2, max: l2, precision: m2 })), {}, { $$type: "ais.rangeSlider", $$widgetType: "ais.rangeSlider" });
      throw new Error(_c("The `container` option is required."));
    }, ratingMenu: function(e2) {
      var t2, a2, s2, o2, c2, e2 = e2 || {}, n2 = e2.container, r2 = e2.attribute, i2 = e2.max, i2 = void 0 === i2 ? 5 : i2, u2 = e2.cssClasses, u2 = void 0 === u2 ? {} : u2, e2 = e2.templates, e2 = void 0 === e2 ? {} : e2;
      if (n2) return t2 = P(n2), n2 = { root: F(C(), u2.root), noRefinementRoot: F(C({ modifierName: "noRefinement" }), u2.noRefinementRoot), list: F(C({ descendantName: "list" }), u2.list), item: F(C({ descendantName: "item" }), u2.item), selectedItem: F(C({ descendantName: "item", modifierName: "selected" }), u2.selectedItem), disabledItem: F(C({ descendantName: "item", modifierName: "disabled" }), u2.disabledItem), link: F(C({ descendantName: "link" }), u2.link), starIcon: F(C({ descendantName: "starIcon" }), u2.starIcon), fullStarIcon: F(C({ descendantName: "starIcon", modifierName: "full" }), u2.fullStarIcon), emptyStarIcon: F(C({ descendantName: "starIcon", modifierName: "empty" }), u2.emptyStarIcon), label: F(C({ descendantName: "label" }), u2.label), count: F(C({ descendantName: "count" }), u2.count) }, a2 = (u2 = { containerNode: t2, cssClasses: n2, renderState: {}, templates: e2 }).containerNode, s2 = u2.cssClasses, o2 = u2.templates, c2 = u2.renderState, T(T({}, jn(function(e3, t3) {
        var n3 = e3.refine, r3 = e3.items, i3 = e3.createURL, e3 = e3.instantSearchInstance;
        t3 ? c2.templateProps = O({ defaultTemplates: Nc, templatesConfig: e3.templatesConfig, templates: o2 }) : L(M($s, { createURL: i3, cssClasses: s2, facetValues: r3, templateProps: c2.templateProps, toggleRefinement: n3 }, M("svg", { style: "display:none;" }, M("symbol", { id: C({ descendantName: "starSymbol" }), viewBox: "0 0 24 24" }, Ic), M("symbol", { id: C({ descendantName: "starEmptySymbol" }), viewBox: "0 0 24 24" }, Fc))), a2);
      }, function() {
        return L(null, t2);
      })({ attribute: r2, max: i2 })), {}, { $$widgetType: "ais.ratingMenu" });
      throw new Error(xc("The `container` option is required."));
    }, refinementList: function(e2) {
      var t2, d2, h2, f2, m2, p2, g2, v2, y2, b2, e2 = e2 || {}, n2 = e2.container, r2 = e2.attribute, i2 = e2.operator, a2 = e2.sortBy, s2 = e2.limit, o2 = e2.showMore, c2 = e2.showMoreLimit, u2 = e2.searchable, u2 = void 0 !== u2 && u2, l2 = e2.searchablePlaceholder, l2 = void 0 === l2 ? "Search..." : l2, R2 = e2.searchableEscapeFacetValues, S2 = e2.searchableIsAlwaysActive, S2 = void 0 === S2 || S2, _2 = e2.cssClasses, _2 = void 0 === _2 ? {} : _2, w2 = e2.templates, w2 = void 0 === w2 ? {} : w2, e2 = e2.transformItems;
      if (n2) return R2 = !!u2 && Boolean(void 0 === R2 || R2), t2 = P(n2), n2 = { root: F(H(), _2.root), noRefinementRoot: F(H({ modifierName: "noRefinement" }), _2.noRefinementRoot), list: F(H({ descendantName: "list" }), _2.list), item: F(H({ descendantName: "item" }), _2.item), selectedItem: F(H({ descendantName: "item", modifierName: "selected" }), _2.selectedItem), searchBox: F(H({ descendantName: "searchBox" }), _2.searchBox), label: F(H({ descendantName: "label" }), _2.label), checkbox: F(H({ descendantName: "checkbox" }), _2.checkbox), labelText: F(H({ descendantName: "labelText" }), _2.labelText), count: F(H({ descendantName: "count" }), _2.count), noResults: F(H({ descendantName: "noResults" }), _2.noResults), showMore: F(H({ descendantName: "showMore" }), _2.showMore), disabledShowMore: F(H({ descendantName: "showMore", modifierName: "disabled" }), _2.disabledShowMore), searchable: { root: F(Lc(), _2.searchableRoot), form: F(Lc({ descendantName: "form" }), _2.searchableForm), input: F(Lc({ descendantName: "input" }), _2.searchableInput), submit: F(Lc({ descendantName: "submit" }), _2.searchableSubmit), submitIcon: F(Lc({ descendantName: "submitIcon" }), _2.searchableSubmitIcon), reset: F(Lc({ descendantName: "reset" }), _2.searchableReset), resetIcon: F(Lc({ descendantName: "resetIcon" }), _2.searchableResetIcon), loadingIndicator: F(Lc({ descendantName: "loadingIndicator" }), _2.searchableLoadingIndicator), loadingIcon: F(Lc({ descendantName: "loadingIcon" }), _2.searchableLoadingIcon) } }, _2 = { containerNode: t2, cssClasses: n2, templates: w2, searchBoxTemplates: { submit: w2.searchableSubmit, reset: w2.searchableReset, loadingIndicator: w2.searchableLoadingIndicator }, renderState: {}, searchable: u2, searchablePlaceholder: l2, searchableIsAlwaysActive: S2, showMore: o2 }, d2 = _2.containerNode, h2 = _2.cssClasses, f2 = _2.templates, m2 = _2.searchBoxTemplates, p2 = _2.renderState, g2 = _2.showMore, v2 = _2.searchable, y2 = _2.searchablePlaceholder, b2 = _2.searchableIsAlwaysActive, T(T({}, Nn(function(e3, t3) {
        var n3 = e3.refine, r3 = e3.items, i3 = e3.createURL, a3 = e3.searchForItems, s3 = e3.isFromSearch, o3 = e3.instantSearchInstance, c3 = e3.toggleShowMore, u3 = e3.isShowingMore, l3 = e3.hasExhaustiveItems, e3 = e3.canToggleShowMore;
        t3 ? (p2.templateProps = O({ defaultTemplates: jc, templatesConfig: o3.templatesConfig, templates: f2 }), p2.searchBoxTemplateProps = O({ defaultTemplates: kc, templatesConfig: o3.templatesConfig, templates: m2 })) : L(M($s, { createURL: i3, cssClasses: h2, facetValues: r3, templateProps: p2.templateProps, searchBoxTemplateProps: p2.searchBoxTemplateProps, toggleRefinement: n3, searchFacetValues: v2 ? a3 : void 0, searchPlaceholder: y2, searchIsAlwaysActive: b2, isFromSearch: s3, showMore: g2 && !s3 && 0 < r3.length, toggleShowMore: c3, isShowingMore: u3, hasExhaustiveItems: l3, canToggleShowMore: e3 }), d2);
      }, function() {
        return L(null, t2);
      })({ attribute: r2, operator: i2, limit: s2, showMore: o2, showMoreLimit: c2, sortBy: a2, escapeFacetValues: R2, transformItems: e2 })), {}, { $$widgetType: "ais.refinementList" });
      throw new Error(Mc("The `container` option is required."));
    }, relevantSort: function(e2) {
      var t2, r2, i2, a2, n2 = e2.container, s2 = e2.templates, s2 = void 0 === s2 ? {} : s2, e2 = e2.cssClasses, e2 = void 0 === e2 ? {} : e2;
      if (n2) return t2 = P(n2), n2 = { root: F(Wc(), e2.root), text: F(Wc({ descendantName: "text" }), e2.text), button: F(Wc({ descendantName: "button" }), e2.button) }, e2 = T(T({}, Hc), s2), r2 = (s2 = { containerNode: t2, cssClasses: n2, renderState: {}, templates: e2 }).containerNode, i2 = s2.cssClasses, a2 = s2.templates, T(T({}, ei(function(e3) {
        var t3 = e3.isRelevantSorted, n3 = e3.isVirtualReplica, e3 = e3.refine;
        L(M(Oc, { cssClasses: i2, templates: a2, isRelevantSorted: t3, isVirtualReplica: n3, refine: e3 }), r2);
      }, function() {
        L(null, t2);
      })({})), {}, { $$widgetType: "ais.relevantSort" });
      throw new Error(Ac("The `container` option is required."));
    }, searchBox: function(e2) {
      var t2, r2, i2, a2, s2, o2, c2, u2, l2, d2, h2, e2 = e2 || {}, n2 = e2.container, f2 = e2.placeholder, f2 = void 0 === f2 ? "" : f2, m2 = e2.cssClasses, m2 = void 0 === m2 ? {} : m2, p2 = e2.autofocus, p2 = void 0 !== p2 && p2, g2 = e2.searchAsYouType, g2 = void 0 === g2 || g2, v2 = e2.ignoreCompositionEvents, v2 = void 0 !== v2 && v2, y2 = e2.showReset, y2 = void 0 === y2 || y2, b2 = e2.showSubmit, b2 = void 0 === b2 || b2, R2 = e2.showLoadingIndicator, R2 = void 0 === R2 || R2, S2 = e2.queryHook, e2 = e2.templates, e2 = void 0 === e2 ? {} : e2;
      if (n2) return t2 = P(n2), n2 = { root: F(Uc(), m2.root), form: F(Uc({ descendantName: "form" }), m2.form), input: F(Uc({ descendantName: "input" }), m2.input), submit: F(Uc({ descendantName: "submit" }), m2.submit), submitIcon: F(Uc({ descendantName: "submitIcon" }), m2.submitIcon), reset: F(Uc({ descendantName: "reset" }), m2.reset), resetIcon: F(Uc({ descendantName: "resetIcon" }), m2.resetIcon), loadingIndicator: F(Uc({ descendantName: "loadingIndicator" }), m2.loadingIndicator), loadingIcon: F(Uc({ descendantName: "loadingIcon" }), m2.loadingIcon) }, m2 = T(T({}, kc), e2), r2 = (e2 = { containerNode: t2, cssClasses: n2, placeholder: f2, templates: m2, autofocus: p2, searchAsYouType: g2, ignoreCompositionEvents: v2, showReset: y2, showSubmit: b2, showLoadingIndicator: R2 }).containerNode, i2 = e2.cssClasses, a2 = e2.placeholder, s2 = e2.templates, o2 = e2.autofocus, c2 = e2.searchAsYouType, u2 = e2.ignoreCompositionEvents, l2 = e2.showReset, d2 = e2.showSubmit, h2 = e2.showLoadingIndicator, T(T({}, En(function(e3) {
        var t3 = e3.refine, n3 = e3.query, e3 = e3.isSearchStalled;
        L(M(Os, { query: n3, placeholder: a2, autofocus: o2, refine: t3, searchAsYouType: c2, ignoreCompositionEvents: u2, templates: s2, showSubmit: d2, showReset: l2, showLoadingIndicator: h2, isSearchStalled: e3, cssClasses: i2 }), r2);
      }, function() {
        return L(null, t2);
      })({ queryHook: S2 })), {}, { $$widgetType: "ais.searchBox" });
      throw new Error(Dc("The `container` option is required."));
    }, sortBy: function(e2) {
      var t2, i2, a2, e2 = e2 || {}, n2 = e2.container, r2 = e2.items, s2 = e2.cssClasses, s2 = void 0 === s2 ? {} : s2, e2 = e2.transformItems;
      if (n2) return t2 = P(n2), n2 = { root: F(Bc(), s2.root), select: F(Bc({ descendantName: "select" }), s2.select), option: F(Bc({ descendantName: "option" }), s2.option) }, i2 = (s2 = { containerNode: t2, cssClasses: n2 }).containerNode, a2 = s2.cssClasses, T(T({}, kn(function(e3, t3) {
        var n3 = e3.currentRefinement, r3 = e3.options, e3 = e3.refine;
        t3 || L(M("div", { className: a2.root }, M(Zs, { cssClasses: a2, currentValue: n3, options: r3, setValue: e3, ariaLabel: "Sort results by" })), i2);
      }, function() {
        return L(null, t2);
      })({ container: t2, items: r2, transformItems: e2 })), {}, { $$widgetType: "ais.sortBy" });
      throw new Error($c("The `container` option is required."));
    }, stats: function(e2) {
      var t2, l2, d2, h2, f2, e2 = e2 || {}, n2 = e2.container, r2 = e2.cssClasses, r2 = void 0 === r2 ? {} : r2, e2 = e2.templates, e2 = void 0 === e2 ? {} : e2;
      if (n2) return t2 = P(n2), n2 = { root: F(Kc(), r2.root), text: F(Kc({ descendantName: "text" }), r2.text) }, l2 = (r2 = { containerNode: t2, cssClasses: n2, templates: e2, renderState: {} }).renderState, d2 = r2.cssClasses, h2 = r2.containerNode, f2 = r2.templates, T(T({}, An(function(e3, t3) {
        var n3 = e3.hitsPerPage, r3 = e3.nbHits, i2 = e3.nbSortedHits, a2 = e3.areHitsSorted, s2 = e3.nbPages, o2 = e3.page, c2 = e3.processingTimeMS, u2 = e3.query, e3 = e3.instantSearchInstance;
        t3 ? l2.templateProps = O({ defaultTemplates: zc, templatesConfig: e3.templatesConfig, templates: f2 }) : L(M(qc, { cssClasses: d2, hitsPerPage: n3, nbHits: r3, nbSortedHits: i2, areHitsSorted: a2, nbPages: s2, page: o2, processingTimeMS: c2, query: u2, templateProps: l2.templateProps }), h2);
      }, function() {
        return L(null, t2);
      })({})), {}, { $$widgetType: "ais.stats" });
      throw new Error(Vc("The `container` option is required."));
    }, toggleRefinement: function(e2) {
      var t2, i2, a2, s2, o2, e2 = e2 || {}, n2 = e2.container, r2 = e2.attribute, c2 = e2.cssClasses, c2 = void 0 === c2 ? {} : c2, u2 = e2.templates, u2 = void 0 === u2 ? {} : u2, l2 = e2.on, l2 = void 0 === l2 || l2, e2 = e2.off;
      if (n2) return t2 = P(n2), n2 = { root: F(Gc(), c2.root), label: F(Gc({ descendantName: "label" }), c2.label), checkbox: F(Gc({ descendantName: "checkbox" }), c2.checkbox), labelText: F(Gc({ descendantName: "labelText" }), c2.labelText) }, i2 = (c2 = { containerNode: t2, cssClasses: n2, renderState: {}, templates: u2 }).containerNode, a2 = c2.cssClasses, s2 = c2.renderState, o2 = c2.templates, T(T({}, Wn(function(e3, t3) {
        var n3 = e3.value, r3 = e3.refine, e3 = e3.instantSearchInstance;
        t3 ? s2.templateProps = O({ defaultTemplates: Yc, templatesConfig: e3.templatesConfig, templates: o2 }) : L(M(Zc, { cssClasses: a2, currentRefinement: n3, templateProps: s2.templateProps, refine: r3 }), i2);
      }, function() {
        return L(null, t2);
      })({ attribute: r2, on: l2, off: e2 })), {}, { $$widgetType: "ais.toggleRefinement" });
      throw new Error(Xc("The `container` option is required."));
    }, voiceSearch: function(e2) {
      var t2, i2, a2, s2, e2 = e2 || {}, n2 = e2.container, r2 = e2.cssClasses, r2 = void 0 === r2 ? {} : r2, o2 = e2.templates, o2 = void 0 === o2 ? {} : o2, c2 = e2.searchAsYouSpeak, c2 = void 0 !== c2 && c2, u2 = e2.language, l2 = e2.additionalQueryParameters, e2 = e2.createVoiceSearchHelper;
      if (n2) return t2 = P(n2), n2 = { root: F(ou(), r2.root), button: F(ou({ descendantName: "button" }), r2.button), status: F(ou({ descendantName: "status" }), r2.status) }, r2 = T(T({}, au), o2), i2 = (o2 = { containerNode: t2, cssClasses: n2, templates: r2 }).containerNode, a2 = o2.cssClasses, s2 = o2.templates, T(T({}, Gr(function(e3) {
        var t3 = e3.isBrowserSupported, n3 = e3.isListening, r3 = e3.toggleListening, e3 = e3.voiceListeningState;
        L(M(eu, { cssClasses: a2, templates: s2, isBrowserSupported: t3, isListening: n3, toggleListening: r3, voiceListeningState: e3 }), i2);
      }, function() {
        return L(null, t2);
      })({ container: t2, cssClasses: n2, templates: r2, searchAsYouSpeak: c2, language: u2, additionalQueryParameters: l2, createVoiceSearchHelper: e2 })), {}, { $$widgetType: "ais.voiceSearch" });
      throw new Error(su("The `container` option is required."));
    } });
    return a.version = "4.68.1", a.connectors = ar, a.widgets = e, a.middlewares = ir, a.routers = en, a.stateMappings = ln, a.createInfiniteHitsSessionStorageCache = function() {
      return { read: function(e2) {
        var e2 = e2.state, t2 = rt(function(e3) {
          return e3.window.sessionStorage;
        });
        if (!t2) return null;
        try {
          var n2 = JSON.parse(t2.getItem(mi));
          return n2 && Oe(n2.state, fi(e2)) ? n2.hits : null;
        } catch (e3) {
          if (e3 instanceof SyntaxError) try {
            t2.removeItem(mi);
          } catch (e4) {
          }
          return null;
        }
      }, write: function(e2) {
        var t2 = e2.state, e2 = e2.hits, n2 = rt(function(e3) {
          return e3.window.sessionStorage;
        });
        if (n2) try {
          n2.setItem(mi, JSON.stringify({ state: fi(t2), hits: e2 }));
        } catch (e3) {
        }
      } };
    }, a.highlight = ri, a.reverseHighlight = ai, a.snippet = oi, a.reverseSnippet = ui, a.insights = Zt, a;
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
window.Ulu = ulu;
init$f();
init$b();
init$a();
init$9();
init$7();
init$d();
init$e();
init$6();
init$5();
init$4();
init$3();
init$2();
init$8();
init$c();
init$1();
{
  __vitePreload(() => import("./chunks/modulepreload-polyfill.DaKOjhqt.js"), true ? [] : void 0, import.meta.url);
}