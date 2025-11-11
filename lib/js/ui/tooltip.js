/**
 * @module ui/tooltip
 */

import { ComponentInitializer } from "../core/component.js";
import { getName as getEventName } from "../core/events.js";
import { createFloatingUi } from "../utils/floating-ui.js";
import { createElementFromHtml } from "@ulu/utils/browser/dom.js";
import { logError } from "../utils/class-logger.js";
import { newId, ensureId } from "../utils/id.js";

/**
 * Tooltip Component Initializer
 */
export const initializer = new ComponentInitializer({ 
  type: "tooltip", 
  baseAttribute: "data-ulu-tooltip"
});

const attrBody = initializer.getAttribute("body");
const attrSelectorBody = initializer.attributeSelector("body");
const attrSelectorArrow = initializer.attributeSelector("arrow");

/**
 * Initialize default popover
 */
export function init() {
  initializer.init({
    events: ["pageModified"],
    withData: true,
    setup({ element: trigger, data, initialize }) {
      const options = typeof data === "object" ? data : {};
      if (typeof data === "string") {
        options.content = data;
      }
      initialize();
      (new Tooltip({ trigger }, options));
    }
  });
}

/**
 * Tooltip
 * - Provides basic tooltip functionality
 * - Uses floating UI for positioning
 */
export class Tooltip {
  /**
   * Defaults options
   */
  static defaults = {
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
          <div class="popover__inner" ${ attrBody }>
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
      // do something
    }
  };
  static defaultFloatingOptions = {
    // strategy: "fixed"
  };
  constructor(elements, userOptions, floatingOptions) {
    const { trigger } = elements;
    if (!trigger) {
      logError(this, "missing required trigger");
      return;
    }
    this.options = Object.assign({}, Tooltip.defaults, userOptions);
    this.floatingOptions = Object.assign({}, Tooltip.defaultFloatingOptions, floatingOptions);
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
    showEvents.forEach(name => {
      trigger.addEventListener(name, onShow);
    });
    hideEvents.forEach(name => {
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
      showEvents.forEach(name => {
        trigger.removeEventListener(name, onShow);
      });
    }
    if (onHide) {
      hideEvents.forEach(name => {
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
    const setClass = el => el.classList[isOpen ? "add" : "remove"](openClass);
    // trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
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
    return new CustomEvent(getEventName("tooltip:" + name), { detail });
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
}