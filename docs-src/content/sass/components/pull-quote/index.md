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
- **Lines (comments):** 22-35
- **Lines (code):** 37-51
    </details>
    

Hello World
  

#### Map Properties


|Name|Type|Default|
|:--|:--|:--|
|body-line-height|Map|true|
|image-margin-bottom|Map|1rem|
|image-margin-top|Map|2.5rem|
|name-margin-bottom|Map|1rem|
|padding-y|Map|2em|
|title-font-style|Map|italic|
|quote-mark-character|Map|"\201c"|
|quote-mark-color|Map|null|
|quote-mark-font-family|Map|"Georgia"|
|quote-mark-font-size|Map|3.75em|
|quote-mark-enabled|Map|true|
|quote-mark-line-height|Map|0.35|

    
  

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
- **Lines (comments):** 53-55
- **Lines (code):** 57-59
    </details>
    

Hello World
  

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
- **Lines (comments):** 70-72
- **Lines (code):** 74-109
    </details>
    

Hello World
  

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
- **Lines (comments):** 61-63
- **Lines (code):** 65-68
    </details>
    

Hello World
  

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  