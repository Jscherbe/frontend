---
title: Callout
sassdocGroupName: callout
---


# Callout

<div class="type-large">

A container for content that highlights important information, provides context, or guides user attention within an interface

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
- **Lines (comments):** 27-37
- **Lines (code):** 39-49

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
- **Lines (comments):** 95-98
- **Lines (code):** 100-102

</details>

    

#### Examples

      


``` scss
@include ulu.component-callout-set(( "property" : value ));
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  set-styles() {#mixin-set-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Set callout style variations
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _callout.scss
- **Group:** callout
- **Type:** mixin
- **Lines (comments):** 114-116
- **Lines (code):** 118-120

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes (options for style include [background-color, color, border, border-radius, border-color, box-shadow, padding, left-cap, left-cap-width, left-cap-color]|
|$merge-mode|`String`|Merge mode see utils.map-merge() [null|"deep"|"overwrite"]|

    

#### Require

- $styles
  


<div class="sassdoc-item-header">

###  left-cap() {#mixin-left-cap}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Output styling for a callout that adds a left cap
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _callout.scss
- **Group:** callout
- **Type:** mixin
- **Lines (comments):** 122-124
- **Lines (code):** 126-139

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$width|`Dimension`|The width of the left cap|
|$color|`Color`|The left cap color|

    

#### Require

- [get()](/sass/components/accordion/#function-get)
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Output component stylesheet
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _callout.scss
- **Group:** callout
- **Type:** mixin
- **Lines (comments):** 141-143
- **Lines (code):** 145-176

</details>

    

#### Examples

      


``` scss
@include ulu.component-callout-styles();
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
- **Lines (comments):** 104-107
- **Lines (code):** 109-112

</details>

    

#### Examples

      


``` scss
@include ulu.component-callout-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  