---
title: Pager
sassdocGroupName: pager
---


# Pager





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
  "font-weight":                   bold,
  "width":                         2.5rem,
  "margin-top":                    1rem,
  "margin-bottom":                 2rem,
  "item-margin":                   0.17rem,
  "color":                         white,
  "color-hover":                   white,
  "background-color":              "link",
  "background-color-hover":        "link:hover",
  "border-color":                  "link",
  "border-color-hover":            "link:hover",
  "border-width":                  1px,
  "border-radius":                 50%,
  "active-color":                  "type",
  "active-font-weight":            bold,
  "active-background-color":       #ccc,
  "active-border-color":           #ccc,
  "action-width":                  2.5rem,
  "action-margin":                 0.8rem,
  "action-color":                  white,
  "action-background-color":       "link",
  "action-background-color-hover": "link:hover",
  "action-border-color":           transparent,
  "action-border-color-hover":     "link",
  "action-color-hover":            white
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _pager.scss
- **Group:** pager
- **Type:** variable
- **Lines (comments):** 13-14
- **Lines (code):** 16-42
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
- **File:** _pager.scss
- **Group:** pager
- **Type:** mixin
- **Lines (comments):** 44-46
- **Lines (code):** 48-50
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
- **File:** _pager.scss
- **Group:** pager
- **Type:** mixin
- **Lines (comments):** 60-62
- **Lines (code):** 64-136
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
- **File:** _pager.scss
- **Group:** pager
- **Type:** function
- **Lines (comments):** 52-54
- **Lines (code):** 56-58
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  