/**
 * Triggers one of our custom events
 * @param {String} type Type of event to dispatch
 * @param {Node} context Element to trigger the event from
 * @example
 *   if (updatedMarkup) {
 *     dispatch("pageModified", modalElement);
 *   }
 */
export function dispatch(type: string, context: Node): void;
/**
 * Handles the actual event names being used (future could namespace)
 * @param {String} type Type of event to get the actual event name for
 * @returns {String}
 */
export function getName(type: string): string;
//# sourceMappingURL=index.d.ts.map