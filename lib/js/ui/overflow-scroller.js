/**
 * @module ui/overflow-scroller
 */
/**
 * @todo - Need to have scroll handler check scroll position
 * @todo - Determine if controls should be visible
 * @todo - Make the amount the scroll controls move forward or backward based on amount or function
 *         the user can use this to increment by a certain number of items
 * @todo - Provide accessible names to buttons but don't worry about hiding these from screenreaders
 * @todo - Document that user could use something like [https://github.com/LachlanArthur/scroll-snap-api/tree/master/src] to have it go between items
 * 
 */
import { wrapSettingString } from "../core/settings.js";
import { hasRequiredProps } from '@ulu/utils/object.js';
import { logError } from "../utils/class-logger.js";
const requiredElements = [
  "track", 
  "controls"
];
export class OverflowScroller {
  static instances = [];
  static defaults = {
    namespace: "OverflowScroller",
    events: {},
    horizontal: true,
    offsetStart: 100,
    offsetEnd: 100,
    amount: "auto",
    buttonClasses: ["button", "button--icon"],
    iconClassPrevious: wrapSettingString("iconClassPrevious"),
    iconClassNext: wrapSettingString("iconClassNext"),
  }
  constructor(elements, config) {
    this.options = Object.assign({}, OverflowScroller.defaults, config);
    if (!hasRequiredProps(requiredElements)) {
      logError(this, 'Missing a required Element');
    }
    // console.log(elements)
    this.elements = {
      ...elements,
      ...this.createControls(elements.controls)
    };
    this.nextEnabled = true;
    this.previousEnabled = true;
    this.scrollHandler = (e) => this.onScroll(e);
    this.elements.track.addEventListener("scroll", this.scrollHandler, { passive: true });
    this.checkOverflow();
    this.onScroll();
  }
  checkOverflow() {
    const { track } = this.elements;
    this.hasOverflow = track.scrollWidth > track.clientWidth;
  }
  createControls(context) {
    const controls = document.createElement('ul');
    const previousItem = document.createElement("li");
    const nextItem = document.createElement("li");
    const previous = this.createControlButton("previous");
    const next = this.createControlButton("next");
    const itemClass = this.getClass("controls-item");
    nextItem.classList.add(itemClass);
    nextItem.classList.add(itemClass + "--next");
    previousItem.classList.add(itemClass);
    previousItem.classList.add(itemClass + "--previous");
    controls.classList.add(this.getClass("controls"));
    previousItem.appendChild(previous);
    nextItem.appendChild(next);
    controls.appendChild(previousItem);
    controls.appendChild(nextItem);
    previous.addEventListener('click', this.previous.bind(this));
    next.addEventListener('click', this.next.bind(this));
    context.appendChild(controls);

    return {
      controls,
      previousItem,
      nextItem,
      previous,
      next
    };
  }
  createControlButton(action) {
    const button = document.createElement("button");
    button.classList.add(this.getClass("control-button"));
    button.classList.add(this.getClass(`control-button--${ action }`));
    button.classList.add(...this.options.buttonClasses);
    button.setAttribute("type", "button");
    button.innerHTML = this.getControlContent(action);
    return button;
  }
  getControlContent(action) {
    const classes = this.options[action === "next" ? "iconClassNext" : "iconClassPrevious"];
    return `
      <span class="hidden-visually">${ action }</span>
      <span class="${ classes }" aria-hidden="true"></span>
    `;
  }
  onScroll(event) {
    if (!this.hasOverflow) return;
    this.onScrollHorizontal();
  }
  onScrollHorizontal() {
    const { nextEnabled, previousEnabled } = this;
    const { track } = this.elements;
    const { offsetStart, offsetEnd } = this.options;
    const { scrollWidth, clientWidth, scrollLeft } = track;
    const atStart = scrollLeft <= offsetStart;
    const atEnd = scrollWidth - scrollLeft - offsetEnd <= clientWidth;
    if (atStart && previousEnabled) {
      this.setControlState("previous", false);
    } else if (!atStart && !previousEnabled) {
      this.setControlState("previous", true);
    }
    if (atEnd && nextEnabled) {
      this.setControlState("next", false);
    } else if (!atEnd && !nextEnabled) {
      this.setControlState("next", true);
    }
  }
  setControlState(dir, enabled) {
    const isNext = dir === "next";
    const { next, nextItem, previous, previousItem } = this.elements;
    const item = isNext ? nextItem : previousItem; 
    const button = isNext ? next : previous;
    const classlistMethod = enabled ? 'remove' : 'add';
    
    item.classList[classlistMethod](this.getClass("controls-item--disabled"));
    button.classList[enabled ? 'remove' : 'add'](this.getClass("control--disabled"));
    if (enabled) {
      button.removeAttribute("disabled");
    } else {
      button.setAttribute("disabled", "");
    }
    this[isNext ? 'nextEnabled' : 'previousEnabled'] = enabled;
  }
  resolveAmount(dir) {
    const isNext = dir === "next";
    const { amount } = this.options;
    const { scrollLeft, offsetWidth } = this.elements.track;
    if (amount === "auto") {
      return isNext ? scrollLeft + offsetWidth : scrollLeft - offsetWidth;
    } else if (typeof amount === "function") {
      return amount(this, dir);
    } else if (typeof amount === "number") {
      return isNext ? scrollLeft + amount : scrollLeft - amount;
    }
    logError("Unable to resolve amount for scroll");
    return 500;
  }
  next() {
    this.elements.track.scrollTo({
      top: 0,
      left: this.resolveAmount("next"),
      behavior: "smooth"
    });
  }
  previous() {
    this.elements.track.scrollTo({
      top: 0,
      left: this.resolveAmount("previous"),
      behavior: "smooth"
    });
  }
  getClass(child) {
    const { namespace } = this.options;
    return `${ namespace }__${ child }`;
  }
}