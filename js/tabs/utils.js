/**
 * @module tabs/utils
 */


/**
 * Opens the a tabpanel if it matches current hash (used in initial init)
 */
export function openByCurrentHash({ options, ariaTablist }) {
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
export function handleOpen({ options }, panel, tab) {
  if (options.openByUrlHash && window.history) {
    window.history.replaceState(null, "", `#${ tab.id }`);
  }
}

/**
 * Responsible for creating equal height tab panels
 */
export function setHeights(element) {
  const tabs = [ ...element.children];
  const panels = tabs.map(n => document.querySelector(`[aria-labelledby="${ n.id }"]`)); 
  const parent = panels[0].parentElement;
  const images = [ ...parent.querySelectorAll("img") ];
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
