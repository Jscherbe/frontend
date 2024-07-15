---
title: Callout
sassdocGroupName: callout
---


# Callout





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
  "padding" : 1.5rem,
  "margin" : 2rem,
  "border" : true,
  "border-radius" :  true,
  "box-shadow" : none,
  "background-color" : rgb(240, 240, 240)
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _callout.scss
- **Group:** callout
- **Type:** variable
- **Lines (comments):** 24-25
- **Lines (code):** 27-34
    </details>
    
  

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
- **File:** _callout.scss
- **Group:** callout
- **Type:** mixin
- **Lines (comments):** 56-58
- **Lines (code):** 60-62
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  set-styles() {#mixin-set-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Set callout styles 
    
    

    <details>
      <summary>File Information</summary>
- **File:** _callout.scss
- **Group:** callout
- **Type:** mixin
- **Lines (comments):** 73-75
- **Lines (code):** 77-79
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|
|$merge-mode|`String`|Merge mode see utils.map-merge() [null|"deep"|"overwrite"]|

    


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints component styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _callout.scss
- **Group:** callout
- **Type:** mixin
- **Lines (comments):** 81-83
- **Lines (code):** 85-113
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
- **File:** _callout.scss
- **Group:** callout
- **Type:** function
- **Lines (comments):** 64-66
- **Lines (code):** 68-71
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  