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
- **Lines (comments):** 10-15
- **Lines (code):** 17-21
    </details>
    

#### Map Properties


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|$config.sides|Number|Sides to print for helper classes (ie. reduce output of uneeded sides)||
|containers|Boolean|Enables container styling.|true|
|container-nested-no-padding|Boolean|Toggles whether nested receive horizontal padding or not.|false|
|layout-flex|Boolean|Enables layout-flex styling.|true|

    
  

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
- **Lines (comments):** 40-40
- **Lines (code):** 42-103
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

- [$config](/sass/base/elements/#variable-config)
  
  
  