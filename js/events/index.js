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
    context.dispatchEvent(createEvent("pageModified"));
  },
  /**
   * Event called when page is resized
   */
  pageResized(context) {
    context.dispatchEvent(createEvent("pageResized"));
  },
  /**
   * Event dispatched before page print begins (teardown/restructure/hide things)
   */
  beforePrint(context) {
    context.dispatchEvent(createEvent("beforePrint"));
  },
  /**
   * Event dispatched after page print (cleanup)
   */
  afterPrint(context) {
    context.dispatchEvent(createEvent("afterPrint"));
  }
};

/**
 * Triggers one of our custom events (page/document level events)
 * - UI components may dispatch their own events, this is just used for system wide events
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
 * - Should be used for all ulu script/component events
 * @param {String} type Type of event to get the actual event name for
 * @returns {String}
 */
export function getName(type) {
  return "ulu:" + type;
}

/**
 * Create ulu namespaced custom event
 * @param {String} type Event base name (not prefixed)
 * @param {any} data Custom data to pass with the event (will be available as `event.detail`)
 * @param {Object} options CustomEvent options default `{ bubbles: true }`. If `detail` is also provided, it will be merged with this options object and will override the 'data' argument for this function
 */
export function createEvent(type, data = null, options = { bubbles: true }) {
  return new CustomEvent(getName(type), { detail: data, ...options });
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
  window.addEventListener("beforeprint", () => {
    dispatch("beforePrint", document);
  });
  window.addEventListener("afterprint", () => {
    dispatch("afterPrint", document);
  }); 
}