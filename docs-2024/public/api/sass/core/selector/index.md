---
title: Selector
sassdocGroupName: selector
---


# Selector





## Variables




###  $config {#variable-config} 

<small>Variable&ensp;|&ensp;Access: Public&ensp;|&ensp;Type: Map</small>

  

Module Settings
- This module can be used for dynamic classnames (used in base and some components). Some components selectors are too complex or coupled for dynamic classnames. 
    
    

``` scss
$config: (
  "prefix" : ""
);
```
  

#### Details

- **File:** _selector.scss
- **Group:** selector
- **Type:** variable
- **Lines (comments):** 9-13
- **Lines (code):** 15-17
    
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.prefix|String|Global prefix for selectors (would be used for classname prefix for example)|

    

#### Todos

- See about documenting when a component doesn't run through the selecotr module to get it's base classname
    
  

## Mixins




###  set() {#mixin-set} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Change modules $config
    
    

#### Details

- **File:** _selector.scss
- **Group:** selector
- **Type:** mixin
- **Lines (comments):** 23-26
- **Lines (code):** 27-29
    
    

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

- [$config](/api/sass/core/breakpoint/#variable-config)
  


###  set-class-overrides() {#mixin-set-class-overrides} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Set the class selector overrides
    
    

#### Details

- **File:** _selector.scss
- **Group:** selector
- **Type:** mixin
- **Lines (comments):** 40-41
- **Lines (code):** 43-53
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Changes to merge|

    
  

## Functions




###  get() {#function-get} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get a config option
    
    

#### Details

- **File:** _selector.scss
- **Group:** selector
- **Type:** function
- **Lines (comments):** 31-34
- **Lines (code):** 36-38
    
    

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

- require-map-get()
- [$config](/api/sass/core/breakpoint/#variable-config)
  


###  class() {#function-class} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Used to allow global prefixing of classes, and also the ability to 
Change a class used in the system (ie. like a component for example)
    
    

#### Details

- **File:** _selector.scss
- **Group:** selector
- **Type:** function
- **Lines (comments):** 55-57
- **Lines (code):** 59-70
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$class|`String`|The classname to set|

    

#### Require

- [get()](/api/sass/core/breakpoint/#function-get)
  
  
  