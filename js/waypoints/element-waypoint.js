// =============================================================================
// Element Waypoint
// =============================================================================

// Version:         1.0.1

// Requires:        Global access to window.Waypoint

/**
 * Reusable waypoint class that adds two waypoints in order to call user 
 * handler when the element is in view or out of view. 
 */
export default class ElementWaypoint {
  static defaults = {
    context: window,
    offsetTop: 0,
    offsetBottom: 0,
  };
  /**
   * Fired when the scroll trigger enters and leaves an element
   * 
   * @callback handler
   * @param {Boolean} entering Whether the user has entered the element 
   * @param {String} direction The direction they entered/exited from (up|down)
   */
  /**
   * 
   * @param {Object} options Options to merge with defaults
   * @param {HTMLElement} options.element Element to wacth
   * @param {HTMLElement} options.context Context for Waypoints (element scrollable parent)
   * @param {String|Function} options.offsetBottom Offset below the element (see Waypoints API)
   * @param {String|Function} options.offsetTop Offset above the element (see Waypoints API)
   * @param {handler} options.handler Fired when the scroll trigger enters and leaves an element
   */
  constructor(options) {
    this.options = Object.assign({}, ElementWaypoint.defaults, options);
    const { 
      handler, 
      offsetTop, 
      offsetBottom, 
      element, 
      context 
    } = this.options;
    // instantiates waypoint instances (top and bottom of element)
    // The offset bottom is function so it can be recalculated
    // User offsetBottom can be a function as well
    this.top = new Waypoint({
      element,
      context,
      offset: offsetTop,
      handler(d) {
        handler.call(this, d === "down", d);
      },
    });
    this.bottom = new Waypoint({
      element,
      context,
      offset() {
        const offset = typeof offsetBottom === "function" ? offsetBottom() : offsetBottom;
        const height = this.element.offsetHeight;
        return (-height) + offset;
      },
      handler(d) {
        handler.call(this, d === "up", d);
      }
    });
  }
  /**
   * Destroys the waypoints
   */
  destroy() {
    this.top.destroy();
    this.bottom.destroy();
  }
}