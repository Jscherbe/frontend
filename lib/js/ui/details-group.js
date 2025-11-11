/**
 * @module ui/details-group
 * @description Manages groups of details (ie. onlyOneOpen at a time)
 */

import { ComponentInitializer } from "../core/component.js";

/**
 * Dialog Component Initializer
 */
export const initializer = new ComponentInitializer({ 
  type: "details-group", 
  baseAttribute: "data-ulu-details-group" 
});

const childInitAttr = initializer.getAttribute("child-init");
const defaults = {
  onlyOneOpen: true,
  childSelector: ":scope > details"
};

/**
 * Initialize everything in document
 * - This will only initialize elements once, it is safe to call on page changes
 */
export function init() {
  initializer.init({
    withData: true,
    coreEvents: ["pageModified"],
    setup({ element, data, initialize }) {
      setupGroup(element, data);
      initialize();
    }
  });
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
 * @param {Object} options - The options for this group
 * @returns {DetailsGroupInstance}      
 */
export function setupGroup(element, userOptions) {
  const options = Object.assign({}, defaults, userOptions);

  // Added try because we are using querySelectorAll with :scope by default
  // which will not work in Internet Explorer or early edge (some alt. browsers too)
  try {
    setupChildren();
  } catch(error) {
    console.error(error);
  }

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
      if (child.hasAttribute(childInitAttr)) {
        return;
      } else {
        child.setAttribute(childInitAttr, "");
      }
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
      child.removeAttribute(childInitAttr);
    });
    element.removeAttribute(initializer.getAttribute("init"));
  }

  return { destroy, element, setupChildren };
}