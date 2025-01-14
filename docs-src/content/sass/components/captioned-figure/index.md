---
title: Captioned-figure
sassdocGroupName: captioned-figure
---


# Captioned-figure

<div class="type-large">

Figure with caption layout (to position caption)

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
  "text-alignment-matches" : false,
  "text-alignment-matches-center-only" : true,
  "background-color" : white,
  "box-shadow" : true,
  "margin-bottom" : true,
  "line-height" : true,
  "caption-padding" :  0.5em,
  "color" : null,
  "type-size" : "small",
  "caption-max-width" : min(100%, 15em),
  "caption-background-color" : rgba(255,255,255,0.7),
  "caption-backdrop-filter" : blur(2px),
  "traditional-caption-color" : null,
  "traditional-caption-background-color" : transparent,
  "traditional-caption-padding" : 0.5em,
  "traditional-caption-max-width" : 35em,
  "traditional-caption-text-align" : right,
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _captioned-figure.scss
- **Group:** captioned-figure
- **Type:** variable
- **Lines (comments):** 30-31
- **Lines (code):** 33-51

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
  
- **File:** _captioned-figure.scss
- **Group:** captioned-figure
- **Type:** mixin
- **Lines (comments):** 53-56
- **Lines (code):** 58-60

</details>

    

#### Examples

      


``` scss
@include ulu.component-captioned-figure-set(( "property" : value ));
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
  
- **File:** _captioned-figure.scss
- **Group:** captioned-figure
- **Type:** mixin
- **Lines (comments):** 72-74
- **Lines (code):** 76-172

</details>

    

#### Examples

      


``` scss
@include ulu.component-captioned-figure-styles();
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
  
- **File:** _captioned-figure.scss
- **Group:** captioned-figure
- **Type:** function
- **Lines (comments):** 62-65
- **Lines (code):** 67-70

</details>

    

#### Examples

      


``` scss
@include ulu.component-captioned-figure-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  