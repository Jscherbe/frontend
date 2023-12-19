/**
 * @module ui/tooltip
 */
// =============================================================================
// Tooltip
// =============================================================================

// Version:         1.0.1

// Description:     Adds a single tooltip div to bottom of document to be used to 
//                  show text/simple markup of mouse hover or focus

import { logError } from "../utils/logger.js";
import { createPopper } from '@popperjs/core';

const ATTR_DESC = "aria-describedby";
const popperOptions = {
  placement: "auto",
  strategy: 'fixed',
  modifiers: [
    { 
      name: 'eventListeners', 
      enabled: false 
    },
    {
      name: 'preventOverflow',
      enabled: true,
      options: {
        mainAxis: true
      }
    },
    // Arrow
    {
      name: 'offset',
      options: {
        offset: [ 0, 10 ],
      },
    }
  ]
};

export default class Tooltip {
  static defaults = {
    namespace: "Tooltip",
    describedBy: false,
    arrowSize: 10,
    classes: []
  }
  constructor(context, markup, config) {
    if (!context) {
      logError(this, 'Missing context element');
    }
    this.options = Object.assign({}, Tooltip.defaults, config);
    this.context = context;
    this.element = this.create(markup);
    createPopper(context, this.element, popperOptions);
  }
  create(markup) {
    const { namespace } = this.options;
    const element = document.createElement("div");

    element.id = namespace + "--" + Date.now();
    element.innerHTML = markup;
    element.classList.add(namespace);
    element.classList.add(...this.options.classes);

    const arrow = document.createElement("div");
    arrow.setAttribute("data-popper-arrow", "");

    if (this.options.describedBy) {
      this.context.setAttribute(ATTR_DESC, element.id);
    }
    this.inPage = true;
    element.appendChild(arrow);
    return document.body.appendChild(element);
  }
  destroy() {
    if (this.inPage) {
      document.body.removeChild(this.element);
    }
    if (this.options.describedBy) {
      this.context.removeAttribute(ATTR_DESC);
    }
  }
}