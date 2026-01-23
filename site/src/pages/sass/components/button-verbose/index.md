---
title: Button-verbose
sassdocGroupName: button-verbose
---


# Button-verbose

<div class="type-large">

A button that has additional markup (ie. page with description for example). Used on things like linear pagination (up next).

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
  "background-color" : white,
  "background-color-hover" : #F7F8F7,
  "border-radius" : true,
  "border-color" : null,
  "border-width" : null,
  "box-shadow" : true,
  "box-shadow-hover" : true,
  "color" : "type",
  "color-hover" : "type",
  "icon-color": gray,
  "icon-color-hover": null,
  "icon-font-size" : 1.25rem,
  "line-height" : 1.2,
  "margin" : 1em,
  "margin-inline" : 0.75em,
  "min-width": 20rem,
  "padding-x": 0.75em,
  "padding-y": 1em,
  "title-color": "link",
  "title-margin" : 0.5em,
  "title-color-hover" : "link-hover",
  "cap" : false,
  "cap-side" : "left",
  "cap-match-radius" : true,
  "cap-options" : (
    "color" : "link",
    "size" : 0.5rem,
  ),
  "cap-options-hover" : (
    "color" : "link-hover"
  ),
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _button-verbose.scss
- **Group:** button-verbose
- **Type:** variable
- **Lines (comments):** 39-66
- **Lines (code):** 68-100

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|background-color|Color|white|Background color for the button.|
|background-color-hover|Color|link|Background color for the button when hovered or focused.|
|border-radius|String|border-radius|Border radius of the button.|
|border-width|String|null|Border width (or set to true to inherit button border width default)|
|border-color|String|null|Border color (or set to true to inherit button border width default)|
|box-shadow|CssValue|true|Box shadow for the button. If set to true, uses default box-shadow.|
|box-shadow-hover|CssValue|true|Box shadow for the button when hovered or focused. If set to true, uses default box-shadow-hover.|
|color|String|type|Text color for the button.|
|color-hover|String|type|Text color for the button when hovered or focused.|
|icon-color|Color|gray|Color for button icons.|
|icon-color-hover|Color|null|Optional color for icon when hovered|
|icon-font-size|Dimension|1.25rem|Font size for the button.|
|line-height|Number|1.2|Line height for button text.|
|margin|Dimension|1em|Margin for the button.|
|margin-inline|Dimension|0.75em|Margin for the button when using the inline modifier.|
|min-width|Dimension|20rem|Min-width of the button.|
|padding-x|Dimension|0.65em|Horizontal padding of the button.|
|padding-y|Dimension|1em|Vertical padding of the button.|
|title-color|String|link|Color of the title of the button.|
|title-color-hover|String|link-hover|Color of the title of the button when hovered or focused.|
|title-margin|Dimension|0.5em|Margin for the button's title.|
|cap|Boolean|false|Enable left cap style|
|cap-side|Color|"left"|The side that gets the cap|
|cap-match-radius|Number|true|The cap should have be rounded to match the parent's border radius|
|cap-options|Map||The options for cap (see element.cap for options)|
|cap-options-hover|Map||The options for cap when hovered|

    
  

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
  
- **File:** _button-verbose.scss
- **Group:** button-verbose
- **Type:** mixin
- **Lines (comments):** 102-105
- **Lines (code):** 107-109

</details>

    

#### Examples

      


``` scss
@include ulu.component-button-verbose-set(( "property" : value ));
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
  
- **File:** _button-verbose.scss
- **Group:** button-verbose
- **Type:** mixin
- **Lines (comments):** 121-129
- **Lines (code):** 131-220

</details>

    

#### Examples

      


``` scss
@include ulu.component-button-verbose-styles();
```
  



      

Basic Example      


``` html
<a href="#" class="button-verbose">
  <strong class="button-verbose__title">Example Link</strong>
  <span class="button-verbose__body">This is the body</span>
  <span class="button-verbose__icon fas fa-arrow-right" aria-hidden="true"></span>
</a>
```
  


##### Preview

<div>
<a href="#" class="button-verbose">
  <strong class="button-verbose__title">Example Link</strong>
  <span class="button-verbose__body">This is the body</span>
  <span class="button-verbose__icon fas fa-arrow-right" aria-hidden="true"></span>
</a>
</div>

    

      

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
  
- **File:** _button-verbose.scss
- **Group:** button-verbose
- **Type:** function
- **Lines (comments):** 111-114
- **Lines (code):** 116-119

</details>

    

#### Examples

      


``` scss
@include ulu.component-button-verbose-get(( "property" : value ));
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  