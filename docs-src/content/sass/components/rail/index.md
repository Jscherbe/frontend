---
title: Rail
sassdocGroupName: rail
---


# Rail

<div class="type-large">

A horizontal, flexible container for arranging diverse inline elements.
It provides a consistent layout for icons, labels, buttons, or other
modular components, aligning content to either end or centering it.
Item spacing is controlled via margins, allowing for individual item gap adjustments.

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
  "gap" : 1em,
  "margin-bottom" : 1.5em,
  "separator" : true,
  "gap-modifiers": (
    "small" : 0.5em,
    "none" : 0,
    "large" : 2em
  ),
  "rule-size" : 1px,
  "rule-color" : "rule",
  "rule-margin" : 1em
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _rail.scss
- **Group:** rail
- **Type:** variable
- **Lines (comments):** 28-33
- **Lines (code):** 35-47

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|gap|Dimension|1em|The default space between items in the rail|
|gap-modifiers|Map|("small" : 0.5em, "large" : 2em )|Alternate gaps (use child modifiers .rail__item--gap-[name], these apply gap changes between the item and the item before it|
|margin-bottom|Dimension|1em|The default space after rail|
|separator|CssValue|true|Pass border property for separator, defaults to element rule style light|

    
  

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
  
- **File:** _rail.scss
- **Group:** rail
- **Type:** mixin
- **Lines (comments):** 49-52
- **Lines (code):** 54-56

</details>

    

#### Examples

      


``` scss
@include ulu.component-rail-set(( "gap" : 1.5em ));
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

  

Prints component styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _rail.scss
- **Group:** rail
- **Type:** mixin
- **Lines (comments):** 68-70
- **Lines (code):** 72-127

</details>

    

#### Examples

      


``` scss
@include ulu.component-rail-styles();
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
  
- **File:** _rail.scss
- **Group:** rail
- **Type:** function
- **Lines (comments):** 58-61
- **Lines (code):** 63-66

</details>

    

#### Examples

      


``` scss
@include ulu.component-rail-get("gap");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  