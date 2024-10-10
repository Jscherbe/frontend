/**
 * @module ui/print
 */

import { getName } from "../events/index.js";
import { getDatasetOptionalJson, getElement } from "../utils/dom.js";
import { printElement } from "@ulu/utils/browser/print.js";

export const attrs = {
  trigger: "data-ulu-print",
  init: "data-ulu-print-init",
};

const attrSelector = key => `[${ attrs[key] }]`;
const attrSelectorInitial = key => `${ attrSelector(key) }:not([${ attrs.init }])`;
const queryAllInitial = key => document.querySelectorAll(attrSelectorInitial(key));

/**
 * Default options
 */
const defaults = {
  /**
   * Print element/selector
   */
  element: null,
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
 * Setup all triggers currently on the page
 */
function setup() {
  const triggers = queryAllInitial("trigger");
  triggers.forEach(trigger => {
    const options = getDatasetOptionalJson(trigger, "uluPrint");
    setupTrigger(trigger, options);
  });
}

/**
 * Setup a single trigger (can be used manually without attr if needed)
 */
function setupTrigger(trigger, options) {
  const config = Object.assign({}, defaults, options);
  trigger.addEventListener("click", (event) => {
    // Option to print a specific element
    if (config.element) {
      const element = getElement(config.element);
      if (element) {
        printElement(element);
      } else {
        console.error("Unable to find element to print", trigger, config);
      }
    // Default behavior print window
    } else {
      window.print();
    }
  });
}
