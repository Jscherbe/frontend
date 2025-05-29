---
title: Badge
sassdocGroupName: badge
---


# Badge

<div class="type-large">

Outputs badge component stylesheet

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
  "background-color":    gray,
  "border-radius":       50%,
  "color":               black,
  "font-size":           1.3rem,
  "font-weight":         bold,
  "width":               10rem,
  "sizes" : (
    "large" : (
      "font-size" : 2.75rem,
      "width" :  6rem
    )
  )
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _badge.scss
- **Group:** badge
- **Type:** variable
- **Lines (comments):** 11-19
- **Lines (code):** 21-34

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|background-color|Number|gray|Background color (if no image)|
|border-radius|Number|50%|Border radius of badge|
|color|Number|black|Type color|
|font-size|Number|1.3rem|Font size (basic ie. 1.3rem) for badge|
|font-weight|Number|bold|Font weight|
|sizes|List|Object|List of other sizes (large by default), each size is a map of (width, font-size)|
|width|Number|10rem|Width of badge (default size)|

    
  

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
  
- **File:** _badge.scss
- **Group:** badge
- **Type:** mixin
- **Lines (comments):** 36-39
- **Lines (code):** 41-43

</details>

    

#### Examples

      


``` scss
@include ulu.component-badge-set(( "property" : value ));
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

  

Output badge component styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _badge.scss
- **Group:** badge
- **Type:** mixin
- **Lines (comments):** 54-68
- **Lines (code):** 70-130

</details>

    

#### Examples

      


``` scss
@include ulu.component-badge-styles();
```
  



      

      


``` html
<div class="badge">
  <div class="badge__inner">
    <img src="..." alt="...">
  </div>
</div>

<div class="badge">
  <div class="badge__inner">
    <span>JS</span>
  </div>
</div>
```
  


##### Preview

<div>
<div class="badge">
  <div class="badge__inner">
    <img src="..." alt="...">
  </div>
</div>

<div class="badge">
  <div class="badge__inner">
    <span>JS</span>
  </div>
</div>
</div>

    

      

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
  
- **File:** _badge.scss
- **Group:** badge
- **Type:** function
- **Lines (comments):** 45-48
- **Lines (code):** 50-52

</details>

    

#### Examples

      


``` scss
@include ulu.component-badge-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  