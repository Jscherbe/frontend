---
title: Flipcard
sassdocGroupName: flipcard
---


# Flipcard

Creates adaptive (changing at breakpoints)n between items (vertical/horizontal layout)



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
  "background-color" : white,
  "border" : 1px solid black,
  "border-radius" : 6px,
  "border-color-hover" : black,
  "control-button-border-focus" : 2px solid blue,
  "anim-duration" : 430ms,
  "anim-delay" : 200ms,
  "padding" : 1.5rem,
  "title-color" : red,
  "title-color-hover" : green,
  "icon-color" : pink,
  "icon-color-hover" : aqua,
  "icon-color-image" : aqua,
  "icon-color-image-hover" : pink,
  "title-color-image" : black,
  "title-color-image-hover" : blue,
  "bottom-shadow" : true
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _flipcard.scss
- **Group:** flipcard
- **Type:** variable
- **Lines (comments):** 12-13
- **Lines (code):** 15-33
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
- **File:** _flipcard.scss
- **Group:** flipcard
- **Type:** mixin
- **Lines (comments):** 35-37
- **Lines (code):** 39-41
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  set-sizes() {#mixin-set-sizes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Set sizes map
    
    

    <details>
      <summary>File Information</summary>
- **File:** _flipcard.scss
- **Group:** flipcard
- **Type:** mixin
- **Lines (comments):** 43-45
- **Lines (code):** 47-49
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

  

Prints adaptive spacing component styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _flipcard.scss
- **Group:** flipcard
- **Type:** mixin
- **Lines (comments):** 59-61
- **Lines (code):** 63-234
    </details>
    

#### Examples

      


``` scss
@include ulu.component-adaptive-spacing-styles();
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
- **File:** _flipcard.scss
- **Group:** flipcard
- **Type:** function
- **Lines (comments):** 51-53
- **Lines (code):** 55-57
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  