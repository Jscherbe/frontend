// =============================================================================
// Doc Ready - Script
// =============================================================================

// Version:         1.0.0

// Description:     Simple script that will add a property to the window for 
//                  other scripts to access. Functions will be fired after
//                  DomContentLoaded. 


(function(d) {
  var callbacks = [],
      fired = false;
  
  window.onDocReady = function(callback) {
    if (fired) callback();
    else callbacks.push(callback);
  };
  
  d.addEventListener("DOMContentLoaded", function() {
    fired = true;
    for (var i = 0; i < callbacks.length; i++) {
      callbacks[i]();
    }
  });
  
}(document));
