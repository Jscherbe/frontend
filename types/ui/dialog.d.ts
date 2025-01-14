/**
 * @param {Object} options Change options used as default for dialogs, can then be overriden by data attribute settings on element
 */
export function setDefaults(options: any): void;
/**
 * Initialize everything in document
 * - This will only initialize elements once, it is safe to call on page changes
 */
export function init(): void;
/**
 * Setup dialogs and triggers
 */
export function setup(): void;
/**
 * Setup click handlers on a trigger
 * @param {Node} trigger
 */
export function setupTrigger(trigger: Node): void;
/**
 * Setup click handlers for a dialog
 * @param {Node} dialog
 */
export function setupDialog(dialog: Node): void;
/**
 * For a given dialog, get it's options (from data attribute)
 * @param {Node} dialog
 * @returns {Object}
 */
export function getDialogOptions(dialog: Node): any;
export namespace attrs {
    let init: string;
    let dialog: string;
    let trigger: string;
    let close: string;
}
export namespace defaults {
    let nonModal: boolean;
    let documentEnd: boolean;
    let clickOutsideCloses: boolean;
    let pauseVideos: boolean;
}
//# sourceMappingURL=dialog.d.ts.map