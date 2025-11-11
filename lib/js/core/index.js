/**
 * @module core
 * @description
 * Public API for the core modules.
 *
 * This file re-exports the internal implementations from the `core` directory
 * with new names where appropriate, defining the public-facing API for the
 * library bundle.
 *
 * For internal library usage, import directly from the specific file within
 * the `core` directory (e.g., `import { ... } from './settings.js'`).
 */

export {
  dispatchCoreEvent,
  getCoreEventName,
  getUluEventName,
  createUluEvent
} from './events.js';

export {
  getDefaultSettings,
  updateSettings,
  getSettings,
  getSetting,
  updateSetting,
  wrapSettingString
} from './settings.js';

export {
  ComponentInitializer
} from './component.js';


