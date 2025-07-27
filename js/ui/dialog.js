/**
 * @module ui/dialog
 */

import { getName } from "../events/index.js";
import { ComponentInitializer } from "../utils/system.js";
import { wasClickOutside, preventScroll as setupPreventScroll } from "@ulu/utils/browser/dom.js";
import { pauseVideos as pauseYoutubeVideos, prepVideos as prepYoutubeVideos } from "../utils/pause-youtube-video.js";

/**
 * Base attribute for a dialog
 */
export const baseAttribute = "data-ulu-dialog"; // Exposed for modal builder

/**
 * Dialog Component Initializer
 */
export const initializer = new ComponentInitializer({ type: "dialog", baseAttribute });

/**
 * Attribute for close buttons within a dialog
 */
export const closeAttribute = initializer.getAttribute("close"); // Exposed for modal builder

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
  /**
   * Whether or not to pause videos when dialog closes (currently just youtube and native)
   */
  pauseVideos: true,
  /**
   * When open and not non-modal, the body is prevented from scrolling (defaults to true).
   */
  preventScroll: true,
  /**
   * Compensate for layout shift when preventing scroll. Which adds padding equal to scrollbars 
   * width while dialog is open
   */
  preventScrollShift: true,
};


// Current default objects (user can override these)
let currentDefaults = { ...defaults };

/**
 * @param {Object} options Change options used as default for dialogs, can then be overridden by data attribute settings on element
 */
export function setDefaults(options) {
  currentDefaults = Object.assign({}, currentDefaults, options);
}

/**
 * Initialize everything in document
 * - This will only initialize elements once, it is safe to call on page changes
 */
export function init() {
  // Initialize all the dialogs
  initializer.init({
    events: ["pageModified"],
    withData: true,
    setup({ element, initialize, data }) {
      setupDialog(element, data);
      initialize();
    }
  });

  // Initialize all triggers (things that trigger opening a dialog)
  initializer.init({
    key: "trigger",
    events: ["pageModified"],
    withData: true,
    setup({ element, initialize, data: dialogId }) {
      setupTrigger(element, dialogId);
      initialize();
    }
  });
}

/**
 * Setup click handlers on a trigger
 * @param {Node} trigger Trigger button element
 * @param {String} dialogId The dialog's id to open
 */
export function setupTrigger(trigger, dialogId) {
  trigger.addEventListener("click", handleTrigger);

  function handleTrigger(event) {
    
    // If a link is used (not recommended) we need to prevent 
    // the page from scrolling
    const closestLink = event.target.closest("a");
    if (closestLink) {
      event.preventDefault();
    }
    
    const dialog = document.getElementById(dialogId);
    if (!dialog) {
      console.error("Could not locate dialog (id)", dialogId);
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
export function setupDialog(dialog, userOptions) {
  const options = Object.assign({}, currentDefaults, userOptions);
  const body = document.body;
  const { preventScrollShift: preventShift } = options;

  // Stores active pointerId for resizer until after the whole pointer event series 
  // is finished which is after the click is complete
  let activeResizePointer;

  dialog.addEventListener(getName("resizer:start"), handleResizeStart);
  dialog.addEventListener(getName("resizer:end"), handleResizeEnd);
  dialog.addEventListener("click", handleClicks);

  if (options.documentEnd) {
    body.appendChild(dialog);
  }
  if (options.pauseVideos) {
    prepVideos(dialog);
  }

  // Allow preventScroll if it is a modal dialog
  // Caching value of overflow before setting so we don't assume what it's initial value is
  if (!options.nonModal && options.preventScroll) {
    // Cache restore function
    let restoreScroll; 

    // Toggle prevent scroll
    dialog.addEventListener("toggle", (event) => {
      const isOpen = event.newState === "open";
      if (isOpen) {
        restoreScroll = setupPreventScroll({ preventShift });
      } else if (restoreScroll) {
        restoreScroll();
      }
    });
  }

  function handleClicks(event) {
    const { target } = event;
    const targetIsDialog = target === dialog;
    const closeFromButton = target.closest(initializer.attributeSelector("close"));
    const allowCloseOutside = !activeResizePointer && options.clickOutsideCloses;
    const closeFromOutside = allowCloseOutside && targetIsDialog && wasClickOutside(dialog, event);
    if (closeFromOutside || closeFromButton) {
      if (options.pauseVideos) {
        pauseVideos(dialog);
      }
      dialog.close();
    }
  }
  function handleResizeStart(event) {
    activeResizePointer = event.pointerId;
  }
  function handleResizeEnd(event) {
    if (activeResizePointer === event.pointerId) {
      // next event cycle (after click/pointer events finish in current)
      setTimeout(() => { activeResizePointer = null;}, 0);
    }
  }
} 

/**
 * For a given dialog, get it's options (from data attribute)
 * @param {Node} dialog 
 * @returns {Object}
 */
export function getDialogOptions(dialog) {
  return Object.assign({}, currentDefaults, initializer.getData(dialog));
}

/**
 * Pause native and youtube videos for a given dialog
 */
function prepVideos(dialog) {
  prepYoutubeVideos(dialog);
}

/**
 * Prep videos to be paused for a given dialog
 */
function pauseVideos(dialog) {
  pauseYoutubeVideos(dialog);
  const nativeVideos = dialog.querySelectorAll("video");
  nativeVideos.forEach(video => video.pause());
}

