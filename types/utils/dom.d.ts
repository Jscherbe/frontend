/**
 * Converts a data attribute name to its corresponding dataset property name.
 * @param {string} dataAttribute - The data attribute name (e.g., "data-ulu-dialog").
 * @returns {string} - The dataset property name (e.g., "uluDialog").
 */
export function dataAttributeToDatasetKey(attribute: any): string;
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
 * Resolves a class input (string or array) into a consistent array of class names.
 * @param {string|string[]} input - The class input, which can be a string, an array of strings, or any other value.
 * @returns {string[]} An array of class names. Returns an empty array for invalid or falsy input.
 * @example
 * resolveClassArray("fas fa-check  my-class"); // Returns ["fas", "fa-check", "my-class"]
 * resolveClassArray(["another-class", "yet-another-class"]); // Returns ["another-class", "yet-another-class"]
 * resolveClassArray("single-class"); // Returns ["single-class"]
 */
export function resolveClasses(classes: any): string[];
//# sourceMappingURL=dom.d.ts.map