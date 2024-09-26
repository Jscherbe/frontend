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
  "backdrop-color" :                true,
  "backdrop-blur" :                 4px,
  "box-shadow" :                    true,         
  "width":                          60rem,
  "sizes" : (
    "small" : 30rem,
    "large" : 80rem
  ),
  "height":                         340px,
  "height-no-header":               100px,
  "border-radius" :                 true,
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
  "title-size" :                    "large",
  "title-font-weight":              bold,
  "title-text-transform" :          null,
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
  "title-icon-margin" :             0.5em,
  "animation-timing-function" :     cubic-bezier(0, 0, .2, 1),
  "animation-duration" :            300ms,
  "animation-duration-exit" :       150ms,
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _modal.scss
- **Group:** modal
- **Type:** variable
- **Lines (comments):** 31-71
- **Lines (code):** 73-116
    </details>
    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|backdrop-color|Map|true||
|backdrop-blur|Map|4px||
|box-shadow|Map|true||
|width|Map|60rem||
|sizes|Map|Object||
|height|Map|340px||
|height-no-header|Map|100px||
|border-radius[true]|Map|||
|resizer-width|Map|1rem||
|resizer-color|Map|black||
|resizer-color-hover|Map|black||
|resizer-background-color|Map|rgb(221, 221, 221)||
|resizer-background-color-hover|Map|rgb(66, 66, 66)||
|header-padding|Map|1rem||
|header-border-bottom|Map|none||
|header-background-color|Map|black||
|header-color|Map|white||
|title-color|Map|white||
|title-size|Map|large||
|title-font-weight|Map|bold||
|title-text-transform|Map|null||
|close-color|Map|black||
|close-color-hover|Map|black||
|close-background-color|Map|white||
|close-size|Map|2.5rem||
|close-font-size|Map|1.2rem||
|close-margin|Map|0.5rem||
|close-background-color-hover|Map|blue||
|body-padding|Map|1rem||
|background-color|Map|white||
|dark-background-color|Map|false||
|dark-color|Map|white||
|dark-header-border-bottom|Map|false||
|dark-header-background-color|Map|false||
|dark-header-color|Map|false||
|title-icon-margin|Map||0.[5em]|
|animation-timing-function|Map|cubic-bezier(0, 0, .2, 1)||
|animation-duration|Map|300ms||
|animation-duration-exit|Map|150ms||

    
  

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
- **Lines (comments):** 118-121
- **Lines (code):** 123-125
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
- **Lines (comments):** 136-138
- **Lines (code):** 140-482
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
- **Lines (comments):** 127-129
- **Lines (code):** 131-134
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  