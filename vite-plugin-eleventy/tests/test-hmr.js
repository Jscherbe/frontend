// Create or find a unique element for this module to manage.
let hmrIndicator = document.getElementById('hmr-test-indicator');

// If the element doesn't exist, create and style it.
if (!hmrIndicator) {
  hmrIndicator = document.createElement('div');
  hmrIndicator.id = 'hmr-test-indicator';
  document.body.appendChild(hmrIndicator);

  // Style it to be visible
  Object.assign(hmrIndicator.style, {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    background: '#007bff',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '5px',
    zIndex: '9999',
    fontFamily: 'sans-serif',
    fontSize: '14px'
  });
}

// The message we want to update.
// Try changing the text "HMR Test: v1" to "HMR Test: v2" and save.
hmrIndicator.textContent = "HMR Test: v2";

console.log("HMR test module loaded. Edit the textContent in site/src/js/test-hmr.js to test.");

// This is the essential part for Vite HMR
if (import.meta.hot) {
  // This line tells Vite "this module knows how to handle updates to itself."
  // When you save a change, Vite will re-run this file's code but will
  // NOT reload the page because this module "accepts" the update.
  import.meta.hot.accept();

  // You can also define a "dispose" handler to clean up anything
  // this module created before it gets replaced.
  import.meta.hot.dispose(() => {
    // We want the indicator to persist, so we won't remove it.
    // But if you had timers or event listeners, you would clear them here.
    console.log("Old hmr-test.js module is being disposed of.");
  });
}