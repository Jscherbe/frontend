/**
 * @module scrollpoint 
 */

// Module that uses intersection observer to add scrollpoint like behavior.
/**
 * TODO:
 *  - Included a group option or attribute (on container)
//    for things like anchor menus (one active in group at a time).
 * 
 * How to link elements of group
 * <div group={ groupName: test }>
 *   <div point={ groupName: test, mirror: ["#menu-link-1"] }>
 * or
 * <div group={ groupName: test, children: [".selector"] }>
 *   <div class=".selector">
 */
import { getName } from "../events/index.js";
import { getDatasetOptionalJson, getElement } from "../utils/dom.js";
import { logError } from "../utils/class-logger.js";

/**
 * Default data attributes
 */
export const attrs = {
  init: "data-ulu-scrollpoint-init",
  /**
   * Individual scrollpoint
   */
  point: "data-ulu-scrollpoint",
  group: "data-ulu-scrollpoint-group",
  groupAnchors: "data-ulu-scrollpoint-anchors"
  // Goes on container for all items
  // group: "data-ulu-scrollpoint-group"
};

// Utils for selecting things based on attributes
const attrSelector = key => `[${ attrs[key] }]`;
const attrSelectorInitial = key => `${ attrSelector(key) }:not([${ attrs.init }])`;
const queryAllInitial = key => document.querySelectorAll(attrSelectorInitial(key));

/**
 * Initialize everything in document
 * - This will only initialize elements once, it is safe to call on page changes
 */
export function init() {
  document.addEventListener(getName("pageModified"), setup);
  setup();
}

/**
 * Setup all points and groups
 */
export function setup() {
  const elements = queryAllInitial("point");
  // const points = Array.from(elements).map(resolve);
  // const groups = points
  //   .filter(({ config }) => config.groupName)
  //   .reduce((acc, point) => {
  //     const { groupName } = point.config;
  //     if (acc.has(groupName)) {
  //       acc.get(groupName).push(point);
  //     } else {
  //       acc.set(groupName, [point]);
  //     }
  //   }, new Map());
  // const singles = points.filter(({ config }) => !config.groupName);
  // groups.forEach(setupGroup);
  elements.forEach(element => {
    const elOptions = getDatasetOptionalJson(element, "uluScrollpoint");
    const config = Object.assign({}, elOptions);
    new Scrollpoint(element, config)
  });
}



/**
 * Single scrollpoint
 * - Note "forward" and "reverse" refer to scroll directions
 *   - forward = vertical below / horizontal right
 *   - reverse = vertical above / horizontal left
 * @todo Convert margin to offset 
 * @todo This only goes one direction
 */
export class Scrollpoint {
  static defaults = {
    root: document,
    rootSelector: null,
    /**
     * Change scroll orientation to horizontal
     */
    horizontal: false,
    /**
     * Margin for observer top or left (depending on orientation)
     */
    marginStart: "-25%",
    /**
     * Margin for observer bottom or right (depending on orientation)
     */
    marginEnd: "-55%",
    /**
     * Threshold for observer
     */
    threshold: [0,1],
    /**
     * The point can exited (else persists)
     */
    exit: true,
    /**
     * The point can exit from the end
     */
    exitForward: true,
    /**
     * The point can exit from the start
     */
    exitReverse: true,
    /**
     * Set state classes
     */
    setClasses: false,
    /**
     * Prefix for classes
     */
    classPrefix: "scrollpoint",
    /**
     * Set attribute for state (less verbose same info as classes)
     */
    setAttribute: true,
    /**
     * Attribute name to set state info in
     */
    attributeName: "data-scrollpoint-state",
    /**
     * Group multiple points, one active at a time (scroll menus)
     */
    // groupName: null,
    /**
     * Elements that should also get active state info (classes or attributes)
     */
    syncElements: [],
    /**
     * Callback called when state changes
     */
    onChange(_ctx) {
      // do something
    }
  };
  /**
   * Setup a new scrollpoint
   * @param {Node} element The element to create the scrollpoint for
   * @param {Object} config Options to configure the scrollpoint see Scrollpoint.defaults for more information on settings
   */
  constructor(element, config) {
    const options = Object.assign({}, Scrollpoint.defaults, config);
    if (!element) {
      logError(this, "Missing required element");
      return;
    }
    if (options.rootSelector) {
      options.root = document.querySelector(options.rootSelector);
      delete options.rootSelector;
    }
    this.options = options;
    this.observer = null;
    this.lastPosition = null;
    this.isActive = false;
    this.element = element;
    this.syncedElements = [
      element, 
      ...options.syncElements.map(target => getElement(target))
    ];
    this.classes = {
      enter:          this.getClassname("enter"),
      enterForward: this.getClassname("enter--from-forward"),
      enterReverse: this.getClassname("enter--from-reverse"),
      exit:          this.getClassname("exit"),
      exitForward: this.getClassname("exit--from-forward"),
      exitReverse: this.getClassname("exit--from-reverse"),
    };
    this.setupObserver();
  }
  getClassname(suffix) {
    return this.options.classPrefix + "-" + suffix;
  }
  getObserverOptions() {
    const { root, marginStart, marginEnd, threshold, horizontal } = this.options;
    const rootMargin = horizontal ? 
       `0px ${ marginStart } 0px ${ marginEnd }` :
       `${ marginStart } 0px ${ marginEnd } 0px`;
    return { 
      root, 
      rootMargin, 
      threshold
    }
  }
  /**
   * IntersectionObserver Callback
   * - Should set the state
   */
  onObserve(entries) {
    const y = this.getScrollY();
    const { lastPosition, isActive, options } = this;
    const isForward = lastPosition === null ? null : lastPosition < y;
    entries.forEach(entry => {
      const { isIntersecting } = entry;
      // Entering for first time
      if (isIntersecting && !isActive) {
        this.setState(true, isForward);
      // Exiting
      } else if (!isIntersecting && isActive && options.exit) {
        // Call if allowed in either direction
        if (isForward && options.exitForward || !isForward && options.exitReverse) {
          this.setState(false, isForward);
        }
      }
    });
    this.lastPosition = y;
  }
  setupObserver() {
    const handler = entries => {
      this.onObserve(entries);
    };
    this.observer = new IntersectionObserver(handler, this.getObserverOptions());
    this.observer.observe(this.element);
  }
  getScrollY() {
    const { root } = this.options;
    return root === null || root === document ? window.scrollY : root.scrollTop;
  }
  setState(isActive, isForward) {
    const { element } = this;
    const ctx = { isActive, isForward, element, instance: this };
    const { setClasses, setAttribute, onChange } = this.options;
    if (setClasses) {
      this.updateClasses(isActive, isForward);
    }
    if (setAttribute) {
      this.updateStateAttribute(isActive, isForward);
    }
    if (onChange) {
      onChange(ctx);
    }
    this.isActive = isActive;
  }
  getAllClasses() {
    return Object.values(this.classes);
  }
  updateClasses(isActive, isForward) {
    const { classes } = this;
    const all = this.getAllClasses();
    const classesEnter = [
      classes.enter,
      isForward ? classes.enterForward : classes.enterReverse
    ];
    const classesExit = [
      classes.exit, 
      isForward ? classes.exitForward : classes.exitReverse
    ];
    this.syncedElements.forEach(element => {
      element.classList.remove(...all);
      if (isActive) {
        element.classList.add(...classesEnter);
      } else {
        element.classList.add(...classesExit);
      }
    });
  }
  updateStateAttribute(isActive, isForward) {
    const activeTerm = isActive ? "enter" : "exit";
    const side = isForward ? "forward" : "reverse";
    this.syncedElements.forEach(element => {
      element.setAttribute(this.options.attributeName, `${ activeTerm }-${ side }`);
    });
  }
  destroy() {
    this.observer.disconnect();
    this.observer = null;
    if (this.options.setClasses) {
      this.element.classList.remove(...this.getAllClasses());
    }
    if (this.options.setAttribute) {
      this.element.removeAttribute(this.options.attributeName)
    }
  } 
}
