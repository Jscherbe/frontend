---
title: Css-icon
sassdocGroupName: css-icon
---


# Css-icon

Simple icons that are made from pseudo elements



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
  "size" : 1em,
  "stroke-width" : 0.2em,
  "color" : currentColor,
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _css-icon.scss
- **Group:** css-icon
- **Type:** variable
- **Lines (comments):** 11-12
- **Lines (code):** 14-18
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
- **File:** _css-icon.scss
- **Group:** css-icon
- **Type:** mixin
- **Lines (comments):** 20-22
- **Lines (code):** 24-26
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

  

Prints adaptive spacing component styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _css-icon.scss
- **Group:** css-icon
- **Type:** mixin
- **Lines (comments):** 36-38
- **Lines (code):** 40-47
    </details>
    

#### Examples

      


``` scss
@include ulu.component-example-styles();
```
  

      

#### Require

- [close-icon()](/sass/components/css-icon/#mixin-close-icon)
- [drag-icon()](/sass/components/css-icon/#mixin-drag-icon)
  


<div class="sassdoc-item-header">

###  drag-icon() {#mixin-drag-icon}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Create a drag icon
    
    

    <details>
      <summary>File Information</summary>
- **File:** _css-icon.scss
- **Group:** css-icon
- **Type:** mixin
- **Lines (comments):** 49-52
- **Lines (code):** 53-79
    </details>
    

#### Parameters


|Name|Type|
|:--|:--|
|$size|`Number`|
|$stroke-width|`Number`|
|$color|`Number`|

    


<div class="sassdoc-item-header">

###  close-icon() {#mixin-close-icon}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Create a close icon
    
    

    <details>
      <summary>File Information</summary>
- **File:** _css-icon.scss
- **Group:** css-icon
- **Type:** mixin
- **Lines (comments):** 81-84
- **Lines (code):** 85-114
    </details>
    

#### Parameters


|Name|Type|
|:--|:--|
|$size|`Number`|
|$stroke-width|`Number`|
|$color|`Number`|

    
  

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
- **File:** _css-icon.scss
- **Group:** css-icon
- **Type:** function
- **Lines (comments):** 28-30
- **Lines (code):** 32-34
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  