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
- **Lines (comments):** 31-32
- **Lines (code):** 34-52

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
- **Lines (comments):** 54-57
- **Lines (code):** 59-61

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
- **Lines (comments):** 73-75
- **Lines (code):** 77-173

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
- **Lines (comments):** 63-66
- **Lines (code):** 68-71

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
  
  
  