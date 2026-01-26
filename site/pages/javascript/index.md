---
title: Javascript API
intro: This is the javascript module API documentation
weight: 30
iconClass: fab fa-js
layout: default
---

All JavaScript modules are exported from a single, pre-bundled package entry point: `@ulu/frontend`. This modern approach guarantees module singletons (like settings) work correctly and allows for optimal tree-shaking in consumer applications.

You no longer need to import from individual files. Instead, you can import any function or class directly from the main package:

```javascript
import { dialogInit, Slider, updateSettings } from '@ulu/frontend';
```

While you will only ever import from the main package, the modules are still organized logically into three categories, which is reflected in the navigation menu:

- **Core:** Foundational, cross-cutting logic for the library.
- **UI:** Components and scripts that create interactive user interface elements.
- **Utils:** Helper functions that are used internally but are also exposed for your own custom code.

<div class="callout crop-margins">

The full list of available exports is detailed below.

</div>

<div class="export-map">

{% renderFile "./lib/js/exports.md" %}

</div>

<style>
  .export-map {
    h1 {
      display: none;
    }
  }
</style>