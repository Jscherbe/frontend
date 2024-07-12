---
title: Nav-strip
sassdocGroupName: nav-strip
---


# Nav-strip





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
  "color" : null,
  "color-hover" : null,
  "color-active" : null,
  "font-weight" : null,
  "padding-x" : 0,
  "padding-y" : 0.3em,
  "underline-color" : orange,
  "underline-size" : 3px,
  "margin-between" : 2.25em,
  "underline-color-hover" : gray,
  "activeSelector" : ".is-active",
  "rule-size" : 3px,
  "rule-color" : "rule",
  "rule-offset" : -3px,
  "padding-y-ruled" : null,
  "nowrap" : true
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _nav-strip.scss
- **Group:** nav-strip
- **Type:** variable
- **Lines (comments):** 13-14
- **Lines (code):** 16-33
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
- **File:** _nav-strip.scss
- **Group:** nav-strip
- **Type:** mixin
- **Lines (comments):** 36-38
- **Lines (code):** 40-42
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
- **File:** _nav-strip.scss
- **Group:** nav-strip
- **Type:** mixin
- **Lines (comments):** 52-54
- **Lines (code):** 56-126
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
- **File:** _nav-strip.scss
- **Group:** nav-strip
- **Type:** function
- **Lines (comments):** 44-46
- **Lines (code):** 48-50
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  