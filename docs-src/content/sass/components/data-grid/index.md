---
title: Data-grid
sassdocGroupName: data-grid
---


# Data-grid

<div class="type-large">

A page grid layout component that uses data attribute instead of class names, for brevity and readability

</div>



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
  "attribute":           "data-grid",
  "attribute-container": "data-grid-container",
  "breakpoint":          false,                   // Fallback to default
  "columns":             12,
  "gutter":              14px,
  "position-class-column-first": "position-column-first",
  "position-class-column-last":  "position-column-last",
  "position-class-row-first":    "position-row-first",
  "position-class-row-last":     "position-row-last",
  "sticky-bottom":               var(--ulu-sticky-bottom-offset, 0),
  "sticky-top":                  var(--ulu-sticky-top-offset, 0),
  "rule-color" : "rule",
  "rule-size" : 1px,
  "extra-breakpoints":   (
    "medium" : (
      "breakpoint": "medium",
      "gutter":     15px
    ),
    "large" : (
      "breakpoint": "large",
      "gutter":     20px
    )
  ),
  "extra-gutter-scales" : (
    "small": 0.6
  ),
  "extra-rule-styles" : (
    "light" : (
      "size" : 1px,
      "color": "rule-light"
    )
  ),
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _data-grid.scss
- **Group:** data-grid
- **Type:** variable
- **Lines (comments):** 20-36
- **Lines (code):** 38-71

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|attribute|String|data-grid|Default attribute to use for grid mixin.|
|attribute-container|String|data-grid-container|Default attribute to use for grid's container.|
|columns|Number|12|Default for grid mixin.|
|gutter|Number|14px|Default gutter for grid mixin.|
|position-class-column-first|String|position-column-first|Classname for position system (JS) grid uses to display rules (layout can flow, script will update classes)|
|position-class-column-last|String|position-column-last|See definition above|
|position-class-row-first|String|position-row-first|See definition above|
|position-class-row-last|String|position-row-last|See definition above|
|sticky-bottom|Map|var(--ulu-sticky-bottom-offset, 0)|@joe-check do we want to call these a dimension?|
|sticky-top|Map|var(--ulu-sticky-top-offset, 0)||
|rule-color|String|"rule"|The color of the rule. This uses color.scss, so the value of this option should be a color variable from color.scss.|
|rule-size|Dimension|1px|The width of the rule|
|extra-breakpoints|Map|Map|Default extra breakpoints for grid mixin|
|extra-gutter-scales|Map|Map|Extra options for gutter scales.|
|extra-rule-styles|Map|Map|Extra options for rule styles.|

    
  

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
- **Lines (comments):** 74-76
- **Lines (code):** 78-80

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints default grid styles, if you want to customize further please use the create mixin
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _data-grid.scss
- **Group:** data-grid
- **Type:** mixin
- **Lines (comments):** 113-116
- **Lines (code):** 118-120

</details>

    


<div class="callout callout--demo crop-margins">

#### Demo



<a class="button" href="/demos/data-grid#align">Our Demo</a>

</div>



#### Examples

      


``` scss
@include ulu.component-data-grid-styles();
```
  



      

#### Require

- [create()](/sass/components/data-grid/#mixin-create)
  


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
- **Lines (code):** 133-578

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$columns|`Number`|Columns in grid|
|$breakpoint|`Number`|Breakpoint key for starting the grid|
|$extra-breakpoints|`Map`|Map with other breakpoints to add (map of breakpoint and gutter see config.extra-breakpoints for an example (smallest to largest)|
|$gutter|`Number`|Size in pixels for the gutters|
|$include-rules|`Boolean`|Print styles for including rules|
|$rule-size|`Number`|Size of the rule (border/separator)|
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
- **Lines (comments):** 82-84
- **Lines (code):** 86-88

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
- **Lines (comments):** 90-92
- **Lines (code):** 94-102

</details>

    

#### Examples

      


``` scss
@include ulu.component-example-styles();
```
  



      

#### Require

- [get()](/sass/components/accordion/#function-get)
  
  
  