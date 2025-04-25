/**
 * Init all instances currently in document
 */
export function init(): void;
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
/**
 * Tabs Component Initializer
 */
export const initializer: ComponentInitializer;
import { ComponentInitializer } from "../utils/system.js";
//# sourceMappingURL=tabs.d.ts.map