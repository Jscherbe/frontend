import { ComponentInitializer } from '../core/component.js';
/**
 * Initialize everything in document
 * - This will only initialize elements once, it is safe to call on page changes
 */
export function init(): void;
/**
 * @typedef {Object} DetailsGroupInstance
 * @property {Function} destroy A function to remove event listeners and attributes.
 * @property {HTMLElement} element The parent element.
 * @property {Function} setupChildren A function to initialize the child details elements.
 */
/**
 * Sets up a single group of details elements to manage their behavior.
 * @param {HTMLElement} element - The parent element containing the details elements.
 * @param {Object} options - The options for this group
 * @returns {DetailsGroupInstance}
 */
export function setupGroup(element: HTMLElement, userOptions: any): DetailsGroupInstance;
/**
 * Dialog Component Initializer
 */
export const initializer: ComponentInitializer;
export type DetailsGroupInstance = {
    /**
     * A function to remove event listeners and attributes.
     */
    destroy: Function;
    /**
     * The parent element.
     */
    element: HTMLElement;
    /**
     * A function to initialize the child details elements.
     */
    setupChildren: Function;
};
//# sourceMappingURL=details-group.d.ts.map