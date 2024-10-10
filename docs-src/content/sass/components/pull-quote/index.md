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
  "padding-y" : 2em,
  "quote-mark-enabled" : true,
  "quote-mark-color" : null,
  "quote-mark-font-size" : 3.75em,
  "quote-mark-font-family" : "Georgia",
  "quote-mark-line-height" : 0.35,
  "quote-mark-character" : "\201c",
  "image-margin-top" : 2.5rem,
  "image-margin-bottom" : 1rem,
  "name-margin-bottom" : 1rem,
  "body-line-height" : true,
  "title-font-style" : italic
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _pull-quote.scss
- **Group:** pull-quote
- **Type:** variable
- **Lines (comments):** 22-23
- **Lines (code):** 24-37
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
- **Lines (comments):** 39-41
- **Lines (code):** 43-45
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
- **Lines (comments):** 56-58
- **Lines (code):** 60-95
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
- **Lines (comments):** 47-49
- **Lines (code):** 51-54
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  