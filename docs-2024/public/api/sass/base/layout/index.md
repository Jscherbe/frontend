---
title: Layout
sassdocGroupName: layout
---


# Layout





## Variables




###  $config {#variable-config} 

<small>Variable&ensp;|&ensp;Access: Public&ensp;|&ensp;Type: Map</small>

  

Module Settings
    
    

``` scss
$config: (
  "containers" : true,
  "container-nested-no-padding" : false,
  "layout-flex" : true,
);
```
  

#### Details

- **File:** _layout.scss
- **Group:** layout
- **Type:** variable
- **Lines (comments):** 10-12
- **Lines (code):** 14-18
    
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.sides|Number|Sides to print for helper classes (ie. reduce output of uneeded sides)|

    
  

## Mixins




###  set() {#mixin-set} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Change modules $config
    
    

#### Details

- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 20-23
- **Lines (code):** 24-26
    
    

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

- [$config](/api/sass/base/elements/#variable-config)
  


###  styles() {#mixin-styles} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Output Styles 
    
    

#### Details

- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 37-37
- **Lines (code):** 39-100
    
    

#### Require

- [get()](/api/sass/base/elements/#function-get)
  
  

## Functions




###  get() {#function-get} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get a config option
    
    

#### Details

- **File:** _layout.scss
- **Group:** layout
- **Type:** function
- **Lines (comments):** 28-31
- **Lines (code):** 33-35
    
    

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

- [$config](/api/sass/base/elements/#variable-config)
  
  
  