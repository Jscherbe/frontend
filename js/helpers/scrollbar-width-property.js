/**
 * @module scrollbar-width-property
 */

/**
 * Sets a CSS custom property equal to the scrollbar width
 * @param {Node} element The element that is the child of a scrollabel container
 * @param {Node} container The container that can be scrolled
 * @param {Stirng} propName Custom property to set
 */
export default function addScrollbarProperty(element = document.body, container = window, propName = "--scrollbar-width") {
  const scrollbarWidth = container.innerWidth - element.clientWidth;
  element.style.setProperty(propName, `${ scrollbarWidth }px`);
}