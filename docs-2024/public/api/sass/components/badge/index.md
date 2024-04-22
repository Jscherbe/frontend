---
title: Badge
sassdocGroupName: badge
---


# Badge





## Variables




###  $config {#variable-config} 

<small>Variable&ensp;|&ensp;Access: Public&ensp;|&ensp;Type: Map</small>

  

Module Settings
    
    

``` scss
$config: (
  "font-size":           1.3rem,
  "border-radius":       50%,
  "width":               10rem,
  "font-weight":         bold,
  "background-color":    gray,
  "color":               black,
  "sizes" : (
    "large" : (
      "font-size" : 2.75rem,
      "width" :  6rem
    )
  )
);
```
  

#### Details

- **File:** _badge.scss
- **Group:** badge
- **Type:** variable
- **Lines (comments):** 9-17
- **Lines (code):** 19-32
    
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.font-size|Number|Font size (basic ie. 1.3rem) for badge|
|$config.border-radius|Number|Border radius of badge|
|$config.width|Number|Width of badge (default size)|
|$config.font-weight|Number|Font weight|
|$config.background-color|Number|Background color (if no image)|
|$config.color|Number|Type color|
|$config.sizes|List|List of other sizes (large by defualt), each size is a map of (width, font-size)|

    
  

## Mixins




###  set() {#mixin-set} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Change modules $config
    
    

#### Details

- **File:** _badge.scss
- **Group:** badge
- **Type:** mixin
- **Lines (comments):** 34-36
- **Lines (code):** 38-40
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/api/sass/components/badge/#variable-config)
  


###  styles() {#mixin-styles} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Prints badge component styles
    
    

#### Details

- **File:** _badge.scss
- **Group:** badge
- **Type:** mixin
- **Lines (comments):** 50-64
- **Lines (code):** 66-126
    
    

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

- [get()](/api/sass/components/badge/#function-get)
  
  

## Functions




###  get() {#function-get} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get a config option
    
    

#### Details

- **File:** _badge.scss
- **Group:** badge
- **Type:** function
- **Lines (comments):** 42-44
- **Lines (code):** 46-48
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/api/sass/components/badge/#variable-config)
  
  
  