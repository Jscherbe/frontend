---
title: Selector
sassdocGroupName: selector
---


# Selector





## Variables




<div class="sassdoc-item-header">

###  $config {#variable-config}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span> <span class="tag"><strong>Type</strong>: Map</span>
  </div>

</div>

  

Module Settings
- This module can be used for dynamic classnames (used in base and some components). Some components selectors are too complex or coupled for dynamic classnames. 
    
    

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
- **Lines (comments):** 9-13
- **Lines (code):** 15-17
    </details>
    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|prefix|String|""|Global prefix for selectors (would be used for classname prefix for example)|

    

#### Todos

- See about documenting when a component doesn't run through the selecotr module to get it's base classname
    
  

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
- **Lines (comments):** 23-26
- **Lines (code):** 27-29
    </details>
    

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

- [$config](/sass/core/breakpoint/#variable-config)
  


<div class="sassdoc-item-header">

###  set-class-overrides() {#mixin-set-class-overrides}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Set the class selector overrides
    
    

    <details>
      <summary>File Information</summary>
- **File:** _selector.scss
- **Group:** selector
- **Type:** mixin
- **Lines (comments):** 40-41
- **Lines (code):** 43-53
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Changes to merge|

    
  

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
- **Lines (comments):** 31-34
- **Lines (code):** 36-38
    </details>
    

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
- **Lines (comments):** 55-57
- **Lines (code):** 59-70
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$class|`String`|The classname to set|

    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
  
  
  