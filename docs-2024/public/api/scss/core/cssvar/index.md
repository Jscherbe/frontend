---
title: Cssvar
sassdocGroupName: cssvar
---


# Cssvar

Provides support for custom-properties implementations



## Variables




###  $config {#variable-config} 

<small>Variable&ensp;|&ensp;Access: Public&ensp;|&ensp;Type: Map</small>

  

Module Settings
    
    

``` scss
$config: (
  "prefix" : ""
);
```
  

#### Details

- **File:** _cssvar.scss
- **Group:** cssvar
- **Type:** variable
- **Lines (comments):** 12-14
- **Lines (code):** 16-18
    
    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|prefix|String|""|Default prefix, will be added to all custom properties when using mixin or functions, unless overriden, set to empty quotes to disable|

    
  

## Mixins




###  set() {#mixin-set} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Change modules $config
    
    

#### Details

- **File:** _cssvar.scss
- **Group:** cssvar
- **Type:** mixin
- **Lines (comments):** 20-23
- **Lines (code):** 25-27
    
    

#### Examples

Setting the prefix to 'ulu'      


``` scss
@include cssvar.set(( "prefix" : "ulu" ));
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$config](/scss/core/breakpoint/#variable-config)
  


###  declare() {#mixin-declare} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Outputs a single custom property declaration
    
    

#### Details

- **File:** _cssvar.scss
- **Group:** cssvar
- **Type:** mixin
- **Lines (comments):** 67-74
- **Lines (code):** 76-78
    
    

#### Examples

Declare a custom property      


``` scss
:root {
  @include cssvar.declare("base-color", red);
}
```
  

      

#### Parameters


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|$name|`String`|Name of property||
|$value|`*`|The properties value to declare||
|$prefix|`String`|Override default prefix|$config.prefix|

    

#### Require

- [name()](/scss/core/cssvar/#function-name)
  


###  declare-all() {#mixin-declare-all} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Outputs a map as custom properties
    
    

#### Details

- **File:** _cssvar.scss
- **Group:** cssvar
- **Type:** mixin
- **Lines (comments):** 80-86
- **Lines (code):** 88-92
    
    

#### Examples

Declare each property in a map as a custom property      


``` scss
:root {
  @include cssvar.declare($colors);
}
```
  

      

#### Parameters


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|$props|`Map`|Properties to declare||
|$prefix|`String`|Override default prefix|$config.prefix|

    

#### Require

- [declare()](/scss/core/cssvar/#mixin-declare)
  


###  declare-breakpoint() {#mixin-declare-breakpoint} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Declare a custom property for current breakpoint
    
    

#### Details

- **File:** _cssvar.scss
- **Group:** cssvar
- **Type:** mixin
- **Lines (comments):** 94-102
- **Lines (code):** 104-116
    
    

#### Examples

Declare each property in a map as a custom property      


``` scss
:root {
  @include cssvar.declare-breakpoint();
}
```
  

      

#### Parameters


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|$breakpoints|`Map`|breakpoint.get-sizes()|Breakpoints to declare|
|$name|`String`|"breakpoint"|Name to use for custom property|
|$initial|`Map`|breakpoint.get("null-name")|The value for the custom property when not within breakpoint|
|$prefix|`String`|$config.prefix|Override default prefix|

    

#### Require

- [declare()](/scss/core/cssvar/#mixin-declare)
  
  

## Functions




###  get() {#function-get} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get a config option
    
    

#### Details

- **File:** _cssvar.scss
- **Group:** cssvar
- **Type:** function
- **Lines (comments):** 29-33
- **Lines (code):** 35-37
    
    

#### Examples

Getting the config value for prefix      


``` scss
$prefix: cssvar.get("prefix");
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of property|

    

#### Returns


|Type|Description|
|:--|:--|
|*|Map property value|

    

#### Require

- require-map-get()
- [$config](/scss/core/breakpoint/#variable-config)
  


###  name() {#function-name} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get a custom property name (with optional prefix)
    
    

#### Details

- **File:** _cssvar.scss
- **Group:** cssvar
- **Type:** function
- **Lines (comments):** 39-44
- **Lines (code):** 46-52
    
    

#### Examples

Getting a custom property name      


``` scss
#{ cssvar.name("base-color") } { ... }
```
  

      

#### Parameters


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|$name|`String`|Name of custom property||
|$prefix|`String`|Override default prefix|$config.prefix|

    

#### Returns


|Type|Description|
|:--|:--|
|String|The formatted property name (unquoted string)|

    


###  use() {#function-use} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Function to use a custom property within a declartion value 
    
    

#### Details

- **File:** _cssvar.scss
- **Group:** cssvar
- **Type:** function
- **Lines (comments):** 54-61
- **Lines (code):** 63-65
    
    

#### Examples

Print an custom property as a value      


``` scss
.test {
  color: cssvar.use("base-color");
}
```
  

      

#### Parameters


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|$name|`String`|Name of custom property||
|$prefix|`String`|Override default prefix|$config.prefix|

    

#### Returns


|Type|Description|
|:--|:--|
|String|Formatted custom propety for use in property value (ie. var(...))|

    

#### Require

- [name()](/scss/core/cssvar/#function-name)
  
  
  