---
title: Elements
sassdocGroupName: elements
---


# Elements





## Variables




###  $config {#variable-config} 

<small>Variable&ensp;|&ensp;Access: Public&ensp;|&ensp;Type: Map</small>

  

Module Settings
    
    

``` scss
$config: (
  "link" : true,
  "link:hover" : true,
  "link:visited" : false
);
```
  

#### Details

- **File:** _elements.scss
- **Group:** elements
- **Type:** variable
- **Lines (comments):** 15-17
- **Lines (code):** 19-23
    
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.links-state-styling|Number|Just color/defaults vs hover/visited/active|

    
  

## Mixins




###  set() {#mixin-set} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Change modules $config
    
    

#### Details

- **File:** _elements.scss
- **Group:** elements
- **Type:** mixin
- **Lines (comments):** 25-28
- **Lines (code):** 29-31
    
    

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

- [$config](/sass/base/elements/#variable-config)
  


###  base-elements-styles() {#mixin-base-elements-styles} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Prints elements base styles
    
    

#### Details

- **File:** _elements.scss
- **Group:** elements
- **Type:** mixin
- **Lines (comments):** 42-45
- **Lines (code):** 47-188
    
    

#### Examples

      


``` scss
@include ulu.base-elements-styles();
```
  

      

#### Require

- [get()](/sass/base/elements/#function-get)
  
  

## Functions




###  get() {#function-get} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get a config option
    
    

#### Details

- **File:** _elements.scss
- **Group:** elements
- **Type:** function
- **Lines (comments):** 33-36
- **Lines (code):** 38-40
    
    

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

- [$config](/sass/base/elements/#variable-config)
  
  
  