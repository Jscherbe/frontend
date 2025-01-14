---
title: Scroll-slider
sassdocGroupName: scroll-slider
---


# Scroll-slider

<div class="type-large">

Overflow scrolling slider component (use with ui/overflow-scroller.js)

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
  "background-color" : false,
  "container" : "container",
  "containers" : ("container",),
  "margin-bottom" : 3rem,
  "margin-top" : 1rem,
  "padding-bottom" : 0,
  "padding-top" : 0,
  "prefix": "scroll-slider",
  "button-background-color" : white,
  "button-background-color-hover" : white,
  "button-border" : 2px solid white,
  "button-border-color-hover" : white,
  "button-border-radius" : 50%,
  "button-box-shadow" : element.get("box-shadow"),
  "button-color" : color.get("type"),
  "button-color-hover" : color.get("link"),
  "button-font-size" : 1.35rem,
  "button-icon-offset-x" : false,
  "button-icon-offset-y" : false,
  "button-indent" : 1.5rem,
  "button-indent-small" : 0.5rem,
  "button-size" : 3rem,
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _scroll-slider.scss
- **Group:** scroll-slider
- **Type:** variable
- **Lines (comments):** 15-38
- **Lines (code):** 40-63

</details>

    

#### Map Properties


|Name|Type|Default|
|:--|:--|:--|
|background-color|Color|false|
|container|String|"container"|
|containers|List|("container",)|
|margin-bottom|Dimension|3rem|
|margin-top|Dimension|1rem|
|padding-bottom|Dimension|0|
|padding-top|Dimension|0|
|prefix|String|"scroll-slide"|
|button-background-color|Color|white|
|button-background-color-hover|Color|white|
|button-border|CssValue|2px solid white|
|button-border-color-hover|Color|white|
|button-border-radius|Dimension|50%|
|button-box-shadow|CssValue|element.get("box-shadow")|
|button-color|Color|color.get("type")|
|button-color-hover|Color|color.get("link")|
|button-font-size|Dimension|1.35rem|
|button-indent|Dimension|1.5rem|
|button-indent-small|Dimension|0.5rem|
|button-size|Dimension|3rem|
|button-icon-offset-x|Dimension|false|
|button-icon-offset-y|Dimension|false|

    
  

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
  
- **File:** _scroll-slider.scss
- **Group:** scroll-slider
- **Type:** mixin
- **Lines (comments):** 65-68
- **Lines (code):** 70-72

</details>

    

#### Examples

General example      


``` scss
@include ulu.component-scroll-slider-set(( "property" : value ));
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

  

Output component stylesheet
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _scroll-slider.scss
- **Group:** scroll-slider
- **Type:** mixin
- **Lines (comments):** 83-85
- **Lines (code):** 87-204

</details>

    

#### Examples

      


``` scss
@include ulu.component-scroll-slider-styles();
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
  
- **File:** _scroll-slider.scss
- **Group:** scroll-slider
- **Type:** function
- **Lines (comments):** 74-77
- **Lines (code):** 79-81

</details>

    

#### Examples

General example      


``` scss
@include ulu.component-scroll-slider-get("property");
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  