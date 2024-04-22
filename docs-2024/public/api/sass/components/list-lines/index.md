---
title: List-lines
sassdocGroupName: list-lines
---


# List-lines





## Variables




###  $config {#variable-config} 

<small>Variable&ensp;|&ensp;Access: Public</small>

  

Module Config
    
    

``` scss
$config: (
  "border-first" : true,
  "border-last" : true,
  "margin-top": 0,
  "margin-bottom": 1em,
  "padding-between" : 1em
);
```
  

#### Details

- **File:** _list-lines.scss
- **Group:** list-lines
- **Type:** variable
- **Lines (comments):** 12-12
- **Lines (code):** 14-20
    
    
  

## Mixins




###  set() {#mixin-set} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Change modules $config
    
    

#### Details

- **File:** _list-lines.scss
- **Group:** list-lines
- **Type:** mixin
- **Lines (comments):** 22-24
- **Lines (code):** 26-28
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/api/sass/components/badge/#variable-config)
  


###  inner-styles() {#mixin-inner-styles} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Output component styles
    
    

#### Details

- **File:** _list-lines.scss
- **Group:** list-lines
- **Type:** mixin
- **Lines (comments):** 38-38
- **Lines (code):** 40-60
    
    

#### Require

- [get()](/api/sass/components/badge/#function-get)
  
  

## Functions




###  get() {#function-get} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get a config option
    
    

#### Details

- **File:** _list-lines.scss
- **Group:** list-lines
- **Type:** function
- **Lines (comments):** 30-32
- **Lines (code):** 34-36
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/api/sass/components/badge/#variable-config)
  
  
  