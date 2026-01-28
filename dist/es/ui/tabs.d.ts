import { ComponentInitializer } from '../core/component.js';
/**
 * Init all instances currently in document
 */
export function init(): void;
/**
 * Setup a new TabManager instance
 * @param {HTMLElement} element Tablist Element
 * @param {object} options Options to set as defaults
 * @return {object} Instance object
 */
export function setup(element: HTMLElement, options?: object): object;
/**
 * Array of current tab instances (exported if you need to interact with them)
 * @type {Array}
 */
export const instances: any[];
/**
 * Tabs Component Initializer
 */
export const initializer: ComponentInitializer;
//# sourceMappingURL=tabs.d.ts.map