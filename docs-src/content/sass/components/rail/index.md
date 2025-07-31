---
title: Rail
sassdocGroupName: rail
---


# Rail

<div class="type-large">

A horizontal, flexible container for arranging diverse inline elements.
It provides a consistent layout for icons, labels, buttons, or other
modular components, aligning content to either end or centering it.

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
  "align-items" : center,
  "nowrap" : true,
  "padding-x" : 0,
  "padding-y" : 0,
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _rail.scss
- **Group:** rail
- **Type:** variable
- **Lines (comments):** 16-22
- **Lines (code):** 24-30

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|gap|Dimension|1em|The space between items in the rail.|
|align-items|CssValue|center|Vertical alignment of items within the rail (e.g., flex-start, center, flex-end).|
|nowrap|Boolean|true|Disables wrapping of items to the next line.|
|padding-x|Dimension|0|Horizontal padding for the rail container.|
|padding-y|Dimension|0|Vertical padding for the rail container.|

    
  

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
- **Lines (comments):** 32-35
- **Lines (code):** 37-39

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
- **Lines (comments):** 50-52
- **Lines (code):** 54-112

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
- **Lines (comments):** 41-44
- **Lines (code):** 46-48

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
  
  
  