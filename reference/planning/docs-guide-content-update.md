# Docs Guide Content Update Plan

## Objectives
- Reorganize the "Guide" section to provide a logical progression for new users.
- Clearly articulate the separation and integration of the JS and SCSS systems.
- Highlight the extensive configuration capabilities of the SCSS modules.
- Provide concrete workflow examples based on the "Opinionated Setup" used in the docs site.

## Proposed Navigation Structure

### 1. Introduction (`/guide/index.md`)
*   **Goal:** High-level overview.
*   **Content:** 
    *   What is @ulu/frontend?
    *   Core Principles:
        *   **Lightweight:** Tree-shakable, modular.
        *   **Styling-Agnostic JS:** JS uses data attributes, not classes.
        *   **Configurable SCSS:** "Configuration over code" approach for theming.

### 2. Installation & Setup (`/guide/installation.md`)
*   **Source:** Refined version of `package-consumption.md` + new "Recommended Setup".
*   **Content:**
    *   NPM Installation.
    *   **Recommended Build Setup:**
        *   Configuring SCSS `loadPaths` (Sass include paths) to point to your project's SCSS directory.
        *   *Why?* This allows absolute imports (e.g., `@use "config"`) from anywhere in your project without `../../`.
        *   **Vite Example:**
            ```javascript
            css: {
              preprocessorOptions: {
                scss: {
                  loadPaths: [path.resolve(__dirname, "src/scss/")]
                }
              }
            }
            ```
    *   **Bundles:** Explanation of ESM vs UMD.
    *   **Peer Dependencies:** Why they matter.

### 3. JavaScript System (`/guide/javascript-system.md`)
*   **Goal:** Explain how the JS works (since it's unique/attribute-based).
*   **Content:**
    *   **Initialization:** How `init()` functions work (scanning DOM for `data-ulu-*`).
    *   **Manual Instantiation:** Using `new Class()` for dynamic content or specific control.
    *   **Global Settings:** Using `updateSettings` (e.g., configuring Icons).
    *   **Events:** Overview of the custom event system (core events like `pageModified`).

### 4. SCSS System & Theming (`/guide/theming.md`)
*   **Source:** Refined version of `building-stylesheet.md`.
*   **Goal:** Explain the "Configuration Module" pattern.
*   **Content:**
    *   **The `_ulu.scss` Pattern:**
        *   Create a local `src/scss/_ulu.scss` file.
        *   Use it to `@forward "@ulu/frontend/scss"` and `@use "config"`.
        *   *Benefit:* Importing `"ulu"` now gives you the *configured* library instance everywhere.
    *   **Project Structure:**
        ```text
        src/scss/
        ├── _ulu.scss          # The "Hub": Forwards lib, uses config
        ├── styles.scss        # Main entry point
        ├── config/            # Your configuration modules
        │   ├── _index.scss    # Forwards all config modules
        │   ├── _color.scss    # ulu.color-set(...)
        │   └── _type.scss     # ulu.typography-set(...)
        └── ...
        ```
    *   **Configuration Workflow:**
        *   Create a config module (e.g., `config/_color.scss`).
        *   Import the library (`@use "@ulu/frontend/scss" as ulu`).
        *   Call setter mixins (`@include ulu.color-set(...)`).
    *   **Core Modules:** Deep dive into the "Big Three":
        *   **Color:** Palette, Contexts.
        *   **Typography:** Scale, Families, Sizes map.
        *   **Breakpoints:** Setup and usage.

### 5. Workflow: Using Components (`/guide/using-components.md`)
*   **Goal:** A "Hello World" for adding a specific UI component.
*   **Content:**
    *   **Example Component:** **Dialog** (Chosen because it demonstrates the full stack: HTML attributes, SCSS configuration, and JS initialization). *Correction: Previous plan incorrectly referenced an accordion JS module; Accordion is primarily SCSS-only/native details.*
    *   **Step 1: HTML:** Required structure (`data-ulu-dialog`, `data-ulu-dialog-close`, etc.) based on `lib/js/ui/dialog.js`.
    *   **Step 2: SCSS:** 
        *   Importing the styles (`@use "ulu"`).
        *   Configuring defaults (e.g., `ulu.component-modal-set` - note: dialog styles often map to modal component in SCSS).
        *   Outputting styles (`ulu.component-modal-styles`).
    *   **Step 3: JS:** Importing and initializing (`dialogInit()`).
    *   **Mandate:** Verify all attribute names (`data-ulu-*`) and mixin names against the actual source code in `lib/`.

### 6. Advanced (`/guide/advanced/`)
*   **Sub-pages:**
    *   **Creating SCSS Modules:** (Source: `developing-ulu-scss-module.md`) Standardizing naming, config maps, and mixins.
    *   **Creating JS Components:** Using `ComponentInitializer` to build standard-compliant JS widgets.

## Migration & Execution Plan

1.  **Consolidate:** Move useful content from `package-consumption.md` to `installation.md` (create new).
2.  **Refactor:** Rename `building-stylesheet.md` to `theming.md` and expand on Core Module configuration details.
3.  **Draft:** Write new content for `javascript-system.md` and `using-components.md`.
4.  **Move:** Move `developing-ulu-scss-module.md` to `advanced/creating-scss-modules.md`.
5.  **Review:** Ensure all links in `README.md` and other docs point to the new structure.

## Existing Content Mapping

| Current File | New Location | Notes |
| :--- | :--- | :--- |
| `package-consumption.md` | `installation.md` | Rename, refine legacy import section. |
| `building-stylesheet.md` | `theming.md` | Expand to cover Core Config detail. |
| `developing-ulu-scss-module.md` | `advanced/creating-scss-modules.md` | Move to advanced section. |
