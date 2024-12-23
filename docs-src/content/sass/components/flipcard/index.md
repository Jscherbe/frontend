---
title: Flipcard
sassdocGroupName: flipcard
---


# Flipcard

<div class="type-large">

Creates adaptive (changing at breakpoints)n between items (vertical/horizontal layout)

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
  "anim-delay" : 200ms,
  "anim-duration" : 430ms,
  "anim-front-close": "FlipcardFrontClose",
  "anim-front-open": "FlipcardFrontOpen",
  "anim-back-open": "FlipcardBackOpen",
  "anim-timing-function": ease-out,
  "background-color" : white,
  "background-color-image" : rgba(96, 255, 255, 0.89),
  "background-color-back" : rgb(178, 178, 178),
  "bottom-shadow" : true,
  "border" : 1px solid black,
  "border-color-hover" : black,
  "border-radius" : 6px,
  "control-button-border-focus" : 2px solid blue,
  "icon-color" : pink,
  "icon-color-hover" : aqua,
  "icon-color-image" : aqua,
  "icon-color-image-hover" : pink,
  "image-opacity" : 0.7,
  "padding" : 1.5rem,
  "title-color" : red,
  "title-color-hover" : green,
  "title-color-image" : black,
  "title-color-image-hover" : blue,
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _flipcard.scss
- **Group:** flipcard
- **Type:** variable
- **Lines (comments):** 12-33
- **Lines (code):** 35-61

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|background-color|Color|white|Background color of the text-only flipcard front.|
|background-color-image|Color|rgba(96, 255, 255, 0.89)|Background color of the image flipcard front.|
|image-opacity|Number|0.7|Opacity of the image to allow shading from the background color.|
|background-color-back|Color|rgb(178, 178, 178)|Background color on the back of the flipcard.|
|border|Color|1px solid black|Flipcard border.|
|border-radius|Dimension|6px|Border radius for flipcard.|
|border-color-hover|Color|black|border color when hovered.|
|control-button-border-focus|CssValue|2px solid blue|Border that shows when focused.|
|anim-duration|Time|430ms|Animation duration.|
|anim-delay|Time|200ms|Animation delay.|
|padding|Dimension|1.5rem|Padding for the flipcard.|
|title-color|Color|red|Color of the front page text.|
|title-color-hover|Color|green|Color of the front page text when hovered or focused.|
|icon-color|Color|pink|Color of the icon.|
|icon-color-hover|Color|aqua|Color of the icon when hovered or focused.|
|icon-color-image|Color|aqua|Color of the icon when using an image.|
|icon-color-image-hover|Color|pink|Color of the icon when using an image and hovered or focused.|
|title-color-image|Color|black|Color of the front page text when using an image.|
|title-color-image-hover|Color|blue|Color of the front page text when using an image and hovered or focused.|
|bottom-shadow|Boolean|true|Boolean that enables a bottom shadow to the image flipcard.|

    
  

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
  
- **File:** _flipcard.scss
- **Group:** flipcard
- **Type:** mixin
- **Lines (comments):** 63-65
- **Lines (code):** 67-69

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
  
- **File:** _flipcard.scss
- **Group:** flipcard
- **Type:** mixin
- **Lines (comments):** 71-73
- **Lines (code):** 75-77

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
  
- **File:** _flipcard.scss
- **Group:** flipcard
- **Type:** mixin
- **Lines (comments):** 87-89
- **Lines (code):** 91-311

</details>

    

#### Examples

      


``` scss
@include ulu.component-adaptive-spacing-styles();
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
  
- **File:** _flipcard.scss
- **Group:** flipcard
- **Type:** function
- **Lines (comments):** 79-81
- **Lines (code):** 83-85

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  