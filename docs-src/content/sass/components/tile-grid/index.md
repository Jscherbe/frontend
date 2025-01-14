---
title: Tile-grid
sassdocGroupName: tile-grid
---


# Tile-grid

<div class="type-large">

Creates a CSS grid with items that have matching aspect ratios. Reflows to fit as many items as can be fit withing current grid's width by default. Allows passing static styles to create fixed number of columns per row. Static styles are set adaptively and can adjust the number of columns at different breakpoints.

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
  "aspect-ratio" : list.slash(4, 3),
  "gap" : 1rem,
  "width" : 10em,
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
|aspect-ratio|CssValue|list.slash(4, 3)||
|gap|Number|1rem|The gap for the tile grid.|
|width|Number|10em||

    


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
  ),
  "static-wide" : (
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
  )
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _tile-grid.scss
- **Group:** tile-grid
- **Type:** variable
- **Lines (comments):** 36-37
- **Lines (code):** 39-69

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
- **Lines (comments):** 71-74
- **Lines (code):** 76-78

</details>

    

#### Examples

      


``` scss
@include ulu.component-tile-grid-set(( "property" : value ));
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

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
- **Lines (comments):** 80-82
- **Lines (code):** 84-86

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
- **Lines (comments):** 88-90
- **Lines (code):** 92-94

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

  

Output component stylesheet
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _tile-grid.scss
- **Group:** tile-grid
- **Type:** mixin
- **Lines (comments):** 105-107
- **Lines (code):** 109-171

</details>

    

#### Examples

      


``` scss
@include ulu.component-tile-grid-styles();
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
- **Lines (comments):** 96-99
- **Lines (code):** 101-103

</details>

    

#### Examples

      


``` scss
@include ulu.component-tile-grid-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  