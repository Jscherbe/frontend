---
title: SCSS System & Theming
weight: 30
---

The SCSS architecture of @ulu/frontend relies on a **"Configuration Module"** pattern. Instead of overriding variables after the fact, you configure the library's modules *before* they generate any CSS. This results in a highly customized, efficient stylesheet.

## Consumption Methods

There are three primary ways to consume the SCSS library, depending on your needs:

### 1. Pre-built Stylesheets (Quick Start)
If you want to use the library with its default settings and minimal setup, you can import the pre-built stylesheet entry points.

-   `@use "@ulu/frontend/scss/stylesheets/full";` - Imports everything (Base, Components, Helpers).
-   `@use "@ulu/frontend/scss/stylesheets/base-styles";` - Imports only base styles.
-   `@use "@ulu/frontend/scss/stylesheets/component-styles";` - Imports only components.

**Pros:** Fastest setup.
**Cons:** Harder to configure deeply; you get all the default styles.

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
This is the standard way to build a theme with @ulu/frontend. You create a single local file (e.g., `_ulu.scss`) that configures the library and then forwards it. This allows you to import your configured version of the library anywhere in your project using a single namespace.

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

To implement the **Hub Pattern**, we recommend the following directory structure. This setup allows you to have a single "Hub" file (`_ulu.scss`) that represents *your* configured version of the library.

> **Note:** This structure works best when you have configured your SCSS load paths. See [Recommended Project Setup](./recommended-setup/) for build configuration details.

```text
src/scss/
├── _ulu.scss          # The "Hub": Configures and forwards the library
├── styles.scss        # Main entry point for your site's CSS
├── config/            # Your custom configuration modules
│   ├── _index.scss    # Imports all config partials
│   ├── _color.scss    # Custom color palette
│   ├── _type.scss     # Typography settings
│   └── _...           # Configs for other components
└── ...
```

### 1. The Hub File (`_ulu.scss`)

This file is the key to the pattern. It imports your configuration and then `@forward`s the library. By importing this file instead of `@ulu/frontend/scss` directly, any file in your project gets the *configured* version of the modules.

```scss
// src/scss/_ulu.scss

// 1. Configure the library modules (by using your config partials)
@use "config"; 

// 2. Forward the library so it's available to importers
@forward "@ulu/frontend/scss"; 
```

### 2. A Configuration Partial (e.g., `config/_color.scss`)

In your config files, you import the library and apply your settings. Note that inside config files, we import the library as `ulu` to access its helpers.

```scss
// src/scss/config/_color.scss
@use "@ulu/frontend/scss" as ulu;

// Set the color palette
@include ulu.color-set((
  "primary": #007bff,
  "secondary": #6c757d,
  "success": #28a745,
  // Mapping semantic names to palette colors
  "brand": "primary",
  "link": "primary"
));
```

### 3. The Main Stylesheet (`styles.scss`)

Finally, your main stylesheet imports the "Hub" (`ulu`) and outputs the styles.

```scss
// src/scss/styles.scss
@use "ulu"; // Imports your local _ulu.scss

// Output Base Styles (Normalize, Typography, Elements)
@include ulu.base-styles();

// Output Component Styles (Buttons, Cards, etc.)
@include ulu.component-styles();

// Output Helper Classes
@include ulu.helper-styles();
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
