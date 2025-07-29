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
  "font-size":           1.5rem,
  "font-weight":         bold,
  "font-family":         true,
  "width":               7rem,
  "sizes" : (
    "small" : (
      "font-size" : 1.2rem,
      "width" :  5rem
    ),
    "large" : (
      "font-size" : 2.75rem,
      "width" :  9rem
    )
  )
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _badge.scss
- **Group:** badge
- **Type:** variable
- **Lines (comments):** 21-30
- **Lines (code):** 32-50

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|background-color|Number|gray|Background color (if no image)|
|border-radius|Number|50%|Border radius of badge|
|color|Number|black|Type color|
|font-size|Number|1.3rem|Font size (basic ie. 1.3rem) for badge|
|font-weight|Number|bold|Font weight|
|font-family|Number|true|Specify font family, defaults to typography font-family-sans|
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
- **Lines (comments):** 52-55
- **Lines (code):** 57-59

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
- **Lines (comments):** 71-85
- **Lines (code):** 87-149

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
- **Lines (comments):** 61-64
- **Lines (code):** 66-69

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
  
  
  