---
title: Cssvar
sassdocGroupName: cssvar
---


# Cssvar

Provides support for custom-properties implementations



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
  "prefix" : ""
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _cssvar.scss
- **Group:** cssvar
- **Type:** variable
- **Lines (comments):** 12-14
- **Lines (code):** 16-18
    </details>
    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|prefix|String|""|Default prefix, will be added to all custom properties when using mixin or functions, unless overriden, set to empty quotes to disable|

    
  

## Mixins




<div class="sassdoc-item-header">

###  set() {#mixin-set}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Change modules $config
    
    

    <details>
      <summary>File Information</summary>
- **File:** _cssvar.scss
- **Group:** cssvar
- **Type:** mixin
- **Lines (comments):** 20-23
- **Lines (code):** 25-27
    </details>
    

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

- [$config](/sass/core/breakpoint/#variable-config)
  


<div class="sassdoc-item-header">

###  declare() {#mixin-declare}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Outputs a single custom property declaration
    
    

    <details>
      <summary>File Information</summary>
- **File:** _cssvar.scss
- **Group:** cssvar
- **Type:** mixin
- **Lines (comments):** 67-74
- **Lines (code):** 76-78
    </details>
    

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

- [name()](/sass/core/cssvar/#function-name)
  


<div class="sassdoc-item-header">

###  declare-all() {#mixin-declare-all}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Outputs a map as custom properties
    
    

    <details>
      <summary>File Information</summary>
- **File:** _cssvar.scss
- **Group:** cssvar
- **Type:** mixin
- **Lines (comments):** 80-86
- **Lines (code):** 88-92
    </details>
    

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

- [declare()](/sass/core/cssvar/#mixin-declare)
  


<div class="sassdoc-item-header">

###  declare-breakpoint() {#mixin-declare-breakpoint}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Declare a custom property for current breakpoint
    
    

    <details>
      <summary>File Information</summary>
- **File:** _cssvar.scss
- **Group:** cssvar
- **Type:** mixin
- **Lines (comments):** 94-102
- **Lines (code):** 104-116
    </details>
    

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

- [declare()](/sass/core/cssvar/#mixin-declare)
  
  

## Functions




<div class="sassdoc-item-header">

###  get() {#function-get}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Get a config option
    
    

    <details>
      <summary>File Information</summary>
- **File:** _cssvar.scss
- **Group:** cssvar
- **Type:** function
- **Lines (comments):** 29-33
- **Lines (code):** 35-37
    </details>
    

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
- [$config](/sass/core/breakpoint/#variable-config)
  


<div class="sassdoc-item-header">

###  name() {#function-name}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Get a custom property name (with optional prefix)
    
    

    <details>
      <summary>File Information</summary>
- **File:** _cssvar.scss
- **Group:** cssvar
- **Type:** function
- **Lines (comments):** 39-44
- **Lines (code):** 46-52
    </details>
    

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

    


<div class="sassdoc-item-header">

###  use() {#function-use}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Function to use a custom property within a declartion value 
    
    

    <details>
      <summary>File Information</summary>
- **File:** _cssvar.scss
- **Group:** cssvar
- **Type:** function
- **Lines (comments):** 54-61
- **Lines (code):** 63-65
    </details>
    

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

- [name()](/sass/core/cssvar/#function-name)
  
  
  