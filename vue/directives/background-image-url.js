
/**
 * Background-image: url() directive
 * - Note: Using functional shorthand
 * @example
 *   Vue.directive('background-image-url', backgroundImageUrl);
 */
export function backgroundImageUrl(el, b) {
  if (b.value !== b.oldValue && b.value) {
    el.style.backgroundImage = "url(" + b.value + ")";
  }
}