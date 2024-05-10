import { 
  computePosition,
  autoUpdate,
  offset,
  inline,
  flip,
  shift,
  arrow,
} from "@floating-ui/dom";

export const defaults = {
  placement: "bottom",
  inline: false,
  offset: {
    mainAxis: 16
  },
  shift: true,
  flip: true,
  arrow: true, // Options for arrow (not element)
};

/**
 * 
 * @param {Object} elements Elements (trigger, content, and optionally contentArrow)
 * @param {*} options Configuration options for floatingUi
 * @returns {Function} floating cleanup function call when no longer needed
 */
export function createFloatingUi(elements, config) {
  const options = Object.assign({}, defaults, config);
  const { trigger, content, contentArrow } = elements;
  const middleware = [
    ...addPlugin(inline, options.inline),
    ...addPlugin(offset, options.offset),
    ...addPlugin(flip, options.flip),
    ...addPlugin(shift, options.shift),
    ...addPlugin(arrow, options.arrow, { element: contentArrow }),
  ];
  return autoUpdate(trigger, content, () => {
    computePosition(trigger, content, {
      placement: options.placement,
      middleware
    }).then(data => {
      const { x, y, middlewareData, placement } = data;
      const arrowPos = middlewareData.arrow;

      // Update computed styles for the content (popover container)
      Object.assign(content.style, { 
        left: `${ x }px`, 
        top: `${ y }px` 
      });

      // Update placement attribute (used by arrow for theming)
      content.setAttribute("data-placement", placement);

      // If arrow was enabled, add it's computed styles
      if (arrowPos) {
        Object.assign(contentArrow.style, {
          // position: "absolute",
          left: arrowPos?.x != null ? `${ arrowPos.x }px` : "",
          top: arrowPos?.y != null ? `${ arrowPos.y }px` : "",
        });
      }
    });
  });
}

function addPlugin(plugin, option, overrides = {}) {
  if (!option) {
    return [];
  // If object add it as options, else just enable without options
  } else if (typeof option === "object") {
    return [plugin({ ...option,  ...overrides })];
  } else {
    return [plugin(overrides)];
  }
}