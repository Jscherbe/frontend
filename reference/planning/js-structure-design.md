# JS Module Bundling Strategy: Design Discussion

This document outlines the trade-offs between two potential JavaScript bundling strategies for the ULU Frontend library. The chosen strategy directly impacts both the library's authoring experience and the consumer's usage patterns and application stability.

## Context

The library was converted to a pre-bundled package to solve module duplication issues observed in modern development servers like Vite. Previously, consumers would import ES modules directly from the library's source, leading to inconsistencies. The core debate is how to structure this bundled output.

---

### Approach 1: Single Bundled Entry Point (Current Strategy)

This is where all modules are bundled into one file (e.g., `dist/ulu-frontend.es.js`) and exported with prefixed names from a single entry point (`@ulu/frontend`).

```javascript
// Consumer's code
import { dialogInit, tabsInit, utilsDomQuery } from '@ulu/frontend';
```

#### Pros

*   **Guaranteed Singletons:** This is the most significant advantage. It completely solves the module duplication problem by ensuring that critical singletons, like the `settings` module, exist as a single instance across the entire application. This is vital for the integrity of the library's architecture.
*   **Simplicity for the Consumer:** The developer using the library has a very simple API surface. There's only one place to import from. This improves discoverability (IDE autocompletion shows all available functions) and reduces the cognitive load of remembering which file path contains which module.
*   **Optimal Tree-Shaking:** This approach is ideal for dead-code elimination. Because all the export names are unique within a single module (`dialogInit`, `tabsInit`), a consumer's bundler can very reliably determine which functions are unused and "shake" them from the final application bundle.
*   **Robustness:** It's less likely to break in complex build environments. By providing a single, pre-bundled file, you remove the risk of a consumer's bundler or dev server misinterpreting sub-paths or creating duplicate instances.

#### Cons

*   **Authoring Overhead:** The main drawback is for the library author. They must manually ensure every export has a unique, prefixed name. This adds cognitive overhead and can be tedious.
*   **"Flat" API:** As the library grows, the list of exports from the single entry point could become very large.

---

### Approach 2: Multiple Bundled Entry Points (Alternative)

This is where each module would be bundled separately (e.g., `dist/dialog.js`, `dist/tabs.js`) and the consumer would import from specific sub-paths.

```javascript
// Consumer's code
import { init as dialogInit } from '@ulu/frontend/dialog';
import { init as tabsInit } from '@ulu/frontend/tabs';
```

#### Pros

*   **Semantic Imports:** The import paths are more descriptive. `import ... from '@ulu/frontend/dialog'` clearly communicates where the functionality is coming from.
*   **Cleaner Authoring:** The author wouldn't need to manually prefix export names within each source file. `export function init() { ... }` is cleaner than `export function dialogInit() { ... }`.

#### Cons

*   **Risk of Breaking Singletons:** This is the critical failure point. If a consumer's app imports from `@ulu/frontend/dialog` and `@ulu/frontend/tabs`, it's highly likely that each module will get its own bundled copy of any shared dependencies (like the `settings` module). This leads to separate, non-communicating singletons and breaks a core architectural principle.
*   **Shifts Burden to the Consumer:** The consumer becomes responsible for managing import namespacing (e.g., `import { init as dialogInit }`). This increases the chance of user error.
*   **Increased Build Complexity:** To mitigate the singleton problem, the library's build process would need to be more complex, explicitly marking shared dependencies as "external" for every individual bundle.
*   **Complex `package.json`:** To make this work correctly and robustly with modern tools, the `"exports"` field in `package.json` would need to be configured to map all the possible sub-paths.

---

## Conclusion

Given the library's stated architectural goals—especially the **"Singleton `settings` Module"** and the need for robust integration—the current strategy of a **single bundled entry point is the superior choice.**

The manual prefixing is a small developer experience cost for the author, but it buys architectural integrity, guarantees singletons work as intended, and provides a simpler, more foolproof experience for the library's consumers. It effectively trades a minor internal inconvenience for major external robustness, which is the correct call for a foundational library.
