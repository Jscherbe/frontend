---
title: Theming (Light/Dark Mode)
weight: 35
---
The `@ulu/frontend` library includes a dedicated `themes` module designed to orchestrate custom property variations, most commonly used for implementing light and dark modes, or creating multiple distinct brand themes within a single project.

Unlike other configuration modules that output structural styles, the `themes` module specifically manages the generation of CSS Custom Properties (`var(--...)`) scoped to `:root` or specific `.theme-[name]` classes.

## How it Works

The system takes a single configuration map where the keys are the CSS custom property names, and the values are nested maps defining the variations. We refer to these entries as **Design Tokens**.

A **Design Token** is a semantic name (like `color-background` or `spacing-layout`) that stores a raw value (like `#ffffff` or `16px`). In this system, a single token can hold multiple values, each corresponding to a different theme context (e.g., "light", "dark", "high-contrast").

### 1. Define the Variations

In your project's configuration (e.g., `src/scss/config/_themes.scss`), define the map of tokens and set it using `ulu.themes-set-tokens()`. 

The system uses a property-centric structure. This prevents you from having to redefine values that don't change between themes.

```scss
@use "@ulu/frontend/scss" as ulu;

$theme-tokens: (
  // Example: A value that changes between light and dark
  "color-background" : (
    "light" : white,
    "dark" : black
  ),
  "color-type" : (
    "light" : #333,
    "dark": #eee
  ),
  // Example: A value that remains the same across all themes
  "color-error" : (
    "light" : red,
    "dark": red
  )
);

@include ulu.themes-set-tokens($theme-tokens);
```

### 2. Configure the Modules (Optional)

By default, the core `themes` module assumes your default theme is named `"light"`. You can change this, map theme names to valid CSS `color-scheme` properties, and even map themes to their "inverse" counterparts for contextual flipping.

```scss
// In config/_themes.scss
@include ulu.themes-set((
  "default": "light", // The default theme output to :root
  "color-schemes": (
    // Map custom theme names to native color-schemes if needed
    // "light" and "dark" are handled automatically.
    "high-contrast": "dark" 
  ),
  "inverses": (
    // Allows use of the .theme-inverse utility
    "light": "dark",
    "dark": "light"
  )
));
```

You can also configure the output of the base themes module:

```scss
// In config/_base.scss
@include ulu.base-themes-set((
  "output-inverse": true, // Whether to output the .theme-inverse utility
  "fake-dark-color": white, // The color reset for the .theme-dark-fake utility
  "fake-dark-filter": invert(1) hue-rotate(180deg) saturate(0.7) // The filter used
));
```

### 3. Output the CSS

To generate the CSS variables, ensure the `base` stylesheets are being output in your main `styles.scss` file. (If you are using `@use "@ulu/frontend/scss/stylesheets/full";`, this happens automatically).

```scss
// src/scss/styles.scss
@use "ulu";
@include ulu.base-themes-styles();
```

**What this generates:**
1.  **`:root` / Default Theme:** The values from your default theme (e.g., "light") are output directly to `:root`.
2.  **Theme Classes:** For every unique theme key found in your map (e.g., "dark"), a modifier class is generated (e.g., `.theme-dark`).

```css
/* Conceptual Output */
:root, .theme-light {
  color-scheme: light;
  --color-background: white;
  --color-type: #333;
  --color-error: red;
}

.theme-dark {
  color-scheme: dark;
  --color-background: black;
  --color-type: #eee;
  --color-error: red;
}
```

### 4. Consume the Variables

Once your custom properties are generated, you can consume them in the rest of your system using the `cssvar` module, or by configuring the `color` module to use them.

```scss
// src/scss/config/_color.scss
@use "@ulu/frontend/scss" as ulu;

// Tell the color module to map names to your newly generated CSS variables
@include ulu.color-set((
  "background" : ulu.cssvar-use("color-background"),
  "type" : ulu.cssvar-use("color-type"),
  "error" : ulu.cssvar-use("color-error"),
));
```

## Contextual Inversion

If you have mapped the `inverses` configuration (see step 2), the base output will automatically include a `.theme-inverse` utility class.

When applied to an element, this class flips all custom properties to the opposite of its current context without needing to explicitly hardcode `.theme-dark` or `.theme-light`.

```html
<div class="theme-light">
  <!-- This element will be dark -->
  <div class="theme-inverse">...</div>
</div>
```

## The Fake Dark Utility

Sometimes you encounter elements that need to look "dark" but cannot be styled with CSS variables (e.g., a `<canvas>` element drawn by a third-party script, or an iframe). 

The `themes` module automatically outputs a `.theme-dark-fake` utility class. This class uses CSS `filter` to invert the element's colors while maintaining the original hues.

```html
<div class="theme-dark">
  <!-- This image/canvas will have its colors inverted to match the dark theme context -->
  <img src="chart.png" class="theme-dark-fake" alt="Data Chart">
</div>
```

*Note: The `.theme-dark-fake` class uses a custom property switch and will only activate when placed inside an active dark color-scheme context.*
