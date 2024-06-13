---
title: Modal
sassdocGroupName: modal
---


# Modal





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
  "backdrop-color" :                element.get("backdrop-color"),
  "backdrop-filter" :               blur(4px),
  "box-shadow" :                    none,         
  "width":                          400px,
  "height":                         340px,
  "width-centered":                 600px,
  "border-radius" :                 0,
  "resizer-width":                  1rem,
  "resizer-color":                  black,
  "resizer-color-hover":            black,
  "resizer-background-color":       rgb(221, 221, 221),
  "resizer-background-color-hover": rgb(66, 66, 66),
  "header-padding":                 1rem,
  "header-border-bottom":           none,
  "header-background-color":        black,
  "header-color":                   white,
  "title-color":                    white,
  "title-font-weight":              bold,
  "close-color":                    black,
  "close-color-hover":              black,
  "close-background-color":         white,
  "close-size":                     2.5rem,
  "close-font-size":                1.2rem,
  "close-margin":                   0.5rem,
  "close-background-color-hover":   blue,
  "body-padding":                   1rem,
  "background-color":              white,
  "dark-background-color" :         false,
  "dark-color" :                   white,
  "dark-header-border-bottom" :     false,
  "dark-header-background-color" :  false,
  "dark-header-color" :             false,
  "title-icon-margin" :             0.5em
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _modal.scss
- **Group:** modal
- **Type:** variable
- **Lines (comments):** 14-15
- **Lines (code):** 16-50
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
- **File:** _modal.scss
- **Group:** modal
- **Type:** mixin
- **Lines (comments):** 52-55
- **Lines (code):** 57-59
    </details>
    

#### Examples

General example, replace module-name with module's name      


``` scss
@include module-name.set(( "property" : value ));
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

  

Prints modal component styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _modal.scss
- **Group:** modal
- **Type:** mixin
- **Lines (comments):** 69-71
- **Lines (code):** 73-320
    </details>
    

#### Examples

      


``` scss
@include ulu.component-modal-styles();
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
- **File:** _modal.scss
- **Group:** modal
- **Type:** function
- **Lines (comments):** 61-63
- **Lines (code):** 65-67
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  