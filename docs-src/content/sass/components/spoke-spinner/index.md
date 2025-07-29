---
title: Spoke-spinner
sassdocGroupName: spoke-spinner
---


# Spoke-spinner

<div class="type-large">

A spoke style spinner/loader icon, requires ulu.base-keyframes

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
  "size" : 48px,
  "spoke-width" : 3px,
  "spoke-height" : 12px,
  "color" : "accent",
  "border-radius" : 2px,
  "duration" :  1.2s
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _spoke-spinner.scss
- **Group:** spoke-spinner
- **Type:** variable
- **Lines (comments):** 13-14
- **Lines (code):** 16-23

</details>

    


<div class="sassdoc-item-header">

###  $styles {#variable-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span>
  </div>

</div>

  

Map of other sizes (use as modifiers), same properties as config/defaults
    
    

``` scss
$styles: ();
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _spoke-spinner.scss
- **Group:** spoke-spinner
- **Type:** variable
- **Lines (comments):** 25-25
- **Lines (code):** 26-26

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
  
- **File:** _spoke-spinner.scss
- **Group:** spoke-spinner
- **Type:** mixin
- **Lines (comments):** 28-31
- **Lines (code):** 33-35

</details>

    

#### Examples

      


``` scss
@include ulu.component-spoke-spinner-set(( "property" : value ));
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  set-styles() {#mixin-set-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Set tag styles 
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _spoke-spinner.scss
- **Group:** spoke-spinner
- **Type:** mixin
- **Lines (comments):** 37-39
- **Lines (code):** 41-43

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|
|$merge-mode|`String`|Merge mode see utils.map-merge() [null|"deep"|"overwrite"]|

    

#### Require

- [$styles](/sass/components/callout/#variable-styles)
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Output component stylesheet
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _spoke-spinner.scss
- **Group:** spoke-spinner
- **Type:** mixin
- **Lines (comments):** 54-73
- **Lines (code):** 75-193

</details>

    

#### Examples

      


``` scss
@include ulu.component-spoke-spinner-styles();
```
  



      

Example markup      


``` html
<div class="spoke-spinner">
  <div class="spoke-spinner__spinner">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>
```
  



      

#### Require

- [get()](/sass/components/accordion/#function-get)
- [$styles](/sass/components/callout/#variable-styles)
  
  

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
  
- **File:** _spoke-spinner.scss
- **Group:** spoke-spinner
- **Type:** function
- **Lines (comments):** 45-48
- **Lines (code):** 50-52

</details>

    

#### Examples

      


``` scss
@include ulu.component-spoke-spinner-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  