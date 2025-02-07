---
title: Callout
sassdocGroupName: callout
---


# Callout

<div class="type-large">

A container for content that highlights important information, provides context, or guides user attention within an interface

</div>



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
- **Lines (comments):** 85-88
- **Lines (code):** 90-92

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
- **Lines (comments):** 104-106
- **Lines (code):** 108-110

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes (options for style include [background-color, color, border, border-radius, border-color, box-shadow, padding, left-cap, left-cap-width, left-cap-color]|
|$merge-mode|`String`|Merge mode see utils.map-merge() [null|"deep"|"overwrite"]|

    

#### Require

- $styles
  


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
- **Lines (comments):** 128-130
- **Lines (code):** 132-168

</details>

    

#### Examples

      


``` scss
@include ulu.component-callout-styles();
```
  



      

#### Require

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
- **Lines (comments):** 94-97
- **Lines (code):** 99-102

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
  
  

## CSS




<div class="sassdoc-item-header">

###  // Did we decide to get rid of the callout fallback function? If not, how do I get rule width for cap height/width
//   remove it and use border-width and border-color
// how to get padding-left regardless of callout config for padding
//    get-spacing-left($value)

$config: (
  "background-color" : "callout-background",
  "border" : true,
  "border-width" : 1px,
  "border-color" : true,
  "border-radius" :  true,
  "box-shadow" : none,
  "left-cap" : false,
  "left-cap-color" : "callout-foreground",
  "left-cap-width" : 0.5rem,
  "margin" : 2rem,
  "padding" : 1.5rem,
) !default;

$styles: (
  "outline" : (
    "background-color": transparent
  ),
  "informative" : (
    "background-color" : "callout-info-background",
    "left-cap-color" : "callout-info-foreground",
    "left-cap" : true,
  ),
  "warning" : (
    "background-color" : "callout-info-background",
    "left-cap-color" : "callout-info-foreground",
    "left-cap" : true,
  ),
  "success" : (
    "background-color" : "callout-success-background",
    "left-cap-color" : "callout-success-foreground",
    "left-cap" : true,
  ),
  "danger" : (
    "background-color" : "callout-danger-background",
    "left-cap-color" : "callout-danger-foreground",
    "left-cap" : true,
    "left-cap-width": 0.5rem
  ),
) !default;

/// Change modules $config
/// @param {#css-// Did we decide to get rid of the callout fallback function? If not, how do I get rule width for cap height/width
//   remove it and use border-width and border-color
// how to get padding-left regardless of callout config for padding
//    get-spacing-left($value)

$config: (
  "background-color" : "callout-background",
  "border" : true,
  "border-width" : 1px,
  "border-color" : true,
  "border-radius" :  true,
  "box-shadow" : none,
  "left-cap" : false,
  "left-cap-color" : "callout-foreground",
  "left-cap-width" : 0.5rem,
  "margin" : 2rem,
  "padding" : 1.5rem,
) !default;

$styles: (
  "outline" : (
    "background-color": transparent
  ),
  "informative" : (
    "background-color" : "callout-info-background",
    "left-cap-color" : "callout-info-foreground",
    "left-cap" : true,
  ),
  "warning" : (
    "background-color" : "callout-info-background",
    "left-cap-color" : "callout-info-foreground",
    "left-cap" : true,
  ),
  "success" : (
    "background-color" : "callout-success-background",
    "left-cap-color" : "callout-success-foreground",
    "left-cap" : true,
  ),
  "danger" : (
    "background-color" : "callout-danger-background",
    "left-cap-color" : "callout-danger-foreground",
    "left-cap" : true,
    "left-cap-width": 0.5rem
  ),
) !default;

/// Change modules $config
/// @param}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Css</strong></span>
  </div>

</div>

  

Module Settings
    
    

``` scss
{
  Map
 }
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _callout.scss
- **Group:** callout
- **Type:** css
- **Lines (comments):** 27-37
- **Lines (code):** 86-168

</details>

    
  
  