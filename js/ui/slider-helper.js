import { Slider } from "./slider.js";
import { getDatasetOptionalJson } from "../utils/dom.js";
import { createPager } from "./overflow-scroller-pager.js";
import { getName } from "../events/index.js";


/**
 * Default data attributes
 */
export const attrs = {
  init: "data-ulu-slider-init",
  slider: "data-ulu-slider",
  track: "data-ulu-slider-track",
  trackContainer: "data-ulu-slider-track-container",
  controls: "data-ulu-slider-control-context"
};

// Utils for selecting things based on attributes
const attrSelector = key => `[${ attrs[key] }]`;
const attrSelectorInitial = key => `${ attrSelector(key) }:not([${ attrs.init }])`;
// const queryAllInitial = key => document.querySelectorAll(attrSelectorInitial(key));

const defaults = {
  amount: createPager()
};

const instances = [];

export function init() {
  document.addEventListener(getName("pageModified"), setup);
  setup();
}


export function setup() {
  const builders = document.querySelectorAll(attrSelectorInitial("slider"));
  builders.forEach(setupSlider);
}

export function setupSlider(container) {
  console.log(container)
  container.setAttribute(attrs.init, "");
  const options = getDatasetOptionalJson(container, "uluScrollSlider");
  const config = Object.assign({}, defaults, options);
  const elements = {
    container,
    track: container.querySelector("[data-ulu-slider-track]"),
    trackContainer: container.querySelector("[data-ulu-slider-track-container]"),
    controlContext: container.querySelector("[data-ulu-slider-control-context]"),
    slides: container.querySelectorAll("[data-ulu-slider-slide]")
  };
  // Add in any global settings
  // Object.assign(config, {
  //   callbacks: {}
  // });
  // /
  // This was added because there was an issue on the new windows, need to test this
  // config.transitionFade = true;
  if (elements.slides.length) {
    instances.push(new Slider(elements, config, false));
  }
}
