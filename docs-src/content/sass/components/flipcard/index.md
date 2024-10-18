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
    <span class="tag tag--primary"><strong>Variable</strong></span>
  </div>

</div>

  

``` scss
$config: (
  "anim-delay" : 200ms,
  "anim-duration" : 430ms,
  "background-color" : white,
  "background-color-image" : rgba(96, 255, 255, 0.89),
  "background-color-back" : rgb(178, 178, 178),
  "bottom-shadow" : true,
  "border" : 1px solid black,
  "border-color-hover" : black,
  "border-radius" : 6px,
  "control-button-border-focus" : 2px solid blue,
  "icon-color" : pink,
  "icon-color-hover" : aqua,
  "icon-color-image" : aqua,
  "icon-color-image-hover" : pink,
  "image-opacity" : 0.7,
  "padding" : 1.5rem,
  "title-color" : red,
  "title-color-hover" : green,
  "title-color-image" : black,
  "title-color-image-hover" : blue,
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _flipcard.scss
- **Group:** flipcard
- **Type:** variable
- **Lines (comments):** 35-36
- **Lines (code):** 38-59
    </details>
    

#### Todos

- 
    


Module Settings
    
    
  

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
- **Lines (comments):** 61-63
- **Lines (code):** 65-67
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
- **Lines (comments):** 69-71
- **Lines (code):** 73-75
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
- **Lines (comments):** 85-87
- **Lines (code):** 89-261
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
- **Lines (comments):** 77-79
- **Lines (code):** 81-83
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  