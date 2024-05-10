/**
 * Design Notes:
 * - Can use animate auto library (CQC) to animate open if needed (plugin)
 * - Can use floating ui for positioning poppers (plugin)
 */

import { getName as getEventName } from "../events/index.js";
import { log, logError } from "../utils/logger.js";
import { ensureId } from "../utils/dom.js";

/**
 * Class for accessible hide/show components
 */
export class Collapsible {
  static defaults = {
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
      // do something
    }
  };
  /**
   * @param {Object} elements Elements object 
   * @param {Node} elements.trigger Trigger button/element that opens/closes collapsible
   * @param {Node} elements.content The content element that the trigger reveals
   * @param {Object} config Configuration options (see defaults)
   * @returns {Object} Collapsible instance
   */
  constructor(elements, config) {
    const { trigger, content } = elements;
    if (!trigger || !content) {
      logError(this, "missing required elements (trigger or content)");
      return;
    }
    const options = Object.assign({}, Collapsible.defaults, config);
    this.elements = elements;
    this.options = options;
    this.isOpen = false;
    ensureId(trigger);
    ensureId(content);
    this.debugLog(this, this);
    if (!options.selfManaged) {
      this.attachHandlers();
    }
    // Collapsible.instances.push(this);
  }
  attachHandlers() {
    const { trigger } = this.elements;
    this.clickHandler = event => this.onClick(event);
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
    // Collapsible.removeInstance(this);
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
    return new CustomEvent(getEventName("collapsible:" + name), { detail });
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
    const setClass = el => el.classList[isOpen ? "add" : "remove"](openClass);
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
}