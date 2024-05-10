/**
 * @todo - Convert popover to class syntax?
 * @todo - Setup tooltip container and method for populating it and set up popover for this
 */
import { createFloatingUi } from "../utils/floating-ui.js";
import { Collapsible } from "./collapsible.js";
import { getName } from "../events/index.js";
/**
 * Array of current instances
 */
export const instances = new WeakMap;

const logError = (...msgs) => console.error("@ulu (popovers):", ...msgs);

const attrs = {
  trigger: "data-ulu-popover-trigger",
  content: "data-ulu-popover-content",
  arrow: "data-ulu-popover-arrow",
};
const attrSelector = key => `[${ attrs[key] }]`;

export function init() {
  document.addEventListener(getName("pageModified"), setupAll);
  setupAll();
}

/**
 * Query all popovers on current page and set them up
 * - Use this manually if needed
 * - Won't setup a popover more than once
 */
export function setupAll() {
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

export class Popover extends Collapsible {
  constructor(elements, config, floatingOptions) {
    super(elements, config);
    this.floatingOptions = floatingOptions;
  }
  setState(isOpen, event) {
    super.setState(isOpen, event);
    this.destroyFloatingUi();
    if (isOpen) {
      this.createFloatingUi();
    }
  }
  destroy() {
    super.destroy();
    this.destroyFloatingUi();
  }
  createFloatingUi() {
    this.floatingCleanup = createFloatingUi(this.elements, this.floatingOptions);
  }
  destroyFloatingUi() {
    if (this.floatingCleanup) {
      this.floatingCleanup(); 
      this.floatingCleanup = null;
    }
  }
}

function resolve(trigger) {
  const raw = trigger.dataset.uluPopoverTrigger;
  const options = raw?.length ? JSON.parse(raw) : {};
  const content = getContentByTrigger(trigger);
  const elements = {
    trigger,
    content,
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
function getContentByTrigger(trigger) {
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
