import { renderMarkdownInline, dedentBlock } from "../../../../generator/utils/markdown.js";

export { renderMarkdownInline, dedentBlock };

/**
 * Remove all line breaks
 * @param {String} string 
 * @returns {String}
 */
export function removeLineBreaks(string) {
  return string.replace(/[\r\n]+/g, '');
}

/**
 * Join classes array
 */
export function joinClasses(array) {
  return array.filter(v => v).join(" ").trim();
}

/**
 * Used for conditional inside string templates
 * @param {*} value Anything truthy here returns value
 * @param {value} callback Callback run if value is truthy
 * @return {String} Empty if cond was false
 */
export function when(value, callback) {
  return value ? callback(value) : "";
}

/**
 * For templates optional values
 * @param {*} value Value to include optional
 */
export function optional(value) {
  return value ? value : "";
}