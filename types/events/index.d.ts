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
export function dispatch(type: string, context: Node): void;
/**
 * Namespaced event
 * - Should be used for all ulu script/component events
 * @param {String} type Type of event to get the actual event name for
 * @returns {String}
 */
export function getName(type: string): string;
/**
 * Create ulu namespaced custom event
 * @param {String} type Event base name (not prefixed)
 * @param {any} data Custom data to pass with the event (will be available as `event.detail`)
 * @param {Object} options CustomEvent options default `{ bubbles: true }`. If `detail` is also provided, it will be merged with this options object and will override the 'data' argument for this function
 */
export function createEvent(type: string, data?: any, options?: any): CustomEvent<any>;
//# sourceMappingURL=index.d.ts.map