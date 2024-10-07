---
title: Tile-grid
sassdocGroupName: tile-grid
---


# Tile-grid

Creates a CSS grid with items that have matching aspect ratios. Reflows to fit as many items as can be fit withing current grid's width by default. Allows passing static styles to create fixed number of columns per row. Static styles are set adaptively and can adjust the number of columns at different breakpoints.



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
  "gap" : 1rem,
  "width" : 10em,
  "aspect-ratio" : list.slash(4, 3)
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _tile-grid.scss
- **Group:** tile-grid
- **Type:** variable
- **Lines (comments):** 14-18
- **Lines (code):** 20-24
    </details>
    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|gap|Number|1rem|The gap for the tile grid.|
|width|Number|10em||
|aspect-ratio|CssValue|list.slash(4, 3)||

    


<div class="sassdoc-item-header">

###  $sizes {#variable-sizes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span> <span class="tag"><strong>Type</strong>: Map</span>
  </div>

</div>

  

Alternate Sizes for reflowable grid
- Map of preferred width for columns and optional aspect-ratio for item
    
    

``` scss
$sizes: (
  "large" : (
    "width" : 20em,
  )
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _tile-grid.scss
- **Group:** tile-grid
- **Type:** variable
- **Lines (comments):** 26-28
- **Lines (code):** 30-34
    </details>
    


<div class="sassdoc-item-header">

###  $static-sizes {#variable-static-sizes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span> <span class="tag"><strong>Type</strong>: Map</span>
  </div>

</div>

  

Static grid width styles
    
    

``` scss
$static-sizes: (
  "static" : (
    "default" : (
      "columns" : 1,
      "gap" : null,
      "aspect-ratio" : list.slash(4, 3)
    ),
    "small" : (
      "direction" : "min",
      "columns" : 2,
      "gap" : null,
    ),
    "medium" : (
      "direction" : "min",
      "columns" : 3,
      "gap" : null,
    ),
  )
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _tile-grid.scss
- **Group:** tile-grid
- **Type:** variable
- **Lines (comments):** 36-37
- **Lines (code):** 39-57
    </details>
    
  

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
- **File:** _tile-grid.scss
- **Group:** tile-grid
- **Type:** mixin
- **Lines (comments):** 59-61
- **Lines (code):** 63-65
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  set-static() {#mixin-set-static}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Set fixed sizes map
    
    

    <details>
      <summary>File Information</summary>
- **File:** _tile-grid.scss
- **Group:** tile-grid
- **Type:** mixin
- **Lines (comments):** 67-69
- **Lines (code):** 71-73
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|
|$merge-mode|`String`|Merge mode see utils.map-merge() [null|"deep"|"overwrite"]|

    

#### Require

- [$static-sizes](/sass/components/tile-grid/#variable-static-sizes)
  


<div class="sassdoc-item-header">

###  set-sizes() {#mixin-set-sizes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Set sizes map
    
    

    <details>
      <summary>File Information</summary>
- **File:** _tile-grid.scss
- **Group:** tile-grid
- **Type:** mixin
- **Lines (comments):** 75-77
- **Lines (code):** 79-81
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|
|$merge-mode|`String`|Merge mode see utils.map-merge() [null|"deep"|"overwrite"]|

    

#### Require

- [$sizes](/sass/components/adaptive-spacing/#variable-sizes)
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints component styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _tile-grid.scss
- **Group:** tile-grid
- **Type:** mixin
- **Lines (comments):** 91-93
- **Lines (code):** 95-157
    </details>
    

#### Examples

      


``` scss
@include ulu.component-example-styles();
```
  

      

#### Require

- [get()](/sass/components/accordion/#function-get)
- [$sizes](/sass/components/adaptive-spacing/#variable-sizes)
- [$static-sizes](/sass/components/tile-grid/#variable-static-sizes)
  
  

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
- **File:** _tile-grid.scss
- **Group:** tile-grid
- **Type:** function
- **Lines (comments):** 83-85
- **Lines (code):** 87-89
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  