/**
 * @module ui/print-details
 */

import { getName } from "../core/events.js";

/**
 * Default data attributes
 */
export const attrs = {
  opened: "data-ulu-print-details-opened",
};

const attrSelector = key => `[${ attrs[key] }]`;

const defaults = {
  selector: "details:not([open])"
};

/**
 * Initialize details print 
 * - will open details before print
 * - will return to previous state after
 */
export function init(options) {
  const config = Object.assign({}, defaults, options);
  
  // Add flag and open each details that's closed
  document.addEventListener(getName("beforePrint"), () => {
    document.querySelectorAll(config.selector).forEach(details => {
      if (!details.open) {
        details.setAttribute(attrs.opened, true);
        details.open = true;
      }
    });
  });
  // When print ends find all flagged and close
  document.addEventListener(getName("afterPrint"), () => {
    document.querySelectorAll(attrSelector("opened")).forEach(details => {
      details.removeAttribute(attrs.opened);
      details.open = false;
    });
  });
}