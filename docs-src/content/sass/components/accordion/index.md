---
title: Accordion
sassdocGroupName: accordion
---


# Accordion

<div class="type-large">

Outputs accordion component stylesheet, which can be used with <details> or custom disclosure components

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
  "background-color":               "background",
  "background-color-open":          white,
  "border-color":                   "rule-light",
  "border-radius":                  true,
  "border-width":                   1px,
  "box-shadow":                     none,
  "margin":                         (1.5em 0),
  "margin-between":                 0,
  "padding-x":                      1.25em,
  "padding-y":                      1.25em,
  "icon-background-color":          transparent,
  "icon-background-color-hover":    transparent,
  "icon-border-radius":             50%,
  "icon-color":                     "link",
  "icon-color-hover":               "link-hover",
  "icon-font-size":                 1em,
  "icon-margin":                    1em,
  "icon-size":                      auto,
  "icon-stroke-width":              0.15em,
  "summary-background-color":       #f6f6f6,
  "summary-color":                  null,
  "summary-background-color-hover": null,
  "summary-color-hover":            null,
  "summary-line-height":            null,
  "summary-padding-y":              1em,
  "summary-type-size":              false,
  "summary-border-enabled":         true,
  "summary-border-color":           "rule-light",
  "summary-border-width":           1px,
  "transparent-content-padding":    (0.25em 0),
  "borderless-margin-between":      0.5em,
  "active-selector":                ".is-active"
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _accordion.scss
- **Group:** accordion
- **Type:** variable
- **Lines (comments):** 25-58
- **Lines (code):** 60-93

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|background-color|Color|background|This is the background color of the accordion before it is expanded.|
|background-color-open|Color|white|This is the background color of the accordion when it is expanded. This will change the background color of the accordion's summary as well as the details.|
|border-color|String|"rule-light"|The color of the accordion border.|
|border-radius|Boolean|Number|true|This applies a rounding of edges for the accordion. If there are multiple accordions in a stack, this will only apply to the top of the first accordion and the bottom of the last accordion.|
|border-width|Dimension|1px|The width of the borders of the accordions.|
|box-shadow|CssValue|none|Adds a box shadow to accordion container.|
|margin|Dimension|(1.5em 0)|This is the margin above and below the accordion. Multiple Accordions will stack. See margin-between below.|
|margin-between|Dimension|0|This adds a margin between adjacent accordions. By default, accordions do not have any net margin between each other.|
|padding-x|Dimension|1.5em|Singular value for the left and right padding.|
|padding-y|Dimension|1.5em|Singular value for the top and bottom padding.|
|icon-background-color|Color|transparent|The background color of the icon.|
|icon-background-color-hover|Color|transparent|The background color of the icon when hovered or focused.|
|icon-border-radius|Number|50%|The border-radius of the icon.|
|icon-color|String|link|Color of the icon. This uses color.scss, so the value of this option should be a color variable from color.scss.|
|icon-color-hover|String|link-hover|Color of the icon when hovered or focused on. This uses color.scss, so the value of this options should be a color variable from color.scss.|
|icon-font-size|Dimension|1em|The font-size of the icon.|
|icon-margin|Dimension|1em|The margin to the left of the icon.|
|icon-size|Dimension|auto|The size of the icon. Used as the base in the flex property.|
|icon-stroke-width|Dimension|0.15em|The stroke width of the icon.|
|summary-background-color|Color|#f6f6f6|The background color for the summary (toggle button) of the accordion.|
|summary-background-color-hover|Color|null|The background color for the summary (toggle button) of the accordion when hovered.|
|summary-color|Color|null|The color of the text in the accordion summary.|
|summary-color-hover|Color|null|The color of the text in the accordion summary when hovering or focusing on it.|
|summary-line-height|Dimension|null|Adjusts the line height of the summary element.|
|summary-padding-y|Dimension|1em|The vertical padding of the summary.|
|summary-type-size|String|Boolean|"large"|The typography size of the text in the accordion summary. Can be a boolean to disable.|
|summary-border-enabled|Boolean|true|Whether the summary has a border when the accordion is open.|
|summary-border-color|Color|rule-light|The color of the summary border.|
|summary-border-width|Dimension|1px|The width of the summary border.|
|transparent-content-padding|Dimension|(0.25em 0)|The padding of the content area for transparent accordions.|
|borderless-margin-between|Dimension|0.5em|Margin between accordions when using no-border modifier.|
|active-selector|String|'.is-active'|The selector used for the active state of a non-<details> accordion.|

    
  

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
- **Lines (comments):** 95-98
- **Lines (code):** 100-102

</details>

    

#### Examples

      


``` scss
@include ulu.component-accordion-set(( "property" : value ));
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
  
- **File:** _accordion.scss
- **Group:** accordion
- **Type:** mixin
- **Lines (comments):** 114-117
- **Lines (code):** 119-274

</details>

    


<div class="callout callout--demo crop-margins">

#### Demo



<a class="button" href="/demos/accordion">View</a>

</div>



#### Examples

      


``` scss
@include ulu.component-accordion-styles();
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
- **Lines (comments):** 104-107
- **Lines (code):** 109-112

</details>

    

#### Examples

      


``` scss
@include ulu.component-accordion-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  