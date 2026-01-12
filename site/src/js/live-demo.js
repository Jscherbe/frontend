/**
 * @module live-demo
 * @description Setups interface for creating live previews
 */


import Twig from "twig";
import { dispatchCoreEvent } from "@Lib/js/index.js";
import { getElement } from "@ulu/utils/browser/dom.js";

/**
 * Default data attributes
 */
export const attrs = {
  init: "data-live-demo-init",
  context: "data-live-demo",
  options: "data-live-demo-options"
};

// Utils for selecting things based on attributes
const attrSelector = key => `[${ attrs[key] }]`;
const attrSelectorInitial = key => `${ attrSelector(key) }:not([${ attrs.init }])`;
const queryAllInitial = key => document.querySelectorAll(attrSelectorInitial(key));
const debugLog = (...msgs) => console.log("Live Demo:", ...msgs);

/**
 * Default Options 
 */
export const defaults = {
  display: "[data-live-demo-display]",
  form: "[data-live-demo-form]",
};

/**
 * Initialize everything in document
 */
export function init() {
  setup();
}

/**
 * Query and setup all 
 */
export function setup() {
  queryAllInitial("context").forEach(context => {
    const optionsScript = context.querySelector(attrSelector("options"));
    if (!optionsScript) {
      console.error("Missing options", context);
      return;
    }
    const options = JSON.parse(optionsScript.innerHTML);
    context.setAttribute(attrs.init, "");
    setupInstance({ context, ...options });
  });
}

/**
 * Sets up instance for managing template and form
 * @param {Object} options 
 */
export function setupInstance(userOptions) {
  const options = Object.assign({}, defaults, userOptions);
  const { context, debug } = options;

  if (debug) {
    debugLog("options:", options);
  }

  const form = getElement(options.form, context);
  const display = getElement(options.display, context);

  if (!form || !display) {
    throw new Error("Unable to locate form or display for live demo", options);
  }
  
  const twigTemplate = Twig.twig({
    data: options.template
  });

  if (debug) {
    debugLog("twigTemplate", twigTemplate);
  }

  // Run initially and watch for changes
  render();
  form.addEventListener("change", update);
  
  function update() {
    render();
    dispatchCoreEvent("pageModified", context);
  }

  function render() {
    const formData = new FormData(form);
    const values = {};
    formData.forEach((value, key) => { values[key] = value });

    const markup = twigTemplate.render(values);
    if (debug) {
      debugLog("Data Passed by Form to template:", values);
      debugLog("Markup from rendering template:", markup);
    }
    
    display.innerHTML = markup;
  }
}