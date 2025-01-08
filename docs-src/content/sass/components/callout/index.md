---
title: Callout
sassdocGroupName: callout
---


# Callout

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
  "background-color" : rgb(240, 240, 240),
  "border" : true,
  "border-radius" :  true,
  "box-shadow" : none,
  "left-cap" : false,
  "left-cap-color" : green,
  "left-cap-width" : 0.5rem,
  "margin" : 2rem,
  "padding" : 1.5rem,
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _callout.scss
- **Group:** callout
- **Type:** variable
- **Lines (comments):** 25-35
- **Lines (code):** 37-47

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|background-color|Color|rgb(240, 240, 240)|The background color of the Callout.|
|border|Boolean|true|The border of the Callout.|
|border-radius|Boolean|true|The border radius of the Callout.|
|box-shadow|CssValue|none|The box-shadow of the Callout.|
|left-cap|Boolean|false|Toggles the use of left caps in styled callouts.|
|left-cap-color|Color|green|Color of the left cap.|
|left-cap-width|Dimension|0.5rem|Width of the left cap.|
|margin|Dimension|2rem|Bottom margin of the Callout.|
|padding|Dimension|1.5rem|Padding of the Callout.|

    
  

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
  
- **File:** _callout.scss
- **Group:** callout
- **Type:** mixin
- **Lines (comments):** 90-92
- **Lines (code):** 94-96

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  set-styles() {#mixin-set-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Set callout styles 
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _callout.scss
- **Group:** callout
- **Type:** mixin
- **Lines (comments):** 107-109
- **Lines (code):** 111-113

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|
|$merge-mode|`String`|Merge mode see utils.map-merge() [null|"deep"|"overwrite"]|

    

#### Require

- $styles
  


<div class="sassdoc-item-header">

###  left-cap() {#mixin-left-cap}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints left-cap styling 
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _callout.scss
- **Group:** callout
- **Type:** mixin
- **Lines (comments):** 115-115
- **Lines (code):** 117-130

</details>

    


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints component styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _callout.scss
- **Group:** callout
- **Type:** mixin
- **Lines (comments):** 132-134
- **Lines (code):** 136-169

</details>

    

#### Examples

      


``` scss
@include ulu.component-example-styles();
```
  



      

#### Require

- [left-cap()](/sass/components/callout/#mixin-left-cap)
- [get()](/sass/components/accordion/#function-get)
- $styles
  
  

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
  
- **File:** _callout.scss
- **Group:** callout
- **Type:** function
- **Lines (comments):** 98-100
- **Lines (code):** 102-105

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  