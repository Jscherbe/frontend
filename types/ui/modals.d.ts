export function attachTriggers(context?: Document): void;
/**
 * Function to setup each modal
 * - Creates structure
 * - Gets settings from elements data attrite
 * - Moves it to the end of the document
 * - Adds resizer if position (left || right)
 * @param {Node} modal Modal element ie. `[data-site-modal]`
 * @param {Object} settings Custom settings object to merge, same interface as `[data-site-modal]` settings
 */
export function setupModal(modal: Node, settings: any): void;
/**
 * Intialize all modals on the page
 * - can be used after AJAX adds content
 */
/**
 * Open a modal
 * @param {String} id The id of the modal to open
 */
export function show(id: string, config: any): void;
/**
 * Close a modal
 * @param {String} id The id of the modal to open
 */
export function close(id: string): void;
export const triggerAttr: "data-site-modal-trigger";
//# sourceMappingURL=modals.d.ts.map