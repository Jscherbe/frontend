---
title: Image-grid
sassdocGroupName: image-grid
---


# Image-grid





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
  "breakpoint": "small",
  "gap":        3px,
  "min-width":  math.div(100%, 3)
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _image-grid.scss
- **Group:** image-grid
- **Type:** variable
- **Lines (comments):** 13-17
- **Lines (code):** 19-23
    </details>
    

#### Map Properties


|Name|Type|Default|
|:--|:--|:--|
|breakpoint|Map|"small"|
|gap|Map|3px|
|min-width|Map|math.div(100%, 3)|

    
  

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
- **File:** _image-grid.scss
- **Group:** image-grid
- **Type:** mixin
- **Lines (comments):** 25-27
- **Lines (code):** 29-31
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
- **File:** _image-grid.scss
- **Group:** image-grid
- **Type:** mixin
- **Lines (comments):** 41-43
- **Lines (code):** 45-69
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
- **File:** _image-grid.scss
- **Group:** image-grid
- **Type:** function
- **Lines (comments):** 33-35
- **Lines (code):** 37-39
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  