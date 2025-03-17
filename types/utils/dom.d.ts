/**
 * Get an elements JSON dataset value
 * @param {Node} element
 * @param {String} key key in dataset object for element
 * @returns {Object} Empty object or JSON object from dataset
 */
export function getDatasetJson(element: Node, key: string): any;
/**
 * Get an elements JSON dataset value that could potentially just be a single string
 * - If JSON it will return the object else it will return the value directly
 * @param {Node} element
 * @param {String} key key in dataset object for element
 * @returns {Object|String} JSON object or current dataset value (string or empty string if no value)
 */
export function getDatasetOptionalJson(element: Node, key: string): any | string;
/**
 * Check if a pointer event x/y was outside an elements bounding box
 */
export function wasClickOutside(element: any, event: any): boolean;
/**
 *   Sets up the positional classes that would come from the equal
 *   height module. Needs to be rerun by user when layout changes
 *   or new instances are added to the screen
 *   - Used for gutter crops
 *   - Used for rule placement
 *   - **Devs** Remember that default classes should match sass defaults
 *   @param {Node} parent  The grid parent <data-grid="">
 *   @param {Object} classes Override the default equal heights classes
 */
export function setPositionClasses(parent: Node, classes?: any): void;
/**
 * Resolve a target to Element
 * @param {String|Node} target The selector or node/element
 * @param {Object} context [document] The context to query possible selectors from
 * @return {HTMLElement} The element or null if not found
 */
export function getElement(target: string | Node, context?: any): HTMLElement;
/**
 * Resolve a target to Elements
 * @param {String|Node} target The selector or node/element
 * @param {Object} context [document] The context to query possible selectors from
 * @return {Array} The elements or null if not found
 */
export function getElements(target: string | Node, context?: any): any[];
/**
 * Resolves a class input (string or array) into a consistent array of class names.
 * @param {string|string[]} input - The class input, which can be a string, an array of strings, or any other value.
 * @returns {string[]} An array of class names. Returns an empty array for invalid or falsy input.
 * @example
 * resolveClassArray("fas fa-check  my-class"); // Returns ["fas", "fa-check", "my-class"]
 * resolveClassArray(["another-class", "yet-another-class"]); // Returns ["another-class", "yet-another-class"]
 * resolveClassArray("single-class"); // Returns ["single-class"]
 */
export function resolveClasses(classes: any): string[];
/**
 * Sets a CSS custom property equal to the scrollbar width
 * @param {Node} element The element that is the child of a scrollabel container
 * @param {Node} container The container that can be scrolled
 * @param {Stirng} propName Custom property to set
 */
export function addScrollbarProperty(element?: Node, container?: Node, propName?: Stirng): void;
/**
 * @module utils/dom
 */
export const regexJsonString: RegExp;
//# sourceMappingURL=dom.d.ts.map