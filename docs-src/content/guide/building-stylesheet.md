---
title: Building a Stylesheet
---

*Coming Soon: Will have example scaffolding*

Create the following directory structure in your theme. Note add this directory to scss includePaths so that its easy to import your variable and ulu (global namespace `@use "ulu";` and `@use "vars";`)

- scss/
  - base/ (for any custom base styles)
    - _index.scss
    - ...
  - config/ (for ulu configuration, usually one file/module, but its up to you)
    - _index.scss
    - _typography.scss (configure ulu.typography for example)
    - ...
  - components/ (for any custom component styles)
    - _index.scss
    - ...
  - layouts/ (sites layouts, layouts that contain components/elements)
    - _index.scss
    - ...
  - specific/ (for any overriding styles, vendor style overrides [including ulu] can go here)
    - _index.scss
    - ...  
  - _vars.scss (Your custom variables)
  - _ulu.scss (Fill configure using /config/ above and forward global namespace ulu)
  - styles.scss (the stylesheet below)


Example *_ulu.scss* file

```scss
@forward "@ulu/frontend/scss"; 
@use "config";
```

Example *styles.scss*, using @import so that site styles print vs defining mixins for each _index.scss and calling it (that would work). Use @import approach to support legacy scss that's in your theme while using ulu for the overall theme.

```scss
@use "vars";
@use "ulu";
@use "config";

@include ulu.base-styles();
@import "base";

@include ulu.component-styles();
@import "components";
@import "layouts";

@include ulu.helper-styles();
@import "specific";

```

Example */scss/config/_color.scss*, Which shows how to configure each module. Note we are using the global namespace which forwards all modules in the same structure as the directories but using "-". So core modules are the "ulu.color" is /_color.scss modules, and ulu.component-card is /component/_card.scss.

```scss
@use "vars";
@use "@ulu/frontend/scss" as ulu;

@include ulu.color-set((
  "type" :            ulu.cssvar-use("color-type"),
  "type-secondary" :  ulu.cssvar-use("color-type-secondary"),
));
```

