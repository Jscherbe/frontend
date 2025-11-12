/**
 * @module core/events
 * @description Internal implementation of global event handling.
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

/**
 * Triggers one of the predefined core lifecycle events.
 * @param {String} type Type of core event to dispatch.
 * @param {Node} context Element to trigger the event from.
 */
export function dispatchCoreEvent(type, context) {
  if (events[type]) {
    events[type](context);
  } else {
    console.warn(`Unable to dispatch non-core event: ${type}`);
  }
}

/**
 * A general-purpose utility to get a ULU-namespaced event name.
 * @param {String} type The base name for the event.
 * @returns {String} The `ulu:` prefixed event name.
 */
export function getUluEventName(type) {
  return "ulu:" + type;
}

/**
 * Safely gets the full namespaced name for a predefined core event.
 * @param {String} type The base name of the core event (e.g., 'pageModified').
 * @returns {String|null} The full event name if valid, otherwise null.
 */
export function getCoreEventName(type) {
  if (eventKeys.includes(type)) {
    return getUluEventName(type);
  }
  console.warn(`'${type}' is not a valid core event type.`);
  return null;
}

/**
 * A general-purpose utility to create a ULU-namespaced CustomEvent.
 * @param {String} type Event base name.
 * @param {any} data Custom data to pass with the event.
 * @param {Object} options CustomEvent options.
 * @returns {CustomEvent}
 */
export function createUluEvent(type, data = null, options = { bubbles: true }) {
  return new CustomEvent(getUluEventName(type), { detail: data, ...options });
}

/**
 * Setup resize handler/dispatch
 */
function initResize() {
  window.addEventListener("resize", debounce(() => dispatchCoreEvent("pageResized", document), 250));
}

/**
 * Setup print listeners
 */
function initPrint() {
  window.addEventListener("beforeprint", () => {
    dispatchCoreEvent("beforePrint", document);
  });
  window.addEventListener("afterprint", () => {
    dispatchCoreEvent("afterPrint", document);
  }); 
}
