/**
 * Get an elements JSON dataset value
 * @param {Node} element 
 * @param {String} key key in dataset object for element
 * @returns {Object} Empty object or JSON object from dataset
 */
export function getDatasetJson(element, key) {
  const passed = element.dataset[key];
  return passed ? JSON.parse(passed) : {};
}