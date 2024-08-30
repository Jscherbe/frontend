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
  "image-ratio" : 56.25%,
  "padding" : 2rem,
  "margin-y" : 3rem,
  "border-radius" : 5px,
  "horizontal-breakpoint" : "small",
  "box-shadow" : 5px 5px 8px rgb(180, 180, 180),
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
  "border" : null,
  "border-hover" : 2px solid #278cca,
  "title-margin" : 0.75em,
  "title-font-weight" : bold,
  "overlay-background-color-hover" : null,
  "clickable-card-selector" : "[data-ulu-proxy-click-init]",
  "clickable-card-interact-selector" : "&:hover, &:focus-within",
  "footer-padding-y" : 0.25rem,
  "footer-min-height" : 2.5rem,
  "prefix" : "card",
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _card.scss
- **Group:** card
- **Type:** variable
- **Lines (comments):** 12-13
- **Lines (code):** 15-42
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
- **Lines (comments):** 44-46
- **Lines (code):** 48-50
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  clickable-card() {#mixin-clickable-card}

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
- **Lines (comments):** 60-62
- **Lines (code):** 64-72
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
- **File:** _card.scss
- **Group:** card
- **Type:** function
- **Lines (comments):** 52-54
- **Lines (code):** 56-58
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  