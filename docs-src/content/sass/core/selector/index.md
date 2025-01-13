---
title: Selector
sassdocGroupName: selector
---


# Selector

<div class="type-large">

This module is used to alter selectors for components

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
  
- **File:** _selector.scss
- **Group:** selector
- **Type:** variable
- **Lines (comments):** 10-12
- **Lines (code):** 14-16

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|prefix|String|""|Global prefix for selectors (would be used for classname prefix for example)|

    
  

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
  
- **File:** _selector.scss
- **Group:** selector
- **Type:** mixin
- **Lines (comments):** 24-27
- **Lines (code):** 28-30

</details>

    

#### Examples

General example      


``` scss
@include selector.set(( "property" : value ));
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$config](/sass/core/breakpoint/#variable-config)
  


<div class="sassdoc-item-header">

###  set-class-overrides() {#mixin-set-class-overrides}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Set the class selector overrides
- When a component or user module that is using selector module requests a classname any changes passed here will override the default selector
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _selector.scss
- **Group:** selector
- **Type:** mixin
- **Lines (comments):** 41-48
- **Lines (code):** 50-60

</details>

    

#### Examples

Changing the color-context classname to background and all typography base/utility classes to 'text' using wildcard      


``` scss
@include ulu.selector-set-class-overrides((
  "color-context" : "background",
  "type*" : "text"
));
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Changes to merge map of classnames to classname change|

    
  

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
  
- **File:** _selector.scss
- **Group:** selector
- **Type:** function
- **Lines (comments):** 32-35
- **Lines (code):** 37-39

</details>

    

#### Examples

General example      


``` scss
@include selector.get("property");
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- require-map-get()
- [$config](/sass/core/breakpoint/#variable-config)
  


<div class="sassdoc-item-header">

###  class() {#function-class}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Used to allow global prefixing of classes, and also the ability to 
Change a class used in the system (ie. like a component for example)
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _selector.scss
- **Group:** selector
- **Type:** function
- **Lines (comments):** 62-64
- **Lines (code):** 66-77

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$class|`String`|The base classname to get (which is then returned modified if the user has adjusted that specific classname|

    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
  
  
  