---
title: Units
sassdocGroupName: units
---


# Units

<div class="type-large">

Output unit helper stylesheet

</div>



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
  
- **File:** _units.scss
- **Group:** units
- **Type:** mixin
- **Lines (comments):** 20-23
- **Lines (code):** 25-27

</details>

    

#### Examples

General example      


``` scss
@include ulu.helper-units-set(( "property" : value ));
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$config](/sass/helpers/units/#variable-config)
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Output all unit helper classes
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _units.scss
- **Group:** units
- **Type:** mixin
- **Lines (comments):** 38-38
- **Lines (code):** 40-44

</details>

    

#### Require

- [create-property-classes()](/sass/helpers/units/#mixin-create-property-classes)
  


<div class="sassdoc-item-header">

###  create-property-classes() {#mixin-create-property-classes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Creates the unit classes with all variations (from unit presets)
- This can be used by itself if not outputting .styles() or if you wanted to change the default prefixes
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _units.scss
- **Group:** units
- **Type:** mixin
- **Lines (comments):** 46-47
- **Lines (code):** 49-72

</details>

    

#### Require

- [get()](/sass/helpers/units/#function-get)
- [$config](/sass/helpers/units/#variable-config)
  
  

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
  
- **File:** _units.scss
- **Group:** units
- **Type:** function
- **Lines (comments):** 29-32
- **Lines (code):** 34-36

</details>

    

#### Examples

General example      


``` scss
@include ulu.helper-units-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/helpers/units/#variable-config)
  
  

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
  "sides": ("top", "bottom", "left", "right")
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _units.scss
- **Group:** units
- **Type:** variable
- **Lines (comments):** 12-14
- **Lines (code):** 16-18

</details>

    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.sides|Number|Sides to print for helper classes (ie. reduce output of unneeded sides)|

    
  
  