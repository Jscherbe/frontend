/**
 * @module ui/breakpoints
 */

// Pass breakpoints from CSS to stylesheet, use this to attach behaviors on breakpoints
import { removeArrayElement } from "@ulu/utils/array.js";
import { getName } from "../events/index.js";
import { wrapSettingString } from "../settings.js";
import { getCustomProperty } from "../utils/css.js";
import { log, logError } from "../utils/class-logger.js";

const getDefaultCustomProperty = prefix => getCustomProperty(prefix, "breakpoint");

// Resize Handler to update breakpoints for all instances (Called after resize finished)
window.addEventListener(getName("pageResized"), () => {
  BreakpointManager.instances.forEach(i => i.update());
});

/**
 * @class
 * Class that provides method for retrieving and acting on breakpoints passed
 * from CSS (using element pseudo content prop)
 */
export class BreakpointManager {
  static instances = [];
  static defaults = {
    element: document?.documentElement,
    valueFromPseudo: false,
    customProperty: "--breakpoint",
    customProperty: wrapSettingString("cssvarPrefix", getDefaultCustomProperty),
    pseudoSelector: ':before',
    order: ["none", "small", "medium", "large"],
    debug: false
  }
  /**
   * @param {Object} config Configuration object
   * @param {Array} config.order Array of strings that correspond to the breakpoints setup in the styles, Breakpoints from smallest to largest, defaults to [small, medium, large]
   * @param {Array} config.customProperty Property to grab breakpoint from (default is --breakpoint)
   * @param {Array} config.valueFromPseudo Use the legacy method of grabbing breakpoint from pseudo element, default uses custom property
   * @param {Node} config.element The element to retrieve active breakpoint from stylesheet. (default is html) For using the old pseudo method, adjust this to document.body
   * @param {String} config.pseudoSelector Change pseudo selector used to get the breakpoint from the pseudo's content property
   */
  constructor(config) {
    Object.assign(this, BreakpointManager.defaults, config);
    this.active = null;
    this.previous = null;
    this.activeIndex = null;
    this.resizeDirection = null;
    this.previousIndex = null;
    this.breakpoints = {};
    this.onChangeCallbacks = [];
    this.order.forEach(n => this.breakpoints[n] = new Breakpoint(n, this));
    log(this, this);
    this.update(); // Run for the first time, then whenever browser resizes
    BreakpointManager.instances.push(this);
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
    return window.getComputedStyle(this.element, this.pseudoSelector).content.replace(/^"|"$/g, '');
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
      logError(this, 'Unable to get current breakpoint, maybe order is incorrect? Breakpoint check skipped!');
      return;
    }
    if (name === this.active) return;
    
    // Update active and cache last
    this.previous = this.active;
    this.previousIndex = this.activeIndex;

    const index = this.order.indexOf(name);
    this.active = name;
    this.activeIndex = index;
    const activeBreakpoint = this.at(this.active);
    // Get arrays of breakpoints based on the order array
    const mapBreakpoints = n => this.at(n);
    // From breakpoint to end (highest)
    const max = this.order.slice(index).map(mapBreakpoints);
    const notMax = this.order.slice(0, index).map(mapBreakpoints);
    // From start up to this breakpoint
    const min = this.order.slice(0, index + 1).map(mapBreakpoints);
    const notMin = this.order.slice(index + 1).map(mapBreakpoints);
    const notOnly = this.order.slice().map(mapBreakpoints);
    notOnly.splice(index, 1);
    
    log(this, 'max:', max.map(b => b.name).join());
    log(this, 'min:', min.map(b => b.name).join());
    
    max.forEach(b => b._setDirection('max', true));
    min.forEach(b => b._setDirection('min', true));
    activeBreakpoint._setDirection('only', true);

    notMax.forEach(b => b._setDirection('max', false));
    notMin.forEach(b => b._setDirection('min', false));
    notOnly.forEach(b => b._setDirection('only', false));

    // Set direction (extra info if needed)
    if (this.previousIndex !== null) {
      this.resizeDirection = this.previousIndex < index ? "up" : "down";
    }

    this.onChangeCallbacks.forEach(cb => cb(this));
  }
  /**
   * Get a breakpoint by key
   * @param {String} name The name of the breakpoint to get
   * @return {Breakpoint} Breakpoint to act on (see Breakpoint class)
   */
  at(name) {
    const bp = this.breakpoints[name];
    if (!name) {
      logError(this, 'Unable to find breakpoint for:', bp);
    }
    return bp;
  }
}
/**
 * @class
 * Used to handle a breakpoints direction's handler and state
 */
class BreakpointDirection {
  constructor(direction, breakpoint) {
    this.direction = direction; // String name (logging)
    this.active = false;
    this.on = [];
    this.off = []; // Triggered when direction has been set to active and then set to inactive (not on initial inactive)
    this.breakpoint = breakpoint; // Reference to parent
  }
  /**
   * Change the state of the direction
   */
  change(to) {
    if (this.active !== to) {
      if (to) this._call(true);
      else if (this.active) this._call(false); // Going from active to inactive
      this.active = to;
    }
  }
  /**
   * Calls all functions in handlers or
   */
  _call(forActive) {
    const handlers = forActive ? this.on : this.off;
    handlers.forEach(handler => handler());
    log(this.breakpoint._manager, `Handlers called (${ forActive ? 'on' : 'off' }): ${ this.direction }`);
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
    // Already active when handler was added, fire now
    if (this.active && handlers.on) {
      handlers.on();
      log(this.breakpoint._manager, `Handler called immediately: ${ this.direction }`, handlers.on);
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
/**
 * @class
 * Single breakpoint management
 */
class Breakpoint {
  constructor(name, manager) {
    this.directions = {
      max: new BreakpointDirection('max', this),
      min: new BreakpointDirection('min', this),
      only: new BreakpointDirection('only', this)
    };
    this._manager = manager; // Ref to parent class
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
    const directions = direction ? [ direction ] : ['max', 'min', 'only'];
    directions.forEach(d => {
      if (this.directions[d]) {
        this.directions[d].remove(handler);
      }
    });
  }
  
  log(...msg) {
    msg.unshift(`Breakpoint (${ this.name }):`);
    this._manager.log.apply(this._manager, msg);
  }
}