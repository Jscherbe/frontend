---
title: Sass API
weight: 20
iconClass: fab fa-sass
layout: default
---

Sass is broken into modules. Each module can be configured by calling it's set() mixin and passing the configuration options you want to change. 

## Organization

**The modules are broken into the following categories:**

- **Core:** These are the root level modules (ie. @ulu/frontend/scss/breakpoint.scss). They are contain core mixins which are used throughout the other modules (breakpoint, element, etc). They don't output styles, all other modules (base, components, etc) are used to output styles.
- **Base:** These modules provide styles for top/base of the stylesheet styles (normalize, general html elements, shared keyframes, etc).
- **Components:** These modules provide styles for individual components (button, card, etc).
- **Helpers:** These modules provide bottom of the stylesheet overriding styles (display utilities, typographic overriding utilities, etc)
- **Stylesheets:** This contains modules for outputting entire stylesheets. Normally you will want to construct your own stylesheet by call

## Property/Argument Types

Throughout the Sass API documentation the following types of arguments are annotated:

- **{String}**: Unstructured text.
- **{Number}**: Numeric values.
- **{List}**: Ordered collection of items.
- **{Map}**: Unordered collection of key-value pairs.
- **{Boolean}**: True or false values.
- **{Color}**: Represents color values (e.g., #fff, rgb(255, 255, 255)).
- **{Dimension}**: Represents measurements (e.g., 10px, 2rem).
- **{Time}**: Represents time values (e.g., 2s, 100ms).
- **{Angle}**: Represents angle values (e.g., 45deg, 1rad).
- **{CssValue}**: Value: Represents values specific to CSS properties (e.g., border value, box shadow value).
- **{Gradient}**: Represents gradient values (e.g., linear-gradient, radial-gradient).

## Design Descisions

### Adjustable Selectors

Components and other selectors in the system can be changed to avoid conflicts with pre-existing selectors, especially when working within a different base theme. This design approach offers flexibility, allowing the stylesheet to be used as a complete theme or as individual components as needed. This adaptability is crucial, as project requirements, client preferences, legacy systems, budget constraints, and other factors may limit the extent to which a theme can be customized. By making selectors changeable, you can leverage the same tool across diverse project types, selecting and applying only the necessary components.

The core selector module manages selectors (basically a lookup system). This way no matter where you request a selector (ie. in the component, vs in a module created for your theme/system) it will be the altered selector (versus just passing the selector directly to the component). 

### Why not make everything mixins?

By using a combination of mixins and components, we can create a flexible and efficient CSS architecture. Mixins provide reusable style blocks for common elements, while components encapsulate the complete styling for specific UI elements. This approach allows for customization and variation within components, reducing the need for multiple copies of the same component. Additionally, components can be easily extended with site-specific styles, ensuring a consistent and maintainable design system.

### Minimalist Configuration Approach

We've intentionally kept the configuration simple and static. This allows for maximum flexibility and customization. For instance, the color palette is deliberately basic, avoiding pre-defined themes. 

Instead of imposing assumptions, we provide a foundation upon which you can build your own complex theme systems (that has assumptions). You can define base colors, typography, and other foundational elements in your theme system, then map these assumptions to the simple configuration in Ulu.