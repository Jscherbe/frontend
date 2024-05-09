/**
 * @todo - Convert popover to class syntax?
 * @todo - Setup tooltip container and method for populating it and set up popover for this
 */
import { 
  computePosition,
  autoUpdate,
  offset,
  inline,
  flip,
  shift,
  arrow,
} from "@floating-ui/dom";
import { Collapsible } from "./collapsible.js";
import { getName } from "../events/index.js";
/**
 * Array of current instances
 */
export const instances = [];
const logError = (...msgs) => console.error("@ulu (popovers):", ...msgs);

const attrs = {
  trigger: "data-ulu-popover-trigger",
  content: "data-ulu-popover-content",
  arrow: "data-ulu-popover-arrow"
};
const attrSelector = key => `[${ attrs[key] }]`;

/**
 * Default plugin options
 * - Popover plugin options should be object form only (no shorthand)
 */
export const defaults = {
  popoverPlacement: "bottom",
  // For the following floatingUi options, true will add the plugin, 
  // object will be passed as configuration for plugin
  popoverInline: false,
  popoverOffset: {
    mainAxis: 16
  },
  popoverShift: true,
  popoverFlip: true,
  popoverArrow: true, // Options for arrow (not element)
};

export function init() {
  document.addEventListener(getName("pageModified"), resolveAll);
  resolveAll();
}

/**
 * Query all popovers on current page and set them up
 * - Use this manually if needed
 * - Won't setup a popover more than once
 */
export function resolveAll() {
  const triggers = document.querySelectorAll(attrSelector("trigger"));
  const resolved = Array.from(triggers, resolve).filter(v => v);
  resolved.forEach(({ trigger, content, options }) => setup(trigger, content, options));
}

// Note: Sharing options with collapsible for ease of use (no collisions in popover specific!)
function setup(trigger, content, userOptions) {
  const options = Object.assign({}, defaults, userOptions, {
    onChange(ctx) {
      handleFloatingUi(popover, ctx);
      if (userOptions.onChange) {
        userOptions.onChange(ctx);
      }
    }
  });
  const popover = {
    trigger, 
    content, 
    arrow: content.querySelector(attrSelector("arrow")),
    options,
    collapsible: new Collapsible(trigger, content, options),
  };
  return popover;
}

function resolve(trigger) {
  const raw = trigger.dataset.uluPopoverTrigger;
  const options = raw?.length ? JSON.parse(raw) : {};
  const content = resolveTriggerContent(trigger);
  if (content) {
    return {
      trigger,
      content,
      options,
    };
  } else {
    logError("Unable to make popover for", trigger);
  }
}

// - grab from aria-controls (optional) 
// - or from direct sibling
// - lastly check the parent container for any children that have the attribute
function resolveTriggerContent(trigger) {
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


function handleFloatingUi(popover, ctx) {
  const { trigger, content, options } = popover;
  if (popover.cleanupFloating) popover.cleanupFloating(); // Cleanup any previous floating instances
  if (!ctx.isOpen) return; // Exit if closed

  const middleware = [
    ...addFloatingPlugin(inline, options.popoverInline),
    ...addFloatingPlugin(offset, options.popoverOffset),
    ...addFloatingPlugin(flip, options.popoverFlip),
    ...addFloatingPlugin(shift, options.popoverShift),
    ...addFloatingPlugin(arrow, options.popoverArrow, { element: popover.arrow }),
  ];

  // Setup auto updating floating ui
  // - Attach cleanup function to instance so we can cleanup on close
  popover.cleanupFloating = autoUpdate(trigger, content, () => {
    computePosition(trigger, content, {
      placement: options.popoverPlacement,
      middleware
    }).then(data => {
      const { x, y, middlewareData, placement } = data;
      const ap = middlewareData.arrow;

      // Update computed styles for the content (popover container)
      Object.assign(content.style, { 
        left: `${ x }px`, 
        top: `${ y }px` 
      });

      // Update placement attribute (used by arrow for theming)
      content.setAttribute("data-placement", placement);

      // If arrow was enabled, add it's computed styles
      if (ap) {
        Object.assign(popover.arrow.style, {
          // position: "absolute",
          left: ap?.x != null ? `${ ap.x }px` : "",
          top: ap?.y != null ? `${ ap.y }px` : "",
        });
      }
    });
  });
}

function addFloatingPlugin(plugin, option, overrides = {}) {
  if (!option) {
    return [];
  // If object add it as options, else just enable without options
  } else if (typeof option === "object") {
    return [plugin({ ...option,  ...overrides })];
  } else {
    return [plugin(overrides)];
  }
}