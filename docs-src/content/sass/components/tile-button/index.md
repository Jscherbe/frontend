---
title: Tile-button
sassdocGroupName: tile-button
---


# Tile-button

<div class="type-large">

Button to be used withing tile-grid. Used with button classes.

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
  "border-radius" : true,
  "description-size" : "small-x",
  "line-height" : true,
  "padding" : (1em 0.5em),
  "row-margin" : 0.5em,
  "icon-font-size" : 1.5em,
  "icon-margin" : 1em,
  "icon-opacity" : 0.5,
  "transition-enabled" : true,
  "transition-duration" : true,
  "transition-properties" : true
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _tile-button.scss
- **Group:** tile-button
- **Type:** variable
- **Lines (comments):** 39-48
- **Lines (code):** 50-62

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|border-radius|Dimension|true|The border radius of the tile button. If set to true, will use the element.scss property for "border-radius".|
|description-size|String|small-x|The type size of the description. This uses typography.scss, so the value of this options should be a variable from typography.scss.|
|line-height|Dimension|true|The line-height of the tile-button. If set to true, will use the typography.scss property for "line-height-densest".|
|padding|Dimension|(1em 0.5em)|The padding of the tile button|
|row-margin|Dimension|0.5em|The margin between rows.|
|icon-font-size|Dimension|1.5em|The font size of the icon.|
|icon-margin|Dimension|1em|The margin for the icon.|
|icon-opacity|Number|0.5|The opacity of the icon.|

    
  

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
  
- **File:** _tile-button.scss
- **Group:** tile-button
- **Type:** mixin
- **Lines (comments):** 64-66
- **Lines (code):** 68-70

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

  

Prints component styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _tile-button.scss
- **Group:** tile-button
- **Type:** mixin
- **Lines (comments):** 81-83
- **Lines (code):** 85-129

</details>

    

#### Examples

      


``` scss
@include ulu.component-example-styles();
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
  
- **File:** _tile-button.scss
- **Group:** tile-button
- **Type:** function
- **Lines (comments):** 72-74
- **Lines (code):** 76-79

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  