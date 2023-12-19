/**
 * @module @ulu/frontend/ui/tabs
 */
// =============================================================================
// Tabs
// =============================================================================
// 
// Version:         1.0.1
// 
// Selected by: [data-site-tablist]
// 
// Possible options (passed in attribute JSON)
// - openByUrlHash | Optionally add "openByUrlHash" to   
//   have the scriptopen a tab and focus it on page load 
//   (and set it in history as they navigate)

import AriaTablist from 'aria-tablist';

const errorHeader = "Site Tablist [data-site-tablist] error:";
const instances = [];
// Init all instances currently in page
window.addEventListener("load", () => {
  initWithin(document);
  // Run this on page load, optionally exported for use when page is running
  instances.forEach(openByCurrentHash);
});

// Initialize when page updates/changes
document.addEventListener('pageModified', e => initWithin(e.target));

function initWithin(context) {
  if (!context) return;
  const tablists = context.querySelectorAll('[data-site-tablist]');
  tablists.forEach(init);
}
function openByCurrentHash({ options, ariaTablist }) {
  if (options.openByUrlHash) {
    const { hash } = window.location;
    if (hash && hash.length > 1) {
      const possibleId = hash.substring(1);
      ariaTablist.tabs.forEach(tab => {
        if (possibleId === tab.id) {
          ariaTablist.open(tab);
        }
      })
    }
  }
}
function init(element) {
  let options = {};
  const config = {};
  
  if (element.dataset.siteTablist) {
    try {
      options = JSON.parse(element.dataset.siteTablist);
    } catch(e) {
      console.error(errorHeader, "(JSON Parse for options)", element);
    }
  }
  if (options.vertical) {
    config.allArrows = true;
  }

  // Need to render the markup before checking height
  //  - used to wait until images had loaded
  ready();

  if (options.equalHeights) {
    setHeights(element);
  }
  
  function ready() {
    const instance = { element, options };
    instance.ariaTablist = AriaTablist(element, {
      onOpen(...args) {
        args.unshift(instance);
        handleOpen.apply(null, args);
      },
      ...config
    });
    instances.push(instance);
  }
}
function handleOpen({ options }, panel, tab) {
  if (options.openByUrlHash && window.history) {
    window.history.replaceState(null, "", `#${ tab.id }`);
  }
}
function setHeights(element) {
  const tabs = [ ...element.children];
  const panels = tabs.map(n => document.querySelector(`[aria-labelledby="${ n.id }"]`)); 
  const parent = panels[0].parentElement;
  const images = [ ...parent.querySelectorAll('img') ];
  const imagePromises = images.map(image => imagePromise(image));
  function imagePromise(image) {
    return new Promise((resolve, reject) => {
      image.onload = () => resolve(image);
      image.onerror = reject;
    });
  }
  Promise.all(imagePromises).then(() => {
    const heights = panels.map(panel => panel.offsetHeight);
    const max = Math.max(...heights);
    panels.forEach(panel => panel.style.minHeight = `${ max }px`);
  });
}

export { instances };




