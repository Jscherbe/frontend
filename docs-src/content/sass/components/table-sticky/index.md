---
title: Table-sticky
sassdocGroupName: table-sticky
---


# Table-sticky

<div class="type-large">

For use with table-sticky plugin (vue) or other framework implementations, not output by default must be enabled.

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
  "box-shadow": true,
  "ui-color-disabled": #6490af,
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _table-sticky.scss
- **Group:** table-sticky
- **Type:** variable
- **Lines (comments):** 23-25
- **Lines (code):** 27-30

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|box-shadow|CssValue|true|Box shadow for controls, defaults to element box-shadow|

    
  

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
  
- **File:** _table-sticky.scss
- **Group:** table-sticky
- **Type:** mixin
- **Lines (comments):** 32-35
- **Lines (code):** 37-39

</details>

    

#### Examples

      


``` scss
@include ulu.component-table-sticky-set(( "property" : value ));
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
  
- **File:** _table-sticky.scss
- **Group:** table-sticky
- **Type:** mixin
- **Lines (comments):** 50-53
- **Lines (code):** 55-183

</details>

    


<div class="callout callout--demo crop-margins">

#### Demo



<a class="button" href="/demos/table-sticky">View</a>

</div>



#### Examples

      


``` scss
@include ulu.component-table-sticky-styles();
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
  
- **File:** _table-sticky.scss
- **Group:** table-sticky
- **Type:** function
- **Lines (comments):** 41-44
- **Lines (code):** 46-49

</details>

    

#### Examples

      


``` scss
@include ulu.component-table-sticky-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  