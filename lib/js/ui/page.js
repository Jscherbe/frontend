/**
 * General/Document Related 
 * - Add custom properties for scrollbar
 * @module ui/page
 */

import { addScrollbarCustomProperty } from "@ulu/utils/browser/dom.js";

/**
 * Initialize page module
 */
export function init() {
  addScrollbarCustomProperty();
}