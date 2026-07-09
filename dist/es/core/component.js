var d = Object.defineProperty;
var m = (n, t, e) => t in n ? d(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var o = (n, t, e) => m(n, typeof t != "symbol" ? t + "" : t, e);
import { hasRequiredProps as p } from "@ulu/utils/object.js";
import { getDatasetOptionalJson as b } from "@ulu/utils/browser/dom.js";
import { dataAttributeToDatasetKey as E } from "../utils/dom.js";
import { getCoreEventName as A } from "./events.js";
const s = class s {
  /**
   * Create a new instance of ComponentInitializer
   * @param {Object} options Options for configuring the component initializer.
   * @param {String} options.type Type of component (used for logs).
   * @param {String} options.baseAttribute Prefix and base attribute name (used for base attribute and further element attribute names).
   */
  constructor(t) {
    if (!s.hasRequiredOptions(t))
      throw new Error(
        `Missing a required options: ${s.requiredOptions.join(", ")}`
      );
    this.options = Object.assign({}, s.defaults, t), this.logTitle = `ULU: ${this.options.type}:
`;
  }
  /**
   * Initializes the component based on the provided configuration.
   * @param {Object} config The initialization configuration.
   * @param {Function} config.setup The setup function to call for each element.
   * @param {Function} config.update The update function to call for already initialized elements on coreEvents.
   * @param {String} config.key [null] The optional key to use with attribute selector.
   * @param {Boolean} config.withData [null] Whether to retrieve element data.
   * @param {Array} config.coreEvents [null] An array of core event names (e.g., 'pageModified') that should trigger a re-initialization.
   * @param {HTMLElement} config.context [document] The context to query within.
   */
  init(t) {
    var e;
    this.setupElements(t), (e = t.coreEvents) != null && e.length && t.coreEvents.forEach((i) => {
      const r = A(i);
      r && document.addEventListener(r, () => {
        this.setupElements(t), t.update && this.updateElements(t);
      });
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
    const { setup: e, key: i, withData: r, context: l } = t;
    this.queryAllInitial(i, r, l).forEach((a) => e(a, this));
  }
  /**
   * Processes the already initialized elements based on the provided configuration.
   * @param {object} config The initialization configuration.
   * @param {function} config.update The update function to call for each element.
   * @param {string} config.key The optional key to use with attribute selector.
   * @param {boolean} config.withData [false] Whether to retrieve element data.
   * @param {HTMLElement} config.context [document] The context to query within.
   */
  updateElements(t) {
    const { update: e, key: i, withData: r, context: l } = t;
    this.queryAllInitialized(i, r, l).forEach((a) => e(a, this));
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
   * @param {String} key Optional key
   * @return {String}
   */
  attributeSelectorInitial(t) {
    return `${this.attributeSelector(t)}:not([${this.getAttribute("init")}])`;
  }
  /**
   * Create an attribute selector for initialized elements
   * @param {String} key Optional key
   * @return {String}
   */
  attributeSelectorInitialized(t) {
    return `${this.attributeSelector(t)}[${this.getAttribute("init")}]`;
  }
  /**
   * Internal helper to query and map elements.
   * @private
   */
  queryElements(t, e, i, r = document, l = !1) {
    return [...r.querySelectorAll(t)].map((a) => {
      const h = {
        element: a,
        data: i ? this.getData(a, e) : null
      };
      return l && (h.initialize = () => this.initializeElement(a)), h;
    });
  }
  /**
   * Queries all main elements of a component that have not been initialized and extracts their data attributes.
   * @param {HTMLElement} context The context to query within.
   * @param {Boolean} withData Include dataset from element (as optional JSON)
   * @param {Node} context Element to query elements from
   * @returns {Array<{element: HTMLElement, data: object, initialize: Function}>} An array of objects containing the elements, their data, and convenience function initialize() which when called will set the init attribute on the element
   */
  queryAllInitial(t, e, i = document) {
    return this.queryElements(
      this.attributeSelectorInitial(t),
      t,
      e,
      i,
      !0
    );
  }
  /**
   * Queries all main elements of a component that have already been initialized and extracts their data attributes.
   * @param {HTMLElement} context The context to query within.
   * @param {Boolean} withData Include dataset from element (as optional JSON)
   * @param {Node} context Element to query elements from
   * @returns {Array<{element: HTMLElement, data: object}>} An array of objects containing the elements and their data
   */
  queryAllInitialized(t, e, i = document) {
    return this.queryElements(
      this.attributeSelectorInitialized(t),
      t,
      e,
      i,
      !1
    );
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
    const i = E(this.getAttribute(e));
    return b(t, i);
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
o(s, "defaults", {
  type: null,
  baseAttribute: null
}), o(s, "requiredOptions", [
  "type",
  "baseAttribute"
]), o(s, "hasRequiredOptions", p(
  s.requiredOptions
));
let c = s;
export {
  c as ComponentInitializer
};
