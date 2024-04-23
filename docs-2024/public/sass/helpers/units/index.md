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
  "sides": ("top", "bottom", "left", "right")
);
```
  

#### Details

- **File:** _units.scss
- **Group:** units
- **Type:** variable
- **Lines (comments):** 11-13
- **Lines (code):** 15-17
    
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.sides|Number|Sides to print for helper classes (ie. reduce output of uneeded sides)|

    
  

## Mixins




###  set() {#mixin-set} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Change modules $config
    
    

#### Details

- **File:** _units.scss
- **Group:** units
- **Type:** mixin
- **Lines (comments):** 19-22
- **Lines (code):** 23-25
    
    

#### Examples

General example, replace module-name with module's name      


``` scss
@include module-name.set(( "property" : value ));
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$config](/sass/helpers/units/#variable-config)
  


###  styles() {#mixin-styles} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Prints all unit helper classes
    
    

#### Details

- **File:** _units.scss
- **Group:** units
- **Type:** mixin
- **Lines (comments):** 36-36
- **Lines (code):** 38-42
    
    

#### Require

- [create-property-classes()](/sass/helpers/units/#mixin-create-property-classes)
  


###  create-property-classes() {#mixin-create-property-classes} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Creates the unit classes with all variations (from unit presets)
- This can be used by itself if not outputing .styles() or if you wanted to change the default prefixes
    
    

#### Details

- **File:** _units.scss
- **Group:** units
- **Type:** mixin
- **Lines (comments):** 44-45
- **Lines (code):** 46-75
    
    

#### Require

- [get()](/sass/helpers/units/#function-get)
- [$config](/sass/helpers/units/#variable-config)
  
  

## Functions




###  get() {#function-get} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get a config option
    
    

#### Details

- **File:** _units.scss
- **Group:** units
- **Type:** function
- **Lines (comments):** 27-30
- **Lines (code):** 32-34
    
    

#### Examples

General example, replace module-name with module's name      


``` scss
@include module-name.get("property");
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/helpers/units/#variable-config)
  
  
  