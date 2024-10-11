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


const instances = [];

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
  instances.push(new OverflowScroller(elements, config));
}