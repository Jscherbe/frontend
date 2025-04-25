/**
 * @param {Object} options Change options used as default for dialogs, can then be overridden by data attribute settings on element
 */
export function setDefaults(options: any): void;
/**
 * Initialize everything in document
 * - This will only initialize elements once, it is safe to call on page changes
 */
export function init(): void;
/**
 * Setup click handlers on a trigger
 * @param {Node} trigger Trigger button element
 * @param {String} dialogId The dialog's id to open
 */
export function setupTrigger(trigger: Node, dialogId: string): void;
/**
 * Setup click handlers for a dialog
 * @param {Node} dialog
 */
export function setupDialog(dialog: Node, userOptions: any): void;
/**
 * For a given dialog, get it's options (from data attribute)
 * @param {Node} dialog
 * @returns {Object}
 */
export function getDialogOptions(dialog: Node): any;
/**
 * Base attribute for a dialog
 */
export const baseAttribute: "data-ulu-dialog";
/**
 * Dialog Component Initializer
 */
export const initializer: ComponentInitializer;
/**
 * Attribute for close buttons within a dialog
 */
export const closeAttribute: string;
export namespace defaults {
    let nonModal: boolean;
    let documentEnd: boolean;
    let clickOutsideCloses: boolean;
    let pauseVideos: boolean;
    let preventScroll: boolean;
}
import { ComponentInitializer } from "../utils/system.js";
//# sourceMappingURL=dialog.d.ts.map