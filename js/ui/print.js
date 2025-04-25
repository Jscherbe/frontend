/**
 * @module ui/print
 */

import { ComponentInitializer } from "../utils/system.js";
import { getElement } from "../utils/dom.js";
import { printElement } from "@ulu/utils/browser/print.js";

const initializer = new ComponentInitializer({
  type: "print",
  baseAttribute: "data-ulu-print"
});

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
  initializer.init({
    withData: true,
    events: ["pageModified"],
    setup({ element, data, initialize }) {
      setupTrigger(element, data);
      initialize();
    }
  });
}

/**
 * Setup a single trigger (can be used manually without attr if needed)
 */
function setupTrigger(trigger, userOptions) {
  const config = Object.assign({}, defaults, userOptions);
  trigger.addEventListener("click", () => {
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
