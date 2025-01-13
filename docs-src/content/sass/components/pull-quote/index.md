---
title: Pull-quote
sassdocGroupName: pull-quote
---


# Pull-quote

<div class="type-large">

Layout for a pull quote, relies on badge component for image

</div>



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
- **Lines (comments):** 53-56
- **Lines (code):** 58-60

</details>

    

#### Examples

      


``` scss
@include ulu.component-pull-quote-set(( "property" : value ));
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

  

Prints component styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _pull-quote.scss
- **Group:** pull-quote
- **Type:** mixin
- **Lines (comments):** 72-74
- **Lines (code):** 76-111

</details>

    

#### Examples

      


``` scss
@include ulu.component-pull-quote-styles();
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
- **Lines (comments):** 62-65
- **Lines (code):** 67-70

</details>

    

#### Examples

      


``` scss
@include ulu.component-pull-quote-get("property");
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  