---
title: Data-grid
sassdocGroupName: data-grid
---


# Data-grid





## Variables




<div class="sassdoc-item-header">

###  $config {#variable-config}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span> <span class="tag"><strong>Type</strong>: Map</span>
  </div>

</div>

  

Module Settings
    
    

``` scss
$config: (
  "columns":            12,
  "attribute":          "data-grid",
  "attribute-container" : "data-grid-container",
  "gutter":             14px,
  "breakpoint" :        false, // Fallback to default
  "extra-breakpoints" : (
    "medium" : (
      "breakpoint" : "medium",
      "gutter" : 15px
    ),
    "large" : (
      "breakpoint" : "large",
      "gutter" : 20px
    )
  ),
  "position-class-column-first": "position-column-first",
  "position-class-column-last":  "position-column-last",
  "position-class-row-first":    "position-row-first",
  "position-class-row-last":     "position-row-last",
  "background-color":              white,
  "background-color-open":          #F7F8F7,
  "padding-x":                      1.5rem,
  "padding-y":                      1.5rem,
  "transparent-padding-y":          0.5rem,
  "transparent-padding-x":          0,
  "margin":                         3rem,
  "margin-between":                 0,
  "border-radius":                  0,
  "box-shadow":                     none,
  "border-color":                   color.get("rule"),
  "border":                         1px solid color.get("rule"),
  "summary-color":                  inherit,
  "summary-type-size" :             false,
  "summary-color-hover":            inherit,
  "summary-padding-y":              1rem,
  "summary-background-color":     white,
  "summary-line-height":            inherit,
  "icon-color":                     color.get("link"),
  "icon-color-hover":               color.get("link:hover"),
  "icon-background-color" :         transparent,
  "icon-background-color-hover" :   transparent,
  "icon-border-radius" :            50%,
  "icon-size" :                     auto,
  "icon-font-size" :                1.5rem
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _data-grid.scss
- **Group:** data-grid
- **Type:** variable
- **Lines (comments):** 22-31
- **Lines (code):** 33-80
    </details>
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.columns|Number|Default for grid mixin|
|$config.attribute|String|Default attribute to use for grid mixin|
|$config.gutter|Number|Default gutter for grid mixin|
|$config.extra-breakpoints|Map|Default extra breakpoints for grid mixin|
|$config.position-class-column-first|MaStringp|Classname for position system (JS) grid uses to display rules (layout can flow, script will update classes)|
|$config.position-class-column-last|String|See definition above|
|$config.position-class-row-first|String|See definition above|
|$config.position-class-row-last|String|See definition above|

    
  

## Mixins




<div class="sassdoc-item-header">

###  set() {#mixin-set}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Change modules $config
    
    

    <details>
      <summary>File Information</summary>
- **File:** _data-grid.scss
- **Group:** data-grid
- **Type:** mixin
- **Lines (comments):** 83-85
- **Lines (code):** 87-89
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  create() {#mixin-create}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Creates grid css (variation of original data-grid)
    
    

    <details>
      <summary>File Information</summary>
- **File:** _data-grid.scss
- **Group:** data-grid
- **Type:** mixin
- **Lines (comments):** 122-131
- **Lines (code):** 133-566
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$columns|`Number`|Columns in grid|
|$breakpoint|`Number`|Breakpoint key for starting the grid|
|$extra-breakpoints|`Map`|Map with other breakpoints to add (map of breakpoint and gutter see config.extra-breakpoints for an example (smalles to largest)|
|$gutter|`Number`|Size in pixels for the gutters|
|$include-rules|`Boolean`|Print styles for including rules|
|$rule-size|`Number`|Size of the rule (border/seperator)|
|$extra-rule-styles|`Map`|Map of other rule styles to add (map of maps of size, and color), key is the styles name ("name": ("size" : 4px, "color" : "color name" || color))|
|$extra-gutter-scales|`String`|A map of gutter scales used like `data-grid="gutter-scale: large`, configuration map property becomes scale name and value is the amount (multiplier) to apply to the grid's gutter ie `( "large" : 2.25 )`|
|$attribute|`Map`|Attribute to use for selecting grid and children. Children attribute get's "-item" as a suffix ("ie. data-grid, data-grid-item")|

    

#### Require

- [get()](/sass/components/accordion/#function-get)
  
  

## Functions




<div class="sassdoc-item-header">

###  get() {#function-get}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Get a config option
    
    

    <details>
      <summary>File Information</summary>
- **File:** _data-grid.scss
- **Group:** data-grid
- **Type:** function
- **Lines (comments):** 91-93
- **Lines (code):** 95-97
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  get-gutter() {#function-get-gutter}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Prints component styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _data-grid.scss
- **Group:** data-grid
- **Type:** function
- **Lines (comments):** 99-101
- **Lines (code):** 103-111
    </details>
    

#### Examples

      


``` scss
@include ulu.component-example-styles();
```
  

      

#### Require

- [get()](/sass/components/accordion/#function-get)
  
  
  