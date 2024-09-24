---
title: Card
sassdocGroupName: card
---


# Card





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
  "padding" : 2rem,
  "margin-y" : 3rem,
  "border-radius" : 5px,
  "horizontal-breakpoint" : "small",
  "box-shadow" : null,
  "box-shadow-hover" : null,
  "color" : null,
  "color-hover" : null,
  "color-overlay" : white,
  "color-overlay-hover" : null,
  "overlay-background-color": rgba(0, 0, 0, 0.6),
  "background-color" : white,
  "background-color-hover" : rgb(242, 244, 246),
  "max-width" : 28rem,
  "body-min-height" : 10rem,
  "border" : 1px solid #ccc,
  "border-hover" : 2px solid #278cca,
  "header-margin" : 0.75em,
  "title-color" : null,
  "title-color-hover" : null,
  "title-color-card-hover" : null,
  "title-margin" : 0,
  "title-font-weight" : bold,
  "image-ratio" : 56.25%,
  "image-background-color" : rgb(197, 197, 197),
  "image-margin" : null,
  "image-border" : null, // For when you have a margin
  "image-transform-hover" : null,
  "image-filter-hover" : null,
  "overlay-background-color-hover" : null,
  "clickable-card-enabled" : true,
  "clickable-card-selector" : "[data-ulu-proxy-click-init]",
  "clickable-card-interact-selector" : "&:hover, &:focus-within",
  "footer-padding-y" : 0.25rem,
  "footer-min-height" : 2.5rem,
  "prefix" : "card",
  "transition-enabled":      true,
  "transition-timing-function" : ease-in-out,
  "transition-duration" :    200ms,
  "transition-properties" :  (border-color, background-color, color, box-shadow, transform),
  "image-transition-enabled" : true,
  "image-transition-duration" :    350ms,
  "image-transition-timing-function" : ease-in-out,
  "image-transition-properties" : (transform, filter),
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _card.scss
- **Group:** card
- **Type:** variable
- **Lines (comments):** 11-12
- **Lines (code):** 14-59
    </details>
    
  

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
- **Lines (comments):** 61-63
- **Lines (code):** 65-67
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

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
- **Lines (comments):** 77-78
- **Lines (code):** 80-95
    </details>
    

#### Parameters


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|$hover|`Boolean`|false|Apply styles when the card is being hover/focused within, else applies styles to rest state of a clickable card (one who has a proxy click setup)|

    

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
- **Lines (comments):** 102-104
- **Lines (code):** 106-359
    </details>
    

#### Examples

      


``` scss
@include ulu.component-example-styles();
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
- **Lines (comments):** 69-71
- **Lines (code):** 73-75
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  