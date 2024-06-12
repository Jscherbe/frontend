---
title: Ratio-box
sassdocGroupName: ratio-box
---


# Ratio-box

Uses padding trick to keep ratio. Defaults to 4:3 (standard). Used for responsive iframe or images (object-fit), etc



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
  "size" : 75%,
  "sizes" : (
    "16x9" : 56.25%,
    "9x16" : 177.77%,
    "3x4" : 133.33%
  )
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _ratio-box.scss
- **Group:** ratio-box
- **Type:** variable
- **Lines (comments):** 10-13
- **Lines (code):** 14-21
    </details>
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.size|Number|Default height ratio (of width 100%)|
|$config.sizes|Number|Other ratios to add (apply with modifier class)|

    
  

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
- **File:** _ratio-box.scss
- **Group:** ratio-box
- **Type:** mixin
- **Lines (comments):** 23-26
- **Lines (code):** 28-30
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

- [$config](/sass/components/adaptive-spacing/#variable-config)
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints ratio box component styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _ratio-box.scss
- **Group:** ratio-box
- **Type:** mixin
- **Lines (comments):** 40-42
- **Lines (code):** 44-63
    </details>
    

#### Examples

      


``` scss
@include ulu.component-ratio-box-styles();
```
  

      

#### Require

- [get()](/sass/components/adaptive-spacing/#function-get)
  
  

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
- **File:** _ratio-box.scss
- **Group:** ratio-box
- **Type:** function
- **Lines (comments):** 32-34
- **Lines (code):** 36-38
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/adaptive-spacing/#variable-config)
  
  
  