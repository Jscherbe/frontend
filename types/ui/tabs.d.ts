/**
 * Init all instances currently in document
 * @param {Object} options Options to serve as defaults
 */
export function init(options?: any): void;
/**
 * Init all tabs within a certain context
 * @param {Node} context Element to init within
 * @param {Object} options Options to serve as defaults
 */
export function initWithin(context: Node, options?: any): void;
/**
 *
 * @param {Node} element Tablist Element
 * @param {Node} options Options to set as defaults (can be overridden by element dataset options)
 * @return {Object} Instance object
 */
export function setup(element: Node, options?: Node): any;
/**
 * Array of current tab instances (exported if you need to interact with them)
 * @type {Array}
 */
export const instances: any[];
//# sourceMappingURL=tabs.d.ts.map