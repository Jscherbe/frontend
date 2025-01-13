/**
 * @module ui/popover
 */

import { getName } from "../events/index.js";
import { createFloatingUi } from "../utils/floating-ui.js";
import { Collapsible } from "./collapsible.js";

/**
 * Array of current instances
 */
export const instances = new WeakMap;

const logError = (...msgs) => console.error("@ulu (popovers):", ...msgs);

const attrs = {
  trigger: "data-ulu-popover-trigger",
  content: "data-ulu-popover-content",
  arrow: "data-ulu-popover-arrow",
  anchor: "data-ulu-popover-trigger-anchor",
};
const attrSelector = key => `[${ attrs[key] }]`;

// This modules collapsible defaults
const collapsibleDefaults = {
  clickOutsideCloses: true,
  escapeCloses: true
};

/**
 * Initialize default popover
 */
export function init() {
  document.addEventListener(getName("pageModified"), setup);
  setup();
}

/**
 * Query all popovers on current page and set them up
 * - Use this manually if needed
 * - Won't setup a popover more than once
 */
export function setup() {
  const triggers = document.querySelectorAll(attrSelector("trigger"));
  // Only triggers we don't have instances for
  const resolved = Array.from(triggers)
    .filter(trigger => !instances.has(trigger))
    .map(resolve)
    .filter(v => v);

  resolved.forEach(({ elements, options, floatingOptions  }) => {
    instances.set(elements.trigger, new Popover(elements, options, floatingOptions));
  });
}

/**
 * Find the popover's elements
 */
export function resolve(trigger) {
  const raw = trigger.dataset.uluPopoverTrigger;
  const options = raw?.length ? JSON.parse(raw) : {};
  const content = getContentByTrigger(trigger);
  const elements = {
    trigger,
    content,
    anchor: trigger.querySelector(attrSelector("anchor")) || trigger,
    contentArrow: content.querySelector(attrSelector("arrow"))
  };
  const floatingOptions = options.floating || {};
  delete options.floating;
  if (content) {
    return { elements, options, floatingOptions };
  } else {
    logError("Unable to make popover for", trigger);
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
  } else if (trigger?.nextElementSibling?.hasAttribute(attrs.content)) {
    content = trigger.nextElementSibling;  
  // @todo - Consider removing this (non standard, users like this should be using aria-controls)
  } else {
    const children = Array.from(trigger.parentNode.children);
    const triggerIndex = children.findIndex(c => c === trigger);
    const childrenAfter = children.slice(triggerIndex);
    content = childrenAfter.find(child => child.matches(attrSelector("content")));
  }
  if (!content) {
    logError("Unable to resolve 'content' element for popover", trigger);
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