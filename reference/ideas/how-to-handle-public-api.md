# How to Handle Public API (on window)

**Keeping this idea, this isn't nessasary and may never be added**

- Needed for hotfix/etc
- Hard with tree shaking, other than a Vite plugin or something that knows more about
  what is being used
- Best to keep it on user theme side (they know what they need)

## One Idea is registering Crucial properties like:

- There would be a setting for enablingPublicApi
- Then an init modules that needs to be called by the user for the whole library
  - or a module like global-api that a user needs to import and init (probably first after 
    setting enablePublicApi)
- All modules can opt in to adding their public API like below
  - Note this would be only useful/crucial properties not everything as anything passed   
    would become always added to the bundle 

```js
// ./module-registry.js
/**
 * @typedef {Object.<string, any>} RegisteredModuleProperties
 * Represents the properties exposed by a module via the global API.
 */

/**
 * @type {Object.<string, RegisteredModuleProperties>}
 * The central registry for modules exposed to the global API.
 * Anything registered here will likely not be tree-shaken from the bundle.
 */
export const currentModules = {};

/**
 * Registers a module's public API for potential global access.
 * Use this ONLY for functions/properties critical for hotfixes, debugging,
 * or direct browser console interaction.
 *
 * IMPORTANT: Any code registered here will be included in the final bundle
 * and will NOT be tree-shaken, even if not directly imported by the main application logic.
 *
 * @param {string} name - The unique name of the module (e.g., 'authService', 'modalManager').
 * @param {RegisteredModuleProperties} properties - An object containing the public methods/properties to expose.
 */
export function registerModule(name, properties) {
  if (currentModules[name]) {
    console.warn(`Module "${name}" is being re-registered in the global API. This might indicate an issue.`);
  }
  currentModules[name] = properties;
  console.debug(`Module "${name}" registered for global API access.`);
}
```