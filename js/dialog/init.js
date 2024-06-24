import { getName } from "../events/index.js";
import { getDatasetJson } from "../utils/dom.js";
import { buildModal } from "./builder.js";
import { wasClickOutside } from "../utils/dom.js";

const attrSelector = key => `[${ attrs[key] }]:not([${ attrs.init }])`;
const queryAttr = key => document.querySelectorAll(attrSelector(key));

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
  clickOutsideCloses: true
};

let currentDefaults = { ...defaults };

/**
 * 
 * @param {Object} options Change options used as default for dialogs, can then be overriden by data attribute settings on element
 */
export function setOptions(options) {
  Object.assign(currentDefaults, options);
}

/**
 * Default data attributes
 */
export const attrs = {
  init: "data-ulu-init",
  dialog: "data-ulu-dialog",
  builder: "data-ulu-dialog-builder",
  trigger: "data-ulu-dialog-trigger",
  close: "data-ulu-dialog-close",
};

/**
 * Initialize everything in document
 * - This will only initialize elements once, it is safe to call on page changes
 */
export function init() {
  document.addEventListener(getName("pageModified"), setup);
  setup();
}

/**
 * Setup dialogs, triggers and builder type dialogs
 */
export function setup() {
  // First setup builders so they can be setup as normal dialogs after
  const builders = queryAttr("builder");
  builders.forEach(setupBuilder);
  
  // Then setup all dialogs (including those that were built)
  const dialogs = queryAttr("dialog");
  dialogs.forEach(setupDialog);

  const triggers = queryAttr("trigger");
  triggers.forEach(setupTrigger);
}

/**
 * Build a dialog for the given content
 * @param {Node} element 
 */
function setupBuilder(element) {
  const options = getDatasetJson(element, "uluDialogBuilder");
  element.removeAttribute(attrs.builder);
  buildModal(element, options);
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
      console.error("Attempted to trigger non <dialog> element. If this needs to be built use " + attrs.builder);
      return;
    }
    const options = getDialogOptions(dialog);
    dialog[options.nonModal ? 'show' : 'showModal']();
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
    const closeFromButton = target.closest('[data-ulu-dialog-close]');
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


