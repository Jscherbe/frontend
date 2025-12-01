var h = Object.defineProperty;
var c = (r, t, e) => t in r ? h(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var n = (r, t, e) => c(r, typeof t != "symbol" ? t + "" : t, e);
import { hasRequiredProps as p } from "@ulu/utils/object.js";
import { getDatasetOptionalJson as b } from "@ulu/utils/browser/dom.js";
import { dataAttributeToDatasetKey as d } from "../utils/dom.js";
import { getCoreEventName as g } from "./events.js";
const i = class i {
  /**
   * Create a new instance of ComponentInitializer
   * @param {Object} options Options for configuring the component initializer.
   * @param {String} options.type Type of component (used for logs).
   * @param {String} options.baseAttribute Prefix and base attribute name (used for base attribute and further element attribute names).
   */
  constructor(t) {
    if (!i.hasRequiredOptions(t))
      throw new Error(
        `Missing a required options: ${i.requiredOptions.join(", ")}`
      );
    this.options = Object.assign({}, i.defaults, t), this.logTitle = `ULU: ${this.options.type}:
`;
  }
  /**
   * Initializes the component based on the provided configuration.
   * @param {Object} config The initialization configuration.
   * @param {Function} config.setup The setup function to call for each element.
   * @param {String} config.key [null] The optional key to use with attribute selector.
   * @param {Boolean} config.withData [null] Whether to retrieve element data.
   * @param {Array} config.coreEvents [null] An array of core event names (e.g., 'pageModified') that should trigger a re-initialization.
   * @param {HTMLElement} config.context [document] The context to query within.
   */
  init(t) {
    var e;
    this.setupElements(t), (e = t.coreEvents) != null && e.length && t.coreEvents.forEach((s) => {
      const o = g(s);
      o && document.addEventListener(o, () => this.setupElements(t));
    });
  }
  /**
   * Processes the elements based on the provided configuration.
   * @param {object} config The initialization configuration.
   * @param {function} config.setup The setup function to call for each element.
   * @param {string} config.key The optional key to use with attribute selector.
   * @param {boolean} config.withData [false] Whether to retrieve element data.
   * @param {HTMLElement} config.context [document] The context to query within.
   */
  setupElements(t) {
    const { setup: e, key: s, withData: o, context: a } = t;
    this.queryAllInitial(s, o, a).forEach((u) => e(u, this));
  }
  /**
   * Get an attribute name
   * @param {String} key Optional key, if no key will return baseAttribute if key will return key added to base
   * @returns {String} String like data-ulu-dialog or data-ulu-dialog-element
   */
  getAttribute(t) {
    const { baseAttribute: e } = this.options;
    return t ? `${e}-${t}` : `${e}`;
  }
  /**
   * Create an attribute selector
   * @param {String} key Optional key (see getAttribute)
   */
  attributeSelector(t) {
    return `[${this.getAttribute(t)}]`;
  }
  /**
   * Create an attribute selector for initial
   * @return {String}
   */
  attributeSelectorInitial(t) {
    return `${this.attributeSelector(t)}:not([${this.getAttribute("init")}])`;
  }
  /**
   * Queries all main elements of a component that have not been initialized and extracts their data attributes.
   * @param {HTMLElement} context The context to query within.
   * @param {Boolean} withData Include dataset from element (as optional JSON)
   * @param {Node} context Element to query elements from
   * @returns {Array<{element: HTMLElement, data: object, initialize: Function}>} An array of objects containing the elements, their data, and convenience function initialize() which when called will set the init attribute on the element
   */
  queryAllInitial(t, e, s = document) {
    return [...s.querySelectorAll(this.attributeSelectorInitial(t))].map((a) => ({
      element: a,
      data: e ? this.getData(a, t) : null,
      initialize: () => this.initializeElement(a)
    }));
  }
  /**
   * Sets the init attribute on an element, marking it as initialized.
   * @param {HTMLElement} element The element to initialize.
   */
  initializeElement(t) {
    t.setAttribute(this.getAttribute("init"), "");
  }
  /**
   * Get an elements dataset value as JSON or other value
   * @return {*} The value of the dataset, if JSON will return object else will return string value or undefined
   */
  getData(t, e) {
    const s = d(this.getAttribute(e));
    return b(t, s);
  }
  /**
   * Will output namespaced console logs for the given initializer
   */
  log(...t) {
    console.log(this.logTitle, ...t);
  }
  /**
   * Will output namespaced console warnings for the given initializer
   */
  warn(...t) {
    console.warn(this.logTitle, ...t);
  }
  /**
   * Will output namespaced console error for the given initializer
   */
  logError(...t) {
    console.error(this.logTitle, ...t);
  }
};
n(i, "defaults", {
  type: null,
  baseAttribute: null
}), n(i, "requiredOptions", [
  "type",
  "baseAttribute"
]), n(i, "hasRequiredOptions", p(
  i.requiredOptions
));
let l = i;
export {
  l as ComponentInitializer
};
