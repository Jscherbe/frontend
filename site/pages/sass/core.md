---
title: Core
weight: 0
---

Core modules are root scss modules used like the following where "breakpoint" is 
the core module name.

```scss
@use "@ulu/frontend/scss" as ulu;

@include ulu.breakpoint-min("small") {

}
```
