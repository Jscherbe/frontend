---
title: Slider
sassdocGroupName: slider
---


# Slider





## Variables




<div class="sassdoc-item-header">

###  $config {#variable-config}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span>
  </div>

</div>

  

Module Settings
    
    

``` scss
$config: (
  "background-color" : transparent,
  "margin-top" : 1rem,
  "margin-bottom" : 3rem,
  "padding-top" : 0,
  "padding-top-small" : 0,
  "padding-bottom" : 0,
  "padding-bottom-small" : 0,
  "button-size" : 3rem,
  "button-size-small" : false,
  "button-font-size" : 1.35rem,
  "button-font-size-small" : false,
  "button-color" : color.get("link"),
  "button-border" : 2px solid color.get("link"),
  "button-border-radius" : 50%,
  "button-background-color" : transparent,
  "button-color-hover" : white,
  "button-border-color-hover" :  color.get("link:hover"),
  "button-background-color-hover" : color.get("link:hover"),
  "button-icon-offset-x" : false,
  "button-icon-offset-y" : false,
  "button-margin" : 0.75rem,
  "button-margin-small" : 0.75rem,
  "dot-size" :  1rem,
  "dot-border-radius" : 50%,
  "dot-background-color" : transparent,
  "dot-border-width" : 2px,
  "dot-border-color" : color.get("link"),
  "dot-border-color-hover" : color.get("link"),
  "dot-background-color-hover" : color.get("link"),
  "dot-background-color-selected" : color.get("link"),
  "dot-border-color-selected" : color.get("link"),
  "breakpoint" : "small"
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _slider.scss
- **Group:** slider
- **Type:** variable
- **Lines (comments):** 12-13
- **Lines (code):** 15-48
    </details>
    

#### Todos

- 
    
  

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
- **File:** _slider.scss
- **Group:** slider
- **Type:** mixin
- **Lines (comments):** 50-53
- **Lines (code):** 55-57
    </details>
    

#### Examples

General example, replace module-name with module's name      


``` scss
@include module-name.set(( "property" : value ));
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints modal component styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _slider.scss
- **Group:** slider
- **Type:** mixin
- **Lines (comments):** 67-69
- **Lines (code):** 71-191
    </details>
    

#### Examples

      


``` scss
@include ulu.component-slider-styles();
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
- **File:** _slider.scss
- **Group:** slider
- **Type:** function
- **Lines (comments):** 59-61
- **Lines (code):** 63-65
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  