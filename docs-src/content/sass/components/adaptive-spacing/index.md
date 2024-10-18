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
- **Lines (comments):** 12-19
- **Lines (code):** 21-29
    </details>
    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|outputMargin|Boolean|false|@joe-check need examples for this to build documentation|
|outputPadding|Boolean|true|This is the background color of the accordion before it is expanded.|
|outputX|Boolean|true|This is the background color of the accordion before it is expanded.|
|outputY|Boolean|true|This is the background color of the accordion before it is expanded.|
|selectorX|Boolean|"sides"|This is the background color of the accordion before it is expanded.|
|selectorY|Boolean|"ends"|This is the background color of the accordion before it is expanded.|

    


<div class="sassdoc-item-header">

###  $sizes {#variable-sizes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span> <span class="tag"><strong>Type</strong>: Map</span>
  </div>

</div>

  

Sizes Map
    
    

``` scss
$sizes: (
  "small" : (
    "initial" : (
      "size" : 2rem
    ),
    "medium" : (
      "direction" : "min",
      "size": 4rem
    )
  ),
  "large" : (
    "initial" : (
      "size" : 4rem
    ),
    "medium" : (
      "direction" : "min",
      "size" : 8rem
    ),
  )
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _adaptive-spacing.scss
- **Group:** adaptive-spacing
- **Type:** variable
- **Lines (comments):** 31-32
- **Lines (code):** 34-53
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
- **Lines (comments):** 55-57
- **Lines (code):** 59-61
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
- **File:** _adaptive-spacing.scss
- **Group:** adaptive-spacing
- **Type:** mixin
- **Lines (comments):** 63-65
- **Lines (code):** 67-69
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
- **File:** _adaptive-spacing.scss
- **Group:** adaptive-spacing
- **Type:** mixin
- **Lines (comments):** 79-81
- **Lines (code):** 83-115
    </details>
    

#### Examples

      


``` scss
@include ulu.component-adaptive-spacing-styles();
```
  

      

#### Require

- [get()](/sass/components/accordion/#function-get)
- [$config](/sass/components/accordion/#variable-config)
- [$sizes](/sass/components/adaptive-spacing/#variable-sizes)
  
  

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
- **Lines (comments):** 71-73
- **Lines (code):** 75-77
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  