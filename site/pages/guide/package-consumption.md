---
title: Package Consumption
intro: How to install and use the ULU Frontend library in your project.
weight: 20
---

ULU Frontend is distributed as an NPM package and can be consumed in a variety of ways, depending on your project's needs. This guide outlines the available bundles and how to use them.

## Installation

Install the package from NPM:

```bash
npm install @ulu/frontend
```

## Available Bundles

The `dist/` directory contains two primary bundles:

*   **`ulu-frontend.es.js` (ESM)**: A modern, tree-shakable ES Module bundle. This is the recommended choice for projects using modern bundlers like Vite, Webpack, or Rollup.
*   **`ulu-frontend.umd.js` (UMD)**: A Universal Module Definition bundle that can be used directly in the browser via a `<script>` tag. This is useful for legacy environments, testing, or online code editors like CodePen.

### Using the ES Module (ESM) Bundle

When using a bundler, you can import components and utilities directly from the package:

```javascript
import { BreakpointManager, updateSetting } from '@ulu/frontend';

// Example: Configure a setting
updateSetting('cssvarPrefix', 'my-app');

// Example: Use a class
const bm = new BreakpointManager();
```

### Using the UMD Bundle

To use the UMD bundle, include it in your HTML file. This will expose a global `ULU` object.

```html
<script src="node_modules/@ulu/frontend/dist/ulu-frontend.umd.js"></script>
<link rel="stylesheet" href="node_modules/@ulu/frontend/dist/style.css">

<script>
  // Example: Configure a setting
  ULU.updateSetting('cssvarPrefix', 'my-app');

  // Example: Use a class
  const bm = new ULU.BreakpointManager();
</script>
```

## Legacy Imports (Backward Compatibility)

For a smoother transition, this version of ULU Frontend maintains backward compatibility with the previous import paths. If your project used to import modules directly from the `js/` directory, those imports will continue to work without changes.

**Legacy Import Example:**
```javascript
import { Slider } from '@ulu/frontend/js/ui/slider.js';
```

This is achieved by mapping the old `js/*` paths to their new locations in the `lib/js/*` directory. Note you will still need to make updates if you were previously accessing things like settings or events modules which are in the `lib/js/core` now.

**Recommendation:** While this bridge is in place to prevent breaking changes, we strongly encourage updating your code to use the primary, modern entry point for all new and refactored code. This will ensure better stability and alignment with future versions of the library.

**Modern Import Example:**
```javascript
import { Slider } from '@ulu/frontend';
```

## Peer Dependencies

If you are creating a library or another package that uses `@ulu/frontend` as a dependency (e.g., a Vue component library based on ULU), it is **critical** to list `@ulu/frontend` as a `peerDependency` in your `package.json`.

```json
{
  "name": "my-ulu-based-library",
  "version": "1.0.0",
  "peerDependencies": {
    "@ulu/frontend": "^1.0.0"
  }
}
```

**Why is this important?**

Declaring it as a peer dependency prevents module duplication. `@ulu/frontend` includes singleton modules (like `settings`) that manage global state. If multiple copies of the library are loaded into a single project, these singletons will not be shared, leading to unexpected behavior and bugs. By using `peerDependencies`, you ensure that the consuming project provides a single, shared instance of `@ulu/frontend`.
