---
title: Headline-label
sassdocGroupName: headline-label
---


# Headline-label

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
  "color": "accent",
  "margin-bottom": 0.2em,
  "font-weight": true,
  "font-family": true,
  "line-height": true,
  "text-transform" : null,
  "type-size": "small"
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _headline-label.scss
- **Group:** headline-label
- **Type:** variable
- **Lines (comments):** 27-35
- **Lines (code):** 37-45

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|color|Color|ulu.cssvar-use("color-accent")|The text color of the headline label.|
|margin-bottom|Dimension|0.2em|The bottom margin of the headline label.|
|font-weight|String|typography.get("font-weight-bold")|The font weight of the headline label.|
|font-family|String|typography.get("font-family-sans")|The font family of the headline label.|
|line-height|Dimension|Number|typography.get("line-height-dense")|The font family of the headline label.|
|text-transform|String|null|The font family of the headline label.|
|type-size|String|"small"|The typography size preset to use for the headline label (e.g., "small", "medium", "large"), Only uses the font-size value for size|

    
  

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
  
- **File:** _headline-label.scss
- **Group:** headline-label
- **Type:** mixin
- **Lines (comments):** 47-50
- **Lines (code):** 52-54

</details>

    

#### Examples

      


``` scss
@include ulu.component-headline-label-set(( "color" : red ));
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
  
- **File:** _headline-label.scss
- **Group:** headline-label
- **Type:** mixin
- **Lines (comments):** 66-68
- **Lines (code):** 70-83

</details>

    

#### Examples

      


``` scss
@include ulu.component-headline-label-styles();
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
  
- **File:** _headline-label.scss
- **Group:** headline-label
- **Type:** function
- **Lines (comments):** 56-59
- **Lines (code):** 61-64

</details>

    

#### Examples

      


``` scss
@include ulu.component-headline-label-get("color");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  