/**
 * @module ui/dialog
 */

import { getName } from "../events/index.js";
import { getDatasetJson, wasClickOutside } from "../utils/dom.js";

/**
 * Default data attributes
 */
export const attrs = {
  init: "data-ulu-dialog-init",
  dialog: "data-ulu-dialog",
  trigger: "data-ulu-dialog-trigger",
  close: "data-ulu-dialog-close",
};

// Utils for selecting things based on attributes
const attrSelector = key => `[${ attrs[key] }]`;
const attrSelectorInitial = key => `${ attrSelector(key) }:not([${ attrs.init }])`;
const queryAllInitial = key => document.querySelectorAll(attrSelectorInitial(key));

/**
 * Dialog Defaults 
 * - Can be overridden using data-attributes
 */
export const defaults = {
  /**
   * Use non-modal interface for dialog
   */
  nonModal: false,
  /**
   * Move the dialog to the document end (hoist out of content)
   * - helpful if dialogs are within editor body, etc
   */
  documentEnd: false,
  /**
   * Requires styling that reduces any padding/border on dialog
   */
  clickOutsideCloses: true,
};


// Current default objects (user can override these)
let currentDefaults = { ...defaults };

/**
 * @param {Object} options Change options used as default for dialogs, can then be overriden by data attribute settings on element
 */
export function setDefaults(options) {
  currentDefaults = Object.assign({}, currentDefaults, options);
}

/**
 * Initialize everything in document
 * - This will only initialize elements once, it is safe to call on page changes
 */
export function init() {
  document.addEventListener(getName("pageModified"), setup);
  setup();
}

/**
 * Setup dialogs and triggers
 */
export function setup() {
  // Then setup all dialogs (including those that were built)
  const dialogs = queryAllInitial("dialog");
  dialogs.forEach(setupDialog);

  const triggers = queryAllInitial("trigger");
  triggers.forEach(setupTrigger);
}

/**
 * Setup click handlers on a trigger
 * @param {Node} trigger 
 */
export function setupTrigger(trigger) {
  trigger.addEventListener("click", handleTrigger);
  trigger.setAttribute(attrs.init, "");

  function handleTrigger() {
    const id = trigger.dataset.uluDialogTrigger;
    const dialog = document.getElementById(id);
    if (!dialog) {
      console.error("Could not locate dialog (id)", id);
      return;
    }
    if (dialog?.tagName?.toLowerCase() !== "dialog") {
      console.error("Attempted to trigger non <dialog> element. Did you mean to use modal builder?" );
      return;
    }
    const options = getDialogOptions(dialog);
    dialog[options.nonModal ? "show" : "showModal"]();
  }
}

/**
 * Setup click handlers for a dialog
 * @param {Node} dialog 
 */
export function setupDialog(dialog) {
  const options = getDialogOptions(dialog);
  dialog.addEventListener("click", handleClicks);
  dialog.setAttribute(attrs.init, "");
  if (options.documentEnd) {
    document.body.appendChild(dialog);
  }

  function handleClicks(event) {
    const { target } = event;
    const closeFromButton = target.closest("[data-ulu-dialog-close]");
    let closeFromOutside = options.clickOutsideCloses && 
                           target === dialog && 
                           wasClickOutside(dialog, event);
    if (closeFromOutside || closeFromButton) {
      dialog.close();
    }
  }
} 

/**
 * For a given dialog, get it's options (from data attribute)
 * @param {Node} dialog 
 * @returns {Object}
 */
export function getDialogOptions(dialog) {
  const options = getDatasetJson(dialog, "uluDialog");
  return Object.assign({}, currentDefaults, options);
}


