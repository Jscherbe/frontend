---
title: Layout
sassdocGroupName: layout
---


# Layout





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
  "containers" : true,
  "container-nested-no-padding" : false,
  "layout-flex" : true,
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _layout.scss
- **Group:** layout
- **Type:** variable
- **Lines (comments):** 10-12
- **Lines (code):** 14-18
    </details>
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.sides|Number|Sides to print for helper classes (ie. reduce output of uneeded sides)|

    
  

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
- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 20-23
- **Lines (code):** 24-26
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

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Output Styles 
    
    

    <details>
      <summary>File Information</summary>
- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 37-37
- **Lines (code):** 39-100
    </details>
    

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
- **File:** _layout.scss
- **Group:** layout
- **Type:** function
- **Lines (comments):** 28-31
- **Lines (code):** 33-35
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
  
  
  