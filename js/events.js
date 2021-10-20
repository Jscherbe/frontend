// Description:     Custom events

/**
 * Event object - called on dispatch
 */
const events = {
  pageModified(context) {
    context.dispatchEvent(new Event('pageModified', { bubbles: true }));
  }
}
/**
 * Triggers one of our custom events
 * @param {String} name Name of event to dispatch
 * @param {Node} context Element to trigger the event from
 * @example
 *   if (updatedMarkup) {
 *     dispatch("pageModified", modalElement);
 *   }
 */
export function dispatch(name, context) {
  if (events[name]) {
    events[name](context);
  } else {
    console.warn(`Unable to dispatch site event: ${ name } in context:`, context);
  }
}