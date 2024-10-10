/**
 * @module ui/grid
 */

import { setPositionClasses } from "../utils/dom.js";
import { getName } from "../events/index.js";

/**
 * Sets up document for grid position classes
 * @param {String} selector The selector for the parent element
 * @param {Object} classes Classes (optional) @see setPositionClasses
 */
export function init(selector = "[data-grid]", classes) {
  document.addEventListener(getName("pageModified"), () => setup(selector, classes));
  document.addEventListener(getName("pageResized"), () => setup(selector, classes));
  setup(selector, classes);
}

/**
 * Goes through document and finds elements that need to have positioning classes
 * @param {String} selector The selector for the parent element
 * @param {Object} classes Classes (optional) @see setPositionClasses
 */
export function setup(selector, classes) {
  document.querySelectorAll(selector).forEach(element => setPositionClasses(element, classes || undefined));
}