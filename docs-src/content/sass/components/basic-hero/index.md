---
title: Basic-hero
sassdocGroupName: basic-hero
---


# Basic-hero

<div class="type-large">

Basic styling for a hero.

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
  "text-align" : left,
  "background-color" : "background-gray",
  "padding-top": 3rem,
  "padding-bottom" : 2rem,
  "media-box-shadow" : 0 2px 10px color.get("box-shadow"),
  "media-background-color": #fff,
  "media-padding" : 4px,
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _basic-hero.scss
- **Group:** basic-hero
- **Type:** variable
- **Lines (comments):** 16-19
- **Lines (code):** 21-29

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|text-align|CssValue|center|Alignment of text within hero.|
|background-color|Color|"color-hero-background"|Background color of the hero|

    
  

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
  
- **File:** _basic-hero.scss
- **Group:** basic-hero
- **Type:** mixin
- **Lines (comments):** 31-34
- **Lines (code):** 36-38

</details>

    

#### Examples

      


``` scss
@include ulu.component-basic-hero-set(( "property" : value ));
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
  
- **File:** _basic-hero.scss
- **Group:** basic-hero
- **Type:** mixin
- **Lines (comments):** 49-51
- **Lines (code):** 53-100

</details>

    

#### Examples

      


``` scss
@include ulu.component-basic-hero-styles();
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
  
- **File:** _basic-hero.scss
- **Group:** basic-hero
- **Type:** function
- **Lines (comments):** 40-43
- **Lines (code):** 45-47

</details>

    

#### Examples

      


``` scss
@include ulu.component-basic-hero-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  