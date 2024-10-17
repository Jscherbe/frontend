---
title: Popover
sassdocGroupName: popover
---


# Popover





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
  "arrow-size"                   : 16px,
  "background-color"             : white,
  "border-radius"                : 6px,
  "color"                        : inherit,
  "max-width"                    : 90vw,
  "max-height"                   : 25rem,
  "padding"                      : 1rem,
  "padding-large"                : 2rem,
  "type-size"                    : null,
  "z-index"                      : true,
  
  "box-shadow"                   : true,
  "box-shadow-footer"            : 0 0 4px,
  "box-shadow-footer-color"      : "box-shadow",
  "header-background-color"      : #ccc,
  "header-color"                 : null,
  "header-media-background-color": black,
  "header-padding-y"             : 0.25rem,
  "footer-background-color"      : #ccc,
  "footer-color"                 : null,
  "footer-padding-y"             : 0.25rem,
  "footer-padding-y-large"       : 0.5rem,
  "tooltip-background-color"     : white,
  "tooltip-color"                : null,
  "tooltip-max-width"            : 20rem,
  "tooltip-padding"              : 0.5rem,
  "tooltip-width"                : auto,
  "width"                        : 15rem,
  "width-large"                  : 30rem,
  "width-large-x"                : 50rem,
  );
```
  

    <details>
      <summary>File Information</summary>
- **File:** _popover.scss
- **Group:** popover
- **Type:** variable
- **Lines (comments):** 30-31
- **Lines (code):** 33-65
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
- **File:** _popover.scss
- **Group:** popover
- **Type:** mixin
- **Lines (comments):** 67-69
- **Lines (code):** 71-73
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
- **File:** _popover.scss
- **Group:** popover
- **Type:** mixin
- **Lines (comments):** 84-86
- **Lines (code):** 88-233
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
- **File:** _popover.scss
- **Group:** popover
- **Type:** function
- **Lines (comments):** 75-77
- **Lines (code):** 79-82
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  