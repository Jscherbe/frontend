/**
 * Utility functions for dialogs
 * @module utils/dialog
 */
/**
 * Workaround for poor Safari support of the dialog 'toggle' event.
 * Watches for changes to the 'open' attribute and fires a callback.
 *
 * @param {HTMLDialogElement} dialog The dialog element to observe
 * @param {Function} callback Function to call when the open state changes. Receives boolean indicating open state.
 * @returns {Object} Object with a destroy method to disconnect the observer
 */
export function observeDialogToggle(dialog: HTMLDialogElement, callback: Function): Object;
//# sourceMappingURL=dialog.d.ts.map