/**
 * @module utils
 * @description
 * Public API for the utility modules.
 *
 * This file re-exports the internal implementations from the `utils` directory
 * with new names where appropriate, defining the public-facing API for the
 * library bundle.
 *
 * For internal library usage, import directly from the specific file within
 * the `utils` directory (e.g., `import { ... } from './dom.js'`).
 *
 * @internal
 *
 * Naming Convention
 * To ensure tree-shaking works correctly while avoiding name collisions in the
 * final library, the following naming convention is used for re-exporting:
 *
 * 1. Generic Names: Functions with highly generic names (e.g., `log`, `set`, `defaults`)
 *    MUST be prefixed with a name derived from their module to prevent conflicts.
 *    Example: `export { log as classLoggerLog } from "./class-logger.js";`
 *
 * 2. Descriptive Names: Functions with specific, descriptive names that are unlikely
 *    to cause conflicts (e.g., `newId`, `createFloatingUi`, `configureIcons`)
 *    can be re-exported directly without a prefix for better readability.
 *    Example: `export { newId } from "./id.js";`
 */

export {
  set as classLoggerSet,
  log as classLoggerLog,
  logWarning as classLoggerLogWarning,
  logError as classLoggerLogError
} from "./class-logger.js";

export {
  dataAttributeToDatasetKey,
  setPositionClasses,
  resolveClasses
} from "./dom.js";

export { 
  FileSave 
} from "./file-save.js";

export {
  defaults as floatingUiDefaults,
  createFloatingUi
} from "./floating-ui.js";

export { 
  configureIcons as fontAwesomeConfigureIcons
} from "./font-awesome.js";

export {
  newId,
  ensureId
} from "./id.js";

export {
  pauseVideos as youtubePauseVideos,
  prepVideos as youtubePrepVideos
} from "./pause-youtube-video.js";