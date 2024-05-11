var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/docs/assets//" + dep;
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
    const e = new Event("vite:preloadError", { cancelable: true });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  });
};
function removeArrayElement(array, element) {
  var index = array.indexOf(element);
  if (index > -1) {
    array.splice(index, 1);
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
function logError$1(context, ...messages) {
  {
    output("error", context, messages);
  }
}
window.addEventListener(getName$1("pageResized"), () => {
  CssBreakpoints.instances.forEach((i) => i.update());
});
const _CssBreakpoints = class _CssBreakpoints {
  /**
   * @param {Object} config Configruation object
   * @param {Array} config.order Array of strings that correspond to the breakpoints setup in the styles, Breakpoints from smallest to largest, defaults to [small, medium, large]
   * @param {Array} config.customProperty Property to grab breakpoint from (default is --breakpoint)
   * @param {Array} config.valueFromPsuedo Use the legacy method of grabbing breakpoint from psuedo element, default uses custom property
   * @param {Node} config.element The element to retrieve active breakpoint from stylesheet. (default is html) For using the old psuedo method, adjust this to document.body
   * @param {String} config.psuedoSelector Change psuedo selector used to get the breakpoint from the psuedo's content property
   */
  constructor(config2) {
    Object.assign(this, _CssBreakpoints.defaults, config2);
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
    _CssBreakpoints.instances.push(this);
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
    const index = this.order.indexOf(name);
    this.active = name;
    this.activeIndex = index;
    const activeBreakpoint = this.at(this.active);
    const mapBreakpoints = (n) => this.at(n);
    const max2 = this.order.slice(index).map(mapBreakpoints);
    const notMax = this.order.slice(0, index).map(mapBreakpoints);
    const min2 = this.order.slice(0, index + 1).map(mapBreakpoints);
    const notMin = this.order.slice(index + 1).map(mapBreakpoints);
    const notOnly = this.order.slice().map(mapBreakpoints);
    notOnly.splice(index, 1);
    log(this, "max:", max2.map((b) => b.name).join());
    log(this, "min:", min2.map((b) => b.name).join());
    max2.forEach((b) => b._setDirection("max", true));
    min2.forEach((b) => b._setDirection("min", true));
    activeBreakpoint._setDirection("only", true);
    notMax.forEach((b) => b._setDirection("max", false));
    notMin.forEach((b) => b._setDirection("min", false));
    notOnly.forEach((b) => b._setDirection("only", false));
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
      logError$1(this, "Unable to find breakpoint for:", bp);
    }
    return bp;
  }
};
__publicField(_CssBreakpoints, "instances", []);
__publicField(_CssBreakpoints, "defaults", {
  element: document.documentElement,
  valueFromPsuedo: false,
  customProperty: "--breakpoint",
  psuedoSelector: ":before",
  order: ["none", "small", "medium", "large"],
  debug: false
});
let CssBreakpoints = _CssBreakpoints;
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
function init$2(selector = "[data-grid]", classes) {
  document.addEventListener(getName$1("pageModified"), () => setup(selector));
  document.addEventListener(getName$1("pageResized"), () => setup(selector));
  setup(selector);
}
function setup(selector, classes) {
  document.querySelectorAll(selector).forEach((element) => setPositionClasses(element, void 0));
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
    if (lastY !== y)
      rows.push([]);
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
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
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
  return getWindow(element).getComputedStyle(element);
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
  const win = getWindow(scrollableAncestor);
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
  const win = getWindow(element);
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
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
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
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
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
      currentWin = getWindow(currentIFrame);
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
  const win = getWindow(element);
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
  const win = getWindow(element);
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
const platform = {
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
    platform,
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
const instances$1 = /* @__PURE__ */ new WeakMap();
const logError = (...msgs) => console.error("@ulu (popovers):", ...msgs);
const attrs = {
  trigger: "data-ulu-popover-trigger",
  content: "data-ulu-popover-content",
  arrow: "data-ulu-popover-arrow"
};
const attrSelector = (key) => `[${attrs[key]}]`;
function init$1() {
  document.addEventListener(getName$1("pageModified"), setupAll);
  setupAll();
}
function setupAll() {
  const triggers = document.querySelectorAll(attrSelector("trigger"));
  const resolved = Array.from(triggers).filter((trigger) => !instances$1.has(trigger)).map(resolve).filter((v) => v);
  resolved.forEach(({ elements, options, floatingOptions }) => {
    instances$1.set(elements.trigger, new Popover(elements, options, floatingOptions));
  });
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
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var ariaTablist_min = { exports: {} };
(function(module, exports) {
  !function(t, e) {
    module.exports = e();
  }(window, function() {
    return function(t) {
      var e = {};
      function i(a) {
        if (e[a])
          return e[a].exports;
        var s = e[a] = { i: a, l: false, exports: {} };
        return t[a].call(s.exports, s, s.exports, i), s.l = true, s.exports;
      }
      return i.m = t, i.c = e, i.d = function(t2, e2, a) {
        i.o(t2, e2) || Object.defineProperty(t2, e2, { enumerable: true, get: a });
      }, i.r = function(t2) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
      }, i.t = function(t2, e2) {
        if (1 & e2 && (t2 = i(t2)), 8 & e2)
          return t2;
        if (4 & e2 && "object" == typeof t2 && t2 && t2.__esModule)
          return t2;
        var a = /* @__PURE__ */ Object.create(null);
        if (i.r(a), Object.defineProperty(a, "default", { enumerable: true, value: t2 }), 2 & e2 && "string" != typeof t2)
          for (var s in t2)
            i.d(a, s, (function(e3) {
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
        for (var e2 in void 0 === t2 && (t2 = {}), this.delay = 0, this.deletable = false, this.focusableTabs = false, this.focusablePanels = true, this.arrowActivation = false, this.allArrows = false, this.tabSelector = '[role="tab"]', this.tabindex = 0, t2)
          t2.hasOwnProperty(e2) && void 0 !== t2[e2] && (this[e2] = t2[e2]);
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
          if (void 0 === e2 && (e2 = []), this.options && "function" == typeof this.options[t3])
            return this.options[t3].apply(this.api, e2);
        }, t2.prototype.makeFocusable = function() {
          for (var t3 = "" + (this.options.tabindex || 0), e2 = 0, i2 = this.tabs.length; e2 < i2; e2 += 1)
            if (v(this.tabs[e2], "tabindex") === t3)
              return;
          y(this.tabs[0], "tabindex", t3);
        }, t2.prototype.setCoreAttributes = function(t3, e2, i2) {
          var a2 = this.options.tabindex || "0";
          this.options.focusableTabs && y(t3, "tabindex", a2), this.options.focusablePanels && y(e2, "tabindex", a2), t3.id || y(t3, "id", "aria-tablist-" + m + "-tab-" + i2), e2.id || y(e2, "id", "aria-tablist-" + m + "-panel-" + i2), y(t3, "role", "tab"), y(e2, "role", "tabpanel"), y(t3, "aria-controls", e2.id), y(e2, "aria-labelledby", t3.id);
        }, t2.prototype.getTabPanel = function(t3) {
          var e2 = "number" == typeof t3 ? this.tabs[t3] : t3;
          if (!e2 || 1 !== e2.nodeType)
            return null;
          var i2 = "number" == typeof t3 ? this.panels[t3] : null;
          if (i2)
            return i2;
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
            if (this.elementIsTab(e2))
              return this.checkMultiple(), f(t3), this.activateTabWithTimer(e2, false);
            e2 = e2.parentElement || e2.parentNode;
          } while (null !== e2 && 1 === e2.nodeType);
        }, t2.prototype.tabKeydownEvent = function(t3) {
          if (this.elementIsTab(t3.target))
            switch (t3.keyCode) {
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
          if (this.elementIsTab(e2))
            switch (t3.keyCode) {
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
            if (this.multiple && s2 && !i2)
              return this.deactivateTab(a2), void this.makeFocusable();
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
            if (i2 && "true" !== v(e2, "aria-selected"))
              return void this.activateTabWithTimer(e2);
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
const errorHeader = "Site Tablist [data-site-tablist] error:";
const instances = [];
window.addEventListener("load", () => {
  initWithin(document);
  instances.forEach(openByCurrentHash);
});
document.addEventListener("pageModified", (e) => initWithin(e.target));
function initWithin(context) {
  if (!context)
    return;
  const tablists = context.querySelectorAll("[data-site-tablist]");
  tablists.forEach(init);
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
function init(element) {
  let options = {};
  const config2 = {};
  if (element.dataset.siteTablist) {
    try {
      options = JSON.parse(element.dataset.siteTablist);
    } catch (e) {
      console.error(errorHeader, "(JSON Parse for options)", element);
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
function setHeights(element) {
  const tabs = [...element.children];
  const panels = tabs.map((n) => document.querySelector(`[aria-labelledby="${n.id}"]`));
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
init$2();
init$1();
{
  __vitePreload(() => import("./chunks/modulepreload-polyfill.BoyGcPDr.js"), true ? [] : void 0);
}
