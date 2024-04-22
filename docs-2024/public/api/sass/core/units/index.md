---
title: Units
sassdocGroupName: units
---


# Units





## Variables




###  $config {#variable-config} 

<small>Variable&ensp;|&ensp;Access: Public&ensp;|&ensp;Type: Map</small>

  

Module Settings
    
    

``` scss
$config: (
  "small-x" : 1rem * 0.5,
  "small" : 1rem * 0.75,
  "default" : 1rem,
  "large" : 1rem * 2,
  "large-x" : 1rem * 3,
  "large-xx" : 1rem * 4
);
```
  

#### Details

- **File:** _units.scss
- **Group:** units
- **Type:** variable
- **Lines (comments):** 9-16
- **Lines (code):** 18-25
    
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|small-x|Number||
|small|Number||
|default|Number|Base unit of measurent|
|large|Number||
|large-x|Number||
|large-xx|Number||

    
  

## Mixins




###  set() {#mixin-set} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Update the units config
    
    

#### Details

- **File:** _units.scss
- **Group:** units
- **Type:** mixin
- **Lines (comments):** 27-32
- **Lines (code):** 34-36
    
    

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

- [$config](/api/sass/core/breakpoint/#variable-config)
  
  

## Functions




###  get() {#function-get} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get a unit by name (preset) or number (multiplier of base)
    
    

#### Details

- **File:** _units.scss
- **Group:** units
- **Type:** function
- **Lines (comments):** 38-40
- **Lines (code):** 42-47
    
    

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
- [$config](/api/sass/core/breakpoint/#variable-config)
  
  
  