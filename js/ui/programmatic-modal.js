// =============================================================================
// Grabs Breakpoint from CSS
// =============================================================================

// Version:         1.0.1

// Description:     Drupal programmatic modal insertion script (interface = jquery prototype)
// Changes:         1.0.2 - Added ability to pass class to container

import { setupModal, show } from "../lib/modals.js";
import { dispatch } from "../events.js";

const $ = window.jQuery;
const containerId = 'programmatic-modal';
const selectorTrigger = '[data-programmatic-modal-trigger]';
const defaults = {
  removeOnClose: true,
  settings: {},
  classes: []
};

let count = 0;
let cachedTrigger; 

// Drupal calls the jquery 'programaticModal' from InvokeCommand())
$.fn.programaticModal = newModal;

// keep track of trigger clicks to return user on close (Drupal doesn't send trigger clicked, that I know of)
document.addEventListener('click', cacheTrigger, true);

/**
 * Sets up a new ajax triggered modal and opens it
 * @param {String} args Arguments provided from Drupal (JSON format)
 */
function newModal(args) {
  args = args ? JSON.parse(args) : {};
  const config = Object.assign({}, defaults, args);
  const modal = document.querySelector(`#${ containerId }`);
  const id = setModalId(modal, config.id);
  const classes = ["programmatic-modal-content", ...config.classes ];
  modal.classList.add(...classes);
  // Add a new placeholder container
  newContainer();
  // Intialize and open the new modal
  setupModal(modal, config.settings);
  show(id, {
    onShow(modal) {
      dispatch('pageModified', modal);
    },
    onClose(element) {
      if (config.removeOnClose) {
        element.parentNode.removeChild(element);
      }
      // For accessiblity/usablity (return to last clicked trigger)
      if (cachedTrigger) {
        cachedTrigger.focus();
      }
    }
  });
}
/**
 * Sets and returns the modal's id
 */
function setModalId(element, id) {
  element.id = id || `programmatic-modal--id-${ ++count }`;
  return element.id;
}
/**
 * Once we remove the placeholder containers id (above)
 * we create another programmatic placeholder container
 * for the next programmitic container
 */
function newContainer() {
  const container = document.createElement('div');
  container.id = 'programmatic-modal';
  document.body.append(container);
}
/**
 * Document click handler, will cache the trigger that caused the modal to open 
 */
function cacheTrigger(event) {
  const trigger = event.target.closest(selectorTrigger);
  if (trigger) cachedTrigger = trigger;
}