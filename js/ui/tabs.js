// =============================================================================
// Tabs
// =============================================================================
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

// =============================================================================

function initWithin(context) {
  // console.log('context:\n', context);
  if (!context) return;
  const tablists = context.querySelectorAll('[data-site-tablist]');
  // console.log('tablists:\n', tablists);
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
  if (element.dataset.siteTablist) {
    try {
      options = JSON.parse(element.dataset.siteTablist);
    } catch(e) {
      console.error(errorHeader, "(JSON Parse for options)", element);
    }
  }
  
  if (options.equalHeights) {
    // Fires callback async (images loading)
    setHeights(element, ready);
  } else {
    // Intialize right away
    ready();
  }
  
  function ready() {
    const instance = { element, options };
    instance.ariaTablist = AriaTablist(element, {
      onOpen(...args) {
        args.unshift(instance);
        handleOpen.apply(null, args);
      }
    });
    instances.push(instance);
  }
}
function handleOpen({ options }, panel, tab) {
  if (options.openByUrlHash && window.history) {
    window.history.replaceState(null, "", `#${ tab.id }`);
  }
}
function setHeights(element, callback) {
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
    setHeights();
  });

  function setHeights() {
    const heights = panels.map(panel => panel.offsetHeight);
    const max = Math.max(...heights);
    // console.log('max:\n', max);
    panels.forEach(panel => panel.style.minHeight = `${ max }px`);
    callback(); // Done waiting allow the init to continue
  }
}

export { instances, openByCurrentHash };




