---
title: Calculate
sassdocGroupName: calculate
---


# Calculate





## Variables




###  $config {#variable-config} 

<small>Variable&ensp;|&ensp;Access: Public&ensp;|&ensp;Type: Map</small>

  

Module Settings
    
    

``` scss
$config: (
  "responsive-change": 0.5vw
);
```
  

#### Details

- **File:** _calculate.scss
- **Group:** calculate
- **Type:** variable
- **Lines (comments):** 9-11
- **Lines (code):** 13-15
    
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.responsive-change|Number|Default responsive amount to modify items using responsive-property mixin|

    
  

## Mixins




###  set() {#mixin-set} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Change modules $config
    
    

#### Details

- **File:** _calculate.scss
- **Group:** calculate
- **Type:** mixin
- **Lines (comments):** 17-19
- **Lines (code):** 20-22
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/sass/core/breakpoint/#variable-config)
  


###  responsive-property() {#mixin-responsive-property} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Provides user with a fallback for a calc that's just an enhancement
    
    

#### Details

- **File:** _calculate.scss
- **Group:** calculate
- **Type:** mixin
- **Lines (comments):** 52-55
- **Lines (code):** 57-64
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$property|`String`|The CSS property to set|
|$value|`*`|The value to set on the property|
|$responsive-change|`Css`|The amount to change (vw or vh units) (combined with unit past)|

    
  

## Functions




###  get() {#function-get} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get a config option
    
    

#### Details

- **File:** _calculate.scss
- **Group:** calculate
- **Type:** function
- **Lines (comments):** 24-26
- **Lines (code):** 28-30
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- require-map-get()
- [$config](/sass/core/breakpoint/#variable-config)
  


###  ratio-scale-size() {#function-ratio-scale-size} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Calculate the size of something at a given scale (percentage/exponential)
    
    

#### Details

- **File:** _calculate.scss
- **Group:** calculate
- **Type:** function
- **Lines (comments):** 32-37
- **Lines (code):** 39-41
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$base|`Number`|The number the scale starts at|
|$ratio|`Number`|The amount the scale changes over one set|
|$sizes|`Number`|The number of steps in the scale|
|$size|`Number`|The step you are trying to calculate|

    

#### Returns


|Type|
|:--|
|Number|

    

#### Require

- [$sizes](/sass/core/breakpoint/#variable-sizes)
  


###  pixel-to-em() {#function-pixel-to-em} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Convert from pixel to em
    
    

#### Details

- **File:** _calculate.scss
- **Group:** calculate
- **Type:** function
- **Lines (comments):** 43-46
- **Lines (code):** 48-50
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$pixels|`Number`|The number the scale starts at|
|$base|`Number`|How many pixels equal 1em|

    

#### Returns


|Type|Description|
|:--|:--|
|Number|Em Conversion|

    
  
  