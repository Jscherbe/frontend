// Would be used in the head of the document
(function(d, w) {
  
  // The constructor will set unique props
  // And it will create/init the script tag
  function ScriptLoader(url, callback) {
    
    // Add the script tag
    var s = d.createElement("script");
    s.src = url;
    s.async = true;
    
    // Funciton to be run when script is loaded and executed
    // Note: This will be bound to this object
    function init() {
      for (var i = 0; i < this.callbacks.length; i++) {
        this.callbacks[i].call(this);
      }
      delete this.callbacks;
      this.loaded = true;
    }
    
    // Unique Props
    this.callbacks = [];
    this.loaded = false;
    this.script = s;
    
    // Ability to add callbacks when creating object
    if (callback) this.callbacks.push(callback);
    
    // Add listener for load and then attach document
    s.addEventListener("load", init.bind(this));
    
    // If the script is placed in the head we  
    // will make sure the the body exists
    var ds = d.readyState;
    
    if (ds === "complete" || 
        ds === "loaded" || 
        ds === "interactive") {
      // document has been parsed
      d.body.appendChild(s);
    } else {
      // Attach after the body is ready
      d.addEventListener("DOMContentLoaded", function() {
        d.body.appendChild(s);
      });
    }
  }
  
  // This method allows the user to add callbacks to be 
  // called when script is loaded and executed
  ScriptLoader.prototype.onLoad = function(callback) {
    if (!this.loaded) this.callbacks.push(callback);
    else callback.call(this);
  };
  
  // Create key for global access to class
  window.ScriptLoader = ScriptLoader;
}(document, window));