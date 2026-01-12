/**
 * Checks if a given DOM element is an anchor (link) element.
 *
 * @param {Element | null | undefined} element The DOM element to check.
 * @returns {boolean} `true` if the element is an anchor tag (`<a>`), `false` otherwise.
 */
export function isLink(element) {
  return element && element.tagName.toLowerCase() === "a";
}