/**
 * @module tooltip
 */

import { getName } from "../events/index.js";
import { createFloatingUi } from "../utils/floating-ui.js";
import { log, logError } from "../utils/class-logger.js";
import { newId } from "../utils/id.js";

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
     * @type {String}
     */
    content: null,
    /**
     * Pull content from pre-existing content on page 
     * @type {String|Node}
     */
    fromElement: null,
    /**
     * Move the content to the bottom of the document
     * @type {Boolean}
     */
    endOfDocument: true,
    /**
     * Events to show tooltip on
     * @type {Array.<String>}
     */    
    showEvents: ["pointerenter", "focus"],
    /**
     * Events to hide tooltip on
     * @type {Array.<String>}
     */
    hideEvents: ["pointerleave", "blur"],
    /**
     * Delay when using the directive
     * @type {Number}
     */
    delay: 500,
  };
  constructor(trigger, userOptions) {
    const { trigger } = elements;
    if (!trigger) {
      logError(this, "missing required trigger");
      return;
    }
    this.options = Object.assign({}, Tooltip.defaults, userOptions);
    this.setup();
  }
  setup() {
    const content = document.createElement("div");
    // const { endOfDocument } = this.options;

    content.id = newId();
    document.body.appendChild(content);
  }
}