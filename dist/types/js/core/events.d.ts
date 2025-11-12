/**
 * Triggers one of the predefined core lifecycle events.
 * @param {String} type Type of core event to dispatch.
 * @param {Node} context Element to trigger the event from.
 */
export function dispatchCoreEvent(type: string, context: Node): void;
/**
 * A general-purpose utility to get a ULU-namespaced event name.
 * @param {String} type The base name for the event.
 * @returns {String} The `ulu:` prefixed event name.
 */
export function getUluEventName(type: string): string;
/**
 * Safely gets the full namespaced name for a predefined core event.
 * @param {String} type The base name of the core event (e.g., 'pageModified').
 * @returns {String|null} The full event name if valid, otherwise null.
 */
export function getCoreEventName(type: string): string | null;
/**
 * A general-purpose utility to create a ULU-namespaced CustomEvent.
 * @param {String} type Event base name.
 * @param {any} data Custom data to pass with the event.
 * @param {Object} options CustomEvent options.
 * @returns {CustomEvent}
 */
export function createUluEvent(type: string, data?: any, options?: any): CustomEvent;
//# sourceMappingURL=events.d.ts.map