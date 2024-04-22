---
title: Rule
sassdocGroupName: rule
---


# Rule





## Variables




###  $config {#variable-config} 

<small>Variable&ensp;|&ensp;Access: Public&ensp;|&ensp;Type: Map</small>

  

Module Settings
    
    

``` scss
$config: (
  "short-width" : 2.75rem,
  "short-border-width" : 4px,
  "short-modifiers" : false
);
```
  

#### Details

- **File:** _rule.scss
- **Group:** rule
- **Type:** variable
- **Lines (comments):** 11-14
- **Lines (code):** 16-20
    
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.short-width|Number|Short rule width (like an inline rule, normally used above headings), Setting this to false will disable output|
|$config.short-border-width|Number|Short rule width of border|

    
  

## Mixins




###  set() {#mixin-set} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Change modules $config
    
    

#### Details

- **File:** _rule.scss
- **Group:** rule
- **Type:** mixin
- **Lines (comments):** 22-25
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

- [$config](/api/sass/components/badge/#variable-config)
  


###  styles() {#mixin-styles} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Output styles
    
    

#### Details

- **File:** _rule.scss
- **Group:** rule
- **Type:** mixin
- **Lines (comments):** 40-40
- **Lines (code):** 42-93
    
    

#### Require

- [get()](/api/sass/components/badge/#function-get)
  
  

## Functions




###  get() {#function-get} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get a config option
    
    

#### Details

- **File:** _rule.scss
- **Group:** rule
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

- [$config](/api/sass/components/badge/#variable-config)
  
  
  