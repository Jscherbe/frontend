---
title: Pull-quote
sassdocGroupName: pull-quote
---


# Pull-quote

Layout for a pull quote, relies on badge component for image



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
  "body-line-height" : true,
  "image-margin-bottom" : 1rem,
  "image-margin-top" : 2.5rem,
  "name-margin-bottom" : 1rem,
  "padding-y" : 2em,
  "title-font-style" : italic,

  "quote-mark-character" : "\201c",
  "quote-mark-color" : null,
  "quote-mark-font-family" : "Georgia",
  "quote-mark-font-size" : 3.75em,
  "quote-mark-enabled" : true,
  "quote-mark-line-height" : 0.35,
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _pull-quote.scss
- **Group:** pull-quote
- **Type:** variable
- **Lines (comments):** 22-23
- **Lines (code):** 24-38
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
- **File:** _pull-quote.scss
- **Group:** pull-quote
- **Type:** mixin
- **Lines (comments):** 40-42
- **Lines (code):** 44-46
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
- **File:** _pull-quote.scss
- **Group:** pull-quote
- **Type:** mixin
- **Lines (comments):** 57-59
- **Lines (code):** 61-96
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
- **File:** _pull-quote.scss
- **Group:** pull-quote
- **Type:** function
- **Lines (comments):** 48-50
- **Lines (code):** 52-55
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  