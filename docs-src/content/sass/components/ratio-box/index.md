---
title: Ratio-box
sassdocGroupName: ratio-box
---


# Ratio-box

<div class="type-large">

Uses padding trick to keep ratio. Defaults to 4:3 (standard). Used for responsive iframe or images (object-fit), etc

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
- **Lines (code):** 15-22

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
- **Lines (comments):** 24-27
- **Lines (code):** 29-31

</details>

    

#### Examples

      


``` scss
@include ulu.component-ratio-box-set(( "property" : value ));
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

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
- **Lines (comments):** 42-44
- **Lines (code):** 46-61

</details>

    

#### Examples

      


``` scss
@include ulu.component-ratio-box-styles();
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
- **Lines (comments):** 33-36
- **Lines (code):** 38-40

</details>

    

#### Examples

      


``` scss
@include ulu.component-ratio-box-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  