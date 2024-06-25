/**
 * @module tooltip
 */

import { getName } from "../events/index.js";

const attrs = {
  trigger: "data-ulu-tooltip",
};
const attrSelector = key => `[${ attrs[key] }]`;

/**
 * Initialize default popover
 */
export function init() {
  document.addEventListener(getName("pageModified"), setup);
  setup();
}

/**
 * Query all popovers on current page and set them up
 * - Use this manually if needed
 * - Won't setup a popover more than once
 */
export function setup() {
  const triggers = document.querySelectorAll(attrSelector("trigger"));
  console.log("triggers:\n", triggers);
}

/**
 * Tooltip
 * - Provides basic tooltip functionality
 * - Uses floating UI for positioning
 */
export class Tooltip {
  /**
   * Defaults options
   */
  static defaults =  {
    /**
     * String/markup to insert into tooltip display
     */
    content: null,
    /**
     * Pull content from pre-existing content on page
     */
    fromElement: null,
  };
}