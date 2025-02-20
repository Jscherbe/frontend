---
title: Hero
sassdocGroupName: hero
---


# Hero

<div class="type-large">



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
  "breakpoint" : "medium",
  "height" : 100vh,
  "height-compact" : 40vh,
  "graphic-height-stacked" : 60vh,
  "content-max-width" : 40rem,
  "content-padding-top" : 3rem,
  "content-padding-bottom" : 3rem,
  "text-align" : center,
  "extra-split-ratios" : (
    "wide" : (60%, 40%)
  )
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _hero.scss
- **Group:** hero
- **Type:** variable
- **Lines (comments):** 15-25
- **Lines (code):** 27-40

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|extra-split-ratios|Map|wide 70/30|A map where the name is the modifier and the value is a list with two percentages (the first percentage will be correspond with the graphic or content depending on selector [ie. .hero--split-graphic-[name] would apply the first percentage to the graphic while hero--split-content-[name] would apply the first percentage to the content])|
|breakpoint|String|"medium"|At what breakpoint the hero goes to small screen styling.|
|height|Dimension|100vh|Height of the hero|
|height-compact|Dimension|40vh||
|graphic-height-stacked|Dimension|60vh||
|content-max-width|Dimension|40rem||
|content-padding-top|Dimension|3rem||
|content-padding-bottom|Dimension|3rem||
|text-align|CssValue|center||

    
  

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
  
- **File:** _hero.scss
- **Group:** hero
- **Type:** mixin
- **Lines (comments):** 42-45
- **Lines (code):** 47-49

</details>

    

#### Examples

      


``` scss
@include ulu.component-hero-set(( "property" : value ));
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
  
- **File:** _hero.scss
- **Group:** hero
- **Type:** mixin
- **Lines (comments):** 60-62
- **Lines (code):** 64-192

</details>

    

#### Examples

      


``` scss
@include ulu.component-hero-styles();
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
  
- **File:** _hero.scss
- **Group:** hero
- **Type:** function
- **Lines (comments):** 51-54
- **Lines (code):** 56-58

</details>

    

#### Examples

      


``` scss
@include ulu.component-hero-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  