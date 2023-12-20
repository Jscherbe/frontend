/**
 * Changes to make to configuration
 * @param {Object} changes
 */
export function set(changes: any): void;
/**
 * Proxy Console.log
 * @param {Object} context Class instance (optional), will rely on classes (debug) property for output
 * @param  {...any} messages
 */
export function log(context: any, ...messages: any[]): void;
/**
 * Proxy Console.warn
 * @param {Object} context Class instance (optional), will rely on classes (debug) property for output
 * @param  {...any} messages
 */
export function logWarning(context: any, ...messages: any[]): void;
/**
 * Proxy Console.error
 * @param {Object} context Class instance (optional), will rely on classes (debug) property for output
 * @param  {...any} messages
 */
export function logError(context: any, ...messages: any[]): void;
//# sourceMappingURL=logger.d.ts.map