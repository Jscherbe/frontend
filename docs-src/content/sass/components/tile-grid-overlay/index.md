---
title: Tile-grid-overlay
sassdocGroupName: tile-grid-overlay
---


# Tile-grid-overlay

<div class="type-large">

Provides styles to use tile-grid over the top of image

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
  "button-background-color": #ce97e6dc,
  "button-background-color-hover": #b882cf,
  "button-background-color-striped": #b397e6cc,
  "button-background-color-active": #868dece4,
  "background-image-filter" : (grayscale(1) contrast(0.6) brightness(1.5)),
  "breakpoint-even-columns-min" : "small",
  "breakpoint-even-columns-max" : "medium",
  "wide-breakpoint-even-columns-min" : "small"
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _tile-grid-overlay.scss
- **Group:** tile-grid-overlay
- **Type:** variable
- **Lines (comments):** 15-16
- **Lines (code):** 18-27

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
  
- **File:** _tile-grid-overlay.scss
- **Group:** tile-grid-overlay
- **Type:** mixin
- **Lines (comments):** 29-32
- **Lines (code):** 34-36

</details>

    

#### Examples

      


``` scss
@include ulu.component-tile-grid-overlay-set(( "property" : value ));
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

  

Output component styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _tile-grid-overlay.scss
- **Group:** tile-grid-overlay
- **Type:** mixin
- **Lines (comments):** 47-49
- **Lines (code):** 51-115

</details>

    

#### Examples

      


``` scss
@include ulu.component-tile-grid-overlay-styles();
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
  
- **File:** _tile-grid-overlay.scss
- **Group:** tile-grid-overlay
- **Type:** function
- **Lines (comments):** 38-41
- **Lines (code):** 43-45

</details>

    

#### Examples

      


``` scss
@include ulu.component-tile-grid-overlay-get("property");
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  