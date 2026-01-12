---
title: ui
---

<a name="module_ui"></a>

# ui
Public API for the UI modules.

This file re-exports the internal implementations from the `ui` directory
with new names where appropriate, defining the public-facing API for the
library bundle.

For internal library usage, import directly from the specific file within
the `ui` directory (e.g., `import { ... } from './dialog.js'`).

**Internal**: How to Name Exports

Each export is renamed with a prefix based on its source module's name
(e.g., `init` from `dialog.js` becomes `dialogInit`). This is a critical
part of the library's bundling strategy, which creates a single, "flat"
module with uniquely named exports.

This approach:
1. Prevents name collisions between modules that might use the same export
   names (like `init` or `defaults`).
2. Allows bundlers in consuming projects to perform dead-code elimination
   (tree-shaking) with maximum effectiveness.

How To Add New Exports

When adding a new export, follow the naming convention:
`[moduleName][OriginalExportName]` (using camelCase).

For example, to export `myFunction` from `./foo.js`, you would add:
`myFunction as fooMyFunction`

Please keep the exports within each block alphabetized.  

  