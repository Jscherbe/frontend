/**
 * @module settings
 * @description Manages shared configuration for the library.
 */

/**
 * Default settings
 * @typedef {object} Defaults
 * @property {string} iconClassClose - The CSS class string for the close icon
 * @property {string} iconClassDragX - The CSS class string for the drag X icon
 * @property {string} iconClassDragBoth - The CSS class string for the dragging in both directions
 * @property {string} iconClassPrevious - The CSS class string for the previous icon
 * @property {string} iconClassNext - The CSS class string for the next icon
 * @property {string} cssvarPrefix - The prefix to use for CSS custom properties
 */

/**
 * @type {Defaults}
 */
const defaults = {
  iconClassClose: "css-icon css-icon--close",
  iconClassDragX: "css-icon css-icon--drag-x",
  iconClassDragBoth: "css-icon css-icon--drag-both",
  iconClassPrevious: "css-icon  css-icon--angle-left",
  iconClassNext: "css-icon  css-icon--angle-right",
  cssvarPrefix: "",
};

// Current configuration, initialized with defaults
let currentSettings = { ...defaults };

/**
 * Retrieves a copy of the default settings.
 * @returns {object} A copy of the default settings object.
 */
export function getDefaultSettings() {
  return { ...defaults };
}

/**
 * Updates multiple configuration settings.
 * @param {object} changes An object containing the settings to update.
 */
export function updateSettings(changes) {
  Object.assign(currentSettings, changes);
}

/**
 * Retrieves a copy of the current configuration settings.
 * @returns {object} A copy of the current settings object.
 */
export function getSettings() {
  return { ...currentSettings };
}

/**
 * Retrieves a specific configuration setting by key.
 * @param {string} key The key of the setting to retrieve.
 * @returns {*} The value of the setting, or undefined if not found.
 */
export function getSetting(key) {
  if (!currentSettings.hasOwnProperty(key)) {
    console.warn(`Attempted to access non-existent setting: ${key}`);
    return undefined;
  }
  return currentSettings[key];
}

/**
 * Updates a specific configuration setting.
 * @param {string} key The key of the setting to update.
 * @param {*} value The new value for the setting.
 */
export function updateSetting(key, value) {
  currentSettings[key] = value;
}

/**
 * Creates a wrapped string representation of a configuration setting.
 * This function returns an object with a `toString()` method that, when called,
 * retrieves the current value of the specified setting. This allows the setting
 * to be used as a string literal, dynamically retrieving its value.
 *
 * @param {String} key The key of the setting to wrap.
 * @param {Function} transform Optional function to transform the setting's
 * value when its string representation is requested.
 * @returns {Object} An object with a `toString()` method that returns the
 * (optionally transformed) setting value as a string.
 */
export function wrapSettingString(key, transform) {
  return {
    toString() {
      const value = getSetting(key);
      return transform ? transform(value) : value;
    }
  };
}