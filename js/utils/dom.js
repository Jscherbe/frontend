/**
 * @module utils/dom
 */


export const regexJsonString = /^[{\[][\s\S]*[}\]]$/;

/**
 * Converts a data attribute name to its corresponding dataset property name.
 * @param {string} dataAttribute - The data attribute name (e.g., "data-ulu-dialog").
 * @returns {string} - The dataset property name (e.g., "uluDialog").
 */
export function dataAttributeToDatasetKey(attribute) {
  // Remove "data-" prefix then convert kebab-case to camelCase
  return attribute
    .replace(/^data-/, "")
    .replace(/-([a-z])/g, (_match, letter) => letter.toUpperCase());
}

/**
 * Get an elements JSON dataset value
 * @param {Node} element 
 * @param {String} key key in dataset object for element
 * @returns {Object} Empty object or JSON object from dataset
 */
export function getDatasetJson(element, key) {
  const passed = element.dataset[key];
  try {
    return JSON.parse(passed);
  } catch (error) {
    console.error(`Error getting JSON from dataset (${ key }) -- "${ passed }"\n`, element, error);
    return {};
  }
}

/**
 * Get an elements JSON dataset value that could potentially just be a single string
 * - If JSON it will return the object else it will return the value directly
 * @param {Node} element 
 * @param {String} key key in dataset object for element
 * @returns {Object|String} JSON object or current dataset value (string or empty string if no value)
 */
export function getDatasetOptionalJson(element, key) {
  const passed = element.dataset[key];
  if (passed && regexJsonString.test(passed.trim())) {
    return getDatasetJson(element, key);
  } else {
    return passed;
  }
}

/**
 * Check if a pointer event x/y was outside an elements bounding box
 */
export function wasClickOutside(element, event) {
  const rect = element.getBoundingClientRect();
  return (event.clientY < rect.top || // above
    event.clientY > rect.top + rect.height || // below
    event.clientX < rect.left || // left side
    event.clientX > rect.left + rect.width); // right side
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
 * Resolve a target to Element
 * @param {String|Node} target The selector or node/element
 * @param {Object} context [document] The context to query possible selectors from
 * @return {HTMLElement} The element or null if not found
 */
export function getElement(target, context = document) {
  if (typeof target === "string") {
    return context.querySelector(target);
  } else if (target instanceof Element) {
    return target;
  } else {
    console.warn("getElement: Invalid target type (expected String/Node)", target);
    return null;
  }
} 

/**
 * Resolve a target to Elements
 * @param {String|Node} target The selector or node/element
 * @param {Object} context [document] The context to query possible selectors from
 * @return {Array} The elements or null if not found
 */
export function getElements(target, context = document) {
  if (typeof target === "string") {
    return [...context.querySelectorAll(target)];
  } else if (target instanceof Element) {
    return [target];
  } else if (Array.isArray(target) || target instanceof NodeList) {
    return [...target];
  } else {
    console.warn("getElement: Invalid target type (expected String/Node/Array/Node List)", target);
    return null;
  }
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

/**
 * Sets a CSS custom property equal to the scrollbar width.
 * @param {object} options - Configuration options.
 * @param {HTMLElement} [options.scrollableChild=document.body] - An element that is a child of a scrollable container (used for width calculation).
 * @param {Window|HTMLElement} [options.container=window] - The container that can be scrolled (used for width calculation).
 * @param {HTMLElement} [options.propertyElement=document.documentElement] - The element to which the custom property will be added. Defaults to document.documentElement for :root access.
 * @param {string} [options.propName="--ulu-scrollbar-width"] - The name of the custom property to set.
 */
export function addScrollbarProperty(options) {
  const defaults = {
    scrollableChild: document.body,
    container: window,
    propertyElement: document.documentElement,
    propName: "--ulu-scrollbar-width",
  };

  const config = { ...defaults, ...options };
  const { scrollableChild, container, propertyElement, propName } = config;

  const scrollbarWidth = getScrollbarWidth(scrollableChild, container);
  propertyElement.style.setProperty(propName, `${ scrollbarWidth }px`);
}

/**
 * Calculates the width of the scrollbar.
 *
 * @param {HTMLElement} [element=document.body] -The element that is the child of a scrollable container
 * @param {Window|HTMLElement} [container=window] - The container that can be scrolled
 * @returns {number} The width of the scrollbar in pixels.
 */
export function getScrollbarWidth(element = document.body, container = window) {
  return container.innerWidth - element.clientWidth;
}