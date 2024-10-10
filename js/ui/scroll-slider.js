/**
 * @module ui/scroll-slider
 */

import { OverflowScroller } from "./overflow-scroller.js";
import { createPager } from "./overflow-scroller-pager.js";
import { getName } from "../events/index.js";
import { getDatasetOptionalJson } from "../utils/dom.js";


/**
 * Default data attributes
 */
export const attrs = {
  init: "data-ulu-scroll-slider-init",
  slider: "data-ulu-scroll-slider",
  track: "data-ulu-scroll-slider-track",
  controls: "data-ulu-scroll-slider-control-context"
};

// Utils for selecting things based on attributes
const attrSelector = key => `[${ attrs[key] }]`;
const attrSelectorInitial = key => `${ attrSelector(key) }:not([${ attrs.init }])`;
const queryAllInitial = key => document.querySelectorAll(attrSelectorInitial(key));


const instances = [];
// Add in icon and labels
// @daniel won't need to extend
class SiteScrollSlider extends OverflowScroller {
  constructor(...args) {
    super(...args);
  }
  // update this in the OverflowScroller module
  getControlContent(action) {
    return `
      <span class="hidden-visually">${ action === 'next' ? 'Scroll Left' : 'Scroll Right' }</span>
      <span class="Slider__control-icon fas fa-chevron-${ action === 'next' ? 'right' : 'left' }" aria-hidden="true"></span>
    `;
  }
}
const defaults = {
  amount: createPager()
};

/**
 * Initialize everything in document
 * - This will only initialize elements once, it is safe to call on page changes
 */
export function init() {
  document.addEventListener(getName("pageModified"), setup);
  setup();
}

// document.querySelectorAll("[data-ulu-scroll-slider]").forEach(init);
export function setup() {
  const builders = document.querySelectorAll(attrSelectorInitial("slider"));
  builders.forEach(setupSlider);
}

// getDatasetOptionalJson
function setupSlider(container) {
  container.setAttribute(attrs.init, "");
  const options = getDatasetOptionalJson(container, "uluScrollSlider");
  const config = Object.assign({}, defaults, options);
  const elements = {
    track: container.querySelector(attrSelector("track")),
    controls: container.querySelector(attrSelector("controls"))
  };
  // replace with OverflowScroller when finished removing sitescrollslider
  instances.push(new SiteScrollSlider(elements, config));
}