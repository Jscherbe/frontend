---
title: Accordion
sassdocGroupName: accordion
---


# Accordion





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
  "background-color":              white,
  "background-color-open":          #F7F8F7,
  "padding-x":                      1.5rem,
  "padding-y":                      1.5rem,
  "transparent-padding-y":          0.5rem,
  "transparent-padding-x":          0,
  "margin":                         3rem,
  "margin-between":                 0,
  "border-radius":                  0,
  "box-shadow":                     none,
  "border-color":                   "rule",
  "border":                         1px solid,
  "summary-color":                  inherit,
  "summary-type-size" :             false,
  "summary-color-hover":            inherit,
  "summary-padding-y":              1rem,
  "summary-background-color":     white,
  "summary-line-height":            inherit,
  "icon-color":                     "link",
  "icon-color-hover":               "link:hover",
  "icon-background-color" :         transparent,
  "icon-background-color-hover" :   transparent,
  "icon-border-radius" :            50%,
  "icon-size" :                     auto,
  "icon-font-size" :                1.5rem
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _accordion.scss
- **Group:** accordion
- **Type:** variable
- **Lines (comments):** 18-19
- **Lines (code):** 21-47
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
- **File:** _accordion.scss
- **Group:** accordion
- **Type:** mixin
- **Lines (comments):** 50-52
- **Lines (code):** 54-56
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
- **File:** _accordion.scss
- **Group:** accordion
- **Type:** mixin
- **Lines (comments):** 66-68
- **Lines (code):** 70-209
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
- **File:** _accordion.scss
- **Group:** accordion
- **Type:** function
- **Lines (comments):** 58-60
- **Lines (code):** 62-64
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  