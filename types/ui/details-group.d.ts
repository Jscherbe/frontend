/**
 * Initialize everything in document
 * - This will only initialize elements once, it is safe to call on page changes
 */
export function init(): void;
/**
 * Setup all dialog groups within context
 * @param {HTMLElement} context [document] Element to query within
 * @returns {Array} Array matching the groups queried with their return objects from setupGroup() [used for destroy/etc]
 */
export function setup(context?: HTMLElement): any[];
/**
 * @typedef {Object} DetailsGroupInstance
 * @property {Function} destroy A function to remove event listeners and attributes.
 * @property {HTMLElement} element The parent element.
 * @property {Function} setupChildren A function to initialize the child details elements.
 */
/**
 * Sets up a single group of details elements to manage their behavior.
 * @param {HTMLElement} element - The parent element containing the details elements.
 * @returns {DetailsGroupInstance}
 */
export function setupGroup(element: HTMLElement): DetailsGroupInstance;
export namespace attrs {
    let init: string;
    let childInit: string;
    let group: string;
}
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