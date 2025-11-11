# Documentation Update Notes

This document outlines recommended updates for the documentation to reflect the recent architectural refactoring of the library.

## 1. Update All File Paths

The source code was moved from the root `js/` and `scss/` directories into a new `lib/` directory.

- **Action:** A project-wide search should be performed within the `docs-src/` directory for any hardcoded paths like `"js/"` or `"scss/"` and update them to `"lib/js/"` or `"lib/scss/"`.
- **Note:** This is especially important for any guides (like `building-stylesheet.md`) that describe the project structure.

## 2. Rewrite JavaScript Usage Guides

This is the most significant change for consumers. The entire way of importing and using JavaScript modules has been updated.

- **Action:** All examples and guides must be updated to reflect the new API.
  - **Before:** `import { ui } from '@ulu/frontend'; ui.dialog.init();`
  - **After:** `import { dialogInit } from '@ulu/frontend'; dialogInit();`
- **Action:** The main JavaScript API page should explain that all modules are now available from the top-level `@ulu/frontend` import.
- **Action:** The `lib/js/exports.md` file we created should be embedded or prominently linked in the documentation as the definitive map of available exports.

## 3. Verify SCSS Import Paths

The physical location of the SCSS files changed, but the `package.json` `exports` map was updated to handle this.

- **Action:** Verify that the documented import path still works as expected:
  ```scss
  @use "@ulu/frontend/scss";
  ```
- **Recommendation:** The documentation should continue to use this logical import path. There is no need to mention the internal `lib/` structure, as the `exports` map is designed to abstract that away.

## 4. Add "Package Consumption" Guide

The new build strategy introduces different ways to consume the library, which should be documented.

- **Action:** Create a new guide explaining the different bundles available in the `dist/` directory:
  - `ulu-frontend.es.js`: The modern, tree-shakable ESM bundle for use with bundlers like Vite and Webpack.
  - `ulu-frontend.umd.js`: The UMD bundle for legacy environments or direct use in a browser via a `<script>` tag.
- **Action:** Add a critical section on **`peerDependencies`**. This guide should explain that any library building on top of `@ulu/frontend` (like `@ulu/frontend-vue`) **must** declare it as a `peerDependency`. This is the key to ensuring that singletons (like the `settings` module) are not duplicated across a project's dependency tree. This directly addresses the core issues you've previously faced.

## 5. Update the Changelog

This refactor constitutes a major, breaking change for the library.

- **Action:** The changelog for this new version should be updated with a detailed entry. The description we crafted earlier would be a good starting point for this entry. It should clearly communicate the scope of the changes and the benefits they provide.
