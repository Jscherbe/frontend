/**
 * @module ui/proxy-click
 * @description Used for cards and things that look like they should be clickable 
 * even though the link in their content is the only clickable element. This way 
 * the entire cards content doesn't need to be in a link (which isn't accessible). 
 * 
 * The script allows only for clicks with a duration of 250ms to avoid conflict 
 * with a user selecting text. Works with either links or buttons because it just 
 * uses the elements .click(). Uses data-attributes for selection by default.
 */

import { ComponentInitializer } from "../core/component.js";

/**
 * Proxy Click Component Initializer
 */
export const initializer = new ComponentInitializer({ 
  type: "proxy-click", 
  baseAttribute: "data-ulu-proxy-click"
});

/**
 * Default options
 */
export const defaults = {
  selector: "[data-ulu-proxy-click-source]",
  selectorPreventBase: "input, select, textarea, button, a, [tabindex='-1']",
  selectorPrevent: "",
  mousedownDurationPrevent: 250,
};

// Current default objects (user can override these)
let currentDefaults = { ...defaults };

/**
 * @param {Object} options Change options used as default for dialogs, can then be overridden by data attribute settings on element
 */
export function setDefaults(options) {
  currentDefaults = Object.assign({}, currentDefaults, options);
}
/**
 * Initialize everything in document
 * - This will only initialize elements once, it is safe to call on page changes
 */
export function init() {
  initializer.init({
    withData: true,
    events: ["pageModified"],
    setup({ element, data, initialize }) {
      setupProxy(element, data);
      initialize();
    }
  });
}

/**
 * Setup a single proxy click
 * @param {Node} proxy The container who's click should proxy the click of inner element with options.selector (defaults to [data-ulu-proxy-click-source])
 * @param {Object} userOptions Options to override defaults
 */
export function setupProxy(proxy, userOptions) {
  const options = Object.assign({}, currentDefaults, userOptions);
  const child = proxy.querySelector(options.selector);
  if (child) {
    attachHandlers(proxy, child, options);
  } else {
    console.error("Unable to locate proxy click source", options.selector);
  }
}

/**
 * Main function for attaching behaviors that enable proxy click
 * @param {Node} proxy The container who's click should proxy the click of inner element with options.selector (defaults to [data-ulu-proxy-click-source])
 * @param {Node} child The element who is being proxied and will get clicked if the proxy is clicked (as long as not an interactive element within proxy)
 * @param {Object} config Merged/final options object
 */
export function attachHandlers(proxy, child, config) {
  const { selectorPreventBase: spb, selectorPrevent: sp } = config;
  const selectorPrevent = `${ spb }${ sp ? `, ${ sp }` : "" }`;
  let start, shouldProxy;
  proxy.addEventListener("mousedown", ({ target, timeStamp }) => {
    shouldProxy = false;
    if (!target.matches(selectorPrevent)) {
      shouldProxy = true;
      start = timeStamp;
    }
  });
  proxy.addEventListener("mouseup", ({ timeStamp }) => {
    if (shouldProxy && timeStamp - start < config.mousedownDurationPrevent) {
      child.click();
    }
  });
  proxy.style.cursor = "pointer";
}
