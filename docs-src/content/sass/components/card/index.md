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
  "color" : null,
  "color-hover" : null,
  "footer-padding-y" : 0.25rem,
  "footer-min-height" : 2.5rem,
  "horizontal-breakpoint" : "small",
  "header-margin" : 0.75em,
  "image-ratio" : 56.25%,
  "image-aspect-ratio": list.slash(5, 3),
  "image-background-color" : rgb(197, 197, 197),
  "image-border" : null, // For when you have a margin
  "image-filter-hover" : null,
  "image-margin" : null,
  "image-transform-hover" : null,
  "image-transition-duration" :    350ms,
  "image-transition-enabled" : true,
  "image-transition-properties" : (transform, filter),
  "image-transition-timing-function" : ease-in-out,
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
  );
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _card.scss
- **Group:** card
- **Type:** variable
- **Lines (comments):** 17-61
- **Lines (code):** 63-113

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|padding|Dimension|2rem|The padding for the image icon|
|margin-y|Dimension|3rem|Top and bottom margin for the card.|
|border-radius|Dimension|5rem|The border radius of the card.|
|horizontal-breakpoint|String|small|The breakpoint used to change the card to vertical if using the card--horizontal styling. Uses ulu's breakpoint module.|
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
|body-min-height|Dimension|10rem|the min-height of the card body.|
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
|image-transition-properties|List|(transform, filter)|The properties for the image transitions.|

    
  

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
- **Lines (comments):** 115-118
- **Lines (code):** 120-122

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
- **Lines (comments):** 133-137
- **Lines (code):** 139-154

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
- **Lines (comments):** 161-165
- **Lines (code):** 167-433

</details>

    


<div class="callout callout--demo crop-margins">

#### Demo



<a class="button" href="/demos/card">Our Demo</a>

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
- **Lines (comments):** 124-127
- **Lines (code):** 129-131

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
  
  
  