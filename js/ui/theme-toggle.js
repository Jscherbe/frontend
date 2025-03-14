/**
 * @module ui/theme-toggle
 */

import { getName } from "../events/index.js";
import { getDatasetJson, getElements, resolveClasses } from "../utils/dom.js";
import { hasRequiredProps } from "@ulu/utils/object.js";

/**
 * Default data attributes
 */
export const attrs = {
  init: "data-ulu-theme-toggle-init",
  toggle: "data-ulu-theme-toggle",
  toggleIcon: "data-ulu-theme-toggle-icon",
  toggleLabel: "data-ulu-theme-toggle-label",
  toggleRemote: "data-ulu-theme-toggle-remote",
  state: "data-ulu-theme-toggle-state",
};

// Utils for selecting things based on attributes
const attrSelector = key => `[${ attrs[key] }]`;
const attrSelectorInitial = key => `${ attrSelector(key) }:not([${ attrs.init }])`;
const queryAllInitial = key => document.querySelectorAll(attrSelectorInitial(key));
const queryRemotes = group => document.querySelectorAll(
  `[${ attrs.toggleRemote }="${ group }"]`
);
const queryRemotesInitial = group => document.querySelectorAll(
  `[${ attrs.toggleRemote }="${ group }"]:not([${ attrs.init }])`
);
const debugLog = (...msgs) => console.log("Theme Toggle:", ...msgs);
const requiredToggleProps = ["target"];
const checkToggleProps = hasRequiredProps(requiredToggleProps);
const when = (cond, fn) => cond ? fn() : null; // Consider adding as util 

/**
 * Default Options 
 * - Can be overridden using data-attributes
 */
export const defaults = {
  /**
   * Object of each theme that should be toggle/cycled through
   */
  themes: {
    light: {
      label: "Light",
      value: "light",
      iconClass: "fas fa-moon",
      targetClass: "theme-light",
      mediaQuery: "(prefers-color-scheme: light)"
    },
    dark: {
      label: "Dark",
      iconClass: "fas fa-sun",
      targetClass: "theme-dark",
      mediaQuery: "(prefers-color-scheme: dark)"
    }
  },
  /**
   * Required this is the element(s) that should be changed by a specific toggle
   * - The element should have data-ulu-theme-toggle-target="SOME_IDENTIFIER"
   */
  target: "body",
  /**
   * Optional group to link remote toggles (toggles that follow the main one and can toggle too)
   */
  group: null,
  /**
   * Optional callback to do something when the state changes
   */
  onChange(_ctx) {},
  /**
   * The initial state for this component
   * - May be overridden by saved preference or media query if options are enabled
   */
  initialState: "light",
  /**
   * Check the OS systems user preference via 'preferenceQuery' option
   */
  checkMediaQuery: false,
  /**
   * Will store the preference in local storage so it persists between page loads
   */
  savePreference: false,
  /**
   * The key that will be used to store the preference in local storage
   * - This will be used as prefix in combination with group if defined
   */
  storagePrefix: "ulu-theme-",
  /**
   * Output information to console for debugging
   */
  debug: false
};


// Current default objects (user can override these)
let currentDefaults = { ...defaults };

/**
 * @param {Object} options Change options used as default for dialogs, can then be overridden by data attribute settings on element
 */
export function setDefaults(options) {
  currentDefaults = Object.assign({}, currentDefaults, options);
}

/**
 * Initialize everything in document
 * - This will only initialize elements once, it is safe to call on page changes
 */
export function init() {
  document.addEventListener(getName("pageModified"), setup);
  setup();
}

/**
 * Query and setup all 
 */
export function setup() {
  queryAllInitial("toggle").forEach(setupToggle);
}

/**
 * Sets up a single toggle
 * @param {HTMLElement} toggle A toggle to be setup
 */
export function setupToggle(toggle, passedOptions) {
  const elementOptions = getDatasetJson(toggle, "uluThemeToggle");
  const options = Object.assign({}, defaults, passedOptions, elementOptions);

  if (!checkToggleProps(options)) {
    console.error(`Missing a required option: ${ requiredToggleProps.join(", ") }`);
    return;
  }

  const group = options.group;
  const ctx = { toggle, options };
  const initialKey = resolveInitial(options);

  if (!initialKey) {
    console.error("Unable to resolve initial key");
    return;
  }
  
  setState(initialKey, ctx);

  toggle.addEventListener("click", onToggleClick);
  toggle.setAttribute(attrs.init, "");

  // Remotes listeners are attached initially and then we also 
  // update them vs toggles which would be updated by the main pageModified 
  // event in init
  attachRemotes();
  document.addEventListener(getName("pageModified"), attachRemotes);

  /**
   * Instance function to get the next theme in cycle
   */
  function toggleState(event) {
    const targets = getElements(options.target);
    const lastKey = targets[0].dataset.uluThemeToggleState;
    const key = getNextThemeKey(lastKey, options);
    if (!key) {
      console.error("Issue getting next theme key");
      return;
    } 
    setState(key, { ...ctx, event });
  }

  /**
   * Handler for click for both toggle and remote toggles
   */
  function onToggleClick(event) {
    toggleState(event);
  }

  /**
   * Utility to attach remote handlers
   * - Used initially and when page is modified
   */
  function attachRemotes() {
    if (!group) return;
    const remotes = queryRemotesInitial(group);
    remotes.forEach(remote => {
      remote.addEventListener("click", onToggleClick);
      remote.setAttribute(attrs.init, "");
    });
  }

  /**
   * This only cleans up remotes that are still in DOM
   * - For ones that have been removed we don't store any references to them 
   */
  function cleanupRemotes() {
    if (!group) return;
    const remotes = queryRemotesInitial(group);
    remotes.forEach(remote => {
      remote.removeEventListener("click", onToggleClick);
      remote.removeAttribute(attrs.init, "");
    });
  }

  /**
   * Function to cleanup listeners and remove init attributes
   */
  function destroy() {
    toggle.removeEventListener("click", onToggleClick);
    toggle.removeAttribute(attrs.init, "");
    cleanupRemotes();
    document.removeEventListener(getName("pageModified"), attachRemotes);
  }

  return { 
    destroy, 
    toggle, 
    options, 
    toggleState,
    setState(themeKey) {
      setState(themeKey, ctx);
    }
  };
}



/**
 * Change the state of target/toggle
 */
function setState(key, ctx) {
  if (!key) {
    console.error("Missing key");
    return;
  }

  const { toggle, options } = ctx;
  const { themes, group } = options;
  const elements = {
    targets: getElements(options.target),
    toggles: [toggle, ...(group ? queryRemotes(group) : [])]
  };

  if (!elements.targets.length || !elements.toggles.length) {
    console.error("Issue setting state, couldn't find needed elements", elements);
    return;
  }

  const theme = themes[key];
  const otherThemes = getOtherThemes(key, themes);
  const stateCtx = { 
    ...ctx, 
    key,
    elements, 
    theme, 
    otherThemes 
  };

  if (options.debug) {
    debugLog("set state context", stateCtx);
  }
  
  // Prepare classes to remove
  const otherTargetClasses = concatThemeClasses(otherThemes, "targetClass");
  const otherIconClasses = concatThemeClasses(otherThemes, "iconClass"); 

  // Update all targets
  elements.targets.forEach(element => {
    element.setAttribute(attrs.state, key);
    element.classList.remove(...otherTargetClasses);
    element.classList.add(...resolveClasses(theme.targetClass));
  });

  // Update all toggles and inner children
  elements.toggles.forEach(element => {
    const label = element.querySelector(attrSelector("toggleLabel"));
    const icon = element.querySelector(attrSelector("toggleIcon"));
    if (label) {
      label.textContent = theme.label;
    }
    if (icon) {
      icon.classList.remove(...otherIconClasses);
      icon.classList.add(...resolveClasses(theme.iconClass));
    }
    element.setAttribute(attrs.state, key);
  });

  // Optional callback if user want to set other things (ie. data-theme or something)
  if (options.onChange) {
    options.onChange(stateCtx);
  }

  if (options.savePreference) {
    localStorage.setItem(getStorageKey(options), key);
  }
}

/**
 * Function determines what the initial state is
 * - Check OS preference, saved preference, or initialState depending on options
 * @return {String} The resolved initial theme's key
 */
function resolveInitial(options) {
  const { savePreference, checkMediaQuery, themes, initialState } = options;
  const storageKey = getStorageKey(options);
  const saved = when(savePreference, () => localStorage.getItem(storageKey));
  const mediaQueryPreference = when(checkMediaQuery, () => getMatchingThemeQuery(themes));
  const resolved = saved || mediaQueryPreference || initialState;

  if (options.debug) {
    debugLog("Preference Saved:", saved);
    debugLog("Media Query Preference:", mediaQueryPreference);
    debugLog("Initial State:", initialState);
  }

  if (!resolved) {
    console.error("Failed to resolve initial theme (pass 'initialState' to options)");
  }
  
  return resolved;
}

/**
 * Check each theme for a matching media query
 * @return {String} Matching theme key
 */
function getMatchingThemeQuery(themes) {
  const found = Object.entries(themes).find(([_key, theme]) => {
    if (theme.mediaQuery) {
      return window.matchMedia(theme.mediaQuery).matches;
    }
  });
  // Return just the key
  return found ? found[0] : null;
}

/**
 * Get the next key in the themes based on the currentKey
 */
function getNextThemeKey(activeKey, options) {
  const { themes } = options;
  const keys = Object.keys(themes);
  const index = keys.findIndex(theme => theme === activeKey);
  // If not found return first, else calculate next index (wrapping)
  const nextIndex = index === -1 ? 0 : (index + 1) % keys.length;
  return keys[nextIndex];
}

/**
 * Get all other theme object except the current
 */
function getOtherThemes(currentKey, themes) {
  const all = Object.entries(themes);
  return all.filter(([key]) => key !== currentKey).map(([_key, value]) => value);
}

/**
 * Concatenates multiple class properties into one array
 */
function concatThemeClasses(themes, property) {
  return themes.reduce((acc, theme) => {
    return acc.concat(resolveClasses(theme[property]));
  }, []);
}

/**
 * Creates the storage key (either prefix or prefix with group name)
 */
function getStorageKey(options) {
  const { storagePrefix, group } = options;
  return group ? `${ storagePrefix }${ group }` : storagePrefix;
}