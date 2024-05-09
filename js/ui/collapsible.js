/**
 * Design Notes:
 * - Can use animate auto library (CQC) to animate open if needed (plugin)
 * - Can use floating ui for positioning poppers (plugin)
 */

import { log, logError } from "../utils/logger.js";
import { ensureId } from "../utils/dom.js";
const initAttr = "data-ulu-init";

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
     * Callback called anytime there is a change (open/close)
     */
    onChange: ctx => {},
    /**
     * Output debug info
     */
    debug: false
  };
  /**
   * @param {Object} trigger Trigger button/element that opens/closes collapsible
   * @param {Object} content The content element that the trigger reveals
   * @param {Object} config Configuration options (see defaults)
   * @returns {Object} Collapsible instance
   */
  constructor(trigger, content, config) {
    if (!trigger || !content) {
      logError(this, "missing required configuration options (trigger/content)");
      return;
    }
    const options = Object.assign({}, Collapsible.defaults, config);
    if (trigger.hasAttribute(initAttr)) {
      logError("Attempted to re-initialize a collapsible");
    } else {
      trigger.setAttribute(initAttr, "");
    }
    this.elements = { trigger, content };
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
  setState(isOpen, event) {
    this.debugLog(this, "Set instance state, is open:", isOpen, this);
    const { trigger, content } = this.elements;
    const { openClass } = this.options;
    const setClass = el => el.classList[isOpen ? 'add' : 'remove'](openClass)
    trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    setClass(trigger);
    setClass(content);
    this.isOpen = isOpen;
    this.options.onChange({ 
      collapsible: this, 
      isOpen, 
      event 
    });
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