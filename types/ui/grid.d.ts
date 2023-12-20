/**
 * Sets up document for grid position classes
 * @param {String} selector The selector for the parent element
 * @param {Object} classes Classes (optional) @see setPositionClasses
 */
export function init(selector: string, classes: any): void;
/**
 * Goes through document and finds elements that need to have positioning classes
 * @param {String} selector The selector for the parent element
 * @param {Object} classes Classes (optional) @see setPositionClasses
 */
export function setup(selector: string, classes: any): void;
/**
 *   Sets up the positonal classes that would come from the equal
 *   height module. Needs to be rerun by user when layout changes
 *   or new instances are added to the screen
 *   - Used for gutter crops
 *   - Used for rule placement
 *   - **Devs** Remember that default classes should match sass defaults
 *   @param {Node} parent  The grid parent <data-grid="">
 *   @param {Object} classes Override the default equal heights classes
 */
export function setPositionClasses(parent: Node, classes?: any): void;
//# sourceMappingURL=grid.d.ts.map