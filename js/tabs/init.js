/**
 * @module tabs
 */

import AriaTablist from "aria-tablist";
import { openByCurrentHash, handleOpen, setHeights } from "./utils.js";

const initAttr = "data-ulu-tablist-init";
const errorHeader = "[data-ulu-tablist] error:";

/**
 * Array of current tab instances (exported if you need to interact with them)
 * @type {Array} 
 */
export const instances = [];

/**
 * Init all instances currently in document
 * @param {Object} options Options to serve as defaults
 */
export function init(options = {}) {
  const initial = () => {
    initWithin(document, options);
    // Run this on page load, optionally exported for use when page is running
    instances.forEach(openByCurrentHash);
  };
  
  if (document.readyState === "complete") {
    initial();
  } else {
    window.addEventListener("load", initial);
  }
  // Initialize when page updates/changes
  document.addEventListener("pageModified", e => initWithin(e.target, options));
}

/**
 * Init all tabs within a certain context
 * @param {Node} context Element to init within
 * @param {Object} options Options to serve as defaults
 */
export function initWithin(context, options = {}) {
  if (!context) {
    console.warn("Missing context to initWithin, skipping init of tabs");
    return;
  }
  const tablists = context.querySelectorAll(`[data-ulu-tablist]:not([${ initAttr }])`);
  tablists.forEach(element => setup(element, options));
}

/**
 * 
 * @param {Node} element Tablist Element
 * @param {Node} options Options to set as defaults (can be overridden by element dataset options)
 * @return {Object} Instance object
 */
export function setup(element, options = {}) {
  let elementOptions = {};
  
  if (element.dataset.uluTablist) {
    try {
      elementOptions = JSON.parse(element.dataset.uluTablist);
    } catch(e) {
      console.error(errorHeader, "(JSON Parse for options)", element);
    }
  }

  const config = Object.assign({}, options, elementOptions);

  if (config.vertical) {
    config.allArrows = true;
  }

  // Need to render the markup before checking height
  //  - used to wait until images had loaded
  const instance = { element, options };
  instance.ariaTablist = AriaTablist(element, {
    onOpen(...args) {
      args.unshift(instance);
      handleOpen.apply(null, args);
    },
    ...config
  });
  instances.push(instance);

  if (config.equalHeights) {
    setHeights(element);
  }

  element.setAttribute(initAttr, "");
  
  return instance;
}
