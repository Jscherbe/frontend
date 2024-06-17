import { Modal } from "./modal.js";

import { getName } from "../events/index.js";

const logError = (...msgs) => console.error("@ulu (modal):", ...msgs);

/**
 * Instances initialized by this module
 * - Organized by dialog (actual Node)
 */
export const instances = new WeakMap;

const attrs = {
  trigger: "data-ulu-modal-trigger",
  close: "data-ulu-modal-close",
};
const attrSelector = key => `[${ attrs[key] }]`;

/**
 * Initialize default modal
 */
export function init() {
  document.addEventListener(getName("pageModified"), setup);
  setup();
}

/**
 * Query all modals on current page and set them up
 * - Use this manually if needed
 * - Won't setup a modal more than once
 */
export function setup() {
  const triggers = document.querySelectorAll(attrSelector("trigger"));
  // Only triggers we don't have instances for
  const resolved = Array.from(triggers)
    .filter(trigger => !instances.has(trigger))
    .map(resolve)
    .filter(v => v);

  resolved.forEach(({ elements, options  }) => {
    instances.set(elements.dialog, new Modal(elements, options));
  });
}

/**
 * Find the modal's elements/options
 */
export function resolve(trigger) {
  const dialog = document.getElementById(trigger.dataset.uluModalTrigger);
  if (!dialog) {
    logError("Missing modal dialog for trigger:", trigger);
    return;
  }
  const passed = dialog.dataset.uluModal;
  const options = passed ? JSON.parse(passed) : {};
  const elements = { trigger, dialog };
  return { elements, options };
}