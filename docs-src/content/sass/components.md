---
title: Components
weight: 20
layout: default
intro: The component styles are the middle of the stylesheet. They inherit from base as needed and can be overridden by site specific styles and helper styles provided by this library.
---

All component module styles can be printed individually or by the root/index module styles mixin (ie. `ulu.component-styles()`). 
Alternatively, for convenience in setting up stylesheets it also provides a module to print it's styles out directly

In your stylesheet to print these styles without calling the mixin yourself you can use the following module. This is handy for creating the main stylesheet with just @use since mixins have to be called after @use statements.

```scss
@use "@ulu/frontend/scss/stylesheets/components-stylesheet";
```