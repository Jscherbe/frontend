---
title: Modal
sassdocGroupName: modal
---


# Modal





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
  "backdrop-color" :                true,
  "backdrop-blur" :                 4px,
  "box-shadow" :                    true,         
  "width":                          60rem,
  "sizes" : (
    "small" : 30rem,
    "large" : 80rem
  ),
  "height":                         340px,
  "height-no-header":               100px,
  "border-radius" :                 true,
  "resizer-width":                  1rem,
  "resizer-color":                  black,
  "resizer-color-hover":            black,
  "resizer-background-color":       rgb(221, 221, 221),
  "resizer-background-color-hover": rgb(66, 66, 66),
  "header-padding":                 1rem,
  "header-border-bottom":           none,
  "header-background-color":        black,
  "header-color":                   white,
  "title-color":                    white,
  "title-size" :                    "large",
  "title-font-weight":              bold,
  "title-text-transform" :          null,
  "close-color":                    black,
  "close-color-hover":              black,
  "close-background-color":         white,
  "close-size":                     2.5rem,
  "close-font-size":                1.2rem,
  "close-margin":                   0.5rem,
  "close-background-color-hover":   blue,
  "body-padding":                   1rem,
  "background-color":              white,
  "dark-background-color" :         false,
  "dark-color" :                   white,
  "dark-header-border-bottom" :     false,
  "dark-header-background-color" :  false,
  "dark-header-color" :             false,
  "title-icon-margin" :             0.5em,
  "animation-timing-function" :     cubic-bezier(0, 0, .2, 1),
  "animation-duration" :            300ms,
  "animation-duration-exit" :       150ms,
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _modal.scss
- **Group:** modal
- **Type:** variable
- **Lines (comments):** 31-71
- **Lines (code):** 73-116
    </details>
    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|backdrop-color|Color|true|The unblurred background color outside the modal. If set to true, will use the element.scss property for backdrop-color.|
|backdrop-blur|CssValue|4px|Determines the blur of the backdrop.|
|box-shadow|CssValue|true|Determines the box-shadow of the modal. If set to true, will use the element.scss property for backdrop-color.|
|width|Dimension|60rem|The width of the Modal|
|sizes|Map|Map|Size options to enable unique stylings.|
|height|Dimension|340px|The min-height of the modal.|
|height-no-header|Dimension|100px|The min-height of the modal.|
|border-radius|CssValue|true|The border radius of the modal. If set to true, will use the element.scss property for border-radius-large.|
|resizer-width|Dimension|1rem|The width of the resizer.|
|resizer-color|Color|black|The type color of the resizer.|
|resizer-color-hover|Color|black|The type color of the resizer when hovered or focused.|
|resizer-background-color|Color|rgb(221, 221, 221)|The background color of the resizer.|
|resizer-background-color-hover|Color|rgb(66, 66, 66)|The background color of the resizer when hovered or focused.|
|header-padding|Dimension|1rem|The padding of the modal header.|
|header-border-bottom|CssValue|none|Bottom-border on the modal header.|
|header-background-color|Color|black|Background color for the header.|
|header-color|Color|white|Type color of the header.|
|title-color|Color|white|Type color of the title.|
|title-size|String|large|The font-size of the title. This uses typography.scss, so the value of this options should be a variable from typography.scss.|
|title-font-weight|CssValue|bold|Font weight of the title.|
|title-text-transform|CssValue|null|Transform option for the title.|
|close-color|Color|black|Type color for the modal close icon.|
|close-color-hover|Color|black|Type color for the modal close icon when hovered or focused.|
|close-background-color|Color|white|Background color for the modal close icon.|
|close-size|Dimension|2.5rem|Size of the modal close icon.|
|close-font-size|Dimension|1.2rem|Font-siz of of the modal close icon font size.|
|close-margin|Dimension|0.5rem|The margin for the modal close icon.|
|close-background-color-hover|Close|blue|Background color for the modal close icon when hovered or focused.|
|body-padding|Dimension|1rem|The padding of the body content.|
|background-color|Color|white|The background color of the modal.|
|dark-background-color|Map|false|@joe-check unused|
|dark-color|Map|white|@joe-check unused|
|dark-header-border-bottom|Map|false|@joe-check unused|
|dark-header-background-color|Map|false|@joe-check unused|
|dark-header-color|Map|false|@joe-check unused|
|title-icon-margin|Dimension|0.5em|The margin of the title icon|
|animation-timing-function|CssValue|cubic-bezier(0, 0, .2, 1)|The animation timing menu of the modal.|
|animation-duration|Time|300ms|Animation duration for the modal opening.|
|animation-duration-exit|Time|150ms|Animation duration for the modal closing.|

    
  

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
- **File:** _modal.scss
- **Group:** modal
- **Type:** mixin
- **Lines (comments):** 118-121
- **Lines (code):** 123-125
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
- **File:** _modal.scss
- **Group:** modal
- **Type:** mixin
- **Lines (comments):** 136-138
- **Lines (code):** 140-489
    </details>
    

#### Examples

      


``` scss
@include ulu.component-modal-styles();
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
- **File:** _modal.scss
- **Group:** modal
- **Type:** function
- **Lines (comments):** 127-129
- **Lines (code):** 131-134
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  