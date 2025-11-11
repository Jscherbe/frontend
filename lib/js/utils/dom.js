/**
 * @module utils/dom
 */

import { kebabToCamel } from "@ulu/utils/string.js";

/**
 * Converts a data attribute name to its corresponding dataset property name.
 * @param {string} dataAttribute - The data attribute name (e.g., "data-ulu-dialog").
 * @returns {string} - The dataset property name (e.g., "uluDialog").
 */
export function dataAttributeToDatasetKey(attribute) {
  return kebabToCamel(attribute.replace(/^data-/, ""));
}

/**
 *   Sets up the positional classes that would come from the equal
 *   height module. Needs to be rerun by user when layout changes
 *   or new instances are added to the screen
 *   - Used for gutter crops
 *   - Used for rule placement
 *   - **Devs** Remember that default classes should match sass defaults
 *   @param {Node} parent  The grid parent <data-grid="">
 *   @param {Object} classes Override the default equal heights classes
 */
export function setPositionClasses(parent, classes = { 
  columnFirst: 'position-column-first', 
  columnLast: 'position-column-last', 
  rowFirst: 'position-row-first', 
  rowLast: 'position-row-last' 
}) {  
  const children = [...parent.children];
  const rows = [];
  let lastY;
  // Check element against last
  // If they don't match it's a new row create a new array
  // Then push into the last array in the rows array
  children.forEach((child) => {
    const y = child.getBoundingClientRect().y;
    if (lastY !== y) rows.push([]);
    rows[rows.length - 1].push(child);
    lastY = y;
    child.classList.remove(...Object.values(classes)); // Remove previously set classes
  });
  // Apply Classes
  rows.forEach((row, index) => {
    if (index === 0) 
      row.forEach(child => child.classList.add(classes.rowFirst));
    if (index == rows.length - 1) 
      row.forEach(child => child.classList.add(classes.rowLast));

    row.forEach((child, childIndex) => {
      if (childIndex === 0) 
        child.classList.add(classes.columnFirst);
      if (childIndex == row.length - 1) 
        child.classList.add(classes.columnLast);
    });
  });
}

/**
 * Resolves a class input (string or array) into a consistent array of class names.
 * @param {string|string[]} input - The class input, which can be a string, an array of strings, or any other value.
 * @returns {string[]} An array of class names. Returns an empty array for invalid or falsy input.
 * @example
 * resolveClassArray("fas fa-check  my-class"); // Returns ["fas", "fa-check", "my-class"]
 * resolveClassArray(["another-class", "yet-another-class"]); // Returns ["another-class", "yet-another-class"]
 * resolveClassArray("single-class"); // Returns ["single-class"]
 */
export function resolveClasses(classes) {
  if (typeof classes === "string") {
    return classes.split(" ").filter(c => c !== ""); // Split and remove empty strings
  } else if (Array.isArray(classes)) {
    return classes;
  } else if (!classes) {
      return [];
  } else {
    console.warn("resolveClassArray: Invalid class input type.", classes);
    return [];
  }
}
