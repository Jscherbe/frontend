---
title: Adaptive-spacing
sassdocGroupName: adaptive-spacing
---


# Adaptive-spacing

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
  "sizes" : (
    "small" : (
      "default" : 2rem,
      "medium" : 4rem
    ),
    "large" : (
      "default" : 4rem,
      "medium" : 8rem
    )
  ),
  outputMargin: false,
  outputPadding: true,
  outputX: true,
  outputY: true,
  selectorX: "sides",
  selectorY: "ends"
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _adaptive-spacing.scss
- **Group:** adaptive-spacing
- **Type:** variable
- **Lines (comments):** 12-13
- **Lines (code):** 15-32
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
- **File:** _adaptive-spacing.scss
- **Group:** adaptive-spacing
- **Type:** mixin
- **Lines (comments):** 34-36
- **Lines (code):** 38-40
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
- **File:** _adaptive-spacing.scss
- **Group:** adaptive-spacing
- **Type:** mixin
- **Lines (comments):** 50-52
- **Lines (code):** 54-84
    </details>
    

#### Examples

      


``` scss
@include ulu.component-adaptive-spacing-styles();
```
  

      

#### Require

- [get()](/sass/components/accordion/#function-get)
- [$config](/sass/components/accordion/#variable-config)
  
  

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
- **File:** _adaptive-spacing.scss
- **Group:** adaptive-spacing
- **Type:** function
- **Lines (comments):** 42-44
- **Lines (code):** 46-48
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  