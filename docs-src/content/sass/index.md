---
title: Sass API
weight: 20
iconClass: fab fa-sass
layout: default
---

Sass is broken into modules. Each module can be configured by calling it's set() mixin and passing the configuration options you want to change. 

## Organization

**The modules are broken into the following categories:**

- **Core** These are the root level modules (ie. @ulu/frontend/scss/breakpoint.scss). They are contain core mixins which are used throughout the other modules (breakpoint, element, etc).
- **Base** These modules provide styles for top/base of the stylesheet styles (normalize, general html elements, shared keyframes, etc).
- **Components** These modules provide styles for individual components (button, card, etc).
- **Helpers** These modules provide bottom of the stylesheet overriding styles (display utilities, typographic overriding utilities, etc)
- **Stylesheets** This contains modules for outputting entire stylesheets. Normally you will want to construct your own stylesheet by call

## Property/Argument Types Explained

Throughout the Sass API documentation the following types of arguments are annotated:

**{String}** - Unstructured text.
**{Number}** - Numeric values.
**{List}** - Ordered collection of items.
**{Map}** - Unordered collection of key-value pairs.
**{Boolean}** - True or false values.
**{Color}** - Represents color values (e.g., #fff, rgb(255, 255, 255)).
**{Dimension}** - Represents measurements (e.g., 10px, 2rem).
**{Time}** - Represents time values (e.g., 2s, 100ms).
**{Angle}** - Represents angle values (e.g., 45deg, 1rad).
**{CssValue}** - Value: Represents values specific to CSS properties (e.g., border value, box shadow value).
**{Gradient}** - Represents gradient values (e.g., linear-gradient, radial-gradient).

