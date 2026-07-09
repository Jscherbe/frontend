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
 * Groups a parent's children into rows based on their visual coordinates (top and left positions).
 * Filters out hidden elements and sorts them visually to support CSS grid order properties.
 * @param {HTMLElement} parent The grid/parent container
 * @returns {HTMLElement[][]} A 2D array of rows, where each row is an array of elements in visual order.
 */
export function getVisualRows(parent) {
  const children = [...parent.children];

  // Map to bounding client rects and filter out hidden elements (e.g. display: none)
  const items = children
    .map(child => ({ child, rect: child.getBoundingClientRect() }))
    .filter(item => item.rect.width !== 0 || item.rect.height !== 0);

  if (items.length === 0) {
    return [];
  }

  // Sort items visually: top-to-bottom, then left-to-right to support CSS order properties.
  // Use Math.abs because comparison elements can be passed in either order; if a difference 
  // exists in either direction (> 1px threshold for sub-pixel rounding), sort by top offset.
  items.sort((a, b) => {
    if (Math.abs(a.rect.top - b.rect.top) > 1) {
      return a.rect.top - b.rect.top;
    }
    return a.rect.left - b.rect.left;
  });

  const rows = [];
  let currentY = null;

  // Group into rows
  items.forEach(({ child, rect }) => {
    if (currentY === null || Math.abs(rect.top - currentY) > 1) {
      rows.push([]);
      currentY = rect.top;
    }
    rows[rows.length - 1].push(child);
  });

  return rows;
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
  columnFirst: "position-column-first", 
  columnLast: "position-column-last", 
  rowFirst: "position-row-first", 
  rowLast: "position-row-last" 
}) {  
  const children = [...parent.children];
  
  // Remove previously set classes from all children first to avoid stale states
  children.forEach(child => child.classList.remove(...Object.values(classes)));

  const rows = getVisualRows(parent);

  if (rows.length === 0) return;

  // Apply row classes
  rows[0].forEach(child => child.classList.add(classes.rowFirst));
  rows[rows.length - 1].forEach(child => child.classList.add(classes.rowLast));

  // Apply column classes
  rows.forEach((row) => {
    row[0].classList.add(classes.columnFirst);
    row[row.length - 1].classList.add(classes.columnLast);
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
