---
title: Modal
sassdocGroupName: modal
---


# Modal





## Variables




<div class="sassdoc-item-header">

###  $config {#variable-config}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span>
  </div>

</div>

  

``` scss
$config: (
  "backdrop-color" :                true,
  "backdrop-blur" :                 4px,
  "background-color":              white,
  "body-padding":                   1rem,
  "border-radius" :                 true,
  "box-shadow" :                    true,         
  "height":                         340px,
  "height-no-header":               100px,
  "width":                          60rem,
  
  "animation-duration" :            300ms,
  "animation-duration-exit" :       150ms,
  "animation-timing-function" :     cubic-bezier(0, 0, .2, 1),
  "close-background-color":         white,
  "close-background-color-hover":   blue,
  "close-color":                    black,
  "close-color-hover":              black,
  "close-font-size":                1.2rem,
  "close-margin":                   0.5rem,
  "close-size":                     2.5rem,
  "dark-background-color" :         false,
  "dark-color" :                   white,
  "dark-header-border-bottom" :     false,
  "dark-header-background-color" :  false,
  "dark-header-color" :             false,
  "header-background-color":        black,
  "header-border-bottom":           none,
  "header-color":                   white,
  "header-padding":                 1rem,
  "resizer-background-color":       rgb(221, 221, 221),
  "resizer-background-color-hover": rgb(66, 66, 66),
  "resizer-color":                  black,
  "resizer-color-hover":            black,
  "resizer-width":                  1rem,
  "title-color":                    white,
  "title-font-weight":              bold,
  "title-icon-margin" :             0.5em,
  "title-size" :                    "large",
  "title-text-transform" :          null,
  "sizes" : (
    "small" : 30rem,
    "large" : 80rem
  ),
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _modal.scss
- **Group:** modal
- **Type:** variable
- **Lines (comments):** 73-73
- **Lines (code):** 74-118
    </details>
    

#### Todos

- [joe-check] should items like 'dark-background-color' be 'background-color-dark' instead?
    


Module Settings
    
    
  

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
- **Lines (comments):** 120-123
- **Lines (code):** 125-127
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
- **Lines (comments):** 138-140
- **Lines (code):** 142-491
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
- **Lines (comments):** 129-131
- **Lines (code):** 133-136
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  