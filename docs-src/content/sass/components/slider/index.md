---
title: Slider
sassdocGroupName: slider
---


# Slider





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
  "breakpoint" : "small",
  "margin-bottom" : 3rem,
  "margin-top" : 1rem,

  "button-background-color" : transparent,
  "button-border" : 2px solid color.get("link"),
  "button-border-color-hover" :  color.get("link-hover"),
  "button-border-radius" : 50%,
  "button-color-hover" : white,
  "button-background-color-hover" : color.get("link-hover"),
  "button-color" : color.get("link"),
  "button-font-size" : 1.35rem,
  "button-icon-offset-x" : 2rem,
  "button-icon-offset-y" : false,
  "button-font-size-small" : false,
  "button-margin" : 2rem,
  "button-margin-small" : 0.75rem,
  "button-size" : 3rem,
  "button-size-small" : false,
  "button-height": 2.5rem,
  "button-width": 2.5rem,
  "dot-background-color" : transparent,
  "dot-background-color-hover" : color.get("link"),
  "dot-background-color-selected" : color.get("link"),
  "dot-border-color" : color.get("link"),
  "dot-border-color-hover" : color.get("link"),
  "dot-border-color-selected" : color.get("link"),
  "dot-border-radius" : 50%,
  "dot-border-width" : 2px,
  "dot-size" :  1rem,
  "padding-bottom" : 0,
  "padding-bottom-small" : 0,
  "padding-top" : 0,
  "padding-top-small" : 0,
  );
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _slider.scss
- **Group:** slider
- **Type:** variable
- **Lines (comments):** 12-47
- **Lines (code):** 49-85

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|background-color|Color|transparent|Background color for the entire slider section.|
|breakpoint|List|"small"|Currently commented out @joe-check|
|margin-bottom|Dimension|3rem|Bottom margin color for the entire slider section.|
|margin-top|Dimension|1rem|Top margin color for the entire slider section.|
|padding-bottom|Dimension|0|Bottom padding for individual slides.|
|padding-bottom-small|Dimension|0|Smaller option for bottom padding for individual slides. Currently commented out @joe-check|
|padding-top|Dimension|0|Top padding for individual slides.|
|padding-top-small|Dimension|0|Smaller option for top padding for individual slides. Currently commented out @joe-check|
|button-background-color|Color|transparent|Currently unused @joe-check|
|button-background-color-hover|Color|color.get("link-hover")|Currently unused @joe-check|
|button-border|CssValue|2px solid color.get("link")|Currently unused @joe-check|
|button-border-color-hover|Color|color.get("link-hover")|Currently unused @joe-check|
|button-border-radius|Dimension|50%|Currently unused @joe-check|
|button-color|Color|color.get("link")|Currently unused @joe-check|
|button-color-hover|Color|white|Currently unused @joe-check|
|button-font-size|Dimension|1.35rem|Currently unused @joe-check|
|button-font-size-small|Dimension|false|Currently unused @joe-check|
|button-icon-offset-x|Dimension|false|Offsets the control icons in from their respective sides. @joe-check|
|button-icon-offset-y|Dimension|false|Offsets the control options down by adding a margin.|
|button-margin|Dimension|0.75rem|The margin between the controls and the slide content when using .slide-gap-for-controls|
|button-margin-small|Dimension|0.75rem|Currently commented out @joe-check|
|button-size|Dimension|3rem|Size of the button. Likely antiquated and replaced with button-width and button-height|
|button-size-small|Dimension|false|Currently commented out @joe-check|
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
- **Lines (comments):** 87-90
- **Lines (code):** 92-94

</details>

    

#### Examples

General example, replace module-name with module's name      


``` scss
@include module-name.set(( "property" : value ));
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

  

Prints modal component styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _slider.scss
- **Group:** slider
- **Type:** mixin
- **Lines (comments):** 104-106
- **Lines (code):** 108-241
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
- **Lines (comments):** 96-98
- **Lines (code):** 100-102

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  