/**
 * @module ui/tabs
 */

// TODO:
// - For Vertical tabs we should be updating the orientation when on mobile. 
//   Currently using all arrows so that the interface works in both 
//   orientations when vertical. Leaving that behavior for now but maybe consider
//   setting this up to destroy tab interface when ui layout changes?

import AriaTablist from "aria-tablist";
import { ComponentInitializer } from "../utils/system.js";

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
      events: ["pageModified"],
      withData: true,
      setup({ element, data, initialize }) {
        setup(element, data);
        initialize();
      }
    });
    
    // Run this on page load, optionally exported for use when page is running
    instances.forEach(openByCurrentHash);
  };
  
  if (document.readyState === "complete") {
    initial();
  } else {
    window.addEventListener("load", initial);
  }
}

/**
 * 
 * @param {Node} element Tablist Element
 * @param {Node} options Options to set as defaults (can be overridden by element dataset options)
 * @return {Object} Instance object
 */
export function setup(element, options = {}) {
  const config = Object.assign({}, options);

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
  
  return instance;
}

/**
 * Opens the a tabpanel if it matches current hash (used in initial init)
 */
function openByCurrentHash({ options, ariaTablist }) {
  if (options.openByUrlHash) {
    const { hash } = window.location;
    if (hash && hash.length > 1) {
      const possibleId = hash.substring(1);
      ariaTablist.tabs.forEach(tab => {
        if (possibleId === tab.id) {
          ariaTablist.open(tab);
        }
      });
    }
  }
}

/**
 * Responsible for setting hash on open if option is set
 */
function handleOpen({ options }, panel, tab) {
  if (options.openByUrlHash && window.history) {
    window.history.replaceState(null, "", `#${ tab.id }`);
  }
}

/**
 * Responsible for creating equal height tab panels
 */
function setHeights(element) {
  const tabs = [ ...element.children];
  const panels = tabs.map(n => document.querySelector(`[aria-labelledby="${ n.id }"]`)); 
  const parent = panels[0].parentElement;
  const images = [ ...parent.querySelectorAll("img") ];
  const imagePromises = images.map(image => imagePromise(image));
  function imagePromise(image) {
    return new Promise((resolve) => {
      if (image.complete) {
        resolve(image);
      } else {
        image.onload = resolve;
        // Errors should also resolve so that height matching continues
        image.onerror = resolve; 
      }
    });
  }
  // Run after images are loaded, or if no images it will resolve and run
  Promise.all(imagePromises).then(() => {
    const heights = panels.map(panel => {
      let panelHeight = panel.offsetHeight;
      if (panel.hidden) {
        panel.hidden = false;
        panelHeight = panel.offsetHeight;
        // This explicity needs "hidden" for aria-tablist (it checks this string value)
        // Will break the initial window push state when using openWithUrlHash
        panel.setAttribute("hidden", "hidden"); 
      }
      return panelHeight;
    });
    const max = Math.max(...heights);
    panels.forEach(panel => panel.style.minHeight = `${ max }px`);
  });
}
