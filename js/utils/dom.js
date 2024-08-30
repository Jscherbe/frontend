const regexJsonString = /^[{\[][\s\S]*[}\]]$/;

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
    console.error(`Error getting JSON from dataset (${ key })\n`, element, error);
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
 */
export function getElement(target, context = document) {
  if (typeof target === "string") {
    return context.querySelector(target);
  } else if (target instanceof Element) {
    return target;
  } else {
    console.warn("Unable to getElement()", target);
    return null;
  }
} 