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
- **Lines (comments):** 78-81
- **Lines (code):** 83-85

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
- Styles that modify padding when using mix-match caps on/off should be included last
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _callout.scss
- **Group:** callout
- **Type:** mixin
- **Lines (comments):** 97-100
- **Lines (code):** 102-104

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes (options for style include [background-color, color, border-color, border-radius, border-width, box-shadow, padding, cap, cap-options]|
|$merge-mode|`String`|Merge mode see utils.map-merge() [null|"deep"|"overwrite"]|

    

#### Require

- [$styles](/sass/components/callout/#variable-styles)
  


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
- **Lines (comments):** 106-108
- **Lines (code):** 110-158

</details>

    

#### Examples

      


``` scss
@include ulu.component-callout-styles();
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
  
- **File:** _callout.scss
- **Group:** callout
- **Type:** function
- **Lines (comments):** 87-90
- **Lines (code):** 92-95

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
  "border-color" : "rule-light",
  "border-radius" :  6px,
  "border-width" : 1px,
  "box-shadow" : none,
  "caps-disabled" : false,
  "cap" : false,
  "cap-side" : "left",
  "cap-match-radius" : false,
  "cap-options" : (
    "color" : rgb(160, 160, 160),
    "size" : 0.5rem,
  ),
  "margin" : 2rem,
  "padding" : 1.5rem,
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _callout.scss
- **Group:** callout
- **Type:** variable
- **Lines (comments):** 23-36
- **Lines (code):** 38-54

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|background-color|Color|rgb(240, 240, 240)|The background color of the Callout.|
|border-color|Color|"rule-light"|The border color of the Callout.|
|border-radius|Boolean|true|The border radius of the Callout.|
|border-width|Dimension|1px|The border width of the Callout.|
|box-shadow|CssValue|none|The box-shadow of the Callout.|
|caps-disabled|Boolean|false|If set will not output any cap styles for both base and styles|
|cap|Boolean|false|Toggles the use of caps on default callout|
|cap-side|Boolean|"left"|The side that gets the cap|
|cap-match-radius|Number|true|The cap should have be rounded to match the parent's border radius|
|cap-options|Map||The options for cap (see element.cap for options)|
|margin|Dimension|2rem|Bottom margin of the Callout.|
|padding|Dimension|1.5rem|Padding of the Callout.|

    


<div class="sassdoc-item-header">

###  $styles {#variable-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span> <span class="tag"><strong>Type</strong>: Map</span>
  </div>

</div>

  

Styles Map (for unique variations/modifiers)
- Adjust this with set-styles
    
    

``` scss
$styles: (
  "outline" : (
    "background-color": transparent
  ),
  "info" : (
    "background-color" : "info-background",
  ),
  "warning" : (
    "background-color" : "info-background",
  ),
  "success" : (
    "background-color" : "success-background",
  ),
  "danger" : (
    "background-color" : "danger-background",
  ),
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _callout.scss
- **Group:** callout
- **Type:** variable
- **Lines (comments):** 56-58
- **Lines (code):** 60-76

</details>

    
  
  