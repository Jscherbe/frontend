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
 * Check if a pointer event x/y was outside an elements bounding box
 */
export function wasClickOutside(element, event) {
  const rect = element.getBoundingClientRect();
  return (event.clientY < rect.top || // above
    event.clientY > rect.top + rect.height || // below
    event.clientX < rect.left || // left side
    event.clientX > rect.left + rect.width); // right side
}