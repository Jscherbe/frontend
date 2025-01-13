---
title: Flipcard-grid
sassdocGroupName: flipcard-grid
---


# Flipcard-grid

<div class="type-large">

Creates adaptive (changing at breakpoints)n between items (vertical/horizontal layout)

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
  "gutter" : 1rem,
  "grid-template-columns" : 1fr 1fr,
  "breakpoint" : "small"
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _flipcard-grid.scss
- **Group:** flipcard-grid
- **Type:** variable
- **Lines (comments):** 12-15
- **Lines (code):** 17-22

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|gutter|Dimension|1rem|The gutter between grid items.|
|grid-template-columns|CssValue|1fr 1fr|The size ratio of items in the grid.|

    
  

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
  
- **File:** _flipcard-grid.scss
- **Group:** flipcard-grid
- **Type:** mixin
- **Lines (comments):** 24-26
- **Lines (code):** 28-30

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include ulu.flipcard-grid-set(( "property" : value ));|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Output component stylesheet
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _flipcard-grid.scss
- **Group:** flipcard-grid
- **Type:** mixin
- **Lines (comments):** 40-42
- **Lines (code):** 44-64

</details>

    

#### Examples

      


``` scss
@include ulu.flipcard-grid-styles();
```
  



      

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
  
- **File:** _flipcard-grid.scss
- **Group:** flipcard-grid
- **Type:** function
- **Lines (comments):** 32-34
- **Lines (code):** 36-38

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include ulu.flipcard-grid-get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  