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
- **Lines (comments):** 10-11
- **Lines (code):** 13-18
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
- **File:** _card-grid.scss
- **Group:** card-grid
- **Type:** mixin
- **Lines (comments):** 20-22
- **Lines (code):** 24-26
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
- **Lines (comments):** 36-38
- **Lines (code):** 40-62
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
- **Lines (comments):** 28-30
- **Lines (code):** 32-34
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  