/**
 * Retrieves a copy of the default settings.
 * @returns {object} A copy of the default settings object.
 */
export function getDefaultSettings(): object;
/**
 * Updates multiple configuration settings.
 * @param {object} changes An object containing the settings to update.
 */
export function updateSettings(changes: object): void;
/**
 * Retrieves a copy of the current configuration settings.
 * @returns {object} A copy of the current settings object.
 */
export function getSettings(): object;
/**
 * Retrieves a specific configuration setting by key.
 * @param {string} key The key of the setting to retrieve.
 * @returns {*} The value of the setting, or undefined if not found.
 */
export function getSetting(key: string): any;
/**
 * Updates a specific configuration setting.
 * @param {string} key The key of the setting to update.
 * @param {*} value The new value for the setting.
 */
export function updateSetting(key: string, value: any): void;
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
export function wrapSettingString(key: string, transform: Function): any;
/**
 * Default settings
 */
export type Defaults = {
    /**
     * - The CSS class string for the close icon
     */
    iconClassClose: string;
    /**
     * - The CSS class string for the drag X icon
     */
    iconClassDragX: string;
    /**
     * - The CSS class string for the previous icon
     */
    iconClassPrevious: string;
    /**
     * - The CSS class string for the next icon
     */
    iconClassNext: string;
    /**
     * - The prefix to use for CSS custom properties
     */
    cssvarPrefix: string;
};
//# sourceMappingURL=settings.d.ts.map