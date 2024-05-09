/**
 * Design Notes:
 * - data-site-popover (toggle)
 *   - If no element is passed by ID, search for sibling with data-site-popover-content
 *   
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
function setup(trigger, content, options) {
  const arrow = content.querySelector(attrs.arrow);
  const collapsible = new Collapsible(trigger, content, {
    onChange({ isOpen }) {
      if (isOpen) {

      }
      positionPopover(trigger, content, arrow, options);
    },
    ...options
  });
  return { collapsible, options };
}

function resolve(trigger) {
  const raw = trigger.dataset.sitePopover;
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
    console.log("triggerIndex:\n", triggerIndex);
    const childrenAfter = children.slice(triggerIndex);
    content = childrenAfter.find(child => child.matches(attrSelector("content")));
  }
  console.log("content:\n", content);
  if (!content) {
    logError("Unable to resolve 'content' element for popover", trigger);
  }
  return content;
}


function positionPopover(trigger, content, arrow, options) {
  const reference = toRef(config.reference);
  const floating = ref(null);
  const floatingArrow = ref(null);

  const middleware = [
    ...(config.inline ? [ inline() ] : []),
    ...(config.offset ? [ offset(config.offset) ] : []),
    flip(), 
    shift(),
    ...(config.arrow ? [ arrow({ element: arrow }) ] : []),
  ];
  
  const options = {
    placement: config.placement,
    whileElementsMounted: autoUpdate,
    middleware
  }; 

  // const { 
  //   floatingStyles, 
  //   placement, 
  //   middlewareData,
  //   update,
  //   isPositioned,
  // } = useFloating(reference, floating, options);

  computePosition(trigger, content, {

  })

  const arrowStyles = computed(() => {
    const pos = middlewareData.value?.arrow;
    if (!pos) return null;
    return {
      position: "absolute",
      left: pos?.x != null ? `${ pos.x }px` : "",
      top: pos?.y != null ? `${ pos.y }px` : "",
    };
  });

  if (config.onReady) {
    config.onReady({ update, isPositioned });
  }
  // Collapsible onChange handler
  return function onPopoverChange({ isOpen }) {

  }
}