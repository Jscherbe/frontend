---
title: Captioned-figure
sassdocGroupName: captioned-figure
---


# Captioned-figure

<div class="type-large">

Figure with caption layout (to position caption)

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
  "text-alignment-matches" : false,
  "text-alignment-matches-center-only" : true,
  "background-color" : white,
  "box-shadow" : true,
  "margin-bottom" : true,
  "line-height" : true,
  "caption-padding" :  0.5em,
  "color" : null,
  "type-size" : "small",
  "caption-max-width" : min(100%, 15em),
  "caption-background-color" : rgba(255,255,255,0.7),
  "caption-backdrop-filter" : blur(2px),
  "traditional-caption-color" : null,
  "traditional-caption-background-color" : transparent,
  "traditional-caption-padding" : 0.5em,
  "traditional-caption-max-width" : 35em,
  "traditional-caption-text-align" : right,
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _captioned-figure.scss
- **Group:** captioned-figure
- **Type:** variable
- **Lines (comments):** 31-49
- **Lines (code):** 51-69

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|text-alignment-matches|Boolean|false|Toggles matching alignment.|
|text-alignment-matches-center-only|Boolean|true|Toggles matching alignment, but only if center.|
|background-color|Color|white|Background color of the component.|
|box-shadow|CssValue|true|Box shadow the captioned figure.|
|margin-bottom|Dimension|true|Bottom margin of the captioned figure.|
|line-height|Number|true|Line height of the captioned figure caption.|
|caption-padding|Dimension|0.5em|Padding of the captioned figure caption.|
|color|Color|null|Font color of the captioned figure caption.|
|type-size|String|"small"|Font size of the captioned figure caption.|
|caption-max-width|Dimension|min(100%, 15em)|Max width of the captioned figure caption.|
|caption-background-color|Color|rgba(255,255,255,0.7)|background color of the captioned figure caption.|
|caption-backdrop-filter|CssValue|blur(2px)|Filter of the backdrop of the captioned figure.|
|traditional-caption-color|Color|null|Traditional style for font color.|
|traditional-caption-background-color|Color|transparent|Traditional style for caption background color.|
|traditional-caption-padding|Dimension|0.5em|Traditional style for caption padding.|
|traditional-caption-max-width|Dimension|35em|Traditional style for caption max width.|
|traditional-caption-text-align|CssValue|right|Traditional style for caption text-align.|

    
  

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
  
- **File:** _captioned-figure.scss
- **Group:** captioned-figure
- **Type:** mixin
- **Lines (comments):** 71-74
- **Lines (code):** 76-78

</details>

    

#### Examples

      


``` scss
@include ulu.component-captioned-figure-set(( "property" : value ));
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
  
- **File:** _captioned-figure.scss
- **Group:** captioned-figure
- **Type:** mixin
- **Lines (comments):** 90-92
- **Lines (code):** 94-190

</details>

    

#### Examples

      


``` scss
@include ulu.component-captioned-figure-styles();
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
  
- **File:** _captioned-figure.scss
- **Group:** captioned-figure
- **Type:** function
- **Lines (comments):** 80-83
- **Lines (code):** 85-88

</details>

    

#### Examples

      


``` scss
@include ulu.component-captioned-figure-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  