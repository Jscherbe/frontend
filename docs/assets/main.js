var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __publicField = (obj, key2, value) => __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _handlerPointerdownInternal, _handlerKeydownInternal, _keyboardResizeTimeout, _initialContainerDimensions, _accumulatedKeyboardDeltaX, _accumulatedKeyboardDeltaY, _isResizingActive, _pointerStartX, _pointerStartY, _Resizer_instances, resetInternalState_fn, startResize_fn, endResize_fn, updateSize_fn;
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
  let timeout;
  const executedFunction = function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      {
        callback.apply(context, args);
      }
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
  executedFunction.cancel = function() {
    clearTimeout(timeout);
    timeout = null;
  };
  return executedFunction;
}
const linebreaks = /(\r\n|\n|\r)/gm;
const multiSpace = /\s+/g;
const jsonString = /^[{\[][\s\S]*[}\]]$/;
function safeParse(jsonString2, defaultValue = {}, onError = null) {
  try {
    return JSON.parse(jsonString2);
  } catch (error) {
    if (typeof onError === "function") {
      onError(error, jsonString2);
    } else {
      console.warn("safeParse: Failed to parse JSON string:", jsonString2, "Error:", error);
    }
    return defaultValue;
  }
}
function isBrowser() {
  return typeof window !== "undefined" && typeof window.document !== "undefined";
}
function createElementFromHtml(markup) {
  const doc = new DOMParser().parseFromString(markup, "text/html");
  return doc.body.firstElementChild;
}
function getDatasetJson(element, key2, defaultValue = {}) {
  const passed = element.dataset[key2];
  return safeParse(passed, defaultValue, (error) => {
    console.error(`Error getting JSON from dataset (${key2}) -- "${passed}"
`, element, error);
  });
}
function getDatasetOptionalJson(element, key2) {
  const passed = element.dataset[key2];
  if (passed && jsonString.test(passed.trim())) {
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
function getElement(target, context = document) {
  if (typeof target === "string") {
    return context.querySelector(target);
  } else if (target instanceof Element) {
    return target;
  } else {
    console.warn("getElement: Invalid target type (expected String/Node)", target);
    return null;
  }
}
function getElements(target, context = document) {
  if (typeof target === "string") {
    return [...context.querySelectorAll(target)];
  } else if (target instanceof Element) {
    return [target];
  } else if (Array.isArray(target) || target instanceof NodeList) {
    return [...target];
  } else {
    console.warn("getElement: Invalid target type (expected String/Node/Array/Node List)", target);
    return null;
  }
}
function addScrollbarCustomProperty(options) {
  const defaults2 = {
    scrollableChild: document.body,
    container: window,
    propertyElement: document.documentElement,
    propertyName: "--ulu-scrollbar-width"
  };
  const config2 = { ...defaults2, ...options };
  const { scrollableChild, container, propertyElement, propertyName } = config2;
  const scrollbarWidth = getScrollbarWidth(scrollableChild, container);
  propertyElement.style.setProperty(propertyName, `${scrollbarWidth}px`);
}
function getScrollbarWidth(element = document.body, container = window) {
  return container.innerWidth - element.clientWidth;
}
function preventScroll({ preventShift = false, container = document.body }) {
  const cacheOverflow = container.style.overflow;
  const cachePaddingRight = container.style.paddingRight;
  container.style.overflow = "hidden";
  if (preventShift) {
    const scrollbarWidth = getScrollbarWidth();
    if (scrollbarWidth > 0) {
      const paddingRightValue = parseInt(cachePaddingRight || "0px", 10);
      container.style.paddingRight = `${paddingRightValue + scrollbarWidth}px`;
    }
  }
  return () => {
    container.style.overflow = cacheOverflow;
    container.style.paddingRight = cachePaddingRight;
  };
}
if (isBrowser()) {
  initResize();
  initPrint();
}
const events = {
  pageModified(context) {
    context.dispatchEvent(createUluEvent("pageModified"));
  },
  pageResized(context) {
    context.dispatchEvent(createUluEvent("pageResized"));
  },
  beforePrint(context) {
    context.dispatchEvent(createUluEvent("beforePrint"));
  },
  afterPrint(context) {
    context.dispatchEvent(createUluEvent("afterPrint"));
  }
};
const eventKeys = Object.keys(events);
function dispatchCoreEvent(type, context) {
  if (events[type]) {
    events[type](context);
  } else {
    console.warn(`Unable to dispatch non-core event: ${type}`);
  }
}
function getUluEventName(type) {
  return "ulu:" + type;
}
function getCoreEventName(type) {
  if (eventKeys.includes(type)) {
    return getUluEventName(type);
  }
  console.warn(`'${type}' is not a valid core event type.`);
  return null;
}
function createUluEvent(type, data = null, options = { bubbles: true }) {
  return new CustomEvent(getUluEventName(type), { detail: data, ...options });
}
function initResize() {
  window.addEventListener("resize", debounce(() => dispatchCoreEvent("pageResized", document), 250));
}
function initPrint() {
  window.addEventListener("beforeprint", () => {
    dispatchCoreEvent("beforePrint", document);
  });
  window.addEventListener("afterprint", () => {
    dispatchCoreEvent("afterPrint", document);
  });
}
const defaults$b = {
  iconClassClose: "css-icon css-icon--close",
  iconClassDragX: "css-icon css-icon--drag-x",
  iconClassDragBoth: "css-icon css-icon--drag-both",
  iconClassPrevious: "css-icon  css-icon--angle-left",
  iconClassNext: "css-icon  css-icon--angle-right",
  cssvarPrefix: ""
};
let currentSettings = { ...defaults$b };
function getDefaultSettings() {
  return { ...defaults$b };
}
function updateSettings(changes) {
  Object.assign(currentSettings, changes);
}
function getSettings() {
  return { ...currentSettings };
}
function getSetting(key2) {
  if (!currentSettings.hasOwnProperty(key2)) {
    console.warn(`Attempted to access non-existent setting: ${key2}`);
    return void 0;
  }
  return currentSettings[key2];
}
function updateSetting(key2, value) {
  currentSettings[key2] = value;
}
function wrapSettingString(key2, transform) {
  return {
    toString() {
      const value = getSetting(key2);
      return transform ? transform(value) : value;
    }
  };
}
function hasRequiredProps(required) {
  return (obj) => {
    return required.every((prop) => {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    });
  };
}
function trimWhitespace(string) {
  return string.replace(linebreaks, "").replace(multiSpace, " ").trim();
}
function kebabToCamel(string) {
  return string.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}
function dataAttributeToDatasetKey(attribute) {
  return kebabToCamel(attribute.replace(/^data-/, ""));
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
  rows.forEach((row, index) => {
    if (index === 0)
      row.forEach((child) => child.classList.add(classes.rowFirst));
    if (index == rows.length - 1)
      row.forEach((child) => child.classList.add(classes.rowLast));
    row.forEach((child, childIndex) => {
      if (childIndex === 0)
        child.classList.add(classes.columnFirst);
      if (childIndex == row.length - 1)
        child.classList.add(classes.columnLast);
    });
  });
}
function resolveClasses(classes) {
  if (typeof classes === "string") {
    return classes.split(" ").filter((c) => c !== "");
  } else if (Array.isArray(classes)) {
    return classes;
  } else if (!classes) {
    return [];
  } else {
    console.warn("resolveClassArray: Invalid class input type.", classes);
    return [];
  }
}
const _ComponentInitializer = class _ComponentInitializer {
  /**
   * Create a new instance of ComponentInitializer
   * @param {Object} options Options for configuring the component initializer.
   * @param {String} options.type Type of component (used for logs).
   * @param {String} options.baseAttribute Prefix and base attribute name (used for base attribute and further element attribute names).
   */
  constructor(options) {
    if (!_ComponentInitializer.hasRequiredOptions(options)) {
      throw new Error(
        `Missing a required options: ${_ComponentInitializer.requiredOptions.join(", ")}`
      );
    }
    this.options = Object.assign({}, _ComponentInitializer.defaults, options);
    this.logTitle = `ULU: ${this.options.type}:
`;
  }
  /**
   * Initializes the component based on the provided configuration.
   * @param {Object} config The initialization configuration.
   * @param {Function} config.setup The setup function to call for each element.
   * @param {String} config.key [null] The optional key to use with attribute selector.
   * @param {Boolean} config.withData [null] Whether to retrieve element data.
   * @param {Array} config.coreEvents [null] An array of core event names (e.g., 'pageModified') that should trigger a re-initialization.
   * @param {HTMLElement} config.context [document] The context to query within.
   */
  init(config2) {
    var _a;
    this.setupElements(config2);
    if ((_a = config2.coreEvents) == null ? void 0 : _a.length) {
      config2.coreEvents.forEach((name) => {
        const eventName = getCoreEventName(name);
        if (eventName) {
          document.addEventListener(eventName, () => this.setupElements(config2));
        }
      });
    }
  }
  /**
   * Processes the elements based on the provided configuration.
   * @param {object} config The initialization configuration.
   * @param {function} config.setup The setup function to call for each element.
   * @param {string} config.key The optional key to use with attribute selector.
   * @param {boolean} config.withData [false] Whether to retrieve element data.
   * @param {HTMLElement} config.context [document] The context to query within.
   */
  setupElements(config2) {
    const { setup: setup2, key: key2, withData, context } = config2;
    const elementsWithData = this.queryAllInitial(key2, withData, context);
    elementsWithData.forEach((elementWithData) => setup2(elementWithData, this));
  }
  /**
   * Get an attribute name
   * @param {String} key Optional key, if no key will return baseAttribute if key will return key added to base
   * @returns {String} String like data-ulu-dialog or data-ulu-dialog-element
   */
  getAttribute(key2) {
    const { baseAttribute: baseAttribute2 } = this.options;
    return key2 ? `${baseAttribute2}-${key2}` : `${baseAttribute2}`;
  }
  /**
   * Create an attribute selector
   * @param {String} key Optional key (see getAttribute)
   */
  attributeSelector(key2) {
    return `[${this.getAttribute(key2)}]`;
  }
  /**
   * Create an attribute selector for initial
   * @return {String}
   */
  attributeSelectorInitial(key2) {
    return `${this.attributeSelector(key2)}:not([${this.getAttribute("init")}])`;
  }
  /**
   * Queries all main elements of a component that have not been initialized and extracts their data attributes.
   * @param {HTMLElement} context The context to query within.
   * @param {Boolean} withData Include dataset from element (as optional JSON)
   * @param {Node} context Element to query elements from
   * @returns {Array<{element: HTMLElement, data: object, initialize: Function}>} An array of objects containing the elements, their data, and convenience function initialize() which when called will set the init attribute on the element
   */
  queryAllInitial(key2, withData, context = document) {
    const elements = [...context.querySelectorAll(this.attributeSelectorInitial(key2))];
    return elements.map((element) => ({
      element,
      data: withData ? this.getData(element, key2) : null,
      initialize: () => this.initializeElement(element)
    }));
  }
  /**
   * Sets the init attribute on an element, marking it as initialized.
   * @param {HTMLElement} element The element to initialize.
   */
  initializeElement(element) {
    element.setAttribute(this.getAttribute("init"), "");
  }
  /**
   * Get an elements dataset value as JSON or other value
   * @return {*} The value of the dataset, if JSON will return object else will return string value or undefined
   */
  getData(element, key2) {
    const datasetKey = dataAttributeToDatasetKey(this.getAttribute(key2));
    return getDatasetOptionalJson(element, datasetKey);
  }
  /**
   * Will output namespaced console logs for the given initializer
   */
  log(...msgs) {
    console.log(this.logTitle, ...msgs);
  }
  /**
   * Will output namespaced console warnings for the given initializer
   */
  warn(...msgs) {
    console.warn(this.logTitle, ...msgs);
  }
  /**
   * Will output namespaced console error for the given initializer
   */
  logError(...msgs) {
    console.error(this.logTitle, ...msgs);
  }
};
__publicField(_ComponentInitializer, "defaults", {
  type: null,
  baseAttribute: null
});
__publicField(_ComponentInitializer, "requiredOptions", [
  "type",
  "baseAttribute"
]);
__publicField(_ComponentInitializer, "hasRequiredOptions", hasRequiredProps(
  _ComponentInitializer.requiredOptions
));
let ComponentInitializer = _ComponentInitializer;
function removeArrayElement(array, element) {
  var index = array.indexOf(element);
  if (index > -1) {
    array.splice(index, 1);
  }
}
function getCustomProperty(prefix, propertyName) {
  return `--${prefix}-${propertyName}`;
}
const config$1 = {
  debug: false,
  warningsAlways: true,
  errorsAlways: true,
  outputContext: false
};
const hasConsole = "console" in window;
function allow(context) {
  var _a;
  return hasConsole && config$1.debug && ((context == null ? void 0 : context.debug) || ((_a = context == null ? void 0 : context.options) == null ? void 0 : _a.debug) || context == null);
}
function getName(context) {
  var _a;
  return typeof context === "object" && ((_a = context == null ? void 0 : context.constructor) == null ? void 0 : _a.name);
}
function output(method, context, messages) {
  const label = getName(context) || "Logger";
  console[method](label, ...messages);
  if (config$1.outputContext) {
    console.log("Context:\n", context);
  }
}
function set(changes) {
  Object.assign(config$1, changes);
}
function log(context, ...messages) {
  if (allow(context)) {
    output("log", context, messages);
  }
}
function logWarning(context, ...messages) {
  if (config$1.warningsAlways || allow(context)) {
    output("warn", context, messages);
  }
}
function logError(context, ...messages) {
  if (config$1.errorsAlways || allow(context)) {
    output("error", context, messages);
  }
}
const getDefaultCustomProperty = (prefix) => getCustomProperty(prefix, "breakpoint");
if (isBrowser()) {
  initResizeHandler();
}
const _BreakpointManager = class _BreakpointManager {
  /**
   * @param {Object} config Configuration object
   * @param {Array} config.order Array of strings that correspond to the breakpoints setup in the styles, Breakpoints from smallest to largest, defaults to [small, medium, large]
   * @param {Array} config.customProperty Property to grab breakpoint from (default is --breakpoint)
   * @param {Array} config.valueFromPseudo Use the legacy method of grabbing breakpoint from pseudo element, default uses custom property
   * @param {Node} config.element The element to retrieve active breakpoint from stylesheet. (default is html) For using the old pseudo method, adjust this to document.body
   * @param {String} config.pseudoSelector Change pseudo selector used to get the breakpoint from the pseudo's content property
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
   * Add a callback for every time a breakpoint changes
   * - Not recommended, possibly use to watch for changes, etc
   * - For more control use instance.at(name) with breakpoint methods
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
    if (this.valueFromPseudo) {
      return this.getBreakpointInPseudo();
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
      logError(this, "Unable to get current breakpoint, maybe order is incorrect? Breakpoint check skipped!");
      return;
    }
    if (name === this.active) return;
    this.previous = this.active;
    this.previousIndex = this.activeIndex;
    const index = this.order.indexOf(name);
    this.active = name;
    this.activeIndex = index;
    this.order.forEach((bpName, bpIndex) => {
      const bp = this.breakpoints[bpName];
      const activeIndex = this.activeIndex;
      bp._setDirection("min", bpIndex <= activeIndex);
      bp._setDirection("max", bpIndex > activeIndex);
      bp._setDirection("only", bpIndex === activeIndex);
    });
    if (this.previousIndex !== null) {
      this.resizeDirection = this.previousIndex < index ? "up" : "down";
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
      logError(this, "Unable to find breakpoint for:", bp);
    }
    return bp;
  }
};
__publicField(_BreakpointManager, "instances", []);
__publicField(_BreakpointManager, "defaults", {
  element: document == null ? void 0 : document.documentElement,
  valueFromPseudo: false,
  customProperty: "--breakpoint",
  customProperty: wrapSettingString("cssvarPrefix", getDefaultCustomProperty),
  pseudoSelector: ":before",
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
   * Attach handler to be executed from the breakpoint and to all breakpoints below (inclusive).
   * This corresponds to a `max-width` media query in SCSS.
   * @param {Function} handler Handler to be executed
   */
  max(handler) {
    this.directions.max.add(handler);
  }
  /**
   * Attach handler to be executed from the breakpoint and to all breakpoints above (inclusive).
   * This corresponds to a `min-width` media query in SCSS.
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
    directions.forEach((d) => {
      if (this.directions[d]) {
        this.directions[d].remove(handler);
      }
    });
  }
  log(...msg) {
    msg.unshift(`Breakpoint (${this.name}):`);
    this._manager.log.apply(this._manager, msg);
  }
}
function initResizeHandler() {
  window.addEventListener(getCoreEventName("pageResized"), () => {
    BreakpointManager.instances.forEach((i) => i.update());
  });
}
let idCount = 0;
function newId() {
  return `ulu-uid-${++idCount}`;
}
function ensureId(element) {
  if (!element.id) {
    element.id = newId();
  }
}
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
      logError(this, "missing required elements (trigger or content)");
      return;
    }
    const options = Object.assign({}, _Collapsible.defaults, config2);
    this.elements = elements;
    this.options = options;
    this.isOpen = false;
    this.handlers = {};
    ensureId(trigger);
    ensureId(content);
    this.debugLog(this, this);
    if (!options.selfManaged) {
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
        document.addEventListener("focusin", () => {
          if (!content.contains(document.activeElement)) {
            this.close(event);
          }
        }, { once: true });
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
    return new CustomEvent(getUluEventName("collapsible:" + name), { detail });
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
const initializer$d = new ComponentInitializer({
  type: "details-group",
  baseAttribute: "data-ulu-details-group"
});
const childInitAttr = initializer$d.getAttribute("child-init");
const defaults$a = {
  onlyOneOpen: true,
  childSelector: ":scope > details"
};
function init$h() {
  initializer$d.init({
    withData: true,
    coreEvents: ["pageModified"],
    setup({ element, data, initialize }) {
      setupGroup(element, data);
      initialize();
    }
  });
}
function setupGroup(element, userOptions) {
  const options = Object.assign({}, defaults$a, userOptions);
  try {
    setupChildren();
  } catch (error) {
    console.error(error);
  }
  function queryChildren() {
    return element.querySelectorAll(options.childSelector);
  }
  function setupChildren() {
    queryChildren().forEach((child) => {
      if (child.hasAttribute(childInitAttr)) {
        return;
      } else {
        child.setAttribute(childInitAttr, "");
      }
      child.addEventListener("toggle", toggleHandler);
    });
  }
  function toggleHandler({ target }) {
    if (options.onlyOneOpen) {
      if (target.open) {
        queryChildren().forEach((child) => {
          if (child !== target && child.open) {
            child.open = false;
          }
        });
      }
    }
  }
  function destroy() {
    queryChildren().forEach((child) => {
      child.removeEventListener("toggle", toggleHandler);
      child.removeAttribute(childInitAttr);
    });
    element.removeAttribute(initializer$d.getAttribute("init"));
  }
  return { destroy, element, setupChildren };
}
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
const baseAttribute = "data-ulu-dialog";
const initializer$c = new ComponentInitializer({ type: "dialog", baseAttribute });
const closeAttribute = initializer$c.getAttribute("close");
const defaults$9 = {
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
  pauseVideos: true,
  /**
   * When open and not non-modal, the body is prevented from scrolling (defaults to true).
   */
  preventScroll: true,
  /**
   * Compensate for layout shift when preventing scroll. Which adds padding equal to scrollbars 
   * width while dialog is open
   */
  preventScrollShift: true
};
let currentDefaults$3 = { ...defaults$9 };
function setDefaults$3(options) {
  currentDefaults$3 = Object.assign({}, currentDefaults$3, options);
}
function init$g() {
  initializer$c.init({
    coreEvents: ["pageModified"],
    withData: true,
    setup({ element, initialize, data }) {
      setupDialog(element, data);
      initialize();
    }
  });
  initializer$c.init({
    key: "trigger",
    coreEvents: ["pageModified"],
    withData: true,
    setup({ element, initialize, data: dialogId }) {
      setupTrigger$1(element, dialogId);
      initialize();
    }
  });
}
function setupTrigger$1(trigger, dialogId) {
  trigger.addEventListener("click", handleTrigger);
  function handleTrigger(event) {
    var _a;
    const closestLink = event.target.closest("a");
    if (closestLink) {
      event.preventDefault();
    }
    const dialog = document.getElementById(dialogId);
    if (!dialog) {
      console.error("Could not locate dialog (id)", dialogId);
      return;
    }
    if (((_a = dialog == null ? void 0 : dialog.tagName) == null ? void 0 : _a.toLowerCase()) !== "dialog") {
      console.error("Attempted to trigger non <dialog> element. Did you mean to use modal builder?");
      return;
    }
    const options = getDialogOptions(dialog);
    dialog[options.nonModal ? "show" : "showModal"]();
  }
}
function setupDialog(dialog, userOptions) {
  const options = Object.assign({}, currentDefaults$3, userOptions);
  const body = document.body;
  const { preventScrollShift: preventShift } = options;
  let activeResizePointer;
  dialog.addEventListener(getUluEventName("resizer:start"), handleResizeStart);
  dialog.addEventListener(getUluEventName("resizer:end"), handleResizeEnd);
  dialog.addEventListener("click", handleClicks);
  if (options.documentEnd) {
    body.appendChild(dialog);
  }
  if (options.pauseVideos) {
    prepVideos(dialog);
  }
  if (!options.nonModal && options.preventScroll) {
    let restoreScroll;
    dialog.addEventListener("toggle", (event) => {
      const isOpen = event.newState === "open";
      if (isOpen) {
        restoreScroll = preventScroll({ preventShift });
      } else if (restoreScroll) {
        restoreScroll();
      }
    });
  }
  function handleClicks(event) {
    const { target } = event;
    const targetIsDialog = target === dialog;
    const closeFromButton = target.closest(initializer$c.attributeSelector("close"));
    const allowCloseOutside = !activeResizePointer && options.clickOutsideCloses;
    const closeFromOutside = allowCloseOutside && targetIsDialog && wasClickOutside(dialog, event);
    if (closeFromOutside || closeFromButton) {
      if (options.pauseVideos) {
        pauseVideos(dialog);
      }
      dialog.close();
    }
  }
  function handleResizeStart(event) {
    activeResizePointer = event.pointerId;
  }
  function handleResizeEnd(event) {
    if (activeResizePointer === event.pointerId) {
      setTimeout(() => {
        activeResizePointer = null;
      }, 0);
    }
  }
}
function getDialogOptions(dialog) {
  return Object.assign({}, currentDefaults$3, initializer$c.getData(dialog));
}
function prepVideos(dialog) {
  prepVideos$1(dialog);
}
function pauseVideos(dialog) {
  pauseVideos$1(dialog);
  const nativeVideos = dialog.querySelectorAll("video");
  nativeVideos.forEach((video) => video.pause());
}
const initializer$b = new ComponentInitializer({
  type: "flipcard",
  baseAttribute: "data-ulu-flipcard"
});
function init$f() {
  initializer$b.init({
    withData: true,
    coreEvents: ["pageModified"],
    setup({ element, data, initialize }) {
      const options = Object.assign({}, data);
      const front = element.querySelector(initializer$b.attributeSelector("front"));
      const back = element.querySelector(initializer$b.attributeSelector("back"));
      new Flipcard(element, front, back, options);
      initialize();
    }
  });
}
const _Flipcard = class _Flipcard {
  constructor(container, front, back, config2) {
    if (!back) {
      logError(this, "Missing an element (container, front, back)");
    }
    this.options = Object.assign({}, _Flipcard.defaults, config2);
    const { namespace } = this.options;
    _Flipcard.instances.push(this);
    this.elements = { container, front, back };
    this.isOpen = false;
    this.uid = `${namespace}-id-${_Flipcard.instances.length}`;
    this.stateAttr = `data-${namespace}-state`.toLowerCase();
    this.setup();
    this.setVisibility(false);
    log(this, this);
  }
  toggle() {
    this.setVisibility(!this.isOpen);
  }
  setup() {
    const { uid } = this;
    const { namespace, proxyClick } = this.options;
    const { container, front, back } = this.elements;
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
    container.classList.add(this.options.namespace);
    container.setAttribute("style", trimWhitespace(this.containerCss()));
    if (proxyClick) {
      container.addEventListener("click", this.onProxyClick.bind(this));
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
  setVisibility(visible2) {
    const { back, container, control } = this.elements;
    const state = visible2 ? "open" : "closed";
    back.style.zIndex = visible2 ? "10" : "1";
    back.style.visibility = visible2 ? "visible" : "hidden";
    container.setAttribute(this.stateAttr, state);
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
/**
 * Default options for Flipcard
 */
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
const initializer$a = new ComponentInitializer({
  type: "grid",
  baseAttribute: "data-grid"
});
function init$e(classes) {
  initializer$a.init({
    coreEvents: ["pageModified", "pageResized"],
    setup({ element, initialize }) {
      setPositionClasses(element, classes);
      initialize();
    }
  });
}
const _Resizer = class _Resizer {
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
  constructor(container, control, config2) {
    __privateAdd(this, _Resizer_instances);
    // Declare private fields without initial assignments
    __privateAdd(this, _handlerPointerdownInternal);
    __privateAdd(this, _handlerKeydownInternal);
    __privateAdd(this, _keyboardResizeTimeout);
    __privateAdd(this, _initialContainerDimensions);
    __privateAdd(this, _accumulatedKeyboardDeltaX);
    __privateAdd(this, _accumulatedKeyboardDeltaY);
    __privateAdd(this, _isResizingActive);
    __privateAdd(this, _pointerStartX);
    __privateAdd(this, _pointerStartY);
    if (!control || !container) {
      logError(this, "Missing required elements: control, container");
      return;
    }
    const options = Object.assign({}, _Resizer.defaults, config2);
    this.options = options;
    this.container = container;
    this.control = control;
    this.debug = options.debug;
    const validX = ["left", "right"];
    const validY = ["top", "bottom"];
    const { fromX, fromY } = options;
    if (!validX.includes(fromX) && fromX !== null) {
      logError(this, `Invalid fromX: ${fromX} (left|right|null)`);
      return;
    }
    if (!validY.includes(fromY) && fromY !== null) {
      logError(this, `Invalid fromY: ${fromY} (top|bottom|null)`);
      return;
    }
    if (!fromX && !fromY) {
      logError(this, "Invalid fromX/fromY, failed to setup resizer (at least one of fromX or fromY must be set)");
      return;
    }
    this.resizeHorizontal = options.fromX !== null;
    this.resizeVertical = options.fromY !== null;
    if (options.manageEvents) {
      __privateSet(this, _handlerPointerdownInternal, this.onPointerdown.bind(this));
      __privateSet(this, _handlerKeydownInternal, this.onKeydown.bind(this));
      if (options.enablePointerResizing) {
        control.addEventListener("pointerdown", __privateGet(this, _handlerPointerdownInternal));
      }
      if (options.enableKeyboardResizing) {
        control.addEventListener("keydown", __privateGet(this, _handlerKeydownInternal));
      }
    }
    __privateMethod(this, _Resizer_instances, resetInternalState_fn).call(this);
    if (options.manageAriaLabel) {
      control.setAttribute("aria-label", this.getAriaLabel());
    }
  }
  /**
   * Cleans up event listeners and internal state to prevent memory leaks.
   */
  destroy() {
    const { control, options } = this;
    if (options.manageEvents) {
      if (options.enablePointerResizing) {
        control.removeEventListener("pointerdown", __privateGet(this, _handlerPointerdownInternal));
      }
      if (options.enableKeyboardResizing) {
        control.removeEventListener("keydown", __privateGet(this, _handlerKeydownInternal));
      }
    }
    if (__privateGet(this, _keyboardResizeTimeout)) {
      clearTimeout(__privateGet(this, _keyboardResizeTimeout));
    }
    __privateMethod(this, _Resizer_instances, resetInternalState_fn).call(this);
    if (options.manageAriaLabel) {
      control.removeAttribute("aria-label");
    }
    log(this, "Resizer destroyed.");
  }
  /**
   * Public handler for pointerdown events. Call this method from your own event listeners
   * if `manageEvents` is false. Its logic will only execute if `enablePointerResizing` is true.
   * @param {PointerEvent} e The pointerdown event.
   */
  onPointerdown(e) {
    if (!this.options.enablePointerResizing) {
      log(this, "Pointer resizing disabled. Ignoring pointerdown event.");
      return;
    }
    e.preventDefault();
    const doc = document.documentElement;
    __privateSet(this, _pointerStartX, e.clientX);
    __privateSet(this, _pointerStartY, e.clientY);
    __privateMethod(this, _Resizer_instances, startResize_fn).call(this, {
      inputType: "pointer",
      startX: e.clientX,
      startY: e.clientY,
      pointerId: e.pointerId
    });
    this.control.setPointerCapture(e.pointerId);
    const pointermove = (event) => {
      const totalDeltaX = event.clientX - __privateGet(this, _pointerStartX);
      const totalDeltaY = event.clientY - __privateGet(this, _pointerStartY);
      __privateMethod(this, _Resizer_instances, updateSize_fn).call(this, totalDeltaX, totalDeltaY, event);
    };
    const cleanup = (event) => {
      doc.removeEventListener("pointermove", pointermove, false);
      doc.removeEventListener("pointerup", cleanup, { capture: true, once: true });
      if (this.control.hasPointerCapture(event.pointerId)) {
        this.control.releasePointerCapture(event.pointerId);
      }
      __privateMethod(this, _Resizer_instances, endResize_fn).call(this);
    };
    doc.addEventListener("pointermove", pointermove, false);
    doc.addEventListener("pointerup", cleanup, { capture: true, once: true });
  }
  /**
   * Public handler for keydown events. Call this method from your own event listeners
   * if `manageEvents` is false. Its logic will only execute if `enableKeyboardResizing` is true.
   * @param {KeyboardEvent} e The keydown event.
   */
  onKeydown(e) {
    if (!this.options.enableKeyboardResizing) {
      log(this, "Keyboard resizing disabled. Ignoring keydown event.");
      return;
    }
    const { key: key2 } = e;
    const { keyboardStep, keyboardDebounceTime } = this.options;
    let stepDeltaX = 0;
    let stepDeltaY = 0;
    let isResizeKey = false;
    if (this.resizeHorizontal) {
      if (key2 === "ArrowLeft") {
        stepDeltaX = -keyboardStep;
        isResizeKey = true;
      } else if (key2 === "ArrowRight") {
        stepDeltaX = keyboardStep;
        isResizeKey = true;
      }
    }
    if (this.resizeVertical) {
      if (key2 === "ArrowUp") {
        stepDeltaY = -keyboardStep;
        isResizeKey = true;
      } else if (key2 === "ArrowDown") {
        stepDeltaY = keyboardStep;
        isResizeKey = true;
      }
    }
    if (isResizeKey) {
      e.preventDefault();
      e.stopPropagation();
      if (!__privateGet(this, _isResizingActive) || __privateGet(this, _keyboardResizeTimeout) === null) {
        __privateMethod(this, _Resizer_instances, startResize_fn).call(this, { inputType: "keyboard", keyboardKey: key2 });
      }
      __privateSet(this, _accumulatedKeyboardDeltaX, __privateGet(this, _accumulatedKeyboardDeltaX) + stepDeltaX);
      __privateSet(this, _accumulatedKeyboardDeltaY, __privateGet(this, _accumulatedKeyboardDeltaY) + stepDeltaY);
      __privateMethod(this, _Resizer_instances, updateSize_fn).call(this, __privateGet(this, _accumulatedKeyboardDeltaX), __privateGet(this, _accumulatedKeyboardDeltaY), e);
      if (__privateGet(this, _keyboardResizeTimeout)) {
        clearTimeout(__privateGet(this, _keyboardResizeTimeout));
      }
      __privateSet(this, _keyboardResizeTimeout, setTimeout(() => {
        __privateMethod(this, _Resizer_instances, endResize_fn).call(this);
        __privateSet(this, _keyboardResizeTimeout, null);
      }, keyboardDebounceTime));
    }
  }
  /**
   * Generates an accessible label for the resize control based on its configuration.
   * This is a convenience function that can be used by the consumer if `manageAriaLabel` is false.
   * @returns {string} The suggested aria-label for the control.
   */
  getAriaLabel() {
    const { fromY, fromX } = this.options;
    const directions = [fromY, fromX].filter((v) => v);
    if (directions.length === 0) {
      return "Resize control";
    }
    return `Resize from ${directions.join(" ")} edge`;
  }
  /**
   * Dispatches a custom event on the container element.
   * @param {string} type The event type (e.g., "resizer:start", "resizer:update", "resizer:end").
   * @param {Object} [data={}] Optional data to attach to the event's detail property.
   */
  dispatchEvent(type, data = {}) {
    this.container.dispatchEvent(createUluEvent(type, data));
  }
};
_handlerPointerdownInternal = new WeakMap();
_handlerKeydownInternal = new WeakMap();
_keyboardResizeTimeout = new WeakMap();
_initialContainerDimensions = new WeakMap();
_accumulatedKeyboardDeltaX = new WeakMap();
_accumulatedKeyboardDeltaY = new WeakMap();
_isResizingActive = new WeakMap();
_pointerStartX = new WeakMap();
_pointerStartY = new WeakMap();
_Resizer_instances = new WeakSet();
/**
 * Resets all internal state properties to their default/inactive values.
 * This centralizes state cleanup and initial setup.
 * @private
 */
resetInternalState_fn = function() {
  __privateSet(this, _keyboardResizeTimeout, null);
  __privateSet(this, _initialContainerDimensions, { width: 0, height: 0 });
  __privateSet(this, _accumulatedKeyboardDeltaX, 0);
  __privateSet(this, _accumulatedKeyboardDeltaY, 0);
  __privateSet(this, _isResizingActive, false);
  __privateSet(this, _pointerStartX, 0);
  __privateSet(this, _pointerStartY, 0);
};
/**
 * Initiates a resize operation.
 * This sets initial dimensions and dispatches the 'resizer:start' event.
 * @param {Object} eventDetails Additional details about the initiating event.
 * @private
 */
startResize_fn = function(eventDetails) {
  const { container, options } = this;
  if (__privateGet(this, _isResizingActive)) {
    if (options.overrideMaxDimensions) {
      if (this.resizeHorizontal) {
        container.style.maxWidth = "none";
      }
      if (this.resizeVertical) {
        container.style.maxHeight = "none";
      }
    }
    return;
  }
  const win = document.defaultView;
  const containerStyle = win.getComputedStyle(container);
  __privateGet(this, _initialContainerDimensions).width = parseInt(containerStyle.width, 10);
  __privateGet(this, _initialContainerDimensions).height = parseInt(containerStyle.height, 10);
  if (options.overrideMaxDimensions) {
    if (this.resizeHorizontal) {
      container.style.maxWidth = "none";
    }
    if (this.resizeVertical) {
      container.style.maxHeight = "none";
    }
  }
  __privateSet(this, _isResizingActive, true);
  this.dispatchEvent("resizer:start", eventDetails);
  log(this, "Resize started.", {
    initialWidth: __privateGet(this, _initialContainerDimensions).width,
    initialHeight: __privateGet(this, _initialContainerDimensions).height,
    ...eventDetails
  });
};
/**
 * Ends a resize operation.
 * Dispatches 'resizer:end' event and resets internal state.
 * @private
 */
endResize_fn = function() {
  if (!__privateGet(this, _isResizingActive)) return;
  this.dispatchEvent("resizer:end");
  __privateMethod(this, _Resizer_instances, resetInternalState_fn).call(this);
  log(this, "Resize ended.");
};
/**
 * Core logic for calculating and applying the new size of the container.
 * This method is called by both pointer and keyboard event handlers.
 *
 * @param {number} totalDeltaX The total horizontal displacement from the start of the resize.
 * @param {number} totalDeltaY The total vertical displacement from the start of the resize.
 * @param {Event} originalEvent The original DOM event (PointerEvent or KeyboardEvent) that triggered the update.
 * @private
 */
updateSize_fn = function(totalDeltaX, totalDeltaY, originalEvent) {
  let newWidth = __privateGet(this, _initialContainerDimensions).width;
  let newHeight = __privateGet(this, _initialContainerDimensions).height;
  const { fromX, fromY, multiplier } = this.options;
  if (this.resizeHorizontal) {
    if (fromX === "right") {
      newWidth = __privateGet(this, _initialContainerDimensions).width + totalDeltaX * multiplier;
    } else if (fromX === "left") {
      newWidth = __privateGet(this, _initialContainerDimensions).width - totalDeltaX * multiplier;
    }
    this.container.style.width = `${Math.max(0, newWidth)}px`;
  }
  if (this.resizeVertical) {
    if (fromY === "bottom") {
      newHeight = __privateGet(this, _initialContainerDimensions).height + totalDeltaY * multiplier;
    } else if (fromY === "top") {
      newHeight = __privateGet(this, _initialContainerDimensions).height - totalDeltaY * multiplier;
    }
    this.container.style.height = `${Math.max(0, newHeight)}px`;
  }
  const updateInfo = {
    newWidth,
    newHeight,
    totalDeltaX,
    totalDeltaY,
    event: originalEvent
  };
  this.dispatchEvent("resizer:update", updateInfo);
  log(this, "Resizing update.", updateInfo);
};
__publicField(_Resizer, "defaults", {
  debug: false,
  /**
   * Amount to increase size by (ie. pointer movement * multiplier)
   */
  multiplier: 1,
  /**
   * Remove max-width, max-height
   */
  overrideMaxDimensions: false,
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
  manageEvents: true,
  /**
   * If true, the Resizer instance will automatically manage the `aria-label`
   * attribute of the control element. If `false`, the user is responsible
   * for setting this attribute.
   * Default: false
   */
  manageAriaLabel: false,
  /**
   * If true, pointer events (mouse/touch) will enable resizing.
   * Default: true
   */
  enablePointerResizing: true,
  /**
   * If true, keyboard events (arrow keys) will enable resizing.
   * Default: true
   */
  enableKeyboardResizing: true
});
let Resizer = _Resizer;
const initializer$9 = new ComponentInitializer({
  type: "modal-builder",
  baseAttribute: "data-ulu-modal-builder"
});
const defaults$8 = {
  title: null,
  titleIcon: null,
  titleClass: "",
  labelledby: null,
  describedby: null,
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
  baseClass: "modal",
  footerElement: null,
  footerHtml: null,
  classCloseIcon: wrapSettingString("iconClassClose"),
  classResizerIcon: wrapSettingString("iconClassDragX"),
  classResizerIconBoth: wrapSettingString("iconClassDragBoth"),
  debug: false,
  templateCloseIcon(config2) {
    const { baseClass, classCloseIcon } = config2;
    return `<span class="${baseClass}__close-icon ${classCloseIcon}" aria-hidden="true"></span>`;
  },
  templateResizerIcon(config2) {
    const { baseClass, classResizerIcon, classResizerIconBoth } = config2;
    const iconClass = config2.position === "center" ? classResizerIconBoth : classResizerIcon;
    return `<span class="${baseClass}__resizer-icon ${iconClass}" aria-hidden="true"></span>`;
  },
  /**
   * Default modal template
   * @param {String} id ID for new modal
   * @param {Object} config Resolved options
   * @returns {String} Markup for modal
   */
  template(id, config2) {
    const { baseClass, describedby, footerHtml } = config2;
    const classes = [
      baseClass,
      `${baseClass}--${config2.position}`,
      `${baseClass}--${config2.size}`,
      `${baseClass}--${config2.allowResize ? "resize" : "no-resize"}`,
      ...!config2.title ? [`${baseClass}--no-header`] : [],
      ...config2.bodyFills ? [`${baseClass}--body-fills`] : [],
      ...config2.noBackdrop ? [`${baseClass}--no-backdrop`] : [],
      ...config2.noMinHeight ? [`${baseClass}--no-min-height`] : [],
      ...config2.class ? [config2.class] : []
    ];
    const labelledby = config2.title ? `${id}--title` : config2.labelledby;
    return `
      <dialog 
        id="${id}" 
        class="${classes.join(" ")}" 
        ${labelledby ? `aria-labelledby="${labelledby}"` : ""}
        ${describedby ? `aria-describedby="${describedby}"` : ""}
      >
        ${config2.title ? `
          <header class="${baseClass}__header">
            <h2 id="${labelledby}" class="${baseClass}__title ${config2.titleClass}">
              ${config2.titleIcon ? `<span class="${baseClass}__title-icon ${config2.titleIcon}" aria-hidden="true"></span>` : ""}
              <span class="${baseClass}__title-text">${config2.title}</span>
            </h2>
            <button class="${baseClass}__close" aria-label="Close modal" ${closeAttribute} autofocus>
              ${config2.templateCloseIcon(config2)}
            </button>
          </header>
        ` : ""}
        <div class="${baseClass}__body" ${initializer$9.getAttribute("body")}></div>
        ${footerHtml ? `<div class="${baseClass}__footer">${footerHtml}</div>` : ""}
        ${config2.allowResize ? `<button class="${baseClass}__resizer" type="button" ${initializer$9.getAttribute("resizer")}>
            ${config2.templateResizerIcon(config2)}
          </button>` : ""}
      </dialog>
    `;
  }
};
let currentDefaults$2 = { ...defaults$8 };
function setDefaults$2(options) {
  currentDefaults$2 = Object.assign({}, currentDefaults$2, options);
}
function init$d() {
  initializer$9.init({
    withData: true,
    coreEvents: ["pageModified"],
    setup({ element, data }) {
      buildModal(element, data);
    }
  });
}
function buildModal(content, options) {
  const config2 = Object.assign({}, currentDefaults$2, options);
  const { position } = config2;
  if (config2.debug) {
    initializer$9.log(config2, content);
  }
  if (!content.id) {
    throw new Error("Missing ID on modal");
  }
  const markup = config2.template(content.id, config2);
  const modal = createElementFromHtml(markup.trim());
  const selectChild = (key2) => modal.querySelector(initializer$9.attributeSelector(key2));
  const body = selectChild("body");
  const resizerElement = selectChild("resizer");
  const dialogOptions = separateDialogOptions(config2);
  content.removeAttribute("id");
  content.removeAttribute("hidden");
  content.removeAttribute(initializer$9.getAttribute());
  content.parentNode.replaceChild(modal, content);
  body.appendChild(content);
  modal.setAttribute(baseAttribute, JSON.stringify(dialogOptions));
  if (config2.footerElement) {
    const footerElement = getElement(config2.footerElement);
    if (footerElement) {
      footerElement.classList.add(`${config2.baseClass}__footer`);
      body.after(footerElement);
    }
  }
  let resizer;
  const resizablePositions = ["left", "right", "center"];
  const isCenter = position === "center";
  const isRight = position === "right";
  if (config2.allowResize) {
    if (resizablePositions.includes(position)) {
      const resizerOptions = isCenter ? { fromX: "right", fromY: "bottom", multiplier: 2 } : { fromX: isRight ? "left" : "right" };
      resizer = new Resizer(modal, resizerElement, resizerOptions);
    } else {
      console.warn(`${position} is not supported for resizing`);
    }
  }
  if (config2.print) {
    let printClone;
    document.addEventListener(getCoreEventName("beforePrint"), () => {
      printClone = content.cloneNode(true);
      modal.after(printClone);
    });
    document.addEventListener(getCoreEventName("afterPrint"), () => {
      printClone.remove();
    });
  }
  return { modal, resizer };
}
function separateDialogOptions(config2) {
  return Object.keys(defaults$9).reduce((acc, key2) => {
    if (key2 in config2) {
      acc[key2] = config2[key2];
    }
    return acc;
  }, {});
}
const requiredElements$1 = [
  "track",
  "controls"
];
const _OverflowScroller = class _OverflowScroller {
  constructor(elements, config2) {
    this.options = Object.assign({}, _OverflowScroller.defaults, config2);
    if (!hasRequiredProps(requiredElements$1)) {
      logError(this, "Missing a required Element");
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
    const classes = this.options[action === "next" ? "iconClassNext" : "iconClassPrevious"];
    return `
      <span class="hidden-visually">${action}</span>
      <span class="${classes}" aria-hidden="true"></span>
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
    logError("Unable to resolve amount for scroll");
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
  iconClassPrevious: wrapSettingString("iconClassPrevious"),
  iconClassNext: wrapSettingString("iconClassNext")
});
let OverflowScroller = _OverflowScroller;
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
function init$c() {
  addScrollbarCustomProperty();
}
const min$1 = Math.min;
const max$1 = Math.max;
const round$1 = Math.round;
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
  return max$1(start, min$1(value, end));
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
    const minPadding = min$1(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min$1(paddingObject[maxProp], largestPossiblePadding);
    const min$1$1 = minPadding;
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset2 = clamp(min$1$1, center, max2);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset2 && rects.reference[length] / 2 - (center < min$1$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1$1 ? center - min$1$1 : center - max2 : 0;
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
  const minX = min$1(...rects.map((rect) => rect.left));
  const minY = min$1(...rects.map((rect) => rect.top));
  const maxX = max$1(...rects.map((rect) => rect.right));
  const maxY = max$1(...rects.map((rect) => rect.bottom));
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
          const maxRight = max$1(...clientRects.map((rect) => rect.right));
          const minLeft = min$1(...clientRects.map((rect) => rect.left));
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
  const shouldFallback = round$1(width) !== offsetWidth || round$1(height) !== offsetHeight;
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
  let x = ($ ? round$1(rect.width) : rect.width) / width;
  let y = ($ ? round$1(rect.height) : rect.height) / height;
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
  const body = element.ownerDocument.body;
  const width = max$1(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max$1(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body).direction === "rtl") {
    x += max$1(html.clientWidth, body.clientWidth) - width;
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
    accRect.top = max$1(rect.top, accRect.top);
    accRect.right = min$1(rect.right, accRect.right);
    accRect.bottom = min$1(rect.bottom, accRect.bottom);
    accRect.left = max$1(rect.left, accRect.left);
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
      threshold: max$1(0, min$1(1, threshold)) || 1
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
    } catch (e) {
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
const defaults$7 = {
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
  const options = Object.assign({}, defaults$7, config2);
  const { placement, strategy } = options;
  const { trigger, content, contentArrow } = elements;
  return autoUpdate(trigger, content, () => {
    computePosition(trigger, content, {
      placement,
      strategy,
      middleware: [
        ...addPlugin(inline, options.inline),
        ...addPlugin(offset, options.offset),
        ...addPlugin(flip, options.flip),
        ...addPlugin(shift, options.shift),
        ...addPlugin(arrow, contentArrow && options.arrow, { element: contentArrow })
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
const initializer$8 = new ComponentInitializer({
  type: "popover",
  baseAttribute: "data-ulu-popover"
});
const attrSelectorAnchor = initializer$8.attributeSelector("trigger-anchor");
const attrSelectorArrow$1 = initializer$8.attributeSelector("arrow");
const attrContent = initializer$8.getAttribute("content");
const attrSelectorContent = initializer$8.attributeSelector("content");
const instances$3 = /* @__PURE__ */ new WeakMap();
const collapsibleDefaults = {
  clickOutsideCloses: true,
  escapeCloses: true
};
function init$b() {
  initializer$8.init({
    key: "trigger",
    withData: true,
    coreEvents: ["pageModified"],
    setup({ element, data, initialize }) {
      if (instances$3.has(element)) return;
      const resolved = resolve(element, data);
      if (!resolved) {
        initializer$8.warn("Unable to resolve popover elements for trigger.", element);
        return;
      }
      const { elements, options, floatingOptions } = resolved;
      instances$3.set(elements, new Popover(elements, options, floatingOptions));
      initialize();
    }
  });
}
function resolve(trigger, userOptions) {
  const options = Object.assign({}, userOptions);
  const content = getContentByTrigger(trigger);
  const elements = {
    trigger,
    content,
    anchor: trigger.querySelector(attrSelectorAnchor) || trigger,
    contentArrow: content.querySelector(attrSelectorArrow$1)
  };
  const floatingOptions = options.floating || {};
  delete options.floating;
  if (content) {
    return { elements, options, floatingOptions };
  } else {
    initializer$8.logError("Unable to make popover for", trigger);
    return false;
  }
}
function getContentByTrigger(trigger) {
  var _a;
  let content;
  const ariaControls = trigger.getAttribute("aria-controls");
  if (ariaControls) {
    content = document.getElementById(ariaControls);
  } else if ((_a = trigger == null ? void 0 : trigger.nextElementSibling) == null ? void 0 : _a.hasAttribute(attrContent)) {
    content = trigger.nextElementSibling;
  } else {
    const children = Array.from(trigger.parentNode.children);
    const triggerIndex = children.findIndex((c) => c === trigger);
    const childrenAfter = children.slice(triggerIndex);
    content = childrenAfter.find((child) => child.matches(attrSelectorContent));
  }
  if (!content) {
    initializer$8.logError("Unable to resolve 'content' element for popover", trigger);
  }
  return content;
}
class Popover extends Collapsible {
  constructor(elements, config2, floatingOptions) {
    const options = Object.assign({}, collapsibleDefaults, config2);
    super(elements, options);
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
const attrs$2 = {
  opened: "data-ulu-print-details-opened"
};
const attrSelector$2 = (key2) => `[${attrs$2[key2]}]`;
const defaults$6 = {
  selector: "details:not([open])"
};
function init$a(options) {
  const config2 = Object.assign({}, defaults$6, options);
  document.addEventListener(getCoreEventName("beforePrint"), () => {
    document.querySelectorAll(config2.selector).forEach((details) => {
      if (!details.open) {
        details.setAttribute(attrs$2.opened, true);
        details.open = true;
      }
    });
  });
  document.addEventListener(getCoreEventName("afterPrint"), () => {
    document.querySelectorAll(attrSelector$2("opened")).forEach((details) => {
      details.removeAttribute(attrs$2.opened);
      details.open = false;
    });
  });
}
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
const initializer$7 = new ComponentInitializer({
  type: "print",
  baseAttribute: "data-ulu-print"
});
const defaults$5 = {
  /**
   * Print element/selector
   */
  element: null
};
function init$9() {
  initializer$7.init({
    withData: true,
    coreEvents: ["pageModified"],
    setup({ element, data, initialize }) {
      setupTrigger(element, data);
      initialize();
    }
  });
}
function setupTrigger(trigger, userOptions) {
  const config2 = Object.assign({}, defaults$5, userOptions);
  trigger.addEventListener("click", () => {
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
const initializer$6 = new ComponentInitializer({
  type: "proxy-click",
  baseAttribute: "data-ulu-proxy-click"
});
const defaults$4 = {
  selector: "[data-ulu-proxy-click-source]",
  selectorPreventBase: "input, select, textarea, button, a, [tabindex='-1']",
  selectorPrevent: "",
  mousedownDurationPrevent: 250
};
let currentDefaults$1 = { ...defaults$4 };
function setDefaults$1(options) {
  currentDefaults$1 = Object.assign({}, currentDefaults$1, options);
}
function init$8() {
  initializer$6.init({
    withData: true,
    coreEvents: ["pageModified"],
    setup({ element, data, initialize }) {
      setupProxy(element, data);
      initialize();
    }
  });
}
function setupProxy(proxy, userOptions) {
  const options = Object.assign({}, currentDefaults$1, userOptions);
  const child = proxy.querySelector(options.selector);
  if (child) {
    attachHandlers(proxy, child, options);
  } else {
    console.error("Unable to locate proxy click source", options.selector);
  }
}
function attachHandlers(proxy, child, config2) {
  const { selectorPreventBase: spb, selectorPrevent: sp } = config2;
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
    if (shouldProxy && timeStamp - start < config2.mousedownDurationPrevent) {
      child.click();
    }
  });
  proxy.style.cursor = "pointer";
}
const initializer$5 = new ComponentInitializer({
  type: "scroll-slider",
  baseAttribute: "data-ulu-scroll-slider"
});
const attrSelectorTrack$1 = initializer$5.attributeSelector("track");
const attrSelectorControls = initializer$5.attributeSelector("control-context");
const instances$2 = [];
const defaults$3 = {
  amount: createPager()
};
function init$7() {
  initializer$5.init({
    withData: true,
    coreEvents: ["pageModified"],
    setup({ element, data, initialize }) {
      setupSlider$1(element, data);
      initialize();
    }
  });
}
function setupSlider$1(container, userOptions) {
  const config2 = Object.assign({}, defaults$3, userOptions);
  const elements = {
    track: container.querySelector(attrSelectorTrack$1),
    controls: container.querySelector(attrSelectorControls)
  };
  instances$2.push(new OverflowScroller(elements, config2));
}
const initializer$4 = new ComponentInitializer({
  type: "scrollpoint",
  baseAttribute: "data-ulu-scrollpoint"
});
function init$6() {
  initializer$4.init({
    withData: true,
    coreEvents: ["pageModified"],
    setup({ element, data, initialize }) {
      const config2 = Object.assign({}, data);
      new Scrollpoint(element, config2);
      initialize();
    }
  });
}
const _Scrollpoint = class _Scrollpoint {
  /**
   * Setup a new scrollpoint
   * @param {Node} element The element to create the scrollpoint for
   * @param {Object} config Options to configure the scrollpoint see Scrollpoint.defaults for more information on settings
   */
  constructor(element, config2) {
    const options = Object.assign({}, _Scrollpoint.defaults, config2);
    if (!element) {
      logError(this, "Missing required element");
      return;
    }
    if (options.rootSelector) {
      options.root = document.querySelector(options.rootSelector);
      delete options.rootSelector;
    }
    this.options = options;
    this.observer = null;
    this.lastPosition = null;
    this.isActive = false;
    this.element = element;
    this.syncedElements = [
      element,
      ...options.syncElements.map((target) => getElement(target))
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
    if (options.debug) {
      initializer$4.log(this);
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
    const { lastPosition, isActive, options } = this;
    const isForward = lastPosition === null ? null : lastPosition < y;
    entries.forEach((entry) => {
      const { isIntersecting } = entry;
      if (isIntersecting && !isActive) {
        this.setState(true, isForward);
      } else if (!isIntersecting && isActive && options.exit) {
        if (isForward && options.exitForward || !isForward && options.exitReverse) {
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
      initializer$4.log("IntersectionObserver (options)", config2);
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
  attributeName: "data-ulu-scrollpoint-state",
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
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        return Reflect.construct(f, arguments, this.constructor);
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
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
      var index = -1, length = object ? object.length : 0;
      if (typeof length == "number" && length > -1 && length <= maxSafeInteger) {
        while (++index < length) {
          callback(object[index], index, object);
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
      each(array, function(value, index) {
        accumulator = callback(accumulator, value, index, array);
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
  (function(root, factory2) {
    {
      module.exports = factory2(root);
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
      var index = -1;
      var codeUnit;
      var result = "";
      var firstCodeUnit = string.charCodeAt(0);
      while (++index < length) {
        codeUnit = string.charCodeAt(index);
        if (codeUnit == 0) {
          result += "�";
          continue;
        }
        if (
          // If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
          // U+007F, […]
          codeUnit >= 1 && codeUnit <= 31 || codeUnit == 127 || // If the character is the first character and is in the range [0-9]
          // (U+0030 to U+0039), […]
          index == 0 && codeUnit >= 48 && codeUnit <= 57 || // If the character is the second character and is in the range [0-9]
          // (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
          index == 1 && codeUnit >= 48 && codeUnit <= 57 && firstCodeUnit == 45
        ) {
          result += "\\" + codeUnit.toString(16) + " ";
          continue;
        }
        if (
          // If the character is the first character and is a `-` (U+002D), and
          // there is no second character, […]
          index == 0 && length == 1 && codeUnit == 45
        ) {
          result += "\\" + string.charAt(index);
          continue;
        }
        if (codeUnit >= 128 || codeUnit == 45 || codeUnit == 95 || codeUnit >= 48 && codeUnit <= 57 || codeUnit >= 65 && codeUnit <= 90 || codeUnit >= 97 && codeUnit <= 122) {
          result += string.charAt(index);
          continue;
        }
        result += "\\" + string.charAt(index);
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
    var container = null;
    while (element) {
      container = element;
      element = element.parentNode;
    }
    if (container.nodeType === container.DOCUMENT_FRAGMENT_NODE && container.host) {
      return container.host;
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
var key = { exports: {} };
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
})(key, key.exports);
var keyExports = key.exports;
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
        var found = sequence.some(function(element, index) {
          if (!(0, _activeElement2.default)(element)) {
            return false;
          }
          currentIndex = index;
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
var swipeListener_min = { exports: {} };
(function(module) {
  var _extends = Object.assign || function(a) {
    for (var b, c = 1; c < arguments.length; c++) for (var d in b = arguments[c], b) Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
    return a;
  }, SwipeListener = function(a, b) {
    if (a) {
      "undefined" != typeof window && function() {
        function a2(a3, b2) {
          b2 = b2 || { bubbles: false, cancelable: false, detail: void 0 };
          var c2 = document.createEvent("CustomEvent");
          return c2.initCustomEvent(a3, b2.bubbles, b2.cancelable, b2.detail), c2;
        }
        return "function" != typeof window.CustomEvent && void (a2.prototype = window.Event.prototype, window.CustomEvent = a2);
      }();
      b || (b = {}), b = _extends({}, { minHorizontal: 10, minVertical: 10, deltaHorizontal: 3, deltaVertical: 5, preventScroll: false, lockAxis: true, touch: true, mouse: true }, b);
      var c = [], d = false, e = function() {
        d = true;
      }, f = function(a2) {
        d = false, h(a2);
      }, g = function(a2) {
        d && (a2.changedTouches = [{ clientX: a2.clientX, clientY: a2.clientY }], i(a2));
      };
      b.mouse && (a.addEventListener("mousedown", e), a.addEventListener("mouseup", f), a.addEventListener("mousemove", g));
      var h = function(d2) {
        var e2 = Math.abs, f2 = Math.max, g2 = Math.min;
        if (c.length) {
          for (var h2 = "function" == typeof TouchEvent && d2 instanceof TouchEvent, j2 = [], k2 = [], l = { top: false, right: false, bottom: false, left: false }, m = 0; m < c.length; m++) j2.push(c[m].x), k2.push(c[m].y);
          var i2 = j2[0], n = j2[j2.length - 1], o = k2[0], p = k2[k2.length - 1], q = { x: [i2, n], y: [o, p] };
          if (1 < c.length) {
            var r = { detail: _extends({ touch: h2, target: d2.target }, q) }, s = new CustomEvent("swiperelease", r);
            a.dispatchEvent(s);
          }
          var t = j2[0] - j2[j2.length - 1], u = "none";
          u = 0 < t ? "left" : "right";
          var v, w = g2.apply(Math, j2), x = f2.apply(Math, j2);
          if (e2(t) >= b.minHorizontal && ("left" == u ? (v = e2(w - j2[j2.length - 1]), v <= b.deltaHorizontal && (l.left = true)) : "right" == u ? (v = e2(x - j2[j2.length - 1]), v <= b.deltaHorizontal && (l.right = true)) : void 0), t = k2[0] - k2[k2.length - 1], u = "none", u = 0 < t ? "top" : "bottom", w = g2.apply(Math, k2), x = f2.apply(Math, k2), e2(t) >= b.minVertical && ("top" == u ? (v = e2(w - k2[k2.length - 1]), v <= b.deltaVertical && (l.top = true)) : "bottom" == u ? (v = e2(x - k2[k2.length - 1]), v <= b.deltaVertical && (l.bottom = true)) : void 0), c = [], l.top || l.right || l.bottom || l.left) {
            b.lockAxis && ((l.left || l.right) && e2(i2 - n) > e2(o - p) ? l.top = l.bottom = false : (l.top || l.bottom) && e2(i2 - n) < e2(o - p) && (l.left = l.right = false));
            var y = { detail: _extends({ directions: l, touch: h2, target: d2.target }, q) }, z = new CustomEvent("swipe", y);
            a.dispatchEvent(z);
          } else {
            var A = new CustomEvent("swipecancel", { detail: _extends({ touch: h2, target: d2.target }, q) });
            a.dispatchEvent(A);
          }
        }
      }, i = function(d2) {
        var e2 = d2.changedTouches[0];
        if (c.push({ x: e2.clientX, y: e2.clientY }), 1 < c.length) {
          var f2 = c[0].x, g2 = c[c.length - 1].x, h2 = c[0].y, i2 = c[c.length - 1].y, j2 = { detail: { x: [f2, g2], y: [h2, i2], touch: "function" == typeof TouchEvent && d2 instanceof TouchEvent, target: d2.target } }, k2 = new CustomEvent("swiping", j2), l = true === b.preventScroll || "function" == typeof b.preventScroll && b.preventScroll(k2);
          l && d2.preventDefault(), a.dispatchEvent(k2);
        }
      }, j = false;
      try {
        var k = Object.defineProperty({}, "passive", { get: function() {
          j = { passive: !b.preventScroll };
        } });
        window.addEventListener("testPassive", null, k), window.removeEventListener("testPassive", null, k);
      } catch (a2) {
      }
      return b.touch && (a.addEventListener("touchmove", i, j), a.addEventListener("touchend", h)), { off: function() {
        a.removeEventListener("touchmove", i, j), a.removeEventListener("touchend", h), a.removeEventListener("mousedown", e), a.removeEventListener("mouseup", f), a.removeEventListener("mousemove", g);
      } };
    }
  };
  module.exports = SwipeListener, module.exports.default = SwipeListener;
})(swipeListener_min);
var swipeListener_minExports = swipeListener_min.exports;
const setupSwipeListener = /* @__PURE__ */ getDefaultExportFromCjs(swipeListener_minExports);
const initializer$3 = new ComponentInitializer({
  type: "slider",
  baseAttribute: "data-ulu-slider"
});
const attrSelectorTrack = initializer$3.attributeSelector("track");
const attrSelectorTrackContainer = initializer$3.attributeSelector("track-container");
const attrSelectorControlContext = initializer$3.attributeSelector("control-context");
const attrSelectorSlide = initializer$3.attributeSelector("slide");
const instances$1 = [];
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
function init$5() {
  initializer$3.init({
    withData: true,
    coreEvents: ["pageModified"],
    setup({ element, data, initialize }) {
      setupSlider(element, data);
      initialize();
    }
  });
}
function setupSlider(container, options) {
  const config2 = Object.assign({}, options);
  const elements = {
    container,
    track: container.querySelector(attrSelectorTrack),
    trackContainer: container.querySelector(attrSelectorTrackContainer),
    controlContext: container.querySelector(attrSelectorControlContext),
    slides: container.querySelectorAll(attrSelectorSlide)
  };
  if (elements.slides.length) {
    instances$1.push(new Slider(elements, config2, false));
  }
}
const _Slider = class _Slider {
  constructor(elements, config2) {
    const options = Object.assign({}, _Slider.defaults, config2);
    this.options = options;
    this.slide = null;
    this.index = null;
    this.swipeInstance = null;
    this.swipeListener = null;
    this.swipeImageListener = null;
    this.transitioning = false;
    if (!hasRequiredProps(requiredElements)) {
      logError(this, "Missing a required Element");
    }
    if (!elements.slides.length) {
      logError(this, "Missing slides");
    }
    this.slides = [...elements.slides].map((element, index) => {
      return {
        element,
        index,
        number: index + 1
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
    const index = prev < 0 ? last : prev;
    this.emit("previous", [event, index]);
    this.goto(index, event, "previous");
  }
  /**
   * Goto to the next slide
   */
  next(event) {
    const { index: lastIndex, slides } = this;
    const next = lastIndex + 1;
    const index = next > slides.length - 1 ? 0 : next;
    this.emit("next", [event, index]);
    this.goto(index, event, "next");
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
    const { options } = this;
    const { element } = slide;
    const duration = visible2 ? options.transitionDuration : options.transitionDurationExit;
    return this.ensureTransitionEnds(element, duration, () => {
      element.style.opacity = visible2 ? "1" : "0";
    });
  }
  /**
   * Handler for the entire slide transtion
   */
  async slideTransition({ slide, index, old, oldIndex, triggerType }) {
    const count = this.slides.length;
    const reverse = triggerType === "previous";
    const lastIndex = count - 1;
    const lastToFirst = index === 0 && oldIndex === lastIndex;
    const firstToLast = index === lastIndex && oldIndex === 0;
    let switchSlide;
    let duration = this.options.transitionDuration;
    if (oldIndex && !lastToFirst && !firstToLast) {
      duration = duration * Math.abs(oldIndex - index);
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
  goto(index, event, triggerType) {
    const {
      slide: old,
      index: oldIndex,
      slides,
      elements
    } = this;
    const isInit = triggerType === "init";
    const slide = slides[index];
    const activeClass = this.getClass("nav-button--active");
    const transitionClass = this.getClass("transition", true);
    const to = { slide, index, old, oldIndex, triggerType };
    if (index === oldIndex) {
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
      this.index = index;
      this.slide = slide;
      this.transitioning = false;
      elements.container.classList.remove(transitionClass);
      lockInteractives.disengage();
      if (!isInit) {
        slide.element.focus();
        this.emit("goto", [event, index, slide]);
      }
    });
  }
  setup() {
    const { container, track, trackContainer } = this.elements;
    const trackCss = trimWhitespace(this.trackCss());
    const trackContainerStyles = trimWhitespace(this.trackContainerStyles());
    const slideCss = trimWhitespace(this.slideCss());
    track.setAttribute("style", trackCss);
    trackContainer.setAttribute("style", trackContainerStyles);
    this.slides.forEach((slide) => {
      slide.element.setAttribute("style", slideCss);
      slide.element.setAttribute("tabindex", "-1");
    });
    container.classList.add(this.getClass());
    if (this.options.swipeEnabled) {
      this.setupSwipe();
    }
  }
  setupSwipe() {
    const images = this.elements.track.querySelectorAll("img");
    this.swipeListener = (event) => {
      this.onSwipe(event);
    };
    this.swipeImageListener = (event) => {
      event.preventDefault();
    };
    this.slides.forEach((slide) => {
      const { element } = slide;
      slide.swipeInstance = setupSwipeListener(element, this.options.swipeOptions);
      element.addEventListener("swipe", this.swipeListener);
    });
    images.forEach((image) => {
      image.addEventListener("dragstart", this.swipeImageListener);
    });
  }
  onSwipe(event) {
    const { directions } = event.detail;
    const method = directions.left ? "next" : directions.right ? "previous" : null;
    if (method) {
      this[method](event);
    }
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
  createNav(container) {
    const nav = document.createElement("ul");
    const navButtons = this.slides.map(this.createNavButton.bind(this));
    const navItems = navButtons.map((button) => {
      const item = document.createElement("li");
      item.appendChild(button);
      nav.appendChild(item);
      return item;
    });
    nav.classList.add(this.getClass("nav"));
    container.appendChild(nav);
    return {
      nav,
      navButtons,
      navItems
    };
  }
  createNavButton(slide, index) {
    const button = document.createElement("button");
    button.classList.add(this.getClass("nav-button"));
    button.setAttribute("type", "button");
    button.innerHTML = this.getNavContent(slide);
    slide.navButton = button;
    button.addEventListener("click", this.goto.bind(this, index));
    return button;
  }
  getControlContent(action) {
    const classes = this.options[action === "next" ? "iconClassNext" : "iconClassPrevious"];
    return `
      <span class="${this.options.classAccessiblyHidden}">${action}</span>
      <span class="${this.getClass("control-icon")} ${classes}" aria-hidden="true"></span>
    `;
  }
  getNavContent(slide) {
    return `<span class="${this.options.classAccessiblyHidden}">Item ${slide.number}</span>`;
  }
  emit(name, args) {
    if (this.options.events[name]) {
      this.options.events[name].apply(this, args);
    }
  }
};
__publicField(_Slider, "instances", []);
/**
 * Default options for slider
 */
__publicField(_Slider, "defaults", {
  classAccessiblyHidden: "hidden-visually",
  namespace: "Slider",
  events: {},
  transition: true,
  transitionFade: false,
  transitionDuration: 700,
  transitionDurationExit: 400,
  transitionTimingFunction: "ease-in-out",
  buttonClasses: ["button", "button--icon"],
  iconClassPrevious: wrapSettingString("iconClassPrevious"),
  iconClassNext: wrapSettingString("iconClassNext"),
  swipeEnabled: true,
  swipeOptions: {
    preventScroll: true
  }
});
let Slider = _Slider;
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
const instances = [];
const initializer$2 = new ComponentInitializer({
  type: "tabs",
  baseAttribute: "data-ulu-tablist"
});
function init$4() {
  const initial = () => {
    initializer$2.init({
      coreEvents: ["pageModified"],
      withData: true,
      setup({ element, data, initialize }) {
        setup$1(element, data);
        initialize();
      }
    });
    instances.forEach(openByCurrentHash);
  };
  if (document.readyState === "complete") {
    initial();
  } else {
    window.addEventListener("load", initial);
  }
}
function setup$1(element, options = {}) {
  const config2 = Object.assign({}, options);
  if (config2.vertical) {
    config2.allArrows = true;
  }
  const instance = { element, options };
  instance.ariaTablist = AriaTablist(element, {
    onOpen(...args) {
      args.unshift(instance);
      handleOpen.apply(null, args);
    },
    ...config2
  });
  instances.push(instance);
  if (config2.equalHeights) {
    setHeights(element);
  }
  return instance;
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
function handleOpen({ options }, panel, tab) {
  if (options.openByUrlHash && window.history) {
    window.history.replaceState(null, "", `#${tab.id}`);
  }
}
function setHeights(element) {
  const tabs = [...element.children];
  const panels = tabs.map((n) => document.querySelector(`[aria-labelledby="${n.id}"]`));
  const parent = panels[0].parentElement;
  const images = [...parent.querySelectorAll("img")];
  const imagePromises = images.map((image) => imagePromise(image));
  function imagePromise(image) {
    return new Promise((resolve2) => {
      if (image.complete) {
        resolve2(image);
      } else {
        image.onload = resolve2;
        image.onerror = resolve2;
      }
    });
  }
  Promise.all(imagePromises).then(() => {
    const heights = panels.map((panel) => {
      let panelHeight = panel.offsetHeight;
      if (panel.hidden) {
        panel.hidden = false;
        panelHeight = panel.offsetHeight;
        panel.setAttribute("hidden", "hidden");
      }
      return panelHeight;
    });
    const max2 = Math.max(...heights);
    panels.forEach((panel) => panel.style.minHeight = `${max2}px`);
  });
}
const initializer$1 = new ComponentInitializer({
  type: "theme-toggle",
  baseAttribute: "data-ulu-theme-toggle"
});
const attrSelectorLabel = initializer$1.attributeSelector("label");
const attrSelectorIcon = initializer$1.attributeSelector("icon");
const attrRemote = initializer$1.getAttribute("remote");
const attrInit = initializer$1.getAttribute("init");
const attrState = initializer$1.getAttribute("state");
const queryRemotes = (group) => document.querySelectorAll(
  `[${attrRemote}="${group}"]`
);
const queryRemotesInitial = (group) => document.querySelectorAll(
  `[${attrRemote}="${group}"]:not([${attrInit}])`
);
const requiredToggleProps = ["target"];
const checkToggleProps = hasRequiredProps(requiredToggleProps);
const when = (cond, fn) => cond ? fn() : null;
const defaults$2 = {
  /**
   * Object of each theme that should be toggle/cycled through
   */
  themes: {
    light: {
      label: "Light",
      value: "light",
      iconClass: "fas fa-moon",
      targetClass: "theme-light",
      mediaQuery: "(prefers-color-scheme: light)"
    },
    dark: {
      label: "Dark",
      iconClass: "fas fa-sun",
      targetClass: "theme-dark",
      mediaQuery: "(prefers-color-scheme: dark)"
    }
  },
  /**
   * Required this is the element(s) that should be changed by a specific toggle
   * - The element should have data-ulu-theme-toggle-target="SOME_IDENTIFIER"
   */
  target: "body",
  /**
   * Optional group to link remote toggles (toggles that follow the main one and can toggle too)
   */
  group: null,
  /**
   * Optional callback to do something when the state changes
   */
  onChange(_ctx) {
  },
  /**
   * The initial state for this component
   * - May be overridden by saved preference or media query if options are enabled
   */
  initialState: "light",
  /**
   * Check the OS systems user preference via 'preferenceQuery' option
   */
  checkMediaQuery: false,
  /**
   * Will store the preference in local storage so it persists between page loads
   */
  savePreference: false,
  /**
   * The key that will be used to store the preference in local storage
   * - This will be used as prefix in combination with group if defined
   */
  storagePrefix: "ulu-theme-",
  /**
   * Output information to console for debugging
   */
  debug: false
};
let currentDefaults = { ...defaults$2 };
function setDefaults(options) {
  currentDefaults = Object.assign({}, currentDefaults, options);
}
function init$3() {
  initializer$1.init({
    coreEvents: ["pageModified"],
    withData: true,
    setup({ element, data, initialize }) {
      setupToggle(element, data);
      initialize();
    }
  });
}
function setupToggle(toggle, userOptions) {
  const options = Object.assign({}, defaults$2, userOptions);
  if (!checkToggleProps(options)) {
    console.error(`Missing a required option: ${requiredToggleProps.join(", ")}`);
    return;
  }
  const group = options.group;
  const ctx = { toggle, options };
  const initialKey = resolveInitial(options);
  if (!initialKey) {
    console.error("Unable to resolve initial key");
    return;
  }
  setState$1(initialKey, ctx);
  toggle.addEventListener("click", onToggleClick);
  attachRemotes();
  document.addEventListener(getCoreEventName("pageModified"), attachRemotes);
  function toggleState(event) {
    const targets = getElements(options.target);
    const lastKey = targets[0].dataset.uluThemeToggleState;
    const key2 = getNextThemeKey(lastKey, options);
    if (!key2) {
      console.error("Issue getting next theme key");
      return;
    }
    setState$1(key2, { ...ctx, event });
  }
  function onToggleClick(event) {
    toggleState(event);
  }
  function attachRemotes() {
    if (!group) return;
    const remotes = queryRemotesInitial(group);
    remotes.forEach((remote) => {
      remote.addEventListener("click", onToggleClick);
      initializer$1.initializeElement(remote);
    });
  }
  function cleanupRemotes() {
    if (!group) return;
    const remotes = queryRemotesInitial(group);
    remotes.forEach((remote) => {
      remote.removeEventListener("click", onToggleClick);
      remote.removeAttribute(attrInit, "");
    });
  }
  function destroy() {
    toggle.removeEventListener("click", onToggleClick);
    toggle.removeAttribute(attrInit, "");
    cleanupRemotes();
    document.removeEventListener(getCoreEventName("pageModified"), attachRemotes);
  }
  return {
    destroy,
    toggle,
    options,
    toggleState,
    setState(themeKey) {
      setState$1(themeKey, ctx);
    }
  };
}
function setState$1(key2, ctx) {
  if (!key2) {
    console.error("Missing key");
    return;
  }
  const { toggle, options } = ctx;
  const { themes, group } = options;
  const elements = {
    targets: getElements(options.target),
    toggles: [toggle, ...group ? queryRemotes(group) : []]
  };
  if (!elements.targets.length || !elements.toggles.length) {
    console.error("Issue setting state, couldn't find needed elements", elements);
    return;
  }
  const theme = themes[key2];
  const otherThemes = getOtherThemes(key2, themes);
  const stateCtx = {
    ...ctx,
    key: key2,
    elements,
    theme,
    otherThemes
  };
  if (options.debug) {
    initializer$1.log("Set state context", stateCtx);
  }
  const otherTargetClasses = concatThemeClasses(otherThemes, "targetClass");
  const otherIconClasses = concatThemeClasses(otherThemes, "iconClass");
  elements.targets.forEach((element) => {
    element.setAttribute(attrState, key2);
    element.classList.remove(...otherTargetClasses);
    element.classList.add(...resolveClasses(theme.targetClass));
  });
  elements.toggles.forEach((element) => {
    const label = element.querySelector(attrSelectorLabel);
    const icon = element.querySelector(attrSelectorIcon);
    if (label) {
      label.textContent = theme.label;
    }
    if (icon) {
      icon.classList.remove(...otherIconClasses);
      icon.classList.add(...resolveClasses(theme.iconClass));
    }
    element.setAttribute(attrState, key2);
  });
  if (options.onChange) {
    options.onChange(stateCtx);
  }
  if (options.savePreference) {
    localStorage.setItem(getStorageKey(options), key2);
  }
}
function resolveInitial(options) {
  const { savePreference, checkMediaQuery, themes, initialState } = options;
  const storageKey = getStorageKey(options);
  const saved = when(savePreference, () => localStorage.getItem(storageKey));
  const mediaQueryPreference = when(checkMediaQuery, () => getMatchingThemeQuery(themes));
  const resolved = saved || mediaQueryPreference || initialState;
  if (options.debug) {
    initializer$1.log("Preference Saved", saved);
    initializer$1.log("Media Query Preference", mediaQueryPreference);
    initializer$1.log("Initial State:", initialState);
  }
  if (!resolved) {
    initializer$1.logError("Failed to resolve initial theme (pass 'initialState' to options)");
  }
  return resolved;
}
function getMatchingThemeQuery(themes) {
  const found = Object.entries(themes).find(([_key, theme]) => {
    if (theme.mediaQuery) {
      return window.matchMedia(theme.mediaQuery).matches;
    }
  });
  return found ? found[0] : null;
}
function getNextThemeKey(activeKey, options) {
  const { themes } = options;
  const keys = Object.keys(themes);
  const index = keys.findIndex((theme) => theme === activeKey);
  const nextIndex = index === -1 ? 0 : (index + 1) % keys.length;
  return keys[nextIndex];
}
function getOtherThemes(currentKey, themes) {
  const all = Object.entries(themes);
  return all.filter(([key2]) => key2 !== currentKey).map(([_key, value]) => value);
}
function concatThemeClasses(themes, property) {
  return themes.reduce((acc, theme) => {
    return acc.concat(resolveClasses(theme[property]));
  }, []);
}
function getStorageKey(options) {
  const { storagePrefix, group } = options;
  return group ? `${storagePrefix}${group}` : storagePrefix;
}
const initializer = new ComponentInitializer({
  type: "tooltip",
  baseAttribute: "data-ulu-tooltip"
});
const attrBody = initializer.getAttribute("body");
const attrSelectorBody = initializer.attributeSelector("body");
const attrSelectorArrow = initializer.attributeSelector("arrow");
function init$2() {
  initializer.init({
    coreEvents: ["pageModified"],
    withData: true,
    setup({ element: trigger, data, initialize }) {
      const options = typeof data === "object" ? data : {};
      if (typeof data === "string") {
        options.content = data;
      }
      initialize();
      new Tooltip({ trigger }, options);
    }
  });
}
const _Tooltip = class _Tooltip {
  constructor(elements, userOptions, floatingOptions) {
    const { trigger } = elements;
    if (!trigger) {
      logError(this, "missing required trigger");
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
      logError(this, "Could not resolve inner content");
    }
  }
  getAnchorElement() {
    const { trigger } = this.elements;
    const { href } = trigger;
    const id = href ? href.split("#")[1] : null;
    const element = id ? document.getElementById(id) : null;
    if (!element) {
      console.error("Unable to get 'fromAnchor' element", trigger);
    }
    return element;
  }
  createContentElement() {
    const { options } = this;
    const content = createElementFromHtml(options.template(options));
    const body = content.querySelector(attrSelectorBody);
    const innerContent = this.getInnerContent();
    if (options.isHtml) {
      body.innerHTML = innerContent;
    } else {
      body.textContent = innerContent;
    }
    content.id = newId();
    if (options.contentClass) {
      content.classList.add(options.contentClass);
    }
    this.elements.content = content;
    this.elements.contentArrow = content.querySelector(attrSelectorArrow);
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
    return new CustomEvent(getUluEventName("tooltip:" + name), { detail });
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
          <div class="popover__inner" ${attrBody}>
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
const _FileSave = class _FileSave {
  /**
   * @param {*} data Data to put in blob file
   * @param {FileSaveOptions} options Options for file, see defaults (ie. type, filename)
   */
  constructor(data, options) {
    this.options = Object.assign({}, _FileSave.defaults, options);
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
function configureIcons() {
  updateSettings({
    iconClassClose: "fas fa-xmark",
    iconClassDragX: "fas fa-solid fa-grip-lines-vertical",
    // iconClassDragBoth: "fas fa-solid fa-grip", // Not really any good icons for this (no diagonal arrows, etc)
    iconClassPrevious: "fas fa-solid fa-chevron-left",
    iconClassNext: "fas fa-solid fa-chevron-right"
  });
}
const ulu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BreakpointManager,
  Collapsible,
  ComponentInitializer,
  FileSave,
  Flipcard,
  OverflowScroller,
  Popover,
  Resizer,
  Scrollpoint,
  Slider,
  Tooltip,
  classLoggerLog: log,
  classLoggerLogError: logError,
  classLoggerLogWarning: logWarning,
  classLoggerSet: set,
  createFloatingUi,
  createUluEvent,
  dataAttributeToDatasetKey,
  detailsGroupInit: init$h,
  detailsGroupInitializer: initializer$d,
  detailsGroupSetupGroup: setupGroup,
  dialogBaseAttribute: baseAttribute,
  dialogCloseAttribute: closeAttribute,
  dialogDefaults: defaults$9,
  dialogGetDialogOptions: getDialogOptions,
  dialogInit: init$g,
  dialogInitializer: initializer$c,
  dialogSetDefaults: setDefaults$3,
  dialogSetupDialog: setupDialog,
  dialogSetupTrigger: setupTrigger$1,
  dispatchCoreEvent,
  ensureId,
  flipcardInit: init$f,
  flipcardInitializer: initializer$b,
  floatingUiDefaults: defaults$7,
  fontAwesomeConfigureIcons: configureIcons,
  getCoreEventName,
  getDefaultSettings,
  getSetting,
  getSettings,
  getUluEventName,
  gridInit: init$e,
  gridInitializer: initializer$a,
  modalBuilderBuildModal: buildModal,
  modalBuilderDefaults: defaults$8,
  modalBuilderInit: init$d,
  modalBuilderInitializer: initializer$9,
  modalBuilderSetDefaults: setDefaults$2,
  newId,
  overflowScrollerCreatePager: createPager,
  pageInit: init$c,
  popoverGetContentByTrigger: getContentByTrigger,
  popoverInit: init$b,
  popoverInitializer: initializer$8,
  popoverInstances: instances$3,
  popoverResolve: resolve,
  printDetailsAttrs: attrs$2,
  printDetailsInit: init$a,
  printInit: init$9,
  proxyClickAttachHandlers: attachHandlers,
  proxyClickDefaults: defaults$4,
  proxyClickInit: init$8,
  proxyClickInitializer: initializer$6,
  proxyClickSetDefaults: setDefaults$1,
  proxyClickSetupProxy: setupProxy,
  resolveClasses,
  scrollSliderInit: init$7,
  scrollSliderInitializer: initializer$5,
  scrollpointInit: init$6,
  scrollpointInitializer: initializer$4,
  setPositionClasses,
  sliderInit: init$5,
  sliderInitializer: initializer$3,
  sliderSetupSlider: setupSlider,
  tabsInit: init$4,
  tabsInitializer: initializer$2,
  tabsInstances: instances,
  tabsSetup: setup$1,
  themeToggleDefaults: defaults$2,
  themeToggleInit: init$3,
  themeToggleInitializer: initializer$1,
  themeToggleSetDefaults: setDefaults,
  themeToggleSetupToggle: setupToggle,
  tooltipInit: init$2,
  tooltipInitializer: initializer,
  updateSetting,
  updateSettings,
  wrapSettingString,
  youtubePauseVideos: pauseVideos$1,
  youtubePrepVideos: prepVideos$1
}, Symbol.toStringTag, { value: "Module" }));
const attrs$1 = {
  container: "data-list-grid",
  toggle: "data-list-grid-toggle",
  toggleItemList: "data-list-grid-toggle-list",
  toggleItemGrid: "data-list-grid-toggle-grid"
};
const defaults$1 = {
  activeClass: "is-active",
  localStorageKey: "siteListGrid",
  onChange() {
  }
};
let config = defaults$1;
const attrSelector$1 = (key2) => `[${attrs$1[key2]}]`;
function getPreference() {
  return localStorage.getItem(config.localStorageKey);
}
function setConfig(changes) {
  config = Object.assign({}, defaults$1, changes);
}
function init$1() {
  const preference = getPreference();
  const containers = document.querySelectorAll(attrSelector$1("container"));
  if (!containers) return;
  containers.forEach((container) => {
    const toggle = container.querySelector(attrSelector$1("toggle"));
    if (preference) {
      setState(container, preference);
    }
    if (toggle) {
      toggle.addEventListener("click", onToggle);
    }
  });
}
function setState(container, value) {
  const toggle = container.querySelector(attrSelector$1("toggle"));
  container.setAttribute(attrs$1.container, value);
  localStorage.setItem(config.localStorageKey, value);
  if (toggle) {
    setStateToggle(toggle, value);
  } else {
    console.warn("Unable to get toggle for list grid");
  }
  if (config.onChange) {
    try {
      config.onChange(container, value);
    } catch (error) {
      console.error(error);
    }
  }
}
function setStateToggle(toggle, value) {
  const isList = value === "list";
  const list = toggle.querySelector(attrSelector$1("toggleItemList"));
  const grid = toggle.querySelector(attrSelector$1("toggleItemGrid"));
  if (list && grid) {
    list.classList[isList ? "add" : "remove"](config.activeClass);
    grid.classList[isList ? "remove" : "add"](config.activeClass);
  } else {
    console.warn("Unable to get elements for setStateToggle()");
  }
}
function onToggle() {
  const container = this.closest(attrSelector$1("container"));
  if (!container) {
    console.warn("Unable to find container list grid");
    return;
  }
  const state = container.getAttribute(attrs$1.container);
  const to = state === "list" ? "grid" : "list";
  setState(container, to);
}
var twig_core;
var hasRequiredTwig_core;
function requireTwig_core() {
  if (hasRequiredTwig_core) return twig_core;
  hasRequiredTwig_core = 1;
  twig_core = function(Twig2) {
    Twig2.trace = false;
    Twig2.debug = false;
    Twig2.cache = true;
    Twig2.noop = function() {
    };
    Twig2.merge = function(target, source, onlyChanged) {
      Object.keys(source).forEach((key2) => {
        if (onlyChanged && !(key2 in target)) {
          return;
        }
        target[key2] = source[key2];
      });
      return target;
    };
    Twig2.Error = function(message, file) {
      this.message = message;
      this.name = "TwigException";
      this.type = "TwigException";
      this.file = file;
    };
    Twig2.Error.prototype.toString = function() {
      const output2 = this.name + ": " + this.message;
      return output2;
    };
    Twig2.log = {
      trace(...args) {
        if (Twig2.trace && console) {
          console.log(Array.prototype.slice.call(args));
        }
      },
      debug(...args) {
        if (Twig2.debug && console) {
          console.log(Array.prototype.slice.call(args));
        }
      }
    };
    if (typeof console === "undefined") {
      Twig2.log.error = function() {
      };
    } else if (typeof console.error !== "undefined") {
      Twig2.log.error = function(...args) {
        console.error(...args);
      };
    } else if (typeof console.log !== "undefined") {
      Twig2.log.error = function(...args) {
        console.log(...args);
      };
    }
    Twig2.token = {};
    Twig2.token.type = {
      output: "output",
      logic: "logic",
      comment: "comment",
      raw: "raw",
      outputWhitespacePre: "output_whitespace_pre",
      outputWhitespacePost: "output_whitespace_post",
      outputWhitespaceBoth: "output_whitespace_both",
      logicWhitespacePre: "logic_whitespace_pre",
      logicWhitespacePost: "logic_whitespace_post",
      logicWhitespaceBoth: "logic_whitespace_both"
    };
    Twig2.token.definitions = [
      {
        type: Twig2.token.type.raw,
        open: "{% raw %}",
        close: "{% endraw %}"
      },
      {
        type: Twig2.token.type.raw,
        open: "{% verbatim %}",
        close: "{% endverbatim %}"
      },
      // *Whitespace type tokens*
      //
      // These typically take the form `{{- expression -}}` or `{{- expression }}` or `{{ expression -}}`.
      {
        type: Twig2.token.type.outputWhitespacePre,
        open: "{{-",
        close: "}}"
      },
      {
        type: Twig2.token.type.outputWhitespacePost,
        open: "{{",
        close: "-}}"
      },
      {
        type: Twig2.token.type.outputWhitespaceBoth,
        open: "{{-",
        close: "-}}"
      },
      {
        type: Twig2.token.type.logicWhitespacePre,
        open: "{%-",
        close: "%}"
      },
      {
        type: Twig2.token.type.logicWhitespacePost,
        open: "{%",
        close: "-%}"
      },
      {
        type: Twig2.token.type.logicWhitespaceBoth,
        open: "{%-",
        close: "-%}"
      },
      // *Output type tokens*
      //
      // These typically take the form `{{ expression }}`.
      {
        type: Twig2.token.type.output,
        open: "{{",
        close: "}}"
      },
      // *Logic type tokens*
      //
      // These typically take a form like `{% if expression %}` or `{% endif %}`
      {
        type: Twig2.token.type.logic,
        open: "{%",
        close: "%}"
      },
      // *Comment type tokens*
      //
      // These take the form `{# anything #}`
      {
        type: Twig2.token.type.comment,
        open: "{#",
        close: "#}"
      }
    ];
    Twig2.token.strings = ['"', "'"];
    Twig2.token.findStart = function(template) {
      const output2 = {
        position: null,
        def: null
      };
      let closePosition = null;
      const len = Twig2.token.definitions.length;
      let i;
      let tokenTemplate;
      let firstKeyPosition;
      let closeKeyPosition;
      for (i = 0; i < len; i++) {
        tokenTemplate = Twig2.token.definitions[i];
        firstKeyPosition = template.indexOf(tokenTemplate.open);
        closeKeyPosition = template.indexOf(tokenTemplate.close);
        Twig2.log.trace("Twig.token.findStart: ", "Searching for ", tokenTemplate.open, " found at ", firstKeyPosition);
        if (firstKeyPosition >= 0) {
          if (tokenTemplate.open.length !== tokenTemplate.close.length) {
            if (closeKeyPosition < 0) {
              continue;
            }
          }
        }
        if (firstKeyPosition >= 0 && (output2.position === null || firstKeyPosition < output2.position)) {
          output2.position = firstKeyPosition;
          output2.def = tokenTemplate;
          closePosition = closeKeyPosition;
        } else if (firstKeyPosition >= 0 && output2.position !== null && firstKeyPosition === output2.position) {
          if (tokenTemplate.open.length > output2.def.open.length) {
            output2.position = firstKeyPosition;
            output2.def = tokenTemplate;
            closePosition = closeKeyPosition;
          } else if (tokenTemplate.open.length === output2.def.open.length) {
            if (tokenTemplate.close.length > output2.def.close.length) {
              if (closeKeyPosition >= 0 && closeKeyPosition < closePosition) {
                output2.position = firstKeyPosition;
                output2.def = tokenTemplate;
                closePosition = closeKeyPosition;
              }
            } else if (closeKeyPosition >= 0 && closeKeyPosition < closePosition) {
              output2.position = firstKeyPosition;
              output2.def = tokenTemplate;
              closePosition = closeKeyPosition;
            }
          }
        }
      }
      return output2;
    };
    Twig2.token.findEnd = function(template, tokenDef, start) {
      let end = null;
      let found = false;
      let offset2 = 0;
      let strPos = null;
      let strFound = null;
      let pos = null;
      let endOffset = null;
      let thisStrPos = null;
      let endStrPos = null;
      let i;
      let l;
      while (!found) {
        strPos = null;
        strFound = null;
        pos = template.indexOf(tokenDef.close, offset2);
        if (pos >= 0) {
          end = pos;
          found = true;
        } else {
          throw new Twig2.Error("Unable to find closing bracket '" + tokenDef.close + "' opened near template position " + start);
        }
        if (tokenDef.type === Twig2.token.type.comment) {
          break;
        }
        if (tokenDef.type === Twig2.token.type.raw) {
          break;
        }
        l = Twig2.token.strings.length;
        for (i = 0; i < l; i += 1) {
          thisStrPos = template.indexOf(Twig2.token.strings[i], offset2);
          if (thisStrPos > 0 && thisStrPos < pos && (strPos === null || thisStrPos < strPos)) {
            strPos = thisStrPos;
            strFound = Twig2.token.strings[i];
          }
        }
        if (strPos !== null) {
          endOffset = strPos + 1;
          end = null;
          found = false;
          for (; ; ) {
            endStrPos = template.indexOf(strFound, endOffset);
            if (endStrPos < 0) {
              throw Twig2.Error("Unclosed string in template");
            }
            if (template.slice(endStrPos - 1, endStrPos) === "\\") {
              endOffset = endStrPos + 1;
            } else {
              offset2 = endStrPos + 1;
              break;
            }
          }
        }
      }
      return end;
    };
    Twig2.tokenize = function(template) {
      const tokens = [];
      let currentPosition = 0;
      let foundToken = null;
      let end = null;
      while (template.length > 0) {
        foundToken = Twig2.token.findStart(template);
        Twig2.log.trace("Twig.tokenize: ", "Found token: ", foundToken);
        if (foundToken.position === null) {
          tokens.push({
            type: Twig2.token.type.raw,
            value: template,
            position: {
              start: currentPosition,
              end: currentPosition + foundToken.position
            }
          });
          template = "";
        } else {
          if (foundToken.position > 0) {
            tokens.push({
              type: Twig2.token.type.raw,
              value: template.slice(0, Math.max(0, foundToken.position)),
              position: {
                start: currentPosition,
                end: currentPosition + Math.max(0, foundToken.position)
              }
            });
          }
          template = template.slice(foundToken.position + foundToken.def.open.length);
          currentPosition += foundToken.position + foundToken.def.open.length;
          end = Twig2.token.findEnd(template, foundToken.def, currentPosition);
          Twig2.log.trace("Twig.tokenize: ", "Token ends at ", end);
          tokens.push({
            type: foundToken.def.type,
            value: template.slice(0, Math.max(0, end)).trim(),
            position: {
              start: currentPosition - foundToken.def.open.length,
              end: currentPosition + end + foundToken.def.close.length
            }
          });
          if (template.slice(end + foundToken.def.close.length, end + foundToken.def.close.length + 1) === "\n") {
            switch (foundToken.def.type) {
              case "logic_whitespace_pre":
              case "logic_whitespace_post":
              case "logic_whitespace_both":
              case "logic":
                end += 1;
                break;
            }
          }
          template = template.slice(end + foundToken.def.close.length);
          currentPosition += end + foundToken.def.close.length;
        }
      }
      return tokens;
    };
    Twig2.compile = function(tokens) {
      const self2 = this;
      try {
        const output2 = [];
        const stack = [];
        let intermediateOutput = [];
        let token = null;
        let logicToken = null;
        let unclosedToken = null;
        let prevToken = null;
        let prevOutput = null;
        let prevIntermediateOutput = null;
        let prevTemplate = null;
        let nextToken = null;
        let tokOutput = null;
        let type = null;
        let open = null;
        let next = null;
        const compileOutput = function(token2) {
          Twig2.expression.compile.call(self2, token2);
          if (stack.length > 0) {
            intermediateOutput.push(token2);
          } else {
            output2.push(token2);
          }
        };
        const compileLogic = function(token2) {
          logicToken = Twig2.logic.compile.call(self2, token2);
          logicToken.position = token2.position;
          type = logicToken.type;
          open = Twig2.logic.handler[type].open;
          next = Twig2.logic.handler[type].next;
          Twig2.log.trace(
            "Twig.compile: ",
            "Compiled logic token to ",
            logicToken,
            " next is: ",
            next,
            " open is : ",
            open
          );
          if (open !== void 0 && !open) {
            prevToken = stack.pop();
            prevTemplate = Twig2.logic.handler[prevToken.type];
            if (!prevTemplate.next.includes(type)) {
              throw new Error(type + " not expected after a " + prevToken.type);
            }
            prevToken.output = prevToken.output || [];
            prevToken.output = prevToken.output.concat(intermediateOutput);
            intermediateOutput = [];
            tokOutput = {
              type: Twig2.token.type.logic,
              token: prevToken,
              position: {
                open: prevToken.position,
                close: token2.position
              }
            };
            if (stack.length > 0) {
              intermediateOutput.push(tokOutput);
            } else {
              output2.push(tokOutput);
            }
          }
          if (next !== void 0 && next.length > 0) {
            Twig2.log.trace("Twig.compile: ", "Pushing ", logicToken, " to logic stack.");
            if (stack.length > 0) {
              prevToken = stack.pop();
              prevToken.output = prevToken.output || [];
              prevToken.output = prevToken.output.concat(intermediateOutput);
              stack.push(prevToken);
              intermediateOutput = [];
            }
            stack.push(logicToken);
          } else if (open !== void 0 && open) {
            tokOutput = {
              type: Twig2.token.type.logic,
              token: logicToken,
              position: logicToken.position
            };
            if (stack.length > 0) {
              intermediateOutput.push(tokOutput);
            } else {
              output2.push(tokOutput);
            }
          }
        };
        while (tokens.length > 0) {
          token = tokens.shift();
          prevOutput = output2[output2.length - 1];
          prevIntermediateOutput = intermediateOutput[intermediateOutput.length - 1];
          nextToken = tokens[0];
          Twig2.log.trace("Compiling token ", token);
          switch (token.type) {
            case Twig2.token.type.raw:
              if (stack.length > 0) {
                intermediateOutput.push(token);
              } else {
                output2.push(token);
              }
              break;
            case Twig2.token.type.logic:
              compileLogic.call(self2, token);
              break;
            case Twig2.token.type.comment:
              break;
            case Twig2.token.type.output:
              compileOutput.call(self2, token);
              break;
            case Twig2.token.type.logicWhitespacePre:
            case Twig2.token.type.logicWhitespacePost:
            case Twig2.token.type.logicWhitespaceBoth:
            case Twig2.token.type.outputWhitespacePre:
            case Twig2.token.type.outputWhitespacePost:
            case Twig2.token.type.outputWhitespaceBoth:
              if (token.type !== Twig2.token.type.outputWhitespacePost && token.type !== Twig2.token.type.logicWhitespacePost) {
                if (prevOutput) {
                  if (prevOutput.type === Twig2.token.type.raw) {
                    output2.pop();
                    prevOutput.value = prevOutput.value.trimEnd();
                    output2.push(prevOutput);
                  }
                }
                if (prevIntermediateOutput) {
                  if (prevIntermediateOutput.type === Twig2.token.type.raw) {
                    intermediateOutput.pop();
                    prevIntermediateOutput.value = prevIntermediateOutput.value.trimEnd();
                    intermediateOutput.push(prevIntermediateOutput);
                  }
                }
              }
              switch (token.type) {
                case Twig2.token.type.outputWhitespacePre:
                case Twig2.token.type.outputWhitespacePost:
                case Twig2.token.type.outputWhitespaceBoth:
                  compileOutput.call(self2, token);
                  break;
                case Twig2.token.type.logicWhitespacePre:
                case Twig2.token.type.logicWhitespacePost:
                case Twig2.token.type.logicWhitespaceBoth:
                  compileLogic.call(self2, token);
                  break;
                default:
                  break;
              }
              if (token.type !== Twig2.token.type.outputWhitespacePre && token.type !== Twig2.token.type.logicWhitespacePre) {
                if (nextToken) {
                  if (nextToken.type === Twig2.token.type.raw) {
                    tokens.shift();
                    nextToken.value = nextToken.value.trimStart();
                    tokens.unshift(nextToken);
                  }
                }
              }
              break;
            default:
              break;
          }
          Twig2.log.trace(
            "Twig.compile: ",
            " Output: ",
            output2,
            " Logic Stack: ",
            stack,
            " Pending Output: ",
            intermediateOutput
          );
        }
        if (stack.length > 0) {
          unclosedToken = stack.pop();
          throw new Error("Unable to find an end tag for " + unclosedToken.type + ", expecting one of " + unclosedToken.next);
        }
        return output2;
      } catch (error) {
        if (self2.options.rethrow) {
          if (error.type === "TwigException" && !error.file) {
            error.file = self2.id;
          }
          throw error;
        } else {
          Twig2.log.error("Error compiling twig template " + self2.id + ": ");
          if (error.stack) {
            Twig2.log.error(error.stack);
          } else {
            Twig2.log.error(error.toString());
          }
        }
      }
    };
    function handleException(state, ex) {
      if (state.template.options.rethrow) {
        if (typeof ex === "string") {
          ex = new Twig2.Error(ex);
        }
        if (ex.type === "TwigException" && !ex.file) {
          ex.file = state.template.id;
        }
        throw ex;
      } else {
        Twig2.log.error("Error parsing twig template " + state.template.id + ": ");
        if (ex.stack) {
          Twig2.log.error(ex.stack);
        } else {
          Twig2.log.error(ex.toString());
        }
        if (Twig2.debug) {
          return ex.toString();
        }
      }
    }
    Twig2.prepare = function(data) {
      Twig2.log.debug("Twig.prepare: ", "Tokenizing ", data);
      const rawTokens = Twig2.tokenize.call(this, data);
      Twig2.log.debug("Twig.prepare: ", "Compiling ", rawTokens);
      const tokens = Twig2.compile.call(this, rawTokens);
      Twig2.log.debug("Twig.prepare: ", "Compiled ", tokens);
      return tokens;
    };
    Twig2.output = function(output2) {
      const { autoescape } = this.options;
      if (!autoescape) {
        return output2.join("");
      }
      const strategy = typeof autoescape === "string" ? autoescape : "html";
      const escapedOutput = output2.map((str) => {
        if (str && (str.twigMarkup !== true && str.twigMarkup !== strategy) && !(strategy === "html" && str.twigMarkup === "html_attr")) {
          str = Twig2.filters.escape(str, [strategy]);
        }
        return str;
      });
      if (escapedOutput.length === 0) {
        return "";
      }
      const joinedOutput = escapedOutput.join("");
      if (joinedOutput.length === 0) {
        return "";
      }
      return new Twig2.Markup(joinedOutput, true);
    };
    Twig2.Templates = {
      /**
       * Registered template loaders - use Twig.Templates.registerLoader to add supported loaders
       * @type {Object}
       */
      loaders: {},
      /**
       * Registered template parsers - use Twig.Templates.registerParser to add supported parsers
       * @type {Object}
       */
      parsers: {},
      /**
       * Cached / loaded templates
       * @type {Object}
       */
      registry: {}
    };
    Twig2.validateId = function(id) {
      if (id === "prototype") {
        throw new Twig2.Error(id + " is not a valid twig identifier");
      } else if (Twig2.cache && Object.hasOwnProperty.call(Twig2.Templates.registry, id)) {
        throw new Twig2.Error("There is already a template with the ID " + id);
      }
      return true;
    };
    Twig2.Templates.registerLoader = function(methodName, func, scope) {
      if (typeof func !== "function") {
        throw new Twig2.Error("Unable to add loader for " + methodName + ": Invalid function reference given.");
      }
      if (scope) {
        func = func.bind(scope);
      }
      this.loaders[methodName] = func;
    };
    Twig2.Templates.unRegisterLoader = function(methodName) {
      if (this.isRegisteredLoader(methodName)) {
        delete this.loaders[methodName];
      }
    };
    Twig2.Templates.isRegisteredLoader = function(methodName) {
      return Object.hasOwnProperty.call(this.loaders, methodName);
    };
    Twig2.Templates.registerParser = function(methodName, func, scope) {
      if (typeof func !== "function") {
        throw new Twig2.Error("Unable to add parser for " + methodName + ": Invalid function regerence given.");
      }
      if (scope) {
        func = func.bind(scope);
      }
      this.parsers[methodName] = func;
    };
    Twig2.Templates.unRegisterParser = function(methodName) {
      if (this.isRegisteredParser(methodName)) {
        delete this.parsers[methodName];
      }
    };
    Twig2.Templates.isRegisteredParser = function(methodName) {
      return Object.hasOwnProperty.call(this.parsers, methodName);
    };
    Twig2.Templates.save = function(template) {
      if (template.id === void 0) {
        throw new Twig2.Error("Unable to save template with no id");
      }
      Twig2.Templates.registry[template.id] = template;
    };
    Twig2.Templates.load = function(id) {
      if (!Object.hasOwnProperty.call(Twig2.Templates.registry, id)) {
        return null;
      }
      return Twig2.Templates.registry[id];
    };
    Twig2.Templates.loadRemote = function(location, params, callback, errorCallback) {
      const id = typeof params.id === "undefined" ? location : params.id;
      const cached = Twig2.Templates.registry[id];
      if (Twig2.cache && typeof cached !== "undefined") {
        if (typeof callback === "function") {
          callback(cached);
        }
        return cached;
      }
      params.parser = params.parser || "twig";
      params.id = id;
      if (typeof params.async === "undefined") {
        params.async = true;
      }
      const loader = this.loaders[params.method] || this.loaders.fs;
      return loader.call(this, location, params, callback, errorCallback);
    };
    function is(type, obj) {
      const clas = Object.prototype.toString.call(obj).slice(8, -1);
      return obj !== void 0 && obj !== null && clas === type;
    }
    Twig2.Block = function(template, token) {
      this.template = template;
      this.token = token;
    };
    Twig2.Block.prototype.render = function(parseState, context) {
      const originalTemplate = parseState.template;
      let promise;
      parseState.template = this.template;
      if (this.token.expression) {
        promise = Twig2.expression.parseAsync.call(parseState, this.token.output, context);
      } else {
        promise = parseState.parseAsync(this.token.output, context);
      }
      return promise.then((value) => {
        return Twig2.expression.parseAsync.call(
          parseState,
          {
            type: Twig2.expression.type.string,
            value
          },
          context
        );
      }).then((output2) => {
        parseState.template = originalTemplate;
        return output2;
      });
    };
    Twig2.ParseState = function(template, blockOverrides, context) {
      this.renderedBlocks = {};
      this.overrideBlocks = blockOverrides === void 0 ? {} : blockOverrides;
      this.context = context === void 0 ? {} : context;
      this.macros = {};
      this.nestingStack = [];
      this.template = template;
    };
    Twig2.ParseState.prototype.getBlock = function(name, checkOnlyInheritedBlocks) {
      let block;
      if (checkOnlyInheritedBlocks !== true) {
        block = this.overrideBlocks[name];
      }
      if (block === void 0) {
        block = this.template.getBlock(name, checkOnlyInheritedBlocks);
      }
      if (block === void 0 && this.template.parentTemplate !== null) {
        block = this.template.parentTemplate.getBlock(name);
      }
      return block;
    };
    Twig2.ParseState.prototype.getBlocks = function(includeParentBlocks) {
      let blocks = {};
      if (includeParentBlocks !== false && this.template.parentTemplate !== null && // Prevent infinite loop
      this.template.parentTemplate !== this.template) {
        blocks = this.template.parentTemplate.getBlocks();
      }
      blocks = {
        ...blocks,
        // Override with any blocks defined within the associated template
        ...this.template.getBlocks(),
        // Override with any blocks specified when initialized
        ...this.overrideBlocks
      };
      return blocks;
    };
    Twig2.ParseState.prototype.getNestingStackToken = function(type) {
      let matchingToken;
      this.nestingStack.forEach((token) => {
        if (matchingToken === void 0 && token.type === type) {
          matchingToken = token;
        }
      });
      return matchingToken;
    };
    Twig2.ParseState.prototype.parse = function(tokens, context, allowAsync) {
      const state = this;
      let output2 = [];
      let err = null;
      let isAsync = true;
      let promise = null;
      let chain = true;
      if (context) {
        state.context = context;
      }
      function outputPush(o) {
        output2.push(o);
      }
      function parseTokenLogic(logic) {
        if (typeof logic.chain !== "undefined") {
          chain = logic.chain;
        }
        if (typeof logic.context !== "undefined") {
          state.context = logic.context;
        }
        if (typeof logic.output !== "undefined") {
          output2.push(logic.output);
        }
      }
      promise = Twig2.async.forEach(tokens, (token) => {
        Twig2.log.debug("Twig.ParseState.parse: ", "Parsing token: ", token);
        switch (token.type) {
          case Twig2.token.type.raw:
            output2.push(Twig2.filters.raw(token.value));
            break;
          case Twig2.token.type.logic:
            return Twig2.logic.parseAsync.call(state, token.token, state.context, chain).then(parseTokenLogic);
          case Twig2.token.type.comment:
            break;
          case Twig2.token.type.outputWhitespacePre:
          case Twig2.token.type.outputWhitespacePost:
          case Twig2.token.type.outputWhitespaceBoth:
          case Twig2.token.type.output:
            Twig2.log.debug("Twig.ParseState.parse: ", "Output token: ", token.stack);
            return Twig2.expression.parseAsync.call(state, token.stack, state.context).then(outputPush);
        }
      }).then(() => {
        output2 = Twig2.output.call(state.template, output2);
        isAsync = false;
        return output2;
      }).catch((error) => {
        if (allowAsync) {
          handleException(state, error);
        }
        err = error;
      });
      if (allowAsync) {
        return promise;
      }
      if (err !== null) {
        return handleException(state, err);
      }
      if (isAsync) {
        throw new Twig2.Error("You are using Twig.js in sync mode in combination with async extensions.");
      }
      return output2;
    };
    Twig2.Template = function(params) {
      const { data, id, base, path, url, name, method, options } = params;
      this.base = base;
      this.blocks = {
        defined: {},
        imported: {}
      };
      this.id = id;
      this.method = method;
      this.name = name;
      this.options = options;
      this.parentTemplate = null;
      this.path = path;
      this.url = url;
      if (is("String", data)) {
        this.tokens = Twig2.prepare.call(this, data);
      } else {
        this.tokens = data;
      }
      if (id !== void 0) {
        Twig2.Templates.save(this);
      }
    };
    Twig2.Template.prototype.getBlock = function(name, checkOnlyInheritedBlocks, checkImports = true) {
      let block;
      if (checkOnlyInheritedBlocks !== true) {
        block = this.blocks.defined[name];
      }
      if (checkImports && block === void 0) {
        block = this.blocks.imported[name];
      }
      if (block === void 0 && this.parentTemplate !== null) {
        block = this.parentTemplate.getBlock(name, checkOnlyInheritedBlocks, checkImports = false);
      }
      return block;
    };
    Twig2.Template.prototype.getBlocks = function() {
      let blocks = {};
      blocks = {
        ...blocks,
        // Get any blocks imported from other templates
        ...this.blocks.imported,
        // Override with any blocks defined within the template itself
        ...this.blocks.defined
      };
      return blocks;
    };
    Twig2.Template.prototype.render = function(context, params, allowAsync) {
      const template = this;
      params = params || {};
      return Twig2.async.potentiallyAsync(template, allowAsync, () => {
        const state = new Twig2.ParseState(template, params.blocks, context);
        return state.parseAsync(template.tokens).then((output2) => {
          let parentTemplate;
          let url;
          if (template.parentTemplate !== null) {
            if (template.options.allowInlineIncludes) {
              parentTemplate = Twig2.Templates.load(template.parentTemplate);
              if (parentTemplate) {
                parentTemplate.options = template.options;
              }
            }
            if (!parentTemplate) {
              url = Twig2.path.parsePath(template, template.parentTemplate);
              parentTemplate = Twig2.Templates.loadRemote(url, {
                method: template.getLoaderMethod(),
                base: template.base,
                async: false,
                id: url,
                options: template.options
              });
            }
            template.parentTemplate = parentTemplate;
            return template.parentTemplate.renderAsync(
              state.context,
              {
                blocks: state.getBlocks(false),
                isInclude: true
              }
            );
          }
          if (params.isInclude === true) {
            return output2;
          }
          return output2.valueOf();
        });
      });
    };
    Twig2.Template.prototype.importFile = function(file) {
      let url = null;
      let subTemplate;
      if (!this.url && this.options.allowInlineIncludes) {
        file = this.path ? Twig2.path.parsePath(this, file) : file;
        subTemplate = Twig2.Templates.load(file);
        if (!subTemplate) {
          subTemplate = Twig2.Templates.loadRemote(url, {
            id: file,
            method: this.getLoaderMethod(),
            async: false,
            path: file,
            options: this.options
          });
          if (!subTemplate) {
            throw new Twig2.Error("Unable to find the template " + file);
          }
        }
        subTemplate.options = this.options;
        return subTemplate;
      }
      url = Twig2.path.parsePath(this, file);
      subTemplate = Twig2.Templates.loadRemote(url, {
        method: this.getLoaderMethod(),
        base: this.base,
        async: false,
        options: this.options,
        id: url
      });
      return subTemplate;
    };
    Twig2.Template.prototype.getLoaderMethod = function() {
      if (this.path) {
        return "fs";
      }
      if (this.url) {
        return "ajax";
      }
      return this.method || "fs";
    };
    Twig2.Template.prototype.compile = function(options) {
      return Twig2.compiler.compile(this, options);
    };
    Twig2.Markup = function(content, strategy) {
      if (typeof content !== "string") {
        return content;
      }
      const output2 = new String(content);
      output2.twigMarkup = typeof strategy === "undefined" ? true : strategy;
      return output2;
    };
    return Twig2;
  };
  return twig_core;
}
var twig_compiler;
var hasRequiredTwig_compiler;
function requireTwig_compiler() {
  if (hasRequiredTwig_compiler) return twig_compiler;
  hasRequiredTwig_compiler = 1;
  twig_compiler = function(Twig2) {
    Twig2.compiler = {
      module: {}
    };
    Twig2.compiler.compile = function(template, options) {
      const tokens = JSON.stringify(template.tokens);
      const { id } = template;
      let output2 = null;
      if (options.module) {
        if (Twig2.compiler.module[options.module] === void 0) {
          throw new Twig2.Error("Unable to find module type " + options.module);
        }
        output2 = Twig2.compiler.module[options.module](id, tokens, options.twig);
      } else {
        output2 = Twig2.compiler.wrap(id, tokens);
      }
      return output2;
    };
    Twig2.compiler.module = {
      amd(id, tokens, pathToTwig) {
        return 'define(["' + pathToTwig + '"], function (Twig) {\n	var twig, templates;\ntwig = Twig.twig;\ntemplates = ' + Twig2.compiler.wrap(id, tokens) + "\n	return templates;\n});";
      },
      node(id, tokens) {
        return 'var twig = require("twig").twig;\nexports.template = ' + Twig2.compiler.wrap(id, tokens);
      },
      cjs2(id, tokens, pathToTwig) {
        return 'module.declare([{ twig: "' + pathToTwig + '" }], function (require, exports, module) {\n	var twig = require("twig").twig;\n	exports.template = ' + Twig2.compiler.wrap(id, tokens) + "\n});";
      }
    };
    Twig2.compiler.wrap = function(id, tokens) {
      return 'twig({id:"' + id.replace('"', '\\"') + '", data:' + tokens + ", precompiled: true});\n";
    };
    return Twig2;
  };
  return twig_compiler;
}
var twig_expression_operator;
var hasRequiredTwig_expression_operator;
function requireTwig_expression_operator() {
  if (hasRequiredTwig_expression_operator) return twig_expression_operator;
  hasRequiredTwig_expression_operator = 1;
  twig_expression_operator = function(Twig2) {
    Twig2.expression.operator = {
      leftToRight: "leftToRight",
      rightToLeft: "rightToLeft"
    };
    const containment = function(a, b) {
      if (b === void 0 || b === null) {
        return null;
      }
      if (b.indexOf !== void 0) {
        return (a === b || a !== "") && b.includes(a);
      }
      let el;
      for (el in b) {
        if (Object.hasOwnProperty.call(b, el) && b[el] === a) {
          return true;
        }
      }
      return false;
    };
    Twig2.expression.operator.lookup = function(operator, token) {
      switch (operator) {
        case "..":
          token.precidence = 20;
          token.associativity = Twig2.expression.operator.leftToRight;
          break;
        case ",":
          token.precidence = 18;
          token.associativity = Twig2.expression.operator.leftToRight;
          break;
        case "?:":
        case "?":
        case ":":
          token.precidence = 16;
          token.associativity = Twig2.expression.operator.rightToLeft;
          break;
        case "??":
          token.precidence = 15;
          token.associativity = Twig2.expression.operator.rightToLeft;
          break;
        case "or":
          token.precidence = 14;
          token.associativity = Twig2.expression.operator.leftToRight;
          break;
        case "and":
          token.precidence = 13;
          token.associativity = Twig2.expression.operator.leftToRight;
          break;
        case "b-or":
          token.precidence = 12;
          token.associativity = Twig2.expression.operator.leftToRight;
          break;
        case "b-xor":
          token.precidence = 11;
          token.associativity = Twig2.expression.operator.leftToRight;
          break;
        case "b-and":
          token.precidence = 10;
          token.associativity = Twig2.expression.operator.leftToRight;
          break;
        case "==":
        case "!=":
          token.precidence = 9;
          token.associativity = Twig2.expression.operator.leftToRight;
          break;
        case "<=>":
          token.precidence = 9;
          token.associativity = Twig2.expression.operator.leftToRight;
          break;
        case "<":
        case "<=":
        case ">":
        case ">=":
        case "not in":
        case "in":
          token.precidence = 8;
          token.associativity = Twig2.expression.operator.leftToRight;
          break;
        case "~":
        case "+":
        case "-":
          token.precidence = 6;
          token.associativity = Twig2.expression.operator.leftToRight;
          break;
        case "//":
        case "**":
        case "*":
        case "/":
        case "%":
          token.precidence = 5;
          token.associativity = Twig2.expression.operator.leftToRight;
          break;
        case "not":
          token.precidence = 3;
          token.associativity = Twig2.expression.operator.rightToLeft;
          break;
        case "matches":
          token.precidence = 8;
          token.associativity = Twig2.expression.operator.leftToRight;
          break;
        case "starts with":
          token.precidence = 8;
          token.associativity = Twig2.expression.operator.leftToRight;
          break;
        case "ends with":
          token.precidence = 8;
          token.associativity = Twig2.expression.operator.leftToRight;
          break;
        default:
          throw new Twig2.Error("Failed to lookup operator: " + operator + " is an unknown operator.");
      }
      token.operator = operator;
      return token;
    };
    Twig2.expression.operator.parse = function(operator, stack) {
      Twig2.log.trace("Twig.expression.operator.parse: ", "Handling ", operator);
      let a;
      let b;
      let c;
      if (operator === "?") {
        c = stack.pop();
      }
      b = stack.pop();
      if (operator !== "not") {
        a = stack.pop();
      }
      if (operator !== "in" && operator !== "not in" && operator !== "??") {
        if (a && Array.isArray(a)) {
          a = a.length;
        }
        if (operator !== "?" && (b && Array.isArray(b))) {
          b = b.length;
        }
      }
      if (operator === "matches") {
        if (b && typeof b === "string") {
          const reParts = b.match(/^\/(.*)\/([gims]?)$/);
          const reBody = reParts[1];
          const reFlags = reParts[2];
          b = new RegExp(reBody, reFlags);
        }
      }
      switch (operator) {
        case ":":
          break;
        case "??":
          if (a === void 0) {
            a = b;
            b = c;
            c = void 0;
          }
          if (a !== void 0 && a !== null) {
            stack.push(a);
          } else {
            stack.push(b);
          }
          break;
        case "?:":
          if (Twig2.lib.boolval(a)) {
            stack.push(a);
          } else {
            stack.push(b);
          }
          break;
        case "?":
          if (a === void 0) {
            a = b;
            b = c;
            c = void 0;
          }
          if (Twig2.lib.boolval(a)) {
            stack.push(b);
          } else {
            stack.push(c);
          }
          break;
        case "+":
          b = parseFloat(b);
          a = parseFloat(a);
          stack.push(a + b);
          break;
        case "-":
          b = parseFloat(b);
          a = parseFloat(a);
          stack.push(a - b);
          break;
        case "*":
          b = parseFloat(b);
          a = parseFloat(a);
          stack.push(a * b);
          break;
        case "/":
          b = parseFloat(b);
          a = parseFloat(a);
          stack.push(a / b);
          break;
        case "//":
          b = parseFloat(b);
          a = parseFloat(a);
          stack.push(Math.floor(a / b));
          break;
        case "%":
          b = parseFloat(b);
          a = parseFloat(a);
          stack.push(a % b);
          break;
        case "~":
          stack.push((typeof a !== "undefined" && a !== null ? a.toString() : "") + (typeof b !== "undefined" && b !== null ? b.toString() : ""));
          break;
        case "not":
        case "!":
          stack.push(!Twig2.lib.boolval(b));
          break;
        case "<=>":
          stack.push(a === b ? 0 : a < b ? -1 : 1);
          break;
        case "<":
          stack.push(a < b);
          break;
        case "<=":
          stack.push(a <= b);
          break;
        case ">":
          stack.push(a > b);
          break;
        case ">=":
          stack.push(a >= b);
          break;
        case "===":
          stack.push(a === b);
          break;
        case "==":
          stack.push(a == b);
          break;
        case "!==":
          stack.push(a !== b);
          break;
        case "!=":
          stack.push(a != b);
          break;
        case "or":
          stack.push(Twig2.lib.boolval(a) || Twig2.lib.boolval(b));
          break;
        case "b-or":
          stack.push(a | b);
          break;
        case "b-xor":
          stack.push(a ^ b);
          break;
        case "and":
          stack.push(Twig2.lib.boolval(a) && Twig2.lib.boolval(b));
          break;
        case "b-and":
          stack.push(a & b);
          break;
        case "**":
          stack.push(a ** b);
          break;
        case "not in":
          stack.push(!containment(a, b));
          break;
        case "in":
          stack.push(containment(a, b));
          break;
        case "matches":
          stack.push(b.test(a));
          break;
        case "starts with":
          stack.push(typeof a === "string" && a.indexOf(b) === 0);
          break;
        case "ends with":
          stack.push(typeof a === "string" && a.includes(b, a.length - b.length));
          break;
        case "..":
          stack.push(Twig2.functions.range(a, b));
          break;
        default:
          throw new Twig2.Error("Failed to parse operator: " + operator + " is an unknown operator.");
      }
    };
    return Twig2;
  };
  return twig_expression_operator;
}
var twig_expression;
var hasRequiredTwig_expression;
function requireTwig_expression() {
  if (hasRequiredTwig_expression) return twig_expression;
  hasRequiredTwig_expression = 1;
  twig_expression = function(Twig2) {
    function parseParams(state, params, context) {
      if (params) {
        return Twig2.expression.parseAsync.call(state, params, context);
      }
      return Twig2.Promise.resolve(false);
    }
    Twig2.expression = {};
    requireTwig_expression_operator()(Twig2);
    Twig2.expression.reservedWords = [
      "true",
      "false",
      "null",
      "TRUE",
      "FALSE",
      "NULL",
      "_context",
      "and",
      "b-and",
      "or",
      "b-or",
      "b-xor",
      "in",
      "not in",
      "if",
      "matches",
      "starts",
      "ends",
      "with"
    ];
    Twig2.expression.type = {
      comma: "Twig.expression.type.comma",
      operator: {
        unary: "Twig.expression.type.operator.unary",
        binary: "Twig.expression.type.operator.binary"
      },
      string: "Twig.expression.type.string",
      bool: "Twig.expression.type.bool",
      slice: "Twig.expression.type.slice",
      array: {
        start: "Twig.expression.type.array.start",
        end: "Twig.expression.type.array.end"
      },
      object: {
        start: "Twig.expression.type.object.start",
        end: "Twig.expression.type.object.end"
      },
      parameter: {
        start: "Twig.expression.type.parameter.start",
        end: "Twig.expression.type.parameter.end"
      },
      subexpression: {
        start: "Twig.expression.type.subexpression.start",
        end: "Twig.expression.type.subexpression.end"
      },
      key: {
        period: "Twig.expression.type.key.period",
        brackets: "Twig.expression.type.key.brackets"
      },
      filter: "Twig.expression.type.filter",
      _function: "Twig.expression.type._function",
      variable: "Twig.expression.type.variable",
      number: "Twig.expression.type.number",
      _null: "Twig.expression.type.null",
      context: "Twig.expression.type.context",
      test: "Twig.expression.type.test"
    };
    Twig2.expression.set = {
      // What can follow an expression (in general)
      operations: [
        Twig2.expression.type.filter,
        Twig2.expression.type.operator.unary,
        Twig2.expression.type.operator.binary,
        Twig2.expression.type.array.end,
        Twig2.expression.type.object.end,
        Twig2.expression.type.parameter.end,
        Twig2.expression.type.subexpression.end,
        Twig2.expression.type.comma,
        Twig2.expression.type.test
      ],
      expressions: [
        Twig2.expression.type._function,
        Twig2.expression.type.bool,
        Twig2.expression.type.string,
        Twig2.expression.type.variable,
        Twig2.expression.type.number,
        Twig2.expression.type._null,
        Twig2.expression.type.context,
        Twig2.expression.type.parameter.start,
        Twig2.expression.type.array.start,
        Twig2.expression.type.object.start,
        Twig2.expression.type.subexpression.start,
        Twig2.expression.type.operator.unary
      ]
    };
    Twig2.expression.set.operationsExtended = Twig2.expression.set.operations.concat([
      Twig2.expression.type.key.period,
      Twig2.expression.type.key.brackets,
      Twig2.expression.type.slice
    ]);
    Twig2.expression.fn = {
      compile: {
        push(token, stack, output2) {
          output2.push(token);
        },
        pushBoth(token, stack, output2) {
          output2.push(token);
          stack.push(token);
        }
      },
      parse: {
        push(token, stack) {
          stack.push(token);
        },
        pushValue(token, stack) {
          stack.push(token.value);
        }
      }
    };
    Twig2.expression.definitions = [
      {
        type: Twig2.expression.type.test,
        regex: /^is\s+(not)?\s*([a-zA-Z_]\w*(\s?(?:as|by))?)/,
        next: Twig2.expression.set.operations.concat([Twig2.expression.type.parameter.start]),
        compile(token, stack, output2) {
          token.filter = token.match[2];
          token.modifier = token.match[1];
          delete token.match;
          delete token.value;
          output2.push(token);
        },
        parse(token, stack, context) {
          const value = stack.pop();
          const state = this;
          return parseParams(state, token.params, context).then((params) => {
            const result = Twig2.test(token.filter, value, params);
            if (token.modifier === "not") {
              stack.push(!result);
            } else {
              stack.push(result);
            }
          });
        }
      },
      {
        type: Twig2.expression.type.comma,
        // Match a comma
        regex: /^,/,
        next: Twig2.expression.set.expressions.concat([Twig2.expression.type.array.end, Twig2.expression.type.object.end]),
        compile(token, stack, output2) {
          let i = stack.length - 1;
          let stackToken;
          delete token.match;
          delete token.value;
          for (; i >= 0; i--) {
            stackToken = stack.pop();
            if (stackToken.type === Twig2.expression.type.object.start || stackToken.type === Twig2.expression.type.parameter.start || stackToken.type === Twig2.expression.type.array.start) {
              stack.push(stackToken);
              break;
            }
            output2.push(stackToken);
          }
          output2.push(token);
        }
      },
      {
        /**
         * Match a number (integer or decimal)
         */
        type: Twig2.expression.type.number,
        // Match a number
        regex: /^-?\d+(\.\d+)?/,
        next: Twig2.expression.set.operations,
        compile(token, stack, output2) {
          token.value = Number(token.value);
          output2.push(token);
        },
        parse: Twig2.expression.fn.parse.pushValue
      },
      {
        type: Twig2.expression.type.operator.binary,
        // Match any of ??, ?:, +, *, /, -, %, ~, <=>, <, <=, >, >=, !=, ==, **, ?, :, and, b-and, or, b-or, b-xor, in, not in
        // and, or, in, not in, matches, starts with, ends with can be followed by a space or parenthesis
        regex: /(^\?\?|^\?:|^(b-and)|^(b-or)|^(b-xor)|^[+\-~%?]|^(<=>)|^[:](?!\d\])|^[!=]==?|^[!<>]=?|^\*\*?|^\/\/?|^(and)[(|\s+]|^(or)[(|\s+]|^(in)[(|\s+]|^(not in)[(|\s+]|^(matches)|^(starts with)|^(ends with)|^\.\.)/,
        next: Twig2.expression.set.expressions,
        transform(match, tokens) {
          switch (match[0]) {
            case "and(":
            case "or(":
            case "in(":
            case "not in(":
              tokens[tokens.length - 1].value = match[2];
              return match[0];
            default:
              return "";
          }
        },
        compile(token, stack, output2) {
          delete token.match;
          token.value = token.value.trim();
          const { value } = token;
          const operator = Twig2.expression.operator.lookup(value, token);
          Twig2.log.trace("Twig.expression.compile: ", "Operator: ", operator, " from ", value);
          while (stack.length > 0 && (stack[stack.length - 1].type === Twig2.expression.type.operator.unary || stack[stack.length - 1].type === Twig2.expression.type.operator.binary) && (operator.associativity === Twig2.expression.operator.leftToRight && operator.precidence >= stack[stack.length - 1].precidence || operator.associativity === Twig2.expression.operator.rightToLeft && operator.precidence > stack[stack.length - 1].precidence)) {
            const temp = stack.pop();
            output2.push(temp);
          }
          if (value === ":") {
            if (stack[stack.length - 1] && stack[stack.length - 1].value === "?") ;
            else {
              const keyToken = output2.pop();
              if (keyToken.type === Twig2.expression.type.string || keyToken.type === Twig2.expression.type.variable) {
                token.key = keyToken.value;
              } else if (keyToken.type === Twig2.expression.type.number) {
                token.key = keyToken.value.toString();
              } else if (keyToken.expression && (keyToken.type === Twig2.expression.type.parameter.end || keyToken.type === Twig2.expression.type.subexpression.end)) {
                token.params = keyToken.params;
              } else {
                throw new Twig2.Error("Unexpected value before ':' of " + keyToken.type + " = " + keyToken.value);
              }
              output2.push(token);
            }
          } else {
            stack.push(operator);
          }
        },
        parse(token, stack, context) {
          const state = this;
          if (token.key) {
            stack.push(token);
          } else if (token.params) {
            return Twig2.expression.parseAsync.call(state, token.params, context).then((key2) => {
              token.key = key2;
              stack.push(token);
              if (!context.loop) {
                delete token.params;
              }
            });
          } else {
            Twig2.expression.operator.parse(token.value, stack);
          }
        }
      },
      {
        type: Twig2.expression.type.operator.unary,
        // Match any of not
        regex: /(^not\s+)/,
        next: Twig2.expression.set.expressions,
        compile(token, stack, output2) {
          delete token.match;
          token.value = token.value.trim();
          const { value } = token;
          const operator = Twig2.expression.operator.lookup(value, token);
          Twig2.log.trace("Twig.expression.compile: ", "Operator: ", operator, " from ", value);
          while (stack.length > 0 && (stack[stack.length - 1].type === Twig2.expression.type.operator.unary || stack[stack.length - 1].type === Twig2.expression.type.operator.binary) && (operator.associativity === Twig2.expression.operator.leftToRight && operator.precidence >= stack[stack.length - 1].precidence || operator.associativity === Twig2.expression.operator.rightToLeft && operator.precidence > stack[stack.length - 1].precidence)) {
            const temp = stack.pop();
            output2.push(temp);
          }
          stack.push(operator);
        },
        parse(token, stack) {
          Twig2.expression.operator.parse(token.value, stack);
        }
      },
      {
        /**
         * Match a string. This is anything between a pair of single or double quotes.
         */
        type: Twig2.expression.type.string,
        // See: http://blog.stevenlevithan.com/archives/match-quoted-string
        regex: /^(["'])(?:(?=(\\?))\2[\s\S])*?\1/,
        next: Twig2.expression.set.operationsExtended,
        compile(token, stack, output2) {
          let { value } = token;
          delete token.match;
          if (value.slice(0, 1) === '"') {
            value = value.replace('\\"', '"');
          } else {
            value = value.replace("\\'", "'");
          }
          token.value = value.slice(1, -1).replace(/\\n/g, "\n").replace(/\\r/g, "\r");
          Twig2.log.trace("Twig.expression.compile: ", "String value: ", token.value);
          output2.push(token);
        },
        parse: Twig2.expression.fn.parse.pushValue
      },
      {
        /**
         * Match a subexpression set start.
         */
        type: Twig2.expression.type.subexpression.start,
        regex: /^\(/,
        next: Twig2.expression.set.expressions.concat([Twig2.expression.type.subexpression.end]),
        compile(token, stack, output2) {
          token.value = "(";
          output2.push(token);
          stack.push(token);
        },
        parse: Twig2.expression.fn.parse.push
      },
      {
        /**
         * Match a subexpression set end.
         */
        type: Twig2.expression.type.subexpression.end,
        regex: /^\)/,
        next: Twig2.expression.set.operationsExtended,
        validate(match, tokens) {
          let i = tokens.length - 1;
          let foundSubexpressionStart = false;
          let nextSubexpressionStartInvalid = false;
          let unclosedParameterCount = 0;
          while (!foundSubexpressionStart && i >= 0) {
            const token = tokens[i];
            foundSubexpressionStart = token.type === Twig2.expression.type.subexpression.start;
            if (foundSubexpressionStart && nextSubexpressionStartInvalid) {
              nextSubexpressionStartInvalid = false;
              foundSubexpressionStart = false;
            }
            if (token.type === Twig2.expression.type.parameter.start) {
              unclosedParameterCount++;
            } else if (token.type === Twig2.expression.type.parameter.end) {
              unclosedParameterCount--;
            } else if (token.type === Twig2.expression.type.subexpression.end) {
              nextSubexpressionStartInvalid = true;
            }
            i--;
          }
          return foundSubexpressionStart && unclosedParameterCount === 0;
        },
        compile(token, stack, output2) {
          let stackToken;
          const endToken = token;
          stackToken = stack.pop();
          while (stack.length > 0 && stackToken.type !== Twig2.expression.type.subexpression.start) {
            output2.push(stackToken);
            stackToken = stack.pop();
          }
          const paramStack = [];
          while (token.type !== Twig2.expression.type.subexpression.start) {
            paramStack.unshift(token);
            token = output2.pop();
          }
          paramStack.unshift(token);
          stackToken = stack[stack.length - 1];
          if (stackToken === void 0 || stackToken.type !== Twig2.expression.type._function && stackToken.type !== Twig2.expression.type.filter && stackToken.type !== Twig2.expression.type.test && stackToken.type !== Twig2.expression.type.key.brackets) {
            endToken.expression = true;
            paramStack.pop();
            paramStack.shift();
            endToken.params = paramStack;
            output2.push(endToken);
          } else {
            endToken.expression = false;
            stackToken.params = paramStack;
          }
        },
        parse(token, stack, context) {
          const state = this;
          if (token.expression) {
            return Twig2.expression.parseAsync.call(state, token.params, context).then((value) => {
              stack.push(value);
            });
          }
          throw new Twig2.Error("Unexpected subexpression end when token is not marked as an expression");
        }
      },
      {
        /**
         * Match a parameter set start.
         */
        type: Twig2.expression.type.parameter.start,
        regex: /^\(/,
        next: Twig2.expression.set.expressions.concat([Twig2.expression.type.parameter.end]),
        validate(match, tokens) {
          const lastToken = tokens[tokens.length - 1];
          return lastToken && !Twig2.expression.reservedWords.includes(lastToken.value.trim());
        },
        compile: Twig2.expression.fn.compile.pushBoth,
        parse: Twig2.expression.fn.parse.push
      },
      {
        /**
         * Match a parameter set end.
         */
        type: Twig2.expression.type.parameter.end,
        regex: /^\)/,
        next: Twig2.expression.set.operationsExtended,
        compile(token, stack, output2) {
          let stackToken;
          const endToken = token;
          stackToken = stack.pop();
          while (stack.length > 0 && stackToken.type !== Twig2.expression.type.parameter.start) {
            output2.push(stackToken);
            stackToken = stack.pop();
          }
          const paramStack = [];
          while (token.type !== Twig2.expression.type.parameter.start) {
            paramStack.unshift(token);
            token = output2.pop();
          }
          paramStack.unshift(token);
          token = output2[output2.length - 1];
          if (token === void 0 || token.type !== Twig2.expression.type._function && token.type !== Twig2.expression.type.filter && token.type !== Twig2.expression.type.test && token.type !== Twig2.expression.type.key.brackets) {
            endToken.expression = true;
            paramStack.pop();
            paramStack.shift();
            endToken.params = paramStack;
            output2.push(endToken);
          } else {
            endToken.expression = false;
            token.params = paramStack;
          }
        },
        parse(token, stack, context) {
          const newArray = [];
          let arrayEnded = false;
          let value = null;
          const state = this;
          if (token.expression) {
            return Twig2.expression.parseAsync.call(state, token.params, context).then((value2) => {
              stack.push(value2);
            });
          }
          while (stack.length > 0) {
            value = stack.pop();
            if (value && value.type && value.type === Twig2.expression.type.parameter.start) {
              arrayEnded = true;
              break;
            }
            newArray.unshift(value);
          }
          if (!arrayEnded) {
            throw new Twig2.Error("Expected end of parameter set.");
          }
          stack.push(newArray);
        }
      },
      {
        type: Twig2.expression.type.slice,
        regex: /^\[(-?\w*:-?\w*)\]/,
        next: Twig2.expression.set.operationsExtended,
        compile(token, stack, output2) {
          const sliceRange = token.match[1].split(":");
          const sliceStart = sliceRange[0];
          const sliceEnd = sliceRange[1];
          token.value = "slice";
          token.params = [sliceStart, sliceEnd];
          if (!sliceEnd) {
            token.params = [sliceStart];
          }
          output2.push(token);
        },
        parse(token, stack, context) {
          const input = stack.pop();
          let { params } = token;
          const state = this;
          if (parseInt(params[0], 10).toString() === params[0]) {
            params[0] = parseInt(params[0], 10);
          } else {
            const value = context[params[0]];
            if (state.template.options.strictVariables && value === void 0) {
              throw new Twig2.Error('Variable "' + params[0] + '" does not exist.');
            }
            params[0] = value;
          }
          if (params[1]) {
            if (parseInt(params[1], 10).toString() === params[1]) {
              params[1] = parseInt(params[1], 10);
            } else {
              const value = context[params[1]];
              if (state.template.options.strictVariables && value === void 0) {
                throw new Twig2.Error('Variable "' + params[1] + '" does not exist.');
              }
              if (value === void 0) {
                params = [params[0]];
              } else {
                params[1] = value;
              }
            }
          }
          stack.push(Twig2.filter.call(state, token.value, input, params));
        }
      },
      {
        /**
         * Match an array start.
         */
        type: Twig2.expression.type.array.start,
        regex: /^\[/,
        next: Twig2.expression.set.expressions.concat([Twig2.expression.type.array.end]),
        compile: Twig2.expression.fn.compile.pushBoth,
        parse: Twig2.expression.fn.parse.push
      },
      {
        /**
         * Match an array end.
         */
        type: Twig2.expression.type.array.end,
        regex: /^\]/,
        next: Twig2.expression.set.operationsExtended,
        compile(token, stack, output2) {
          let i = stack.length - 1;
          let stackToken;
          for (; i >= 0; i--) {
            stackToken = stack.pop();
            if (stackToken.type === Twig2.expression.type.array.start) {
              break;
            }
            output2.push(stackToken);
          }
          output2.push(token);
        },
        parse(token, stack) {
          const newArray = [];
          let arrayEnded = false;
          let value = null;
          while (stack.length > 0) {
            value = stack.pop();
            if (value && value.type && value.type === Twig2.expression.type.array.start) {
              arrayEnded = true;
              break;
            }
            newArray.unshift(value);
          }
          if (!arrayEnded) {
            throw new Twig2.Error("Expected end of array.");
          }
          stack.push(newArray);
        }
      },
      // Token that represents the start of a hash map '}'
      //
      // Hash maps take the form:
      //    { "key": 'value', "another_key": item }
      //
      // Keys must be quoted (either single or double) and values can be any expression.
      {
        type: Twig2.expression.type.object.start,
        regex: /^\{/,
        next: Twig2.expression.set.expressions.concat([Twig2.expression.type.object.end]),
        compile: Twig2.expression.fn.compile.pushBoth,
        parse: Twig2.expression.fn.parse.push
      },
      // Token that represents the end of a Hash Map '}'
      //
      // This is where the logic for building the internal
      // representation of a hash map is defined.
      {
        type: Twig2.expression.type.object.end,
        regex: /^\}/,
        next: Twig2.expression.set.operationsExtended,
        compile(token, stack, output2) {
          let i = stack.length - 1;
          let stackToken;
          for (; i >= 0; i--) {
            stackToken = stack.pop();
            if (stackToken && stackToken.type === Twig2.expression.type.object.start) {
              break;
            }
            output2.push(stackToken);
          }
          output2.push(token);
        },
        parse(endToken, stack) {
          const newObject = {};
          let objectEnded = false;
          let token = null;
          let hasValue = false;
          let value = null;
          while (stack.length > 0) {
            token = stack.pop();
            if (token && token.type && token.type === Twig2.expression.type.object.start) {
              objectEnded = true;
              break;
            }
            if (token && token.type && (token.type === Twig2.expression.type.operator.binary || token.type === Twig2.expression.type.operator.unary) && token.key) {
              if (!hasValue) {
                throw new Twig2.Error("Missing value for key '" + token.key + "' in object definition.");
              }
              newObject[token.key] = value;
              if (newObject._keys === void 0) {
                newObject._keys = [];
              }
              newObject._keys.unshift(token.key);
              value = null;
              hasValue = false;
            } else {
              hasValue = true;
              value = token;
            }
          }
          if (!objectEnded) {
            throw new Twig2.Error("Unexpected end of object.");
          }
          stack.push(newObject);
        }
      },
      // Token representing a filter
      //
      // Filters can follow any expression and take the form:
      //    expression|filter(optional, args)
      //
      // Filter parsing is done in the Twig.filters namespace.
      {
        type: Twig2.expression.type.filter,
        // Match a | then a letter or _, then any number of letters, numbers, _ or -
        regex: /^\|\s?([a-zA-Z_][a-zA-Z0-9_-]*)/,
        next: Twig2.expression.set.operationsExtended.concat([
          Twig2.expression.type.parameter.start
        ]),
        compile(token, stack, output2) {
          token.value = token.match[1];
          output2.push(token);
        },
        parse(token, stack, context) {
          const input = stack.pop();
          const state = this;
          return parseParams(state, token.params, context).then((params) => {
            return Twig2.filter.call(state, token.value, input, params);
          }).then((value) => {
            stack.push(value);
          });
        }
      },
      {
        type: Twig2.expression.type._function,
        // Match any letter or _, then any number of letters, numbers, _ or - followed by (
        regex: /^([a-zA-Z_]\w*)\s*\(/,
        next: Twig2.expression.type.parameter.start,
        validate(match) {
          return match[1] && !Twig2.expression.reservedWords.includes(match[1]);
        },
        transform() {
          return "(";
        },
        compile(token, stack, output2) {
          const fn = token.match[1];
          token.fn = fn;
          delete token.match;
          delete token.value;
          output2.push(token);
        },
        parse(token, stack, context) {
          const state = this;
          const { fn } = token;
          let value;
          return parseParams(state, token.params, context).then((params) => {
            if (Twig2.functions[fn]) {
              value = Twig2.functions[fn].apply(state, params);
            } else if (typeof context[fn] === "function") {
              value = context[fn](...params);
            } else {
              throw new Twig2.Error(fn + " function does not exist and is not defined in the context");
            }
            return value;
          }).then((result) => {
            stack.push(result);
          });
        }
      },
      // Token representing a variable.
      //
      // Variables can contain letters, numbers, underscores and
      // dashes, but must start with a letter or underscore.
      //
      // Variables are retrieved from the render context and take
      // the value of 'undefined' if the given variable doesn't
      // exist in the context.
      {
        type: Twig2.expression.type.variable,
        // Match any letter or _, then any number of letters, numbers, _ or -
        regex: /^[a-zA-Z_]\w*/,
        next: Twig2.expression.set.operationsExtended.concat([
          Twig2.expression.type.parameter.start
        ]),
        compile: Twig2.expression.fn.compile.push,
        validate(match) {
          return !Twig2.expression.reservedWords.includes(match[0]);
        },
        parse(token, stack, context) {
          const state = this;
          return Twig2.expression.resolveAsync.call(state, context[token.value], context).then((value) => {
            if (state.template.options.strictVariables && value === void 0) {
              throw new Twig2.Error('Variable "' + token.value + '" does not exist.');
            }
            stack.push(value);
          });
        }
      },
      {
        type: Twig2.expression.type.key.period,
        regex: /^\.(\w+)/,
        next: Twig2.expression.set.operationsExtended.concat([
          Twig2.expression.type.parameter.start
        ]),
        compile(token, stack, output2) {
          token.key = token.match[1];
          delete token.match;
          delete token.value;
          output2.push(token);
        },
        parse(token, stack, context, nextToken) {
          const state = this;
          const { key: key2 } = token;
          const object = stack.pop();
          let value;
          if (object && !Object.prototype.hasOwnProperty.call(object, key2) && state.template.options.strictVariables) {
            const keys = Object.keys(object);
            if (keys.length > 0) {
              throw new Twig2.Error('Key "' + key2 + '" for object with keys "' + Object.keys(object).join(", ") + '" does not exist.');
            } else {
              throw new Twig2.Error('Key "' + key2 + '" does not exist as the object is empty.');
            }
          }
          return parseParams(state, token.params, context).then((params) => {
            if (object === null || object === void 0) {
              value = void 0;
            } else {
              const capitalize = function(value2) {
                return value2.slice(0, 1).toUpperCase() + value2.slice(1);
              };
              if (typeof object === "object" && key2 in object) {
                value = object[key2];
              } else if (object["get" + capitalize(key2)]) {
                value = object["get" + capitalize(key2)];
              } else if (object["is" + capitalize(key2)]) {
                value = object["is" + capitalize(key2)];
              } else {
                value = void 0;
              }
            }
            return Twig2.expression.resolveAsync.call(state, value, context, params, nextToken, object);
          }).then((result) => {
            stack.push(result);
          });
        }
      },
      {
        type: Twig2.expression.type.key.brackets,
        regex: /^\[([^\]]*)\]/,
        next: Twig2.expression.set.operationsExtended.concat([
          Twig2.expression.type.parameter.start
        ]),
        compile(token, stack, output2) {
          const match = token.match[1];
          delete token.value;
          delete token.match;
          token.stack = Twig2.expression.compile({
            value: match
          }).stack;
          output2.push(token);
        },
        parse(token, stack, context, nextToken) {
          const state = this;
          let params = null;
          let object;
          let value;
          return parseParams(state, token.params, context).then((parameters) => {
            params = parameters;
            return Twig2.expression.parseAsync.call(state, token.stack, context);
          }).then((key2) => {
            object = stack.pop();
            if (object && !Object.prototype.hasOwnProperty.call(object, key2) && state.template.options.strictVariables) {
              const keys = Object.keys(object);
              if (keys.length > 0) {
                throw new Twig2.Error('Key "' + key2 + '" for array with keys "' + keys.join(", ") + '" does not exist.');
              } else {
                throw new Twig2.Error('Key "' + key2 + '" does not exist as the array is empty.');
              }
            } else if (object === null || object === void 0) {
              return null;
            }
            if (typeof object === "object" && key2 in object) {
              value = object[key2];
            } else {
              value = null;
            }
            return Twig2.expression.resolveAsync.call(state, value, object, params, nextToken);
          }).then((result) => {
            stack.push(result);
          });
        }
      },
      {
        /**
         * Match a null value.
         */
        type: Twig2.expression.type._null,
        // Match a number
        regex: /^(null|NULL|none|NONE)/,
        next: Twig2.expression.set.operations,
        compile(token, stack, output2) {
          delete token.match;
          token.value = null;
          output2.push(token);
        },
        parse: Twig2.expression.fn.parse.pushValue
      },
      {
        /**
         * Match the context
         */
        type: Twig2.expression.type.context,
        regex: /^_context/,
        next: Twig2.expression.set.operationsExtended.concat([
          Twig2.expression.type.parameter.start
        ]),
        compile: Twig2.expression.fn.compile.push,
        parse(token, stack, context) {
          stack.push(context);
        }
      },
      {
        /**
         * Match a boolean
         */
        type: Twig2.expression.type.bool,
        regex: /^(true|TRUE|false|FALSE)/,
        next: Twig2.expression.set.operations,
        compile(token, stack, output2) {
          token.value = token.match[0].toLowerCase() === "true";
          delete token.match;
          output2.push(token);
        },
        parse: Twig2.expression.fn.parse.pushValue
      }
    ];
    Twig2.expression.resolveAsync = function(value, context, params, nextToken, object) {
      const state = this;
      if (typeof value !== "function") {
        return Twig2.Promise.resolve(value);
      }
      let promise = Twig2.Promise.resolve(params);
      if (nextToken && nextToken.type === Twig2.expression.type.parameter.end) {
        const tokensAreParameters = true;
        promise = promise.then(() => {
          return nextToken.params && Twig2.expression.parseAsync.call(state, nextToken.params, context, tokensAreParameters);
        }).then((p) => {
          nextToken.cleanup = true;
          return p;
        });
      }
      return promise.then((params2) => {
        return value.apply(object || context, params2 || []);
      });
    };
    Twig2.expression.resolve = function(value, context, params, nextToken, object) {
      return Twig2.async.potentiallyAsync(this, false, function() {
        return Twig2.expression.resolveAsync.call(this, value, context, params, nextToken, object);
      });
    };
    Twig2.expression.handler = {};
    Twig2.expression.extendType = function(type) {
      Twig2.expression.type[type] = "Twig.expression.type." + type;
    };
    Twig2.expression.extend = function(definition) {
      if (!definition.type) {
        throw new Twig2.Error("Unable to extend logic definition. No type provided for " + definition);
      }
      Twig2.expression.handler[definition.type] = definition;
    };
    while (Twig2.expression.definitions.length > 0) {
      Twig2.expression.extend(Twig2.expression.definitions.shift());
    }
    Twig2.expression.tokenize = function(rawToken) {
      let expression = rawToken.value;
      const tokens = [];
      let expOffset = 0;
      let next = null;
      let type;
      let regex;
      let regexI;
      let tokenNext;
      let matchFound;
      let invalidMatches = [];
      const matchFunction = function(...args) {
        let matchI = arguments.length - 2;
        const match = new Array(matchI);
        while (matchI-- > 0) {
          match[matchI] = args[matchI];
        }
        Twig2.log.trace(
          "Twig.expression.tokenize",
          "Matched a ",
          type,
          " regular expression of ",
          match
        );
        if (next && !next.includes(type)) {
          invalidMatches.push(
            type + " cannot follow a " + tokens[tokens.length - 1].type + " at template:" + expOffset + " near '" + match[0].slice(0, 20) + "...'"
          );
          return match[0];
        }
        const handler = Twig2.expression.handler[type];
        if (handler.validate && !handler.validate(match, tokens)) {
          return match[0];
        }
        invalidMatches = [];
        const token = {
          type,
          value: match[0],
          match
        };
        if (rawToken.position) {
          token.position = rawToken.position;
        }
        tokens.push(token);
        matchFound = true;
        next = tokenNext;
        expOffset += match[0].length;
        if (handler.transform) {
          return handler.transform(match, tokens);
        }
        return "";
      };
      Twig2.log.debug("Twig.expression.tokenize", "Tokenizing expression ", expression);
      while (expression.length > 0) {
        expression = expression.trim();
        for (type in Twig2.expression.handler) {
          if (Object.hasOwnProperty.call(Twig2.expression.handler, type)) {
            tokenNext = Twig2.expression.handler[type].next;
            regex = Twig2.expression.handler[type].regex;
            Twig2.log.trace("Checking type ", type, " on ", expression);
            matchFound = false;
            if (Array.isArray(regex)) {
              regexI = regex.length;
              while (regexI-- > 0) {
                expression = expression.replace(regex[regexI], matchFunction);
              }
            } else {
              expression = expression.replace(regex, matchFunction);
            }
            if (matchFound) {
              break;
            }
          }
        }
        if (!matchFound) {
          if (invalidMatches.length > 0) {
            throw new Twig2.Error(invalidMatches.join(" OR "));
          } else {
            throw new Twig2.Error("Unable to parse '" + expression + "' at template position" + expOffset);
          }
        }
      }
      Twig2.log.trace("Twig.expression.tokenize", "Tokenized to ", tokens);
      return tokens;
    };
    Twig2.expression.compile = function(rawToken) {
      const tokens = Twig2.expression.tokenize(rawToken);
      let token = null;
      const output2 = [];
      const stack = [];
      let tokenTemplate = null;
      Twig2.log.trace("Twig.expression.compile: ", "Compiling ", rawToken.value);
      while (tokens.length > 0) {
        token = tokens.shift();
        tokenTemplate = Twig2.expression.handler[token.type];
        Twig2.log.trace("Twig.expression.compile: ", "Compiling ", token);
        tokenTemplate.compile(token, stack, output2);
        Twig2.log.trace("Twig.expression.compile: ", "Stack is", stack);
        Twig2.log.trace("Twig.expression.compile: ", "Output is", output2);
      }
      while (stack.length > 0) {
        output2.push(stack.pop());
      }
      Twig2.log.trace("Twig.expression.compile: ", "Final output is", output2);
      rawToken.stack = output2;
      delete rawToken.value;
      return rawToken;
    };
    Twig2.expression.parse = function(tokens, context, tokensAreParameters, allowAsync) {
      const state = this;
      if (!Array.isArray(tokens)) {
        tokens = [tokens];
      }
      const stack = [];
      const loopTokenFixups = [];
      const binaryOperator = Twig2.expression.type.operator.binary;
      return Twig2.async.potentiallyAsync(state, allowAsync, () => {
        return Twig2.async.forEach(tokens, (token, index) => {
          let tokenTemplate = null;
          let nextToken = null;
          let result;
          if (token.cleanup) {
            return;
          }
          if (tokens.length > index + 1) {
            nextToken = tokens[index + 1];
          }
          tokenTemplate = Twig2.expression.handler[token.type];
          if (tokenTemplate.parse) {
            result = tokenTemplate.parse.call(state, token, stack, context, nextToken);
          }
          if (token.type === binaryOperator && context.loop) {
            loopTokenFixups.push(token);
          }
          return result;
        }).then(() => {
          let len = loopTokenFixups.length;
          let loopTokenFixup = null;
          while (len-- > 0) {
            loopTokenFixup = loopTokenFixups[len];
            if (loopTokenFixup.params && loopTokenFixup.key) {
              delete loopTokenFixup.key;
            }
          }
          if (tokensAreParameters) {
            const params = stack.splice(0);
            stack.push(params);
          }
          return stack.pop();
        });
      });
    };
    return Twig2;
  };
  return twig_expression;
}
var twig_filters;
var hasRequiredTwig_filters;
function requireTwig_filters() {
  if (hasRequiredTwig_filters) return twig_filters;
  hasRequiredTwig_filters = 1;
  twig_filters = function(Twig2) {
    function is(type, obj) {
      const clas = Object.prototype.toString.call(obj).slice(8, -1);
      return obj !== void 0 && obj !== null && clas === type;
    }
    Twig2.filters = {
      // String Filters
      upper(value) {
        if (typeof value !== "string") {
          return value;
        }
        return value.toUpperCase();
      },
      lower(value) {
        if (typeof value !== "string") {
          return value;
        }
        return value.toLowerCase();
      },
      capitalize(value) {
        if (typeof value !== "string") {
          return value;
        }
        return value.slice(0, 1).toUpperCase() + value.toLowerCase().slice(1);
      },
      title(value) {
        if (typeof value !== "string") {
          return value;
        }
        return value.toLowerCase().replace(/(^|\s)([a-z])/g, (m, p1, p2) => {
          return p1 + p2.toUpperCase();
        });
      },
      length(value) {
        if (Twig2.lib.is("Array", value) || typeof value === "string") {
          return value.length;
        }
        if (Twig2.lib.is("Object", value)) {
          if (value._keys === void 0) {
            return Object.keys(value).length;
          }
          return value._keys.length;
        }
        return 0;
      },
      // Array/Object Filters
      reverse(value) {
        if (is("Array", value)) {
          return value.reverse();
        }
        if (is("String", value)) {
          return value.split("").reverse().join("");
        }
        if (is("Object", value)) {
          const keys = value._keys || Object.keys(value).reverse();
          value._keys = keys;
          return value;
        }
      },
      sort(value) {
        if (is("Array", value)) {
          return value.sort();
        }
        if (is("Object", value)) {
          delete value._keys;
          const keys = Object.keys(value);
          const sortedKeys = keys.sort((a, b) => {
            let a1;
            let b1;
            if (value[a] > value[b] === !(value[a] <= value[b])) {
              return value[a] > value[b] ? 1 : value[a] < value[b] ? -1 : 0;
            }
            if (!isNaN(a1 = parseFloat(value[a])) && !isNaN(b1 = parseFloat(value[b]))) {
              return a1 > b1 ? 1 : a1 < b1 ? -1 : 0;
            }
            if (typeof value[a] === "string") {
              return value[a] > value[b].toString() ? 1 : value[a] < value[b].toString() ? -1 : 0;
            }
            if (typeof value[b] === "string") {
              return value[a].toString() > value[b] ? 1 : value[a].toString() < value[b] ? -1 : 0;
            }
            return null;
          });
          value._keys = sortedKeys;
          return value;
        }
      },
      keys(value) {
        if (value === void 0 || value === null) {
          return;
        }
        const keyset = value._keys || Object.keys(value);
        const output2 = [];
        keyset.forEach((key2) => {
          if (key2 === "_keys") {
            return;
          }
          if (Object.hasOwnProperty.call(value, key2)) {
            output2.push(key2);
          }
        });
        return output2;
      },
      /* eslint-disable-next-line camelcase */
      url_encode(value) {
        if (value === void 0 || value === null) {
          return;
        }
        if (Twig2.lib.is("Object", value)) {
          const serialize = function(obj, prefix) {
            const result2 = [];
            const keyset = obj._keys || Object.keys(obj);
            keyset.forEach((key2) => {
              if (!Object.prototype.hasOwnProperty.call(obj, key2)) {
                return;
              }
              const resultKey = prefix ? prefix + "[" + key2 + "]" : key2;
              const resultValue = obj[key2];
              result2.push(
                Twig2.lib.is("Object", resultValue) || Array.isArray(resultValue) ? serialize(resultValue, resultKey) : encodeURIComponent(resultKey) + "=" + encodeURIComponent(resultValue)
              );
            });
            return result2.join("&amp;");
          };
          return serialize(value);
        }
        let result = encodeURIComponent(value);
        result = result.replace("'", "%27");
        return result;
      },
      join(value, params) {
        if (value === void 0 || value === null) {
          return;
        }
        let joinStr = "";
        let output2 = [];
        let keyset = null;
        if (params && params[0]) {
          joinStr = params[0];
        }
        if (is("Array", value)) {
          output2 = value;
        } else {
          keyset = value._keys || Object.keys(value);
          keyset.forEach((key2) => {
            if (key2 === "_keys") {
              return;
            }
            if (Object.hasOwnProperty.call(value, key2)) {
              output2.push(value[key2]);
            }
          });
        }
        return output2.join(joinStr);
      },
      default(value, params) {
        if (params !== void 0 && params.length > 1) {
          throw new Twig2.Error("default filter expects one argument");
        }
        if (value === void 0 || value === null || value === "") {
          if (params === void 0) {
            return "";
          }
          return params[0];
        }
        return value;
      },
      /* eslint-disable-next-line camelcase */
      json_encode(value) {
        if (value === void 0 || value === null) {
          return "null";
        }
        if (typeof value === "object" && is("Array", value)) {
          const output2 = [];
          value.forEach((v) => {
            output2.push(Twig2.filters.json_encode(v));
          });
          return "[" + output2.join(",") + "]";
        }
        if (typeof value === "object" && is("Date", value)) {
          return '"' + value.toISOString() + '"';
        }
        if (typeof value === "object") {
          const keyset = value._keys || Object.keys(value);
          const output2 = [];
          keyset.forEach((key2) => {
            output2.push(JSON.stringify(key2) + ":" + Twig2.filters.json_encode(value[key2]));
          });
          return "{" + output2.join(",") + "}";
        }
        return JSON.stringify(value);
      },
      merge(value, params) {
        let obj = [];
        let arrIndex = 0;
        let keyset = [];
        if (is("Array", value)) {
          params.forEach((param) => {
            if (!is("Array", param)) {
              obj = {};
            }
          });
        } else {
          obj = {};
        }
        if (!is("Array", obj)) {
          obj._keys = [];
        }
        if (is("Array", value)) {
          value.forEach((val) => {
            if (obj._keys) {
              obj._keys.push(arrIndex);
            }
            obj[arrIndex] = val;
            arrIndex++;
          });
        } else {
          keyset = value._keys || Object.keys(value);
          keyset.forEach((key2) => {
            obj[key2] = value[key2];
            obj._keys.push(key2);
            const intKey = parseInt(key2, 10);
            if (!isNaN(intKey) && intKey >= arrIndex) {
              arrIndex = intKey + 1;
            }
          });
        }
        params.forEach((param) => {
          if (is("Array", param)) {
            param.forEach((val) => {
              if (obj._keys) {
                obj._keys.push(arrIndex);
              }
              obj[arrIndex] = val;
              arrIndex++;
            });
          } else {
            keyset = param._keys || Object.keys(param);
            keyset.forEach((key2) => {
              if (!obj[key2]) {
                obj._keys.push(key2);
              }
              obj[key2] = param[key2];
              const intKey = parseInt(key2, 10);
              if (!isNaN(intKey) && intKey >= arrIndex) {
                arrIndex = intKey + 1;
              }
            });
          }
        });
        if (params.length === 0) {
          throw new Twig2.Error("Filter merge expects at least one parameter");
        }
        return obj;
      },
      date(value, params) {
        const date2 = Twig2.functions.date(value);
        const format = params && Boolean(params.length) ? params[0] : "F j, Y H:i";
        return Twig2.lib.date(format.replace(/\\\\/g, "\\"), date2);
      },
      /* eslint-disable-next-line camelcase */
      date_modify(value, params) {
        if (value === void 0 || value === null) {
          return;
        }
        if (params === void 0 || params.length !== 1) {
          throw new Twig2.Error("date_modify filter expects 1 argument");
        }
        const modifyText = params[0];
        let time;
        if (Twig2.lib.is("Date", value)) {
          time = Twig2.lib.strtotime(modifyText, value.getTime() / 1e3);
        }
        if (Twig2.lib.is("String", value)) {
          time = Twig2.lib.strtotime(modifyText, Twig2.lib.strtotime(value));
        }
        if (Twig2.lib.is("Number", value)) {
          time = Twig2.lib.strtotime(modifyText, value);
        }
        return new Date(time * 1e3);
      },
      replace(value, params) {
        if (value === void 0 || value === null) {
          return;
        }
        const pairs = params[0];
        let tag;
        for (tag in pairs) {
          if (Object.hasOwnProperty.call(pairs, tag) && tag !== "_keys") {
            value = Twig2.lib.replaceAll(value, tag, pairs[tag]);
          }
        }
        return value;
      },
      format(value, params) {
        if (value === void 0 || value === null) {
          return;
        }
        return Twig2.lib.vsprintf(value, params);
      },
      striptags(value, allowed) {
        if (value === void 0 || value === null) {
          return;
        }
        return Twig2.lib.stripTags(value, allowed);
      },
      escape(value, params) {
        if (value === void 0 || value === null || value === "") {
          return;
        }
        let strategy = "html";
        if (params && Boolean(params.length) && params[0] !== true) {
          strategy = params[0];
        }
        if (strategy === "html") {
          const rawValue = value.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
          return new Twig2.Markup(rawValue, "html");
        }
        if (strategy === "js") {
          const rawValue = value.toString();
          let result = "";
          for (let i = 0; i < rawValue.length; i++) {
            if (rawValue[i].match(/^[a-zA-Z0-9,._]$/)) {
              result += rawValue[i];
            } else {
              const char = rawValue.charAt(i);
              const charCode = rawValue.charCodeAt(i);
              const shortMap = {
                "\\": "\\\\",
                "/": "\\/",
                "\b": "\\b",
                "\f": "\\f",
                "\n": "\\n",
                "\r": "\\r",
                "	": "\\t"
              };
              if (shortMap[char]) {
                result += shortMap[char];
              } else {
                result += Twig2.lib.sprintf("\\u%04s", charCode.toString(16).toUpperCase());
              }
            }
          }
          return new Twig2.Markup(result, "js");
        }
        if (strategy === "css") {
          const rawValue = value.toString();
          let result = "";
          for (let i = 0; i < rawValue.length; i++) {
            if (rawValue[i].match(/^[a-zA-Z0-9]$/)) {
              result += rawValue[i];
            } else {
              const charCode = rawValue.charCodeAt(i);
              result += "\\" + charCode.toString(16).toUpperCase() + " ";
            }
          }
          return new Twig2.Markup(result, "css");
        }
        if (strategy === "url") {
          const result = Twig2.filters.url_encode(value);
          return new Twig2.Markup(result, "url");
        }
        if (strategy === "html_attr") {
          const rawValue = value.toString();
          let result = "";
          for (let i = 0; i < rawValue.length; i++) {
            if (rawValue[i].match(/^[a-zA-Z0-9,.\-_]$/)) {
              result += rawValue[i];
            } else if (rawValue[i].match(/^[&<>"]$/)) {
              result += rawValue[i].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
            } else {
              const charCode = rawValue.charCodeAt(i);
              if (charCode <= 31 && charCode !== 9 && charCode !== 10 && charCode !== 13) {
                result += "&#xFFFD;";
              } else if (charCode < 128) {
                result += Twig2.lib.sprintf("&#x%02s;", charCode.toString(16).toUpperCase());
              } else {
                result += Twig2.lib.sprintf("&#x%04s;", charCode.toString(16).toUpperCase());
              }
            }
          }
          return new Twig2.Markup(result, "html_attr");
        }
        throw new Twig2.Error("escape strategy unsupported");
      },
      /* Alias of escape */
      e(value, params) {
        return Twig2.filters.escape(value, params);
      },
      nl2br(value) {
        if (value === void 0 || value === null || value === "") {
          return;
        }
        const linebreakTag = "BACKSLASH_n_replace";
        const br = "<br />" + linebreakTag;
        value = Twig2.filters.escape(value).replace(/\r\n/g, br).replace(/\r/g, br).replace(/\n/g, br);
        value = Twig2.lib.replaceAll(value, linebreakTag, "\n");
        return new Twig2.Markup(value);
      },
      /**
       * Adapted from: http://phpjs.org/functions/number_format:481
       */
      /* eslint-disable-next-line camelcase */
      number_format(value, params) {
        let number = value;
        const decimals = params && params[0] ? params[0] : void 0;
        const dec = params && params[1] !== void 0 ? params[1] : ".";
        const sep = params && params[2] !== void 0 ? params[2] : ",";
        number = String(number).replace(/[^0-9+\-Ee.]/g, "");
        const n = isFinite(Number(number)) ? Number(number) : 0;
        const prec = isFinite(Number(decimals)) ? Math.abs(decimals) : 0;
        let s = "";
        const toFixedFix = function(n2, prec2) {
          const k = 10 ** prec2;
          return String(Math.round(n2 * k) / k);
        };
        s = (prec ? toFixedFix(n, prec) : String(Math.round(n))).split(".");
        if (s[0].length > 3) {
          s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || "").length < prec) {
          s[1] = s[1] || "";
          s[1] += new Array(prec - s[1].length + 1).join("0");
        }
        return s.join(dec);
      },
      trim(value, params) {
        if (value === void 0 || value === null) {
          return;
        }
        let str = String(value);
        let whitespace;
        if (params && params[0]) {
          whitespace = String(params[0]);
        } else {
          whitespace = " \n\r	\f\v            ​\u2028\u2029　";
        }
        for (let i = 0; i < str.length; i++) {
          if (!whitespace.includes(str.charAt(i))) {
            str = str.slice(Math.max(0, i));
            break;
          }
        }
        for (let i = str.length - 1; i >= 0; i--) {
          if (!whitespace.includes(str.charAt(i))) {
            str = str.slice(0, Math.max(0, i + 1));
            break;
          }
        }
        return whitespace.includes(str.charAt(0)) ? "" : str;
      },
      truncate(value, params) {
        let length = 30;
        let preserve = false;
        let separator = "...";
        value = String(value);
        if (params) {
          if (params[0]) {
            length = params[0];
          }
          if (params[1]) {
            preserve = params[1];
          }
          if (params[2]) {
            separator = params[2];
          }
        }
        if (value.length > length) {
          if (preserve) {
            length = value.indexOf(" ", length);
            if (length === -1) {
              return value;
            }
          }
          value = value.slice(0, length) + separator;
        }
        return value;
      },
      slice(value, params) {
        if (value === void 0 || value === null) {
          return;
        }
        if (params === void 0 || params.length === 0) {
          throw new Twig2.Error("slice filter expects at least 1 argument");
        }
        const start = params[0] || 0;
        let length = params.length > 1 ? params[1] : value.length;
        const startIndex = start >= 0 ? start : Math.max(value.length + start, 0);
        if (length < 0) {
          length = value.length - startIndex + length;
        }
        if (Twig2.lib.is("Array", value)) {
          const output2 = [];
          for (let i = startIndex; i < startIndex + length && i < value.length; i++) {
            output2.push(value[i]);
          }
          return output2;
        }
        if (Twig2.lib.is("String", value)) {
          return value.slice(startIndex, startIndex + length);
        }
        throw new Twig2.Error("slice filter expects value to be an array or string");
      },
      abs(value) {
        if (value === void 0 || value === null) {
          return;
        }
        return Math.abs(value);
      },
      first(value) {
        if (is("Array", value)) {
          return value[0];
        }
        if (is("Object", value)) {
          if ("_keys" in value) {
            return value[value._keys[0]];
          }
        } else if (typeof value === "string") {
          return value.slice(0, 1);
        }
      },
      split(value, params) {
        if (value === void 0 || value === null) {
          return;
        }
        if (params === void 0 || params.length === 0 || params.length > 2) {
          throw new Twig2.Error("split filter expects 1 or 2 argument");
        }
        if (Twig2.lib.is("String", value)) {
          const delimiter = params[0];
          const limit = params[1];
          const split = value.split(delimiter);
          if (limit === void 0) {
            return split;
          }
          if (limit < 0) {
            return value.split(delimiter, split.length + limit);
          }
          const limitedSplit = [];
          if (delimiter === "") {
            while (split.length > 0) {
              let temp = "";
              for (let i = 0; i < limit && split.length > 0; i++) {
                temp += split.shift();
              }
              limitedSplit.push(temp);
            }
          } else {
            for (let i = 0; i < limit - 1 && split.length > 0; i++) {
              limitedSplit.push(split.shift());
            }
            if (split.length > 0) {
              limitedSplit.push(split.join(delimiter));
            }
          }
          return limitedSplit;
        }
        throw new Twig2.Error("split filter expects value to be a string");
      },
      last(value) {
        if (Twig2.lib.is("Object", value)) {
          let keys;
          if (value._keys === void 0) {
            keys = Object.keys(value);
          } else {
            keys = value._keys;
          }
          return value[keys[keys.length - 1]];
        }
        if (Twig2.lib.is("Number", value)) {
          return value.toString().slice(-1);
        }
        return value[value.length - 1];
      },
      raw(value) {
        return new Twig2.Markup(value || "");
      },
      batch(items, params) {
        let size = params.shift();
        const fill = params.shift();
        let last;
        let missing;
        if (!Twig2.lib.is("Array", items)) {
          throw new Twig2.Error("batch filter expects items to be an array");
        }
        if (!Twig2.lib.is("Number", size)) {
          throw new Twig2.Error("batch filter expects size to be a number");
        }
        size = Math.ceil(size);
        const result = Twig2.lib.chunkArray(items, size);
        if (fill && items.length % size !== 0) {
          last = result.pop();
          missing = size - last.length;
          while (missing--) {
            last.push(fill);
          }
          result.push(last);
        }
        return result;
      },
      round(value, params) {
        params = params || [];
        const precision = params.length > 0 ? params[0] : 0;
        const method = params.length > 1 ? params[1] : "common";
        value = parseFloat(value);
        if (precision && !Twig2.lib.is("Number", precision)) {
          throw new Twig2.Error("round filter expects precision to be a number");
        }
        if (method === "common") {
          return Twig2.lib.round(value, precision);
        }
        if (!Twig2.lib.is("Function", Math[method])) {
          throw new Twig2.Error("round filter expects method to be 'floor', 'ceil', or 'common'");
        }
        return Math[method](value * 10 ** precision) / 10 ** precision;
      },
      spaceless(value) {
        return value.replace(/>\s+</g, "><").trim();
      }
    };
    Twig2.filter = function(filter, value, params) {
      const state = this;
      if (!Twig2.filters[filter]) {
        throw new Twig2.Error("Unable to find filter " + filter);
      }
      return Twig2.filters[filter].call(state, value, params);
    };
    Twig2.filter.extend = function(filter, definition) {
      Twig2.filters[filter] = definition;
    };
    return Twig2;
  };
  return twig_filters;
}
var twig_functions = { exports: {} };
var hasRequiredTwig_functions;
function requireTwig_functions() {
  if (hasRequiredTwig_functions) return twig_functions.exports;
  hasRequiredTwig_functions = 1;
  (function(module) {
    module.exports = function(Twig2) {
      const TEMPLATE_NOT_FOUND_MESSAGE = 'Template "{name}" is not defined.';
      Twig2.functions = {
        //  Attribute, block, constant, date, dump, parent, random,.
        // Range function from http://phpjs.org/functions/range:499
        // Used under an MIT License
        range(low, high, step) {
          const matrix = [];
          let inival;
          let endval;
          const walker = step || 1;
          let chars = false;
          if (!isNaN(low) && !isNaN(high)) {
            inival = parseInt(low, 10);
            endval = parseInt(high, 10);
          } else if (isNaN(low) && isNaN(high)) {
            chars = true;
            inival = low.charCodeAt(0);
            endval = high.charCodeAt(0);
          } else {
            inival = isNaN(low) ? 0 : low;
            endval = isNaN(high) ? 0 : high;
          }
          const plus = !(inival > endval);
          if (plus) {
            while (inival <= endval) {
              matrix.push(chars ? String.fromCharCode(inival) : inival);
              inival += walker;
            }
          } else {
            while (inival >= endval) {
              matrix.push(chars ? String.fromCharCode(inival) : inival);
              inival -= walker;
            }
          }
          return matrix;
        },
        cycle(arr, i) {
          const pos = i % arr.length;
          return arr[pos];
        },
        dump(...args) {
          const argsCopy = [...args];
          const state = this;
          const EOL = "\n";
          const indentChar = "  ";
          let indentTimes = 0;
          let out = "";
          const indent = function(times) {
            let ind = "";
            while (times > 0) {
              times--;
              ind += indentChar;
            }
            return ind;
          };
          const displayVar = function(variable) {
            out += indent(indentTimes);
            if (typeof variable === "object") {
              dumpVar(variable);
            } else if (typeof variable === "function") {
              out += "function()" + EOL;
            } else if (typeof variable === "string") {
              out += "string(" + variable.length + ') "' + variable + '"' + EOL;
            } else if (typeof variable === "number") {
              out += "number(" + variable + ")" + EOL;
            } else if (typeof variable === "boolean") {
              out += "bool(" + variable + ")" + EOL;
            }
          };
          const dumpVar = function(variable) {
            let i;
            if (variable === null) {
              out += "NULL" + EOL;
            } else if (variable === void 0) {
              out += "undefined" + EOL;
            } else if (typeof variable === "object") {
              out += indent(indentTimes) + typeof variable;
              indentTimes++;
              out += "(" + function(obj) {
                let size = 0;
                let key2;
                for (key2 in obj) {
                  if (Object.hasOwnProperty.call(obj, key2)) {
                    size++;
                  }
                }
                return size;
              }(variable) + ") {" + EOL;
              for (i in variable) {
                if (Object.hasOwnProperty.call(variable, i)) {
                  out += indent(indentTimes) + "[" + i + "]=> " + EOL;
                  displayVar(variable[i]);
                }
              }
              indentTimes--;
              out += indent(indentTimes) + "}" + EOL;
            } else {
              displayVar(variable);
            }
          };
          if (argsCopy.length === 0) {
            argsCopy.push(state.context);
          }
          argsCopy.forEach((variable) => {
            dumpVar(variable);
          });
          return out;
        },
        date(date2) {
          let dateObj;
          if (date2 === void 0 || date2 === null || date2 === "") {
            dateObj = /* @__PURE__ */ new Date();
          } else if (Twig2.lib.is("Date", date2)) {
            dateObj = date2;
          } else if (Twig2.lib.is("String", date2)) {
            if (date2.match(/^\d+$/)) {
              dateObj = new Date(date2 * 1e3);
            } else {
              dateObj = new Date(Twig2.lib.strtotime(date2) * 1e3);
            }
          } else if (Twig2.lib.is("Number", date2)) {
            dateObj = new Date(date2 * 1e3);
          } else {
            throw new Twig2.Error("Unable to parse date " + date2);
          }
          return dateObj;
        },
        block(blockName) {
          const state = this;
          const block = state.getBlock(blockName);
          if (block !== void 0) {
            return block.render(state, state.context);
          }
        },
        parent() {
          const state = this;
          return state.getBlock(state.getNestingStackToken(Twig2.logic.type.block).blockName, true).render(state, state.context);
        },
        attribute(object, method, params) {
          if (Twig2.lib.is("Object", object)) {
            if (Object.hasOwnProperty.call(object, method)) {
              if (typeof object[method] === "function") {
                return object[method].apply(void 0, params);
              }
              return object[method];
            }
          }
          return object ? object[method] || void 0 : void 0;
        },
        max(values, ...args) {
          if (Twig2.lib.is("Object", values)) {
            delete values._keys;
            return Twig2.lib.max(values);
          }
          return Reflect.apply(Twig2.lib.max, null, [values, ...args]);
        },
        min(values, ...args) {
          if (Twig2.lib.is("Object", values)) {
            delete values._keys;
            return Twig2.lib.min(values);
          }
          return Reflect.apply(Twig2.lib.min, null, [values, ...args]);
        },
        /* eslint-disable-next-line camelcase */
        template_from_string(template) {
          const state = this;
          if (template === void 0) {
            template = "";
          }
          return Twig2.Templates.parsers.twig({
            options: state.template.options,
            data: template
          });
        },
        random(value) {
          const LIMIT_INT31 = 2147483648;
          function getRandomNumber(n) {
            const random = Math.floor(Math.random() * LIMIT_INT31);
            const min2 = Math.min.call(null, 0, n);
            const max2 = Math.max.call(null, 0, n);
            return min2 + Math.floor((max2 - min2 + 1) * random / LIMIT_INT31);
          }
          if (Twig2.lib.is("Number", value)) {
            return getRandomNumber(value);
          }
          if (Twig2.lib.is("String", value)) {
            return value.charAt(getRandomNumber(value.length - 1));
          }
          if (Twig2.lib.is("Array", value)) {
            return value[getRandomNumber(value.length - 1)];
          }
          if (Twig2.lib.is("Object", value)) {
            const keys = Object.keys(value);
            return value[keys[getRandomNumber(keys.length - 1)]];
          }
          return getRandomNumber(LIMIT_INT31 - 1);
        },
        /**
         * Returns the content of a template without rendering it
         * @param {string} name
         * @param {boolean} [ignoreMissing=false]
         * @returns {string}
         */
        source(name, ignoreMissing) {
          const state = this;
          const { namespaces } = state.template.options;
          let templateSource;
          let templateFound = false;
          const isNodeEnvironment = typeof window === "undefined";
          let loader;
          let path = name;
          if (namespaces && typeof namespaces === "object") {
            path = Twig2.path.expandNamespace(namespaces, path);
          }
          if (isNodeEnvironment) {
            loader = "fs";
          } else {
            loader = "ajax";
          }
          const params = {
            id: name,
            path,
            method: loader,
            parser: "source",
            async: false,
            fetchTemplateSource: true
          };
          if (typeof ignoreMissing === "undefined") {
            ignoreMissing = false;
          }
          try {
            templateSource = Twig2.Templates.loadRemote(name, params);
            if (typeof templateSource === "undefined" || templateSource === null) {
              templateSource = "";
            } else {
              templateFound = true;
            }
          } catch (error) {
            Twig2.log.debug("Twig.functions.source: ", "Problem loading template  ", error);
          }
          if (!templateFound && !ignoreMissing) {
            return TEMPLATE_NOT_FOUND_MESSAGE.replace("{name}", name);
          }
          return templateSource;
        }
      };
      Twig2._function = function(_function, value, params) {
        if (!Twig2.functions[_function]) {
          throw new Twig2.Error("Unable to find function " + _function);
        }
        return Twig2.functions[_function](value, params);
      };
      Twig2._function.extend = function(_function, definition) {
        Twig2.functions[_function] = definition;
      };
      return Twig2;
    };
  })(twig_functions);
  return twig_functions.exports;
}
var sprintf;
var hasRequiredSprintf;
function requireSprintf() {
  if (hasRequiredSprintf) return sprintf;
  hasRequiredSprintf = 1;
  sprintf = function sprintf2() {
    var regex = /%%|%(?:(\d+)\$)?((?:[-+#0 ]|'[\s\S])*)(\d+)?(?:\.(\d*))?([\s\S])/g;
    var args = arguments;
    var i = 0;
    var format = args[i++];
    var _pad = function _pad2(str, len, chr, leftJustify) {
      if (!chr) {
        chr = " ";
      }
      var padding = str.length >= len ? "" : new Array(1 + len - str.length >>> 0).join(chr);
      return leftJustify ? str + padding : padding + str;
    };
    var justify = function justify2(value, prefix, leftJustify, minWidth, padChar) {
      var diff = minWidth - value.length;
      if (diff > 0) {
        if (!leftJustify && padChar === "0") {
          value = [value.slice(0, prefix.length), _pad("", diff, "0", true), value.slice(prefix.length)].join("");
        } else {
          value = _pad(value, minWidth, padChar, leftJustify);
        }
      }
      return value;
    };
    var _formatBaseX = function _formatBaseX2(value, base, leftJustify, minWidth, precision, padChar) {
      var number = value >>> 0;
      value = _pad(number.toString(base), precision || 0, "0", false);
      return justify(value, "", leftJustify, minWidth, padChar);
    };
    var _formatString = function _formatString2(value, leftJustify, minWidth, precision, customPadChar) {
      if (precision !== null && precision !== void 0) {
        value = value.slice(0, precision);
      }
      return justify(value, "", leftJustify, minWidth, customPadChar);
    };
    var doFormat = function doFormat2(substring, argIndex, modifiers, minWidth, precision, specifier) {
      var number = void 0, prefix = void 0, method = void 0, textTransform = void 0, value = void 0;
      if (substring === "%%") {
        return "%";
      }
      var padChar = " ";
      var leftJustify = false;
      var positiveNumberPrefix = "";
      var j = void 0, l = void 0;
      for (j = 0, l = modifiers.length; j < l; j++) {
        switch (modifiers.charAt(j)) {
          case " ":
          case "0":
            padChar = modifiers.charAt(j);
            break;
          case "+":
            positiveNumberPrefix = "+";
            break;
          case "-":
            leftJustify = true;
            break;
          case "'":
            if (j + 1 < l) {
              padChar = modifiers.charAt(j + 1);
              j++;
            }
            break;
        }
      }
      if (!minWidth) {
        minWidth = 0;
      } else {
        minWidth = +minWidth;
      }
      if (!isFinite(minWidth)) {
        throw new Error("Width must be finite");
      }
      if (!precision) {
        precision = specifier === "d" ? 0 : "fFeE".indexOf(specifier) > -1 ? 6 : void 0;
      } else {
        precision = +precision;
      }
      if (argIndex && +argIndex === 0) {
        throw new Error("Argument number must be greater than zero");
      }
      if (argIndex && +argIndex >= args.length) {
        throw new Error("Too few arguments");
      }
      value = argIndex ? args[+argIndex] : args[i++];
      switch (specifier) {
        case "%":
          return "%";
        case "s":
          return _formatString(value + "", leftJustify, minWidth, precision, padChar);
        case "c":
          return _formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, padChar);
        case "b":
          return _formatBaseX(value, 2, leftJustify, minWidth, precision, padChar);
        case "o":
          return _formatBaseX(value, 8, leftJustify, minWidth, precision, padChar);
        case "x":
          return _formatBaseX(value, 16, leftJustify, minWidth, precision, padChar);
        case "X":
          return _formatBaseX(value, 16, leftJustify, minWidth, precision, padChar).toUpperCase();
        case "u":
          return _formatBaseX(value, 10, leftJustify, minWidth, precision, padChar);
        case "i":
        case "d":
          number = +value || 0;
          number = Math.round(number - number % 1);
          prefix = number < 0 ? "-" : positiveNumberPrefix;
          value = prefix + _pad(String(Math.abs(number)), precision, "0", false);
          if (leftJustify && padChar === "0") {
            padChar = " ";
          }
          return justify(value, prefix, leftJustify, minWidth, padChar);
        case "e":
        case "E":
        case "f":
        case "F":
        case "g":
        case "G":
          number = +value;
          prefix = number < 0 ? "-" : positiveNumberPrefix;
          method = ["toExponential", "toFixed", "toPrecision"]["efg".indexOf(specifier.toLowerCase())];
          textTransform = ["toString", "toUpperCase"]["eEfFgG".indexOf(specifier) % 2];
          value = prefix + Math.abs(number)[method](precision);
          return justify(value, prefix, leftJustify, minWidth, padChar)[textTransform]();
        default:
          return "";
      }
    };
    try {
      return format.replace(regex, doFormat);
    } catch (err) {
      return false;
    }
  };
  return sprintf;
}
var vsprintf;
var hasRequiredVsprintf;
function requireVsprintf() {
  if (hasRequiredVsprintf) return vsprintf;
  hasRequiredVsprintf = 1;
  vsprintf = function vsprintf2(format, args) {
    var sprintf2 = requireSprintf();
    return sprintf2.apply(this, [format].concat(args));
  };
  return vsprintf;
}
var _php_cast_int;
var hasRequired_php_cast_int;
function require_php_cast_int() {
  if (hasRequired_php_cast_int) return _php_cast_int;
  hasRequired_php_cast_int = 1;
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };
  _php_cast_int = function _php_cast_int2(value) {
    var type = typeof value === "undefined" ? "undefined" : _typeof(value);
    switch (type) {
      case "number":
        if (isNaN(value) || !isFinite(value)) {
          return 0;
        }
        return value < 0 ? Math.ceil(value) : Math.floor(value);
      case "string":
        return parseInt(value, 10) || 0;
      case "boolean":
      default:
        return +!!value;
    }
  };
  return _php_cast_int;
}
var _php_cast_float;
var hasRequired_php_cast_float;
function require_php_cast_float() {
  if (hasRequired_php_cast_float) return _php_cast_float;
  hasRequired_php_cast_float = 1;
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };
  _php_cast_float = function _php_cast_float2(value) {
    var type = typeof value === "undefined" ? "undefined" : _typeof(value);
    switch (type) {
      case "number":
        return value;
      case "string":
        return parseFloat(value) || 0;
      case "boolean":
      default:
        return require_php_cast_int()(value);
    }
  };
  return _php_cast_float;
}
var round;
var hasRequiredRound;
function requireRound() {
  if (hasRequiredRound) return round;
  hasRequiredRound = 1;
  function roundToInt(value, mode) {
    var tmp = Math.floor(Math.abs(value) + 0.5);
    if (mode === "PHP_ROUND_HALF_DOWN" && value === tmp - 0.5 || mode === "PHP_ROUND_HALF_EVEN" && value === 0.5 + 2 * Math.floor(tmp / 2) || mode === "PHP_ROUND_HALF_ODD" && value === 0.5 + 2 * Math.floor(tmp / 2) - 1) {
      tmp -= 1;
    }
    return value < 0 ? -tmp : tmp;
  }
  round = function round2(value) {
    var precision = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    var mode = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "PHP_ROUND_HALF_UP";
    var floatCast = require_php_cast_float();
    var intCast = require_php_cast_int();
    var p = void 0;
    value = floatCast(value);
    precision = intCast(precision);
    p = Math.pow(10, precision);
    if (isNaN(value) || !isFinite(value)) {
      return value;
    }
    if (Math.trunc(value) === value && precision >= 0) {
      return value;
    }
    var preRoundPrecision = 14 - Math.floor(Math.log10(Math.abs(value)));
    if (preRoundPrecision > precision && preRoundPrecision - 15 < precision) {
      value = roundToInt(value * Math.pow(10, preRoundPrecision), mode);
      value /= Math.pow(10, Math.abs(precision - preRoundPrecision));
    } else {
      value *= p;
    }
    value = roundToInt(value, mode);
    return value / p;
  };
  return round;
}
var max;
var hasRequiredMax;
function requireMax() {
  if (hasRequiredMax) return max;
  hasRequiredMax = 1;
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };
  max = function max2() {
    var ar = void 0;
    var retVal = void 0;
    var i = 0;
    var n = 0;
    var argv = arguments;
    var argc = argv.length;
    var _obj2Array = function _obj2Array2(obj) {
      if (Object.prototype.toString.call(obj) === "[object Array]") {
        return obj;
      } else {
        var _ar = [];
        for (var _i in obj) {
          if (obj.hasOwnProperty(_i)) {
            _ar.push(obj[_i]);
          }
        }
        return _ar;
      }
    };
    var _compare = function _compare2(current, next) {
      var i2 = 0;
      var n2 = 0;
      var tmp = 0;
      var nl = 0;
      var cl = 0;
      if (current === next) {
        return 0;
      } else if ((typeof current === "undefined" ? "undefined" : _typeof(current)) === "object") {
        if ((typeof next === "undefined" ? "undefined" : _typeof(next)) === "object") {
          current = _obj2Array(current);
          next = _obj2Array(next);
          cl = current.length;
          nl = next.length;
          if (nl > cl) {
            return 1;
          } else if (nl < cl) {
            return -1;
          }
          for (i2 = 0, n2 = cl; i2 < n2; ++i2) {
            tmp = _compare2(current[i2], next[i2]);
            if (tmp === 1) {
              return 1;
            } else if (tmp === -1) {
              return -1;
            }
          }
          return 0;
        }
        return -1;
      } else if ((typeof next === "undefined" ? "undefined" : _typeof(next)) === "object") {
        return 1;
      } else if (isNaN(next) && !isNaN(current)) {
        if (current === 0) {
          return 0;
        }
        return current < 0 ? 1 : -1;
      } else if (isNaN(current) && !isNaN(next)) {
        if (next === 0) {
          return 0;
        }
        return next > 0 ? 1 : -1;
      }
      if (next === current) {
        return 0;
      }
      return next > current ? 1 : -1;
    };
    if (argc === 0) {
      throw new Error("At least one value should be passed to max()");
    } else if (argc === 1) {
      if (_typeof(argv[0]) === "object") {
        ar = _obj2Array(argv[0]);
      } else {
        throw new Error("Wrong parameter count for max()");
      }
      if (ar.length === 0) {
        throw new Error("Array must contain at least one element for max()");
      }
    } else {
      ar = argv;
    }
    retVal = ar[0];
    for (i = 1, n = ar.length; i < n; ++i) {
      if (_compare(retVal, ar[i]) === 1) {
        retVal = ar[i];
      }
    }
    return retVal;
  };
  return max;
}
var min;
var hasRequiredMin;
function requireMin() {
  if (hasRequiredMin) return min;
  hasRequiredMin = 1;
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };
  min = function min2() {
    var ar = void 0;
    var retVal = void 0;
    var i = 0;
    var n = 0;
    var argv = arguments;
    var argc = argv.length;
    var _obj2Array = function _obj2Array2(obj) {
      if (Object.prototype.toString.call(obj) === "[object Array]") {
        return obj;
      }
      var ar2 = [];
      for (var _i in obj) {
        if (obj.hasOwnProperty(_i)) {
          ar2.push(obj[_i]);
        }
      }
      return ar2;
    };
    var _compare = function _compare2(current, next) {
      var i2 = 0;
      var n2 = 0;
      var tmp = 0;
      var nl = 0;
      var cl = 0;
      if (current === next) {
        return 0;
      } else if ((typeof current === "undefined" ? "undefined" : _typeof(current)) === "object") {
        if ((typeof next === "undefined" ? "undefined" : _typeof(next)) === "object") {
          current = _obj2Array(current);
          next = _obj2Array(next);
          cl = current.length;
          nl = next.length;
          if (nl > cl) {
            return 1;
          } else if (nl < cl) {
            return -1;
          }
          for (i2 = 0, n2 = cl; i2 < n2; ++i2) {
            tmp = _compare2(current[i2], next[i2]);
            if (tmp === 1) {
              return 1;
            } else if (tmp === -1) {
              return -1;
            }
          }
          return 0;
        }
        return -1;
      } else if ((typeof next === "undefined" ? "undefined" : _typeof(next)) === "object") {
        return 1;
      } else if (isNaN(next) && !isNaN(current)) {
        if (current === 0) {
          return 0;
        }
        return current < 0 ? 1 : -1;
      } else if (isNaN(current) && !isNaN(next)) {
        if (next === 0) {
          return 0;
        }
        return next > 0 ? 1 : -1;
      }
      if (next === current) {
        return 0;
      }
      return next > current ? 1 : -1;
    };
    if (argc === 0) {
      throw new Error("At least one value should be passed to min()");
    } else if (argc === 1) {
      if (_typeof(argv[0]) === "object") {
        ar = _obj2Array(argv[0]);
      } else {
        throw new Error("Wrong parameter count for min()");
      }
      if (ar.length === 0) {
        throw new Error("Array must contain at least one element for min()");
      }
    } else {
      ar = argv;
    }
    retVal = ar[0];
    for (i = 1, n = ar.length; i < n; ++i) {
      if (_compare(retVal, ar[i]) === -1) {
        retVal = ar[i];
      }
    }
    return retVal;
  };
  return min;
}
var _phpCastString;
var hasRequired_phpCastString;
function require_phpCastString() {
  if (hasRequired_phpCastString) return _phpCastString;
  hasRequired_phpCastString = 1;
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };
  _phpCastString = function _phpCastString2(value) {
    var type = typeof value === "undefined" ? "undefined" : _typeof(value);
    switch (type) {
      case "boolean":
        return value ? "1" : "";
      case "string":
        return value;
      case "number":
        if (isNaN(value)) {
          return "NAN";
        }
        if (!isFinite(value)) {
          return (value < 0 ? "-" : "") + "INF";
        }
        return value + "";
      case "undefined":
        return "";
      case "object":
        if (Array.isArray(value)) {
          return "Array";
        }
        if (value !== null) {
          return "Object";
        }
        return "";
      case "function":
      default:
        throw new Error("Unsupported value type");
    }
  };
  return _phpCastString;
}
var strip_tags;
var hasRequiredStrip_tags;
function requireStrip_tags() {
  if (hasRequiredStrip_tags) return strip_tags;
  hasRequiredStrip_tags = 1;
  strip_tags = function strip_tags2(input, allowed) {
    var _phpCastString2 = require_phpCastString();
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join("");
    var tags = /<\/?([a-z0-9]*)\b[^>]*>?/gi;
    var commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    var after = _phpCastString2(input);
    after = after.substring(after.length - 1) === "<" ? after.substring(0, after.length - 1) : after;
    while (true) {
      var before = after;
      after = before.replace(commentsAndPhpTags, "").replace(tags, function($0, $1) {
        return allowed.indexOf("<" + $1.toLowerCase() + ">") > -1 ? $0 : "";
      });
      if (before === after) {
        return after;
      }
    }
  };
  return strip_tags;
}
var strtotime;
var hasRequiredStrtotime;
function requireStrtotime() {
  if (hasRequiredStrtotime) return strtotime;
  hasRequiredStrtotime = 1;
  var reSpace = "[ \\t]+";
  var reSpaceOpt = "[ \\t]*";
  var reMeridian = "(?:([ap])\\.?m\\.?([\\t ]|$))";
  var reHour24 = "(2[0-4]|[01]?[0-9])";
  var reHour24lz = "([01][0-9]|2[0-4])";
  var reHour12 = "(0?[1-9]|1[0-2])";
  var reMinute = "([0-5]?[0-9])";
  var reMinutelz = "([0-5][0-9])";
  var reSecond = "(60|[0-5]?[0-9])";
  var reSecondlz = "(60|[0-5][0-9])";
  var reFrac = "(?:\\.([0-9]+))";
  var reDayfull = "sunday|monday|tuesday|wednesday|thursday|friday|saturday";
  var reDayabbr = "sun|mon|tue|wed|thu|fri|sat";
  var reDaytext = reDayfull + "|" + reDayabbr + "|weekdays?";
  var reReltextnumber = "first|second|third|fourth|fifth|sixth|seventh|eighth?|ninth|tenth|eleventh|twelfth";
  var reReltexttext = "next|last|previous|this";
  var reReltextunit = "(?:second|sec|minute|min|hour|day|fortnight|forthnight|month|year)s?|weeks|" + reDaytext;
  var reYear = "([0-9]{1,4})";
  var reYear2 = "([0-9]{2})";
  var reYear4 = "([0-9]{4})";
  var reYear4withSign = "([+-]?[0-9]{4})";
  var reMonth = "(1[0-2]|0?[0-9])";
  var reMonthlz = "(0[0-9]|1[0-2])";
  var reDay = "(?:(3[01]|[0-2]?[0-9])(?:st|nd|rd|th)?)";
  var reDaylz = "(0[0-9]|[1-2][0-9]|3[01])";
  var reMonthFull = "january|february|march|april|may|june|july|august|september|october|november|december";
  var reMonthAbbr = "jan|feb|mar|apr|may|jun|jul|aug|sept?|oct|nov|dec";
  var reMonthroman = "i[vx]|vi{0,3}|xi{0,2}|i{1,3}";
  var reMonthText = "(" + reMonthFull + "|" + reMonthAbbr + "|" + reMonthroman + ")";
  var reTzCorrection = "((?:GMT)?([+-])" + reHour24 + ":?" + reMinute + "?)";
  var reTzAbbr = "\\(?([a-zA-Z]{1,6})\\)?";
  var reDayOfYear = "(00[1-9]|0[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6])";
  var reWeekOfYear = "(0[1-9]|[1-4][0-9]|5[0-3])";
  var reDateNoYear = reMonthText + "[ .\\t-]*" + reDay + "[,.stndrh\\t ]*";
  function processMeridian(hour, meridian) {
    meridian = meridian && meridian.toLowerCase();
    switch (meridian) {
      case "a":
        hour += hour === 12 ? -12 : 0;
        break;
      case "p":
        hour += hour !== 12 ? 12 : 0;
        break;
    }
    return hour;
  }
  function processYear(yearStr) {
    var year = +yearStr;
    if (yearStr.length < 4 && year < 100) {
      year += year < 70 ? 2e3 : 1900;
    }
    return year;
  }
  function lookupMonth(monthStr) {
    return {
      jan: 0,
      january: 0,
      i: 0,
      feb: 1,
      february: 1,
      ii: 1,
      mar: 2,
      march: 2,
      iii: 2,
      apr: 3,
      april: 3,
      iv: 3,
      may: 4,
      v: 4,
      jun: 5,
      june: 5,
      vi: 5,
      jul: 6,
      july: 6,
      vii: 6,
      aug: 7,
      august: 7,
      viii: 7,
      sep: 8,
      sept: 8,
      september: 8,
      ix: 8,
      oct: 9,
      october: 9,
      x: 9,
      nov: 10,
      november: 10,
      xi: 10,
      dec: 11,
      december: 11,
      xii: 11
    }[monthStr.toLowerCase()];
  }
  function lookupWeekday(dayStr) {
    var desiredSundayNumber = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    var dayNumbers = {
      mon: 1,
      monday: 1,
      tue: 2,
      tuesday: 2,
      wed: 3,
      wednesday: 3,
      thu: 4,
      thursday: 4,
      fri: 5,
      friday: 5,
      sat: 6,
      saturday: 6,
      sun: 0,
      sunday: 0
    };
    return dayNumbers[dayStr.toLowerCase()] || desiredSundayNumber;
  }
  function lookupRelative(relText) {
    var relativeNumbers = {
      last: -1,
      previous: -1,
      this: 0,
      first: 1,
      next: 1,
      second: 2,
      third: 3,
      fourth: 4,
      fifth: 5,
      sixth: 6,
      seventh: 7,
      eight: 8,
      eighth: 8,
      ninth: 9,
      tenth: 10,
      eleventh: 11,
      twelfth: 12
    };
    var relativeBehavior = {
      this: 1
    };
    var relTextLower = relText.toLowerCase();
    return {
      amount: relativeNumbers[relTextLower],
      behavior: relativeBehavior[relTextLower] || 0
    };
  }
  function processTzCorrection(tzOffset, oldValue) {
    var reTzCorrectionLoose = /(?:GMT)?([+-])(\d+)(:?)(\d{0,2})/i;
    tzOffset = tzOffset && tzOffset.match(reTzCorrectionLoose);
    if (!tzOffset) {
      return oldValue;
    }
    var sign = tzOffset[1] === "-" ? -1 : 1;
    var hours = +tzOffset[2];
    var minutes = +tzOffset[4];
    if (!tzOffset[4] && !tzOffset[3]) {
      minutes = Math.floor(hours % 100);
      hours = Math.floor(hours / 100);
    }
    return sign * (hours * 60 + minutes) * 60;
  }
  var tzAbbrOffsets = {
    acdt: 37800,
    acst: 34200,
    addt: -7200,
    adt: -10800,
    aedt: 39600,
    aest: 36e3,
    ahdt: -32400,
    ahst: -36e3,
    akdt: -28800,
    akst: -32400,
    amt: -13840,
    apt: -10800,
    ast: -14400,
    awdt: 32400,
    awst: 28800,
    awt: -10800,
    bdst: 7200,
    bdt: -36e3,
    bmt: -14309,
    bst: 3600,
    cast: 34200,
    cat: 7200,
    cddt: -14400,
    cdt: -18e3,
    cemt: 10800,
    cest: 7200,
    cet: 3600,
    cmt: -15408,
    cpt: -18e3,
    cst: -21600,
    cwt: -18e3,
    chst: 36e3,
    dmt: -1521,
    eat: 10800,
    eddt: -10800,
    edt: -14400,
    eest: 10800,
    eet: 7200,
    emt: -26248,
    ept: -14400,
    est: -18e3,
    ewt: -14400,
    ffmt: -14660,
    fmt: -4056,
    gdt: 39600,
    gmt: 0,
    gst: 36e3,
    hdt: -34200,
    hkst: 32400,
    hkt: 28800,
    hmt: -19776,
    hpt: -34200,
    hst: -36e3,
    hwt: -34200,
    iddt: 14400,
    idt: 10800,
    imt: 25025,
    ist: 7200,
    jdt: 36e3,
    jmt: 8440,
    jst: 32400,
    kdt: 36e3,
    kmt: 5736,
    kst: 30600,
    lst: 9394,
    mddt: -18e3,
    mdst: 16279,
    mdt: -21600,
    mest: 7200,
    met: 3600,
    mmt: 9017,
    mpt: -21600,
    msd: 14400,
    msk: 10800,
    mst: -25200,
    mwt: -21600,
    nddt: -5400,
    ndt: -9052,
    npt: -9e3,
    nst: -12600,
    nwt: -9e3,
    nzdt: 46800,
    nzmt: 41400,
    nzst: 43200,
    pddt: -21600,
    pdt: -25200,
    pkst: 21600,
    pkt: 18e3,
    plmt: 25590,
    pmt: -13236,
    ppmt: -17340,
    ppt: -25200,
    pst: -28800,
    pwt: -25200,
    qmt: -18840,
    rmt: 5794,
    sast: 7200,
    sdmt: -16800,
    sjmt: -20173,
    smt: -13884,
    sst: -39600,
    tbmt: 10751,
    tmt: 12344,
    uct: 0,
    utc: 0,
    wast: 7200,
    wat: 3600,
    wemt: 7200,
    west: 3600,
    wet: 0,
    wib: 25200,
    wita: 28800,
    wit: 32400,
    wmt: 5040,
    yddt: -25200,
    ydt: -28800,
    ypt: -28800,
    yst: -32400,
    ywt: -28800,
    a: 3600,
    b: 7200,
    c: 10800,
    d: 14400,
    e: 18e3,
    f: 21600,
    g: 25200,
    h: 28800,
    i: 32400,
    k: 36e3,
    l: 39600,
    m: 43200,
    n: -3600,
    o: -7200,
    p: -10800,
    q: -14400,
    r: -18e3,
    s: -21600,
    t: -25200,
    u: -28800,
    v: -32400,
    w: -36e3,
    x: -39600,
    y: -43200,
    z: 0
  };
  var formats = {
    yesterday: {
      regex: /^yesterday/i,
      name: "yesterday",
      callback: function callback() {
        this.rd -= 1;
        return this.resetTime();
      }
    },
    now: {
      regex: /^now/i,
      name: "now"
      // do nothing
    },
    noon: {
      regex: /^noon/i,
      name: "noon",
      callback: function callback() {
        return this.resetTime() && this.time(12, 0, 0, 0);
      }
    },
    midnightOrToday: {
      regex: /^(midnight|today)/i,
      name: "midnight | today",
      callback: function callback() {
        return this.resetTime();
      }
    },
    tomorrow: {
      regex: /^tomorrow/i,
      name: "tomorrow",
      callback: function callback() {
        this.rd += 1;
        return this.resetTime();
      }
    },
    timestamp: {
      regex: /^@(-?\d+)/i,
      name: "timestamp",
      callback: function callback(match, timestamp) {
        this.rs += +timestamp;
        this.y = 1970;
        this.m = 0;
        this.d = 1;
        this.dates = 0;
        return this.resetTime() && this.zone(0);
      }
    },
    firstOrLastDay: {
      regex: /^(first|last) day of/i,
      name: "firstdayof | lastdayof",
      callback: function callback(match, day) {
        if (day.toLowerCase() === "first") {
          this.firstOrLastDayOfMonth = 1;
        } else {
          this.firstOrLastDayOfMonth = -1;
        }
      }
    },
    backOrFrontOf: {
      regex: RegExp("^(back|front) of " + reHour24 + reSpaceOpt + reMeridian + "?", "i"),
      name: "backof | frontof",
      callback: function callback(match, side, hours, meridian) {
        var back = side.toLowerCase() === "back";
        var hour = +hours;
        var minute = 15;
        if (!back) {
          hour -= 1;
          minute = 45;
        }
        hour = processMeridian(hour, meridian);
        return this.resetTime() && this.time(hour, minute, 0, 0);
      }
    },
    weekdayOf: {
      regex: RegExp("^(" + reReltextnumber + "|" + reReltexttext + ")" + reSpace + "(" + reDayfull + "|" + reDayabbr + ")" + reSpace + "of", "i"),
      name: "weekdayof"
      // todo
    },
    mssqltime: {
      regex: RegExp("^" + reHour12 + ":" + reMinutelz + ":" + reSecondlz + "[:.]([0-9]+)" + reMeridian, "i"),
      name: "mssqltime",
      callback: function callback(match, hour, minute, second, frac, meridian) {
        return this.time(processMeridian(+hour, meridian), +minute, +second, +frac.substr(0, 3));
      }
    },
    oracledate: {
      regex: /^(\d{2})-([A-Z]{3})-(\d{2})$/i,
      name: "d-M-y",
      callback: function callback(match, day, monthText, year) {
        var month = {
          JAN: 0,
          FEB: 1,
          MAR: 2,
          APR: 3,
          MAY: 4,
          JUN: 5,
          JUL: 6,
          AUG: 7,
          SEP: 8,
          OCT: 9,
          NOV: 10,
          DEC: 11
        }[monthText.toUpperCase()];
        return this.ymd(2e3 + parseInt(year, 10), month, parseInt(day, 10));
      }
    },
    timeLong12: {
      regex: RegExp("^" + reHour12 + "[:.]" + reMinute + "[:.]" + reSecondlz + reSpaceOpt + reMeridian, "i"),
      name: "timelong12",
      callback: function callback(match, hour, minute, second, meridian) {
        return this.time(processMeridian(+hour, meridian), +minute, +second, 0);
      }
    },
    timeShort12: {
      regex: RegExp("^" + reHour12 + "[:.]" + reMinutelz + reSpaceOpt + reMeridian, "i"),
      name: "timeshort12",
      callback: function callback(match, hour, minute, meridian) {
        return this.time(processMeridian(+hour, meridian), +minute, 0, 0);
      }
    },
    timeTiny12: {
      regex: RegExp("^" + reHour12 + reSpaceOpt + reMeridian, "i"),
      name: "timetiny12",
      callback: function callback(match, hour, meridian) {
        return this.time(processMeridian(+hour, meridian), 0, 0, 0);
      }
    },
    soap: {
      regex: RegExp("^" + reYear4 + "-" + reMonthlz + "-" + reDaylz + "T" + reHour24lz + ":" + reMinutelz + ":" + reSecondlz + reFrac + reTzCorrection + "?", "i"),
      name: "soap",
      callback: function callback(match, year, month, day, hour, minute, second, frac, tzCorrection) {
        return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, +frac.substr(0, 3)) && this.zone(processTzCorrection(tzCorrection));
      }
    },
    wddx: {
      regex: RegExp("^" + reYear4 + "-" + reMonth + "-" + reDay + "T" + reHour24 + ":" + reMinute + ":" + reSecond),
      name: "wddx",
      callback: function callback(match, year, month, day, hour, minute, second) {
        return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, 0);
      }
    },
    exif: {
      regex: RegExp("^" + reYear4 + ":" + reMonthlz + ":" + reDaylz + " " + reHour24lz + ":" + reMinutelz + ":" + reSecondlz, "i"),
      name: "exif",
      callback: function callback(match, year, month, day, hour, minute, second) {
        return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, 0);
      }
    },
    xmlRpc: {
      regex: RegExp("^" + reYear4 + reMonthlz + reDaylz + "T" + reHour24 + ":" + reMinutelz + ":" + reSecondlz),
      name: "xmlrpc",
      callback: function callback(match, year, month, day, hour, minute, second) {
        return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, 0);
      }
    },
    xmlRpcNoColon: {
      regex: RegExp("^" + reYear4 + reMonthlz + reDaylz + "[Tt]" + reHour24 + reMinutelz + reSecondlz),
      name: "xmlrpcnocolon",
      callback: function callback(match, year, month, day, hour, minute, second) {
        return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, 0);
      }
    },
    clf: {
      regex: RegExp("^" + reDay + "/(" + reMonthAbbr + ")/" + reYear4 + ":" + reHour24lz + ":" + reMinutelz + ":" + reSecondlz + reSpace + reTzCorrection, "i"),
      name: "clf",
      callback: function callback(match, day, month, year, hour, minute, second, tzCorrection) {
        return this.ymd(+year, lookupMonth(month), +day) && this.time(+hour, +minute, +second, 0) && this.zone(processTzCorrection(tzCorrection));
      }
    },
    iso8601long: {
      regex: RegExp("^t?" + reHour24 + "[:.]" + reMinute + "[:.]" + reSecond + reFrac, "i"),
      name: "iso8601long",
      callback: function callback(match, hour, minute, second, frac) {
        return this.time(+hour, +minute, +second, +frac.substr(0, 3));
      }
    },
    dateTextual: {
      regex: RegExp("^" + reMonthText + "[ .\\t-]*" + reDay + "[,.stndrh\\t ]+" + reYear, "i"),
      name: "datetextual",
      callback: function callback(match, month, day, year) {
        return this.ymd(processYear(year), lookupMonth(month), +day);
      }
    },
    pointedDate4: {
      regex: RegExp("^" + reDay + "[.\\t-]" + reMonth + "[.-]" + reYear4),
      name: "pointeddate4",
      callback: function callback(match, day, month, year) {
        return this.ymd(+year, month - 1, +day);
      }
    },
    pointedDate2: {
      regex: RegExp("^" + reDay + "[.\\t]" + reMonth + "\\." + reYear2),
      name: "pointeddate2",
      callback: function callback(match, day, month, year) {
        return this.ymd(processYear(year), month - 1, +day);
      }
    },
    timeLong24: {
      regex: RegExp("^t?" + reHour24 + "[:.]" + reMinute + "[:.]" + reSecond),
      name: "timelong24",
      callback: function callback(match, hour, minute, second) {
        return this.time(+hour, +minute, +second, 0);
      }
    },
    dateNoColon: {
      regex: RegExp("^" + reYear4 + reMonthlz + reDaylz),
      name: "datenocolon",
      callback: function callback(match, year, month, day) {
        return this.ymd(+year, month - 1, +day);
      }
    },
    pgydotd: {
      regex: RegExp("^" + reYear4 + "\\.?" + reDayOfYear),
      name: "pgydotd",
      callback: function callback(match, year, day) {
        return this.ymd(+year, 0, +day);
      }
    },
    timeShort24: {
      regex: RegExp("^t?" + reHour24 + "[:.]" + reMinute, "i"),
      name: "timeshort24",
      callback: function callback(match, hour, minute) {
        return this.time(+hour, +minute, 0, 0);
      }
    },
    iso8601noColon: {
      regex: RegExp("^t?" + reHour24lz + reMinutelz + reSecondlz, "i"),
      name: "iso8601nocolon",
      callback: function callback(match, hour, minute, second) {
        return this.time(+hour, +minute, +second, 0);
      }
    },
    iso8601dateSlash: {
      // eventhough the trailing slash is optional in PHP
      // here it's mandatory and inputs without the slash
      // are handled by dateslash
      regex: RegExp("^" + reYear4 + "/" + reMonthlz + "/" + reDaylz + "/"),
      name: "iso8601dateslash",
      callback: function callback(match, year, month, day) {
        return this.ymd(+year, month - 1, +day);
      }
    },
    dateSlash: {
      regex: RegExp("^" + reYear4 + "/" + reMonth + "/" + reDay),
      name: "dateslash",
      callback: function callback(match, year, month, day) {
        return this.ymd(+year, month - 1, +day);
      }
    },
    american: {
      regex: RegExp("^" + reMonth + "/" + reDay + "/" + reYear),
      name: "american",
      callback: function callback(match, month, day, year) {
        return this.ymd(processYear(year), month - 1, +day);
      }
    },
    americanShort: {
      regex: RegExp("^" + reMonth + "/" + reDay),
      name: "americanshort",
      callback: function callback(match, month, day) {
        return this.ymd(this.y, month - 1, +day);
      }
    },
    gnuDateShortOrIso8601date2: {
      // iso8601date2 is complete subset of gnudateshort
      regex: RegExp("^" + reYear + "-" + reMonth + "-" + reDay),
      name: "gnudateshort | iso8601date2",
      callback: function callback(match, year, month, day) {
        return this.ymd(processYear(year), month - 1, +day);
      }
    },
    iso8601date4: {
      regex: RegExp("^" + reYear4withSign + "-" + reMonthlz + "-" + reDaylz),
      name: "iso8601date4",
      callback: function callback(match, year, month, day) {
        return this.ymd(+year, month - 1, +day);
      }
    },
    gnuNoColon: {
      regex: RegExp("^t?" + reHour24lz + reMinutelz, "i"),
      name: "gnunocolon",
      callback: function callback(match, hour, minute) {
        switch (this.times) {
          case 0:
            return this.time(+hour, +minute, 0, this.f);
          case 1:
            this.y = hour * 100 + +minute;
            this.times++;
            return true;
          default:
            return false;
        }
      }
    },
    gnuDateShorter: {
      regex: RegExp("^" + reYear4 + "-" + reMonth),
      name: "gnudateshorter",
      callback: function callback(match, year, month) {
        return this.ymd(+year, month - 1, 1);
      }
    },
    pgTextReverse: {
      // note: allowed years are from 32-9999
      // years below 32 should be treated as days in datefull
      regex: RegExp("^(\\d{3,4}|[4-9]\\d|3[2-9])-(" + reMonthAbbr + ")-" + reDaylz, "i"),
      name: "pgtextreverse",
      callback: function callback(match, year, month, day) {
        return this.ymd(processYear(year), lookupMonth(month), +day);
      }
    },
    dateFull: {
      regex: RegExp("^" + reDay + "[ \\t.-]*" + reMonthText + "[ \\t.-]*" + reYear, "i"),
      name: "datefull",
      callback: function callback(match, day, month, year) {
        return this.ymd(processYear(year), lookupMonth(month), +day);
      }
    },
    dateNoDay: {
      regex: RegExp("^" + reMonthText + "[ .\\t-]*" + reYear4, "i"),
      name: "datenoday",
      callback: function callback(match, month, year) {
        return this.ymd(+year, lookupMonth(month), 1);
      }
    },
    dateNoDayRev: {
      regex: RegExp("^" + reYear4 + "[ .\\t-]*" + reMonthText, "i"),
      name: "datenodayrev",
      callback: function callback(match, year, month) {
        return this.ymd(+year, lookupMonth(month), 1);
      }
    },
    pgTextShort: {
      regex: RegExp("^(" + reMonthAbbr + ")-" + reDaylz + "-" + reYear, "i"),
      name: "pgtextshort",
      callback: function callback(match, month, day, year) {
        return this.ymd(processYear(year), lookupMonth(month), +day);
      }
    },
    dateNoYear: {
      regex: RegExp("^" + reDateNoYear, "i"),
      name: "datenoyear",
      callback: function callback(match, month, day) {
        return this.ymd(this.y, lookupMonth(month), +day);
      }
    },
    dateNoYearRev: {
      regex: RegExp("^" + reDay + "[ .\\t-]*" + reMonthText, "i"),
      name: "datenoyearrev",
      callback: function callback(match, day, month) {
        return this.ymd(this.y, lookupMonth(month), +day);
      }
    },
    isoWeekDay: {
      regex: RegExp("^" + reYear4 + "-?W" + reWeekOfYear + "(?:-?([0-7]))?"),
      name: "isoweekday | isoweek",
      callback: function callback(match, year, week, day) {
        day = day ? +day : 1;
        if (!this.ymd(+year, 0, 1)) {
          return false;
        }
        var dayOfWeek = new Date(this.y, this.m, this.d).getDay();
        dayOfWeek = 0 - (dayOfWeek > 4 ? dayOfWeek - 7 : dayOfWeek);
        this.rd += dayOfWeek + (week - 1) * 7 + day;
      }
    },
    relativeText: {
      regex: RegExp("^(" + reReltextnumber + "|" + reReltexttext + ")" + reSpace + "(" + reReltextunit + ")", "i"),
      name: "relativetext",
      callback: function callback(match, relValue, relUnit) {
        var _lookupRelative = lookupRelative(relValue), amount = _lookupRelative.amount;
        switch (relUnit.toLowerCase()) {
          case "sec":
          case "secs":
          case "second":
          case "seconds":
            this.rs += amount;
            break;
          case "min":
          case "mins":
          case "minute":
          case "minutes":
            this.ri += amount;
            break;
          case "hour":
          case "hours":
            this.rh += amount;
            break;
          case "day":
          case "days":
            this.rd += amount;
            break;
          case "fortnight":
          case "fortnights":
          case "forthnight":
          case "forthnights":
            this.rd += amount * 14;
            break;
          case "week":
          case "weeks":
            this.rd += amount * 7;
            break;
          case "month":
          case "months":
            this.rm += amount;
            break;
          case "year":
          case "years":
            this.ry += amount;
            break;
          case "mon":
          case "monday":
          case "tue":
          case "tuesday":
          case "wed":
          case "wednesday":
          case "thu":
          case "thursday":
          case "fri":
          case "friday":
          case "sat":
          case "saturday":
          case "sun":
          case "sunday":
            this.resetTime();
            this.weekday = lookupWeekday(relUnit, 7);
            this.weekdayBehavior = 1;
            this.rd += (amount > 0 ? amount - 1 : amount) * 7;
            break;
        }
      }
    },
    relative: {
      regex: RegExp("^([+-]*)[ \\t]*(\\d+)" + reSpaceOpt + "(" + reReltextunit + "|week)", "i"),
      name: "relative",
      callback: function callback(match, signs, relValue, relUnit) {
        var minuses = signs.replace(/[^-]/g, "").length;
        var amount = +relValue * Math.pow(-1, minuses);
        switch (relUnit.toLowerCase()) {
          case "sec":
          case "secs":
          case "second":
          case "seconds":
            this.rs += amount;
            break;
          case "min":
          case "mins":
          case "minute":
          case "minutes":
            this.ri += amount;
            break;
          case "hour":
          case "hours":
            this.rh += amount;
            break;
          case "day":
          case "days":
            this.rd += amount;
            break;
          case "fortnight":
          case "fortnights":
          case "forthnight":
          case "forthnights":
            this.rd += amount * 14;
            break;
          case "week":
          case "weeks":
            this.rd += amount * 7;
            break;
          case "month":
          case "months":
            this.rm += amount;
            break;
          case "year":
          case "years":
            this.ry += amount;
            break;
          case "mon":
          case "monday":
          case "tue":
          case "tuesday":
          case "wed":
          case "wednesday":
          case "thu":
          case "thursday":
          case "fri":
          case "friday":
          case "sat":
          case "saturday":
          case "sun":
          case "sunday":
            this.resetTime();
            this.weekday = lookupWeekday(relUnit, 7);
            this.weekdayBehavior = 1;
            this.rd += (amount > 0 ? amount - 1 : amount) * 7;
            break;
        }
      }
    },
    dayText: {
      regex: RegExp("^(" + reDaytext + ")", "i"),
      name: "daytext",
      callback: function callback(match, dayText) {
        this.resetTime();
        this.weekday = lookupWeekday(dayText, 0);
        if (this.weekdayBehavior !== 2) {
          this.weekdayBehavior = 1;
        }
      }
    },
    relativeTextWeek: {
      regex: RegExp("^(" + reReltexttext + ")" + reSpace + "week", "i"),
      name: "relativetextweek",
      callback: function callback(match, relText) {
        this.weekdayBehavior = 2;
        switch (relText.toLowerCase()) {
          case "this":
            this.rd += 0;
            break;
          case "next":
            this.rd += 7;
            break;
          case "last":
          case "previous":
            this.rd -= 7;
            break;
        }
        if (isNaN(this.weekday)) {
          this.weekday = 1;
        }
      }
    },
    monthFullOrMonthAbbr: {
      regex: RegExp("^(" + reMonthFull + "|" + reMonthAbbr + ")", "i"),
      name: "monthfull | monthabbr",
      callback: function callback(match, month) {
        return this.ymd(this.y, lookupMonth(month), this.d);
      }
    },
    tzCorrection: {
      regex: RegExp("^" + reTzCorrection, "i"),
      name: "tzcorrection",
      callback: function callback(tzCorrection) {
        return this.zone(processTzCorrection(tzCorrection));
      }
    },
    tzAbbr: {
      regex: RegExp("^" + reTzAbbr),
      name: "tzabbr",
      callback: function callback(match, abbr) {
        var offset2 = tzAbbrOffsets[abbr.toLowerCase()];
        if (isNaN(offset2)) {
          return false;
        }
        return this.zone(offset2);
      }
    },
    ago: {
      regex: /^ago/i,
      name: "ago",
      callback: function callback() {
        this.ry = -this.ry;
        this.rm = -this.rm;
        this.rd = -this.rd;
        this.rh = -this.rh;
        this.ri = -this.ri;
        this.rs = -this.rs;
        this.rf = -this.rf;
      }
    },
    year4: {
      regex: RegExp("^" + reYear4),
      name: "year4",
      callback: function callback(match, year) {
        this.y = +year;
        return true;
      }
    },
    whitespace: {
      regex: /^[ .,\t]+/,
      name: "whitespace"
      // do nothing
    },
    dateShortWithTimeLong: {
      regex: RegExp("^" + reDateNoYear + "t?" + reHour24 + "[:.]" + reMinute + "[:.]" + reSecond, "i"),
      name: "dateshortwithtimelong",
      callback: function callback(match, month, day, hour, minute, second) {
        return this.ymd(this.y, lookupMonth(month), +day) && this.time(+hour, +minute, +second, 0);
      }
    },
    dateShortWithTimeLong12: {
      regex: RegExp("^" + reDateNoYear + reHour12 + "[:.]" + reMinute + "[:.]" + reSecondlz + reSpaceOpt + reMeridian, "i"),
      name: "dateshortwithtimelong12",
      callback: function callback(match, month, day, hour, minute, second, meridian) {
        return this.ymd(this.y, lookupMonth(month), +day) && this.time(processMeridian(+hour, meridian), +minute, +second, 0);
      }
    },
    dateShortWithTimeShort: {
      regex: RegExp("^" + reDateNoYear + "t?" + reHour24 + "[:.]" + reMinute, "i"),
      name: "dateshortwithtimeshort",
      callback: function callback(match, month, day, hour, minute) {
        return this.ymd(this.y, lookupMonth(month), +day) && this.time(+hour, +minute, 0, 0);
      }
    },
    dateShortWithTimeShort12: {
      regex: RegExp("^" + reDateNoYear + reHour12 + "[:.]" + reMinutelz + reSpaceOpt + reMeridian, "i"),
      name: "dateshortwithtimeshort12",
      callback: function callback(match, month, day, hour, minute, meridian) {
        return this.ymd(this.y, lookupMonth(month), +day) && this.time(processMeridian(+hour, meridian), +minute, 0, 0);
      }
    }
  };
  var resultProto = {
    // date
    y: NaN,
    m: NaN,
    d: NaN,
    // time
    h: NaN,
    i: NaN,
    s: NaN,
    f: NaN,
    // relative shifts
    ry: 0,
    rm: 0,
    rd: 0,
    rh: 0,
    ri: 0,
    rs: 0,
    rf: 0,
    // weekday related shifts
    weekday: NaN,
    weekdayBehavior: 0,
    // first or last day of month
    // 0 none, 1 first, -1 last
    firstOrLastDayOfMonth: 0,
    // timezone correction in minutes
    z: NaN,
    // counters
    dates: 0,
    times: 0,
    zones: 0,
    // helper functions
    ymd: function ymd(y, m, d) {
      if (this.dates > 0) {
        return false;
      }
      this.dates++;
      this.y = y;
      this.m = m;
      this.d = d;
      return true;
    },
    time: function time(h, i, s, f) {
      if (this.times > 0) {
        return false;
      }
      this.times++;
      this.h = h;
      this.i = i;
      this.s = s;
      this.f = f;
      return true;
    },
    resetTime: function resetTime() {
      this.h = 0;
      this.i = 0;
      this.s = 0;
      this.f = 0;
      this.times = 0;
      return true;
    },
    zone: function zone(minutes) {
      if (this.zones <= 1) {
        this.zones++;
        this.z = minutes;
        return true;
      }
      return false;
    },
    toDate: function toDate(relativeTo) {
      if (this.dates && !this.times) {
        this.h = this.i = this.s = this.f = 0;
      }
      if (isNaN(this.y)) {
        this.y = relativeTo.getFullYear();
      }
      if (isNaN(this.m)) {
        this.m = relativeTo.getMonth();
      }
      if (isNaN(this.d)) {
        this.d = relativeTo.getDate();
      }
      if (isNaN(this.h)) {
        this.h = relativeTo.getHours();
      }
      if (isNaN(this.i)) {
        this.i = relativeTo.getMinutes();
      }
      if (isNaN(this.s)) {
        this.s = relativeTo.getSeconds();
      }
      if (isNaN(this.f)) {
        this.f = relativeTo.getMilliseconds();
      }
      switch (this.firstOrLastDayOfMonth) {
        case 1:
          this.d = 1;
          break;
        case -1:
          this.d = 0;
          this.m += 1;
          break;
      }
      if (!isNaN(this.weekday)) {
        var date2 = new Date(relativeTo.getTime());
        date2.setFullYear(this.y, this.m, this.d);
        date2.setHours(this.h, this.i, this.s, this.f);
        var dow = date2.getDay();
        if (this.weekdayBehavior === 2) {
          if (dow === 0 && this.weekday !== 0) {
            this.weekday = -6;
          }
          if (this.weekday === 0 && dow !== 0) {
            this.weekday = 7;
          }
          this.d -= dow;
          this.d += this.weekday;
        } else {
          var diff = this.weekday - dow;
          if (this.rd < 0 && diff < 0 || this.rd >= 0 && diff <= -this.weekdayBehavior) {
            diff += 7;
          }
          if (this.weekday >= 0) {
            this.d += diff;
          } else {
            this.d -= 7 - (Math.abs(this.weekday) - dow);
          }
          this.weekday = NaN;
        }
      }
      this.y += this.ry;
      this.m += this.rm;
      this.d += this.rd;
      this.h += this.rh;
      this.i += this.ri;
      this.s += this.rs;
      this.f += this.rf;
      this.ry = this.rm = this.rd = 0;
      this.rh = this.ri = this.rs = this.rf = 0;
      var result = new Date(relativeTo.getTime());
      result.setFullYear(this.y, this.m, this.d);
      result.setHours(this.h, this.i, this.s, this.f);
      switch (this.firstOrLastDayOfMonth) {
        case 1:
          result.setDate(1);
          break;
        case -1:
          result.setMonth(result.getMonth() + 1, 0);
          break;
      }
      if (!isNaN(this.z) && result.getTimezoneOffset() !== this.z) {
        result.setUTCFullYear(result.getFullYear(), result.getMonth(), result.getDate());
        result.setUTCHours(result.getHours(), result.getMinutes(), result.getSeconds() - this.z, result.getMilliseconds());
      }
      return result;
    }
  };
  strtotime = function strtotime2(str, now) {
    if (now == null) {
      now = Math.floor(Date.now() / 1e3);
    }
    var rules = [
      formats.yesterday,
      formats.now,
      formats.noon,
      formats.midnightOrToday,
      formats.tomorrow,
      formats.timestamp,
      formats.firstOrLastDay,
      formats.backOrFrontOf,
      // formats.weekdayOf, // not yet implemented
      formats.timeTiny12,
      formats.timeShort12,
      formats.timeLong12,
      formats.mssqltime,
      formats.oracledate,
      formats.timeShort24,
      formats.timeLong24,
      formats.iso8601long,
      formats.gnuNoColon,
      formats.iso8601noColon,
      formats.americanShort,
      formats.american,
      formats.iso8601date4,
      formats.iso8601dateSlash,
      formats.dateSlash,
      formats.gnuDateShortOrIso8601date2,
      formats.gnuDateShorter,
      formats.dateFull,
      formats.pointedDate4,
      formats.pointedDate2,
      formats.dateNoDay,
      formats.dateNoDayRev,
      formats.dateTextual,
      formats.dateNoYear,
      formats.dateNoYearRev,
      formats.dateNoColon,
      formats.xmlRpc,
      formats.xmlRpcNoColon,
      formats.soap,
      formats.wddx,
      formats.exif,
      formats.pgydotd,
      formats.isoWeekDay,
      formats.pgTextShort,
      formats.pgTextReverse,
      formats.clf,
      formats.year4,
      formats.ago,
      formats.dayText,
      formats.relativeTextWeek,
      formats.relativeText,
      formats.monthFullOrMonthAbbr,
      formats.tzCorrection,
      formats.tzAbbr,
      formats.dateShortWithTimeShort12,
      formats.dateShortWithTimeLong12,
      formats.dateShortWithTimeShort,
      formats.dateShortWithTimeLong,
      formats.relative,
      formats.whitespace
    ];
    var result = Object.create(resultProto);
    while (str.length) {
      var longestMatch = null;
      var finalRule = null;
      for (var i = 0, l = rules.length; i < l; i++) {
        var format = rules[i];
        var match = str.match(format.regex);
        if (match) {
          if (!longestMatch || match[0].length > longestMatch[0].length) {
            longestMatch = match;
            finalRule = format;
          }
        }
      }
      if (!finalRule || finalRule.callback && finalRule.callback.apply(result, longestMatch) === false) {
        return false;
      }
      str = str.substr(longestMatch[0].length);
      finalRule = null;
      longestMatch = null;
    }
    return Math.floor(result.toDate(new Date(now * 1e3)) / 1e3);
  };
  return strtotime;
}
var date;
var hasRequiredDate;
function requireDate() {
  if (hasRequiredDate) return date;
  hasRequiredDate = 1;
  date = function date2(format, timestamp) {
    var jsdate = void 0, f = void 0;
    var txtWords = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var formatChr = /\\?(.?)/gi;
    var formatChrCb = function formatChrCb2(t, s) {
      return f[t] ? f[t]() : s;
    };
    var _pad = function _pad2(n, c) {
      n = String(n);
      while (n.length < c) {
        n = "0" + n;
      }
      return n;
    };
    f = {
      // Day
      d: function d() {
        return _pad(f.j(), 2);
      },
      D: function D() {
        return f.l().slice(0, 3);
      },
      j: function j() {
        return jsdate.getDate();
      },
      l: function l() {
        return txtWords[f.w()] + "day";
      },
      N: function N() {
        return f.w() || 7;
      },
      S: function S() {
        var j = f.j();
        var i = j % 10;
        if (i <= 3 && parseInt(j % 100 / 10, 10) === 1) {
          i = 0;
        }
        return ["st", "nd", "rd"][i - 1] || "th";
      },
      w: function w() {
        return jsdate.getDay();
      },
      z: function z() {
        var a = new Date(f.Y(), f.n() - 1, f.j());
        var b = new Date(f.Y(), 0, 1);
        return Math.round((a - b) / 864e5);
      },
      // Week
      W: function W() {
        var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3);
        var b = new Date(a.getFullYear(), 0, 4);
        return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
      },
      // Month
      F: function F() {
        return txtWords[6 + f.n()];
      },
      m: function m() {
        return _pad(f.n(), 2);
      },
      M: function M() {
        return f.F().slice(0, 3);
      },
      n: function n() {
        return jsdate.getMonth() + 1;
      },
      t: function t() {
        return new Date(f.Y(), f.n(), 0).getDate();
      },
      // Year
      L: function L() {
        var j = f.Y();
        return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0;
      },
      o: function o() {
        var n = f.n();
        var W = f.W();
        var Y = f.Y();
        return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0);
      },
      Y: function Y() {
        return jsdate.getFullYear();
      },
      y: function y() {
        return f.Y().toString().slice(-2);
      },
      // Time
      a: function a() {
        return jsdate.getHours() > 11 ? "pm" : "am";
      },
      A: function A() {
        return f.a().toUpperCase();
      },
      B: function B() {
        var H = jsdate.getUTCHours() * 3600;
        var i = jsdate.getUTCMinutes() * 60;
        var s = jsdate.getUTCSeconds();
        return _pad(Math.floor((H + i + s + 3600) / 86.4) % 1e3, 3);
      },
      g: function g() {
        return f.G() % 12 || 12;
      },
      G: function G() {
        return jsdate.getHours();
      },
      h: function h() {
        return _pad(f.g(), 2);
      },
      H: function H() {
        return _pad(f.G(), 2);
      },
      i: function i() {
        return _pad(jsdate.getMinutes(), 2);
      },
      s: function s() {
        return _pad(jsdate.getSeconds(), 2);
      },
      u: function u() {
        return _pad(jsdate.getMilliseconds() * 1e3, 6);
      },
      // Timezone
      e: function e() {
        var msg = "Not supported (see source code of date() for timezone on how to add support)";
        throw new Error(msg);
      },
      I: function I() {
        var a = new Date(f.Y(), 0);
        var c = Date.UTC(f.Y(), 0);
        var b = new Date(f.Y(), 6);
        var d = Date.UTC(f.Y(), 6);
        return a - c !== b - d ? 1 : 0;
      },
      O: function O() {
        var tzo = jsdate.getTimezoneOffset();
        var a = Math.abs(tzo);
        return (tzo > 0 ? "-" : "+") + _pad(Math.floor(a / 60) * 100 + a % 60, 4);
      },
      P: function P() {
        var O = f.O();
        return O.substr(0, 3) + ":" + O.substr(3, 2);
      },
      T: function T() {
        return "UTC";
      },
      Z: function Z() {
        return -jsdate.getTimezoneOffset() * 60;
      },
      // Full Date/Time
      c: function c() {
        return "Y-m-d\\TH:i:sP".replace(formatChr, formatChrCb);
      },
      r: function r() {
        return "D, d M Y H:i:s O".replace(formatChr, formatChrCb);
      },
      U: function U() {
        return jsdate / 1e3 | 0;
      }
    };
    var _date = function _date2(format2, timestamp2) {
      jsdate = timestamp2 === void 0 ? /* @__PURE__ */ new Date() : timestamp2 instanceof Date ? new Date(timestamp2) : new Date(timestamp2 * 1e3);
      return format2.replace(formatChr, formatChrCb);
    };
    return _date(format, timestamp);
  };
  return date;
}
var boolval;
var hasRequiredBoolval;
function requireBoolval() {
  if (hasRequiredBoolval) return boolval;
  hasRequiredBoolval = 1;
  boolval = function boolval2(mixedVar) {
    if (mixedVar === false) {
      return false;
    }
    if (mixedVar === 0 || mixedVar === 0) {
      return false;
    }
    if (mixedVar === "" || mixedVar === "0") {
      return false;
    }
    if (Array.isArray(mixedVar) && mixedVar.length === 0) {
      return false;
    }
    if (mixedVar === null || mixedVar === void 0) {
      return false;
    }
    return true;
  };
  return boolval;
}
var twig_lib;
var hasRequiredTwig_lib;
function requireTwig_lib() {
  if (hasRequiredTwig_lib) return twig_lib;
  hasRequiredTwig_lib = 1;
  twig_lib = function(Twig2) {
    Twig2.lib = {};
    Twig2.lib.sprintf = requireSprintf();
    Twig2.lib.vsprintf = requireVsprintf();
    Twig2.lib.round = requireRound();
    Twig2.lib.max = requireMax();
    Twig2.lib.min = requireMin();
    Twig2.lib.stripTags = requireStrip_tags();
    Twig2.lib.strtotime = requireStrtotime();
    Twig2.lib.date = requireDate();
    Twig2.lib.boolval = requireBoolval();
    Twig2.lib.is = function(type, obj) {
      if (typeof obj === "undefined" || obj === null) {
        return false;
      }
      switch (type) {
        case "Array":
          return Array.isArray(obj);
        case "Date":
          return obj instanceof Date;
        case "String":
          return typeof obj === "string" || obj instanceof String;
        case "Number":
          return typeof obj === "number" || obj instanceof Number;
        case "Function":
          return typeof obj === "function";
        case "Object":
          return obj instanceof Object;
        default:
          return false;
      }
    };
    Twig2.lib.replaceAll = function(string, search, replace) {
      const stringToChange = typeof string === "string" ? string : string.toString();
      const searchEscaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return stringToChange.replace(new RegExp(searchEscaped, "g"), replace);
    };
    Twig2.lib.chunkArray = function(arr, size) {
      const returnVal = [];
      let x = 0;
      const len = arr.length;
      if (size < 1 || !Array.isArray(arr)) {
        return [];
      }
      while (x < len) {
        returnVal.push(arr.slice(x, x += size));
      }
      return returnVal;
    };
    return Twig2;
  };
  return twig_lib;
}
var twig_loader_ajax;
var hasRequiredTwig_loader_ajax;
function requireTwig_loader_ajax() {
  if (hasRequiredTwig_loader_ajax) return twig_loader_ajax;
  hasRequiredTwig_loader_ajax = 1;
  twig_loader_ajax = function(Twig2) {
    Twig2.Templates.registerLoader("ajax", function(location, params, callback, errorCallback) {
      let template;
      const { precompiled } = params;
      const parser = this.parsers[params.parser] || this.parser.twig;
      if (typeof XMLHttpRequest === "undefined") {
        throw new Twig2.Error('Unsupported platform: Unable to do ajax requests because there is no "XMLHTTPRequest" implementation');
      }
      const xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        let data = null;
        if (xmlhttp.readyState === 4) {
          if (xmlhttp.status === 200 || window.cordova && xmlhttp.status === 0) {
            Twig2.log.debug("Got template ", xmlhttp.responseText);
            if (precompiled === true) {
              data = JSON.parse(xmlhttp.responseText);
            } else {
              data = xmlhttp.responseText;
            }
            params.url = location;
            params.data = data;
            template = parser.call(this, params);
            if (typeof callback === "function") {
              callback(template);
            }
          } else if (typeof errorCallback === "function") {
            errorCallback(xmlhttp);
          }
        }
      };
      xmlhttp.open("GET", location, Boolean(params.async));
      xmlhttp.overrideMimeType("text/plain");
      xmlhttp.send();
      if (params.async) {
        return true;
      }
      return template;
    });
  };
  return twig_loader_ajax;
}
const __viteBrowserExternal = {};
const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal
}, Symbol.toStringTag, { value: "Module" }));
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
var twig_loader_fs;
var hasRequiredTwig_loader_fs;
function requireTwig_loader_fs() {
  if (hasRequiredTwig_loader_fs) return twig_loader_fs;
  hasRequiredTwig_loader_fs = 1;
  twig_loader_fs = function(Twig2) {
    let fs;
    let path;
    try {
      fs = require$$0;
      path = require$$0;
    } catch (error) {
      console.warn("Missing fs and path modules. " + error);
    }
    Twig2.Templates.registerLoader("fs", function(location, params, callback, errorCallback) {
      let template;
      let data = null;
      const { precompiled } = params;
      const parser = this.parsers[params.parser] || this.parser.twig;
      if (!fs || !path) {
        throw new Twig2.Error('Unsupported platform: Unable to load from file because there is no "fs" or "path" implementation');
      }
      const loadTemplateFn = function(err, data2) {
        if (err) {
          if (typeof errorCallback === "function") {
            errorCallback(err);
          }
          return;
        }
        if (precompiled === true) {
          data2 = JSON.parse(data2);
        }
        params.data = data2;
        params.path = params.path || location;
        template = parser.call(this, params);
        if (typeof callback === "function") {
          callback(template);
        }
      };
      params.path = params.path || location;
      if (params.async) {
        fs.stat(params.path, (err, stats) => {
          if (err || !stats.isFile()) {
            if (typeof errorCallback === "function") {
              errorCallback(new Twig2.Error("Unable to find template file " + params.path));
            }
            return;
          }
          fs.readFile(params.path, "utf8", loadTemplateFn);
        });
        return true;
      }
      try {
        if (!fs.statSync(params.path).isFile()) {
          throw new Twig2.Error("Unable to find template file " + params.path);
        }
      } catch (error) {
        throw new Twig2.Error("Unable to find template file " + params.path + ". " + error);
      }
      data = fs.readFileSync(params.path, "utf8");
      loadTemplateFn(void 0, data);
      return template;
    });
  };
  return twig_loader_fs;
}
var twig_logic;
var hasRequiredTwig_logic;
function requireTwig_logic() {
  if (hasRequiredTwig_logic) return twig_logic;
  hasRequiredTwig_logic = 1;
  twig_logic = function(Twig2) {
    Twig2.logic = {};
    Twig2.logic.type = {
      if_: "Twig.logic.type.if",
      endif: "Twig.logic.type.endif",
      for_: "Twig.logic.type.for",
      endfor: "Twig.logic.type.endfor",
      else_: "Twig.logic.type.else",
      elseif: "Twig.logic.type.elseif",
      set: "Twig.logic.type.set",
      setcapture: "Twig.logic.type.setcapture",
      endset: "Twig.logic.type.endset",
      filter: "Twig.logic.type.filter",
      endfilter: "Twig.logic.type.endfilter",
      apply: "Twig.logic.type.apply",
      endapply: "Twig.logic.type.endapply",
      do: "Twig.logic.type.do",
      shortblock: "Twig.logic.type.shortblock",
      block: "Twig.logic.type.block",
      endblock: "Twig.logic.type.endblock",
      extends_: "Twig.logic.type.extends",
      use: "Twig.logic.type.use",
      include: "Twig.logic.type.include",
      spaceless: "Twig.logic.type.spaceless",
      endspaceless: "Twig.logic.type.endspaceless",
      macro: "Twig.logic.type.macro",
      endmacro: "Twig.logic.type.endmacro",
      import_: "Twig.logic.type.import",
      from: "Twig.logic.type.from",
      embed: "Twig.logic.type.embed",
      endembed: "Twig.logic.type.endembed",
      with: "Twig.logic.type.with",
      endwith: "Twig.logic.type.endwith",
      deprecated: "Twig.logic.type.deprecated"
    };
    Twig2.logic.definitions = [
      {
        /**
         * If type logic tokens.
         *
         *  Format: {% if expression %}
         */
        type: Twig2.logic.type.if_,
        regex: /^if\s?([\s\S]+)$/,
        next: [
          Twig2.logic.type.else_,
          Twig2.logic.type.elseif,
          Twig2.logic.type.endif
        ],
        open: true,
        compile(token) {
          const expression = token.match[1];
          token.stack = Twig2.expression.compile.call(this, {
            type: Twig2.expression.type.expression,
            value: expression
          }).stack;
          delete token.match;
          return token;
        },
        parse(token, context, chain) {
          const state = this;
          return Twig2.expression.parseAsync.call(state, token.stack, context).then((result) => {
            chain = true;
            if (Twig2.lib.boolval(result)) {
              chain = false;
              return state.parseAsync(token.output, context);
            }
            return "";
          }).then((output2) => {
            return {
              chain,
              output: output2
            };
          });
        }
      },
      {
        /**
         * Else if type logic tokens.
         *
         *  Format: {% elseif expression %}
         */
        type: Twig2.logic.type.elseif,
        regex: /^elseif\s*([^\s].*)$/,
        next: [
          Twig2.logic.type.else_,
          Twig2.logic.type.elseif,
          Twig2.logic.type.endif
        ],
        open: false,
        compile(token) {
          const expression = token.match[1];
          token.stack = Twig2.expression.compile.call(this, {
            type: Twig2.expression.type.expression,
            value: expression
          }).stack;
          delete token.match;
          return token;
        },
        parse(token, context, chain) {
          const state = this;
          return Twig2.expression.parseAsync.call(state, token.stack, context).then((result) => {
            if (chain && Twig2.lib.boolval(result)) {
              chain = false;
              return state.parseAsync(token.output, context);
            }
            return "";
          }).then((output2) => {
            return {
              chain,
              output: output2
            };
          });
        }
      },
      {
        /**
         * Else type logic tokens.
         *
         *  Format: {% else %}
         */
        type: Twig2.logic.type.else_,
        regex: /^else$/,
        next: [
          Twig2.logic.type.endif,
          Twig2.logic.type.endfor
        ],
        open: false,
        parse(token, context, chain) {
          let promise = Twig2.Promise.resolve("");
          const state = this;
          if (chain) {
            promise = state.parseAsync(token.output, context);
          }
          return promise.then((output2) => {
            return {
              chain,
              output: output2
            };
          });
        }
      },
      {
        /**
         * End if type logic tokens.
         *
         *  Format: {% endif %}
         */
        type: Twig2.logic.type.endif,
        regex: /^endif$/,
        next: [],
        open: false
      },
      {
        /**
         * For type logic tokens.
         *
         *  Format: {% for expression %}
         */
        type: Twig2.logic.type.for_,
        regex: /^for\s+([a-zA-Z0-9_,\s]+)\s+in\s+([\S\s]+?)(?:\s+if\s+([^\s].*))?$/,
        next: [
          Twig2.logic.type.else_,
          Twig2.logic.type.endfor
        ],
        open: true,
        compile(token) {
          const keyValue = token.match[1];
          const expression = token.match[2];
          const conditional = token.match[3];
          let kvSplit = null;
          token.keyVar = null;
          token.valueVar = null;
          if (keyValue.includes(",")) {
            kvSplit = keyValue.split(",");
            if (kvSplit.length === 2) {
              token.keyVar = kvSplit[0].trim();
              token.valueVar = kvSplit[1].trim();
            } else {
              throw new Twig2.Error("Invalid expression in for loop: " + keyValue);
            }
          } else {
            token.valueVar = keyValue.trim();
          }
          token.expression = Twig2.expression.compile.call(this, {
            type: Twig2.expression.type.expression,
            value: expression
          }).stack;
          if (conditional) {
            token.conditional = Twig2.expression.compile.call(this, {
              type: Twig2.expression.type.expression,
              value: conditional
            }).stack;
          }
          delete token.match;
          return token;
        },
        parse(token, context, continueChain) {
          const output2 = [];
          let len;
          let index = 0;
          let keyset;
          const state = this;
          const { conditional } = token;
          const buildLoop = function(index2, len2) {
            const isConditional = conditional !== void 0;
            return {
              index: index2 + 1,
              index0: index2,
              revindex: isConditional ? void 0 : len2 - index2,
              revindex0: isConditional ? void 0 : len2 - index2 - 1,
              first: index2 === 0,
              last: isConditional ? void 0 : index2 === len2 - 1,
              length: isConditional ? void 0 : len2,
              parent: context
            };
          };
          const loop = function(key2, value) {
            const innerContext = { ...context };
            innerContext[token.valueVar] = value;
            if (token.keyVar) {
              innerContext[token.keyVar] = key2;
            }
            innerContext.loop = buildLoop(index, len);
            const promise = conditional === void 0 ? Twig2.Promise.resolve(true) : Twig2.expression.parseAsync.call(state, conditional, innerContext);
            return promise.then((condition) => {
              if (!condition) {
                return;
              }
              return state.parseAsync(token.output, innerContext).then((tokenOutput) => {
                output2.push(tokenOutput);
                index += 1;
              });
            }).then(() => {
              delete innerContext.loop;
              delete innerContext[token.valueVar];
              delete innerContext[token.keyVar];
              Twig2.merge(context, innerContext, true);
            });
          };
          return Twig2.expression.parseAsync.call(state, token.expression, context).then((result) => {
            if (Array.isArray(result)) {
              len = result.length;
              return Twig2.async.forEach(result, (value) => {
                const key2 = index;
                return loop(key2, value);
              });
            }
            if (Twig2.lib.is("Object", result)) {
              if (result._keys === void 0) {
                keyset = Object.keys(result);
              } else {
                keyset = result._keys;
              }
              len = keyset.length;
              return Twig2.async.forEach(keyset, (key2) => {
                if (key2 === "_keys") {
                  return;
                }
                return loop(key2, result[key2]);
              });
            }
          }).then(() => {
            continueChain = output2.length === 0;
            return {
              chain: continueChain,
              context,
              output: Twig2.output.call(state.template, output2)
            };
          });
        }
      },
      {
        /**
         * End for type logic tokens.
         *
         *  Format: {% endfor %}
         */
        type: Twig2.logic.type.endfor,
        regex: /^endfor$/,
        next: [],
        open: false
      },
      {
        /**
         * Set type logic tokens.
         *
         *  Format: {% set key = expression %}
         */
        type: Twig2.logic.type.set,
        regex: /^set\s+([a-zA-Z0-9_,\s]+)\s*=\s*([\s\S]+)$/,
        next: [],
        open: true,
        compile(token) {
          const key2 = token.match[1].trim();
          const expression = token.match[2];
          const expressionStack = Twig2.expression.compile.call(this, {
            type: Twig2.expression.type.expression,
            value: expression
          }).stack;
          token.key = key2;
          token.expression = expressionStack;
          delete token.match;
          return token;
        },
        parse(token, context, continueChain) {
          const { key: key2 } = token;
          const state = this;
          return Twig2.expression.parseAsync.call(state, token.expression, context).then((value) => {
            if (value === context) {
              value = { ...value };
            }
            context[key2] = value;
            return {
              chain: continueChain,
              context
            };
          });
        }
      },
      {
        /**
         * Set capture type logic tokens.
         *
         *  Format: {% set key %}
         */
        type: Twig2.logic.type.setcapture,
        regex: /^set\s+([a-zA-Z0-9_,\s]+)$/,
        next: [
          Twig2.logic.type.endset
        ],
        open: true,
        compile(token) {
          const key2 = token.match[1].trim();
          token.key = key2;
          delete token.match;
          return token;
        },
        parse(token, context, continueChain) {
          const state = this;
          const { key: key2 } = token;
          return state.parseAsync(token.output, context).then((output2) => {
            state.context[key2] = output2;
            context[key2] = output2;
            return {
              chain: continueChain,
              context
            };
          });
        }
      },
      {
        /**
         * End set type block logic tokens.
         *
         *  Format: {% endset %}
         */
        type: Twig2.logic.type.endset,
        regex: /^endset$/,
        next: [],
        open: false
      },
      {
        /**
         * Filter logic tokens.
         *
         *  Format: {% filter upper %} or {% filter lower|escape %}
         */
        type: Twig2.logic.type.filter,
        regex: /^filter\s+(.+)$/,
        next: [
          Twig2.logic.type.endfilter
        ],
        open: true,
        compile(token) {
          const expression = "|" + token.match[1].trim();
          token.stack = Twig2.expression.compile.call(this, {
            type: Twig2.expression.type.expression,
            value: expression
          }).stack;
          delete token.match;
          return token;
        },
        parse(token, context, chain) {
          const state = this;
          return state.parseAsync(token.output, context).then((output2) => {
            const stack = [{
              type: Twig2.expression.type.string,
              value: output2
            }].concat(token.stack);
            return Twig2.expression.parseAsync.call(state, stack, context);
          }).then((output2) => {
            return {
              chain,
              output: output2
            };
          });
        }
      },
      {
        /**
         * End filter logic tokens.
         *
         *  Format: {% endfilter %}
         */
        type: Twig2.logic.type.endfilter,
        regex: /^endfilter$/,
        next: [],
        open: false
      },
      {
        /**
         * Apply logic tokens.
         *
         *  Format: {% apply upper %} or {% apply lower|escape %}
         */
        type: Twig2.logic.type.apply,
        regex: /^apply\s+(.+)$/,
        next: [
          Twig2.logic.type.endapply
        ],
        open: true,
        compile(token) {
          const expression = "|" + token.match[1].trim();
          token.stack = Twig2.expression.compile.call(this, {
            type: Twig2.expression.type.expression,
            value: expression
          }).stack;
          delete token.match;
          return token;
        },
        parse(token, context, chain) {
          const state = this;
          return state.parseAsync(token.output, context).then((output2) => {
            const stack = [{
              type: Twig2.expression.type.string,
              value: output2
            }].concat(token.stack);
            return Twig2.expression.parseAsync.call(state, stack, context);
          }).then((output2) => {
            return {
              chain,
              output: output2
            };
          });
        }
      },
      {
        /**
         * End apply logic tokens.
         *
         *  Format: {% endapply %}
         */
        type: Twig2.logic.type.endapply,
        regex: /^endapply$/,
        next: [],
        open: false
      },
      {
        /**
         * Set type logic tokens.
         *
         *  Format: {% do expression %}
         */
        type: Twig2.logic.type.do,
        regex: /^do\s+([\S\s]+)$/,
        next: [],
        open: true,
        compile(token) {
          const expression = token.match[1];
          const expressionStack = Twig2.expression.compile.call(this, {
            type: Twig2.expression.type.expression,
            value: expression
          }).stack;
          token.expression = expressionStack;
          delete token.match;
          return token;
        },
        parse(token, context, continueChain) {
          const state = this;
          return Twig2.expression.parseAsync.call(state, token.expression, context).then(() => {
            return {
              chain: continueChain,
              context
            };
          });
        }
      },
      {
        /**
         * Block logic tokens.
         *
         *  Format: {% block title %}
         */
        type: Twig2.logic.type.block,
        regex: /^block\s+(\w+)$/,
        next: [
          Twig2.logic.type.endblock
        ],
        open: true,
        compile(token) {
          token.blockName = token.match[1].trim();
          delete token.match;
          return token;
        },
        parse(token, context, chain) {
          const state = this;
          let promise = Twig2.Promise.resolve();
          state.template.blocks.defined[token.blockName] = new Twig2.Block(state.template, token);
          if (state.template.parentTemplate === null || state.template.parentTemplate instanceof Twig2.Template) {
            promise = state.getBlock(token.blockName).render(state, context);
          }
          return promise.then((output2) => {
            return {
              chain,
              output: output2
            };
          });
        }
      },
      {
        /**
         * Block shorthand logic tokens.
         *
         *  Format: {% block title expression %}
         */
        type: Twig2.logic.type.shortblock,
        regex: /^block\s+(\w+)\s+(.+)$/,
        next: [],
        open: true,
        compile(token) {
          const template = this;
          token.expression = token.match[2].trim();
          token.output = Twig2.expression.compile({
            type: Twig2.expression.type.expression,
            value: token.expression
          }).stack;
          return Twig2.logic.handler[Twig2.logic.type.block].compile.apply(template, [token]);
        },
        parse(...args) {
          const state = this;
          return Twig2.logic.handler[Twig2.logic.type.block].parse.apply(state, args);
        }
      },
      {
        /**
         * End block logic tokens.
         *
         *  Format: {% endblock %}
         */
        type: Twig2.logic.type.endblock,
        regex: /^endblock(?:\s+(\w+))?$/,
        next: [],
        open: false
      },
      {
        /**
         * Block logic tokens.
         *
         *  Format: {% extends "template.twig" %}
         */
        type: Twig2.logic.type.extends_,
        regex: /^extends\s+(.+)$/,
        next: [],
        open: true,
        compile(token) {
          const expression = token.match[1].trim();
          delete token.match;
          token.stack = Twig2.expression.compile.call(this, {
            type: Twig2.expression.type.expression,
            value: expression
          }).stack;
          return token;
        },
        parse(token, context, chain) {
          const state = this;
          return Twig2.expression.parseAsync.call(state, token.stack, context).then((fileName) => {
            if (Array.isArray(fileName)) {
              const result = fileName.reverse().reduce((acc, file) => {
                try {
                  return {
                    render: state.template.importFile(file),
                    fileName: file
                  };
                } catch (error) {
                  return acc;
                }
              }, {
                render: null,
                fileName: null
              });
              if (result.fileName !== null) {
                state.template.parentTemplate = result.fileName;
              }
            } else {
              state.template.parentTemplate = fileName;
            }
            return {
              chain,
              output: ""
            };
          });
        }
      },
      {
        /**
         * Block logic tokens.
         *
         *  Format: {% use "template.twig" %}
         */
        type: Twig2.logic.type.use,
        regex: /^use\s+(.+)$/,
        next: [],
        open: true,
        compile(token) {
          const expression = token.match[1].trim();
          delete token.match;
          token.stack = Twig2.expression.compile.call(this, {
            type: Twig2.expression.type.expression,
            value: expression
          }).stack;
          return token;
        },
        parse(token, context, chain) {
          const state = this;
          return Twig2.expression.parseAsync.call(state, token.stack, context).then((filePath) => {
            const useTemplate = state.template.importFile(filePath);
            const useState = new Twig2.ParseState(useTemplate);
            return useState.parseAsync(useTemplate.tokens).then(() => {
              state.template.blocks.imported = {
                ...state.template.blocks.imported,
                ...useState.getBlocks()
              };
            });
          }).then(() => {
            return {
              chain,
              output: ""
            };
          });
        }
      },
      {
        /**
         * Block logic tokens.
         *
         *  Format: {% includes "template.twig" [with {some: 'values'} only] %}
         */
        type: Twig2.logic.type.include,
        regex: /^include\s+(.+?)(?:\s|$)(ignore missing(?:\s|$))?(?:with\s+([\S\s]+?))?(?:\s|$)(only)?$/,
        next: [],
        open: true,
        compile(token) {
          const { match } = token;
          const expression = match[1].trim();
          const ignoreMissing = match[2] !== void 0;
          const withContext = match[3];
          const only = match[4] !== void 0 && match[4].length;
          delete token.match;
          token.only = only;
          token.ignoreMissing = ignoreMissing;
          token.stack = Twig2.expression.compile.call(this, {
            type: Twig2.expression.type.expression,
            value: expression
          }).stack;
          if (withContext !== void 0) {
            token.withStack = Twig2.expression.compile.call(this, {
              type: Twig2.expression.type.expression,
              value: withContext.trim()
            }).stack;
          }
          return token;
        },
        parse(token, context, chain) {
          let innerContext = token.only ? {} : { ...context };
          const { ignoreMissing } = token;
          const state = this;
          let promise = null;
          const result = { chain, output: "" };
          if (typeof token.withStack === "undefined") {
            promise = Twig2.Promise.resolve();
          } else {
            promise = Twig2.expression.parseAsync.call(state, token.withStack, context).then((withContext) => {
              innerContext = {
                ...innerContext,
                ...withContext
              };
            });
          }
          return promise.then(() => {
            return Twig2.expression.parseAsync.call(state, token.stack, context);
          }).then((file) => {
            let files;
            if (Array.isArray(file)) {
              files = file;
            } else {
              files = [file];
            }
            const result2 = files.reduce((acc, file2) => {
              if (acc.render === null) {
                if (file2 instanceof Twig2.Template) {
                  return {
                    render: file2.renderAsync(
                      innerContext,
                      {
                        isInclude: true
                      }
                    ),
                    lastError: null
                  };
                }
                try {
                  return {
                    render: state.template.importFile(file2).renderAsync(
                      innerContext,
                      {
                        isInclude: true
                      }
                    ),
                    lastError: null
                  };
                } catch (error) {
                  return {
                    render: null,
                    lastError: error
                  };
                }
              }
              return acc;
            }, { render: null, lastError: null });
            if (result2.render !== null) {
              return result2.render;
            }
            if (result2.render === null && ignoreMissing) {
              return "";
            }
            throw result2.lastError;
          }).then((output2) => {
            if (output2 !== "") {
              result.output = output2;
            }
            return result;
          });
        }
      },
      {
        type: Twig2.logic.type.spaceless,
        regex: /^spaceless$/,
        next: [
          Twig2.logic.type.endspaceless
        ],
        open: true,
        // Parse the html and return it without any spaces between tags
        parse(token, context, chain) {
          const state = this;
          return state.parseAsync(token.output, context).then((tokenOutput) => {
            const rBetweenTagSpaces = />\s+</g;
            let output2 = tokenOutput.replace(rBetweenTagSpaces, "><").trim();
            output2 = new Twig2.Markup(output2);
            return {
              chain,
              output: output2
            };
          });
        }
      },
      // Add the {% endspaceless %} token
      {
        type: Twig2.logic.type.endspaceless,
        regex: /^endspaceless$/,
        next: [],
        open: false
      },
      {
        /**
         * Macro logic tokens.
         *
         * Format: {% macro input(name = default, value, type, size) %}
         *
         */
        type: Twig2.logic.type.macro,
        regex: /^macro\s+(\w+)\s*\(\s*((?:\w+(?:\s*=\s*([\s\S]+))?(?:,\s*)?)*)\s*\)$/,
        next: [
          Twig2.logic.type.endmacro
        ],
        open: true,
        compile(token) {
          const macroName = token.match[1];
          const rawParameters = token.match[2].split(/\s*,\s*/);
          const parameters = rawParameters.map((rawParameter) => {
            return rawParameter.split(/\s*=\s*/)[0];
          });
          const parametersCount = parameters.length;
          if (parametersCount > 1) {
            const uniq = {};
            for (let i = 0; i < parametersCount; i++) {
              const parameter = parameters[i];
              if (uniq[parameter]) {
                throw new Twig2.Error("Duplicate arguments for parameter: " + parameter);
              } else {
                uniq[parameter] = 1;
              }
            }
          }
          token.macroName = macroName;
          token.parameters = parameters;
          token.defaults = rawParameters.reduce(function(defaults2, rawParameter) {
            const pair = rawParameter.split(/\s*=\s*/);
            const key2 = pair[0];
            const expression = pair[1];
            if (expression) {
              defaults2[key2] = Twig2.expression.compile.call(this, {
                type: Twig2.expression.type.expression,
                value: expression
              }).stack;
            } else {
              defaults2[key2] = void 0;
            }
            return defaults2;
          }, {});
          delete token.match;
          return token;
        },
        parse(token, context, chain) {
          const state = this;
          state.macros[token.macroName] = function(...args) {
            const macroContext = {
              // Use current state context because state context includes current loop variables as well
              ...state.context,
              _self: state.macros
            };
            return Twig2.async.forEach(token.parameters, function(prop, i) {
              if (typeof args[i] !== "undefined") {
                macroContext[prop] = args[i];
                return true;
              }
              if (typeof token.defaults[prop] !== "undefined") {
                return Twig2.expression.parseAsync.call(this, token.defaults[prop], context).then((value) => {
                  macroContext[prop] = value;
                  return Twig2.Promise.resolve();
                });
              }
              macroContext[prop] = void 0;
              return true;
            }).then(() => {
              return state.parseAsync(token.output, macroContext);
            });
          };
          return {
            chain,
            output: ""
          };
        }
      },
      {
        /**
         * End macro logic tokens.
         *
         * Format: {% endmacro %}
         */
        type: Twig2.logic.type.endmacro,
        regex: /^endmacro$/,
        next: [],
        open: false
      },
      {
        /*
        * Import logic tokens.
        *
        * Format: {% import "template.twig" as form %}
        */
        type: Twig2.logic.type.import_,
        regex: /^import\s+(.+)\s+as\s+(\w+)$/,
        next: [],
        open: true,
        compile(token) {
          const expression = token.match[1].trim();
          const contextName = token.match[2].trim();
          delete token.match;
          token.expression = expression;
          token.contextName = contextName;
          token.stack = Twig2.expression.compile.call(this, {
            type: Twig2.expression.type.expression,
            value: expression
          }).stack;
          return token;
        },
        parse(token, context, chain) {
          const state = this;
          const output2 = {
            chain,
            output: ""
          };
          if (token.expression === "_self") {
            context[token.contextName] = state.macros;
            return output2;
          }
          return Twig2.expression.parseAsync.call(state, token.stack, context).then((filePath) => {
            return state.template.importFile(filePath || token.expression);
          }).then((importTemplate) => {
            const importState = new Twig2.ParseState(importTemplate);
            return importState.parseAsync(importTemplate.tokens).then(() => {
              context[token.contextName] = importState.macros;
              return output2;
            });
          });
        }
      },
      {
        /*
        * From logic tokens.
        *
        * Format: {% from "template.twig" import func as form %}
        */
        type: Twig2.logic.type.from,
        regex: /^from\s+(.+)\s+import\s+([a-zA-Z0-9_, ]+)$/,
        next: [],
        open: true,
        compile(token) {
          const expression = token.match[1].trim();
          const macroExpressions = token.match[2].trim().split(/\s*,\s*/);
          const macroNames = {};
          for (const res of macroExpressions) {
            const macroMatch = res.match(/^(\w+)\s+as\s+(\w+)$/);
            if (macroMatch) {
              macroNames[macroMatch[1].trim()] = macroMatch[2].trim();
            } else if (res.match(/^(\w+)$/)) {
              macroNames[res] = res;
            } else ;
          }
          delete token.match;
          token.expression = expression;
          token.macroNames = macroNames;
          token.stack = Twig2.expression.compile.call(this, {
            type: Twig2.expression.type.expression,
            value: expression
          }).stack;
          return token;
        },
        parse(token, context, chain) {
          const state = this;
          let promise;
          if (token.expression === "_self") {
            promise = Twig2.Promise.resolve(state.macros);
          } else {
            promise = Twig2.expression.parseAsync.call(state, token.stack, context).then((filePath) => {
              return state.template.importFile(filePath || token.expression);
            }).then((importTemplate) => {
              const importState = new Twig2.ParseState(importTemplate);
              return importState.parseAsync(importTemplate.tokens).then(() => {
                return importState.macros;
              });
            });
          }
          return promise.then((macros) => {
            for (const macroName in token.macroNames) {
              if (macros[macroName] !== void 0) {
                context[token.macroNames[macroName]] = macros[macroName];
              }
            }
            return {
              chain,
              output: ""
            };
          });
        }
      },
      {
        /**
         * The embed tag combines the behaviour of include and extends.
         * It allows you to include another template's contents, just like include does.
         *
         *  Format: {% embed "template.twig" [with {some: 'values'} only] %}
         */
        type: Twig2.logic.type.embed,
        regex: /^embed\s+(.+?)(?:\s+(ignore missing))?(?:\s+with\s+([\S\s]+?))?(?:\s+(only))?$/,
        next: [
          Twig2.logic.type.endembed
        ],
        open: true,
        compile(token) {
          const { match } = token;
          const expression = match[1].trim();
          const ignoreMissing = match[2] !== void 0;
          const withContext = match[3];
          const only = match[4] !== void 0 && match[4].length;
          delete token.match;
          token.only = only;
          token.ignoreMissing = ignoreMissing;
          token.stack = Twig2.expression.compile.call(this, {
            type: Twig2.expression.type.expression,
            value: expression
          }).stack;
          if (withContext !== void 0) {
            token.withStack = Twig2.expression.compile.call(this, {
              type: Twig2.expression.type.expression,
              value: withContext.trim()
            }).stack;
          }
          return token;
        },
        parse(token, context, chain) {
          let embedContext = {};
          let promise = Twig2.Promise.resolve();
          let state = this;
          if (!token.only) {
            embedContext = { ...context };
          }
          if (token.withStack !== void 0) {
            promise = Twig2.expression.parseAsync.call(state, token.withStack, context).then((withContext) => {
              embedContext = { ...embedContext, ...withContext };
            });
          }
          return promise.then(() => {
            return Twig2.expression.parseAsync.call(state, token.stack, embedContext);
          }).then((fileName) => {
            const embedOverrideTemplate = new Twig2.Template({
              data: token.output,
              base: state.template.base,
              path: state.template.path,
              url: state.template.url,
              name: state.template.name,
              method: state.template.method,
              options: state.template.options
            });
            try {
              embedOverrideTemplate.importFile(fileName);
            } catch (error) {
              if (token.ignoreMissing) {
                return "";
              }
              state = null;
              throw error;
            }
            embedOverrideTemplate.parentTemplate = fileName;
            return embedOverrideTemplate.renderAsync(
              embedContext,
              {
                isInclude: true
              }
            );
          }).then((output2) => {
            return {
              chain,
              output: output2
            };
          });
        }
      },
      /* Add the {% endembed %} token
       *
       */
      {
        type: Twig2.logic.type.endembed,
        regex: /^endembed$/,
        next: [],
        open: false
      },
      {
        /**
         * Block logic tokens.
         *
         *  Format: {% with {some: 'values'} [only] %}
         */
        type: Twig2.logic.type.with,
        regex: /^(?:with(?:\s+([\S\s]+?))?)(?:\s|$)(only)?$/,
        next: [
          Twig2.logic.type.endwith
        ],
        open: true,
        compile(token) {
          const { match } = token;
          const withContext = match[1];
          const only = match[2] !== void 0 && match[2].length;
          delete token.match;
          token.only = only;
          if (withContext !== void 0) {
            token.withStack = Twig2.expression.compile.call(this, {
              type: Twig2.expression.type.expression,
              value: withContext.trim()
            }).stack;
          }
          return token;
        },
        parse(token, context, chain) {
          let innerContext = {};
          let i;
          const state = this;
          let promise = Twig2.Promise.resolve();
          if (!token.only) {
            innerContext = { ...context };
          }
          if (token.withStack !== void 0) {
            promise = Twig2.expression.parseAsync.call(state, token.withStack, context).then((withContext) => {
              for (i in withContext) {
                if (Object.hasOwnProperty.call(withContext, i)) {
                  innerContext[i] = withContext[i];
                }
              }
            });
          }
          const isolatedState = new Twig2.ParseState(state.template, void 0, innerContext);
          return promise.then(() => {
            return isolatedState.parseAsync(token.output);
          }).then((output2) => {
            return {
              chain,
              output: output2
            };
          });
        }
      },
      {
        type: Twig2.logic.type.endwith,
        regex: /^endwith$/,
        next: [],
        open: false
      },
      {
        /**
         * Deprecated type logic tokens.
         *
         *  Format: {% deprecated 'Description' %}
         */
        type: Twig2.logic.type.deprecated,
        regex: /^deprecated\s+(.+)$/,
        next: [],
        open: true,
        compile(token) {
          console.warn("Deprecation notice: " + token.match[1]);
          return token;
        },
        parse() {
          return {};
        }
      }
    ];
    Twig2.logic.handler = {};
    Twig2.logic.extendType = function(type, value) {
      value = value || "Twig.logic.type" + type;
      Twig2.logic.type[type] = value;
    };
    Twig2.logic.extend = function(definition) {
      if (definition.type) {
        Twig2.logic.extendType(definition.type);
      } else {
        throw new Twig2.Error("Unable to extend logic definition. No type provided for " + definition);
      }
      Twig2.logic.handler[definition.type] = definition;
    };
    while (Twig2.logic.definitions.length > 0) {
      Twig2.logic.extend(Twig2.logic.definitions.shift());
    }
    Twig2.logic.compile = function(rawToken) {
      const expression = rawToken.value.trim();
      let token = Twig2.logic.tokenize.call(this, expression);
      const tokenTemplate = Twig2.logic.handler[token.type];
      if (tokenTemplate.compile) {
        token = tokenTemplate.compile.call(this, token);
        Twig2.log.trace("Twig.logic.compile: ", "Compiled logic token to ", token);
      }
      return token;
    };
    Twig2.logic.tokenize = function(expression) {
      let tokenTemplateType = null;
      let tokenType = null;
      let tokenRegex = null;
      let regexArray = null;
      let regexLen = null;
      let regexI = null;
      let match = null;
      expression = expression.trim();
      for (tokenTemplateType in Twig2.logic.handler) {
        if (Object.hasOwnProperty.call(Twig2.logic.handler, tokenTemplateType)) {
          tokenType = Twig2.logic.handler[tokenTemplateType].type;
          tokenRegex = Twig2.logic.handler[tokenTemplateType].regex;
          regexArray = tokenRegex;
          if (!Array.isArray(tokenRegex)) {
            regexArray = [tokenRegex];
          }
          regexLen = regexArray.length;
          for (regexI = 0; regexI < regexLen; regexI++) {
            match = regexArray[regexI].exec(expression);
            if (match !== null) {
              Twig2.log.trace("Twig.logic.tokenize: ", "Matched a ", tokenType, " regular expression of ", match);
              return {
                type: tokenType,
                match
              };
            }
          }
        }
      }
      throw new Twig2.Error("Unable to parse '" + expression.trim() + "'");
    };
    Twig2.logic.parse = function(token, context, chain, allowAsync) {
      return Twig2.async.potentiallyAsync(this, allowAsync, function() {
        Twig2.log.debug("Twig.logic.parse: ", "Parsing logic token ", token);
        const tokenTemplate = Twig2.logic.handler[token.type];
        let result;
        const state = this;
        if (!tokenTemplate.parse) {
          return "";
        }
        state.nestingStack.unshift(token);
        result = tokenTemplate.parse.call(state, token, context || {}, chain);
        if (Twig2.isPromise(result)) {
          result = result.then((result2) => {
            state.nestingStack.shift();
            return result2;
          });
        } else {
          state.nestingStack.shift();
        }
        return result;
      });
    };
    return Twig2;
  };
  return twig_logic;
}
var twig_parser_source;
var hasRequiredTwig_parser_source;
function requireTwig_parser_source() {
  if (hasRequiredTwig_parser_source) return twig_parser_source;
  hasRequiredTwig_parser_source = 1;
  twig_parser_source = function(Twig2) {
    Twig2.Templates.registerParser("source", (params) => {
      return params.data || "";
    });
  };
  return twig_parser_source;
}
var twig_parser_twig;
var hasRequiredTwig_parser_twig;
function requireTwig_parser_twig() {
  if (hasRequiredTwig_parser_twig) return twig_parser_twig;
  hasRequiredTwig_parser_twig = 1;
  twig_parser_twig = function(Twig2) {
    Twig2.Templates.registerParser("twig", (params) => {
      return new Twig2.Template(params);
    });
  };
  return twig_parser_twig;
}
var twig_path;
var hasRequiredTwig_path;
function requireTwig_path() {
  if (hasRequiredTwig_path) return twig_path;
  hasRequiredTwig_path = 1;
  twig_path = function(Twig2) {
    Twig2.path = {};
    Twig2.path.expandNamespace = function(namespaces, path) {
      const namespaceIdentifiers = Object.keys(namespaces);
      const pattern = new RegExp(`^(?:@(${namespaceIdentifiers.join("|")})/|(${namespaceIdentifiers.join("|")})::)`);
      return path.replace(pattern, (wholeMatch, atNamespace, colonNamespace) => {
        const namespaceIdentifier = atNamespace === void 0 ? colonNamespace : atNamespace;
        return `${namespaces[namespaceIdentifier]}/`;
      });
    };
    Twig2.path.parsePath = function(template, _file) {
      const { namespaces } = template.options;
      const file = _file || "";
      const hasNamespaces = namespaces && typeof namespaces === "object";
      let path = hasNamespaces ? Twig2.path.expandNamespace(namespaces, file) : file;
      if (path === file) {
        path = Twig2.path.relativePath(template, file);
      }
      return path;
    };
    Twig2.path.relativePath = function(template, _file) {
      let base;
      let basePath;
      let sepChr = "/";
      const newPath = [];
      let file = _file || "";
      let val;
      if (template.url) {
        if (typeof template.base === "undefined") {
          base = template.url;
        } else {
          base = template.base.replace(/([^/])$/, "$1/");
        }
      } else if (template.path) {
        const path = require$$0;
        const sep = path.sep || sepChr;
        const relative = new RegExp("^\\.{1,2}" + sep.replace("\\", "\\\\"));
        file = file.replace(/\//g, sep);
        if (template.base !== void 0 && file.match(relative) === null) {
          file = file.replace(template.base, "");
          base = template.base + sep;
        } else {
          base = path.normalize(template.path);
        }
        base = base.replace(sep + sep, sep);
        sepChr = sep;
      } else if ((template.name || template.id) && template.method && template.method !== "fs" && template.method !== "ajax") {
        base = template.base || template.name || template.id;
      } else {
        throw new Twig2.Error("Cannot extend an inline template.");
      }
      basePath = base.split(sepChr);
      basePath.pop();
      basePath = basePath.concat(file.split(sepChr));
      while (basePath.length > 0) {
        val = basePath.shift();
        if (val === ".") ;
        else if (val === ".." && newPath.length > 0 && newPath[newPath.length - 1] !== "..") {
          newPath.pop();
        } else {
          newPath.push(val);
        }
      }
      return newPath.join(sepChr);
    };
    return Twig2;
  };
  return twig_path;
}
var twig_tests;
var hasRequiredTwig_tests;
function requireTwig_tests() {
  if (hasRequiredTwig_tests) return twig_tests;
  hasRequiredTwig_tests = 1;
  twig_tests = function(Twig2) {
    Twig2.tests = {
      empty(value) {
        if (value === true) {
          return false;
        }
        if (value === null || value === void 0) {
          return true;
        }
        if (typeof value === "number") {
          return false;
        }
        if (value.length > 0) {
          return false;
        }
        for (const key2 in value) {
          if (Object.hasOwnProperty.call(value, key2)) {
            return false;
          }
        }
        return true;
      },
      odd(value) {
        return value % 2 === 1;
      },
      even(value) {
        return value % 2 === 0;
      },
      "divisible by"(value, params) {
        return value % params[0] === 0;
      },
      divisibleby(value, params) {
        console.warn("`divisibleby` is deprecated use `divisible by`");
        return Twig2.tests["divisible by"](value, params);
      },
      defined(value) {
        return value !== void 0;
      },
      none(value) {
        return value === null;
      },
      null(value) {
        return this.none(value);
      },
      "same as"(value, params) {
        return value === params[0];
      },
      sameas(value, params) {
        console.warn("`sameas` is deprecated use `same as`");
        return Twig2.tests["same as"](value, params);
      },
      iterable(value) {
        return value && (Twig2.lib.is("Array", value) || Twig2.lib.is("Object", value));
      }
      /*
      Constant ?
       */
    };
    Twig2.test = function(test, value, params) {
      if (!Twig2.tests[test]) {
        throw Twig2.Error("Test " + test + " is not defined.");
      }
      return Twig2.tests[test](value, params);
    };
    Twig2.test.extend = function(test, definition) {
      Twig2.tests[test] = definition;
    };
    return Twig2;
  };
  return twig_tests;
}
var twig_async;
var hasRequiredTwig_async;
function requireTwig_async() {
  if (hasRequiredTwig_async) return twig_async;
  hasRequiredTwig_async = 1;
  twig_async = function(Twig2) {
    const STATE_UNKNOWN = 0;
    const STATE_RESOLVED = 1;
    const STATE_REJECTED = 2;
    Twig2.ParseState.prototype.parseAsync = function(tokens, context) {
      return this.parse(tokens, context, true);
    };
    Twig2.expression.parseAsync = function(tokens, context, tokensAreParameters) {
      const state = this;
      return Twig2.expression.parse.call(state, tokens, context, tokensAreParameters, true);
    };
    Twig2.logic.parseAsync = function(token, context, chain) {
      const state = this;
      return Twig2.logic.parse.call(state, token, context, chain, true);
    };
    Twig2.Template.prototype.renderAsync = function(context, params) {
      return this.render(context, params, true);
    };
    Twig2.async = {};
    Twig2.isPromise = function(obj) {
      return obj && obj.then && typeof obj.then === "function";
    };
    function potentiallyAsyncSlow(that, allowAsync, action) {
      let result = action.call(that);
      let err = null;
      let isAsync = true;
      if (!Twig2.isPromise(result)) {
        return result;
      }
      result.then((res) => {
        result = res;
        isAsync = false;
      }).catch((error) => {
        err = error;
      });
      if (err !== null) {
        throw err;
      }
      if (isAsync) {
        throw new Twig2.Error("You are using Twig.js in sync mode in combination with async extensions.");
      }
      return result;
    }
    Twig2.async.potentiallyAsync = function(that, allowAsync, action) {
      if (allowAsync) {
        return Twig2.Promise.resolve(action.call(that));
      }
      return potentiallyAsyncSlow(that, allowAsync, action);
    };
    function run(fn, resolve2, reject) {
      try {
        fn(resolve2, reject);
      } catch (error) {
        reject(error);
      }
    }
    function pending(handlers, onResolved, onRejected) {
      const h = [onResolved, onRejected, -2];
      if (!handlers) {
        handlers = h;
      } else if (handlers[2] === -2) {
        handlers = [handlers, h];
      } else {
        handlers.push(h);
      }
      return handlers;
    }
    Twig2.Thenable = function(then, value, state) {
      this.then = then;
      this._value = state ? value : null;
      this._state = state || STATE_UNKNOWN;
    };
    Twig2.Thenable.prototype.catch = function(onRejected) {
      if (this._state === STATE_RESOLVED) {
        return this;
      }
      return this.then(null, onRejected);
    };
    Twig2.Thenable.resolvedThen = function(onResolved) {
      try {
        return Twig2.Promise.resolve(onResolved(this._value));
      } catch (error) {
        return Twig2.Promise.reject(error);
      }
    };
    Twig2.Thenable.rejectedThen = function(onResolved, onRejected) {
      if (!onRejected || typeof onRejected !== "function") {
        return this;
      }
      const value = this._value;
      let result;
      try {
        result = onRejected(value);
      } catch (error) {
        result = Twig2.Promise.reject(error);
      }
      return Twig2.Promise.resolve(result);
    };
    Twig2.Promise = function(executor) {
      let state = STATE_UNKNOWN;
      let value = null;
      let changeState = function(nextState, nextValue) {
        state = nextState;
        value = nextValue;
      };
      function onReady(v) {
        changeState(STATE_RESOLVED, v);
      }
      function onReject(e) {
        changeState(STATE_REJECTED, e);
      }
      run(executor, onReady, onReject);
      if (state === STATE_RESOLVED) {
        return Twig2.Promise.resolve(value);
      }
      if (state === STATE_REJECTED) {
        return Twig2.Promise.reject(value);
      }
      changeState = new Twig2.FullPromise();
      return changeState.promise;
    };
    Twig2.FullPromise = function() {
      let handlers = null;
      function resolved(onResolved) {
        onResolved(p._value);
      }
      function rejected(onResolved, onRejected) {
        onRejected(p._value);
      }
      let append = function(onResolved, onRejected) {
        handlers = pending(handlers, onResolved, onRejected);
      };
      function changeState(newState, v) {
        if (p._state) {
          return;
        }
        p._value = v;
        p._state = newState;
        append = newState === STATE_RESOLVED ? resolved : rejected;
        if (!handlers) {
          return;
        }
        if (handlers[2] === -2) {
          append(handlers[0], handlers[1]);
          handlers = null;
          return;
        }
        handlers.forEach((h) => {
          append(h[0], h[1]);
        });
        handlers = null;
      }
      const p = new Twig2.Thenable((onResolved, onRejected) => {
        const hasResolved = typeof onResolved === "function";
        if (p._state === STATE_RESOLVED && !hasResolved) {
          return Twig2.Promise.resolve(p._value);
        }
        if (p._state === STATE_RESOLVED) {
          try {
            return Twig2.Promise.resolve(onResolved(p._value));
          } catch (error) {
            return Twig2.Promise.reject(error);
          }
        }
        const hasRejected = typeof onRejected === "function";
        return new Twig2.Promise((resolve2, reject) => {
          append(
            hasResolved ? (result) => {
              try {
                resolve2(onResolved(result));
              } catch (error) {
                reject(error);
              }
            } : resolve2,
            hasRejected ? (err) => {
              try {
                resolve2(onRejected(err));
              } catch (error) {
                reject(error);
              }
            } : reject
          );
        });
      });
      changeState.promise = p;
      return changeState;
    };
    Twig2.Promise.defaultResolved = new Twig2.Thenable(Twig2.Thenable.resolvedThen, void 0, STATE_RESOLVED);
    Twig2.Promise.emptyStringResolved = new Twig2.Thenable(Twig2.Thenable.resolvedThen, "", STATE_RESOLVED);
    Twig2.Promise.resolve = function(value) {
      if (arguments.length === 0 || typeof value === "undefined") {
        return Twig2.Promise.defaultResolved;
      }
      if (Twig2.isPromise(value)) {
        return value;
      }
      if (value === "") {
        return Twig2.Promise.emptyStringResolved;
      }
      return new Twig2.Thenable(Twig2.Thenable.resolvedThen, value, STATE_RESOLVED);
    };
    Twig2.Promise.reject = function(e) {
      return new Twig2.Thenable(Twig2.Thenable.rejectedThen, e, STATE_REJECTED);
    };
    Twig2.Promise.all = function(promises) {
      const results = new Array(promises.length);
      return Twig2.async.forEach(promises, (p, index) => {
        if (!Twig2.isPromise(p)) {
          results[index] = p;
          return;
        }
        if (p._state === STATE_RESOLVED) {
          results[index] = p._value;
          return;
        }
        return p.then((v) => {
          results[index] = v;
        });
      }).then(() => {
        return results;
      });
    };
    Twig2.async.forEach = function(arr, callback) {
      const len = arr ? arr.length : 0;
      let index = 0;
      function next() {
        let resp = null;
        do {
          if (index === len) {
            return Twig2.Promise.resolve();
          }
          resp = callback(arr[index], index);
          index++;
        } while (!resp || !Twig2.isPromise(resp) || resp._state === STATE_RESOLVED);
        return resp.then(next);
      }
      return next();
    };
    return Twig2;
  };
  return twig_async;
}
var twig_exports;
var hasRequiredTwig_exports;
function requireTwig_exports() {
  if (hasRequiredTwig_exports) return twig_exports;
  hasRequiredTwig_exports = 1;
  twig_exports = function(Twig2) {
    Twig2.exports = {
      VERSION: Twig2.VERSION
    };
    Twig2.exports.twig = function(params) {
      const { id } = params;
      const options = {
        strictVariables: params.strict_variables || false,
        // TODO: turn autoscape on in the next major version
        autoescape: params.autoescape !== null && params.autoescape || false,
        allowInlineIncludes: params.allowInlineIncludes || false,
        rethrow: params.rethrow || false,
        namespaces: params.namespaces
      };
      if (Twig2.cache && id) {
        Twig2.validateId(id);
      }
      if (params.debug !== void 0) {
        Twig2.debug = params.debug;
      }
      if (params.trace !== void 0) {
        Twig2.trace = params.trace;
      }
      if (params.data !== void 0) {
        return Twig2.Templates.parsers.twig({
          data: params.data,
          path: Object.hasOwnProperty.call(params, "path") ? params.path : void 0,
          module: params.module,
          id,
          options
        });
      }
      if (params.ref !== void 0) {
        if (params.id !== void 0) {
          throw new Twig2.Error("Both ref and id cannot be set on a twig.js template.");
        }
        return Twig2.Templates.load(params.ref);
      }
      if (params.method !== void 0) {
        if (!Twig2.Templates.isRegisteredLoader(params.method)) {
          throw new Twig2.Error('Loader for "' + params.method + '" is not defined.');
        }
        return Twig2.Templates.loadRemote(params.name || params.href || params.path || id || void 0, {
          id,
          method: params.method,
          parser: params.parser || "twig",
          base: params.base,
          module: params.module,
          precompiled: params.precompiled,
          async: params.async,
          options
        }, params.load, params.error);
      }
      if (params.href !== void 0) {
        return Twig2.Templates.loadRemote(params.href, {
          id,
          method: "ajax",
          parser: params.parser || "twig",
          base: params.base,
          module: params.module,
          precompiled: params.precompiled,
          async: params.async,
          options
        }, params.load, params.error);
      }
      if (params.path !== void 0) {
        return Twig2.Templates.loadRemote(params.path, {
          id,
          method: "fs",
          parser: params.parser || "twig",
          base: params.base,
          module: params.module,
          precompiled: params.precompiled,
          async: params.async,
          options
        }, params.load, params.error);
      }
    };
    Twig2.exports.extendFilter = function(filter, definition) {
      Twig2.filter.extend(filter, definition);
    };
    Twig2.exports.extendFunction = function(fn, definition) {
      Twig2._function.extend(fn, definition);
    };
    Twig2.exports.extendTest = function(test, definition) {
      Twig2.test.extend(test, definition);
    };
    Twig2.exports.extendTag = function(definition) {
      Twig2.logic.extend(definition);
    };
    Twig2.exports.extend = function(fn) {
      fn(Twig2);
    };
    Twig2.exports.compile = function(markup, options) {
      const id = options.filename;
      const path = options.filename;
      const template = new Twig2.Template({
        data: markup,
        path,
        id,
        options: options.settings["twig options"]
      });
      return function(context) {
        return template.render(context);
      };
    };
    Twig2.exports.renderFile = function(path, options, fn) {
      if (typeof options === "function") {
        fn = options;
        options = {};
      }
      options = options || {};
      const settings = options.settings || {};
      const viewOptions = settings["twig options"];
      const params = {
        path,
        base: settings.views,
        load(template) {
          if (!viewOptions || !viewOptions.allowAsync) {
            fn(null, String(template.render(options)));
            return;
          }
          template.renderAsync(options).then((out) => fn(null, out), fn);
        },
        error(err) {
          fn(err);
        }
      };
      if (viewOptions) {
        for (const option in viewOptions) {
          if (Object.hasOwnProperty.call(viewOptions, option)) {
            params[option] = viewOptions[option];
          }
        }
      }
      Twig2.exports.twig(params);
    };
    Twig2.exports.__express = Twig2.exports.renderFile;
    Twig2.exports.cache = function(cache) {
      Twig2.cache = cache;
    };
    Twig2.exports.path = Twig2.path;
    Twig2.exports.filters = Twig2.filters;
    Twig2.exports.tests = Twig2.tests;
    Twig2.exports.functions = Twig2.functions;
    Twig2.exports.Promise = Twig2.Promise;
    return Twig2;
  };
  return twig_exports;
}
var twig_factory = function factory() {
  const Twig2 = {
    VERSION: "1.17.1"
  };
  requireTwig_core()(Twig2);
  requireTwig_compiler()(Twig2);
  requireTwig_expression()(Twig2);
  requireTwig_filters()(Twig2);
  requireTwig_functions()(Twig2);
  requireTwig_lib()(Twig2);
  requireTwig_loader_ajax()(Twig2);
  requireTwig_loader_fs()(Twig2);
  requireTwig_logic()(Twig2);
  requireTwig_parser_source()(Twig2);
  requireTwig_parser_twig()(Twig2);
  requireTwig_path()(Twig2);
  requireTwig_tests()(Twig2);
  requireTwig_async()(Twig2);
  requireTwig_exports()(Twig2);
  Twig2.exports.factory = factory;
  return Twig2.exports;
};
/**
 * Twig.js
 *
 * @copyright 2011-2020 John Roepke and the Twig.js Contributors
 * @license   Available under the BSD 2-Clause License
 * @link      https://github.com/twigjs/twig.js
 */
var twig = twig_factory();
const Twig = /* @__PURE__ */ getDefaultExportFromCjs(twig);
const attrs = {
  init: "data-live-demo-init",
  context: "data-live-demo",
  options: "data-live-demo-options"
};
const attrSelector = (key2) => `[${attrs[key2]}]`;
const attrSelectorInitial = (key2) => `${attrSelector(key2)}:not([${attrs.init}])`;
const queryAllInitial = (key2) => document.querySelectorAll(attrSelectorInitial(key2));
const debugLog = (...msgs) => console.log("Live Demo:", ...msgs);
const defaults = {
  display: "[data-live-demo-display]",
  form: "[data-live-demo-form]"
};
function init() {
  setup();
}
function setup() {
  queryAllInitial("context").forEach((context) => {
    const optionsScript = context.querySelector(attrSelector("options"));
    if (!optionsScript) {
      console.error("Missing options", context);
      return;
    }
    const options = JSON.parse(optionsScript.innerHTML);
    context.setAttribute(attrs.init, "");
    setupInstance({ context, ...options });
  });
}
function setupInstance(userOptions) {
  const options = Object.assign({}, defaults, userOptions);
  const { context, debug } = options;
  if (debug) {
    debugLog("options:", options);
  }
  const form = getElement(options.form, context);
  const display = getElement(options.display, context);
  if (!form || !display) {
    throw new Error("Unable to locate form or display for live demo", options);
  }
  const twigTemplate = Twig.twig({
    data: options.template
  });
  if (debug) {
    debugLog("twigTemplate", twigTemplate);
  }
  render();
  form.addEventListener("change", update);
  function update() {
    render();
    dispatchCoreEvent("pageModified", context);
  }
  function render() {
    const formData = new FormData(form);
    const values = {};
    formData.forEach((value, key2) => {
      values[key2] = value;
    });
    const markup = twigTemplate.render(values);
    if (debug) {
      debugLog("Data Passed by Form to template:", values);
      debugLog("Markup from rendering template:", markup);
    }
    display.innerHTML = markup;
  }
}
window.Ulu = ulu;
set({ debug: true });
updateSetting("cssvarPrefix", "site");
configureIcons();
init$c();
init$e();
init$b();
init$2();
init$4();
init$d();
init$g();
init$8();
init$6();
init$9();
init$a();
init$7();
init$5();
init$f();
init$3();
init$h();
setConfig({
  onChange(container, value) {
    const isList = value === "list";
    const cards = container.querySelectorAll(".card");
    const cardGrid = container.querySelector(".card-grid");
    if (cards) {
      cards.forEach((card) => {
        card.classList[isList ? "add" : "remove"]("card--horizontal");
      });
    }
    if (cardGrid) {
      cardGrid.classList[isList ? "add" : "remove"]("card-grid--one-column");
    }
  }
});
init$1();
init();
{
  __vitePreload(() => import("./chunks/modulepreload-polyfill.DaKOjhqt.js"), true ? [] : void 0, import.meta.url);
}
