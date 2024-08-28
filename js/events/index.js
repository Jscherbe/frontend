/**
 * @module events
 */

import { debounce } from "@ulu/utils/performance.js";
import { isBrowser } from "@ulu/utils/browser/dom.js";

// Setup global document events
if (isBrowser()) {
  initResize();
  initPrint();
}

/**
 * Event object - called on dispatch
 */
const events = {
  /**
   * Event is dispatched when DOM in the page has changed, triggers updates from
   * all modules listening for the change (init instances, etc)
   * - Is triggered by modules that were responsible for modifying the page
   */
  pageModified(context) {
    context.dispatchEvent(new CustomEvent(getName("pageModified"), { bubbles: true }));
  },
  /**
   * Event called when page is resized
   */
  pageResized(context) {
    console.log("resized working");
    
    context.dispatchEvent(new CustomEvent(getName("pageResized"), { bubbles: true }));
  },
  /**
   * Event dispatched before page print begins (teardown/restructure/hide things)
   */
  beforePrint(context) {
    context.dispatchEvent(new CustomEvent(getName("beforePrint"), { bubbles: true }));
  },
  /**
   * Event dispatched after page print (cleanup)
   */
  afterPrint(context) {
    context.dispatchEvent(new CustomEvent(getName("afterPrint"), { bubbles: true }));
  }
};

/**
 * Triggers one of our custom events
 * @param {String} type Type of event to dispatch
 * @param {Node} context Element to trigger the event from
 * @example
 *   if (updatedMarkup) {
 *     dispatch("pageModified", modalElement);
 *   }
 */
export function dispatch(type, context) {
  if (events[type]) {
    events[type](context);
  } else {
    console.warn(`Unable to dispatch site event: ${ type } in context:`, context);
  }
}

/**
 * Namespaced event
 * @param {String} type Type of event to get the actual event name for
 * @returns {String}
 */
export function getName(type) {
  return "ulu:" + type;
}

/**
 * Setup resize handler/dispatch
 */
function initResize() {
  window.addEventListener("resize", debounce(() => dispatch("pageResized", document), 250));
}

/**
 * Setup print listeners
 * - Note: Tested with matchMedia but these events are more consistent
 *         Experimented with normalizing both events but they fired
 *         strangely, using any delay won't work (ie setTimeout / RAF)
 *         chrome pauses immediately javascript after the initial event.
 *         Reverting to a straightforward method for now. If this ends up
 *         needing something more robust we can work that out on this side
 *         and it won't change how the custom events file.
 */
function initPrint() {
  window.addEventListener('beforeprint', () => {
    dispatch("beforePrint", document);
    console.log("beforeprint");
  });
  window.addEventListener('afterprint', () => {
    dispatch("afterPrint", document);
    console.log("afterprint");
  }); 
}