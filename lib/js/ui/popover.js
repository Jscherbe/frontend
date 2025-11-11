/**
 * @module ui/popover
 */

import { ComponentInitializer } from "../core/component.js";
import { createFloatingUi } from "../utils/floating-ui.js";
import { Collapsible } from "./collapsible.js";

/**
 * Popover Component Initializer
 */
export const initializer = new ComponentInitializer({ 
  type: "popover", 
  baseAttribute: "data-ulu-popover"
});

const attrSelectorAnchor = initializer.attributeSelector("trigger-anchor");
const attrSelectorArrow = initializer.attributeSelector("arrow");
const attrContent = initializer.getAttribute("content");
const attrSelectorContent = initializer.attributeSelector("content");

/**
 * Array of current instances
 */
export const instances = new WeakMap;

// This modules collapsible defaults
const collapsibleDefaults = {
  clickOutsideCloses: true,
  escapeCloses: true
};

/**
 * Initialize default popover
 */
export function init() {
  initializer.init({
    key: "trigger",
    withData: true,
    coreEvents: ["pageModified"],
    setup({ element, data, initialize }) {
      if (instances.has(element)) return;
      const resolved = resolve(element, data);

      if (!resolved) {
        initializer.warn("Unable to resolve popover elements for trigger.", element);
        return;
      }

      const { elements, options, floatingOptions } = resolved;
      instances.set(elements, new Popover(elements, options, floatingOptions));
      initialize();
    }
  });
}

/**
 * Find the popover's elements
 */
export function resolve(trigger, userOptions) {
  const options = Object.assign({}, userOptions);
  const content = getContentByTrigger(trigger);
  const elements = {
    trigger,
    content,
    anchor: trigger.querySelector(attrSelectorAnchor) || trigger,
    contentArrow: content.querySelector(attrSelectorArrow)
  };
  const floatingOptions = options.floating || {};
  delete options.floating;
  if (content) {
    return { elements, options, floatingOptions };
  } else {
    initializer.logError("Unable to make popover for", trigger);
    return false;
  }
}

// - grab from aria-controls (optional) 
// - or from direct sibling
// - lastly check the parent container for any children that have the attribute
export function getContentByTrigger(trigger) {
  let content;
  const ariaControls = trigger.getAttribute("aria-controls");

  if (ariaControls) {
    content = document.getElementById(ariaControls);
  } else if (trigger?.nextElementSibling?.hasAttribute(attrContent)) {
    content = trigger.nextElementSibling;  
  // @todo - Consider removing this (non standard, users like this should be using aria-controls)
  } else {
    const children = Array.from(trigger.parentNode.children);
    const triggerIndex = children.findIndex(c => c === trigger);
    const childrenAfter = children.slice(triggerIndex);
    content = childrenAfter.find(child => child.matches(attrSelectorContent));
  }
  if (!content) {
    initializer.logError("Unable to resolve 'content' element for popover", trigger);
  }
  return content;
}


/**
 * Class that extends Collapsible adding floating-ui for popover behavior
 */
export class Popover extends Collapsible {
  constructor(elements, config, floatingOptions) {
    const options = Object.assign({}, collapsibleDefaults, config);
    super(elements, options);
    this.floatingOptions = floatingOptions || {};
  }
  setState(isOpen, event) {
    super.setState(isOpen, event);
    this.destroyFloatingInstance();
    if (isOpen) {
      this.createFloatingInstance();
    }
  }
  destroy() {
    super.destroy();
    this.destroyFloatingInstance();
  }
  createFloatingInstance() {
    const { content, anchor, contentArrow } = this.elements;
    const floatingElements = { trigger: anchor, contentArrow, content };   
    this.floatingCleanup = createFloatingUi(floatingElements, this.floatingOptions);
  }
  destroyFloatingInstance() {
    if (this.floatingCleanup) {
      this.floatingCleanup(); 
      this.floatingCleanup = null;
    }
  }
}