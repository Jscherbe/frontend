---
title: Tile-button
sassdocGroupName: tile-button
---


# Tile-button

Button to be used withing tile-grid. Used with button classes.



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
  "padding" : (1em 0.5em),
  "border-radius" : true,
  "line-height" : true,
  "row-margin" : 0.5em,
  "icon-opacity" : 0.5,
  "icon-font-size" : 1.5em,
  "icon-margin" : 1em,
  "description-size" : "small-x"
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _tile-button.scss
- **Group:** tile-button
- **Type:** variable
- **Lines (comments):** 26-27
- **Lines (code):** 29-38
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
- **File:** _tile-button.scss
- **Group:** tile-button
- **Type:** mixin
- **Lines (comments):** 40-42
- **Lines (code):** 44-46
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

  

Prints component styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _tile-button.scss
- **Group:** tile-button
- **Type:** mixin
- **Lines (comments):** 57-59
- **Lines (code):** 61-101
    </details>
    

#### Examples

      


``` scss
@include ulu.component-example-styles();
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
- **File:** _tile-button.scss
- **Group:** tile-button
- **Type:** function
- **Lines (comments):** 48-50
- **Lines (code):** 52-55
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  