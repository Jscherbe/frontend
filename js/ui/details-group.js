/**
 * @module ui/details-group
 * @description Manages groups of details (ie. onlyOneOpen at a time)
 */

import { getName } from "../events/index.js";
import { getDatasetOptionalJson } from "../utils/dom.js";

export const attrs = {
  init: "data-ulu-details-group-init",
  childInit: "data-ulu-details-group-child-init",
  group: "data-ulu-details-group",
};

// Utils for selecting things based on attributes
const attrSelector = key => `[${ attrs[key] }]`;
const attrSelectorInitial = key => `${ attrSelector(key) }:not([${ attrs.init }])`;

const defaults  = {
  onlyOneOpen: true,
  childSelector: ":scope > details"
};

/**
 * Initialize everything in document
 * - This will only initialize elements once, it is safe to call on page changes
 */
export function init() {
  document.addEventListener(getName("pageModified"), setup);
  setup();
}

/**
 * Setup all dialog groups within context
 * @param {HTMLElement} context [document] Element to query within
 * @returns {Array} Array matching the groups queried with their return objects from setupGroup() [used for destroy/etc]
 */
export function setup(context = document) {
  // Added try because we are using querySelectorAll with :scope by default
  // which will not work in Internet Explorer or early edge (some alt. browsers too)
  try {
    const elements = context.querySelectorAll(attrSelectorInitial("group"));
    return [...elements].map(setupGroup);
  } catch(error) {
    console.error(error);
  }
}

/**
 * @typedef {Object} DetailsGroupInstance
 * @property {Function} destroy A function to remove event listeners and attributes.
 * @property {HTMLElement} element The parent element.
 * @property {Function} setupChildren A function to initialize the child details elements.
 */

/**
 * Sets up a single group of details elements to manage their behavior.
 * @param {HTMLElement} element - The parent element containing the details elements.
 * @returns {DetailsGroupInstance}      
 */
export function setupGroup(element) {
  const elementOptions = getDatasetOptionalJson(element, "uluDetailsGroup");
  const options = Object.assign({}, defaults, elementOptions);
  
  element.setAttribute(attrs.t, "");
  setupChildren();

  /**
   * Queries all current children in element
   * @ignore
   */
  function queryChildren() {
    return element.querySelectorAll(options.childSelector);
  }

  /**
   * Sets up any children not already setup in group
   */
  function setupChildren() {
    queryChildren().forEach(child => {
      if (child.hasAttribute(attrs.childInit)) {
        return;
      } else {
        child.setAttribute(attrs.childInit, "");
      }
      console.log(child);
      
      child.addEventListener("toggle", toggleHandler);  
    });
  }
  
  /**
   * Toggle handler for child details element
   * - For things like one open at a time
   * @ignore
   */
  function toggleHandler({ target }) {
    if (options.onlyOneOpen) {
      if (target.open) {
        queryChildren().forEach(child => {
          if (child !== target && child.open) {
            child.open = false;
          }
        });
      }
    }
  }

  /**
   * Function removes all handlers and init attributes
   */
  function destroy() {
    queryChildren().forEach(child => {
      child.removeEventListener("toggle", toggleHandler);
      child.removeAttribute(attrs.childInit);
    });
    element.removeAttribute(attrs.init);
  }

  return { destroy, element, setupChildren };
}