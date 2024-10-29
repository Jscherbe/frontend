---
title: Grid
sassdocGroupName: grid
---


# Grid

Layout grid that uses attributes instead of classes
- See the core layout module for changing defaults



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
  "attribute":          "data-grid",
  "attribute-container" : "data-grid-container",
  "breakpoint" :        false, // Fallback to default
  "columns":            12,
  "gutter":             14px,
  "position-class-column-first": "position-column-first",
  "position-class-column-last":  "position-column-last",
  "position-class-row-first":    "position-row-first",
  "position-class-row-last":     "position-row-last",
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
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _grid.scss
- **Group:** grid
- **Type:** variable
- **Lines (comments):** 32-43
- **Lines (code):** 45-65

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|attribute|String|"data-grid"|Default attribute to use for grid mixin|
|attribute-container|String|"data-grid-container"||
|breakpoint|CssValue|false||
|columns|Number|12|Default for grid mixin|
|gutter|Number|14px|Default gutter for grid mixin|
|position-class-column-first|String|"position-column-first"|Classname for position system (JS) grid uses to display rules (layout can flow, script will update classes)|
|position-class-column-last|String|"position-column-last"|See definition above|
|position-class-row-first|String|"position-row-first"|See definition above|
|position-class-row-last|String|"position-row-last"|See definition above|
|extra-breakpoints|Map|Map|Default extra breakpoints for grid mixin|

    
  

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
  
- **File:** _grid.scss
- **Group:** grid
- **Type:** mixin
- **Lines (comments):** 67-70
- **Lines (code):** 72-74

</details>

    

#### Examples

      


``` scss
@include module-name.set(( "property" : value ));
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$config](/sass/core/breakpoint/#variable-config)
  


<div class="sassdoc-item-header">

###  create() {#mixin-create}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Creates grid css (variation of original data-grid)
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _grid.scss
- **Group:** grid
- **Type:** mixin
- **Lines (comments):** 109-118
- **Lines (code):** 120-553

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

- [get()](/sass/core/breakpoint/#function-get)
- require-map-get()
  
  

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
  
- **File:** _grid.scss
- **Group:** grid
- **Type:** function
- **Lines (comments):** 76-79
- **Lines (code):** 81-83

</details>

    

#### Examples

      


``` scss
@include module-name.get("property");
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- require-map-get()
- [$config](/sass/core/breakpoint/#variable-config)
  


<div class="sassdoc-item-header">

###  get-gutter() {#function-get-gutter}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Returns gutter size for grid breakpoint map, defaults to the config's values
Pass custom map to get gutter values from it
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _grid.scss
- **Group:** grid
- **Type:** function
- **Lines (comments):** 85-88
- **Lines (code):** 90-98

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|The name of the "grid breakpoint" (could be a different name than the actual breakpoint name it maps too)|
|$custom-map|`Map`|Provide custom map of grid breakpoints to get the gutter from (defaults to the grid module's defaults 'extra-breakpoints')|

    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
- require-map-get()
  
  
  