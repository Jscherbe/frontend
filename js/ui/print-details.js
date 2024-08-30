/**
 * @module print-details
 */

import { getName } from "../events/index.js";

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
      console.log("open");
      
      if (!details.open) {
        details.setAttribute(attrs.opened, true);
        details.setAttribute("open", true);
        details.open = true;
        details.dispatchEvent(new Event("toggle"));
        console.log("toggle");
        
        // details.open = true;
      }
    });
  });
  // When print ends find all flagged and close
  document.addEventListener(getName("afterPrint"), () => {
    document.querySelectorAll(attrSelector("opened")).forEach(details => {
      console.log("close");
      
      // details.removeAttribute("open");
      details.removeAttribute(attrs.opened);
      details.open = false;
    });
  });
}