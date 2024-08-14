---
title: Placeholder-block
sassdocGroupName: placeholder-block
---


# Placeholder-block





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
  "color" : true,
  "background-color" : rgba(0,0,0,0.15),
  "border-width" : 2px,
  "border-width-compact" : 1px,
  "border-style" : dashed,
  "border-color" : rgba(0,0,0,0.3),
  "padding" : 2em,
  "padding-compact" : (0.5em 1em),
  "icon-font-size" : 3em,
  "icon-margin" : 0.25em,
  "icon-color" : rgba(0, 0, 0, 0.5),
  "border-radius" : true,
  "margin-bottom" : true,
  "expanded-height" : 15rem
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _placeholder-block.scss
- **Group:** placeholder-block
- **Type:** variable
- **Lines (comments):** 29-30
- **Lines (code):** 32-47
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
- **File:** _placeholder-block.scss
- **Group:** placeholder-block
- **Type:** mixin
- **Lines (comments):** 50-52
- **Lines (code):** 54-56
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
- **File:** _placeholder-block.scss
- **Group:** placeholder-block
- **Type:** mixin
- **Lines (comments):** 67-69
- **Lines (code):** 71-101
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
- **File:** _placeholder-block.scss
- **Group:** placeholder-block
- **Type:** function
- **Lines (comments):** 58-60
- **Lines (code):** 62-65
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  