/**
 * @module ui/resizer
 */
// =============================================================================
// Element Resizer
// =============================================================================

// Version:         1.0.1

// Description:     Adds resizing ability to an element (only horizontal currently)

// Reference:       - http://jsfiddle.net/3jMQD/614/

import { logError } from "../utils/logger.js";

export default class ElementResizer {
  static defaults = {
    debug: false,
    overrideMaxWidth: false, 
    fromLeft: false
  };
  /**
   * 
   * @param {Node} container Container to be resize   
   * @param {Node} control Resize handle element 
   * @param {Object} options Defualt can be changed on class
   * @param {Boolean} options.debug Enable non-essential debugging logs
   * @param {Boolean} options.overrideMaxWidth When script is activated by handle remove the elements max-width and allow the width of the resize to exceed the max (default false)
   * @param {Boolean} options.fromLeft The script should assume the handle is on the left side of the element
   */
  constructor(container, control, options) {
    if (!control || !container) {
      logError(this, "Missing required elements 'control' or 'container'");
    }
    this.options = Object.assign({}, ElementResizer.defaults, options);
    this.container = container;
    this.control = control;
    this.handlerMousedown = this.onMousedown.bind(this);
    this.control.addEventListener('mousedown', this.handlerMousedown);
  }
  destroy() {
    this.control.removeEventListener('mousedown', this.handlerMousedown);
  }
  onMousedown(e) {
    const { overrideMaxWidth, fromLeft } = this.options;
    const doc = document.documentElement;
    const win = document.defaultView;
    const x = e.clientX;
    const width = parseInt(win.getComputedStyle(this.container).width, 10);
    if (overrideMaxWidth) {
      this.container.style.maxWidth = 'none';
    }
    const mousemove = event => {
      const polarity = fromLeft ? -1 : 1;
      this.container.style.width = `${ width + ((event.clientX - x) * polarity) }px`;
    };
    const cleanup = () => {
      doc.removeEventListener('mousemove', mousemove, false);    
    };
    doc.addEventListener('mousemove', mousemove, false);
    doc.addEventListener('mouseup', cleanup, { capture: true, once: true });
  }
}