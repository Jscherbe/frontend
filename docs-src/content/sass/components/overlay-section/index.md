---
title: Overlay-section
sassdocGroupName: overlay-section
---


# Overlay-section

<div class="type-large">



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
  "content-background-color" : white,
  "content-border" : 1px solid rgb(227, 227, 227),
  "content-padding" : 2.5rem,
  "content-width" : 34rem,
  "min-height" : 75vh,
  "padding" : 6rem,
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
- **Group:** overlay-section
- **Type:** variable
- **Lines (comments):** 13-21
- **Lines (code):** 23-41

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|content-background-color|Color|white|The background color of the content.|
|content-border|CssValue|1px solid rgb(227, 227, 227)|The border of the content|
|content-padding|Dimension|2.5rem|The padding of the content.|
|content-width|Dimension|34rem|The width of the content.|
|min-height|Dimension|75vh|the min-height of the section.|
|padding|Dimension|6rem|The padding of the container.|
|breakpoints|Map|Map|The breakpoints of the section.|

    
  

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
  
- **File:** _overlay-section.scss
- **Group:** overlay-section
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

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints component styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _overlay-section.scss
- **Group:** overlay-section
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
  
- **File:** _overlay-section.scss
- **Group:** overlay-section
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
  
  
  