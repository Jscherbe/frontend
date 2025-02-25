---
title: Vignette
sassdocGroupName: vignette
---


# Vignette

<div class="type-large">

Create a vignette effect around image/video/etc

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
  "background-color" : rgb(0,0,0),
  "image-filter" : saturate(85%)
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _vignette.scss
- **Group:** vignette
- **Type:** variable
- **Lines (comments):** 12-15
- **Lines (code):** 17-20

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|background-color|Color|rgb(0,0,0)|Color used for the fade-in of the vignette. Must be actual color not color module palette name|
|image-filter|CssValue|saturate(85%)|Filter value placed over image.|

    
  

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
  
- **File:** _vignette.scss
- **Group:** vignette
- **Type:** mixin
- **Lines (comments):** 22-25
- **Lines (code):** 27-29

</details>

    

#### Examples

      


``` scss
@include ulu.component-vignette-set(( "property" : value ));
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

  

Output component stylesheet
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _vignette.scss
- **Group:** vignette
- **Type:** mixin
- **Lines (comments):** 40-42
- **Lines (code):** 44-66

</details>

    

#### Examples

      


``` scss
@include ulu.component-vignette-styles();
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
  
- **File:** _vignette.scss
- **Group:** vignette
- **Type:** function
- **Lines (comments):** 31-34
- **Lines (code):** 36-38

</details>

    

#### Examples

      


``` scss
@include ulu.component-vignette-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  