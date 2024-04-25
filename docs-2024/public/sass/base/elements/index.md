---
title: Elements
sassdocGroupName: elements
---


# Elements





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
  "link" : true,
  "link:hover" : true,
  "link:visited" : false
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _elements.scss
- **Group:** elements
- **Type:** variable
- **Lines (comments):** 15-17
- **Lines (code):** 19-23
    </details>
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.links-state-styling|Number|Just color/defaults vs hover/visited/active|

    
  

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
- **File:** _elements.scss
- **Group:** elements
- **Type:** mixin
- **Lines (comments):** 25-28
- **Lines (code):** 29-31
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

- [$config](/sass/base/elements/#variable-config)
  


<div class="sassdoc-item-header">

###  base-elements-styles() {#mixin-base-elements-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints elements base styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _elements.scss
- **Group:** elements
- **Type:** mixin
- **Lines (comments):** 42-45
- **Lines (code):** 47-190
    </details>
    

#### Examples

      


``` scss
@include ulu.base-elements-styles();
```
  

      

#### Require

- [get()](/sass/base/elements/#function-get)
  
  

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
- **File:** _elements.scss
- **Group:** elements
- **Type:** function
- **Lines (comments):** 33-36
- **Lines (code):** 38-40
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

- [$config](/sass/base/elements/#variable-config)
  
  
  