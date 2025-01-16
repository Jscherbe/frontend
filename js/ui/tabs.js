/**
 * @module ui/tabs
 */

// TODO:
// - For Vertical tabs we should be updating the orientation when on mobile. 
//   Currently using all arrows so that the interface works in both 
//   orientations when vertical. Leaving that behavior for now but maybe consider
//   setting this up to destroy tab interface when ui layout changes?

import AriaTablist from "aria-tablist";

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
        panel.hidden = true;
      }
      return panelHeight;
    });
    const max = Math.max(...heights);
    panels.forEach(panel => panel.style.minHeight = `${ max }px`);
  });
}
