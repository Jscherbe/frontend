---
title: Horizontal-rule
sassdocGroupName: horizontal-rule
---


# Horizontal-rule

<div class="type-large">



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
  "margin": 1em,
  "min-height": 1em,
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _horizontal-rule.scss
- **Group:** horizontal-rule
- **Type:** variable
- **Lines (comments):** 9-12
- **Lines (code):** 14-17

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|min-height|Dimension|1em|Min height for rule.|
|margin|Dimension|1em|Top and bottom margin for rule.|

    
  

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
  
- **File:** _horizontal-rule.scss
- **Group:** horizontal-rule
- **Type:** mixin
- **Lines (comments):** 19-22
- **Lines (code):** 24-26

</details>

    

#### Examples

      


``` scss
@include ulu.component-horizontal-rule-set(( "property" : value ));
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

  

Prints adaptive spacing component styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _horizontal-rule.scss
- **Group:** horizontal-rule
- **Type:** mixin
- **Lines (comments):** 37-39
- **Lines (code):** 41-51

</details>

    

#### Examples

      


``` scss
@include ulu.component-horizontal-styles();
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
  
- **File:** _horizontal-rule.scss
- **Group:** horizontal-rule
- **Type:** function
- **Lines (comments):** 28-31
- **Lines (code):** 33-35

</details>

    

#### Examples

      


``` scss
@include ulu.component-horizontal-rule-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  