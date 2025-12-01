/**
 * Changes to make to configuration
 * @param {Object} changes
 */
export function set(changes: Object): void;
/**
 * Proxy Console.log
 * @param {Object} context Class instance (optional), will rely on classes (debug) property for output
 * @param  {...any} messages
 */
export function log(context: Object, ...messages: any[]): void;
/**
 * Proxy Console.warn
 * @param {Object} context Class instance (optional), will rely on classes (debug) property for output
 * @param  {...any} messages
 */
export function logWarning(context: Object, ...messages: any[]): void;
/**
 * Proxy Console.error
 * @param {Object} context Class instance (optional), will rely on classes (debug) property for output
 * @param  {...any} messages
 */
export function logError(context: Object, ...messages: any[]): void;
//# sourceMappingURL=class-logger.d.ts.map