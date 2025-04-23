/**
 * @module utils/system
 * @description Core classes and mechanisms that define how UI components are created and managed within the library
 */

import { hasRequiredProps } from "@ulu/utils/object.js";
import { getDatasetOptionalJson, dataAttributeToDatasetKey } from "./dom.js";
import { getName } from "../events/index.js";

/**
 * Class serves as a utility for UI modules, handling the selection of elements and the initialization of corresponding component instances, ensuring consistent setup within the module
 */
export class ComponentInitializer {
  static defaults = {
    type: null,
    baseAttribute: null
  };
  static requiredOptions = [
    "type",
    "baseAttribute"
  ];
  static hasRequiredOptions = hasRequiredProps(
    ComponentInitializer.requiredOptions
  );

  /**
   * Create a new instance of ComponentInitializer
   * @param {Object} options Options for configuring the component initializer.
   * @param {String} options.type Type of component (used for logs).
   * @param {String} options.baseAttribute Prefix and base attribute name (used for base attribute and further element attribute names).
   */
  constructor(options) {
    if (!ComponentInitializer.hasRequiredOptions(options)) {
      throw new Error(
        `Missing a required options: ${ ComponentInitializer.requiredOptions.join(", ") }`
      );
    }
    this.options = Object.assign({}, ComponentInitializer.defaults, options);
    this.logTitle = `ULU: ${ this.options.type }:\n`;
  }
  /**
   * Initializes the component based on the provided configuration.
   * @param {Object} config The initialization configuration.
   * @param {Function} config.setup The setup function to call for each element.
   * @param {String} config.key [null] The optional key to use with attribute selector.
   * @param {Boolean} config.withData [null] Whether to retrieve element data.
   * @param {Array} config.events [null] Ulu events that should call setup when dispatched (ie. pageModified, pageResized)
   * @param {Boolean} config.onPageResized [null] Whether to bind event listener for page resize end
   * @param {HTMLElement} config.context [document] The context to query within.
   */
  init(config) {
    this.setupElements(config);
    // Attach Handler to reinitialize if page is updated
    // Specifically checking entire document incase element that dispatched 
    // event made alterations  outside of itself
    if (config.events?.length) {
      config.events.forEach(name => {
        document.addEventListener(getName(name), () => this.setupElements(config));
      });
    }
  }
  /**
   * Processes the elements based on the provided configuration.
   * @param {object} config The initialization configuration.
   * @param {function} config.setup The setup function to call for each element.
   * @param {string} config.key The optional key to use with attribute selector.
   * @param {boolean} config.withData [false] Whether to retrieve element data.
   * @param {boolean} config.onPageModified [true] Whether to bind event listener for page modifications.
   * @param {HTMLElement} config.context [document] The context to query within.
   */
  setupElements(config) {
    const { setup, key, withData, context } = config;
    const elementsWithData = this.queryAllInitial(key, withData, context);
    elementsWithData.forEach(elementWithData => setup(elementWithData, this));
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
  attributeSelectorInitial(key) {
    return `${ this.attributeSelector(key) }:not([${ this.getAttribute("init") }])`
  }
  /**
   * Queries all main elements of a component that have not been initialized and extracts their data attributes.
   * @param {HTMLElement} context The context to query within.
   * @param {Boolean} withData Include dataset from element (as optional JSON)
   * @param {Node} context Element to query elements from
   * @returns {Array<{element: HTMLElement, data: object, initialize: Function}>} An array of objects containing the elements, their data, and convenience function initialize() which when called will set the init attribute on the element
   */
  queryAllInitial(key, withData, context = document) {
    const elements = [ ...context.querySelectorAll(this.attributeSelectorInitial(key)) ];
    return elements.map((element) => ({
      element,
      data: withData ? this.getData(element, key) : null,
      initialize: () => this.initializeElement(element)
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
  getData(element, key) {
    const datasetKey = dataAttributeToDatasetKey(this.getAttribute(key));
    return getDatasetOptionalJson(element, datasetKey);
  }
  /**
   * Will output namespaced console logs for the given initializer
   */
  log(...msgs) {
    console.log(this.logTitle, ...msgs);
  }
  /**
   * Will output namespaced console warnings for the given initializer
   */
  warn(...msgs) {
    console.warn(this.logTitle, ...msgs);
  }
  /**
   * Will output namespaced console error for the given initializer
   */
  logError(...msgs) {
    console.error(this.logTitle, ...msgs);
  }
}

/**
 * Class serves as a base for representing individual occurrences of a UI component, providing a consistent structure for each
 */
export class ComponentInstance {

} 