---
title: Button
sassdocGroupName: button
---


# Button





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
  "icon-margin" : 1em
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _button.scss
- **Group:** button
- **Type:** variable
- **Lines (comments):** 12-14
- **Lines (code):** 16-19
    </details>
    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|icon-margin|Dimension|1em|List of other sizes (large by defualt), each size is a map of (width, font-size)|

    


<div class="sassdoc-item-header">

###  $config {#variable-config-1}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span> <span class="tag"><strong>Type</strong>: Map</span>
  </div>

</div>

  

Module Settings
    
    

``` scss
$config: (
  "content-background-color" : white,
  "content-border" : 1px solid rgb(227, 227, 227),
  "content-width" : 34rem,
  "content-padding" : 2.5rem,
  "padding" : 6rem,
  "min-height" : 75vh,
  "breakpoints" : (
    "medium" : (
      "direction" : "down",
      "padding" : 4rem,
    ),
    "small" : (
      "direction" : "down",
      "padding" : 2rem,
      "content-padding" : 1.5rem
    )
  )
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _overlay-section.scss
- **Group:** button
- **Type:** variable
- **Lines (comments):** 13-21
- **Lines (code):** 23-41
    </details>
    

#### Map Properties


|Name|Type|Default|
|:--|:--|:--|
|content-background-color|Map|white|
|content-border|Map|1px solid rgb(227, 227, 227)|
|content-width|Map|34rem|
|content-padding|Map|2.5rem|
|padding|Map|6rem|
|min-height|Map|75vh|
|breakpoints|Map|Map|

    
  

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
- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 21-23
- **Lines (code):** 25-27
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

  

Prints button component styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 37-41
- **Lines (code):** 43-100
    </details>
    

#### Examples

      


``` scss
@include ulu.component-button-styles();
```
  

      

      


``` html
<a class="button" href="#">Button Default</a>
```
  

      

#### Require

- [get()](/sass/components/accordion/#function-get)
- [$sizes](/sass/components/adaptive-spacing/#variable-sizes)
  


<div class="sassdoc-item-header">

###  set() {#mixin-set-1}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Change modules $config
    
    

    <details>
      <summary>File Information</summary>
- **File:** _overlay-section.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 43-45
- **Lines (code):** 47-49
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles-1}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints component styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _overlay-section.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 59-61
- **Lines (code):** 63-120
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
- **File:** _button.scss
- **Group:** button
- **Type:** function
- **Lines (comments):** 29-31
- **Lines (code):** 33-35
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  get() {#function-get-1}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Get a config option
    
    

    <details>
      <summary>File Information</summary>
- **File:** _overlay-section.scss
- **Group:** button
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
  
  
  