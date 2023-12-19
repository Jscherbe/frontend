/**
 * @module events
 */
import { debounce } from "@ulu/utils/performance";

/**
 * Event object - called on dispatch
 */
const events = {
  pageModified(context) {
    context.dispatchEvent(new Event(getName("pageModified"), { bubbles: true }));
  },
  pageResized(context) {
    context.dispatchEvent(new Event(getName("pageResized"), { bubbles: true }));
  }
}

// Add global document events
window.addEventListener('resize', debounce(() => dispatch("pageResized", document), 250));

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
 * Handles the actual event names being used (future could namespace)
 * @param {String} type Type of event to get the actual event name for
 * @returns {String}
 */
export function getName(type) {
  return "ulu:" + type;
}