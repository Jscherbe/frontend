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
  "border-radius" : 3px,
  "horizontal-breakpoint" : "small",
  "box-shadow" : null,
  "box-shadow-hover" : null,
  "color" : null,
  "color-hover" : null,
  "background-color" : white,
  "background-color-hover" : white,
  "max-width" : 28rem,
  "body-min-height" : 10rem,
  "border" : null,
  "border-hover" : null,
  "title-margin" : 0.75em,
  "title-font-weight" : bold,
  "overlay-background-color-hover" : null,
  "clickable-card-selector" : ".card[data-proxy-click]",
  "clickable-card-interact-selector" : "&:hover, &:focus-within",
  "footer-padding-y" : 0.25rem,
  "footer-min-height" : 2.5rem,
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _card.scss
- **Group:** card
- **Type:** variable
- **Lines (comments):** 10-11
- **Lines (code):** 13-36
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
- **Lines (comments):** 38-40
- **Lines (code):** 42-44
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
- **File:** _card.scss
- **Group:** card
- **Type:** mixin
- **Lines (comments):** 54-56
- **Lines (code):** 58-193
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
- **Lines (comments):** 46-48
- **Lines (code):** 50-52
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  