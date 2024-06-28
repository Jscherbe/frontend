// Used for cards and things that look like they should be clickable even 
// though the link in their content is the only clickable element. This way the 
// entire cards content doesn't need to be in a link (which isn't accessible)
// - The script allows only for clicks with a duration of 250ms to avoid 
//   conflict with a user selecting text.
// - Works with either links or buttons because it just uses the elements .click()
// - Uses data-attributes for selection
import { getName } from "../events/index.js";
import { getDatasetOptionalJson } from "../utils/dom.js";

const attrs = {
  trigger: "data-proxy-click",
  init: "data-ulu-proxy-init",
};

const attrSelector = key => `[${ attrs[key] }]`;
const attrSelectorInitial = key => `${ attrSelector(key) }:not([${ attrs.init }])`;

export const defaults = {
  selector: "[data-proxy-click-source]",
  selectorPreventBase: "input, select, textarea, button, a, [tabindex='-1']",
  selectorPrevent: "",
  mousedownDurationPrevent: 250,
};

// Current default objects (user can override these)
let currentDefaults = { ...defaults };

/**
 * @param {Object} options Change options used as default for dialogs, can then be overriden by data attribute settings on element
 */
export function setDefaults(options) {
  currentDefaults = Object.assign({}, currentDefaults, options);
}
/**
 * Initialize everything in document
 * - This will only initialize elements once, it is safe to call on page changes
 */
export function init() {
  document.addEventListener(getName("pageModified"), setup);
  setup();
}

export function setup(context = document) {
  const proxies = context.querySelectorAll(attrSelectorInitial("trigger"));
  proxies.forEach(proxy => {
    const elOptions = getDatasetOptionalJson(proxy, "siteProxyClick");
    const options = Object.assign({}, currentDefaults, elOptions);
    const child = proxy.querySelector(options.selector);
    if (child) {
      attachHandlers(proxy, child, options);
      proxy.setAttribute(attrs.init, "");
    } else {
      console.error("Unable to locate proxy click source", options.selector);
    }
  });
}
export function attachHandlers(proxy, child, options) {
  const { selectorPreventBase: spb, selectorPrevent: sp } = options;
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
    if (shouldProxy && timeStamp - start < options.mousedownDurationPrevent) {
      child.click();
    }
  });
  proxy.style.cursor = "pointer";
}
