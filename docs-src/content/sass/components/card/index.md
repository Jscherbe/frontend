---
title: Card
sassdocGroupName: card
---


# Card

<div class="type-large">

A versatile container for displaying and summarizing individual items, entities, or resources in a visually appealing and concise format

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
  "background-color-hover" : rgb(242, 244, 246),
  "body-min-height" : 10rem,
  "border" : 1px solid #ccc,
  "border-hover" : 2px solid #278cca,
  "border-radius" : 5px,
  "box-shadow" : null,
  "box-shadow-hover" : null,
  "clickable-card-enabled" : true,
  "clickable-card-selector" : "[data-ulu-proxy-click-init]",
  "clickable-card-interact-selector" : "&:hover, &:focus-within",
  "color" : "type",
  "color-hover" : null,
  "footer-padding-y" : 0.25rem,
  "footer-min-height" : 2.5rem,
  "horizontal-breakpoint" : "small",
  "horizontal-image-width" : min(33%, 20rem),
  "horizontal-min-height" : 20rem,
  "horizontal-max-width" : 80rem,
  "horizontal-main-max-width" : 40rem,
  "horizontal-aside-width" : 40%,
  "header-margin" : 0.75em,
  "image-ratio" : 56.25%,
  "image-aspect-ratio": list.slash(5, 3),
  "image-background-color" : rgb(238, 238, 238),
  "image-border" : null, // For when you have a margin
  "image-filter-hover" : null,
  "image-margin" : null,
  "image-icon-max-width" : 8rem,
  "image-transform-hover" : null,
  "image-transition-duration" :    350ms,
  "image-transition-enabled" : true,
  "image-transition-properties" : (transform, filter),
  "image-transition-timing-function" : ease-in-out,
  "image-fit-padding" : 1rem,
  "image-fit-filter" : drop-shadow(0 0px 8px rgba(0, 0, 0, 0.3)),
  "margin-y" : 3rem,
  "max-width" : 28rem,
  "padding" : 2rem,
  "title-color" : null,
  "title-color-hover" : null,
  "title-color-card-hover" : null,
  "title-margin" : 1rem,
  "title-font-weight" : bold,
  "transition-enabled":      true,
  "transition-timing-function" : ease-in-out,
  "transition-duration" :    200ms,
  "transition-properties" :  (border-color, background-color, color, box-shadow, transform),
  "overlay-aspect-ratio": list.slash(4, 3),
  "overlay-background-color-hover" : null,
  "color-overlay" : white,
  "color-overlay-hover" : null,
  "overlay-background-color": rgba(0, 0, 0, 0.6),
  "overlay-shading": true,
  "overlay-body-padding-y": 1rem,
  "aside-rule" : false,
  "aside-rule-width" : 1px,
  "aside-background-color" : transparent,
  "aside-rule-color": "rule-light",
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _card.scss
- **Group:** card
- **Type:** variable
- **Lines (comments):** 18-72
- **Lines (code):** 74-134

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|padding|Dimension|2rem|The padding for the image icon|
|margin-y|Dimension|3rem|Top and bottom margin for the card.|
|border-radius|Dimension|5rem|The border radius of the card.|
|box-shadow|CssValue|null|The box-shadow for the card.|
|box-shadow-hover|CssValue|null|The box-shadow for the card when hovered or focused.|
|color|Color|null|The type color of the card.|
|color-hover|Color|null|The type color of the card when hovered or focused.|
|color-overlay|Color|white|The type color of the card when using card--overlay.|
|color-overlay-hover|Color|null|The type color of the card when hovered or focused and when using card--overlay.|
|overlay-background-color|Color|rgba(0, 0, 0, 0.6)|The background color for the text box when using card--overlay.|
|background-color|Color|white|The background color of the card.|
|background-color-hover|Color|rgb(242, 244, 246)|The background color of the card when hovered or focused.|
|max-width|Dimension|28rem|The max-width of the card.|
|body-min-height|Dimension|8rem|the min-height of the card body.|
|border|CssValue|1px solid #ccc|The card border.|
|border-hover|CssValue|2px solid #278cca|The card border when hovered or focused.|
|header-margin|Dimension|0.75em|The margin for the card header.|
|title-color|Color|null|The type color of the title.|
|title-color-hover|Color|null|The type color of the title (if link/button) when hovered or focused|
|title-margin|Dimension|0|The margin for the title.|
|title-font-weight|CssValue|bold|The font weight for the title.|
|image-ratio|Number|56.25%|The image ratio for the card image.|
|image-background-color|Color|rgb(197, 197, 197)|The background color behind the image.|
|image-margin|Dimension|null|The margin for the image.|
|image-border|Dimension|null|// For when you have a margin, the border for the image.|
|image-transform-hover|CssValue|null|Animation for the image when hovered or focused.|
|image-filter-hover|CssValue|null|Filter for the image when hovered or focused.|
|overlay-background-color-hover|Color|null|The color of the pseudo-element when using proxy click.|
|clickable-card-enabled|Boolean|true|Enable or disable proxy click.|
|clickable-card-selector|String|data-ulu-proxy-click-init|The selector for proxy-click.js to find the card and implement the clickable card script.|
|clickable-card-interact-selector|String|&:hover, &:focus-within|The selectors for the cards being interacted with.|
|footer-padding-y|Dimension|0.25rem|The top and bottom padding for the footer.|
|footer-min-height|Dimension|2.5rem|The min height for the footer|
|prefix|String|card|The class name used to add card styling.|
|transition-enabled|Boolean|true|Enable or disable transition for card.|
|transition-timing-function|CssValue|ease-in-out|The timing function for the card animation.|
|transition-duration|Time|200ms|The animation duration for the card animation.|
|transition-properties|List|(border-color, background-color, color, box-shadow, transform)|The properties for the card animation.|
|image-transition-enabled|Boolean|true|Enable or disable the image transition.|
|image-transition-duration|Time|350ms|The duration of the image transition.|
|image-transition-timing-function|CssValue|ease-in-out|The timing function for the image transition.|
|image-fit-padding|Number|1rem|Padding on inside of image when using image fit modifier|
|image-fit-filter|CssValue|drop-shadow(0 0px 8px rgba(0, 0, 0, 0.2))|Filter to use on image when using image fit modifier|
|image-icon-max-width|List|10rem|Max width for image when using the modifier on the .card__image--icon|
|image-transition-properties|List|(transform, filter)|The properties for the image transitions.|
|horizontal-breakpoint|String|small|The breakpoint used to change the card to vertical if using the card--horizontal styling. Uses ulu's breakpoint module.|
|horizontal-min-height|Unit|10rem|Minimum height when horizontal|
|horizontal-max-width|Unit|40rem|Maximum width when horizontal|
|horizontal-body-max-width|Unit|80rem|The max-width of body when horizontal|
|aside-rule|Boolean|false|Whether or not to have a rule separating body and aside|
|aside-rule-width|CssUnit|1px|Size of rule|
|aside-rule-color|CssUnit|"rule-light"|Color of rule|
|aside-rule-background-color|CssUnit|transparent|Color of aside background color|

    
  

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
  
- **File:** _card.scss
- **Group:** card
- **Type:** mixin
- **Lines (comments):** 136-139
- **Lines (code):** 141-143

</details>

    

#### Examples

      


``` scss
@include ulu.component-card-set(( "property" : value ));
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  when-clickable() {#mixin-when-clickable}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Mixin styles for card when it has proxy click enabled and is being interacted with (hover/focus)
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _card.scss
- **Group:** card
- **Type:** mixin
- **Lines (comments):** 154-158
- **Lines (code):** 160-190

</details>

    

#### Examples

      


``` scss
@include ulu.component-card-styles();
```
  



      

#### Parameters


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|$hover|`Boolean`|false|Apply styles when the card is being hover/focused within, else applies styles to rest state of a clickable card (one who has a proxy click setup)
Prints component styles|

    

#### Require

- [get()](/sass/components/accordion/#function-get)
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints component styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _card.scss
- **Group:** card
- **Type:** mixin
- **Lines (comments):** 197-201
- **Lines (code):** 203-492

</details>

    


<div class="callout callout--demo crop-margins">

#### Demo



<a class="button" href="/demos/card">View</a>

</div>



#### Examples

      


``` scss
scss
```
  



      

      


``` scss
@include ulu.component-card-styles();
```
  



      

#### Require

- [when-clickable()](/sass/components/card/#mixin-when-clickable)
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
  
- **File:** _card.scss
- **Group:** card
- **Type:** function
- **Lines (comments):** 145-148
- **Lines (code):** 150-152

</details>

    

#### Examples

      


``` scss
@include ulu.component-card-get(( "property" : value ));
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  