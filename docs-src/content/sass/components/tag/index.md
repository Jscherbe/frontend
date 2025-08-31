---
title: Tag
sassdocGroupName: tag
---


# Tag

<div class="type-large">

A small, lightweight label used to categorize, classify, or identify items within an interface

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
  "font-weight" : normal,
  "font-family" : true,
  "box-shadow" : none,
  "padding" : (0.4em 0.75em),
  "vertical-align" : baseline,
  "margin-between" : 0.5em,
  "margin-between-tags" : 0,
  "line-height" : 1,
  "type-size" : "small",
  "background-color" : #eaeaea,
  "border-radius" : 1.25em,
  "border-color" : transparent,
  "border-width" : 1px,
  "color": "type-tertiary",
  "counter-size" : 1.75em,
  "counter-border-radius" : 20px,
  "counter-padding-sides" : 0.26em
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _tag.scss
- **Group:** tag
- **Type:** variable
- **Lines (comments):** 24-42
- **Lines (code):** 44-62

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|font-weight|CssValue|normal|Font weight for the tag text.|
|font-family|String|true|Font family for the tag text.|
|box-shadow|CssValue|none|Box shadow for the tag.|
|padding|Dimension|(0.4em 0.75em)|Inner padding for the tag.|
|vertical-align|CssValue|baseline|Vertical alignment of tag text.|
|margin-between|Dimension|0.5em|Margin between tag and other elements.|
|margin-between-tags|Dimension|0|Margin between tag and other tags.|
|line-height|Number|1|Line height for the tag text.|
|type-size|String|"small"|Font size for the tag text.|
|background-color|Color|#eaeaea|Background color of the tag.|
|border-radius|Dimension|1.25em|Border radius of the tag.|
|border-color|Color|transparent|Border color for the tag.|
|border-width|Dimension|1px|Border width of the tag.|
|color|String|"type-tertiary"|Color of the tag text.|
|counter-size|String|1.5em|Size when used as a counter (for numbers), will be this size by default and expand horizontally as needed (ie. circle/rounded rectangle or square/rectangle if without border radius)|
|counter-border-radius|String|20px|May need to be adjusted or can be set to 0 for square/rectangle|
|counter-padding-sides|String|0.26em|Counter left/right padding (this is the space/margin on the inside when the number can't fit in the circle/square|

    


<div class="sassdoc-item-header">

###  $styles {#variable-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span>
  </div>

</div>

  

Style Map (alternate tag styles)
    
    

``` scss
$styles: (
  "success" : (
    "color" : rgb(37, 73, 37),
    "background-color" : rgb(190, 220, 190),
  ),
  "danger" : (
    "color" : rgb(78, 24, 24),
    "background-color" : rgb(235, 179, 179),
  ),
  "outline" : (
    "background-color" : transparent,
    "border-color" : #ccc
  )
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _tag.scss
- **Group:** tag
- **Type:** variable
- **Lines (comments):** 64-64
- **Lines (code):** 66-79

</details>

    


<div class="sassdoc-item-header">

###  $sizes {#variable-sizes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span>
  </div>

</div>

  

Map of alternate sizes
    
    

``` scss
$sizes: (
  "small" : (
    "padding" : (0.25em 0.5em),
    "type-size" : "small-x"
  )
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _tag.scss
- **Group:** tag
- **Type:** variable
- **Lines (comments):** 81-81
- **Lines (code):** 82-87

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
  
- **File:** _tag.scss
- **Group:** tag
- **Type:** mixin
- **Lines (comments):** 89-92
- **Lines (code):** 94-96

</details>

    

#### Examples

      


``` scss
@include ulu.component-tag-set(( "property" : value ));
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
  
- **File:** _tag.scss
- **Group:** tag
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

- [$styles](/sass/components/callout/#variable-styles)
  


<div class="sassdoc-item-header">

###  set-sizes() {#mixin-set-sizes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Set tag sizes 
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _tag.scss
- **Group:** tag
- **Type:** mixin
- **Lines (comments):** 106-108
- **Lines (code):** 110-112

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|
|$merge-mode|`String`|Merge mode see utils.map-merge() [null|"deep"|"overwrite"]|

    

#### Require

- [$sizes](/sass/components/adaptive-spacing/#variable-sizes)
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Output component stylesheet
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _tag.scss
- **Group:** tag
- **Type:** mixin
- **Lines (comments):** 124-126
- **Lines (code):** 128-198

</details>

    

#### Examples

      


``` scss
@include ulu.component-tag-styles();
```
  



      

#### Require

- [get()](/sass/components/accordion/#function-get)
- [$sizes](/sass/components/adaptive-spacing/#variable-sizes)
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
  
- **File:** _tag.scss
- **Group:** tag
- **Type:** function
- **Lines (comments):** 114-117
- **Lines (code):** 119-122

</details>

    

#### Examples

      


``` scss
@include ulu.component-tag-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  