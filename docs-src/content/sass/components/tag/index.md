---
title: Tag
sassdocGroupName: tag
---


# Tag

<div class="type-large">

A small, lightweight label used to categorize, classify, or identify items within an interface

</div>



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
- **Lines (comments):** 76-79
- **Lines (code):** 81-83

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
- **Lines (comments):** 85-87
- **Lines (code):** 89-91

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
  
- **File:** _tag.scss
- **Group:** tag
- **Type:** mixin
- **Lines (comments):** 103-105
- **Lines (code):** 107-156

</details>

    

#### Examples

      


``` scss
@include ulu.component-tag-styles();
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
  
- **File:** _tag.scss
- **Group:** tag
- **Type:** function
- **Lines (comments):** 93-96
- **Lines (code):** 98-101

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
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _tag.scss
- **Group:** tag
- **Type:** variable
- **Lines (comments):** 24-39
- **Lines (code):** 41-56

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
- **Lines (comments):** 58-58
- **Lines (code):** 60-73

</details>

    
  
  