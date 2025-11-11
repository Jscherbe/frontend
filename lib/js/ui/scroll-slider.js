/**
 * @module ui/scroll-slider
 */

import { ComponentInitializer } from "../core/component.js";
import { OverflowScroller } from "./overflow-scroller.js";
import { createPager } from "./overflow-scroller-pager.js";

/**
 * Scroll Slider Component Initializer
 */
export const initializer = new ComponentInitializer({ 
  type: "scroll-slider", 
  baseAttribute: "data-ulu-scroll-slider"
});

const attrSelectorTrack = initializer.attributeSelector("track");
const attrSelectorControls = initializer.attributeSelector("control-context");
const instances = [];
const defaults = {
  amount: createPager()
};

/**
 * Initialize everything in document
 * - This will only initialize elements once, it is safe to call on page changes
 */
export function init() {
  initializer.init({
    withData: true,
    coreEvents: ["pageModified"],
    setup({ element, data, initialize }) {
      setupSlider(element, data);
      initialize();
    }
  });
}

/**
 * Setup instance of scroll slider based on data-attributes
 * @param {Node} container The scroll slider container
 */
function setupSlider(container, userOptions) {
  const config = Object.assign({}, defaults, userOptions);
  const elements = {
    track: container.querySelector(attrSelectorTrack),
    controls: container.querySelector(attrSelectorControls)
  };
  instances.push(new OverflowScroller(elements, config));
}