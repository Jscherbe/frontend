---
title: Card-grid
sassdocGroupName: card-grid
---


# Card-grid

<div class="type-large">

Lightweight CSS Grid setup for card components

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
  "gap" : 2rem,
  "template-columns" : 1fr 1fr,
  "compact-gap" : 1rem,
  "compact-template-columns" : 1fr 1fr 1fr,
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _card-grid.scss
- **Group:** card-grid
- **Type:** variable
- **Lines (comments):** 12-17
- **Lines (code):** 19-24

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|compact-template-columns|CssValue|1fr 1fr 1fr|The template-columns of the card-grid--compact.|
|compact-gap|Dimension|1rem|The grid gap of the card-grid--compact.|
|gap|Dimension|2rem|The grid gap of the card-grid.|
|template-columns|CssValue|1fr 1fr|The template-columns of the card-grid.|

    
  

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
  
- **File:** _card-grid.scss
- **Group:** card-grid
- **Type:** mixin
- **Lines (comments):** 26-28
- **Lines (code):** 30-32

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include ulu.component-card-grid-set(( "property" : value ));|

    

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
  
- **File:** _card-grid.scss
- **Group:** card-grid
- **Type:** mixin
- **Lines (comments):** 42-44
- **Lines (code):** 46-73

</details>

    

#### Examples

      


``` scss
@include ulu.component-card-grid-styles();
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
  
- **File:** _card-grid.scss
- **Group:** card-grid
- **Type:** function
- **Lines (comments):** 34-36
- **Lines (code):** 38-40

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include ulu.component-card-grid-get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  