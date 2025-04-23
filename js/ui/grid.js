/**
 * @module ui/grid
 */

import { ComponentInitializer } from "../utils/system.js";
import { setPositionClasses } from "../utils/dom.js";

/**
 * Dialog Component Initializer
 */
export const initializer = new ComponentInitializer({ 
  type: "grid", 
  baseAttribute: "data-grid"
});

/**
 * Sets up document for grid position classes
 * @param {Object} classes Classes (optional) @see setPositionClasses
 */
export function init(classes) {
  initializer.init({
    events: ["pageModified", "pageResized"],
    setup({ element, initialize }) {
      setPositionClasses(element, classes);
      initialize();
    }
  });
}