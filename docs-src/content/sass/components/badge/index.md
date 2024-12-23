---
title: Badge
sassdocGroupName: badge
---


# Badge

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
- **Lines (comments):** 9-17
- **Lines (code):** 19-32

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|background-color|Number|gray|Background color (if no image)|
|border-radius|Number|50%|Border radius of badge|
|color|Number|black|Type color|
|font-size|Number|1.3rem|Font size (basic ie. 1.3rem) for badge|
|font-weight|Number|bold|Font weight|
|sizes|List|Object|List of other sizes (large by defualt), each size is a map of (width, font-size)|
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
- **Lines (comments):** 34-36
- **Lines (code):** 38-40

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints badge component styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _badge.scss
- **Group:** badge
- **Type:** mixin
- **Lines (comments):** 50-64
- **Lines (code):** 66-126

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
- **Lines (comments):** 42-44
- **Lines (code):** 46-48

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  