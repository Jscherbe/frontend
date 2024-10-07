---
title: Card-grid
sassdocGroupName: card-grid
---


# Card-grid





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
  "compact-gap" : 1rem,
  "template-columns" : 1fr 1fr,
  "compact-template-columns" : 1fr 1fr 1fr,
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _card-grid.scss
- **Group:** card-grid
- **Type:** variable
- **Lines (comments):** 10-15
- **Lines (code):** 17-23
    </details>
    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|gap|Dimension|2rem|The grid gap of the card-grid.|
|compact-gap|Dimension|1rem|The grid gap of the card-grid--compact.|
|template-columns|CssValue|1fr 1fr|The template-columns of the card-grid.|
|compact-template-columns|CssValue|1fr 1fr 1fr|The template-columns of the card-grid--compact.|

    
  

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
- **Lines (comments):** 25-27
- **Lines (code):** 29-31
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
- **File:** _card-grid.scss
- **Group:** card-grid
- **Type:** mixin
- **Lines (comments):** 41-43
- **Lines (code):** 45-69
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
- **File:** _card-grid.scss
- **Group:** card-grid
- **Type:** function
- **Lines (comments):** 33-35
- **Lines (code):** 37-39
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  