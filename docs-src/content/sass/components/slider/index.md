---
title: Slider
sassdocGroupName: slider
---


# Slider

<div class="type-large">

Slider/Carousal component that works with the ui/slider.js script

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
  
- **File:** _slider.scss
- **Group:** slider
- **Type:** mixin
- **Lines (comments):** 58-61
- **Lines (code):** 63-65

</details>

    

#### Examples

      


``` scss
@include ulu.component-slider-set(( "property" : value ));
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
  
- **File:** _slider.scss
- **Group:** slider
- **Type:** mixin
- **Lines (comments):** 76-78
- **Lines (code):** 80-184

</details>

    

#### Examples

      


``` scss
@include ulu.component-slider-styles();
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
  
- **File:** _slider.scss
- **Group:** slider
- **Type:** function
- **Lines (comments):** 67-70
- **Lines (code):** 72-74

</details>

    

#### Examples

      


``` scss
@include ulu.component-slider-get("property");
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
  "background-color" : transparent,
  "margin-bottom" : 3rem,
  "margin-top" : 1rem,
  "button-icon-offset-x" : 2rem,
  "button-icon-offset-y" : null,
  "button-margin" : 2rem,
  "button-size" : 3rem,
  "button-height": 2.5rem,
  "button-width": 2.5rem,
  "dot-background-color" : transparent,
  "dot-background-color-hover" : "link",
  "dot-background-color-selected" : "link",
  "dot-border-color" : "link",
  "dot-border-color-hover" : "link",
  "dot-border-color-selected" : "link",
  "dot-border-radius" : 50%,
  "dot-border-width" : 2px,
  "dot-size" :  1rem,
  "padding-bottom" : 0,
  "padding-top" : 0,
  );
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _slider.scss
- **Group:** slider
- **Type:** variable
- **Lines (comments):** 12-33
- **Lines (code):** 35-56

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|background-color|Color|transparent|Background color for the entire slider section.|
|margin-bottom|Dimension|3rem|Bottom margin color for the entire slider section.|
|margin-top|Dimension|1rem|Top margin color for the entire slider section.|
|padding-bottom|Dimension|0|Bottom padding for individual slides.|
|padding-top|Dimension|0|Top padding for individual slides.|
|button-icon-offset-x|Dimension|false|Offsets the control icons in from their respective sides.|
|button-icon-offset-y|Dimension|false|Offsets the control options down by adding a margin.|
|button-margin|Dimension|0.75rem|The margin between the controls and the slide content when using .slider__slide-gap-for-controls|
|button-size|Dimension|3rem|Size of the button. Likely antiquated and replaced with button-width and button-height|
|dot-background-color|Color|transparent|The color of the dot when unselected.|
|dot-background-color-hover|Color|color.get("link")|The color of the dot when hovered.|
|dot-background-color-selected|Color|color.get("link")|The color of the dot when selected.|
|dot-border-radius|Dimension|50%|The border-radius of the dot.|
|dot-border-color|Color|color.get("link")|The border color of the dot.|
|dot-border-color-hover|Color|color.get("link")|The border color of the dot when hovered.|
|dot-border-color-selected|Color|color.get("link")|The border color of the dot when selected.|
|dot-border-width|Dimension|2px|The border width of the dot.|
|dot-size|Dimension|1rem|The height and width of the dot.|
|button-height|Dimension|1rem|The height of the button.|
|button-width|Dimension|1rem|The width of the button.|

    
  
  