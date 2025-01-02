---
title: Callout
sassdocGroupName: callout
---


# Callout

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
  "background-color" : rgb(240, 240, 240),
  "border" : true,
  "border-radius" :  true,
  "left-border" : false,
  "left-border-color" : green,
  "box-shadow" : none,
  "margin" : 2rem,
  "padding" : 1.5rem,
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _callout.scss
- **Group:** callout
- **Type:** variable
- **Lines (comments):** 25-32
- **Lines (code):** 34-43

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|background-color|Color|rgb(240, 240, 240)|The background color of the Callout.|
|border|Boolean|true|The border of the Callout.|
|border-radius|Boolean|true|The border radius of the Callout.|
|box-shadow|CssValue|none|The box-shadow of the Callout.|
|margin|Dimension|2rem|Bottom margin of the Callout.|
|padding|Dimension|1.5rem|Padding of the Callout.|

    
  

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
  
- **File:** _callout.scss
- **Group:** callout
- **Type:** mixin
- **Lines (comments):** 81-83
- **Lines (code):** 85-87

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  set-styles() {#mixin-set-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Set callout styles 
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _callout.scss
- **Group:** callout
- **Type:** mixin
- **Lines (comments):** 98-100
- **Lines (code):** 102-104

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|
|$merge-mode|`String`|Merge mode see utils.map-merge() [null|"deep"|"overwrite"]|

    

#### Require

- $styles
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints component styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _callout.scss
- **Group:** callout
- **Type:** mixin
- **Lines (comments):** 106-108
- **Lines (code):** 110-151

</details>

    

#### Examples

      


``` scss
@include ulu.component-example-styles();
```
  

      

#### Require

- [get()](/sass/components/accordion/#function-get)
- $styles
  
  

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
  
- **File:** _callout.scss
- **Group:** callout
- **Type:** function
- **Lines (comments):** 89-91
- **Lines (code):** 93-96

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  