// Version:         1.0.2

// Changes:         1.0.2 | Added ability for user to pass config options to popper
//                  constructor

import { createPopper } from '@popperjs/core';

const merge = Object.assign;
const DATA_KEY = "popperInstance";
const defaults = {
  arrowEnabled: true,
  arrowSize: 10,
  placementDataKey: 'cc-placement',
  stradegyDataKey: "cc-stradegy",
  arrowClasses: "cc-arrow",
  popper: {} // options to be merged
};
/**
 * Creates a new set of options, pass modifiers array seperately
 * - Used to reduce complexity of mergining array's of reference object
 * - Instead this function (factory) will create a new object for each modifiers
 *   so there is no possible issues upstream with duplicated references (ie. eventListeners)
 * @param {Object} options Popper options
 * @returns 
 */
function createOptions(options) {
  const modifiers = options.modifiers || [];
  delete options.modifiers;
  return Object.assign({
    modifiers: [
      { 
        name: 'eventListeners', 
        enabled: false 
      },
      {
        name: 'preventOverflow',
        enabled: true,
        options: {
          mainAxis: true
        }
      },
      ...modifiers
    ]
  }, options);
}

/**
 * Creates a popup position mechanism for a collapsible set
 * - Note: if you are adding additional collapsibles to the page you
 *   will need to select them and pass their collaspible elements set to the 
 *   init method provided in this functions return.
 * @param {Object} cc Collapsibles Instance
 * @param {Object} userOptions Options object
 * @param {Boolean} userOptions.arrowEnabled Enable arrow (creates arrow element automatically)
 * @param {Number} userOptions.arrowSize Options object
 * @param {String} userOptions.arrowClasses Classes to be added to the arrow for styling
 * @param {String} userOptions.placementDataKey Data attribute to be selected without "data-", defualts to 'dropdown-placement'
 * @returns {Object} Interface to init new instances added to page, possibly more in the future
 */
export function popperPositioning(cc, options) {
  const userCallback = cc.onChangeAfter;
  // Merge and reassign
  options = merge({}, defaults, options);
  // Prep each collapsible instance available on page
  cc.each(init);
  cc.onChangeAfter = function popperPositioningCb({ toggle }, state) {
    if (userCallback) {
      userCallback.apply(cc, arguments);
    }
    // Popper related
    const isOpen = state === "open";
    const instance = toggle.data(DATA_KEY);
    // Remove current options and change event listeners (enable when open only)
    // This helps performance b/c this plugin watches the page (resize, etc)
    const opts = instance.state.options;
    const eventModifier = opts.modifiers.find(el => el.name === "eventListeners");
    if (eventModifier) {
      eventModifier.enabled = isOpen
    }
    // Reset the options object
    instance.setOptions(opts);
    // Force it to update the positioning now
    if (isOpen) {
      instance.update();
    }
  };

  /**
   * Initialize a single popper/CC instance
   * @param {Object} elements Collapsible elements object
   */
  function init({ toggle, content, container }) {
    // Attempting to reinitialize
    if (toggle.data(DATA_KEY)) {
      return;
    }
    const config = merge({}, { 
      placement: container.data(options.placementDataKey) || "auto", 
      strategy: container.data(options.stradegyDataKey) || "absolute", 
      modifiers: [] 
    }, options.popper);

    // Add optional arrow modifiers
    if (options.arrowEnabled) {
      content.prepend(`<div class="${ options.arrowClasses }" data-popper-arrow></div>`);
      config.modifiers.push({
        name: 'offset',
        options: {
          offset: [ 0, options.arrowSize ],
        },
      });
    }
    // Create popper instance and add ref to jQuery element data
    const instance = createPopper(
      toggle.get(0), 
      content.get(0), 
      createOptions(config)
    );
    toggle.data(DATA_KEY, instance);
  }
  /** 
   * Minimal user interface is returned 
   */
  return { init }
}

