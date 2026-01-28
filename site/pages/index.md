---
title: Modular Theming Library
# layout: basic
intro: Lightweight, Versatile, Standardized Configuration, Flexible
# highlights:
#   - title: "Modular"
#     description: "Choose only the components you need, or easily include everything in one step"
#     links:
#       - text: "Showcase"
#         url: "/showcase/"
#   - title: "Configurable"
#     description: "Everything has a common configuration pattern. All configuration is documented in API documentation"
#     links:
#       - text: "Sass API"
#         url: "/sass/"
#       - text: "Javascript API"
#         url: "/javascript/"
  # - title: "Accessible"
  #   description: "Built with accessibility standards in mind"
---

## Lightweight & Efficient

This library is designed with performance in mind. The core bundles are very small, ensuring a minimal impact on your site's load times.

- **JavaScript (UMD):** ~20kb (gzipped)
- **CSS (Full Bundle):** ~19kb (gzipped)

Thanks to the modular architecture, the final footprint in your project can be even smaller. By importing only the SCSS and JavaScript modules you need, you can take advantage of tree-shaking to keep your application lean.

## Modular

Choose only the components you need, or easily include everything in one step.

The SCSS and JavaScript are modularized for flexibility. Refer to the SCSS API for documentation on SCSS modules and the JS API for JavaScript modules.

**Key benefits of modularization:**

- **Customization**: The JavaScript is decoupled from component styling, allowing you to use it independently for custom components (e.g., special popovers, dialogs, etc.).
- **Efficiency**: Choose only the components you need to reduce bundle size and improve performance.

## Configurable and Customizable

This library offers a standardized and flexible approach to configuring both SCSS and JS modules. Once you've learned how to configure one module, the APIs for all others follow a similar pattern.

This library is designed to facilitate the creation of highly customizable themes. The default styles are intentionally minimal to provide a solid foundation for customization. While the defaults are sensible, color is entirely up to you. Begin by adjusting the default palette in the color module, and then fine-tune individual component color settings as needed. This approach aims to address the challenge of creating diverse and distinctive themes that can serve as a foundation for various site designs. The components showcased in the demos demonstrate the default styling. 

Note: This library supports the use of CSS custom properties. Define your custom properties and then pass them as configuration for colors and other elements. Refer to the scss core cssvars module for more information on helper mixins and functions related to custom properties.

## Breakpoint Management System

This library simplifies the process of defining and managing breakpoints in your layout. It provides a flexible framework for defining breakpoints (points where styles should change) and using them in various scenarios:

- **Below the breakpoint:** Use styles intended for smaller screens.
- **Above the breakpoint:** Use styles intended for larger screens.
- **Between breakpoints:** Use styles that adapt to specific screen sizes.

The library also includes helpful utilities for passing breakpoint information to JavaScript. Additionally, a dedicated JavaScript module is available for managing breakpoints dynamically and implementing responsive behaviors.

For in-depth details and examples, please refer to the scss core breakpoint module and the javascript ui breakpoints module.

## Printing

While most components can be printed directly, certain components, such as those with interactive or collapsible elements, may require JavaScript assistance to ensure optimal print output. The JavaScript modules provided offer the necessary mechanisms for managing print behavior in these specific cases.

## Javascript

 Javascript modules are mostly used for static/traditional sites, a Vue specific library is in development that offers the same functionality for Vue apps.








