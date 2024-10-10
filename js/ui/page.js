/**
 * General/Document Related 
 * - Add custom properties for scrollbar
 * @module ui/page
 */

import { addScrollbarProperty } from "../utils/dom";

/**
 * Initialize page module
 */
export function init() {
  addScrollbarProperty();
}