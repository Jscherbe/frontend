---
title: Accordion
sassdocGroupName: accordion
---


# Accordion





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
  "background-color":            white,
  "background-color-open":       #F7F8F7,
  "padding-x":                   1.5em,
  "padding-y":                   1.5em,
  "margin":                      3rem,
  "margin-between":              0,
  "border-radius":               0,
  "box-shadow":                  none,
  "border-color":                "rule",
  "border-width":                1px,
  "summary-color":               inherit,
  "summary-type-size":           false,
  "summary-color-hover":         inherit,
  "summary-padding-y":           1rem,
  "summary-background-color":    white,
  "summary-line-height":         inherit,
  "icon-color":                  "link",
  "icon-color-hover":            "link:hover",
  "icon-background-color":       transparent,
  "icon-background-color-hover": transparent,
  "icon-border-radius":          50%,
  "icon-size":                   auto,
  "icon-font-size":              1.5rem,
  "icon-stroke-width":           0.15em,
  "transparent-padding-y":       1em,
  "transparent-padding-x":       0,
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _accordion.scss
- **Group:** accordion
- **Type:** variable
- **Lines (comments):** 17-43
- **Lines (code):** 45-72
    </details>
    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|background-color|Color|white|This is the background color of the accordion before it is expanded.|
|background-color-open|Color|#F7F8F7|This is the background color of the accordion before it is expanded. This will change the background color of the accordion's summary as well as the details.|
|padding-x|Dimension|1.5em|@joe-check This value gives horizontal padding to the accordion container. The accordion's summary will use this value to add both the same padding as well as a negative margin. This is so that the borders stretch across the whole container.|
|padding-y|Dimension|1.5em|@joe-check This value gives horizontal padding to the accordion container. The accordion's summary will use this value to add both the same padding as well as a negative margin. This is so that the borders stretch across the whole container.|
|margin|Dimension|3rem|text This is the margin above and below the accordion. If there are stacked accordions, by default they will use negative margin to offset this difference. To add a margin between accordions, use the margin-between option.|
|margin-between|Dimension|0|This adds a margin between accordions. By default, accordions do not have any net margin between each other.|
|border-radius|Number|0|This applies a rounding of edges for the accordion. If there are multiple accordions in a stack, this will only apply to the top of the first accordion and the bottom of the last accordion.|
|box-shadow|CssValue|none|Adds a box shadow to the accordion for shading.|
|border-width|Dimension|1px|The width of the borders of the accordions|
|summary-color|Color|inherit|The color of the text in the accordion summary.|
|summary-type-size|Dimension|false|The size of the text in the accordion summary.|
|summary-color-hover|Color|inherit|The color of the text in the accordion summary when hovering or focusing on it.|
|summary-padding-y|Dimension|1rem|The vertical padding of the summary.|
|summary-background-color|Color|white|@joe-check THIS IS UNUSED BELOW. DELETE?|
|summary-line-height|Dimension|inherit|Adjusts the line height of the summary element.|
|icon-color|String|link|Color of the icon. This uses color.scss, so the value of this options should be a color variable from color.scss.|
|icon-color-hover|String|link:hover|Color of the icon when hovered or focused on. This uses color.scss, so the value of this options should be a color variable from color.scss.|
|icon-background-color|Color|transparent|The background color of the icon.|
|icon-background-color-hover|Color|transparent|The background color of the icon when hovered or focused.|
|icon-border-radius|Number|50%|The border-radius of the icon.|
|icon-size|Dimension|auto|The size of the icon. Used as the base in the flex property.|
|icon-font-size|Dimension|1.5rem|The font-size of the icon.|
|icon-stroke-width|Dimension|0.15em|@joe-check THIS IS UNUSED BELOW. DELETE?|
|transparent-padding-y|Dimension|1em|The upper and lower padding of the transparent summary.|
|transparent-padding-x|Dimension|0|The upper and lower padding of the transparent summary.|

    
  

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
- **File:** _accordion.scss
- **Group:** accordion
- **Type:** mixin
- **Lines (comments):** 74-76
- **Lines (code):** 78-80
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

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
- **File:** _accordion.scss
- **Group:** accordion
- **Type:** mixin
- **Lines (comments):** 90-92
- **Lines (code):** 94-212
    </details>
    

#### Examples

      


``` scss
@include ulu.component-example-styles();
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
- **File:** _accordion.scss
- **Group:** accordion
- **Type:** function
- **Lines (comments):** 82-84
- **Lines (code):** 86-88
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  