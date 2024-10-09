import { OverflowScroller } from "./overflow-scroller.js";
import { createPager } from "./overflow-scroller-pager.js"
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

document.querySelectorAll("[data-ulu-scroll-slider]").forEach(init);

function init(container) {
  const raw = container.dataset.siteSlider;
  const passed = raw ? JSON.parse(raw) : {};
  const config = Object.assign({}, defaults, passed);
  const elements = {
    track: container.querySelector("[data-ulu-scroll-slider-track]"),
    controls: container.querySelector("[data-ulu-scroll-slider-control-context]")
  };
  // replace with OverflowScroller when finished removing sitescrollslider
  instances.push(new SiteScrollSlider(elements, config));
}