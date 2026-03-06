---
title: SCSS System & Theming
weight: 30
---
The SCSS architecture of @ulu/frontend relies on a **"Configuration Module"** pattern. Instead of overriding variables after the fact, you configure the library's modules *before* they generate any CSS. This results in a highly customized, efficient stylesheet.

## Consumption Methods

There are three primary ways to consume the SCSS library, depending on your needs:

### 1. Pre-built Stylesheets (Quick Start)
These modules are convenience wrappers that output specific sections of the library. You can use them to quickly import the library's styles without manually calling the output mixins.

-   `@use "@ulu/frontend/scss/stylesheets/full";` - Imports everything (Base, Components, Helpers).
-   `@use "@ulu/frontend/scss/stylesheets/base-styles";` - Imports base styles (Normalize, Typography, Elements).
-   `@use "@ulu/frontend/scss/stylesheets/component-styles";` - Imports component styles.
-   `@use "@ulu/frontend/scss/stylesheets/helper-styles";` - Imports helper classes.

**Usage:** These modules are fully compatible with configuration. You can configure the library (e.g., in your `_ulu.scss` hub file) and then `@use` these stylesheets to output the CSS with your settings applied.

### 2. Direct Module Usage
You can import individual modules directly if you only need specific pieces.

```scss
@use "@ulu/frontend/scss/element";
@use "@ulu/frontend/scss/components/button";

.my-class {
  // Use the module's mixin directly
  @include button.styles(); 
  border-bottom: element.get-rule-style("light");
}
```

**Pros:** Granular control.
**Cons:** Tedious to manage imports; requires configuring each module individually if you want to change defaults.

### 3. The "Hub" Pattern (Recommended)
This is the standard way to build a theme with @ulu/frontend. The library's main entry point (`@ulu/frontend/scss`) acts as a "hub" that forwards all modules with a `ulu.` prefix.

You can import this directly, or (as we recommend) create a local proxy file to simplify your imports.

## Understanding Namespacing

When using the **Hub Pattern** or importing the main library entry point (`@ulu/frontend/scss`), you will notice that module names are prefixed.

-   **Source:** Inside the library, the `element` module has a function `get-rule-style()`.
-   **Usage:** In your project, you access this via `ulu.element-get-rule-style()`.

**Why?**
The main library entry point uses Sass `@forward` rules to combine all modules into one namespace while preventing naming collisions. It prefixes every member with its module name.

```scss
// In the library's index.scss
@forward "element" as element-*;
@forward "color" as color-*;
```

This means `color.get("primary")` becomes `ulu.color-get("primary")`. This flat namespace makes it easy to access any tool from the entire system with a single import.

## Recommended Project Structure

To fully utilize the Hub Pattern while keeping your configuration organized, we recommend creating a local "proxy" hub. This setup allows you to import your configured library anywhere in your project using a simple `@use "ulu"`.

> **Note:** This structure works best when you have configured your SCSS load paths. See [Recommended Project Setup](/guide/recommended-setup/) for build configuration details.

```text
src/scss/
├── _ulu.scss          # Your Local Hub: Imports config, forwards library
├── styles.scss        # Main entry point
├── config/            # Your custom configuration modules
│   ├── _index.scss    # Imports all config partials
│   ├── _color.scss    # ulu.color-set(...)
│   └── ...
└── ...
```

### 1. The Local Hub File (`_ulu.scss`)

Create a file named `_ulu.scss` in your SCSS root. This file serves two purposes:
1.  **Loads Configuration:** It ensures your custom settings (`config/`) are loaded *before* the library is used elsewhere.
2.  **Exposes the Library:** It forwards the library so any file importing `"ulu"` gets access to all mixins and functions.

```scss
// src/scss/_ulu.scss

// 1. Forward the library so it is available to importers
@forward "@ulu/frontend/scss"; 

// 2. Load your local configuration
@use "config"; 
```

### 2. Configuration Partials (e.g., `config/_color.scss`)

In your config files, you import the library and apply your settings. Because we are inside the configuration phase (which `_ulu.scss` uses), we import the library directly here.

```scss
// src/scss/config/_color.scss
@use "@ulu/frontend/scss" as ulu;

// Set the color palette
@include ulu.color-set((
  "primary": #007bff,
  "secondary": #6c757d,
));
```

### 3. The Main Stylesheet (`styles.scss`)

Finally, your main stylesheet imports your local hub (`ulu`) and outputs the styles using the pre-built stylesheets (or manual mixins).

```scss
// src/scss/styles.scss
@use "ulu"; // Imports your local src/scss/_ulu.scss

// Output Styles using the pre-built helpers
// These will use the configuration loaded by "ulu"
@use "@ulu/frontend/scss/stylesheets/full"; 
```

## Core Modules

Three modules form the foundation of the design system. Configuring these first ensures consistency across all components.

### 1. Color (`ulu.color`)
Manages your project's color palette.
-   **Palette:** Define colors like `"primary"`, `"secondary"`, or `"brand-blue"`.
-   **Usage:** Other modules reference these colors by name (e.g., `ulu.button-set(( "background-color": "brand-blue" ))`).

### 2. Typography (`ulu.typography`)
Manages fonts, sizes, and scale.
-   **Sizes:** Define a scale (e.g., "small", "base", "large", "h1", "h2"). Each size can include font-size, line-height, and responsive breakpoints.
-   **Families:** Set font stacks for sans, serif, and monospace.

### 3. Breakpoints (`ulu.breakpoint`)
Manages responsive breakpoints.
-   **Sizes:** Define your grid breakpoints (e.g., "small", "medium", "large").
-   **Usage:** Used by layout utilities and component media queries.

## Component Configuration

Every component (Accordion, Card, Modal, etc.) has its own configuration mixin. You can change padding, borders, colors, and layout options globally for that component.

**Example: Customizing the Button**

```scss
// src/scss/config/_button.scss
@use "@ulu/frontend/scss" as ulu;

@include ulu.button-set((
  "border-radius": 4px,
  "padding": (0.5em 1.5em),
  "font-weight": "bold",
  "text-transform": "uppercase"
));
```
