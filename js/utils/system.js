/**
 * @module utils/system
 * @description Core classes and mechanisms that define how UI components are created and managed within the library
 */

import { hasRequiredProps } from "@ulu/utils/object.js";
import { getDatasetOptionalJson, dataAttributeToDatasetKey } from "./dom.js";

/**
 * Class serves as a utility for UI modules, handling the selection of elements and the initialization of corresponding component instances, ensuring consistent setup within the module
 */
export class ComponentInitializer {
  /**
   * Default Options
   */
  static defaults = {
    /**
     * Type of component (for logs)
     */
    type: null,
    /**
     * Prefix and base attribute name (used for base attribute and further element attribute names)
     */
    baseAttribute: null,
  };

  static requiredOptions = [
    "type",
    "attributeKeys"
  ];
  static hasRequiredOptions = hasRequiredProps(
    ComponentInitializer.requiredOptions
  );

  /**
   * Create a new instance of ComponentInitializer
   * @param {Object} options Options (see defaults)
   */
  constructor(options) {
    if (!ComponentInitializer.hasRequiredOptions(options)) {
      throw new Error(
        `Missing a required options: ${ ComponentInitializer.requiredOptions.join(", ") }`
      );
    }
    this.options = Object.assign({}, ComponentInitializer.defaults, options);
  }
  /**
   * Get an attribute name
   * @param {String} key Optional key, if no key will return baseAttribute if key will return key added to base
   * @returns {String} String like data-ulu-dialog or data-ulu-dialog-element
   */
  getAttribute(key) {
    const { baseAttribute }  = this.options;
    return key ? `${ baseAttribute }-${ key }` : `${ baseAttribute }`;
  }
  /**
   * Create an attribute selector
   * @param {String} key Optional key (see getAttribute)
   */
  attributeSelector(key) {
    return `[${ this.getAttribute(key) }]`;
  }
  /**
   * Create an attribute selector for initial
   * @return {String}
   */  
  attributeSelectorInitial() {
    return `${ this.attributeSelector(key) }:not([${ this.getAttribute("init") }])`
  }
  /**
   * Queries all main elements of a component that have not been initialized.
   * @param {HTMLElement} context The context to query within.
   * @returns {Array} Array of uninitialized main elements.
   */
  queryAllInitial(context = document) {
    return [ ...context.querySelectorAll(this.attributeSelectorInitial()) ];
  }
  /**
   * Queries all main elements of a component that have not been initialized and extracts their data attributes.
   * @param {HTMLElement} context The context to query within.
   * @returns {Array<{element: HTMLElement, data: object}>} An array of objects containing the elements and their data.
   */
  queryAllInitialWithData(context = document) {
    const elements = [ ...context.querySelectorAll(this.attributeSelector()) ];
    return elements.map((element) => ({
      element,
      data: this.getData(element),
    }));
  }
  /**
   * Sets the init attribute on an element, marking it as initialized.
   * @param {HTMLElement} element The element to initialize.
   */
  initializeElement(element) {
    element.setAttribute(this.getAttribute("init"), "");
  }
  /**
   * Get an elements dataset value as JSON or other value
   * @return {*} The value of the dataset, if JSON will return object else will return string value or undefined
   */
  getData(element) {
    const datasetKey = dataAttributeToDatasetKey(this.getAttribute());
    return getDatasetOptionalJson(element, datasetKey);
  }
  /**
   * Will output namespaced console logs for the given initializer
   */
  debug(...msgs) {
    console.log(`ULU: ${ this.options.type }:\n`, ...msgs);
  }
}

/**
 * Class serves as a base for representing individual occurrences of a UI component, providing a consistent structure for each
 */
export class ComponentInstance {

} 