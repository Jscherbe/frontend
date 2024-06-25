/**
 * @module collapsible
 */

import { getName as getEventName } from "../events/index.js";
import { log, logError } from "../utils/class-logger.js";
import { ensureId } from "../utils/id.js";

/**
 * Class for accessible hide/show components
 */
export class Collapsible {
  static defaults = {
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
    this.handlers = {}; // Spot to cache event handlers
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
    this.clickHandler = event => {
      this.onClick(event);
    }
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
}