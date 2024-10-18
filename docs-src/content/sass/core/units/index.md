---
title: Units
sassdocGroupName: units
---


# Units





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
  "default" : 1rem,
  "large" : 1rem * 2,
  "large-x" : 1rem * 3,
  "large-xx" : 1rem * 4,
  "small" : 1rem * 0.75,
  "small-x" : 1rem * 0.5,
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _units.scss
- **Group:** units
- **Type:** variable
- **Lines (comments):** 9-16
- **Lines (code):** 18-25
    </details>
    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|default|Number|1rem|Base unit of measurent|
|large|Number|1rem * 2||
|large-x|Number|1rem * 3||
|large-xx|Number|1rem * 4||
|small|Number|1rem * 0.75||
|small-x|Number|1rem * 0.5||

    
  

## Mixins




<div class="sassdoc-item-header">

###  set() {#mixin-set}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Update the units config
    
    

    <details>
      <summary>File Information</summary>
- **File:** _units.scss
- **Group:** units
- **Type:** mixin
- **Lines (comments):** 27-32
- **Lines (code):** 34-36
    </details>
    

#### Examples

Setting the error and type color      


``` scss
@include units.set((
  "default" : 1.5em
));
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|A map to merge into the color palette|

    

#### Require

- [$config](/sass/core/breakpoint/#variable-config)
  
  

## Functions




<div class="sassdoc-item-header">

###  get() {#function-get}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Get a unit by name (preset) or number (multiplier of base)
    
    

    <details>
      <summary>File Information</summary>
- **File:** _units.scss
- **Group:** units
- **Type:** function
- **Lines (comments):** 38-40
- **Lines (code):** 42-47
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$value|`Number|String`|if a number is passed it is used as a multiplier of the base, if a string is passed it is used to lookup a value from unit presets @see $config|

    

#### Returns


|Type|
|:--|
|Number|

    

#### Require

- require-map-get()
- [$config](/sass/core/breakpoint/#variable-config)
  
  
  