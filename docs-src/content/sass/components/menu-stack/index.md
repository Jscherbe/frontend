---
title: Menu-stack
sassdocGroupName: menu-stack
---


# Menu-stack





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
  "link-color" : null,
  "link-background-color" : transparent,
  "link-color-hover" : "link:hover",
  "link-background-color-hover" : rgb(219, 219, 219),
  "link-color-active" : black,
  "link-background-color-active" : rgb(219, 219, 219),
  "link-border-radius" : true,
  "link-padding-y": 0.35em,
  "link-padding-x": 1em,
  "link-margin" : 0.2em,
  "link-separated-rule-style" : false,
  "link-separated-margin" : false,
  "link-icon-margin" : 0.65em,
  "link-icon-width" : 1em,
  "link-font-weight" : null,
  "link-active-selectors" : (".is-active", '[aria-current="page"]'),
  "compact-link-padding-y": 0.25em,
  "compact-link-padding-x": 0.75em,
  "rule-style" : "default",
  "rule-margin" : 0.5em,
  "label-type-size" : false,
  "label-color" : null,
  "label-margin" : 0.5em,
  "label-text-transform" : uppercase,
  "checkbox-area-width" : 3em,
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _menu-stack.scss
- **Group:** menu-stack
- **Type:** variable
- **Lines (comments):** 25-26
- **Lines (code):** 28-54
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
- **File:** _menu-stack.scss
- **Group:** menu-stack
- **Type:** mixin
- **Lines (comments):** 57-59
- **Lines (code):** 61-63
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
- **File:** _menu-stack.scss
- **Group:** menu-stack
- **Type:** mixin
- **Lines (comments):** 79-83
- **Lines (code):** 85-181
    </details>
    

#### Examples

      


``` scss
@include ulu.component-example-styles();
```
  

      

#### Todos

- Colors stuff
- Selector prefix
    

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
- **File:** _menu-stack.scss
- **Group:** menu-stack
- **Type:** function
- **Lines (comments):** 65-67
- **Lines (code):** 69-72
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  