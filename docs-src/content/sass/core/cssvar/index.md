---
title: Cssvar
sassdocGroupName: cssvar
---


# Cssvar

<div class="type-large">

Provides support for custom-properties implementations

</div>



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
- **Lines (comments):** 14-16
- **Lines (code):** 18-20

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|prefix|String|""|Default prefix, will be added to all custom properties when using mixin or functions, unless overridden, set to empty quotes to disable|

    
  

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
- **Lines (comments):** 22-25
- **Lines (code):** 27-29

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
- **Lines (comments):** 74-81
- **Lines (code):** 83-85

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
- **Lines (comments):** 87-93
- **Lines (code):** 95-99

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
- **Lines (comments):** 101-109
- **Lines (code):** 111-123

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
  


<div class="sassdoc-item-header">

###  declare-breakpoint-sizes() {#mixin-declare-breakpoint-sizes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Declare a custom property for each breakpoint size
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _cssvar.scss
- **Group:** cssvar
- **Type:** mixin
- **Lines (comments):** 125-132
- **Lines (code):** 134-145

</details>

    

#### Examples

Declare each property in a map as a custom property      


``` scss
:root {
  @include cssvar.declare-breakpoint-sizes();
}
```
  



      

#### Parameters


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|$breakpoints|`Map`|breakpoint.get-sizes()|Breakpoints to declare|
|$name|`String`|"breakpoint-size-"|Name to use for custom property (prefixes size name)|
|$prefix|`String`|$config.prefix|Override default prefix|

    

#### Require

- [declare()](/sass/core/cssvar/#mixin-declare)
- [get-size-value()](/sass/core/breakpoint/#function-get-size-value)
  


<div class="sassdoc-item-header">

###  declare-theme-values() {#mixin-declare-theme-values}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Outputs css vars for a specific type from a theme map
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _cssvar.scss
- **Group:** cssvar
- **Type:** mixin
- **Lines (comments):** 147-168
- **Lines (code):** 170-177

</details>

    

#### Examples

Example of theme map and usage      


``` scss
// Defining a map to hold my color theme values
$color-themes: (
  "color-button" : (
    "light" : blue,
    "dark" : red
  ), ...
);

// Declaring default theme
:root {
  @include ulu.cssvar-declare-theme-values($color-themes, "light");
}

// Creating class to use on body/other elements to switch to dark theme
.theme-dark {
  @include ulu.cssvar-declare-theme-values($color-themes, "dark");
}
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$theme|`Map`|The map containing the values. Example (|
|$key|`String`|The key used to retrieve values from the map.|
|$prefix|`String`|The optional prefix for CSS variables.|

    

#### Require

- [declare()](/sass/core/cssvar/#mixin-declare)
- [get()](/sass/core/breakpoint/#function-get)
  
  

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
- **Lines (comments):** 31-35
- **Lines (code):** 37-39

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
- **Lines (comments):** 41-46
- **Lines (code):** 48-54

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

  

Function to use a custom property within a declaration value 
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _cssvar.scss
- **Group:** cssvar
- **Type:** function
- **Lines (comments):** 56-64
- **Lines (code):** 66-72

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
|$default-value|`String`|Provide a default value for var()|null|
|$prefix|`String`|Override default prefix|$config.prefix|

    

#### Returns


|Type|Description|
|:--|:--|
|String|Formatted custom property for use in property value (ie. var(...))|

    

#### Require

- [name()](/sass/core/cssvar/#function-name)
  


<div class="sassdoc-item-header">

###  join() {#function-join}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Joins a list of cssvar names
- Use to "+", "-" and then use in calc
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _cssvar.scss
- **Group:** cssvar
- **Type:** function
- **Lines (comments):** 179-183
- **Lines (code):** 185-191

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$names|`List`|list of names (string), like if using use|
|$separator|`String`|Separator to use when joining custom property var statements|

    

#### Returns


|Type|Description|
|:--|:--|
|String|For example if separator was "+" would result in "var(--some-prop) + var(--another-prop)"|

    

#### Require

- [use()](/sass/core/cssvar/#function-use)
- list-join()
  


<div class="sassdoc-item-header">

###  add() {#function-add}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

For any names passed will join them with "+" and wrap in calc
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _cssvar.scss
- **Group:** cssvar
- **Type:** function
- **Lines (comments):** 193-195
- **Lines (code):** 197-199

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name string (pass multiple comma separated)|

    

#### Returns


|Type|Description|
|:--|:--|
|String|A string like "calc(var(--some-prop) + var(--another-prop))"|

    

#### Require

- [join()](/sass/core/cssvar/#function-join)
  


<div class="sassdoc-item-header">

###  subtract() {#function-subtract}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

For any names passed will join them with "-" and wrap in calc
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _cssvar.scss
- **Group:** cssvar
- **Type:** function
- **Lines (comments):** 201-203
- **Lines (code):** 205-207

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name string (pass multiple comma separated)|

    

#### Returns


|Type|Description|
|:--|:--|
|String|A string like "calc(var(--some-prop) - var(--another-prop))"|

    

#### Require

- [join()](/sass/core/cssvar/#function-join)
  
  
  