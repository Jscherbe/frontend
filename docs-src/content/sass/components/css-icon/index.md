---
title: Css-icon
sassdocGroupName: css-icon
---


# Css-icon

Simple icons that only require CSS selectors, used for defaults (JS, etc). Not meant to be replacement for complete icon library



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
  "size" : 1.1em,
  "stroke-width" : 0.15em,
  "stroke-border-radius" : 1px,
  "color" : currentColor,
  "active-selector" : "details[open] > summary &, &.is-active",
  "transition-duration" : 200ms,
  "transition-timing-function" : ease-in
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _css-icon.scss
- **Group:** css-icon
- **Type:** variable
- **Lines (comments):** 13-14
- **Lines (code):** 16-24
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
- **File:** _css-icon.scss
- **Group:** css-icon
- **Type:** mixin
- **Lines (comments):** 26-28
- **Lines (code):** 30-32
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

  

Prints adaptive spacing component styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _css-icon.scss
- **Group:** css-icon
- **Type:** mixin
- **Lines (comments):** 48-50
- **Lines (code):** 52-311
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
- **File:** _css-icon.scss
- **Group:** css-icon
- **Type:** function
- **Lines (comments):** 34-36
- **Lines (code):** 38-40
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  