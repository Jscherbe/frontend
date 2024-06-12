---
title: List-lines
sassdocGroupName: list-lines
---


# List-lines





## Variables




<div class="sassdoc-item-header">

###  $config {#variable-config}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span>
  </div>

</div>

  

Module Config
    
    

``` scss
$config: (
  "border-first" : true,
  "border-last" : true,
  "margin-top": 0,
  "margin-bottom": 1em,
  "padding-between" : 1em
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _list-lines.scss
- **Group:** list-lines
- **Type:** variable
- **Lines (comments):** 12-12
- **Lines (code):** 14-20
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
- **File:** _list-lines.scss
- **Group:** list-lines
- **Type:** mixin
- **Lines (comments):** 22-24
- **Lines (code):** 26-28
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/sass/components/adaptive-spacing/#variable-config)
  


<div class="sassdoc-item-header">

###  inner-styles() {#mixin-inner-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Output component styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _list-lines.scss
- **Group:** list-lines
- **Type:** mixin
- **Lines (comments):** 38-38
- **Lines (code):** 40-60
    </details>
    

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
- **File:** _list-lines.scss
- **Group:** list-lines
- **Type:** function
- **Lines (comments):** 30-32
- **Lines (code):** 34-36
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/adaptive-spacing/#variable-config)
  
  
  