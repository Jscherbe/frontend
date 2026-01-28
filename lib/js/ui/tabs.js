/**
 * @module ui/tabs
 */

import { TabManager } from "./tab-manager.js";
import { ComponentInitializer } from "../core/component.js";
import { ensureId } from "../utils/id.js";

/**
 * Array of current tab instances (exported if you need to interact with them)
 * @type {Array} 
 */
export const instances = [];

/**
 * Tabs Component Initializer
 */
export const initializer = new ComponentInitializer({ 
  type: "tabs", 
  baseAttribute: "data-ulu-tablist"
});

/**
 * Init all instances currently in document
 */
export function init() {
  const initial = () => {
    initializer.init({
      coreEvents: ["pageModified"],
      withData: true,
      setup({ element, data, initialize }) {
        setup(element, data);
        initialize();
      }
    });
  };

  if (document.readyState === "complete") {
    initial();
  } else {
    window.addEventListener("load", initial);
  }
}

/**
 * Setup a new TabManager instance
 * @param {HTMLElement} element Tablist Element
 * @param {object} options Options to set as defaults
 * @return {object} Instance object
 */
export function setup(element, options = {}) {
  const config = { ...options };

  // Backwards compatibility: `vertical:true` implies `allArrows:true`
  if (config.vertical) {
    config.allArrows = true;
  }

  // Backwards compatibility: `openByUrlHash:true` implies `setUrlHash:true`
  // to replicate the behavior of the old aria-tablist library.
  if (config.openByUrlHash) {
    config.setUrlHash = true;
  }

  // --- SHIM LOGIC START ---
  // For backwards compatibility, we ensure `aria-controls` is present,
  // generating it from the legacy `aria-labelledby` pattern if needed.
  const tabs = [...element.children];
  
  tabs.forEach((tab) => {
    if (!tab.hasAttribute('aria-controls')) {
      // Find the panel using the old association method, but without requiring role="tabpanel"
      const panel = document.querySelector(`[aria-labelledby="${tab.id}"]`);
      if (panel) {
        // Ensure the panel has an ID before we try to link it
        ensureId(panel);
        // Add the `aria-controls` attribute to the tab
        tab.setAttribute('aria-controls', panel.id);
      }
    }
  });
  // --- SHIM LOGIC END ---

  // Create the instance object that we'll store
  const instance = { element, options };

  // Instantiate the new TabManager. It will find its own tabs/panels
  // and handle all URL hash and equal heights logic internally.
  instance.tabManager = new TabManager(element, config);

  instances.push(instance);
  
  return instance;
}
