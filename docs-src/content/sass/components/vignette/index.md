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
- **Lines (comments):** 12-14
- **Lines (code):** 16-19

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|background-color|Color|rgb(0,0,0)|Color used for the fade-in of the vignette. Must be actual color not color module palette name|

    
  

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
- **Lines (comments):** 21-24
- **Lines (code):** 26-28

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
- **Lines (comments):** 39-41
- **Lines (code):** 43-65

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
- **Lines (comments):** 30-33
- **Lines (code):** 35-37

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
  
  
  