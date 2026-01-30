---
title: Base
weight: 10
layout: default
intro: The base styles are the styles that go at the top of the stylesheet.
---

All base module styles can be printed individually or by the root/index module styles mixin (ie. `ulu.base-styles()`). 
Alternatively, for convenience in setting up stylesheets it also provides a module to print it's styles out directly

In your stylesheet to print these styles without calling the mixin yourself you can use the following module. This is handy for creating the main stylesheet with just @use since mixins have to be called after @use statements.

```scss
@use "@ulu/frontend/scss/stylesheets/base-stylesheet";
```