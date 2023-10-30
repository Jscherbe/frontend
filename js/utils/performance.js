// Version:         1.0.0 

/**
 * Returns a function, that, as long as it continues to be invoked, will not be triggered
 * @param {Function} callback Function to invoke 
 * @param {Number} wait  Amount of time after (milliseconds)
 * @param {Boolean} immediate  trigger the function on the leading edge, instead of the trailing.
 * @param {Object} valueThis  Context for function
 * @author David Walsh  
 *   - https://davidwalsh.name/javascript-debounce-function
 */
 export function debounce(callback, wait, immediate, valueThis) {
  var timeout;
  return function executedFunction() {
    var context = valueThis || this;
    var args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) callback.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) callback.apply(context, args);
  };
}

/**
 * Debounces function using requestAnimationFrame()
 * @param  {Function} callback Function to invoke, cancelled if called faster than RAF
 * @param  {Object} context Optional context to bind to callback
 */
 export function debounceAnimationFrame(callback, context = null) {
  let tid;
  return function debounced() {
    const args = arguments;
    if (tid) window.cancelAnimationFrame(tid);
    tid = window.requestAnimationFrame(() => {
      tid = false;
      callback.apply(context, args);
    });
  };
}
