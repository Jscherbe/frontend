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
- **Lines (comments):** 9-12
- **Lines (code):** 14-21
    </details>
    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|size|Number|75%|Default height ratio (of width 100%)|
|sizes|Map|Map|Other ratios to add (apply with modifier class)|

    
  

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
- **Lines (comments):** 23-25
- **Lines (code):** 27-29
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints component styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _ratio-box.scss
- **Group:** ratio-box
- **Type:** mixin
- **Lines (comments):** 39-41
- **Lines (code):** 43-62
    </details>
    

#### Examples

      


``` scss
@include ulu.component-example-styles();
```
  

      

#### Require

- [get()](/sass/components/accordion/#function-get)
  
  

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
- **Lines (comments):** 31-33
- **Lines (code):** 35-37
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  