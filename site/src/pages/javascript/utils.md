---
title: utils
---

<a name="module_utils"></a>

# utils
Public API for the utility modules.

This file re-exports the internal implementations from the `utils` directory
with new names where appropriate, defining the public-facing API for the
library bundle.

For internal library usage, import directly from the specific file within
the `utils` directory (e.g., `import { ... } from './dom.js'`).

**Internal**: Naming Convention
To ensure tree-shaking works correctly while avoiding name collisions in the
final library, the following naming convention is used for re-exporting:

1. Generic Names: Functions with highly generic names (e.g., `log`, `set`, `defaults`)
   MUST be prefixed with a name derived from their module to prevent conflicts.
   Example: `export { log as classLoggerLog } from "./class-logger.js";`

2. Descriptive Names: Functions with specific, descriptive names that are unlikely
   to cause conflicts (e.g., `newId`, `createFloatingUi`, `configureIcons`)
   can be re-exported directly without a prefix for better readability.
   Example: `export { newId } from "./id.js";`  

  