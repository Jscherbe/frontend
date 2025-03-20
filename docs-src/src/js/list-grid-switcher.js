// Module for list-grid switching

const attrs = {
  container: "data-list-grid",
  toggle: "data-list-grid-toggle",
  toggleItemList: "data-list-grid-toggle-list",
  toggleItemGrid: "data-list-grid-toggle-grid",
};
const defaults = {
  activeClass: "is-active",
  localStorageKey: "siteListGrid",
  onChange() {}
};

let config = defaults;

const attrSelector = key => `[${ attrs[key] }]`;

function getPreference() {
  return localStorage.getItem(config.localStorageKey);
}

/**
 * Set config changes
 * @param {Object} changes Config changes
 */
export function setConfig(changes) {
  config = Object.assign({}, defaults, changes);
}

export function init() {
  const preference = getPreference();
  const containers = document.querySelectorAll(attrSelector("container"));

  if (!containers) return;

  // Loop through each container, set initial state if localStorage preference
  // and set toggle listener
  containers.forEach((container) => {
    const toggle = container.querySelector(attrSelector("toggle"));
    
    if (preference) {
      setState(container, preference);
    }
    if (toggle) {
      toggle.addEventListener("click", onToggle);
    }
  });
}

function setState(container, value) {
  const toggle = container.querySelector(attrSelector("toggle"));
  container.setAttribute(attrs.container, value);
  localStorage.setItem(config.localStorageKey, value);
  if (toggle) {
    setStateToggle(toggle, value);
  } else {
    console.warn("Unable to get toggle for list grid");
  }
  if (config.onChange) {
    try {
      config.onChange(container, value);
    } catch (error) {
      console.error(error);
    }
  }
}

function setStateToggle(toggle, value) {
  const isList = value === "list";
  const list = toggle.querySelector(attrSelector("toggleItemList"));
  const grid = toggle.querySelector(attrSelector("toggleItemGrid"));
  if (list && grid) {
    list.classList[isList ? "add" : "remove"](config.activeClass);
    grid.classList[isList ? "remove" : "add"](config.activeClass);
  } else {
    console.warn("Unable to get elements for setStateToggle()");
  }
}

/**
 * Toggle click listener
 */
function onToggle() {
  const container = this.closest(attrSelector("container"));
  if (!container) {
    console.warn("Unable to find container list grid");
    return;
  }
  const state = container.getAttribute(attrs.container);
  const to = state === "list" ? "grid" : "list";
  setState(container, to);
}